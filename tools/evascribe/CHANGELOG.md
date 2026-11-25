# Changelog

## 0.1.0 — 2026-11-25

- First Windows-first local MVP.
- Local file ingestion and allowlisted YouTube URL ingestion.
- Prefer available VTT captions; fall back to faster-whisper transcription.
- SQLite library, FTS5 search, transcript timestamps and exports.
- Local-only FastAPI app with responsive research workspace.
- Resume interrupted queue items on application restart.
- Harden URL port and private-DNS validation.
- Respect the selected upload language and prefer matching captions for URL imports.
- Optional OpenAI-compatible endpoint for transcript Q&A.
