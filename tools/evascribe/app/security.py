from __future__ import annotations

import ipaddress
import socket
from urllib.parse import urlparse

from .config import ALLOWED_HOSTS


class UnsafeSourceError(ValueError):
    pass


def validate_public_media_url(value: str) -> str:
    """Accept only HTTPS links on configured media domains and public DNS addresses."""
    parsed = urlparse((value or "").strip())
    if parsed.scheme.lower() != "https":
        raise UnsafeSourceError("Для ссылок разрешён только HTTPS.")
    if not parsed.hostname or parsed.username or parsed.password:
        raise UnsafeSourceError("Некорректный адрес источника.")
    try:
        port = parsed.port
    except ValueError as exc:
        raise UnsafeSourceError("Некорректный порт источника.") from exc
    if port not in (None, 443):
        raise UnsafeSourceError("Нестандартные порты запрещены.")
    host = parsed.hostname.lower().rstrip(".")
    if not any(host == allowed or host.endswith("." + allowed) for allowed in ALLOWED_HOSTS):
        raise UnsafeSourceError("Этот домен не включён в список источников EvaScribe.")
    try:
        addresses = {entry[4][0] for entry in socket.getaddrinfo(host, 443, type=socket.SOCK_STREAM)}
    except socket.gaierror as exc:
        raise UnsafeSourceError("Не удалось проверить домен источника.") from exc
    if not addresses:
        raise UnsafeSourceError("У источника не найден публичный адрес.")
    for raw in addresses:
        try:
            address = ipaddress.ip_address(raw)
        except ValueError as exc:
            raise UnsafeSourceError("Не удалось проверить сетевой адрес источника.") from exc
        if not address.is_global:
            raise UnsafeSourceError("Внутренние, локальные и зарезервированные адреса запрещены.")
    return parsed.geturl()


def safe_error(error: Exception, max_chars: int = 420) -> str:
    text = " ".join(str(error).replace("\x00", " ").split())
    # Avoid leaking user secrets or local credentials in logs/UI.
    for marker in ("Bearer ", "sk-"):
        if marker in text:
            text = text.split(marker, 1)[0] + "[скрыто]"
    return text[:max_chars] or error.__class__.__name__
