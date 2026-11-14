# A-01 Sphere Standard — v0.1

**Status:** proposed project information standard; not a building code, statutory standard or certified design method.  
**Checked:** 14 November 2026.

## Purpose

A Sphere is a site-specific built-environment project described with a common information model. A-01 defines how to identify places, levels, systems, assemblies, components, materials, colours, fasteners, maintenance and evidence. It does not prescribe one universal geometry or technology. Climate, geology, occupancy, culture, local regulations and supply chains remain specific to each site.

## 1. Four independent architectural layers

Every Sphere should distinguish:
1. **Primary structure:** foundations, rings, ribs, nodes, bracing and load paths.
2. **Inner environmental and life-safety boundary:** air, water, vapour and thermal envelope, fire/smoke compartments, openings and egress.
3. **Replaceable external modules:** cassettes, shutters, PV elements, cladding, sensors and service rails.
4. **Interior experience layer:** digital-sky panels, lighting, acoustics, signage and adaptable finishes.

A removable cassette must not silently become a structural dependency. A cassette failure must not compromise the main frame, the inner environmental envelope or occupied spaces. Service operations require exclusion zones, positive mechanical retention, secondary restraint, local controls, manual recovery and a documented safe state.

## 2. Shared system taxonomy

| Code | System | Typical scope |
|---|---|---|
| SIT | Site | Plot, climate, geology, access, utilities |
| STR | Structure | Foundations, frames, rings, ribs, nodes |
| ENV | Environmental envelope | Air/water/vapour/thermal barrier, glazing, insulation |
| CAS | Replaceable cassettes | Exterior panels, rails, locks, lifting interfaces |
| SKY | Digital sky | LED sectors, projection, calibration, service access |
| ARC | Architecture | Levels, spaces, dwellings, commons, finishes |
| ENE | Energy | Generation, storage, distribution, metering |
| WAT | Water | Potable, greywater, wastewater, rainwater |
| HVA | HVAC | Heating, ventilation, cooling and controls |
| WST | Waste/material loops | Sorting, containers, logistics, recycling |
| ICT | Data/communications | Fibre, networks, cybersecurity, compute |
| FLS | Fire/life safety | Detection, suppression, smoke, egress, emergency power |
| MOB | Mobility/logistics | Passenger/service lifts, robotics, loading |
| OPS | Operations | Asset register, inspection, spares, work orders |
| GOV | Governance | Access rules, decision rights, transparency |

Projects may add local subcodes but must not redefine these base codes.

## 3. IDs, hierarchy and lifecycle

Each Sphere has an immutable lowercase `sphereId` and versioned manifest. Each physical or digital asset should have a persistent machine identifier (UUID where feasible), human-readable `assetTag`, parent assembly/system, location, lifecycle state and verification state.

Recommended human tag: `<SPHERE>-<SYSTEM>-<CLASS>-<SEQUENCE>`, e.g. `A01-CAS-PANEL-0001`. This is an A-01 convention, not an ISO requirement. Do not encode a changing location or material grade into a permanent UUID.

Lifecycle states: proposed → designed → specified → procured → installed → commissioned → in-service → maintenance → replaced/removed. Project stage and individual asset lifecycle are separate.

## 4. Geometry and units

- SI is the default: m, m², m³, kg, N, kN, Pa, W, kW, kWh, °C and seconds.
- Every physical quantity declares a unit; dimensionless values are explicit.
- 3D scene coordinates are not metres unless a controlled scale and datum are documented.
- Model status must be stated: illustrative, scaled-concept, preliminary, calculated, surveyed or verified-as-built.
- Store origin, orientation, coordinate reference, level elevations, grids, tolerance and model revision.
- Keep design dimensions separate from measured as-built dimensions.

## 5. Component/material passport

For each maintainable assembly or component, record when applicable:
- component ID, asset tag, parent, system, type, function, quantity and location;
- manufacturer, product code, supplier, production site and batch/lot;
- material family, grade/designation, coating and surface treatment;
- colour system/code (e.g. RAL, NCS or supplier catalogue), not colour name alone;
- gloss level and measurement geometry when appearance is specified;
- relevant structural, fire, thermal, acoustic, impact, corrosion, UV and environmental properties;
- datasheet, declaration, test certificate, EPD and source revision;
- installation, inspection, service-life assumption, repair and replacement method;
- verification status and responsible reviewer.

Aesthetic variants must preserve the declared interface and safety requirements unless separately engineered. White gloss, matte, pearl and other finishes are design choices, not social ranks or different levels of human dignity.

## 6. Fastener and connection register

Never choose a screw from a rendering or copy a nominal size from another building. Identify the joint and design actions first. For each fastener type and joint family record:
- joint ID, drawing/model reference and connected components;
- fastener type, applicable standard/edition, thread, head, material, grade/property class and coating;
- nominal diameter, pitch, length, grip, edge distance, spacing, count and arrangement;
- tension, shear, bearing, slip, fatigue, fire and temperature demands where relevant;
- installation method, lubrication, sequence and approved torque/preload procedure;
- locking method, washers, isolation and galvanic compatibility;
- manufacturer, batch/lot, certificates, inspection and replacement rule.

