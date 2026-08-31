import { chromium } from 'playwright';
const PAGES=['/','/music','/about','/gallery','/events','/shop','/nope'];
const WIDTHS=[320,375,390,428,768,1024,1280,1440,1920];
const b=await chromium.launch(); const problems=[];
for(const w of WIDTHS){
  const p=await b.newPage({viewport:{width:w,height:900}});
  for(const path of PAGES){
    await p.goto('http://localhost:5174'+path,{waitUntil:'networkidle'});
    await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=400){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,22));}window.scrollTo(0,0);});
    await p.waitForTimeout(170);
    const r=await p.evaluate(()=>({
      overflow: document.documentElement.scrollWidth-document.documentElement.clientWidth,
      broken: [...document.querySelectorAll('img')].filter(i=>i.complete&&i.naturalWidth===0).length,
      small: [...document.querySelectorAll('a,button')].filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&r.height>0&&r.height<32;}).length,
      noalt: [...document.querySelectorAll('img')].filter(i=>i.getAttribute('alt')===null).length,
      h1: document.querySelectorAll('h1').length,
    }));
    if(r.overflow>0)problems.push(`${w} ${path} OVERFLOW ${r.overflow}px`);
    if(r.broken)problems.push(`${w} ${path} BROKEN_IMG ${r.broken}`);
    if(r.small&&w<=428)problems.push(`${w} ${path} TAP ${r.small}`);
    if(r.noalt)problems.push(`${w} ${path} IMG_NO_ALT ${r.noalt}`);
    if(r.h1!==1)problems.push(`${w} ${path} H1 ${r.h1}`);
  }
  await p.close();
}
await b.close();
console.log(problems.length?problems.join('\n'):`CLEAN: ${WIDTHS.length} widths x ${PAGES.length} pages.`);
