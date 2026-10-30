/* Déclic — examen de compétence : Produit scalaire et problèmes métriques */
(()=>{
const ar=s=>`<span style="display:inline-flex;flex-direction:column;align-items:center;line-height:.85;vertical-align:-.1em"><span style="font-size:.7em">→</span><i>${s}</i></span>`;
const B=s=>`<b>${s}</b>`;
EXAMS['ga-scalaire']=[
 {n:'Calculer un produit scalaire', r:'Définition géométrique', qs:[
   {q:`Dans un repère orthonormé, calcule ${B('u')}·${B('v')} pour ${B('u')} = (−2 ; 5) et ${B('v')} = (3 ; 4).`, lab:'u·v =', ans:14, why:`On multiplie terme à terme et on additionne : (−2)·3 + 5·4 = −6 + 20 = 14.`},
   {q:`‖${B('u')}‖ = 4, ‖${B('v')}‖ = 5 et l’angle entre ${B('u')} et ${B('v')} vaut 120°. Que vaut ${B('u')}·${B('v')}&nbsp;?`, lab:'u·v =', ans:-10, why:`${B('u')}·${B('v')} = ‖${B('u')}‖ ‖${B('v')}‖ cos θ = 4·5·cos 120° = 20·(−½) = −10.`},
   {q:`Dans l’espace, en repère orthonormé, calcule ${B('u')}·${B('v')} pour ${B('u')} = (1 ; −2 ; 3) et ${B('v')} = (4 ; 0 ; −1).`, lab:'u·v =', ans:1, why:`On ajoute le produit des troisièmes composantes : 1·4 + (−2)·0 + 3·(−1) = 4 + 0 − 3 = 1.`},
   {q:`Deux vecteurs non nuls ont un produit scalaire égal à −3. Que peut-on dire de l’angle θ qu’ils forment&nbsp;?`, opts:['θ est aigu','θ est droit','θ est obtus','on ne peut rien dire sans les normes'], ans:2, why:`‖${B('u')}‖ ‖${B('v')}‖ est positif, donc cos θ a le signe du produit scalaire : cos θ &lt; 0, l’angle est obtus.`},
 ]},
 {n:'Normes, distances, vecteur unitaire', r:'Norme et angle', qs:[
   {q:`Quelle est la norme du vecteur ${B('u')} = (6 ; −8)&nbsp;?`, ans:10, why:`‖${B('u')}‖² = ${B('u')}·${B('u')} = 36 + 64 = 100, donc ‖${B('u')}‖ = 10.`},
   {q:`Quelle est la distance entre <i>A</i>(−1 ; 2) et <i>B</i>(3 ; −1)&nbsp;?`, lab:'AB =', ans:5, why:`${ar('AB')} = (4 ; −3), donc <i>AB</i> = √(16 + 9) = √25 = 5.`},
   {q:`Quelle est la distance entre <i>A</i>(1 ; 0 ; 2) et <i>B</i>(3 ; 3 ; 8)&nbsp;?`, lab:'AB =', ans:7, why:`${ar('AB')} = (2 ; 3 ; 6), donc <i>AB</i> = √(4 + 9 + 36) = √49 = 7.`},
   {q:`Quel est le vecteur unitaire de même direction et de même sens que (6 ; −8)&nbsp;?`, opts:['(6/14 ; −8/14)','(0,6 ; −0,8)','(0,8 ; −0,6)','(−0,6 ; 0,8)'], ans:1, why:`On divise par la norme, qui vaut √(36 + 64) = 10 : (0,6 ; −0,8). Contrôle : 0,36 + 0,64 = 1. Diviser par |6| + |8| = 14 ne donne pas un vecteur de norme 1.`},
 ]},
 {n:'Calculer un angle', r:'Calculer un angle par le produit scalaire', qs:[
   {q:`Quel est l’angle entre ${B('u')} = (3 ; 4) et ${B('v')} = (4 ; 3)&nbsp;? Arrondis au centième de degré.`, lab:'θ =', unit:'°', ans:16.26, tol:.01, why:`${B('u')}·${B('v')} = 12 + 12 = 24 et ‖${B('u')}‖ = ‖${B('v')}‖ = 5. cos θ = 24/25 = 0,96, donc θ = arccos 0,96 ≈ 16,26°.`},
   {q:`Quel est l’angle entre ${B('u')} = (2 ; −1) et ${B('v')} = (1 ; 3)&nbsp;? Arrondis au centième de degré.`, lab:'θ =', unit:'°', ans:98.13, tol:.01, why:`${B('u')}·${B('v')} = 2 − 3 = −1, ‖${B('u')}‖ = √5, ‖${B('v')}‖ = √10. cos θ = −1/√50 ≈ −0,1414, donc θ ≈ 98,13° : négatif, l’angle est obtus.`},
   {q:`Quel est l’angle entre ${B('u')} = (1 ; 1) et ${B('v')} = (−1 ; 0)&nbsp;?`, lab:'θ =', unit:'°', ans:135, tol:.01, why:`${B('u')}·${B('v')} = −1, ‖${B('u')}‖ = √2 et ‖${B('v')}‖ = 1. cos θ = −1/√2, donc θ = 135°.`},
   {q:`Le triangle a pour sommets <i>A</i>(1 ; 2), <i>B</i>(4 ; 3) et <i>C</i>(2 ; 5). Quel est l’angle en <i>A</i>&nbsp;? Arrondis au centième de degré.`, lab:'angle =', unit:'°', ans:53.13, tol:.01, why:`On prend les deux vecteurs issus de <i>A</i> : ${ar('AB')} = (3 ; 1) et ${ar('AC')} = (1 ; 3). Produit scalaire 6, normes √10 et √10. cos θ = 6/10 = 0,6, donc θ ≈ 53,13°.`},
   {q:`Quel est l’angle entre la droite dirigée par (2 ; 1) et la droite dirigée par (−1 ; 1)&nbsp;? Arrondis au centième de degré.`, lab:'θ =', unit:'°', ans:71.57, tol:.01, why:`Le produit scalaire vaut −2 + 1 = −1 et les normes √5 et √2. Pour deux droites, on prend la valeur absolue : cos θ = 1/√10 ≈ 0,3162, donc θ ≈ 71,57°. Les vecteurs, eux, font 108,43°.`},
 ]},
 {n:'Prouver un angle droit', r:'Prouver un angle droit', qs:[
   {q:`Pour quelle valeur de <i>x</i> les vecteurs ${B('u')} = (4 ; −6) et ${B('v')} = (<i>x</i> ; 2) sont-ils orthogonaux&nbsp;?`, lab:'x =', ans:3, why:`${B('u')}·${B('v')} = 4<i>x</i> − 12 = 0, donc <i>x</i> = 3.`},
   {q:`Lequel de ces vecteurs est orthogonal à (5 ; −2)&nbsp;?`, opts:['(5 ; 2)','(−5 ; 2)','(2 ; 5)','(−2 ; 5)'], ans:2, why:`(5 ; −2)·(2 ; 5) = 10 − 10 = 0. C’est l’astuce (<i>a</i> ; <i>b</i>) ⟂ (−<i>b</i> ; <i>a</i>) : ici (−(−2) ; 5) = (2 ; 5). Les autres donnent 21, −29 et −20.`},
   {q:`Le triangle <i>A</i>(2 ; 1), <i>B</i>(5 ; 3), <i>C</i>(0 ; 4) est-il rectangle, et en quel sommet&nbsp;?`, opts:['rectangle en A','rectangle en B','rectangle en C','il n’est pas rectangle'], ans:0, why:`${ar('AB')} = (3 ; 2) et ${ar('AC')} = (−2 ; 3) : ${ar('AB')}·${ar('AC')} = −6 + 6 = 0. En <i>B</i> et en <i>C</i>, les produits scalaires valent 13 : angles aigus.`},
   {q:`Dans l’espace, pour quelle valeur de <i>m</i> les vecteurs (1 ; 2 ; <i>m</i>) et (3 ; −1 ; 2) sont-ils orthogonaux&nbsp;?`, lab:'m =', ans:-0.5, tol:.001, why:`Produit scalaire : 3 − 2 + 2<i>m</i> = 1 + 2<i>m</i> = 0, donc <i>m</i> = −0,5.`},
   {q:`On sait que ${B('u')}·${B('v')} = 0. Laquelle de ces conclusions est toujours juste&nbsp;?`, opts:['<b>u</b> et <b>v</b> sont colinéaires','<b>u</b> et <b>v</b> sont orthogonaux (l’un peut être nul)','<b>u</b> et <b>v</b> sont tous les deux non nuls','‖<b>u</b> + <b>v</b>‖ = ‖<b>u</b>‖ + ‖<b>v</b>‖'], ans:1, why:`${B('u')}·${B('v')} = ‖${B('u')}‖ ‖${B('v')}‖ cos θ est nul si l’angle est droit ou si un des vecteurs est nul. On a alors ‖${B('u')} + ${B('v')}‖² = ‖${B('u')}‖² + ‖${B('v')}‖² (Pythagore), pas la somme des normes.`},
 ]},
 {n:'Projeter orthogonalement', r:'Projeter orthogonalement', qs:[
   {q:`Quelle est la première composante de la projection orthogonale de ${B('v')} = (7 ; −1) sur la direction de ${B('u')} = (2 ; 1)&nbsp;?`, lab:'x =', ans:5.2, tol:.001, why:`${B('u')}·${B('v')} = 14 − 1 = 13 et ‖${B('u')}‖² = 5, donc <i>k</i> = 13/5 = 2,6 et la projection vaut 2,6·(2 ; 1) = (5,2 ; 2,6).`},
   {q:`Quelle est la longueur de la projection orthogonale de ${B('v')} = (1 ; 7) sur la direction de ${B('u')} = (3 ; 4)&nbsp;?`, ans:6.2, tol:.001, why:`La longueur vaut |${B('u')}·${B('v')}| / ‖${B('u')}‖ = |3 + 28| / 5 = 31/5 = 6,2.`},
   {q:`Quelle est la première composante de la projection orthogonale de ${B('v')} = (−3 ; 1) sur la direction de ${B('u')} = (2 ; 1)&nbsp;?`, lab:'x =', ans:-2, why:`${B('u')}·${B('v')} = −6 + 1 = −5 et ‖${B('u')}‖² = 5, donc <i>k</i> = −1 et la projection vaut −${B('u')} = (−2 ; −1). <i>k</i> &lt; 0 : la projection est de sens contraire à ${B('u')}.`},
   {q:`La droite passe par <i>A</i>(1 ; 0) et est dirigée par ${B('u')} = (1 ; 2). Quelle est l’ordonnée du pied <i>H</i> de la perpendiculaire menée de <i>M</i>(5 ; 3)&nbsp;?`, lab:'y =', ans:4, why:`${ar('AM')} = (4 ; 3), ${ar('AM')}·${B('u')} = 4 + 6 = 10 et ‖${B('u')}‖² = 5, donc <i>k</i> = 2 et <i>H</i> = <i>A</i> + 2${B('u')} = (3 ; 4). Contrôle : ${ar('HM')} = (2 ; −1) est orthogonal à (1 ; 2).`},
   {q:`Quelle est la distance du point <i>M</i>(5 ; 3) à la droite passant par <i>A</i>(1 ; 0) et dirigée par ${B('u')} = (1 ; 2)&nbsp;? Arrondis au centième.`, ans:2.24, tol:.01, why:`Le pied est <i>H</i> = <i>A</i> + <i>k</i>${B('u')} avec <i>k</i> = ${ar('AM')}·${B('u')} / ‖${B('u')}‖² = 10/5 = 2, soit <i>H</i>(3 ; 4). Alors <i>MH</i> = ‖(2 ; −1)‖ = √5 ≈ 2,24.`},
 ]},
 {n:'Développer un carré scalaire', r:'Développer un carré scalaire', qs:[
   {q:`‖${B('u')}‖ = 3, ‖${B('v')}‖ = 5 et ${B('u')}·${B('v')} = −4. Que vaut ‖${B('u')} + ${B('v')}‖&nbsp;? Arrondis au centième.`, ans:5.10, tol:.01, why:`‖${B('u')} + ${B('v')}‖² = 9 + 2·(−4) + 25 = 26, donc ‖${B('u')} + ${B('v')}‖ = √26 ≈ 5,10.`},
   {q:`‖${B('u')}‖ = 4, ‖${B('v')}‖ = 2 et l’angle entre ${B('u')} et ${B('v')} vaut 60°. Que vaut ‖${B('u')} − ${B('v')}‖&nbsp;? Arrondis au centième.`, ans:3.46, tol:.01, why:`${B('u')}·${B('v')} = 4·2·cos 60° = 4. ‖${B('u')} − ${B('v')}‖² = 16 − 2·4 + 4 = 12, donc ‖${B('u')} − ${B('v')}‖ = √12 ≈ 3,46.`},
   {q:`‖${B('u')}‖ = 5 et ‖${B('v')}‖ = 3. Que vaut (${B('u')} + ${B('v')})·(${B('u')} − ${B('v')})&nbsp;?`, ans:16, why:`On développe : ${B('u')}·${B('u')} − ${B('u')}·${B('v')} + ${B('v')}·${B('u')} − ${B('v')}·${B('v')} = ‖${B('u')}‖² − ‖${B('v')}‖² = 25 − 9 = 16. Les termes croisés s’annulent par symétrie.`},
   {q:`Dans un triangle, deux côtés mesurent 5 et 7 et l’angle entre eux vaut 60°. Quelle est la longueur du troisième côté&nbsp;? Arrondis au centième.`, ans:6.24, tol:.01, why:`Al-Kashi : <i>c</i>² = 5² + 7² − 2·5·7·cos 60° = 25 + 49 − 35 = 39, donc <i>c</i> = √39 ≈ 6,24.`},
   {q:`‖${B('u')}‖ = 3, ‖${B('v')}‖ = 4 et ‖${B('u')} + ${B('v')}‖ = 6. Que vaut ${B('u')}·${B('v')}&nbsp;?`, lab:'u·v =', ans:5.5, tol:.001, why:`‖${B('u')} + ${B('v')}‖² = ‖${B('u')}‖² + 2${B('u')}·${B('v')} + ‖${B('v')}‖² donne 36 = 9 + 2${B('u')}·${B('v')} + 16, donc ${B('u')}·${B('v')} = 11/2 = 5,5.`},
 ]},
];
})();
