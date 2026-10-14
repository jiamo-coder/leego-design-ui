export const duration = 6400;
const clamp = t => Math.max(0, Math.min(1, t));
const ease = t => (t = clamp(t), t * t * (3 - 2 * t));
const ramp = (t, a, b) => ease((t - a) / (b - a));
const mix = (a, b, t) => a + (b - a) * t;
const fmt = n => n.toFixed(3);
const cells = [[23,19],[41,19],[23,32],[41,32],[23,45],[41,45]];
export const moves = [3,2,0,1,2,0,4,3];
export function puzzle(t) {
  const positions = [0,1,2,3,4];
  let blank = 5;
  for (let k = 0; k < moves.length; k++) {
    const id = moves[k], from = positions[id], to = blank;
    const u = ramp(t, 2450 + k * 220, 2670 + k * 220);
    if (u < 1) return positions.map((p,i) => i === id ? cells[p].map((v,j) => mix(v,cells[to][j],u)) : [...cells[p]]);
    positions[id] = to;
    blank = from;
  }
  return positions.map(p => [...cells[p]]);
}
// All pieces share the same eight-segment contour, so circles and tiles morph continuously.
export function rounded(x,y,w,h,r) {
  r = Math.min(r,w/2,h/2);
  const l=x-w/2, q=x+w/2, a=y-h/2, b=y+h/2, c=.55228475;
  return `M${fmt(l+r)} ${fmt(a)} L${fmt(q-r)} ${fmt(a)} C${fmt(q-r+r*c)} ${fmt(a)} ${fmt(q)} ${fmt(a+r-r*c)} ${fmt(q)} ${fmt(a+r)} L${fmt(q)} ${fmt(b-r)} C${fmt(q)} ${fmt(b-r+r*c)} ${fmt(q-r+r*c)} ${fmt(b)} ${fmt(q-r)} ${fmt(b)} L${fmt(l+r)} ${fmt(b)} C${fmt(l+r-r*c)} ${fmt(b)} ${fmt(l)} ${fmt(b-r+r*c)} ${fmt(l)} ${fmt(b-r)} L${fmt(l)} ${fmt(a+r)} C${fmt(l)} ${fmt(a+r-r*c)} ${fmt(l+r-r*c)} ${fmt(a)} ${fmt(l+r)} ${fmt(a)} Z`;
}
export function frame(ms) {
  const t = ((ms % duration) + duration) % duration;
  const theta = t / 1600 * Math.PI * 2 - .8;
  const rotation = -.45;
  const ox = 25 * Math.cos(theta), oy = 12 * Math.sin(theta);
  const satellite = [32+ox*Math.cos(rotation)-oy*Math.sin(rotation),32+ox*Math.sin(rotation)+oy*Math.cos(rotation)];
  const split = ramp(t,1400,2100) * (1-ramp(t,4850,5500));
  const tile = ramp(t,2150,2450) * (1-ramp(t,4400,4750));
  const target = puzzle(t);
  const pieces = target.map(([x,y],i) => {
    const source = i === 4 ? satellite : [32,32];
    const size = i === 0 ? 34 : i === 4 ? 8 : 0;
    return {x:mix(source[0],x,split), y:mix(source[1],y,split), w:mix(size,mix(8,14,tile),split), h:mix(size,mix(8,10,tile),split), r:mix(size/2,mix(4,3,tile),split)};
  });
  const paths = pieces.map(p=>rounded(p.x,p.y,p.w,p.h,p.r));
  const globe = 1-ramp(t,1300,1570)+ramp(t,5350,5630);
  const curve = Math.sin(theta)*12;
  const meridian = `M32 17 C${fmt(32+curve)} 23 ${fmt(32+curve)} 41 32 47`;
  return {paths,pieces,meridian,globe,phase:t<1400||t>=5500?'星球 · 卫星绕转':t<2150?'分裂 · 五颗圆点':t<2450?'展开 · 柔圆拼块':t<4400?'华容道 · 依次滑移':t<4850?'收拢 · 回到圆点':'聚合 · 回到星球'};
}
export function svgMarkup() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="星球与卫星变为五块滑动拼图，再聚合成星球"><ellipse data-orbit cx="32" cy="32" rx="25" ry="12" transform="rotate(-25.783 32 32)" fill="none" stroke="currentColor" stroke-width="1.25"/>${Array.from({length:5},()=>'<path data-piece fill="currentColor"/>').join('')}<path data-meridian fill="none" stroke="white" stroke-width="1.6" stroke-linecap="round"/></svg>`;
}
export function paint(svg,ms) {
  const f=frame(ms);
  svg.querySelectorAll('[data-piece]').forEach((p,i)=>p.setAttribute('d',f.paths[i]));
  const satellite=svg.querySelectorAll('[data-piece]')[4];
  satellite.setAttribute('stroke','white');satellite.setAttribute('stroke-width',f.globe*1.5);
  svg.querySelector('[data-orbit]').setAttribute('opacity',f.globe*.5);
  const line=svg.querySelector('[data-meridian]');
  line.setAttribute('d',f.meridian); line.setAttribute('opacity',f.globe);
  return f;
}
