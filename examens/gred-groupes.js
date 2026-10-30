/* Déclic — examen de compétence : Notion de groupe */
(()=>{
const B=x=>'<b>'+x+'</b>', tab=(op,E,rows)=>mat([[op,...E].map(B),...E.map((x,i)=>[B(x),...rows[i]])]);
// Triangle : case ligne g, colonne f = g ∘ f (d’abord f, puis g)
const D3=['e','r','r²','s₁','s₂','s₃'];
const tD3='<p>Table du groupe du triangle (case ligne <i>g</i>, colonne <i>f</i> : <i>g</i> ∘ <i>f</i>, d’abord <i>f</i>) :</p>'+tab('∘',D3,[
  ['e','r','r²','s₁','s₂','s₃'],['r','r²','e','s₃','s₁','s₂'],['r²','e','r','s₂','s₃','s₁'],
  ['s₁','s₂','s₃','e','r','r²'],['s₂','s₃','s₁','r²','e','r'],['s₃','s₁','s₂','r','r²','e']]);
EXAMS['gred-groupes']=[
 {n:'Vérifier les axiomes', r:'Vérifier qu’on a un groupe', qs:[
   {q:'Lequel de ces couples est un groupe&nbsp;?', opts:['(ℕ*, ·)','(ℚ, ·)','(2ℤ, +), les entiers pairs avec l’addition','(ℝ, −)'], ans:2, why:'La somme de deux pairs est paire, + est associative, 0 est pair et l’opposé d’un pair est pair. (ℕ*, ·) : 2 n’a pas d’inverse dans ℕ*. (ℚ, ·) : 0 n’a pas d’inverse. (ℝ, −) : pas associative.'},
   {q:'Pourquoi (ℚ, ·) n’est-il pas un groupe&nbsp;?', opts:['La multiplication n’est pas interne sur ℚ','Il n’y a pas de neutre','0 n’a pas d’inverse : 0 · <i>x</i> = 1 n’a pas de solution','La multiplication n’est pas associative'], ans:2, why:'· est interne, associative, de neutre 1, mais 0 · <i>x</i> = 0 ≠ 1 pour tout <i>x</i>. Il faut retirer 0 : (ℚ*, ·) est un groupe.'},
   {q:'Sur <i>G</i> = ℝ \\ {1}, on pose <i>a</i> ∗ <i>b</i> = <i>a</i> + <i>b</i> − <i>ab</i>. C’est un groupe de neutre 0. Quel est le symétrique de 5&nbsp;?', lab:'symétrique =', ans:1.25, why:'5 + <i>x</i> − 5<i>x</i> = 0 donne −4<i>x</i> = −5, <i>x</i> = 5/4 = 1,25, qui est bien dans <i>G</i> (≠ 1). Vérification : 5 + 1,25 − 6,25 = 0.'},
   {q:'On essaie de faire de (ℤ/4ℤ \\ {0}, ·) un groupe. Quel axiome échoue en premier&nbsp;?', opts:['L’associativité','Le neutre : 1 n’est pas neutre','La loi n’est pas interne : 2 · 2 = 0 sort de l’ensemble','3 n’a pas d’inverse'], ans:2, why:'2 · 2 = 4 ≡ 0, qu’on a retiré. Le neutre 1 existe, et 3 · 3 = 9 ≡ 1 : 3 est son propre inverse.'},
 ]},
 {n:'Règles de calcul dans un groupe', r:'Premières règles de calcul', qs:[
   {q:'Dans un groupe quelconque, que vaut (<i>ab</i>⁻¹)⁻¹&nbsp;?', opts:['<i>a</i>⁻¹<i>b</i>','<i>ba</i>⁻¹','<i>b</i>⁻¹<i>a</i>','<i>a</i>⁻¹<i>b</i>⁻¹'], ans:1, why:'(<i>xy</i>)⁻¹ = <i>y</i>⁻¹<i>x</i>⁻¹ avec <i>x</i> = <i>a</i> et <i>y</i> = <i>b</i>⁻¹ : (<i>b</i>⁻¹)⁻¹<i>a</i>⁻¹ = <i>ba</i>⁻¹.'},
   {q:tD3+'Que vaut (<i>s</i>₁ ∘ <i>s</i>₂)⁻¹&nbsp;?', opts:['<i>r</i>','<i>r</i>²','<i>s</i>₃','<i>e</i>'], ans:1, why:'(<i>s</i>₁ ∘ <i>s</i>₂)⁻¹ = <i>s</i>₂⁻¹ ∘ <i>s</i>₁⁻¹ = <i>s</i>₂ ∘ <i>s</i>₁ = <i>r</i>² (ligne <i>s</i>₂, colonne <i>s</i>₁). Contrôle : <i>s</i>₁ ∘ <i>s</i>₂ = <i>r</i>, et <i>r</i>⁻¹ = <i>r</i>².'},
   {q:'Dans un groupe non abélien, laquelle de ces implications peut être fausse&nbsp;?', opts:['<i>ax</i> = <i>ay</i> ⇒ <i>x</i> = <i>y</i>','<i>xa</i> = <i>ya</i> ⇒ <i>x</i> = <i>y</i>','<i>ax</i> = <i>ya</i> ⇒ <i>x</i> = <i>y</i>','(<i>a</i>⁻¹)⁻¹ = <i>a</i>'], ans:2, why:'On ne simplifie que du même côté. Dans le triangle, <i>r</i> ∘ <i>s</i>₁ = <i>s</i>₃ = <i>s</i>₂ ∘ <i>r</i>, mais <i>s</i>₁ ≠ <i>s</i>₂.'},
   {q:'Pour prouver que <i>b</i>⁻¹<i>a</i>⁻¹ est l’inverse de <i>ab</i>, quel regroupement fait-on dans (<i>ab</i>)(<i>b</i>⁻¹<i>a</i>⁻¹)&nbsp;?', opts:['On échange <i>b</i> et <i>a</i>⁻¹','<i>a</i>(<i>bb</i>⁻¹)<i>a</i>⁻¹ = <i>aa</i>⁻¹ = <i>e</i>, grâce à l’associativité','On utilise <i>ab</i> = <i>ba</i>','On simplifie par <i>a</i> à gauche et à droite'], ans:1, why:'L’associativité permet de regrouper <i>bb</i>⁻¹ = <i>e</i> au milieu, puis <i>aa</i>⁻¹ = <i>e</i>. Aucune commutativité n’est nécessaire.'},
 ]},
 {n:'Résoudre une équation', r:'Résoudre une équation dans un groupe', qs:[
   {q:'Dans ((ℤ/11ℤ)*, ·), résous 3<i>x</i> = 7 (représentant entre 1 et 10).', lab:'x =', ans:6, why:'3 · 4 = 12 ≡ 1, donc 3⁻¹ = 4 et <i>x</i> = 4 · 7 = 28 ≡ 6. Vérification : 3 · 6 = 18 ≡ 7.'},
   {q:'Dans ((ℤ/7ℤ)*, ·), résous 5<i>x</i> = 2 (représentant entre 1 et 6).', lab:'x =', ans:6, why:'5 · 3 = 15 ≡ 1, donc 5⁻¹ = 3 et <i>x</i> = 3 · 2 = 6. Vérification : 5 · 6 = 30 ≡ 2.'},
   {q:'Dans (ℤ/12ℤ, +), résous <i>x</i> + 9 = 4 (représentant entre 0 et 11).', lab:'x =', ans:7, why:'On ajoute l’opposé de 9, qui est 3 : <i>x</i> = 4 + 3 = 7. Vérification : 7 + 9 = 16 ≡ 4.'},
   {q:tD3+'Résous <i>s</i>₂ ∘ <i>x</i> = <i>r</i>.', opts:['<i>s</i>₁','<i>s</i>₃','<i>r</i>²','<i>s</i>₂'], ans:1, why:'<i>s</i>₂ est à gauche : <i>x</i> = <i>s</i>₂⁻¹ ∘ <i>r</i> = <i>s</i>₂ ∘ <i>r</i> = <i>s</i>₃. Vérification : <i>s</i>₂ ∘ <i>s</i>₃ = <i>r</i>.'},
   {q:tD3+'Résous <i>x</i> ∘ <i>s</i>₂ = <i>r</i>.', opts:['<i>s</i>₁','<i>s</i>₃','<i>r</i>²','<i>e</i>'], ans:0, why:'<i>s</i>₂ est à droite : <i>x</i> = <i>r</i> ∘ <i>s</i>₂⁻¹ = <i>r</i> ∘ <i>s</i>₂ = <i>s</i>₁. Vérification : <i>s</i>₁ ∘ <i>s</i>₂ = <i>r</i>. La solution diffère de celle de <i>s</i>₂ ∘ <i>x</i> = <i>r</i>.'},
 ]},
 {n:'Puissances', r:'Puissances', qs:[
   {q:'Dans (ℤ/10ℤ, +), calcule 7 · 6 = 6 + 6 + 6 + 6 + 6 + 6 + 6 (représentant entre 0 et 9).', lab:'7 · 6 =', ans:2, why:'7 · 6 = 42 = 4 · 10 + 2, donc 7 · 6 ≡ 2.'},
   {q:'Dans (ℤ/9ℤ, +), calcule (−4) · 2, c’est-à-dire 4 · (−2) (représentant entre 0 et 8).', lab:'(−4) · 2 =', ans:1, why:'−2 ≡ 7, donc 4 · 7 = 28 = 27 + 1 ≡ 1. Directement : −8 = −9 + 1 ≡ 1.'},
   {q:'Dans ((ℤ/7ℤ)*, ·), calcule 3⁴ (représentant entre 1 et 6).', lab:'3⁴ =', ans:4, why:'3² = 9 ≡ 2, puis 3⁴ = 2² = 4.'},
   {q:tD3+'Que vaut (<i>r</i> ∘ <i>s</i>₂)²&nbsp;?', opts:['<i>r</i>²','<i>e</i>','<i>s</i>₁','<i>r</i>'], ans:1, why:'<i>r</i> ∘ <i>s</i>₂ = <i>s</i>₁ et <i>s</i>₁ ∘ <i>s</i>₁ = <i>e</i>. Le piège <i>r</i>² ∘ <i>s</i>₂² = <i>r</i>² utilise (<i>ab</i>)² = <i>a</i>²<i>b</i>², faux quand <i>a</i> et <i>b</i> ne commutent pas.'},
 ]},
 {n:'Compléter la table d’un groupe', r:'Compléter la table d’un groupe', qs:[
   {q:'Un groupe a quatre éléments <i>e</i>, <i>a</i>, <i>b</i>, <i>c</i>, de neutre <i>e</i>, et l’on sait que <i>a</i> ∗ <i>a</i> = <i>c</i>. Que vaut <i>a</i> ∗ <i>c</i>&nbsp;?', opts:['<i>a</i>','<i>b</i>','<i>c</i>','<i>e</i>'], ans:1, why:'Dans la ligne <i>a</i>, <i>a</i> et <i>c</i> sont placés. Il reste <i>e</i> et <i>b</i> pour <i>a</i> ∗ <i>b</i> et <i>a</i> ∗ <i>c</i>. Or <i>a</i> ∗ <i>b</i> ≠ <i>b</i> (déjà dans la colonne <i>b</i>), donc <i>a</i> ∗ <i>b</i> = <i>e</i> et <i>a</i> ∗ <i>c</i> = <i>b</i>.'},
   {q:'Un groupe a quatre éléments <i>e</i>, <i>a</i>, <i>b</i>, <i>c</i>, de neutre <i>e</i>, avec <i>a</i> ∗ <i>a</i> = <i>e</i> et <i>b</i> ∗ <i>b</i> = <i>e</i>. Que vaut <i>c</i> ∗ <i>a</i>&nbsp;?', opts:['<i>e</i>','<i>a</i>','<i>b</i>','<i>c</i>'], ans:2, why:'Ligne <i>a</i> : <i>a</i>, <i>e</i>, puis <i>a</i> ∗ <i>b</i> = <i>c</i> (car <i>b</i> est déjà dans la colonne <i>b</i>). La colonne <i>a</i> contient alors <i>a</i> (<i>e</i> ∗ <i>a</i>) et <i>e</i> (<i>a</i> ∗ <i>a</i>) ; <i>b</i> ∗ <i>a</i> ≠ <i>b</i> (ligne <i>b</i>), donc <i>b</i> ∗ <i>a</i> = <i>c</i>, et il reste <i>c</i> ∗ <i>a</i> = <i>b</i>.'},
   {q:'Un groupe a quatre éléments <i>e</i>, <i>a</i>, <i>b</i>, <i>c</i>, de neutre <i>e</i>, avec <i>a</i> ∗ <i>a</i> = <i>b</i>. Que vaut <i>b</i> ∗ <i>b</i>&nbsp;?', opts:['<i>a</i>','<i>b</i>','<i>c</i>','<i>e</i>'], ans:3, why:'Ligne <i>a</i> : <i>a</i> ∗ <i>c</i> ≠ <i>c</i> (déjà dans la colonne <i>c</i>), donc <i>a</i> ∗ <i>c</i> = <i>e</i> et <i>a</i> ∗ <i>b</i> = <i>c</i>. Dans la ligne <i>b</i>, <i>b</i> ∗ <i>b</i> vaut <i>e</i> ou <i>a</i> (pas <i>b</i>, ni <i>c</i> déjà dans la colonne <i>b</i>). Si c’était <i>a</i>, il faudrait <i>b</i> ∗ <i>c</i> ∈ {<i>c</i> ; <i>e</i>}, mais la colonne <i>c</i> contient déjà <i>c</i> et <i>e</i> : impossible. Donc <i>b</i> ∗ <i>b</i> = <i>e</i>. C’est ℤ/4ℤ avec <i>a</i> = 1, <i>b</i> = 2.'},
   {q:'Laquelle de ces lignes peut apparaître dans la table d’un groupe fini {<i>e</i> ; <i>x</i> ; <i>y</i> ; <i>z</i>} (colonnes dans l’ordre <i>e</i>, <i>x</i>, <i>y</i>, <i>z</i>)&nbsp;?', opts:['ligne de <i>x</i> : <i>x</i>, <i>e</i>, <i>x</i>, <i>y</i>','ligne de <i>x</i> : <i>e</i>, <i>x</i>, <i>z</i>, <i>y</i>','ligne de <i>x</i> : <i>x</i>, <i>y</i>, <i>z</i>, <i>e</i>','ligne de <i>x</i> : <i>x</i>, <i>z</i>, <i>z</i>, <i>e</i>'], ans:2, why:'La ligne de <i>x</i> commence par <i>x</i> ∗ <i>e</i> = <i>x</i> et contient chaque élément une seule fois (carré latin). La 1re et la 4e répètent un élément, la 2e commence par <i>e</i>.'},
 ]},
 {n:'Inverses modulo un nombre premier', r:'Inverser modulo un nombre premier', qs:[
   {q:'Quel est l’inverse de 7 dans (ℤ/11ℤ)* (représentant entre 1 et 10)&nbsp;?', lab:'7⁻¹ =', ans:8, why:'Nombres ≡ 1 modulo 11 : 1, 12, 23, 34, 45, 56, … ; 56 = 7 · 8. Donc 7⁻¹ = 8.'},
   {q:'Quel est l’inverse de 4 dans (ℤ/17ℤ)* (représentant entre 1 et 16)&nbsp;?', lab:'4⁻¹ =', ans:13, why:'Nombres ≡ 1 modulo 17 : 1, 18, 35, 52, … ; 52 = 4 · 13. Donc 4⁻¹ = 13.'},
   {q:'Quel est l’inverse de 9 dans (ℤ/13ℤ)* (représentant entre 1 et 12)&nbsp;?', lab:'9⁻¹ =', ans:3, why:'9 · 3 = 27 = 26 + 1 ≡ 1. Donc 9⁻¹ = 3.'},
   {q:'Pourquoi (ℤ/9ℤ \\ {0}, ·) n’est-il pas un groupe&nbsp;?', opts:['Parce que 9 est impair','Parce que 3 · 3 = 9 ≡ 0 sort de l’ensemble','Parce que 1 n’est pas neutre','Parce que 2 n’a pas d’inverse'], ans:1, why:'9 n’est pas premier : 3 · 3 ≡ 0, la loi n’est pas interne. (2 a bien un inverse : 2 · 5 = 10 ≡ 1.)'},
 ]},
 {n:'Matrices inversibles', r:'Matrices inversibles et bijections', qs:[
   {q:'Soit <i>A</i> = '+mat([[2,1],[1,1]])+' et <i>B</i> = '+mat([[1,0],[3,1]])+'. Quel est le coefficient en bas à gauche de <i>AB</i>&nbsp;?', lab:'coefficient =', ans:4, why:'Ligne 2 de <i>A</i> fois colonne 1 de <i>B</i> : 1 · 1 + 1 · 3 = 4.'},
   {q:'Soit <i>A</i> = '+mat([[2,1],[1,1]])+' et <i>B</i> = '+mat([[1,0],[3,1]])+'. Quel est le coefficient en bas à gauche de <i>BA</i>&nbsp;?', lab:'coefficient =', ans:7, why:'Ligne 2 de <i>B</i> fois colonne 1 de <i>A</i> : 3 · 2 + 1 · 1 = 7. Comme <i>AB</i> a 4 à cette place, <i>AB</i> ≠ <i>BA</i>.'},
   {q:'Laquelle de ces matrices n’appartient pas à GL₂(ℝ)&nbsp;?', opts:[mat([[2,4],[1,2]]),mat([[2,1],[1,1]]),mat([[0,1],[1,0]]),mat([[3,0],[0,'−1']])], ans:0, why:'Son déterminant vaut 2 · 2 − 4 · 1 = 0 : elle n’est pas inversible. Les autres ont pour déterminants 1, −1 et −3.'},
 ]},
 {n:'Ordre d’un groupe', r:'Ordre d’un groupe', qs:[
   {q:'Quel est l’ordre du groupe 𝔖({1 ; 2 ; 3 ; 4 ; 5}) des bijections de {1 ; 2 ; 3 ; 4 ; 5}&nbsp;?', lab:'ordre =', ans:120, why:'5 choix pour l’image de 1, puis 4, 3, 2, 1 : 5! = 120.'},
   {q:'Quel est l’ordre du groupe ((ℤ/13ℤ)*, ·)&nbsp;?', lab:'ordre =', ans:12, why:'Ce sont les classes non nulles modulo 13 : 1, 2, …, 12, soit <i>p</i> − 1 = 12 éléments.'},
   {q:'Lequel de ces groupes est d’ordre infini&nbsp;?', opts:['(ℤ/100ℤ, +)','le groupe du triangle','GL₂(ℝ)','le groupe de Klein'], ans:2, why:'Toutes les matrices '+mat([['<i>t</i>',0],[0,1]])+' avec <i>t</i> ≠ 0 sont inversibles : il y en a une infinité. Les autres ont 100, 6 et 4 éléments.'},
 ]},
];
})();
