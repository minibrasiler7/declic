/* Déclic — examen de compétence : Around town (anglais A1) */
(()=>{
const E=s=>`<i lang="en">${s}</i>`;
// Variantes contractées ou non pour ’s (le moteur ne les développe pas), jamais en fin de phrase.
const CT=[['it is','it’s'],['that is','that’s'],['there is','there’s'],['where is','where’s']];
const V=(...a)=>{ const out=new Set(a.flat()); let grew=true;
  while(grew){ grew=false; for(const s of [...out]) for(const [f,c] of CT) for(const [x,y] of [[f,c],[c,f]]){
    const re=new RegExp('\\b'+x+'\\b(?![\\s.!?,]*$)','gi'); let m;
    while((m=re.exec(s))){ const r=m[0][0]===m[0][0].toUpperCase()?y[0].toUpperCase()+y.slice(1):y, t=s.slice(0,m.index)+r+s.slice(m.index+m[0].length); if(!out.has(t)){ out.add(t); grew=true; } } } }
  return [...out]; };
const X=(...parts)=>parts.reduce((acc,p)=>acc.flatMap(a=>[].concat(p).map(b=>a+b)),['']);
// Le même plan que dans l’unité
const plan=()=>{ const P=plane({x:[0,10],y:[0,8],w:320,grid:false,axes:false});
  [[5,0,5,7],[0,7,10,7],[0,4.5,10,4.5],[0,2,10,2]].forEach(s=>P.seg(...s,{c:'var(--line)',w:14}));
  const b=(x,y,w,h,l)=>{ P.rect(x,y,w,h,{fill:'var(--other)',fo:.15,c:'var(--other)',w:1.5}); P.text(x+w/2,y+h/2,l,{a:'middle',s:10,dy:4}); };
  P.rect(0.3,7.45,9.4,0.45,{fill:'var(--ok)',fo:.25,c:null}); P.text(5,7.67,'Park',{a:'middle',s:10,dy:4});
  b(2.9,0.55,1.6,1.1,'Bank'); b(5.5,0.55,2.1,1.1,'Post office');
  b(0.3,2.5,2.3,1.5,'Supermarket'); b(3,2.5,1.5,1.5,'Café'); b(5.5,2.5,1.8,1.5,'Chemist’s'); b(7.6,2.5,2.1,1.5,'Bakery');
  b(0.3,5,2.3,1.5,'Museum'); b(2.9,5,1.6,1.5,'Library'); b(5.5,5,1.7,1.5,'Cinema'); b(7.5,5,2.2,1.5,'Hotel');
  [['Mill Lane',2],['Church Street',4.5],['Park Road',7]].forEach(([l,y])=>P.text(9.8,y,l,{a:'end',s:9,dy:3,c:'var(--muted)'}));
  P.dot(5,4.5,{c:'var(--bad)',r:4});
  P.dot(5,0.25,{c:'var(--spark)',r:5}); P.text(4.75,0.25,'You are here',{a:'end',s:10,dy:4});
  return P.svg(); };

EXAMS['en-a1-town']=[
 {n:'Les lieux de la ville', r:'Les lieux de la ville', qs:[
   {q:'Tu veux emprunter un livre gratuitement. Où vas-tu&nbsp;?', opts:['to a bookshop','to a library','to a bakery','to a chemist’s'], ans:1, why:`${E('library')} = bibliothèque (faux ami). Une librairie, où l’on achète des livres, est un ${E('bookshop')}.`},
   {q:'Écris en anglais : « un arrêt de bus ».', lab:'En anglais', txt:['a bus stop','bus stop'], why:`${E('a bus stop')} : le mot ${E('bus')} sert d’adjectif, devant ${E('stop')}.`},
   {q:'Tu veux acheter du pain. Écris en anglais le nom du magasin, avec l’article.', lab:'Le lieu', txt:['a bakery','bakery','a baker’s','baker’s','the bakery','the baker’s'], why:`${E('a bakery')} (on dit aussi ${E('the baker’s')}, comme ${E('the chemist’s')}).`},
   {q:'Ta voiture est garée au parking. Comment dit-on « le parking » en anglais britannique&nbsp;?', opts:['the parking','the park','the car park','the garage'], ans:2, why:`${E('the car park')} (${E('parking lot')} en américain). ${E('parking')} seul = le stationnement, et ${E('a park')} = un parc.`},
   {q:'Écris en anglais : « Excusez-moi, où est la gare, s’il vous plaît ? »', lab:'Ta question', txt:V(X('Excuse me',[', ','. ',' '],'where is the ',['station','train station','railway station'],[', please?','?'])), show:'Excuse me, where’s the station, please?', why:`${E('Excuse me, where’s the station, please?')} (${E('where’s')} = ${E('where is')}).`},
 ]},
 {n:'Demander et comprendre le chemin', r:'Demander et indiquer le chemin', qs:[
   {q:'Écris en anglais : « Comment je vais au musée ? »', lab:'Ta question', txt:['How do I get to the museum?','How can I get to the museum?'], why:`${E('How do I get to the museum?')} : ${E('get to')} = arriver à, se rendre à.`},
   {q:`On te dit : ${E('It’s ten minutes’ walk.')} Qu’est-ce que ça veut dire&nbsp;?`, opts:['C’est à dix minutes en voiture.','Marche dix minutes, puis tourne.','C’est à dix minutes à pied.','C’est à dix mètres.'], ans:2, why:`${E('walk')} = marche : ${E('ten minutes’ walk')} = dix minutes à pied.`},
   {q:'Écris en anglais : « C’est loin ? »', lab:'Ta question', txt:['Is it far?','Is it far from here?'], why:`${E('Is it far?')} Réponses possibles : ${E('No, it’s very near.')} / ${E('Yes, it’s quite far.')}`},
   {q:`Que veut dire ${E('You can’t miss it!')}&nbsp;?`, opts:['Vous ne pouvez pas y aller.','Vous ne le trouverez pas.','Vous ne pouvez pas le manquer.','Il ne faut surtout pas y aller.'], ans:2, why:`${E('miss')} = manquer, rater : ${E('You can’t miss it!')} = impossible de le rater, c’est très visible.`},
   {q:'Écris en anglais : « Passez devant l’église. »', lab:'Ta phrase', txt:['Go past the church.','Walk past the church.'], why:`« passer devant » = ${E('go past')} : ${E('Go past the church.')}`},
 ]},
 {n:'Situer un lieu', r:'Situer un lieu : opposite, between…', qs:[
   {q:`Le café est de l’autre côté de la rue, face à l’hôtel. Complète : ${E('The café is ___ the hotel.')}`, opts:['in front of','next of','opposite','behind'], ans:2, why:`« en face de » = ${E('opposite')}. ${E('in front of')} = devant (du même côté).`},
   {q:'Écris en anglais : « Le parking est derrière le supermarché. »', lab:'Ta phrase', txt:['The car park is behind the supermarket.','The parking lot is behind the supermarket.'], why:`${E('behind')} = derrière ; ${E('car park')} = parking.`},
   {q:`Complète : ${E('The bank is ___ the corner of King Street and Mill Road.')}`, lab:'Le mot', txt:['on','at'], why:`${E('on the corner of')} (on entend aussi ${E('at the corner of')}).`},
   {q:'Laquelle de ces phrases veut dire « L’hôtel est près de la gare »&nbsp;?', opts:['The hotel is near of the station.','The hotel is next of the station.','The hotel is near the station.','The hotel is near to of the station.'], ans:2, why:`${E('near')} s’emploie sans ${E('of')} : ${E('near the station')}.`},
   {q:'Écris en anglais : « La poste est entre la banque et la boulangerie. »', lab:'Ta phrase', txt:['The post office is between the bank and the bakery.','The post office is between the bank and the baker’s.'], why:`${E('between … and …')}, avec un seul ${E('between')}.`},
 ]},
 {n:'L’impératif', r:'L’impératif : donner une indication', qs:[
   {q:'Laquelle de ces indications est correcte&nbsp;?', opts:['To turn left at the bank.','Turning left at the bank.','Turn left at the bank.','You to turn left at the bank.'], ans:2, why:`Impératif = verbe de base, sans ${E('to')} ni sujet : ${E('Turn left at the bank.')}`},
   {q:`Écris à l’impératif négatif : ${E('Take the bus.')}`, lab:'Ta phrase', txt:['Don’t take the bus.'], why:`${E('Don’t')} + verbe de base : ${E('Don’t take the bus.')}`},
   {q:'Écris en anglais : « Traversez le pont, puis tournez à gauche. »', lab:'Ta phrase', txt:X('Cross the bridge',[', then ',' then ',', and then ',' and then ',' and '],'turn left.'), why:`Deux impératifs reliés par ${E('then')} : ${E('Cross the bridge, then turn left.')}`},
   {q:'Remets l’indication dans l’ordre.', ordre:['Go','past','the','school','and','turn','right.'], why:`${E('Go past the school and turn right.')} : chaque étape commence par un verbe à l’impératif.`},
   {q:'Quelle phrase contient une erreur&nbsp;?', opts:['Don’t cross here.','Go straight on.','Take the first right.','No turn left here.'], ans:3, why:`L’impératif négatif se forme avec ${E('Don’t')} : ${E('Don’t turn left here.')}`},
 ]},
 {n:'Suivre un trajet sur un plan', r:'Indiquer un chemin étape par étape', qs:[
   {q:`Sur le plan, tu es au point ${E('You are here')}. Tu suis l’indication : ${E('Go straight on and take the first street on the left. It’s on your right, next to the café.')} Où arrives-tu&nbsp;?`, fig:plan(), opts:['Supermarket','Bank','Café','Museum'], ans:0, why:`La première rue à gauche est Mill Lane. En marchant vers la gauche du plan, ta droite est le côté du haut : juste après le café, c’est le supermarché.`},
   {q:'Sur le plan, quel lieu est en face de la bibliothèque (Library)&nbsp;?', fig:plan(), opts:['Museum','Hotel','Cinema','Café'], ans:2, why:`La bibliothèque et le cinéma se font face, de chaque côté de High Street : ${E('The cinema is opposite the library.')}`},
   {q:`Sur le plan, tu pars du point ${E('You are here')} et tu montes High Street. Complète : ${E('The bank is on your ___.')}`, fig:plan(), lab:'Le mot', txt:['left'], why:`En montant High Street, la banque est du côté gauche : ${E('on your left')}. La poste est ${E('on your right')}.`},
   {q:`Sur le plan, complète : ${E('The park is at the ___ of High Street.')}`, fig:plan(), lab:'Le mot', txt:['end'], why:`${E('at the end of High Street')} : au bout de la rue, de l’autre côté de Park Road.`},
 ]},
 {n:'Proposer avec Let’s', r:'Let’s… : proposer une sortie', qs:[
   {q:'Comment propose-t-on « Allons nager ! »&nbsp;?', opts:['Let’s to go swimming!','Let’s going swimming!','Lets we go swimming!','Let’s go swimming!'], ans:3, why:`${E('Let’s')} + verbe de base : ${E('Let’s go swimming!')}`},
   {q:'Écris en anglais : « Ne prenons pas la voiture. »', lab:'Ta phrase', txt:['Let’s not take the car.','Let’s not go by car.'], why:`Négatif : ${E('Let’s not')} + verbe de base.`},
   {q:`Ton ami propose : ${E('Let’s meet at the café at six.')} Réponds « Bonne idée ! »`, lab:'Ta réponse', txt:V(['Good idea!','Great idea!','That is a good idea!','That is a great idea!','OK, good idea!']), why:`${E('Good idea!')} (ou ${E('OK, why not?')}, ${E('Great!')}).`},
   {q:'Écris en anglais : « Retrouvons-nous devant le cinéma à sept heures. »', lab:'Ta phrase', txt:X('Let’s meet in front of the cinema at ',['seven','7','seven o’clock','7 o’clock','7 pm','7pm','seven pm'],['.','!']), show:'Let’s meet in front of the cinema at seven.', why:`${E('Let’s meet')} + lieu (${E('in front of the cinema')}, devant) + heure (${E('at seven')}).`},
 ]},
 {n:'Comprendre à l’oral', r:'Où est la pharmacie ?', qs:[
   {q:'Écoute. Comment va-t-on au cinéma&nbsp;?', audio:[['Man','Excuse me, how do I get to the cinema?'],['Woman','Go straight on and take the second street on the right. The cinema is on your left, next to a big hotel.']], cache:true, opts:['Tout droit, la deuxième rue à droite ; le cinéma est à gauche, à côté d’un hôtel.','Tout droit, la deuxième rue à gauche ; le cinéma est à droite.','La première rue à droite ; le cinéma est en face d’un hôtel.','Tout droit jusqu’à l’hôtel ; le cinéma est derrière.'], ans:0, why:`${E('Take the second street on the right. The cinema is on your left, next to a big hotel.')}`},
   {q:'Écoute. Où est l’arrêt de bus&nbsp;?', audio:'The bus stop is in front of the library.', cache:true, opts:['En face de la bibliothèque','Derrière la bibliothèque','Devant la bibliothèque','Devant la librairie'], ans:2, why:`${E('in front of')} = devant ; ${E('library')} = bibliothèque.`},
   {q:'Écoute. C’est à combien de minutes à pied&nbsp;?', audio:'It’s about three minutes’ walk from here.', cache:true, opts:['3 minutes','30 minutes','13 minutes','Il ne le dit pas.'], ans:0, why:`${E('three')} (3), avec un ${E('th')} sourd. 30 = ${E('thirty')}, 13 = ${E('thirteen')}.`},
   {q:'Dictée. Écoute et écris les phrases exactes.', dictee:'Excuse me, is there a bank near here? Yes, the bank is opposite the park.', why:`${E('Is there a … near here?')} pour demander ; ${E('opposite')} = en face de.`},
 ]},
];
})();
