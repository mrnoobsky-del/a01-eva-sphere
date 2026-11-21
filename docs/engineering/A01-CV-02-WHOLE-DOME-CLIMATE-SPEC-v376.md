# A-01 — A01-CV-02: Whole-Dome Climate Control System
**Documentation package v3.7.6 · EN · 21 November 2026**

> **Status:** engineering requirements and conceptual architecture. This is not an HVAC construction design, calculation package, equipment schedule, sanitary assessment or installation authorization. No numerical airflow, capacity, temperature, humidity setpoint or equipment size is specified.

## 1. Purpose and boundaries

A01-CV-02 describes the climate system for the complete A-01 complex: outdoor-air intake, floor- and room-level distribution and exhaust, heat and moisture management, filtration, heat recovery, acoustic constraints and interaction with the central atrium.

It extends A01-CV-01 Crown Ventilation. The crown is one possible upper-level element of the overall system; it is not a standalone system capable of providing the building's complete hygienic ventilation. Airflow and pressure must be reconciled in one building-wide aerodynamic balance.

Design objectives:
- provide the required air quality in every occupied zone;
- maintain design thermal and humidity conditions appropriate to each room use;
- prevent transfer of odours, moisture, smoke and contaminants between zones;
- limit drafts, noise, vibration and excessive air velocity;
- reduce energy use without compromising hygiene or operational safety;
- remain controllable during loss of internet/cloud services or individual sensors and units.

## 2. Functional architecture

Develop interconnected but locally controlled subsystems:

1. **Outdoor air and treatment:** intakes, weather protection, filters, pre-treatment and outdoor-air quality monitoring.
2. **Supply network:** air-handling units, mains, vertical shafts, floor manifolds and zone branches.
3. **Exhaust network:** public, residential, sanitary, kitchen, technical and special exhaust circuits.
4. **Thermal system:** heating, cooling, heat distribution, local regulation and overheat/freeze protection.
5. **Moisture management:** humidification or dehumidification only where justified; dew-point and surface-condensation monitoring.
6. **Heat recovery:** assessment of leakage, contaminant cross-transfer, frost, bypass and maintenance.
7. **Atrium and upper zones:** separate modelling of thermal stratification, natural/mechanical buoyancy, transfers and smoke strategy.
8. **Controls and supervision:** local controllers, independent feedback, fault states and event logging.

Do not combine all rooms into one common air circuit merely to simplify the diagram.

## 3. Room and zone classification

Prepare a room/zone register before calculations. For each entry record use, area and volume, design occupancy, schedule, internal heat gains, moisture generation, contaminants, pressure relationship, noise criteria, cleaning and maintenance requirements.

At minimum assess:
- residences and apartments;
- central atrium, galleries, viewing areas and vertical circulation;
- public plazas, lounges, waiting and rest areas;
- shops, workshops and tenant spaces;
- kitchens and food preparation/serving areas;
- toilets, showers, laundry and janitor rooms;
- server rooms, electrical rooms, battery rooms and other technical spaces;
- healthcare/care or other special rooms if included in the programme;
- vestibules, lift lobbies, stairs and egress routes.

Adjacent zones are not interchangeable. Kitchen odours, sanitary aerosols, server heat and shower moisture require separate evaluation and may require dedicated exhaust systems.

## 4. Air distribution and atrium behaviour

Prepare airflow plans and sections for every representative operating mode. Verify:
- delivery to occupied areas without supply-to-exhaust short-circuiting;
- temperature stratification through the dome and atrium height;
- warm-air accumulation below the crown and overheating of upper galleries;
- cold downdraughts from glazing and the external envelope;
- effects of entrance doors, the glass lift, vestibules and vertical shafts;
- wind pressure and stack effect;
- supply/exhaust/transfer balance when doors open;
- access to grilles, dampers, filters, shafts and equipment for maintenance.

The tall atrium requires a dedicated thermal and aerodynamic model. Do not assume uniform mixing or that floor-level temperature equals the temperature near the crown. Depending on calculations and mock-up results, evaluate variable distribution, local supply, displacement ventilation or other strategies.

