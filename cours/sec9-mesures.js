/* Déclic — Maths au secondaire, 9e année : périmètres et aires, solides, volumes et mesures */
(()=>{
/* ---------- outils locaux ---------- */
const TD='border:1px solid var(--line);padding:4px 7px;text-align:center';
const tab=rows=>`<table style="border-collapse:collapse;margin:6px auto;font-size:.92em">${rows.map((r,i)=>`<tr>${r.map(c=>i?`<td style="${TD}">${c}</td>`:`<th style="${TD}">${c}</th>`).join('')}</tr>`).join('')}</table>`;
// tableau à colonnes groupées : heads = [[titre, nb de colonnes], …], rows = lignes de cellules simples
const gtab=(heads,rows)=>`<table style="border-collapse:collapse;margin:6px auto;font-size:.88em"><tr>${heads.map(([t,n])=>`<th colspan="${n}" style="${TD}">${t}</th>`).join('')}</tr>${rows.map(r=>`<tr>${r.map(c=>`<td style="${TD};min-width:14px">${c}</td>`).join('')}</tr>`).join('')}</table>`;
const AIRES=[['km²',2],['hm² (ha)',2],['dam² (a)',2],['m²',2],['dm²',2],['cm²',2]];
const VOLS=[['m³',3],['dm³',3],['cm³',3]];

/* --- géométrie 3D --- */
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]], add3=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]], mul3=(k,a)=>[k*a[0],k*a[1],k*a[2]];
const crs=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]], dt=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const mean=pts=>mul3(1/pts.length,pts.reduce(add3,[0,0,0]));
const vdir=(az,el)=>[Math.cos(rad(az))*Math.cos(rad(el)),Math.sin(rad(az))*Math.cos(rad(el)),Math.sin(rad(el))];
const COLS=['var(--accent)','var(--math)','var(--spark)','var(--other)','var(--code)','var(--ok)'];

// Polyèdre convexe : sommets V, faces F (listes d'indices). Faces cachées non remplies, arêtes cachées en pointillés.
// o : az, el, r, S (repère existant), fill, fo, fc(k) couleur de la face k, smooth(k) faces d'une surface courbe, ec, w, hidden
function solid(V,Fs,o={}){
  const az=o.az??30, el=o.el??22, S=o.S||space({az,el,r:o.r||4,axes:false,w:o.w}), d=vdir(az,el), C=mean(V);
  const vis=Fs.map(f=>{ const P=f.map(i=>V[i]); let n=crs(sub(P[1],P[0]),sub(P[2],P[0])); if(dt(n,sub(mean(P),C))<0) n=mul3(-1,n); return dt(n,d)>1e-9; });
  const E=new Map(); Fs.forEach((f,k)=>f.forEach((a,j)=>{ const b=f[(j+1)%f.length], key=Math.min(a,b)+'-'+Math.max(a,b); if(!E.has(key)) E.set(key,[a,b,[]]); E.get(key)[2].push(k); }));
  const sm=o.smooth||(()=>false), hid=[], vsb=[];
  E.forEach(([a,b,fs])=>{ if(fs.length===2&&sm(fs[0])&&sm(fs[1])){ if(vis[fs[0]]!==vis[fs[1]]) vsb.push([a,b]); return; } (fs.some(k=>vis[k])?vsb:hid).push([a,b]); });
  if(o.hidden!==false) hid.forEach(([a,b])=>S.seg(V[a],V[b],{c:o.hc||'var(--muted)',w:o.hw||1.6,dash:1}));
  Fs.forEach((f,k)=>{ if(vis[k]) S.poly(f.map(i=>V[i]),{fill:(o.fc&&o.fc(k))||o.fill||'var(--accent)',fo:o.fo??.18,c:null}); });
  vsb.forEach(([a,b])=>S.seg(V[a],V[b],{c:o.ec||'var(--ink)',w:o.w2||2.5}));
  S.nvis=vis.filter(x=>x).length; S.hid=hid; S.vsb=vsb;
  return S;
}
// pavé : x = largeur (vers l'avant), y = longueur (vers la droite), z = hauteur ; centré, ou posé en z0
const boxV=(a,b,c,o=[0,0,0])=>{ const V=[]; for(const z of [-c/2,c/2]) for(const [x,y] of [[a/2,-b/2],[a/2,b/2],[-a/2,b/2],[-a/2,-b/2]]) V.push([x+o[0],y+o[1],z+o[2]]); return V; };
const BOXF=[[0,1,2,3],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]];
const ngon=(n,R,z)=>Array.from({length:n},(_,k)=>{ const t=2*Math.PI*k/n+Math.PI/n; return [R*Math.cos(t),R*Math.sin(t),z]; });
const rng=n=>[...Array(n).keys()];
function prismVF(n,R,h){ const V=[...ngon(n,R,-h/2),...ngon(n,R,h/2)], F=[rng(n),rng(n).map(i=>i+n)]; for(let i=0;i<n;i++) F.push([i,(i+1)%n,n+(i+1)%n,n+i]); return {V,F}; }
function pyrVF(n,R,h){ const V=[...ngon(n,R,-h/2),[0,0,h/2]], F=[rng(n)]; for(let i=0;i<n;i++) F.push([i,(i+1)%n,n]); return {V,F}; }
// prisme droit couché à base triangulaire rectangle (côtés de l'angle droit b vers l'avant, t vers le haut), longueur L vers la droite
function triPrismVF(b,t,L){ const V=[[b/2,-L/2,-t/2],[-b/2,-L/2,-t/2],[-b/2,-L/2,t/2],[b/2,L/2,-t/2],[-b/2,L/2,-t/2],[-b/2,L/2,t/2]];
  return {V,F:[[0,1,2],[3,4,5],[0,1,4,3],[1,2,5,4],[0,2,5,3]]}; }
function drawPrism(n,az,o={}){ const cyl=n>10, k=cyl?40:n, {V,F}=prismVF(k,o.R||1.6,o.h||2.6);
  return solid(V,F,{az,el:o.el??22,r:o.r||3,fc:i=>i<2?'var(--spark)':'var(--accent)',fo:.22,smooth:cyl?(i=>i>=2):null,w:o.w}); }
function drawPyr(n,az,o={}){ const {V,F}=pyrVF(n,o.R||1.7,o.h||2.8); return solid(V,F,{az,el:o.el??22,r:o.r||3,fc:i=>i<1?'var(--spark)':'var(--accent)',fo:.22,w:o.w}); }

// Assemblage de cubes-unités [i,j,k] : i vers l'avant, j vers la droite, k = étage
function cubes(list,o={}){
  const az=o.az??30, el=o.el??25, d=vdir(az,el), S=o.S||space({az,el,r:o.r||4,axes:false,w:o.w}), sc=o.s||1;
  const has=new Set(list.map(c=>c.join(','))), H=(i,j,k)=>has.has([i,j,k].join(','));
  const bx=o.box||[Math.max(...list.map(c=>c[0]))+1,Math.max(...list.map(c=>c[1]))+1,Math.max(...list.map(c=>c[2]))+1];
  const ct=[bx[0]/2,bx[1]/2,bx[2]/2], P=(x,y,z)=>mul3(sc,sub([x,y,z],ct));
  const ca=Math.cos(rad(az)), sa=Math.sin(rad(az));
  const srt=[...list].sort((p,q)=>dt(p,d)-dt(q,d));
  const face=(pts,fo,col)=>{ S.poly(pts,{fill:'var(--surface)',fo:1,c:null}); S.poly(pts,{fill:col,fo,c:'var(--ink)',w:1.3}); };
  for(const c of srt){ const [i,j,k]=c, col=(o.col&&o.col(c))||'var(--accent)';
    if(ca>1e-9&&!H(i+1,j,k)) face([P(i+1,j,k),P(i+1,j+1,k),P(i+1,j+1,k+1),P(i+1,j,k+1)],.55,col);
    if(ca<-1e-9&&!H(i-1,j,k)) face([P(i,j,k),P(i,j+1,k),P(i,j+1,k+1),P(i,j,k+1)],.55,col);
    if(sa>1e-9&&!H(i,j+1,k)) face([P(i,j+1,k),P(i+1,j+1,k),P(i+1,j+1,k+1),P(i,j+1,k+1)],.8,col);
    if(sa<-1e-9&&!H(i,j-1,k)) face([P(i,j,k),P(i+1,j,k),P(i+1,j,k+1),P(i,j,k+1)],.8,col);
    if(el>0&&!H(i,j,k+1)) face([P(i,j,k+1),P(i+1,j,k+1),P(i+1,j+1,k+1),P(i,j+1,k+1)],.25,col);
  }
  S.P3=P; return S;
}
// piles de cubes : h[i][j] = hauteur de la pile (i = rangée, 0 au fond ; j = colonne, 0 à gauche)
const stack=h=>{ const L=[]; h.forEach((r,i)=>r.forEach((n,j)=>{ for(let k=0;k<n;k++) L.push([i,j,k]); })); return L; };
const vFace=h=>h[0].map((_,j)=>Math.max(...h.map(r=>r[j])));          // de gauche à droite
const vCote=h=>[...h].reverse().map(r=>Math.max(...r));               // vue de droite : l'avant est à gauche
// dessin d'une vue (colonnes de carrés) ou de la vue de dessus (grille)
function viewFig(cols,o={}){ const n=cols.length, m=Math.max(3,...cols), P=plane({x:[-.3,Math.max(n,3)+.3],y:[-.3,m+.9],w:o.w||110,grid:false,axes:false});
  cols.forEach((c,j)=>{ for(let k=0;k<c;k++) P.rect(j,k,1,1,{fill:o.c||'var(--accent)',fo:.35,c:'var(--ink)',w:1.5}); });
  P.seg(-.2,0,n+.2,0,{c:'var(--muted)',w:1.5}); if(o.t) P.text(Math.max(n,3)/2,m+.5,o.t,{a:'middle',s:12}); return P.svg(); }
function topFig(h,o={}){ const R=h.length, C=h[0].length, P=plane({x:[-.3,Math.max(C,3)+.3],y:[-.3,Math.max(R,2)+.9],w:o.w||110,grid:false,axes:false});
  h.forEach((r,i)=>r.forEach((n,j)=>{ if(n>0){ P.rect(j,R-1-i,1,1,{fill:'var(--accent)',fo:.35,c:'var(--ink)',w:1.5}); if(o.num) P.text(j+.5,R-1-i+.5,String(n),{a:'middle',dy:5,s:12}); } }));
  if(o.t) P.text(Math.max(C,3)/2,Math.max(R,2)+.5,o.t,{a:'middle',s:12}); return P.svg(); }
const row=(...svgs)=>`<div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;align-items:flex-end">${svgs.join('')}</div>`;

/* --- patrons qui se replient --- */
// faces : {p:[[x,y],…], par (indice du parent, −1 pour la face posée), hg:[[x,y],[x,y]] charnière, a: angle de fermeture en degrés}
function foldPts(faces,t){
  const rot=(f,q)=>{ const A=[...f.hg[0],0], e0=sub([...f.hg[1],0],A), e=mul3(1/Math.hypot(...e0),e0), w0=sub(mean(f.p.map(p=>[p[0],p[1],0])),A), wp=sub(w0,mul3(dt(w0,e),e)), wn=mul3(1/Math.hypot(...wp),wp);
    const u=[wn[1],-wn[0],0], th=rad(f.a*t), v=sub(q,A);
    return add3(A,add3(add3(mul3(Math.cos(th),v),mul3(Math.sin(th),crs(u,v))),mul3(dt(u,v)*(1-Math.cos(th)),u))); };
  return faces.map(f=>f.p.map(p=>{ let q=[p[0],p[1],0]; for(let g=f; g.par>=0; g=faces[g.par]) q=rot(g,q); return q; }));
}
function foldFig(faces,t,o={}){
  const az=o.az??35, el=o.el??38, d=vdir(az,el), S=space({az,el,r:o.r||4,axes:false}), sc=o.s||1;
  const P3=foldPts(faces,t), all=P3.flat(), lo=[0,1,2].map(i=>Math.min(...all.map(p=>p[i]))), hi=[0,1,2].map(i=>Math.max(...all.map(p=>p[i]))), ct=mul3(.5,add3(lo,hi));
  const Q=P3.map(f=>f.map(p=>mul3(sc,sub(p,ct))));
  rng(Q.length).sort((a,b)=>dt(mean(Q[a]),d)-dt(mean(Q[b]),d)).forEach(k=>{ const col=(o.col&&o.col(k))||COLS[k%COLS.length];
    S.poly(Q[k],{fill:'var(--surface)',fo:1,c:null}); S.poly(Q[k],{fill:col,fo:.45,c:'var(--ink)',w:1.8});
    if(o.lab) S.text(mean(Q[k]),o.lab[k],{a:'middle',dy:5,s:12}); });
  return S.svg();
}
// patron de cube à partir de cases [x, y] d'un quadrillage (arbre de pliage construit en largeur depuis la case racine)
function cellNet(cells,root=0){
  const faces=cells.map(c=>({p:[[c[0],c[1]],[c[0]+1,c[1]],[c[0]+1,c[1]+1],[c[0],c[1]+1]],par:-2,a:90}));
  faces[root].par=-1; const Q=[root];
  while(Q.length){ const k=Q.shift(), [x,y]=cells[k];
    cells.forEach((c,m)=>{ if(faces[m].par!==-2) return; const dx=c[0]-x, dy=c[1]-y; if(Math.abs(dx)+Math.abs(dy)!==1) return;
      faces[m].par=k; faces[m].hg=dx===1?[[x+1,y],[x+1,y+1]]:dx===-1?[[x,y],[x,y+1]]:dy===1?[[x,y+1],[x+1,y+1]]:[[x,y],[x+1,y]]; Q.push(m); }); }
  return faces;
}
const closes=cells=>{ const P=foldPts(cellNet(cells),1); return new Set(P.map(f=>mean(f).map(x=>Math.round(x*1000)/1000).join(','))).size===6; };
// patron dessiné à plat (plan)
function netFig(cells,o={}){ const xs=cells.map(c=>c[0]), ys=cells.map(c=>c[1]), x0=Math.min(...xs), y0=Math.min(...ys), x1=Math.max(...xs)+1, y1=Math.max(...ys)+1;
  const P=plane({x:[x0-.2,Math.max(x1,x0+4)+.2],y:[y0-.2,y1+.2],w:o.w||200,grid:false,axes:false});
  cells.forEach((c,k)=>{ P.rect(c[0],c[1],1,1,{fill:(o.col&&o.col(k))||'var(--accent)',fo:.3,c:'var(--ink)',w:1.8}); if(o.lab) P.text(c[0]+.5,c[1]+.5,o.lab[k],{a:'middle',dy:5,s:14}); });
  return P.svg(); }
// patrons des solides du curseur « développement »
const PAVE=(L,W,H)=>[
  {p:[[0,0],[L,0],[L,W],[0,W]],par:-1},
  {p:[[0,-H],[L,-H],[L,0],[0,0]],par:0,hg:[[0,0],[L,0]],a:90},
  {p:[[0,W],[L,W],[L,W+H],[0,W+H]],par:0,hg:[[0,W],[L,W]],a:90},
  {p:[[-H,0],[0,0],[0,W],[-H,W]],par:0,hg:[[0,0],[0,W]],a:90},
  {p:[[L,0],[L+H,0],[L+H,W],[L,W]],par:0,hg:[[L,0],[L,W]],a:90},
  {p:[[0,W+H],[L,W+H],[L,2*W+H],[0,2*W+H]],par:2,hg:[[0,W+H],[L,W+H]],a:90}];
const PRISME=(s,L)=>{ const k=s*Math.sqrt(3)/2; return [
  {p:[[0,0],[s,0],[s,L],[0,L]],par:-1},
  {p:[[s,0],[2*s,0],[2*s,L],[s,L]],par:0,hg:[[s,0],[s,L]],a:120},
  {p:[[-s,0],[0,0],[0,L],[-s,L]],par:0,hg:[[0,0],[0,L]],a:120},
  {p:[[0,0],[s,0],[s/2,-k]],par:0,hg:[[0,0],[s,0]],a:90},
  {p:[[0,L],[s,L],[s/2,L+k]],par:0,hg:[[0,L],[s,L]],a:90}]; };
const PYRA=(a,ap)=>{ const th=180-Math.acos(a/2/ap)*180/Math.PI; return [
  {p:[[0,0],[a,0],[a,a],[0,a]],par:-1},
  {p:[[0,0],[a,0],[a/2,-ap]],par:0,hg:[[0,0],[a,0]],a:th},
  {p:[[a,0],[a,a],[a+ap,a/2]],par:0,hg:[[a,0],[a,a]],a:th},
  {p:[[a,a],[0,a],[a/2,a+ap]],par:0,hg:[[0,a],[a,a]],a:th},
  {p:[[0,a],[0,0],[-ap,a/2]],par:0,hg:[[0,0],[0,a]],a:th}]; };
