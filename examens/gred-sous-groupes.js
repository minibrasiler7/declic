/* Déclic — examen de compétence : Sous-groupes */
(()=>{
const B=x=>'<b>'+x+'</b>', tab=(op,E,rows)=>mat([[op,...E].map(B),...E.map((x,i)=>[B(x),...rows[i]])]);
// Triangle : case ligne g, colonne f = g ∘ f (d’abord f, puis g)
const D3=['e','r','r²','s₁','s₂','s₃'];
const tD3='<p>Table du groupe du triangle <i>D</i>₃ (case ligne <i>g</i>, colonne <i>f</i> : <i>g</i> ∘ <i>f</i>, d’abord <i>f</i>) :</p>'+tab('∘',D3,[
  ['e','r','r²','s₁','s₂','s₃'],['r','r²','e','s₃','s₁','s₂'],['r²','e','r','s₂','s₃','s₁'],
  ['s₁','s₂','s₃','e','r','r²'],['s₂','s₃','s₁','r²','e','r'],['s₃','s₁','s₂','r','r²','e']]);
EXAMS['gred-sous-groupes']=[
 {n:'Reconnaître un sous-groupe', r:'Le critère du sous-groupe', qs:[
   {q:'Laquelle de ces parties est un sous-groupe de (ℤ, +)&nbsp;?', opts:['les entiers positifs ou nuls','{0 ; 1}','7ℤ = {7<i>k</i> : <i>k</i> ∈ ℤ}','les entiers multiples de 2 ou de 5'], ans:2, why:'0 ∈ 7ℤ et 7<i>k</i> − 7<i>l</i> = 7(<i>k</i> − <i>l</i>) ∈ 7ℤ. Pour les autres : 0 − 1 = −1 n’est pas positif, 1 + 1 = 2 ∉ {0 ; 1}, et 5 − 2 = 3 n’est multiple ni de 2 ni de 5.'},
   {q:'Laquelle de ces parties n’est pas un sous-groupe de (ℝ*, ·)&nbsp;?', opts:['{<i>x</i> : <i>x</i> &gt; 0}','{1 ; −1}','{<i>x</i> : |<i>x</i>| ≥ 1}','{3<sup><i>k</i></sup> : <i>k</i> ∈ ℤ}'], ans:2, why:'2 est dans {|<i>x</i>| ≥ 1}, mais son inverse ½ n’y est pas : le critère <i>a</i>/<i>b</i> échoue avec <i>a</i> = 1, <i>b</i> = 2. Les autres passent : quotient de positifs, (±1)/(±1) = ±1, 3<sup><i>k</i></sup>/3<sup><i>l</i></sup> = 3<sup><i>k</i>−<i>l</i></sup>.'},
   {q:'Laquelle de ces parties est un sous-groupe de (ℤ/12ℤ, +)&nbsp;?', opts:['{0 ; 3 ; 6}','{0 ; 4 ; 8}','{0 ; 5}','{1 ; 5 ; 7 ; 11}'], ans:1, why:'{0 ; 4 ; 8} contient 0 et les différences restent dedans (8 − 4 = 4, 4 − 8 ≡ 8, 0 − 4 ≡ 8). Mais 3 + 6 = 9 ∉ {0 ; 3 ; 6}, 5 + 5 = 10 ∉ {0 ; 5}, et {1 ; 5 ; 7 ; 11} ne contient pas 0.'},
   {q:'Pour appliquer le critère du sous-groupe à une partie <i>H</i> non vide de (ℝ*, ·), que faut-il vérifier pour tous <i>a</i>, <i>b</i> ∈ <i>H</i>&nbsp;?', opts:['<i>a</i> − <i>b</i> ∈ <i>H</i>','<i>a</i>/<i>b</i> ∈ <i>H</i>','<i>a</i> + <i>b</i> ∈ <i>H</i>','<i>ab</i> ∈ <i>H</i> seulement'], ans:1, why:'En notation multiplicative, <i>ab</i>⁻¹ est le quotient <i>a</i>/<i>b</i>. La différence <i>a</i> − <i>b</i>, c’est la version additive. La stabilité par produit seule ne suffit pas (pense à ℕ* dans ℚ*).'},
   {q:tD3+'La partie {<i>e</i> ; <i>r</i>} est-elle un sous-groupe de <i>D</i>₃&nbsp;?', opts:['Oui, elle contient <i>e</i>','Oui, car 2 divise 6','Non : <i>r</i> ∘ <i>r</i> = <i>r</i>² n’y est pas','Non, car <i>r</i> n’a pas d’inverse'], ans:2, why:'Une partie qui contient <i>r</i> doit contenir ses puissances : <i>r</i>² ∉ {<i>e</i> ; <i>r</i>}. Le plus petit sous-groupe qui contient <i>r</i> est {<i>e</i> ; <i>r</i> ; <i>r</i>²}.'},
 ]},
 {n:'Intersection et réunion', r:'Intersection et réunion', qs:[
   {q:'L’intersection 10ℤ ∩ 15ℤ est un sous-groupe de ℤ, de la forme <i>n</i>ℤ. Que vaut <i>n</i>&nbsp;?', lab:'n =', ans:30, why:'Les multiples communs de 10 et de 15 sont les multiples de leur ppcm, 30 : 10ℤ ∩ 15ℤ = 30ℤ.'},
   {q:'L’intersection 4ℤ ∩ 8ℤ est de la forme <i>n</i>ℤ. Que vaut <i>n</i>&nbsp;?', lab:'n =', ans:8, why:'Tout multiple de 8 est multiple de 4 : 8ℤ ⊂ 4ℤ, donc 4ℤ ∩ 8ℤ = 8ℤ (et non 32ℤ).'},
   {q:'Pourquoi 4ℤ ∪ 6ℤ n’est-il pas un sous-groupe de ℤ&nbsp;?', opts:['Il ne contient pas 0','6 et 4 y sont, mais 6 − 4 = 2 n’y est pas','Il n’est pas stable par opposé','4 et 6 n’ont pas de multiple commun'], ans:1, why:'2 n’est multiple ni de 4 ni de 6 : le critère échoue. 0 et les opposés sont bien dans la réunion.'},
   {q:'Laquelle de ces réunions est un sous-groupe de ℤ&nbsp;?', opts:['2ℤ ∪ 3ℤ','3ℤ ∪ 6ℤ','4ℤ ∪ 10ℤ','5ℤ ∪ 7ℤ'], ans:1, why:'6ℤ ⊂ 3ℤ, donc 3ℤ ∪ 6ℤ = 3ℤ. Une réunion de deux sous-groupes n’en est un que si l’un contient l’autre : 3 − 2, 10 − 4 = 6 et 7 − 5 = 2 font échouer les autres.'},
 ]},
 {n:'Les sous-groupes de ℤ', r:'Les sous-groupes de ℤ', qs:[
   {q:'Le plus petit sous-groupe de ℤ qui contient 12 et 18 s’écrit <i>n</i>ℤ. Que vaut <i>n</i>&nbsp;?', lab:'n =', ans:6, why:'Il contient 18 − 12 = 6, donc 6ℤ. Et 6ℤ contient déjà 12 et 18. C’est 6ℤ (6 = pgcd(12 ; 18)).'},
   {q:'Un sous-groupe <i>H</i> de ℤ contient 35 et 21. Que peut-on affirmer&nbsp;?', opts:['<i>H</i> = 21ℤ','<i>H</i> contient 7, donc 7ℤ ⊂ <i>H</i>','<i>H</i> = 735ℤ','<i>H</i> ne contient que des multiples de 35'], ans:1, why:'35 − 21 = 14, puis 21 − 14 = 7 sont dans <i>H</i> (stabilité par différence). Donc tous les multiples de 7 y sont.'},
   {q:'L’ensemble des entiers <i>k</i> tels que 6<i>k</i> est un multiple de 4 est un sous-groupe de ℤ, de la forme <i>n</i>ℤ. Que vaut <i>n</i>&nbsp;?', lab:'n =', ans:2, why:'6<i>k</i> multiple de 4 ⇔ 3<i>k</i> pair ⇔ <i>k</i> pair. Son plus petit élément strictement positif est 2 : c’est 2ℤ.'},
 ]},
 {n:'Ordre d’un élément', r:'Calculer l’ordre d’un élément', qs:[
   {q:'Quel est l’ordre de 3 dans ((ℤ/11ℤ)*, ·)&nbsp;?', lab:'ordre =', ans:5, why:'3, 3² = 9, 3³ = 27 ≡ 5, 3⁴ ≡ 15 ≡ 4, 3⁵ ≡ 12 ≡ 1. Il faut 5 pas.'},
   {q:'Quel est l’ordre de 2 dans ((ℤ/11ℤ)*, ·)&nbsp;?', lab:'ordre =', ans:10, why:'2, 4, 8, 16 ≡ 5, 10, 20 ≡ 9, 18 ≡ 7, 14 ≡ 3, 6, 12 ≡ 1 : 10 pas. 2 engendre tout le groupe.'},
   {q:'Quel est l’ordre de 12 dans (ℤ/18ℤ, +)&nbsp;?', lab:'ordre =', ans:3, why:'pgcd(18 ; 12) = 6, donc l’ordre est 18/6 = 3. Contrôle : 12, 24 ≡ 6, 18 ≡ 0.'},
   {q:'Quel est l’ordre de 8 dans (ℤ/20ℤ, +)&nbsp;?', lab:'ordre =', ans:5, why:'pgcd(20 ; 8) = 4, donc l’ordre est 20/4 = 5. Contrôle : 8, 16, 24 ≡ 4, 12, 20 ≡ 0.'},
   {q:'Lequel de ces éléments de (ℚ*, ·) est d’ordre infini&nbsp;?', opts:['1','−1','2','aucun : ℚ* est infini, mais chaque élément a un ordre fini'], ans:2, why:'2, 4, 8, … ne valent jamais 1 : 2 est d’ordre infini. 1 est d’ordre 1 et −1 d’ordre 2.'},
 ]},
 {n:'Groupes cycliques et générateurs', r:'Générateurs et sous-groupes de ℤ/nℤ', qs:[
   {q:'Combien d’éléments de ℤ/20ℤ sont des générateurs&nbsp;?', lab:'nombre :', ans:8, why:'Il faut <i>k</i> premier avec 20 = 2² · 5 : 1, 3, 7, 9, 11, 13, 17, 19. Il y en a 8.'},
   {q:'Combien de sous-groupes a ℤ/20ℤ&nbsp;?', lab:'nombre :', ans:6, why:'Un sous-groupe ⟨<i>d</i>⟩ par diviseur <i>d</i> de 20 : 1, 2, 4, 5, 10, 20. Six sous-groupes.'},
   {q:'Dans ℤ/15ℤ, quel est le plus petit élément non nul du sous-groupe ⟨6⟩&nbsp;?', lab:'élément :', ans:3, why:'⟨6⟩ = ⟨pgcd(15 ; 6)⟩ = ⟨3⟩ = {0 ; 3 ; 6 ; 9 ; 12}. Contrôle : 6, 12, 18 ≡ 3, 9, 15 ≡ 0.'},
   {q:'Lequel de ces éléments engendre ((ℤ/7ℤ)*, ·)&nbsp;?', opts:['2','4','5','6'], ans:2, why:'5, 25 ≡ 4, 20 ≡ 6, 30 ≡ 2, 10 ≡ 3, 15 ≡ 1 : 5 est d’ordre 6. En revanche 2 et 4 sont d’ordre 3 (2³ = 8 ≡ 1) et 6 d’ordre 2 (36 ≡ 1).'},
   {q:'Lequel de ces groupes n’est pas cyclique&nbsp;?', opts:['(ℤ, +)','((ℤ/5ℤ)*, ·)','le groupe de Klein <i>V</i>','(ℤ/9ℤ, +)'], ans:2, why:'Dans <i>V</i>, tout élément vérifie <i>x</i>² = <i>e</i> : aucun n’est d’ordre 4. ℤ = ⟨1⟩, (ℤ/5ℤ)* = ⟨2⟩ (2, 4, 3, 1) et ℤ/9ℤ = ⟨1⟩.'},
 ]},
 {n:'Classes et théorème de Lagrange', r:'Utiliser le théorème de Lagrange', qs:[
   {q:'Un groupe <i>G</i> a 35 éléments. Lequel de ces nombres ne peut pas être l’ordre d’un élément de <i>G</i>&nbsp;?', opts:['1','5','7','10'], ans:3, why:'L’ordre d’un élément divise l’ordre du groupe. 10 ne divise pas 35.'},
   {q:'En combien de classes à gauche le sous-groupe ⟨4⟩ découpe-t-il ℤ/20ℤ&nbsp;?', lab:'nombre de classes :', ans:4, why:'⟨4⟩ = {0 ; 4 ; 8 ; 12 ; 16} a 5 éléments, et 20 = 4 × 5 : il y a 4 classes.'},
   {q:'Un groupe a 13 éléments. Combien de ses éléments sont d’ordre 13&nbsp;?', lab:'nombre :', ans:12, why:'13 est premier : l’ordre d’un élément vaut 1 ou 13. Seul <i>e</i> est d’ordre 1, les 12 autres sont d’ordre 13 (le groupe est cyclique).'},
   {q:'Dans ((ℤ/13ℤ)*, ·), combien vaut 6²⁴ (représentant entre 1 et 12)&nbsp;?', lab:'6²⁴ =', ans:1, why:'Le groupe a 12 éléments, donc <i>a</i>¹² = 1 pour tout <i>a</i>. Alors 6²⁴ = (6¹²)² = 1.'},
   {q:tD3+'Avec <i>H</i> = {<i>e</i> ; <i>s</i>₂}, quelle est la classe à gauche <i>rH</i>&nbsp;?', opts:['{<i>r</i> ; <i>s</i>₃}','{<i>r</i> ; <i>s</i>₁}','{<i>r</i> ; <i>s</i>₂}','{<i>r</i> ; <i>r</i>²}'], ans:1, why:'<i>rH</i> = {<i>r</i> ∘ <i>e</i> ; <i>r</i> ∘ <i>s</i>₂} = {<i>r</i> ; <i>s</i>₁} (ligne <i>r</i>, colonne <i>s</i>₂).'},
   {q:'Un groupe a 8 éléments. Peut-il avoir un sous-groupe à 6 éléments&nbsp;?', opts:['Oui, s’il n’est pas commutatif','Oui, car 6 &lt; 8','Non : 6 ne divise pas 8','On ne peut pas savoir'], ans:2, why:'Par Lagrange, l’ordre d’un sous-groupe divise l’ordre du groupe. Les ordres possibles sont 1, 2, 4 et 8.'},
 ]},
];
})();
