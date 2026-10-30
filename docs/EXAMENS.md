# Écrire un examen de compétence

Chaque chapitre (et chaque cours de maths par niveau qui a ses propres étapes) se termine par un **examen de compétence** : une trentaine d’exercices techniques qui vérifient que toutes les notions du chapitre sont retenues. L’élève répond une seule fois à chaque question, sans indice. La correction s’affiche juste après. À la fin, il voit son score et un bilan par notion : ce qui est bien compris, ce qui mérite encore de l’entraînement, avec un lien vers l’étape du cours à revoir.

Lis aussi `docs/BRIEF.md` (ton, notation, exactitude) : les mêmes règles s’appliquent.

## Fichier
Un fichier par chapitre : `examens/<id du chapitre>.js` (exemple : `examens/an1-suites.js`). Il est chargé à la demande, seulement quand l’élève lance l’examen.

```js
/* Déclic — examen de compétence : Suites et limites */
(()=>{
// helpers locaux éventuels : tout reste dans cette IIFE. F, mat, py, fmt, plane… de lib.js sont disponibles.
EXAMS['an1-suites']=[
 {n:'Limites de suites de référence', r:'Les limites à connaître', qs:[
   {q:'Calcule la limite de <i>u</i><sub><i>n</i></sub> = (3<i>n</i> + 1)/(<i>n</i> − 2).', lab:'limite =', ans:3, why:'On divise par <i>n</i> en haut et en bas : (3 + 1/<i>n</i>)/(1 − 2/<i>n</i>) → 3/1 = 3.'},
   {q:'La suite (−1)<sup><i>n</i></sup>/<i>n</i> …', opts:['diverge','tend vers 0','tend vers −1','n’a pas de limite car elle change de signe'], ans:1, why:'|(−1)<sup><i>n</i></sup>/<i>n</i>| = 1/<i>n</i> → 0, donc la suite tend vers 0 (gendarmes).'},
   …
 ]},
 {n:'…', r:'…', qs:[…]},
];
})();
```

- `n` : le nom de la notion, court et parlant (« Factoriser par le terme dominant »). Il apparaît dans le bilan : « Tu as bien compris … Entraîne-toi encore sur … ».
- `r` : le titre `h` **exact** (copié tel quel, balises comprises) de l’étape du chapitre qui enseigne la notion, en général l’étape Méthode ou Théorie correspondante. Pas un problème. Le bilan propose « Revoir » vers cette étape.
- `qs` : les questions de la notion, au moins 3.
  - Réponse numérique : `{q, lab?, unit?, ans, tol?, show?, why}`. L’élève peut taper une virgule, un point ou une fraction `1/3`. S’il faut arrondir, l’énoncé le dit (« arrondi au centième ») et `tol` l’accepte. `show` (facultatif) est le texte de la bonne réponse affiché après une erreur quand le nombre décimal serait laid (`show:'1/3'`, `show:'6,02·10²³'`).
  - QCM : `{q, opts:[…], ans:indice, why}`. 3 ou 4 options, des pièges plausibles tirés des erreurs classiques, la bonne réponse à des positions variées.
  - `fig` (facultatif) : une figure, en chaîne (IIFE comme dans les cours).
  - Jamais d’indice (`hint`), de curseurs ni de questions en plusieurs parties.

## Contenu
- **28 à 32 questions** au total, réparties en **4 à 8 notions** qui couvrent tout le chapitre : chaque technique enseignée (chaque étape Méthode) est testée au moins une fois, les définitions et propriétés clés aussi.
- Des exercices **techniques** : appliquer une méthode, calculer, reconnaître la bonne forme, détecter l’erreur dans un raisonnement. Pas de longs problèmes : chaque question se fait en 30 secondes à 3 minutes, avec l’ardoise.
- **Nouveaux** : d’autres nombres et d’autres situations que les exercices du chapitre. Ne recopie pas une question du cours.
- Dans chaque notion, du plus simple au plus exigeant : une application directe, puis une variante, puis un piège ou un cas qui demande de réfléchir.
- **Seulement ce qui a été enseigné** dans ce chapitre et les précédents de la même matière. Aucune technique nouvelle.
- Plutôt des réponses numériques quand la matière s’y prête (la moitié au moins en analyse, algèbre, physique, chimie). En logique, structures, code, plus de QCM : « Que vaut… », « Laquelle de ces affirmations est vraie », « Que affiche ce programme ».
- Les questions se mélangent pendant l’examen : chaque énoncé doit se suffire à lui-même (pas de « avec la même fonction qu’avant »).
- `why` : la correction rédigée, 1 à 3 phrases avec le calcul. Elle s’affiche que l’élève ait juste ou faux, donc elle explique comment on trouve, pas seulement le résultat.
- **Exactitude** : recalcule chaque réponse avec `node -e` ou `python3 -c` avant de l’écrire.

## Vérification
`node tools/harness.js cours/<fichier du chapitre>.js` vérifie les chapitres de ce fichier et leurs examens (nombre de questions et de notions, `r` qui renvoie à une vraie étape, réponses bien formées, HTML). Il ne vérifie pas les maths : ça, c’est ton travail.
