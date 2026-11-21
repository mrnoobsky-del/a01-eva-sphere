const assertFinite = (value, label) => {
  if (!Number.isFinite(value)) throw new Error(`${label} must be a finite number.`);
};

const cross = (a, b, c) => {
  const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const v = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  return [
    u[1] * v[2] - u[2] * v[1],
    u[2] * v[0] - u[0] * v[2],
    u[0] * v[1] - u[1] * v[0]
  ];
};

const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const length = (v) => Math.hypot(v[0], v[1], v[2]);

const triangleArea = ([a, b, c]) => length(cross(a, b, c)) / 2;

function orientOutward(triangle, centre) {
  const [a, b, c] = triangle;
  const normal = cross(a, b, c);
  const centroid = [
    (a[0] + b[0] + c[0]) / 3,
    (a[1] + b[1] + c[1]) / 3,
    (a[2] + b[2] + c[2]) / 3
  ];
  const fromCentre = [
    centroid[0] - centre[0],
    centroid[1] - centre[1],
    centroid[2] - centre[2]
  ];
  return dot(normal, fromCentre) >= 0 ? triangle : [a, c, b];
}

function floorNormal(vertices) {
  let nx = 0;
  let ny = 0;
  let nz = 0;
  for (let i = 0; i < vertices.length; i += 1) {
    const a = vertices[i];
    const b = vertices[(i + 1) % vertices.length];
    nx += (a[1] - b[1]) * (a[2] + b[2]);
    ny += (a[2] - b[2]) * (a[0] + b[0]);
    nz += (a[0] - b[0]) * (a[1] + b[1]);
  }
  return [nx, ny, nz];
}

function polygonArea(vertices) {
  return length(floorNormal(vertices)) / 2;
}

function triangleTetraVolume([a, b, c]) {
  return dot(a, [
    b[1] * c[2] - b[2] * c[1],
    b[2] * c[0] - b[0] * c[2],
    b[0] * c[1] - b[1] * c[0]
  ]) / 6;
}

/**
 * Convert the published A-01 ellipsoid parameters into a closed, triangulated
 * EnergyPlus envelope. A-01 Y-up is mapped to EnergyPlus Z-up. The rendering
 * radial offset is deliberately excluded from the physical surface.
 */
