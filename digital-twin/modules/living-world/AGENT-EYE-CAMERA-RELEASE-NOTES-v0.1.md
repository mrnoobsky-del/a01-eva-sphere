# A-01 AgentEyeCamera v0.1 — release notes

**Date:** 2026-11-22  
**Branch:** feature/a01-agent-eye-camera-v0.1  
**Release type:** optional first-person camera adapter and synthetic rig test fixture.

## Included
- Head-mounted Three.js eye camera attached only to an explicitly supplied Object3D/Bone.
- Dedicated canvas and renderer independent from the spectator camera and the main renderer.
- Permission-gated local captureStream() and still-frame capture.
- a01-agent:head-ready event contract for a future Android-01 rig adapter.
- Synthetic humanoid test fixture, Node tests and GitHub Actions workflow.

## Not included / not claimed
- No real Android-01 humanoid rig was found in the current public source branch.
- The preview mannequin is a synthetic test fixture, not the Android-01 asset.
- No physical camera, microphone, cloud provider, vision model, network upload, ROS 2 driver or actuator interface is connected.
- The module does not control the agent or the Sphere.

## Validation
- node --check for the module and the preview's module script.
- Node test suite covers the attach/start/permission/frame/stop contract with browser and Three.js mocks.
- Full browser/WebGL validation must still be run in the target A-01 page after the actual humanoid runtime is supplied.
