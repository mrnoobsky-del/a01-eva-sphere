# A-01 Master Project Package

- [Единый комплект проекта A-01 v0.1 (RU)](A01-MASTER-PROJECT-PACKAGE-v0.1_RU.md)
- [План работ и контрольные ворота v0.1 (RU)](A01-MASTER-DELIVERY-PLAN-v0.1_RU.md)
- [Матрица 60 пространств и инженерных статусов (CSV)](A01-MASTER-SPACES-SYSTEMS-MATRIX-v0.1_RU.csv)
- [Матрица инженерных систем и интерфейсов (CSV)](A01-MASTER-SYSTEMS-INTERFACE-MATRIX-v0.1_RU.csv)
- [Реестр открытых решений и рисков (CSV)](A01-MASTER-DECISIONS-RISKS-v0.1_RU.csv)

Эти файлы являются верхнеуровневой точкой входа и не заменяют профильные документы ниже. Кандидатные семейства модулей в матрице отмечены как предварительные; поля инженерных параметров оставлены TBD до расчётов и проверок.

---

## Reference module engineering — S-01 / W-01 / R-01

- [A01-MOD-ENGINEERING-BASELINE-01 — инженерная база трёх эталонных модулей (RU)](A01-MOD-ENGINEERING-BASELINE-v0.1_RU.md)
- [A01-MOD-LOAD-REGISTER-01 — стартовый реестр нагрузок S-01 / W-01 / R-01 (CSV)](A01-MOD-LOAD-REGISTER-v0.1_RU.csv)
- [Матрица 60 пространств с кандидатными профилями, портами и шаблонами Load ID](A01-MASTER-SPACES-SYSTEMS-MATRIX-v0.1_RU.csv)

The three reference profiles are coordination baselines only. Areas, equipment quantities, power, thermal demand, water flow, criticality and autonomy remain uncalculated until source plans and equipment schedules are available.

---

## W-01 — sanitary module engineering

- [A01-MOD-W01-SANITARY-ENGINEERING-01 — detailed sanitary module engineering brief (RU)](A01-MOD-W01-SANITARY-ENGINEERING-v0.1_RU.md)
- [A01-MOD-W01-LAYOUT-STUDY-01 — two layout zoning alternatives (RU)](A01-MOD-W01-LAYOUT-STUDY-v0.1_RU.md)

- [A01-MOD-W01-GEOMETRY-COORDINATION-01 — привязка к геометрии v4.9.0 (RU)](A01-MOD-W01-GEOMETRY-COORDINATION-v0.1_RU.md)
- [A01-W01-OPEN-SOURCE-TOOLCHAIN-RESEARCH-01 — готовые GitHub-инструменты для W-01 (RU)](A01-W01-OPEN-SOURCE-TOOLCHAIN-RESEARCH-v0.1_RU.md)
- [A01-MOD-W01-FREECAD-MOCKUP-01 — параметрический макет D04 (RU)](A01-MOD-W01-FREECAD-MOCKUP-v0.1_RU.md)
- [FreeCAD macro — W-01 / D04](../cad/freecad/A01-W01-layout-study-v0.1.FCMacro)
- [D04 dimension-study plan — DXF](../cad/freecad/A01-W01-layout-study-v0.1.dxf)
- [D04 layout study sheet — SVG](figures/A01-W01-layout-study-v0.1.svg)
- [W-01 geometry overlay — L00 / D04 (SVG)](A01-MOD-W01-GEOMETRY-COORDINATION-v0.1_RU.svg)
- [A01-MOD-W01-FIXTURE-SCHEDULE-01 — fixture and equipment schedule template (CSV)](A01-MOD-W01-FIXTURE-SCHEDULE-v0.1_RU.csv)

W-01 remains M0 / proposed / not calculated. Fixture quantities, flows, pressures, pipe sizes, ventilation rates, electrical ratings and fire requirements are not assigned until the room plan, occupancy, utility conditions and applicable code matrix are approved.

---

# Documentation index

## A-01 Space Market — покупка и аренда пространств

- [A01-SPACE-MARKET-01 — каталог, права и модель использования (RU)](A01-SPACE-MARKET-01-living-space-sales-and-rentals-v0.1_RU.md)
- [Интерфейс каталога](../digital-twin/a01-space-market.js)
- [Стили интерфейса](../digital-twin/a01-space-market.css)


## A-01 Property Engine — паспорта, цена, права и аренда

- [A01-PROPERTY-ENGINE-01 — техническая модель объектов, прав, ценообразования и аренды (RU)](A01-PROPERTY-ENGINE-01-property-pricing-and-rights-v0.1_RU.md)
- [A01-SPACE-MARKET-01 — публичный каталог и концепция покупки/аренды (RU)](A01-SPACE-MARKET-01-living-space-sales-and-rentals-v0.1_RU.md)



## Media intelligence / EvaScribe

- [EvaScribe local MVP 0.1.0 — install and usage](../tools/evascribe/README_RU.md)
- [EvaScribe application source](../tools/evascribe/app/main.py)

- [A01-MEDIA-01 — EvaScribe: media library, transcription and video research (RU)](A01-MEDIA-01-evascribe-media-intelligence-v0.1_RU.md)

