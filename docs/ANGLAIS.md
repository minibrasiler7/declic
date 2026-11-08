# Anglais (A1, A2, B1, B2)

Matière `en` dans `lib.js` (MATIERES, `lang:'en-GB'`), parties `a1`, `a2`, `b1`, `b2`. Chaque unité est un `COURS.push({subj:'en', sem:'a1', id:'en-a1-…', o:<rang>, h, p, steps})` et a son examen `examens/<id>.js` (28 à 32 questions, 4 à 8 notions).

Lis aussi `docs/BRIEF.md` (format général, Méthodes, Problèmes, Récapitulatif, exactitude) et `docs/EXAMENS.md`. Leurs règles s’appliquent, sauf les figures à curseurs, remplacées ici par l’audio et les exercices de langue. L’unité modèle est **`en-a1-hello`** dans `cours/en-a1-1.js` : lis-la en entier avant d’écrire.

## Comment on apprend (et pourquoi le cours est construit ainsi)
Le lecteur est un adulte ou un ado motivé qui veut **progresser vraiment**. Le cours est vivant et varié, mais ce n’est pas un jeu : pas de mascotte, pas de récompenses gratuites, pas d’exercices de reconnaissance faciles à deviner. Ce qui marche :
1. **Beaucoup d’entrée compréhensible** : des dialogues et des textes un peu au-dessus du niveau, écoutés puis lus. On écoute d’abord **sans le texte** (`cache:true`), on répond, puis le texte apparaît.
2. **Produire plutôt que reconnaître** : la plupart des exercices demandent d’**écrire** la réponse (`txt`, `ordre`, `dictee`), pas de la choisir. Les QCM servent surtout à la compréhension.
3. **Le vocabulaire en contexte et en répétition espacée** : chaque unité présente 15 à 25 mots ou expressions (`mots`), avec une phrase d’exemple. Ces mots entrent ensuite dans la « Révision du vocabulaire » de la matière, qui les redemande demain, dans 3 jours, 7 jours… Choisis des **expressions toutes faites** (chunks) autant que des mots isolés : *How are you doing?*, *I’d like…*, *It depends.*
4. **La grammaire expliquée, puis pratiquée tout de suite** : on part d’exemples tirés du dialogue, on énonce la règle (forme, emploi), on montre **les pièges des francophones** (*I am agree*, *since/for*, *he don’t*, *the life is*, *actually ≠ actuellement*), puis on pratique en écrivant.
5. **La dictée** : elle relie l’oreille et l’orthographe. Une à trois par unité, courtes.
6. **L’oral par imitation** : écouter une phrase modèle, la redire (`dire`, reconnaissance vocale), puis parler librement sur une consigne (`oral`) et comparer à un modèle.
7. **L’écriture guidée** : une consigne réaliste (message, e-mail, description, avis), un nombre minimal de mots, un modèle et des critères (`ecrire`).
8. **La prononciation des francophones** : le *h*, les *th*, les voyelles longues et courtes (*ship/sheep*), le *-ed*, l’accent tonique, les formes faibles. Un point par unité, avec écoute et répétition.
9. **Des situations réelles** : se présenter à un collègue, commander, prendre un train, un entretien, une réclamation, un débat. Un peu d’humour et de culture (pays anglophones, différences britannique/américain) rend le cours vivant.

## Langue des explications
- **A1 et A2** : explications et consignes en français, exemples en anglais.
- **B1** : consignes en anglais simple, explications de grammaire en français.
- **B2** : tout en anglais, avec des notes en français pour les pièges des francophones.
- Anglais **britannique** par défaut (orthographe *colour*, *centre*, vocabulaire *flat*, *lift*). Signale l’usage américain quand il diffère.

