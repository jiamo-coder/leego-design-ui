import {ThemeSelect} from '../../theme-runtime/ThemeSelect';
import '../../theme-runtime/theme.css';
import '../../theme-runtime/theme.js';
import React,{useState} from 'react';
import{createRoot}from'react-dom/client';
import {HealthRing,HealthBar,SegmentedShare,DataState} from '../components';
import './style.css';
import {Advanced,LightRisk as RiskScale} from './advanced';

const snapshots=[
 {name:'10月19日',filled:864,dimensions:[98,94,82,72,86],ranks:[96,91,88,82,75],done:72,risks:[2,5,8],trend:[70,74,73,79,81,84,86.4]},
 {name:'10月20日',filled:920,dimensions:[100,98,90,82,90],ranks:[98,94,92,86,80],done:84,risks:[1,3,6],trend:[74,73,79,81,84,86.4,92]}
];
const dimensionNames=['基础资料','原料来源','营养信息','资质证照','商品图片'];
const levels=['全部','严重','高风险','关注'];
const issues=[
 {id:'P-014',name:'乳制品供应商资质',level:'严重',why:'示例资质超过有效期',owner:'采购组',next:'核对证照有效期并更新资料'},
 {id:'P-026',name:'冷链原料温控记录',level:'严重',why:'示例温度超出约定范围',owner:'仓储组',next:'核查批次温控记录，确认影响范围'},
 {id:'P-031',name:'苹果原料来源档案',level:'高风险',why:'关键来源证明待核实',owner:'商品组',next:'关联原料来源证明并发起核实'},
 {id:'P-042',name:'酸奶营养信息',level:'关注',why:'营养信息尚未补全',owner:'研发组',next:'补齐营养资料，再进行复核'}
];
function Track({value,color='#7753c6',label}:{value:number;color?:string;label:string}){return <div className="track" role="meter" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}><i style={{transform:`scaleX(${value/100})`,background:color}}/></div>}
function App(){
 const [snap,setSnap]=useState(0),[paused,setPaused]=useState(false),[dimension,setDimension]=useState(3),[rank,setRank]=useState(0),[risk,setRisk]=useState('全部'),[detail,setDetail]=useState<string|null>(null),[tab,setTab]=useState(new URLSearchParams(location.search).get('view')==='advanced'?'高级图形与动效':'运营总览'),[state,setState]=useState('ready');
 const s=snapshots[snap],percent=s.filled/10,selected=issues.find(x=>x.id===detail);
 const rankNames=['北京区域','上海区域','杭州区域','成都区域','深圳区域'];
 const stateLabels:Record<string,string>={loading:'正在读取示例快照…',empty:'此范围暂无记录',error:'示例请求失败',denied:'无权查看此范围',unmapped:'来源尚未映射',stale:'快照已过期'};
 const graph=s.trend.map((v,i)=>`${45+i*72},${184-v*1.5}`).join(' ');
 return <div className={paused?'app ld-paused':'app'}>
 <header className="top"><ThemeSelect/><a className="brand" href="#top">Leego <span>Dashboard</span></a><span className="preview-label">交互设计预览 · 全部为示例数据</span><button aria-pressed={paused} onClick={()=>setPaused(!paused)}>{paused?'恢复动效':'暂停动效'}</button></header>
 <main id="top"><div className="heading"><div><h1>把数据看清，把问题找到。</h1><p>商品资料与运营诊断 · 紫色品牌 / 独立风险语义</p></div><div className="snapshot"><span>比较演示快照</span><div className="segmented">{snapshots.map((x,i)=><button key={x.name} aria-pressed={snap===i} onClick={()=>setSnap(i)}>{x.name}</button>)}</div></div></div>
 <div className="toolbar"><nav aria-label="看板模式">{['运营总览','高级图形与动效','组件与色阶'].map(t=><button key={t} aria-current={tab===t?'page':undefined} onClick={()=>setTab(t)}>{t}</button>)}</nav><label>数据状态 <select value={state} onChange={e=>setState(e.target.value)}><option value="ready">正常示例</option>{Object.entries(stateLabels).map(([k,v])=><option value={k} key={k}>{v}</option>)}</select></label></div>
 <div className="evidence"><span>范围：全部商品 · 100 份档案 / 1,000 个应填字段</span><span>固定快照：2026-{s.name.replace('月','-').replace('日','')} 18:00 · 非实时</span></div>
 {state!=='ready'&&state!=='stale'?<section className="empty"><DataState state={state as any} onRetry={()=>setState('ready')}/><p>这是状态展示，不会把未知数据补成 0 或生成健康结论。</p><button onClick={()=>setState('ready')}>返回正常示例</button></section>:<>
 {state==='stale'&&<div role="status" className="stale">旧快照，仅供参考。以下数据不代表当前状态。<button onClick={()=>setState('ready')}>恢复正常示例</button></div>}
 {tab==='高级图形与动效'?<Advanced snapshot={snap}/>:tab==='运营总览'?<>
 <section className="primary">
 <article className="panel completeness"><div className="section-head"><h2>资料完整度</h2><span className="chip">字段已填 / 应填</span></div><div className="completion-body"><div className="ring-wrap"><HealthRing value={percent}/><p>{s.filled} / 1,000 <span>字段已填</span></p></div><div className="dimension-list"><p className="subtle">哪里还需要补齐？</p>{dimensionNames.map((name,i)=><button key={name} aria-pressed={dimension===i} onClick={()=>setDimension(i)}><span>{name}</span><Track value={s.dimensions[i]} label={`${name}完整度`}/><strong>{s.dimensions[i]}%</strong></button>)}</div></div><div className="insight" aria-live="polite"><div><strong>{dimensionNames[dimension]} · 还缺 {200-s.dimensions[dimension]*2} 个字段</strong><p>每维度应填 200 项。完整度不等于内容已验证。</p></div><button onClick={()=>{setDetail('dimension');document.getElementById('diagnosis')?.scrollIntoView({behavior:'instant'})}}>查看缺项</button></div></article>
 <article className="panel health"><div className="section-head"><h2>健康诊断</h2><span className="chip">分项判断</span></div><p className="health-intro">已填完整，还要可信、有效、可用。</p>{[['资料核验',snap?'94':'89','通过核验 / 100 份'],['有效证照',snap?'97':'94','有效证照 / 100 份'],['来源关联',snap?'96':'92','已关联 / 100 份']].map(([name,v,desc])=><div className="health-row" key={name}><div><span>{name}</span><small>{desc}</small></div><strong>{v}<small>%</small></strong></div>)}<div className="health-note">暂不合成总分<span>权重与业务规则确认后，再形成健康指数。</span></div></article>
 </section>
 <section className="middle">
 <article className="panel trend"><div className="section-head"><h2>完整度趋势</h2><span className="chip">最近 7 次快照</span></div><div className="trend-summary"><strong>{percent}%</strong><span>较窗口首日 +{(percent-s.trend[0]).toFixed(1)} 个百分点</span></div><svg viewBox="0 0 510 220" role="img" aria-label={`完整度趋势，百分比：${s.trend.join('、')}`}><g className="grid">{[0,50,100].map(v=><g key={v}><line x1="45" x2="477" y1={184-v*1.5} y2={184-v*1.5}/><text x="10" y={189-v*1.5}>{v}</text></g>)}</g><polygon points={`45,184 ${graph} 477,184`} fill="#f1ebfb"/><polyline points={graph} fill="none" stroke="#7753c6" strokeWidth="3" strokeLinejoin="round"/>{s.trend.map((v,i)=><g key={i}><circle cx={45+i*72} cy={184-v*1.5} r="4" fill="#7753c6"/><text x={45+i*72} y="210" textAnchor="middle">{13+snap+i}日</text></g>)}</svg><details><summary>查看精确数值与口径</summary><p>字段完整度，固定 1,000 项分母；{s.trend.map((v,i)=>`${13+snap+i}日 ${v}%`).join('；')}。</p></details></article>
 <article className="panel ranking"><div className="section-head"><h2>区域完整度排行</h2><span className="chip">同口径 · %</span></div><p className="subtle">共同基准 0–100% · 虚线目标 90%</p>{rankNames.map((name,i)=><button className="rank-row" aria-pressed={rank===i} onClick={()=>setRank(i)} key={name}><span className="rank-number">{i+1}</span><div><span>{name}</span><div className="rank-track"><Track value={s.ranks[i]} label={name}/><i className="target"/></div></div><strong>{s.ranks[i]}</strong></button>)}<div className="rank-detail" aria-live="polite">{rankNames[rank]} {s.ranks[rank]>=90?'已达到目标':'距目标 '+(90-s.ranks[rank])+' 个百分点'}<small>各区域独立样本；不由此计算上方档案总值。</small></div></article>
 <article className="panel progress"><div className="section-head"><h2>补全任务进度</h2><span className="chip">本批 100 项</span></div><div className="progress-big"><strong>{s.done}<small>/ 100</small></strong><span>已完成任务</span></div><Track value={s.done} label="补全任务完成率"/><div className="steps"><span>已分派<strong>100</strong></span><span>处理中<strong>{100-s.done}</strong></span><span>已完成<strong>{s.done}</strong></span></div><hr/><h3>档案来源构成</h3><SegmentedShare items={[{id:'own',label:'自建',value:62},{id:'external',label:'外部引用',value:28},{id:'pending',label:'待识别',value:10}]}/><small>互斥分类，合计 100 份；不代表编辑权限。</small></article>
 </section>
 <section className="panel risks"><div className="section-head"><div><h2>风险预警与处理线索</h2><p>先看严重程度，再看具体对象。与完整度独立判断。</p></div><span className="chip">示例等级 · 非正式风控规则</span></div><div className="risk-content"><div><RiskScale level="critical"/><div className="risk-totals">{['严重','高风险','关注'].map((x,i)=><button key={x} className={'severity severity-'+i} aria-pressed={risk===x} onClick={()=>setRisk(risk===x?'全部':x)}><span>{x}</span><strong>{s.risks[i]}</strong><small>项</small></button>)}</div><small>本区数量为独立风险样例，不等于缺失字段数。</small></div><div><div className="risk-filter">{levels.map(x=><button key={x} aria-pressed={risk===x} onClick={()=>setRisk(x)}>{x}</button>)}<span>代表性问题样例</span></div><div className="issue-list">{issues.filter(x=>(snap===0||x.id!=='P-026')&&(risk==='全部'||x.level===risk)).map(x=><button key={x.id} className="issue" onClick={()=>{setDetail(x.id);document.getElementById('diagnosis')?.scrollIntoView({behavior:'instant'})}}><span className={'badge level-'+x.level}>{x.level}</span><div><strong>{x.name}</strong><small>{x.why}</small></div><span>{x.owner}</span><span aria-hidden="true">→</span></button>)}</div></div></div></section>
 <section className="panel diagnosis" id="diagnosis" aria-live="polite"><div><h2>{selected?selected.name:detail==='dimension'?`${dimensionNames[dimension]} · 缺项诊断`:'从一个指标，走到一条处理线索。'}</h2><p>{selected?`${selected.id} · ${selected.level} · ${selected.owner}`:detail==='dimension'?`当前快照 ${s.name} · ${200-s.dimensions[dimension]*2} 项待补`:'点击上方“查看缺项”或任一风险问题，这里会保留当前快照并展示诊断。'}</p></div>{detail&&<div className="detail-content"><h3>下一步建议</h3><p>{selected?selected.next:`按${dimensionNames[dimension]}检查规则定位空字段，再由档案维护人补齐。`}</p><small>演示联动，不写入业务系统；正式接入需使用真实记录 ID、权限与来源证据。</small><button onClick={()=>setDetail(null)}>收起诊断</button></div>}</section>
 </>:<section className="panel laboratory"><h2>同一套视觉，不同的数据含义。</h2><p>完整度沿用已认可连续色阶；普通任务用紫色；风险保持四级，未定义连续风险分时不制造渐变分数。</p><div className="lab-grid"><article><h3>完整度 · 连续变化</h3>{[0,20,40,60,80,95,100,null].map(v=><HealthBar key={String(v)} value={v} label={v===null?'未检查':`${v}% 样本`}/>)}</article><article><h3>风险 · 离散等级</h3>{['low','attention','high','critical','unknown'].map(v=><RiskScale level={v} key={v}/>)}</article><article><h3>普通进度 · 品牌紫</h3>{[20,50,80,100].map(v=><div className="sample" key={v}><p>已完成 {v} / 100</p><Track value={v} label={`任务 ${v}%`}/></div>)}<h3>数据来源与健康不是同一维度</h3><p>SRC：本单位生产维护。REF：引用上游数据。来源不推导质量、风险或编辑权限；正式接入沿用现有来源角标。</p></article></div></section>}
 </>}
 <footer>Leego UI · Dashboard 方案预览 / MiSans · 指数、原因、明细、行动<br/>未接入生产数据，已收录 Skill · 公网与业务接入另行核验。</footer>
 </main></div>
}
createRoot(document.getElementById('root')!).render(<App/>);
