/* Déclic — examen de compétence : Ensembles */
(()=>{
EXAMS['al-ensembles']=[
 {n:'Appartenance et inclusion', r:'Appartenir ou être inclus', qs:[
   {q:'Soit <i>A</i> = {2 ; 4 ; 6}. Quelle écriture est correcte&nbsp;?', opts:['4 ⊂ <i>A</i>','{2} ∈ <i>A</i>','{4 ; 6} ⊂ <i>A</i>','<i>A</i> ⊂ {2 ; 4}'], ans:2, why:'{4 ; 6} est un ensemble dont les deux éléments sont dans A : c’est une inclusion. 4 est un élément, on écrit 4 ∈ A. Enfin 6 ∈ A mais 6 ∉ {2 ; 4}.'},
   {q:'Laquelle de ces affirmations est vraie&nbsp;?', opts:['∅ ∈ {1 ; 2}','2 ⊂ {1 ; 2}','{1 ; 2} ⊂ {1}','∅ ⊂ {1 ; 2}'], ans:3, why:'L’ensemble vide est inclus dans tout ensemble. En revanche ∅ n’est pas un élément de {1 ; 2}, et 2 est un élément, pas un ensemble : on écrit 2 ∈ {1 ; 2}.'},
   {q:'Laquelle de ces affirmations est fausse&nbsp;?', opts:['ℕ ⊂ ℤ','−3 ∈ ℕ','1/2 ∈ ℚ','ℚ ⊂ ℝ'], ans:1, why:'−3 est un entier négatif : −3 ∈ ℤ mais −3 ∉ ℕ. Les autres découlent de ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ.'},
 ]},
 {n:'Union, intersection, différence, complémentaire', r:'Quatre opérations', qs:[
   {q:'Dans <i>E</i> = {1, …, 9}, on pose <i>A</i> = {1 ; 2 ; 3 ; 5 ; 8} et <i>B</i> = {2 ; 3 ; 4 ; 7 ; 8}. Combien d’éléments a <i>A</i> ∩ <i>B</i>&nbsp;?', lab:'card(A ∩ B) =', ans:3, why:'Les éléments à la fois dans A et dans B sont 2, 3 et 8 : A ∩ B = {2 ; 3 ; 8}, de cardinal 3.'},
   {q:'Dans <i>E</i> = {1, …, 9}, on pose <i>A</i> = {1 ; 2 ; 3 ; 5 ; 8} et <i>B</i> = {2 ; 3 ; 4 ; 7 ; 8}. Que vaut <i>A</i> \\ <i>B</i>&nbsp;?', opts:['{4 ; 7}','{1 ; 5}','{2 ; 3 ; 8}','{1 ; 4 ; 5 ; 7}'], ans:1, why:'A \\ B garde les éléments de A qui ne sont pas dans B : 1 et 5. {4 ; 7} est B \\ A, et {1 ; 4 ; 5 ; 7} regroupe les deux.'},
   {q:'Dans <i>E</i> = {1, …, 9}, on pose <i>A</i> = {1 ; 2 ; 3 ; 5 ; 8} et <i>B</i> = {2 ; 3 ; 4 ; 7 ; 8}. Combien d’éléments a (<i>A</i> ∪ <i>B</i>)ᶜ&nbsp;?', lab:'card =', ans:2, why:'A ∪ B = {1 ; 2 ; 3 ; 4 ; 5 ; 7 ; 8}. Son complémentaire dans E est {6 ; 9}, de cardinal 2.'},
   {q:'Dans <i>E</i> = {1, …, 9}, on pose <i>A</i> = {1 ; 2 ; 3 ; 5 ; 8} et <i>B</i> = {2 ; 3 ; 4 ; 7 ; 8}. Combien d’éléments sont dans <i>A</i> ou dans <i>B</i>, mais pas dans les deux&nbsp;?', lab:'nombre =', ans:4, why:'On retire A ∩ B = {2 ; 3 ; 8} de A ∪ B, qui a 7 éléments : il reste {1 ; 4 ; 5 ; 7}, soit 7 − 3 = 4 éléments.'},
   {q:'Si <i>x</i> ∈ <i>A</i> ∩ <i>B</i>, que peut-on affirmer&nbsp;?', opts:['<i>x</i> ∉ <i>A</i> ∪ <i>B</i>','<i>x</i> ∈ <i>A</i> \\ <i>B</i>','<i>x</i> ∈ <i>A</i>ᶜ','<i>x</i> ∈ <i>A</i> ∪ <i>B</i>'], ans:3, why:'Le « ou » de l’union est inclusif : x est dans A, donc dans A ∪ B. Comme x ∈ B, il n’est pas dans A \\ B.'},
 ]},
 {n:'Compter avec le crible', r:'Compter une union : le principe du crible', qs:[
   {q:'Dans <i>E</i> = {1, …, 30}, combien de nombres sont multiples de 3 ou de 4&nbsp;?', lab:'card =', ans:15, why:'Multiples de 3 : 10. Multiples de 4 : 7. Multiples des deux, donc de 12 : 2 (12 et 24). Crible : 10 + 7 − 2 = 15.'},
   {q:'Dans <i>E</i> = {1, …, 50}, combien de nombres ne sont multiples ni de 2 ni de 7&nbsp;?', lab:'card =', ans:21, why:'Multiples de 2 : 25, de 7 : 7, de 14 : 3. L’union a 25 + 7 − 3 = 29 éléments, son complémentaire en a 50 − 29 = 21.'},
   {q:'Dans un groupe de 35 personnes, 20 boivent du thé, 18 du café et 6 ne boivent ni l’un ni l’autre. Combien boivent les deux&nbsp;?', lab:'personnes :', ans:9, why:'L’union compte 35 − 6 = 29 personnes. Le crible donne 29 = 20 + 18 − card(T ∩ C), donc card(T ∩ C) = 38 − 29 = 9.'},
   {q:'Dans <i>E</i> = {1, …, 60}, combien de nombres sont multiples de 3, de 4 <b>ou</b> de 5&nbsp;?', lab:'card =', ans:36, why:'Multiples de 3 : 20, de 4 : 15, de 5 : 12. De 12 : 5, de 15 : 4, de 20 : 3. De 60 : 1. Crible : 20 + 15 + 12 − 5 − 4 − 3 + 1 = 36.'},
   {q:'On sait que card <i>A</i> = 25, card(<i>A</i> ∩ <i>B</i>) = 8, card(<i>A</i> ∩ <i>C</i>) = 6 et card(<i>A</i> ∩ <i>B</i> ∩ <i>C</i>) = 3. Combien d’éléments sont dans <i>A</i> seulement (ni dans <i>B</i>, ni dans <i>C</i>)&nbsp;?', lab:'card =', ans:14, why:'Les éléments de A qui touchent B ou C sont au nombre de 8 + 6 − 3 = 11 (on ne retire pas deux fois le centre). Il reste 25 − 11 = 14.'},
   {q:'Quand a-t-on card(<i>A</i> ∪ <i>B</i>) = card <i>A</i> + card <i>B</i>&nbsp;?', opts:['Toujours','Quand <i>A</i> ⊂ <i>B</i>','Quand <i>A</i> ∩ <i>B</i> = ∅','Quand card <i>A</i> = card <i>B</i>'], ans:2, why:'Le crible donne card(A ∪ B) = card A + card B − card(A ∩ B). Le terme retiré est nul exactement quand A et B sont disjoints.'},
 ]},
 {n:'Produit cartésien', r:'Le produit cartésien', qs:[
   {q:'Soit <i>A</i> = {<i>a</i> ; <i>b</i> ; <i>c</i> ; <i>d</i>} et <i>B</i> = {1 ; 2 ; 3}. Combien d’éléments a <i>A</i> × <i>B</i>&nbsp;?', lab:'card =', ans:12, why:'card(A × B) = card A · card B = 4 · 3 = 12 couples.'},
   {q:'Soit <i>A</i> = {1 ; 2} et <i>B</i> = {<i>x</i> ; <i>y</i>}. Lequel est un élément de <i>B</i> × <i>A</i>&nbsp;?', opts:['(1 ; <i>x</i>)','(<i>y</i> ; 2)','{<i>x</i> ; 1}','(<i>x</i> ; <i>y</i>)'], ans:1, why:'Dans B × A, la 1re composante est dans B et la 2e dans A : (y ; 2) convient. (1 ; x) est dans A × B, et {x ; 1} n’est pas un couple.'},
   {q:'Soit <i>A</i> = {0 ; 1 ; 2}. Combien de couples (<i>a</i> ; <i>b</i>) ∈ <i>A</i> × <i>A</i> vérifient <i>a</i> < <i>b</i>&nbsp;?', lab:'couples :', ans:3, why:'A × A a 9 couples. Ceux avec a < b sont (0 ; 1), (0 ; 2) et (1 ; 2) : 3 couples.'},
 ]},
 {n:'Parties d’un ensemble', r:'Lister les parties d’un ensemble', qs:[
   {q:'Un ensemble <i>A</i> a 5 éléments. Combien a-t-il de parties&nbsp;?', lab:'card 𝒫(A) =', ans:32, why:'2 choix par élément (dedans ou non) : 2⁵ = 32 parties, ∅ et A compris.'},
   {q:'Combien de parties de {<i>a</i> ; <i>b</i> ; <i>c</i> ; <i>d</i>} ont exactement 2 éléments&nbsp;?', lab:'parties :', ans:6, why:'On les liste : {a ; b}, {a ; c}, {a ; d}, {b ; c}, {b ; d}, {c ; d}. Il y en a 6.'},
   {q:'Combien de parties de {1 ; 2 ; 3 ; 4 ; 5} ne contiennent ni 1 ni 2&nbsp;?', lab:'parties :', ans:8, why:'1 et 2 sont exclus ; il reste 2 choix pour chacun des éléments 3, 4 et 5 : 2³ = 8.'},
   {q:'Soit <i>A</i> = {1 ; 2}. Quelle affirmation est vraie&nbsp;?', opts:['1 ∈ 𝒫(<i>A</i>)','{1} ⊂ 𝒫(<i>A</i>)','𝒫(<i>A</i>) a 3 éléments','{1} ∈ 𝒫(<i>A</i>)'], ans:3, why:'Les éléments de 𝒫(A) sont des parties de A : ∅, {1}, {2}, {1 ; 2}. Donc {1} ∈ 𝒫(A), et 𝒫(A) a 2² = 4 éléments. 1 n’est pas une partie, donc {1} ⊄ 𝒫(A).'},
 ]},
 {n:'De Morgan et simplifications', r:'Simplifier une expression d’ensembles', qs:[
   {q:'À quoi est égal (<i>A</i>ᶜ ∩ <i>B</i>)ᶜ&nbsp;?', opts:['<i>A</i> ∩ <i>B</i>ᶜ','<i>A</i> ∪ <i>B</i>ᶜ','<i>A</i>ᶜ ∪ <i>B</i>ᶜ','<i>A</i> ∪ <i>B</i>'], ans:1, why:'De Morgan : (Aᶜ ∩ B)ᶜ = (Aᶜ)ᶜ ∪ Bᶜ = A ∪ Bᶜ.'},
   {q:'À quoi est égal (<i>A</i> ∩ <i>B</i>) ∪ (<i>A</i> ∩ <i>B</i>ᶜ)&nbsp;?', opts:['<i>B</i>','<i>E</i>','∅','<i>A</i>'], ans:3, why:'On met A en facteur : A ∩ (B ∪ Bᶜ) = A ∩ E = A.'},
   {q:'À quoi est égal (<i>A</i> ∪ <i>B</i>)ᶜ ∪ <i>A</i>&nbsp;?', opts:['<i>E</i>','<i>A</i> ∪ <i>B</i>ᶜ','<i>B</i>ᶜ','<i>A</i> ∩ <i>B</i>ᶜ'], ans:1, why:'(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ. Puis (Aᶜ ∩ Bᶜ) ∪ A = (Aᶜ ∪ A) ∩ (Bᶜ ∪ A) = E ∩ (A ∪ Bᶜ) = A ∪ Bᶜ.'},
   {q:'À quoi est égal (<i>A</i>ᶜ ∪ <i>B</i>ᶜ)ᶜ ∩ <i>A</i>&nbsp;?', opts:['<i>A</i>','∅','<i>A</i>ᶜ ∩ <i>B</i>','<i>A</i> ∩ <i>B</i>'], ans:3, why:'De Morgan : (Aᶜ ∪ Bᶜ)ᶜ = A ∩ B. Puis (A ∩ B) ∩ A = A ∩ B.'},
   {q:'À quoi est égal (<i>A</i> ∩ <i>B</i>)ᶜ ∩ <i>A</i>&nbsp;?', opts:['<i>A</i> \\ <i>B</i>','<i>B</i> \\ <i>A</i>','∅','<i>A</i>ᶜ ∪ <i>B</i>ᶜ'], ans:0, why:'(A ∩ B)ᶜ ∩ A = (Aᶜ ∪ Bᶜ) ∩ A = (Aᶜ ∩ A) ∪ (Bᶜ ∩ A) = ∅ ∪ (A ∩ Bᶜ) = A \\ B.'},
   {q:'Dans un ensemble <i>E</i> de 40 éléments, card <i>A</i> = 15, card <i>B</i> = 12 et card(<i>A</i> ∩ <i>B</i>) = 5. Combien d’éléments a <i>A</i>ᶜ ∩ <i>B</i>ᶜ&nbsp;?', lab:'card =', ans:18, why:'Par De Morgan, Aᶜ ∩ Bᶜ = (A ∪ B)ᶜ. card(A ∪ B) = 15 + 12 − 5 = 22, donc 40 − 22 = 18.'},
 ]},
 {n:'Démontrer par double inclusion', r:'Prouver une égalité d’ensembles par double inclusion', qs:[
   {q:'On veut démontrer <i>A</i> ∩ <i>B</i> ⊂ <i>A</i> ∪ <i>B</i>. Comment commence la preuve&nbsp;?', opts:['Soit <i>x</i> ∈ <i>A</i> ∪ <i>B</i>','Soit <i>x</i> ∈ <i>A</i> ∩ <i>B</i> : alors <i>x</i> ∈ <i>A</i>, donc <i>x</i> ∈ <i>A</i> ∪ <i>B</i>','On prend <i>A</i> = {1} et <i>B</i> = {1 ; 2}','On compare les cardinaux'], ans:1, why:'Pour prouver X ⊂ Y, on part d’un élément quelconque de X = A ∩ B et on montre qu’il est dans Y. Un exemple ou des cardinaux ne prouvent pas une inclusion.'},
   {q:'Comment montrer que l’inclusion <i>A</i> ∪ <i>B</i> ⊂ <i>A</i> ∩ <i>B</i> est fausse en général&nbsp;?', opts:['En trouvant un exemple où elle est vraie','En comparant les cardinaux','En dessinant un diagramme où elle est vraie','Avec un contre-exemple : <i>A</i> = {1}, <i>B</i> = {2}, où 1 ∈ <i>A</i> ∪ <i>B</i> mais 1 ∉ <i>A</i> ∩ <i>B</i>'], ans:3, why:'Pour réfuter une inclusion X ⊂ Y, un seul élément de X qui n’est pas dans Y suffit. Un exemple où elle marche ne prouve rien.'},
   {q:'Dans une preuve, on écrit « soit <i>x</i> ∈ <i>A</i> \\ (<i>B</i> ∪ <i>C</i>) ». Quelle traduction est correcte&nbsp;?', opts:['<i>x</i> ∈ <i>A</i> et (<i>x</i> ∉ <i>B</i> ou <i>x</i> ∉ <i>C</i>)','<i>x</i> ∈ <i>A</i> et <i>x</i> ∉ <i>B</i> et <i>x</i> ∉ <i>C</i>','<i>x</i> ∉ <i>A</i> et <i>x</i> ∈ <i>B</i> ∪ <i>C</i>','<i>x</i> ∈ <i>A</i> ou <i>x</i> ∉ <i>B</i> ∪ <i>C</i>'], ans:1, why:'x ∈ A et x ∉ B ∪ C. Ne pas être dans l’union, c’est n’être ni dans B ni dans C (De Morgan) : x ∉ B et x ∉ C.'},
   {q:'Dans une preuve, on sait que <i>x</i> ∈ <i>B</i> ∪ <i>C</i>. Comment exploiter cette hypothèse&nbsp;?', opts:['Par une disjonction de cas : <i>x</i> ∈ <i>B</i>, ou <i>x</i> ∈ <i>C</i>','On en déduit <i>x</i> ∈ <i>B</i> et <i>x</i> ∈ <i>C</i>','On en déduit <i>x</i> ∈ <i>B</i> ∩ <i>C</i>','On ne peut rien en tirer'], ans:0, why:'Un « ou » dans l’hypothèse se traite en séparant les cas : on raisonne d’abord avec x ∈ B, puis avec x ∈ C. Rien ne dit que x est dans les deux.'},
 ]},
];
})();
