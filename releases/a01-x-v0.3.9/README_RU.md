# A-01 X v0.3.9 — Agent Runtime E2E

**Сквозной исполняемый выпуск** на основе Agent Runtime v0.3.8.

## Состав релиза

- `source/` — полный исходный проект, распакованный из проверенного архива; структура сохранена как самостоятельный Node.js/Python-пакет.
- [Русская документация Agent Runtime](source/docs/AGENT-RUNTIME-ANTIGRAVITY-INSPIRED_RU.md)
- [Отчёт сквозной проверки](source/docs/AGENT-RUNTIME-E2E-VALIDATION_RU.md)
- [Схема миссии](source/schemas/a01-agent-mission-v0.1.schema.json)
- [Пример миссии](source/schemas/a01-agent-mission-v0.1.example.json)

## Что добавлено в v0.3.9

Сквозная проверка проходит через локальный HTTP-сервер, настоящий Python MCP stdio-процесс, browser bridge и production Agent Runtime. Заявки на перемещение, позу и поворот головы не выполняются до подтверждения оператором. Проверяются выполнение после подтверждения, отмена, отклонение неизвестных точек и немедленный Stop.

## Проверка

Из каталога `source/`:

```bash
npm install
npm run check
```

Локальная проверка пакета прошла: Agent World, AgentEyeCamera, Agent Runtime, Sensory Bridge/API, HTTP API, MCP stdio, E2E и аудит геометрии/UI (190 проверок).

## Ограничения

E2E-адаптер использует тестовую сцену вместо браузерного WebGL-рендера. Проверки DOM/GPU в Chrome, физическая навигация, калибровка координат и физический Android-01 не подтверждены. Android-01 остаётся симуляцией; реальные камеры, приводы и инфраструктура здания не подключены.
