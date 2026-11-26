# A-01 — W-01 Sanitary Module Engineering Brief

**Document ID:** A01-MOD-W-ENG-001  
**Revision:** 0.1  
**Date:** 26 November 2026  
**Status:** proposed engineering brief for coordination; not a sanitary design, permit submission, calculation, BIM model or construction document.  
**Spatial anchor:** A01-L00-D04 — Свободные санитарные комнаты  
**Family / package:** W / CORE + WET  
**Autonomy:** M0  
**Mobility:** not established; stationary reference profile.

> Scope is deliberately limited to the public sanitary function A01-L00-D04. Showers and changing rooms A01-L00-D06 are a separate W-family module and must have their own fixture, hot-water, drainage, ventilation and occupancy schedules.

## 1. Design intent and source boundary

W-01 is a public sanitary node on L00, part of the Care and Recovery level. The source register identifies it as a planned/demo space with no approved area, layout, capacity or physical status. This brief develops the engineering coordination logic without turning the concept into a presumed room plan.

Design principles inherited from A01:
- equal and continuous access, privacy, independent use and maintainability;
- local isolation, metering and service access at the Utility Dock / service spine;
- potable and non-potable streams remain separated;
- central plant is counted where physically installed, not duplicated in each served module;
- local safety systems remain effective without cloud/AI connectivity;
- all dimensions, quantities, capacities and fire ratings remain TBD until the building/site basis and applicable code matrix are approved.

## 2. Functional zoning proposal

The following are **functional zones**, not a claim that the module already contains this number of rooms. Their count, area and arrangement are to be fixed after occupancy and accessibility studies.

| Zone ID (provisional) | Function | Interfaces | Key coordination issue |
|---|---|---|---|
| W01-Z01 | Entry / transition and wayfinding | ICT, FLS, OPS | Privacy, sightlines, no direct view into cubicles |
| W01-Z02 | Washbasin / hand hygiene zone | WAT, DRAIN, ENE, HVA | Splash control, accessible reach, mirror/lighting |
| W01-Z03 | Standard WC cubicles | WAT, DRAIN, ENE, HVA | Fixture count, cleaning, privacy, service access |
| W01-Z04 | Universal accessible sanitary room | WAT, DRAIN, ENE, FLS, ICT/OPS | Independent use, transfer clearances, alarm and assistance |
| W01-Z05 | Cleaning / janitor point | WAT, DRAIN, ENE, HVA, OPS | Chemical storage, mop sink if approved, lockable staff access |
| W01-Z06 | Technical / service spine | ENE, WAT, DRAIN, HVA, DATA, FLS | Isolators, meters, valves, cleanouts and maintainable access |

Do not assume that Z04 is a gender-neutral family room, or that one accessible room satisfies the full building requirement. The room program must establish user groups, privacy model, number and distribution of accessible facilities, family-care needs and any separate staff facilities.

## 3. User journeys and operational flows

### 3.1 Visitor flow
1. Visitor approaches from the public accessible route.
2. Entry transition blocks direct sightlines into cubicles.
3. Visitor reaches the appropriate fixture zone using legible visual/tactile wayfinding.
4. Hand hygiene is available on the natural exit path.
5. Visitor returns to the public route without crossing the janitor/service zone.

### 3.2 Accessible room flow
- Step-free route to the room, clear door approach and manoeuvring space.
- Door and lock operable from the intended seated/standing positions.
- WC, basin, grab rails, mirror, coat/bag hook and accessories coordinated as one use sequence.
- Assistance call reachable from the WC and from a fallen/low position; alarm receipt and response are defined in the operations plan.
- A person can exit or summon help without relying on a mobile phone, cloud account or Eva.

