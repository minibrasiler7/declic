/* Déclic — examen de compétence : Comparing (anglais A2) */
(()=>{
const V=(...p)=>p.reduce((a,x)=>a.flatMap(s=>[].concat(x).map(y=>s+y)),['']);
EXAMS['en-a2-compare']=[
 {n:'Le comparatif des adjectifs courts', r:'Le comparatif des adjectifs courts', qs:[
   {q:'Écris le comparatif de <i lang="en">hot</i>.', lab:'Comparatif', txt:['hotter'], why:'Une voyelle + une consonne : on double la consonne : <i lang="en">hot → hotter</i>.'},
   {q:'Écris le comparatif de <i lang="en">easy</i>.', lab:'Comparatif', txt:['easier'], why:'Deux syllabes en <i>-y</i> : <i>y → ier</i> : <i lang="en">easier</i>.'},
   {q:'Complète avec le comparatif de <i lang="en">heavy</i> : <i lang="en">My bag is ___ than yours.</i>', lab:'Le mot', txt:['heavier','My bag is heavier than yours.'], why:'<i lang="en">heavy → heavier</i> (<i>y → ier</i>), puis <i lang="en">than</i>.'},
   {q:'Quelle phrase est correcte&nbsp;?', opts:['The bus is more cheap than the train.','The bus is cheaper that the train.','The bus is cheaper than the train.','The bus is more cheaper than the train.'], ans:2, why:'Adjectif court : <i lang="en">-er</i> sans <i lang="en">more</i>, et « que » = <i lang="en">than</i>.'},
   {q:'Écris en anglais : « Le bus est moins cher que le train. »', lab:'Ta phrase', txt:V('The bus is ',['cheaper','less expensive'],' than the train.'), why:'<i lang="en">The bus is cheaper than the train</i> (ou <i lang="en">less expensive than</i>).'},
 ]},
 {n:'Adjectifs longs, irréguliers et nuances', r:'Adjectifs longs, irréguliers et nuances', qs:[
   {q:'Écris le comparatif de <i lang="en">good</i>.', lab:'Comparatif', txt:['better'], why:'<i lang="en">good → better → the best</i> : irrégulier.'},
   {q:'Complète avec le comparatif de <i lang="en">bad</i> : <i lang="en">The traffic is ___ today than yesterday.</i>', opts:['worst','more bad','worse','badder'], ans:2, why:'<i lang="en">bad → worse</i> (comparatif). <i lang="en">worst</i> est le superlatif (le pire).'},
   {q:'Comment dit-on « Mon nouvel appartement est beaucoup plus grand »&nbsp;?', opts:['My new flat is very bigger.','My new flat is much bigger.','My new flat is more bigger.','My new flat is very more big.'], ans:1, why:'Devant un comparatif, « beaucoup » = <i lang="en">much</i> (ou <i lang="en">a lot</i>, <i lang="en">far</i>), jamais <i lang="en">very</i>.'},
   {q:'Écris en anglais : « Ce livre est beaucoup plus intéressant que le film. »', lab:'Ta phrase', txt:V('This book is ',['much','a lot','far'],' more interesting than the ',['film','movie'],'.'), why:'<i lang="en">interesting</i> est long : <i lang="en">more interesting</i>, renforcé par <i lang="en">much</i>.'},
   {q:'Écris en anglais : « Mon nouveau travail est un peu plus stressant. »', lab:'Ta phrase', txt:V('My new job is ',['a bit','a little','a little bit','slightly'],' more stressful.'), why:'<i lang="en">stressful</i> a deux syllabes : <i lang="en">more stressful</i> ; « un peu » = <i lang="en">a bit</i>.'},
 ]},
 {n:'Le superlatif', r:'Le superlatif : le plus, le moins', qs:[
   {q:'Écris le superlatif de <i lang="en">big</i>, avec l’article.', lab:'Superlatif', txt:['the biggest'], why:'On double le g, comme au comparatif : <i lang="en">the biggest</i>.'},
   {q:'Écris en anglais : « C’est la ville la plus chère de Suisse. »', lab:'Ta phrase', txt:V(['It is','It’s','This is'],' the most expensive city in Switzerland.'), why:'<i lang="en">the most expensive</i> ; « de Suisse » = <i lang="en">in Switzerland</i> (un lieu → <i lang="en">in</i>).'},
   {q:'Complète : <i lang="en">It’s the tallest building ___ the world.</i>', opts:['of','in','from','at'], ans:1, why:'Avec un lieu ou un groupe : <i lang="en">in</i>. <i lang="en">of the world</i> est un calque du français.'},
   {q:'Complète : <i lang="en">It was the best day ___ my life.</i>', opts:['in','on','of','at'], ans:2, why:'Avec une période : <i lang="en">of</i> : <i lang="en">the best day of my life</i>.'},
   {q:'Écris en anglais : « C’est l’un des plus vieux ponts d’Europe. »', lab:'Ta phrase', txt:V(['It is','It’s','This is'],' one of the oldest bridges in Europe.'), why:'<i lang="en">one of the</i> + superlatif + nom au pluriel : <i lang="en">one of the oldest bridges in Europe</i>.'},
   {q:'Quelle phrase contient une erreur&nbsp;?', opts:['She is the most young in the class.','He is the tallest in the team.','It was the worst film of the year.','This is the cheapest hotel in town.'], ans:0, why:'<i lang="en">young</i> est court : <i lang="en">the youngest</i>, pas <i lang="en">the most young</i>.'},
 ]},
 {n:'Aussi… que, pas aussi… que', r:'Aussi… que : as … as', qs:[
   {q:'Réécris avec <i lang="en">not as … as</i>, sans changer le sens : <i lang="en">My car is faster than your car.</i> Commence par <i lang="en">Your car</i>.', lab:'Ta phrase', txt:V('Your car is not ',['as','so'],' fast as ',['my car','mine'],'.'), why:'<i lang="en">Your car isn’t as fast as mine.</i> L’adjectif reste à la base entre les deux <i lang="en">as</i>.'},
   {q:'Écris en anglais : « Mon frère est aussi grand que mon père. »', lab:'Ta phrase', txt:V('My brother is as tall as my ',['father','dad'],'.'), why:'<i lang="en">as tall as</i> ; pour la taille d’une personne, « grand » = <i lang="en">tall</i>.'},
   {q:'Quelle expression est correcte&nbsp;?', opts:['as big than','as bigger as','so big than','as big as'], ans:3, why:'<i lang="en">as</i> + adjectif de base + <i lang="en">as</i>.'},
   {q:'Comment dit-on « différent de »&nbsp;?', opts:['different of','different from','different that','different as'], ans:1, why:'<i lang="en">different from</i> (et <i lang="en">the same as</i> pour « le même que »).'},
   {q:'Remets la phrase dans l’ordre.', ordre:['This hotel','is not','as','expensive','as the other one'], why:'<i lang="en">This hotel is not as expensive as the other one</i> : cet hôtel est moins cher que l’autre.'},
 ]},
 {n:'Décrire une ville ou une personne', r:'Décrire une personne', qs:[
   {q:'Comment dit-on « Il est très sympa »&nbsp;?', opts:['He is very sympathetic.','He is very sympathic.','He is very nice.','He is very likeable person.'], ans:2, why:'« sympa » = <i lang="en">nice</i> ou <i lang="en">friendly</i>. <i lang="en">sympathetic</i> veut dire « compatissant ».'},
   {q:'Comment dit-on « Elle est grande et mince »&nbsp;?', opts:['She is big and thin.','She is tall and slim.','She is large and slim.','She is high and thin.'], ans:1, why:'Pour une personne : <i lang="en">tall</i> (grande) et <i lang="en">slim</i> (mince). <i lang="en">big</i> = grosse, <i lang="en">high</i> = haut (pour un objet).'},
   {q:'Comment dit-on « Il y a trop de monde dans le métro » avec un adjectif&nbsp;?', opts:['The underground is crowd.','The underground is too crowded.','The underground is full of world.','The underground is too much people.'], ans:1, why:'<i lang="en">crowded</i> = bondé : <i lang="en">The underground is too crowded.</i>'},
   {q:'Écris en anglais : « Ma ville est plus animée que la tienne. »', lab:'Ta phrase', txt:V('My ',['town','city'],' is ',['livelier','more lively'],' than ',['yours','your town','your city'],'.'), why:'<i lang="en">lively → livelier</i> (<i>y → ier</i>), ou <i lang="en">more lively</i>. « la tienne » = <i lang="en">yours</i>.'},
 ]},
 {n:'Comprendre une comparaison à l’oral', r:'Deux villes, deux emplois', qs:[
   {q:'Écoute. Pourquoi Ben préfère-t-il le vieux quartier&nbsp;?', audio:[['Kate','Do you like your new flat, Ben?'],['Ben','It’s bigger and more modern than my old one, but the area is really boring.'],['Kate','Oh no!'],['Ben','Yes. My old area wasn’t as clean, but it was much livelier. I miss it.']], cache:true, opts:['Parce qu’il était plus propre.','Parce que l’appartement était plus grand.','Parce qu’il était beaucoup plus animé.','Parce qu’il était plus moderne.'], ans:2, why:'<i lang="en">My old area wasn’t as clean, but it was much livelier.</i> Le nouvel appartement est plus grand et plus moderne, mais le quartier est ennuyeux.'},
   {q:'Écoute. Quel téléphone le vendeur conseille-t-il&nbsp;?', audio:'The X2 is the cheapest, but the battery isn’t very good. The Z5 is the most expensive, and it’s heavier than the others. For you, the best phone is the Y3: it’s not as cheap as the X2, but the battery is much better.', cache:true, opts:['Le X2, le moins cher.','Le Y3, avec une bien meilleure batterie.','Le Z5, le plus cher.','Le Z5, le plus léger.'], ans:1, why:'<i lang="en">For you, the best phone is the Y3 … the battery is much better.</i> Le Z5 est le plus cher et plus lourd (<i lang="en">heavier</i>).'},
   {q:'Écoute. Combien coûte la chambre la moins chère&nbsp;? Écris le nombre de livres.', audio:'The double room is ninety-five pounds, and the single room is twenty pounds cheaper.', cache:true, lab:'Livres', txt:['75','£75','seventy-five','75 pounds'], why:'<i lang="en">twenty pounds cheaper</i> : 95 − 20 = 75 livres.'},
   {q:'Dictée. Écoute et écris la phrase exacte.', dictee:'The weather was much worse than last year.', why:'<i lang="en">bad → worse</i>, renforcé par <i lang="en">much</i> ; « que l’an dernier » = <i lang="en">than last year</i>.'},
 ]},
];
})();
