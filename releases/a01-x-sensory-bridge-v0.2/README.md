# A-01 X Sensory Bridge v0.2 — Living Perception Loop

**Eva Sphere · Android-01 · Sphere Intelligence**  
**Date:** 22 November 2026  
**Status:** documentation release: architecture and integration contracts, not a connected runtime.

## What changed from v0.1

v0.1 defined the sensory channels and overall bridge architecture. v0.2 specifies how those channels form a synchronized observation and how observations become traceable engineering work.

- Sensor registry tied to Android-01 body frames and the Sphere → Level → Zone → Room → Asset hierarchy.
- Typed payloads for RGB/depth frames, IMU, joints, force/torque, pose and environmental measurements.
- Separate permissions for capture, external transmission and persistent storage.
- Timestamp synchronization, freshness, calibration and provenance checks.
- Perception output separates visible facts, sensor facts, derived observations, hypotheses and unknowns.
- An append-only event trail links observations to riddles, recommendations, approvals, actions and verification.
- Explicit degraded and safe-state behaviour.

## Release files

- [Living Perception Loop architecture (Russian)](../../architecture/A01-X-LIVING-PERCEPTION-LOOP-v0.2.md)
- [Observation envelope JSON Schema](../../schemas/a01-x-sensory-observation-v0.2.schema.json)
- [Synthetic observation example](../../schemas/a01-x-sensory-observation-v0.2.example.json)
- [Perception event JSON Schema](../../schemas/a01-x-perception-event-v0.2.schema.json)
- [Example event chain](../../schemas/a01-x-perception-event-v0.2.example.json)
- [Previous Sensory Bridge v0.1 architecture](../../architecture/A01-X-SENSORY-BRIDGE-v0.1.md)

## Implementation status

No physical camera, microphone, IMU, Android-01 sensor, actuator or building-management system is connected by this release. Examples are synthetic and explicitly marked as simulation. Implementation requires the exact Android-01 runtime, hardware interfaces and a separate safety test plan.

The architecture preserves local safety control and human approval. AI observations are not raw sensor measurements, and recommendations are not actuator commands.

## Validate the schemas and examples

From the repository root:

```bash
python -m pip install -r requirements-dev.txt
python tools/validate-sensory-bridge-v0.2.py
```

The validator uses JSON Schema Draft 2020-12 and checks both examples, observation-to-source/frame references, media expiry, audio permission, and event sequence consistency. GitHub Actions runs the same validation when release files change.
