/* Déclic — examen de compétence : Thalès et agrandissements */
(()=>{
EXAMS['thales']=[
 {n:'Ce qui change dans un agrandissement', r:'Agrandir d’un facteur k', qs:[
   {q:'On agrandit un triangle d’un facteur 2. Que deviennent ses angles&nbsp;?', opts:['Ils sont multipliés par 2','Ils sont multipliés par 4','Ils ne changent pas','Ils sont divisés par 2'], ans:2, why:'Un agrandissement multiplie les longueurs par <i>k</i> mais garde la forme : les angles ne changent pas. Sinon la somme des angles dépasserait 180°.'},
   {q:'Un triangle a un périmètre de 18 cm. On l’agrandit d’un facteur 1,5. Quel est le nouveau périmètre&nbsp;?', unit:'cm', ans:27, tol:0.001, why:'Le périmètre est une longueur : il est multiplié par <i>k</i>. 18 × 1,5 = 27 cm.'},
   {q:'Un carré de 5 cm de côté devient un carré de 7 cm de côté. Quel est le facteur d’agrandissement&nbsp;?', lab:'k =', ans:1.4, tol:0.001, why:'Toutes les longueurs sont multipliées par le même nombre : 7 ÷ 5 = 1,4.'},
   {q:'La maquette d’un bâtiment est à l’échelle 1:100. Le bâtiment mesure 25 m de haut. Quelle est la hauteur de la maquette&nbsp;?', unit:'cm', ans:25, why:'On divise par 100 : 25 m = 2500 cm, et 2500 ÷ 100 = 25 cm.'},
 ]},
 {n:'Le facteur d’agrandissement', r:'Calculer avec un facteur d’agrandissement', qs:[
   {q:'Un segment de 4 cm devient 10 cm après agrandissement. Quel est le facteur <i>k</i>&nbsp;?', lab:'k =', ans:2.5, tol:0.001, why:'<i>k</i> = longueur de l’image ÷ longueur d’origine = 10 ÷ 4 = 2,5.'},
   {q:'Un triangle de côtés 6, 8 et 10 cm est réduit : le côté de 10 cm devient 4 cm. Que devient le côté de 8 cm&nbsp;?', unit:'cm', ans:3.2, tol:0.001, why:'<i>k</i> = 4 ÷ 10 = 0,4. Donc 8 × 0,4 = 3,2 cm. <i>k</i> < 1 : c’est une réduction.'},
   {q:'Une photo de 10 cm sur 15 cm est agrandie : sa largeur passe à 30 cm. Quelle est sa nouvelle longueur&nbsp;?', unit:'cm', ans:45, why:'<i>k</i> = 30 ÷ 10 = 3, donc 15 × 3 = 45 cm.'},
   {q:'Une figure de 12 cm² est agrandie d’un facteur 3. Quelle est sa nouvelle aire&nbsp;?', unit:'cm²', ans:108, why:'Les aires sont multipliées par <i>k</i>² = 9 : 12 × 9 = 108 cm². Multiplier par 3 seulement serait l’erreur classique.'},
   {q:'Un rectangle de 6 cm sur 4 cm est agrandi d’un facteur 1,5. Quelle est l’aire du nouveau rectangle&nbsp;?', unit:'cm²', ans:54, tol:0.001, why:'Aire de départ : 24 cm², multipliée par 1,5² = 2,25 : 54 cm². Contrôle : 9 × 6 = 54.'},
   {q:'On double toutes les arêtes d’un cube. Par combien son volume est-il multiplié&nbsp;?', lab:'×', ans:8, why:'Les volumes sont multipliés par <i>k</i>³ = 2³ = 8.'},
   {q:'Après agrandissement, l’aire d’une figure passe de 20 cm² à 45 cm². Quel est le facteur <i>k</i> des longueurs&nbsp;?', lab:'k =', ans:1.5, tol:0.001, why:'L’aire est multipliée par 45 ÷ 20 = 2,25 = <i>k</i>². Donc <i>k</i> = 1,5, car 1,5² = 2,25.'},
 ]},
 {n:'Appliquer Thalès', r:'Appliquer Thalès et les triangles semblables', qs:[
   {q:'Dans le triangle ABC, M est sur [AB] et N sur [AC], avec (MN) parallèle à (BC). AM = 4, AB = 10 et BC = 15. Combien vaut MN&nbsp;?', lab:'MN =', ans:6, why:'AM/AB = MN/BC, soit 4/10 = MN/15. Produit en croix : MN = 15 × 4 ÷ 10 = 6.'},
   {q:'Dans le triangle ABC, M est sur [AB] et N sur [AC], avec (MN) parallèle à (BC). AM = 3, AB = 7,5 et AN = 2. Combien vaut AC&nbsp;?', lab:'AC =', ans:5, tol:0.001, why:'AM/AB = AN/AC, soit 3/7,5 = 2/AC. Donc AC = 2 × 7,5 ÷ 3 = 5.'},
   {q:'Dans le triangle ABC, M est sur [AB] et N sur [AC], avec (MN) parallèle à (BC). MN = 6, BC = 10 et AB = 15. Combien vaut AM&nbsp;?', lab:'AM =', ans:9, why:'AM/AB = MN/BC, soit AM/15 = 6/10. Donc AM = 15 × 6 ÷ 10 = 9.'},
   {q:'Dans le triangle ABC, M est sur [AB] et N sur [AC], avec (MN) parallèle à (BC). AM = 5, MB = 3 et BC = 12. Combien vaut MN&nbsp;?', lab:'MN =', ans:7.5, tol:0.001, why:'Attention : AB = AM + MB = 8. Alors MN = 12 × 5 ÷ 8 = 7,5. Utiliser MB à la place de AB est le piège classique.'},
   {q:'Dans le triangle ABC, M est sur [AB] et N sur [AC], avec (MN) parallèle à (BC). AN = 6, AC = 9 et AB = 12. Combien vaut AM&nbsp;?', lab:'AM =', ans:8, why:'AM/AB = AN/AC, soit AM/12 = 6/9. Donc AM = 12 × 6 ÷ 9 = 8.'},
   {q:'Dans le triangle ABC, M est sur [AB] et N sur [AC], avec (MN) parallèle à (BC). AM = 2,4, AB = 6 et AC = 8. Combien vaut AN&nbsp;?', lab:'AN =', ans:3.2, tol:0.001, why:'AN/AC = AM/AB, soit AN/8 = 2,4/6. Donc AN = 8 × 2,4 ÷ 6 = 3,2.'},
   {q:'Dans le triangle ABC, (MN) est parallèle à (BC), avec M sur [AB] et N sur [AC]. Quelle égalité est juste&nbsp;?', opts:['AM/MB = MN/BC','AM/AB = AN/AC = MN/BC','AM/AB = AC/AN','AB/AM = MN/BC'], ans:1, why:'On compare les côtés du petit triangle AMN à ceux du grand triangle ABC qui leur correspondent : AM avec AB, AN avec AC, MN avec BC.'},
 ]},
 {n:'Triangles semblables', r:'Appliquer Thalès et les triangles semblables', qs:[
   {q:'Un triangle a des angles de 40° et 60°. Un autre a des angles de 60° et 80°. Sont-ils semblables&nbsp;?', opts:['Non, ils n’ont qu’un angle commun','Oui : le troisième angle du premier vaut 80°, ils ont deux angles égaux','On ne peut pas savoir sans les longueurs','Oui, car tous les triangles sont semblables'], ans:1, why:'180° − 40° − 60° = 80°. Les deux triangles ont des angles de 60° et 80° : deux angles égaux suffisent.'},
   {q:'Au même moment, une personne de 1,6 m a une ombre de 2 m et un immeuble a une ombre de 30 m. Quelle est la hauteur de l’immeuble&nbsp;?', unit:'m', ans:24, tol:0.001, why:'Les rayons du soleil sont parallèles : hauteur ÷ ombre est le même rapport. 1,6 ÷ 2 = 0,8, donc 30 × 0,8 = 24 m.'},
   {q:'Pour mesurer une rivière, on place A face à un arbre T sur l’autre rive, puis B à 20 m de A le long de la berge, puis C à 5 m après B. Depuis C, on s’éloigne à angle droit jusqu’en D, où B et l’arbre sont alignés : CD = 3 m. Quelle est la largeur AT&nbsp;?', unit:'m', ans:12, why:'Les triangles TAB et DCB ont un angle droit et des angles opposés par le sommet en B : ils sont semblables. AT/CD = AB/BC = 20/5 = 4, donc AT = 4 × 3 = 12 m.'},
   {q:'Deux triangles rectangles sont-ils toujours semblables&nbsp;?', opts:['Oui, ils ont tous un angle droit','Non, il faut encore un autre angle égal','Oui, si l’un est plus grand','Non, jamais'], ans:1, why:'L’angle droit ne fait qu’un angle égal. Un triangle rectangle avec un angle de 30° et un autre avec un angle de 45° n’ont pas la même forme.'},
 ]},
 {n:'Utiliser une échelle', r:'Utiliser une échelle', qs:[
   {q:'Sur une carte au 1:50 000, une route mesure 7 cm. Quelle est sa vraie longueur&nbsp;?', unit:'km', ans:3.5, tol:0.001, why:'7 × 50 000 = 350 000 cm = 3 500 m = 3,5 km.'},
   {q:'Sur une carte au 1:25 000, combien mesure un trajet réel de 3 km&nbsp;?', unit:'cm', ans:12, tol:0.001, why:'3 km = 300 000 cm. Du réel au plan, on divise : 300 000 ÷ 25 000 = 12 cm.'},
   {q:'Sur un plan au 1:200, une pièce mesure 4,5 cm de long. Quelle est sa vraie longueur&nbsp;?', unit:'m', ans:9, tol:0.001, why:'4,5 × 200 = 900 cm = 9 m.'},
   {q:'Sur un plan au 1:50, un lit de 2 m de long mesure combien&nbsp;?', unit:'cm', ans:4, tol:0.001, why:'2 m = 200 cm, et 200 ÷ 50 = 4 cm.'},
   {q:'Sur une carte, 10 cm représentent 2,5 km. Quelle est l’échelle (1 : ?)&nbsp;?', lab:'1 :', ans:25000, why:'2,5 km = 250 000 cm. <i>n</i> = 250 000 ÷ 10 = 25 000 : carte au 1:25 000.'},
   {q:'Sur un plan au 1:100, une pièce occupe 12 cm². Quelle est sa vraie surface&nbsp;?', unit:'m²', ans:12, tol:0.001, why:'Les aires sont multipliées par 100² = 10 000 : 12 × 10 000 = 120 000 cm² = 12 m².'},
   {q:'Sur une carte au 1:20 000, 5 cm représentent…', opts:['100 m','1 km','10 km','4 km'], ans:1, why:'5 × 20 000 = 100 000 cm = 1 000 m = 1 km.'},
 ]},
];
})();
