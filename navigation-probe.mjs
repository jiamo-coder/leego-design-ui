/** Read-only one-frame probe. No business text, input values, network or actions. */
export function inspectNavigation(root) {
  if (!root) throw new Error('Provide the rendered data-leego-shell root');
  const visible = node => node.getClientRects().length > 0 && getComputedStyle(node).visibility !== 'hidden';
  const all = selector => [...root.querySelectorAll(selector)].filter(visible);
  const issues = [], check = (ok, message) => { if (!ok) issues.push(message); };
  const bars = all('[data-leego-topbar]');
  check(bars.length === 1, 'Expected exactly one visible topbar');
  if (bars[0]) check(Math.abs(bars[0].getBoundingClientRect().height-64)<=1, 'Topbar differs from 64px default; document zoom/reflow exception');
  const tabs = all('[data-leego-route-tab]');
  if (tabs.length) check(tabs.filter(n=>n.getAttribute('aria-current')==='page').length===1,'Route tabs require exactly one current page');
  for (const tab of tabs) {
    check(tab.tagName === 'A' && tab.hasAttribute('href') && !tab.hasAttribute('role'), 'Route tabs must be native links, not ARIA panel tabs');
    const s = getComputedStyle(tab);
    check(s.fontWeight==='400' && s.fontSize==='14px' && s.lineHeight==='22px', 'Route tab typography must be 400 / 14 / 22');
  }
  for (const node of all('[data-leego-context-tabs]')) check(node.getBoundingClientRect().height>=47,'Context tabs below minimum height');
  for (const node of all('[data-leego-search]')) {
    check(['navigation','global-data','local-data'].includes(node.dataset.leegoSearch),'Search scope missing or invalid');
    check(Boolean(node.getAttribute('aria-label')),'Search requires accessible scope name');
  }
  for (const node of all('[data-leego-submenu-toggle]')) check(node.hasAttribute('aria-expanded') && Boolean(node.getAttribute('aria-controls')),'Submenu disclosure requires expanded and controls');
  check(all('button button,button a,a button').length===0,'Nested interactive controls');
  const appearance = root.getAttribute('data-leego-appearance') || document.documentElement.getAttribute('data-leego-appearance') || 'system';
  const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
  const nearBlack = (color) => {
    const match = String(color).match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) return false;
    const r = Number(match[1]), g = Number(match[2]), b = Number(match[3]);
    return r <= 32 && g <= 36 && b <= 48 && r + g + b < 90;
  };
  for (const node of [bars[0], ...all('[data-leego-sidebar]')].filter(Boolean)) {
    const mode = node.getAttribute('data-leego-appearance') || appearance;
    const allowed = mode === 'midnight' || mode === 'oled' || (mode === 'system' && prefersDark);
    if (!allowed && nearBlack(getComputedStyle(node).backgroundColor)) issues.push('P0 drift: black navigation chrome in light appearance');
  }
  return {passed:issues.length===0, issues, routeTabs:tabs.length, boundary:'One-frame DOM geometry/semantics only; font glyphs, motion, route continuity, permissions and responsive states require separate evidence.'};
}
