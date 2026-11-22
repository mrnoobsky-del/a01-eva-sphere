import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { WORLD, type QualityName } from './core/config';
import { floorName, translate, type AppLanguage, type MessageKey } from './core/i18n';
import { QualityManager } from './core/quality';
import { createDomeWorld } from './world/dome';
import './style.css';

const viewport = document.querySelector<HTMLDivElement>('#viewport')!;
const loadingScreen = document.querySelector<HTMLDivElement>('#loadingScreen')!;
const webglFallback = document.querySelector<HTMLDivElement>('#webglFallback')!;
const fpsValue = document.querySelector<HTMLElement>('#fpsValue')!;
const fpsMeter = document.querySelector<HTMLElement>('#fpsMeter')!;
const qualityValue = document.querySelector<HTMLElement>('#qualityValue')!;
const cameraLabel = document.querySelector<HTMLElement>('#cameraLabel')!;
const levelLabel = document.querySelector<HTMLElement>('#levelLabel')!;
const walkTip = document.querySelector<HTMLElement>('#walkTip')!;
const rightPanel = document.querySelector<HTMLElement>('#rightPanel')!;

let renderer: THREE.WebGLRenderer;
try {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
} catch {
  loadingScreen.classList.add('hidden');
  webglFallback.classList.remove('hidden');
  throw new Error('WebGL context could not be created');
}
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.12;
renderer.shadowMap.enabled = false;
renderer.domElement.className = 'scene-canvas';
viewport.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101820);
scene.fog = new THREE.FogExp2(0x101820, 0.0085);
const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 180);
camera.position.set(31, 19, 34);
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableDamping = true; orbit.dampingFactor = 0.055; orbit.minDistance = 12; orbit.maxDistance = 72; orbit.maxPolarAngle = Math.PI * 0.49;
orbit.target.set(0, 9.2, 0); orbit.update();
const pointerControls = new PointerLockControls(camera, renderer.domElement);
const clock = new THREE.Clock(), world = createDomeWorld();
scene.add(world.root);

const hemi = new THREE.HemisphereLight(0xc9e0e8, 0x28312e, 1.45); scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffe7ca, 3.2);
sun.position.set(-20, 34, 16); sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024);
sun.shadow.camera.left = -30; sun.shadow.camera.right = 30; sun.shadow.camera.top = 34; sun.shadow.camera.bottom = -30; sun.shadow.bias = -0.00012; scene.add(sun);
const atriumFill = new THREE.PointLight(0x8cb8ce, 88, 38, 2); atriumFill.position.set(0, 21, -1); scene.add(atriumFill);
const warmFill = new THREE.PointLight(0xc88f5d, 44, 28, 2); warmFill.position.set(12, 9, 10); scene.add(warmFill);
const pmrem = new THREE.PMREMGenerator(renderer);
const environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
scene.environment = environment; scene.environmentIntensity = 0.68; pmrem.dispose();

const quality = new QualityManager(renderer, scene, camera, world.foliage, world.decorativeLights, (mode, effective) => {
  qualityValue.textContent = mode === 'auto' ? `AUTO · ${effective}` : mode.toUpperCase();
  document.querySelectorAll<HTMLButtonElement>('[data-quality]').forEach((button) => button.classList.toggle('selected', button.dataset.quality === mode));
});
let currentFloor = 0, walking = false, appLanguage: AppLanguage = 'ru', previousFPSPaint = 0;
const pressed = new Set<string>();

