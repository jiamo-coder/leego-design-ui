'use client';
import {useEffect,useId,useRef,useState} from 'react';
import {StatusBadge,tableStatuses,type TableStatus} from './StatusBadge';
import './status-filter.css';

export function StatusFilter({value,onChange}:{value:TableStatus|'all';onChange:(value:TableStatus|'all')=>void}){
  const [open,setOpen]=useState(false);const id=useId();const root=useRef<HTMLDivElement>(null);const trigger=useRef<HTMLButtonElement>(null);
  useEffect(()=>{
    if(!open)return;
    root.current?.querySelector<HTMLInputElement>('input:checked')?.focus();
    const outside=(e:PointerEvent)=>{if(!root.current?.contains(e.target as Node))setOpen(false);};
    document.addEventListener('pointerdown',outside);return()=>document.removeEventListener('pointerdown',outside);
  },[open]);
  function choose(next:TableStatus|'all'){onChange(next);setOpen(false);trigger.current?.focus();}
  return <div className="leego-status-filter" ref={root} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setOpen(false);}} onKeyDown={e=>{if(e.key==='Escape'&&open){e.stopPropagation();setOpen(false);trigger.current?.focus();}}}>
    <button ref={trigger} type="button" className="leego-status-filter-trigger" aria-label={`筛选主档状态：${value==='all'?'全部状态':tableStatuses.find(m=>m.key===value)?.label}`} aria-expanded={open} aria-controls={id} onClick={()=>setOpen(!open)}>
      {value==='all'?<span>全部状态</span>:<StatusBadge status={value} size="regular"/>}<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </button>
    {open&&<div id={id} className="leego-status-filter-panel" role="group" aria-label="筛选主档状态">
      {[{key:'all',label:'全部状态'},...tableStatuses].map(m=><label key={m.key} className="leego-status-filter-option">
        <input type="radio" name={id} value={m.key} checked={value===m.key} onChange={()=>onChange(m.key as TableStatus|'all')} onClick={()=>choose(m.key as TableStatus|'all')} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose(m.key as TableStatus|'all');}}}/>
        {m.key==='all'?<span>全部状态</span>:<StatusBadge status={m.key} size="regular"/>}
      </label>)}
    </div>}
  </div>;
}
