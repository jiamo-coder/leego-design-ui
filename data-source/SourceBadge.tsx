'use client';
import {useId, useState} from 'react';
import catalog from './catalog.json';
import './source-badge.css';

/** Display-only provenance. Never derives editing permission from SPC/REF. */
export function SourceBadge({source, size=10, interactive=false}:{source:'SPC'|'REF';size?:10|12|16;interactive?:boolean}){
  const member=catalog.members.find(m=>m.code===source)!;
  const id=useId();
  const [open,setOpen]=useState(false);
  const glyph=<svg width={size} height={size} viewBox="0 0 10 10" aria-hidden="true" focusable="false"><path d={member.path} fill={member.filled?'currentColor':'none'} fillRule="evenodd" stroke={member.filled?'none':'currentColor'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  if(!interactive)return <span className="leego-source-mark" role="img" aria-label={`${source}：${member.description}`} title={`${source}：${member.description}`}>{glyph}</span>;
  return <span className="leego-source-control" onKeyDown={e=>{if(e.key==='Escape'){setOpen(false);e.stopPropagation();}}}>
    <button type="button" className="leego-source-trigger" aria-label={`数据来源：${member.label}`} aria-expanded={open} aria-controls={id} onClick={()=>setOpen(v=>!v)} onBlur={()=>setOpen(false)}>{glyph}</button>
    {open&&<span id={id} className="leego-source-description">{source} · {member.description}</span>}
  </span>;
}
