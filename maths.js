/* Déclic — parcours de mathématiques.
   Chaque cours : id, br (alg | ana | geo), lv (ecole | gym | uni), h, p, lessons (titres), steps (1re leçon jouable).
   Types d'étapes (déduits des champs) :
   - params + draw [+ info]        → exploration avec curseurs
   - params + draw + ok + why      → pratique : régler les curseurs pour atteindre un but
   - opts + ans + why              → QCM
   - ans + why (sans opts)         → réponse numérique (virgule, fraction acceptées), tol optionnelle */


function fracBar(n,d,col='var(--math)'){
  const W=300,h=38,bars=Math.max(1,Math.ceil(n/d)),w=(W-4)/d; let s='';
  for(let b=0;b<bars;b++) for(let i=0;i<d;i++){ const k=b*d+i;
    s+=`<rect x="${2+i*w}" y="${2+b*(h+8)}" width="${w}" height="${h}" fill="${k<n?col:'var(--surface)'}" stroke="var(--ink)" stroke-width="1.5"/>`; }
  return `<svg viewBox="0 0 ${W} ${bars*(h+8)}" width="${W}">${s}</svg>`;
}
function balance(L,R){
  const items=(cx,o)=>{ const arr=[...Array(o.x).fill('x'),...Array(o.u).fill('u')]; return arr.map((t,i)=>{
    const x=cx-57+(i%5)*23, y=124-Math.floor(i/5)*24;
    return t==='x'?`<rect x="${x}" y="${y-22}" width="21" height="21" rx="4" fill="var(--accent)"/><text x="${x+10.5}" y="${y-6}" font-size="13" font-weight="700" text-anchor="middle" fill="var(--accent-ink)">x</text>`
                  :`<circle cx="${x+10.5}" cy="${y-10}" r="9" fill="var(--spark)"/>`; }).join(''); };
  const pan=cx=>`<line x1="${cx-58}" y1="128" x2="${cx}" y2="30" stroke="var(--muted)"/><line x1="${cx+58}" y1="128" x2="${cx}" y2="30" stroke="var(--muted)"/><rect x="${cx-60}" y="126" width="120" height="6" rx="3" fill="var(--ink)"/>`;
  return `<svg viewBox="0 0 320 175" width="320"><path d="M160 30 L146 172 H174Z" fill="var(--muted)"/>${pan(90)}${pan(230)}<line x1="30" y1="30" x2="290" y2="30" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/><circle cx="160" cy="30" r="6" fill="var(--ink)"/>${items(90,L)}${items(230,R)}</svg>`;
}
const LEVELS={ecole:{h:'École obligatoire',s:'9e – 11e année'},gym:{h:'Gymnase',s:'Maturité'},uni:{h:'Université',s:'1re année'}};
const BRANCHES={alg:'Algèbre',ana:'Analyse',geo:'Géométrie'};

