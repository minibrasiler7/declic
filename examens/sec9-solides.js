/* Déclic — examen de compétence : Solides */
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
function cav(L,H,D,o={}){ const dx=D*.5*Math.cos(rad(45)), dy=D*.5*Math.sin(rad(45)), P=plane({x:[-.5,L+dx+.5],y:[-.5,H+dy+.5],w:220,axes:false});
  const A=[0,0],B=[L,0],C=[L,H],Dd=[0,H], t=p=>[p[0]+dx,p[1]+dy], A2=t(A),B2=t(B),C2=t(C),D2=t(Dd), hq=o.plein?{c:'var(--ink)',w:2.5}:{c:'var(--muted)',w:1.8,dash:1}, vq={c:'var(--ink)',w:2.5};
  P.seg(...A2,...B2,hq).seg(...A2,...D2,hq).seg(...A,...A2,hq); P.poly([A,B,C,Dd],{fill:'var(--accent)',fo:.18,c:'var(--ink)',w:2.5});
  P.seg(...B,...B2,vq).seg(...C,...C2,vq).seg(...Dd,...D2,vq).seg(...B2,...C2,vq).seg(...C2,...D2,vq); return P.svg(); }
function net(cells,labs,grey){ const xs=cells.map(c=>c[0]), ys=cells.map(c=>c[1]), P=plane({x:[Math.min(...xs)-.2,Math.max(...xs)+1.2],y:[Math.min(...ys)-.2,Math.max(...ys)+1.2],w:Math.min(240,(Math.max(...xs)-Math.min(...xs)+1.4)*45),axes:false,grid:false});
  cells.forEach((c,k)=>{ P.rect(c[0],c[1],1,1,{fill:k===grey?'var(--muted)':'var(--accent)',fo:k===grey?.45:.3,c:'var(--ink)',w:1.8}); if(labs&&labs[k]) P.text(c[0]+.5,c[1]+.5,labs[k],{a:'middle',dy:5,s:14}); }); return P.svg(); }
