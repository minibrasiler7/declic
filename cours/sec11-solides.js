/* Déclic — Maths au secondaire, 11e année : cônes, sphères, pyramides et leurs volumes */
(()=>{
/* ---------- outils 3D locaux ---------- */
const D=Math.PI/180;
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]], dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const crs=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const mid=pts=>pts.reduce((m,p)=>[m[0]+p[0]/pts.length,m[1]+p[1]/pts.length,m[2]+p[2]/pts.length],[0,0,0]);
const HID={c:'var(--muted)',w:1.5,dash:true};
// scène 3D : space() + direction de l’œil (vecteur qui pointe vers l’observateur)
function sc(az=30,el=20,r=5){ const S=space({az,el,r,axes:false}); S.az=az*D; S.ce=Math.cos(el*D); S.se=Math.sin(el*D); S.w=[Math.cos(az*D)*S.ce,Math.sin(az*D)*S.ce,S.se]; return S; }
// courbe 3D : trait plein là où vis(t) est vrai, pointillés ailleurs
function c3(S,f,t0,t1,vis,q,n=96){ let run=[],cur=null; const out=()=>{ if(run.length>1) S.P.poly(run,Object.assign({open:true},cur===false?HID:q)); };
  for(let i=0;i<=n;i++){ const t=t0+(t1-t0)*i/n, v=vis?!!vis(t):true, p=S.pr(...f(t)); if(cur!==null&&v!==cur){ run.push(p); out(); run=[p]; } else run.push(p); cur=v; } out(); }
const circ=(r,z,cx=0,cy=0)=>t=>[cx+r*Math.cos(t),cy+r*Math.sin(t),z];
// polyèdre convexe : faces visibles teintées, arêtes cachées en pointillés
function poly3(S,V,F,o={}){ const C=mid(V), col=o.c||'var(--accent)';
  const vis=F.map(f=>{ const n=crs(sub(V[f[1]],V[f[0]]),sub(V[f[2]],V[f[0]])), s=dot(n,sub(mid(f.map(k=>V[k])),C))<0?-1:1; return s*dot(n,S.w)>1e-9; });
  const E=new Map(); F.forEach((f,j)=>f.forEach((a,k)=>{ const b=f[(k+1)%f.length], key=Math.min(a,b)+'-'+Math.max(a,b); if(!E.has(key)) E.set(key,[a,b,false]); if(vis[j]) E.get(key)[2]=true; }));
  if(!o.noHid) E.forEach(([a,b,v])=>{ if(!v) S.seg(V[a],V[b],HID); });
  F.forEach((f,j)=>{ if(vis[j]&&o.fo!==0) S.poly(f.map(k=>V[k]),{fill:o.fill||col,fo:o.fo??.13,c:null}); });
  E.forEach(([a,b,v])=>{ if(v) S.seg(V[a],V[b],{c:col,w:o.w||2.5}); });
  return vis; }
// pyramide régulière : base à n côtés (rayon R du cercle circonscrit) dans le plan z = z0, sommet à la hauteur h
function pyrV(n,R,h,z0=0,ph=0,x=0,y=0){ const V=[]; for(let k=0;k<n;k++){ const t=ph+2*Math.PI*k/n; V.push([x+R*Math.cos(t),y+R*Math.sin(t),z0]); } V.push([x,y,z0+h]);
  const F=[[...Array(n).keys()]]; for(let k=0;k<n;k++) F.push([k,(k+1)%n,n]); return {V,F}; }
function boxV(x0,y0,z0,x1,y1,z1){ return {V:[[x0,y0,z0],[x1,y0,z0],[x1,y1,z0],[x0,y1,z0],[x0,y0,z1],[x1,y0,z1],[x1,y1,z1],[x0,y1,z1]],
  F:[[0,1,2,3],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]]}; }
// cône : base de rayon r dans le plan z = o.z, sommet en haut (ou en bas si o.down)
function cone(S,r,h,o={}){ const z0=o.z||0, dn=o.down?-1:1, x=o.x||0, y=o.y||0, A=[x,y,z0+dn*h], col=o.c||'var(--accent)', q={c:col,w:o.w||2.5};
  const rim=circ(r,z0,x,y), k=-dn*r*S.se/(h*S.ce), lat=t=>Math.cos(t-S.az)>k;
  if(Math.abs(k)<1){ const a=Math.acos(k), t1=S.az-a, t2=S.az+a;
    if(o.fo!==0){ const pts=[S.pr(...A)]; for(let i=0;i<=48;i++) pts.push(S.pr(...rim(t1+(t2-t1)*i/48))); S.P.poly(pts,{fill:o.fill||col,fo:o.fo??.15,c:null}); }
    S.seg(A,rim(t1),q); S.seg(A,rim(t2),q); }
  const rv=o.rim||(o.down?'all':'lat');
  if(rv!=='none') c3(S,rim,0,2*Math.PI,rv==='all'?null:rv==='front'?(t=>Math.cos(t-S.az)>0):lat,q);
  return A; }
// cylindre d’axe vertical, de z0 à z1
function cyl(S,r,z0,z1,o={}){ const col=o.c||'var(--accent)', q={c:col,w:o.w||2.5}, x=o.x||0, y=o.y||0, b=circ(r,z0,x,y), t=circ(r,z1,x,y), a1=S.az-Math.PI/2, a2=S.az+Math.PI/2;
  if(o.fo!==0){ const pts=[]; for(let i=0;i<=48;i++) pts.push(S.pr(...b(a1+(a2-a1)*i/48))); for(let i=48;i>=0;i--) pts.push(S.pr(...t(a1+(a2-a1)*i/48)));
    S.P.poly(pts,{fill:o.fill||col,fo:o.fo??.15,c:null});
    if(!o.noTop){ const tp=[]; for(let i=0;i<48;i++) tp.push(S.pr(...t(2*Math.PI*i/48))); S.P.poly(tp,{fill:o.fill||col,fo:(o.fo??.15)*.7,c:null}); } }
  S.seg(b(a1),t(a1),q); S.seg(b(a2),t(a2),q);
  c3(S,b,0,2*Math.PI,u=>Math.cos(u-S.az)>0,q);
  if(!o.noTop) c3(S,t,0,2*Math.PI,null,q); }
// boule : contour (un cercle) et équateur (moitié arrière en pointillés)
function ball(S,r,c=[0,0,0],o={}){ const col=o.c||'var(--accent)', p=S.pr(...c);
  S.P.circ(p[0],p[1],r,{fill:o.fill||col,fo:o.fo??.15,c:col,w:o.w||2.5});
  if(o.eq!==false) c3(S,circ(r,c[2],c[0],c[1]),0,2*Math.PI,t=>Math.cos(t-S.az)>0,{c:col,w:1.5}); }
// demi-boule posée sur son disque (dôme)
function dome(S,r,c=[0,0,0],o={}){ const col=o.c||'var(--accent)', p=S.pr(...c), e=circ(r,c[2],c[0],c[1]), pts=[];
  for(let i=0;i<=40;i++){ const s=Math.PI*i/40; pts.push([p[0]+r*Math.cos(s),p[1]+r*Math.sin(s)]); }
  for(let i=0;i<=40;i++) pts.push(S.pr(...e(S.az-Math.PI/2+Math.PI*i/40)));
  S.P.poly(pts,{fill:o.fill||col,fo:o.fo??.2,c:col,w:o.w||2.5}); }
// perspective cavalière (fuyantes à 45°, coefficient 1/2)
const cav=(x,y,z)=>[x+.3536*y,z+.3536*y];
const tab=rows=>`<table style="border-collapse:collapse;margin:6px auto;font-size:.95em">${rows.map((r,i)=>`<tr>${r.map(c=>`<${i?'td':'th'} style="border:1px solid var(--line);padding:4px 9px;text-align:center">${c}</${i?'td':'th'}>`).join('')}</tr>`).join('')}</table>`;
const nomBase=['','','','triangle équilatéral','carré','pentagone régulier','hexagone régulier','heptagone régulier','octogone régulier'];

/* ---------- figures du chapitre « Cônes, sphères et pyramides » ---------- */
// un triangle, un demi-disque ou un rectangle tourne autour de l’axe
function revol(f,t){ const S=sc(30,18), r=2.4, col='var(--accent)';
  S.seg([0,0,-3.3],[0,0,3.6],{c:'var(--muted)',w:1.5,dash:true});
  let prof;
  if(f===1) prof=[[0,-2],[r,-2],[0,2.4]];
  else if(f===2){ prof=[]; for(let i=0;i<=24;i++){ const u=Math.PI*i/24; prof.push([2.6*Math.sin(u),2.6*Math.cos(u)]); } }
  else prof=[[0,-2],[r,-2],[r,2],[0,2]];
  const at=th=>prof.map(([s,z])=>[s*Math.cos(th),s*Math.sin(th),z]);
  const outer= f===1?[[r,-2]] : f===2?[[2.6,0],[1.84,1.84],[1.84,-1.84]] : [[r,-2],[r,2]];
  if(t===360){ if(f===1) cone(S,r,4.4,{z:-2}); else if(f===2) ball(S,2.6); else cyl(S,r,-2,2); }
  else { for(let a=20;a<t;a+=20) S.poly(at(a*D),{c:col,w:1,op:.35});
    if(t>0) outer.forEach(([s,z])=>c3(S,circ(s,z),0,t*D,null,{c:'var(--spark)',w:2}));
    S.poly(at(t*D),{fill:'var(--spark)',fo:.4,c:'var(--spark)',w:2.5}); }
  if(f===1){ S.dot([0,0,2.4],{l:'S',r:4}); S.dot([0,0,-2],{l:'O',r:4,dx:-20}); }
  if(f===2) S.dot([0,0,0],{l:'O',r:4,dx:-20});
  return S.svg(); }
// pyramide régulière qu’on fait tourner, avec hauteur et apothème
function pyrFig(n,az,lab=true){ const S=sc(az,20,4), R=2.5, h=4.2, z0=-2.1, {V,F}=pyrV(n,R,h,z0,0);
  poly3(S,V,F); const O=[0,0,z0], T=V[n];
  let best=-1e9, M=null; for(let k=0;k<n;k++){ const m=mid([V[k],V[(k+1)%n]]), d=dot(m,S.w); if(d>best){ best=d; M=m; } }
  S.seg(T,O,{c:'var(--spark)',w:2.5,dash:true}); S.seg(O,M,{c:'var(--spark)',w:2,dash:true}); S.seg(T,M,{c:'var(--math)',w:3.5});
  if(lab){ S.dot(T,{l:'S',r:4}); S.dot(O,{l:'O',r:4,dx:-20}); S.dot(M,{l:'M',r:4,dy:16}); }
  return S.svg(); }
// pyramide à base carrée du calcul de l’apothème (6 cm de côté, 4 cm de haut, à l’échelle 0,7)
function pyrCalc(){ const S=sc(25,18,3.6), b=2.1, h=2.8, z0=-1.6, V=[[b,-b,z0],[b,b,z0],[-b,b,z0],[-b,-b,z0],[0,0,z0+h]], F=[[0,1,2,3],[0,1,4],[1,2,4],[2,3,4],[3,0,4]];
  poly3(S,V,F); const O=[0,0,z0], M=[0,b,z0], T=V[4], A=V[1];
  S.poly([T,O,M],{fill:'var(--spark)',fo:.35,c:'var(--spark)',w:2}); S.poly([T,M,A],{fill:'var(--math)',fo:.25,c:'var(--math)',w:2});
  S.dot(T,{l:'S',r:4}).dot(O,{l:'O',r:4,dx:-18}).dot(M,{l:'M',r:4,dy:16}).dot(A,{l:'A',r:4});
  S.text(mid([T,O]),'4',{dx:-16,c:'var(--spark)'}).text(mid([O,M]),'3',{dy:16,c:'var(--spark)'}).text(mid([T,M]),'?',{dx:8,c:'var(--math)'});
  return S.svg(); }