### 3.3 Cleaning and maintenance flow
- Staff enter the cleaning point from the service side where possible.
- Cleaning equipment and chemicals are stored separately from public supplies and potable-water components.
- Fixtures can be isolated and repaired without shutting down unrelated modules.
- Cleanouts, valves, traps, filters and electrical isolators remain accessible without removing permanent finishes or entering another occupied module.
- Cleaning tasks, consumables, frequency, inspection and response times are defined by the operator.

## 4. Water architecture

### 4.1 Potable cold water
Candidate sequence:
**Sphere potable-water main → branch isolation → local meter / pulse point → backflow protection as required → local distribution manifold → fixtures.**

Design inputs:
- utility technical conditions, source pressure and quality;
- peak and daily fixture demand;
- required pressure at the hydraulically remote fixture;
- pipe material, routing, temperature exposure and freeze risk;
- water meter and submeter strategy;
- flushing, disinfection and commissioning procedure.

No diameter, pressure, velocity, flow or storage volume is assigned in this brief.

### 4.2 Domestic hot water
The preferred concept for study is **central DHW generation with a dedicated branch to W-01**, rather than an unexamined heater inside the wet module. This is a study preference only; compare central generation, local generation and recirculation against route length, wait time, heat loss, hygiene, energy, maintenance and failure isolation.

Candidate sequence:
**Central DHW plant → supply branch → local isolation / metering where justified → temperature-control / anti-scald devices at the point of use → fixtures → return/recirculation only if the hydraulic and hygiene design requires it.**

Rules:
- hot-water demand is recorded as thermal demand (kW(th), kWh(th)) and water volume/temperature; it is not added to electrical kW;
- generator input power and pumps are recorded at the actual plant;
- temperature limits, storage, circulation, disinfection and hygiene regime are set by the applicable sanitary and engineering design;
- avoid long stagnant branches and dead legs;
- do not invent a recirculation loop until pipe route and draw-off schedule are known.

### 4.3 Non-potable water and reuse
Greywater reuse is **not part of the base W-01 design**. Do not connect basin discharge to WC flushing or any other reuse circuit without a separately engineered and permitted treatment system, water-quality monitoring, cross-connection protection, distinct pipe identification, maintenance regime and safe bypass/discharge. Blackwater and kitchen waste are not combined with greywater by default.

## 5. Drainage architecture

Candidate sanitary sequence:
**Fixture trap → branch waste pipe → accessible cleanout → module collection branch → building sanitary stack / collector → external sewer connection.**

Coordination checks:
- confirm gravity drainage feasibility using surveyed/approved invert levels;
- calculate fixture-unit loading, simultaneous discharge, pipe gradients, diameters, venting and pressure transients under the applicable method;
- provide cleanouts and maintenance access at locations justified by the final routing;
- prevent sewer gas entry through correctly selected and maintained traps;
- coordinate floor drains only where their purpose and trap-primer / evaporation control strategy are defined;
- check backwater/flood risk and any required backflow protection;
- avoid routing drainage above electrical distribution, ICT cabinets or sensitive rooms where practicable; if unavoidable, design secondary containment, leak detection and isolation;
- use a local lifting pump only if gravity drainage is proven infeasible or site conditions require it. A pump is not assumed by default.

## 6. Ventilation and moisture control

W-01 requires a dedicated sanitary exhaust strategy. The exact solution may be local extract or a branch from a central exhaust system; selection follows the whole-building HVAC and fire strategy.

Design intent:
- keep odours and humid air from migrating to the public atrium or adjacent dry rooms;
- establish a controlled pressure relationship with adjacent public zones based on the HVAC/fire design;
- provide make-up air through a deliberate path that does not create draughts or bypass the intended extraction;
- locate grilles to sweep air from cleaner areas toward odour sources without short-circuiting;
- provide access to fans, dampers, silencers, filters and balancing points;
- coordinate noise, vibration, condensation, duct insulation, drainage of condensate and cleaning access;
- do not treat sanitary extract as smoke exhaust or assume it satisfies smoke-control requirements;
- fire/smoke dampers, shutdown or continued operation during fire are determined by the approved fire strategy and applicable regulations, not by a generic automation rule.

