from __future__ import annotations

import asyncio
import json
import mimetypes
import queue
import re
import threading
import uuid
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Any

from fastapi import FastAPI, File, Header, HTTPException, UploadFile
from fastapi.responses import FileResponse, HTMLResponse, Response, StreamingResponse
from pydantic import BaseModel, Field

from . import config
from .analysis import answer_question, format_time
from .db import create_source, delete_source, get_segments, get_source, init_db, list_sources, requeue_interrupted_sources, update_source
from .media import process_source
from .security import UnsafeSourceError, safe_error, validate_public_media_url

WORK_QUEUE: queue.Queue[str] = queue.Queue()
WORKER: threading.Thread | None = None
STOP_EVENT = threading.Event()


def _worker_loop() -> None:
    while not STOP_EVENT.is_set():
        try:
            source_id = WORK_QUEUE.get(timeout=0.5)
        except queue.Empty:
            continue
        try:
            source = get_source(source_id)
            if source and source.get("status") in {"queued", "processing", "downloading", "transcribing", "analyzing"}:
                def progress(stage: str, percent: int, message: str) -> None:
                    update_source(source_id, stage=stage, progress=percent)
                update_source(source_id, status="processing", stage="preparing", progress=3)
                process_source(source, progress)
        finally:
            WORK_QUEUE.task_done()


@asynccontextmanager
async def lifespan(app: FastAPI):
    global WORKER
    config.ensure_directories()
    init_db()
    STOP_EVENT.clear()
    for source_id in requeue_interrupted_sources():
        WORK_QUEUE.put(source_id)
    WORKER = threading.Thread(target=_worker_loop, name="evascribe-worker", daemon=True)
    WORKER.start()
    yield
    STOP_EVENT.set()
    if WORKER and WORKER.is_alive():
        WORKER.join(timeout=3)


app = FastAPI(title="EvaScribe", version=config.APP_VERSION, docs_url=None, redoc_url=None, lifespan=lifespan)


class UrlRequest(BaseModel):
    url: str = Field(min_length=8, max_length=2048)
    language: str = Field(default=config.DEFAULT_LANGUAGE, max_length=12)


class AskRequest(BaseModel):
    question: str = Field(min_length=2, max_length=1200)
    source_id: str | None = None


def _local_host_ok(host: str | None) -> bool:
    if not host:
        return False
    clean = host.split(":", 1)[0].strip("[]").lower()
    return clean in {"127.0.0.1", "localhost"}


@app.middleware("http")
async def local_only_middleware(request, call_next):
    # Local-first MVP: reject non-loopback host headers and cross-origin writes.
    if not _local_host_ok(request.headers.get("host")):
        return Response("EvaScribe принимает запросы только через localhost.", status_code=403)
    origin = request.headers.get("origin")
    if request.method in {"POST", "PUT", "PATCH", "DELETE"} and origin:
        from urllib.parse import urlparse
        if not _local_host_ok(urlparse(origin).netloc):
            return Response("Cross-origin запрос запрещён.", status_code=403)
    return await call_next(request)


@app.get("/", response_class=HTMLResponse)
async def index():
    return FileResponse(config.STATIC_DIR / "index.html")


@app.get("/static/{asset_path:path}")
async def static_files(asset_path: str):
    path = (config.STATIC_DIR / asset_path).resolve()
    if config.STATIC_DIR.resolve() not in path.parents or not path.is_file():
        raise HTTPException(404, "Файл не найден.")
    return FileResponse(path)


@app.get("/api/health")
async def health():
    try:
        import faster_whisper  # noqa: F401
        asr_ready = True
    except ImportError:
        asr_ready = False
    try:
        import yt_dlp  # noqa: F401
        url_ready = True
    except ImportError:
        url_ready = False
    return {
        "app": config.APP_NAME,
        "version": config.APP_VERSION,
        "asr_installed": asr_ready,
        "url_import_installed": url_ready,
        "model": config.WHISPER_MODEL,
        "device": config.WHISPER_DEVICE,
        "llm_configured": bool(config.LLM_BASE_URL and config.LLM_MODEL),
        "data_dir": str(config.DATA_DIR),
        "queue_size": WORK_QUEUE.qsize(),
        "local_only": True,
    }


