# Architecture

This directory contains architectural and engineering concept material.

The physical A-01 complex is a concept, not a completed building. Site selection, geotechnical and climate studies, code compliance, structural engineering, fire safety, accessibility, energy modelling and independent review are required before any construction proposal can be treated as implementation-ready.

Visualizations must be captioned as concept imagery. Scene dimensions must not be treated as physical dimensions until a calibrated SI master geometry and a documented project datum are approved.

## A-01 system architecture baseline

- [A-01 system architecture baseline v0.1](A01-SYSTEM-ARCHITECTURE-BASELINE-RU-v0.1.md)
- [Engineering reverse-engineering research v0.1](../docs/ENGINEERING-REVERSE-ENGINEERING-RU-v0.1.md)
- [Movable module and airlock safety v0.1](A01-MOVABLE-MODULE-AIRLOCK-SAFETY-RU-v0.1.md)
- [Lift-up hatch and vertical pod transfer v0.1](A01-LIFT-UP-HATCH-VERTICAL-POD-TRANSFER-RU-v0.1.md)

The baseline separates the primary structure, inner environmental/life-safety boundary, replaceable external modules, interior environment, building services, operations/digital twin and AI assistance. It is a concept-level architecture, not a construction design.

## Modular systems research

- [A-01 modular shell, waste logistics, digital sky and underground data-centre research v0.1](modular-systems-research-v0.1.md)

## A-01 Sphere Standard

- [A-01 Sphere Standard v0.1](../standards/A01-SPHERE-STANDARD-v0.1.md)
- [Component, material and fastener register templates](../templates/)

## Reference exterior cassette

- [A01-CAS-PANEL-0001 — Reference Exterior Cassette v0.1](A01-CAS-PANEL-0001-reference-cassette-v0.1.md)
- [Machine-readable cassette component record](../components/A01-CAS-PANEL-0001.json)
- [Cassette interface register template](../templates/cassette-interface-register.csv)

The cassette document is a proposed interface and verification brief. It does not define dimensions, material grades, fastener sizes, capacities or approved construction details.

## Parametric cassette geometry

- [A-01 cassette geometry methodology v0.1](A01-CAS-PANEL-GEOMETRY-v0.1.md)
- [Parametric geometry package](../geometry/README.md)
- [Generated cassette layout register](../templates/cassette-layout-register-v0.1.csv)
- [Dependency-free layout generator](../tools/generate-cassette-layout.mjs)

The proposed grid contains 12 parent sectors and 144 candidate cassette records. All dimensions remain in uncalibrated model units.
