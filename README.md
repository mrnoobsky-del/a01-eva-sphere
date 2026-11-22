# A-01 — The Sphere of Eva

## Current live website release line

- **Website:** [evasphere.usite.pro](https://evasphere.usite.pro/)
- **Published build checked on 22 November 2026:** `3.1.6-gullwing-crown-vent-calcs`.
- **Previous prepared step:** A-01 v3.1.7 — initial Android-01 integration. The current prepared build is v3.1.9.
- [v3.1.7 documentation (RU)](digital-twin/README_RU_v317.md) · [EN](digital-twin/README_v317.md) · [简体中文](digital-twin/README_ZH_v317.md) · [Integration report](releases/mainline-v3.1.7/INTEGRATION-REPORT_RU.md).

This website build track is separate from the GitHub integrated digital-twin line v3.7.0 and the standalone interior study v3.8.0. The prepared v3.1.9 HTML has not yet been deployed to uCoz; a GitHub PR does not deploy the website automatically.

## Previous prepared mainline build A-01 v3.1.8

- [Documentation RU](digital-twin/README_RU_v318.md) · [EN](digital-twin/README_v318.md) · [简体中文](digital-twin/README_ZH_v318.md)
- [Spatial coordination report](releases/mainline-v3.1.8/SPATIAL-COORDINATION-AND-CLASH-AUDIT_RU.md)
- [Release overview](releases/mainline-v3.1.8/README_RU.md)

v3.1.8 preserves the v3.1.6 website scene and resolves selected service-logistics, MEP/HVAC, atrium, gallery, door and Android-01 route interfaces. Local automated checks pass; browser/WebGL acceptance remains pending. This is a prepared build, not a uCoz deployment.

## Prepared mainline build A-01 v3.1.9 — Immersive Object Study

- [Documentation RU](digital-twin/README_RU_v319.md) · [EN](digital-twin/README_v319.md) · [简体中文](digital-twin/README_ZH_v319.md)
- [Object-study verification report](releases/mainline-v3.1.9/OBJECT-STUDY-MODE-REPORT_RU.md)
- [Release overview](releases/mainline-v3.1.9/README_RU.md)

“Изучить объект” now opens a full-screen view: the camera focuses on the object, the usual interface is hidden, and an information card stays over the model. Close or Escape restores the previous UI and context-drawer state. Automated checks pass; full WebGL visual acceptance remains pending. The uCoz site has not been changed.

## Prepared build A-01 v3.2.0 — Local 3D Engine

- [Offline launch guide (RU)](releases/mainline-v3.2.0-offline-engine/README_RU.md)
- [uCoz deployment guide (RU)](releases/mainline-v3.2.0-offline-engine/DEPLOYMENT_UCOZ_RU.md)
- [Changelog](releases/mainline-v3.2.0-offline-engine/CHANGELOG.md)

Three.js r185 and OrbitControls now use relative local paths. The ZIP contains a PowerShell bootstrap that downloads the official engine files from GitHub Raw once on first run and assembles the core; after that, the 3D scene uses local files without a CDN or network access. The ZIP does not preload the complete engine files. A localhost launcher is provided for browser ES modules. Eva chat remains online-only. Browser/WebGL visual acceptance and execution of the PowerShell launcher on Windows are still pending; uCoz has not been updated.

**Energy · Intelligence · Life**

A-01 is an open project record for a long-term vision: a resilient, human-centred environment combining architecture, energy systems, digital infrastructure, knowledge preservation and AI-assisted services.

> A-01 is not a claim that the Sphere already exists. It is an open record of the work, research and design exploration toward something we hope to bring into reality.

<p align="center">
  <img src="media/founder-alexander-ponomarev.webp" alt="Portrait of Alexander Ponomarev, founder of A-01" width="220">
</p>

**Project website:** https://vibeshorts.ru/evasphere/  
**Eva Sphere workspace:** https://evasphere.usite.pro/  
**Support the project:** [Voluntary contribution](https://yoomoney.ru/to/410015357551847)

**Languages:** [English](README.md) · [Русский](README_RU.md) · [简体中文](README_ZH.md)

## Project status

A-01 is a developing concept and digital-twin project. Some interface elements and documentation prototypes exist as software; the physical complex and its infrastructure are not represented as built or operational.

| Area | Status |
|---|---|
| A-01 digital workspace | Prototype / development |
| Project book and documentation | Working documents; evolving |
| Architectural complex | Concept |
| Energy and engineering systems | Research and preliminary concepts |
| EVA CARE and AI services | Vision / development direction |
| Autonomous infrastructure | Long-term concept; requires human governance |

## Principles

- **Human-centred by design.** Technology should support people, dignity and access.
- **Continuity beyond one founder.** Knowledge, governance and succession should allow the project to outlive its originator.
- **No single point of dependency.** Plan for portability, backups, human fallback and resilience across vendors and technologies.
- **Accountable autonomy.** Human oversight is required for finance, critical infrastructure, safety and decisions affecting people's rights.
- **Honest status reporting.** Distinguish prototypes, concepts, research, planned work and verified real-world deployments.
- **Care is not a substitute for people.** EVA CARE should help people reach human support and qualified services, not replace them.

## Repository map

- `README.md` — project overview in English.
- `README_RU.md` — project overview in Russian.
- `docs/` — project principles, status definitions and documentation index.
- `architecture/` — architectural and engineering concept notes.
- `digital-twin/` — digital workspace snapshots.
- `media/` — visual material and credits.
- `releases/` — versioned project files.

## Current digital workspace

The repository preserves **A-01 v2.1.0** as the stable digital-twin baseline. The integrated experimental line has advanced to **A-01 v3.1.2**, combining the 144-candidate modular shell, waste-service concepts, underground B1 data-centre concept, serviceable interior LED sky and corrected first-arrival sequence. The separate **A-01 v2.0.13** archive in releases/v2.0.13/ is an integrated /evasphere/ site-workspace snapshot and belongs to a different version track.

The v2.0.13 archive passed static HTML and JavaScript checks, but live browser/WebGL verification, production Worker verification and deployment to the public website have not been confirmed. See the release notes for scope and limitations.

## Founder

**Alexander Ponomarev** — founder, originator of the idea and conceptual direction of A-01.

The founder's authorship of the original concept is distinct from the work of future architects, engineers, researchers, developers and contributors. Contributions should be credited accurately.

## Safety, engineering and governance

All engineering values and system descriptions in this repository are preliminary concepts unless explicitly identified otherwise. They are not construction documents, certified engineering calculations, expert opinions, permits or proof of safety. Real-world implementation requires qualified professionals, site-specific studies, regulatory review, independent verification and appropriate human governance.

AI systems must not have unchecked authority over critical infrastructure, finances, emergency response or rights-impacting decisions.

## Contributing

Ideas, corrections, research references and thoughtful discussion are welcome. Before proposing implementation details, please distinguish evidence from assumptions and identify safety, accessibility, privacy, environmental and maintenance implications.

No contribution should include credentials, API keys, personal data, private messages or production secrets.

## Licensing

No open-source license is granted in this initial publication. Unless a separate license is added, the source and documentation remain subject to the default copyright rules. You may view and discuss this repository on GitHub; do not assume permission to reuse, modify or redistribute its contents.

## Contact and updates

Project website: https://vibeshorts.ru/evasphere/  
Eva Sphere workspace: https://evasphere.usite.pro/

The repository is a public development record. Project status may change; check the dated release notes before relying on any implementation detail.

## Latest digital twin build

- **A-01 v3.1.2 — Serviceable LED sky and intro sequencing:** [Open HTML prototype](digital-twin/eva-sphere-a01-v312-modular-shell-serviceable-led.html)
- [Russian documentation](digital-twin/README_RU_v312.md) · [English documentation](digital-twin/README_v312.md) · [Changelog](digital-twin/CHANGELOG_v312.md)
- **Previous v3.1.1 build:** [Open HTML prototype](digital-twin/eva-sphere-a01-v311-ochre-hover-arrival-flight-hud.html) · [Documentation](digital-twin/README_v311.md)
- **Stable v2.1.0 baseline:** [Open HTML prototype](digital-twin/eva-sphere-a01-v210-human-navigation-safety.html) · [Documentation](digital-twin/README_RU_v210.md)

The v3.1.2 release improves first-entry sequencing, divides the interior LED sky into serviceable curved cassettes and documents a separate protected maintenance path for the exterior skin. The geometry uses uncalibrated model units and is not a fabrication, structural or construction design.

## Integrated digital twin A-01 v3.5.0 — atrium acoustics and viewing galleries

- [Open v3.5.0 integrated digital twin](digital-twin/eva-sphere-a01-v350-acoustics-atrium.html)
- [Russian v3.5.0 documentation](digital-twin/README_RU_v350.md) · [Changelog](digital-twin/CHANGELOG_v350.md) · [Release notes](releases/v3.5.0/RELEASE-NOTES.md)

v3.5.0 extends the v3.4.0 integrated scene with 24 viewing bays across L01–L04, two seating tiers, accessible viewing positions, visual sightline references, 40 distributed speaker nodes, four main arrays, eight acoustic islands, five logical sound zones and four sound modes. A responsive 2D fallback remains available when WebGL cannot be created. Scene units are not calibrated to metres; physical, acoustic and code checks remain outstanding.

## Integrated A-01 digital twin v3.4.0

- [Open v3.4.0 — main digital twin with integrated shell engineering node](digital-twin/eva-sphere-a01-v340-integrated-shell-engineering.html)
- [Integration notes](digital-twin/README_RU_v340.md) · [Change log](digital-twin/CHANGELOG_v340.md)
- [Release notes](releases/v3.4.0/RELEASE-NOTES.md)

v3.4.0 combines the main v3.1.2 digital twin with the v3.3.0 shell engineering module. The service node opens from the selected outer-shell cassette's object card. Its selector synchronizes with the main model's 144 cassette records, and a separate action runs the existing 3D movement animation for that same cassette. The v3.1.2 and v3.3.0 sources remain preserved. This is an experimental integration line; publishing to GitHub does not automatically deploy to the uCoz website.

## Serviceable shell engineering module — A-01 v3.3.0

- [Open standalone HTML prototype](releases/v3.3.0/eva-sphere-a01-v3.3.0-shell-pressure-antiicing.html)
- [English release notes](releases/v3.3.0/RELEASE-NOTES.md) · [Русские заметки](releases/v3.3.0/RELEASE-NOTES_RU.md)

A separate, browser-tested concept module for the A01-L03-D01 shell-service node. It includes a 144-cassette selector, a nine-state service cycle, gradual service-chamber pressure balancing in both directions, interlocks for both pressure boundaries, fail-closed behaviour and an illustrative weather-driven anti-icing heuristic. It uses inline SVG/CSS/JavaScript and does not require WebGL. This is not a construction design or a real equipment controller. It does not supersede the main v2.1.0 baseline or the v3.1.2 integrated workspace line, and it has not been deployed to the public uCoz site.

## Community development and additional Spheres

- [Contribution guide](CONTRIBUTING.md)
- [Community Sphere registry and template](spheres/README.md)
- [A-01 v2.0.27 modular-shell research snapshot](releases/v2.0.27/RELEASE-NOTES.md)
- [Modular systems research brief](architecture/modular-systems-research-v0.1.md)

We welcome evidence-backed ideas, technical reviews, test reports and independent Sphere proposals. A community Sphere is recorded as its own project; the current digital-twin viewer does not yet dynamically load community manifests. The registry and template are the first step toward a future multi-Sphere catalogue. See the contribution guide for the current process and licensing status.


## A-01 Floor and Ceiling Engineering

- [Interactive Floor & Ceiling Engineering v0.1 module](engineering/a01-floor-ceiling-engineering-v0.1.html)
- [Engineering note and verification gates](architecture/A01-FLOOR-CEILING-ENGINEERING-v0.1.md)

The module explores layered floor, structural slab/beam, service-plenum, acoustic and lower-ceiling concepts across L00–L04. It includes separate scenarios for wet rooms, a green terrace, the atrium gallery, ground-contact floors and the upper level beneath the dome. Editable thicknesses are demonstration placeholders, not design dimensions. The digital-twin scene units remain uncalibrated in metres.

## A-01 Sphere Standard

- [A-01 Sphere Standard v0.1](standards/A01-SPHERE-STANDARD-v0.1.md)
- [Sphere manifest JSON Schema](schemas/sphere-manifest.schema.json)
- [Component and asset JSON Schema](schemas/component-record.schema.json)
- [Component, fastener and material registers](templates/)

The standard is a project-specific information model, not a building code or construction approval. It references IFC, IDS and ISO information-management/product-data standards while keeping each Sphere site-specific.


## Parametric exterior cassette geometry

- [A-01 cassette geometry methodology v0.1](architecture/A01-CAS-PANEL-GEOMETRY-v0.1.md)
- [Parametric geometry files and generated 144-panel layout](geometry/README.md)
- [Cassette layout generator](tools/generate-cassette-layout.mjs)

The layout is derived from the digital-twin dome parameters, uses uncalibrated model units and is not a fabrication or structural design.


## A-01 LUNA — lunar habitat research

- [A-01 LUNA concept brief (English)](lunar/README.md)
- [Концептуальная записка A-01 LUNA (русский)](lunar/README_RU.md)
- [A-01 LUNA 概念说明（简体中文）](lunar/README_ZH.md)

A-01 LUNA is a separate research concept for a robotically deployed and serviceable regolith-protection system around a standard lunar habitat module. It is not a NASA design or endorsement. The brief records the NASA Moon Base Challenge student eligibility and authorship rules, the proposed engineering scope, and the evidence still required. A GitHub publication is not an official competition entry.


## Integrated digital twin A-01 v3.6.0 — AIR-01 autonomous atmosphere

- [Open v3.6.0 3D model](digital-twin/eva-sphere-a01-v360-air-01-life-support.html)
- [English documentation](digital-twin/README_v360.md) · [Русская документация](digital-twin/README_RU_v360.md) · [简体中文说明](digital-twin/README_ZH_v360.md)
- [AIR-01 engineering concept](lunar/air-01/README.md)

v3.6.0 adds the AIR-01 lunar atmosphere subsystem as a selectable 3D engineering object: external MRE resource processing, clean ECLSS equipment, gas conditioning, storage, and separate O₂ / CO₂-return / water distribution paths. The scene includes four display modes and the preliminary four-person mass-balance figures. It is a visual software concept only; there is no live equipment or telemetry, no calibrated geometry, and no physical or safety validation. JavaScript syntax parsing passed; a live WebGL browser walk-through remains outstanding.

## A-01 Universal Accessibility & Family Comfort

- [Universal Accessibility & Family Comfort Standard v0.1 (English)](standards/A01-UNIVERSAL-ACCESSIBILITY-v0.1.en.md)
- [Русская версия](standards/A01-UNIVERSAL-ACCESSIBILITY-v0.1.md) · [简体中文版](standards/A01-UNIVERSAL-ACCESSIBILITY-v0.1.zh.md)

The document covers continuous step-free routes across all levels, lifts and escalators, universal toilets and showers, family care rooms, wayfinding, sensory comfort, operations and evacuation. Regulatory dimensions are listed as reference minima where applicable; this project standard is not construction documentation or proof of compliance.

## Integrated digital twin A-01 v3.7.0 — Human Comfort Engineering

- [Open v3.7.0](digital-twin/eva-sphere-a01-v370-human-comfort-engineering.html)
- [Русская документация](digital-twin/README_RU_v370.md) · [English documentation](digital-twin/README_v370.md) · [简体中文说明](digital-twin/README_ZH_v370.md)
- [Changelog](digital-twin/CHANGELOG_v370.md) · [Engineering note](architecture/A01-HUMAN-COMFORT-ENGINEERING-v0.1.md)

v3.7.0 preserves v3.6.0 with AIR-01 and adds a Comfort entry to the integrated navigation. The embedded workspace covers step-free circulation, lifts and supplementary escalators, universal toilets and showers, family care, separated water/waste streams, floor/ceiling concepts and evacuation. Its vertical section is an interactive SVG schematic, not new Three.js spatial geometry; calculations, scale calibration and real-equipment validation remain outstanding. The v3.6.0 source remains preserved separately.


## A-01 v3.8.0 — Axiom-inspired Interior Blockout

- [Open interactive 3D blockout](digital-twin/eva-sphere-a01-v380-axiom-inspired-interior-blockout.html)
- [Russian](digital-twin/README_RU_v380.md) · [English](digital-twin/README_v380.md) · [简体中文](digital-twin/README_ZH_v380.md) · [Changelog](digital-twin/CHANGELOG_v380.md)
- [Architectural study](architecture/A01-AXIOM-INTERIOR-BLOCKOUT-v0.1.md)

A standalone Three.js companion scene for the v3.7.0 digital twin. It explores a central atrium, ring galleries, public/residential/family zones, bridges, illustrative lift shafts and service routes. This module is linked from the digital-twin index but is not merged into the v3.7.0 main scene. Scene units are uncalibrated; no engineering or safety calculations are claimed.


## A-01 X v0.3.0 — Sphere Intelligence and Human Wellbeing

- [Release overview (EN)](releases/a01-x-v0.3.0/README.md) · [RU](releases/a01-x-v0.3.0/README_RU.md) · [简体中文](releases/a01-x-v0.3.0/README_ZH.md)
- [Riddle-driven design method](releases/a01-x-v0.3.0/DESIGN-METHOD.md) · [Sphere Intelligence specification](releases/a01-x-v0.3.0/SPHERE-INTELLIGENCE-SPEC.md) · [13-hour test protocol](releases/a01-x-v0.3.0/13-HOUR-TEST.md)
- [References and standards](releases/a01-x-v0.3.0/REFERENCES.md) · [Riddle JSON Schema](releases/a01-x-v0.3.0/riddle.schema.json) · [Release notes](releases/a01-x-v0.3.0/RELEASE-NOTES.md)

v0.3.0 is a documentation-only research specification. It defines how the Sphere should reduce avoidable human burden and support recovery; it does not connect real building equipment or prove 13-hour comfort.


## A-01 X — Sensory Bridge: Living Perception Loop v0.2

- [Release v0.2 (EN)](releases/a01-x-sensory-bridge-v0.2/README.md) · [RU](releases/a01-x-sensory-bridge-v0.2/README_RU.md) · [简体中文](releases/a01-x-sensory-bridge-v0.2/README_ZH.md)
- [Living Perception Loop architecture (RU)](architecture/A01-X-LIVING-PERCEPTION-LOOP-v0.2.md)
- [Observation JSON Schema](schemas/a01-x-sensory-observation-v0.2.schema.json) · [example](schemas/a01-x-sensory-observation-v0.2.example.json)
- [Perception event JSON Schema](schemas/a01-x-perception-event-v0.2.schema.json) · [event-chain example](schemas/a01-x-perception-event-v0.2.example.json)
- [Previous v0.1 architecture](architecture/A01-X-SENSORY-BRIDGE-v0.1.md)

v0.2 defines typed sensor packets, body/room frame mapping, time synchronization, separate media permissions and a traceable observation-to-verification event trail. This is a documentation release; no physical Android-01 runtime or sensory endpoint is connected.