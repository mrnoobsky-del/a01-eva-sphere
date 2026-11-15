# A-01 v3.1.4 — manual verification plan

Complete this checklist before publishing the candidate on the public site. Desktop checks do not replace real-phone testing.

## 1. Startup and first entry
- Open over HTTPS with access to jsDelivr; check WebGL startup and browser console.
- Check light/dark themes, resize and reload.
- Confirm that the Sphere remains in the intended welcome state behind the personal-number card and that the interior transition starts only after the card closes.
- Check Enter, Skip, Escape, repeated taps and reduced-motion system preference.

## 2. Main scene
- Visit all five levels and check that the level controls and object cards reflect the selected zone.
- Check mouse orbit, keyboard walk, object selection, camera return and HUD behavior.
- On a real phone, check joystick direction, swipe-look, altitude controls, object taps and touch targets.
- Check responsive panels and horizontal overflow.

## 3. LED, shell and engineering demos
- Open an LED cassette passport, run the front-service sequence and confirm the cassette returns to its original position.
- Run the outer-shell cassette service demo and confirm the inner protective boundary remains in place.
- Check waste-service nodes on all levels, the separate freight lift and the lower collection dock.
- Select a residential pod and observe the full portal sequence: local LED cassette retraction, shell opening, telescopic transition, pod travel, outer stop, return, shell closure and LED restoration.
- Check normal scene operation and a second run after the demo.
- Do not treat a green UI indicator or completed animation as proof of a physical lock or seal.

## 4. Living World v0.1.1
- Confirm the Living World launcher appears after the main scene is ready and does not cover player controls.
- Select Мушкинссс and Eva; test greet, flap/light pulse, rest and return.
- Confirm both companions remain within the 2.65-unit radius around L01 and do not change the camera or player controls.
- Turn ambient movement off, pause, resume and reload; verify only the ambient toggle is persisted locally.
- Run `window.A01_LIVING_WORLD.destroy()`; the panel and both scene groups should disappear while the main scene continues to work.
- Confirm the module does not request microphone/camera access or create its own network requests.

## 5. Browsers and deployment
- Test supported current Chrome, Edge, Firefox and Safari versions.
- Test on physical Android and iOS devices, including a lower-powered GPU.
- Check tab switching, WebGL context loss and recovery.
- For uCoz, keep the HTML and `modules/living-world/` folder together; check relative paths and expansion of `$USER_ID$` and `$USERNAME$` macros.
- Back up the current page before deployment. Publish only after blocking issues are fixed and all critical checks pass.

## Known limits
Scene measurements are uncalibrated model units. The companion module has no collision system, navmesh, voice input, external AI or persistent memory. Pod deployment, portal and rails remain a visual research sequence, not a construction mechanism.
