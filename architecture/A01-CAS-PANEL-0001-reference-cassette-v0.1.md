# A01-CAS-PANEL-0001 — Reference Exterior Cassette v0.1

**Project:** A-01 — Сфера Евы  
**System:** CAS — Replaceable exterior modules  
**Asset tag:** `A01-CAS-PANEL-0001`  
**Document status:** Proposed concept / preliminary interface definition  
**Checked:** 14 November 2026  
**Verification state:** Proposed; no engineering calculations or physical tests are claimed.

> This is an engineering concept record, not construction documentation, a certified product specification, or evidence that the physical cassette exists. All dimensions, material grades, load capacities, fastener sizes, actuator ratings, service life and acceptance limits remain TBD.

## 1. Design intent

Define one repeatable, replaceable exterior cassette family for the A-01 spherical shell. The cassette may provide an exterior weather screen, shading surface, sensor/PV carrier or architectural finish, depending on the selected variant.

**The cassette is non-loadbearing at building scale.** Its loads pass through a designed secondary support system into the primary structure. It must not become an undocumented brace, ring segment or stability element.

The inner environmental and life-safety boundary remains a separate, continuous building system. Removal or failure of one cassette must not expose occupied rooms directly to weather, defeat the inner air/water/fire boundary, or destabilize the primary frame.

The current digital model's sector count and proportions are visualization choices only. They do not establish the physical cassette count, panel size or fabrication geometry.

## 2. Proposed assembly architecture

Outside to inside; final layer order is subject to climate, hygrothermal, fire and façade engineering:

1. **Exterior skin / rainscreen face** — replaceable visible surface; candidate families include formed metal sheet, mineral-based panel or another tested façade product.
2. **Drainage and ventilation zone** — only if a project-specific moisture and fire strategy supports it; drainage paths must remain inspectable and must not discharge onto electrical equipment or occupied routes.
3. **Cassette perimeter frame and local stiffeners** — carry skin actions to attachment points; connection details must allow calculated thermal movement.
4. **Replaceable gasket / weather interface** — designed for access and replacement; seals are not the primary structural retention.
5. **Primary attachment set** — positive mechanical engagement to an engineered rail/bracket system.
6. **Independent secondary retention** — a separate physical restraint path to a designated structural anchor; it must not share the same single failure point as the primary lock.
7. **Secondary rails and adjustable brackets** — transfer reactions to surveyed primary-structure nodes; adjustment range and bearing must be calculated.
8. **Inner environmental / life-safety boundary** — a distinct layer, continuous across cassette joints and maintained during cassette removal.

No material, thickness, cavity depth or profile size is selected in v0.1.

## 3. Load path and retention philosophy

**Intended load path:** exterior skin → cassette frame → attachment brackets / rails → primary structural node → primary structure → foundations.

The load path must be traceable in drawings and calculation references. The actuator, positioning motor, proximity sensor, software state or magnetic attraction must not be treated as the sole structural support or fall-arrest system.

Minimum design intent:

- positive mechanical locking in the installed position;
- an independent secondary retention path sized and detailed by the responsible engineer;
- a captive installation/removal sequence that cannot leave the cassette free to move;
- a verified support cradle or equivalent controlled receiving position before any lock is released;
- local isolation and lockout for electrical / powered movement;
- a manual recovery method after loss of power, communications or sensor feedback;
- position/lock sensors may report state but do not replace physical retention;
- no release while wind, ice, occupancy, access or equipment state is outside the approved service envelope.

A single fastener, cable, latch, sensor or cloud service must not become a hidden single point of failure. The reliability target and allowable failure modes must be established by a formal safety assessment.

## 4. Interface register

The accompanying CSV template records the initial interfaces. The following are design contracts, not dimensioned details.

