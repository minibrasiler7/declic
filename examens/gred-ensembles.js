/* Déclic — examen de compétence : Ensembles et éléments */
(()=>{
EXAMS['gred-ensembles']=[
 {n:'Extension et compréhension', r:'Passer d’une description à l’autre', qs:[
   {q:'Combien d’éléments a l’ensemble {<i>x</i> ∈ ℤ : <i>x</i>² ≤ 20} ?', lab:'nombre =', ans:9, why:'<i>x</i>² ≤ 20 ⇔ −√20 ≤ <i>x</i> ≤ √20 ≈ 4,47. Les entiers de cet intervalle vont de −4 à 4 : il y en a 9.'},
   {q:'Combien d’éléments a l’ensemble {<i>x</i> ∈ ℤ : |2<i>x</i> − 1| ≤ 5} ?', lab:'nombre =', ans:6, why:'−5 ≤ 2<i>x</i> − 1 ≤ 5 ⇔ −4 ≤ 2<i>x</i> ≤ 6 ⇔ −2 ≤ <i>x</i> ≤ 3. Les entiers : {−2 ; −1 ; 0 ; 1 ; 2 ; 3}, soit 6.'},
   {q:'Combien d’éléments a l’ensemble {<i>n</i> ∈ ℕ : <i>n</i> divise 30} ?', lab:'nombre =', ans:8, why:'Les diviseurs de 30 sont 1, 2, 3, 5, 6, 10, 15, 30 : l’ensemble a 8 éléments (0 ne divise pas 30).'},
   {q:'Combien d’éléments a l’ensemble {<i>x</i> ∈ ℤ : <i>x</i>² − 5<i>x</i> &lt; 0} ?', lab:'nombre =', ans:4, why:'<i>x</i>² − 5<i>x</i> = <i>x</i>(<i>x</i> − 5) &lt; 0 quand les facteurs sont de signes contraires : 0 &lt; <i>x</i> &lt; 5. D’où {1 ; 2 ; 3 ; 4}, 4 éléments (0 et 5 annulent le produit).'},
   {q:'Combien d’éléments a l’ensemble {<i>n</i> ∈ ℕ : 10 ≤ <i>n</i>² ≤ 200} ?', lab:'nombre =', ans:11, why:'3² = 9 &lt; 10 ≤ 4² = 16 et 14² = 196 ≤ 200 &lt; 15² = 225. Donc <i>n</i> va de 4 à 14 : 14 − 4 + 1 = 11 éléments.'},
   {q:'Laquelle de ces écritures décrit exactement {1 ; 8 ; 27 ; 64} ?', opts:['{<i>n</i>³ : <i>n</i> ∈ ℕ, <i>n</i> ≤ 4}','{<i>n</i>² : <i>n</i> ∈ ℕ, 1 ≤ <i>n</i> ≤ 8}','{<i>n</i>³ : <i>n</i> ∈ ℕ, 1 ≤ <i>n</i> ≤ 4}','{<i>n</i> ∈ ℕ : 1 ≤ <i>n</i> ≤ 64 et <i>n</i> est pair}'], ans:2, why:'Ce sont les cubes de 1, 2, 3, 4. Sans la borne 1 ≤ <i>n</i>, on capte aussi 0³ = 0 ; la 2e donne 1, 4, 9, …, 64 ; la 4e contient 2, 4, … et pas 1.'},
   {q:'Lequel de ces ensembles est égal à {−2 ; 2} ?', opts:['{<i>x</i> ∈ ℕ : <i>x</i>² = 4}','{<i>x</i> ∈ ℤ : |<i>x</i>| ≤ 2}','{<i>x</i> ∈ ℝ : <i>x</i>² = 4}','{<i>x</i> ∈ ℝ : <i>x</i>² = 2}'], ans:2, why:'Dans ℝ, <i>x</i>² = 4 a deux solutions, −2 et 2. Dans ℕ, il ne reste que 2 ; |<i>x</i>| ≤ 2 donne cinq entiers ; <i>x</i>² = 2 donne ±√2.'},
 ]},
 {n:'Élément ou partie : lire les accolades', r:'∈ ou ⊂ ? Lire les accolades', qs:[
   {q:'Soit A = {2 ; {3} ; {2 ; 3}}. Laquelle de ces affirmations est vraie ?', opts:['3 ∈ A','{2} ∈ A','{2} ⊂ A','{2 ; 3} ⊂ A'], ans:2, why:'Les éléments de A sont 2, {3} et {2 ; 3}. Comme 2 ∈ A, {2} ⊂ A. Mais 3 ∉ A (seul {3} y est), {2} n’est pas dans la liste, et {2 ; 3} ⊄ A car 3 ∉ A.'},
   {q:'Soit A = {2 ; {3} ; {2 ; 3}}. Laquelle de ces affirmations est fausse ?', opts:['{3} ∈ A','{{3}} ⊂ A','{2 ; {3}} ⊂ A','{3} ⊂ A'], ans:3, why:'{3} ⊂ A demanderait 3 ∈ A, or 3 n’est pas dans la liste 2, {3}, {2 ; 3}. Les trois autres sont vraies : {3} figure dans la liste, et 2 et {3} sont des éléments de A.'},
   {q:'Combien d’éléments a l’ensemble {{1 ; 2} ; {2 ; 1} ; {1} ; 1} ?', lab:'nombre =', ans:3, why:'{1 ; 2} = {2 ; 1} : l’ordre ne compte pas. L’ensemble est {{1 ; 2} ; {1} ; 1}, avec 3 éléments.'},
   {q:'Combien d’éléments a l’ensemble {∅ ; {∅} ; {∅ ; ∅}} ?', lab:'nombre =', ans:2, why:'{∅ ; ∅} = {∅}, car les répétitions ne comptent pas. L’ensemble est {∅ ; {∅}}, avec 2 éléments.'},
   {q:'Soit B = {1 ; {1 ; 2} ; {∅}}. Parmi les six objets 1, 2, {1}, {1 ; 2}, ∅, {∅}, combien sont des éléments de B ?', lab:'nombre =', ans:3, why:'On enlève une couche d’accolades : les éléments de B sont 1, {1 ; 2} et {∅}. Les objets 2, {1} et ∅ n’apparaissent pas tels quels.'},
   {q:'Soit B = {1 ; {1 ; 2} ; {∅}}. Parmi les six objets 1, 2, {1}, {1 ; 2}, ∅, {∅}, combien sont des parties de B ?', lab:'nombre =', ans:2, why:'{1} ⊂ B car 1 ∈ B, et ∅ ⊂ B toujours. Mais {1 ; 2} ⊄ B (2 ∉ B), {∅} ⊄ B (∅ n’est pas un élément de B), et 1, 2 ne sont pas des ensembles.'},
 ]},
 {n:'Ensemble vide, singleton, paire', r:'Vide, singleton, paire', qs:[
   {q:'Laquelle de ces affirmations est vraie ?', opts:['∅ ⊂ ∅','∅ ∈ ∅','{∅} = ∅','∅ ∈ {1 ; 2}'], ans:0, why:'∅ est inclus dans tout ensemble, y compris lui-même. Mais ∅ n’a aucun élément (donc ∅ ∉ ∅), {∅} a un élément, et les éléments de {1 ; 2} sont 1 et 2.'},
   {q:'Combien d’éléments a l’ensemble {∅ ; {∅} ; {{∅}}} ?', lab:'nombre =', ans:3, why:'∅, {∅} et {{∅}} sont trois ensembles différents : le vide, le singleton du vide, et le singleton de {∅}.'},
   {q:'Lequel de ces ensembles est un singleton ?', opts:['{<i>x</i> ∈ ℝ : <i>x</i>² + 1 = 0}','{<i>x</i> ∈ ℕ : <i>x</i>² = 9}','{<i>x</i> ∈ ℤ : <i>x</i>² = 9}','{∅ ; {∅}}'], ans:1, why:'Dans ℕ, <i>x</i>² = 9 n’a que la solution 3 : {3}. Le premier est vide, le troisième est la paire {−3 ; 3}, le dernier est une paire.'},
   {q:'Combien d’éléments a l’ensemble {<i>x</i> ∈ ℝ : <i>x</i>² = <i>x</i>} ?', lab:'nombre =', ans:2, why:'<i>x</i>² = <i>x</i> ⇔ <i>x</i>(<i>x</i> − 1) = 0 ⇔ <i>x</i> = 0 ou <i>x</i> = 1 : c’est la paire {0 ; 1}.'},
   {q:'Que vaut la proposition « ∀<i>x</i> ∈ ∅, <i>x</i> &gt; 5 » ?', opts:['Elle est fausse, car ∅ ne contient aucun nombre plus grand que 5','Elle est vraie : « <i>x</i> ∈ ∅ ⇒ <i>x</i> &gt; 5 » a toujours une hypothèse fausse','Ce n’est pas une proposition'], ans:1, why:'Comme pour ∅ ⊂ A, l’hypothèse <i>x</i> ∈ ∅ est toujours fausse, donc l’implication est toujours vraie. Sa négation « ∃<i>x</i> ∈ ∅, <i>x</i> ≤ 5 » est fausse.'},
 ]},
 {n:'Inclusion et égalité', r:'Appartenance et inclusion', qs:[
   {q:'Soit A = {<i>n</i> ∈ ℕ : <i>n</i> divise 12} et B = {<i>n</i> ∈ ℕ : <i>n</i> divise 36}. Qu’est-ce qui est vrai ?', opts:['A = B','A ⊂ B mais B ⊄ A','B ⊂ A mais A ⊄ B','Aucune inclusion'], ans:1, why:'Un diviseur de 12 divise 36 = 3 · 12, donc A ⊂ B. Mais 9 divise 36 et pas 12 : 9 ∈ B, 9 ∉ A.'},
   {q:'Soit A = {<i>n</i> ∈ ℕ : <i>n</i> divise 18} et B = {<i>n</i> ∈ ℕ : <i>n</i> divise 24}. Pour prouver A ⊄ B, on cherche un élément de A hors de B. Quel est le plus petit ?', lab:'<i>n</i> =', ans:9, why:'A = {1 ; 2 ; 3 ; 6 ; 9 ; 18} et B = {1 ; 2 ; 3 ; 4 ; 6 ; 8 ; 12 ; 24}. Le premier élément de A absent de B est 9.'},
   {q:'Lequel de ces ensembles est égal à {1 ; 2} ?', opts:['{<i>x</i> ∈ ℝ : <i>x</i>² − 3<i>x</i> + 2 = 0}','{<i>x</i> ∈ ℕ : <i>x</i> &lt; 2}','{<i>x</i> ∈ ℝ : 1 ≤ <i>x</i> ≤ 2}','{{1} ; {2}}'], ans:0, why:'<i>x</i>² − 3<i>x</i> + 2 = (<i>x</i> − 1)(<i>x</i> − 2) : les solutions sont 1 et 2. {<i>x</i> ∈ ℕ : <i>x</i> &lt; 2} = {0 ; 1}, l’intervalle [1 ; 2] contient une infinité de réels, et {{1} ; {2}} a pour éléments des ensembles.'},
   {q:'Pour un ensemble A quelconque, laquelle de ces affirmations est toujours vraie ?', opts:['A ∈ A','{A} ⊂ A','A ⊂ A','∅ ∈ A'], ans:2, why:'Tout élément de A est dans A : A ⊂ A. Les autres échouent pour A = {1} : {1} ∉ {1}, {{1}} ⊄ {1} car {1} ∉ {1}, et ∅ ∉ {1}.'},
 ]},
 {n:'Compter les parties', r:'Lister et compter les parties', qs:[
   {q:'Combien de parties a l’ensemble {<i>a</i> ; <i>b</i> ; <i>c</i> ; <i>d</i> ; <i>e</i> ; <i>f</i>} ?', lab:'nombre =', ans:64, why:'Pour chacun des 6 éléments, dedans ou dehors : 2⁶ = 64 parties.'},
   {q:'Combien de parties de {1 ; 2 ; 3 ; 4 ; 5 ; 6} ne contiennent ni 1 ni 6 ?', lab:'nombre =', ans:16, why:'1 et 6 sont imposés dehors : un seul choix chacun. Les 4 autres éléments sont libres : 2⁴ = 16.'},
   {q:'Combien de parties de {1 ; 2 ; 3 ; 4 ; 5 ; 6} contiennent 2 mais ni 4 ni 5 ?', lab:'nombre =', ans:8, why:'2 imposé dedans, 4 et 5 imposés dehors. Restent 1, 3, 6 libres : 2³ = 8.'},
   {q:'Combien de parties à exactement 2 éléments a l’ensemble {1 ; 2 ; 3 ; 4 ; 5} ?', lab:'nombre =', ans:10, why:'On les liste sans oubli : {1 ; 2}, {1 ; 3}, {1 ; 4}, {1 ; 5}, {2 ; 3}, {2 ; 4}, {2 ; 5}, {3 ; 4}, {3 ; 5}, {4 ; 5}. Il y en a 4 + 3 + 2 + 1 = 10.'},
   {q:'Combien de parties non vides a l’ensemble {1 ; 2 ; 3 ; 4 ; 5} ?', lab:'nombre =', ans:31, why:'Il y a 2⁵ = 32 parties en tout, dont une seule vide : 32 − 1 = 31.'},
   {q:'Combien d’éléments a 𝒫(𝒫(∅)) ?', lab:'nombre =', ans:2, why:'𝒫(∅) = {∅} a 2⁰ = 1 élément. Ses parties sont ∅ et {∅} : 2¹ = 2 éléments.'},
 ]},
 {n:'L’ensemble des parties 𝒫(E)', r:'L’ensemble des parties', qs:[
   {q:'Soit E = {<i>a</i> ; <i>b</i>}. Lequel de ces objets est un élément de 𝒫(E) ?', opts:['<i>a</i>','{∅}','{<i>a</i> ; <i>b</i>}','{{<i>a</i>}}'], ans:2, why:'Les éléments de 𝒫(E) sont les parties de E : ∅, {<i>a</i>}, {<i>b</i>}, {<i>a</i> ; <i>b</i>}. E lui-même en fait partie. <i>a</i> est un élément de E, pas une partie, et {∅}, {{<i>a</i>}} ne sont pas inclus dans E.'},
   {q:'Soit E = {1 ; 2}. Laquelle de ces affirmations est vraie ?', opts:['{1} ⊂ 𝒫(E)','{{1}} ⊂ 𝒫(E)','1 ∈ 𝒫(E)','E ⊂ 𝒫(E)'], ans:1, why:'𝒫(E) = {∅ ; {1} ; {2} ; {1 ; 2}}. Le seul élément de {{1}} est {1}, qui est dans 𝒫(E). En revanche le nombre 1 n’est pas un élément de 𝒫(E), d’où l’échec des trois autres.'},
   {q:'Combien d’éléments a 𝒫({1 ; {1} ; {1 ; 1}}) ?', lab:'nombre =', ans:4, why:'{1 ; 1} = {1}, donc l’ensemble est {1 ; {1}}, avec 2 éléments. Il a 2² = 4 parties.'},
 ]},
];
})();
