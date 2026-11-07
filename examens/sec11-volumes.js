/* Déclic — examen de compétence : Volumes et autres grandeurs */
(()=>{
const D=Math.PI/180;
const circ=(r,z)=>t=>[r*Math.cos(t),r*Math.sin(t),z];
const mid=pts=>pts.reduce((m,p)=>[m[0]+p[0]/pts.length,m[1]+p[1]/pts.length,m[2]+p[2]/pts.length],[0,0,0]);
const HID={c:'var(--muted)',w:1.5,dash:true};
function sc(az=30,el=20,r=5){ const S=space({az,el,r,axes:false}); S.az=az*D; S.ce=Math.cos(el*D); S.se=Math.sin(el*D); return S; }
function c3(S,f,vis,q,n=96){ let run=[],cur=null; const out=()=>{ if(run.length>1) S.P.poly(run,Object.assign({open:true},cur===false?HID:q)); };
  for(let i=0;i<=n;i++){ const t=2*Math.PI*i/n, v=vis?!!vis(t):true, p=S.pr(...f(t)); if(cur!==null&&v!==cur){ run.push(p); out(); run=[p]; } else run.push(p); cur=v; } out(); }
function cone(S,r,h,z0,col='var(--accent)'){ const A=[0,0,z0+h], q={c:col,w:2.5}, rim=circ(r,z0), k=-r*S.se/(h*S.ce), a=Math.acos(k), t1=S.az-a, t2=S.az+a;
  const pts=[S.pr(...A)]; for(let i=0;i<=48;i++) pts.push(S.pr(...rim(t1+(t2-t1)*i/48))); S.P.poly(pts,{fill:col,fo:.15,c:null});
  S.seg(A,rim(t1),q); S.seg(A,rim(t2),q); c3(S,rim,t=>Math.cos(t-S.az)>k,q); return A; }
function cyl(S,r,z0,z1,col='var(--accent)',noTop=false){ const q={c:col,w:2.5}, b=circ(r,z0), t=circ(r,z1), a1=S.az-Math.PI/2, a2=S.az+Math.PI/2, pts=[];
  for(let i=0;i<=48;i++) pts.push(S.pr(...b(a1+(a2-a1)*i/48))); for(let i=48;i>=0;i--) pts.push(S.pr(...t(a1+(a2-a1)*i/48)));
  S.P.poly(pts,{fill:col,fo:.15,c:null}); S.seg(b(a1),t(a1),q); S.seg(b(a2),t(a2),q); c3(S,b,u=>Math.cos(u-S.az)>0,q); if(!noTop) c3(S,t,null,q); }

// cône : rayon 5 cm, génératrice 13 cm
const figCone=(()=>{ const S=sc(30,18), z0=-2.3, A=cone(S,1.85,4.45,z0), O=[0,0,z0], B=circ(1.85,z0)(S.az+Math.PI/2);
  S.seg(A,O,{c:'var(--spark)',w:2,dash:true}).seg(O,B,{c:'var(--spark)',w:2});
  S.text(mid([O,B]),'5 cm',{a:'middle',dy:18,c:'var(--spark)'}).text(mid([A,B]),'13 cm',{dx:8}).text(mid([A,O]),'h ?',{dx:-34,c:'var(--spark)'});
  return S.svg(); })();
// gélule : cylindre de rayon 1 cm et de longueur 4 cm, fermé par deux demi-boules (vue de face)
const figGelule=(()=>{ const P=plane({x:[-4.2,4.2],y:[-1.8,1.8],grid:false,axes:false}), pts=[];
  for(let i=0;i<=30;i++){ const t=-Math.PI/2+Math.PI*i/30; pts.push([2+Math.cos(t),Math.sin(t)]); }
  for(let i=0;i<=30;i++){ const t=Math.PI/2+Math.PI*i/30; pts.push([-2+Math.cos(t),Math.sin(t)]); }
  P.poly(pts,{fill:'var(--other)',fo:.2,c:'var(--other)',w:2.5}).seg(-2,-1,-2,1,{c:'var(--other)',w:1.5,dash:true}).seg(2,-1,2,1,{c:'var(--other)',w:1.5,dash:true});
  P.text(0,-1,'4 cm',{a:'middle',dy:16,s:12}).seg(2,0,3,0,{c:'var(--spark)',w:2}).text(2.5,0,'1 cm',{a:'middle',dy:-6,s:12});
  return P.svg(); })();
// cylindre surmonté d’un cône (fusée)
const figFusee=(()=>{ const S=sc(30,18), k=.28, z0=-2.6, z1=z0+12*k; cyl(S,3*k,z0,z1,'var(--accent)',true); cone(S,3*k,4*k,z1,'var(--other)');
  S.text(circ(3*k,(z0+z1)/2)(S.az+Math.PI/2),'12 cm',{dx:8}).text(circ(3*k,z1+2*k)(S.az+Math.PI/2),'4 cm',{dx:8,c:'var(--other)'}).text(circ(3*k,z0)(S.az+Math.PI/2),'r = 3 cm',{dx:6,dy:14});
  return S.svg(); })();

EXAMS['sec11-volumes']=[
 {n:'Volume de la pyramide et du cône', r:'Calculer le volume d’une pyramide ou d’un cône', qs:[
   {q:'Une pyramide a une base carrée de 9 cm de côté et une hauteur de 10 cm. Quel est son volume&nbsp;?', unit:'cm³', ans:270, why:'B = 9 · 9 = 81 cm². V = 81 · 10 : 3 = 270 cm³.'},
   {q:'Une pyramide a pour base un triangle de base 6 cm et de hauteur 4 cm. La pyramide a une hauteur de 7 cm. Quel est son volume&nbsp;?', unit:'cm³', ans:28, why:'B = 6 · 4 : 2 = 12 cm². V = 12 · 7 : 3 = 28 cm³.'},
   {q:'Quel est le volume d’un cône de rayon 6 cm et de hauteur 5 cm, arrondi au centième&nbsp;?', unit:'cm³', ans:188.50, tol:.006, why:'V = π · 6² · 5 : 3 = π · 36 · 5 : 3 = 60π ≈ 188,50 cm³.'},
   {q:'Quel est le volume de ce cône, arrondi au centième&nbsp;?', fig:figCone, unit:'cm³', ans:314.16, tol:.006, why:'D’abord la hauteur : h² = 13² − 5² = 144, h = 12 cm. Puis V = π · 5² · 12 : 3 = 100π ≈ 314,16 cm³. Attention : 13 cm est la génératrice, pas la hauteur.'},
   {q:'Un cône et un cylindre ont la même base et la même hauteur. Le cylindre contient 2,4 L. Combien contient le cône&nbsp;?', opts:['7,2 L','1,2 L','0,8 L','2,4 L'], ans:2, why:'Le cône vaut le tiers du cylindre de même base et même hauteur : 2,4 : 3 = 0,8 L.'},
 ]},
 {n:'Aire de la pyramide', r:'Calculer l’aire d’une pyramide', qs:[
   {q:'Une pyramide régulière à base carrée a 10 cm de côté et un apothème de 12 cm. Quelle est son aire latérale&nbsp;?', unit:'cm²', ans:240, why:'Une face : 10 · 12 : 2 = 60 cm². Quatre faces : 240 cm². Ou : périmètre 40 cm, et 40 · 12 : 2 = 240 cm².'},
   {q:'Une pyramide régulière à base carrée a 12 cm de côté et 8 cm de hauteur. Quelle est son aire totale&nbsp;?', unit:'cm²', ans:384, why:'Apothème : √(8² + 6²) = √100 = 10 cm. Aire latérale : 4 · 12 · 10 : 2 = 240 cm². Base : 144 cm². Total : 384 cm².'},
   {q:'Une pyramide régulière a une base hexagonale de 4 cm de côté et un apothème de 9 cm. Quelle est son aire latérale&nbsp;?', unit:'cm²', ans:108, why:'Périmètre de la base : 6 · 4 = 24 cm. Aire latérale : 24 · 9 : 2 = 108 cm².'},
   {q:'Quelle est l’aire totale d’un cône de rayon 6 cm et de génératrice 10 cm, arrondie au centième&nbsp;?', unit:'cm²', ans:301.59, tol:.006, why:'Aire latérale π · 6 · 10 = 60π, base π · 6² = 36π. Total : 96π ≈ 301,59 cm².'},
 ]},
 {n:'Volume et aire de la sphère', r:'Calculer le volume et l’aire d’une sphère', qs:[
   {q:'Quel est le volume d’une boule de rayon 3 cm, arrondi au centième&nbsp;?', unit:'cm³', ans:113.10, tol:.006, why:'V = 4/3 · π · 3³ = 4/3 · π · 27 = 36π ≈ 113,10 cm³.'},
   {q:'Quelle est l’aire d’une sphère de rayon 5 cm, arrondie au centième&nbsp;?', unit:'cm²', ans:314.16, tol:.006, why:'A = 4π · 5² = 100π ≈ 314,16 cm².'},
   {q:'Une boule a un diamètre de 10 cm. Quel est son volume, arrondi au centième&nbsp;?', unit:'cm³', ans:523.60, tol:.006, why:'Le rayon vaut 5 cm. V = 4/3 · π · 125 = 500π/3 ≈ 523,60 cm³.'},
   {q:'Un bol a la forme d’une demi-boule de rayon intérieur 6 cm. Quel volume peut-il contenir, arrondi au centième&nbsp;?', unit:'cm³', ans:452.39, tol:.006, why:'Boule entière : 4/3 · π · 216 = 288π. La moitié : 144π ≈ 452,39 cm³.'},
   {q:'On double le rayon d’une boule. Par combien son volume est-il multiplié&nbsp;?', opts:['par 2','par 4','par 8','par 6'], ans:2, why:'Le rayon est au cube dans la formule : (2r)³ = 2 · 2 · 2 · r³ = 8r³. Le volume est multiplié par 8.'},
 ]},
 {n:'Solides composés', r:'Volume d’un solide composé', qs:[
   {q:'Une maison est un cube de 6 m d’arête, surmonté d’un toit en forme de pyramide de même base et de 3 m de hauteur. Quel est son volume total&nbsp;?', unit:'m³', ans:252, why:'Cube : 6³ = 216 m³. Toit : 36 · 3 : 3 = 36 m³. Total : 216 + 36 = 252 m³.'},
   {q:'Une gélule est un cylindre de rayon 1 cm et de longueur 4 cm, fermé à chaque bout par une demi-boule de rayon 1 cm. Quel est son volume, arrondi au centième&nbsp;?', fig:figGelule, unit:'cm³', ans:16.76, tol:.006, why:'Cylindre : π · 1² · 4 = 4π. Deux demi-boules = une boule : 4/3 · π. Total : 4π + 4π/3 = 16π/3 ≈ 16,76 cm³.'},
   {q:'Dans un cube de 10 cm d’arête, on perce un trou cylindrique de rayon 2 cm qui le traverse de part en part (10 cm de long). Quel volume reste-t-il, arrondi au centième&nbsp;?', unit:'cm³', ans:874.34, tol:.006, why:'Cube : 1000 cm³. Trou : π · 2² · 10 = 40π. On soustrait : 1000 − 40π ≈ 874,34 cm³.'},
   {q:'Une fusée jouet est un cylindre surmonté d’un cône de même rayon. Quel est son volume, arrondi au centième&nbsp;?', fig:figFusee, unit:'cm³', ans:376.99, tol:.006, why:'Cylindre : π · 3² · 12 = 108π. Cône : π · 3² · 4 : 3 = 12π. Total : 120π ≈ 376,99 cm³.'},
 ]},
 {n:'Grandeur manquante', r:'Trouver une grandeur manquante', qs:[
   {q:'Une pyramide a une base de 30 cm² et un volume de 120 cm³. Quelle est sa hauteur&nbsp;?', unit:'cm', ans:12, why:'h = 3V : B = 3 · 120 : 30 = 12 cm.'},
   {q:'Un cône de rayon 3 cm a un volume de 60π cm³. Quelle est sa hauteur&nbsp;?', unit:'cm', ans:20, why:'60π = π · 9 · h : 3 = 3π · h, donc h = 60π : 3π = 20 cm.'},
   {q:'Une boule a un volume de 288π cm³. Quel est son rayon&nbsp;?', unit:'cm', ans:6, why:'4/3 · π · r³ = 288π donne r³ = 288 · 3 : 4 = 216, donc r = ∛216 = 6 cm.'},
   {q:'Une pyramide à base carrée a un volume de 96 cm³ et une hauteur de 8 cm. Quel est le côté de sa base&nbsp;?', unit:'cm', ans:6, why:'a² = 3V : h = 3 · 96 : 8 = 36, donc a = √36 = 6 cm.'},
 ]},
 {n:'Unités de volume, de capacité et de durée', r:'Volumes et capacités : convertir', qs:[
   {q:'Convertis 3,2 m³ en litres.', unit:'L', ans:3200, why:'1 m³ = 1000 dm³ = 1000 L, donc 3,2 m³ = 3200 L.'},
   {q:'Convertis 250 cm³ en décilitres.', unit:'dL', ans:2.5, tol:.001, why:'250 cm³ = 250 mL = 0,25 L, et 1 L = 10 dL, donc 2,5 dL.'},
   {q:'Combien de minutes y a-t-il dans 0,75 h&nbsp;?', unit:'min', ans:45, why:'0,75 · 60 = 45 min.'},
   {q:'Combien de cm³ y a-t-il dans 1 m³&nbsp;?', opts:['1000','100 000','1 000 000','10 000'], ans:2, why:'1 m³ = 1000 dm³ et 1 dm³ = 1000 cm³, donc 1 m³ = 1000 · 1000 = 1 000 000 cm³. Pour les volumes, on multiplie par 1000 à chaque unité.'},
   {q:'Un film dure 135 min. Combien d’heures est-ce, en nombre décimal&nbsp;?', unit:'h', ans:2.25, tol:.001, why:'135 : 60 = 2,25 h, soit 2 h 15 min. Attention : ce n’est pas 1,35 h.'},
 ]},
 {n:'Vitesse, débit et masse volumique', r:'Vitesse, débit et masse volumique', qs:[
   {q:'Un cycliste parcourt 18 km en 45 min. Quelle est sa vitesse moyenne en km/h&nbsp;?', unit:'km/h', ans:24, why:'45 min = 0,75 h. v = d : t = 18 : 0,75 = 24 km/h.'},
   {q:'Un robinet débite 15 L/min. Combien de minutes faut-il pour remplir une baignoire de 180 L&nbsp;?', unit:'min', ans:12, why:'t = V : Q = 180 : 15 = 12 min.'},
   {q:'Le fer a une masse volumique de 7,9 g/cm³. Quelle est la masse d’un bloc de fer de 50 cm³&nbsp;?', unit:'g', ans:395, why:'m = ρ · V = 7,9 · 50 = 395 g.'},
   {q:'Une boule pleine en aluminium a un rayon de 2 cm. L’aluminium a une masse volumique de 2,7 g/cm³. Quelle est la masse de la boule, arrondie au dixième&nbsp;?', unit:'g', ans:90.5, tol:.06, why:'V = 4/3 · π · 2³ = 32π/3 ≈ 33,51 cm³. m = 2,7 · 33,51 ≈ 90,5 g.'},
 ]},
];
})();