const PILE=stack([[2,1,1],[1,0,3]]);
EXAMS['sec9-solides']=[
 {n:'Faces, arêtes et sommets', r:'Faces, arêtes et sommets', qs:[
   {q:'Combien de sommets a un pavé&nbsp;?', lab:'Sommets :', ans:8, why:'4 sommets en bas et 4 en haut : 8 sommets, comme le cube.'},
   {q:'Sur un solide, une arête est…', opts:['un point où plusieurs faces se rencontrent','un segment où deux faces se rencontrent','une surface plate','le centre d’une face'], ans:1, why:'L’arête est le bord commun à deux faces. Le point où des arêtes se rencontrent est un sommet ; la surface plate est une face.'},
   {q:'Sur ce dessin d’un pavé, combien d’arêtes sont tracées en pointillés&nbsp;?', fig:solid(boxV(2,3.2,1.6),BOXF,{az:35,el:25,r:2.8}).svg(), lab:'Pointillés :', ans:3, why:'Les arêtes cachées sont celles qui partent du sommet caché, à l’arrière en bas : il y en a 3.'},
   {q:'Combien de faces d’un cube se touchent en un même sommet&nbsp;?', lab:'Faces :', ans:3, why:'Un coin de dé touche 3 faces : celle du dessus (ou du dessous) et deux faces de côté.'},
 ]},
 {n:'Reconnaître les solides', r:'Polyèdre ou pas ?', qs:[
   {q:'Lequel de ces objets n’est pas un polyèdre&nbsp;?', opts:['Un dé à jouer','Une boîte de Toblerone','Une canette','Une pyramide d’Égypte'], ans:2, why:'La canette est un cylindre : elle a une face courbe. Les autres n’ont que des faces planes.'},
   {q:'Un solide a deux bases hexagonales parallèles et 6 faces rectangulaires. C’est…', opts:['une pyramide à base hexagonale','un cylindre','un pavé','un prisme droit à base hexagonale'], ans:3, why:'Deux bases identiques et parallèles reliées par des rectangles : c’est un prisme droit, nommé d’après sa base.'},
   {q:'Un pavé dont toutes les faces sont des carrés est…', opts:['un cube','une pyramide','un prisme à base triangulaire','un cylindre'], ans:0, why:'Un pavé aux trois dimensions égales a 6 faces carrées : c’est un cube.'},
   {q:'Quel est ce solide&nbsp;?', fig:pyr(4,20), opts:['Un prisme à base carrée','Une pyramide à base triangulaire','Une pyramide à base carrée','Un cube'], ans:2, why:'Une seule base, carrée, et des faces triangulaires qui se rejoignent en un sommet : une pyramide à base carrée.'},
   {q:'Laquelle de ces phrases est vraie&nbsp;?', opts:['Un pavé est toujours un cube','Un cube est un pavé','Un cylindre est un polyèdre','Une pyramide a deux bases'], ans:1, why:'Le cube est un pavé particulier (trois dimensions égales). L’inverse est faux, le cylindre a une face courbe et la pyramide n’a qu’une base.'},
 ]},
 {n:'Compter selon la base', r:'Compter faces, arêtes et sommets', qs:[
   {q:'Combien de faces a ce prisme droit à base triangulaire&nbsp;?', fig:prism(3,30), lab:'Faces :', ans:5, why:'2 bases triangulaires + 3 rectangles = 5 faces (côtés + 2).'},
   {q:'Combien d’arêtes a un prisme droit à base hexagonale (6 côtés)&nbsp;?', lab:'Arêtes :', ans:18, why:'6 en bas, 6 en haut, 6 debout : 3 × 6 = 18 arêtes.'},
   {q:'Combien de sommets a une pyramide à base pentagonale (5 côtés)&nbsp;?', lab:'Sommets :', ans:6, why:'5 sommets sur la base + 1 en haut = 6 sommets.'},
   {q:'Combien d’arêtes a une pyramide à base octogonale (8 côtés)&nbsp;?', lab:'Arêtes :', ans:16, why:'8 arêtes sur la base + 8 qui montent au sommet = 16 arêtes (2 × côtés).'},
   {q:'Un prisme droit a 24 arêtes. Combien de côtés a sa base&nbsp;?', lab:'Côtés :', ans:8, why:'Un prisme a 3 × côtés arêtes : 3 × 8 = 24, donc sa base a 8 côtés.'},
   {q:'Une pyramide a 7 faces. Combien de côtés a sa base&nbsp;?', lab:'Côtés :', ans:6, why:'Une pyramide a côtés + 1 faces (la base et un triangle par côté) : 6 + 1 = 7, donc 6 côtés.'},
 ]},
 {n:'Perspective cavalière', r:'Dessiner un pavé en perspective cavalière', qs:[
   {q:'On dessine un cube de 6 cm en perspective cavalière avec un coefficient de 0,5. Quelle longueur ont les fuyantes sur le dessin&nbsp;?', unit:'cm', ans:3, tol:.001, why:'Fuyante dessinée = profondeur × coefficient = 6 × 0,5 = 3 cm.'},
   {q:'Un pavé a une profondeur de 5 cm. On le dessine avec un coefficient de 0,7. Quelle longueur ont les fuyantes&nbsp;?', unit:'cm', ans:3.5, tol:.001, why:'5 × 0,7 = 3,5 cm.'},
   {q:'En perspective cavalière, quelle face est dessinée en vraie grandeur&nbsp;?', opts:['La face du dessus','La face de droite','La face avant','Aucune'], ans:2, why:'La face avant garde ses vraies mesures et ses angles droits. Les autres sont déformées par les fuyantes.'},
   {q:'Sur un dessin en perspective cavalière avec un coefficient de 0,5, une fuyante mesure 2,5 cm. Quelle est la vraie profondeur de la boîte&nbsp;?', unit:'cm', ans:5, tol:.001, why:'Profondeur × 0,5 = 2,5, donc la profondeur vaut 2,5 ÷ 0,5 = 5 cm.'},
   {q:'Qu’est-ce qui ne respecte pas les règles de la perspective cavalière sur ce dessin&nbsp;?', fig:cav(4,2.5,3,{plein:true}), opts:['La face avant n’est pas un rectangle','Les fuyantes ne sont pas parallèles','Les arêtes cachées sont en trait plein','Rien, le dessin est correct'], ans:2, why:'Les 3 arêtes cachées, qui partent du sommet arrière en bas à gauche, devraient être en pointillés.'},
 ]},
 {n:'Patrons', r:'Reconnaître un patron de cube', qs:[
   {q:'Ce dessin est-il un patron de cube&nbsp;?', fig:net([[0,0],[1,0],[2,0],[3,0],[4,0],[1,1]]), opts:['Oui','Non : 5 carrés sont alignés','Non : il faudrait 7 carrés'], ans:1, why:'Une rangée de 4 carrés fait déjà le tour du cube : le 5e carré de la rangée se superpose au 1er.'},
   {q:'Ces 6 carrés forment-ils un patron de cube&nbsp;?', fig:net([[0,0],[1,0],[0,1],[1,1],[2,1],[3,1]]), opts:['Non : il n’y a que 5 carrés','Oui','Non : il contient un bloc de 2 × 2 carrés'], ans:2, why:'Un bloc de 2 × 2 carrés ne peut pas se plier en cube : trois de ces carrés se retrouveraient autour d’un même sommet avec le quatrième en trop.'},
   {q:'Peut-on plier ce dessin pour fabriquer un cube&nbsp;?', fig:net([[0,0],[1,0],[1,1],[2,1],[2,2],[3,2]]), opts:['Oui, il se replie en cube','Non : il contient un bloc de 2 × 2 carrés','Non : 5 carrés sont alignés'], ans:0, why:'C’est le patron « en escalier » : pas de bloc 2 × 2, pas 5 carrés alignés, et chaque face a une seule face opposée (en numérotant les carrés de 1 à 6 le long de l’escalier : 1 et 4, 2 et 5, 3 et 6).'},
   {q:'Quand on replie ce patron, quelle face est opposée à la face 3&nbsp;?', fig:net([[0,1],[1,1],[2,1],[3,1],[1,2],[3,0]],['2','3','4','5','1','6']), lab:'Face', ans:5, why:'Dans la rangée 2-3-4-5, deux carrés séparés par un seul carré sont opposés : 3 est opposée à 5.'},
   {q:'Sur un dé, deux faces opposées font toujours 7 en tout. Quel nombre faut-il écrire sur la case grise de ce patron&nbsp;?', fig:net([[0,1],[1,1],[2,1],[3,1],[2,2],[0,0]],['1','2','6','5','3',''],5), lab:'Nombre :', ans:4, why:'Dans la rangée, 1 et 6 sont opposées, 2 et 5 aussi. Le 3 (au-dessus) et la case grise (en dessous) sont le dessus et le dessous : opposées. Il faut 7 − 3 = 4.'},
   {q:'Combien de rectangles contient le patron d’un prisme droit à base triangulaire&nbsp;?', lab:'Rectangles :', ans:3, why:'Une face latérale rectangulaire par côté de la base : 3 rectangles, plus les 2 triangles des bases.'},
 ]},
 {n:'Vues', r:'Vues de face, de dessus et de côté', qs:[
   {q:'Combien de carrés compte la vue de dessus de cet assemblage de cubes&nbsp;? (Toutes les piles sont posées sur le sol.)', fig:cubes(PILE), lab:'Carrés :', ans:5, why:'De dessus, chaque pile donne un carré, quelle que soit sa hauteur. Il y a 5 piles (une case est vide).'},
   {q:'Combien de carrés compte la vue de face de cet assemblage de cubes&nbsp;? (L’avant est en bas à gauche du dessin ; toutes les piles sont posées sur le sol.)', fig:cubes(PILE), lab:'Carrés :', ans:6, why:'De face, chaque colonne montre sa plus haute pile : 2 à gauche, 1 au milieu, 3 à droite. 2 + 1 + 3 = 6 carrés.'},
   {q:'Un cylindre posé debout sur une de ses bases, vu de dessus, donne…', opts:['un rectangle','un disque','un triangle','un carré'], ans:1, why:'D’en haut, on voit la base du dessus : un disque. De face, on verrait un rectangle.'},
   {q:'Une pyramide à base carrée posée sur sa base, vue de face, donne…', opts:['un carré avec ses deux diagonales','un disque','un carré','un triangle'], ans:3, why:'De face, on voit la face avant triangulaire. Le carré avec ses diagonales est la vue de dessus.'},
 ]},
];
})();
