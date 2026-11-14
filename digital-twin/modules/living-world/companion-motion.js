(function (global) {
  "use strict";
  if (global.A01_LW_MOTION) return;

  function material(THREE, options) { return new THREE.MeshStandardMaterial(options); }
  function mesh(THREE, parent, geometry, mat, p, s, r) {
    const item = new THREE.Mesh(geometry, mat);
    if (p) item.position.set(p[0], p[1], p[2]);
    if (s) item.scale.set(s[0], s[1], s[2]);
    if (r) item.rotation.set(r[0], r[1], r[2]);
    item.castShadow = true;
    item.receiveShadow = true;
    parent.add(item);
    return item;
  }

  function createFly(THREE) {
    const group = new THREE.Group();
    const bodyMat = material(THREE, { color: 0x30343d, roughness: 0.58, metalness: 0.12 });
    const headMat = material(THREE, { color: 0x252b33, roughness: 0.52, metalness: 0.08 });
    const eyeMat = material(THREE, { color: 0x8a6ee8, emissive: 0x35216f, emissiveIntensity: 0.42, roughness: 0.25 });
    const pupilMat = material(THREE, { color: 0x090b12, roughness: 0.2 });
    const wingMat = material(THREE, { color: 0xa9d8e6, emissive: 0x315c72, emissiveIntensity: 0.12, transparent: true, opacity: 0.5, side: THREE.DoubleSide, roughness: 0.25 });
    const legMat = material(THREE, { color: 0x343a44, roughness: 0.68 });

    mesh(THREE, group, new THREE.SphereGeometry(1, 18, 14), bodyMat, [0, 0.12, -0.01], [0.078, 0.09, 0.17]);
    mesh(THREE, group, new THREE.SphereGeometry(1, 20, 16), headMat, [0, 0.235, 0.13], [0.105, 0.095, 0.10]);

    const eyes = [];
    [-1, 1].forEach(function (side) {
      eyes.push(mesh(THREE, group, new THREE.SphereGeometry(1, 16, 12), eyeMat, [side * 0.064, 0.255, 0.205], [0.052, 0.057, 0.045]));
      mesh(THREE, group, new THREE.SphereGeometry(1, 12, 10), pupilMat, [side * 0.064, 0.257, 0.245], [0.019, 0.023, 0.012]);
      mesh(THREE, group, new THREE.CylinderGeometry(0.006, 0.009, 0.105, 6), legMat, [side * 0.035, 0.34, 0.17], [1, 1, 1], [side * 0.38, 0, side * -0.22]);
      mesh(THREE, group, new THREE.SphereGeometry(0.012, 8, 8), eyeMat, [side * 0.055, 0.395, 0.18], [1, 1, 1]);
    });

    const wings = [];
    [-1, 1].forEach(function (side) {
      const wing = mesh(THREE, group, new THREE.SphereGeometry(1, 16, 10), wingMat, [side * 0.105, 0.285, -0.015], [0.105, 0.014, 0.17], [0, 0, side * 0.38]);
      wings.push({ mesh: wing, side: side, base: side * 0.38 });
    });

    const legs = [];
    [-1, 1].forEach(function (side) {
      [-0.09, 0, 0.09].forEach(function (z) {
        legs.push(mesh(THREE, group, new THREE.CylinderGeometry(0.005, 0.004, 0.115, 5), legMat, [side * 0.085, 0.015, z], [1, 1, 1], [0, 0, side * 0.82]));
      });
    });

    const halo = mesh(THREE, group, new THREE.TorusGeometry(0.22, 0.006, 5, 36), material(THREE, { color: 0x9b83f3, emissive: 0x443080, emissiveIntensity: 0.55, transparent: true, opacity: 0.58 }), [0, 0.16, 0], [1, 0.72, 1], [Math.PI / 2.4, 0, 0]);
    group.userData.lwNodes = { wings: wings, legs: legs, eyes: eyes, halo: halo };
    return group;
  }

  function createEvaOrb(THREE) {
    const group = new THREE.Group();
    const coreMat = material(THREE, { color: 0xb9e9ff, emissive: 0x2e83bd, emissiveIntensity: 1.15, roughness: 0.22, metalness: 0.14 });
    const innerMat = material(THREE, { color: 0xf4fbff, emissive: 0x9bdfff, emissiveIntensity: 0.55, roughness: 0.18 });
    const ringMat = material(THREE, { color: 0x90d9f4, emissive: 0x3f91bb, emissiveIntensity: 0.72, transparent: true, opacity: 0.72, roughness: 0.3 });
    const accentMat = material(THREE, { color: 0xc6b6ff, emissive: 0x59419c, emissiveIntensity: 0.6, roughness: 0.3 });
    const aura = mesh(THREE, group, new THREE.SphereGeometry(1, 24, 18), material(THREE, { color: 0x85cfff, emissive: 0x23618b, emissiveIntensity: 0.28, transparent: true, opacity: 0.11, depthWrite: false }), [0, 0.2, 0], [0.30, 0.30, 0.30]);
    const core = mesh(THREE, group, new THREE.SphereGeometry(1, 28, 22), coreMat, [0, 0.2, 0], [0.18, 0.18, 0.18]);
    mesh(THREE, group, new THREE.SphereGeometry(1, 20, 16), innerMat, [0, 0.2, 0.135], [0.075, 0.075, 0.055]);
    const rings = [
      mesh(THREE, group, new THREE.TorusGeometry(0.255, 0.009, 6, 48), ringMat, [0, 0.2, 0], [1, 1, 1], [0.88, 0.12, 0.12]),
      mesh(THREE, group, new THREE.TorusGeometry(0.305, 0.005, 5, 48), accentMat, [0, 0.2, 0], [1, 1, 1], [1.1, -0.35, 0.5])
    ];
    const satellites = [];
    [0, Math.PI * 0.66, Math.PI * 1.33].forEach(function (angle, index) {
      satellites.push(mesh(THREE, group, new THREE.SphereGeometry(0.025, 10, 8), index === 1 ? accentMat : innerMat, [Math.cos(angle) * 0.28, 0.2 + Math.sin(angle) * 0.12, Math.sin(angle) * 0.28], [1, 1, 1]));
    });
    group.userData.lwNodes = { aura: aura, core: core, rings: rings, satellites: satellites };
    return group;
  }

  function create(THREE, type) {
    if (!THREE || !THREE.Group) throw new Error("Three.js is unavailable");
    const group = type === "eva-orb" ? createEvaOrb(THREE) : createFly(THREE);
    group.userData.lwType = type;
    return group;
  }

  function update(group, state, elapsed) {
    if (!group || !group.userData || !group.userData.lwNodes) return;
    const nodes = group.userData.lwNodes;
    const phase = elapsed * (state.action === "greet" || state.action === "flap" ? 16 : 5);
    if (nodes.wings) {
      nodes.wings.forEach(function (wing) {
        const spread = state.action === "rest" ? 0.08 : 0.92;
        wing.mesh.rotation.z = wing.base + wing.side * Math.sin(phase) * 0.42 * spread;
      });
      nodes.legs.forEach(function (leg, index) {
        leg.rotation.z = (index % 2 ? -1 : 1) * (0.04 + Math.sin(elapsed * 3 + index) * 0.025);
      });
      nodes.eyes.forEach(function (eye, index) {
        eye.scale.y = 0.057 * (1 - Math.max(0, Math.sin(elapsed * 1.8 + index * 1.7)) * 0.08);
      });
      nodes.halo.rotation.z = elapsed * 0.18;
    }
    if (nodes.rings) {
      nodes.rings[0].rotation.y = elapsed * 0.68;
      nodes.rings[1].rotation.x = 1.1 + Math.sin(elapsed * 0.7) * 0.08;
      nodes.aura.scale.setScalar(1 + Math.sin(elapsed * 2.1) * 0.055);
      nodes.core.scale.setScalar(state.action === "greet" ? 0.18 + Math.sin(phase) * 0.012 : 0.18);
      nodes.satellites.forEach(function (dot, index) {
        const angle = elapsed * (0.42 + index * 0.08) + index * 2.1;
        dot.position.set(Math.cos(angle) * 0.28, 0.2 + Math.sin(angle * 1.2) * 0.12, Math.sin(angle) * 0.28);
      });
    }
  }

  function dispose(group) {
    if (!group) return;
    group.traverse(function (object) {
      if (!object.isMesh) return;
      if (object.geometry) object.geometry.dispose();
      if (Array.isArray(object.material)) object.material.forEach(function (mat) { mat.dispose(); });
      else if (object.material) object.material.dispose();
    });
  }

  global.A01_LW_MOTION = { create: create, update: update, dispose: dispose };
})(window);
