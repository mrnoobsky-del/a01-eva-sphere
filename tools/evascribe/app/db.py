from __future__ import annotations

import json
import sqlite3
from contextlib import contextmanager
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterator

from .config import DB_PATH, ensure_directories


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


@contextmanager
def connect() -> Iterator[sqlite3.Connection]:
    ensure_directories()
    connection = sqlite3.connect(DB_PATH, timeout=30)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA journal_mode=WAL")
    connection.execute("PRAGMA foreign_keys=ON")
    connection.execute("PRAGMA busy_timeout=30000")
    try:
        yield connection
        connection.commit()
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()


def init_db() -> None:
    with connect() as db:
        db.executescript(
            """
            CREATE TABLE IF NOT EXISTS sources (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                creator TEXT,
                source_url TEXT,
                local_path TEXT NOT NULL,
                original_filename TEXT,
                media_type TEXT,
                duration REAL,
                language TEXT,
                status TEXT NOT NULL DEFAULT 'queued',
                progress INTEGER NOT NULL DEFAULT 0,
                stage TEXT NOT NULL DEFAULT 'queued',
                summary TEXT NOT NULL DEFAULT '',
                summary_json TEXT NOT NULL DEFAULT '{}',
                error TEXT NOT NULL DEFAULT '',
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS segments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                source_id TEXT NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
                start REAL NOT NULL,
                end REAL NOT NULL,
                text TEXT NOT NULL,
                speaker TEXT,
                UNIQUE(source_id, start, end, text)
            );
            CREATE INDEX IF NOT EXISTS idx_segments_source_start ON segments(source_id, start);
            CREATE VIRTUAL TABLE IF NOT EXISTS library_fts USING fts5(source_id UNINDEXED, title, creator, summary, transcript);
            """
        )


def row_to_dict(row: sqlite3.Row | None) -> dict[str, Any] | None:
    if row is None:
        return None
    item = dict(row)
    try:
        item["summary_data"] = json.loads(item.pop("summary_json") or "{}")
    except (ValueError, TypeError):
        item["summary_data"] = {}
        item.pop("summary_json", None)
    return item


def create_source(
    *, source_id: str, title: str, local_path: Path, source_url: str | None = None,
    original_filename: str | None = None, media_type: str | None = None,
    creator: str | None = None, duration: float | None = None, language: str | None = None,
) -> None:
    now = now_iso()
    with connect() as db:
        db.execute(
            """INSERT INTO sources
            (id,title,creator,source_url,local_path,original_filename,media_type,duration,language,status,progress,stage,created_at,updated_at)
            VALUES (?,?,?,?,?,?,?,?,?,'queued',0,'queued',?,?)""",
            (source_id, title, creator, source_url, str(local_path), original_filename, media_type, duration, language, now, now),
        )
        db.execute("INSERT INTO library_fts(source_id,title,creator,summary,transcript) VALUES (?,?,?,?,?)", (source_id, title, creator or "", "", ""))


def update_source(source_id: str, **fields: Any) -> None:
    allowed = {"title", "creator", "local_path", "duration", "language", "status", "progress", "stage", "summary", "summary_json", "error", "media_type"}
    updates = {key: value for key, value in fields.items() if key in allowed}
    if not updates:
        return
    updates["updated_at"] = now_iso()
    assignments = ",".join(f"{key}=?" for key in updates)
    with connect() as db:
        db.execute(f"UPDATE sources SET {assignments} WHERE id=?", (*updates.values(), source_id))
        if "title" in updates or "creator" in updates or "summary" in updates:
            row = db.execute("SELECT title,creator,summary FROM sources WHERE id=?", (source_id,)).fetchone()
            if row:
                db.execute("UPDATE library_fts SET title=?,creator=?,summary=? WHERE source_id=?", (row["title"], row["creator"] or "", row["summary"] or "", source_id))


def replace_segments(source_id: str, segments: list[dict[str, Any]]) -> None:
    with connect() as db:
        db.execute("DELETE FROM segments WHERE source_id=?", (source_id,))
        db.executemany(
            "INSERT OR IGNORE INTO segments(source_id,start,end,text,speaker) VALUES (?,?,?,?,?)",
            [(source_id, float(s["start"]), float(s["end"]), str(s["text"]), s.get("speaker")) for s in segments],
        )
        transcript = "\n".join(str(s["text"]) for s in segments)
        db.execute("UPDATE library_fts SET transcript=? WHERE source_id=?", (transcript, source_id))


def get_source(source_id: str) -> dict[str, Any] | None:
    with connect() as db:
        return row_to_dict(db.execute("SELECT * FROM sources WHERE id=?", (source_id,)).fetchone())


def list_sources(query: str = "", limit: int = 100) -> list[dict[str, Any]]:
    limit = max(1, min(int(limit), 300))
    with connect() as db:
        if query.strip():
            token = query.strip().replace('"', ' ')
            try:
                rows = db.execute(
                    "SELECT s.* FROM library_fts f JOIN sources s ON s.id=f.source_id WHERE library_fts MATCH ? ORDER BY s.updated_at DESC LIMIT ?",
                    (f'"{token}"*', limit),
                ).fetchall()
            except sqlite3.OperationalError:
                like = f"%{query.strip()}%"
                rows = db.execute("SELECT * FROM sources WHERE title LIKE ? OR summary LIKE ? ORDER BY updated_at DESC LIMIT ?", (like, like, limit)).fetchall()
        else:
            rows = db.execute("SELECT * FROM sources ORDER BY updated_at DESC LIMIT ?", (limit,)).fetchall()
        return [row_to_dict(row) for row in rows if row]


def get_segments(source_id: str, query: str = "", limit: int = 10000) -> list[dict[str, Any]]:
    with connect() as db:
        if query.strip():
            like = f"%{query.strip()}%"
            rows = db.execute("SELECT id,start,end,text,speaker FROM segments WHERE source_id=? AND text LIKE ? ORDER BY start LIMIT ?", (source_id, like, limit)).fetchall()
        else:
            rows = db.execute("SELECT id,start,end,text,speaker FROM segments WHERE source_id=? ORDER BY start LIMIT ?", (source_id, limit)).fetchall()
        return [dict(row) for row in rows]


def update_summary_index(source_id: str, transcript: str, summary: str) -> None:
    with connect() as db:
        db.execute("UPDATE library_fts SET transcript=?,summary=? WHERE source_id=?", (transcript, summary, source_id))


def delete_source(source_id: str) -> dict[str, Any] | None:
    with connect() as db:
        row = db.execute("SELECT * FROM sources WHERE id=?", (source_id,)).fetchone()
        if not row:
            return None
        item = dict(row)
        db.execute("DELETE FROM library_fts WHERE source_id=?", (source_id,))
        db.execute("DELETE FROM sources WHERE id=?", (source_id,))
        return item
