# A-01 X Sensory Bridge v0.2 — Living Perception Loop

**伊娃之球 · Android-01 · Sphere Intelligence**  
**日期：** 2026年11月22日  
**状态：** 架构与集成协议文档版本；尚未连接到实际运行时。

## 相比 v0.1 的改进

v0.1 定义了感知通道和总体架构。v0.2 进一步规定如何把这些通道组成时间同步的观测数据，以及如何把观测转化为可追溯的工程任务。

- 传感器注册表，关联 Android-01 身体坐标系和 Sphere → Level → Zone → Room → Asset 空间层级。
- 为 RGB/深度图像、IMU、关节、力/力矩、位姿和环境读数定义类型化数据结构。
- 分别管理采集、外部传输和持久化存储权限。
- 检查时间同步、数据新鲜度、校准状态和数据来源。
- 感知结果区分画面可见事实、传感器事实、派生结果、假设和未知信息。
- 追加式事件日志关联观测、工程谜题、建议、审批、动作和验证。
- 定义降级运行与安全状态。

## 发布文件

- [Living Perception Loop 架构（俄文）](../../architecture/A01-X-LIVING-PERCEPTION-LOOP-v0.2.md)
- [观测数据 JSON Schema](../../schemas/a01-x-sensory-observation-v0.2.schema.json)
- [合成观测示例](../../schemas/a01-x-sensory-observation-v0.2.example.json)
- [感知事件 JSON Schema](../../schemas/a01-x-perception-event-v0.2.schema.json)
- [事件链示例](../../schemas/a01-x-perception-event-v0.2.example.json)
- [Sensory Bridge v0.1 架构](../../architecture/A01-X-SENSORY-BRIDGE-v0.1.md)

## 实现状态

本版本没有连接真实摄像头、麦克风、IMU、Android-01 传感器、执行器或楼宇管理系统。示例数据均为明确标记的模拟数据。实际实现还需要 Android-01 的准确运行时代码、硬件接口和独立的安全测试计划。

本架构保留本地安全控制和人工审批。AI 的观察不是原始传感器测量，AI 建议也不是执行器命令。