## 5. Humidity, condensation and envelope

Perform hygrothermal assessment of the envelope, glazing interfaces, metal connections, thermal bridges, cassette joints and duct penetrations.

Requirements:
- assess surface temperatures and dew point across seasons and modes;
- check interstitial and surface condensation;
- provide collection and safe drainage for condensate from units, heat exchangers, pans and drain lines;
- eliminate water traps, reverse slopes and inaccessible sections;
- assess drain freezing, coil frosting and outdoor-intake icing;
- provide leak detection in critical technical areas;
- do not use higher temperature or humidity as a universal anti-condensation measure without calculation.

Humidification must not be enabled without water-quality, microbiological, sanitation and material-impact assessments. Humidification and dehumidification are separate functions with separate acceptance criteria.

## 6. Filtration and outdoor-air quality

Select filtration stages based on local pollution, room use, required air quality, filter resistance and maintenance capability. Assess:
- dust and PM2.5/PM10;
- gaseous pollutants and odours where relevant to the site;
- smoke episodes and polluted outdoor air;
- casing integrity and bypass leakage around filters;
- differential-pressure monitoring and replacement intervals;
- safe access, disposal and personnel protection during maintenance.

Recirculation is permitted only for streams and zones allowed by the design and applicable requirements. Air from kitchens, toilets, showers, janitor rooms and other contaminated spaces must not be returned to the common supply without a specific engineering justification. CO₂ sensors do not replace hygienic design calculations or monitoring of other contaminants.

## 7. Heat recovery and energy performance

Select a heat-recovery type only after assessing the air streams and contaminant-transfer risk: plate, run-around coil, rotary or another suitable arrangement. Evaluate:
- performance at design operating conditions, not only catalogue ratings;
- leakage and transfer of odours/moisture between streams;
- frosting, defrost, bypass and condensate;
- pressure drop and added fan power;
- noise, vibration, cleaning access and component replacement;
- behaviour during power or sensor failure.

Server-room or other technical heat may be considered as a supplemental source only if its temperature profile, continuity and safe heat exchange are demonstrated. It must not be treated as guaranteed heating. Prepare separate building heat balances, seasonal scenarios, peak-load calculations and a critical-load register.

## 8. Acoustics and comfort

Coordinate acoustics with the atrium and distributed-audio concept in v3.5.0. Assess plant noise, duct breakout, grilles, dampers, vibration, structure-borne noise and sound transfer between rooms through shared shafts.

Requirements:
- define acoustic criteria by room use;
- calculate duct velocities and pressure losses;
- assess grille noise at part load and maximum flow;
- provide vibration isolation, silencers and acoustic separation where justified;
- verify silencers and filters do not create unacceptable resistance;
- assess comfort in terms of air speed, local drafts and temperature non-uniformity.

## 9. Interface with A01-CV-01 and fire strategy

A01-CV-01 controls only the crown functions defined by the design: upper-zone ventilation, weather constraints and night heat removal. Its modes must be coordinated with supply-air units and the building pressure/airflow balance.

Night purge is permitted only with suitable outdoor conditions, acceptable air quality, safe wind/precipitation conditions, a verified make-up-air path and no conflict with building operation.

Fire ventilation, smoke exhaust, pressurization and make-up air form a separate strategy developed by qualified specialists. It is not a comfort-optimization mode and must not depend on Eva, phones, cloud services, ordinary BMS or the user network. Do not assign a universal all-dampers-open/closed fire position: scenario calculations, a cause-and-effect matrix and jurisdiction-specific requirements are required.

## 10. Sensors and local control

Proposed measurement groups:
- temperature and relative humidity by zone and atrium height;
- CO₂ in representative occupied zones;
- PM2.5/PM10 and outdoor-air quality as defined by the design basis;
- differential pressure across filters, ducts and critical zone boundaries;
- actual airflow at suitable measurement sections;
- damper, louvre and valve position;
- fan current, speed and vibration;
- heat-exchanger, condensate-pan and leak status;
- outdoor temperature, humidity, wind and precipitation;
- energy use of air-handling and thermal systems.

