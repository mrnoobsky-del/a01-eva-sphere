# A-01 X v0.2.0 — Reality View

本版本升级了伊娃之球 A-01 X 的浏览器三维视觉原型，延续 A-01 X 技术线，不替代此前版本。

## 视觉系统

- 石材、木材、金属和玻璃的 PBR 材质。
- 使用 Poly Haven Cloud Layers HDR 环境照明和反射（CC0）。
- ACES 色调映射、动态阴影、画质配置和 FPS 自动调节。
- 玻璃穹顶、金属肋架、五层空间、连桥、自动扶梯和玻璃电梯。
- 程序化绿植、家具、示意人物和服务机器人。
- 动态路线及可切换的 Reality View 图层。
- 日光、室内暖光和夜间照明模式。
- RU / EN / 中文界面、环绕视图和桌面第一人称漫游。

## 运行

在启用 WebGL 并可访问 CDN 的新版 Chrome、Edge 或 Firefox 中打开 `eva-sphere-a01-x-v020-reality-view.html`。

Three.js 从 jsDelivr 加载。HDRI 从 Poly Haven 加载；若无法访问，则使用程序化 RoomEnvironment 环境照明。

## 验证与限制

已完成 JavaScript 静态语法检查。完整浏览器/WebGL 视觉验证、移动设备测试和真实设备性能测量尚未确认。

中庭仍是带有增强材质和灯光的程序化概念模型，不是摄影测量模型或实测 BIM 模型。人物、机器人、电梯和路线均为示意对象；未连接实时遥测或实体设备控制。模型尺寸仅用于概念展示，不是施工尺寸。

## 外部资源

- [Poly Haven — Cloud Layers HDRI](https://polyhaven.com/a/cloud_layers)，CC0。
- [Three.js](https://threejs.org/)，MIT License。