| ID | Interface | Required definition |
|---|---|---|
| I-01 | Cassette frame ↔ secondary rail | Coordinates, bearing surfaces, actions, tolerances, thermal movement, inspection access |
| I-02 | Secondary rail ↔ primary structure | Node geometry, anchor loads, substrate properties, local reinforcement, corrosion isolation |
| I-03 | Skin ↔ cassette frame | Edge support, restraint, deflection compatibility, drainage, replacement method |
| I-04 | Cassette ↔ adjacent cassette | Joint width, overlap, movement allowance, water path, visual alignment |
| I-05 | Cassette ↔ inner envelope | Independent air/water/vapour/fire continuity and removal boundary |
| I-06 | Cassette ↔ drainage system | Collection, slope, outlets, overflow, freeze protection and cleanout access |
| I-07 | Cassette ↔ power | Connector type, voltage/current, isolation, ingress rating, earthing/bonding, cable-flex life |
| I-08 | Cassette ↔ data/control | Protocol, addressing, cybersecurity zone, local fallback and event log |
| I-09 | Lock ↔ status sensing | Mechanical lock definition plus independently checked sensor state |
| I-10 | Cassette ↔ lifting / handling rig | Mass, centre of gravity, lifting points, rigging, wind limit and exclusion zone |
| I-11 | Secondary restraint ↔ dedicated anchor | Independent load path, inspectability, corrosion, attachment and replacement |
| I-12 | Cassette ↔ service cradle / actuator | Captive transfer, guides, brakes/locks, emergency stop and manual recovery |

Every interface needs a drawing or model reference, units, tolerances, responsible discipline, verification method and revision.

## 5. Preliminary component breakdown

| Element ID | Element | Candidate direction | Selection gate |
|---|---|---|---|
| CAS-SKIN-01 | Exterior skin | Formed aluminium, coated steel, stainless sheet, mineral-based panel or qualified composite | Fire behaviour, impact, UV, weathering, stiffness, repairability, mass and EPD |
| CAS-FRAME-01 | Perimeter frame | Aluminium extrusion or protected steel profile | Load path, deflection, fatigue, corrosion, thermal bridge, fabrication |
| CAS-RAIL-01 | Secondary rail | Aluminium or protected steel rail system | Calculated reactions, spans, joint movement, anchorage and replaceability |
| CAS-BRKT-01 | Adjustable bracket | Engineered bracket with controlled adjustment | Bearing, pull-out, slip, edge distances, fatigue and installation tolerance |
| CAS-LOCK-01 | Primary lock | Positive mechanical latch / captive bolt / proprietary engineered lock | Proof load, accidental release prevention, visual inspection, cycle life |
| CAS-REST-01 | Secondary restraint | Independent tether or mechanical capture | Separate anchor/load path, corrosion, inspection and replacement |
| CAS-SEAL-01 | Replaceable seal | Candidate EPDM or silicone profile, subject to compatibility review | Temperature range, UV, compression set, chemicals, joint movement |
| CAS-DRAIN-01 | Drainage parts | Replaceable channel, flashing, outlet and cleanout | Capacity, blockage, overflow route, freeze/thaw and maintenance |
| CAS-ISO-01 | Isolation layer | Compatible isolator / thermal break where required | Galvanic compatibility, creep, bearing, fire and moisture |
| CAS-SENS-01 | State sensor | Optional lock/position/moisture/temperature sensor | Fail-safe interpretation, diagnostics and local fallback |
| CAS-DRV-01 | Actuator / drive | Optional service mechanism; not a structural retainer | Load cases, braking, limits, manual recovery and duty cycle |
| CAS-CON-01 | Power/data connector | Sealed, keyed, serviceable connector family | Electrical design, ingress, current, isolation and mating-cycle evidence |

This table is a candidate list, not a bill of materials. Do not combine dissimilar metals without a reviewed galvanic-corrosion strategy. Avoid hidden water traps, uninspectable fasteners and inaccessible seal joints. Do not use adhesive alone for overhead or safety-critical retention.

## 6. Actions and load cases to be assessed

