/* Déclic — examen de compétence : Plus court chemin et arbre couvrant */
(()=>{
// petit dessin de graphe pondéré
const gfig=(P,E,H)=>{ let s='';
  E.forEach(([u,v])=>{ const [x1,y1]=P[u],[x2,y2]=P[v]; s+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--muted)" stroke-width="2"/>`; });
  E.forEach(([u,v,w])=>{ const mx=(P[u][0]+P[v][0])/2, my=(P[u][1]+P[v][1])/2; s+=`<circle cx="${mx}" cy="${my}" r="10" fill="var(--surface)"/><text x="${mx}" y="${my+4}" font-size="12" font-weight="700" text-anchor="middle" fill="var(--muted)">${w}</text>`; });
  Object.entries(P).forEach(([k,[x,y]])=>{ s+=`<circle cx="${x}" cy="${y}" r="15" fill="var(--surface)" stroke="var(--ink)" stroke-width="2.5"/><text x="${x}" y="${y+5}" font-size="14" font-weight="700" text-anchor="middle" fill="var(--ink)">${k}</text>`; });
  return `<svg viewBox="0 0 320 ${H}" width="320" role="img">${s}</svg>`; };
const HP={S:[25,100],A:[115,35],B:[115,165],C:[205,35],D:[205,165],T:[295,100]};
const HE=[['S','A',4],['S','B',2],['A','B',1],['A','C',5],['B','C',8],['B','D',10],['C','D',2],['C','T',6],['D','T',3]];
const HF='<p>Arêtes : S–A (4), S–B (2), A–B (1), A–C (5), B–C (8), B–D (10), C–D (2), C–T (6), D–T (3).</p>'+gfig(HP,HE,200);
const KP={A:[25,100],B:[115,35],C:[115,165],D:[205,35],E:[205,165],F:[295,35],G:[295,165]};
const KE=[['A','B',6],['A','C',3],['B','C',4],['B','D',2],['C','D',7],['C','E',8],['D','E',5],['D','F',9],['E','F',1],['E','G',10],['F','G',11]];
const KF='<p>Arêtes : A–B (6), A–C (3), B–C (4), B–D (2), C–D (7), C–E (8), D–E (5), D–F (9), E–F (1), E–G (10), F–G (11).</p>'+gfig(KP,KE,200);
EXAMS['ics-dijkstra']=[
 {n:'Fixer et relâcher', r:'L’idée de Dijkstra', qs:[
   {q:'Dans Dijkstra, on fixe <i>u</i> avec d(u) = 7. Son voisin <i>v</i>, non fixé, a d(v) = 13, et l’arête u–v pèse 4. Que devient d(v)&nbsp;?', lab:'d(v) =', ans:11,
    why:'Relâchement : d(v) ← min(d(v), d(u) + poids) = min(13, 7 + 4) = 11. On a trouvé un chemin plus court par u.'},
   {q:'On fixe <i>u</i> avec d(u) = 7. Son voisin <i>v</i>, non fixé, a d(v) = 9, et l’arête u–v pèse 4. Que devient d(v)&nbsp;?', lab:'d(v) =', ans:9,
    why:'min(9, 7 + 4) = min(9, 11) = 9 : passer par u est plus long, d(v) ne change pas.'},
   {q:'Les sommets non fixés ont pour distances provisoires d(B) = 6, d(C) = 4, d(D) = ∞ et d(E) = 9. Quel sommet Dijkstra fixe-t-il ensuite&nbsp;?', opts:['B','C','D','E'], ans:1,
    why:'On fixe toujours le sommet non fixé de plus petite distance provisoire : C, avec 4.'},
   {q:'Pourquoi, avec des poids positifs, une distance fixée ne change-t-elle plus&nbsp;?', opts:['Parce que le tas l’interdit','Parce que chaque sommet n’a qu’un seul voisin','Parce que tout autre chemin passe par un sommet non fixé, déjà au moins aussi loin, et les arêtes ne peuvent que l’allonger','Parce que les sommets sont fixés par ordre alphabétique'], ans:2,
    why:'Le sommet fixé a la plus petite distance provisoire. Un autre chemin doit sortir par un sommet non fixé, de distance au moins aussi grande, puis ajouter des poids ≥ 0.'},
   {q:'Que calcule l’algorithme de Dijkstra depuis une source <i>s</i>&nbsp;?', opts:['L’arbre de poids total minimal','Les distances de s à tous les sommets, pour des poids positifs','Le nombre de composantes connexes','L’ordre de visite d’un parcours en largeur'], ans:1,
    why:'Dijkstra renvoie d(v) pour tout sommet v : la longueur d’un plus court chemin de s à v. L’arbre couvrant minimal est le travail de Kruskal.'},
 ]},
 {n:'Dérouler Dijkstra', r:'Dérouler Dijkstra avec un tableau des distances', qs:[
   {q:'On applique Dijkstra depuis S. Quelle est la distance d(A)&nbsp;?'+HF, lab:'d(A) =', ans:3,
    why:'On fixe S : d(A) = 4, d(B) = 2. On fixe B (2) : d(A) = min(4, 2 + 1) = 3. Le détour S → B → A bat l’arête directe.'},
   {q:'Depuis S, quelle est la distance d(C)&nbsp;?'+HF, lab:'d(C) =', ans:8,
    why:'Après B (2), d(C) = 2 + 8 = 10. Puis on fixe A (3) : d(C) = min(10, 3 + 5) = 8.'},
   {q:'Depuis S, quelle est la distance d(D)&nbsp;?'+HF, lab:'d(D) =', ans:10,
    why:'Après B, d(D) = 2 + 10 = 12. Une fois C fixé (8), d(D) = min(12, 8 + 2) = 10.'},
   {q:'Depuis S, quelle est la distance d(T)&nbsp;?'+HF, lab:'d(T) =', ans:13,
    why:'Fixer C (8) donne d(T) = 8 + 6 = 14. Fixer D (10) donne d(T) = min(14, 10 + 3) = 13.'},
   {q:'Dans quel ordre Dijkstra fixe-t-il les sommets, depuis S&nbsp;?'+HF, opts:['S, A, B, C, D, T','S, B, A, D, C, T','S, B, A, C, D, T','S, B, C, A, D, T'], ans:2,
    why:'Les distances finales valent S 0, B 2, A 3, C 8, D 10, T 13, toutes différentes : les sommets sont fixés par distance croissante.'},
   {q:'Quel est le plus court chemin de S à T&nbsp;?'+HF, opts:['S → A → C → T','S → B → D → T','S → B → A → C → T','S → B → A → C → D → T'], ans:3,
    why:'On remonte les prédécesseurs : T ← D (10 + 3), D ← C (8 + 2), C ← A (3 + 5), A ← B (2 + 1), B ← S. Poids 2 + 1 + 5 + 2 + 3 = 13. S → B → A → C → T pèse 14.'},
   {q:'Depuis S, combien de fois la distance provisoire de D est-elle mise à jour (en comptant le passage de ∞ à une valeur finie)&nbsp;?'+HF, lab:'mises à jour =', ans:2,
    why:'Quand on fixe B : ∞ → 12. Quand on fixe C : 12 → 10. Quand on fixe ensuite D, sa distance ne bouge plus.'},
   {q:'Dans ce graphe, l’arête C–D passe de 2 à <b>6</b>. Quelle est alors la distance d(T) depuis S&nbsp;?'+HF, lab:'d(T) =', ans:14,
    why:'d(C) = 8 ne change pas. Maintenant d(D) = min(2 + 10, 8 + 6) = 12, et d(T) = min(8 + 6, 12 + 3) = 14, par S → B → A → C → T.'},
   {q:'On applique Dijkstra depuis A. Quelle est la distance d(E)&nbsp;?'+KF, lab:'d(E) =', ans:11,
    why:'d(C) = 3, d(B) = 6 et d(D) = 6 + 2 = 8. E peut venir de C (3 + 8 = 11) ou de D (8 + 5 = 13) : d(E) = 11.'},
 ]},
 {n:'Les limites de Dijkstra', r:'Pourquoi des poids positifs&nbsp;?', qs:[
   {q:'Quelle hypothèse sur les poids Dijkstra fait-il&nbsp;?', opts:['Tous les poids sont distincts','Tous les poids sont des entiers','Aucun poids n’est négatif','Tous les poids sont égaux'], ans:2,
    why:'Avec des poids ≥ 0, prolonger un chemin ne peut pas le raccourcir. C’est ce qui garantit qu’une distance fixée est définitive.'},
   {q:'Que risque-t-on si une arête a un poids négatif&nbsp;?', opts:['La boucle ne s’arrête plus','Un sommet déjà fixé pourrait être atteint plus court par un détour qui utilise l’arête négative, et sa distance serait fausse','Le tas ne peut plus stocker les distances','Dijkstra donne alors l’arbre couvrant minimal'], ans:1,
    why:'Dijkstra ne revient jamais sur un sommet fixé. Un détour par un sommet lointain peut alors raccourcir le chemin, sans que l’algorithme le voie.'},
   {q:'On multiplie tous les poids d’un graphe par 3. Que deviennent les plus courts chemins depuis A&nbsp;?', opts:['Ils changent tous','Ce sont les mêmes chemins, et les distances sont multipliées par 3','Ce sont les mêmes chemins, et les distances augmentent de 3','Dijkstra ne s’applique plus'], ans:1,
    why:'Le poids de chaque chemin est multiplié par 3, donc l’ordre entre les chemins ne change pas : le plus court reste le plus court, avec une longueur triplée.'},
 ]},
 {n:'Dérouler Kruskal', r:'Dérouler Kruskal en suivant les morceaux', qs:[
   {q:'Quel est le poids de l’arbre couvrant minimal donné par Kruskal&nbsp;?'+KF, lab:'poids =', ans:25,
    why:'Par poids croissant : E–F (1), B–D (2), A–C (3), B–C (4), D–E (5) sont gardées. A–B (6), C–D (7), C–E (8), D–F (9) ferment un cycle. E–G (10) est gardée : 6 arêtes. 1 + 2 + 3 + 4 + 5 + 10 = 25.'},
   {q:'Quelle est la première arête rejetée par Kruskal&nbsp;?'+KF, opts:['B–C (4)','A–B (6)','C–D (7)','E–G (10)'], ans:1,
    why:'Les cinq premières arêtes sont gardées. Quand arrive A–B, A–C et C–B relient déjà A et B : A–B fermerait le cycle A–B–C, elle est rejetée.'},
   {q:'Combien d’arêtes Kruskal garde-t-il pour ce graphe à 7 sommets&nbsp;?'+KF, lab:'arêtes =', ans:6,
    why:'Un arbre couvrant à n sommets a n − 1 arêtes : 7 − 1 = 6.'},
   {q:'Au moment où Kruskal examine C–E (8), combien de morceaux y a-t-il&nbsp;?'+KF, lab:'morceaux =', ans:2,
    why:'Les arêtes gardées E–F, B–D, A–C, B–C, D–E ont fusionné {A, B, C, D, E, F}. G est encore seul : 2 morceaux. C et E sont dans le même, donc C–E est rejetée.'},
   {q:'Pourquoi Kruskal rejette-t-il D–F (9)&nbsp;?'+KF, opts:['Son poids est trop grand','D a déjà trois voisins dans l’arbre','D et F sont déjà reliés, par D–E puis E–F : l’arête fermerait un cycle','F n’est relié à aucun autre sommet'], ans:2,
    why:'D–E (5) et E–F (1) sont gardées avant : D et F sont dans le même morceau. Ajouter D–F fermerait le cycle D–E–F.'},
   {q:'Combien d’arêtes Kruskal examine-t-il en tout avant d’avoir ses 6 arêtes, s’il s’arrête dès qu’il les a&nbsp;?'+KF, lab:'arêtes examinées =', ans:10,
    why:'Il examine, dans l’ordre des poids, les arêtes 1 à 10 : la 10e, E–G, est la 6e gardée. F–G (11) n’est jamais examinée.'},
   {q:'L’arête E–F passe de 1 à <b>12</b>. Quel est le poids du nouvel arbre couvrant minimal&nbsp;?'+KF, lab:'poids =', ans:33,
    why:'Ordre : B–D (2), A–C (3), B–C (4), D–E (5) gardées ; A–B, C–D, C–E rejetées ; D–F (9) gardée cette fois ; E–G (10) gardée. 2 + 3 + 4 + 5 + 9 + 10 = 33.'},
   {q:'Quel est le poids de l’arbre couvrant minimal de ce graphe&nbsp;?'+HF, lab:'poids =', ans:13,
    why:'A–B (1), S–B (2), C–D (2), D–T (3) gardées. S–A (4) ferme S–A–B : rejetée. A–C (5) relie {S, A, B} et {C, D, T} : gardée. 1 + 2 + 2 + 3 + 5 = 13.'},
   {q:'Dans le code de Kruskal, à quoi sert le test <code class="code">racine(u) != racine(v)</code>&nbsp;?', opts:['À trier les arêtes','À vérifier que u et v sont dans deux morceaux différents, donc que l’arête ne ferme pas de cycle','À calculer le poids total','À trouver le plus court chemin de u à v'], ans:1,
    why:'Deux sommets du même morceau ont la même racine. Si les racines diffèrent, l’arête relie deux morceaux : on la garde et on fusionne avec chef[ru] = rv.'},
 ]},
 {n:'Arbre couvrant minimal', r:'Arbre couvrant minimal', qs:[
   {q:'Un graphe connexe a 15 sommets et 40 arêtes. Combien d’arêtes contient un arbre couvrant minimal&nbsp;?', lab:'arêtes =', ans:14,
    why:'Un arbre à n sommets a toujours n − 1 arêtes, quel que soit le nombre d’arêtes du graphe : 15 − 1 = 14.'},
   {q:'Dans un graphe connexe à 8 sommets, toutes les arêtes pèsent 2. Quel est le poids d’un arbre couvrant minimal&nbsp;?', lab:'poids =', ans:14,
    why:'Tout arbre couvrant a 8 − 1 = 7 arêtes de poids 2 : 7 × 2 = 14.'},
   {q:'Prim et Kruskal, appliqués au même graphe connexe, donnent…', opts:['toujours exactement les mêmes arêtes','des arbres de même poids total minimal','des poids différents en général','des chemins les plus courts depuis le départ'], ans:1,
    why:'Les deux construisent un arbre couvrant minimal. Avec des poids égaux, les arêtes choisies peuvent différer, mais le poids total est le même.'},
   {q:'L’arbre des plus courts chemins de Dijkstra et l’arbre couvrant minimal de Kruskal sont-ils toujours le même&nbsp;?', opts:['Oui, car tous les deux minimisent un poids','Oui, si les poids sont positifs','Non : Dijkstra minimise chaque distance depuis la source, Kruskal la somme des poids de l’arbre','Non : Kruskal ne relie pas tous les sommets'], ans:2,
    why:'Ce sont deux objectifs différents. Par exemple, avec A–B (4), A–C (3) et B–C (2), Dijkstra depuis A garde A–B et A–C (poids 7), Kruskal garde B–C et A–C (poids 5).'},
 ]},
];
})();
