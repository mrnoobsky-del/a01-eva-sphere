# Documentation index

- [Project charter](PROJECT-CHARTER.md)
- [Status and evidence](STATUS-AND-EVIDENCE.md)
- [Architecture notes](../architecture/README.md)
- [Digital twin](../digital-twin/README.md)
- [A-01 v3.0.0 — Parametric Modular Shell](../digital-twin/README_RU_v300.md)
- [Release history](../releases/README.md)
- [A-01 Sphere Standard v0.1](../standards/A01-SPHERE-STANDARD-v0.1.md)
- [Sphere and component JSON Schemas](../schemas/)
- [Component, fastener and material registers](../templates/)
- [Reference exterior cassette v0.1](../architecture/A01-CAS-PANEL-0001-reference-cassette-v0.1.md)
- [Cassette component record](../components/A01-CAS-PANEL-0001.json)
- [Cassette interface register](../templates/cassette-interface-register.csv)

The reference cassette remains a concept. Its construction details and verification criteria must be completed against a selected site, geometry, jurisdiction and engineering design basis.

- [Parametric exterior cassette geometry v0.1](../architecture/A01-CAS-PANEL-GEOMETRY-v0.1.md)
- [Cassette parameter model and generated geometry](../geometry/README.md)
- [Cassette layout register](../templates/cassette-layout-register-v0.1.csv)

## A-01 v3.7.3 — Engineering integration matrix

- [Матрица интеграции инженерных разработок — RU](engineering/A01-INTEGRATION-MATRIX-v373-RU.md)
- [Engineering Integration Matrix — EN](engineering/A01-INTEGRATION-MATRIX-v373.md)
- [工程集成矩阵 — 简体中文](engineering/A01-INTEGRATION-MATRIX-v373-ZH.md)

The matrix consolidates Engineering Core, Climate & Crown, Serviceable Shell, Energy & Resilience and Smart Operations. It distinguishes visual/software concepts from engineering work still required and records safety boundaries, phone permissions, interfaces, calculations and staged verification. It does not certify physical systems or code compliance.


## A-01 v3.7.4 — A01-SEC-01 secure device control specification

- [Спецификация безопасного управления устройствами — RU](engineering/A01-SEC-01-DEVICE-CONTROL-SPEC-v374-RU.md)
- [Secure Device Control Engineering Specification — EN](engineering/A01-SEC-01-DEVICE-CONTROL-SPEC-v374.md)
- [安全设备控制工程规范 — 简体中文](engineering/A01-SEC-01-DEVICE-CONTROL-SPEC-v374-ZH.md)

The specification defines device criticality classes, user/staff roles, the phone-to-local-controller command path, command lifecycle, independent state feedback, offline and fault behaviour, privacy/security requirements, and staged acceptance gates. It is a requirements document only; no physical control is implemented or certified.


## A-01 v3.7.5 — A01-CV-01 crown ventilation specification

- [Инженерная спецификация коронной вентиляции — RU](engineering/A01-CV-01-CROWN-VENTILATION-SPEC-v375-RU.md)
- [Crown Ventilation Engineering Specification — EN](engineering/A01-CV-01-CROWN-VENTILATION-SPEC-v375.md)
- [穹顶冠部通风工程规范 — 简体中文](engineering/A01-CV-01-CROWN-VENTILATION-SPEC-v375-ZH.md)

Defines separate normal, night-purge, winter/weather-protection and fire/smoke functions; proposed instrumentation; local control and safe-state requirements; calculation inputs; commissioning gates; and phone/Eva boundaries. No numerical setpoints or equipment selections are asserted without site and design data. Fire/smoke control remains a separate engineered system.


## A-01 v3.7.6 — A01-CV-02 whole-dome climate control

- [Система климат-контроля всего купола — RU](engineering/A01-CV-02-WHOLE-DOME-CLIMATE-SPEC-v376-RU.md)
- [Whole-Dome Climate Control System — EN](engineering/A01-CV-02-WHOLE-DOME-CLIMATE-SPEC-v376.md)
- [穹顶整体气候控制系统 — 简体中文](engineering/A01-CV-02-WHOLE-DOME-CLIMATE-SPEC-v376-ZH.md)

Defines whole-building zone architecture, supply/exhaust distribution, atrium stratification, humidity and condensation management, filtration, heat recovery, acoustics, local controls, operating modes, calculation inputs and staged verification. Coordinates with A01-CV-01; fire/smoke systems remain independent. Requirements specification only; no equipment, setpoints, performance or code compliance are claimed.


## A-01 v3.7.7 — A01-EN-01 integrated thermal and energy balance

- [Объединённый тепловой и энергетический баланс — RU](engineering/A01-EN-01-INTEGRATED-THERMAL-ENERGY-BALANCE-v377-RU.md)
- [Integrated Thermal and Energy Balance — EN](engineering/A01-EN-01-INTEGRATED-THERMAL-ENERGY-BALANCE-v377.md)
- [整体热工与能源平衡 — 简体中文](engineering/A01-EN-01-INTEGRATED-THERMAL-ENERGY-BALANCE-v377-ZH.md)
- [Biysk climate basis — machine-readable JSON](../engineering-data/A01-EN-01-BIYSK-CLIMATE-BASIS-v377.json)

Connects A01-CV-01, A01-CV-02 and A04 Energy & Resilience. Uses SP 131.13330.2025 Biysk climate parameters, records derived HDD screening indicators and normalized ventilation/recovery examples, defines load and seasonal-energy methods, and identifies missing physical geometry/weather/HVAC inputs. Not a completed whole-building load or annual energy prediction.


## A-01 v3.7.8 — EnergyPlus / idfkit integration entry point

- [A-01 EnergyPlus Workbench — browser entry point](../digital-twin/a01-energyplus-workbench-v378.html)
- [EnergyPlus / idfkit integration boundary — RU](engineering/A01-EN-02-ENERGYPLUS-INTEGRATION-v378-RU.md)

Adds an A-01-branded entry point to the free browser-based idfkit Envelop editor and its EnergyPlus/WebAssembly ecosystem. The page embeds the external editor with a new-tab fallback and explicitly distinguishes the editor's own models from an A-01 whole-dome simulation. The bridge to A-01 remains gated by physical geometry, zones, constructions, HVAC inputs and a site-representative hourly weather file.


## A-01 v3.7.9 — calibrated dome geometry bridge to EnergyPlus

- [A-01 EnergyPlus Geometry Bridge — browser application](../tools/a01-energyplus/)
- [Bridge source and run instructions](../tools/a01-energyplus/README_RU.md)
- [Geometry-to-EnergyPlus engineering note — RU](engineering/A01-EN-03-GEOMETRY-ENERGYPLUS-BRIDGE-v379-RU.md)

Adds an actual IDF geometry generator and EnergyPlus 26.1.0 WebAssembly runner for a single calibrated dome air-volume zone. The bridge consumes the canonical ellipsoid parameter JSON, maps Y-up to EnergyPlus Z-up, creates a closed triangular shell and adiabatic base, and requires an explicit physical support-ring diameter, shell U-value, solar absorptance and EPW file. It does not yet contain internal floors, room zoning, glazing, occupancy schedules or real HVAC equipment. A candidate Biysk-Zonalnoye TMYx 2011–2025 archive (WMO 299390) is linked in the application as a starting weather source; its EPW LOCATION metadata still needs site review. Build and annual EPW simulation must be run and reviewed before treating outputs as accepted engineering results.
