#!/usr/bin/env python3
"""Validate the A-01 spatial-to-olfactory crosswalk against source registries."""
from __future__ import annotations
import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
matrix_file = ROOT / "docs/A01-MASTER-SPACES-SYSTEMS-MATRIX-v0.1_RU.csv"
zone_file = ROOT / "docs/A01-OLF-04-SPACE-ZONE-REGISTER-v0.1_RU.csv"
data_file = ROOT / "data/a01-olfactory-spatial-crosswalk-v0.1.json"

def read_csv(path: Path):
    with path.open(encoding="utf-8-sig", newline="") as stream:
        return list(csv.DictReader(stream))

matrix = read_csv(matrix_file)
zones = read_csv(zone_file)
crosswalk = json.loads(data_file.read_text(encoding="utf-8"))

assert len(matrix) == 60, f"Expected 60 source spaces, got {len(matrix)}"
assert crosswalk["schema_version"] == "0.1"
assert crosswalk["status"] == "concept"
assert crosswalk["hardware_connected"] is False
assert crosswalk["source_matrix"] == "docs/A01-MASTER-SPACES-SYSTEMS-MATRIX-v0.1_RU.csv"
assert crosswalk["source_zone_register"] == "docs/A01-OLF-04-SPACE-ZONE-REGISTER-v0.1_RU.csv"

source_by_id = {row["spatial_id"]: row for row in matrix}
zone_ids = {row["zone_id"] for row in zones}
profiles = {row["profile_id"]: row for row in crosswalk["profiles"]}
assert len(profiles) == len(crosswalk["profiles"]), "Duplicate profile_id."
spaces = crosswalk["spaces"]
space_by_id = {row["spatial_id"]: row for row in spaces}
assert len(space_by_id) == len(spaces), "Duplicate spatial_id."
assert set(space_by_id) == set(source_by_id), (
    f"ID mismatch; missing={sorted(set(source_by_id)-set(space_by_id))}, "
    f"unexpected={sorted(set(space_by_id)-set(source_by_id))}"
)

allowed_modes = {"O0_NO_ADDED_SCENT", "O1_NATURAL_AMBIENCE_ONLY"}
for spatial_id, source in source_by_id.items():
    item = space_by_id[spatial_id]
    assert item["level"] == source["level"], f"Wrong level for {spatial_id}"
    assert item["module_name"] == source["module_name"], f"Name drift for {spatial_id}"
    assert item["mapping_status"] == "proposed", f"Unexpected approval state for {spatial_id}"
    assert item["profile_id"] in profiles, f"Unknown profile for {spatial_id}"
    assert item["olfactory_mode"] in allowed_modes, f"Unsupported mode for {spatial_id}"
    assert item["olfactory_mode"] == profiles[item["profile_id"]]["mode"], f"Mode/profile mismatch: {spatial_id}"
    reference = item.get("reference_zone_id")
    if reference is not None:
        assert reference in zone_ids, f"Unknown reference zone {reference}"

counts = {}
for item in spaces:
    counts[item["olfactory_mode"]] = counts.get(item["olfactory_mode"], 0) + 1
assert counts == {"O0_NO_ADDED_SCENT": 54, "O1_NATURAL_AMBIENCE_ONLY": 6}, counts
assert crosswalk["mode_counts"] == counts, "Declared mode counts differ from actual rows."
assert all(profile["mode"] in allowed_modes for profile in profiles.values())
print(f"Validated {len(spaces)} spaces, {len(profiles)} profiles, {counts['O0_NO_ADDED_SCENT']} O0 and {counts['O1_NATURAL_AMBIENCE_ONLY']} O1 mappings.")
