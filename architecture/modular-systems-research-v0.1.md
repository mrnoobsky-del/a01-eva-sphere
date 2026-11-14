# A-01 Modular Systems Research — v0.1

**Scope:** concept-level design brief for the interchangeable dome shell, interior digital sky, waste logistics and underground data-centre zone. This is not a construction specification.

## 1. Architectural decomposition
Keep four layers distinct: (1) primary frame and foundations; (2) continuous inner environmental envelope; (3) replaceable external cassettes; (4) independent interior digital-sky sectors. A cassette failure must not compromise the frame, inner envelope or neighbouring occupied spaces.

## 2. Geometry
The current 3D scene is illustrative and its coordinate units are not metres. Before sizing components, fix site datum, dome plan radius/rise, floor elevations, structural nodes, cassette boundaries, service clearances, openings and egress routes in one master model. Rationalize repeatable cassette/node families; calculate curvature, edge lengths, gasket lengths, tolerances, access clearances and structural opening conditions.

## 3. Preliminary material direction
| Component | Candidate direction | Must be verified |
|---|---|---|
| Primary ribs/rings/nodes | Protected structural steel | Grade, sections, buckling, fatigue, fire, corrosion, seismic details and foundations |
| Secondary cassette rails | Aluminium extrusion or protected steel | Deflection, thermal movement, bearing, galvanic isolation and pull-out |
| Base white-gloss cassette | Replaceable metal-faced or tested composite cassette | Fire/smoke, UV, impact, water shedding, coating life, cleaning and repair |
| Premium cassette | Same interface; optional matte/pearl/graphite finish, PV or roof module | Coating life, solar gain, glare, maintenance and lifecycle cost |
| Transparent zones | Insulating glass or engineered ETFE cushion where justified | Thermal performance, condensation, impact, pressure, seals and access |
| Seals | Replaceable EPDM or compatible silicone | Compatibility, compression set, UV/ozone, temperature and service life |
| Fasteners | Standard corrosion-resistant bolted hardware; stainless grades may be evaluated | Exact grade, diameter, count, preload, washers, isolation, fatigue and tests |

Finish is a design choice, not a social rank. Do not derive bolt size/count, member thickness, weld size or anchor capacity from a rendering. Those depend on real load paths, wind/snow/seismic cases, fatigue, materials and connection tests.

## 4. Interchangeable cassette mechanism
Proposed cycle: identify and isolate; check weather and exclusion zone; attach independent service cradle and secondary fall arrest; release captive positive locks; translate outward on guided rails; transfer to a braked carriage/hoist; lower to a protected service bay; inspect seals, drainage, bonding and connectors; reinstall and recommission. No free drop, single-point retention or cloud-only emergency control. The inner environmental envelope stays closed. Prototype one full-size cassette at ground level first.

## 5. Interior digital sky
Treat display sectors separately from the exterior shell. Each needs a stable ID, geometric bounds, calibration profile, replaceable tile group, rear service access, isolated connectors, thermal monitoring and fallback image. Keep emergency signage and wayfinding legible; provide brightness and reduced-motion controls.

## 6. Waste logistics
Preferred first concept: a closed waste alcove per floor, separated streams, sealed washable cassettes and a dedicated fire-compartmented service lift to a lower transfer room and external collection dock. Keep waste out of passenger circulation. Provide fill sensing, wash-down, odour control, pest protection, spill management and manual fallback. Pneumatic collection is an alternative for larger deployments, but adds pipework, plant, cleaning, blockages, maintenance and energy use; gravity chutes are not the preferred starting point.

## 7. Underground data-centre zone
Underground does not automatically mean safer or cooler. Site selection requires geotechnical, groundwater and flood studies. Do not place live racks below the design groundwater/flood level without a qualified engineered strategy. Consider a compartmented technical level near the service core with a separate replacement route.

Functional blocks: compute, storage/network; utility distribution; UPS and separated battery room; CDUs and separated facility/technology fluid loops; leak detection/isolation; heat rejection; diverse fibre routes; safe access and local controls. For dense AI racks evaluate direct-to-chip liquid cooling; cool residual room heat separately. Heat recovery is possible only where temperature, demand and reliability match. Track PUE, WUE, ERE and CUE; do not promise targets before load and site are known.

Underground safeguards: waterproofing and protected penetrations; compartmented drainage and redundant sump pumps/alarms; leak sensing; no unprotected water lines over racks; fire separation, safe egress, smoke control, independent power/cooling paths and local operation during network loss.

## 8. Required engineering packages
- Geometry, occupancy, areas and accessibility.
- Structural loads, wind/snow/seismic cases, frame/node/anchor sizing and foundations.
- Cassette mass/centre of gravity, actuator/hoist force, rail/brake/lock design, fatigue and fall arrest.
- Thermal envelope: U/R values, Rsi/Rse, vapour/condensation, thermal bridges and air/water tightness.
- Fire strategy, compartments, smoke control, egress.
- Waste volume/throughput, lift cycle, storage and vehicle dock.
- Data-centre load, rack density, cooling P&ID, power single-line, redundancy and flood design.
- Preliminary BoM, lifecycle cost, maintenance intervals and spares.

### Fastener register
Every connection needs an ID and schedule: location, joined materials, fastener grade/type, diameter/length, washer/isolator, coating, installation/preload procedure, design action, inspection interval, replacement rule and source drawing. All sizing remains TBD until calculations and tests are reviewed.

## 9. Research references
- ASHRAE, AI Data Center Integrated Design Principles: https://www.ashrae.org/technical-resources/topics-and-initiatives/ai-data-center/integrated-design-principles
- U.S. DOE/FEMP/NREL, Best Practices Guide for Energy-Efficient Data Center Design (July 2024): https://www.energy.gov/sites/default/files/2024-07/best-practice-guide-data-center-design.pdf
- Zero Waste Design Guide: https://www.zerowastedesign.org/02-building-design/d-best-practice-strategies-all-buildings/
- Envac, Pneumatic Waste Collection System: https://www.envacgroup.com/insights/step-by-step-guide-to-pneumatic-waste-collection-system/
- GitHub, Kinetic Facade Systems reference: https://github.com/Abhinavbwj/Claude-skills-for-Computational-Designers/blob/main/skills/facade-computation/references/kinetic-systems.md
- Data Center Knowledge, Underground Data Centers (industry reporting): https://www.datacenterknowledge.com/data-center-site-selection/bunkers-mines-and-caverns-the-world-of-underground-data-centers

## 10. Prototype gates
1. Fix master geometry and structural grid.
2. Prototype one cassette on a ground-level test frame.
3. Prototype one sky sector and service access.
4. Calculate waste throughput from an explicit occupancy scenario.
5. Define IT load and availability target before sizing the data centre.
6. Obtain independent structure, façade, MEP, fire/life safety, accessibility, operations and cybersecurity reviews.

**Unresolved abbreviation:** the request mentioned “RSI”. This brief treats Rsi/Rse only as building-envelope thermal-resistance terms. If RSI means another tool, standard or index, identify it before using it as a requirement.
