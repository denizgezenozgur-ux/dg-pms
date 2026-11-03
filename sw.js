const C="dg-pms-v2";
const FILES=["./","index.html","manifest.webmanifest","icons/icon-32.png","icons/icon-180.png","icons/icon-192.png","icons/icon-512.png","icons/maskable-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith("dg-pms-")&&x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
 if(e.request.mode==="navigate"){e.respondWith(fetch(e.request).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put("index.html",cp));return res}).catch(()=>caches.match("index.html")));return;}
 const h=new URL(e.request.url).hostname;if(h.endsWith("googleapis.com")||h.endsWith("firebaseapp.com"))return;
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp)).catch(()=>{});return res})))});