The responsible structural/façade engineers must define magnitudes, combinations, partial factors, local pressure coefficients and acceptance criteria using the selected jurisdictional code basis and site data. This register does not assign numerical actions.

| Load ID | Action / scenario | Required evidence |
|---|---|---|
| LC-01 | Self-weight of skin, frame, rails and installed equipment | Mass schedule; support and anchor reactions |
| LC-02 | Wind pressure | Site wind basis; pressure coefficients for actual spherical geometry |
| LC-03 | Wind suction / local edge and curvature effects | Local zones, peak suction, fastener pull-out and panel deflection checks |
| LC-04 | Snow, drifting snow, ice accretion and sliding ice where applicable | Site climate basis; geometry-specific accumulation and release scenario |
| LC-05 | Differential thermal movement | Material expansion, temperature envelope, joint movement and seal compatibility |
| LC-06 | Seismic action where required | Jurisdictional hazard, attachment deformation and retention assessment |
| LC-07 | Vibration and fatigue | Repeated wind cycles, actuator duty, lock and connector service cycles |
| LC-08 | Installation, lifting and temporary handling | Rigging plan, centre of gravity, lifting points and temporary restraint |
| LC-09 | Inspection and maintenance actions | Access loads, tools, worker protection and temporary configuration |
| LC-10 | Accidental impact / local damage | Defined threat and consequence; safe damaged state |
| LC-11 | Fire and elevated-temperature exposure | Whole-assembly fire strategy, material reaction, cavity/compartment interfaces and retention |
| LC-12 | Rainwater, blockage, overflow and freezing | Drainage capacity, secondary path and no discharge onto critical equipment |
| LC-13 | Corrosion, UV, moisture and freeze/thaw ageing | Exposure classification, compatible material/coating system and durability evidence |

For the spherical shell, wind pressure cannot be copied from a flat-wall design. Curvature, height, edge zones, nearby terrain, internal pressure and temporary service configuration may change governing actions. The site and geometry must be established first.

## 7. Materials, finishes and durability

Material selection is deferred until the site exposure and fire strategy are known. For each selected material, record grade, product code, batch, coating, colour code, gloss measurement where relevant, certificates, EPD, installation details and inspection method.

Candidate review must include:

- local atmospheric corrosivity and moisture exposure;
- galvanic compatibility at every mixed-metal interface;
- coating damage during transport, drilling and service;
- water retention, crevice corrosion and drainage;
- UV and temperature ageing of polymers and seals;
- fire behaviour of each layer and the complete assembly;
- thermal bridges and condensation risk;
- repairability, disassembly, separation and recyclability;
- local availability, replacement lead time and supplier independence.

A white glossy exterior, matte exterior, pearl finish or future PV variant is an appearance/function choice. It must not change the required safety performance unless the variant is separately engineered and verified.

## 8. Joint, seal and tolerance rules

- Every joint family receives a unique joint ID and detail drawing.
- Fastener diameter, grade, embedment, edge distance, spacing, torque and preload remain TBD until the action effects and connected materials are known.
- Use the applicable fastener standards only after choosing the jurisdiction and material system; a property-class standard does not size the connection.
- Check bearing, pull-out, tear-out, slip, prying, local buckling, fatigue, corrosion and differential movement.
- Establish a tolerance stack from primary node survey through rail, bracket, cassette frame and visible skin.
- Permit thermal movement without transferring unintended loads into adjacent cassettes or seals.
- Keep the primary weather shedding layer and drainage route distinct from the inner air/vapour/fire boundary.
- Sealants and gaskets must be replaceable and chemically compatible with adjacent finishes.
- Do not seal the bottom of a drained cavity in a way that traps water; define drainage and overflow explicitly.

## 9. Service and removal sequence (concept)

