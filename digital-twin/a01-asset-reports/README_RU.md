# A-01 Asset Audit Pack v0.1

Комплект структурной проверки двух пользовательских GLB-файлов и подготовленных runtime-копий.

## Runtime-модели

- [Delivery Robot runtime GLB](../a01-assets/delivery-robot-runtime-v0.1.glb)
- [Axiom Starliner runtime GLB](../a01-assets/axiom-starliner-runtime-v0.1.glb)
- [Отдельная тестовая сцена](../a01-asset-test-scene-v0.1.html)

## Отчёты

- [Delivery Robot — JSON](delivery-robot-audit-v0.1.json)
- [Axiom Starliner — JSON](axiom-starliner-audit-v0.1.json)
- [Методика, сравнение размеров, SHA-256 и проверки](OPTIMIZATION-MANIFEST-v0.1_RU.md)

## Статус проверки

- GLB header, JSON и binary chunks прочитаны.
- BufferView offsets и длины проверены.
- Mesh / vertex / triangle counts сверены до и после оптимизации.
- World-space bounds сравнены; различий в пределах численной точности не обнаружено.
- У Delivery Robot сохранены один skin, девять joints, один animation clip и 11 каналов.
- В браузере, на телефоне и на целевом GPU модели ещё не принимались.
- Ни одна модель не включена в основную сцену A-01.

## Происхождение и лицензия

Авторы, страницы и лицензии в JSON-отчётах взяты из metadata, встроенных в предоставленные GLB-файлы. Это не автоматическая юридическая проверка актуальных страниц Sketchfab. Перед повторным распространением сверяйте карточки исходных моделей и сохраняйте требуемую атрибуцию.

**Оригинальные файлы сохранены отдельно.** Runtime GLB являются производными копиями; они не заменяют оригиналы.