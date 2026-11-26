# A-01 — Engineering Baseline for Reference Modules S-01 / W-01 / R-01

**Document ID:** A01-MOD-ENG-BASE-001  
**Revision:** 0.1  
**Date:** 26 November 2026  
**Status:** preliminary engineering coordination baseline; not a design calculation, approved equipment schedule, construction document or BIM deliverable.  
**Parent basis:** A-01 Design Basis v1.0; A01-MOD-01; EV-ENERGY-02; EV-ENERGY-03.

> This baseline links three representative functions to the A-01 systems taxonomy and to a starter load register. It intentionally does not invent dimensions, areas, occupancy, equipment quantities, power, heat demand, water flow, autonomy duration or fire ratings. Empty and TBD values are engineering inputs to be obtained, not defects to be filled with guesses.

## 1. Purpose and scope

Create three reference profiles that can later be adapted to the remaining conceptual modules:

| Reference profile | Spatial ID | Current function | Module family | Candidate package |
|---|---|---|---|---|
| **S-01 — dry service** | A01-L00-D01 | Welcome / reception desk | S | CORE + DRY |
| **W-01 — wet sanitary** | A01-L00-D04 | Public sanitary rooms | W | CORE + WET |
| **R-01 — residential** | A01-L03-D01 | Apartment 01 | R | CORE + HABITAT |

These are representative assignments for coordination, not approved final room allocations. The 60 Spatial IDs remain the stable conceptual identifiers. The physical layout may later merge, split or resize functions; changes must preserve the identifier history and add a traceable mapping.

**W-01 boundary:** the selected anchor is the sanitary-room function A01-L00-D04. Showers/changing rooms A01-L00-D06 are a related W-family variant, but their hot-water, drainage, humidity, occupancy and equipment profiles must be scheduled separately. Do not silently treat W-01 as both a toilet block and a shower block.

**R-01 boundary:** Apartment 01 is the residential reference. Guest apartments and other dwellings may reuse the profile only after checking occupancy, area, kitchen, bathroom, accessibility and equipment differences.

## 2. Source hierarchy and assumptions

1. **A-01 Design Basis v1.0** governs five conceptual levels L00–L04, 60 modules and the requirement not to freeze area, depth, scale or system capacity before site and engineering inputs exist.
2. **EV-ENERGY-02** provides the 60 Spatial IDs and functional names. The page states that all 60 are planned/demo, not physical, not orderable, with area and calculated load undefined; its catalog still needs comparison against the latest Wix v4.0.7 export.
3. **A01-MOD-01** defines module families S/W/F/R/T/P, CORE/DRY/WET/FOOD/HABITAT/TECH/OFFGRID packages, autonomy classes M0–M4 and the Utility Dock principle.
4. **EV-ENERGY-03** defines the load-record fields and the method for installed power, demand, coincident maximum, energy, heat and reliability. It explicitly forbids assigning numerical values without equipment, schedules and source data.
5. **A01-MOD-S-001** is a visual 3D reference for the dry S-family. Its radii (5.08 and 6.98), sector angle (~21.97°), height (2.72) and all other coordinates are visualization units, not metres. Do not reuse these values as building dimensions or copy them to W-01/R-01.

### Current evidence state

| Item | State |
|---|---|
| Spatial IDs and conceptual functions | documented in EV-ENERGY-02 |
| S-01 visual prototype | prototype; geometry not calibrated to metres |
| W-01 engineering profile | proposed in this document; no physical model |
| R-01 engineering profile | proposed in this document; no physical model |
| Areas, dimensions, occupancy | unknown |
| Equipment quantities and manufacturers | unknown |
| Electrical and thermal loads | unknown / not calculated |
| Water demand and wastewater flow | unknown / not calculated |
| Fire compartments, egress and ratings | unknown / require fire strategy |
| Autonomy | M0 conceptual only |
| Mobility | no mobility claim; candidate P0 stationary until separately assessed |

## 3. Shared module architecture

All three profiles use the same five-layer concept from A01-MOD-01:

1. **Structural chassis:** independent load path to designed supports; no accidental structural dependence on adjacent modules.
2. **Envelope:** inner-Sphere and external-site conditions must be distinguished. Weatherproof external panels are not assumed to exist in the current S-01 model.
3. **Functional core:** replaceable equipment and fit-out, controlled by the room use and occupancy.
4. **Service spine:** accessible local panel, isolation, metering, controller, sensors and serviceable valves/filters where required.
5. **Utility Dock:** identified connection zone on the service side, outside public circulation where practicable.

