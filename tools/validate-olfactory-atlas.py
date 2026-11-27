#!/usr/bin/env python3
"""Validate the A-01 olfactory registry, example data and static atlas prototype."""
from __future__ import annotations
import csv
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
registry = ROOT / "docs/A01-OLF-04-SPACE-ZONE-REGISTER-v0.1_RU.csv"
schema_file = ROOT / "schemas/a01-olfactory-zone-v0.1.schema.json"
example_file = ROOT / "schemas/a01-olfactory-zone-registry-v0.1.example.json"
atlas_file = ROOT / "digital-twin/a01-olfactory-atlas.html"

schema = json.loads(schema_file.read_text(encoding="utf-8"))
example = json.loads(example_file.read_text(encoding="utf-8"))
assert schema["type"] == "object"
assert "olfactory_mode" in schema["properties"]
assert example["default_mode"] == "O0_NO_ADDED_SCENT"
assert example["no_common_hvac_scenting"] is True

with registry.open(encoding="utf-8-sig", newline="") as stream:
    rows = list(csv.DictReader(stream))
required = {"zone_id", "level", "olfactory_mode", "allowed_source", "prohibited_source", "owner_role", "status"}
assert rows, "The zone register must not be empty."
assert required.issubset(rows[0].keys()), "Required registry columns are missing."
ids = [row["zone_id"] for row in rows]
assert len(ids) == len(set(ids)), "Duplicate zone_id."
allowed = set(schema["properties"]["olfactory_mode"]["enum"])
for row in rows:
    assert row["zone_id"] and row["zone_name"]
    assert row["olfactory_mode"] in allowed, f"Unsupported mode: {row['zone_id']}"
    assert row["owner_role"], f"Missing owner role: {row['zone_id']}"
    assert row["status"] == "concept", "v0.1 must not imply real installations are approved."
for zone in rows:
    if zone["zone_id"] != "L02-OLF-STUDIO":
        assert zone["olfactory_mode"] != "O2_PERSONAL_NEAR_FIELD_SAMPLE", "O2 may only appear in Olfactory Studio in this baseline."
assert next(row for row in rows if row["zone_id"] == "L02-OLF-STUDIO")["olfactory_mode"] == "O2_PERSONAL_NEAR_FIELD_SAMPLE"

html = atlas_file.read_text(encoding="utf-8")
assert '<html lang="ru">' in html
for marker in ("NO ADDED SCENT", "Olfactory Studio", "ATMOSPHERE PROFILE", "sampleToggle", "не распыляется"):
    assert marker.lower() in html.lower(), f"Missing UI marker: {marker}"
scripts = re.findall(r"<script\b[^>]*>([\s\S]*?)</script>", html, flags=re.I)
assert scripts, "No inline JavaScript found."
for i, script in enumerate(scripts):
    output = Path(f"/tmp/a01-olfactory-atlas-{i}.js")
    output.write_text(script, encoding="utf-8")
print(f"Validated {len(rows)} zones, schema and {len(scripts)} script blocks.")
