/* Déclic — Maths au secondaire, 10e année : solides, développements et volumes */
(()=>{
/* ---------- helpers locaux : vecteurs 3D, vue en perspective, solides, développements ---------- */
const COL=['var(--accent)','var(--math)','var(--spark)','var(--ok)','var(--code)','var(--other)','var(--bad)'];
const add=(a,b)=>a.map((x,i)=>x+b[i]), sub=(a,b)=>a.map((x,i)=>x-b[i]), sc=(k,a)=>a.map(x=>k*x);
const dot3=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const nrm=a=>sc(1/Math.hypot(...a),a), mean=ps=>sc(1/ps.length,ps.reduce((s,p)=>add(s,p),[0,0,0]));
const PI=Math.PI;
// projection identique à space() de lib.js, mais avec un cadre choisi (x et y)
const proj=(az,el)=>{ const ca=Math.cos(rad(az)), sa=Math.sin(rad(az)), ce=Math.cos(rad(el)), se=Math.sin(rad(el));
  return p=>[p[1]*ca-p[0]*sa, p[2]*ce-(p[0]*ca+p[1]*sa)*se]; };
function view(o={}){ const az=o.az??30, el=o.el??22, pr=proj(az,el);
  const P=plane({x:o.x||[-3,3],y:o.y||[-2.4,2.4],grid:false,axes:false,w:320});
  const A=rad(az), E=rad(el);
  const W={P,pr,az:A,V:[Math.cos(A)*Math.cos(E),Math.sin(A)*Math.cos(E),Math.sin(E)],
    seg(a,b,q){ const p=pr(a),t=pr(b); P.seg(p[0],p[1],t[0],t[1],q); return W; },
    poly(ps,q){ P.poly(ps.map(pr),q); return W; },
    text(a,s,q){ const p=pr(a); P.text(p[0],p[1],s,q); return W; },
    dot(a,q){ const p=pr(a); P.dot(p[0],p[1],q); return W; },
    depth:p=>dot3(p,W.V), svg:()=>P.svg()};
  return W; }
// cadre qui contient tous les points (même échelle en x et y)
function fit(sets,az,el,pad=.35){ const pr=proj(az,el); let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;
  sets.forEach(ps=>ps.forEach(p=>{ const q=pr(p); x0=Math.min(x0,q[0]); x1=Math.max(x1,q[0]); y0=Math.min(y0,q[1]); y1=Math.max(y1,q[1]); }));
  return {x:[x0-pad,x1+pad],y:[y0-pad,y1+pad]}; }
// solides (sommets vs, faces fs)
const ngon=(n,R,t0=0)=>Array.from({length:n},(_,i)=>[R*Math.cos(t0+2*PI*i/n),R*Math.sin(t0+2*PI*i/n)]);
const rectB=(a,b)=>[[-a/2,-b/2],[a/2,-b/2],[a/2,b/2],[-a/2,b/2]];
function prismB(base,h,z0=-h/2){ const n=base.length, vs=[...base.map(([x,y])=>[x,y,z0]),...base.map(([x,y])=>[x,y,z0+h])];
  const fs=[[...Array(n).keys()],[...Array(n).keys()].map(i=>i+n)]; for(let i=0;i<n;i++) fs.push([i,(i+1)%n,(i+1)%n+n,i+n]); return {vs,fs}; }
function pyrB(base,h){ const n=base.length, vs=[...base.map(([x,y])=>[x,y,-h/3]),[0,0,2*h/3]];
  const fs=[[...Array(n).keys()]]; for(let i=0;i<n;i++) fs.push([i,(i+1)%n,n]); return {vs,fs}; }
// prisme couché : la base est dans le plan (x, z), la longueur suit y
function lyingPrism(prof,L){ const n=prof.length, vs=[...prof.map(([x,z])=>[x,-L/2,z]),...prof.map(([x,z])=>[x,L/2,z])];
  const fs=[[...Array(n).keys()],[...Array(n).keys()].map(i=>i+n)]; for(let i=0;i<n;i++) fs.push([i,(i+1)%n,(i+1)%n+n,i+n]); return {vs,fs}; }
// polyèdre convexe : faces visibles colorées, arêtes cachées en pointillés. o.hl : 1 faces, 2 arêtes, 3 sommets
function polyh(W,S,o={}){ const {vs,fs}=S, c=mean(vs), col=o.c||'var(--accent)';
  const vis=fs.map(f=>{ let n=cross(sub(vs[f[1]],vs[f[0]]),sub(vs[f[2]],vs[f[0]])); if(dot3(n,sub(mean(f.map(i=>vs[i])),c))<0) n=sc(-1,n); return dot3(n,W.V)>1e-9; });
  const E=new Map();
  fs.forEach((f,k)=>f.forEach((a,j)=>{ const b=f[(j+1)%f.length], key=Math.min(a,b)+'-'+Math.max(a,b); if(!E.has(key)) E.set(key,{a,b,v:false}); if(vis[k]) E.get(key).v=true; }));
  const ec=o.hl===2?'var(--spark)':'var(--ink)', ew=o.hl===2?4:2.2;
  E.forEach(e=>{ if(!e.v) W.seg(vs[e.a],vs[e.b],{c:o.hl===2?'var(--spark)':'var(--muted)',w:o.hl===2?2.5:1.5,dash:1}); });
  fs.forEach((f,k)=>{ if(vis[k]) W.poly(f.map(i=>vs[i]),{fill:o.hl===1?COL[k%COL.length]:(o.fc&&o.fc[k])||col,fo:o.hl===1?.45:(o.fo??.18),c:null}); });
  E.forEach(e=>{ if(e.v) W.seg(vs[e.a],vs[e.b],{c:ec,w:ew}); });
  if(o.hl===3) vs.forEach((p,i)=>{ const seen=fs.some((f,k)=>vis[k]&&f.includes(i)); W.dot(p,{r:seen?6:4,c:seen?'var(--spark)':'var(--muted)'}); });
  return vis; }
// cylindre d’axe vertical
function cylW(W,r,h,o={}){ const N=64, z0=o.z0??-h/2, z1=z0+h, t1=W.az-PI/2, P3=(t,z)=>[r*Math.cos(t),r*Math.sin(t),z];
  const arc=(a,b,z)=>Array.from({length:N+1},(_,i)=>P3(a+(b-a)*i/N,z));
  const front=arc(t1,t1+PI,z0), ec=o.hl===2?'var(--spark)':'var(--ink)', ew=o.hl===2?4:2.2;
  W.poly(arc(t1+PI,t1+2*PI,z0),{open:1,c:o.hl===2?'var(--spark)':'var(--muted)',w:1.5,dash:1});
  W.poly([...front,...arc(t1+PI,t1,z1)],{fill:o.hl===1?COL[1]:(o.c||'var(--accent)'),fo:o.hl===1?.4:(o.fo??.18),c:null});
  W.poly(arc(0,2*PI,z1),{fill:o.hl===1?COL[2]:(o.ct||o.c||'var(--accent)'),fo:o.hl===1?.5:(o.fo??.18)+.12,c:null});
  W.poly(arc(0,2*PI,z1),{open:1,c:ec,w:ew}).poly(front,{open:1,c:ec,w:ew});
  W.seg(P3(t1,z0),P3(t1,z1),{c:'var(--ink)',w:2.2}).seg(P3(t1+PI,z0),P3(t1+PI,z1),{c:'var(--ink)',w:2.2});
}
// développement qui se replie : faces = [{p:[[x,y]…] (sens direct), par:indice du parent ou −1, a:angle de pliage en degrés}]
function foldNet(faces,t){
  const H=faces.map(f=>{ if(f.par<0) return null; const q=faces[f.par].p;
    const sh=f.p.filter(a=>q.some(b=>Math.hypot(a[0]-b[0],a[1]-b[1])<1e-6));
    const A=[sh[0][0],sh[0][1],0], B=[sh[1][0],sh[1][1],0], c=mean(f.p.map(p=>[p[0],p[1],0])), d=sub(c,A);
    let u=nrm(sub(B,A)); if(u[0]*d[1]-u[1]*d[0]<0) u=sc(-1,u); return {A,u,th:rad(f.a)*t}; });
  const rot=(p,h)=>{ const d=sub(p,h.A), c=Math.cos(h.th), s=Math.sin(h.th); return add(h.A,add(add(sc(c,d),sc(s,cross(h.u,d))),sc(dot3(h.u,d)*(1-c),h.u))); };
  return faces.map((f,i)=>f.p.map(p=>{ let q=[p[0],p[1],0], k=i; while(faces[k].par>=0){ q=rot(q,H[k]); k=faces[k].par; } return q; }));
}
function drawFold(W,faces,t,o={}){ const ps=foldNet(faces,t).map(f=>f.map(p=>add(p,o.off||[0,0,0])));
  const order=ps.map((p,i)=>i).sort((a,b)=>W.depth(mean(ps[a]))-W.depth(mean(ps[b])));
  order.forEach(i=>W.poly(ps[i],{fill:faces[i].c||COL[i%COL.length],fo:o.fo??.8,c:'var(--ink)',w:1.6}));
  if(o.lab) order.forEach(i=>{ const f=ps[i], n=sc(-1,cross(sub(f[1],f[0]),sub(f[2],f[0]))); if(t<.6||dot3(n,W.V)>0) W.text(mean(f),String(i+1),{a:'middle',dy:5,s:13}); });
  return ps; }
// développement du cube à partir de cases [colonne, ligne] ; arbre de pliage en largeur depuis la case root
function cubeNet(cells,root=0,s=1){ const key=c=>c.join(','), idx=new Map(cells.map((c,i)=>[key(c),i])), par=Array(cells.length).fill(null); par[root]=-1;
  const q=[root]; while(q.length){ const i=q.shift(), [c,r]=cells[i]; [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dc,dr])=>{ const j=idx.get(key([c+dc,r+dr])); if(j!==undefined&&par[j]===null){ par[j]=i; q.push(j); } }); }
  const [c0,r0]=cells[root];
  return cells.map(([c,r],i)=>{ const x=(c-c0-.5)*s, y=(r-r0-.5)*s; return {p:[[x,y],[x+s,y],[x+s,y+s],[x,y+s]],par:par[i],a:90}; }); }
const ccw=ps=>{ let A=0; ps.forEach((p,i)=>{ const q=ps[(i+1)%ps.length]; A+=p[0]*q[1]-q[0]*p[1]; }); return A<0?ps.slice().reverse():ps; };
const R=(x0,y0,x1,y1)=>[[x0,y0],[x1,y0],[x1,y1],[x0,y1]];
// trois développements de prismes : pavé, prisme triangulaire, prisme hexagonal
const NETS_P=[
  (()=>{ const a=2,b=1.4,c=1; return [{p:R(-a/2,-b/2,a/2,b/2),par:-1,a:0},{p:R(-a/2,-b/2-c,a/2,-b/2),par:0,a:90},{p:R(-a/2,b/2,a/2,b/2+c),par:0,a:90},{p:R(-a/2-c,-b/2,-a/2,b/2),par:0,a:90},{p:R(a/2,-b/2,a/2+c,b/2),par:0,a:90},{p:R(-a/2,b/2+c,a/2,b/2+c+b),par:2,a:90}]; })(),
  (()=>{ const c=1.3,L=2.4,t=c*Math.sqrt(3)/2; return [{p:R(-c/2,-L/2,c/2,L/2),par:-1,a:0},{p:R(c/2,-L/2,3*c/2,L/2),par:0,a:120},{p:R(-3*c/2,-L/2,-c/2,L/2),par:0,a:120},
    {p:ccw([[-c/2,L/2],[c/2,L/2],[0,L/2+t]]),par:0,a:90,c:'var(--spark)'},{p:ccw([[-c/2,-L/2],[c/2,-L/2],[0,-L/2-t]]),par:0,a:90,c:'var(--spark)'}]; })(),
  (()=>{ const c=.75,L=2,t=c*Math.sqrt(3)/2, hx=y=>s=>ccw([[-c/2,y],[c/2,y],[c,y+s*t],[c/2,y+2*s*t],[-c/2,y+2*s*t],[-c,y+s*t]]);
    return [{p:R(-c/2,-L/2,c/2,L/2),par:-1,a:0},{p:R(c/2,-L/2,3*c/2,L/2),par:0,a:60},{p:R(3*c/2,-L/2,5*c/2,L/2),par:1,a:60},{p:R(5*c/2,-L/2,7*c/2,L/2),par:2,a:60},
      {p:R(-3*c/2,-L/2,-c/2,L/2),par:0,a:60},{p:R(-5*c/2,-L/2,-3*c/2,L/2),par:4,a:60},{p:hx(L/2)(1),par:0,a:90,c:'var(--spark)'},{p:hx(-L/2)(-1),par:0,a:90,c:'var(--spark)'}]; })()];
