import {paint, svgMarkup} from './icon.mjs';

// Expressive identity only; task progress remains controlled by the application.
export function mountPlanetPuzzle(host, {active = false, label = '探索'} = {}) {
  host.innerHTML = svgMarkup();
  const svg = host.querySelector('svg');
  svg.setAttribute('aria-label', label);
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false, disposed = false, raf = 0, elapsed = 0, previous = null;
  const canPlay = () => !disposed && active && visible && !document.hidden && !media.matches;
  function tick(now) {
    raf = 0;
    if (!canPlay()) return;
    if (previous !== null) elapsed += Math.min(now - previous, 80);
    previous = now;
    paint(svg, elapsed);
    raf = requestAnimationFrame(tick);
  }
  function sync() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0; previous = null;
    if (media.matches || !active) {elapsed = 0; paint(svg, 0);}
    if (canPlay()) raf = requestAnimationFrame(tick);
  }
  paint(svg, 0);
  const observer = new IntersectionObserver(entries => {visible = entries.some(e => e.isIntersecting); sync();});
  observer.observe(host);
  document.addEventListener('visibilitychange', sync);
  media.addEventListener('change', sync);
  return {
    setActive(value) {if (!disposed) {active = Boolean(value); sync();}},
    destroy() {
      if (disposed) return;
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      media.removeEventListener('change', sync);
      svg.remove();
    },
  };
}
