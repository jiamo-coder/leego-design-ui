import React,{useState} from 'react';
import {OrbitGraph,FlowBridge,TrendLine,HealthBar} from '../components';
import {GeoGlobe,BubbleFocus,BranchTree,RadialDots,HexHeatmap} from '../cases';
import './advanced.css';
const tones=[{id:'low',name:'低风险',color:'#25bea5'},{id:'attention',name:'关注',color:'#edbd42'},{id:'high',name:'高风险',color:'#ff995a'},{id:'critical',name:'严重',color:'#f36b73'}];
export function LightRisk({level}:{level:string}){const n=tones.findIndex(x=>x.id===level);return <div className="light-risk"><div className="light-risk-track">{tones.map(x=><span key={x.id} style={{background:x.color}}/>)}{n>=0&&<i style={{left:`${12.5+n*25}%`,borderColor:tones[n].color}}/>}</div><div className="light-risk-labels">{tones.map(x=><span key={x.id}>{x.name}</span>)}</div><p><strong>{n<0?'未判级':tones[n].name}</strong><small>独立业务等级 · 不由完整度反推</small></p></div>}
const modes=[['health','中心诊断'],['flow','来源汇聚'],['branch','关系下钻'],['radial','周期点阵'],['density','热区密度'],['bubble','气泡贡献'],['geo','地域流向']];
const names=['基础资料','来源证明','营养信息','有效证照','商品图片'];
export function Advanced({snapshot}:{snapshot:number}){
 const [mode,setMode]=useState('health'),[node,setNode]=useState('3'),[region,setRegion]=useState('华东'),[city,setCity]=useState('上海'),[hour,setHour]=useState(8),[cell,setCell]=useState(0),[score,setScore]=useState(58),[expanded,setExpanded]=useState(false);
 const values=snapshot?[100,98,90,82,90]:[98,94,82,72,86];
 const dimensions=names.map((label,i)=>({id:String(i),label,value:values[i]}));
 const flows=[{id:'0',label:'本单位维护',value:snapshot?66:62},{id:'1',label:'上游引用',value:snapshot?26:28},{id:'2',label:'待识别',value:snapshot?8:10}];
 const hours=Array.from({length:24},(_,i)=>Math.round(20+55*Math.pow(Math.sin((i+2)*Math.PI/24),2)+(snapshot?6:0)));
 const heat=Array.from({length:28},(_,i)=>(i*17+18+snapshot*9)%101);
 const selectedFlow=flows.find(x=>x.id===node)??flows[0];
 const picked=mode==='health'?names[+node]??names[0]:mode==='flow'?selectedFlow.label:mode==='radial'?`${hour}:00` :mode==='density'?`分箱 ${cell+1}`:mode==='geo'?city:region;
 const value=mode==='health'?values[+node]??values[0]:mode==='flow'?selectedFlow.value:mode==='radial'?hours[hour]:mode==='density'?heat[cell]:mode==='bubble'?([snapshot?42:50,snapshot?35:30,snapshot?23:20][['华东','华南','华北'].indexOf(region)]):null;
 const choose=(id:string)=>{setNode(id);setExpanded(false)};
 return <div className="advanced"><div className="advanced-intro"><div><h2>让关系、变化和证据，一起被看见。</h2><p>七类图形可操作 · 点选后右侧联动 · 顶部切换快照比较变化</p></div><span>示例数据 / 非实时</span></div><div className="advanced-tabs" role="group" aria-label="高级图形类型">{modes.map(([id,label])=><button key={id} aria-pressed={mode===id} onClick={()=>{setMode(id);setNode('0');setExpanded(false)}}>{label}</button>)}</div><section className="advanced-stage"><div className="advanced-visual">
 {mode==='health'&&<><OrbitGraph items={dimensions} selected={node} onSelect={choose} center="资料维度"/><p>等径节点表示维度关系；点选一个维度，定位它的缺项。</p></>}
 {mode==='flow'&&<><h3>100 份档案的来源构成</h3><FlowBridge items={flows} selected={node} onSelect={choose}/><p>中心总量 → 三类去向，流带宽度按份数编码；不是实时传输。</p></>}
 {mode==='branch'&&<BranchTree selected={region} onSelect={setRegion}/>}
 {mode==='radial'&&<RadialDots values={hours} selected={hour} onSelect={setHour}/>}
 {mode==='density'&&<HexHeatmap values={heat} selected={cell} onSelect={setCell}/>}
 {mode==='bubble'&&<BubbleFocus values={snapshot?[42,35,23]:[50,30,20]} selected={region} onSelect={setRegion}/>}
 {mode==='geo'&&<GeoGlobe selected={city} onSelect={setCity}/>}
 </div><aside className="advanced-evidence" aria-live="polite"><span>当前选择</span><h3>{picked}</h3>{value!==null&&<div className="picked-value">{value}<small>{mode==='flow'?'份':mode==='bubble'?'项':'%'}</small></div>}
 {mode==='health'?<><HealthBar value={value} label="字段完整度"/><p>已填 {Number(value)*2} / 200 项<br/>待补 {200-Number(value)*2} 项</p></>:mode==='flow'?<><h4>同一来源的示例趋势 · 份</h4><TrendLine values={[selectedFlow.value-6,selectedFlow.value-3,selectedFlow.value-4,selectedFlow.value]} label={picked+'来源档案量'}/></>:mode==='branch'?<p>{region} → 直营组 / 合作组<br/>选择分支保留组织上下文。</p>:mode==='radial'?<p>当前时段负荷 {value}%<br/>容量基准统一，点阵每点为 20% 档。</p>:mode==='density'?<p>当前等规模分箱密度 {value}%<br/>调节阈值突出集中区域，不改变原始数值。</p>:mode==='geo'?<p>城市选择联动视角与本证据区；经纬网不表示行政边界。</p>:<p>三组总计100项，气泡面积与数量成正比。</p>}
 <button onClick={()=>setExpanded(!expanded)} aria-expanded={expanded}>{expanded?'收起局部证据':'展开局部证据'}</button>{expanded&&<div className="local-evidence"><strong>{picked} · 快照 {snapshot?'B':'A'}</strong><p>{mode==='health'?'下一步：按字段检查规则定位空值，补齐后再核验。':'当前选择已保留，可将组织、时间与对象ID传入业务明细。'}</p><small>演示未连接生产记录，不执行任何业务修改。</small></div>}
 </aside></section><section className="risk-playground"><div><h2>预警可以清亮，不必沉重。</h2><p>浅底承载，细带分级；颜色之外始终保留明确文字。</p><LightRisk level={score<25?'low':score<50?'attention':score<75?'high':'critical'}/></div><div><h3>连续风险分 · 设计沙盘</h3><p>仅演示：0–100 分，越高风险越高；25 / 50 / 75 为示例阈值，不是正式风控规则。</p><div className="continuous-risk"><i style={{left:`${score}%`}}/></div><label>模拟风险分 <strong>{score}</strong><input aria-label="模拟风险分" type="range" min="0" max="100" value={score} onChange={e=>setScore(+e.target.value)}/></label><small>只提供等级的数据用左侧离散标尺，不使用右侧连续分数。</small></div></section></div>
}
