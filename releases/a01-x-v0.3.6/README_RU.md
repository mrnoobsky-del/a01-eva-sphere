# A-01 X v0.3.6 — Android-01 с камерой от первого лица

**Основа:** исходный Android-01 v0.3.5.  
**Изменение:** AgentEyeCamera подключена к настоящей кости головы исходного 17-костного Three.js rig.  
**Статус:** программная интеграция цифрового двойника; физический робот не подключён.

## Что изменено

- Исходный 17-костный риг сохранён; объект `head` экспортируется из `androidRig`.
- AgentEyeCamera добавляет независимую PerspectiveCamera прямо к `worldRoot.androidRig.head`.
- Камера использует отдельный canvas и WebGLRenderer; камера наблюдателя и основной renderer не заменяются.
- Вкладка «Агент» получила локальное превью глазной камеры и кнопки запуска, остановки и захвата кадра.
- Запуск требует отдельного явного действия оператора и кратковременного разрешения `local_eye_stream` (10 минут).
- Кадр возвращается как JPEG Blob с timestamp, sequence, source/frame IDs и `provenance: simulated`.
- Удалённый запуск съёмки через HTTP API и WebMCP не добавлен.

## Файлы в этом каталоге

- [Модуль AgentEyeCamera](agent-eye-camera.js)
- [Интеграционные заметки](SENSORY-BRIDGE-INTEGRATION_RU.md)
- [Заметки к выпуску](RELEASE-NOTES.md)
- [Проверки AgentEyeCamera](agent-eye-camera-check.mjs)

Полная сборка с обновлёнными `index.html`, `agent/agent-world.js`, HTTP/MCP инструментами и всеми ресурсами собрана в архив, приложенный к этому релизу в чате: `a01-x-v0.3.6-agent-eye-camera.zip`.

## Проверки

В локальной сборке выполнено:

- `npm run check` — PASS;
- 17-костный Agent World и 5-уровневая навигация — PASS;
- AgentEyeCamera — 8 интеграционных проверок PASS;
- HTTP API — PASS;
- MCP stdio — PASS;
- аудит геометрии и UI — 190 проверок PASS.

Проверка в реальном браузере/WebGL/GPU на целевой машине не выполнена. Доступ к CDN Three.js из этой среды был недоступен по DNS, поэтому нельзя заявлять о визуальном GPU acceptance.

## Ограничения

Android-01 остаётся программным Bone-ригом, не физическим гуманоидом. Кадры имеют происхождение `simulated`. Нет физического camera driver, IMU, микрофона, внешней vision model, облачной отправки, ROS 2 адаптера, actuator control или подключения BMS. Размеры сцены не калиброваны в метрах.
