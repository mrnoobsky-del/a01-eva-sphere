(function (global, document) {
  "use strict";

  if (global.A01_AGENT_EYE_CAMERA) return;

  const state = {
    status: "idle",
    agentId: null,
    api: null,
    scene: null,
    headObject: null,
    camera: null,
    renderer: null,
    canvas: null,
    stream: null,
    videoElement: null,
    raf: 0,
    expiryTimer: 0,
    lastFrameAt: 0,
    sequence: 0,
    options: null,
    authorization: null,
    error: null
  };

  const defaults = {
    width: 640,
    height: 360,
    fps: 6,
    fov: 78,
    near: 0.05,
    far: 80,
    mountPosition: [0, 0, -0.08],
    mountQuaternion: [0, 0, 0, 1],
    frameId: "eye_camera_optical",
    sourceId: "android-01-eye-camera-sim",
    provenance: "simulated",
    pixelRatio: 1,
    antialias: true
  };

  function emit(name, detail) {
    global.dispatchEvent(new CustomEvent("a01-agent-eye:" + name, { detail: detail || {} }));
  }

  function nowIso() {
    return new Date().toISOString();
  }

  function isObject3D(value) {
    return Boolean(value && typeof value.add === "function" && typeof value.remove === "function" && value.position && value.quaternion && value.matrixWorld);
  }

  function validateAuthorization(authorization) {
    if (!authorization || typeof authorization !== "object") throw new Error("Для включения глазного потока требуется отдельное разрешение оператора.");
    if (typeof authorization.authorizationId !== "string" || !authorization.authorizationId.trim()) throw new Error("В разрешении отсутствует authorizationId.");
    if (!["operator", "device_owner", "user"].includes(authorization.grantedBy)) throw new Error("Недопустимый источник разрешения.");
    if (!Array.isArray(authorization.scope) || !authorization.scope.includes("local_eye_stream")) throw new Error("Разрешение не включает local_eye_stream.");
    const grantedAt = Date.parse(authorization.grantedAt || "");
    if (!Number.isFinite(grantedAt) || grantedAt > Date.now()) throw new Error("В разрешении отсутствует корректное время выдачи.");
    const expiresAt = Date.parse(authorization.expiresAt || "");
    if (!Number.isFinite(expiresAt) || expiresAt <= Date.now() || expiresAt <= grantedAt) throw new Error("Разрешение отсутствует или уже истекло.");
  }

  function cleanupVideo() {
    if (!state.videoElement) return;
    try {
      state.videoElement.pause();
      state.videoElement.srcObject = null;
    } catch (error) {
      // Video element cleanup is best-effort.
    }
    state.videoElement = null;
  }

  function stopLoop() {
    if (state.raf) global.cancelAnimationFrame(state.raf);
    state.raf = 0;
    state.lastFrameAt = 0;
  }

  function stop() {
    stopLoop();
    if (state.expiryTimer) global.clearTimeout(state.expiryTimer);
    state.expiryTimer = 0;
    if (state.stream) state.stream.getTracks().forEach(function (track) { track.stop(); });
    state.stream = null;
    cleanupVideo();
    state.authorization = null;
    if (state.status === "streaming") state.status = state.headObject ? "attached" : "idle";
    emit("stopped", { agentId: state.agentId, at: nowIso() });
    return getStatus();
  }

  function renderLoop(timestamp) {
    if (state.status !== "streaming" || !state.renderer || !state.scene || !state.camera) return;
    const expiresAt = state.authorization ? Date.parse(state.authorization.expiresAt) : 0;
    if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
      stop();
      emit("permission-expired", { agentId: state.agentId, at: nowIso() });
      return;
    }
    state.raf = global.requestAnimationFrame(renderLoop);
    const interval = 1000 / state.options.fps;
    if (state.lastFrameAt && timestamp - state.lastFrameAt < interval) return;
    state.lastFrameAt = timestamp;

    try {
      state.scene.updateMatrixWorld(true);
      state.camera.updateMatrixWorld(true);
      state.renderer.render(state.scene, state.camera);
      state.sequence += 1;
      emit("frame", {
        agentId: state.agentId,
        sequence: state.sequence,
        capturedAt: nowIso(),
        sourceId: state.options.sourceId,
        frameId: state.options.frameId,
        width: state.options.width,
        height: state.options.height,
        provenance: state.options.provenance
      });
    } catch (error) {
      state.error = error && error.message ? error.message : String(error);
      state.status = "fault";
      stopLoop();
      if (state.stream) state.stream.getTracks().forEach(function (track) { track.stop(); });
      state.stream = null;
      cleanupVideo();
      emit("error", { agentId: state.agentId, message: state.error, at: nowIso() });
    }
  }

  function attach(config) {
    if (!config || typeof config !== "object") throw new Error("attach ожидает объект конфигурации.");
    const api = config.api || global.EVA_SPHERE;
    const THREE = api && api.THREE;
    const headObject = config.headObject;
    if (!THREE || !THREE.PerspectiveCamera || !THREE.WebGLRenderer || !api.scene) throw new Error("Не найден совместимый window.EVA_SPHERE API (THREE и scene).");
    if (!isObject3D(headObject)) throw new Error("headObject должен быть реальным THREE.Object3D/Bone головы Android-01.");

    detach();

    const options = Object.assign({}, defaults, config.options || {});
    options.width = Math.max(160, Math.floor(Number(options.width) || defaults.width));
    options.height = Math.max(90, Math.floor(Number(options.height) || defaults.height));
    options.fps = Math.max(1, Math.min(15, Number(options.fps) || defaults.fps));
    options.fov = Math.max(45, Math.min(110, Number(options.fov) || defaults.fov));
    if (!Array.isArray(options.mountPosition) || options.mountPosition.length !== 3) throw new Error("mountPosition должен содержать три координаты.");
    if (!Array.isArray(options.mountQuaternion) || options.mountQuaternion.length !== 4) throw new Error("mountQuaternion должен содержать кватернион XYZW.");
    if (typeof options.frameId !== "string" || !options.frameId.trim()) throw new Error("frameId обязателен.");
    if (typeof options.sourceId !== "string" || !options.sourceId.trim()) throw new Error("sourceId обязателен.");

    const canvas = document.createElement("canvas");
    canvas.width = options.width;
    canvas.height = options.height;
    canvas.setAttribute("aria-hidden", "true");

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: Boolean(options.antialias),
      alpha: false,
      preserveDrawingBuffer: false
    });
    renderer.setPixelRatio(options.pixelRatio);
    renderer.setSize(options.width, options.height, false);
    if ("outputColorSpace" in renderer && THREE.SRGBColorSpace) renderer.outputColorSpace = THREE.SRGBColorSpace;

    const camera = new THREE.PerspectiveCamera(options.fov, options.width / options.height, options.near, options.far);
    camera.name = "A01-AgentEyeCamera-" + (config.agentId || "android-01");
    camera.position.set(options.mountPosition[0], options.mountPosition[1], options.mountPosition[2]);
    camera.quaternion.set(options.mountQuaternion[0], options.mountQuaternion[1], options.mountQuaternion[2], options.mountQuaternion[3]);
    headObject.add(camera);

    state.agentId = config.agentId || "android-01";
    state.api = api;
    state.scene = api.scene;
    state.headObject = headObject;
    state.camera = camera;
    state.renderer = renderer;
    state.canvas = canvas;
    state.options = options;
    state.status = "attached";
    state.error = null;
    state.sequence = 0;
    emit("ready", {
      agentId: state.agentId,
      status: state.status,
      width: options.width,
      height: options.height,
      fps: options.fps,
      frameId: options.frameId,
      provenance: options.provenance
    });
    return getStatus();
  }

  function start(config) {
    if (!state.headObject || !state.renderer || !state.canvas) throw new Error("Сначала подключите AgentEyeCamera к объекту головы Android-01.");
    if (state.status === "streaming") return getStream();
    const settings = config || {};
    validateAuthorization(settings.authorization);
    if (typeof state.canvas.captureStream !== "function") throw new Error("Браузер не поддерживает HTMLCanvasElement.captureStream().");

    state.authorization = settings.authorization;
    state.stream = state.canvas.captureStream(state.options.fps);
    state.status = "streaming";
    const remainingPermissionMs = Date.parse(settings.authorization.expiresAt) - Date.now();
    state.expiryTimer = global.setTimeout(function () {
      stop();
      emit("permission-expired", { agentId: state.agentId, at: nowIso() });
    }, remainingPermissionMs);
    if (settings.videoElement) {
      state.videoElement = settings.videoElement;
      state.videoElement.muted = true;
      state.videoElement.playsInline = true;
      state.videoElement.srcObject = state.stream;
      const playResult = state.videoElement.play();
      if (playResult && typeof playResult.catch === "function") playResult.catch(function (error) {
        emit("preview-blocked", { agentId: state.agentId, message: error.message || "Playback requires a user gesture." });
      });
    }
    state.raf = global.requestAnimationFrame(renderLoop);
    emit("streaming", {
      agentId: state.agentId,
      authorizationId: settings.authorization.authorizationId,
      expiresAt: settings.authorization.expiresAt,
      destination: "local_only",
      at: nowIso()
    });
    return state.stream;
  }

  function captureFrame() {
    if (state.status !== "streaming" || !state.canvas) return Promise.reject(new Error("Кадр доступен только во время явно разрешённой локальной сессии."));
    return new Promise(function (resolve, reject) {
      state.canvas.toBlob(function (blob) {
        if (!blob) return reject(new Error("Не удалось получить кадр из eye canvas."));
        resolve({
          blob: blob,
          metadata: {
            agentId: state.agentId,
            sourceId: state.options.sourceId,
            frameId: state.options.frameId,
            sequence: state.sequence,
            capturedAt: nowIso(),
            width: state.options.width,
            height: state.options.height,
            mimeType: blob.type || "image/png",
            provenance: state.options.provenance
          }
        });
      }, "image/jpeg", 0.86);
    });
  }

  function getStream() {
    return state.stream;
  }

  function getStatus() {
    return {
      status: state.status,
      agentId: state.agentId,
      frameId: state.options ? state.options.frameId : null,
      sequence: state.sequence,
      width: state.options ? state.options.width : null,
      height: state.options ? state.options.height : null,
      fps: state.options ? state.options.fps : null,
      provenance: state.options ? state.options.provenance : null,
      error: state.error
    };
  }

  function detach() {
    stop();
    if (state.headObject && state.camera) state.headObject.remove(state.camera);
    if (state.renderer) state.renderer.dispose();
    if (state.canvas && state.canvas.parentNode) state.canvas.parentNode.removeChild(state.canvas);
    state.agentId = null;
    state.api = null;
    state.scene = null;
    state.headObject = null;
    state.camera = null;
    state.renderer = null;
    state.canvas = null;
    state.options = null;
    state.status = "idle";
    state.error = null;
    return getStatus();
  }

  function onHeadReady(event) {
    const detail = event && event.detail;
    if (!detail || !detail.headObject) return;
    if (detail.agentId && detail.agentId !== "android-01") return;
    try {
      attach({
        agentId: detail.agentId || "android-01",
        headObject: detail.headObject,
        api: detail.api || global.EVA_SPHERE,
        options: detail.eyeCameraOptions || {}
      });
    } catch (error) {
      stop();
      state.status = "waiting_for_head";
      state.error = error && error.message ? error.message : String(error);
      emit("error", { agentId: detail.agentId || "android-01", message: state.error, at: nowIso() });
    }
  }

  global.addEventListener("a01-agent:head-ready", onHeadReady);
  global.A01_AGENT_EYE_CAMERA = {
    version: "0.1.0",
    attach: attach,
    start: start,
    stop: stop,
    captureFrame: captureFrame,
    getStream: getStream,
    getStatus: getStatus,
    detach: detach,
    destroy: function () { detach(); global.removeEventListener("a01-agent:head-ready", onHeadReady); delete global.A01_AGENT_EYE_CAMERA; }
  };

  console.info("[A-01 AgentEyeCamera] v0.1 adapter loaded; waiting for the Android-01 head Object3D.");
})(window, document);
