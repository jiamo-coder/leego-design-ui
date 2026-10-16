/** Capture before committing layout, play after. No router or framework dependency. */
export function createShellMotion(root) {
  const main=root.querySelector('[data-leego-shell-main]'), surface=root.querySelector('[data-leego-sidebar-surface]');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let before, animations=[];
  const cancel=()=>{animations.forEach(a=>a.cancel());animations=[];};
  const settle=()=>{before=undefined;cancel();};
  const capture=()=>{if(!main||!surface)return;before={left:main.getBoundingClientRect().left,transform:getComputedStyle(surface).transform};cancel();};
  const play=()=>{
    if(!before||!main||!surface||reduced.matches){settle();return;}
    const x=before.left-main.getBoundingClientRect().left,target=getComputedStyle(surface).transform;
    const options={duration:260,easing:'cubic-bezier(.2,.7,.2,1)'};
    animations=[main.animate([{transform:`translateX(${x}px)`},{transform:'translateX(0)'}],options),surface.animate([{transform:before.transform},{transform:target}],options)];
    before=undefined;
  };
  reduced.addEventListener('change',settle);window.addEventListener('resize',settle);
  return {capture,play,dispose(){settle();reduced.removeEventListener('change',settle);window.removeEventListener('resize',settle);}};
}
