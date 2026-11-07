/* Déclic — examen de compétence : Solides et développements */
(()=>{
const PI=Math.PI, COL=['var(--accent)','var(--math)','var(--spark)','var(--ok)','var(--code)','var(--other)'];
const sub=(a,b)=>a.map((x,i)=>x-b[i]), sc=(k,a)=>a.map(x=>k*x), dot3=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]], mean=ps=>sc(1/ps.length,ps.reduce((s,p)=>s.map((x,i)=>x+p[i]),[0,0,0]));
function view(o={}){ const A=rad(o.az??30), E=rad(o.el??22), ca=Math.cos(A), sa=Math.sin(A), ce=Math.cos(E), se=Math.sin(E);
  const pr=p=>[p[1]*ca-p[0]*sa, p[2]*ce-(p[0]*ca+p[1]*sa)*se], P=plane({x:o.x||[-2,2],y:o.y||[-1.6,1.6],grid:false,axes:false,w:o.w||260});
  const W={P,az:A,V:[ca*ce,sa*ce,se],seg(a,b,q){ const p=pr(a),t=pr(b); P.seg(p[0],p[1],t[0],t[1],q); return W; },poly(ps,q){ P.poly(ps.map(pr),q); return W; },svg:()=>P.svg()}; return W; }
const ngon=(n,R,t0=0)=>Array.from({length:n},(_,i)=>[R*Math.cos(t0+2*PI*i/n),R*Math.sin(t0+2*PI*i/n)]);
function prismB(base,h){ const n=base.length, vs=[...base.map(([x,y])=>[x,y,-h/2]),...base.map(([x,y])=>[x,y,h/2])];
  const fs=[[...Array(n).keys()],[...Array(n).keys()].map(i=>i+n)]; for(let i=0;i<n;i++) fs.push([i,(i+1)%n,(i+1)%n+n,i+n]); return {vs,fs}; }
function pyrB(base,h){ const n=base.length, vs=[...base.map(([x,y])=>[x,y,-h/3]),[0,0,2*h/3]]; const fs=[[...Array(n).keys()]]; for(let i=0;i<n;i++) fs.push([i,(i+1)%n,n]); return {vs,fs}; }
function polyh(W,S,o={}){ const {vs,fs}=S, c=mean(vs);
  const vis=fs.map(f=>{ let n=cross(sub(vs[f[1]],vs[f[0]]),sub(vs[f[2]],vs[f[0]])); if(dot3(n,sub(mean(f.map(i=>vs[i])),c))<0) n=sc(-1,n); return dot3(n,W.V)>1e-9; });
  const E=new Map(); fs.forEach((f,k)=>f.forEach((a,j)=>{ const b=f[(j+1)%f.length], key=Math.min(a,b)+'-'+Math.max(a,b); if(!E.has(key)) E.set(key,{a,b,v:false}); if(vis[k]) E.get(key).v=true; }));
  E.forEach(e=>{ if(!e.v) W.seg(vs[e.a],vs[e.b],{c:'var(--muted)',w:1.5,dash:1}); });
  fs.forEach((f,k)=>{ if(vis[k]) W.poly(f.map(i=>vs[i]),{fill:(o.fc&&o.fc[k])||o.c||'var(--accent)',fo:.2,c:null}); });
  E.forEach(e=>{ if(e.v) W.seg(vs[e.a],vs[e.b],{c:'var(--ink)',w:2.2}); }); }
const solid=(S,o={},v={})=>{ const W=view(v); polyh(W,S,o); return W.svg(); };
const gold={fc:['var(--spark)','var(--spark)']};
// patrons du cube, avec étiquettes éventuelles
function nets(list,labs){ const cols=list.length>2?2:list.length, rows=Math.ceil(list.length/cols), cw=6, ch=4.4;
  const P=plane({x:[0,cols*cw],y:[0,rows*ch],grid:false,axes:false,w:list.length>1?320:220});
  list.forEach((cells,k)=>{ const ox=(k%cols)*cw+.5, oy=(rows-1-Math.floor(k/cols))*ch+.5;
    cells.forEach(([c,r],i)=>{ P.rect(ox+c*.9,oy+r*.9,.9,.9,{fill:'var(--accent)',fo:.25,c:'var(--ink)',w:1.6}); if(labs&&labs[i]!=='') P.text(ox+c*.9+.45,oy+r*.9+.45,labs[i],{a:'middle',dy:5,s:14}); });
    if(list.length>1) P.text(ox-.2,oy+3.5,String.fromCharCode(65+k),{s:15}); });
  return P.svg(); }