No airflow rate, air-change rate, fan duty, duct size, pressure setpoint or acoustic limit is assigned without room geometry, occupancy and calculations.

## 7. Electrical, controls and life safety

Candidate electrical consumers:
- general, mirror and emergency lighting;
- hand dryers if selected;
- local sensors and controls;
- assistance call / alarm devices;
- local pump only if the hydraulic design requires one;
- local exhaust fan only if not part of central plant.

Design requirements:
- define wet-zone electrical protection, equipotential bonding, protective devices, enclosure ratings and separation distances through the electrical design and selected equipment instructions;
- separate power and data routes;
- ensure maintenance isolation is identifiable and accessible;
- emergency lighting and alarm supply are designed under the building life-safety strategy;
- a loss of network or cloud must not disable the local assistance-call/alarm function;
- the assistance-call signal must reach a staffed point or an explicitly defined response channel; an unmonitored button is not an operational safety feature;
- Eva/Orion may display a non-safety-critical status or create a maintenance task but are not the alarm controller or sole response path.

## 8. Waterproofing, floor and wall build-up

W-01 is a wet-area assembly coordinated with the floor/ceiling engineering note, not a finish-only change.

The coordinated detail must show:
1. structural floor and any required falls formed in an engineered substrate;
2. waterproofing membrane, upstands and sealed penetrations;
3. floor finish with suitable wet-slip performance and cleanability;
4. wall/floor junction, door threshold and transition to adjacent dry area;
5. floor drain and trap detail only where designed;
6. pipe sleeves and fire-stopping at compartment boundaries;
7. access panels that do not compromise waterproofing or fire separation;
8. acoustic isolation of soil/waste stacks and equipment;
9. leak detection and shutoff strategy where required by the risk assessment.

Do not assign membrane thickness, slope, threshold height, floor build-up or fire rating from the 3D scene. The final detail requires coordinated architectural, structural, plumbing, accessibility and fire review.

## 9. Candidate equipment / fixture schedule

The companion CSV contains a structured schedule for WC pans, basins, taps, flush valves/cisterns, hand dryers or paper dispensers, accessible fixtures, assistance call, floor drains, cleanouts, leak sensors, valves, meters and ventilation. Quantities and product models remain blank.

For every selected item, record:
- stable asset/fixture ID and room/zone ID;
- type, manufacturer/model and technical data;
- water supply (cold/hot), design flow and pressure;
- drainage connection and discharge characteristics;
- electrical input, voltage, protection and duty if applicable;
- mounting/clearance/accessibility requirements;
- cleaning and maintenance instructions;
- replacement access and expected service life;
- evidence state and reviewer.

## 10. Water balance and load calculation method

Prepare separate schedules:
- cold potable water: daily volume and peak flow;
- hot-water draw: daily volume, temperature profile and thermal energy;
- sanitary wastewater: discharge profile by fixture group;
- cleaning water: separate operational allowance;
- ventilation: supply/extract airflow and fan energy;
- electrical: lighting, dryers, controls, pumps and local fans;
- leakage scenario: detection, isolation, alarm and response.

Calculate demand from actual fixture models, quantities, use rates, occupancy and coincidence method. Record source and assumptions. Do not infer daily volume from a notional occupancy or invent a diversity factor.

## 11. Failure modes and safe response

