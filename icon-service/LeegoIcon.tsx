'use client';
import {createContext,useContext,useEffect,useRef,useState,type ReactNode} from 'react';
import {ICON_ORIGIN,resolveIcon,type IconSnapshot} from './client';
export const LeegoIconContext=createContext<{snapshot:IconSnapshot;origin?:string}|null>(null);
export function LeegoIcon({name,variant,size=24,label='',active=false,fallback}: {name:string;variant?:string;size?:number;label?:string;active?:boolean;fallback?:ReactNode}){
  const context=useContext(LeegoIconContext),host=useRef<HTMLSpanElement>(null);
  const [playing,setPlaying]=useState(false),[failed,setFailed]=useState(false);
  useEffect(()=>{
    if(variant!=='animated'||!active){setPlaying(false);return;}
    const motion=matchMedia('(prefers-reduced-motion: reduce)');let onScreen=false;
    const update=()=>setPlaying(onScreen&&!document.hidden&&!motion.matches);
    const observer=new IntersectionObserver(([e])=>{onScreen=e.isIntersecting;update();});
    if(host.current)observer.observe(host.current);
    motion.addEventListener('change',update);document.addEventListener('visibilitychange',update);
    return()=>{observer.disconnect();motion.removeEventListener('change',update);document.removeEventListener('visibilitychange',update);};
  },[variant,active]);
  const effective=variant==='animated'&&!playing?'static':variant;
  let asset:ReturnType<typeof resolveIcon>|null=null;
  try{if(context)asset=resolveIcon(context.snapshot,name,effective,context.origin||ICON_ORIGIN);}catch{/* Unknown/restricted/unsupported: use the caller's local fallback. */}
  const url=asset?.url;
  useEffect(()=>setFailed(false),[url]);
  return <span ref={host} role={label?'img':undefined} aria-label={label||undefined} aria-hidden={label?undefined:true} style={{display:'inline-flex',flexShrink:0,width:size,height:size,alignItems:'center',justifyContent:'center'}}>
    {asset&&!failed?(asset.maskable?<><span style={{width:size,height:size,background:'currentColor',mask:`url("${asset.url}") center / contain no-repeat`,WebkitMask:`url("${asset.url}") center / contain no-repeat`}}/><img src={asset.url} alt="" aria-hidden style={{display:'none'}} onError={()=>setFailed(true)}/></>:<img src={asset.url} alt="" width={size} height={size} style={{objectFit:'contain'}} onError={()=>setFailed(true)}/>):(fallback||<span style={{width:size/2,height:size/2,border:'1px solid currentColor',borderRadius:3}}/>)}
  </span>;
}
