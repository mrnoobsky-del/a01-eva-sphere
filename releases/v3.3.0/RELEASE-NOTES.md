# A-01 v3.3.0 — Serviceable shell, pressure and anti-icing

**Date:** 2026-11-15  
**Release type:** Standalone interactive engineering-concept prototype  
**Status:** Browser-tested concept release. Separate from the main digital-twin baseline. Not deployed to the public uCoz workspace.

## Open

- [Open the standalone HTML prototype](eva-sphere-a01-v3.3.0-shell-pressure-antiicing.html)

## Scope

This release develops the exterior-shell service node **A01-L03-D01** and its interaction with the 144-cassette shell concept.

- **144-cassette selector:** a 12 × 12 conceptual index maps a selected cassette to a ring and segment identifier.
- **Service sequence:** nine states, from normal operation through isolation, external pressure balancing, LED-panel parking, cassette extension, inspection, cassette return, internal pressure balancing and restoration.
- **Pressure simulation:** the service chamber moves gradually toward the selected target instead of changing instantly. The model blocks the next step until the simulated pressure difference is within 0.35 kPa.
- **Two-boundary interlock:** the internal and external pressure boundaries are controlled separately. The internal access remains locked until the cassette is closed and the chamber has returned to the interior pressure.
- **Fail-closed behaviour:** changing external pressure or disabling the pressure circuit while the outer cassette is extended returns the cassette to its retracted state.
- **Anti-icing scenario:** ambient temperature, relative humidity, calculated dew point, precipitation and wind feed an illustrative risk index. Local heating is shown for edges, seals, guides and drainage rather than heating the whole shell continuously.
- **No WebGL dependency:** the diagram and interaction are implemented with inline SVG, CSS and JavaScript; the prototype does not need a 3D graphics context or external runtime library.

## Verification performed

- Inline JavaScript passed Node.js syntax validation.
- Chromium browser checks were run at 1440 × 1000, 768 × 1024 and 390 × 844 viewports.
- No JavaScript runtime errors or horizontal page overflow were observed at those viewport sizes.
- The manual service sequence completed, including both external and internal pressure-balancing steps.
- The automated cycle reached the restored operating state.
- The interlock was checked for premature stage progression, pressure loss while the cassette was extended, and a change in external pressure while the service access was open.
- Cassette selector endpoints resolved to **A01-CAS-R01-S01** and **A01-CAS-R12-S12**.
- The weather heuristic returned zero risk and zero heating for a warm, dry scenario, and high risk/local heating for a severe cold, wet and windy scenario.

## Limitations and items not verified

- Pressure rates, thresholds, frost-risk coefficients and heating demand are demonstrator values, not calibrated control parameters.
- No actual pressure vessels, valves, seals, actuators, thermal loads, materials, loads, fatigue, leakage rates or power budgets have been specified or tested.
- No CFD, thermal bridge analysis, condensation study, structural analysis, fire engineering, evacuation study, accessibility review or code compliance assessment has been performed.
- Browser checks are automated Chromium viewport checks; they are not a substitute for testing on physical devices and multiple production browsers.
- The cassette indexing scheme is a software selection model, not a verified physical layout or manufacturing register.
- The prototype does not control real equipment and must not be used as an operational safety system.

Any real implementation requires qualified architectural and engineering teams, site-specific calculations, hardware selection, independent review, commissioning tests and human oversight.

## Lineage and deployment

This is a standalone engineering module in the experimental v3.x line. It does not replace the repository's v2.1.0 stable digital-twin baseline or the v3.1.2 integrated workspace line.

**Repository publication:** this version is archived in the A-01 GitHub repository.  
**Public website deployment:** not performed; the uCoz workspace remains a separate deployment target.
