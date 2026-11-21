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


## A-01 v3.7.5 — A01-CV-01 crown ventilation specification

### Русский
- Добавлена расширенная спецификация коронной вентиляции на русском, английском и китайском языках.
- Разделены обычная вентиляция, ночная продувка, зимняя/погодная защита и независимая пожарная стратегия.
- Определены предлагаемые группы датчиков, локальные блокировки, обратная связь приводов, требования к безопасным состояниям и обслуживанию.
- Составлен перечень необходимых аэродинамических, тепловлажностных, акустических и дымовых расчётов и этапов испытаний.
- Не назначены числовые уставки и оборудование без площадочных данных; визуальный режим и калькулятор остаются моделью.

### English
- Added the expanded crown ventilation specification in Russian, English and Simplified Chinese.
- Separated normal ventilation, night purge, winter/weather protection and independent fire strategy.
- Defined proposed sensor groups, local interlocks, actuator feedback, safe-state and maintenance requirements.
- Listed required aerodynamic, hygrothermal, acoustic and smoke calculations and test stages.
- No numerical setpoints or equipment selections are asserted without site data; visual modes and calculator remain a model.

### 简体中文
- 新增俄语、英语和简体中文冠部通风扩展规范。
- 区分常规通风、夜间排热、冬季/天气保护和独立消防策略。
- 定义建议传感器组、本地联锁、执行器反馈、安全状态和维护要求。
- 列出空气动力、热湿、声学、排烟计算及测试阶段。
- 缺少场地数据时不指定数值设定点或设备选型；可视化模式和计算器仍属于模型。

**Status / Статус / 状态:** engineering requirements specification only. Physical system not implemented; calculations and code compliance not verified.


## A-01 v3.7.6 — A01-CV-02 whole-dome climate control specification

### Русский
- Добавлена инженерная спецификация климат-контроля всего купола на русском, английском и китайском языках.
- Описаны зонирование помещений, приточные и вытяжные контуры, температурная стратификация атриума, влажность/конденсат, фильтрация, рекуперация тепла и акустика.
- Определены интерфейсы с A01-CV-01, группы датчиков, локальная автоматика, режимы работы, безопасные состояния и этапы проверки.
- Пожарная вентиляция и дымозащита остаются отдельной инженерной системой и не зависят от Евы, облака или мобильного приложения.
- Не назначены численные расходы воздуха, мощности, уставки или оборудование без исходных данных площадки и помещений.

### English
- Added the whole-dome climate-control engineering specification in Russian, English and Simplified Chinese.
- Defined room zoning, supply/exhaust circuits, atrium thermal stratification, humidity/condensation, filtration, heat recovery and acoustics.
- Recorded interfaces with A01-CV-01, sensor groups, local automation, operating modes, safe states and verification stages.
- Fire ventilation and smoke control remain a separate engineered system, independent of Eva, cloud services and the mobile app.
- No airflow rates, capacities, setpoints or equipment are selected without site and room design inputs.

### 简体中文
- 新增俄语、英语和简体中文穹顶整体气候控制工程规范。
- 定义房间分区、送排风回路、中庭热分层、湿度/结露、过滤、热回收和声学要求。
- 记录与 A01-CV-01 的接口、传感器类别、本地自动化、运行模式、安全状态和验证阶段。
- 消防通风与排烟仍是独立工程系统，不依赖 Eva、云服务或手机应用。
- 缺少场地和房间设计数据时，不指定风量、容量、设定值或设备选型。

**Status / Статус / 状态:** requirements specification only. No physical HVAC system, measured performance, commissioning or code compliance is claimed.


## A-01 v3.7.7 — A01-EN-01 integrated thermal and energy balance

### Русский
- Добавлена связанная расчётная основа климатической системы и направления A04 Energy & Resilience на русском, английском и китайском языках.
- Использованы климатические параметры Бийска из СП 131.13330.2025: зимние и летние расчётные параметры, отопительный период, влажность, ветер и среднемесячные температуры.
- Пересмотрены прежние условные допущения: фиксированный перепад 30 °C и солнечные часы 5/1 не применяются как универсальные вводы.
- Рассчитаны производные индикаторы HDD18 = 5 271 К·сут и HDD20 = 5 691 К·сут, а также нормированная вентиляционная нагрузка 66 кВт на 1 м³/с при примере ΔT 55 K до рекуперации.
- Опубликована машиночитаемая климатическая база JSON.
- Полная мощность и сезонное энергопотребление здания не заявлены: физический масштаб геометрии отсутствует (`scaleToMetres=null`), а площади, U-значения, расходы воздуха, нагрузки и сезонные характеристики оборудования не заданы.

