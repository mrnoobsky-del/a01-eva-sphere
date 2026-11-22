# A-01 X v0.3.6 — интеграция AgentEyeCamera с Android-01

**База:** исходный Android-01 v0.3.5. **Результат:** камера подключена к существующей кости головы `worldRoot.androidRig.head`.

## Привязка к ригу

`agent/agent-world.js` экспортирует реальный `head` Bone в объекте `androidRig`. Иерархия остаётся 17-костной: `hips → spine → chest → neck → head`. AgentEyeCamera создаётся в основном `index.html` с прямой ссылкой на эту кость:

```js
agentEyeCamera = createA01AgentEyeCamera(THREE, {
  scene,
  headObject: worldRoot.androidRig.head,
  mainRenderer: renderer,
  agentId: 'android-01',
  options: {
    width: 640,
    height: 360,
    fps: 6,
    fov: 78,
    position: [0, 0.02, 0.235],
    yawRadians: Math.PI,
    sourceId: 'android-01-eye-camera',
    frameId: 'android-01-head-eye-camera',
    provenance: 'simulated'
  }
});
```

Камера является дочерней для реальной кости головы и следует за изменением её поворота, включая команды `A01AgentController.setLook()`. Направление скорректировано на π радиан: локальная система рига смотрит вперёд по +Z, а камера Three.js использует оптическое направление -Z.

## Отдельность обзора

Для глаз создаются второй canvas и второй WebGLRenderer. Главная spectator camera, OrbitControls, основной canvas и renderer остаются неизменными. Стартовая конфигурация — 640×360 при 6 FPS; верхний предел — 15 FPS, чтобы снизить нагрузку на GPU.

## Разрешение и приватность

Поток выключен по умолчанию. Пользователь нажимает «Включить» в панели «Агент»; интерфейс выдаёт локальную авторизацию `local_eye_stream` сроком на 10 минут. По истечении срока tracks останавливаются. Кадр можно получить локально через:

```js
window.A01Agent.eyeStatus();
const frame = await window.A01Agent.captureEyeFrame();
// frame.blob — JPEG Blob
// frame.metadata — timestamp, sequence, sourceId, frameId,
// dimensions, provenance: 'simulated', destination: 'local_only'
```

Удалённые start/stop команды через HTTP API/WebMCP намеренно не добавлены. Камера не запрашивает физическую камеру или микрофон компьютера и не отправляет кадры по сети.

## Sensory Bridge v0.2

Метаданные кадра соответствуют ключевым частям observation envelope: source ID, frame ID, sequence, timestamp, размеры, MIME type, provenance и local-only destination. Отдельный адаптер ещё должен обернуть Blob в `vision.rgb` observation с действительной сессией/разрешениями и передать его по аутентифицированному каналу. Эта передача в данной сборке не реализована.

## Приёмочные проверки

Локально пройдены `npm run check`, 8 тестов AgentEyeCamera, проверки Agent World, HTTP API, MCP stdio и 190 геометрических/UI-инвариантов. Браузерный WebGL/GPU acceptance на целевой машине ещё не выполнен; поэтому до развёртывания нужно проверить реальный вид через визор, задержку, память GPU и мобильную производительность.

## Ограничения

Все кадры относятся к цифровому симулятору и имеют `provenance: simulated`. Физической камеры, IMU, ROS 2, внешней vision model, облачной передачи, физического Android-01 или управления оборудованием нет. Координаты сцены не откалиброваны в метрах.
