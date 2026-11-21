# A-01 — A01-EN-01: Integrated Thermal and Energy Balance
**Documentation package v3.7.7 · EN · 21 November 2026**

> **Status:** preliminary calculation basis and methodology. This is not a completed building heat-load calculation, HVAC/electrical design, equipment selection or proof of code compliance. Biysk climate observations are separated from derived indicators, design assumptions and missing inputs.

## 1. Scope and current result

A01-EN-01 links A01-CV-02 (whole-dome climate), A01-CV-01 (crown ventilation) and A04 Energy & Resilience into one model.

This release:
- adopts the Biysk climate basis from SP 131.13330.2025;
- replaces the earlier universal 30 °C temperature difference and illustrative sunshine-hour assumptions;
- calculates transparent climate indicators and normalized loads;
- defines methods for envelope, ventilation, infiltration, heat recovery, heating, cooling and seasonal energy balance;
- lists the data required before credible kW, kWh/year, heat-pump capacity, PV area or storage capacity can be stated.

**Whole-dome peak capacity and annual consumption are deliberately not published as numbers:** the physical model scale, envelope areas, room programme, U-values, airflow rates and equipment have not yet been established or verified.

## 2. Sources and climate basis

### 2.1 Governing climate source

The climate source is **SP 131.13330.2025, Building Climatology**, approved by Ministry of Construction Order No. 470/pr dated 8 August 2025, effective 9 September 2025, replacing SP 131.13330.2020. Its current status was checked against the Rosstandart record.

- Rosstandart record: https://protect.gost.ru/sp/details/0634a74e-9f91-4571-82a8-b04c3a9b6c99
- Published text with Tables 5.1, 6.1, 7.1, 9.1, 10.1 and Section 16: https://meganorm.ru/mega_doc/norm_update_01112025/pravila/0/sp_131_13330_2025_svod_pravil_stroitelnaya_klimatologiya.html

Values below are transcribed from the published standard text. Before construction design, the engineer must verify the current edition, applicability and design parameters for the exact site address.

### 2.2 Cold period — Biysk, Table 5.1

| Parameter | Value |
|---|---:|
| Coldest day, 0.98 / 0.92 probability | −43 / −40 °C |
| Coldest five-day period, 0.98 / 0.92 probability | −36 / −35 °C |
| Air temperature, 0.94 probability | −22 °C |
| Absolute minimum | −52 °C |
| Mean daily temperature range in coldest month | 11.9 °C |
| Period with daily mean ≤ 0 °C | 157 days; mean −10.9 °C |
| Period with daily mean ≤ 8 °C | 210 days; mean −7.1 °C |
| Period with daily mean ≤ 10 °C | 227 days; mean −5.9 °C |
| Mean monthly RH in coldest month | 77 % |
| RH at 15:00 in coldest month | 71 % |
| Precipitation, November–March | 179 mm |
| Prevailing wind, December–February | SW |
| Maximum mean wind speed by direction in January | 4.5 m/s |
| Mean wind speed during period ≤ 8 °C | 2.2 m/s |

Section 16 distinguishes outdoor-air design parameters A and B. In the cold period, parameter A uses the 0.94-probability temperature, while parameter B uses the 0.92-probability coldest five-day temperature. These must not be confused with the absolute minimum or used interchangeably for every calculation.

### 2.3 Warm period — Biysk, Table 6.1

| Parameter | Value |
|---|---:|
| Barometric pressure | 993 hPa |
| Parameter A temperature, 0.95 probability | +24 °C |
| Parameter B temperature, 0.98 probability | +27 °C |
| Mean maximum temperature of warmest month | +26.9 °C |
| Absolute maximum | +39 °C |
| Mean daily range of warmest month | 13.4 °C |
| Mean monthly RH of warmest month | 69 % |
| RH at 15:00 in warmest month | 50 % |
| Precipitation, April–October | 357 mm |
| Prevailing wind, June–August | NE |
| Minimum mean wind speed by direction in July | 0 m/s |

Section 16 requires a minimum design wind speed of at least 1 m/s for the relevant parameters. +24/+27 °C are outdoor climate design values, not indoor setpoints.

