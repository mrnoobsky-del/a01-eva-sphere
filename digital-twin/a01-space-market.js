(() => {
  'use strict';

  const MODULES = [];
  const KIND_CATEGORY = {
    home: 'home', guest: 'guest', shop: 'retail', retail: 'retail',
    cafe: 'food', service: 'service', workshop: 'workshop',
    office: 'office', cowork: 'office', studio: 'studio', lab: 'lab'
  };

  function syncCatalogFromScene() {
    const sceneItems = window.EVA_SPHERE?.items;
    if (!Array.isArray(sceneItems)) return false;
    const catalog = sceneItems
      .filter(item => item?.isDolek && Array.isArray(item.tenureOptions) && item.tenureOptions.length > 0)
      .map(item => ({
        id: item.id,
        level: item.level,
        name: item.name,
        category: KIND_CATEGORY[item.kind] || 'service',
        type: item.type || 'Пространство',
        purpose: item.desc || 'Описание проектного сценария уточняется.',
        kind: item.kind,
        tenureOptions: [...item.tenureOptions],
        marketStatus: item.marketStatus || 'not-yet-offered',
        price: item.price ?? null,
        areaSqm: item.areaSqm ?? null,
        legalNote: item.legalNote || ''
      }));
    if (!catalog.length) return false;
    MODULES.splice(0, MODULES.length, ...catalog);
    const countNode = document.querySelector('.a01-market-statusline span:nth-child(2)');
    if (countNode) countNode.textContent = `Проектный каталог · ${MODULES.length} концептуальных модулей`;
    if (!MODULES.some(item => item.id === state.selectedId)) state.selectedId = null;
    return true;
  }

  const CATEGORY_LABELS = {
    all: 'Все типы',
    home: 'Жильё',
    guest: 'Гостевое размещение',
    retail: 'Торговля',
    food: 'Кафе и питание',
    service: 'Сервисы',
    workshop: 'Мастерские',
    office: 'Офисы и работа',
    studio: 'Студии',
    lab: 'Лаборатории'
  };

  const state = {
    mode: 'lease',
    level: 'all',
    category: 'all',
    query: '',
    term: '12',
    selectedId: null,
    lastFocus: null,
    previousBodyOverflow: ''
  };

  const $ = (id, root = document) => root.getElementById(id);
  const htmlEscape = value => String(value).replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[ch]);
  const levelLabel = level => `L${String(level).padStart(2, '0')}`;
  const selectedModule = () => MODULES.find(item => item.id === state.selectedId) || null;
  const modeLabel = () => state.mode === 'purchase' ? 'Покупка / будущая модель приобретения' : 'Аренда / будущая модель пользования';

  function currentSceneSelection() {
    const sceneState = window.EVA_SPHERE?.getState?.();
    const id = sceneState?.selectedId || $('objectCode')?.textContent?.trim();
    return MODULES.find(item => item.id === id) || null;
  }

  function mount() {
    const stageTop = document.querySelector('#stage .stage-top-right');
    if (!stageTop || $('a01MarketLaunch')) return false;

    const launch = document.createElement('button');
    launch.type = 'button';
    launch.id = 'a01MarketLaunch';
    launch.className = 'btn a01-market-launch';
    launch.setAttribute('aria-haspopup', 'dialog');
    launch.setAttribute('aria-controls', 'a01SpaceMarket');
    launch.innerHTML = '<span aria-hidden="true">⌂</span><span>Покупка и аренда</span>';
    stageTop.appendChild(launch);

    const overlay = document.createElement('div');
    overlay.id = 'a01SpaceMarket';
    overlay.className = 'a01-market-overlay';
    overlay.hidden = true;
    overlay.innerHTML = `
      <div class="a01-market-backdrop" data-market-close></div>
      <section class="a01-market-sheet" role="dialog" aria-modal="true" aria-labelledby="a01MarketTitle" aria-describedby="a01MarketDescription">
        <header class="a01-market-header">
          <div>
            <div class="a01-market-kicker">A-01 · SPACE MARKET</div>
            <h2 id="a01MarketTitle">Пространства Сферы</h2>
            <p id="a01MarketDescription">Выбери сценарий покупки или аренды и посмотри, где он расположен в 3D-модели.</p>
          </div>
          <button class="a01-market-close" type="button" data-market-close aria-label="Закрыть каталог">×</button>
        </header>

        <div class="a01-market-statusline">
          <span class="a01-market-status-dot"></span>
          <span>Проектный каталог · 39 концептуальных модулей</span>
          <span class="a01-market-status-pill">НЕ ОФЕРТА</span>
        </div>

        <div class="a01-market-mode" role="tablist" aria-label="Формат пользования">
          <button type="button" class="is-active" role="tab" aria-selected="true" data-market-mode="lease">Аренда</button>
          <button type="button" role="tab" aria-selected="false" data-market-mode="purchase">Покупка</button>
        </div>

        <div class="a01-market-filters">
          <label class="a01-market-search">
            <span>Поиск</span>
            <input id="a01MarketSearch" type="search" placeholder="Название, тип или код" autocomplete="off">
          </label>
          <label>
            <span>Уровень</span>
            <select id="a01MarketLevel">
              <option value="all">Все уровни</option>
              <option value="1">L01 · Атриум</option>
              <option value="2">L02 · Сервисы</option>
              <option value="3">L03 · Жильё</option>
              <option value="4">L04 · Управление</option>
            </select>
          </label>
          <label>
            <span>Тип пространства</span>
            <select id="a01MarketCategory">
              <option value="all">Все типы</option>
              <option value="home">Жильё</option>
              <option value="guest">Гостевое размещение</option>
              <option value="retail">Торговля</option>
              <option value="food">Кафе и питание</option>
              <option value="service">Сервисы</option>
              <option value="workshop">Мастерские</option>
              <option value="office">Офисы и работа</option>
              <option value="studio">Студии</option>
              <option value="lab">Лаборатории</option>
            </select>
          </label>
        </div>

        <div class="a01-market-selected-scene" id="a01MarketSceneSelection" aria-live="polite"></div>

        <div class="a01-market-content">
          <div class="a01-market-list-wrap">
            <div class="a01-market-list-head">
              <div><strong id="a01MarketResults">39 вариантов</strong><span>Все записи имеют статус «проект»</span></div>
              <button type="button" class="a01-market-reset" id="a01MarketReset">Сбросить</button>
            </div>
            <div class="a01-market-list" id="a01MarketList" role="list"></div>
          </div>
          <aside class="a01-market-detail" id="a01MarketDetail" aria-live="polite"></aside>
        </div>

        <footer class="a01-market-footer">
          <p><strong>Важно.</strong> Сфера Евы A-01 пока является концепцией. Физические помещения не построены, утверждённой площади, цены, свободного фонда и юридически оформленных прав на объекты нет. Выбор здесь — исследование будущей модели, а не бронь или договор.</p>
          <p>Право на помещение, право на отдельную модульную дольку и аренда док-места MODNET — разные отношения. Общие пространства и инженерные зоны не продаются как индивидуальные лоты.</p>
        </footer>
      </section>`;
    document.body.appendChild(overlay);

    launch.addEventListener('click', openMarket);
    overlay.addEventListener('click', event => {
      const closeTarget = event.target.closest('[data-market-close]');
      if (closeTarget) closeMarket();
      const modeButton = event.target.closest('[data-market-mode]');
      if (modeButton) {
        state.mode = modeButton.dataset.marketMode;
        renderMode();
        renderList();
        renderDetail();
      }
      const cardButton = event.target.closest('[data-market-select]');
      if (cardButton) {
        state.selectedId = cardButton.dataset.marketSelect;
        renderList();
        renderDetail();
      }
      const sceneButton = event.target.closest('[data-market-scene]');
      if (sceneButton) showSelectedInScene(sceneButton.dataset.marketScene);
      const copyButton = event.target.closest('[data-market-copy]');
      if (copyButton) copyRequest();
    });

    $('a01MarketSearch').addEventListener('input', event => {
      state.query = event.target.value.trim().toLocaleLowerCase('ru');
      renderList();
    });
    $('a01MarketLevel').addEventListener('change', event => {
      state.level = event.target.value;
      renderList();
    });
    $('a01MarketCategory').addEventListener('change', event => {
      state.category = event.target.value;
      renderList();
    });
    $('a01MarketReset').addEventListener('click', resetFilters);

    overlay.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMarket();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = [...overlay.querySelectorAll('button:not(:disabled), input:not(:disabled), select:not(:disabled), [tabindex]:not([tabindex="-1"])')]
        .filter(element => !element.hidden && element.getClientRects().length);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    syncCatalogFromScene();
    renderMode();
    renderList();
    renderDetail();
    return true;
  }

  function openMarket() {
    const overlay = $('a01SpaceMarket');
    if (!overlay) return;
    state.lastFocus = document.activeElement;
    state.previousBodyOverflow = document.body.style.overflow;
    syncCatalogFromScene();
    const sceneModule = currentSceneSelection();
    if (sceneModule) state.selectedId = sceneModule.id;
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add('is-open'));
    document.body.style.overflow = 'hidden';
    updateSceneSelection();
    renderList();
    renderDetail();
    window.setTimeout(() => overlay.querySelector('.a01-market-close')?.focus({ preventScroll: true }), 40);
  }

  function closeMarket() {
    const overlay = $('a01SpaceMarket');
    if (!overlay || overlay.hidden) return;
    overlay.classList.remove('is-open');
    document.body.style.overflow = state.previousBodyOverflow;
    window.setTimeout(() => {
      overlay.hidden = true;
      state.lastFocus?.focus?.({ preventScroll: true });
    }, 210);
  }

  function resetFilters() {
    state.level = 'all';
    state.category = 'all';
    state.query = '';
    $('a01MarketLevel').value = 'all';
    $('a01MarketCategory').value = 'all';
    $('a01MarketSearch').value = '';
    renderList();
  }

  function renderMode() {
    document.querySelectorAll('[data-market-mode]').forEach(button => {
      const active = button.dataset.marketMode === state.mode;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-selected', String(active));
    });
    const termField = $('a01MarketTerm');
    if (termField) termField.closest('.a01-market-term')?.toggleAttribute('hidden', state.mode !== 'lease');
  }

  function getFilteredModules() {
    return MODULES.filter(item => {
      const floorOk = state.level === 'all' || String(item.level) === state.level;
      const categoryOk = state.category === 'all' || item.category === state.category;
      const modeOk = item.tenureOptions.includes(state.mode);
      const searchText = `${item.id} ${item.name} ${item.type} ${item.purpose} ${CATEGORY_LABELS[item.category]}`.toLocaleLowerCase('ru');
      return floorOk && categoryOk && modeOk && (!state.query || searchText.includes(state.query));
    });
  }

  function renderList() {
    const list = $('a01MarketList');
    if (!list) return;
    const records = getFilteredModules();
    const countWord = records.length % 10 === 1 && records.length % 100 !== 11 ? 'вариант' : (records.length % 10 >= 2 && records.length % 10 <= 4 && (records.length % 100 < 12 || records.length % 100 > 14) ? 'варианта' : 'вариантов');
    $('a01MarketResults').textContent = `${records.length} ${countWord}`;
    list.innerHTML = records.map(item => `
      <article class="a01-market-card ${item.id === state.selectedId ? 'is-selected' : ''}" role="listitem">
        <button type="button" class="a01-market-card-main" data-market-select="${item.id}" aria-pressed="${String(item.id === state.selectedId)}">
          <span class="a01-market-card-meta"><span>${levelLabel(item.level)}</span><span>${CATEGORY_LABELS[item.category]}</span></span>
          <strong>${htmlEscape(item.name)}</strong>
          <span class="a01-market-card-type">${htmlEscape(item.type)} · ${item.id}</span>
          <span class="a01-market-card-status">${state.mode === 'purchase' ? 'Модель приобретения изучается' : 'Модель аренды изучается'}</span>
        </button>
        <button type="button" class="a01-market-card-scene" data-market-scene="${item.id}" aria-label="Показать ${htmlEscape(item.name)} в 3D">В 3D ↗</button>
      </article>`).join('');
    if (!records.length) {
      list.innerHTML = '<div class="a01-market-empty">По этому запросу ничего не найдено. Попробуй изменить фильтры.</div>';
    }
  }

  function renderDetail() {
    const detail = $('a01MarketDetail');
    if (!detail) return;
    const item = selectedModule();
    if (!item) {
      detail.innerHTML = `
        <div class="a01-market-detail-empty">
          <span class="a01-market-detail-icon">⌂</span>
          <h3>Выбери пространство</h3>
          <p>Карточка покажет его назначение, уровень и код. Кнопка «В 3D» переключит сцену на соответствующую дольку.</p>
        </div>`;
      return;
    }
    detail.innerHTML = `
      <div class="a01-market-detail-kicker">${levelLabel(item.level)} · ${CATEGORY_LABELS[item.category]}</div>
      <h3>${htmlEscape(item.name)}</h3>
      <p class="a01-market-detail-type">${htmlEscape(item.type)} · ${item.id}</p>
      <p class="a01-market-detail-purpose">${htmlEscape(item.purpose)}</p>
      ${item.category === 'home' || item.category === 'guest' ? '<p class="a01-market-housing-rule">Базовый безопасный доступ к жилью не должен зависеть от дохода. Покупка или аренда здесь рассматриваются только как возможный добровольный формат дополнительного выбора; правила требуют отдельной проверки.</p>' : ''}
      <div class="a01-market-detail-specs">
        <div><span>ПЛОЩАДЬ</span><strong>Уточняется</strong></div>
        <div><span>ЦЕНА</span><strong>Не определена</strong></div>
        <div><span>СТАТУС</span><strong>Проектный сценарий</strong></div>
        <div><span>ПРАВА</span><strong>${state.mode === 'purchase' ? 'Юридическая модель изучается' : 'Условия аренды изучаются'}</strong></div>
      </div>
      ${state.mode === 'lease' ? `
        <label class="a01-market-term" id="a01MarketTerm">
          <span>Предполагаемый срок</span>
          <select id="a01MarketTermSelect">
            <option value="1" ${state.term === '1' ? 'selected' : ''}>1 месяц</option>
            <option value="3" ${state.term === '3' ? 'selected' : ''}>3 месяца</option>
            <option value="6" ${state.term === '6' ? 'selected' : ''}>6 месяцев</option>
            <option value="12" ${state.term === '12' ? 'selected' : ''}>12 месяцев</option>
            <option value="24" ${state.term === '24' ? 'selected' : ''}>24 месяца</option>
            <option value="36" ${state.term === '36' ? 'selected' : ''}>36 месяцев</option>
          </select>
        </label>` : ''}
      <div class="a01-market-detail-actions">
        <button type="button" class="a01-market-primary" data-market-copy="${item.id}">Сформировать запрос</button>
        <button type="button" class="a01-market-secondary" data-market-scene="${item.id}">Показать в 3D</button>
      </div>
      <p class="a01-market-detail-note">Запрос создаётся только как текст для копирования на твоём устройстве. Он никуда не отправляется, не резервирует помещение и не создаёт обязательств.</p>`;
    const termSelect = $('a01MarketTermSelect');
    termSelect?.addEventListener('change', event => { state.term = event.target.value; });
  }

  function updateSceneSelection() {
    const holder = $('a01MarketSceneSelection');
    if (!holder) return;
    const sceneState = window.EVA_SPHERE?.getState?.();
    const id = sceneState?.selectedId || $('objectCode')?.textContent?.trim() || '';
    const item = MODULES.find(record => record.id === id);
    if (!item) {
      holder.innerHTML = '<span>В 3D-модели пока не выбрана коммерческая или жилая долька.</span><button type="button" id="a01MarketPickInScene">Выбрать в 3D</button>';
      $('a01MarketPickInScene')?.addEventListener('click', () => {
        closeMarket();
        showToast('Выбери дольку на 3D-модели, затем снова открой «Покупка и аренда».');
      });
      return;
    }
    holder.innerHTML = `<span>Сейчас выбрано в 3D: <strong>${htmlEscape(item.name)}</strong> · ${item.id}</span><button type="button" id="a01MarketUseScene">Добавить в подбор</button>`;
    $('a01MarketUseScene')?.addEventListener('click', () => {
      state.selectedId = item.id;
      state.level = 'all';
      state.category = 'all';
      $('a01MarketLevel').value = 'all';
      $('a01MarketCategory').value = 'all';
      renderList();
      renderDetail();
    });
  }

  function showSelectedInScene(id) {
    const item = MODULES.find(record => record.id === id);
    if (!item) return;
    if (window.EVA_SPHERE?.focusLevel && window.EVA_SPHERE?.selectItem) {
      window.EVA_SPHERE.focusLevel(item.level);
      window.EVA_SPHERE.selectItem(item.id);
      window.dispatchEvent(new CustomEvent('eva-ui-open-panel', { detail: 'object' }));
      closeMarket();
      showToast(`${item.name} · ${item.id}`);
      return;
    }
    closeMarket();
    showToast('3D-сцена ещё загружается. Повтори выбор через несколько секунд.');
  }

  async function copyRequest() {
    const item = selectedModule();
    if (!item) return;
    const lines = [
      'СФЕРА ЕВЫ A-01 · ПРЕДВАРИТЕЛЬНЫЙ ЗАПРОС',
      `Объект: ${item.name}`,
      `Код 3D-модуля: ${item.id}`,
      `Уровень: ${levelLabel(item.level)}`,
      `Категория: ${CATEGORY_LABELS[item.category]}`,
      `Формат: ${modeLabel()}`,
      ...(state.mode === 'lease' ? [`Предполагаемый срок: ${state.term} мес.`] : []),
      'Площадь: не определена',
      'Цена: не определена',
      'Статус: концептуальная модель, не оферта',
      'Этот текст не является заявкой, бронью, договором или подтверждением наличия помещения.'
    ];
    const text = lines.join('\n');
    try {
      if (navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const field = document.createElement('textarea');
        field.value = text;
        field.setAttribute('readonly', '');
        field.style.position = 'fixed';
        field.style.opacity = '0';
        document.body.appendChild(field);
        field.select();
        const copied = document.execCommand('copy');
        field.remove();
        if (!copied) throw new Error('Clipboard unavailable');
      }
      showToast('Текст запроса скопирован · отправка не настроена');
    } catch (_) {
      showToast('Не удалось скопировать текст запроса');
    }
  }

  function showToast(message) {
    const toast = $('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.style.display = 'block';
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => { toast.style.display = 'none'; }, 2800);
  }

  function initialize() {
    window.addEventListener('eva-a01:scene-ready', () => {
      syncCatalogFromScene();
      renderList();
      renderDetail();
      updateSceneSelection();
    }, { once: true });

    if (mount()) return;
    const ready = () => mount();
    document.addEventListener('DOMContentLoaded', ready, { once: true });
    const observer = new MutationObserver(() => {
      if (mount()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 15000);
  }

  initialize();
})();