The common interface family is: **POWER, DATA, WATER, DRAIN, THERMAL, HVAC/AIR, FIRE/ALARM, SERVICE**. These are interface names only. Voltage, phase, current, connector, pipe diameter, pressure, flow, temperatures, protocol, IP/IK class, fire rating and physical position remain TBD until engineering design.

### 3.1 Common interface rules

- Every incoming utility has an identified isolation point, label, asset ID and safe maintenance procedure.
- Electrical export or bidirectional operation is not permitted by implication; it requires a designed and authorized protection, anti-islanding and synchronization scheme.
- Potable water, technical water, greywater, blackwater, kitchen waste, rainwater and condensate remain separate streams until a permitted engineered process establishes otherwise.
- Heating/cooling interfaces require an agreed energy carrier and supply/return conditions; no quick-disconnect refrigerant loop is assumed.
- Data loss or cloud failure must not disable local safe operation.
- Fire/life-safety detection and controls are local and code-designed. Eva/Orion may display status or advise staff, but do not become the sole controller of fire, doors, lifts, isolation or evacuation.
- Utility Dock connections must not obstruct an accessible route, escape route, inspection clearance or equipment replacement path.

## 4. Reference card S-01 — dry service module

**Profile ID:** A01-MOD-S-001  
**Spatial anchor:** A01-L00-D01 — Welcome / reception desk  
**Family / package:** S / CORE + DRY  
**Water class:** W0 as the default candidate; W1 only if an actual handwash or drinking-water point is added.  
**Autonomy:** M0.  
**Mobility:** not established; stationary installation assumed for this reference profile only.

### 4.1 Functional brief

Reception, visitor orientation, staffed information, optional ticket/POS terminal, local communications and a small service workspace. Confirm whether the room also includes storage, parcel handling, security screening or accessible automatic doors before equipment is scheduled.

### 4.2 Candidate system interfaces

| System | Interface | Requirement at this stage |
|---|---|---|
| STR / ARC | Chassis, floor, partitions, service access | Structural and room geometry TBD; keep accessible clearances and public circulation independent |
| ENE | POWER | Dedicated protected local distribution and metering; circuit groups TBD |
| ICT | DATA | Local network, POS and communications; topology and cybersecurity zoning TBD |
| HVA | HVAC/AIR + optional THERMAL | Comfort heating/cooling and ventilation by occupancy/heat-gain calculation; central/local arrangement TBD |
| FLS | FIRE/ALARM | Detection, alarm and emergency interfaces under the whole-building fire strategy |
| WAT | WATER/DRAIN | Not required by default; add only for a defined sink or drinking-water service |
| OPS | SERVICE | Accessible panel, isolation, labels, filter/terminal access and asset record |

### 4.3 Candidate load groups

- ENE: general/local lighting; POS/workstation/display; service sockets; optional automatic door or assist device.
- ICT: network switch/router, access terminal, payment/communications devices.
- HVA: ventilation and comfort conditioning attributable to this module. If a central AHU/plant serves it, the central plant is recorded once in the central-plant register, not duplicated as a local motor load.
- FLS: local detection/alarm devices and any required emergency communication interface.
- WAT: optional only after a water fixture is approved.

### 4.4 Layout and maintenance rules

Place the service spine on the non-public/service side where possible. Keep staff access to the local distribution board and communications cabinet without entering restricted plant or blocking the desk. Allow replaceable POS/network equipment, cable separation, ventilation of cabinets and documented access clearances. Do not place batteries, fuel equipment or power converters in the service wall by default.

### 4.5 Inputs required before calculation

Desk and equipment schedule; number of staff and visitor profile; working hours; lighting brief; POS/network datasheets; plug-load inventory; HVAC zoning and central-plant allocation; accessible door/assist equipment if present; fire strategy and room plan.

## 5. Reference card W-01 — wet sanitary module

**Detailed development:** see [A01-MOD-W01-SANITARY-ENGINEERING-01](A01-MOD-W01-SANITARY-ENGINEERING-v0.1_RU.md) and [W-01 fixture schedule](A01-MOD-W01-FIXTURE-SCHEDULE-v0.1_RU.csv).