| Event | Detection / indication | Safe response concept | Design evidence required |
|---|---|---|---|
| Leak at fixture or pipe | Leak sensor / inspection / abnormal meter flow | Isolate affected branch, notify staff, preserve unaffected zones | Sensor locations, valve access, isolation boundary, test |
| Blocked drain | Slow drainage / level alarm where justified | Close affected fixture, maintenance response; avoid overflow | Hydraulic check, cleanout access, maintenance plan |
| Sewer odour | User report / inspection / possible pressure issue | Inspect trap, venting and pressure balance | Trap and vent design, commissioning |
| Exhaust fan failure | Fan status / airflow proving / alarm | Notify operator, restrict affected zone if necessary | Fan redundancy decision, alarm and operational procedure |
| Loss of power | Local status | Emergency lighting and life-safety functions follow building design; close or restrict zone if hygiene/safety cannot be maintained | Electrical schedule, backup and FLS interface |
| Assistance call | Local call device | Route to staffed response point; acknowledge and dispatch help | End-to-end witnessed test and response SOP |
| Water quality issue | Lab result / supplier notice | Isolate affected supply and follow public-health procedure | Sampling points, isolation and flushing procedure |
| Fire / smoke condition | Building fire detection | Fire strategy takes priority; HVAC mode and doors follow approved cause-and-effect matrix | Fire engineering, approved cause-and-effect, integrated test |

## 12. Operations and hygiene plan

Before operation, the owner/operator must define:
- cleaning frequency by fixture and surface;
- cleaning chemical compatibility with finishes and seals;
- replenishment of soap, paper and consumables;
- daily inspection and out-of-service tagging;
- water-quality sampling and flushing where required;
- preventive maintenance for taps, flush devices, traps, fans, dampers, sensors and alarms;
- response times for leaks, blockages, odours and assistance calls;
- records for cleaning, inspections, incidents, repairs and commissioning;
- a temporary accessible alternative if W-01 or a required fixture is unavailable.

The promise of free access does not remove the need for staffing, consumables, cleaning, maintenance and operating budget.

## 13. Regulatory basis to verify for the actual project

Preliminary Russian Federation reference set, checked against official / specialist public registers on 26 November 2026:
- СП 30.13330.2020 — Внутренний водопровод и канализация зданий; official register lists it as active and shows amendments 1–5.
- СП 60.13330.2020 — Отопление, вентиляция и кондиционирование воздуха; official register lists it as active and shows amendments 1–6.
- СП 59.13330.2020 — Доступность зданий и сооружений для маломобильных групп населения; official register lists it as active and shows amendments 1–4.
- СП 7.13130.2013 — Отопление, вентиляция и кондиционирование. Требования пожарной безопасности; public legal text lists amendments 1–3.
- Applicable sanitary rules, fire-safety regulations, electrical rules, building occupancy and public-building requirements must be added to a project-specific code matrix.

This is a reference list, not a clause-by-clause compliance assessment. Confirm the current mandatory/voluntary status, amendments, referenced documents and applicability with the project code consultant before design approval.

## 14. Open inputs and decision gates

| Gate | Required input | Output |
|---|---|---|
| G1 — occupancy | Expected users by hour/day, peak events, visitor groups, staff | Design population and fixture demand basis |
| G2 — room brief | Number/type of WCs, basins, accessible rooms, privacy and family-care requirement | Approved room data sheet |
| G3 — geometry | Dimensioned plan, levels, door swings, accessible route and shaft positions | Coordinated architectural plan |
| G4 — utilities | Water pressure/quality, sewer invert, connection point, central DHW/HVAC concept | Utility conditions and system boundary |
| G5 — engineering | Fixture models, flow, hydraulic calculations, ventilation and electrical schedules | Calculated system designs |
| G6 — safety | Fire compartments, cause/effect, electrical wet-zone design, accessibility review | Reviewed design and risk closure |
| G7 — verification | Waterproofing mock-up, leak test, drainage test, ventilation balancing, alarm test | Test records and approved status |

## 15. Current conclusion

W-01 is now defined as a coordinated wet sanitary module with clear functional zones, separate potable/hot-water and wastewater paths, a dedicated sanitary exhaust strategy, wet-area construction requirements, local isolation, accessible assistance and operational procedures. It remains **M0 / proposed / not calculated**. The next numerical step requires a dimensioned room plan, occupancy profile, fixture schedule, water pressure/quality and sewer invert levels.
