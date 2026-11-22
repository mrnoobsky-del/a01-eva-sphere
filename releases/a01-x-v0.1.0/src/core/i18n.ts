export type AppLanguage = 'ru' | 'en' | 'zh';

const messages = {
  ru: {
    prototype: 'ЦИФРОВОЙ ПРОТОТИП', sphere: 'Сфера Евы', tagline: 'Энергия · Интеллект · Жизнь',
    scene: 'Сцена', centralAtrium: 'Центральный атриум', levels: 'Уровни', dataMode: 'Режим данных', simulation: 'Симуляция',
    navigation: 'НАВИГАЦИЯ ПО УРОВНЯМ', plaza: 'Площадь', gallery: 'Галерея', upperGallery: 'Верхний ярус',
    camera: 'КАМЕРА', orbit: 'Обзор', walk: 'Прогулка', reset: 'Вернуть обзор', systemMonitor: 'SYSTEM MONITOR',
    sceneState: 'Состояние сцены', frameRate: 'Частота кадров', qualityProfile: 'Профиль качества', graphicsMode: 'Графический режим',
    engineeringData: 'Инженерные данные', notConnected: 'Не подключены', demoNote: 'Показатели относятся к локальной демонстрационной сцене. Телеметрия физического объекта не подключена.',
    movement: 'движение', exit: 'выход', walkTip: 'Кликните по сцене, чтобы захватить курсор · WASD — движение · ESC — выход',
    loading: 'ЗАГРУЗКА ЦИФРОВОЙ СЦЕНЫ', webglTitle: '3D-режим недоступен',
    webglNote: 'Браузер не смог создать WebGL-контекст. Обновите драйвер видеокарты или откройте проект в другом браузере.',
    orbitView: 'ORBIT VIEW', firstPerson: 'FIRST PERSON', floors: ['Площадь', 'Галерея', 'Галерея', 'Галерея', 'Верхний ярус']
  },
  en: {
    prototype: 'DIGITAL PROTOTYPE', sphere: 'The Sphere of Eva', tagline: 'Energy · Intelligence · Life',
    scene: 'Scene', centralAtrium: 'Central atrium', levels: 'Levels', dataMode: 'Data mode', simulation: 'Simulation',
    navigation: 'FLOOR NAVIGATION', plaza: 'Plaza', gallery: 'Gallery', upperGallery: 'Upper gallery',
    camera: 'CAMERA', orbit: 'Orbit', walk: 'Walk', reset: 'Reset view', systemMonitor: 'SYSTEM MONITOR',
    sceneState: 'Scene status', frameRate: 'Frame rate', qualityProfile: 'Quality profile', graphicsMode: 'Graphics mode',
    engineeringData: 'Engineering data', notConnected: 'Not connected', demoNote: 'Metrics refer to this local demonstration scene. No physical-facility telemetry is connected.',
    movement: 'move', exit: 'exit', walkTip: 'Click the scene to capture the pointer · WASD — move · ESC — release',
    loading: 'LOADING DIGITAL SCENE', webglTitle: '3D mode unavailable',
    webglNote: 'The browser could not create a WebGL context. Update your graphics driver or open the project in another browser.',
    orbitView: 'ORBIT VIEW', firstPerson: 'FIRST PERSON', floors: ['Plaza', 'Gallery', 'Gallery', 'Gallery', 'Upper gallery']
  },
  zh: {
    prototype: '数字原型', sphere: '伊娃之球', tagline: '能源 · 智能 · 生命',
    scene: '场景', centralAtrium: '中央中庭', levels: '楼层', dataMode: '数据模式', simulation: '模拟',
    navigation: '楼层导航', plaza: '广场', gallery: '环廊', upperGallery: '上层环廊',
    camera: '摄像机', orbit: '环绕视图', walk: '漫游', reset: '重置视图', systemMonitor: '系统监视器',
    sceneState: '场景状态', frameRate: '帧率', qualityProfile: '画质配置', graphicsMode: '图形模式',
    engineeringData: '工程数据', notConnected: '未连接', demoNote: '这些指标仅属于本地演示场景。尚未连接实体设施的遥测数据。',
    movement: '移动', exit: '退出', walkTip: '点击场景以锁定指针 · WASD — 移动 · ESC — 释放',
    loading: '正在加载数字场景', webglTitle: '3D 模式不可用',
    webglNote: '浏览器无法创建 WebGL 上下文。请更新显卡驱动或使用其他浏览器打开项目。',
    orbitView: 'ORBIT VIEW', firstPerson: 'FIRST PERSON', floors: ['广场', '环廊', '环廊', '环廊', '上层环廊']
  }
} as const;

export type MessageKey = keyof typeof messages.ru;

export function translate(key: MessageKey, language: AppLanguage): string {
  return messages[language][key] as string;
}

export function floorName(level: number, language: AppLanguage): string {
  const index = Math.min(Math.max(level, 0), 4);
  return messages[language].floors[index];
}