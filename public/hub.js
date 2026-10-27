'use strict';
(async()=>{
  try{
    const res=await fetch('/role-config',{cache:'no-store'});if(!res.ok)return;
    const data=await res.json();
    const set=(id,value)=>{const el=document.getElementById(id);if(el&&typeof value==='string')el.textContent=value.slice(0,160)};
    set('networkTitle',data.siteTitle);set('networkSubtitle',data.siteSubtitle);
    for(const role of ['ase','police','border']){
      const info=data.roles?.[role];if(!info)continue;
      set(role+'Name',info.name);set(role+'Subtitle',info.subtitle);set(role+'Description',info.description);
      const link=document.getElementById(role+'Link');
      if(link && typeof info.path==='string' && (info.path.startsWith('/')&&!info.path.startsWith('//') || /^https:\/\/[A-Za-z0-9.-]+(?:\/|$)/.test(info.path)))link.href=info.path;
    }
  }catch{ /* Use built-in labels and local routes when offline. */ }
})();