**Profile ID:** A01-MOD-W-001  
**Spatial anchor:** A01-L00-D04 — Public sanitary rooms  
**Related W-family variant:** A01-L00-D06 — Showers and changing rooms (separate equipment and demand schedule).  
**Family / package:** W / CORE + WET  
**Water class:** W3 candidate for an intensive sanitary use; confirm after fixture and operating schedule are known.  
**Autonomy:** M0.  
**Mobility:** not established; stationary installation assumed.

### 5.1 Functional brief

Accessible and standard sanitary facilities, washbasins, hand drying, cleaning/maintenance access and user assistance as defined by the final room program. Fixture count, cubicle arrangement, accessible room count and simultaneous occupancy are all TBD.

### 5.2 Candidate system interfaces

| System | Interface | Requirement at this stage |
|---|---|---|
| STR / ARC | Wet-room floor, partitions, thresholds and supports | Loads, waterproofing build-up, falls and accessible turning/transfer clearances require plans and specialist review |
| ENE | POWER | Lighting, hand dryers, controls, local pumps if present, assistance/alarm devices; circuit count TBD |
| WAT | WATER | Potable cold water; hot-water source/recirculation strategy TBD; backflow protection and isolation |
| WAT | DRAIN | Separate sanitary waste and basin/greywater lines as required by design; gravity feasibility, venting and cleanouts TBD |
| HVA | HVAC/AIR | Dedicated extract and make-up air strategy; humidity/odour control; flows and pressure relationships calculated from room use |
| THERMAL | Optional | DHW heat may be central or local; account thermal energy and electrical/gas input in their own source/plant records |
| FLS | FIRE/ALARM | Detection, alarm, compartment penetrations and accessible call-for-help interfaces as required by fire strategy |
| OPS | SERVICE | Leak isolation, cleanouts, filter/valve access, maintenance route and water/electric isolation |

### 5.3 Candidate load and flow groups

- ENE: lighting; hand dryers; local controls; optional assistance-call equipment; local booster or sewage pump only if physically installed in this module.
- HVA: sanitary extract fan if local; otherwise record fan power at central AHU and allocate airflow/energy without duplicating equipment.
- WAT: cold-water fixtures; hot-water draw; basin discharge; WC/urinal discharge; cleaning water. Keep fixture flow, daily volume and peak simultaneity as separate fields.
- THERMAL: domestic-hot-water heat demand as kW(th) and kWh(th), not mixed with electrical kW. The heat generator's electrical/fuel input is recorded at the plant.
- WAT/DRAIN: wastewater flow and any lifting duty only after gravity drainage and site invert levels are known.
- FLS: detection/alarm and any required assistance call or emergency communication.

### 5.4 Wet-area safety and separation

- Waterproofing, upstands, floor falls, floor drains, thresholds and adjacent dry-room protection require a coordinated detail.
- Prevent scalding through a designed hot-water temperature-control strategy; set-points are not assigned here.
- Provide leak detection and an accessible shutoff strategy where required by the risk study.
- Separate potable and non-potable systems and protect against backflow.
- Do not assume greywater reuse. Any reuse requires treatment, quality monitoring, physical separation, permitted use and safe fallback discharge.
- Keep electrical equipment and connections out of wet exposure zones according to the electrical design and selected equipment ratings.
- Coordinate sanitary extract with odour containment, acoustic privacy, fire/smoke modes and maintainable duct access.
- Do not assume wastewater pumps: first verify gravity drainage, sewer invert, backwater level and site conditions.

### 5.5 Inputs required before calculation

Fixture schedule and accessible layouts; users per peak interval; operating hours; water temperatures; hot-water delivery and recirculation concept; pipe routes and invert levels; water pressure and quality; local/central DHW choice; extraction/make-up air strategy; waterproofing assembly; cleaning regime; emergency call and fire strategy.

## 6. Reference card R-01 — residential module

**Profile ID:** A01-MOD-R-001  
**Spatial anchor:** A01-L03-D01 — Apartment 01  
**Family / package:** R / CORE + HABITAT  
**Water class:** W2 candidate for regular domestic water use; confirm against actual kitchen, bathroom and laundry provision.  
**Autonomy:** M0.  
**Mobility:** not established; stationary residential module assumed.

