# A-01 v3.7.1 — safety interlocks and winter-fail state

**20 November 2026 / 20 ноября 2026 / 2026年11月20日**

## English
- Re-sequenced the Gull-wing demonstration so the outer hatch closes before the inner vestibule boundary opens.
- Added a software-level fail-closed guard: if both boundaries receive an open value at once, the visual model closes both and retracts the service tray.
- Added a separate winter power-loss demonstration mode for the crown. Its visual target is closed; fire/smoke control remains a separate, independently designed safety function.
- Added winter open-crown airflow and heat-loss values to the preliminary calculator and clearer warnings.
- Corrected the digital-twin version metadata to 3.7.1.

## Русский
- Перестроена последовательность Gull-wing: наружная створка закрывается до открытия внутренней границы тамбура.
- Добавлена программная защита визуальной модели: при одновременной команде на открытие обе границы закрываются, сервисный лоток возвращается.
- Добавлен отдельный демонстрационный режим потери питания зимой. Визуальная цель короны — закрытое положение; дымоудаление остаётся отдельной функцией независимой пожарной автоматики.
- В предварительный калькулятор добавлены расход и оценка теплопотерь при открытой короне зимой, уточнены предупреждения.
- Исправлены метаданные версии цифрового двойника: 3.7.1.

## 简体中文
- 调整 Gull-wing 演示顺序：外侧舱门关闭后，内侧气闸边界才允许打开。
- 增加软件级关闭保护：若两道边界同时收到开启值，演示模型将关闭两道边界并收回服务托盘。
- 增加冬季断电演示模式，冠部通风口的可视目标为关闭状态；消防排烟仍须由独立、经设计验证的消防系统控制。
- 在初步计算面板中增加冬季冠部开启时的气流量和热损失指标，并加强提示。
- 将数字孪生版本元数据修正为 3.7.1。

## Validation boundary
This remains a visual and scenario prototype. No sensors, actuators, seals, pressure controls, HVAC equipment or fire systems are connected. The calculator is not an engineering design. Browser/WebGL and mobile-device validation remains pending.