1. Confirm weather, wind, ice, site access and exclusion-zone conditions against approved limits.
2. Establish a closed work zone below and around the cassette; prevent public/occupant entry.
3. Identify the exact asset and confirm the service work order, lifting plan and trained operators.
4. Isolate power and control; verify safe state locally.
5. Bring the cassette to a positively retained service cradle or equivalent support.
6. Verify the cradle, guides and secondary restraint are mechanically engaged before unlocking.
7. Release the primary lock only under the approved sequence; keep the secondary retention engaged until the cassette is fully supported.
8. Move the cassette using the approved manual or powered recovery method; never rely on software indication alone.
9. Cap/protect connectors and preserve the inner environmental boundary.
10. Inspect rails, anchors, seals, drains and the cassette; replace damaged parts with traceable parts.
11. Reinstall, lock, verify retention, reconnect, perform functional checks and close the work record.
12. Remove the exclusion zone only after an authorized person signs off the safe state.

The first physical prototype should be exercised on a ground-level test frame. Elevated movement is out of scope until independent structural, façade, machinery, electrical, fire and operational safety reviews are complete.

## 10. Failure modes and controls

| Failure mode | Consequence | Required prevention / response |
|---|---|---|
| Primary lock not engaged | Cassette movement or fall | Positive mechanical engagement, independent retention, lock verification and maintenance check |
| Secondary restraint shares same failure point | Common-cause loss of retention | Separate anchor and independent load path, reviewed as a system |
| Actuator or power loss mid-transfer | Suspended / uncontrolled cassette | Mechanical brake/capture, cradle support, local isolation and manual recovery |
| Sensor gives false-safe state | Unsafe release sequence | Sensors are diagnostic only; physical proof and local procedure |
| Drain blocked or frozen | Water ingress / hidden corrosion | Accessible drains, overflow path, inspection and freeze strategy |
| Seal aged or detached | Water ingress / material damage | Replaceable seal, inspection criteria, independent inner boundary |
| Dissimilar-metal corrosion | Loss of section / connection capacity | Material compatibility review, isolation and inspection |
| Fire spreads through cavity | External or concealed fire propagation | Whole-façade fire strategy, cavity/compartment detailing and approved assembly |
| Tolerance mismatch | Forced installation / overstressed joints | Surveyed datums, tolerance stack, adjustment limits and fit-up mock-up |
| Maintenance below live module | Injury from falling object | Exclusion zone, permit, isolation and positive mechanical support |

## 11. Verification and test gates

Acceptance values are **not defined yet**. The project must approve numerical limits before a test can pass.

| Gate | Test / review | Exit evidence |
|---|---|---|
| G0 — Design basis | Site, geometry, code basis, hazards, load paths, maintainability and FMEA | Approved design-basis register; open risks assigned |
| G1 — Materials and joints | Material coupons, coating/seal compatibility, representative fastener and anchor tests as required | Certificates, test reports, joint calculations |
| G2 — Ground-level mock-up | Full-size cassette, adjacent joint, rail, lock, tether, seal and drain on a rigid test frame | Fit-up, removal cycle, inspection and dimensional report |
| G3 — Structural | Positive/negative pressure, deflection, permanent set, connection/anchor capacity, cyclic/fatigue where required | Engineer-approved test protocol and report |
| G4 — Weather and durability | Water penetration / drainage, thermal cycling, UV, freeze/thaw and corrosion exposure as applicable | Test reports and repair criteria |
| G5 — Controls and safe state | Power cut, comms loss, sensor fault, emergency stop, manual recovery and lockout | Verified safe-state matrix; no uncontrolled release |
| G6 — Integrated pilot | Site-specific installation, exclusion-zone procedure, commissioning and maintenance rehearsal | Independent review, signed commissioning evidence and operating procedure |

Testing methods must be selected for the actual product type, orientation, size and exposure. A curtain-wall test method may be a useful analogue but does not automatically validate a curved, sloped cassette or a moving mechanism. The tested specimen must represent production materials, interfaces, seals, anchors and manufacturing tolerances.

## 12. Maintenance and asset history

Record for each cassette and critical attachment:

