import * as THREE from 'three';
import { WORLD } from '../core/config';
import { materials as mat } from './materials';

function addMesh<T extends THREE.BufferGeometry>(group: THREE.Group, geometry: T, material: THREE.Material, position: THREE.Vector3, rotation = new THREE.Euler()): THREE.Mesh<T> {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(position);
  mesh.rotation.copy(rotation);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);
  return mesh;
}
function addRing(group: THREE.Group, radius: number, tube: number, y: number, material: THREE.Material): THREE.Mesh {
  const geometry = new THREE.TorusGeometry(radius, tube, 8, 128);
  return addMesh(group, geometry, material, new THREE.Vector3(0, y, 0), new THREE.Euler(Math.PI / 2, 0, 0));
}
function addUpperFloor(group: THREE.Group, innerRadius: number, outerRadius: number, y: number): void {
  const floor = new THREE.Mesh(new THREE.RingGeometry(innerRadius, outerRadius, 128), mat.floor);
  floor.rotation.x = -Math.PI / 2; floor.position.y = y; floor.receiveShadow = true; group.add(floor);
  const underside = new THREE.Mesh(new THREE.RingGeometry(innerRadius, outerRadius, 128), mat.dark);
  underside.rotation.x = Math.PI / 2; underside.position.y = y - 0.34; group.add(underside);
  addRing(group, innerRadius + 0.05, 0.11, y + 0.05, mat.warmMetal);
  addRing(group, outerRadius - 0.22, 0.075, y + 0.04, mat.structure);
  addRing(group, innerRadius + 0.62, 0.065, y + 1.06, mat.structure);
  const rail = new THREE.Mesh(new THREE.TorusGeometry(innerRadius + 0.48, 0.035, 6, 128), mat.glassSoft);
  rail.rotation.x = Math.PI / 2; rail.position.y = y + 1.05; group.add(rail);
}
function addDomeShell(group: THREE.Group): void {
  const radius = WORLD.domeRadius;
  const height = WORLD.domeApexY;
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2),
    new THREE.MeshPhysicalMaterial({ color: 0x7ca1aa, roughness: 0.3, metalness: 0.12, transmission: 0.16, transparent: true, opacity: 0.12, side: THREE.BackSide, depthWrite: false }));
  sphere.position.y = WORLD.domeBaseY; sphere.scale.y = height / radius; group.add(sphere);
  for (let i = 0; i < 24; i += 1) {
    const angle = (i / 24) * Math.PI * 2;
    const points: THREE.Vector3[] = [];
    for (let j = 0; j <= 28; j += 1) {
      const theta = (j / 28) * (Math.PI / 2), r = radius * Math.cos(theta);
      points.push(new THREE.Vector3(Math.sin(angle) * r, height * Math.sin(theta), Math.cos(angle) * r));
    }
    addMesh(group, new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 48, 0.075, 5, false), mat.structure, new THREE.Vector3());
  }
  for (let y = 5; y < height - 1; y += 3.7) {
    const normalized = y / height, r = radius * Math.sqrt(Math.max(0, 1 - normalized * normalized));
    addRing(group, r, 0.055, y, mat.warmMetal);
  }
}
function addColumns(group: THREE.Group): void {
  const geometry = new THREE.CylinderGeometry(0.23, 0.31, 3.85, 10);
  for (let level = 0; level < WORLD.floorHeights.length - 1; level += 1) {
    const y = WORLD.floorHeights[level] + 1.95;
    for (let i = 0; i < 28; i += 1) {
      const angle = (i / 28) * Math.PI * 2;
      const mesh = new THREE.Mesh(geometry, mat.structure);
      mesh.position.set(Math.sin(angle) * 22.9, y, Math.cos(angle) * 22.9); mesh.castShadow = true; group.add(mesh);
    }
  }
}
function addBridges(group: THREE.Group): void {
  for (let level = 1; level < WORLD.floorHeights.length; level += 1) {
    const y = WORLD.floorHeights[level] + 0.07;
    for (let i = 0; i < 3; i += 1) {
      const angle = (i / 3) * Math.PI + Math.PI / 6;
      const bridge = new THREE.Mesh(new THREE.BoxGeometry(11.8, 0.32, 1.9), mat.floorLight);
      bridge.position.set(Math.sin(angle) * 15.3, y, Math.cos(angle) * 15.3); bridge.rotation.y = -angle; bridge.castShadow = true; bridge.receiveShadow = true; group.add(bridge);
      const railGeometry = new THREE.BoxGeometry(11.8, 0.9, 0.055);
      for (const side of [-1, 1]) {
        const rail = new THREE.Mesh(railGeometry, mat.glassSoft);
        rail.position.set(Math.sin(angle) * 15.3 + Math.cos(angle) * side * 0.95, y + 0.61, Math.cos(angle) * 15.3 - Math.sin(angle) * side * 0.95);
        rail.rotation.y = -angle; group.add(rail);
      }
    }
  }
}
function addGlassElevator(group: THREE.Group): void {
  const x = 0, z = -11.7, shaftHeight = WORLD.floorHeights[4] + 2.5;
  const shaft = new THREE.Mesh(new THREE.BoxGeometry(2.65, shaftHeight, 2.65), mat.glassSoft);
  shaft.position.set(x, shaftHeight / 2, z); group.add(shaft);
  const frameGeometry = new THREE.BoxGeometry(0.12, shaftHeight, 0.12);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const frame = new THREE.Mesh(frameGeometry, mat.warmMetal);
    frame.position.set(x + sx * 1.28, shaftHeight / 2, z + sz * 1.28); group.add(frame);
  }
  const cabin = new THREE.Group();
  cabin.add(new THREE.Mesh(new THREE.BoxGeometry(2.15, 0.12, 2.15), mat.warmMetal));
  const panelGeometry = new THREE.BoxGeometry(2.05, 2.5, 0.045);
  for (let i = 0; i < 4; i += 1) {
    const panel = new THREE.Mesh(panelGeometry, mat.glass);
    panel.position.set(0, 1.28, -1.04); panel.rotation.y = (i * Math.PI) / 2; cabin.add(panel);
  }
  cabin.position.set(x, 0.8, z); cabin.name = 'glass-elevator-cabin'; group.add(cabin);
}
function addGreenery(group: THREE.Group): THREE.Group {
  const foliage = new THREE.Group();
  const trunkGeometry = new THREE.CylinderGeometry(0.055, 0.09, 1.25, 6), crownGeometry = new THREE.IcosahedronGeometry(0.58, 1);
  const trunks = new THREE.InstancedMesh(trunkGeometry, mat.trunk, 64), crowns = new THREE.InstancedMesh(crownGeometry, mat.plant, 64);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 64; i += 1) {
    const floor = i < 20 ? 0 : 1 + (i % 4), y = WORLD.floorHeights[floor];
    const angle = (i / 64) * Math.PI * 2 * 2.17, radius = floor === 0 ? 18.4 + (i % 3) * 1.1 : 17.2 + (i % 4) * 0.7;
    const px = Math.sin(angle) * radius, pz = Math.cos(angle) * radius, scale = 0.72 + (i % 4) * 0.12;
    dummy.position.set(px, y + 0.7, pz); dummy.scale.setScalar(scale); dummy.updateMatrix(); trunks.setMatrixAt(i, dummy.matrix);
    dummy.position.set(px, y + 1.5, pz); dummy.scale.setScalar(scale * 1.12); dummy.updateMatrix(); crowns.setMatrixAt(i, dummy.matrix);
  }
  trunks.instanceMatrix.needsUpdate = true; crowns.instanceMatrix.needsUpdate = true; foliage.add(trunks, crowns); group.add(foliage); return foliage;
}
function addDecorativeLights(group: THREE.Group): THREE.Group {
  const lights = new THREE.Group(), geometry = new THREE.SphereGeometry(0.11, 8, 6);
  const glow = new THREE.MeshStandardMaterial({ color: 0xd7b58b, emissive: 0xc1844f, emissiveIntensity: 1.1, roughness: 0.25 });
  const instances = new THREE.InstancedMesh(geometry, glow, 80), dummy = new THREE.Object3D();
  for (let i = 0; i < 80; i += 1) {
    const level = i % 5, angle = (Math.floor(i / 5) / 16) * Math.PI * 2, r = level === 0 ? 20.7 : 21.1;
    dummy.position.set(Math.sin(angle) * r, WORLD.floorHeights[level] + 1.15, Math.cos(angle) * r); dummy.updateMatrix(); instances.setMatrixAt(i, dummy.matrix);
  }
  lights.add(instances); group.add(lights); return lights;
}
function addMainPlaza(group: THREE.Group): void {
  const plaza = new THREE.Mesh(new THREE.CircleGeometry(WORLD.groundRadius, 128), mat.floor);
  plaza.rotation.x = -Math.PI / 2; plaza.position.y = 0.05; plaza.receiveShadow = true; group.add(plaza);
  const inlay = new THREE.Mesh(new THREE.RingGeometry(7.5, 8.1, 96), mat.warmMetal);
  inlay.rotation.x = -Math.PI / 2; inlay.position.y = 0.075; group.add(inlay);
  addRing(group, 5.2, 0.045, 0.09, mat.warmMetal); addRing(group, 3.7, 0.025, 0.095, mat.light);
}
function addAtriumFeatures(group: THREE.Group): void {
  for (let level = 0; level < WORLD.floorHeights.length; level += 1) {
    const y = WORLD.floorHeights[level];
    if (level > 0) addUpperFloor(group, WORLD.atriumRadius, WORLD.outerRadius, y);
    const band = new THREE.Mesh(new THREE.TorusGeometry(WORLD.atriumRadius + 1.2, 0.045, 6, 96), mat.light);
    band.rotation.x = Math.PI / 2; band.position.y = y + 1.16; group.add(band);
  }
  const canopy = new THREE.Mesh(new THREE.CylinderGeometry(3.1, 4.2, 0.35, 48), mat.glassSoft);
  canopy.position.set(0, 24.2, 0); group.add(canopy);
  const skylight = new THREE.Mesh(new THREE.SphereGeometry(3.25, 32, 18, 0, Math.PI * 2, 0, Math.PI / 2), mat.glassSoft);
  skylight.position.y = 24.3; group.add(skylight);
}
export function createDomeWorld(): { root: THREE.Group; foliage: THREE.Group; decorativeLights: THREE.Group; elevator: THREE.Object3D } {
  const root = new THREE.Group(); root.name = 'a01-x-central-atrium';
  addMainPlaza(root); addAtriumFeatures(root); addDomeShell(root); addColumns(root); addBridges(root); addGlassElevator(root);
  const foliage = addGreenery(root), decorativeLights = addDecorativeLights(root);
  const elevator = root.getObjectByName('glass-elevator-cabin') as THREE.Object3D;
  return { root, foliage, decorativeLights, elevator };
}