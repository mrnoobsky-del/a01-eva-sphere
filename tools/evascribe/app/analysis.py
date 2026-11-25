from __future__ import annotations

import json
import re
import urllib.error
import urllib.request
from collections import Counter
from typing import Any

from .config import LLM_API_KEY, LLM_BASE_URL, LLM_MODEL, LLM_TIMEOUT_SECONDS

STOPWORDS = {
    "это", "как", "что", "чтобы", "или", "для", "при", "если", "так", "когда", "где", "тут", "там", "его", "ее", "они", "она", "оно", "этот", "эта", "эти", "быть", "было", "есть", "будет", "уже", "ещё", "еще", "вот", "мы", "вы", "я", "он", "она", "они", "the", "and", "for", "with", "that", "this", "from", "are", "was", "were", "you", "your", "have", "has", "not", "but", "into", "about", "then", "than", "can", "will", "its", "our", "they", "their", "there", "what", "when", "where", "who", "how", "why", "because", "which", "while", "also", "just", "very", "more", "most", "some", "such", "only", "over", "under", "one", "two", "three",
}


def format_time(seconds: float) -> str:
    value = max(0, int(float(seconds)))
    hours, remainder = divmod(value, 3600)
    minutes, secs = divmod(remainder, 60)
    return f"{hours:02d}:{minutes:02d}:{secs:02d}" if hours else f"{minutes:02d}:{secs:02d}"


def extractive_overview(segments: list[dict[str, Any]]) -> dict[str, Any]:
    words = re.findall(r"[A-Za-zА-Яа-яЁё0-9-]{3,}", " ".join(s["text"] for s in segments).lower())
    keywords = [word for word, count in Counter(w for w in words if w not in STOPWORDS and not w.isdigit()).most_common(8)]
    useful = [s for s in segments if len(str(s.get("text", "")).strip()) > 30]
    count = min(5, len(useful))
    if count:
        step = max(1, len(useful) // count)
        highlights = useful[::step][:count]
    else:
        highlights = useful
    excerpts = [{"time": format_time(s["start"]), "start": s["start"], "text": str(s["text"]).strip()} for s in highlights]
    return {
        "mode": "extractive",
        "label": "Черновой обзор по транскрипту",
        "note": "Это выборка характерных фрагментов и частотных терминов, а не AI-вывод и не проверка фактов.",
        "keywords": keywords,
        "highlights": excerpts,
    }


def call_llm(messages: list[dict[str, str]]) -> str | None:
    if not LLM_BASE_URL or not LLM_MODEL:
        return None
    url = LLM_BASE_URL
    if not url.endswith("/chat/completions"):
        url += "/chat/completions"
    payload = json.dumps({"model": LLM_MODEL, "messages": messages, "temperature": 0.2}).encode("utf-8")
    headers = {"Content-Type": "application/json"}
    if LLM_API_KEY:
        headers["Authorization"] = f"Bearer {LLM_API_KEY}"
    request = urllib.request.Request(url, data=payload, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(request, timeout=LLM_TIMEOUT_SECONDS) as response:
            data = json.loads(response.read().decode("utf-8"))
        return str(data["choices"][0]["message"]["content"]).strip()
    except (OSError, ValueError, KeyError, IndexError, urllib.error.URLError):
        return None


def answer_question(question: str, title: str, segments: list[dict[str, Any]]) -> dict[str, Any]:
    if not segments:
        return {"answer": "У этого материала пока нет расшифровки.", "evidence": [], "mode": "search"}
    transcript = "\n".join(f"[{format_time(s['start'])}] {s['text']}" for s in segments)
    clipped = transcript[:26000]
    answer = call_llm([
        {"role": "system", "content": "Ты аналитический помощник EvaScribe. Отвечай только по предоставленному транскрипту. Не добавляй факты из памяти. Для каждого существенного утверждения укажи таймкод в квадратных скобках, используя только имеющиеся метки времени. Если ответа нет в тексте, скажи об этом прямо. Различай слова спикера и проверенные факты."},
        {"role": "user", "content": f"Материал: {title}\nВопрос: {question}\n\nТранскрипт с таймкодами:\n{clipped}"},
    ])
    if answer:
        return {"answer": answer, "evidence": [], "mode": "llm"}

    terms = [w for w in re.findall(r"[A-Za-zА-Яа-яЁё0-9-]{3,}", question.lower()) if w not in STOPWORDS]
    scored = []
    for seg in segments:
        text = str(seg["text"])
        low = text.lower()
        score = sum(low.count(term) for term in terms)
        if score:
            scored.append((score, seg))
    scored.sort(key=lambda item: (-item[0], item[1]["start"]))
    evidence = [
        {"start": float(s["start"]), "end": float(s["end"]), "time": format_time(s["start"]), "text": s["text"]}
        for _, s in scored[:6]
    ]
    if evidence:
        message = "Локальная модель анализа не подключена. Я нашёл фрагменты транскрипта по словам вопроса. Это поиск по тексту, а не смысловой вывод."
    else:
        message = "В транскрипте не нашлось совпадений по словам вопроса. Можно попробовать другие формулировки."
    return {"answer": message, "evidence": evidence, "mode": "search"}
