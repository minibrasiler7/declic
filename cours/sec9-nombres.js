/* Déclic — Maths au secondaire, 9e année : divisibilité, calcul malin, nombres relatifs */
(()=>{
/* ---------- helpers locaux ---------- */
const sdx='<div class="blk" data-t="Le savais-tu ?">';
// rangée de cases avec des chiffres ; les hi dernières sont mises en couleur
function digits(s,hi=0,col='var(--spark)'){
  const n=s.length, P=plane({x:[0,n+1],y:[0,1.4],h:80,grid:false,axes:false});
  [...s].forEach((ch,i)=>{ const on=i>=n-hi;
    P.rect(.55+i,.2,.9,1,{fill:on?col:'var(--line)',fo:on?.35:.25,c:'var(--ink)',w:1.5});
    P.text(1+i,.7,ch,{a:'middle',dy:10,s:28}); });
  return P.svg();
}
// n carrés rangés en rangées de d : les carrés de la rangée incomplète sont en rouge
function rangees(n,d){
  const rows=Math.ceil(n/d), full=Math.floor(n/d), s=Math.min(12/d,8.4/rows);
  const P=plane({x:[0,13],y:[0,9],grid:false,axes:false});
  for(let i=0;i<n;i++){ const r=Math.floor(i/d), c=i%d;
    P.rect(.5+c*s,8.7-(r+1)*s,s*.88,s*.88,{fill:r<full?'var(--math)':'var(--bad)',fo:.55,c:'var(--ink)',w:1}); }
  return P.svg();
}
// crible d'Ératosthène de 1 à 100 après k étapes (multiples de 2, 3, 5, 7)
const PR=[2,3,5,7];
function crible(k){
  const P=plane({x:[0,10],y:[0,10],grid:false,axes:false});
  for(let n=1;n<=100;n++){ const i=(n-1)%10, j=Math.floor((n-1)/10);
    let st=n===1?'out':'in'; for(let t=0;t<k&&st==='in';t++) if(n%PR[t]===0&&n!==PR[t]) st='out';
    const chosen=PR.slice(0,k).includes(n)||(k===4&&st==='in');
    P.rect(i+.05,10-j-.95,.9,.9,{fill:st==='out'?'var(--muted)':chosen?'var(--ok)':'var(--surface)',fo:st==='out'?.18:chosen?.45:.1,c:'var(--line)',w:1});
    P.text(i+.5,10-j-.5,String(n),{a:'middle',dy:4,s:11,c:st==='out'?'var(--muted)':'var(--ink)'}); }
  return P.svg();
}
const restants=k=>{ let r=0; for(let n=2;n<=100;n++) if(!PR.slice(0,k).some(p=>n%p===0&&n!==p)) r++; return r; };
// sol de 18 × 12 recouvert de dalles carrées de côté c
function dalles(c){
  const L=18, H=12, P=plane({x:[-.5,19.5],y:[-.5,13.5],grid:false,axes:false});
  const nx=Math.ceil(L/c), ny=Math.ceil(H/c);
  for(let i=0;i<nx;i++) for(let j=0;j<ny;j++){ const over=(i+1)*c>L+1e-9||(j+1)*c>H+1e-9;
    P.rect(i*c,j*c,c,c,{fill:over?'var(--bad)':(i+j)%2?'var(--math)':'var(--accent)',fo:over?.2:.35,c:'var(--ink)',w:1}); }
  P.rect(0,0,L,H,{c:'var(--ink)',w:3.5});
  P.text(9,12,'18 dm',{a:'middle',dy:-6,s:12}).text(0,6,'12 dm',{dx:6,dy:4,s:12});
  return P.svg();
}
const pg=(a,b)=>b?pg(b,a%b):a;
// tableau des 4 opérations et du nom de chaque nombre
const vocabFig=(()=>{ const P=plane({x:[0,10],y:[0,8.6],grid:false,axes:false});
  [['12','+','5','17','terme','terme','somme'],['12','−','5','7','terme','terme','différence'],['12','×','5','60','facteur','facteur','produit'],['12',':','4','3','dividende','diviseur','quotient']].forEach((r,i)=>{ const y=7.6-2.1*i;
    P.text(1.6,y,r[0],{a:'middle',s:20}).text(3.2,y,r[1],{a:'middle',s:20}).text(4.8,y,r[2],{a:'middle',s:20}).text(6.4,y,'=',{a:'middle',s:20}).text(8.2,y,r[3],{a:'middle',s:20,c:'var(--accent)'});
    P.text(1.6,y-.75,r[4],{a:'middle',s:11,c:'var(--muted)'}).text(4.8,y-.75,r[5],{a:'middle',s:11,c:'var(--muted)'}).text(8.2,y-.75,r[6],{a:'middle',s:12,c:'var(--accent)'}); });
  return P.svg(); })();
// droite graduée de 0 à 5 (dixièmes) avec une loupe sur les centièmes
function deci(u,c){
  const a0=Math.round(u*10)/10, x=Math.round(a0*100+c)/100, y2=-2.1;
  const P=plane({x:[-.4,5.4],y:[-2.9,1],h:170,grid:false,axes:false});
  P.seg(0,0,5,0,{c:'var(--muted)',w:1.5}).seg(0,y2,5,y2,{c:'var(--muted)',w:1.5});
  for(let k=0;k<=50;k++){ const t=k/10, big=k%10===0; P.seg(t,big?-.25:-.12,t,big?.25:.12,{c:'var(--muted)',w:big?1.5:1}); if(big) P.text(t,0,String(k/10),{a:'middle',dy:24,s:11,c:'var(--muted)'}); }
  for(let k=0;k<=10;k++) P.seg(k*.5,y2-.15,k*.5,y2+.15,{c:'var(--muted)',w:1});
  P.seg(a0,0,0,y2,{c:'var(--muted)',w:1,dash:true}).seg(a0+.1,0,5,y2,{c:'var(--muted)',w:1,dash:true});
  P.text(0,y2,fmt(a0),{a:'middle',dy:24,s:11,c:'var(--muted)'}).text(5,y2,fmt(a0+.1),{a:'middle',dy:24,s:11,c:'var(--muted)'});
  P.dot(x,0,{c:'var(--spark)'}).dot(c*.5,y2,{c:'var(--spark)',l:fmt(x)});
  return P.svg();
}
// rectangle a × (b + c) découpé en deux morceaux
function distri(a,b,c){
  const P=plane({x:[-1.2,17],y:[-.6,8.6],grid:false,axes:false});
  P.rect(0,0,b,a,{fill:'var(--math)',fo:.35,c:'var(--ink)',w:2}).rect(b,0,c,a,{fill:'var(--spark)',fo:.35,c:'var(--ink)',w:2});
  for(let i=1;i<b+c;i++) if(i!==b) P.seg(i,0,i,a,{c:'var(--line)',w:1});
  for(let j=1;j<a;j++) P.seg(0,j,b+c,j,{c:'var(--line)',w:1});
  P.text(b/2,a,String(b),{a:'middle',dy:-6,c:'var(--math)'}).text(b+c/2,a,String(c),{a:'middle',dy:-6,c:'var(--spark)'}).text(0,a/2,String(a),{a:'end',dx:-5,dy:5});
  P.text(b/2,a/2,String(a*b),{a:'middle',dy:5,s:14}).text(b+c/2,a/2,String(a*c),{a:'middle',dy:5,s:14});
  return P.svg();
}
// cinq lampes qui écrivent n en binaire
function lampes(n){
  const P=plane({x:[0,10],y:[-1,2],grid:false,axes:false});
  [16,8,4,2,1].forEach((p,i)=>{ const on=(n&p)>0;
    P.circ(1+2*i,1,.75,{fill:on?'var(--spark)':'var(--line)',fo:on?.8:.3,c:'var(--ink)',w:1.5});
    P.text(1+2*i,1,on?'1':'0',{a:'middle',dy:6,s:16}).text(1+2*i,-.3,String(p),{a:'middle',s:12,c:'var(--muted)'}); });
  return P.svg();
}

// droite graduée de lo à hi (entiers), étiquettes tous les lab
function nl(lo,hi,o={}){
  const pad=(hi-lo)*.04+.3, P=plane({x:[lo-pad,hi+pad],y:[o.y0??-1.2,o.y1??1.6],h:o.h||100,grid:false,axes:false});
  P.seg(lo-pad*.6,0,hi+pad*.6,0,{c:'var(--muted)',w:1.5});
  const lab=o.lab||1;
  for(let k=lo;k<=hi;k++){ P.seg(k,-.12,k,.12,{c:k===0?'var(--ink)':'var(--muted)',w:k===0?2:1});
    if(k%lab===0) P.text(k,0,fmt(k),{a:'middle',dy:20,s:10,c:k===0?'var(--ink)':'var(--muted)'}); }
  return P;
}
const par=x=>x<0?`(${fmt(x)})`:fmt(x);
const sg=x=>x>0?'+'+x:fmt(x);
// thermomètre et ascenseur
const thermoFig=(()=>{ const P=plane({x:[-8,8],y:[-11.5,11.5],h:270,grid:false,axes:false});
  P.rect(-5.4,-10,1.2,20,{c:'var(--ink)',w:1.5}).rect(-5.4,-10,1.2,6,{fill:'var(--bad)',fo:.7,c:null});
  for(let t=-10;t<=10;t+=2){ P.seg(-4.2,t,-3.6,t,{c:t===0?'var(--ink)':'var(--muted)',w:t===0?2:1}); P.text(-3.3,t,fmt(t)+' °C',{dy:4,s:10,c:t===0?'var(--ink)':'var(--muted)'}); }
  P.text(-4.8,-4,'−4 °C',{a:'end',dx:-12,dy:4,s:12,c:'var(--bad)'});
  for(let e=-2;e<=3;e++){ const y=e*3; P.rect(2,y-1.3,4,2.6,{fill:e<0?'var(--muted)':'var(--math)',fo:e===0?.45:.2,c:'var(--ink)',w:1}); P.text(4,y,e===0?'rez : 0':sg(e),{a:'middle',dy:5,s:12}); }
  P.text(4,10.2,'ascenseur',{a:'middle',s:11,c:'var(--muted)'}).text(-1.5,11,'thermomètre',{a:'middle',s:11,c:'var(--muted)'});
  return P.svg(); })();
// opposé de a sur la droite
function oppFig(a){
  const P=nl(-9,9,{h:110,y1:2});
  P.arrow(0,.8,a,.8,{c:'var(--spark)',w:2.5,hs:9}).arrow(0,.8,-a,.8,{c:'var(--math)',w:2.5,hs:9});
  P.dot(a,0,{c:'var(--spark)',l:'A',dx:-4,dy:-12}).dot(-a,0,{c:'var(--math)',l:'B',dx:-4,dy:-12});
  return P.svg();
}
// addition ou soustraction sur la droite
function addFig(a,b,op){
  const e=op?-b:b, r=a+e, P=nl(-12,12,{lab:2,h:120,y1:2.2});
  P.dot(a,0,{c:'var(--spark)'}).arrow(a,.9,r,.9,{c:e>=0?'var(--ok)':'var(--bad)',w:3,hs:10}).dot(r,0,{c:'var(--accent)'});
  P.text(a,0,'départ',{a:'middle',dy:-12,s:10,c:'var(--spark)'}).text((a+r)/2,.9,e>=0?'vers la droite':'vers la gauche',{a:'middle',dy:-9,s:10,c:'var(--muted)'});
  return P.svg();
}
// les produits k × (−3) pour k = 4, 3, …
function multFig(k){
  const P=nl(-12,12,{lab:3,h:110,y1:2});
  for(let j=4;j>=k;j--){ const p=j*-3; P.dot(p,0,{c:j===k?'var(--spark)':j>=0?'var(--math)':'var(--ok)',r:j===k?7:5}); P.text(p,0,String(j),{a:'middle',dy:-12,s:10,c:'var(--muted)'}); }
  P.text(0,1.6,'nombre au-dessus du point : le facteur k',{a:'middle',s:10,c:'var(--muted)'});
  return P.svg();
}
// repère du plan avec le quadrant du point colorié
const quad=(x,y)=>x>0&&y>0?'1er':x<0&&y>0?'2e':x<0&&y<0?'3e':x>0&&y<0?'4e':'';
function repere(x,y,lab='M'){
  const P=plane({x:[-5.5,5.5],y:[-5.5,5.5],lab:1});
  const q=quad(x,y); if(q) P.rect(x>0?0:-5.5,y>0?0:-5.5,5.5,5.5,{fill:'var(--accent)',fo:.12,c:null});
  P.text(4.6,4.6,'1er',{a:'middle',s:11,c:'var(--muted)'}).text(-4.6,4.6,'2e',{a:'middle',s:11,c:'var(--muted)'}).text(-4.6,-4.9,'3e',{a:'middle',s:11,c:'var(--muted)'}).text(4.6,-4.9,'4e',{a:'middle',s:11,c:'var(--muted)'});
  P.seg(x,y,x,0,{c:'var(--spark)',w:1.5,dash:true}).seg(x,y,0,y,{c:'var(--spark)',w:1.5,dash:true});
  P.dot(x,y,{c:'var(--spark)',l:lab});
  return P.svg();
}
// pyramide : chaque brique est la somme des deux briques en dessous
const pyrFig=(()=>{ const P=plane({x:[0,8.4],y:[0,4.4],grid:false,axes:false});
  const rows=[['−4','7','?','−6'],['','',''],['',''],['−10']];
  rows.forEach((r,i)=>r.forEach((t,j)=>{ const x=.2+i+2*j; P.rect(x,.2+i,2,1,{fill:t==='?'?'var(--spark)':t?'var(--math)':'var(--line)',fo:t?.3:.2,c:'var(--ink)',w:1.5}); if(t) P.text(x+1,.7+i,t,{a:'middle',dy:5,s:15}); }));
  return P.svg(); })();

COURS.push(
/* ===================== MULTIPLES, DIVISEURS, NOMBRES PREMIERS ===================== */
{subj:'sec', sem:'a9', o:1, id:'sec9-divisibilite', h:'Multiples, diviseurs et nombres premiers', p:'Reconnaître un diviseur d’un coup d’œil, trouver les nombres premiers, décomposer un nombre en briques et résoudre des problèmes de carrelage et de rendez-vous.', steps:[
 {kind:'Théorie',h:'Multiples et diviseurs',p:`<p>Tu as une tablette de 24 carrés de chocolat. Peux-tu la ranger en rangées de 5 carrés, sans qu’il en reste ? Et en rangées de 6 ? Ces questions de rangement sont au cœur de tout le chapitre.</p>
<div class="def"><p>Si <i>a</i> = <i>b</i> × <i>k</i> avec <i>k</i> un nombre entier, on dit que <i>a</i> est un <b>multiple</b> de <i>b</i>, et que <i>b</i> est un <b>diviseur</b> de <i>a</i>. On dit aussi que <i>a</i> est <b>divisible</b> par <i>b</i>. Cela veut dire que la division <i>a</i> : <i>b</i> « tombe juste » : le reste est 0. (Le signe : veut dire « divisé par », comme ÷.)</p></div>
<div class="idea"><p>Range <i>n</i> carrés en rangées de <i>d</i>. Si toutes les rangées sont pleines, <i>d</i> est un diviseur de <i>n</i>. S’il reste des carrés rouges dans une rangée incomplète, ce n’est pas un diviseur. Bouge les curseurs.</p></div>
<div class="ex"><p>24 = 4 × 6, donc 4 et 6 sont des diviseurs de 24, et 24 est un multiple de 4 et de 6. Les diviseurs de 24 vont par paires : 1 × 24, 2 × 12, 3 × 8, 4 × 6. La liste complète est 1, 2, 3, 4, 6, 8, 12, 24. Par contre 24 = 5 × 4 + 4 : il reste 4, donc 5 n’est pas un diviseur de 24.</p></div>
<div class="ex"><p>Les multiples de 6 sont 0, 6, 12, 18, 24, 30… On les obtient en comptant de 6 en 6.</p></div>
<div class="warn"><p>Un nombre a une infinité de multiples, mais seulement quelques diviseurs. 1 divise tous les nombres, et 0 est un multiple de tous les nombres (0 = 7 × 0).</p></div>`,
  params:[{id:'n',l:'Nombre de carrés n',min:1,max:36,v:24},{id:'d',l:'Carrés par rangée d',min:1,max:12,v:5}],
  draw:v=>rangees(v.n,v.d),
  info:v=>{ const q=Math.floor(v.n/v.d), r=v.n%v.d; return r===0?`${v.n} = ${v.d} × ${q} : la division tombe juste, <b>${v.d} est un diviseur de ${v.n}</b>.`:`${v.n} = ${v.d} × ${q} + ${r} : il reste ${r}, donc ${v.d} n’est pas un diviseur de ${v.n}.`; }},
 {kind:'Théorie',h:'Critères : regarder la fin du nombre',p:`<p>Est-ce que 3 716 est divisible par 4 ? Poser la division prend du temps. Bonne nouvelle : pour 2, 4, 5, 10 et 25, il suffit de regarder la fin du nombre.</p>
<div class="prop"><p>Un nombre est divisible :<br>• par <b>2</b> si son chiffre des unités est 0, 2, 4, 6 ou 8 (nombre <b>pair</b>) ;<br>• par <b>5</b> si son chiffre des unités est 0 ou 5 ;<br>• par <b>10</b> si son chiffre des unités est 0 ;<br>• par <b>4</b> si le nombre formé par ses <b>deux derniers chiffres</b> est divisible par 4 ;<br>• par <b>25</b> si ses deux derniers chiffres sont 00, 25, 50 ou 75.</p></div>
<div class="why"><p>3 716 = 371 dizaines + 6. Chaque dizaine (10) est divisible par 2 et par 5, donc seul le chiffre des unités compte. De même, 3 716 = 37 centaines + 16. Une centaine, c’est 100 = 4 × 25 : les centaines sont toujours divisibles par 4 et par 25. Seuls les deux derniers chiffres décident.</p></div>
<div class="ex"><p>3 716 finit par 6 : divisible par 2, pas par 5 ni par 10. Ses deux derniers chiffres forment 16 = 4 × 4 : divisible par 4. 16 n’est pas 00, 25, 50 ou 75 : pas divisible par 25. Autre exemple : 1 975 finit par 75, il est divisible par 25 et par 5.</p></div>
<div class="warn"><p>Pour 4, le dernier chiffre ne suffit pas : 26 est pair, mais 26 n’est pas divisible par 4.</p></div>`,
  fig:digits('3716',2)},
 {kind:'Théorie',h:'Critères : additionner les chiffres',p:`<p>Pour 3 et 9, la fin du nombre ne dit rien : 13 n’est pas divisible par 3 mais 33 l’est. L’astuce est ailleurs : on additionne tous les chiffres.</p>
<div class="prop"><p>Un nombre est divisible par <b>3</b> si la <b>somme de ses chiffres</b> est divisible par 3. Il est divisible par <b>9</b> si la somme de ses chiffres est divisible par 9.</p></div>
<div class="why"><p>10 = 9 + 1 et 100 = 99 + 1. Donc 432 = 4 × 100 + 3 × 10 + 2 = 4 × 99 + 3 × 9 + (4 + 3 + 2). Les morceaux 4 × 99 et 3 × 9 sont des multiples de 9, donc aussi de 3. Il ne reste que la somme des chiffres, 4 + 3 + 2 = 9 : c’est elle qui décide.</p></div>
<div class="ex"><p>432 : 4 + 3 + 2 = 9, divisible par 9 et par 3. 1 254 : 1 + 2 + 5 + 4 = 12, divisible par 3 mais pas par 9. 5 371 : 5 + 3 + 7 + 1 = 16, ni par 3 ni par 9.</p></div>
<div class="warn"><p>Tout multiple de 9 est un multiple de 3 (9 = 3 × 3), mais l’inverse est faux : 12 est divisible par 3, pas par 9.</p></div>
${sdx}<p>Un tour de magie : pense à un nombre, retire-lui la somme de ses chiffres. Le résultat est toujours un multiple de 9 ! Avec 73 : 73 − 10 = 63 = 9 × 7. Le « pourquoi » ci-dessus explique le tour.</p></div>`,
  fig:digits('432',3,'var(--math)')},
 {kind:'Méthode',h:'Tester la divisibilité d’un nombre',p:'<b>Quand :</b> on te demande si un grand nombre est divisible par 2, 3, 4, 5, 9, 10 ou 25, sans poser la division. <b>Pourquoi ça marche :</b> les critères des deux étapes précédentes. <b>Comment :</b> regarde d’abord le chiffre des unités (2, 5, 10), puis les deux derniers chiffres (4, 25), enfin la somme de tous les chiffres (3, 9). Réponds par une phrase pour chaque diviseur.',
  demo:{enonce:'Parmi 2, 3, 4, 5, 9, 10 et 25, par quels nombres 7 350 est-il divisible ?',
   etapes:[
    {f:'Chiffre des unités : 0',w:'Un nombre qui finit par 0 est divisible par 2, par 5 et par 10.'},
    {f:'Deux derniers chiffres : 50. 50 = 4 × 12 + 2 et 50 = 25 × 2',w:'50 n’est pas divisible par 4 (il reste 2), mais 50 fait partie de 00, 25, 50, 75 : divisible par 25.'},
    {f:'Somme des chiffres : 7 + 3 + 5 + 0 = 15',w:'15 = 3 × 5 est divisible par 3, mais pas par 9.'}],
   conclusion:'7 350 est divisible par 2, 3, 5, 10 et 25. Il n’est divisible ni par 4, ni par 9.'},
  note:'Contrôle à la calculatrice si tu veux : 7 350 : 25 = 294 tombe juste, 7 350 : 9 = 816,66… ne tombe pas juste.'},
 {kind:'Pratique',h:'Le chiffre manquant',p:'Le code d’un casier est 5 38▢. Il est divisible par 9. Règle le chiffre des unités.',
  params:[{id:'u',l:'Chiffre des unités',min:0,max:9,v:0}],
  draw:v=>digits('538'+v.u,1),
  info:v=>`Somme des chiffres : 5 + 3 + 8 + ${v.u} = ${16+v.u}`,
  ok:v=>v.u===2,why:'5 + 3 + 8 = 16. Le multiple de 9 suivant est 18, il faut donc ajouter 2 (27 demanderait 11, ce n’est pas un chiffre). Le code est 5 382 = 9 × 598.'},
 {kind:'Théorie',h:'Les nombres premiers et le crible',p:`<p>Certains nombres refusent tous les rangements en rectangle : 7 carrés ne se rangent qu’en une seule ligne de 7. Ce sont les nombres premiers.</p>
<div class="def"><p>Un nombre est <b>premier</b> s’il a exactement <b>deux diviseurs</b> : 1 et lui-même. 2, 3, 5, 7, 11, 13 sont premiers. 1 n’est pas premier (il n’a qu’un diviseur). 15 = 3 × 5 n’est pas premier.</p></div>
<div class="idea"><p>Le <b>crible</b> trie les nombres de 1 à 100. Barre 1. Garde 2, barre tous ses multiples. Le premier nombre non barré, 3, est premier : barre ses multiples. Puis 5, puis 7. Bouge le curseur. Après 7, tout ce qui reste est premier.</p></div>
<div class="why"><p>Un nombre non premier jusqu’à 100 s’écrit <i>a</i> × <i>b</i> avec <i>a</i> ≤ <i>b</i>. Si <i>a</i> valait 11 ou plus, on aurait <i>a</i> × <i>b</i> ≥ 11 × 11 = 121. Donc <i>a</i> est plus petit que 11, et le nombre a déjà été barré par 2, 3, 5 ou 7.</p></div>
<div class="ex"><p>Est-ce que 91 est premier ? On essaie 2, 3, 5, 7 : 91 = 7 × 13. Non. Et 97 ? Ni 2, ni 3, ni 5, ni 7 ne le divisent, et 11 × 11 = 121 dépasse 97 : 97 est premier. Règle : on essaie les nombres premiers 2, 3, 5, 7, 11… tant que leur carré (le nombre multiplié par lui-même) ne dépasse pas le nombre testé.</p></div>
${sdx}<p>Ératosthène vivait à Alexandrie, en Égypte, il y a 2 200 ans. En plus de ce crible, il a mesuré le tour de la Terre avec l’ombre d’un bâton, et il ne s’est trompé que de quelques pour cent.</p></div>`,
  params:[{id:'k',l:'Étape du crible',min:0,max:4,v:0}],
  draw:v=>crible(v.k),
  info:v=>v.k===0?'1 est barré. Il reste 99 nombres en jeu, de 2 à 100.':v.k<4?`On a gardé ${PR.slice(0,v.k).join(', ')} et barré leurs multiples : il reste ${restants(v.k)} nombres en jeu.`:'On a barré les multiples de 2, 3, 5 et 7. Il reste <b>25 nombres : ce sont les nombres premiers jusqu’à 100</b>.'},
 {kind:'Méthode',h:'Décomposer en produit de facteurs premiers',p:'<b>Quand :</b> pour trouver tous les diviseurs d’un nombre, ou calculer un pgdc et un ppmc (plus loin). <b>Pourquoi ça marche :</b> tout nombre plus grand que 1 s’écrit comme un produit de nombres premiers, et d’une seule façon si on ne tient pas compte de l’ordre. Les nombres premiers sont les briques de Lego des nombres. <b>Comment :</b> divise par le plus petit nombre premier possible (2, puis 3, 5, 7…), recommence avec le quotient, et arrête-toi quand tu obtiens 1. Écriture courte : 2 × 2 = 2² se lit « 2 au carré », 2 × 2 × 2 = 2³ se lit « 2 exposant 3 ». Le petit nombre en haut, l’<b>exposant</b>, compte combien de fois le facteur est répété.',
  demo:{enonce:'Décomposer 180 en produit de facteurs premiers.',
   etapes:[
    {f:'180 : 2 = 90',w:'180 est pair : on divise par 2.'},
    {f:'90 : 2 = 45',w:'90 est encore pair.'},
    {f:'45 : 3 = 15',w:'45 est impair, mais 4 + 5 = 9 : il est divisible par 3.'},
    {f:'15 : 3 = 5, puis 5 : 5 = 1',w:'5 est premier : on termine en le divisant par lui-même.'},
    {f:'180 = 2 × 2 × 3 × 3 × 5 = 2² × 3² × 5',w:'On rassemble les diviseurs utilisés. Contrôle : 4 × 9 × 5 = 180.'}],
   conclusion:'180 = 2² × 3² × 5. Tous les facteurs sont premiers.'},
  note:'Tu peux aussi faire un arbre : 180 = 10 × 18 = (2 × 5) × (2 × 9) = 2 × 5 × 2 × 3 × 3. On retombe toujours sur les mêmes briques.'},
 {h:'Laquelle est la décomposition ?',p:'Ces quatre écritures valent toutes 300. Laquelle est la décomposition de 300 en produit de facteurs premiers ?',
  opts:['2 × 3 × 50','3 × 10²','4 × 3 × 25','2² × 3 × 5²'],ans:3,
  why:'50, 10, 4 et 25 ne sont pas premiers. Divisions successives : 300 : 2 = 150, 150 : 2 = 75, 75 : 3 = 25, 25 : 5 = 5, 5 : 5 = 1. Donc 300 = 2² × 3 × 5².'},
 {kind:'Théorie',h:'Le plus grand diviseur commun (pgdc)',p:`<p>Tu veux recouvrir le sol d’une cabane de 18 dm sur 12 dm avec des dalles carrées toutes pareilles, sans en couper aucune. Les plus grandes possible, pour poser moins de dalles. Quel côté choisir ?</p>
<div class="def"><p>Un <b>diviseur commun</b> de deux nombres divise les deux. Le plus grand d’entre eux s’appelle le <b>pgdc</b> (plus grand diviseur commun). On note pgdc(12 ; 18).</p></div>
<div class="idea"><p>Le côté de la dalle doit tomber juste dans 18 et dans 12 : c’est un diviseur commun. La plus grande dalle possible correspond au pgdc. Bouge le curseur : les dalles rouges dépassent du sol.</p></div>
<div class="ex"><p>Diviseurs de 12 : 1, 2, 3, 4, 6, 12. Diviseurs de 18 : 1, 2, 3, 6, 9, 18. Diviseurs communs : 1, 2, 3, 6. Donc pgdc(12 ; 18) = 6. Avec des dalles de 6 dm, il en faut 3 × 2 = 6.</p></div>
<div class="warn"><p>Le pgdc n’est jamais plus grand que le plus petit des deux nombres. Si un nombre divise l’autre, c’est lui le pgdc : pgdc(7 ; 21) = 7. Quand le pgdc vaut 1, on dit que les nombres sont <b>premiers entre eux</b>, comme 8 et 15.</p></div>`,
  params:[{id:'c',l:'Côté de la dalle (dm)',min:1,max:12,v:4}],
  draw:v=>dalles(v.c),
  info:v=>{ const a=18%v.c, b=12%v.c; return a===0&&b===0?`${v.c} divise 18 et 12 : ${18/v.c} × ${12/v.c} = ${18*12/v.c/v.c} dalles, sans découpe.${v.c===6?' C’est le plus grand côté possible : le pgdc.':''}`:`18 : ${v.c} ${a?`laisse un reste de ${a}`:'tombe juste'}, 12 : ${v.c} ${b?`laisse un reste de ${b}`:'tombe juste'}. Ça ne va pas.`; }},
 {kind:'Théorie',h:'Le plus petit multiple commun (ppmc)',p:`<p>À l’arrêt du collège, le bus de la ligne A passe toutes les 12 minutes et celui de la ligne B toutes les 18 minutes. Les deux bus partent ensemble à 7 h 00. Quand repasseront-ils en même temps ?</p>
<div class="def"><p>Un <b>multiple commun</b> de deux nombres est multiple des deux. Le plus petit multiple commun différent de 0 s’appelle le <b>ppmc</b>. On note ppmc(12 ; 18).</p></div>
<div class="idea"><p>Le bus A passe aux minutes 12, 24, 36, 48… et le bus B aux minutes 18, 36, 54… Les deux passent ensemble aux multiples communs. La figure montre les deux listes : elles se rencontrent à 36, puis à 72.</p></div>
<div class="ex"><p>Multiples de 12 : 12, 24, <b>36</b>, 48, 60, <b>72</b>. Multiples de 18 : 18, <b>36</b>, 54, <b>72</b>. Le premier commun est 36 : ppmc(12 ; 18) = 36. Les bus se retrouvent à 7 h 36, puis toutes les 36 minutes (8 h 12…).</p></div>
<div class="warn"><p>Le ppmc n’est jamais plus petit que le plus grand des deux nombres. Le produit 12 × 18 = 216 est bien un multiple commun, mais pas le plus petit. Pour deux nombres premiers entre eux, en revanche, le ppmc est le produit : ppmc(4 ; 9) = 36.</p></div>`,
  fig:(()=>{ const P=plane({x:[-6,76],y:[-1.4,3.2],h:130,grid:false,axes:false});
   [[2,12,'var(--math)','A'],[.6,18,'var(--spark)','B']].forEach(([y,s,c,n])=>{ P.seg(0,y,74,y,{c:'var(--muted)',w:1.5}); P.text(-5,y,n,{dy:5,c});
     for(let t=0;t<=72;t+=s){ const both=t%36===0; P.dot(t,y,{c:both?'var(--ok)':c,r:both?8:6}); } });
   for(let t=0;t<=72;t+=6) P.text(t,-.5,String(t),{a:'middle',s:10,c:'var(--muted)'});
   P.seg(36,-.2,36,2.6,{c:'var(--ok)',w:1.5,dash:true}).seg(72,-.2,72,2.6,{c:'var(--ok)',w:1.5,dash:true});
   P.text(36,2.6,'ensemble',{a:'middle',dy:-6,s:11,c:'var(--ok)'}).text(36,-1.3,'minutes après 7 h 00',{a:'middle',s:10,c:'var(--muted)'});
   return P.svg(); })()},
 {kind:'Méthode',h:'pgdc et ppmc par listes',p:'<b>Quand :</b> les nombres sont petits (en dessous de 100 environ). <b>Pourquoi ça marche :</b> on applique directement les définitions. <b>Comment :</b> pour le pgdc, écris les diviseurs de chaque nombre en les cherchant par paires (1 × …, 2 × …), puis prends le plus grand qui est dans les deux listes. Pour le ppmc, écris les multiples du <b>plus grand</b> nombre un par un, et arrête-toi au premier qui est aussi divisible par l’autre.',
  demo:{enonce:'Calculer pgdc(20 ; 30) et ppmc(20 ; 30).',
   etapes:[
    {f:'Diviseurs de 20 : 1, 2, 4, 5, 10, 20',w:'Par paires : 1 × 20, 2 × 10, 4 × 5.'},
    {f:'Diviseurs de 30 : 1, 2, 3, 5, 6, 10, 15, 30',w:'Par paires : 1 × 30, 2 × 15, 3 × 10, 5 × 6.'},
    {f:'Communs : 1, 2, 5, 10, donc pgdc(20 ; 30) = 10',w:'On garde le plus grand nombre présent dans les deux listes.'},
    {f:'Multiples de 30 : 30 (pas divisible par 20), 60 (60 = 20 × 3)',w:'On avance de 30 en 30 et on teste la division par 20.'}],
   conclusion:'pgdc(20 ; 30) = 10 et ppmc(20 ; 30) = 60.'},
  note:'Pour trois nombres, même idée : ppmc(4 ; 6 ; 9) est le premier multiple de 9 qui est aussi divisible par 4 et par 6, c’est 36.'},
 {kind:'Méthode',h:'pgdc et ppmc par décomposition',p:'<b>Quand :</b> les nombres sont grands et les listes deviendraient trop longues. <b>Pourquoi ça marche :</b> un diviseur commun ne peut utiliser que les briques premières présentes dans les deux nombres, et pas plus de fois que dans chacun. Un multiple commun doit contenir toutes les briques des deux nombres. <b>Comment :</b> décompose chaque nombre. Le <b>pgdc</b> est le produit des facteurs <b>communs</b>, chacun avec son <b>plus petit</b> exposant. Le <b>ppmc</b> est le produit de <b>tous</b> les facteurs, chacun avec son <b>plus grand</b> exposant.',
  demo:{enonce:'Calculer pgdc(84 ; 90) et ppmc(84 ; 90).',
   etapes:[
    {f:'84 = 2² × 3 × 7 et 90 = 2 × 3² × 5',w:'On décompose par divisions successives.'},
    {f:'pgdc = 2 × 3 = 6',w:'Facteurs communs : 2 et 3. Le plus petit exposant de 2 est 1 (dans 90), celui de 3 est 1 (dans 84). 5 et 7 ne sont pas communs.'},
    {f:'ppmc = 2² × 3² × 5 × 7 = 4 × 9 × 35 = 1 260',w:'On prend tous les facteurs, avec le plus grand exposant : 2², 3², 5 et 7.'},
    {f:'Contrôle : 1 260 : 84 = 15 et 1 260 : 90 = 14',w:'Le ppmc doit être divisible par les deux nombres.'}],
   conclusion:'pgdc(84 ; 90) = 6 et ppmc(84 ; 90) = 1 260.'},
  note:'Curiosité : pgdc × ppmc = 6 × 1 260 = 7 560 = 84 × 90. C’est vrai pour n’importe quels deux nombres.'},
 {h:'À toi : le ppmc',p:'On sait que 72 = 2³ × 3² et 120 = 2³ × 3 × 5. Calcule le ppmc de 72 et 120.',lab:'ppmc =',ans:360,
  why:'On prend tous les facteurs avec le plus grand exposant : 2³ × 3² × 5 = 8 × 9 × 5 = 360. Contrôle : 360 = 72 × 5 = 120 × 3.'},
 {kind:'Méthode',h:'Résoudre un problème de pgdc ou de ppmc',p:'<b>Quand :</b> un problème parle de partager ou de se retrouver. <b>Comment reconnaître :</b> « partager en parts égales », « sans reste », « le plus grand possible », « les plus grandes dalles » : c’est un <b>pgdc</b>. « Se retrouver ensemble », « en même temps », « la prochaine fois », « le plus petit nombre divisible par » : c’est un <b>ppmc</b>. <b>Comment rédiger :</b> une phrase qui dit ce que tu cherches, le calcul, puis une phrase-réponse avec l’unité.',
  demo:{enonce:'Léa a 36 bonbons à la fraise et 60 à la menthe. Elle prépare des sachets identiques (même nombre de bonbons de chaque sorte) et utilise tous les bonbons. Combien de sachets peut-elle faire au maximum ?',
   etapes:[
    {f:'On cherche un nombre de sachets qui divise 36 et 60, le plus grand possible : pgdc(36 ; 60).',w:'« Identiques », « tous les bonbons », « au maximum » : c’est un pgdc.'},
    {f:'36 = 2² × 3² et 60 = 2² × 3 × 5, donc pgdc = 2² × 3 = 12',w:'Facteurs communs 2 et 3, avec le plus petit exposant.'},
    {f:'36 : 12 = 3 et 60 : 12 = 5',w:'On vérifie que le partage tombe juste et on trouve le contenu d’un sachet.'}],
   conclusion:'Léa peut faire au maximum 12 sachets, avec 3 bonbons à la fraise et 5 à la menthe dans chacun.'}},
 {kind:'Défi',h:'Les billes de Noé',p:'Noé a entre 10 et 50 billes. S’il les range par 4, il en reste 1. Par 6, il en reste 1. Par 9, il en reste aussi 1. Combien de billes a-t-il ?',lab:'billes :',ans:37,
  why:'Ici, transformer le problème marche bien : si on met une bille de côté, le reste se range exactement par 4, par 6 et par 9. C’est donc un multiple commun de 4, 6 et 9. ppmc(4 ; 6 ; 9) = 36, et le suivant 72 est trop grand. Noé a 36 + 1 = 37 billes.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li><i>a</i> est un <b>multiple</b> de <i>b</i> et <i>b</i> un <b>diviseur</b> de <i>a</i> si <i>a</i> = <i>b</i> × <i>k</i> : la division tombe juste.</li>
<li>Critères : 2, 5, 10 avec le chiffre des unités ; 4 et 25 avec les deux derniers chiffres ; 3 et 9 avec la somme des chiffres.</li>
<li>Un nombre <b>premier</b> a exactement deux diviseurs, 1 et lui-même. 1 n’est pas premier. Le crible d’Ératosthène les trouve.</li>
<li>Pour tester si un nombre est premier : essaie 2, 3, 5, 7, 11… tant que leur carré ne dépasse pas le nombre.</li>
<li><b>Décomposer</b> : diviser par le plus petit nombre premier possible jusqu’à 1. Exemple : 180 = 2² × 3² × 5.</li>
<li><b>pgdc</b> : facteurs communs, plus petit exposant. <b>ppmc</b> : tous les facteurs, plus grand exposant. Pour de petits nombres, les listes suffisent.</li>
<li>Partager sans reste, le plus grand possible : <b>pgdc</b>. Se retrouver ensemble, la prochaine fois : <b>ppmc</b>.</li>
<li>Un problème se rédige en trois temps : phrase, calcul, réponse avec l’unité.</li>
</ul></div>`},
 {kind:'Problème',h:'Le carrelage de la salle de jeux',
  p:'La salle de jeux du centre de loisirs est un rectangle de 4,2 m sur 5,4 m. On veut la recouvrir de dalles carrées toutes identiques, sans en couper aucune. Le côté des dalles est un nombre entier de centimètres, et on veut les plus grandes dalles possibles. Une dalle coûte 12 CHF.',
  parts:[
   {q:'a) Quel est le côté des dalles ?',lab:'côté =',unit:'cm',ans:60,hint:'Convertis en centimètres (420 et 540), puis cherche le plus grand nombre qui divise les deux.',why:'420 = 2² × 3 × 5 × 7 et 540 = 2² × 3³ × 5. pgdc = 2² × 3 × 5 = 60 cm.'},
   {q:'b) Combien de dalles faut-il ?',lab:'dalles :',ans:63,hint:'Combien de dalles dans la longueur ? Dans la largeur ?',why:'420 : 60 = 7 et 540 : 60 = 9. Il faut 7 × 9 = 63 dalles.'},
   {q:'c) Avec des dalles de 30 cm, combien en faudrait-il ?',lab:'dalles :',ans:252,hint:'Refais le calcul de la question b) avec 30 cm.',why:'420 : 30 = 14 et 540 : 30 = 18, donc 14 × 18 = 252 dalles : 4 fois plus.'},
   {q:'d) Combien coûtent les dalles de 60 cm ?',unit:'CHF',ans:756,hint:'Multiplie le nombre de dalles par le prix d’une dalle.',why:'63 × 12 = 756 CHF.'}],
  sol:'On cherche le plus grand côté qui tombe juste dans 420 cm et dans 540 cm : c’est pgdc(420 ; 540). Avec 420 = 2² × 3 × 5 × 7 et 540 = 2² × 3³ × 5, on obtient pgdc = 2² × 3 × 5 = 60. Les dalles ont 60 cm de côté. Il en faut 420 : 60 = 7 dans un sens et 540 : 60 = 9 dans l’autre, soit 63 dalles. Des dalles deux fois plus petites (30 cm) demanderaient 14 × 18 = 252 dalles, quatre fois plus. Réponse : 63 dalles de 60 cm, pour 63 × 12 = 756 CHF.'},
 {kind:'Problème',h:'Le tournoi et les navettes',
  p:'Pour un tournoi de sport, 48 filles et 60 garçons s’inscrivent. On veut former des équipes toutes identiques (même nombre de filles et même nombre de garçons dans chaque équipe), où tout le monde joue, avec le plus d’équipes possible. Le jour du tournoi, deux navettes partent ensemble de la gare à 8 h 00 : la rouge part toutes les 15 minutes, la bleue toutes les 25 minutes.',
  parts:[
   {q:'a) Combien d’équipes peut-on former au maximum ?',lab:'équipes :',ans:12,hint:'Le nombre d’équipes doit diviser 48 et 60.',why:'48 = 2⁴ × 3 et 60 = 2² × 3 × 5. pgdc(48 ; 60) = 2² × 3 = 12 équipes.'},
   {q:'b) Combien de joueurs y a-t-il dans chaque équipe ?',lab:'joueurs :',ans:9,hint:'Partage les filles, puis les garçons, entre les équipes.',why:'48 : 12 = 4 filles et 60 : 12 = 5 garçons, soit 9 joueurs.'},
   {q:'c) Combien de minutes après 8 h 00 les deux navettes repartent-elles ensemble pour la première fois ?',unit:'min',ans:75,hint:'Elles repartent ensemble à un multiple commun de 15 et de 25.',why:'Multiples de 25 : 25, 50, 75. 75 = 15 × 5. ppmc(15 ; 25) = 75 min, soit 9 h 15.'},
   {q:'d) Entre 8 h 00 et 12 h 00 (8 h 00 compris), combien de fois partent-elles ensemble ?',lab:'fois :',ans:4,hint:'Combien de minutes entre 8 h 00 et 12 h 00 ? Liste les multiples de 75 jusque-là.',why:'De 8 h 00 à 12 h 00, il y a 240 min. Départs communs à 0, 75, 150 et 225 min (8 h 00, 9 h 15, 10 h 30, 11 h 45). 300 dépasse 240. Donc 4 fois.'}],
  sol:'Le nombre d’équipes doit diviser 48 et 60, le plus grand possible : pgdc(48 ; 60) = 12. On forme 12 équipes de 4 filles et 5 garçons, soit 9 joueurs. Les navettes repartent ensemble à chaque multiple commun de 15 et 25 minutes. ppmc(15 ; 25) = 75 min = 1 h 15. Les départs communs ont lieu à 8 h 00, 9 h 15, 10 h 30, 11 h 45 ; le suivant, 13 h 00, est après midi. Réponse : 12 équipes de 9 joueurs, et 4 départs communs le matin.'},
]},
/* ===================== CALCULER MALIN ===================== */
{subj:'sec', sem:'a9', o:2, id:'sec9-operations', h:'Calculer malin', p:'Le vocabulaire des opérations, les nombres décimaux, les priorités, les astuces de calcul mental, les estimations, d’autres systèmes de numération et la calculatrice.', steps:[
 {kind:'Théorie',h:'Le vocabulaire des opérations',p:`<p>Dans un jeu vidéo, tu ramasses 12 pièces, puis 5 autres. Tu as la <b>somme</b> 12 + 5 = 17. Chaque opération a ses mots, et les connaître évite bien des malentendus.</p>
<div class="def"><p>Dans une <b>addition</b>, les nombres sont des <b>termes</b> et le résultat est la <b>somme</b>. Dans une <b>soustraction</b>, le résultat est la <b>différence</b>. Dans une <b>multiplication</b>, les nombres sont des <b>facteurs</b> et le résultat est le <b>produit</b>. Dans une <b>division</b>, on divise le <b>dividende</b> par le <b>diviseur</b> et on obtient le <b>quotient</b>. On écrit la division 12 : 4 ou 12 ÷ 4.</p></div>
<div class="idea"><p>Le nom du résultat dit quelle opération on fait <b>en dernier</b>. « Le produit de 3 par la somme de 4 et 5 » : on fait d’abord la somme, puis le produit. On écrit 3 × (4 + 5) = 27.</p></div>
<div class="ex"><p>« La différence entre 20 et le quotient de 12 par 4 » : le quotient vaut 12 : 4 = 3, puis la différence vaut 20 − 3 = 17. On écrit 20 − 12 : 4 = 17.</p></div>
<div class="warn"><p>L’ordre compte dans une différence et un quotient : « la différence entre 20 et 3 », c’est 20 − 3, pas 3 − 20.</p></div>
${sdx}<p>Les signes + et − apparaissent dans un livre allemand de 1489. Le signe × date de 1631, et le signe = de 1557 : son inventeur trouvait que rien n’est plus égal que deux traits parallèles.</p></div>`,
  fig:vocabFig},
 {kind:'Théorie',h:'Les naturels et les nombres décimaux',p:`<p>Pour compter des joueurs, on utilise 0, 1, 2, 3… Mais pour un prix de 2,35 CHF ou un saut de 1,48 m, il faut des chiffres après la virgule.</p>
<div class="def"><p>Les <b>nombres naturels</b> sont 0, 1, 2, 3, 4… On les note <b>ℕ</b>. Un <b>nombre décimal</b> s’écrit avec une virgule et un nombre <b>fini</b> de chiffres après elle : 2,37 ou 0,5. Après la virgule viennent les <b>dixièmes</b>, puis les <b>centièmes</b>, puis les <b>millièmes</b>.</p></div>
<div class="idea"><p>Sur la droite, chaque unité est coupée en 10 dixièmes. La loupe en dessous coupe un dixième en 10 centièmes. Bouge les curseurs pour placer le point.</p></div>
<div class="ex"><p>Un même nombre a plusieurs écritures. 2,37 = 2 unités + 3 dixièmes + 7 centièmes = 237 centièmes = ${F(237,100)} = 2,370. De même, 12 = 3 × 4 = 24 : 2 = 20 − 8 = 12,0. Toutes ces écritures désignent le même point de la droite.</p></div>
<div class="warn"><p>Compare chiffre par chiffre, rang par rang : 2,5 &gt; 2,37 car 5 dixièmes &gt; 3 dixièmes, même si 37 &gt; 5. Un zéro à la fin ne change rien (2,50 = 2,5), mais un zéro au milieu change tout (2,05 ≠ 2,5).</p></div>`,
  params:[{id:'u',l:'Unités et dixièmes',min:0,max:5,step:.1,v:2.3},{id:'c',l:'Centièmes',min:0,max:9,v:7}],
  draw:v=>deci(v.u,v.c),
  info:v=>{ const N=Math.round(v.u*100)+v.c, x=N/100; return `${fmt(x)} = ${Math.floor(N/100)} unité(s) + ${Math.floor(N/10)%10} dixième(s) + ${v.c} centième(s) = ${N} centièmes = ${F(N,100)}`; }},
 {kind:'Méthode',h:'Respecter les priorités',p:'Lina calcule 2 + 3 × 4 et trouve 20. Tom trouve 14. Qui a raison ? Pour que tout le monde obtienne le même résultat, on suit des <b>règles de priorité</b>. <b>1.</b> On calcule d’abord ce qui est entre <b>parenthèses</b> (en commençant par les plus intérieures). <b>2.</b> Puis les <b>multiplications et divisions</b>, de gauche à droite. <b>3.</b> Enfin les <b>additions et soustractions</b>, de gauche à droite. <b>Pourquoi :</b> 3 × 4 est une addition répétée (4 + 4 + 4), il forme un bloc qu’on calcule avant de l’ajouter. Tom a raison : 2 + 12 = 14. <b>Comment :</b> souligne l’opération prioritaire, calcule-la, recopie le reste, et recommence. Une seule opération par ligne.',
  demo:{enonce:'Calculer 30 − 2 × (3 + 4 × 2) : 11.',
   etapes:[
    {f:'30 − 2 × (3 + <u>4 × 2</u>) : 11 = 30 − 2 × (3 + 8) : 11',w:'On commence par les parenthèses. À l’intérieur, la multiplication passe avant l’addition.'},
    {f:'= 30 − 2 × 11 : 11',w:'On termine la parenthèse : 3 + 8 = 11.'},
    {f:'= 30 − 22 : 11 = 30 − 2',w:'Multiplications et divisions de gauche à droite : 2 × 11 = 22, puis 22 : 11 = 2.'},
    {f:'= 28',w:'Il ne reste qu’une soustraction.'}],
   conclusion:'30 − 2 × (3 + 4 × 2) : 11 = 28.'},
  note:'<b>Piège :</b> 24 : 4 × 2 se calcule de gauche à droite : 6 × 2 = 12, et non 24 : 8 = 3.'},
 {h:'À toi : les priorités',p:'Calcule 50 − 4 × (7 − 2) + 18 : 3.',lab:'résultat :',ans:36,
  why:'Parenthèse : 7 − 2 = 5. Puis 4 × 5 = 20 et 18 : 3 = 6. Enfin 50 − 20 + 6 = 36.'},
 {kind:'Théorie',h:'Trois propriétés pour calculer malin',p:`<p>Calcule 25 × 17 × 4 de tête. Dans l’ordre, c’est pénible. Mais 25 × 4 = 100, et 100 × 17 = 1 700. Trois propriétés autorisent ce genre d’astuce.</p>
<div class="prop"><p><b>Commutativité :</b> on peut échanger les termes d’une addition ou les facteurs d’une multiplication. 8 + 5 = 5 + 8 et 4 × 7 = 7 × 4.<br><b>Associativité :</b> on peut regrouper comme on veut. (25 × 4) × 17 = 25 × (4 × 17).<br><b>Distributivité :</b> <i>a</i> × (<i>b</i> + <i>c</i>) = <i>a</i> × <i>b</i> + <i>a</i> × <i>c</i>, et de même avec une soustraction.</p></div>
<div class="why"><p>Un rectangle de 4 sur 7 a la même aire qu’un rectangle de 7 sur 4 : c’est la commutativité. Pour la distributivité, regarde la figure : le grand rectangle de côtés <i>a</i> et <i>b</i> + <i>c</i> se coupe en deux rectangles, d’aires <i>a</i> × <i>b</i> et <i>a</i> × <i>c</i>. Bouge les curseurs.</p></div>
<div class="ex"><p>7 × 102 = 7 × 100 + 7 × 2 = 700 + 14 = 714. Et 38 + 47 + 62 = (38 + 62) + 47 = 100 + 47 = 147.</p></div>
<div class="warn"><p>La soustraction et la division ne sont ni commutatives ni associatives : 20 − 5 ≠ 5 − 20, et (24 : 4) : 2 = 3 alors que 24 : (4 : 2) = 12.</p></div>`,
  params:[{id:'a',l:'a',min:1,max:6,v:3},{id:'b',l:'b',min:1,max:8,v:5},{id:'c',l:'c',min:1,max:6,v:2}],
  draw:v=>distri(v.a,v.b,v.c),
  info:v=>`${v.a} × (${v.b} + ${v.c}) = ${v.a} × ${v.b} + ${v.a} × ${v.c} = ${v.a*v.b} + ${v.a*v.c} = <b>${v.a*(v.b+v.c)}</b>`},
 {kind:'Méthode',h:'Calculer de tête avec les propriétés',p:'<b>Quand :</b> un calcul paraît long, mais certains nombres « vont bien ensemble » (ils font 10, 100, 1 000) ou sont proches d’un nombre rond. <b>Pourquoi ça marche :</b> commutativité et associativité permettent de changer l’ordre et les regroupements, la distributivité permet de couper un nombre en morceaux faciles. <b>Comment :</b> cherche les paires qui donnent un nombre rond, remplace 99 par 100 − 1 ou 102 par 100 + 2, et repère un facteur commun à mettre devant.',
  demo:{enonce:'Calculer de tête : a) 5 × 13 × 20 ; b) 8 × 99 ; c) 6 × 47 + 6 × 53.',
   etapes:[
    {f:'a) 5 × 13 × 20 = 13 × (5 × 20) = 13 × 100 = 1 300',w:'On échange et on regroupe 5 et 20, qui font 100.'},
    {f:'b) 8 × 99 = 8 × (100 − 1) = 800 − 8 = 792',w:'99 est proche de 100 : on distribue le 8.'},
    {f:'c) 6 × 47 + 6 × 53 = 6 × (47 + 53) = 6 × 100 = 600',w:'Le facteur 6 est commun : on utilise la distributivité dans l’autre sens.'}],
   conclusion:'1 300, 792 et 600, sans poser une seule opération.'}},
 {kind:'Pratique',h:'Découpe pour calculer',p:'Pour calculer 7 × 16 de tête, on découpe le 16 en deux morceaux faciles. Place la séparation pour que l’un des deux morceaux mesure 10.',
  params:[{id:'s',l:'Séparation',min:1,max:15,v:8}],
  draw:v=>distri(7,v.s,16-v.s),
  info:v=>`7 × 16 = 7 × ${v.s} + 7 × ${16-v.s} = ${7*v.s} + ${7*(16-v.s)} = 112`,
  ok:v=>v.s===10||v.s===6,why:'7 × 16 = 7 × (10 + 6) = 70 + 42 = 112. Le morceau de 10 rend le calcul facile.'},
 {kind:'Méthode',h:'Estimer un ordre de grandeur',p:'<b>Quand :</b> à la caisse, pour savoir si ton argent suffit, ou pour vérifier un résultat de calculatrice. <b>Pourquoi ça marche :</b> en remplaçant chaque nombre par un nombre rond proche, le calcul devient facile et le résultat reste proche du vrai. On obtient un <b>ordre de grandeur</b>. <b>Comment :</b> arrondis chaque nombre (2,95 → 3 ; 49 → 50 ; 312 → 300). Pour arrondir à l’unité, regarde le chiffre des dixièmes : de 0 à 4, on garde l’unité ; de 5 à 9, on passe à l’unité suivante. Puis calcule avec les nombres arrondis, en respectant les priorités.',
  demo:{enonce:'Au magasin, tu prends 4 paquets de chips à 2,95 CHF, 3 bouteilles à 1,85 CHF et un fromage à 7,40 CHF. Tu as 30 CHF. Est-ce assez ?',
   etapes:[
    {f:'2,95 ≈ 3 ; 1,85 ≈ 2 ; 7,40 ≈ 7',w:'Le signe ≈ se lit « environ égal ». On arrondit à l’unité.'},
    {f:'4 × 3 + 3 × 2 + 7 = 12 + 6 + 7 = 25',w:'Calcul facile avec les priorités : les produits d’abord.'},
    {f:'Contrôle exact : 11,80 + 5,55 + 7,40 = 24,75',w:'L’estimation (25 CHF) est très proche du prix exact.'}],
   conclusion:'Les courses coûtent environ 25 CHF : les 30 CHF suffisent.'},
  note:'Autre exemple : 49 × 21 ≈ 50 × 20 = 1 000. Le résultat exact, 1 029, est bien proche de 1 000.'},
 {h:'Le bon ordre de grandeur',p:'Sans calculatrice, quel est l’ordre de grandeur de 312 × 48 ?',
  opts:['150','1 500','15 000','150 000'],ans:2,
  why:'312 ≈ 300 et 48 ≈ 50, donc 312 × 48 ≈ 300 × 50 = 15 000. Le résultat exact est 14 976.'},
 {kind:'Théorie',h:'D’autres façons d’écrire les nombres',p:`<p>Notre système utilise 10 chiffres, de 0 à 9, et la <b>position</b> d’un chiffre donne sa valeur : dans 333, le premier 3 vaut 300. C’est le système <b>décimal</b>, ou en <b>base 10</b>. Il en existe d’autres.</p>
<div class="def"><p><b>Chiffres romains :</b> I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1 000. On additionne les symboles, du plus grand au plus petit. Un petit symbole placé <b>avant</b> un plus grand se soustrait : IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900.<br><b>Binaire (base 2) :</b> deux chiffres seulement, 0 et 1. Les positions valent 1, 2, 4, 8, 16… (on double à chaque fois). Les ordinateurs comptent ainsi : courant ou pas de courant.<br><b>Base 60 :</b> pour les heures. 1 h = 60 min et 1 min = 60 s.</p></div>
<div class="ex"><p>XIV = 10 + 4 = 14. En binaire, 101 = 4 + 0 + 1 = 5. Allume les lampes avec le curseur : une lampe allumée vaut 1, une éteinte vaut 0.</p></div>
${sdx}<p>Les Babyloniens comptaient en base 60 il y a 4 000 ans. C’est d’eux que nous viennent les 60 minutes d’une heure et les 60 secondes d’une minute.</p></div>`,
  params:[{id:'n',l:'Nombre',min:0,max:31,v:5}],
  draw:v=>lampes(v.n),
  info:v=>{ const parts=[16,8,4,2,1].filter(p=>v.n&p); return `${v.n} = ${parts.length?parts.join(' + '):'0'} : en binaire, <b>${v.n.toString(2)}</b>`; }},
 {kind:'Méthode',h:'Passer d’un système à l’autre',p:'<b>Quand :</b> lire une date en chiffres romains, comprendre un code binaire, convertir une durée. <b>Pourquoi ça marche :</b> dans chaque système, la valeur d’un symbole dépend de sa position ou de sa forme, comme vu à l’étape précédente. <b>Comment :</b> en romain, découpe le nombre en milliers, centaines, dizaines et unités. En binaire, écris les valeurs 16, 8, 4, 2, 1 au-dessus des chiffres, puis additionne celles qui ont un 1. Pour écrire un nombre en binaire, enlève la plus grande valeur possible, puis recommence. Pour les durées, fais des paquets de 60.',
  demo:{enonce:'a) Lire MMXXVI. b) Écrire 13 en binaire. c) Convertir 200 min en heures et minutes.',
   etapes:[
    {f:'a) MM = 2 000 ; XX = 20 ; VI = 6, donc MMXXVI = 2 026',w:'On lit de gauche à droite : les milliers, puis les dizaines, puis les unités.'},
    {f:'b) 13 = 8 + 4 + 1, donc 13 s’écrit 1101',w:'Valeurs 8, 4, 2, 1 : on prend 8 (reste 5), puis 4 (reste 1), pas 2, puis 1.'},
    {f:'c) 200 = 3 × 60 + 20, donc 200 min = 3 h 20 min',w:'On fait le plus de paquets de 60 possible. Le reste, ce sont les minutes.'}],
   conclusion:'MMXXVI = 2 026, 13 = 1101 en binaire et 200 min = 3 h 20 min.'}},
 {h:'À toi : le binaire',p:'Que vaut le nombre binaire 11001 ?',
  opts:['11 001','19','25','9'],ans:2,
  why:'Valeurs des positions : 16, 8, 4, 2, 1. On garde celles qui ont un 1 : 16 + 8 + 1 = 25.'},
 {kind:'Méthode',h:'Bien utiliser la calculatrice',p:'<b>Quand :</b> pour les grands calculs et pour vérifier. Une calculatrice scientifique <b>respecte les priorités</b>, mais elle ne devine pas ce que tu veux dire. <b>Les touches utiles :</b> les <b>parenthèses</b> ( et ), indispensables pour diviser une somme par une autre. La touche <b>x²</b> élève au carré et la touche <b>^</b> (ou <b>xʸ</b>) calcule une <b>puissance</b> : 3 ^ 4 = 3 × 3 × 3 × 3 = 81. La touche <b>√</b> donne la <b>racine carrée</b> : le nombre positif qui, multiplié par lui-même, donne le nombre de départ. √49 = 7, car 7 × 7 = 49. Les touches <b>M+</b> (ajoute l’écran à la mémoire), <b>M−</b> (le retire), <b>MR</b> (rappelle la mémoire) et <b>MC</b> (l’efface) gardent un résultat de côté. <b>Comment :</b> estime d’abord l’ordre de grandeur, tape le calcul, puis compare.',
  demo:{enonce:'Calculer (148 + 52) : (17 − 9), puis le prix de 3 cahiers à 4,50 CHF et 2 livres à 7,20 CHF avec la mémoire.',
   etapes:[
    {f:'On tape ( 148 + 52 ) ÷ ( 17 − 9 ) = et on lit 25',w:'Sans parenthèses, 148 + 52 ÷ 17 − 9 donnerait 142,058… car la division passe avant.'},
    {f:'Estimation : 200 : 8 = 25',w:'Le résultat est plausible.'},
    {f:'3 × 4,5 = M+ (13,5 en mémoire), puis 2 × 7,2 = M+ (14,4 ajouté)',w:'Chaque M+ ajoute le résultat affiché à la mémoire.'},
    {f:'MR affiche 27,9',w:'La mémoire contient 13,5 + 14,4 = 27,9.'}],
   conclusion:'(148 + 52) : (17 − 9) = 25, et les achats coûtent 27,90 CHF.'}},
 {h:'À toi : avec la calculatrice',p:'Calcule (35 + 21) : (11 − 4) + √81.',lab:'résultat :',ans:17,
  why:'Les parenthèses d’abord : 56 : 7 = 8. Puis √81 = 9, car 9 × 9 = 81. Enfin 8 + 9 = 17.'},
 {kind:'Défi',h:'Les parenthèses magiques',p:'Dans le calcul 2 + 6 × 5 − 3, tu peux ajouter des parenthèses où tu veux. Quel est le plus grand résultat possible ?',lab:'résultat :',ans:37,
  why:'Ici, faire une liste organisée marche bien. Sans parenthèses : 29. (2 + 6) × 5 − 3 = 37. 2 + 6 × (5 − 3) = 14. (2 + 6) × (5 − 3) = 16. 2 + (6 × 5 − 3) = 29. Le plus grand est 37 : on agrandit le facteur 6 avant de multiplier.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li>Termes et <b>somme</b> ; <b>différence</b> ; facteurs et <b>produit</b> ; dividende, diviseur et <b>quotient</b>. Le nom du résultat dit la dernière opération.</li>
<li>ℕ = {0, 1, 2, 3…}. Un nombre décimal a un nombre fini de chiffres après la virgule : dixièmes, centièmes, millièmes. Un nombre a plusieurs écritures : 2,37 = 237 centièmes.</li>
<li><b>Priorités :</b> parenthèses, puis × et : de gauche à droite, puis + et − de gauche à droite.</li>
<li><b>Commutativité</b> et <b>associativité</b> (pour + et ×), <b>distributivité</b> : <i>a</i> × (<i>b</i> + <i>c</i>) = <i>a</i> × <i>b</i> + <i>a</i> × <i>c</i>. Elles servent à calculer de tête.</li>
<li><b>Estimer :</b> arrondir chaque nombre, puis calculer. Le signe ≈ veut dire « environ égal ».</li>
<li>Romain : I, V, X, L, C, D, M. Binaire : positions 1, 2, 4, 8, 16. Durées : paquets de 60.</li>
<li>Calculatrice : parenthèses, ^ pour les puissances, √ pour la racine carrée, M+ et MR pour la mémoire.</li>
</ul></div>`},
 {kind:'Problème',h:'La fête d’anniversaire',
  p:'Tu organises une fête pour 12 personnes, toi compris. Tu achètes 3 pizzas géantes à 19,50 CHF, 12 boissons à 2,25 CHF et un gâteau à 34,50 CHF. Vous partagez les frais en parts égales.',
  parts:[
   {q:'a) Avant de calculer, quel est l’ordre de grandeur de la dépense totale ?',opts:['environ 50 CHF','environ 120 CHF','environ 250 CHF','environ 1 000 CHF'],ans:1,hint:'Arrondis : 19,50 ≈ 20, 2,25 ≈ 2, 34,50 ≈ 35.',why:'3 × 20 + 12 × 2 + 35 = 60 + 24 + 35 = 119 : environ 120 CHF.'},
   {q:'b) Quelle est la dépense exacte ?',unit:'CHF',ans:120,hint:'Calcule chaque produit, puis additionne.',why:'3 × 19,50 = 58,50 ; 12 × 2,25 = 27 ; 58,50 + 27 + 34,50 = 120 CHF.'},
   {q:'c) Quelle expression donne la part de chacun ?',opts:['3 × 19,50 + 12 × 2,25 + 34,50 : 12','(3 × 19,50 + 12 × 2,25 + 34,50) : 12','3 × 19,50 + (12 × 2,25 + 34,50) : 12','(3 + 12 + 1) × (19,50 + 2,25 + 34,50) : 12'],ans:1,hint:'Il faut diviser tout le total par 12. Que fait la division sans parenthèses ?',why:'La division passe avant l’addition : il faut des parenthèses autour de toute la somme.'},
   {q:'d) Combien paie chaque personne ?',unit:'CHF',ans:10,hint:'Divise le total par le nombre de personnes.',why:'120 : 12 = 10 CHF par personne.'}],
  sol:'Estimation : 3 × 20 + 12 × 2 + 35 = 119, donc environ 120 CHF. Calcul exact : 3 × 19,50 = 58,50 CHF ; 12 × 2,25 = 27 CHF (de tête : 12 × 2 + 12 × 0,25 = 24 + 3) ; le total vaut 58,50 + 27 + 34,50 = 120 CHF. On remarque que 58,50 + 34,50 = 93 : regrouper ces deux termes facilite le calcul. La part de chacun s’écrit (3 × 19,50 + 12 × 2,25 + 34,50) : 12, avec des parenthèses car la division est prioritaire. Réponse : chaque personne paie 120 : 12 = 10 CHF.'},
 {kind:'Problème',h:'Le marathon de jeux',
  p:'Pour récolter de l’argent pour une association, 6 amis jouent en relais à un jeu vidéo. Chacun joue 2 h 45 min, l’un après l’autre, sans pause. Ils commencent le samedi à 9 h 15. Une marraine promet 0,75 CHF par minute jouée, plus un bonus de 50 CHF.',
  parts:[
   {q:'a) Combien de minutes joue chaque ami ?',unit:'min',ans:165,hint:'Une heure vaut 60 minutes.',why:'2 h 45 min = 2 × 60 + 45 = 165 min.'},
   {q:'b) Combien de minutes dure le marathon en tout ?',unit:'min',ans:990,hint:'Pour calculer 6 × 165 de tête, découpe 165 en 100 + 65 ou en 160 + 5.',why:'6 × 165 = 6 × 160 + 6 × 5 = 960 + 30 = 990 min.'},
   {q:'c) À quelle heure le marathon se termine-t-il ?',opts:['dimanche à 1 h 45','samedi à 23 h 45','dimanche à 2 h 15','samedi à 19 h 05'],ans:0,hint:'Convertis 990 min en heures et minutes avec des paquets de 60, puis ajoute à 9 h 15.',why:'990 = 16 × 60 + 30, donc 16 h 30 min. 9 h 15 + 16 h 30 = 25 h 45, soit 1 h 45 le dimanche.'},
   {q:'d) Combien la marraine donne-t-elle ?',unit:'CHF',ans:792.5,tol:.01,hint:'Respecte les priorités : 990 × 0,75 + 50.',why:'990 × 0,75 = 742,50 et 742,50 + 50 = 792,50 CHF.'}],
  sol:'Chaque ami joue 2 × 60 + 45 = 165 minutes. Le marathon dure 6 × 165 = 990 minutes (de tête : 6 × 160 + 6 × 5 = 990). En paquets de 60 : 990 = 16 × 60 + 30, soit 16 h 30 min. Partis à 9 h 15, ils finissent à 9 h 15 + 16 h 30 = 25 h 45, c’est-à-dire le dimanche à 1 h 45. La marraine donne 990 × 0,75 + 50 = 742,50 + 50 = 792,50 CHF. Estimation de contrôle : 1 000 × 0,75 = 750, plus 50, environ 800 CHF. Réponse : 792,50 CHF pour l’association.'},
]},
/* ===================== NOMBRES RELATIFS ===================== */
{subj:'sec', sem:'a9', o:5, id:'sec9-relatifs', h:'Nombres relatifs', p:'Des nombres sous zéro : les placer sur une droite, les comparer, les additionner, les multiplier, et repérer des points dans le plan.', steps:[
 {kind:'Théorie',h:'Des nombres plus petits que zéro',p:`<p>En hiver, au sommet des pistes, le thermomètre affiche « moins 4 degrés ». Dans l’ascenseur du parking, tu appuies sur le bouton « −2 ». Sur ton compte de jeu, il te manque 20 CHF. Les nombres que tu connais ne suffisent plus : il faut des nombres plus petits que zéro.</p>
<div class="def"><p>Un <b>nombre relatif</b> est formé d’un <b>signe</b> et d’une <b>distance à zéro</b>. Les nombres <b>positifs</b> ont le signe + (on peut ne pas l’écrire : +5 = 5). Les nombres <b>négatifs</b> ont le signe − : −3 se lit « moins 3 ». Le nombre 0 est à la fois positif et négatif.</p></div>
<div class="idea"><p>Zéro sert de <b>repère</b> : la température où l’eau gèle, le rez-de-chaussée, le niveau de la mer, un compte vide. Au-dessus du repère, on compte en positif ; en dessous, en négatif.</p></div>
<div class="ex"><p>Ascenseur : le rez vaut 0, le 3e étage +3, le 2e sous-sol −2. Altitude : le sommet du Cervin est à +4 478 m, les rives de la mer Morte à environ −430 m. Une dette de 20 CHF s’écrit −20.</p></div>
${sdx}<p>Il y a 2 000 ans, des mathématiciens chinois calculaient avec des bâtonnets rouges pour les gains et noirs pour les dettes. En Europe, on a longtemps refusé ces nombres : au 16e siècle, certains les appelaient encore « nombres absurdes ».</p></div>`,
  fig:thermoFig},
 {kind:'Théorie',h:'La droite graduée et l’opposé',p:`<p>Pour ranger tous ces nombres, on les place sur une droite, comme sur un thermomètre couché.</p>
<div class="def"><p>Sur une <b>droite graduée</b>, on choisit l’<b>origine</b> 0 et une unité. Les positifs sont à droite de 0, les négatifs à gauche, avec le même écartement. Le nombre qui repère un point s’appelle son <b>abscisse</b>. Deux nombres sont <b>opposés</b> s’ils sont à la même distance de 0, de part et d’autre : l’opposé de 3 est −3, l’opposé de −7 est 7.</p></div>
<div class="idea"><p>Bouge le point A : le point B, son opposé, bouge comme dans un miroir placé en 0. Les deux flèches ont la même longueur, la distance à zéro.</p></div>
<div class="ex"><p>−5 et 5 sont opposés : distance à zéro 5 pour les deux. L’opposé de 0 est 0. Un nombre et son opposé ont une somme nulle : 7 + (−7) = 0, comme gagner 7 CHF puis en perdre 7.</p></div>
<div class="warn"><p>Le signe − devant un nombre veut dire « l’opposé de ». Donc −(−7) = 7 : l’opposé de −7 est 7. Et −<i>a</i> n’est pas toujours négatif : si <i>a</i> = −4, alors −<i>a</i> = 4.</p></div>`,
  params:[{id:'a',l:'Abscisse de A',min:-8,max:8,v:3}],
  draw:v=>oppFig(v.a),
  info:v=>`A est en ${fmt(v.a)}, son opposé B est en ${fmt(-v.a)}. Distance à zéro : ${Math.abs(v.a)}. ${fmt(v.a)} + ${par(-v.a)} = 0.`},
 {kind:'Théorie',h:'Comparer des nombres relatifs',p:`<p>Il fait −7 °C à Saint-Moritz et −2 °C à Lausanne. Où fait-il le plus froid ? À Saint-Moritz, bien sûr. Donc −7 est plus petit que −2, même si 7 est plus grand que 2.</p>
<div class="prop"><p>Sur la droite graduée, de deux nombres, le <b>plus grand est le plus à droite</b>. Donc : un positif est toujours plus grand qu’un négatif. De deux négatifs, le plus grand est celui qui est le <b>plus proche de zéro</b>.</p></div>
<div class="def"><p>Le signe &lt; se lit « est plus petit que », le signe &gt; « est plus grand que ». La pointe est toujours tournée vers le plus petit nombre. <b>Ordre croissant</b> : du plus petit au plus grand. <b>Ordre décroissant</b> : du plus grand au plus petit.</p></div>
<div class="ex"><p>−7 &lt; −2, car −7 est plus à gauche. 3 &gt; −8. Pour ranger −4 ; 3 ; −1,5 ; 0 ; −6 dans l’ordre croissant, on les place de gauche à droite : −6 &lt; −4 &lt; −1,5 &lt; 0 &lt; 3.</p></div>
<div class="warn"><p>Ne compare pas les distances à zéro pour des négatifs : −7 est plus loin de 0 que −2, et c’est justement pour ça qu’il est plus petit.</p></div>`,
  fig:(()=>{ const P=nl(-8,5,{h:110,y1:2}); [[-7,'−7'],[-2,'−2'],[0,'0'],[3,'3']].forEach(([x,l])=>P.dot(x,0,{c:x<0?'var(--bad)':'var(--ok)',l,dx:-5,dy:-12}));
   P.arrow(-6,1.4,4.5,1.4,{c:'var(--accent)',w:2,hs:10}).text(-.8,1.4,'de plus en plus grand',{a:'middle',dy:-6,s:11,c:'var(--accent)'}); return P.svg(); })()},
 {kind:'Méthode',h:'Ranger, encadrer et arrondir',p:'<b>Quand :</b> ranger des températures, des scores, ou donner une valeur approchée d’un nombre négatif. <b>Pourquoi ça marche :</b> tout se lit sur la droite graduée, où plus à droite veut dire plus grand. <b>Comment :</b> pour <b>ranger</b>, mets d’abord les négatifs (du plus loin de zéro au plus proche), puis 0, puis les positifs. Pour <b>encadrer</b> un nombre entre deux entiers qui se suivent, cherche l’entier juste à sa gauche et celui juste à sa droite. Pour <b>arrondir</b> à l’unité, choisis celui des deux qui est le plus proche.',
  demo:{enonce:'Ranger −2,4 ; 1,8 ; −2,9 ; 0,5 ; −1 dans l’ordre croissant, puis encadrer et arrondir −2,4 à l’unité.',
   etapes:[
    {f:'Négatifs : −2,9 &lt; −2,4 &lt; −1',w:'Le plus loin de zéro est le plus petit : −2,9, puis −2,4, puis −1.'},
    {f:'−2,9 &lt; −2,4 &lt; −1 &lt; 0,5 &lt; 1,8',w:'On ajoute les positifs à droite, du plus petit au plus grand.'},
    {f:'−3 &lt; −2,4 &lt; −2',w:'Sur la droite, −2,4 est entre −3 (à sa gauche) et −2 (à sa droite).'},
    {f:'Arrondi à l’unité : −2',w:'−2,4 est à 0,4 de −2 et à 0,6 de −3 : −2 est le plus proche.'}],
   conclusion:'Ordre croissant : −2,9 &lt; −2,4 &lt; −1 &lt; 0,5 &lt; 1,8. −2,4 est encadré par −3 et −2, et son arrondi à l’unité est −2.'},
  note:'Au dixième, c’est pareil avec les dixièmes : −5,47 est entre −5,5 et −5,4, plus proche de −5,5. Son arrondi au dixième est −5,5.'},
 {h:'À toi : ranger',p:'Quel est le rangement de −3,5 ; 2 ; −7 ; −0,5 dans l’ordre croissant ?',
  opts:['−0,5 &lt; −3,5 &lt; −7 &lt; 2','−7 &lt; −3,5 &lt; −0,5 &lt; 2','2 &lt; −0,5 &lt; −3,5 &lt; −7','−3,5 &lt; −7 &lt; −0,5 &lt; 2'],ans:1,
  why:'Le plus loin de zéro à gauche est −7, puis −3,5, puis −0,5, enfin le positif 2 : −7 &lt; −3,5 &lt; −0,5 &lt; 2.'},
 {kind:'Théorie',h:'Additionner et soustraire sur la droite',p:`<p>Il fait −4 °C au lever du soleil, puis la température monte de 7 degrés. Combien fait-il ? On part de −4 et on avance de 7 vers la droite : on arrive à 3.</p>
<div class="prop"><p><b>Additionner</b> un nombre positif, c’est avancer vers la droite. Additionner un nombre <b>négatif</b>, c’est reculer vers la gauche. <b>Soustraire un nombre, c’est additionner son opposé</b> : <i>a</i> − <i>b</i> = <i>a</i> + (−<i>b</i>).</p></div>
<div class="why"><p>Pense à ton argent. Ajouter une dette de 5 CHF fait baisser ton avoir : 2 + (−5) = −3. Et si on t’enlève une dette de 5 CHF, tu es plus riche de 5 : −3 − (−5) = −3 + 5 = 2. Retirer une dette, c’est comme recevoir de l’argent.</p></div>
<div class="ex"><p>−4 + 7 = 3. 2 + (−5) = −3. −3 − 2 = −3 + (−2) = −5. −3 − (−8) = −3 + 8 = 5. Choisis le calcul avec les curseurs (opération 0 pour +, 1 pour −) et regarde la flèche.</p></div>
<div class="warn"><p>On écrit le nombre négatif entre parenthèses quand il suit un signe d’opération : 2 + (−5), et non 2 + −5.</p></div>`,
  params:[{id:'a',l:'Départ a',min:-6,max:6,v:-4},{id:'b',l:'Nombre b',min:-6,max:6,v:6},{id:'op',l:'Opération (0 : +, 1 : −)',min:0,max:1,v:0}],
  draw:v=>addFig(v.a,v.b,v.op),
  info:v=>v.op?`${fmt(v.a)} − ${par(v.b)} = ${fmt(v.a)} + ${par(-v.b)} = <b>${fmt(v.a-v.b)}</b>`:`${fmt(v.a)} + ${par(v.b)} = <b>${fmt(v.a+v.b)}</b>`},
 {kind:'Méthode',h:'Calculer de tête une somme de relatifs',p:'<b>Quand :</b> pour additionner ou soustraire des relatifs sans dessiner la droite, de −100 à +100. <b>Pourquoi ça marche :</b> avancer et reculer sur la droite. Deux nombres de même signe vont dans le même sens : leurs distances s’ajoutent. De signes contraires, ils se compensent : on soustrait les distances. <b>Comment :</b> 1) transforme chaque soustraction en addition de l’opposé ; 2) <b>même signe</b> : additionne les distances à zéro et garde le signe ; 3) <b>signes contraires</b> : soustrais la petite distance de la grande et prends le signe de celui qui est le plus loin de zéro. Dans une longue somme, regroupe les positifs d’un côté et les négatifs de l’autre.',
  demo:{enonce:'Calculer a) −7 + 4 ; b) −15 + (−25) ; c) 12 − (−8) ; d) −8 + 13 − 5 + (−12) + 7.',
   etapes:[
    {f:'a) −7 + 4 = −3',w:'Signes contraires : 7 − 4 = 3, et −7 est le plus loin de zéro, donc le résultat est négatif.'},
    {f:'b) −15 + (−25) = −40',w:'Même signe : 15 + 25 = 40, et on garde le signe −.'},
    {f:'c) 12 − (−8) = 12 + 8 = 20',w:'Soustraire −8, c’est ajouter son opposé 8.'},
    {f:'d) positifs : 13 + 7 = 20 ; négatifs : −8 − 5 − 12 = −25',w:'On regroupe grâce à la commutativité.'},
    {f:'20 + (−25) = −5',w:'Signes contraires : 25 − 20 = 5, le négatif l’emporte.'}],
   conclusion:'−3, −40, 20 et −5.'},
  note:'<b>Astuce :</b> cherche les opposés qui s’annulent. −17 + 9 + 17 = 9, car −17 + 17 = 0.'},
 {kind:'Pratique',h:'La température monte',p:'À 6 h du matin, il fait −6 °C. À 14 h, il fait 3 °C. Règle la variation de température entre 6 h et 14 h.',
  params:[{id:'b',l:'Variation (°C)',min:-12,max:12,v:0}],
  draw:v=>{ const P=nl(-20,10,{lab:5,h:120,y1:2.2}); P.dot(-6,0,{c:'var(--spark)',l:'6 h',dx:-8,dy:-12}).dot(3,0,{c:'var(--ok)',r:5}).text(3,0,'14 h',{a:'middle',dy:-12,s:10,c:'var(--ok)'});
    P.arrow(-6,1.1,-6+v.b,1.1,{c:v.b>=0?'var(--ok)':'var(--bad)',w:3,hs:10}).dot(-6+v.b,0,{c:'var(--accent)',r:5}); return P.svg(); },
  info:v=>`−6 + ${par(v.b)} = ${fmt(-6+v.b)} °C`,
  ok:v=>v.b===9,why:'La variation est l’arrivée moins le départ : 3 − (−6) = 3 + 6 = 9. La température a monté de 9 degrés.'},
 {kind:'Théorie',h:'Multiplier et diviser : la règle des signes',p:`<p>Tu dois 3 CHF à chacun de tes 4 amis. Ta dette totale est 4 × (−3) = (−3) + (−3) + (−3) + (−3) = −12. Mais que vaut (−4) × (−3) ?</p>
<div class="prop"><p><b>Règle des signes.</b> Le produit de deux nombres de <b>même signe</b> est <b>positif</b>. Le produit de deux nombres de <b>signes contraires</b> est <b>négatif</b>. On multiplie les distances à zéro, puis on met le signe. Pour la <b>division</b>, c’est la même règle.</p></div>
<div class="why"><p>Regarde la suite : 4 × (−3) = −12, 3 × (−3) = −9, 2 × (−3) = −6, 1 × (−3) = −3, 0 × (−3) = 0. Chaque fois que le premier facteur baisse de 1, le produit <b>monte</b> de 3. Si on continue : (−1) × (−3) = 3, (−2) × (−3) = 6. Bouge le curseur pour prolonger la suite. Pour la division : (−12) : 3 = −4, car 3 × (−4) = −12, et (−12) : (−3) = 4, car (−3) × 4 = −12.</p></div>
<div class="ex"><p>5 × (−6) = −30. (−5) × (−6) = 30. (−20) : 4 = −5. (−20) : (−4) = 5.</p></div>
<div class="warn"><p>Ne confonds pas avec l’addition : (−3) + (−5) = −8, mais (−3) × (−5) = 15.</p></div>`,
  params:[{id:'k',l:'Facteur k',min:-4,max:4,v:3}],
  draw:v=>multFig(v.k),
  info:v=>`${par(v.k)} × (−3) = <b>${fmt(v.k*-3)}</b>${v.k<0?' : deux facteurs négatifs, produit positif.':v.k>0?' : signes contraires, produit négatif.':''}`},
 {kind:'Méthode',h:'Calculer un produit ou un quotient de relatifs',p:'<b>Quand :</b> un calcul contient des multiplications ou des divisions de relatifs, parfois mélangées à des additions. <b>Pourquoi ça marche :</b> chaque paire de facteurs négatifs donne un produit positif. Donc un nombre <b>pair</b> de facteurs négatifs (2, 4, 6…) donne un résultat positif, et un nombre <b>impair</b> (1, 3, 5…) un résultat négatif. <b>Comment :</b> 1) compte les facteurs négatifs pour trouver le signe ; 2) multiplie ou divise les distances à zéro. Dans un calcul mélangé, les priorités restent les mêmes qu’au chapitre « Calculer malin » : parenthèses, puis × et :, puis + et −.',
  demo:{enonce:'Calculer a) (−6) × (−7) ; b) (−2) × 5 × (−3) × (−1) ; c) (−48) : 6 ; d) 20 − 3 × (−4).',
   etapes:[
    {f:'a) (−6) × (−7) = 42',w:'Deux facteurs négatifs : produit positif. 6 × 7 = 42.'},
    {f:'b) (−2) × 5 × (−3) × (−1) = −30',w:'Trois facteurs négatifs, un nombre impair : résultat négatif. 2 × 5 × 3 × 1 = 30.'},
    {f:'c) (−48) : 6 = −8',w:'Signes contraires : quotient négatif. 48 : 6 = 8.'},
    {f:'d) 20 − 3 × (−4) = 20 − (−12) = 20 + 12 = 32',w:'La multiplication d’abord : 3 × (−4) = −12. Puis soustraire −12, c’est ajouter 12.'}],
   conclusion:'42, −30, −8 et 32.'}},
 {h:'À toi : signes et priorités',p:'Calcule (−5) × 4 − (−36) : (−9).',lab:'résultat :',ans:-24,
  why:'Produits et quotients d’abord : (−5) × 4 = −20 et (−36) : (−9) = 4. Puis −20 − 4 = −24.'},
 {kind:'Théorie',h:'Le repère du plan',p:`<p>Dans une bataille navale ou sur la carte d’un jeu, on repère une case avec deux informations : une colonne et une ligne. En maths, on fait pareil avec deux droites graduées.</p>
<div class="def"><p>Un <b>repère du plan</b> est formé de deux droites graduées perpendiculaires qui se coupent en leur zéro, l’<b>origine</b> O. L’axe horizontal est l’axe des <b>abscisses</b>, l’axe vertical celui des <b>ordonnées</b>. Un point M est repéré par ses <b>coordonnées</b> (<i>x</i> ; <i>y</i>) : d’abord l’abscisse, ensuite l’ordonnée. Les axes découpent le plan en <b>quatre quadrants</b>, numérotés du 1er au 4e en tournant à partir d’en haut à droite.</p></div>
<div class="idea"><p>Les signes des coordonnées disent le quadrant : (+ ; +) au 1er, (− ; +) au 2e, (− ; −) au 3e, (+ ; −) au 4e. Bouge le point M.</p></div>
<div class="ex"><p>A(3 ; 2) est au 1er quadrant, B(−4 ; 1) au 2e, C(−2 ; −3) au 3e, D(1 ; −4) au 4e. Le point (0 ; 3) est sur l’axe des ordonnées : il n’est dans aucun quadrant.</p></div>
<div class="warn"><p>L’ordre compte : (2 ; 5) et (5 ; 2) sont deux points différents.</p></div>
${sdx}<p>On raconte que René Descartes, au 17e siècle, a eu l’idée du repère en regardant une mouche se promener au plafond : deux nombres suffisent pour dire où elle est.</p></div>`,
  params:[{id:'x',l:'Abscisse x',min:-5,max:5,v:3},{id:'y',l:'Ordonnée y',min:-5,max:5,v:2}],
  draw:v=>repere(v.x,v.y),
  info:v=>{ const q=quad(v.x,v.y); return `M(${fmt(v.x)} ; ${fmt(v.y)}) ${q?`est dans le <b>${q} quadrant</b>`:v.x===0&&v.y===0?'est l’origine O':'est sur un axe : il n’est dans aucun quadrant'}.`; }},
 {kind:'Méthode',h:'Placer et lire un point',p:'<b>Quand :</b> pour dessiner un point dont on connaît les coordonnées, ou pour trouver les coordonnées d’un point dessiné. <b>Pourquoi ça marche :</b> l’abscisse dit de combien on se déplace horizontalement depuis O, l’ordonnée de combien on se déplace verticalement. <b>Comment placer :</b> pars de O, avance de l’abscisse (à droite si elle est positive, à gauche si elle est négative), puis monte ou descends de l’ordonnée. <b>Comment lire :</b> descends ou monte du point jusqu’à l’axe horizontal pour lire l’abscisse, puis va à l’axe vertical pour lire l’ordonnée. Écris toujours (abscisse ; ordonnée).',
  demo:{enonce:'a) Placer E(−3 ; 4). b) Le point F est 2 carreaux à droite de O et 5 carreaux plus bas. Donner ses coordonnées.',
   etapes:[
    {f:'a) De O, 3 carreaux vers la gauche',w:'L’abscisse −3 est négative : on va à gauche.'},
    {f:'Puis 4 carreaux vers le haut : c’est E, dans le 2e quadrant',w:'L’ordonnée 4 est positive : on monte. Signes (− ; +) : 2e quadrant.'},
    {f:'b) À droite de 2 : abscisse 2 ; plus bas de 5 : ordonnée −5',w:'Vers le bas, l’ordonnée est négative.'}],
   conclusion:'E(−3 ; 4) est en haut à gauche, et F(2 ; −5), dans le 4e quadrant.'},
  note:'Le point dont les deux coordonnées sont les opposées, par exemple (3 ; −4) et (−3 ; 4), est le symétrique par rapport à l’origine O.'},
 {kind:'Pratique',h:'Place le point',p:'Place le point P dont l’abscisse est l’opposé de 4 et dont l’ordonnée vaut 2 de plus que −5.',
  params:[{id:'x',l:'Abscisse x',min:-5,max:5,v:2},{id:'y',l:'Ordonnée y',min:-5,max:5,v:1}],
  draw:v=>repere(v.x,v.y,'P'),
  info:v=>`P(${fmt(v.x)} ; ${fmt(v.y)})`,
  ok:v=>v.x===-4&&v.y===-3,why:'L’opposé de 4 est −4, et −5 + 2 = −3. Donc P(−4 ; −3), dans le 3e quadrant.'},
 {kind:'Défi',h:'La pyramide des relatifs',p:'Dans cette pyramide, chaque brique est la somme des deux briques posées juste en dessous. Quel nombre faut-il écrire dans la brique « ? » pour que le sommet vaille −10 ?',fig:pyrFig,lab:'? =',ans:-7,
  why:'Ici, faire des essais et observer marche bien. Avec 0 dans « ? », les étages donnent 3, 7, −6, puis 10, 1, puis 11 au sommet. Chaque fois qu’on baisse « ? » de 1, le sommet baisse de 3. Il faut passer de 11 à −10, soit baisser de 21 = 3 × 7 : « ? » vaut −7. Contrôle : 3, 0, −13, puis 3, −13, puis −10.'},
 {kind:'Récapitulatif',h:'Ce qu’il faut retenir',p:`<div class="keep"><ul>
<li>Un <b>nombre relatif</b> a un signe et une distance à zéro. Les négatifs sont à gauche de 0 sur la droite graduée.</li>
<li>Deux <b>opposés</b> sont à la même distance de 0, de part et d’autre. Leur somme vaut 0. −(−7) = 7.</li>
<li>Le plus grand nombre est le <b>plus à droite</b>. De deux négatifs, le plus grand est le plus proche de 0 : −2 &gt; −7.</li>
<li>Encadrer entre deux entiers qui se suivent, arrondir au plus proche : −3 &lt; −2,4 &lt; −2, arrondi −2.</li>
<li><b>Additionner</b> : même signe, on ajoute les distances ; signes contraires, on les soustrait et on prend le signe du plus éloigné de 0. <b>Soustraire</b> = additionner l’opposé.</li>
<li><b>Multiplier, diviser</b> : même signe, résultat positif ; signes contraires, négatif. Un nombre impair de facteurs négatifs donne un résultat négatif.</li>
<li><b>Repère</b> : M(<i>x</i> ; <i>y</i>), abscisse puis ordonnée. Quadrants : (+ ; +) 1er, (− ; +) 2e, (− ; −) 3e, (+ ; −) 4e.</li>
</ul></div>`},
 {kind:'Problème',h:'Le bulletin météo de la station',
  p:'Chaque matin à 7 h, la station de ski relève la température. Cette semaine, elle a noté : lundi −8 °C, mardi −3 °C, mercredi 2 °C, jeudi −5 °C, vendredi −1 °C. Pour le bulletin, on veut le jour le plus froid, l’écart entre le jour le plus chaud et le plus froid, et la température moyenne. La moyenne est la somme des températures divisée par le nombre de jours.',
  parts:[
   {q:'a) Quel jour a-t-il fait le plus froid ?',opts:['jeudi','lundi','mardi','vendredi'],ans:1,hint:'Le plus froid est le plus petit nombre, le plus à gauche sur la droite graduée.',why:'−8 est le plus petit : −8 &lt; −5 &lt; −3 &lt; −1 &lt; 2. C’est lundi.'},
   {q:'b) Quel est l’écart entre la température la plus haute et la plus basse ?',unit:'°C',ans:10,hint:'L’écart est la plus haute moins la plus basse.',why:'2 − (−8) = 2 + 8 = 10 °C.'},
   {q:'c) Quelle est la somme des cinq températures ?',unit:'°C',ans:-15,hint:'Regroupe les négatifs, puis ajoute le positif.',why:'Négatifs : −8 − 3 − 5 − 1 = −17. Puis −17 + 2 = −15.'},
   {q:'d) Quelle est la température moyenne ?',unit:'°C',ans:-3,hint:'Divise la somme par 5, avec la règle des signes.',why:'(−15) : 5 = −3 °C.'}],
  sol:'On range les températures : −8 &lt; −5 &lt; −3 &lt; −1 &lt; 2. Le jour le plus froid est lundi (−8 °C), le plus chaud mercredi (2 °C). L’écart vaut 2 − (−8) = 2 + 8 = 10 °C. La somme vaut −8 + (−3) + 2 + (−5) + (−1) : les négatifs donnent −17, puis −17 + 2 = −15. La moyenne est (−15) : 5 = −3 °C : signes contraires, quotient négatif. Réponse : lundi, un écart de 10 °C et une moyenne de −3 °C.'},
 {kind:'Problème',h:'La chasse au trésor',
  p:'La carte d’une chasse au trésor est un repère où 1 carreau représente 10 m. Le départ est au point D(−4 ; −2). La première consigne dit : « Ajoute 7 à ton abscisse et 5 à ton ordonnée. » Tu arrives au point A. La deuxième dit : « Ajoute −6 à ton abscisse et −8 à ton ordonnée. » Tu arrives au point B. Le trésor T a pour coordonnées les opposées de celles de B. On ne marche que le long des lignes du quadrillage.',
  fig:repere(-4,-2,'D'),
  parts:[
   {q:'a) Quelles sont les coordonnées de A ?',opts:['(−11 ; −7)','(3 ; −3)','(3 ; 3)','(7 ; 5)'],ans:2,hint:'Calcule −4 + 7, puis −2 + 5.',why:'−4 + 7 = 3 et −2 + 5 = 3, donc A(3 ; 3).'},
   {q:'b) Dans quel quadrant se trouve B ?',opts:['1er','2e','3e','4e'],ans:2,hint:'Calcule d’abord les coordonnées de B à partir de A, puis regarde leurs signes.',why:'3 + (−6) = −3 et 3 + (−8) = −5 : B(−3 ; −5). Deux coordonnées négatives : 3e quadrant.'},
   {q:'c) Quelle est l’ordonnée du trésor T ?',lab:'y =',ans:5,hint:'L’ordonnée de T est l’opposé de celle de B.',why:'L’ordonnée de B est −5, son opposé est 5 : T(3 ; 5).'},
   {q:'d) Quelle distance as-tu parcourue de D à B ?',unit:'m',ans:260,hint:'Additionne les distances à zéro de chaque déplacement (7, 5, −6, −8), en carreaux, puis convertis.',why:'7 + 5 + 6 + 8 = 26 carreaux, soit 26 × 10 = 260 m.'}],
  sol:'De D(−4 ; −2), on ajoute 7 et 5 : A(−4 + 7 ; −2 + 5) = A(3 ; 3). Puis on ajoute −6 et −8 : B(3 + (−6) ; 3 + (−8)) = B(−3 ; −5), dans le 3e quadrant car ses deux coordonnées sont négatives. Le trésor a les coordonnées opposées : T(3 ; 5), dans le 1er quadrant. Pour la distance, un déplacement de −6 compte pour 6 carreaux (sa distance à zéro) : 7 + 5 + 6 + 8 = 26 carreaux, soit 260 m. Réponse : A(3 ; 3), B au 3e quadrant, T(3 ; 5) et 260 m parcourus.'},
]},
);
})();