## Plan d’une unité (16 à 22 étapes, puis 2 missions)
Ordre conseillé, à adapter au thème :
1. **Écoute d’entrée** : un dialogue (`audio` en `[[qui, texte], …]`, `cache:true`) et une question de compréhension globale (QCM). `p` dit en une phrase ce qu’on saura faire à la fin de l’unité.
2. **Vocabulaire** (`mots`) en un ou deux groupes, puis rappel actif (`txt`, du français vers l’anglais).
3. **Grammaire** : une ou deux étapes de théorie (blocs `def`, `idea`, `ex`, `warn`, au moins 70 mots), puis une **Méthode** (`demo`) pour la technique (former une question, une négation, un temps…).
4. **Pratique** : au moins 4 exercices écrits (`txt` à trous ou à transformer, `ordre`), du plus guidé au plus libre.
5. **Prononciation** : théorie courte avec `audio`, puis `dire`.
6. **Lecture** : un texte plus long (80 à 200 mots selon le niveau, avec `audio` pour l’écouter aussi) et 1 ou 2 questions.
7. **Dictée** (`dictee`).
8. **Oral** : `dire` (répéter des phrases du dialogue), puis `oral` (parler librement 30 secondes à 1 minute).
9. **Écriture** (`ecrire`).
10. **Récapitulatif** (`kind:'Récapitulatif'`, bloc `keep`).
11. **Deux missions** (`kind:'Mission'`, étapes à `parts`) : une situation complète qui mélange compréhension (QCM sur un `audio` ou un texte) et production écrite courte (`txt`). La 2e est plus exigeante.

Minimum vérifié : 3 étapes avec audio, 1 dictée, 2 étapes d’oral (`dire` ou `oral`), 1 écriture, 12 mots, 3 exercices, 1 Méthode, 2 missions à la fin.

## Les champs de langue
- `audio` : un texte (`'Nice to meet you.'`) ou un dialogue `[['Anna','Hi!'],['Tom','Hello!']]` (deux voix). Lu par la synthèse vocale, avec « Plus lentement ». `cache:true` cache le texte jusqu’à la réponse.
- `mots:[['to get up','se lever','I get up at seven.'], …]` : liste qu’on touche pour l’entendre. Variantes acceptées à la révision : `'a flat / an apartment'`. Mets l’article ou *to* comme en anglais : ils sont facultatifs à la révision.
- `txt` : réponse écrite, une chaîne ou un tableau de réponses acceptées : `{h, p, lab:'Ta phrase', txt:['I am not tired.','I’m not tired.'], why}`. La comparaison ignore la casse, la ponctuation et les accents, et **accepte les contractions** (*I’m = I am*, *don’t = do not*, *can’t = cannot*, *won’t = will not*, *’re*, *’ve*, *’ll*). *’s* et *’d* sont ambigus : écris les deux formes si besoin. Liste **toutes** les réponses correctes raisonnables (ordre des mots possible, synonymes courants). Une petite faute de frappe est signalée « Presque ». `show` (facultatif) : la réponse affichée.
- `long:true` : grande zone de texte pour `txt`.
- `formel:true` : registre soutenu, les contractions sont refusées (écris alors les réponses en toutes lettres).
- Le moteur accepte aussi : *’s* = *is/has* et *’d* = *would/had* après un pronom ou un mot interrogatif, les nombres en lettres = en chiffres (jusqu’à 99), 5,000 = 5000, 11 p.m. = 11pm, 10h35 = 10:35, Wi-Fi = wifi, *o’clock* sans apostrophe. Les apostrophes oubliées (*dont*) sont signalées « Presque ».
- `ordre:'I usually get up at seven'` (ou un tableau d’étiquettes `['I','usually','get up','at seven']`) : remettre les mots dans l’ordre. `alt:[…]` : autres ordres corrects.
- `dictee:'My brother works in a bank.'` : l’élève écoute (le texte reste caché) et écrit. Correction mot à mot. Pas d’`audio` en plus.
- `dire:'I’d like a coffee, please.'` ou `dire:{t:'…', cache:true}` (sans le texte écrit, de mémoire) : écouter puis redire, la reconnaissance vocale affiche les mots compris. Non bloquant.
- `oral:{modele:'…', criteres:['…', …]}` : parler librement sur la consigne de `p`, puis voir un exemple de réponse (lu à voix haute) et des critères à cocher. Non bloquant.
- `ecrire:{min:40, modele:'…', criteres:['J’ai salué', {t:'J’ai utilisé le prétérit', re:'\\b(was|were|went|\\w+ed)\\b'}]}` : texte libre (gardé pour l’élève), puis modèle et critères. Un critère `{t, re}` se vérifie automatiquement (expression régulière, sans casse) ; le modèle doit le remplir. Non bloquant.
- Dans les **missions**, une question peut être `txt` (ou `opts`). Chaque question a `hint` et `why`. L’`audio` se met au niveau de l’étape.
- Une étape d’exercice n’a pas de champ « question » : **la question s’écrit dans `p`** (à la fin, en gras : « <b>Question :</b> … »), en plus de la consigne.
- `kind` : `'Écoute'`, `'Vocabulaire'`, `'Grammaire'`, `'Méthode'`, `'Pratique'`, `'Prononciation'`, `'Lecture'`, `'Dictée'`, `'Oral'`, `'Écriture'`, `'Récapitulatif'`, `'Mission'`.
- Le texte anglais dans le HTML : `<i lang="en">…</i>` ou `<b>` pour les exemples dans une explication en français.

