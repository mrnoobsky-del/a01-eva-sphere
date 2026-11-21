import { createEnergyPlus } from '@idfkit/engine';
import { httpSource, SchemaBundle } from '@idfkit/core';
import { buildDomeGeometry } from './geometry.js';
import { buildEnergyPlusModel, parseEpwLocation } from './model.js';
import { ENGINE_WASM_FILE, ENERGYPLUS_VERSION } from './version.js';

const $ = (id) => document.getElementById(id);
const statusEl = $('status');
const logEl = $('log');
const engineBadge = $('engine-badge');
const runButton = $('run-now');
const idfButton = $('download-idf');

let shellParameters;
let schema;
let engine;
let epwText = null;
let epwName = null;
let latestGeometry = null;
let latestModel = null;
let activeRun = false;
let runPending = false;
let runTimer = null;
let revision = 0;
let latestResult = null;
const engineLog = [];

function setStatus(message, kind = '') {
  statusEl.textContent = message;
  statusEl.className = `status ${kind}`.trim();
}

function log(message) {
  engineLog.push(String(message));
  if (engineLog.length > 800) engineLog.splice(0, engineLog.length - 800);
  logEl.textContent = engineLog.join('\n');
  logEl.scrollTop = logEl.scrollHeight;
}

function format(value, digits = 1) {
  return Number.isFinite(value)
    ? new Intl.NumberFormat('ru-RU', { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(value)
    : '—';
}

function readNumber(id, label, required = true) {
  const raw = $(id).value.trim();
  if (!raw) {
    if (!required) return 0;
    throw new Error(`Заполните поле «${label}».`);
  }
  const value = Number(raw);
  if (!Number.isFinite(value)) throw new Error(`Проверьте поле «${label}».`);
  return value;
}

function settings() {
  return {
    rimDiameterM: readNumber('rim-diameter', 'Диаметр опорного кольца'),
    shellU: readNumber('shell-u', 'U оболочки'),
    solarAbsorptance: readNumber('solar-absorptance', 'Солнечное поглощение оболочки'),
    heatingSetpoint: readNumber('heating-setpoint', 'Температура отопления'),
    coolingSetpoint: readNumber('cooling-setpoint', 'Температура охлаждения'),
    infiltrationAch: readNumber('infiltration-ach', 'Инфильтрация', false),
    ventilationAch: readNumber('ventilation-ach', 'Наружный воздухообмен', false),
    subdivisions: Number($('subdivisions').value)
  };
}

function updateGeometry() {
  if (!shellParameters) return null;
  try {
    const rimRaw = $('rim-diameter').value.trim();
    const rimDiameterM = rimRaw ? Number(rimRaw) : null;
    const subdivisions = Number($('subdivisions').value);
    const geometry = buildDomeGeometry(shellParameters, { rimDiameterM, subdivisions });
    latestGeometry = geometry;
    $('shell-area').textContent = geometry.calibrated ? `${format(geometry.shellArea)} м²` : `${format(geometry.shellArea)} ед²`;
    $('base-area').textContent = geometry.calibrated ? `${format(geometry.baseArea)} м²` : `${format(geometry.baseArea)} ед²`;
    $('volume').textContent = geometry.calibrated ? `${format(geometry.enclosedVolume)} м³` : `${format(geometry.enclosedVolume)} ед³`;
    $('height').textContent = geometry.calibrated ? `${format(geometry.height)} м` : `${format(geometry.height)} ед.`;
    $('facets').textContent = geometry.counts.shellTriangles.toLocaleString('ru-RU');
    $('scale').textContent = geometry.calibrated ? `${format(geometry.scaleToMetres, 4)} м/ед.` : 'не задан';
    if (!geometry.calibrated) {
      setStatus('Геометрия прочитана. Для физических расчётов укажите подтверждённый диаметр опорного кольца.', 'warn');
    }
    refreshModel();
    return geometry;
  } catch (error) {
    latestGeometry = null;
    latestModel = null;
    runButton.disabled = true;
    idfButton.disabled = true;
    setStatus(error.message, 'bad');
    return null;
  }
}

function refreshModel() {
  latestModel = null;
  idfButton.disabled = true;
  runButton.disabled = true;
  if (!schema || !latestGeometry?.calibrated || !epwText) return false;
  try {
    const input = settings();
    const model = buildEnergyPlusModel({
      schema,
      geometry: latestGeometry,
      settings: input,
      epwText
    });
    latestModel = model;
    idfButton.disabled = false;
    runButton.disabled = !engine;
    return true;
  } catch (error) {
    setStatus(error.message, 'warn');
    return false;
  }
}

function downloadText(name, text, mime) {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = name;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

function renderResult(result, seconds, runRevision, weatherName) {
  const errors = result.err?.entries ?? [];
  const severe = errors.filter((entry) => ['severe', 'fatal'].includes(entry.severity));
  const warnings = errors.filter((entry) => entry.severity === 'warning');
  latestResult = {
    result,
    seconds,
    runRevision,
    weatherName,
    geometry: latestGeometry,
    settings: settings()
  };
  const parts = [
    `EnergyPlus ${ENERGYPLUS_VERSION}`,
    `Код завершения: ${result.exitCode}`,
    `Время расчёта: ${format(seconds, 2)} с`,
    `Ошибки severe/fatal: ${severe.length}`,
    `Предупреждения: ${warnings.length}`
  ];
  if (!result.success) {
    setStatus(result.fatalError || 'EnergyPlus завершил расчёт с ошибкой.', 'bad');
    $('result').textContent = parts.join(' · ') + '\\n' + severe.map((entry) => entry.message).join('\\n');
    return;
  }
  setStatus(
    runRevision === revision
      ? 'EnergyPlus завершил расчёт. Проверьте предупреждения и исходные допущения.'
      : 'Последний запуск завершён; входные параметры уже изменились. Выполняется новый расчёт.',
    warnings.length || severe.length ? 'warn' : 'good'
  );
  const host = $('result');
  host.textContent = parts.join(' · ');
  if (result.html) {
    const frame = document.createElement('iframe');
    frame.title = 'EnergyPlus AllSummary results';
    frame.setAttribute('sandbox', '');
    frame.srcdoc = result.html;
    host.append(frame);
  } else {
    const note = document.createElement('p');
    note.textContent = 'EnergyPlus не вернул HTML-таблицу AllSummary. Смотрите журнал движка.';
    host.append(note);
  }
  if (severe.length || warnings.length) {
    const pre = document.createElement('pre');
    pre.textContent = [...severe, ...warnings].map((entry) => `[${entry.severity}] ${entry.message}`).join('\\n');
    host.append(pre);
  }
}

async function runLatest() {
  if (activeRun) {
    runPending = true;
    return;
  }
  if (!refreshModel() || !engine || !epwText || !latestModel) {
    setStatus('Для запуска нужны калиброванная геометрия, параметры оболочки и EPW-файл.', 'warn');
    return;
  }
  activeRun = true;
  runPending = false;
  const runRevision = revision;
  const modelSnapshot = latestModel;
  const weatherSnapshot = epwText;
  const weatherName = epwName;
  runButton.disabled = true;
  setStatus('EnergyPlus выполняет годовой расчёт в WebAssembly…');
  log('Starting EnergyPlus run; model and weather snapshots captured.');
  const start = performance.now();
  try {
    const result = await engine.run({ idf: modelSnapshot.idf, epw: weatherSnapshot });
    const seconds = (performance.now() - start) / 1000;
    log(`Run finished in ${format(seconds, 2)} s; exit code ${result.exitCode}; success ${result.success}.`);
    for (const entry of result.err?.entries ?? []) log(`[${entry.severity}] ${entry.message}`);
    if (runRevision === revision) renderResult(result, seconds, runRevision, weatherName);
    else {
      runPending = true;
      setStatus('Входные данные изменились во время предыдущего запуска. Старый результат не будет показан как текущий.', 'warn');
    }
  } catch (error) {
    log(`Engine run failed: ${error?.stack || error}`);
    setStatus(`Ошибка EnergyPlus: ${error?.message || error}`, 'bad');
  } finally {
    activeRun = false;
    runButton.disabled = !refreshModel() || !engine || !epwText;
    if (runPending && $('auto-run').checked) {
      runPending = false;
      queueRun(250);
    }
  }
}

function queueRun(delay = 850) {
  revision += 1;
  clearTimeout(runTimer);
  if (!$('auto-run').checked) {
    setStatus('Параметры обновлены. Автопересчёт выключен — нажмите «Рассчитать сейчас».', 'warn');
    refreshModel();
    return;
  }
  runTimer = setTimeout(() => runLatest(), delay);
}

$('rim-diameter').addEventListener('input', () => {
  updateGeometry();
  queueRun();
});
$('subdivisions').addEventListener('change', () => {
  updateGeometry();
  queueRun();
});
for (const id of [
  'shell-u',
  'solar-absorptance',
  'heating-setpoint',
  'cooling-setpoint',
  'infiltration-ach',
  'ventilation-ach'
]) {
  $(id).addEventListener('input', () => {
    refreshModel();
    queueRun();
  });
}

$('epw-file').addEventListener('change', async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const text = await file.text();
    const location = parseEpwLocation(text);
    epwText = text;
    epwName = file.name;
    $('epw-info').textContent =
      `${location.city}, ${location.country} · ${location.latitude.toFixed(3)}, ${location.longitude.toFixed(3)} · ${file.name}`;
    log(`Loaded EPW header: ${location.city}, ${location.country}; station ${location.station}.`);
    refreshModel();
    queueRun(350);
  } catch (error) {
    epwText = null;
    epwName = null;
    $('epw-info').textContent = error.message;
    setStatus(error.message, 'bad');
    refreshModel();
  }
});

runButton.addEventListener('click', () => {
  revision += 1;
  clearTimeout(runTimer);
  runLatest();
});
idfButton.addEventListener('click', () => {
  if (!refreshModel() || !latestModel) return;
  downloadText('A01-dome-shell-energyplus-26.1.idf', latestModel.idf, 'text/plain;charset=utf-8');
});
$('auto-run').addEventListener('change', () => {
  if ($('auto-run').checked) queueRun(250);
  else {
    clearTimeout(runTimer);
    setStatus('Автопересчёт остановлен. Рассчитать модель можно вручную.', 'warn');
  }
});

async function boot() {
  try {
    setStatus('Загружаем исходные параметры оболочки A-01…');
    const geometryResponse = await fetch(`${import.meta.env.BASE_URL}geometry/a01-shell-parameters-v0.1.json`);
    if (!geometryResponse.ok) throw new Error(`Geometry file unavailable: HTTP ${geometryResponse.status}`);
    shellParameters = await geometryResponse.json();
    updateGeometry();
    setStatus('Загружаем схему EnergyPlus и WebAssembly-движок…');

    const [loadedSchema, loadedEngine] = await Promise.all([
      new SchemaBundle(httpSource(`${import.meta.env.BASE_URL}schemas/`)).load(ENERGYPLUS_VERSION),
      createEnergyPlus({
        assetBaseUrl: `${import.meta.env.BASE_URL}energyplus`,
        wasmFile: ENGINE_WASM_FILE,
        onConsole: (line) => log(line),
        onProgress: ({ phase, message }) => {
          engineBadge.textContent = `${phase}`;
          if (message) setStatus(message);
        }
      })
    ]);
    schema = loadedSchema;
    engine = loadedEngine;
    engineBadge.textContent = `EnergyPlus ${ENERGYPLUS_VERSION} готов`;
    engineBadge.style.color = 'var(--good)';
    log(`EnergyPlus ${ENERGYPLUS_VERSION} initialized; geometry source loaded.`);
    setStatus('Движок готов. Заполните физический диаметр, U оболочки, солнечное поглощение и загрузите EPW.', 'warn');
    if (refreshModel()) queueRun(250);
  } catch (error) {
    engineBadge.textContent = 'Ошибка загрузки';
    engineBadge.style.color = 'var(--bad)';
    setStatus(`Не удалось подготовить расчётную среду: ${error?.message || error}`, 'bad');
    log(error?.stack || error);
  }
}

boot();