const CROIX=[[1,1],[1,0],[1,2],[1,3],[0,1],[2,1]];
const NETS=[{h:'Cube',f:cellNet(CROIX),r:4.2,s:1.9,i:'6 carrés identiques'},{h:'Pavé',f:PAVE(2.4,1.6,1),r:4.2,s:1.35,i:'6 rectangles, identiques deux par deux'},
  {h:'Prisme à base triangulaire',f:PRISME(1.6,2.6),r:3.6,s:1.3,i:'2 triangles et 3 rectangles'},{h:'Pyramide à base carrée',f:PYRA(2,2),r:3.8,s:1.2,i:'1 carré et 4 triangles'}];
// le 6e carré à placer (pratique)
const BASE5=[[1,1],[0,1],[2,1],[3,1],[1,2]];
const CAND=[[0,0],[1,0],[2,0],[3,0],[0,2],[2,2],[3,2],[4,1]];
const CANDOK=CAND.map(c=>closes([...BASE5,c]));

/* --- perspective cavalière (dessin plan) --- */
function cav(L,H,D,al,k,o={}){
  const dx=k*D*Math.cos(rad(al)), dy=k*D*Math.sin(rad(al));
  const P=plane({x:[-.5,o.xm||9],y:[-.5,o.ym||8],w:o.w||300,step:1,axes:false,grid:o.grid!==false});
  const A=[0,0],B=[L,0],C=[L,H],Dd=[0,H], t=p=>[p[0]+dx,p[1]+dy], A2=t(A),B2=t(B),C2=t(C),D2=t(Dd);
  const hq=o.plein?{c:'var(--ink)',w:2.5}:{c:'var(--muted)',w:1.8,dash:1}, vq={c:'var(--ink)',w:2.5};
  if(D>0){ P.seg(...A2,...B2,hq).seg(...A2,...D2,hq).seg(...A,...A2,hq); }
  P.poly([A,B,C,Dd],{fill:'var(--accent)',fo:.18,c:'var(--ink)',w:2.5});
  if(D>0){ P.poly([Dd,C,C2,D2],{fill:'var(--spark)',fo:.15,c:null}).poly([B,B2,C2,C],{fill:'var(--math)',fo:.12,c:null});
    P.seg(...B,...B2,vq).seg(...C,...C2,vq).seg(...Dd,...D2,vq).seg(...B2,...C2,vq).seg(...C2,...D2,vq); }
  P.pts={A,B,C,D:Dd,A2,B2,C2,D2}; return P;
}

/* --- figures planes --- */
function regPoly(n,c){ const P=plane({x:[-7,7],y:[-7,7],w:280,axes:false}), R=c/(2*Math.sin(Math.PI/n));
  const pts=rng(n).map(k=>{ const t=-Math.PI/2-Math.PI/n+2*Math.PI*k/n; return [R*Math.cos(t),R*Math.sin(t)]; });
  P.poly(pts,{fill:'var(--accent)',fo:.2,c:'var(--accent)',w:3});
  pts.forEach((p,k)=>{ const q=pts[(k+1)%n], m=[(p[0]+q[0])/2,(p[1]+q[1])/2], L=Math.hypot(q[0]-p[0],q[1]-p[1]), nx=-(q[1]-p[1])/L*.3, ny=(q[0]-p[0])/L*.3; P.seg(m[0]-nx,m[1]-ny,m[0]+nx,m[1]+ny,{c:'var(--ink)',w:2}); });
  P.text(0,pts[0][1],fmt(c)+' cm',{a:'middle',dy:20}); return P.svg(); }
function rectGrid(L,l,o={}){ const P=plane({x:[-1.8,10.5],y:[-.9,8.5],w:300,axes:false});
  P.rect(0,0,L,l,{fill:'var(--accent)',fo:.3,c:'var(--accent)',w:3});
  if(o.lab!==false){ P.text(L/2,0,fmt(L)+' cm',{a:'middle',dy:16,s:12}); P.text(0,l/2,fmt(l)+' cm',{a:'end',dx:-4,dy:4,s:12}); } return P.svg(); }
// côte (longueur) le long d'un segment, décalée de off
function cote(P,x1,y1,x2,y2,s,off=.4,q={}){ const L=Math.hypot(x2-x1,y2-y1), nx=-(y2-y1)/L*off, ny=(x2-x1)/L*off;
  P.seg(x1+nx,y1+ny,x2+nx,y2+ny,{c:'var(--muted)',w:1.2}); P.text((x1+x2)/2+nx*1.8,(y1+y2)/2+ny*1.8,s,{a:'middle',dy:4,s:12,c:q.c}); return P; }
const angDroit=(P,x,y,dx,dy,s=.3)=>P.poly([[x+dx*s,y],[x+dx*s,y+dy*s],[x,y+dy*s]],{open:true,c:'var(--ink)',w:1.3});
// horloge
function horloge(h,m){ const P=plane({x:[-5,5],y:[-5,5],w:200,grid:false,axes:false}); P.circ(0,0,4.6,{fill:'var(--surface)',fo:1,c:'var(--ink)',w:3});
  for(let k=0;k<60;k++){ const t=rad(90-6*k), r1=k%5?4.25:3.9; P.seg(r1*Math.cos(t),r1*Math.sin(t),4.5*Math.cos(t),4.5*Math.sin(t),{c:'var(--muted)',w:k%5?1:2.2}); }
  for(let k=1;k<=12;k++){ const t=rad(90-30*k); P.text(3.3*Math.cos(t),3.3*Math.sin(t),String(k),{a:'middle',dy:5,s:12}); }
  const th=rad(90-30*((h%12)+m/60)), tm=rad(90-6*m); P.seg(0,0,2.2*Math.cos(th),2.2*Math.sin(th),{c:'var(--ink)',w:5}).seg(0,0,3.6*Math.cos(tm),3.6*Math.sin(tm),{c:'var(--accent)',w:3}); P.dot(0,0,{r:4,c:'var(--ink)'}); return P.svg(); }

