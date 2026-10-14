export const duration = 6400;
const lerp = (a,b,t) => a+(b-a)*t;
const clamp = x => Math.max(0,Math.min(1,x));
const ease = x => { const t=clamp(x);return t*t*(3-2*t); };
const ramp=(t,a,b)=>ease((t-a)/(b-a));
const n=x=>Number(x.toFixed(3));

// Eight matching cubic segments let the face become the star, not crossfade over it.
function contour(star,cx,cy,r,rotation=0) {
  const points=[];
  const k=4/3*Math.tan(Math.PI/16);
  for(let i=0;i<8;i++) {
    const a=-Math.PI/2+i*Math.PI/4,b=a+Math.PI/4;
    points.push([Math.cos(a)-k*Math.sin(a),Math.sin(a)+k*Math.cos(a)],
      [Math.cos(b)+k*Math.sin(b),Math.sin(b)-k*Math.cos(b)],[Math.cos(b),Math.sin(b)]);
  }
  const q=[[.1,-.98],[.14,-.52],[.30,-.30],[.52,-.14],[.98,-.1],[1,0]];
  const target=[];
  for(let j=0;j<4;j++) for(const [x,y] of q) {
    const a=j*Math.PI/2;target.push([x*Math.cos(a)-y*Math.sin(a),x*Math.sin(a)+y*Math.cos(a)]);
  }
  const transform=([x,y])=>[n(cx+r*(x*Math.cos(rotation)-y*Math.sin(rotation))),n(cy+r*(x*Math.sin(rotation)+y*Math.cos(rotation)))];
  const p=transform([0,-1]);
  return `M${p.join(' ')} `+points.map((v,i)=>`${i%3===0?'C':''}${transform(v.map((a,j)=>lerp(a,target[i][j],star))).join(' ')}`).join(' ')+' Z';
}
function eye(cx,cy,rx,ry) {
  const k=.55228475;
  return `M${n(cx)} ${n(cy-ry)} C${n(cx+rx*k)} ${n(cy-ry)} ${n(cx+rx)} ${n(cy-ry*k)} ${n(cx+rx)} ${n(cy)} C${n(cx+rx)} ${n(cy+ry*k)} ${n(cx+rx*k)} ${n(cy+ry)} ${n(cx)} ${n(cy+ry)} C${n(cx-rx*k)} ${n(cy+ry)} ${n(cx-rx)} ${n(cy+ry*k)} ${n(cx-rx)} ${n(cy)} C${n(cx-rx)} ${n(cy-ry*k)} ${n(cx-rx*k)} ${n(cy-ry)} ${n(cx)} ${n(cy-ry)} Z`;
}
const gazeKeys=[[0,0,0],[.4,0,0],[.85,4,-2],[1.35,5,1],[1.85,-4,-3],[2.25,-3,3],[2.55,0,0],[6.4,0,0]];
export function frame(milliseconds) {
  const t=((milliseconds%duration)+duration)%duration/1000;
  const morph=ramp(t,2.78,3.16)*(1-ramp(t,4.92,5.30));
  let gaze=[0,0];
  for(let i=1;i<gazeKeys.length;i++) if(t<=gazeKeys[i][0]) {
    const a=gazeKeys[i-1],b=gazeKeys[i],f=ease((t-a[0])/(b[0]-a[0]));
    gaze=[lerp(a[1],b[1],f),lerp(a[2],b[2],f)];break;
  }
  const blink=1-.93*ramp(t,1.02,1.09)*(1-ramp(t,1.12,1.23));
  const closed=ramp(t,2.50,2.74)*(1-ramp(t,5.32,5.56));
  const ry=lerp(4.7,.38,closed)*blink;
  const eyeOpacity=1-ramp(t,2.74,2.86)*(1-ramp(t,5.28,5.38));
  const sparkleWindow=ramp(t,3.18,3.36)*(1-ramp(t,4.68,4.92));
  const pulse=Math.sin((t-3.34)*Math.PI*2/1.24);
  const size=1+.07*pulse*sparkleWindow;
  const smallSize=morph*(1-.11*pulse*sparkleWindow);
  const x=gaze[0],y=gaze[1];
  return {
    head:contour(morph,lerp(32,27,morph),lerp(32,37,morph),lerp(23,19.5,morph)*size),
    star:contour(1,lerp(45,48,morph),lerp(21,17,morph),Math.max(.001,9*smallSize)),
    eyes:eye(25.5+x,31+y,lerp(2.6,2.1,clamp(x/5)),ry)+eye(38.5+x,31+y,lerp(2.6,2.1,clamp(-x/5)),ry),
    eyeOpacity:n(eyeOpacity),starOpacity:n(morph*(.82+.18*pulse*sparkleWindow)),
    headOpacity:n(1-.12*(1-pulse)*sparkleWindow),
    phase:t<2.5?'眼睛沿球面游走':t<2.78?'眨眼 · 闭合':t<3.16?'圆球变成双星':t<4.92?'一大一小 · 交替闪亮':t<5.56?'双星回到机器人':'回到起点'
  };
}
export function svgMarkup(label='机器人与双星循环图标') {
  const f=frame(0);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="${label}"><path data-head fill="currentColor" d="${f.head}"/><path data-star fill="currentColor" d="${f.star}"/><path data-eyes fill="#fff" d="${f.eyes}"/></svg>`;
}
export function paint(svg,milliseconds) {
  const f=frame(milliseconds);
  for(const [name,key,opacity] of [['head','head','headOpacity'],['star','star','starOpacity'],['eyes','eyes','eyeOpacity']]) {
    const el=svg.querySelector(`[data-${name}]`);el.setAttribute('d',f[key]);el.setAttribute('opacity',f[opacity]);
  }
  return f;
}
