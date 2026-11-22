#!/usr/bin/env python3
"""Static checks for the A-01 v4.0.0 primary HTML build.

This verifies source integrity and JavaScript syntax only. It does not render
WebGL, measure visual intersections, validate architectural safety, or certify
engineering performance.
"""
from __future__ import annotations

import json
import shutil
import subprocess
import sys
import tempfile
from html.parser import HTMLParser
from pathlib import Path


class DocumentInspector(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: list[str] = []
        self.scripts: list[tuple[dict[str, str | None], str]] = []
        self._attrs: dict[str, str | None] | None = None
        self._data: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr = dict(attrs)
        if attr.get("id"):
            self.ids.append(str(attr["id"]))
        if tag.lower() == "script":
            self._attrs, self._data = attr, []

    def handle_data(self, data: str) -> None:
        if self._attrs is not None:
            self._data.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() == "script" and self._attrs is not None:
            self.scripts.append((self._attrs, "".join(self._data).strip()))
            self._attrs, self._data = None, []


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    path = Path(sys.argv[1]) if len(sys.argv) > 1 else root / "digital-twin/eva-sphere-a01-v400-primary-architecture-baseline.html"
    if not path.is_file():
        print(f"ERROR: HTML file not found: {path}", file=sys.stderr)
        return 2

    source = path.read_text(encoding="utf-8")
    doc = DocumentInspector()
    doc.feed(source)

    duplicates = sorted({value for value in doc.ids if doc.ids.count(value) > 1})
    if duplicates:
        print("ERROR: duplicate HTML IDs: " + ", ".join(duplicates), file=sys.stderr)
        return 1

    importmap_found = False
    inline_scripts: list[tuple[str, str]] = []
    for attrs, content in doc.scripts:
        kind = (attrs.get("type") or "").strip().lower()
        if kind == "importmap":
            json.loads(content)
            importmap_found = True
        elif content and not attrs.get("src") and kind not in {"application/json", "application/ld+json"}:
            inline_scripts.append((kind, content))

    if not importmap_found:
        print("ERROR: import map not found", file=sys.stderr)
        return 1

    required = {
        "v4.0.0 version metadata": 'name="eva-sphere-version" content="4.0.0"',
        "primary build metadata": 'name="eva-a01-build" content="4.0.0-primary-architecture"',
        "12 modules per level": "DOLEK_COUNT_PER_LEVEL = 12",
        "five-level loop": "for(let level=0;level<=4;level++)",
        "inset vestibule": "innerDoorRadius:innerWallRadius+.82",
        "swing door pivots": "outerLeftPivot.rotation.y",
        "eye-height camera": "walkEyeHeight",
        "centred walk path": "const walkRadius=4.40",
    }
    missing = [label for label, marker in required.items() if marker not in source]
    if missing:
        print("ERROR: required markers missing: " + ", ".join(missing), file=sys.stderr)
        return 1

    node = shutil.which("node")
    if not node:
        print("ERROR: Node.js is required for inline JavaScript syntax checks", file=sys.stderr)
        return 2

    failures: list[str] = []
    with tempfile.TemporaryDirectory(prefix="a01-v400-") as temp:
        for index, (kind, script) in enumerate(inline_scripts, start=1):
            suffix = ".mjs" if kind == "module" else ".js"
            script_path = Path(temp) / f"inline-{index}{suffix}"
            script_path.write_text(script, encoding="utf-8")
            checked = subprocess.run([node, "--check", str(script_path)], capture_output=True, text=True)
            if checked.returncode:
                failures.append(f"Inline script {index}: {checked.stderr.strip()}")

    if failures:
        print("ERROR: JavaScript syntax check failed", file=sys.stderr)
        print("\n".join(failures), file=sys.stderr)
        return 1

    print("A-01 v4.0.0 static validation: PASS")
    print(f"File: {path.name} ({path.stat().st_size:,} bytes)")
    print(f"HTML IDs: {len(doc.ids)}; duplicates: 0")
    print("Import map: valid JSON")
    print(f"Inline JavaScript blocks: {len(inline_scripts)}; syntax errors: 0")
    print("Architecture markers: " + ", ".join(required))
    print("Note: browser/WebGL visual and engineering validation are not covered.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
