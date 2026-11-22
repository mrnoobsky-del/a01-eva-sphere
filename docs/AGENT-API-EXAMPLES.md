# A-01 Agent API — safe mission examples v0.3.8

The HTTP API binds to 127.0.0.1 only. Copy A01_AGENT_TOKEN from the local server console and keep it private.

## Read the map

```bash
curl -H "Authorization: Bearer $A01_AGENT_TOKEN" \
  http://127.0.0.1:4173/api/agent/map
```

## Propose a mission

Direct external go_to, walk_route, pose, look and look_at requests are rejected. External clients can submit a mission proposal only:

```bash
curl -sS -X POST \
  -H "Authorization: Bearer $A01_AGENT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"operation":"mission_plan","input":{"plan":{"schema":"a01.agent-mission.v0.1","goal":"Inspect POD-07","summary":"Propose a bounded move and inspection; wait for operator approval.","steps":[{"id":"move","tool":"go_to","args":{"destination":"L03/POD-07","gait":"Walking"},"label":"Move to L03/POD-07","timeout_ms":180000},{"id":"pose","tool":"pose","args":{"name":"Inspect"},"label":"Take inspection pose"},{"id":"verify","tool":"inspect","args":{},"label":"Verify state"}]}}}' \
  http://127.0.0.1:4173/api/agent/command
```

The response confirms only that a proposal was queued, not that the agent moved. Open the browser Agent Manager, review each step and explicitly approve execution. Poll the local result and state endpoints to track progress.

## Safe external operations

| Operation | Effect |
|---|---|
| guide, map, inspect | Read-only |
| mission_plan | Create a pending approval proposal |
| mission_cancel | Cancel a pending or active mission |
| stop | Immediate simulated-agent stop |
| camera | Change the local spectator view |

Direct state-changing movement, pose and head-look operations are intentionally unavailable through the external HTTP API. MCP/WebMCP tools for those actions also create mission proposals only.

## Mission bounds and policy

A plan contains up to 12 steps. A route contains up to 8 existing map IDs. Step timeouts are bounded to ten minutes. Unknown destinations and tool arguments are rejected before operator approval. Read-only map/state and immediate Stop are allowed; movement, pose, look and camera-frame capture require Ask/approval; arbitrary code, direct joints/actuators and building control are denied.

## MCP stdio

The package includes tools/a01-mcp-server.py, a dependency-free local bridge for MCP desktop clients on the same computer. Configure it in the client's MCP settings:

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

Use python3 on systems that require it. Never commit or share the token. Do not expose port 4173 to the LAN or internet. MCP can inspect the map/state, propose and cancel missions, read progress, Stop and request Sensory Bridge observations. It cannot approve or execute a mission.