function cavBox(a,b,d,o={}){ const P=plane({x:[-.5,a+d*.5+1],y:[-.5,b+d*.5+.8],grid:false,axes:false,w:220}), dx=.5*d*Math.SQRT1_2, dy=dx;
  const F=[[0,0],[a,0],[a,b],[0,b]], B=F.map(([x,y])=>[x+dx,y+dy]), ink={c:'var(--ink)',w:2.2}, hid={c:'var(--muted)',w:1.5,dash:1};
  P.seg(B[0][0],B[0][1],B[1][0],B[1][1],hid).seg(B[0][0],B[0][1],B[3][0],B[3][1],hid).seg(0,0,B[0][0],B[0][1],hid);
  P.poly([F[1],B[1],B[2],F[2]],{fill:'var(--accent)',fo:.1,c:'var(--ink)',w:2.2}).poly([F[3],F[2],B[2],B[3]],{fill:'var(--accent)',fo:.2,c:'var(--ink)',w:2.2}).poly(F,{fill:'var(--accent)',fo:.3,c:'var(--ink)',w:2.2});
  if(o.lab){ P.text(1.4,b-1,'A',{s:14}).text(a+dx/2,b/2+dy/2,'B',{a:'middle',s:14}).text(a/2+dx/2,b+dy/2,'C',{a:'middle',dy:5,s:14}); }
  return P.svg(); }

