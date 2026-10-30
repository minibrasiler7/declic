/* Déclic — examen de compétence : Recherche linéaire et dichotomique */
(()=>{
const L12=`
L = [2, 5, 9, 14, 20, 26, 31, 38, 44, 50, 57, 63]
#    0  1  2   3   4   5   6   7   8   9  10  11   (indices)`;
EXAMS['ics-recherche']=[
 {n:'La recherche linéaire', r:'La recherche linéaire', qs:[
   {q:'Que renvoie <code class="code">recherche([7, 3, 9, 3, 5], 3)</code> avec la fonction du cours&nbsp;?', lab:'résultat =', ans:1,
    why:'On compare 7 (indice 0), puis 3 (indice 1) : trouvé, on renvoie 1 tout de suite. Le second 3, à l’indice 3, n’est jamais atteint.'},
   {q:'Combien de comparaisons <code class="code">L[i] == x</code> fait <code class="code">recherche([4, 8, 15, 16, 23, 42], 16)</code>&nbsp;?', lab:'comparaisons =', ans:4,
    why:'On compare 4, 8, 15, puis 16 qui est égal : 4 comparaisons, et on renvoie l’indice 3.'},
   {q:'Que renvoie <code class="code">recherche([2, 4, 8], 6)</code>&nbsp;?', lab:'résultat =', ans:-1,
    why:'6 est comparé aux 3 éléments sans succès. La boucle se termine et la fonction renvoie −1.'},
   {q:'Combien de comparaisons <code class="code">L[i] == x</code> fait cette fonction sur une liste de 40 éléments dont <i>x</i> est le premier&nbsp;?'+py(`
def derniere(L, x):
    r = -1
    for i in range(len(L)):
        if L[i] == x:
            r = i
    return r`),
    lab:'comparaisons =', ans:40,
    why:'Il n’y a pas de return dans la boucle : pour trouver la dernière occurrence, la fonction parcourt toujours toute la liste. 40 comparaisons, même si x est en tête.'},
   {q:'Laquelle de ces affirmations sur la recherche linéaire est vraie&nbsp;?', opts:['Elle exige une liste triée','Elle coûte O(log n) dans le pire cas','Elle marche sur n’importe quelle liste et coûte O(n) dans le pire cas','Elle fait toujours exactement n comparaisons'], ans:2,
    why:'On regarde les éléments un par un, sans hypothèse sur leur ordre. Dans le pire cas (x absent ou en dernier), il faut n comparaisons : O(n). Si x est en tête, une seule suffit.'},
 ]},
 {n:'Principe et précondition de la dichotomie', r:'La dichotomie', qs:[
   {q:'Quelle condition la liste doit-elle remplir pour que la dichotomie soit correcte&nbsp;?', opts:['Avoir une longueur paire','Être triée par ordre croissant','Ne contenir que des entiers positifs','Avoir une longueur égale à une puissance de 2'], ans:1,
    why:'C’est parce que L est triée qu’on peut éliminer une moitié : si L[m] &lt; x, tous les éléments avant m sont aussi &lt; x.'},
   {q:'Que renvoie <code class="code">dichotomie([9, 2, 5, 1, 7], 9)</code> avec la fonction du cours&nbsp;?', opts:['0','2','−1','4'], ans:2,
    why:'m = 2 : 5 &lt; 9, g = 3. m = 3 : 1 &lt; 9, g = 4. m = 4 : 7 &lt; 9, g = 5 &gt; d = 4. On renvoie −1 alors que 9 est à l’indice 0 : la liste n’est pas triée.'},
   {q:'Quel est l’invariant de la boucle de la dichotomie&nbsp;?', opts:['g &lt; d','m est toujours le milieu de la liste','Si x est dans L, il est dans L[g..d]','L[g] ≤ x ≤ L[d] dans tous les cas'], ans:2,
    why:'Chaque mise à jour n’élimine que des cases qui ne peuvent pas contenir x. À la sortie, la zone est vide, donc x est absent. L[g] ≤ x ≤ L[d] est faux si x est absent ou si la zone est vide.'},
   {q:'Quel est un variant qui prouve que la dichotomie s’arrête&nbsp;?', opts:['d − g + 1, la taille de la zone','m','g','x'], ans:0,
    why:'d − g + 1 est un entier ≥ 0 tant que g ≤ d + 1, et chaque tour le fait baisser strictement : g = m + 1 &gt; g ou d = m − 1 &lt; d.'},
   {q:'Au cours d’une dichotomie, g = 5 et d = 12. Que vaut <i>m</i>&nbsp;?', lab:'m =', ans:8,
    why:'m = (g + d) // 2 = 17 // 2 = 8 : la division entière arrondit vers le bas.'},
   {q:'Dans <code class="code">dichotomie</code>, on remplace <code class="code">while g &lt;= d</code> par <code class="code">while g &lt; d</code>. Que renvoie alors <code class="code">dichotomie([2, 4, 6], 6)</code>&nbsp;?', opts:['2','1','La fonction boucle sans fin','−1'], ans:3,
    why:'g = 0, d = 2, m = 1 : 4 &lt; 6, donc g = 2. Maintenant g = d = 2 et la condition g &lt; d est fausse : on sort sans examiner la case 2 et on renvoie −1.'},
 ]},
 {n:'Simuler une dichotomie', r:'Simuler une dichotomie avec un tableau', qs:[
   {q:'On cherche <i>x</i> = 38 avec <code class="code">dichotomie</code>. Quelles sont les valeurs successives de <i>m</i>&nbsp;?'+py(L12), opts:['5, 8, 7','6, 9, 7','5, 8, 6, 7','5, 7'], ans:2,
    why:'(0, 11) : m = 5, 26 &lt; 38, g = 6. m = 8, 44 &gt; 38, d = 7. m = 6, 31 &lt; 38, g = 7. m = 7, L[7] = 38 : trouvé.'},
   {q:'Combien de tours fait <code class="code">dichotomie(L, 2)</code>&nbsp;?'+py(L12), lab:'tours =', ans:3,
    why:'m = 5 : 26 &gt; 2, d = 4. m = 2 : 9 &gt; 2, d = 1. m = 0 : L[0] = 2, trouvé au 3e tour.'},
   {q:'Que renvoie <code class="code">dichotomie(L, 44)</code>&nbsp;?'+py(L12), lab:'résultat =', ans:8,
    why:'m = 5 : 26 &lt; 44, g = 6. m = (6 + 11) // 2 = 8 : L[8] = 44, on renvoie l’indice 8.'},
   {q:'On cherche <i>x</i> = 27, absent. Quelles sont les valeurs successives de <i>m</i>&nbsp;?'+py(L12), opts:['5, 8, 6','5, 8, 6, 5','5, 2','5, 8, 7, 6'], ans:0,
    why:'m = 5 : 26 &lt; 27, g = 6. m = 8 : 44 &gt; 27, d = 7. m = 6 : 31 &gt; 27, d = 5. Puis g = 6 &gt; d = 5 : on s’arrête et on renvoie −1.'},
   {q:'On cherche <i>x</i> = 27, absent de L. Que vaut <i>g</i> à la sortie de la boucle&nbsp;?'+py(L12), lab:'g =', ans:6,
    why:'Le dernier tour fait d = 5, et g valait déjà 6. C’est l’indice où insérer 27 pour garder L triée, entre 26 (indice 5) et 31 (indice 6).'},
   {q:'On cherche 1, plus petit que tous les éléments. Que vaut <i>d</i> à la sortie de la boucle&nbsp;?'+py(L12), lab:'d =', ans:-1,
    why:'m = 5 (d = 4), m = 2 (d = 1), m = 0 : 2 &gt; 1, d = −1. La zone (0, −1) est vide. g reste à 0 : 1 s’insérerait au tout début.'},
   {q:'Combien de tours fait <code class="code">dichotomie([10, 20, 30, 40, 50, 60, 70], 65)</code>&nbsp;?', lab:'tours =', ans:3,
    why:'m = 3 : 40 &lt; 65, g = 4. m = 5 : 60 &lt; 65, g = 6. m = 6 : 70 &gt; 65, d = 5. g = 6 &gt; d = 5 : 3 tours, on renvoie −1.'},
   {q:'Dans <code class="code">[10, 20, 30, 40, 50, 60, 70]</code>, combien d’éléments sont trouvés par la dichotomie en exactement 3 tours&nbsp;?', lab:'éléments =', ans:4,
    why:'Tour 1 : 40 (indice 3). Tour 2 : 20 et 60 (indices 1 et 5). Tour 3 : les 4 éléments restants, 10, 30, 50 et 70 (indices pairs).'},
 ]},
 {n:'Borner le nombre de tours', r:'Borner le nombre de tours avec les puissances de 2', qs:[
   {q:'Combien de tours au plus fait la dichotomie sur une liste triée de 200 éléments&nbsp;?', lab:'tours =', ans:8,
    why:'Il faut 2ᵗ ≥ 201. Or 2⁷ = 128 &lt; 201 ≤ 256 = 2⁸ : t = 8.'},
   {q:'Combien de tours au plus pour 31 éléments&nbsp;?', lab:'tours =', ans:5,
    why:'n + 1 = 32 = 2⁵ exactement : 5 tours suffisent, car 5 tours traitent jusqu’à 2⁵ − 1 = 31 éléments.'},
   {q:'Combien de tours au plus pour 64 éléments&nbsp;?', lab:'tours =', ans:7,
    why:'n + 1 = 65 et 2⁶ = 64 &lt; 65 ≤ 128 = 2⁷ : t = 7. Six tours ne traitent que 63 éléments, un de moins que 64.'},
   {q:'Combien de tours au plus pour 5000 éléments&nbsp;?', lab:'tours =', ans:13,
    why:'2¹² = 4096 &lt; 5001 ≤ 8192 = 2¹³ : t = 13.'},
   {q:'Quel est le plus grand nombre d’éléments qu’une dichotomie traite toujours en au plus 12 tours&nbsp;?', lab:'n =', ans:4095,
    why:'Avec t tours, on traite au plus 2ᵗ − 1 éléments : 2¹² − 1 = 4096 − 1 = 4095.'},
   {q:'Combien de tours au plus pour un milliard (10⁹) d’éléments&nbsp;?', lab:'tours =', ans:30,
    why:'2¹⁰ ≈ mille, donc 2³⁰ ≈ un milliard. Plus précisément, 2²⁹ = 536 870 912 &lt; 10⁹ + 1 ≤ 2³⁰ = 1 073 741 824 : t = 30.'},
 ]},
 {n:'Linéaire contre dichotomie', r:'Combien de tours au plus&nbsp;?', qs:[
   {q:'Une liste triée contient 100 000 éléments. Combien de tours au plus fait la dichotomie&nbsp;?', lab:'tours =', ans:17,
    why:'2¹⁶ = 65 536 &lt; 100 001 ≤ 131 072 = 2¹⁷ : 17 tours, contre jusqu’à 100 000 comparaisons pour la recherche linéaire.'},
   {q:'Une liste triée passe de 1000 à 8000 éléments. De combien augmente le nombre maximal de tours de la dichotomie&nbsp;?', lab:'tours en plus =', ans:3,
    why:'1000 éléments : ⌈log₂ 1001⌉ = 10. 8000 éléments : 2¹² = 4096 &lt; 8001 ≤ 8192 = 2¹³, donc 13. Multiplier n par 8 = 2³ ajoute 3 tours.'},
   {q:'Si on double la taille d’une liste triée, le nombre maximal de tours de la dichotomie…', opts:['double','augmente d’environ un tour','est multiplié par 4','ne change pas'], ans:1,
    why:'Un tour de plus coupe la liste doublée en deux moitiés de la taille d’avant. La dichotomie est en O(log n).'},
   {q:'La liste n’est pas triée et tu dois y chercher un élément une seule fois. Que peux-tu utiliser directement&nbsp;?', opts:['La dichotomie','La recherche linéaire','Les deux donnent toujours le bon résultat','Aucune des deux'], ans:1,
    why:'La dichotomie exige une liste triée, sinon elle peut déclarer absent un élément présent. La recherche linéaire marche sur n’importe quelle liste.'},
   {q:'Quelle est la complexité de la dichotomie dans le pire cas&nbsp;?', opts:['O(1)','O(n)','O(n log n)','O(log n)'], ans:3,
    why:'La zone est divisée par 2 à chaque tour : au plus ⌈log₂(n + 1)⌉ tours, chacun en temps constant. O(log n).'},
 ]},
];
})();
