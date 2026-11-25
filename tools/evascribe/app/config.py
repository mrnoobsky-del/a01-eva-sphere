from __future__ import annotations

import os
from pathlib import Path


def _default_data_dir() -> Path:
    if os.name == "nt":
        root = os.environ.get("LOCALAPPDATA") or str(Path.home() / "AppData" / "Local")
        return Path(root) / "EvaScribe"
    return Path(os.environ.get("XDG_DATA_HOME", Path.home() / ".local" / "share")) / "evascribe"


APP_DIR = Path(__file__).resolve().parent
PROJECT_DIR = APP_DIR.parent

def _load_env_file() -> None:
    env_file = PROJECT_DIR / ".env"
    if not env_file.is_file():
        return
    for raw_line in env_file.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key, value = key.strip(), value.strip().strip('"').strip("'")
        if key and key not in os.environ:
            os.environ[key] = value

_load_env_file()
STATIC_DIR = APP_DIR / "static"
DATA_DIR = Path(os.environ.get("EVASCRIBE_DATA_DIR", _default_data_dir())).expanduser().resolve()
DB_PATH = DATA_DIR / "evascribe.sqlite3"
MEDIA_DIR = DATA_DIR / "media"
MODEL_DIR = DATA_DIR / "models"

APP_NAME = "EvaScribe"
APP_VERSION = "0.1.0"
WHISPER_MODEL = os.environ.get("EVASCRIBE_MODEL", "base").strip() or "base"
WHISPER_DEVICE = os.environ.get("EVASCRIBE_DEVICE", "cpu").strip().lower() or "cpu"
WHISPER_COMPUTE_TYPE = os.environ.get("EVASCRIBE_COMPUTE_TYPE", "int8").strip() or "int8"
DEFAULT_LANGUAGE = os.environ.get("EVASCRIBE_LANGUAGE", "auto").strip() or "auto"
MAX_UPLOAD_MB = int(os.environ.get("EVASCRIBE_MAX_UPLOAD_MB", "2048"))
MAX_MEDIA_SECONDS = int(os.environ.get("EVASCRIBE_MAX_MEDIA_SECONDS", str(4 * 60 * 60)))

# Keep URL ingestion deliberately narrow for the first local release.
ALLOWED_HOSTS = tuple(
    host.strip().lower()
    for host in os.environ.get("EVASCRIBE_ALLOWED_HOSTS", "youtube.com,www.youtube.com,m.youtube.com,youtu.be").split(",")
    if host.strip()
)

# Optional OpenAI-compatible endpoint (Ollama can expose this API locally).
LLM_BASE_URL = os.environ.get("EVASCRIBE_LLM_BASE_URL", "").strip().rstrip("/")
LLM_MODEL = os.environ.get("EVASCRIBE_LLM_MODEL", "").strip()
LLM_API_KEY = os.environ.get("EVASCRIBE_LLM_API_KEY", "").strip()
LLM_TIMEOUT_SECONDS = int(os.environ.get("EVASCRIBE_LLM_TIMEOUT_SECONDS", "90"))

ALLOWED_EXTENSIONS = {
    ".mp4", ".mkv", ".mov", ".webm", ".avi", ".m4v",
    ".mp3", ".wav", ".m4a", ".aac", ".flac", ".ogg", ".opus",
}


def ensure_directories() -> None:
    for folder in (DATA_DIR, MEDIA_DIR, MODEL_DIR):
        folder.mkdir(parents=True, exist_ok=True)
