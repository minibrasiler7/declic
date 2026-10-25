# Rédiger pour Déclic

Déclic est un site d'apprentissage interactif en français, ouvert à tous. Un chapitre est une leçon courte qui alterne petits morceaux de théorie, figures qu'on manipule avec des curseurs et exercices corrigés tout de suite. Il se termine par des **problèmes** plus élaborés.

Le site n'est rattaché à aucune école ni aucun programme officiel. N'écris jamais le nom d'une école, d'un cours ou d'un code de cours.

## À lire avant d'écrire
- `lib.js` (racine du dépôt) : l'API de dessin (`plane`, `space` pour la 3D, `py` pour le code Python, `F`, `mat`, `fmt`, `rad`) et `MATIERES` (matières et parties de cours).
- Un fichier de `cours/` de la même matière, pour le ton, la longueur et l'usage des figures.

## Format d'un fichier de cours
```js
/* Déclic — <matière> */
(()=>{
// helpers locaux éventuels ici : TOUT reste dans cette IIFE
COURS.push(
{subj:'an1', sem:'aut', id:'an1-suites', h:'Suites et limites', p:'Une phrase qui dit ce qu’on apprend.', steps:[ … ]},
);
})();
```
- `id` : `<matière>-<mot>`, minuscules, unique sur tout le site.
- L'ordre des `push` est l'ordre d'affichage. Les fichiers sont chargés dans l'ordre des `<script>` de `index.html`.
- Ne redéclare jamais au niveau global `F`, `mat`, `rad`, `fmt`, `plane`, `space`, `py`, `esc`, ni aucun autre nom.

## Types d'étapes (déduits des champs, pas de `render`)
- **Théorie / exploration** : `{h, p, params:[{id,l,min,max,step,v,u}], draw:v=>svgString, info:v=>html, note}`. `v` contient les valeurs des curseurs (`v.a` …).
- **Théorie sans curseur** : `{h, p, fig, note}`. `fig` est une **chaîne** (calculée par une IIFE `(()=>{ const P=plane(…); …; return P.svg(); })()`).
- **Pratique à curseurs** : comme l'exploration, plus `ok:v=>booléen` et `why`. La position initiale ne doit PAS être la solution.
- **QCM** : `{h, p, fig?, opts:['…','…'], ans:indiceDeLaBonne, why}`. Varie la position de la bonne réponse.
- **Réponse numérique** : `{h, p, fig?, lab:'x =', unit:'m', ans:nombre, tol:0.01, why}`. L'élève peut taper une virgule, un point ou une fraction `1/3`. S'il faut arrondir, l'énoncé le dit et `tol` l'accepte.
- **Méthode** : `{kind:'Méthode', h, p, demo:{enonce, etapes:[…], conclusion}, note?}`. Elle enseigne une technique : quand la reconnaître, pourquoi elle marche, comment l'appliquer, puis un **exemple résolu** que l'élève dévoile étape par étape. Chaque étape est une chaîne HTML, ou `{f:'le calcul', w:'pourquoi on fait ça'}`. Pas de question dans une étape Méthode : l'exercice d'application vient juste après.
- **Problème** (voir plus bas) : `{kind:'Problème', h, p, fig?, params?/draw?, parts:[…], sol}`.
- `kind` règle le petit sur-titre (`'Théorie'`, `'Question'`, `'Pratique'`, `'Défi'`, `'Méthode'`, `'Problème'`…).
- `why` s'affiche après une bonne réponse, ou après le 2e essai raté. C'est la correction rédigée, en une ou deux phrases avec le calcul.
- `p` peut contenir des paragraphes `<p>`, des listes et des blocs `py(...)`.

## Les problèmes de fin de chapitre
Chaque chapitre se termine par **2 problèmes** (parfois 3), placés après toutes les autres étapes. Un problème vérifie qu'on sait **utiliser** la théorie, pas seulement la réciter.
- Il combine plusieurs notions du chapitre (et des précédents si utile), dans une situation concrète ou un vrai raisonnement mathématique : modélisation, preuve guidée, étude complète, optimisation, cas limite.
- **Énoncé `p`** : 3 à 6 phrases qui posent la situation et les données. Une figure (`fig` ou curseurs sans `ok`) aide souvent.
- **`parts`** : 2 à 5 questions qui avancent pas à pas vers le résultat. Chaque question : `{q:'a) …', ans | opts+ans, tol?, unit?, lab?, hint:'indice qui débloque sans donner la réponse', why:'correction de cette question'}`. Chaque question se vérifie (nombre ou QCM). Une question de raisonnement passe par un QCM qui oppose le bon argument à des erreurs plausibles.
- **`sol`** : la solution complète rédigée, comme dans un corrigé (HTML, 4 à 10 lignes). Elle s'affiche à la fin.
- Le 2e problème est plus difficile que le 1er.
- Le niveau monte : un élève qui a suivi le chapitre doit pouvoir réussir, mais en réfléchissant plusieurs minutes.

