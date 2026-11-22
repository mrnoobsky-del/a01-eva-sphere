import * as THREE from 'three';
import { QUALITY_PROFILES, type QualityName } from './config';

export class QualityManager {
  private mode: QualityName = 'auto';
  private effective: Exclude<QualityName, 'auto'> = 'medium';
  private frameCount = 0;
  private sampleElapsed = 0;
  private lowSamples = 0;
  private highSamples = 0;
  private fps = 0;

  constructor(
    private readonly renderer: THREE.WebGLRenderer,
    private readonly scene: THREE.Scene,
    private readonly camera: THREE.PerspectiveCamera,
    private readonly foliage: THREE.Group,
    private readonly decorativeLights: THREE.Group,
    private readonly onChange: (mode: QualityName, effective: string) => void
  ) {
    this.setMode('auto');
  }

  setMode(mode: QualityName): void {
    this.mode = mode;
    if (mode !== 'auto') this.apply(mode);
    else this.apply(this.isMobile() ? 'medium' : 'high');
    this.onChange(this.mode, this.effective.toUpperCase());
  }

  update(delta: number): void {
    this.frameCount += 1;
    this.sampleElapsed += delta;
    if (this.sampleElapsed < 2) return;
    this.fps = this.frameCount / this.sampleElapsed;
    this.frameCount = 0;
    this.sampleElapsed = 0;
    if (this.mode !== 'auto') return;
    if (this.fps < 38) {
      this.lowSamples += 1;
      this.highSamples = 0;
    } else if (this.fps > 56) {
      this.highSamples += 1;
      this.lowSamples = 0;
    } else {
      this.lowSamples = Math.max(0, this.lowSamples - 1);
      this.highSamples = Math.max(0, this.highSamples - 1);
    }
    if (this.lowSamples >= 2) {
      this.lowSamples = 0;
      this.stepDown();
    } else if (this.highSamples >= 5) {
      this.highSamples = 0;
      this.stepUp();
    }
  }

  getFPS(): number { return this.fps; }
  getMode(): QualityName { return this.mode; }

  private apply(profileName: Exclude<QualityName, 'auto'>): void {
    this.effective = profileName;
    const profile = QUALITY_PROFILES[profileName];
    const deviceRatio = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.setPixelRatio(Math.min(deviceRatio, profile.pixelRatio));
    this.renderer.shadowMap.enabled = profile.shadows && !this.isMobile();
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.foliage.visible = profile.foliageVisible;
    this.decorativeLights.visible = profile.decorativeLights;
    this.camera.updateProjectionMatrix();
    this.scene.traverse((object) => {
      if (object instanceof THREE.DirectionalLight && object.castShadow) {
        object.shadow.mapSize.set(profile.shadowMapSize || 512, profile.shadowMapSize || 512);
        object.shadow.needsUpdate = true;
      }
    });
    this.onChange(this.mode, this.effective.toUpperCase());
  }

  private stepDown(): void {
    const order: Exclude<QualityName, 'auto'>[] = ['low', 'medium', 'high', 'ultra'];
    const index = order.indexOf(this.effective);
    if (index > 0) this.apply(order[index - 1]);
  }

  private stepUp(): void {
    if (this.isMobile()) return;
    const order: Exclude<QualityName, 'auto'>[] = ['low', 'medium', 'high', 'ultra'];
    const index = order.indexOf(this.effective);
    if (index < order.length - 1) this.apply(order[index + 1]);
  }

  private isMobile(): boolean {
    return window.matchMedia('(max-width: 760px)').matches || /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent);
  }
}