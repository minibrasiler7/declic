/* Déclic — examen de compétence : Trigonométrie */
(()=>{
const U=(P,Q)=>{ const dx=Q[0]-P[0], dy=Q[1]-P[1], L=Math.hypot(dx,dy)||1; return [dx/L,dy/L]; };
// triangle rectangle en C : o.p = [A, B, C], o.n noms des sommets, o.l étiquettes des côtés [BC, AC, AB], o.ang étiquette de l’angle en A
function rt(o){
  const [A,B,C]=o.p, P=plane({x:o.x,y:o.y,grid:false,axes:false,w:o.w||240});
  const span=o.x[1]-o.x[0], d=o.d??span*.06, s=span*.04;
  P.poly([A,B,C],{fill:'var(--accent)',fo:.1,c:'var(--ink)',w:2});
  const u=U(C,A), v=U(C,B);
  P.poly([[C[0]+u[0]*s,C[1]+u[1]*s],[C[0]+(u[0]+v[0])*s,C[1]+(u[1]+v[1])*s],[C[0]+v[0]*s,C[1]+v[1]*s]],{open:true,c:'var(--ink)',w:1.5});
  const G=[(A[0]+B[0]+C[0])/3,(A[1]+B[1]+C[1])/3];
  if(o.n) [A,B,C].forEach((Q,i)=>{ const e=U(G,Q); P.text(Q[0]+e[0]*d,Q[1]+e[1]*d,o.n[i],{a:'middle',dy:5}); });
  if(o.l){ const sc=(o.w||240)/span; [[B,C],[A,C],[A,B]].forEach(([X,Y],i)=>{ if(!o.l[i]) return; const M=[(X[0]+Y[0])/2,(X[1]+Y[1])/2];
    let n=U(X,Y); n=[-n[1],n[0]]; if(n[0]*(M[0]-G[0])+n[1]*(M[1]-G[1])<0) n=[-n[0],-n[1]];
    const hw=String(o.l[i]).replace(/<[^>]+>/g,'').length*3.6, off=(7+Math.abs(n[0])*hw+Math.abs(n[1])*7)/sc;
    P.text(M[0]+n[0]*off,M[1]+n[1]*off,o.l[i],{a:'middle',dy:5}); }); }
  if(o.ang){ let a1=Math.atan2(B[1]-A[1],B[0]-A[0]), a2=Math.atan2(C[1]-A[1],C[0]-A[0]);
    if(a2-a1>Math.PI) a2-=2*Math.PI; if(a1-a2>Math.PI) a1-=2*Math.PI; const r=span*.1;
    P.curve(t=>A[0]+r*Math.cos(t),t=>A[1]+r*Math.sin(t),a1,a2,{c:'var(--spark)',w:2.5,n:40});
    const m=(a1+a2)/2; P.text(A[0]+1.9*r*Math.cos(m),A[1]+1.9*r*Math.sin(m),o.ang,{a:'middle',dy:5,c:'var(--spark)'}); }
  return P.svg();
}
// triangle d’angle a (en degrés) en A, posé à plat : A en bas à gauche, angle droit en bas à droite
const tri=(a,l,w)=>{ const c=Math.cos(rad(a)), s=Math.sin(rad(a)), H=5, k=Math.min(H/s, 8/c);
  return rt({p:[[0,0],[k*c,k*s],[k*c,0]],l,ang:a+'°',x:[-1.2,k*c+1.8],y:[-1.2,k*s+1],w:w||220,d:.6}); };

EXAMS['sec10-trigo']=[
 {n:'Nommer les côtés depuis un angle', r:'Côtés opposé, adjacent et hypoténuse', qs:[
   {q:'Le triangle ABC est rectangle en B. Vu depuis l’angle marqué en C, quel est le côté opposé&nbsp;?', fig:rt({p:[[5,0],[0,3.2],[0,0]],n:['C','A','B'],ang:' ',x:[-1,6.2],y:[-.9,4.1],w:200,d:.45}),
    opts:['[AC]','[BC]','[AB]','[CA] et [CB]'], ans:2, why:'[AC] est l’hypoténuse (en face de l’angle droit B). Le côté qui ne touche pas C est [AB] : c’est l’opposé.'},
   {q:'Le triangle KLM est rectangle en M. Vu depuis l’angle marqué en K, quel est le côté adjacent&nbsp;?', fig:rt({p:[[0,0],[5.5,3],[5.5,0]],n:['K','L','M'],ang:' ',x:[-1,6.6],y:[-.9,3.9],w:200,d:.45}),
    opts:['[KM]','[LM]','[KL]','[ML]'], ans:0, why:'Les deux côtés qui partent de K sont [KL] (l’hypoténuse, en face de M) et [KM] : c’est donc [KM] l’adjacent.'},
   {q:'Dans un triangle rectangle, on change d’angle aigu (on passe de l’un à l’autre). Que se passe-t-il&nbsp;?', opts:['Rien ne change','L’hypoténuse devient l’opposé','Opposé et adjacent échangent leurs rôles, l’hypoténuse reste la même','Tous les côtés changent de rôle'], ans:2, why:'L’hypoténuse est toujours en face de l’angle droit. Le côté opposé à un angle aigu est adjacent à l’autre, et inversement.'},
   {q:'Vu depuis un angle aigu α d’un triangle rectangle, le côté opposé est…', opts:['le plus long côté','le côté en face de l’angle α, qui ne le touche pas','le côté de l’angle droit qui touche α','toujours le côté horizontal'], ans:1, why:'L’opposé est en face de α. Le côté de l’angle droit qui touche α est l’adjacent, et le plus long est l’hypoténuse.'},
 ]},
 {n:'Sinus, cosinus et tangente', r:'Sinus, cosinus et tangente', qs:[
   {q:'Un triangle rectangle a des côtés de 6 cm, 8 cm et 10 cm. Que vaut le cosinus de l’angle situé en face du côté de 6 cm&nbsp;?', fig:rt({p:[[0,0],[4,3],[4,0]],l:['6','8','10'],ang:'α',x:[-1,5.4],y:[-1,3.8],w:200,d:.4}), lab:'cos α =', ans:.8, tol:1e-6, why:'Depuis α : l’adjacent mesure 8 et l’hypoténuse 10. cos α = 8 : 10 = 0,8.'},
   {q:'Un triangle rectangle a des côtés de 7, 24 et 25. Que vaut la tangente de l’angle situé en face du côté 7&nbsp;?', opts:[F(24,7),F(7,25),F(7,24),F(24,25)], ans:2, why:'tan = opposé : adjacent. L’opposé est 7, l’adjacent 24 (l’autre côté de l’angle droit) : tan α = 7/24.'},
   {q:'Un triangle rectangle a des côtés de 7, 24 et 25. Que vaut le sinus de l’angle situé en face du côté 24&nbsp;?', lab:'sin =', ans:.96, tol:1e-6, why:'sin = opposé : hypoténuse = 24 : 25 = 0,96.'},
   {q:'Laquelle de ces valeurs est impossible pour un angle aigu α&nbsp;?', opts:['sin α = 0,3','cos α = 0,99','tan α = 3','sin α = 1,2'], ans:3, why:'sin α = opposé : hypoténuse, et l’hypoténuse est le plus long côté : le quotient est toujours plus petit que 1. Une tangente, elle, peut dépasser 1.'},
   {q:'Deux triangles rectangles ont un angle de 50°. Le second est 3 fois plus grand que le premier. Dans le premier, opposé : hypoténuse ≈ 0,766. Que vaut ce quotient dans le second&nbsp;?', opts:['≈ 0,766','≈ 2,298','≈ 0,255','On ne peut pas savoir'], ans:0, why:'Toutes les longueurs sont multipliées par 3, le quotient ne change pas : il ne dépend que de l’angle. C’est sin 50° ≈ 0,766.'},
 ]},
 {n:'Calculer un côté (inconnue en haut)', r:'Calculer un côté : l’inconnue en haut', qs:[
   {q:'Un triangle rectangle a une hypoténuse de 12 cm et un angle aigu de 30°. Combien mesure le côté opposé à cet angle&nbsp;?', unit:'cm', ans:6, tol:.01, why:'sin 30° = opposé : 12, donc opposé = 12 × sin 30° = 12 × 0,5 = 6 cm.'},
   {q:'Un triangle rectangle a une hypoténuse de 15 cm et un angle aigu de 50°. Combien mesure le côté adjacent à cet angle, arrondi au centième&nbsp;?', unit:'cm', ans:9.64, tol:.011, why:'cos 50° = adjacent : 15, donc adjacent = 15 × cos 50° ≈ 15 × 0,643 ≈ 9,64 cm.'},
   {q:'Quelle est la longueur <i>x</i> sur la figure, arrondie au centième&nbsp;?', fig:tri(40,['x','7 cm','']), unit:'cm', ans:5.87, tol:.011, why:'Depuis l’angle de 40° : 7 cm est l’adjacent, x l’opposé. Tangente : x = 7 × tan 40° ≈ 7 × 0,839 ≈ 5,87 cm.'},
   {q:'Le triangle de la figure a une hypoténuse de 20 cm. Quelle est la longueur <i>x</i>, arrondie au centième&nbsp;?', fig:tri(65,['x','','20 cm']), unit:'cm', ans:18.13, tol:.011, why:'Depuis l’angle de 65° : 20 cm est l’hypoténuse, x l’opposé. Sinus : x = 20 × sin 65° ≈ 18,13 cm.'},
   {q:'Un toboggan droit de 4 m de long fait un angle de 35° avec le sol. À quelle hauteur se trouve son sommet, arrondie au centième&nbsp;?', unit:'m', ans:2.29, tol:.011, why:'Le toboggan est l’hypoténuse, la hauteur est l’opposé : h = 4 × sin 35° ≈ 4 × 0,574 ≈ 2,29 m.'},
 ]},
 {n:'Calculer un côté (inconnue en bas)', r:'Calculer un côté : l’inconnue en bas', qs:[
   {q:'Un triangle rectangle a un angle aigu de 20° et le côté opposé à cet angle mesure 4 cm. Combien mesure l’hypoténuse, arrondie au centième&nbsp;?', unit:'cm', ans:11.7, tol:.011, why:'sin 20° = 4 : h, donc h = 4 : sin 20° ≈ 4 : 0,342 ≈ 11,70 cm.'},
   {q:'Quelle est la longueur <i>x</i> de l’hypoténuse sur la figure, arrondie au centième&nbsp;?', fig:tri(35,['','9 cm','x']), unit:'cm', ans:10.99, tol:.011, why:'Depuis 35° : 9 cm est l’adjacent, x l’hypoténuse. cos 35° = 9 : x, donc x = 9 : cos 35° ≈ 9 : 0,819 ≈ 10,99 cm.'},
   {q:'Sur la figure, le côté opposé à l’angle de 60° mesure 10 cm. Quelle est la longueur <i>x</i>, arrondie au centième&nbsp;?', fig:tri(60,['10 cm','x','']), unit:'cm', ans:5.77, tol:.011, why:'Depuis 60° : 10 cm est l’opposé, x l’adjacent. tan 60° = 10 : x, donc x = 10 : tan 60° ≈ 10 : 1,732 ≈ 5,77 cm.'},
   {q:'On a écrit tan 40° = 8 : <i>x</i>. Que vaut <i>x</i>&nbsp;?', opts:['8 × tan 40°','tan 40° : 8','8 : tan 40°','8 − tan 40°'], ans:2, why:'Produit en croix : x × tan 40° = 8. Le nombre qui, multiplié par tan 40°, donne 8 est 8 : tan 40° ≈ 9,53.'},
   {q:'Un cerf-volant vole 30 m au-dessus de la main qui tient le fil. Le fil, bien droit, fait 40° avec l’horizontale. Quelle est la longueur du fil, arrondie au centième&nbsp;?', unit:'m', ans:46.67, tol:.02, why:'Le fil est l’hypoténuse, la hauteur 30 m l’opposé : sin 40° = 30 : L, donc L = 30 : sin 40° ≈ 46,67 m.'},
 ]},
 {n:'Calculer un angle', r:'Calculer un angle', qs:[
   {q:'Dans un triangle rectangle, le côté opposé à α mesure 5 cm et le côté adjacent 8 cm. Combien mesure α, arrondi au centième de degré&nbsp;?', unit:'°', ans:32.01, tol:.011, why:'tan α = 5 : 8 = 0,625, donc α = tan⁻¹(0,625) ≈ 32,01°.'},
   {q:'Quel est l’angle α sur la figure, arrondi au centième de degré&nbsp;?', fig:rt({p:[[0,0],[6,8],[6,0]],l:['','6 cm','10 cm'],ang:'α',x:[-1.2,7.8],y:[-1.2,9],w:180,d:.6}), unit:'°', ans:53.13, tol:.011, why:'Adjacent 6, hypoténuse 10 : cos α = 0,6, donc α = cos⁻¹(0,6) ≈ 53,13°.'},
   {q:'Une échelle de 7 m touche un mur à 3 m de hauteur. Quel angle fait-elle avec le sol, arrondi au centième de degré&nbsp;?', unit:'°', ans:25.38, tol:.011, why:'L’échelle est l’hypoténuse, la hauteur l’opposé : sin α = 3 : 7, donc α = sin⁻¹(3/7) ≈ 25,38°.'},
   {q:'Dans un triangle rectangle, l’hypoténuse mesure 9 cm et le côté opposé à α mesure 4,5 cm. Combien mesure α&nbsp;?', unit:'°', ans:30, tol:.01, why:'sin α = 4,5 : 9 = 0,5, donc α = sin⁻¹(0,5) = 30°.'},
   {q:'Pour trouver un angle, Sam tape cos⁻¹(10 : 8) et la calculatrice affiche une erreur. Pourquoi&nbsp;?', opts:['Sa calculatrice est en panne','Il a mis l’hypoténuse en haut : le cosinus est adjacent : hypoténuse, donc 8 : 10','Il fallait taper cos(10 : 8)','On ne peut pas calculer d’angle avec un cosinus'], ans:1, why:'Un cosinus vaut adjacent : hypoténuse, toujours plus petit que 1. 10 : 8 = 1,25 est impossible. Il faut cos⁻¹(0,8) ≈ 36,87°.'},
 ]},
 {n:'Mesurer l’inaccessible', r:'Mesurer l’inaccessible', qs:[
   {q:'Tu es à 30 m d’un immeuble. Tes yeux sont à 1,5 m du sol et tu vois le haut de l’immeuble sous un angle de 50° au-dessus de l’horizontale. Quelle est la hauteur de l’immeuble, arrondie au centième&nbsp;?', unit:'m', ans:37.25, tol:.02, why:'Au-dessus des yeux : 30 × tan 50° ≈ 35,75 m. On ajoute 1,5 m : environ 37,25 m.'},
   {q:'Un poteau vertical de 6 m de haut. Le soleil est à 35° au-dessus de l’horizon. Quelle est la longueur de l’ombre du poteau au sol, arrondie au centième&nbsp;?', unit:'m', ans:8.57, tol:.011, why:'Depuis le bout de l’ombre, l’angle vaut 35°, le poteau est l’opposé et l’ombre l’adjacent : ombre = 6 : tan 35° ≈ 8,57 m.'},
   {q:'Une route a une pente de 8 % : elle monte de 8 m pour 100 m à l’horizontale. Quel angle fait-elle avec l’horizontale, arrondi au centième de degré&nbsp;?', unit:'°', ans:4.57, tol:.011, why:'tan α = 8 : 100 = 0,08, donc α = tan⁻¹(0,08) ≈ 4,57°.'},
   {q:'Tu connais ta distance au pied d’un arbre et l’angle sous lequel tu vois son sommet. Pour calculer sa hauteur, quel quotient utilises-tu&nbsp;?', opts:['Le sinus','Le cosinus','La tangente','Pythagore suffit'], ans:2, why:'La distance au sol est l’adjacent, la hauteur l’opposé : opposé et adjacent, c’est la tangente (TOA). Pythagore demanderait deux côtés connus.'},
   {q:'Pour mesurer la largeur d’une rivière, Ana se place face à un arbre sur l’autre rive, puis marche 40 m le long de la rive. De là, l’angle entre sa direction de marche et l’arbre est de 55°. Quelle est la largeur de la rivière, arrondie au centième&nbsp;?',
    fig:(()=>{ const P=plane({x:[-1,8],y:[-1.4,9.4],w:180,grid:false,axes:false}); P.rect(-1,0,9,8,{fill:'var(--math)',fo:.15,c:null});
      P.poly([[0,0],[5.6,0],[0,8]],{fill:'var(--accent)',fo:.1,c:'var(--ink)',w:2}); P.dot(0,8,{c:'var(--ok)',l:'arbre'}).dot(0,0,{r:4}).dot(5.6,0,{r:4,l:'Ana'});
      P.poly([[0,.5],[.5,.5],[.5,0]],{open:true,c:'var(--ink)',w:1.5}).text(2.8,0,'40 m',{a:'middle',dy:16}).text(4.6,.9,'55°',{c:'var(--spark)'}); return P.svg(); })(),
    unit:'m', ans:57.13, tol:.02, why:'Depuis Ana : 40 m est l’adjacent, la largeur est l’opposé. Largeur = 40 × tan 55° ≈ 40 × 1,428 ≈ 57,13 m.'},
 ]},
];
})();