Critical connections should have individual installed-instance IDs. Repeated low-risk fixings may use a type schedule and counted locations where the responsible engineer approves. Reconcile bill-of-material quantities with model instances.

ISO 898-1 applies to carbon/alloy-steel bolts, screws and studs; ISO 3506-1 covers corrosion-resistant stainless fasteners. These standards specify properties; they do not determine the required size, quantity, embedment, preload or joint capacity for A-01.

## 7. Evidence states

Use one of these states for each value or requirement:
- `unknown` — not researched;
- `assumed` — provisional, with author/date;
- `proposed` — design option, not selected;
- `calculated` — referenced calculation exists;
- `reviewed` — competent reviewer checked it;
- `tested` — test evidence is linked;
- `approved` — approval by the required authority for this jurisdiction/stage;
- `as-built` — measured or confirmed installed condition.

A number in a digital model is not automatically calculated. An animation is not a machinery test. An EPD does not prove fitness for a structural use.

## 8. Open data and exchange

A-01 uses a layered approach:
- **IFC 4.3** for exchange of building/infrastructure objects and relationships, subject to software support.
- **buildingSMART IDS 1.0** for machine-checkable information requirements on IFC handovers.
- **ISO 19650 information-management principles** for requirements, revisions, review, roles and common data environments.
- **ISO 23386:2020** for defining and maintaining properties in interconnected data dictionaries.
- **ISO 23387:2025** for data-template concepts and structures across an asset lifecycle.
- **JSON Schema** for the A-01 Sphere manifest and component registers; it does not replace IFC.
- EPD and lifecycle evidence using applicable current rules, including ISO 14025:2026 and ISO 21930:2017 where relevant.

A-01 JSON schemas are a project-specific application profile. They do not claim full conformance to any ISO or buildingSMART standard.

## 9. Human-centred access model

Every Sphere manifest separates:
- baseline life-support and essential access;
- optional space, finish, privacy and comfort configurations;
- voluntary contribution and participation;
- governance, accountability and appeal paths.

A paid finish or module may change aesthetics, roof options or optional functions. It must not reduce baseline safety, sanitation, dignity or essential life-support. Work or contribution must not become an undisclosed condition for emergency shelter, drinking water, sanitation or essential care.

## 10. Autonomy and operations

AI may advise, forecast, detect anomalies, propose maintenance and optimize resource loops. Critical functions involving fire, doors, lifts, power isolation, water safety, finance and access rights require local fail-safe behavior, audit records, human authority and manual recovery. Essential operations must not depend on a cloud service or one supplier.

Separate operational technology, building management, occupant services and public internet zones. Never put secrets or sensitive occupant data in public manifests.

## 11. Minimum submission for each Sphere

1. `sphere.json` conforming to the A-01 manifest schema.
2. Concept summary, team and attribution.
3. Geometry file/drawing with units and status.
4. System map and component register.
5. Material and fastener registers with unknowns left open.
6. Assumptions, source register and open questions.
7. Risks, maintenance, accessibility and life-safety notes.
8. Verification and local-jurisdiction plan.

No submission is construction-ready by default. Real implementation requires site surveys, geotechnical/climate studies, qualified engineering, regulatory approvals, independent checks and commissioning.

## 12. Open decisions

- Select a jurisdiction/code basis for the first physical pilot.
- Fix occupancy, areas, dome span/rise and foundation concept.
- Choose a classification system/data dictionary governance.
- Decide what data may be open and approve licensing/contribution terms before accepting redistributable CAD or code.
- Identify what “RSI” refers to in the earlier request; do not assume it means only thermal surface resistance.
- Define an IFC exchange view and validate authoring/export tools.
- Prototype one cassette on a ground-level test frame before any elevated mechanism.

## 13. Standards and primary references checked 2026-11-14

- [IFC 4.3.2.0 documentation (buildingSMART)](https://ifc43-docs.standards.buildingsmart.org/) — latest online docs say schema/semantics match ISO IFC 4.3, with further examples and clarifications.
- [buildingSMART IDS v1.0 release](https://github.com/buildingSMART/IDS/releases/tag/v1.0.0) — final standard release, 2024-06-03.
- [ISO 19650-1:2018](https://www.iso.org/standard/68078.html) — published information-management concepts; the ISO page says current after 2024 review and identifies ISO/DIS 19650-1 as under development.
- [ISO 23386:2020](https://www.iso.org/standard/75401.html) — property definition and maintenance; confirmed current in 2025.
- [ISO 23387:2025](https://www.iso.org/standard/85391.html) — published data-template concepts; replaces ISO 23387:2020.
- [ISO 14025:2026](https://www.iso.org/standard/14025) — environmental product declaration programme and EPD requirements.
- [ISO 21930:2017](https://www.iso.org/standard/61694.html) — current construction-product EPD core rules, reviewed/confirmed 2023.
- [ISO 898-1:2013](https://www.iso.org/standard/60610.html) — carbon/alloy-steel fasteners; confirmed current in 2025.
- [ISO 3506-1:2020](https://www.iso.org/standard/70045.html) — corrosion-resistant stainless fasteners; confirmed current in 2025.

Standards are copyrighted and jurisdiction-sensitive. This document records public scope/status information; it does not reproduce standard text. Verify the applicable edition, national adoption, amendments and local code before design decisions.