function applyLanguage(language: AppLanguage): void {
  appLanguage = language;
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : language;
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n as MessageKey;
    element.textContent = translate(key, language);
  });
  document.querySelectorAll<HTMLElement>('[data-floor-label]').forEach((element) => element.textContent = floorName(Number(element.dataset.floorLabel), language));
  cameraLabel.textContent = walking ? translate('firstPerson', language) : translate('orbitView', language);
  levelLabel.textContent = `L0${currentFloor} · ${floorName(currentFloor, language).toLocaleUpperCase(language === 'zh' ? 'zh-CN' : language)}`;
}
function setFloor(level: number): void {
  currentFloor = Math.min(Math.max(level, 0), WORLD.floorHeights.length - 1);
  const height = WORLD.floorHeights[currentFloor];
  levelLabel.textContent = `L0${currentFloor} · ${floorName(currentFloor, appLanguage).toLocaleUpperCase(appLanguage === 'zh' ? 'zh-CN' : appLanguage)}`;
  document.querySelectorAll<HTMLButtonElement>('[data-floor]').forEach((button) => button.classList.toggle('active', Number(button.dataset.floor) === currentFloor));
  if (walking) { camera.position.set(0, height + 1.72, 17.8); camera.lookAt(0, height + 1.72, 0); }
  else { camera.position.set(0, height + 8.2, 23.5); orbit.target.set(0, height + 1.1, 0); orbit.update(); }
}
function setCameraMode(mode: 'orbit' | 'walk'): void {
  walking = mode === 'walk'; orbit.enabled = !walking;
  cameraLabel.textContent = walking ? translate('firstPerson', appLanguage) : translate('orbitView', appLanguage);
  document.querySelector('#orbitButton')?.classList.toggle('active', !walking);
  document.querySelector('#walkButton')?.classList.toggle('active', walking);
  walkTip.classList.toggle('hidden', !walking || pointerControls.isLocked);
  if (walking) { setFloor(currentFloor); pointerControls.lock(); }
  else { pointerControls.unlock(); camera.position.set(31, 19, 34); orbit.target.set(0, 9.2, 0); orbit.update(); }
}
pointerControls.addEventListener('lock', () => walkTip.classList.add('hidden'));
pointerControls.addEventListener('unlock', () => { if (walking) walkTip.classList.remove('hidden'); });
window.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) pressed.add(key);
  if (key === 'escape' && walking) walkTip.classList.remove('hidden');
});
window.addEventListener('keyup', (event) => pressed.delete(event.key.toLowerCase()));
renderer.domElement.addEventListener('click', () => { if (walking && !pointerControls.isLocked) pointerControls.lock(); });
document.querySelectorAll<HTMLButtonElement>('[data-floor]').forEach((button) => button.addEventListener('click', () => setFloor(Number(button.dataset.floor))));
document.querySelector('#orbitButton')?.addEventListener('click', () => setCameraMode('orbit'));
document.querySelector('#walkButton')?.addEventListener('click', () => setCameraMode('walk'));
document.querySelector('#resetButton')?.addEventListener('click', () => {
  setCameraMode('orbit'); setFloor(0); camera.position.set(31, 19, 34); orbit.target.set(0, 9.2, 0); orbit.update();
});
document.querySelector('#menuButton')?.addEventListener('click', () => rightPanel.classList.toggle('open'));
document.querySelector('#closePanel')?.addEventListener('click', () => rightPanel.classList.remove('open'));
document.querySelector<HTMLSelectElement>('#languageSelect')?.addEventListener('change', (event) => applyLanguage((event.currentTarget as HTMLSelectElement).value as AppLanguage));
document.querySelectorAll<HTMLButtonElement>('[data-quality]').forEach((button) => button.addEventListener('click', () => quality.setMode(button.dataset.quality as QualityName)));

const resizeObserver = new ResizeObserver(() => {
  const width = viewport.clientWidth, height = viewport.clientHeight;
  camera.aspect = width / Math.max(height, 1); camera.updateProjectionMatrix(); renderer.setSize(width, height);
});
resizeObserver.observe(viewport);
function updateWalking(delta: number): void {
  if (!walking || !pointerControls.isLocked) return;
  const forward = Number(pressed.has('w') || pressed.has('arrowup')) - Number(pressed.has('s') || pressed.has('arrowdown'));
  const right = Number(pressed.has('d') || pressed.has('arrowright')) - Number(pressed.has('a') || pressed.has('arrowleft'));
  const distance = Math.min(delta, 0.04) * 6.5;
  if (forward !== 0) pointerControls.moveForward(forward * distance);
  if (right !== 0) pointerControls.moveRight(right * distance);
  const radius = Math.hypot(camera.position.x, camera.position.z);
  const maxRadius = currentFloor === 0 ? 24 : 21.4, minRadius = currentFloor === 0 ? 0 : 10.1;
  if (radius > maxRadius) { camera.position.x *= maxRadius / radius; camera.position.z *= maxRadius / radius; }
  if (radius < minRadius && radius > 0) { camera.position.x *= minRadius / radius; camera.position.z *= minRadius / radius; }
  camera.position.y = WORLD.floorHeights[currentFloor] + 1.72;
}
function animate(): void {
  requestAnimationFrame(animate);
  const delta = Math.min(clock.getDelta(), 0.05);
  quality.update(delta); if (!walking) orbit.update(); updateWalking(delta);
  const elapsed = clock.elapsedTime;
  world.elevator.position.y = 8 + Math.sin(elapsed * 0.16) * 6.3;
  world.elevator.rotation.y = Math.sin(elapsed * 0.08) * 0.012;
  renderer.render(scene, camera);
  if (elapsed - previousFPSPaint > 1) {
    const fps = quality.getFPS();
    if (fps > 0) { fpsValue.textContent = `${Math.round(fps)} FPS`; fpsMeter.style.width = `${Math.min(fps / 60, 1) * 100}%`; }
    previousFPSPaint = elapsed;
  }
}
applyLanguage(appLanguage); setFloor(0);
requestAnimationFrame(() => { loadingScreen.classList.add('hidden'); animate(); });
window.addEventListener('beforeunload', () => { resizeObserver.disconnect(); environment.dispose(); renderer.dispose(); });