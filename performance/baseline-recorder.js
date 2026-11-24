(() => {
  "use strict";

  window.runA01PerformanceBaseline = function runA01PerformanceBaseline(options = {}) {
    const durationMs = Math.max(10000, Math.min(180000, Number(options.durationMs) || 60000));
    const app = window.EVA_SPHERE;

    if (!app || !app.renderer || !app.controls || !app.camera) {
      throw new Error("A-01 scene is not ready. Wait for the 3D model to finish loading.");
    }
    if (window.__A01_PERF_BASELINE?.running) {
      throw new Error("A-01 performance baseline is already running. Use window.__A01_PERF_BASELINE.stop().");
    }

    const state = typeof app.getState === "function" ? app.getState() : {};
    if (state.walkMode) {
      throw new Error("Exit first-person walk mode and return to the general overview before starting the baseline.");
    }
    if (!app.controls.enabled) {
      throw new Error("Orbit controls are disabled. Return to the general overview and try again.");
    }

    const renderer = app.renderer;
    const controls = app.controls;
    const camera = app.camera;
    const originalRender = renderer.render;
    const originalAutoRotate = controls.autoRotate;
    const originalAutoRotateSpeed = controls.autoRotateSpeed;
    const originalCameraPosition = camera.position.clone();
    const originalTarget = controls.target.clone();

    const intervals = [];
    const renderSubmitMs = [];
    const drawCalls = [];
    const triangles = [];
    const geometryCounts = [];
    const textureCounts = [];
    let lastRenderEnd = null;
    let running = true;
    let timer = null;
    const startedAt = performance.now();

    const percentile = (values, q) => {
      if (!values.length) return null;
      const sorted = values.slice().sort((a, b) => a - b);
      const index = Math.min(sorted.length - 1, Math.max(0, Math.ceil(q * sorted.length) - 1));
      return Number(sorted[index].toFixed(3));
    };

    const average = values => values.length
      ? Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(3))
      : null;

    const finish = reason => {
      if (!running) return;
      running = false;
      if (timer !== null) clearTimeout(timer);

      renderer.render = originalRender;
      controls.autoRotate = originalAutoRotate;
      controls.autoRotateSpeed = originalAutoRotateSpeed;
      controls.target.copy(originalTarget);
      camera.position.copy(originalCameraPosition);
      controls.update();

      const elapsedMs = performance.now() - startedAt;
      const intervalTotal = intervals.reduce((sum, value) => sum + value, 0);
      const result = {
        test: "A-01 v4.0.0 renderer cadence baseline",
        status: reason,
        durationMs: Number(elapsedMs.toFixed(1)),
        sampleCount: intervals.length,
        averageFps: intervalTotal > 0
          ? Number((intervals.length * 1000 / intervalTotal).toFixed(2))
          : null,
        frameIntervalMs: {
          p50: percentile(intervals, 0.50),
          p95: percentile(intervals, 0.95),
          p99: percentile(intervals, 0.99),
          average: average(intervals),
          over16_67ms: intervals.filter(value => value > 16.67).length,
          over33_3ms: intervals.filter(value => value > 33.3).length
        },
        rendererSubmitCpuMs: {
          average: average(renderSubmitMs),
          p95: percentile(renderSubmitMs, 0.95),
          max: renderSubmitMs.length ? Number(Math.max(...renderSubmitMs).toFixed(3)) : null
        },
        threeJs: {
          drawCallsMedian: percentile(drawCalls, 0.50),
          drawCallsMax: drawCalls.length ? Math.max(...drawCalls) : null,
          trianglesMedian: percentile(triangles, 0.50),
          trianglesMax: triangles.length ? Math.max(...triangles) : null,
          geometries: geometryCounts.length ? geometryCounts[geometryCounts.length - 1] : null,
          textures: textureCounts.length ? textureCounts[textureCounts.length - 1] : null,
          rendererPixelRatio: renderer.getPixelRatio(),
          canvasWidth: renderer.domElement.width,
          canvasHeight: renderer.domElement.height,
          maxTextureSize: renderer.capabilities.maxTextureSize
        },
        device: {
          userAgent: navigator.userAgent,
          hardwareConcurrency: navigator.hardwareConcurrency || null,
          deviceMemoryGB: navigator.deviceMemory || null,
          viewport: { width: innerWidth, height: innerHeight },
          devicePixelRatio
        },
        method: "Intervals between actual renderer.render() completions during controlled OrbitControls auto-rotation.",
        limitation: "rendererSubmitCpuMs is CPU-side command-submission time, not GPU execution time or display presentation time."
      };

      window.__A01_PERF_BASELINE = { running: false, result, stop: null };
      console.group("A-01 Performance baseline complete");
      console.log("Copy this JSON into the benchmark report:");
      console.log(JSON.stringify(result, null, 2));
      console.table({
        averageFPS: result.averageFps,
        frameP50ms: result.frameIntervalMs.p50,
        frameP95ms: result.frameIntervalMs.p95,
        frameP99ms: result.frameIntervalMs.p99,
        drawCallsMedian: result.threeJs.drawCallsMedian,
        trianglesMedian: result.threeJs.trianglesMedian
      });
      console.info("For a complete baseline, repeat the same test three times on the same device and browser.");
      console.groupEnd();
      return result;
    };

    renderer.render = function instrumentedRender(...args) {
      const result = originalRender.apply(this, args);
      const end = performance.now();
      if (running) {
        if (lastRenderEnd !== null) intervals.push(end - lastRenderEnd);
        lastRenderEnd = end;
        renderSubmitMs.push(end - (end - 0));
        const info = renderer.info || {};
        drawCalls.push(info.render?.calls ?? 0);
        triangles.push(info.render?.triangles ?? 0);
        geometryCounts.push(info.memory?.geometries ?? 0);
        textureCounts.push(info.memory?.textures ?? 0);
      }
      return result;
    };

    window.__A01_PERF_BASELINE = {
      running: true,
      stop: () => finish("stopped manually"),
      result: null
    };

    controls.autoRotate = true;
    controls.update();
    timer = setTimeout(() => finish("completed"), durationMs);

    console.info("A-01 baseline started. Keep this tab focused; controlled auto-rotation runs for about " +
      Math.round(durationMs / 1000) + " seconds. Stop early with window.__A01_PERF_BASELINE.stop().");

    return window.__A01_PERF_BASELINE;
  };
})();
