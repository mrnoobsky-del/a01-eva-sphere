# A01-MODNET-3D-01 — 3D scenarios and model library

**Revision:** v0.1  
**Status:** interactive concept demonstrator  
**Related:** A01-MODNET-01; A01-MODNET-VISUAL-01  
**Digital-twin boundary:** separate MODNET scene; the A-01 v4.9.0 primary model is not modified.

## Live demonstration

[Open the interactive MODNET 3D simulation on Wix](https://headless-dozcbvursgh-storypad9-1409.wix-site-host.com/modnet-exchange-simulation.html)  
[Open the source HTML in GitHub](../digital-twin/modnet-exchange-simulation.html)

The viewer provides camera orbit/zoom, play/pause, reset, step navigation, a timeline slider and three selectable transfer scenarios.

## Three scenarios in the viewer

### 01 — Horizontal transfer trolley

This is the preferred arrangement to investigate for the first demonstrator. A carrier arrives and is aligned at the exchange apron. The module is checked and stabilized. A guided trolley transfers it through the outer cargo gate into a bounded vestibule. The outer gate closes and the vestibule is checked before the inner gate can open. The module moves to the internal dock, is supported and mechanically retained, then utility connections may be made. The carrier exits.

### 02 — Module on support legs

The module is unloaded onto its own support legs. The carrier disconnects and leaves; a compatible carrier can later arrive, connect, take the load and remove the module. This illustrates the separation between module ownership and temporary use of the dock slot. Ground bearing, levelling, stability, weather protection and support-foot inspection need separate design.

### 03 — Lift-platform transfer

A powered platform changes elevation before the module reaches the internal dock. This is an alternative if the selected site has a level difference. It is not the preferred baseline until lift load, guidance, stability, gate sequence, power-loss recovery and maintenance access are engineered.

## Model library research

The interactive scene uses the following external model sources as visual references:

| Function | Model and source | Licence / useful details | Use boundary |
|---|---|---|---|
| Road carrier | [Semi Truck and Trailer — tevy](https://tevy.dev/models/semi-truck) | CC0 1.0; GLB; separate named nodes for trailer, wheels and landing legs; about 20 m overall length | Visual road-carrier placeholder; not proof of legal vehicle/payload compatibility |
| Receiving dock | [Loading Dock — tevy](https://tevy.dev/models/loading-dock) | CC0 1.0; GLB; hydraulic leveller, dock light, 3 LODs | A conventional dock reference; not a full-module transfer vestibule |
| Auxiliary yard equipment | [Forklift — tevy](https://tevy.dev/models/forklift) | CC0 1.0; GLB; articulated mast, carriage and forks; about 2.5 t model description | Yard context/visual reference only; not selected to lift an A-01 module |
| Small lift mechanism | [Cargo lift with swing gate — 3DAssets.dev](https://3dassets.dev/assets/animated-mechanisms-kit-cargo-lift-with-gate-46e89b0f) | CC0 1.0; GLB; named gate and platform; open/close animation clips | Animation reference only. Its small platform is not assumed to support an entire A-01 module |
| Detachable/mobile cabin reference | [Site Office Cabin — 3DAssets.dev](https://3dassets.dev/assets/rocket-launch-pad-and-gantry-site-office-cabin-3db46ca9) | CC0 1.0; GLB; skid chassis; open/close animation | Appearance and skid-frame reference, not an A-01 design |

The scene also follows the general architectural pattern of [WareTrack](https://github.com/corund207/waretrack), a Three.js logistics-world project. Its source code is MIT, but the embedded Sketchfab models retain separate CC BY 4.0 attribution obligations. The MIT licence must not be assumed to cover those model files.

Other registries worth retaining:
- [3dassets-dev/3dassets](https://github.com/3dassets-dev/3dassets) — CC0 GLB registry integration and agent tooling.
- [lucas-martinic/polyfork-catalog](https://github.com/lucas-martinic/polyfork-catalog) — large low-poly model catalogue; mesh downloads are CC BY 4.0 and must retain the individual credit line.
- [KhronosGroup/glTF-Sample-Assets](https://github.com/KhronosGroup/glTF-Sample-Assets) — technical examples for validating GLTF loading, materials and animation.

External GLB files are loaded through pinned source URLs. Their binaries are not copied into this repository. The project stores the scene integration code and a record of the model's source and licence. If a source URL changes or fails, the viewer must continue using its procedural fallback geometry until the model register is corrected.

## Proposed scene architecture

Keep the scene modular so the actual A-01 digital twin can later host it as a separate logistics mode:

- **World layer:** approach road, turning envelope, external apron, lighting and site boundaries.
- **Carrier layer:** tractor, trailer or swap-body platform; wheel/landing-leg transforms; transport restraints.
- **Module layer:** independent dólka model, transport frame, support legs, lift/handling points, ID panel and utility interface.
- **Transfer layer:** guided trolley, rollers or platform; centring guides; primary locks and secondary retention.
- **Vestibule layer:** outer gate, enclosed buffer volume, inner gate, door sensors, status lamps and emergency release.
- **Internal dock layer:** receiving supports, final locks, service connectors and safe access.
- **Orchestration layer:** named states, preconditions, interlocks, alarms, logs and operator override.

Each animated object should be a separately addressable scene node. Animation clips should not be the only safety logic: the control state machine must validate conditions before allowing transitions.

## Required state machine

| State | Required confirmation before transition |
|---|---|
| Available | Slot is inspected, clear and released for booking |
| Reserved | Module passport and slot passport are compatible |
| Carrier arriving | Route and receiving envelope are clear |
| Aligned | Position, height and interface references are within approved tolerances |
| Stabilized | Parking/immobilization and support conditions confirmed |
| Outer transfer | Inner gate remains interlocked closed |
| Vestibule sealed | Outer gate closed and closure confirmed |
| Inner transfer | Outer gate remains interlocked closed |
| Dock secured | Support contact, primary locking and secondary retention confirmed |
| Services connected | Correct connectors and isolation sequence verified |
| Occupied | Slot booking and module presence recorded |
| Services isolated | Zero-energy/isolated condition confirmed before removal |
| Removal | Both gate interlocks and carrier conditions verified |
| Inspection / cleaning | Slot is not released until inspection and reset complete |
| Available | Signed release of slot by authorized operator |

Eva and Orion may display states, maintain bookings, explain alarms and coordinate schedules. They must not be the safety controller. Hard interlocks, emergency stops and safe-state behaviour are independent and engineered separately.

## Recommended first demonstrator

1. One outdoor exchange position and one mock receiving vestibule.
2. One empty, inert, non-occupied module surrogate with no hazardous battery.
3. One carrier platform and a guided transfer trolley.
4. A two-gate interlock demonstrator with sensors and emergency stop.
5. Repeated install/remove cycles with no connected utilities at first.
6. After mechanical verification, separately test low-voltage service connectors and then staged utility connection under professional supervision.

Record: alignment repeatability, cycle time, manual interventions, support/retention status, door interlock events, emergency-stop recovery, inspection time and damage.

## Limitations

The viewer is a product/engineering communication prototype. The dólka geometry is an original placeholder and is not dimensioned to an approved transport envelope. No mass, centre of gravity, lifting capacity, bearing pressure, structural load, door rating, braking requirement, fire rating, or regulatory acceptance is established by the animation.

Before a physical pilot, complete an engineering interface drawing, module mass and centre-of-gravity register, support and lift calculations, carrier compatibility review, swept-path and clearance study, fire/egress review, safety hazard analysis and a tested cause-and-effect matrix.

## Next packages

- **A01-MODNET-02:** transport frame, support legs, locks and swap procedure.
- **A01-MODNET-03:** standardized utility dock, couplings and service isolation.
- **A01-MODNET-05:** two-door vestibule safety state machine and cause/effect matrix.
