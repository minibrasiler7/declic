# Brief rédaction — Déclic, programme de l'année préparatoire (CMS)

Déclic est un site d'apprentissage interactif en français, inspiré de Brilliant : chaque chapitre est une leçon courte qui alterne de petits morceaux de théorie, des figures qu'on manipule avec des curseurs, et des exercices corrigés immédiatement avec une explication.

Tu écris **un seul fichier** de contenu (indiqué dans ta mission), à la racine du dépôt. Ne modifie aucun autre fichier.

## À lire avant d'écrire
- `lib.js` (racine du dépôt) : l'API de dessin (`plane`, `space` pour la 3D, `py` pour le code Python, `F`, `mat`, `fmt`, `rad`) et `CMS_SUBJECTS` (identifiants de matière et de semestre).
- `maths.js` : 26 leçons existantes écrites dans le même format. Prends-les comme modèle de ton, de longueur et d'usage des figures.

## Format du fichier
```js
/* Déclic — <matière> (<codes>) */
(()=>{
// helpers locaux éventuels ici (const/fonction) : TOUT doit rester dans cette IIFE
CMS.push(
{subj:'an1', sem:'aut', id:'cms-an1-suites', h:'Suites et limites', p:'Une phrase qui dit ce qu’on apprend.', steps:[ … ]},
{ … chapitre suivant … },
);
})();
```
- `id` : `cms-<matière>-<mot>`, minuscules, unique.
- Ordre des `push` = ordre d'affichage.
- Ne redéclare jamais au niveau global `F`, `mat`, `rad`, `fmt`, `plane`, `space`, `py`, `esc` ni rien d'autre : tout reste dans l'IIFE.

## Types d'étapes (déduits des champs, pas de `render`)
- **Théorie / exploration** : `{h, p, params:[{id,l,min,max,step,v,u}], draw:v=>svgString, info:v=>html, note}`. `v` est l'objet des valeurs des curseurs (`v.a` …). `u` est l'unité affichée (ex. `'°'`).
- **Théorie sans curseur** : `{h, p, fig:'<svg…>' ou html, note}`. `fig` doit être une **chaîne** (utilise une IIFE `(()=>{ const P=plane(…); …; return P.svg(); })()` pour la calculer).
- **Pratique à curseurs** : comme l'exploration, plus `ok:v=>booléen` et `why`. La position initiale ne doit PAS être la solution. Compare des valeurs exactes de la grille (`v.x===2`) ou avec tolérance.
- **QCM** : `{h, p, fig?, opts:['…','…'], ans:indiceDeLaBonne, why}`. Varie la position de la bonne réponse.
- **Réponse numérique** : `{h, p, fig?, lab:'x =', unit:'m', ans:nombre, tol:0.01, why}`. L'élève peut taper virgule, point ou fraction `1/3`. Mets une tolérance si un arrondi est demandé, et dis dans l'énoncé à quelle précision arrondir.
- Champ optionnel `kind` pour le petit sur-titre (`'Théorie'`, `'Question'`, `'Pratique'`, `'Défi'`, `'Méthode'`…). Sinon il est déduit. Mets `kind:'Défi'` sur la dernière étape.
- `why` s'affiche après une bonne réponse, ou après le 2e essai raté : c'est la correction rédigée. Montre le calcul, en une ou deux phrases.

## Exigences de contenu
- **Exactitude avant tout.** Vérifie chaque calcul et chaque réponse (fais le calcul dans `node -e` si besoin). Une erreur dans une correction ruine la confiance.
- Niveau : année préparatoire (CMS) aux études d'ingénieur·e. C'est rigoureux mais on reste pédagogique. Définitions précises, notations standard francophones (ℝ, ℕ, ]a ; b[, ln, arctan…).
- Chaque chapitre : **6 à 9 étapes**, au moins **3 exercices** et au moins **1 figure à curseurs** qui montre vraiment le concept (pas un décor). Alterne théorie → exercice → théorie → exercice, puis un défi final. Couvre tous les sous-points listés dans ta mission.
- Théorie en petits morceaux : 2 à 4 phrases par étape, avec la formule clé en évidence. Utilise `note` pour les pièges classiques et les astuces.
- Ton : tutoiement, phrases courtes et directes, voix active. Pas d'emoji. Évite les tirets cadratins en incise.
- Notation HTML : `<i>` pour les variables, `<b>` pour les mots-clés, `<sup>`/`<sub>` ou les caractères Unicode (x², xₙ), `F(a,b)` pour les fractions, `mat([[…]])` pour les matrices, `py(\`…\`)` pour le code Python. Les apostrophes typographiques ’ évitent de casser les chaînes JS entre ''.
- Figures : `plane()` pour la 2D, `space()` pour la 3D (voir les commentaires de `lib.js` (racine du dépôt)). Utilise les couleurs `var(--…)` listées dans `lib.js`, jamais de couleur en dur. Garde les figures lisibles (320 px de large) et étiquette ce qui compte avec `dot(…,{l:'A'})` ou `text`.
- Les curseurs doivent avoir peu de positions (moins de ~60 par curseur), et `v` doit tomber sur la grille `min + k·step`.

## Vérification (obligatoire)
Lance `node tools/harness.js <ton-fichier>` depuis ce dossier et corrige jusqu'à `OK` (0 erreur, idéalement 0 avertissement). Le vérificateur teste toutes les positions des curseurs, contrôle que chaque exercice a une solution atteignable et que les balises HTML sont bien fermées. Il ne vérifie pas les maths : c'est ton travail.

## Rendu final
Réponds en une dizaine de lignes : nombre de chapitres et d'étapes, la sortie finale du vérificateur, et tout point de contenu dont tu n'es pas sûr·e.
