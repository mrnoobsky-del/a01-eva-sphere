# A-01 — A01-CV-01: Crown Ventilation Engineering Specification
**v3.7.5 documentation package · EN · 21 November 2026**

> **Status:** engineering requirements and conceptual architecture. This is not an HVAC construction design, smoke-control calculation, structural design, equipment procurement specification or installation authorization. The v3.7.0 digital modes and calculator are demonstrators.

## 1. Purpose and boundaries

A01-CV-01 is intended to manage upper-dome air exchange and remove excess heat without uncontrolled ingress of rain, snow, dust, smoke or outdoor air under unsuitable conditions.

The existing digital-twin concept contains 24 adjustable crown louvers, a lifting rain hood, six visual exhaust fans, an internal exhaust ring, three conceptual exhaust connections, and normal, night-purge, winter and visual fire/smoke scenarios.

These elements do not establish real airflow capacity, weather tightness, storm resistance, fire performance or smoke-control suitability. The louver and fan counts are demonstrator geometry, not approved equipment selection.

## 2. Functional separation

Design separate functional paths for:
1. **Normal ventilation:** hygienic outdoor air and contaminant removal by zone.
2. **Heat rejection / night purge:** use of cooler outdoor air only when weather and operating conditions permit.
3. **Winter protection:** control infiltration, freezing, condensation and icing while maintaining required ventilation through separately designed means.
4. **Rain/snow/wind protection:** hood, louvers, drainage and weather interlocks.
5. **Fire strategy:** separately engineered detection, smoke management and make-up air. It is not an ordinary ventilation mode and must not depend on Eva, cloud services or the user app.

One louver/fan configuration must not be assumed suitable for all five functions.

## 3. Airflow architecture and interfaces

Before equipment selection, confirm:
- outdoor-air intake locations and distribution to occupied zones;
- rooms/volumes connected to the crown exhaust ring;
- vertical shafts and horizontal collectors;
- prevention of short-circuit flow between nearby supply and exhaust openings;
- make-up air strategy without excessive depressurization;
- interfaces with atrium, lifts, vestibules, sanitary areas, kitchens, server room and technical spaces;
- safe access for cleaning filters, louvers, actuators, fans and drains.

Prepare a separate airflow diagram for each operating mode. For each room, document use, design occupancy, heat/moisture/odour sources and pressure relationship to adjacent zones.

## 4. Proposed sensors and monitoring points

| Tag | Measurement / location | Purpose | Limitation |
|---|---|---|---|
| CV-T/RH | indoor/outdoor temperature and RH at representative heights | thermal and moisture state | protect from sun and local jets |
| CV-CO2 | occupied-zone CO₂ | ventilation-demand indicator | not a substitute for all contaminant or hygienic calculations |
| CV-PM | outdoor and selected indoor PM2.5/PM10 | dust/smoke and filtration indication | requires maintenance and correct placement |
| CV-DP | zone, filter and duct differential pressure | balance, filter loading, door/vestibule effects | ranges and points follow design |
| CV-AIR | duct/section airflow or velocity | actual flow verification | requires a suitable flow profile |
| CV-WX | wind speed/direction, precipitation, outdoor temperature | weather constraints | critical interlocks need plausibility checks/redundancy |
| CV-LVR | each louver and hood position | actuator feedback | command is not proof of position |
| CV-FAN | current, speed, vibration and fan status | operating and fault diagnostics | select to match equipment |
| CV-ICE | surface/actuator temperature and icing indication | winter protection | do not rely on one sensor |
| CV-COND | water/condensate in trays and low points | leakage and frozen-drain protection | requires verified slope and cleaning access |

CO₂, PM and comfort sensors are not fire detectors. Fire detection and control circuits belong to a separate certified design.

## 5. Operating modes and priorities

### 5.1 Normal
- Airflow is set by room use, design occupancy, hygienic requirements and supply/exhaust balance.
- CO₂ may trim outdoor-air demand only within an approved control strategy.
- Monitor temperature, humidity, outdoor-air quality, pressure differences, airflow and filter condition.
- Crown opening is permitted only with a verified make-up-air path and weather limits.
- On sensor failure, use a pre-engineered limited mode rather than optimizing from invalid data.

### 5.2 Night purge
- Permit only when outdoor temperature, humidity, air quality, wind, precipitation and envelope conditions are acceptable.
- Check indoor temperature/heat load, outdoor enthalpy or another designer-selected metric, and a safe exhaust path.
- Include noise, access security, rain, insects/dust and overcooling limits.
- Provide a schedule, maximum duration and immediate stop conditions.
- Loss of a critical weather sensor blocks purge or invokes a conservative project-defined mode.

### 5.3 Winter
- Control louvers and hood using wind, snow, outdoor temperature, humidity, surface temperature and confirmed position.
- Provide condensate drainage, protection/heating of critical components where justified, drain paths without water traps and access for ice removal.
- Closing the crown does not automatically satisfy ventilation requirements; a separately calculated ventilation path is required.
- Power-loss closure is only a design target if physically achievable. Verify stored energy or mechanical return, position feedback and manual recovery.
- De-icing must not create hazardous temperatures for seals, coatings, cables or maintenance staff.

