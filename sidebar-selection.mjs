/** One persistent selection surface. No routing, data, storage or network access. */
export function mountSidebarSelection(root) {
  const surface = root.querySelector('[data-leego-selection]');
  if (!surface) throw new Error('Sidebar requires one data-leego-selection surface');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0, animation, previous, disposed = false;
  const update = () => {
    const row = root.querySelector('[data-leego-row][aria-current="page"]');
    const label = row?.querySelector('[data-leego-label]');
    if (!row || !label || !root.clientWidth) {
      animation?.cancel(); surface.hidden = true; previous = undefined; return;
    }
    const origin = root.getBoundingClientRect(), r = row.getBoundingClientRect();
    const l = label.getBoundingClientRect();
    const collapsed = root.closest('[data-leego-collapsed="true"]') !== null;
    const width = collapsed ? 36 : Math.min(r.width, l.right - r.left + 12);
    const next = { x:r.left-origin.left+root.scrollLeft+(collapsed?(r.width-width)/2:0), y:r.top-origin.top+root.scrollTop+(r.height-32)/2, width };
    const key = `${next.x}/${next.y}/${next.width}`;
    if (previous?.key === key && !reduced.matches) return;
    const current = getComputedStyle(surface);
    const from = { transform:current.transform, width:current.width };
    animation?.cancel();
    surface.hidden = false;
    surface.style.transform = `translate(${next.x}px, ${next.y}px)`;
    surface.style.width = `${width}px`;
    if (previous && !reduced.matches) {
      const dy = Math.sign(next.y-previous.y)*2;
      animation = surface.animate([from,
        { transform:`translate(${next.x}px, ${next.y+dy}px)`, width:`${width}px`, offset:.81 },
        { transform:surface.style.transform, width:`${width}px` },
      ], { duration:260, easing:'cubic-bezier(.2,.7,.2,1)' });
    }
    previous = { ...next, key };
  };
  const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
  const resize = new ResizeObserver(schedule);
  const observeRows = () => {
    resize.disconnect(); resize.observe(root);
    root.querySelectorAll('[data-leego-row],[data-leego-label]').forEach(node => resize.observe(node));
  };
  observeRows();
  const mutations = new MutationObserver(records => {
    if (records.some(record => record.type === 'childList')) observeRows();
    schedule();
  });
  mutations.observe(root, { subtree:true, childList:true, characterData:true, attributes:true, attributeFilter:['aria-current'] });
  const shell = root.closest('[data-leego-sidebar]');
  const mode = new MutationObserver(schedule);
  if (shell) mode.observe(shell, { attributes:true, attributeFilter:['data-leego-collapsed'] });
  reduced.addEventListener('change', schedule);
  window.addEventListener('resize', schedule);
  void document.fonts.ready.then(() => { if (!disposed) schedule(); });
  update();
  return () => {
    disposed = true; cancelAnimationFrame(frame); animation?.cancel(); resize.disconnect(); mutations.disconnect(); mode.disconnect();
    reduced.removeEventListener('change', schedule); window.removeEventListener('resize', schedule);
    surface.hidden = true; surface.style.removeProperty('transform'); surface.style.removeProperty('width');
  };
}
