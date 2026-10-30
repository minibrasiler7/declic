/* Déclic — examen de compétence : Limites et continuité */
(()=>{
EXAMS['limites']=[
 {n:'Preuve ε–δ pour une fonction affine', r:'Écrire une preuve ε–δ', qs:[
   {q:'On prouve que 5x + 2 → 12 quand x → 2. Pour ε = 0,1, quel est le plus grand δ qui convient ?', lab:'δ =', ans:0.02, tol:0.0001, why:'|5x + 2 − 12| = |5x − 10| = 5|x − 2|. Il faut 5δ ≤ ε, donc δ = ε/5 = 0,1/5 = 0,02.'},
   {q:'On prouve que −4x + 1 → −11 quand x → 3. Pour ε = 0,2, quel est le plus grand δ qui convient ?', lab:'δ =', ans:0.05, tol:0.0001, why:'|−4x + 1 + 11| = |−4x + 12| = 4|x − 3|. Il faut 4δ ≤ ε, donc δ = 0,2/4 = 0,05.'},
   {q:'On prouve que x/2 + 1 → 3 quand x → 4. Pour ε = 0,3, quel est le plus grand δ qui convient ?', lab:'δ =', ans:0.6, tol:0.0001, why:'|x/2 + 1 − 3| = |x/2 − 2| = |x − 4|/2. Il faut δ/2 ≤ ε, donc δ = 2ε = 0,6. Ici δ est plus grand que ε, car la pente est plus petite que 1.'},
   {q:'On prouve que 10 − 2x → 4 quand x → 3. Pour ε = 0,8, quel est le plus grand δ qui convient ?', lab:'δ =', ans:0.4, tol:0.0001, why:'|10 − 2x − 4| = |6 − 2x| = 2|x − 3|. Il faut 2δ ≤ ε, donc δ = 0,4.'},
   {q:'Si |x − 1| < 0,1, quelle est la plus grande valeur possible de |3x − 3| ?', ans:0.3, tol:0.0001, why:'|3x − 3| = 3|x − 1| < 3 · 0,1 = 0,3. Avec δ = 0,1, la tolérance garantie est ε = 0,3.'},
   {q:'Pour prouver que 7x − 3 → 4 quand x → 1, quel δ choisir pour un ε > 0 donné ?', opts:['δ = 7ε','δ = ε − 7','δ = ε/3','δ = ε/7'], ans:3, why:'|7x − 3 − 4| = |7x − 7| = 7|x − 1|. Pour que 7|x − 1| < ε, il suffit que |x − 1| < ε/7.'},
   {q:'Pour prouver que 3x → 6 quand x → 2, un élève écrit : « Soit ε > 0. Posons δ = ε/x. » Qu’est-ce qui ne va pas ?', opts:['Rien, la preuve est correcte','δ ne doit pas dépendre de x : il ne peut dépendre que de ε','δ doit être plus grand que ε','Il fallait poser δ = 3ε'], ans:1, why:'δ est fixé avant de prendre x dans la marge : il peut dépendre de ε, jamais de x. Ici |3x − 6| = 3|x − 2|, et δ = ε/3 convient.'},
 ]},
 {n:'Lever une forme 0/0', r:'Lever une forme 0/0', qs:[
   {q:'Calcule la limite de (x² − 16)/(x − 4) quand x → 4.', lab:'limite =', ans:8, why:'(x² − 16)/(x − 4) = (x − 4)(x + 4)/(x − 4) = x + 4 → 8.'},
   {q:'Calcule la limite de (x² − 5x + 6)/(x − 2) quand x → 2.', lab:'limite =', ans:-1, why:'x² − 5x + 6 = (x − 2)(x − 3). Après simplification par x − 2 : x − 3 → 2 − 3 = −1.'},
   {q:'Calcule la limite de (x² + x − 6)/(x² − 4) quand x → 2.', lab:'limite =', ans:1.25, tol:0.001, show:'5/4', why:'(x − 2)(x + 3)/((x − 2)(x + 2)) = (x + 3)/(x + 2) → 5/4 = 1,25.'},
   {q:'Calcule la limite de (x² − 9)/(x² − 3x) quand x → 3.', lab:'limite =', ans:2, why:'(x − 3)(x + 3)/(x(x − 3)) = (x + 3)/x → 6/3 = 2.'},
   {q:'Calcule la limite de (x³ − 1)/(x − 1) quand x → 1.', lab:'limite =', ans:3, why:'x³ − 1 = (x − 1)(x² + x + 1). Après simplification : x² + x + 1 → 1 + 1 + 1 = 3.'},
   {q:'Calcule la limite de sin(7x)/x quand x → 0.', lab:'limite =', ans:7, why:'sin(7x)/x = 7 · sin(7x)/(7x), et sin(7x)/(7x) → 1. La limite vaut 7.'},
   {q:'Calcule la limite de sin(6x)/(4x) quand x → 0.', lab:'limite =', ans:1.5, tol:0.001, show:'3/2', why:'sin(6x)/(4x) = (6/4) · sin(6x)/(6x) → 1,5 · 1 = 1,5.'},
   {q:'Que vaut la limite de (x² − 1)/(x + 1) quand x → 1 ?', opts:['C’est une forme 0/0, il faut factoriser','2','0 : en x = 1, on obtient 0/2, il n’y a pas de forme indéterminée','1'], ans:2, why:'En x = 1 : (1 − 1)/(1 + 1) = 0/2 = 0. Le dénominateur ne s’annule pas : on remplace directement. On ne factorise que devant un vrai 0/0.'},
 ]},
 {n:'Continuité et valeurs intermédiaires', r:'Prolonger par continuité, valeurs intermédiaires', qs:[
   {q:'f(x) = (x² − 25)/(x + 5) n’est pas définie en −5. Quelle valeur f(−5) faut-il choisir pour prolonger f par continuité ?', lab:'f(−5) =', ans:-10, why:'(x − 5)(x + 5)/(x + 5) = x − 5 → −10 quand x → −5. On pose f(−5) = −10.'},
   {q:'f(x) = (x² − 3x)/x n’est pas définie en 0. Quelle valeur f(0) la prolonge par continuité ?', lab:'f(0) =', ans:-3, why:'x(x − 3)/x = x − 3 → −3. On pose f(0) = −3.'},
   {q:'f(x) = sin(x/2)/x n’est pas définie en 0. Quelle valeur f(0) la prolonge par continuité ?', lab:'f(0) =', ans:0.5, tol:0.001, show:'1/2', why:'sin(x/2)/x = ½ · sin(x/2)/(x/2) → ½ · 1 = ½.'},
   {q:'f vaut x + a pour x < 1 et 3x pour x ≥ 1. Pour quelle valeur de a f est-elle continue en 1 ?', lab:'a =', ans:2, why:'Limite à droite : 3·1 = 3 = f(1). Limite à gauche : 1 + a. Il faut 1 + a = 3, donc a = 2.'},
   {q:'Peut-on prolonger h(x) = |x + 2|/(x + 2) par continuité en −2 ?', opts:['Oui, avec h(−2) = 0','Oui, avec h(−2) = 1','Non, car h n’est pas définie en −2','Non : la limite à droite vaut 1 et la limite à gauche −1'], ans:3, why:'Pour x > −2, |x + 2| = x + 2 et h = 1. Pour x < −2, h = −1. Les limites à gauche et à droite diffèrent : pas de limite, donc pas de prolongement.'},
   {q:'Sur quel intervalle le théorème des valeurs intermédiaires garantit-il une solution de x³ + 2x − 5 = 0 ?', opts:['[0 ; 1]','[1 ; 2]','[−1 ; 0]','[2 ; 3]'], ans:1, why:'g(x) = x³ + 2x − 5 est continue. g(1) = −2 < 0 et g(2) = 7 > 0 : changement de signe sur [1 ; 2]. Ailleurs : g(−1) = −8, g(0) = −5, g(3) = 28, pas de changement de signe.'},
   {q:'f(x) = 1/x vérifie f(−1) = −1 et f(1) = 1, mais ne s’annule jamais. Pourquoi le théorème des valeurs intermédiaires ne s’applique-t-il pas sur [−1 ; 1] ?', opts:['Parce que f(−1) et f(1) ont le même signe','Parce que f n’est pas continue sur [−1 ; 1] : elle n’est pas définie en 0','Parce que f est décroissante','Le théorème s’applique : f s’annule en 0'], ans:1, why:'Le théorème exige f continue sur tout [a ; b]. 1/x n’est pas définie en 0 et saute de −∞ à +∞ : il n’y a aucune garantie.'},
   {q:'f est continue sur [1 ; 4], avec f(1) = 2 et f(4) = 8. Prend-elle forcément la valeur 5 ?', opts:['Oui : f − 5 est continue et passe de −3 à 3, donc elle s’annule','Non, seulement si f est croissante','Oui, exactement en x = 2,5','Non, le théorème ne parle que de 0'], ans:0, why:'g = f − 5 est continue, g(1) = −3 < 0 et g(4) = 3 > 0 : g s’annule entre 1 et 4, donc f y vaut 5. Rien ne dit où exactement.'},
 ]},
 {n:'ε–δ avec un facteur à borner', r:'ε–δ quand un facteur varie', qs:[
   {q:'Pour prouver que x² → 16 quand x → 4, on écrit |x² − 16| = |x − 4| · |x + 4|. Si |x − 4| ≤ 1, quelle est la plus grande valeur possible de |x + 4| ?', lab:'C =', ans:9, why:'|x − 4| ≤ 1 donne 3 ≤ x ≤ 5, donc 7 ≤ x + 4 ≤ 9 et |x + 4| ≤ 9.'},
   {q:'Pour x² → 16 quand x → 4, on pose δ = min(1 ; ε/9). Combien vaut δ pour ε = 0,45 ?', lab:'δ =', ans:0.05, tol:0.0001, why:'ε/9 = 0,05 < 1, donc δ = 0,05. Alors |x² − 16| ≤ 9 · |x − 4| < 9 · 0,05 = 0,45.'},
   {q:'Pour x² → 16 quand x → 4, on pose δ = min(1 ; ε/9). Combien vaut δ pour ε = 18 ?', lab:'δ =', ans:1, tol:0.0001, why:'ε/9 = 2 > 1, donc δ = min(1 ; 2) = 1. Le 1 garde la borne |x + 4| ≤ 9 valable.'},
   {q:'Pour prouver que x² → 1 quand x → −1, on écrit |x² − 1| = |x + 1| · |x − 1|. Si |x + 1| ≤ 1, quelle est la plus grande valeur possible de |x − 1| ?', lab:'C =', ans:3, why:'|x + 1| ≤ 1 donne −2 ≤ x ≤ 0, donc −3 ≤ x − 1 ≤ −1 et |x − 1| ≤ 3.'},
   {q:'Pour prouver que x² + x → 6 quand x → 2, on écrit |x² + x − 6| = |x − 2| · |x + 3| et on borne avec |x − 2| ≤ 1. Pour ε = 0,3, combien vaut δ = min(1 ; ε/C) ?', lab:'δ =', ans:0.05, tol:0.0001, why:'|x − 2| ≤ 1 donne 1 ≤ x ≤ 3, donc |x + 3| ≤ 6 = C. δ = min(1 ; 0,3/6) = 0,05.'},
   {q:'Pour prouver que 1/x → ½ quand x → 2, on écrit |1/x − ½| = |x − 2| / (2|x|). Si |x − 2| ≤ 1, quelle est la plus grande valeur possible de 1/(2|x|) ?', ans:0.5, tol:0.001, show:'1/2', why:'|x − 2| ≤ 1 donne 1 ≤ x ≤ 3. 1/(2x) est le plus grand quand x est le plus petit : 1/(2·1) = ½.'},
   {q:'Pour x² → 16 quand x → 4, un élève pose δ = ε/9 sans le min. Que se passe-t-il ?', opts:['Rien : δ = ε/9 marche toujours','Pour un grand ε, x peut sortir de [3 ; 5] et la borne |x + 4| ≤ 9 devient fausse','δ devient négatif','La preuve échoue pour les petits ε'], ans:1, why:'Avec ε = 90, δ = 10 : x = 13 donne |x² − 16| = 153 > 90. La borne C = 9 ne vaut que si |x − 4| ≤ 1, d’où le min.'},
 ]},
];
})();