Biysk is not listed among the cities with ready-made outdoor-air enthalpy and humidity values in Table 16.2. Do not substitute another city's enthalpy or derive it from average July humidity. Exact cooling/dehumidification requires coincident temperature/humidity data from an approved weather file/station, or a specialist calculation using the SP maps and method.

### 2.4 Mean monthly temperatures — Table 7.1

| Month | °C | Month | °C |
|---|---:|---|---:|
| January | −16.1 | July | +19.7 |
| February | −14.5 | August | +17.3 |
| March | −6.7 | September | +11.1 |
| April | +4.5 | October | +3.6 |
| May | +12.5 | November | −6.1 |
| June | +17.9 | December | −12.8 |
| **Annual mean** | **+2.5** | | |

These monthly means support a first seasonal overview but do not replace an hourly weather file for dynamic simulation.

### 2.5 Additional climate data

- Table 9.1: Biysk-Zonalnaya mean/maximum daily temperature ranges by month; July is 14.2/24.6 °C.
- Table 10.1: monthly precipitation for Biysk-Zonalnaya; annual total 536 mm.
- Wind and solar gains must use the relevant SP tables/maps, surface orientation and local site conditions. Average sunshine hours are not a substitute for integrating solar irradiation by orientation and time.

## 3. Geometry basis audit

The repository file `geometry/a01-shell-parameters-v0.1.json` records:
- `baseRadius = 8.55` model units;
- `scaleXZ = 1.22`, `scaleY = 1.35`;
- `scaleToMetres = null`;
- geometry status `proposed-digital-geometry`;
- an explicit warning not to interpret areas and sizes as m² or metres.

The shell register contains 12 parent sectors and 144 candidate cassettes. This is not an approved physical panel schedule. Therefore the shell, glazing, floor, roof and atrium areas/volumes cannot yet be derived from the current JSON with physical validity.

**Geometry gate:** define coordinate datum, origin, levels, physical scale, inner/outer surfaces, openings, orientation-based areas and room volumes. Then issue a calibrated geometry set in metres.

## 4. Thermal-load calculation model

### 4.1 Transmission losses

For each zone and envelope element:

`Q_trans = Σ(U_i × A_i × ΔT_i) + Σ(ψ_j × L_j × ΔT_j) + Σ(χ_k × ΔT_k)`

where:
- `U` is thermal transmittance, W/(m²·K);
- `A` is physical area, m²;
- `ψ` is linear thermal transmittance, W/(m·K);
- `L` is junction length, m;
- `χ` is point thermal transmittance, W/K;
- `ΔT` is the temperature difference for the relevant boundary zone.

Calculate separately for opaque shell, glazing, doors, ground floor, intermediate slabs, roof/crown, cassette joints, thermal bridges and interfaces. Ground and adjacent unheated zones must not automatically use outdoor air temperature.

### 4.2 Ventilation and infiltration

Sensible ventilation load:

`Q_vent,s = ρ × c_p × V̇ × (T_indoor − T_outdoor)`

Moisture/latent load must be calculated separately from humidity ratio and enthalpy differences. Do not simply add infiltration to mechanical supply without checking pressure balance and the leakage calculation method.

Required inputs: zone flow rates and schedules, occupancy, outdoor air, permitted recirculation, envelope leakage, wind pressure, atrium height and door/vestibule operation.

### 4.3 Heat recovery

Preliminary sensible estimate:

`Q_after_HRV = Q_vent,s × (1 − η_sensible)`

This is a simplified steady-state estimate. Real calculations must include actual efficiency at the operating flow and frost conditions, leakage and moisture/odour transfer, bypass, defrost, pressure drop, fan power, condensate and maintenance. Heat recovery does not automatically reduce infiltration or remove the requirement for outdoor air.

### 4.4 Internal and solar gains

Include people, lighting, domestic and process equipment, kitchens, server room, pumps, lifts and other systems. Calculate solar gains using hourly irradiation, azimuth/tilt, glazing area, SHGC/g-value, shading, crown geometry and thermal mass.

Server-room heat is only a supplemental source when its profile, availability and safe heat exchange are demonstrated; it is not guaranteed heating.

## 5. Normalized calculation indicators

These are not whole-building loads. They are traceable coefficients for comparing design options once physical areas and airflow rates are available.

