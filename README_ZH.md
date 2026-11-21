# A-01 — 伊娃之球

**能源 · 智能 · 生命**

A-01 是一个长期愿景的公开项目记录：探索以人为中心的韧性生活环境，将建筑、能源系统、数字基础设施、知识保存和 AI 辅助服务结合起来。

> A-01 并不表示这座实体设施已经建成。它记录的是研究、设计探索和逐步实现这一愿景的工作。

**项目主页：** https://vibeshorts.ru/evasphere/  
**Eva Sphere 工作空间：** https://evasphere.usite.pro/

**语言：** [English](README.md) · [Русский](README_RU.md) · [简体中文](README_ZH.md)

## 项目状态

A-01 正在作为概念和数字孪生项目持续开发。部分界面和文档已有软件原型；实体建筑及其基础设施尚未建成或投入运行。

| 方向 | 状态 |
|---|---|
| A-01 数字工作空间 | 原型 / 开发中 |
| 项目文档 | 持续完善的工作材料 |
| 建筑综合体 | 概念 |
| 能源与工程系统 | 研究和初步概念 |
| EVA CARE 与 AI 服务 | 愿景 / 开发方向 |
| 自主基础设施 | 长期概念；需要人工治理 |

## 项目原则

- 以人为中心：技术应支持人的尊严、福祉和可及性。
- 可持续传承：知识、治理和责任交接应使项目能够长期发展。
- 避免单点依赖：重视可迁移性、备份、人工后备和技术供应商韧性。
- 负责任的自主性：财务、关键基础设施、安全和影响权利的决策必须有人类监督。
- 诚实标注状态：明确区分原型、概念、研究、计划和已验证部署。
- 关怀不能替代专业人员：EVA CARE 应帮助人们联系人工支持和合格服务，而不是取代它们。

## A-01 LUNA — 月球研究分支

- [A-01 LUNA — 月壤防护模块化月球栖居舱（中文）](lunar/README_ZH.md)
- [English concept brief](lunar/README.md)
- [Русская концептуальная записка](lunar/README_RU.md)

A-01 LUNA 是独立研究概念，探索围绕标准栖居模块部署和维护机器人施工的月壤防护系统。它不是 NASA 设计或 NASA 背书。项目说明 NASA Moon Base Challenge 的学生参赛条件、作者身份要求及技术验证缺口。GitHub 发布不等于正式竞赛报名或提交。

## 数字孪生与技术资料

- [A-01 v3.5.0 — 中庭、观景廊与分区声学（英文文档）](digital-twin/README_v350.md)
- [A-01 Sphere Standard v0.1](standards/A01-SPHERE-STANDARD-v0.1.md)
- [模块化系统研究](architecture/modular-systems-research-v0.1.md)

## 安全、工程与治理

本仓库中的工程数值和系统描述均为初步概念，除非另有明确说明。它们不是施工文件、认证工程计算、专家意见、许可或安全证明。实体实施需要合格专业人员、场地专项研究、法规审查、独立验证和适当的人类治理。

AI 系统不得对关键基础设施、财务、应急响应或影响权利的决策拥有不受监督的权限。

## 贡献与许可

欢迎提供有证据支持的想法、修正、研究来源和技术审查。提交外部代码或设计前，请先确认许可证和贡献条款。

当前仓库尚未授予开源许可证。公开可见不等于自动允许使用、修改或再分发项目材料。请勿提交密码、API 密钥、个人数据、私人消息或生产环境机密。


## A-01 v3.6.0 集成数字孪生 — AIR-01 自主大气系统

- [打开 v3.6.0 3D 模型](digital-twin/eva-sphere-a01-v360-air-01-life-support.html)
- [English documentation](digital-twin/README_v360.md) · [Русская документация](digital-twin/README_RU_v360.md) · [简体中文说明](digital-twin/README_ZH_v360.md)
- [AIR-01 工程概念](lunar/air-01/README_ZH.md)

v3.6.0 将月球 AIR-01 大气子系统加入可选择的 3D 工程对象：外部 MRE 月壤资源处理、洁净 ECLSS 设备、气体调质、储存以及独立的 O₂ / CO₂ 回流 / 水分配管线。场景包含四种显示模式和四人初步质量平衡数据。这只是软件可视化概念，没有连接真实设备或遥测，几何尺寸未校准，也未进行实体或安全验证。JavaScript 语法检查已通过；真实 WebGL 浏览器漫游仍未完成。


## A-01 v3.7.0 — Gull-wing 检修入口与冠部通风

- [打开 v3.7.0 集成数字孪生](digital-twin/eva-sphere-a01-v370-gullwing-crown-air-01.html)
- [A01-GW-01 / A01-CV-01 工程范围说明](docs/engineering/A01-GW-01-CV-01-v370.md)
- [多语言变更记录](digital-twin/CHANGELOG_v370.md) · [俄文版本说明](releases/v3.7.0/RELEASE-NOTES_RU.md)
- [保留的 v3.6.0 / AIR-01 基线](digital-twin/eva-sphere-a01-v360-air-01-life-support.html)

v3.7.0 分支保留 AIR-01，并加入冠部通风概念模型与初步情景计算器，以及带上铰链舱门、内侧气闸边界和短行程检修托盘的 Gull-wing 检修入口可视化演示。本版本尚未实现载人模块整体拆卸或沿外壳外部轨道下降。嵌入式 JavaScript 已通过静态语法检查；WebGL 浏览器运行、移动端布局和交互测试仍待完成。几何与工程参数尚未校准；该版本不是施工、结构、暖通或消防安全设计文件。GitHub 分支发布不会自动部署到 uCoz 网站。


## A-01 v3.7.3 — 工程集成矩阵

- [工程集成矩阵 — 简体中文](docs/engineering/A01-INTEGRATION-MATRIX-v373-ZH.md)
- [Engineering Integration Matrix — English](docs/engineering/A01-INTEGRATION-MATRIX-v373.md)
- [Матрица интеграции — Русский](docs/engineering/A01-INTEGRATION-MATRIX-v373-RU.md)

该矩阵整合 Engineering Core、Climate & Crown、Serviceable Shell、Energy & Resilience 和 Smart Operations，明确区分软件演示与仍需计算、测试和独立审查的工程工作。它不代表实体系统已实施或已符合规范。
