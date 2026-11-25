from __future__ import annotations

import html
import mimetypes
import re
from pathlib import Path
from typing import Any, Callable

from .analysis import extractive_overview
from .config import MEDIA_DIR, MAX_MEDIA_SECONDS, MODEL_DIR, WHISPER_COMPUTE_TYPE, WHISPER_DEVICE, WHISPER_MODEL
from .db import replace_segments, update_source
from .security import safe_error

_MODEL = None
_MODEL_LOCK = None


def _get_model():
    global _MODEL, _MODEL_LOCK
    if _MODEL_LOCK is None:
        import threading
        _MODEL_LOCK = threading.Lock()
    with _MODEL_LOCK:
        if _MODEL is None:
            from faster_whisper import WhisperModel
            _MODEL = WhisperModel(
                WHISPER_MODEL,
                device=WHISPER_DEVICE,
                compute_type=WHISPER_COMPUTE_TYPE,
                download_root=str(MODEL_DIR),
            )
        return _MODEL


def _parse_vtt(path: Path) -> list[dict[str, Any]]:
    """Parse ordinary WebVTT cues returned by public caption tracks."""
    content = path.read_text(encoding="utf-8-sig", errors="replace")
    timestamp = re.compile(r"(?:(\d{1,2}):)?(\d{2}):(\d{2})[.,](\d{3})\s+-->\s+(?:(\d{1,2}):)?(\d{2}):(\d{2})[.,](\d{3})")
    def seconds(groups: tuple[str | None, ...], offset: int) -> float:
        hours = int(groups[offset] or 0)
        minutes = int(groups[offset + 1])
        secs = int(groups[offset + 2])
        millis = int(groups[offset + 3])
        return hours * 3600 + minutes * 60 + secs + millis / 1000
    cues: list[dict[str, Any]] = []
    current_start = None
    current_end = None
    text_lines: list[str] = []
    def flush() -> None:
        nonlocal text_lines, current_start, current_end
        if current_start is not None and current_end is not None and text_lines:
            text = " ".join(line.strip() for line in text_lines if line.strip())
            text = html.unescape(re.sub(r"<[^>]+>", "", text))
            text = re.sub(r"\s+", " ", text).strip()
            if text:
                cues.append({"start": current_start, "end": current_end, "text": text, "speaker": None})
        text_lines = []
        current_start = current_end = None
    for line in content.splitlines():
        match = timestamp.search(line)
        if match:
            flush()
            current_start = seconds(match.groups(), 0)
            current_end = seconds(match.groups(), 4)
        elif current_start is not None:
            if line.strip() and not line.strip().isdigit() and not line.strip().startswith(("NOTE", "STYLE", "REGION")):
                text_lines.append(line)
    flush()
    # Remove exact duplicate captions while preserving timeline order.
    unique: list[dict[str, Any]] = []
    seen: set[tuple[float, float, str]] = set()
    for cue in cues:
        key = (round(cue["start"], 3), round(cue["end"], 3), cue["text"])
        if key not in seen:
            seen.add(key)
            unique.append(cue)
    return unique


def _download_url(source_id: str, url: str, progress: Callable[[str, int, str], None]) -> tuple[Path, dict[str, Any], list[dict[str, Any]]]:
    try:
        import yt_dlp
    except ImportError as exc:
        raise RuntimeError("Для обработки ссылок установите yt-dlp из requirements.txt.") from exc
    folder = MEDIA_DIR / source_id
    folder.mkdir(parents=True, exist_ok=True)
    meta: dict[str, Any] = {}
    def hook(info: dict[str, Any]) -> None:
        if info.get("status") == "downloading":
            total = info.get("total_bytes") or info.get("total_bytes_estimate") or 0
            downloaded = info.get("downloaded_bytes") or 0
            percent = int(downloaded / total * 25) if total else 8
            progress("downloading", min(28, max(6, percent)), "Получение разрешённого источника")
        elif info.get("status") == "finished":
            progress("downloading", 30, "Медиа получено, подготовка к расшифровке")

    def match_filter(info: dict[str, Any], *, incomplete: bool = False):
        duration = info.get("duration")
        if duration and duration > MAX_MEDIA_SECONDS:
            return f"Длительность превышает установленный лимит {MAX_MEDIA_SECONDS // 60} минут."
        return None

    options = {
        "format": "bestaudio/best",
        "outtmpl": str(folder / "source.%(ext)s"),
        "noplaylist": True,
        "writesubtitles": True,
        "writeautomaticsub": True,
        "subtitleslangs": ["ru", "en", "ru.*", "en.*"],
        "subtitlesformat": "vtt/best",
        "quiet": True,
        "no_warnings": True,
        "restrictfilenames": True,
        "max_filesize": 2 * 1024 * 1024 * 1024,
        "match_filter": match_filter,
        "progress_hooks": [hook],
        "socket_timeout": 30,
        "retries": 2,
        "extractor_retries": 1,
    }
    with yt_dlp.YoutubeDL(options) as ydl:
        info = ydl.extract_info(url, download=False)
        if not info:
            raise RuntimeError("Источник не вернул метаданные.")
        if info.get("duration") and info["duration"] > MAX_MEDIA_SECONDS:
            raise RuntimeError(f"Длительность превышает лимит {MAX_MEDIA_SECONDS // 60} минут.")
        meta = {"title": info.get("title") or "Видео без названия", "creator": info.get("uploader") or info.get("channel"), "duration": info.get("duration"), "thumbnail": info.get("thumbnail")}
        ydl.download([url])
    subtitle_files = sorted(folder.glob("source*.vtt"))
    captions: list[dict[str, Any]] = []
    for subtitle in subtitle_files:
        captions = _parse_vtt(subtitle)
        if captions:
            meta["caption_file"] = subtitle.name
            language_match = re.search(r"\.(ru|en)(?:[-_.][^.]*)?\.vtt$", subtitle.name, flags=re.IGNORECASE)
            meta["caption_language"] = language_match.group(1).lower() if language_match else None
            break
    files = [p for p in folder.glob("source.*") if p.is_file() and p.suffix.lower() not in {".part", ".ytdl", ".vtt", ".json"}]
    if not files:
        # yt-dlp can append language/format suffixes to subtitle and media outputs.
        files = [p for p in folder.iterdir() if p.is_file() and p.suffix.lower() not in {".part", ".ytdl", ".vtt", ".json"}]
    if not files:
        if captions:
            # The source has captions but no downloadable audio rendition.
            return folder / "captions-only.media", meta, captions
        raise RuntimeError("Загрузка завершилась, но медиафайл не найден.")
    files.sort(key=lambda p: p.stat().st_size, reverse=True)
    return files[0], meta, captions


