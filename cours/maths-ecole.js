/* Déclic — parcours de mathématiques : École obligatoire (format : voir cours/maths.js) */
MATHS.push(
{id:'fractions',br:'alg',lv:'ecole',h:'Fractions',p:'Partager, comparer et calculer avec des parts.',
 lessons:['Fractions équivalentes','Additionner des fractions','Multiplier et diviser','Fractions et nombres décimaux'],
 steps:[
  {h:'Une fraction, c’est un partage',p:`<p>Tu partages une tablette de chocolat : comment écrire « trois morceaux sur quatre » avec un seul nombre&nbsp;? C’est le rôle d’une <b>fraction</b>.</p>
<div class="def"><p>Dans la fraction ${F('a','b')}, le <b>dénominateur</b> <i>b</i> (en bas) dit en combien de parts <b>égales</b> on coupe l’unité. Le <b>numérateur</b> <i>a</i> (en haut) dit combien de ces parts on prend. On lit ${F(3,4)} « trois quarts » et ${F(2,5)} « deux cinquièmes ».</p></div>
<div class="idea"><p>Ici, l’unité est la barre entière. Plus le dénominateur est grand, plus chaque part est petite : un huitième est plus petit qu’un quart. Plus le numérateur est grand, plus on colorie de parts.</p></div>
<div class="ex"><p>Numérateur 3 et dénominateur 4 : la barre est coupée en 4 et on colorie 3 parts, c’est ${F(3,4)}. Numérateur 5 et dénominateur 4 : on remplit une barre entière, puis encore une part d’une deuxième barre. Donc ${F(5,4)} = 1 + ${F(1,4)}.</p></div>
<div class="warn"><p>Les parts doivent être égales. Une barre coupée en un gros morceau et trois petits n’est pas coupée en quarts.</p></div>
<p>Bouge les curseurs. Mets le numérateur à 0 : la fraction vaut 0. Mets-le égal au dénominateur : elle vaut 1.</p>`,
   params:[{id:'n',l:'Numérateur',min:0,max:12,v:3},{id:'d',l:'Dénominateur',min:1,max:12,v:4}],
   draw:v=>fracBar(v.n,v.d), info:v=>`${F(v.n,v.d)} = ${fmt(v.n/v.d,3)}${v.n>v.d?' : plus d’une barre entière':''}`},
  {kind:'Théorie',h:'Une fraction est aussi une division',p:`<p>Trois pizzas pour quatre amis : combien chacun en reçoit-il&nbsp;? On doit calculer 3 ÷ 4, qui ne tombe pas juste. La fraction donne la réponse exacte.</p>
<div class="def"><p>Pour deux nombres <i>a</i> et <i>b</i>, avec <i>b</i> ≠ 0 : ${F('a','b')} = <i>a</i> ÷ <i>b</i>. La barre de fraction est un signe de division.</p></div>
<div class="idea"><p>Coupe chaque pizza en 4. Chaque ami prend un quart de chaque pizza, donc 3 quarts en tout : 3 ÷ 4 = ${F(3,4)}. Partager 3 entre 4 ou prendre 3 parts d’une unité coupée en 4, c’est la même chose.</p></div>
<div class="ex"><p>${F(3,4)} = 3 ÷ 4 = 0,75. ${F(1,8)} = 0,125. ${F(7,4)} = 1,75 : plus de 1, car le numérateur dépasse le dénominateur. ${F(2,3)} = 0,666… : la division ne s’arrête jamais, la fraction est l’écriture exacte et 0,67 n’en est qu’un arrondi.</p></div>
<div class="warn"><p>Le dénominateur n’est jamais 0. Partager entre zéro personne n’a pas de sens : ${F(5,0)} n’existe pas. En revanche ${F(0,5)} = 0.</p></div>`,
   fig:fracBar(7,4)},
  {kind:'Théorie',h:'Fractions équivalentes : une même part, plusieurs noms',p:`<p>Regarde les trois barres : une moitié, deux quarts, quatre huitièmes. La longueur colorée est la même. Ces fractions ont l’air différentes, mais elles désignent le même nombre.</p>
<div class="def"><p>Deux fractions sont <b>équivalentes</b> si elles représentent la même part. On passe de l’une à l’autre en multipliant (ou en divisant) le numérateur <b>et</b> le dénominateur par un même nombre <i>k</i> non nul : ${F('a','b')} = ${F('a × k','b × k')}.</p></div>
<div class="why"><p>Multiplier par <i>k</i>, c’est couper chaque part en <i>k</i> morceaux. On a <i>k</i> fois plus de parts coloriées, mais chacune est <i>k</i> fois plus petite : la quantité ne change pas.</p></div>
<div class="ex"><p>${F(1,2)} = ${F(2,4)} = ${F(4,8)} = 0,5. Dans l’autre sens : ${F(6,9)} = ${F('6 ÷ 3','9 ÷ 3')} = ${F(2,3)}. Quand le haut et le bas n’ont plus de diviseur commun, comme 2 et 3, la fraction est <b>irréductible</b> : c’est son écriture la plus simple.</p></div>
<div class="warn"><p>Seules la multiplication et la division conservent la part. Ajouter 1 en haut et en bas change le nombre : ${F(1,2)} = 0,5 mais ${F(2,3)} ≈ 0,67.</p></div>`,
   fig:fracBar(1,2)+fracBar(2,4,'var(--spark)')+fracBar(4,8,'var(--accent)')},
  {kind:'Méthode',h:'Simplifier et amplifier une fraction',
   p:`Une même part s’écrit de plusieurs façons. <b>Amplifier</b>, c’est multiplier le numérateur et le dénominateur par le même nombre. <b>Simplifier</b>, c’est les diviser par un même diviseur commun. La part ne change pas : on coupe chaque morceau en morceaux plus petits, ou on les regroupe, sans rien ajouter ni enlever. On s’en sert pour comparer, pour additionner et pour donner un résultat simple.`,
   demo:{enonce:`Simplifier ${F(18,24)}, puis écrire ${F(3,4)} en huitièmes.`,
    etapes:[
     {f:'18 = 6 × 3 et 24 = 6 × 4',w:'On cherche un nombre qui divise à la fois le haut et le bas. Ici, 6 est le plus grand.'},
     {f:`${F(18,24)} = ${F('18 ÷ 6','24 ÷ 6')} = ${F(3,4)}`,w:'On divise le haut et le bas par 6. 3 et 4 n’ont plus de diviseur commun : la fraction est irréductible.'},
     {f:`8 = 4 × 2, donc ${F(3,4)} = ${F('3 × 2','4 × 2')} = ${F(6,8)}`,w:'Pour obtenir le dénominateur 8, on multiplie le bas par 2, donc le haut aussi.'}],
    conclusion:`${F(18,24)} = ${F(3,4)} = ${F(6,8)} : trois écritures de la même part.`},
   note:`<b>Piège :</b> ajouter le même nombre en haut et en bas change la part. ${F(1,2)} n’est pas égal à ${F(2,3)}.`},
  {h:'Même part, autre écriture',p:`Quelle fraction vaut autant que ${F(2,3)}&nbsp;?`,fig:fracBar(2,3)+fracBar(4,6),
   opts:[F(4,6),F(3,4),F(2,6),F(6,4)],ans:0,why:`Multiplier le haut et le bas par 2 ne change pas la part : ${F(2,3)} = ${F(4,6)}. Les deux barres ont la même longueur colorée.`},
  {h:'Colorie trois quarts',p:`La barre est coupée en 8. Combien de huitièmes faut-il colorier pour obtenir ${F(3,4)}&nbsp;?`,
   params:[{id:'n',l:'Parts coloriées',min:0,max:8,v:1}],draw:v=>fracBar(v.n,8)+fracBar(3,4,'var(--line)'),
   ok:v=>v.n===6,why:`${F(3,4)} = ${F(6,8)} : on multiplie haut et bas par 2.`},
  {kind:'Théorie',h:'Comparer deux fractions',p:`<p>Qui a mangé le plus de gâteau : celui qui a pris ${F(3,4)} ou celui qui a pris ${F(5,8)}&nbsp;? Les parts n’ont pas la même taille, on ne peut pas comparer 3 et 5 directement.</p>
<div class="prop"><p><b>Même dénominateur :</b> les parts ont la même taille, la plus grande fraction a le plus grand numérateur. <b>Même numérateur :</b> la plus grande fraction a le plus <b>petit</b> dénominateur, car ses parts sont plus grosses. <b>Sinon</b>, on écrit les deux fractions avec un même dénominateur, puis on compare les numérateurs.</p></div>
<div class="ex"><p>${F(3,4)} = ${F(6,8)}, et 6 > 5, donc ${F(3,4)} > ${F(5,8)}. Autre cas : ${F(2,3)} et ${F(3,5)}. Le dénominateur 15 convient aux deux : ${F(2,3)} = ${F(10,15)} et ${F(3,5)} = ${F(9,15)}. Donc ${F(2,3)} > ${F(3,5)}, de justesse. En décimal : 0,666… contre 0,6.</p></div>
<div class="idea"><p>Comparer avec 1 est souvent immédiat : une fraction est plus grande que 1 quand son numérateur dépasse son dénominateur, comme ${F(9,8)}.</p></div>
<div class="warn"><p>${F(1,3)} n’est pas plus grand que ${F(1,2)} sous prétexte que 3 > 2 : un tiers est une part plus petite qu’une moitié.</p></div>`,
   fig:fracBar(6,8)+fracBar(5,8,'var(--spark)')},
  {kind:'Méthode',h:'Additionner : réduire au même dénominateur',
   p:`On n’additionne que des parts de même taille. Si les dénominateurs diffèrent, on cherche un <b>dénominateur commun</b> : un multiple des deux, le plus petit si possible. On amplifie chaque fraction pour l’y amener, puis on additionne les numérateurs et on garde le dénominateur. Pour soustraire, c’est pareil. Pour <b>comparer</b> deux fractions, on les met aussi au même dénominateur : la plus grande a le plus grand numérateur.`,
   demo:{enonce:`Calculer ${F(2,3)} + ${F(1,4)}, puis ce qu’il reste de 1.`,
    etapes:[
     {f:'Multiples de 3 : 3, 6, 9, 12… Multiples de 4 : 4, 8, 12… Dénominateur commun : 12',w:'12 est le plus petit nombre divisible à la fois par 3 et par 4.'},
     {f:`${F(2,3)} = ${F(8,12)} et ${F(1,4)} = ${F(3,12)}`,w:'On amplifie : × 4 pour la première, × 3 pour la seconde.'},
     {f:`${F(8,12)} + ${F(3,12)} = ${F(11,12)}`,w:'Les parts ont maintenant la même taille : on additionne les numérateurs, le dénominateur reste 12.'},
     {f:`1 = ${F(12,12)}, donc 1 − ${F(11,12)} = ${F(1,12)}`,w:'Le tout s’écrit avec le dénominateur qu’on veut : ici, douze douzièmes.'}],
    conclusion:`${F(2,3)} + ${F(1,4)} = ${F(11,12)}, et il reste ${F(1,12)}.`},
   note:`<b>Erreur fréquente :</b> ${F(1,2)} + ${F(1,3)} n’est pas ${F(2,5)}. On n’additionne jamais les dénominateurs.`},
  {kind:'Défi',h:'Additionne',p:`${F(1,2)} + ${F(1,3)} = ${F('?',6)}. Quel est le numérateur&nbsp;?`,fig:fracBar(3,6)+fracBar(2,6,'var(--spark)'),
   ans:5,why:`On met tout en sixièmes : ${F(1,2)} = ${F(3,6)} et ${F(1,3)} = ${F(2,6)}. Donc ${F(3,6)} + ${F(2,6)} = ${F(5,6)}.`},
  {kind:'Méthode',h:'Multiplier des fractions, prendre une fraction d’une quantité',
   p:`Pour multiplier deux fractions, on multiplie les numérateurs entre eux et les dénominateurs entre eux. <b>Prendre une fraction d’une quantité</b>, c’est multiplier par cette fraction : les ${F(2,3)} de 30, c’est 30 × ${F(2,3)} = 20. Prendre la moitié d’une fraction, c’est la multiplier par ${F(1,2)}, donc doubler son dénominateur. On simplifie à la fin.`,
   demo:{enonce:`Une bouteille contient ${F(3,4)} de litre. Tu en bois les ${F(2,5)}. Quelle quantité bois-tu, en litres puis en centilitres&nbsp;?`,
    etapes:[
     {f:`${F(2,5)} de ${F(3,4)} L = ${F(2,5)} × ${F(3,4)}`,w:'« Les deux cinquièmes de » se traduit par une multiplication.'},
     {f:`= ${F('2 × 3','5 × 4')} = ${F(6,20)}`,w:'Haut avec haut, bas avec bas.'},
     {f:`= ${F(3,10)} L`,w:'On simplifie par 2.'},
     {f:`${F(3,10)} de 100 cL = 100 × ${F(3,10)} = 30 cL`,w:'1 L = 100 cL. Convertir, c’est encore prendre une fraction d’une quantité.'}],
    conclusion:`Tu bois ${F(3,10)} L, soit 30 cL.`},
   note:'Pour savoir qui a reçu la plus grande part d’un même tout, mets toutes les fractions au même dénominateur, puis compare les numérateurs.'},
  {h:'Une fraction d’un nombre',p:`Combien valent les ${F(3,5)} de 40 bonbons&nbsp;?`,ans:24,why:`40 × ${F(3,5)} = ${F(120,5)} = 24. Autrement dit : un cinquième de 40 vaut 8, donc trois cinquièmes valent 24.`},
  {kind:'Théorie',h:'Diviser par une fraction',p:`<p>Combien de quarts d’heure y a-t-il dans 3 heures&nbsp;? Chaque heure en contient 4, donc 12. On vient de calculer 3 ÷ ${F(1,4)} = 12 = 3 × 4 : diviser par un quart revient à multiplier par 4.</p>
<div class="def"><p>L’<b>inverse</b> de ${F('a','b')} (avec <i>a</i> et <i>b</i> non nuls) est ${F('b','a')} : on retourne la fraction. Leur produit vaut 1. <b>Diviser par une fraction, c’est multiplier par son inverse</b> : ${F('a','b')} ÷ ${F('c','d')} = ${F('a','b')} × ${F('d','c')}.</p></div>
<div class="idea"><p>Diviser, c’est se demander « combien de fois ça rentre ». Un huitième rentre 8 fois dans 1, donc diviser par ${F(1,8)} multiplie par 8.</p></div>
<div class="ex"><p>${F(3,4)} ÷ ${F(1,8)} = ${F(3,4)} × 8 = ${F(24,4)} = 6. Contrôle avec les barres : ${F(3,4)} = ${F(6,8)}, il y a bien 6 huitièmes dans trois quarts. Autre exemple : ${F(2,3)} ÷ ${F(4,5)} = ${F(2,3)} × ${F(5,4)} = ${F(10,12)} = ${F(5,6)}.</p></div>
<div class="warn"><p>On retourne la fraction par laquelle on divise, pas la première. Et 0 n’a pas d’inverse : on ne divise jamais par 0.</p></div>`},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li>${F('a','b')} : on coupe l’unité en <i>b</i> parts égales et on en prend <i>a</i>. C’est aussi <i>a</i> ÷ <i>b</i>, avec <i>b</i> ≠ 0.</li>
<li>Multiplier ou diviser le haut et le bas par un même nombre non nul donne une fraction équivalente. Simplifier jusqu’à l’écriture irréductible.</li>
<li>Pour comparer, additionner ou soustraire : même dénominateur d’abord, puis on travaille sur les numérateurs. On n’additionne jamais les dénominateurs.</li>
<li>Multiplier : haut par haut, bas par bas. « Les ${F(2,3)} de » se traduit par « × ${F(2,3)} ».</li>
<li>Diviser par ${F('c','d')}, c’est multiplier par ${F('d','c')}.</li>
<li>Piège : ajouter le même nombre en haut et en bas change la fraction.</li></ul></div>
<p>Les deux problèmes qui suivent mélangent ces règles : lis bien de quelle quantité on prend une fraction.</p>`},
  {kind:'Problème',h:'La recette pour quatre',
   p:`Une recette de gâteau pour 6 personnes demande ${F(3,4)} de litre de lait et ${F(2,3)} de tasse de sucre. Ce soir, vous n’êtes que 4. Tu veux garder exactement le même goût, donc réduire chaque ingrédient dans la même proportion.`,
   fig:fracBar(3,4)+fracBar(2,3,'var(--spark)'),
   parts:[
    {q:'a) Quelle fraction de la recette prépares-tu ?',opts:[F(3,2),F(2,3),F(1,2),F(4,10)],ans:1,hint:'Tu cuisines pour 4 personnes au lieu de 6.',why:`${F(4,6)} = ${F(2,3)} : tu prépares les deux tiers de la recette.`},
    {q:'b) Combien de litres de lait faut-il ?',unit:'L',ans:.5,tol:.001,hint:`Prendre ${F(2,3)} d’une quantité, c’est la multiplier par ${F(2,3)}.`,why:`${F(3,4)} × ${F(2,3)} = ${F(6,12)} = ${F(1,2)} L.`},
    {q:'c) Quelle fraction de tasse de sucre faut-il ? (fraction)',unit:'tasse',ans:4/9,tol:.003,hint:'Multiplie les numérateurs entre eux et les dénominateurs entre eux.',why:`${F(2,3)} × ${F(2,3)} = ${F(4,9)} de tasse, un peu moins d’une demi-tasse.`},
   ],
   sol:`On passe de 6 à 4 personnes : on prend ${F(4,6)} = ${F(2,3)} de chaque quantité.<br>Lait : ${F(3,4)} × ${F(2,3)} = ${F(6,12)} = ${F(1,2)} L.<br>Sucre : ${F(2,3)} × ${F(2,3)} = ${F(4,9)} de tasse.<br>Prendre une fraction d’une quantité revient toujours à multiplier par cette fraction.`},
  {kind:'Problème',h:'Le partage de la pizza',
   p:`Trois amis partagent une pizza de 480 g. Ana en mange ${F(1,3)}. Ben en mange ${F(3,8)}. Chloé mange ensuite la moitié de ce qui reste. On cherche ce qui reste à la fin et qui a mangé le plus.`,
   parts:[
    {q:'a) Ana et Ben ont mangé ensemble une fraction de dénominateur 24. Quel est son numérateur ?',lab:'?/24 :',ans:17,hint:'Écris les deux fractions en vingt-quatrièmes.',why:`${F(1,3)} = ${F(8,24)} et ${F(3,8)} = ${F(9,24)}, donc ${F(17,24)}.`},
    {q:'b) Chloé mange une fraction de la pizza entière de dénominateur 48. Quel est son numérateur ?',lab:'?/48 :',ans:7,hint:'Il reste d’abord 1 − 17/24. Chloé en prend la moitié.',why:`Il reste ${F(7,24)}. La moitié de ${F(7,24)} est ${F(7,48)}.`},
    {q:'c) Combien de grammes de pizza reste-t-il à la fin ?',unit:'g',ans:70,hint:'Après Chloé, il reste la même quantité que ce qu’elle a mangé.',why:`Il reste ${F(7,48)} de la pizza : 480 × ${F(7,48)} = 70 g.`},
    {q:'d) Qui a mangé le plus ?',opts:['Ana','Ben','Chloé','Ana et Ben autant'],ans:1,hint:'Compare les trois fractions avec le dénominateur 48.',why:`Ana : ${F(16,48)}, Ben : ${F(18,48)}, Chloé : ${F(7,48)}. Ben a mangé le plus.`},
   ],
   sol:`Ana et Ben : ${F(1,3)} + ${F(3,8)} = ${F(8,24)} + ${F(9,24)} = ${F(17,24)}.<br>Reste : 1 − ${F(17,24)} = ${F(7,24)}. Chloé en mange la moitié, soit ${F(7,48)} de la pizza.<br>Il reste ${F(7,48)}, soit 480 × 7 ÷ 48 = 70 g.<br>En quarante-huitièmes : Ana 16, Ben 18, Chloé 7. Ben a mangé le plus, avec 180 g.`},
 ]},

{id:'litteral',br:'alg',lv:'ecole',h:'Calcul littéral',p:'Développer, factoriser, et voir les formules comme des aires.',
 lessons:['Développer avec des rectangles','Factoriser','Identités remarquables','Réduire une expression'],
 steps:[
  {kind:'Théorie',h:'Une lettre pour un nombre qui varie',p:`<p>Le périmètre d’un carré de côté 3 cm vaut 4 × 3 = 12 cm, celui d’un carré de côté 5 cm vaut 4 × 5 = 20 cm. Le calcul est toujours le même, seul le côté change. Plutôt que de le refaire, on l’écrit une fois pour toutes avec une lettre : <i>P</i> = 4 × <i>c</i>.</p>
<div class="def"><p>Une <b>expression littérale</b> est un calcul dans lequel des lettres remplacent des nombres. Conventions d’écriture : 4 × <i>c</i> s’écrit <b>4<i>c</i></b>, 1<i>x</i> s’écrit <i>x</i>, et <i>x</i> × <i>x</i> s’écrit <b><i>x</i>²</b> (« <i>x</i> au carré »).</p></div>
<div class="idea"><p>Une lettre est une boîte vide : on peut y mettre n’importe quel nombre. L’expression est une recette qui dit quoi faire de ce nombre.</p></div>
<div class="ex"><p>Pour <i>c</i> = 7 : <i>P</i> = 4<i>c</i> = 4 × 7 = 28 cm et l’aire <i>A</i> = <i>c</i>² = 7 × 7 = 49 cm². Pour <i>x</i> = 5 : 2<i>x</i> + 3 = 2 × 5 + 3 = 13.</p></div>
<div class="warn"><p>4<i>c</i> veut dire 4 × <i>c</i> : si <i>c</i> = 2, alors 4<i>c</i> = 8, et non 42. Et <i>x</i>² n’est pas 2<i>x</i> : pour <i>x</i> = 5, <i>x</i>² = 25 alors que 2<i>x</i> = 10.</p></div>`},
  {h:'Développer, c’est découper un rectangle',p:`<p>Calcule 7 × 23 de tête. Astuce : 7 × 20 = 140 et 7 × 3 = 21, donc 7 × 23 = 161. Tu viens d’utiliser la <b>distributivité</b>, la règle qui permet de casser un produit en morceaux.</p>
<div class="def"><p><b>Distributivité</b> : pour tous nombres <i>a</i>, <i>b</i>, <i>c</i>, on a <i>a</i>(<i>b</i> + <i>c</i>) = <i>ab</i> + <i>ac</i>. Passer de gauche à droite, c’est <b>développer</b> : un produit devient une somme.</p></div>
<div class="idea"><p>Un rectangle de largeur <i>a</i> et de longueur <i>b</i> + <i>c</i> a pour aire <i>a</i>(<i>b</i> + <i>c</i>). Coupe-le en deux : un rectangle d’aire <i>ab</i> et un rectangle d’aire <i>ac</i>. L’aire totale n’a pas changé.</p></div>
<div class="ex"><p>3(<i>x</i> + 5) = 3<i>x</i> + 3 × 5 = 3<i>x</i> + 15. Contrôle pour <i>x</i> = 2 : 3 × 7 = 21 et 6 + 15 = 21.</p></div>
<div class="warn"><p>Le facteur multiplie <b>chaque</b> terme de la parenthèse : 3(<i>x</i> + 5) n’est pas 3<i>x</i> + 5. Sur la figure, ce serait oublier une partie du deuxième rectangle. Avec un moins, le signe suit : 2(<i>x</i> − 4) = 2<i>x</i> − 8.</p></div>`,
   params:[{id:'a',l:'a',min:1,max:4,v:2},{id:'b',l:'b',min:1,max:5,v:3},{id:'c',l:'c',min:1,max:4,v:2}],
   draw:v=>{ const P=plane({x:[-0.5,9.5],y:[-0.8,4.8],grid:false,axes:false});
     P.rect(0,0,v.b,v.a,{fill:'var(--math)',fo:.3,c:'var(--ink)',w:2}).rect(v.b,0,v.c,v.a,{fill:'var(--spark)',fo:.45,c:'var(--ink)',w:2});
     P.text(v.b/2,v.a/2,'ab',{a:'middle',dy:5,s:16}).text(v.b+v.c/2,v.a/2,'ac',{a:'middle',dy:5,s:16});
     P.text(v.b/2,0,'b',{a:'middle',dy:18}).text(v.b+v.c/2,0,'c',{a:'middle',dy:18}).text(0,v.a/2,'a',{a:'end',dx:-6,dy:5}); return P.svg(); },
   info:v=>`${v.a}(${v.b} + ${v.c}) = ${v.a*v.b} + ${v.a*v.c} = ${v.a*(v.b+v.c)}`},
  {kind:'Théorie',h:'Termes semblables : réduire une expression',p:`<p>Après un développement, on obtient souvent une longue somme comme 4<i>x</i> + 3 + 2<i>x</i> − 7. On veut l’écrire plus court, sans changer sa valeur.</p>
<div class="def"><p>Des <b>termes semblables</b> ont la même partie en lettres : 4<i>x</i> et 2<i>x</i>, ou 3<i>x</i>² et −<i>x</i>², ou deux nombres seuls. <b>Réduire</b>, c’est additionner les termes semblables en additionnant leurs coefficients (le nombre devant la lettre).</p></div>
<div class="idea"><p>3 pommes + 2 pommes = 5 pommes, mais 3 pommes + 2 poires restent 3 pommes + 2 poires. De même 3<i>x</i> + 2<i>x</i> = 5<i>x</i>, car c’est (3 + 2)<i>x</i> par distributivité, mais 3<i>x</i> + 2 reste tel quel.</p></div>
<div class="ex"><p>4<i>x</i> + 3 + 2<i>x</i> − 7 = (4<i>x</i> + 2<i>x</i>) + (3 − 7) = 6<i>x</i> − 4. Contrôle pour <i>x</i> = 1 : 4 + 3 + 2 − 7 = 2 et 6 − 4 = 2. Autre exemple : <i>x</i>² + 3<i>x</i> + 2<i>x</i>² = 3<i>x</i>² + 3<i>x</i>.</p></div>
<div class="warn"><p>2<i>x</i> + 3 n’est pas 5<i>x</i>. Et ne confonds pas <i>x</i> + <i>x</i> = 2<i>x</i> avec <i>x</i> × <i>x</i> = <i>x</i>². Les termes en <i>x</i> et en <i>x</i>² ne se regroupent pas.</p></div>`},
  {kind:'Théorie',h:'Double distributivité : un rectangle en quatre',p:`<p>Comment développer (<i>x</i> + 2)(<i>x</i> + 3), où les deux facteurs sont des sommes&nbsp;? On applique deux fois la distributivité.</p>
<div class="prop"><p>(<i>a</i> + <i>b</i>)(<i>c</i> + <i>d</i>) = <i>ac</i> + <i>ad</i> + <i>bc</i> + <i>bd</i>. Chaque terme de la première parenthèse multiplie chaque terme de la seconde : 2 × 2 = 4 produits.</p></div>
<div class="why"><p>On traite (<i>a</i> + <i>b</i>) comme un seul nombre : (<i>a</i> + <i>b</i>)<i>c</i> + (<i>a</i> + <i>b</i>)<i>d</i>, puis on développe encore chaque morceau. Sur la figure, un rectangle de côtés <i>x</i> + 3 et <i>x</i> + 2 se coupe en quatre rectangles : <i>x</i>², 3<i>x</i>, 2<i>x</i> et 6.</p></div>
<div class="ex"><p>(<i>x</i> + 2)(<i>x</i> + 3) = <i>x</i>² + 3<i>x</i> + 2<i>x</i> + 6 = <i>x</i>² + 5<i>x</i> + 6. Contrôle pour <i>x</i> = 1 : 3 × 4 = 12 et 1 + 5 + 6 = 12. Avec un signe : (<i>x</i> − 1)(<i>x</i> + 4) = <i>x</i>² + 4<i>x</i> − <i>x</i> − 4 = <i>x</i>² + 3<i>x</i> − 4.</p></div>
<div class="warn"><p>Il y a quatre produits, pas deux : (<i>x</i> + 2)(<i>x</i> + 3) n’est pas <i>x</i>² + 6. Sur la figure, oublier les deux rectangles du milieu, c’est perdre 3<i>x</i> + 2<i>x</i>. Pour ne rien oublier, relie chaque terme de gauche à chaque terme de droite, comme une poignée de main entre deux équipes.</p></div>`,
   fig:(()=>{ const P=plane({x:[-1.5,8.5],y:[-1.2,7.2],grid:false,axes:false,w:280});
     P.rect(0,0,4,4,{fill:'var(--math)',fo:.3,c:'var(--ink)',w:2}).rect(4,0,3,4,{fill:'var(--spark)',fo:.45,c:'var(--ink)',w:2}).rect(0,4,4,2,{fill:'var(--accent)',fo:.2,c:'var(--ink)',w:2}).rect(4,4,3,2,{fill:'var(--sci)',fo:.3,c:'var(--ink)',w:2});
     P.text(2,2,'x²',{a:'middle',dy:5,s:16}).text(5.5,2,'3x',{a:'middle',dy:5,s:15}).text(2,5,'2x',{a:'middle',dy:5,s:15}).text(5.5,5,'6',{a:'middle',dy:5,s:15});
     P.text(2,0,'x',{a:'middle',dy:18}).text(5.5,0,'3',{a:'middle',dy:18}).text(0,2,'x',{a:'end',dx:-6,dy:5}).text(0,5,'2',{a:'end',dx:-6,dy:5}); return P.svg(); })()},
  {kind:'Méthode',h:'Développer un produit',
   p:'Développer, c’est transformer un produit en somme. <b>Simple distributivité</b> : k(a + b) = ka + kb, le facteur devant multiplie chaque terme de la parenthèse. <b>Double distributivité</b> : (a + b)(c + d) = ac + ad + bc + bd, chaque terme de la première parenthèse multiplie chaque terme de la seconde. Un signe moins devant le facteur se distribue aussi.',
   demo:{enonce:'Développer −2(3x − 5), puis (x + 2)(x + 3).',
    etapes:[
     {f:'−2(3x − 5) = (−2)·3x + (−2)·(−5)',w:'Le facteur −2 multiplie chacun des deux termes, avec son signe.'},
     {f:'= −6x + 10',w:'Moins par moins donne plus.'},
     {f:'(x + 2)(x + 3) = x·x + x·3 + 2·x + 2·3',w:'Quatre produits : chaque terme de gauche avec chaque terme de droite. C’est l’aire d’un rectangle coupé en quatre.'},
     {f:'= x² + 3x + 2x + 6 = x² + 5x + 6',w:'On regroupe les termes semblables : 3x + 2x = 5x.'}],
    conclusion:'−2(3x − 5) = −6x + 10 et (x + 2)(x + 3) = x² + 5x + 6.'},
   note:'<b>Factoriser</b>, c’est le chemin inverse : 4x + 12 = 4(x + 3). On repère le facteur commun à tous les termes et on le sort.'},
  {h:'À toi',p:'Développe <i>3(x + 4)</i>.',opts:['3x + 4','3x + 12','3x + 7','x + 12'],ans:1,why:'Le 3 multiplie chaque terme de la parenthèse : 3·x + 3·4 = 3x + 12.'},
  {h:'(a + b)², un carré en quatre morceaux',p:`<p>(3 + 2)² = 5² = 25, alors que 3² + 2² = 9 + 4 = 13. Il manque 12. Où sont-ils passés&nbsp;?</p>
<div class="thm"><p>Pour tous nombres <i>a</i> et <i>b</i> : <b>(<i>a</i> + <i>b</i>)² = <i>a</i>² + 2<i>ab</i> + <i>b</i>²</b>. C’est la première <b>identité remarquable</b>.</p></div>
<div class="why"><p>(<i>a</i> + <i>b</i>)² = (<i>a</i> + <i>b</i>)(<i>a</i> + <i>b</i>). La double distributivité donne <i>a</i>² + <i>ab</i> + <i>ba</i> + <i>b</i>², et <i>ab</i> + <i>ba</i> = 2<i>ab</i>.</p></div>
<div class="idea"><p>Sur la figure, un carré de côté <i>a</i> + <i>b</i> se découpe en un carré <i>a</i>², un carré <i>b</i>² et <b>deux rectangles</b> <i>ab</i>. Les 12 manquants de l’exemple sont ces deux rectangles : 2 × 3 × 2 = 12.</p></div>
<div class="ex"><p>(<i>x</i> + 4)² = <i>x</i>² + 2 × 4 × <i>x</i> + 4² = <i>x</i>² + 8<i>x</i> + 16. Contrôle pour <i>x</i> = 1 : 5² = 25 et 1 + 8 + 16 = 25. Calcul mental : 31² = (30 + 1)² = 900 + 60 + 1 = 961.</p></div>`,
   params:[{id:'a',l:'a',min:1,max:4,v:3},{id:'b',l:'b',min:1,max:3,v:2}],
   draw:v=>{ const s=v.a+v.b,P=plane({x:[-0.8,7.3],y:[-0.8,7.3],grid:false,axes:false});
     P.rect(0,v.b,v.a,v.a,{fill:'var(--math)',fo:.35,c:'var(--ink)',w:2}).rect(v.a,0,v.b,v.b,{fill:'var(--spark)',fo:.5,c:'var(--ink)',w:2})
      .rect(0,0,v.a,v.b,{fill:'var(--accent)',fo:.2,c:'var(--ink)',w:2}).rect(v.a,v.b,v.b,v.a,{fill:'var(--accent)',fo:.2,c:'var(--ink)',w:2});
     P.text(v.a/2,v.b+v.a/2,'a²',{a:'middle',dy:5,s:16}).text(v.a+v.b/2,v.b/2,'b²',{a:'middle',dy:5,s:15}).text(v.a/2,v.b/2,'ab',{a:'middle',dy:5}).text(v.a+v.b/2,v.b+v.a/2,'ab',{a:'middle',dy:5});
     return P.svg(); },
   info:v=>`(${v.a} + ${v.b})² = ${v.a*v.a} + 2·${v.a*v.b} + ${v.b*v.b} = ${(v.a+v.b)**2}`,
   note:'<b>Erreur fréquente :</b> (a + b)² n’est pas a² + b². Il manque les deux rectangles ab.'},
  {kind:'Théorie',h:'Avec un signe moins : (a − b)² et (a + b)(a − b)',p:`<p>Deux autres produits reviennent sans cesse, et ils donnent des astuces de calcul mental : 99² ou 21 × 19 se calculent en quelques secondes.</p>
<div class="thm"><p><b>(<i>a</i> − <i>b</i>)² = <i>a</i>² − 2<i>ab</i> + <i>b</i>²</b> et <b>(<i>a</i> + <i>b</i>)(<i>a</i> − <i>b</i>) = <i>a</i>² − <i>b</i>²</b>.</p></div>
<div class="why"><p>Par double distributivité : (<i>a</i> − <i>b</i>)(<i>a</i> − <i>b</i>) = <i>a</i>² − <i>ab</i> − <i>ba</i> + <i>b</i>², avec « moins par moins donne plus » pour le dernier terme. Et (<i>a</i> + <i>b</i>)(<i>a</i> − <i>b</i>) = <i>a</i>² − <i>ab</i> + <i>ba</i> − <i>b</i>² : les deux termes du milieu s’annulent.</p></div>
<div class="ex"><p>99² = (100 − 1)² = 10 000 − 200 + 1 = 9 801. 21 × 19 = (20 + 1)(20 − 1) = 400 − 1 = 399. Avec des lettres : (<i>x</i> − 5)² = <i>x</i>² − 10<i>x</i> + 25.</p></div>
<div class="idea"><p>Lues de droite à gauche, ces égalités servent à <b>factoriser</b> : <i>x</i>² − 9 = <i>x</i>² − 3² = (<i>x</i> + 3)(<i>x</i> − 3).</p></div>
<div class="warn"><p>(<i>a</i> − <i>b</i>)² n’est pas <i>a</i>² − <i>b</i>² : pour <i>a</i> = 5 et <i>b</i> = 3, (5 − 3)² = 4 alors que 25 − 9 = 16.</p></div>`},
  {kind:'Méthode',h:'Utiliser les identités remarquables',
   p:'Trois produits reviennent si souvent qu’on les connaît par cœur : <b>(a + b)² = a² + 2ab + b²</b>, <b>(a − b)² = a² − 2ab + b²</b> et <b>(a + b)(a − b) = a² − b²</b>. Pour t’en servir, repère ce qui joue le rôle de a et de b, puis remplace.',
   demo:{enonce:'Développer (x − 3)² et (2x + 5)(2x − 5).',
    etapes:[
     {f:'(x − 3)² : a = x et b = 3',w:'On reconnaît la forme (a − b)².'},
     {f:'= x² − 2·x·3 + 3² = x² − 6x + 9',w:'Le double produit 2ab est le terme qu’on oublie le plus souvent.'},
     {f:'(2x + 5)(2x − 5) : a = 2x et b = 5',w:'Même a, même b, un signe + et un signe − : c’est la 3e identité.'},
     {f:'= (2x)² − 5² = 4x² − 25',w:'(2x)² = 4x² : le carré porte aussi sur le 2.'}],
    conclusion:'(x − 3)² = x² − 6x + 9 et (2x + 5)(2x − 5) = 4x² − 25.'}},
  {kind:'Défi',h:'Identité remarquable',p:'Développe <i>(x + 5)²</i>.',opts:['x² + 25','x² + 10x + 25','x² + 5x + 25','2x + 10'],ans:1,why:'(x + 5)² = x² + 2·5·x + 5² = x² + 10x + 25.'},
  {kind:'Méthode',h:'Réduire, remplacer, résoudre',
   p:'<b>Réduire</b>, c’est regrouper les termes de même nature : les x avec les x, les nombres avec les nombres. <b>Remplacer</b> x par une valeur donne un nombre : calcule les puissances, puis les produits, puis les sommes. Si on connaît la valeur de l’expression, on obtient une <b>équation</b> : on isole x en faisant la même opération des deux côtés.',
   demo:{enonce:'Un rectangle mesure x de large et x + 5 de long. Écrire son périmètre, le calculer pour x = 3, puis trouver x si le périmètre vaut 34.',
    etapes:[
     {f:'P = 2x + 2(x + 5)',w:'Périmètre = deux largeurs + deux longueurs.'},
     {f:'= 2x + 2x + 10 = 4x + 10',w:'On développe, puis on regroupe 2x + 2x.'},
     {f:'Pour x = 3 : P = 4·3 + 10 = 22',w:'On remplace x par 3 dans la forme réduite.'},
     {f:'4x + 10 = 34 ⟹ 4x = 24 ⟹ x = 6',w:'On enlève 10 des deux côtés, puis on divise les deux côtés par 4.'},
     {f:'Contrôle : 2·6 + 2·11 = 12 + 22 = 34 ✓',w:'On vérifie avec l’expression de départ.'}],
    conclusion:'P = 4x + 10. Pour x = 3, P = 22. Si P = 34, alors x = 6 : le rectangle mesure 6 sur 11.'},
   note:'Pour une différence comme (x + 2)² − x², développe d’abord, puis réduis : les x² s’annulent.'},
  {h:'Réduis',p:'Réduis <i>3x + 2(x − 1)</i>.',opts:['5x − 1','5x − 2','3x + 2x − 1','6x − 2'],ans:1,why:'2(x − 1) = 2x − 2, puis 3x + 2x = 5x : on obtient 5x − 2.'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li>Une lettre remplace un nombre. 4<i>x</i> = 4 × <i>x</i> et <i>x</i>² = <i>x</i> × <i>x</i>.</li>
<li>Distributivité : <i>k</i>(<i>a</i> + <i>b</i>) = <i>ka</i> + <i>kb</i>. Double distributivité : (<i>a</i> + <i>b</i>)(<i>c</i> + <i>d</i>) = <i>ac</i> + <i>ad</i> + <i>bc</i> + <i>bd</i>, quatre produits.</li>
<li>Réduire : on regroupe les termes semblables (les <i>x</i>, les <i>x</i>², les nombres) en additionnant leurs coefficients.</li>
<li>Identités : (<i>a</i> + <i>b</i>)² = <i>a</i>² + 2<i>ab</i> + <i>b</i>², (<i>a</i> − <i>b</i>)² = <i>a</i>² − 2<i>ab</i> + <i>b</i>², (<i>a</i> + <i>b</i>)(<i>a</i> − <i>b</i>) = <i>a</i>² − <i>b</i>².</li>
<li>Factoriser, c’est le chemin inverse : on sort le facteur commun.</li>
<li>Contrôle toujours un calcul en remplaçant <i>x</i> par une valeur simple, comme 1 ou 2.</li></ul></div>
<p>Dans les problèmes, écris d’abord l’expression avec <i>x</i>, puis réduis-la avant de calculer.</p>`},
  {kind:'Problème',h:'Le plan de la chambre',
   p:'Sur le plan d’une chambre rectangulaire, la largeur vaut <i>x</i> mètres et la longueur vaut 3 m de plus. Tu veux écrire l’aire et le périmètre en fonction de <i>x</i>, puis retrouver les dimensions à partir d’une mesure.',
   fig:(()=>{ const P=plane({x:[-1.5,8.5],y:[-1.2,5],grid:false,axes:false}); P.rect(0,0,7,4,{fill:'var(--math)',fo:.2,c:'var(--ink)',w:2}).text(3.5,0,'x + 3',{a:'middle',dy:18}).text(0,2,'x',{a:'end',dx:-8,dy:5}); return P.svg(); })(),
   parts:[
    {q:'a) Quelle expression donne l’aire de la chambre ?',opts:['x² + 3','2x + 3','x² + 3x','x² + 3x + 3'],ans:2,hint:'Aire = largeur × longueur, puis développe.',why:'x(x + 3) = x² + 3x.'},
    {q:'b) Quelle est l’aire si x = 4 ?',unit:'m²',ans:28,hint:'Remplace x par 4 dans ton expression.',why:'4² + 3·4 = 16 + 12 = 28 m² (ou 4 × 7).'},
    {q:'c) Quelle expression réduite donne le périmètre ?',opts:['4x + 6','2x + 6','4x + 3','x² + 6'],ans:0,hint:'Périmètre = 2 × largeur + 2 × longueur.',why:'2x + 2(x + 3) = 2x + 2x + 6 = 4x + 6.'},
    {q:'d) Le périmètre mesure 30 m. Quelle est la largeur ?',lab:'x =',unit:'m',ans:6,hint:'Résous 4x + 6 = 30.',why:'4x = 24, donc x = 6 m. La chambre fait 6 m sur 9 m.'},
   ],
   sol:'Aire : A = x(x + 3) = x² + 3x. Pour x = 4 : 28 m².<br>Périmètre : P = 2x + 2(x + 3) = 4x + 6.<br>Si P = 30 : 4x = 24 et x = 6. La chambre mesure 6 m sur 9 m, pour une aire de 54 m².'},
  {kind:'Problème',h:'Agrandir le jardin',
   p:'Un jardin carré a un côté de <i>x</i> mètres. On l’agrandit en ajoutant une bande de 2 m sur deux côtés : le nouveau jardin est un carré de côté <i>x + 2</i>. L’aire gagne ainsi 36 m². Quel était le côté du jardin de départ&nbsp;?',
   fig:(()=>{ const P=plane({x:[-1,8],y:[-1,8],grid:false,axes:false,w:260}); P.rect(0,0,7,7,{fill:'var(--spark)',fo:.4,c:'var(--ink)',w:2}).rect(0,0,5,5,{fill:'var(--math)',fo:.35,c:'var(--ink)',w:2}).text(2.5,2.5,'x²',{a:'middle',dy:5,s:16}).text(2.5,0,'x',{a:'middle',dy:16}).text(6,0,'2',{a:'middle',dy:16}); return P.svg(); })(),
   parts:[
    {q:'a) Développe (x + 2)².',opts:['x² + 4','x² + 4x + 4','x² + 2x + 4','x² + 4x + 2'],ans:1,hint:'(a + b)² = a² + 2ab + b².',why:'(x + 2)² = x² + 2·2·x + 2² = x² + 4x + 4.'},
    {q:'b) Que vaut l’aire gagnée (x + 2)² − x² une fois réduite ?',opts:['4','4x + 4','2x + 4','4x² + 4'],ans:1,hint:'Les x² s’annulent.',why:'x² + 4x + 4 − x² = 4x + 4. Sur la figure : deux bandes 2 × x et un carré 2 × 2.'},
    {q:'c) Quel était le côté du jardin de départ ?',lab:'x =',unit:'m',ans:8,hint:'Résous 4x + 4 = 36.',why:'4x = 32, donc x = 8 m.'},
    {q:'d) Quelle est l’aire du nouveau jardin ?',unit:'m²',ans:100,hint:'Le nouveau côté vaut x + 2.',why:'10² = 100 m². Contrôle : 100 − 64 = 36 m².'},
   ],
   sol:'L’aire gagnée vaut (x + 2)² − x² = x² + 4x + 4 − x² = 4x + 4.<br>On résout 4x + 4 = 36, d’où 4x = 32 et x = 8 m.<br>Le nouveau jardin mesure 10 m de côté, soit 100 m².<br>Contrôle : 100 − 64 = 36 m². Le piège serait d’écrire (x + 2)² = x² + 4, qui oublie les deux bandes.'},
 ]},