COURS.push(
/* ============================== PÉRIMÈTRES ET AIRES ============================== */
{subj:'sec', sem:'a9', id:'sec9-aires', o:7, h:'Périmètres et aires', p:'Mesurer le tour d’une figure et la surface qu’elle couvre : unités, formules expliquées par découpage, figures composées, ares et hectares.', steps:[
 {kind:'Théorie',h:'Les unités de longueur',p:`<p>Ton skate mesure 80 cm, un tour de piste fait 400 m, et Lausanne est à 60 km de Genève. Pour chaque longueur, on choisit l’unité la plus pratique. Toutes viennent du <b>mètre</b> (m).</p>
<div class="def"><p>Les unités de longueur, de la plus grande à la plus petite : <b>km</b> (kilomètre), <b>hm</b> (hectomètre), <b>dam</b> (décamètre), <b>m</b> (mètre), <b>dm</b> (décimètre), <b>cm</b> (centimètre), <b>mm</b> (millimètre). Chaque unité vaut <b>10 fois</b> celle qui est juste à sa droite.</p></div>
${tab([['km','hm','dam','m','dm','cm','mm'],['1000 m','100 m','10 m','1 m','0,1 m','0,01 m','0,001 m']])}
<div class="idea"><p>Les préfixes ont un sens. <b>Kilo</b> veut dire 1000, <b>hecto</b> 100, <b>déca</b> 10. <b>Déci</b> veut dire un dixième, <b>centi</b> un centième, <b>milli</b> un millième. Un centimètre, c’est donc un centième de mètre : il en faut 100 pour faire 1 m.</p></div>
<div class="ex"><p>1 m = 10 dm = 100 cm = 1000 mm. 1 km = 1000 m. Un crayon de 15 cm mesure 150 mm. Sur la règle, entre deux traits des centimètres, il y a 10 millimètres.</p></div>
<div class="warn"><p>Plus l’unité est petite, plus le nombre est grand : 2 m, c’est 200 cm. Si tu passes à une unité plus petite et que ton nombre diminue, tu t’es trompé de sens.</p></div>`,
  fig:(()=>{ const P=plane({x:[-.6,10.6],y:[-1.6,2.2],w:320,grid:false,axes:false}); P.rect(-.3,-.2,10.6,1.6,{fill:'var(--spark)',fo:.18,c:'var(--ink)',w:2});
    for(let k=0;k<=100;k++){ const x=k/10, L=k%10===0?.7:k%5===0?.5:.3; P.seg(x,1.4,x,1.4-L,{c:'var(--ink)',w:k%10?1:1.8}); }
    for(let k=0;k<=10;k++) P.text(k,.15,String(k),{a:'middle',s:11});
    P.seg(0,-.6,10,-.6,{c:'var(--accent)',w:2.5}).text(5,-.6,'1 dm = 10 cm = 100 mm',{a:'middle',dy:18,s:12,c:'var(--accent)'}).text(10.3,1.9,'cm',{a:'end',s:11,c:'var(--muted)'});
    return P.svg(); })()},
 {kind:'Méthode',h:'Convertir une longueur',p:'<b>Quand :</b> une longueur est donnée dans une unité et tu la veux dans une autre, par exemple pour additionner des côtés mesurés différemment. <b>Pourquoi ça marche :</b> chaque unité vaut 10 fois la suivante. Passer d’une colonne à sa voisine, c’est donc multiplier ou diviser par 10. <b>Comment :</b> écris le nombre dans le tableau, le <b>chiffre des unités</b> dans la colonne de son unité, un chiffre par colonne. Place ensuite la virgule juste après la colonne de la nouvelle unité, et complète par des zéros si besoin. Raccourci : vers une unité plus petite, on multiplie par 10 à chaque colonne ; vers une plus grande, on divise.',
  demo:{enonce:'Convertir 3,75 km en m, puis 48 mm en dm.',
   etapes:[
    {f:tab([['km','hm','dam','m'],['3','7','5','0']]),w:'Le chiffre des unités, 3, va dans la colonne km. Les chiffres après la virgule suivent, un par colonne : 7 en hm, 5 en dam. La colonne m est vide, on y écrit 0.'},
    {f:'3,75 km = 3750 m',w:'On veut des mètres : la virgule se place juste après la colonne m.'},
    {f:'Contrôle : de km à m, 3 colonnes, donc 3,75 × 1000 = 3750',w:'Trois pas vers la droite, c’est × 10 × 10 × 10 = × 1000.'},
    {f:tab([['dm','cm','mm'],['0,','4','8']]),w:'Pour 48 mm : 8 en mm, 4 en cm. On veut des dm : la virgule se place après la colonne dm, qui est vide, donc 0.'},
    {f:'48 mm = 0,48 dm',w:'Contrôle : 2 colonnes vers la gauche, c’est ÷ 100, et 48 ÷ 100 = 0,48.'}],
   conclusion:'3,75 km = 3750 m et 48 mm = 0,48 dm. Vérifie toujours le sens : unité plus petite, nombre plus grand.'}},
 {kind:'Théorie',h:'Le périmètre d’un polygone',p:`<p>Une fourmi fait le tour de ton tapis de souris en suivant le bord. Quelle distance parcourt-elle&nbsp;? C’est le <b>périmètre</b> du tapis.</p>
<div class="def"><p>Le <b>périmètre</b> d’un polygone est la longueur de son contour : c’est la <b>somme</b> des longueurs de tous ses côtés. C’est une longueur : il s’exprime en m, en cm, en km…</p></div>
<div class="idea"><p>Imagine une ficelle posée tout le long du bord de la figure. Tu la coupes, tu la tends bien droite et tu la mesures : sa longueur est le périmètre.</p></div>
<div class="prop"><p>Des raccourcis. Un polygone <b>régulier</b> a tous ses côtés égaux : son périmètre vaut nombre de côtés × côté. Pour le <b>carré</b> : 4 × côté. Pour le <b>rectangle</b> : 2 × (longueur + largeur), car il a deux longueurs et deux largeurs.</p></div>
<div class="ex"><p>Un triangle de côtés 5 cm, 7 cm et 9 cm : 5 + 7 + 9 = 21 cm. Un rectangle de 8 m sur 3 m : 2 × (8 + 3) = 2 × 11 = 22 m. Un hexagone régulier de côté 4 cm : 6 × 4 = 24 cm.</p></div>
<p>Bouge les curseurs : les petits traits sur les côtés indiquent qu’ils ont tous la même longueur.</p>`,
  params:[{id:'n',l:'Nombre de côtés',min:3,max:8,v:6},{id:'c',l:'Longueur d’un côté',min:1,max:5,step:.5,v:2,u:'cm'}],
  draw:v=>regPoly(v.n,v.c),
  info:v=>`${['','','','Triangle équilatéral','Carré','Pentagone régulier','Hexagone régulier','Heptagone régulier','Octogone régulier'][v.n]} : périmètre = ${v.n} × ${fmt(v.c)} = <b>${fmt(v.n*v.c)} cm</b>`},
 {kind:'Méthode',h:'Calculer un périmètre',p:'<b>Quand :</b> on cherche la longueur d’un tour : une clôture, une bordure, un ruban, une course autour d’un terrain. <b>Pourquoi ça marche :</b> le périmètre est la somme des côtés. Mais on n’additionne que des longueurs dans la <b>même unité</b>, comme on n’additionne pas des francs et des centimes sans convertir. <b>Comment :</b> 1) repère tous les côtés, sans en oublier ; 2) convertis-les dans la même unité ; 3) additionne, ou utilise un raccourci (carré, rectangle). Présente ta solution en trois temps : une <b>phrase</b> qui dit ce que tu calcules, le <b>calcul</b>, puis la <b>réponse</b> en phrase, avec l’unité.',
  demo:{enonce:'Un enclos à lapins a la forme d’un triangle de côtés 1,2 m, 85 cm et 9 dm. Quelle longueur de grillage faut-il pour en faire le tour&nbsp;?',
   etapes:[
    {f:'1,2 m = 120 cm ; 9 dm = 90 cm ; 85 cm reste 85 cm',w:'On convertit tout en cm, l’unité qui évite les virgules.'},
    {f:'Je calcule le périmètre du triangle : 120 + 85 + 90 = 295',w:'La phrase dit ce qu’on calcule, puis on additionne les trois côtés.'},
    {f:'295 cm = 2,95 m',w:'On revient aux mètres, plus pratiques pour acheter du grillage.'}],
   conclusion:'Réponse : il faut 295 cm, soit 2,95 m de grillage.'}},
 {kind:'Théorie',h:'L’aire du rectangle et du carré',p:`<p>Tu veux couvrir le sol de ta cabane avec des dalles carrées de 1 m de côté. Combien en faut-il&nbsp;? Ce nombre de dalles, c’est l’<b>aire</b> du sol.</p>
<div class="def"><p>L’<b>aire</b> d’une surface est le nombre de carrés-unités qu’il faut pour la recouvrir exactement. Un carré de 1 cm de côté a une aire de <b>1 cm²</b> (on lit « un centimètre carré »). Un carré de 1 m de côté a une aire de 1 m².</p></div>
<div class="why"><p>Un rectangle de 5 cm sur 3 cm contient 3 rangées de 5 carrés de 1 cm². En tout : 3 × 5 = 15 cm². D’où la formule : <b>aire du rectangle = longueur × largeur</b>. Dans un carré, la longueur et la largeur sont égales : <b>aire du carré = côté × côté</b>.</p></div>
<div class="ex"><p>Un écran de 8 cm sur 6 cm : 8 × 6 = 48 cm². Un carré de 7 m de côté : 7 × 7 = 49 m².</p></div>
<div class="warn"><p>Aire et périmètre sont deux choses différentes. Un rectangle de 6 cm sur 2 cm et un carré de 4 cm de côté ont le même périmètre (16 cm), mais pas la même aire (12 cm² contre 16 cm²). Le périmètre est en cm, l’aire en cm².</p></div>
<p>Change les dimensions et compte les carreaux : chaque carreau vaut 1 cm².</p>`,
  params:[{id:'L',l:'Longueur',min:1,max:10,v:5,u:'cm'},{id:'l',l:'Largeur',min:1,max:8,v:3,u:'cm'}],
  draw:v=>rectGrid(v.L,v.l),
  info:v=>`Aire = ${v.L} × ${v.l} = <b>${v.L*v.l} cm²</b> ; périmètre = 2 × (${v.L} + ${v.l}) = ${2*(v.L+v.l)} cm${v.L===v.l?' : c’est un carré.':''}`},
 {kind:'Pratique',h:'Le rectangle mystère',p:'Règle les curseurs pour dessiner un rectangle dont le <b>périmètre vaut 2 dm</b> et dont l’<b>aire vaut 24 cm²</b>. Le quadrillage a des carreaux de 1 cm.',
  params:[{id:'L',l:'Longueur',min:1,max:10,v:5,u:'cm'},{id:'l',l:'Largeur',min:1,max:8,v:3,u:'cm'}],
  draw:v=>rectGrid(v.L,v.l), info:v=>`Rectangle de ${v.L} cm sur ${v.l} cm`,
  ok:v=>v.L*v.l===24&&v.L+v.l===10,
  why:'2 dm = 20 cm, donc longueur + largeur = 10 cm. Parmi les paires qui font 10 (9 et 1, 8 et 2, 7 et 3, 6 et 4, 5 et 5), seule 6 × 4 donne 24 cm².'},
 {kind:'Théorie',h:'Parallélogramme et triangle : découper pour comprendre',p:`<p>Un parallélogramme a l’air penché. Pourtant, avec un seul coup de ciseaux, on le transforme en rectangle sans perdre un morceau.</p>
<div class="def"><p>Dans un parallélogramme, on choisit un côté comme <b>base</b>. La <b>hauteur</b> est la distance entre cette base et le côté opposé. On la mesure sur une <b>perpendiculaire</b> à la base, jamais le long du côté penché.</p></div>
<div class="why"><p>On découpe le triangle qui dépasse à gauche, le long de la hauteur, et on le recolle à droite. On obtient un rectangle de même base et de même hauteur. Donc <b>aire du parallélogramme = base × hauteur</b>.</p></div>
<div class="prop"><p>Une diagonale coupe le parallélogramme en deux triangles identiques. Un triangle est donc la moitié d’un parallélogramme : <b>aire du triangle = base × hauteur ÷ 2</b>. Sa hauteur va du sommet opposé à la base, perpendiculairement à la base : c’est la hauteur que tu as appris à tracer avec l’équerre.</p></div>
<div class="ex"><p>Parallélogramme de base 6 cm et de hauteur 3 cm : 6 × 3 = 18 cm². Triangle de même base et de même hauteur : 18 ÷ 2 = 9 cm².</p></div>
<div class="warn"><p>Si le triangle a un angle obtus, sa hauteur peut tomber <b>en dehors</b> de la base, sur son prolongement. La formule reste la même.</p></div>
<p>Ici, la base mesure 4 cm et la hauteur 3 cm. Bouge le décalage : la figure penche, mais son aire ne change pas.</p>`,
  params:[{id:'s',l:'Décalage du haut',min:-2,max:6,step:.5,v:1.5,u:'cm'},{id:'m',l:'Figure (0 parallélogramme, 1 triangle)',min:0,max:1,v:0}],
  draw:v=>{ const P=plane({x:[-2.6,10.6],y:[-1.1,3.9],w:320,axes:false}), s=v.s;
    if(v.m===0){ if(s>0&&s<=4){ P.poly([[0,0],[s,0],[s,3]],{fill:'var(--spark)',fo:.35,c:'var(--spark)',w:1.5}); P.poly([[4,0],[4+s,0],[4+s,3]],{fill:'var(--spark)',fo:.12,c:'var(--spark)',w:1.5,dash:1}); }
      P.poly([[0,0],[4,0],[4+s,3],[s,3]],{fill:'var(--accent)',fo:.22,c:'var(--accent)',w:3}); }
    else { P.poly([[4,0],[4+s,3],[s,3]],{c:'var(--muted)',w:1.5,dash:1}); P.poly([[0,0],[4,0],[s,3]],{fill:'var(--accent)',fo:.25,c:'var(--accent)',w:3});
      if(s<0) P.seg(s,0,0,0,{c:'var(--muted)',w:1.5,dash:1}); if(s>4) P.seg(4,0,s,0,{c:'var(--muted)',w:1.5,dash:1}); }
    P.seg(s,3,s,0,{c:'var(--other)',w:2,dash:1}); angDroit(P,s,0,s>=4?-1:1,1); P.text(s,1.5,'3',{dx:6,c:'var(--other)',s:12}); P.text(2,0,'base 4',{a:'middle',dy:16,s:12});
    return P.svg(); },
  info:v=>v.m===0?`Aire du parallélogramme = 4 × 3 = <b>12 cm²</b>, quel que soit le décalage.${v.s>0&&v.s<=4?' Le triangle orange passe à droite : on obtient un rectangle 4 × 3.':''}`:`Aire du triangle = 4 × 3 ÷ 2 = <b>6 cm²</b> : la moitié du parallélogramme en pointillés.${v.s<0||v.s>4?' Ici, la hauteur tombe en dehors de la base.':''}`},
 {kind:'Théorie',h:'Losange et trapèze',p:`<p>Un cerf-volant en losange, une rampe de skate vue de côté en trapèze : pour ces formes aussi, découper et recoller donne la formule.</p>
<div class="def"><p>Le <b>losange</b> a quatre côtés égaux ; ses deux <b>diagonales</b> se coupent en leur milieu, à angle droit. Le <b>trapèze</b> a deux côtés parallèles, ses <b>bases</b> : la grande base et la petite base. Sa <b>hauteur</b> est la distance entre les deux bases.</p></div>
<div class="why"><p><b>Losange :</b> trace le rectangle qui l’entoure ; ses côtés sont égaux aux deux diagonales. Les diagonales découpent ce rectangle en 8 petits triangles égaux, dont 4 forment le losange : c’est la moitié. Donc <b>aire du losange = grande diagonale × petite diagonale ÷ 2</b>.</p><p><b>Trapèze :</b> place un deuxième trapèze identique, retourné, à côté du premier. Les deux forment un parallélogramme dont la base est grande base + petite base, avec la même hauteur. Un trapèze en est la moitié : <b>aire du trapèze = (grande base + petite base) × hauteur ÷ 2</b>.</p></div>
<div class="ex"><p>Losange de diagonales 6 cm et 4 cm : 6 × 4 ÷ 2 = 12 cm². Trapèze de bases 6 cm et 3 cm, de hauteur 3 cm : (6 + 3) × 3 ÷ 2 = 27 ÷ 2 = 13,5 cm².</p></div>
<div class="warn"><p>Dans la formule du trapèze, on additionne les bases avant de multiplier : les parenthèses comptent, comme dans les priorités des opérations.</p></div>`,
  fig:(()=>{ const P=plane({x:[-.5,6.5],y:[-.7,4.4],w:220,axes:false}); P.rect(0,0,6,4,{c:'var(--muted)',w:1.5,dash:1}); P.poly([[0,2],[3,0],[6,2],[3,4]],{fill:'var(--accent)',fo:.3,c:'var(--accent)',w:3});
    P.seg(0,2,6,2,{c:'var(--other)',w:2}).seg(3,0,3,4,{c:'var(--other)',w:2}); P.text(4.5,2,'6',{a:'middle',dy:-6,s:12,c:'var(--other)'}).text(3,3,'4',{dx:5,s:12,c:'var(--other)'}).text(3,0,'Losange',{a:'middle',dy:16,s:12});
    const Q=plane({x:[-.5,10],y:[-.7,3.6],w:300,axes:false}); Q.poly([[0,0],[6,0],[4.5,3],[1.5,3]],{fill:'var(--accent)',fo:.3,c:'var(--accent)',w:3}); Q.poly([[6,0],[9,0],[7.5,3],[4.5,3]],{fill:'var(--spark)',fo:.25,c:'var(--spark)',w:2,dash:1});
    Q.seg(1.5,3,1.5,0,{c:'var(--other)',w:2,dash:1}); Q.text(1.5,1.5,'3',{dx:5,s:12,c:'var(--other)'}).text(3,0,'6',{a:'middle',dy:15,s:12}).text(3,3,'3',{a:'middle',dy:-6,s:12}).text(7.5,0,'3',{a:'middle',dy:15,s:12,c:'var(--spark)'}).text(4.5,0,'6 + 3 = 9',{a:'middle',dy:30,s:12});
    return row(P.svg(),Q.svg()); })()},
 {kind:'Méthode',h:'Calculer une aire avec une formule',p:'<b>Quand :</b> la figure est un carré, un rectangle, un parallélogramme, un triangle, un losange ou un trapèze. <b>Pourquoi ça marche :</b> chaque formule vient d’un découpage en rectangle. Elle utilise des longueurs <b>perpendiculaires</b> (une base et sa hauteur, ou les deux diagonales), jamais un côté penché. <b>Comment :</b> 1) reconnais la figure et écris sa formule en mots ; 2) repère la base et la hauteur qui lui est perpendiculaire (le petit carré de l’angle droit) ; 3) mets toutes les longueurs dans la même unité ; 4) remplace et calcule ; 5) réponds par une phrase, avec une unité d’aire (cm², m²…).',
  demo:{enonce:'Une voile a la forme d’un triangle. Sa base mesure 4 m, la hauteur correspondante 150 cm et chacun des deux autres côtés 2,5 m. Quelle est l’aire de la voile&nbsp;?',
   etapes:[
    {f:'C’est un triangle : aire = base × hauteur ÷ 2',w:'On reconnaît la figure et on écrit la formule en mots.'},
    {f:'Base : 4 m. Hauteur : 150 cm = 1,5 m. Les côtés de 2,5 m ne servent pas.',w:'La hauteur est perpendiculaire à la base ; les côtés penchés sont un piège. On met tout en mètres.'},
    {f:'Je calcule l’aire de la voile : 4 × 1,5 ÷ 2 = 6 ÷ 2 = 3',w:'On remplace dans la formule et on calcule.'}],
   conclusion:'Réponse : la voile a une aire de 3 m².'},
  fig:(()=>{ const P=plane({x:[-.6,4.6],y:[-.8,2.1],w:240,axes:false}); P.poly([[0,0],[4,0],[2,1.5]],{fill:'var(--accent)',fo:.25,c:'var(--accent)',w:3}); P.seg(2,1.5,2,0,{c:'var(--other)',w:2,dash:1}); angDroit(P,2,0,1,1,.22);
    P.text(2,0,'4 m',{a:'middle',dy:16,s:12}).text(2,.35,'150 cm',{dx:6,s:12,c:'var(--other)'}).text(.8,.8,'2,5 m',{a:'end',s:12,c:'var(--muted)'}).text(3.2,.8,'2,5 m',{s:12,c:'var(--muted)'}); return P.svg(); })()},
 {h:'La rampe de skate',p:'Le côté d’une rampe de skate a la forme du trapèze ci-dessous : bases de 5 m et 2 m, hauteur de 1,2 m. Le côté oblique mesure environ 3,2 m. Quelle est l’aire de ce côté de la rampe&nbsp;?',
  fig:(()=>{ const P=plane({x:[-.5,6.4],y:[-.6,1.8],w:300,axes:false}); P.poly([[0,0],[5,0],[5,1.2],[3,1.2]],{fill:'var(--accent)',fo:.25,c:'var(--accent)',w:3}); angDroit(P,5,0,-1,1,.2);
    P.text(2.5,0,'5 m',{a:'middle',dy:15,s:12}).text(4,1.2,'2 m',{a:'middle',dy:-6,s:12}).text(5,.6,'1,2 m',{dx:6,s:12,c:'var(--other)'}).text(1.4,.75,'3,2 m',{a:'end',s:12,c:'var(--muted)'}); return P.svg(); })(),
  lab:'Aire =',unit:'m²',ans:4.2,tol:.001,why:'C’est un trapèze : (5 + 2) × 1,2 ÷ 2 = 7 × 1,2 ÷ 2 = 8,4 ÷ 2 = 4,2 m². Le côté oblique ne sert pas : il n’est pas perpendiculaire aux bases.'},
 {kind:'Méthode',h:'Calculer une aire par décomposition',p:'<b>Quand :</b> la figure n’a pas de formule à elle : une pièce en forme de L, une façade de maison, un terrain biscornu. <b>Pourquoi ça marche :</b> si on découpe une surface en morceaux qui ne se chevauchent pas, l’aire totale est la somme des aires des morceaux. Et si on enlève un trou, on soustrait son aire. <b>Comment :</b> 1) découpe la figure en figures connues (rectangles, triangles…), ou complète-la en une grande figure dont tu enlèves des morceaux ; 2) trouve les longueurs manquantes par addition ou soustraction ; 3) calcule l’aire de chaque morceau ; 4) additionne ou soustrais ; 5) réponds avec l’unité.',
  demo:{enonce:'Calculer l’aire de la façade d’une cabane : un rectangle de 6 m sur 3 m, surmonté d’un toit triangulaire de même base et de 2 m de haut. On ne peint pas la porte de 1 m sur 2 m.',
   etapes:[
    {f:'Rectangle : 6 × 3 = 18 m²',w:'Le bas de la façade.'},
    {f:'Toit : 6 × 2 ÷ 2 = 6 m²',w:'Un triangle de base 6 m et de hauteur 2 m.'},
    {f:'Porte : 1 × 2 = 2 m²',w:'Un trou : on le retirera.'},
    {f:'Je calcule l’aire à peindre : 18 + 6 − 2 = 22',w:'On additionne les morceaux et on soustrait le trou.'}],
   conclusion:'Réponse : il faut peindre 22 m² de façade.'},
  fig:(()=>{ const P=plane({x:[-.6,6.8],y:[-.7,5.4],w:250,axes:false}); P.poly([[0,0],[6,0],[6,3],[3,5],[0,3]],{fill:'var(--accent)',fo:.25,c:'var(--accent)',w:3}); P.seg(0,3,6,3,{c:'var(--accent)',w:1.5,dash:1}); P.rect(2.5,0,1,2,{fill:'var(--surface)',fo:1,c:'var(--ink)',w:2});
    P.text(3,0,'6 m',{a:'middle',dy:15,s:12}).text(6,1.5,'3 m',{dx:5,s:12}).text(3,3.9,'2 m',{a:'middle',s:12,c:'var(--other)'}).seg(3,3,3,5,{c:'var(--other)',w:1.5,dash:1}).text(3,1,'porte',{a:'middle',dy:4,s:10,c:'var(--muted)'}); return P.svg(); })()},
 {kind:'Défi',h:'Le terrain de jeu',p:'Calcule l’aire de cette figure. Chaque carreau mesure 1 cm de côté. Cherche la façon la plus rapide&nbsp;: découper en morceaux, ou compléter en un grand rectangle et enlever ce qui manque&nbsp;?',
  fig:(()=>{ const P=plane({x:[-.5,10.5],y:[-.5,6.5],w:300,axes:false}); P.poly([[0,0],[10,0],[10,3],[7,6],[3,6],[3,4],[0,4]],{fill:'var(--accent)',fo:.3,c:'var(--accent)',w:3}); return P.svg(); })(),
  lab:'Aire =',unit:'cm²',ans:49.5,tol:.001,why:'Le grand rectangle qui entoure la figure mesure 10 × 6 = 60 cm². Il manque un rectangle en haut à gauche, 3 × 2 = 6 cm², et un triangle en haut à droite, 3 × 3 ÷ 2 = 4,5 cm². Aire = 60 − 6 − 4,5 = 49,5 cm². Ici, compléter puis soustraire est plus rapide que découper.'},
 {kind:'Théorie',h:'Les unités d’aire, l’are et l’hectare',p:`<p>Un timbre se mesure en cm², une chambre en m², un champ en hectares. Comment passe-t-on d’une unité à l’autre&nbsp;?</p>
<div class="def"><p>Les unités d’aire sont des carrés : 1 m² est l’aire d’un carré de 1 m de côté, 1 dm² celle d’un carré de 1 dm de côté, et ainsi de suite : km², hm², dam², m², dm², cm², mm². Chaque unité vaut <b>100 fois</b> celle qui est juste plus petite.</p></div>
<div class="why"><p>Un carré de 1 dm de côté mesure 10 cm sur 10 cm : il contient 10 × 10 = 100 carrés de 1 cm². Donc 1 dm² = 100 cm², et pas 10.</p></div>
<div class="def"><p>Pour les terrains, on utilise l’<b>are</b> (a) : 1 a = 1 dam² = 100 m², un carré de 10 m de côté. Et l’<b>hectare</b> (ha) : 1 ha = 1 hm² = 100 a = 10 000 m², un carré de 100 m de côté.</p></div>
<div class="ex"><p>1 m² = 100 dm² = 10 000 cm². Un terrain de foot de 105 m sur 68 m : 105 × 68 = 7140 m², soit 71,4 a ou 0,714 ha.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Le mot « are » vient du latin <i>area</i>, qui veut dire « surface ». Il y a plus de 4000 ans, après chaque crue du Nil, les arpenteurs égyptiens remesuraient les champs avec des cordes à nœuds pour calculer les impôts.</p></div>`,
  fig:(()=>{ const P=plane({x:[-.5,10.5],y:[-1.4,10.5],w:220,axes:false}); P.rect(0,0,10,10,{fill:'var(--accent)',fo:.12,c:'var(--accent)',w:3}); P.rect(0,0,1,1,{fill:'var(--spark)',fo:.8,c:'var(--ink)',w:1.5});
    P.text(5,0,'1 dm = 10 cm',{a:'middle',dy:16,s:12}).text(1.2,.5,'1 cm²',{dy:5,s:11}).text(5,5.5,'1 dm²',{a:'middle',s:16}).text(5,4.2,'= 100 cm²',{a:'middle',s:13}); return P.svg(); })()},
 {kind:'Méthode',h:'Convertir une aire',p:'<b>Quand :</b> on doit comparer ou additionner des aires données dans des unités différentes, ou exprimer un terrain en ares ou en hectares. <b>Pourquoi ça marche :</b> une unité d’aire vaut 100 fois la suivante. Dans le tableau, chaque unité a donc <b>deux colonnes</b>, une par chiffre. <b>Comment :</b> 1) écris le chiffre des unités dans la colonne de <b>droite</b> de son unité ; 2) place les autres chiffres, un par colonne ; 3) mets la virgule juste après la colonne de droite de la nouvelle unité, en complétant par des zéros. Raccourci : × 100 à chaque unité vers la droite, ÷ 100 vers la gauche. Les ares sont les dam², les hectares les hm².',
  demo:{enonce:'Convertir 3,5 m² en cm², puis 4200 m² en ares et en hectares.',
   etapes:[
    {f:gtab(AIRES.slice(3),[['','3','5','0','0','0']]),w:'Le chiffre des unités, 3, va dans la colonne de droite des m². Le 5 va dans la colonne suivante, puis on complète par des zéros jusqu’aux cm².'},
    {f:'3,5 m² = 35 000 cm²',w:'La virgule se place après la colonne de droite des cm². Contrôle : deux unités vers la droite, c’est × 100 × 100 = × 10 000.'},
    {f:gtab(AIRES.slice(1,4),[['','0,','4','2','0','0']]),w:'4200 m² : le 0 des unités en colonne de droite des m², puis 0, 2, 4 vers la gauche.'},
    {f:'4200 m² = 42 dam² = 42 a',w:'On veut des dam² : la virgule se place après la colonne de droite des dam². Un pas vers la gauche, c’est ÷ 100.'},
    {f:'42 a = 0,42 hm² = 0,42 ha',w:'Encore un pas vers la gauche : la colonne de droite des hm² est vide, on écrit 0.'}],
   conclusion:'3,5 m² = 35 000 cm² et 4200 m² = 42 a = 0,42 ha.'}},
 {h:'Le jardin partagé',p:'Le jardin de la commune mesure 0,8 ha. On le partage en parcelles de 4 a chacune. Combien de parcelles obtient-on&nbsp;?',lab:'Nombre de parcelles :',ans:20,
  why:'0,8 ha = 80 a, car 1 ha = 100 a. Puis 80 ÷ 4 = 20 parcelles. On peut aussi passer par les m² : 8000 m² ÷ 400 m² = 20.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li><b>Longueurs</b> : km, hm, dam, m, dm, cm, mm. Chaque unité vaut 10 fois la suivante (un chiffre par colonne).</li>
<li><b>Périmètre</b> = longueur du contour = somme des côtés, tous dans la même unité. Carré : 4 × côté. Rectangle : 2 × (longueur + largeur).</li>
<li><b>Aire</b> = nombre de carrés-unités qui recouvrent la surface, en cm², m²…</li>
<li>Rectangle : longueur × largeur. Carré : côté × côté. Parallélogramme : base × hauteur. Triangle : base × hauteur ÷ 2.</li>
<li>Losange : grande diagonale × petite diagonale ÷ 2. Trapèze : (grande base + petite base) × hauteur ÷ 2.</li>
<li>La hauteur est toujours <b>perpendiculaire</b> à la base. Un côté penché n’est pas une hauteur.</li>
<li><b>Décomposition</b> : découpe en figures connues et additionne, ou complète et soustrais.</li>
<li><b>Unités d’aire</b> : × 100 d’une unité à la suivante (deux chiffres par colonne). 1 a = 100 m², 1 ha = 100 a = 10 000 m².</li>
<li>Rédaction : une phrase, le calcul, la réponse en phrase avec l’unité.</li></ul></div>`},
 {kind:'Problème',h:'Du parquet pour la chambre',p:'La chambre de Noé a la forme d’un L : un rectangle de 5 m sur 4 m auquel il manque un coin rectangulaire de 2 m sur 1,5 m (voir la figure). Il veut poser du parquet, vendu en paquets de 2,2 m² à 39 CHF le paquet, et des plinthes (des baguettes au bas des murs) sur tout le tour, sauf devant la porte de 90 cm.',
  fig:(()=>{ const P=plane({x:[-1,6],y:[-.9,4.8],w:280,axes:false}); P.poly([[0,0],[5,0],[5,2.5],[3,2.5],[3,4],[0,4]],{fill:'var(--accent)',fo:.25,c:'var(--accent)',w:3}); P.rect(3,2.5,2,1.5,{c:'var(--muted)',w:1.5,dash:1});
    P.text(2.5,0,'5 m',{a:'middle',dy:15,s:12}).text(0,2,'4 m',{a:'end',dx:-4,s:12}).text(4,4,'2 m',{a:'middle',dy:-6,s:12,c:'var(--muted)'}).text(5,3.25,'1,5 m',{dx:4,s:12,c:'var(--muted)'}).seg(1,0,1.9,0,{c:'var(--spark)',w:6}).text(1.45,0,'porte',{a:'middle',dy:-8,s:11,c:'var(--muted)'}); return P.svg(); })(),
  parts:[
   {q:'a) Quelle est l’aire du sol de la chambre&nbsp;?',unit:'m²',ans:17,tol:.001,hint:'Complète en un grand rectangle de 5 m sur 4 m, puis enlève le coin qui manque.',why:'5 × 4 = 20 m², moins le coin 2 × 1,5 = 3 m² : 20 − 3 = 17 m².'},
   {q:'b) Combien de paquets de parquet faut-il acheter au minimum&nbsp;?',lab:'Paquets :',ans:8,hint:'Divise l’aire par 2,2. Peut-on acheter un morceau de paquet&nbsp;?',why:'17 ÷ 2,2 ≈ 7,7. Avec 7 paquets, on ne couvre que 15,4 m² : il en faut 8.'},
   {q:'c) Quel est le périmètre de la chambre&nbsp;?',unit:'m',ans:18,tol:.001,hint:'Additionne les 6 côtés. Les deux côtés qui manquent se lisent sur la figure : 4 − 1,5 et 5 − 2.',why:'5 + 2,5 + 2 + 1,5 + 3 + 4 = 18 m. Remarque : c’est le même périmètre que le rectangle de 5 × 4, car les marches du L remplacent exactement le coin.'},
   {q:'d) Quelle longueur de plinthes faut-il&nbsp;?',unit:'m',ans:17.1,tol:.001,hint:'Enlève la largeur de la porte, convertie en mètres.',why:'90 cm = 0,9 m, donc 18 − 0,9 = 17,1 m de plinthes.'},
   {q:'e) Combien coûte le parquet&nbsp;?',unit:'CHF',ans:312,hint:'Utilise le nombre de paquets trouvé en b).',why:'8 × 39 = 312 CHF.'}],
  sol:'<p><b>Aire :</b> je complète la chambre en un rectangle de 5 m sur 4 m et j’enlève le coin : 5 × 4 − 2 × 1,5 = 20 − 3 = 17 m².</p><p><b>Parquet :</b> 17 ÷ 2,2 ≈ 7,7 ; on ne vend que des paquets entiers, donc 8 paquets, qui coûtent 8 × 39 = 312 CHF.</p><p><b>Plinthes :</b> le périmètre vaut 5 + 2,5 + 2 + 1,5 + 3 + 4 = 18 m. Sans la porte (0,9 m) : 18 − 0,9 = 17,1 m.</p><p>Réponse : 17 m² de sol, 8 paquets de parquet pour 312 CHF et 17,1 m de plinthes.</p>'},
 {kind:'Problème',h:'Le champ du festival',p:'Un festival de musique loue un champ en forme de trapèze. Ses deux côtés parallèles mesurent 120 m et 80 m, et ils sont distants de 60 m. La location coûte 250 CHF par are. La scène occupe un rectangle de 25 m sur 12 m. Pour la sécurité, on compte au plus 2 spectateurs par m² sur le reste du champ. Le tour du champ mesure environ 332 m et on le ferme avec des barrières de 2,5 m.',
  fig:(()=>{ const P=plane({x:[-8,128],y:[-14,72],w:300,grid:false,axes:false}); P.poly([[0,0],[120,0],[80,60],[0,60]],{fill:'var(--ok)',fo:.2,c:'var(--ok)',w:3}); P.rect(5,40,25,12,{fill:'var(--spark)',fo:.5,c:'var(--ink)',w:1.5}); angDroit(P,0,0,1,1,6);
    P.text(60,0,'120 m',{a:'middle',dy:15,s:12}).text(40,60,'80 m',{a:'middle',dy:-6,s:12}).text(0,30,'60 m',{a:'end',dx:-4,s:12}).text(17.5,46,'scène',{a:'middle',dy:4,s:11}); return P.svg(); })(),
  parts:[
   {q:'a) Quelle est l’aire du champ&nbsp;?',unit:'m²',ans:6000,hint:'C’est un trapèze : additionne les bases, multiplie par la hauteur, divise par 2.',why:'(120 + 80) × 60 ÷ 2 = 200 × 60 ÷ 2 = 6000 m².'},
   {q:'b) Combien coûte la location&nbsp;?',unit:'CHF',ans:15000,hint:'Convertis d’abord l’aire en ares : 1 a = 100 m².',why:'6000 m² = 60 a, et 60 × 250 = 15 000 CHF.'},
   {q:'c) Combien de spectateurs au plus peut-on accueillir&nbsp;?',lab:'Spectateurs :',ans:11400,hint:'Enlève d’abord l’aire de la scène.',why:'Scène : 25 × 12 = 300 m². Reste 6000 − 300 = 5700 m², donc 5700 × 2 = 11 400 spectateurs.'},
   {q:'d) Combien de barrières faut-il au minimum pour faire le tour&nbsp;?',lab:'Barrières :',ans:133,hint:'Divise le tour par la longueur d’une barrière. Un bout de barrière ne suffit pas à fermer un trou.',why:'332 ÷ 2,5 = 132,8. Avec 132 barrières, il manque 0,5 m : il en faut 133.'}],
  sol:'<p><b>Aire du champ :</b> c’est un trapèze, (120 + 80) × 60 ÷ 2 = 6000 m².</p><p><b>Location :</b> 6000 m² = 60 a ; 60 × 250 = 15 000 CHF.</p><p><b>Spectateurs :</b> la scène prend 25 × 12 = 300 m². Il reste 5700 m², soit au plus 5700 × 2 = 11 400 personnes.</p><p><b>Barrières :</b> 332 ÷ 2,5 = 132,8, on arrondit au-dessus : 133 barrières.</p><p>Réponse : 6000 m², 15 000 CHF de location, 11 400 spectateurs au plus et 133 barrières.</p>'},
]},

/* ============================== SOLIDES ============================== */
{subj:'sec', sem:'a9', id:'sec9-solides', o:10, h:'Solides', p:'Reconnaître et décrire les solides, les dessiner en perspective, les déplier en patrons et les regarder de face, de dessus et de côté.', steps:[
 {kind:'Théorie',h:'Faces, arêtes et sommets',p:`<p>Prends un dé à jouer. Il a des côtés plats, des bords bien droits et des coins pointus. Ces trois éléments ont un nom, et on les retrouve sur tous les solides à faces plates.</p>
<div class="def"><p>Une <b>face</b> est une surface plate qui limite le solide (les côtés du dé). Une <b>arête</b> est un segment où deux faces se rencontrent (les bords). Un <b>sommet</b> est un point où plusieurs arêtes se rencontrent (les coins).</p></div>
<div class="idea"><p>Pense à une boîte en carton : les faces sont les morceaux de carton, les arêtes sont les plis et les bords collés, les sommets sont les coins. Sur un dessin, les arêtes cachées derrière le solide se tracent en <b>pointillés</b> : on sait qu’elles sont là, même si on ne les voit pas.</p></div>
<div class="ex"><p>Le cube (le dé) a <b>6 faces</b> carrées, <b>12 arêtes</b> et <b>8 sommets</b>. Pour compter les arêtes sans en oublier : 4 en bas, 4 en haut et 4 debout, 4 + 4 + 4 = 12. Pour les sommets : 4 en bas et 4 en haut.</p></div>
<p>Fais tourner le cube et choisis ce que tu veux voir en couleur.</p>`,
  params:[{id:'az',l:'Tourner',min:0,max:350,step:10,v:30,u:'°'},{id:'m',l:'Montrer (0 faces, 1 arêtes, 2 sommets)',min:0,max:2,v:0}],
  draw:v=>{ const V=boxV(2.6,2.6,2.6), S=solid(V,BOXF,{az:v.az,el:24,r:3,fill:v.m===0?'var(--spark)':'var(--accent)',fo:v.m===0?.35:.12,ec:v.m===1?'var(--other)':'var(--ink)',w2:v.m===1?4:2.5,hc:v.m===1?'var(--other)':'var(--muted)',hw:v.m===1?2.5:1.6});
    if(v.m===2) V.forEach(p=>S.dot(p,{r:6,c:'var(--other)'})); return S.svg(); },
  info:v=>{ const n=solid(boxV(2.6,2.6,2.6),BOXF,{az:v.az,el:24}).nvis; return v.m===0?`6 faces : ${n} visibles, ${6-n} cachées.`:v.m===1?'12 arêtes : 4 en bas, 4 en haut, 4 debout. Les cachées sont en pointillés.':'8 sommets : 4 en bas, 4 en haut.'; }},
 {kind:'Théorie',h:'Polyèdre ou pas ?',p:`<p>Un dé, une brique de lait, une boîte de Toblerone, une canette : lesquels pourraient rouler sur la table&nbsp;?</p>
<div class="def"><p>Un <b>polyèdre</b> est un solide dont toutes les faces sont des <b>polygones</b> plats : triangles, carrés, rectangles… Le mot vient du grec : « poly » veut dire plusieurs, « èdre » veut dire face.</p></div>
<div class="idea"><p>Un polyèdre n’a que des faces plates et des arêtes droites. Un solide qui a une surface <b>courbe</b>, comme la canette (un <b>cylindre</b>) ou un ballon (une <b>boule</b>), n’est pas un polyèdre : c’est la partie courbe qui lui permet de rouler.</p></div>
<div class="ex"><p>Le dé (un cube), la brique de lait (un pavé), la boîte de Toblerone (un prisme) et une pyramide sont des polyèdres. Le cylindre n’en est pas un : il a deux disques plats, mais aussi une face courbe.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Il n’existe que <b>5 polyèdres réguliers</b>, dont toutes les faces sont le même polygone régulier : le tétraèdre (4 faces), le cube (6), l’octaèdre (8), le dodécaèdre (12) et l’icosaèdre (20). Le philosophe grec Platon les décrivait déjà il y a 2400 ans. On les retrouve dans les dés des jeux de rôle.</p></div>`,
  fig:(()=>{ const o={w:150,r:3}, a=solid(boxV(2.4,2.4,2.4),BOXF,{...o,az:30}), b=drawPyr(4,30,{w:150}), c=drawPrism(3,20,{w:150}), d=drawPrism(11,30,{w:150});
    a.text([0,0,-2.4],'cube',{a:'middle',s:14}); b.text([0,0,-2.4],'pyramide',{a:'middle',s:14}); c.text([0,0,-2.4],'prisme',{a:'middle',s:14}); d.text([0,0,-2.4],'cylindre',{a:'middle',s:14});
    return row(a.svg(),b.svg(),c.svg(),d.svg()); })()},
 {kind:'Théorie',h:'Le cube et le pavé',p:`<p>Brique de lait, boîte à chaussures, brique de Lego, salle de classe : le solide le plus courant autour de toi est le <b>pavé</b>.</p>
<div class="def"><p>Un <b>pavé</b> (on dit aussi <b>parallélépipède rectangle</b>) est un polyèdre à 6 faces qui sont toutes des <b>rectangles</b>. Ses trois dimensions sont la <b>longueur</b>, la <b>largeur</b> et la <b>hauteur</b>. Un <b>cube</b> est un pavé dont les trois dimensions sont égales : ses 6 faces sont des carrés identiques.</p></div>
<div class="prop"><p>Comme le cube, le pavé a 6 faces, 12 arêtes et 8 sommets. Ses faces opposées sont identiques et parallèles. Ses 12 arêtes forment 3 groupes de 4 arêtes parallèles et de même longueur : 4 longueurs, 4 largeurs, 4 hauteurs.</p></div>
<div class="ex"><p>Une boîte de 5 cm sur 3 cm sur 2 cm a 2 faces de 5 × 3, 2 faces de 5 × 2 et 2 faces de 3 × 2. Longueur totale de ses arêtes : 4 × 5 + 4 × 3 + 4 × 2 = 20 + 12 + 8 = 40 cm.</p></div>
<div class="warn"><p>Un cube est un pavé particulier, mais un pavé n’est pas toujours un cube.</p></div>
<p>Règle les trois dimensions. Quand elles sont égales, le pavé devient un cube.</p>`,
  params:[{id:'L',l:'Longueur',min:1,max:4,step:.5,v:3.5,u:'cm'},{id:'l',l:'Largeur',min:1,max:4,step:.5,v:2,u:'cm'},{id:'h',l:'Hauteur',min:1,max:4,step:.5,v:1.5,u:'cm'}],
  draw:v=>{ const V=boxV(v.l,v.L,v.h), S=solid(V,BOXF,{az:35,el:22,r:3.6,fc:k=>k<2?'var(--spark)':k===2||k===4?'var(--accent)':'var(--math)',fo:.25});
    S.text([v.l/2,0,-v.h/2],fmt(v.L),{a:'middle',dy:18,s:12}).text([v.l/2,v.L/2,0],fmt(v.h),{dx:8,s:12}).text([0,v.L/2,-v.h/2],fmt(v.l),{dx:10,dy:14,s:12}); return S.svg(); },
  info:v=>`Pavé ${fmt(v.L)} × ${fmt(v.l)} × ${fmt(v.h)} : arêtes 4 × ${fmt(v.L)} + 4 × ${fmt(v.l)} + 4 × ${fmt(v.h)} = <b>${fmt(4*(v.L+v.l+v.h))} cm</b>${v.L===v.l&&v.l===v.h?'. Les trois dimensions sont égales : c’est un cube !':''}`},
 {kind:'Théorie',h:'Le prisme droit et le cylindre',p:`<p>La boîte de Toblerone, un crayon à six pans, une tente canadienne : ces objets ont la même forme d’un bout à l’autre. Si tu les coupes en tranches parallèles aux bouts, chaque tranche est identique.</p>
<div class="def"><p>Un <b>prisme droit</b> est un polyèdre qui a deux <b>bases</b> : deux polygones identiques et parallèles, face à face. Ses autres faces, les <b>faces latérales</b>, sont des <b>rectangles</b> perpendiculaires aux bases. La <b>hauteur</b> du prisme est la distance entre les deux bases. On le nomme d’après sa base : prisme à base triangulaire, à base hexagonale…</p></div>
<div class="idea"><p>Un prisme, c’est un polygone qu’on fait glisser tout droit : il laisse derrière lui un solide. Le pavé est un prisme droit à base rectangulaire.</p></div>
<div class="def"><p>Si la base est un <b>disque</b>, on obtient un <b>cylindre</b> (canette, tuyau, rouleau). Il a deux bases en disque et une face latérale courbe : ce n’est pas un polyèdre.</p></div>
<div class="ex"><p>Le Toblerone est un prisme à base triangulaire : 2 bases + 3 faces latérales = 5 faces. Le crayon à 6 pans : 2 + 6 = 8 faces.</p></div>
<p>Augmente le nombre de côtés de la base (en orange) : le prisme ressemble de plus en plus à un cylindre. Au bout du curseur, c’est le cylindre.</p>`,
  params:[{id:'n',l:'Côtés de la base (11 = cylindre)',min:3,max:11,v:3},{id:'az',l:'Tourner',min:0,max:345,step:15,v:30,u:'°'}],
  draw:v=>drawPrism(v.n,v.az).svg(),
  info:v=>v.n>10?'<b>Cylindre</b> : 2 bases en disque et une face courbe. Ce n’est pas un polyèdre.':`Prisme à base de ${v.n} côtés : <b>${v.n+2} faces</b> (2 bases + ${v.n} rectangles), <b>${3*v.n} arêtes</b>, <b>${2*v.n} sommets</b>.`},
 {kind:'Théorie',h:'La pyramide',p:`<p>Les pyramides d’Égypte, la pyramide de verre du Louvre à Paris, le toit pointu d’une tour de château : toutes ont une base et une pointe.</p>
<div class="def"><p>Une <b>pyramide</b> est un polyèdre formé d’une <b>base</b>, qui est un polygone, et de faces latérales <b>triangulaires</b> qui se rejoignent toutes en un même point : le <b>sommet</b> de la pyramide (on dit aussi l’apex).</p></div>
<div class="idea"><p>Relie chaque sommet de la base à un point placé au-dessus : chaque côté de la base donne un triangle. Une pyramide a donc autant de faces latérales que sa base a de côtés.</p></div>
<div class="ex"><p>Pyramide à base carrée, comme celles d’Égypte : 1 base + 4 triangles = 5 faces ; 4 arêtes sur la base + 4 qui montent au sommet = 8 arêtes ; 4 sommets sur la base + 1 en haut = 5 sommets.</p></div>
<div class="warn"><p>Une pyramide n’a qu’<b>une seule base</b>. Le prisme en a deux.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>La grande pyramide de Khéops, en Égypte, a une base carrée d’environ 230 m de côté. Construite il y a environ 4500 ans, elle est restée le plus haut monument du monde pendant près de 3800 ans.</p></div>`,
  params:[{id:'n',l:'Côtés de la base',min:3,max:8,v:4},{id:'az',l:'Tourner',min:0,max:345,step:15,v:30,u:'°'}],
  draw:v=>drawPyr(v.n,v.az).svg(),
  info:v=>`Pyramide à base de ${v.n} côtés : <b>${v.n+1} faces</b> (1 base + ${v.n} triangles), <b>${2*v.n} arêtes</b>, <b>${v.n+1} sommets</b>.`},
 {kind:'Méthode',h:'Compter faces, arêtes et sommets',p:`<b>Quand :</b> on doit décrire un prisme ou une pyramide, ou vérifier un dessin. <b>Pourquoi ça marche :</b> tout dépend du nombre de côtés de la base. Dans un prisme, la base du bas et celle du haut ont chacune autant de côtés et de sommets, et chaque sommet du bas est relié à celui du haut par une arête debout. Dans une pyramide, chaque sommet de la base est relié au sommet du haut. <b>Comment :</b> compte par étages : ce qu’il y a en bas, ce qu’il y a en haut, et ce qui relie les deux.
${tab([['',"Faces","Arêtes","Sommets"],['Prisme','côtés + 2','3 × côtés','2 × côtés'],['Pyramide','côtés + 1','2 × côtés','côtés + 1']])}`,
  demo:{enonce:'Compter les faces, les arêtes et les sommets d’un prisme droit à base pentagonale (une base à 5 côtés).',
   etapes:[
    {f:'Faces : 2 bases + 5 rectangles = 7 faces',w:'Chaque côté de la base porte une face latérale.'},
    {f:'Arêtes : 5 en bas + 5 en haut + 5 debout = 15 arêtes',w:'On compte par étages, comme pour le cube.'},
    {f:'Sommets : 5 en bas + 5 en haut = 10 sommets',w:'Il n’y a aucun sommet entre les deux bases.'},
    {f:'Contrôle avec le tableau : 5 + 2 = 7, 3 × 5 = 15, 2 × 5 = 10',w:'Les deux façons de compter donnent le même résultat.'}],
   conclusion:'Le prisme à base pentagonale a 7 faces, 15 arêtes et 10 sommets.'},
  fig:drawPrism(5,25).svg()},
 {h:'La lanterne',p:'Une lanterne a la forme d’une pyramide à base hexagonale (6 côtés). Combien a-t-elle d’arêtes&nbsp;?',fig:drawPyr(6,20).svg(),lab:'Arêtes :',ans:12,
  why:'6 arêtes sur la base et 6 qui montent au sommet : 6 + 6 = 12, soit 2 × 6.'},
 {kind:'Théorie',h:'La perspective cavalière',p:`<p>Comment dessiner une boîte en relief sur une feuille plate&nbsp;? Les dessinateurs de BD, d’architecture ou de jeux vidéo suivent des règles. La plus simple s’appelle la <b>perspective cavalière</b>.</p>
<div class="def"><p>Règles de la perspective cavalière : 1) la face de devant est dessinée en <b>vraie grandeur</b>, avec ses vraies mesures et ses angles droits ; 2) les arêtes qui partent vers l’arrière, les <b>fuyantes</b>, sont toutes <b>parallèles</b> et font le même angle avec l’horizontale (souvent 45°) ; 3) les fuyantes sont <b>raccourcies</b> : on multiplie leur vraie longueur par un <b>coefficient</b> (souvent 0,5) ; 4) les arêtes <b>cachées</b> sont en <b>pointillés</b>.</p></div>
<div class="idea"><p>Raccourcir les fuyantes donne l’impression de profondeur, car notre œil voit plus petit ce qui est loin. Deux arêtes parallèles dans la réalité restent parallèles sur le dessin.</p></div>
<div class="ex"><p>Un cube de 4 cm, fuyantes à 45° avec un coefficient de 0,5 : la face avant est un carré de 4 cm et chaque fuyante mesure 4 × 0,5 = 2 cm sur le dessin.</p></div>
<div class="warn"><p>Sur le dessin, les fuyantes ne mesurent pas leur vraie longueur et les faces de côté ne sont plus des rectangles. On ne mesure donc jamais une profondeur directement sur le dessin.</p></div>
<p>Change l’angle et le coefficient : c’est toujours le même cube de 4 cm.</p>`,
  params:[{id:'al',l:'Angle des fuyantes',min:15,max:75,step:15,v:45,u:'°'},{id:'k',l:'Coefficient',min:.3,max:1,step:.1,v:.5}],
  draw:v=>cav(4,4,4,v.al,v.k,{xm:8.6,ym:8.6}).svg(),
  info:v=>`Fuyantes à ${v.al}°, coefficient ${fmt(v.k)} : la profondeur de 4 cm est dessinée avec 4 × ${fmt(v.k)} = <b>${fmt(4*v.k)} cm</b>.`},
 {kind:'Méthode',h:'Dessiner un pavé en perspective cavalière',p:'<b>Quand :</b> on veut représenter un pavé ou un cube sur papier. <b>Pourquoi ça marche :</b> la face avant garde ses vraies mesures, et toutes les fuyantes ont la même direction et le même raccourcissement : la face arrière est une copie de la face avant, décalée en biais. <b>Comment :</b> 1) dessine la face avant en vraie grandeur ; 2) calcule la longueur dessinée des fuyantes : profondeur × coefficient ; 3) depuis chaque sommet, trace une fuyante avec le bon angle ; 4) relie les extrémités : c’est la face arrière ; 5) repasse en pointillés les 3 arêtes cachées, celles qui partent du sommet arrière caché. Sur papier quadrillé, la diagonale d’un carreau donne un angle de 45°.',
  demo:{enonce:'Dessiner un pavé de 6 cm de long, 3 cm de haut et 4 cm de profondeur, avec des fuyantes à 45° et un coefficient de 0,5.',
   etapes:[
    {f:'Face avant : un rectangle de 6 cm sur 3 cm',w:'En vraie grandeur, avec des angles droits.'},
    {f:'Fuyantes : 4 × 0,5 = 2 cm, à 45° vers le haut à droite',w:'On calcule la longueur dessinée de la profondeur.'},
    {f:'Face arrière : le même rectangle de 6 × 3, décalé de 2 cm en biais',w:'On relie les bouts des fuyantes.'},
    {f:'Pointillés : les 3 arêtes qui partent du sommet arrière en bas à gauche',w:'Ce sommet est caché derrière la face avant.'}],
   conclusion:'Le dessin montre 9 arêtes en trait plein et 3 en pointillés : 12 arêtes en tout.'},
  fig:cav(6,3,4,45,.5,{xm:8.5,ym:5}).svg()},
 {kind:'Pratique',h:'Dessine la boîte',p:'Règle les curseurs pour dessiner en perspective cavalière une boîte de <b>5 cm de long</b>, <b>2 cm de haut</b> et <b>6 cm de profondeur</b>, avec des fuyantes à <b>45°</b> et un coefficient de <b>0,5</b>. Les carreaux mesurent 1 cm.',
  params:[{id:'L',l:'Face avant : largeur dessinée',min:1,max:6,v:4,u:'cm'},{id:'H',l:'Face avant : hauteur dessinée',min:1,max:5,v:3,u:'cm'},{id:'f',l:'Fuyantes : longueur dessinée',min:.5,max:6,step:.5,v:6,u:'cm'},{id:'al',l:'Angle des fuyantes',min:15,max:75,step:15,v:30,u:'°'}],
  draw:v=>cav(v.L,v.H,v.f,v.al,1,{xm:12,ym:10.5}).svg(),
  ok:v=>v.L===5&&v.H===2&&v.f===3&&v.al===45,
  why:'La face avant est en vraie grandeur : 5 cm sur 2 cm. Les fuyantes sont raccourcies : 6 × 0,5 = 3 cm, à 45°. Dessiner 6 cm de fuyante est l’erreur classique.'},
 {kind:'Théorie',h:'Le développement d’un solide',p:`<p>Une boîte de céréales, avant d’être pliée, est une grande feuille de carton découpée. Si tu la déplies à plat, tu obtiens son <b>développement</b>.</p>