## Examen de l’unité
28 à 32 questions, 4 à 8 notions (`r` = titre exact d’une étape de l’unité). Mélange : au moins 4 questions d’écoute (`audio` + `opts`, ou `dictee`), au moins 10 réponses écrites (`txt` ou `ordre`), le reste en QCM (vocabulaire en contexte, choix du temps, détection d’erreur). Chaque énoncé se suffit à lui-même. Nouveaux exemples, pas ceux du cours.

## Exactitude
L’anglais doit être **naturel et correct** (pas de calque du français), au bon niveau du CECR. Vérifie chaque réponse attendue et liste les variantes correctes : une bonne réponse refusée décourage. Recalcule les prix, horaires et dates. Pas de nom d’école, de manuel ni d’examen officiel.

## Le plan
`o` = rang dans le niveau. Grammaire / thème et situations.

### A1 (`sem:'a1'`)
1. `en-a1-hello` Hello! : saluer, se présenter, épeler son nom (alphabet), nombres 0–20, *to be* (I, you), *my/your*.
2. `en-a1-family` Family and friends : *to be* complet (affirmatif, négatif, questions, réponses courtes), adjectifs possessifs, *’s* possessif, la famille, nombres jusqu’à 100, âge.
3. `en-a1-countries` Where are you from? : pays et nationalités, questions en *wh-* (*what, where, who, how old*), *a/an*, pluriels.
4. `en-a1-things` My things : *this/that/these/those*, *there is / there are*, objets du quotidien, couleurs, prépositions de lieu (*in, on, under, next to*).
5. `en-a1-routine` Daily routine : présent simple affirmatif (*-s* à la 3e personne et sa prononciation), heure, jours, adverbes de fréquence et leur place.
6. `en-a1-work` Work and questions : présent simple négatif et questions (*do/does*, *don’t/doesn’t*), réponses courtes, métiers, lieux de travail.
7. `en-a1-food` Food and drink : dénombrables et indénombrables, *some/any*, *How much / How many*, commander au café, prix (livres, dollars, francs).
8. `en-a1-free-time` Free time : *like/love/hate + -ing*, *can/can’t* (capacité), pronoms compléments, loisirs, sports.
9. `en-a1-town` Around town : lieux de la ville, demander et indiquer le chemin, impératif, prépositions (*opposite, between, on the left*), *Let’s…*.
10. `en-a1-now` Right now : présent continu (forme, emploi), contraste avec le présent simple, vêtements, météo.
11. `en-a1-past-be` Where were you? : *was/were*, dates, nombres ordinaux, mois, *yesterday, last…, … ago*.
12. `en-a1-weekend` Last weekend : prétérit régulier (prononciation de *-ed*) et irréguliers courants, questions et négations avec *did*.

### A2 (`sem:'a2'`)
1. `en-a2-stories` Life stories : prétérit (révision et approfondissement), *ago*, connecteurs de récit (*then, after that, finally*), biographies.
2. `en-a2-compare` Comparing : comparatifs et superlatifs (courts, longs, irréguliers), *as … as*, adjectifs pour décrire villes et personnes.
3. `en-a2-plans` Plans : *be going to*, présent continu pour les rendez-vous, inviter, accepter et refuser poliment.
4. `en-a2-future` Predictions and promises : *will / won’t* (prédiction, décision immédiate, offre, promesse), *I think / I don’t think … will*.
5. `en-a2-experiences` Experiences : present perfect (*ever, never*), participes passés, contraste avec le prétérit (expérience vs moment précis).
6. `en-a2-health` Health : le corps, chez le médecin, *should/shouldn’t*, *have to / don’t have to*, conseils.
7. `en-a2-shopping` Shopping : *too / enough*, quantités (*a lot of, a few, a little*), tailles, essayer, payer, retourner un article.
8. `en-a2-travel` Travel : prétérit continu et prétérit (*when, while*), transports, gare et aéroport, acheter un billet.
9. `en-a2-work` Work and studies : present perfect avec *for/since*, *just, already, yet*, CV simple, parcours.
10. `en-a2-rules` Rules : *must / mustn’t / have to / can* (permission), panneaux et règlements, faire une demande polie (*Can I…? Could you…?*).
11. `en-a2-people` People : propositions relatives (*who, which, that, where*), décrire une personne, quelques phrasal verbs fréquents (*get on with, look after*).
12. `en-a2-world` The world around us : 1er conditionnel, *when / as soon as / unless* (aperçu), environnement, connecteurs (*because, so, but, although*).