### English
- Added a linked calculation basis for whole-dome climate and A04 Energy & Resilience in RU/EN/Simplified Chinese.
- Adopted Biysk climate parameters from SP 131.13330.2025: winter/summer design values, heating period, humidity, wind and monthly mean temperatures.
- Retired the former universal fixed 30 °C temperature difference and illustrative 5/1 sunshine-hour assumptions.
- Calculated derived HDD18 = 5,271 K·day and HDD20 = 5,691 K·day, plus a normalized 66 kW per 1 m³/s ventilation example at ΔT 55 K before recovery.
- Published a machine-readable JSON climate basis.
- No whole-building capacity or seasonal energy prediction is claimed: geometry has no physical scale (`scaleToMetres=null`), and areas, U-values, airflow rates, loads and seasonal plant performance remain unspecified.

### 简体中文
- 新增穹顶整体气候与 A04 Energy & Resilience 的关联计算基础，提供俄语、英语和简体中文版本。
- 采用 SP 131.13330.2025 比斯克气候参数，包括冬夏设计值、供暖期、湿度、风和月平均温度。
- 不再将固定 30°C 温差及示意性夏季/冬季 5/1 小时日照作为通用输入。
- 计算推导指标 HDD18 = 5,271 K·day、HDD20 = 5,691 K·day，以及 ΔT 55 K、热回收前每 1 m³/s 约 66 kW 的单位化通风示例。
- 发布机器可读 JSON 气候基础数据。
- 未声称整栋建筑容量或季节能耗预测：几何尚无物理比例（`scaleToMetres=null`），面积、U 值、风量、负荷和设备季节性能仍未确定。

**Status / Статус / 状态:** preliminary calculation basis and normalized indicators only. Whole-building loads, annual energy use, equipment sizing and code compliance are not verified.


## A-01 v3.7.8 — EnergyPlus / idfkit integration entry point

### Русский
- Добавлена отдельная рабочая страница A-01 с встраиваемым редактором idfkit Envelop и резервной ссылкой для открытия в новой вкладке.
- Выбран готовый вычислительный стек: EnergyPlus/WebAssembly, idfkit model tooling и погодные файлы EPW/TMYx.
- В качестве открытого эталона интеграции изучен idfkit-shoebox: создание IDF, загрузка WASM-движка, автоматический пересчёт и годовые прогоны.
- Зафиксировано важное разграничение: idfkit-js редактирует IDF/epJSON, а расчёт выполняет отдельный пакет EnergyPlus engine.
- Явно обозначено, что внешний редактор пока не связан с геометрией A-01. Полный расчёт купола заблокирован отсутствием физического масштаба, ведомости зон, конструкций и HVAC-параметров.

### English
- Added a dedicated A-01 workbench page embedding the idfkit Envelop editor, with a new-tab fallback.
- Selected the ready-made EnergyPlus/WebAssembly, idfkit model tooling and EPW/TMYx weather stack.
- Reviewed idfkit-shoebox as the open reference for IDF authoring, WASM engine loading, automatic re-solving and annual runs.
- Recorded the boundary: idfkit-js edits IDF/epJSON; a separate EnergyPlus engine performs the simulation.
- Clearly stated that the external editor is not yet connected to A-01 geometry. Whole-dome simulation remains gated by physical scale, zone schedule, constructions and HVAC inputs.

### 简体中文
- 新增独立的 A-01 工作台页面，嵌入 idfkit Envelop 编辑器，并提供新标签页打开的备用链接。
- 选定现成的 EnergyPlus/WebAssembly、idfkit 模型工具及 EPW/TMYx 气象数据技术栈。
- 研究 idfkit-shoebox 开源示例，作为 IDF 建模、WASM 引擎加载、自动重新计算和全年模拟的参考。
- 明确技术边界：idfkit-js 用于编辑 IDF/epJSON，实际模拟由独立的 EnergyPlus 引擎执行。
- 明确外部编辑器尚未连接 A-01 几何。整穹顶模拟仍受物理比例、分区清单、围护结构和 HVAC 输入缺失的限制。