### 6.1 Functional brief

A dwelling with private living/sleeping functions, sanitary facilities and domestic services. The project must state whether a kitchen, laundry appliance, storage, balcony/terrace connection and accessible/adaptable layout are included. Occupancy, bedroom count and floor area remain TBD.

### 6.2 Candidate system interfaces

| System | Interface | Requirement at this stage |
|---|---|---|
| STR / ARC | Floor, partitions, acoustics, doors and privacy | Room geometry, live loads, acoustic targets and structure TBD |
| ENE | POWER | Dwelling distribution board, metering and circuits for lighting, sockets, appliances and fixed equipment |
| ICT | DATA | Broadband/local network, intercom and optional smart-home points; local safe mode independent of cloud |
| WAT | WATER | Potable cold and domestic hot water; metering/isolation and backflow protection |
| WAT | DRAIN | Kitchen/bathroom sanitary drainage, venting, cleanouts and leak management |
| HVA | HVAC/AIR | Fresh air, extract, heating and optional cooling; zone control and acoustic limits |
| THERMAL | THERMAL | Space heat and DHW may be central or local; model thermal demand separately from electricity |
| FLS | FIRE/ALARM | Residential detection/alarm and compartment/escape interfaces determined by the full fire strategy |
| OPS | SERVICE | Maintainable filters, valves, meters, controls and accessible equipment replacement route |

### 6.3 Candidate load and flow groups

- ENE: lighting; general sockets; kitchen appliances and cooking if electric; laundry if included; fixed domestic equipment; local control/communications.
- ICT: intercom, network access point and optional smart-home equipment.
- HVA: ventilation fans or allocated central AHU; heating demand; cooling demand if provided. Do not infer demand from the 3D room volume.
- WAT: cold-water fixtures; DHW demand; kitchen/bathroom wastewater; optional laundry discharge.
- THERMAL: space-heating and DHW energy in kW(th)/kWh(th), with design conditions and schedule.
- FLS: dwelling detection/alarm and required signaling.
- Access/security: door lock/intercom/assist devices only where included by the agreed brief.

### 6.4 Indoor comfort and privacy

Coordinate acoustic separation from corridors, neighbouring dwellings, equipment and sanitary stacks. Avoid service risers through bedrooms where practicable. Provide maintainable access without entering another dwelling. Set temperature, fresh-air, humidity, lighting and acoustic criteria through the project brief and applicable standards; values are not invented here. The dwelling must retain baseline safety and accessibility regardless of optional finishes or paid upgrades.

### 6.5 Inputs required before calculation

Floor plan and calibrated area; number of residents and bedrooms; occupancy schedule; kitchen and laundry equipment; appliance datasheets; hot-water strategy; heating/cooling concept; ventilation rates and controls; acoustic/privacy targets; metering and fire strategy; accessibility/adaptability brief.

## 7. Load register linkage

The companion file **A01-MOD-LOAD-REGISTER-v0.1_RU.csv** creates candidate Load IDs for the three profiles. It is a starter inventory, not an equipment schedule. Quantities, input power, apparent power, PF, duty cycles, flow rates, thermal loads, criticality, reliability category and backup remain blank/TBD.

### 7.1 ID convention

Use `A01-Lxx-Dnn-[SYSTEM]-NNN` where:
- `A01-Lxx-Dnn` is the parent Spatial ID;
- `SYSTEM` is the A-01 system code (ENE, HVA, WAT, ICT, FLS, etc.);
- `NNN` is a sequence unique inside the parent module/system.

A load record must contain both its Load ID and parent Spatial ID. Room IDs beneath a module are created only after a real room layout is approved.

### 7.2 No double counting

- A fan, pump, heat source, BESS, UPS or server is counted where the physical asset is located.
- A module receives a measured/submetered or calculated allocation for energy use; central plant installed power is not copied into every served module.
- DHW thermal demand is not the same as the heater's electrical or fuel input.
- Electrical kW, electrical kVA, thermal kW(th), flow rate and stored energy are different quantities and must retain their own units.
- Demand and coincidence factors are applied only with a stated method and evidence; no generic factor is assigned to S/W/R.

## 8. A-01 60-module mapping

The master 60-space matrix now carries candidate reference-profile, system-code, utility-port and Load-ID-pattern fields. The mapping rules are:

