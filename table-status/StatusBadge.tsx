import type {CSSProperties} from 'react';
import catalog from './catalog.json';
import './status-badge.css';

export type TableStatus='draft'|'enabled'|'disabled'|'archived';
export const allTableStatuses=catalog.members;
export const statusGroups=catalog.groups;
export const tableStatuses=catalog.members.filter(m=>['draft','enabled','disabled','archived'].includes(m.key));

/** Display only: business status is not the disabled state of a control. */
export function StatusBadge({status,tone='plain',size='compact'}:{status:TableStatus|string|null;tone?:'plain'|'soft';size?:'compact'|'regular'}){
  const member=allTableStatuses.find(m=>m.key===status);
  if(!member)return <span className="leego-status" data-size={size}><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M6.2 6a1.8 1.8 0 1 1 3.2 1.1L8 8.4v.6" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="11" r=".7" fill="currentColor"/></svg><span>状态未知</span></span>;
  const style={'--status-color':member.color,'--status-dark-color':member.darkColor,'--status-bg':member.background,'--status-dark-bg':member.darkBackground} as CSSProperties;
  return <span className="leego-status" data-status={member.key} data-tone={tone} data-size={size} style={style}>
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d={member.path} fill={member.kind==='solid'?'currentColor':'none'} stroke={member.kind==='solid'?'none':'currentColor'} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d={member.detail} fill="none" stroke={member.kind==='solid'?'var(--status-ink, #fff)':'currentColor'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg><span>{member.label}</span>
  </span>;
}
