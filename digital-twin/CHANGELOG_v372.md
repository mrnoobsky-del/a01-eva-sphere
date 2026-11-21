# A-01 v3.7.2 — mobile access and device safety

**20 November 2026 / 20 ноября 2026 / 2026年11月20日**

## English
- Added **A01-SEC-01 Mobile / Device Control** as a responsive panel in the digital twin.
- Added a clearly labelled local demo session and sample controls for non-critical lighting, displays, public audio, selected workshop outlets and public charging points.
- Added an explicit safe-off action limited to the listed non-critical loads.
- Added a read-only protected-circuit list: fire alarm, emergency lighting, smoke control, emergency communications, critical life-support and pumps are excluded from app switching.
- Documented the proposed phone → secure gateway → local controller → permitted device architecture, with network segmentation, MFA/passkeys, short-lived signed commands, local priority and audit logs.
- No phone pairing, remote server, controller, relay, sensor or real electrical load is connected.

## Русский
- Добавлен адаптивный модуль **A01-SEC-01 «Мобильный доступ и устройства»** в цифровой двойник.
- Добавлена локальная демонстрационная сессия и примеры управления не критичными нагрузками: освещением, экранами, общественным аудио, выделенными розетками мастерской и пользовательскими зарядными точками.
- Добавлена команда безопасного отключения только перечисленных не критичных групп.
- Добавлен список контуров, которые исключены из переключения через приложение: пожарная сигнализация, аварийное освещение, дымозащита, аварийная связь, критическое жизнеобеспечение и насосы.
- Описана архитектура «телефон → защищённый шлюз → локальный контроллер → разрешённое устройство»: сегментация сети, passkey/MFA, короткоживущие подписанные команды, приоритет локальной автоматики и журнал действий.
- Реальная привязка телефона, сервер, контроллер, реле, датчики и электрические нагрузки не подключены.

## 简体中文
- 在数字孪生中新增响应式 **A01-SEC-01 移动访问与设备控制** 面板。
- 增加本地演示会话，并提供非关键负载示例：公共照明、显示屏、背景音频、指定插座和公共充电点。
- 增加仅针对上述非关键负载的安全关闭演示操作。
- 增加只读保护回路清单：火灾报警、应急照明、排烟、应急通信、关键生命支持及泵不允许通过应用切断。
- 记录手机 → 安全网关 → 本地控制器 → 允许设备的架构，包括网络分区、Passkey/MFA、短时签名命令、本地优先和审计日志。
- 未连接真实手机、服务器、控制器、继电器、传感器或电气负载。

## Validation boundary
All device actions in this release are local browser simulation only. No real mobile pairing or remote-control backend is implemented. A real deployment requires an independently reviewed OT/IT security design, electrical engineering, certified safety controllers and commissioning.