**Status / Статус / 状态:** browser workbench entry point added; external Envelop model is not an A-01 simulation. No whole-dome run, deployment or physical validation is claimed.


## A-01 v3.7.9 — calibrated dome geometry bridge to EnergyPlus

### Русский
- Добавлен отдельный модуль tools/a01-energyplus с генератором расчётной геометрии купола A-01 и реальным EnergyPlus 26.1.0 WebAssembly engine.
- Источником оболочки служит канонический JSON параметров эллипсоида; координаты преобразуются из Y-up в Z-up, математическая вершина закрывается треугольным веером, а основание имеет согласованные с оболочкой граничные узлы.
- Физический масштаб не придумывается: IDF и запуск заблокированы до ввода подтверждённого диаметра опорного кольца в метрах.
- Для первой модели пользователь также задаёт U-value оболочки, солнечное поглощение и почасовой EPW. EPW LOCATION используется для Site:Location.
- Найден кандидатный погодный архив Biysk-Zonalnoye TMYx 2011–2025 (WMO 299390); ссылка добавлена в интерфейс. Его пригодность для точной площадки A-01 должна быть проверена по LOCATION.
- Создаётся одна общая воздушная зона, наружная оболочка, адиабатическое основание, термостат и Ideal Loads. 12 секторов и 144 кандидатные кассеты не выдаются за тепловые зоны.
- Добавлены тесты геометрии и CI-сборка. До успешного запуска сборки и расчёта на площадочном EPW результаты не считаются подтверждёнными.

### English
- Added the standalone tools/a01-energyplus module with an A-01 dome geometry generator and the actual EnergyPlus 26.1.0 WebAssembly engine.
- The canonical ellipsoid JSON is the shell source. Coordinates are transformed from Y-up to Z-up, the mathematical apex is closed with a triangle fan, and the base boundary uses matching shell-ring vertices.
- Physical scale is never guessed: IDF export and simulation require a confirmed support-ring diameter in metres.
- The first model also requires a user-supplied shell U-value, solar absorptance and hourly EPW weather file. The EPW LOCATION header supplies Site:Location.
- A candidate Biysk-Zonalnoye TMYx 2011–2025 archive (WMO 299390) was found and linked in the workbench; its suitability for the exact A-01 site must be checked from EPW LOCATION.
- The first calculation uses one shared air zone, the external shell, an adiabatic base, thermostat and Ideal Loads. The 12 sectors and 144 candidate cassettes are not represented as thermal zones.
- Geometry tests and a CI build workflow were added. Results are not validated until the build and a site-representative EPW simulation complete successfully.

### 简体中文
- 新增独立的 tools/a01-energyplus 模块，包含 A-01 穹顶几何生成器和真正的 EnergyPlus 26.1.0 WebAssembly 计算引擎。
- 外壳几何读取规范椭球参数 JSON。坐标从 Y-up 转换为 EnergyPlus 的 Z-up，顶部使用三角扇闭合，底边节点与外壳网格一致。
- 不猜测物理比例：必须输入经确认的支撑环直径（米），才能导出 IDF 和运行模拟。
- 首版还要求输入围护结构 U 值、太阳吸收率和逐小时 EPW 天气文件；Site:Location 从 EPW 的 LOCATION 行读取。
- 找到 Biysk-Zonalnoye TMYx 2011–2025（WMO 299390）候选气象档案并添加到工作台链接；其是否适用于 A-01 的具体场址仍需核对 EPW LOCATION。
- 首版采用一个整体空气热区、外壳、绝热底面、恒温器和 Ideal Loads。12 个扇区和 144 个候选舱板不作为热区处理。
- 增加几何测试和 CI 构建流程。只有构建成功并使用代表实际场地的 EPW 完成模拟后，结果才能进入工程审核。

**Status / Статус / 状态:** source integration is in the feature branch; GitHub Actions run #15 passed all 9 tests, schema-backed IDF generation and the production build. Physical dimensions and envelope properties remain user-supplied. No annual EPW EnergyPlus run, engineering approval, merge or deployment is claimed.
