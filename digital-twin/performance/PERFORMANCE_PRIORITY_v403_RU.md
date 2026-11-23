# A-01 v4.0.3 — Performance Priority profile

This specification accompanies the locally integrated v4.0.3 performance-priority HTML build.

## Actual changes
- No artificial frame cap is used. The scene is synchronized through requestAnimationFrame and the display refresh.
- The renderer starts with a conservative device-pixel-ratio budget: 0.92 on a capable desktop, 0.76 on a low-power desktop or standard mobile, 0.62 on a low-power mobile device.
- MSAA is disabled to reduce GPU cost. This trades some edge smoothness for render headroom.
- Adaptive pixel ratio can lower resolution to 0.52 desktop / 0.38 mobile when frame intervals miss the target.
- A ten-second benchmark rotates the camera and measures real renderer.render() intervals. It reports average FPS and p95 frame interval; it never counts Frame Generation.
- An idle scene intentionally stops rendering to save power. The panel labels this state “СТАТИКА”; use the benchmark or move the camera to measure active rendering.

## Important correction
The v4.x source already used activeFrameInterval = 0 and already used InstancedMesh for the 12 floor spokes on each level. Those were not new optimizations in the previous performance-layer patch and should not be credited as new speedups.

## Acceptance
A build is not accepted as “60 FPS achieved” until the benchmark has been run on the target PC with WebGL available. Target: at least 59 FPS average and p95 frame interval no more than 16.67 ms, without synthetic frame insertion. Repeat after ten minutes to catch thermal throttling.

The performance-priority HTML is distributed separately from this documentation until its integrated source is uploaded to this branch. The diagnostic-only module in this PR remains a reusable instrumentation component.