// développement du cylindre
function cylNet(r,h){ const L=2*Math.PI*r, P=plane({x:[-1.5,19.5],y:[-6.5,11.5],grid:false,axes:false}), x0=(19-L)/2;
  P.rect(x0,0,L,h,{fill:'var(--accent)',fo:.18,c:'var(--accent)',w:2.5});
  P.circ(x0+L/2,h+r,r,{fill:'var(--spark)',fo:.25,c:'var(--spark)',w:2.5}).circ(x0+L/2,-r,r,{fill:'var(--spark)',fo:.25,c:'var(--spark)',w:2.5});
  P.seg(x0+L/2,h+r,x0+L/2+r,h+r,{c:'var(--spark)',w:2}).text(x0+L/2+r/2,h+r,'r',{a:'middle',dy:-6,c:'var(--spark)'});
  P.text(x0+L/2,h/2,`2π<tspan font-style="italic">r</tspan> ≈ ${fmt(L)} cm`,{a:'middle',dy:5,s:12});
  P.text(x0-.25,h/2,'h',{a:'end',dy:5,c:'var(--accent)'});
  return P.svg(); }
// une pyramide à base carrée qui se replie (f de 0 à 10)
function fold(f,az){ const S=sc(az,32,4), a=2.6, hh=2.6, ap=Math.hypot(hh,a/2), z0=-1.3, b=a/2, phi=f/10*(Math.PI-Math.acos(b/ap));
  S.poly([[b,-b,z0],[b,b,z0],[-b,b,z0],[-b,-b,z0]],{fill:'var(--accent)',fo:.25,c:'var(--accent)',w:2.5});
  const us=[[1,0],[0,1],[-1,0],[0,-1]], cols=['var(--math)','var(--spark)','var(--sci)','var(--other)'];
  us.map(([ux,uy],k)=>{ const m=[ux*b,uy*b,z0], e1=[m[0]-uy*b,m[1]+ux*b,z0], e2=[m[0]+uy*b,m[1]-ux*b,z0], A=[m[0]+ap*Math.cos(phi)*ux,m[1]+ap*Math.cos(phi)*uy,z0+ap*Math.sin(phi)];
    return {pts:[e1,e2,A],c:cols[k],d:dot(mid([e1,e2,A]),S.w)}; }).sort((p,q)=>p.d-q.d)
   .forEach(t=>S.poly(t.pts,{fill:t.c,fo:.4,c:t.c,w:2}));
  return S.svg(); }
// développement du cône : secteur de rayon g (dessiné à 6 unités) et disque de base
function coneNet(r,g,alpha,lab=true){ const P=plane({x:[-6.5,18.5],y:[-6.5,6.5],grid:false,axes:false}), R=6, a=alpha*D, rho=R*r/g;
  if(r>=g){ P.text(6,0,'Impossible : il faut r plus petit que g',{a:'middle',c:'var(--bad)'}); return P.svg(); }
  const pts=[[0,0]]; for(let i=0;i<=72;i++){ const t=-a/2+a*i/72; pts.push([R*Math.cos(t),R*Math.sin(t)]); }
  P.poly(pts,{fill:'var(--accent)',fo:.2,c:'var(--accent)',w:2.5});
  P.circ(R+rho,0,rho,{fill:'var(--spark)',fo:.25,c:'var(--spark)',w:2.5}).seg(R+rho,0,R+2*rho,0,{c:'var(--spark)',w:2});
  if(lab){ P.text(R+1.5*rho,0,'r',{a:'middle',dy:-6,c:'var(--spark)'});
    if(alpha>0) P.text(R*.55*Math.cos(a/2),R*.55*Math.sin(a/2),'g',{a:'middle',dy:-8,c:'var(--accent)'});
    if(alpha>0) P.text(R*.4,0,`${fmt(alpha,1)}°`,{a:'middle',dy:5,s:12}); }
  return P.svg(); }
// sections par un plan horizontal (s = solide, d de 0 à 10)
const SEC=[null,{n:'cylindre',H:8},{n:'cône',H:10},{n:'pyramide',H:10},{n:'sphère',H:10}];
function secFig(s,d){ const S=sc(30,20), k=.44, H=SEC[s].H, off=k*H/2, z=k*d*H/10-off;
  let rho=0;
  if(s===1){ cyl(S,4*k,-off,off); rho=4*k; }
  if(s===2){ cone(S,6*k,10*k,{z:-off}); rho=6*k*(10-d)/10; }
  if(s===3){ const {V,F}=pyrV(4,3*k*Math.SQRT2,10*k,-off,Math.PI/4); poly3(S,V,F); rho=3*k*(10-d)/10; }
  if(s===4){ ball(S,5*k); const zr=d-5; rho=k*Math.sqrt(Math.max(0,25-zr*zr)); }
  const L=3.6; S.poly([[-L,-L,z],[L,-L,z],[L,L,z],[-L,L,z]],{fill:'var(--math)',fo:.12,c:'var(--math)',w:1});
  if(rho>.01){ if(s===3) S.poly([[rho,-rho,z],[rho,rho,z],[-rho,rho,z],[-rho,-rho,z]],{fill:'var(--spark)',fo:.55,c:'var(--spark)',w:3});
    else { const pts=[]; for(let i=0;i<60;i++) pts.push(circ(rho,z)(2*Math.PI*i/60)); S.poly(pts,{fill:'var(--spark)',fo:.55,c:'var(--spark)',w:3}); } }
  else S.dot([0,0,z],{c:'var(--spark)',r:4});
  return S.svg(); }
function secInfo(s,d){ const kk=(10-d)/10;
  if(s===1) return `Cylindre (r = 4 cm, h = 8 cm), plan à ${fmt(.8*d)} cm du fond : la section est toujours un <b>disque de rayon 4 cm</b>.`;
  if(d===10&&s!==4) return `${s===2?'Cône':'Pyramide'} : le plan passe par le sommet, la section est réduite à un point.`;
  if(s===2) return `Cône (r = 6 cm, h = 10 cm), plan à ${d} cm de la base, donc à ${10-d} cm du sommet : disque, réduction de la base de rapport ${fmt(kk)}, rayon ${fmt(6*kk)} cm.`;
  if(s===3) return `Pyramide à base carrée (côté 6 cm, h = 10 cm), plan à ${d} cm de la base : carré, réduction de rapport ${fmt(kk)}, côté ${fmt(6*kk)} cm.`;
  const zr=d-5; if(Math.abs(zr)===5) return 'Sphère (r = 5 cm), plan à 5 cm du centre : il touche la sphère en un seul point.'; return `Sphère (r = 5 cm), plan à ${Math.abs(zr)} cm du centre : cercle de rayon √(25 − ${zr*zr}) ≈ ${fmt(Math.sqrt(25-zr*zr))} cm${zr===0?', un grand cercle':''}.`; }
// l’orange coupée (rayon 5 cm, plan à d cm du centre)
function orange(d){ const S=sc(30,20), k=.62, z=d*k, rho=k*Math.sqrt(25-d*d);
  ball(S,5*k,[0,0,0],{c:'var(--other)',fo:.12});
  const L=3.9; S.poly([[-L,-L,z],[L,-L,z],[L,L,z],[-L,L,z]],{fill:'var(--math)',fo:.12,c:'var(--math)',w:1});
  if(rho>.01){ const pts=[]; for(let i=0;i<60;i++) pts.push(circ(rho,z)(2*Math.PI*i/60)); S.poly(pts,{fill:'var(--spark)',fo:.5,c:'var(--spark)',w:3}); }
  const O=[0,0,0], Hh=[0,0,z], M=circ(rho,z)(S.az+Math.PI/2);
  S.seg(O,Hh,{c:'var(--ink)',w:2}); S.seg(O,M,{c:'var(--other)',w:2}); if(rho>.01) S.seg(Hh,M,{c:'var(--spark)',w:2.5});
  S.dot(O,{l:d===0?'O = H':'O',r:4,dx:d===0?-44:-20}); if(d>0) S.dot(Hh,{l:'H',r:4,dx:-20}); S.dot(M,{l:'M',r:4});
  S.text(mid([O,M]),'5',{dx:6,dy:12,c:'var(--other)'});
  return S.svg(); }
// pyramide et cône en perspective cavalière
function cavFig(names=['A','B','C','D'],hidden=true){ const P=plane({x:[-1,13.5],y:[-1,6.5],grid:false,axes:false});
  const A=cav(0,0,0), B=cav(4,0,0), C=cav(4,4,0), Dd=cav(0,4,0), O=cav(2,2,0), T=cav(2,2,4);
  const vis={c:'var(--accent)',w:2.5}, hid=hidden?HID:vis;
  P.seg(...A,...Dd,hid).seg(...Dd,...C,hid).seg(...T,...Dd,hid);
  if(hidden){ P.seg(...A,...C,{c:'var(--muted)',w:1,dash:true}).seg(...B,...Dd,{c:'var(--muted)',w:1,dash:true}).seg(...T,...O,{c:'var(--spark)',w:2,dash:true}); }
  P.poly([A,B,T],{fill:'var(--accent)',fo:.12,c:null}).poly([B,C,T],{fill:'var(--accent)',fo:.2,c:null});
  P.seg(...A,...B,vis).seg(...B,...C,vis).seg(...T,...A,vis).seg(...T,...B,vis).seg(...T,...C,vis);
  P.text(...A,names[0],{dx:-12,dy:14}).text(...B,names[1],{dx:4,dy:14}).text(...C,names[2],{dx:5,dy:2}).text(...Dd,names[3],{dx:-14,dy:-4}).text(...T,'S',{dx:-4,dy:-8});
  if(hidden){ P.dot(...O,{r:3,c:'var(--spark)'});
    // le cône : base horizontale de rayon 2 (un ovale), sommet à 4,5
    const cx=9.8, e=t=>{ const p=cav(cx+2*Math.cos(t),2*Math.sin(t),0); return p; }, Tc=cav(cx,0,4.5), N=720;
    const cr=t=>{ const p=e(t), q=e(t+1e-4); return (p[0]-Tc[0])*(q[1]-p[1])-(p[1]-Tc[1])*(q[0]-p[0]); };
    const tg=[]; for(let i=0;i<N;i++){ const t0=2*Math.PI*i/N, t1=2*Math.PI*(i+1)/N; if(cr(t0)*cr(t1)<0) tg.push((t0+t1)/2); }
    const [u1,u2]=tg; const front=t=>{ let a=u1,b=u2; return (t>a&&t<b)===(-Math.PI/2+2*Math.PI>a&&-Math.PI/2+2*Math.PI<b); };
    let run=[],cur=null; const out=()=>{ if(run.length>1) P.poly(run,Object.assign({open:true},cur?vis:HID)); };
    for(let i=0;i<=N;i+=4){ const t=2*Math.PI*i/N, v=front(t), p=e(t); if(cur!==null&&v!==cur){ run.push(p); out(); run=[p]; } else run.push(p); cur=v; } out();
    P.seg(...Tc,...e(u1),vis).seg(...Tc,...e(u2),vis).seg(...Tc,...cav(cx,0,0),{c:'var(--spark)',w:2,dash:true}).dot(...cav(cx,0,0),{r:3,c:'var(--spark)'}).text(...Tc,'S',{dx:-4,dy:-8});
  }
  return P.svg(); }
// trois vues d’un solide
function vuesFig(){ const P=plane({x:[0,15],y:[0,6],grid:false,axes:false}), q={fill:'var(--accent)',fo:.15,c:'var(--accent)',w:2.5};
  P.poly([[.6,1],[4.4,1],[2.5,4.6]],q).poly([[10.6,1],[14.4,1],[12.5,4.6]],q);
  P.rect(5.6,1,3.8,3.6,q).seg(5.6,1,9.4,4.6,{c:'var(--accent)',w:2}).seg(5.6,4.6,9.4,1,{c:'var(--accent)',w:2});
  P.text(2.5,5.2,'de face',{a:'middle'}).text(7.5,5.2,'de dessus',{a:'middle'}).text(12.5,5.2,'de côté',{a:'middle'});
  return P.svg(); }
