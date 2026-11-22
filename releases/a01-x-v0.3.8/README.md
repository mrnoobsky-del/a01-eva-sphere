# A-01 X v0.3.8 — Agent Runtime / Mission Manager

**Base:** v0.3.7 · **Date:** 22 November 2026  
**Status:** integrated software prototype for the Android-01 digital twin; no physical robot is connected.

## Purpose

Agent Runtime connects Agent World, AgentEyeCamera and Sensory Bridge into a controlled loop:

**goal → plan → validation → operator approval → sequential execution → verification → audit.**

A model may propose a JSON plan, but it receives no arbitrary JavaScript, Three.js, bone, joint or actuator access. Runtime validates the arguments and calls only allowlisted high-level tools.

## Included

- Agent Manager UI.
- Tool catalogue and Allow / Ask / Deny policy.
- Mission JSON Schema: up to 12 steps and 8 known route points.
- Browser operator approval, expiring within ten minutes.
- Sequential execution and arrival verification through inspect().
- Cancellation, immediate Stop and a RAM audit trail.
- A 16-tool local MCP stdio bridge with safe mission proposals.
- Direct HTTP/MCP bypass protection for movement, pose and head look.

## Antigravity relationship

Google Antigravity is not embedded as a product or SDK. Its agentic planning, tools, delegation and permission ideas are architectural references. Antigravity or another MCP client may connect to local A-01 through stdio, but it cannot approve a mission.

## Validation

The local npm run check suite passed: 17-bone rig, 8 AgentEyeCamera checks, 8 Agent Runtime checks, Sensory Bridge/API, HTTP API, MCP stdio and 190 geometry/UI checks. The mission JSON Schema and example passed Draft 2020-12 validation.

## Limitations

Planner / Navigator / Perception / Action Executor / Verifier / Safety Supervisor are responsibilities within one Runtime, not six parallel LLM agents. No model provider is preconfigured. Android-01 remains a Three.js simulation; eye frames are marked provenance: simulated. No physical camera, ROS 2 driver, actuator or BMS is connected. Browser/WebGL/GPU acceptance on the target device remains pending.

The complete 41-file runnable package is attached separately in this conversation.