/* Déclic — examen de compétence : Volumes du prisme et du cylindre */
(()=>{
const PI=Math.PI;
const sub=(a,b)=>a.map((x,i)=>x-b[i]), sc=(k,a)=>a.map(x=>k*x), dot3=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]], mean=ps=>sc(1/ps.length,ps.reduce((s,p)=>s.map((x,i)=>x+p[i]),[0,0,0]));
const proj=(az,el)=>{ const A=rad(az), E=rad(el), ca=Math.cos(A), sa=Math.sin(A), ce=Math.cos(E), se=Math.sin(E); return p=>[p[1]*ca-p[0]*sa, p[2]*ce-(p[0]*ca+p[1]*sa)*se]; };
// vue qui s’ajuste aux points donnés
function view(pts,o={}){ const az=o.az??30, el=o.el??22, pr=proj(az,el), A=rad(az), E=rad(el); let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;
  pts.forEach(p=>{ const q=pr(p); x0=Math.min(x0,q[0]); x1=Math.max(x1,q[0]); y0=Math.min(y0,q[1]); y1=Math.max(y1,q[1]); });
  const m=.3*(x1-x0)/4, P=plane({x:[x0-m,x1+m],y:[y0-m,y1+m],grid:false,axes:false,w:o.w||240});
  const W={P,az:A,V:[Math.cos(A)*Math.cos(E),Math.sin(A)*Math.cos(E),Math.sin(E)],seg(a,b,q){ const p=pr(a),t=pr(b); P.seg(p[0],p[1],t[0],t[1],q); return W; },poly(ps,q){ P.poly(ps.map(pr),q); return W; },text(a,s,q){ const p=pr(a); P.text(p[0],p[1],s,q); return W; },svg:()=>P.svg()}; return W; }
function prismB(base,h,z0=-h/2){ const n=base.length, vs=[...base.map(([x,y])=>[x,y,z0]),...base.map(([x,y])=>[x,y,z0+h])];
  const fs=[[...Array(n).keys()],[...Array(n).keys()].map(i=>i+n)]; for(let i=0;i<n;i++) fs.push([i,(i+1)%n,(i+1)%n+n,i+n]); return {vs,fs}; }
function sidePrism(prof,L){ const n=prof.length, vs=[...prof.map(([y,z])=>[L/2,y,z]),...prof.map(([y,z])=>[-L/2,y,z])];
  const fs=[[...Array(n).keys()],[...Array(n).keys()].map(i=>i+n)]; for(let i=0;i<n;i++) fs.push([i,(i+1)%n,(i+1)%n+n,i+n]); return {vs,fs}; }
const rectB=(a,b)=>[[-a/2,-b/2],[a/2,-b/2],[a/2,b/2],[-a/2,b/2]];
function polyh(W,S,o={}){ const {vs,fs}=S, c=mean(vs);
  const vis=fs.map(f=>{ let n=cross(sub(vs[f[1]],vs[f[0]]),sub(vs[f[2]],vs[f[0]])); if(dot3(n,sub(mean(f.map(i=>vs[i])),c))<0) n=sc(-1,n); return dot3(n,W.V)>1e-9; });
  const E=new Map(); fs.forEach((f,k)=>f.forEach((a,j)=>{ const b=f[(j+1)%f.length], key=Math.min(a,b)+'-'+Math.max(a,b); if(!E.has(key)) E.set(key,{a,b,v:false}); if(vis[k]) E.get(key).v=true; }));
  E.forEach(e=>{ if(!e.v) W.seg(vs[e.a],vs[e.b],{c:'var(--muted)',w:1.5,dash:1}); });
  fs.forEach((f,k)=>{ if(vis[k]) W.poly(f.map(i=>vs[i]),{fill:(o.fc&&o.fc[k])||o.c||'var(--accent)',fo:o.fo??.2,c:null}); });
  E.forEach(e=>{ if(e.v) W.seg(vs[e.a],vs[e.b],{c:'var(--ink)',w:2.2}); }); }