<div class="def"><p>Le <b>développement</b> (ou <b>patron</b>) d’un polyèdre est une figure plane, d’un seul morceau, qu’on peut découper puis plier le long des arêtes pour fabriquer le solide, sans trou ni superposition. Il contient <b>toutes les faces</b> du solide, chacune une seule fois.</p></div>
<div class="idea"><p>Chaque pli suit une arête : deux faces voisines sur le patron partagent une arête du solide. Deux bords qui se touchent après le pliage doivent avoir la même longueur.</p></div>
<div class="ex"><p>Le patron d’un cube compte 6 carrés. Celui d’un pavé : 6 rectangles, identiques deux par deux. Celui d’un prisme à base triangulaire : 2 triangles et 3 rectangles. Celui d’une pyramide à base carrée : 1 carré et 4 triangles.</p></div>
<div class="warn"><p>Un même solide a plusieurs patrons : le cube en a 11 différents ! Et 6 carrés collés ne forment pas toujours un patron de cube.</p></div>
<p>Choisis un solide, puis fais glisser le pliage de 0 % (à plat) à 100 % (fermé).</p>`,
  params:[{id:'s',l:'Solide (1 cube, 2 pavé, 3 prisme, 4 pyramide)',min:1,max:4,v:1},{id:'t',l:'Pliage',min:0,max:100,step:10,v:30,u:'%'}],
  draw:v=>{ const N=NETS[v.s-1]; return foldFig(N.f,v.t/100,{r:N.r,s:N.s}); },
  info:v=>{ const N=NETS[v.s-1]; return `<b>${N.h}</b> : patron de ${N.i}.${v.t===100?' Le solide est fermé.':''}`; }},
 {kind:'Méthode',h:'Reconnaître un patron de cube',p:`<b>Quand :</b> on te montre 6 carrés assemblés et on te demande s’ils se replient en cube. <b>Pourquoi ça marche :</b> quand on plie une rangée de 4 carrés, elle s’enroule et fait le tour du cube : elle forme les 4 faces latérales. Les 2 dernières faces, le dessus et le dessous, doivent donc être de part et d’autre de la rangée. <b>Comment :</b> 1) vérifie qu’il y a 6 carrés ; 2) cherche les signaux d’alarme : 5 carrés en ligne, ou un bloc de 2 × 2 carrés, et ce n’est pas un patron ; 3) repère les faces <b>opposées</b> : dans une rangée, deux carrés séparés par un seul carré seront opposés ; 4) chaque face doit avoir exactement une face opposée. Si deux carrés tombent au même endroit quand tu replies en pensée, ce n’est pas un patron.`,
  demo:{enonce:'Les 6 carrés numérotés de la figure forment-ils un patron de cube&nbsp;?',
   etapes:[
    {f:'6 carrés, ni 5 en ligne ni bloc de 2 × 2',w:'Aucun signal d’alarme : on continue.'},
    {f:'Rangée 2-3-4-5 : 2 et 4 sont opposées, 3 et 5 aussi',w:'Dans la rangée, un carré sur deux est opposé. La rangée fait le tour du cube.'},
    {f:'1 est au-dessus de la rangée, 6 en dessous',w:'L’un devient le dessus, l’autre le dessous : ils sont de part et d’autre de la rangée.'},
    {f:'1 et 6 sont opposées',w:'Chaque face a exactement une face opposée.'}],
   conclusion:'Oui, c’est un patron de cube. Faces opposées : 2 et 4, 3 et 5, 1 et 6.'},
  fig:netFig([[0,2],[0,1],[1,1],[2,1],[3,1],[2,0]],{lab:['1','2','3','4','5','6'],w:180})},
 {kind:'Pratique',h:'Le carré qui manque',p:'Cinq carrés sont déjà posés. Choisis où placer le 6e carré (en orange) pour obtenir un patron de cube, puis replie pour vérifier.',
  params:[{id:'c',l:'Position du 6e carré',min:1,max:8,v:6},{id:'t',l:'Pliage',min:0,max:100,step:10,v:0,u:'%'}],
  draw:v=>{ const cells=[...BASE5,CAND[v.c-1]]; return foldFig(cellNet(cells),v.t/100,{r:4.2,s:1.6,az:-40,col:k=>k===5?'var(--spark)':'var(--accent)'}); },
  info:v=>v.t===100?(CANDOK[v.c-1]?'Le cube est bien fermé.':'Deux faces se superposent et il reste un trou : ce n’est pas un patron.'):'Pousse le pliage jusqu’à 100 % pour vérifier.',
  ok:v=>CANDOK[v.c-1],
  why:'La rangée de 4 carrés fait le tour du cube et le carré du dessus est déjà placé au-dessus de la rangée. Le 6e carré doit donc aller en dessous de la rangée, à n’importe laquelle des 4 places.'},
 {kind:'Théorie',h:'Vues de face, de dessus et de côté',p:`<p>Dans un jeu vidéo de construction, tu peux regarder ta maison de face, d’en haut ou de côté. Les architectes font pareil : ils dessinent un objet vu sous trois angles.</p>
