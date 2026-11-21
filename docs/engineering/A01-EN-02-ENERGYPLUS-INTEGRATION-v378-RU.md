# A-01 v3.7.8 — EnergyPlus / idfkit integration

**Status:** integration entry point and verified technology selection. The hosted editor is embedded as an external application; the A-01 digital twin is not yet automatically serialized into an EnergyPlus model.

## Selected implementation

- **idfkit Envelop** — browser-based EnergyPlus editor with 3D geometry, visual HVAC and IDF/epJSON import/export: https://app.idfkit.com/
- **EnergyPlus WebAssembly** — actual simulation engine, executed in a browser worker: `@idfkit/engine` + `@idfkit/engine-assets`.
- **idfkit-shoebox** — open-source reference implementation demonstrating the browser engine, auto-solving parameter controls, annual weather runs, and result parsing: https://github.com/idfkit/idfkit-shoebox
- **idfkit-js** — IDF/epJSON model authoring and parsing; it is not itself the simulation engine: https://github.com/idfkit/idfkit-js
- **idfkit-weather** — TMYx weather index and EPW/DDY retrieval: https://www.npmjs.com/package/@idfkit/weather

## Important correction on package boundaries

The model library and simulation engine are separate. The shoebox reference uses a Vite build, stages EnergyPlus WASM assets and schemas into its own public directory, loads the engine with `createEnergyPlus`, then calls `ep.run({ idf, epw })`. Its source and package manifest are the implementation reference. Do not assume that installing `idfkit-js` alone enables EnergyPlus simulation.

The shoebox repository is MIT-licensed. The EnergyPlus binaries/assets remain under the EnergyPlus licence; preserve its notices and redistribution terms. The hosted Envelop editor is a separate service and is not an API contract for A-01.

## A-01 integration path

1. Keep the current 3D twin as the visual/interaction layer.
2. Establish a physically calibrated coordinate system in metres. The current geometry registry has `scaleToMetres = null`; model-unit areas and volumes must not be passed off as SI quantities.
3. Export a zone/surface schedule from the twin: spaces, floor areas, volumes, surface vertices, boundary conditions, orientation, openings and adjacency.
4. Map each physical construction to EnergyPlus material/construction objects; preserve provenance and confidence for every U-value, SHGC and thermal-bridge input.
5. Generate an IDF/epJSON model using the idfkit model library and validate it against the matching EnergyPlus schema.
6. Attach a verified Biysk EPW and matching DDY. A climate table or monthly means are not a substitute for an hourly weather file.
7. Run EnergyPlus through the WebAssembly engine in a worker. Debounce ordinary slider edits, cancel stale runs where supported, and show the exact input revision and run status.
8. Parse and return zone temperatures, heating/cooling loads, energy end uses, ventilation/fan energy, unmet hours and engine warnings to the A-01 twin.
9. Keep the input IDF, weather source, engine version, warnings and output bundle together so every displayed result is reproducible.

## What is connected now

The new page `digital-twin/a01-energyplus-workbench-v378.html` provides an A-01-branded entry point to Envelop and the Shoebox reference. It clearly labels the editor as external and reports the current A-01 input gaps. It does not claim that the iframe is connected to the twin or that an Envelop model is an A-01 calculation.

## Blocking inputs for an actual whole-dome run

- surveyed/approved dimensions and physical scale;
- complete thermal-zone and atrium schedule;
- surface areas, vertices, adjacency and boundary conditions;
- assemblies, layer properties, U-values, SHGC and thermal bridges;
- infiltration and pressure-network assumptions;
- ventilation flow rates, schedules, heat-recovery performance and frost/defrost logic;
- heating/cooling plant, controls, efficiencies and energy carriers;
- site-representative hourly EPW and design-day DDY.

Until these are supplied and checked, no whole-building kW, kWh/year, plant size or savings result is to be presented as a calculated A-01 value.

## Verification boundary

The workbench page is a browser integration entry point. The external Envelop iframe may be blocked by the provider's framing policy or browser privacy settings; the visible external link is the fallback. No browser test, full A-01 model run, deployment or physical validation is claimed by this commit.
