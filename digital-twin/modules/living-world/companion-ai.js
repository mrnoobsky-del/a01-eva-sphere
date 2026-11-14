(function (global) {
  "use strict";
  if (global.A01_LW_AI) return;

  const ambientActions = [
    { id: "look", duration: 1500 },
    { id: "wander", duration: 2600 },
    { id: "pause", duration: 1800 },
    { id: "curious", duration: 1900 }
  ];

  function createState(definition, now) {
    return {
      id: definition.id,
      action: "idle",
      actionUntil: 0,
      nextDecisionAt: now + 2200 + Math.random() * 1800,
      target: { x: definition.spawn.x, z: definition.spawn.z },
      spawn: { x: definition.spawn.x, z: definition.spawn.z },
      speed: definition.id === "mushkins" ? 0.22 : 0.15,
      phase: Math.random() * Math.PI * 2,
      mood: "спокойное",
      ambient: true
    };
  }

  function chooseAmbientAction(state, now, randomValue) {
    const roll = Math.max(0, Math.min(0.999, Number(randomValue) || 0));
    const picked = ambientActions[Math.floor(roll * ambientActions.length)];
    state.action = picked.id;
    state.actionUntil = now + picked.duration;
    state.nextDecisionAt = now + 2600 + roll * 2200;
    if (picked.id === "curious") state.mood = "любопытное";
    else if (picked.id === "pause") state.mood = "спокойное";
    else state.mood = "внимательное";
    return picked.id;
  }

  global.A01_LW_AI = { createState: createState, chooseAmbientAction: chooseAmbientAction };
})(window);
