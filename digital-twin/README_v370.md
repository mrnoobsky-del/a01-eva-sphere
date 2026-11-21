# A-01 v3.7.0 — Human Comfort Engineering integration

**Date:** 21 November 2026  
**Parent:** integrated A-01 digital twin v3.6.0 — AIR-01  
**Type:** experimental digital-twin integration and engineering workspace  
**Status:** source and navigation integration published; live browser/WebGL verification and engineering validation remain outstanding.

## Open
- [Open A-01 v3.7.0 — Human Comfort Engineering](eva-sphere-a01-v370-human-comfort-engineering.html)
- [Changelog](CHANGELOG_v370.md)
- [Universal Accessibility & Family Comfort Standard (RU)](../standards/A01-UNIVERSAL-ACCESSIBILITY-v0.1.md)
- [English standard](../standards/A01-UNIVERSAL-ACCESSIBILITY-v0.1.en.md) · [简体中文标准](../standards/A01-UNIVERSAL-ACCESSIBILITY-v0.1.zh.md)
- [Interactive Floor & Ceiling Engineering module](../engineering/a01-floor-ceiling-engineering-v0.1.html)
- [Human comfort and sanitary engineering note](../architecture/A01-HUMAN-COMFORT-ENGINEERING-v0.1.md)

## 1. What changed

v3.7.0 preserves the v3.6.0 source scene and adds a **Comfort** entry to the main navigation. It opens an embedded Human Comfort Engineering workspace within the A-01 application.

The workspace brings together six subjects: step-free circulation; universal toilets and showers; family care rooms; water supply and separated wastewater streams; floor assemblies, ceilings and service plenums; accessible evacuation and assistance.

## 2. Interactive schematic

The module provides L00–L04 selection with level descriptions, plus switchable layers for the accessible route, lift core, escalators, wastewater risers and water supply. Six tabs cover Access, Sanitary, Family, Water, Floors and Evacuation. RU/EN language and light/dark theme are synchronized with the main application shell.

The vertical section is a responsive SVG relationship diagram. It is not a scaled building drawing or geometric 3D model. Escalators are supplementary; step-free vertical access is based on lifts and continuous accessible routes.

## 3. Design logic

**Accessibility.** A continuous route connects the site and entrance to public and residential functions. Lifts are the primary vertical transport. Escalators and stairs do not replace an accessible route. Wayfinding combines visual, tactile and audio modalities.

**Sanitary rooms.** The concept includes universal toilets, accessible showers, grab rails, assistance calls, cleanable finishes, local extraction at odour sources, and acoustic protection at doors, partitions, soil stacks and ventilation.

**Family care.** Provide a protected changing surface, stroller space, feeding chair, privacy for breastfeeding and expressing milk, washbasin, hygiene supplies and safe food warming. A family room does not replace accessible public toilets.

**Water and wastewater.** Separate potable water, greywater, blackwater, rain/meltwater, kitchen drainage and technical drainage. Consider shower-wastewater heat recovery, leak protection, cleanouts and maintenance access. Greywater reuse requires separate treatment, quality monitoring and backflow protection for the potable network.

**Floors and ceilings.** Preserve the original Sphere's sculpted fascias and concealed lighting as architectural features. Structural slab, beams, acoustic layer, service plenum, fire boundary and architectural ceiling remain distinct coordinated layers. Decorative surfaces do not replace structural or fire-resistance assemblies.

**Evacuation.** Ordinary escalators and passenger lifts are not automatically evacuation facilities. A dedicated fire strategy, code-compliant protected zones and routes, accessible alarms, two-way communication, staff, backup power and practical drills are required.

## 4. Related standards and modules
- [A-01 Universal Accessibility & Family Comfort Standard v0.1](../standards/A01-UNIVERSAL-ACCESSIBILITY-v0.1.en.md)
- [A-01 Floor & Ceiling Engineering v0.1](../architecture/A01-FLOOR-CEILING-ENGINEERING-v0.1.md)
- [Interactive Floor & Ceiling Engineering](../engineering/a01-floor-ceiling-engineering-v0.1.html)

## 5. Verification and limitations

**Completed:** a separate v3.7.0 file was created from v3.6.0; the previous version was not overwritten; the Comfort navigation entry was added and connected to the integrated-page mechanism; the module includes five levels, an interactive SVG schematic, visibility layers, six tabs, RU/EN and theme synchronization.

**Not completed:** a full browser walkthrough inside the live Three.js/WebGL scene; testing on physical devices, with screen readers or with real users; adding sanitary fixtures, escalators and pipes as physical Three.js objects; metre calibration; lift traffic, routes, pipework, drainage gradients, ventilation, acoustics, fire compartments or evacuation calculations; BIM/IFC, P&ID or connection to real automation.

The new workspace is embedded as a self-contained engineering page in the application. Its vertical section is an interactive 2D schematic, not new 3D geometry. Publishing the GitHub file does not automatically update the uCoz website. The main scene retains the v3.6.0 visual language; v3.7.0 is not evidence of an as-built structure or code compliance.

## 6. Next engineering gates
1. Coordinate dimensioned L00–L04 plans, occupancy and functional zones.
2. Place accessible toilets and family rooms and check clear dimensions and routes.
3. Calculate lift traffic and review escalators, stairs and landings.
4. Build coordinated BIM/IFC for floor assemblies, shafts, water, wastewater and HVAC.
5. Calculate water balances, drainage gradients/capacity, sanitary venting, local extraction, noise and heat recovery.
6. Develop fire and evacuation strategies with qualified specialists and users.
7. Complete an independent accessibility audit and user testing.

---

*v3.7.0 integrates a conceptual engineering workspace into the digital twin. It is not construction documentation, BIM, a P&ID, an equipment controller or proof of safety.*