## Public overview and MODNET demo

- [A01-PUBLIC-LANDING-01 — public overview and interactive demo (RU)](A01-PUBLIC-LANDING-01-value-story-and-modnet-demo-v0.1_RU.md)
- [Public A-01 landing](../digital-twin/a01-public-landing.html)
- [Mobile MODNET demo](../digital-twin/a01-mobile-demo.html)

## Modular Dock & Exchange Network (MODNET)

- [A01-MODNET-01 — portable modules, dock-slot rental and exchange](A01-MODNET-01-modular-dock-exchange-network-v0.1.md)
- [A01-MODNET-3D-01 — 3D scenarios and model library (RU)](A01-MODNET-3D-01-scenarios-and-model-library-v0.1_RU.md)
- [Interactive MODNET 3D simulation](../digital-twin/modnet-exchange-simulation.html)
- [A01-MODNET-VISUAL-01 — animated concept storyboards](MODNET-VISUAL-STORYBOARDS-01.md)
- [Module passport template](../templates/module-passport-template-v0.1.csv)
- [Dock-slot register template](../templates/dock-slot-register-template-v0.1.csv)
- [Public MODNET overview](../digital-twin/modular-dock-exchange-network.html)



- [Project charter](PROJECT-CHARTER.md)
- [Status and evidence](STATUS-AND-EVIDENCE.md)
- [Architecture notes](../architecture/README.md)
- [Digital twin](../digital-twin/README.md)
- [A-01 Performance — 60 FPS without visual quality loss (EN)](../performance/README.md)
- [A-01 Performance — 60 FPS без потери качества (RU)](../performance/README_RU.md)
- [Performance benchmark report template](../performance/BENCHMARK-REPORT-TEMPLATE_RU.md)
- [P0 static source review — A-01 v4.0.0](../performance/P0-STATIC-SOURCE-REVIEW-v4.0.0_RU.md)
- [P1 draw-call optimization — A-01 preview (RU)](../performance/P1-DRAW-CALL-OPTIMIZATION_RU.md)
- [Browser baseline recorder](../performance/baseline-recorder.js)
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
- [A-01 Universal Accessibility & Family Comfort Standard v0.1 (RU)](../standards/A01-UNIVERSAL-ACCESSIBILITY-v0.1.md)
- [English version](../standards/A01-UNIVERSAL-ACCESSIBILITY-v0.1.en.md)
- [简体中文版](../standards/A01-UNIVERSAL-ACCESSIBILITY-v0.1.zh.md)
- [A-01 v3.7.0 — Human Comfort Engineering (integrated digital twin)](../digital-twin/eva-sphere-a01-v370-human-comfort-engineering.html)
- [v3.7.0 documentation (RU)](../digital-twin/README_RU_v370.md)
- [v3.7.0 documentation (EN)](../digital-twin/README_v370.md)
- [v3.7.0 documentation (简体中文)](../digital-twin/README_ZH_v370.md)
- [v3.7.0 changelog](../digital-twin/CHANGELOG_v370.md)
- [Human Comfort & Sanitary Engineering note](../architecture/A01-HUMAN-COMFORT-ENGINEERING-v0.1.md)

## A-01 Olfactory Environment / Aroma Atlas

- [A01-OLF-01 — Ароматическая среда и olfactory design (RU)](A01-OLF-01-OLFACTORY-ENVIRONMENT-v0.1_RU.md) · [English brief](A01-OLF-01-OLFACTORY-ENVIRONMENT-v0.1.md)
- [A01-OLF-02 — Aroma Atlas: карта настроения и olfactory profiles (RU)](A01-OLF-02-AROMA-ATLAS-MOOD-PROFILES-v0.1_RU.md)
- [A01-OLF-03 — Эксплуатационные и инженерные требования (RU)](A01-OLF-03-OLFACTORY-SYSTEM-REQUIREMENTS-v0.1_RU.md)
- [A01-OLF-04 — Реестр запаховых режимов по помещениям (CSV)](A01-OLF-04-SPACE-ZONE-REGISTER-v0.1_RU.csv)
- [A01-OLF-05 — привязка 60 пространств к Aroma Atlas (RU)](A01-OLF-05-SPATIAL-CROSSWALK-v0.1_RU.md)
- [Zone JSON Schema](../schemas/a01-olfactory-zone-v0.1.schema.json) · [Example registry](../schemas/a01-olfactory-zone-registry-v0.1.example.json)
- [60-space crosswalk JSON](../data/a01-olfactory-spatial-crosswalk-v0.1.json) · [Crosswalk JSON Schema](../schemas/a01-olfactory-spatial-crosswalk-v0.1.schema.json)
- [Interactive A-01 Aroma Atlas prototype](../digital-twin/a01-olfactory-atlas.html)
- [Source validation](../tools/validate-olfactory-atlas.py) · [Crosswalk validation](../tools/validate-olfactory-crosswalk.py)

**Baseline:** no intentionally added fragrance in shared spaces. The Atlas is an informational design prototype; no scent hardware, HVAC system or personal health data is connected.

