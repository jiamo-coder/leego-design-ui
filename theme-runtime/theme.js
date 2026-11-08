/* V39: one resolved theme before paint, across all surfaces. */
(function () {
  if (window.LeegoTheme) return;
  const key = 'leego.ui.appearance', scheduleKey = key + '.schedule';
  const valid = value => ['system', 'light', 'dark', 'time'].includes(value);
  const timeValid = value => typeof value === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
  const defaults = {lightAt:'07:00',darkAt:'19:00',timeZone:'Asia/Shanghai'};
  const media = matchMedia('(prefers-color-scheme: dark)');
  let mode = 'system', schedule = {...defaults}, persisted = true, timer;
  function validSchedule(value) {
    if (!value || !timeValid(value.lightAt) || !timeValid(value.darkAt) || value.lightAt === value.darkAt) return false;
    try { new Intl.DateTimeFormat('en-GB',{timeZone:value.timeZone}).format(); return typeof value.timeZone === 'string'; } catch { return false; }
  }
  try {
    const saved = localStorage.getItem(key); if (valid(saved)) mode = saved;
    const times = JSON.parse(localStorage.getItem(scheduleKey) || 'null'); if (validSchedule(times)) schedule = times;
  } catch { persisted = false; }
  function resolveTime(now = new Date(), times = schedule) {
    const parts = new Intl.DateTimeFormat('en-GB',{timeZone:times.timeZone,hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(now);
    const current = parts.find(p=>p.type==='hour').value + ':' + parts.find(p=>p.type==='minute').value;
    const dark = times.lightAt < times.darkAt ? current < times.lightAt || current >= times.darkAt : current >= times.darkAt && current < times.lightAt;
    return dark ? 'dark' : 'light';
  }
  function getState() { return {mode,resolved:document.documentElement.dataset.theme,schedule:{...schedule},persisted}; }
  function apply() {
    const resolved = mode === 'system' ? (media.matches ? 'dark' : 'light') : mode === 'time' ? resolveTime() : mode;
    document.documentElement.dataset.theme = resolved;
    document.documentElement.dataset.themePreference = mode;
    document.documentElement.style.colorScheme = resolved;
    document.querySelectorAll('[data-theme-select]').forEach(control => { control.value = mode; });
    window.dispatchEvent(new CustomEvent('leego-theme-change', {detail:getState()}));
    clearTimeout(timer);
    if (mode === 'time' && !document.hidden) timer = setTimeout(apply, 60000 - Date.now() % 60000);
  }
  function save(name,value) { try {localStorage.setItem(name,value);persisted=true;} catch {persisted=false;} }
  function setMode(value) { if (!valid(value)) return false; mode=value;save(key,mode);apply();return true; }
  function setSchedule(value) { if (!validSchedule(value)) return false; schedule={...value};save(scheduleKey,JSON.stringify(schedule));apply();return true; }
  media.addEventListener('change',()=>{if(mode==='system')apply();});
  window.addEventListener('storage',event=>{
    if (event.key === key || event.key === null) mode=valid(event.newValue)?event.newValue:'system';
    if (event.key === scheduleKey || event.key === null) {try {const next=JSON.parse(event.newValue||'null');schedule=validSchedule(next)?next:{...defaults};} catch {schedule={...defaults};}}
    if ([key,scheduleKey,null].includes(event.key)) apply();
  });
  window.addEventListener('pageshow',apply);
  window.addEventListener('pagehide',()=>clearTimeout(timer));
  document.addEventListener('visibilitychange',apply);
  document.addEventListener('DOMContentLoaded',apply,{once:true});
  document.addEventListener('change',event=>{if(event.target.matches('[data-theme-select]'))setMode(event.target.value);});
  window.LeegoTheme={setMode,setSchedule,getState,resolveTime};
  apply();
})();