// cône simple étiqueté
function coneLab(r,h,lr,lh,lg,o={}){ const S=sc(30,18), z0=-h/2-.3; const A=cone(S,r,h,{z:z0,c:o.c});
  const O=[0,0,z0], B=circ(r,z0)(S.az+Math.PI/2);
  S.seg(A,O,{c:'var(--spark)',w:2,dash:true}); S.seg(O,B,{c:'var(--spark)',w:2});
  if(lh) S.text(mid([A,O]),lh,{dx:-50,c:'var(--spark)'}); if(lr) S.text(mid([O,B]),lr,{dy:16,a:'middle',c:'var(--spark)'}); if(lg) S.text(mid([A,B]),lg,{dx:8,c:'var(--accent)'});
  if(o.A) S.dot(circ(r,z0)(S.az),{l:'A',r:5,dy:18,dx:-4});
  return S.svg(); }

/* ---------- figures du chapitre « Volumes et autres grandeurs » ---------- */
// expérience du remplissage : s = 1 pyramide → prisme, s = 2 cône → cylindre ; k verres versés
function fillFig(s,k){ const S=sc(30,20), H=3.6, z0=-1.9, b=1.35, yL=-2.6, yR=1.8, lvl=z0+H*k/3, wat={fill:'var(--math)',fo:.35,c:'var(--math)',w:1.5};
  if(s===1){ if(k>0){ const W=boxV(-b,yR-b,z0,b,yR+b,lvl); poly3(S,W.V,W.F,Object.assign({noHid:true},wat)); }
    const Bx=boxV(-b,yR-b,z0,b,yR+b,z0+H); poly3(S,Bx.V,Bx.F,{fo:0});
    const Py=pyrV(4,b*Math.SQRT2,H,z0,Math.PI/4,0,yL); poly3(S,Py.V,Py.F,k<3?wat:{});
    S.text([0,yL,z0+H+.4],'pyramide',{a:'middle',dy:-6}); S.text([0,yR,z0+H+.4],'prisme',{a:'middle',dy:-6}); }
  else { if(k>0) cyl(S,b,z0,lvl,{y:yR,fill:'var(--math)',c:'var(--math)',fo:.35,w:1.5});
    cyl(S,b,z0,z0+H,{y:yR,fo:0});
    cone(S,b,H,k<3?{z:z0,y:yL,fill:'var(--math)',fo:.35}:{z:z0,y:yL});
    S.text([0,yL,z0+H+.4],'cône',{a:'middle',dy:-6}); S.text([0,yR,z0+H+.4],'cylindre',{a:'middle',dy:-6}); }
  return S.svg(); }
// le cube découpé en 6 pyramides
function cube6(){ const S=sc(30,20), b=2, Bx=boxV(-b,-b,-b,b,b,b); poly3(S,Bx.V,Bx.F,{fo:.08});
  const O=[0,0,0]; Bx.V.forEach(v=>S.seg(O,v,{c:'var(--muted)',w:1,dash:true}));
  const f=[[b,-b,-b],[b,b,-b],[b,b,b],[b,-b,b]]; S.poly(f,{fill:'var(--spark)',fo:.35,c:'var(--spark)',w:2});
  f.forEach(v=>S.seg(O,v,{c:'var(--spark)',w:2.5})); S.dot(O,{l:'centre',r:4,dx:-50,dy:-8});
  S.text(mid([[b,-b,-b],[b,b,-b]]),'6 cm',{a:'middle',dy:18});
  return S.svg(); }
// développement d’une pyramide à base carrée (côté 6, apothème 5)
function pyrNet(){ const P=plane({x:[-8.5,8.5],y:[-8.5,8.5],grid:false,axes:false}), q={fill:'var(--math)',fo:.2,c:'var(--math)',w:2};
  P.rect(-3,-3,6,6,{fill:'var(--accent)',fo:.2,c:'var(--accent)',w:2.5});
  P.poly([[-3,3],[3,3],[0,8]],q).poly([[3,-3],[3,3],[8,0]],q).poly([[-3,-3],[3,-3],[0,-8]],q).poly([[-3,-3],[-3,3],[-8,0]],q);
  P.seg(0,3,0,8,{c:'var(--spark)',w:2,dash:true}).text(0,5.5,'apothème 5',{dx:6,s:12,c:'var(--spark)'});
  P.text(0,-3,'6 cm',{a:'middle',dy:-6,s:12}).text(0,0,'base',{a:'middle',dy:5,s:12});
  return P.svg(); }
// boule dans un cylindre, avec le cône (Archimède)
function archi(r){ const S=sc(30,15,5.6);
  cyl(S,r,-r,r,{c:'var(--math)',fo:.06,w:2});
  ball(S,r,[0,0,0],{fill:'var(--accent)',fo:.25});
  cone(S,r,2*r,{z:-r,c:'var(--spark)',fo:0,w:1.8,rim:'none'});
  S.dot([0,0,0],{r:3}).seg([0,0,0],circ(r,0)(S.az+Math.PI/2),{c:'var(--ink)',w:2}).text(circ(r/2,0)(S.az+Math.PI/2),'r',{dy:-6,a:'middle'});
  return S.svg(); }
// silo : cylindre + toit conique
function silo(){ const S=sc(30,18), k=.62, z0=-2.6, z1=z0+6*k; cyl(S,2*k,z0,z1,{noTop:true}); cone(S,2*k,1.5*k,{z:z1,c:'var(--other)'});
  const B=circ(2*k,z0)(S.az+Math.PI/2);
  S.text(circ(2*k,(z0+z1)/2)(S.az+Math.PI/2),'6 m',{dx:8}).text(mid([[0,0,z0],B]),'2 m',{a:'middle',dy:24}).text([0,0,z1+1.5*k],'1,5 m',{dx:10,dy:-4,c:'var(--other)'});
  S.seg([0,0,z0],B,{c:'var(--spark)',w:2});
  return S.svg(); }
// cornet de glace : cône pointe en bas + demi-boule
function glace(){ const S=sc(30,22), k=.5, z0=1.6; cone(S,3*k,10*k,{z:z0,down:true,rim:'front',c:'var(--other)'}); dome(S,3*k,[0,0,z0],{c:'var(--spark)'});
  S.text([0,0,z0-5*k],'10 cm',{dx:30}).text(circ(3*k,z0)(S.az+Math.PI/2),'r = 3 cm',{dx:6});
  return S.svg(); }
// moule conique de rayon 4 cm, hauteur h (à l’échelle 0,45)
function moule(h){ const S=sc(30,18), k=.45, z0=-3; const A=cone(S,4*k,h*k,{z:z0,c:'var(--other)'}); const O=[0,0,z0], B=circ(4*k,z0)(S.az+Math.PI/2);
  S.seg(A,O,{c:'var(--spark)',w:2,dash:true}).seg(O,B,{c:'var(--spark)',w:2});
  S.text(mid([O,B]),'4 cm',{a:'middle',dy:16}).text(mid([A,O]),`h = ${fmt(h)}`,{dx:-60});
  return S.svg(); }
// cube de c cm d’arête, quadrillé en cubes de 1 cm
function cubeGrid(c){ const S=sc(30,20), u=.5, s=u*c, b=s/2, Bx=boxV(-b,-b,-b,b,b,b); poly3(S,Bx.V,Bx.F,{fo:.15});
  const q={c:'var(--accent)',w:.8,op:.7};
  for(let i=1;i<c;i++){ const t=-b+i*u;
    S.seg([t,-b,b],[t,b,b],q).seg([-b,t,b],[b,t,b],q);
    S.seg([b,t,-b],[b,t,b],q).seg([b,-b,t],[b,b,t],q);
    S.seg([t,b,-b],[t,b,b],q).seg([-b,b,t],[b,b,t],q); }
  S.text([b,0,-b],`${c} cm`,{dy:18,dx:6});
  return S.svg(); }
// château d’eau : cylindre sur un cône pointe en bas
function chateau(){ const S=sc(30,18), k=.5, zc=-1.1; cone(S,4*k,3*k,{z:zc,down:true,rim:'none',c:'var(--other)'}); cyl(S,4*k,zc,zc+6*k,{c:'var(--math)'});
  S.text(circ(4*k,zc+3*k)(S.az+Math.PI/2),'6 m',{dx:8}).text(circ(4*k,zc-1.5*k)(S.az+Math.PI/2),'3 m',{dx:-2,c:'var(--other)'});
  S.seg([0,0,zc+6*k],circ(4*k,zc+6*k)(S.az+Math.PI/2),{c:'var(--spark)',w:2}).text(circ(2*k,zc+6*k)(S.az+Math.PI/2),'4 m',{a:'middle',dy:-6});
  return S.svg(); }
// bac de glace et boule
function bac(){ const S=sc(30,22), k=.14, Bx=boxV(-15*k,-10*k-1.2,-6*k,15*k,10*k-1.2,6*k); poly3(S,Bx.V,Bx.F,{c:'var(--math)',fo:.15});
  ball(S,3*k*2.2,[0,3.2,-.2],{c:'var(--spark)',fo:.3});
  S.text([15*k,-1.2,-6*k],'30 × 20 × 12 cm',{dy:22,dx:-30,s:12}).text([0,3.2,-.2-3*k*2.2],'r = 3 cm',{dy:18,a:'middle',s:12});
  return S.svg(); }

