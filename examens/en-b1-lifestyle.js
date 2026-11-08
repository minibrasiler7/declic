/* Déclic — examen de compétence : Lifestyle (anglais B1) */
(()=>{
const X=(...parts)=>parts.reduce((acc,p)=>acc.flatMap(a=>[].concat(p).map(b=>b?(a?a+' '+b:b):a)),['']);
EXAMS['en-b1-lifestyle']=[
 {n:'Few, a few, little, a little', r:'Few, a few, little, a little', qs:[
   {q:'Complete with <i lang="en">a few</i> or <i lang="en">a little</i>: <i lang="en">I’ll be ready in ___ minutes.</i>', lab:'Two words', txt:['a few'], why:'<i lang="en">minutes</i> est un pluriel dénombrable : <i lang="en">a few minutes</i>.'},
   {q:'Complete with <i lang="en">a few</i> or <i lang="en">a little</i>: <i lang="en">Add ___ olive oil to the pan.</i>', lab:'Two words', txt:['a little'], why:'<i lang="en">oil</i> est indénombrable : <i lang="en">a little olive oil</i>.'},
   {q:'Which sentence means that the speaker feels lonely?', opts:['I’ve got a few friends here.','I’ve got few friends here.','I’ve got plenty of friends here.','I’ve got lots of friends here.'], ans:1, why:'Sans <i lang="en">a</i>, <i lang="en">few</i> a un sens négatif : peu d’amis, pas assez.'},
   {q:'Which sentence has a mistake?', opts:['We’ve got a little time before the film.','She speaks a little Spanish.','I need a few time to think.','A few people stayed until the end.'], ans:2, why:'<i lang="en">time</i> est indénombrable : <i lang="en">a little time</i>, pas <i lang="en">a few time</i>.'},
   {q:'Complete with <i lang="en">few</i> or <i lang="en">little</i> (negative meaning): <i lang="en">Sadly, ___ people came to the charity run.</i>', lab:'Your answer', txt:['few','very few'], why:'<i lang="en">people</i> est un pluriel dénombrable, et l’idée est négative (<i lang="en">sadly</i>) : <i lang="en">few people</i>.'},
 ]},
 {n:'Plenty of, hardly any, much, many', r:'Plenty of, hardly any and other quantifiers', qs:[
   {q:'Rewrite with <i lang="en">hardly any</i>: <i lang="en">I got almost no sleep last night.</i>', lab:'Your sentence', txt:['I got hardly any sleep last night.','Last night I got hardly any sleep.'], why:'<i lang="en">hardly any</i> = presque pas de ; le verbe reste affirmatif.'},
   {q:'Complete with two words meaning «&nbsp;largement assez de&nbsp;»: <i lang="en">Don’t worry, we’ve got ___ time.</i>', lab:'Two words', txt:['plenty of'], why:'<i lang="en">plenty of time</i> = largement le temps.'},
   {q:'Which sentence about people and health is correct?', opts:['Most of people want to be healthy.','Most people want to be healthy.','The most people want to be healthy.','Most of people wants to be healthy.'], ans:1, why:'« la plupart des gens » = <i lang="en">most people</i>, sans <i lang="en">of</i> ni <i lang="en">the</i>.'},
   {q:'This sentence is wrong. Write it correctly: <i lang="en">I don’t get hardly any exercise.</i>', lab:'Correct sentence', txt:['I get hardly any exercise.','I hardly get any exercise.','I don’t get much exercise.','I don’t get very much exercise.'], why:'Pas de double négation : <i lang="en">hardly</i> est déjà négatif. <i lang="en">I get hardly any exercise.</i>'},
   {q:'Translate: «&nbsp;Tu manges beaucoup trop de sucre.&nbsp;»', lab:'In English', txt:['You eat far too much sugar.','You eat much too much sugar.','You eat way too much sugar.','You’re eating far too much sugar.'], why:'<i lang="en">sugar</i> est indénombrable : <i lang="en">too much</i> ; « beaucoup trop » = <i lang="en">far too much</i>.'},
 ]},
 {n:'Choisir le bon quantificateur', r:'Choosing the right quantifier', qs:[
   {q:'Choose the correct word: <i lang="en">How ___ advice did the coach give you?</i>', opts:['many','much','few','a few'], ans:1, why:'<i lang="en">advice</i> est indénombrable : <i lang="en">How much advice</i>.'},
   {q:'Complete with one word: <i lang="en">I can’t come tonight. I’ve got very ___ money left this month.</i>', lab:'One word', txt:['little'], why:'<i lang="en">money</i> est indénombrable et l’idée est négative : <i lang="en">very little money</i>.'},
   {q:'Choose the best option: <i lang="en">The test was easy: ___ students failed it.</i> (= presque aucun)', opts:['plenty of','a lot of','a little','hardly any'], ans:3, why:'« presque aucun » avec un pluriel : <i lang="en">hardly any students</i>. <i lang="en">a little</i> ne va pas avec un dénombrable.'},
   {q:'Translate: «&nbsp;J’ai quelques questions.&nbsp;»', lab:'In English', txt:['I have a few questions.','I’ve got a few questions.'], why:'<i lang="en">questions</i> est dénombrable, l’idée est neutre ou positive : <i lang="en">a few questions</i>.'},
 ]},
 {n:'Conseils : should, ought to, had better', r:'Advice and warnings: should, ought to, had better', qs:[
   {q:'Rewrite with <i lang="en">ought to</i>: <i lang="en">You should stretch after running.</i>', lab:'Your sentence', txt:['You ought to stretch after running.','You ought to stretch after you run.','You ought to stretch after a run.'], why:'<i lang="en">ought</i> est toujours suivi de <i lang="en">to</i> : <i lang="en">You ought to stretch after running.</i>'},
   {q:'Which warning is correct?', opts:['You’d better to leave now.','You’d better leave now.','You’d better leaving now.','You had better left now.'], ans:1, why:'<i lang="en">had better</i> + base verbale, sans <i lang="en">to</i>.'},
   {q:'Write the negative (a warning: don’t eat it!): <i lang="en">You’d better eat that.</i>', lab:'Your sentence', txt:['You’d better not eat that.','You had better not eat that.'], why:'<i lang="en">not</i> se place après <i lang="en">better</i> : <i lang="en">You’d better not eat that.</i>'},
   {q:'Translate: «&nbsp;Tu ferais mieux d’appeler le médecin.&nbsp;»', lab:'In English', txt:X(['You’d better','You had better'],['call the doctor.','call a doctor.','phone the doctor.','ring the doctor.','call your doctor.','see a doctor.','see the doctor.']), why:'<i lang="en">You’d better call the doctor.</i> Conseil urgent dans une situation précise : <i lang="en">had better</i>.'},
   {q:'Complete with one word: <i lang="en">You ___ to see a dentist about that tooth.</i>', lab:'One word', txt:['ought'], why:'Le <i lang="en">to</i> qui suit impose <i lang="en">ought</i> : <i lang="en">You ought to see a dentist.</i>'},
 ]},
 {n:'Phrasal verbs : sens et place du complément', r:'Phrasal verbs: where does the object go?', qs:[
   {q:'Which answer about running is correct?', opts:['Running? I took up it last year.','Running? I took it up last year.','Running? I took it last year up.','Running? I up took it last year.'], ans:1, why:'<i lang="en">take up</i> est séparable : le pronom se place au milieu, <i lang="en">took it up</i>.'},
   {q:'Replace the noun with <i lang="en">it</i>: <i lang="en">I got over the flu quickly.</i>', lab:'Your sentence', txt:['I got over it quickly.'], why:'<i lang="en">get over</i> est inséparable : le pronom va après la préposition, <i lang="en">got over it</i>.'},
   {q:'Complete with two words (= réduire): <i lang="en">My doctor told me to cut ___ ___ salt.</i>', lab:'Two words', txt:['down on'], why:'<i lang="en">cut down on</i> = réduire sa consommation de.'},
   {q:'Complete with the correct form: <i lang="en">She gave up ___ (eat) meat two years ago.</i>', lab:'One word', txt:['eating'], why:'<i lang="en">give up</i> + verbe en -ing : <i lang="en">gave up eating meat</i>.'},
   {q:'What does <i lang="en">I work out three times a week</i> mean?', opts:['Je travaille dehors trois fois par semaine.','Je sors trois fois par semaine.','Je m’entraîne trois fois par semaine.','Je fais mes comptes trois fois par semaine.'], ans:2, why:'<i lang="en">work out</i> = s’entraîner (salle de sport). Il ne veut jamais dire « travailler dehors ».'},
 ]},
 {n:'Le vocabulaire du mode de vie', r:'Healthy habits', qs:[
   {q:'Which verb is correct? <i lang="en">I try to ___ some exercise every day.</i>', opts:['make','do','practise of','play'], ans:1, why:'On dit <i lang="en">do exercise</i>, jamais <i lang="en">make exercise</i> ni <i lang="en">make sport</i>.'},
   {q:'Translate: «&nbsp;Je saute souvent le petit-déjeuner.&nbsp;»', lab:'In English', txt:['I often skip breakfast.','I often miss breakfast.'], why:'<i lang="en">skip breakfast</i> = sauter le petit-déjeuner. L’adverbe <i lang="en">often</i> se place devant le verbe.'},
   {q:'Write in English: «&nbsp;une alimentation équilibrée&nbsp;»', lab:'In English', txt:['a balanced diet','balanced diet'], why:'<i lang="en">a balanced diet</i> : <i lang="en">diet</i> désigne ce qu’on mange, pas seulement un régime.'},
 ]},
 {n:'Comprendre à l’oral', r:'A new start', qs:[
   {q:'Listen. What does the coach advise?', audio:[['Coach','How are you feeling after last week?'],['Lily','Much better. I’ve cut down on coffee and I’m sleeping more.'],['Coach','Great. You’d better not train too hard today, though. Your knee still needs rest.']], cache:true, opts:['To train harder than last week','To drink more coffee','Not to train too hard today','To stop training completely'], ans:2, why:'<i lang="en">You’d better not train too hard today</i> : son genou a encore besoin de repos.'},
   {q:'Listen to the announcement. Which statement is true?', audio:'Welcome to Riverside Leisure Centre. There are hardly any places left in our Saturday swimming lessons, but there are plenty of places in the Sunday group. Classes start at nine.', cache:true, opts:['There are lots of places on Saturday.','There are plenty of places on Sunday.','There are no lessons on Sunday.','Classes start at ten.'], ans:1, why:'<i lang="en">hardly any places</i> le samedi, mais <i lang="en">plenty of places</i> le dimanche. Les cours commencent à neuf heures.'},
   {q:'Dictation. Listen and write the warning about warming up.', dictee:'You’d better warm up properly, or you might hurt your back.', why:'<i lang="en">You’d better</i> + base verbale ; <i lang="en">warm up</i> = s’échauffer.'},
   {q:'Dictation. Listen and write the sentence about sleep at the office.', dictee:'Hardly anyone in my office gets enough sleep during the week.', why:'<i lang="en">hardly anyone</i> = presque personne, avec un verbe affirmatif (<i lang="en">gets</i>, au singulier).'},
 ]},
];
})();
