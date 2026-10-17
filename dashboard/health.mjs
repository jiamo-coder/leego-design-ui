// User-approved white-balanced palette, distilled from Product Center 2026-10-17.
export const stops = [[0,'#ce2446'],[20,'#dc2848'],[40,'#f1b51b'],[60,'#d9b91c'],[80,'#76b72e'],[95,'#0eae80'],[100,'#0eae80']];
const rgb=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
export const mix=(a,b,t)=>'#'+rgb(a).map((v,i)=>Math.round(v+(rgb(b)[i]-v)*t).toString(16).padStart(2,'0')).join('');
export const luminance=h=>rgb(h).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
export const contrast=(a,b)=>(Math.max(luminance(a),luminance(b))+.05)/(Math.min(luminance(a),luminance(b))+.05);
function accessible(color,bg){let result=color;for(let i=0;i<=100&&contrast(result,bg)<4.6;i++)result=mix(color,'#172b32',i/100);return result;}
function surface(color){let result=color;for(let i=1;i<=100&&contrast('#ffffff',result)<4.6;i++)result=mix(color,'#000000',i/100);return result;}
export function healthTone(value){
 const percent=typeof value==='number'&&Number.isFinite(value)&&value>=0&&value<=100?value:null;
 const end=percent===null?0:stops.findIndex(([n])=>n>=percent),a=stops[Math.max(0,end-1)],b=stops[end];
 const color=percent===null?'#737d8c':mix(a[1],b[1],a[0]===b[0]?0:(percent-a[0])/(b[0]-a[0]));
 const soft=mix(color,'#f8f9fb',.95);
 return {percent,color,soft,text:accessible(color,soft),solid:surface(color),onSolid:'#ffffff',label:percent===null?'未检查':percent<40?'优先补齐':percent<60?'待完善':percent<95?'逐步完善':percent<100?'接近完整':'已填完整'};
}
// Risk is a supplied business level, NEVER inferred from a completeness score or count.
export const riskLevels=[{id:'low',label:'低风险',color:'#087a60'},{id:'attention',label:'关注',color:'#936600'},{id:'high',label:'高风险',color:'#b44817'},{id:'critical',label:'严重',color:'#b62145'}];
export function issueTone(value,kind='missing'){
 if(typeof value!=='number'||!Number.isFinite(value)||value<0)return {color:'#596273',label:'待核实',value:null};
 return {color:value===0?'#087a60':kind==='pending'?'#936600':'#b62145',label:value===0?'已知零项':kind==='pending'?'待核实':'需处理',value};
}