{id:'equations1',br:'alg',lv:'ecole',h:'Équations du 1er degré',p:'Trouver l’inconnue en gardant la balance en équilibre.',
 lessons:['La balance','Équations avec parenthèses','Mettre un problème en équation','Inéquations'],
 steps:[
  {h:'Une équation est une balance',p:`<p>« Je pense à un nombre. Je le triple, j’ajoute 2 et je trouve 11. Quel est mon nombre&nbsp;? » Pour répondre, on appelle le nombre <i>x</i> et on écrit 3<i>x</i> + 2 = 11.</p>
<div class="def"><p>Une <b>équation</b> est une égalité qui contient une inconnue, souvent notée <i>x</i>. Une <b>solution</b> est une valeur de <i>x</i> qui rend l’égalité vraie. <b>Résoudre</b>, c’est trouver toutes les solutions.</p></div>
<div class="idea"><p>Imagine une balance en équilibre. À gauche, trois boîtes de poids <i>x</i> et deux billes de poids 1. À droite, onze billes. Les deux plateaux pèsent pareil : c’est le signe =. On peut faire la même chose sur les deux plateaux sans casser l’équilibre.</p></div>
<div class="ex"><p>Teste <i>x</i> = 4 : 3 × 4 + 2 = 14, pas 11. Teste <i>x</i> = 3 : 3 × 3 + 2 = 11. Donc 3 est solution. Deviner marche ici, mais pas avec 5<i>x</i> − 4 = 2<i>x</i> + 7, dont la solution est ${F(11,3)} : il faut une méthode.</p></div>
<p>Avance le curseur : on enlève 2 billes de chaque plateau, puis on partage chaque plateau en trois.</p>`,
   params:[{id:'e',l:'Étape',min:0,max:2,v:0}],
   draw:v=>[balance({x:3,u:2},{x:0,u:11}),balance({x:3,u:0},{x:0,u:9}),balance({x:1,u:0},{x:0,u:3})][v.e],
   info:v=>['<b>3x + 2 = 11</b>','On enlève 2 de chaque côté : <b>3x = 9</b>','On divise chaque côté par 3 : <b>x = 3</b>'][v.e]},
  {kind:'Théorie',h:'Les deux règles de la balance',p:`<p>Pour trouver <i>x</i>, on transforme l’équation en une équation plus simple qui a les <b>mêmes solutions</b>, jusqu’à lire « <i>x</i> = … ». Deux règles suffisent.</p>
<div class="prop"><p><b>Règle 1 :</b> on peut ajouter ou soustraire un même nombre (ou un même terme en <i>x</i>) aux deux membres. <b>Règle 2 :</b> on peut multiplier ou diviser les deux membres par un même nombre <b>non nul</b>.</p></div>
<div class="why"><p>Si deux plateaux pèsent pareil, ils pèsent encore pareil quand on enlève 3 billes de chacun, ou quand on garde la moitié de chacun. L’équilibre est conservé, donc la solution aussi.</p></div>
<div class="ex"><p>2<i>x</i> + 3 = 9. On enlève 3 des deux côtés : 2<i>x</i> = 6. On divise les deux côtés par 2 : <i>x</i> = 3. Contrôle : 2 × 3 + 3 = 9. La figure montre la balance avant et après la première règle.</p></div>
<div class="idea"><p>« Faire passer de l’autre côté en changeant de signe » n’est qu’un raccourci de la règle 1 : soustraire 3 des deux côtés fait disparaître le + 3 à gauche et fait apparaître − 3 à droite.</p></div>
<div class="warn"><p>On ne divise jamais par 0, et on agit toujours sur <b>les deux</b> membres en entier : diviser seulement le côté gauche fausse tout.</p></div>`,
   fig:balance({x:2,u:3},{x:0,u:9})+balance({x:2,u:0},{x:0,u:6})},
  {kind:'Méthode',h:'Isoler x pas à pas',
   p:'Pour résoudre, on défait ce qui entoure x. 1) On regroupe les termes en x d’un côté et les nombres de l’autre, en ajoutant ou en soustrayant la même chose des deux côtés. 2) On divise les deux côtés par le nombre devant x. 3) On contrôle en remplaçant x dans l’équation de départ.',
   demo:{enonce:'Résoudre 7x − 4 = 3x + 8.',
    etapes:[
     {f:'7x − 4 − 3x = 3x + 8 − 3x ⟹ 4x − 4 = 8',w:'On enlève 3x des deux côtés : les x ne restent qu’à gauche.'},
     {f:'4x − 4 + 4 = 8 + 4 ⟹ 4x = 12',w:'On ajoute 4 des deux côtés pour isoler le terme en x.'},
     {f:'x = 12 ÷ 4 = 3',w:'On divise les deux côtés par 4.'},
     {f:'Contrôle : 7·3 − 4 = 17 et 3·3 + 8 = 17 ✓',w:'Les deux côtés valent la même chose : la balance est équilibrée.'}],
    conclusion:'La solution est x = 3.'}},
  {h:'À toi',p:'<i>5x − 7 = 18</i>. Combien vaut <i>x</i>&nbsp;?',lab:'x =',ans:5,why:'On ajoute 7 : 5x = 25. On divise par 5 : x = 5.'},
  {h:'Par où commencer&nbsp;?',p:'<i>4x + 3 = 2x + 11</i>. Quelle est une bonne première étape&nbsp;?',
   opts:['Soustraire 2x des deux côtés','Diviser seulement le côté gauche par 4','Ajouter 3 des deux côtés','Multiplier 2x par 11'],ans:0,
   why:'On regroupe les x d’un seul côté : 2x + 3 = 11, puis 2x = 8, donc x = 4.'},
  {kind:'Méthode',h:'Équations avec parenthèses',
   p:'Si x est dans une parenthèse, on <b>développe</b> d’abord : k(a + b) = ka + kb. On se ramène ainsi au cas précédent. Un signe moins devant une parenthèse change tous les signes à l’intérieur : −(x − 4) = −x + 4.',
   demo:{enonce:'Résoudre 2(x + 5) = 4(x − 1).',
    etapes:[
     {f:'2x + 10 = 4x − 4',w:'On développe chaque côté : le facteur multiplie chaque terme de sa parenthèse.'},
     {f:'10 + 4 = 4x − 2x ⟹ 14 = 2x',w:'On enlève 2x et on ajoute 4 des deux côtés : les x passent à droite, où ils sont plus nombreux.'},
     {f:'x = 7',w:'On divise les deux côtés par 2.'},
     {f:'Contrôle : 2·(7 + 5) = 24 et 4·(7 − 1) = 24 ✓',w:'On remplace x par 7 des deux côtés.'}],
    conclusion:'La solution est x = 7.'}},
  {h:'Avec parenthèses',p:'Résous <i>3(x − 2) = x + 4</i>.',lab:'x =',ans:5,why:'3x − 6 = x + 4, donc 2x = 10 et x = 5. Contrôle : 3·3 = 9 = 5 + 4.'},
  {kind:'Théorie',h:'Aucune solution, ou tous les nombres',p:`<p>Parfois, en regroupant les <i>x</i>, ils disparaissent tous. Il ne reste qu’une égalité entre deux nombres. Que conclure&nbsp;?</p>
<div class="prop"><p>Une équation du 1er degré a en général <b>une seule</b> solution. Mais si les <i>x</i> s’éliminent : si l’égalité restante est <b>fausse</b> (comme 3 = 5), l’équation n’a <b>aucune solution</b> ; si elle est <b>vraie</b> (comme 0 = 0), <b>tout nombre</b> est solution.</p></div>
<div class="ex"><p>2<i>x</i> + 3 = 2<i>x</i> + 5. On enlève 2<i>x</i> des deux côtés : 3 = 5, faux. Aucun nombre ne marche : à gauche on aura toujours 2 de moins qu’à droite.</p>
<p>2(<i>x</i> + 1) = 2<i>x</i> + 2. On développe : 2<i>x</i> + 2 = 2<i>x</i> + 2, puis 0 = 0, vrai. Les deux membres sont la même expression écrite autrement : tout nombre est solution. Test avec <i>x</i> = 10 : 22 = 22.</p></div>
<div class="idea"><p>En situation concrète : deux tarifs « 2 CHF par km plus 3 CHF » et « 2 CHF par km plus 5 CHF » ne coûtent jamais la même chose. Le second coûte toujours 2 CHF de plus.</p></div>
<div class="warn"><p>Trouver 0 = 0 ne veut pas dire « <i>x</i> = 0 ». Et trouver <i>x</i> = 0 est une vraie solution unique, très différente de « aucune solution ».</p></div>`},
  {kind:'Méthode',h:'Mettre un problème en équation',
   p:'1) <b>Choisis l’inconnue</b>, souvent ce qu’on demande : « soit x = … ». 2) <b>Exprime les autres quantités</b> en fonction de x. 3) <b>Traduis la phrase-clé</b> (« ensemble », « autant que », « le triple ») par une égalité. 4) Résous, puis <b>réponds par une phrase</b> et contrôle avec l’énoncé.',
   demo:{enonce:'Un stylo coûte 3 CHF de plus qu’un cahier. Deux cahiers et un stylo coûtent 18 CHF. Quel est le prix d’un cahier&nbsp;?',
    etapes:[
     {f:'Soit x le prix d’un cahier. Un stylo coûte x + 3.',w:'On nomme l’inconnue, puis on exprime l’autre prix avec elle.'},
     {f:'2x + (x + 3) = 18',w:'« Deux cahiers et un stylo coûtent 18 CHF » devient une égalité.'},
     {f:'3x + 3 = 18 ⟹ 3x = 15 ⟹ x = 5',w:'On réduit, puis on isole x.'},
     {f:'Contrôle : le stylo coûte 8 CHF, et 2 × 5 + 8 = 18 ✓',w:'On vérifie dans l’énoncé, pas seulement dans l’équation.'}],
    conclusion:'Un cahier coûte 5 CHF et un stylo 8 CHF.'},
   note:'Dans un problème d’âges, tout le monde vieillit du même nombre d’années : dans t ans, l’âge a devient a + t. Mets des parenthèses : « le triple de son âge dans t ans » s’écrit 3(9 + t), pas 3·9 + t.'},
  {kind:'Défi',h:'Mettre en équation',p:'Léa a trois fois l’âge de son frère. Ensemble, ils ont 48 ans. Quel âge a son frère&nbsp;?',unit:'ans',ans:12,
   why:'Frère : x. Léa : 3x. Donc x + 3x = 48, 4x = 48 et x = 12.'},
  {kind:'Théorie',h:'Inéquation : toute une demi-droite de solutions',p:`<p>« Avec 20 CHF, combien de billets à 3 CHF puis-je acheter&nbsp;? » On ne cherche pas une égalité mais une limite : 3<i>x</i> ≤ 20. C’est une <b>inéquation</b>.</p>
<div class="def"><p>Une inéquation compare deux expressions avec <, >, ≤ ou ≥. On lit ≤ « inférieur ou égal ». Ses solutions forment en général tout un morceau de la droite des nombres, par exemple « tous les nombres plus grands que 4 », noté <i>x</i> > 4.</p></div>
<div class="ex"><p><i>x</i> + 3 > 7 donne <i>x</i> > 4. Le nombre 4,5 est solution (7,5 > 7), 10 aussi, mais 4 ne l’est pas (7 > 7 est faux). Sur la figure, le rond vide en 4 dit « 4 exclu ».</p></div>
<div class="why"><p>Les deux règles de la balance marchent encore, sauf une : <b>multiplier ou diviser par un nombre négatif retourne le sens</b>. En effet 2 < 5, mais −2 > −5 : multiplier par −1 inverse l’ordre, comme un miroir autour de 0.</p></div>
<div class="ex"><p>−2<i>x</i> < 6. On divise par −2 et on retourne : <i>x</i> > −3. Contrôle : <i>x</i> = 0 donne 0 < 6, vrai ; <i>x</i> = −4 donne 8 < 6, faux.</p></div>`,
   fig:(()=>{ const P=plane({x:[-1.5,10.5],y:[-1.1,1.1],grid:false,axes:false});
     P.seg(-1.2,0,10.2,0,{c:'var(--muted)',w:1.5}); for(let k=-1;k<=10;k++){ P.seg(k,-0.15,k,0.15,{c:'var(--muted)',w:1.5}).text(k,0,k<0?'−1':String(k),{a:'middle',dy:24,s:11,c:'var(--muted)'}); }
     P.seg(4,0,10.2,0,{c:'var(--accent)',w:5}).circ(4,0,0.22,{c:'var(--accent)',w:2.5,fill:'var(--surface)',fo:1}).text(7,0,'x > 4',{a:'middle',dy:-12,s:13,c:'var(--accent)'}); return P.svg(); })()},
  {kind:'Méthode',h:'Résoudre une inéquation',
   p:'Une <b>inéquation</b> (<, >, ≤, ≥) se résout comme une équation, avec une règle en plus : si on multiplie ou divise les deux côtés par un nombre <b>négatif</b>, on <b>retourne</b> le sens de l’inégalité. La solution est un ensemble de nombres. Si l’inconnue est un nombre entier (de films, de personnes), on cherche le premier entier qui convient.',
   demo:{enonce:'Un abonnement coûte 20 CHF, plus 4 CHF par séance. Sans abonnement, une séance coûte 6 CHF. À partir de combien de séances l’abonnement est-il strictement moins cher&nbsp;?',
    etapes:[
     {f:'20 + 4x < 6x',w:'Avec x séances, on traduit « moins cher » par une inégalité stricte.'},
     {f:'20 < 2x',w:'On enlève 4x des deux côtés : le sens ne change pas.'},
     {f:'x > 10',w:'On divise par 2, un nombre positif : le sens reste le même.'},
     {f:'Le premier entier strictement supérieur à 10 est 11.',w:'Pour 10 séances, les deux tarifs sont égaux (60 CHF) : il en faut une de plus.'}],
    conclusion:'Dès 11 séances, l’abonnement est plus avantageux.'},
   note:'Exemple de retournement : −3x < 12 donne x > −4, car on divise par −3.'},
  {h:'Le premier entier',p:'Quel est le plus petit nombre entier <i>x</i> tel que <i>3x + 5 > 20</i>&nbsp;?',lab:'x =',ans:6,why:'3x > 15, donc x > 5. Le plus petit entier strictement supérieur à 5 est 6.'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li>Une solution d’une équation est une valeur de <i>x</i> qui rend l’égalité vraie. On la contrôle en remplaçant <i>x</i> dans l’équation de départ.</li>
<li>Règles de la balance : on ajoute ou soustrait la même chose des deux côtés ; on multiplie ou divise les deux côtés par un même nombre non nul.</li>
<li>Ordre de travail : développer les parenthèses, regrouper les <i>x</i> d’un côté et les nombres de l’autre, diviser par le coefficient de <i>x</i>.</li>
<li>Si les <i>x</i> disparaissent : égalité fausse, aucune solution ; égalité vraie, tout nombre est solution.</li>
<li>Mettre en équation : choisir l’inconnue, exprimer le reste avec elle, traduire la phrase-clé, répondre par une phrase.</li>
<li>Inéquation : mêmes règles, mais on retourne le sens si on multiplie ou divise par un nombre négatif.</li></ul></div>`},
  {kind:'Problème',h:'Avec ou sans carte',
   p:'Au cinéma, un billet coûte 15 CHF. Avec la carte annuelle, qui coûte 30 CHF, chaque billet ne coûte plus que 10 CHF. On note <i>x</i> le nombre de films vus dans l’année. À partir de combien de films la carte vaut-elle la peine&nbsp;?',
   parts:[
    {q:'a) Combien paie-t-on pour 4 films avec la carte ?',unit:'CHF',ans:70,hint:'Prix de la carte + prix des billets.',why:'30 + 4 × 10 = 70 CHF (contre 60 CHF sans carte).'},
    {q:'b) Pour combien de films les deux formules coûtent-elles la même chose ?',lab:'x =',ans:6,hint:'Résous 15x = 30 + 10x.',why:'15x − 10x = 30, donc 5x = 30 et x = 6.'},
    {q:'c) Pour 10 films, combien économise-t-on avec la carte ?',unit:'CHF',ans:20,hint:'Calcule les deux prix et fais la différence.',why:'Sans carte : 150 CHF. Avec carte : 30 + 100 = 130 CHF. On économise 20 CHF.'},
    {q:'d) À partir de combien de films la carte est-elle strictement plus avantageuse ?',ans:7,hint:'Il faut 30 + 10x < 15x, avec x entier.',why:'30 < 5x donne x > 6. Le premier entier est 7.'},
   ],
   sol:'Sans carte : 15x. Avec carte : 30 + 10x.<br>Égalité : 15x = 30 + 10x, donc 5x = 30 et x = 6 films.<br>La carte est plus avantageuse si 30 + 10x < 15x, soit x > 6.<br>Dès 7 films, la carte fait gagner de l’argent : 5 CHF de plus par film au-delà de 6.'},
  {kind:'Problème',h:'Le triple de son âge',
   p:'Un père a 41 ans et sa fille 9 ans. On se demande dans combien d’années le père aura exactement le triple de l’âge de sa fille. Puis on remonte le temps : il y a combien d’années avait-il cinq fois son âge&nbsp;?',
   parts:[
    {q:'a) On note t le nombre d’années à attendre. Quelle équation traduit le problème ?',opts:['41 + t = 3·9 + t','3(41 + t) = 9 + t','41 + t = 3(9 + t)','41 = 3(9 + t)'],ans:2,hint:'Les deux vieillissent de t années.',why:'Dans t ans, le père a 41 + t ans et sa fille 9 + t. Le père doit avoir le triple : 41 + t = 3(9 + t).'},
    {q:'b) Résous l’équation.',lab:'t =',unit:'ans',ans:7,hint:'Développe 3(9 + t), puis regroupe les t d’un côté.',why:'41 + t = 27 + 3t, donc 14 = 2t et t = 7.'},
    {q:'c) Quel âge aura le père à ce moment-là ?',unit:'ans',ans:48,hint:'Ajoute t à 41.',why:'41 + 7 = 48 ans, et sa fille aura 16 ans : 3 × 16 = 48.'},
    {q:'d) Il y a combien d’années le père avait-il exactement 5 fois l’âge de sa fille ?',unit:'an(s)',ans:1,hint:'Il y a s années : 41 − s = 5(9 − s).',why:'41 − s = 45 − 5s, donc 4s = 4 et s = 1. Il y a un an : 40 = 5 × 8.'},
   ],
   sol:'Dans t ans : 41 + t = 3(9 + t), soit 41 + t = 27 + 3t, donc t = 7. Le père aura 48 ans et sa fille 16.<br>Il y a s ans : 41 − s = 5(9 − s), soit 41 − s = 45 − 5s, donc 4s = 4 et s = 1.<br>Contrôle : l’an dernier, le père avait 40 ans et sa fille 8.<br>Point clé : les deux personnes vieillissent du même nombre d’années, d’où la parenthèse.'},
 ]},

{id:'proportion',br:'ana',lv:'ecole',h:'Proportionnalité et pourcentages',p:'Règle de trois, pourcentages, TVA et soldes.',
 lessons:['Grandeurs proportionnelles','Pourcentages','Hausses et baisses successives','Échelles et vitesses'],
 steps:[
  {h:'Proportionnel = droite qui passe par 0',p:`<p>Au marché, 1 kg de pommes coûte 2,50 CHF. Deux fois plus de pommes coûtent deux fois plus cher, trois fois plus coûtent trois fois plus. Ce lien très régulier s’appelle la <b>proportionnalité</b>.</p>
<div class="def"><p>Deux grandeurs <i>x</i> et <i>y</i> sont <b>proportionnelles</b> s’il existe un nombre <i>k</i>, toujours le même, tel que <i>y</i> = <i>k</i> · <i>x</i>. Ce nombre <i>k</i> est le <b>coefficient de proportionnalité</b>. Ici, <i>k</i> est le prix au kilo.</p></div>
<div class="idea"><p>Sur le graphique, les points (quantité ; prix) sont alignés sur une droite qui <b>passe par l’origine</b> : 0 kg coûte 0 CHF. Plus <i>k</i> est grand, plus la droite est raide. Bouge le curseur pour le voir.</p></div>
<div class="ex"><p>Avec <i>k</i> = 2,5 : 2 kg coûtent 2,5 × 2 = 5 CHF et 4 kg coûtent 2,5 × 4 = 10 CHF. Doubler la quantité double bien le prix.</p></div>
<div class="warn"><p>Tout ce qui augmente n’est pas proportionnel. Un taxi à 5 CHF de prise en charge plus 2 CHF par km coûte 7 CHF pour 1 km et 9 CHF pour 2 km : pas le double. Sa droite ne passe pas par 0.</p></div>`,
   params:[{id:'p',l:'Prix au kilo',min:1,max:6,step:.5,v:2.5,u:' CHF'}],
   draw:v=>{ const P=plane({x:[-0.4,5.5],y:[-2,32],h:260,step:1,grid:false,lx:1,ly:10});
     for(let y=0;y<=30;y+=10) P.seg(0,y,5.5,y,{c:'var(--line)',w:1}); P.fn(x=>v.p*x,{from:0});
     [1,2,3,4,5].forEach(x=>P.dot(x,v.p*x,{r:5})); P.text(5.4,0,'kg',{a:'end',dy:-6,c:'var(--muted)'}); return P.svg(); },
   info:v=>`1 kg → ${fmt(v.p)} CHF · 2 kg → ${fmt(2*v.p)} CHF · 4 kg → ${fmt(4*v.p)} CHF`},
  {kind:'Théorie',h:'Le tableau de proportionnalité',p:`<p>Pour organiser une situation proportionnelle, on range les valeurs dans un tableau à deux lignes. Le tableau montre d’un coup d’œil comment passer d’une ligne à l’autre.</p>
<table style="border-collapse:collapse;margin:8px 0"><tr><td style="border:1px solid var(--line);padding:4px 10px">Cahiers</td><td style="border:1px solid var(--line);padding:4px 10px">1</td><td style="border:1px solid var(--line);padding:4px 10px">4</td><td style="border:1px solid var(--line);padding:4px 10px">6</td><td style="border:1px solid var(--line);padding:4px 10px">10</td></tr><tr><td style="border:1px solid var(--line);padding:4px 10px">Prix (CHF)</td><td style="border:1px solid var(--line);padding:4px 10px">2,50</td><td style="border:1px solid var(--line);padding:4px 10px">10</td><td style="border:1px solid var(--line);padding:4px 10px">15</td><td style="border:1px solid var(--line);padding:4px 10px">25</td></tr></table>
<div class="prop"><p>Un tableau est de proportionnalité quand on passe de la 1re ligne à la 2e en multipliant <b>toujours par le même nombre</b> <i>k</i>. Conséquences : si on multiplie une colonne par un nombre, l’autre ligne suit ; et la somme de deux colonnes est encore une colonne.</p></div>
<div class="ex"><p>Ici <i>k</i> = 10 ÷ 4 = 2,5 : c’est le prix d’un cahier, la colonne « 1 ». 6 cahiers coûtent 6 × 2,5 = 15 CHF. 10 cahiers, c’est 4 + 6 cahiers : 10 + 15 = 25 CHF.</p></div>
<div class="idea"><p>Passer par la colonne « 1 », c’est la <b>règle de trois</b> : on divise pour trouver la valeur d’une unité, puis on multiplie.</p></div>
<div class="warn"><p>Avant de calculer, vérifie que les quotients prix ÷ quantité sont tous égaux. Si 4 cahiers coûtent 10 CHF mais 8 cahiers 18 CHF (une promotion), le tableau n’est pas proportionnel.</p></div>`},
  {kind:'Méthode',h:'La règle de trois : passer par l’unité',
   p:'Deux grandeurs sont <b>proportionnelles</b> si on passe de l’une à l’autre en multipliant toujours par le même nombre. Pour calculer une valeur inconnue, on <b>passe par l’unité</b> : on calcule ce que vaut 1, puis on multiplie. Vérifie d’abord que la situation est proportionnelle : le double de quantité doit coûter le double.',
   demo:{enonce:'4 cahiers coûtent 10 CHF. Combien coûtent 7 cahiers&nbsp;?',
    etapes:[
     {f:'1 cahier : 10 ÷ 4 = 2,50 CHF',w:'On divise par 4 pour trouver le prix d’un seul cahier.'},
     {f:'7 cahiers : 7 × 2,50 = 17,50 CHF',w:'On multiplie par le nombre voulu.'},
     {f:'Contrôle : 7 est un peu moins que le double de 4, et 17,50 un peu moins que le double de 10 ✓',w:'Un ordre de grandeur évite les erreurs grossières.'}],
    conclusion:'7 cahiers coûtent 17,50 CHF.'}},
  {h:'Règle de trois',p:'3 kg de pommes coûtent 7,50 CHF. Combien coûtent 5 kg&nbsp;?',unit:'CHF',ans:12.5,tol:.001,why:'Prix au kilo : 7,50 ÷ 3 = 2,50 CHF. Pour 5 kg : 5 × 2,50 = 12,50 CHF.'},
  {kind:'Théorie',h:'Un pourcentage est une fraction de 100',p:`<p>« 40 % des élèves viennent à vélo », « −30 % sur les vestes » : les pourcentages permettent de comparer des parts même quand les totaux sont différents, en ramenant tout à 100.</p>
<div class="def"><p><i>t</i> % se lit « <i>t</i> pour cent » et veut dire ${F('t',100)}. Prendre <i>t</i> % d’une quantité, c’est la multiplier par ${F('t',100)}.</p></div>
<div class="ex"><p>15 % de 80 CHF : 0,15 × 80 = 12 CHF. 25 % = ${F(25,100)} = ${F(1,4)} : prendre 25 %, c’est prendre le quart. 50 % est la moitié, 10 % le dixième.</p></div>
<div class="ex"><p>Dans l’autre sens : 12 filles dans une classe de 30 élèves, c’est ${F(12,30)} = 0,4 = ${F(40,100)}, donc 40 % de filles. On divise la partie par le total, puis on multiplie par 100.</p></div>
<div class="idea"><p>Un pourcentage est un coefficient de proportionnalité : la part est proportionnelle au total. 10 % de 300 vaut 30, 10 % de 600 vaut 60.</p></div>
<div class="warn"><p>Un pourcentage n’a de sens que si on sait <b>de quoi</b> on le prend. 10 % de 50 et 10 % de 500 ne sont pas la même somme.</p></div>`},
  {kind:'Théorie',h:'Augmenter de t %, c’est multiplier par 1 + t/100',p:`<p>Un prix de 80 CHF augmente de 15 %. On peut calculer la hausse, 12 CHF, puis l’ajouter : 92 CHF. Il existe un chemin plus court, une seule multiplication.</p>
<div class="prop"><p>Augmenter de <i>t</i> %, c’est multiplier par <b>1 + ${F('t',100)}</b>. Baisser de <i>t</i> %, c’est multiplier par <b>1 − ${F('t',100)}</b>. Ce nombre s’appelle le <b>coefficient multiplicateur</b>.</p></div>
<div class="why"><p>80 + 15 % de 80 = 80 × 1 + 80 × 0,15 = 80 × (1 + 0,15) = 80 × 1,15. C’est la distributivité à l’envers : on factorise par 80.</p></div>
<div class="ex"><p>Hausse de 15 % : 80 × 1,15 = 92 CHF. Baisse de 10 % : 92 × 0,9 = 82,80 CHF. Pour retrouver un prix avant une hausse de 15 %, on <b>divise</b> par 1,15 : 92 ÷ 1,15 = 80.</p></div>
<div class="warn"><p>Une hausse de 10 % suivie d’une baisse de 10 % ne ramène pas au départ : 100 × 1,1 = 110, puis 110 × 0,9 = 99. La baisse porte sur 110, une somme plus grande que 100. Les coefficients successifs se <b>multiplient</b> : 1,1 × 0,9 = 0,99.</p></div>`},
  {kind:'Méthode',h:'Le coefficient multiplicateur',
   p:'Augmenter de t %, c’est multiplier par <b>1 + t/100</b>. Baisser de t %, c’est multiplier par <b>1 − t/100</b>. Pour des variations successives, on <b>multiplie les coefficients</b>, on ne les additionne pas. Le coefficient global se relit en pourcentage : 0,9 signifie −10 %, 1,035 signifie +3,5 %. Pour retrouver un prix de départ, on divise par le coefficient.',
   demo:{enonce:'Un prix de 80 CHF augmente de 15 %, puis baisse de 10 %. Quel est le prix final, et quelle est la variation totale&nbsp;?',
    etapes:[
     {f:'+15 % → × 1,15 ; −10 % → × 0,9',w:'On traduit chaque pourcentage en coefficient.'},
     {f:'80 × 1,15 = 92 CHF, puis 92 × 0,9 = 82,80 CHF',w:'La baisse porte sur le nouveau prix, 92 CHF, pas sur 80 CHF.'},
     {f:'Coefficient global : 1,15 × 0,9 = 1,035',w:'On multiplie les coefficients.'},
     {f:'1,035 = 1 + 3,5/100 : hausse de 3,5 %',w:'On relit le coefficient. Contrôle : 80 × 1,035 = 82,80 ✓'}],
    conclusion:'Le prix final est 82,80 CHF : une hausse de 3,5 %, et non de 5 %.'},
   note:'Prix TTC = prix HT × (1 + taux de TVA). À l’envers : si 216,20 CHF est un prix TTC avec une TVA de 8,1 %, le prix HT vaut 216,20 ÷ 1,081 = 200 CHF.'},
  {h:'Le piège des pourcentages',p:'Un prix augmente de 20 %, puis baisse de 20 %. Au final&nbsp;?',
   opts:['Il revient au prix de départ','Il a baissé de 4 %','Il a monté de 4 %','Il a baissé de 2 %'],ans:1,
   why:'×1,2 puis ×0,8 donne ×0,96. La baisse s’applique à un montant plus grand, donc on perd 4 %.'},
  {kind:'Défi',h:'La TVA',p:'Une facture fait 200 CHF hors taxe. Avec la TVA suisse de 8,1 %, combien paie-t-on&nbsp;?',unit:'CHF',ans:216.2,tol:.001,why:'200 × 1,081 = 216,20 CHF.'},
  {kind:'Théorie',h:'Vitesse et échelle : deux proportionnalités cachées',p:`<p>Une voiture roule à vitesse constante, une carte réduit un paysage : dans les deux cas, une grandeur est proportionnelle à une autre, et le coefficient porte un nom.</p>
<div class="def"><p>À vitesse constante, la <b>distance</b> parcourue est proportionnelle à la <b>durée</b> : distance = vitesse × durée. La vitesse en km/h est la distance parcourue en une heure. Sur une carte à l’<b>échelle 1 : <i>n</i></b>, la longueur réelle est proportionnelle à la longueur sur la carte, avec le coefficient <i>n</i>.</p></div>
<div class="ex"><p>À 60 km/h pendant 2,5 h : 60 × 2,5 = 150 km. Pendant 45 min, soit ${F(45,60)} = 0,75 h : 60 × 0,75 = 45 km. Sur une carte au 1:25 000, 1 cm représente 25 000 cm, c’est-à-dire 250 m.</p></div>
<div class="idea"><p>On retrouve les trois formes d’une même relation : distance = vitesse × durée, durée = distance ÷ vitesse, vitesse = distance ÷ durée.</p></div>
<div class="warn"><p>Les heures ne sont pas décimales : 1 h 30 min = 1,5 h, pas 1,3 h, car 30 min est la moitié d’une heure. Et avant d’utiliser une échelle, mets les deux longueurs dans la même unité.</p></div>`},
  {kind:'Méthode',h:'Échelles et vitesses',
   p:'Une échelle <b>1 : n</b> veut dire que 1 cm sur la carte vaut n cm en vrai. Longueur réelle = longueur sur la carte × n, puis on convertit (1 km = 100 000 cm). Pour retrouver n : n = longueur réelle ÷ longueur sur la carte, dans la même unité. À vitesse constante : <b>durée = distance ÷ vitesse</b>. Pour passer des heures aux minutes, on multiplie par 60.',
   demo:{enonce:'Sur une carte au 1:25 000, un chemin mesure 12 cm. Combien de temps faut-il pour le parcourir à 4 km/h&nbsp;?',
    etapes:[
     {f:'12 × 25 000 = 300 000 cm',w:'On multiplie la longueur sur la carte par le dénominateur de l’échelle.'},
     {f:'300 000 cm = 3 000 m = 3 km',w:'On divise par 100 pour avoir des mètres, puis par 1 000 pour avoir des kilomètres.'},
     {f:'Durée : 3 ÷ 4 = 0,75 h',w:'Distance ÷ vitesse, en km et en km/h.'},
     {f:'0,75 × 60 = 45 min',w:'Une heure fait 60 minutes.'}],
    conclusion:'Le chemin mesure 3 km et se parcourt en 45 minutes.'},
   note:'Échelle inconnue : si ces 3 km mesurent 6 cm sur une autre carte, n = 300 000 ÷ 6 = 50 000. C’est une carte au 1:50 000.'},
  {h:'Sur la carte',p:'Sur une carte au 1:20 000, deux villages sont à 7 cm l’un de l’autre. Quelle est la distance réelle&nbsp;?',unit:'km',ans:1.4,tol:.001,why:'7 × 20 000 = 140 000 cm = 1 400 m = 1,4 km.'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li>Proportionnel : <i>y</i> = <i>k</i> · <i>x</i> avec <i>k</i> fixe. Le graphique est une droite qui passe par l’origine.</li>
<li>Règle de trois : on passe par l’unité (on divise), puis on multiplie. Vérifie d’abord que la situation est proportionnelle.</li>
<li><i>t</i> % = ${F('t',100)}. Pourcentage d’une partie : partie ÷ total × 100.</li>
<li>Hausse de <i>t</i> % : × (1 + ${F('t',100)}). Baisse : × (1 − ${F('t',100)}). Variations successives : on multiplie les coefficients. Retour en arrière : on divise.</li>
<li>Échelle 1 : <i>n</i> : réel = carte × <i>n</i>, dans la même unité (1 km = 100 000 cm).</li>
<li>Distance = vitesse × durée, avec la durée en heures décimales.</li></ul></div>
<p>Dans les problèmes, écris chaque étape avec son unité.</p>`},
  {kind:'Problème',h:'Soldes et carte fidélité',
   p:'Une veste coûte 180 CHF. Pendant les soldes, elle est à −30 %. À la caisse, ta carte fidélité donne encore −10 % sur le prix soldé. Le vendeur affirme que tu as eu « 40 % de rabais ». Vérifie.',
   parts:[
    {q:'a) Quel est le prix soldé ?',unit:'CHF',ans:126,tol:.001,hint:'Baisser de 30 %, c’est multiplier par 0,7.',why:'180 × 0,7 = 126 CHF.'},
    {q:'b) Combien paies-tu à la caisse ?',unit:'CHF',ans:113.4,tol:.001,hint:'La 2e baisse porte sur 126 CHF.',why:'126 × 0,9 = 113,40 CHF.'},
    {q:'c) Quel est le pourcentage total de réduction ?',unit:'%',ans:37,tol:.001,hint:'Le coefficient total est 0,7 × 0,9.',why:'0,7 × 0,9 = 0,63. Tu paies 63 % du prix, donc la réduction totale est de 37 %.'},
    {q:'d) Le vendeur a-t-il raison ?',opts:['Oui, 30 % + 10 % = 40 %','Non, les 10 % portent sur un prix déjà réduit','Non, la réduction totale dépasse 40 %','Oui, si on paie comptant'],ans:1,hint:'Compare 40 % de 180 et la réduction réelle.',why:'Les 10 % sont pris sur 126 CHF, pas sur 180 CHF. On ne peut pas additionner des pourcentages successifs.'},
   ],
   sol:'Prix soldé : 180 × 0,7 = 126 CHF.<br>Prix final : 126 × 0,9 = 113,40 CHF.<br>Coefficient global : 0,7 × 0,9 = 0,63, soit une réduction de 37 % (66,60 CHF).<br>Avec −40 %, la veste coûterait 108 CHF. Les pourcentages successifs se multiplient, ils ne s’additionnent pas.'},
  {kind:'Problème',h:'La randonnée sur la carte',
   p:'Sur une carte au 1:50 000, le sentier d’une randonnée mesure 18 cm. Tu marches à 4,5 km/h en moyenne et tu prévois une pause de 20 minutes. Un ami a une autre carte où le même sentier mesure 36 cm.',
   parts:[
    {q:'a) Quelle est la longueur réelle du sentier ?',unit:'km',ans:9,tol:.001,hint:'1 cm sur la carte vaut 50 000 cm en vrai. 1 km = 100 000 cm.',why:'18 × 50 000 = 900 000 cm = 9 km.'},
    {q:'b) Combien d’heures marches-tu ?',unit:'h',ans:2,tol:.001,hint:'Durée = distance ÷ vitesse.',why:'9 ÷ 4,5 = 2 h.'},
    {q:'c) Combien de minutes dure la sortie, pause comprise ?',unit:'min',ans:140,hint:'Convertis les heures en minutes.',why:'2 h = 120 min, plus 20 min de pause : 140 min.'},
    {q:'d) Quelle est l’échelle de la carte de ton ami ? (1 : ?)',lab:'1 :',ans:25000,hint:'36 cm représentent les mêmes 900 000 cm.',why:'900 000 ÷ 36 = 25 000. C’est une carte au 1:25 000, deux fois plus détaillée.'},
   ],
   sol:'Distance réelle : 18 × 50 000 = 900 000 cm = 9 km.<br>Marche : 9 ÷ 4,5 = 2 h, soit 120 min, plus 20 min de pause : 140 min au total.<br>Autre carte : 900 000 ÷ 36 = 25 000, donc 1:25 000.<br>La longueur sur la carte double quand le dénominateur de l’échelle est divisé par 2 : les deux grandeurs sont inversement proportionnelles.'},
 ]},

