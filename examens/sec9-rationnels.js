/* Déclic — examen de compétence : Fractions, pourcentages et puissances */
(()=>{
EXAMS['sec9-rationnels']=[
 {n:'Simplifier et amplifier une fraction',r:'Simplifier et amplifier une fraction',qs:[
   {q:`Quelle est la forme irréductible de ${F(42,56)}&nbsp;?`,opts:[F(21,28),F(3,4),F(6,8),F(7,8)],ans:1,why:`Le pgdc de 42 et 56 vaut 14 : ${F('42 ÷ 14','56 ÷ 14')} = ${F(3,4)}. ${F(21,28)} et ${F(6,8)} sont égales, mais on peut encore les simplifier.`},
   {q:`Complète : ${F(5,7)} = ${F('?',35)}.`,lab:'? =',ans:25,why:`35 = 7 × 5 : on multiplie aussi le numérateur par 5. 5 × 5 = 25, donc ${F(5,7)} = ${F(25,35)}.`},
   {q:'Trois tablettes de chocolat sont partagées équitablement entre 5 amis. Quelle part de tablette reçoit chacun&nbsp;? Réponds par une fraction ou un nombre décimal.',lab:'part =',ans:0.6,tol:1e-6,show:'3/5',why:`Partager 3 entre 5, c’est le quotient 3 ÷ 5 = ${F(3,5)} = 0,6 de tablette.`},
   {q:`Laquelle de ces fractions n’est <b>pas</b> égale à ${F(2,3)}&nbsp;?`,opts:[F(4,6),F(10,15),F(3,4),F(14,21)],ans:2,why:`${F(4,6)}, ${F(10,15)} et ${F(14,21)} s’obtiennent en multipliant 2 et 3 par 2, 5 et 7. ${F(3,4)} vient d’un ajout de 1 en haut et en bas : ce n’est pas la même part.`},
 ]},
 {n:'Comparer et placer des fractions',r:'Comparer des fractions et les placer sur une droite',qs:[
   {q:'Quelle est la plus grande de ces fractions&nbsp;?',opts:[F(5,8),F(2,3),F(7,12),F(3,5)],ans:1,why:`Avec le dénominateur 120 : ${F(75,120)}, ${F(80,120)}, ${F(70,120)} et ${F(72,120)}. La plus grande est ${F(2,3)} = ${F(80,120)}.`},
   {q:`Entre quels nombres entiers se trouve ${F(17,5)}&nbsp;?`,opts:['2 et 3','3 et 4','4 et 5','5 et 6'],ans:1,why:`${F(17,5)} = 17 ÷ 5 = 3,4, ou bien ${F(15,5)} + ${F(2,5)} = 3 + ${F(2,5)} : il est entre 3 et 4.`},
   {q:'Sur une droite graduée en huitièmes, le point A est 3 petites graduations après 2. Quelle est son abscisse&nbsp;? Réponds par une fraction.',lab:'abscisse =',ans:19/8,tol:1e-6,show:'19/8',why:`2 = ${F(16,8)}, et 3 graduations de plus donnent ${F(19,8)} = 2,375.`},
   {q:`On range ${F(3,4)}, ${F(5,6)} et ${F(7,9)} dans l’ordre croissant. Laquelle est au milieu&nbsp;?`,opts:[F(3,4),F(5,6),F(7,9)],ans:2,why:`Avec le dénominateur 36 : ${F(27,36)}, ${F(30,36)} et ${F(28,36)}. L’ordre est ${F(3,4)} &lt; ${F(7,9)} &lt; ${F(5,6)}.`},
 ]},
 {n:'Additionner et soustraire des fractions',r:'Additionner et soustraire des fractions',qs:[
   {q:`Calcule ${F(3,8)} + ${F(1,4)}.`,lab:'résultat =',ans:5/8,tol:1e-6,show:'5/8',why:`${F(1,4)} = ${F(2,8)}, donc ${F(3,8)} + ${F(2,8)} = ${F(5,8)}.`},
   {q:`Calcule ${F(7,10)} − ${F(2,5)}.`,lab:'résultat =',ans:0.3,tol:1e-6,show:'3/10',why:`${F(2,5)} = ${F(4,10)}, donc ${F(7,10)} − ${F(4,10)} = ${F(3,10)}.`},
   {q:`Calcule ${F(1,6)} + ${F(3,4)}.`,lab:'résultat =',ans:11/12,tol:1e-6,show:'11/12',why:`Le ppmc de 6 et 4 vaut 12 : ${F(2,12)} + ${F(9,12)} = ${F(11,12)}.`},
   {q:`Calcule 3 − ${F(4,5)}.`,lab:'résultat =',ans:2.2,tol:1e-6,show:'11/5',why:`3 = ${F(15,5)}, donc ${F(15,5)} − ${F(4,5)} = ${F(11,5)} = 2,2.`},
   {q:`Noé écrit ${F(1,3)} + ${F(1,4)} = ${F(2,7)}. Quel est le bon résultat&nbsp;?`,opts:[F(2,7),F(7,12),F(2,12),F(1,7)],ans:1,why:`On n’additionne pas les dénominateurs. Avec 12 : ${F(4,12)} + ${F(3,12)} = ${F(7,12)}.`},
 ]},
 {n:'Calculer avec des décimaux',r:'Calculer avec des nombres décimaux',qs:[
   {q:'Calcule 7,3 + 12,85.',lab:'résultat =',ans:20.15,tol:1e-6,why:'Virgule sous virgule : 7,30 + 12,85 = 20,15.'},
   {q:'Calcule 15 − 6,48.',lab:'résultat =',ans:8.52,tol:1e-6,why:'On écrit 15 = 15,00, puis 15,00 − 6,48 = 8,52.'},
   {q:'Combien vaut 0,4 × 0,2&nbsp;?',opts:['0,8','0,08','8','0,008'],ans:1,why:'4 × 2 = 8, et les deux facteurs ont chacun un chiffre après la virgule : le produit en a 2. 0,4 × 0,2 = 0,08.'},
   {q:'Calcule 9,6 : 0,3.',lab:'résultat =',ans:32,tol:1e-6,why:'On multiplie les deux nombres par 10 : 9,6 : 0,3 = 96 : 3 = 32. Contrôle : 32 × 0,3 = 9,6.'},
 ]},
 {n:'Pourcentages',r:'Pourcentages : convertir et calculer',qs:[
   {q:`Écris ${F(7,20)} en pourcentage.`,unit:'%',ans:35,tol:1e-6,why:`${F(7,20)} = ${F(35,100)} (on multiplie par 5 en haut et en bas) = 35 %.`},
   {q:'Écris 0,08 en pourcentage.',unit:'%',ans:8,tol:1e-6,why:'0,08 × 100 = 8 : 0,08 = 8 centièmes = 8 %.'},
   {q:'Combien valent 30 % de 150 CHF&nbsp;?',unit:'CHF',ans:45,tol:1e-6,why:'1 % de 150 = 1,50 CHF, donc 30 % = 30 × 1,50 = 45 CHF. Ou : 10 % = 15 CHF, donc 30 % = 45 CHF.'},
   {q:'Un jeu vidéo coûte 60 CHF. Pendant les soldes, son prix baisse de 15 %. Quel est son nouveau prix&nbsp;?',unit:'CHF',ans:51,tol:1e-6,why:'15 % de 60 CHF = 60 : 100 × 15 = 9 CHF. Nouveau prix : 60 − 9 = 51 CHF.'},
   {q:'Dans une équipe de 25 joueurs, 9 sont gauchers. Quel pourcentage de l’équipe cela représente-t-il&nbsp;?',unit:'%',ans:36,tol:1e-6,why:`${F(9,25)} = ${F(36,100)} (× 4 en haut et en bas) = 36 %.`},
 ]},
 {n:'Puissances',r:'Les puissances : multiplier un nombre par lui-même',qs:[
   {q:'Calcule 3⁴.',lab:'3⁴ =',ans:81,why:'3⁴ = 3 × 3 × 3 × 3 = 9 × 9 = 81.'},
   {q:'Un grand cube est fait de petits cubes : 7 petits cubes sur chaque arête. Combien de petits cubes contient-il&nbsp;?',lab:'petits cubes =',ans:343,why:'7³ = 7 × 7 × 7 = 49 × 7 = 343.'},
   {q:'Compare 2⁵ et 5².',opts:['2⁵ est plus grand','5² est plus grand','ils sont égaux'],ans:0,why:'2⁵ = 2 × 2 × 2 × 2 × 2 = 32 et 5² = 5 × 5 = 25. Donc 2⁵ est plus grand.'},
   {q:'Calcule 4 + 2 × 3².',lab:'résultat =',ans:22,why:'La puissance d’abord : 3² = 9. Puis la multiplication : 2 × 9 = 18. Enfin 4 + 18 = 22.'},
 ]},
 {n:'Les familles ℕ, ℤ et ℚ',r:'Les familles de nombres : ℕ, ℤ et ℚ',qs:[
   {q:`Quel est le plus petit ensemble qui contient ${F('−20',5)}&nbsp;?`,opts:['ℕ','ℤ','ℚ'],ans:1,why:`${F('−20',5)} = −4 : c’est un entier négatif. Il est dans ℤ (et dans ℚ), mais pas dans ℕ.`},
   {q:'Lequel de ces nombres appartient à ℕ&nbsp;?',opts:['−2',F(3,4),F(36,9),'0,5'],ans:2,why:`${F(36,9)} = 4, un nombre naturel. −2 est négatif, ${F(3,4)} et 0,5 ne sont pas entiers.`},
   {q:'Quelle affirmation est vraie&nbsp;?',opts:['Tout nombre de ℚ est dans ℤ','Tout nombre de ℤ est dans ℕ','Tout nombre de ℕ est dans ℚ','0,25 n’est pas dans ℚ'],ans:2,why:`ℕ ⊂ ℤ ⊂ ℚ : un naturel comme 5 s’écrit ${F(5,1)}. Les deux premières sont fausses (contre-exemples : ${F(1,2)} et −1), et 0,25 = ${F(1,4)} est rationnel.`},
   {q:'Le nombre −1,5 appartient…',opts:['à ℕ seulement','à ℤ mais pas à ℚ','à ℚ mais pas à ℤ','à aucun des trois'],ans:2,why:`−1,5 = ${F('−3',2)} : c’est une fraction d’entiers, donc un rationnel. Ce n’est pas un entier, donc il n’est pas dans ℤ.`},
 ]},
];
})();
