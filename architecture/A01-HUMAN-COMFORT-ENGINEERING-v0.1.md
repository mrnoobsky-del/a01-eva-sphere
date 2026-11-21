# A-01 — Human Comfort & Sanitary Engineering v0.1

**ID:** A01-HCE-001  
**Status:** concept design note; detailed engineering and user review required  
**Interfaces:** accessibility, architecture, mobility, water, HVAC, fire/life safety and operations.

## 1. Purpose

This note coordinates the comfort and sanitary design brief represented in the integrated v3.7.0 Human Comfort Engineering workspace. It links the Universal Accessibility & Family Comfort Standard with the floor/ceiling assembly module and the existing Sphere architecture.

The objective is a continuous, dignified user journey across L00–L04: arrival, movement, rest, hygiene, family care, evacuation and return.

## 2. System groups

### 2.1 Accessibility and movement
- Continuous step-free routes from site arrival and main entrance to designated public and residential functions.
- Accessible lifts as the primary vertical transport.
- Escalators as supplementary circulation, never the only route and never assumed to be an evacuation route.
- Stairs with handrails, visible step edges and adequate lighting.
- Rest points, stroller parking and accessible passenger information.
- Multichannel wayfinding: visual, tactile, audio and a non-smartphone way to request help.

Lift quantity, car dimensions, passenger capacity, redundancy and emergency operation require calculations after occupancy and plans are defined.

### 2.2 Universal sanitary rooms
- Accessible cubicles within shared toilet blocks and separate universal rooms.
- Left- and right-side transfer options across the facility.
- Grab rails, fold-up supports, accessible washbasins and controls.
- Step-free showers with seats, handheld showers, thermostatic mixing and accessible assistance calls.
- Cleanable water-resistant finishes, waterproofing, floor drainage and maintenance access.
- Local extract near odour sources; separate exhaust paths and backflow prevention.
- Acoustic design for partitions, doors, service penetrations, soil stacks and ventilation silencers.

### 2.3 Family care room
Provide a private room for parents and caregivers with a safe changing surface, stroller and wheelchair manoeuvring space, feeding chair, breastfeeding/privacy zone, washbasin, hygiene supplies and safe food warming. Milk refrigeration is optional and requires temperature monitoring, sanitation and an operating procedure. The family room is supplementary and does not replace accessible public toilets.

### 2.4 Water and drainage
Keep these streams distinct:
- potable water;
- greywater from showers and basins;
- blackwater from toilets and urinals;
- rain and meltwater from the envelope and terraces;
- kitchen drainage with grease interception;
- technical drainage and condensate;
- emergency leakage collection.

Greywater heat recovery should be studied at shower and laundry sources. Reuse for non-potable demand requires a separately engineered treatment train, quality monitoring, physical separation, backflow protection and a safe fallback discharge. This note does not approve reuse.

Drainage design must establish fixture loading, pipe diameter, fall, venting, cleanout locations, pumping duties where gravity drainage is unavailable, backwater protection, frost protection, noise, fire stopping and maintenance access. All details depend on the local network and site conditions.

### 2.5 Floor/ceiling and service integration
Coordinate finished floor, thresholds and wet-room falls with:
1. floor finish;
2. screed/distribution/optional heating layer;
3. resilient acoustic layer;
4. structural slab and ring-radial framing;
5. MEP service zone;
6. fire/acoustic boundary and removable architectural ceiling.

The sculpted soffit, fascia, glazing tint and concealed violet/teal/warm-white lighting from the earlier Sphere design are architectural layers. They must not obstruct access, fire stopping, inspection, replacement or ventilation. No structural member size or ceiling fire rating is selected by the visual prototype.

### 2.6 Acoustic comfort and odour
Sanitary privacy is a system issue, not only a partition issue. Verify airborne and structure-borne sound through door seals, wall junctions, ceiling plenums, pipe supports, soil stacks and ventilation ducts. Extract air near the source and prevent transfer into adjacent cubicles, corridors and residential zones. Fragrance masking is not an odour-control strategy.

