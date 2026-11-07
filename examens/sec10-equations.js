/* Déclic — examen de compétence : Équations du premier degré (10e année) */
(()=>{
// balance équilibrée : L et R = {x: boîtes, u: poids de 1}
function balance(L,R){
  const P=plane({x:[0,10],y:[0,6],grid:false,axes:false});
  P.poly([[4.5,.2],[5.5,.2],[5,2.6]],{fill:'var(--muted)',fo:.45,c:'var(--muted)',w:1.5}); P.seg(2,2.6,8,2.6,{c:'var(--ink)',w:3.5});
  const pan=(xc,S)=>{ P.seg(xc,2.6,xc,2.95,{c:'var(--ink)',w:2.5}).seg(xc-1.75,2.95,xc+1.75,2.95,{c:'var(--ink)',w:4});
    const it=[]; for(let i=0;i<S.x;i++) it.push('x'); for(let i=0;i<S.u;i++) it.push('1');
    it.forEach((t,i)=>{ const cx=xc-1.3+(i%5)*.65, cy=3.35+Math.floor(i/5)*.68;
      if(t==='x'){ P.rect(cx-.29,cy-.29,.58,.58,{fill:'var(--accent)',fo:.55,c:'var(--accent)',w:1.5}); P.text(cx,cy,'x',{a:'middle',dy:4,s:11}); }
      else { P.circ(cx,cy,.25,{fill:'var(--spark)',fo:.6,c:'var(--spark)',w:1.5}); P.text(cx,cy,'1',{a:'middle',dy:4,s:10}); } }); };
  pan(2,L); pan(8,R); return P.svg(); }
EXAMS['sec10-equations']=[
 {n:'Équation, solution, vérification', r:'Vérifier qu’un nombre est solution', qs:[
   {q:'Dans l’équation 5<i>x</i> − 2 = 3<i>x</i> + 8, comment s’appelle la lettre <i>x</i>&nbsp;?', opts:['un membre','l’inconnue','la solution','un coefficient'], ans:1, why:'La lettre dont on cherche la valeur est l’inconnue. 5<i>x</i> − 2 et 3<i>x</i> + 8 sont les membres ; la solution est le nombre trouvé (ici 5).'},
   {q:'−2 est-il solution de 3<i>x</i> + 7 = <i>x</i> + 3&nbsp;?', opts:['Non, car 3 · (−2) + 7 = −13','Oui, car les deux membres valent 1','Non, car un nombre négatif ne peut pas être solution','Oui, car −2 + 3 = 1'], ans:1, why:'À gauche : 3 · (−2) + 7 = −6 + 7 = 1. À droite : −2 + 3 = 1. Les deux membres sont égaux.'},
   {q:'Quel nombre est solution de 2(<i>x</i> − 1) = <i>x</i> + 4&nbsp;?', opts:['3','4','5','6'], ans:3, why:'Pour <i>x</i> = 6 : à gauche 2 · 5 = 10, à droite 6 + 4 = 10. Pour 5 : 8 contre 9.'},
   {q:'Pour vérifier que 4 est solution de 2<i>x</i> + 1 = 9, Mia écrit « 2 · 4 = 8 + 1 = 9 ». Que penser de sa rédaction&nbsp;?', opts:['Elle est parfaite','Elle contient une fausse égalité : 2 · 4 ne vaut pas 9','4 n’est pas solution','Il fallait écrire 2 · 4 + 1 = 10'], ans:1, why:'4 est bien solution, mais « 2 · 4 = 8 + 1 » est faux. On écrit : à gauche 2 · 4 + 1 = 8 + 1 = 9, à droite 9.'},
   {q:'Pour quelle valeur de <i>a</i> le nombre 3 est-il solution de <i>a</i><i>x</i> − 5 = 7&nbsp;?', lab:'a =', ans:4, why:'On remplace <i>x</i> par 3 : 3<i>a</i> − 5 = 7, donc 3<i>a</i> = 12 et <i>a</i> = 4. Contrôle : 4 · 3 − 5 = 7.'},
 ]},
 {n:'Règles d’équivalence', r:'La balance et les règles d’équivalence', qs:[
   {q:'Pour passer de 3<i>x</i> + 5 = 11 à 3<i>x</i> = 6, on a :', opts:['divisé les deux membres par 5','retiré 5 aux deux membres','retiré 5 au membre de gauche seulement','ajouté 5 aux deux membres'], ans:1, why:'11 − 5 = 6 : on a retiré 5 des deux côtés. Retirer d’un seul côté déséquilibrerait la balance.'},
   {q:'Pour passer de −4<i>x</i> = 20 à <i>x</i> = −5, on a :', opts:['divisé les deux membres par −4','ajouté 4 aux deux membres','divisé les deux membres par 4','multiplié les deux membres par −4'], ans:0, why:'20 : (−4) = −5 : on a divisé les deux membres par −4, le coefficient de <i>x</i>.'},
   {q:'Laquelle de ces opérations n’est pas permise pour obtenir une équation équivalente&nbsp;?', opts:['ajouter 7 aux deux membres','retirer 2<i>x</i> aux deux membres','multiplier les deux membres par 0','diviser les deux membres par 3'], ans:2, why:'Multiplier par 0 donne 0 = 0, vrai pour tous les nombres : on perd l’équation. Le multiplicateur doit être non nul.'},
   {q:'La balance est en équilibre. Combien pèse une boîte <i>x</i>&nbsp;?', fig:balance({x:2,u:4},{x:0,u:10}), lab:'x =', ans:3, why:'2<i>x</i> + 4 = 10. On retire 4 poids de chaque côté : 2<i>x</i> = 6. On partage en 2 : <i>x</i> = 3.'},
   {q:'Paul passe de 2<i>x</i> + 6 = 10 à <i>x</i> + 6 = 5. Quelle est son erreur&nbsp;?', opts:['Aucune erreur','Il aurait dû retirer 6 d’abord, c’est obligatoire','Il n’a pas divisé le terme 6 par 2 : on divise chaque terme des deux membres','Il fallait diviser par 10'], ans:2, why:'Diviser les deux membres par 2 donne <i>x</i> + 3 = 5, donc <i>x</i> = 2. Paul a oublié de diviser le 6.'},
 ]},
 {n:'Résoudre pas à pas', r:'Résoudre une équation pas à pas', qs:[
   {q:'Résous 6<i>x</i> − 5 = 19.', lab:'x =', ans:4, why:'6<i>x</i> = 24, donc <i>x</i> = 4. Contrôle : 24 − 5 = 19.'},
   {q:'Résous 9 − 2<i>x</i> = 15.', lab:'x =', ans:-3, why:'On retire 9 : −2<i>x</i> = 6. On divise par −2 : <i>x</i> = −3. Contrôle : 9 + 6 = 15.'},
   {q:'Résous 8<i>x</i> + 3 = 5<i>x</i> + 18.', lab:'x =', ans:5, why:'On retire 5<i>x</i> : 3<i>x</i> + 3 = 18. On retire 3 : 3<i>x</i> = 15, donc <i>x</i> = 5. Contrôle : 43 = 43.'},
   {q:'Résous 2<i>x</i> − 7 = 6<i>x</i> + 9.', lab:'x =', ans:-4, why:'On retire 6<i>x</i> : −4<i>x</i> − 7 = 9. On ajoute 7 : −4<i>x</i> = 16, donc <i>x</i> = −4. Contrôle : −15 = −15.'},
   {q:'Résous 3<i>x</i> + 1 = 3. Donne la solution sous forme de fraction.', lab:'x =', ans:2/3, tol:0.001, show:'2/3', why:'3<i>x</i> = 2, donc <i>x</i> = 2/3. La solution n’est pas toujours un entier.'},
   {q:'Que peut-on dire de l’équation 5<i>x</i> + 2 = 5<i>x</i> + 9&nbsp;?', opts:['Sa solution est 0','Sa solution est 7','Elle n’a aucune solution','Tous les nombres sont solutions'], ans:2, why:'En retirant 5<i>x</i>, il reste 2 = 9, une égalité fausse : aucun nombre ne convient.'},
 ]},
 {n:'Équations avec parenthèses', r:'Équations avec des parenthèses', qs:[
   {q:'Résous 2(<i>x</i> + 3) = 14.', lab:'x =', ans:4, why:'2<i>x</i> + 6 = 14, donc 2<i>x</i> = 8 et <i>x</i> = 4.'},
   {q:'Résous 5(<i>x</i> − 2) = 3(<i>x</i> + 2).', lab:'x =', ans:8, why:'5<i>x</i> − 10 = 3<i>x</i> + 6, donc 2<i>x</i> = 16 et <i>x</i> = 8. Contrôle : 5 · 6 = 30 et 3 · 10 = 30.'},
   {q:'Résous 10 − (<i>x</i> − 5) = 2<i>x</i>.', lab:'x =', ans:5, why:'Le − change les signes : 10 − <i>x</i> + 5 = 2<i>x</i>, soit 15 − <i>x</i> = 2<i>x</i>, donc 15 = 3<i>x</i> et <i>x</i> = 5.'},
   {q:'Résous 3(2<i>x</i> − 1) − 4(<i>x</i> + 2) = 1.', lab:'x =', ans:6, why:'6<i>x</i> − 3 − 4<i>x</i> − 8 = 1, soit 2<i>x</i> − 11 = 1, donc 2<i>x</i> = 12 et <i>x</i> = 6.'},
 ]},
 {n:'Équations avec fractions', r:'Équations avec des fractions simples', qs:[
   {q:`Résous ${F('<i>x</i>',3)} + 2 = 7.`, lab:'x =', ans:15, why:'On multiplie tout par 3 : <i>x</i> + 6 = 21, donc <i>x</i> = 15. Contrôle : 5 + 2 = 7.'},
   {q:`Résous ${F('<i>x</i>',2)} + ${F('<i>x</i>',3)} = 10.`, lab:'x =', ans:12, why:'On multiplie tout par 6 : 3<i>x</i> + 2<i>x</i> = 60, donc 5<i>x</i> = 60 et <i>x</i> = 12.'},
   {q:`Résous ${F('<i>x</i> + 1',3)} = ${F('<i>x</i> − 1',2)}.`, lab:'x =', ans:5, why:'On multiplie par 6 : 2(<i>x</i> + 1) = 3(<i>x</i> − 1), soit 2<i>x</i> + 2 = 3<i>x</i> − 3, donc <i>x</i> = 5. Contrôle : 6/3 = 2 et 4/2 = 2.'},
   {q:`Pour supprimer les fractions de ${F('<i>x</i>',6)} + 1 = ${F('<i>x</i>',4)}, par quel plus petit nombre multiplie-t-on chaque terme&nbsp;?`, opts:['10','12','24','6'], ans:1, why:'Le ppmc de 6 et 4 est 12. 24 marcherait aussi, mais ce n’est pas le plus petit.'},
 ]},
 {n:'Mettre un problème en équation', r:'Résoudre un problème avec une équation', qs:[
   {q:'Une mère a 38 ans et sa fille 10 ans. Dans combien d’années la mère aura-t-elle le triple de l’âge de sa fille&nbsp;?', unit:'ans', ans:4, why:'Dans <i>n</i> ans : 38 + <i>n</i> = 3(10 + <i>n</i>), soit 38 + <i>n</i> = 30 + 3<i>n</i>, donc 8 = 2<i>n</i> et <i>n</i> = 4. Contrôle : 42 = 3 · 14.'},
   {q:'Un rectangle a une longueur égale au triple de sa largeur et un périmètre de 48 cm. Quelle est sa largeur&nbsp;?', unit:'cm', ans:6, why:'Soit <i>x</i> la largeur : 2<i>x</i> + 2 · 3<i>x</i> = 8<i>x</i> = 48, donc <i>x</i> = 6 cm. La longueur vaut 18 cm.'},
   {q:'La somme de quatre nombres entiers consécutifs vaut 74. Quel est le plus grand&nbsp;?', ans:20, why:'<i>n</i> + (<i>n</i> + 1) + (<i>n</i> + 2) + (<i>n</i> + 3) = 4<i>n</i> + 6 = 74, donc <i>n</i> = 17. Les nombres sont 17, 18, 19, 20.'},
   {q:'Trois cahiers et un classeur à 4,50 CHF coûtent 12 CHF en tout. Quel est le prix d’un cahier&nbsp;?', unit:'CHF', ans:2.5, tol:0.001, why:'3<i>c</i> + 4,5 = 12, donc 3<i>c</i> = 7,5 et <i>c</i> = 2,50 CHF.'},
   {q:'Dans ta tirelire, tu as deux fois plus de pièces de 2 CHF que de pièces de 5 CHF, pour un total de 45 CHF. Combien as-tu de pièces de 2 CHF&nbsp;?', ans:10, why:'Soit <i>x</i> le nombre de pièces de 5 CHF : 5<i>x</i> + 2 · 2<i>x</i> = 9<i>x</i> = 45, donc <i>x</i> = 5. Il y a 2 · 5 = 10 pièces de 2 CHF.'},
   {q:'Un triangle isocèle a une base de 8 cm et un périmètre de 30 cm. Si <i>x</i> est la longueur de chacun des deux côtés égaux, quelle équation faut-il résoudre&nbsp;?', opts:['<i>x</i> + 8 = 30','2<i>x</i> + 8 = 30','2(<i>x</i> + 8) = 30','8<i>x</i> = 30'], ans:1, why:'Le périmètre est la somme des trois côtés : <i>x</i> + <i>x</i> + 8 = 2<i>x</i> + 8 = 30, ce qui donne <i>x</i> = 11 cm.'},
 ]},
];
})();
