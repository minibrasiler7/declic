/* Déclic — examen de compétence : Trigonométrie */
(()=>{
EXAMS['trigo']=[
 {n:'Lire le cercle trigonométrique', r:'Cosinus et sinus sur le cercle', qs:[
   {q:'Quel point du cercle trigonométrique correspond à l’angle 180° ?', opts:['(1 ; 0)','(0 ; 1)','(−1 ; 0)','(0 ; −1)'], ans:2, why:'Un demi-tour depuis (1 ; 0) mène au point (−1 ; 0) : cos 180° = −1 et sin 180° = 0.'},
   {q:'Combien vaut sin 270° ?', ans:-1, why:'L’angle 270° correspond au point le plus bas du cercle, (0 ; −1). Le sinus est son ordonnée : −1.'},
   {q:'Un angle aigu θ vérifie cos θ = 0,6. Combien vaut sin θ ?', ans:0.8, tol:.001, why:'Le point (cos θ ; sin θ) est sur le cercle de rayon 1 : par Pythagore, sin²θ = 1 − 0,36 = 0,64. θ est aigu, donc sin θ = 0,8.'},
 ]},
 {n:'Valeurs remarquables et symétries', r:'Utiliser le cercle trigonométrique', qs:[
   {q:'Combien vaut cos 120° ?', ans:-0.5, tol:.001, why:'120° = 180° − 60°, donc cos 120° = −cos 60° = −½.'},
   {q:'Combien vaut sin 330° ?', ans:-0.5, tol:.001, why:'330° = 360° − 30°, donc sin 330° = −sin 30° = −½. Le point est en bas à droite.'},
   {q:'Combien vaut sin 135° ?', opts:['−√2/2','√2/2','½','√3/2'], ans:1, why:'135° = 180° − 45°, donc sin 135° = sin 45° = √2/2. Le point est en haut, son ordonnée est positive.'},
   {q:'Combien vaut cos 315° ?', opts:['√2/2','−√2/2','−½','√3/2'], ans:0, why:'315° = 360° − 45°, donc cos 315° = cos 45° = √2/2. Le point est à droite, son abscisse est positive.'},
   {q:'Combien vaut cos 240° ?', ans:-0.5, tol:.001, why:'240° = 360° − 120°, donc cos 240° = cos 120° = −cos 60° = −½.'},
   {q:'Quels angles θ de [0° ; 360°[ vérifient sin θ = √3/2 ?', opts:['60° et 300°','30° et 150°','60° et 120°','60° seulement'], ans:2, why:'sin 60° = √3/2, et le symétrique par rapport à l’axe vertical a la même ordonnée : 180° − 60° = 120°.'},
   {q:'Quel angle θ entre 0° et 180° vérifie cos θ = −√2/2 ?', unit:'°', ans:135, why:'cos 45° = √2/2, et cos(180° − 45°) = −cos 45°. Donc θ = 135°.'},
   {q:'Pour θ = 250°, quels sont les signes de cos θ et sin θ ?', opts:['cos θ > 0 et sin θ < 0','cos θ < 0 et sin θ > 0','cos θ > 0 et sin θ > 0','cos θ < 0 et sin θ < 0'], ans:3, why:'250° est entre 180° et 270° : le point est en bas à gauche du cercle. Abscisse et ordonnée sont négatives.'},
 ]},
 {n:'Résoudre un triangle rectangle', r:'Résoudre un triangle rectangle', qs:[
   {q:'Dans un triangle rectangle, l’hypoténuse mesure 12 cm et un angle aigu vaut 35°. Combien mesure le côté opposé à cet angle ? (au centième)', unit:'cm', ans:6.88, tol:.011, why:'Opposé = hypoténuse × sin 35° = 12 × 0,5736 ≈ 6,88 cm.'},
   {q:'Dans un triangle rectangle, le côté adjacent à un angle de 50° mesure 9 m. Combien mesure le côté opposé ? (au centième)', unit:'m', ans:10.73, tol:.011, why:'tan 50° = opposé / adjacent, donc opposé = 9 × tan 50° ≈ 9 × 1,1918 ≈ 10,73 m.'},
   {q:'Dans un triangle rectangle, le côté opposé à un angle de 25° mesure 7 cm. Combien mesure l’hypoténuse ? (au centième)', unit:'cm', ans:16.56, tol:.011, why:'sin 25° = 7 / hyp, donc hyp = 7 / sin 25° ≈ 7 / 0,4226 ≈ 16,56 cm.'},
   {q:'Les côtés de l’angle droit mesurent 5 et 12. Quel angle est opposé au côté 5 ? (au centième de degré)', unit:'°', ans:22.62, tol:.011, why:'tan α = 5/12, donc α = arctan(5/12) ≈ 22,62°.'},
   {q:'Dans un triangle rectangle, l’hypoténuse mesure 10 et le côté adjacent à l’angle α mesure 6. Combien vaut α ? (au centième de degré)', unit:'°', ans:53.13, tol:.011, why:'cos α = 6/10 = 0,6, donc α = arccos 0,6 ≈ 53,13°.'},
   {q:'Tu connais l’hypoténuse et tu cherches le côté adjacent à un angle connu. Quel rapport utilises-tu ?', opts:['Le sinus','La tangente','Le cosinus','L’arctangente'], ans:2, why:'cos α = adjacent / hypoténuse relie exactement ce que tu connais et ce que tu cherches : adjacent = hyp × cos α.'},
   {q:'Un arbre projette une ombre de 15 m quand le soleil est à 40° au-dessus de l’horizon. Quelle est sa hauteur ? (au centième)', unit:'m', ans:12.59, tol:.011, why:'L’ombre est adjacente à l’angle et la hauteur lui est opposée : h = 15 × tan 40° ≈ 12,59 m.'},
   {q:'Une route monte de 8 m pour 100 m parcourus à l’horizontale. Quel angle fait-elle avec l’horizontale ? (au centième de degré)', unit:'°', ans:4.57, tol:.011, why:'tan α = 8/100 = 0,08, donc α = arctan 0,08 ≈ 4,57°.'},
 ]},
 {n:'Loi du sinus', r:'Triangle quelconque : lois du sinus et du cosinus', qs:[
   {q:'Dans un triangle, A = 48° et B = 77°. Combien vaut l’angle C ?', unit:'°', ans:55, why:'La somme des angles vaut 180° : C = 180° − 48° − 77° = 55°.'},
   {q:'Dans un triangle, A = 50°, B = 70° et a = 8. Combien vaut b ? (au centième)', lab:'b =', ans:9.81, tol:.011, why:'b / sin 70° = 8 / sin 50°, donc b = 8 × sin 70° / sin 50° ≈ 8 × 0,9397 / 0,7660 ≈ 9,81.'},
   {q:'Dans un triangle, A = 35°, B = 85° et c = 12. Combien vaut a ? (au centième)', lab:'a =', ans:7.95, tol:.011, why:'C = 180° − 35° − 85° = 60°. Puis a = 12 × sin 35° / sin 60° ≈ 12 × 0,5736 / 0,8660 ≈ 7,95.'},
   {q:'Deux observateurs A et B sont à 50 m l’un de l’autre. Ils visent un même point P avec les angles PAB = 40° et ABP = 110°. Quelle est la distance BP ? (au centième)', unit:'m', ans:64.28, tol:.011, why:'L’angle en P vaut 180° − 40° − 110° = 30°. Loi du sinus : BP / sin 40° = 50 / sin 30°, donc BP = 100 × sin 40° ≈ 64,28 m.'},
   {q:'Dans un triangle, tu connais deux côtés et l’angle compris entre eux. Quelle loi donne directement le 3e côté ?', opts:['La loi du sinus','La loi du cosinus','La somme des angles','La tangente'], ans:1, why:'c² = a² + b² − 2ab·cos C utilise exactement deux côtés et l’angle entre eux. La loi du sinus demande un angle opposé à un côté connu.'},
 ]},
 {n:'Loi du cosinus', r:'Triangle quelconque : lois du sinus et du cosinus', qs:[
   {q:'Dans un triangle, a = 6, b = 8 et C = 60°. Combien vaut c ? (au centième)', lab:'c =', ans:7.21, tol:.011, why:'c² = 36 + 64 − 2 · 6 · 8 · ½ = 100 − 48 = 52, donc c = √52 ≈ 7,21.'},
   {q:'Dans un triangle, a = 5, b = 9 et C = 120°. Combien vaut c ? (au centième)', lab:'c =', ans:12.29, tol:.011, why:'cos 120° = −½, donc c² = 25 + 81 + 45 = 151 et c = √151 ≈ 12,29. Un angle obtus allonge le côté opposé.'},
   {q:'Dans un triangle, a = 3, b = 4 et C = 90°. Combien vaut c ?', lab:'c =', ans:5, why:'cos 90° = 0, donc c² = 9 + 16 = 25 et c = 5 : la loi du cosinus redonne Pythagore.'},
   {q:'Un triangle a pour côtés 7, 8 et 9. Quel est l’angle opposé au côté 9 ? (au centième de degré)', unit:'°', ans:73.4, tol:.011, why:'81 = 49 + 64 − 2 · 7 · 8 · cos C, donc cos C = 32/112 ≈ 0,2857 et C = arccos 0,2857 ≈ 73,40°.'},
   {q:'Deux bateaux quittent le même port. L’un est à 12 km, l’autre à 15 km, et leurs directions font un angle de 40°. Quelle distance les sépare ? (au centième)', unit:'km', ans:9.66, tol:.011, why:'d² = 144 + 225 − 2 · 12 · 15 · cos 40° ≈ 369 − 275,77 = 93,23, donc d ≈ 9,66 km.'},
 ]},
];
})();
