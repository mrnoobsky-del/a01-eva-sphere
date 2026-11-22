# Sphere Intelligence — Human-Centred Habitat Engineering Specification

**A-01 X v0.3.0 · Documentation release · 22 November 2026**  
**Status:** concept specification and verification plan; not construction documentation or a building controller

## 1. Purpose

Sphere Intelligence is the supervisory system that helps the Sphere of Eva provide a safe, accessible and comfortable environment. Android-01 inspects the space; Human Proxy profiles evaluate how different use patterns interact with it. Neither is the centre of the architecture.

The “13-hour” goal is a long-duration occupancy and infrastructure test. It includes changing activities, movement, food, water, pauses and rest. It does not promise 13 hours of continuous work without fatigue, nor a medical outcome for every person. Fatigue is a normal physiological signal; the design objective is to reduce avoidable load and make recovery accessible.

## 2. Subsystem map

| Domain | Sphere responsibility | Evidence to consider |
|---|---|---|
| AIR-01 / Air | Outdoor air, supply, exhaust, filtration and contaminants | CO₂ as one indicator; PM2.5/PM10, CO and risk-based VOC measurements; actual airflow; humidity; pressure differentials; filter maintenance |
| Climate | Thermal environment | Air and surface temperature, mean radiant temperature, humidity, air speed, activity and clothing |
| Light | Visual and daily light environment | Illuminance, glare, uniformity, flicker, daylight and justified spectral / melanopic measures |
| Acoustics | Noise, privacy and vibration | Equivalent levels and peaks, spectrum, reverberation, sound insulation, speech privacy and equipment vibration |
| Water | Drinking and technical water | Quality, temperature, stagnation, filtration, hygiene plan, maintenance and water safety |
| Movement | Circulation and access | Continuous step-free routes, elevators, wait times, distances, stairs, slopes, doors and seating |
| Sanitation | Toilets, showers and waste | Separate flows, exhaust, odour containment, acoustic privacy, dry zones, cleaning and drainage |
| Nourishment | Food and hydration | Accessible water/food, kitchen hygiene and exhaust, storage and allergen information |
| Rest & Mind | Recovery and cognitive comfort | Quiet rooms, privacy, legible wayfinding, choice, rest and avoidance of sensory overload |
| Biophilia | Plants and natural elements | Humidity, irrigation, drainage, mould, allergens, pests and separate climate control |
| Energy & Resilience | Infrastructure continuity | Energy balance, load priorities, backup, degraded modes, repairability and spares |
| Digital & Security | Digital operations | OT/IT segmentation, roles, logs, updates, backups, manual control and cyber resilience |

The ten WELL concepts (Air, Water, Nourishment, Light, Movement, Thermal Comfort, Sound, Materials, Mind and Community) provide a useful reference frame. A-01 X adds operations, accessibility, maintainability, digital safety and resilience.

## 3. Spatial and data model

Minimum hierarchy:

`Sphere → Level → Zone → Room → System → Asset → Sensor/Actuator`

Every object needs a stable ID, geometry and units, purpose, neighbouring zones, allowed operating modes, data source, measurement unit, timestamp, calibration status and maintenance owner.

For each reading store value, unit, sensor location and height, timestamp, data quality, calibration, missing/error state and provenance. A value without context or valid calibration is not proof.

Data classes:
- building and equipment telemetry;
- aggregated occupancy indicators where necessary for engineering;
- voluntary preference feedback;
- synthetic simulation profiles;
- restricted maintenance records.

By default, do not collect identifiable faces, conversation recordings, covert biometric features, emotion labels or personal medical data. Human Proxy profiles are synthetic usage scenarios, not diagnoses.

## 4. Decision hierarchy

**Level 0 — independent protection.** Certified fire alarm, smoke control, evacuation, elevator safety circuits, electrical protection and emergency interlocks. Sphere Intelligence cannot replace, bypass or disable them.

**Level 1 — local controllers and BMS.** Run approved engineering sequences within design limits and manufacturer safeguards.

**Level 2 — Sphere Intelligence.** Observe, forecast, compare options and recommend actions. Start read-only / shadow mode. Later, only narrowly scoped, bounded and logged commands may pass through an approved gateway after engineering verification.

**Level 3 — people.** Operators approve critical changes; occupants can adjust personal light, temperature or privacy preferences within safe limits.

**Level 4 — learning.** Analyse archives and simulation offline. New strategies pass regression, fault and cybersecurity tests, are compared with the baseline and are approved before deployment.

AI must not directly control fire safety, evacuation, elevator safety circuits, medical decisions or emergency power.

## 5. Supervisory loop

