/** Read-only DOM checks. Caller supplies an already open, authorized Playwright page. */
export async function auditSidebar(page, selectors = {}) {
  const s = { sidebar:'[data-leego-sidebar]', row:'[data-leego-row]', slot:'[data-leego-slot]', label:'[data-leego-label]', selection:'[data-leego-selection]', account:'[data-leego-account]', notification:'[data-leego-notification]', toggle:'[data-leego-toggle]', ...selectors };
  const checks = await page.evaluate(s => {
    const results = [];
    const add = (id, passed, evidence) => results.push({id,status:passed?'通过':'失败',method:'browser',evidence});
    const rail = document.querySelector(s.sidebar);
    if (!rail) return [{id:'sidebar.present',status:'失败',method:'browser',evidence:'Sidebar selector did not match'}];
    const r = rail.getBoundingClientRect(), css = getComputedStyle(rail);
    const near = (a,b) => Math.abs(a-b)<=1;
    const collapsed = near(r.width,68);
    add('sidebar.width', [216,68,248].some(w=>near(w,r.width)), r.width);
    add('sidebar.surface',css.backgroundColor==='rgb(17, 17, 20)',css.backgroundColor);
    const rows = [...rail.querySelectorAll(s.row)];
    add('navigation.present',rows.length>0,rows.length);
    for (const [index,row] of rows.entries()) {
      const slot=row.querySelector(s.slot),label=row.querySelector(s.label),style=getComputedStyle(label||row);
      const a=slot?.getBoundingClientRect(),b=label?.getBoundingClientRect();
      add(`row.${index}.axis`,Boolean(a && near(a.x+a.width/2-r.x,34) && near(a.width,28) && (collapsed || b && near(b.x-r.x,56))),{slot:a?{center:a.x+a.width/2-r.x,width:a.width}:null,text:b?.x-r.x});
      add(`row.${index}.type`,style.fontSize==='14px'&&style.lineHeight==='22px'&&style.fontWeight==='400',{size:style.fontSize,line:style.lineHeight,weight:style.fontWeight});
      const glyph=slot?.querySelector('svg,img'),g=glyph?.getBoundingClientRect();
      if(g) add(`row.${index}.icon`,near(g.x+g.width/2-r.x,34)&&(glyph.tagName.toLowerCase()==='img'?g.width<=24&&g.height<=24:near(g.width,20)&&near(g.height,20)),{width:g.width,height:g.height,center:g.x+g.width/2-r.x});
    }
    const layers=[...rail.querySelectorAll(s.selection)];
    const layer=layers[0],a=layer?.getBoundingClientRect();
    add('selection.single',layers.length===1,layers.length);
    add('selection.face',Boolean(a&&near(a.height,32)&&getComputedStyle(layer).backgroundColor==='rgb(161, 141, 247)'),a?{height:a.height,color:getComputedStyle(layer).backgroundColor}:null);
    const active=rail.querySelector(`${s.row}[aria-current="page"]`),activeRect=active?.getBoundingClientRect(),activeLabel=active?.querySelector(s.label)?.getBoundingClientRect();
    const expectedWidth=activeRect&&activeLabel?(collapsed?36:Math.min(activeRect.width,activeLabel.right-activeRect.left+12)):0;
    add('selection.target',Boolean(a&&activeRect&&near(a.y,activeRect.y+(activeRect.height-32)/2)&&near(a.width,expectedWidth)&&getComputedStyle(active).color==='rgb(17, 17, 20)'),{width:a?.width,expectedWidth});
    const account=rail.querySelector(s.account)?.getBoundingClientRect(),notification=rail.querySelector(s.notification)?.getBoundingClientRect();
    add('account.present',Boolean(account),Boolean(account));
    if(account&&notification) add('account.notification-layout',collapsed ? notification.y>=account.bottom-1 : near(account.y+account.height/2,notification.y+notification.height/2)&&account.right<=notification.x+1,{account:account.toJSON(),notification:notification.toJSON()});
    const toggle=rail.querySelector(s.toggle)?.getBoundingClientRect();
    add('toggle.target',Boolean(toggle&&toggle.width>=44&&toggle.height>=44),toggle?.toJSON());
    return results;
  }, s);
  // Actual rendered glyphs, not document.fonts.check or font-family alone.
  let session;
  try {
    session=await page.context().newCDPSession(page);
    await session.send('DOM.enable'); await session.send('CSS.enable');
    const {root}=await session.send('DOM.getDocument');
    const {nodeIds}=await session.send('DOM.querySelectorAll',{nodeId:root.nodeId,selector:`${s.sidebar} ${s.label}`});
    const fonts=[];
    for(const nodeId of nodeIds) fonts.push(...(await session.send('CSS.getPlatformFontsForNode',{nodeId})).fonts.filter(f=>f.glyphCount>0));
    checks.push({id:'font.rendered',status:fonts.length&&fonts.every(f=>f.isCustomFont&&/^MiSans/i.test(f.familyName))?'通过':'失败',method:'browser/CDP',evidence:fonts});
  } catch(error) {
    checks.push({id:'font.rendered',status:'未验证',method:'browser/CDP',evidence:error.message});
  } finally { await session?.detach(); }
  for (const id of ['selection.motion-and-reversal','collapse.state-preservation','overlay.focus-and-bounds','session.logout-and-recovery']) checks.push({id,status:'未验证',method:'interaction',evidence:'Requires application-specific interaction test; this read-only probe does not click controls.'});
  return { checks, accepted:checks.every(c=>c.status==='通过'||c.status==='不适用') };
}
