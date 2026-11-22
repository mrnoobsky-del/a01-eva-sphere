const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

function createHarness() {
  const listeners = new Map();
  const animationFrames = new Map();
  const timers = new Map();
  let nextTimerId = 1;
  let nextFrameId = 1;
  let lastRenderer = null;
  class FakeCustomEvent {
    constructor(type, options) { this.type = type; this.detail = options && options.detail; }
  }
  class Vector3 {
    set(x, y, z) { this.x = x; this.y = y; this.z = z; }
  }
  class Quaternion {
    set(x, y, z, w) { this.x = x; this.y = y; this.z = z; this.w = w; }
  }
  class Object3D {
    constructor() {
      this.children = [];
      this.parent = null;
      this.position = new Vector3();
      this.quaternion = new Quaternion();
      this.matrixWorld = {};
      this.rotation = {};
    }
    add(child) { child.parent = this; this.children.push(child); }
    remove(child) { this.children = this.children.filter(item => item !== child); child.parent = null; }
    updateMatrixWorld() {}
  }
  class PerspectiveCamera extends Object3D {
    constructor(fov, aspect, near, far) { super(); Object.assign(this, { fov, aspect, near, far }); }
    updateProjectionMatrix() {}
  }
  class FakeRenderer {
    constructor(options) {
      this.options = options;
      this.renderCount = 0;
      this.disposed = false;
      lastRenderer = this;
    }
    setPixelRatio(value) { this.pixelRatio = value; }
    setSize(width, height) { this.width = width; this.height = height; }
    render() { this.renderCount += 1; }
    dispose() { this.disposed = true; }
  }
  const THREE = { PerspectiveCamera, WebGLRenderer: FakeRenderer, SRGBColorSpace: 'srgb' };
  const scene = new Object3D();
  const spectatorCamera = new PerspectiveCamera(45, 1, 0.1, 100);
  const spectatorRenderer = { renderCount: 0 };
  const api = { THREE, scene, camera: spectatorCamera, renderer: spectatorRenderer };
  const window = {
    EVA_SPHERE: api,
    console: { info() {}, warn() {}, error() {} },
    addEventListener(type, callback) {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type).add(callback);
    },
    removeEventListener(type, callback) { if (listeners.has(type)) listeners.get(type).delete(callback); },
    dispatchEvent(event) { (listeners.get(event.type) || []).forEach(callback => callback(event)); },
    requestAnimationFrame(callback) { const id = nextFrameId++; animationFrames.set(id, callback); return id; },
    cancelAnimationFrame(id) { animationFrames.delete(id); },
    setTimeout(callback, delay) { const id = nextTimerId++; timers.set(id, { callback, delay }); return id; },
    clearTimeout(id) { timers.delete(id); }
  };
  const document = {
    createElement(name) {
      assert.equal(name, 'canvas');
      return {
        width: 0,
        height: 0,
        parentNode: null,
        setAttribute() {},
        captureStream(fps) {
          const track = { stopped: false, stop() { this.stopped = true; } };
          return { fps, tracks: [track], getTracks() { return this.tracks; } };
        },
        toBlob(callback, type) { callback({ size: 128, type: type || 'image/png' }); }
      };
    }
  };
  const context = { window, document, CustomEvent: FakeCustomEvent, console: window.console, Date, Promise, Number, Boolean, Object, Array, Math, Error, String, JSON };
  const sourcePath = path.join(__dirname, '..', 'agent-eye-camera.js');
  vm.runInNewContext(fs.readFileSync(sourcePath, 'utf8'), context, { filename: sourcePath });
  return { window, document, api, scene, spectatorCamera, spectatorRenderer, animationFrames, timers, get eyeRenderer() { return lastRenderer; } };
}

const permission = () => ({
  authorizationId: 'test-operator-authorization',
  grantedBy: 'operator',
  grantedAt: new Date(Date.now() - 1000).toISOString(),
  expiresAt: new Date(Date.now() + 60_000).toISOString(),
  scope: ['local_eye_stream']
});

test('attaches an independent eye camera to the supplied head object', () => {
  const h = createHarness();
  const head = new (h.api.THREE.PerspectiveCamera)();
  const mainCameraBefore = h.api.camera;
  const mainRendererBefore = h.api.renderer;
  const result = h.window.A01_AGENT_EYE_CAMERA.attach({ headObject: head, agentId: 'android-01' });
  assert.equal(result.status, 'attached');
  assert.equal(head.children.length, 1);
  assert.equal(head.children[0].name, 'A01-AgentEyeCamera-android-01');
  assert.equal(h.api.camera, mainCameraBefore);
  assert.equal(h.api.renderer, mainRendererBefore);
  assert.notEqual(h.eyeRenderer, mainRendererBefore);
});

