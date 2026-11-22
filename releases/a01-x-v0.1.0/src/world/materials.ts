import * as THREE from 'three';

export const materials = {
  floor: new THREE.MeshStandardMaterial({ color: 0x6b747a, roughness: 0.46, metalness: 0.22 }),
  floorLight: new THREE.MeshStandardMaterial({ color: 0x9ba4a8, roughness: 0.37, metalness: 0.16 }),
  structure: new THREE.MeshStandardMaterial({ color: 0x313e48, roughness: 0.31, metalness: 0.78 }),
  warmMetal: new THREE.MeshStandardMaterial({ color: 0xb48a57, roughness: 0.28, metalness: 0.72 }),
  glass: new THREE.MeshPhysicalMaterial({ color: 0x9bcbd4, roughness: 0.08, metalness: 0.08, transmission: 0.38, thickness: 0.25, transparent: true, opacity: 0.7, side: THREE.DoubleSide }),
  glassSoft: new THREE.MeshPhysicalMaterial({ color: 0x9ccbd4, roughness: 0.16, metalness: 0.05, transmission: 0.16, transparent: true, opacity: 0.28, side: THREE.DoubleSide }),
  plant: new THREE.MeshStandardMaterial({ color: 0x497d68, roughness: 0.88 }),
  trunk: new THREE.MeshStandardMaterial({ color: 0x725d46, roughness: 0.95 }),
  dark: new THREE.MeshStandardMaterial({ color: 0x111a20, roughness: 0.58, metalness: 0.36 }),
  light: new THREE.MeshStandardMaterial({ color: 0xe5d6bb, roughness: 0.22, emissive: 0xa87e4e, emissiveIntensity: 0.32 })
};