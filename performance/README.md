# A-01 Performance — 60 FPS Without Visual Quality Loss

**Document version:** 0.1  
**Date:** 24 November 2026  
**Status:** target and measurement protocol; actual performance has not yet been measured.

## 1. Goal

Reach a sustained 60 frames per second in the browser-based A-01 digital twin on agreed reference devices while preserving the approved visual standard: geometry, detail readability, materials, lighting, shadows, colour and animation smoothness.

At 60 FPS, the frame budget is approximately **16.67 ms per frame**. This is the budget for the whole frame, not JavaScript or GPU time alone. Average FPS by itself is not proof of smoothness.

The target applies to tested device/browser configurations. It is not a guarantee of 60 FPS on every device.

## 2. Scope and baseline

The repository currently identifies **A-01 v4.0.0** on the main branch as its primary digital-twin build. Its documentation lists Three.js 0.185.0 and states that browser WebGL verification is still outstanding.

There is **no confirmed baseline FPS measurement** yet. First capture the unchanged build; then optimize the measured bottleneck.

This plan does not change the physical or engineering status of the Sphere and does not certify a real-world installation.

## 3. Acceptance criteria

| Metric | Target |
|---|---:|
| Target cadence | 60 FPS |
| Frame budget | ≤ 16.67 ms |
| 95th percentile frame time (p95) | ≤ 16.67 ms |
| 99th percentile frame time (p99) | ≤ 33.3 ms |
| Repeatability | 3 equivalent runs |
| Visual quality | no unintended degradation |

p95/p99 are calculated from intervals between consecutive frames during the measured segment. Each report also includes average FPS, a frame-time plot, and counts of frames longer than 16.67 ms and 33.3 ms. Rare shader/resource-loading stalls are recorded separately rather than hidden by an average.

These are project acceptance targets for reference hardware, not results already achieved.

## 4. Repeatable test scenario

Each report records:
- exact build file and commit SHA;
- OS, browser/version, CPU, GPU/driver and memory, where known;
- window/viewport size, output resolution and actual devicePixelRatio;
- quality settings, render scale and shadow configuration;
- device power/thermal state when it may affect clock speeds;
- date, warm-up duration and measurement duration.

**Standard run:**

1. Open the build in a focused tab and wait for models, textures and shaders to load.
2. Perform the same action sequence and warm up the scene for 15 seconds.
3. Measure for at least 60 seconds without tab switching or resizing the window.
4. Repeat the scenario three times on the same configuration.
5. Save frame-time p50/p95/p99, average FPS, long-frame counts and observations.
6. Repeat on desktop and a mobile device. Do not mix devices or test conditions in one result.

**The workload route includes:** initial scene; entrance and vestibule; first-person movement along the ring; a full atrium camera rotation; all five levels; opening/closing doors; active animations; an object panel/card; and the most visually dense available view.

The report notes which actions were manual. The route may later be automated, but automation must not change the workload or visual result.

## 5. What to measure

### Frame and browser

- requestAnimationFrame intervals: p50, p95, p99, average and outlier counts.
- Main thread: long JavaScript tasks, layout/style recalculation, paint and garbage collection.
- Loading: time to first frame, asset loading and shader compilation, reported separately from sustained FPS.
- Console: WebGL errors, shader compile/link errors, context loss and failed resources.

### Three.js and GPU

Use available WebGLRenderer.info diagnostics for draw calls, triangles, geometry and texture counts. These are diagnostic counters, not precise VRAM measurements.

Use Chrome DevTools Performance to inspect main-thread work and frame delivery. Measure GPU time separately only when browser/device support is available; do not substitute JavaScript time for GPU time.

Disable FPS overlays and detailed debug counters during final runs if they noticeably affect results.

## 6. Optimization order

Optimize only a confirmed bottleneck. After every change, rerun the same workload and keep the result.

