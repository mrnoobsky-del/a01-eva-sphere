# A-01 v3.6.0 — AIR-01 autonomous atmosphere integration

**Date:** 19 November 2026  
**Parent:** integrated A-01 digital twin v3.5.0  
**Type:** experimental 3D engineering concept  
**Status:** source and UI integration complete; visual browser verification and engineering validation remain outstanding.

## Open

- [Integrated A-01 v3.6.0 — AIR-01 life-support model](eva-sphere-a01-v360-air-01-life-support.html)
- [AIR-01 engineering concept (English)](../lunar/air-01/README.md)
- [AIR-01 engineering concept (Russian)](../lunar/air-01/README_RU.md)
- [AIR-01 工程概念（简体中文）](../lunar/air-01/README_ZH.md)
- [AIR-01 mass-balance JSON](../lunar/air-01/mass-balance.json)
- [Version changelog](CHANGELOG_v360.md)

## 1. What changed

v3.6.0 adds AIR-01 as a selectable global engineering object in the A-01 scene registry:

- Object ID: `A01-AIR-01`
- Object kind: `air-system`
- Navigation entry: **AIR-01**
- Scene toolbar control: **AIR-01: show / hide**
- Engineering drawer: **AIR-01 · Autonomous Atmosphere**
- Object details card: equipment list and linked systems
- Global search: AIR-01, oxygen, ECLSS, regolith, electrolysis, CO₂ and related terms

The v3.5.0 atrium galleries, acoustic elements, shell-service node, energy centre, climate layer, waste-service system and underground data-centre concept are retained in the source. AIR-01 is an additive engineering layer, not a replacement for the existing climate or energy systems.

## 2. 3D arrangement

The model separates the process into visually distinct equipment groups.

### External resource factory
- Regolith feed hopper and enclosed feed path
- High-temperature molten-regolith-electrolysis (MRE) reactor
- Metal-bearing residue container
- Primary gas-conditioning columns
- Double-boundary product-transfer interface

### Clean ECLSS plant
- Water-treatment module
- Water electrolyser and cell-stack representation
- CO₂ sorbent beds and switching valves
- Air circulation / fine-filtration block
- Gas-composition analyser
- Sabatier reactor representation

### Storage and distribution
- Two O₂ buffer vessels
- Initial inert-gas inventory vessel (shown as a delivered inventory; no lunar nitrogen source is assumed)
- H₂ process buffer
- Water buffer
- Visually separate O₂, CO₂-return and water risers
- Ring distribution paths across conceptual levels L00–L04

The industrial MRE area is kept visually separate from the clean habitat life-support zone. Product gas is shown passing through conditioning and a transfer boundary before reaching the clean-side buffer.

## 3. Interactive display modes

The AIR-01 panel provides four display modes:

| Mode | Display intent |
|---|---|
| Full loop | External MRE, clean ECLSS, storage and distribution |
| Oxygen production | Regolith processing, gas conditioning, electrolysis and O₂ storage |
| Air recovery | CO₂ capture, Sabatier branch, water and oxygen circulation |
| Backup · MRE stopped | Isolates the external production train visually and leaves the clean-side reserve and air-recovery concept visible |

These are scene-visibility scenarios only. The selector does not control equipment, simulate chemical kinetics, establish flow rates, or prove an emergency procedure.

Animated dots indicate conceptual flow direction. They are not gas particles, telemetry, measured flow, or pressure readings.

## 4. Reference calculations shown in the panel

The panel displays the preliminary four-person planning case from the AIR-01 concept brief:

| Parameter | Planning value |
|---|---:|
| O₂ demand | 3.36 kg/day |
| CO₂ generation | 4.00 kg/day |
| Ideal water feed for O₂ electrolysis | 3.78 kg/day |
| Ideal H₂ by-product | 0.42 kg/day |
| Ideal CO₂ processed by Sabatier using that H₂ | 2.31 kg/day |
| Residual CO₂ in that ideal balance | 1.69 kg/day |

The non-zero residual is intentional. The panel must not imply a fully closed carbon or oxygen loop.

The MRE reference shown is NASA's ground demonstration: 25 kg regolith simulant, average 0.07 kg O₂/h, nine hours of operation under vacuum-relevant conditions. The panel notes 0.14 kg/h as the simple average rate needed to produce 3.36 kg/day over 24 hours. This is arithmetic comparison only, not demonstrated continuous output or a lunar operating rating.

## 5. Evidence basis

- [NASA ECLSS overview](https://www.nasa.gov/reference/environmental-control-and-life-support-systems-eclss/) — ISS water recovery, air revitalization, oxygen generation and Sabatier integration.
- [NASA NTRS 20260003760](https://ntrs.nasa.gov/citations/20260003760) — MRE ground demonstration and measured result.
- [NASA NTRS 20240013999](https://ntrs.nasa.gov/citations/20240013999) — modelled lunar MRE plant processes and mass/volume/power study.
- [NASA NTRS 20190027610](https://ntrs.nasa.gov/citations/20190027610) — lunar-base life-support logistics and crew/duration trade-offs.
- [NASA human-systems atmosphere requirements](https://www.nasa.gov/reference/6-0-natural-and-induced-environments-vol-2/) — reference for mission-specific atmosphere requirements.

## 6. Verification and limitations

### Completed in this software iteration
- Registered AIR-01 in the scene feature list.
- Added 3D conceptual equipment and distinct distribution groups.
- Added visibility modes, navigation, search entry and object details.
- Added AIR-01 state to the scene API state snapshot.
- Updated HTML version metadata to v3.6.0.
- Parsed all embedded JavaScript blocks (classic and module code) for syntax after integration.

### Not completed
- A live browser/WebGL walkthrough of the hosted v3.6.0 file.
- Mobile/desktop visual inspection on target devices.
- Validation of object scale against calibrated metres.
- Pipe diameters, pressure drops, valve sizing, tank volumes or pressure-vessel design.
- Power, thermal, structural, radiation, atmosphere-composition or crew-safety calculations.
- Gas-purity testing, equipment qualification, fault-tolerance demonstration or autonomous control.

The current environment did not provide browser network access to retrieve the branch file for a live WebGL session. The 3D layout is therefore source- and syntax-checked, not visually signed off.

All scene units and geometry remain uncalibrated. 3D pipe radii are visual conventions, not pipe sizes. The model is not a P&ID, construction design, operational ECLSS, flight-qualified hardware, or a safety case. No real sensors, telemetry, valves, reactors, compressors or life-support equipment are connected.

## 7. Next engineering gates

1. Calibrate the scene reference geometry and define the lunar installation boundary.
2. Define the mission, crew profile, atmosphere concept and inert-gas inventory.
3. Develop component-level mass, power and thermal budgets from source-backed subsystem data.
4. Define MRE product-gas impurity limits and the clean/dirty transfer acceptance gate.
5. Close the CO₂, hydrogen, water, methane and oxygen material balances or explicitly define the remaining waste stream.
6. Define fault trees, independent safety controls and reserve duration.
7. Review with qualified ECLSS, chemical-process, pressure-system, thermal, power, fire-safety and human-factors specialists.

---

*v3.6.0 is a digital-twin concept iteration. It does not demonstrate a functioning atmosphere-generation system or certify any physical design.*
