# Déclic

Apprendre les maths, les sciences et le code en français, à la manière de Brilliant : un peu de théorie, une figure qu'on manipule, puis un exercice corrigé tout de suite.

Site : https://minibrasiler7.github.io/declic/

## Contenu

- **Année préparatoire (programme CMS)** : 75 chapitres en 7 branches (Analyse I et II, algèbre linéaire, géométrie analytique, informatique, physique, chimie). Fichiers `cms-*.js`.
- **Mathématiques** : 26 cours de l'école obligatoire à l'université (`maths.js`).
- **Code et musique** : deux leçons de démonstration, dans `index.html`.

## Organisation

| Fichier | Rôle |
|---|---|
| `index.html` | Interface et moteur de leçons |
| `lib.js` | Outils partagés : repères 2D (`plane`) et 3D (`space`), code Python coloré (`py`), fractions, matrices |
| `maths.js`, `cms-*.js` | Le contenu, décrit comme des données (une étape = curseurs, QCM ou réponse numérique) |
| `tools/harness.js` | Vérificateur du contenu |
| `docs/BRIEF.md` | Consignes pour rédiger de nouveaux chapitres |

Site statique sans étape de build : n'importe quel serveur de fichiers suffit.

```bash
python3 -m http.server 8000
```

## Ajouter ou modifier un chapitre

1. Lire `docs/BRIEF.md`.
2. Écrire le chapitre dans le fichier `cms-*.js` de la branche (ou un nouveau fichier, à ajouter dans les `<script>` de `index.html`).
3. Vérifier :

```bash
node tools/harness.js cms-an1.js
```

Le vérificateur teste toutes les positions des curseurs, contrôle que chaque exercice a une solution atteignable et que le HTML est bien fermé. Il ne vérifie pas l'exactitude des maths.

La progression des élèves est stockée dans leur navigateur (`localStorage`).
