import test from 'node:test';
import assert from 'node:assert/strict';
import { buildDomeGeometry } from '../src/geometry.js';

const parameters = {
  units: 'model-unit',
  scaleToMetres: null,
  ellipsoid: {
    baseRadius: 8.55,
    panelRadialFactor: 1.006,
    scaleXZ: 1.22,
    scaleY: 1.35,
    centerY: 0.58,
    thetaStartRad: 0.015,
    thetaEndPiFactor: 0.48,
    azimuthSectorCount: 12,
    columnsPerSector: 2,
    meridionalCourses: 6
  }
};

test('uncalibrated model preserves shape and records model units', () => {
  const geometry = buildDomeGeometry(parameters);
  assert.equal(geometry.calibrated, false);
  assert.equal(geometry.coordinateUnits, 'model-unit');
  assert.equal(geometry.counts.parentSectors, 12);
  assert.equal(geometry.counts.candidatePanels, 144);
  assert.equal(geometry.counts.shellTriangles, 1200);
  assert.ok(geometry.enclosedVolume > 0);
  assert.ok(geometry.shellArea > 0);
  assert.ok(geometry.baseArea > 0);
});

test('rim diameter calibration scales lengths, areas and volume correctly', () => {
  const unit = buildDomeGeometry(parameters);
  const scaled = buildDomeGeometry(parameters, { rimDiameterM: unit.rimDiameter * 2 });
  assert.equal(scaled.calibrated, true);
  assert.ok(Math.abs(scaled.rimDiameter - unit.rimDiameter * 2) < 1e-8);
  assert.ok(Math.abs(scaled.height - unit.height * 2) < 1e-8);
  assert.ok(Math.abs(scaled.shellArea - unit.shellArea * 4) < 1e-5);
  assert.ok(Math.abs(scaled.enclosedVolume - unit.enclosedVolume * 8) < 1e-4);
});

test('every generated facet has finite non-zero area', () => {
  const geometry = buildDomeGeometry(parameters, { rimDiameterM: 24, subdivisions: 2 });
  for (const triangle of geometry.shellTriangles) {
    assert.equal(triangle.length, 3);
    for (const vertex of triangle) {
      assert.equal(vertex.length, 3);
      assert.ok(vertex.every(Number.isFinite));
    }
    assert.ok(Math.hypot(
      ...[
        (triangle[1][1] - triangle[0][1]) * (triangle[2][2] - triangle[0][2]) - (triangle[1][2] - triangle[0][2]) * (triangle[2][1] - triangle[0][1]),
        (triangle[1][2] - triangle[0][2]) * (triangle[2][0] - triangle[0][0]) - (triangle[1][0] - triangle[0][0]) * (triangle[2][2] - triangle[0][2]),
        (triangle[1][0] - triangle[0][0]) * (triangle[2][1] - triangle[0][1]) - (triangle[1][1] - triangle[0][1]) * (triangle[2][0] - triangle[0][0])
      ]
    ) > 0);
  }
});


test('the base polygon follows every shell rim vertex at each mesh resolution', () => {
  for (const subdivisions of [1, 2, 3, 4]) {
    const geometry = buildDomeGeometry(parameters, { rimDiameterM: 24, subdivisions });
    assert.equal(geometry.floorVertices.length, geometry.counts.azimuthCells);
  }
});


test('every base vertex is reused by the shell rim within numeric tolerance', () => {
  const geometry = buildDomeGeometry(parameters, { rimDiameterM: 24, subdivisions: 3 });
  const key = (v) => v.map((n) => Math.round(n * 1e8)).join(':');
  const shellRim = new Set(
    geometry.shellTriangles.flatMap((triangle) => triangle)
      .filter((vertex) => Math.abs(vertex[2]) < 1e-8)
      .map(key)
  );
  for (const vertex of geometry.floorVertices) {
    assert.ok(shellRim.has(key(vertex)));
  }
});
