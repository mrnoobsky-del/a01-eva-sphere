import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { httpSource, SchemaBundle } from '@idfkit/core';
import { buildDomeGeometry } from '../src/geometry.js';
import { buildEnergyPlusModel } from '../src/model.js';

const publicRoot = resolve(fileURLToPath(new URL('../public/', import.meta.url)));

const server = createServer(async (request, response) => {
  try {
    const requested = decodeURIComponent(new URL(request.url, 'http://localhost').pathname).replace(/^\/+/, '');
    const path = resolve(publicRoot, requested);
    if (path !== publicRoot && !path.startsWith(publicRoot + sep)) {
      response.writeHead(403).end();
      return;
    }
    const info = await stat(path);
    if (!info.isFile()) {
      response.writeHead(404).end();
      return;
    }
    const bytes = await readFile(path);
    const type = path.endsWith('.gz') ? 'application/gzip' : path.endsWith('.json') ? 'application/json' : 'application/octet-stream';
    response.writeHead(200, { 'Content-Type': type, 'Access-Control-Allow-Origin': '*' });
    response.end(bytes);
  } catch {
    response.writeHead(404).end();
  }
});

test('canonical A-01 dome geometry writes a schema-backed EnergyPlus IDF', async () => {
  await new Promise((resolveListen, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolveListen);
  });

  try {
    const address = server.address();
    const baseUrl = 'http://127.0.0.1:' + address.port + '/';
    const schema = await new SchemaBundle(httpSource(baseUrl + 'schemas/')).load('26.1.0');

    const parameters = {
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
    const geometry = buildDomeGeometry(parameters, { rimDiameterM: 24, subdivisions: 1 });
    const generated = buildEnergyPlusModel({
      schema,
      geometry,
      settings: {
        shellU: 0.6,
        solarAbsorptance: 0.6,
        heatingSetpoint: 20,
        coolingSetpoint: 26,
        infiltrationAch: 0,
        ventilationAch: 0
      },
      epwText: 'LOCATION,Biysk,Altai Krai,RU,Test,00000,52.51,85.14,7.0,190.0\n'
    });

    assert.ok(generated.idf.length > 1000);
    assert.match(generated.idf, /A01_DOME_VOLUME/);
    assert.match(generated.idf, /A01_DOME_BASE/);
    assert.match(generated.idf, /A01_DOME_SHELL_0001/);
    assert.match(generated.idf, /A01_Ideal_Loads/);
    assert.doesNotMatch(generated.idf, /\bNaN\b/);
    assert.equal(generated.objects.shellSurfaces, geometry.shellTriangles.length);
    assert.equal(generated.site.city, 'Biysk');
  } finally {
    await new Promise((resolveClose) => server.close(resolveClose));
  }
});