Control chain: sensor → local zone/unit controller → actuator or plant → independent feedback. Eva and the mobile application may display permitted telemetry, schedules and comfort settings. They are not the sole controller, cannot bypass interlocks and cannot control fire circuits.

Require offline local operation, range/freshness checks, command-versus-feedback discrepancy detection, event logging, maintenance mode and defined fault behaviour. Failure of one sensor must not cause uncontrolled switching across all zones.

## 11. Operating modes and safe states

Define at least:
- **Occupied:** normal operation by schedule and design occupancy.
- **Unoccupied:** reduced load in permitted zones while maintaining building protection and hygiene constraints.
- **Night purge:** coordinated with A01-CV-01 when conditions are verified.
- **Extreme weather:** outdoor-air limitation and equipment protection while preserving required ventilation.
- **Maintenance:** prevention of unexpected start and confirmation of energy isolation for serviced equipment.
- **Fault / offline:** local degraded mode with alarm, independent of cloud availability.
- **Fire / smoke:** independent engineered fire automation has priority under the approved cause-and-effect matrix.

Define safe state separately for each unit, damper, pump, heater and zone. “Turn everything off” or “close all dampers” is not a universal safe response.

## 12. Design inputs and calculation programme

Required before equipment selection:
1. Site location, climate data and design outdoor conditions.
2. Coordinated plans, sections, areas, volumes and envelope geometry.
3. Room schedule, operating hours, occupancy and user categories.
4. Heat, moisture and contaminant loads from people and equipment.
5. Thermal properties of envelope, glazing, interfaces and thermal bridges.
6. Acoustic criteria and privacy requirements.
7. Required outdoor-air rates and room-by-room pressure balance.
8. Network resistance and performance data for filters, dampers, grilles and heat exchangers.
9. Energy tariffs/constraints, available heating/cooling sources and redundancy.
10. Fire scenarios, egress concept and inputs from the separate smoke-control design.
11. Maintenance, filter replacement, access and hygiene plan.
12. Applicable jurisdictional requirements and responsible reviewers.

Calculations: zone air balances; network aerodynamics; heat and moisture balances; atrium dynamics and stratification; condensation and frosting; heat recovery; energy scenarios; acoustics; failure analysis and maintainability. Record SI units, data sources, assumptions, uncertainty ranges and independent review for every result.

## 13. Verification and acceptance stages

- **CV2-S0 — Design Basis:** confirm site, geometry, rooms, climate and operational requirements.
- **CV2-S1 — Zone Model:** room register, occupancy profiles, contaminants, heat and moisture loads.
- **CV2-S2 — Network & Loads:** calculate networks, flow, pressure, heating, cooling, recovery and acoustics.
- **CV2-S3 — Controls Bench:** test sensors, controllers, feedback, communication loss, faults and manual mode.
- **CV2-S4 — Mock-up:** representative zone and atrium section; measure velocity, temperature, humidity, noise and condensation.
- **CV2-S5 — Commissioning:** balancing, functional tests, mode verification, documentation and staff training.
- **CV2-S6 — Seasonal Verification:** repeat checks during heating and cooling seasons and after occupancy changes.

Acceptance criteria must be numerical and approved by the design team before testing. They are intentionally not assigned in this conceptual specification.

## 14. Open design decisions

- final atrium geometry and height, glazing composition and envelope properties;
- use and operating schedule of every room;
- plant-room, shaft and intake locations;
- heating/cooling topology and available energy sources;
- heat-recovery strategy and exhaust-stream separation;
- acoustic limits for residences, public areas and galleries;
- site-specific climate and regulatory basis;
- interfaces with fire strategy, lifts, vestibules and building management.

## 15. Implementation status

A01-CV-02 is a new engineering requirements specification. It does not mean that ducts, air-handling units, sensors, heat exchangers, pumps, dampers or controllers exist in the digital twin or in a physical building. No verified airflow, energy performance, hygienic suitability, acoustic performance or code compliance is claimed. The next step is to collect the project design inputs and develop a reviewable calculation model with qualified engineers.
