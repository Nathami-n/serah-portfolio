import { chromium } from 'playwright';
const BASE='http://localhost:5174';
const PAGES=['/','/music','/about','/gallery','/events','/shop','/nope-404'];
const WIDTHS=[320,375,390,428,768,1024,1280,1440,1920];
const b=await chromium.launch(); const problems=[];
for(const w of WIDTHS){
  const p=await b.newPage({viewport:{width:w,height:900}});
  for(const path of PAGES){
    await p.goto(BASE+path,{waitUntil:'networkidle'});
    await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=400){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,25));}window.scrollTo(0,0);});
    await p.waitForTimeout(200);
    const r=await p.evaluate(()=>{
      const de=document.documentElement;
      const overflow=de.scrollWidth-de.clientWidth;
      const offenders=[];
      if(overflow>0){for(const el of document.querySelectorAll('*')){const rect=el.getBoundingClientRect();if(rect.width===0)continue;if(rect.right>de.clientWidth+1)offenders.push({tag:el.tagName.toLowerCase(),cls:(el.className?.toString?.()||'').slice(0,60)});}}
      const small=[...document.querySelectorAll('a,button')].filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&r.height>0&&r.height<32;}).map(el=>(el.textContent||'').trim().slice(0,22));
      const broken=[...document.querySelectorAll('img')].filter(i=>i.complete&&i.naturalWidth===0).length;
      return {overflow,offenders:offenders.slice(0,3),small:small.slice(0,3),broken};
    });
    if(r.overflow>0)problems.push({w,path,type:'OVERFLOW',px:r.overflow,off:r.offenders});
    if(r.broken)problems.push({w,path,type:'BROKEN_IMG',n:r.broken});
    if(r.small.length&&w<=428)problems.push({w,path,type:'TAP',small:r.small});
  }
  await p.close();
}
await b.close();
console.log(problems.length? problems.map(x=>JSON.stringify(x)).join('\n') : `CLEAN: ${WIDTHS.length} widths x ${PAGES.length} pages (incl. 404).`);
