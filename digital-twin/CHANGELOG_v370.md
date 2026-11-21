# A-01 v3.7.0 — Gull-wing and Crown integration

**20 November 2026 / 20 ноября 2026 / 2026年11月20日**

## English

- Preserved the published v3.6.0 AIR-01 digital twin as the integration baseline.
- Added **A01-CV-01 Crown ventilation** to the climate layer: 24 adjustable louvres, a lifting rain hood, six visual exhaust fans, an interior exhaust ring and three conceptual exhaust connections.
- Added Crown operating scenarios for normal operation, night purge, winter closure and visual smoke-exhaust demonstration.
- Added a parameterized preliminary calculator for dome air volume, outdoor-air flow, stack-driven night purge, heat removal and a simplified smoke-plume free-area estimate, preserving the assumptions supplied in v3.1.6.
- Added **A01-GW-01 Gull-wing service access** for one D02 module on each level: upper-hinged access leaf, paired actuator struts, an inner vestibule boundary and a short service tray.
- Added a 12-step service-access animation and a level selector.
- Kept the full occupied-module extraction and descent-by-exterior-rails concept out of this build. It requires separate geometric, structural and life-safety design.
- Added engineering notes describing the scope, assumptions, open checks and validation limits.

## Русский

- Сохранена опубликованная версия цифрового двойника v3.6.0 с AIR-01 в качестве основы интеграции.
- В климатический слой добавлена **A01-CV-01 — коронная вентиляция**: 24 регулируемые жалюзи, поднимаемый дождевой колпак, шесть визуальных вытяжных вентиляторов, внутреннее вытяжное кольцо и три условных вытяжных подключения.
- Добавлены сценарии короны: обычная работа, ночная продувка, зимнее закрытие и визуальная демонстрация дымоудаления.
- Добавлен параметрический предварительный калькулятор объёма воздуха купола, наружного воздухообмена, ночной тяги, снятия тепла и упрощённой оценки свободной площади дымоудаления. Сохранены исходные допущения переданной v3.1.6.
- Добавлена **A01-GW-01 — сервисный доступ Gull-wing** для одной дольки D02 на каждом уровне: верхнеподвесная створка, две тяги, внутренняя граница тамбура и короткий сервисный лоток.
- Добавлены селектор уровня и 12-этапная анимация цикла сервисного доступа.
- Полное извлечение жилой дольки и её спуск по наружным рельсам в эту сборку не включены. Для них нужны отдельные геометрические, конструктивные и безопасностные решения.
- Добавлена инженерная записка с границами реализации, допущениями, открытыми проверками и ограничениями валидации.

## 简体中文

- 保留已发布的 v3.6.0 AIR-01 数字孪生作为集成基线。
- 在气候层中加入 **A01-CV-01 冠部通风系统**：24 个可调百叶、可升降防雨罩、六个可视化排风机、内部排风环和三条概念性排风连接。
- 加入冠部运行场景：常规运行、夜间排热、冬季关闭以及烟气排放的可视化演示。
- 加入用于估算穹顶空气体积、新风量、夜间自然通风、散热量和简化烟羽排烟自由面积的参数化初步计算器，并保留 v3.1.6 文件中的原始假设。
- 为每层一个 D02 模块加入 **A01-GW-01 Gull-wing 检修入口**：上铰链舱门、双执行杆、内侧气闸边界和短行程检修托盘。
- 加入楼层选择器和 12 步检修入口动画。
- 本版本不实现载人模块整体拆卸及沿外壳轨道下降。该功能需要单独完成几何、结构和生命安全设计。
- 加入工程说明，记录实现范围、假设、待检查事项和验证限制。

## Verification / Проверка / 验证

