/* Déclic — examen de compétence : Algèbre des parties d’un ensemble */
(()=>{
EXAMS['gred-parties']=[
 {n:'Union, intersection, complémentaire, différence', r:'Combiner deux parties', qs:[
   {q:'Dans E = {1, …, 10}, A = {2 ; 3 ; 5 ; 7} et B = {1 ; 3 ; 5 ; 7 ; 9}. Combien d’éléments a A ∪ B ?', lab:'card =', ans:6, why:'A ∪ B contient les éléments qui sont dans A ou dans B : {1 ; 2 ; 3 ; 5 ; 7 ; 9}, soit 6 éléments (3, 5, 7 ne comptent qu’une fois).'},
   {q:'Dans E = {1, …, 10}, A = {2 ; 3 ; 5 ; 7} et B = {1 ; 3 ; 5 ; 7 ; 9}. Que vaut A ∩ B ?', opts:['{3 ; 5 ; 7}','{2}','{1 ; 2 ; 3 ; 5 ; 7 ; 9}','{1 ; 9}'], ans:0, why:'A ∩ B contient les éléments à la fois dans A et dans B : 3, 5 et 7.'},
   {q:'Dans E = {1, …, 10}, A = {2 ; 3 ; 5 ; 7} et B = {1 ; 3 ; 5 ; 7 ; 9}. Combien d’éléments a (A ∪ B)ᶜ ?', lab:'card =', ans:4, why:'A ∪ B = {1 ; 2 ; 3 ; 5 ; 7 ; 9} a 6 éléments ; son complémentaire dans E est {4 ; 6 ; 8 ; 10}, soit 10 − 6 = 4.'},
   {q:'Dans E = {1, …, 10}, A = {2 ; 3 ; 5 ; 7} et B = {1 ; 3 ; 5 ; 7 ; 9}. Que vaut B ∖ A ?', opts:['{2}','{3 ; 5 ; 7}','{1 ; 9}','{1 ; 2 ; 9}'], ans:2, why:'B ∖ A = B ∩ Aᶜ : les éléments de B qui ne sont pas dans A, ici 1 et 9. Attention, A ∖ B = {2} est différent.'},
   {q:'Dans un ensemble fini, card A = 15, card B = 11 et card(A ∩ B) = 6. Combien d’éléments a A ∪ B ?', lab:'card =', ans:20, why:'A ∪ B se découpe en trois morceaux disjoints : A ∖ B (15 − 6 = 9), A ∩ B (6) et B ∖ A (11 − 6 = 5). Total 9 + 6 + 5 = 20.'},
 ]},
 {n:'Différence symétrique', r:'Différence et différence symétrique', qs:[
   {q:'Dans E = {1, …, 12}, A = {1, …, 7} et B = {5, …, 12}. Combien d’éléments a A Δ B ?', lab:'card =', ans:9, why:'A ∖ B = {1 ; 2 ; 3 ; 4} et B ∖ A = {8 ; … ; 12} (5 éléments). A Δ B est leur union : 4 + 5 = 9.'},
   {q:'Dans un ensemble fini, card A = 20, card B = 15 et card(A ∩ B) = 6. Combien d’éléments a A Δ B ?', lab:'card =', ans:23, why:'card(A Δ B) = card A + card B − 2 card(A ∩ B) = 20 + 15 − 12 = 23 : on retire deux fois la partie commune, comptée dans A et dans B.'},
   {q:'Dans un ensemble fini, card A = 8, card B = 6 et card(A Δ B) = 10. Combien d’éléments a A ∩ B ?', lab:'card =', ans:2, why:'8 + 6 − 2 card(A ∩ B) = 10 donne 2 card(A ∩ B) = 4, donc card(A ∩ B) = 2.'},
   {q:'Laquelle de ces expressions est égale à A Δ B pour toutes parties A, B ?', opts:['(A ∖ B) ∩ (B ∖ A)','A ∪ B','(A ∪ B) ∖ (A ∩ B)','(A ∩ B)ᶜ'], ans:2, why:'A Δ B contient les éléments d’un seul des deux ensembles : ceux de A ∪ B moins ceux de A ∩ B. (A ∖ B) ∩ (B ∖ A) est toujours vide, et (A ∩ B)ᶜ contient aussi les éléments hors de A ∪ B.'},
   {q:'On sait que A ⊂ B. À quoi est égal A Δ B ?', opts:['A','∅','B','B ∖ A'], ans:3, why:'A ∖ B = ∅ car A ⊂ B, donc A Δ B = (A ∖ B) ∪ (B ∖ A) = B ∖ A.'},
 ]},
 {n:'La table d’appartenance', r:'Prouver une égalité par une table d’appartenance', qs:[
   {q:'Combien de lignes compte la table d’appartenance d’une identité entre expressions formées avec quatre parties A, B, C, D ?', lab:'lignes =', ans:16, why:'Un élément est dans chaque partie ou non, indépendamment : 2⁴ = 16 situations.'},
   {q:'Une seule de ces égalités est fausse en général. Laquelle ?', opts:['A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)','A ∖ (B ∪ C) = (A ∖ B) ∖ C','A ∖ (B ∖ C) = (A ∖ B) ∖ C','(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ'], ans:2, why:'Ligne A = 1, B = 1, C = 1 : B ∖ C vaut 0, donc x ∈ A ∖ (B ∖ C) ; mais x ∈ B, donc x ∉ (A ∖ B) ∖ C. Les autres sont la distributivité, A ∖ (B ∪ C) = A ∩ Bᶜ ∩ Cᶜ et De Morgan.'},
   {q:'On compare A ∖ (B ∖ C) et (A ∖ B) ∖ C par une table d’appartenance. Sur combien des 8 lignes les deux colonnes diffèrent-elles ?', lab:'lignes =', ans:2, why:'A ∖ (B ∖ C) vaut 1 quand A = 1 et (B = 0 ou C = 1) ; (A ∖ B) ∖ C vaut 1 seulement sur 100. Elles diffèrent sur 101 et 111 : 2 lignes.'},
   {q:'Dans la table d’appartenance de (A ∪ B) ∩ Cᶜ, sur combien des 8 lignes la colonne vaut-elle 1 ?', lab:'lignes =', ans:3, why:'Il faut C = 0 et (A = 1 ou B = 1) : lignes 110, 100, 010. Total 3.'},
   {q:'Quelle ligne (A, B, C) de la table montre que A ∪ (B ∩ C) ≠ (A ∪ B) ∩ C ?', opts:['1 1 1','0 1 1','1 0 0','0 0 0'], ans:2, why:'Sur 100 : x ∈ A, donc x est dans le membre de gauche ; mais x ∉ C, donc pas dans le membre de droite. Sur les trois autres lignes, les deux membres ont la même valeur.'},
 ]},
 {n:'Prouver par éléments', r:'Prouver par éléments : la chaîne d’équivalences', qs:[
   {q:'Comment traduire « <i>x</i> ∈ A ∖ (B ∩ C) » en connecteurs logiques ?', opts:['<i>x</i> ∈ A et <i>x</i> ∉ B et <i>x</i> ∉ C','<i>x</i> ∈ A et (<i>x</i> ∉ B ou <i>x</i> ∉ C)','<i>x</i> ∈ A ou (<i>x</i> ∉ B et <i>x</i> ∉ C)','<i>x</i> ∉ A ou (<i>x</i> ∈ B et <i>x</i> ∈ C)'], ans:1, why:'∖ se traduit par « et non » : <i>x</i> ∈ A et non (<i>x</i> ∈ B et <i>x</i> ∈ C). De Morgan transforme la négation du « et » en « ou ».'},
   {q:'On démontre A ∩ (A ∪ B) = A. On a écrit : <i>x</i> ∈ A ∩ (A ∪ B) ⇔ <i>x</i> ∈ A et (<i>x</i> ∈ A ou <i>x</i> ∈ B). Quelle suite est correcte ?', opts:['⇔ <i>x</i> ∈ A ou <i>x</i> ∈ B, donc <i>x</i> ∈ A ∪ B','⇔ <i>x</i> ∈ B, car <i>x</i> ∈ A est déjà acquis','⇔ <i>x</i> ∈ A : si <i>x</i> ∈ A, la parenthèse est vraie ; et le « et » exige <i>x</i> ∈ A','⇔ <i>x</i> ∈ A et <i>x</i> ∈ B, donc <i>x</i> ∈ A ∩ B'], ans:2, why:'Quand <i>x</i> ∈ A est vraie, « <i>x</i> ∈ A ou <i>x</i> ∈ B » l’est aussi : la proposition se réduit à <i>x</i> ∈ A. C’est l’absorption.'},
   {q:'Dans une preuve par éléments, une étape de la chaîne n’est qu’une implication ⇒, toutes les autres sont des équivalences. Qu’a-t-on prouvé ?', opts:['L’égalité des deux ensembles','Seulement l’inclusion du membre de gauche dans le membre de droite','Seulement l’inclusion du membre de droite dans le membre de gauche','Rien du tout'], ans:1, why:'La chaîne donne « <i>x</i> ∈ gauche ⇒ <i>x</i> ∈ droite », c’est-à-dire gauche ⊂ droite. L’autre inclusion doit être prouvée séparément.'},
 ]},
 {n:'Simplifier une expression', r:'Simplifier avec les règles', qs:[
   {q:'À quoi est égal (A ∪ B) ∩ (A ∪ Bᶜ) ?', opts:['A','E','A ∪ B','A ∩ B'], ans:0, why:'Distributivité de ∪ sur ∩ : (A ∪ B) ∩ (A ∪ Bᶜ) = A ∪ (B ∩ Bᶜ) = A ∪ ∅ = A.'},
   {q:'À quoi est égal A ∩ (Aᶜ ∪ B) ?', opts:['B','A ∖ B','A ∩ B','∅'], ans:2, why:'A ∩ (Aᶜ ∪ B) = (A ∩ Aᶜ) ∪ (A ∩ B) = ∅ ∪ (A ∩ B) = A ∩ B.'},
   {q:'À quoi est égal (A ∖ B) ∪ (A ∩ B) ?', opts:['A ∪ B','A','B','A Δ B'], ans:1, why:'(A ∩ Bᶜ) ∪ (A ∩ B) = A ∩ (Bᶜ ∪ B) = A ∩ E = A : on factorise A.'},
   {q:'À quoi est égal (Aᶜ ∪ Bᶜ)ᶜ ?', opts:['A ∪ B','Aᶜ ∩ Bᶜ','A ∩ B','(A ∩ B)ᶜ'], ans:2, why:'De Morgan : (Aᶜ ∪ Bᶜ)ᶜ = (Aᶜ)ᶜ ∩ (Bᶜ)ᶜ = A ∩ B.'},
   {q:'Un élève affirme : « pour toutes parties A, B, (A ∖ B) ∪ B = A ». Quel choix le réfute ?', opts:['A = {1 ; 2}, B = {2}','A = ∅, B = {1}','A = {1}, B = ∅','A = B = {1}'], ans:1, why:'En général (A ∩ Bᶜ) ∪ B = (A ∪ B) ∩ (Bᶜ ∪ B) = A ∪ B, qui vaut A seulement si B ⊂ A. Avec A = ∅, B = {1} : on obtient {1} ≠ ∅. Dans les trois autres choix, B ⊂ A.'},
 ]},
 {n:'Les propriétés de Δ', r:'La différence symétrique, une loi remarquable', qs:[
   {q:'Dans E = {1, …, 10}, A = {1 ; 2 ; 3}, B = {2 ; 3 ; 4 ; 5} et C = {3 ; 5 ; 7 ; 9}. Combien d’éléments a A Δ B Δ C ?', lab:'card =', ans:5, why:'On garde les éléments présents dans un nombre impair d’ensembles : 1 (A), 3 (A, B, C), 4 (B), 7 (C), 9 (C). 2 et 5 sont dans deux ensembles. Total 5.'},
   {q:'Soit A = {1 ; 2 ; 3} et B = {2 ; 5}. Quelle partie X vérifie A Δ X = B ?', opts:['{5}','{1 ; 3 ; 5}','{1 ; 3}','{1 ; 2 ; 3 ; 5}'], ans:1, why:'On applique A Δ des deux côtés : A Δ (A Δ X) = (A Δ A) Δ X = ∅ Δ X = X, donc X = A Δ B = {1 ; 3 ; 5}. Contrôle : {1 ; 2 ; 3} Δ {1 ; 3 ; 5} = {2 ; 5}.'},
   {q:'Pour une partie A de E, à quoi est égal A Δ E ?', opts:['A','∅','E','Aᶜ'], ans:3, why:'A Δ E = (A ∖ E) ∪ (E ∖ A) = ∅ ∪ Aᶜ = Aᶜ.'},
 ]},
 {n:'Familles de parties', r:'Calculer l’union ou l’intersection d’une famille', qs:[
   {q:'Que vaut ⋃<sub><i>n</i> ≥ 1</sub> [0 ; 2 − 1/<i>n</i>] ?', opts:['[0 ; 2]','[0 ; 1]','[0 ; 2[','{0}'], ans:2, why:'2 n’est dans aucun intervalle, car 2 − 1/<i>n</i> &lt; 2. Si 0 ≤ <i>x</i> &lt; 2, on choisit <i>n</i> avec 1/<i>n</i> &lt; 2 − <i>x</i> : alors <i>x</i> ≤ 2 − 1/<i>n</i>. L’union est [0 ; 2[.'},
   {q:'Que vaut ⋂<sub><i>n</i> ≥ 1</sub> [0 ; 1 + 1/<i>n</i>] ?', opts:['[0 ; 1]','[0 ; 1[','[0 ; 2]','{0}'], ans:0, why:'Tout <i>x</i> de [0 ; 1] est dans chaque intervalle. Si <i>x</i> &gt; 1, il existe <i>n</i> avec 1/<i>n</i> &lt; <i>x</i> − 1 : <i>x</i> manque à cet intervalle. Et 1 ≤ 1 + 1/<i>n</i> pour tout <i>n</i>. L’intersection est [0 ; 1].'},
   {q:'Que vaut ⋂<sub><i>n</i> ≥ 1</sub> ]0 ; 1/<i>n</i>[ ?', opts:['{0}','∅',']0 ; 1[','[0 ; 1['], ans:1, why:'0 n’est dans aucun intervalle (bornes ouvertes). Si <i>x</i> &gt; 0, il existe <i>n</i> avec 1/<i>n</i> &lt; <i>x</i>, et <i>x</i> manque à ]0 ; 1/<i>n</i>[. Aucun réel n’est dans tous : l’intersection est vide.'},
   {q:'Pour <i>n</i> ≥ 1, on pose D<sub><i>n</i></sub> = {<i>n</i> ; <i>n</i> + 1 ; … ; 2<i>n</i>}. Combien d’éléments a D₄ ∩ D₅ ∩ D₆ ?', lab:'card =', ans:3, why:'D₄ = {4, …, 8}, D₅ = {5, …, 10}, D₆ = {6, …, 12}. Il faut être ≥ 6 et ≤ 8 : {6 ; 7 ; 8}, soit 3 éléments.'},
   {q:'Dans ℝ, que vaut le complémentaire de ⋃<sub><i>n</i> ≥ 1</sub> [1/<i>n</i> ; <i>n</i>] ?', opts:['∅','{0}',']−∞ ; 0[',']−∞ ; 0]'], ans:3, why:'L’union vaut ]0 ; +∞[ : un réel <i>x</i> &gt; 0 vérifie 1/<i>n</i> ≤ <i>x</i> ≤ <i>n</i> dès que <i>n</i> est assez grand, et aucun réel ≤ 0 n’y est. Son complémentaire, ⋂ des complémentaires par De Morgan, est ]−∞ ; 0].'},
 ]},
];
})();
