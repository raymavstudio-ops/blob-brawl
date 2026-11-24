(async()=>{
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const vis=e=>e.offsetParent!==null;
const btns=d=>[...d.querySelectorAll('button,.btn')].filter(vis);
const txt=b=>(b.innerText||b.id||'').trim().replace(/\s+/g,' ');
const hostBtn=btns(document).find(b=>/host/i.test(txt(b)));
if(!hostBtn)return 'no host button: '+btns(document).map(txt).join('|');
hostBtn.click();await sleep(3500);
const codeEl=[...document.querySelectorAll('*')].filter(vis).find(e=>e.children.length===0&&/^[A-Z]{4}$/.test((e.innerText||'').trim()));
const code=codeEl&&codeEl.innerText.trim();
if(!code)return 'no code. btns='+btns(document).map(txt).join('|');
const f=document.createElement('iframe');f.style.cssText='position:fixed;right:0;bottom:0;width:480px;height:270px;z-index:99;border:2px solid red';
f.src=location.pathname+'?mp=1#'+code;document.body.appendChild(f);await sleep(3500);
const d=f.contentDocument,w=f.contentWindow;
let jb=btns(d).find(b=>/join (the|game|race|party|crew|room|adventure)/i.test(txt(b)));
let how='invite';
if(!jb){const inp=d.querySelector('input[type=text]');if(inp){inp.value=code;inp.dispatchEvent(new w.Event('input',{bubbles:true}))}jb=btns(d).find(b=>/^join$/i.test(txt(b)));how='code'}
if(!jb)return 'no join btn in client: '+btns(d).map(txt).join('|');
jb.click();await sleep(5000);
const hostText=document.body.innerText.replace(/\s+/g,' ').slice(0,260);
const clientText=d.body.innerText.replace(/\s+/g,' ').slice(0,260);
return JSON.stringify({code,how,hostText,clientText});
})()
