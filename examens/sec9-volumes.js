/* Déclic — examen de compétence : Volumes et mesures */
(()=>{
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]], add3=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]], mul3=(k,a)=>[k*a[0],k*a[1],k*a[2]];
const crs=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]], dt=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const mean=pts=>mul3(1/pts.length,pts.reduce(add3,[0,0,0]));
const vdir=(az,el)=>[Math.cos(rad(az))*Math.cos(rad(el)),Math.sin(rad(az))*Math.cos(rad(el)),Math.sin(rad(el))];
function solid(V,Fs,o={}){
  const az=o.az??30, el=o.el??22, S=o.S||space({az,el,r:o.r||4,axes:false,w:o.w||260}), d=vdir(az,el), C=mean(V);
  const vis=Fs.map(f=>{ const P=f.map(i=>V[i]); let n=crs(sub(P[1],P[0]),sub(P[2],P[0])); if(dt(n,sub(mean(P),C))<0) n=mul3(-1,n); return dt(n,d)>1e-9; });
  const E=new Map(); Fs.forEach((f,k)=>f.forEach((a,j)=>{ const b=f[(j+1)%f.length], key=Math.min(a,b)+'-'+Math.max(a,b); if(!E.has(key)) E.set(key,[a,b,[]]); E.get(key)[2].push(k); }));
  const sm=o.smooth||(()=>false), hid=[], vsb=[];
  E.forEach(([a,b,fs])=>{ if(fs.length===2&&sm(fs[0])&&sm(fs[1])){ if(vis[fs[0]]!==vis[fs[1]]) vsb.push([a,b]); return; } (fs.some(k=>vis[k])?vsb:hid).push([a,b]); });
  hid.forEach(([a,b])=>S.seg(V[a],V[b],{c:'var(--muted)',w:1.6,dash:1}));
  Fs.forEach((f,k)=>{ if(vis[k]) S.poly(f.map(i=>V[i]),{fill:(o.fc&&o.fc(k))||'var(--accent)',fo:o.fo??.2,c:null}); });
  vsb.forEach(([a,b])=>S.seg(V[a],V[b],{c:'var(--ink)',w:2.5}));
  return S;
}
const boxV=(a,b,c)=>{ const V=[]; for(const z of [-c/2,c/2]) for(const [x,y] of [[a/2,-b/2],[a/2,b/2],[-a/2,b/2],[-a/2,-b/2]]) V.push([x,y,z]); return V; };
const BOXF=[[0,1,2,3],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]];
const rng=n=>[...Array(n).keys()];
const ngon=(n,R,z)=>rng(n).map(k=>{ const t=2*Math.PI*k/n+Math.PI/n; return [R*Math.cos(t),R*Math.sin(t),z]; });
function prism(n,az=25){ const V=[...ngon(n,1.6,-1.3),...ngon(n,1.6,1.3)], F=[rng(n),rng(n).map(i=>i+n)]; for(let i=0;i<n;i++) F.push([i,(i+1)%n,n+(i+1)%n,n+i]); return solid(V,F,{az,r:3,fc:k=>k<2?'var(--spark)':'var(--accent)'}).svg(); }
function pyr(n,az=25){ const V=[...ngon(n,1.7,-1.4),[0,0,1.4]], F=[rng(n)]; for(let i=0;i<n;i++) F.push([i,(i+1)%n,n]); return solid(V,F,{az,r:3,fc:k=>k<1?'var(--spark)':'var(--accent)'}).svg(); }
function cubes(list,o={}){
  const az=o.az??30, el=o.el??28, d=vdir(az,el), S=space({az,el,r:o.r||3.6,axes:false,w:o.w||240});
  const has=new Set(list.map(c=>c.join(','))), H=(i,j,k)=>has.has([i,j,k].join(','));
  const bx=[Math.max(...list.map(c=>c[0]))+1,Math.max(...list.map(c=>c[1]))+1,Math.max(...list.map(c=>c[2]))+1], P=(x,y,z)=>sub([x,y,z],mul3(.5,bx));
  const face=(pts,fo)=>{ S.poly(pts,{fill:'var(--surface)',fo:1,c:null}); S.poly(pts,{fill:'var(--accent)',fo,c:'var(--ink)',w:1.3}); };
  for(const [i,j,k] of [...list].sort((p,q)=>dt(p,d)-dt(q,d))){
    if(!H(i+1,j,k)) face([P(i+1,j,k),P(i+1,j+1,k),P(i+1,j+1,k+1),P(i+1,j,k+1)],.55);
    if(!H(i,j+1,k)) face([P(i,j+1,k),P(i+1,j+1,k),P(i+1,j+1,k+1),P(i,j+1,k+1)],.8);
    if(!H(i,j,k+1)) face([P(i,j,k+1),P(i+1,j,k+1),P(i+1,j+1,k+1),P(i,j+1,k+1)],.25); }
  return S.svg();
}
const stack=h=>{ const L=[]; h.forEach((r,i)=>r.forEach((n,j)=>{ for(let k=0;k<n;k++) L.push([i,j,k]); })); return L; };
const PAVE=[]; for(let i=0;i<3;i++) for(let j=0;j<4;j++) for(let k=0;k<2;k++) PAVE.push([i,j,k]);
const triPrism=(b,t,L,lb)=>{ const V=[[b/2,-L/2,-t/2],[-b/2,-L/2,-t/2],[-b/2,-L/2,t/2],[b/2,L/2,-t/2],[-b/2,L/2,-t/2],[-b/2,L/2,t/2]], F=[[0,1,2],[3,4,5],[0,1,4,3],[1,2,5,4],[0,2,5,3]];
  const S=solid(V,F,{az:40,el:22,r:2.6,fc:k=>k<2?'var(--spark)':'var(--accent)',fo:.3}); S.text([0,L/2,-t/2],lb[0],{dx:6,dy:16,s:12}).text([-b/2,L/2,0],lb[1],{dx:8,s:12}).text([b/2,0,-t/2],lb[2],{a:'middle',dy:18,s:12}); return S.svg(); };