NETS_P.forEach(n=>n.forEach((f,i)=>{ if(!f.c) f.c=i===0?'var(--math)':'var(--accent)'; }));
// quatre patrons du cube (le 4e n’en est pas un)
const CUBE_NETS=[[[[1,0],[0,1],[1,1],[2,1],[1,2],[1,3]],2],[[[0,1],[1,1],[2,1],[3,1],[1,2],[3,0]],1],[[[0,0],[1,0],[2,0],[2,1],[3,1],[4,1]],2],[[[0,0],[1,0],[2,0],[3,0],[4,0],[1,1]],1]].map(([c,r])=>cubeNet(c,r,1.1));
// cylindre qui s’enroule : rectangle de longueur 2πr, deux disques
function rollCyl(r,h,t){ const L=2*PI*r, N=40, items=[];
  const pt=(s,z)=>{ if(t<1e-6) return [0,s,z]; const Rr=L/(2*PI*t), al=s/Rr; return [-Rr*(1-Math.cos(al)),Rr*Math.sin(al),z]; };
  for(let i=0;i<N;i++){ const s0=-L/2+L*i/N, s1=-L/2+L*(i+1)/N, sm=(s0+s1)/2, al=t<1e-6?0:sm/(L/(2*PI*t));
    items.push({k:'s',ps:[pt(s0,-h/2),pt(s1,-h/2),pt(s1,h/2),pt(s0,h/2)],n:[Math.cos(al),Math.sin(al),0],i}); }
  const th=rad(90*t);
  [1,-1].forEach(sg=>{ const A=[0,0,sg*h/2], e2=[-Math.sin(th),0,sg*Math.cos(th)], C=add(A,sc(r,e2));
    items.push({k:'d',ps:Array.from({length:48},(_,j)=>{ const b=2*PI*j/48; return add(C,add(sc(r*Math.cos(b),[0,1,0]),sc(r*Math.sin(b),e2))); })}); });
  return items; }
function drawRoll(W,r,h,t){ const it=rollCyl(r,h,t); it.sort((a,b)=>W.depth(mean(a.ps))-W.depth(mean(b.ps)));
  it.forEach(o=>{ if(o.k==='d') W.poly(o.ps,{fill:'var(--spark)',fo:.85,c:'var(--ink)',w:1.6});
    else { const f=dot3(o.n,W.V)>0; W.poly(o.ps,{fill:f?'var(--accent-soft)':'var(--line)',fo:1,c:f?'var(--accent-soft)':'var(--line)',w:1}); W.seg(o.ps[0],o.ps[1],{c:'var(--ink)',w:1.6}).seg(o.ps[2],o.ps[3],{c:'var(--ink)',w:1.6});
      if(o.i===0) W.seg(o.ps[0],o.ps[3],{c:'var(--ink)',w:1.6}); if(o.i===39) W.seg(o.ps[1],o.ps[2],{c:'var(--ink)',w:1.6}); } }); }
// perspective cavalière dans un plan : face avant a × b en vraie grandeur, profondeur d, angle al, coefficient k
function cavBox(P,a,b,d,o={}){ const al=rad(o.al??45), k=o.k??.5, x0=o.x0||0, y0=o.y0||0, dx=k*d*Math.cos(al), dy=k*d*Math.sin(al);
  const F=[[x0,y0],[x0+a,y0],[x0+a,y0+b],[x0,y0+b]], B=F.map(([x,y])=>[x+dx,y+dy]), ink={c:'var(--ink)',w:2.2}, hid={c:'var(--muted)',w:1.5,dash:1};
  P.seg(B[0][0],B[0][1],B[1][0],B[1][1],hid).seg(B[0][0],B[0][1],B[3][0],B[3][1],hid).seg(F[0][0],F[0][1],B[0][0],B[0][1],hid);
  P.poly([F[1],B[1],B[2],F[2]],{fill:o.c||'var(--accent)',fo:.1,c:null}).poly([F[3],F[2],B[2],B[3]],{fill:o.c||'var(--accent)',fo:.2,c:null});
  P.poly(F,{fill:o.c||'var(--accent)',fo:.3,c:'var(--ink)',w:2.2});
  P.seg(F[1][0],F[1][1],B[1][0],B[1][1],o.fy?{c:'var(--spark)',w:3.5}:ink).seg(F[2][0],F[2][1],B[2][0],B[2][1],o.fy?{c:'var(--spark)',w:3.5}:ink).seg(F[3][0],F[3][1],B[3][0],B[3][1],o.fy?{c:'var(--spark)',w:3.5}:ink);
  P.seg(B[1][0],B[1][1],B[2][0],B[2][1],ink).seg(B[2][0],B[2][1],B[3][0],B[3][1],ink);
  return {F,B,dx,dy}; }
// petit tableau HTML
const tab=rows=>`<table style="border-collapse:collapse;margin:6px auto;font-size:.95em">${rows.map((r,i)=>`<tr>${r.map(c=>`<${i?'td':'th'} style="border:1px solid var(--line);padding:4px 9px;text-align:center">${c}</${i?'td':'th'}>`).join('')}</tr>`).join('')}</table>`;
// patrons du cube à plat (pour les questions)
function netsFig(list){ const cols=list.length>2?2:list.length, rows=Math.ceil(list.length/cols), cw=6, ch=4.4;
  const P=plane({x:[0,cols*cw],y:[0,rows*ch],grid:false,axes:false});
  list.forEach((cells,k)=>{ const ox=(k%cols)*cw+.5, oy=(rows-1-Math.floor(k/cols))*ch+.5;
    cells.forEach(([c,r])=>P.rect(ox+c*.9,oy+r*.9,.9,.9,{fill:'var(--accent)',fo:.25,c:'var(--ink)',w:1.6}));
    P.text(ox-.2,oy+3.5,String.fromCharCode(65+k),{s:15}); });
  return P.svg(); }

/* ---------- solides pour la première étape ---------- */
const SOL=[
  {n:'Cube',S:prismB(rectB(1.8,1.8),1.8),c:'6 faces carrées, 12 arêtes, 8 sommets.'},
  {n:'Pavé (parallélépipède rectangle)',S:prismB(rectB(2.6,1.5),1.3),c:'6 faces rectangulaires, 12 arêtes, 8 sommets.'},
  {n:'Prisme droit à base triangulaire',S:prismB(ngon(3,1.15,PI/2),2),c:'5 faces (2 triangles et 3 rectangles), 9 arêtes, 6 sommets.'},
  {n:'Pyramide à base carrée',S:pyrB(ngon(4,1.4,PI/4),2.4),c:'5 faces (1 carré et 4 triangles), 8 arêtes, 5 sommets.'},
  {n:'Cylindre',S:null,c:'pas un polyèdre : 2 disques plats et une surface courbe, 2 bords circulaires, aucun sommet.'}];
const R_ROLL=(()=>{ const sets=[]; [2,2.5,3,3.5,4].forEach(r=>[0,.25,.5,.75,1].forEach(t=>rollCyl(r*.22,6*.22,t).forEach(o=>sets.push(o.ps)))); return fit(sets,30,20,.25); })();
const R_CUBE=CUBE_NETS.map(n=>fit([0,.3,.6,1].flatMap(t=>foldNet(n,t)),30,35,.3));
const R_PRISM=(()=>{ const sets=[]; NETS_P.forEach(n=>[0,.3,.6,1].forEach(t=>sets.push(...foldNet(n,t)))); return fit(sets,30,32,.3); })();

/* ---------- helpers du chapitre sur les volumes ---------- */
// prisme couché vu de côté : profil dans le plan (y, z), longueur le long de x
function sidePrism(prof,L){ const n=prof.length, vs=[...prof.map(([y,z])=>[L/2,y,z]),...prof.map(([y,z])=>[-L/2,y,z])];
  const fs=[[...Array(n).keys()],[...Array(n).keys()].map(i=>i+n)]; for(let i=0;i<n;i++) fs.push([i,(i+1)%n,(i+1)%n+n,i+n]); return {vs,fs}; }
// prisme droit empilé en couches de 1 cm (base en cm, échelle s)
const BASES=[{n:'rectangle 4 cm × 3 cm',A:12,p:[[0,0],[4,0],[4,3],[0,3]]},{n:'triangle rectangle de côtés 4 cm et 3 cm',A:6,p:[[0,0],[4,0],[0,3]]},{n:'trapèze de bases 4 cm et 2 cm, hauteur 3 cm',A:9,p:[[0,0],[4,0],[3,3],[1,3]]}];
function layers(W,b,h,s=.45){ const base=BASES[b].p.map(([x,y])=>[(y-1.5)*s,(x-2)*s]), n=base.length, S=prismB(base,h*s,0);
  const vis=polyh(W,S,{fc:['var(--spark)','var(--spark)'],fo:.22});
  for(let k=1;k<h;k++) for(let i=0;i<n;i++) if(vis[2+i]){ const a=base[i], c=base[(i+1)%n]; W.seg([a[0],a[1],k*s],[c[0],c[1],k*s],{c:'var(--accent)',w:1.4}); } }
const R_LAY=(()=>{ const sets=[]; BASES.forEach(B=>{ const base=B.p.map(([x,y])=>[(y-1.5)*.45,(x-2)*.45]); sets.push(prismB(base,6*.45,0).vs); }); return fit(sets,30,24,.3); })();
// boîte (pavé) posée au sol, dimensions a (x), b (y), c (z)
const boxAt=(a,b,c,z0=0)=>prismB(rectB(a,b),c,z0);
// aquarium avec de l’eau jusqu’à la hauteur hw (mêmes unités)
function aquarium(W,a,b,c,hw){ if(hw>0) polyh(W,boxAt(a,b,hw),{c:'var(--math)',fo:.35}); polyh(W,boxAt(a,b,c),{c:'var(--muted)',fo:.04}); }
// cube de 1 dm rempli de couches de 100 cm³
function dmCube(W,n){ const s=.2, L=10*s;
  if(n>0){ const B=boxAt(L,L,n*s,0); polyh(W,B,{c:'var(--math)',fo:.35});
    for(let i=1;i<10;i++){ const u=-L/2+i*s; W.seg([u,-L/2,n*s],[u,L/2,n*s],{c:'var(--math)',w:.8}).seg([-L/2,u,n*s],[L/2,u,n*s],{c:'var(--math)',w:.8}); } }
  polyh(W,boxAt(L,L,L,0),{c:'var(--muted)',fo:.03}); }
const R_AQ=fit([boxAt(1.25,3,2.5).vs],30,22,.3), R_DM=fit([boxAt(2,2,2,0).vs],30,26,.3);