test('refuses local streaming without a valid, unexpired explicit permission', () => {
  const h = createHarness();
  const head = new h.api.THREE.PerspectiveCamera();
  h.window.A01_AGENT_EYE_CAMERA.attach({ headObject: head });
  assert.throws(() => h.window.A01_AGENT_EYE_CAMERA.start(), /отдельное разрешение/);
  assert.throws(() => h.window.A01_AGENT_EYE_CAMERA.start({ authorization: { ...permission(), expiresAt: new Date(Date.now() - 1000).toISOString() } }), /истекло/);
  assert.equal(h.window.A01_AGENT_EYE_CAMERA.getStatus().status, 'attached');
});

test('starts a local stream, renders frames, captures a blob and stops tracks', async () => {
  const h = createHarness();
  const head = new h.api.THREE.PerspectiveCamera();
  const video = { muted: false, playsInline: false, srcObject: null, play() { this.played = true; return Promise.resolve(); }, pause() { this.paused = true; } };
  h.window.A01_AGENT_EYE_CAMERA.attach({ headObject: head, options: { fps: 5, width: 320, height: 180 } });
  const events = [];
  h.window.addEventListener('a01-agent-eye:frame', event => events.push(event.detail));
  const stream = h.window.A01_AGENT_EYE_CAMERA.start({ authorization: permission(), videoElement: video });
  assert.equal(h.window.A01_AGENT_EYE_CAMERA.getStatus().status, 'streaming');
  assert.equal(video.srcObject, stream);
  assert.equal(video.muted, true);
  const [frameId, frameCallback] = h.animationFrames.entries().next().value;
  h.animationFrames.delete(frameId);
  frameCallback(1000);
  assert.equal(h.eyeRenderer.renderCount, 1);
  assert.equal(events.length, 1);
  const captured = await h.window.A01_AGENT_EYE_CAMERA.captureFrame();
  assert.equal(captured.blob.size, 128);
  assert.equal(captured.metadata.provenance, 'simulated');
  h.window.A01_AGENT_EYE_CAMERA.stop();
  assert.equal(h.window.A01_AGENT_EYE_CAMERA.getStatus().status, 'attached');
  assert.equal(stream.tracks[0].stopped, true);
  assert.equal(video.srcObject, null);
});

test('auto-attaches only when the explicit Android-01 head-ready event supplies a head object', () => {
  const h = createHarness();
  const head = new h.api.THREE.PerspectiveCamera();
  h.window.dispatchEvent(new (class { constructor() { this.type = 'a01-agent:head-ready'; this.detail = { agentId: 'android-01', headObject: head, api: h.api }; } })());
  assert.equal(h.window.A01_AGENT_EYE_CAMERA.getStatus().status, 'attached');
  assert.equal(head.children.length, 1);
  const otherHead = new h.api.THREE.PerspectiveCamera();
  h.window.dispatchEvent(new (class { constructor() { this.type = 'a01-agent:head-ready'; this.detail = { agentId: 'another-agent', headObject: otherHead, api: h.api }; } })());
  assert.equal(otherHead.children.length, 0);
});

test('rejects a non-Object3D head target and detach preserves the main scene camera', () => {
  const h = createHarness();
  assert.throws(() => h.window.A01_AGENT_EYE_CAMERA.attach({ headObject: {} }), /THREE.Object3D/);
  const head = new h.api.THREE.PerspectiveCamera();
  h.window.A01_AGENT_EYE_CAMERA.attach({ headObject: head });
  h.window.A01_AGENT_EYE_CAMERA.detach();
  assert.equal(head.children.length, 0);
  assert.equal(h.window.A01_AGENT_EYE_CAMERA.getStatus().status, 'idle');
  assert.equal(h.api.camera, h.spectatorCamera);
});

test('expires the local stream when the operator authorization reaches its deadline', () => {
  const h = createHarness();
  const head = new h.api.THREE.PerspectiveCamera();
  h.window.A01_AGENT_EYE_CAMERA.attach({ headObject: head });
  const expiredEvents = [];
  h.window.addEventListener('a01-agent-eye:permission-expired', event => expiredEvents.push(event.detail));
  const stream = h.window.A01_AGENT_EYE_CAMERA.start({ authorization: permission() });
  const [timerId, timer] = h.timers.entries().next().value;
  assert.ok(timer.delay > 0);
  h.timers.delete(timerId);
  timer.callback();
  assert.equal(h.window.A01_AGENT_EYE_CAMERA.getStatus().status, 'attached');
  assert.equal(stream.tracks[0].stopped, true);
  assert.equal(expiredEvents.length, 1);
});