- All embedded JavaScript blocks passed static syntax parsing after integration.
- The HTML contains no duplicate IDs in the static ID scan.
- The baseline v3.6.0 file is preserved separately from the new v3.7.0 HTML file.
- A live browser/WebGL interaction test was not completed; runtime behaviour and mobile layout remain to be checked.
- Model geometry remains uncalibrated; no physical, structural, HVAC or fire-safety validation is claimed.


## A-01 v3.7.3 — engineering integration documentation

### Русский
- Добавлена матрица интеграции Engineering Core, Climate & Crown, Serviceable Shell, Energy & Resilience и Smart Operations.
- Подготовлены RU/EN/简体中文 документы; обновлены корневые README и индекс документации.
- Зафиксированы границы цифровой симуляции, предлагаемые датчики и локальные безопасные состояния, права мобильного доступа, интерфейсы и этапы проверки.
- Отмечены ограничения исходного калькулятора v3.1.6: фиксированная разность температур 30 °C в оценке теплопотерь оболочки и условные солнечные часы.
- Полное извлечение жилой дольки остаётся исследовательской концепцией; пожарная безопасность не подчиняется Еве, облаку или обычному мобильному управлению.

### English
- Added the integration matrix for Engineering Core, Climate & Crown, Serviceable Shell, Energy & Resilience and Smart Operations.
- Added RU/EN/Simplified Chinese documents and updated root READMEs and the documentation index.
- Recorded simulation boundaries, proposed sensors and local safe states, mobile permissions, interfaces and staged verification.
- Flagged v3.1.6 calculator limitations: fixed 30 °C envelope heat-loss ΔT and illustrative solar-hour assumptions.
- Full occupied-module extraction remains experimental; fire safety is independent of Eva, cloud and ordinary mobile control.

### 简体中文
- 新增 Engineering Core、Climate & Crown、Serviceable Shell、Energy & Resilience 和 Smart Operations 集成矩阵。
- 新增俄语、英语和简体中文文档，并更新根目录 README 与文档索引。
- 记录数字模拟边界、建议传感器、本地安全状态、移动端权限、接口和分阶段验证。
- 标记 v3.1.6 计算器限制：围护结构热损失采用固定 30°C 温差，太阳小时数仅为示意假设。
- 整体居住模块拆卸仍属实验概念；消防安全独立于 Eva、云端和普通移动控制。

**Status / Статус / 状态:** documentation package only. No physical equipment, telemetry, code compliance or commissioning is implied.


## A-01 v3.7.4 — A01-SEC-01 secure device control specification

### Русский
- Подготовлена расширенная инженерная спецификация управления устройствами со смартфона.
- Введены классы критичности U1–U5, роли пользователей и персонала, жизненный цикл команды и обязательная независимая обратная связь.
- Описаны отказ сети/контроллера, отзыв сессии, защита от повторных команд, локальное управление, приватность и этапы допуска.
- Запрещено обычное мобильное управление пожарными и другими жизненно важными цепями; универсальная команда «выключить всё» не предусматривается.
- Подготовлены RU/EN/简体中文 версии и обновлён индекс документации.

### English
- Added an expanded phone-based device-control engineering specification.
- Defined U1–U5 criticality classes, resident/staff roles, command lifecycle and independent state feedback.
- Documented network/controller failures, session revocation, replay protection, local control, privacy and implementation gates.
- Ordinary mobile control of fire and other life-safety circuits is prohibited; no universal “turn everything off” command is provided.
- Added RU/EN/Simplified Chinese versions and updated the documentation index.

### 简体中文
- 新增手机设备控制扩展工程规范。
- 定义 U1–U5 关键等级、居民/工作人员角色、命令生命周期和独立状态反馈。
- 记录网络/控制器故障、会话撤销、防重放、本地控制、隐私和实施验收阶段。
- 普通手机应用不得控制消防及其他生命安全回路；不设置通用“全部关闭”命令。
- 提供俄语、英语和简体中文版本，并更新文档索引。

**Status / Статус / 状态:** requirements specification only. No physical device control, commissioning or code compliance is claimed.