const MATHS=[
/* ================= ÉCOLE OBLIGATOIRE ================= */
{id:'fractions',br:'alg',lv:'ecole',h:'Fractions',p:'Partager, comparer et calculer avec des parts.',
 lessons:['Fractions équivalentes','Additionner des fractions','Multiplier et diviser','Fractions et nombres décimaux'],
 steps:[
  {h:'Une fraction, c’est un partage',p:`Le <b>dénominateur</b> (en bas) dit en combien de parts égales on coupe. Le <b>numérateur</b> (en haut) dit combien de parts on prend.`,
   params:[{id:'n',l:'Numérateur',min:0,max:12,v:3},{id:'d',l:'Dénominateur',min:1,max:12,v:4}],
   draw:v=>fracBar(v.n,v.d), info:v=>`${F(v.n,v.d)} = ${fmt(v.n/v.d,3)}${v.n>v.d?' : plus d’une barre entière':''}`},
  {h:'Même part, autre écriture',p:`Quelle fraction vaut autant que ${F(2,3)}&nbsp;?`,fig:fracBar(2,3)+fracBar(4,6),
   opts:[F(4,6),F(3,4),F(2,6),F(6,4)],ans:0,why:`Multiplier le haut et le bas par 2 ne change pas la part : ${F(2,3)} = ${F(4,6)}. Les deux barres ont la même longueur colorée.`},
  {h:'Colorie trois quarts',p:`La barre est coupée en 8. Combien de huitièmes faut-il colorier pour obtenir ${F(3,4)}&nbsp;?`,
   params:[{id:'n',l:'Parts coloriées',min:0,max:8,v:1}],draw:v=>fracBar(v.n,8)+fracBar(3,4,'var(--line)'),
   ok:v=>v.n===6,why:`${F(3,4)} = ${F(6,8)} : on multiplie haut et bas par 2.`},
  {kind:'Défi',h:'Additionne',p:`${F(1,2)} + ${F(1,3)} = ${F('?',6)}. Quel est le numérateur&nbsp;?`,fig:fracBar(3,6)+fracBar(2,6,'var(--spark)'),
   ans:5,why:`On met tout en sixièmes : ${F(1,2)} = ${F(3,6)} et ${F(1,3)} = ${F(2,6)}. Donc ${F(3,6)} + ${F(2,6)} = ${F(5,6)}.`},
 ]},

{id:'litteral',br:'alg',lv:'ecole',h:'Calcul littéral',p:'Développer, factoriser, et voir les formules comme des aires.',
 lessons:['Développer avec des rectangles','Factoriser','Identités remarquables','Réduire une expression'],
 steps:[
  {h:'Développer, c’est découper un rectangle',p:`Un rectangle de largeur <i>a</i> et de longueur <i>b + c</i> a une aire <i>a(b + c)</i>. Coupé en deux, il donne <i>ab + ac</i>.`,
   params:[{id:'a',l:'a',min:1,max:4,v:2},{id:'b',l:'b',min:1,max:5,v:3},{id:'c',l:'c',min:1,max:4,v:2}],
   draw:v=>{ const P=plane({x:[-0.5,9.5],y:[-0.8,4.8],grid:false,axes:false});
     P.rect(0,0,v.b,v.a,{fill:'var(--math)',fo:.3,c:'var(--ink)',w:2}).rect(v.b,0,v.c,v.a,{fill:'var(--spark)',fo:.45,c:'var(--ink)',w:2});
     P.text(v.b/2,v.a/2,'ab',{a:'middle',dy:5,s:16}).text(v.b+v.c/2,v.a/2,'ac',{a:'middle',dy:5,s:16});
     P.text(v.b/2,0,'b',{a:'middle',dy:18}).text(v.b+v.c/2,0,'c',{a:'middle',dy:18}).text(0,v.a/2,'a',{a:'end',dx:-6,dy:5}); return P.svg(); },
   info:v=>`${v.a}(${v.b} + ${v.c}) = ${v.a*v.b} + ${v.a*v.c} = ${v.a*(v.b+v.c)}`},
  {h:'À toi',p:'Développe <i>3(x + 4)</i>.',opts:['3x + 4','3x + 12','3x + 7','x + 12'],ans:1,why:'Le 3 multiplie chaque terme de la parenthèse : 3·x + 3·4 = 3x + 12.'},
  {h:'(a + b)², un carré en quatre morceaux',p:'Un carré de côté <i>a + b</i> se découpe en un carré <i>a²</i>, un carré <i>b²</i> et deux rectangles <i>ab</i>.',
   params:[{id:'a',l:'a',min:1,max:4,v:3},{id:'b',l:'b',min:1,max:3,v:2}],
   draw:v=>{ const s=v.a+v.b,P=plane({x:[-0.8,7.3],y:[-0.8,7.3],grid:false,axes:false});
     P.rect(0,v.b,v.a,v.a,{fill:'var(--math)',fo:.35,c:'var(--ink)',w:2}).rect(v.a,0,v.b,v.b,{fill:'var(--spark)',fo:.5,c:'var(--ink)',w:2})
      .rect(0,0,v.a,v.b,{fill:'var(--accent)',fo:.2,c:'var(--ink)',w:2}).rect(v.a,v.b,v.b,v.a,{fill:'var(--accent)',fo:.2,c:'var(--ink)',w:2});
     P.text(v.a/2,v.b+v.a/2,'a²',{a:'middle',dy:5,s:16}).text(v.a+v.b/2,v.b/2,'b²',{a:'middle',dy:5,s:15}).text(v.a/2,v.b/2,'ab',{a:'middle',dy:5}).text(v.a+v.b/2,v.b+v.a/2,'ab',{a:'middle',dy:5});
     return P.svg(); },
   info:v=>`(${v.a} + ${v.b})² = ${v.a*v.a} + 2·${v.a*v.b} + ${v.b*v.b} = ${(v.a+v.b)**2}`,
   note:'<b>Erreur fréquente :</b> (a + b)² n’est pas a² + b². Il manque les deux rectangles ab.'},
  {kind:'Défi',h:'Identité remarquable',p:'Développe <i>(x + 5)²</i>.',opts:['x² + 25','x² + 10x + 25','x² + 5x + 25','2x + 10'],ans:1,why:'(x + 5)² = x² + 2·5·x + 5² = x² + 10x + 25.'},
 ]},

{id:'equations1',br:'alg',lv:'ecole',h:'Équations du 1er degré',p:'Trouver l’inconnue en gardant la balance en équilibre.',
 lessons:['La balance','Équations avec parenthèses','Mettre un problème en équation','Inéquations'],
 steps:[
  {h:'Une équation est une balance',p:'Les deux côtés pèsent pareil. On peut faire la même opération des deux côtés sans la déséquilibrer. Avance étape par étape.',
   params:[{id:'e',l:'Étape',min:0,max:2,v:0}],
   draw:v=>[balance({x:3,u:2},{x:0,u:11}),balance({x:3,u:0},{x:0,u:9}),balance({x:1,u:0},{x:0,u:3})][v.e],
   info:v=>['<b>3x + 2 = 11</b>','On enlève 2 de chaque côté : <b>3x = 9</b>','On divise chaque côté par 3 : <b>x = 3</b>'][v.e]},
  {h:'À toi',p:'<i>5x − 7 = 18</i>. Combien vaut <i>x</i>&nbsp;?',lab:'x =',ans:5,why:'On ajoute 7 : 5x = 25. On divise par 5 : x = 5.'},
  {h:'Par où commencer&nbsp;?',p:'<i>4x + 3 = 2x + 11</i>. Quelle est une bonne première étape&nbsp;?',
   opts:['Soustraire 2x des deux côtés','Diviser seulement le côté gauche par 4','Ajouter 3 des deux côtés','Multiplier 2x par 11'],ans:0,
   why:'On regroupe les x d’un seul côté : 2x + 3 = 11, puis 2x = 8, donc x = 4.'},
  {kind:'Défi',h:'Mettre en équation',p:'Léa a trois fois l’âge de son frère. Ensemble, ils ont 48 ans. Quel âge a son frère&nbsp;?',unit:'ans',ans:12,
   why:'Frère : x. Léa : 3x. Donc x + 3x = 48, 4x = 48 et x = 12.'},
 ]},

{id:'proportion',br:'ana',lv:'ecole',h:'Proportionnalité et pourcentages',p:'Règle de trois, pourcentages, TVA et soldes.',
 lessons:['Grandeurs proportionnelles','Pourcentages','Hausses et baisses successives','Échelles et vitesses'],
 steps:[
  {h:'Proportionnel = droite qui passe par 0',p:'Si 1 kg de pommes coûte <i>p</i> francs, <i>x</i> kg coûtent <i>p·x</i>. Le graphe est une droite qui part de l’origine.',
   params:[{id:'p',l:'Prix au kilo',min:1,max:6,step:.5,v:2.5,u:' CHF'}],
   draw:v=>{ const P=plane({x:[-0.4,5.5],y:[-2,32],h:260,step:1,grid:false,lx:1,ly:10});
     for(let y=0;y<=30;y+=10) P.seg(0,y,5.5,y,{c:'var(--line)',w:1}); P.fn(x=>v.p*x,{from:0});
     [1,2,3,4,5].forEach(x=>P.dot(x,v.p*x,{r:5})); P.text(5.4,0,'kg',{a:'end',dy:-6,c:'var(--muted)'}); return P.svg(); },
   info:v=>`1 kg → ${fmt(v.p)} CHF · 2 kg → ${fmt(2*v.p)} CHF · 4 kg → ${fmt(4*v.p)} CHF`},
  {h:'Règle de trois',p:'3 kg de pommes coûtent 7,50 CHF. Combien coûtent 5 kg&nbsp;?',unit:'CHF',ans:12.5,tol:.001,why:'Prix au kilo : 7,50 ÷ 3 = 2,50 CHF. Pour 5 kg : 5 × 2,50 = 12,50 CHF.'},
  {h:'Le piège des pourcentages',p:'Un prix augmente de 20 %, puis baisse de 20 %. Au final&nbsp;?',
   opts:['Il revient au prix de départ','Il a baissé de 4 %','Il a monté de 4 %','Il a baissé de 2 %'],ans:1,
   why:'×1,2 puis ×0,8 donne ×0,96. La baisse s’applique à un montant plus grand, donc on perd 4 %.'},
  {kind:'Défi',h:'La TVA',p:'Une facture fait 200 CHF hors taxe. Avec la TVA suisse de 8,1 %, combien paie-t-on&nbsp;?',unit:'CHF',ans:216.2,tol:.001,why:'200 × 1,081 = 216,20 CHF.'},
 ]},

{id:'affines',br:'ana',lv:'ecole',use:'pente',h:'Fonctions affines',p:'Pentes, droites et tout ce qui monte ou descend.',
 lessons:['La pente d’une droite','Ordonnée à l’origine','Droite passant par deux points','Comparer des tarifs']},

{id:'pythagore',br:'geo',lv:'ecole',h:'Théorème de Pythagore',p:'Le plus célèbre des théorèmes, vu avec des carrés.',
 lessons:['Le théorème en images','La réciproque','Distances dans un repère','Pythagore dans l’espace'],
 steps:[
  {h:'a² + b² = c²',p:'Dans un triangle rectangle, l’aire du carré construit sur l’hypoténuse égale la somme des aires des deux autres carrés.',
   params:[{id:'a',l:'Côté a',min:1,max:5,v:3},{id:'b',l:'Côté b',min:1,max:5,v:4}],
   draw:v=>{ const a=v.a,b=v.b,P=plane({x:[-5.5,10.5],y:[-5.5,10.5],grid:false,axes:false,w:300});
     P.poly([[0,0],[a,0],[a,-a],[0,-a]],{fill:'var(--math)',fo:.35,c:'var(--ink)',w:1.5})
      .poly([[0,0],[0,b],[-b,b],[-b,0]],{fill:'var(--spark)',fo:.45,c:'var(--ink)',w:1.5})
      .poly([[a,0],[0,b],[b,a+b],[a+b,a]],{fill:'var(--accent)',fo:.3,c:'var(--ink)',w:1.5})
      .poly([[0,0],[a,0],[0,b]],{fill:'var(--surface)',fo:1,c:'var(--ink)',w:2.5});
     P.text(a/2,-a/2,`${a*a}`,{a:'middle',dy:5,s:15}).text(-b/2,b/2,`${b*b}`,{a:'middle',dy:5,s:15}).text((a+b)/2,(a+b)/2,`${a*a+b*b}`,{a:'middle',dy:5,s:16});
     return P.svg(); },
   info:v=>`${v.a}² + ${v.b}² = ${v.a*v.a} + ${v.b*v.b} = ${v.a*v.a+v.b*v.b}, donc c = ${fmt(Math.hypot(v.a,v.b))}`},
  {h:'Calcule l’hypoténuse',p:'Les côtés de l’angle droit mesurent 6 cm et 8 cm. Quelle est la longueur de l’hypoténuse&nbsp;?',unit:'cm',ans:10,why:'6² + 8² = 36 + 64 = 100, et √100 = 10.'},
  {h:'L’échelle contre le mur',p:'Une échelle de 5 m est posée contre un mur. Son pied est à 3 m du mur. À quelle hauteur touche-t-elle le mur&nbsp;?',
   fig:(()=>{ const P=plane({x:[-0.5,4.5],y:[-0.5,5],grid:false,axes:false,w:240}); P.seg(0,0,4.2,0,{c:'var(--muted)',w:3}).seg(0,0,0,4.8,{c:'var(--muted)',w:6}).seg(3,0,0,4,{c:'var(--spark)',w:5})
     .text(1.5,0,'3 m',{a:'middle',dy:18}).text(1.6,2.2,'5 m',{s:14}).text(0,2,'?',{dx:-14,s:16}); return P.svg(); })(),
   unit:'m',ans:4,why:'h² + 3² = 5², donc h² = 25 − 9 = 16 et h = 4 m.'},
  {kind:'Défi',h:'La réciproque',p:'Un triangle a des côtés de 5, 12 et 13 cm. Est-il rectangle&nbsp;?',opts:['Oui','Non','On ne peut pas savoir sans mesurer un angle'],ans:0,
   why:'5² + 12² = 25 + 144 = 169 = 13². La réciproque de Pythagore dit qu’il est rectangle.'},
 ]},

{id:'aires',br:'geo',lv:'ecole',h:'Aires et périmètres',p:'Du rectangle au disque, découper et recoller.',
 lessons:['Le parallélogramme','Triangles et trapèzes','Le disque et π','Volumes de solides'],
 steps:[
  {h:'Pencher sans changer l’aire',p:'Coupe le triangle de gauche d’un parallélogramme, recolle-le à droite : tu obtiens un rectangle. Son aire vaut toujours <b>base × hauteur</b>.',
   params:[{id:'s',l:'Inclinaison',min:-3,max:3,step:.5,v:1.5}],
   draw:v=>{ const P=plane({x:[-3.5,8.5],y:[-1,4],grid:false,axes:false});
     P.poly([[0,0],[5,0],[5+v.s,3],[v.s,3]],{fill:'var(--math)',fo:.3,c:'var(--ink)',w:2}).rect(0,0,5,3,{c:'var(--muted)',w:1.5,dash:true});
     P.seg(v.s,3,v.s,0,{c:'var(--spark)',w:2,dash:true}).text(2.5,0,'base 5',{a:'middle',dy:18}).text(v.s,1.5,'h = 3',{dx:6}); return P.svg(); },
   info:()=>'Aire = 5 × 3 = 15, quelle que soit l’inclinaison.'},
  {h:'Le triangle',p:'Un triangle a une base de 10 cm et une hauteur de 6 cm. Quelle est son aire&nbsp;?',unit:'cm²',ans:30,why:'Un triangle est la moitié d’un parallélogramme : 10 × 6 ÷ 2 = 30 cm².'},
  {h:'Le disque',p:'Aire d’un disque de rayon 3 cm, arrondie au centième&nbsp;?',unit:'cm²',ans:28.27,tol:.011,why:'A = π·r² = π × 9 ≈ 28,27 cm².'},
  {kind:'Défi',h:'Changer d’échelle',p:'Si on double le côté d’un carré, son aire est…',opts:['doublée','multipliée par 4','multipliée par 8','inchangée'],ans:1,why:'(2c)² = 4c². L’aire grandit comme le carré des longueurs.'},
 ]},

{id:'thales',br:'geo',lv:'ecole',h:'Thalès et agrandissements',p:'Mesurer un arbre avec son ombre, lire une carte.',
 lessons:['Agrandir et réduire','Le théorème de Thalès','Mesurer l’inaccessible','Échelles des cartes'],
 steps:[
  {h:'Agrandir d’un facteur k',p:'Quand on agrandit une figure d’un facteur <i>k</i>, toutes les longueurs sont multipliées par <i>k</i>. Les angles ne changent pas.',
   params:[{id:'k',l:'Facteur k',min:.5,max:3,step:.25,v:2}],
   draw:v=>{ const P=plane({x:[-0.5,9],y:[-0.5,6],grid:false,axes:false}); const t=[[0,0],[2,0],[0.6,1.6]];
     P.poly(t.map(p=>[p[0]*v.k,p[1]*v.k]),{fill:'var(--math)',fo:.25,c:'var(--math)',w:2.5}).poly(t,{fill:'var(--spark)',fo:.6,c:'var(--ink)',w:1.5});
     return P.svg(); },
   info:v=>`Périmètre × ${fmt(v.k)} · Aire × ${fmt(v.k*v.k,4)}`},
  {h:'L’arbre et son ombre',p:'Un bâton de 1 m fait une ombre de 1,5 m. Au même moment, un arbre fait une ombre de 12 m. Quelle est la hauteur de l’arbre&nbsp;?',
   fig:(()=>{ const P=plane({x:[-0.5,13],y:[-1,9],grid:false,axes:false,w:300}); P.seg(-0.3,0,12.8,0,{c:'var(--muted)',w:2}).seg(0,0,0,8,{c:'var(--sci)',w:6}).seg(0,8,12,0,{c:'var(--spark)',w:2,dash:true})
     .seg(4,0,4,1,{c:'var(--ink)',w:4}).seg(4,1,5.5,0,{c:'var(--spark)',w:2,dash:true}).text(6,0,'12 m',{a:'middle',dy:18}).text(0,4,'?',{dx:10,s:16}); return P.svg(); })(),
   unit:'m',ans:8,why:'Les rayons du soleil sont parallèles : les triangles sont semblables. 12 ÷ 1,5 = 8, donc l’arbre mesure 8 × 1 m = 8 m.'},
  {h:'Lire une carte',p:'Sur une carte nationale au 1:25 000, 4 cm représentent…',opts:['250 m','1 km','4 km','10 km'],ans:1,why:'4 × 25 000 = 100 000 cm = 1 000 m = 1 km.'},
  {kind:'Défi',h:'Et l’aire&nbsp;?',p:'On agrandit une photo d’un facteur 3. Par combien son aire est-elle multipliée&nbsp;?',lab:'×',ans:9,why:'Les longueurs sont × 3, donc l’aire est × 3² = 9.'},
 ]},

/* ================= GYMNASE ================= */
{id:'second',br:'alg',lv:'gym',h:'Équations du 2e degré',p:'Paraboles, racines et discriminant.',
 lessons:['Paraboles et racines','Le discriminant','Forme canonique','Somme et produit des racines'],
 steps:[
  {h:'Où la parabole coupe-t-elle l’axe&nbsp;?',p:'Résoudre <i>x² + bx + c = 0</i>, c’est chercher où la parabole <i>y = x² + bx + c</i> touche l’axe horizontal. Il peut y avoir 2, 1 ou 0 solutions.',
   params:[{id:'b',l:'b',min:-6,max:6,v:-2},{id:'c',l:'c',min:-6,max:6,v:-3}],
   draw:v=>{ const P=plane({x:[-6,6],y:[-6,6],lab:2}); P.fn(x=>x*x+v.b*x+v.c); const D=v.b*v.b-4*v.c;
     if(D>=0){ [(-v.b-Math.sqrt(D))/2,(-v.b+Math.sqrt(D))/2].forEach(r=>P.dot(r,0)); } return P.svg(); },
   info:v=>{ const D=v.b*v.b-4*v.c; return `Δ = b² − 4c = ${fmt(D)} → ${D>0?'2 solutions':D===0?'1 solution (double)':'aucune solution réelle'}`; }},
  {h:'Factoriser pour résoudre',p:'Résous <i>x² − 5x + 6 = 0</i>.',opts:['x = 2 ou x = 3','x = −2 ou x = −3','x = 1 ou x = 6','Pas de solution'],ans:0,
   why:'x² − 5x + 6 = (x − 2)(x − 3). Un produit est nul si l’un des facteurs l’est.'},
  {h:'Une seule racine',p:'Règle <i>c</i> pour que <i>y = x² − 4x + c</i> touche l’axe en un seul point.',
   params:[{id:'c',l:'c',min:-4,max:8,v:0}],
   draw:v=>{ const P=plane({x:[-3,7],y:[-5,5],lab:2}); P.fn(x=>x*x-4*x+v.c); return P.svg(); },
   ok:v=>v.c===4,why:'Une seule racine quand Δ = 0 : 16 − 4c = 0, donc c = 4. On obtient (x − 2)².'},
  {kind:'Défi',h:'Le discriminant',p:'Calcule le discriminant de <i>2x² + 3x − 2</i>.',lab:'Δ =',ans:25,why:'Δ = b² − 4ac = 9 − 4·2·(−2) = 9 + 16 = 25. Les racines sont ½ et −2.'},
 ]},

{id:'systemes',br:'alg',lv:'gym',h:'Systèmes d’équations',p:'Deux inconnues, deux droites, un point de rencontre.',
 lessons:['Deux droites qui se croisent','Substitution','Combinaison linéaire','Systèmes 3 × 3'],
 steps:[
  {h:'Résoudre = trouver l’intersection',p:'Chaque équation à deux inconnues est une droite. La solution du système est le point commun aux deux droites. La bleue est <i>x + y = 5</i>.',
   params:[{id:'a',l:'Pente de la rouge',min:-3,max:3,step:.5,v:1},{id:'b',l:'Ordonnée de la rouge',min:-4,max:4,v:-1}],
   draw:v=>{ const P=plane({x:[-6,6],y:[-6,6],lab:2}); P.fn(x=>5-x,{c:'var(--math)'}).fn(x=>v.a*x+v.b,{c:'var(--bad)'});
     if(v.a!==-1){ const x=(5-v.b)/(v.a+1); P.dot(x,5-x); } return P.svg(); },
   info:v=>{ if(v.a===-1) return v.b===5?'Droites confondues : une infinité de solutions':'Droites parallèles : aucune solution'; const x=(5-v.b)/(v.a+1); return `Solution : x = ${fmt(x)}, y = ${fmt(5-x)}`; }},
  {h:'À toi',p:'Résous : <i>x + y = 10</i> et <i>x − y = 2</i>.',opts:['(6 ; 4)','(4 ; 6)','(5 ; 5)','(8 ; 2)'],ans:0,why:'En additionnant les deux équations : 2x = 12, donc x = 6 et y = 4.'},
  {h:'Aucune solution',p:'La droite bleue est <i>y = 2x + 1</i>. Règle la rouge pour que le système n’ait <b>aucune</b> solution.',
   params:[{id:'a',l:'Pente',min:-3,max:3,step:.5,v:0},{id:'b',l:'Ordonnée',min:-4,max:4,v:1}],
   draw:v=>{ const P=plane({x:[-5,5],y:[-5,5],lab:2}); P.fn(x=>2*x+1,{c:'var(--math)'}).fn(x=>v.a*x+v.b,{c:'var(--bad)'}); return P.svg(); },
   ok:v=>v.a===2&&v.b!==1,why:'Pas de solution quand les droites sont parallèles et distinctes : même pente (2), ordonnée différente.'},
  {kind:'Défi',h:'Au cinéma',p:'3 adultes et 2 enfants paient 61 CHF. 1 adulte et 2 enfants paient 31 CHF. Combien coûte un billet adulte&nbsp;?',unit:'CHF',ans:15,
   why:'3A + 2E = 61 et A + 2E = 31. On soustrait : 2A = 30, donc A = 15 CHF (et E = 8 CHF).'},
 ]},

{id:'explog',br:'alg',lv:'gym',h:'Exponentielles et logarithmes',p:'Doublements, intérêts composés et échelles log.',
 lessons:['Croissance exponentielle','Le logarithme','Lois des logarithmes','Équations exponentielles'],
 steps:[
  {h:'Multiplier à chaque pas',p:'Une fonction exponentielle <i>y = a·bˣ</i> est multipliée par <i>b</i> chaque fois que <i>x</i> augmente de 1.',
   params:[{id:'a',l:'a (valeur en 0)',min:.5,max:3,step:.5,v:1},{id:'b',l:'b (facteur)',min:.25,max:3,step:.25,v:2}],
   draw:v=>{ const P=plane({x:[-4,4],y:[-1,7]}); P.fn(x=>v.a*Math.pow(v.b,x)).dot(0,v.a,{l:`(0 ; ${fmt(v.a)})`}); return P.svg(); },
   info:v=>v.b>1?'b > 1 : croissance, de plus en plus rapide':v.b<1?'b < 1 : décroissance vers 0':'b = 1 : constante'},
  {h:'Les bactéries',p:'Une colonie de 100 bactéries double chaque heure. Combien y en a-t-il après 5 heures&nbsp;?',opts:['500','1 000','3 200','10 000'],ans:2,why:'100 × 2⁵ = 100 × 32 = 3 200.'},
  {h:'Le logarithme',p:'Le logarithme répond à la question « à quelle puissance&nbsp;? ». Combien vaut <i>log₂(64)</i>&nbsp;?',ans:6,why:'2⁶ = 64, donc log₂(64) = 6.'},
  {kind:'Défi',h:'Intérêts composés',p:'Tu places 1 000 CHF à 5 % par an, intérêts composés. Combien as-tu après 2 ans&nbsp;?',unit:'CHF',ans:1102.5,tol:.001,why:'1 000 × 1,05 × 1,05 = 1 102,50 CHF. Les intérêts de la 2e année portent aussi sur ceux de la 1re.'},
 ]},

{id:'graphes',br:'ana',lv:'gym',h:'Fonctions et graphes',p:'Décaler, étirer et retourner des courbes.',
 lessons:['Transformer un graphe','Fonctions paires et impaires','Composition','Fonction réciproque'],
 steps:[
  {h:'y = a·(x − h)² + k',p:'À partir de <i>y = x²</i> (pointillé), <i>h</i> décale à droite, <i>k</i> décale vers le haut, <i>a</i> étire ou retourne.',
   params:[{id:'a',l:'a',min:-2,max:2,step:.5,v:1},{id:'h',l:'h',min:-3,max:3,v:0},{id:'k',l:'k',min:-3,max:3,v:0}],
   draw:v=>{ const P=plane({x:[-5,5],y:[-5,5],lab:2}); P.fn(x=>x*x,{c:'var(--muted)',dash:true,w:2}).fn(x=>v.a*(x-v.h)**2+v.k).dot(v.h,v.k,{l:'sommet'}); return P.svg(); },
   info:v=>`Sommet en (${fmt(v.h)} ; ${fmt(v.k)})`},
  {h:'Superpose les paraboles',p:'Règle les curseurs pour que ta parabole recouvre la parabole jaune pointillée.',
   params:[{id:'a',l:'a',min:-2,max:2,step:.5,v:-1},{id:'h',l:'h',min:-3,max:3,v:0},{id:'k',l:'k',min:-3,max:3,v:1}],
   draw:v=>{ const P=plane({x:[-5,5],y:[-5,5],lab:2}); P.fn(x=>(x-2)**2-1,{c:'var(--spark)',dash:true,w:5}).fn(x=>v.a*(x-v.h)**2+v.k); return P.svg(); },
   ok:v=>v.a===1&&v.h===2&&v.k===-1,why:'Le sommet jaune est en (2 ; −1) et la courbe a la largeur de x² : y = (x − 2)² − 1.'},
  {h:'Dans quel sens&nbsp;?',p:'Par rapport à <i>y = x²</i>, le graphe de <i>y = (x + 3)²</i> est…',opts:['décalé de 3 vers la droite','décalé de 3 vers la gauche','décalé de 3 vers le haut','étiré verticalement'],ans:1,
   why:'Il faut x = −3 pour retrouver 0². Tout arrive 3 unités plus tôt, donc à gauche.'},
  {kind:'Défi',h:'Fonction paire',p:'Quelle fonction a un graphe symétrique par rapport à l’axe vertical&nbsp;?',opts:['x³','x² + 1','x + 1','√x'],ans:1,why:'f(−x) = (−x)² + 1 = x² + 1 = f(x). C’est la définition d’une fonction paire.'},
 ]},

{id:'suites',br:'ana',lv:'gym',h:'Suites',p:'Arithmétiques, géométriques, et la somme de Gauss.',
 lessons:['Suites géométriques','Suites arithmétiques','Sommes de termes','Limite d’une suite'],
 steps:[
  {h:'Multiplier par q à chaque terme',p:'Une suite géométrique part de <i>u₀</i> et multiplie par la raison <i>q</i> à chaque étape : <i>uₙ = u₀·qⁿ</i>.',
   params:[{id:'q',l:'Raison q',min:.5,max:1.5,step:.05,v:.8}],
   draw:v=>{ const P=plane({x:[-0.7,10.7],y:[0,8],h:220,grid:false,lx:2,ly:2});
     for(let n=0;n<=10;n++){ const u=4*Math.pow(v.q,n); P.rect(n-.3,0,.6,Math.min(u,8),{fill:'var(--accent)',fo:.75,c:null}); } return P.svg(); },
   info:v=>v.q<1?`q < 1 : les termes se rapprochent de 0 (u₁₀ ≈ ${fmt(4*v.q**10)})`:v.q>1?`q > 1 : explosion (u₁₀ ≈ ${fmt(4*v.q**10)})`:'q = 1 : suite constante'},
  {h:'Suite arithmétique',p:'On ajoute toujours la même raison. Si <i>u₀ = 5</i> et la raison vaut 3, combien vaut <i>u₁₀</i>&nbsp;?',lab:'u₁₀ =',ans:35,why:'uₙ = u₀ + n·r = 5 + 10·3 = 35.'},
  {h:'L’astuce de Gauss',p:'Le jeune Gauss l’aurait trouvé en quelques secondes : 1 + 2 + 3 + … + 100 = ?',ans:5050,why:'On associe 1 + 100, 2 + 99, 3 + 98… On obtient 50 paires valant 101, soit 5 050.'},
  {kind:'Défi',h:'Limite',p:`Vers quoi tend (${F(1,2)})ⁿ quand n devient très grand&nbsp;?`,opts:['0',F(1,2),'1','+∞'],ans:0,why:'On divise par 2 à chaque fois : ½, ¼, ⅛… Les termes s’approchent de 0 autant qu’on veut.'},
 ]},

{id:'derivees',br:'ana',lv:'gym',h:'Dérivées',p:'La pente en un point, la vitesse instantanée.',
 lessons:['De la sécante à la tangente','Règles de dérivation','Étude de fonction','Optimisation'],
 steps:[
  {h:'Zoomer sur une pente',p:'La pente de la sécante entre <i>x₀</i> et <i>x₀ + h</i> s’approche de la pente de la tangente quand <i>h</i> devient petit. Cette limite, c’est la <b>dérivée</b>.',
   params:[{id:'x',l:'x₀',min:-2,max:2,step:.5,v:1},{id:'h',l:'h',min:.1,max:2,step:.1,v:1.5}],
   draw:v=>{ const f=x=>x*x/2, P=plane({x:[-3,3.5],y:[-1,5.5]}), m=(f(v.x+v.h)-f(v.x))/v.h;
     P.fn(f).fn(x=>f(v.x)+m*(x-v.x),{c:'var(--spark)',w:2.5}).fn(x=>f(v.x)+v.x*(x-v.x),{c:'var(--muted)',w:1.5,dash:true}).dot(v.x,f(v.x),{c:'var(--ink)',r:5}).dot(v.x+v.h,f(v.x+v.h),{r:5}); return P.svg(); },
   info:v=>`f(x) = x²/2 · pente de la sécante = ${fmt(v.x+v.h/2)} → quand h → 0 : f′(x₀) = ${fmt(v.x)}`},
  {h:'Règle de la puissance',p:'Quelle est la dérivée de <i>x³</i>&nbsp;?',opts:['3x²','x²','3x','x⁴/4'],ans:0,why:'(xⁿ)′ = n·xⁿ⁻¹. Pour n = 3 : 3x².'},
  {h:'Trouve la tangente horizontale',p:'Déplace le point sur <i>f(x) = x² − 4x + 1</i> jusqu’à ce que la tangente soit horizontale.',
   params:[{id:'x',l:'x',min:-1,max:5,step:.5,v:0}],
   draw:v=>{ const f=x=>x*x-4*x+1, m=2*v.x-4, P=plane({x:[-1.5,5.5],y:[-4,6],h:300,lab:2}); P.fn(f).fn(x=>f(v.x)+m*(x-v.x),{c:'var(--spark)',w:2.5}).dot(v.x,f(v.x),{c:'var(--ink)',r:5}); return P.svg(); },
   info:v=>`pente de la tangente : f′(${fmt(v.x)}) = ${fmt(2*v.x-4)}`,
   ok:v=>v.x===2,why:'f′(x) = 2x − 4 = 0 pour x = 2. C’est le minimum de la fonction.'},
  {kind:'Défi',h:'Calcule',p:'<i>f(x) = 5x²</i>. Combien vaut <i>f′(3)</i>&nbsp;?',lab:'f′(3) =',ans:30,why:'f′(x) = 10x, donc f′(3) = 30.'},
 ]},

{id:'integrales',br:'ana',lv:'gym',h:'Intégrales',p:'Additionner une infinité de petits rectangles.',
 lessons:['Aire sous la courbe','Primitives','Théorème fondamental','Volumes de révolution'],
 steps:[
  {h:'Des rectangles de plus en plus fins',p:'Pour mesurer l’aire sous <i>y = x²</i> entre 0 et 2, on l’approche par des rectangles. Plus ils sont nombreux, plus l’approximation est bonne.',
   params:[{id:'n',l:'Nombre de rectangles',min:1,max:40,v:4}],
   draw:v=>{ const P=plane({x:[-0.3,2.4],y:[-0.4,4.4],h:300,lx:1,ly:1}), dx=2/v.n;
     for(let i=0;i<v.n;i++){ const x=i*dx; P.rect(x,0,dx,x*x,{fill:'var(--spark)',fo:.5,c:'var(--ink)',w:v.n>20?.5:1}); } P.fn(x=>x*x,{from:0}); return P.svg(); },
   info:v=>{ let s=0; const dx=2/v.n; for(let i=0;i<v.n;i++) s+=(i*dx)**2*dx; return `Somme ≈ ${fmt(s,3)} · aire exacte = 8/3 ≈ 2,667`; }},
  {h:'Une aire connue',p:'Combien vaut <i>∫₀³ 2x dx</i>&nbsp;?',
   fig:(()=>{ const P=plane({x:[-0.5,4],y:[-0.5,7],h:240,lx:1,ly:2}); P.area(x=>2*x,0,3,{fill:'var(--math)'}).fn(x=>2*x); return P.svg(); })(),
   ans:9,why:'C’est l’aire d’un triangle de base 3 et de hauteur 6 : 3 × 6 ÷ 2 = 9.'},
  {h:'Primitive',p:'Une primitive de <i>3x²</i> est…',opts:['6x','x³ + C','3x³','x³/3'],ans:1,why:'On cherche F avec F′ = 3x². (x³)′ = 3x², donc F(x) = x³ + C.'},
  {kind:'Défi',h:'Le calcul exact',p:'Combien vaut <i>∫₀¹ x² dx</i>&nbsp;? (fraction ou décimale)',ans:1/3,tol:.005,why:'Une primitive est x³/3. On calcule 1³/3 − 0 = 1/3 ≈ 0,333.'},
 ]},

{id:'trigo',br:'geo',lv:'gym',h:'Trigonométrie',p:'Le cercle trigonométrique, sinus et cosinus.',
 lessons:['Le cercle trigonométrique','Triangles rectangles','Lois du sinus et du cosinus','Fonctions trigonométriques'],
 steps:[
  {h:'Cosinus et sinus sur le cercle',p:'Sur un cercle de rayon 1, le point d’angle θ a pour coordonnées <b>(cos θ ; sin θ)</b>.',
   params:[{id:'t',l:'Angle θ',min:0,max:360,step:5,v:30,u:'°'}],
   draw:v=>{ const c=Math.cos(rad(v.t)),s=Math.sin(rad(v.t)),P=plane({x:[-1.4,1.4],y:[-1.4,1.4],step:.5,lab:1});
     P.circ(0,0,1,{c:'var(--ink)',w:2}).seg(0,0,c,s,{c:'var(--ink)',w:2.5}).seg(0,0,c,0,{c:'var(--math)',w:5}).seg(c,0,c,s,{c:'var(--spark)',w:5}).dot(c,s,{c:'var(--accent)'}); return P.svg(); },
   info:v=>`<span style="color:var(--math)">cos θ ≈ ${fmt(Math.cos(rad(v.t)),3)}</span> · <span style="color:color-mix(in srgb,var(--spark) 70%,var(--ink))">sin θ ≈ ${fmt(Math.sin(rad(v.t)),3)}</span>`},
  {h:'Une valeur à connaître',p:'Combien vaut <i>sin 30°</i>&nbsp;?',opts:[F(1,2),F('√3',2),F('√2',2),'1'],ans:0,why:'Un triangle équilatéral coupé en deux donne un angle de 30° : le côté opposé vaut la moitié de l’hypoténuse.'},
  {h:'Trouve l’angle',p:`Règle θ entre 0° et 180° pour que <b>cos θ = −${F(1,2)}</b>.`,
   params:[{id:'t',l:'Angle θ',min:0,max:180,step:5,v:60,u:'°'}],
   draw:v=>{ const c=Math.cos(rad(v.t)),s=Math.sin(rad(v.t)),P=plane({x:[-1.4,1.4],y:[-1.4,1.4],step:.5,lab:1});
     P.circ(0,0,1,{c:'var(--ink)',w:2}).seg(-.5,-1.4,-.5,1.4,{c:'var(--bad)',w:1.5,dash:true}).seg(0,0,c,s,{c:'var(--ink)',w:2.5}).seg(0,0,c,0,{c:'var(--math)',w:5}).dot(c,s,{c:'var(--accent)'}); return P.svg(); },
   info:v=>`cos ${v.t}° ≈ ${fmt(Math.cos(rad(v.t)),3)}`,ok:v=>v.t===120,why:'cos 60° = ½, et le symétrique par rapport à l’axe vertical donne cos 120° = −½.'},
  {kind:'Défi',h:'La rampe',p:'Une rampe de 10 m de long monte avec un angle de 30°. De quelle hauteur monte-t-elle&nbsp;?',unit:'m',ans:5,why:'hauteur = 10 × sin 30° = 10 × ½ = 5 m.'},
 ]},

{id:'vecteurs',br:'geo',lv:'gym',h:'Vecteurs du plan',p:'Flèches, sommes et produit scalaire.',
 lessons:['Additionner des vecteurs','Norme d’un vecteur','Produit scalaire','Droites et vecteurs directeurs'],
 steps:[
  {h:'Mettre les flèches bout à bout',p:'Pour additionner <b>u</b> et <b>v</b>, on place <b>v</b> au bout de <b>u</b>. La somme va du départ à l’arrivée.',
   params:[{id:'ux',l:'u, composante x',min:-3,max:3,v:3},{id:'uy',l:'u, composante y',min:-3,max:3,v:1},{id:'vx',l:'v, composante x',min:-3,max:3,v:1},{id:'vy',l:'v, composante y',min:-3,max:3,v:2}],
   draw:v=>{ const P=plane({x:[-6,6],y:[-6,6],lab:2}); P.arrow(0,0,v.ux,v.uy,{c:'var(--math)'}).arrow(v.ux,v.uy,v.ux+v.vx,v.uy+v.vy,{c:'var(--spark)'}).arrow(0,0,v.ux+v.vx,v.uy+v.vy,{c:'var(--accent)',w:4}); return P.svg(); },
   info:v=>`<span style="color:var(--math)">u (${v.ux} ; ${v.uy})</span> + v (${v.vx} ; ${v.vy}) = <b style="color:var(--accent)">(${v.ux+v.vx} ; ${v.uy+v.vy})</b>`},
  {h:'Produit scalaire',p:'Calcule <b>(3 ; 4) · (2 ; −1)</b>.',ans:2,why:'On multiplie composante par composante et on additionne : 3·2 + 4·(−1) = 6 − 4 = 2.'},
  {h:'Que signifie un produit nul&nbsp;?',p:'Si <b>u · v = 0</b> avec deux vecteurs non nuls, alors…',opts:['u et v sont perpendiculaires','u et v sont parallèles','u = v','u + v = 0'],ans:0,why:'u · v = ‖u‖‖v‖ cos θ. Il est nul quand cos θ = 0, donc θ = 90°.'},
  {kind:'Défi',h:'Norme',p:'Quelle est la norme (longueur) du vecteur <b>(5 ; 12)</b>&nbsp;?',ans:13,why:'‖u‖ = √(5² + 12²) = √169 = 13. C’est Pythagore.'},
 ]},

{id:'analytique',br:'geo',lv:'gym',h:'Géométrie analytique',p:'Cercles et droites en équations.',
 lessons:['Équation d’un cercle','Droites et intersections','Distance point-droite','Les coniques'],
 steps:[
  {h:'Le cercle en équation',p:'Le cercle de centre (h ; k) et de rayon r regroupe les points à distance r du centre : <i>(x − h)² + (y − k)² = r²</i>.',
   params:[{id:'h',l:'h',min:-3,max:3,v:1},{id:'k',l:'k',min:-3,max:3,v:-1},{id:'r',l:'r',min:1,max:5,step:.5,v:2}],
   draw:v=>{ const P=plane({x:[-6,6],y:[-6,6],lab:2}); P.circ(v.h,v.k,v.r,{w:3.5}).dot(v.h,v.k,{r:5,c:'var(--ink)'}).seg(v.h,v.k,v.h+v.r,v.k,{c:'var(--spark)',w:2.5,dash:true}); return P.svg(); },
   info:v=>`(x ${v.h<0?'+':'−'} ${Math.abs(v.h)})² + (y ${v.k<0?'+':'−'} ${Math.abs(v.k)})² = ${fmt(v.r*v.r)}`},
  {h:'Passer par l’origine',p:'Le cercle a pour centre (3 ; 4). Règle son rayon pour qu’il passe par l’origine.',
   params:[{id:'r',l:'Rayon r',min:1,max:8,step:.5,v:2}],
   draw:v=>{ const P=plane({x:[-5,10],y:[-4,11],w:300,lab:2}); P.circ(3,4,v.r,{w:3.5}).dot(3,4,{r:5,c:'var(--ink)'}).dot(0,0,{l:'O'}); return P.svg(); },
   ok:v=>v.r===5,why:'Le rayon est la distance du centre à l’origine : √(3² + 4²) = 5.'},
  {h:'Retrouver le centre',p:'Quel est le centre du cercle <i>x² + y² − 6x + 2y = 0</i>&nbsp;?',opts:['(3 ; −1)','(−3 ; 1)','(6 ; −2)','(−6 ; 2)'],ans:0,why:'On complète les carrés : (x − 3)² + (y + 1)² = 10. Centre (3 ; −1), rayon √10.'},
  {kind:'Défi',h:'Distance',p:'Quelle est la distance entre les points (1 ; 2) et (4 ; 6)&nbsp;?',ans:5,why:'√((4 − 1)² + (6 − 2)²) = √(9 + 16) = 5.'},
 ]},

/* ================= UNIVERSITÉ ================= */
{id:'complexes',br:'alg',lv:'uni',h:'Nombres complexes',p:'Le plan complexe, rotations et racines de l’unité.',
 lessons:['Le plan complexe','Forme exponentielle','Racines de l’unité','Polynômes et théorème fondamental'],
 steps:[
  {h:'Un nombre, un point',p:'Le nombre <i>z = a + bi</i> est le point (a ; b). Sa distance à 0 est le <b>module</b> |z|, son angle est l’<b>argument</b>.',
   params:[{id:'a',l:'Partie réelle a',min:-4,max:4,step:.5,v:3},{id:'b',l:'Partie imaginaire b',min:-4,max:4,step:.5,v:2}],
   draw:v=>{ const P=plane({x:[-5,5],y:[-5,5],lab:2}); P.arrow(0,0,v.a,v.b).seg(v.a,0,v.a,v.b,{c:'var(--muted)',w:1.5,dash:true}).dot(v.a,v.b,{l:'z'}).text(4.9,0,'Re',{a:'end',dy:-6,c:'var(--muted)'}).text(0,4.8,'Im',{dx:6,dy:8,c:'var(--muted)'}); return P.svg(); },
   info:v=>`|z| = ${fmt(Math.hypot(v.a,v.b))} · arg z ≈ ${fmt(Math.atan2(v.b,v.a)*180/Math.PI,1)}°`},
  {h:'Multiplier par i, c’est tourner',p:'Multiplier par <i>i</i> fait tourner le point de 90° autour de 0. Deux fois de suite : 180°, d’où <i>i² = −1</i>.',
   params:[{id:'a',l:'a',min:-4,max:4,step:.5,v:3},{id:'b',l:'b',min:-4,max:4,step:.5,v:1}],
   draw:v=>{ const P=plane({x:[-5,5],y:[-5,5],lab:2}); P.arrow(0,0,v.a,v.b).arrow(0,0,-v.b,v.a,{c:'var(--spark)'}).arrow(0,0,-v.a,-v.b,{c:'var(--math)',dash:true,w:2}).dot(v.a,v.b,{l:'z',r:4}).dot(-v.b,v.a,{l:'iz',r:4}).dot(-v.a,-v.b,{l:'i²z = −z',r:4,c:'var(--math)'}); return P.svg(); }},
  {h:'Calcule',p:'<i>(1 + i)² = ?</i>',opts:['2i','2','0','1 + 2i'],ans:0,why:'(1 + i)² = 1 + 2i + i² = 1 + 2i − 1 = 2i.'},
  {kind:'Défi',h:'Racine cubique de l’unité',p:'Place le point <i>e^{iθ}</i> sur le cercle pour que <i>z³ = 1</i>, avec <i>z ≠ 1</i>.',
   params:[{id:'t',l:'θ',min:0,max:345,step:15,v:30,u:'°'}],
   draw:v=>{ const P=plane({x:[-1.5,1.5],y:[-1.5,1.5],step:.5,lab:1}); P.circ(0,0,1,{c:'var(--ink)',w:2});
     [1,2,3].forEach(k=>{ const a=rad(v.t*k); P.dot(Math.cos(a),Math.sin(a),{r:k===1?7:5,c:k===1?'var(--accent)':'var(--spark)',l:k===1?'z':k===2?'z²':'z³'}); }); P.dot(1,0,{r:4,c:'var(--ink)'}); return P.svg(); },
   ok:v=>v.t===120||v.t===240,why:'z³ = e^{3iθ} vaut 1 quand 3θ est un multiple de 360° : θ = 120° ou 240°. Avec 1, ces trois racines forment un triangle équilatéral.'},
 ]},

{id:'alglin',br:'alg',lv:'uni',h:'Algèbre linéaire',p:'Vecteurs, combinaisons, matrices et déterminants.',
 lessons:['Combinaisons linéaires','Indépendance et bases','Matrices et systèmes','Le déterminant'],
 steps:[
  {h:'Combiner deux vecteurs',p:'Avec <b>u = (2 ; 1)</b> et <b>v = (−1 ; 2)</b>, la combinaison <i>αu + βv</i> peut atteindre n’importe quel point du plan.',
   params:[{id:'a',l:'α',min:-2,max:3,step:.5,v:1},{id:'b',l:'β',min:-2,max:3,step:.5,v:1}],
   draw:v=>{ const P=plane({x:[-5,6],y:[-4,7],lab:2}), ax=2*v.a, ay=v.a; P.arrow(0,0,ax,ay,{c:'var(--math)'}).arrow(ax,ay,ax-v.b,ay+2*v.b,{c:'var(--spark)'}).arrow(0,0,ax-v.b,ay+2*v.b,{w:4}); return P.svg(); },
   info:v=>`${fmt(v.a)}·u + ${fmt(v.b)}·v = (${fmt(2*v.a-v.b)} ; ${fmt(v.a+2*v.b)})`},
  {h:'Atteins la cible',p:'Trouve α et β pour que <i>αu + βv</i> arrive sur le point (3 ; 4).',
   params:[{id:'a',l:'α',min:-2,max:3,step:.5,v:0},{id:'b',l:'β',min:-2,max:3,step:.5,v:0}],
   draw:v=>{ const P=plane({x:[-5,6],y:[-4,7],lab:2}), ax=2*v.a, ay=v.a; P.dot(3,4,{c:'var(--bad)',l:'(3 ; 4)'}).arrow(0,0,ax,ay,{c:'var(--math)'}).arrow(ax,ay,ax-v.b,ay+2*v.b,{c:'var(--spark)'}); return P.svg(); },
   ok:v=>v.a===2&&v.b===1,why:'On résout 2α − β = 3 et α + 2β = 4 : α = 2, β = 1.'},
  {h:'Indépendance',p:'Les vecteurs (1 ; 2) et (2 ; 4) forment-ils une base du plan&nbsp;?',opts:['Oui','Non, ils sont colinéaires'],ans:1,why:'(2 ; 4) = 2·(1 ; 2). Leurs combinaisons restent sur une seule droite.'},
  {kind:'Défi',h:'Déterminant',p:`Calcule le déterminant de ${mat([[3,1],[2,4]])}.`,lab:'det =',ans:10,why:'det = ad − bc = 3·4 − 1·2 = 10.'},
 ]},

{id:'propres',br:'alg',lv:'uni',h:'Valeurs propres',p:'Les directions qu’une matrice ne fait pas tourner.',
 lessons:['Vecteurs propres','Polynôme caractéristique','Diagonalisation','Matrices symétriques'],
 steps:[
  {h:'Une direction qui résiste',p:`La matrice A = ${mat([[2,1],[1,2]])} transforme le vecteur bleu <b>v</b> en <b>Av</b> (jaune). En général, Av pointe ailleurs. Un <b>vecteur propre</b> garde sa direction : <i>Av = λv</i>.`,
   params:[{id:'t',l:'Direction de v',min:0,max:345,step:15,v:0,u:'°'}],
   draw:v=>{ const x=Math.cos(rad(v.t))*1.4,y=Math.sin(rad(v.t))*1.4,P=plane({x:[-5,5],y:[-5,5],lab:2}); P.arrow(0,0,2*x+y,x+2*y,{c:'var(--spark)',w:4}).arrow(0,0,x,y,{c:'var(--math)'}); return P.svg(); },
   info:v=>{ const t=rad(v.t),x=Math.cos(t),y=Math.sin(t),ax=2*x+y,ay=x+2*y,cr=Math.abs(x*ay-y*ax)<1e-9; return cr?`<b>Direction propre !</b> λ = ${fmt((ax*x+ay*y))}`:'Av n’est pas aligné avec v'; }},
  {h:'Trouve une direction propre',p:'Tourne <b>v</b> jusqu’à ce que <b>Av</b> soit sur la même droite.',
   params:[{id:'t',l:'Direction de v',min:0,max:345,step:15,v:15,u:'°'}],
   draw:v=>{ const x=Math.cos(rad(v.t))*1.4,y=Math.sin(rad(v.t))*1.4,P=plane({x:[-5,5],y:[-5,5],lab:2}); P.arrow(0,0,2*x+y,x+2*y,{c:'var(--spark)',w:4}).arrow(0,0,x,y,{c:'var(--math)'}); return P.svg(); },
   ok:v=>v.t%90===45,why:'Les directions propres sont 45° (λ = 3) et 135° (λ = 1), et leurs opposées.'},
  {h:'Lis la valeur propre',p:'Pour v = (1 ; 1), on trouve Av = (3 ; 3). Quelle est la valeur propre associée&nbsp;?',opts:['1','2','3','6'],ans:2,why:'Av = 3·v, donc λ = 3.'},
  {kind:'Défi',h:'Trace',p:`La somme des valeurs propres d’une matrice égale sa trace (somme de la diagonale). Pour ${mat([[4,1],[2,3]])}, combien vaut cette somme&nbsp;?`,ans:7,why:'Trace = 4 + 3 = 7. (Les valeurs propres sont 5 et 2.)'},
 ]},

{id:'limites',br:'ana',lv:'uni',h:'Limites et continuité',p:'La définition ε–δ, enfin rendue visible.',
 lessons:['Le jeu ε–δ','Limites remarquables','Continuité','Valeurs intermédiaires'],
 steps:[
  {h:'Le jeu ε–δ',p:'« lim f(x) = L quand x → a » veut dire : pour toute tolérance ε autour de L, on trouve une marge δ autour de a telle que f(x) reste dans la bande. Ici f(x) = 2x + 1, a = 1, L = 3.',
   params:[{id:'e',l:'ε',min:.1,max:1,step:.1,v:.6},{id:'d',l:'δ',min:.05,max:1,step:.05,v:.5}],
   draw:v=>{ const f=x=>2*x+1,P=plane({x:[-1,3],y:[0,6],h:300,lab:1}), ok=2*v.d<=v.e+1e-9;
     P.rect(-1,3-v.e,4,2*v.e,{fill:'var(--spark)',fo:.25,c:null}).rect(1-v.d,0,2*v.d,6,{fill:'var(--math)',fo:.15,c:null});
     P.fn(f,{c:'var(--muted)',w:2}).fn(f,{from:1-v.d,to:1+v.d,c:ok?'var(--ok)':'var(--bad)',w:5}).dot(1,3,{c:'var(--ink)',r:4}); return P.svg(); },
   info:v=>2*v.d<=v.e+1e-9?'Gagné : sur toute la marge δ, f(x) reste dans la bande ε.':'Perdu : le morceau rouge sort de la bande. Réduis δ.'},
  {h:'Trouve un δ',p:'Avec ε = 0,5, règle δ pour que la courbe reste dans la bande.',
   params:[{id:'d',l:'δ',min:.05,max:1,step:.05,v:.6}],
   draw:v=>{ const f=x=>2*x+1,e=.5,P=plane({x:[-1,3],y:[0,6],h:300,lab:1}), ok=2*v.d<=e+1e-9;
     P.rect(-1,3-e,4,2*e,{fill:'var(--spark)',fo:.25,c:null}).rect(1-v.d,0,2*v.d,6,{fill:'var(--math)',fo:.15,c:null}).fn(f,{c:'var(--muted)',w:2}).fn(f,{from:1-v.d,to:1+v.d,c:'var(--accent)',w:5}); return P.svg(); },
   ok:v=>v.d<=.25+1e-9,why:'|f(x) − 3| = 2|x − 1|. Il faut 2δ ≤ ε, donc δ ≤ ε/2 = 0,25. Ce raisonnement marche pour tout ε : la limite est prouvée.'},
  {h:'Une limite célèbre',p:'Combien vaut la limite de <i>sin(x)/x</i> quand x → 0&nbsp;?',
   fig:(()=>{ const P=plane({x:[-10,10],y:[-0.5,1.3],h:160,grid:false,lx:5,ly:1}); P.fn(x=>Math.abs(x)<1e-6?1:Math.sin(x)/x,{n:400}); return P.svg(); })(),
   opts:['0','1','+∞','Elle n’existe pas'],ans:1,why:'Près de 0, sin x ≈ x. Le quotient tend vers 1, même si la fonction n’est pas définie en 0.'},
  {kind:'Défi',h:'Valeurs intermédiaires',p:'f est continue sur [0 ; 2], f(0) = −1 et f(2) = 3. Que peut-on affirmer à coup sûr&nbsp;?',
   opts:['f s’annule au moins une fois entre 0 et 2','f est croissante','f(1) = 1','f s’annule exactement une fois'],ans:0,
   why:'Une fonction continue ne saute pas de valeurs : pour passer de −1 à 3, elle prend la valeur 0 au moins une fois. Rien n’empêche qu’elle le fasse plusieurs fois.'},
 ]},

{id:'series',br:'ana',lv:'uni',h:'Séries et Taylor',p:'Approcher les fonctions par des polynômes.',
 lessons:['Polynômes de Taylor','Séries géométriques','Critères de convergence','Rayon de convergence'],
 steps:[
  {h:'Imiter sin x avec un polynôme',p:'Le polynôme de Taylor reproduit la fonction près de 0. Plus son degré est élevé, plus il colle longtemps à la courbe.',
   params:[{id:'n',l:'Degré',min:1,max:13,step:2,v:1}],
   draw:v=>{ const T=x=>{ let s=0,t=x; for(let k=1;k<=v.n;k+=2){ s+=t; t*=-x*x/((k+1)*(k+2)); } return s; };
     const P=plane({x:[-7,7],y:[-3,3],h:200,grid:false,lx:2,ly:1}); P.fn(Math.sin,{c:'var(--muted)',w:5,op:.6}).fn(T,{n:400}); return P.svg(); },
   info:v=>{ const t=['x']; for(let k=3;k<=v.n;k+=2) t.push(`${k%4===3?'−':'+'} x${['','','','³','','⁵','','⁷','','⁹','','¹¹','','¹³'][k]}/${k}!`); return t.join(' '); }},
  {h:'Série géométrique',p:'Combien vaut 1 + ½ + ¼ + ⅛ + …&nbsp;?',ans:2,why:'Σ qⁿ = 1/(1 − q) pour |q| < 1. Avec q = ½ : 1/(1 − ½) = 2.'},
  {h:'Taylor de eˣ',p:'Le développement de <i>eˣ</i> en 0 à l’ordre 2 est…',opts:['1 + x + x²','1 + x + x²/2','x + x²/2','1 + 2x'],ans:1,why:'Toutes les dérivées de eˣ valent 1 en 0, donc eˣ ≈ 1 + x + x²/2! .'},
  {kind:'Défi',h:'La série harmonique',p:'1 + ½ + ⅓ + ¼ + …',opts:['converge vers 2','converge vers ln 2','diverge','converge vers π²/6'],ans:2,why:'Elle grandit sans limite, très lentement (comme ln n). C’est Σ 1/n² qui vaut π²/6.'},
 ]},

{id:'edo',br:'ana',lv:'uni',h:'Équations différentielles',p:'Quand le taux de variation dépend de l’état.',
 lessons:['Croissance et décroissance','Équations linéaires d’ordre 1','L’oscillateur harmonique','Champs de directions'],
 steps:[
  {h:'Suivre les petites flèches',p:'L’équation <i>y′ = k·y</i> dit en chaque point dans quelle direction partir. La solution qui passe par y(0) = y₀ est <i>y₀·e^{kx}</i>.',
   params:[{id:'k',l:'k',min:-1,max:1,step:.1,v:.5},{id:'y',l:'y₀',min:-2,max:2,step:.5,v:1}],
   draw:v=>{ const P=plane({x:[-3,3],y:[-3,3],lab:1});
     for(let x=-2.5;x<=2.5;x+=.5) for(let y=-2.5;y<=2.5;y+=.5){ const m=v.k*y,L=.18/Math.hypot(1,m); P.seg(x-L,y-L*m,x+L,y+L*m,{c:'var(--muted)',w:1.5}); }
     P.fn(x=>v.y*Math.exp(v.k*x),{c:'var(--accent)',w:3.5}).dot(0,v.y,{r:5}); return P.svg(); },
   info:v=>`y = ${fmt(v.y)}·e^(${fmt(v.k)}x)`},
  {h:'Reconnaître la solution',p:'Les solutions de <i>y′ = 3y</i> sont…',opts:['y = 3x + C','y = C·e^{3x}','y = e^{x/3}','y = C·x³'],ans:1,why:'(C·e^{3x})′ = 3·C·e^{3x} = 3y.'},
  {h:'Demi-vie',p:'Un échantillon radioactif de 80 g a une demi-vie de 5 ans. Combien en reste-t-il après 15 ans&nbsp;?',unit:'g',ans:10,why:'15 ans font 3 demi-vies : 80 → 40 → 20 → 10 g.'},
  {kind:'Défi',h:'Le ressort',p:'Quelles fonctions vérifient <i>y″ = −y</i>&nbsp;?',opts:['eˣ et e⁻ˣ','sin x et cos x','x² et x','ln x'],ans:1,why:'(sin x)″ = −sin x et (cos x)″ = −cos x. C’est l’équation d’un ressort sans frottement.'},
 ]},

{id:'transfo',br:'geo',lv:'uni',h:'Transformations linéaires',p:'Les matrices comme déformations du plan.',
 lessons:['Matrices qui déforment le plan','Rotations et symétries','Déterminant et aire','Composer des transformations'],
 steps:[
  {h:'Une matrice déforme la grille',p:'Les colonnes de la matrice sont les images de <b>e₁</b> (bleu) et <b>e₂</b> (jaune). Toute la grille suit. Le carré unité devient un parallélogramme.',
   params:[{id:'a',l:'a',min:-2,max:2,step:.5,v:1},{id:'b',l:'b',min:-2,max:2,step:.5,v:.5},{id:'c',l:'c',min:-2,max:2,step:.5,v:0},{id:'d',l:'d',min:-2,max:2,step:.5,v:1}],
   draw:v=>{ const P=plane({x:[-4,4],y:[-4,4],grid:false}), T=(x,y)=>[v.a*x+v.b*y,v.c*x+v.d*y];
     for(let i=-3;i<=3;i++){ const p=T(i,-3),q=T(i,3),r=T(-3,i),s=T(3,i); P.seg(p[0],p[1],q[0],q[1],{c:'var(--line)',w:1.2}).seg(r[0],r[1],s[0],s[1],{c:'var(--line)',w:1.2}); }
     P.poly([[0,0],T(1,0),T(1,1),T(0,1)],{fill:'var(--accent)',fo:.3,c:'var(--accent)',w:2}).arrow(0,0,v.a,v.c,{c:'var(--math)'}).arrow(0,0,v.b,v.d,{c:'var(--spark)'}); return P.svg(); },
   info:v=>`${mat([[fmt(v.a),fmt(v.b)],[fmt(v.c),fmt(v.d)]])} &nbsp; det = ad − bc = ${fmt(v.a*v.d-v.b*v.c)}`},
  {h:'Fabrique une rotation',p:'Règle la matrice pour qu’elle fasse tourner le plan de 90° dans le sens inverse des aiguilles d’une montre.',
   params:[{id:'a',l:'a',min:-1,max:1,v:1},{id:'b',l:'b',min:-1,max:1,v:0},{id:'c',l:'c',min:-1,max:1,v:0},{id:'d',l:'d',min:-1,max:1,v:1}],
   draw:v=>{ const P=plane({x:[-2.5,2.5],y:[-2.5,2.5],step:.5,lab:1}); P.poly([[0,0],[v.a,v.c],[v.a+v.b,v.c+v.d],[v.b,v.d]],{fill:'var(--accent)',fo:.3,c:'var(--accent)',w:2}).arrow(0,0,v.a,v.c,{c:'var(--math)'}).arrow(0,0,v.b,v.d,{c:'var(--spark)'}).dot(0,1,{r:4,c:'var(--muted)'}).dot(-1,0,{r:4,c:'var(--muted)'}); return P.svg(); },
   info:v=>mat([[v.a,v.b],[v.c,v.d]]),ok:v=>v.a===0&&v.b===-1&&v.c===1&&v.d===0,why:'e₁ = (1 ; 0) doit aller sur (0 ; 1), et e₂ = (0 ; 1) sur (−1 ; 0). Ce sont les deux colonnes.'},
  {h:'Symétrie',p:'Le déterminant d’une symétrie axiale vaut…',opts:['1','−1','0','2'],ans:1,why:'Elle conserve les aires (|det| = 1) mais inverse l’orientation (signe −).'},
  {kind:'Défi',h:'Aire de l’image',p:`Quelle est l’aire de l’image du carré unité par ${mat([[2,1],[0,3]])}&nbsp;?`,ans:6,why:'L’aire est multipliée par |det| = |2·3 − 1·0| = 6.'},
 ]},

{id:'parametrees',br:'geo',lv:'uni',h:'Courbes paramétrées',p:'Dessiner en fonction du temps, des Lissajous aux spirales.',
 lessons:['Tracer en fonction du temps','Vitesse et tangente','Coordonnées polaires','Longueur d’arc'],
 steps:[
  {h:'Les figures de Lissajous',p:'Un point se déplace avec <i>x(t) = sin(a·t + π/2)</i> et <i>y(t) = sin(b·t)</i>. Le rapport a/b décide de la forme.',
   params:[{id:'a',l:'a',min:1,max:5,v:3},{id:'b',l:'b',min:1,max:5,v:2}],
   draw:v=>{ const P=plane({x:[-1.3,1.3],y:[-1.3,1.3],step:.5,lab:1}); P.curve(t=>Math.sin(v.a*t+Math.PI/2),t=>Math.sin(v.b*t),0,2*Math.PI,{n:600}); return P.svg(); },
   info:v=>`a/b = ${v.a}/${v.b}`},
  {h:'Reconnais la courbe',p:'<i>x = cos t</i>, <i>y = sin t</i> pour t de 0 à 2π décrit…',opts:['une droite','le cercle unité','une parabole','une spirale'],ans:1,why:'cos² t + sin² t = 1 : chaque point est à distance 1 de l’origine.'},
  {h:'En polaires',p:'En coordonnées polaires, la courbe <i>r = θ</i> (le rayon grandit avec l’angle) est…',opts:['un cercle','une droite','une spirale','une rose à 4 pétales'],ans:2,why:'À chaque tour, la distance au centre augmente de 2π : c’est la spirale d’Archimède.'},
  {kind:'Défi',h:'Longueur d’arc',p:'Quelle est la longueur de la courbe <i>x = 2 cos t</i>, <i>y = 2 sin t</i> pour t ∈ [0 ; 2π]&nbsp;? (arrondie au centième)',ans:12.57,tol:.011,why:'L = ∫ √(x′² + y′²) dt = ∫₀^{2π} 2 dt = 4π ≈ 12,57.'},
 ]},
];
