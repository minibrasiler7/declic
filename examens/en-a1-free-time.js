/* Déclic — examen de compétence : Free time (anglais A1) */
(()=>{
const E=s=>`<i lang="en">${s}</i>`;
const X=(...parts)=>parts.reduce((acc,p)=>acc.flatMap(a=>[].concat(p).map(b=>a+b)),['']);

EXAMS['en-a1-free-time']=[
 {n:'Play, go ou do', r:'Play, go ou do ?', qs:[
   {q:`Complète : ${E('My cousins ___ judo on Wednesdays.')}`, opts:['play','go','do','make'], ans:2, why:`Le judo se pratique sans balle ni jeu : ${E('do judo')}.`},
   {q:'Comment dit-on « Je fais du sport tous les jours » en anglais britannique&nbsp;?', opts:['I make sport every day.','I do sport every day.','I go sport every day.','I sport every day.'], ans:1, why:`« Faire du sport » = ${E('do sport')} (en américain : ${E('play sports')}). Jamais ${E('make')}.`},
   {q:'Écris en anglais : « Nous allons courir le samedi. »', lab:'Ta phrase', txt:[...X('We go running on ',['Saturdays','Saturday'],'.'),...X('On ',['Saturdays','Saturday'],[', ',' '],'we go running.')], show:'We go running on Saturdays.', why:`Activité en ${E('-ing')} : ${E('go running')}. « Le samedi » (chaque samedi) = ${E('on Saturdays')}.`},
   {q:`Complète avec ${E('play')}, ${E('go')} ou ${E('do')} à la bonne forme : ${E('My dad ___ the drums in a band.')}`, lab:'Le mot', txt:['plays'], why:`Un instrument : ${E('play the drums')}, avec le ${E('-s')} de la 3e personne : ${E('My dad plays')}.`},
   {q:'Écris en anglais : « Il fait du vélo le dimanche. » (en balade)', lab:'Ta phrase', txt:X('He ',['goes cycling','cycles','rides his bike','rides a bike'],' on ',['Sundays','Sunday'],'.'), show:'He goes cycling on Sundays.', why:`${E('He goes cycling on Sundays.')} (ou ${E('He rides his bike…')}). Le ${E('-es')} de ${E('goes')} : 3e personne.`},
 ]},
 {n:'Like, love, hate + -ing', r:'Like, love, hate + -ing', qs:[
   {q:'Quelle phrase est correcte&nbsp;?', opts:['I like swim.','I’m like swimming.','I like the swimming.','I like swimming.'], ans:3, why:`Après ${E('like')}, le verbe se met en ${E('-ing')}, sans article : ${E('I like swimming.')}`},
   {q:'Laquelle de ces phrases veut dire « J’aime le thé » (en général)&nbsp;?', opts:['I’d like tea.','I like tea.','I’d like a tea.','I would like tea.'], ans:1, why:`${E('I like tea')} = j’aime le thé. ${E('I’d like')} (= ${E('I would like')}) = je voudrais.`},
   {q:'Écris en anglais : « Elle déteste faire la cuisine. »', lab:'Ta phrase', txt:X('She hates ',['cooking','to cook'],'.'), why:`${E('She hates cooking.')} Le ${E('-s')} va sur ${E('hates')}, le ${E('-ing')} sur ${E('cook')}.`},
   {q:`Complète avec le verbe entre parenthèses : ${E('I don’t mind ___ the dishes.')} (${E('wash')})`, lab:'Le mot', txt:['washing'], why:`Après ${E('don’t mind')}, seulement ${E('-ing')} : ${E('washing')}.`},
   {q:`Ton ami demande : ${E('Do you like reading?')} Tu aimes lire. Écris la réponse courte.`, lab:'Ta réponse', txt:['Yes, I do.','Yes, I do. I love it.','Yes, I do. I like it.','Yes, I do, I love it.'], why:`Question avec ${E('do')} → réponse courte ${E('Yes, I do.')} (et non « Yes, I like »).`},
 ]},
 {n:'L’orthographe du -ing', r:'Former le -ing et parler de ses goûts', qs:[
   {q:`Écris la forme en ${E('-ing')} de ${E('shop')}.`, lab:'Le mot', txt:['shopping'], why:`${E('shop')} : consonne + voyelle + consonne, on double le p : ${E('shopping')}.`},
   {q:`Écris la forme en ${E('-ing')} de ${E('ride')}.`, lab:'Le mot', txt:['riding'], why:`${E('ride')} finit par un e muet, qu’on enlève : ${E('riding')}.`},
   {q:`Quelle forme en ${E('-ing')} est mal écrite&nbsp;?`, opts:['playing','swimming','danceing','running'], ans:2, why:`Le e muet disparaît : ${E('dancing')}. ${E('playing')} ne double pas le y ; ${E('swimming')} et ${E('running')} doublent la consonne.`},
   {q:'Écris en anglais : « Mon père adore prendre des photos. »', lab:'Ta phrase', txt:X('My ',['dad','father'],' loves ',['taking photos','taking pictures','to take photos','to take pictures'],'.'), show:'My dad loves taking photos.', why:`${E('loves taking photos')} : ${E('-s')} sur ${E('loves')}, et ${E('take')} perd son e : ${E('taking')}.`},
 ]},
 {n:'Can et can’t', r:'Can et can’t : ce qu’on sait faire', qs:[
   {q:'Comment dit-on correctement « Elle sait conduire »&nbsp;?', opts:['She can to drive.','She cans drive.','She can drive.','She can drives.'], ans:2, why:`${E('can')} + verbe de base, sans ${E('to')} ni ${E('-s')} : ${E('She can drive.')}`},
   {q:'Comment dit-on « Je sais nager »&nbsp;?', opts:['I know swim.','I know to swim.','I can swimming.','I can swim.'], ans:3, why:`« Savoir faire » = ${E('can')} : ${E('I can swim.')} ${E('know')} ne s’emploie pas ainsi.`},
   {q:`Écris à la forme négative : ${E('My grandmother can use a computer.')}`, lab:'Ta phrase', txt:['My grandmother can’t use a computer.'], why:`${E('can’t')} (ou ${E('cannot')}, en un mot) + verbe de base : ${E('My grandmother can’t use a computer.')}`},
   {q:`Transforme en question : ${E('They can speak German.')}`, lab:'Ta question', txt:['Can they speak German?'], why:`On inverse ${E('can')} et le sujet, sans ${E('do')} : ${E('Can they speak German?')}`},
   {q:`On te demande : ${E('Can you ski?')} Oui. Écris la réponse courte.`, lab:'Ta réponse', txt:['Yes, I can.'], why:`${E('Yes, I can.')} On reprend ${E('can')} sans le verbe.`},
   {q:'Remets la question dans l’ordre.', ordre:['Can','your','sister','play','the','piano?'], why:`${E('Can your sister play the piano?')} : ${E('can')} en tête, puis le sujet, puis le verbe de base.`},
 ]},
 {n:'Les pronoms compléments', r:'Les pronoms compléments : me, him, her…', qs:[
   {q:`Complète avec un pronom : ${E('I can’t find my keys. Can you see ___?')}`, lab:'Le mot', txt:['them'], why:`${E('my keys')} est un pluriel : pronom complément ${E('them')}.`},
   {q:`Complète avec un pronom : ${E('Tom is my neighbour. I often go running with ___.')}`, lab:'Le mot', txt:['him'], why:`Tom = ${E('he')} ; après ${E('with')}, pronom complément : ${E('him')}.`},
   {q:'Comment dit-on « Viens avec nous ! »&nbsp;?', opts:['Come with we!','Come with our!','Come with ours!','Come with us!'], ans:3, why:`Après une préposition : pronom complément. ${E('we → us')}.`},
   {q:`${E('Do you like my new jacket?')} Quelle réponse est correcte&nbsp;?`, opts:['Yes, I like.','Yes, I it like.','Yes, I like it.','Yes, I like her.'], ans:2, why:`On ne peut pas omettre le pronom, et il se place après le verbe : ${E('Yes, I like it.')} Une veste = ${E('it')}.`},
   {q:'Écris en anglais : « Paul ? Elle l’aime beaucoup. »', lab:'Ta phrase', txt:X(['','Paul? '],'She ',['likes','loves'],' him ',['a lot','very much'],'.'), show:'Paul? She likes him a lot.', why:`« le » (Paul) = ${E('him')}, placé après le verbe : ${E('She likes him a lot.')}`},
 ]},
 {n:'Comprendre à l’oral', r:'Le temps libre de Sam et Maya', qs:[
   {q:'Écoute bien la différence entre <i lang="en">can</i> et <i lang="en">can’t</i>. Que dit la personne&nbsp;?', audio:'My sister can’t play the piano.', cache:true, opts:['Sa sœur sait jouer du piano.','Sa sœur ne sait pas jouer du piano.'], ans:1, why:`${E('can’t')} est accentué, avec une voyelle longue (« caant ») : ${E('My sister can’t play the piano.')}`},
   {q:'Écoute. Que dit la personne&nbsp;?', audio:'My brother can ride a horse.', cache:true, opts:['Son frère sait monter à cheval.','Son frère ne sait pas monter à cheval.'], ans:0, why:`${E('can')} est faible (« ken ») et c’est le verbe ${E('ride')} qui est accentué : ${E('He can ride a horse.')}`},
   {q:'Écoute. Que fait Ben le dimanche&nbsp;?', audio:[['Ana','What do you do at the weekend, Ben?'],['Ben','On Saturdays, I play basketball with my brothers. On Sundays, I go cycling with my dad.'],['Ana','Do you like reading?'],['Ben','Not really. I prefer video games!']], cache:true, opts:['Il joue au basket avec ses frères.','Il fait du vélo avec son père.','Il lit.','Il joue aux jeux vidéo avec son père.'], ans:1, why:`${E('On Sundays, I go cycling with my dad.')} Le basket, c’est le samedi.`},
   {q:'Écoute. Qu’est-ce que Kate déteste&nbsp;?', audio:'Kate loves dancing, but she hates going to the gym.', cache:true, opts:['Danser','Aller à la salle de sport','Aller au cinéma','Nager'], ans:1, why:`${E('She hates going to the gym')} : elle déteste aller à la salle de sport. Elle adore danser.`},
   {q:'Dictée. Écoute et écris les phrases exactes.', dictee:'Can you play the guitar? No, I can’t, but I can sing.', why:`Question avec ${E('can')} en tête, réponse courte ${E('No, I can’t')}, puis ${E('can')} + verbe de base.`},
 ]},
];
})();
