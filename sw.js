// Minimal service worker so phones treat Blob Arcade as an installable app.
// Network-first: you always get the newest version; the cached copy is only used offline.
const C='blob-arcade-v1';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{const copy=res.clone();caches.open(C).then(c=>c.put(r,copy)).catch(()=>{});return res}).catch(()=>caches.match(r)));
});