COURS.push(
/* ===================== SOLIDES ET DÉVELOPPEMENTS ===================== */
{subj:'sec', sem:'a10', id:'sec10-solides', o:6, h:'Solides et développements', p:'Reconnaître les solides, compter leurs faces, arêtes et sommets, les déplier en développements (cube, pavé, prisme, cylindre) et les dessiner en perspective cavalière.', steps:[
 {kind:'Théorie',h:'Les solides autour de toi',p:`<p>Un dé, une brique de jus, une tente, une canette, une pyramide d’Égypte : ces objets ne sont pas plats, ils occupent de la place dans l’espace. En maths, on les appelle des <b>solides</b>. Tu en connais déjà plusieurs : faisons le tour.</p>
<div class="def"><p>Un <b>polyèdre</b> est un solide limité uniquement par des polygones plats : ce sont ses <b>faces</b>. Deux faces voisines se touchent le long d’un segment, une <b>arête</b>. Les arêtes se rejoignent en des points, les <b>sommets</b>.</p></div>
<div class="ex"><p><b>Cube</b> : 6 faces carrées, comme un dé. <b>Pavé</b> (on dit aussi parallélépipède rectangle) : 6 faces rectangulaires, comme une boîte à chaussures. <b>Prisme droit</b> : deux faces identiques et parallèles, les <b>bases</b>, reliées par des rectangles. <b>Pyramide</b> : une base polygonale et des triangles qui montent tous vers un même sommet. Le <b>cylindre</b> a deux disques et une surface courbe : il roule, ce n’est <b>pas</b> un polyèdre.</p></div>
<div class="idea"><p>Fais tourner chaque solide avec le curseur. Les arêtes en pointillés sont cachées derrière : on les dessine quand même, pour comprendre tout le solide. Le curseur « Montrer » colore les faces, puis les arêtes, puis les sommets.</p></div>
<div class="warn"><p>Le cube est un pavé particulier (toutes ses arêtes ont la même longueur), et le pavé est un prisme droit particulier (sa base est un rectangle).</p></div>`,
  params:[{id:'s',l:'Solide (0 cube, 1 pavé, 2 prisme, 3 pyramide, 4 cylindre)',min:0,max:4,v:2},{id:'a',l:'Rotation',min:0,max:350,step:10,v:30,u:'°'},{id:'m',l:'Montrer (0 rien, 1 faces, 2 arêtes, 3 sommets)',min:0,max:3,v:0}],
  draw:v=>{ const W=view({az:v.a,el:22,x:[-2.4,2.4],y:[-1.9,1.9]}), s=SOL[v.s]; if(s.S) polyh(W,s.S,{hl:v.m}); else cylW(W,1.05,2,{hl:v.m}); return W.svg(); },
  info:v=>`<b>${SOL[v.s].n}</b> : ${SOL[v.s].c}`,
  note:'Une boule (un ballon, une bille) n’est pas non plus un polyèdre : elle n’a aucune face plate.'},
 {kind:'Méthode',h:'Compter faces, arêtes et sommets',p:`<p>Compter les arêtes à l’œil, c’est facile de se tromper : on en oublie une derrière, on en compte une deux fois. Pour un prisme ou une pyramide, tout se déduit de la base. Si la base a <i>n</i> côtés :</p>
<ul><li><b>Prisme droit</b> : <i>n</i> + 2 faces (2 bases et <i>n</i> rectangles), 3<i>n</i> arêtes (<i>n</i> en bas, <i>n</i> en haut, <i>n</i> verticales), 2<i>n</i> sommets (<i>n</i> en bas, <i>n</i> en haut).</li>
<li><b>Pyramide</b> : <i>n</i> + 1 faces (la base et <i>n</i> triangles), 2<i>n</i> arêtes (<i>n</i> autour de la base, <i>n</i> qui montent), <i>n</i> + 1 sommets (ceux de la base et celui du haut).</li></ul>
<p>Pour un polyèdre quelconque, une astuce : additionne les côtés de toutes les faces. Chaque arête borde exactement <b>deux</b> faces, elle est donc comptée deux fois : divise le total par 2. Pour finir, contrôle avec la relation d’Euler : <b>sommets − arêtes + faces = 2</b>.</p>
<div class="blk" data-t="Le savais-tu ?"><p>En 1750, le mathématicien suisse Leonhard Euler, né à Bâle, remarque que pour tous les polyèdres « sans trou », sommets − arêtes + faces vaut toujours 2. Cube : 8 − 12 + 6 = 2. Pyramide à base carrée : 5 − 8 + 5 = 2. Essaie avec d’autres !</p></div>`,
  fig:(()=>{ const W=view({az:25,el:24,x:[-2,2],y:[-1.5,1.5]}); polyh(W,prismB(ngon(6,1.2),1.6),{fc:['var(--spark)','var(--spark)']}); return W.svg(); })(),
  demo:{enonce:'Compter les faces, les arêtes et les sommets d’un prisme droit à base hexagonale (6 côtés), puis contrôler le résultat.',
   etapes:[
    {f:'La base a <i>n</i> = 6 côtés.',w:'On commence toujours par la base : tout en découle.'},
    {f:'Faces : 6 + 2 = 8',w:'Deux bases hexagonales, plus un rectangle par côté de la base.'},
    {f:'Arêtes : 3 × 6 = 18',w:'6 arêtes autour de la base du bas, 6 autour de celle du haut, 6 verticales.'},
    {f:'Sommets : 2 × 6 = 12',w:'6 sommets en bas, 6 en haut.'},
    {f:'Contrôle par les faces : 2 × 6 + 6 × 4 = 36 côtés, et 36 : 2 = 18 arêtes',w:'Deux hexagones de 6 côtés et six rectangles de 4 côtés. Chaque arête est comptée deux fois.'},
    {f:'Euler : 12 − 18 + 8 = 2',w:'On trouve bien 2 : le compte est cohérent.'}],
   conclusion:'Le prisme hexagonal a 8 faces, 18 arêtes et 12 sommets.'}},
 {kind:'Défi',h:'Le ballon de foot',p:'Le ballon de foot classique est un polyèdre gonflé. Il est cousu à partir de <b>12 pentagones</b> (5 côtés) et de <b>20 hexagones</b> (6 côtés). Chaque couture est une arête, partagée par deux pièces voisines. Combien d’arêtes (de coutures) le ballon a-t-il ?',
  fig:(()=>{ const P=plane({x:[-2.2,4.8],y:[-2,2.2],grid:false,axes:false}); const fromEdge=(A,B,n)=>{ const ps=[A,B]; let d=[B[0]-A[0],B[1]-A[1]];
     for(let i=2;i<n;i++){ const a=2*PI/n, nd=[d[0]*Math.cos(a)-d[1]*Math.sin(a),d[0]*Math.sin(a)+d[1]*Math.cos(a)]; const L=ps[ps.length-1]; ps.push([L[0]+nd[0],L[1]+nd[1]]); d=nd; } return ps; };
    P.poly(fromEdge([1.2,0],[0,0],5),{fill:'var(--ink)',fo:.2,c:'var(--ink)',w:2}).poly(fromEdge([0,0],[1.2,0],6),{fill:'var(--accent)',fo:.15,c:'var(--ink)',w:2});
    P.seg(0,0,1.2,0,{c:'var(--spark)',w:5}).text(1.4,-.1,'une couture = une arête',{s:12}).text(.6,1.1,'hexagone',{a:'middle',s:12}).text(.6,-1,'pentagone',{a:'middle',s:12});
    return P.svg(); })(),
  lab:'arêtes =',ans:90,why:'Ici, compter autrement marche bien. On compte tous les côtés des pièces : 12 × 5 + 20 × 6 = 60 + 120 = 180. Chaque arête est comptée deux fois (une par pièce voisine) : 180 : 2 = 90 arêtes. Bonus : 3 pièces se touchent à chaque sommet, donc 180 : 3 = 60 sommets, et Euler donne bien 60 − 90 + 32 = 2.'},
 {kind:'Théorie',h:'Déplier un cube : le développement',p:`<p>Pour fabriquer un dé en carton, tu découpes une forme plate, puis tu la plies et tu la colles. Cette forme plate a un nom.</p>
<div class="def"><p>Le <b>développement</b> (on dit aussi le <b>patron</b>) d’un polyèdre est une figure plane, d’un seul morceau, formée de toutes ses faces, qui se replie exactement en ce solide, sans trou ni superposition. Le développement d’un cube est fait de 6 carrés identiques reliés par leurs côtés.</p></div>
<div class="idea"><p>Choisis un patron et monte le curseur « Pliage » : chaque carré tourne autour du côté qu’il partage avec son voisin, comme une charnière de porte. Le n° 1 est la croix classique. Le n° 4 a aussi 6 carrés, mais il échoue : deux faces arrivent au même endroit et il reste un trou.</p></div>
<div class="ex"><p>Dans la croix, le carré du centre devient le fond. Les quatre carrés qui l’entourent se relèvent en murs. Le dernier, accroché à un mur, se rabat en couvercle. Six carrés, six faces : le cube est fermé.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Il existe exactement <b>11</b> développements différents du cube, si on ne compte pas comme nouveaux ceux qu’on obtient en tournant ou en retournant la feuille. Cherche-les sur du papier quadrillé : c’est un bon défi !</p></div>`,
  params:[{id:'n',l:'Patron n°',min:1,max:4,v:1},{id:'t',l:'Pliage',min:0,max:100,step:5,v:40,u:' %'}],
  draw:v=>{ const W=view(Object.assign({az:30,el:35},R_CUBE[v.n-1])); drawFold(W,CUBE_NETS[v.n-1],v.t/100,{lab:1}); return W.svg(); },
  info:v=>v.n===4?(v.t===100?'Les faces 1 et 5 se superposent et le dessus reste ouvert : <b>ce n’est pas un développement du cube</b>.':'Une rangée de 5 carrés… regarde bien ce qui arrive à la fin du pliage.'):(v.t===100?'Le cube est fermé : c’est bien un développement du cube.':`Pliage à ${v.t} % : chaque carré tourne de ${fmt(.9*v.t,1)}° autour de sa charnière.`)},
 {kind:'Méthode',h:'Reconnaître un développement du cube',p:`<p>Avant de découper, mieux vaut savoir si ta forme va se refermer. On élimine d’abord les cas impossibles, puis on replie dans sa tête.</p>
<ol><li>Il faut <b>exactement 6 carrés</b> reliés par leurs côtés.</li>
<li><b>Jamais 4 carrés en bloc 2 × 2</b> : ils se touchent en un même point, alors qu’un sommet du cube ne touche que 3 faces.</li>
<li><b>Jamais 5 carrés alignés</b> : une ceinture autour du cube ne compte que 4 faces, la 5e retomberait sur la 1re.</li>
<li>Dans une rangée, deux carrés séparés par <b>un seul</b> carré sont <b>opposés</b> (comme le fond et le couvercle). Chaque face doit avoir exactement une face opposée.</li>
<li>Pour finir, choisis un carré comme fond et nomme les autres en repliant : devant, derrière, gauche, droite, couvercle. Si deux carrés reçoivent le même nom, ce n’est pas un développement.</li></ol>`,
  fig:netsFig([[[0,1],[1,1],[2,1],[3,1],[1,2],[3,0]],[[0,0],[1,0],[2,0],[3,0],[1,1],[3,1]]]),
  demo:{enonce:'Les patrons A et B ci-dessus se replient-ils en cube ? Tous les deux ont une rangée de 4 carrés et deux carrés en plus.',
   etapes:[
    {f:'A et B ont 6 carrés, sans bloc 2 × 2 et sans rangée de 5.',w:'Les tests rapides ne les éliminent pas : il faut regarder de plus près.'},
    {f:'La rangée de 4 s’enroule en ceinture : devant, droite, derrière, gauche.',w:'Quatre carrés alignés font le tour du cube, le premier vient toucher le dernier.'},
    {f:'A : un carré est au-dessus de la rangée, l’autre au-dessous. L’un ferme le haut, l’autre le bas.',w:'Ils sont de part et d’autre de la ceinture : chacun bouche un trou différent.'},
    {f:'B : les deux carrés sont du même côté de la rangée. Ils se rabattent tous les deux sur le haut.',w:'Ils se superposent, et le bas reste ouvert.'}],
   conclusion:'A est un développement du cube, B n’en est pas un.'},
  note:'Règle rapide à retenir pour une rangée de 4 : les deux carrés restants doivent être de part et d’autre de la rangée, un de chaque côté.'},
 {h:'Lequel se replie ?',p:'Parmi ces quatre figures de 6 carrés, laquelle est un développement du cube ?',
  fig:netsFig([[[0,0],[1,0],[2,0],[3,0],[4,0],[1,1]],[[0,1],[1,1],[2,1],[0,0],[2,0],[1,2]],[[0,0],[1,0],[2,0],[2,1],[3,1],[4,1]],[[0,0],[1,0],[0,1],[1,1],[2,1],[3,1]]]),
  opts:['A','B','C','D'],ans:2,why:'A a 5 carrés alignés et D contient un bloc 2 × 2 : éliminés. Dans B, les deux carrés du bas se rabattent sous la même face : ils se superposent. C (deux rangées de 3 en escalier) se replie : chaque face a exactement une face opposée.'},
 {kind:'Théorie',h:'Développements du pavé et du prisme droit',p:`<p>Une boîte à chaussures, une boîte de chocolat en forme de prisme, une tente : on les fabrique aussi à partir d’une forme plate. Quelles pièces faut-il découper ?</p>
<div class="def"><p>Le développement d’un <b>pavé</b> est formé de 6 rectangles, égaux deux à deux (les faces opposées sont identiques). Le développement d’un <b>prisme droit</b> comprend ses 2 bases (deux polygones identiques) et un rectangle par côté de la base ; tous ces rectangles ont pour largeur la <b>hauteur du prisme</b>.</p></div>
<div class="idea"><p>Posés côte à côte, les rectangles des côtés forment un grand rectangle. Sa hauteur est celle du prisme, et sa longueur est le <b>périmètre de la base</b>. C’est logique : en se repliant, cette bande fait exactement le tour de la base. Monte le curseur « Pliage » pour voir la bande s’enrouler autour des bases (en jaune).</p></div>
<div class="ex"><p>Prisme de hauteur 10 cm dont la base est un triangle de côtés 3 cm, 4 cm et 5 cm : la bande mesure (3 + 4 + 5) cm × 10 cm, soit 12 cm × 10 cm, découpée en rectangles de 3 cm, 4 cm et 5 cm de large.</p></div>
<div class="warn"><p>La <b>hauteur d’un prisme</b> est la distance entre ses deux bases, même quand il est couché, comme une tente ou une barre de chocolat triangulaire. Ce n’est pas forcément la mesure « vers le haut ».</p></div>`,
  params:[{id:'k',l:'Solide (0 pavé, 1 prisme triangulaire, 2 prisme hexagonal)',min:0,max:2,v:1},{id:'t',l:'Pliage',min:0,max:100,step:5,v:30,u:' %'}],
  draw:v=>{ const W=view(Object.assign({az:30,el:32},R_PRISM)); drawFold(W,NETS_P[v.k],v.t/100,{fo:.75}); return W.svg(); },
  info:v=>['Pavé : 6 rectangles, égaux deux à deux.','Prisme triangulaire : 2 triangles et une bande de 3 rectangles.','Prisme hexagonal : 2 hexagones et une bande de 6 rectangles.'][v.k]+(v.t===100?' Le solide est fermé.':'')},
 {kind:'Méthode',h:'Trouver les dimensions d’un développement de prisme',p:`<p>Avant de dessiner ou de découper un développement, il faut connaître la taille de chaque pièce. Voici comment faire :</p>
<ol><li>Repère les deux <b>bases</b> (les faces identiques et parallèles) et la <b>hauteur</b> du prisme (la distance entre elles).</li>
<li>Dessine les deux bases en vraie grandeur.</li>
<li>Pour chaque côté de la base, dessine un rectangle : sa longueur est ce côté, sa largeur est la hauteur du prisme.</li>
<li>Contrôle : collés en bande, ces rectangles mesurent <b>périmètre de la base × hauteur</b>.</li>
<li>Accroche chaque base à un rectangle par un côté de même longueur.</li></ol>
<p>Pour un pavé de dimensions <i>L</i>, <i>l</i> et <i>h</i>, c’est encore plus simple : 2 rectangles <i>L</i> × <i>l</i>, 2 rectangles <i>L</i> × <i>h</i> et 2 rectangles <i>l</i> × <i>h</i>.</p>`,
  fig:(()=>{ const P=plane({x:[-1,14],y:[-4.8,9.6],grid:false,axes:false});
    [[0,3],[3,4],[7,5]].forEach(([x,w],i)=>{ P.rect(x,0,w,6,{fill:'var(--accent)',fo:.2,c:'var(--ink)',w:2}); P.text(x+w/2,-.1,`${w} cm`,{a:'middle',dy:14,s:12}); });
    P.poly([[3,6],[7,6],[3,9]],{fill:'var(--spark)',fo:.4,c:'var(--ink)',w:2}).poly([[3,0],[7,0],[3,-3]],{fill:'var(--spark)',fo:.4,c:'var(--ink)',w:2});
    P.text(12.2,3,'6 cm',{s:12}).text(6.5,-4.3,'longueur 3 + 4 + 5 = 12 cm',{a:'middle',s:12}); return P.svg(); })(),
  demo:{enonce:'Donner les pièces du développement d’un pavé de 5 cm × 3 cm × 2 cm, puis celles d’un prisme droit de hauteur 6 cm dont la base est un triangle de côtés 3 cm, 4 cm et 5 cm.',
   etapes:[
    {f:'Pavé : 2 rectangles 5 × 3, 2 rectangles 5 × 2 et 2 rectangles 3 × 2 (en cm)',w:'Chaque paire de faces opposées utilise deux des trois dimensions.'},
    {f:'On place le fond 5 × 3 au centre, les quatre côtés autour, le couvercle accroché à un côté.',w:'C’est la disposition en croix : elle se replie à coup sûr.'},
    {f:'Prisme : les bases sont deux triangles de côtés 3, 4 et 5 cm.',w:'On les trace au compas à partir des trois longueurs.'},
    {f:'Faces des côtés : 3 × 6, 4 × 6 et 5 × 6, côte à côte : une bande de 12 cm × 6 cm',w:'Chaque côté de la base donne un rectangle de largeur 6 cm, et 3 + 4 + 5 = 12 cm est bien le périmètre de la base.'},
    {f:'Chaque triangle s’accroche à la bande par un côté de même longueur, ici le côté de 4 cm.',w:'Sur la figure, le côté de 4 cm des triangles se colle sur le bord du rectangle de 4 cm de large.'}],
   conclusion:'Le pavé se déplie en 6 rectangles égaux deux à deux ; le prisme en une bande de 12 cm × 6 cm et deux triangles.'}},
 {h:'La bande du prisme',p:'Un prisme droit de hauteur 8 cm a pour base un triangle isocèle de côtés 5 cm, 5 cm et 6 cm. Dans son développement, les trois rectangles des côtés forment une bande. Quelle est la longueur de cette bande ?',
  fig:(()=>{ const W=view({az:28,el:22,x:[-2,2],y:[-1.5,1.5]}); polyh(W,prismB([[-.75,-.6],[.75,-.6],[0,.6]].map(([x,y])=>[y,x]),1.6),{fc:['var(--spark)','var(--spark)']}); return W.svg(); })(),
  lab:'longueur =',unit:'cm',ans:16,why:'La longueur de la bande est le périmètre de la base : 5 + 5 + 6 = 16 cm. Sa largeur est la hauteur du prisme, 8 cm.'},
 {kind:'Théorie',h:'Le développement du cylindre',p:`<p>Décolle l’étiquette d’une boîte de conserve et pose-la à plat : c’est un rectangle ! Le cylindre n’est pas un polyèdre, mais il a quand même un développement.</p>
<div class="def"><p>Le développement d’un <b>cylindre</b> de rayon <i>r</i> et de hauteur <i>h</i> est formé de <b>deux disques</b> de rayon <i>r</i> et d’<b>un rectangle</b>. La largeur du rectangle est la hauteur <i>h</i>, sa longueur est le périmètre du disque : <b>2 × π × <i>r</i></b>.</p></div>
<div class="why"><p>En s’enroulant, le grand côté du rectangle fait exactement une fois le tour du disque du bas. Il doit donc avoir la même longueur que le cercle. Rappel : le périmètre d’un cercle vaut 2 × π × <i>r</i>, ou π × <i>d</i> avec le diamètre <i>d</i>, et π ≈ 3,14.</p></div>
<div class="ex"><p>Pour <i>r</i> = 3 cm et <i>h</i> = 5 cm : le rectangle mesure 2 × π × 3 ≈ 18,85 cm sur 5 cm, avec deux disques de 3 cm de rayon.</p></div>
<div class="idea"><p>Avec le curseur « Enroulement », le rectangle se courbe et les deux disques se rabattent. À 100 %, le bord du rectangle épouse exactement le bord des disques.</p></div>
<div class="warn"><p>La longueur du rectangle n’est ni le rayon ni le diamètre : elle fait le tour entier, environ 6,28 fois le rayon.</p></div>`,
  params:[{id:'r',l:'Rayon',min:2,max:4,step:.5,v:3,u:' cm'},{id:'t',l:'Enroulement',min:0,max:100,step:5,v:0,u:' %'}],
  draw:v=>{ const W=view(Object.assign({az:30,el:20},R_ROLL)); drawRoll(W,v.r*.22,6*.22,v.t/100); return W.svg(); },
  info:v=>`Hauteur 6 cm, rayon ${fmt(v.r)} cm : rectangle de 2 × π × ${fmt(v.r)} ≈ ${fmt(2*PI*v.r)} cm sur 6 cm.`},
 {kind:'Méthode',h:'Calculer les dimensions du développement d’un cylindre',p:`<p>On en a besoin pour une étiquette, un tube, une boîte ronde. Deux situations se présentent :</p>
<ul><li>On connaît le rayon <i>r</i> (ou le diamètre <i>d</i>) : la longueur du rectangle vaut <b>2 × π × <i>r</i></b> (ou π × <i>d</i>), sa largeur est la hauteur <i>h</i>, et on ajoute deux disques de rayon <i>r</i>.</li>
<li>On connaît la longueur <i>L</i> du rectangle qui fait le tour : le rayon est le nombre qui, multiplié par 2 × π, donne <i>L</i>. On calcule donc <b><i>r</i> = <i>L</i> : (2 × π)</b>.</li></ul>
<p>Utilise la touche π de la calculatrice et n’arrondis qu’à la fin. Termine par une phrase réponse avec l’unité.</p>`,
  demo:{enonce:'a) Une boîte de conserve a un rayon de 3 cm et une hauteur de 5 cm : quelles sont les dimensions de son développement ? b) Une affiche de 44 cm de long est enroulée en tube, bord contre bord : quel est le rayon du tube ?',
   etapes:[
    {f:'a) Longueur du rectangle : 2 × π × 3 = 6π ≈ 18,85 cm',w:'Il doit faire le tour du disque de rayon 3 cm.'},
    {f:'Largeur du rectangle : 5 cm, plus deux disques de rayon 3 cm',w:'La largeur est la hauteur de la boîte.'},
    {f:'b) 2 × π × <i>r</i> doit valoir 44 cm.',w:'Cette fois, on connaît le tour et on cherche le rayon.'},
    {f:'<i>r</i> = 44 : (2 × π) ≈ 7,0 cm',w:'On divise le tour par 2π. À la calculatrice : 44 ÷ (2 × π), avec les parenthèses.'}],
   conclusion:'a) Un rectangle d’environ 18,85 cm × 5 cm et deux disques de rayon 3 cm. b) Le tube a un rayon d’environ 7 cm.'}},
 {h:'L’étiquette de la boîte',p:'Une boîte de conserve a un diamètre de 8 cm et une hauteur de 11 cm. Son étiquette fait exactement le tour de la boîte. Quelle est la longueur de l’étiquette ? Arrondis au dixième.',
  fig:(()=>{ const W=view({az:30,el:20,x:[-1.8,1.8],y:[-1.4,1.4]}); cylW(W,.85,1.9,{c:'var(--other)'}); return W.svg(); })(),
  lab:'longueur ≈',unit:'cm',ans:25.1,tol:.051,why:'Le diamètre vaut 8 cm, donc le rayon 4 cm. Longueur = 2 × π × 4 = π × 8 ≈ 25,1 cm. La hauteur de 11 cm donne seulement la largeur de l’étiquette.'},
 {kind:'Théorie',h:'La perspective cavalière',p:`<p>Comment dessiner une boîte sur une feuille plate, de façon qu’on la reconnaisse et qu’on puisse même y lire des mesures ? On utilise une règle de dessin simple, la perspective cavalière.</p>
<div class="def"><p>En <b>perspective cavalière</b> :</p><ul><li>la face avant est dessinée en <b>vraie grandeur</b> ;</li><li>les arêtes qui partent vers l’arrière, les <b>fuyantes</b>, sont toutes parallèles, inclinées d’un même angle α (souvent 45°) ;</li><li>leur longueur est multipliée par un même <b>coefficient</b> <i>k</i> (souvent 0,5) ;</li><li>les arêtes cachées sont en <b>pointillés</b>.</li></ul></div>
<div class="idea"><p>C’est comme si tu regardais la boîte un peu d’en haut et un peu de côté : l’arrière paraît écrasé. Joue avec α et <i>k</i> : la face avant ne bouge pas, seules les fuyantes changent.</p></div>
<div class="ex"><p>Cube de 4 cm d’arête, α = 45° et <i>k</i> = 0,5 : la face avant est un carré de 4 cm, et chaque fuyante mesure 0,5 × 4 = 2 cm sur le dessin.</p></div>
<div class="warn"><p>Sur le dessin, les faces du dessus et du côté ne sont plus des carrés, et leurs angles ne sont plus droits. Ne mesure jamais une fuyante comme une vraie longueur : divise-la par <i>k</i>.</p></div>`,
  params:[{id:'al',l:'Angle α des fuyantes',min:15,max:75,step:15,v:45,u:'°'},{id:'k',l:'Coefficient k',min:.3,max:1,step:.1,v:.5}],
  draw:v=>{ const P=plane({x:[-.5,8.5],y:[-.5,7.5],grid:false,axes:false}); cavBox(P,4,4,4,{al:v.al,k:v.k,x0:.5,y0:.5,fy:1}); P.text(2.5,.5,'4 cm',{a:'middle',dy:16,s:12}); return P.svg(); },
  info:v=>`Cube de 4 cm : fuyantes de ${fmt(v.k,1)} × 4 = ${fmt(v.k*4,1)} cm, inclinées à ${v.al}°.`},
 {kind:'Méthode',h:'Dessiner un pavé en perspective cavalière',p:`<p>Quand on te demande de représenter un solide en perspective cavalière, avance toujours dans le même ordre : la face avant, les fuyantes, la face arrière, puis les pointillés. Prends la règle, l’équerre et le rapporteur (pour l’angle α).</p>
<p>La seule longueur à calculer est celle des fuyantes : <b>longueur dessinée = <i>k</i> × profondeur réelle</b>. Toutes les autres arêtes des faces avant et arrière gardent leur vraie longueur.</p>`,
  fig:(()=>{ const P=plane({x:[-.5,9],y:[-.8,6.2],grid:false,axes:false}); cavBox(P,6,4,4,{x0:.5,y0:.5,fy:1}); P.text(3.5,.5,'6 cm',{a:'middle',dy:16,s:12}).text(.5,2.5,'4 cm',{a:'end',dx:-6,s:12}).text(7.4,5,'2 cm',{s:12}); return P.svg(); })(),
  demo:{enonce:'Dessiner un pavé de 6 cm de large, 4 cm de haut et 4 cm de profondeur, avec α = 45° et <i>k</i> = 0,5.',
   etapes:[
    {f:'Face avant : un rectangle de 6 cm × 4 cm, en vraie grandeur.',w:'C’est la face qui est face à nous : on la dessine sans déformation.'},
    {f:'Longueur des fuyantes : 0,5 × 4 = 2 cm',w:'La profondeur réelle (4 cm) est multipliée par le coefficient <i>k</i>.'},
    {f:'Depuis les sommets de la face avant, des fuyantes de 2 cm inclinées à 45°.',w:'Toutes les fuyantes sont parallèles : même angle, même longueur.'},
    {f:'On relie les extrémités : la face arrière est un rectangle de 6 cm × 4 cm.',w:'La face arrière est parallèle à la face avant : elle aussi est en vraie grandeur.'},
    {f:'Les 3 arêtes qui partent du sommet arrière en bas à gauche sont en pointillés.',w:'Ce sommet est caché derrière le pavé quand les fuyantes montent vers la droite.'}],
   conclusion:'Le pavé est dessiné : 9 arêtes en traits pleins et 3 en pointillés.'}},
 {kind:'Pratique',h:'Règle les fuyantes',p:'Tu dessines un pavé en perspective cavalière : face avant de 4 cm × 3 cm, profondeur réelle de 5 cm, angle α = 45° et coefficient <i>k</i> = 0,6. Règle la longueur des fuyantes sur le dessin.',
  params:[{id:'f',l:'Longueur des fuyantes',min:.5,max:5,step:.5,v:5,u:' cm'}],
  draw:v=>{ const P=plane({x:[-.5,8.5],y:[-.6,7],grid:false,axes:false}); cavBox(P,4,3,v.f*2,{x0:.6,y0:.6,fy:1}); P.text(2.6,.6,'4 cm',{a:'middle',dy:16,s:12}).text(.6,2.1,'3 cm',{a:'end',dx:-6,s:12}); return P.svg(); },
  info:v=>`Fuyantes dessinées : ${fmt(v.f,1)} cm.`,
  ok:v=>Math.abs(v.f-3)<1e-9,why:'Longueur dessinée = <i>k</i> × profondeur réelle = 0,6 × 5 = 3 cm.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li>Un <b>polyèdre</b> n’a que des faces planes (polygones) : cube, pavé, prisme droit, pyramide. Le cylindre et la boule n’en sont pas.</li>
<li>Base à <i>n</i> côtés : <b>prisme</b> <i>n</i> + 2 faces, 3<i>n</i> arêtes, 2<i>n</i> sommets ; <b>pyramide</b> <i>n</i> + 1 faces, 2<i>n</i> arêtes, <i>n</i> + 1 sommets.</li>
<li>Arêtes = (somme des côtés de toutes les faces) : 2. Contrôle d’<b>Euler</b> : sommets − arêtes + faces = 2.</li>
<li><b>Développement</b> : figure plane d’un seul morceau qui se replie exactement en le solide. Cube : 6 carrés, jamais de bloc 2 × 2 ni 5 carrés alignés, chaque face a une seule face opposée (11 patrons possibles).</li>
<li><b>Pavé</b> : 6 rectangles égaux deux à deux. <b>Prisme droit</b> : 2 bases et une bande de longueur <b>périmètre de la base</b>, de largeur la hauteur du prisme.</li>
<li><b>Cylindre</b> : 2 disques de rayon <i>r</i> et un rectangle de <b>2 × π × <i>r</i></b> sur <i>h</i>. Inversement, <i>r</i> = <i>L</i> : (2π).</li>
<li><b>Perspective cavalière</b> : face avant en vraie grandeur, fuyantes parallèles inclinées de α, de longueur <i>k</i> × profondeur, arêtes cachées en pointillés.</li>
<li>Réponse d’un problème : une phrase, le calcul, le résultat avec l’unité.</li></ul></div>`},
 {kind:'Problème',h:'La boîte à chocolats triangulaire',p:'Pour un marché de Noël, tu fabriques des boîtes en forme de prisme droit. Leurs bases sont des triangles équilatéraux de 6 cm de côté, et chaque boîte mesure 20 cm de long. Tu veux découper le développement d’un seul morceau, posé droit sur une feuille A4 de 21 cm × 29,7 cm : les trois rectangles côte à côte, un triangle collé en haut et un autre en bas de la bande.',
  fig:(()=>{ const P=plane({x:[-1,19],y:[-6.5,26.5],grid:false,axes:false,w:200}), t=Math.sqrt(27);
    [0,6,12].forEach(x=>P.rect(x,0,6,20,{fill:'var(--accent)',fo:.2,c:'var(--ink)',w:2}));
    P.poly([[6,20],[12,20],[9,20+t]],{fill:'var(--spark)',fo:.4,c:'var(--ink)',w:2}).poly([[6,0],[12,0],[9,-t]],{fill:'var(--spark)',fo:.4,c:'var(--ink)',w:2});
    P.text(3,10,'20 cm',{a:'middle',s:12}).text(9,1,'6 cm',{a:'middle',s:12}); return P.svg(); })(),
  parts:[
   {q:'a) Combien d’arêtes la boîte a-t-elle ?',lab:'arêtes =',ans:9,hint:'C’est un prisme dont la base a 3 côtés.',why:'Prisme à base triangulaire : 3 × 3 = 9 arêtes (3 en bas, 3 en haut, 3 dans la longueur).'},
   {q:'b) Quelle est la longueur de la bande formée par les trois rectangles ?',lab:'longueur =',unit:'cm',ans:18,hint:'La bande fait le tour de la base.',why:'Périmètre de la base : 6 + 6 + 6 = 18 cm. La bande mesure 18 cm × 20 cm.'},
   {q:'c) Quelle est la hauteur d’un triangle équilatéral de 6 cm de côté ? Arrondis au dixième.',lab:'hauteur ≈',unit:'cm',ans:5.2,tol:.051,hint:'La hauteur coupe le triangle en deux triangles rectangles : hypoténuse 6 cm, un côté de 3 cm. Utilise Pythagore.',why:'Hauteur² = 6² − 3² = 36 − 9 = 27, donc hauteur = √27 ≈ 5,2 cm.'},
   {q:'d) Le développement tient-il sur la feuille A4 ?',opts:['Oui : 18 cm de large et 20 cm de haut, c’est assez petit','Non : il mesure environ 20 + 2 × 5,2 = 30,4 cm de haut, plus que 29,7 cm','Non : 18 cm de large, c’est plus que 21 cm','Oui, à condition de coller les deux triangles du même côté'],ans:1,hint:'Ajoute la hauteur des deux triangles à la longueur de la bande.',why:'La bande mesure 20 cm, plus un triangle de 5,2 cm en haut et un en bas : 30,4 cm &gt; 29,7 cm. Il manque 7 mm.'}],
  sol:'Le prisme a une base à 3 côtés, donc 3 × 3 = 9 arêtes. La bande des faces latérales a pour longueur le périmètre de la base, 3 × 6 = 18 cm, et pour largeur la longueur de la boîte, 20 cm. Par Pythagore, la hauteur d’un triangle équilatéral de 6 cm vaut √(36 − 9) = √27 ≈ 5,2 cm. Dans le sens de la longueur, le développement mesure donc 20 + 5,2 + 5,2 = 30,4 cm, ce qui dépasse les 29,7 cm de la feuille. Il faut raccourcir la boîte à 19 cm par exemple (29,4 cm en tout), ou prendre une feuille plus grande.'},
 {kind:'Problème',h:'Le pot à crayons',p:'Tu fabriques des pots à crayons cylindriques en carton, sans couvercle. Le fond est un disque de 4 cm de rayon et le pot mesure 12 cm de haut. Le développement (le rectangle et le disque du fond, qui touche un grand côté du rectangle) est découpé d’un seul morceau. Ton amie Lisa, elle, part d’une bande de carton déjà découpée.',
  fig:(()=>{ const P=plane({x:[-1,27],y:[-9.5,13],grid:false,axes:false}), L=8*PI; P.rect(0,0,L,12,{fill:'var(--accent)',fo:.2,c:'var(--ink)',w:2}).circ(L/2,-4,4,{fill:'var(--spark)',fo:.4,c:'var(--ink)',w:2});
    P.text(L/2,6,'12 cm',{a:'middle',s:12}).text(L/2,-4,'r = 4 cm',{a:'middle',dy:5,s:12}); return P.svg(); })(),
  parts:[
   {q:'a) Quelle est la longueur du rectangle ? Arrondis au dixième.',lab:'longueur ≈',unit:'cm',ans:25.1,tol:.051,hint:'Le rectangle fait le tour du disque du fond.',why:'2 × π × 4 = 8π ≈ 25,1 cm.'},
   {q:'b) Le développement mesure environ 25,1 cm sur 12 + 8 = 20 cm. Tient-il sur une feuille A4 (21 cm × 29,7 cm) ?',opts:['Non, car 25,1 cm dépasse 21 cm','Oui, en plaçant la longueur du rectangle le long du côté de 29,7 cm','Non, car le disque dépasse toujours','Oui, dans n’importe quel sens'],ans:1,hint:'Tu peux tourner la feuille : compare 25,1 à 29,7 et 20 à 21.',why:'25,1 cm ≤ 29,7 cm et 20 cm ≤ 21 cm : il tient si on aligne la longueur du rectangle avec le grand côté de la feuille.'},
   {q:'c) Lisa a une bande de 31,4 cm × 10 cm. Elle l’enroule pour que le côté de 31,4 cm fasse le tour. Quel est le rayon du disque de fond ? Arrondis au dixième.',lab:'r ≈',unit:'cm',ans:5,tol:.051,hint:'r = longueur du tour : (2 × π).',why:'r = 31,4 : (2 × π) ≈ 5,0 cm. Le pot mesure alors 10 cm de haut.'},
   {q:'d) Si Lisa enroule la bande dans l’autre sens (le côté de 10 cm fait le tour), quel est le rayon ? Arrondis au dixième.',lab:'r ≈',unit:'cm',ans:1.6,tol:.051,hint:'Cette fois, le tour mesure 10 cm.',why:'r = 10 : (2 × π) ≈ 1,6 cm : un tube fin de 31,4 cm de haut, plutôt un étui à crayon qu’un pot.'}],
  sol:'a) Le rectangle doit faire le tour du fond : 2 × π × 4 = 8π ≈ 25,1 cm. b) Le développement mesure environ 25,1 cm sur 12 + 2 × 4 = 20 cm. Sur la feuille A4 posée en hauteur, 25,1 cm ≤ 29,7 cm et 20 cm ≤ 21 cm : il tient. c) Si la longueur 31,4 cm fait le tour, r = 31,4 : (2π) ≈ 5,0 cm et le pot a 10 cm de haut. d) Dans l’autre sens, r = 10 : (2π) ≈ 1,6 cm et le tube a 31,4 cm de haut. La même bande donne deux cylindres très différents.'}
]},
/* ===================== VOLUMES DU PRISME ET DU CYLINDRE ===================== */
{subj:'sec', sem:'a10', id:'sec10-volumes', o:7, h:'Volumes du prisme et du cylindre', p:'Calculer le volume et l’aire du prisme droit et du cylindre, le volume d’un solide composé, une hauteur manquante, et convertir volumes, capacités, masses, durées et vitesses.', steps:[
 {kind:'Théorie',h:'Le volume d’un prisme droit',p:`<p>Combien d’eau dans une piscine, de sable dans un bac, de chocolat dans une barre triangulaire ? Le <b>volume</b> mesure la place qu’occupe un solide. On le compte en cubes-unités : 1 cm³ (un centimètre cube) est le volume d’un cube de 1 cm d’arête.</p>
<div class="prop"><p>Volume d’un prisme droit : <b>V = aire de la base × hauteur</b>. Pour le pavé, la base est un rectangle : V = <i>L</i> × <i>l</i> × <i>h</i>. Pour le cube d’arête <i>a</i> : V = <i>a</i>³.</p></div>
<div class="why"><p>Pose une première couche de 1 cm d’épaisseur sur la base : elle contient autant de cm³ que la base a de cm². Une base de 6 cm² donne une couche de 6 cm³. Une hauteur de 5 cm, c’est 5 couches identiques : 6 × 5 = 30 cm³. Le curseur empile les couches, essaie !</p></div>
<div class="ex"><p>Prisme de hauteur 5 cm dont la base est un triangle rectangle de côtés 4 cm et 3 cm autour de l’angle droit : aire de la base = 4 × 3 : 2 = 6 cm², donc V = 6 × 5 = 30 cm³.</p></div>
<div class="warn"><p>La base n’est pas toujours en bas ! Une tente ou une barre triangulaire est couchée : sa base est le triangle du bout, et sa « hauteur » est sa longueur.</p></div>`,
  params:[{id:'b',l:'Base (0 rectangle, 1 triangle, 2 trapèze)',min:0,max:2,v:1},{id:'h',l:'Hauteur (nombre de couches)',min:1,max:6,v:2,u:' cm'}],
  draw:v=>{ const W=view(Object.assign({az:30,el:24},R_LAY)); layers(W,v.b,v.h); return W.svg(); },
  info:v=>`Base : ${BASES[v.b].n}, aire ${BASES[v.b].A} cm². Une couche = ${BASES[v.b].A} cm³. V = ${BASES[v.b].A} × ${v.h} = <b>${BASES[v.b].A*v.h} cm³</b>.`},
 {kind:'Méthode',h:'Calculer le volume et l’aire d’un prisme droit',p:`<p>À utiliser dès qu’un solide a deux faces identiques et parallèles reliées par des rectangles : boîte, tente, barre, piscine vue de côté.</p>
<ol><li>Repère la <b>base</b> (une des deux faces identiques) et la <b>hauteur</b> (la distance entre les deux bases).</li>
<li>Calcule l’aire de la base avec la bonne formule : rectangle <i>L</i> × <i>l</i>, triangle <i>b</i> × <i>h</i> : 2, trapèze (<i>B</i> + <i>b</i>) × <i>h</i> : 2…</li>
<li><b>Volume</b> = aire de la base × hauteur, en unités cubes (cm³, m³).</li>
<li><b>Aire latérale</b> = périmètre de la base × hauteur. C’est la bande de rectangles du développement, que tu connais déjà.</li>
<li><b>Aire totale</b> = aire latérale + 2 × aire de la base, en unités carrées (cm², m²).</li></ol>
<p>Présente ta réponse : une phrase, le calcul, le résultat avec l’unité.</p>`,
  fig:(()=>{ const S=sidePrism([[-1.5,0],[1.5,0],[0,2]].map(([y,z])=>[y*.6,z*.6]),4*.6), W=view(Object.assign({az:35,el:20},fit([S.vs],35,20,.4))); polyh(W,S,{fc:['var(--spark)','var(--spark)']}); return W.svg(); })(),
  demo:{enonce:'Une tente a la forme d’un prisme droit couché. Son entrée est un triangle isocèle de 3 m de base et 2 m de haut, dont les côtés obliques mesurent 2,5 m. La tente mesure 4 m de long. Calculer son volume et l’aire totale de toile, sol compris.',
   etapes:[
    {f:'Base : le triangle de l’entrée. Hauteur du prisme : 4 m.',w:'Les triangles de devant et de derrière sont identiques et parallèles ; la distance entre eux est la longueur de la tente.'},
    {f:'Aire de la base : 3 × 2 : 2 = 3 m²',w:'Aire d’un triangle = base × hauteur : 2.'},
    {f:'Volume : 3 × 4 = 12 m³',w:'Aire de la base × hauteur du prisme.'},
    {f:'Aire latérale : (3 + 2,5 + 2,5) × 4 = 8 × 4 = 32 m²',w:'Le périmètre du triangle fois la longueur : le sol et les deux pans de toile.'},
    {f:'Aire totale : 32 + 2 × 3 = 38 m²',w:'On ajoute les deux triangles des bouts.'}],
   conclusion:'La tente a un volume de 12 m³ et il faut 38 m² de toile.'}},
 {h:'Le bac à fleurs',p:'Un bac à fleurs a la forme d’un prisme droit couché de 8 dm de long. Sa face de côté est un trapèze : grande base 3 dm (en haut), petite base 2 dm (au fond), hauteur 2 dm. Quel est son volume ?',
  fig:(()=>{ const S=sidePrism([[-1,0],[1,0],[1.5,2],[-1.5,2]].map(([y,z])=>[y*.45,z*.45]),8*.45), W=view(Object.assign({az:40,el:22},fit([S.vs],40,22,.4))); polyh(W,S,{fc:['var(--spark)','var(--spark)'],c:'var(--other)'}); return W.svg(); })(),
  lab:'V =',unit:'dm³',ans:40,why:'Aire du trapèze : (3 + 2) × 2 : 2 = 5 dm². Volume : 5 × 8 = 40 dm³.'},
 {h:'L’emballage triangulaire',p:'Un prisme droit a pour base un triangle rectangle de côtés 6 cm, 8 cm et 10 cm (l’angle droit est entre les côtés de 6 cm et 8 cm). Sa hauteur est de 5 cm. Quelle est son aire totale ?',
  fig:(()=>{ const S=prismB([[0,0],[8,0],[0,6]].map(([x,y])=>[(y-2)*.28,(x-2.7)*.28]),5*.28), W=view(Object.assign({az:30,el:24},fit([S.vs],30,24,.4))); polyh(W,S,{fc:['var(--spark)','var(--spark)']}); return W.svg(); })(),
  lab:'aire totale =',unit:'cm²',ans:168,why:'Aire latérale : (6 + 8 + 10) × 5 = 120 cm². Aire d’une base : 6 × 8 : 2 = 24 cm². Aire totale : 120 + 2 × 24 = 168 cm².'},
 {kind:'Théorie',h:'Le volume et l’aire du cylindre',p:`<p>Combien de boisson dans une canette ? Le cylindre n’est pas un prisme, puisque sa base est un disque. Pourtant, il se comporte exactement comme un prisme.</p>
<div class="prop"><p>Pour un cylindre de rayon <i>r</i> et de hauteur <i>h</i> :</p><ul><li><b>V = aire de la base × hauteur = π × <i>r</i>² × <i>h</i></b> ;</li><li>aire latérale = <b>2 × π × <i>r</i> × <i>h</i></b> (le rectangle du développement) ;</li><li>aire totale = 2 × π × <i>r</i> × <i>h</i> + 2 × π × <i>r</i>².</li></ul></div>
<div class="idea"><p>Le curseur remplace le disque par un polygone régulier à <i>n</i> côtés : le solide est alors un vrai prisme. Plus <i>n</i> est grand, plus l’aire du polygone se rapproche de celle du disque (π ≈ 3,14 pour un rayon de 1). Avec 40 côtés, on ne voit presque plus la différence : la formule du prisme reste valable pour le cylindre.</p></div>
<div class="ex"><p><i>r</i> = 3 cm et <i>h</i> = 10 cm : base π × 3² = 9π ≈ 28,27 cm², V = 9π × 10 = 90π ≈ 282,7 cm³. Aire latérale 2 × π × 3 × 10 = 60π ≈ 188,5 cm².</p></div>
<div class="warn"><p><i>r</i>² veut dire <i>r</i> × <i>r</i>, pas 2 × <i>r</i>. Et si l’énoncé donne le diamètre, divise-le d’abord par 2.</p></div>`,
  params:[{id:'n',l:'Nombre de côtés de la base',min:3,max:40,v:6}],
  draw:v=>{ const W=view({az:30,el:24,x:[-1.6,1.6],y:[-1.45,1.45]}); polyh(W,prismB(ngon(v.n,1.05),1.7),{fc:['var(--spark)','var(--spark)']}); return W.svg(); },
  info:v=>`Rayon 1 : aire de la base à ${v.n} côtés ≈ ${fmt(v.n/2*Math.sin(2*PI/v.n),3)}, aire du disque π ≈ 3,142.`},
 {kind:'Méthode',h:'Calculer le volume et l’aire d’un cylindre',p:`<p>À utiliser pour une canette, un tuyau, une citerne, un gâteau rond…</p>
<ol><li>Repère le <b>rayon</b> <i>r</i> (la moitié du diamètre) et la <b>hauteur</b> <i>h</i>, dans la même unité.</li>
<li>Aire de la base : π × <i>r</i>².</li>
<li>Volume : aire de la base × <i>h</i>, en unités cubes.</li>
<li>Aire latérale : 2 × π × <i>r</i> × <i>h</i> ; aire totale : on ajoute les deux disques.</li></ol>
<p>Garde π (la touche de la calculatrice) jusqu’au bout et n’arrondis qu’à la fin.</p>`,
  fig:(()=>{ const W=view({az:30,el:20,x:[-1.6,1.6],y:[-1.35,1.35]}); cylW(W,.8,1.9,{c:'var(--bad)'}); W.seg([0,0,.95],[.8*Math.cos(rad(-30)),.8*Math.sin(rad(-30)),.95],{c:'var(--ink)',w:1.5}).text([.4*Math.cos(rad(-30)),.4*Math.sin(rad(-30)),.95],'r',{dy:-6,s:13}); return W.svg(); })(),
  demo:{enonce:'Une canette a un rayon de 3 cm et une hauteur de 12 cm. Calculer son volume et l’aire de métal (aire totale).',
   etapes:[
    {f:'Aire de la base : π × 3² = 9π ≈ 28,27 cm²',w:'3² = 3 × 3 = 9.'},
    {f:'Volume : 9π × 12 = 108π ≈ 339,3 cm³',w:'Aire de la base × hauteur. 339,3 cm³, c’est environ 0,34 L (on le verra bientôt).'},
    {f:'Aire latérale : 2 × π × 3 × 12 = 72π ≈ 226,2 cm²',w:'Le rectangle qui fait le tour : longueur 2π × 3, largeur 12.'},
    {f:'Aire totale : 72π + 2 × 9π = 90π ≈ 282,7 cm²',w:'On ajoute le disque du haut et celui du bas.'}],
   conclusion:'La canette contient environ 339,3 cm³ et il faut environ 282,7 cm² de métal.'}},
 {h:'Le tube de balles',p:'Un tube de balles de tennis est un cylindre de 7 cm de diamètre et de 21 cm de haut. Quel est son volume ? Arrondis au cm³.',
  fig:(()=>{ const W=view({az:30,el:20,x:[-1.3,1.3],y:[-1.6,1.6]}); cylW(W,.42,2.6,{c:'var(--ok)'}); [-.85,0,.85].forEach(z=>W.dot([0,0,z],{r:13,c:'var(--spark)'})); return W.svg(); })(),
  lab:'V ≈',unit:'cm³',ans:808,tol:.6,why:'Rayon : 7 : 2 = 3,5 cm. V = π × 3,5² × 21 = π × 12,25 × 21 ≈ 808 cm³.'},
 {kind:'Théorie',h:'Volumes, capacités et masses',p:`<p>Sur une bouteille, on lit 1,5 L ; dans un problème de géométrie, on trouve des cm³. Il faut un pont entre les deux, et une règle pour passer d’une unité à l’autre.</p>
<div class="def"><p>La <b>capacité</b> est le volume de liquide qu’un récipient peut contenir. On la mesure en litres (L), décilitres (dL), centilitres (cL), millilitres (mL), avec un facteur 10 entre deux unités voisines. Le pont : <b>1 dm³ = 1 L</b>, <b>1 cm³ = 1 mL</b> et <b>1 m³ = 1000 L</b>.</p></div>
<div class="why"><p>Un cube de 1 dm (10 cm) d’arête contient 10 × 10 × 10 = 1000 petits cubes de 1 cm³. Donc 1 dm³ = 1000 cm³, et entre deux unités de volume voisines (m³, dm³, cm³) le facteur est <b>1000</b>, pas 10. Monte le curseur : chaque couche fait 10 × 10 = 100 cm³, soit 1 dL.</p></div>
<div class="ex"><p>Une brique de lait de 1 L remplit exactement un cube de 1 dm d’arête. Une cuillère de 5 mL contient 5 cm³. Une piscine de 50 m³ contient 50 000 L. Pour l’eau, <b>1 L pèse environ 1 kg</b>, donc 1 m³ d’eau pèse environ 1000 kg = 1 t.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Avant 1795, chaque région de France avait ses propres mesures : pinte, setier, boisseau… Le système métrique a tout relié : le litre devient le volume d’un cube de 1 dm, et le gramme la masse de 1 cm³ d’eau.</p></div>`,
  params:[{id:'c',l:'Couches de 100 cm³',min:0,max:10,v:3}],
  draw:v=>{ const W=view(Object.assign({az:30,el:26},R_DM)); dmCube(W,v.c); return W.svg(); },
  info:v=>`${v.c} couche${v.c>1?'s':''} : ${v.c*100} cm³ = ${v.c} dL = ${fmt(v.c/10,1)} L${v.c===10?' : le cube de 1 dm³ est plein, il contient <b>1 L</b>.':''}`},
 {kind:'Méthode',h:'Convertir volumes et capacités',p:`<p>À utiliser dès que les unités d’un calcul ne vont pas ensemble : des cm³ à comparer à des litres, des m³ d’eau à transformer en litres ou en tonnes.</p>
${tab([['m³','dm³','cm³'],['× 1000 →','× 1000 →',''],['','= L','= mL']])}
<ol><li>Repère si tu passes à une unité <b>plus petite</b> (tu multiplies) ou <b>plus grande</b> (tu divises).</li>
<li>Entre m³, dm³ et cm³, le facteur est <b>1000</b> à chaque pas. Entre L, dL, cL et mL, il est <b>10</b>.</li>
<li>Pour passer des volumes aux capacités, utilise le pont : 1 dm³ = 1 L, 1 cm³ = 1 mL.</li>
<li>Contrôle le bon sens : une unité plus petite donne un nombre plus grand.</li></ol>`,
  demo:{enonce:'Convertir : a) 2,5 m³ en litres ; b) 750 cm³ en litres ; c) 3,2 L en cm³ ; d) 45 cL en mL.',
   etapes:[
    {f:'a) 2,5 m³ = 2,5 × 1000 dm³ = 2500 dm³ = 2500 L',w:'Du m³ au dm³ : unité plus petite, on multiplie par 1000. Puis le pont dm³ = L.'},
    {f:'b) 750 cm³ = 750 : 1000 dm³ = 0,75 dm³ = 0,75 L',w:'Du cm³ au dm³ : unité plus grande, on divise par 1000.'},
    {f:'c) 3,2 L = 3,2 dm³ = 3,2 × 1000 cm³ = 3200 cm³',w:'Le pont d’abord, puis on multiplie par 1000.'},
    {f:'d) 45 cL = 45 × 10 mL = 450 mL',w:'Entre cL et mL, un seul pas : facteur 10.'}],
   conclusion:'2,5 m³ = 2500 L ; 750 cm³ = 0,75 L ; 3,2 L = 3200 cm³ ; 45 cL = 450 mL. Et 2500 L d’eau pèsent environ 2500 kg, soit 2,5 t.'}},
 {kind:'Méthode',h:'Trouver une hauteur manquante',p:`<p>On connaît parfois le volume, et c’est une autre mesure qu’on cherche : à quelle hauteur monte l’eau versée dans un aquarium, quelle hauteur doit avoir une boîte pour contenir 2 L ?</p>
<p>On sait que V = aire de la base × <i>h</i>. La hauteur est donc le nombre qui, multiplié par l’aire de la base, donne le volume : <b><i>h</i> = V : aire de la base</b>. Pour un cylindre : <i>h</i> = V : (π × <i>r</i>²).</p>
<ol><li>Mets tout dans des unités qui vont ensemble : des litres en cm³ si les longueurs sont en cm.</li>
<li>Calcule l’aire de la base.</li>
<li>Divise le volume par cette aire.</li>
<li>Vérifie en multipliant : aire de la base × <i>h</i> doit redonner V.</li></ol>`,
  fig:(()=>{ const W=view(Object.assign({az:30,el:22},fit([boxAt(1.5,2.5,2).vs],30,22,.3))); aquarium(W,1.5,2.5,2,1.6); return W.svg(); })(),
  demo:{enonce:'Un aquarium a un fond rectangulaire de 50 cm × 30 cm. On y verse 60 L d’eau. À quelle hauteur monte l’eau ?',
   etapes:[
    {f:'60 L = 60 dm³ = 60 000 cm³',w:'Les longueurs sont en cm : on convertit le volume en cm³.'},
    {f:'Aire du fond : 50 × 30 = 1500 cm²',w:'La base est le fond rectangulaire.'},
    {f:'<i>h</i> = 60 000 : 1500 = 40 cm',w:'Le volume divisé par l’aire de la base.'},
    {f:'Vérification : 1500 × 40 = 60 000 cm³',w:'On retrouve bien le volume de départ.'}],
   conclusion:'L’eau monte à 40 cm de hauteur.'}},
 {kind:'Pratique',h:'Remplis l’aquarium',p:'Tu verses 45 L d’eau dans un aquarium dont le fond mesure 60 cm × 25 cm (et qui fait 50 cm de haut). Règle le curseur sur la hauteur que l’eau atteint.',
  params:[{id:'h',l:'Hauteur de l’eau',min:0,max:50,v:10,u:' cm'}],
  draw:v=>{ const W=view(Object.assign({az:30,el:22},R_AQ)); aquarium(W,1.25,3,2.5,v.h*.05); return W.svg(); },
  info:v=>`Hauteur de l’eau : ${v.h} cm.`,
  ok:v=>v.h===30,why:'45 L = 45 000 cm³. Aire du fond : 60 × 25 = 1500 cm². Hauteur : 45 000 : 1500 = 30 cm.'},
 {kind:'Méthode',h:'Calculer le volume d’un solide composé',p:`<p>Une maison avec son toit, une pièce de bois percée, une piscine avec un escalier : beaucoup d’objets ne sont ni un pavé, ni un prisme, ni un cylindre, mais un <b>assemblage</b> de ces solides.</p>
<ol><li><b>Découpe</b> le solide en morceaux que tu sais calculer, sans qu’ils se chevauchent.</li>
<li>Calcule le volume de chaque morceau, dans la même unité.</li>
<li><b>Additionne</b> si les morceaux sont collés ensemble ; <b>soustrais</b> si un morceau est enlevé (un trou, une entaille).</li>
<li>Rédige : une phrase, les calculs, le résultat avec l’unité.</li></ol>`,
  fig:(()=>{ const vs=[[2,-3,0],[2,3,0],[-2,3,0],[-2,-3,0],[2,-3,3],[2,3,3],[-2,3,3],[-2,-3,3],[0,-3,5],[0,3,5]].map(p=>sc(.33,p));
    const S={vs,fs:[[0,1,2,3],[0,1,5,4],[3,2,6,7],[0,4,8,7,3],[1,5,9,6,2],[4,5,9,8],[7,6,9,8]]}, W=view(Object.assign({az:35,el:20},fit([vs],35,20,.35)));
    polyh(W,S,{c:'var(--other)'}); W.seg(vs[4],vs[7],{c:'var(--muted)',w:1.5,dash:1}).seg(vs[5],vs[6],{c:'var(--muted)',w:1.5,dash:1}); return W.svg(); })(),
  demo:{enonce:'a) Une maquette de cabane est formée d’un pavé de 6 cm × 4 cm × 3 cm surmonté d’un toit en prisme droit (triangle de 4 cm de base et 2 cm de haut, 6 cm de long). b) Un cube de bois de 10 cm d’arête est percé de part en part d’un trou cylindrique de 2 cm de rayon. Calculer les deux volumes.',
   etapes:[
    {f:'a) Pavé : 6 × 4 × 3 = 72 cm³',w:'Le corps de la cabane.'},
    {f:'Toit : (4 × 2 : 2) × 6 = 4 × 6 = 24 cm³',w:'Un prisme couché : base triangulaire de 4 cm², longueur 6 cm.'},
    {f:'Cabane : 72 + 24 = 96 cm³',w:'Les deux morceaux sont collés : on additionne.'},
    {f:'b) Cube : 10³ = 1000 cm³ ; trou : π × 2² × 10 = 40π ≈ 125,7 cm³',w:'Le trou traverse tout le cube : c’est un cylindre de 10 cm de haut.'},
    {f:'Pièce percée : 1000 − 40π ≈ 874,3 cm³',w:'Le trou est enlevé : on soustrait.'}],
   conclusion:'La cabane a un volume de 96 cm³ et le cube percé environ 874,3 cm³.'}},
 {kind:'Défi',h:'L’escalier en bois',p:'Noé fabrique en bois massif la maquette d’un escalier de 10 marches. Vu de côté, la 1re colonne fait 1 cm de haut, la 2e 2 cm, la 3e 3 cm, et ainsi de suite jusqu’à la 10e, qui fait 10 cm ; chaque colonne fait 1 cm de large. L’escalier mesure 4 cm d’épaisseur. Quel est son volume ?',
  fig:(()=>{ const P=plane({x:[-.6,13.2],y:[-1.2,12.2],grid:false,axes:false}), pr=[[0,0],[10,0],[10,10]]; for(let i=10;i>=1;i--){ pr.push([i-1,i]); if(i>1) pr.push([i-1,i-1]); } const d=[1.4,1.4];
    const B=pr.map(([x,y])=>[x+d[0],y+d[1]]); P.poly(B,{c:'var(--muted)',w:1.2,fo:0});
    pr.forEach((p,i)=>{ if(i>=2) P.seg(p[0],p[1],B[i][0],B[i][1],{c:'var(--ink)',w:1.2}); });
    P.poly(pr,{fill:'var(--surface)',fo:1,c:null}).poly(pr,{fill:'var(--other)',fo:.3,c:'var(--ink)',w:2});
    P.text(5,0,'10 cm',{a:'middle',dy:16,s:12}).text(11.8,11.2,'4 cm',{s:12}); return P.svg(); })(),
  lab:'V =',unit:'cm³',ans:220,why:'L’escalier est un prisme droit couché : sa base est le profil en marches, sa hauteur est l’épaisseur de 4 cm. Aire du profil : 1 + 2 + … + 10. Ici, faire un dessin aide : deux profils identiques, l’un retourné, s’emboîtent en un rectangle de 10 × 11 = 110 cm², donc un profil vaut 55 cm². Volume : 55 × 4 = 220 cm³.'},
 {kind:'Méthode',h:'Calculer une vitesse, une distance ou une durée',p:`<p>Le train roule à 120 km/h : quelle distance fait-il en 45 minutes ? Une <b>vitesse</b> dit quelle distance on parcourt en une unité de temps : 120 km/h signifie 120 km en 1 heure.</p>
<ul><li><b>distance = vitesse × durée</b>, donc durée = distance : vitesse et vitesse = distance : durée ;</li>
<li>les unités doivent aller ensemble : des km/h avec des heures, des m/s avec des secondes ;</li>
<li>1 h = 60 min = 3600 s. Une durée en minutes se convertit en heures en divisant par 60 : 45 min = 0,75 h. Attention, 1 h 30 min = 1,5 h, pas 1,3 h !</li>
<li><b>1 m/s = 3,6 km/h</b> : en 1 h, on fait 3600 m, soit 3,6 km. Des m/s vers les km/h, on multiplie par 3,6 ; dans l’autre sens, on divise.</li></ul>
<div class="blk" data-t="Le savais-tu ?"><p>Le guépard, animal terrestre le plus rapide, dépasse les 100 km/h en pointe. Le son voyage dans l’air à environ 340 m/s : compte les secondes entre l’éclair et le tonnerre, multiplie par 340, et tu sais à combien de mètres l’orage est tombé !</p></div>`,
  fig:(()=>{ const P=plane({x:[-8,98],y:[-14,14],grid:false,axes:false}); P.seg(0,0,90,0,{c:'var(--muted)',w:3});
    [0,30,60,90].forEach((x,i)=>{ P.seg(x,-3,x,3,{c:'var(--ink)',w:2}).text(x,0,`${x} km`,{a:'middle',dy:20,s:11}).text(x,0,`${i*15} min`,{a:'middle',dy:-10,s:11}); }); P.dot(90,0,{r:7,c:'var(--other)'}); return P.svg(); })(),
  demo:{enonce:'a) Un train roule à 120 km/h pendant 45 min : quelle distance parcourt-il ? b) Un guépard court à 30 m/s : quelle est sa vitesse en km/h ?',
   etapes:[
    {f:'a) 45 min = 45 : 60 h = 0,75 h',w:'La vitesse est en km/h : on met la durée en heures.'},
    {f:'distance = 120 × 0,75 = 90 km',w:'distance = vitesse × durée. Sur le dessin, 30 km tous les quarts d’heure.'},
    {f:'b) En 1 h = 3600 s, il parcourt 30 × 3600 = 108 000 m = 108 km.',w:'On raisonne sur une heure entière.'},
    {f:'30 m/s = 30 × 3,6 = 108 km/h',w:'C’est la règle 1 m/s = 3,6 km/h.'}],
   conclusion:'Le train parcourt 90 km ; le guépard court à 108 km/h.'}},
 {h:'À vélo jusqu’au lac',p:'Lina roule à vélo à 18 km/h de moyenne. Le lac est à 12 km de chez elle. Combien de minutes lui faut-il pour y arriver ?',
  lab:'durée =',unit:'min',ans:40,why:'durée = distance : vitesse = 12 : 18 = 2/3 h. En minutes : 2/3 × 60 = 40 min.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li><b>Prisme droit</b> : V = aire de la base × hauteur. Pavé : V = <i>L</i> × <i>l</i> × <i>h</i> ; cube : V = <i>a</i>³. La base peut être « couchée ».</li>
<li>Aire latérale du prisme = <b>périmètre de la base × hauteur</b> ; aire totale = aire latérale + 2 × aire de la base.</li>
<li><b>Cylindre</b> : V = π × <i>r</i>² × <i>h</i> ; aire latérale = 2 × π × <i>r</i> × <i>h</i> ; aire totale = 2π<i>rh</i> + 2π<i>r</i>². Rayon = diamètre : 2.</li>
<li><b>Unités</b> : facteur 1000 entre m³, dm³, cm³ ; facteur 10 entre L, dL, cL, mL ; <b>1 dm³ = 1 L</b>, 1 cm³ = 1 mL, 1 m³ = 1000 L. 1 L d’eau pèse environ 1 kg.</li>
<li><b>Hauteur manquante</b> : <i>h</i> = V : aire de la base, après avoir accordé les unités.</li>
<li><b>Solide composé</b> : découper en solides connus, additionner les morceaux, soustraire les trous.</li>
<li><b>Vitesse</b> : distance = vitesse × durée ; 1 h = 60 min = 3600 s ; 1 m/s = 3,6 km/h.</li>
<li>Réponse : une phrase, le calcul, le résultat avec l’unité. Garde π jusqu’au bout et arrondis à la fin.</li></ul></div>`},
 {kind:'Problème',h:'L’aquarium du salon',p:'Ta famille achète un aquarium en forme de pavé : 80 cm de long, 35 cm de large et 40 cm de haut. Pour éviter que l’eau déborde quand les poissons s’agitent, on ne le remplit que jusqu’à 5 cm du bord. Tu le remplis avec un seau de 8 L, puis tu y déposes des pierres de décoration.',
  fig:(()=>{ const W=view(Object.assign({az:30,el:22},fit([boxAt(1.4,3.2,1.6).vs],30,22,.3))); aquarium(W,1.4,3.2,1.6,1.4); return W.svg(); })(),
  parts:[
   {q:'a) Quel est le volume total de l’aquarium, en litres ?',lab:'V =',unit:'L',ans:112,hint:'Calcule en cm³, puis 1000 cm³ = 1 L.',why:'80 × 35 × 40 = 112 000 cm³ = 112 L.'},
   {q:'b) Combien de litres d’eau contient-il une fois rempli jusqu’à 5 cm du bord ?',lab:'V =',unit:'L',ans:98,hint:'La hauteur d’eau est 40 − 5 = 35 cm.',why:'80 × 35 × 35 = 98 000 cm³ = 98 L.'},
   {q:'c) Combien de seaux de 8 L faut-il verser au minimum pour atteindre ce niveau ?',lab:'seaux =',ans:13,hint:'98 : 8 ne tombe pas juste. Que faire du reste ?',why:'98 : 8 = 12,25 : 12 seaux ne suffisent pas (96 L), il faut un 13e seau, rempli seulement en partie.'},
   {q:'d) Les pierres ont un volume total de 4 L. De combien de centimètres l’eau monte-t-elle ? Arrondis au dixième.',lab:'hausse ≈',unit:'cm',ans:1.4,tol:.051,hint:'Les pierres poussent 4 L d’eau vers le haut : cherche la hauteur d’un pavé d’eau de 4000 cm³ sur le fond de l’aquarium.',why:'Aire du fond : 80 × 35 = 2800 cm². Hausse : 4000 : 2800 ≈ 1,4 cm.'}],
  sol:'Le volume total est 80 × 35 × 40 = 112 000 cm³ = 112 L. L’eau monte à 40 − 5 = 35 cm, donc elle occupe 80 × 35 × 35 = 98 000 cm³ = 98 L, soit environ 98 kg d’eau. Avec des seaux de 8 L, 98 : 8 = 12,25 : il faut 13 seaux, le dernier à moitié vide. Les pierres prennent 4 L = 4000 cm³ de place sous l’eau ; cette eau est poussée vers le haut et forme une couche de hauteur 4000 : (80 × 35) = 4000 : 2800 ≈ 1,4 cm. Le niveau passe à environ 36,4 cm : il reste encore de la marge avant le bord.'},
 {kind:'Problème',h:'La rampe de skate',p:'Le quartier construit une rampe de skate en béton. Vue de côté, elle est formée d’un plateau rectangulaire de 1,5 m de long et 1,2 m de haut, suivi d’une pente : un triangle rectangle de 3 m de long au sol et 1,2 m de haut. La rampe fait 2,5 m de large.',
  fig:(()=>{ const P=plane({x:[-1.3,5],y:[-.8,2],grid:false,axes:false}); P.rect(0,0,1.5,1.2,{fill:'var(--other)',fo:.3,c:'var(--ink)',w:2}).poly([[1.5,0],[4.5,0],[1.5,1.2]],{fill:'var(--math)',fo:.3,c:'var(--ink)',w:2});
    P.text(.75,0,'1,5 m',{a:'middle',dy:16,s:12}).text(3,0,'3 m',{a:'middle',dy:16,s:12}).text(0,.6,'1,2 m',{a:'end',dx:-4,s:12}); return P.svg(); })(),
  parts:[
   {q:'a) Quelle est l’aire du profil de la rampe (vue de côté) ?',lab:'aire =',unit:'m²',ans:3.6,tol:.001,hint:'Additionne l’aire du rectangle et celle du triangle.',why:'1,5 × 1,2 + 3 × 1,2 : 2 = 1,8 + 1,8 = 3,6 m².'},
   {q:'b) Quel volume de béton faut-il ?',lab:'V =',unit:'m³',ans:9,tol:.001,hint:'La rampe est un prisme couché : sa base est le profil, sa hauteur est la largeur.',why:'V = 3,6 × 2,5 = 9 m³.'},
   {q:'c) Quelle est la longueur de la pente ? Arrondis au centième.',lab:'longueur ≈',unit:'m',ans:3.23,tol:.006,hint:'La pente est l’hypoténuse d’un triangle rectangle de côtés 3 m et 1,2 m.',why:'Pythagore : longueur² = 3² + 1,2² = 9 + 1,44 = 10,44, donc longueur = √10,44 ≈ 3,23 m.'},
   {q:'d) Un skateur descend la pente à 18 km/h de moyenne. Combien de secondes dure la descente ? Arrondis au dixième.',lab:'durée ≈',unit:'s',ans:.646,tol:.05,hint:'Convertis 18 km/h en m/s (divise par 3,6), puis durée = distance : vitesse.',why:'18 km/h = 18 : 3,6 = 5 m/s. Durée : 3,23 : 5 ≈ 0,6 s.'}],
  sol:'Le profil se découpe en un rectangle de 1,5 × 1,2 = 1,8 m² et un triangle de 3 × 1,2 : 2 = 1,8 m², soit 3,6 m². La rampe est un prisme droit couché de 2,5 m de long : V = 3,6 × 2,5 = 9 m³ de béton. La pente est l’hypoténuse d’un triangle rectangle de côtés 3 m et 1,2 m : √(9 + 1,44) = √10,44 ≈ 3,23 m. À 18 km/h = 5 m/s, le skateur la descend en 3,23 : 5 ≈ 0,6 s. Ça va très vite !'}
]},
);
})();
