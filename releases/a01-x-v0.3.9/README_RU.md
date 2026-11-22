# A-01 X v0.3.9 — Agent Runtime E2E

**Сквозная проверка управления миссиями через MCP и локальный API.**

v0.3.9 добавляет сквозные тесты между MCP stdio, HTTP API, browser bridge и Agent Runtime. Эта ветка содержит документацию и отчёт проверки; полный исполняемый пакет не загружен в GitHub.

- [Отчёт сквозной проверки (RU)](E2E-VALIDATION_RU.md)
- [Предыдущий релиз Agent Runtime v0.3.8 — документация и контракт миссии](https://github.com/mrnoobsky-del/a01-eva-sphere/tree/release/a01-x-v0.3.8-agent-runtime)
- [Pull request v0.3.9](https://github.com/mrnoobsky-del/a01-eva-sphere/pulls)

## Результат

Локальный `npm run check` завершился PASS: синтаксис, Agent World, AgentEyeCamera, Agent Runtime, Sensory Bridge/API, HTTP API, MCP stdio, E2E и 190 статических проверок геометрии/UI.

## Безопасность и границы

Внешние MCP/HTTP-команды перемещения, позы и направления головы создают только заявки на миссию. Исполнение требует явного подтверждения оператором в браузерном Agent Manager; Stop доступен немедленно.

Android-01 остаётся симуляцией. E2E использует тестовый адаптер вместо живой Three.js/WebGL-сцены. GPU/browser acceptance, физическая навигация, реальные камеры, приводы и системы здания не подключены.

## Полный исполняемый пакет

ZIP-пакет `a01-x-v0.3.9-agent-runtime-e2e.zip` подготовлен отдельно и передан в чат. Размер: 175 729 байт. SHA-256:

`73006b87fd39da3c30496a4ff8313c771f05378153d05b44ee1c0303761260b5`

Этот архив пока не является файлом GitHub-репозитория или GitHub Release Asset.
