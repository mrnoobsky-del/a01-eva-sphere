# A-01 X Agent Runtime v0.1 — Antigravity-inspired Mission Manager

**Release:** A-01 X v0.3.8 · **Date:** 22 November 2026  
**Status:** integrated software prototype for the Android-01 Three.js digital twin; not a physical robot controller.

## Purpose

Agent Runtime connects Agent World, AgentEyeCamera and Sensory Bridge into a controlled task loop:

**goal → plan → validation → operator approval → sequential execution → verification → audit**

A planner may propose JSON. It does not receive arbitrary JavaScript, direct Three.js access, bones, joints, actuators or unrestricted shell access. Runtime validates each step and invokes only an allowlisted high-level Agent World tool.

## Antigravity as an architectural reference

Google Antigravity documents autonomous-agent execution, tool use, context management, safety policies, subagents, MCP tools and access control. A-01 adopts these principles as design references; it does not embed Google's product or SDK and does not require a Gemini key.

Official references:
- https://antigravity.google/docs/sdk/overview/
- https://antigravity.google/docs/mcp/
- https://antigravity.google/docs/subagents/
- https://antigravity.google/docs/permissions/

A-01 can connect to Antigravity or another MCP-compatible client through a local stdio bridge. The client and A-01 server must run on the same machine because the HTTP endpoint is bound to 127.0.0.1.

## Responsibilities

| Responsibility | Purpose | Access |
|---|---|---|
| Mission Planner | Turn a user goal into a bounded plan | Map, state and tool catalogue |
| Navigator | Select known destinations and route sequence | Read map; propose movement |
| Perception | Orient the head and request an eye frame | Ask-gated look and local capture |
| Action Executor | Run approved mission steps sequentially | Agent World allowlist |
| Verifier | Check arrival and resulting state | Read-only inspect and map |
| Safety Supervisor | Enforce permissions, limits, cancellation and Stop | Runtime policy and immediate Stop |

In v0.1 these are bounded responsibilities inside one Runtime, not independent parallel language-model agents. Parallel read-only subagents may be added later. State-changing actions remain sequential.

## Allow / Ask / Deny

- **Allow:** read_map, inspect, stop.
- **Ask:** go_to, walk_route, pose, look, look_at, capture_eye_frame, send_frame_to_bridge.
- **Deny:** arbitrary JavaScript, direct joint/bone commands, actuator commands, external vision without consent, building control, elevators, doors, BMS and building safety systems.

The local mission schema is a01.agent-mission.v0.1. A plan has 1–12 steps, each with a unique ID, an allowlisted tool, strictly validated arguments, a human-readable label and an optional bounded timeout. A route has up to eight known waypoint IDs.

## Approval and execution

1. A model or external MCP client proposes a plan; status is pending_approval.
2. Agent Manager renders the complete step list for the operator.
3. Only a human operator in the browser UI can approve and execute.
4. Approval scope is agent_mission_execution and expires within ten minutes.
5. Steps execute one at a time. Movement completion is checked through inspect() against the requested destination.
6. Timeout, tool failure, expired approval or cancellation ends the mission. Active movement is stopped.
7. Cancelling a plan that has not started does not stop unrelated manual movement.

There is intentionally no MCP or HTTP operation that can approve or execute a mission. External movement, route, pose and head-look tools can create mission proposals only. The local HTTP allowlist rejects direct state-changing operations. Stop remains immediately available.

## Sensory Bridge boundary

A mission may capture a local eye frame and place it into the RAM-only Sensory Bridge queue. The frame is marked simulated. Sending image bytes to an external vision-capable MCP client remains a separate one-frame vision_analysis consent. Mission approval does not grant that media-transfer permission.

## Local MCP configuration

The package includes tools/a01-mcp-server.py. Example:

```json
{
  "mcpServers": {
    "a01-eva-sphere": {
      "command": "python",
      "args": ["C:/A01/a01-x-v0.3.8/tools/a01-mcp-server.py"],
      "env": {
        "A01_AGENT_TOKEN": "PASTE_LOCAL_TOKEN_HERE",
        "A01_AGENT_URL": "http://127.0.0.1:4173/api/agent"
      }
    }
  }
}
```

On macOS/Linux, use python3 if required. Copy the token from the local server console. Never publish it, put it in HTML, or forward it to an untrusted model. Do not expose port 4173 to the LAN or internet.

The MCP client can read maps and state, propose/cancel missions, inspect progress, Stop and request consent-gated Sensory Bridge observations. It cannot approve missions.

## Validation

The v0.3.8 package's npm run check suite passed locally:
- Agent World: original 17-bone rig and five-floor route graph.
- AgentEyeCamera: 8 integration checks.
- Agent Runtime: 8 checks, including approval gate, bounds, mission execution, cancellation and Stop.
- Sensory Bridge packet and local API checks.
- HTTP API direct-bypass rejection and mission proposal.
- MCP stdio bridge: 16 tools and permission-gated media delivery.
- Geometry/UI static audit: 190 checks.
- Mission JSON Schema and example: Draft 2020-12 validation.

The GitHub Actions workflow is included in the package, but a successful hosted Actions run is not claimed here.

## Limitations

Android-01 remains a Three.js simulation rig. All eye images are marked simulated. No physical camera, microphone, ROS 2 driver, actuator, elevator, door, BMS or building-safety system is connected. No model provider is preconfigured; the built-in inspection template works without one, while an external planner can connect through MCP or the provider-neutral planner adapter. The role names do not imply parallel LLM subagents in this release.

Rendered browser/WebGL/GPU acceptance on the target device remains pending. This prototype is not a certified functional-safety controller or an engineering approval.
