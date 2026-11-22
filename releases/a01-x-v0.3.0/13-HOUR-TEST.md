# A-01 X Test Protocol: 13 Hours in the Sphere

**ID:** A01X-HWT-13H · **Version:** 0.1  
**Status:** proposed simulation protocol; not a test result for a real building

## 1. Meaning of the 13-hour window

This is a duration for testing occupancy and infrastructure. It includes changing activities, movement, food, drinking water, pauses, rest, privacy and changing visitor counts. It does **not** mean 13 hours of continuous work or inactivity for one person. The project must not promise that every person will be free of fatigue or stress. The aim is to reduce avoidable load, avoid harmful conditions and provide accessible recovery.

## 2. Synthetic participant profiles

Use non-identifying test profiles:
- a mobile visitor who alternates walking and standing;
- a visitor who requires a step-free route and frequent seating;
- a person sensitive to sound, brightness or temperature;
- a family with a child and care needs;
- a visitor who prefers low social contact and quiet rooms;
- maintenance staff performing extended tasks;
- a peak visitor group generating queues and additional heat / ventilation load.

These are load scenarios, not diagnoses. Real voluntary testing and accessibility consultation should happen separately once a safe physical site exists.

## 3. Time-window sequence

| Time | Building scenario | Checks |
|---|---|---|
| 00:00–01:00 | Arrival, orientation, distribution of occupants | Entrances, queues, wayfinding, access, microclimate |
| 01:00–03:00 | Quiet activity, work, study or waiting | Temperature, light, seating, air and visual load |
| 03:00–04:00 | Movement and short recovery | Elevators, escalators, short routes and rest points |
| 04:00–06:00 | Food service, kitchen and washroom use | Water, exhaust, odours, noise, flows and cleaning |
| 06:00–08:00 | Social activity and higher occupancy | Acoustics, CO₂ as an indicator, outdoor air and heat load |
| 08:00–10:00 | Lower activity, rest and retreat | Night lighting, quiet zones, privacy and wayfinding |
| 10:00–12:00 | Outdoor change or one equipment fault | Forecast, backup transition and fault isolation |
| 12:00–13:00 | Visitor flow declines; maintenance and recovery | Safe maintenance, parameter checks and event log |

This is a test sequence, not a visitor schedule. Drinking water, sanitation and rest remain accessible throughout.

## 4. Required observations

For each zone, preserve time series, units, sensor position/height, data quality, calibration and source:
- air and radiant/surface temperature, humidity and air speed;
- actual outdoor-air supply and exhaust, CO₂ and risk-based contaminants, PM2.5/PM10, CO and VOC where justified;
- inter-zone pressure differences and actual air-transfer direction;
- illuminance, glare and time-of-day lighting mode;
- sound levels and peaks, frequency content and reverberation by room type;
- aggregate occupancy/queues and elevator wait time;
- step-free route distance to water, seating, toilets, showers and quiet rooms;
- power, ventilation, filter, water-loop and control-system status.

Sensors are not medical devices. CO₂ is not a complete air-quality assessment; a VOC sensor does not identify every compound; a pressure reading does not establish room safety. Critical measurements need professional specification and calibration.

## 5. Fault-scenario matrix

| Scenario | Expected Sphere response | Failure condition |
|---|---|---|
| Heat and roof solar gain | Forecast, shading, cooling and local-zone protection | Unsafe limits or prolonged uncontrolled deviation |
| Cold outdoor conditions | Draft, condensation and excessive dryness control | Uncontrolled condensation or unacceptable discomfort |
| Outdoor pollution | Engineered intake/filtration mode and monitoring | Contaminants exceed project limits |
| Peak occupancy | Outdoor-air response within design bounds and queue management | Overcrowding, blocked routes or ventilation non-compliance |
| Ventilation unit failure | Isolate fault, use approved backup and notify operator | Required conditions lost without timely detection |
| Shower humidity spike | Exhaust, dehumidification and condensation control | Moist air migrates to dry zones or mould conditions develop |
| Elevator outage | Detect, offer accessible alternative and staff assistance | A person is deprived of necessary access or service |
| Grid power loss | Backup for designated loads and safe local control | Critical function lost without planned safe transition |
| Network/cloud loss | Local controllers and manual mode continue | Essential functions depend on cloud AI |
| Bad/stale sensor | Quality check, redundant evidence and safe fallback | Unsafe decision based on invalid data |
| Filter/pump/valve failure | Detect, constrain mode, maintain and use designed redundancy | Undetected fault propagates to other zones |
| Fire/smoke | Independent certified systems and evacuation plan | AI interferes with protection or overrides procedure |

Fire, smoke, evacuation, elevator safety circuits and emergency power require separate design and qualified verification under applicable rules. This protocol records their boundary conditions only.

## 6. Acceptance criteria without invented thresholds

Numerical limits depend on site, climate, room function, country and applicable standard edition. This protocol does not establish universal limits for temperature, CO₂, sound, illuminance or pressure.

The run passes only when:
1. Applicable life-safety and regulatory requirements are met in every occupied zone.
2. Deviations have recorded duration and magnitude; critical failures cannot be offset by good scores elsewhere.
3. Each level has a continuous accessible route to essential services; single-elevator failure and evacuation are tested separately.
4. Water, toilets, seating, drinking points and recovery areas remain accessible.
5. Air, temperature, light and sound are evaluated by zone and duration, not only as building averages.
6. Sensor faults, network loss, power loss and equipment failures enter a defined degraded mode.
7. AI commands are bounded, logged, reversible and cannot bypass independent protection.
8. Measurement quality, calibration, uncertainty and missing data are visible.

## 7. Report metrics

Do not publish one overall score. Report:
- share of occupied time each zone met its mandatory criteria;
- deviation duration, maximum and recovery time;
- sensor data quality and availability;
- actual outdoor-air flow and filter status by zone;
- vertical atrium thermal profile;
- elevator wait time and accessible route length;
- distance to seating, water and sanitation;
- noise and speech privacy by room category;
- energy impact of each adjustment;
- faults, false alarms, manual interventions and successful rollbacks.

## 8. Evidence maturity

- **T0 — Concept:** scenario described; no calculation.
- **T1 — Analytical model:** calculations with recorded assumptions.
- **T2 — Simulation:** repeatable run with source files preserved.
- **T3 — Hardware-in-the-loop:** emulated controller/interface tests.
- **T4 — Site verification:** calibrated instruments and commissioned BMS in a built facility.
- **T5 — Operational validation:** repeated measurements, maintenance, voluntary feedback and independent review.

v0.3.0 records the protocol and is at T0 for this integrated scenario. It does not prove that a real building is suitable for 13-hour occupancy.