{id:'affines',br:'ana',lv:'ecole',use:'pente',h:'Fonctions affines',p:'Pentes, droites et tout ce qui monte ou descend.',
 lessons:['La pente d’une droite','Ordonnée à l’origine','Droite passant par deux points','Comparer des tarifs']},

{id:'pythagore',br:'geo',lv:'ecole',h:'Théorème de Pythagore',p:'Le plus célèbre des théorèmes, vu avec des carrés.',
 lessons:['Le théorème en images','La réciproque','Distances dans un repère','Pythagore dans l’espace'],
 steps:[
  {h:'a² + b² = c²',p:`<p>Un menuisier veut vérifier qu’un coin de cadre est bien droit, un randonneur veut savoir la longueur d’une pente. Dans un triangle rectangle, connaître deux côtés suffit pour trouver le troisième. C’est le théorème de Pythagore.</p>
<div class="def"><p>Dans un triangle <b>rectangle</b>, les deux côtés qui forment l’angle droit s’appellent les <b>côtés de l’angle droit</b>. Le troisième, en face de l’angle droit, est l’<b>hypoténuse</b> : c’est toujours le plus long côté.</p></div>
<div class="thm"><p>Si un triangle est rectangle, de côtés de l’angle droit <i>a</i> et <i>b</i> et d’hypoténuse <i>c</i>, alors <b><i>a</i>² + <i>b</i>² = <i>c</i>²</b>.</p></div>
<div class="idea"><p>Construis un carré sur chaque côté. L’aire du grand carré, posé sur l’hypoténuse, égale la somme des aires des deux petits. La figure affiche ces aires : bouge les curseurs, l’égalité tient toujours.</p></div>
<div class="ex"><p>Avec <i>a</i> = 3 et <i>b</i> = 4 : 9 + 16 = 25 = <i>c</i>², donc <i>c</i> = 5, car 5 × 5 = 25.</p></div>
<div class="warn"><p>Le théorème ne vaut que pour un triangle rectangle. Et l’égalité porte sur les <b>carrés</b> : 3 + 4 = 7 n’est pas la longueur de l’hypoténuse.</p></div>`,
   params:[{id:'a',l:'Côté a',min:1,max:5,v:3},{id:'b',l:'Côté b',min:1,max:5,v:4}],
   draw:v=>{ const a=v.a,b=v.b,P=plane({x:[-5.5,10.5],y:[-5.5,10.5],grid:false,axes:false,w:300});
     P.poly([[0,0],[a,0],[a,-a],[0,-a]],{fill:'var(--math)',fo:.35,c:'var(--ink)',w:1.5})
      .poly([[0,0],[0,b],[-b,b],[-b,0]],{fill:'var(--spark)',fo:.45,c:'var(--ink)',w:1.5})
      .poly([[a,0],[0,b],[b,a+b],[a+b,a]],{fill:'var(--accent)',fo:.3,c:'var(--ink)',w:1.5})
      .poly([[0,0],[a,0],[0,b]],{fill:'var(--surface)',fo:1,c:'var(--ink)',w:2.5});
     P.text(a/2,-a/2,`${a*a}`,{a:'middle',dy:5,s:15}).text(-b/2,b/2,`${b*b}`,{a:'middle',dy:5,s:15}).text((a+b)/2,(a+b)/2,`${a*a+b*b}`,{a:'middle',dy:5,s:16});
     return P.svg(); },
   info:v=>`${v.a}² + ${v.b}² = ${v.a*v.a} + ${v.b*v.b} = ${v.a*v.a+v.b*v.b}, donc c = ${fmt(Math.hypot(v.a,v.b))}`},
  {kind:'Théorie',h:'Pourquoi c’est vrai : la preuve par découpage',p:`<p>Vérifier sur quelques triangles ne prouve rien : il faudrait les essayer tous. Voici un argument qui marche pour n’importe quel triangle rectangle, avec seulement des aires.</p>
<div class="why"><p>Prends un grand carré de côté <i>a</i> + <i>b</i>. Place dans ses coins quatre copies du triangle rectangle, comme sur la figure. Au milieu, il reste un carré penché dont le côté est l’hypoténuse <i>c</i>. On calcule l’aire du grand carré de deux façons :</p>
<p>(<i>a</i> + <i>b</i>)² = 4 × ${F('ab',2)} + <i>c</i>², soit <i>a</i>² + 2<i>ab</i> + <i>b</i>² = 2<i>ab</i> + <i>c</i>².</p>
<p>On enlève 2<i>ab</i> des deux côtés : <i>a</i>² + <i>b</i>² = <i>c</i>².</p></div>
<div class="ex"><p>Avec <i>a</i> = 3 et <i>b</i> = 4 : le grand carré a une aire de 7² = 49. Les quatre triangles font 4 × 6 = 24. Il reste 49 − 24 = 25 pour le carré du milieu, donc <i>c</i> = 5.</p></div>
<div class="idea"><p>La preuve utilise l’identité (<i>a</i> + <i>b</i>)² = <i>a</i>² + 2<i>ab</i> + <i>b</i>² et l’aire d’un triangle rectangle, la moitié du rectangle <i>a</i> × <i>b</i>.</p></div>
<div class="warn"><p>Le carré du milieu est bien un carré seulement parce que les triangles ont un angle droit : sans angle droit, l’argument tombe.</p></div>`,
   fig:(()=>{ const P=plane({x:[-1,8],y:[-1,8],grid:false,axes:false,w:240});
     [[[0,0],[3,0],[0,4]],[[3,0],[7,0],[7,3]],[[7,3],[7,7],[4,7]],[[4,7],[0,7],[0,4]]].forEach(t=>P.poly(t,{fill:'var(--spark)',fo:.45,c:'var(--ink)',w:1.5}));
     P.poly([[3,0],[7,3],[4,7],[0,4]],{fill:'var(--accent)',fo:.25,c:'var(--ink)',w:2}).text(3.5,3.5,'c²',{a:'middle',dy:6,s:17});
     P.text(1.5,0,'a',{a:'middle',dy:16}).text(5,0,'b',{a:'middle',dy:16}).text(0,2,'b',{a:'end',dx:-6,dy:5}).text(0,5.5,'a',{a:'end',dx:-6,dy:5}); return P.svg(); })()},
  {kind:'Théorie',h:'La racine carrée défait le carré',p:`<p>Pythagore donne <i>c</i>² = 25. Mais on veut <i>c</i>, pas <i>c</i>². Il faut une opération qui fasse le chemin inverse du carré.</p>
<div class="def"><p>Pour un nombre <i>x</i> ≥ 0, la <b>racine carrée</b> de <i>x</i>, notée <b>√<i>x</i></b>, est le nombre positif dont le carré vaut <i>x</i>. Le symbole √ vient d’un « r » stylisé, pour « racine ».</p></div>
<div class="ex"><p>√25 = 5 car 5² = 25. √49 = 7, √144 = 12, √1 = 1, √0 = 0. Souvent le résultat n’est pas entier : √2 ≈ 1,414, car 1,414² = 1,999 396, presque 2. On garde alors la valeur exacte √2 ou un arrondi.</p></div>
<div class="idea"><p>√<i>x</i> est le côté d’un carré d’aire <i>x</i>. Un carré de 49 cm² a un côté de 7 cm. C’est exactement le lien entre les carrés de la figure de Pythagore et les côtés du triangle.</p></div>
<div class="warn"><p>La racine d’une somme n’est pas la somme des racines : √(9 + 16) = √25 = 5, alors que √9 + √16 = 3 + 4 = 7. On additionne d’abord les carrés, et on prend la racine <b>à la fin</b>. Et √(−4) n’existe pas : aucun carré n’est négatif.</p></div>`},
  {kind:'Méthode',h:'Calculer un côté avec Pythagore',
   p:'Repère d’abord l’<b>hypoténuse</b> : le côté en face de l’angle droit, toujours le plus long. Écris ensuite <b>hypoténuse² = côté² + côté²</b>. Si on cherche l’hypoténuse, on additionne les carrés. Si on cherche un côté de l’angle droit, on <b>soustrait</b> : côté² = hypoténuse² − autre côté². On termine par une racine carrée.',
   demo:{enonce:'Le triangle ABC est rectangle en B, avec AC = 13 cm et AB = 5 cm. Calculer BC.',
    etapes:[
     {f:'L’angle droit est en B, donc l’hypoténuse est [AC].',w:'C’est le côté opposé au sommet de l’angle droit.'},
     {f:'AC² = AB² + BC², soit 13² = 5² + BC²',w:'On écrit le théorème avec les bonnes lettres avant de remplacer.'},
     {f:'BC² = 169 − 25 = 144',w:'On cherche un côté de l’angle droit : on soustrait.'},
     {f:'BC = √144 = 12 cm',w:'Une longueur est positive : on garde la racine positive.'}],
    conclusion:'BC = 12 cm. Contrôle : 12 < 13, l’hypoténuse reste le plus long côté.'}},
  {h:'Calcule l’hypoténuse',p:'Les côtés de l’angle droit mesurent 6 cm et 8 cm. Quelle est la longueur de l’hypoténuse&nbsp;?',unit:'cm',ans:10,why:'6² + 8² = 36 + 64 = 100, et √100 = 10.'},
  {h:'L’échelle contre le mur',p:'Une échelle de 5 m est posée contre un mur. Son pied est à 3 m du mur. À quelle hauteur touche-t-elle le mur&nbsp;?',
   fig:(()=>{ const P=plane({x:[-0.5,4.5],y:[-0.5,5],grid:false,axes:false,w:240}); P.seg(0,0,4.2,0,{c:'var(--muted)',w:3}).seg(0,0,0,4.8,{c:'var(--muted)',w:6}).seg(3,0,0,4,{c:'var(--spark)',w:5})
     .text(1.5,0,'3 m',{a:'middle',dy:18}).text(1.6,2.2,'5 m',{s:14}).text(0,2,'?',{dx:-14,s:16}); return P.svg(); })(),
   unit:'m',ans:4,why:'h² + 3² = 5², donc h² = 25 − 9 = 16 et h = 4 m.'},
  {kind:'Théorie',h:'La réciproque : reconnaître un angle droit',p:`<p>Les bâtisseurs anciens traçaient des angles droits avec une simple corde à nœuds. En la tendant en triangle de côtés 3, 4 et 5, ils obtenaient un angle droit. Pourquoi est-ce sûr&nbsp;?</p>
<div class="thm"><p><b>Réciproque de Pythagore :</b> si, dans un triangle, le carré du plus grand côté est égal à la somme des carrés des deux autres, alors le triangle est rectangle, et l’angle droit est <b>en face du plus grand côté</b>.</p></div>
<div class="idea"><p>Le théorème part de l’angle droit et arrive à l’égalité. La réciproque fait le chemin inverse : de l’égalité vers l’angle droit. On peut aussi l’utiliser pour dire non : si l’égalité est fausse, le triangle n’est <b>pas</b> rectangle, sinon le théorème direct serait contredit.</p></div>
<div class="ex"><p>Côtés 6, 8 et 10 : 10² = 100 et 6² + 8² = 36 + 64 = 100. Égalité : rectangle, l’angle droit est en face du côté 10. Côtés 4, 5 et 6 : 6² = 36 et 4² + 5² = 16 + 25 = 41. 36 ≠ 41 : pas rectangle.</p></div>
<div class="warn"><p>Compare toujours le carré du <b>plus grand</b> côté avec la somme des deux autres. Avec 6, 8 et 10, calculer 6² + 10² ne mène à rien. Et un dessin « qui a l’air droit » ne prouve rien : seul le calcul compte.</p></div>`},
  {kind:'Méthode',h:'Prouver qu’un triangle est rectangle',
   p:'On connaît les trois côtés. 1) Repère le plus grand. 2) Calcule son carré d’une part, la somme des carrés des deux autres d’autre part. 3) Compare. En cas d’égalité, le triangle est rectangle, et l’angle droit est <b>en face du plus grand côté</b> : c’est la <b>réciproque</b> de Pythagore. Sinon, il n’est pas rectangle.',
   demo:{enonce:'Les triangles de côtés 8, 15, 17 et 6, 7, 9 sont-ils rectangles&nbsp;?',
    etapes:[
     {f:'17² = 289 et 8² + 15² = 64 + 225 = 289',w:'Le plus grand côté est 17 : on compare son carré à la somme des carrés des deux autres.'},
     {f:'Égalité : le premier triangle est rectangle.',w:'La réciproque de Pythagore s’applique.'},
     {f:'9² = 81 et 6² + 7² = 36 + 49 = 85',w:'Même calcul pour le second triangle.'},
     {f:'81 ≠ 85 : le second n’est pas rectangle.',w:'Si l’égalité est fausse, le triangle ne peut pas être rectangle.'}],
    conclusion:'Le triangle 8, 15, 17 est rectangle, le triangle 6, 7, 9 ne l’est pas.'}},
  {kind:'Défi',h:'La réciproque',p:'Un triangle a des côtés de 5, 12 et 13 cm. Est-il rectangle&nbsp;?',opts:['Oui','Non','On ne peut pas savoir sans mesurer un angle'],ans:0,
   why:'5² + 12² = 25 + 144 = 169 = 13². La réciproque de Pythagore dit qu’il est rectangle.'},
  {kind:'Théorie',h:'La distance entre deux points d’un repère',p:`<p>Sur un plan quadrillé, mesurer en suivant les lignes est facile. Mais la distance à vol d’oiseau entre deux points, en biais, ne se lit pas sur le quadrillage. Pythagore la donne.</p>
<div class="prop"><p>Pour A(<i>x</i><sub>A</sub> ; <i>y</i><sub>A</sub>) et B(<i>x</i><sub>B</sub> ; <i>y</i><sub>B</sub>) : <b>AB² = (<i>x</i><sub>B</sub> − <i>x</i><sub>A</sub>)² + (<i>y</i><sub>B</sub> − <i>y</i><sub>A</sub>)²</b>, puis AB = √(AB²).</p></div>
<div class="why"><p>Pars de A, avance horizontalement jusqu’au point C sous B, puis monte jusqu’à B. Le trajet AC est horizontal, CB vertical : l’angle en C est droit. [AB] est l’hypoténuse du triangle ACB, dont les côtés de l’angle droit sont les écarts des coordonnées.</p></div>
<div class="ex"><p>Sur la figure, A(1 ; 1) et B(5 ; 4) : écarts 5 − 1 = 4 et 4 − 1 = 3. AB² = 16 + 9 = 25, donc AB = 5. Autre exemple : A(1 ; 2) et B(6 ; 14) donnent des écarts 5 et 12, AB² = 25 + 144 = 169 et AB = 13.</p></div>
<div class="warn"><p>Un écart peut être négatif, son carré ne l’est jamais : (−3)² = 9. L’ordre des points ne change donc rien. Attention aux parenthèses : 5 − (−1) = 6.</p></div>`,
   fig:(()=>{ const P=plane({x:[-0.5,6.5],y:[-0.5,5],w:260,lab:1});
     P.seg(1,1,5,1,{c:'var(--spark)',w:2.5,dash:true}).seg(5,1,5,4,{c:'var(--spark)',w:2.5,dash:true}).seg(1,1,5,4,{c:'var(--accent)',w:3});
     P.dot(1,1,{l:'A',dx:-14}).dot(5,4,{l:'B'}).dot(5,1,{l:'C',dy:16,r:4,c:'var(--muted)'}).text(3,1,'4',{a:'middle',dy:16}).text(5,2.5,'3',{dx:8}); return P.svg(); })()},
  {kind:'Méthode',h:'Pythagore dans un repère et dans l’espace',
   p:'Dans un repère, [AB] est l’hypoténuse d’un triangle rectangle dont les côtés sont les écarts des coordonnées : <b>AB² = (x<sub>B</sub> − x<sub>A</sub>)² + (y<sub>B</sub> − y<sub>A</sub>)²</b>. Dans un pavé de dimensions L, l et h, on applique Pythagore deux fois : la diagonale du sol, puis la grande diagonale. D’où <b>D² = L² + l² + h²</b>. Enfin, l’aire d’un triangle rectangle vaut le produit des deux côtés de l’angle droit, divisé par 2.',
   demo:{enonce:'Calculer la distance entre A(2 ; 1) et B(5 ; 5), puis la grande diagonale d’un pavé de 2 × 3 × 6.',
    etapes:[
     {f:'x<sub>B</sub> − x<sub>A</sub> = 3 et y<sub>B</sub> − y<sub>A</sub> = 4',w:'Ce sont les deux côtés de l’angle droit, parallèles aux axes.'},
     {f:'AB² = 3² + 4² = 25, donc AB = 5',w:'Pythagore dans le triangle rectangle dessiné sur le quadrillage.'},
     {f:'Diagonale du sol : d² = 2² + 3² = 13',w:'Le sol est un rectangle 2 × 3. Inutile de calculer √13 : on garde d².'},
     {f:'Grande diagonale : D² = d² + 6² = 13 + 36 = 49, donc D = 7',w:'La diagonale du sol et l’arête verticale forment un angle droit.'}],
    conclusion:'AB = 5 et la grande diagonale du pavé mesure 7.'}},
  {h:'Distance dans un repère',p:'Quelle est la distance entre A(−1 ; 2) et B(5 ; 10)&nbsp;?',lab:'AB =',ans:10,why:'Écarts : 5 − (−1) = 6 et 10 − 2 = 8. AB² = 36 + 64 = 100, donc AB = 10.'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li>L’hypoténuse est le côté en face de l’angle droit, le plus long.</li>
<li>Théorème : si le triangle est rectangle, hypoténuse² = côté² + côté². On le prouve en découpant un carré de côté <i>a</i> + <i>b</i>.</li>
<li>Pour l’hypoténuse, on additionne les carrés ; pour un côté de l’angle droit, on soustrait. On termine par une racine carrée, prise à la fin.</li>
<li>Réciproque : si le carré du plus grand côté égale la somme des carrés des deux autres, le triangle est rectangle. Sinon, il ne l’est pas.</li>
<li>Repère : AB² = (<i>x</i><sub>B</sub> − <i>x</i><sub>A</sub>)² + (<i>y</i><sub>B</sub> − <i>y</i><sub>A</sub>)².</li>
<li>Pavé : D² = L² + l² + h², Pythagore appliqué deux fois.</li></ul></div>
<p>Dans les problèmes, cherche d’abord le triangle rectangle caché dans la situation.</p>`},
  {kind:'Problème',h:'La tringle dans la chambre',
   p:'Une chambre a la forme d’un pavé : 4 m de long, 3 m de large et 2,4 m de haut. Tu dois y ranger une tringle rigide de 5,3 m. Rentre-t-elle, et comment&nbsp;?',
   parts:[
    {q:'a) Quelle est la longueur de la diagonale du sol ?',unit:'m',ans:5,tol:.001,hint:'Le sol est un rectangle 4 × 3.',why:'√(4² + 3²) = √25 = 5 m.'},
    {q:'b) Quelle est la longueur de la grande diagonale, d’un coin du sol au coin opposé du plafond ? (au centième)',unit:'m',ans:5.55,tol:.011,hint:'Triangle rectangle : la diagonale du sol, la hauteur, et la grande diagonale comme hypoténuse.',why:'√(5² + 2,4²) = √30,76 ≈ 5,55 m.'},
    {q:'c) La tringle de 5,3 m entre-t-elle ?',opts:['Oui, posée en diagonale sur le sol','Oui, mais seulement en diagonale de l’espace','Non, elle est trop longue','Oui, le long d’un mur'],ans:1,hint:'Compare 5,3 avec les deux diagonales.',why:'5,3 > 5 : elle ne tient pas à plat. Mais 5,3 < 5,55 : elle tient en biais, du sol au plafond.'},
   ],
   sol:'Diagonale du sol : √(4² + 3²) = 5 m.<br>Grande diagonale : on applique Pythagore dans le triangle formé par la diagonale du sol (5 m) et la hauteur (2,4 m) : √(25 + 5,76) = √30,76 ≈ 5,55 m.<br>La tringle (5,3 m) est trop longue pour le sol, mais plus courte que la grande diagonale : elle rentre en biais.'},
  {kind:'Problème',h:'Trois arbres dans le jardin',
   p:'Sur un plan quadrillé en mètres, trois arbres sont placés en A(1 ; 1), B(7 ; 3) et C(5 ; 9). Le jardinier pense que l’angle en B est droit. On veut le vérifier sans rapporteur, puis calculer l’aire du triangle.',
   fig:(()=>{ const P=plane({x:[-0.5,10],y:[-0.5,10],w:280,lab:2}); P.poly([[1,1],[7,3],[5,9]],{fill:'var(--sci)',fo:.2,c:'var(--ink)',w:2}).dot(1,1,{l:'A'}).dot(7,3,{l:'B'}).dot(5,9,{l:'C'}); return P.svg(); })(),
   parts:[
    {q:'a) Combien vaut AB² ?',lab:'AB² =',ans:40,hint:'AB² = (xB − xA)² + (yB − yA)².',why:'(7 − 1)² + (3 − 1)² = 36 + 4 = 40.'},
    {q:'b) Combien vaut AC² ?',lab:'AC² =',ans:80,hint:'Même méthode avec A et C.',why:'(5 − 1)² + (9 − 1)² = 16 + 64 = 80.'},
    {q:'c) Sachant que BC² = 40, que conclut-on ?',opts:['Le triangle est rectangle en A','Le triangle est rectangle en B','Le triangle n’est pas rectangle','Le triangle est équilatéral'],ans:1,hint:'L’angle droit est en face du plus grand côté.',why:'AB² + BC² = 40 + 40 = 80 = AC². Par la réciproque de Pythagore, l’angle droit est en B, face à [AC].'},
    {q:'d) Quelle est l’aire du triangle ?',unit:'m²',ans:20,hint:'Dans un triangle rectangle, les deux côtés de l’angle droit sont base et hauteur.',why:'AB = BC = √40, donc aire = √40 · √40 ÷ 2 = 40 ÷ 2 = 20 m².'},
   ],
   sol:'AB² = 6² + 2² = 40, BC² = 2² + 6² = 40, AC² = 4² + 8² = 80.<br>Comme AB² + BC² = AC², la réciproque de Pythagore dit que le triangle est rectangle en B.<br>Il est aussi isocèle (AB = BC).<br>Aire = AB · BC ÷ 2 = 40 ÷ 2 = 20 m². On n’a même pas besoin de calculer √40.'},
 ]},

{id:'aires',br:'geo',lv:'ecole',h:'Aires et périmètres',p:'Du rectangle au disque, découper et recoller.',
 lessons:['Le parallélogramme','Triangles et trapèzes','Le disque et π','Volumes de solides'],
 steps:[
  {kind:'Théorie',h:'Aire ou périmètre : deux mesures différentes',p:`<p>Pour clôturer un jardin, tu as besoin de la longueur de son tour. Pour y semer du gazon, tu as besoin de sa surface. Ce sont deux questions différentes, avec deux réponses différentes.</p>
<div class="def"><p>Le <b>périmètre</b> d’une figure est la longueur de son bord : il se mesure en cm, m, km. Son <b>aire</b> est la place qu’elle occupe : c’est le nombre de carrés unités qu’elle contient. Elle se mesure en cm² (carrés de 1 cm de côté), m², km².</p></div>
<div class="ex"><p>Le rectangle de la figure mesure 6 cm sur 4 cm. Périmètre : 6 + 4 + 6 + 4 = 20 cm. Aire : 4 rangées de 6 carrés, soit 6 × 4 = 24 cm². Un rectangle de 10 cm sur 2 cm a un périmètre plus grand, 24 cm, mais une aire plus petite, 20 cm².</p></div>
<div class="idea"><p>Un périmètre additionne des longueurs. Une aire multiplie deux longueurs : c’est pourquoi son unité porte un « ² ».</p></div>
<div class="warn"><p>1 m = 100 cm, mais 1 m² n’est pas 100 cm². Un carré de 1 m de côté contient 100 rangées de 100 petits carrés : 1 m² = 10 000 cm².</p></div>`,
   fig:(()=>{ const P=plane({x:[-1.7,7],y:[-1,4.6],grid:false,axes:false,w:260});
     for(let i=0;i<6;i++) for(let j=0;j<4;j++) P.rect(i,j,1,1,{fill:'var(--math)',fo:.2,c:'var(--line)',w:1});
     P.rect(0,0,6,4,{c:'var(--spark)',w:3.5}).text(3,0,'6 cm',{a:'middle',dy:18}).text(0,2,'4 cm',{a:'end',dx:-4,dy:5,s:11}); return P.svg(); })()},
  {h:'Pencher sans changer l’aire',p:`<p>Un parallélogramme a ses côtés opposés parallèles, mais il penche. Comment mesurer sa surface, alors qu’on ne sait compter les carrés que dans un rectangle&nbsp;?</p>
<div class="def"><p>On choisit un côté comme <b>base</b>. La <b>hauteur</b> est la distance entre la base et le côté opposé, mesurée <b>perpendiculairement</b> à la base. Aire du parallélogramme = <b>base × hauteur</b>.</p></div>
<div class="idea"><p>Coupe le triangle de gauche le long de la hauteur pointillée, et recolle-le à droite : tu obtiens un rectangle de même base et de même hauteur. On n’a rien ajouté ni enlevé, donc l’aire est la même.</p></div>
<div class="ex"><p>Base 5, hauteur 3 : aire = 5 × 3 = 15, quelle que soit l’inclinaison du curseur. Avec une inclinaison de 1,5, le côté penché mesure environ 3,35, mais ce nombre ne sert pas pour l’aire.</p></div>
<div class="warn"><p>Ne multiplie pas les deux côtés : 5 × 3,35 ≈ 16,8 est faux. Plus le parallélogramme penche, plus son côté s’allonge, mais son aire ne bouge pas.</p></div>`,
   params:[{id:'s',l:'Inclinaison',min:-3,max:3,step:.5,v:1.5}],
   draw:v=>{ const P=plane({x:[-3.5,8.5],y:[-1,4],grid:false,axes:false});
     P.poly([[0,0],[5,0],[5+v.s,3],[v.s,3]],{fill:'var(--math)',fo:.3,c:'var(--ink)',w:2}).rect(0,0,5,3,{c:'var(--muted)',w:1.5,dash:true});
     P.seg(v.s,3,v.s,0,{c:'var(--spark)',w:2,dash:true}).text(2.5,0,'base 5',{a:'middle',dy:18}).text(v.s,1.5,'h = 3',{dx:6}); return P.svg(); },
   info:()=>'Aire = 5 × 3 = 15, quelle que soit l’inclinaison.'},
  {kind:'Théorie',h:'Le triangle, moitié d’un parallélogramme',p:`<p>On sait calculer l’aire d’un parallélogramme. Un triangle n’en est pas un, mais il en est exactement la moitié.</p>
<div class="prop"><p>Aire d’un triangle = ${F('base × hauteur',2)}. La hauteur est le segment issu du sommet opposé, <b>perpendiculaire</b> à la base (ou à son prolongement).</p></div>
<div class="why"><p>Prends une copie du triangle, fais-la tourner d’un demi-tour et colle-la contre le côté de droite. Les deux triangles forment un parallélogramme de même base et de même hauteur (figure). Le triangle en est la moitié, donc son aire est base × hauteur ÷ 2.</p></div>
<div class="ex"><p>Sur la figure, base 6 et hauteur 3 : le parallélogramme a une aire de 18, le triangle de ${F(18,2)} = 9. Dans un triangle rectangle de côtés de l’angle droit 5 et 8, l’un sert de base, l’autre de hauteur : aire = 5 × 8 ÷ 2 = 20.</p></div>
<div class="idea"><p>N’importe quel côté peut servir de base, à condition de prendre la hauteur qui lui correspond. Le résultat est toujours le même. Le trapèze se traite de la même façon : deux trapèzes identiques forment un parallélogramme de base « grande base + petite base ».</p></div>
<div class="warn"><p>N’oublie pas le « ÷ 2 ». Et dans un triangle très ouvert, la hauteur tombe en dehors du triangle, sur le prolongement de la base.</p></div>`,
   fig:(()=>{ const P=plane({x:[-0.8,8.8],y:[-1,3.8],grid:false,axes:false,w:300});
     P.poly([[6,0],[8,3],[2,3]],{fill:'var(--spark)',fo:.2,c:'var(--muted)',w:1.5,dash:true}).poly([[0,0],[6,0],[2,3]],{fill:'var(--math)',fo:.35,c:'var(--ink)',w:2});
     P.seg(2,3,2,0,{c:'var(--accent)',w:2,dash:true}).text(3,0,'base 6',{a:'middle',dy:18}).text(2,1.5,'h = 3',{dx:6,s:12}); return P.svg(); })()},
  {kind:'Théorie',h:'Le disque et le nombre π',p:`<p>Enroule une ficelle autour d’une boîte ronde, puis compare sa longueur au diamètre. Tu trouves un peu plus de 3 fois le diamètre. Et ceci pour <b>tous</b> les cercles, petits ou grands.</p>
<div class="def"><p>Le quotient périmètre ÷ diamètre est le même pour tous les cercles. Ce nombre s’appelle <b>π</b> (« pi ») : π ≈ 3,14159. D’où, pour un cercle de rayon <i>r</i> et de diamètre <i>d</i> = 2<i>r</i> : <b>périmètre = π · <i>d</i> = 2π<i>r</i></b> et <b>aire du disque = π<i>r</i>²</b>.</p></div>
<div class="idea"><p>D’où vient π<i>r</i>²&nbsp;? Découpe le disque en parts de pizza très fines et range-les tête-bêche. Elles forment presque un rectangle de hauteur <i>r</i> et de longueur la moitié du tour, π<i>r</i>. Aire : π<i>r</i> × <i>r</i> = π<i>r</i>².</p></div>
<div class="ex"><p>Rayon 4 cm : périmètre = 2π × 4 = 8π ≈ 25,13 cm et aire = π × 4² = 16π ≈ 50,27 cm².</p></div>
<div class="warn"><p>Repère si on te donne le rayon ou le diamètre : le rayon est la moitié du diamètre. Et π<i>r</i>² veut dire π × <i>r</i> × <i>r</i>, pas (π<i>r</i>)².</p></div>`},
  {kind:'Méthode',h:'Choisir la bonne formule',
   p:'<ul><li>Rectangle : L × l. Parallélogramme : base × hauteur.</li><li>Triangle : <b>base × hauteur ÷ 2</b>, la moitié d’un parallélogramme.</li><li>Trapèze : (grande base + petite base) × hauteur ÷ 2.</li><li>Disque de rayon r : aire <b>π·r²</b>, périmètre <b>2π·r = π·d</b>.</li></ul>La hauteur est toujours perpendiculaire à la base. Si on te donne le diamètre, divise-le par 2 avant d’utiliser π·r².',
   demo:{enonce:'Calculer l’aire et le périmètre d’un disque de diamètre 10 cm (au centième), puis l’aire d’un trapèze de bases 7 cm et 3 cm, de hauteur 4 cm.',
    etapes:[
     {f:'r = 10 ÷ 2 = 5 cm',w:'Les formules du disque utilisent le rayon, la moitié du diamètre.'},
     {f:'Aire : π × 5² = 25π ≈ 78,54 cm²',w:'On élève le rayon au carré avant de multiplier par π.'},
     {f:'Périmètre : 2π × 5 = 10π ≈ 31,42 cm',w:'Ou directement π × d. Une longueur s’exprime en cm, une aire en cm².'},
     {f:'Trapèze : (7 + 3) × 4 ÷ 2 = 20 cm²',w:'Deux trapèzes identiques, l’un retourné, forment un parallélogramme de base 7 + 3 : on en prend la moitié.'}],
    conclusion:'Disque : aire ≈ 78,54 cm², périmètre ≈ 31,42 cm. Trapèze : 20 cm².'},
   note:'<b>Changement d’échelle :</b> si toutes les longueurs sont multipliées par k, l’aire est multipliée par k², car une aire est le produit de deux longueurs.'},
  {h:'Le triangle',p:'Un triangle a une base de 10 cm et une hauteur de 6 cm. Quelle est son aire&nbsp;?',unit:'cm²',ans:30,why:'Un triangle est la moitié d’un parallélogramme : 10 × 6 ÷ 2 = 30 cm².'},
  {h:'Le disque',p:'Aire d’un disque de rayon 3 cm, arrondie au centième&nbsp;?',unit:'cm²',ans:28.27,tol:.011,why:'A = π·r² = π × 9 ≈ 28,27 cm².'},
  {h:'Le tour de la roue',p:'Une roue a un diamètre de 60 cm. Quelle distance parcourt-elle en un tour&nbsp;? (au centième)',unit:'cm',ans:188.5,tol:.011,why:'Un tour, c’est le périmètre : π × d = 60π ≈ 188,50 cm.'},
  {kind:'Défi',h:'Changer d’échelle',p:'Si on double le côté d’un carré, son aire est…',opts:['doublée','multipliée par 4','multipliée par 8','inchangée'],ans:1,why:'(2c)² = 4c². L’aire grandit comme le carré des longueurs.'},
  {kind:'Théorie',h:'Agrandir une figure : longueurs × k, aires × k²',p:`<p>Une pizza de 30 cm de diamètre coûte-t-elle normalement deux fois plus qu’une pizza de 15 cm&nbsp;? Non : elle contient bien plus que le double de pâte.</p>
<div class="prop"><p>Si toutes les longueurs d’une figure sont multipliées par un nombre <i>k</i>, son <b>périmètre</b> est multiplié par <i>k</i> et son <b>aire</b> par <b><i>k</i>²</b>. Pour un solide, le volume est multiplié par <i>k</i>³.</p></div>
<div class="why"><p>Une aire est toujours un produit de deux longueurs (base × hauteur, <i>r</i> × <i>r</i>…). Chacune est multipliée par <i>k</i>, donc le produit est multiplié par <i>k</i> × <i>k</i> = <i>k</i>².</p></div>
<div class="ex"><p>Un carré de côté 2 a une aire de 4. Triple son côté : côté 6, aire 36 = 9 × 4, et 9 = 3². Pizza : le rayon passe de 7,5 à 15 cm, donc <i>k</i> = 2 et l’aire est multipliée par 4. La grande pizza vaut quatre petites.</p></div>
<div class="warn"><p>Le périmètre, lui, n’est multiplié que par <i>k</i> : le carré de côté 6 a un tour de 24, trois fois celui du carré de côté 2, qui vaut 8.</p></div>`},
  {kind:'Méthode',h:'Découper une figure composée',
   p:'Une figure compliquée se <b>découpe</b> en morceaux simples : rectangles, triangles, disques, demi-disques. On <b>ajoute</b> les aires des morceaux et on <b>retranche</b> celles des trous. Pour un périmètre, on suit le bord : seules les lignes extérieures comptent. Si une longueur est inconnue mais qu’on connaît le total, on écrit l’égalité et on isole la longueur.',
   demo:{enonce:'Un massif de fleurs est formé d’un rectangle de 6 m sur 4 m et d’un demi-disque de diamètre 4 m collé sur un petit côté. Calculer son aire et son périmètre, puis la longueur du rectangle qui donnerait un tour de 25 m.',
    etapes:[
     {f:'Aire = 6 × 4 + ½ × π × 2² = 24 + 2π ≈ 30,28 m²',w:'Le demi-disque a un rayon de 2 m : on prend la moitié de π·r².'},
     {f:'Périmètre = 6 + 4 + 6 + ½ × π × 4 = 16 + 2π ≈ 22,28 m',w:'Le petit côté collé au demi-disque est à l’intérieur : il ne compte pas. Le demi-cercle mesure la moitié de π·d.'},
     {f:'Avec une longueur L : 2L + 4 + 2π = 25',w:'On écrit le périmètre avec L, puis on l’égale au total voulu.'},
     {f:'L = (25 − 4 − 2π) ÷ 2 ≈ 7,36 m',w:'On isole L : on retire ce qui est connu, puis on divise par 2.'}],
    conclusion:'Aire ≈ 30,28 m², périmètre ≈ 22,28 m. Pour un tour de 25 m, le rectangle doit mesurer environ 7,36 m de long.'},
   note:'Quand on achète des pots de peinture ou des rouleaux, on arrondit toujours <b>vers le haut</b> : 3,2 pots, c’est 4 pots.'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li>Périmètre : longueur du bord, en cm ou m. Aire : nombre de carrés unités, en cm² ou m². 1 m² = 10 000 cm².</li>
<li>Rectangle : L × l. Parallélogramme : base × hauteur, la hauteur étant perpendiculaire à la base.</li>
<li>Triangle : base × hauteur ÷ 2. Trapèze : (grande base + petite base) × hauteur ÷ 2.</li>
<li>Cercle : périmètre π<i>d</i> = 2π<i>r</i>. Disque : aire π<i>r</i>², avec le rayon.</li>
<li>Figure composée : on découpe, on additionne les morceaux, on retire les trous. Pour le périmètre, seul le bord extérieur compte.</li>
<li>Longueurs × <i>k</i> : périmètre × <i>k</i>, aire × <i>k</i>².</li></ul></div>
<p>Dans les problèmes, fais un croquis et note l’unité de chaque résultat.</p>`},
  {kind:'Problème',h:'Repeindre le mur',
   p:'Tu repeins un mur de 4,5 m de large et 2,5 m de haut. Il contient une porte de 0,9 m sur 2 m et une fenêtre ronde de rayon 0,4 m, qu’on ne peint pas. Il faut deux couches, et un pot couvre 5 m².',
   parts:[
    {q:'a) Quelle est l’aire du mur entier ?',unit:'m²',ans:11.25,tol:.001,hint:'C’est un rectangle.',why:'4,5 × 2,5 = 11,25 m².'},
    {q:'b) Quelle aire faut-il peindre (une couche, au centième) ?',unit:'m²',ans:8.95,tol:.011,hint:'Retire la porte et le disque π·r².',why:'11,25 − 1,8 − π·0,4² ≈ 11,25 − 1,8 − 0,50 ≈ 8,95 m².'},
    {q:'c) Combien de pots faut-il acheter ?',unit:'pots',ans:4,hint:'Deux couches, et on n’achète pas de demi-pot.',why:'2 × 8,95 ≈ 17,9 m², et 17,9 ÷ 5 ≈ 3,58. Il faut 4 pots.'},
   ],
   sol:'Mur : 4,5 × 2,5 = 11,25 m². Porte : 0,9 × 2 = 1,8 m². Fenêtre : π × 0,4² ≈ 0,50 m².<br>À peindre : 11,25 − 1,8 − 0,50 ≈ 8,95 m² par couche.<br>Deux couches : ≈ 17,89 m², soit 17,89 ÷ 5 ≈ 3,58 pots.<br>On arrondit vers le haut : 4 pots.'},
  {kind:'Problème',h:'La piste d’athlétisme',
   p:'Une piste simplifiée est formée de deux lignes droites de 100 m et de deux virages en demi-cercle de 60 m de diamètre. On mesure au bord intérieur. On veut son périmètre, l’aire qu’elle entoure, puis comprendre pourquoi les coureurs extérieurs partent plus loin.',
   fig:(()=>{ const P=plane({x:[-45,145],y:[-40,40],w:320,grid:false,axes:false}); P.curve(t=>t<1?100*t:t<2?100+30*Math.sin(Math.PI*(t-1)):t<3?100-100*(t-2):-30*Math.sin(Math.PI*(t-3)),t=>t<1?-30:t<2?-30*Math.cos(Math.PI*(t-1)):t<3?30:30*Math.cos(Math.PI*(t-3)),0,4,{n:400,c:'var(--ink)',w:2.5}); P.text(50,-30,'100 m',{a:'middle',dy:-8}).seg(100,-30,100,30,{c:'var(--muted)',w:1.5,dash:true}).text(100,0,'60 m',{dx:6}); return P.svg(); })(),
   parts:[
    {q:'a) Quel est le périmètre intérieur de la piste ? (au centième)',unit:'m',ans:388.5,tol:.011,hint:'Les deux demi-cercles forment un cercle entier de diamètre 60 m.',why:'2 × 100 + π × 60 ≈ 200 + 188,50 = 388,50 m.'},
    {q:'b) Quelle aire la piste entoure-t-elle ? (au m² près)',unit:'m²',ans:8827,tol:1,hint:'Un rectangle 100 × 60 et un disque de rayon 30.',why:'100 × 60 + π × 30² ≈ 6000 + 2827 = 8827 m².'},
    {q:'c) Quelle longueur faudrait-il donner aux lignes droites pour que le tour fasse 400 m ? (au centième)',unit:'m',ans:105.75,tol:.011,hint:'Résous 2L + 60π = 400.',why:'L = (400 − 60π) ÷ 2 ≈ 105,75 m.'},
    {q:'d) Un coureur tourne à 1,22 m à l’extérieur du bord intérieur. Combien de mètres de plus parcourt-il par tour ? (au centième)',unit:'m',ans:7.67,tol:.011,hint:'Les lignes droites ne changent pas. Seul le diamètre des virages augmente, de 2 × 1,22 m.',why:'π × (60 + 2,44) − π × 60 = π × 2,44 ≈ 7,67 m, quelle que soit la longueur des lignes droites.'},
   ],
   sol:'Périmètre : 2 × 100 + π × 60 ≈ 388,50 m. Aire : 6000 + π × 900 ≈ 8827 m².<br>Pour un tour de 400 m : 2L = 400 − 60π, donc L ≈ 105,75 m.<br>Couloir extérieur : le diamètre des virages passe à 62,44 m. Le tour s’allonge de π × 2,44 ≈ 7,67 m.<br>Ce supplément ne dépend que de l’écart entre les couloirs : c’est pourquoi les départs sont décalés.'},
 ]},