1. **Profile first.** Determine whether the limit is CPU, GPU, memory bandwidth, asset loading or DOM/UI work.
2. **Reuse resources.** Avoid recreating identical geometry and materials; share resources and dispose of temporary resources correctly.
3. **Repeated objects.** Consider instancing for compatible repeated static modules and elements. Do not combine objects that require independent animation or selection.
4. **Reduce CPU work.** Avoid unnecessary per-frame arrays, vectors and objects; do not update DOM every frame; run raycasts and recalculations only when needed; avoid duplicate animation loops.
5. **Scene visibility.** Check frustum culling; separate static and dynamic elements; use LOD or occlusion only after visually reviewing transitions and avoiding visible detail popping.
6. **Geometry and materials.** Remove invisible internal surfaces and duplicates only when genuinely unnecessary; simplify only low-visibility elements; reduce unique materials and draw calls without changing the scene's character.
7. **Textures.** Check actual dimensions, formats, mipmaps and reuse. Apply GPU-friendly compression and loading optimizations only after device support and artifact checks.
8. **Lighting and shadows.** Identify expensive lights; limit dynamic shadow casters; tune shadow-map coverage and resolution. Do not disable all shadows or flatten lighting as the first route to higher FPS.
9. **Loading and UI.** Separate startup loading from frame time; where needed, load distant or optional resources on demand while keeping the primary route immediately available.

## 7. Visual guardrails

For before/after comparisons, use the same cameras, viewport, devicePixelRatio, colour settings, lighting and quality configuration.

Without a separate decision, do not:
- disable shadows, antialiasing or key effects globally;
- permanently reduce render resolution;
- remove architectural details or objects important for navigation;
- simplify the dome, radial modules, entrances or vestibules' silhouettes;
- change materials, colour or lighting so that the scene looks materially different.

LOD, distant-detail simplification and adaptive quality modes are acceptable when transitions are visually controlled, navigation remains clear and the result is not presented as the original maximum-quality setting. The primary mode remains the agreed high-quality mode.

## 8. Change and regression rules

- Preserve a working point and use a separate branch or commit for experiments.
- One experiment should represent one measurable change.
- Do not overwrite stable builds or historical versions.
- After every change, check the console, loading, desktop/mobile, all five levels, controls, doors and key object cards.
- If FPS improves but visual acceptance fails, reject the change.
- If results vary across the three runs, investigate the cause instead of publishing the best single result.

## 9. Milestones

| Stage | Deliverable |
|---|---|
| P0 — Baseline | Device, build, route, p50/p95/p99 and screenshots recorded before optimization |
| P1 — Diagnosis | Main CPU/GPU/loading bottleneck identified with evidence |
| P2 — Low-risk improvements | Resource reuse and unnecessary CPU/UI work removed |
| P3 — Scene and renderer | Culling, instancing, geometry, materials, textures, lighting and shadows tuned from profiling evidence |
| P4 — Retest | Three desktop and mobile runs compared with baseline |
| P5 — Acceptance | Performance targets and visual guardrails met; report published |

## 10. Status at creation

- [x] 60 FPS goal and 16.67 ms frame budget recorded.
- [x] Repeatable test protocol documented.
- [x] Visual guardrails and optimization sequence documented.
- [ ] Baseline measurements — not completed.
- [ ] CPU/GPU profiling — not completed.
- [ ] 60 FPS verified on reference desktop/mobile devices — not completed.

The first practical step is to run the unchanged v4.0.0 primary build in a real browser, capture the baseline, and record the exact device and conditions. Claims that 60 FPS has been achieved would be premature before that.

## Related documents

- [P0 — static source review of v4.0.0 (Russian)](P0-STATIC-SOURCE-REVIEW-v4.0.0_RU.md)
- [Browser baseline recorder](baseline-recorder.js)

- [A-01 v4.0.0 build documentation](../digital-twin/README_v400.md)
- [Русская версия плана](README_RU.md)
- [Benchmark report template](BENCHMARK-REPORT-TEMPLATE_RU.md)