export function buildDomeGeometry(parameters, {
  rimDiameterM = null,
  subdivisions = 2,
  floorSegments = null
} = {}) {
  if (!parameters || !parameters.ellipsoid) {
    throw new Error('A-01 shell parameter JSON is missing its ellipsoid section.');
  }

  const e = parameters.ellipsoid;
  const required = [
    ['baseRadius', e.baseRadius],
    ['scaleXZ', e.scaleXZ],
    ['scaleY', e.scaleY],
    ['centerY', e.centerY],
    ['thetaStartRad', e.thetaStartRad],
    ['thetaEndPiFactor', e.thetaEndPiFactor],
    ['azimuthSectorCount', e.azimuthSectorCount],
    ['columnsPerSector', e.columnsPerSector],
    ['meridionalCourses', e.meridionalCourses]
  ];
  for (const [name, value] of required) {
    assertFinite(value, name);
    if (!(value > 0)) throw new Error(`${name} must be greater than zero.`);
  }
  if (!Number.isInteger(subdivisions) || subdivisions < 1 || subdivisions > 6) {
    throw new Error('Mesh subdivisions must be an integer from 1 to 6.');
  }

  const thetaEnd = Math.PI * e.thetaEndPiFactor;
  if (!(thetaEnd > e.thetaStartRad && thetaEnd < Math.PI / 2)) {
    throw new Error('The published A-01 dome cap angles are outside the supported range.');
  }

  const semiAxisX = e.baseRadius * e.scaleXZ;
  const semiAxisY = e.baseRadius * e.scaleY;
  const rimRadiusModel = semiAxisX * Math.sin(thetaEnd);
  const heightModel = semiAxisY * (1 - Math.cos(thetaEnd));
  const scaleToMetres = rimDiameterM == null ? null : rimDiameterM / (2 * rimRadiusModel);

  if (rimDiameterM != null) {
    assertFinite(rimDiameterM, 'Rim support diameter');
    if (!(rimDiameterM > 0)) throw new Error('Rim support diameter must be greater than zero.');
  }

  const scale = scaleToMetres ?? 1;
  const rimY = e.centerY + semiAxisY * Math.cos(thetaEnd);

  // EnergyPlus uses Z as vertical; A-01's source geometry uses Y.
  const point = (phi, theta) => {
    const x = -semiAxisX * Math.cos(phi) * Math.sin(theta);
    const y = e.centerY + semiAxisY * Math.cos(theta);
    const z = semiAxisX * Math.sin(phi) * Math.sin(theta);
    return [x * scale, z * scale, (y - rimY) * scale];
  };

  const centre = [0, 0, (e.centerY - rimY) * scale];
  const shellTriangles = [];
  const azimuthCells = e.azimuthSectorCount * e.columnsPerSector * subdivisions;
  const thetaCells = e.meridionalCourses * subdivisions;
  const phiStep = (2 * Math.PI) / azimuthCells;
  const thetaStep = (thetaEnd - e.thetaStartRad) / thetaCells;

  const pushTriangle = (triangle) => {
    const oriented = orientOutward(triangle, centre);
    if (triangleArea(oriented) > 1e-10) shellTriangles.push(oriented);
  };

  // Crown closure: the tiny visual exclusion at thetaStart is replaced with a
  // fan to the exact apex, so the EnergyPlus zone is watertight.
  const apex = point(0, 0);
  for (let i = 0; i < azimuthCells; i += 1) {
    const p0 = i * phiStep;
    const p1 = (i + 1) * phiStep;
    pushTriangle([apex, point(p0, e.thetaStartRad), point(p1, e.thetaStartRad)]);
  }

  for (let i = 0; i < azimuthCells; i += 1) {
    const phi0 = i * phiStep;
    const phi1 = (i + 1) * phiStep;
    for (let j = 0; j < thetaCells; j += 1) {
      const theta0 = e.thetaStartRad + j * thetaStep;
      const theta1 = e.thetaStartRad + (j + 1) * thetaStep;
      const p00 = point(phi0, theta0);
      const p10 = point(phi1, theta0);
      const p11 = point(phi1, theta1);
      const p01 = point(phi0, theta1);
      pushTriangle([p00, p10, p11]);
      pushTriangle([p00, p11, p01]);
    }
  }

  const matchingFloorSegments = floorSegments ?? azimuthCells;
  if (matchingFloorSegments !== azimuthCells) {
    throw new Error('The EnergyPlus base polygon must match every shell rim vertex.');
  }
  let floor = Array.from({ length: matchingFloorSegments }, (_, i) => {
    const phi = (2 * Math.PI * i) / matchingFloorSegments;
    return point(phi, thetaEnd);
  });

  // The floor is the closing boundary of the air volume. Its outward normal
  // must point down into the ground, opposite to the shell's outward normal.
  if (floorNormal(floor)[2] > 0) floor = floor.slice().reverse();

  const shellAreaM2 = shellTriangles.reduce((sum, triangle) => sum + triangleArea(triangle), 0);
  const baseAreaM2 = polygonArea(floor);
  const floorCentre = [0, 0, 0];
  const floorTriangles = floor.map((vertex, i) => [
    floorCentre,
    vertex,
    floor[(i + 1) % floor.length]
  ]);
  const signedVolume = shellTriangles.reduce((sum, triangle) => sum + triangleTetraVolume(triangle), 0)
    + floorTriangles.reduce((sum, triangle) => sum + triangleTetraVolume(triangle), 0);
  const volumeM3 = Math.abs(signedVolume);

  const rimDiameter = 2 * rimRadiusModel * scale;
  const domeHeight = heightModel * scale;

  if (!Number.isFinite(volumeM3) || volumeM3 <= 0) {
    throw new Error('Generated dome geometry is not a closed positive-volume shell.');
  }

  return {
    calibrated: scaleToMetres != null,
    coordinateUnits: scaleToMetres == null ? 'model-unit' : 'm',
    scaleToMetres,
    rimDiameter: rimDiameterM == null ? 2 * rimRadiusModel : rimDiameter,
    height: scaleToMetres == null ? heightModel : domeHeight,
    shellArea: shellAreaM2,
    baseArea: baseAreaM2,
    enclosedVolume: volumeM3,
    shellTriangles,
    floorVertices: floor,
    counts: {
      azimuthCells,
      thetaCells,
      shellTriangles: shellTriangles.length,
      floorVertices: floor.length,
      parentSectors: e.azimuthSectorCount,
      candidatePanels: e.azimuthSectorCount * e.columnsPerSector * e.meridionalCourses
    },
    sourceGeometry: {
      baseRadius: e.baseRadius,
      scaleXZ: e.scaleXZ,
      scaleY: e.scaleY,
      thetaStartRad: e.thetaStartRad,
      thetaEndRad: thetaEnd,
      renderingPanelRadialFactorExcluded: e.panelRadialFactor ?? null,
      centreYOffsetRemoved: e.centerY
    }
  };
}
