// Copy this reviewed adapter into the application. Never import executable code from the stable channel.
export const ICON_ORIGIN='https://smalltypeui.qiaokiai.com';
export const ICON_BASE='/skills/leego-design-ui/site/icon-api/v1';
export type IconAsset={url:string;sha256:string;format:'svg'|'png'|'webp';bytes:number};
export type IconEntry={id:string;label:string;category:string;rights:'project-reuse'|'reference-only';defaultVariant:string|null;variants:Record<string,IconAsset>;maskable?:boolean};
export type IconSnapshot={schemaVersion:1;version:string;base:string;entries:IconEntry[]};
type Options={origin?:string;version?:string;signal?:AbortSignal;storage?:Pick<Storage,'getItem'|'setItem'>};
const digest=async(bytes:ArrayBuffer)=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),b=>b.toString(16).padStart(2,'0')).join('');
function validate(value:IconSnapshot):IconSnapshot{
  if(value.schemaVersion!==1||value.base!==ICON_BASE||!/^\d+\.\d+\.\d+$/.test(value.version)||!Array.isArray(value.entries))throw Error('Unsupported icon catalog');
  const ids=new Set();
  for(const e of value.entries){
    if(!/^[a-z0-9.-]+$/.test(e.id)||ids.has(e.id)||!['project-reuse','reference-only'].includes(e.rights)||!e.variants||typeof e.variants!=='object')throw Error('Invalid icon identity');ids.add(e.id);
    if(e.rights==='reference-only'&&Object.keys(e.variants).length)throw Error('Restricted asset cannot be distributed');
    for(const [key,a] of Object.entries(e.variants)){
      if(!/^[a-z0-9-]+$/.test(key)||!['svg','png','webp'].includes(a.format)||!/^[a-f0-9]{64}$/.test(a.sha256)||a.url!==`${ICON_BASE}/assets/${a.sha256}.${a.format}`)throw Error('Unexpected asset URL');
      Object.freeze(a);
    }
    Object.freeze(e.variants);Object.freeze(e);
  }
  Object.freeze(value.entries);return Object.freeze(value);
}
export async function loadIconSnapshot(options:Options={}):Promise<{snapshot:IconSnapshot;fromCache:boolean}>{
  const origin=options.origin||ICON_ORIGIN;
  if(options.version&&!/^\d+\.\d+\.\d+$/.test(options.version))throw Error('Invalid pinned version');
  const key=`leego-icons:v1:${origin}:${options.version||'stable'}`;
  const request=async(path:string)=>{const timeout=AbortSignal.timeout(8000);const response=await fetch(origin+path,{cache:'no-cache',credentials:'omit',signal:options.signal?AbortSignal.any([options.signal,timeout]):timeout});if(!response.ok)throw Error(`Icon HTTP ${response.status}`);return response;};
  try{
    let version=options.version,expected:string|undefined;
    if(!version){
      const pointer=await(await request(`${ICON_BASE}/channels/stable.json`)).json() as {schemaVersion:number;version:string;catalog:string;sha256:string};
      if(pointer.schemaVersion!==1||!/^\d+\.\d+\.\d+$/.test(pointer.version)||pointer.catalog!==`${ICON_BASE}/releases/${pointer.version}.json`||!/^[a-f0-9]{64}$/.test(pointer.sha256))throw Error('Invalid stable pointer');
      version=pointer.version;expected=pointer.sha256;
    }
    const bytes=await(await request(`${ICON_BASE}/releases/${version}.json`)).arrayBuffer();
    const sha256=await digest(bytes);if(expected&&sha256!==expected)throw Error('Catalog integrity mismatch');
    const text=new TextDecoder().decode(bytes),snapshot=validate(JSON.parse(text));
    if(snapshot.version!==version)throw Error('Snapshot version mismatch');
    try{options.storage?.setItem(key,JSON.stringify({text,sha256}));}catch{/* Storage denied/full: keep the verified in-memory snapshot. */}
    return {snapshot,fromCache:false};
  }catch(error){
    if(options.signal?.aborted)throw error;
    try{
      const cached=JSON.parse(options.storage?.getItem(key)||'null');
      if(cached && await digest(new TextEncoder().encode(cached.text).buffer)===cached.sha256){
        const snapshot=validate(JSON.parse(cached.text));
        if(options.version&&snapshot.version!==options.version)throw Error('Cached version mismatch');
        return {snapshot,fromCache:true};
      }
    }catch{/* Invalid cache is not a source of truth. */}
    throw error;
  }
}
export function resolveIcon(snapshot:IconSnapshot,name:string,variant?:string,origin=ICON_ORIGIN){
  const e=snapshot.entries.find(e=>e.id===name);
  if(!e)throw Error(`Unknown icon: ${name}`);
  if(e.rights==='reference-only')throw Error(`Reference-only: ${name}`);
  const asset=e.variants[variant||e.defaultVariant||''];
  if(!asset)throw Error(`Unsupported variant: ${name}/${variant}`);
  return {...asset,url:origin+asset.url,maskable:e.maskable===true};
}
