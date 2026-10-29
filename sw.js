/* Déclic — service worker : le site s'installe comme une app et marche sans connexion.
   À l'installation, il met en cache la page et tous les fichiers qu'elle charge (lus dans index.html).
   Ensuite : réseau d'abord pour les fichiers du site (on voit toujours la dernière version),
   cache d'abord pour les bibliothèques versionnées du CDN, et le cache sert de secours hors connexion. */
const CACHE='declic-v1';
const CDN='https://cdn.jsdelivr.net/';

self.addEventListener('install',e=>{
  e.waitUntil((async()=>{
    const c=await caches.open(CACHE);
    const html=await (await fetch('./',{cache:'no-cache'})).text();
    const urls=['./','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/apple-touch-icon.png',
      ...[...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(m=>m[1]),
      'https://cdn.jsdelivr.net/npm/mathjs@12.4.2/lib/browser/math.js',
      'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js',
      'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css'];
    await Promise.all([...new Set(urls)].map(u=>c.add(u).catch(()=>{})));
    self.skipWaiting();
  })());
});
self.addEventListener('activate',e=>{
  e.waitUntil((async()=>{
    for(const k of await caches.keys()) if(k!==CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET') return;
  const u=r.url, same=u.startsWith(self.registration.scope);
  if(!same&&!u.startsWith(CDN)) return;   // comptes (Supabase) et autres : jamais interceptés
  e.respondWith((async()=>{
    const c=await caches.open(CACHE);
    if(!same){ // bibliothèques versionnées : cache d'abord
      const hit=await c.match(r); if(hit) return hit;
      const res=await fetch(r); if(res.ok||res.type==='opaque') c.put(r,res.clone()); return res;
    }
    try{
      const res=await fetch(r,{cache:'no-cache'});
      if(res.ok) c.put(r,res.clone());
      return res;
    }catch(err){
      return (await c.match(r,{ignoreSearch:true}))||(r.mode==='navigate'?await c.match('./'):Response.error());
    }
  })());
});