- unique asset ID and installation position;
- as-installed mass, centre of gravity, drawings and revision;
- material/finish batch and supplier documents;
- each primary lock and secondary restraint identity;
- anchor/rail inspection, measured condition and corrosion record;
- gasket, seal and drainage inspection/replacement;
- actuator, connector and sensor service history where fitted;
- installation/removal cycles, incidents and nonconformities;
- post-storm / post-impact / post-maintenance inspection;
- next due date and responsible role.

Inspection intervals and service life remain TBD. They must be based on the selected products, environmental exposure, risk assessment and competent engineering guidance, not guessed here.

## 13. Open engineering inputs

The following must be supplied before any dimensioning or strength claim:

1. Selected site, jurisdiction, adopted codes, national annexes and authority requirements.
2. Surveyed dome geometry, local panel coordinates, azimuth/elevation, curvature and module boundaries.
3. Primary frame material, geometry, node coordinates, support stiffness and allowable reactions.
4. Site wind, snow, ice, seismic, temperature, precipitation and corrosion-exposure data.
5. Occupancy, fire compartments, egress, façade fire strategy and inner-envelope build-up.
6. Panel function: pure rainscreen, shading, weather skin, PV carrier or a defined combination.
7. Preferred replacement direction, transport path, maximum handling envelope and service-cradle concept.
8. Power/data architecture, safety zones, local controls, emergency stop and manual recovery.
9. Maintenance philosophy, design life, spare strategy and responsible operators.
10. Applicable product/test standards and independent verification authority.

## 14. Current project decisions

| Topic | v0.1 position |
|---|---|
| Asset identity | `A01-CAS-PANEL-0001` proposed |
| Structural role | Non-loadbearing at building scale |
| Inner envelope | Independent and continuous |
| Primary retention | Positive mechanical lock; detail TBD |
| Secondary retention | Independent physical path; detail TBD |
| Actuation | Optional; not a structural support |
| Materials | Candidate families only |
| Geometry / dimensions / mass | TBD |
| Fastener type, grade and size | TBD |
| Design loads / capacities | TBD |
| Fire classification / cavity barriers | TBD by whole-assembly strategy |
| Water performance | TBD by product classification and testing |
| Test status | No physical testing claimed |
| Construction status | Not construction-ready |

## 15. References and applicability notes (checked 14 November 2026)

- [ISO 9223:2012](https://www.iso.org/standard/53499.html) — classifies atmospheric corrosivity. The ISO page reports the edition confirmed in 2022. Site exposure still needs to be characterized; this does not select a material or coating.
- [ISO 12944-1:2017](https://www.iso.org/standard/64833.html) — general introduction to the protective-paint-system standards for steel structures. ISO currently shows a working draft for a replacement, so verify the applicable edition and parts at procurement/design freeze.
- [EN 13830:2015+A1:2020/AC:2022 summary, Swedish Institute for Standards](https://www.sis.se/en/produkter/construction-materials-and-building/elements-of-buildings/walls-partitions-faades/ss-en-138302015a12020ac2022/) — curtain-wall product scope includes its fixings and is limited to vertical systems within ±15°. It is only a possible route if the actual A-01 assembly falls within scope; do not presume it covers the full spherical shell.
- [ASTM E331](https://store.astm.org/standards/e331) — water-penetration test under uniform static air-pressure difference for exterior windows, skylights, doors and curtain walls. A test laboratory/engineer must confirm suitability for the actual specimen.
- [Engineers Australia — Façade / External Wall Fire Safety Design practice guide](https://www.engineersaustralia.org.au/sites/default/files/Learned%20Society/SFS_Facade%20Fire%20Safety%20Design_002_0.pdf) — reference guidance on assessing façade layers, cavities, barriers, openings and fire-spread paths; not a substitute for local fire regulations.

Standards are not reproduced here. Their full texts, national adoptions, amendments and the local code basis must be checked by the responsible professionals. The references are starting points, not a declaration of compliance.
