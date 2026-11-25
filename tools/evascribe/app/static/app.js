(() => {
  const $ = (selector) => document.querySelector(selector);
  const state = { items: [], selected: null, poller: null, view: 'library', dark: false };
  const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const timeText = (seconds = 0) => {
    const value = Math.max(0, Math.floor(Number(seconds) || 0));
    const h = Math.floor(value / 3600), m = Math.floor((value % 3600) / 60), s = value % 60;
    return h ? `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}` : `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  };
  const durationText = (seconds) => seconds ? `${Math.floor(seconds / 60)} мин` : 'длительность уточняется';
  const showToast = (message) => { const el = $('#toast'); el.textContent = message; el.classList.add('show'); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => el.classList.remove('show'), 3100); };
  const statusLabel = (status) => ({queued:'В очереди',processing:'Обработка',downloading:'Получение',transcribing:'Расшифровка',analyzing:'Анализ',ready:'Готово',failed:'Ошибка',cancelled:'Отменено'}[status] || status || 'Новый');
  const isActive = (status) => ['queued','processing','downloading','transcribing','analyzing'].includes(status);

  async function api(url, options = {}) {
    const response = await fetch(url, options);
    const type = response.headers.get('content-type') || '';
    const data = type.includes('application/json') ? await response.json() : await response.text();
    if (!response.ok) throw new Error(data?.detail || data || `Ошибка ${response.status}`);
    return data;
  }

  async function checkHealth() {
    try {
      const data = await api('/api/health');
      const ready = data.asr_installed;
      $('#engineLabel').textContent = ready ? `Whisper · ${data.model}` : 'Движок не установлен';
      $('#queueDot').style.display = data.queue_size ? 'block' : 'none';
      return data;
    } catch (_) { $('#engineLabel').textContent = 'Сервер не отвечает'; return null; }
  }

  async function loadLibrary(query = '') {
    $('#libraryList').innerHTML = '<div class="loading-state"><span class="spinner"></span><span>Обновляю медиатеку…</span></div>';
    try {
      const data = await api(`/api/library?limit=200${query ? `&q=${encodeURIComponent(query)}` : ''}`);
      state.items = data.items || [];
      renderLibrary();
    } catch (error) {
      $('#libraryList').innerHTML = `<div class="empty-state"><h3>Не удалось подключиться</h3><p>${escapeHtml(error.message)}</p><button class="secondary-btn" id="retryLoad">Повторить</button></div>`;
      $('#retryLoad')?.addEventListener('click', () => loadLibrary(query));
    }
  }

  function renderLibrary() {
    const query = $('#librarySearch').value.trim().toLowerCase();
    let items = [...state.items];
    if (state.view === 'queue') items = items.filter(item => isActive(item.status));
    if (state.view === 'recent') items = items.slice(0, 12);
    if (query) items = items.filter(item => `${item.title} ${item.creator || ''} ${item.summary || ''}`.toLowerCase().includes(query));
    const sort = $('#sortSelect').value;
    if (sort === 'oldest') items.reverse();
    if (sort === 'title') items.sort((a,b) => a.title.localeCompare(b.title, 'ru'));
    const ready = state.items.filter(item => item.status === 'ready').length;
    const processing = state.items.filter(item => isActive(item.status)).length;
    $('#libraryCount').textContent = state.items.length;
    $('#metricSources').innerHTML = `${state.items.length} <small>материалов</small>`;
    $('#metricReady').innerHTML = `${ready} <small>материалов</small>`;
    $('#metricProcessing').innerHTML = `${processing} <small>задач</small>`;
    $('#listCount').textContent = items.length;
    $('#emptyState').classList.toggle('hidden', items.length > 0);
    $('#libraryList').classList.toggle('hidden', items.length === 0);
    if (!items.length) return;
    $('#libraryList').innerHTML = items.map(item => {
      const active = isActive(item.status);
      const audio = (item.media_type || '').startsWith('audio') || /\.(mp3|wav|m4a|aac|flac|ogg|opus)$/i.test(item.original_filename || '');
      const excerpt = item.status === 'failed' ? `Ошибка: ${item.error || 'обработка не завершена'}` : item.status === 'ready' ? (item.summary || 'Расшифровка готова') : (item.stage || 'Подготовка материала');
      return `<article class="source-card" data-id="${escapeHtml(item.id)}" tabindex="0" role="button" aria-label="Открыть ${escapeHtml(item.title)}">
        <div class="source-thumb ${audio ? 'audio' : 'video'}">${audio ? '♫' : '▣'}</div>
        <div class="source-main"><div class="source-title-row"><strong class="source-title">${escapeHtml(item.title)}</strong></div>
          <div class="source-meta"><span>${escapeHtml(item.creator || item.original_filename || 'Локальный материал')}</span><span>${durationText(item.duration)}</span><span>${new Date(item.created_at).toLocaleDateString('ru-RU')}</span></div>
          <div class="source-summary">${escapeHtml(excerpt)}</div>
          ${active ? `<div class="source-progress"><i style="width:${Math.max(3, Number(item.progress) || 0)}%"></i></div>` : ''}
        </div><div class="source-status-wrap"><span class="source-status ${escapeHtml(item.status)}">${statusLabel(item.status)}${active ? ` · ${item.progress || 0}%` : ''}</span></div>
      </article>`;
    }).join('');
    $('#libraryList').querySelectorAll('.source-card').forEach(card => {
      const open = () => openSource(card.dataset.id);
      card.addEventListener('click', open);
      card.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); } });
    });
  }

  function setView(view) {
    state.view = view;
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.toggle('active', btn.dataset.view === view));
    const labels = {library:['Медиатека','Все материалы','Видео, аудио и расшифровки — в одном пространстве.'],recent:['Недавние','Недавние материалы','Продолжите исследование с того места, где остановились.'],search:['Поиск по архиву','Результаты поиска','Найдите точный фрагмент среди сохранённых транскриптов.'],queue:['Очередь обработки','Активные задачи','Следите за получением источников и расшифровкой.']};
    const [title,listTitle,subtitle] = labels[view] || labels.library;
    $('#breadcrumbCurrent').textContent = title; $('#pageTitle').textContent = title; $('#pageSubtitle').textContent = subtitle; $('#listTitle').textContent = listTitle;
    if (view === 'search') $('#librarySearch').focus();
    renderLibrary();
  }

  async function addUrl(event) {
    event.preventDefault();
    const input = $('#sourceUrl'); const url = input.value.trim();
    if (!url) return;
    try {
      const result = await api('/api/sources/url', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({url, language:$('#languageSelect').value})});
      input.value = ''; showToast('Источник добавлен в очередь'); await loadLibrary(); openSource(result.source_id); startPolling();
    } catch (error) { showToast(error.message); }
  }

  async function uploadFile(file) {
    if (!file) return;
    const data = new FormData(); data.append('file', file); data.append('language', $('#languageSelect').value);
    showToast('Загружаю материал…');
    try {
      const result = await api('/api/sources/upload', {method:'POST', body:data});
      showToast('Материал добавлен в очередь'); $('#fileInput').value = ''; await loadLibrary(); openSource(result.source_id); startPolling();
    } catch (error) { showToast(error.message); }
  }

  async function openSource(id) {
    try {
      const source = await api(`/api/sources/${id}`);
      state.selected = source;
      $('#drawerBackdrop').classList.remove('hidden'); $('#detailDrawer').classList.remove('hidden');
      renderDetail(source);
      if (isActive(source.status)) startPolling();
    } catch (error) { showToast(error.message); }
  }

  function renderDetail(source) {
    const summary = source.summary_data || {};
    const overview = summary.highlights || [];
    const keywords = summary.keywords || [];
    const mediaReady = source.status === 'ready';
    const audio = (source.media_type || '').startsWith('audio') || /\.(mp3|wav|m4a|aac|flac|ogg|opus)$/i.test(source.original_filename || '');
    $('#drawerContent').innerHTML = `
      <div class="detail-eyebrow">МАТЕРИАЛ · ${escapeHtml(source.id.slice(0,8).toUpperCase())}</div>
      <h2 class="detail-title">${escapeHtml(source.title)}</h2>
      <div class="detail-meta"><span>${escapeHtml(source.creator || source.original_filename || 'Локальный источник')}</span><span>·</span><span>${durationText(source.duration)}</span><span>·</span><span>${source.language && source.language !== 'auto' ? escapeHtml(source.language) : 'язык определяется автоматически'}</span></div>
      <div class="status-line"><span class="status-dot"></span>${statusLabel(source.status)}${isActive(source.status) ? ` · ${source.progress || 0}% · ${escapeHtml(source.stage || '')}` : ''}</div>
      ${source.status === 'failed' ? `<div class="summary-box" style="margin-top:15px;color:#a65050">${escapeHtml(source.error || 'Не удалось обработать источник.')}</div>` : ''}
      <div class="player-wrap">${mediaReady && source.has_media ? (audio ? `<audio controls preload="metadata" src="/api/sources/${source.id}/media"></audio>` : `<video controls preload="metadata" src="/api/sources/${source.id}/media"></video>`) : `<div class="player-empty">${isActive(source.status) ? '<span class="spinner"></span><p>Материал обрабатывается. Плеер появится после подготовки источника.</p>' : source.source_url ? `<p>Расшифровка получена из субтитров источника.</p><a href="${escapeHtml(source.source_url)}" target="_blank" rel="noopener" style="color:#95c9a1">Открыть оригинал ↗</a>` : '<p>Локальный плеер недоступен.</p>'}</div>`}</div>
      <section class="drawer-section"><h3>Обзор</h3><div class="summary-box">${escapeHtml(summary.note || (mediaReady ? 'Транскрипт готов. Обзор строится по тексту и не является независимой проверкой фактов.' : 'После обработки здесь появятся обзор, темы и характерные фрагменты.'))}</div>
        ${keywords.length ? `<div class="keyword-list">${keywords.map(tag => `<span class="keyword">${escapeHtml(tag)}</span>`).join('')}</div>` : ''}
        ${overview.length ? `<div class="segment-list" style="margin-top:10px">${overview.map(item => `<button class="segment-item jump-time" data-time="${Number(item.start)||0}"><span class="segment-time">${escapeHtml(item.time)}</span><span>${escapeHtml(item.text)}</span></button>`).join('')}</div>` : ''}
      </section>
      <section class="drawer-section"><h3>Транскрипт <span class="counter">${source.segment_count || 0}</span></h3><input id="segmentSearch" class="segment-search" type="search" placeholder="Найти слово или фразу…"><div class="segment-list" id="segmentList">${mediaReady ? '<div class="loading-state"><span class="spinner"></span><span>Загружаю текст…</span></div>' : '<div class="summary-box">Транскрипт появится после обработки.</div>'}</div></section>
      <section class="drawer-section"><h3>Задать вопрос по материалу</h3><form id="askForm"><input id="askQuestion" class="segment-search" required minlength="2" placeholder="Что говорится о…"><button class="primary-btn" type="submit">Найти ответ и фрагменты ↗</button></form><div id="askResult"></div></section>
      <div class="detail-footer">Распознавание и выводы могут содержать ошибки. Проверяйте важные сведения по оригиналу и независимым источникам.</div>`;
    $('#exportBtn').disabled = !mediaReady; $('#deleteBtn').onclick = () => deleteSource(source.id);
    $('#exportBtn').onclick = () => { const menu = prompt('Формат экспорта: txt, md, json, srt или vtt', 'md'); if (menu && ['txt','md','json','srt','vtt'].includes(menu.toLowerCase())) window.location.href = `/api/sources/${source.id}/export?format=${menu.toLowerCase()}`; };
    $('#drawerContent').querySelectorAll('.jump-time').forEach(btn => btn.addEventListener('click', () => jumpTo(Number(btn.dataset.time))));
    $('#segmentSearch')?.addEventListener('input', debounce(() => loadSegments(source.id, $('#segmentSearch').value), 250));
    $('#askForm')?.addEventListener('submit', event => askSource(event, source.id));
    if (mediaReady) loadSegments(source.id);
  }

  async function loadSegments(id, query = '') {
    const list = $('#segmentList'); if (!list) return;
    try {
      const result = await api(`/api/sources/${id}/segments${query ? `?q=${encodeURIComponent(query)}` : ''}`);
      list.innerHTML = result.segments.length ? result.segments.map(segment => `<button class="segment-item jump-time" data-time="${segment.start}"><span class="segment-time">${timeText(segment.start)}</span><span>${escapeHtml(segment.text)}</span></button>`).join('') : '<div class="summary-box">Совпадений не найдено.</div>';
      list.querySelectorAll('.jump-time').forEach(btn => btn.addEventListener('click', () => jumpTo(Number(btn.dataset.time))));
    } catch (error) { list.innerHTML = `<div class="summary-box">${escapeHtml(error.message)}</div>`; }
  }

  function jumpTo(time) {
    const media = $('#drawerContent video, #drawerContent audio');
    if (media) { media.currentTime = time; media.play().catch(() => {}); }
    else if (state.selected?.source_url) { const url = new URL(state.selected.source_url); url.searchParams.set('t', `${Math.floor(time)}s`); window.open(url.href, '_blank', 'noopener'); }
    else showToast(`Фрагмент начинается в ${timeText(time)}`);
  }

  async function askSource(event, sourceId) {
    event.preventDefault(); const question = $('#askQuestion').value.trim(); if (!question) return;
    const target = $('#askResult'); target.innerHTML = '<div class="loading-state"><span class="spinner"></span><span>Ищу в транскрипте…</span></div>';
    try { renderAnswer(target, await api('/api/ask', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({question, source_id:sourceId})})); }
    catch (error) { target.innerHTML = `<div class="summary-box">${escapeHtml(error.message)}</div>`; }
  }

  function renderAnswer(target, result) {
    target.innerHTML = `<div class="summary-box" style="margin-top:10px">${escapeHtml(result.answer)}</div>${(result.evidence || []).map(item => `<button class="segment-item jump-time" data-time="${item.start}"><span class="segment-time">${escapeHtml(item.time)}</span><span>${escapeHtml(item.text)}</span></button>`).join('')}`;
    target.querySelectorAll('.jump-time').forEach(btn => btn.addEventListener('click', () => jumpTo(Number(btn.dataset.time))));
  }

  async function deleteSource(id) {
    if (!confirm('Удалить материал, расшифровку и локальный медиафайл?')) return;
    try { await api(`/api/sources/${id}`, {method:'DELETE'}); closeDetail(); await loadLibrary(); showToast('Материал удалён с этого компьютера'); }
    catch (error) { showToast(error.message); }
  }

  function closeDetail() { $('#detailDrawer').classList.add('hidden'); $('#drawerBackdrop').classList.add('hidden'); state.selected = null; }
  function startPolling() {
    if (state.poller) return;
    state.poller = setInterval(async () => {
      await loadLibrary($('#librarySearch').value.trim());
      if (state.selected) {
        try {
          const source = await api(`/api/sources/${state.selected.id}`); state.selected = source;
          if (!$('#detailDrawer').classList.contains('hidden')) renderDetail(source);
          if (!state.items.some(item => isActive(item.status))) { clearInterval(state.poller); state.poller = null; await checkHealth(); }
        } catch (_) {}
      } else if (!state.items.some(item => isActive(item.status))) { clearInterval(state.poller); state.poller = null; await checkHealth(); }
    }, 2300);
  }
  function debounce(fn, delay) { let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); }; }

  async function showSystem() {
    const data = await checkHealth();
    const rows = data ? [
      ['Версия', data.version],['Распознавание речи', data.asr_installed ? `Установлено · ${data.model}` : 'Не установлено'],['Импорт ссылок', data.url_import_installed ? 'yt-dlp установлен' : 'yt-dlp не установлен'],['Устройство', `${data.device} · локальная обработка`],['AI-провайдер', data.llm_configured ? 'Настроен' : 'Не подключён'],['Очередь', `${data.queue_size} задач`],['Хранилище', data.data_dir]
    ] : [['Состояние','Сервер не отвечает']];
    $('#systemDetails').innerHTML = rows.map(([label,value]) => `<div class="system-row"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join('');
    $('#systemModal').classList.remove('hidden');
  }

  function wire() {
    $('#urlForm').addEventListener('submit', addUrl);
    $('#fileInput').addEventListener('change', event => uploadFile(event.target.files?.[0]));
    ['dragenter','dragover'].forEach(name => $('#uploadDrop').addEventListener(name, event => { event.preventDefault(); $('#uploadDrop').classList.add('dragover'); }));
    ['dragleave','drop'].forEach(name => $('#uploadDrop').addEventListener(name, event => { event.preventDefault(); $('#uploadDrop').classList.remove('dragover'); }));
    $('#uploadDrop').addEventListener('drop', event => uploadFile(event.dataTransfer.files?.[0]));
    ['newSourceBtn','headAddBtn','emptyAddBtn'].forEach(id => document.getElementById(id).addEventListener('click', () => { $('#importPanel').scrollIntoView({behavior:'smooth', block:'center'}); $('#sourceUrl').focus({preventScroll:true}); }));
    $('#refreshBtn').addEventListener('click', () => loadLibrary($('#librarySearch').value.trim()));
    $('#librarySearch').addEventListener('input', debounce(() => { setView('search'); loadLibrary($('#librarySearch').value.trim()); }, 250));
    $('#sortSelect').addEventListener('change', renderLibrary);
    document.querySelectorAll('.nav-item').forEach(btn => btn.addEventListener('click', () => setView(btn.dataset.view)));
    $('#closeDetail').addEventListener('click', closeDetail); $('#drawerBackdrop').addEventListener('click', closeDetail);
    $('#settingsBtn').addEventListener('click', showSystem); $('#closeSystem').addEventListener('click', () => $('#systemModal').classList.add('hidden'));
    $('#systemModal').addEventListener('click', event => { if (event.target.id === 'systemModal') $('#systemModal').classList.add('hidden'); });
    $('#themeToggle').addEventListener('click', () => { state.dark = !state.dark; document.body.classList.toggle('dark', state.dark); localStorage.setItem('evascribe-theme', state.dark ? 'dark' : 'light'); });
    if (localStorage.getItem('evascribe-theme') === 'dark') { state.dark = true; document.body.classList.add('dark'); }
    $('#openSidebar').addEventListener('click', () => $('#sidebar').classList.add('open'));
    $('#closeSidebar').addEventListener('click', () => $('#sidebar').classList.remove('open'));
    document.addEventListener('keydown', event => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); $('#librarySearch').focus(); } if (event.key === 'Escape') { closeDetail(); $('#systemModal').classList.add('hidden'); $('#sidebar').classList.remove('open'); } });
  }

  wire();
  checkHealth();
  loadLibrary();
  setInterval(() => { if (state.items.some(item => isActive(item.status))) startPolling(); }, 2500);
})();
