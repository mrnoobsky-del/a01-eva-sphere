# A-01 — Parametric Geometry of the Replaceable Dome Cassette Grid v0.1

**Related assembly:** `A01-CAS-PANEL-0001`  
**Status:** proposed digital geometry / preliminary layout  
**Checked:** 14 November 2026  
**Units:** uncalibrated model units, not metres  
**Physical verification:** none claimed

> This document reconstructs the shell geometry encoded in the published digital model and proposes a finer addressable cassette grid. It is not a structural design, fabrication drawing, approved façade system or bill of materials.

## 1. Source geometry audit

- **Current baseline v2.1.0:** `digital-twin/eva-sphere-a01-v210-human-navigation-safety.html` contains `DOME_BASE_RADIUS = 8.55`, `DOME_SCALE_XZ = 1.22`, `DOME_SCALE_Y = 1.35`, with shell group offset `y = 0.56`. It contains the cutaway dome surface but no `shellPanelGroup`, shell-panel features or 12 cassette asset records.
- **Experimental v2.0.27:** `releases/v2.0.27/eva-sphere-a01-v2.0.27-modular-shell-waste-datacenter.html` contains the same radius/scales, plus 12 experimental shell-panel objects. Each legacy panel spans 30° in azimuth, uses radial rendering factor `1.006`, begins at `theta = 0.015 rad`, ends at `theta = 0.48π`, and is placed at `y = 0.58`.

The proposed layout keeps shared dome proportions but turns each legacy 30° petal into a parent addressing zone. It does not claim the experimental panels are present in v2.1.0. Output remains a separate geometry package until deliberately integrated into a later digital-twin version.

## 2. Coordinate model

| Parameter | Value | Meaning |
|---|---:|---|
| Base sphere radius | 8.55 | Source model value |
| Cassette radial factor | 1.006 | Legacy visual offset only |
| Cassette sphere radius before scaling | 8.6013 | `8.55 × 1.006` |
| Horizontal semi-axis `a` | 10.493586 | `8.6013 × 1.22` |
| Vertical semi-axis `b` | 11.611755 | `8.6013 × 1.35` |
| Vertical origin `y₀` | 0.58 | Legacy panel-group offset |
| Crown angle `θ₀` | 0.015 rad / 0.86° | Avoids exact pole |
| Lower angle `θ₁` | 0.48π / 86.4° | Stops above equatorial rim |

Coordinates use the source's Three.js spherical convention:

[
 x=-acosarphisin	heta,quad y=y_0+bcos	heta,quad z=asinarphisin	heta.
]

The model's zero azimuth is not registered to geographic north or a surveyed grid. The radial factor and vertical offset are rendering values, not a physical cavity, waterproofing gap, installation tolerance or structural stand-off.

## 3. Proposed hierarchy

1. **12 parent sectors**, each 30° wide.
2. **2 columns per sector**, each 15° wide.
3. **6 meridional courses per column**, equal increments in θ from 0.86° to 86.4°.
4. **144 candidate panels**, tagged `A01-CAS-P01-C01-B01` through the generated register.

The old 12 petals become parent zones, not single physical liftable panels. The 144 records are candidate identities and geometry, not a production schedule.

## 4. Geometric metrics

Surface area on the anisotropically scaled ellipsoid:

[
 A=Deltaarphiint_{	heta_0}^{	heta_1}asin	hetasqrt{a^2cos^2	heta+b^2sin^2	heta},d	heta.
]

Meridional edge length:

[
 L_m=int_{	heta_0}^{	heta_1}sqrt{a^2cos^2	heta+b^2sin^2	heta},d	heta.
]

At constant θ, curved edge length is `a sin(θ) Δφ`. The generator records chord widths, vertical projection, four corner coordinates, surface midpoint, outward normal and sampled boundary curves.

Representative values for one 15° column, rounded to three decimals:

| Course | θ range | Meridional edge | Surface area | Upper arc | Lower arc |
|---:|---:|---:|---:|---:|---:|
| B01 | 0.86°–15.12° | 2.619 | 0.998 | 0.041 | 0.716 |
| B02 | 15.12°–29.37° | 2.654 | 2.755 | 0.716 | 1.348 |
| B03 | 29.37°–43.63° | 2.713 | 4.425 | 1.348 | 1.896 |
| B04 | 43.63°–57.89° | 2.781 | 5.904 | 1.896 | 2.327 |
| B05 | 57.89°–72.14° | 2.841 | 7.057 | 2.327 | 2.615 |
| B06 | 72.14°–86.40° | 2.879 | 7.751 | 2.615 | 2.742 |

All values are model units or model-unit squared. The bottom course has about 7.8 times the area of the crown course because circumference grows towards the rim. Equal-angle courses produce similar meridional edge lengths but not equal-area modules.

An alternative with three 10° columns per sector would create 216 candidates and reduce the largest course area to about 5.17 model-unit², at the cost of more joints, seals, locks and maintenance points. It is an option, not selected.

## 5. Unresolved shell boundaries

- **Crown closure:** the upper boundary is a small near-polar ring. The physical design needs a crown hub/cap, water-shedding detail, structural node arrangement and safe installation order. Tiny upper edges should not automatically become independent production parts.
- **Lower skirt / base transition:** at θ = 86.4°, the panel edge remains approximately 0.728 model units above the ellipsoid's equatorial origin plane. A designed lower skirt, ring flashing, drainage termination and structural interface are still required.

Openings, emergency access, service routes, exhausts, façade fire strategy, PV/shading options and the actual structural grid may interrupt or merge the nominal panel grid.

## 6. Reproducible files

- `geometry/a01-shell-parameters-v0.1.json` — source parameters and subdivision controls.
- `geometry/a01-cassette-layout-v0.1.json` — 144 candidate records with coordinates, normals, sampled boundaries and metrics.
- `templates/cassette-layout-register-v0.1.csv` — compact review schedule.
- `geometry/cassette-layout-diagram-v0.1.svg` — schematic plan/elevation.
- `tools/generate-cassette-layout.mjs` — dependency-free generator.

Run from the repository root: `node tools/generate-cassette-layout.mjs`. A reproducible build omits timestamps. The generator does not analyse or certify structural performance; downstream CAD/BIM conversion requires coordinate-transform verification.

## 7. Engineering gates before physical dimensioning

1. Confirm surveyed master geometry, datum, orientation, structural nodes and openings.
2. Decide whether 144 candidates suit the handling/fabrication strategy.
3. Resolve crown and lower-skirt closures and the continuous inner envelope.
4. Define skin, frame, rails, locks, independent secondary restraint and drainage.
5. Calculate site-specific wind, snow/ice, temperature movement, seismic actions where required, fatigue and temporary service conditions.
6. Derive panel mass and centre of gravity from actual product data; then design handling and service cradle.
7. Produce a ground-level 1:1 mock-up of a representative panel, adjacent joint, rail, anchor, lock, tether and seal.
8. Approve test protocols and numerical acceptance criteria before testing.

No dimensions in metres, mass, fastener selection, load capacity, fire rating, water rating, life expectancy or safe operating wind limit is established by this geometry package.
