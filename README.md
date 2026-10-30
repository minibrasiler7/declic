# Déclic

Apprendre les maths, les sciences et le code en français, à la manière de Brilliant : un peu de théorie, une figure qu'on manipule, un exercice corrigé tout de suite, puis de vrais problèmes.

Site : https://minibrasiler7.github.io/declic/

## Contenu

- **Cours complets** (`cours/*.js`) : Analyse I et II, algèbre linéaire (plan et dimension 3), géométrie analytique (avec les coniques), informatique (Python et algorithmique), physique, chimie. Chaque chapitre se termine par deux problèmes en plusieurs questions, avec indices et solution rédigée.
- **Notions fondamentales** (`cours/gred-*.js`) : 25 chapitres de mathématique « structurelle » sur le plan du tome 1 de *Notions fondamentales de la mathématique élémentaire* (Louis Gred) : logique, ensembles, relations, applications, groupes, anneaux et corps.
- **Mathématiques par niveau** (`cours/maths.js`) : 26 cours, de l'école obligatoire à l'université.
- **Découvertes** : leçons courtes de code et de musique (dans `app.js`).
- **Examens de compétence** (`examens/<id>.js`) : à la fin de chaque chapitre, une trentaine d’exercices techniques, une seule tentative par question, puis un score et un bilan par notion (bien compris, à entraîner, avec un lien vers l’étape à revoir). Format : `docs/EXAMENS.md`.

Dans une leçon, on revient sur une étape déjà vue en touchant la barre de progression ou le bouton ‹ en bas. La leçon reprend ensuite là où on s’était arrêté le plus loin.

## L'ardoise

Un brouillon de calcul pour travailler sans papier ni crayon (`ardoise.js`). Chaque ligne peut être :
- un calcul, avec son résultat et la fraction exacte ;
- une valeur à retenir (`a = 7`) ;
- une équation, avec les boutons « Résoudre » et « Des deux côtés… » ;
- une fonction, avec les boutons « Dériver » et « Tracer » ;
- une phrase de raisonnement ;
- un tableau de données (bouton « ⊞ Tableau » ou `tableau`) : coller depuis un tableur, colonnes calculées (`z = x*y`), somme et moyenne, graphique, droite ajustée. Chaque colonne se réutilise ensuite comme une liste : `mean(y)`, `sum(x)`.

- un dessin à main levée (bouton « ✎ Dessin » ou `dessin`), au stylet, au doigt ou à la souris : stylo sensible à la pression, surligneur, gomme, six couleurs, annuler et rétablir.

La formule s'affiche comme écrite à la main. Un clavier et un menu de symboles rangés par familles (courants, grec, ensembles, logique, analyse, exposants et indices, relations, fonctions) évitent de chercher les touches. Une ligne qui contient des symboles de raisonnement (∀, ∈, ⇒, ℝ…) s'affiche comme une phrase mathématique, et « → Réponse » envoie un résultat dans la case de l'exercice. Il y a une ardoise par leçon, enregistrée avec la progression.

## Annotations

Le bouton « Annoter » d'une leçon pose une couche transparente sur l'étape : on y souligne, entoure et écrit au stylet. Les annotations sont rangées par étape (`S.notes`) et synchronisées avec le compte.

## Sur iPad

Déclic s'installe comme une app : dans Safari, Partager puis « Sur l'écran d'accueil ». L'app s'ouvre en plein écran et marche hors connexion grâce au service worker (`sw.js`). Avec un Apple Pencil, le trait suit la pression (forme pleine lissée qui s’affine aux extrémités, comme dans Freeform) et le doigt fait défiler : la paume posée ne laisse pas de trace, ne sélectionne rien et n’appuie sur aucun bouton pendant qu’on écrit. Le réglage « Doigt » de la barre d’outils choisit ce que fait le doigt : Bloqué (par défaut : le doigt ne sélectionne rien et n’appuie sur rien dans la leçon, il fait seulement défiler ; seul le stylet touche), Défile ou Dessine, et l'ardoise passe en plein écran pour écrire à l'aise.

## Comptes

Les comptes (e-mail et mot de passe) synchronisent la progression, les séries et les ardoises sur tous les appareils, via Supabase. Mise en place : `docs/COMPTES.md`. Sans configuration, la progression reste dans le navigateur.

## Organisation

| Fichier | Rôle |
|---|---|
| `index.html` | Structure de la page et styles |
| `app.js` | Moteur de leçons, accueil, pages de cours |
| `ardoise.js` | L'ardoise de calcul (charge math.js et KaTeX à la première ouverture) |
| `ink.js` | L'encre : dessin au stylet, barre d'outils, annotations des leçons |
| `sw.js` | Service worker : installation comme app et mode hors connexion |
| `compte.js` | Comptes et synchronisation |
| `lib.js` | Outils partagés : repères 2D (`plane`) et 3D (`space`), code Python coloré (`py`), fractions, matrices, liste des matières |
| `cours/*.js` | Le contenu, décrit comme des données |
| `examens/*.js` | Les examens de compétence, un fichier par chapitre, chargé à la demande |
| `tools/harness.js` | Vérificateur du contenu |
| `docs/BRIEF.md` | Consignes pour rédiger chapitres et problèmes |
| `docs/EXAMENS.md` | Consignes pour rédiger un examen de compétence |

Site statique, sans étape de build :

```bash
python3 -m http.server 8000
```

## Ajouter ou modifier un chapitre

1. Lire `docs/BRIEF.md`.
2. Écrire dans le fichier `cours/*.js` de la matière (un nouveau fichier s'ajoute aux `<script>` de `index.html`).
3. Vérifier :

```bash
node tools/harness.js
```

4. Écrire l’examen du chapitre dans `examens/<id>.js` (lire `docs/EXAMENS.md`).

Le vérificateur teste toutes les positions des curseurs, exige les problèmes de fin de chapitre et l’examen, et contrôle le HTML. Il ne vérifie pas l'exactitude des maths.
