#!/usr/bin/env python3
"""Validate the A-01 X Sensory Bridge v0.2 schemas, examples and cross-references."""

from __future__ import annotations

import json
import sys
from datetime import datetime
from pathlib import Path
from typing import Any

try:
    from jsonschema import Draft202012Validator, FormatChecker
except ImportError as exc:
    raise SystemExit(
        "Missing development dependency. Install with: "
        "python -m pip install -r requirements-dev.txt"
    ) from exc


ROOT = Path(__file__).resolve().parents[1]
SCHEMA_DIR = ROOT / "schemas"


def load_json(path: Path) -> Any:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def check_schema(schema_path: Path, example_path: Path) -> Any:
    schema = load_json(schema_path)
    example = load_json(example_path)
    Draft202012Validator.check_schema(schema)
    validator = Draft202012Validator(schema, format_checker=FormatChecker())
    instances = example if isinstance(example, list) else [example]
    failures: list[str] = []
    for index, instance in enumerate(instances):
        for error in validator.iter_errors(instance):
            location = "/".join(str(part) for part in error.absolute_path)
            failures.append(f"example[{index}] {location}: {error.message}")
    if failures:
        raise ValueError("\n".join(failures))
    print(f"PASS schema + {len(instances)} example(s): {schema_path.name}")
    return example


def parse_time(value: str) -> datetime:
    return datetime.fromisoformat(value.replace("Z", "+00:00"))


def check_observation_references(packet: dict[str, Any]) -> None:
    source_ids = {source["source_id"] for source in packet["sources"]}
    frame_ids = {frame["id"] for frame in packet["coordinate_frames"]}
    for index, observation in enumerate(packet["observations"]):
        if observation["source_id"] not in source_ids:
            raise ValueError(
                f"observations[{index}] references unknown source_id "
                f"{observation['source_id']!r}"
            )
        frame_id = observation["frame_id"]
        if frame_id is not None and frame_id not in frame_ids:
            raise ValueError(
                f"observations[{index}] references unknown frame_id {frame_id!r}"
            )
        media = observation.get("media")
        if media and parse_time(media["expires_at"]) <= parse_time(observation["captured_at"]):
            raise ValueError(f"observations[{index}] media link expires before or at capture time")
        if observation["channel"] == "audio" and not packet["session"]["permissions"]["audio_capture"]["enabled"]:
            raise ValueError("Audio observation exists while audio_capture permission is disabled")
    print("PASS observation source/frame references and media/permission invariants")


def check_event_chain(events: list[dict[str, Any]]) -> None:
    if not events:
        raise ValueError("Event example must contain at least one event")
    session_ids = {event["session_id"] for event in events}
    if len(session_ids) != 1:
        raise ValueError("Events in one example chain must share a session_id")
    sequences = [event["sequence"] for event in events]
    if sequences != sorted(sequences) or len(set(sequences)) != len(sequences):
        raise ValueError("Event sequence values must be strictly increasing")
    for index, event in enumerate(events):
        if event["event_type"] == "command_dispatched":
            approval = event["approval"]
            action = event["action"]
            if action is None or approval is None:
                raise ValueError(f"events[{index}] dispatch has no action or approval record")
            status = approval["status"]
            has_policy = bool(approval["policy_id"])
            if status not in ("granted", "not_required") or (status == "not_required" and not has_policy):
                raise ValueError(f"events[{index}] dispatch lacks a valid approval or explicit policy")
            if not action["safety_check_id"]:
                raise ValueError(f"events[{index}] dispatch lacks a safety check reference")
    print(f"PASS event chain: {len(events)} events, one session, increasing sequence")


def main() -> int:
    try:
        packet = check_schema(
            SCHEMA_DIR / "a01-x-sensory-observation-v0.2.schema.json",
            SCHEMA_DIR / "a01-x-sensory-observation-v0.2.example.json",
        )
        check_observation_references(packet)
        events = check_schema(
            SCHEMA_DIR / "a01-x-perception-event-v0.2.schema.json",
            SCHEMA_DIR / "a01-x-perception-event-v0.2.example.json",
        )
        check_event_chain(events)
    except (OSError, json.JSONDecodeError, ValueError, KeyError) as exc:
        print(f"FAIL: {exc}", file=sys.stderr)
        return 1
    print("A-01 X Sensory Bridge v0.2 validation completed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