@app.get("/api/library")
def library(q: str = "", limit: int = 100):
    items = list_sources(q, limit)
    for item in items:
        item.pop("local_path", None)
    return {"items": items}


@app.post("/api/sources/upload")
async def upload_source(file: UploadFile = File(...), language: str = config.DEFAULT_LANGUAGE):
    original_name = Path(file.filename or "material").name
    extension = Path(original_name).suffix.lower()
    if extension not in config.ALLOWED_EXTENSIONS:
        raise HTTPException(415, "Этот формат пока не поддерживается.")
    source_id = uuid.uuid4().hex[:16]
    folder = config.MEDIA_DIR / source_id
    folder.mkdir(parents=True, exist_ok=True)
    target = folder / f"source{extension}"
    maximum = config.MAX_UPLOAD_MB * 1024 * 1024
    written = 0
    try:
        with target.open("wb") as stream:
            while True:
                chunk = await file.read(1024 * 1024)
                if not chunk:
                    break
                written += len(chunk)
                if written > maximum:
                    raise HTTPException(413, f"Файл больше лимита {config.MAX_UPLOAD_MB} МБ.")
                stream.write(chunk)
    except Exception:
        target.unlink(missing_ok=True)
        try:
            folder.rmdir()
        except OSError:
            pass
        raise
    finally:
        await file.close()
    if written == 0:
        target.unlink(missing_ok=True)
        raise HTTPException(400, "Файл пустой.")
    mime_type = file.content_type or mimetypes.guess_type(original_name)[0] or "application/octet-stream"
    title = Path(original_name).stem[:250] or "Новый материал"
    create_source(source_id=source_id, title=title, local_path=target, original_filename=original_name, media_type=mime_type, language=language)
    WORK_QUEUE.put(source_id)
    return {"source_id": source_id, "status": "queued", "title": title}


@app.post("/api/sources/url")
async def add_url(body: UrlRequest):
    try:
        url = validate_public_media_url(body.url)
    except UnsafeSourceError as exc:
        raise HTTPException(400, str(exc)) from exc
    source_id = uuid.uuid4().hex[:16]
    folder = config.MEDIA_DIR / source_id
    folder.mkdir(parents=True, exist_ok=True)
    create_source(source_id=source_id, title="Новый источник", local_path=folder / "pending", source_url=url, language=body.language)
    WORK_QUEUE.put(source_id)
    return {"source_id": source_id, "status": "queued", "title": "Новый источник"}


@app.get("/api/sources/{source_id}")
async def source_detail(source_id: str):
    item = get_source(source_id)
    if not item:
        raise HTTPException(404, "Материал не найден.")
    item["segment_count"] = len(get_segments(source_id, limit=100000))
    item["has_media"] = Path(item["local_path"]).is_file()
    item.pop("local_path", None)
    return item


@app.get("/api/jobs/{source_id}")
async def job_status(source_id: str):
    item = get_source(source_id)
    if not item:
        raise HTTPException(404, "Задача не найдена.")
    return {key: item.get(key) for key in ("id", "title", "status", "stage", "progress", "error", "updated_at")}


@app.get("/api/sources/{source_id}/segments")
async def source_segments(source_id: str, q: str = ""):
    if not get_source(source_id):
        raise HTTPException(404, "Материал не найден.")
    return {"segments": get_segments(source_id, q=q)}


@app.get("/api/sources/{source_id}/media")
async def source_media(source_id: str, range_header: str | None = Header(default=None, alias="Range")):
    item = get_source(source_id)
    if not item:
        raise HTTPException(404, "Материал не найден.")
    path = Path(item["local_path"])
    if not path.is_file():
        raise HTTPException(404, "Медиафайл ещё не готов.")
    size = path.stat().st_size
    media_type = item.get("media_type") or mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    start, end = 0, size - 1
    headers = {"Accept-Ranges": "bytes", "Content-Disposition": "inline"}
    status = 200
    if range_header:
        match = re.match(r"bytes=(\d*)-(\d*)$", range_header.strip())
        if not match:
            return Response(status_code=416, headers={"Content-Range": f"bytes */{size}"})
        left, right = match.groups()
        if left:
            start = int(left)
            end = int(right) if right else end
        elif right:
            length = int(right)
            start = max(0, size - length)
        if start >= size or end < start:
            return Response(status_code=416, headers={"Content-Range": f"bytes */{size}"})
        end = min(end, size - 1)
        headers["Content-Range"] = f"bytes {start}-{end}/{size}"
        status = 206
    length = end - start + 1
    headers["Content-Length"] = str(length)
    def read_range():
        with path.open("rb") as file:
            file.seek(start)
            remaining = length
            while remaining > 0:
                chunk = file.read(min(1024 * 1024, remaining))
                if not chunk:
                    break
                remaining -= len(chunk)
                yield chunk
    return StreamingResponse(read_range(), status_code=status, media_type=media_type, headers=headers)


