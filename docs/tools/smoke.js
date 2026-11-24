(async()=>{
const st=document.createElement('style');st.textContent='*{animation:none!important;transition:none!important}';document.head.appendChild(st);
const vis=b=>b.offsetParent!==null;
const all=()=>[...document.querySelectorAll('button,a.btn,.btn,.mode')].filter(vis);
const txt=b=>(b.innerText||b.id||'').trim();
const clicks=[];
const tryClick=re=>{const b=all().find(b=>re.test(txt(b))&&!/arcade|leave|quit|host|join/i.test(txt(b)));if(b){clicks.push(txt(b));b.click();return true}return false};
tryClick(/practice|solo|new (adventure|game|run|party|farm|world|kingdom|ship|voyage|park)|^continue|^play/i);
await new Promise(r=>setTimeout(r,700));
tryClick(/start|begin|go|ready|play/i);
await new Promise(r=>setTimeout(r,700));
tryClick(/start|begin|ready|let.?s go|ok|got it|play/i);
await new Promise(r=>setTimeout(r,500));
const g=window.__game;let n=0,err=null;
if(g&&g.update){for(let i=0;i<600;i++){try{g.update(1/60);n++}catch(e){err='update: '+e;break}}
  try{g.render&&g.render()}catch(e){err=(err||'')+' render: '+e}}
return JSON.stringify({title:document.title,clicks,frames:n,err,hook:typeof g,ox:document.documentElement.scrollWidth>innerWidth,btns:all().map(txt).slice(0,9)});
})()
