/* Déclic — examen de compétence : Nombres relatifs */
(()=>{
// repère avec un point M
const pt=(x,y)=>{ const P=plane({x:[-5.5,5.5],y:[-5.5,5.5],lab:1}); P.seg(x,y,x,0,{c:'var(--spark)',w:1.5,dash:true}).seg(x,y,0,y,{c:'var(--spark)',w:1.5,dash:true}).dot(x,y,{c:'var(--spark)',l:'M'}); return P.svg(); };
EXAMS['sec9-relatifs']=[
 {n:'Opposés et droite graduée', r:'La droite graduée et l’opposé', qs:[
   {q:'Quel est l’opposé de −14 ?', ans:14, why:'L’opposé est à la même distance de 0, de l’autre côté : l’opposé de −14 est 14. Leur somme vaut 0.'},
   {q:'Un plongeur est à 12 m sous la surface de l’eau. Quel nombre relatif donne sa position, si la surface vaut 0 ?', opts:['+12','12 − 0','−12','0,12'], ans:2, why:'Sous le repère 0, on compte en négatif : −12 m.'},
   {q:'Sur une droite graduée, A a pour abscisse −3 et B a pour abscisse 5. Combien d’unités séparent A et B ?', ans:8, why:'De −3 à 0, il y a 3 unités, et de 0 à 5, il y en a 5. En tout 3 + 5 = 8. On peut aussi calculer 5 − (−3) = 8.'},
   {q:'Laquelle de ces affirmations est vraie ?', opts:['L’opposé d’un nombre négatif est positif','L’opposé de 5 est 0,5','−(−3) = −3','0 n’a pas d’opposé'], ans:0, why:'Un négatif est à gauche de 0 : son opposé est à droite, donc positif. −(−3) = 3, l’opposé de 5 est −5 et l’opposé de 0 est 0.'},
   {q:'Que vaut −(−(−8)) ?', ans:-8, why:'−(−8) = 8, puis l’opposé de 8 est −8.'},
 ]},
 {n:'Ranger, encadrer, arrondir', r:'Ranger, encadrer et arrondir', qs:[
   {q:'Lequel de ces nombres est le plus petit ?', opts:['−3','0','−12','−7,5'], ans:2, why:'Le plus petit est le plus à gauche sur la droite graduée, donc le négatif le plus loin de 0 : −12.'},
   {q:'Laquelle de ces inégalités est vraie ?', opts:['−5 &gt; −2','−0,5 &lt; −1','−4 &lt; −3,9','3 &lt; −8'], ans:2, why:'−4 est plus à gauche que −3,9 (plus loin de 0) : −4 &lt; −3,9. Les autres sont fausses : −5 &lt; −2, −0,5 &gt; −1 et 3 &gt; −8.'},
   {q:'Quel est l’arrondi à l’unité de −6,7 ?', ans:-7, why:'−6,7 est entre −7 et −6. Il est à 0,3 de −7 et à 0,7 de −6 : l’arrondi est −7.'},
   {q:'On encadre −2,3 entre deux entiers qui se suivent : <i>a</i> &lt; −2,3 &lt; <i>b</i>. Que vaut <i>a</i> ?', lab:'a =', ans:-3, why:'L’entier juste à gauche de −2,3 est −3, celui juste à droite est −2 : −3 &lt; −2,3 &lt; −2.'},
   {q:'Quel est l’arrondi au dixième de −0,46 ?', ans:-0.5, tol:.001, show:'−0,5', why:'−0,46 est entre −0,5 et −0,4. Il est à 0,04 de −0,5 et à 0,06 de −0,4 : l’arrondi au dixième est −0,5.'},
   {q:'Combien de nombres entiers sont strictement compris entre −4 et 3 ?', ans:6, why:'Ce sont −3, −2, −1, 0, 1 et 2 : il y en a 6 (−4 et 3 ne comptent pas).'},
 ]},
 {n:'Additionner et soustraire', r:'Calculer de tête une somme de relatifs', qs:[
   {q:'Calcule −9 + 15.', ans:6, why:'Signes contraires : 15 − 9 = 6, et 15 est le plus loin de 0, donc le résultat est positif.'},
   {q:'Calcule −13 + (−27).', ans:-40, why:'Même signe : 13 + 27 = 40, on garde le signe − : −40.'},
   {q:'Calcule 8 − 20.', ans:-12, why:'8 − 20 = 8 + (−20). Signes contraires : 20 − 8 = 12, le négatif l’emporte : −12.'},
   {q:'Calcule −6 − (−14).', ans:8, why:'Soustraire −14, c’est ajouter 14 : −6 + 14 = 8.'},
   {q:'Calcule −35 + 18 − 12 + 35 − 6.', ans:0, why:'−35 et 35 sont opposés : ils s’annulent. Il reste 18 − 12 − 6 = 0.'},
   {q:'Il fait −4 °C, puis la température baisse de 9 degrés. Quelle température fait-il ?', unit:'°C', ans:-13, why:'−4 + (−9) = −13 °C : même signe, on ajoute les distances.'},
   {q:'Un ascenseur part du 3e étage (+3) et descend au 2e sous-sol (−2). De combien d’étages descend-il ?', lab:'étages :', ans:5, why:'L’écart vaut 3 − (−2) = 3 + 2 = 5 étages : 3 jusqu’au rez, puis 2 de plus.'},
 ]},
 {n:'Multiplier et diviser', r:'Calculer un produit ou un quotient de relatifs', qs:[
   {q:'Calcule (−8) × 7.', ans:-56, why:'Signes contraires : produit négatif. 8 × 7 = 56, donc −56.'},
   {q:'Calcule (−9) × (−6).', ans:54, why:'Même signe : produit positif. 9 × 6 = 54.'},
   {q:'Calcule (−63) : (−7).', ans:9, why:'Même signe : quotient positif. 63 : 7 = 9.'},
   {q:'Calcule 45 : (−5).', ans:-9, why:'Signes contraires : quotient négatif. 45 : 5 = 9, donc −9.'},
   {q:'Calcule (−1) × 2 × (−3) × (−4) × (−5).', ans:120, why:'Quatre facteurs négatifs, un nombre pair : le résultat est positif. 1 × 2 × 3 × 4 × 5 = 120.'},
   {q:'Calcule −4 + 6 × (−3).', ans:-22, why:'La multiplication d’abord : 6 × (−3) = −18. Puis −4 + (−18) = −22.'},
   {q:'Calcule (−24) : (−4 − 2).', ans:4, why:'La parenthèse d’abord : −4 − 2 = −6. Puis (−24) : (−6) = 4, même signe.'},
 ]},
 {n:'Le repère du plan', r:'Placer et lire un point', qs:[
   {q:'Dans quel quadrant se trouve le point (−3 ; 5) ?', opts:['1er','2e','3e','4e'], ans:1, why:'Abscisse négative (à gauche), ordonnée positive (en haut) : signes (− ; +), c’est le 2e quadrant.'},
   {q:'Quelles sont les coordonnées du point M ?', fig:pt(-4,-1), opts:['(−1 ; −4)','(4 ; 1)','(−4 ; 1)','(−4 ; −1)'], ans:3, why:'M est 4 carreaux à gauche de O (abscisse −4) et 1 carreau plus bas (ordonnée −1). On écrit d’abord l’abscisse : M(−4 ; −1).'},
   {q:'Lequel de ces points est sur l’axe des ordonnées ?', opts:['(3 ; 0)','(−2 ; −2)','(0 ; −4)','(1 ; 1)'], ans:2, why:'Sur l’axe vertical, on ne s’est pas déplacé horizontalement : l’abscisse vaut 0. C’est (0 ; −4).'},
   {q:'Le point P(4 ; −2) est déplacé de 6 carreaux vers la gauche. Quelle est sa nouvelle abscisse ?', lab:'x =', ans:-2, why:'Vers la gauche, on ajoute un nombre négatif : 4 + (−6) = −2. L’ordonnée ne change pas.'},
   {q:'Quelle est l’ordonnée du symétrique du point (2 ; −7) par rapport à l’origine O ?', lab:'y =', ans:7, why:'Le symétrique par rapport à O a les coordonnées opposées : (−2 ; 7). Son ordonnée est 7.'},
 ]},
];
})();
