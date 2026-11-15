# A-01 v3.2.0 — Change log

**Branch:** `feature/a01-v320-lift-up-hatch-vertical-carriage`  
**Base:** v3.1.5 experimental prototype

## Added
- One-piece upward-opening exterior hatch with a top hinge axis.
- Independent structural frame for the vertical carriage.
- Separate radial pod transfer and vertical travel phases.
- Mechanical cargo restraint visual elements.
- Zoned anti-icing traces on critical seal, threshold and guide areas.
- Threshold meltwater channel and conceptual drain.
- Surface-temperature/dew-point sensor markers.
- Dry-air purge manifold concept for seal cavities.
- Separate outer and inner vestibule pressure-equalization bypasses.
- Pressure differential sensor and valve status indications.
- Thirteen-step animation sequence including preheat, pressure equalization, hatch release, transfer, vertical carriage, closing, pressure recovery and drying.

## Safety boundaries
The hatch does not support the pod. The carriage is a separate load path. Heating and pressure elements are visual concepts only; no setpoints, heater power, valve flow, pressure threshold or mechanical capacity have been calculated. JavaScript animation is not a safety controller and does not measure real ice, temperature, pressure or latch engagement.

## Required acceptance checks
Browser review at L01 and L03, complete animation replay, collision check, responsive layout review and console error review. Physical design requires site climate data, mechanical and thermal calculations, pressure/wind analysis, risk assessment, climate-chamber testing and applicable code review.
