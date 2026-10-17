import type {CSSProperties} from 'react';
import catalog from './catalog.json';
import './production-mode.css';

export type ProductionMode='odm'|'oem'|'ihm';
export const productionModes=catalog.members;

/** Read-only classification; callers explicitly map their business field. */
export function ProductionModeBadge({mode,format='code',tone='plain',size='compact'}:{mode:ProductionMode|string|null;format?:'code'|'full';tone?:'plain'|'soft';size?:'compact'|'regular'}){
  const member=productionModes.find(m=>m.key===mode);
  const style=member?{'--production-color':member.color,'--production-dark-color':member.darkColor,'--production-bg':member.background,'--production-dark-bg':member.darkBackground} as CSSProperties:undefined;
  return <span className="leego-production" data-mode={member?.key||'unknown'} data-tone={tone} data-size={size} style={style} title={member?`${member.code} · ${member.label} · ${member.english}。${member.description}`:'生产方式待确认'}>
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d={member?.path||'M8 2A6 6 0 1 0 8 14A6 6 0 1 0 8 2M6.5 6A1.5 1.5 0 1 1 9 7.1L8 8V9M8 11V11.1'} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    {member?<><span>{member.code}</span><span className={format==='code'?'leego-production-sr-only':undefined}>{member.label}</span></>:<span>待确认</span>}
  </span>;
}