### 5.4 Fire / smoke
- The digital-twin fire animation is not a calculation, smoke-control system or proof of performance.
- A fire specialist must separately design detection scenarios, zones, smoke reservoirs/layers, escape routes, pressurization, make-up air, dampers, fans, power and manual controls.
- Provide an approved cause-and-effect matrix covering fire signal, fan failure, loss of mains/control power, louver position, sensor failure and fire-service control actions.
- Fire commands require an independent control path and must not depend on Eva, phone, cloud, ordinary BMS or user network.
- Normal/night-purge/winter modes must be safely overridden by the approved fire logic. Do not impose a universal “open everything” or “close everything” rule.

## 6. Control, interlocks and safe states

Proposed path: sensors → local climate controller → actuators/fans → independent feedback. Cloud analytics and Eva may display permitted data and recommendations but must not be the sole control loop.

Requirements:
- local operation without internet;
- sensor plausibility, range and freshness checks;
- detection of command/actual-position mismatch;
- fan start limits and actuator duty-cycle limits per manufacturer;
- prevention of conflicting commands;
- maintenance lockout preventing unexpected start;
- physical emergency stop where required by risk assessment;
- manual control and documented recovery;
- event log containing command, reason, outcome, feedback and logic version.

Define safe state per asset. Louvers, hood, fans and drains may require different responses depending on wind, fire, icing, evacuation and power loss. A generic crown-close command must never override fire strategy.

## 7. Required engineering calculations

Before selecting fans or opening sizes, obtain:
1. Site climate file and seasonal outdoor design conditions.
2. Dome geometry, zone volumes, opening areas and actual louver free area at each angle.
3. Louver/hood discharge coefficients from manufacturer data or tests.
4. Resistance of ducts, shafts, grilles, filters, bends, transitions and exhaust ring.
5. Wind pressures and surrounding terrain/building effects.
6. Room heat/moisture gains, occupancy and schedules.
7. Required outdoor-air rates by room and pressure balance.
8. Fan selection at the duty point, including noise, efficiency, control range, temperature rating and redundancy.
9. Hygrothermal analysis of condensation, icing, drying and drainage.
10. Separate smoke-control/evacuation analysis if that function is part of the concept.
11. Acoustic and vibration/noise-transmission analysis.
12. Failure analysis and maintenance-access review.

Record source, SI units, uncertainty range, model version and reviewer for every calculated value. Existing v3.1.6/v3.7.0 equations may remain scenario indicators only until independently validated.

## 8. Testing and acceptance gates

**CV-S0 — survey and design basis:** site, climate, geometry, rooms, occupancy, contaminant and heat sources.

**CV-S1 — engineering model:** flow balance, resistance, wind, hygrothermal state and noise; sensitivity and edge-case checks.

**CV-S2 — sensor/actuator bench:** calibration, communication loss, open/short circuit, jammed actuator, false position, fan failure and power recovery.

**CV-S3 — crown mock-up:** rain, snow/icing under a defined test method, drainage, weather tightness, vibration, service access and manual recovery.

**CV-S4 — HVAC commissioning:** measured airflow, zone balancing, noise, filtration, pressure, night purge and winter limits.

**CV-S5 — separate fire-system tests:** only against an approved fire design, with an independent specialist and prescribed procedures. A successful visual scenario is not an acceptance criterion.

Acceptance requires measured flows to meet the approved design; actuator positions independently confirmed; defined response to sensor/communication failure; no prohibited command conflicts; safe maintenance; effective condensate drainage; and separately verified independent fire systems.

## 9. Phone and Eva integration

The phone may display mode, air quality, temperature/humidity, filter condition, louver position, fan status and diagnostics only when those values are actually available and timestamped.

Residents may change only permitted comfort settings in their own zone. Operators see aggregated metrics and alarms. Engineers receive diagnostics and service procedures. Night purge may be requested only through the local controller after condition checks. Fire commands, interlock bypass and forced crown movement are prohibited from the user app.

Eva must distinguish “recommended”, “requested”, “command issued” and “physically confirmed”. Unknown state must be reported as unknown.

## 10. Open decisions

Site and climate data, geometric elevations/areas, louver and hood characteristics, actual fan type/size/count, duct routes, required flows, operating pressures, noise limits, actuator forces, backup power, fire strategy and applicable codes remain undefined. These require project inputs and calculations; this specification assigns no numerical setpoints.

## 11. Related documents

- `A01-GW-01-CV-01-v371.md` — v3.7.1 Crown/Gull-wing safety refinement.
- `A01-INTEGRATION-MATRIX-v373.md` — overall engineering integration matrix.
- `A01-SEC-01-DEVICE-CONTROL-SPEC-v374.md` — secure phone-based device control.
- `STATUS-AND-EVIDENCE.md` — maturity and evidence rules.

**Final status:** expanded engineering requirements specification. Physical system not implemented; calculations not verified; no code compliance is claimed.