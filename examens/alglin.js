/* Déclic — examen de compétence : Algèbre linéaire */
(()=>{
EXAMS['alglin']=[
 {n:'Écrire un vecteur comme combinaison', r:'Écrire un vecteur comme combinaison', qs:[
   {q:'Avec <b>u</b> = (2 ; −1) et <b>v</b> = (1 ; 4), calcule la 2e composante de 3<b>u</b> + 2<b>v</b>.', lab:'2e composante =', ans:5, why:'3<b>u</b> + 2<b>v</b> = (6 + 2 ; −3 + 8) = (8 ; 5). La 2e composante vaut 5.'},
   {q:'<b>u</b> = (1 ; 1), <b>v</b> = (2 ; −1) et <b>w</b> = (7 ; 1). On cherche α et β tels que α<b>u</b> + β<b>v</b> = <b>w</b>. Combien vaut α ?', lab:'α =', ans:3, why:'α + 2β = 7 et α − β = 1. En soustrayant : 3β = 6, donc β = 2 et α = 3. Contrôle : 3(1 ; 1) + 2(2 ; −1) = (7 ; 1).'},
   {q:'<b>u</b> = (3 ; 1), <b>v</b> = (1 ; 2) et <b>w</b> = (5 ; 5). Si <b>w</b> = α<b>u</b> + β<b>v</b>, combien vaut β ?', lab:'β =', ans:2, why:'3α + β = 5 et α + 2β = 5. La 1re donne β = 5 − 3α, d’où α + 10 − 6α = 5, soit α = 1 et β = 2. Contrôle : (3 + 2 ; 1 + 4) = (5 ; 5).'},
   {q:'<b>u</b> = (2 ; 1), <b>v</b> = (−1 ; 3) et <b>w</b> = (0 ; 7). Si <b>w</b> = α<b>u</b> + β<b>v</b>, combien vaut α ?', lab:'α =', ans:1, why:'2α − β = 0 donne β = 2α. Puis α + 3β = 7α = 7, donc α = 1 (et β = 2). Contrôle : (2 − 2 ; 1 + 6) = (0 ; 7).'},
   {q:'Dans ℝ³, <b>u</b> = (1 ; 2 ; 0), <b>v</b> = (1 ; 0 ; 1) et <b>w</b> = (3 ; 4 ; 1). Si <b>w</b> = α<b>u</b> + β<b>v</b>, combien vaut β ?', lab:'β =', ans:1, why:'La 2e composante donne 2α = 4, donc α = 2. La 1re donne α + β = 3, donc β = 1. Contrôle sur la 3e : 0 + 1 = 1 ✓.'},
   {q:'Dans ℝ³, <b>u</b> = (1 ; 0 ; 2), <b>v</b> = (0 ; 1 ; 1) et <b>w</b> = (2 ; 3 ; 8). Que peut-on dire ?', opts:['<b>w</b> = 2<b>u</b> + 3<b>v</b>','<b>w</b> = 3<b>u</b> + 2<b>v</b>','<b>w</b> n’est pas une combinaison de <b>u</b> et <b>v</b>','<b>w</b> = 2<b>u</b> + 4<b>v</b>'], ans:2, why:'Les deux premières composantes imposent α = 2 et β = 3. Contrôle sur la 3e : 2·2 + 3·1 = 7 ≠ 8. L’équation de contrôle est fausse : aucune combinaison ne donne <b>w</b>.'},
   {q:'<b>u</b> = (1 ; 2), <b>v</b> = (2 ; 4) et <b>w</b> = (3 ; 5). Que donne le système α<b>u</b> + β<b>v</b> = <b>w</b> ?', opts:['α = 1 et β = 1','Une infinité de solutions','α = 3 et β = 0','Aucune solution : <b>u</b> et <b>v</b> sont colinéaires et <b>w</b> n’est pas sur leur droite'], ans:3, why:'α + 2β = 3 et 2α + 4β = 5. La 2e équation vaut 2 fois la 1re côté gauche, donc il faudrait 5 = 6 : impossible. <b>v</b> = 2<b>u</b>, et (3 ; 5) n’est pas un multiple de (1 ; 2).'},
 ]},
 {n:'Tester l’indépendance de deux vecteurs', r:'Tester l’indépendance avec le déterminant', qs:[
   {q:`Calcule le déterminant de ${mat([[5,2],[3,4]])}.`, lab:'det =', ans:14, why:'det = ad − bc = 5·4 − 2·3 = 20 − 6 = 14.'},
   {q:`Calcule le déterminant de ${mat([['−2',3],[4,1]])}.`, lab:'det =', ans:-14, why:'det = (−2)·1 − 3·4 = −2 − 12 = −14.'},
   {q:'Calcule le déterminant de la matrice dont les colonnes sont (4 ; −2) et (−6 ; 3).', lab:'det =', ans:0, why:`det ${mat([[4,'−6'],['−2',3]])} = 4·3 − (−6)·(−2) = 12 − 12 = 0. En effet (−6 ; 3) = −1,5·(4 ; −2).`},
   {q:'Les vecteurs (3 ; −6) et (−1 ; 2) forment-ils une base du plan ?', opts:['Oui, car ils ne sont pas égaux','Non : le déterminant est nul, ils sont colinéaires','Oui : le déterminant vaut 12','Non, car l’un a une composante négative'], ans:1, why:'det = 3·2 − (−1)·(−6) = 6 − 6 = 0. En effet (3 ; −6) = −3·(−1 ; 2) : ils sont colinéaires.'},
   {q:'Pour quelle valeur de k les vecteurs (2 ; k) et (3 ; 6) sont-ils colinéaires ?', lab:'k =', ans:4, why:'Colonnes (2 ; k) et (3 ; 6) : det = 2·6 − 3·k = 12 − 3k = 0 pour k = 4. Contrôle : (3 ; 6) = 1,5·(2 ; 4).'},
   {q:'Pour quelle valeur <b>positive</b> de k les vecteurs (k ; 3) et (3 ; k) sont-ils colinéaires ?', lab:'k =', ans:3, why:'det = k·k − 3·3 = k² − 9 = 0 pour k = 3 ou k = −3. La valeur positive est 3 : les deux vecteurs valent alors (3 ; 3).'},
   {q:'Deux vecteurs <b>u</b> et <b>v</b> du plan ont un déterminant égal à −5. Que peut-on conclure ?', opts:['Ils sont colinéaires','Ils ne forment pas une base, car le déterminant est négatif','On ne peut rien dire sans les dessiner','Ils forment une base : tout vecteur du plan s’écrit de façon unique α<b>u</b> + β<b>v</b>'], ans:3, why:'Seule la nullité du déterminant compte : −5 ≠ 0, donc <b>u</b> et <b>v</b> ne sont pas colinéaires et forment une base. Le signe ne joue aucun rôle ici.'},
 ]},
 {n:'Déterminant 3 × 3', r:'Calculer un déterminant 3 × 3', qs:[
   {q:`Calcule le déterminant de ${mat([[1,2,1],[0,1,3],[2,1,0]])}.`, lab:'det =', ans:7, why:'Selon la 1re ligne : 1·(1·0 − 3·1) − 2·(0·0 − 3·2) + 1·(0·1 − 1·2) = −3 + 12 − 2 = 7.'},
   {q:`Calcule le déterminant de ${mat([[3,0,0],[1,2,0],[4,5,'−1']])}.`, lab:'det =', ans:-6, why:'Selon la 1re ligne, seul le premier terme compte : 3·(2·(−1) − 0·5) = 3·(−2) = −6.'},
   {q:`Calcule le déterminant de ${mat([[2,'−1',0],[1,3,2],[0,1,4]])}.`, lab:'det =', ans:24, why:'2·(3·4 − 2·1) − (−1)·(1·4 − 2·0) + 0 = 2·10 + 4 = 24.'},
   {q:`Calcule le déterminant de ${mat([[0,4,0],[2,1,3],[1,5,2]])}.`, lab:'det =', ans:-4, why:'Seul le terme du milieu reste, avec le signe − : −4·(2·2 − 3·1) = −4·1 = −4.'},
   {q:`Calcule le déterminant de ${mat([[2,0,1],[0,3,0],[1,0,2]])}.`, lab:'det =', ans:9, why:'2·(3·2 − 0·0) − 0 + 1·(0·0 − 3·1) = 12 − 3 = 9.'},
   {q:`Les lignes de ${mat([[1,2,3],[4,5,6],[7,8,9]])} forment-elles une base de ℝ³ ?`, opts:['Oui, car aucune ligne n’est multiple d’une autre','Oui, car le déterminant vaut 0','Non : le déterminant est nul, une ligne est combinaison des deux autres','Non, car le déterminant est négatif'], ans:2, why:'1·(45 − 48) − 2·(36 − 42) + 3·(32 − 35) = −3 + 12 − 9 = 0. En effet (7 ; 8 ; 9) = 2·(4 ; 5 ; 6) − (1 ; 2 ; 3).'},
   {q:`Pour quelle valeur de k le déterminant de ${mat([[1,2,0],[0,'k',3],[1,0,2]])} est-il nul ?`, lab:'k =', ans:-3, why:'1·(2k − 0) − 2·(0·2 − 3·1) + 0 = 2k + 6. Il s’annule pour k = −3.'},
   {q:'Pour quelle valeur de k les vecteurs (1 ; 0 ; 1), (2 ; 1 ; 0) et (0 ; 1 ; k) ne forment-ils <b>pas</b> une base de ℝ³ ?', lab:'k =', ans:-2, why:'Avec ces vecteurs en lignes : 1·(1·k − 0·1) − 0 + 1·(2·1 − 1·0) = k + 2. Le déterminant est nul pour k = −2 : les vecteurs sont alors liés.'},
 ]},
 {n:'Règle de Cramer', r:'Résoudre avec la règle de Cramer', qs:[
   {q:'Combien vaut le déterminant de la matrice des coefficients du système 4x − y = 7, 2x + 3y = 21 ?', lab:'det A =', ans:14, why:`det ${mat([[4,'−1'],[2,3]])} = 4·3 − (−1)·2 = 12 + 2 = 14.`},
   {q:'Résous 4x − y = 7 et 2x + 3y = 21. Combien vaut x ?', lab:'x =', ans:3, why:`det A = 14. x = det ${mat([[7,'−1'],[21,3]])} / 14 = (21 + 21)/14 = 3. Contrôle : y = 5 et 12 − 5 = 7.`},
   {q:'Résous 2x + 3y = 12 et x − y = 1. Combien vaut y ?', lab:'y =', ans:2, why:`det A = 2·(−1) − 3·1 = −5. y = det ${mat([[2,12],[1,1]])} / (−5) = (2 − 12)/(−5) = 2. Contrôle : x = 3, 6 + 6 = 12 et 3 − 2 = 1.`},
   {q:'Résous 3x + 2y = 1 et 5x + 4y = 3. Combien vaut x ?', lab:'x =', ans:-1, why:`det A = 12 − 10 = 2. x = det ${mat([[1,2],[3,4]])} / 2 = (4 − 6)/2 = −1. Contrôle : y = 2, −3 + 4 = 1 et −5 + 8 = 3.`},
   {q:'Pour le système 5x − 2y = 4, 3x + y = 9, combien vaut det Aₓ (A avec sa 1re colonne remplacée par les seconds membres) ?', lab:'det Aₓ =', ans:22, why:`det Aₓ = det ${mat([[4,'−2'],[9,1]])} = 4·1 − (−2)·9 = 22. Avec det A = 5 + 6 = 11, on trouve x = 2.`},
   {q:'Résous 2x + y = 1 et x + 3y = 2. Combien vaut y ? (fraction ou décimale)', lab:'y =', ans:0.6, show:'3/5', why:`det A = 6 − 1 = 5. y = det ${mat([[2,1],[1,2]])} / 5 = (4 − 1)/5 = 3/5. Contrôle : x = 1/5, 2/5 + 3/5 = 1.`},
   {q:'Pour quelle valeur de k le système kx + 2y = 3, 6x + 4y = 1 n’a-t-il pas de solution unique ?', lab:'k =', ans:3, why:'det A = 4k − 2·6 = 4k − 12. Il est nul pour k = 3 : alors pas de solution unique.'},
   {q:'Le déterminant de la matrice d’un système 2 × 2 est nul. Que peut-on dire du système ?', opts:['Il a la solution unique (0 ; 0)','Il n’a pas de solution unique : soit aucune, soit une infinité','Il a toujours une infinité de solutions','x = det Aₓ / 0 = 0'], ans:1, why:'Cramer ne s’applique que si det A ≠ 0. Si det A = 0, les deux droites sont parallèles : distinctes (aucune solution) ou confondues (une infinité).'},
 ]},
];
})();
