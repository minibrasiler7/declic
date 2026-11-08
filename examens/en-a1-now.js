/* Déclic — examen de compétence : Right now (anglais A1) */
(()=>{
// Variantes : {a|b} donne une réponse par option ; « it is », « she is »… donnent aussi « it’s », « she’s » (le moteur ne développe pas ’s).
const V=(...ts)=>{ const out=new Set(), S=/\b(?!this\b|is\b)([a-z]+) is\b/i;
  const apo=(pre,s)=>{ const m=S.exec(s); if(!m){ out.add(pre+s); return; } const a=s.slice(0,m.index), b=s.slice(m.index+m[0].length); apo(pre+a+m[0],b); apo(pre+a+m[1]+'’s',b); };
  const rec=s=>{ const m=/\{([^{}]*)\}/.exec(s); if(m){ m[1].split('|').forEach(o=>rec(s.slice(0,m.index)+o+s.slice(m.index+m[0].length))); return; }
    apo('',s.replace(/\s+/g,' ').replace(/\s+([,.?!])/g,'$1').trim()); };
  ts.forEach(rec); return [...out]; };

EXAMS['en-a1-now']=[
 {n:'Les vêtements', r:'Les vêtements', qs:[
   {q:'Il fait froid. Que mets-tu autour du cou&nbsp;?', opts:['a skirt','a shirt','a scarf','a dress'], ans:2, why:'<i lang="en">a scarf</i> = une écharpe. <i lang="en">a skirt</i> est une jupe, <i lang="en">a shirt</i> une chemise.'},
   {q:'Écris en anglais : « un pull ».', lab:'En anglais', txt:['a jumper','a sweater','jumper','sweater'], why:'<i lang="en">a jumper</i> (britannique) ou <i lang="en">a sweater</i> (partout).'},
   {q:'Un Américain dit <i lang="en">pants</i> pour « pantalon ». Quel mot utilise un Britannique&nbsp;?', opts:['knickers','shorts','tights','trousers'], ans:3, why:'En anglais britannique, un pantalon = <i lang="en">trousers</i>. Au Royaume-Uni, <i lang="en">pants</i> désigne un slip.'},
   {q:'Écris en anglais : « Enlève tes chaussures, s’il te plaît. »', lab:'Ta phrase', txt:V('{Please |}take off your shoes{, please|}.','{Please |}take your shoes off{, please|}.'), why:'<i lang="en">Take off your shoes, please.</i> ou <i lang="en">Take your shoes off, please.</i> <i lang="en">off</i> peut se placer avant ou après le nom.'},
   {q:'Quelle phrase est correcte&nbsp;?', opts:['My jeans is new.','My jeans are new.','My jean is new.','My jeans am new.'], ans:1, why:'<i lang="en">jeans</i> est toujours pluriel : <i lang="en">My jeans are new.</i>'},
 ]},
 {n:'Parler de la météo', r:'Quel temps fait-il ?', qs:[
   {q:'Écoute ce bulletin météo. Quel temps fait-il à Londres&nbsp;?', audio:'Good morning! Here is the weather for today. In London it’s cloudy and windy, but it isn’t raining. It’s about twelve degrees.', cache:true, opts:['Il pleut et il fait froid.','C’est nuageux et venteux, environ 12 degrés.','Il fait beau et 20 degrés.','Il neige un peu.'], ans:1, why:'<i lang="en">It’s cloudy and windy, but it isn’t raining. It’s about twelve degrees.</i> : nuageux, venteux, pas de pluie, environ 12 °C.'},
   {q:'Écris en anglais : « Il neige&nbsp;! » (en ce moment)', lab:'Ta phrase', txt:V('It is snowing!'), why:'<i lang="en">It’s snowing!</i> Sujet <i lang="en">it</i> obligatoire, et présent continu parce que ça se passe maintenant.'},
   {q:'Écris la question en anglais : « Quel temps fait-il à Genève&nbsp;? »', lab:'Ta question', txt:V('What is the weather like in Geneva?','How is the weather in Geneva?'), why:'<i lang="en">What’s the weather like in Geneva?</i> N’oublie pas <i lang="en">like</i> à la fin.'},
   {q:'Quelle phrase traduit correctement « Il pleut » (en ce moment)&nbsp;?', opts:['Is raining.','It rains now.','It’s raining.','It raining.'], ans:2, why:'<i lang="en">It’s raining.</i> : sujet <i lang="en">it</i> + <i lang="en">is</i> + <i lang="en">-ing</i>. <i lang="en">It rains</i> décrit une habitude (<i lang="en">It rains a lot in Wales</i>).'},
   {q:'Écoute. Que conseille Paul à Kate&nbsp;?', audio:[['Kate','Do I need an umbrella today?'],['Paul','No, it’s sunny. But take a jumper, it’s cold this morning.']], cache:true, opts:['Prendre un parapluie.','Prendre un pull.','Mettre un short.','Rester à la maison.'], ans:1, why:'<i lang="en">No, it’s sunny. But take a jumper, it’s cold</i> : pas de parapluie, mais un pull, car il fait froid ce matin.'},
 ]},
 {n:'Former le présent continu', r:'Former le verbe en -ing et la question', qs:[
   {q:'Écris la forme en <i lang="en">-ing</i> du verbe <i lang="en">run</i>.', lab:'Forme en -ing', txt:['running'], why:'Une syllabe, consonne + voyelle + consonne : on double le n. <i lang="en">running</i>.'},
   {q:'Écris la forme en <i lang="en">-ing</i> du verbe <i lang="en">make</i>.', lab:'Forme en -ing', txt:['making'], why:'Le e muet tombe : <i lang="en">make → making</i>.'},
   {q:'Quelle forme en <i lang="en">-ing</i> est mal écrite&nbsp;?', opts:['swimming','writing','playing','siting'], ans:3, why:'<i lang="en">sit</i> double son t : <i lang="en">sitting</i>. <i lang="en">swim → swimming</i> double aussi, <i lang="en">write → writing</i> perd son e, <i lang="en">play → playing</i> ne double pas (y).'},
   {q:'Écris en anglais : « Elle écrit un e-mail. » (en ce moment)', lab:'Ta phrase', txt:V('She is writing an {email|e-mail}.'), why:'<i lang="en">She’s writing an email.</i> <i lang="en">write → writing</i> : le e tombe et le t ne double pas.'},
   {q:'Mets le verbe au présent continu et écris la phrase entière : <i lang="en">They ___ (play) cards in the kitchen.</i>', lab:'Ta phrase', txt:['They are playing cards in the kitchen.'], why:'<i lang="en">They</i> → <i lang="en">are</i> + <i lang="en">playing</i> : <i lang="en">They’re playing cards in the kitchen.</i>'},
   {q:'Remets la question dans l’ordre.', ordre:['Where','are','you','going?'], why:'<i lang="en">Where are you going?</i> Mot interrogatif + <i lang="en">are</i> + sujet + verbe en <i lang="en">-ing</i>.'},
 ]},
 {n:'Négation, questions et réponses courtes', r:'Le présent continu : ce qui se passe maintenant', qs:[
   {q:'Écris à la forme négative : <i lang="en">I am working today.</i>', lab:'Ta phrase', txt:['I am not working today.'], why:'<i lang="en">I’m not working today.</i> <i lang="en">not</i> après <i lang="en">am</i> (et jamais « I amn’t »).'},
   {q:'Transforme en question : <i lang="en">Your brother is sleeping.</i>', lab:'Ta question', txt:['Is your brother sleeping?'], why:'On inverse le sujet et <i lang="en">is</i> : <i lang="en">Is your brother sleeping?</i>'},
   {q:'<i lang="en">Are you listening to me?</i> Oui. Écris la réponse courte.', lab:'Ta réponse', txt:['Yes, I am.','Yes, I am listening.','Yes, I am listening to you.'], why:'<i lang="en">Yes, I am.</i> Réponse courte avec l’auxiliaire, sans contraction.'},
   {q:'Quelle phrase contient une erreur&nbsp;?', opts:['She isn’t wearing a hat.','We are waiting for the bus.','He not watching TV.','Are they eating?'], ans:2, why:'Il manque <i lang="en">is</i> : <i lang="en">He isn’t watching TV.</i> Le présent continu a toujours besoin de <i lang="en">be</i>.'},
   {q:'Écris en anglais : « Qu’est-ce que tu fais&nbsp;? » (en ce moment)', lab:'Ta question', txt:['What are you doing?','What are you doing now?','What are you doing right now?','What are you doing at the moment?'], why:'<i lang="en">What are you doing?</i> <i lang="en">What</i> + <i lang="en">are</i> + <i lang="en">you</i> + <i lang="en">doing</i>.'},
   {q:'<i lang="en">Is it raining?</i> Non. Quelle réponse est correcte&nbsp;?', opts:['No, it doesn’t.','No, it isn’t.','No, is not.','No, it not raining.'], ans:1, why:'La question utilise <i lang="en">is</i>, la réponse aussi : <i lang="en">No, it isn’t.</i>'},
 ]},
 {n:'Présent simple ou présent continu', r:'Présent simple ou présent continu ?', qs:[
   {q:'Complète : <i lang="en">Look! The children ___ in the garden.</i>', opts:['play','plays','are playing','is playing'], ans:2, why:'<i lang="en">Look!</i> : ça se passe maintenant. <i lang="en">The children</i> est pluriel : <i lang="en">are playing</i>.'},
   {q:'Complète : <i lang="en">My dad ___ to work every day.</i>', opts:['is driving','drives','drive','driving'], ans:1, why:'<i lang="en">every day</i> = habitude : présent simple, avec <i lang="en">-s</i> à la 3e personne. <i lang="en">My dad drives to work every day.</i>'},
   {q:'Complète avec les verbes entre parenthèses au bon temps, et écris la phrase entière : <i lang="en">Anna usually ___ (drink) tea, but today she ___ (drink) coffee.</i>', lab:'Ta phrase', txt:V('Anna usually drinks tea, but today she is drinking coffee.'), why:'Habitude (<i lang="en">usually</i>) : <i lang="en">drinks</i>. Exception aujourd’hui : <i lang="en">she’s drinking</i>.'},
   {q:'Corrige l’erreur et écris la phrase : <i lang="en">I am knowing your sister.</i>', lab:'Ta phrase', txt:['I know your sister.'], why:'<i lang="en">know</i> est un verbe d’état : jamais au continu. <i lang="en">I know your sister.</i>'},
   {q:'Quelle question demande le <b>métier</b> de quelqu’un&nbsp;?', opts:['What are you doing?','What do you do?','What are you do?','What you do?'], ans:1, why:'<i lang="en">What do you do?</i> (présent simple, ce qu’on fait en général) = quel est ton métier. <i lang="en">What are you doing?</i> = que fais-tu en ce moment.'},
 ]},
 {n:'Comprendre à l’oral', r:'Un appel du dimanche', qs:[
   {q:'Écoute. Où est le père de Mia, et que fait-il&nbsp;?', audio:[['Mia','Hi Dad! Are you at home?'],['Dad','No, I’m not. I’m at the supermarket. I’m buying some food for dinner.'],['Mia','Great! Can you buy some ice cream too?']], cache:true, opts:['Il est à la maison, il cuisine.','Il est au restaurant avec des amis.','Il mange une glace au café.','Il est au supermarché, il achète à manger pour le dîner.'], ans:3, why:'<i lang="en">I’m at the supermarket. I’m buying some food for dinner.</i> Mia lui demande d’acheter aussi de la glace.'},
   {q:'Écoute ce message. Quel est le problème de Lucy&nbsp;?', audio:'Hi Sam, it’s Lucy. I’m standing outside the cinema. It’s really cold and I’m not wearing a coat! Where are you?', cache:true, opts:['Elle attend Sam devant le cinéma et elle a froid.','Elle est en retard au cinéma.','Elle a perdu son manteau.','Il pleut et elle n’a pas de parapluie.'], ans:0, why:'<i lang="en">I’m standing outside the cinema… I’m not wearing a coat! Where are you?</i> : elle attend Sam devant le cinéma, sans manteau, et il fait froid.'},
   {q:'Dictée. Écoute et écris les deux phrases exactes.', dictee:'They aren’t working today. They’re at the beach.', why:'<i lang="en">aren’t working</i> (présent continu négatif), puis <i lang="en">They’re</i> = <i lang="en">They are</i>, à ne pas confondre avec <i lang="en">their</i>.'},
 ]},
];
})();
