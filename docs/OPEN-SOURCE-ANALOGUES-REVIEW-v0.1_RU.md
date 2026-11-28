# Обзор GitHub-аналогов для A-01 — v0.1

**Дата обзора:** 28 ноября 2026 года. Единого точного аналога A-01 не найдено.

| Проект | Полезное направление | Лицензия / ограничение |
|---|---|---|
| [SIMOC](https://github.com/overthesun/simoc) | Замкнутые потоки воздуха, воды, энергии, пищи и растений | GPL-3.0 в основном репозитории; проверять каждый компонент |
| [SIMOC-Web](https://github.com/overthesun/simoc-web) | Веб-интерфейс, Three.js и модель поселения | CC BY-NC-ND 4.0; не использовать как основу изменённой или коммерческой версии без разрешения |
| [SIMOC-ABM](https://github.com/overthesun/simoc-abm) | Агентная модель потоков экосистемы | GPL-3.0; учитывать copyleft при распространении производных работ |
| [AstroSim](https://github.com/aadriantech/astrosim) | Power, ECLSS, Thermal, Structure, ISRU, Greenhouse, сценарии | MIT; Alpha, модели требуют валидации |
| [MarsHSim](https://github.com/Adore2113/MarsHSim) | Атмосфера, вода, энергия, пища и долгосрочное поселение | Отдельный LICENSE в просмотренной версии не обнаружен; код не копировать без уточнения прав |
| [MyEMS](https://github.com/MyEMS/myems) | Энергомониторинг зданий, воды, тепла, холода и микросетей | MIT с дополнительным условием сохранения логотипа и авторских прав |
| [DTwin](https://github.com/zencodelab/DTwin) | Пространственная модель здания, IoT-телеметрия и 3D-панель | All rights reserved; только архитектурный ориентир |

## Выводы
1. Не заменять Three.js-движок A-01: актуальная сборка уже содержит сцену, выбор объектов, LOD, batching и адаптивный pixel ratio.
2. Развивать собственный интеграционный слой, не копируя код с несовместимыми лицензиями.
3. Отделять модель от телеметрии: будущие измерения должны иметь происхождение, единицы, частоту, калибровку и статус качества.
4. Проверять лицензии выбранных версий, зависимостей, моделей и изображений перед переносом кода.

## Источники
- https://github.com/overthesun/simoc
- https://github.com/overthesun/simoc-web
- https://github.com/overthesun/simoc-abm
- https://github.com/overthesun/simoc-sam
- https://github.com/aadriantech/astrosim
- https://github.com/Adore2113/MarsHSim
- https://github.com/MyEMS/myems
- https://github.com/zencodelab/DTwin

Обзор фиксирует просмотренные README и LICENSE. Перед фактическим использованием лицензии и зависимости нужно перепроверить.