@app.get("/api/sources/{source_id}/export")
async def export_source(source_id: str, format: str = "txt"):
    item = get_source(source_id)
    if not item:
        raise HTTPException(404, "Материал не найден.")
    segments = get_segments(source_id)
    kind = format.lower()
    safe_title = re.sub(r"[^\w.-]+", "_", item["title"], flags=re.UNICODE)[:70] or "evascribe"
    if kind == "json":
        data = {"source": {k: item.get(k) for k in ("id", "title", "creator", "source_url", "duration", "language")}, "segments": segments, "summary": item.get("summary_data", {})}
        content, media_type, extension = json.dumps(data, ensure_ascii=False, indent=2), "application/json; charset=utf-8", "json"
    elif kind in {"srt", "vtt"}:
        lines = ["WEBVTT", ""] if kind == "vtt" else []
        for index, segment in enumerate(segments, start=1):
            def stamp(value: float, comma: bool) -> str:
                ms = int(max(0, value) * 1000)
                hours, rest = divmod(ms, 3_600_000)
                minutes, rest = divmod(rest, 60_000)
                seconds, millis = divmod(rest, 1000)
                sep = "," if comma else "."
                return f"{hours:02d}:{minutes:02d}:{seconds:02d}{sep}{millis:03d}"
            if kind == "srt": lines.append(str(index))
            lines.extend([f"{stamp(segment['start'], kind == 'srt')} --> {stamp(segment['end'], kind == 'srt')}", segment["text"], ""])
        content, media_type, extension = "\n".join(lines), "text/vtt; charset=utf-8" if kind == "vtt" else "application/x-subrip; charset=utf-8", kind
    elif kind == "md":
        lines = [f"# {item['title']}", "", f"Источник: {item.get('source_url') or item.get('original_filename') or 'локальный файл'}", "", "## Транскрипт", ""]
        lines.extend(f"- **[{format_time(s['start'])}]** {s['text']}" for s in segments)
        content, media_type, extension = "\n".join(lines), "text/markdown; charset=utf-8", "md"
    else:
        content = "\n".join(f"[{format_time(s['start'])}] {s['text']}" for s in segments)
        media_type, extension = "text/plain; charset=utf-8", "txt"
    return Response(content, media_type=media_type, headers={"Content-Disposition": f"attachment; filename*=UTF-8''{__import__('urllib.parse').parse.quote(safe_title)}.{extension}"})


@app.post("/api/ask")
def ask(body: AskRequest):
    if body.source_id:
        source = get_source(body.source_id)
        if not source:
            raise HTTPException(404, "Материал не найден.")
        segments = get_segments(body.source_id)
        return answer_question(body.question, source["title"], segments)
    items = list_sources(body.question, limit=20)
    evidence = []
    for item in items[:5]:
        for segment in get_segments(item["id"], query=body.question, limit=2):
            evidence.append({"source_id": item["id"], "title": item["title"], "start": segment["start"], "time": format_time(segment["start"]), "text": segment["text"]})
    return {"answer": "Поиск выполнен по сохранённой медиатеке. Совпадения ниже — текстовые результаты, не независимая проверка фактов.", "evidence": evidence, "mode": "library_search"}


@app.delete("/api/sources/{source_id}")
async def remove_source(source_id: str):
    item = delete_source(source_id)
    if not item:
        raise HTTPException(404, "Материал не найден.")
    path = Path(item["local_path"])
    folder = path.parent
    import shutil
    if folder.exists() and config.MEDIA_DIR.resolve() in folder.resolve().parents:
        shutil.rmtree(folder, ignore_errors=True)
    return {"deleted": True, "source_id": source_id}