{id:'thales',br:'geo',lv:'ecole',h:'Thalès et agrandissements',p:'Mesurer un arbre avec son ombre, lire une carte.',
 lessons:['Agrandir et réduire','Le théorème de Thalès','Mesurer l’inaccessible','Échelles des cartes'],
 steps:[
  {h:'Agrandir d’un facteur k',p:`<p>Quand tu zoomes sur une photo, le visage grandit mais reste le même visage : rien n’est déformé. En géométrie, on dit que la photo a été <b>agrandie</b>.</p>
<div class="def"><p>Agrandir ou réduire une figure d’un <b>facteur</b> <i>k</i> (un nombre positif), c’est multiplier <b>toutes</b> ses longueurs par <i>k</i>. Si <i>k</i> > 1, c’est un agrandissement ; si <i>k</i> < 1, une réduction. Les <b>angles</b> ne changent pas.</p></div>
<div class="idea"><p>La forme est conservée parce que tous les côtés grandissent dans la même proportion. Sur la figure, le petit triangle et le grand ont exactement les mêmes angles. Bouge le curseur : sous 1, le « grand » devient plus petit que l’original.</p></div>
<div class="ex"><p>Un triangle de côtés 2, 3 et 4 cm, agrandi avec <i>k</i> = 1,5, a des côtés de 3 ; 4,5 et 6 cm. Réduit avec <i>k</i> = 0,5, il a des côtés de 1 ; 1,5 et 2 cm. Le périmètre passe de 9 cm à 13,5 cm (× 1,5), comme l’indique la ligne sous la figure.</p></div>
<div class="warn"><p>Ajouter la même longueur à chaque côté déforme la figure. Un rectangle de 2 sur 4 auquel on ajoute 2 cm partout devient 4 sur 6 : la longueur valait le double de la largeur, elle n’en vaut plus qu’une fois et demie.</p></div>`,
   params:[{id:'k',l:'Facteur k',min:.5,max:3,step:.25,v:2}],
   draw:v=>{ const P=plane({x:[-0.5,9],y:[-0.5,6],grid:false,axes:false}); const t=[[0,0],[2,0],[0.6,1.6]];
     P.poly(t.map(p=>[p[0]*v.k,p[1]*v.k]),{fill:'var(--math)',fo:.25,c:'var(--math)',w:2.5}).poly(t,{fill:'var(--spark)',fo:.6,c:'var(--ink)',w:1.5});
     return P.svg(); },
   info:v=>`Périmètre × ${fmt(v.k)} · Aire × ${fmt(v.k*v.k,4)}`},
  {kind:'Théorie',h:'Reconnaître un agrandissement : des rapports égaux',p:`<p>On te montre deux rectangles. L’un est-il un agrandissement de l’autre, ou bien a-t-il été étiré&nbsp;? Il suffit de calculer des quotients.</p>
<div class="prop"><p>Une figure est un agrandissement (ou une réduction) d’une autre si les <b>rapports</b> entre longueurs correspondantes sont tous égaux : ${F('longueur de l’image','longueur d’origine')} = <i>k</i>, toujours le même nombre. Ce rapport commun est le facteur.</p></div>
<div class="ex"><p>Rectangles 4 × 6 et 10 × 15 : ${F(10,4)} = 2,5 et ${F(15,6)} = 2,5. Les rapports sont égaux : le second est un agrandissement du premier, de facteur 2,5.</p>
<p>Rectangles 4 × 6 et 6 × 8 : ${F(6,4)} = 1,5 mais ${F(8,6)} ≈ 1,33. Les rapports diffèrent : le second a été déformé.</p></div>
<div class="idea"><p>Les rapports égaux, c’est encore de la proportionnalité : les longueurs de l’image sont proportionnelles aux longueurs d’origine, avec le coefficient <i>k</i>.</p></div>
<div class="warn"><p>Associe bien les côtés qui se correspondent : la longueur avec la longueur, la largeur avec la largeur. Comparer 10 avec 6 n’aurait aucun sens.</p></div>`},
  {kind:'Méthode',h:'Calculer avec un facteur d’agrandissement',
   p:'Le <b>facteur</b> k se calcule avec deux longueurs qui se correspondent : <b>k = longueur de l’image ÷ longueur d’origine</b>. Si k > 1, on agrandit ; si k < 1, on réduit. Toutes les longueurs sont multipliées par k, les <b>aires par k²</b> et les volumes par k³. Les angles ne changent pas.',
   demo:{enonce:'Un triangle de côtés 3, 4 et 5 cm, d’aire 6 cm², est agrandi : le côté de 3 cm devient 7,5 cm. Calculer le facteur, les autres côtés et la nouvelle aire.',
    etapes:[
     {f:'k = 7,5 ÷ 3 = 2,5',w:'On divise une longueur de l’image par la longueur qui lui correspond.'},
     {f:'4 × 2,5 = 10 cm et 5 × 2,5 = 12,5 cm',w:'Toutes les longueurs sont multipliées par le même k.'},
     {f:'Aire : 6 × 2,5² = 6 × 6,25 = 37,5 cm²',w:'Une aire est faite de deux longueurs : elle est multipliée par k².'},
     {f:'Contrôle : 7,5 × 10 ÷ 2 = 37,5 ✓',w:'Le triangle 3, 4, 5 est rectangle : son aire vaut le produit des côtés de l’angle droit, divisé par 2.'}],
    conclusion:'k = 2,5 ; côtés de 7,5, 10 et 12,5 cm ; aire de 37,5 cm², et non 15 cm².'}},
  {kind:'Théorie',h:'La configuration de Thalès',p:`<p>Coupe un triangle par une droite parallèle à l’un de ses côtés. Tu détaches en haut un petit triangle. Il a exactement la même forme que le grand : c’en est une réduction.</p>
<div class="thm"><p><b>Théorème de Thalès :</b> dans un triangle ABC, soit M un point de [AB] et N un point de [AC]. Si (MN) est <b>parallèle</b> à (BC), alors ${F('AM','AB')} = ${F('AN','AC')} = ${F('MN','BC')}.</p></div>
<div class="why"><p>Les triangles AMN et ABC ont l’angle en A en commun. Comme (MN) et (BC) sont parallèles, les angles en M et en B sont égaux, de même en N et en C. Mêmes angles : AMN est une réduction de ABC, et le rapport commun est le facteur de réduction.</p></div>
<div class="ex"><p>Sur la figure, AM = 4, AB = 10, AC = 15 et BC = 12. Le facteur vaut ${F(4,10)} = 0,4. Donc AN = 15 × 0,4 = 6 et MN = 12 × 0,4 = 4,8.</p></div>
<div class="warn"><p>Les trois rapports comparent un côté du <b>petit</b> triangle au côté correspondant du <b>grand</b>. ${F('AM','MB')} = ${F(4,6)} n’est pas égal à ${F('MN','BC')}, car [MB] n’est pas un côté du petit triangle. Et sans parallèles, le théorème ne s’applique pas.</p></div>`,
   fig:(()=>{ const P=plane({x:[-0.8,7.8],y:[-0.9,5.6],grid:false,axes:false,w:280});
     P.poly([[2,5],[0,0],[7,0]],{fill:'var(--math)',fo:.15,c:'var(--ink)',w:2}).poly([[2,5],[1.2,3],[4,3]],{fill:'var(--spark)',fo:.4,c:'var(--ink)',w:2});
     P.seg(0.4,3,4.8,3,{c:'var(--accent)',w:1.5,dash:true}).seg(-0.4,0,7.4,0,{c:'var(--accent)',w:1.5,dash:true});
     P.dot(2,5,{l:'A',dx:-4,dy:-10}).dot(0,0,{l:'B',dx:-14,dy:14}).dot(7,0,{l:'C',dx:6,dy:14}).dot(1.2,3,{l:'M',dx:-18,dy:4}).dot(4,3,{l:'N',dx:8,dy:4}); return P.svg(); })()},
  {kind:'Théorie',h:'Triangles semblables : deux angles suffisent',p:`<p>Thalès demande des parallèles. Mais deux triangles peuvent avoir la même forme sans être emboîtés, par exemple un bâton et un arbre avec leurs ombres. Comment le reconnaître&nbsp;?</p>
<div class="def"><p>Deux triangles sont <b>semblables</b> si l’un est un agrandissement de l’autre : mêmes angles, et côtés correspondants proportionnels.</p></div>
<div class="prop"><p>Pour que deux triangles soient semblables, il suffit qu’ils aient <b>deux angles égaux</b>.</p></div>
<div class="why"><p>Dans tout triangle, les trois angles font 180°. Si deux angles sont égaux, le troisième l’est aussi : par exemple, avec 50° et 60°, le troisième vaut 180 − 50 − 60 = 70° dans les deux triangles.</p></div>
<div class="ex"><p>Au même moment, un bâton de 1,2 m fait une ombre de 2 m et une tour une ombre de 30 m. Les deux triangles ont un angle droit au sol et le même angle des rayons du soleil, qui sont parallèles. Ils sont semblables, de facteur ${F(30,2)} = 15 : la tour mesure 1,2 × 15 = 18 m.</p></div>
<div class="warn"><p>Les côtés qui se correspondent sont ceux qui font face aux angles égaux. La hauteur du bâton va avec la hauteur de la tour, l’ombre avec l’ombre.</p></div>`},
  {kind:'Méthode',h:'Appliquer Thalès et les triangles semblables',
   p:'Deux triangles sont <b>semblables</b>, l’un étant un agrandissement de l’autre, s’ils ont <b>deux angles égaux</b>. Cas typique de <b>Thalès</b> : dans le triangle ABC, M est sur [AB], N sur [AC], et (MN) est parallèle à (BC). Alors <b>AM/AB = AN/AC = MN/BC</b>. Méthode : repère les sommets qui se correspondent, écris l’égalité des rapports, puis fais un produit en croix.',
   demo:{enonce:'Dans le triangle ABC, M est sur [AB] et N sur [AC], avec (MN) parallèle à (BC). On sait que AM = 3, AB = 5 et BC = 8. Calculer MN.',
    etapes:[
     {f:'(MN) // (BC) : les triangles AMN et ABC sont semblables.',w:'Ils ont l’angle en A en commun, et les angles en M et en B sont égaux, car les droites sont parallèles.'},
     {f:'AM/AB = MN/BC, soit 3/5 = MN/8',w:'On associe les côtés qui se correspondent : ceux du petit triangle en haut, ceux du grand en bas.'},
     {f:'MN = 8 × 3 ÷ 5 = 4,8',w:'Produit en croix.'}],
    conclusion:'MN = 4,8. Le petit triangle est une réduction du grand, de facteur 3/5.'},
   note:'Les rayons du soleil sont parallèles : un objet, son ombre et un rayon forment des triangles semblables. Au même moment, hauteur ÷ ombre est le même rapport pour tous les objets.'},
  {h:'À toi',p:'Même figure, avec AM = 2, AB = 6 et BC = 9. Combien vaut MN&nbsp;?',lab:'MN =',ans:3,why:'AM/AB = MN/BC donne MN = 9 × 2 ÷ 6 = 3.'},
  {h:'L’arbre et son ombre',p:'Un bâton de 1 m fait une ombre de 1,5 m. Au même moment, un arbre fait une ombre de 12 m. Quelle est la hauteur de l’arbre&nbsp;?',
   fig:(()=>{ const P=plane({x:[-0.5,13],y:[-1,9],grid:false,axes:false,w:300}); P.seg(-0.3,0,12.8,0,{c:'var(--muted)',w:2}).seg(0,0,0,8,{c:'var(--sci)',w:6}).seg(0,8,12,0,{c:'var(--spark)',w:2,dash:true})
     .seg(4,0,4,1,{c:'var(--ink)',w:4}).seg(4,1,5.5,0,{c:'var(--spark)',w:2,dash:true}).text(6,0,'12 m',{a:'middle',dy:18}).text(0,4,'?',{dx:10,s:16}); return P.svg(); })(),
   unit:'m',ans:8,why:'Les rayons du soleil sont parallèles : les triangles sont semblables. 12 ÷ 1,5 = 8, donc l’arbre mesure 8 × 1 m = 8 m.'},
  {kind:'Méthode',h:'Utiliser une échelle',
   p:'Une échelle <b>1 : n</b> est un facteur de réduction : 1 cm sur le plan vaut n cm en vrai. Du plan au réel, on <b>multiplie</b> par n ; du réel au plan, on <b>divise</b> par n. Mets les deux longueurs dans la même unité, puis convertis : 1 m = 100 cm et 1 km = 100 000 cm.',
   demo:{enonce:'Sur une carte au 1:50 000, une route mesure 3 cm. Quelle est sa vraie longueur&nbsp;? Combien mesurerait, sur cette carte, un trajet réel de 2 km&nbsp;?',
    etapes:[
     {f:'3 × 50 000 = 150 000 cm',w:'Du plan au réel : on multiplie par n.'},
     {f:'150 000 cm = 1 500 m = 1,5 km',w:'On divise par 100, puis par 1 000.'},
     {f:'2 km = 200 000 cm',w:'On convertit d’abord la longueur réelle en cm, l’unité de la carte.'},
     {f:'200 000 ÷ 50 000 = 4 cm',w:'Du réel au plan : on divise par n.'}],
    conclusion:'La route mesure 1,5 km. Un trajet de 2 km fait 4 cm sur la carte.'},
   note:'Sur un plan au 1:50, les aires sont divisées par 50² = 2 500 : c’est le facteur k² vu plus haut.'},
  {h:'Lire une carte',p:'Sur une carte nationale au 1:25 000, 4 cm représentent…',opts:['250 m','1 km','4 km','10 km'],ans:1,why:'4 × 25 000 = 100 000 cm = 1 000 m = 1 km.'},
  {kind:'Défi',h:'Et l’aire&nbsp;?',p:'On agrandit une photo d’un facteur 3. Par combien son aire est-elle multipliée&nbsp;?',lab:'×',ans:9,why:'Les longueurs sont × 3, donc l’aire est × 3² = 9.'},
  {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li>Agrandir d’un facteur <i>k</i> : toutes les longueurs × <i>k</i>, les angles inchangés. <i>k</i> > 1 agrandit, <i>k</i> < 1 réduit.</li>
<li><i>k</i> = longueur de l’image ÷ longueur d’origine, et ce rapport est le même pour toutes les paires de côtés correspondants.</li>
<li>Périmètres × <i>k</i>, aires × <i>k</i>², volumes × <i>k</i>³.</li>
<li>Thalès : si (MN) // (BC), avec M sur [AB] et N sur [AC], alors AM/AB = AN/AC = MN/BC.</li>
<li>Deux triangles avec deux angles égaux sont semblables : leurs côtés correspondants sont proportionnels. Ombres au soleil : hauteur ÷ ombre est le même pour tous les objets.</li>
<li>Échelle 1 : <i>n</i> : du plan au réel, × <i>n</i> ; du réel au plan, ÷ <i>n</i>.</li></ul></div>
<p>Dans les problèmes, repère d’abord les deux triangles semblables et les sommets qui se correspondent.</p>`},
  {kind:'Problème',h:'Le plan au 1:50',
   p:'Sur un plan à l’échelle 1:50, ta chambre est un rectangle de 8 cm sur 7 cm. Tu veux connaître ses vraies dimensions, puis dessiner ton lit, qui mesure 2 m sur 0,9 m.',
   parts:[
    {q:'a) Quelle est la vraie longueur de la chambre ?',unit:'m',ans:4,tol:.001,hint:'1 cm sur le plan vaut 50 cm en vrai.',why:'8 × 50 = 400 cm = 4 m.'},
    {q:'b) Quelle est la vraie aire de la chambre ?',unit:'m²',ans:14,tol:.001,hint:'Calcule d’abord la vraie largeur.',why:'Largeur : 7 × 50 = 350 cm = 3,5 m. Aire : 4 × 3,5 = 14 m².'},
    {q:'c) Par combien faut-il multiplier l’aire du plan (en cm²) pour obtenir l’aire réelle (en cm²) ?',lab:'×',ans:2500,hint:'Les longueurs sont multipliées par 50.',why:'Les aires sont multipliées par 50² = 2500 : 56 cm² × 2500 = 140 000 cm² = 14 m².'},
    {q:'d) Quelle aire occupe le lit sur le plan ?',unit:'cm²',ans:7.2,tol:.001,hint:'Divise chaque dimension réelle par 50.',why:'200 ÷ 50 = 4 cm et 90 ÷ 50 = 1,8 cm, donc 4 × 1,8 = 7,2 cm².'},
   ],
   sol:'Dimensions réelles : 8 × 50 = 400 cm et 7 × 50 = 350 cm, soit 4 m sur 3,5 m, donc 14 m².<br>Sur le plan, l’aire est 8 × 7 = 56 cm². Le rapport des aires vaut 50² = 2500.<br>Le lit se dessine en 4 cm sur 1,8 cm, soit 7,2 cm².<br>Contrôle : 7,2 × 2500 = 18 000 cm² = 1,8 m² = 2 × 0,9.'},
  {kind:'Problème',h:'La largeur de la rivière',
   p:'Zoé veut mesurer une rivière sans la traverser. Elle se place en A, face à un arbre T sur l’autre rive. Elle longe la berge sur 30 m jusqu’au piquet B, puis encore 10 m jusqu’en C. Là, elle s’éloigne de la rivière à angle droit jusqu’au point D, où elle voit B et l’arbre alignés : CD = 6 m.',
   fig:(()=>{ const P=plane({x:[-4,44],y:[-9,22],w:320,grid:false,axes:false}); P.rect(-4,0,48,18,{fill:'var(--sci)',fo:.15,c:null}).seg(-4,0,44,0,{c:'var(--muted)',w:1.5}).seg(-4,18,44,18,{c:'var(--muted)',w:1.5});
     P.seg(0,0,0,18,{c:'var(--ink)',w:2,dash:true}).seg(0,18,40,-6,{c:'var(--spark)',w:2}).seg(0,0,40,0,{c:'var(--ink)',w:2}).seg(40,0,40,-6,{c:'var(--ink)',w:2});
     P.dot(0,0,{l:'A',dx:-16,dy:14}).dot(0,18,{l:'T'}).dot(30,0,{l:'B',dx:-4,dy:16}).dot(40,0,{l:'C'}).dot(40,-6,{l:'D'}).text(15,0,'30 m',{a:'middle',dy:14,s:11}).text(35,0,'10',{a:'middle',dy:-6,s:11}).text(40,-3,'6 m',{dx:8,s:11}); return P.svg(); })(),
   parts:[
    {q:'a) Pourquoi les triangles TAB et DCB sont-ils semblables ?',opts:['Parce que AB = 3 · BC','Ils ont deux angles égaux : un angle droit et les angles opposés en B','Parce que la rivière est droite','Parce que CD = 6 m'],ans:1,hint:'Regarde les angles en A, en C et en B.',why:'Les angles en A et en C sont droits, et les angles en B sont opposés par le sommet. Deux angles égaux suffisent.'},
    {q:'b) Quelle est la largeur AT de la rivière ?',unit:'m',ans:18,hint:'AT ÷ CD = AB ÷ BC.',why:'AT = CD × AB ÷ BC = 6 × 30 ÷ 10 = 18 m.'},
    {q:'c) Un autre jour, Zoé prend AB = 24 m et BC = 8 m. À quelle distance CD verra-t-elle l’alignement ?',unit:'m',ans:6,hint:'La largeur de la rivière n’a pas changé.',why:'CD = AT × BC ÷ AB = 18 × 8 ÷ 24 = 6 m.'},
    {q:'d) Avec les mesures de départ, Zoé s’est trompée : en vrai CD = 6,5 m. De combien de mètres sa largeur était-elle fausse ?',unit:'m',ans:1.5,tol:.001,hint:'Recalcule AT avec 6,5 m.',why:'6,5 × 3 = 19,5 m au lieu de 18 m : une erreur de 1,5 m. L’erreur sur CD est multipliée par AB ÷ BC = 3.'},
   ],
   sol:'Les triangles TAB et DCB ont un angle droit (en A et en C) et des angles opposés par le sommet en B : ils sont semblables.<br>Donc AT ÷ CD = AB ÷ BC = 30 ÷ 10 = 3, et AT = 3 × 6 = 18 m.<br>Avec AB = 24 et BC = 8, le rapport reste 3 : CD = 18 ÷ 3 = 6 m.<br>Une erreur de 0,5 m sur CD devient 3 × 0,5 = 1,5 m sur la largeur. Pour être précis, il vaut mieux un rapport AB ÷ BC petit.'},
 ]},
);
