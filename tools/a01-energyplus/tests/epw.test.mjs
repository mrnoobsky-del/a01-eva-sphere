import test from 'node:test';
import assert from 'node:assert/strict';
import { parseEpwLocation } from '../src/model.js';

test('reads site coordinates and elevation from an EPW LOCATION row', () => {
  const location = parseEpwLocation(
    'LOCATION,Biysk,Altai Krai,RU,TMYx,29838,52.51,85.14,7.0,190.0\n'
  );
  assert.equal(location.city, 'Biysk');
  assert.equal(location.country, 'RU');
  assert.equal(location.latitude, 52.51);
  assert.equal(location.longitude, 85.14);
  assert.equal(location.timeZone, 7);
  assert.equal(location.elevation, 190);
});

test('rejects a weather file without a valid LOCATION row', () => {
  assert.throws(() => parseEpwLocation('DESIGN CONDITIONS\n'), /LOCATION/);
  assert.throws(() => parseEpwLocation(''), /empty/);
});

test('rejects invalid EPW coordinates rather than writing a malformed site', () => {
  assert.throws(
    () => parseEpwLocation('LOCATION,Site,State,Country,Source,Station,120,85,7,190\n'),
    /latitude/
  );
});