Observe → validate data quality → detect deviation → investigate causes and uncertainty → forecast → generate options → check hard constraints → request approval where required → execute an allowed action → verify the measured effect → log and roll back if needed.

Do not create one universal comfort score. Safety and basic accessibility are hard constraints. Comfort preferences and energy efficiency are separate objectives optimized only within the safe feasible region.

## 6. Engineering rules

### Air and pressure
CO₂ is not a universal air-quality measure. Assess outdoor-air supply, actual flow, sources, pollutants, filtration, exhaust and maintenance. Low-cost gas sensors are indicators, not substitutes for laboratory or professional measurements.

Do not intentionally raise or lower the dome’s atmospheric pressure to improve wellbeing. Pressure differences between rooms are used only for engineered airflow direction, such as containing washroom odours or technical contaminants. Verify transfer paths, door forces and emergency modes.

### Thermal conditions and the atrium
Air temperature alone is insufficient. Consider radiant temperature, humidity, air speed, activity and clothing. Model vertical stratification, roof solar gain, hot/cold surfaces, shading, local air currents, bridges and zone boundaries. Begin with zonal thermal simulation; use CFD when a simplified model cannot answer the question.

### Light
Combine daylight, task lighting, glare control and an appropriate night mode. Transitions should be gradual and user-adjustable within safe limits. Decorative violet light does not replace task lighting or evidence-based integrative lighting. Do not make medical claims about a spectrum or colour temperature.

### Acoustics and privacy
Measure average levels, peaks, frequency content, reverberation, door/floor transmission and speech privacy. Toilets, showers, rest rooms, bedrooms and technical zones need different criteria. Do not record speech for acoustic analytics.

### Movement
Elevators are the primary accessible vertical transport; escalators are supplementary and are not step-free substitutes. Stairs remain part of an independent egress design. Test queues, cabin accessibility, elevator redundancy, route width, doors, turning space, rest points and failure of one lift.

### Water, sanitation and plants
Separate potable, technical, greywater and blackwater streams through the engineering design. Consider drinking-water quality, stagnation, hot-water temperature and a Legionella water-management plan. Toilets and showers need designed exhaust, humidity control, acoustic privacy and cleaning. Hydroponics and greenhouses need separate water and climate zones; plants do not replace ventilation.

### Psychological and cognitive comfort
Provide legible spatial structure, repeating landmarks, clear signs and a choice between social activity and retreat. Do not force interaction or constant notifications. Do not infer stress or mental state from a face, voice or gait.

### Energy and maintenance
Make filters, valves, sensors, pumps and luminaires serviceable without blocking public routes. Model maintenance windows and spares. Backup claims require load, autonomy duration, fuel, ventilation and test procedures to be calculated.

## 7. Candidate digital toolchain

| Need | Candidate | Boundary |
|---|---|---|
| Energy and thermal balance | EnergyPlus / OpenStudio | Building simulation, not a live BMS |
| Daylight and lighting | Radiance | Lighting and daylight calculations |
| Complex airflow | OpenFOAM or validated CFD | Use when justified; boundary conditions and validation required |
| Navigation | Recast Navigation / NavMesh | Traversability, obstacles and links; lifts require explicit transitions |
| Acoustics | Acoustic models plus field measurement | Tool selected by the acoustic engineer |
| BIM information | IFC and IDS | Exchange of assets and machine-checkable requirements; pin schema versions |
| Operations | BMS/PLC through isolated gateway | Real interface depends on project, manufacturer and local rules |

EnergyPlus Runtime API can read sensors and set actuators **inside a running simulation**. That does not make it a direct controller for physical building equipment.

## 8. Verification gates

- **G0 Geometry:** levels, units, zones, areas and volumes are confirmed.
- **G1 Requirements:** each zone has an intended use, user profiles, modes and applicable regulations.
- **G2 Engineering:** thermal, ventilation, daylight, acoustic and water models record inputs and uncertainty.
- **G3 Simulation:** normal, peak, seasonal and fault scenarios are repeatable.
- **G4 Hardware-in-the-loop:** controller interfaces are tested with emulators, not by controlling occupants or critical infrastructure.
- **G5 Commissioning:** sensors are calibrated; BMS and protective systems are verified by qualified professionals.
- **G6 Limited operation:** shadow mode, human approval and a rollback plan.
- **G7 Operation:** maintenance, periodic retesting, change logs and feedback.

## 9. Explicit non-claims in v0.3.0

No physical sensors, BMS, HVAC, water network, elevators, fire systems or controllers are connected. Surveyed construction geometry, engineering loads, code compliance, clinical benefit, safe 13-hour occupancy and physical control have not been demonstrated. This is a specification for future work, not a certified design.
