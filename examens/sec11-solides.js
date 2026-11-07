/* Déclic — examen de compétence : Cônes, sphères et pyramides */
(()=>{
const D=Math.PI/180;
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]], dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const crs=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const mid=pts=>pts.reduce((m,p)=>[m[0]+p[0]/pts.length,m[1]+p[1]/pts.length,m[2]+p[2]/pts.length],[0,0,0]);
const HID={c:'var(--muted)',w:1.5,dash:true};
function sc(az=30,el=20,r=5){ const S=space({az,el,r,axes:false}); S.w=[Math.cos(az*D)*Math.cos(el*D),Math.sin(az*D)*Math.cos(el*D),Math.sin(el*D)]; return S; }
function poly3(S,V,F){ const C=mid(V);
  const vis=F.map(f=>{ const n=crs(sub(V[f[1]],V[f[0]]),sub(V[f[2]],V[f[0]])), s=dot(n,sub(mid(f.map(k=>V[k])),C))<0?-1:1; return s*dot(n,S.w)>1e-9; });
  const E=new Map(); F.forEach((f,j)=>f.forEach((a,k)=>{ const b=f[(k+1)%f.length], key=Math.min(a,b)+'-'+Math.max(a,b); if(!E.has(key)) E.set(key,[a,b,false]); if(vis[j]) E.get(key)[2]=true; }));
  E.forEach(([a,b,v])=>{ if(!v) S.seg(V[a],V[b],HID); });
  F.forEach((f,j)=>{ if(vis[j]) S.poly(f.map(k=>V[k]),{fill:'var(--accent)',fo:.13,c:null}); });
  E.forEach(([a,b,v])=>{ if(v) S.seg(V[a],V[b],{c:'var(--accent)',w:2.5}); }); }
function pyr(n,R,h,z0,ph=0){ const V=[]; for(let k=0;k<n;k++){ const t=ph+2*Math.PI*k/n; V.push([R*Math.cos(t),R*Math.sin(t),z0]); } V.push([0,0,z0+h]);
  const F=[[...Array(n).keys()]]; for(let k=0;k<n;k++) F.push([k,(k+1)%n,n]); return {V,F}; }
const cav=(x,y,z)=>[x+.3536*y,z+.3536*y];

// pyramide à base hexagonale
const figHexa=(()=>{ const S=sc(30,20,4.2), {V,F}=pyr(6,2.6,4.2,-2.1); poly3(S,V,F); return S.svg(); })();
// pyramide à base carrée : côté 10 cm, apothème 13 cm
const figPyr=(()=>{ const S=sc(25,18,3.8), b=2.1, z0=-1.6, V=[[b,-b,z0],[b,b,z0],[-b,b,z0],[-b,-b,z0],[0,0,z0+3.2]];
  poly3(S,V,[[0,1,2,3],[0,1,4],[1,2,4],[2,3,4],[3,0,4]]); const O=[0,0,z0], M=[0,b,z0], T=V[4];
  S.seg(T,O,{c:'var(--spark)',w:2,dash:true}).seg(O,M,{c:'var(--spark)',w:2,dash:true}).seg(T,M,{c:'var(--math)',w:3});
  S.text(mid([T,M]),'13 cm',{dx:8,c:'var(--math)'}).text(mid([V[1],V[2]]),'10 cm',{dx:-10,dy:20}).text(mid([T,O]),'h ?',{dx:-30,c:'var(--spark)'});
  return S.svg(); })();
// demi-disque de rayon 10 cm
const figDemi=(()=>{ const P=plane({x:[-11,11],y:[-1.5,11],grid:false,axes:false}), pts=[]; for(let i=0;i<=60;i++){ const t=Math.PI*i/60; pts.push([10*Math.cos(t),10*Math.sin(t)]); }
  P.poly(pts,{fill:'var(--accent)',fo:.2,c:'var(--accent)',w:2.5}).seg(0,0,10,0,{c:'var(--spark)',w:2.5}).text(5,0,'10 cm',{a:'middle',dy:16}).dot(0,0,{r:4});
  return P.svg(); })();
