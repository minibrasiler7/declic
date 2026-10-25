# Déclic

Apprendre les maths, les sciences et le code en français, à la manière de Brilliant : un peu de théorie, une figure qu'on manipule, un exercice corrigé tout de suite, puis de vrais problèmes.

Site : https://minibrasiler7.github.io/declic/

## Contenu

- **Cours complets** (`cours/*.js`) : Analyse I et II, algèbre linéaire (plan et dimension 3), géométrie analytique (avec les coniques), informatique (Python et algorithmique), physique, chimie. Chaque chapitre se termine par deux problèmes en plusieurs questions, avec indices et solution rédigée.
- **Mathématiques par niveau** (`cours/maths.js`) : 26 cours, de l'école obligatoire à l'université.
- **Découvertes** : leçons courtes de code et de musique (dans `app.js`).

## L'ardoise

Un brouillon de calcul pour travailler sans papier ni crayon (`ardoise.js`). Chaque ligne peut être :
- un calcul, avec son résultat et la fraction exacte ;
- une valeur à retenir (`a = 7`) ;
- une équation, avec les boutons « Résoudre » et « Des deux côtés… » ;
- une fonction, avec les boutons « Dériver » et « Tracer » ;
- une phrase de raisonnement.

La formule s'affiche comme écrite à la main. Un clavier de symboles évite de chercher les touches, et « → Réponse » envoie un résultat dans la case de l'exercice. Il y a une ardoise par leçon, enregistrée avec la progression.

## Comptes

Les comptes (e-mail et mot de passe) synchronisent la progression, les séries et les ardoises sur tous les appareils, via Supabase. Mise en place : `docs/COMPTES.md`. Sans configuration, la progression reste dans le navigateur.

## Organisation

| Fichier | Rôle |
|---|---|
| `index.html` | Structure de la page et styles |
| `app.js` | Moteur de leçons, accueil, pages de cours |
| `ardoise.js` | L'ardoise de calcul (charge math.js et KaTeX à la première ouverture) |
| `compte.js` | Comptes et synchronisation |
| `lib.js` | Outils partagés : repères 2D (`plane`) et 3D (`space`), code Python coloré (`py`), fractions, matrices, liste des matières |
| `cours/*.js` | Le contenu, décrit comme des données |
| `tools/harness.js` | Vérificateur du contenu |
| `docs/BRIEF.md` | Consignes pour rédiger chapitres et problèmes |

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

Le vérificateur teste toutes les positions des curseurs, exige les problèmes de fin de chapitre et contrôle le HTML. Il ne vérifie pas l'exactitude des maths.
