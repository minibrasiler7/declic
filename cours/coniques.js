/* Déclic — Géométrie analytique : coniques */
(()=>{
// ---------- helpers locaux ----------
const pt=(x,y)=>`(${fmt(x)} ; ${fmt(y)})`;
const sq=x=>x*x;
const ch=Math.cosh, sh=Math.sinh;
// droite ax + by + c = 0 tracée dans la fenêtre [-L ; L]
function line2(P,a,b,c,q,L=30){ if(Math.abs(a)<1e-12&&Math.abs(b)<1e-12) return P; if(Math.abs(b)>=Math.abs(a)) P.seg(-L,(-c+a*L)/b,L,(-c-a*L)/b,q); else P.seg((-c+b*L)/a,-L,(-c-b*L)/a,L,q); return P; }
// courbe implicite f(x, y) = 0, par « marching squares », reliée en polylignes
function implicit(P,f,xr,yr,q={},n=72){
  const dx=(xr[1]-xr[0])/n, dy=(yr[1]-yr[0])/n, V=[];
  for(let i=0;i<=n;i++){ V[i]=[]; for(let j=0;j<=n;j++) V[i][j]=f(xr[0]+i*dx,yr[0]+j*dy); }
  const pts={}, adj={};
  const E=(i,j,h)=>{ const k=(h?'h':'v')+i+'_'+j; if(!pts[k]){ const a=V[i][j], b=h?V[i+1][j]:V[i][j+1], t=a/(a-b);
    pts[k]=h?[xr[0]+(i+t)*dx,yr[0]+j*dy]:[xr[0]+i*dx,yr[0]+(j+t)*dy]; } return k; };
  const link=(a,b)=>{ (adj[a]=adj[a]||[]).push(b); (adj[b]=adj[b]||[]).push(a); };
  for(let i=0;i<n;i++) for(let j=0;j<n;j++){
    const s0=V[i][j]>=0, s1=V[i+1][j]>=0, s2=V[i+1][j+1]>=0, s3=V[i][j+1]>=0;
    const bo=s0!==s1?E(i,j,1):null, ri=s1!==s2?E(i+1,j,0):null, to=s3!==s2?E(i,j+1,1):null, le=s0!==s3?E(i,j,0):null;
    const L=[bo,ri,to,le].filter(Boolean);
    if(L.length===2) link(L[0],L[1]);
    else if(L.length===4){ const c=f(xr[0]+(i+.5)*dx,yr[0]+(j+.5)*dy)>=0;
      if(c===s0){ link(bo,ri); link(to,le); } else { link(bo,le); link(ri,to); } }
  }
  const used={};
  const walk=s=>{ const c=[pts[s]]; used[s]=1; let cur=s;
    for(;;){ const nx=adj[cur].find(k=>!used[k]); if(!nx){ if(adj[cur].includes(s)&&c.length>2) c.push(pts[s]); break; } used[nx]=1; c.push(pts[nx]); cur=nx; }
    return c; };
  Object.keys(adj).filter(k=>adj[k].length===1).forEach(k=>{ if(!used[k]) { const c=walk(k); if(c.length>1) P.poly(c,Object.assign({w:3},q,{open:true})); } });
  Object.keys(adj).forEach(k=>{ if(!used[k]) { const c=walk(k); if(c.length>1) P.poly(c,Object.assign({w:3},q,{open:true})); } });
  return P;
}
// conique ax² + 2bxy + cy² + 2dx + 2ey + f = 0
const Q=(k,x,y)=>k.a*x*x+2*k.b*x*y+k.c*y*y+2*k.d*x+2*k.e*y+k.f;
const drawConic=(P,k,xr,yr,q,n)=>implicit(P,(x,y)=>Q(k,x,y),xr,yr,q,n);
const det3=m=>m[0][0]*(m[1][1]*m[2][2]-m[1][2]*m[2][1])-m[0][1]*(m[1][0]*m[2][2]-m[1][2]*m[2][0])+m[0][2]*(m[1][0]*m[2][1]-m[1][1]*m[2][0]);
const Amat=k=>[[k.a,k.b,k.d],[k.b,k.c,k.e],[k.d,k.e,k.f]];
const typeOf=k=>{ const dl=k.a*k.c-k.b*k.b, D=det3(Amat(k)), z=x=>Math.abs(x)<1e-9;
  if(z(D)) return 'conique <b>dégénérée</b> (det <i>A</i> = 0)';
  return z(dl)?'<b>parabole</b>':dl>0?'<b>ellipse</b>'+((k.a+k.c)*D>0?' vide (aucun point réel)':''):'<b>hyperbole</b>'; };
// valeurs propres d’une matrice symétrique [[a, b], [b, c]] et angle du 1er vecteur propre
const eig2=(a,b,c)=>{ const m=(a+c)/2, r=Math.hypot((a-c)/2,b); return {l1:m+r,l2:m-r,th:Math.atan2(2*b,a-c)/2}; };
// conique passant par 5 points : noyau d’un système 5 × 6
function conic5(P5){ const A=P5.map(([x,y])=>[x*x,2*x*y,y*y,2*x,2*y,1]), piv=[]; let row=0;
  for(let col=0;col<6&&row<5;col++){ let best=row; for(let i=row;i<5;i++) if(Math.abs(A[i][col])>Math.abs(A[best][col])) best=i;
    if(Math.abs(A[best][col])<1e-10) continue; [A[row],A[best]]=[A[best],A[row]];
    for(let i=0;i<5;i++) if(i!==row){ const k=A[i][col]/A[row][col]; for(let j=col;j<6;j++) A[i][j]-=k*A[row][j]; }
    piv.push(col); row++; }
  const fr=[0,1,2,3,4,5].find(c=>!piv.includes(c)), s=Array(6).fill(0); s[fr]=1;
  piv.forEach((c,i)=>{ s[c]=-A[i][fr]/A[i][c]; });
  const mx=Math.max(...s.map(Math.abs)); return {a:s[0]/mx,b:s[1]/mx,c:s[2]/mx,d:s[3]/mx,e:s[4]/mx,f:s[5]/mx}; }
// écriture lisible d’un polynôme : [[coef, 'x²'], …]
const poly=t=>{ let s=''; t.forEach(([c,m])=>{ if(Math.abs(c)<1e-9) return; const a=Math.abs(c), sg=c<0?' − ':' + ';
  s+=(s?sg:(c<0?'−':''))+(m&&Math.abs(a-1)<1e-9?'':fmt(a))+(m?m:''); }); return (s||'0')+' = 0'; };
const eqConic=k=>poly([[k.a,'<i>x</i>²'],[2*k.b,'<i>xy</i>'],[k.c,'<i>y</i>²'],[2*k.d,'<i>x</i>'],[2*k.e,'<i>y</i>'],[k.f,'']]);
// ellipse et hyperbole paramétrées
const ell=(P,a,b,q={},cx=0,cy=0)=>P.curve(t=>cx+a*Math.cos(t),t=>cy+b*Math.sin(t),0,2*Math.PI,q);
const hyp=(P,a,b,q={},T=3)=>{ P.curve(t=>a*ch(t),t=>b*sh(t),-T,T,q); return P.curve(t=>-a*ch(t),t=>b*sh(t),-T,T,q); };

// ---------- le cône coupé par un plan (demi-angle 30°) ----------
const TB=Math.tan(rad(30)), ZM=2.6;
function coneFig(al,az){
  const S=space({r:3.1,az,el:16,axes:false});
  for(let k=0;k<12;k++){ const p=rad(k*30), c=Math.cos(p)*TB*ZM, s=Math.sin(p)*TB*ZM; S.seg([c,s,ZM],[-c,-s,-ZM],{c:'var(--line)',w:1.2}); }
  [ZM,-ZM].forEach(z=>{ const r=[]; for(let k=0;k<=48;k++){ const p=2*Math.PI*k/48; r.push([TB*ZM*Math.cos(p),TB*ZM*Math.sin(p),z]); } S.poly(r,{c:'var(--muted)',w:1.5,open:true}); });
  const a=rad(al), Q0=[.3,0,.8], e1=[Math.cos(a),0,Math.sin(a)];
  const cor=(s,t)=>[Q0[0]+s*e1[0],t,Q0[2]+s*e1[2]];
  S.poly([cor(-2.6,-1.7),cor(2.6,-1.7),cor(2.6,1.7),cor(-2.6,1.7)],{fill:'var(--sci)',fo:.15,c:'var(--sci)',w:1});
  const n=[-Math.sin(a),0,Math.cos(a)], nQ=n[0]*Q0[0]+n[2]*Q0[2]; let run=[];
  const flush=()=>{ if(run.length>1) S.poly(run,{c:'var(--accent)',w:3.5,open:true}); run=[]; };
  for(let k=0;k<=360;k++){ const p=rad(k), w=[TB*Math.cos(p),TB*Math.sin(p),1], nw=n[0]*w[0]+n[2]*w[2];
    if(Math.abs(nw)<1e-9){ flush(); continue; } const s=nQ/nw, M=[s*w[0],s*w[1],s*w[2]];
    if(Math.abs(M[2])<=ZM) run.push(M); else flush(); }
  flush(); S.dot([0,0,0],{r:3,c:'var(--ink)'});
  return S.svg();
}
const coneInfo=al=>{ const e=Math.sin(rad(al))/Math.cos(rad(30));
  return `Inclinaison α = ${al}° (génératrices à 60°) · <i>e</i> = sin α / cos 30° = ${fmt(e)} → `+(al===0?'<b>cercle</b>':al<60?'<b>ellipse</b>':al===60?'<b>parabole</b>':'<b>hyperbole</b> (deux branches)'); };
const azP={id:'az',l:'Angle de vue',min:-60,max:90,step:15,v:30,u:'°'};

// ---------- conique de foyer O et de directrice x = −2 ----------
function fdFig(e,th,q={}){
  const P=plane({x:[-4,6],y:[-4,4],lab:2}), p=2;
  P.seg(-p,-5,-p,5,{c:'var(--muted)',w:2,dash:true}); P.text(-p,3.4,'D',{dx:6,c:'var(--muted)'});
  implicit(P,(x,y)=>x*x+y*y-e*e*sq(x+p),[-4,6],[-4,4],{c:q.c||'var(--accent)'},80);
  const t=rad(th), r=e*p/(1-e*Math.cos(t)), M=[r*Math.cos(t),r*Math.sin(t)];
  if(q.A) P.dot(0,3,{c:'var(--ok)',r:5,l:'A',dx:8});
  P.seg(0,0,M[0],M[1],{c:'var(--spark)',w:2}).seg(M[0],M[1],-p,M[1],{c:'var(--math)',w:2});
  P.dot(0,0,{r:5,c:'var(--ink)',l:'F',dy:16}).dot(-p,M[1],{r:4,c:'var(--math)',l:'H',dx:-16}).dot(M[0],M[1],{r:5,l:'M'});
  return {svg:P.svg(),MF:r,MH:M[0]+p};
}

COURS.push(

/* =============== 1. LES CONIQUES =============== */
{subj:'ga', sem:'con', id:'con-intro', h:'Les coniques', p:'Couper un cône par un plan, puis décrire la courbe obtenue par un foyer, une directrice et un seul nombre : l’excentricité.', steps:[
 {h:'Couper un cône',p:`Prends un <b>cône</b> de révolution à deux nappes et coupe-le par un plan qui ne passe pas par le sommet. La courbe obtenue s’appelle une <b>conique</b>. Selon l’inclinaison du plan, on obtient un cercle, une ellipse, une parabole ou une hyperbole. Incline le plan et tourne la vue.`,
  params:[{id:'al',l:'Inclinaison du plan α',min:0,max:90,step:5,v:20,u:'°'},azP],
  draw:v=>coneFig(v.al,v.az), info:v=>coneInfo(v.al),
  note:'Le plan est moins incliné que les génératrices : la courbe se referme (ellipse). Aussi incliné : elle s’ouvre à l’infini (parabole). Plus incliné : il coupe les deux nappes (hyperbole). Pour un cône de demi-angle β et un plan incliné de α, l’excentricité vaut <i>e</i> = sin α / cos β.'},
 {kind:'Pratique',h:'Obtiens une parabole',p:'Le cône a un demi-angle de 30°, donc ses génératrices font 60° avec l’horizontale. Règle l’inclinaison du plan pour que la section soit exactement une <b>parabole</b>.',
  params:[{id:'al',l:'Inclinaison du plan α',min:0,max:90,step:5,v:35,u:'°'},azP],
  draw:v=>coneFig(v.al,v.az), info:v=>coneInfo(v.al),
  ok:v=>v.al===60, why:'La section est une parabole quand le plan est parallèle à une génératrice : α = 90° − 30° = 60°. Alors <i>e</i> = sin 60° / cos 30° = 1.'},
 {h:'Un plan qui passe par le sommet',p:'Que devient la section si le plan passe par le <b>sommet</b> du cône et coupe ses deux nappes&nbsp;?',
  opts:['une hyperbole très fine','un cercle de rayon nul','deux droites sécantes','une parabole'],ans:2,
  why:'Le plan contient alors deux génératrices : la section est une paire de droites qui se coupent au sommet. C’est une <b>conique dégénérée</b>, comme le point seul (plan peu incliné) ou la droite double (plan tangent au cône).'},
 {h:'Foyer et directrice',p:`On peut décrire une conique sans cône. On fixe un point <i>F</i> (le <b>foyer</b>), une droite <i>D</i> (la <b>directrice</b>) et un nombre <i>e</i> &gt; 0 (l’<b>excentricité</b>). La conique est l’ensemble des points <i>M</i> tels que <div class="formula"><i>MF</i> = <i>e</i> · <i>MH</i></div> où <i>H</i> est le projeté orthogonal de <i>M</i> sur <i>D</i>. Change <i>e</i> et promène <i>M</i>.`,
  params:[{id:'e',l:'Excentricité e',min:.2,max:2,step:.1,v:.5},{id:'t',l:'Position de M',min:90,max:270,step:15,v:120,u:'°'}],
  draw:v=>fdFig(v.e,v.t).svg,
  info:v=>{ const r=fdFig(v.e,v.t); return `<i>MF</i> = ${fmt(r.MF)}, <i>MH</i> = ${fmt(r.MH)}, <i>MF</i> / <i>MH</i> = ${fmt(r.MF/r.MH)} = <i>e</i> → `+(Math.abs(v.e-1)<1e-9?'<b>parabole</b>':v.e<1?'<b>ellipse</b>':'<b>hyperbole</b>'); },
  note:'En coordonnées polaires de pôle <i>F</i>, avec la directrice à distance <i>p</i> de <i>F</i>, la conique s’écrit <i>r</i> = <i>ep</i> / (1 − <i>e</i> cos θ). C’est la forme utilisée pour les orbites.'},
 {h:'Lis l’excentricité',p:'Un point <i>M</i> d’une conique est à 6 cm de son foyer et à 4 cm de la directrice associée. Quelle est l’excentricité <i>e</i>&nbsp;?',
  lab:'e =', ans:1.5, tol:.001, why:'<i>e</i> = <i>MF</i> / <i>MH</i> = 6/4 = 1,5. Comme <i>e</i> &gt; 1, la conique est une hyperbole.'},
 {h:'Trois familles',p:`L’excentricité suffit à classer les coniques : <div class="formula"><i>e</i> &lt; 1 : ellipse · <i>e</i> = 1 : parabole · <i>e</i> &gt; 1 : hyperbole</div> Le cercle est le cas limite <i>e</i> = 0, avec une directrice rejetée à l’infini. La figure montre trois coniques de même foyer <i>F</i> et de même directrice <i>D</i>.`,
  fig:(()=>{ const P=plane({x:[-4,6],y:[-4,4],lab:2}); P.seg(-2,-5,-2,5,{c:'var(--muted)',w:2,dash:true}).text(-2,3.4,'D',{dx:6,c:'var(--muted)'});
    [[.5,'var(--accent)'],[1,'var(--ok)'],[2,'var(--spark)']].forEach(([e,c])=>implicit(P,(x,y)=>x*x+y*y-e*e*sq(x+2),[-4,6],[-4,4],{c},80));
    P.dot(0,0,{r:5,c:'var(--ink)',l:'F',dy:16}).text(1.5,.3,'e = 0,5',{c:'var(--accent)',s:11}).text(-1.6,-2.7,'e = 1',{c:'var(--ok)',s:11}).text(-1.6,-1.2,'e = 2',{c:'var(--spark)',s:11}); return P.svg(); })(),
  note:'Piège : l’excentricité ne mesure pas la taille de la courbe, seulement sa forme. Deux ellipses de même <i>e</i> sont semblables.'},
 {h:'Le sommet entre F et D',p:'Avec le foyer <i>F</i>, la directrice à distance <i>p</i> = 2 de <i>F</i> et <i>e</i> = 0,5, l’ellipse coupe le segment qui joint <i>F</i> à <i>D</i> en un sommet <i>S</i>. Quelle est la distance <i>SF</i>&nbsp;? Arrondis au centième.',
  lab:'SF =', ans:.67, tol:.006, why:'Si <i>SF</i> = <i>d</i>, alors <i>SH</i> = 2 − <i>d</i> et <i>d</i> = 0,5 (2 − <i>d</i>), donc 1,5<i>d</i> = 1 et <i>d</i> = 2/3 ≈ 0,67. C’est aussi <i>ep</i> / (1 + <i>e</i>).'},
 {kind:'Pratique',h:'Fais passer la conique par A',p:'Le foyer est <i>F</i>(0 ; 0) et la directrice est la droite <i>x</i> = −2. Règle l’excentricité pour que la conique passe par <i>A</i>(0 ; 3).',
  params:[{id:'e',l:'Excentricité e',min:.2,max:2,step:.1,v:.5},{id:'t',l:'Position de M',min:90,max:270,step:15,v:90,u:'°'}],
  draw:v=>fdFig(v.e,v.t,{A:1,c:Math.abs(v.e-1.5)<1e-9?'var(--ok)':'var(--accent)'}).svg,
  info:v=>`Pour <i>A</i> : <i>AF</i> = 3 et <i>AH</i> = 2, il faudrait <i>e</i> = <i>AF</i>/<i>AH</i>. Actuellement <i>e</i> = ${fmt(v.e)}.`,
  ok:v=>Math.abs(v.e-1.5)<1e-9, why:'<i>AF</i> = 3 et la distance de <i>A</i> à la droite <i>x</i> = −2 vaut 2. Il faut <i>e</i> = 3/2 = 1,5 : c’est une hyperbole.'},

 {kind:'Problème',h:'La tache d’une lampe torche',
  p:'Le faisceau d’une lampe torche est un cône de demi-angle β = 20°. Tu éclaires un mur plan. Si l’axe de la lampe fait un angle γ avec la perpendiculaire au mur, la tache lumineuse est la section du cône par un plan incliné de γ par rapport au plan perpendiculaire à l’axe. Son excentricité vaut alors <i>e</i> = sin γ / cos β. Le faisceau n’a qu’une nappe : celle qui part de la lampe.',
  parts:[
   {q:'a) Tu éclaires le mur de face (γ = 0°). Quelle est la forme de la tache&nbsp;?',opts:['une ellipse allongée','un cercle','une parabole','une hyperbole'],ans:1,hint:'Calcule <i>e</i> pour γ = 0°.',why:'sin 0° = 0 donc <i>e</i> = 0 : le plan du mur est perpendiculaire à l’axe, la tache est un cercle.'},
   {q:'b) Jusqu’à quel angle γ la tache reste-t-elle une courbe fermée (ellipse)&nbsp;?',lab:'γ =',unit:'°',ans:70,tol:.01,hint:'La tache s’ouvre quand le mur devient parallèle à un bord du faisceau, c’est-à-dire quand <i>e</i> = 1.',why:'<i>e</i> = 1 ⇔ sin γ = cos 20° = sin 70° ⇔ γ = 70°. En dessous, <i>e</i> &lt; 1 : ellipse.'},
   {q:'c) Quelle est l’excentricité de la tache pour γ = 40°&nbsp;? Arrondis au centième.',lab:'e =',ans:.68,tol:.006,hint:'Applique la formule avec sin 40° et cos 20°.',why:'<i>e</i> = sin 40° / cos 20° ≈ 0,6428 / 0,9397 ≈ 0,68 : une ellipse assez allongée.'},
   {q:'d) Pour γ = 80°, que voit-on sur le mur&nbsp;?',opts:['une ellipse très allongée','deux branches d’hyperbole','une seule branche d’hyperbole','une parabole'],ans:2,hint:'Compare <i>e</i> à 1, puis souviens-toi du nombre de nappes du faisceau.',why:'<i>e</i> = sin 80° / cos 20° ≈ 1,05 &gt; 1 : c’est une hyperbole. Mais le faisceau n’a qu’une nappe, donc une seule branche s’éclaire.'},
  ],
  sol:'La tache est la section du cône lumineux (demi-angle 20°) par le plan du mur, d’excentricité <i>e</i> = sin γ / cos 20°.<br>a) γ = 0° : <i>e</i> = 0, c’est un cercle.<br>b) La tache est une ellipse tant que <i>e</i> &lt; 1, soit sin γ &lt; cos 20° = sin 70°, donc γ &lt; 70°. À γ = 70°, le mur est parallèle à un bord du faisceau : parabole.<br>c) γ = 40° : <i>e</i> ≈ 0,6428 / 0,9397 ≈ 0,68.<br>d) γ = 80° : <i>e</i> ≈ 1,05 &gt; 1, hyperbole. Comme seule la nappe issue de la lampe est éclairée, on ne voit qu’une branche.'},
 {kind:'Problème',h:'Une ellipse définie par foyer et directrice',
  p:'Dans un repère orthonormé, on prend le foyer <i>F</i>(0 ; 0), la directrice <i>D</i> d’équation <i>x</i> = −4 et l’excentricité <i>e</i> = 1/2. La conique est l’ensemble des points <i>M</i>(<i>x</i> ; <i>y</i>) tels que <i>MF</i> = ½ <i>MH</i>. On veut retrouver ses éléments : sommets, grand axe, petit axe.',
  fig:(()=>{ const P=plane({x:[-5,5],y:[-3,3],lab:1}); P.seg(-4,-4,-4,4,{c:'var(--muted)',w:2,dash:true}).text(-4,2.4,'D',{dx:6,c:'var(--muted)'});
    implicit(P,(x,y)=>4*(x*x+y*y)-sq(x+4),[-5,5],[-3,3],{},80); P.dot(0,0,{r:5,c:'var(--ink)',l:'F',dy:16}); return P.svg(); })(),
  parts:[
   {q:'a) Quelle est l’abscisse du sommet situé à droite de <i>F</i>, sur l’axe des <i>x</i>&nbsp;?',lab:'x =',ans:4,tol:.001,hint:'Sur l’axe, avec <i>x</i> &gt; 0 : <i>MF</i> = <i>x</i> et <i>MH</i> = <i>x</i> + 4.',why:'<i>x</i> = ½ (<i>x</i> + 4) donne <i>x</i> = 4.'},
   {q:'b) Quelle est l’abscisse du sommet situé entre <i>D</i> et <i>F</i>&nbsp;? Arrondis au centième.',lab:'x =',ans:-4/3,tol:.006,hint:'Pour −4 &lt; <i>x</i> &lt; 0, on a <i>MF</i> = −<i>x</i>.',why:'−<i>x</i> = ½ (<i>x</i> + 4) donne −2<i>x</i> = <i>x</i> + 4, soit <i>x</i> = −4/3 ≈ −1,33.'},
   {q:'c) Quelle est la longueur 2<i>a</i> du grand axe&nbsp;? Arrondis au centième.',lab:'2a =',ans:16/3,tol:.006,hint:'C’est la distance entre les deux sommets trouvés.',why:'2<i>a</i> = 4 − (−4/3) = 16/3 ≈ 5,33, donc <i>a</i> = 8/3 et le centre est en <i>x</i> = 4/3.'},
   {q:'d) Quel est le demi-petit axe <i>b</i>&nbsp;? Arrondis au centième.',lab:'b =',ans:Math.sqrt(16/3),tol:.006,hint:'Élève au carré : 4(<i>x</i>² + <i>y</i>²) = (<i>x</i> + 4)², puis remplace <i>x</i> par l’abscisse du centre.',why:'L’équation devient 3<i>x</i>² − 8<i>x</i> + 4<i>y</i>² = 16. En <i>x</i> = 4/3 : 16/3 − 32/3 + 4<i>y</i>² = 16, donc <i>y</i>² = 16/3 et <i>b</i> = 4/√3 ≈ 2,31.'},
  ],
  sol:'<i>MF</i> = ½ <i>MH</i> s’écrit √(<i>x</i>² + <i>y</i>²) = ½ |<i>x</i> + 4|. En élevant au carré : 4<i>x</i>² + 4<i>y</i>² = <i>x</i>² + 8<i>x</i> + 16, soit 3<i>x</i>² − 8<i>x</i> + 4<i>y</i>² = 16.<br>Sur l’axe (<i>y</i> = 0) : 3<i>x</i>² − 8<i>x</i> − 16 = 0, de racines 4 et −4/3 : ce sont les sommets.<br>Le grand axe mesure 16/3, donc <i>a</i> = 8/3, et le centre est en <i>x</i> = 4/3.<br>En complétant le carré : 3(<i>x</i> − 4/3)² + 4<i>y</i>² = 64/3, soit (<i>x</i> − 4/3)² / (64/9) + <i>y</i>² / (16/3) = 1. Donc <i>b</i> = √(16/3) ≈ 2,31.<br>Contrôle : <i>c</i> = 4/3 (distance du centre au foyer) et <i>c</i> / <i>a</i> = (4/3)/(8/3) = 1/2 = <i>e</i>.'},
]},

/* =============== 2. L’ELLIPSE =============== */
{subj:'ga', sem:'con', id:'con-ellipse', h:'L’ellipse', p:'La courbe du jardinier : deux foyers, une ficelle, une équation réduite, et les orbites des planètes.', steps:[
 {h:'La méthode du jardinier',p:`Plante deux piquets <i>F</i> et <i>F′</i>, attache une ficelle de longueur 2<i>a</i> et tends-la avec un crayon. Le crayon trace une <b>ellipse</b> : <div class="formula"><i>MF</i> + <i>MF′</i> = 2<i>a</i></div> Les points <i>F</i> et <i>F′</i> sont les <b>foyers</b>, et la distance <i>FF′</i> = 2<i>c</i> doit être plus petite que 2<i>a</i>. Ici 2<i>a</i> = 8.`,
  params:[{id:'c',l:'Demi-distance focale c',min:0,max:3.5,step:.5,v:2.5},{id:'t',l:'Position de M',min:0,max:345,step:15,v:60,u:'°'}],
  draw:v=>{ const a=4, b=Math.sqrt(16-v.c*v.c), P=plane({x:[-5,5],y:[-4,4],lab:1}), M=[a*Math.cos(rad(v.t)),b*Math.sin(rad(v.t))];
    ell(P,a,b); P.seg(-v.c,0,M[0],M[1],{c:'var(--spark)',w:2}).seg(v.c,0,M[0],M[1],{c:'var(--math)',w:2});
    P.dot(-v.c,0,{r:5,c:'var(--ink)',l:'F′',dx:-8,dy:16}).dot(v.c,0,{r:5,c:'var(--ink)',l:'F',dy:16}).dot(M[0],M[1],{l:'M'}); return P.svg(); },
  info:v=>{ const b=Math.sqrt(16-v.c*v.c), M=[4*Math.cos(rad(v.t)),b*Math.sin(rad(v.t))], d1=Math.hypot(M[0]-v.c,M[1]), d2=Math.hypot(M[0]+v.c,M[1]);
    return `<i>MF</i> = ${fmt(d1)}, <i>MF′</i> = ${fmt(d2)}, somme = <b>${fmt(d1+d2)}</b> · <i>b</i> = √(16 − ${fmt(v.c*v.c)}) = ${fmt(b)}${v.c===0?' : les foyers sont confondus, c’est un cercle':''}`; },
  note:'Plus les foyers sont proches, plus l’ellipse est ronde. Quand <i>c</i> = 0, on obtient un cercle de rayon <i>a</i>.'},
 {h:'La largeur du massif',p:'Un jardinier plante deux piquets à 6 m l’un de l’autre et utilise une ficelle de 10 m (2<i>a</i> = 10). Quelle est la largeur 2<i>b</i> du massif, mesurée perpendiculairement à la droite des piquets&nbsp;?',
  lab:'2b =', unit:'m', ans:8, tol:.001, why:'Au sommet du petit axe, <i>MF</i> = <i>MF′</i> = <i>a</i> = 5 et la demi-distance focale vaut <i>c</i> = 3. Pythagore : <i>b</i> = √(25 − 9) = 4, donc 2<i>b</i> = 8 m.'},
 {h:'L’équation réduite',p:`Avec les foyers sur l’axe des <i>x</i> en (±<i>c</i> ; 0), l’ellipse a pour équation <div class="formula">${F('<i>x</i>²','<i>a</i>²')} + ${F('<i>y</i>²','<i>b</i>²')} = 1, &nbsp; <i>c</i>² = <i>a</i>² − <i>b</i>²</div> <i>a</i> est le <b>demi-grand axe</b>, <i>b</i> le <b>demi-petit axe</b>, et l’excentricité vaut <i>e</i> = <i>c</i>/<i>a</i>. Si <i>b</i> &gt; <i>a</i>, les rôles s’échangent et les foyers passent sur l’axe des <i>y</i>.`,
  params:[{id:'a',l:'a',min:1,max:5,step:.5,v:4},{id:'b',l:'b',min:1,max:5,step:.5,v:2.5}],
  draw:v=>{ const P=plane({x:[-6,6],y:[-6,6],lab:2}), c=Math.sqrt(Math.abs(v.a*v.a-v.b*v.b)); ell(P,v.a,v.b);
    P.seg(0,0,v.a,0,{c:'var(--spark)',w:2}).seg(0,0,0,v.b,{c:'var(--math)',w:2});
    if(v.a>=v.b) P.dot(c,0,{r:5,c:'var(--ink)',l:'F',dy:16}).dot(-c,0,{r:5,c:'var(--ink)',l:'F′',dy:16}); else P.dot(0,c,{r:5,c:'var(--ink)',l:'F',dx:9}).dot(0,-c,{r:5,c:'var(--ink)',l:'F′',dx:9});
    return P.svg(); },
  info:v=>{ const A=Math.max(v.a,v.b), Bb=Math.min(v.a,v.b), c=Math.sqrt(A*A-Bb*Bb);
    return `<i>c</i> = √(${fmt(A*A)} − ${fmt(Bb*Bb)}) = ${fmt(c)} · <i>e</i> = <i>c</i>/${fmt(A)} = <b>${fmt(c/A)}</b> · foyers sur l’axe des ${v.a>=v.b?'<i>x</i>':'<i>y</i>'}${c===0?' (cercle)':''}`; }},
 {h:'Calcule l’excentricité',p:'Quelle est l’excentricité de l’ellipse <i>x</i>²/25 + <i>y</i>²/9 = 1&nbsp;?',
  lab:'e =', ans:.8, tol:.001, why:'<i>a</i> = 5, <i>b</i> = 3, <i>c</i> = √(25 − 9) = 4, donc <i>e</i> = 4/5 = 0,8. Les foyers sont en (±4 ; 0).'},
 {kind:'Pratique',h:'Passe par les deux points',p:'Règle <i>a</i> et <i>b</i> pour que l’ellipse <i>x</i>²/<i>a</i>² + <i>y</i>²/<i>b</i>² = 1 passe par <i>A</i>(3 ; 2,4) et <i>B</i>(4 ; 1,8).',
  params:[{id:'a',l:'a',min:1,max:6,step:.5,v:3},{id:'b',l:'b',min:1,max:6,step:.5,v:2}],
  draw:v=>{ const P=plane({x:[-7,7],y:[-5,5],lab:2}), good=v.a===5&&v.b===3; ell(P,v.a,v.b,{c:good?'var(--ok)':'var(--accent)'}); P.dot(3,2.4,{l:'A',c:'var(--spark)'}).dot(4,1.8,{l:'B',c:'var(--spark)'}); return P.svg(); },
  info:v=>`Pour <i>A</i> : 9/<i>a</i>² + 5,76/<i>b</i>² = ${fmt(9/v.a/v.a+5.76/v.b/v.b,3)} · pour <i>B</i> : 16/<i>a</i>² + 3,24/<i>b</i>² = ${fmt(16/v.a/v.a+3.24/v.b/v.b,3)}`,
  ok:v=>v.a===5&&v.b===3, why:'Pose <i>u</i> = 1/<i>a</i>² et <i>w</i> = 1/<i>b</i>² : 9<i>u</i> + 5,76<i>w</i> = 1 et 16<i>u</i> + 3,24<i>w</i> = 1. Ce système linéaire donne <i>u</i> = 1/25 et <i>w</i> = 1/9, donc <i>a</i> = 5 et <i>b</i> = 3.'},
 {h:'Paramétrer l’ellipse',p:`Comme cos² <i>t</i> + sin² <i>t</i> = 1, le point <div class="formula"><i>M</i>(<i>t</i>) = (<i>a</i> cos <i>t</i> ; <i>b</i> sin <i>t</i>), <i>t</i> ∈ [0 ; 2π[</div> parcourt toute l’ellipse. Construction : sur la demi-droite d’angle <i>t</i>, prends l’abscisse du point du grand cercle (rayon <i>a</i>) et l’ordonnée du point du petit cercle (rayon <i>b</i>).`,
  params:[{id:'t',l:'Paramètre t',min:0,max:345,step:15,v:45,u:'°'}],
  draw:v=>{ const a=4, b=2.5, t=rad(v.t), P=plane({x:[-5,5],y:[-4.5,4.5],lab:1}), c=Math.cos(t), s=Math.sin(t);
    P.circ(0,0,a,{c:'var(--line)',w:1.5}).circ(0,0,b,{c:'var(--line)',w:1.5}); ell(P,a,b);
    P.seg(0,0,a*c,a*s,{c:'var(--muted)',w:1.5}).seg(a*c,a*s,a*c,b*s,{c:'var(--math)',w:1.5,dash:true}).seg(b*c,b*s,a*c,b*s,{c:'var(--spark)',w:1.5,dash:true});
    P.dot(a*c,a*s,{r:4,c:'var(--math)'}).dot(b*c,b*s,{r:4,c:'var(--spark)'}).dot(a*c,b*s,{l:'M'}); return P.svg(); },
  info:v=>`<i>a</i> = 4, <i>b</i> = 2,5 → <i>M</i> = (4 cos ${v.t}° ; 2,5 sin ${v.t}°) = ${pt(4*Math.cos(rad(v.t)),2.5*Math.sin(rad(v.t)))}`,
  note:'Attention : <i>t</i> n’est pas l’angle polaire de <i>M</i> (sauf si <i>a</i> = <i>b</i>). On l’appelle l’<b>anomalie excentrique</b>.'},
 {h:'Choisis la paramétrisation',p:'Laquelle de ces courbes paramétrées décrit l’ellipse <i>x</i>²/9 + <i>y</i>²/4 = 1&nbsp;?',
  opts:['(9 cos <i>t</i> ; 4 sin <i>t</i>)','(2 cos <i>t</i> ; 3 sin <i>t</i>)','(3 cos <i>t</i> ; 2 sin <i>t</i>)','(3 cos <i>t</i> ; 3 sin <i>t</i>)'],ans:2,
  why:'Il faut <i>a</i> = √9 = 3 en <i>x</i> et <i>b</i> = √4 = 2 en <i>y</i> : (3 cos <i>t</i>)²/9 + (2 sin <i>t</i>)²/4 = cos² <i>t</i> + sin² <i>t</i> = 1.'},
 {h:'La tangente',p:`La tangente à l’ellipse en <i>M</i>₀(<i>x</i>₀ ; <i>y</i>₀) s’obtient en « dédoublant » l’équation : <div class="formula">${F('<i>x x</i>₀','<i>a</i>²')} + ${F('<i>y y</i>₀','<i>b</i>²')} = 1</div> Pour l’ellipse <i>x</i>²/16 + <i>y</i>²/4 = 1 et le point <i>M</i>₀(2 ; √3), en quelle ordonnée la tangente coupe-t-elle l’axe des <i>y</i>&nbsp;? Arrondis au centième.`,
  lab:'y =', ans:4/Math.sqrt(3), tol:.006, why:'La tangente est 2<i>x</i>/16 + √3 <i>y</i>/4 = 1. En <i>x</i> = 0 : <i>y</i> = 4/√3 ≈ 2,31. Vérifie d’abord que <i>M</i>₀ est sur l’ellipse : 4/16 + 3/4 = 1.'},
 {h:'La propriété de réflexion',p:'En tout point <i>M</i> de l’ellipse, la tangente fait le même angle avec (<i>MF</i>) et avec (<i>MF′</i>). Un rayon issu de <i>F</i> se réfléchit donc sur l’ellipse et passe par <i>F′</i>. Promène <i>M</i> : la normale (en pointillé) est la bissectrice de l’angle <i>FMF′</i>.',
  params:[{id:'t',l:'Position de M',min:0,max:345,step:15,v:60,u:'°'}],
  draw:v=>{ const a=5, b=3, c=4, t=rad(v.t), x0=a*Math.cos(t), y0=b*Math.sin(t), P=plane({x:[-6,6],y:[-4,4],grid:false});
    ell(P,a,b,{c:'var(--muted)',w:2}); line2(P,x0/(a*a),y0/(b*b),-1,{c:'var(--sci)',w:2});
    const nx=x0/(a*a), ny=y0/(b*b), nn=Math.hypot(nx,ny); P.seg(x0,y0,x0-1.6*nx/nn,y0-1.6*ny/nn,{c:'var(--muted)',w:1.5,dash:true});
    P.arrow(c,0,x0,y0,{c:'var(--spark)',w:2.5,hs:9}).arrow(x0,y0,-c,0,{c:'var(--accent)',w:2.5,hs:9});
    P.dot(c,0,{r:5,c:'var(--ink)',l:'F',dy:16}).dot(-c,0,{r:5,c:'var(--ink)',l:'F′',dy:16}).dot(x0,y0,{l:'M'}); return P.svg(); },
  info:v=>{ const t=rad(v.t), x0=5*Math.cos(t), y0=3*Math.sin(t), n=[x0/25,y0/9], u1=[4-x0,-y0], u2=[-4-x0,-y0], ang=u=>Math.acos(Math.max(-1,Math.min(1,(u[0]*n[0]+u[1]*n[1])/Math.hypot(...u)/Math.hypot(...n))))*180/Math.PI;
    return `Angle entre la normale et <i>MF</i> : ${fmt(180-ang(u1),1)}° · entre la normale et <i>MF′</i> : ${fmt(180-ang(u2),1)}°`; },
  note:'Les <b>orbites</b> des planètes sont des ellipses dont le Soleil occupe un foyer (Kepler). La distance minimale au Soleil (périhélie) vaut <i>a</i> − <i>c</i> = <i>a</i>(1 − <i>e</i>), la distance maximale (aphélie) vaut <i>a</i> + <i>c</i> = <i>a</i>(1 + <i>e</i>).'},
 {h:'Le périhélie de la Terre',p:'L’orbite de la Terre a un demi-grand axe <i>a</i> = 149,6 millions de km et une excentricité <i>e</i> = 0,0167. À quelle distance minimale du Soleil passe la Terre&nbsp;? Réponds en millions de km, arrondi au dixième.',
  lab:'d =', unit:'millions de km', ans:147.1, tol:.06, why:'Périhélie = <i>a</i>(1 − <i>e</i>) = 149,6 × 0,9833 ≈ 147,1 millions de km. L’aphélie vaut 149,6 × 1,0167 ≈ 152,1 millions de km.'},

 {kind:'Problème',h:'La comète de Halley',
  p:'L’orbite de la comète de Halley est une ellipse de demi-grand axe <i>a</i> = 17,8 UA et d’excentricité <i>e</i> = 0,967, avec le Soleil à un foyer (1 UA est la distance moyenne Terre-Soleil). La troisième loi de Kepler dit que, mesurée en années, la période vérifie <i>T</i>² = <i>a</i>³ quand <i>a</i> est en UA.',
  fig:(()=>{ const a=17.8, e=.967, c=a*e, b=a*Math.sqrt(1-e*e), P=plane({x:[-37,3],y:[-6,6],grid:false}); ell(P,a,b,{},-c,0); P.circ(0,0,1,{c:'var(--sci)',w:1.5,dash:true}); P.dot(0,0,{r:6,c:'var(--spark)',l:'Soleil',dx:-50,dy:18}); return P.svg(); })(),
  parts:[
   {q:'a) À quelle distance minimale du Soleil passe la comète&nbsp;? Arrondis au millième.',lab:'d =',unit:'UA',ans:.587,tol:.0006,hint:'Le Soleil est à un foyer : le sommet le plus proche est à <i>a</i> − <i>c</i>.',why:'<i>c</i> = <i>ae</i> = 17,2126 UA, donc <i>a</i> − <i>c</i> = <i>a</i>(1 − <i>e</i>) = 17,8 × 0,033 ≈ 0,587 UA : plus près du Soleil que Vénus.'},
   {q:'b) Et à quelle distance maximale&nbsp;? Arrondis au dixième.',lab:'d =',unit:'UA',ans:35,tol:.06,hint:'Le sommet opposé est à <i>a</i> + <i>c</i>.',why:'<i>a</i>(1 + <i>e</i>) = 17,8 × 1,967 ≈ 35,0 UA, au-delà de Neptune.'},
   {q:'c) Quel est le demi-petit axe <i>b</i>&nbsp;? Arrondis au centième.',lab:'b =',unit:'UA',ans:4.535,tol:.006,hint:'<i>b</i>² = <i>a</i>² − <i>c</i>² = <i>a</i>²(1 − <i>e</i>²).',why:'<i>b</i> = 17,8 √(1 − 0,967²) = 17,8 √0,064911 ≈ 4,54 UA. L’orbite est quatre fois plus longue que large.'},
   {q:'d) Quelle est la période de la comète&nbsp;? Arrondis au dixième.',lab:'T =',unit:'ans',ans:75.1,tol:.06,hint:'<i>T</i> = <i>a</i><sup>3/2</sup> = <i>a</i> √<i>a</i>.',why:'<i>T</i> = 17,8 × √17,8 ≈ 17,8 × 4,219 ≈ 75,1 ans.'},
  ],
  sol:'Le Soleil occupe un foyer, à la distance <i>c</i> = <i>ae</i> ≈ 17,21 UA du centre.<br>Périhélie : <i>a</i> − <i>c</i> = <i>a</i>(1 − <i>e</i>) ≈ 0,587 UA. Aphélie : <i>a</i> + <i>c</i> = <i>a</i>(1 + <i>e</i>) ≈ 35,0 UA.<br>Demi-petit axe : <i>b</i> = <i>a</i>√(1 − <i>e</i>²) ≈ 4,54 UA.<br>Période : <i>T</i> = <i>a</i><sup>3/2</sup> ≈ 75,1 ans, ce qui correspond bien au retour de la comète tous les 75 à 76 ans.<br>Contrôle : périhélie + aphélie = 2<i>a</i> = 35,6 UA.'},
 {kind:'Problème',h:'La galerie des murmures',
  p:'Une salle a la forme d’une ellipse de 40 m de long et 24 m de large. Une personne chuchote en un foyer <i>F</i>. Le son part dans toutes les directions, se réfléchit sur le mur et, grâce à la propriété de réflexion, se concentre à l’autre foyer <i>F′</i>. On prend le repère centré, grand axe sur l’axe des <i>x</i>, <i>F′</i>(<i>c</i> ; 0) à droite, et la vitesse du son égale à 340 m/s.',
  params:[{id:'t',l:'Point du mur visé',min:0,max:345,step:15,v:75,u:'°'}],
  draw:v=>{ const a=20, b=12, c=16, t=rad(v.t), M=[a*Math.cos(t),b*Math.sin(t)], P=plane({x:[-22,22],y:[-14,14],grid:false});
    ell(P,a,b,{c:'var(--muted)',w:3}); P.arrow(-c,0,M[0],M[1],{c:'var(--spark)',w:2,hs:8}).arrow(M[0],M[1],c,0,{c:'var(--accent)',w:2,hs:8});
    P.dot(-c,0,{r:5,c:'var(--ink)',l:'F',dy:16}).dot(c,0,{r:5,c:'var(--ink)',l:'F′',dy:16}).dot(M[0],M[1],{r:4}); return P.svg(); },
  info:v=>{ const t=rad(v.t), M=[20*Math.cos(t),12*Math.sin(t)]; return `Trajet <i>F</i> → mur → <i>F′</i> : ${fmt(Math.hypot(M[0]+16,M[1]))} + ${fmt(Math.hypot(M[0]-16,M[1]))} m`; },
  parts:[
   {q:'a) Quelle est la distance entre les deux foyers&nbsp;?',lab:'FF′ =',unit:'m',ans:32,tol:.001,hint:'<i>a</i> = 20, <i>b</i> = 12 et <i>c</i>² = <i>a</i>² − <i>b</i>².',why:'<i>c</i> = √(400 − 144) = 16, donc <i>FF′</i> = 2<i>c</i> = 32 m.'},
   {q:'b) Pourquoi tous les sons réfléchis arrivent-ils en même temps en <i>F′</i>&nbsp;?',opts:['Parce que le mur est également éloigné de F en tout point','Parce que MF + MF′ = 2a pour tout point M du mur','Parce que la tangente est perpendiculaire à (MF)','Parce que le son va plus vite près des foyers'],ans:1,hint:'Compare la longueur du trajet <i>F</i> → <i>M</i> → <i>F′</i> pour deux points <i>M</i> différents.',why:'Chaque trajet <i>F</i> → <i>M</i> → <i>F′</i> a la même longueur <i>MF</i> + <i>MF′</i> = 2<i>a</i> = 40 m, donc la même durée.'},
   {q:'c) Combien de temps met le son réfléchi pour aller de <i>F</i> à <i>F′</i>&nbsp;? Réponds en millisecondes, arrondi au dixième.',lab:'durée =',unit:'ms',ans:117.6,tol:.06,hint:'La distance parcourue est 2<i>a</i>.',why:'40 / 340 ≈ 0,1176 s, soit environ 117,6 ms. Le son direct (32 m) arrive environ 23,5 ms plus tôt.'},
   {q:'d) Un point <i>M</i> du mur est situé juste au-dessus de <i>F′</i>. Quelle est la distance <i>MF</i>&nbsp;?',lab:'MF =',unit:'m',ans:32.8,tol:.01,hint:'Calcule d’abord l’ordonnée de <i>M</i> avec <i>x</i> = 16 dans l’équation, puis utilise <i>MF</i> + <i>MF′</i> = 2<i>a</i>.',why:'<i>y</i>² = 144(1 − 256/400) = 51,84, donc <i>MF′</i> = 7,2 m. Alors <i>MF</i> = 40 − 7,2 = 32,8 m (ou √(32² + 7,2²) = 32,8).'},
  ],
  sol:'Équation de la salle : <i>x</i>²/400 + <i>y</i>²/144 = 1, d’où <i>c</i> = √(400 − 144) = 16 et <i>FF′</i> = 32 m.<br>Pour tout point <i>M</i> du mur, <i>MF</i> + <i>MF′</i> = 2<i>a</i> = 40 m : tous les trajets réfléchis ont la même longueur, et la propriété de réflexion les envoie tous vers <i>F′</i>. Ils arrivent ensemble, ce qui renforce le son.<br>Durée : 40/340 ≈ 0,1176 s ≈ 117,6 ms.<br>Pour <i>M</i>(16 ; <i>y</i>) : <i>y</i>² = 144 × 0,36 = 51,84, <i>y</i> = 7,2. <i>MF′</i> = 7,2 m = <i>b</i>²/<i>a</i>, et <i>MF</i> = 40 − 7,2 = 32,8 m, ce que confirme Pythagore : √(32² + 7,2²) = √1075,84 = 32,8.'},
]},

/* =============== 3. L’HYPERBOLE =============== */
{subj:'ga', sem:'con', id:'con-hyperbole', h:'L’hyperbole', p:'Deux branches, deux foyers, une différence de distances constante, et des asymptotes qui guident la courbe.', steps:[
 {h:'Une différence constante',p:`L’<b>hyperbole</b> de foyers <i>F</i> et <i>F′</i> est l’ensemble des points <i>M</i> tels que <div class="formula">|<i>MF</i> − <i>MF′</i>| = 2<i>a</i></div> avec 0 &lt; 2<i>a</i> &lt; <i>FF′</i> = 2<i>c</i>. Elle a deux <b>branches</b> : sur l’une <i>M</i> est plus proche de <i>F</i>, sur l’autre de <i>F′</i>. Ici <i>c</i> = 5.`,
  params:[{id:'a',l:'a',min:1,max:4.5,step:.5,v:3},{id:'t',l:'Position de M',min:-2,max:2,step:.25,v:.75}],
  draw:v=>{ const c=5, b=Math.sqrt(c*c-v.a*v.a), P=plane({x:[-8,8],y:[-6,6],lab:2}), M=[v.a*ch(v.t),b*sh(v.t)];
    hyp(P,v.a,b); P.seg(c,0,M[0],M[1],{c:'var(--math)',w:2}).seg(-c,0,M[0],M[1],{c:'var(--spark)',w:2});
    P.dot(c,0,{r:5,c:'var(--ink)',l:'F',dy:16}).dot(-c,0,{r:5,c:'var(--ink)',l:'F′',dy:16}).dot(M[0],M[1],{l:'M'}); return P.svg(); },
  info:v=>{ const c=5, b=Math.sqrt(c*c-v.a*v.a), M=[v.a*ch(v.t),b*sh(v.t)], d1=Math.hypot(M[0]-c,M[1]), d2=Math.hypot(M[0]+c,M[1]);
    return `<i>MF′</i> = ${fmt(d2)}, <i>MF</i> = ${fmt(d1)}, différence = <b>${fmt(d2-d1)}</b> = 2<i>a</i>`; }},
 {h:'L’équation réduite',p:`Avec les foyers en (±<i>c</i> ; 0), l’hyperbole a pour équation <div class="formula">${F('<i>x</i>²','<i>a</i>²')} − ${F('<i>y</i>²','<i>b</i>²')} = 1, &nbsp; <i>c</i>² = <i>a</i>² + <i>b</i>²</div> Les <b>sommets</b> sont (±<i>a</i> ; 0) et l’excentricité <i>e</i> = <i>c</i>/<i>a</i> est plus grande que 1. Attention au signe : c’est <i>a</i>² + <i>b</i>², pas <i>a</i>² − <i>b</i>² comme pour l’ellipse.`,
  fig:(()=>{ const P=plane({x:[-8,8],y:[-6,6],lab:2}); hyp(P,3,4); P.dot(5,0,{r:5,c:'var(--ink)',l:'F',dy:16}).dot(-5,0,{r:5,c:'var(--ink)',l:'F′',dy:16}).dot(3,0,{r:4,c:'var(--spark)'}).dot(-3,0,{r:4,c:'var(--spark)'}); P.text(2,4.8,'x²/9 − y²/16 = 1',{s:11}); return P.svg(); })()},
 {h:'Calcule l’excentricité',p:'Quelle est l’excentricité de l’hyperbole <i>x</i>²/9 − <i>y</i>²/16 = 1 de la figure&nbsp;? Arrondis au centième.',
  lab:'e =', ans:5/3, tol:.006, why:'<i>c</i> = √(9 + 16) = 5 et <i>a</i> = 3, donc <i>e</i> = 5/3 ≈ 1,67.'},
 {h:'Les asymptotes',p:`Loin de l’origine, l’hyperbole se rapproche de deux droites, ses <b>asymptotes</b> : <div class="formula"><i>y</i> = ± ${F('<i>b</i>','<i>a</i>')} <i>x</i></div> Elles sont les diagonales du rectangle de côtés 2<i>a</i> et 2<i>b</i> centré à l’origine. On les obtient en remplaçant le 1 de l’équation par 0.`,
  params:[{id:'a',l:'a',min:1,max:5,step:.5,v:2},{id:'b',l:'b',min:1,max:5,step:.5,v:3}],
  draw:v=>{ const P=plane({x:[-8,8],y:[-8,8],lab:2}); P.rect(-v.a,-v.b,2*v.a,2*v.b,{c:'var(--muted)',w:1.5,dash:true});
    line2(P,v.b,-v.a,0,{c:'var(--sci)',w:2}); line2(P,v.b,v.a,0,{c:'var(--sci)',w:2}); hyp(P,v.a,v.b); return P.svg(); },
  info:v=>`Asymptotes <i>y</i> = ±${fmt(v.b/v.a)}<i>x</i> · <i>c</i> = √(${fmt(v.a*v.a)} + ${fmt(v.b*v.b)}) = ${fmt(Math.hypot(v.a,v.b))} · <i>e</i> = ${fmt(Math.hypot(v.a,v.b)/v.a)}`},
 {h:'Trouve les asymptotes',p:'Quelles sont les asymptotes de l’hyperbole <i>x</i>²/4 − <i>y</i>²/9 = 1&nbsp;?',
  opts:['<i>y</i> = ±(2/3)<i>x</i>','<i>y</i> = ±(4/9)<i>x</i>','<i>y</i> = ±(9/4)<i>x</i>','<i>y</i> = ±(3/2)<i>x</i>'],ans:3,
  why:'<i>a</i> = 2 et <i>b</i> = 3, donc <i>y</i> = ±(<i>b</i>/<i>a</i>)<i>x</i> = ±(3/2)<i>x</i>. On peut aussi factoriser <i>x</i>²/4 − <i>y</i>²/9 = 0 en (<i>x</i>/2 − <i>y</i>/3)(<i>x</i>/2 + <i>y</i>/3) = 0.'},
 {kind:'Pratique',h:'Construis l’hyperbole',p:'Règle <i>a</i> et <i>b</i> pour obtenir l’hyperbole de sommet <i>S</i>(3 ; 0) dont les asymptotes sont <i>y</i> = ±2<i>x</i> (en pointillé).',
  params:[{id:'a',l:'a',min:1,max:6,step:.5,v:2},{id:'b',l:'b',min:1,max:8,step:.5,v:2}],
  draw:v=>{ const P=plane({x:[-9,9],y:[-9,9],lab:3}), good=v.a===3&&v.b===6; line2(P,2,-1,0,{c:'var(--muted)',w:1.5,dash:true}); line2(P,2,1,0,{c:'var(--muted)',w:1.5,dash:true});
    hyp(P,v.a,v.b,{c:good?'var(--ok)':'var(--accent)'}); P.dot(3,0,{l:'S',c:'var(--spark)'}); return P.svg(); },
  info:v=>`Sommet (${fmt(v.a)} ; 0) · asymptotes <i>y</i> = ±${fmt(v.b/v.a)}<i>x</i>`,
  ok:v=>v.a===3&&v.b===6, why:'Le sommet donne <i>a</i> = 3 et la pente des asymptotes donne <i>b</i>/<i>a</i> = 2, donc <i>b</i> = 6 : <i>x</i>²/9 − <i>y</i>²/36 = 1.'},
 {h:'Paramétrer avec ch et sh',p:`Le cosinus et le sinus hyperboliques vérifient ch² <i>t</i> − sh² <i>t</i> = 1. Donc <div class="formula"><i>M</i>(<i>t</i>) = (<i>a</i> ch <i>t</i> ; <i>b</i> sh <i>t</i>), <i>t</i> ∈ ℝ</div> parcourt la branche de droite (ch <i>t</i> ≥ 1). La branche de gauche est (−<i>a</i> ch <i>t</i> ; <i>b</i> sh <i>t</i>).`,
  params:[{id:'t',l:'Paramètre t',min:-2,max:2,step:.25,v:.5}],
  draw:v=>{ const a=2, b=1.5, P=plane({x:[-8,8],y:[-6,6],lab:2}); line2(P,b,-a,0,{c:'var(--line)',w:1.5,dash:true}); line2(P,b,a,0,{c:'var(--line)',w:1.5,dash:true});
    hyp(P,a,b,{c:'var(--muted)',w:2}); P.curve(t=>a*ch(t),t=>b*sh(t),Math.min(0,v.t),Math.max(0,v.t),{c:'var(--accent)',w:4}); P.dot(a*ch(v.t),b*sh(v.t),{l:'M'}).dot(a,0,{r:4,c:'var(--ink)'}); return P.svg(); },
  info:v=>`<i>a</i> = 2, <i>b</i> = 1,5 · ch <i>t</i> = ${fmt(ch(v.t),3)}, sh <i>t</i> = ${fmt(sh(v.t),3)}, ch² − sh² = ${fmt(sq(ch(v.t))-sq(sh(v.t)),3)} · <i>M</i> = ${pt(2*ch(v.t),1.5*sh(v.t))}`,
  note:'Le nom « cosinus hyperbolique » vient de là : (cos <i>t</i> ; sin <i>t</i>) parcourt le cercle <i>x</i>² + <i>y</i>² = 1, (ch <i>t</i> ; sh <i>t</i>) parcourt l’hyperbole <i>x</i>² − <i>y</i>² = 1.'},
 {h:'L’hyperbole équilatère',p:`Quand <i>a</i> = <i>b</i>, les asymptotes sont perpendiculaires : l’hyperbole est <b>équilatère</b>. Tournée de 45°, elle prend la forme <div class="formula"><i>xy</i> = <i>k</i></div> avec les axes de coordonnées pour asymptotes. C’est le graphe de <i>x</i> ↦ <i>k</i>/<i>x</i>. Pour <i>k</i> &gt; 0, ses sommets sont (±√<i>k</i> ; ±√<i>k</i>) et ses foyers (±√(2<i>k</i>) ; ±√(2<i>k</i>)).`,
  params:[{id:'k',l:'k',min:-6,max:8,step:1,v:2}],
  draw:v=>{ const P=plane({x:[-6,6],y:[-6,6],lab:2});
    if(v.k===0){ P.seg(-6,0,6,0,{w:4}).seg(0,-6,0,6,{w:4}); return P.svg(); }
    P.fn(x=>v.k/x,{from:-6,to:-.05}).fn(x=>v.k/x,{from:.05,to:6}); const s=Math.sqrt(Math.abs(v.k)), f=Math.sqrt(2*Math.abs(v.k)), g=Math.sign(v.k);
    P.dot(s,g*s,{r:4,c:'var(--spark)'}).dot(-s,-g*s,{r:4,c:'var(--spark)'}).dot(f,g*f,{r:5,c:'var(--ink)',l:'F'}).dot(-f,-g*f,{r:5,c:'var(--ink)',l:'F′'}); return P.svg(); },
  info:v=>v.k===0?'<i>xy</i> = 0 : les deux axes, une conique <b>dégénérée</b>.':`Sommets (±${fmt(Math.sqrt(Math.abs(v.k)))} ; ${v.k>0?'±':'∓'}${fmt(Math.sqrt(Math.abs(v.k)))}) · foyers à distance ${fmt(2*Math.sqrt(Math.abs(v.k)))} de l’origine · <i>e</i> = √2`},
 {h:'Le foyer de xy = 8',p:'Quelle est l’abscisse du foyer de l’hyperbole <i>xy</i> = 8 situé dans le quart de plan <i>x</i> &gt; 0, <i>y</i> &gt; 0&nbsp;?',
  lab:'x =', ans:4, tol:.001, why:'Dans le repère tourné de 45°, <i>xy</i> = 8 devient <i>X</i>² − <i>Y</i>² = 16 : <i>a</i> = <i>b</i> = 4, <i>c</i> = 4√2. Le foyer est sur la droite <i>y</i> = <i>x</i> à distance 4√2 de l’origine, soit (4 ; 4).'},
 {h:'Excentricité équilatère',p:'Quelle est l’excentricité de toute hyperbole équilatère&nbsp;?',
  opts:['1','2','√2','elle dépend de <i>k</i>'],ans:2,
  why:'Avec <i>a</i> = <i>b</i> : <i>c</i> = √(<i>a</i>² + <i>a</i>²) = <i>a</i>√2, donc <i>e</i> = <i>c</i>/<i>a</i> = √2 ≈ 1,41, quelle que soit la taille.'},

 {kind:'Problème',h:'Se repérer avec deux émetteurs',
  p:'Deux émetteurs radio <i>F′</i>(−5 ; 0) et <i>F</i>(5 ; 0) (en km) envoient un signal au même instant. Un bateau <i>M</i> reçoit le signal de <i>F</i> en premier, puis celui de <i>F′</i>. L’écart des temps de réception montre que <i>MF′</i> − <i>MF</i> = 6 km. Le bateau est donc sur une branche d’hyperbole. On sait de plus qu’il navigue à 4 km au nord de l’axe des émetteurs (<i>y</i> = 4).',
  fig:(()=>{ const P=plane({x:[-8,8],y:[-5,6],lab:2}); hyp(P,3,4,{c:'var(--line)',w:2}); P.curve(t=>3*ch(t),t=>4*sh(t),-2,2); P.seg(-8,4,8,4,{c:'var(--sci)',w:1.5,dash:true});
    P.dot(5,0,{r:5,c:'var(--ink)',l:'F',dy:16}).dot(-5,0,{r:5,c:'var(--ink)',l:'F′',dy:16}); return P.svg(); })(),
  parts:[
   {q:'a) Sur quelle branche se trouve le bateau&nbsp;?',opts:['la branche de gauche, car MF′ − MF &gt; 0','la branche de droite, car il est plus près de F','les deux branches sont possibles','sur l’axe des y, à égale distance'],ans:1,hint:'Le signal de <i>F</i> arrive le premier.',why:'<i>MF′</i> − <i>MF</i> = 6 &gt; 0 : <i>M</i> est plus proche de <i>F</i>(5 ; 0), donc sur la branche de droite.'},
   {q:'b) Quelle est la valeur de <i>b</i> dans l’équation <i>x</i>²/<i>a</i>² − <i>y</i>²/<i>b</i>² = 1&nbsp;?',lab:'b =',ans:4,tol:.001,hint:'2<i>a</i> = 6 et <i>c</i> = 5.',why:'<i>a</i> = 3, <i>c</i> = 5, donc <i>b</i>² = <i>c</i>² − <i>a</i>² = 16 et <i>b</i> = 4.'},
   {q:'c) Quelle est l’abscisse du bateau&nbsp;? Arrondis au centième.',lab:'x =',unit:'km',ans:3*Math.SQRT2,tol:.006,hint:'Remplace <i>y</i> par 4 dans <i>x</i>²/9 − <i>y</i>²/16 = 1 et garde la solution positive.',why:'<i>x</i>²/9 = 1 + 1 = 2, donc <i>x</i> = 3√2 ≈ 4,24 km.'},
   {q:'d) À quelle distance de l’émetteur <i>F</i> est le bateau&nbsp;? Arrondis au centième.',lab:'MF =',unit:'km',ans:3*Math.SQRT2*5/3-3,tol:.006,hint:'Calcule directement √((<i>x</i> − 5)² + 4²), ou utilise <i>MF</i> = <i>ex</i> − <i>a</i>.',why:'<i>MF</i> = √((4,243 − 5)² + 16) ≈ √16,57 ≈ 4,07 km. Contrôle : <i>MF′</i> = √(9,243² + 16) ≈ 10,07 et 10,07 − 4,07 = 6.'},
  ],
  sol:'La différence <i>MF′</i> − <i>MF</i> = 6 = 2<i>a</i> place <i>M</i> sur l’hyperbole de foyers (±5 ; 0) avec <i>a</i> = 3, sur la branche la plus proche de <i>F</i>, celle de droite.<br><i>b</i>² = <i>c</i>² − <i>a</i>² = 25 − 9 = 16 : l’hyperbole est <i>x</i>²/9 − <i>y</i>²/16 = 1.<br>Avec <i>y</i> = 4 : <i>x</i>² = 9 × 2 = 18, <i>x</i> = 3√2 ≈ 4,24 (positif, branche de droite).<br><i>MF</i> = √((3√2 − 5)² + 16) ≈ 4,07 km. Sur la branche de droite, on a aussi <i>MF</i> = <i>ex</i> − <i>a</i> = (5/3)(3√2) − 3 = 5√2 − 3 ≈ 4,07.<br>C’est le principe des systèmes de navigation hyperbolique : un deuxième couple d’émetteurs donne une deuxième hyperbole, et le bateau est à l’intersection.'},
 {kind:'Problème',h:'Le triangle sous l’hyperbole',
  p:'On étudie l’hyperbole équilatère <i>xy</i> = 6, c’est-à-dire le graphe de <i>y</i> = 6/<i>x</i> pour <i>x</i> &gt; 0, et sa tangente au point <i>P</i>(2 ; 3). Cette tangente coupe les axes en <i>A</i> (sur l’axe des <i>x</i>) et <i>B</i> (sur l’axe des <i>y</i>). Déplace le point de contact pour voir ce qui reste constant.',
  params:[{id:'x',l:'Abscisse du point de contact',min:1,max:5,step:.5,v:2}],
  draw:v=>{ const k=6, x0=v.x, y0=k/x0, P=plane({x:[-1,11],y:[-1,13],w:300,lab:2}); P.poly([[0,0],[2*x0,0],[0,2*y0]],{fill:'var(--accent)',fo:.15,c:null});
    P.fn(x=>k/x,{from:.4,to:11,c:'var(--muted)'}); P.seg(2*x0,0,0,2*y0,{c:'var(--sci)',w:2.5}); P.dot(x0,y0,{l:'P'}).dot(2*x0,0,{r:4,c:'var(--ink)',l:'A',dy:16}).dot(0,2*y0,{r:4,c:'var(--ink)',l:'B'}); return P.svg(); },
  info:v=>`<i>P</i> = ${pt(v.x,6/v.x)} · aire du triangle <i>OAB</i> = ${fmt(2*v.x*12/v.x/2)}`,
  parts:[
   {q:'a) Quelle est la pente de la tangente en <i>P</i>(2 ; 3)&nbsp;?',lab:'pente =',ans:-1.5,tol:.001,hint:'Dérive <i>y</i> = 6/<i>x</i>.',why:'<i>y</i>′ = −6/<i>x</i>², qui vaut −6/4 = −1,5 en <i>x</i> = 2.'},
   {q:'b) Quelle est l’abscisse du point <i>A</i>&nbsp;?',lab:'x =',ans:4,tol:.001,hint:'La tangente est <i>y</i> = 3 − 1,5(<i>x</i> − 2). Cherche où <i>y</i> = 0.',why:'0 = 3 − 1,5(<i>x</i> − 2) donne <i>x</i> − 2 = 2, soit <i>A</i>(4 ; 0). De même <i>B</i>(0 ; 6).'},
   {q:'c) Quelle est l’aire du triangle <i>OAB</i>&nbsp;?',lab:'aire =',ans:12,tol:.001,hint:'C’est un triangle rectangle en <i>O</i>.',why:'½ × 4 × 6 = 12.'},
   {q:'d) Pour un point de contact quelconque <i>P</i>(<i>x</i>₀ ; 6/<i>x</i>₀), que peut-on dire&nbsp;?',opts:['L’aire vaut toujours 12 et P est le milieu de [AB]','L’aire dépend de x₀ et P est le milieu de [AB]','L’aire vaut toujours 6 et P est au tiers de [AB]','L’aire vaut toujours 12 mais P n’est pas le milieu'],ans:0,hint:'Calcule <i>A</i> et <i>B</i> en fonction de <i>x</i>₀ comme en b).',why:'La tangente coupe les axes en <i>A</i>(2<i>x</i>₀ ; 0) et <i>B</i>(0 ; 12/<i>x</i>₀). L’aire vaut ½ × 2<i>x</i>₀ × 12/<i>x</i>₀ = 12 = 2<i>k</i>, et le milieu de [<i>AB</i>] est (<i>x</i>₀ ; 6/<i>x</i>₀) = <i>P</i>.'},
  ],
  sol:'La tangente en <i>P</i>(<i>x</i>₀ ; <i>k</i>/<i>x</i>₀) à <i>y</i> = <i>k</i>/<i>x</i> a pour pente −<i>k</i>/<i>x</i>₀² : <i>y</i> = <i>k</i>/<i>x</i>₀ − (<i>k</i>/<i>x</i>₀²)(<i>x</i> − <i>x</i>₀).<br>Avec <i>y</i> = 0 : <i>x</i> − <i>x</i>₀ = <i>x</i>₀, donc <i>A</i>(2<i>x</i>₀ ; 0). Avec <i>x</i> = 0 : <i>y</i> = 2<i>k</i>/<i>x</i>₀, donc <i>B</i>(0 ; 2<i>k</i>/<i>x</i>₀).<br>Le milieu de [<i>AB</i>] est (<i>x</i>₀ ; <i>k</i>/<i>x</i>₀) = <i>P</i> : la tangente est coupée en son milieu par le point de contact.<br>L’aire de <i>OAB</i> vaut ½ × 2<i>x</i>₀ × 2<i>k</i>/<i>x</i>₀ = 2<i>k</i>, indépendante du point.<br>Pour <i>k</i> = 6 et <i>P</i>(2 ; 3) : pente −1,5, <i>A</i>(4 ; 0), <i>B</i>(0 ; 6), aire 12.'},
]},

/* =============== 4. LA PARABOLE =============== */
{subj:'ga', sem:'con', id:'con-parabole', h:'La parabole', p:'Un foyer, une directrice, et une propriété de réflexion qui fait marcher antennes, fours solaires et phares.', steps:[
 {h:'Foyer et directrice',p:`La <b>parabole</b> de foyer <i>F</i> et de directrice <i>D</i> est l’ensemble des points à égale distance de <i>F</i> et de <i>D</i> : <i>MF</i> = <i>MH</i> (excentricité 1). Avec <i>F</i>(0 ; <i>f</i>) et <i>D</i> : <i>y</i> = −<i>f</i>, on obtient <div class="formula"><i>y</i> = ${F('<i>x</i>²','4<i>f</i>')}</div> Le nombre <i>f</i> est la <b>distance focale</b> : la distance du sommet au foyer.`,
  params:[{id:'f',l:'Distance focale f',min:.5,max:3,step:.25,v:1},{id:'x',l:'Abscisse de M',min:-4,max:4,step:.5,v:2.5}],
  draw:v=>{ const f=v.f, P=plane({x:[-5,5],y:[-3.5,6],lab:2}), y0=v.x*v.x/(4*f);
    P.seg(-6,-f,6,-f,{c:'var(--muted)',w:2,dash:true}).text(-4.8,-f,'D',{dy:-6,c:'var(--muted)'}); P.fn(x=>x*x/(4*f));
    P.seg(0,f,v.x,y0,{c:'var(--spark)',w:2}).seg(v.x,y0,v.x,-f,{c:'var(--math)',w:2});
    P.dot(0,f,{r:5,c:'var(--ink)',l:'F',dx:-18}).dot(v.x,-f,{r:4,c:'var(--math)',l:'H',dy:16}).dot(v.x,y0,{l:'M'}); return P.svg(); },
  info:v=>{ const y0=v.x*v.x/(4*v.f); return `<i>y</i> = <i>x</i>²/${fmt(4*v.f)} · <i>MF</i> = ${fmt(Math.hypot(v.x,y0-v.f))}, <i>MH</i> = ${fmt(y0+v.f)}`; }},
 {h:'Trouve le foyer',p:'Quelle est la distance focale <i>f</i> de la parabole <i>y</i> = <i>x</i>²/8&nbsp;?',
  lab:'f =', ans:2, tol:.001, why:'4<i>f</i> = 8 donne <i>f</i> = 2 : le foyer est <i>F</i>(0 ; 2) et la directrice <i>y</i> = −2.'},
 {h:'Couchée sur le côté',p:`En échangeant <i>x</i> et <i>y</i>, la parabole de foyer <i>F</i>(<i>f</i> ; 0) et de directrice <i>x</i> = −<i>f</i> s’écrit <div class="formula"><i>y</i>² = 4<i>fx</i></div> Dans tous les cas, le <b>sommet</b> est au milieu du segment qui joint le foyer à la directrice, et l’axe de symétrie passe par le foyer, perpendiculairement à la directrice.`,
  fig:(()=>{ const P=plane({x:[-3,6],y:[-4,4],lab:1}); P.curve(t=>t*t/4,t=>t,-4.2,4.2); P.seg(-1,-5,-1,5,{c:'var(--muted)',w:2,dash:true}).text(-1,3.4,'x = −1',{dx:6,c:'var(--muted)',s:11});
    P.dot(1,0,{r:5,c:'var(--ink)',l:'F',dy:16}).dot(0,0,{r:4,c:'var(--spark)',l:'S',dx:-16}); P.text(2.4,3.3,'y² = 4x',{s:11}); return P.svg(); })(),
  note:'Piège : dans <i>y</i> = <i>x</i>²/(4<i>f</i>), le nombre devant <i>x</i>² est 1/(4<i>f</i>), pas <i>f</i>. Pour <i>y</i> = 2<i>x</i>², on a 4<i>f</i> = 1/2 et <i>f</i> = 1/8.'},
 {h:'Le foyer de y² = 12x',p:'Où est le foyer de la parabole <i>y</i>² = 12<i>x</i>&nbsp;?',
  opts:['(0 ; 3)','(12 ; 0)','(6 ; 0)','(3 ; 0)'],ans:3,
  why:'4<i>f</i> = 12 donne <i>f</i> = 3 : le foyer est (3 ; 0) et la directrice <i>x</i> = −3.'},
 {kind:'Pratique',h:'Une antenne de 8 m',p:'Le profil d’une antenne parabolique de 8 m de diamètre et de 2 m de profondeur suit <i>y</i> = <i>x</i>²/(4<i>f</i>). Le bord passe donc par (4 ; 2). Règle <i>f</i> pour que la parabole passe par ce point : le récepteur se place au foyer.',
  params:[{id:'f',l:'Distance focale f',min:.5,max:4,step:.25,v:1}],
  draw:v=>{ const P=plane({x:[-5,5],y:[-1,5],lab:1}), good=v.f===2; P.fn(x=>x*x/(4*v.f),{c:good?'var(--ok)':'var(--accent)'}); P.dot(4,2,{c:'var(--spark)',l:'bord',dx:-42}).dot(-4,2,{c:'var(--spark)'}).dot(0,v.f,{r:5,c:'var(--ink)',l:'F',dx:-18}); return P.svg(); },
  info:v=>`En <i>x</i> = 4 : <i>y</i> = 16/${fmt(4*v.f)} = ${fmt(4/v.f)}`,
  ok:v=>v.f===2, why:'16/(4<i>f</i>) = 2 donne <i>f</i> = 2 m. Ici le foyer est exactement à la hauteur du bord.'},
 {h:'La tangente',p:`La tangente à <i>y</i> = <i>x</i>²/(4<i>f</i>) en <i>M</i>₀(<i>x</i>₀ ; <i>y</i>₀) a pour pente <i>x</i>₀/(2<i>f</i>). Elle coupe l’axe de la parabole au point <i>T</i>(0 ; −<i>y</i>₀), symétrique de la projection de <i>M</i>₀ par rapport au sommet. Comme <i>FT</i> = <i>f</i> + <i>y</i>₀ = <i>FM</i>₀, le triangle <i>FM</i>₀<i>T</i> est <b>isocèle</b>.`,
  params:[{id:'x',l:'x₀',min:-4,max:4,step:.5,v:2}],
  draw:v=>{ const f=1, P=plane({x:[-5,5],y:[-4.5,5.5],lab:2}), y0=v.x*v.x/4, m=v.x/2;
    P.fn(x=>x*x/4,{c:'var(--muted)'}); P.fn(x=>y0+m*(x-v.x),{c:'var(--sci)',w:2.5}); P.poly([[0,f],[v.x,y0],[0,-y0]],{fill:'var(--spark)',fo:.15,c:'var(--spark)',w:1.5});
    P.dot(0,f,{r:5,c:'var(--ink)',l:'F',dx:-18}).dot(v.x,y0,{l:'M₀'}).dot(0,-y0,{r:4,c:'var(--sci)',l:'T',dx:-16}); return P.svg(); },
  info:v=>{ const y0=v.x*v.x/4; return `<i>y</i> = <i>x</i>²/4 · pente ${fmt(v.x/2)} · <i>FM</i>₀ = ${fmt(Math.hypot(v.x,y0-1))}, <i>FT</i> = ${fmt(1+y0)}`; }},
 {h:'Ordonnée de T',p:'Quelle est l’ordonnée à l’origine de la tangente à <i>y</i> = <i>x</i>²/4 au point d’abscisse 2&nbsp;?',
  lab:'y =', ans:-1, tol:.001, why:'<i>y</i>₀ = 1 et la pente vaut 2/2 = 1 : la tangente est <i>y</i> = 1 + (<i>x</i> − 2) = <i>x</i> − 1. Elle coupe l’axe en −1 = −<i>y</i>₀.'},
 {h:'La propriété de réflexion',p:'Un rayon parallèle à l’axe qui frappe la parabole en <i>M</i> se réfléchit en passant par le <b>foyer</b>. C’est une conséquence du triangle isocèle de l’étape précédente : la tangente fait le même angle avec le rayon et avec (<i>MF</i>). Change la position du rayon et la distance focale.',
  params:[{id:'x',l:'Position du rayon',min:-4,max:4,step:.5,v:3},{id:'f',l:'Distance focale f',min:.5,max:2,step:.25,v:1}],
  draw:v=>{ const f=v.f, P=plane({x:[-5,5],y:[-1.5,6],lab:2}), y0=v.x*v.x/(4*f);
    P.fn(x=>x*x/(4*f),{c:'var(--muted)',w:3}); for(let k=-4;k<=4;k+=2) if(k!==v.x&&k!==0){ const yk=k*k/(4*f); if(yk<6){ P.seg(k,6,k,yk,{c:'var(--line)',w:1.5}).seg(k,yk,0,f,{c:'var(--line)',w:1.5}); } }
    P.fn(x=>y0+v.x/(2*f)*(x-v.x),{c:'var(--sci)',w:1.5,dash:true});
    P.arrow(v.x,6,v.x,y0,{c:'var(--spark)',w:2.5,hs:9}).arrow(v.x,y0,0,f,{c:'var(--accent)',w:2.5,hs:9}); P.dot(0,f,{r:5,c:'var(--ink)',l:'F',dx:-18}).dot(v.x,y0,{r:4}); return P.svg(); },
  info:v=>`Le rayon arrive en ${pt(v.x,v.x*v.x/(4*v.f))} et repart vers <i>F</i>(0 ; ${fmt(v.f)})`,
  note:'Dans l’autre sens, une source placée au foyer produit un faisceau parallèle à l’axe. Seule la parabole a cette propriété pour <b>tous</b> les rayons parallèles.'},
 {h:'Le phare de voiture',p:'Dans un phare de voiture, le réflecteur est une parabole de révolution. Où place-t-on l’ampoule des feux de route pour obtenir un faisceau qui porte loin&nbsp;?',
  opts:['au sommet du réflecteur','au foyer','sur la directrice','au bord du réflecteur'],ans:1,
  why:'Les rayons issus du foyer se réfléchissent tous parallèlement à l’axe : le faisceau ne s’élargit pas et porte loin. Une ampoule décalée du foyer donne un faisceau qui diverge (c’est l’idée des feux de croisement).'},

 {kind:'Problème',h:'Où placer le récepteur&nbsp;?',
  p:'Une antenne satellite a un profil parabolique de 90 cm de diamètre et de 10 cm de profondeur. On la place dans un repère où son sommet est l’origine et son axe l’axe des <i>y</i> : son profil est <i>y</i> = <i>x</i>²/(4<i>f</i>) et son bord passe par (45 ; 10), en cm. Le récepteur doit se trouver au foyer.',
  fig:(()=>{ const f=50.625, P=plane({x:[-60,60],y:[-10,60],grid:false}); P.fn(x=>x*x/(4*f),{from:-45,to:45}); P.seg(-45,10,45,10,{c:'var(--muted)',w:1.5,dash:true}); P.dot(0,f,{r:5,c:'var(--ink)',l:'F',dx:-18}); P.seg(0,0,0,f,{c:'var(--line)',w:1.5}); return P.svg(); })(),
  parts:[
   {q:'a) Quelle est la distance focale <i>f</i>&nbsp;? Arrondis au dixième.',lab:'f =',unit:'cm',ans:50.625,tol:.06,hint:'Écris que (45 ; 10) vérifie <i>y</i> = <i>x</i>²/(4<i>f</i>).',why:'10 = 2025/(4<i>f</i>) donne <i>f</i> = 2025/40 = 50,625 cm ≈ 50,6 cm.'},
   {q:'b) Où se trouve le récepteur par rapport au bord de l’antenne&nbsp;?',opts:['à l’intérieur de la coupelle, sous le bord','exactement au niveau du bord','au-dessus du bord, à environ 40 cm devant','derrière l’antenne'],ans:2,hint:'Compare <i>f</i> à la profondeur de 10 cm.',why:'<i>f</i> ≈ 50,6 cm &gt; 10 cm : le foyer est environ 40,6 cm au-dessus du plan du bord, d’où le bras qui porte le récepteur.'},
   {q:'c) Avec le même diamètre de 90 cm, quelle profondeur <i>p</i> faudrait-il pour que le foyer soit exactement au niveau du bord&nbsp;?',lab:'p =',unit:'cm',ans:22.5,tol:.01,hint:'Le bord (45 ; <i>p</i>) est sur la parabole et le foyer a l’ordonnée <i>f</i> = <i>p</i>.',why:'<i>p</i> = 2025/(4<i>p</i>) donne <i>p</i>² = 506,25 et <i>p</i> = 22,5 cm : le diamètre vaut alors 4<i>f</i>.'},
  ],
  sol:'Le bord (45 ; 10) est sur la parabole : 10 = 45²/(4<i>f</i>), donc <i>f</i> = 2025/40 = 50,625 cm.<br>Le foyer est à 50,6 cm du sommet, donc à 40,6 cm au-dessus du plan du bord : le récepteur est tenu par un bras devant l’antenne.<br>Pour que le foyer soit au niveau du bord, il faut <i>f</i> = <i>p</i> avec 45² = 4<i>f p</i> = 4<i>p</i>², soit <i>p</i> = 45/2 = 22,5 cm.<br>Règle utile : le foyer est au niveau du bord quand le diamètre vaut 4<i>f</i>, c’est-à-dire quatre fois la profondeur.'},
 {kind:'Problème',h:'Tangentes perpendiculaires',
  p:'On considère la parabole <i>y</i> = <i>x</i>²/4, de foyer <i>F</i>(0 ; 1) et de directrice <i>y</i> = −1. On trace la tangente au point d’abscisse <i>x</i>₁ = 4, puis on cherche le point d’abscisse <i>x</i>₂ où la tangente lui est perpendiculaire. On étudie ensuite où ces deux tangentes se coupent, et la corde qui joint les deux points de contact.',
  params:[{id:'x',l:'x₁',min:.5,max:4,step:.5,v:4}],
  draw:v=>{ const x1=v.x, x2=-4/x1, P=plane({x:[-6,6],y:[-2,6],lab:2}), T=x=>[x,x*x/4];
    P.seg(-7,-1,7,-1,{c:'var(--muted)',w:2,dash:true}); P.fn(x=>x*x/4,{c:'var(--muted)'});
    [x1,x2].forEach(a=>P.fn(x=>a/2*x-a*a/4,{c:'var(--sci)',w:2})); P.seg(...T(x1),...T(x2),{c:'var(--spark)',w:2});
    P.dot(0,1,{r:5,c:'var(--ink)',l:'F',dx:-18}).dot(...T(x1),{r:4}).dot(...T(x2),{r:4}).dot((x1+x2)/2,-1,{c:'var(--accent)',l:'I',dy:18}); return P.svg(); },
  info:v=>`<i>x</i>₁ = ${fmt(v.x)}, <i>x</i>₂ = ${fmt(-4/v.x)} · les tangentes se coupent en ${pt((v.x-4/v.x)/2,-1)}`,
  parts:[
   {q:'a) Quelle est la pente de la tangente en <i>x</i>₁ = 4&nbsp;?',lab:'pente =',ans:2,tol:.001,hint:'La pente en <i>x</i>₀ vaut <i>x</i>₀/2 pour <i>y</i> = <i>x</i>²/4.',why:'4/2 = 2. La tangente est <i>y</i> = 2<i>x</i> − 4.'},
   {q:'b) Pour quelle abscisse <i>x</i>₂ la tangente est-elle perpendiculaire à la première&nbsp;?',lab:'x₂ =',ans:-1,tol:.001,hint:'Deux droites sont perpendiculaires quand le produit de leurs pentes vaut −1.',why:'(<i>x</i>₂/2) × 2 = −1 donne <i>x</i>₂ = −1. La tangente est <i>y</i> = −<i>x</i>/2 − 1/4.'},
   {q:'c) Quelle est l’ordonnée du point d’intersection <i>I</i> des deux tangentes&nbsp;?',lab:'y =',ans:-1,tol:.001,hint:'Résous 2<i>x</i> − 4 = −<i>x</i>/2 − 1/4.',why:'2,5<i>x</i> = 3,75 donne <i>x</i> = 1,5 et <i>y</i> = 2 × 1,5 − 4 = −1.'},
   {q:'d) La corde qui joint les points de contact (4 ; 4) et (−1 ; 1/4) coupe l’axe des <i>y</i> en quelle ordonnée&nbsp;?',lab:'y =',ans:1,tol:.001,hint:'Pente de la corde : (4 − 0,25)/(4 − (−1)).',why:'Pente 3,75/5 = 0,75, donc <i>y</i> = 4 + 0,75(<i>x</i> − 4), qui vaut 1 en <i>x</i> = 0 : la corde passe par le foyer.'},
   {q:'e) Ce que suggèrent c) et d), et que la figure confirme pour tout <i>x</i>₁ :',opts:['les tangentes se coupent sur l’axe et la corde passe par le sommet','les tangentes se coupent sur la directrice et la corde passe par le foyer','les tangentes se coupent au foyer','la corde est toujours horizontale'],ans:1,hint:'Bouge le curseur <i>x</i>₁ et regarde <i>I</i> et la corde.',why:'En général <i>x</i>₁<i>x</i>₂ = −4 et <i>I</i> = ((<i>x</i>₁ + <i>x</i>₂)/2 ; <i>x</i>₁<i>x</i>₂/4) = (… ; −1) : <i>I</i> est sur la directrice, et la corde passe par <i>F</i>(0 ; 1).'},
  ],
  sol:'Pour <i>y</i> = <i>x</i>²/4, la tangente en <i>a</i> est <i>y</i> = (<i>a</i>/2)<i>x</i> − <i>a</i>²/4.<br>Deux tangentes en <i>x</i>₁ et <i>x</i>₂ sont perpendiculaires si (<i>x</i>₁/2)(<i>x</i>₂/2) = −1, soit <i>x</i>₁<i>x</i>₂ = −4. Pour <i>x</i>₁ = 4 : <i>x</i>₂ = −1.<br>Elles se coupent en <i>x</i> = (<i>x</i>₁ + <i>x</i>₂)/2 = 1,5 et <i>y</i> = <i>x</i>₁<i>x</i>₂/4 = −1 : sur la directrice.<br>La corde entre (<i>x</i>₁ ; <i>x</i>₁²/4) et (<i>x</i>₂ ; <i>x</i>₂²/4) a pour pente (<i>x</i>₁ + <i>x</i>₂)/4 et coupe l’axe en −<i>x</i>₁<i>x</i>₂/4 = 1 : elle passe par le foyer.<br>Conclusion : les tangentes perpendiculaires se coupent sur la directrice, et leurs points de contact sont alignés avec le foyer.'},
]},

/* =============== 5. GÉOMÉTRIE PROJECTIVE =============== */
{subj:'ga', sem:'con', id:'con-projective', h:'Coniques et géométrie projective', p:'Ajouter au plan ses points à l’infini : les trois coniques deviennent une seule, et on trouve des équations par des conditions de tangence.', steps:[
 {h:'Coordonnées homogènes',p:`Un point (<i>x</i> ; <i>y</i>) du plan est noté (<i>x</i> : <i>y</i> : 1), et on décide que (<i>x</i> : <i>y</i> : <i>z</i>) et (λ<i>x</i> : λ<i>y</i> : λ<i>z</i>) représentent le même point (λ ≠ 0). Géométriquement, un point est une <b>droite passant par l’origine</b> de l’espace, et on le voit là où elle perce le plan <i>z</i> = 1. Une droite horizontale ne perce pas ce plan : elle donne un <b>point à l’infini</b> (<i>x</i> : <i>y</i> : 0).`,
  params:[{id:'p',l:'Élévation de la droite',min:0,max:90,step:5,v:40,u:'°'},azP],
  draw:v=>{ const S=space({r:3.4,az:v.az,el:18}), ps=rad(30), ph=rad(v.p), d=[Math.cos(ph)*Math.cos(ps),Math.cos(ph)*Math.sin(ps),Math.sin(ph)];
    S.poly([[2.5,-2.5,1],[2.5,2.5,1],[-2.5,2.5,1],[-2.5,-2.5,1]],{fill:'var(--sci)',fo:.15,c:'var(--sci)',w:1}); S.text([-2.5,-2.5,1],'z = 1',{dx:4,dy:-6,c:'var(--sci)'});
    S.seg([-d[0]*1.2,-d[1]*1.2,-d[2]*1.2],[d[0]*3.6,d[1]*3.6,d[2]*3.6],{c:'var(--accent)',w:3}); S.dot([0,0,0],{r:4,c:'var(--ink)',l:'O'});
    if(v.p>0){ const M=d.map(x=>x/d[2]); if(Math.max(Math.abs(M[0]),Math.abs(M[1]))<=2.5) S.dot(M,{l:'M'}); } return S.svg(); },
  info:v=>{ const ps=rad(30), ph=rad(v.p), d=[Math.cos(ph)*Math.cos(ps),Math.cos(ph)*Math.sin(ps),Math.sin(ph)];
    return `(<i>x</i> : <i>y</i> : <i>z</i>) = (${fmt(d[0])} : ${fmt(d[1])} : ${fmt(d[2])})`+(v.p===0?' → <b>point à l’infini</b> dans la direction de la droite':` = (${fmt(d[0]/d[2])} : ${fmt(d[1]/d[2])} : 1) → <i>M</i>${pt(d[0]/d[2],d[1]/d[2])}`)+(v.p>0&&v.p<25?' (très loin dans le plan)':''); },
  note:'Les points à l’infini forment la <b>droite de l’infini</b>, d’équation <i>z</i> = 0. Le plan usuel plus cette droite forme le <b>plan projectif</b>.'},
 {h:'Le même point',p:'Lequel de ces triplets représente le même point projectif que (2 : −4 : 2)&nbsp;?',
  opts:['(2 : −4 : 1)','(−1 : 2 : 1)','(1 : −2 : 1)','(1 : −4 : 1)'],ans:2,
  why:'On divise tout par 2 : (2 : −4 : 2) = (1 : −2 : 1), c’est le point (1 ; −2) du plan. En revanche (2 : −4 : 1) est le point (2 ; −4).'},
 {h:'Les parallèles se coupent à l’infini',p:`La droite <i>ux</i> + <i>vy</i> + <i>w</i> = 0 devient <i>ux</i> + <i>vy</i> + <i>wz</i> = 0. Dans le plan projectif, deux droites distinctes se coupent <b>toujours</b> en un point, qu’on obtient par le produit vectoriel de (<i>u</i> ; <i>v</i> ; <i>w</i>) et (<i>u′</i> ; <i>v′</i> ; <i>w′</i>). Où se coupent <i>x</i> − 2<i>y</i> + 1 = 0 et <i>x</i> − 2<i>y</i> + 5 = 0&nbsp;?`,
  opts:['nulle part, elles sont parallèles','au point (2 : 1 : 0)','au point (1 : −2 : 0)','au point (−2 : 1 : 1)'],ans:1,
  why:'(1 ; −2 ; 1) × (1 ; −2 ; 5) = (−10 + 2 ; 1 − 5 ; −2 + 2) = (−8 ; −4 ; 0), soit (2 : 1 : 0). C’est le point à l’infini dans la direction (2 ; 1), celle des deux droites.'},
 {kind:'Pratique',h:'Un cercle vu en perspective',p:`Ton œil est à 1 m du sol et regarde l’horizon à travers une vitre verticale. Un point du sol (<i>X</i> ; <i>Y</i>) (avec <i>Y</i> la distance devant toi) apparaît sur la vitre en (<i>u</i> ; <i>v</i>) = (<i>X</i>/<i>Y</i> ; −1/<i>Y</i>). L’image d’un cercle est une <b>conique</b>. Ici le cercle a un rayon de 2 m et son centre est à la distance <i>Y</i><sub>c</sub>. La ligne du sol <i>Y</i> = 0, sous tes pieds, est envoyée à l’infini. Règle <i>Y</i><sub>c</sub> pour que l’image soit une <b>parabole</b>.`,
  params:[{id:'y',l:'Distance du centre Yc',min:.5,max:6,step:.5,v:4,u:'m'}],
  draw:v=>{ const P=plane({x:[-1.5,1.5],y:[-2,.5],lab:.5,step:.25}), A=v.y*v.y-4; P.seg(-5,0,5,0,{c:'var(--sci)',w:1.5,dash:true}).text(-1.45,0,'horizon',{dy:-6,c:'var(--sci)',s:11});
    implicit(P,(u,w)=>u*u+A*w*w+2*v.y*w+1,[-1.5,1.5],[-2,.5],{c:v.y===2?'var(--ok)':'var(--accent)'},80); return P.svg(); },
  info:v=>{ const A=v.y*v.y-4; return `Image : <i>u</i>² ${A<0?'−':'+'} ${fmt(Math.abs(A))}<i>v</i>² + ${fmt(2*v.y)}<i>v</i> + 1 = 0 → `+(A>0?'<b>ellipse</b> : le cercle est tout entier devant toi':A===0?'<b>parabole</b> : le cercle touche la ligne <i>Y</i> = 0':'<b>hyperbole</b> : le cercle passe sous tes pieds et derrière toi'); },
  ok:v=>v.y===2, why:'L’image est une parabole quand le cercle est <b>tangent</b> à la ligne <i>Y</i> = 0 envoyée à l’infini : <i>Y</i><sub>c</sub> = 2 m, le rayon. Le coefficient de <i>v</i>² vaut alors <i>Y</i><sub>c</sub>² − 4 = 0.'},
 {h:'Une seule conique, trois rencontres avec l’infini',p:`En projectif, ellipse, parabole et hyperbole sont la même courbe. Ce qui les distingue, c’est la façon dont elles rencontrent la droite de l’infini. On homogénéise <div class="formula"><i>ax</i>² + 2<i>bxy</i> + <i>cy</i>² + 2<i>dxz</i> + 2<i>eyz</i> + <i>fz</i>² = 0</div> puis on pose <i>z</i> = 0 : il reste <i>ax</i>² + 2<i>bxy</i> + <i>cy</i>² = 0. Selon le signe de <i>b</i>² − <i>ac</i>, cette équation a 0, 1 (double) ou 2 solutions (<i>x</i> : <i>y</i>).`,
  fig:(()=>{ const P=plane({x:[-6,6],y:[-3,3],grid:false,axes:false}); P.text(-4,2.4,'0 point',{a:'middle',s:12}).text(0,2.4,'1 point (tangente)',{a:'middle',s:12}).text(4,2.4,'2 points',{a:'middle',s:12});
    ell(P,1.4,.9,{},-4,0); P.curve(t=>t,t=>-1.8+t*t/1.4,-1.6,1.6,{}); P.curve(t=>4+.6*ch(t),t=>sh(t),-1.6,1.6,{}); P.curve(t=>4-.6*ch(t),t=>sh(t),-1.6,1.6,{});
    P.text(-4,-2.6,'ellipse',{a:'middle',c:'var(--muted)',s:11}).text(0,-2.6,'parabole',{a:'middle',c:'var(--muted)',s:11}).text(4,-2.6,'hyperbole',{a:'middle',c:'var(--muted)',s:11}); return P.svg(); })(),
  note:'<b>Ellipse</b> : aucun point à l’infini (<i>b</i>² &lt; <i>ac</i>). <b>Parabole</b> : tangente à la droite de l’infini, en la direction de son axe (<i>b</i>² = <i>ac</i>). <b>Hyperbole</b> : deux points à l’infini, les directions des asymptotes (<i>b</i>² &gt; <i>ac</i>). Par exemple <i>xy</i> = 1 coupe <i>z</i> = 0 en (1 : 0 : 0) et (0 : 1 : 0).'},
 {kind:'Méthode',h:'Trouver une parabole par la géométrie projective',p:`On cherche la parabole qui passe par <i>O</i>(0 ; 0), <i>A</i>(1 ; 0), <i>B</i>(0 ; 1) et dont l’axe a la direction (1 ; 1). <ol><li>Être une parabole d’axe (1 ; 1), c’est être <b>tangente</b> à la droite de l’infini au point (1 : 1 : 0). La partie de degré 2 doit donc s’annuler doublement en (1 ; 1) : c’est <i>k</i>(<i>x</i> − <i>y</i>)².</li><li>On prend <i>k</i> = 1 et on écrit (<i>x</i> − <i>y</i>)² + 2<i>dx</i> + 2<i>ey</i> + <i>f</i> = 0.</li><li>Les points imposent <i>f</i> = 0, 1 + 2<i>d</i> = 0 et 1 + 2<i>e</i> = 0.</li></ol> Résultat : <b>(<i>x</i> − <i>y</i>)² − <i>x</i> − <i>y</i> = 0</b>.`,
  fig:(()=>{ const P=plane({x:[-2,4],y:[-2,4],lab:1}); line2(P,1,-1,0,{c:'var(--line)',w:1.5,dash:true}); implicit(P,(x,y)=>sq(x-y)-x-y,[-2,4],[-2,4],{},80);
    P.dot(0,0,{l:'O',dx:-16}).dot(1,0,{l:'A',dy:16}).dot(0,1,{l:'B',dx:-16}); return P.svg(); })(),
  note:'Une droite parallèle à l’axe, comme <i>y</i> = <i>x</i> + 2, ne coupe cette parabole qu’en un seul point du plan, (1 ; 3). Son second point d’intersection est le point à l’infini (1 : 1 : 0).'},
 {h:'Rends-la parabole',p:'Pour quelle valeur de <i>c</i> la conique <i>x</i>² + 4<i>xy</i> + <i>cy</i>² + 2<i>x</i> − 3 = 0 est-elle une parabole&nbsp;?',
  lab:'c =', ans:4, tol:.001, why:'Ici <i>a</i> = 1 et 2<i>b</i> = 4, donc <i>b</i> = 2. La condition <i>b</i>² = <i>ac</i> donne <i>c</i> = 4 : la partie de degré 2 devient (<i>x</i> + 2<i>y</i>)², tangente à l’infini en (2 : −1 : 0).'},
 {h:'Enveloppe de droites et courbes de Bézier',p:`Sur les segments [<i>P</i>₀<i>P</i>₁] et [<i>P</i>₁<i>P</i>₂], place <i>Q</i> et <i>R</i> au même rapport <i>t</i> : <i>Q</i> = (1 − <i>t</i>)<i>P</i>₀ + <i>tP</i>₁, <i>R</i> = (1 − <i>t</i>)<i>P</i>₁ + <i>tP</i>₂. Les droites (<i>QR</i>) sont toutes tangentes à une parabole : leur <b>enveloppe</b>. Le point de contact est <i>B</i>(<i>t</i>) = (1 − <i>t</i>)<i>Q</i> + <i>tR</i>, la <b>courbe de Bézier</b> quadratique de points de contrôle <i>P</i>₀, <i>P</i>₁, <i>P</i>₂.`,
  params:[{id:'n',l:'Nombre de droites',min:2,max:30,step:1,v:6}],
  draw:v=>{ const P0=[-4,3], P1=[0,-3], P2=[4,3], P=plane({x:[-5,5],y:[-3.5,4],lab:2}), L=(A,B,t)=>[A[0]+(B[0]-A[0])*t,A[1]+(B[1]-A[1])*t];
    P.poly([P0,P1,P2],{c:'var(--muted)',w:2,open:true});
    for(let k=0;k<=v.n;k++){ const t=k/v.n, Qp=L(P0,P1,t), R=L(P1,P2,t); P.seg(Qp[0],Qp[1],R[0],R[1],{c:'var(--sci)',w:1.5}); }
    P.fn(x=>3*x*x/16,{from:-4,to:4,c:'var(--accent)',w:2,dash:true,op:.7});
    P.dot(...P0,{r:4,c:'var(--ink)',l:'P₀'}).dot(...P1,{r:4,c:'var(--ink)',l:'P₁'}).dot(...P2,{r:4,c:'var(--ink)',l:'P₂',dx:-24}); return P.svg(); },
  info:v=>`${v.n+1} droites (<i>QR</i>) pour <i>t</i> = 0, 1/${v.n}, …, 1. Avec <i>P</i>₀(−4 ; 3), <i>P</i>₁(0 ; −3), <i>P</i>₂(4 ; 3), l’enveloppe est la parabole <i>y</i> = 3<i>x</i>²/16.`,
  note:'Les logiciels de dessin et les polices de caractères tracent leurs courbes ainsi. Projectivement, c’est la construction d’une conique tangente à deux droites données.'},
 {h:'Le point de contact',p:'Avec les points de contrôle de la figure, <i>P</i>₀(−4 ; 3), <i>P</i>₁(0 ; −3), <i>P</i>₂(4 ; 3), quelle est l’abscisse du point où la droite (<i>QR</i>) obtenue pour <i>t</i> = 1/4 touche la parabole&nbsp;?',
  lab:'x =', ans:-2, tol:.001, why:'<i>Q</i> = ¾ <i>P</i>₀ + ¼ <i>P</i>₁ = (−3 ; 1,5), <i>R</i> = ¾ <i>P</i>₁ + ¼ <i>P</i>₂ = (1 ; −1,5), puis <i>B</i> = ¾ <i>Q</i> + ¼ <i>R</i> = (−2 ; 0,75). Contrôle : 3 × 4/16 = 0,75.'},
 {h:'La conique par cinq points',p:`L’équation <i>ax</i>² + 2<i>bxy</i> + <i>cy</i>² + 2<i>dx</i> + 2<i>ey</i> + <i>f</i> = 0 a 6 coefficients, définis à un facteur près. Chaque point impose une équation <b>linéaire</b>. Cinq points en position générale (jamais quatre alignés) donnent un système 5 × 6 dont la solution est unique à un facteur près : <b>par 5 points passe une et une seule conique</b>. Déplace le cinquième point <i>P</i>.`,
  params:[{id:'p',l:'P : x',min:-3,max:3,step:.5,v:1.5},{id:'q',l:'P : y',min:-3,max:3,step:.5,v:1}],
  draw:v=>{ const pts=[[-2,0],[2,0],[0,2],[0,-1],[v.p,v.q]], k=conic5(pts), P=plane({x:[-5,5],y:[-5,5],lab:2});
    drawConic(P,k,[-5,5],[-5,5],{},80); pts.slice(0,4).forEach(p=>P.dot(p[0],p[1],{r:5,c:'var(--ink)'})); P.dot(v.p,v.q,{l:'P'}); return P.svg(); },
  info:v=>{ const pts=[[-2,0],[2,0],[0,2],[0,-1],[v.p,v.q]], dup=pts.slice(0,4).some(p=>p[0]===v.p&&p[1]===v.q);
    if(dup) return 'Deux points sont confondus : il n’y a plus qu’une condition pour quatre, une infinité de coniques conviennent.';
    const k=conic5(pts), s=Math.abs(k.f)>1e-9?-1/k.f:1, kk={a:k.a*s,b:k.b*s,c:k.c*s,d:k.d*s,e:k.e*s,f:k.f*s}; return `${eqConic(kk)} → ${typeOf(kk)}`; },
  note:'Autre construction, due à Steiner : on prend deux points <i>A</i> et <i>B</i> de la conique, et on associe chaque droite passant par <i>A</i> à une droite passant par <i>B</i> par une correspondance projective. Les points d’intersection des droites associées décrivent la conique.'},
 {h:'Résous le système',p:'Quelle est la conique passant par (1 ; 0), (−1 ; 0), (0 ; 2), (0 ; −2) et (1 ; 1)&nbsp;?',
  opts:['<i>x</i>² + <i>y</i>²/4 = 1','4<i>x</i>² − <i>xy</i> + <i>y</i>² = 4','4<i>x</i>² + <i>xy</i> + <i>y</i>² = 4','4<i>x</i>² − 2<i>xy</i> + <i>y</i>² = 4'],ans:1,
  why:'Les points (±1 ; 0) donnent <i>d</i> = 0 et <i>f</i> = −<i>a</i>, les points (0 ; ±2) donnent <i>e</i> = 0 et <i>f</i> = −4<i>c</i>. Avec <i>a</i> = 4 : <i>c</i> = 1, <i>f</i> = −4. Enfin (1 ; 1) : 4 + 2<i>b</i> + 1 − 4 = 0, donc 2<i>b</i> = −1. Contrôle : 4 − 1 + 1 = 4.'},

 {kind:'Problème',h:'Un étang vu en perspective',
  p:'Tu regardes un étang circulaire de rayon <i>R</i> = 3 m dont le centre est à <i>Y</i><sub>c</sub> = 5 m devant toi. Ton œil est à 1 m du sol, et un point du sol (<i>X</i> ; <i>Y</i>) apparaît sur la vitre verticale en (<i>u</i> ; <i>v</i>) = (<i>X</i>/<i>Y</i> ; −1/<i>Y</i>). En remplaçant <i>X</i> = −<i>u</i>/<i>v</i> et <i>Y</i> = −1/<i>v</i> dans <i>X</i>² + (<i>Y</i> − <i>Y</i><sub>c</sub>)² = <i>R</i>², on obtient l’image <i>u</i>² + (<i>Y</i><sub>c</sub>² − <i>R</i>²)<i>v</i>² + 2<i>Y</i><sub>c</sub><i>v</i> + 1 = 0.',
  fig:(()=>{ const P=plane({x:[-1.5,1.5],y:[-.7,.15],w:320,grid:false}); P.seg(-2,0,2,0,{c:'var(--sci)',w:1.5,dash:true}).text(-1.45,0,'horizon',{dy:-6,c:'var(--sci)',s:11});
    implicit(P,(u,v)=>u*u+16*v*v+10*v+1,[-1.5,1.5],[-.7,.15],{},90); P.dot(0,-.2,{r:4,c:'var(--spark)',l:'image du centre',dx:10,dy:4}); return P.svg(); })(),
  parts:[
   {q:'a) Quelle est la nature de l’image de l’étang&nbsp;?',opts:['une parabole','une hyperbole','une ellipse','un cercle'],ans:2,hint:'Regarde le signe du coefficient de <i>v</i>², ou demande-toi si l’étang touche la ligne <i>Y</i> = 0.',why:'<i>Y</i><sub>c</sub>² − <i>R</i>² = 25 − 9 = 16 &gt; 0 : ellipse. L’étang est tout entier devant toi (de <i>Y</i> = 2 à <i>Y</i> = 8).'},
   {q:'b) À partir de quelle distance <i>Y</i><sub>c</sub> du centre l’image cesse-t-elle d’être une ellipse&nbsp;?',lab:'Yc =',unit:'m',ans:3,tol:.001,hint:'Cherche quand le coefficient de <i>v</i>² s’annule.',why:'<i>Y</i><sub>c</sub>² = <i>R</i>² donne <i>Y</i><sub>c</sub> = 3 m : l’étang touche alors la ligne sous tes pieds et l’image est une parabole.'},
   {q:'c) Pour <i>Y</i><sub>c</sub> = 5, quelle est la hauteur de l’image sur la vitre (écart entre son point le plus haut et son point le plus bas)&nbsp;?',lab:'hauteur =',unit:'m',ans:.375,tol:.001,hint:'Les extrémités verticales vérifient <i>u</i> = 0 : résous 16<i>v</i>² + 10<i>v</i> + 1 = 0.',why:'Δ = 100 − 64 = 36, <i>v</i> = (−10 ± 6)/32, soit −0,125 et −0,5. Hauteur : 0,375 m. Ce sont les images des points de l’étang à 8 m et à 2 m.'},
   {q:'d) L’image du centre de l’étang (<i>v</i> = −1/5) est-elle le centre de l’ellipse image&nbsp;?',opts:['oui, la perspective conserve les centres','non : le centre de l’ellipse est en v = −0,3125, plus bas que l’image du centre','non : l’ellipse n’a pas de centre','oui, car l’étang est circulaire'],ans:1,hint:'Le centre de l’ellipse est le milieu des deux valeurs de <i>v</i> trouvées en c).',why:'Le milieu de −0,125 et −0,5 est −0,3125 ≠ −0,2. La perspective conserve les droites et les coniques, pas les milieux ni les centres.'},
  ],
  sol:'Avec <i>R</i> = 3 et <i>Y</i><sub>c</sub> = 5, l’image est <i>u</i>² + 16<i>v</i>² + 10<i>v</i> + 1 = 0.<br>Le coefficient de <i>v</i>² est positif (<i>b</i>² − <i>ac</i> = −16 &lt; 0) : c’est une ellipse. Elle devient une parabole pour <i>Y</i><sub>c</sub> = <i>R</i> = 3 m, quand l’étang touche la ligne <i>Y</i> = 0 envoyée à l’infini.<br>Pour <i>u</i> = 0 : 16<i>v</i>² + 10<i>v</i> + 1 = 0, de racines −1/8 et −1/2. Hauteur de l’image : 3/8 = 0,375 m.<br>Centre de l’ellipse : <i>v</i> = −5/16 = −0,3125, alors que le centre de l’étang se projette en <i>v</i> = −1/5. Le point le plus proche de toi est agrandi davantage : la moitié proche de l’étang occupe plus de place sur la vitre.'},
 {kind:'Problème',h:'Une parabole par trois points et une direction',
  p:'On cherche la parabole qui passe par <i>O</i>(0 ; 0), <i>A</i>(2 ; 0) et <i>B</i>(0 ; 4) et dont l’axe a la direction (1 ; 1). On écrit la conique cherchée sous la forme générale <i>ax</i>² + 2<i>bxy</i> + <i>cy</i>² + 2<i>dx</i> + 2<i>ey</i> + <i>f</i> = 0, puis on traduit chaque condition, comme dans la méthode du cours.',
  parts:[
   {q:'a) Quelle forme doit avoir la partie de degré 2, <i>ax</i>² + 2<i>bxy</i> + <i>cy</i>²&nbsp;?',opts:['k(x + y)²','k(x² + y²)','k(x − y)²','kxy'],ans:2,hint:'La parabole est tangente à la droite de l’infini au point (1 : 1 : 0) : la forme doit s’annuler deux fois pour (<i>x</i> ; <i>y</i>) = (1 ; 1).',why:'<i>k</i>(<i>x</i> − <i>y</i>)² s’annule (doublement) exactement dans la direction (1 ; 1). <i>k</i>(<i>x</i> + <i>y</i>)² correspondrait à l’axe (1 ; −1).'},
   {q:'b) Avec <i>k</i> = 1 et <i>f</i> = 0 (car <i>O</i> est sur la courbe), quelle est la valeur de <i>d</i>&nbsp;?',lab:'d =',ans:-1,tol:.001,hint:'Remplace <i>A</i>(2 ; 0) dans (<i>x</i> − <i>y</i>)² + 2<i>dx</i> + 2<i>ey</i> = 0.',why:'4 + 4<i>d</i> = 0 donne <i>d</i> = −1.'},
   {q:'c) Et la valeur de <i>e</i>&nbsp;?',lab:'e =',ans:-2,tol:.001,hint:'Remplace <i>B</i>(0 ; 4).',why:'16 + 8<i>e</i> = 0 donne <i>e</i> = −2. La parabole est (<i>x</i> − <i>y</i>)² − 2<i>x</i> − 4<i>y</i> = 0.'},
   {q:'d) La droite <i>y</i> = <i>x</i> + 1, parallèle à l’axe, coupe la parabole en un point du plan. Quelle est son abscisse&nbsp;?',lab:'x =',ans:-.5,tol:.001,hint:'Sur cette droite, <i>x</i> − <i>y</i> = −1.',why:'1 − 2<i>x</i> − 4(<i>x</i> + 1) = 0 donne −6<i>x</i> − 3 = 0, soit <i>x</i> = −1/2 et le point (−0,5 ; 0,5).'},
   {q:'e) Une droite coupe une conique en deux points (comptés avec multiplicité). Où est le second point d’intersection avec <i>y</i> = <i>x</i> + 1&nbsp;?',opts:['il n’existe pas','il est confondu avec le premier','c’est le point à l’infini (1 : 1 : 0)','c’est le point (0 : 0 : 1)'],ans:2,hint:'Homogénéise l’équation de la droite et cherche ses points avec <i>z</i> = 0.',why:'La droite <i>y</i> = <i>x</i> + <i>z</i> contient (1 : 1 : 0), qui est sur la parabole puisque la conique y touche la droite de l’infini. Toute parallèle à l’axe passe par ce point.'},
  ],
  sol:'Une parabole d’axe (1 ; 1) est tangente à la droite de l’infini en (1 : 1 : 0), donc sa partie de degré 2 est <i>k</i>(<i>x</i> − <i>y</i>)². On prend <i>k</i> = 1.<br><i>O</i> donne <i>f</i> = 0, <i>A</i>(2 ; 0) donne 4 + 4<i>d</i> = 0 et <i>B</i>(0 ; 4) donne 16 + 8<i>e</i> = 0 : <i>d</i> = −1, <i>e</i> = −2.<br>La parabole est (<i>x</i> − <i>y</i>)² − 2<i>x</i> − 4<i>y</i> = 0. Sa matrice a pour déterminant −9 ≠ 0 : elle n’est pas dégénérée.<br>La droite <i>y</i> = <i>x</i> + 1 la coupe en (−0,5 ; 0,5), et le second point d’intersection est le point à l’infini (1 : 1 : 0), commun à toutes les parallèles à l’axe.'},
]},

/* =============== 6. ÉQUATION GÉNÉRALE ET MATRICES =============== */
{subj:'ga', sem:'con', id:'con-matrices', h:'Équation générale et matrices', p:'Écrire une conique avec une matrice symétrique 3 × 3, lire son type sur des déterminants, et la réduire par une rotation.', steps:[
 {h:'La matrice d’une conique',p:`Toute conique s’écrit <i>ax</i>² + 2<i>bxy</i> + <i>cy</i>² + 2<i>dx</i> + 2<i>ey</i> + <i>f</i> = 0. Avec <i>X</i> = (<i>x</i> ; <i>y</i> ; 1), c’est <div class="formula"><i>X</i><sup>T</sup> <i>A X</i> = 0, &nbsp; <i>A</i> = ${mat([['<i>a</i>','<i>b</i>','<i>d</i>'],['<i>b</i>','<i>c</i>','<i>e</i>'],['<i>d</i>','<i>e</i>','<i>f</i>']])}</div> La matrice <i>A</i> est <b>symétrique</b>. Les « 2 » de l’équation servent à ça : chaque terme croisé se partage entre deux cases.`,
  note:`Exemple : <i>x</i>² + 4<i>y</i>² − 8 = 0 a pour matrice ${mat([[1,0,0],[0,4,0],[0,0,'−8']])}. Le bloc 2 × 2 en haut à gauche, ${mat([['<i>a</i>','<i>b</i>'],['<i>b</i>','<i>c</i>']])}, porte la partie de degré 2.`},
 {h:'Remplis la matrice',p:'Pour la conique <i>x</i>² + 4<i>xy</i> − <i>y</i>² + 6<i>x</i> − 2<i>y</i> + 5 = 0, quel nombre se trouve en ligne 1, colonne 3 de <i>A</i>&nbsp;?',
  lab:'A₁₃ =', ans:3, tol:.001, why:`2<i>d</i> = 6 donne <i>d</i> = 3. La matrice complète est ${mat([[1,2,3],[2,'−1','−1'],[3,'−1',5]])} : on divise par 2 les coefficients de <i>xy</i>, <i>x</i> et <i>y</i>.`},
 {h:'Le type se lit sur un déterminant',p:`Le type de la conique dépend du déterminant δ = <i>ac</i> − <i>b</i>² du bloc 2 × 2 : <div class="formula">δ &gt; 0 : ellipse · δ = 0 : parabole · δ &lt; 0 : hyperbole</div> C’est la condition <i>b</i>² − <i>ac</i> de la géométrie projective, avec le signe opposé. Fais varier <i>c</i> dans <i>x</i>² + 2<i>xy</i> + <i>cy</i>² + 2<i>x</i> − 4 = 0 et regarde la courbe changer de nature.`,
  params:[{id:'c',l:'Coefficient c',min:-1,max:3,step:.1,v:-.5}],
  draw:v=>{ const k={a:1,b:1,c:v.c,d:1,e:0,f:-4}, P=plane({x:[-7,7],y:[-7,7],lab:2}); drawConic(P,k,[-7,7],[-7,7],{},90); return P.svg(); },
  info:v=>{ const k={a:1,b:1,c:v.c,d:1,e:0,f:-4}; return `δ = <i>c</i> − 1 = ${fmt(v.c-1)} · det <i>A</i> = 4 − 5<i>c</i> = ${fmt(4-5*v.c)} → ${typeOf(k)}`; },
  note:'Pour <i>c</i> = 0,8, la courbe se casse en deux droites : c’est le cas dégénéré, détaillé deux étapes plus loin.'},
 {kind:'Pratique',h:'Fabrique une parabole',p:'Règle <i>b</i> pour que la conique 4<i>x</i>² + 2<i>bxy</i> + <i>y</i>² − 2<i>y</i> = 0 soit une parabole.',
  params:[{id:'b',l:'b',min:-4,max:4,step:.5,v:.5}],
  draw:v=>{ const k={a:4,b:v.b,c:1,d:0,e:-1,f:0}, P=plane({x:[-4,4],y:[-2,6],lab:2}); drawConic(P,k,[-4,4],[-2,6],{c:Math.abs(v.b)===2?'var(--ok)':'var(--accent)'},90); return P.svg(); },
  info:v=>`δ = 4 · 1 − <i>b</i>² = ${fmt(4-v.b*v.b)} → ${typeOf({a:4,b:v.b,c:1,d:0,e:-1,f:0})}`,
  ok:v=>Math.abs(v.b)===2, why:'δ = 4 − <i>b</i>² = 0 donne <i>b</i> = 2 ou <i>b</i> = −2. Alors 4<i>x</i>² ± 4<i>xy</i> + <i>y</i>² = (2<i>x</i> ± <i>y</i>)², et det <i>A</i> = −4 ≠ 0 : vraie parabole.'},
 {h:'Les coniques dégénérées',p:`Si <b>det <i>A</i> = 0</b>, la conique est <b>dégénérée</b> : deux droites sécantes (δ &lt; 0), deux droites parallèles ou une droite double (δ = 0), un seul point ou rien (δ &gt; 0). Par exemple <i>x</i>² − <i>y</i>² = 0 est la paire de droites <i>y</i> = ±<i>x</i>. Pour quelle valeur de <i>f</i> la conique <i>x</i>² − <i>y</i>² + 2<i>x</i> + <i>f</i> = 0 est-elle dégénérée&nbsp;?`,
  lab:'f =', ans:1, tol:.001, why:`det ${mat([[1,0,1],[0,'−1',0],[1,0,'<i>f</i>']])} = 1 · (−<i>f</i>) + 1 · (0 + 1) = 1 − <i>f</i>, nul pour <i>f</i> = 1. On a alors (<i>x</i> + 1)² − <i>y</i>² = 0 : les droites <i>y</i> = ±(<i>x</i> + 1).`},
 {h:'Le centre',p:`Quand δ ≠ 0, la conique a un <b>centre</b> <i>C</i>(<i>x</i>₀ ; <i>y</i>₀), solution de <div class="formula">${mat([['<i>a</i>','<i>b</i>'],['<i>b</i>','<i>c</i>']])} ${mat([['<i>x</i>₀'],['<i>y</i>₀']])} = − ${mat([['<i>d</i>'],['<i>e</i>']])}</div> En translatant l’origine en <i>C</i>, les termes de degré 1 disparaissent et la constante devient <i>f′</i> = <i>dx</i>₀ + <i>ey</i>₀ + <i>f</i> = det <i>A</i> / δ. Trouve le centre de 5<i>x</i>² + 4<i>xy</i> + 8<i>y</i>² − 32<i>x</i> − 56<i>y</i> + 80 = 0 et donne son ordonnée.`,
  lab:'y₀ =', ans:3, tol:.001, why:'Ici <i>a</i> = 5, <i>b</i> = 2, <i>c</i> = 8, <i>d</i> = −16, <i>e</i> = −28. On résout 5<i>x</i>₀ + 2<i>y</i>₀ = 16 et 2<i>x</i>₀ + 8<i>y</i>₀ = 28 : <i>x</i>₀ = 2, <i>y</i>₀ = 3. Puis <i>f′</i> = −32 − 84 + 80 = −36.'},
 {h:'Tourner pour réduire',p:`Le bloc symétrique ${mat([['<i>a</i>','<i>b</i>'],['<i>b</i>','<i>c</i>']])} se <b>diagonalise</b> dans une base orthonormée : ses vecteurs propres donnent les axes de la conique, ses valeurs propres λ₁, λ₂ les nouveaux coefficients. Dans ce repère tourné, <i>ax</i>² + 2<i>bxy</i> + <i>cy</i>² devient λ₁<i>X</i>² + λ₂<i>Y</i>², et δ = λ₁λ₂. Joue avec <i>ax</i>² + 2<i>bxy</i> + <i>cy</i>² = 4.`,
  params:[{id:'a',l:'a',min:-2,max:4,step:.5,v:2},{id:'b',l:'b',min:-2,max:2,step:.5,v:1},{id:'c',l:'c',min:-2,max:4,step:.5,v:1}],
  draw:v=>{ const P=plane({x:[-5,5],y:[-5,5],lab:2}), E=eig2(v.a,v.b,v.c), u=[Math.cos(E.th),Math.sin(E.th)];
    line2(P,u[1],-u[0],0,{c:'var(--spark)',w:1.5,dash:true}); line2(P,u[0],u[1],0,{c:'var(--math)',w:1.5,dash:true});
    implicit(P,(x,y)=>v.a*x*x+2*v.b*x*y+v.c*y*y-4,[-5,5],[-5,5],{},72); return P.svg(); },
  info:v=>{ const E=eig2(v.a,v.b,v.c), z=x=>Math.abs(x)<1e-9?0:x, l1=z(E.l1), l2=z(E.l2), dl=z(v.a*v.c-v.b*v.b);
    const t=dl>0?(l1>0?'<b>ellipse</b>':'vide'):dl<0?'<b>hyperbole</b>':(l1>0||l2>0?'deux droites parallèles':'vide');
    return `λ₁ = ${fmt(l1)} (axe orange), λ₂ = ${fmt(l2)} (axe bleu) · δ = λ₁λ₂ = ${fmt(dl)} → ${fmt(l1)}<i>X</i>² ${l2<0?'−':'+'} ${fmt(Math.abs(l2))}<i>Y</i>² = 4 : ${t}`; },
  note:'L’angle θ de la rotation vérifie tan 2θ = 2<i>b</i> / (<i>a</i> − <i>c</i>). Si <i>b</i> = 0, les axes sont déjà ceux du repère.'},
 {h:'Termine la réduction',p:'Pour 5<i>x</i>² + 4<i>xy</i> + 8<i>y</i>² − 32<i>x</i> − 56<i>y</i> + 80 = 0, on a trouvé le centre (2 ; 3) et <i>f′</i> = −36. Les valeurs propres de [[5, 2], [2, 8]] sont 4 et 9. Quel est le demi-grand axe de l’ellipse&nbsp;?',
  lab:'a =', ans:3, tol:.001, why:'Trace 13 et déterminant 36 donnent λ² − 13λ + 36 = 0, soit λ = 4 et λ = 9. L’équation réduite est 4<i>X</i>² + 9<i>Y</i>² = 36, soit <i>X</i>²/9 + <i>Y</i>²/4 = 1 : demi-grand axe 3, demi-petit axe 2.'},
 {h:'La tangente par la polaire',p:`Pour un point <i>P</i> = (<i>p</i> ; <i>q</i> ; 1), la droite <div class="formula"><i>P</i><sup>T</sup> <i>A X</i> = 0</div> est la <b>polaire</b> de <i>P</i>. Si <i>P</i> est sur la conique, c’est la <b>tangente</b> en <i>P</i>. S’il est à l’extérieur, elle passe par les deux points de contact des tangentes issues de <i>P</i>. Ici la conique est <i>x</i>² + 4<i>y</i>² = 8.`,
  params:[{id:'p',l:'P : x',min:-4,max:4,step:.5,v:3.5},{id:'q',l:'P : y',min:-3,max:3,step:.5,v:1.5}],
  draw:v=>{ const P=plane({x:[-5,5],y:[-4,4],lab:2}), on=Math.abs(v.p*v.p+4*v.q*v.q-8)<1e-9; ell(P,Math.sqrt(8),Math.sqrt(2),{c:'var(--muted)'});
    line2(P,v.p,4*v.q,-8,{c:on?'var(--ok)':'var(--sci)',w:2.5}); P.dot(v.p,v.q,{l:'P'}); return P.svg(); },
  info:v=>{ const s=v.p*v.p+4*v.q*v.q-8; return `Polaire : ${poly([[v.p,'<i>x</i>'],[4*v.q,'<i>y</i>'],[-8,'']])} · <i>P</i> est ${Math.abs(s)<1e-9?'<b>sur</b> la conique : c’est la tangente':s>0?'à l’extérieur':'à l’intérieur'}`; }},
 {h:'Une tangente en un point',p:'Quelle est l’ordonnée à l’origine de la tangente à <i>x</i>² + 4<i>y</i>² = 8 au point <i>P</i>(2 ; 1)&nbsp;?',
  lab:'y =', ans:2, tol:.001, why:`<i>A</i> = diag(1 ; 4 ; −8) et <i>P</i><sup>T</sup><i>A</i> = (2 ; 4 ; −8), d’où 2<i>x</i> + 4<i>y</i> − 8 = 0, soit <i>x</i> + 2<i>y</i> = 4. En <i>x</i> = 0 : <i>y</i> = 2.`},

 {kind:'Problème',h:'Réduction complète d’une ellipse',
  p:'On étudie la conique 3<i>x</i>² + 2<i>xy</i> + 3<i>y</i>² − 8<i>x</i> − 8<i>y</i> = 0. Elle est tournée et décentrée : on veut trouver son type, son centre, ses axes et son aire, uniquement par le calcul matriciel. Rappel : l’aire d’une ellipse de demi-axes <i>p</i> et <i>q</i> vaut π<i>pq</i>.',
  fig:(()=>{ const k={a:3,b:1,c:3,d:-4,e:-4,f:0}, P=plane({x:[-1.5,3.5],y:[-1.5,3.5],lab:1}); line2(P,1,-1,0,{c:'var(--line)',w:1.5,dash:true}); line2(P,1,1,-2,{c:'var(--line)',w:1.5,dash:true}); drawConic(P,k,[-1.5,3.5],[-1.5,3.5],{},90); P.dot(1,1,{r:4,c:'var(--ink)',l:'C'}); return P.svg(); })(),
  parts:[
   {q:'a) Quel est le type de la conique&nbsp;?',opts:['une hyperbole, car δ &lt; 0','une ellipse, car δ = 8 &gt; 0','une parabole, car δ = 0','une ellipse, car det A &gt; 0'],ans:1,hint:'Identifie <i>a</i>, <i>b</i>, <i>c</i>, puis calcule δ = <i>ac</i> − <i>b</i>².',why:'<i>a</i> = 3, <i>b</i> = 1, <i>c</i> = 3 : δ = 9 − 1 = 8 &gt; 0. Et det <i>A</i> = −64 ≠ 0, donc l’ellipse n’est pas dégénérée.'},
   {q:'b) Quelle est l’abscisse du centre&nbsp;?',lab:'x₀ =',ans:1,tol:.001,hint:'<i>d</i> = <i>e</i> = −4. Résous 3<i>x</i>₀ + <i>y</i>₀ = 4 et <i>x</i>₀ + 3<i>y</i>₀ = 4.',why:'Par symétrie <i>x</i>₀ = <i>y</i>₀, puis 4<i>x</i>₀ = 4 : le centre est (1 ; 1). Alors <i>f′</i> = −4 − 4 + 0 = −8.'},
   {q:'c) Quelle est la plus petite valeur propre de [[3, 1], [1, 3]]&nbsp;?',lab:'λ =',ans:2,tol:.001,hint:'Le polynôme caractéristique est λ² − 6λ + 8.',why:'λ² − 6λ + 8 = (λ − 2)(λ − 4) : λ = 2 (vecteur propre (1 ; −1)) et λ = 4 (vecteur propre (1 ; 1)).'},
   {q:'d) Quel est le demi-grand axe&nbsp;?',lab:'a =',ans:2,tol:.001,hint:'Écris l’équation réduite λ₁<i>X</i>² + λ₂<i>Y</i>² = −<i>f′</i>.',why:'4<i>X</i>² + 2<i>Y</i>² = 8, soit <i>X</i>²/2 + <i>Y</i>²/4 = 1 : demi-grand axe 2, dans la direction (1 ; −1), et demi-petit axe √2.'},
   {q:'e) Quelle est l’aire de l’ellipse&nbsp;? Arrondis au centième.',lab:'aire =',ans:2*Math.SQRT2*Math.PI,tol:.006,hint:'Utilise les deux demi-axes trouvés.',why:'π × 2 × √2 = 2√2 π ≈ 8,89.'},
  ],
  sol:`La matrice est <i>A</i> = ${mat([[3,1,'−4'],[1,3,'−4'],['−4','−4',0]])}. δ = 8 &gt; 0 et det <i>A</i> = −64 ≠ 0 : ellipse non dégénérée.<br>Centre : 3<i>x</i>₀ + <i>y</i>₀ = 4 et <i>x</i>₀ + 3<i>y</i>₀ = 4, donc <i>C</i>(1 ; 1). Constante : <i>f′</i> = <i>dx</i>₀ + <i>ey</i>₀ + <i>f</i> = −8 (contrôle : det <i>A</i> / δ = −64/8 = −8).<br>Valeurs propres du bloc : 4 pour (1 ; 1) et 2 pour (1 ; −1). Dans le repère centré en <i>C</i> et tourné de 45° : 4<i>X</i>² + 2<i>Y</i>² = 8, soit <i>X</i>²/2 + <i>Y</i>²/4 = 1.<br>Demi-axes : 2 (le long de (1 ; −1)) et √2 (le long de (1 ; 1)). Aire : π × 2 × √2 ≈ 8,89.`},
 {kind:'Problème',h:'Une hyperbole tournée',
  p:'On étudie la conique <i>x</i>² + 4<i>xy</i> + <i>y</i>² = 6. Elle est centrée à l’origine mais tournée. On veut sa nature, ses axes, ses foyers, sa tangente au point <i>P</i>(1 ; 1) et ses asymptotes.',
  fig:(()=>{ const P=plane({x:[-5,5],y:[-5,5],lab:2}); line2(P,1,-1,0,{c:'var(--line)',w:1.5,dash:true}); [-2+Math.sqrt(3),-2-Math.sqrt(3)].forEach(m=>line2(P,m,-1,0,{c:'var(--sci)',w:1.5,dash:true}));
    implicit(P,(x,y)=>x*x+4*x*y+y*y-6,[-5,5],[-5,5],{},90); P.dot(1,1,{l:'P'}); return P.svg(); })(),
  parts:[
   {q:'a) Quelle est la nature de la conique&nbsp;?',opts:['une ellipse','une parabole','deux droites','une hyperbole'],ans:3,hint:'Calcule δ = <i>ac</i> − <i>b</i>² avec 2<i>b</i> = 4.',why:'δ = 1 − 4 = −3 &lt; 0, et det <i>A</i> = −6 × (−3) = 18 ≠ 0 : hyperbole non dégénérée.'},
   {q:'b) Quelle est la valeur propre positive de [[1, 2], [2, 1]]&nbsp;?',lab:'λ =',ans:3,tol:.001,hint:'Trace 2 et déterminant −3.',why:'λ² − 2λ − 3 = (λ − 3)(λ + 1) : λ = 3 (direction (1 ; 1)) et λ = −1 (direction (1 ; −1)).'},
   {q:'c) Quelle est la distance entre les deux foyers&nbsp;? Arrondis au centième.',lab:'FF′ =',ans:4*Math.SQRT2,tol:.006,hint:'L’équation réduite est 3<i>X</i>² − <i>Y</i>² = 6. Mets-la sous la forme <i>X</i>²/<i>a</i>² − <i>Y</i>²/<i>b</i>² = 1.',why:'<i>X</i>²/2 − <i>Y</i>²/6 = 1 : <i>c</i>² = 2 + 6 = 8, <i>c</i> = 2√2 et <i>FF′</i> = 4√2 ≈ 5,66. Les foyers sont (±2 ; ±2), sur la droite <i>y</i> = <i>x</i>.'},
   {q:'d) Quelle est l’ordonnée à l’origine de la tangente en <i>P</i>(1 ; 1)&nbsp;?',lab:'y =',ans:2,tol:.001,hint:'Calcule <i>P</i><sup>T</sup><i>A</i> avec <i>A</i> = [[1, 2, 0], [2, 1, 0], [0, 0, −6]].',why:'<i>P</i><sup>T</sup><i>A</i> = (3 ; 3 ; −6), donc 3<i>x</i> + 3<i>y</i> − 6 = 0, soit <i>y</i> = 2 − <i>x</i>. <i>P</i> est un sommet : la tangente y est perpendiculaire à l’axe <i>y</i> = <i>x</i>.'},
   {q:'e) Une asymptote a une pente comprise entre −1 et 0. Laquelle&nbsp;? Arrondis au centième.',lab:'pente =',ans:Math.sqrt(3)-2,tol:.006,hint:'Les asymptotes annulent la partie de degré 2 : pose <i>y</i> = <i>mx</i> dans <i>x</i>² + 4<i>xy</i> + <i>y</i>² = 0.',why:'1 + 4<i>m</i> + <i>m</i>² = 0 donne <i>m</i> = −2 ± √3, soit environ −0,27 et −3,73. Leur produit vaut 1 : elles sont symétriques par rapport à <i>y</i> = <i>x</i>.'},
  ],
  sol:`<i>A</i> = ${mat([[1,2,0],[2,1,0],[0,0,'−6']])}, δ = −3 &lt; 0, det <i>A</i> = 18 : hyperbole. Le centre est l’origine (pas de termes de degré 1).<br>Valeurs propres 3 et −1, de vecteurs propres (1 ; 1) et (1 ; −1). Dans le repère tourné de 45° : 3<i>X</i>² − <i>Y</i>² = 6, soit <i>X</i>²/2 − <i>Y</i>²/6 = 1.<br><i>a</i> = √2, <i>b</i> = √6, <i>c</i> = √8 = 2√2 : foyers (±2 ; ±2), <i>FF′</i> = 4√2 ≈ 5,66, excentricité <i>c</i>/<i>a</i> = 2.<br>Sommets : <i>X</i> = ±√2 sur <i>y</i> = <i>x</i>, soit (1 ; 1) et (−1 ; −1). La polaire de <i>P</i>(1 ; 1) est <i>x</i> + <i>y</i> = 2 : c’est la tangente au sommet.<br>Asymptotes : <i>y</i> = (−2 ± √3)<i>x</i>, de pentes ≈ −0,27 et ≈ −3,73. Dans le repère tourné, ce sont <i>Y</i> = ±√3 <i>X</i>.`},
]},

);
})();
