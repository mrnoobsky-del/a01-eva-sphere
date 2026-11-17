# A-01 — Golden-section proportion study v0.1

**Status:** visual / space-planning hypothesis; not a building code, egress design or structural calculation.  
**Units:** uncalibrated model-units. The current digital scene has no verified metre datum.

## 1. Values read from the A-01 digital model

- Central atrium radius: **3.67231043**
- Inner radius of the modular rooms: **5.08**
- Outer radius of the modular rooms: **6.98**
- Outer gallery boundary radius: **7.85**

The two circulation bands are:

- Inner band: \(5.08 - 3.67231043 = 1.40768957\) model-units
- Outer band: \(7.85 - 6.98 = 0.87\) model-units

\[
\varphi = \frac{1 + \sqrt{5}}{2} = 1.6180339887\ldots
\]

\[
\frac{1.40768957}{0.87} = 1.61803399\ldots
\]

The relation is applied to the two radial circulation bands around the modular ring. The ratio is dimensionless, so it remains the same under a later uniform scale calibration.

## 2. What changed in v3.6.0-rc1

The previous model radius was 3.72 model-units. Keeping the room radii and the outer boundary fixed, the central atrium radius was adjusted to 3.67231043 so the two circulation bands match φ.

This is a small geometric adjustment to the digital concept. It does **not** establish safe or accessible corridor widths. Until the model is calibrated to metres and occupancy, the values must not be treated as physical widths.

## 3. Where not to force φ

The golden ratio is not a load factor, safety factor, structural member size, fire separation, ventilation coefficient or proof of acoustic quality. It must not override minimum clear widths for egress and accessible circulation, wheelchair turning, viewing sightlines, structural spans, fire compartments, evacuation or equipment maintenance clearances.

Floor-to-floor heights remain governed by room use, structure, acoustic soffits, HVAC distribution, services, fire protection and accessibility—not by a blanket φ multiplier.

## 4. Next verified calculation stages

1. Calibrate one model-unit to metres from an agreed master dimension and surveyed datum.
2. Confirm the room ring, atrium opening, circulation and seating envelope from a coordinated plan.
3. Produce load paths and connection definitions for the STR frame.
4. Run frame / truss checks in Frame3DD or PyNite; use FreeCAD FEM / CalculiX for shell / plate and buckling studies where appropriate.
5. Link material grades, section properties, fasteners, wind / snow cases and load combinations before calculating capacities.
6. Review with a locally qualified structural engineer and the selected jurisdiction's building, fire and accessibility requirements.

**Decision:** use φ only as a reversible visual proportion in this RC. Keep all physical dimensions, capacities, masses and approval statuses open until the model is calibrated and professionally checked.
