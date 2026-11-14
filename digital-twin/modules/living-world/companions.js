(function (global, document) {
  "use strict";

  const FRAME_STEP = 1000 / 24;
  const FLOOR_Y = 2.04;
  const WALK_RADIUS = 2.65;
  const definitions = [
    { id: "mushkins", name: "Мушкинссс", role: "Любопытный спутник", type: "fly", location: "Центральный атриум · L01", spawn: { x: -0.72, y: FLOOR_Y, z: 2.25 } },
    { id: "eva", name: "Ева", role: "Световой аватар-помощник", type: "eva-orb", location: "Центральный атриум · L01", spawn: { x: 0.72, y: FLOOR_Y, z: 2.25 } }
  ];

  const state = {
    booted: false, api: null, companions: new Map(), selectedId: "mushkins",
    ambient: true, paused: false, raf: 0, lastFrame: 0, lastRender: 0,
    launcher: null, panel: null, status: null
  };

  function readAmbient() {
    try { return global.localStorage.getItem("a01.livingWorld.v01.ambient") !== "false"; }
    catch (error) { return true; }
  }
  function writeAmbient(value) {
    try { global.localStorage.setItem("a01.livingWorld.v01.ambient", value ? "true" : "false"); }
    catch (error) { /* Optional persistence. */ }
  }
  function requestRender() {
    const api = state.api;
    if (typeof global.requestSceneRender === "function") global.requestSceneRender();
    else if (api && api.renderer && api.scene && api.camera) api.renderer.render(api.scene, api.camera);
  }

  function buildUI() {
    const style = document.createElement("style");
    style.id = "a01LivingWorldStyles";
    style.textContent = [
      ".a01-lw-launcher{position:fixed;z-index:44;right:18px;top:104px;display:flex;align-items:center;gap:9px;padding:10px 14px;border:1px solid rgba(108,153,164,.34);border-radius:999px;background:rgba(248,251,249,.94);color:#15232a;font:650 11px/1.2 system-ui,-apple-system,Segoe UI,sans-serif;box-shadow:0 10px 34px rgba(13,30,38,.16);backdrop-filter:blur(18px);cursor:pointer}",
      ".a01-lw-launcher:before{content:'';width:8px;height:8px;border-radius:50%;background:#7b72d8;box-shadow:0 0 12px #8e80ff}",
      ".a01-lw-launcher[aria-expanded='true']{background:#111d27;color:#fff;border-color:#8198a8}",
      ".a01-lw-panel{position:fixed;z-index:46;right:18px;top:151px;width:min(330px,calc(100vw - 24px));max-height:calc(100vh - 174px);overflow:auto;padding:16px;border:1px solid rgba(118,151,163,.26);border-radius:20px;background:rgba(248,251,249,.97);color:#17232a;box-shadow:0 24px 75px rgba(5,18,26,.26);backdrop-filter:blur(24px);font:12px/1.45 system-ui,-apple-system,Segoe UI,sans-serif}",
      ".a01-lw-panel[hidden]{display:none}",
      ".a01-lw-panel-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:13px}",
      ".a01-lw-kicker{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:#697b80}",
      ".a01-lw-panel h2{margin:4px 0 0;font-size:18px;letter-spacing:-.035em;line-height:1.1}",
      ".a01-lw-close{width:30px;height:30px;border:1px solid #cad3d2;border-radius:50%;background:#fff;color:#26373d;font-size:18px;line-height:1;cursor:pointer}",
      ".a01-lw-description{margin:0 0 13px;color:#617177;font-size:10px;line-height:1.5}",
      ".a01-lw-list{display:grid;gap:7px;margin:0 0 13px}",
      ".a01-lw-person{width:100%;display:flex;align-items:center;gap:10px;padding:10px;border:1px solid #d7dfdc;border-radius:13px;background:#fff;color:#1b292f;text-align:left;cursor:pointer}",
      ".a01-lw-person[aria-pressed='true']{border-color:#849d9e;background:#edf5f2;box-shadow:inset 0 0 0 1px #b6ccc7}",
      ".a01-lw-avatar{width:32px;height:32px;display:grid;place-items:center;flex:0 0 auto;border-radius:11px;background:#e8e5fa;color:#6459a5;font-size:16px}",
      ".a01-lw-person[data-id='eva'] .a01-lw-avatar{background:#e2f3fb;color:#28779d}",
      ".a01-lw-person strong{display:block;font-size:11px}",
      ".a01-lw-person small{display:block;margin-top:2px;color:#68777c;font-size:9px}",
      ".a01-lw-section{margin:13px 0 7px;font-size:8px;letter-spacing:.14em;text-transform:uppercase;color:#718087}",
      ".a01-lw-actions{display:grid;grid-template-columns:1fr 1fr;gap:7px}",
      ".a01-lw-action,.a01-lw-toggle{min-height:36px;padding:8px 10px;border:1px solid #cbd7d5;border-radius:11px;background:#fff;color:#1b2b31;font:600 10px/1.25 system-ui,sans-serif;cursor:pointer}",
      ".a01-lw-action:hover,.a01-lw-toggle:hover{border-color:#7f9e9d;background:#f0f6f3}",
      ".a01-lw-toggle{width:100%;margin-top:7px;text-align:left;background:#eef3f1}",
      ".a01-lw-status{margin:11px 0 0;padding:9px 10px;border:1px solid #d9e1de;border-radius:11px;background:#f2f6f4;color:#5b6e72;font-size:9px;line-height:1.5}",
      ".a01-lw-disclaimer{margin:10px 0 0;color:#7b888b;font-size:8px;line-height:1.5}",
      "html[data-theme='dark'] .a01-lw-launcher{background:rgba(12,18,24,.95);color:#f4f7f6;border-color:#ffffff30}",
      "html[data-theme='dark'] .a01-lw-launcher[aria-expanded='true']{background:#fff;color:#101820}",
      "html[data-theme='dark'] .a01-lw-panel{background:rgba(12,17,22,.97);color:#f0f4f3;border-color:#ffffff28}",
      "html[data-theme='dark'] .a01-lw-kicker,html[data-theme='dark'] .a01-lw-section{color:#9baeb2}",
      "html[data-theme='dark'] .a01-lw-description,html[data-theme='dark'] .a01-lw-person small,html[data-theme='dark'] .a01-lw-disclaimer{color:#aab8b9}",
      "html[data-theme='dark'] .a01-lw-close,html[data-theme='dark'] .a01-lw-person,html[data-theme='dark'] .a01-lw-action,html[data-theme='dark'] .a01-lw-toggle{background:#141d24;color:#f0f4f3;border-color:#ffffff27}",
      "html[data-theme='dark'] .a01-lw-person[aria-pressed='true']{background:#202d35;border-color:#a8c4c0}",
      "html[data-theme='dark'] .a01-lw-avatar{background:#2d2945;color:#c2b7ff}",
      "html[data-theme='dark'] .a01-lw-person[data-id='eva'] .a01-lw-avatar{background:#193644;color:#a5ddf7}",
      "html[data-theme='dark'] .a01-lw-status{background:#141d24;color:#b8c5c5;border-color:#ffffff25}",
      "@media(max-width:780px){.a01-lw-launcher{top:70px;right:12px;padding:9px 12px;font-size:10px}.a01-lw-panel{top:112px;right:10px;width:calc(100vw - 20px);max-height:62vh;padding:14px;border-radius:17px}}",
      "@media(prefers-reduced-motion:reduce){.a01-lw-launcher,.a01-lw-panel,.a01-lw-person,.a01-lw-action,.a01-lw-toggle{transition:none!important}}"
    ].join("");
    document.head.appendChild(style);

    const launcher = document.createElement("button");
    launcher.type = "button";
    launcher.className = "a01-lw-launcher";
    launcher.id = "a01LivingWorldLauncher";
    launcher.textContent = "Живой мир";
    launcher.setAttribute("aria-controls", "a01LivingWorldPanel");
    launcher.setAttribute("aria-expanded", "false");
    launcher.addEventListener("click", function () { setPanelOpen(state.panel.hidden); });

    const panel = document.createElement("section");
    panel.className = "a01-lw-panel";
    panel.id = "a01LivingWorldPanel";
    panel.hidden = true;
    panel.setAttribute("aria-label", "Жители Сферы Евы");
    panel.innerHTML = [
      '<div class="a01-lw-panel-head"><div><div class="a01-lw-kicker">A-01 · LIVING WORLD · v0.1</div><h2>Жители Сферы</h2></div><button class="a01-lw-close" id="a01LivingWorldClose" type="button" aria-label="Закрыть">×</button></div>',
      '<p class="a01-lw-description">Небольшая команда цифровых спутников в центральном атриуме. Выбери жителя и попробуй действие.</p>',
      '<div class="a01-lw-list" id="a01LivingWorldList"></div>',
      '<div class="a01-lw-section">Действия</div>',
      '<div class="a01-lw-actions"><button class="a01-lw-action" type="button" data-action="greet">Поздороваться</button><button class="a01-lw-action" type="button" data-action="flap">Махнуть / импульс</button><button class="a01-lw-action" type="button" data-action="rest">Отдохнуть</button><button class="a01-lw-action" type="button" data-action="return">Вернуться на место</button></div>',
      '<button class="a01-lw-toggle" id="a01LivingWorldAmbient" type="button"></button>',
      '<button class="a01-lw-toggle" id="a01LivingWorldPause" type="button"></button>',
      '<div class="a01-lw-status" id="a01LivingWorldStatus" aria-live="polite">Спутники находятся в центральном атриуме.</div>',
      '<p class="a01-lw-disclaimer">v0.1 — визуальный прототип поведения. Внешний ИИ, голос, микрофон, распознавание речи и долговременная память пока не подключены.</p>'
    ].join("");

    document.body.appendChild(launcher);
    document.body.appendChild(panel);
    launcher.addEventListener("keydown", function (event) { if (event.key === "Escape") setPanelOpen(false); });
    panel.querySelector("#a01LivingWorldClose").addEventListener("click", function () { setPanelOpen(false); });
    panel.querySelector("#a01LivingWorldAmbient").addEventListener("click", function () {
      state.ambient = !state.ambient;
      writeAmbient(state.ambient);
      refreshUI();
    });
    panel.querySelector("#a01LivingWorldPause").addEventListener("click", function () {
      state.paused = !state.paused;
      refreshUI();
      if (!state.paused) requestRender();
    });
    panel.querySelectorAll("[data-action]").forEach(function (button) {
      button.addEventListener("click", function () { performAction(button.getAttribute("data-action")); });
    });
    panel.querySelector("#a01LivingWorldList").addEventListener("click", function (event) {
      const button = event.target.closest("[data-id]");
      if (button) selectCompanion(button.getAttribute("data-id"));
    });
    document.addEventListener("keydown", onKeydown);

    state.launcher = launcher;
    state.panel = panel;
    state.status = panel.querySelector("#a01LivingWorldStatus");
    refreshUI();
  }

  function setPanelOpen(open) {
    if (!state.panel || !state.launcher) return;
    state.panel.hidden = !open;
    state.launcher.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) {
      const selected = state.panel.querySelector('[data-id="' + state.selectedId + '"]');
      if (selected) selected.focus({ preventScroll: true });
    } else state.launcher.focus({ preventScroll: true });
  }
  function onKeydown(event) {
    if (event.key === "Escape" && state.panel && !state.panel.hidden) setPanelOpen(false);
  }
  function refreshUI() {
    if (!state.panel) return;
    const list = state.panel.querySelector("#a01LivingWorldList");
    list.innerHTML = definitions.map(function (item) {
      const icon = item.id === "mushkins" ? "✦" : "◉";
      const selected = item.id === state.selectedId;
      return '<button class="a01-lw-person" type="button" data-id="' + item.id + '" aria-pressed="' + (selected ? "true" : "false") + '">' +
        '<span class="a01-lw-avatar" aria-hidden="true">' + icon + '</span>' +
        '<span><strong>' + item.name + '</strong><small>' + item.role + '</small></span></button>';
    }).join("");
    state.panel.querySelector("#a01LivingWorldAmbient").textContent = "Автопрогулка: " + (state.ambient ? "включена" : "выключена");
    state.panel.querySelector("#a01LivingWorldPause").textContent = "Движение: " + (state.paused ? "приостановлено" : "активно");
    const selected = definitions.find(function (item) { return item.id === state.selectedId; });
    const companion = selected && state.companions.get(selected.id);
    if (state.status && selected) state.status.textContent = selected.name + " · " + selected.location + " · настроение: " + (companion ? companion.state.mood : "спокойное") + ".";
    state.launcher.textContent = "Живой мир · " + definitions.length;
  }

  function chooseTarget() {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.sqrt(Math.random()) * WALK_RADIUS;
    return { x: Math.cos(angle) * radius, z: Math.sin(angle) * radius };
  }
  function boundPosition(x, z) {
    const distance = Math.hypot(x, z);
    if (distance <= WALK_RADIUS) return { x: x, z: z };
    const scale = WALK_RADIUS / Math.max(distance, 0.0001);
    return { x: x * scale, z: z * scale };
  }

  function selectCompanion(id) {
    if (!state.companions.has(id)) return;
    state.selectedId = id;
    refreshUI();
    performAction("look");
  }

  function performAction(action) {
    const companion = state.companions.get(state.selectedId);
    if (!companion) return;
    const now = performance.now();
    const isFly = companion.definition.id === "mushkins";
    const messages = {
      greet: isFly ? "Мушкинссс приветственно машет крылышками." : "Ева отвечает мягким световым импульсом.",
      flap: isFly ? "Мушкинссс быстро-быстро машет крылышками." : "Ева запускает световую волну.",
      rest: companion.definition.name + " устраивается на короткий отдых.",
      return: companion.definition.name + " возвращается на исходное место.",
      look: companion.definition.name + " обращает внимание на тебя."
    };
    companion.state.action = action;
    companion.state.actionUntil = now + (action === "rest" ? 4200 : 2100);
    if (action === "return") {
      companion.state.target = { x: companion.state.spawn.x, z: companion.state.spawn.z };
      companion.state.actionUntil = now + 5000;
    }
    if (action === "greet") companion.state.mood = "дружелюбное";
    else if (action === "rest") companion.state.mood = "спокойное";
    else if (action === "flap") companion.state.mood = "оживлённое";
    if (state.status) state.status.textContent = messages[action] || messages.look;
    global.dispatchEvent(new CustomEvent("a01-living-world:companion-action", { detail: { id: companion.definition.id, action: action } }));
    requestRender();
    refreshUI();
  }

  function updateCompanion(companion, now, delta) {
    const c = companion.state;
    const group = companion.group;
    const elapsed = (now - companion.startedAt) / 1000;
    if (c.actionUntil && now >= c.actionUntil) { c.action = "idle"; c.actionUntil = 0; }

    if (!state.paused && state.ambient) {
      if (now >= c.nextDecisionAt && c.action === "idle") {
        const chosen = global.A01_LW_AI.chooseAmbientAction(c, now, Math.random());
        if (chosen === "wander") c.target = chooseTarget();
      }
      if (c.action === "wander" || c.action === "idle" || c.action === "look" || c.action === "curious") {
        const dx = c.target.x - group.position.x;
        const dz = c.target.z - group.position.z;
        const distance = Math.hypot(dx, dz);
        if (distance > 0.025) {
          const travel = Math.min(distance, c.speed * delta);
          group.position.x += dx / distance * travel;
          group.position.z += dz / distance * travel;
          group.rotation.y = Math.atan2(dx, dz);
        } else if (c.action === "wander") {
          c.action = "idle";
          c.nextDecisionAt = now + 1800 + Math.random() * 2200;
        }
      }
    }

    const bounded = boundPosition(group.position.x, group.position.z);
    group.position.x = bounded.x;
    group.position.z = bounded.z;
    const bob = companion.definition.type === "eva-orb" ? 0.08 : 0.035;
    const speed = companion.definition.type === "eva-orb" ? 1.6 : 2.5;
    const boost = c.action === "greet" || c.action === "flap" ? 1.9 : 1;
    group.position.y = c.baseY + Math.sin(elapsed * speed + c.phase) * bob * boost;
    if (c.action === "greet") group.rotation.y += Math.sin(elapsed * 10) * 0.004;
    if (c.action === "rest") group.rotation.z = Math.sin(elapsed * 2) * 0.025;
    else group.rotation.z *= 0.92;
    global.A01_LW_MOTION.update(group, c, elapsed);
  }

  function tick(now) {
    if (!state.booted) return;
    state.raf = requestAnimationFrame(tick);
    if (document.visibilityState === "hidden" || now - state.lastFrame < FRAME_STEP) return;
    const delta = state.lastFrame ? Math.min(0.08, (now - state.lastFrame) / 1000) : 0.04;
    state.lastFrame = now;
    state.companions.forEach(function (companion) { updateCompanion(companion, now, delta); });
    if (now - state.lastRender >= FRAME_STEP) { state.lastRender = now; requestRender(); }
  }

  function destroy() {
    if (state.raf) cancelAnimationFrame(state.raf);
    state.raf = 0;
    state.companions.forEach(function (companion) {
      state.api.scene.remove(companion.group);
      global.A01_LW_MOTION.dispose(companion.group);
    });
    state.companions.clear();
    if (state.launcher) state.launcher.remove();
    if (state.panel) state.panel.remove();
    const style = document.getElementById("a01LivingWorldStyles");
    if (style) style.remove();
    document.removeEventListener("keydown", onKeydown);
    state.booted = false;
    state.api = null;
    delete global.A01_LIVING_WORLD;
  }

  function boot(api) {
    if (state.booted) return;
    if (!api || !api.THREE || !api.scene || !api.camera || !api.renderer) {
      console.warn("[A-01 Living World] EVA_SPHERE API is incomplete; module remains inactive.");
      return;
    }
    if (!global.A01_LW_MOTION || !global.A01_LW_AI) {
      console.warn("[A-01 Living World] Load companion-motion.js and companion-ai.js before companions.js.");
      return;
    }
    state.api = api;
    state.ambient = readAmbient();
    state.booted = true;

    try {
      buildUI();
      const now = performance.now();
      definitions.forEach(function (definition) {
        const group = global.A01_LW_MOTION.create(api.THREE, definition.type);
        group.name = "A01-LW-" + definition.id;
        group.position.set(definition.spawn.x, definition.spawn.y, definition.spawn.z);
        api.scene.add(group);
        state.companions.set(definition.id, {
          definition: definition,
          group: group,
          state: global.A01_LW_AI.createState(definition, now),
          startedAt: now
        });
      });

      global.A01_LIVING_WORLD = {
        version: "0.1.0",
        list: function () { return definitions.map(function (item) { return { id: item.id, name: item.name, role: item.role, location: item.location }; }); },
        select: selectCompanion,
        action: performAction,
        setAmbient: function (value) { state.ambient = Boolean(value); writeAmbient(state.ambient); refreshUI(); },
        pause: function (value) { state.paused = Boolean(value); refreshUI(); requestRender(); },
        destroy: destroy
      };
      state.raf = requestAnimationFrame(tick);
      requestRender();
      global.dispatchEvent(new CustomEvent("a01-living-world:ready", { detail: { version: "0.1.0", count: definitions.length } }));
      console.info("[A-01 Living World] v0.1 initialized with", definitions.length, "procedural companions.");
    } catch (error) {
      console.error("[A-01 Living World] Initialization failed:", error);
      destroy();
    }
  }

  global.addEventListener("eva-a01:scene-ready", function () { boot(global.EVA_SPHERE); });
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      if (global.EVA_SPHERE) boot(global.EVA_SPHERE);
    }, { once: true });
  } else if (global.EVA_SPHERE) boot(global.EVA_SPHERE);
})(window, document);