const gold={fc:['var(--spark)','var(--spark)']};
const solid=(S,o=gold,v={})=>{ const W=view(S.vs,v); polyh(W,S,o); return W.svg(); };
// cylindre (rayon r, hauteur h, rayon intérieur ri pour un tube)
function cyl(r,h,o={}){ const pts=[]; for(let i=0;i<16;i++){ const t=2*PI*i/16; pts.push([r*Math.cos(t),r*Math.sin(t),-h/2],[r*Math.cos(t),r*Math.sin(t),h/2]); }
  const W=view(pts,{w:o.w||200}), N=60, t1=W.az-PI/2, P3=(t,z,R=r)=>[R*Math.cos(t),R*Math.sin(t),z], arc=(a,b,z,R=r)=>Array.from({length:N+1},(_,i)=>P3(a+(b-a)*i/N,z,R)), c=o.c||'var(--accent)';
  W.poly(arc(t1+PI,t1+2*PI,-h/2),{open:1,c:'var(--muted)',w:1.5,dash:1}).poly([...arc(t1,t1+PI,-h/2),...arc(t1+PI,t1,h/2)],{fill:c,fo:.2,c:null});
  W.poly(arc(0,2*PI,h/2),{fill:c,fo:.3,c:'var(--ink)',w:2.2}).poly(arc(t1,t1+PI,-h/2),{open:1,c:'var(--ink)',w:2.2});
  W.seg(P3(t1,-h/2),P3(t1,h/2),{c:'var(--ink)',w:2.2}).seg(P3(t1+PI,-h/2),P3(t1+PI,h/2),{c:'var(--ink)',w:2.2});
  if(o.ri) W.poly(arc(0,2*PI,h/2,o.ri),{fill:'var(--surface)',fo:1,c:'var(--ink)',w:2});
  if(o.lab) W.seg([0,0,h/2],P3(t1+PI/2,h/2),{c:'var(--ink)',w:1.5}).text(P3(t1+PI/2,h/2,r/2),o.lab,{dy:-5,s:12});
  return W.svg(); }