EXAMS['sec9-volumes']=[
 {n:'Volume en cubes-unités', r:'Compter des cubes-unités', qs:[
   {q:'Ce pavé plein est fait de cubes de 1 cm d’arête. Quel est son volume&nbsp;?', fig:cubes(PAVE), unit:'cm³', ans:24, why:'Une couche contient 4 × 3 = 12 cubes, et il y a 2 couches : 12 × 2 = 24 cm³.'},
   {q:'Combien de cubes compte cet assemblage&nbsp;? Toutes les piles sont posées sur le sol, sur 4 cases (2 rangées de 2).', fig:cubes(stack([[3,2],[1,1]])), lab:'Cubes :', ans:7, why:'On compte pile par pile : 3 + 2 au fond, 1 + 1 devant. Total : 7 cubes.'},
   {q:'Quel est le volume d’un cube de 3 cm d’arête&nbsp;?', unit:'cm³', ans:27, why:'3 × 3 × 3 = 27 cm³ : 3 couches de 3 × 3 = 9 cubes.'},
   {q:'On double l’arête d’un cube. Par combien son volume est-il multiplié&nbsp;?', lab:'×', ans:8, why:'(2 × arête)³ = 2 × 2 × 2 × arête³ : le volume est multiplié par 8, pas par 2.'},
 ]},
 {n:'Volume et aire totale du pavé', r:'Volume et aire totale d’un pavé', qs:[
   {q:'Quel est le volume d’un pavé de 8 cm sur 5 cm sur 3 cm&nbsp;?', unit:'cm³', ans:120, why:'8 × 5 × 3 = 40 × 3 = 120 cm³.'},
   {q:'Quelle est l’aire totale d’un pavé de 8 cm sur 5 cm sur 3 cm&nbsp;?', unit:'cm²', ans:158, why:'2 × (8 × 5) + 2 × (8 × 3) + 2 × (5 × 3) = 80 + 48 + 30 = 158 cm².'},
   {q:'Quelle est l’aire totale d’un cube de 4 cm d’arête&nbsp;?', unit:'cm²', ans:96, why:'6 faces carrées de 4 × 4 = 16 cm² : 6 × 16 = 96 cm².'},
   {q:'Une boîte en forme de pavé a un volume de 360 cm³. Son fond mesure 12 cm sur 6 cm. Quelle est sa hauteur&nbsp;?', unit:'cm', ans:5, why:'Le fond contient 12 × 6 = 72 cubes par couche. 360 ÷ 72 = 5 couches : la hauteur vaut 5 cm.'},
   {q:'Un élève écrit : « Le volume de la boîte vaut 240 cm². » Quelle est son erreur&nbsp;?', opts:['Il fallait additionner les dimensions','L’unité : un volume s’exprime en cm³','Il fallait diviser par 2','Il n’y a pas d’erreur'], ans:1, why:'Un volume compte des cubes : on l’exprime en unités cubes (cm³). Les cm² servent pour les aires.'},
 ]},
 {n:'Volume et aire du prisme droit', r:'Volume et aire totale d’un prisme droit', qs:[
   {q:'Ce prisme droit a pour base un triangle rectangle dont les côtés de l’angle droit mesurent 6 cm et 4 cm. Sa hauteur est 10 cm. Quel est son volume&nbsp;?', fig:triPrism(1.8,1.2,3,['6 cm','4 cm','10 cm']), unit:'cm³', ans:120, why:'Aire de la base : 6 × 4 ÷ 2 = 12 cm². Volume : 12 × 10 = 120 cm³.'},
   {q:'Un prisme droit a pour base un trapèze de bases 5 cm et 3 cm et de hauteur 4 cm. Le prisme mesure 7 cm de haut. Quel est son volume&nbsp;?', unit:'cm³', ans:112, why:'Aire de la base : (5 + 3) × 4 ÷ 2 = 16 cm². Volume : 16 × 7 = 112 cm³.'},
   {q:'Un prisme droit a pour base un triangle de côtés 3 cm, 4 cm et 5 cm. Sa hauteur est 8 cm. Quelle est son aire latérale (les rectangles seulement)&nbsp;?', unit:'cm²', ans:96, why:'Aire latérale = périmètre de la base × hauteur = (3 + 4 + 5) × 8 = 12 × 8 = 96 cm².'},
   {q:'Un prisme droit de hauteur 8 cm a pour base un triangle rectangle de côtés 3 cm, 4 cm et 5 cm (l’angle droit est entre les côtés de 3 et 4 cm). Quelle est son aire totale&nbsp;?', unit:'cm²', ans:108, why:'Aire latérale : (3 + 4 + 5) × 8 = 96 cm². Chaque base : 3 × 4 ÷ 2 = 6 cm². Aire totale : 96 + 2 × 6 = 108 cm².'},
   {q:'Un prisme droit a une base de 15 cm² et un volume de 90 cm³. Quelle est sa hauteur&nbsp;?', unit:'cm', ans:6, why:'Aire de la base × hauteur = volume : 15 × hauteur = 90, donc hauteur = 90 ÷ 15 = 6 cm.'},
 ]},
 {n:'Volumes et capacités', r:'Convertir des volumes, des capacités et des masses', qs:[
   {q:'Convertis 3 dm³ en cm³.', unit:'cm³', ans:3000, why:'1 dm³ = 1000 cm³ (10 × 10 × 10), donc 3 dm³ = 3000 cm³.'},
   {q:'Une citerne contient 2,5 m³ d’eau. Combien de litres cela fait-il&nbsp;?', unit:'L', ans:2500, why:'2,5 m³ = 2500 dm³ et 1 dm³ = 1 L : 2500 L.'},
   {q:'Convertis 750 mL en litres.', unit:'L', ans:.75, tol:.001, why:'1 L = 1000 mL, donc 750 ÷ 1000 = 0,75 L.'},
   {q:'Un récipient a un volume de 4500 cm³. Quelle est sa capacité en litres&nbsp;?', unit:'L', ans:4.5, tol:.001, why:'4500 cm³ = 4,5 dm³ (÷ 1000) et 1 dm³ = 1 L : 4,5 L.'},
   {q:'1 m³, c’est…', opts:['10 L','100 L','1000 L','1 000 000 L'], ans:2, why:'1 m³ = 1000 dm³ et 1 dm³ = 1 L : 1 m³ = 1000 L.'},
   {q:'Une bouteille contient 1,5 L. Combien de cm³ cela fait-il&nbsp;?', unit:'cm³', ans:1500, why:'1,5 L = 1500 mL, et 1 mL = 1 cm³ : 1500 cm³.'},
 ]},
 {n:'Masses', r:'Les masses : grammes, kilos et tonnes', qs:[
   {q:'Convertis 2,3 kg en grammes.', unit:'g', ans:2300, why:'1 kg = 1000 g, donc 2,3 × 1000 = 2300 g.'},
   {q:'Un camion transporte 4500 kg de sable. Combien de tonnes cela fait-il&nbsp;?', unit:'t', ans:4.5, tol:.001, why:'1 t = 1000 kg, donc 4500 ÷ 1000 = 4,5 t.'},
   {q:'Convertis 250 g en kg.', unit:'kg', ans:.25, tol:.001, why:'250 ÷ 1000 = 0,25 kg.'},
   {q:'Un aquarium en forme de pavé mesure 50 cm sur 20 cm sur 30 cm. Il est plein d’eau. Quelle est la masse de l’eau&nbsp;?', unit:'kg', ans:30, why:'Volume : 50 × 20 × 30 = 30 000 cm³ = 30 dm³ = 30 L. Comme 1 L d’eau pèse 1 kg, l’eau pèse 30 kg.'},
 ]},
 {n:'Durées et horaires', r:'Calculer une durée ou un horaire', qs:[
   {q:'Combien de minutes y a-t-il dans 3 h 20 min&nbsp;?', unit:'min', ans:200, why:'3 × 60 + 20 = 180 + 20 = 200 min.'},
   {q:'150 minutes, c’est…', opts:['1 h 50 min','2 h 50 min','2 h 30 min','1 h 30 min'], ans:2, why:'150 = 2 × 60 + 30 : 2 h 30 min. On ne lit pas 150 min comme 1 h 50 min.'},
   {q:'Un train part à 7 h 48 et arrive à 10 h 15. Combien de minutes dure le trajet&nbsp;?', unit:'min', ans:147, why:'7 h 48 → 8 h : 12 min ; 8 h → 10 h : 2 h ; 10 h → 10 h 15 : 15 min. Total : 2 h 27 min = 147 min.'},
   {q:'Un film commence à 19 h 50 et dure 2 h 25. À quelle heure finit-il&nbsp;?', opts:['21 h 75','22 h 15','22 h 05','21 h 15'], ans:1, why:'19 h 50 + 2 h 25 = 21 h 75 min ; 75 min = 1 h 15 min, donc 22 h 15.'},
   {q:'Combien de minutes font 1,25 h&nbsp;?', unit:'min', ans:75, why:'0,25 h = 0,25 × 60 = 15 min, donc 1,25 h = 60 + 15 = 75 min.'},
 ]},
 {n:'Unités anciennes et système métrique', r:'Pieds, pouces et mètre : l’histoire des mesures', qs:[
   {q:'Un écran a une diagonale de 40 pouces. Combien de centimètres cela fait-il&nbsp;? (1 pouce = 2,54 cm)', unit:'cm', ans:101.6, tol:.001, why:'40 × 2,54 = 101,6 cm.'},
   {q:'Un joueur de basket mesure 6 pieds. Combien de centimètres cela fait-il&nbsp;? (1 pied = 30,48 cm)', unit:'cm', ans:182.88, tol:.001, why:'6 × 30,48 = 182,88 cm, soit environ 1,83 m.'},
   {q:'Pourquoi a-t-on créé le système métrique&nbsp;?', opts:['Parce que le pied était trop petit','Pour avoir les mêmes unités partout, qui vont de 10 en 10','Pour mesurer les durées','Parce que le pouce n’existait pas encore'], ans:1, why:'Chaque ville avait ses propres pieds et pouces. Le système métrique (1795) donne une seule unité, le mètre, et des multiples de 10 en 10.'},
 ]},
];
})();