<div class="def"><p>La <b>vue de face</b> est ce qu’on voit en regardant l’objet bien en face, à hauteur des yeux. La <b>vue de dessus</b> est ce qu’on voit d’en haut, comme un oiseau. La <b>vue de côté</b> (ici, de droite) est ce qu’on voit depuis la droite. Chaque vue est une figure plane, sans perspective.</p></div>
<div class="idea"><p>Dans une vue, la profondeur disparaît : un cube placé derrière un autre est caché. Pour un assemblage de cubes, la vue de face donne, pour chaque colonne, la hauteur de la plus haute pile.</p></div>
<div class="ex"><p>Une pile de 3 cubes posée devant un cube seul : de face, on voit une colonne de 3 carrés, car le cube seul est caché derrière. De dessus, on voit 2 carrés, l’un derrière l’autre. De côté, on voit une colonne de 3 carrés à côté d’un carré seul.</p></div>
<div class="warn"><p>Une seule vue ne suffit pas toujours pour connaître l’objet : des cubes peuvent se cacher. Avec deux ou trois vues, on en sait beaucoup plus.</p></div>
<p>Fais tourner l’assemblage et choisis une vue : la flèche montre d’où on regarde.</p>`,
  params:[{id:'az',l:'Tourner',min:0,max:90,step:10,v:30,u:'°'},{id:'w',l:'Vue (0 de face, 1 de dessus, 2 de côté)',min:0,max:2,v:0}],
  draw:v=>{ const h=[[1,3,1],[2,1,0]], S=cubes(stack(h),{az:v.az,el:28,r:4.2});
    const A=[[[3.6,0,0],[1.4,0,0]],[[0,0,3.8],[0,0,1.9]],[[0,3.6,0],[0,1.8,0]]][v.w]; S.arrow(A[0],A[1],{c:'var(--other)',w:3,hs:10});
    return row(S.svg(),v.w===0?viewFig(vFace(h),{t:'de face',w:120}):v.w===1?topFig(h,{t:'de dessus',w:120}):viewFig(vCote(h),{t:'de côté',w:120})); },
  info:v=>['Vue de face : 3 colonnes de hauteurs 2, 3 et 1 (on voit la plus haute pile de chaque colonne).','Vue de dessus : 5 carrés, un par pile. Le fond est en haut du dessin.','Vue de côté (de droite) : l’avant est à gauche. Rangée de devant : 2 ; rangée du fond : 3.'][v.w]},
 {kind:'Défi',h:'Le moins de cubes possible',p:`Un assemblage de cubes posé sur 4 cases (2 rangées de 2) a les deux vues ci-dessous. Règle les hauteurs des 4 piles pour retrouver ces vues avec <b>le moins de cubes possible</b>. Chaque pile a au moins 1 cube.${row(viewFig([3,2],{t:'de face',w:110}),viewFig([2,3],{t:'de côté',w:110}))}`,
  params:[{id:'a',l:'Fond gauche',min:1,max:3,v:1},{id:'b',l:'Fond droite',min:1,max:3,v:1},{id:'c',l:'Devant gauche',min:1,max:3,v:1},{id:'d',l:'Devant droite',min:1,max:3,v:1}],
  draw:v=>{ const h=[[v.a,v.b],[v.c,v.d]]; return row(cubes(stack(h),{az:30,el:28,r:3.4,box:[2,2,3]}).svg(),viewFig(vFace(h),{t:'de face',w:90}),viewFig(vCote(h),{t:'de côté',w:90})); },
  info:v=>`Total : ${v.a+v.b+v.c+v.d} cubes.`,
  ok:v=>{ const h=[[v.a,v.b],[v.c,v.d]], f=vFace(h), s=vCote(h); return f[0]===3&&f[1]===2&&s[0]===2&&s[1]===3&&v.a+v.b+v.c+v.d===7; },
  why:'Le seul endroit qui peut donner les deux « 3 » est la pile du fond à gauche : elle est dans la colonne de gauche (vue de face) et dans la rangée du fond (vue de côté). Une seule pile de 2, devant à droite, donne ensuite les deux « 2 ». Total : 3 + 1 + 1 + 2 = 7 cubes. Stratégie : commencer par la case la plus contrainte.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li><b>Face</b> : surface plate ; <b>arête</b> : segment où deux faces se rencontrent ; <b>sommet</b> : point où des arêtes se rencontrent.</li>
<li>Un <b>polyèdre</b> n’a que des faces plates (polygones). Le cylindre et la boule ne sont pas des polyèdres.</li>
<li><b>Pavé</b> : 6 faces rectangulaires, 12 arêtes, 8 sommets. Le <b>cube</b> est un pavé aux 3 dimensions égales.</li>
<li><b>Prisme droit</b> : 2 bases identiques et parallèles, faces latérales rectangulaires. Faces : côtés + 2 ; arêtes : 3 × côtés ; sommets : 2 × côtés.</li>
<li><b>Pyramide</b> : 1 base, faces latérales triangulaires réunies au sommet. Faces : côtés + 1 ; arêtes : 2 × côtés ; sommets : côtés + 1.</li>
<li><b>Perspective cavalière</b> : face avant en vraie grandeur, fuyantes parallèles et raccourcies (profondeur × coefficient), arêtes cachées en pointillés.</li>
<li><b>Patron</b> : une seule pièce, toutes les faces une fois. Cube : pas 5 carrés en ligne, pas de bloc 2 × 2 ; chaque face a une seule face opposée.</li>
<li><b>Vues</b> de face, de dessus, de côté : figures planes, la profondeur disparaît.</li></ul></div>`},
 {kind:'Problème',h:'La boîte à pizza',p:'Une pizzeria fait fabriquer des boîtes en forme de pavé de 32 cm de long, 32 cm de large et 4 cm de haut. Pour les renforcer, on colle du ruban adhésif sur toutes les arêtes. Le patron est découpé dans du carton (on ne compte pas les rabats de collage). Sur la fiche technique, la boîte est dessinée en perspective cavalière à l’échelle 1:4, avec un coefficient de 0,5.',
  fig:solid(boxV(3.2,3.2,.4),BOXF,{az:30,el:28,r:2.6,fc:k=>k<2?'var(--spark)':'var(--accent)',fo:.25}).svg(),
  parts:[
   {q:'a) Combien de faces de la boîte ne sont pas des carrés&nbsp;?',lab:'Faces :',ans:4,hint:'Le dessus et le dessous mesurent 32 × 32. Et les 4 côtés&nbsp;?',why:'Le dessus et le dessous sont des carrés de 32 cm ; les 4 faces de côté sont des rectangles de 32 cm sur 4 cm.'},
   {q:'b) Quelle longueur de ruban adhésif faut-il pour toutes les arêtes&nbsp;?',unit:'cm',ans:272,hint:'Un pavé a 4 longueurs, 4 largeurs et 4 hauteurs.',why:'4 × 32 + 4 × 32 + 4 × 4 = 128 + 128 + 16 = 272 cm.'},
   {q:'c) Quelle aire de carton faut-il pour le patron&nbsp;?',unit:'cm²',ans:2560,hint:'Additionne les aires des 6 faces : 2 carrés et 4 rectangles.',why:'2 × (32 × 32) + 4 × (32 × 4) = 2048 + 512 = 2560 cm².'},
   {q:'d) Sur la fiche technique, quelle longueur ont les fuyantes&nbsp;?',unit:'cm',ans:4,hint:'À l’échelle 1:4, 1 cm sur le dessin représente 4 cm en vrai. Puis applique le coefficient.',why:'La profondeur de 32 cm devient 32 ÷ 4 = 8 cm à l’échelle, puis 8 × 0,5 = 4 cm de fuyante.'}],
  sol:'<p>La boîte est un pavé de 32 × 32 × 4 cm. Le dessus et le dessous sont des carrés ; les <b>4</b> faces de côté sont des rectangles de 32 × 4.</p><p><b>Ruban :</b> 12 arêtes, soit 4 × 32 + 4 × 32 + 4 × 4 = 272 cm.</p><p><b>Carton :</b> 2 × 32 × 32 + 4 × 32 × 4 = 2048 + 512 = 2560 cm².</p><p><b>Dessin :</b> à l’échelle 1:4, la profondeur mesure 32 ÷ 4 = 8 cm ; avec le coefficient 0,5, la fuyante mesure 8 × 0,5 = 4 cm. La face avant, elle, mesure 8 cm sur 1 cm.</p>'},
 {kind:'Problème',h:'La maison du jeu',p:'Dans un jeu vidéo, une maison est un cube surmonté d’un toit en forme de pyramide à base carrée. La base de la pyramide est collée exactement sur la face du dessus du cube : cette face disparaît à l’intérieur. On veut décrire ce nouveau solide.',
  fig:(()=>{ const V=[...boxV(2.4,2.4,2.4,[0,0,-.6]),[0,0,2]], F=[[0,1,2,3],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7],[4,5,8],[5,6,8],[6,7,8],[7,4,8]]; return solid(V,F,{az:30,el:20,r:3,fc:k=>k>=5?'var(--other)':'var(--accent)',fo:.25}).svg(); })(),
  parts:[
   {q:'a) Combien de faces a la maison&nbsp;?',lab:'Faces :',ans:9,hint:'Le cube perd sa face du dessus ; la pyramide perd sa base. Compte ce qui reste de chacun.',why:'Cube sans le dessus : 5 faces. Pyramide sans la base : 4 triangles. 5 + 4 = 9 faces.'},
   {q:'b) Combien d’arêtes&nbsp;?',lab:'Arêtes :',ans:16,hint:'Les arêtes du dessus du cube restent : ce sont aussi celles de la base du toit. Ne les compte qu’une fois.',why:'Les 12 arêtes du cube, plus les 4 arêtes du toit qui montent au sommet : 12 + 4 = 16.'},
   {q:'c) Combien de sommets&nbsp;?',lab:'Sommets :',ans:9,hint:'Les sommets du toit en bas sont déjà des sommets du cube.',why:'Les 8 sommets du cube, plus la pointe du toit : 8 + 1 = 9.'},
   {q:'d) À quoi ressemble la vue de dessus de la maison&nbsp;?',opts:['Un carré seul','Un carré avec ses deux diagonales','Un triangle','Un carré surmonté d’un triangle'],ans:1,hint:'D’en haut, le toit cache le cube. Où se trouvent les 4 arêtes qui montent au sommet&nbsp;?',why:'D’en haut, on voit le contour carré et les 4 arêtes du toit qui vont des coins au centre : elles dessinent les deux diagonales. Le « carré surmonté d’un triangle » est la vue de face.'}],
  sol:'<p>On colle deux solides : un cube (6 faces, 12 arêtes, 8 sommets) et une pyramide à base carrée (5 faces, 8 arêtes, 5 sommets).</p><p><b>Faces :</b> la face du dessus du cube et la base de la pyramide disparaissent : 5 + 4 = 9 faces.</p><p><b>Arêtes :</b> les 4 arêtes de la base du toit sont les arêtes du dessus du cube, comptées une seule fois : 12 + 4 = 16.</p><p><b>Sommets :</b> les 4 coins de la base du toit sont des sommets du cube : 8 + 1 = 9.</p><p><b>Vue de dessus :</b> un carré avec ses deux diagonales.</p>'},
]},