- S-family modules may use S-01 as a starting pattern only after adapting their specific function (retail, reception, parcel point, office, etc.).
- W-family modules may use W-01 as a starting pattern only after distinguishing WC, shower, family-care and kitchen-adjacent uses.
- R-family modules may use R-01 as a starting pattern, with unit-specific occupancy, area and fixture differences.
- F, T and P remain unprofiled archetypes until separate food, technical and public-zone engineering cards are produced.
- All family assignments in the matrix remain candidates; they are not approved building classifications.
- Open public zones (P) are not automatically closed or transportable modules. They may be shared spatial zones served by central systems.

## 9. Required inputs and engineering sequence

### Gate 1 — architecture and room data
- Approved room data sheet for each Spatial ID.
- Calibrated plan, levels, areas, occupancy and accessible clearances.
- Use schedule: day/night, weekday/weekend, peak event, maintenance and unoccupied mode.
- Confirmed room adjacency, public/service routes and escape strategy.

### Gate 2 — equipment and loads
- Equipment register with manufacturer/model or functional specification.
- Quantity, input power, kVA, PF/cos φ, efficiency, start/inrush and variable-speed information.
- Thermal input/output and operating points where applicable.
- Water fixture units, flow, temperature, pressure and wastewater routing.
- Interval schedules and seasonal operation; apply diversity only with a justified method.
- Determine criticality A/B/C/D and statutory reliability category separately for each load; do not infer one from the module family.

### Gate 3 — coordinated engineering
- STR: load paths, supports, vibration and movement joints.
- ENE: single-line diagram, protection, selectivity, earthing, metering, fault levels and optional reserve.
- HVA: load, ventilation, humidity, acoustics, pressure relationships and smoke/fire modes.
- WAT: water balance, pressure, drainage, venting, backflow, leakage and freeze protection where external.
- FLS: fire compartments, detection, alarm, evacuation, emergency supply and service penetrations.
- ICT/OPS: network segmentation, local control, cybersecurity, alarms, maintainability and asset passport.

### Gate 4 — verification
- Specialist design review and interdisciplinary clash check.
- Full-scale wet-room junction/mock-up for W-01.
- Service-spine and Utility Dock accessibility mock-up for S-01.
- Residential acoustic/air-tightness and services mock-up for R-01.
- Functional tests, commissioning records and approved as-built asset data before moving beyond prototype.

## 10. BIM / digital-twin fields

Each module and load record should carry at least:
- Spatial ID / parent Module ID;
- ModuleType and UtilityPackage;
- AutonomyClass and mobility status as separate fields;
- system code and asset/load ID;
- local/central/external utility boundary;
- quantity, units, data source and revision;
- evidence state: unknown, assumed, proposed, calculated, reviewed, tested, approved, as-built;
- fire compartment and escape references once designed;
- maintenance access and lifecycle state;
- IFC object/element reference once a coordinated BIM model exists.

The current 3D digital twin is a conceptual viewer. Its scene geometry is not automatically a calibrated BIM, bill of quantities, hydraulic model, electrical schedule or tested controller.

## 11. Open decisions

1. Confirm the final function and equipment list of the welcome desk.
2. Confirm fixture count, accessibility layout and cleaning/operation concept for W-01.
3. Decide whether W-01 receives local or central DHW and whether gravity drainage is feasible.
4. Confirm R-01 occupancy, bedroom count, kitchen and laundry scope.
5. Set the A-01 site, jurisdiction, climate design basis and external utility conditions.
6. Select central versus local HVAC/DHW boundaries.
7. Establish fire compartments, egress routes, fire ratings and required emergency power.
8. Define which modules, if any, need M1/M2/M3/M4; current profile status remains M0.

## 12. Current conclusion

The three reference profiles and their system/load interfaces are now structured and traceable to the 60-space register. This is a useful coordination baseline, but it is not yet a set of calculated modules. The next engineering value comes from obtaining one dimensioned room plan and a real equipment schedule per profile, then calculating loads and coordinating the first Utility Dock and wet-room assembly.

**Related source documents:** A01-MOD-01; A01-MOD-S-001; EV-ENERGY-02; EV-ENERGY-03; A01-HUMAN-COMFORT-ENGINEERING; A01-FLOOR-CEILING-ENGINEERING; A01-SPHERE-STANDARD; A01-FIRE-ESS-01.
