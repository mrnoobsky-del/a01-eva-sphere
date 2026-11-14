# A-01 Digital Twin · v3.1.2

**Base:** A-01 v3.1.1. The release preserves the 144-candidate exterior shell, five-level waste service concepts, lift and dock demonstration, underground B1 data-centre concept, navigation, Eva, service robot and workspace.

## 1. Intro sequence

- The Sphere remains in exterior mode while the personal-number card is visible.
- Enter, Skip or Escape starts the card's close transition.
- The camera switches to the interior only after the closing transition completes and the card is hidden.
- Repeated activation while closing is guarded.
- The system reduced-motion preference is respected.

## 2. Interior LED sky

The previous monolithic spherical projection surface and 12 large logical sectors have been replaced by 144 addressable curved cassettes:

- 12 circumferential sectors;
- 2 columns per sector;
- 6 meridional bands.

Together, the modules display one continuous panorama. Each cassette can be selected, inspected and used to run a front-service replacement demonstration.

### Proposed LED cassette service cycle

1. The controller places the selected module in a service state and isolates its power/data.
2. Retainers release only after the service state is confirmed.
3. The module moves a short distance inward on captive guides.
4. A retaining tray takes the module's load for inspection or replacement.
5. The module returns; seating and latching are checked before operation resumes.

This is an interior-service concept. It does not require opening the exterior weather envelope or moving an occupied room. A real design still needs to define technician and tool access, module mass, heat rejection, ventilation, wiring, connectors, cable bend radius, retention points and lifting method.

## 3. Exterior shell and occupied pod

The two systems are deliberately separate:

- **LED cassette:** a small replaceable display module serviced from the interior.
- **Exterior shell cassette:** a separate weather-skin module, shown moving outward on two captive guides into a service cradle.

An independent inner protective boundary remains between the shell cassette and occupied space. The concept adds a non-occupied service vestibule and two sequentially interlocked boundaries; they must not open simultaneously. Movement should require verified latch states, a clear service zone, acceptable weather and a ready retaining cradle. Manual recovery to a safe position is part of the concept.

**The occupied pod stays stationary.** Routine shell cassette replacement does not move the whole room outside. Whole-pod transport would be a separate architecture requiring dedicated structural supports, disconnectable utilities and evacuation procedures; it is not implemented in this release.

## 4. External technical references

Existing LED products demonstrate that a display can be built from individual serviceable cabinets rather than one giant panel:

- LG GSCE documents a 500 × 1000 mm cabinet around 12.4 kg, magnetic attachment, and front or rear service.
- SQM documents a curved 496 × 496 mm cabinet around 7.8 kg, with front/rear service and 45° curvature.

These are product examples, not A-01 module specifications. A-01 module geometry, mass, curvature and pitch must follow technology selection, structural design and a 1:1 mock-up.

Facade rail/retainer guidance was reviewed for the exterior panel path. NASA hatch/doorway principles were considered only as an analogy for sequential interlocks, not as a building code.

## 5. Verification and limitations

- All 7 executable inline JavaScript blocks passed node --check.
- JSON-LD parsed successfully.
- Static checks covered the card-close sequence, the 144 LED cassette grid, its service demonstration, the preserved inner protective boundary and removal of the monolithic screen.
- Full interactive WebGL testing and full-scale mechanism testing have not been performed.

The digital motion is a proposed sequence, not a validated actuator or rail design, load calculation, weather/fire seal qualification or safety assessment. Materials, thicknesses, masses, fasteners, wind/snow loads, thermal management, cable routes and code compliance require professional design and independent review.

## Files

- HTML: [eva-sphere-a01-v312-modular-shell-serviceable-led.html](eva-sphere-a01-v312-modular-shell-serviceable-led.html)
- Changelog: [CHANGELOG_v312.md](CHANGELOG_v312.md)
- Previous build: [A-01 v3.1.1](eva-sphere-a01-v311-ochre-hover-arrival-flight-hud.html)

## References

- LG GSCE: https://www.lg.com/us/business/download/resources/CT00001837/SPEC-GSCE%5B20240430_053522%5D.pdf
- SQM curved LED: https://rentalhouse.sqm.eu/gb/indoor/1611-p206-moduled-inner-curved.html
- Kalzip installation guidelines: https://img1.wsimg.com/blobby/go/9df8b50c-26bb-436e-9ea4-3db788efa8d0/downloads/FC%20Installation%20guidelines-2014.pdf?ver=1746654367885
- NASA Architecture Volume 2, hatches and doorways: https://www.nasa.gov/reference/8-0-architecture-vol-2/

## Addendum: LED service access and demo visibility

- Added a direct “Паспорт и сервис LED-кассеты” entry in the Smart Sky panel, opening the first of the 144 cassettes.
- Browser inspection confirmed the passport opens for `A01-SKY-CAS-P01-C01-B01`, describes front access and exposes a service-demo action.
- The first browser test found the module movement too subtle to observe. The sequence has since been strengthened: longer travel, a more legible guide/tray assembly and an ochre status indicator with six stages — power/data isolation, unlocking, extension, service position, return, relatching and verification.
- The demonstration lasts about 7.6 seconds. This is an illustrative motion sequence, not an actuator design.

The interactive movement has not yet been re-tested after this final adjustment; it should not be treated as fully verified until a new browser run.