EXAMS['sec10-volumes']=[
 {n:'Volume d’un prisme droit',r:'Calculer le volume et l’aire d’un prisme droit',qs:[
  {q:'Quel est le volume d’un pavé de 12 cm de long, 5 cm de large et 4 cm de haut ?',fig:solid(prismB(rectB(1.25,3),1)),lab:'V =',unit:'cm³',ans:240,why:'V = 12 × 5 × 4 = 240 cm³.'},
  {q:'Un prisme droit couché a pour base un triangle de 10 cm de base et 6 cm de hauteur. Il mesure 15 cm de long. Quel est son volume ?',fig:solid(sidePrism([[-1,0],[1,0],[.2,1.2]],3),gold,{az:40}),lab:'V =',unit:'cm³',ans:450,why:'Aire de la base : 10 × 6 : 2 = 30 cm². Volume : 30 × 15 = 450 cm³.'},
  {q:'Quel est le volume d’un cube de 1,5 m d’arête ?',lab:'V =',unit:'m³',ans:3.375,tol:.001,why:'V = 1,5³ = 1,5 × 1,5 × 1,5 = 3,375 m³.'},
  {q:'Un prisme droit de 10 cm de haut a pour base un trapèze de bases 8 cm et 5 cm et de hauteur 4 cm. Quel est son volume ?',fig:solid(prismB([[-.8,-.5],[.8,-.5],[.5,.5],[-.5,.5]].map(([x,y])=>[y,x]),1.1)),lab:'V =',unit:'cm³',ans:260,why:'Aire du trapèze : (8 + 5) × 4 : 2 = 26 cm². Volume : 26 × 10 = 260 cm³.'},
  {q:'Un prisme droit de 20 cm de long a pour base un triangle rectangle de côtés 5 cm, 12 cm et 13 cm. Quel est son volume ?',fig:solid(sidePrism([[0,0],[1.6,0],[0,.7]],2.6),gold,{az:40}),lab:'V =',unit:'cm³',ans:600,why:'L’angle droit est entre les côtés de 5 cm et 12 cm (13 cm est l’hypoténuse) : aire = 5 × 12 : 2 = 30 cm². Volume : 30 × 20 = 600 cm³. Piège : 5 × 12 × 20 = 1200 oublie de diviser par 2.'}]},
 {n:'Aire d’un prisme droit',r:'Calculer le volume et l’aire d’un prisme droit',qs:[
  {q:'Quelle est l’aire totale d’un pavé de 6 cm × 4 cm × 3 cm ?',lab:'aire =',unit:'cm²',ans:108,why:'Trois paires de faces : 2 × (6 × 4 + 6 × 3 + 4 × 3) = 2 × (24 + 18 + 12) = 108 cm².'},
  {q:'Un prisme droit de 10 cm de haut a pour base un triangle équilatéral de 4 cm de côté. Quelle est son aire latérale ?',fig:solid(prismB([[.7,0],[-.35,.6],[-.35,-.6]],1.3)),lab:'aire latérale =',unit:'cm²',ans:120,why:'Aire latérale = périmètre de la base × hauteur = (3 × 4) × 10 = 120 cm².'},
  {q:'Un prisme droit de 10 cm de haut a pour base un triangle rectangle de côtés 9 cm, 12 cm et 15 cm. Quelle est son aire totale ?',lab:'aire totale =',unit:'cm²',ans:468,why:'Aire latérale : (9 + 12 + 15) × 10 = 360 cm². Base : 9 × 12 : 2 = 54 cm². Total : 360 + 2 × 54 = 468 cm².'},
  {q:'Pour calculer l’aire latérale d’un prisme droit, on multiplie…',opts:['l’aire de la base par la hauteur','le périmètre de la base par 2','le périmètre de la base par la hauteur','l’aire de la base par 2'],ans:2,why:'Les faces latérales forment une bande qui fait le tour de la base : longueur = périmètre de la base, largeur = hauteur. L’aire de la base × la hauteur donne le volume.'}]},
 {n:'Volume et aire du cylindre',r:'Calculer le volume et l’aire d’un cylindre',qs:[
  {q:'Quel est le volume d’un cylindre de rayon 4 cm et de hauteur 10 cm ? Arrondis au cm³.',fig:cyl(.8,1.8,{lab:'4 cm'}),lab:'V ≈',unit:'cm³',ans:502.65,tol:.6,show:'503',why:'V = π × 4² × 10 = 160π ≈ 503 cm³.'},
  {q:'Un pot cylindrique a un diamètre de 10 cm et une hauteur de 8 cm. Quel est son volume ? Arrondis au cm³.',lab:'V ≈',unit:'cm³',ans:628.32,tol:.6,show:'628',why:'Rayon : 10 : 2 = 5 cm. V = π × 5² × 8 = 200π ≈ 628 cm³.'},
  {q:'Quelle est l’aire latérale d’un cylindre de rayon 5 cm et de hauteur 12 cm ? Arrondis au cm².',lab:'aire latérale ≈',unit:'cm²',ans:376.99,tol:.6,show:'377',why:'Aire latérale = 2 × π × 5 × 12 = 120π ≈ 377 cm².'},
  {q:'Quelle est l’aire totale d’un cylindre de rayon 2 cm et de hauteur 5 cm ? Arrondis au cm².',lab:'aire totale ≈',unit:'cm²',ans:87.96,tol:.6,show:'88',why:'Aire latérale : 2π × 2 × 5 = 20π. Deux disques : 2 × π × 2² = 8π. Total : 28π ≈ 88 cm².'},
  {q:'Pour un cylindre de rayon 3 cm et de hauteur 5 cm, Tom écrit V = π × 6 × 5. Quelle est son erreur ?',opts:['Il a calculé 2 × 3 au lieu de 3² = 9','Il fallait encore multiplier par 2','Il n’y a pas d’erreur','Il fallait utiliser le diamètre au carré'],ans:0,why:'<i>r</i>² = 3 × 3 = 9, pas 2 × 3. Le bon calcul est V = π × 9 × 5 = 45π ≈ 141,4 cm³.'}]},
 {n:'Convertir volumes, capacités et masses',r:'Convertir volumes et capacités',qs:[
  {q:'Convertis 3,5 m³ en litres.',lab:'3,5 m³ =',unit:'L',ans:3500,why:'1 m³ = 1000 dm³ = 1000 L, donc 3,5 m³ = 3500 L.'},
  {q:'Convertis 250 cm³ en litres.',lab:'250 cm³ =',unit:'L',ans:.25,tol:1e-6,why:'250 cm³ = 250 : 1000 dm³ = 0,25 dm³ = 0,25 L.'},
  {q:'Convertis 1,2 L en cm³.',lab:'1,2 L =',unit:'cm³',ans:1200,why:'1,2 L = 1,2 dm³ = 1,2 × 1000 cm³ = 1200 cm³.'},
  {q:'Une piscine contient 40 m³ d’eau. Quelle est la masse de cette eau, environ, en tonnes ?',lab:'masse ≈',unit:'t',ans:40,why:'40 m³ = 40 000 L. 1 L d’eau pèse environ 1 kg : 40 000 kg = 40 t (1 m³ d’eau ≈ 1 t).'},
  {q:'1 dm³ est égal à…',opts:['10 cm³','100 cm³','1000 cm³','1 mL'],ans:2,why:'Un cube de 1 dm = 10 cm d’arête contient 10 × 10 × 10 = 1000 cubes de 1 cm³. C’est aussi 1 L = 1000 mL.'}]},
 {n:'Hauteur manquante',r:'Trouver une hauteur manquante',qs:[
  {q:'On verse 30 L d’eau dans un aquarium dont le fond mesure 40 cm × 25 cm. À quelle hauteur monte l’eau ?',fig:(()=>{ const big=prismB(rectB(1,1.6),1.2,0), wat=prismB(rectB(1,1.6),.72,0), W=view(big.vs); polyh(W,wat,{c:'var(--math)',fo:.35}); polyh(W,big,{c:'var(--muted)',fo:.04}); return W.svg(); })(),
   lab:'h =',unit:'cm',ans:30,why:'30 L = 30 000 cm³. Fond : 40 × 25 = 1000 cm². h = 30 000 : 1000 = 30 cm.'},
  {q:'Un pavé a un volume de 360 cm³ et une base de 8 cm × 5 cm. Quelle est sa hauteur ?',lab:'h =',unit:'cm',ans:9,why:'Aire de la base : 40 cm². h = 360 : 40 = 9 cm.'},
  {q:'Une boîte cylindrique de 5 cm de rayon doit contenir exactement 1 L. Quelle doit être sa hauteur ? Arrondis au dixième.',lab:'h ≈',unit:'cm',ans:12.73,tol:.051,show:'12,7',why:'1 L = 1000 cm³. Aire de la base : π × 5² = 25π ≈ 78,54 cm². h = 1000 : (25π) ≈ 12,7 cm.'},
  {q:'Un prisme droit a une base de 12 cm² et un volume de 96 cm³. Quelle est sa hauteur ?',lab:'h =',unit:'cm',ans:8,why:'h = V : aire de la base = 96 : 12 = 8 cm. Vérification : 12 × 8 = 96.'}]},
 {n:'Solides composés',r:'Calculer le volume d’un solide composé',qs:[
  {q:'Une cabane est formée d’un pavé de 10 m × 8 m × 6 m surmonté d’un toit en prisme : triangle de 8 m de base et 3 m de haut, 10 m de long. Quel est son volume ?',fig:(()=>{ const vs=[[4,-5,0],[4,5,0],[-4,5,0],[-4,-5,0],[4,-5,6],[4,5,6],[-4,5,6],[-4,-5,6],[0,-5,9],[0,5,9]].map(p=>sc(.15,p)), S={vs,fs:[[0,1,2,3],[0,1,5,4],[3,2,6,7],[0,4,8,7,3],[1,5,9,6,2],[4,5,9,8],[7,6,9,8]]}, W=view(vs,{az:35}); polyh(W,S,{c:'var(--other)'}); return W.svg(); })(),
   lab:'V =',unit:'m³',ans:600,why:'Pavé : 10 × 8 × 6 = 480 m³. Toit : (8 × 3 : 2) × 10 = 120 m³. Total : 480 + 120 = 600 m³.'},
  {q:'Un cube de 10 cm d’arête est percé de part en part d’un trou carré de 4 cm de côté. Quel volume de matière reste-t-il ?',lab:'V =',unit:'cm³',ans:840,why:'Cube : 1000 cm³. Trou : un pavé de 4 × 4 × 10 = 160 cm³. Reste : 1000 − 160 = 840 cm³.'},
  {q:'Un tuyau est un cylindre de 5 cm de rayon et 20 cm de long, creusé d’un cylindre de 3 cm de rayon. Quel est le volume de matière ? Arrondis au cm³.',fig:cyl(.8,1.6,{ri:.48,c:'var(--muted)'}),lab:'V ≈',unit:'cm³',ans:1005.31,tol:.6,show:'1005',why:'π × 5² × 20 − π × 3² × 20 = 500π − 180π = 320π ≈ 1005 cm³.'},
  {q:'Une marche en béton a un profil en L : un rectangle couché de 6 dm × 2 dm, surmonté à gauche d’un rectangle de 2 dm de large et 4 dm de haut. La marche mesure 3 dm de profondeur. Quel est son volume ?',fig:(()=>{ const P=plane({x:[-1,8.4],y:[-1.2,6.8],grid:false,axes:false,w:200}); P.poly([[0,0],[6,0],[6,2],[2,2],[2,6],[0,6]],{fill:'var(--other)',fo:.3,c:'var(--ink)',w:2}).text(3,0,'6 dm',{a:'middle',dy:15,s:12}).text(6,1,'2 dm',{dx:4,s:12}).text(2,4,'4 dm',{dx:4,s:12}).text(1,6,'2 dm',{a:'middle',dy:-5,s:12}); return P.svg(); })(),
   lab:'V =',unit:'dm³',ans:60,why:'Profil : 6 × 2 + 2 × 4 = 12 + 8 = 20 dm². C’est un prisme couché : V = 20 × 3 = 60 dm³.'}]},
 {n:'Vitesse, distance et durée',r:'Calculer une vitesse, une distance ou une durée',qs:[
  {q:'Une voiture roule à 90 km/h pendant 2 h 30 min. Quelle distance parcourt-elle ?',lab:'d =',unit:'km',ans:225,why:'2 h 30 min = 2,5 h. d = 90 × 2,5 = 225 km.'},
  {q:'Un faucon vole à 20 m/s. Quelle est sa vitesse en km/h ?',lab:'v =',unit:'km/h',ans:72,why:'1 m/s = 3,6 km/h, donc 20 m/s = 20 × 3,6 = 72 km/h.'},
  {q:'Tu parcours 15 km à vélo à 20 km/h de moyenne. Combien de minutes dure le trajet ?',lab:'durée =',unit:'min',ans:45,why:'durée = 15 : 20 = 0,75 h = 0,75 × 60 = 45 min.'},
  {q:'1 h 15 min, c’est…',opts:['1,15 h','1,25 h','1,5 h','0,75 h'],ans:1,why:'15 min = 15 : 60 h = 0,25 h, donc 1 h 15 min = 1,25 h. Le piège 1,15 h confond minutes et centièmes d’heure.'}]},
];
})();
