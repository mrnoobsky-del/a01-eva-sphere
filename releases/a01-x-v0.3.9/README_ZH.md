# A-01 X v0.3.9 — Agent Runtime E2E

本版本记录 MCP stdio、本地 HTTP API、浏览器 bridge 与 A-01 Agent Runtime 之间的端到端验证。

此 GitHub 分支发布版本说明和验证报告；完整可运行源码包**尚未上传到此 GitHub 仓库**。

- [端到端验证报告（俄文）](E2E-VALIDATION_RU.md)
- [v0.3.8 Agent Runtime 文档与任务契约](https://github.com/mrnoobsky-del/a01-eva-sphere/tree/release/a01-x-v0.3.8-agent-runtime)

本地 `npm run check` 已通过：语法、Agent World、AgentEyeCamera、Agent Runtime、Sensory Bridge/API、HTTP API、MCP stdio、E2E，以及 190 项几何/UI 审计。

外部 MCP/HTTP 的移动、姿态和头部视角命令只会创建任务申请。必须由操作员在浏览器 Agent Manager 中明确批准后才能执行；Stop 可立即使用。

Android-01 仍为仿真。E2E 使用测试适配器，而非真实 Three.js/WebGL 场景。尚未完成浏览器/GPU 验收、物理导航或硬件连接。

## 单独提供的可运行包

文件：`a01-x-v0.3.9-agent-runtime-e2e.zip`  
大小：175,729 字节  
SHA-256：`73006b87fd39da3c30496a4ff8313c771f05378153d05b44ee1c0303761260b5`

ZIP 文件在本次对话中单独提供，并不是 GitHub 仓库文件或 GitHub Release Asset。
