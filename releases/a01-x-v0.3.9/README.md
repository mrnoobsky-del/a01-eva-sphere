# A-01 X v0.3.9 — Agent Runtime E2E

End-to-end verification for MCP stdio, the local HTTP API, the browser bridge and the A-01 Agent Runtime.

This branch publishes the release documentation and validation report. The complete runnable source package has **not** been uploaded into this GitHub repository.

- [E2E validation report (Russian)](E2E-VALIDATION_RU.md)
- [Previous v0.3.8 Agent Runtime documentation and mission contract](https://github.com/mrnoobsky-del/a01-eva-sphere/tree/release/a01-x-v0.3.8-agent-runtime)

Local `npm run check` passed for syntax, Agent World, AgentEyeCamera, Agent Runtime, Sensory Bridge/API, HTTP API, MCP stdio, E2E and the 190-check geometry/UI audit.

External MCP/HTTP movement, pose and head-look commands create mission proposals only. Execution requires explicit operator approval in the browser Agent Manager; Stop remains immediately available.

Android-01 remains a simulation. E2E uses a test adapter instead of a live Three.js/WebGL scene. Browser/GPU acceptance, physical navigation and hardware have not been validated or connected.

## Runnable package supplied separately

File: `a01-x-v0.3.9-agent-runtime-e2e.zip`  
Size: 175,729 bytes  
SHA-256: `73006b87fd39da3c30496a4ff8313c771f05378153d05b44ee1c0303761260b5`

The ZIP is supplied separately in the conversation. It is not a GitHub repository file or a GitHub Release Asset.