// pyramide MNPQ en perspective cavalière, toutes les arêtes en trait plein
const figCav=(()=>{ const P=plane({x:[-1,6.5],y:[-1,5.5],grid:false,axes:false}), q={c:'var(--accent)',w:2.5};
  const M=cav(0,0,0), N=cav(4,0,0), Pp=cav(4,4,0), Q=cav(0,4,0), T=cav(2,2,4);
  [[M,N],[N,Pp],[Pp,Q],[Q,M],[T,M],[T,N],[T,Pp],[T,Q]].forEach(([a,b])=>P.seg(...a,...b,q));
  P.text(...M,'M',{dx:-12,dy:14}).text(...N,'N',{dx:4,dy:14}).text(...Pp,'P',{dx:5,dy:2}).text(...Q,'Q',{dx:-14,dy:-4}).text(...T,'S',{dx:-4,dy:-8});
  return P.svg(); })();

EXAMS['sec11-solides']=[
 {n:'Reconnaître cône, sphère et cylindre', r:'Des solides qui tournent : cône et sphère', qs:[
   {q:'Un rectangle de 5 cm sur 2 cm tourne autour de son côté de 5 cm. Quel solide obtient-on&nbsp;?', opts:['un cône de hauteur 5 cm','un cylindre de rayon 2 cm et de hauteur 5 cm','un cylindre de rayon 5 cm et de hauteur 2 cm','une boule de rayon 5 cm'], ans:1, why:'Un rectangle qui tourne donne un cylindre. Le côté collé à l’axe (5 cm) devient la hauteur, l’autre côté (2 cm) devient le rayon.'},
   {q:'Lequel de ces solides est un polyèdre&nbsp;?', opts:['la sphère','le cône','la pyramide à base hexagonale','le cylindre'], ans:2, why:'Un polyèdre n’a que des faces planes. La pyramide a une base hexagonale et 6 faces triangulaires. Les trois autres ont une surface courbe.'},
   {q:'Un triangle rectangle a des côtés de l’angle droit de 6 cm et de 8 cm. Il tourne autour du côté de 8 cm. Quel est le rayon de la base du cône obtenu&nbsp;?', unit:'cm', ans:6, why:'Le côté de 8 cm reste sur l’axe : c’est la hauteur. L’autre côté de l’angle droit, 6 cm, balaie la base : c’est le rayon.'},
   {q:'Quelle phrase est juste&nbsp;?', opts:['Une sphère et une boule, c’est exactement la même chose.','La boule est la surface ; la sphère est pleine.','La sphère est la surface ; la boule est la sphère avec tout son intérieur.','Une sphère n’a pas de centre.'], ans:2, why:'La sphère est formée des points à la distance r du centre : c’est la « peau ». La boule comprend aussi tous les points intérieurs.'},
 ]},
 {n:'Faces, arêtes et sommets d’une pyramide', r:'La pyramide régulière', qs:[
   {q:'Combien de sommets a cette pyramide à base hexagonale&nbsp;?', fig:figHexa, ans:7, why:'Les 6 sommets de la base plus le sommet S : 6 + 1 = 7.'},
   {q:'Combien d’arêtes a une pyramide dont la base est un octogone (8 côtés)&nbsp;?', ans:16, why:'8 arêtes de base et 8 arêtes latérales : 2 · 8 = 16.'},
   {q:'Une pyramide a 11 faces en tout. Combien de côtés a sa base&nbsp;?', ans:10, why:'Une pyramide dont la base a n côtés a n faces latérales + 1 base. n + 1 = 11 donne n = 10.'},
   {q:'Dans une pyramide régulière, qu’appelle-t-on l’apothème&nbsp;?', opts:['la distance du sommet au centre de la base','la hauteur d’une face latérale, du sommet au milieu d’un côté de la base','une arête latérale','le côté de la base'], ans:1, why:'L’apothème est la hauteur d’une face triangulaire, issue du sommet S. La distance de S au centre de la base est la hauteur de la pyramide.'},
   {q:'Une pyramide a une base carrée, mais son sommet n’est pas à la verticale du centre du carré. Est-elle régulière&nbsp;?', opts:['Oui, car sa base est un polygone régulier.','Oui, si ses faces sont des triangles.','Non, une pyramide régulière a forcément une base triangulaire.','Non, le sommet doit être à la verticale du centre de la base.'], ans:3, why:'Il faut deux conditions : une base polygone régulier et le sommet au-dessus de son centre. Ici la seconde manque, ses faces ne sont pas toutes pareilles.'},
 ]},
 {n:'Pythagore dans les solides', r:'Trouver une longueur cachée avec Pythagore', qs:[
   {q:'Un cône a un rayon de 5 cm et une hauteur de 12 cm. Quelle est la longueur de sa génératrice&nbsp;?', unit:'cm', ans:13, why:'g² = 5² + 12² = 25 + 144 = 169, donc g = 13 cm.'},
   {q:'Un cône a une génératrice de 25 cm et un rayon de 7 cm. Quelle est sa hauteur&nbsp;?', unit:'cm', ans:24, why:'La génératrice est l’hypoténuse : h² = 25² − 7² = 625 − 49 = 576, donc h = 24 cm.'},
   {q:'Une pyramide régulière à base carrée a 16 cm de côté et 15 cm de hauteur. Quel est son apothème&nbsp;?', unit:'cm', ans:17, why:'OM = 16 : 2 = 8 cm. SM² = 15² + 8² = 225 + 64 = 289, donc SM = 17 cm.'},
   {q:'Cette pyramide régulière à base carrée a 10 cm de côté et un apothème de 13 cm. Quelle est sa hauteur&nbsp;?', fig:figPyr, unit:'cm', ans:12, why:'Dans SOM rectangle en O, l’apothème est l’hypoténuse et OM = 5 cm : h² = 13² − 5² = 169 − 25 = 144, donc h = 12 cm.'},
   {q:'Une pyramide régulière à base carrée a 8 cm de côté et un apothème de 5 cm. Quelle est la longueur d’une arête latérale, arrondie au centième&nbsp;?', unit:'cm', ans:6.40, tol:.006, why:'Sur une face, SMA est rectangle en M avec MA = 4 cm : SA² = 5² + 4² = 41, donc SA = √41 ≈ 6,40 cm.'},
 ]},
 {n:'Développements du cylindre et de la pyramide', r:'Le développement du cylindre', qs:[
   {q:'Le développement d’un cylindre de rayon 5 cm et de hauteur 8 cm contient un rectangle. Quelle est la longueur de son grand côté, arrondie au centième&nbsp;?', unit:'cm', ans:31.42, tol:.006, why:'Le grand côté fait le tour de la base : 2π · 5 = 10π ≈ 31,42 cm (l’autre côté vaut 8 cm).'},
   {q:'L’étiquette d’une boîte de conserve est un rectangle de 25,12 cm sur 9 cm qui fait exactement le tour de la boîte. Avec π ≈ 3,14, quel est le rayon de la boîte&nbsp;?', unit:'cm', ans:4, why:'25,12 est le périmètre de la base : 2 · 3,14 · r = 25,12, donc r = 25,12 : 6,28 = 4 cm.'},
   {q:'Le développement d’une pyramide régulière à base pentagonale est formé…', opts:['d’un pentagone régulier et de 5 triangles isocèles identiques','de 5 triangles équilatéraux seulement','d’un pentagone et de 6 triangles','de 2 pentagones et de 5 rectangles'], ans:0, why:'Une pyramide a une base (ici un pentagone régulier) et une face triangulaire par côté de la base : 5 triangles isocèles identiques. Deux pentagones et des rectangles, c’est le prisme.'},
   {q:'Dans le développement d’une pyramide régulière, quelle est la hauteur de chaque triangle&nbsp;?', opts:['la hauteur de la pyramide','une arête latérale','l’apothème de la pyramide','la moitié du côté de la base'], ans:2, why:'Chaque triangle est une face latérale, et la hauteur d’une face issue du sommet est l’apothème. La hauteur de la pyramide est plus courte : elle est verticale, pas penchée.'},
 ]},
 {n:'Secteur et aire latérale du cône', r:'Calculer l’angle du secteur d’un cône', qs:[
   {q:'On roule ce demi-disque de rayon 10 cm pour former un cône, sans recouvrement. Quel est le rayon de la base du cône&nbsp;?', fig:figDemi, unit:'cm', ans:5, why:'L’angle vaut 180°, la moitié d’un tour : r = 10 · 180/360 = 5 cm. L’arc, π · 10 ≈ 31,4 cm, fait bien le tour d’une base de rayon 5 cm.'},
   {q:'Un cône a un rayon de 5 cm et une génératrice de 8 cm. Quel est l’angle du secteur de son développement&nbsp;?', unit:'°', ans:225, why:'α = 360° · 5/8 = 225°.'},
   {q:'Un cône a un rayon de 6 cm et une hauteur de 8 cm. Quel est l’angle du secteur de son développement&nbsp;?', unit:'°', ans:216, why:'D’abord la génératrice : g² = 6² + 8² = 100, g = 10 cm. Puis α = 360° · 6/10 = 216°.'},
   {q:'On roule un secteur de 90° découpé dans un disque de rayon 24 cm. Quel est le rayon de la base du cône obtenu&nbsp;?', unit:'cm', ans:6, why:'r = g · α/360 = 24 · 90/360 = 24 : 4 = 6 cm.'},
   {q:'Quelle est l’aire latérale d’un cône de rayon 4 cm et de génératrice 10 cm, arrondie au centième&nbsp;?', unit:'cm²', ans:125.66, tol:.006, why:'Aire latérale = π · r · g = π · 4 · 10 = 40π ≈ 125,66 cm².'},
 ]},
 {n:'Sections', r:'Calculer le rayon d’une section', qs:[
   {q:'Une boule de rayon 10 cm est coupée par un plan situé à 8 cm de son centre. Quel est le rayon de la section&nbsp;?', unit:'cm', ans:6, why:'ρ² = 10² − 8² = 100 − 64 = 36, donc ρ = 6 cm.'},
   {q:'Une boule de rayon 17 cm est coupée par un plan. La section est un cercle de rayon 15 cm. À quelle distance du centre est le plan&nbsp;?', unit:'cm', ans:8, why:'d² = 17² − 15² = 289 − 225 = 64, donc d = 8 cm.'},
   {q:'Un cône de rayon 9 cm et de hauteur 12 cm est coupé parallèlement à sa base, à 4 cm au-dessus de la base. Quel est le rayon de la section&nbsp;?', unit:'cm', ans:6, why:'Distance au sommet : 12 − 4 = 8 cm, donc k = 8/12 = 2/3. Rayon : 9 · 2/3 = 6 cm.'},
   {q:'On coupe un cylindre par un plan vertical qui contient son axe. Quelle est la forme de la section&nbsp;?', opts:['un disque','un rectangle','un triangle isocèle','un ovale'], ans:1, why:'Le plan coupe les deux bases selon un diamètre et la surface latérale selon deux génératrices verticales : un rectangle de côtés 2r et h.'},
 ]},
 {n:'Perspective et vues', r:'Dessiner un solide en perspective', qs:[
   {q:'En perspective cavalière (fuyantes à 45°, coefficient 1/2), comment dessine-t-on une arête fuyante de 6 cm&nbsp;?', opts:['6 cm à l’horizontale','3 cm en oblique','12 cm en oblique','6 cm en oblique'], ans:1, why:'Les fuyantes sont tracées en oblique et réduites de moitié : 6 : 2 = 3 cm.'},
   {q:'Un cône est posé sur sa base. Quelle est sa vue de dessus&nbsp;?', opts:['un triangle','un carré avec ses diagonales','un ovale','un disque avec son centre marqué'], ans:3, why:'Vu de très haut, on voit le disque de la base, et le sommet se projette au centre.'},
   {q:'Quel solide a une vue de face et une vue de dessus toutes les deux en forme de disque&nbsp;?', opts:['le cylindre','le cône','la sphère','la pyramide'], ans:2, why:'La sphère se voit comme un disque dans toutes les directions. Le cylindre a une vue de face rectangulaire, le cône triangulaire.'},
   {q:'Sur ce dessin d’une pyramide à base carrée MNPQ, toutes les arêtes sont en trait plein. Lesquelles devraient être en pointillés&nbsp;?', fig:figCav, opts:['[MN], [NP] et [SN]','seulement [SQ]','aucune','[MQ], [QP] et [SQ]'], ans:3, why:'Le coin Q, derrière à gauche, est caché par les faces SMN et SNP. Les trois arêtes qui partent de Q sont donc invisibles : [MQ], [QP] et [SQ].'},
 ]},
];
})();