Exemple :
```js
{kind:'Problème', h:'La boîte de volume maximal',
 p:'Dans une feuille carrée de 30 cm de côté, on découpe un carré de côté <i>x</i> à chaque coin, puis on replie les bords pour former une boîte sans couvercle. On cherche <i>x</i> qui rend le volume maximal.',
 parts:[
  {q:'a) Quel est le volume V(x) pour x = 5 cm ?', unit:'cm³', ans:2000, hint:'La base est un carré de côté 30 − 2x, la hauteur vaut x.', why:'V(5) = (30 − 10)² · 5 = 2000 cm³.'},
  {q:'b) Pour quelle valeur de x la dérivée V′(x) s’annule-t-elle dans ]0 ; 15[ ?', lab:'x =', unit:'cm', ans:5, hint:'V(x) = x(30 − 2x)². Dérive puis factorise.', why:'V′(x) = (30 − 2x)(30 − 6x) = 0 donne x = 5 (x = 15 annule la boîte).'},
  {q:'c) Quel est le volume maximal ?', unit:'cm³', ans:2000, hint:'Vérifie le signe de V′ autour de 5.', why:'V′ > 0 avant 5 et V′ < 0 après : V(5) = 2000 cm³ est le maximum.'},
 ],
 sol:'On pose V(x) = x(30 − 2x)² sur ]0 ; 15[. …'}
```

## Toutes les techniques, enseignées avant d'être demandées
L'élève ne connaît que ce qu'il a vu dans les étapes précédentes (et dans les chapitres précédents de la même matière). Règle absolue : **aucun exercice, indice, correction ou problème ne demande une technique qui n'a pas été enseignée avant**, avec une explication et un exemple résolu. Par exemple, avant un exercice où il faut multiplier par la quantité conjuguée, il faut une étape Méthode qui montre dans quelle situation on le fait (forme ∞ − ∞ ou 0/0 avec une racine), pourquoi ça marche ((a − b)(a + b) = a² − b² fait disparaître la racine) et un exemple calculé de bout en bout.

Chaque chapitre doit aussi donner **la boîte à outils complète du thème** : toutes les techniques classiques dont on a besoin pour réussir une grande variété d'exercices sur ce sujet, pas seulement celles des exercices déjà présents. Chaque technique a son étape Méthode, puis au moins un exercice qui la fait pratiquer. Une fiche « Méthodes » rassemble automatiquement les étapes Méthode du chapitre.

## Exigences de contenu
- **Exactitude avant tout.** Recalcule chaque réponse avec `node -e` ou `python3 -c`. Une erreur dans une correction ruine la confiance.
- Chapitre : 6 à 10 étapes de cours, au moins **3 exercices** et au moins **1 figure à curseurs** utile, puis les **2 problèmes**.
- Théorie en petits morceaux de 2 à 4 phrases, formule clé en évidence. `note` pour les pièges et astuces.
- Ton : tutoiement, phrases courtes, voix active. Pas d'emoji. Évite les tirets cadratins en incise.
- Notation : `<i>` pour les variables, `<b>` pour les mots-clés, Unicode (x², xₙ, ℝ, ∈, ≤) ou `<sup>`/`<sub>`, `F(a,b)` pour les fractions, `mat([[…]])` pour les matrices, `py(\`…\`)` pour le code. Utilise l'apostrophe typographique ’ dans les textes.
- Figures : `plane()` en 2D, `space()` en 3D, couleurs `var(--…)` uniquement, 320 px de large, étiquettes avec `dot(…,{l:'A'})` ou `text`. Moins de ~60 positions par curseur, et chaque `v` doit tomber sur la grille `min + k·step`.

## Vérification (obligatoire)
Lance `node tools/harness.js cours/<ton-fichier>.js` depuis la racine du dépôt et corrige jusqu'à `OK`. Le vérificateur exige les 2 problèmes en fin de chapitre (avec énoncé, questions, indices, corrections et `sol`), teste toutes les positions des curseurs et contrôle le HTML. Il ne vérifie pas les maths : ça, c'est ton travail.
