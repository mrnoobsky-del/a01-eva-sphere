# A-01 — Floor & Ceiling Engineering v0.1

**Status:** interactive concept module and preliminary design note  
**Module file:** `engineering/a01-floor-ceiling-engineering-v0.1.html`  
**Scope:** five-level digital-twin floor assemblies, inter-floor slabs, soffits, service voids and level-specific floor/roof interfaces  
**Not:** a structural design, coordinated BIM model, fire strategy, MEP design, construction document or certified calculation

## 1. Why this module exists

The A-01 digital twin has five level groups and a central atrium opening. The supplied v3.1.6 source places the level groups at model coordinates `0.65, 2.00, 3.65, 5.30, 6.95`; it creates annular floor plates between the outer radius and the atrium radius, with a nominal geometry thickness of `0.19` model units. The atrium radius is `3.72` and the outer floor radius is `7.85` model units.

These are scene coordinates, not calibrated metres. The 0.19-unit plate thickness must not be interpreted as 190 mm. The level-to-level differences (1.35 and 1.65 model units) are useful for scene relationships only until a controlled datum, scale and surveyed/selected dimensions are established.

The present module makes the missing construction logic visible as a coordinated floor/ceiling assembly: the occupied floor above, load-bearing system, engineering zone, acoustic/fire requirements and ceiling below are treated as one coordinated interface rather than two unrelated flat surfaces.

## 2. Assembly logic

The standard internal-floor scenario exposes these conceptual layers:

1. Finish floor — wear, slip resistance, cleaning and access.
2. Screed/distribution layer — level correction and optional heating interfaces.
3. Resilient acoustic layer — impact-noise control and perimeter continuity.
4. Structural slab — primary horizontal load-bearing element.
5. Beam/rib depth — an illustrative structural zone, not a selected member size.
6. MEP/service plenum — coordinated air ducts, water and drainage, power, data, fire systems, controls and maintenance access.
7. Ceiling — removable or otherwise serviceable lower finish; it does not replace the fire-rated structural floor assembly.

The interactive values are deliberately editable demonstration placeholders. They are not extracted from an engineering calculation and must not be used for procurement, detailing or construction. The module can export a JSON snapshot that preserves the selected level, layer values, units and verification status.

## 3. Level-specific conditions

| Level | Primary floor/ceiling condition | Design issue to preserve |
|---|---|---|
| L00 — Care | Ground-contact floor / foundation interface | Groundwater, capillary moisture, ground conditions, thermal losses and any local B1 interfaces require site-specific studies. This is not automatically a suspended inter-floor slab. |
| L01 — Atrium | Ring gallery around the central void | The central atrium remains an open multi-level volume. The gallery edge, balustrade, bridges, acoustic treatment and smoke strategy must be coordinated. |
| L02 — Services | Commercial/service floor | Kitchens, wet areas, storage, equipment loads, drainage and service access need separate room-type assemblies. |
| L03 — Living / terrace | Residential floor and possible external terrace | Impact sound, privacy, wet-room protection and the green-terrace build-up are distinct assemblies. Do not apply an exterior terrace build-up to all residential rooms. |
| L04 — Operations | Upper occupied level below the dome | Above this level the boundary is the inner dome/roof interface, not automatically another floor plate. Coordinate condensation, thermal bridges, access, lighting and services. |

The interactive module includes presets for a typical internal assembly, wet zone, green terrace/accessible roof, atrium gallery, ground-contact floor and upper level beneath the dome. The presets are teaching and coordination scenarios only.

## 4. Structural system to develop

The circular plan suggests studying a paired-ring and radial framing concept:

- inner ring beam around the atrium opening;
- outer ring beam at the floor perimeter;
- radial primary members between the rings;
- secondary circumferential members where spans, openings and vibration checks require them;
- local transfer members around the lift core, bridges, stairs, shafts and service openings;
- floor plates divided into buildable and maintainable segments.

This is a structural concept to compare, not a selected structural solution. It must remain independent of the decorative dome skin unless a verified load path explicitly connects them. No section size, reinforcement, bolt, weld, anchor, bearing or fire rating is selected here.

