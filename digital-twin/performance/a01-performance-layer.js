(()=>{
 'use strict';
 const TARGET_FPS=60;
 const STYLE=[
  '#a01PerfToggle{position:absolute;right:14px;bottom:74px;z-index:58;border:1px solid rgba(255,255,255,.18);border-radius:999px;padding:7px 10px;background:rgba(9,18,26,.76);backdrop-filter:blur(12px);color:#e9f4f3;font:600 10px/1.2 system-ui,sans-serif;letter-spacing:.04em;cursor:pointer;box-shadow:0 5px 22px rgba(0,0,0,.18)}',
  '#a01PerfToggle:focus-visible,#a01PerfPanel button:focus-visible{outline:2px solid #9edfc9;outline-offset:3px}',
  '#a01PerfPanel{position:absolute;right:14px;bottom:116px;z-index:59;width:min(286px,calc(100% - 28px));padding:13px 14px;border:1px solid rgba(255,255,255,.16);border-radius:15px;background:rgba(8,17,25,.91);backdrop-filter:blur(18px);color:#edf5f5;box-shadow:0 14px 44px rgba(0,0,0,.28);font:11px/1.45 system-ui,sans-serif}',
  '#a01PerfPanel[hidden]{display:none!important}',
  '#a01PerfPanel .a01p-head{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:9px}',
  '#a01PerfPanel .a01p-title{font-size:10px;font-weight:750;letter-spacing:.13em;color:#b7d9d2}',
  '#a01PerfPanel .a01p-close{border:0;background:transparent;color:#dce9e8;font-size:18px;line-height:1;cursor:pointer;padding:2px 5px}',
  '#a01PerfPanel .a01p-kpi{display:flex;align-items:baseline;gap:7px;padding:6px 0 9px;border-bottom:1px solid rgba(255,255,255,.1)}',
  '#a01PerfPanel .a01p-fps{font-size:31px;font-weight:750;letter-spacing:-.05em;color:#a8e4cb;font-variant-numeric:tabular-nums}',
  '#a01PerfPanel .a01p-unit{font-size:10px;color:#9aadb5}',
  '#a01PerfPanel .a01p-grid{display:grid;grid-template-columns:1fr auto;gap:5px 12px;padding:9px 0;color:#9aadb5}',
  '#a01PerfPanel .a01p-grid b{color:#f2f6f5;font-weight:650;text-align:right;font-variant-numeric:tabular-nums}',
  '#a01PerfPanel .a01p-actions{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:2px}',
  '#a01PerfPanel .a01p-actions button{border:1px solid rgba(255,255,255,.17);border-radius:9px;padding:7px 9px;background:rgba(255,255,255,.07);color:#eef5f4;font:600 10px system-ui,sans-serif;cursor:pointer}',
  '#a01PerfPanel .a01p-note{margin-top:8px;color:#8ea0a9;font-size:9px;line-height:1.4}',
  '@media(max-width:780px){#a01PerfToggle{right:9px;bottom:78px;padding:6px 8px}#a01PerfPanel{right:9px;bottom:118px}}'
 ].join('');
 const style=document.createElement('style');style.textContent=STYLE;document.head.appendChild(style);
 let mounted=false,panel=null,toggle=null;
 let snapshot={fps:0,frameMs:0,p95:0,renderMs:0,calls:0,triangles:0,geometries:0,textures:0,pixelRatio:0,adaptive:true,status:'Ожидание рендера'};
 function percentile(values,p){if(!values.length)return 0;const sorted=values.slice().sort((a,b)=>a-b);return sorted[Math.min(sorted.length-1,Math.ceil(p*sorted.length)-1)]||0;}
 function mount(){
  if(mounted)return;
  const sphere=window.EVA_SPHERE;
  if(!sphere||!sphere.renderer||!sphere.scene)return;
  const renderer=sphere.renderer;
  if(renderer.__a01PerformanceWrapped){mounted=true;return;}
  mounted=true;
  const initialRatio=renderer.getPixelRatio();
  const mobile=matchMedia('(max-width:780px)').matches||(navigator.maxTouchPoints||0)>1;
  const minRatio=Math.min(initialRatio,mobile?0.72:0.82);
  const maxRatio=initialRatio;
  let currentRatio=initialRatio,adaptive=true,lowWindows=0,goodWindows=0;
  let windowStart=performance.now(),windowFrames=0,lastRenderAt=0,lastUiAt=0;
  const intervals=[],renderCosts=[];
  const originalRender=renderer.render.bind(renderer);
  panel=document.createElement('section');panel.id='a01PerfPanel';panel.hidden=true;panel.setAttribute('aria-label','Производительность 3D-сцены');
  panel.innerHTML='<div class="a01p-head"><span class="a01p-title">A-01 · ПРОИЗВОДИТЕЛЬНОСТЬ</span><button class="a01p-close" type="button" aria-label="Закрыть диагностику">×</button></div><div class="a01p-kpi"><span class="a01p-fps" data-a01p="fps">—</span><span class="a01p-unit">FPS · цель 60</span></div><div class="a01p-grid"><span>Кадр · средний интервал</span><b data-a01p="frame">—</b><span>Кадр · p95</span><b data-a01p="p95">—</b><span>CPU · renderer.render()</span><b data-a01p="cpu">—</b><span>Draw calls</span><b data-a01p="calls">—</b><span>Треугольники</span><b data-a01p="triangles">—</b><span>Геометрии / текстуры</span><b data-a01p="memory">—</b><span>Pixel ratio</span><b data-a01p="ratio">—</b></div><div class="a01p-actions"><button type="button" data-a01p-action="adaptive">Автокачество: ВКЛ</button><button type="button" data-a01p-action="reset">Сброс качества</button></div><div class="a01p-note">F3 — показать или скрыть панель. CPU-время измеряет вызов рендера, а не отдельное GPU-время. Frame Generation не учитывается как реальный кадр.</div>';
  toggle=document.createElement('button');toggle.id='a01PerfToggle';toggle.type='button';toggle.textContent='A-01 · FPS';toggle.setAttribute('aria-controls','a01PerfPanel');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Открыть монитор производительности');
  const stage=document.getElementById('stage');(stage||document.body).append(toggle,panel);
  const close=panel.querySelector('.a01p-close');
  const adaptiveButton=panel.querySelector('[data-a01p-action="adaptive"]');
  const resetButton=panel.querySelector('[data-a01p-action="reset"]');
  function setVisible(value){panel.hidden=!value;toggle.setAttribute('aria-expanded',String(value));if(value)updateUI(true);}
  function setRatio(next){const clamped=Math.max(minRatio,Math.min(maxRatio,next));if(Math.abs(clamped-currentRatio)<0.015)return;currentRatio=clamped;renderer.setPixelRatio(currentRatio);snapshot.pixelRatio=currentRatio;}
  function setAdaptive(value){adaptive=Boolean(value);snapshot.adaptive=adaptive;lowWindows=0;goodWindows=0;adaptiveButton.textContent='Автокачество: '+(adaptive?'ВКЛ':'ВЫКЛ');}
  function resetQuality(){setRatio(maxRatio);setAdaptive(true);}
  function updateUI(force){
   const now=performance.now();if(!force&&now-lastUiAt<350)return;lastUiAt=now;
   const stale=!lastRenderAt||now-lastRenderAt>1300;
   const fps=stale?null:snapshot.fps;
   toggle.textContent=stale?'A-01 · ПАУЗА':'A-01 · '+Math.round(fps||0)+' FPS';
   panel.querySelector('[data-a01p="fps"]').textContent=stale?'—':String(Math.round(fps||0));
   panel.querySelector('[data-a01p="frame"]').textContent=stale?'—':snapshot.frameMs.toFixed(2)+' мс';
   panel.querySelector('[data-a01p="p95"]').textContent=stale?'—':snapshot.p95.toFixed(2)+' мс';
   panel.querySelector('[data-a01p="cpu"]').textContent=snapshot.renderMs.toFixed(2)+' мс';
   panel.querySelector('[data-a01p="calls"]').textContent=String(snapshot.calls);
   panel.querySelector('[data-a01p="triangles"]').textContent=snapshot.triangles.toLocaleString('ru-RU');
   panel.querySelector('[data-a01p="memory"]').textContent=snapshot.geometries+' / '+snapshot.textures;
   panel.querySelector('[data-a01p="ratio"]').textContent=snapshot.pixelRatio.toFixed(2);
   adaptiveButton.textContent='Автокачество: '+(adaptive?'ВКЛ':'ВЫКЛ');
  }
  function evaluateAdaptive(now){
   const elapsed=now-windowStart;if(elapsed<2200||windowFrames<35)return;
   const fps=windowFrames*1000/elapsed;
   if(fps<54){lowWindows++;goodWindows=0;}else if(fps>58.5){goodWindows++;lowWindows=0;}else{lowWindows=0;goodWindows=0;}
   if(adaptive&&lowWindows>=2){setRatio(currentRatio-0.08);lowWindows=0;snapshot.status='Разрешение снижено для удержания плавности';}
   else if(adaptive&&goodWindows>=4&&currentRatio<maxRatio-0.015){setRatio(currentRatio+0.04);goodWindows=0;snapshot.status='Качество постепенно восстановлено';}
   windowStart=now;windowFrames=0;
  }
  renderer.render=function(...args){
   const started=performance.now();const result=originalRender(...args);const ended=performance.now();const cost=ended-started;
   if(lastRenderAt){const interval=ended-lastRenderAt;if(interval>0&&interval<1000){intervals.push(interval);if(intervals.length>180)intervals.shift();}}
   renderCosts.push(cost);if(renderCosts.length>90)renderCosts.shift();
   lastRenderAt=ended;windowFrames++;
   const avg=intervals.length?intervals.reduce((sum,x)=>sum+x,0)/intervals.length:0;
   const info=renderer.info||{},renderInfo=info.render||{},memory=info.memory||{};
   snapshot={...snapshot,fps:avg?1000/avg:0,frameMs:avg,p95:percentile(intervals,0.95),renderMs:renderCosts.reduce((sum,x)=>sum+x,0)/Math.max(1,renderCosts.length),calls:renderInfo.calls||0,triangles:renderInfo.triangles||0,geometries:memory.geometries||0,textures:memory.textures||0,pixelRatio:currentRatio,status:'Рендер активен'};
   evaluateAdaptive(ended);updateUI(false);return result;
  };
  renderer.__a01PerformanceWrapped=true;
  toggle.addEventListener('click',()=>setVisible(panel.hidden));close.addEventListener('click',()=>setVisible(false));
  adaptiveButton.addEventListener('click',()=>setAdaptive(!adaptive));resetButton.addEventListener('click',resetQuality);
  document.addEventListener('keydown',event=>{
   if(event.key!=='F3'||event.altKey||event.ctrlKey||event.metaKey)return;
   const target=event.target;if(target&&(/INPUT|TEXTAREA|SELECT/.test(target.tagName)||target.isContentEditable))return;
   event.preventDefault();setVisible(panel.hidden);
  });
  const api={targetFps:TARGET_FPS,show:()=>setVisible(true),hide:()=>setVisible(false),toggle:()=>setVisible(panel.hidden),getSnapshot:()=>({...snapshot}),setAdaptiveQuality:setAdaptive,resetQuality};
  sphere.performance=api;window.A01Performance=api;
  setInterval(()=>{if(!panel.hidden)updateUI(true);else if(lastRenderAt&&performance.now()-lastRenderAt>1300)toggle.textContent='A-01 · ПАУЗА';},500);
  console.info('A-01 performance layer ready: 60 FPS target, diagnostics and adaptive pixel ratio.');
 }
 document.addEventListener('eva-a01:scene-ready',mount,{once:true});
 if(window.EVA_SPHERE&&window.EVA_SPHERE.renderer)mount();
})();