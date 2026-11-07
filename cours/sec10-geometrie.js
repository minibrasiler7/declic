/* Déclic — Maths au secondaire, 10e année : figures planes, polygones réguliers, isométries */
(()=>{
/* ---------- outils géométriques (locaux) ---------- */
const D=(p,q)=>Math.hypot(q[0]-p[0],q[1]-p[1]);
const mid=(p,q)=>[(p[0]+q[0])/2,(p[1]+q[1])/2];
const add=(p,u,k=1)=>[p[0]+k*u[0],p[1]+k*u[1]];
const sub=(p,q)=>[p[0]-q[0],p[1]-q[1]];
const unit=u=>{ const L=Math.hypot(u[0],u[1])||1; return [u[0]/L,u[1]/L]; };
const nrm=u=>[-u[1],u[0]];
const circum=(A,B,C)=>{ const d=2*(A[0]*(B[1]-C[1])+B[0]*(C[1]-A[1])+C[0]*(A[1]-B[1])), a2=A[0]**2+A[1]**2, b2=B[0]**2+B[1]**2, c2=C[0]**2+C[1]**2;
  return [(a2*(B[1]-C[1])+b2*(C[1]-A[1])+c2*(A[1]-B[1]))/d,(a2*(C[0]-B[0])+b2*(A[0]-C[0])+c2*(B[0]-A[0]))/d]; };
const incen=(A,B,C)=>{ const a=D(B,C), b=D(A,C), c=D(A,B), s=a+b+c; return [(a*A[0]+b*B[0]+c*C[0])/s,(a*A[1]+b*B[1]+c*C[1])/s]; };
const foot=(M,A,B)=>{ const u=sub(B,A), t=((M[0]-A[0])*u[0]+(M[1]-A[1])*u[1])/(u[0]**2+u[1]**2); return add(A,u,t); };
const inter=(p1,p2,p3,p4)=>{ const d=(p1[0]-p2[0])*(p3[1]-p4[1])-(p1[1]-p2[1])*(p3[0]-p4[0]);
  const a=p1[0]*p2[1]-p1[1]*p2[0], b=p3[0]*p4[1]-p3[1]*p4[0];
  return [(a*(p3[0]-p4[0])-(p1[0]-p2[0])*b)/d,(a*(p3[1]-p4[1])-(p1[1]-p2[1])*b)/d]; };
const sg=(P,a,b,q={})=>P.seg(a[0],a[1],b[0],b[1],q);
const ln=(P,a,b,q={})=>{ const u=unit(sub(b,a)); return P.seg(a[0]-40*u[0],a[1]-40*u[1],a[0]+40*u[0],a[1]+40*u[1],q); };
const pt=(P,p,l,q={})=>P.dot(p[0],p[1],Object.assign({l,r:5},q));
const arc=(P,c,r,a0,a1,q={})=>P.curve(t=>c[0]+r*Math.cos(t),t=>c[1]+r*Math.sin(t),a0,a1,Object.assign({w:1.6,n:40},q));
const tri=(P,A,B,C,q={})=>P.poly([A,B,C],Object.assign({fill:'var(--accent)',fo:.1,c:'var(--accent)',w:2.5},q));
// arcs de compas qui construisent la médiatrice de [pq]
function compassArcs(P,p,q,col='var(--muted)'){
  const d=D(p,q), r=.7*d, h=Math.sqrt(r*r-d*d/4), M=mid(p,q), n=unit(nrm(sub(q,p)));
  [add(M,n,h),add(M,n,-h)].forEach(X=>[p,q].forEach(c=>{ const t=Math.atan2(X[1]-c[1],X[0]-c[0]); arc(P,c,r,t-.22,t+.22,{c:col}); }));
}
const mediatrice=(P,p,q,qq={})=>{ const M=mid(p,q); return ln(P,M,add(M,nrm(sub(q,p))),Object.assign({c:'var(--math)',w:2},qq)); };
// petit carré d'angle droit en F, entre les directions u et v
function rightMark(P,F,u,v,s=.32,c='var(--ink)'){ u=unit(u); v=unit(v); const a=add(F,u,s), b=add(add(F,u,s),v,s), e=add(F,v,s); P.poly([a,b,e],{open:true,c,w:1.3}); }
// arc d'angle au sommet S entre les points X et Y
function angMark(P,S,X,Y,r=.6,q={}){ let a=Math.atan2(X[1]-S[1],X[0]-S[0]), b=Math.atan2(Y[1]-S[1],Y[0]-S[0]); while(b<a) b+=2*Math.PI; if(b-a>Math.PI){ const t=a; a=b-2*Math.PI; b=t; } return arc(P,S,r,a,b,Object.assign({c:'var(--spark)',w:2},q)); }
// sommets d'un polygone régulier de centre c, rayon r, premier sommet à l'angle a0 (degrés)
const regPts=(c,r,n,a0=90)=>Array.from({length:n},(_,k)=>[c[0]+r*Math.cos(rad(a0+360*k/n)),c[1]+r*Math.sin(rad(a0+360*k/n))]);
// polygone régulier de côté s qui part du sommet S dans la direction th (degrés), en tournant à gauche
function regFrom(S,s,th,n){ const pts=[S]; let dir=th; for(let i=0;i<n-1;i++){ const L=pts[pts.length-1]; pts.push([L[0]+s*Math.cos(rad(dir)),L[1]+s*Math.sin(rad(dir))]); dir+=360/n; } return pts; }
const NOMS={3:'triangle équilatéral',4:'carré',5:'pentagone',6:'hexagone',7:'heptagone',8:'octogone',9:'ennéagone',10:'décagone',11:'hendécagone',12:'dodécagone'};

/* ---------- figures du chapitre « Figures planes » ---------- */
const T1=[[-3.6,-2],[3.6,-2],[0.8,3]];
function familles(f){
  const [A,B,C]=T1, P=plane({x:[-5,5],y:[-3.4,4.2],grid:false,axes:false});
  tri(P,A,B,C); const V=[A,B,C], N=['A','B','C'];
  const opp=k=>[V[(k+1)%3],V[(k+2)%3]];
  if(f===1){ V.forEach((S,k)=>{ const [X,Y]=opp(k), H=foot(S,X,Y); ln(P,X,Y,{c:'var(--line)',w:1}); sg(P,S,H,{c:'var(--math)',w:2.2}); rightMark(P,H,sub(S,H),sub(Y,X)); });
    const O=circum(A,B,C), H=[A[0]+B[0]+C[0]-2*O[0],A[1]+B[1]+C[1]-2*O[1]]; pt(P,H,'H',{c:'var(--math)'}); }
  if(f===2){ const O=circum(A,B,C); V.forEach((S,k)=>{ const [X,Y]=opp(k); mediatrice(P,X,Y); const M=mid(X,Y); rightMark(P,M,sub(Y,X),nrm(sub(Y,X)),.28); pt(P,M,'',{r:3.5,c:'var(--muted)'}); });
    P.circ(O[0],O[1],D(O,A),{c:'var(--math)',w:1.2,dash:true,op:.6}); pt(P,O,'O',{c:'var(--math)'}); }
  if(f===3){ const I=incen(A,B,C); V.forEach((S,k)=>{ const [X,Y]=opp(k), E=inter(S,I,X,Y); sg(P,S,E,{c:'var(--math)',w:2.2}); angMark(P,S,X,E,.7,{w:1.5}); angMark(P,S,E,Y,.8,{w:1.5,c:'var(--sci)'}); }); pt(P,I,'I',{c:'var(--math)'}); }
  if(f===4){ V.forEach((S,k)=>{ const [X,Y]=opp(k), M=mid(X,Y); sg(P,S,M,{c:'var(--math)',w:2.2}); pt(P,M,N[k]+'′',{r:3.5,c:'var(--muted)',dx:4,dy:k===2?16:-8}); });
    pt(P,[(A[0]+B[0]+C[0])/3,(A[1]+B[1]+C[1])/3],'G',{c:'var(--math)'}); }
  pt(P,A,'A',{dx:-16,dy:-6}); pt(P,B,'B',{dx:8,dy:-6}); pt(P,C,'C',{dx:6,dy:-8});
  return P.svg();
}
const T2=[[-3,-1.5],[3,-2],[1,2.5]];
function circStep(e){
  const [A,B,C]=T2, P=plane({x:[-5,5],y:[-4.6,4],grid:false,axes:false}), O=circum(A,B,C);
  tri(P,A,B,C);
  if(e===1) compassArcs(P,A,B);
  if(e>=2){ mediatrice(P,A,B); }
  if(e===2) compassArcs(P,B,C);
  if(e>=3) mediatrice(P,B,C,{c:'var(--sci)'});
  if(e>=4) pt(P,O,'O',{c:'var(--math)'});
  if(e>=5){ mediatrice(P,A,C,{c:'var(--muted)',dash:true,w:1.5}); P.circ(O[0],O[1],D(O,A),{c:'var(--spark)',w:2.5}); sg(P,O,A,{c:'var(--spark)',w:1.5,dash:true}); }
  pt(P,A,'A',{dx:-16,dy:-6}); pt(P,B,'B',{dx:8,dy:4}); pt(P,C,'C',{dx:6,dy:-8});
  return P.svg();
}
const circInfo=['Le triangle ABC. On cherche un point à la même distance de A, de B et de C.','Compas en A puis en B, même ouverture : les arcs se croisent deux fois, au-dessus et au-dessous de [AB].','La droite par les deux croisements est la médiatrice de [AB]. On recommence avec [BC].','Deuxième médiatrice, celle de [BC].','Les deux médiatrices se coupent en O : OA = OB = OC.','Le cercle de centre O et de rayon OA passe par les trois sommets. La médiatrice de [AC] (pointillés) passe aussi par O.'];
function inscStep(e){
  const [A,B,C]=T2, P=plane({x:[-4,4.5],y:[-2.8,3.2],grid:false,axes:false}), I=incen(A,B,C), H=foot(I,A,B);
  tri(P,A,B,C);
  const bis=(S,X,Y,col,show)=>{ const s=1.3, P1=add(S,unit(sub(X,S)),s), P2=add(S,unit(sub(Y,S)),s), Q=add(add(P1,P2),S,-1);
    if(show){ const a1=Math.atan2(P1[1]-S[1],P1[0]-S[0]), a2=Math.atan2(P2[1]-S[1],P2[0]-S[0]); let lo=Math.min(a1,a2), hi=Math.max(a1,a2); if(hi-lo>Math.PI){ const t=lo; lo=hi; hi=t+2*Math.PI; }
      arc(P,S,s,lo-.08,hi+.08,{c:'var(--muted)'}); [P1,P2].forEach(c=>{ const t=Math.atan2(Q[1]-c[1],Q[0]-c[0]); arc(P,c,s,t-.3,t+.3,{c:'var(--muted)'}); }); pt(P,Q,'',{r:3,c:'var(--muted)'}); }
    sg(P,S,add(S,unit(sub(I,S)),D(S,I)*1.6),{c:col,w:2}); };
  if(e===1) bis(A,B,C,'var(--math)',true);
  if(e>=2) bis(A,B,C,'var(--math)',false);
  if(e===2) bis(B,C,A,'var(--sci)',true);
  if(e>=3) bis(B,C,A,'var(--sci)',false);
  if(e>=3) pt(P,I,'I',{c:'var(--math)',dx:6,dy:-10});
  if(e>=4){ sg(P,I,H,{c:'var(--ink)',w:1.5,dash:true}); rightMark(P,H,sub(I,H),sub(B,A),.25); pt(P,H,'H',{r:4,c:'var(--muted)',dx:4,dy:16}); }
  if(e>=5){ P.circ(I[0],I[1],D(I,H),{c:'var(--spark)',w:2.5,fill:'var(--spark)',fo:.12}); sg(P,C,add(C,unit(sub(I,C)),D(C,I)*1.6),{c:'var(--muted)',dash:true,w:1.5}); }
  pt(P,A,'A',{dx:-16,dy:-6}); pt(P,B,'B',{dx:8,dy:4}); pt(P,C,'C',{dx:6,dy:-8});
  return P.svg();
}
const inscInfo=['Le triangle ABC. On cherche un point à la même distance des trois côtés.','Bissectrice de l’angle en A : un arc depuis A coupe les deux côtés, puis deux arcs de même ouverture se croisent sur la bissectrice.','Même construction pour l’angle en B.','Les deux bissectrices se coupent en I.','À l’équerre, la perpendiculaire de I sur [AB] : son pied H donne le rayon IH.','Le cercle de centre I et de rayon IH touche les trois côtés. La troisième bissectrice (pointillés) passe aussi par I.'];
function bothCircles(){
  const [A,B,C]=T2, P=plane({x:[-5,5],y:[-4.4,3.2],grid:false,axes:false}), O=circum(A,B,C), I=incen(A,B,C), H=foot(I,A,B);
  P.circ(O[0],O[1],D(O,A),{c:'var(--math)',w:2.2}); P.circ(I[0],I[1],D(I,H),{c:'var(--spark)',w:2.2,fill:'var(--spark)',fo:.12}); tri(P,A,B,C);
  pt(P,O,'O',{c:'var(--math)',dx:-16,dy:14}); pt(P,I,'I',{c:'var(--spark)'});
  P.text(-4.8,2.5,'circonscrit',{c:'var(--math)',s:12}).text(-.2,-.9,'inscrit',{c:'var(--spark)',s:12,a:'middle'});
  pt(P,A,'A',{dx:-16,dy:-6}); pt(P,B,'B',{dx:8,dy:4}); pt(P,C,'C',{dx:6,dy:-8});
  return P.svg();
}
const TA=[-3,3], TB=[4,4], TC=[5,-3];
function centreFig(x,y){
  const P=plane({x:[-6,7],y:[-6,6],lab:2}), O=[x,y];
  P.circ(x,y,D(O,TA),{c:'var(--spark)',w:2,dash:true});
  [TA,TB,TC].forEach(Q=>sg(P,O,Q,{c:'var(--muted)',w:1.3}));
  tri(P,TA,TB,TC,{fo:.06,w:1.5});
  pt(P,TA,'A',{c:'var(--ok)'}); pt(P,TB,'B',{c:'var(--ok)'}); pt(P,TC,'C',{c:'var(--ok)'}); pt(P,O,'O',{c:'var(--math)'});
  return P.svg();
}
const GA=[-4,-2.5], GB=[4,-2.5];
function gravFig(cx){
  const C=[cx,3.5], A=GA, B=GB, P=plane({x:[-5,5],y:[-3.4,4.4],grid:false,axes:false}), G=[(A[0]+B[0]+C[0])/3,(A[1]+B[1]+C[1])/3];
  tri(P,A,B,C);
  const Ap=mid(B,C), Bp=mid(A,C), Cp=mid(A,B);
  sg(P,A,G,{c:'var(--math)',w:3}); sg(P,G,Ap,{c:'var(--sci)',w:3});
  sg(P,B,Bp,{c:'var(--math)',w:1.6,op:.7}); sg(P,C,Cp,{c:'var(--math)',w:1.6,op:.7});
  sg(P,Ap,Bp,{c:'var(--muted)',w:1.3,dash:true});
  pt(P,Ap,'A′',{r:4,c:'var(--muted)',dx:6,dy:-6}); pt(P,Bp,'B′',{r:4,c:'var(--muted)',dx:-22,dy:-6}); pt(P,Cp,'C′',{r:4,c:'var(--muted)',dx:-6,dy:18});
  pt(P,G,'G',{c:'var(--spark)',dx:6,dy:16});
  pt(P,A,'A',{dx:-16,dy:-6}); pt(P,B,'B',{dx:8,dy:-6}); pt(P,C,'C',{dx:6,dy:-8});
  return P.svg();
}
function polyFig(n){
  const P=plane({x:[-4,4],y:[-3.7,3.7],grid:false,axes:false}), O=[0,0], V=regPts(O,3,n,90);
  P.circ(0,0,3,{c:'var(--line)',w:1.5});
  V.forEach(X=>sg(P,O,X,{c:'var(--muted)',w:1,op:.6}));
  P.poly([O,V[0],V[1]],{fill:'var(--sci)',fo:.25,c:null});
  P.poly(V,{fill:'var(--accent)',fo:.12,c:'var(--accent)',w:2.5});
  angMark(P,O,V[0],V[1],.7,{c:'var(--sci)',w:2.5});
  angMark(P,V[1],V[0],V[2],.55,{c:'var(--spark)',w:2.5});
  pt(P,O,'O',{r:4,c:'var(--ink)',dx:6,dy:16});
  return P.svg();
}
function hexStep(e){
  const P=plane({x:[-4,4],y:[-3.8,3.8],grid:false,axes:false}), O=[0,0], r=3, V=regPts(O,r,6,0), N=['A','B','C','D','E','F'];
  P.circ(0,0,r,{c:'var(--muted)',w:1.6}); pt(P,O,'O',{r:4,c:'var(--ink)',dx:6,dy:16});
  if(e>=1){ sg(P,O,V[0],{c:'var(--muted)',w:1.3,dash:true}); }
  const k=Math.min(e,6);
  for(let i=1;i<k;i++){ const c=V[i-1], t=Math.atan2(V[i][1]-c[1],V[i][0]-c[0]); arc(P,c,r,t-.25,t+.25,{c:'var(--sci)',w:2}); }
  if(e>=7){ P.poly(V,{fill:'var(--accent)',fo:.15,c:'var(--accent)',w:2.5}); P.poly([V[0],V[2],V[4]],{c:'var(--math)',w:1.4,dash:true}); }
  for(let i=0;i<k;i++) pt(P,V[i],N[i],{c:'var(--spark)',dx:V[i][0]<-.1?-18:8,dy:V[i][1]<-.1?16:-6});
  return P.svg();
}
const hexInfo=['Un cercle de centre O. Son rayon sera aussi le côté de l’hexagone.','Un premier sommet A, n’importe où sur le cercle.','Sans changer l’ouverture (le rayon), pointe en A : l’arc coupe le cercle en B.','Pointe en B, même ouverture : C.','Pointe en C : D, pile à l’opposé de A.','Pointe en D : E.','Pointe en E : F. Un dernier report retomberait exactement sur A.','On relie les six points : hexagone régulier. Un sommet sur deux donne un triangle équilatéral (pointillés).'];
function pentaFig(a){
  const P=plane({x:[-4,4],y:[-3.7,3.7],grid:false,axes:false}), O=[0,0], r=3;
  P.circ(0,0,r,{c:'var(--line)',w:1.5});
  const K=Math.floor(360/a+1e-9), pts=[];
  for(let k=0;k<=K;k++){ const X=[r*Math.cos(rad(90+k*a)),r*Math.sin(rad(90+k*a))]; pts.push(X); sg(P,O,X,{c:'var(--muted)',w:1,op:.7}); }
  const closes=Math.abs(K*a-360)<1e-9;
  P.poly(pts,{open:true,c:closes?'var(--ok)':'var(--accent)',w:2.5});
  if(!closes){ const A=pts[0], L=pts[pts.length-1]; sg(P,L,A,{c:'var(--bad)',w:2,dash:true}); }
  angMark(P,O,pts[0],pts[1],.7,{c:'var(--sci)',w:2.5});
  pt(P,pts[0],'A',{c:'var(--spark)',dx:8,dy:-6});
  return P.svg();
}
function gapFig(){
  const P=plane({x:[-3.2,3.2],y:[-3.2,3.2],w:280,grid:false,axes:false}), S=[0,0], cols=['var(--accent)','var(--sci)','var(--math)'];
  [0,108,216].forEach((th,k)=>P.poly(regFrom(S,1.9,th,5),{fill:cols[k],fo:.25,c:cols[k],w:2}));
  angMark(P,S,[Math.cos(rad(324)),Math.sin(rad(324))],[1,0],.9,{c:'var(--bad)',w:3});
  P.text(1.3,-.55,'trou de 36°',{c:'var(--bad)',s:12});
  pt(P,S,'',{r:4,c:'var(--ink)'});
  return P.svg();
}
const kiosque=(()=>{ const P=plane({x:[-5,5],y:[-4.6,4.6],grid:false,axes:false}), V=regPts([0,0],4,6,0);
  P.circ(0,0,4,{c:'var(--line)',w:1.5,dash:true});
  P.poly(V,{fill:'var(--accent)',fo:.12,c:null});
  for(let i=0;i<6;i++) if(i!==4) sg(P,V[i],V[(i+1)%6],{c:'var(--accent)',w:4});
  sg(P,[0,0],V[0],{c:'var(--muted)',w:1.5}); P.text(2,0,'4 m',{a:'middle',dy:-6,s:12,c:'var(--muted)'});
  P.text(0,-3.5,'entrée',{a:'middle',dy:20,s:12,c:'var(--spark)'});
  pt(P,[0,0],'O',{r:4,c:'var(--ink)',dx:-14,dy:16});
  return P.svg(); })();
const carton=(()=>{ const P=plane({x:[-1,13],y:[-1,10],w:300,lab:2}), A=[0,0], B=[12,0], C=[6,9];
  tri(P,A,B,C,{fo:.15});
  sg(P,C,[6,0],{c:'var(--math)',w:1.6,dash:true});
  pt(P,A,'A',{dx:-14,dy:-6}); pt(P,B,'B',{dx:6,dy:-6}); pt(P,C,'C',{dx:8,dy:4}); pt(P,[6,0],'C′',{r:4,c:'var(--muted)',dx:6,dy:16});
  return P.svg(); })();

/* ---------- outils pour les isométries ---------- */
const GAM=[[0,0],[1,0],[1,2],[2,2],[2,3],[0,3]]; // le « drapeau » : une figure sans symétrie
const mv=(S,f)=>S.map(p=>f(p[0],p[1]));
const tr=(a,b)=>(x,y)=>[x+a,y+b];
const symV=a=>(x,y)=>[2*a-x,y];
const symH=b=>(x,y)=>[x,2*b-y];
const symC=(c,d)=>(x,y)=>[2*c-x,2*d-y];
const rot=(c,d,deg)=>(x,y)=>{ const t=rad(deg), u=x-c, w=y-d; return [c+u*Math.cos(t)-w*Math.sin(t),d+u*Math.sin(t)+w*Math.cos(t)]; };
const symL=(c,deg)=>(x,y)=>{ const t=rad(2*deg), u=x-c[0], w=y-c[1]; return [c[0]+u*Math.cos(t)+w*Math.sin(t),c[1]+u*Math.sin(t)-w*Math.cos(t)]; }; // axe passant par c, d'angle deg
const shape=(P,S,col,q={})=>P.poly(S,Object.assign({fill:col,fo:.35,c:col,w:2},q));
const tag=(P,p,s,col,q={})=>P.text(p[0],p[1],s,Object.assign({c:col,s:12,dx:5,dy:-5},q));
function isoFig(t){
  const P=plane({x:[-6,6],y:[-5,5]});
  if(t===1){ const S=mv(GAM,tr(-5,-3)), f=tr(6,2); shape(P,S,'var(--accent)'); shape(P,mv(S,f),'var(--spark)');
    P.arrow(-5,0,1,2,{c:'var(--ink)',w:2.5}); tag(P,[-2,1],'flèche (6 ; 2)','var(--ink)',{dy:-10}); }
  if(t===2){ const S=mv(GAM,tr(-4,-1)), f=symV(0); shape(P,S,'var(--accent)'); shape(P,mv(S,f),'var(--spark)');
    P.seg(0,-5,0,5,{c:'var(--math)',w:2.5}); tag(P,[0,4],'axe','var(--math)'); }
  if(t===3){ const S=mv(GAM,tr(-4,-4)), f=symC(0,0); shape(P,S,'var(--accent)'); shape(P,mv(S,f),'var(--spark)');
    sg(P,S[4],f(...S[4]),{c:'var(--muted)',w:1.3,dash:true}); pt(P,[0,0],'O',{c:'var(--math)'}); }
  if(t===4){ const S=mv(GAM,tr(1,-4)), f=rot(0,0,90); shape(P,S,'var(--accent)'); shape(P,mv(S,f),'var(--spark)');
    const A=S[2], Ap=f(...A); sg(P,[0,0],A,{c:'var(--muted)',w:1.3,dash:true}); sg(P,[0,0],Ap,{c:'var(--muted)',w:1.3,dash:true});
    angMark(P,[0,0],A,Ap,1,{c:'var(--math)'}); pt(P,[0,0],'O',{c:'var(--math)',dx:-16,dy:-8}); tag(P,[.6,.7],'90°','var(--math)'); }
  return P.svg();
}
const isoInfo=['<b>Translation</b> : chaque point glisse selon la même flèche, ici 6 carreaux à droite et 2 vers le haut. La figure garde son orientation.','<b>Symétrie axiale</b> : la figure se reflète dans l’axe comme dans un miroir. Elle est <b>retournée</b>.','<b>Symétrie centrale</b> : demi-tour autour du centre O. Chaque point et son image sont alignés avec O, à la même distance.','<b>Rotation</b> de centre O, d’angle 90°, dans le sens inverse des aiguilles d’une montre. La figure tourne sans se retourner.'];
function retrouverFig(c){
  const P=plane({x:[-6,6],y:[-5,5]});
  if(c===1){ const S=mv(GAM,tr(-4,-2)), f=symV(-.5), I=mv(S,f); shape(P,S,'var(--accent)'); shape(P,I,'var(--spark)');
    [[5,'A'],[3,'B']].forEach(([k,l])=>{ sg(P,S[k],I[k],{c:'var(--muted)',w:1.3,dash:true}); pt(P,S[k],l,{r:4,c:'var(--accent)',dx:-14}); pt(P,I[k],l+'′',{r:4,c:'var(--spark)'}); });
    P.seg(-.5,-5,-.5,5,{c:'var(--math)',w:2.5}); tag(P,[-.5,-4.6],'axe = médiatrice de [AA′]','var(--math)',{dy:0,dx:0,a:'middle'}); }
  if(c===2){ const S=mv(GAM,tr(-5,-4)), f=symC(-.5,0), I=mv(S,f); shape(P,S,'var(--accent)'); shape(P,I,'var(--spark)');
    [[5,'A'],[1,'B']].forEach(([k,l])=>{ sg(P,S[k],I[k],{c:'var(--muted)',w:1.5,dash:true}); pt(P,S[k],l,{r:4,c:'var(--accent)',dx:-14}); pt(P,I[k],l+'′',{r:4,c:'var(--spark)'}); });
    pt(P,[-.5,0],'centre',{c:'var(--math)'}); }
  if(c===3){ const S=mv(GAM,tr(-5,-4)), f=tr(6,3), I=mv(S,f); shape(P,S,'var(--accent)'); shape(P,I,'var(--spark)');
    [[5,'A'],[1,'B']].forEach(([k,l])=>{ P.arrow(S[k][0],S[k][1],I[k][0],I[k][1],{c:'var(--math)',w:2}); pt(P,S[k],l,{r:4,c:'var(--accent)',dx:-14}); pt(P,I[k],l+'′',{r:4,c:'var(--spark)'}); });
    tag(P,[-2,0],'flèche (6 ; 3)','var(--math)'); }
  return P.svg();
}
const AX_S=mv(GAM,tr(1,-3)), AX_I=mv(AX_S,(x,y)=>[y-1,x+1]);
function axeFig(o,k){
  const P=plane({x:[-6,6],y:[-5,5],lab:2}); shape(P,AX_S,'var(--accent)'); shape(P,AX_I,'var(--spark)');
  const f=o===1?symV(k):o===2?symH(k):symL([0,k],45);
  shape(P,mv(AX_S,f),'var(--ink)',{fill:'none',dash:true,w:1.6});
  if(o===1) P.seg(k,-5,k,5,{c:'var(--math)',w:2.5}); else if(o===2) P.seg(-6,k,6,k,{c:'var(--math)',w:2.5}); else P.seg(-6,k-6,6,k+6,{c:'var(--math)',w:2.5});
  return P.svg();
}
const RC=[-2,1], RS=[[1,3],[3,3],[1,4]], RI=mv(RS,rot(...RC,-90));
function rotStep(e){
  const P=plane({x:[-6,5],y:[-5,5],lab:2}), N=['A','B','C'];
  P.poly(RS,{fill:'var(--accent)',fo:.35,c:'var(--accent)',w:2}); P.poly(RI,{fill:'var(--spark)',fo:.35,c:'var(--spark)',w:2});
  if(e>=1){ sg(P,RS[0],RI[0],{c:'var(--muted)',w:1.3,dash:true}); mediatrice(P,RS[0],RI[0]); }
  if(e>=2){ sg(P,RS[1],RI[1],{c:'var(--muted)',w:1.3,dash:true}); mediatrice(P,RS[1],RI[1],{c:'var(--sci)'}); }
  if(e>=3) pt(P,RC,'Ω',{c:'var(--math)',dx:-18,dy:-8});
  if(e>=4){ sg(P,RC,RS[0],{c:'var(--ink)',w:1.5}); sg(P,RC,RI[0],{c:'var(--ink)',w:1.5}); angMark(P,RC,RI[0],RS[0],.9,{c:'var(--spark)',w:2.5}); rightMark(P,RC,sub(RS[0],RC),sub(RI[0],RC),.4); }
  if(e>=5){ P.circ(RC[0],RC[1],D(RC,RS[2]),{c:'var(--muted)',w:1.2,dash:true}); }
  RS.forEach((p,i)=>pt(P,p,N[i],{r:4,c:'var(--accent)',dx:i===1?6:-14,dy:i===2?-6:14}));
  RI.forEach((p,i)=>pt(P,p,N[i]+'′',{r:4,c:'var(--spark)',dx:6,dy:i===0?-6:14}));
  return P.svg();
}
const rotInfo=['La figure ABC et son image A′B′C′ : même orientation, mais tournée. C’est une rotation : où est son centre ?','Le centre est à la même distance de A et de A′ : il est sur la médiatrice de [AA′].','Il est aussi sur la médiatrice de [BB′].','Les deux médiatrices se coupent en Ω(−2 ; 1) : c’est le centre.','L’angle AΩA′ mesure 90°, parcouru dans le sens des aiguilles d’une montre.','Contrôle avec C : le cercle de centre Ω qui passe par C passe aussi par C′.'];
const PR_C=[-1,1], PR_S=mv(GAM,tr(1,1)), PR_I=mv(PR_S,rot(...PR_C,90));
function placeRot(x,y){
  const P=plane({x:[-6,6],y:[-4,6],lab:2}); shape(P,PR_S,'var(--accent)'); shape(P,PR_I,'var(--spark)');
  const W=[x,y], A=PR_S[5], Ap=PR_I[5];
  sg(P,W,A,{c:'var(--accent)',w:1.5,dash:true}); sg(P,W,Ap,{c:'var(--spark)',w:1.5,dash:true});
  pt(P,A,'A',{r:4,c:'var(--accent)'}); pt(P,Ap,'A′',{r:4,c:'var(--spark)',dx:-20});
  pt(P,PR_S[1],'B',{r:4,c:'var(--accent)',dy:14}); pt(P,PR_I[1],'B′',{r:4,c:'var(--spark)',dx:-20,dy:14});
  pt(P,W,'Ω',{c:'var(--math)'});
  return P.svg();
}
function deuxSym(m,t){
  const P=plane({x:[-6,6],y:[-5,5]});
  if(m===1){ const d=t*.5, S=mv(GAM,tr(-4.5,-1.5)), f1=symV(-1), f2=symV(-1+d), S1=mv(S,f1), S2=mv(S1,f2);
    P.seg(-1,-5,-1,5,{c:'var(--math)',w:2.5}); P.seg(-1+d,-5,-1+d,5,{c:'var(--sci)',w:2.5});
    shape(P,S,'var(--accent)'); shape(P,S1,'var(--muted)',{fo:.15,dash:true,w:1.5}); shape(P,S2,'var(--spark)');
    P.arrow(S[5][0],3.9,S2[5][0],3.9,{c:'var(--ink)',w:2}); tag(P,[-1,-4.6],'d₁','var(--math)'); tag(P,[-1+d,-4.6],'d₂','var(--sci)'); }
  else { const a=15*t, S=mv(GAM,tr(1.5,-4)), c=[0,0], f1=symL(c,0), f2=symL(c,a), S1=mv(S,f1), S2=mv(S1,f2);
    P.seg(-6,0,6,0,{c:'var(--math)',w:2.5}); P.seg(-6*Math.cos(rad(a))*2,-6*Math.sin(rad(a))*2,6*Math.cos(rad(a))*2,6*Math.sin(rad(a))*2,{c:'var(--sci)',w:2.5});
    shape(P,S,'var(--accent)'); shape(P,S1,'var(--muted)',{fo:.15,dash:true,w:1.5}); shape(P,S2,'var(--spark)');
    angMark(P,c,[1,0],[Math.cos(rad(a)),Math.sin(rad(a))],1,{c:'var(--sci)',w:2.5}); pt(P,c,'S',{r:4,c:'var(--ink)',dx:-14,dy:16});
    tag(P,[5.2,0],'d₁','var(--math)'); tag(P,[3.6*Math.cos(rad(a)),3.6*Math.sin(rad(a))],'d₂','var(--sci)'); }
  return P.svg();
}
function friseFig(m){
  const P=plane({x:[0,12],y:[-1,5.5],grid:false,axes:false}), col=['var(--accent)','var(--spark)'];
  if(m<=3){ P.seg(0,0,12,0,{c:'var(--line)',w:1}).seg(0,4.5,12,4.5,{c:'var(--line)',w:1});
    for(let k=0;k<4;k++){ const S=mv(GAM,tr(.4+3*k,.6));
      let img=S; if(m===2&&k%2) img=mv(S,symV(.4+3*k+1)); if(m===3&&k%2) img=mv(S,symC(.4+3*k+1,2.1));
      shape(P,img,col[k%2]); }
    if(m===2) for(let k=1;k<4;k++) P.seg(3*k-.1,0,3*k-.1,4.5,{c:'var(--math)',w:1.2,dash:true});
    const ps=m===1?3:6; P.arrow(.4,-.5,.4+ps,-.5,{c:'var(--ink)',w:2,hs:9}); P.text(.4+ps/2,-.5,'pas',{a:'middle',dy:15,s:11,c:'var(--muted)'}); }
  else { const r=.85, h=r*Math.sqrt(3);
    for(let i=0;i<9;i++) for(let j=0;j<4;j++){ const cx=.3+i*1.5*r, cy=j*h+(i%2?h/2:0)-.2; if(cy>5.2) continue; P.poly(regPts([cx,cy],r,6,0),{fill:col[(i+j)%2],fo:.3,c:'var(--accent)',w:1.5}); } }
  return P.svg();
}
const friseInfo=['Frise par <b>translation</b> seule : le motif glisse d’un pas, encore et encore.','Frise avec <b>symétries axiales</b> : le motif alterne avec son reflet (axes en pointillés). Deux reflets de suite donnent une translation.','Frise avec <b>symétries centrales</b> : un motif sur deux a fait un demi-tour.','<b>Pavage</b> par des hexagones réguliers : des translations dans deux directions couvrent tout le plan, sans trou ni chevauchement.'];
function agrFig(k){
  const P=plane({x:[-.5,11],y:[-.5,6.5],lab:2}), S=[[0,0],[2,0],[2,1],[1,2],[0,2]], I=S.map(p=>[5+p[0]*k,p[1]*k]);
  shape(P,S,'var(--accent)'); shape(P,I,'var(--spark)');
  P.text(1,0,'2',{a:'middle',dy:15,s:11,c:'var(--accent)'}); P.text(5+k,0,fmt(2*k),{a:'middle',dy:15,s:11,c:'var(--spark)'});
  angMark(P,[1,2],[0,2],[2,1],.4,{c:'var(--ink)',w:1.5}); angMark(P,[5+k,2*k],[5,2*k],[5+2*k,k],.4,{c:'var(--ink)',w:1.5});
  return P.svg();
}

COURS.push(
/* ===================== FIGURES PLANES ET POLYGONES RÉGULIERS ===================== */
{subj:'sec', sem:'a10', o:12, id:'sec10-figures', h:'Figures planes et polygones réguliers', p:'Cercles circonscrit et inscrit, centre de gravité, polygones réguliers et leurs constructions, dessin à l’échelle.', steps:[
 {kind:'Théorie',h:'Les droites remarquables d’un triangle',p:`<p>Un triangle en carton, une table à trois pieds, trois poteaux de slalom… Dans chaque triangle se cachent quatre familles de droites. Tu les as rencontrées l’an dernier. Voici un rappel, car tout le chapitre s’appuie dessus.</p>
<div class="def"><p>Dans un triangle ABC :</p><ul><li>une <b>hauteur</b> part d’un sommet et tombe <b>perpendiculairement</b> (à angle droit) sur le côté opposé ;</li><li>une <b>médiatrice</b> coupe un côté en son <b>milieu</b>, à angle droit ;</li><li>une <b>bissectrice</b> part d’un sommet et coupe l’angle en <b>deux angles égaux</b> ;</li><li>une <b>médiane</b> relie un sommet au <b>milieu</b> du côté opposé.</li></ul></div>
<div class="idea"><p>Chaque famille compte trois droites. Et surprise : les trois droites d’une même famille se coupent toujours en <b>un seul point</b>. On dit qu’elles sont <b>concourantes</b>. Bouge le curseur pour passer d’une famille à l’autre.</p></div>
<div class="ex"><p>La médiane issue de C passe par C et par le milieu C′ de [AB]. La médiatrice de [AB] passe aussi par C′, mais elle est perpendiculaire à [AB] et ne passe en général pas par C.</p></div>
<div class="warn"><p>Ne confonds pas <b>médiane</b> et <b>médiatrice</b>. Les deux passent par le milieu d’un côté, mais seule la médiane passe par un sommet, et seule la médiatrice fait un angle droit avec le côté.</p></div>`,
  params:[{id:'f',l:'Famille (1 hauteurs, 2 médiatrices, 3 bissectrices, 4 médianes)',min:1,max:4,v:1}],
  draw:v=>familles(v.f),
  info:v=>['','Les trois <b>hauteurs</b> se coupent en H, l’orthocentre.','Les trois <b>médiatrices</b> se coupent en O, centre du cercle circonscrit.','Les trois <b>bissectrices</b> se coupent en I, centre du cercle inscrit.','Les trois <b>médianes</b> se coupent en G, le centre de gravité.'][v.f],
  note:'Une droite remarquable se nomme d’après un côté (la médiatrice de [AB]) ou d’après un sommet (la hauteur issue de C).'},
 {kind:'Théorie',h:'Les médiatrices et le cercle circonscrit',p:`<p>Trois copains habitent aux points A, B et C. Où installer la table de ping-pong pour que chacun ait exactement la même distance à parcourir ? Il faut un point à la même distance des trois maisons.</p>
<div class="prop"><p>Les trois médiatrices d’un triangle se coupent en un point O. Ce point est à la même distance des trois sommets : <b>OA = OB = OC</b>. Le cercle de centre O qui passe par A passe donc aussi par B et C. C’est le <b>cercle circonscrit</b> au triangle (« circonscrit » veut dire « écrit autour »).</p></div>
<div class="why"><p>Tous les points de la médiatrice de [AB] sont à la même distance de A et de B. O est sur la médiatrice de [AB], donc OA = OB. Il est aussi sur celle de [BC], donc OB = OC. Alors OA = OC : O est forcément sur la troisième médiatrice. Voilà pourquoi il suffit d’en tracer <b>deux</b>.</p></div>
<div class="ex"><p>Fais avancer le curseur : arcs de compas, première médiatrice, deuxième médiatrice, centre O, puis le cercle. La troisième médiatrice, en pointillés, passe bien par O.</p></div>
<div class="warn"><p>O n’est pas toujours à l’intérieur du triangle. Si un angle est obtus, O est dehors. Si le triangle est rectangle, O est pile au milieu de l’hypoténuse.</p></div>`,
  params:[{id:'e',l:'Étape de la construction',min:0,max:5,v:0}],
  draw:v=>circStep(v.e), info:v=>circInfo[v.e]},
 {kind:'Théorie',h:'Les bissectrices et le cercle inscrit',p:`<p>Ton jardin a la forme d’un triangle. Tu veux y installer le plus grand trampoline rond possible : il doit toucher les trois bords sans dépasser. Où mettre son centre ?</p>
<div class="prop"><p>Les trois bissectrices d’un triangle se coupent en un point I, à la même distance des trois côtés. Le cercle de centre I qui touche les trois côtés est le <b>cercle inscrit</b> (« écrit dedans »). Son rayon est la distance de I à un côté, mesurée <b>perpendiculairement</b> à ce côté.</p></div>
<div class="why"><p>Chaque point de la bissectrice de l’angle en A est à la même distance des deux côtés de cet angle. I est sur deux bissectrices, il est donc à la même distance des trois côtés. Le cercle inscrit est toujours à l’intérieur du triangle.</p></div>
<div class="ex"><p>Avance le curseur : arc de compas depuis A, deux petits arcs, la bissectrice de l’angle en A, puis celle de l’angle en B, le point I, la perpendiculaire de I sur [AB] avec son pied H, et enfin le cercle de rayon IH.</p></div>
<div class="warn"><p>Le rayon n’est pas la distance de I à un sommet ! Le cercle inscrit touche les côtés, pas les sommets.</p></div>`,
  params:[{id:'e',l:'Étape de la construction',min:0,max:5,v:0}],
  draw:v=>inscStep(v.e), info:v=>inscInfo[v.e]},
 {kind:'Méthode',h:'Construire le cercle circonscrit ou le cercle inscrit',p:'<b>Quand :</b> on cherche le cercle qui passe par trois points (circonscrit), ou le plus grand cercle qui tient dans un triangle (inscrit). <b>Pourquoi ça marche :</b> la médiatrice rassemble les points à égale distance de deux sommets, la bissectrice ceux à égale distance de deux côtés. <b>Comment :</b> deux droites suffisent, la troisième sert de contrôle. Outils : règle, compas, équerre. Le cercle qui <b>passe par les sommets</b> vient des médiatrices ; celui qui <b>touche les côtés</b> vient des bissectrices.',
  fig:bothCircles(),
  demo:{enonce:'Dans le triangle ABC, construire le cercle circonscrit, puis le cercle inscrit.',
   etapes:[
    {f:'Pointe du compas en A, ouverture plus grande que la moitié de [AB] : un arc au-dessus et un arc au-dessous de [AB]. Même ouverture depuis B.',w:'Les deux croisements des arcs sont à la même distance de A et de B : ils sont sur la médiatrice.'},
    {f:'Trace la droite qui passe par ces deux croisements : c’est la médiatrice de [AB]. Recommence avec [BC].',w:'Deux médiatrices suffisent pour trouver le centre.'},
    {f:'Leur point d’intersection est O. Pointe du compas en O, ouverture OA : trace le cercle.',w:'OA = OB = OC, donc le cercle passe par les trois sommets. S’il rate un sommet, la construction est imprécise.'},
    {f:'Cercle inscrit : un arc depuis A coupe les deux côtés de l’angle ; depuis ces deux points, deux arcs de même ouverture se croisent. La droite de A à ce croisement est la bissectrice de l’angle en A. Même chose en B.',w:'Les arcs dessinent un losange dont la diagonale partage l’angle en deux angles égaux.'},
    {f:'Les bissectrices se coupent en I. À l’équerre, trace la perpendiculaire de I à [AB] : son pied est H. Trace le cercle de centre I et de rayon IH.',w:'Le rayon se mesure à angle droit ; sinon le cercle dépasserait d’un côté.'}],
   conclusion:'Le cercle circonscrit passe par A, B et C ; le cercle inscrit touche [AB], [BC] et [CA]. Contrôle chaque fois avec la troisième droite.'}},
 {kind:'Pratique',h:'Trouve le centre du cercle circonscrit',p:'Les points A(−3 ; 3), B(4 ; 4) et C(5 ; −3) sont trois arbres. On veut un arrosoir tournant placé en O dont le jet atteint exactement les trois arbres. Déplace O jusqu’à ce que le cercle de centre O passant par A passe aussi par B et par C.',
  params:[{id:'x',l:'Abscisse de O',min:-5,max:5,v:-2},{id:'y',l:'Ordonnée de O',min:-5,max:5,v:2}],
  draw:v=>centreFig(v.x,v.y),
  info:v=>{ const O=[v.x,v.y]; return `OA = ${fmt(D(O,TA))} ; OB = ${fmt(D(O,TB))} ; OC = ${fmt(D(O,TC))}`; },
  ok:v=>v.x===1&&v.y===0,
  why:'O(1 ; 0) : OA, OB et OC valent toutes 5. Par exemple OA² = 4² + 3² = 25 (Pythagore). O est le point d’intersection des médiatrices de [AB] et de [BC].'},
 {kind:'Théorie',h:'Les médianes et le centre de gravité',p:`<p>Découpe un triangle dans du carton et essaie de le faire tenir en équilibre sur la pointe d’un crayon. Un seul point marche : le <b>centre de gravité</b>.</p>
<div class="def"><p>Les trois médianes d’un triangle se coupent en un point G, le <b>centre de gravité</b>. Sur chaque médiane, G est situé aux <b>deux tiers</b> en partant du sommet : AG = ${F(2,3)} · AA′ et GA′ = ${F(1,3)} · AA′, où A′ est le milieu de [BC].</p></div>
<div class="idea"><p>Une médiane coupe le triangle en deux triangles de même aire : leurs bases sont les deux moitiés du côté et ils ont la même hauteur. Le carton pèse donc autant de chaque côté de la médiane. Le point d’équilibre est sur chaque médiane, donc à leur intersection.</p></div>
<div class="why"><p>Pourquoi 2/3 ? Le segment moyen [A′B′], qui relie les milieux de deux côtés, est parallèle à [AB] et deux fois plus court. Le petit triangle GA′B′ est une réduction de moitié du triangle GAB : GA′ est la moitié de GA. Sur la médiane, GA compte 2 parts et GA′ 1 part.</p></div>
<div class="ex"><p>Médiane [AA′] de 9 cm : AG = ${F(2,3)} · 9 = 6 cm et GA′ = 3 cm. Contrôle : 6 + 3 = 9 et 6 = 2 · 3. Déplace C : la règle reste vraie.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Archimède, savant grec d’il y a plus de 2200 ans, a été l’un des premiers à calculer le centre de gravité de figures. Il a aussi expliqué le levier : avec un appui bien placé, un enfant peut soulever un adulte.</p></div>`,
  params:[{id:'c',l:'Position du sommet C',min:-4,max:4,step:.5,v:1}],
  draw:v=>gravFig(v.c),
  info:v=>{ const C=[v.c,3.5], G=[(GA[0]+GB[0]+C[0])/3,(GA[1]+GB[1]+C[1])/3], Ap=mid(GB,C); return `AG = ${fmt(D(GA,G))} ; GA′ = ${fmt(D(G,Ap))} ; AG : GA′ = ${fmt(D(GA,G)/D(G,Ap))}`; }},
 {kind:'Méthode',h:'Calculer avec la règle des 2/3',p:'<b>Quand :</b> on connaît la longueur d’une médiane, ou l’un des deux morceaux coupés par G, et on cherche un autre morceau. <b>Pourquoi ça marche :</b> G partage chaque médiane en 3 parts égales : 2 parts du côté du sommet, 1 part du côté du milieu. <b>Comment :</b> trouve la longueur d’<b>une part</b>, puis multiplie. Rédige : une phrase, le calcul, la réponse avec l’unité.',
  demo:{enonce:'a) Dans le triangle ABC, la médiane [AA′] mesure 12 cm. Calculer AG et GA′. b) Dans un autre triangle, GB′ = 2,5 cm. Calculer BG et la médiane [BB′].',
   etapes:[
    {f:'a) Une part : 12 : 3 = 4 cm',w:'La médiane est faite de 3 parts égales.'},
    {f:'AG = 2 · 4 = 8 cm et GA′ = 4 cm',w:'2 parts du côté du sommet, 1 part du côté du milieu. Contrôle : 8 + 4 = 12.'},
    {f:'b) GB′ est le petit morceau, donc 1 part = 2,5 cm. BG = 2 · 2,5 = 5 cm',w:'Le morceau du côté du milieu vaut toujours une seule part.'},
    {f:'BB′ = 3 · 2,5 = 7,5 cm',w:'La médiane entière compte 3 parts.'}],
   conclusion:'AG = 8 cm et GA′ = 4 cm ; BG = 5 cm et BB′ = 7,5 cm.'},
  note:'<b>Piège :</b> le grand morceau (2 parts) est toujours du côté du <b>sommet</b>, jamais du côté du milieu.'},
 {h:'Le trou dans le carton',p:'Dans un triangle en carton, le centre de gravité G est à 4,2 cm du sommet A. Combien mesure la médiane [AA′] ?',
  fig:(()=>{ const P=plane({x:[-5,5],y:[-3,4],grid:false,axes:false}), A=[-4,-2], B=[4,-2.3], C=[1,3.5], Ap=mid(B,C), G=[(A[0]+B[0]+C[0])/3,(A[1]+B[1]+C[1])/3];
    tri(P,A,B,C); sg(P,A,G,{c:'var(--math)',w:3}); sg(P,G,Ap,{c:'var(--sci)',w:3}); P.text((A[0]+G[0])/2,(A[1]+G[1])/2,'4,2 cm',{dy:-8,s:12,c:'var(--math)',a:'middle'});
    pt(P,A,'A',{dx:-16}); pt(P,B,'B',{dx:8}); pt(P,C,'C'); pt(P,Ap,'A′',{r:4,c:'var(--muted)'}); pt(P,G,'G',{c:'var(--spark)',dy:18});
    return P.svg(); })(),
  lab:'AA′ =',unit:'cm',ans:6.3,tol:0.001,why:'AG compte 2 parts : une part vaut 4,2 : 2 = 2,1 cm. La médiane compte 3 parts : AA′ = 3 · 2,1 = 6,3 cm.'},
 {kind:'Théorie',h:'Les polygones réguliers',p:`<p>Un panneau stop, une alvéole de nid d’abeille, un écrou, les pièces cousues d’un ballon de foot… Tous utilisent des polygones très spéciaux, parfaitement équilibrés.</p>
<div class="def"><p>Un <b>polygone régulier</b> a tous ses côtés de même longueur <b>et</b> tous ses angles égaux. Ses sommets sont sur un cercle de centre O. L’<b>angle au centre</b> est l’angle formé au centre par deux sommets voisins. Pour <i>n</i> côtés, il vaut ${F('360°','<i>n</i>')}.</p></div>
<div class="idea"><p>Les rayons vers les sommets découpent le tour complet, 360°, en <i>n</i> parts égales, comme une pizza. Chaque part est un triangle <b>isocèle</b> (deux côtés égaux : les rayons). Bouge le curseur : plus <i>n</i> est grand, plus le polygone ressemble au cercle. L’angle au centre est en bleu, l’angle intérieur (l’angle du polygone à un sommet) en orange.</p></div>
<div class="ex"><p>Hexagone (<i>n</i> = 6) : angle au centre 360° : 6 = 60°. Chaque triangle isocèle a donc deux angles de (180° − 60°) : 2 = 60°. Il est équilatéral : le côté de l’hexagone est égal au rayon du cercle.</p></div>
<div class="warn"><p>Des côtés égaux ne suffisent pas : un losange a quatre côtés égaux sans être un carré. Des angles égaux non plus : un rectangle a quatre angles droits, mais ce n’est un carré que si ses côtés sont égaux.</p></div>`,
  params:[{id:'n',l:'Nombre de côtés n',min:3,max:12,v:5}],
  draw:v=>polyFig(v.n),
  info:v=>`${NOMS[v.n]} : angle au centre 360° : ${v.n} = ${fmt(360/v.n)}° ; angle intérieur ${fmt(180-360/v.n)}°`},
 {kind:'Méthode',h:'Calculer les angles d’un polygone régulier',p:`<b>Quand :</b> on connaît le nombre de côtés <i>n</i> et on cherche les angles, ou l’inverse. <b>Pourquoi ça marche :</b> les rayons découpent le polygone en <i>n</i> triangles isocèles dont l’angle au sommet est l’angle au centre ${F('360°','<i>n</i>')}. Les deux angles de la base se partagent le reste, 180° moins l’angle au centre. À chaque sommet du polygone, deux de ces angles se collent. Donc <b>angle intérieur = 180° − angle au centre</b>. <b>Comment :</b> calcule d’abord l’angle au centre. Pour retrouver <i>n</i>, fais le chemin à l’envers : <i>n</i> = 360° : angle au centre.`,
  demo:{enonce:'a) Calculer l’angle au centre et l’angle intérieur d’un pentagone régulier. b) Un polygone régulier a des angles intérieurs de 150°. Combien a-t-il de côtés ?',
   etapes:[
    {f:'a) Angle au centre : 360° : 5 = 72°',w:'Le tour complet est partagé en 5 parts égales.'},
    {f:'Angles de la base de chaque triangle isocèle : (180° − 72°) : 2 = 54°',w:'La somme des angles d’un triangle vaut 180° et les deux angles de la base sont égaux.'},
    {f:'Angle intérieur : 2 · 54° = 108°, c’est bien 180° − 72°',w:'À chaque sommet, deux angles de base de triangles voisins se collent.'},
    {f:'b) Angle au centre : 180° − 150° = 30°',w:'On remonte la formule : angle intérieur = 180° − angle au centre.'},
    {f:'<i>n</i> = 360° : 30° = 12',w:'Il faut 12 parts de 30° pour faire le tour complet.'}],
   conclusion:'Pentagone : 72° au centre et 108° à chaque sommet. Le polygone aux angles de 150° a 12 côtés : c’est un dodécagone.'},
  note:'Contrôle avec la somme des angles : depuis un sommet, un pentagone se découpe en 3 triangles, donc ses angles font 3 · 180° = 540°, et 540° : 5 = 108°.'},
 {kind:'Méthode',h:'Construire un polygone régulier dans un cercle',p:'<b>Quand :</b> on doit dessiner un polygone régulier précis : un logo, une étoile, un plateau de jeu. <b>Pourquoi ça marche :</b> les sommets sont sur un cercle et deux sommets voisins sont séparés par l’angle au centre. <b>Comment :</b> trace un cercle et un premier rayon, puis reporte l’angle au centre au rapporteur autant de fois qu’il y a de côtés. Pour l’<b>hexagone</b>, pas besoin de rapporteur : le côté est égal au rayon, on reporte le rayon au compas six fois (fais avancer le curseur). Un sommet sur deux de l’hexagone donne un triangle équilatéral ; deux diamètres perpendiculaires donnent un carré.',
  params:[{id:'e',l:'Étape (hexagone au compas)',min:0,max:7,v:0}],
  draw:v=>hexStep(v.e), info:v=>hexInfo[v.e],
  demo:{enonce:'Construire un pentagone régulier inscrit dans un cercle de rayon 4 cm.',
   etapes:[
    {f:'Angle au centre : 360° : 5 = 72°',w:'C’est l’angle entre deux rayons voisins.'},
    {f:'Trace le cercle de centre O et de rayon 4 cm, puis un rayon [OA].',w:'A est le premier sommet.'},
    {f:'Rapporteur centré en O, zéro sur [OA] : marque 72°, 144°, 216° et 288°. Les rayons coupent le cercle en B, C, D et E.',w:'Mesurer chaque fois depuis [OA] évite d’accumuler de petites erreurs.'},
    {f:'Relie A, B, C, D, E dans l’ordre.',w:'Contrôle au compas : les cinq côtés doivent avoir la même longueur.'}],
   conclusion:'ABCDE est un pentagone régulier : cinq côtés égaux et cinq angles de 108°.'}},
 {kind:'Pratique',h:'Prépare un pentagone',p:'Tu veux construire un pentagone régulier (5 côtés) dans ce cercle. Règle l’angle au centre que tu vas reporter au rapporteur. Le tracé devient vert quand il se referme exactement sur A.',
  params:[{id:'a',l:'Angle au centre',min:20,max:120,step:4,v:60,u:'°'}],
  draw:v=>pentaFig(v.a),
  info:v=>`5 reports de ${v.a}° font ${5*v.a}°${5*v.a===360?' : un tour complet !':''}`,
  ok:v=>v.a===72,why:'360° : 5 = 72°. Avec 72°, le cinquième report retombe exactement sur A : 5 · 72° = 360°.'},
 {kind:'Méthode',h:'Dessiner à l’échelle',p:'<b>Quand :</b> l’objet est trop grand (ou trop petit) pour ta feuille : un terrain, une chambre, une rampe de skate. <b>Rappel :</b> l’échelle 1:200 veut dire que 1 cm sur le plan représente 200 cm en vrai. <b>Pourquoi ça marche :</b> toutes les longueurs sont divisées par le même nombre. La forme ne change pas et <b>les angles restent les mêmes</b>. <b>Comment :</b> convertis d’abord dans la même unité (souvent en cm), puis divise pour aller vers le plan, ou multiplie pour revenir au réel.',
  fig:(()=>{ const P=plane({x:[-4,6],y:[-3,3.2],grid:false,axes:false}), V=regPts([-1,0],2.4,6,0);
    P.poly(V,{fill:'var(--accent)',fo:.12,c:'var(--accent)',w:2.5}); sg(P,V[4],V[5],{c:'var(--spark)',w:4});
    P.text(.2,-2.2,'6 cm sur le plan = 3 m en vrai',{s:11,c:'var(--spark)',dy:18,a:'middle'});
    angMark(P,V[0],V[5],V[1],.5,{c:'var(--math)'}); P.text(V[0][0],V[0][1],'120°',{dx:6,dy:4,s:12,c:'var(--math)'});
    P.text(3.4,2.5,'échelle 1:50',{s:12,c:'var(--ink)'}); return P.svg(); })(),
  demo:{enonce:'Le kiosque d’un parc est un hexagone régulier de 3 m de côté. On le dessine à l’échelle 1:50. a) Longueur d’un côté sur le plan ? b) Sur ce plan, un banc mesure 4 cm : longueur réelle ? c) Sur un autre plan, une allée de 24 m mesure 8 cm : quelle est l’échelle ?',
   etapes:[
    {f:'a) 3 m = 300 cm ; 300 : 50 = 6 cm',w:'Même unité d’abord, puis on divise par 50 pour aller vers le plan.'},
    {f:'Les angles du dessin restent de 120°.',w:'L’échelle change les longueurs, jamais les angles : on construit un hexagone de 6 cm de côté comme d’habitude.'},
    {f:'b) 4 · 50 = 200 cm = 2 m',w:'Du plan vers le réel, on multiplie.'},
    {f:'c) 24 m = 2400 cm ; 2400 : 8 = 300, l’échelle est 1:300',w:'L’échelle répond à la question : 1 cm sur le plan vaut combien en vrai ?'}],
   conclusion:'Côté sur le plan : 6 cm. Banc : 2 m. Échelle de l’autre plan : 1:300. Réponds par une phrase, avec l’unité.'}},
 {h:'Le terrain de foot',p:'Un terrain de foot mesure 105 m de long. Sur un plan à l’échelle 1:500, quelle est sa longueur ?',lab:'longueur =',unit:'cm',ans:21,
  why:'105 m = 10 500 cm, et 10 500 : 500 = 21. Sur le plan, le terrain mesure 21 cm.'},
 {kind:'Défi',h:'Paver un sol avec un seul polygone régulier',p:'Un carreleur veut couvrir un sol avec des carreaux tous identiques, en forme de polygone régulier, sans trou ni chevauchement. Autour de chaque sommet, les angles des carreaux doivent faire exactement 360°. La figure montre ce qui se passe avec des pentagones. Quels polygones réguliers conviennent ?',
  fig:gapFig(),
  opts:['Triangle, carré, pentagone et hexagone','Carré et octogone seulement','Triangle, carré et hexagone seulement','Tous les polygones réguliers'],ans:2,
  why:'Fais un tableau des angles intérieurs : 60°, 90°, 108°, 120°, puis environ 128,6° et 135°… 360 : 60 = 6, 360 : 90 = 4 et 360 : 120 = 3 tombent juste, mais 360 : 108 n’est pas entier (trou de 36°). Au-delà de 6 côtés, l’angle dépasse 120° : deux carreaux ne suffisent pas et trois se chevauchent. Ici, faire un tableau organisé marche bien.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<p>Les droites remarquables donnent des points spéciaux du triangle, et les polygones réguliers se construisent grâce à leur angle au centre.</p><div class="keep"><ul>
<li><b>Médiatrices</b> → centre O du <b>cercle circonscrit</b> (OA = OB = OC). Deux médiatrices suffisent. Triangle rectangle : O au milieu de l’hypoténuse.</li>
<li><b>Bissectrices</b> → centre I du <b>cercle inscrit</b>, à égale distance des côtés. Rayon : distance de I à un côté, mesurée à angle droit.</li>
<li><b>Médianes</b> → <b>centre de gravité</b> G, point d’équilibre, aux <b>2/3</b> de chaque médiane depuis le sommet : 2 parts côté sommet, 1 part côté milieu.</li>
<li><b>Polygone régulier</b> : côtés égaux et angles égaux. Angle au centre = 360° : <i>n</i>. Angle intérieur = 180° − angle au centre. Et <i>n</i> = 360° : angle au centre.</li>
<li><b>Construction</b> : cercle, premier rayon, reports de l’angle au centre au rapporteur ; hexagone : six reports du rayon au compas.</li>
<li><b>Échelle 1:<i>n</i></b> : 1 cm sur le plan = <i>n</i> cm en vrai. Même unité d’abord ; on divise vers le plan, on multiplie vers le réel ; les angles ne changent pas.</li>
<li>Seuls le triangle équilatéral, le carré et l’hexagone régulier pavent le plan tout seuls.</li></ul></div>`},
 {kind:'Problème',h:'Le kiosque à musique',p:'La commune construit un kiosque à musique dont le sol est un hexagone régulier inscrit dans un cercle de 4 m de rayon. Une barrière fait le tour du kiosque, sauf sur un côté laissé libre pour l’entrée. L’architecte dessine aussi le plan du kiosque à l’échelle 1:200.',
  fig:kiosque,
  parts:[
   {q:'a) Combien mesure un côté de l’hexagone ?',unit:'m',ans:4,hint:'Calcule l’angle au centre. Que peux-tu dire des six triangles formés avec le centre ?',why:'Angle au centre : 360° : 6 = 60°. Chaque triangle isocèle a deux angles de (180° − 60°) : 2 = 60° : il est équilatéral. Le côté vaut le rayon, 4 m.'},
   {q:'b) Quelle longueur de barrière faut-il ?',unit:'m',ans:20,hint:'L’hexagone a 6 côtés, mais l’un reste libre.',why:'5 côtés de 4 m : 5 · 4 = 20 m.'},
   {q:'c) Quel angle forment deux barrières voisines ?',unit:'°',ans:120,hint:'C’est l’angle intérieur de l’hexagone : 180° moins l’angle au centre.',why:'180° − 60° = 120°.'},
   {q:'d) Sur le plan, quelle ouverture faut-il donner au compas pour tracer le cercle ?',unit:'cm',ans:2,hint:'Convertis 4 m en cm, puis divise par 200.',why:'4 m = 400 cm et 400 : 200 = 2 cm.'}],
  sol:'<p>L’angle au centre de l’hexagone vaut 360° : 6 = 60°. Les six triangles formés avec le centre sont isocèles avec un angle de 60° au sommet, donc leurs deux autres angles valent (180° − 60°) : 2 = 60° : ils sont équilatéraux et le côté de l’hexagone égale le rayon, 4 m.</p><p>La barrière couvre 5 côtés : 5 · 4 = 20 m. Deux barrières voisines forment l’angle intérieur 180° − 60° = 120°.</p><p>À l’échelle 1:200, le rayon de 400 cm devient 400 : 200 = 2 cm : on ouvre le compas à 2 cm, puis on reporte six fois cette ouverture sur le cercle. Les angles du plan restent de 120°.</p>'},
 {kind:'Problème',h:'Le mobile en carton',p:'Pour un mobile, Léa découpe un triangle ABC dans du carton, sur un quadrillage de 1 cm : A(0 ; 0), B(12 ; 0) et C(6 ; 9). Elle veut percer un trou au centre de gravité G pour que le triangle reste à plat quand on le suspend par un fil. Elle veut aussi peindre autour du triangle son cercle circonscrit, de centre O.',
  fig:carton,
  parts:[
   {q:'a) Combien mesure la médiane issue de C ?',unit:'cm',ans:9,hint:'Le milieu C′ de [AB] a pour coordonnées (6 ; 0).',why:'C(6 ; 9) et C′(6 ; 0) sont sur la même verticale : CC′ = 9 − 0 = 9 cm.'},
   {q:'b) À quelle hauteur au-dessus de [AB] faut-il percer le trou G ?',unit:'cm',ans:3,hint:'G est aux deux tiers de la médiane en partant du sommet C.',why:'Une part vaut 9 : 3 = 3 cm. CG = 6 cm et GC′ = 3 cm : G(6 ; 3), à 3 cm au-dessus de [AB].'},
   {q:'c) Le triangle est isocèle en C, donc O est sur la verticale <i>x</i> = 6, médiatrice de [AB]. On note O(6 ; <i>y</i>). Pourquoi a-t-on 6² + <i>y</i>² = (9 − <i>y</i>)² ?',opts:['Parce que O est aux deux tiers de la médiane','Parce que OA = OC : O est à la même distance de A et de C','Parce que OA = OC′','Parce que le triangle est rectangle en A'],ans:1,hint:'Calcule OA avec Pythagore et OC sur la verticale.',why:'Pythagore donne OA² = 6² + <i>y</i>², et OC = 9 − <i>y</i>. Le centre du cercle circonscrit vérifie OA = OC.'},
   {q:'d) Résous cette équation : à quelle hauteur se trouve O ?',lab:'y =',unit:'cm',ans:2.5,tol:0.001,hint:'Développe (9 − <i>y</i>)² = (9 − <i>y</i>)(9 − <i>y</i>) : les <i>y</i>² disparaissent.',why:'36 + <i>y</i>² = 81 − 18<i>y</i> + <i>y</i>², donc 18<i>y</i> = 45 et <i>y</i> = 2,5 cm.'},
   {q:'e) Quel est le rayon du cercle à peindre ?',unit:'cm',ans:6.5,tol:0.001,hint:'Le rayon est la distance OC.',why:'OC = 9 − 2,5 = 6,5 cm. Contrôle : OA² = 36 + 6,25 = 42,25 = 6,5².'}],
  sol:'<p>Le milieu de [AB] est C′(6 ; 0), donc la médiane [CC′] est verticale et mesure 9 cm. G est aux 2/3 depuis C : CG = 6 cm, GC′ = 3 cm, donc G(6 ; 3) : le trou est à 3 cm au-dessus de [AB].</p><p>Le triangle est isocèle en C, la médiatrice de [AB] est la droite <i>x</i> = 6 et O(6 ; <i>y</i>) est dessus. Il doit aussi vérifier OA = OC. Par Pythagore, OA² = 6² + <i>y</i>², et OC = 9 − <i>y</i>. On résout 36 + <i>y</i>² = 81 − 18<i>y</i> + <i>y</i>², d’où 18<i>y</i> = 45 et <i>y</i> = 2,5.</p><p>Le rayon vaut OC = 6,5 cm (contrôle : OA² = 36 + 6,25 = 42,25 = 6,5²). Remarque : O(6 ; 2,5) et G(6 ; 3) sont deux points différents, à 0,5 cm l’un de l’autre.</p>'},
]},

/* ===================== ISOMÉTRIES ET COMPOSITIONS ===================== */
{subj:'sec', sem:'a10', o:13, id:'sec10-isometries', h:'Isométries et compositions', p:'Retrouver l’axe, le centre ou la flèche d’une isométrie, enchaîner deux symétries, frises, pavages, agrandissements et coordonnées.', steps:[
 {kind:'Théorie',h:'Les quatre isométries',p:`<p>Dans un jeu vidéo, ton personnage glisse, se reflète dans un lac, fait un demi-tour ou pivote. Il bouge, mais il garde exactement la même taille et la même forme. Ces mouvements sont des <b>isométries</b>.</p>
<div class="def"><p>Une <b>isométrie</b> (« iso » = même, « métrie » = mesure) déplace une figure sans la déformer : elle conserve les <b>longueurs</b>, les <b>angles</b> et les <b>aires</b>. Il y en a quatre sortes :</p><ul><li>la <b>translation</b>, décrite par une flèche (direction, sens, longueur) ;</li><li>la <b>symétrie axiale</b>, décrite par un axe (un miroir) ;</li><li>la <b>symétrie centrale</b>, décrite par un centre (demi-tour) ;</li><li>la <b>rotation</b>, décrite par un centre, un angle et un sens.</li></ul></div>
<div class="idea"><p>Pour reconnaître l’isométrie, regarde l’<b>orientation</b>. Seule la symétrie axiale <b>retourne</b> la figure, comme un gant gauche qui devient un gant droit. Les trois autres la font seulement glisser ou tourner.</p></div>
<div class="ex"><p>Le drapeau a son bras vers la droite. Après une translation, il pointe toujours vers la droite. Après une rotation de 90°, il pointe vers le haut. Après une symétrie d’axe vertical, il pointe vers la gauche : il est retourné.</p></div>
<div class="warn"><p>La symétrie centrale est une rotation de 180°. Ce n’est pas un retournement : la figure a juste la tête en bas.</p></div>`,
  params:[{id:'t',l:'Isométrie (1 translation, 2 axiale, 3 centrale, 4 rotation)',min:1,max:4,v:1}],
  draw:v=>isoFig(v.t), info:v=>isoInfo[v.t-1]},
 {kind:'Méthode',h:'Retrouver l’axe, le centre de symétrie ou le vecteur',p:'<b>Quand :</b> on te donne une figure et son image, et on te demande quelle isométrie a été utilisée. <b>Pourquoi ça marche :</b> en symétrie axiale, l’axe est la <b>médiatrice</b> de [AA′] pour chaque point A et son image A′. En symétrie centrale, le centre est le <b>milieu</b> de [AA′]. En translation, la flèche qui va de A à A′ est la même pour tous les points : c’est le <b>vecteur</b> de la translation. <b>Comment :</b> 1) regarde l’orientation pour deviner le type ; 2) choisis un point A et son image A′ ; 3) trace la médiatrice, le milieu ou la flèche ; 4) contrôle avec un second point B. Sur un quadrillage, le milieu de [AA′] a pour coordonnées les <b>moyennes</b> : (abscisse de A + abscisse de A′) : 2, et de même pour l’ordonnée. Le curseur montre les trois cas.',
  params:[{id:'c',l:'Cas (1 axe, 2 centre, 3 vecteur)',min:1,max:3,v:1}],
  draw:v=>retrouverFig(v.c), info:v=>['La figure est retournée : symétrie axiale. L’axe est la médiatrice de [AA′] et de [BB′].','La figure a fait un demi-tour : symétrie centrale. Les segments [AA′] et [BB′] se coupent en leur milieu, le centre.','La figure a glissé sans tourner : translation. Les flèches de A à A′ et de B à B′ sont identiques : 6 à droite, 3 en haut.'][v.c-1],
  demo:{enonce:'Trois figures et leurs images. a) A(1 ; 2) a pour image A′(5 ; 2) et la figure est retournée. b) A(−2 ; 1) a pour image A′(4 ; 3) et la figure a la tête en bas. c) A(−3 ; 1) a pour image A′(2 ; −1) et la figure n’a ni tourné ni été retournée. Retrouver l’axe, le centre ou le vecteur.',
   etapes:[
    {f:'a) Retournée : symétrie axiale. Milieu de [AA′] : ((1 + 5) : 2 ; (2 + 2) : 2) = (3 ; 2)',w:'L’axe passe par le milieu de [AA′].'},
    {f:'[AA′] est horizontal, donc l’axe est la droite verticale qui passe par (3 ; 2) : la droite <i>x</i> = 3.',w:'La médiatrice est perpendiculaire à [AA′]. Contrôle avec un autre point : B(2 ; 4) doit aller en B′(4 ; 4).'},
    {f:'b) Tête en bas : symétrie centrale. Centre : ((−2 + 4) : 2 ; (1 + 3) : 2) = (1 ; 2)',w:'Le centre est le milieu de chaque segment [AA′].'},
    {f:'c) Translation. De A à A′ : 2 − (−3) = 5 vers la droite et −1 − 1 = −2, soit 2 vers le bas. Vecteur (5 ; −2).',w:'On compte les carreaux : abscisse d’arrivée moins abscisse de départ, ordonnée d’arrivée moins ordonnée de départ.'}],
   conclusion:'a) Axe <i>x</i> = 3. b) Centre (1 ; 2). c) Vecteur (5 ; −2) : 5 carreaux à droite, 2 vers le bas.'},
  note:'<b>Piège :</b> une figure qui a la tête en bas n’est pas forcément retournée. Fais tourner la feuille : si l’image se superpose sans la retourner, c’est un demi-tour.'},
 {kind:'Pratique',h:'Trouve l’axe de symétrie',p:'La figure orange a pour image la figure rose par une symétrie axiale. Choisis le type d’axe et sa position. Le reflet de la figure orange par ton axe est dessiné en pointillés : il doit tomber exactement sur la figure rose.',
  params:[{id:'o',l:'Type d’axe (1 vertical, 2 horizontal, 3 oblique à 45°)',min:1,max:3,v:1},{id:'k',l:'Position (l’axe passe par le point (0 ; k) ou (k ; 0))',min:-4,max:4,step:.5,v:0}],
  draw:v=>axeFig(v.o,v.k),
  info:v=>v.o===1?`Axe vertical : la droite <i>x</i> = ${fmt(v.k)}`:v.o===2?`Axe horizontal : la droite <i>y</i> = ${fmt(v.k)}`:`Axe oblique qui monte à 45° et passe par (0 ; ${fmt(v.k)})`,
  ok:v=>v.o===3&&v.k===1,
  why:'La figure est retournée et tournée d’un quart de tour : l’axe est oblique. Le sommet (1 ; 0) va en (−1 ; 2) : le milieu (0 ; 1) est sur l’axe, et [AA′] monte vers la gauche, perpendiculaire à l’axe qui monte à 45°. L’axe passe par (0 ; 1).'},
 {h:'À toi : le centre de symétrie',p:'Par une symétrie centrale, le point A(−1 ; 3) a pour image A′(5 ; −1). Où est le centre de la symétrie&nbsp;?',opts:['(2 ; 1)','(3 ; 2)','(6 ; −4)','(2 ; 2)'],ans:0,why:'Le centre est le milieu de [AA′] : ((−1 + 5) : 2 ; (3 + (−1)) : 2) = (4 : 2 ; 2 : 2) = (2 ; 1). (6 ; −4) est le trajet de A à A′, pas un milieu.'},
 {h:'À toi : la flèche de la translation',p:'Par une translation, le point B(4 ; −2) a pour image B′(1 ; 3). Quelle est la flèche (le vecteur) de cette translation&nbsp;?',opts:['(3 ; −5) : 3 à droite, 5 vers le bas','(−3 ; 5) : 3 à gauche, 5 vers le haut','(5 ; 1)','(−3 ; 1)'],ans:1,why:'Arrivée moins départ : 1 − 4 = −3 (3 carreaux à gauche) et 3 − (−2) = 5 (5 carreaux vers le haut). Le vecteur est (−3 ; 5). (3 ; −5) est la flèche dans l’autre sens, de B′ vers B.'},
 {kind:'Théorie',h:'Retrouver le centre d’une rotation',p:`<p>Une grande roue tourne : chaque nacelle reste à la même distance du moyeu. Si on ne voit que deux photos de la roue, comment retrouver le moyeu caché ? C’est le même problème pour une rotation.</p>
<div class="prop"><p>Dans une rotation de centre Ω (lire « oméga »), chaque point reste à la même distance du centre : <b>ΩA = ΩA′</b>. Le centre est donc sur la <b>médiatrice de [AA′]</b>, pour chaque point A. Avec deux points, A et B, le centre est l’<b>intersection</b> des médiatrices de [AA′] et de [BB′]. L’<b>angle</b> de la rotation est l’angle AΩA′.</p></div>
<div class="why"><p>La médiatrice de [AA′] contient tous les points à égale distance de A et de A′. Le centre en fait partie. Une seule médiatrice ne suffit pas, car elle contient une infinité de points. Deux médiatrices se coupent en un seul point : c’est le centre.</p></div>
<div class="ex"><p>Avance le curseur : médiatrice de [AA′], médiatrice de [BB′], centre Ω(−2 ; 1), puis l’angle AΩA′ de 90°, dans le sens des aiguilles d’une montre. Contrôle : C et C′ sont sur le même cercle de centre Ω.</p></div>
<div class="warn"><p>Si les deux médiatrices sont parallèles, elles ne se coupent pas : ce n’est pas une rotation, mais une translation.</p></div>`,
  params:[{id:'e',l:'Étape',min:0,max:5,v:0}],
  draw:v=>rotStep(v.e), info:v=>rotInfo[v.e]},
 {kind:'Méthode',h:'Retrouver le centre et l’angle d’une rotation',p:'<b>Quand :</b> l’image a la même orientation que la figure (rien n’est retourné) mais elle a tourné. <b>Pourquoi ça marche :</b> le centre est à la même distance de chaque point et de son image, donc sur chaque médiatrice [AA′], [BB′]… <b>Comment :</b> 1) choisis deux points A et B et leurs images ; 2) trace les médiatrices de [AA′] et de [BB′] ; 3) leur intersection est le centre Ω ; 4) mesure l’angle AΩA′ au rapporteur et note le sens (celui des aiguilles d’une montre, ou l’inverse) ; 5) contrôle : ΩA = ΩA′ et ΩB = ΩB′.',
  demo:{enonce:'Une rotation envoie A(4 ; 1) en A′(−1 ; 4) et B(4 ; 3) en B′(−3 ; 4). Retrouver son centre et son angle.',
   etapes:[
    {f:'Milieu de [AA′] : ((4 − 1) : 2 ; (1 + 4) : 2) = (1,5 ; 2,5). Milieu de [BB′] : (0,5 ; 3,5).',w:'Chaque médiatrice passe par le milieu de son segment.'},
    {f:'On trace les deux médiatrices, perpendiculaires à [AA′] et à [BB′]. Elles se coupent en Ω(0 ; 0).',w:'Sur le quadrillage, on prolonge les deux droites jusqu’à leur croisement.'},
    {f:'Contrôle : ΩA² = 4² + 1² = 17 et ΩA′² = 1² + 4² = 17.',w:'Pythagore sur le quadrillage : les distances au centre sont bien égales.'},
    {f:'Angle AΩA′ : on mesure 90°. Le point passe de la droite vers le haut : sens inverse des aiguilles d’une montre.',w:'La flèche ΩA (4 à droite, 1 en haut) devient ΩA′ (4 en haut, 1 à gauche) : c’est un quart de tour.'}],
   conclusion:'C’est la rotation de centre Ω(0 ; 0), d’angle 90°, dans le sens inverse des aiguilles d’une montre.'}},
 {kind:'Pratique',h:'Place le centre de la rotation',p:'La figure orange a tourné pour donner la figure rose. Déplace le point Ω jusqu’au centre de la rotation : il doit être à la même distance de A et de A′, et aussi de B et de B′.',
  params:[{id:'x',l:'Abscisse de Ω',min:-5,max:5,v:2},{id:'y',l:'Ordonnée de Ω',min:-4,max:4,v:-2}],
  draw:v=>placeRot(v.x,v.y),
  info:v=>{ const W=[v.x,v.y]; return `ΩA = ${fmt(D(W,PR_S[5]))} et ΩA′ = ${fmt(D(W,PR_I[5]))} ; ΩB = ${fmt(D(W,PR_S[1]))} et ΩB′ = ${fmt(D(W,PR_I[1]))}`; },
  ok:v=>v.x===-1&&v.y===1,
  why:'Ω(−1 ; 1) : A(1 ; 4) et A′(−4 ; 3) sont tous les deux à √13 ≈ 3,61 de Ω, et B(2 ; 1), B′(−1 ; 4) à 3. C’est une rotation de 90° dans le sens inverse des aiguilles d’une montre.'},
 {kind:'Théorie',h:'Deux symétries à la suite',p:`<p>Place-toi entre deux miroirs, dans un ascenseur ou chez le coiffeur : tu vois ton reflet, puis le reflet du reflet. Ce second reflet n’est plus retourné ! Que s’est-il passé ?</p>
<div class="prop"><p>On applique une symétrie d’axe d₁, puis une symétrie d’axe d₂ :</p><ul><li>si les axes sont <b>parallèles</b> et à distance <i>d</i>, on obtient une <b>translation</b> perpendiculaire aux axes, de longueur <b>2<i>d</i></b>, dans le sens de d₁ vers d₂ ;</li><li>si les axes sont <b>sécants</b> en S et font un angle α, on obtient une <b>rotation</b> de centre S et d’angle <b>2α</b>, dans le sens de d₁ vers d₂.</li></ul></div>
<div class="why"><p>Un retournement suivi d’un autre retournement remet la figure à l’endroit : le résultat glisse ou tourne. Pour les axes parallèles, mesure sur une règle : d₁ en 0, d₂ en 3. Un point en −1 va en 1 (reflet dans d₁), puis en 5 (reflet dans d₂). Il a avancé de 6 = 2 · 3. Pour un point en −2 : 2, puis 4, encore 6.</p></div>
<div class="ex"><p>Mode 1 du curseur : axes parallèles à 2 carreaux, la figure rose a glissé de 4 carreaux. Mode 2 réglé sur 3 (axes à 45°) : la figure rose a tourné de 90° autour de S. Le reflet intermédiaire est en pointillés.</p></div>
<div class="warn"><p>L’ordre compte : d₂ puis d₁ donne la translation (ou la rotation) dans le sens contraire.</p></div>`,
  params:[{id:'m',l:'Mode (1 axes parallèles, 2 axes sécants)',min:1,max:2,v:1},{id:'t',l:'Écart (× 0,5 carreau) ou angle (× 15°)',min:1,max:6,v:4}],
  draw:v=>deuxSym(v.m,v.t),
  info:v=>v.m===1?`Axes parallèles à ${fmt(v.t*.5)} carreau${v.t>2?'x':''} : translation de ${fmt(v.t)} carreau${v.t>1?'x':''}`:`Axes sécants à ${15*v.t}° : rotation de ${30*v.t}° autour de S`},
 {kind:'Méthode',h:'Remplacer deux symétries par une seule isométrie',p:'<b>Quand :</b> on applique deux symétries axiales l’une après l’autre et on veut le mouvement unique qui fait le même effet. <b>Pourquoi ça marche :</b> deux retournements se compensent ; chaque reflet double la distance (ou l’angle) qui sépare le point de l’axe. <b>Comment :</b> 1) regarde si les axes sont parallèles ou sécants ; 2) mesure l’écart <i>d</i> ou l’angle α entre les axes ; 3) double : translation de 2<i>d</i> ou rotation de 2α ; 4) le sens va du premier axe vers le second. Si les deux axes sont confondus, la figure revient à sa place.',
  demo:{enonce:'a) Le point A(0 ; 2) subit la symétrie d’axe <i>x</i> = 1, puis celle d’axe <i>x</i> = 4. Où arrive-t-il ? b) Deux axes se coupent en S et font un angle de 35°. Quelle isométrie remplace les deux symétries ?',
   etapes:[
    {f:'a) A est à 1 carreau à gauche de l’axe <i>x</i> = 1 : son reflet A′ est à 1 carreau à droite, A′(2 ; 2).',w:'Un point et son image sont à la même distance de l’axe, de part et d’autre.'},
    {f:'A′ est à 2 carreaux à gauche de l’axe <i>x</i> = 4 : A″(6 ; 2).',w:'On lit « A seconde ». Même raisonnement avec le second axe.'},
    {f:'Contrôle : écart des axes 4 − 1 = 3, translation de 2 · 3 = 6 vers la droite. 0 + 6 = 6 ✓',w:'Le sens va du premier axe (<i>x</i> = 1) vers le second (<i>x</i> = 4) : vers la droite.'},
    {f:'b) Axes sécants : rotation de centre S, d’angle 2 · 35° = 70°.',w:'Le sens de la rotation est celui qui va du premier axe vers le second.'}],
   conclusion:'a) A″(6 ; 2) : translation de 6 carreaux vers la droite. b) Rotation de centre S et d’angle 70°.'}},
 {h:'Deux miroirs sécants',p:'Deux miroirs sécants forment un angle de 40°. Un point subit la symétrie par le premier miroir, puis par le second. De quel angle a-t-il tourné autour du point de rencontre des miroirs ?',lab:'angle =',unit:'°',ans:80,
  why:'Deux symétries d’axes sécants donnent une rotation d’angle double : 2 · 40° = 80°.'},
 {kind:'Théorie',h:'Frises et pavages',p:`<p>Regarde le bord d’un tapis, une bande de papier peint, le carrelage de la salle de bain : un même motif revient sans cesse. Ce sont des frises et des pavages, et les isométries les fabriquent.</p>
<div class="def"><p>Une <b>frise</b> est une bande où un motif se répète par une <b>translation</b> le long de la bande. La plus petite translation qui la superpose à elle-même s’appelle le <b>pas</b>. Un <b>pavage</b> recouvre tout le plan avec des pièces, sans trou ni chevauchement, en répétant un motif par des translations dans <b>deux directions</b>.</p></div>
<div class="idea"><p>Pour créer une frise, on fabrique un motif de base, éventuellement avec une symétrie ou un demi-tour, puis on le fait glisser d’un pas, encore et encore. Bouge le curseur pour voir quatre exemples.</p></div>
<div class="ex"><p>Frise 2 : le drapeau, puis son reflet, puis le drapeau… Le pas vaut deux motifs : 6 carreaux. Deux reflets de suite dans des axes parallèles à 3 carreaux donnent bien une translation de 6.</p></div>
<div class="blk" data-t="Le savais-tu ?"><p>Les mathématiciens ont démontré qu’il n’existe que <b>7 types de frises</b> et <b>17 types de pavages</b> périodiques. L’artiste néerlandais M. C. Escher a créé des pavages célèbres avec des oiseaux, des poissons et des lézards, après avoir visité les mosaïques de l’Alhambra, en Espagne.</p></div>`,
  params:[{id:'m',l:'Exemple',min:1,max:4,v:1}],
  draw:v=>friseFig(v.m), info:v=>friseInfo[v.m-1]},
 {kind:'Méthode',h:'Agrandir ou réduire : le rapport',p:'<b>Quand :</b> une figure est agrandie (une photo imprimée en grand) ou réduite (une carte, une maquette). <b>Rappel :</b> toutes les longueurs sont multipliées par un même nombre <i>k</i>, le <b>rapport</b>. Si <i>k</i> &gt; 1, c’est un agrandissement ; si <i>k</i> &lt; 1, une réduction. Les angles ne changent pas. Ce n’est <b>pas une isométrie</b> (sauf si <i>k</i> = 1), car les longueurs changent. <b>Pourquoi ça marche :</b> la forme est conservée seulement si toutes les longueurs sont multipliées par le même nombre. <b>Comment :</b> 1) trouve deux longueurs qui se correspondent ; 2) <i>k</i> = longueur de l’image : longueur de départ ; 3) multiplie les autres longueurs par <i>k</i>. Bouge le curseur : les angles marqués ne bougent pas.',
  params:[{id:'k',l:'Rapport k',min:.5,max:2.5,step:.25,v:1.5}],
  draw:v=>agrFig(v.k), info:v=>`Rapport ${fmt(v.k)} : le côté de 2 devient ${fmt(2*v.k)}. ${v.k>1?'Agrandissement':v.k<1?'Réduction':'Même taille : isométrie'}.`,
  demo:{enonce:'a) Une photo de 10 cm sur 15 cm est agrandie : sa largeur passe à 25 cm. Quelle est sa nouvelle hauteur ? b) Une maquette réduit une voiture de 4 m de long à 16 cm. Quel est le rapport ?',
   etapes:[
    {f:'a) <i>k</i> = 25 : 10 = 2,5',w:'La largeur de départ et celle de l’image se correspondent.'},
    {f:'Hauteur : 15 · 2,5 = 37,5 cm',w:'Toutes les longueurs sont multipliées par le même rapport.'},
    {f:'b) Même unité : 4 m = 400 cm. <i>k</i> = 16 : 400 = 0,04',w:'Sans conversion, on obtiendrait un rapport faux.'},
    {f:'0,04 &lt; 1 : c’est une réduction, la maquette est 25 fois plus petite.',w:'1 : 0,04 = 25. Une échelle 1:25 et un rapport 0,04 disent la même chose.'}],
   conclusion:'a) La photo agrandie mesure 25 cm sur 37,5 cm. b) Le rapport vaut 0,04 (échelle 1:25).'}},
 {h:'La réduction du triangle',p:'Un triangle a des côtés de 4 cm, 6 cm et 7 cm. Dans une réduction, le côté de 6 cm devient 4,5 cm. Combien mesure l’image du côté de 4 cm ?',lab:'longueur =',unit:'cm',ans:3,tol:0.001,
  why:'Rapport : 4,5 : 6 = 0,75. Image du côté de 4 cm : 4 · 0,75 = 3 cm.'},
 {kind:'Méthode',h:'Repérer les images avec des coordonnées',p:'<b>Quand :</b> la figure est sur un quadrillage avec un repère, comme sur un plateau de bataille navale ou dans un jeu vidéo. <b>Pourquoi ça marche :</b> on suit chaque déplacement en carreaux. <b>Comment :</b> pour un point (<i>x</i> ; <i>y</i>) :<ul><li>translation de vecteur (<i>a</i> ; <i>b</i>) : (<i>x</i> + <i>a</i> ; <i>y</i> + <i>b</i>) ;</li><li>symétrie d’axe vertical <i>x</i> = <i>c</i> : l’ordonnée ne change pas, la nouvelle abscisse est 2<i>c</i> − <i>x</i> (avec l’axe des ordonnées, <i>c</i> = 0 : (−<i>x</i> ; <i>y</i>)) ;</li><li>symétrie par rapport à l’axe des abscisses : (<i>x</i> ; −<i>y</i>) ;</li><li>symétrie centrale de centre l’origine : (−<i>x</i> ; −<i>y</i>) ;</li><li>rotation de 90° autour de l’origine, sens inverse des aiguilles d’une montre : (−<i>y</i> ; <i>x</i>).</li></ul>',
  fig:(()=>{ const P=plane({x:[-5,5],y:[-4,4],lab:1}), A=[3,-2];
    [[[-1,3],'T'],[[-3,-2],'S'],[[-3,2],'C'],[[2,3],'R']].forEach(([p,l])=>{ sg(P,A,p,{c:'var(--line)',w:1.2,dash:true}); pt(P,p,l,{r:4,c:'var(--spark)'}); });
    pt(P,A,'A',{c:'var(--accent)'}); P.text(-4.8,-3.6,'T translation, S axe vertical, C centre, R rotation',{s:10,c:'var(--muted)'}); return P.svg(); })(),
  demo:{enonce:'Le point A(3 ; −2). Trouver son image par : a) la translation de vecteur (−4 ; 5) ; b) la symétrie d’axe des ordonnées ; c) la symétrie de centre l’origine ; d) la rotation de 90° autour de l’origine, sens inverse des aiguilles d’une montre ; e) la symétrie d’axe <i>x</i> = 1.',
   etapes:[
    {f:'a) (3 − 4 ; −2 + 5) = (−1 ; 3)',w:'4 carreaux vers la gauche, 5 vers le haut.'},
    {f:'b) (−3 ; −2)',w:'Le miroir vertical change le côté gauche-droite, pas la hauteur.'},
    {f:'c) (−3 ; 2)',w:'Le demi-tour change les deux signes.'},
    {f:'d) (−(−2) ; 3) = (2 ; 3)',w:'La flèche « 3 à droite, 2 en bas » devient « 3 en haut, 2 à droite » après un quart de tour.'},
    {f:'e) 2 · 1 − 3 = −1, donc (−1 ; −2)',w:'A est à 2 carreaux à droite de l’axe ; son image est à 2 carreaux à gauche.'}],
   conclusion:'T(−1 ; 3), S(−3 ; −2), C(−3 ; 2), R(2 ; 3) et (−1 ; −2) pour l’axe <i>x</i> = 1.'}},
 {h:'Le trésor sur la carte',p:'Sur la carte d’un jeu, le trésor est en P(−2 ; 5). Un sort le transporte en son symétrique par rapport à l’origine. Où arrive-t-il ?',opts:['(2 ; 5)','(−2 ; −5)','(5 ; −2)','(2 ; −5)'],ans:3,
  why:'La symétrie de centre l’origine change les deux signes : (−2 ; 5) devient (2 ; −5).'},
 {kind:'Défi',h:'Le kaléidoscope',p:'Deux miroirs verticaux se touchent par un bord et forment un angle de 60°. Une bougie est posée entre eux. En comptant tous les reflets (y compris les reflets de reflets), combien de bougies-images vois-tu, sans compter la vraie ?',
  fig:(()=>{ const P=plane({x:[-4,4],y:[-4,4],w:280,grid:false,axes:false});
    for(let k=0;k<6;k++){ const a=rad(60*k); P.seg(0,0,4*Math.cos(a),4*Math.sin(a),{c:k<2?'var(--math)':'var(--line)',w:k<2?3:1,dash:k>=2}); }
    pt(P,[2.2*Math.cos(rad(25)),2.2*Math.sin(rad(25))],'bougie',{c:'var(--spark)'});
    P.text(3.2,-.4,'miroir',{c:'var(--math)',s:11}).text(1.2,3.5,'miroir',{c:'var(--math)',s:11});
    return P.svg(); })(),
  lab:'nombre d’images =',ans:5,
  why:'Commence par un cas plus simple : à 90°, les miroirs découpent le tour en 4 secteurs et on voit 3 images. À 60°, les reflets successifs (symétries, puis rotations de 2 · 60° = 120°) remplissent les 360° : 6 secteurs de 60°, un pour la vraie bougie, donc 5 images. Commencer par un cas plus simple et faire un dessin marche bien ici.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<p>Une isométrie déplace une figure sans changer ses longueurs, ses angles ni ses aires. On la reconnaît, puis on retrouve ce qui la décrit.</p><div class="keep"><ul>
<li><b>Translation</b> : un vecteur (flèche). De A à A′ : (abscisse d’arrivée − abscisse de départ ; ordonnée d’arrivée − ordonnée de départ).</li>
<li><b>Symétrie axiale</b> : seule isométrie qui <b>retourne</b> la figure. Axe = médiatrice de [AA′].</li>
<li><b>Symétrie centrale</b> : demi-tour, centre = milieu de [AA′].</li>
<li><b>Rotation</b> : centre = intersection des médiatrices de [AA′] et [BB′], angle AΩA′, avec le sens.</li>
<li><b>Deux symétries</b> : axes parallèles à <i>d</i> → translation de 2<i>d</i> ; axes sécants à α → rotation de 2α ; sens du premier axe vers le second.</li>
<li><b>Frise</b> : un motif répété par une translation (le pas). <b>Pavage</b> : translations dans deux directions, sans trou ni chevauchement.</li>
<li><b>Agrandissement, réduction</b> : longueurs × <i>k</i>, angles inchangés ; <i>k</i> = longueur image : longueur de départ.</li>
<li><b>Coordonnées</b> : (<i>x</i> + <i>a</i> ; <i>y</i> + <i>b</i>), (−<i>x</i> ; <i>y</i>), (<i>x</i> ; −<i>y</i>), (−<i>x</i> ; −<i>y</i>), (−<i>y</i> ; <i>x</i>), et 2<i>c</i> − <i>x</i> pour l’axe <i>x</i> = <i>c</i>.</li></ul></div>`},
 {kind:'Problème',h:'Les miroirs magiques',p:'Dans un jeu vidéo, le héros se trouve en H(−3 ; 1). Il traverse un premier miroir magique, la droite verticale <i>x</i> = 1, qui l’envoie en son symétrique H′. Puis un second miroir, la droite <i>x</i> = 4, l’envoie en H″. On cherche le mouvement unique qui remplace les deux miroirs.',
  fig:(()=>{ const P=plane({x:[-5,10],y:[-2,4],w:320,lab:2}); P.seg(1,-2,1,4,{c:'var(--math)',w:2.5}).seg(4,-2,4,4,{c:'var(--sci)',w:2.5});
    pt(P,[-3,1],'H',{c:'var(--accent)'}); P.text(1,3.4,'x = 1',{dx:4,s:11,c:'var(--math)'}).text(4,3.4,'x = 4',{dx:4,s:11,c:'var(--sci)'}); return P.svg(); })(),
  parts:[
   {q:'a) Quelle est l’abscisse de H′ ?',lab:'abscisse =',ans:5,hint:'H est à 4 carreaux à gauche de l’axe <i>x</i> = 1.',why:'2 · 1 − (−3) = 5 : H′(5 ; 1), à 4 carreaux à droite de l’axe.'},
   {q:'b) Quelle est l’abscisse de H″ ?',lab:'abscisse =',ans:3,hint:'H′ est à droite de l’axe <i>x</i> = 4 : de combien ?',why:'2 · 4 − 5 = 3 : H″(3 ; 1).'},
   {q:'c) Quelle est la longueur de la translation qui remplace les deux miroirs ?',unit:'carreaux',ans:6,hint:'Compare H et H″, ou double l’écart entre les axes.',why:'De −3 à 3 : 6 carreaux, soit 2 · (4 − 1) = 6.'},
   {q:'d) Si le héros traverse d’abord le miroir <i>x</i> = 4, puis le miroir <i>x</i> = 1, où arrive-t-il ?',opts:['En (3 ; 1), au même endroit','En (−9 ; 1), 6 carreaux à gauche de H','En (9 ; 1)','En (−3 ; 1), il revient au départ'],ans:1,hint:'Le sens de la translation va du premier axe vers le second.',why:'2 · 4 − (−3) = 11, puis 2 · 1 − 11 = −9 : translation de 6 carreaux vers la gauche.'}],
  sol:'<p>Pour un axe vertical <i>x</i> = <i>c</i>, l’image de l’abscisse <i>x</i> est 2<i>c</i> − <i>x</i>, l’ordonnée ne change pas.</p><p>H(−3 ; 1) → H′(2 · 1 + 3 ; 1) = (5 ; 1) → H″(2 · 4 − 5 ; 1) = (3 ; 1).</p><p>Le héros a glissé de 6 carreaux vers la droite : c’est la translation de vecteur (6 ; 0). On le retrouve avec la règle : axes parallèles distants de 3, translation de 2 · 3 = 6, du premier axe vers le second.</p><p>Dans l’ordre inverse, H → (11 ; 1) → (−9 ; 1) : la translation est aussi de 6 carreaux, mais vers la gauche. L’ordre compte.</p>'},
 {kind:'Problème',h:'Le logo qui tourne',p:'Un graphiste anime un logo triangulaire sur un quadrillage. Le triangle A(5 ; 1), B(5 ; 3), C(4 ; 3) devient A′(2 ; 4), B′(0 ; 4), C′(0 ; 3). Il veut savoir quel mouvement il a programmé, puis le reproduire avec deux miroirs.',
  fig:(()=>{ const P=plane({x:[-1,7],y:[-1,6],w:300,lab:1}), S=[[5,1],[5,3],[4,3]], I=[[2,4],[0,4],[0,3]];
    P.poly(S,{fill:'var(--accent)',fo:.35,c:'var(--accent)',w:2}); P.poly(I,{fill:'var(--spark)',fo:.35,c:'var(--spark)',w:2});
    ['A','B','C'].forEach((l,i)=>{ pt(P,S[i],l,{r:4,c:'var(--accent)'}); pt(P,I[i],l+'′',{r:4,c:'var(--spark)',dx:i?-22:8}); }); return P.svg(); })(),
  parts:[
   {q:'a) Quelle isométrie transforme ABC en A′B′C′ ?',opts:['Une translation','Une symétrie axiale','Une rotation','Une symétrie centrale'],ans:2,hint:'Regarde le côté [AB] : il était vertical, il devient horizontal. Et l’orientation ?',why:'[AB] vertical devient [A′B′] horizontal : la figure a tourné d’un quart de tour, donc ni translation ni demi-tour. Elle n’est pas retournée (ordre des sommets A, B, C conservé), donc pas de symétrie axiale : c’est une rotation.'},
   {q:'b) Le centre Ω est l’intersection des médiatrices de [AA′] et de [BB′]. Quelles sont ses coordonnées ?',opts:['(3,5 ; 2,5)','(2 ; 1)','(1 ; 2)','(2,5 ; 3,5)'],ans:1,hint:'Teste chaque point : il doit être à la même distance de A et de A′, et de B et de B′.',why:'Avec Ω(2 ; 1) : ΩA = 3 et ΩA′ = 3 ; ΩB² = 3² + 2² = 13 et ΩB′² = 2² + 3² = 13. (3,5 ; 2,5) est seulement le milieu de [AA′].'},
   {q:'c) Quel est l’angle de la rotation ?',unit:'°',ans:90,hint:'Mesure l’angle AΩA′ : ΩA va vers la droite, ΩA′ vers le haut.',why:'ΩA = (3 ; 0) vers la droite, ΩA′ = (0 ; 3) vers le haut : un quart de tour, 90°, sens inverse des aiguilles d’une montre.'},
   {q:'d) On veut obtenir la même rotation avec deux symétries d’axes qui se coupent en Ω. Quel angle doivent faire les deux axes ?',unit:'°',ans:45,hint:'Deux symétries d’axes sécants donnent une rotation d’angle double.',why:'2α = 90°, donc α = 45°.'}],
  sol:'<p>Le côté [AB] est vertical et son image [A′B′] horizontale : la figure a tourné. Elle n’est pas retournée, donc c’est une rotation, et pas un demi-tour.</p><p>Le centre est à égale distance de chaque point et de son image. Ω(2 ; 1) convient : ΩA = ΩA′ = 3 et ΩB² = ΩB′² = 13 (Pythagore). C’est bien l’intersection des médiatrices de [AA′] et de [BB′].</p><p>La flèche ΩA (3 à droite) devient ΩA′ (3 en haut) : angle de 90°, sens inverse des aiguilles d’une montre.</p><p>Deux symétries d’axes sécants en Ω donnent une rotation d’angle double : les axes doivent faire 90° : 2 = 45°.</p>'},
]},
);
})();
