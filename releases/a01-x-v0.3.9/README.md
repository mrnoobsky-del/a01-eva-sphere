# A-01 X v0.3.9 — Agent Runtime E2E

This release publishes the complete runnable A-01 X Agent Runtime package and its end-to-end verification.

- `source/` contains the complete Node.js/Python source package.
- [Antigravity-inspired Agent Runtime design](source/docs/AGENT-RUNTIME-ANTIGRAVITY-INSPIRED_RU.md)
- [End-to-end validation report](source/docs/AGENT-RUNTIME-E2E-VALIDATION_RU.md)
- [Mission JSON Schema](source/schemas/a01-agent-mission-v0.1.schema.json)

The E2E suite exercises the local HTTP server, a real Python MCP stdio process, the browser bridge contract and the production Agent Runtime. State-changing actions remain proposal-only until explicit operator approval; Stop remains immediately available.

Run from `source/`:

```bash
npm install
npm run check
```

Local validation passed for Agent World, AgentEyeCamera, Agent Runtime, Sensory Bridge/API, HTTP API, MCP stdio, E2E and the 190-check geometry/UI audit.

**Limitations:** the E2E adapter uses a test scene rather than a live Three.js/WebGL browser session. GPU/DOM acceptance, calibrated physical navigation and real hardware were not tested. Android-01 remains a simulation; no physical actuators, camera or building controls are connected.
