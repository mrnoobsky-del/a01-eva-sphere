# Развёртывание A-01 v3.2.0 на uCoz

1. На Windows запустить START-A01-OFFLINE.bat один раз для подготовки локального набора Three.js.
2. Убедиться, что локальная папка vendor/three/build/ содержит three.module.js и собранный three.core.js, а vendor/three/examples/jsm/controls/ содержит OrbitControls.js.
3. Загрузить HTML в каталог сайта /evasphere/.
4. Загрузить всю папку vendor/ с сохранением структуры.
5. Очистить кеш браузера и проверить модель на компьютере и телефоне.

Ожидаемая структура:

/evasphere/
  eva-sphere-a01-v320-offline-engine.html
  vendor/three/build/three.module.js
  vendor/three/build/three.core.js
  vendor/three/examples/jsm/controls/OrbitControls.js

Не загружать только HTML: import map использует относительные локальные пути. Чат Евы остаётся онлайн-функцией.
