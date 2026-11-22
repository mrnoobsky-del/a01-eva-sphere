# A-01 X v0.3.8 — Agent Runtime / Mission Manager

**基础版本：** v0.3.7 · **日期：** 2026年11月22日  
**状态：** Android-01 数字孪生的软件原型；未连接实体机器人。

## 目的

Agent Runtime 将 Agent World、AgentEyeCamera 和 Sensory Bridge 连接为受控流程：

**目标 → 计划 → 验证 → 操作员批准 → 顺序执行 → 结果检查 → 审计日志。**

模型只能提出 JSON 计划，不能直接执行任意 JavaScript、访问 Three.js 内部结构、骨骼、关节或执行器。Runtime 验证参数并只调用白名单中的高级工具。

## 本版本包含

- Agent Manager 任务管理界面。
- Allow / Ask / Deny 工具权限策略。
- 最多 12 步的任务 JSON Schema；路线最多 8 个已知节点。
- 浏览器操作员批准，最长 10 分钟。
- 顺序执行并通过 inspect() 验证到达状态。
- 取消、即时 Stop 和 RAM 审计日志。
- 提供 16 个工具的本地 MCP stdio 服务。
- 禁止通过 HTTP/MCP 绕过任务审批直接移动、改变姿态或转头。

## 与 Antigravity 的关系

本项目没有嵌入 Google Antigravity 产品或 SDK；只借鉴其代理规划、工具、角色分工和权限控制理念。Antigravity 或其他 MCP 客户端可以通过本地 stdio 连接 A-01，但不能自行批准任务。

## 验证

本地 npm run check 已通过：17 骨骼 rig、AgentEyeCamera 8 项、Agent Runtime 8 项、Sensory Bridge/API、HTTP API、MCP stdio 和 190 项几何/UI 检查。任务 Schema 和示例通过 JSON Schema Draft 2020-12 验证。

## 限制

Planner / Navigator / Perception / Action Executor / Verifier / Safety Supervisor 是一个 Runtime 内部的职责，不代表六个并行大模型代理。未预先连接模型服务商。Android-01 仍是 Three.js 仿真，眼部帧标记为 simulated。未连接实体摄像头、ROS 2、执行器或 BMS。目标设备上的浏览器/WebGL/GPU 验收仍待完成。

完整的 41 文件可运行压缩包已在本聊天中单独提供。