### 2.7 Fire and evacuation
A dedicated fire strategy must coordinate protected areas, evacuation routes, accessible alarms, two-way communication, staffing and backup power. Ordinary passenger lifts and escalators are not assumed to provide evacuation. Drills should include disabled users and caregivers.

## 3. Preliminary level allocation

| Level | Functional intent |
|---|---|
| L00 | Main accessible entrance, universal sanitary room, shower, family care room, rest and assistance |
| L01 | Accessible atrium loop, viewing positions, public toilets and lift lobbies |
| L02 | Accessible service/food entries, sanitary rooms, kitchen and grease-management interfaces |
| L03 | Adaptable homes, accessible private sanitary rooms and designated terrace access |
| L04 | Accessible staff/control-room access, sanitary room, rest and assistance |

The schedule is indicative. Room counts, travel distances and locations require occupancy and plan studies.

## 4. Information model

Each requirement and asset should have a stable ID, level/location, user scenario, drawing or BIM/IFC reference, unit, source clause (where applicable), evidence state, reviewer, maintenance access and verification record.

Recommended requirement families:
- A01-ACC — accessibility and circulation;
- A01-SAN — sanitary facilities;
- A01-FAM — family care;
- A01-WAT — water and wastewater;
- A01-ACU — acoustic and odour control;
- A01-FLS — evacuation and fire/life safety.

Evidence states follow the A-01 Sphere Standard: unknown, assumed, proposed, calculated, reviewed, tested, approved and as-built.

## 5. Verification gates

1. Dimensioned plans for all five levels and a continuous accessible-route audit.
2. Lift traffic and vertical-circulation study, including independent alternatives.
3. Sanitary fixture layout and clear-space review by accessibility specialists and users.
4. Family-room usability review with parents and caregivers.
5. Water balance, drainage and venting calculations, leak scenarios and maintainability review.
6. Acoustic and ventilation review of toilets, showers and risers.
7. Fire strategy, protected areas, evacuation calculations and practical drills.
8. Coordinated BIM/IFC and MEP clash review, including access panels and fire stopping.
9. Full-scale mock-up of one accessible toilet/shower junction and one acoustic service-stack assembly.
10. Independent audit before procurement or construction decisions.

## 6. Prototype boundary

The v3.7.0 workspace embeds a self-contained interactive SVG relationship schematic and design summaries. It does not add sanitary fixtures, escalators or pipework as physical objects in the Three.js spatial scene. Its lines are not pipe diameters, gradients, flows or pressure readings. It is not BIM, P&ID, a hydraulic calculation, fire strategy, accessibility certification or an operating controller.

The separate Floor & Ceiling Engineering prototype remains a concept tool with editable placeholder thicknesses. No displayed geometry or value is approved for construction.

## 7. Related material

- [A-01 Universal Accessibility & Family Comfort Standard (RU)](../standards/A01-UNIVERSAL-ACCESSIBILITY-v0.1.md)
- [English standard](../standards/A01-UNIVERSAL-ACCESSIBILITY-v0.1.en.md)
- [Chinese standard](../standards/A01-UNIVERSAL-ACCESSIBILITY-v0.1.zh.md)
- [Floor & Ceiling Engineering v0.1](A01-FLOOR-CEILING-ENGINEERING-v0.1.md)
- [Interactive floor/ceiling module](../engineering/a01-floor-ceiling-engineering-v0.1.html)
- [Integrated digital twin v3.7.0](../digital-twin/eva-sphere-a01-v370-human-comfort-engineering.html)

## 8. Open decisions

- final building use, code classification and jurisdiction;
- site datum, climate exposure and external wastewater connection;
- occupancy, visitor peak, staffing and family-room demand;
- room counts, travel distances and floor-plan geometry;
- gravity-drainage feasibility, pump locations and local network conditions;
- lift traffic and redundancy requirements;
- approved fire strategy and evacuation approach;
- user testing and independent accessibility audit.

All design decisions remain proposed until responsible specialists provide calculations, reviews and approvals.