def transcribe_file(source_id: str, path: Path, language: str | None, progress: Callable[[str, int, str], None], expected_duration: float | None = None) -> tuple[list[dict[str, Any]], dict[str, Any]]:
    if not path.exists() or not path.is_file():
        raise RuntimeError("Исходный медиафайл не найден.")
    model = _get_model()
    progress("transcribing", 34, f"Загрузка модели Whisper · {WHISPER_MODEL}")
    segments_iter, info = model.transcribe(
        str(path),
        language=language if language and language != "auto" else None,
        beam_size=5,
        vad_filter=True,
        condition_on_previous_text=True,
    )
    duration = float(getattr(info, "duration", 0) or expected_duration or 0)
    language_detected = getattr(info, "language", None)
    rows: list[dict[str, Any]] = []
    for segment in segments_iter:
        start = float(segment.start)
        end = float(segment.end)
        rows.append({"start": start, "end": end, "text": str(segment.text).strip(), "speaker": None})
        if duration > 0:
            percent = 38 + int(min(1.0, end / duration) * 53)
        else:
            percent = min(88, 38 + len(rows) // 2)
        progress("transcribing", percent, f"Распознано фрагментов: {len(rows)}")
    if not rows:
        raise RuntimeError("Речь не обнаружена. Проверьте звук или выберите другой файл.")
    replace_segments(source_id, rows)
    progress("analyzing", 94, "Формирование чернового обзора")
    overview = extractive_overview(rows)
    return rows, {"language": language_detected, "duration": duration, "overview": overview}


def process_source(source: dict[str, Any], progress: Callable[[str, int, str], None]) -> None:
    source_id = source["id"]
    path = Path(source["local_path"])
    try:
        creator = source.get("creator")
        duration = source.get("duration")
        if source.get("source_url"):
            update_source(source_id, status="downloading", stage="downloading", progress=5, error="")
            path, meta, captions = _download_url(source_id, source["source_url"], progress)
            suffix = path.suffix.lower()
            audio_types = {".webm": "audio/webm", ".m4a": "audio/mp4", ".mp3": "audio/mpeg", ".opus": "audio/ogg", ".ogg": "audio/ogg", ".wav": "audio/wav", ".aac": "audio/aac", ".flac": "audio/flac"}
            media_type = audio_types.get(suffix) or ("text/plain" if captions and not path.is_file() else mimetypes.guess_type(path.name)[0] or "application/octet-stream")
            update_source(source_id, title=meta["title"], creator=meta.get("creator"), duration=meta.get("duration"), local_path=str(path), media_type=media_type)
            creator, duration = meta.get("creator"), meta.get("duration")
            if captions:
                progress("analyzing", 92, "Используются доступные субтитры источника")
                replace_segments(source_id, captions)
                summary_json = extractive_overview(captions)
                transcript = "\n".join(row["text"] for row in captions)
                summary_text = "\n".join([summary_json.get("label", "Обзор"), summary_json.get("note", ""), "Ключевые темы: " + ", ".join(summary_json.get("keywords", []))])
                update_source(source_id, status="ready", stage="ready", progress=100, language=meta.get("caption_language") or source.get("language"), duration=duration, summary=summary_text, summary_json=__import__("json").dumps(summary_json, ensure_ascii=False), error="")
                return
        update_source(source_id, status="transcribing", stage="transcribing", progress=32, error="")
        rows, result = transcribe_file(source_id, path, source.get("language"), progress, duration)
        transcript = "\n".join(row["text"] for row in rows)
        summary_json = result["overview"]
        summary_text = "\n".join([summary_json.get("label", "Обзор"), summary_json.get("note", ""), "Ключевые темы: " + ", ".join(summary_json.get("keywords", []))])
        update_source(
            source_id,
            status="ready", stage="ready", progress=100, language=result.get("language") or source.get("language"),
            duration=result.get("duration") or duration, summary=summary_text,
            summary_json=__import__("json").dumps(summary_json, ensure_ascii=False), error="",
        )
    except Exception as exc:
        update_source(source_id, status="failed", stage="failed", progress=0, error=safe_error(exc))
