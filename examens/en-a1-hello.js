/* Déclic — examen de compétence : Hello! (anglais A1) */
(()=>{
EXAMS['en-a1-hello']=[
 {n:'Saluer, se présenter, prendre congé', r:'Saluer et se présenter', qs:[
   {q:'Il est 9 heures du matin. Tu entres dans le bureau de ta cheffe. Que dis-tu&nbsp;?', opts:['Good night!','Good morning!','Good evening!','See you later!'], ans:1, why:'Le matin, on salue avec <i lang="en">Good morning</i>. <i lang="en">Good night</i> ne sert qu’à dire bonne nuit.'},
   {q:'Il est 21 heures, tu quittes des amis pour aller dormir. Que leur dis-tu&nbsp;?', opts:['Good evening!','Good afternoon!','Good night!','Good morning!'], ans:2, why:'En partant le soir pour aller dormir : <i lang="en">Good night</i>. <i lang="en">Good evening</i> sert à saluer en arrivant.'},
   {q:'Quelqu’un te dit <i lang="en">Nice to meet you.</i> Écris la réponse habituelle.', lab:'Ta réponse', txt:['Nice to meet you too','You too','Nice to meet you, too'], why:'On répond <i lang="en">Nice to meet you too</i> (ou simplement <i lang="en">You too</i>).'},
   {q:'Écris en anglais : « Comment vas-tu ? »', lab:'Ta question', txt:['How are you?','How are you doing?'], why:'<i lang="en">How are you?</i> Réponse courante : <i lang="en">I’m fine, thanks. And you?</i>'},
   {q:'Écris en anglais : « Je vais bien, merci. »', lab:'Ta réponse', txt:['I am fine, thanks.','I am fine, thank you.','I am good, thanks.','I am good, thank you.','I am well, thanks.','I am well, thank you.','Fine, thanks.','Fine, thank you.'], why:'<i lang="en">I’m fine, thanks.</i> On peut aussi dire <i lang="en">I’m good</i> ou <i lang="en">I’m well</i>.'},
 ]},
 {n:'Le verbe to be', r:'Le verbe to be : I am, you are', qs:[
   {q:'Complète : <i lang="en">I ___ a teacher.</i> Écris le mot manquant.', lab:'Le mot', txt:['am'], why:'Avec <i lang="en">I</i>, le verbe <i lang="en">to be</i> se conjugue <i lang="en">am</i> : <i lang="en">I am a teacher</i>.'},
   {q:'Complète : <i lang="en">You ___ late!</i> Écris le mot manquant.', lab:'Le mot', txt:['are'], why:'Avec <i lang="en">you</i> : <i lang="en">are</i>. <i lang="en">You’re late!</i> = Tu es en retard&nbsp;!'},
   {q:'Écris en anglais : « J’ai 30 ans. »', lab:'Ta phrase', txt:['I am 30.','I am thirty.','I am 30 years old.','I am thirty years old.'], why:'L’anglais utilise <i lang="en">to be</i> pour l’âge : <i lang="en">I’m 30</i> ou <i lang="en">I’m 30 years old</i>. Jamais « I have 30 years ».'},
   {q:'Quelle phrase est correcte&nbsp;?', opts:['I hungry.','I have hungry.','I’m hungry.','Am hungry.'], ans:2, why:'« J’ai faim » se dit avec <i lang="en">to be</i> : <i lang="en">I’m hungry</i>. Le sujet <i lang="en">I</i> est obligatoire.'},
   {q:'Quelle est la forme contractée de <i lang="en">you are</i>&nbsp;?', opts:['your','you’re','you’are','yo’re'], ans:1, why:'<i lang="en">you are</i> → <i lang="en">you’re</i> : l’apostrophe remplace le a de <i lang="en">are</i>. <i lang="en">your</i> veut dire « ton ».'},
 ]},
 {n:'Négation, questions et réponses courtes', r:'Dire non et poser une question avec to be', qs:[
   {q:'Écris à la forme négative : <i lang="en">I am a student.</i>', lab:'Ta phrase', txt:['I am not a student.'], why:'<i lang="en">I am not a student</i>, ou <i lang="en">I’m not a student</i>.'},
   {q:'Écris à la forme négative : <i lang="en">You are tired.</i>', lab:'Ta phrase', txt:['You are not tired.'], why:'<i lang="en">You are not tired</i> → <i lang="en">You aren’t tired</i> ou <i lang="en">You’re not tired</i>.'},
   {q:'Transforme en question : <i lang="en">You are from Geneva.</i>', lab:'Ta question', txt:['Are you from Geneva?'], why:'On inverse le sujet et le verbe : <i lang="en">Are you from Geneva?</i>'},
   {q:'<i lang="en">Are you a teacher?</i> Tu n’es pas professeur. Écris la réponse courte.', lab:'Ta réponse', txt:['No, I am not.','No, I am not a teacher.'], why:'Réponse courte négative : <i lang="en">No, I’m not.</i>'},
   {q:'<i lang="en">Are you new here?</i> Oui. Quelle réponse courte est correcte&nbsp;?', opts:['Yes, I’m.','Yes, I am.','Yes, I are.','Yes, am I.'], ans:1, why:'On ne contracte pas en fin de réponse courte : <i lang="en">Yes, I am.</i> (« Yes, I’m » est impossible).'},
   {q:'Quelle phrase contient une erreur&nbsp;?', opts:['I’m not ready.','You aren’t late.','I amn’t tired.','Are you OK?'], ans:2, why:'<i lang="en">I amn’t</i> n’existe pas : on dit <i lang="en">I’m not</i>.'},
 ]},
 {n:'Les possessifs my et your', r:'My et your : mon, ton', qs:[
   {q:'Écris en anglais : « Mon nom de famille est Rossi. »', lab:'Ta phrase', txt:['My surname is Rossi.','My last name is Rossi.','My family name is Rossi.'], why:'<i lang="en">My surname is Rossi.</i> (<i lang="en">last name</i> ou <i lang="en">family name</i> sont aussi corrects)'},
   {q:'Complète : <i lang="en">What’s ___ phone number?</i> (ton)', lab:'Le mot', txt:['your'], why:'« ton » = <i lang="en">your</i>. <i lang="en">What’s your phone number?</i>'},
   {q:'Laquelle est correcte pour « Tu es mon ami » ?', opts:['Your my friend.','You’re my friend.','You’re mine friend.','Your’re my friend.'], ans:1, why:'« Tu es » = <i lang="en">you’re</i> ; « mon » = <i lang="en">my</i>. <i lang="en">You’re my friend.</i>'},
   {q:'Remets dans l’ordre.', ordre:['My','first','name','is','Paul.'], why:'<i lang="en">My first name is Paul.</i> Le possessif précède le nom : <i lang="en">my first name</i>.'},
 ]},
 {n:'Épeler et l’alphabet', r:'L’alphabet anglais', qs:[
   {q:'Écoute et écris le nom épelé.', audio:'G, R, E, E, N. Green.', cache:true, lab:'Le nom', txt:['Green'], why:'G (« dji »), R, E, E (« i, i »), N : <i lang="en">Green</i>. Deux E de suite se disent aussi <i lang="en">double E</i>.'},
   {q:'Écoute et écris le prénom épelé.', audio:'J, A, M, E, S. James.', cache:true, lab:'Le prénom', txt:['James'], why:'J (« djèï »), A (« èï »), M, E (« i »), S : <i lang="en">James</i>.'},
   {q:'Comment dit-on la lettre <b>I</b> en anglais&nbsp;?', opts:['comme « i »','comme « aï »','comme « è »','comme « eu »'], ans:1, why:'Le I anglais se dit « aï », comme <i lang="en">my</i>. C’est le E qui se dit « i ».'},
   {q:'On épelle <i lang="en">Emma</i>. Comment dit-on les deux M&nbsp;?', opts:['M, M','two M','double M','M and M'], ans:2, why:'Une lettre répétée se dit avec <i lang="en">double</i> : <i lang="en">E, double M, A</i>.'},
   {q:'Écris la question qu’on pose pour demander l’orthographe d’un nom : « Comment ça s’écrit ? »', lab:'Ta question', txt:['How do you spell it?','How do you spell that?','How do you spell your name?','How do you spell your surname?'], why:'<i lang="en">How do you spell it?</i>'},
 ]},
 {n:'Nombres et numéros', r:'Les nombres de 0 à 20', qs:[
   {q:'Écoute et écris le nombre en chiffres.', audio:'Seventeen.', cache:true, lab:'Nombre', txt:['17','seventeen'], why:'<i lang="en">Seventeen</i> = 17 (<i lang="en">seven</i> + <i lang="en">-teen</i>).'},
   {q:'Écoute et écris le numéro en chiffres, sans espaces.', audio:'My number is oh four four, two six one, three nine five.', cache:true, lab:'Numéro', txt:['044261395'], why:'<i lang="en">oh</i> = 0 et <i lang="en">four four</i> = 44 : 044 261 395.'},
   {q:'Écris en lettres, en anglais : 12', lab:'En anglais', txt:['twelve'], why:'12 = <i lang="en">twelve</i> (et 11 = <i lang="en">eleven</i>) : deux nombres irréguliers à apprendre par cœur.'},
   {q:'Comment lit-on souvent le chiffre 0 dans un numéro de téléphone britannique&nbsp;?', opts:['nil','oh','none','null'], ans:1, why:'Dans un numéro, 0 se dit souvent <i lang="en">oh</i>, comme la lettre O.'},
 ]},
 {n:'Comprendre à l’oral', r:'Une première rencontre', qs:[
   {q:'Écoute. Comment va la personne&nbsp;?', audio:[['Ben','Hi, Kate! How are you?'],['Kate','I’m fine, thanks. And you?'],['Ben','Not bad. I’m a bit tired.']], cache:true, opts:['Ben va très bien.','Kate est fatiguée.','Ben est un peu fatigué.','Kate ne va pas bien.'], ans:2, why:'Ben dit <i lang="en">Not bad. I’m a bit tired</i> : pas mal, un peu fatigué. Kate va bien (<i lang="en">I’m fine</i>).'},
   {q:'Écoute. Pourquoi Mark appelle-t-il&nbsp;?', audio:[['Mark','Good afternoon. My name is Mark Hill. I’m in room twelve.'],['Receptionist','Good afternoon, Mr Hill. How can I help?'],['Mark','What’s the wifi password, please?']], cache:true, opts:['Il veut changer de chambre.','Il demande le mot de passe du wifi.','Il veut réserver la chambre 20.','Il cherche le petit-déjeuner.'], ans:1, why:'<i lang="en">What’s the wifi password, please?</i> : il demande le mot de passe du wifi. Il est dans la chambre 12 (<i lang="en">twelve</i>).'},
   {q:'Dictée. Écoute et écris la phrase exacte.', dictee:'Are you new here? Yes, I am.', why:'Question avec inversion (<i lang="en">Are you…</i>) et réponse courte sans contraction (<i lang="en">Yes, I am</i>).'},
 ]},
];
})();