### B1 (`sem:'b1'`)
1. `en-b1-identity` Who I am : présents (simple, continu, verbes d’état), adjectifs de personnalité, parler de soi longuement.
2. `en-b1-narrative` Telling stories : temps du récit (prétérit simple, continu, *past perfect*), connecteurs et marqueurs de temps.
3. `en-b1-achievements` Achievements : present perfect simple et continu, *How long…?*, réalisations et projets en cours.
4. `en-b1-future` The future : *will, going to*, présent continu, *future continuous*, probabilité (*likely, bound to*).
5. `en-b1-opinions` Opinions : donner son avis, être d’accord ou non, nuancer ; gérondif et infinitif après les verbes (*enjoy doing, decide to do, stop doing/to do*).
6. `en-b1-hypotheses` Imagine : 2e conditionnel, *I wish + prétérit*, *If I were you*.
7. `en-b1-media` News and media : voix passive (présent, passé, present perfect, modaux), vocabulaire de l’information, titres de presse.
8. `en-b1-reported` He said that… : discours indirect (déclarations, questions, ordres), *say / tell / ask*, concordance des temps.
9. `en-b1-work` At work : modaux d’obligation et de déduction (*must, have to, might, can’t be*), entretien d’embauche, e-mail formel.
10. `en-b1-technology` Technology : relatives déterminatives et non déterminatives, noms composés, décrire un objet et son usage.
11. `en-b1-habits` Then and now : *used to*, *would* (habitudes passées), *be/get used to*, réclamations et demandes polies (*Would you mind…?*).
12. `en-b1-lifestyle` Lifestyle : quantificateurs (*few, little, plenty of, hardly any*), *ought to, had better*, phrasal verbs de la santé et du sport.

### B2 (`sem:'b2'`)
1. `en-b2-impressions` First impressions : questions indirectes et polies, questions à préposition finale, nuances de la description de personnes.
2. `en-b2-past` The past revisited : *past perfect continuous*, *would / used to*, *be used to / get used to*, récits élaborés.
3. `en-b2-future-perfect` Looking ahead : *future perfect* et *future continuous*, *be about to, be due to*, projets de carrière.
4. `en-b2-conditionals` What if… : 3e conditionnel et conditionnels mixtes, regrets (*should have, wish + past perfect, if only*).
5. `en-b2-deduction` Mysteries : modaux au passé (*must have, might have, can’t have, needn’t have, should have*), déduction et spéculation.
6. `en-b2-passive` Getting things done : passif avancé, causatif (*have/get something done*), *It is said that… / He is thought to…*.
7. `en-b2-reporting` Reporting verbs : *suggest, recommend, deny, admit, warn, accuse…* et leurs constructions, résumer une conversation.
8. `en-b2-argument` Making a case : concession et contraste (*although, despite, whereas, however, nevertheless*), structure d’un essai argumentatif.
9. `en-b2-words` Word power : formation des mots (préfixes, suffixes), collocations (*make/do, heavy rain, take a decision* → *make a decision*).
10. `en-b2-phrasal` Phrasal verbs and idioms : phrasal verbs séparables et inséparables, idiomes courants, registre familier.
11. `en-b2-clauses` Complex sentences : propositions participiales, relatives réduites, mise en relief (*What I need is…, It was … that…*).
12. `en-b2-register` Formal and informal : inversion (*Never have I…, Not only…*), registre formel et informel, lettre de réclamation, rapport.