EXAMS['sec10-solides']=[
 {n:'Reconnaître les solides',r:'Les solides autour de toi',qs:[
  {q:'Comment s’appelle ce solide ?',fig:solid(pyrB(ngon(6,1.2),2.2),{fc:['var(--spark)']},{az:25}),opts:['Prisme droit à base hexagonale','Pyramide à base hexagonale','Cylindre','Pyramide à base pentagonale'],ans:1,why:'Une base à 6 côtés (hexagone) et des triangles qui montent vers un même sommet : c’est une pyramide à base hexagonale.'},
  {q:'Lequel de ces objets n’est pas un polyèdre ?',opts:['Un dé à jouer','Une boîte à chaussures','Une canette','Une tente canadienne'],ans:2,why:'La canette est un cylindre : elle a une surface courbe. Un polyèdre n’a que des faces planes.'},
  {q:'Un pavé dont toutes les arêtes ont la même longueur est…',opts:['un prisme à base triangulaire','un cube','une pyramide','un cylindre'],ans:1,why:'Si toutes les arêtes sont égales, toutes les faces sont des carrés identiques : c’est un cube.'},
  {q:'Ce solide est un prisme droit couché. Quelles sont ses bases ?',fig:(()=>{ const S={vs:[[.9,-1.4,-.6],[.9,1.4,-.6],[-.9,1.4,-.6],[-.9,-1.4,-.6],[0,-1.4,.8],[0,1.4,.8]],fs:[[0,1,2,3],[0,3,4],[1,2,5],[0,1,5,4],[3,2,5,4]]}; const W=view({az:40}); polyh(W,S,{fc:['var(--accent)','var(--spark)','var(--spark)']}); return W.svg(); })(),
   opts:['Les deux triangles','Les trois rectangles','La face posée au sol','Il n’a pas de base'],ans:0,why:'Les bases d’un prisme sont les deux faces identiques et parallèles, ici les deux triangles des bouts. Le prisme est couché, mais ses bases restent ces triangles.'},
  {q:'Quelle affirmation est vraie ?',opts:['Un cylindre a 2 sommets','Toutes les faces d’une pyramide sont des triangles','Un cube est un prisme droit particulier','Un prisme droit a toujours 6 faces'],ans:2,why:'Le cube a deux bases carrées identiques et parallèles reliées par des carrés : c’est un prisme droit. Le cylindre n’a aucun sommet, la base d’une pyramide peut être un carré, et un prisme triangulaire n’a que 5 faces.'}]},
 {n:'Compter faces, arêtes et sommets',r:'Compter faces, arêtes et sommets',qs:[
  {q:'Combien d’arêtes a un prisme droit à base pentagonale (5 côtés) ?',fig:solid(prismB(ngon(5,1.1,PI/2),1.6),gold),lab:'arêtes =',ans:15,why:'Prisme : 3 × 5 = 15 arêtes (5 en bas, 5 en haut, 5 verticales).'},
  {q:'Combien de sommets a une pyramide dont la base a 7 côtés ?',lab:'sommets =',ans:8,why:'Les 7 sommets de la base plus le sommet du haut : 7 + 1 = 8.'},
  {q:'Combien de faces a une pyramide à base hexagonale ?',lab:'faces =',ans:7,why:'La base plus un triangle par côté : 1 + 6 = 7 faces.'},
  {q:'Un prisme droit a 24 sommets. Combien a-t-il d’arêtes ?',lab:'arêtes =',ans:36,why:'2<i>n</i> = 24 donne <i>n</i> = 12 côtés pour la base. Arêtes : 3 × 12 = 36.'},
  {q:'Une pyramide a 20 arêtes. Combien a-t-elle de faces ?',lab:'faces =',ans:11,why:'2<i>n</i> = 20 donne une base de <i>n</i> = 10 côtés. Faces : 10 + 1 = 11.'},
  {q:'Un polyèdre a 8 faces, toutes triangulaires. Combien a-t-il d’arêtes ?',lab:'arêtes =',ans:12,why:'8 triangles ont 8 × 3 = 24 côtés en tout. Chaque arête est comptée deux fois : 24 : 2 = 12 arêtes.'}]},
 {n:'Reconnaître un développement du cube',r:'Reconnaître un développement du cube',qs:[
  {q:'Laquelle de ces figures est un développement du cube ?',fig:nets([[[0,0],[1,0],[2,0],[3,0],[0,1],[3,1]],[[0,0],[1,0],[1,1],[2,1],[3,1],[3,2]],[[0,0],[1,0],[2,0],[1,1],[1,2],[2,2]],[[0,0],[0,1],[1,1],[2,1],[2,0],[3,1]]]),
   opts:['A','B','C','D'],ans:1,why:'Dans A, les deux carrés du haut se rabattent sur la même face. Dans C et D aussi, deux carrés se superposent quand on replie. B (un escalier 2-3-1) se referme : chaque face a une seule face opposée.'},
  {q:'On replie ce développement en cube. Quelle face se retrouve opposée à la face 2 ?',fig:nets([[[1,2],[0,1],[1,1],[2,1],[3,1],[2,0]]],['1','2','3','4','5','6']),lab:'face n°',ans:4,why:'Dans la rangée 2-3-4-5, deux carrés séparés par un seul carré sont opposés : 2 est opposée à 4 (et 3 à 5).'},
  {q:'Une figure de 6 carrés contient 4 carrés groupés en bloc 2 × 2. Peut-elle être un développement du cube ?',opts:['Oui, toujours','Non, jamais','Oui, si les deux autres carrés sont de part et d’autre du bloc','Ça dépend de la taille des carrés'],ans:1,why:'Les 4 carrés du bloc se touchent en un même point, alors qu’un sommet du cube ne touche que 3 faces : ils ne peuvent pas se replier.'},
  {q:'Combien existe-t-il de développements différents du cube (sans compter les figures obtenues en tournant ou en retournant la feuille) ?',opts:['6','8','11','12'],ans:2,why:'Il en existe exactement 11.'},
  {q:'On fabrique un dé avec ce développement. Sur un dé, deux faces opposées totalisent toujours 7. Quel nombre faut-il écrire sur la case « ? » ?',fig:nets([[[0,0],[1,0],[1,1],[2,1],[3,1],[3,2]]],['6','2','4','','','?']),lab:'nombre =',ans:5,why:'En repliant (prends la case 4 comme fond), la case « ? » se rabat en face de la case 2. Elle porte donc 7 − 2 = 5.'}]},
 {n:'Développements du pavé et du prisme',r:'Trouver les dimensions d’un développement de prisme',qs:[
  {q:'Quel rectangle n’apparaît <b>pas</b> dans le développement d’un pavé de 7 cm × 4 cm × 3 cm ?',opts:['7 cm × 4 cm','4 cm × 3 cm','7 cm × 3 cm','7 cm × 7 cm'],ans:3,why:'Les faces sont 7 × 4, 7 × 3 et 4 × 3, chacune deux fois. Aucune face n’a deux côtés de 7 cm.'},
  {q:'Un prisme droit de 9 cm de haut a pour base un hexagone régulier de 2 cm de côté. Quelle est la longueur de la bande formée par ses faces latérales ?',fig:solid(prismB(ngon(6,1),1.7),gold),lab:'longueur =',unit:'cm',ans:12,why:'La bande fait le tour de la base : 6 × 2 = 12 cm (et 9 cm de large).'},
  {q:'Un prisme droit de 7 cm de haut a pour base un triangle de côtés 3 cm, 4 cm et 5 cm. Quelle est l’aire de la bande de ses faces latérales ?',lab:'aire =',unit:'cm²',ans:84,why:'La bande mesure (3 + 4 + 5) × 7 = 12 cm × 7 cm, donc 84 cm².'},
  {q:'Les faces latérales d’un prisme droit à base carrée forment une bande de 30 cm × 10 cm (le côté de 30 cm fait le tour de la base). Quel est le côté du carré de base ?',lab:'côté =',unit:'cm',ans:7.5,why:'La bande a pour longueur le périmètre de la base : 4 × côté = 30, donc côté = 30 : 4 = 7,5 cm.'},
  {q:'Ce développement est celui de quel solide ?',fig:(()=>{ const P=plane({x:[-.5,10.5],y:[-3.6,7.6],grid:false,axes:false,w:260}); for(let i=0;i<5;i++) P.rect(i*2,0,2,4,{fill:'var(--accent)',fo:.2,c:'var(--ink)',w:1.6});
     const pent=s=>{ const ps=[[4,s?4:0],[6,s?4:0]]; let d=[2,0]; for(let i=2;i<5;i++){ const a=(s?1:-1)*2*PI/5; d=[d[0]*Math.cos(a)-d[1]*Math.sin(a),d[0]*Math.sin(a)+d[1]*Math.cos(a)]; const L=ps[ps.length-1]; ps.push([L[0]+d[0],L[1]+d[1]]); } return ps; };
     P.poly(pent(1),{fill:'var(--spark)',fo:.4,c:'var(--ink)',w:1.6}).poly(pent(0),{fill:'var(--spark)',fo:.4,c:'var(--ink)',w:1.6}); return P.svg(); })(),
   opts:['Pyramide à base pentagonale','Prisme droit à base pentagonale','Pavé','Cylindre'],ans:1,why:'Deux pentagones identiques (les bases) et une bande de 5 rectangles : c’est un prisme droit à base pentagonale.'}]},
 {n:'Développement du cylindre',r:'Calculer les dimensions du développement d’un cylindre',qs:[
  {q:'Un cylindre a un rayon de 5 cm. Quelle est la longueur du rectangle de son développement ? Arrondis au dixième.',lab:'longueur ≈',unit:'cm',ans:31.4,tol:.051,why:'2 × π × 5 = 10π ≈ 31,4 cm.'},
  {q:'Un cylindre a un diamètre de 12 cm et une hauteur de 20 cm. Quelle est la longueur du rectangle de son développement ? Arrondis au dixième.',lab:'longueur ≈',unit:'cm',ans:37.7,tol:.051,why:'Longueur = π × diamètre = π × 12 ≈ 37,7 cm. La hauteur 20 cm est la largeur du rectangle.'},
  {q:'On enroule une feuille de 50 cm de long en un tube, bord contre bord. Quel est le rayon du tube ? Arrondis au dixième.',lab:'r ≈',unit:'cm',ans:8,tol:.051,why:'r = 50 : (2 × π) ≈ 7,96, soit 8,0 cm.'},
  {q:'Le rectangle du développement d’un cylindre de rayon 2 cm et de hauteur 9 cm mesure environ…',fig:(()=>{ const W=view({x:[-1.4,1.4],y:[-1.5,1.5],w:200}), r=.7, h=2, N=48, t1=W.az-PI/2, P3=(t,z)=>[r*Math.cos(t),r*Math.sin(t),z], arc=(a,b,z)=>Array.from({length:N+1},(_,i)=>P3(a+(b-a)*i/N,z));
     W.poly(arc(t1+PI,t1+2*PI,-h/2),{open:1,c:'var(--muted)',w:1.5,dash:1}).poly([...arc(t1,t1+PI,-h/2),...arc(t1+PI,t1,h/2)],{fill:'var(--accent)',fo:.2,c:null}).poly(arc(0,2*PI,h/2),{fill:'var(--accent)',fo:.3,c:'var(--ink)',w:2.2}).poly(arc(t1,t1+PI,-h/2),{open:1,c:'var(--ink)',w:2.2});
     W.seg(P3(t1,-h/2),P3(t1,h/2),{c:'var(--ink)',w:2.2}).seg(P3(t1+PI,-h/2),P3(t1+PI,h/2),{c:'var(--ink)',w:2.2}); return W.svg(); })(),
   opts:['12,6 cm × 9 cm','4 cm × 9 cm','6,3 cm × 9 cm','12,6 cm × 2 cm'],ans:0,why:'Longueur : 2 × π × 2 ≈ 12,6 cm ; largeur : la hauteur, 9 cm. 4 cm est le diamètre et 6,3 cm la moitié du tour.'},
  {q:'Un rectangle de 18,84 cm × 6 cm s’enroule en cylindre : le côté de 18,84 cm fait le tour. Quel est le diamètre du cylindre ? Arrondis à l’unité.',lab:'d ≈',unit:'cm',ans:6,tol:.5,why:'Tour = π × d, donc d = 18,84 : π ≈ 6 cm (ou r = 18,84 : (2π) ≈ 3 cm, puis d = 2 × 3).'}]},
 {n:'Perspective cavalière',r:'Dessiner un pavé en perspective cavalière',qs:[
  {q:'On dessine un cube de 6 cm d’arête en perspective cavalière avec <i>k</i> = 0,5. Quelle longueur ont les fuyantes sur le dessin ?',lab:'fuyantes =',unit:'cm',ans:3,why:'Longueur dessinée = <i>k</i> × profondeur = 0,5 × 6 = 3 cm.'},
  {q:'Un pavé a une profondeur réelle de 8 cm. On le dessine en perspective cavalière avec <i>k</i> = 0,7. Quelle longueur ont les fuyantes ?',lab:'fuyantes =',unit:'cm',ans:5.6,tol:.001,why:'0,7 × 8 = 5,6 cm.'},
  {q:'Sur un dessin en perspective cavalière avec <i>k</i> = 0,6, une fuyante mesure 2,4 cm. Quelle est la vraie profondeur du solide ?',lab:'profondeur =',unit:'cm',ans:4,tol:.001,why:'Sur le dessin, la profondeur est multipliée par 0,6. Dans l’autre sens, on divise : 2,4 : 0,6 = 4 cm.'},
  {q:'Sur ce pavé dessiné en perspective cavalière, quelle face est dessinée en vraie grandeur ?',fig:cavBox(5,3,4,{lab:1}),opts:['La face C, du dessus','La face B, de droite','La face A, de devant','Aucune face'],ans:2,why:'En perspective cavalière, la face avant (A) et la face arrière qui lui est parallèle sont en vraie grandeur. Les faces B et C sont déformées.'},
  {q:'On dessine un pavé en perspective cavalière, fuyantes vers le haut à droite. Combien d’arêtes sont en pointillés ?',fig:cavBox(5,3,4),lab:'arêtes =',ans:3,why:'Seul le sommet arrière en bas à gauche est caché : les 3 arêtes qui en partent sont en pointillés.'}]},
];
})();
