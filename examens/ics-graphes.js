/* Déclic — examen de compétence : Graphes et parcours */
(()=>{
// le graphe en grille utilisé par plusieurs questions
const POS={A:[40,35],B:[160,35],C:[280,35],D:[40,135],E:[160,135],F:[280,135]};
const AR=[['A','B'],['A','D'],['B','C'],['B','E'],['C','F'],['D','E'],['E','F']];
const FIG=(()=>{ let s='';
  AR.forEach(([u,v])=>{ const [x1,y1]=POS[u],[x2,y2]=POS[v]; s+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--muted)" stroke-width="2"/>`; });
  Object.entries(POS).forEach(([k,[x,y]])=>{ s+=`<circle cx="${x}" cy="${y}" r="15" fill="var(--surface)" stroke="var(--ink)" stroke-width="2.5"/><text x="${x}" y="${y+5}" font-size="14" font-weight="700" text-anchor="middle" fill="var(--ink)">${k}</text>`; });
  return `<svg viewBox="0 0 320 170" width="320" role="img">${s}</svg>`; })();
const GD=FIG+py(`
G = {'A': ['B', 'D'], 'B': ['A', 'C', 'E'],
     'C': ['B', 'F'], 'D': ['A', 'E'],
     'E': ['B', 'D', 'F'], 'F': ['C', 'E']}`);
EXAMS['ics-graphes']=[
 {n:'Vocabulaire et représentations', r:'Deux représentations', qs:[
   {q:'Un graphe non orienté a 9 arêtes. Que vaut la somme des degrés de ses sommets&nbsp;?', lab:'somme =', ans:18,
    why:'Chaque arête {u, v} compte une fois dans le degré de u et une fois dans celui de v : la somme des degrés vaut 2 × 9 = 18.'},
   {q:'Un graphe a 5 sommets, de degrés 3, 3, 2, 2 et 2. Combien a-t-il d’arêtes&nbsp;?', lab:'arêtes =', ans:6,
    why:'La somme des degrés vaut 3 + 3 + 2 + 2 + 2 = 12 = 2m, donc m = 6.'},
   {q:'Un graphe a 50 sommets et 120 arêtes. Combien de <b>0</b> contient sa matrice d’adjacence&nbsp;?', lab:'nombre de 0 =', ans:2260,
    why:'La matrice a 50 × 50 = 2500 cases. Chaque arête donne deux 1, soit 240. Il reste 2500 − 240 = 2260 zéros.'},
   {q:'Un graphe peut-il avoir 5 sommets de degrés 3, 2, 2, 1 et 1&nbsp;?', opts:['Oui, par exemple une chaîne','Oui, si le graphe n’est pas connexe','Non, car la somme des degrés, 9, est impaire','Non, car un sommet ne peut pas avoir 3 voisins'], ans:2,
    why:'La somme des degrés vaut toujours 2m, un nombre pair. Ici 3 + 2 + 2 + 1 + 1 = 9 est impair : un tel graphe n’existe pas.'},
   {q:'Un réseau a un million de sommets, et chacun n’a que quelques voisins. Tu dois parcourir tous les voisins de chaque sommet. Quelle représentation choisir&nbsp;?', opts:['La matrice d’adjacence','Les listes d’adjacence','Les deux se valent','Une liste de tous les couples de sommets'], ans:1,
    why:'La matrice occuperait 10¹² cases, presque toutes à 0. Les listes n’occupent que O(n + m) et donnent directement les voisins de chaque sommet.'},
 ]},
 {n:'Construire une liste d’adjacence', r:'Construire une liste d’adjacence', qs:[
   {q:'On construit G avec le code de la méthode (chaque arête ajoutée dans les deux sens) à partir de ces arêtes. Que vaut <code class="code">G[\'R\']</code>&nbsp;?'+py(`
aretes = [('P', 'Q'), ('Q', 'R'), ('P', 'R'), ('R', 'S'), ('S', 'T')]`),
    opts:['[\'Q\', \'P\', \'S\']','[\'P\', \'Q\', \'S\']','[\'S\']','[\'Q\', \'S\']'], ans:0,
    why:'R apparaît dans Q–R, P–R et R–S, dans cet ordre. Les voisins s’ajoutent dans l’ordre des arêtes : [\'Q\', \'P\', \'S\'].'},
   {q:'On construit G à partir de ces arêtes, dans les deux sens. Que vaut la somme des longueurs des listes de G&nbsp;?'+py(`
aretes = [('P', 'Q'), ('Q', 'R'), ('P', 'R'), ('R', 'S'), ('S', 'T')]
# G construit avec G[u].append(v) et G[v].append(u)`),
    lab:'somme =', ans:10,
    why:'Chaque arête est écrite deux fois, une dans chaque liste : 2 × 5 = 10. C’est aussi la somme des degrés 2 + 2 + 3 + 2 + 1.'},
   {q:'Combien de clés contient le dictionnaire G construit à partir de ces arêtes&nbsp;?'+py(`
aretes = [(1, 4), (4, 7), (7, 1), (2, 9)]`),
    lab:'clés =', ans:5,
    why:'Une clé est créée pour chaque sommet la première fois qu’il apparaît : 1, 4, 7, 2, 9. Cinq clés.'},
   {q:'Un élève oublie la ligne <code class="code">G[v].append(u)</code>. Avec les arêtes ci-dessous, que vaut alors <code class="code">len(G[\'S\'])</code>&nbsp;?'+py(`
aretes = [('P', 'Q'), ('Q', 'R'), ('P', 'R'), ('R', 'S'), ('S', 'T')]`),
    lab:'len =', ans:1,
    why:'Seul le premier sommet de chaque arête reçoit un voisin. S est le second dans R–S (rien n’est ajouté à G[\'S\']) et le premier dans S–T : G[\'S\'] = [\'T\']. Le vrai degré de S est 2.'},
 ]},
 {n:'Parcours en largeur', r:'Dérouler un BFS avec la file', qs:[
   {q:'Dans quel ordre <code class="code">bfs(G, \'A\')</code> visite-t-il les sommets&nbsp;?'+GD, opts:['A, B, C, F, E, D','A, B, D, C, E, F','A, B, D, E, C, F','A, D, B, E, C, F'], ans:1,
    why:'On défile A : on enfile B, D. On défile B : on enfile C, E. On défile D : E est déjà vu. On défile C : on enfile F. Ordre : A, B, D, C, E, F.'},
   {q:'Que contient la file juste après le traitement de B, dans <code class="code">bfs(G, \'A\')</code>&nbsp;?'+GD, opts:['[D, C, E]','[C, E]','[D, E]','[C, E, D]'], ans:0,
    why:'Après A, la file vaut [B, D]. On défile B et on enfile ses voisins non vus C et E, à droite : [D, C, E].'},
   {q:'Combien d’arêtes compte un plus court chemin de A à F&nbsp;?'+GD, lab:'arêtes =', ans:3,
    why:'BFS : d(A) = 0, d(B) = d(D) = 1, d(C) = d(E) = 2, et F est enfilé par C : d(F) = 3, par exemple A – B – C – F.'},
   {q:'Combien de sommets sont à distance exactement 2 de A&nbsp;?'+GD, lab:'sommets =', ans:2,
    why:'Couche 1 : B et D. Couche 2 : C (par B) et E (par B). F est en couche 3. Il y en a 2.'},
   {q:'Dans quel ordre <code class="code">bfs(G, \'E\')</code> visite-t-il les sommets&nbsp;?'+GD, opts:['E, B, A, C, D, F','E, B, D, F, C, A','E, B, D, F, A, C','E, F, D, B, A, C'], ans:2,
    why:'E enfile B, D, F. B enfile A et C. D et F n’apportent rien de nouveau. Ordre : E, B, D, F, A, C.'},
   {q:'On lance <code class="code">bfs</code> sur un graphe <b>connexe</b> de 20 sommets. Combien de fois la ligne <code class="code">file.append(v)</code> est-elle exécutée&nbsp;?', lab:'fois =', ans:19,
    why:'Chaque sommet entre une seule fois dans la file, car il est marqué dès qu’il y entre. Le départ y est mis à la création de la file, les 19 autres par file.append.'},
 ]},
 {n:'Parcours en profondeur récursif', r:'Dérouler un DFS avec la pile d’appels', qs:[
   {q:'Dans quel ordre <code class="code">dfs(G, \'A\', [])</code> visite-t-il les sommets&nbsp;?'+GD, opts:['A, B, D, C, E, F','A, B, C, F, E, D','A, D, E, B, C, F','A, B, E, D, F, C'], ans:1,
    why:'A → B (premier voisin) → C (A est vu) → F → E (C est vu) → D (B est vu). Ordre : A, B, C, F, E, D.'},
   {q:'Pendant <code class="code">dfs(G, \'A\', [])</code>, combien d’appels sont sur la pile au moment où D est visité, celui de D compris&nbsp;?'+GD, lab:'appels =', ans:6,
    why:'Aucun appel ne s’est terminé avant : la pile est A → B → C → F → E → D, soit 6 appels.'},
   {q:'Dans quel ordre <code class="code">dfs(G, \'F\', [])</code> visite-t-il les sommets&nbsp;?'+GD, opts:['F, C, E, B, D, A','F, E, D, A, B, C','F, C, B, A, D, E','F, C, B, E, D, A'], ans:2,
    why:'F → C → B (F est vu) → A → D → E. Ordre : F, C, B, A, D, E.'},
   {q:'On garde ce graphe mais on range autrement les voisins de A : <code class="code">G[\'A\'] = [\'D\', \'B\']</code>. Quel est le 2e sommet visité par <code class="code">dfs(G, \'A\', [])</code>&nbsp;?'+GD, opts:['B','E','C','D'], ans:3,
    why:'Le DFS suit le premier voisin non vu de la liste : maintenant D. L’ordre complet devient A, D, E, B, C, F.'},
   {q:'Quelle structure le DFS récursif utilise-t-il, sans qu’on l’écrive, pour revenir en arrière dans une impasse&nbsp;?', opts:['Une file','La pile d’appels','Un tas','La matrice d’adjacence'], ans:1,
    why:'Chaque appel dfs attend que ses appels intérieurs se terminent. Quand un sommet n’a plus de voisin non vu, son appel se termine et on reprend l’appel du dessous.'},
 ]},
 {n:'Parcours avec une pile explicite', r:'Un DFS avec une pile explicite', qs:[
   {q:'Dans quel ordre <code class="code">dfs_pile(G, \'A\')</code> visite-t-il les sommets&nbsp;?'+GD, opts:['A, B, C, F, E, D','A, D, E, B, C, F','A, D, E, F, C, B','A, B, D, C, E, F'], ans:2,
    why:'Pile [B, D] : on dépile D, on empile A, E. On dépile E, on empile B, D, F. On dépile F, on empile C, E. E est vu, on dépile C. Puis F est vu, on dépile B. Ordre : A, D, E, F, C, B.'},
   {q:'Dans <code class="code">dfs_pile(G, \'A\')</code>, que contient la pile juste après le traitement de D&nbsp;?'+GD, opts:['[B, A, E]','[A, E]','[B, E]','[E, A, B]'], ans:0,
    why:'Après A, la pile vaut [B, D]. pop() retire D, le dernier, puis on empile ses voisins A et E : [B, A, E].'},
   {q:'Combien de fois <code class="code">pile.append(v)</code> est-il exécuté pendant <code class="code">dfs_pile(G, \'A\')</code>&nbsp;?'+GD, lab:'empilements =', ans:14,
    why:'Chaque sommet est traité une fois, et on empile alors tous ses voisins : la somme des degrés, 2 + 3 + 2 + 2 + 3 + 2 = 14 = 2 × 7 arêtes.'},
   {q:'Avec <code class="code">dfs_pile</code>, lequel des voisins du départ est exploré en premier&nbsp;?', opts:['Le premier de sa liste','Le dernier de sa liste','Le plus proche','Le plus petit'], ans:1,
    why:'On empile les voisins dans l’ordre de la liste, et pop() retire le dernier élément ajouté : le dernier voisin de la liste passe en premier.'},
 ]},
 {n:'Composantes connexes et nombre d’arêtes', r:'Composantes connexes et nombre d’arêtes', qs:[
   {q:'Un graphe a les sommets 1 à 10 et les arêtes 1–2, 2–3, 4–5, 6–7, 7–8, 8–6, 9–10. Combien a-t-il de composantes connexes&nbsp;?', lab:'composantes =', ans:4,
    why:'Les composantes sont {1, 2, 3}, {4, 5}, {6, 7, 8} et {9, 10}. Un parcours lancé depuis 1, puis 4, puis 6, puis 9 : 4 parcours.'},
   {q:'Un graphe <b>sans cycle</b> a 15 sommets et 4 composantes connexes. Combien a-t-il d’arêtes&nbsp;?', lab:'arêtes =', ans:11,
    why:'Chaque composante est un arbre à kᵢ sommets et kᵢ − 1 arêtes. Au total, 15 − 4 = 11 arêtes.'},
   {q:'Combien d’arêtes a un arbre à 25 sommets&nbsp;?', lab:'arêtes =', ans:24,
    why:'Un arbre est connexe et sans cycle : n − 1 = 24 arêtes.'},
   {q:'Un graphe a 8 sommets, 3 composantes connexes et 7 arêtes. Que peut-on en conclure&nbsp;?', opts:['Il n’a aucun cycle','Il est connexe','Il contient au moins un cycle','On ne peut rien dire sans le dessin'], ans:2,
    why:'Sans cycle, il aurait exactement 8 − 3 = 5 arêtes. Il en a 7, donc au moins une arête relie deux sommets déjà dans la même composante : elle ferme un cycle.'},
   {q:'Un graphe a 6 composantes connexes. Combien d’arêtes faut-il ajouter, au minimum, pour le rendre connexe&nbsp;?', lab:'arêtes =', ans:5,
    why:'Une arête ajoutée fait baisser le nombre de composantes d’au plus 1. Pour passer de 6 à 1, il en faut au moins 5.'},
   {q:'Un graphe a 12 sommets et 11 arêtes. Est-ce forcément un arbre&nbsp;?', opts:['Oui, car un arbre à 12 sommets a 11 arêtes','Oui, s’il n’a pas de sommet isolé','Non : il peut avoir un cycle et deux composantes','Non : un arbre à 12 sommets a 12 arêtes'], ans:2,
    why:'n − 1 arêtes ne suffit pas. Par exemple, un cycle de 3 sommets plus un arbre de 9 sommets donne 3 + 8 = 11 arêtes, 2 composantes et un cycle.'},
 ]},
];
})();
