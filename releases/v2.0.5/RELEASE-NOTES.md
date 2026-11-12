# A-01 v2.0.5 — welcome inside the workspace

Date: 2026-11-12

## Changes
- Reworked the first-visit welcome from a viewport-wide modal into an in-workspace welcome panel, constrained to the central Sphere workspace.
- Moved the welcome markup into .workspace-main, alongside the 3D stage; the stage retains its layout footprint on desktop while being visually hidden during welcome mode.
- Replaced the dimmed full-screen backdrop with a contained pearl/graphite panel that follows the active theme.
- Rebuilt the three navigation choices as consistent responsive action cards with aligned icons, titles, descriptions, and arrows.
- On narrow mobile layouts, the welcome becomes a normal full-width workspace section rather than an overlay.
- Opening and closing the welcome toggles a dedicated app-shell state class. Existing navigation destinations and the v2.0.5 first-visit key remain intact.
- Retained compact-navigation fixes: collapsed rail hides headings and labels and displays centered icons only.

## Validation
Static source checks passed: welcome markup is inside .workspace-main; final welcome layout is contained, not viewport-fixed; open/close toggles welcome-mode; responsive cards and compact-nav rules are present. Browser visual and interaction testing remains required. Not deployed to production.


## Mobile header and Eva chat refinement
- Keep search, Eva, language, and theme actions in one compact horizontal row on phones; use icon-first controls and preserve accessible labels.
- Prevent the mobile header from wrapping into a vertical stack, including narrow 320–380px screens.
- On phones, opening Eva does not automatically focus the textarea or summon the keyboard.
- The mobile composer uses a 16px input font to avoid iOS focus zoom, a compact send button, and no desktop Enter hint.
- Enter inserts a newline on mobile; the explicit send button submits. Desktop retains Enter-to-send and Shift+Enter newline.
- Use VisualViewport resize/scroll measurements to resize the chat panel when the on-screen keyboard appears, keeping the conversation scroll area and composer visible.
- Browser testing on physical iOS/Android devices remains required.


## Mobile follow-up from device preview
- Explicitly force the top action cluster to flex-direction: row on narrow phone widths, overriding the legacy column rule at max-width 520px. Keep all four controls aligned horizontally without wrapping.
- Enter submits the Eva message on both desktop and mobile; Shift+Enter inserts a newline.
- Hide the keyboard shortcut hint beneath the composer on mobile. Keep the explicit send button available.


## Third-person mobile walkthrough controls
- Added a floating virtual joystick for mobile movement: it appears at the initial touch point on the left half of the 3D viewport, controls forward/backward movement and left/right facing, and returns to center when released.
- Right-side touch drag controls camera yaw and pitch independently, allowing simultaneous two-thumb movement and looking.
- Desktop keyboard/mouse and existing on-screen direction controls remain available outside the mobile breakpoint.
- Added pointer capture, pointer-cancel and window-blur cleanup to avoid stuck movement; mobile touch-action is disabled only while in walk mode.
- This is an initial implementation pass; verify on real Android/iOS hardware for thumb reach, touch concurrency, camera feel, and safe-area behavior before production.


## Walkthrough UX and HUD conflict prevention
- Restrict touch-control start zones to the central/lower viewport so touches near the top status area and bottom controls do not initiate movement or camera look.
- Clamp the floating joystick origin within the stage bounds so its visual base does not spill outside the 3D viewport.
- Suppress synthetic tap/click actions after touch gestures, preventing accidental target selection when a player releases a movement or camera touch.
- Ease character movement in and out instead of starting/stopping at full speed; camera follow smoothing is frame-rate independent.
- On mobile walkthrough mode, retain a compact sector/status header, hide nonessential hints/tools and secondary dock actions, and center the exit control at the bottom. Keep the joystick and camera hint in separate lower side zones with safe-area spacing.
- Keep HUD overlays pointer-transparent except for actual controls; desktop keyboard/mouse and desktop directional controls remain available.
- Validate in browser emulation and on real phones before production, including small screens, safe-area insets, two-finger input, and opening/closing walk mode.


## Mobile overflow and walkable dólka identity cards
- Added inward-facing facade identity plaques for each of the 60 dólka modules. Plaques show the module number, level and human-readable name; they are visible only in walkthrough mode and only on the currently visible floor.
- Tapping a dólka while walking now opens an in-scene information card instead of immediately moving the character. The card shows its name, description, level and explicit concept/not-built status.
- Added an explicit route action to approach the selected module; route and elevator logic remain in the existing navigation system. Closing the card does not move the character.
- Improved mobile side-sheet, search-dialog and walk-lift sizing with dynamic viewport units, safe-area insets, internal scrolling and overscroll containment. Long labels and metadata can wrap instead of being cut off.
- The mobile info card is kept in the upper-left of the 3D scene so it avoids the lower movement/exit controls; the right camera-look area stays available.
- Static source checks passed. Real-device visual checks remain required for 320px-wide phones, short landscape screens, two-finger input while labels are visible, and long object descriptions.