/* ============================== VOLUMES ET MESURES ============================== */
{subj:'sec', sem:'a9', id:'sec9-volumes', o:11, h:'Volumes et mesures', p:'Mesurer la place qu’occupe un solide, passer des cm³ aux litres, peser en grammes et en tonnes, calculer des durées, et découvrir d’où viennent nos unités.', steps:[
 {kind:'Théorie',h:'Compter des cubes-unités',p:`<p>Dans un jeu de blocs, une construction se mesure en blocs. Combien de blocs faut-il pour remplir une piscine de 5 blocs sur 4, profonde de 3&nbsp;? Ce nombre de blocs, c’est le <b>volume</b> de la piscine.</p>
<div class="def"><p>Le <b>volume</b> d’un solide est la place qu’il occupe dans l’espace. On le mesure en comptant combien de <b>cubes-unités</b> il faut pour le remplir. Un cube de 1 cm d’arête a un volume de <b>1 cm³</b> (on lit « un centimètre cube »).</p></div>
<div class="why"><p>On remplit un pavé couche par couche. Une couche du fond contient longueur × largeur cubes, rangés en lignes. On empile autant de couches que la hauteur. Donc : <b>volume du pavé = longueur × largeur × hauteur</b>. Pour un cube : <b>volume = arête × arête × arête</b>.</p></div>
<div class="ex"><p>La piscine de 5 sur 4 sur 3 : une couche de 5 × 4 = 20 blocs, et 3 couches : 20 × 3 = 60 blocs. Un cube de 2 cm d’arête : 2 × 2 × 2 = 8 cm³, soit 8 petits cubes de 1 cm³.</p></div>
<div class="warn"><p>Doubler l’arête d’un cube ne double pas son volume : 1 × 1 × 1 = 1, mais 2 × 2 × 2 = 8. Le volume est multiplié par 8.</p></div>
<p>Construis ton pavé et compte les couches.</p>`,
  params:[{id:'a',l:'Longueur',min:1,max:5,v:4,u:'cubes'},{id:'b',l:'Largeur',min:1,max:4,v:2,u:'cubes'},{id:'c',l:'Couches (hauteur)',min:1,max:4,v:2}],
  draw:v=>{ const L=[]; for(let i=0;i<v.b;i++) for(let j=0;j<v.a;j++) for(let k=0;k<v.c;k++) L.push([i,j,k]); return cubes(L,{az:32,el:28,r:4.4,box:[v.b,v.a,v.c],col:c=>c[2]===v.c-1?'var(--spark)':'var(--accent)'}).svg(); },
  info:v=>`${v.a} × ${v.b} = ${v.a*v.b} cubes par couche, ${v.c} couche${v.c>1?'s':''} : ${v.a*v.b} × ${v.c} = <b>${v.a*v.b*v.c} cubes-unités</b>.`},
 {kind:'Méthode',h:'Volume et aire totale d’un pavé',p:'<b>Quand :</b> on veut savoir ce que contient une boîte (son volume), ou combien de carton ou de papier cadeau il faut pour la fabriquer ou l’emballer (son aire totale). <b>Pourquoi ça marche :</b> le volume compte les couches de cubes-unités. L’<b>aire totale</b> est la somme des aires des 6 faces : c’est l’aire du patron. Les faces opposées sont identiques, il y a donc 3 paires de rectangles. <b>Comment :</b> 1) mets les trois dimensions dans la même unité ; 2) volume = longueur × largeur × hauteur, en unités cubes (cm³…) ; 3) aire totale = 2 × (longueur × largeur) + 2 × (longueur × hauteur) + 2 × (largeur × hauteur), en unités carrées (cm²…) ; 4) réponds par une phrase avec l’unité. Pour un cube : volume = arête × arête × arête et aire totale = 6 × arête × arête.',
  demo:{enonce:'Une boîte à chaussures mesure 30 cm de long, 20 cm de large et 12 cm de haut. Quel est son volume&nbsp;? Quelle aire de carton faut-il, sans les rabats&nbsp;?',
   etapes:[
    {f:'Volume : 30 × 20 × 12 = 600 × 12 = 7200 cm³',w:'Une couche de 30 × 20 = 600 cubes de 1 cm³, et 12 couches.'},
    {f:'Dessous et dessus : 2 × (30 × 20) = 1200 cm²',w:'Première paire de faces identiques.'},
    {f:'Devant et derrière : 2 × (30 × 12) = 720 cm²',w:'Deuxième paire.'},
    {f:'Côtés : 2 × (20 × 12) = 480 cm²',w:'Troisième paire.'},
    {f:'Aire totale : 1200 + 720 + 480 = 2400 cm²',w:'On additionne les 6 faces.'}],
   conclusion:'Réponse : la boîte a un volume de 7200 cm³ et il faut 2400 cm² de carton.'},
  fig:(()=>{ const S=solid(boxV(2,3,1.2),BOXF,{az:35,el:24,r:2.8,fc:k=>k<2?'var(--spark)':k===2||k===4?'var(--accent)':'var(--math)',fo:.25}); S.text([1,0,-.6],'30 cm',{a:'middle',dy:18,s:12}).text([1,1.5,0],'12 cm',{dx:8,s:12}).text([0,1.5,-.6],'20 cm',{dx:10,dy:14,s:12}); return S.svg(); })()},
 {kind:'Défi',h:'Douze cubes',p:'Tu assembles 12 cubes de 1 cm d’arête pour former un pavé plein. Plusieurs pavés sont possibles : 1 × 1 × 12, 1 × 2 × 6… Quelle est la plus petite aire totale que tu peux obtenir&nbsp;?',lab:'Aire totale :',unit:'cm²',ans:32,
  why:'Liste organisée des pavés de volume 12 : 1 × 1 × 12 (aire 50 cm²), 1 × 2 × 6 (40 cm²), 1 × 3 × 4 (38 cm²), 2 × 2 × 3 (2 × 4 + 2 × 6 + 2 × 6 = 32 cm²). Le plus « ramassé », 2 × 2 × 3, a la plus petite aire : 32 cm². Ici, faire une liste organisée évite d’oublier un cas.'},
 {kind:'Théorie',h:'Le volume d’un prisme droit',p:`<p>Une tente, une rampe de skate, un Toblerone : comment calculer leur volume&nbsp;? On ne peut pas les remplir de cubes sans en couper.</p>
<div class="prop"><p>Le volume d’un <b>prisme droit</b> vaut <b>aire de la base × hauteur</b>. Rappel : les bases sont les deux polygones identiques et parallèles, et la hauteur est la distance entre elles.</p></div>
<div class="why"><p>Pour le pavé, longueur × largeur est l’aire de la base, multipliée par la hauteur : le nombre de couches. Pour un prisme, c’est pareil. Une tranche de 1 cm d’épaisseur a un volume égal à l’aire de la base, et on empile autant de tranches que la hauteur.</p></div>
<div class="def"><p>Les faces latérales, mises bout à bout, forment un grand rectangle : sa largeur est la hauteur du prisme et sa longueur est le <b>périmètre de la base</b>. Donc <b>aire latérale = périmètre de la base × hauteur</b>, et <b>aire totale = aire latérale + 2 × aire de la base</b>.</p></div>
<div class="ex"><p>Un prisme dont la base est un triangle rectangle de côtés 3, 4 et 5 cm, de hauteur 10 cm. Base : 3 × 4 ÷ 2 = 6 cm². Volume : 6 × 10 = 60 cm³. Aire latérale : (3 + 4 + 5) × 10 = 120 cm². Aire totale : 120 + 2 × 6 = 132 cm².</p></div>
<p>Change la base (en orange) et la hauteur du prisme.</p>`,
  params:[{id:'b',l:'Base du triangle',min:1,max:4,v:3,u:'cm'},{id:'t',l:'Hauteur du triangle',min:1,max:4,v:2,u:'cm'},{id:'h',l:'Hauteur du prisme',min:1,max:6,v:4,u:'cm'}],
  draw:v=>{ const {V,F}=triPrismVF(v.b,v.t,v.h), S=solid(V,F,{az:40,el:22,r:4,fc:k=>k<2?'var(--spark)':'var(--accent)',fo:.3});
    S.text([0,v.h/2,-v.t/2],fmt(v.b),{dx:6,dy:16,s:12}).text([-v.b/2,v.h/2,0],fmt(v.t),{dx:8,s:12}).text([v.b/2,0,-v.t/2],fmt(v.h),{a:'middle',dy:18,s:12}); return S.svg(); },
  info:v=>`Aire de la base : ${v.b} × ${v.t} ÷ 2 = ${fmt(v.b*v.t/2)} cm². Volume : ${fmt(v.b*v.t/2)} × ${v.h} = <b>${fmt(v.b*v.t/2*v.h)} cm³</b>.`},
 {kind:'Méthode',h:'Volume et aire totale d’un prisme droit',p:'<b>Quand :</b> le solide a deux bases identiques et parallèles reliées par des rectangles : tente, gouttière, Toblerone, piscine à fond en pente. <b>Pourquoi ça marche :</b> le volume, ce sont des tranches identiques empilées ; l’aire latérale, c’est un rectangle déplié dont la longueur est le tour de la base. <b>Comment :</b> 1) repère la <b>base</b>, le polygone qui se répète d’un bout à l’autre, et la <b>hauteur</b> du prisme, la distance entre les deux bases ; attention, si le prisme est couché, sa hauteur est horizontale ; 2) calcule l’aire de la base avec la bonne formule ; 3) volume = aire de la base × hauteur ; 4) aire totale = périmètre de la base × hauteur + 2 × aire de la base.',
  demo:{enonce:'Une tente a la forme d’un prisme couché. Sa base est un triangle de 2 m de large et 1,5 m de haut, dont les deux côtés penchés mesurent environ 1,8 m. La tente mesure 3 m de long. Quel est son volume&nbsp;? Quelle est son aire totale, sol compris&nbsp;?',
   etapes:[
    {f:'Base : le triangle. Hauteur du prisme : la longueur de la tente, 3 m',w:'La tente est couchée : sa hauteur de prisme est horizontale.'},
    {f:'Aire de la base : 2 × 1,5 ÷ 2 = 1,5 m²',w:'Formule du triangle : base × hauteur ÷ 2.'},
    {f:'Volume : 1,5 × 3 = 4,5 m³',w:'Aire de la base × hauteur du prisme.'},
    {f:'Périmètre de la base : 2 + 1,8 + 1,8 = 5,6 m ; aire latérale : 5,6 × 3 = 16,8 m²',w:'Les trois rectangles dépliés forment un rectangle de 5,6 m sur 3 m.'},
    {f:'Aire totale : 16,8 + 2 × 1,5 = 16,8 + 3 = 19,8 m²',w:'On ajoute les deux triangles des bouts.'}],
   conclusion:'Réponse : la tente a un volume de 4,5 m³ et une aire totale d’environ 19,8 m².'},
  fig:(()=>{ const V=[[1,-1.5,-.75],[-1,-1.5,-.75],[0,-1.5,.75],[1,1.5,-.75],[-1,1.5,-.75],[0,1.5,.75]], F=[[0,1,2],[3,4,5],[0,1,4,3],[1,2,5,4],[0,2,5,3]], S=solid(V,F,{az:35,el:18,r:2.6,fc:k=>k<2?'var(--spark)':'var(--accent)',fo:.3});
    S.text([0,1.5,-.75],'2 m',{dx:8,dy:16,s:12}).text([1,0,-.75],'3 m',{a:'middle',dy:18,s:12}); return S.svg(); })()},
 {h:'Le bloc de mousse',p:'Un bloc de mousse a la forme d’un prisme droit. Sa base est un trapèze de bases 6 cm et 4 cm et de hauteur 3 cm. Le bloc mesure 20 cm de long. Quel est son volume&nbsp;?',
  fig:(()=>{ const W=[[1.5,-2.5,-1.5],[1.5,-2.5,.5],[-1.5,-2.5,1.5],[-1.5,-2.5,-1.5],[1.5,2.5,-1.5],[1.5,2.5,.5],[-1.5,2.5,1.5],[-1.5,2.5,-1.5]], F=[[0,1,2,3],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]];
    const S=solid(W,F,{az:35,el:20,r:3.4,fc:k=>k<2?'var(--spark)':'var(--accent)',fo:.3}); S.text([1.5,2.5,-.5],'4',{dx:8,s:12}).text([-1.5,2.5,0],'6',{dx:8,dy:-6,s:12}).text([0,2.5,-1.5],'3',{dx:10,dy:14,s:12}).text([1.5,0,-1.5],'20',{a:'middle',dy:18,s:12}); return S.svg(); })(),
  lab:'V =',unit:'cm³',ans:300,why:'Aire de la base (trapèze) : (6 + 4) × 3 ÷ 2 = 15 cm². Volume : 15 × 20 = 300 cm³.'},
 {kind:'Théorie',h:'Les unités de volume',p:`<p>Une brique de jus, une piscine, la benne d’un camion : pour chacune, on choisit une unité de volume adaptée.</p>
<div class="def"><p>Les unités de volume sont des cubes. <b>1 cm³</b> est le volume d’un cube de 1 cm d’arête (un petit dé). <b>1 dm³</b> est celui d’un cube de 1 dm, soit 10 cm d’arête (une brique de lait). <b>1 m³</b> est celui d’un cube de 1 m d’arête. Il existe aussi mm³, dam³, hm³ et km³.</p></div>
<div class="why"><p>Un cube de 1 dm d’arête mesure 10 cm sur 10 cm sur 10 cm. Il contient 10 × 10 = 100 cubes de 1 cm³ par couche, et 10 couches : <b>1 dm³ = 1000 cm³</b>. De même, 1 m³ = 1000 dm³. Chaque unité de volume vaut <b>1000 fois</b> celle qui est juste plus petite.</p></div>
<div class="ex"><p>2 dm³ = 2000 cm³. 5000 dm³ = 5 m³. 0,5 m³ = 500 dm³. 750 cm³ = 0,75 dm³.</p></div>
<div class="warn"><p>Longueurs : × 10 d’une unité à la suivante. Aires : × 100. Volumes : × 1000. Ce n’est pas un hasard : une aire a 2 dimensions (10 × 10), un volume en a 3 (10 × 10 × 10).</p></div>`,
  fig:(()=>{ const S=space({az:32,el:24,r:9,axes:false}), n=10, c=5, P=(x,y,z)=>[x-c,y-c,z-c];
    S.poly([P(n,0,0),P(n,n,0),P(n,n,n),P(n,0,n)],{fill:'var(--accent)',fo:.15,c:null}).poly([P(0,n,0),P(n,n,0),P(n,n,n),P(0,n,n)],{fill:'var(--accent)',fo:.28,c:null}).poly([P(0,0,n),P(n,0,n),P(n,n,n),P(0,n,n)],{fill:'var(--accent)',fo:.08,c:null});
    for(let k=1;k<n;k++){ const q={c:'var(--muted)',w:.7}; S.seg(P(n,k,0),P(n,k,n),q).seg(P(n,0,k),P(n,n,k),q).seg(P(k,n,0),P(k,n,n),q).seg(P(0,n,k),P(n,n,k),q).seg(P(k,0,n),P(k,n,n),q).seg(P(0,k,n),P(n,k,n),q); }
    solid(boxV(1,1,1,[n-.5-c,n-.5-c,n+.5-c]),BOXF,{S,az:32,el:24,fill:'var(--spark)',fo:.9,w2:1.5});
    solid(boxV(n,n,n),BOXF,{S,az:32,el:24,fo:0,w2:2.5}); S.text(P(n,c,0),'10 cm',{a:'middle',dy:20,s:12}).text(P(n+1,n,n+.4),'1 cm³',{s:12}).text(P(0,n,0),'1 dm³ = 1000 cm³',{dx:-10,dy:24,s:13}); return S.svg(); })()},
 {kind:'Théorie',h:'La capacité : litres et millilitres',p:`<p>Sur une bouteille, on ne lit pas « 1,5 dm³ » mais « 1,5 L ». Pour les liquides, on parle de <b>capacité</b> : ce qu’un récipient peut contenir.</p>
<div class="def"><p>L’unité de capacité est le <b>litre</b> (L). Ses sous-unités : le <b>décilitre</b> (1 dL = 0,1 L), le <b>centilitre</b> (1 cL = 0,01 L) et le <b>millilitre</b> (1 mL = 0,001 L). Donc 1 L = 10 dL = 100 cL = 1000 mL. Pour les grandes quantités : l’<b>hectolitre</b>, 1 hL = 100 L.</p></div>
<div class="prop"><p>Le pont avec les volumes : <b>1 L = 1 dm³</b>. Un cube de 10 cm d’arête contient exactement 1 litre. Comme 1 dm³ = 1000 cm³ et 1 L = 1000 mL, on a aussi <b>1 mL = 1 cm³</b>.</p></div>
<div class="ex"><p>Une canette de 33 cL contient 330 mL, soit 330 cm³. Une baignoire de 200 L contient 200 dm³, soit 0,2 m³. Et 1 m³ = 1000 L.</p></div>
<p>Remplis le cube de 1 dm³ : chaque centilitre fait monter l’eau de 1 mm, car 1 cL = 10 cm³ et le fond mesure 100 cm².</p>`,
  params:[{id:'n',l:'Eau versée',min:0,max:100,step:5,v:25,u:'cL'}],
  draw:v=>{ const S=space({az:32,el:24,r:9,axes:false}); if(v.n>0) solid(boxV(10,10,v.n/10,[0,0,-5+v.n/20]),BOXF,{S,az:32,el:24,fill:'var(--math)',fo:.35,w2:1.2,ec:'var(--math)',hidden:false});
    solid(boxV(10,10,10),BOXF,{S,az:32,el:24,fo:0,w2:2.5}); S.text([-5,5,v.n/10-5],fmt(v.n/10,1)+' cm',{dx:6,dy:4,s:12,c:'var(--math)'}); return S.svg(); },
  info:v=>`${v.n} cL = ${v.n*10} mL = ${v.n*10} cm³ = <b>${fmt(v.n/100)} L</b>. Hauteur d’eau : ${fmt(v.n/10,1)} cm.${v.n===100?' Le cube est plein : 1 dm³ = 1 L.':''}`},
 {kind:'Théorie',h:'Les masses : grammes, kilos et tonnes',p:`<p>Une pomme, un sac d’école, un camion : la <b>masse</b> dit si un objet est lourd. Ne la confonds pas avec le volume : un ballon de baudruche est gros mais léger, une bille de plomb est petite mais lourde.</p>
<div class="def"><p>Les unités de masse viennent du <b>gramme</b> (g). Comme pour les longueurs, chaque unité vaut 10 fois la suivante : kg, hg, dag, g, dg, cg, mg. Donc 1 kg = 1000 g et 1 g = 1000 mg. Pour les objets très lourds, on utilise la <b>tonne</b> : 1 t = 1000 kg.</p></div>
<div class="prop"><p>Un lien pratique : <b>1 L d’eau pèse 1 kg</b>, donc 1 mL (1 cm³) d’eau pèse 1 g. C’est d’ailleurs ainsi qu’on a défini le kilogramme au départ.</p></div>
<div class="ex"><p>2,5 kg = 2500 g. 750 g = 0,75 kg. Un camion de 12 t pèse 12 000 kg. Un aquarium qui contient 60 L d’eau : l’eau pèse 60 kg.</p></div>
<div class="warn"><p>On dit « un kilo », mais c’est un raccourci : kilogramme veut dire 1000 grammes. Et 1 t n’est pas 100 kg mais 1000 kg.</p></div>`,
  fig:(()=>{ const P=plane({x:[-.6,10.3],y:[-1.4,1.4],w:320,h:110,grid:false,axes:false}); P.arrow(0,0,10.1,0,{c:'var(--muted)',w:2});
    [[.6,'trombone','1 g'],[2.6,'pomme','150 g'],[4.9,'1 L d’eau','1 kg'],[7.1,'élève','45 kg'],[9.3,'voiture','1,3 t']].forEach(([x,n,m],k)=>{ P.dot(x,0,{r:6,c:COLS[k]}); P.text(x,0,n,{a:'middle',dy:-14,s:12}).text(x,0,m,{a:'middle',dy:24,s:12,c:'var(--muted)'}); });
    return P.svg(); })()},
 {kind:'Méthode',h:'Convertir des volumes, des capacités et des masses',p:`<b>Quand :</b> on compare ou on additionne des quantités données dans des unités différentes : une recette en dL et en cL, un aquarium en cm³ à remplir en litres. <b>Pourquoi ça marche :</b> capacités et masses suivent la règle des longueurs, × 10 par unité, un chiffre par colonne. Les volumes vont de 1000 en 1000 : <b>trois colonnes</b> par unité, car un cube contient 10 × 10 × 10 petits cubes. Le pont entre les deux : 1 dm³ = 1 L et 1 cm³ = 1 mL. <b>Comment :</b> 1) pour passer d’un volume à une capacité, passe par le pont dm³ = L ou cm³ = mL ; 2) compte les pas dans le bon tableau ; 3) multiplie si la nouvelle unité est plus petite, divise sinon ; 4) contrôle le sens : unité plus petite, nombre plus grand.
${gtab(VOLS,[['','','','hL','','L','dL','cL','mL']])}`,
  demo:{enonce:'Convertir 48 000 cm³ en litres, 2,4 m³ en litres, 35 cL en mL et 3,2 kg en grammes.',
   etapes:[
    {f:'48 000 cm³ = 48 dm³',w:'De cm³ à dm³, un pas vers la gauche dans le tableau des volumes : ÷ 1000.'},
    {f:'48 dm³ = 48 L',w:'Le pont : 1 dm³ = 1 L.'},
    {f:'2,4 m³ = 2400 dm³ = 2400 L',w:'De m³ à dm³, un pas vers la droite : × 1000.'},
    {f:'35 cL = 350 mL',w:'De cL à mL, une colonne vers la droite : × 10.'},
    {f:'3,2 kg = 3200 g',w:'De kg à g, trois colonnes (hg, dag, g) : × 1000.'}],
   conclusion:'48 000 cm³ = 48 L, 2,4 m³ = 2400 L, 35 cL = 350 mL et 3,2 kg = 3200 g.'}},
 {kind:'Pratique',h:'Remplir l’aquarium',p:'Un aquarium en forme de pavé mesure 50 cm de long, 30 cm de large et 30 cm de haut. Règle la hauteur d’eau pour qu’il contienne exactement <b>30 L</b>.',
  params:[{id:'h',l:'Hauteur d’eau',min:0,max:30,v:10,u:'cm'}],
  draw:v=>{ const S=space({az:32,el:24,r:3.4,axes:false}), k=.1; if(v.h>0) solid(boxV(3,5,v.h*k,[0,0,-1.5+v.h*k/2]),BOXF,{S,az:32,el:24,fill:'var(--math)',fo:.35,w2:1.2,ec:'var(--math)',hidden:false});
    solid(boxV(3,5,3),BOXF,{S,az:32,el:24,fo:0,w2:2.5}); S.text([1.5,0,-1.5],'50 cm',{a:'middle',dy:18,s:12}).text([0,2.5,-1.5],'30 cm',{dx:10,dy:14,s:12}).text([1.5,2.5,0],'30 cm',{dx:8,s:12}); return S.svg(); },
  info:v=>`Hauteur d’eau : ${v.h} cm. Volume d’eau : 50 × 30 × ${v.h} = ${1500*v.h} cm³.`,
  ok:v=>v.h===20,
  why:'30 L = 30 dm³ = 30 000 cm³. Le fond mesure 50 × 30 = 1500 cm², donc il faut 30 000 ÷ 1500 = 20 cm d’eau.'},
 {kind:'Théorie',h:'Les durées : heures, minutes, secondes',p:`<p>Ton film commence à 20 h 45 et dure 1 h 50. À quelle heure finit-il&nbsp;? Avec les durées, on ne calcule pas comme d’habitude, car une heure ne fait pas 100 minutes.</p>
<div class="def"><p>1 <b>heure</b> (h) = 60 <b>minutes</b> (min) et 1 minute = 60 <b>secondes</b> (s). Donc 1 h = 60 × 60 = 3600 s. Plus long : 1 jour = 24 h et 1 semaine = 7 jours.</p></div>
<div class="idea"><p>Le temps se compte en <b>base 60</b>, comme tu l’as vu avec les systèmes de numération : dès qu’on atteint 60 minutes, on les échange contre 1 heure, comme on échange 10 unités contre 1 dizaine. Cette habitude vient des Babyloniens, il y a environ 4000 ans.</p></div>
<div class="ex"><p>2 h 15 min = 2 × 60 + 15 = 135 min. 200 min = 3 × 60 + 20 = 3 h 20 min. Une demi-heure = 30 min ; un quart d’heure = 15 min.</p></div>
<div class="warn"><p>1,5 h n’est pas 1 h 50 min ! 1,5 h = 1 h + 0,5 h = 1 h 30 min. De même, 2,25 h = 2 h 15 min, car 0,25 × 60 = 15. Pour convertir une durée à virgule, on multiplie la partie après la virgule par 60.</p></div>`,
  fig:horloge(8,45)},
 {kind:'Méthode',h:'Calculer une durée ou un horaire',p:'<b>Quand :</b> on cherche combien de temps dure un trajet entre deux horaires, ou à quelle heure on arrivera. <b>Pourquoi ça marche :</b> on ne peut pas soustraire 11 h 15 − 8 h 47 comme des nombres à virgule, car 1 h = 60 min. On découpe la durée en morceaux faciles en passant par les <b>heures rondes</b>, comme quand on rend la monnaie. <b>Comment :</b> 1) du départ jusqu’à l’heure ronde suivante ; 2) les heures entières ; 3) de la dernière heure ronde jusqu’à l’arrivée ; 4) additionne les morceaux, puis échange 60 min contre 1 h si besoin. Pour trouver une heure d’arrivée : ajoute les heures, puis les minutes, et si les minutes atteignent 60, échange 60 min contre 1 h.',
  demo:{enonce:'Le car du camp de ski part à 8 h 47 et arrive à 11 h 15. Combien de temps dure le trajet&nbsp;? Le soir, un film commence à 20 h 45 et dure 1 h 50 : à quelle heure finit-il&nbsp;?',
   etapes:[
    {f:'8 h 47 → 9 h 00 : 13 min',w:'Jusqu’à l’heure ronde : 60 − 47 = 13.'},
    {f:'9 h 00 → 11 h 00 : 2 h',w:'Les heures entières.'},
    {f:'11 h 00 → 11 h 15 : 15 min',w:'De l’heure ronde à l’arrivée.'},
    {f:'Durée : 2 h + 13 min + 15 min = 2 h 28 min',w:'On additionne les morceaux.'},
    {f:'Film : 20 h 45 + 1 h 50 = 21 h 95 min = 22 h 35',w:'95 min = 60 min + 35 min = 1 h 35 min : on échange 60 min contre 1 h.'}],
   conclusion:'Le trajet dure 2 h 28 min et le film finit à 22 h 35.'},
  fig:(()=>{ const P=plane({x:[8.5,11.5],y:[-.9,1.3],w:320,grid:false,axes:false}), X=t=>t; P.seg(8.6,0,11.4,0,{c:'var(--muted)',w:2});
    [9,10,11].forEach(h=>{ P.seg(h,-.12,h,.12,{c:'var(--muted)',w:1.5}); P.text(h,0,h+' h',{a:'middle',dy:22,s:11,c:'var(--muted)'}); });
    const a=8+47/60, b=11.25; P.dot(a,0,{r:6,c:'var(--accent)'}).dot(b,0,{r:6,c:'var(--other)'}); P.text(a,0,'8 h 47',{a:'middle',dy:-14,s:11}).text(b,0,'11 h 15',{a:'middle',dy:-14,s:11});
    P.curve(t=>a+(9-a)*t,t=>.45*Math.sin(Math.PI*t),0,1,{c:'var(--accent)',w:2}).curve(t=>9+2*t,t=>.7*Math.sin(Math.PI*t),0,1,{c:'var(--math)',w:2}).curve(t=>11+.25*t,t=>.45*Math.sin(Math.PI*t),0,1,{c:'var(--other)',w:2});
    P.text((a+9)/2,.55,'13 min',{a:'middle',s:11,c:'var(--accent)'}).text(10,.8,'2 h',{a:'middle',s:11,c:'var(--math)'}).text(11.12,.55,'15 min',{a:'middle',s:11,c:'var(--other)'}); return P.svg(); })()},
 {h:'La randonnée',p:'Tu pars en randonnée à 9 h 35 et tu arrives au sommet à 13 h 10. Combien de minutes as-tu marché&nbsp;?',lab:'Durée :',unit:'min',ans:215,
  why:'9 h 35 → 10 h : 25 min ; 10 h → 13 h : 3 h ; 13 h → 13 h 10 : 10 min. Total : 3 h 35 min = 3 × 60 + 35 = 215 min.'},
 {kind:'Théorie',h:'Pieds, pouces et mètre : l’histoire des mesures',p:`<p>Une télévision de « 55 pouces », un avion qui vole à « 35 000 pieds » : d’où viennent ces drôles d’unités&nbsp;?</p>
<div class="def"><p>Autrefois, on mesurait avec le corps : le <b>pouce</b> (la largeur du pouce, environ 2,5 cm), le <b>pied</b> (environ 30 cm), la <b>coudée</b> (du coude au bout des doigts, environ 50 cm). Aujourd’hui, ces unités sont fixées : <b>1 pouce = 2,54 cm</b> et <b>1 pied = 12 pouces = 30,48 cm</b>.</p></div>
<div class="idea"><p>Le problème : chaque ville avait son pied à elle ! Un marchand ne savait jamais vraiment ce qu’il achetait. En 1795, la France crée le <b>système métrique</b> : une seule unité de longueur, le mètre, avec des multiples qui vont toujours de 10 en 10. Le mètre était défini comme la dix-millionième partie de la distance entre le pôle Nord et l’équateur. La Suisse l’adopte en 1877 ; aujourd’hui, presque tous les pays du monde l’utilisent.</p></div>
<div class="ex"><p>Un écran de 55 pouces a une diagonale de 55 × 2,54 = 139,7 cm. 35 000 pieds = 35 000 × 30,48 cm = 1 066 800 cm, soit environ 10,7 km.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>En 1999, une sonde spatiale envoyée vers Mars a été perdue parce qu’une équipe calculait en unités anglaises et l’autre en unités métriques. Une simple erreur de conversion !</p></div>`,
  fig:(()=>{ const P=plane({x:[-30,128],y:[-1,4.6],w:320,h:150,grid:false,axes:false});
    [['pouce',2.54,'2,54 cm'],['pied',30.48,'30,48 cm'],['coudée',50,'≈ 50 cm'],['mètre',100,'1 m']].forEach(([n,L,s],k)=>{ const y=3.6-k*1.1; P.rect(0,y-.3,L,.6,{fill:COLS[k],fo:.5,c:'var(--ink)',w:1.2}); P.text(-2,y,n,{a:'end',dy:4,s:12}).text(L+2,y,s,{dy:4,s:11,c:'var(--muted)'}); });
    return P.svg(); })()},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li><b>Volume</b> = nombre de cubes-unités qui remplissent le solide, en cm³, dm³, m³.</li>
<li><b>Pavé</b> : volume = longueur × largeur × hauteur ; aire totale = somme des 6 faces = 2 × (L × l) + 2 × (L × h) + 2 × (l × h). <b>Cube</b> : volume = arête × arête × arête ; aire = 6 × arête × arête.</li>
<li><b>Prisme droit</b> : volume = aire de la base × hauteur ; aire latérale = périmètre de la base × hauteur ; aire totale = aire latérale + 2 × aire de la base.</li>
<li><b>Volumes</b> : × 1000 d’une unité à la suivante (3 colonnes par unité). <b>Capacités</b> : L, dL, cL, mL, × 10 par unité. <b>Pont</b> : 1 dm³ = 1 L, 1 cm³ = 1 mL, 1 m³ = 1000 L.</li>
<li><b>Masses</b> : kg, hg, dag, g, dg, cg, mg (× 10) ; 1 t = 1000 kg ; 1 L d’eau pèse 1 kg.</li>
<li><b>Durées</b> : 1 h = 60 min, 1 min = 60 s. Pour une durée, passe par les heures rondes ; 0,5 h = 30 min.</li>
<li><b>Histoire</b> : 1 pouce = 2,54 cm, 1 pied = 30,48 cm ; le système métrique (1795) va de 10 en 10.</li></ul></div>`},
 {kind:'Problème',h:'La piscine gonflable',p:'Pour l’été, ta famille installe une piscine gonflable en forme de pavé : 3 m de long, 2 m de large et 60 cm de haut. On la remplit avec un tuyau jusqu’à 50 cm de hauteur d’eau. Le tuyau débite 20 litres par minute. On ouvre le robinet à 14 h 20.',
  fig:(()=>{ const S=space({az:32,el:26,r:2.4,axes:false}); solid(boxV(2,3,.5,[0,0,-.05]),BOXF,{S,az:32,el:26,fill:'var(--math)',fo:.35,w2:1.2,ec:'var(--math)',hidden:false}); solid(boxV(2,3,.6),BOXF,{S,az:32,el:26,fo:0,w2:2.5});
    S.text([1,0,-.3],'3 m',{a:'middle',dy:18,s:12}).text([0,1.5,-.3],'2 m',{dx:10,dy:14,s:12}).text([1,-1.5,0],'60 cm',{a:'end',dx:-8,s:12}); return S.svg(); })(),
  parts:[
   {q:'a) Quel volume d’eau faut-il, en m³&nbsp;?',unit:'m³',ans:3,tol:.001,hint:'La hauteur d’eau est 50 cm : convertis-la en mètres avant de multiplier.',why:'50 cm = 0,5 m, donc 3 × 2 × 0,5 = 3 m³.'},
   {q:'b) Combien de litres cela fait-il&nbsp;?',unit:'L',ans:3000,hint:'1 m³ = 1000 dm³ et 1 dm³ = 1 L.',why:'3 m³ = 3000 dm³ = 3000 L.'},
   {q:'c) Combien de minutes faut-il pour remplir la piscine&nbsp;?',unit:'min',ans:150,hint:'Chaque minute, 20 L arrivent. Combien de fois 20 L dans le volume total&nbsp;?',why:'3000 ÷ 20 = 150 min, soit 2 h 30 min.'},
   {q:'d) À quelle heure la piscine sera-t-elle prête&nbsp;?',opts:['16 h 20','16 h 50','15 h 70','17 h 30'],ans:1,hint:'Convertis la durée en heures et minutes, puis ajoute-la à 14 h 20.',why:'150 min = 2 h 30 min. 14 h 20 + 2 h 30 = 16 h 50.'}],
  sol:'<p><b>Volume :</b> la hauteur d’eau vaut 50 cm = 0,5 m, donc 3 × 2 × 0,5 = 3 m³.</p><p><b>Litres :</b> 3 m³ = 3000 dm³ = 3000 L.</p><p><b>Durée :</b> 3000 ÷ 20 = 150 min = 2 h 30 min.</p><p><b>Heure :</b> 14 h 20 + 2 h 30 = 16 h 50.</p><p>Réponse : il faut 3000 L d’eau et la piscine sera prête à 16 h 50.</p>'},
 {kind:'Problème',h:'La rampe de skate en bois',p:'Le club de skate construit une rampe en forme de prisme droit couché. Sa base est un triangle rectangle : les côtés de l’angle droit mesurent 1,2 m (au sol) et 0,5 m (à la verticale), et la pente mesure 1,3 m. La rampe a une largeur de 2 m. On la remplit de sable pour la stabiliser : 1 L de sable pèse 1,6 kg. On recouvre ensuite toutes ses faces de planches.',
  fig:(()=>{ const V=[[0,-1,-.25],[0,1,-.25],[-1.2,-1,-.25],[-1.2,1,-.25],[-1.2,-1,.25],[-1.2,1,.25]].map(p=>[p[0]+.6,p[1],p[2]]), F=[[0,2,4],[1,3,5],[0,1,3,2],[2,3,5,4],[0,1,5,4]];
    const S=solid(V,F,{az:50,el:20,r:1.9,fc:k=>k<2?'var(--spark)':'var(--accent)',fo:.3}); S.text([0,1,-.25],'1,2 m',{a:'middle',dy:18,s:12}).text([-.6,1,0],'0,5 m',{dx:8,s:12}).text([.6,0,-.25],'2 m',{a:'middle',dy:18,s:12}); return S.svg(); })(),
  parts:[
   {q:'a) Quelle est l’aire de la base triangulaire&nbsp;?',unit:'m²',ans:.3,tol:.001,hint:'Dans un triangle rectangle, les deux côtés de l’angle droit sont une base et sa hauteur.',why:'1,2 × 0,5 ÷ 2 = 0,3 m².'},
   {q:'b) Quel est le volume de la rampe, en litres&nbsp;?',unit:'L',ans:600,hint:'Volume = aire de la base × hauteur du prisme (ici la largeur de 2 m), puis convertis les m³ en litres.',why:'0,3 × 2 = 0,6 m³ = 600 dm³ = 600 L.'},
   {q:'c) Quelle est la masse du sable, en tonnes&nbsp;?',unit:'t',ans:.96,tol:.001,hint:'Calcule d’abord la masse en kg, puis convertis : 1 t = 1000 kg.',why:'600 × 1,6 = 960 kg = 0,96 t.'},
   {q:'d) Quelle aire de planches faut-il pour couvrir toute la rampe&nbsp;?',unit:'m²',ans:6.6,tol:.001,hint:'Aire latérale = périmètre du triangle × 2 m, puis ajoute les deux triangles.',why:'Périmètre de la base : 1,2 + 0,5 + 1,3 = 3 m. Aire latérale : 3 × 2 = 6 m². Aire totale : 6 + 2 × 0,3 = 6,6 m².'}],
  sol:'<p>La rampe est un prisme droit dont la base est le triangle rectangle et dont la hauteur (couchée) est la largeur de 2 m.</p><p><b>Base :</b> 1,2 × 0,5 ÷ 2 = 0,3 m².</p><p><b>Volume :</b> 0,3 × 2 = 0,6 m³ = 600 L.</p><p><b>Sable :</b> 600 × 1,6 = 960 kg = 0,96 t.</p><p><b>Planches :</b> aire latérale (1,2 + 0,5 + 1,3) × 2 = 6 m², plus les deux bases : 6 + 0,6 = 6,6 m².</p><p>Réponse : la rampe contient 600 L de sable, soit 0,96 t, et il faut 6,6 m² de planches.</p>'},
]},
);
})();
