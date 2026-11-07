/* Déclic — examen de compétence : Équations du 1er et du 2e degré */
(()=>{
const X='<i>x</i>', N='<i>n</i>';
EXAMS['sec11-equations']=[
 {n:'Équations du 1er degré', r:'Résoudre une équation du 1er degré', qs:[
   {q:`Résous 7${X} − 4 = 3${X} + 12.`, lab:'x =', ans:4, why:`On retire 3${X} et on ajoute 4 : 4${X} = 16, donc ${X} = 4. Vérification : 28 − 4 = 24 = 12 + 12 ✓.`},
   {q:`Résous 2(${X} − 3) = 5 − (${X} + 2).`, lab:'x =', ans:3, why:`On développe : 2${X} − 6 = 5 − ${X} − 2 = 3 − ${X}. Donc 3${X} = 9 et ${X} = 3. Vérification : 2 · 0 = 0 et 5 − 5 = 0 ✓.`},
   {q:`Résous ${F(X,4)} + 1 = ${F(`${X} − 2`,2)}.`, lab:'x =', ans:8, why:`On multiplie tout par 4 : ${X} + 4 = 2(${X} − 2) = 2${X} − 4. Donc ${X} = 8. Vérification : 2 + 1 = 3 et ${F(6,2)} = 3 ✓.`},
   {q:`Laquelle de ces valeurs est solution de 5 − 2${X} = ${X} + 11&nbsp;?`, opts:['2','−2','6','−6'], ans:1, why:`On regroupe : −6 = 3${X}, donc ${X} = −2. Vérification : 5 + 4 = 9 et −2 + 11 = 9 ✓.`},
 ]},
 {n:'Mettre un problème en équation', r:'Mettre un problème en équation', qs:[
   {q:'La somme de trois nombres entiers consécutifs vaut 141. Quel est le plus petit des trois&nbsp;?', ans:46, why:`Soit ${N} le plus petit : ${N} + (${N} + 1) + (${N} + 2) = 141, soit 3${N} + 3 = 141, donc ${N} = 46. Les nombres sont 46, 47 et 48.`},
   {q:'Un rectangle a un périmètre de 46 cm. Sa longueur dépasse sa largeur de 5 cm. Quelle est sa largeur&nbsp;?', unit:'cm', ans:9, why:`Soit ${X} la largeur : 2(${X} + ${X} + 5) = 46, soit 4${X} + 10 = 46, donc ${X} = 9 cm (et la longueur vaut 14 cm).`},
   {q:'Un père a 25 ans de plus que sa fille. Dans 5 ans, il aura le double de l’âge de sa fille. Quel âge a la fille aujourd’hui&nbsp;?', unit:'ans', ans:20, why:`Soit ${X} l’âge de la fille : ${X} + 25 + 5 = 2(${X} + 5), soit ${X} + 30 = 2${X} + 10, donc ${X} = 20 ans. Contrôle : dans 5 ans, 50 = 2 · 25 ✓.`},
   {q:'Le carré d’un nombre positif dépasse ce nombre de 30. Quel est ce nombre&nbsp;?', ans:6, why:`${X}² = ${X} + 30 ⇔ ${X}² − ${X} − 30 = 0 ⇔ (${X} − 6)(${X} + 5) = 0. On garde la solution positive : 6. Contrôle : 36 = 6 + 30 ✓.`},
   {q:'Un terrain rectangulaire a une aire de 60 m². Sa longueur dépasse sa largeur de 7 m. Quelle est sa largeur&nbsp;?', unit:'m', ans:5, why:`${X}(${X} + 7) = 60 ⇔ ${X}² + 7${X} − 60 = 0. Δ = 49 + 240 = 289 = 17², donc ${X} = ${F('−7 + 17',2)} = 5 (l’autre solution, −12, est négative). Le terrain mesure 5 m sur 12 m.`},
 ]},
 {n:'Carrés et produit nul', r:'Le produit nul', qs:[
   {q:`Résous (${X} + 4)(3${X} − 6) = 0.`, opts:['S = {4 ; −2}','S = {−4 ; 6}','S = {−4 ; 2}','S = {−4 ; 3}'], ans:2, why:`Produit nul : ${X} + 4 = 0 ou 3${X} − 6 = 0, donc ${X} = −4 ou ${X} = 2.`},
   {q:`Résous ${X}² = 81.`, opts:['S = {9}','S = {−9 ; 9}','S = {40,5}','aucune solution'], ans:1, why:`Deux nombres opposés ont le même carré : 9² = 81 et (−9)² = 81. S = {−9 ; 9}.`},
   {q:`Combien de solutions l’équation ${X}² + 16 = 0 a-t-elle&nbsp;?`, opts:['Aucune','Une','Deux','Une infinité'], ans:0, why:`Elle s’écrit ${X}² = −16. Un carré n’est jamais négatif : aucune solution.`},
   {q:`Pour résoudre (${X} − 2)(${X} + 1) = 4, un élève écrit « ${X} − 2 = 4 ou ${X} + 1 = 4 ». Où est son erreur&nbsp;?`, opts:['Il aurait dû écrire x − 2 = 2 ou x + 1 = 2','La règle du produit nul ne marche qu’avec 0 : il faut d’abord tout ramener à 0','Il n’y a pas d’erreur','Il aurait dû diviser par x − 2'], ans:1, why:`Un produit égal à 4 peut valoir 1 · 4, 2 · 2, 0,5 · 8… Il faut développer et ramener à 0 : ${X}² − ${X} − 6 = 0, soit (${X} − 3)(${X} + 2) = 0, donc ${X} = 3 ou ${X} = −2.`},
   {q:`Résous 2${X}(${X} − 7) = 0. Donne la plus grande solution.`, lab:'x =', ans:7, why:`Produit nul : 2${X} = 0 ou ${X} − 7 = 0, donc ${X} = 0 ou ${X} = 7. La plus grande est 7.`},
 ]},
 {n:'Résoudre en factorisant', r:'Résoudre en factorisant', qs:[
   {q:`Résous ${X}² − 7${X} = 0.`, opts:['S = {7}','S = {0 ; 7}','S = {0 ; −7}','S = {−7 ; 7}'], ans:1, why:`${X}(${X} − 7) = 0, donc ${X} = 0 ou ${X} = 7.`},
   {q:`Résous ${X}² + 2${X} − 24 = 0. Donne la solution positive.`, lab:'x =', ans:4, why:`Produit −24 et somme 2 : 6 et −4. (${X} + 6)(${X} − 4) = 0, donc ${X} = −6 ou ${X} = 4.`},
   {q:`Résous 4${X}² − 25 = 0. Donne la solution positive (tu peux écrire une fraction).`, lab:'x =', ans:2.5, tol:.001, show:'5/2', why:`Différence de deux carrés : (2${X} − 5)(2${X} + 5) = 0, donc ${X} = ${F(5,2)} ou ${X} = −${F(5,2)}.`},
   {q:`Résous ${X}² − 10${X} + 25 = 0.`, lab:'x =', ans:5, why:`${X}² − 10${X} + 25 = (${X} − 5)², qui est nul seulement pour ${X} = 5 : une seule solution.`},
   {q:`Pour résoudre ${X}² = 3${X}, un élève divise par ${X} et trouve ${X} = 3. Que penser de sa réponse&nbsp;?`, opts:['Elle est complète','Elle est fausse : la solution est x = 0 seulement','Il a perdu la solution x = 0 : il fallait écrire x(x − 3) = 0','Il a perdu la solution x = −3'], ans:2, why:`On ne divise pas par ${X}, qui peut valoir 0. ${X}² − 3${X} = 0 ⇔ ${X}(${X} − 3) = 0 ⇔ ${X} = 0 ou ${X} = 3.`},
 ]},
 {n:'Le discriminant', r:'La formule du discriminant', qs:[
   {q:`Calcule le discriminant de 2${X}² + 3${X} − 5 = 0.`, lab:'Δ =', ans:49, why:'Δ = 3² − 4 · 2 · (−5) = 9 + 40 = 49.'},
   {q:`Combien de solutions l’équation ${X}² + ${X} + 3 = 0 a-t-elle&nbsp;?`, opts:['Deux','Une','Aucune','Trois'], ans:2, why:'Δ = 1 − 4 · 1 · 3 = −11 &lt; 0 : aucune solution.'},
   {q:`Résous ${X}² − 4${X} + 1 = 0. Donne la plus grande solution, arrondie au centième.`, lab:'x ≈', ans:3.73, tol:.01, why:`Δ = 16 − 4 = 12. ${X} = ${F('4 + √12',2)} = 2 + √3 ≈ 3,73 (l’autre vaut 2 − √3 ≈ 0,27).`},
   {q:`Résous 2${X}² − 5${X} + 2 = 0. Donne la plus petite solution (tu peux écrire une fraction).`, lab:'x =', ans:0.5, tol:.001, show:'1/2', why:`Δ = 25 − 16 = 9, √Δ = 3. ${X} = ${F('5 + 3',4)} = 2 ou ${X} = ${F('5 − 3',4)} = ${F(1,2)}. La plus petite est ${F(1,2)}.`},
   {q:`Pour quelle valeur de <i>c</i> l’équation ${X}² + 8${X} + <i>c</i> = 0 a-t-elle exactement une solution&nbsp;?`, lab:'c =', ans:16, why:`Une seule solution quand Δ = 0 : 64 − 4<i>c</i> = 0, donc <i>c</i> = 16. On a alors (${X} + 4)² = 0.`},
   {q:`Résous −${X}² + 2${X} + 3 = 0. Donne la plus grande solution.`, lab:'x =', ans:3, why:`<i>a</i> = −1, <i>b</i> = 2, <i>c</i> = 3 : Δ = 4 + 12 = 16. ${X} = ${F('−2 + 4','−2')} = −1 ou ${X} = ${F('−2 − 4','−2')} = 3. La plus grande est 3.`},
 ]},
 {n:'Isoler une variable', r:'Isoler une variable dans une formule', qs:[
   {q:'Dans la formule <i>d</i> = <i>vt</i>, comment s’écrit la vitesse <i>v</i>&nbsp;?', opts:['<i>v</i> = <i>dt</i>',`<i>v</i> = ${F('<i>t</i>','<i>d</i>')}`,`<i>v</i> = ${F('<i>d</i>','<i>t</i>')}`,'<i>v</i> = <i>d</i> − <i>t</i>'], ans:2, why:`On divise les deux côtés par <i>t</i> : <i>v</i> = ${F('<i>d</i>','<i>t</i>')}.`},
   {q:`Un triangle a une aire <i>A</i> = ${F('<i>bh</i>',2)} de 35 cm² et une base <i>b</i> de 10 cm. Quelle est sa hauteur&nbsp;?`, lab:'h =', unit:'cm', ans:7, why:`<i>h</i> = ${F('2<i>A</i>','<i>b</i>')} = ${F('70',10)} = 7 cm.`},
   {q:'Un rectangle a un périmètre <i>p</i> = 2(<i>a</i> + <i>b</i>) de 30 cm, et <i>a</i> = 9 cm. Que vaut <i>b</i>&nbsp;?', lab:'b =', unit:'cm', ans:6, why:`<i>b</i> = ${F('<i>p</i>',2)} − <i>a</i> = 15 − 9 = 6 cm.`},
   {q:'Un disque a une aire <i>A</i> = π<i>r</i>² de 50 cm². Quel est son rayon, arrondi au centième&nbsp;?', lab:'r ≈', unit:'cm', ans:3.99, tol:.01, why:`<i>r</i>² = ${F('<i>A</i>','π')}, donc <i>r</i> = √(${F(50,'π')}) ≈ √15,92 ≈ 3,99 cm (on garde la racine positive).`},
   {q:`Le volume d’un cône est <i>V</i> = ${F('π<i>r</i>²<i>h</i>',3)}. Comment s’écrit sa hauteur <i>h</i>&nbsp;?`, opts:[`<i>h</i> = ${F('<i>V</i>','3π<i>r</i>²')}`,`<i>h</i> = ${F('3<i>V</i>','π<i>r</i>²')}`,`<i>h</i> = 3<i>V</i> − π<i>r</i>²`,`<i>h</i> = ${F('π<i>r</i>²','3<i>V</i>')}`], ans:1, why:`On multiplie par 3 : 3<i>V</i> = π<i>r</i>²<i>h</i>. Puis on divise par π<i>r</i>² : <i>h</i> = ${F('3<i>V</i>','π<i>r</i>²')}.`},
 ]},
];
})();
