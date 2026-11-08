/* Déclic — examen de compétence : Food and drink (anglais A1) */
(()=>{
const E=s=>`<i lang="en">${s}</i>`;
// Variantes contractées ou non pour ’s et ’d (le moteur ne les développe pas), jamais en fin de phrase.
const CT=[['I would','I’d'],['it is','it’s'],['that is','that’s'],['there is','there’s'],['what is','what’s'],['where is','where’s']];
const V=(...a)=>{ const out=new Set(a.flat()); let grew=true;
  while(grew){ grew=false; for(const s of [...out]) for(const [f,c] of CT) for(const [x,y] of [[f,c],[c,f]]){
    const re=new RegExp('\\b'+x+'\\b(?![\\s.!?,]*$)','gi'); let m;
    while((m=re.exec(s))){ const r=m[0][0]===m[0][0].toUpperCase()?y[0].toUpperCase()+y.slice(1):y, t=s.slice(0,m.index)+r+s.slice(m.index+m[0].length); if(!out.has(t)){ out.add(t); grew=true; } } } }
  return [...out]; };
const X=(...parts)=>parts.reduce((acc,p)=>acc.flatMap(a=>[].concat(p).map(b=>a+b)),['']);

EXAMS['en-a1-food']=[
 {n:'Le vocabulaire des repas', r:'À manger et à boire', qs:[
   {q:'Dans un pub à Londres, tu veux des frites avec ton poisson. Que demandes-tu&nbsp;?', opts:['Fish and crisps','Fish and chips','Fish and potatoes','Fish and frites'], ans:1, why:`En anglais britannique, les frites sont des ${E('chips')} (${E('fries')} aux États-Unis). ${E('crisps')} = des chips en sachet.`},
   {q:'Écris en anglais : « du pain et du beurre ».', lab:'En anglais', txt:X(['','some '],'bread and ',['','some '],'butter'), why:`${E('bread and butter')} : pas d’article, ${E('some')} est facultatif. « du » ne se traduit pas mot à mot.`},
   {q:'Comment s’appelle en anglais le repas de midi&nbsp;? Écris le mot.', lab:'Le mot', txt:['lunch'], why:`${E('lunch')} = le déjeuner. Le matin : ${E('breakfast')} ; le soir : ${E('dinner')}.`},
   {q:`Complète : ${E('I have toast and ___ for breakfast.')} (de la confiture)`, opts:['marmalade','jam','gem','confit'], ans:1, why:`${E('jam')} = la confiture. ${E('marmalade')} est seulement la confiture d’agrumes, souvent d’orange.`},
   {q:'Écris en anglais : « un œuf et une pomme ».', lab:'En anglais', txt:['an egg and an apple'], why:`Devant un son de voyelle, ${E('a')} devient ${E('an')} : ${E('an egg')}, ${E('an apple')}.`},
 ]},
 {n:'Commander et payer poliment', r:'Au café : commander et payer', qs:[
   {q:'Laquelle de ces phrases est la plus naturelle et polie pour commander&nbsp;?', opts:['I want a coffee.','Give me a coffee.','Coffee for me now.','Can I have a coffee, please?'], ans:3, why:`${E('Can I have…, please?')} (ou ${E('I’d like…')}) est poli. ${E('I want…')} paraît brusque.`},
   {q:`Le serveur demande ${E('Eat in or take away?')} Tu veux emporter ta commande. Écris ta réponse.`, lab:'Ta réponse', txt:['Take away, please.','Take away.','Take away, thanks.','Take away, thank you.','To take away, please.','To take away.'], why:`${E('Take away, please.')} Pour manger sur place : ${E('Eat in, please.')}`},
   {q:'Écris en anglais : « L’addition, s’il vous plaît. »', lab:'En anglais', txt:['The bill, please.','Can I have the bill, please?','Could I have the bill, please?','Can we have the bill, please?','Could we have the bill, please?','The check, please.','Can I have the check, please?','Can we have the check, please?'], why:`${E('The bill, please.')} (${E('the check')} en anglais américain).`},
   {q:`Le serveur te tend ta monnaie et dit ${E('Here you are.')} Que veut-il dire&nbsp;?`, opts:['Vous êtes ici.','Vous voilà enfin.','Voilà (tenez).','Revenez bientôt.'], ans:2, why:`${E('Here you are')} accompagne le geste de donner quelque chose : « voilà, tenez ».`},
   {q:'Écris en anglais : « Je voudrais un verre d’eau plate, s’il vous plaît. »', lab:'Ta phrase', txt:V(X(['I would like','Can I have','Could I have'],' a glass of still water, please'),'A glass of still water, please.'), show:'I’d like a glass of still water, please.', why:`${E('I’d like a glass of still water, please.')} Plate = ${E('still')}, gazeuse = ${E('sparkling')}.`},
 ]},
 {n:'Dénombrables et indénombrables', r:'Dénombrables et indénombrables', qs:[
   {q:'Lequel de ces noms est indénombrable&nbsp;?', opts:['sandwich','egg','rice','apple'], ans:2, why:`${E('rice')} est une masse qu’on ne compte pas : pas de ${E('a')}, pas de pluriel. On dit ${E('two eggs, three apples')}, mais ${E('some rice')}.`},
   {q:'Quelle phrase est correcte&nbsp;?', opts:['The informations are on the website.','The information are on the website.','An information is on the website.','The information is on the website.'], ans:3, why:`${E('information')} est indénombrable en anglais : pas de ${E('an')}, pas de ${E('s')}, verbe au singulier.`},
   {q:'Écris en anglais : « deux bouteilles de lait ».', lab:'En anglais', txt:['two bottles of milk','2 bottles of milk'], why:`On compte le contenant : ${E('bottle')} prend le pluriel, ${E('milk')} reste au singulier.`},
   {q:`Corrige la phrase : ${E('I’d like some breads, please.')}`, lab:'Ta phrase', txt:V(X(['I would like','Can I have'],[' some bread',' a loaf of bread',' two loaves of bread',' some bread rolls'],[', please',''])), show:'I’d like some bread, please.', why:`${E('bread')} est indénombrable : ${E('I’d like some bread, please.')} Pour compter : ${E('a loaf of bread')} (une miche).`},
   {q:`Complète : ${E('Pasta ___ my favourite food.')}`, opts:['are','be','is','am'], ans:2, why:`${E('pasta')} est indénombrable, donc singulier : ${E('Pasta is…')} (alors qu’en français on dit « les pâtes sont »).`},
 ]},
 {n:'Choisir a/an, some ou any', r:'Choisir entre a/an, some et any', qs:[
   {q:`Complète avec ${E('some')} ou ${E('any')} : ${E('Are there ___ tomatoes in the fridge?')}`, lab:'Le mot', txt:['any'], why:`Une vraie question (on ne sait pas s’il y en a) : ${E('any')}.`},
   {q:`Complète avec ${E('some')} ou ${E('any')} : ${E('Can I have ___ water, please?')}`, lab:'Le mot', txt:['some'], why:`C’est une demande polie : on garde ${E('some')} même dans une question.`},
   {q:`Complète avec ${E('a')}, ${E('an')}, ${E('some')} ou ${E('any')} : ${E('There are ___ apples, but there isn’t ___ cheese.')} Écris les deux mots dans l’ordre, séparés par une virgule.`, lab:'Les deux mots', txt:['some, any'], why:`Pluriel à l’affirmatif → ${E('some')} ; indénombrable dans une négation → ${E('any')}.`},
   {q:`Écris à la forme négative : ${E('There is some sugar in my coffee.')}`, lab:'Ta phrase', txt:V('There isn’t any sugar in my coffee.','There is no sugar in my coffee.'), why:`${E('some')} devient ${E('any')} : ${E('There isn’t any sugar in my coffee.')}`},
   {q:'Quelle phrase contient une erreur&nbsp;?', opts:['Would you like some cake?','Is there any bread?','We haven’t got some eggs.','I’ve got some apples.'], ans:2, why:`Dans une négation, on emploie ${E('any')} : ${E('We haven’t got any eggs.')}`},
   {q:'Au magasin, demande en anglais : « Vous avez du fromage ? »', lab:'Ta question', txt:['Have you got any cheese?','Do you have any cheese?','Have you got cheese?','Do you have cheese?'], why:`${E('Have you got any cheese?')} ou ${E('Do you have any cheese?')} : question → ${E('any')}.`},
 ]},
 {n:'How much, How many et les prix', r:'How much, How many et les prix', qs:[
   {q:`Complète : ${E('How ___ eggs do you need?')}`, lab:'Le mot', txt:['many'], why:`${E('eggs')} est un pluriel dénombrable : ${E('How many')}.`},
   {q:`Complète : ${E('How ___ money have you got?')}`, lab:'Le mot', txt:['much'], why:`${E('money')} est indénombrable : ${E('How much money')}.`},
   {q:'Quelle question est correcte pour demander le prix d’un sandwich&nbsp;?', opts:['How much costs the sandwich?','How much is the sandwich?','How many is the sandwich?','How much the sandwich costs?'], ans:1, why:`${E('How much is the sandwich?')} (ou ${E('How much does the sandwich cost?')}). Jamais d’inversion avec ${E('costs')}.`},
   {q:'Comment écrit-on « trois livres cinquante » en anglais&nbsp;?', opts:['3,50£','3.50 £','£3.50','£3,50'], ans:2, why:'Le symbole se met devant et on utilise un point : £3.50, ' + E('three pounds fifty') + '.'},
   {q:'Remets la question dans l’ordre.', ordre:['How','many','apples','do','you','want?'], why:`${E('How many apples do you want?')} : ${E('How many')} + nom pluriel, puis la question au présent simple (${E('do you want')}).`},
 ]},
 {n:'Comprendre à l’oral', r:'Au café', qs:[
   {q:'Écoute. Qu’est-ce que la cliente ne peut pas avoir&nbsp;?', audio:[['Waiter','Hello. What can I get you?'],['Customer','A hot chocolate, please. And have you got any croissants?'],['Waiter','Sorry, we haven’t got any croissants left. We’ve got some muffins.'],['Customer','OK, a muffin, then.']], cache:true, opts:['Un chocolat chaud','Un croissant','Un muffin','Un thé'], ans:1, why:`${E('We haven’t got any croissants left')} : il n’y a plus de croissants. Elle prend un muffin.`},
   {q:'Écoute. Combien coûte la commande&nbsp;?', audio:'That’s twelve pounds thirty, please.', cache:true, opts:['£20.30','£12.30','£12.13','£2.30'], ans:1, why:`${E('Twelve pounds thirty')} = £12.30. ${E('thirty')} (30) a l’accent au début, ${E('thirteen')} (13) à la fin.`},
   {q:'Écoute. Combien coûtent les fraises&nbsp;?', audio:[['Customer','Excuse me, how much are the strawberries?'],['Seller','They’re four pounds fifty a box.'],['Customer','Two boxes, please.']], cache:true, opts:['£4.50 la barquette','£4.15 la barquette','£14.50 les deux barquettes','£5.40 la barquette'], ans:0, why:`${E('Four pounds fifty a box')} : £4.50 la barquette. Pour deux barquettes, la cliente paiera £9.`},
   {q:'Dictée. Écoute et écris la phrase exacte.', dictee:'Is there any bread? There are some eggs in the fridge.', why:`Question → ${E('any')} ; affirmation au pluriel → ${E('there are some')}.`},
 ]},
];
})();