## 5. MEP coordination inside the floor/ceiling zone

The module visualises independent toggles for:

- HVAC supply/return routes, access to dampers, filters, silencers and controls;
- potable, greywater and wastewater routes, cleanouts, leak detection and isolation;
- power and low-voltage/data containment, separated and labelled;
- fire protection, detection, compartment penetrations and service interfaces;
- acoustic treatment and removable ceiling access.

The lines are schematic routing indicators, not pipe/duct sizes, slopes, pressure losses, electrical ratings, sprinkler layouts or a P&ID. Keep water connections and drainage away from sensitive electrical/compute rooms where practicable; where unavoidable, provide a separately engineered containment, detection and isolation strategy.

## 6. Acoustic and fire/life-safety requirements

- Separate airborne and impact-sound objectives; ceiling panels alone do not solve impact transmission through the structure.
- Avoid rigid flanking paths at slab edges, partitions, façade brackets and service penetrations.
- Mechanical plant and rotating equipment require vibration isolation and maintainable connections.
- The structural floor assembly must provide the required fire separation for the actual jurisdiction and occupancy.
- Every service penetration needs a coordinated fire-stopping detail and traceable inspection state.
- A suspended ceiling must not be treated as a substitute for the required fire resistance of the slab or compartment boundary.
- The atrium smoke-control concept is separate from comfort ventilation; do not route or operate systems as if one mode automatically satisfies the other.

## 7. Data model required for later digital-twin integration

Each level/assembly should eventually carry:

- persistent assembly ID and level ID;
- assembly type (internal, wet, terrace, ground-contact, atrium-edge, upper-roof interface);
- calibrated top-of-finish and underside-of-slab elevations;
- slab boundary, atrium void boundary, openings and structural grid;
- material/build-up layers with SI units and verified source data;
- beam/rib families and support conditions;
- MEP reservation volumes, penetrations and maintenance clearances;
- acoustic, fire, moisture and thermal requirements;
- lifecycle state, inspection access, replaceable parts and maintenance record;
- evidence status for every material value: unknown, assumed, proposed, calculated, reviewed, tested, approved or as-built.

The data should later be mapped to the A-01 project information model and, where useful, exchanged through IFC. The HTML prototype currently does not generate IFC, an EnergyPlus model, a structural finite-element mesh or a coordinated BIM deliverable.

## 8. Required next engineering gates

1. Freeze the site datum, geographic orientation, model scale and level elevations.
2. Set occupancy, room areas, live loads, partitions, equipment loads and maintenance loads by use.
3. Agree a structural framing concept and calculate the ring/radial load paths, slab spans, deflection, vibration, robustness and foundations.
4. Coordinate lift/stair cores, atrium edge, bridges, major openings and fire compartments.
5. Define the fire/smoke strategy and required fire resistance before fixing ceiling void layouts.
6. Build a coordinated MEP reservation model; check duct depth, drainage falls, valve access and replaceability.
7. Calculate thermal bridges, floor-edge temperatures, condensation risk, acoustic performance and waterproofing details.
8. Review accessibility, thresholds, tactile/wayfinding cues, maintenance operations and safe access.
9. Independently review and test representative full-scale junctions before any physical implementation.

## 9. Prototype verification

The HTML module was checked in Chromium using a 1440 px desktop viewport and a 390 px mobile viewport. Level switching, terrace preset switching, layer explosion, labels, system visibility, editable values and JSON export were exercised. No JavaScript runtime errors were observed in those checks and no horizontal overflow was observed at the tested mobile width.

These are software/interface checks only. They are not browser/device certification, structural verification, MEP coordination or physical testing.

## 10. Related A-01 material

- [A-01 Sphere Standard](../standards/A01-SPHERE-STANDARD-v0.1.md)
- [Modular systems research](modular-systems-research-v0.1.md)
- [Parametric cassette geometry](A01-CAS-PANEL-GEOMETRY-v0.1.md)
- [Current integrated digital-twin documentation v3.6.0](../digital-twin/README_RU_v360.md)

**Status discipline:** scene geometry remains illustrative until calibrated. All editable millimetre values in the interactive module are placeholder inputs, not physical design values.
