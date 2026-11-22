# A-01 X v0.3.9 — Agent Runtime E2E

本版本发布完整的 A-01 X Agent Runtime 可运行源码包及端到端验证。

- `source/` — 完整的 Node.js/Python 源代码包。
- [Agent Runtime 架构说明（俄文）](source/docs/AGENT-RUNTIME-ANTIGRAVITY-INSPIRED_RU.md)
- [端到端验证报告（俄文）](source/docs/AGENT-RUNTIME-E2E-VALIDATION_RU.md)
- [任务 JSON Schema](source/schemas/a01-agent-mission-v0.1.schema.json)

端到端测试覆盖本地 HTTP 服务、真实 Python MCP stdio 进程、浏览器桥接接口以及 Agent Runtime。移动、姿态和头部视角等状态变更操作必须先由操作员明确批准；Stop 始终可立即执行。

在 `source/` 目录运行：

```bash
npm install
npm run check
```

本地检查已通过：Agent World、AgentEyeCamera、Agent Runtime、Sensory Bridge/API、HTTP API、MCP stdio、E2E 以及 190 项几何/UI 审计。

**限制：** E2E 测试使用测试场景适配器，而非真实浏览器中的 Three.js/WebGL。尚未完成 GPU/DOM 验收、物理导航校准或真实硬件测试。Android-01 仍为仿真模型，未连接实体执行器、摄像头或建筑控制系统。
