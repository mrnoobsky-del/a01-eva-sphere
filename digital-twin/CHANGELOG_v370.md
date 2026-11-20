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