### 5.1 Heating-period climate index

Table 5.1 gives 210 days with daily mean temperature −7.1 °C for the period where daily mean temperature is ≤ 8 °C.

Derived indicator at an 18 °C base:

`HDD18 = 210 × (18 − (−7.1)) = 5,271 K·day`

At a 20 °C base:

`HDD20 = 210 × (20 − (−7.1)) = 5,691 K·day`

This is an estimate from the period mean, not an official hourly HDD file and not the building's annual energy use. It excludes solar/internal gains, thermal-mass dynamics, schedules and controls.

For envelope heat-loss coefficient `H = Σ(U×A)+Σ(ψ×L)+Σχ`, the HDD20 seasonal indicator is:

`E_trans,screen = H × 5,691 × 24 / 1,000 = H × 136.6 kWh`

Here `H` is in W/K. This is a screening estimate of envelope transmission at an assumed 20 °C base, not an annual heating bill forecast.

### 5.2 Peak winter outdoor-air flow

For sensitivity illustration only, with an **assumed example indoor temperature of 20 °C**, parameter B at −35 °C gives ΔT = 55 K. Using a normalized volumetric heat capacity of air of 1.2 kJ/(m³·K):

`Q_vent,gross ≈ 1.2 × 1.0 × 55 = 66 kW per 1 m³/s`

| Sensible heat-recovery effectiveness (scenario only) | Residual load per 1 m³/s |
|---:|---:|
| 50 % | 33.0 kW |
| 60 % | 26.4 kW |
| 70 % | 19.8 kW |
| 80 % | 13.2 kW |

This is a normalized scenario, not selected equipment efficiency. Latent heat, frosting, defrost, leakage, fans, bypass and changing air properties are excluded. 20 °C is an example only; actual room setpoints depend on room programme and applicable requirements.

### 5.3 Winter envelope temperature difference

With the same example of 20 °C indoors:
- at −35 °C (coldest five-day period, 0.92): ΔT = 55 K;
- at −36 °C (coldest five-day period, 0.98): ΔT = 56 K.

These values support envelope sensitivity checks but do not automatically select the design case for every component. Parameters A/B, room conditions, ground and internal zones must follow the applicable SP and project basis.

### 5.4 Cooling

Biysk outdoor design temperatures +24 °C (A) and +27 °C (B) are available. Total cooling capacity cannot be calculated without:
- physical envelope/glazing area and properties;
- orientation, shading and hourly solar irradiation;
- occupancy and equipment loads;
- outdoor-air rates;
- coincident outdoor temperature, humidity and enthalpy;
- required indoor temperature and humidity by room type.

Do not estimate latent load or dehumidification from the mean humidity of the warmest month as if it coincided with the 27 °C design temperature.

## 6. Energy balance and seasonal consumption

Separate energy by type and end use.

**Heat**
- transmission losses;
- ventilation and infiltration after recovery;
- domestic hot water;
- distribution and storage losses;
- internal gains from people, lights and equipment;
- useful heating demand after coincident gains.

**Cooling**
- solar gains;
- envelope heat transfer;
- people, lighting and equipment;
- outdoor air and moisture removal;
- server and process loads;
- atrium heat storage/rejection and night purge.

**Electricity**
- heat-pump/chiller compressors;
- fans and pumps;
- controls and automation;
- lighting, lifts and common loads;
- server room/communications;
- charging and service equipment.

For heat pumps, seasonal electricity must use useful thermal energy and a verified seasonal `SCOP`, not a single catalogue `COP` point. For cooling, use seasonal `SEER` or an equivalent method. Include backup operation, part-load performance, circulation pumps, defrost and auxiliary heaters.

Hourly/monthly balance:

`E_grid = E_HVAC + E_lighting + E_plugs + E_IT + E_pumps + E_other − E_PV_used − E_storage_discharge`

Track storage charge/discharge, power limits, conversion losses, critical-load reserve and import/export separately. Do not subtract all nominal PV generation: account for load/generation coincidence, orientation, snow, shading, module temperature and losses.

## 7. Heat recovery and energy scenarios