COURS.push(
/* ===================== CÔNES, SPHÈRES ET PYRAMIDES ===================== */
{subj:'sec', sem:'a11', id:'sec11-solides', o:10, h:'Cônes, sphères et pyramides', p:'Reconnaître les solides pointus et ronds, calculer leurs longueurs cachées, les déplier, les dessiner et les couper en tranches.', steps:[
 {kind:'Théorie', h:'Des solides qui tournent : cône et sphère',
  p:`<p>Un cornet de glace, un cône de chantier, un ballon, une bille : ces objets n’ont pas que des faces plates. Ils sont « ronds ». On les obtient en faisant <b>tourner</b> une figure plane autour d’une droite, l’<b>axe</b>, comme un potier qui tourne son argile. Ce sont des <b>solides de révolution</b>.</p>
<div class="def"><p>Un <b>cône</b> est le solide balayé par un triangle rectangle qui tourne autour d’un côté de l’angle droit. Il a un <b>sommet</b> S, une <b>base</b> qui est un disque de centre O et de rayon <i>r</i>, une <b>hauteur</b> <i>h</i> = SO, et des <b>génératrices</b> : les segments qui vont de S au bord de la base. Elles ont toutes la même longueur <i>g</i>.</p>
<p>Une <b>sphère</b> de centre O et de rayon <i>r</i> est formée de tous les points à la distance <i>r</i> de O. Elle est balayée par un demi-disque qui tourne autour de son diamètre. La sphère est la « peau » ; avec tout l’intérieur, on parle de <b>boule</b>.</p></div>
<div class="idea"><p>Choisis une forme et fais-la tourner. Le côté collé à l’axe ne bouge pas : il devient la hauteur. L’autre côté de l’angle droit devient le rayon de la base. L’hypoténuse balaie toute la surface : c’est une génératrice.</p></div>
<div class="ex"><p>Un triangle rectangle de côtés 3 cm et 4 cm tourne autour du côté de 4 cm : on obtient un cône de hauteur 4 cm et de rayon 3 cm. Autour du côté de 3 cm, on obtient un cône plus plat : hauteur 3 cm, rayon 4 cm. Un rectangle qui tourne autour d’un côté donne un <b>cylindre</b>.</p></div>
<div class="warn"><p>Le cône, la sphère et le cylindre ne sont <b>pas</b> des polyèdres. Un polyèdre n’a que des faces planes (des polygones), eux ont une surface courbe.</p></div>`,
  params:[{id:'f',l:'Forme (1 triangle, 2 demi-disque, 3 rectangle)',min:1,max:3,v:1},{id:'t',l:'Angle de rotation',min:0,max:360,step:20,v:120,u:'°'}],
  draw:v=>revol(v.f,v.t),
  info:v=>`${['','Triangle rectangle → <b>cône</b>','Demi-disque → <b>sphère</b> (et boule)','Rectangle → <b>cylindre</b>'][v.f]}. Angle parcouru : ${v.t}°${v.t===360?' : un tour complet, le solide est terminé.':'.'}`},
 {kind:'Théorie', h:'La pyramide régulière',
  p:`<p>Les pyramides d’Égypte, le toit pointu d’une tour de château, certaines tentes : toutes ont une base en forme de polygone et des faces triangulaires qui se rejoignent en un sommet.</p>
<div class="def"><p>Une <b>pyramide</b> a une base qui est un polygone et des <b>faces latérales</b> triangulaires qui ont un sommet commun S. Elle est <b>régulière</b> si sa base est un polygone régulier (côtés égaux et angles égaux) et si S est juste au-dessus du centre O de la base. Alors :</p>
<ul><li>la <b>hauteur</b> <i>h</i> = SO est perpendiculaire à la base ;</li><li>les <b>arêtes latérales</b> ont toutes la même longueur ;</li><li>les faces latérales sont des triangles isocèles identiques. La hauteur de l’une d’elles, de S au milieu M d’un côté de la base, s’appelle l’<b>apothème</b> de la pyramide.</li></ul></div>
<div class="idea"><p>Fais tourner la pyramide et change sa base. La hauteur SO (en pointillés orange) est cachée à l’intérieur. L’apothème SM (en bleu) est dessiné sur une face. L’apothème est toujours plus long que la hauteur : il est penché.</p></div>
<div class="ex"><p>Base hexagonale : 6 faces latérales + 1 base = 7 faces ; 6 arêtes de base + 6 arêtes latérales = 12 arêtes ; 6 + 1 = 7 sommets. Avec une base à <i>n</i> côtés : <i>n</i> + 1 faces, 2<i>n</i> arêtes, <i>n</i> + 1 sommets.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>La pyramide de Khéops, à Gizeh, a une base carrée d’environ 230 m de côté et mesurait 146 m de haut. Elle est restée la plus haute construction humaine pendant près de 3800 ans.</p></div>`,
  params:[{id:'n',l:'Côtés de la base',min:3,max:8,v:4},{id:'az',l:'Rotation',min:0,max:345,step:15,v:30,u:'°'}],
  draw:v=>pyrFig(v.n,v.az),
  info:v=>`Base : ${nomBase[v.n]}. Faces : ${v.n+1}, arêtes : ${2*v.n}, sommets : ${v.n+1}. Curiosité : faces + sommets − arêtes = ${v.n+1} + ${v.n+1} − ${2*v.n} = 2 (relation d’Euler).`},
 {kind:'Méthode', h:'Trouver une longueur cachée avec Pythagore',
  p:`<p>Dans une pyramide ou un cône, la hauteur est cachée à l’intérieur : on ne peut pas la mesurer avec une règle. On la calcule avec le <b>théorème de Pythagore</b> (rappel : dans un triangle rectangle, le carré de l’hypoténuse est égal à la somme des carrés des deux autres côtés). Tout le travail consiste à <b>repérer un triangle rectangle</b> dans le solide :</p>
<ul><li>SOM, rectangle en O : la hauteur SO, la distance OM du centre au milieu d’un côté, et l’apothème SM (l’hypoténuse) ;</li><li>SMA, rectangle en M, sur une face : l’apothème SM, le demi-côté MA et l’arête SA (l’hypoténuse) ;</li><li>dans un cône, SOA, rectangle en O : <i>g</i>² = <i>r</i>² + <i>h</i>².</li></ul>
<p>Pour une base carrée de côté <i>a</i>, OM = <i>a</i> : 2. Rédige toujours : phrase, calcul, réponse avec l’unité.</p>`,
  fig:pyrCalc(),
  demo:{enonce:'a) Une pyramide régulière à base carrée a 6 cm de côté et 4 cm de hauteur. Calcule son apothème et ses arêtes latérales. b) Un cône a une génératrice de 10 cm et un rayon de 6 cm. Calcule sa hauteur.',
   etapes:[
    {f:'OM = 6 : 2 = 3 cm',w:'O est le centre du carré et M le milieu d’un côté : OM vaut la moitié du côté.'},
    {f:'SM² = SO² + OM² = 4² + 3² = 16 + 9 = 25, donc SM = √25 = 5 cm',w:'Le triangle SOM est rectangle en O, car la hauteur est perpendiculaire à la base. SM est l’hypoténuse : on additionne.'},
    {f:'SA² = SM² + MA² = 5² + 3² = 25 + 9 = 34, donc SA = √34 ≈ 5,83 cm',w:'Sur la face SAB, l’apothème SM est perpendiculaire à [AB] en son milieu M, donc MA = 3 cm.'},
    {f:'h² = g² − r² = 10² − 6² = 100 − 36 = 64, donc h = √64 = 8 cm',w:'Dans le cône, SOA est rectangle en O et l’hypoténuse est la génératrice. On cherche un côté de l’angle droit : on soustrait.'}],
   conclusion:'L’apothème mesure 5 cm, les arêtes latérales environ 5,83 cm, et le cône a une hauteur de 8 cm.'},
  note:'<b>Piège :</b> l’hypoténuse est le côté le plus long, en face de l’angle droit. Pour la trouver, on additionne les carrés ; pour un autre côté, on soustrait.'},
 {h:'L’apothème du toit', p:'Le toit d’une tour est une pyramide régulière à base carrée de 10 m de côté et de 12 m de hauteur. Calcule l’apothème de ce toit.',
  lab:'apothème =', unit:'m', ans:13,
  why:'OM = 10 : 2 = 5 m. Le triangle SOM est rectangle en O : SM² = 12² + 5² = 144 + 25 = 169, donc SM = √169 = 13 m.'},
 {kind:'Théorie', h:'Le développement du cylindre',
  p:`<p>Prends une boîte de conserve. Découpe l’étiquette tout droit et déroule-la : tu obtiens un rectangle. C’est le début du <b>développement</b> du cylindre : la figure plane qu’on obtient en dépliant le solide, et qu’on peut replier pour le reconstruire.</p>
<div class="def"><p>Le développement d’un cylindre de rayon <i>r</i> et de hauteur <i>h</i> est formé d’un <b>rectangle</b> et de <b>deux disques</b> de rayon <i>r</i>. Le rectangle a pour largeur <i>h</i> et pour longueur le <b>périmètre du disque</b>, 2π<i>r</i>.</p></div>
<div class="why"><p>Quand on enroule le rectangle autour du disque, son grand côté fait exactement une fois le tour du bord. Sa longueur est donc égale au périmètre du cercle, 2π<i>r</i> (rappel : π ≈ 3,14).</p></div>
<div class="ex"><p>Une boîte de rayon 3 cm et de hauteur 10 cm : le rectangle mesure 2π · 3 ≈ 18,85 cm sur 10 cm. Son aire est l’<b>aire latérale</b> du cylindre : 2π<i>rh</i> = 2π · 3 · 10 ≈ 188,50 cm².</p></div>
<div class="warn"><p>Le rectangle ne mesure pas 2<i>r</i> (le diamètre) de long : il doit faire tout le tour. Ici, 18,85 cm et pas 6 cm.</p></div>
<p>Change le rayon : le rectangle s’allonge vite, car sa longueur vaut environ 6,28 fois le rayon.</p>`,
  params:[{id:'r',l:'Rayon r',min:1,max:3,step:.5,v:2,u:' cm'},{id:'h',l:'Hauteur h',min:1,max:5,v:3,u:' cm'}],
  draw:v=>cylNet(v.r,v.h),
  info:v=>`Rectangle : ${fmt(2*Math.PI*v.r)} cm sur ${v.h} cm. Aire latérale : 2π · ${fmt(v.r)} · ${v.h} ≈ ${fmt(2*Math.PI*v.r*v.h)} cm².`},
 {kind:'Théorie', h:'Une pyramide qui se replie',
  p:`<p>Pour fabriquer une pyramide en carton, on dessine son développement, on le découpe, puis on plie le long des côtés de la base. Fais-le avec le curseur : les quatre triangles se lèvent et leurs pointes se rejoignent.</p>
<div class="def"><p>Le développement d’une pyramide régulière dont la base a <i>n</i> côtés est formé de la <b>base</b> (un polygone régulier) et de <i>n</i> <b>triangles isocèles identiques</b>, collés chacun sur un côté de la base. Chaque triangle a pour base un côté <i>a</i> de la base, pour hauteur l’<b>apothème</b> de la pyramide, et ses deux autres côtés sont des arêtes latérales.</p></div>
<div class="idea"><p>Une fois pliés, deux triangles voisins se touchent le long d’un côté : ces deux côtés doivent avoir la même longueur. C’est pourquoi les triangles sont isocèles et tous pareils. Leurs pointes deviennent un seul point, le sommet S.</p></div>
<div class="ex"><p>Pyramide à base carrée de côté 6 cm et d’apothème 5 cm : on dessine un carré de 6 cm, puis sur chaque côté un triangle de base 6 cm et de hauteur 5 cm. Les côtés obliques mesurent √(5² + 3²) = √34 ≈ 5,83 cm.</p></div>
<div class="warn"><p>Pour dessiner les triangles, il faut l’<b>apothème</b>, pas la hauteur de la pyramide. Et si l’apothème est plus court que la moitié du côté, les pointes ne se rejoignent jamais.</p></div>`,
  params:[{id:'f',l:'Pliage',min:0,max:10,v:2,u:' / 10'},{id:'az',l:'Rotation',min:0,max:345,step:15,v:30,u:'°'}],
  draw:v=>fold(v.f,v.az),
  info:v=>v.f===0?'À plat : un carré et 4 triangles isocèles identiques.':v.f===10?'Les 4 pointes se rejoignent : c’est le sommet S de la pyramide.':`Pliage à ${v.f*10} % : les triangles tournent autour des côtés du carré.`},
 {kind:'Théorie', h:'Le développement du cône : un secteur',
  p:`<p>Un chapeau pointu de fête, un cornet de frites : on les fabrique avec un morceau de carton en forme de part de tarte. Mais quel angle faut-il découper ?</p>
<div class="def"><p>La surface latérale d’un cône de rayon <i>r</i> et de génératrice <i>g</i> se déplie en un <b>secteur de disque</b> (une part de disque) de rayon <i>g</i>. Son arc a pour longueur le périmètre de la base, 2π<i>r</i>. Son angle vaut :</p><p style="text-align:center"><b>α = 360° · ${F('<i>r</i>','<i>g</i>')}</b></p></div>
<div class="why"><p>Un disque entier de rayon <i>g</i> aurait un bord de 2π<i>g</i>. On n’en garde que 2π<i>r</i>, c’est-à-dire la fraction ${F('<i>r</i>','<i>g</i>')} du tour. Rappel : la longueur d’un arc et l’aire d’un secteur sont proportionnelles à l’angle. L’angle est donc aussi la fraction ${F('<i>r</i>','<i>g</i>')} de 360°.</p></div>
<div class="ex"><p>Cône de rayon 3 cm et de génératrice 9 cm : α = 360° · 3/9 = 120°, un tiers de disque. L’aire du secteur est un tiers de l’aire du disque de rayon 9 : π · 9² : 3 = 27π ≈ 84,82 cm². En général, l’<b>aire latérale du cône</b> vaut π<i>rg</i> (ici π · 3 · 9 = 27π).</p></div>
<div class="warn"><p>Le rayon du secteur est la génératrice <i>g</i>, pas la hauteur <i>h</i>. Comme <i>r</i> est plus petit que <i>g</i>, l’angle reste plus petit que 360°.</p></div>`,
  params:[{id:'r',l:'Rayon de la base r',min:1,max:6,v:3,u:' cm'},{id:'g',l:'Génératrice g',min:2,max:12,v:9,u:' cm'}],
  draw:v=>coneNet(v.r,v.g,v.r<v.g?360*v.r/v.g:0),
  info:v=>v.r>=v.g?'La génératrice est l’hypoténuse du triangle SOA : elle doit être plus longue que le rayon.':`α = 360° · ${v.r}/${v.g} ≈ ${fmt(360*v.r/v.g,1)}°. Arc = 2π · ${v.r} ≈ ${fmt(2*Math.PI*v.r)} cm. Aire latérale = π · ${v.r} · ${v.g} ≈ ${fmt(Math.PI*v.r*v.g)} cm².`},
 {kind:'Méthode', h:'Calculer l’angle du secteur d’un cône',
  p:`<p>Pour fabriquer un cône en papier, il faut le rayon et l’angle du secteur à découper.</p>
<ol><li>Trouve la génératrice <i>g</i>. Elle est parfois donnée ; sinon, calcule-la avec Pythagore : <i>g</i>² = <i>r</i>² + <i>h</i>².</li><li>Calcule α = 360° · <i>r</i>/<i>g</i>. Contrôle : α est entre 0° et 360°.</li><li>Dans l’autre sens, si tu connais α et <i>g</i>, le rayon de la base est <i>r</i> = <i>g</i> · α/360°.</li></ol>
<p>Ça marche parce que l’arc du secteur doit faire exactement le tour de la base : ni plus, ni moins.</p>`,
  demo:{enonce:'a) Un cône a un rayon de 4 cm et une hauteur de 3 cm. Quel est l’angle du secteur de son développement ? b) On roule un secteur de 120° découpé dans un disque de rayon 12 cm. Quel est le rayon de la base du cône obtenu ?',
   etapes:[
    {f:'g² = 4² + 3² = 16 + 9 = 25, donc g = 5 cm',w:'Le rayon du secteur est la génératrice, qu’on ne connaît pas encore. Le triangle SOA est rectangle en O.'},
    {f:'α = 360° · 4/5 = 288°',w:'L’arc garde 4/5 du tour complet : c’est un grand secteur, il ne manque que 72°.'},
    {f:'r = 12 · 120/360 = 12 · 1/3 = 4 cm',w:'120° est un tiers de tour. L’arc vaut un tiers du grand cercle, donc le rayon de la base vaut un tiers de 12 cm.'}],
   conclusion:'a) Il faut un secteur de 288° et de rayon 5 cm. b) Le cône a une base de rayon 4 cm.'}},
 {kind:'Pratique', h:'Fabrique un cornet en carton', p:'Tu veux un cornet de rayon 6 cm et de génératrice 15 cm. Règle l’angle du secteur à découper.',
  params:[{id:'a',l:'Angle du secteur',min:0,max:360,step:6,v:90,u:'°'}],
  draw:v=>coneNet(6,15,v.a),
  info:v=>`Arc du secteur : 2π · 15 · ${v.a}/360 ≈ ${fmt(2*Math.PI*15*v.a/360)} cm.`,
  ok:v=>v.a===144, why:'α = 360° · 6/15 = 360° · 0,4 = 144°. L’arc mesure alors 2π · 6 ≈ 37,70 cm : exactement le tour de la base.'},
 {kind:'Théorie', h:'Couper un solide : les sections',
  p:`<p>Tranche un concombre, une carotte, une orange : la face coupée a une forme bien précise. En maths, couper un solide par un plan donne une <b>section</b>.</p>
<div class="def"><p>Quand on coupe par un plan <b>parallèle à la base</b> :</p><ul><li>un cylindre donne un disque de même rayon que la base ;</li><li>un cône donne un disque plus petit, et une pyramide un polygone de même forme que la base mais plus petit : c’est une <b>réduction</b> de la base ;</li></ul><p>Une sphère, coupée par n’importe quel plan, donne un <b>cercle</b>. Il est le plus grand quand le plan passe par le centre : c’est un <b>grand cercle</b>, de même rayon que la sphère.</p></div>
<div class="idea"><p>Choisis un solide et monte le plan. Pour le cône et la pyramide, la section rétrécit régulièrement jusqu’au sommet. Pour la sphère, elle grandit puis rapetisse.</p></div>
<div class="ex"><p>Une boule de rayon 10 cm coupée à 6 cm du centre donne un cercle de rayon 8 cm (on verra comment le calculer). Un cylindre coupé par un plan vertical qui contient son axe donne un rectangle. Un cône coupé de la même façon donne un triangle isocèle de côtés <i>g</i>, <i>g</i> et 2<i>r</i>.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Sur un globe, les parallèles sont des sections de la Terre par des plans parallèles à l’équateur. L’équateur est le seul parallèle qui soit un grand cercle : environ 40 000 km de tour.</p></div>`,
  params:[{id:'s',l:'Solide (1 cylindre, 2 cône, 3 pyramide, 4 sphère)',min:1,max:4,v:2},{id:'d',l:'Hauteur du plan',min:0,max:10,v:4,u:' / 10'}],
  draw:v=>secFig(v.s,v.d), info:v=>secInfo(v.s,v.d)},
 {kind:'Méthode', h:'Calculer le rayon d’une section',
  p:`<p>Deux outils déjà connus suffisent.</p>
<ul><li><b>Sphère.</b> Le centre O de la sphère, le centre H de la section et un point M du bord de la section forment un triangle <b>rectangle en H</b>, d’hypoténuse OM = <i>r</i>. Avec <i>d</i> = OH, Pythagore donne : ρ² = <i>r</i>² − <i>d</i>². La lettre grecque ρ (« rhô ») désigne le rayon de la section.</li>
<li><b>Cône ou pyramide.</b> La section parallèle à la base est une réduction de la base. Si elle est à la distance <i>s</i> du <b>sommet</b> et que la hauteur vaut <i>h</i>, le rapport de réduction est <i>k</i> = <i>s</i>/<i>h</i> (théorème de Thalès dans le triangle SOA). Toutes les longueurs de la base sont multipliées par <i>k</i>.</li></ul>`,
  demo:{enonce:'a) Une boule de rayon 13 cm est coupée par un plan à 5 cm du centre. Quel est le rayon de la section ? b) Un cône de rayon 8 cm et de hauteur 12 cm est coupé parallèlement à la base, à 9 cm au-dessus de la base. Quel est le rayon de la section ?',
   etapes:[
    {f:'ρ² = 13² − 5² = 169 − 25 = 144, donc ρ = 12 cm',w:'OHM est rectangle en H ; l’hypoténuse OM est un rayon de la sphère, on soustrait.'},
    {f:'Distance au sommet : s = 12 − 9 = 3 cm',w:'Le rapport se compte depuis le sommet, là où la section devient un point.'},
    {f:'k = 3/12 = 1/4, donc ρ = 8 · 1/4 = 2 cm',w:'La section est une réduction de la base de rapport 1/4.'}],
   conclusion:'a) 12 cm. b) 2 cm. De même, une pyramide à base carrée de 6 cm coupée à mi-hauteur donne k = 1/2 : un carré de 3 cm de côté.'},
  note:'<b>Piège :</b> pour le cône, la distance utile est celle depuis le sommet. 9 cm au-dessus de la base ne donne pas k = 9/12.'},
 {kind:'Pratique', h:'Coupe l’orange', p:'Une orange est une boule de rayon 5 cm. À quelle distance du centre faut-il couper pour que la face coupée soit un disque de rayon 4 cm ? Règle la position du couteau.',
  params:[{id:'d',l:'Distance OH du couteau au centre',min:0,max:5,step:.5,v:1,u:' cm'}],
  draw:v=>orange(v.d), info:v=>`OH = ${fmt(v.d)} cm, OM = 5 cm.`,
  ok:v=>v.d===3, why:'d² = 5² − 4² = 25 − 16 = 9, donc d = 3 cm. Le triangle OHM a pour côtés 3, 4 et 5 cm.'},
 {kind:'Méthode', h:'Dessiner un solide en perspective',
  p:`<p>Pour dessiner un solide sur une feuille plate, on utilise la <b>perspective cavalière</b>. Rappel : les faces placées de face gardent leur vraie forme ; les arêtes qui partent vers l’arrière, les <b>fuyantes</b>, sont tracées en oblique (souvent à 45°) et réduites de moitié ; les arêtes cachées sont en <b>pointillés</b>.</p>
<p>Un cercle horizontal, comme la base d’un cône, devient un <b>ovale</b> aplati. On complète souvent le dessin par les <b>vues</b> : de face, de dessus, de côté, ce que verrait un œil placé loin dans chaque direction. Un cône posé sur sa base a une vue de face en triangle et une vue de dessus en disque avec son centre marqué. Une sphère se voit comme un disque dans toutes les directions.</p>`,
  fig:cavFig(),
  demo:{enonce:'Dessiner en perspective cavalière une pyramide régulière à base carrée de 4 cm de côté et de 4 cm de hauteur, puis un cône de rayon 2 cm et de hauteur 4,5 cm.',
   etapes:[
    {f:'Base ABCD : [AB] de 4 cm à l’horizontale, [AD] en fuyante à 45°, longue de 2 cm.',w:'La base est horizontale, elle part vers l’arrière : le carré devient un parallélogramme.'},
    {f:'Centre O : intersection des diagonales [AC] et [BD]. Sommet S : 4 cm à la verticale de O.',w:'La hauteur est verticale, donc de face : elle garde sa vraie longueur.'},
    {f:'Relier S à A, B, C et D. Mettre en pointillés [AD], [DC] et [SD].',w:'Le coin D, derrière à gauche, est caché par les faces SAB et SBC.'},
    {f:'Cône : base en ovale, S à 4,5 cm au-dessus du centre, puis les deux génératrices qui touchent l’ovale sur les côtés. La partie arrière de l’ovale est en pointillés.',w:'On ne trace pas toutes les génératrices : seulement les deux du contour.'}],
   conclusion:'On obtient le dessin ci-dessus. Les pointillés orange (hauteurs) sont des traits de construction.'}},
 {h:'Quel solide se cache derrière ces vues&nbsp;?', p:'Voici trois vues d’un même solide. De quel solide s’agit-il&nbsp;?', fig:vuesFig(),
  opts:['un cône','un prisme à base triangulaire','une pyramide à base carrée','une pyramide à base triangulaire'], ans:2,
  why:'De face et de côté, on voit un triangle : le solide se termine en pointe. De dessus, on voit un carré et ses diagonales : ce sont les 4 arêtes latérales qui montent vers le sommet, au-dessus du centre. C’est une pyramide régulière à base carrée.'},
 {kind:'Défi', h:'La fourmi sur le chapeau',
  p:'Une fourmi est au point A, sur le bord d’un chapeau pointu de rayon 2 cm et de génératrice 8 cm. Elle veut faire le tour complet du chapeau et revenir en A, par le chemin le plus court. Quelle est la longueur de ce chemin ? Arrondis au centième.',
  fig:coneLab(1.25,4.84,'','','',{A:true}), lab:'longueur =', unit:'cm', ans:11.31, tol:.006,
  why:'Stratégie : faire un dessin, ici déplier le chapeau. Le secteur a pour angle 360° · 2/8 = 90°. Le point A se retrouve aux deux bords du secteur, et le plus court chemin à plat est le segment qui les relie : l’hypoténuse d’un triangle rectangle isocèle de côtés 8 cm. √(8² + 8²) = √128 ≈ 11,31 cm, moins que le tour du bord (2π · 2 ≈ 12,57 cm).'},
 {kind:'Récapitulatif', h:'Ce qu’il faut retenir',
  p:`<div class="keep"><ul>
<li><b>Cône</b> : un triangle rectangle qui tourne. Sommet S, base disque de rayon <i>r</i>, hauteur <i>h</i>, génératrice <i>g</i>, avec <i>g</i>² = <i>r</i>² + <i>h</i>².</li>
<li><b>Sphère</b> : les points à la distance <i>r</i> du centre ; la <b>boule</b> comprend l’intérieur.</li>
<li><b>Pyramide régulière</b> : base polygone régulier, sommet au-dessus du centre. <b>Apothème</b> = hauteur d’une face. Base carrée de côté <i>a</i> : SM² = <i>h</i>² + (<i>a</i>/2)² et SA² = SM² + (<i>a</i>/2)².</li>
<li><b>Développements</b> : cylindre = rectangle de 2π<i>r</i> sur <i>h</i> + 2 disques ; pyramide = base + <i>n</i> triangles isocèles de hauteur l’apothème ; cône = secteur de rayon <i>g</i> et d’angle α = 360° · <i>r</i>/<i>g</i> + un disque. Aire latérale du cône : π<i>rg</i>.</li>
<li><b>Sections</b> : parallèle à la base, réduction de rapport <i>k</i> = distance au sommet / hauteur ; sphère : cercle de rayon ρ avec ρ² = <i>r</i>² − <i>d</i>².</li>
<li><b>Perspective cavalière</b> : fuyantes à 45° réduites de moitié, arêtes cachées en pointillés, cercle horizontal dessiné en ovale. Vues de face, de dessus, de côté.</li>
<li>Rédaction : phrase, calcul, réponse avec l’unité.</li></ul></div>`},
 {kind:'Problème', h:'Le chapeau de sorcière du carnaval',
  p:'Pour le carnaval, Léa fabrique un chapeau de sorcière en carton. C’est un cône de 9 cm de rayon, pour entourer sa tête, et de 40 cm de hauteur. Elle trace le développement de la surface latérale sur une feuille carrée de 50 cm de côté, puis le découpe. Le chapeau n’a pas de fond.',
  fig:coneLab(1.4,4.4,'9 cm','40 cm','g',{c:'var(--code)'}),
  parts:[
   {q:'a) Quelle est la longueur de la génératrice ?', lab:'g =', unit:'cm', ans:41, hint:'La hauteur, un rayon de la base et une génératrice forment un triangle rectangle.', why:'g² = 9² + 40² = 81 + 1600 = 1681, donc g = √1681 = 41 cm.'},
   {q:'b) Quel angle doit avoir le secteur ? Arrondis au degré.', lab:'α ≈', unit:'°', ans:79, tol:.6, hint:'L’arc du secteur doit faire le tour de la base : α = 360° · r/g.', why:'α = 360° · 9/41 ≈ 79,02°, donc environ 79°.'},
   {q:'c) Quelle aire de carton faut-il pour le chapeau ? Arrondis au cm².', unit:'cm²', ans:1159, tol:.6, hint:'L’aire latérale d’un cône vaut π · r · g.', why:'π · 9 · 41 = 369π ≈ 1159 cm².'},
   {q:'d) Le secteur tient-il sur la feuille carrée de 50 cm ?', opts:['Non : l’arc mesure 2π · 9 ≈ 56,5 cm, plus que 50 cm','Oui : posé avec sa pointe dans un coin, il tient dans un quart de disque de rayon 41 cm','Non : il faudrait au moins 82 cm, le double du rayon','Oui, car 41 + 9 = 50'], ans:1,
    hint:'Pose la pointe du secteur dans un coin de la feuille. Quel angle a ce coin ? Jusqu’où va le secteur ?', why:'Le coin d’un carré fait 90°, plus que 79°, et les bords mesurent 50 cm, plus que 41 cm. Le secteur tient dans le quart de disque de rayon 41 cm centré au coin. L’arc mesure bien 56,5 cm, mais il est courbé : ce n’est pas un problème.'}],
  sol:'<p>La génératrice est l’hypoténuse du triangle formé par la hauteur et un rayon : g² = 9² + 40² = 1681, donc g = 41 cm.</p><p>L’arc du secteur doit faire le tour de la tête : α = 360° · 9/41 ≈ 79°.</p><p>L’aire de carton est l’aire latérale : π · 9 · 41 = 369π ≈ 1159 cm².</p><p>Placé avec sa pointe dans un coin de la feuille, le secteur de 79° et de rayon 41 cm reste dans le quart de disque de rayon 41 cm, qui tient dans le carré de 50 cm. Léa peut donc découper son chapeau.</p>'},
 {kind:'Problème', h:'La pyramide de verre',
  p:'Une pyramide de verre, inspirée de celle du musée du Louvre à Paris, est une pyramide régulière à base carrée de 35 m de côté et de 21,6 m de hauteur. Les vitriers ont besoin de ses longueurs cachées pour fabriquer les barres de métal qui tiennent les vitres. On imagine aussi un plancher horizontal qui couperait la pyramide.',
  fig:secFig(3,5),
  parts:[
   {q:'a) Calcule l’apothème de la pyramide, arrondi au centième.', lab:'SM ≈', unit:'m', ans:27.80, tol:.006, hint:'Le triangle SOM est rectangle en O, avec OM égal à la moitié du côté.', why:'OM = 35 : 2 = 17,5 m. SM² = 21,6² + 17,5² = 466,56 + 306,25 = 772,81, donc SM ≈ 27,80 m.'},
   {q:'b) Calcule la longueur d’une arête latérale, arrondie au centième.', lab:'SA ≈', unit:'m', ans:32.85, tol:.006, hint:'Sur une face, le triangle SMA est rectangle en M, avec MA = 17,5 m.', why:'SA² = SM² + MA² = 772,81 + 306,25 = 1079,06, donc SA ≈ 32,85 m.'},
   {q:'c) Un plancher horizontal coupe la pyramide à 10,8 m du sol. Quel est le côté du carré de section ?', unit:'m', ans:17.5, tol:.001, hint:'La section est une réduction de la base. Calcule le rapport avec la distance au sommet.', why:'Distance au sommet : 21,6 − 10,8 = 10,8 m, donc k = 10,8/21,6 = 1/2. Côté : 35 · 1/2 = 17,5 m.'},
   {q:'d) À quelle hauteur au-dessus du sol faut-il placer le plancher pour que la section soit un carré de 7 m de côté ? Arrondis au centième.', unit:'m', ans:17.28, tol:.006, hint:'Le rapport vaut k = 7/35. La distance au sommet vaut k · 21,6.', why:'k = 7/35 = 1/5. Distance au sommet : 21,6 : 5 = 4,32 m. Hauteur au-dessus du sol : 21,6 − 4,32 = 17,28 m.'}],
  sol:'<p>Dans SOM rectangle en O : SM² = 21,6² + 17,5² = 772,81, donc l’apothème vaut environ 27,80 m.</p><p>Dans SMA rectangle en M : SA² = 772,81 + 17,5² = 1079,06, donc une arête mesure environ 32,85 m.</p><p>Une section parallèle à la base est une réduction de rapport k = (distance au sommet)/(hauteur). À 10,8 m du sol, k = 10,8/21,6 = 1/2 : carré de 17,5 m.</p><p>Pour un carré de 7 m, k = 7/35 = 1/5 : le plancher est à 21,6/5 = 4,32 m sous le sommet, donc à 21,6 − 4,32 = 17,28 m du sol.</p>'},
]},

/* ===================== VOLUMES ET AUTRES GRANDEURS ===================== */
{subj:'sec', sem:'a11', id:'sec11-volumes', o:11, h:'Volumes et autres grandeurs', p:'Calculer le volume et l’aire des pyramides, des cônes et des boules, des solides composés, et passer d’une unité à l’autre avec la vitesse, le débit et la masse volumique.', steps:[
 {kind:'Théorie', h:'Le tiers magique : pyramide et cône',
  p:`<p>Un défi de cuisine : tu as un verre en forme de pyramide et une boîte en forme de prisme, avec la même base et la même hauteur. Combien de verres pleins faut-il verser pour remplir la boîte ? Essaie avec le curseur.</p>
<div class="thm"><p>Le volume d’une pyramide (ou d’un cône) est le <b>tiers</b> du volume du prisme (ou du cylindre) qui a la même base et la même hauteur. Rappel : le volume d’un prisme ou d’un cylindre vaut aire de la base × hauteur. Donc :</p><p style="text-align:center"><b>V = ${F('<i>B</i> · <i>h</i>','3')}</b> (<i>B</i> = aire de la base, <i>h</i> = hauteur)</p><p>Pour un cône de rayon <i>r</i>, la base est un disque d’aire π<i>r</i>² : V = ${F('π<i>r</i>²<i>h</i>','3')}.</p></div>
<div class="why"><p>Un cube se découpe en <b>3 pyramides identiques</b> : elles ont toutes pour sommet le même coin du cube, et pour base une des 3 faces qui ne touchent pas ce coin. Chacune a la même base et la même hauteur que le cube et vaut un tiers du cube. Un cône ressemble à une pyramide dont la base aurait énormément de côtés : la même règle s’applique.</p></div>
<div class="ex"><p>Prisme de base 9 cm² et de hauteur 5 cm : V = 9 · 5 = 45 cm³. La pyramide de même base et de même hauteur : 45 : 3 = 15 cm³. Cône de rayon 3 cm et de hauteur 5 cm : V = π · 9 · 5 : 3 = 15π ≈ 47,12 cm³.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Il y a près de 4000 ans, des scribes égyptiens calculaient déjà le volume d’une pyramide coupée : le calcul figure sur un papyrus conservé aujourd’hui à Moscou. La preuve du « tiers » est venue plus tard, des Grecs Eudoxe puis Euclide.</p></div>`,
  params:[{id:'s',l:'Expérience (1 pyramide et prisme, 2 cône et cylindre)',min:1,max:2,v:1},{id:'k',l:'Verres versés',min:0,max:3,v:0}],
  draw:v=>fillFig(v.s,v.k),
  info:v=>{ const P=v.s===1, a=P?['pyramide','pyramides','prisme']:['cône','cônes','cylindre'];
    if(v.k===0) return P?'Le prisme est vide. Verse la pyramide pleine d’eau.':'Le cylindre est vide. Verse le cône plein d’eau.';
    const verse=v.k===1?(P?'1 pyramide versée':'1 cône versé'):(P?`${v.k} pyramides versées`:`${v.k} cônes versés`);
    return v.k<3?`${verse} : le ${a[2]} est rempli ${v.k===1?'au tiers':'aux deux tiers'}.`:`${verse} : le ${a[2]} est plein. V(${a[0]}) = V(${a[2]}) : 3.`; }},
 {kind:'Méthode', h:'Calculer le volume d’une pyramide ou d’un cône',
  p:`<p>Dès que le solide se termine en pointe (pyramide, cône), on utilise V = <i>B</i> · <i>h</i> : 3.</p>
<ol><li>Calcule l’aire <i>B</i> de la base (carré, rectangle, triangle, disque…).</li><li>Repère la <b>hauteur</b> <i>h</i> : la distance du sommet à la base, perpendiculaire à la base. Ce n’est ni l’apothème, ni une arête, ni la génératrice. Si elle n’est pas donnée, calcule-la avec Pythagore.</li><li>Multiplie, puis divise par 3. Le résultat est en unités de volume (cm³, m³).</li></ol>`,
  demo:{enonce:'a) Une pyramide a une base rectangulaire de 8 cm sur 6 cm et une hauteur de 10 cm. Quel est son volume ? b) Un cornet de glace conique a un rayon de 3 cm et une hauteur de 7 cm. Quel est son volume, arrondi au centième ?',
   etapes:[
    {f:'B = 8 · 6 = 48 cm²',w:'La base est un rectangle.'},
    {f:'V = 48 · 10 : 3 = 480 : 3 = 160 cm³',w:'C’est le tiers du pavé de 480 cm³ qui a la même base et la même hauteur.'},
    {f:'B = π · 3² = 9π cm²',w:'La base du cône est un disque de rayon 3 cm. On garde π jusqu’à la fin pour ne pas cumuler les arrondis.'},
    {f:'V = 9π · 7 : 3 = 21π ≈ 65,97 cm³',w:'On simplifie d’abord 9 : 3 = 3, puis 3 · 7 = 21. On arrondit seulement le résultat final.'}],
   conclusion:'La pyramide a un volume de 160 cm³, le cornet d’environ 65,97 cm³.'},
  note:'<b>Piège :</b> n’oublie pas le carré du rayon. π · 3² = 9π, pas 6π.'},
 {kind:'Défi', h:'Six pyramides dans un cube', p:'On relie le centre d’un cube de 6 cm d’arête à ses 8 sommets. Le cube est alors découpé en 6 pyramides identiques, une sur chaque face. Quel est le volume d’une de ces pyramides&nbsp;?',
  fig:cube6(), lab:'V =', unit:'cm³', ans:36,
  why:'Stratégie : calculer de deux façons pour vérifier. Par partage : 6³ = 216 cm³ et 216 : 6 = 36 cm³. Par la formule : la base est une face, 6 · 6 = 36 cm², et la hauteur est la distance du centre à la face, 3 cm. V = 36 · 3 : 3 = 36 cm³. Les deux calculs sont d’accord.'},
 {kind:'Méthode', h:'Calculer l’aire d’une pyramide',
  p:`<p>Pour savoir combien de carton ou de toile il faut, on calcule l’<b>aire</b> de la pyramide : c’est l’aire de son développement.</p>
<ul><li>L’<b>aire latérale</b> est la somme des aires des faces triangulaires. Chaque triangle a pour base un côté <i>a</i> et pour hauteur l’<b>apothème</b>. Pour une pyramide régulière, on peut tout regrouper : aire latérale = périmètre de la base × apothème : 2.</li><li>L’<b>aire totale</b> = aire latérale + aire de la base.</li></ul>
<p>Même idée pour un cône, avec son secteur : aire latérale π<i>rg</i>, aire totale π<i>rg</i> + π<i>r</i>².</p>`,
  fig:pyrNet(),
  demo:{enonce:'Une pyramide régulière à base carrée a 6 cm de côté et 4 cm de hauteur. Calcule son aire totale.',
   etapes:[
    {f:'Apothème : SM² = 4² + 3² = 25, donc SM = 5 cm',w:'L’aire d’un triangle demande sa hauteur, ici l’apothème. On l’obtient avec Pythagore dans SOM.'},
    {f:'Une face : 6 · 5 : 2 = 15 cm² ; les 4 faces : 4 · 15 = 60 cm²',w:'Aire d’un triangle = base × hauteur : 2. Contrôle : périmètre 24 cm, et 24 · 5 : 2 = 60 cm².'},
    {f:'Base : 6 · 6 = 36 cm² ; aire totale : 60 + 36 = 96 cm²',w:'On ajoute la base, car la pyramide est fermée.'}],
   conclusion:'L’aire totale vaut 96 cm². Pour un cône de rayon 3 cm et de génératrice 5 cm : π · 3 · 5 + π · 3² = 24π ≈ 75,40 cm².'},
  note:'<b>Piège :</b> la hauteur des faces est l’apothème (5 cm), pas la hauteur de la pyramide (4 cm).'},
 {h:'Le carton de la boîte-pyramide', p:'Une boîte cadeau est une pyramide régulière à base carrée de 16 cm de côté et de 6 cm de hauteur. Quelle aire de carton faut-il pour la fabriquer, base comprise&nbsp;?',
  unit:'cm²', ans:576,
  why:'Apothème : √(6² + 8²) = √100 = 10 cm. Aire latérale : 4 · 16 · 10 : 2 = 320 cm². Base : 16² = 256 cm². Aire totale : 320 + 256 = 576 cm².'},
 {kind:'Théorie', h:'La sphère d’Archimède',
  p:`<p>Combien d’air contient un ballon ? Combien de cuir faut-il pour le recouvrir ? Une boule n’a ni base ni hauteur : il faut de nouvelles formules.</p>
<div class="thm"><p>Pour une boule de rayon <i>r</i> :</p><p style="text-align:center">volume <b>V = ${F(4,3)} · π<i>r</i>³</b> &nbsp;&nbsp;&nbsp; aire de la sphère <b>A = 4π<i>r</i>²</b></p></div>
<div class="idea"><p>Archimède a placé la boule dans un cylindre qui la touche juste : même rayon <i>r</i>, hauteur 2<i>r</i>. Il a découvert que la boule remplit exactement les <b>${F(2,3)}</b> du cylindre, et que l’aire de la sphère est égale à l’aire latérale du cylindre : 2π<i>r</i> · 2<i>r</i> = 4π<i>r</i>². Le cône de même base et de même hauteur, la boule et le cylindre sont dans le rapport 1 : 2 : 3.</p></div>
<div class="why"><p>Volume du cylindre : π<i>r</i>² · 2<i>r</i> = 2π<i>r</i>³. Ses deux tiers : ${F(4,3)}π<i>r</i>³, la boule. Le cône vaut le tiers du cylindre : ${F(2,3)}π<i>r</i>³, la moitié de la boule.</p></div>
<div class="ex"><p>Boule de rayon 2 cm : V = ${F(4,3)} · π · 2³ = ${F('32π','3')} ≈ 33,51 cm³ et A = 4π · 2² = 16π ≈ 50,27 cm².</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Archimède, vers 250 av. J.-C., était si fier de cette découverte qu’il a demandé qu’on grave une sphère dans un cylindre sur sa tombe. Plus d’un siècle plus tard, l’orateur romain Cicéron a retrouvé la tombe grâce à ce dessin.</p></div>`,
  params:[{id:'r',l:'Rayon r',min:1,max:4,step:.5,v:2,u:' cm'}],
  draw:v=>archi(v.r),
  info:v=>{ const c=Math.PI*v.r**3; return `Cône : ${fmt(2/3*c)} cm³ ; boule : ${fmt(4/3*c)} cm³ ; cylindre : ${fmt(2*c)} cm³ (rapport 1 : 2 : 3). Aire de la sphère : 4π · ${fmt(v.r)}² ≈ ${fmt(4*Math.PI*v.r**2)} cm².`; }},
 {kind:'Méthode', h:'Calculer le volume et l’aire d’une sphère',
  p:`<p>Une seule donnée suffit : le <b>rayon</b>.</p>
<ol><li>Si on te donne le <b>diamètre</b>, divise-le d’abord par 2.</li><li>Volume : élève le rayon au <b>cube</b> (<i>r</i> · <i>r</i> · <i>r</i>), multiplie par π et par 4, puis divise par 3.</li><li>Aire : élève le rayon au <b>carré</b> et multiplie par 4π.</li><li>Garde π jusqu’au bout et arrondis seulement à la fin. Unités : cm³ pour un volume, cm² pour une aire.</li></ol>
<p>Pour une <b>demi-boule</b>, on prend la moitié du volume de la boule.</p>`,
  demo:{enonce:'Un globe terrestre de bureau a un diamètre de 12 cm. Calcule son volume et l’aire de sa surface, arrondis au centième.',
   etapes:[
    {f:'r = 12 : 2 = 6 cm',w:'Les formules utilisent le rayon, pas le diamètre.'},
    {f:'V = 4/3 · π · 6³ = 4/3 · π · 216 = 288π ≈ 904,78 cm³',w:'216 : 3 = 72, puis 72 · 4 = 288.'},
    {f:'A = 4 · π · 6² = 4 · π · 36 = 144π ≈ 452,39 cm²',w:'Au carré pour une aire, au cube pour un volume.'}],
   conclusion:'Le globe a un volume d’environ 904,78 cm³ et une surface d’environ 452,39 cm².'},
  note:'<b>Astuce :</b> si on double le rayon, l’aire est multipliée par 2² = 4 et le volume par 2³ = 8, car le rayon est au carré dans l’aire et au cube dans le volume. Un ballon deux fois plus large contient 8 fois plus d’air !'},
 {h:'Le ballon de basket', p:'Un ballon de basket a un diamètre d’environ 24 cm. Quel volume d’air contient-il&nbsp;? Arrondis au cm³.',
  unit:'cm³', ans:7238, tol:.6,
  why:'r = 24 : 2 = 12 cm. V = 4/3 · π · 12³ = 4/3 · π · 1728 = 2304π ≈ 7238 cm³.'},
 {kind:'Méthode', h:'Volume d’un solide composé',
  p:`<p>Un silo, une fusée, une glace, une maison et son toit : beaucoup d’objets sont faits de plusieurs solides simples assemblés.</p>
<ol><li><b>Découpe</b> le solide en solides connus : pavé, prisme, cylindre, pyramide, cône, boule, demi-boule. Fais un croquis et note les dimensions de chaque morceau.</li><li>Calcule le volume de chaque morceau.</li><li><b>Additionne</b> les morceaux assemblés, <b>soustrais</b> les morceaux creusés (un trou, une partie enlevée).</li></ol>
<p>Attention aux dimensions communes : un cône posé sur un cylindre a le même rayon que lui, mais sa propre hauteur.</p>`,
  fig:silo(),
  demo:{enonce:'Un silo à grains est un cylindre de rayon 2 m et de hauteur 6 m, surmonté d’un toit conique de même rayon et de 1,5 m de hauteur. Quel est son volume ?',
   etapes:[
    {f:'Cylindre : V₁ = π · 2² · 6 = 24π m³',w:'Volume du cylindre = aire de la base × hauteur.'},
    {f:'Cône : V₂ = π · 2² · 1,5 : 3 = 2π m³',w:'Même base, mais une hauteur de 1,5 m seulement, et on divise par 3.'},
    {f:'V = 24π + 2π = 26π ≈ 81,68 m³',w:'Les deux morceaux sont assemblés : on additionne. On regroupe les π avant d’arrondir.'}],
   conclusion:'Le silo a un volume d’environ 81,68 m³. Pour un cube de 10 cm creusé d’un trou conique de rayon 3 cm et de hauteur 10 cm, on soustrairait : 1000 − 30π ≈ 905,75 cm³.'}},
 {h:'Le cornet bien rempli', p:'Un cornet de glace est un cône de rayon 3 cm et de hauteur 10 cm, plein de glace, surmonté d’une demi-boule de glace de même rayon. Quel est le volume total de glace&nbsp;? Arrondis au dixième.',
  fig:glace(), unit:'cm³', ans:150.8, tol:.06,
  why:'Cône : π · 3² · 10 : 3 = 30π cm³. Demi-boule : la moitié de 4/3 · π · 3³ = 36π, soit 18π cm³. Total : 30π + 18π = 48π ≈ 150,8 cm³.'},
 {kind:'Méthode', h:'Trouver une grandeur manquante',
  p:`<p>Parfois on connaît le volume et on cherche une dimension : la hauteur d’un moule, le rayon d’une boule. On écrit la formule, on remplace ce qu’on connaît, puis on <b>isole</b> l’inconnue comme dans une équation, en faisant la même opération des deux côtés.</p>
<ul><li>Pyramide ou cône : V = <i>B</i> · <i>h</i> : 3 donne <i>h</i> = 3V : <i>B</i>.</li><li>Pyramide à base carrée : <i>a</i>² = 3V : <i>h</i>, puis <i>a</i> = √(<i>a</i>²).</li><li>Boule : V = ${F(4,3)}π<i>r</i>³ donne <i>r</i>³ = 3V : (4π), puis <i>r</i> = ∛(<i>r</i>³) avec la touche racine cubique de la calculatrice.</li></ul>
<p>Vérifie toujours en recalculant le volume avec la valeur trouvée.</p>`,
  demo:{enonce:'a) Un cône a un volume de 150 cm³ et un rayon de 5 cm. Quelle est sa hauteur ? b) Une boule a un volume de 500 cm³. Quel est son rayon ? Arrondis au centième.',
   etapes:[
    {f:'150 = π · 5² · h : 3, donc 450 = 25π · h',w:'On remplace V et r, puis on multiplie les deux membres par 3.'},
    {f:'h = 450 : (25π) ≈ 5,73 cm',w:'On divise les deux membres par 25π.'},
    {f:'500 = 4/3 · π · r³, donc r³ = 1500 : (4π) ≈ 119,37',w:'On multiplie les deux membres par 3, puis on les divise par 4π.'},
    {f:'r = ∛119,37 ≈ 4,92 cm',w:'C’est le nombre qui, élevé au cube, donne 119,37. Vérification : 4/3 · π · 4,92³ ≈ 499 cm³, presque 500.'}],
   conclusion:'a) La hauteur vaut environ 5,73 cm. b) Le rayon vaut environ 4,92 cm.'}},
 {kind:'Pratique', h:'Règle la hauteur du moule', p:'Un moule à bougie a la forme d’un cône de rayon 4 cm. Il doit contenir exactement 32π cm³ de cire (environ 100,5 cm³). Règle sa hauteur.',
  params:[{id:'h',l:'Hauteur h',min:1,max:12,step:.5,v:10,u:' cm'}],
  draw:v=>moule(v.h), info:v=>`r = 4 cm, h = ${fmt(v.h)} cm.`,
  ok:v=>v.h===6, why:'h = 3V : (πr²) = 3 · 32π : (16π) = 96 : 16 = 6 cm. Vérification : π · 16 · 6 : 3 = 32π cm³.'},
 {kind:'Théorie', h:'Volumes et capacités : convertir',
  p:`<p>Une bouteille indique 1,5 L, un aquarium 60 dm³, une cuillère de sirop 5 mL. Pour comparer, il faut passer d’une unité à l’autre.</p>
<div class="def"><p>Un cube de 1 dm d’arête (10 cm) contient 10 · 10 · 10 = 1000 petits cubes de 1 cm³. Donc <b>1 dm³ = 1000 cm³</b>, et de même <b>1 m³ = 1000 dm³</b>. Pour les capacités : <b>1 dm³ = 1 L</b>, <b>1 cm³ = 1 mL</b> et 1 m³ = 1000 L. Rappel : 1 L = 10 dL = 100 cL = 1000 mL.</p></div>
<div class="idea"><p>Pour les volumes, chaque unité vaut <b>1000 fois</b> la suivante, et pas 10 fois, car on multiplie trois longueurs. Fais grandir le cube et compte les petits cubes : à 10 cm d’arête, il y en a 1000.</p></div>
${tab([['m³','dm³ = L','cm³ = mL'],['1','1000','1 000 000'],['0,002','2','2000']])}
<div class="ex"><p>2,5 m³ = 2500 dm³ = 2500 L. 750 cm³ = 750 mL = 0,75 L. 45 cL = 0,45 L = 450 cm³.</p></div>
<div class="blk" data-t="Et les durées ?"><p>1 h = 60 min et 1 min = 60 s : ici on compte par 60. 2,25 h = 2 h + 0,25 · 60 min = 2 h 15 min. 150 min = 2 h 30 min = 2,5 h.</p></div>
<div class="warn"><p>1 m³ ne vaut pas 100 dm³, mais 1000 dm³. Et 1,5 h ne vaut pas 1 h 50 min, mais 1 h 30 min.</p></div>`,
  params:[{id:'c',l:'Arête du cube',min:1,max:10,v:4,u:' cm'}],
  draw:v=>cubeGrid(v.c),
  info:v=>`V = ${v.c} · ${v.c} · ${v.c} = ${v.c**3} cm³ = ${v.c**3} mL = ${fmt(v.c**3/1000,3)} L${v.c===10?' : exactement 1 dm³, c’est-à-dire 1 litre.':'.'}`},
 {kind:'Méthode', h:'Vitesse, débit et masse volumique',
  p:`<p>Trois grandeurs « composées » se calculent par une division, et leur unité le dit : km/h, L/min, g/cm³.</p>
<ul><li><b>Vitesse</b> : <i>v</i> = <i>d</i> : <i>t</i> (distance divisée par durée), donc <i>d</i> = <i>v</i> · <i>t</i> et <i>t</i> = <i>d</i> : <i>v</i>. À 90 km/h, on parcourt 45 km en 0,5 h.</li>
<li><b>Débit</b> : <i>Q</i> = V : <i>t</i> (volume écoulé par unité de temps), donc <i>t</i> = V : <i>Q</i>. Un robinet de 10 L/min remplit 50 L en 5 min.</li>
<li><b>Masse volumique</b> : ρ = <i>m</i> : V (la masse d’un cm³, d’un litre ou d’un m³), donc <i>m</i> = ρ · V. Eau : 1 g/cm³, soit 1 kg/L ou 1000 kg/m³. Fer : environ 7,9 g/cm³.</li></ul>
<p>Avant de calculer, mets les unités d’accord : des litres avec des L/min, des cm³ avec des g/cm³.</p>`,
  demo:{enonce:'Une piscine gonflable est un cylindre de rayon 1,5 m. On la remplit sur 0,6 m de hauteur avec un tuyau qui débite 20 L/min. Combien de temps faut-il ? Quelle est la masse de l’eau ?',
   etapes:[
    {f:'V = π · 1,5² · 0,6 = 1,35π ≈ 4,241 m³',w:'L’eau forme un cylindre de 0,6 m de hauteur.'},
    {f:'4,241 m³ = 4241 dm³ = 4241 L',w:'Le débit est en L/min : on convertit en litres (1 m³ = 1000 L).'},
    {f:'t = 4241 : 20 ≈ 212 min = 3 h 32 min',w:'t = V : Q. Puis 212 = 3 · 60 + 32.'},
    {f:'m = 1 kg/L · 4241 L = 4241 kg ≈ 4,2 t',w:'m = ρ · V avec la masse volumique de l’eau, 1 kg par litre.'}],
   conclusion:'Il faut environ 3 h 32 min, et la piscine contient plus de 4 tonnes d’eau.'}},
 {h:'Remplir le bassin', p:'Un bassin a la forme d’un pavé de 2 m sur 1,5 m, profond de 0,4 m. Une fontaine le remplit avec un débit de 12 L/min. Combien de minutes faut-il pour le remplir&nbsp;?',
  unit:'min', ans:100,
  why:'V = 2 · 1,5 · 0,4 = 1,2 m³ = 1200 L. t = V : Q = 1200 : 12 = 100 min, soit 1 h 40 min.'},
 {kind:'Récapitulatif', h:'Ce qu’il faut retenir',
  p:`<div class="keep"><ul>
<li><b>Pyramide et cône</b> : V = <i>B</i> · <i>h</i> : 3, le tiers du prisme ou du cylindre de même base et de même hauteur. Cône : V = π<i>r</i>²<i>h</i> : 3.</li>
<li><b>Aire d’une pyramide régulière</b> : aire latérale = périmètre de la base × apothème : 2 ; aire totale = latérale + base. Cône : π<i>rg</i> + π<i>r</i>².</li>
<li><b>Boule</b> : V = 4/3 · π<i>r</i>³ ; <b>sphère</b> : A = 4π<i>r</i>². Rayon = diamètre : 2. Boule dans son cylindre : 2/3 du volume (Archimède).</li>
<li><b>Solide composé</b> : découper en solides connus, additionner ce qui est assemblé, soustraire ce qui est creusé.</li>
<li><b>Grandeur manquante</b> : remplacer, puis isoler l’inconnue (<i>h</i> = 3V : <i>B</i>, <i>r</i> = ∛(3V : (4π))). Vérifier.</li>
<li><b>Unités</b> : 1 m³ = 1000 dm³, 1 dm³ = 1000 cm³, 1 dm³ = 1 L, 1 cm³ = 1 mL ; 1 h = 60 min = 3600 s.</li>
<li><b>Grandeurs composées</b> : <i>v</i> = <i>d</i> : <i>t</i>, <i>Q</i> = V : <i>t</i>, ρ = <i>m</i> : V. Unités d’accord avant de calculer.</li>
<li>Garder π jusqu’au bout ; rédiger phrase, calcul, réponse avec l’unité.</li></ul></div>`},
 {kind:'Problème', h:'La glace de la kermesse',
  p:'À la kermesse du quartier, Noé vend des glaces. Un bac de glace est un pavé de 30 cm sur 20 cm et de 12 cm de profondeur, rempli à ras bord. Sa cuillère forme des boules de 3 cm de rayon. Il vend la boule 2,50 CHF.',
  fig:bac(),
  parts:[
   {q:'a) Quelle est la capacité du bac, en litres ?', unit:'L', ans:7.2, tol:.001, hint:'Calcule le volume en cm³, puis souviens-toi que 1000 cm³ = 1 L.', why:'30 · 20 · 12 = 7200 cm³ = 7,2 dm³ = 7,2 L.'},
   {q:'b) Quel est le volume d’une boule, arrondi au dixième ?', unit:'cm³', ans:113.1, tol:.06, hint:'V = 4/3 · π · r³ avec r = 3 cm.', why:'4/3 · π · 3³ = 4/3 · π · 27 = 36π ≈ 113,1 cm³.'},
   {q:'c) Combien de boules entières peut-il servir avec un bac ?', ans:63, hint:'Divise le volume du bac par le volume d’une boule, puis garde la partie entière.', why:'7200 : 113,1 ≈ 63,7 : il peut servir 63 boules entières (la 64e serait incomplète).'},
   {q:'d) Combien rapporte la vente d’un bac ?', unit:'CHF', ans:157.5, tol:.001, hint:'Prix d’une boule × nombre de boules.', why:'63 · 2,50 = 157,50 CHF.'}],
  sol:'<p>Le bac contient 30 · 20 · 12 = 7200 cm³, soit 7,2 L.</p><p>Une boule a un volume de 4/3 · π · 3³ = 36π ≈ 113,1 cm³.</p><p>7200 : 113,1 ≈ 63,7 : on peut servir 63 boules entières.</p><p>La vente d’un bac rapporte 63 · 2,50 = 157,50 CHF.</p>'},
 {kind:'Problème', h:'Le château d’eau',
  p:'Le réservoir d’un château d’eau est formé d’un cylindre de 4 m de rayon et de 6 m de hauteur, posé sur un cône renversé, pointe en bas, de même rayon et de 3 m de hauteur. Le réservoir est vide. Une pompe le remplit par le bas avec un débit de 2000 L/min.',
  fig:chateau(),
  parts:[
   {q:'a) Quel est le volume du réservoir, en m³, arrondi au centième ?', unit:'m³', ans:351.86, tol:.006, hint:'Additionne le volume du cylindre et celui du cône. Garde π jusqu’au bout.', why:'Cylindre : π · 4² · 6 = 96π. Cône : π · 4² · 3 : 3 = 16π. Total : 112π ≈ 351,86 m³.'},
   {q:'b) Combien de minutes faut-il pour le remplir entièrement ? Arrondis à la minute.', unit:'min', ans:176, tol:.6, hint:'Convertis en litres (1 m³ = 1000 L), puis utilise t = V : Q.', why:'112π m³ ≈ 351 858 L. t = 351 858 : 2000 ≈ 175,9 min, soit environ 176 min.'},
   {q:'c) 176 minutes, c’est…', opts:['1 h 76 min','1,76 h','2 h 56 min','2 h 36 min'], ans:2, hint:'1 h = 60 min. Combien de fois 60 dans 176 ?', why:'176 = 2 · 60 + 56 : 2 h 56 min.'},
   {q:'d) Après 1 heure de pompage, l’eau a rempli le cône et monte dans le cylindre. À quelle hauteur au-dessus du bas du cylindre est-elle ? Arrondis au centième.', unit:'m', ans:1.39, tol:.006, hint:'En 60 min, la pompe envoie 120 000 L = 120 m³. Enlève le volume du cône, puis cherche h tel que π · 4² · h = le reste.', why:'Cône : 16π ≈ 50,27 m³. Reste : 120 − 50,27 ≈ 69,73 m³. h = 69,73 : (16π) ≈ 1,39 m.'}],
  sol:'<p>Volume : cylindre π · 4² · 6 = 96π, cône π · 4² · 3 : 3 = 16π ; total 112π ≈ 351,86 m³, soit environ 351 858 L.</p><p>Durée : t = V : Q = 351 858 : 2000 ≈ 176 min, c’est-à-dire 2 h 56 min.</p><p>En 1 h, la pompe envoie 60 · 2000 = 120 000 L = 120 m³. Le cône en prend 16π ≈ 50,27 m³, il reste environ 69,73 m³ dans le cylindre.</p><p>Hauteur d’eau dans le cylindre : h = 69,73 : (16π) ≈ 1,39 m.</p>'},
]},
);
})();
