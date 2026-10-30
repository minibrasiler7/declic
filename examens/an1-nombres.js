/* Déclic — examen de compétence : Nombres et (in)équations */
(()=>{
const x='<i>x</i>';
EXAMS['an1-nombres']=[
 {n:'Les ensembles de nombres', r:'Des ensembles emboîtés', qs:[
   {q:`Quel est le plus petit ensemble qui contient le nombre ${F('14','7')} ?`, opts:['ℕ','ℤ','ℚ','ℝ'], ans:0, why:'14/7 = 2, un entier positif : il est déjà dans ℕ.'},
   {q:'Quel est le plus petit ensemble qui contient le nombre −√49 ?', opts:['ℕ','ℤ','ℚ','ℝ'], ans:1, why:'√49 = 7, donc −√49 = −7 : un entier négatif, dans ℤ mais pas dans ℕ.'},
   {q:'Lequel de ces nombres est irrationnel ?', opts:['0,121212…','√16/3','−7/2','√5'], ans:3, why:'0,121212… est périodique donc rationnel, √16/3 = 4/3 et −7/2 sont des quotients d’entiers. √5 n’est pas un quotient d’entiers : il est irrationnel.'},
   {q:'Laquelle de ces affirmations est vraie ?', opts:['ℚ ⊂ ℤ','Tout entier est un rationnel','√2 ∈ ℚ','−3 ∈ ℕ'], ans:1, why:'ℤ ⊂ ℚ : un entier <i>n</i> s’écrit <i>n</i>/1. Les autres sont fausses : 1/2 ∉ ℤ, √2 est irrationnel, −3 est négatif.'},
 ]},
 {n:'Écrire un intervalle', r:'Intervalles', qs:[
   {q:`Quel intervalle décrit {${x} ∈ ℝ : −1 ≤ ${x} &lt; 4} ?`, opts:['[−1 ; 4[',']−1 ; 4]','[−1 ; 4]',']−1 ; 4['], ans:0, why:'−1 est inclus (≤) : crochet tourné vers −1. 4 est exclu (&lt;) : crochet tourné vers l’extérieur. On obtient [−1 ; 4[.'},
   {q:`Quel intervalle décrit {${x} ∈ ℝ : ${x} &lt; 5} ?`, opts:[']−∞ ; 5]',']−∞ ; 5[','[−∞ ; 5[',']5 ; +∞['], ans:1, why:'5 est exclu (inégalité stricte), et du côté de l’infini le crochet est toujours ouvert : ]−∞ ; 5[.'},
   {q:'Combien de nombres entiers appartiennent à l’intervalle ]−3 ; 2] ?', lab:'nombre =', ans:5, why:'−3 est exclu, 2 est inclus : −2, −1, 0, 1, 2, soit 5 entiers.'},
   {q:'Laquelle de ces écritures est incorrecte ?', opts:['[0 ; +∞[','[2 ; +∞]',']−∞ ; 0]',']1 ; 1,5['], ans:1, why:'∞ n’est pas un réel, il ne peut pas appartenir à l’intervalle : le crochet est toujours ouvert de ce côté. Il faut écrire [2 ; +∞[.'},
 ]},
 {n:'Inéquations du premier degré', r:'Résoudre une inéquation du premier degré', qs:[
   {q:`Résous 5${x} − 3 &lt; 2${x} + 9. L’ensemble des solutions s’écrit ]−∞ ; <i>a</i>[. Donne <i>a</i>.`, lab:'<i>a</i> =', ans:4, why:'On regroupe : 5x − 2x &lt; 9 + 3, soit 3x &lt; 12, donc x &lt; 4. S = ]−∞ ; 4[.'},
   {q:`Résous 4 − 3${x} ≥ 19. L’ensemble des solutions s’écrit ]−∞ ; <i>a</i>]. Donne <i>a</i>.`, lab:'<i>a</i> =', ans:-5, why:'−3x ≥ 15. On divise par −3 &lt; 0, le sens se renverse : x ≤ −5. S = ]−∞ ; −5].'},
   {q:`Un élève résout −2${x} &lt; 8 et écrit « ${x} &lt; −4 ». Qu’en penses-tu ?`, opts:['C’est correct','C’est faux : on divise par −2, donc x &gt; −4','C’est faux : la solution est x &lt; 4','C’est faux : la solution est x &gt; 4'], ans:1, why:'On divise les deux membres par −2, un nombre négatif : le sens se renverse. −2x &lt; 8 ⇔ x &gt; −4.'},
   {q:`Résous ${F(x,'2')} − 1 &gt; ${F('2'+x+' + 1','3')}. L’ensemble des solutions s’écrit ]−∞ ; <i>a</i>[. Donne <i>a</i>.`, lab:'<i>a</i> =', ans:-8, why:'On multiplie par 6 &gt; 0 : 3x − 6 &gt; 4x + 2, soit −x &gt; 8, donc x &lt; −8 (on divise par −1, le sens se renverse).'},
   {q:`Quel est le plus grand nombre entier qui vérifie 7 − 2(${x} + 1) ≥ 3${x} − 12 ?`, lab:'entier =', ans:3, why:'7 − 2x − 2 ≥ 3x − 12, soit 17 ≥ 5x, donc x ≤ 3,4. Le plus grand entier solution est 3.'},
 ]},
 {n:'Le tableau de signes', r:'Le tableau de signes', qs:[
   {q:`Résous (${x} − 3)(${x} + 5) &lt; 0.`, opts:[']−∞ ; −5[ ∪ ]3 ; +∞[',']−5 ; 3[','[−5 ; 3]',']−3 ; 5['], ans:1, why:'Racines −5 et 3. Les deux facteurs ont des signes opposés entre −5 et 3 : le produit y est négatif. Inégalité stricte : S = ]−5 ; 3[.'},
   {q:`Dans un tableau de signes, le facteur 6 − 2${x} est…`, opts:['positif à droite de 3','négatif à gauche de 3','positif à gauche de 3 et négatif à droite','positif à gauche de −3 et négatif à droite'], ans:2, why:'Sa racine est 3. Le coefficient de x vaut −2 &lt; 0 : le facteur a le signe de −2 (négatif) à droite de 3, et le signe opposé (positif) à gauche.'},
   {q:`Résous ${F('2'+x+' − 1',x+' + 4')} ≥ 0.`, opts:[']−4 ; 1/2]',']−∞ ; −4] ∪ [1/2 ; +∞[',']−∞ ; −4[ ∪ [1/2 ; +∞[','[1/2 ; +∞['], ans:2, why:'Zéro du numérateur : 1/2 (inclus), valeur interdite : −4 (exclue). Signes : + avant −4, − entre −4 et 1/2, + après 1/2. S = ]−∞ ; −4[ ∪ [1/2 ; +∞[.'},
   {q:`Résous ${F(x+' + 1',x+' − 2')} ≤ 0.`, opts:['[−1 ; 2]','[−1 ; 2[',']−1 ; 2[',']−∞ ; −1] ∪ ]2 ; +∞['], ans:1, why:'Le quotient est négatif entre −1 et 2. Il vaut 0 en −1 (inclus) et n’existe pas en 2 (valeur interdite, toujours exclue) : S = [−1 ; 2[.'},
   {q:`Combien de nombres entiers vérifient (2${x} + 5)(${x} − 3) &lt; 0 ?`, lab:'nombre =', ans:5, why:'Racines −5/2 et 3. Le produit est négatif entre elles : S = ]−2,5 ; 3[. Entiers : −2, −1, 0, 1, 2, soit 5.'},
   {q:`Résous (${x} + 2)(1 − ${x})(${x} − 4) ≥ 0.`, opts:['[−2 ; 1] ∪ [4 ; +∞[',']−∞ ; −2] ∪ [1 ; 4]','[1 ; 4]',']−∞ ; −2[ ∪ ]1 ; 4['], ans:1, why:'Racines −2, 1, 4. Signes de gauche à droite : + (x &lt; −2), − (entre −2 et 1), + (entre 1 et 4), − (x &gt; 4). Inégalité large : S = ]−∞ ; −2] ∪ [1 ; 4].'},
 ]},
 {n:'Factoriser pour étudier un signe', r:'Factoriser avant d’étudier un signe', qs:[
   {q:`Résous ${x}³ − 9${x} &gt; 0.`, opts:[']−3 ; 0[ ∪ ]3 ; +∞[',']−∞ ; −3[ ∪ ]0 ; 3[',']3 ; +∞[',']−3 ; 3['], ans:0, why:'x³ − 9x = x(x − 3)(x + 3). Signes : − (x &lt; −3), + (entre −3 et 0), − (entre 0 et 3), + (x &gt; 3). S = ]−3 ; 0[ ∪ ]3 ; +∞[.'},
   {q:`Résous 4${x}² − 1 &lt; 0. L’ensemble des solutions est ]<i>a</i> ; <i>b</i>[. Donne <i>b</i>.`, lab:'<i>b</i> =', ans:0.5, why:'4x² − 1 = (2x − 1)(2x + 1), racines −1/2 et 1/2. Le produit est négatif entre les racines : S = ]−1/2 ; 1/2[, donc b = 1/2.'},
   {q:`Résous ${x}² − 10${x} + 25 ≤ 0.`, opts:['∅','{5}','[−5 ; 5]','ℝ'], ans:1, why:'x² − 10x + 25 = (x − 5)², toujours ≥ 0, et nul seulement en 5. Il est ≤ 0 seulement pour x = 5 : S = {5}.'},
   {q:`Résous ${x}³ + 2${x}² ≥ 0.`, opts:['[−2 ; +∞[','[0 ; +∞[','[−2 ; 0]',']−∞ ; −2] ∪ {0}'], ans:0, why:'x³ + 2x² = x²(x + 2). Le carré x² est ≥ 0, donc le signe est celui de x + 2 (et le produit est nul en 0, qui est déjà dans l’ensemble). S = [−2 ; +∞[.'},
   {q:`Résous ${x}²(${x} − 3) &lt; 0.`, opts:[']−∞ ; 3[',']0 ; 3[',']−∞ ; 0[ ∪ ]0 ; 3[',']3 ; +∞['], ans:2, why:'x² &gt; 0 sauf en 0 où il est nul. Le produit a le signe de x − 3 hors de 0, et vaut 0 en x = 0, qui n’est pas solution (inégalité stricte). S = ]−∞ ; 0[ ∪ ]0 ; 3[.'},
 ]},
 {n:'Inéquations avec un quotient', r:'Inéquation avec un quotient : tout ramener à 0', qs:[
   {q:`Résous ${F('2',x+' − 3')} ≥ 1.`, opts:['[5 ; +∞[',']3 ; 5]',']−∞ ; 3[ ∪ [5 ; +∞[','[3 ; 5]'], ans:1, why:'2/(x − 3) − 1 = (2 − x + 3)/(x − 3) = (5 − x)/(x − 3). Signes : − avant 3, + entre 3 et 5, − après 5 ; nul en 5, interdit en 3. S = ]3 ; 5].'},
   {q:`Résous ${F(x+' + 4',x+' + 1')} &lt; 2.`, opts:[']−1 ; 2[',']2 ; +∞[',']−∞ ; −1[ ∪ ]2 ; +∞[',']−∞ ; −4[ ∪ ]−1 ; +∞['], ans:2, why:'(x + 4)/(x + 1) − 2 = (x + 4 − 2x − 2)/(x + 1) = (2 − x)/(x + 1). Ce quotient est négatif avant −1 et après 2 : S = ]−∞ ; −1[ ∪ ]2 ; +∞[.'},
   {q:`Résous ${F('3'+x+' − 1',x+' − 2')} ≥ 3. L’ensemble des solutions s’écrit ]<i>a</i> ; +∞[. Donne <i>a</i>.`, lab:'<i>a</i> =', ans:2, why:'(3x − 1)/(x − 2) − 3 = (3x − 1 − 3x + 6)/(x − 2) = 5/(x − 2). Il est ≥ 0 exactement quand x − 2 &gt; 0 : S = ]2 ; +∞[.'},
   {q:`Un élève résout ${F('1',x)} &lt; 1 en multipliant par ${x} et trouve ${x} &gt; 1. Quel est le bon ensemble des solutions ?`, opts:[']1 ; +∞[',']0 ; 1[',']−∞ ; 0[ ∪ ]1 ; +∞[',']−∞ ; 1['], ans:2, why:'On ne connaît pas le signe de x. On écrit 1/x − 1 = (1 − x)/x &lt; 0 : négatif pour x &lt; 0 et pour x &gt; 1. Il avait oublié les x négatifs.'},
   {q:`Résous ${F(x+' + 2',x+' − 4')} ≤ −1. Combien de nombres entiers sont solutions ?`, lab:'nombre =', ans:3, why:'(x + 2)/(x − 4) + 1 = (2x − 2)/(x − 4) ≤ 0. Nul en 1 (inclus), interdit en 4 : S = [1 ; 4[. Entiers : 1, 2, 3.'},
   {q:`Les solutions de ${F(x,x+' − 1')} ≤ 2 contiennent presque tous les entiers. Combien d’entiers ne sont pas solutions ?`, lab:'nombre =', ans:1, why:'x/(x − 1) − 2 = (2 − x)/(x − 1) ≤ 0 : S = ]−∞ ; 1[ ∪ [2 ; +∞[. Seul l’entier 1 (valeur interdite) n’est pas solution.'},
 ]},
];
})();