Compare at least:
1. baseline mechanical ventilation without heat recovery;
2. heat recovery with bypass and frost protection;
3. zonal heat recovery with separation of contaminated exhaust streams;
4. night heat removal through the crown under acceptable weather and outdoor-air quality;
5. winter mode with outdoor-component limitation/protection;
6. single fan/unit failure and redundancy;
7. critical-load islanded operation.

For each scenario record useful heat/cooling, electricity, peak power, operating hours, efficiency, constraints and equipment state. Night purge may reduce part of the cooling load only when outdoor enthalpy and airflow balance are favourable; it does not guarantee savings on every summer night.

## 8. Input data register

| Input | Current status | Required to complete |
|---|---|---|
| Biysk climate from SP 131.13330.2025 | SOURCE FOUND | Confirm site address/elevation and station applicability |
| Hourly TMY/EPW or approved weather series | MISSING | Confirmed station/period, temperature, humidity, wind and radiation |
| Digital geometry scale in metres | MISSING | `scaleToMetres`, datum, levels and measured geometry |
| Envelope and glazing areas by orientation | MISSING | Area schedule after calibration |
| U-values for shell, floor, glazing and doors | MISSING | Verified layer/junction properties |
| Thermal bridges and airtightness | MISSING | Junctions, lengths, tests or calculated data |
| Room areas and volumes | MISSING | Room/zone schedule |
| Occupancy, schedules and internal gains | MISSING | Operational programme and load profiles |
| Outdoor/exhaust airflow rates | TO BE CALCULATED | A01-CV-02, hygiene requirements and occupancy |
| Infiltration and atrium pressure | MISSING | Airtightness tests, CFD/aerodynamics and door scenarios |
| Heat-recovery units and frost performance | MISSING | Type, manufacturer curves, leakage, frost/defrost |
| Heat pumps/chillers and seasonal COP/SEER | MISSING | Selection against loads and climate |
| Hot water and process heat | MISSING | End-use balances |
| PV, inverters, BESS and UPS | CONCEPT | Area/orientation, generation profile, schematics and efficiencies |
| Tariffs and grid connection limit | MISSING | Utility conditions, tariffs and contracted capacity |

## 9. Calculation and verification plan

- **EN-S0 — Design Basis:** confirm site, climate station, regulatory basis and operating scenarios.
- **EN-S1 — Geometry Freeze:** calibrate digital geometry in metres; issue area/volume schedules by zone and orientation.
- **EN-S2 — Envelope:** define verified layers, U-values, junctions, thermal bridges and airtightness.
- **EN-S3 — Loads:** calculate zonal winter/summer peaks including ventilation, infiltration, solar, people and equipment.
- **EN-S4 — HVAC & Recovery:** select system topology, heat recovery, frost protection, pumps/fans and seasonal performance.
- **EN-S5 — Annual Model:** hourly annual balance with weather file, occupancy profiles, thermal mass and controls.
- **EN-S6 — Energy Resilience:** PV/BESS/UPS/generator, critical loads, autonomy and failure scenarios.
- **EN-S7 — Independent Review:** review inputs, formulas, sensitivity, standards and independent engineering assessment.

## 10. Key limits and status

1. The former fixed 30 °C temperature difference is not used as a universal climate input. Specific Biysk SP parameters and A/B scenarios are used.
2. Illustrative 5 summer / 1 winter sunshine-hour assumptions are not used for PV yield or solar heat gains. Time- and surface-specific irradiation data are required.
3. Normalized values in Section 5 are not the dome's capacity or annual energy consumption.
4. The shell geometry has no metre scale yet. Physical area/volume and absolute loads are unverified.
5. This is a preliminary methodology, not construction design, certified calculation, equipment selection or proof of code compliance.

**Current maturity:** climate basis — source found; normalized indicators — calculated; physical building model — awaiting calibration; whole-complex peak loads and seasonal energy use — not determined.

## 11. Related documents

- A01-CV-01 Crown Ventilation v3.7.5
- A01-CV-02 Whole-Dome Climate Control v3.7.6
- A01 Integration Matrix v3.7.3
- `geometry/a01-shell-parameters-v0.1.json`
- `geometry/README.md`

---
*Climate and regulatory source check: 21 November 2026. Recheck the current SP edition, site technical conditions and design inputs before project use.*
