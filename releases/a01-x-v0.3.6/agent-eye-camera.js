/**
 * A-01 X v0.3.6 — AgentEyeCamera.
 * Independent, head-bone-mounted first-person camera for the digital Android-01.
 * The camera renders locally only; it does not upload frames or control actuators.
 */

export class A01AgentEyeCamera {
  constructor(THREE, config = {}) {
    if (!THREE?.PerspectiveCamera || !THREE?.WebGLRenderer) throw new Error('AgentEyeCamera requires Three.js PerspectiveCamera and WebGLRenderer.');
    if (!config.scene || typeof config.scene.updateMatrixWorld !== 'function') throw new Error('AgentEyeCamera requires the A-01 scene.');
    if (!config.headObject || typeof config.headObject.add !== 'function' || typeof config.headObject.remove !== 'function') throw new Error('AgentEyeCamera requires the actual Android-01 head THREE.Bone.');

    this.THREE = THREE;
    this.scene = config.scene;
    this.headObject = config.headObject;
    this.mainRenderer = config.mainRenderer || null;
    this.documentRef = config.documentRef || globalThis.document;
    this.windowRef = config.windowRef || globalThis.window;
    this.now = config.now || (() => Date.now());
    this.requestFrame = config.requestAnimationFrame || this.windowRef?.requestAnimationFrame?.bind(this.windowRef);
    this.cancelFrame = config.cancelAnimationFrame || this.windowRef?.cancelAnimationFrame?.bind(this.windowRef);
    this.setTimer = config.setTimeout || this.windowRef?.setTimeout?.bind(this.windowRef);
    this.clearTimer = config.clearTimeout || this.windowRef?.clearTimeout?.bind(this.windowRef);
    this.agentId = config.agentId || 'android-01';
    this.options = Object.assign({
      width: 640, height: 360, fps: 6, fov: 78, near: 0.035, far: 90,
      position: [0, 0.02, 0.235], yawRadians: Math.PI,
      sourceId: 'android-01-eye-camera',
      frameId: 'android-01-head-eye-camera',
      provenance: 'simulated', pixelRatio: 1
    }, config.options || {});

    this.options.width = Math.max(160, Math.floor(Number(this.options.width) || 640));
    this.options.height = Math.max(90, Math.floor(Number(this.options.height) || 360));
    this.options.fps = Math.max(1, Math.min(15, Number(this.options.fps) || 6));
    this.options.fov = Math.max(45, Math.min(110, Number(this.options.fov) || 78));

    this.status = 'idle';
    this.error = null;
    this.sequence = 0;
    this.lastRenderAt = 0;
    this.rafId = 0;
    this.expiryTimer = 0;
    this.authorization = null;
    this.stream = null;
    this.videoElement = null;

    this.canvas = this.documentRef.createElement('canvas');
    this.canvas.width = this.options.width;
    this.canvas.height = this.options.height;
    this.canvas.setAttribute('aria-hidden', 'true');

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas, antialias: true, alpha: false,
      powerPreference: 'low-power', preserveDrawingBuffer: false
    });
    this.renderer.setPixelRatio(this.options.pixelRatio);
    this.renderer.setSize(this.options.width, this.options.height, false);
    if (THREE.SRGBColorSpace) this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    if (this.mainRenderer) {
      if ('toneMapping' in this.mainRenderer) this.renderer.toneMapping = this.mainRenderer.toneMapping;
      if ('toneMappingExposure' in this.mainRenderer) this.renderer.toneMappingExposure = this.mainRenderer.toneMappingExposure;
      if (this.mainRenderer.shadowMap) {
        this.renderer.shadowMap.enabled = this.mainRenderer.shadowMap.enabled;
        this.renderer.shadowMap.type = this.mainRenderer.shadowMap.type;
      }
    }

    this.camera = new THREE.PerspectiveCamera(this.options.fov, this.options.width / this.options.height, this.options.near, this.options.far);
    this.camera.name = 'A01-ANDROID-01-EYE-CAMERA';
    this.camera.position.set(...this.options.position);
    this.camera.rotation.order = 'YXZ';
    this.camera.rotation.y = this.options.yawRadians;
    this.headObject.add(this.camera);
    this.headObject.updateMatrixWorld?.(true);
    this.status = 'attached';
  }

  emit(type, detail = {}) {
    if (typeof this.windowRef?.dispatchEvent !== 'function') return;
    const EventClass = this.windowRef.CustomEvent || globalThis.CustomEvent;
    if (EventClass) this.windowRef.dispatchEvent(new EventClass(`a01-agent-eye:${type}`, {
      detail: Object.assign({ agentId: this.agentId, at: new Date(this.now()).toISOString() }, detail)
    }));
  }

  validateAuthorization(authorization) {
    if (!authorization || typeof authorization !== 'object') throw new Error('Для включения глазной камеры требуется отдельное разрешение оператора.');
    if (typeof authorization.authorizationId !== 'string' || !authorization.authorizationId.trim()) throw new Error('В разрешении отсутствует authorizationId.');
    if (!['operator', 'device_owner', 'user'].includes(authorization.grantedBy)) throw new Error('Недопустимый источник разрешения.');
    if (!Array.isArray(authorization.scope) || !authorization.scope.includes('local_eye_stream')) throw new Error('Разрешение не включает local_eye_stream.');
    const grantedAt = Date.parse(authorization.grantedAt || '');
    const expiresAt = Date.parse(authorization.expiresAt || '');
    if (!Number.isFinite(grantedAt) || grantedAt > this.now()) throw new Error('Некорректное время выдачи разрешения.');
    if (!Number.isFinite(expiresAt) || expiresAt <= this.now() || expiresAt <= grantedAt) throw new Error('Разрешение отсутствует или уже истекло.');
  }

  start({ authorization, videoElement = null } = {}) {
    if (this.status === 'destroyed') throw new Error('AgentEyeCamera уже уничтожена.');
    if (this.status === 'streaming') return this.stream;
    if (typeof this.requestFrame !== 'function' || typeof this.cancelFrame !== 'function' || typeof this.setTimer !== 'function' || typeof this.clearTimer !== 'function') {
      throw new Error('AgentEyeCamera requires browser animation-frame and timer APIs.');
    }
    this.validateAuthorization(authorization);
    if (typeof this.canvas.captureStream !== 'function') throw new Error('Этот браузер не поддерживает HTMLCanvasElement.captureStream().');

    this.authorization = authorization;
    this.stream = this.canvas.captureStream(this.options.fps);
    this.status = 'streaming';
    this.error = null;
    const delay = Date.parse(authorization.expiresAt) - this.now();
    this.expiryTimer = this.setTimer(() => {
      this.stop();
      this.emit('permission-expired', { authorizationId: authorization.authorizationId });
    }, delay);

    if (videoElement) {
      this.videoElement = videoElement;
      videoElement.muted = true;
      videoElement.playsInline = true;
      videoElement.srcObject = this.stream;
      const playResult = videoElement.play?.();
      if (playResult?.catch) playResult.catch(error => this.emit('preview-blocked', { message: error?.message || 'Video playback needs a user gesture.' }));
    }

    this.renderOnce();
    this.rafId = this.requestFrame(this.tick);
    this.emit('streaming', {
      authorizationId: authorization.authorizationId, expiresAt: authorization.expiresAt,
      destination: 'local_only', sourceId: this.options.sourceId,
      frameId: this.options.frameId, fps: this.options.fps
    });
    return this.stream;
  }

  tick = timestamp => {
    if (this.status !== 'streaming') return;
    if (!this.authorization || Date.parse(this.authorization.expiresAt) <= this.now()) {
      const authorizationId = this.authorization?.authorizationId || null;
      this.stop();
      this.emit('permission-expired', { authorizationId });
      return;
    }
    this.rafId = this.requestFrame(this.tick);
    const interval = 1000 / this.options.fps;
    if (this.lastRenderAt && timestamp - this.lastRenderAt < interval) return;
    this.lastRenderAt = timestamp;
    this.renderOnce();
  };

  renderOnce() {
    if (!this.renderer || !this.camera || !this.scene) return;
    try {
      this.scene.updateMatrixWorld(true);
      this.camera.updateMatrixWorld(true);
      this.renderer.render(this.scene, this.camera);
      this.sequence += 1;
      this.emit('frame', {
        sequence: this.sequence, capturedAt: new Date(this.now()).toISOString(),
        sourceId: this.options.sourceId, frameId: this.options.frameId,
        width: this.options.width, height: this.options.height,
        provenance: this.options.provenance
      });
    } catch (error) {
      this.error = error?.message || String(error);
      this.status = 'fault';
      if (this.rafId) this.cancelFrame(this.rafId);
      this.rafId = 0;
      if (this.expiryTimer) this.clearTimer(this.expiryTimer);
      this.expiryTimer = 0;
      this.authorization = null;
      this.stopTracks();
      this.emit('error', { message: this.error });
    }
  }

  captureFrame() {
    if (this.status !== 'streaming') return Promise.reject(new Error('Кадр доступен только во время разрешённой локальной сессии.'));
    return new Promise((resolve, reject) => {
      this.canvas.toBlob(blob => {
        if (!blob) return reject(new Error('Не удалось получить кадр с камеры Android-01.'));
        resolve({
          blob,
          metadata: {
            agentId: this.agentId, sourceId: this.options.sourceId,
            frameId: this.options.frameId, sequence: this.sequence,
            capturedAt: new Date(this.now()).toISOString(),
            width: this.options.width, height: this.options.height,
            mimeType: blob.type || 'image/jpeg',
            provenance: this.options.provenance, destination: 'local_only'
          }
        });
      }, 'image/jpeg', 0.88);
    });
  }

  stopTracks() {
    if (this.stream) this.stream.getTracks().forEach(track => track.stop());
    this.stream = null;
    if (this.videoElement) {
      try {
        this.videoElement.pause?.();
        this.videoElement.srcObject = null;
      } catch (error) { this.error = error?.message || String(error); }
      this.videoElement = null;
    }
  }

  stop() {
    if (this.rafId) this.cancelFrame(this.rafId);
    this.rafId = 0;
    this.lastRenderAt = 0;
    if (this.expiryTimer) this.clearTimer(this.expiryTimer);
    this.expiryTimer = 0;
    this.stopTracks();
    this.authorization = null;
    if (this.status !== 'destroyed') this.status = 'attached';
    this.emit('stopped', { status: this.status });
    return this.getStatus();
  }

  getStatus() {
    return {
      status: this.status, agentId: this.agentId,
      sourceId: this.options.sourceId, frameId: this.options.frameId,
      width: this.options.width, height: this.options.height,
      fps: this.options.fps, sequence: this.sequence,
      provenance: this.options.provenance,
      destination: this.status === 'streaming' ? 'local_only' : null,
      error: this.error
    };
  }

  destroy() {
    this.stop();
    this.headObject?.remove?.(this.camera);
    this.renderer?.dispose?.();
    this.status = 'destroyed';
    this.emit('destroyed');
  }
}

export function createA01AgentEyeCamera(THREE, config) {
  return new A01AgentEyeCamera(THREE, config);
}
