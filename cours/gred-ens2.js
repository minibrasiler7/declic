/* Déclic — Notions fondamentales : le langage des ensembles (2) */
(()=>{
/* ---------- helpers locaux (rien ne sort de cette IIFE) ---------- */
const yPos=(n,i)=>n===1?3.2:5.4-i*(4.6/(n-1));
// Diagramme sagittal d’une relation de E vers F : pairs = [[i, j], …] (indice dans E, indice dans F)
function sagR(E,Fs,pairs,o={}){
  const xE=o.xE??2.4, xF=o.xF??7.6, P=plane({x:[0,10],y:[0,6.6],grid:false,axes:false}), hl=o.hl||[];
  P.rect(xE-0.8,0.5,1.6,5.6,{c:'var(--muted)',w:1.5}).rect(xF-0.8,0.5,1.6,5.6,{c:'var(--muted)',w:1.5});
  pairs.forEach(([i,j],k)=>P.arrow(xE+0.2,yPos(E.length,i),xF-0.25,yPos(Fs.length,j),{c:hl.includes(k)?'var(--spark)':(o.c||'var(--math)'),w:2,hs:9}));
  E.forEach((e,i)=>P.dot(xE,yPos(E.length,i),{r:5,c:'var(--ink)'}).text(xE,yPos(E.length,i),e,{a:'end',dx:-9,dy:5,s:12}));
  Fs.forEach((e,j)=>{ const hit=pairs.some(p=>p[1]===j); P.dot(xF,yPos(Fs.length,j),{r:5,c:hit?'var(--spark)':'var(--muted)'}).text(xF,yPos(Fs.length,j),e,{dx:9,dy:5,s:12}); });
  P.text(xE,0.5,o.lE||'E',{a:'middle',dy:16,c:'var(--muted)'}).text(xF,0.5,o.lF||'F',{a:'middle',dy:16,c:'var(--muted)'});
  return P.svg();
}
// Grille booléenne : lignes = départ, colonnes = arrivée, M[i][j] = 1 si le couple est dans le graphe
function grilleB(R,C,M,o={}){
  const cw=Math.min(42,Math.floor(250/C.length)), x0=60, y0=36, W=320, H=y0+R.length*cw+10;
  let s=`<svg viewBox="0 0 ${W} ${H}" width="${W}" role="img">`;
  s+=`<text x="${x0-10}" y="${y0-12}" font-size="11" text-anchor="end" fill="var(--muted)">${o.corner||'x \\ y'}</text>`;
  C.forEach((c,j)=>{ s+=`<text x="${x0+j*cw+cw/2}" y="${y0-10}" font-size="13" font-weight="700" text-anchor="middle" fill="var(--muted)">${c}</text>`; });
  R.forEach((r,i)=>{ s+=`<text x="${x0-10}" y="${y0+i*cw+cw/2+5}" font-size="13" font-weight="700" text-anchor="end" fill="var(--muted)">${r}</text>`;
    C.forEach((c,j)=>{ const on=M[i][j], hl=o.hl&&o.hl(i,j);
      s+=`<rect x="${x0+j*cw+2}" y="${y0+i*cw+2}" width="${cw-4}" height="${cw-4}" rx="5" fill="${on?(o.col?o.col(i,j):(o.c||'var(--accent)')):'var(--surface)'}" fill-opacity="${on?.8:1}" stroke="${hl?'var(--spark)':'var(--line)'}" stroke-width="${hl?3:1.5}"/>`; }); });
  if(o.diag) s+=`<line x1="${x0}" y1="${y0}" x2="${x0+C.length*cw}" y2="${y0+R.length*cw}" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="5 4"/>`;
  return s+'</svg>';
}
// Graphe orienté d’une relation binaire sur un ensemble : has(i, j) vrai si i R j
function graphe(L,has,o={}){
  const n=L.length, P=plane({x:[-3.2,3.2],y:[-2.5,2.5],grid:false,axes:false}), R0=o.R||1.75, rn=0.28;
  const pos=o.pos||L.map((_,i)=>{ const a=Math.PI/2+(n===3?0:0)-2*Math.PI*i/n; return [R0*Math.cos(a)*1.15,R0*Math.sin(a)*0.92+(n===3?-0.2:0)]; });
  for(let i=0;i<n;i++) for(let j=0;j<n;j++) if(has(i,j)){
    const col=o.col?o.col(i,j):'var(--math)';
    if(i===j){ const [x,y]=pos[i], r=Math.hypot(x,y)||1; P.circ(x+x/r*0.46,y+y/r*0.46,0.24,{c:col,w:2.2}); }
    else { const [x1,y1]=pos[i],[x2,y2]=pos[j], d=Math.hypot(x2-x1,y2-y1), ux=(x2-x1)/d, uy=(y2-y1)/d, off=has(j,i)?0.09:0;
      P.arrow(x1+ux*(rn+0.04)-uy*off,y1+uy*(rn+0.04)+ux*off,x2-ux*(rn+0.06)-uy*off,y2-uy*(rn+0.06)+ux*off,{c:col,w:2.2,hs:10}); } }
  pos.forEach(([x,y],i)=>{ P.circ(x,y,rn,{fill:'var(--surface)',fo:1,c:o.nc?o.nc(i):'var(--ink)',w:2}); P.text(x,y,L[i],{a:'middle',dy:5,s:13}); });
  return P.svg();
}
// Les quatre propriétés d’une relation sur {0, …, n − 1}, avec un témoin quand elles échouent
function props(n,has,L){
  const I=[...Array(n).keys()]; let nr=null, ns=null, na=null, nt=null;
  for(const i of I){ if(nr===null&&!has(i,i)) nr=i;
    for(const j of I){ if(!ns&&has(i,j)&&!has(j,i)) ns=[i,j]; if(!na&&i!==j&&has(i,j)&&has(j,i)) na=[i,j];
      for(const k of I) if(!nt&&has(i,j)&&has(j,k)&&!has(i,k)) nt=[i,j,k]; } }
  const ok=t=>`<b style="color:var(--ok)">oui</b>`, no=t=>`<b style="color:var(--bad)">non</b> (${t})`;
  return {r:nr===null,s:!ns,a:!na,t:!nt,
    html:`Réflexive : ${nr===null?ok():no('pas de boucle en '+L[nr])}<br>Symétrique : ${!ns?ok():no(L[ns[0]]+' R '+L[ns[1]]+' sans retour')}<br>Antisymétrique : ${!na?ok():no('aller-retour '+L[na[0]]+' ⇄ '+L[na[1]])}<br>Transitive : ${!nt?ok():no(L[nt[0]]+' R '+L[nt[1]]+' et '+L[nt[1]]+' R '+L[nt[2]]+', mais pas '+L[nt[0]]+' R '+L[nt[2]])}`};
}
const L3=['1','2','3'];
// Diagrammes de Hasse : lv[i] = niveau (hauteur), cover(i, j) vrai si j couvre i (trait de i vers le haut jusqu’à j)
function hasse(L,lv,cover,o={}){
  const n=L.length, mx=Math.max(...lv), H=o.h||Math.min(300,mx*62+64), P=plane({x:[0,10],y:[-0.5,mx+0.5],w:320,h:H,grid:false,axes:false}), pos=[];
  for(let l=0;l<=mx;l++){ const ids=L.map((_,i)=>i).filter(i=>lv[i]===l), m=ids.length, sp=Math.min(2.6,9/Math.max(m,1)); ids.forEach((i,k)=>{ pos[i]=[5+(k-(m-1)/2)*sp,l]; }); }
  for(let i=0;i<n;i++) for(let j=0;j<n;j++) if(cover(i,j)) P.seg(pos[i][0],pos[i][1],pos[j][0],pos[j][1],{c:'var(--muted)',w:2});
  pos.forEach(([x,y],i)=>{ const f=o.fill?o.fill(i):null; P.dot(x,y,{r:15,c:o.ring&&o.ring(i)?'var(--spark)':'var(--ink)'}).dot(x,y,{r:12.5,c:f||'var(--surface)'}).text(x,y,L[i],{a:'middle',dy:4.5,s:L[i].length>3?10:12}); });
  return P.svg();
}
const divs=n=>{ const d=[]; for(let k=1;k<=n;k++) if(n%k===0) d.push(k); return d; };
const isPr=p=>{ if(p<2) return false; for(let k=2;k*k<=p;k++) if(p%k===0) return false; return true; };
const omega=n=>{ let c=0,m=n; for(let p=2;p*p<=m;p++) while(m%p===0){ m/=p; c++; } return c+(m>1?1:0); };
const hasseDiv=(n,o={})=>{ const D=divs(n); return hasse(D.map(String),D.map(omega),(i,j)=>D[j]%D[i]===0&&isPr(D[j]/D[i]),o); };
const nAretes=n=>{ const D=divs(n); let c=0; D.forEach(a=>D.forEach(b=>{ if(b%a===0&&isPr(b/a)) c++; })); return c; };
const gcd=(a,b)=>b?gcd(b,a%b):a, lcm=(a,b)=>a/gcd(a,b)*b;
// Éléments remarquables d’une partie A d’un ensemble ordonné fini (all, le)
function remarq(A,all,le){
  const min=A.filter(a=>!A.some(b=>b!==a&&le(b,a))), max=A.filter(a=>!A.some(b=>b!==a&&le(a,b)));
  const pp=A.filter(a=>A.every(b=>le(a,b))), pg=A.filter(a=>A.every(b=>le(b,a)));
  const maj=all.filter(m=>A.every(a=>le(a,m))), mino=all.filter(m=>A.every(a=>le(m,a)));
  const sup=maj.filter(m=>maj.every(x=>le(m,x))), inf=mino.filter(m=>mino.every(x=>le(x,m)));
  return {min,max,pp,pg,maj,mino,sup,inf};
}
const lst=a=>a.length?'{'+a.join(' ; ')+'}':'∅', un=a=>a.length?String(a[0]):'aucun';
// Horloge de ℤ/nℤ : n positions sur un cercle, hl(k) pour colorer, hand = position de l’aiguille
function horloge(n,o={}){
  const P=plane({x:[-1.6,1.6],y:[-1.45,1.45],grid:false,axes:false}); P.circ(0,0,1,{c:'var(--line)',w:2});
  if(o.hand!==undefined){ const a=Math.PI/2-2*Math.PI*o.hand/n; P.arrow(0,0,0.78*Math.cos(a),0.78*Math.sin(a),{c:'var(--math)',w:3,hs:10}); }
  for(let k=0;k<n;k++){ const a=Math.PI/2-2*Math.PI*k/n, x=Math.cos(a), y=Math.sin(a), h=o.hl&&o.hl(k);
    P.dot(x,y,{r:h?10:6,c:h?(o.c||'var(--spark)'):'var(--muted)'}).text(1.25*x,1.25*y,o.lab?o.lab(k):String(k),{a:'middle',dy:5,s:13,c:h?'var(--ink)':'var(--muted)'}); }
  return P.svg();
}
const COLS=['var(--accent)','var(--math)','var(--spark)','var(--bad)','var(--ok)','var(--code)'];
const mod=(a,n)=>((a%n)+n)%n;
// Table d’une loi : L = noms des éléments, val(i, j) = indice du résultat dans L
function tableL(L,val,o={}){
  const n=L.length, cw=Math.min(40,Math.floor(262/(n+1))), x0=54, y0=38, W=320, H=y0+n*cw+10;
  let s=`<svg viewBox="0 0 ${W} ${H}" width="${W}" role="img"><text x="${x0-12}" y="${y0-12}" font-size="14" font-weight="700" text-anchor="end" fill="var(--math)">${o.op||'∗'}</text>`;
  L.forEach((l,j)=>{ s+=`<text x="${x0+j*cw+cw/2}" y="${y0-10}" font-size="12" font-weight="700" text-anchor="middle" fill="var(--muted)">${l}</text>`; });
  L.forEach((l,i)=>{ s+=`<text x="${x0-10}" y="${y0+i*cw+cw/2+5}" font-size="12" font-weight="700" text-anchor="end" fill="var(--muted)">${l}</text>`;
    L.forEach((m,j)=>{ const r=val(i,j); s+=`<rect x="${x0+j*cw+1.5}" y="${y0+i*cw+1.5}" width="${cw-3}" height="${cw-3}" rx="4" fill="${o.hl&&o.hl(r)?'var(--spark)':COLS[r%6]}" fill-opacity="${o.hl&&o.hl(r)?.6:.22}"/><text x="${x0+j*cw+cw/2}" y="${y0+i*cw+cw/2+5}" font-size="${L[r].length>3?10:13}" font-weight="700" text-anchor="middle" fill="var(--ink)">${L[r]}</text>`; }); });
  return s+'</svg>';
}
const cant=(a,b)=>(a+b)*(a+b+1)/2+b, cantInv=k=>{ const s=Math.floor((Math.sqrt(8*k+1)-1)/2), b=k-s*(s+1)/2; return [s-b,b]; };
// Grille de ℕ × ℕ parcourue en diagonale jusqu’au numéro k
function diagNN(k,o={}){
  const P=plane({x:[-0.9,6.8],y:[-1.1,6.8],grid:false,axes:false}), pts=[];
  P.arrow(-0.5,-0.5,6.7,-0.5,{c:'var(--muted)',w:1.5,hs:8}).arrow(-0.5,-0.5,-0.5,6.7,{c:'var(--muted)',w:1.5,hs:8});
  for(let i=0;i<=6;i++){ P.text(i,-0.5,String(i),{a:'middle',dy:16,c:'var(--muted)',s:11}).text(-0.5,i,String(i),{a:'end',dx:-6,dy:4,c:'var(--muted)',s:11}); }
  for(let j=0;j<=Math.max(k,0);j++) pts.push(cantInv(j));
  for(let j=1;j<pts.length;j++){ const [a0,b0]=pts[j-1],[a1,b1]=pts[j], same=a0+b0===a1+b1; P.seg(a0,b0,a1,b1,same?{c:'var(--accent)',w:3}:{c:'var(--muted)',w:1.2,dash:1}); }
  for(let a=0;a<=6;a++) for(let b=0;b<=6;b++){ const c=cant(a,b); if(a+b<=6) P.dot(a,b,{r:c<=k?5:3,c:c<=k?'var(--accent)':'var(--muted)'}); }
  const [a,b]=cantInv(k); P.dot(a,b,{r:8,c:'var(--spark)'}).text(a,b,String(k),{dx:9,dy:-8,s:12});
  if(o.q) P.dot(o.q[0],o.q[1],{r:8,c:'var(--math)'});
  return P.svg();
}
const PSET=['∅','a','b','c','ab','ac','bc','abc'], PBITS=[0,1,2,4,3,5,6,7], bc=m=>(m&1)+(m>>1&1)+(m>>2&1);
const cell=(v,i,j)=>v['c'+(i+1)+(j+1)];
const params9=(lab)=>{ const a=[]; for(let i=1;i<=3;i++) for(let j=1;j<=3;j++) a.push({id:'c'+i+j,l:lab(i,j),min:0,max:1,v:0}); return a; };

COURS.push(
/* ===================== 1. RELATIONS ===================== */
{subj:'gred',sem:'ens',id:'gred-relations',h:'Relations',p:'Graphe, diagramme sagittal, grille, relation réciproque, puis les quatre propriétés d’une relation sur un ensemble, lues sur le dessin.',steps:[
  {h:'Une relation, c’est un graphe',p:`Une <b>relation</b> <i>R</i> de <i>E</i> vers <i>F</i> est donnée par une partie <i>G</i> du produit <i>E</i> × <i>F</i>, appelée son <b>graphe</b>. On écrit <b><i>x</i> <i>R</i> <i>y</i></b> pour dire (<i>x</i> ; <i>y</i>) ∈ <i>G</i>. Ici <i>E</i> est un groupe d’amis, <i>F</i> un ensemble d’instruments, et <i>x</i> <i>R</i> <i>y</i> signifie « <i>x</i> joue de <i>y</i> ». Le <b>diagramme sagittal</b> dessine une flèche par couple du graphe.`,
   fig:sagR(['Ana','Ben','Chloé'],['piano','guitare','violon'],[[0,0],[0,2],[2,1]]),
   note:'Une relation est très libre : Ana joue de deux instruments, Ben d’aucun, et personne ne joue du violon sauf Ana. Ce n’est pas une application, et c’est permis.'},
  {h:'Trois façons de voir la même relation',p:`On prend <i>E</i> = {2 ; 3 ; 4}, <i>F</i> = {4 ; 5 ; 6 ; 7 ; 8 ; 9} et <i>x</i> <i>R</i> <i>y</i> ⇔ « <i>x</i> divise <i>y</i> ». Fais défiler les représentations : elles contiennent exactement la même information.`,
   params:[{id:'k',l:'Représentation',min:0,max:3,v:0}],
   draw:v=>{ const E=[2,3,4], Fv=[4,5,6,7,8,9], pr=[]; E.forEach((x,i)=>Fv.forEach((y,j)=>{ if(y%x===0) pr.push([i,j]); }));
     if(v.k===0) return `<div style="font-size:15px;line-height:1.9;padding:8px 4px">G = { (2 ; 4), (2 ; 6), (2 ; 8),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(3 ; 6), (3 ; 9),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(4 ; 4), (4 ; 8) }</div>`;
     if(v.k===1) return sagR(E.map(String),Fv.map(String),pr);
     if(v.k===2) return grilleB(E.map(String),Fv.map(String),E.map(x=>Fv.map(y=>y%x===0?1:0)));
     const P=plane({x:[0,10],y:[0,5.4],grid:false,axes:false}), X=j=>1.6+j*1.5, Y=i=>1+i*1.5;
     P.arrow(0.8,0.4,9.8,0.4,{c:'var(--muted)',w:1.5,hs:8}).arrow(0.8,0.4,0.8,5.2,{c:'var(--muted)',w:1.5,hs:8});
     Fv.forEach((y,j)=>{ P.text(X(j),0.4,String(y),{a:'middle',dy:16,c:'var(--muted)',s:12}); E.forEach((x,i)=>P.dot(X(j),Y(i),{r:y%x===0?7:3,c:y%x===0?'var(--accent)':'var(--line)'})); });
     E.forEach((x,i)=>P.text(0.8,Y(i),String(x),{a:'end',dx:-6,dy:5,c:'var(--muted)',s:12}));
     return P.svg(); },
   info:v=>['<b>Liste des couples</b> : le graphe G, partie de E × F, a 7 éléments.','<b>Diagramme sagittal</b> : une flèche de x vers y quand x R y. 5 et 7 ne reçoivent aucune flèche.','<b>Grille booléenne</b> : ligne x, colonne y, case pleine si x R y. Chaque ligne liste les multiples de x.','<b>Points de E × F</b> : les gros points forment le graphe, à l’intérieur du « quadrillage » E × F.'][v.k],
   note:'La grille et le nuage de points sont la même image, à l’orientation près : le graphe est une partie de E × F, comme une courbe est une partie du plan ℝ × ℝ.'},
  {h:'Lis la grille',p:'Voici la grille d’une relation de {1 ; 2 ; 3 ; 4} vers lui-même (ligne <i>x</i>, colonne <i>y</i>). Quelle phrase la définit&nbsp;?',
   fig:grilleB(['1','2','3','4'],['1','2','3','4'],[[0,0,0,1],[0,0,1,0],[0,1,0,0],[1,0,0,0]]),
   opts:['<i>x</i> <i>R</i> <i>y</i> ⇔ <i>x</i> = <i>y</i>','<i>x</i> <i>R</i> <i>y</i> ⇔ <i>x</i> + <i>y</i> = 5','<i>x</i> <i>R</i> <i>y</i> ⇔ <i>y</i> = <i>x</i> + 1','<i>x</i> <i>R</i> <i>y</i> ⇔ <i>x</i> ≤ <i>y</i>'],ans:1,
   why:'Les cases pleines sont (1 ; 4), (2 ; 3), (3 ; 2) et (4 ; 1) : à chaque fois x + y = 5. La relation x = y remplirait la diagonale descendante.'},
  {kind:'Méthode',h:'Construire le graphe d’une relation définie par une propriété',
   p:'<b>Quand :</b> la relation est donnée par une phrase (« <i>x</i> divise <i>y</i> », « <i>y</i> &lt; <i>x</i> »…) entre deux ensembles finis. <b>Comment :</b> on parcourt <i>E</i> élément par élément ; pour chaque <i>x</i>, on cherche tous les <i>y</i> de <i>F</i> qui vérifient la propriété. Chaque <i>x</i> donne une <b>ligne</b> de la grille. <b>Contrôle :</b> le graphe est une partie de <i>E</i> × <i>F</i>, donc il a au plus card <i>E</i> · card <i>F</i> couples.',
   demo:{enonce:'<i>E</i> = {1 ; 2 ; 3}, <i>F</i> = {0 ; 1 ; 2 ; 3} et <i>x</i> <i>R</i> <i>y</i> ⇔ <i>y</i> &lt; <i>x</i>. Écris le graphe et dessine la grille.',
    etapes:[{f:'<i>x</i> = 1 : seul <i>y</i> = 0 convient. Couple (1 ; 0).',w:'On fixe x et on teste chaque y de F.'},
     {f:'<i>x</i> = 2 : <i>y</i> ∈ {0 ; 1}. Couples (2 ; 0), (2 ; 1).',w:'Même travail sur la deuxième ligne.'},
     {f:'<i>x</i> = 3 : <i>y</i> ∈ {0 ; 1 ; 2}. Couples (3 ; 0), (3 ; 1), (3 ; 2).',w:'3 n’est pas strictement inférieur à lui-même : (3 ; 3) n’est pas dans G.'},
     {f:'<i>G</i> a 1 + 2 + 3 = 6 couples, sur les 3 · 4 = 12 de <i>E</i> × <i>F</i>.',w:'On compte ligne par ligne, puis on compare au total possible.'},
     {f:grilleB(['1','2','3'],['0','1','2','3'],[[1,0,0,0],[1,1,0,0],[1,1,1,0]]),w:'Les cases pleines forment un escalier sous la diagonale : c’est la forme typique de « y &lt; x ».'}],
    conclusion:'<b>G = {(1 ; 0), (2 ; 0), (2 ; 1), (3 ; 0), (3 ; 1), (3 ; 2)}</b>. La forme de la grille trahit la propriété : un escalier pour une inégalité, une diagonale pour une égalité.'}},
  {h:'Compter les couples',p:'Sur <i>E</i> = {0 ; 1 ; 2 ; 3}, on pose <i>x</i> <i>R</i> <i>y</i> ⇔ <i>x</i>² + <i>y</i>² ≤ 10. Combien de couples contient le graphe de <i>R</i>&nbsp;?',lab:'card G =',ans:13,
   why:'Ligne par ligne : x = 0 donne y ∈ {0 ; 1 ; 2 ; 3} (4 couples), x = 1 aussi (1 + 9 = 10 ≤ 10, 4 couples), x = 2 donne y ≤ 2 (3 couples), x = 3 donne y ≤ 1 (2 couples). Total : 4 + 4 + 3 + 2 = 13.'},
  {kind:'Pratique',h:'Remplis la grille',p:'<i>E</i> = {1 ; 2 ; 3}, <i>F</i> = {2 ; 3 ; 4} et <i>x</i> <i>R</i> <i>y</i> ⇔ « <i>x</i> divise <i>y</i> ». Allume exactement les cases du graphe.',
   params:(()=>{ const a=[], Fv=[2,3,4]; for(let i=1;i<=3;i++) for(let j=1;j<=3;j++) a.push({id:'c'+i+j,l:`(${i} ; ${Fv[j-1]})`,min:0,max:1,v:0}); return a; })(),
   draw:v=>grilleB(L3,['2','3','4'],[0,1,2].map(i=>[0,1,2].map(j=>cell(v,i,j)))),
   info:v=>{ let n=0; for(let i=0;i<3;i++) for(let j=0;j<3;j++) n+=cell(v,i,j); return `${n} case(s) allumée(s)`; },
   ok:v=>[0,1,2].every(i=>[0,1,2].every(j=>cell(v,i,j)===([2,3,4][j]%(i+1)===0?1:0))),
   why:'1 divise tout : (1 ; 2), (1 ; 3), (1 ; 4). 2 divise 2 et 4. 3 divise seulement 3. Le graphe a 6 couples.'},
  {h:'La relation réciproque',p:`On retourne toutes les flèches : la <b>relation réciproque</b> <i>R</i>⁻¹, de <i>F</i> vers <i>E</i>, est définie par <b><i>y</i> <i>R</i>⁻¹ <i>x</i> ⇔ <i>x</i> <i>R</i> <i>y</i></b>. Son graphe s’obtient en échangeant les composantes de chaque couple ; sa grille est la grille de <i>R</i> <b>transposée</b> (lignes et colonnes échangées). Compare avec « <i>x</i> divise <i>y</i> ».`,
   params:[{id:'r',l:'R ou R⁻¹',min:0,max:1,v:0}],
   draw:v=>{ const E=[2,3,4], Fv=[4,5,6,7,8,9];
     return v.r?grilleB(Fv.map(String),E.map(String),Fv.map(y=>E.map(x=>y%x===0?1:0)),{c:'var(--spark)',corner:'y \\ x'}):grilleB(E.map(String),Fv.map(String),E.map(x=>Fv.map(y=>y%x===0?1:0))); },
   info:v=>v.r?'<b>R⁻¹</b> de F vers E : y R⁻¹ x ⇔ « y est un multiple de x ». Par exemple 8 R⁻¹ 2 et 8 R⁻¹ 4.':'<b>R</b> de E vers F : x R y ⇔ « x divise y ». Par exemple 2 R 8 et 4 R 8.',
   note:'Réciproque de « &lt; » : « &gt; ». Réciproque de « est parent de » : « est enfant de ». Et (R⁻¹)⁻¹ = R : retourner deux fois les flèches ne change rien.'},
  {h:'Un couple de la réciproque',p:'Sur ℕ, on pose <i>x</i> <i>R</i> <i>y</i> ⇔ <i>y</i> = 2<i>x</i>. Quel couple appartient au graphe de <i>R</i>⁻¹&nbsp;?',
   opts:['(3 ; 6)','(6 ; 12)','(6 ; 3)','(0 ; 1)'],ans:2,
   why:'(3 ; 6) est dans le graphe de R car 6 = 2 · 3. On l’inverse : (6 ; 3) est dans celui de R⁻¹. Ainsi x R⁻¹ y ⇔ x = 2y.'},
  {h:'Relation binaire sur un ensemble',p:`Quand <i>F</i> = <i>E</i>, on parle de <b>relation binaire sur <i>E</i></b>. On la dessine par un <b>graphe orienté</b> : un point par élément, une flèche de <i>x</i> vers <i>y</i> si <i>x</i> <i>R</i> <i>y</i>, et une <b>boucle</b> sur <i>x</i> si <i>x</i> <i>R</i> <i>x</i>. Voici « <i>x</i> divise <i>y</i> » sur {1 ; 2 ; 3 ; 4 ; 6}.`,
   fig:graphe(['1','2','3','4','6'],(i,j)=>[1,2,3,4,6][j]%[1,2,3,4,6][i]===0),
   note:'Chaque nombre se divise lui-même : boucle partout. La grille de cette relation est carrée, et sa <b>diagonale</b> correspond aux boucles.'},
  {h:'Réflexive, symétrique',p:`Soit <i>R</i> une relation sur <i>E</i>.<br>• <b>Réflexive</b> : ∀<i>x</i> ∈ <i>E</i>, <i>x</i> <i>R</i> <i>x</i>. Sur le graphe : une boucle sur <b>chaque</b> point. Sur la grille : la diagonale est pleine.<br>• <b>Symétrique</b> : ∀<i>x</i>, <i>y</i> ∈ <i>E</i>, <i>x</i> <i>R</i> <i>y</i> ⇒ <i>y</i> <i>R</i> <i>x</i>. Sur le graphe : chaque flèche a sa flèche retour. Sur la grille : symétrie par rapport à la diagonale.`,
   fig:grilleB(['a','b','c'],['a','b','c'],[[1,1,0],[1,1,1],[0,1,1]],{diag:1}),
   note:'Cette grille est celle d’une relation réflexive et symétrique : « être voisin ou égal » sur trois maisons alignées a, b, c. Pour <b>réfuter</b> la réflexivité, un seul x sans boucle suffit.'},
  {h:'Antisymétrique, transitive',p:`• <b>Antisymétrique</b> : ∀<i>x</i>, <i>y</i>, (<i>x</i> <i>R</i> <i>y</i> et <i>y</i> <i>R</i> <i>x</i>) ⇒ <i>x</i> = <i>y</i>. Sur le graphe : <b>aucun aller-retour</b> entre deux points distincts (les boucles sont permises).<br>• <b>Transitive</b> : ∀<i>x</i>, <i>y</i>, <i>z</i>, (<i>x</i> <i>R</i> <i>y</i> et <i>y</i> <i>R</i> <i>z</i>) ⇒ <i>x</i> <i>R</i> <i>z</i>. Sur le graphe : tout chemin de deux flèches a son <b>raccourci</b>.`,
   fig:graphe(['1','2','3'],(i,j)=>i<=j),
   note:'<b>Piège :</b> antisymétrique ne veut pas dire « pas symétrique ». La relation « = » est à la fois symétrique et antisymétrique ; la relation « |x − y| ≤ 1 » sur ℝ n’est ni l’une ni l’autre. La figure (x ≤ y sur {1 ; 2 ; 3}) est réflexive, antisymétrique et transitive.'},
  {h:'Le laboratoire des propriétés',p:'Construis une relation sur {1 ; 2 ; 3} en allumant des couples. Le diagnostic se met à jour, avec un <b>témoin</b> chaque fois qu’une propriété échoue.',
   params:params9((i,j)=>`${i} R ${j}`),
   draw:v=>graphe(L3,(i,j)=>cell(v,i,j)===1),
   info:v=>props(3,(i,j)=>cell(v,i,j)===1,L3).html,
   note:'Essaie : la relation vide (tout éteint) est symétrique, antisymétrique et transitive, car il n’y a aucun cas à vérifier. Elle n’est pas réflexive.'},
  {kind:'Pratique',h:'Réflexive et symétrique, mais pas transitive',p:'Sur {1 ; 2 ; 3}, construis une relation <b>réflexive</b> et <b>symétrique</b> qui n’est <b>pas transitive</b>.',
   params:params9((i,j)=>`${i} R ${j}`),
   draw:v=>graphe(L3,(i,j)=>cell(v,i,j)===1),
   info:v=>props(3,(i,j)=>cell(v,i,j)===1,L3).html,
   ok:v=>{ const p=props(3,(i,j)=>cell(v,i,j)===1,L3); return p.r&&p.s&&!p.t; },
   why:'Il faut les trois boucles et des allers-retours. Par exemple 1 ⇄ 2 et 2 ⇄ 3 sans 1 ⇄ 3 : on va de 1 à 3 en deux flèches sans raccourci. C’est le schéma « être voisin ou égal ».'},
  {h:'Symétrique et antisymétrique à la fois',p:'Une relation <i>R</i> sur <i>E</i> est à la fois symétrique et antisymétrique. Que peut-on dire de son graphe&nbsp;?',
   opts:['Il est vide','Il est égal à E × E','Il ne contient que des couples de la forme (x ; x)','Une telle relation n’existe pas'],ans:2,
   why:'Si x R y, la symétrie donne y R x, puis l’antisymétrie donne x = y. Il ne reste que des boucles. Le graphe peut être vide, ou être toute la diagonale (la relation « = »), ou entre les deux.'},
  {kind:'Méthode',h:'Démontrer ou réfuter une propriété',
   p:'<b>Quand :</b> la relation porte sur un ensemble infini, on ne peut pas tout dessiner. <b>Comment :</b> chaque propriété commence par « ∀ ». Pour la <b>démontrer</b>, on prend des éléments quelconques qui vérifient l’hypothèse et on raisonne en général. Pour la <b>réfuter</b>, on donne un <b>contre-exemple</b> explicite, avec des nombres, en vérifiant chaque morceau de l’hypothèse et l’échec de la conclusion.',
   demo:{enonce:'Sur ℤ, on pose <i>x</i> <i>R</i> <i>y</i> ⇔ <i>x</i> ≤ <i>y</i> + 1. Étudie les quatre propriétés.',
    etapes:[{f:'Réflexive : pour tout <i>x</i>, <i>x</i> ≤ <i>x</i> + 1. <b>Oui.</b>',w:'Argument général, valable pour tout entier x.'},
     {f:'Symétrique : 0 <i>R</i> 5 (0 ≤ 6) mais pas 5 <i>R</i> 0 (5 ≤ 1 est faux). <b>Non.</b>',w:'Un seul contre-exemple suffit à réfuter un « pour tout ».'},
     {f:'Antisymétrique : 0 <i>R</i> 1 (0 ≤ 2) et 1 <i>R</i> 0 (1 ≤ 1), avec 0 ≠ 1. <b>Non.</b>',w:'On cherche un aller-retour entre deux éléments distincts : ici deux voisins.'},
     {f:'Transitive : 2 <i>R</i> 1 (2 ≤ 2) et 1 <i>R</i> 0 (1 ≤ 1), mais pas 2 <i>R</i> 0 (2 ≤ 1 est faux). <b>Non.</b>',w:'Deux « pas en arrière » de 1 donnent un pas de 2, que la relation n’autorise pas.'}],
    conclusion:'<i>R</i> est <b>réflexive seulement</b>. Rédige toujours les contre-exemples avec les nombres et la vérification de chaque condition : « 0 R 1 car 0 ≤ 2 ».'}},
  {h:'Le signe d’un produit',p:'Sur ℝ, on pose <i>x</i> <i>R</i> <i>y</i> ⇔ <i>xy</i> &gt; 0. Quelles propriétés <i>R</i> possède-t-elle&nbsp;?',
   opts:['Réflexive, symétrique et transitive','Symétrique et transitive, mais pas réflexive','Symétrique seulement','Réflexive et symétrique, mais pas transitive'],ans:1,
   why:'0 · 0 = 0 n’est pas &gt; 0 : pas réflexive. xy = yx : symétrique. Si xy &gt; 0 et yz &gt; 0, x et y ont le même signe, y et z aussi, donc x et z aussi, et aucun n’est nul : xz &gt; 0. Transitive.'},
  {h:'Le bon contre-exemple',p:'Sur ℝ, <i>x</i> <i>R</i> <i>y</i> ⇔ |<i>x</i> − <i>y</i>| ≤ 1. Quel triplet prouve que <i>R</i> n’est <b>pas transitive</b>&nbsp;?',
   opts:['x = 0, y = 0,5, z = 1','x = 0, y = 2, z = 3','x = 0, y = 1, z = 2','x = 1, y = 0, z = 1'],ans:2,
   why:'0 R 1 et 1 R 2 (écarts de 1), mais |0 − 2| = 2 &gt; 1 : pas 0 R 2. Le premier triplet a bien 0 R 1 ; le deuxième ne vérifie pas l’hypothèse 0 R 2 ; le dernier donne 1 R 1, vrai.'},
  {kind:'Méthode',h:'Compter des relations sur un ensemble fini',
   p:'<b>Pourquoi :</b> une relation sur <i>E</i> est une partie de <i>E</i> × <i>E</i>, c’est-à-dire une grille de <i>n</i>² cases qu’on allume ou non. <b>Comment :</b> on compte les cases <b>libres</b>, chacune donne 2 choix. Toutes les relations : 2<sup><i>n</i>²</sup>. Réflexives : la diagonale est imposée, il reste <i>n</i>² − <i>n</i> cases libres. Symétriques : on choisit librement la diagonale et le triangle au-dessus ; le triangle du dessous est alors imposé par symétrie.',
   demo:{enonce:'Sur <i>E</i> = {<i>a</i> ; <i>b</i>}, combien y a-t-il de relations&nbsp;? de relations réflexives&nbsp;? de relations symétriques&nbsp;?',
    etapes:[{f:'La grille a 2² = 4 cases : 2⁴ = <b>16</b> relations.',w:'Chaque case est allumée ou éteinte, indépendamment.'},
     {f:'Réflexives : (<i>a</i> ; <i>a</i>) et (<i>b</i> ; <i>b</i>) imposés, 2 cases libres : 2² = <b>4</b>.',w:'On retire les cases de la diagonale, déjà décidées.'},
     {f:'Symétriques : cases libres (<i>a</i> ; <i>a</i>), (<i>b</i> ; <i>b</i>), (<i>a</i> ; <i>b</i>) ; la case (<i>b</i> ; <i>a</i>) copie (<i>a</i> ; <i>b</i>) : 2³ = <b>8</b>.',w:'Diagonale (n cases) plus triangle supérieur (n(n − 1)/2 cases).'}],
    conclusion:'Sur un ensemble à <i>n</i> éléments : <b>2<sup><i>n</i>²</sup></b> relations, <b>2<sup><i>n</i>² − <i>n</i></sup></b> réflexives, <b>2<sup><i>n</i>(<i>n</i> + 1)/2</sup></b> symétriques. Pour cumuler deux conditions, on recompte les cases encore libres.'}},
  {h:'Réflexives et symétriques',p:'Combien existe-t-il de relations à la fois <b>réflexives et symétriques</b> sur un ensemble à 3 éléments&nbsp;?',lab:'nombre :',ans:8,
   why:'La diagonale (3 cases) est imposée par la réflexivité. Le triangle supérieur a 3 cases libres, le triangle inférieur les copie. 2³ = 8.'},
  {kind:'Défi',h:'Preuve guidée : quand la réflexivité est gratuite',p:'<i>R</i> est symétrique et transitive, et tout <i>x</i> ∈ <i>E</i> est en relation avec au moins un élément. On veut prouver que <i>R</i> est réflexive. On a écrit : « Soit <i>x</i> ∈ <i>E</i>. Il existe <i>y</i> tel que <i>x</i> <i>R</i> <i>y</i>. » Quelle est la bonne suite&nbsp;?',
   opts:['Par symétrie, y R x. Par transitivité avec x R y et y R x, on obtient x R x.','Par transitivité, x R y donne x R x.','Par symétrie, x R y donne x R x.','Comme x R y et R est symétrique, on a x = y, donc x R x.'],ans:0,
   why:'La transitivité demande deux flèches qui s’enchaînent : x → y puis y → x, fournie par la symétrie. Le chemin aller-retour a pour raccourci la boucle x → x. Sans l’hypothèse « au moins un partenaire », la relation vide serait un contre-exemple.'},
  {kind:'Problème',h:'Sommes multiples de 3',
   p:'Sur <i>E</i> = {1 ; 2 ; 3 ; 4 ; 5 ; 6}, on pose <i>x</i> <i>R</i> <i>y</i> ⇔ <i>x</i> + <i>y</i> est un multiple de 3. On veut décrire son graphe et étudier ses propriétés. Astuce : range les éléments selon leur reste dans la division par 3.',
   fig:grilleB(['1','2','3','4','5','6'],['1','2','3','4','5','6'],[1,2,3,4,5,6].map(x=>[1,2,3,4,5,6].map(y=>(x+y)%3===0?1:0)),{diag:1}),
   parts:[
    {q:'a) Combien de couples contient le graphe de <i>R</i>&nbsp;?',lab:'card G =',ans:12,hint:'Les restes : 3 et 6 donnent 0, 1 et 4 donnent 1, 2 et 5 donnent 2. Une somme est multiple de 3 si les restes font 0 + 0, 1 + 2 ou 2 + 1.',why:'Reste 0 avec reste 0 : 2 · 2 = 4 couples. Reste 1 avec reste 2 : 4 couples. Reste 2 avec reste 1 : 4 couples. Total 12.'},
    {q:'b) Combien de boucles (couples (<i>x</i> ; <i>x</i>)) le graphe contient-il&nbsp;?',lab:'boucles :',ans:2,hint:'x R x ⇔ 2x est multiple de 3.',why:'2x multiple de 3 ⇔ x multiple de 3 : x ∈ {3 ; 6}. Deux boucles seulement.'},
    {q:'c) Quelles propriétés <i>R</i> possède-t-elle&nbsp;?',opts:['Réflexive et symétrique','Symétrique seulement, parmi les quatre','Symétrique et transitive','Antisymétrique et transitive'],ans:1,hint:'x + y = y + x. Pour les autres, cherche des témoins.',why:'Symétrique car x + y = y + x. Pas réflexive : 1 + 1 = 2. Pas antisymétrique : 1 R 2 et 2 R 1. Pas transitive : voir d).'},
    {q:'d) Quel triplet (<i>x</i>, <i>y</i>, <i>z</i>) est un contre-exemple à la transitivité&nbsp;?',opts:['(3, 6, 3)','(1, 2, 3)','(3, 6, 6)','(1, 2, 1)'],ans:3,hint:'Il faut x R y, y R z, et pas x R z.',why:'1 R 2 (3) et 2 R 1 (3), mais 1 + 1 = 2 : pas 1 R 1. (1, 2, 3) ne vérifie pas 2 R 3 ; les deux autres vérifient la conclusion.'},
    {q:'e) Combien de couples faut-il ajouter, au minimum, pour rendre <i>R</i> réflexive&nbsp;?',lab:'couples :',ans:4,hint:'Il faut toute la diagonale.',why:'Il manque les boucles en 1, 2, 4 et 5 : 6 − 2 = 4 couples.'},
   ],
   sol:'On classe les éléments par reste modulo 3 : {3 ; 6} (reste 0), {1 ; 4} (reste 1), {2 ; 5} (reste 2). x + y est multiple de 3 si les restes sont (0, 0), (1, 2) ou (2, 1).<br>Le graphe a donc 4 + 4 + 4 = <b>12</b> couples, dont <b>2</b> boucles (3 R 3 et 6 R 6).<br>R est <b>symétrique</b> (x + y = y + x), mais pas réflexive (1 + 1 = 2), pas antisymétrique (1 R 2 et 2 R 1) et pas transitive (1 R 2, 2 R 1, mais pas 1 R 1).<br>Pour la rendre réflexive, il faut ajouter les <b>4</b> boucles manquantes.'},
  {kind:'Problème',h:'Union, intersection et raccourcis',
   p:'Soit <i>R</i> et <i>S</i> deux relations sur un même ensemble <i>E</i>. Leur union <i>R</i> ∪ <i>S</i> et leur intersection <i>R</i> ∩ <i>S</i> sont les relations dont les graphes sont l’union et l’intersection des graphes. On se demande quelles propriétés passent à l’union ou à l’intersection, puis on construit la plus petite relation transitive qui contient une relation donnée.',
   parts:[
    {q:'a) <i>R</i> et <i>S</i> sont symétriques. Pourquoi <i>R</i> ∪ <i>S</i> l’est-elle aussi&nbsp;?',opts:['Car R ∪ S contient la diagonale','Si x (R ∪ S) y, alors x R y ou x S y ; dans le premier cas y R x, dans le second y S x ; dans les deux cas y (R ∪ S) x','Car R ∪ S ⊂ R','On ne peut pas savoir sans connaître E'],ans:1,hint:'Un « ou » dans l’hypothèse : disjonction de cas.',why:'On traite les deux cas et on conclut y (R ∪ S) x à chaque fois. La même preuve marche pour l’intersection.'},
    {q:'b) <i>R</i> et <i>S</i> sont transitives. Soit <i>x</i> (<i>R</i> ∩ <i>S</i>) <i>y</i> et <i>y</i> (<i>R</i> ∩ <i>S</i>) <i>z</i>. Quelle est la bonne suite&nbsp;?',opts:['x R y et y S z, donc x R z','On a x R y, y R z, donc x R z ; de même x S y, y S z, donc x S z ; ainsi x (R ∩ S) z','Comme R ∩ S ⊂ R, on a x R z, donc x (R ∩ S) z','On a x = z'],ans:1,hint:'Un « et » dans l’hypothèse : on garde les deux informations et on applique chaque transitivité séparément.',why:'Il faut obtenir x R z <b>et</b> x S z. La troisième option conclut trop vite : x R z ne donne pas x S z.'},
    {q:'c) Sur {1 ; 2 ; 3}, <i>R</i> = {(1 ; 2)} et <i>S</i> = {(2 ; 3)} sont transitives (il n’y a aucun chemin de deux flèches). Combien de couples faut-il ajouter à <i>R</i> ∪ <i>S</i> pour la rendre transitive&nbsp;?',lab:'couples :',ans:1,hint:'Cherche les chemins de deux flèches sans raccourci.',why:'R ∪ S contient le chemin 1 → 2 → 3 sans le raccourci (1 ; 3). On l’ajoute, et plus aucun chemin ne manque. L’union de deux relations transitives n’est donc pas toujours transitive.'},
    {q:'d) Sur {1 ; 2 ; 3 ; 4}, on part de {(1 ; 2), (2 ; 3), (3 ; 4)} et on ajoute des raccourcis jusqu’à obtenir une relation transitive, sans rien ajouter d’inutile. Combien de couples a le résultat&nbsp;?',lab:'couples :',ans:6,hint:'Ajoute d’abord les raccourcis des chemins de deux flèches, puis recommence avec les nouvelles flèches.',why:'Premier tour : (1 ; 3) et (2 ; 4). Deuxième tour : 1 → 3 → 4 donne (1 ; 4). On obtient tous les couples (i ; j) avec i &lt; j : 3 + 3 = 6 couples.'},
   ],
   sol:'<b>Symétrie.</b> Si x (R ∪ S) y, alors x R y ou x S y, d’où y R x ou y S x, donc y (R ∪ S) x. Même raisonnement pour R ∩ S.<br><b>Transitivité.</b> Elle passe à l’intersection : de x R y, y R z on tire x R z, et de x S y, y S z on tire x S z. Elle ne passe pas à l’union : R = {(1 ; 2)} et S = {(2 ; 3)} sont transitives, mais R ∪ S contient 1 → 2 → 3 sans (1 ; 3). Il faut ajouter <b>1</b> couple.<br><b>Raccourcis.</b> En ajoutant les raccourcis tant qu’il en manque, on obtient la plus petite relation transitive contenant la relation de départ. Pour la chaîne 1 → 2 → 3 → 4, c’est la relation « i &lt; j » sur {1 ; 2 ; 3 ; 4}, à <b>6</b> couples.'},
]},

/* ===================== 2. RELATIONS D’ORDRE ===================== */
{subj:'gred',sem:'ens',id:'gred-ordre',h:'Relations d’ordre',p:'Ordres totaux et partiels, diagrammes de Hasse, éléments remarquables, bornes, ordre strict et ordre lexicographique.',steps:[
  {h:'Ce qu’est un ordre',p:`Une <b>relation d’ordre</b> sur <i>E</i> est une relation <b>réflexive, antisymétrique et transitive</b>. On la note souvent ≤ ou ≼, et (<i>E</i>, ≤) est un <b>ensemble ordonné</b>. Trois exemples à garder en tête :<br>• ≤ sur ℝ ;<br>• « <i>a</i> divise <i>b</i> », noté <i>a</i> | <i>b</i>, sur ℕ* ;<br>• l’inclusion ⊂ sur 𝒫(<i>E</i>).`,
   fig:graphe(['1','2','3','6'],(i,j)=>[1,2,3,6][j]%[1,2,3,6][i]===0,{pos:[[0,-1.8],[-1.7,0],[1.7,0],[0,1.8]]}),
   note:'L’antisymétrie est ce qui distingue un ordre : pas d’aller-retour entre deux éléments distincts. Sur la figure (divisibilité sur {1 ; 2 ; 3 ; 6}), toutes les flèches « montent ».'},
  {h:'Est-ce un ordre&nbsp;?',p:'Laquelle de ces relations est une relation d’ordre&nbsp;?',
   opts:['« <i>a</i> divise <i>b</i> » sur ℤ','<i>x</i> &lt; <i>y</i> sur ℝ','|<i>x</i>| ≤ |<i>y</i>| sur ℝ','<i>A</i> ⊂ <i>B</i> sur 𝒫(<i>E</i>)'],ans:3,
   why:'Sur ℤ, 2 | −2 et −2 | 2 avec 2 ≠ −2 : pas antisymétrique. &lt; n’est pas réflexive. |1| ≤ |−1| et |−1| ≤ |1| avec 1 ≠ −1 : pas antisymétrique. L’inclusion est réflexive, antisymétrique (double inclusion) et transitive.'},
  {h:'Total ou partiel',p:`Deux éléments <i>x</i>, <i>y</i> sont <b>comparables</b> si <i>x</i> ≤ <i>y</i> ou <i>y</i> ≤ <i>x</i>. L’ordre est <b>total</b> si deux éléments quelconques sont toujours comparables, <b>partiel</b> sinon. ≤ sur ℝ est total. La divisibilité sur ℕ* est partielle : ni 2 | 3, ni 3 | 2. L’inclusion est partielle dès que <i>E</i> a deux éléments : {<i>a</i>} et {<i>b</i>} sont incomparables.`,
   fig:hasse(['∅','a','b','ab'],[0,1,1,2],(i,j)=>[[0,1],[0,2],[1,3],[2,3]].some(p=>p[0]===i&&p[1]===j)),
   note:'« Partiel » ne veut pas dire « défectueux » : la plupart des ordres naturels hors de ℝ sont partiels. Sur la figure, 𝒫({a ; b}) : <b>a</b> et <b>b</b> sont à la même hauteur et non reliés, donc incomparables.'},
  {h:'Lequel est total&nbsp;?',p:'Lequel de ces ensembles ordonnés est <b>totalement</b> ordonné&nbsp;?',
   opts:['{1 ; 2 ; 3 ; 6} avec la divisibilité','𝒫({1 ; 2}) avec l’inclusion','{1 ; 2 ; 4 ; 8} avec la divisibilité','ℕ* avec la divisibilité'],ans:2,
   why:'Dans {1 ; 2 ; 4 ; 8}, chaque élément divise le suivant : 1 | 2 | 4 | 8, tout est comparable. Une partie d’un ordre partiel peut être totalement ordonnée : on parle de <b>chaîne</b>. Dans {1 ; 2 ; 3 ; 6}, 2 et 3 sont incomparables.'},
  {h:'Le diagramme de Hasse',p:`Le graphe d’un ordre est encombré. Le <b>diagramme de Hasse</b> l’allège : on efface les boucles (on sait que l’ordre est réflexif), on efface les raccourcis (on sait qu’il est transitif), et on place chaque élément <b>plus haut</b> que ceux qu’il dépasse, ce qui dispense des flèches. On relie <i>x</i> à <i>y</i> quand <i>y</i> <b>couvre</b> <i>x</i> : <i>x</i> &lt; <i>y</i> sans élément strictement entre les deux. Voici les diviseurs de <i>n</i>.`,
   params:[{id:'k',l:'n',min:0,max:8,v:2}],
   draw:v=>hasseDiv([6,8,12,16,18,20,24,36,48][v.k]),
   info:v=>{ const n=[6,8,12,16,18,20,24,36,48][v.k]; return `n = <b>${n}</b> : ${divs(n).length} diviseurs, ${nAretes(n)} traits. On monte d’un niveau en multipliant par un nombre premier.`; },
   note:'Pour la divisibilité, y couvre x exactement quand y/x est un nombre <b>premier</b>. 16 donne une chaîne : son ordre de divisibilité est total.'},
  {kind:'Méthode',h:'Tracer un diagramme de Hasse',
   p:'<b>Quand :</b> on doit représenter un ordre sur un ensemble fini. <b>Comment :</b> 1) on répartit les éléments en <b>niveaux</b> : en bas ceux qui n’ont rien en dessous, puis on monte ; 2) pour chaque couple <i>x</i> &lt; <i>y</i>, on se demande s’il existe <i>z</i> avec <i>x</i> &lt; <i>z</i> &lt; <i>y</i> ; 3) on ne trace que les couples sans intermédiaire (les <b>couvertures</b>). <b>Contrôle :</b> <i>x</i> ≤ <i>y</i> si et seulement si on peut monter de <i>x</i> à <i>y</i> en suivant des traits.',
   demo:{enonce:'Trace le diagramme de Hasse des diviseurs de 12 ordonnés par la divisibilité.',
    etapes:[{f:'Diviseurs : 1, 2, 3, 4, 6, 12.',w:'On liste d’abord l’ensemble.'},
     {f:'Niveaux : 1 en bas ; 2 et 3 ; puis 4 et 6 ; 12 en haut.',w:'Le niveau compte les facteurs premiers avec répétition : 4 = 2 · 2 est au niveau 2.'},
     {f:'Couvertures : 1–2, 1–3, 2–4, 2–6, 3–6, 4–12, 6–12.',w:'Rapport premier à chaque fois. 1–4 est exclu (2 est entre les deux), 3–12 aussi (6 est entre).'},
     {f:hasseDiv(12),w:'On trace les 7 traits ; aucun n’a besoin de flèche.'}],
    conclusion:'Le diagramme a 6 sommets et <b>7 traits</b>. On lit par exemple 2 | 12 en montant 2 → 4 → 12 (ou 2 → 6 → 12), et 4 ∤ 6 car on ne peut pas monter de 4 à 6.'}},
  {h:'Les traits du diagramme de 30',p:'Combien de traits comporte le diagramme de Hasse des diviseurs de 30 (ordre de divisibilité)&nbsp;?',lab:'traits :',ans:12,
   why:'30 = 2 · 3 · 5 a 8 diviseurs. Chaque diviseur d est relié vers le haut à d · p pour chaque premier p qui ne divise pas encore d : 3 traits depuis 1, 2 depuis chacun de 2, 3, 5, 1 depuis chacun de 6, 10, 15. Total 3 + 6 + 3 = 12 : c’est un cube.'},
  {h:'L’inclusion dans 𝒫({a ; b ; c})',p:`Les 8 parties de {<i>a</i> ; <i>b</i> ; <i>c</i>} ordonnées par l’inclusion forment aussi un <b>cube</b>. Ici « <i>ab</i> » abrège {<i>a</i> ; <i>b</i>}. On monte en ajoutant un élément.`,
   fig:hasse(PSET,PBITS.map(bc),(i,j)=>{ const A=PBITS[i],B=PBITS[j]; return (A&B)===A&&bc(B)===bc(A)+1; }),
   note:'Le diagramme a la même forme que celui des diviseurs de 30 : il suffit de remplacer a, b, c par 2, 3, 5 et l’union par le produit. Deux ensembles ordonnés « de même forme » sont dits <b>isomorphes</b>.'},
  {h:'La correspondance',p:'Dans la correspondance <i>a</i> ↔ 2, <i>b</i> ↔ 3, <i>c</i> ↔ 5 entre 𝒫({<i>a</i> ; <i>b</i> ; <i>c</i>}) et les diviseurs de 30, à quel diviseur correspond la partie {<i>a</i> ; <i>c</i>}&nbsp;?',lab:'diviseur :',ans:10,
   why:'Une partie correspond au produit de ses éléments : {a ; c} ↔ 2 · 5 = 10. La partie vide correspond à 1 (produit vide) et {a ; b ; c} à 30.'},
  {h:'Plus grand élément, élément maximal',p:`Soit <i>A</i> une partie de (<i>E</i>, ≤).<br>• <i>m</i> est le <b>plus grand élément</b> de <i>A</i> si <i>m</i> ∈ <i>A</i> et <i>a</i> ≤ <i>m</i> pour <b>tout</b> <i>a</i> ∈ <i>A</i>.<br>• <i>m</i> est un <b>élément maximal</b> de <i>A</i> si <i>m</i> ∈ <i>A</i> et <b>aucun</b> élément de <i>A</i> n’est strictement au-dessus de <i>m</i>.<br>Mêmes définitions vers le bas : plus petit élément, élément minimal. Exemple : <i>A</i> = {2 ; 3 ; 4 ; 6 ; 9} avec la divisibilité.`,
   fig:hasse(['2','3','4','6','9'],[0,0,1,1,1],(i,j)=>[[0,2],[0,3],[1,3],[1,4]].some(p=>p[0]===i&&p[1]===j),{h:150}),
   note:'Ici 4, 6 et 9 sont maximaux, 2 et 3 minimaux, et il n’y a ni plus grand ni plus petit élément. Un plus grand élément, s’il existe, est <b>unique</b> : deux candidats m et m′ vérifient m ≤ m′ et m′ ≤ m, donc m = m′ par antisymétrie.'},
  {kind:'Méthode',h:'Trouver les éléments remarquables d’une partie finie',
   p:'<b>Quand :</b> on cherche les éléments maximaux, minimaux, le plus grand ou le plus petit d’une partie finie <i>A</i>. <b>Comment :</b> on trace le diagramme de Hasse de <i>A</i> seule (en reliant ses éléments entre eux). Les <b>maximaux</b> sont les sommets sans trait vers le haut, les <b>minimaux</b> ceux sans trait vers le bas. Il y a un <b>plus grand</b> élément exactement quand il n’y a qu’un seul maximal (pour <i>A</i> finie) : c’est lui.',
   demo:{enonce:'Dans (ℕ*, |), étudie <i>A</i> = {2 ; 4 ; 5 ; 10 ; 20}.',
    etapes:[{f:'Comparaisons utiles : 2 | 4, 2 | 10, 4 | 20, 5 | 10, 10 | 20.',w:'On cherche qui divise qui à l’intérieur de A.'},
     {f:'Couvertures : 2–4, 2–10, 5–10, 4–20, 10–20. Niveaux : {2 ; 5}, {4 ; 10}, {20}.',w:'2–20 est un raccourci (4 est entre), on ne le trace pas.'},
     {f:'Sans trait vers le haut : 20 seul. Donc 20 est le seul maximal, et c’est le <b>plus grand</b> élément : tout élément de A divise 20.',w:'Pour une partie finie, un maximal unique est le plus grand.'},
     {f:'Sans trait vers le bas : 2 et 5. Deux minimaux, donc <b>pas</b> de plus petit élément.',w:'2 et 5 sont incomparables : aucun ne divise l’autre.'}],
    conclusion:'Maximal : 20 (plus grand élément). Minimaux : 2 et 5, pas de plus petit élément. Remarque : 1 divise tout, mais 1 ∉ <i>A</i>, il ne compte pas comme plus petit élément de <i>A</i>.'}},
  {h:'Explore une partie des diviseurs de 12',p:'Allume les éléments d’une partie <i>A</i> de <i>D</i>(12) = {1 ; 2 ; 3 ; 4 ; 6 ; 12} (divisibilité). Les éléments de <i>A</i> sont colorés ; les <b>majorants</b> de <i>A</i> dans <i>D</i>(12) sont cerclés.',
   params:[1,2,3,4,6,12].map(d=>({id:'d'+d,l:`${d} ∈ A`,min:0,max:1,v:[4,6].includes(d)?1:0})),
   draw:v=>{ const D=[1,2,3,4,6,12], A=D.filter(d=>v['d'+d]), r=remarq(A,D,(a,b)=>b%a===0); return hasseDiv(12,{fill:i=>A.includes(D[i])?'var(--accent)':null,ring:i=>A.length>0&&r.maj.includes(D[i])}); },
   info:v=>{ const D=[1,2,3,4,6,12], A=D.filter(d=>v['d'+d]); if(!A.length) return 'A est vide : allume au moins un élément.';
     const r=remarq(A,D,(a,b)=>b%a===0); return `A = ${lst(A)}<br>Maximaux : ${lst(r.max)} · minimaux : ${lst(r.min)}<br>Plus grand : ${un(r.pg)} · plus petit : ${un(r.pp)}<br>Majorants : ${lst(r.maj)} · sup A = <b>${un(r.sup)}</b><br>Minorants : ${lst(r.mino)} · inf A = <b>${un(r.inf)}</b>`; },
   note:'Avec A = {4 ; 6} : deux maximaux, pas de plus grand élément, mais une borne supérieure 12 = ppcm(4, 6), hors de A. On en reparle juste après.'},
  {kind:'Pratique',h:'Deux maximaux et un plus petit',p:'Choisis une partie <i>A</i> de <i>D</i>(12) qui a <b>exactement deux éléments maximaux</b> et un <b>plus petit élément</b>.',
   params:[1,2,3,4,6,12].map(d=>({id:'d'+d,l:`${d} ∈ A`,min:0,max:1,v:0})),
   draw:v=>{ const D=[1,2,3,4,6,12], A=D.filter(d=>v['d'+d]); return hasseDiv(12,{fill:i=>A.includes(D[i])?'var(--accent)':null}); },
   info:v=>{ const D=[1,2,3,4,6,12], A=D.filter(d=>v['d'+d]); if(!A.length) return 'A est vide.'; const r=remarq(A,D,(a,b)=>b%a===0); return `Maximaux : ${lst(r.max)} · plus petit : ${un(r.pp)}`; },
   ok:v=>{ const D=[1,2,3,4,6,12], A=D.filter(d=>v['d'+d]); if(!A.length) return false; const r=remarq(A,D,(a,b)=>b%a===0); return r.max.length===2&&r.pp.length===1; },
   why:'Par exemple A = {1 ; 4 ; 6} ou A = {2 ; 4 ; 6} : 4 et 6 sont incomparables et tout en haut, et 1 (ou 2) divise tous les éléments de A. Avec 12 dans A, il n’y aurait plus qu’un seul maximal.'},
  {h:'Dans les parties',p:'Dans (𝒫({1 ; 2 ; 3}), ⊂), on considère <i>A</i> = { {1}, {2}, {1 ; 2}, {1 ; 3} }. Quels sont ses éléments maximaux&nbsp;?',
   opts:['{1 ; 2 ; 3} seulement','{1 ; 2} et {1 ; 3}','{1 ; 2} seulement','{1} et {2}'],ans:1,
   why:'{1 ; 2} et {1 ; 3} ne sont contenus dans aucun autre élément de A, et ils sont incomparables. {1 ; 2 ; 3} n’est pas dans A. {1} et {2} sont les minimaux. A n’a ni plus grand ni plus petit élément.'},
  {h:'Majorants et bornes',p:`Soit <i>A</i> ⊂ <i>E</i>. Un <b>majorant</b> de <i>A</i> est un <i>M</i> ∈ <i>E</i> tel que <i>a</i> ≤ <i>M</i> pour tout <i>a</i> ∈ <i>A</i> ; il n’est pas forcément dans <i>A</i>. La <b>borne supérieure</b> sup <i>A</i> est le <b>plus petit des majorants</b>, s’il existe. De même, minorant et borne inférieure inf <i>A</i>, le plus grand des minorants.<br>• Dans (ℝ, ≤) : sup [0 ; 1[ = 1, qui n’est pas un plus grand élément.<br>• Dans (𝒫(<i>E</i>), ⊂) : sup{<i>A</i>, <i>B</i>} = <i>A</i> ∪ <i>B</i> et inf{<i>A</i>, <i>B</i>} = <i>A</i> ∩ <i>B</i>.<br>• Dans (ℕ*, |) : sup{<i>a</i>, <i>b</i>} = ppcm(<i>a</i>, <i>b</i>) et inf{<i>a</i>, <i>b</i>} = pgcd(<i>a</i>, <i>b</i>).`,
   note:'Si A a un plus grand élément, c’est aussi sa borne supérieure. La réciproque est fausse : sup [0 ; 1[ = 1 ∉ [0 ; 1[.'},
  {kind:'Méthode',h:'Calculer sup et inf pour la divisibilité',
   p:'<b>Quand :</b> on cherche les bornes d’une partie finie de (ℕ*, |). <b>Pourquoi ppcm et pgcd :</b> les majorants de {<i>a</i> ; <i>b</i>} sont les multiples communs, et ce sont exactement les multiples du ppcm ; le plus « petit » d’entre eux, <b>au sens de la divisibilité</b>, est donc le ppcm. De même, les minorants sont les diviseurs communs, qui sont exactement les diviseurs du pgcd. <b>Comment :</b> on décompose en facteurs premiers ; le ppcm prend les plus grands exposants, le pgcd les plus petits.',
   demo:{enonce:'Dans (ℕ*, |), trouve les majorants, minorants, sup et inf de <i>A</i> = {12 ; 18}.',
    etapes:[{f:'12 = 2² · 3 et 18 = 2 · 3².',w:'La décomposition en facteurs premiers rend tout lisible.'},
     {f:'ppcm = 2² · 3² = 36. Majorants : 36, 72, 108, … (les multiples de 36). sup <i>A</i> = 36.',w:'36 divise tous les autres majorants : c’est bien le plus petit pour l’ordre |.'},
     {f:'pgcd = 2 · 3 = 6. Minorants : 1, 2, 3, 6. inf <i>A</i> = 6.',w:'Chaque minorant divise 6 : 6 est le plus grand pour l’ordre |.'},
     {f:'Ni 12 | 18 ni 18 | 12 : <i>A</i> n’a ni plus grand ni plus petit élément.',w:'Les bornes existent même quand les éléments extrêmes n’existent pas.'}],
    conclusion:'<b>sup{12 ; 18} = 36</b> et <b>inf{12 ; 18} = 6</b>. Pour plus de deux nombres, on prend encore les exposants maximaux (ppcm) et minimaux (pgcd).'}},
  {h:'Une borne supérieure',p:'Dans (ℕ*, |), que vaut sup{8 ; 12 ; 20}&nbsp;?',lab:'sup =',ans:120,
   why:'8 = 2³, 12 = 2² · 3, 20 = 2² · 5. Exposants maximaux : 2³ · 3 · 5 = 120. (Et inf = 2² = 4.)'},
  {h:'Une borne non atteinte',p:'Dans (ℝ, ≤), on pose <i>A</i> = {1 − 1/<i>n</i> : <i>n</i> ∈ ℕ*} = {0 ; 1/2 ; 2/3 ; 3/4 ; …}. Que peut-on dire&nbsp;?',
   opts:['A a un plus grand élément, égal à 1','sup A n’existe pas','sup A = 1, et A n’a pas de plus grand élément','sup A = 3/4'],ans:2,
   why:'1 majore A, car 1 − 1/n &lt; 1. Tout M &lt; 1 est dépassé : 1 − 1/n &gt; M dès que n &gt; 1/(1 − M). Donc 1 est le plus petit majorant. Mais 1 ∉ A : pas de plus grand élément. Le plus petit élément est 0.'},
  {h:'L’ordre strict associé',p:`À un ordre ≤ on associe l’<b>ordre strict</b> <b><i>x</i> &lt; <i>y</i> ⇔ (<i>x</i> ≤ <i>y</i> et <i>x</i> ≠ <i>y</i>)</b>. Il n’est jamais réflexif (on n’a jamais <i>x</i> &lt; <i>x</i>), mais il reste transitif. On retrouve l’ordre large par <i>x</i> ≤ <i>y</i> ⇔ (<i>x</i> &lt; <i>y</i> ou <i>x</i> = <i>y</i>). Pour l’inclusion, l’ordre strict est l’inclusion stricte ⊊.`,
   note:'Un ordre strict n’est donc <b>pas</b> une relation d’ordre au sens de ce chapitre, puisqu’il n’est pas réflexif. On dessine le même diagramme de Hasse pour les deux.'},
  {h:'Divisibilité stricte',p:'On note <i>a</i> ≺ <i>b</i> l’ordre strict associé à la divisibilité sur ℕ*. Laquelle de ces affirmations est vraie&nbsp;?',
   opts:['3 ≺ 3','6 ≺ 2','2 ≺ 3','2 ≺ 6'],ans:3,
   why:'2 | 6 et 2 ≠ 6. 3 ≺ 3 est faux par définition (x ≠ y exigé). 6 ne divise pas 2, et 2 ne divise pas 3.'},
  {h:'L’ordre lexicographique',p:`Sur ℝ², l’<b>ordre lexicographique</b> compare d’abord les premières composantes, puis, en cas d’égalité, les secondes : <b>(<i>a</i> ; <i>b</i>) ≤ (<i>c</i> ; <i>d</i>) ⇔ <i>a</i> &lt; <i>c</i> ou (<i>a</i> = <i>c</i> et <i>b</i> ≤ <i>d</i>)</b>. C’est l’ordre du dictionnaire. Il est <b>total</b>. La zone colorée montre tous les points ≥ <i>P</i>.`,
   params:[{id:'a',l:'a',min:-3,max:3,v:0},{id:'b',l:'b',min:-3,max:3,v:1}],
   draw:v=>{ const P=plane({x:[-4,4],y:[-4,4],lab:1}); P.rect(v.a,-4,4-v.a,8,{fill:'var(--accent)',fo:.22,c:null}).seg(v.a,-4,v.a,4,{c:'var(--muted)',w:1.5,dash:1}).seg(v.a,v.b,v.a,4,{c:'var(--accent)',w:5}); P.dot(v.a,v.b,{l:'P'}); return P.svg(); },
   info:v=>`P = (${fmt(v.a)} ; ${fmt(v.b)}). Les points ≥ P : ceux d’abscisse &gt; ${fmt(v.a)} (demi-plan), plus ceux d’abscisse ${fmt(v.a)} et d’ordonnée ≥ ${fmt(v.b)} (demi-droite).`,
   note:'Comparé à l’<b>ordre produit</b> (a ≤ c et b ≤ d), qui est partiel : (1 ; 3) et (2 ; 2) y sont incomparables, alors qu’en lexicographique (1 ; 3) &lt; (2 ; 2).'},
  {kind:'Pratique',h:'Plus grand mais plus bas',p:'Avec <i>P</i> = (1 ; 2), place <i>Q</i> = (<i>c</i> ; <i>d</i>) de sorte que <i>P</i> &lt; <i>Q</i> pour l’ordre lexicographique, alors que <i>Q</i> est <b>plus bas</b> que <i>P</i> (<i>d</i> &lt; 2).',
   params:[{id:'c',l:'c',min:-3,max:3,v:-2},{id:'d',l:'d',min:-3,max:3,v:3}],
   draw:v=>{ const P=plane({x:[-4,4],y:[-4,4],lab:1}); P.rect(1,-4,3,8,{fill:'var(--accent)',fo:.18,c:null}).seg(1,2,1,4,{c:'var(--accent)',w:5}); P.dot(1,2,{l:'P'}).dot(v.c,v.d,{l:'Q',c:'var(--math)'}); return P.svg(); },
   info:v=>{ const gt=v.c>1||(v.c===1&&v.d>2); return `Q = (${fmt(v.c)} ; ${fmt(v.d)}) : ${v.c===1&&v.d===2?'Q = P':gt?'P &lt; Q':'Q &lt; P'}${v.d<2?', et Q est plus bas que P':''}`; },
   ok:v=>v.c>1&&v.d<2,
   why:'Il suffit que l’abscisse de Q dépasse 1 : la première composante décide, la seconde ne compte plus. Par exemple Q = (2 ; −3) &gt; (1 ; 2).'},
  {h:'Ranger des couples',p:'On range (2 ; 5), (1 ; 9), (2 ; 3) et (1 ; 10) dans l’ordre lexicographique croissant. Quel couple est en <b>troisième</b> position&nbsp;?',
   opts:['(1 ; 10)','(2 ; 5)','(2 ; 3)','(1 ; 9)'],ans:2,
   why:'Première composante 1 d’abord : (1 ; 9) &lt; (1 ; 10). Puis la première composante 2 : (2 ; 3) &lt; (2 ; 5). Ordre : (1 ; 9), (1 ; 10), (2 ; 3), (2 ; 5).'},
  {kind:'Problème',h:'Les diviseurs de 60',
   p:'On ordonne <i>D</i>(60), l’ensemble des diviseurs positifs de 60 = 2² · 3 · 5, par la divisibilité. La figure montre son diagramme de Hasse. On étudie l’ensemble entier, puis la partie <i>A</i> = {4 ; 6 ; 10}.',
   fig:hasseDiv(60),
   parts:[
    {q:'a) Combien d’éléments a <i>D</i>(60)&nbsp;?',lab:'card =',ans:12,hint:'Un diviseur s’écrit 2<sup>i</sup> · 3<sup>j</sup> · 5<sup>k</sup> : compte les choix pour chaque exposant.',why:'i ∈ {0 ; 1 ; 2}, j ∈ {0 ; 1}, k ∈ {0 ; 1} : 3 · 2 · 2 = 12 diviseurs.'},
    {q:'b) Combien d’éléments maximaux a la partie <i>D</i>(60) \\ {60}&nbsp;?',lab:'maximaux :',ans:3,hint:'Ce sont les sommets juste sous 60 : 60 divisé par un nombre premier.',why:'60/2 = 30, 60/3 = 20, 60/5 = 12. Ils sont incomparables deux à deux, et tout autre diviseur strict divise l’un d’eux.'},
    {q:'c) Dans <i>D</i>(60), que vaut inf <i>A</i> pour <i>A</i> = {4 ; 6 ; 10}&nbsp;?',lab:'inf A =',ans:2,hint:'Exposants minimaux : 4 = 2², 6 = 2 · 3, 10 = 2 · 5.',why:'pgcd(4, 6, 10) = 2.'},
    {q:'d) Que vaut sup <i>A</i>&nbsp;?',lab:'sup A =',ans:60,hint:'Exposants maximaux.',why:'ppcm(4, 6, 10) = 2² · 3 · 5 = 60.'},
    {q:'e) Quelle phrase est vraie pour <i>A</i> = {4 ; 6 ; 10}&nbsp;?',opts:['10 est le plus grand élément de A','A a un plus petit élément, 2','4, 6 et 10 sont à la fois maximaux et minimaux dans A','A n’a pas de borne supérieure'],ans:2,hint:'Compare les éléments de A deux à deux.',why:'Aucun des trois ne divise un autre : ils sont deux à deux incomparables, donc chacun est maximal et minimal. 2 n’est pas dans A, et sup A = 60 existe.'},
   ],
   sol:'60 = 2² · 3 · 5 a 3 · 2 · 2 = <b>12</b> diviseurs. Le diagramme a 4 niveaux au-dessus de 1.<br>Les éléments maximaux de D(60) \\ {60} sont ceux que 60 couvre : <b>30, 20, 12</b>.<br>Pour A = {4 ; 6 ; 10}, les éléments sont deux à deux incomparables : chacun est maximal et minimal, et il n’y a ni plus grand ni plus petit élément.<br>Les bornes existent pourtant : inf A = pgcd = <b>2</b> et sup A = ppcm = <b>60</b>, tous deux hors de A.'},
  {kind:'Problème',h:'Maximal ou plus grand&nbsp;?',
   p:'On compare les notions d’élément maximal et de plus grand élément, d’abord en général, puis sur l’exemple <i>A</i> = {2 ; 3 ; 4 ; … ; 10} ordonné par la divisibilité. On termine par la borne supérieure de <i>A</i> dans (ℕ*, |).',
   parts:[
    {q:'a) Pourquoi un ensemble ordonné a-t-il <b>au plus un</b> plus grand élément&nbsp;?',opts:['Car l’ordre est réflexif','Si m et m′ sont deux plus grands éléments, m ≤ m′ et m′ ≤ m, donc m = m′ par antisymétrie','Car l’ordre est total','Car un ensemble fini a un seul élément maximal'],ans:1,hint:'Applique la définition à m puis à m′.',why:'Chacun majore l’autre, et l’antisymétrie conclut. Aucune hypothèse de totalité n’est nécessaire.'},
    {q:'b) Dans un ordre <b>total</b>, <i>m</i> est maximal dans <i>A</i>. Pourquoi est-ce le plus grand élément&nbsp;?',opts:['Pour a ∈ A, a et m sont comparables ; m ≤ a avec a ≠ m est exclu car m est maximal ; donc a ≤ m','Car tout élément maximal est un majorant, dans tout ordre','Car A est finie','Car m est aussi minimal'],ans:0,hint:'Que donne la totalité pour a et m ?',why:'Dans un ordre total, a ≤ m ou m ≤ a. Le second cas, avec a ≠ m, contredirait la maximalité. Dans un ordre partiel, cet argument tombe : a peut être incomparable à m.'},
    {q:'c) Combien d’éléments maximaux a <i>A</i> = {2 ; … ; 10} pour la divisibilité&nbsp;?',lab:'maximaux :',ans:5,hint:'Un élément est maximal s’il n’a aucun multiple strict dans A.',why:'2 a les multiples 4, 6, 8, 10 ; 3 a 6 et 9 ; 4 a 8 ; 5 a 10. Restent 6, 7, 8, 9, 10 : 5 éléments maximaux, donc pas de plus grand élément.'},
    {q:'d) Combien d’éléments minimaux a <i>A</i>&nbsp;?',lab:'minimaux :',ans:4,hint:'Un élément est minimal si aucun autre élément de A ne le divise.',why:'Les minimaux sont les nombres premiers de A : 2, 3, 5, 7.'},
    {q:'e) Que vaut sup <i>A</i> dans (ℕ*, |)&nbsp;?',lab:'sup A =',ans:2520,hint:'Prends chaque nombre premier avec son plus grand exposant dans A : 8 = 2³, 9 = 3², 5, 7.',why:'ppcm(2, …, 10) = 2³ · 3² · 5 · 7 = 2520.'},
   ],
   sol:'<b>Unicité.</b> Deux plus grands éléments m, m′ vérifient m ≤ m′ et m′ ≤ m, donc m = m′.<br><b>Ordre total.</b> Si m est maximal et a ∈ A, a et m sont comparables ; m &lt; a contredirait la maximalité, donc a ≤ m : m est le plus grand élément.<br><b>Ordre partiel.</b> Pour A = {2, …, 10} et la divisibilité, il y a <b>5</b> maximaux (6, 7, 8, 9, 10) et <b>4</b> minimaux (2, 3, 5, 7) : ni plus grand ni plus petit élément.<br>La borne supérieure existe pourtant dans ℕ* : sup A = ppcm = 2³ · 3² · 5 · 7 = <b>2520</b>. Et inf A = 1, le pgcd.'},
]},

/* ===================== 3. RELATIONS D’ÉQUIVALENCE ===================== */
{subj:'gred',sem:'ens',id:'gred-equivalence',h:'Relations d’équivalence',p:'Classes, ensemble quotient, partitions, congruences et ℤ/nℤ, vecteurs comme classes de bipoints, compatibilité avec une opération.',steps:[
  {h:'Ressembler selon un critère',p:`Une <b>relation d’équivalence</b> sur <i>E</i> est une relation <b>réflexive, symétrique et transitive</b>. On la note souvent ~ ou ≡. Elle exprime qu’on considère deux éléments comme « pareils » d’un certain point de vue : avoir la même parité sur ℤ, avoir le même reste dans la division par 5, avoir le même âge dans une classe, être égaux.`,
   fig:graphe(['1','2','3','4'],(i,j)=>(i<2)===(j<2),{pos:[[-2,0.9],[-2,-0.9],[1.6,0.9],[1.6,-0.9]]}),
   note:'Le graphe d’une équivalence se découpe en « paquets » où tout est relié à tout, boucles comprises, sans aucune flèche entre deux paquets. Ici deux paquets : {1 ; 2} et {3 ; 4}.'},
  {h:'Équivalence ou pas&nbsp;?',p:'Laquelle de ces relations est une relation d’équivalence&nbsp;?',
   opts:['<i>x</i> <i>R</i> <i>y</i> ⇔ <i>xy</i> &gt; 0, sur ℝ','<i>x</i> <i>R</i> <i>y</i> ⇔ <i>x</i> et <i>y</i> ont le même reste dans la division par 5, sur ℕ','<i>x</i> <i>R</i> <i>y</i> ⇔ |<i>x</i> − <i>y</i>| ≤ 1, sur ℝ','<i>x</i> <i>R</i> <i>y</i> ⇔ <i>x</i> divise <i>y</i>, sur ℕ*'],ans:1,
   why:'« Même reste » est de la forme r(x) = r(y), donc réflexive, symétrique et transitive. xy &gt; 0 échoue en 0 (pas réflexive sur ℝ ; sur ℝ* ce serait une équivalence). |x − y| ≤ 1 n’est pas transitive. La divisibilité n’est pas symétrique.'},
  {kind:'Méthode',h:'Reconnaître une équivalence par un invariant',
   p:'<b>Quand :</b> la relation s’écrit <i>x</i> ~ <i>y</i> ⇔ <i>f</i>(<i>x</i>) = <i>f</i>(<i>y</i>) pour une certaine application <i>f</i> (un « invariant » : le reste, la parité, l’âge, la norme…). <b>Pourquoi :</b> l’égalité est réflexive, symétrique et transitive, et ces propriétés passent à ~ : <i>f</i>(<i>x</i>) = <i>f</i>(<i>x</i>) ; <i>f</i>(<i>x</i>) = <i>f</i>(<i>y</i>) ⇒ <i>f</i>(<i>y</i>) = <i>f</i>(<i>x</i>) ; <i>f</i>(<i>x</i>) = <i>f</i>(<i>y</i>) = <i>f</i>(<i>z</i>) ⇒ <i>f</i>(<i>x</i>) = <i>f</i>(<i>z</i>). <b>Bonus :</b> les classes sont les ensembles où <i>f</i> prend une même valeur.',
   demo:{enonce:'Sur ℝ², on pose (<i>x</i> ; <i>y</i>) ~ (<i>x</i>′ ; <i>y</i>′) ⇔ <i>x</i>² + <i>y</i>² = <i>x</i>′² + <i>y</i>′². Est-ce une équivalence&nbsp;? Quelles sont les classes&nbsp;?',
    etapes:[{f:'On pose <i>f</i>(<i>x</i> ; <i>y</i>) = <i>x</i>² + <i>y</i>². La relation s’écrit <i>f</i>(<i>M</i>) = <i>f</i>(<i>M</i>′).',w:'On repère l’invariant : le carré de la distance à l’origine O.'},
     {f:'C’est donc une relation d’équivalence.',w:'Les trois propriétés viennent de celles de l’égalité, sans autre calcul.'},
     {f:'La classe de (3 ; 4) : {<i>M</i> : <i>f</i>(<i>M</i>) = 25}, le cercle de centre O et de rayon 5.',w:'Une classe = un niveau de f.'},
     {f:'La classe de O est {O}. Les autres classes sont les cercles centrés en O.',w:'f(M) = 0 seulement pour M = O.'}],
    conclusion:'~ est une équivalence ; ses classes sont <b>les cercles de centre O</b> et le point O. Le quotient ℝ²/~ s’identifie à [0 ; +∞[ via le rayon.'},
   note:'Réciproquement, toute équivalence est de cette forme, avec f(x) = classe de x. C’est la surjection canonique, vue au chapitre suivant.'},
  {h:'Les classes d’un invariant',p:'Sur ℝ², on pose (<i>x</i> ; <i>y</i>) ~ (<i>x</i>′ ; <i>y</i>′) ⇔ <i>y</i> − <i>x</i> = <i>y</i>′ − <i>x</i>′. À quoi ressemblent les classes&nbsp;?',
   opts:['Aux droites parallèles à la droite y = x','Aux cercles centrés en O','Aux droites passant par O','Aux droites parallèles à la droite y = −x'],ans:0,
   why:'L’invariant est f(x ; y) = y − x. La classe de valeur c est la droite y = x + c, de pente 1 : toutes parallèles à y = x.'},
  {h:'Classes et ensemble quotient',p:`Soit ~ une équivalence sur <i>E</i>. La <b>classe</b> de <i>x</i> est <b>cl(<i>x</i>) = {<i>y</i> ∈ <i>E</i> : <i>y</i> ~ <i>x</i>}</b>, aussi notée <i>x̄</i> ou [<i>x</i>]. Tout élément d’une classe en est un <b>représentant</b>. L’ensemble des classes s’appelle l’<b>ensemble quotient</b>, noté <b><i>E</i>/~</b> : ses éléments sont des parties de <i>E</i>.<br>Exemple : pour « même parité » sur ℤ, cl(0) = nombres pairs, cl(1) = nombres impairs, et ℤ/~ = {cl(0) ; cl(1)} a deux éléments.`,
   note:'cl(4) = cl(0) : une même classe a plusieurs noms, un par représentant. C’est le point qui demande le plus d’attention dans tout ce chapitre.'},
  {h:'Les classes modulo n',p:'Sur <i>E</i> = {1 ; … ; 12}, on pose <i>x</i> ~ <i>y</i> ⇔ <i>x</i> et <i>y</i> ont le même reste dans la division par <i>n</i>. Chaque colonne est une classe. Change <i>n</i> et regarde la partition se reformer.',
   params:[{id:'n',l:'n',min:1,max:6,v:3}],
   draw:v=>{ const n=v.n, P=plane({x:[0,10],y:[0,8.2],grid:false,axes:false}), X=c=>5+(c-(n-1)/2)*1.55;
     for(let c=0;c<n;c++){ const els=[]; for(let x=1;x<=12;x++) if(x%n===(c+1)%n) els.push(x);
       P.rect(X(c)-0.6,7.95-els.length*0.62,1.2,els.length*0.62+0.05,{fill:COLS[c],fo:.15,c:COLS[c],w:1.5});
       els.forEach((x,q)=>P.text(X(c),7.6-q*0.62,String(x),{a:'middle',dy:5,s:13})); }
     return P.svg(); },
   info:v=>{ const cls=[]; for(let c=0;c<v.n;c++){ const els=[]; for(let x=1;x<=12;x++) if(x%v.n===(c+1)%v.n) els.push(x); cls.push('{'+els.join(' ; ')+'}'); }
     return `${v.n} classe(s) : ${cls.join(', ')}. Chaque élément est dans <b>une seule</b> classe.`; },
   note:'Avec n = 1, une seule classe (tout est équivalent). Avec n = 12 on aurait 12 classes à un élément : la relation serait l’égalité.'},
  {h:'Compter les classes',p:'Sur <i>E</i> = {1 ; 2 ; … ; 30}, on pose <i>x</i> ~ <i>y</i> ⇔ <i>x</i> et <i>y</i> ont la même somme des chiffres (par exemple 13 ~ 22 ~ 4). Combien l’ensemble quotient a-t-il d’éléments&nbsp;?',lab:'classes :',ans:11,
   why:'C’est l’invariant f(x) = somme des chiffres. On compte ses valeurs : de 1 (pour 1 et 10) à 11 (pour 29), toutes atteintes. Il y a donc 11 classes.'},
  {h:'Les classes forment une partition',p:`<b>Théorème.</b> Les classes d’une équivalence sur <i>E</i> forment une <b>partition</b> de <i>E</i> : elles sont non vides (<i>x</i> ∈ cl(<i>x</i>) par réflexivité), leur réunion est <i>E</i>, et <b>deux classes sont égales ou disjointes</b>. De plus, <b><i>x</i> ~ <i>y</i> ⇔ cl(<i>x</i>) = cl(<i>y</i>)</b>.`,
   note:'« Égales ou disjointes » : deux classes ne se chevauchent jamais à moitié. C’est ce qui permet de les traiter comme de nouveaux objets.'},
  {kind:'Défi',h:'Preuve guidée : égales ou disjointes',p:'On suppose que cl(<i>x</i>) et cl(<i>y</i>) ont un élément commun <i>z</i>. On veut montrer cl(<i>x</i>) ⊂ cl(<i>y</i>). Soit <i>t</i> ∈ cl(<i>x</i>). Quelle est la bonne suite&nbsp;?',
   opts:['t ~ x et z ~ x, donc t = z, donc t ∈ cl(y)','t ~ x ; or z ~ x donne x ~ z (symétrie) et z ~ y, donc x ~ y (transitivité) ; puis t ~ x et x ~ y donnent t ~ y : t ∈ cl(y)','t ~ x et x ~ x, donc t ∈ cl(y)','Comme z ∈ cl(y), toute la classe de x est dans cl(y)'],ans:1,
   why:'Le cœur de la preuve est x ~ y, obtenu en passant par z. Ensuite la transitivité transporte t. Par symétrie des rôles, cl(y) ⊂ cl(x) aussi : les classes sont égales. La première option confond « équivalent » et « égal ».'},
  {kind:'Méthode',h:'Déterminer les classes et un représentant canonique',
   p:'<b>Quand :</b> on doit décrire <i>E</i>/~ concrètement. <b>Comment :</b> 1) on vérifie les trois propriétés ; 2) on calcule la classe d’un élément typique ; 3) on choisit dans chaque classe un <b>représentant canonique</b>, un élément privilégié qui la désigne sans ambiguïté ; 4) on décrit le quotient par l’ensemble de ces représentants.',
   demo:{enonce:'Sur ℕ*, on pose <i>x</i> ~ <i>y</i> ⇔ <i>x</i>/<i>y</i> est une puissance de 2 (2<sup><i>k</i></sup> avec <i>k</i> ∈ ℤ). Décris les classes.',
    etapes:[{f:'Réflexive : <i>x</i>/<i>x</i> = 2⁰. Symétrique : <i>y</i>/<i>x</i> = 2<sup>−<i>k</i></sup>. Transitive : <i>x</i>/<i>z</i> = (<i>x</i>/<i>y</i>)(<i>y</i>/<i>z</i>) = 2<sup><i>k</i> + <i>l</i></sup>.',w:'Les exposants autorisés sont dans ℤ : c’est ce qui rend la relation symétrique.'},
     {f:'cl(3) = {3 ; 6 ; 12 ; 24 ; …} = {3 · 2<sup><i>k</i></sup> : <i>k</i> ∈ ℕ}.',w:'On multiplie ou divise 3 par des puissances de 2 tant qu’on reste dans ℕ*.'},
     {f:'Tout <i>x</i> s’écrit de façon unique 2<sup><i>k</i></sup> · <i>m</i> avec <i>m</i> impair. Alors <i>x</i> ~ <i>m</i>.',w:'On retire tous les facteurs 2 : il reste la « partie impaire » m.'},
     {f:'<i>x</i> ~ <i>y</i> ⇔ <i>x</i> et <i>y</i> ont la même partie impaire.',w:'On a retrouvé un invariant : chaque classe contient exactement un nombre impair, son représentant canonique.'}],
    conclusion:'Les classes sont les ensembles {<i>m</i> ; 2<i>m</i> ; 4<i>m</i> ; …} avec <i>m</i> impair, et <b>ℕ*/~ s’identifie aux nombres impairs</b>. Exemple : cl(40) = cl(5), car 40 = 2³ · 5.'}},
  {h:'Combien de classes touchées',p:'Avec la relation de la méthode (<i>x</i>/<i>y</i> est une puissance de 2), combien de classes différentes rencontrent l’ensemble {1 ; 2 ; … ; 20}&nbsp;?',lab:'classes :',ans:10,
   why:'Chaque classe a pour représentant sa partie impaire. Entre 1 et 20, les parties impaires possibles sont les impairs 1, 3, …, 19, et chacun est lui-même dans {1 ; … ; 20}. Il y a 10 classes.'},
  {h:'Une partition définit une équivalence',p:`La réciproque du théorème est vraie : si (<i>A</i><sub>1</sub>, …, <i>A</i><sub><i>k</i></sub>) est une partition de <i>E</i>, la relation « <i>x</i> et <i>y</i> sont dans le <b>même bloc</b> » est une équivalence, dont les classes sont exactement les blocs. Équivalences et partitions sont donc <b>deux faces d’une même notion</b>. Sur la grille, en rangeant les éléments bloc par bloc, on voit des carrés pleins le long de la diagonale. Ici la partition {1 ; 2}, {3}, {4 ; 5 ; 6}.`,
   fig:grilleB(['1','2','3','4','5','6'],['1','2','3','4','5','6'],[0,1,2,3,4,5].map(i=>[0,1,2,3,4,5].map(j=>{ const b=x=>x<2?0:x<3?1:2; return b(i)===b(j)?1:0; })),{col:i=>COLS[i<2?0:i<3?1:2]}),
   note:'Un bloc de b éléments donne b² couples dans le graphe : ici 2² + 1² + 3² = 14 couples.'},
  {kind:'Pratique',h:'Construis l’équivalence',p:'Range chaque élément de {1 ; … ; 6} dans un bloc (0, 1 ou 2) pour obtenir la relation « même reste dans la division par 3 ». La grille montre la relation « même bloc ».',
   params:[1,2,3,4,5,6].map(x=>({id:'b'+x,l:`bloc de ${x}`,min:0,max:2,v:0})),
   draw:v=>{ const b=[1,2,3,4,5,6].map(x=>v['b'+x]); return grilleB(['1','2','3','4','5','6'],['1','2','3','4','5','6'],b.map(p=>b.map(q=>p===q?1:0)),{col:i=>COLS[b[i]]}); },
   info:v=>{ const b=[1,2,3,4,5,6].map(x=>v['b'+x]), bl=[0,1,2].map(k=>[1,2,3,4,5,6].filter((x,i)=>b[i]===k)).filter(a=>a.length); return 'Blocs : '+bl.map(a=>'{'+a.join(' ; ')+'}').join(', '); },
   ok:v=>{ const b=[1,2,3,4,5,6].map(x=>v['b'+x]); return [0,1,2,3,4,5].every(i=>[0,1,2,3,4,5].every(j=>(b[i]===b[j])===((i-j)%3===0))); },
   why:'Les classes sont {1 ; 4}, {2 ; 5} et {3 ; 6}. Peu importe le numéro donné à chaque bloc : seule compte la partition. La grille contient 3 · 2² = 12 cases pleines.'},
  {h:'La taille du graphe',p:'On partage un ensemble de 10 éléments en trois blocs de 2, 3 et 5 éléments. Combien de couples contient le graphe de l’équivalence associée&nbsp;?',lab:'couples :',ans:38,
   why:'Dans un bloc de b éléments, tous les couples sont en relation : b² couples. 2² + 3² + 5² = 4 + 9 + 25 = 38.'},
  {h:'Congruence modulo n et ℤ/nℤ',p:`Soit <i>n</i> ≥ 1. On dit que <i>a</i> ≡ <i>b</i> (mod <i>n</i>) si <i>n</i> divise <i>a</i> − <i>b</i>. C’est une équivalence sur ℤ, dont les classes sont représentées par les restes 0, 1, …, <i>n</i> − 1. Le quotient se note <b>ℤ/<i>n</i>ℤ</b>. On l’imagine comme une <b>horloge</b> à <i>n</i> heures : avancer de <i>n</i> ramène au même endroit.`,
   params:[{id:'n',l:'n',min:2,max:12,v:5},{id:'a',l:'a',min:-20,max:20,v:7}],
   draw:v=>horloge(v.n,{hl:k=>k===mod(v.a,v.n),hand:mod(v.a,v.n)}),
   info:v=>{ const r=mod(v.a,v.n); return `${fmt(v.a)} ≡ <b>${r}</b> (mod ${v.n}) car ${fmt(v.a)} = ${v.n} · ${(v.a-r)/v.n<0?'('+fmt((v.a-r)/v.n)+')':fmt((v.a-r)/v.n)} + ${r}.<br>Classe : { …, ${fmt(r-2*v.n)}, ${fmt(r-v.n)}, ${r}, ${r+v.n}, ${r+2*v.n}, … }`; },
   note:'Une heure de l’horloge n’est pas un nombre mais une classe : « 2 heures » de ℤ/5ℤ désigne {…, −8, −3, 2, 7, 12, …}.'},
  {kind:'Méthode',h:'Trouver le représentant d’un entier négatif',
   p:'<b>Quand :</b> on doit ramener un entier <i>a</i> à son représentant entre 0 et <i>n</i> − 1. <b>Comment :</b> on écrit la division euclidienne <b><i>a</i> = <i>n</i><i>q</i> + <i>r</i> avec 0 ≤ <i>r</i> &lt; <i>n</i></b>. Pour <i>a</i> &lt; 0, le quotient <i>q</i> est négatif et on l’arrondit <b>vers le bas</b>, pour que le reste reste positif. <b>Astuce :</b> ajouter des multiples de <i>n</i> ne change pas la classe.',
   demo:{enonce:'Trouve le représentant de −17 dans ℤ/5ℤ.',
    etapes:[{f:'−17 / 5 = −3,4 ; on arrondit vers le bas : <i>q</i> = −4.',w:'Avec q = −3, on obtiendrait −17 = −15 − 2, un reste négatif, interdit.'},
     {f:'−17 = 5 · (−4) + 3, et 0 ≤ 3 &lt; 5.',w:'On vérifie la condition sur le reste.'},
     {f:'Contrôle : −17 + 20 = 3.',w:'Ajouter 4 · 5 ne change pas la classe.'}],
    conclusion:'<b>−17 ≡ 3 (mod 5)</b>, donc cl(−17) = cl(3) dans ℤ/5ℤ. Erreur fréquente : répondre 2, en prenant le reste de 17 puis en changeant le signe.'}},
  {h:'Un représentant',p:'Quel est le représentant de −23 dans ℤ/7ℤ (entre 0 et 6)&nbsp;?',lab:'r =',ans:5,
   why:'−23 = 7 · (−4) + 5, avec 0 ≤ 5 &lt; 7. Contrôle : −23 + 28 = 5.'},
  {h:'Compatibilité avec une opération',p:`Une équivalence ~ est <b>compatible</b> avec une opération ∗ si <b><i>x</i> ~ <i>x</i>′ et <i>y</i> ~ <i>y</i>′ ⇒ <i>x</i> ∗ <i>y</i> ~ <i>x</i>′ ∗ <i>y</i>′</b> : le résultat ne dépend que des classes, pas des représentants choisis. La congruence modulo <i>n</i> est compatible avec + et × :<br>(<i>a</i> + <i>b</i>) − (<i>a</i>′ + <i>b</i>′) = (<i>a</i> − <i>a</i>′) + (<i>b</i> − <i>b</i>′) et <i>ab</i> − <i>a</i>′<i>b</i>′ = <i>a</i>(<i>b</i> − <i>b</i>′) + <i>b</i>′(<i>a</i> − <i>a</i>′) sont des multiples de <i>n</i>.<br>On peut donc définir <b><i>ā</i> + <i>b̄</i> = (<i>a</i> + <i>b</i>)‾</b> et <b><i>ā</i> · <i>b̄</i> = (<i>ab</i>)‾</b> sur ℤ/<i>n</i>ℤ.`,
   note:'C’est exactement l’idée qui fabriquera plus tard les <b>groupes quotients</b> : on calcule sur des classes en calculant sur des représentants, ce qui n’a de sens que si la relation est compatible.'},
  {kind:'Méthode',h:'Calculer modulo n',
   p:'<b>Quand :</b> on cherche le reste d’un grand nombre, par exemple une puissance, dans la division par <i>n</i>. <b>Pourquoi ça marche :</b> par compatibilité, on peut remplacer à tout moment un nombre par n’importe quel nombre de sa classe, au milieu d’une somme ou d’un produit. <b>Comment :</b> on cherche une petite puissance congrue à 1 ou à −1, puis on découpe l’exposant.',
   demo:{enonce:'Trouve le reste de 2<sup>10</sup> dans la division par 7, puis celui de 5<sup>3</sup>.',
    etapes:[{f:'2³ = 8 ≡ 1 (mod 7).',w:'On cherche une puissance qui vaut 1 : elle « s’efface » dans les produits.'},
     {f:'2<sup>10</sup> = (2³)³ · 2 ≡ 1³ · 2 = 2 (mod 7).',w:'On écrit 10 = 3 · 3 + 1, puis on remplace 2³ par 1 grâce à la compatibilité avec ×.'},
     {f:'5³ = 125 = 7 · 17 + 6, donc 5³ ≡ 6 ≡ −1 (mod 7).',w:'Un représentant négatif est souvent plus pratique : (−1)<sup>k</sup> se calcule de tête.'}],
    conclusion:'<b>2<sup>10</sup> ≡ 2 (mod 7)</b> (en effet 1024 = 7 · 146 + 2), et <b>5³ ≡ −1 (mod 7)</b>, ce qui servira juste après.'}},
  {h:'Une grande puissance',p:'Quel est le reste de 5<sup>23</sup> dans la division par 7&nbsp;?',lab:'reste :',ans:3,
   why:'5³ ≡ −1 (mod 7). Or 23 = 3 · 7 + 2, donc 5²³ = (5³)⁷ · 5² ≡ (−1)⁷ · 25 = −25 (mod 7). Et −25 = 7 · (−4) + 3 : le reste est 3.'},
  {h:'Une relation incompatible',p:'Sur ℝ, on pose <i>x</i> ~ <i>y</i> ⇔ <i>x</i> et <i>y</i> ont la même partie entière (⌊<i>x</i>⌋ = ⌊<i>y</i>⌋). C’est une équivalence. Est-elle compatible avec l’addition&nbsp;?',
   opts:['Oui, car ⌊x + y⌋ = ⌊x⌋ + ⌊y⌋','Non : 0,5 ~ 0 et 0,5 ~ 0, mais 0,5 + 0,5 = 1 n’est pas équivalent à 0 + 0 = 0','Oui, car c’est une équivalence','Non, car ce n’est pas une équivalence'],ans:1,
   why:'La compatibilité exige que le résultat ne dépende pas des représentants. Ici, en remplaçant 0,5 par 0 dans la classe [0 ; 1[, la somme change de classe. ⌊x + y⌋ = ⌊x⌋ + ⌊y⌋ est faux en général : ⌊0,5 + 0,5⌋ = 1.'},
  {h:'Directions et vecteurs',p:`Deux exemples géométriques fondamentaux.<br>• Sur l’ensemble des droites du plan, « <i>d</i> est parallèle à <i>d</i>′ ou égale à <i>d</i>′ » est une équivalence. Une classe s’appelle une <b>direction</b>.<br>• Sur l’ensemble des <b>bipoints</b> (<i>A</i> ; <i>B</i>), on pose (<i>A</i> ; <i>B</i>) ~ (<i>C</i> ; <i>D</i>) si <i>ABDC</i> est un parallélogramme, éventuellement aplati, c’est-à-dire si [<i>AD</i>] et [<i>BC</i>] ont le même milieu. Une classe s’appelle un <b>vecteur</b>, noté <i>AB</i> avec une flèche.`,
   fig:(()=>{ const P=plane({x:[-0.5,7.5],y:[-0.5,4.5],grid:false,axes:false}); P.poly([[1,1],[3,2],[6,1.5],[4,0.5]],{c:'var(--muted)',w:1.5,dash:1}).seg(1,1,6,1.5,{c:'var(--bad)',w:1,dash:1}).seg(3,2,4,0.5,{c:'var(--bad)',w:1,dash:1}).arrow(1,1,3,2,{c:'var(--math)'}).arrow(4,0.5,6,1.5,{c:'var(--math)'}).arrow(1.5,3.2,3.5,4.2,{c:'var(--math)',op:.5}); P.dot(1,1,{l:'A',dx:-14,dy:14}).dot(3,2,{l:'B',dy:-8}).dot(4,0.5,{l:'C',dy:16}).dot(6,1.5,{l:'D'}).dot(3.5,1.25,{r:4,c:'var(--bad)'}); return P.svg(); })(),
   note:'Le point rouge est le milieu commun de [AD] et [BC]. Un vecteur n’est pas une flèche particulière, c’est la <b>classe</b> de toutes les flèches équivalentes : chaque bipoint en est un représentant.'},
  {kind:'Pratique',h:'Un représentant du même vecteur',p:'On fixe <i>A</i> = (1 ; 1) et <i>B</i> = (3 ; 2). Place <i>C</i> et <i>D</i> pour que (<i>C</i> ; <i>D</i>) soit équivalent à (<i>A</i> ; <i>B</i>), avec <i>C</i> ≠ <i>A</i>. Les milieux de [<i>AD</i>] et [<i>BC</i>] sont dessinés.',
   params:[{id:'cx',l:'C : abscisse',min:0,max:6,v:4},{id:'cy',l:'C : ordonnée',min:0,max:4,v:0},{id:'dx',l:'D : abscisse',min:0,max:7,v:5},{id:'dy',l:'D : ordonnée',min:0,max:4,v:3}],
   draw:v=>{ const P=plane({x:[-0.5,7.5],y:[-0.5,4.5],lab:1}), m1=[(1+v.dx)/2,(1+v.dy)/2], m2=[(3+v.cx)/2,(2+v.cy)/2];
     P.seg(1,1,v.dx,v.dy,{c:'var(--muted)',w:1.2,dash:1}).seg(3,2,v.cx,v.cy,{c:'var(--muted)',w:1.2,dash:1}).arrow(1,1,3,2,{c:'var(--math)'}).arrow(v.cx,v.cy,v.dx,v.dy,{c:'var(--spark)'});
     P.dot(1,1,{l:'A',r:5}).dot(3,2,{l:'B',r:5}).dot(v.cx,v.cy,{l:'C',r:5,c:'var(--math)'}).dot(v.dx,v.dy,{l:'D',r:5,c:'var(--math)'}).dot(m1[0],m1[1],{r:4,c:'var(--bad)'}).dot(m2[0],m2[1],{r:4,c:'var(--ok)'}); return P.svg(); },
   info:v=>{ const eq=v.dx-v.cx===2&&v.dy-v.cy===1; return `Milieu de [AD] : (${fmt((1+v.dx)/2)} ; ${fmt((1+v.dy)/2)}) · milieu de [BC] : (${fmt((3+v.cx)/2)} ; ${fmt((2+v.cy)/2)}) · ${eq?'<b>équivalents</b>':'pas équivalents'}`; },
   ok:v=>v.dx-v.cx===2&&v.dy-v.cy===1&&!(v.cx===1&&v.cy===1),
   why:'Les milieux coïncident exactement quand D − C = B − A = (2 ; 1) : on se déplace de 2 vers la droite et de 1 vers le haut. Par exemple C = (4 ; 0) et D = (6 ; 1).'},
  {h:'Parallèles au sens strict',p:'Sur l’ensemble des droites du plan, on pose <i>d</i> <i>R</i> <i>d</i>′ ⇔ <i>d</i> et <i>d</i>′ sont parallèles et <b>distinctes</b>. Pourquoi n’est-ce pas une équivalence&nbsp;?',
   opts:['Elle n’est pas symétrique','Elle n’est pas réflexive : une droite n’est pas distincte d’elle-même','Elle est réflexive mais pas transitive','C’est une équivalence'],ans:1,
   why:'d R d est faux. Elle n’est pas transitive non plus : d R d′ et d′ R d, mais pas d R d. C’est pour cela qu’on inclut le cas d = d′ dans la définition de la direction.'},
  {kind:'Problème',h:'Calculer dans ℤ/6ℤ',
   p:'On travaille dans ℤ/6ℤ, avec les représentants 0, 1, 2, 3, 4, 5 sur une horloge à 6 heures. Grâce à la compatibilité, on calcule sur ces représentants et on réduit modulo 6. On cherche à résoudre quelques équations et à calculer une grande puissance.',
   fig:horloge(6,{hl:k=>k===2||k===5,c:'var(--accent)'}),
   parts:[
    {q:'a) Combien de solutions <i>x</i> ∈ {0 ; … ; 5} l’équation 4<i>x</i> ≡ 2 (mod 6) a-t-elle&nbsp;?',lab:'solutions :',ans:2,hint:'Calcule 4x mod 6 pour les six valeurs de x.',why:'4x mod 6 vaut 0, 4, 2, 0, 4, 2 pour x = 0, …, 5. Les solutions sont x = 2 et x = 5 (colorées sur l’horloge).'},
    {q:'b) Pourquoi 2<i>x</i> ≡ 1 (mod 6) n’a-t-elle aucune solution&nbsp;?',opts:['Car 1 n’est pas dans ℤ/6ℤ','Car 2x − 1 est impair alors qu’un multiple de 6 est pair','Car 2 n’est pas premier','Car 6 est pair et 1 est impair, donc 1 ≢ 6'],ans:1,hint:'2x ≡ 1 (mod 6) signifie que 6 divise 2x − 1.',why:'2x − 1 = 6k est impossible : à gauche un nombre impair, à droite un nombre pair.'},
    {q:'c) Quel est le reste de 5<sup>2025</sup> dans la division par 6&nbsp;?',lab:'reste :',ans:5,hint:'5 ≡ −1 (mod 6).',why:'5²⁰²⁵ ≡ (−1)²⁰²⁵ = −1 ≡ 5 (mod 6), car 2025 est impair.'},
    {q:'d) Combien de classes <i>x</i> de ℤ/6ℤ vérifient <i>x</i>² ≡ <i>x</i>&nbsp;?',lab:'classes :',ans:4,hint:'Teste les six représentants.',why:'Carrés modulo 6 : 0, 1, 4, 3, 4, 1. On a x² ≡ x pour x = 0, 1, 3, 4 : quatre classes. Dans ℤ, seuls 0 et 1 vérifient x² = x.'},
   ],
   sol:'Par compatibilité de la congruence avec + et ×, on calcule sur les représentants 0, …, 5 et on réduit.<br>a) 4x ≡ 2 : la table 4x mod 6 donne 0, 4, 2, 0, 4, 2, d’où <b>2</b> solutions, x = 2 et x = 5.<br>b) 2x ≡ 1 : 6 | 2x − 1 est impossible, un nombre impair n’étant pas multiple de 6. Aucune solution.<br>c) 5 ≡ −1, donc 5²⁰²⁵ ≡ −1 ≡ <b>5</b>.<br>d) Les carrés sont 0, 1, 4, 3, 4, 1 : x² ≡ x pour <b>4</b> classes (0, 1, 3, 4). Le calcul dans ℤ/6ℤ ne se comporte pas comme dans ℤ.'},
  {kind:'Problème',h:'Le cercle comme quotient',
   p:'Sur ℝ, on pose <i>x</i> ~ <i>y</i> ⇔ <i>x</i> − <i>y</i> ∈ ℤ. Deux réels sont équivalents s’ils ont la même « partie après la virgule ». Chaque classe a un unique représentant dans [0 ; 1[, et on peut se représenter ℝ/~ comme un cercle de longueur 1 obtenu en enroulant la droite réelle. On vérifie que c’est une équivalence, puis on étudie sa compatibilité.',
   parts:[
    {q:'a) Pour la transitivité, on suppose <i>x</i> − <i>y</i> ∈ ℤ et <i>y</i> − <i>z</i> ∈ ℤ. Quel argument conclut&nbsp;?',opts:['x − z = (x − y) − (y − z), donc x − z ∈ ℤ','x − z = (x − y) + (y − z), somme de deux entiers, donc x − z ∈ ℤ','x = y = z','x − z ∈ ℤ car x, z ∈ ℝ'],ans:1,hint:'Fais apparaître y en ajoutant et retranchant.',why:'x − z = (x − y) + (y − z) : la somme de deux entiers est un entier. La première égalité est fausse.'},
    {q:'b) Quel est le représentant de −2,3 dans [0 ; 1[&nbsp;?',lab:'r =',ans:0.7,tol:.001,hint:'Ajoute l’entier qui ramène −2,3 dans [0 ; 1[.',why:'−2,3 + 3 = 0,7 ∈ [0 ; 1[ et 3 ∈ ℤ. Attention, 0,3 est faux : −2,3 − 0,3 = −2,6 n’est pas entier.'},
    {q:'c) La relation est-elle compatible avec l’addition et avec la multiplication&nbsp;?',opts:['Avec les deux','Avec aucune','Avec l’addition seulement : 0,5 ~ 1,5, mais 0,5 · 0,5 = 0,25 et 1,5 · 0,5 = 0,75 ne sont pas équivalents','Avec la multiplication seulement'],ans:2,hint:'Pour ×, essaie de remplacer 0,5 par 1,5 dans le produit 0,5 · 0,5.',why:'Addition : (x + y) − (x′ + y′) = (x − x′) + (y − y′) ∈ ℤ. Multiplication : 0,75 − 0,25 = 0,5 ∉ ℤ. On peut donc additionner des classes, pas les multiplier.'},
    {q:'d) Combien de classes différentes rencontre l’ensemble {<i>k</i>/4 : <i>k</i> = 0, 1, …, 20}&nbsp;?',lab:'classes :',ans:4,hint:'Cherche les représentants dans [0 ; 1[ : ce sont des quarts.',why:'k/4 ~ (k mod 4)/4 : les représentants possibles sont 0, 1/4, 1/2, 3/4. Il y a 4 classes, comme les quatre quarts d’heure sur une horloge.'},
   ],
   sol:'<b>Équivalence.</b> x − x = 0 ∈ ℤ ; si x − y ∈ ℤ, alors y − x = −(x − y) ∈ ℤ ; et x − z = (x − y) + (y − z) ∈ ℤ.<br><b>Représentants.</b> Chaque x a un unique représentant x − ⌊x⌋ ∈ [0 ; 1[ ; par exemple −2,3 ~ <b>0,7</b>.<br><b>Compatibilité.</b> Avec + : oui, car la différence des sommes est une somme d’entiers. Avec × : non, 0,5 ~ 1,5 mais 0,25 ≁ 0,75.<br>Ainsi ℝ/~ hérite d’une addition (on « tourne » sur le cercle), pas d’une multiplication. Les nombres k/4 donnent <b>4</b> classes, comme 4 points régulièrement espacés sur le cercle.'},
]},

/* ===================== 4. APPLICATIONS ===================== */
{subj:'gred',sem:'ens',id:'gred-applications',h:'Applications',p:'Une application est une relation très particulière : image, antécédent, applications usuelles, injections, surjections, bijections, et comment le prouver.',steps:[
  {h:'Une relation qui ne laisse personne de côté',p:`Une <b>application</b> <i>f</i> de <i>E</i> vers <i>F</i> est une relation de <i>E</i> vers <i>F</i> telle que <b>chaque</b> <i>x</i> ∈ <i>E</i> est en relation avec <b>exactement un</b> <i>y</i> ∈ <i>F</i>. On note ce <i>y</i> = <i>f</i>(<i>x</i>) et on écrit <i>f</i> : <i>E</i> → <i>F</i>, <i>x</i> ↦ <i>f</i>(<i>x</i>). Deux exigences :<br>• <b>fonctionnelle</b> : au plus un <i>y</i> pour chaque <i>x</i> ;<br>• <b>partout définie</b> : au moins un <i>y</i> pour chaque <i>x</i>.<br>Sur la grille : <b>chaque ligne contient exactement une case pleine</b>. Allume des couples et lis le diagnostic.`,
   params:params9((i,j)=>`${i} R ${'abc'[j-1]}`).map((p,k)=>Object.assign(p,{v:[1,1,0,0,0,0,0,0,1][k]})),
   draw:v=>{ const pr=[]; for(let i=0;i<3;i++) for(let j=0;j<3;j++) if(cell(v,i,j)) pr.push([i,j]); return sagR(L3,['a','b','c'],pr); },
   info:v=>{ const rows=[0,1,2].map(i=>[0,1,2].reduce((s,j)=>s+cell(v,i,j),0));
     const d=rows.map((c,i)=>`${i+1} : ${c} flèche${c>1?'s':''}${c>1?' (pas fonctionnelle)':c===0?' (pas définie)':''}`).join(' · ');
     return d+'<br>'+(rows.every(c=>c===1)?'<b>C’est une application.</b>':'Ce n’est <b>pas</b> une application.'); },
   note:'Rien n’est exigé des éléments de F : certains peuvent recevoir plusieurs flèches, d’autres aucune. L’asymétrie entre départ et arrivée est au cœur de toute la suite.'},
  {h:'Laquelle est une application&nbsp;?',p:'Laquelle de ces relations de ℝ vers ℝ est une application&nbsp;?',
   opts:['<i>x</i> <i>R</i> <i>y</i> ⇔ <i>y</i>² = <i>x</i>','<i>x</i> <i>R</i> <i>y</i> ⇔ <i>xy</i> = 1','<i>x</i> <i>R</i> <i>y</i> ⇔ <i>x</i> = <i>y</i>² + 1','<i>x</i> <i>R</i> <i>y</i> ⇔ <i>y</i> = <i>x</i>² − 1'],ans:3,
   why:'y = x² − 1 donne un unique y pour chaque x. y² = x : aucun y si x &lt; 0, deux si x &gt; 0. xy = 1 : rien pour x = 0. x = y² + 1 : rien pour x &lt; 1, deux y pour x &gt; 1.'},
  {h:'Vocabulaire et égalité',p:`Pour <i>f</i> : <i>E</i> → <i>F</i> : <i>E</i> est l’ensemble de <b>départ</b>, <i>F</i> l’ensemble d’<b>arrivée</b>, <i>f</i>(<i>x</i>) l’<b>image</b> de <i>x</i>, et tout <i>x</i> tel que <i>f</i>(<i>x</i>) = <i>y</i> est un <b>antécédent</b> de <i>y</i>. Le <b>graphe</b> est Γ<sub><i>f</i></sub> = {(<i>x</i> ; <i>f</i>(<i>x</i>)) : <i>x</i> ∈ <i>E</i>}. L’ensemble des applications de <i>E</i> vers <i>F</i> se note <b><i>F</i><sup><i>E</i></sup></b>.<br><b>Égalité :</b> <i>f</i> = <i>g</i> si elles ont le même départ, la même arrivée, et <i>f</i>(<i>x</i>) = <i>g</i>(<i>x</i>) pour tout <i>x</i>.`,
   note:'x ↦ |x| et x ↦ √(x²) sont la même application de ℝ vers ℝ : deux formules différentes, un seul graphe. Mais x ↦ x² de ℝ vers ℝ et x ↦ x² de ℝ vers [0 ; +∞[ sont deux applications différentes : l’arrivée n’est pas la même.'},
  {h:'Égales ou non&nbsp;?',p:'On considère <i>f</i>(<i>x</i>) = (<i>x</i>² − 1)/(<i>x</i> − 1) et <i>g</i>(<i>x</i>) = <i>x</i> + 1, chacune définie sur le plus grand ensemble possible de réels, à valeurs dans ℝ. Sont-elles égales&nbsp;?',
   opts:['Oui, car x² − 1 = (x − 1)(x + 1)','Oui, car leurs courbes se superposent','Non : f n’est pas définie en 1, alors que g l’est ; les départs diffèrent','Non, car f(2) ≠ g(2)'],ans:2,
   why:'f a pour départ ℝ \\ {1}, g a pour départ ℝ. Elles coïncident là où les deux sont définies (f(2) = g(2) = 3), mais ce ne sont pas les mêmes applications. La restriction de g à ℝ \\ {1} est égale à f.'},
  {kind:'Méthode',h:'Compter les applications entre ensembles finis',
   p:'<b>Quand :</b> <i>E</i> et <i>F</i> sont finis, de cardinaux <i>n</i> et <i>p</i>. <b>Pourquoi :</b> définir <i>f</i>, c’est choisir une image pour chaque élément de <i>E</i>, indépendamment : <i>p</i> choix, <i>n</i> fois. <b>Formule :</b> <b>card(<i>F</i><sup><i>E</i></sup>) = <i>p</i><sup><i>n</i></sup></b>, d’où la notation. <b>Lien avec les parties :</b> une application <i>E</i> → {0 ; 1} revient à choisir la partie des éléments envoyés sur 1, d’où card 𝒫(<i>E</i>) = 2<sup><i>n</i></sup>.',
   demo:{enonce:'Combien y a-t-il d’applications de <i>E</i> = {1 ; 2} vers <i>F</i> = {<i>a</i> ; <i>b</i> ; <i>c</i>}&nbsp;? Liste-les.',
    etapes:[{f:'<i>f</i>(1) : 3 choix ; <i>f</i>(2) : 3 choix. Total 3 · 3 = 3² = 9.',w:'Les choix sont indépendants : on multiplie.'},
     {f:'(<i>f</i>(1), <i>f</i>(2)) ∈ {(<i>a</i>,<i>a</i>), (<i>a</i>,<i>b</i>), (<i>a</i>,<i>c</i>), (<i>b</i>,<i>a</i>), (<i>b</i>,<i>b</i>), (<i>b</i>,<i>c</i>), (<i>c</i>,<i>a</i>), (<i>c</i>,<i>b</i>), (<i>c</i>,<i>c</i>)}.',w:'Une application de E vers F est déterminée par la liste de ses images : c’est un élément de F × F.'}],
    conclusion:'Il y a <b>9 = 3²</b> applications. Attention à l’ordre : c’est p<sup>n</sup> (arrivée puissance départ), pas n<sup>p</sup> : de F vers E, il n’y en aurait que 2³ = 8.'}},
  {h:'Combien d’applications',p:'Combien y a-t-il d’applications de {1 ; 2 ; 3} vers {<i>a</i> ; <i>b</i> ; <i>c</i> ; <i>d</i>}&nbsp;?',lab:'nombre :',ans:64,
   why:'Chacun des 3 éléments de départ choisit son image parmi 4 : 4³ = 64.'},
  {h:'Des applications à connaître',p:'Fais défiler les applications « de service » qui reviennent sans cesse.',
   params:[{id:'k',l:'Application',min:0,max:6,v:0}],
   draw:v=>{ const k=v.k;
     if(k===0) return sagR(L3,L3,[[0,0],[1,1],[2,2]],{lF:'E'});
     if(k===1) return sagR(L3,['a','b','c'],[[0,1],[1,1],[2,1]]);
     if(k===2) return sagR(['1','2'],L3,[[0,0],[1,1]],{lE:'A',lF:'E'});
     if(k===3) return sagR(['(1 ; a)','(1 ; b)','(2 ; a)','(2 ; b)'],['1','2'],[[0,0],[1,0],[2,1],[3,1]],{lE:'E × F',lF:'E',xE:2.6});
     if(k===4) return sagR(['1','2','3','4','5','6'],['cl(1)','cl(2)','cl(0)'],[[0,0],[1,1],[2,2],[3,0],[4,1],[5,2]],{lF:'E/≡'});
     if(k===5) return sagR(['−1','0','1','2'],['0','1','4'],[[0,1],[1,0],[2,1],[3,2]],{hl:[1,2,3]});
     const P=plane({x:[-9,9],y:[-0.6,1.4],w:320,h:150,lx:3,ly:1}); P.fn(x=>Math.sin(x)/x,{from:-9,to:-0.08}).fn(x=>Math.sin(x)/x,{from:0.08,to:9}); P.dot(0,1,{c:'var(--spark)',l:'g(0) = 1'}); return P.svg(); },
   info:v=>['<b>Identité</b> id<sub>E</sub> : x ↦ x. Chaque élément est sa propre image.',
     '<b>Application constante</b> : tout est envoyé sur le même élément, ici b.',
     '<b>Inclusion canonique</b> i : A → E, x ↦ x, pour A ⊂ E. Même formule que l’identité, mais l’arrivée est plus grande.',
     '<b>Première projection</b> p<sub>1</sub> : E × F → E, (x ; y) ↦ x. On « oublie » la seconde composante.',
     '<b>Surjection canonique</b> E → E/≡, x ↦ cl(x). Ici E = {1, …, 6} et la congruence modulo 3.',
     '<b>Restriction</b> : f(x) = x² de {−1 ; 0 ; 1 ; 2} vers {0 ; 1 ; 4}, restreinte à A = {0 ; 1 ; 2} (flèches orange). Même formule, départ plus petit.',
     '<b>Prolongement</b> : f(x) = sin(x)/x est définie sur ℝ*. L’application g égale à f sur ℝ* et telle que g(0) = 1 la <b>prolonge</b> à ℝ.'][v.k],
   note:'Restreindre, c’est réduire le départ ; prolonger, c’est l’agrandir en gardant les anciennes valeurs. Un prolongement n’est en général pas unique : ici g(0) = 1 est le choix qui rend g continue.'},
  {h:'La surjection canonique',p:'Soit <i>s</i> : ℤ → ℤ/3ℤ la surjection canonique, <i>s</i>(<i>x</i>) = cl(<i>x</i>). Quel est l’ensemble des antécédents de cl(2)&nbsp;?',
   opts:['{2}','{…, −4, −1, 2, 5, 8, …}, c’est-à-dire la classe cl(2) elle-même','{2 ; 5 ; 8}','Il n’y en a pas : cl(2) n’est pas un entier'],ans:1,
   why:'s(x) = cl(2) ⇔ x ≡ 2 (mod 3). Les antécédents d’une classe sont exactement ses éléments. Chaque classe en a, donc s est surjective ; elle n’est pas injective dès que les classes ont plus d’un élément.'},
  {h:'Injective, surjective, bijective',p:`Soit <i>f</i> : <i>E</i> → <i>F</i>.<br>• <b>Injective</b> : ∀<i>x</i>, <i>x</i>′ ∈ <i>E</i>, <i>f</i>(<i>x</i>) = <i>f</i>(<i>x</i>′) ⇒ <i>x</i> = <i>x</i>′. Tout <i>y</i> a <b>au plus un</b> antécédent.<br>• <b>Surjective</b> : ∀<i>y</i> ∈ <i>F</i>, ∃<i>x</i> ∈ <i>E</i>, <i>f</i>(<i>x</i>) = <i>y</i>. Tout <i>y</i> a <b>au moins un</b> antécédent.<br>• <b>Bijective</b> : les deux. Tout <i>y</i> a <b>exactement un</b> antécédent.<br>Pour une fonction réelle : la droite horizontale de hauteur <i>y</i> coupe la courbe au plus une fois, au moins une fois, exactement une fois.`,
   fig:(()=>{ const P=plane({x:[-3,3],y:[-2,4],lab:1}); P.fn(x=>x*x-1).seg(-3,2,3,2,{c:'var(--spark)',w:2,dash:1}).seg(-3,-1.6,3,-1.6,{c:'var(--bad)',w:2,dash:1}); P.dot(-Math.sqrt(3),2,{r:5}).dot(Math.sqrt(3),2,{r:5}); P.text(2.9,2,'2 antécédents',{a:'end',dy:-8,s:11}).text(2.9,-1.6,'aucun',{a:'end',dy:-8,s:11}); return P.svg(); })(),
   note:'Sur la figure, x ↦ x² − 1 de ℝ vers ℝ : la hauteur 2 est atteinte deux fois (pas injective), la hauteur −1,6 jamais (pas surjective).'},
  {h:'Le laboratoire des applications',p:'Choisis la taille de <i>E</i> et de <i>F</i>, puis l’image de chaque élément. Observe le nombre d’antécédents de chaque élément de <i>F</i>.',
   params:[{id:'n',l:'card E',min:2,max:4,v:3},{id:'m',l:'card F',min:2,max:4,v:3},{id:'f1',l:'f(1)',min:0,max:3,v:0},{id:'f2',l:'f(2)',min:0,max:3,v:0},{id:'f3',l:'f(3)',min:0,max:3,v:2},{id:'f4',l:'f(4)',min:0,max:3,v:1}],
   draw:v=>{ const im=[...Array(v.n).keys()].map(i=>Math.min(v['f'+(i+1)],v.m-1)); return sagR(['1','2','3','4'].slice(0,v.n),['a','b','c','d'].slice(0,v.m),im.map((j,i)=>[i,j])); },
   info:v=>{ const im=[...Array(v.n).keys()].map(i=>Math.min(v['f'+(i+1)],v.m-1)), cnt=[...Array(v.m).keys()].map(j=>im.filter(x=>x===j).length);
     const inj=cnt.every(c=>c<=1), sur=cnt.every(c=>c>=1);
     return 'Antécédents : '+cnt.map((c,j)=>`${'abcd'[j]} → ${c}`).join(', ')+'<br>'+(inj?'injective':'pas injective')+' · '+(sur?'surjective':'pas surjective')+(inj&&sur?' · <b>bijective</b>':''); },
   note:'Remarque : si card E &gt; card F, aucune application n’est injective ; si card E &lt; card F, aucune n’est surjective. C’est le <b>principe des tiroirs</b>.'},
  {kind:'Pratique',h:'Rends-la bijective',p:'<i>E</i> = {1 ; 2 ; 3 ; 4}, <i>F</i> = {<i>a</i> ; <i>b</i> ; <i>c</i> ; <i>d</i>}. Règle les images pour que <i>f</i> soit bijective, avec en plus <i>f</i>(1) = <i>c</i>.',
   params:[{id:'f1',l:'f(1)',min:0,max:3,v:0},{id:'f2',l:'f(2)',min:0,max:3,v:0},{id:'f3',l:'f(3)',min:0,max:3,v:1},{id:'f4',l:'f(4)',min:0,max:3,v:1}],
   draw:v=>sagR(['1','2','3','4'],['a','b','c','d'],[1,2,3,4].map((x,i)=>[i,v['f'+x]])),
   ok:v=>v.f1===2&&new Set([v.f1,v.f2,v.f3,v.f4]).size===4,
   why:'Chaque élément de F doit recevoir exactement une flèche. Avec f(1) = c, il reste à répartir a, b, d entre 2, 3, 4 : 3 · 2 · 1 = 6 façons possibles.'},
  {kind:'Méthode',h:'Prouver l’injectivité sur ℝ, ou la réfuter',
   p:'<b>Pour prouver :</b> on suppose <i>f</i>(<i>x</i>) = <i>f</i>(<i>x</i>′) et on démontre <i>x</i> = <i>x</i>′. Le plus souvent, on factorise <i>f</i>(<i>x</i>) − <i>f</i>(<i>x</i>′) par (<i>x</i> − <i>x</i>′) et on montre que l’autre facteur ne s’annule pas. <b>Pour réfuter :</b> on exhibe deux réels <b>distincts</b> de même image ; on les trouve en cherchant quand l’autre facteur s’annule.',
   demo:{enonce:'Montre que <i>f</i> : ℝ → ℝ, <i>f</i>(<i>x</i>) = <i>x</i>³ + <i>x</i>, est injective.',
    etapes:[{f:'<i>f</i>(<i>x</i>) − <i>f</i>(<i>x</i>′) = (<i>x</i>³ − <i>x</i>′³) + (<i>x</i> − <i>x</i>′) = (<i>x</i> − <i>x</i>′)(<i>x</i>² + <i>xx</i>′ + <i>x</i>′² + 1).',w:'On utilise a³ − b³ = (a − b)(a² + ab + b²) et on met (x − x′) en facteur.'},
     {f:'<i>x</i>² + <i>xx</i>′ + <i>x</i>′² = (<i>x</i> + <i>x</i>′/2)² + 3<i>x</i>′²/4 ≥ 0.',w:'On complète le carré pour voir le signe.'},
     {f:'Donc le second facteur est ≥ 1 &gt; 0.',w:'Il ne s’annule jamais.'},
     {f:'Si <i>f</i>(<i>x</i>) = <i>f</i>(<i>x</i>′), le produit est nul, donc <i>x</i> − <i>x</i>′ = 0.',w:'Un produit de réels est nul si et seulement si l’un des facteurs l’est.'}],
    conclusion:'<b>f est injective</b> sur ℝ. Pour f(x) = x³ − x, le même calcul donne le facteur x² + xx′ + x′² − 1, qui s’annule pour x = 1, x′ = 0 : f(1) = f(0) = 0, pas injective.'}},
  {h:'Deux réels de même image',p:'Soit <i>f</i> : ℝ → ℝ, <i>f</i>(<i>x</i>) = <i>x</i>² − 6<i>x</i>. Trouve <i>x</i>′ ≠ 0 tel que <i>f</i>(<i>x</i>′) = <i>f</i>(0).',lab:'x′ =',ans:6,
   why:'f(x) − f(x′) = (x − x′)(x + x′ − 6). Avec x = 0, le second facteur s’annule pour x′ = 6. Contrôle : f(6) = 36 − 36 = 0 = f(0). f n’est pas injective.'},
  {kind:'Méthode',h:'Prouver la surjectivité, ou la réfuter',
   p:'<b>Pour prouver :</b> on fixe <i>y</i> quelconque dans l’arrivée et on <b>résout</b> <i>f</i>(<i>x</i>) = <i>y</i> d’inconnue <i>x</i> ; il suffit de trouver une solution dans le départ. <b>Pour réfuter :</b> on trouve un <i>y</i> sans antécédent. Souvent, une <b>inégalité</b> montre que <i>f</i> reste bornée ou positive, ce qui exclut des valeurs.',
   demo:{enonce:'<i>f</i> : ℝ → ℝ, <i>f</i>(<i>x</i>) = 2<i>x</i>/(1 + <i>x</i>²). Est-elle surjective&nbsp;? Quelle arrivée la rend surjective&nbsp;?',
    etapes:[{f:'1 + <i>x</i>² − 2|<i>x</i>| = (1 − |<i>x</i>|)² ≥ 0, donc |2<i>x</i>| ≤ 1 + <i>x</i>², soit |<i>f</i>(<i>x</i>)| ≤ 1.',w:'On cherche une inégalité qui borne f.'},
     {f:'Donc 2 n’a pas d’antécédent : <i>f</i> n’est pas surjective sur ℝ.',w:'Un seul y sans antécédent suffit.'},
     {f:'Pour <i>y</i> ∈ [−1 ; 1], <i>y</i> ≠ 0 : 2<i>x</i>/(1 + <i>x</i>²) = <i>y</i> ⇔ <i>yx</i>² − 2<i>x</i> + <i>y</i> = 0, de discriminant 4 − 4<i>y</i>² ≥ 0.',w:'On résout l’équation : une équation du second degré en x a une solution réelle quand le discriminant est positif ou nul.'},
     {f:'Pour <i>y</i> = 0 : <i>x</i> = 0 convient.',w:'Cas à part, car l’équation n’est plus du second degré.'}],
    conclusion:'<b>f : ℝ → [−1 ; 1] est surjective</b> (mais pas injective : f(2) = f(1/2) = 4/5). Changer l’arrivée change la surjectivité.'}},
  {h:'La plus petite valeur atteinte',p:'Soit <i>f</i> : ℝ → ℝ, <i>f</i>(<i>x</i>) = <i>x</i>² + 4<i>x</i> + 1. Quel est le plus petit réel <i>y</i> qui possède un antécédent&nbsp;?',lab:'y =',ans:-3,
   why:'f(x) = (x + 2)² − 3 ≥ −3, avec égalité en x = −2. Tout y ≥ −3 a un antécédent (x = −2 ± √(y + 3)), et tout y &lt; −3 n’en a pas. f est une surjection de ℝ sur [−3 ; +∞[.'},
  {h:'Laquelle est bijective&nbsp;?',p:'Laquelle de ces applications de ℝ vers ℝ est bijective&nbsp;?',
   opts:['<i>x</i> ↦ <i>x</i>² + <i>x</i>','<i>x</i> ↦ |<i>x</i>|','<i>x</i> ↦ 1/(1 + <i>x</i>²)','<i>x</i> ↦ <i>x</i>³'],ans:3,
   why:'x³ = y a l’unique solution x = ∛y pour tout réel y. x² + x et 1/(1 + x²) prennent deux fois certaines valeurs et en évitent d’autres ; |x| ne prend aucune valeur négative et |−1| = |1|.'},
  {kind:'Méthode',h:'Compter les injections et les bijections',
   p:'<b>Quand :</b> <i>E</i> et <i>F</i> sont finis, card <i>E</i> = <i>n</i> ≤ card <i>F</i> = <i>p</i>. <b>Comment :</b> on choisit les images une à une, en interdisant les images déjà prises : <i>p</i> choix pour le premier, <i>p</i> − 1 pour le deuxième, … <b>Injections :</b> <i>p</i>(<i>p</i> − 1)⋯(<i>p</i> − <i>n</i> + 1). <b>Bijections</b> (si <i>n</i> = <i>p</i>) : <i>n</i>! = <i>n</i>(<i>n</i> − 1)⋯1. <b>Principe des tiroirs :</b> si <i>n</i> &gt; <i>p</i>, aucune injection ; si <i>n</i> = <i>p</i>, une application est injective ⇔ surjective ⇔ bijective.',
   demo:{enonce:'<i>E</i> = {1 ; 2 ; 3}, <i>F</i> = {<i>a</i> ; <i>b</i> ; <i>c</i> ; <i>d</i>}. Combien d’injections de <i>E</i> vers <i>F</i>&nbsp;? de surjections&nbsp;?',
    etapes:[{f:'<i>f</i>(1) : 4 choix. <i>f</i>(2) ≠ <i>f</i>(1) : 3 choix. <i>f</i>(3) : 2 choix.',w:'Chaque image déjà utilisée est interdite.'},
     {f:'Injections : 4 · 3 · 2 = 24.',w:'On multiplie les choix successifs.'},
     {f:'Surjections : 3 flèches ne peuvent pas atteindre 4 éléments. Aucune.',w:'Principe des tiroirs, dans l’autre sens.'}],
    conclusion:'<b>24 injections, 0 surjection.</b> Sur les 4³ = 64 applications, 40 ne sont donc pas injectives.'}},
  {h:'Compter des injections',p:'Combien y a-t-il d’applications injectives de {1 ; 2 ; 3} vers {1 ; 2 ; 3 ; 4 ; 5}&nbsp;?',lab:'injections :',ans:60,
   why:'5 choix pour f(1), puis 4, puis 3 : 5 · 4 · 3 = 60.'},
  {h:'Le principe des tiroirs',p:'Dans un groupe de 13 personnes, on considère l’application qui associe à chacune son mois de naissance. Que peut-on affirmer à coup sûr&nbsp;?',
   opts:['Elle est surjective : tous les mois sont représentés','Elle n’est pas injective : deux personnes au moins sont nées le même mois','Elle est bijective','On ne peut rien affirmer'],ans:1,
   why:'13 éléments au départ, 12 à l’arrivée : aucune application n’est injective. En revanche, rien ne garantit la surjectivité : les 13 peuvent tous être nés en mai.'},
  {kind:'Problème',h:'L’application x ↦ x|x|',
   p:'On étudie <i>f</i> : ℝ → ℝ, <i>f</i>(<i>x</i>) = <i>x</i>|<i>x</i>|. Elle vaut <i>x</i>² pour <i>x</i> ≥ 0 et −<i>x</i>² pour <i>x</i> &lt; 0. On veut montrer qu’elle est bijective et trouver sa réciproque. Le curseur place la droite horizontale de hauteur <i>y</i>.',
   params:[{id:'y',l:'y',min:-4,max:4,step:0.5,v:2}],
   draw:v=>{ const P=plane({x:[-3,3],y:[-4.5,4.5],lab:1,h:300}), r=Math.sqrt(Math.abs(v.y))*Math.sign(v.y); P.fn(x=>x*Math.abs(x)).seg(-3,v.y,3,v.y,{c:'var(--spark)',w:2,dash:1}).seg(r,0,r,v.y,{c:'var(--muted)',w:1,dash:1}); P.dot(r,v.y,{c:'var(--bad)'}); return P.svg(); },
   info:v=>`Hauteur ${fmt(v.y)} : un seul antécédent, x = ${fmt(Math.sqrt(Math.abs(v.y))*Math.sign(v.y))}`,
   parts:[
    {q:'a) Calcule <i>f</i>(−3).',lab:'f(−3) =',ans:-9,hint:'|−3| = 3.',why:'f(−3) = −3 · 3 = −9.'},
    {q:'b) Résous <i>f</i>(<i>x</i>) = −5. Donne <i>x</i> arrondi au centième.',lab:'x ≈',ans:-2.24,tol:.01,hint:'f(x) est du signe de x. Cherche donc x &lt; 0 avec −x² = −5.',why:'x &lt; 0 et x² = 5 donnent x = −√5 ≈ −2,24.'},
    {q:'c) Pourquoi <i>f</i> est-elle injective&nbsp;?',opts:['Car f(−x) = −f(x)','Si f(x) = f(x′), x et x′ ont le même signe que cette valeur commune ; alors x² = x′² avec x, x′ de même signe, donc x = x′','Car f est continue','Car f(0) = 0'],ans:1,hint:'Le signe de f(x) est celui de x. Que reste-t-il de x² = x′² quand x et x′ ont le même signe ?',why:'Le signe de f(x) donne celui de x. Avec x, x′ de même signe, x² = x′² force x = x′. L’imparité seule ne prouve rien : x ↦ x³ − x est impaire et non injective.'},
    {q:'d) Quelle est la réciproque de <i>f</i>&nbsp;?',opts:['f⁻¹(y) = √|y|','f⁻¹(y) = √y pour y ≥ 0, et −√(−y) pour y &lt; 0','f⁻¹(y) = y|y|','f⁻¹(y) = 1/(y|y|)'],ans:1,hint:'Résous f(x) = y en séparant y ≥ 0 et y &lt; 0.',why:'Pour y ≥ 0, l’unique antécédent est √y ; pour y &lt; 0, c’est −√(−y). Chaque y a exactement un antécédent : f est bijective. Contrôle : f(−√5) = −5.'},
   ],
   sol:'Le signe de f(x) = x|x| est celui de x.<br><b>Injectivité.</b> Si f(x) = f(x′), alors x et x′ ont le même signe et x² = x′² ; donc x = x′.<br><b>Surjectivité.</b> Pour y ≥ 0, x = √y ≥ 0 donne f(x) = y ; pour y &lt; 0, x = −√(−y) donne f(x) = −(−y) = y.<br>f est donc <b>bijective</b>, de réciproque f⁻¹(y) = √y si y ≥ 0 et −√(−y) si y &lt; 0.<br>Applications : f(−3) = −9 et f⁻¹(−5) = −√5 ≈ −2,24.'},
  {kind:'Problème',h:'Coder un couple par un seul entier',
   p:'On définit <i>f</i> : ℕ × ℕ → ℕ par <i>f</i>(<i>a</i> ; <i>b</i>) = 2<sup><i>a</i></sup>(2<i>b</i> + 1) − 1. On veut montrer que <i>f</i> est bijective : chaque entier naturel code alors un unique couple. On utilise que tout entier <i>N</i> ≥ 1 s’écrit de façon <b>unique</b> <i>N</i> = 2<sup><i>a</i></sup> · <i>m</i> avec <i>m</i> impair (on retire tous les facteurs 2, voir la partie impaire au chapitre des équivalences).',
   parts:[
    {q:'a) Calcule <i>f</i>(2 ; 3).',lab:'f(2 ; 3) =',ans:27,hint:'2² · (2 · 3 + 1) − 1.',why:'4 · 7 − 1 = 27.'},
    {q:'b) On cherche l’antécédent (<i>a</i> ; <i>b</i>) de 47. Que vaut <i>a</i>&nbsp;?',lab:'a =',ans:4,hint:'f(a ; b) = 47 ⇔ 2<sup>a</sup>(2b + 1) = 48. Retire tous les facteurs 2 de 48.',why:'48 = 2⁴ · 3, avec 3 impair. Donc a = 4.'},
    {q:'c) Et que vaut <i>b</i>&nbsp;?',lab:'b =',ans:1,hint:'La partie impaire 3 doit valoir 2b + 1.',why:'2b + 1 = 3 donne b = 1. Contrôle : f(4 ; 1) = 16 · 3 − 1 = 47.'},
    {q:'d) Pourquoi <i>f</i> est-elle injective&nbsp;?',opts:['Car 2<sup>a</sup> est toujours pair','Si f(a ; b) = f(a′ ; b′), alors 2<sup>a</sup>(2b + 1) = 2<sup>a′</sup>(2b′ + 1), deux écritures « puissance de 2 fois impair » du même entier ; par unicité, a = a′ et 2b + 1 = 2b′ + 1','Car f est croissante en a','Car ℕ × ℕ est infini'],ans:1,hint:'Ajoute 1 des deux côtés de f(a ; b) = f(a′ ; b′).',why:'On se ramène à l’unicité de la décomposition N = 2<sup>a</sup> · m. Puis b = b′.'},
    {q:'e) Pourquoi <i>f</i> est-elle surjective&nbsp;?',opts:['Pour n ∈ ℕ, n + 1 ≥ 1 s’écrit 2<sup>a</sup> · m avec m impair ; on pose b = (m − 1)/2 ∈ ℕ, et f(a ; b) = n','Car f(0 ; 0) = 0','Car f est injective','Car tout entier est impair'],ans:0,hint:'Pars d’un n quelconque et décompose n + 1.',why:'m impair donne m = 2b + 1 avec b ∈ ℕ. Alors f(a ; b) = 2<sup>a</sup> m − 1 = n.'},
   ],
   sol:'Pour (a ; b) ∈ ℕ × ℕ, f(a ; b) + 1 = 2<sup>a</sup>(2b + 1) est un entier ≥ 1 écrit sous la forme « puissance de 2 fois impair ».<br><b>Injectivité.</b> f(a ; b) = f(a′ ; b′) donne 2<sup>a</sup>(2b + 1) = 2<sup>a′</sup>(2b′ + 1). Par unicité de la décomposition, a = a′ et b = b′.<br><b>Surjectivité.</b> Pour n ∈ ℕ, on écrit n + 1 = 2<sup>a</sup> · m avec m impair, m = 2b + 1 : alors f(a ; b) = n.<br>Donc <b>f est une bijection de ℕ × ℕ sur ℕ</b>. Exemples : f(2 ; 3) = 27 et f⁻¹(47) = (4 ; 1). On en reparlera pour comparer la « taille » de ℕ × ℕ et de ℕ.'},
]},

/* ===================== 5. COMPOSÉES ET RÉCIPROQUES ===================== */
{subj:'gred',sem:'ens',id:'gred-composees',h:'Composées et réciproques',p:'Enchaîner deux applications, défaire une bijection, et transporter des parties entières : images directes et réciproques.',steps:[
  {h:'Enchaîner deux applications',p:`Si <i>f</i> : <i>E</i> → <i>F</i> et <i>g</i> : <i>F</i> → <i>G</i>, la <b>composée</b> <i>g</i> ∘ <i>f</i> : <i>E</i> → <i>G</i> est définie par <b>(<i>g</i> ∘ <i>f</i>)(<i>x</i>) = <i>g</i>(<i>f</i>(<i>x</i>))</b>. On applique <i>f</i> <b>d’abord</b>, puis <i>g</i> : on lit « <i>g</i> rond <i>f</i> » de droite à gauche. Règle les deux applications et suis les chemins de <i>E</i> à <i>G</i>.`,
   params:[{id:'f1',l:'f(1)',min:0,max:2,v:0},{id:'f2',l:'f(2)',min:0,max:2,v:2},{id:'f3',l:'f(3)',min:0,max:2,v:2},{id:'g1',l:'g(a)',min:0,max:2,v:1},{id:'g2',l:'g(b)',min:0,max:2,v:0},{id:'g3',l:'g(c)',min:0,max:2,v:0}],
   draw:v=>{ const P=plane({x:[0,10],y:[0,6.6],grid:false,axes:false}), X=[1.6,5,8.4], Y=i=>5.4-i*2.3, f=[v.f1,v.f2,v.f3], g=[v.g1,v.g2,v.g3], LB=[['1','2','3'],['a','b','c'],['α','β','γ']];
     X.forEach(x=>P.rect(x-0.7,0.6,1.4,5.5,{c:'var(--muted)',w:1.5}));
     f.forEach((j,i)=>P.arrow(X[0]+0.2,Y(i),X[1]-0.25,Y(j),{c:'var(--math)',w:2,hs:9}));
     g.forEach((k,j)=>P.arrow(X[1]+0.2,Y(j),X[2]-0.25,Y(k),{c:'var(--spark)',w:2,hs:9}));
     X.forEach((x,c)=>LB[c].forEach((l,i)=>P.dot(x,Y(i),{r:5,c:'var(--ink)'}).text(x,Y(i),l,{a:c===2?'start':'end',dx:c===2?9:-9,dy:-6,s:12})));
     ['E','F','G'].forEach((l,c)=>P.text(X[c],0.6,l,{a:'middle',dy:16,c:'var(--muted)'}));
     P.text(3.3,6.2,'f',{a:'middle',c:'var(--math)'}).text(6.7,6.2,'g',{a:'middle',c:'var(--spark)'}); return P.svg(); },
   info:v=>{ const f=[v.f1,v.f2,v.f3], g=[v.g1,v.g2,v.g3]; return '(g ∘ f)(1) = '+'αβγ'[g[f[0]]]+' · (g ∘ f)(2) = '+'αβγ'[g[f[1]]]+' · (g ∘ f)(3) = '+'αβγ'[g[f[2]]]; },
   note:'Pour que g ∘ f existe, il faut que les images de f soient dans le départ de g. Ici f ∘ g n’a même pas de sens : g arrive dans G, et f part de E.'},
  {h:'Dans les deux ordres',p:'Soit <i>f</i>(<i>x</i>) = 2<i>x</i> − 1 et <i>g</i>(<i>x</i>) = <i>x</i>² + 1, de ℝ vers ℝ. Calcule (<i>g</i> ∘ <i>f</i>)(3).',lab:'(g ∘ f)(3) =',ans:26,
   why:'f(3) = 5, puis g(5) = 26. Dans l’autre ordre, (f ∘ g)(3) = f(10) = 19 : l’ordre compte.'},
  {h:'La composition n’est pas commutative',p:`En général <b><i>g</i> ∘ <i>f</i> ≠ <i>f</i> ∘ <i>g</i></b>. Avec <i>f</i>(<i>x</i>) = <i>x</i> + <i>a</i> (translation) et <i>g</i>(<i>x</i>) = <i>bx</i> (dilatation) : (<i>g</i> ∘ <i>f</i>)(<i>x</i>) = <i>b</i>(<i>x</i> + <i>a</i>) = <i>bx</i> + <i>ab</i>, mais (<i>f</i> ∘ <i>g</i>)(<i>x</i>) = <i>bx</i> + <i>a</i>. Cherche quand les deux droites se confondent.`,
   params:[{id:'a',l:'a',min:-2,max:2,step:0.5,v:1},{id:'b',l:'b',min:-2,max:3,step:0.5,v:2}],
   draw:v=>{ const P=plane({x:[-4,4],y:[-4,4],lab:1}); P.fn(x=>v.b*x+v.a*v.b,{c:'var(--math)'}).fn(x=>v.b*x+v.a,{c:'var(--spark)',dash:1}); P.text(-3.8,3.5,'g ∘ f',{c:'var(--math)',s:12}).text(-3.8,2.9,'f ∘ g',{c:'var(--spark)',s:12}); return P.svg(); },
   info:v=>{ const eq=Math.abs(v.a*v.b-v.a)<1e-9; return `g ∘ f : x ↦ ${fmt(v.b)}x + ${fmt(v.a*v.b)} · f ∘ g : x ↦ ${fmt(v.b)}x + ${fmt(v.a)} → ${eq?'<b>égales</b>':'différentes'}`; },
   note:'Elles coïncident seulement si ab = a, c’est-à-dire a = 0 (pas de translation) ou b = 1 (pas de dilatation). « Translater puis dilater » n’est pas « dilater puis translater ».'},
  {h:'Associativité et identité',p:`Pour <i>f</i> : <i>E</i> → <i>F</i>, <i>g</i> : <i>F</i> → <i>G</i>, <i>h</i> : <i>G</i> → <i>H</i> : <b><i>h</i> ∘ (<i>g</i> ∘ <i>f</i>) = (<i>h</i> ∘ <i>g</i>) ∘ <i>f</i></b>, car les deux envoient <i>x</i> sur <i>h</i>(<i>g</i>(<i>f</i>(<i>x</i>))). On écrit donc simplement <i>h</i> ∘ <i>g</i> ∘ <i>f</i>. Enfin l’identité ne change rien : <b><i>f</i> ∘ id<sub><i>E</i></sub> = <i>f</i></b> et <b>id<sub><i>F</i></sub> ∘ <i>f</i> = <i>f</i></b>.`,
   note:'Associative mais pas commutative : la composition se comporte comme le produit de matrices, pas comme celui des nombres. On retrouvera ces propriétés dans les groupes.'},
  {h:'Trois étages',p:'Avec <i>f</i>(<i>x</i>) = <i>x</i> + 1, <i>g</i>(<i>x</i>) = <i>x</i>² et <i>h</i>(<i>x</i>) = 1/<i>x</i>, calcule (<i>h</i> ∘ <i>g</i> ∘ <i>f</i>)(1).',lab:'valeur :',ans:0.25,tol:.001,
   why:'On part de la droite : f(1) = 2, g(2) = 4, h(4) = 1/4 = 0,25.'},
  {kind:'Méthode',h:'Décomposer une fonction et trouver son domaine',
   p:'<b>Quand :</b> une formule enchaîne plusieurs opérations, et on cherche où elle est définie. <b>Comment :</b> on suit le calcul de <i>x</i> comme une machine : chaque opération est une application. On écrit la fonction comme <i>h</i> ∘ <i>g</i> ∘ <i>f</i>, puis on impose à chaque étage que la valeur reçue soit dans le départ de l’étage suivant.',
   demo:{enonce:'Décompose <i>k</i>(<i>x</i>) = 1/√(<i>x</i> − 2) et trouve son plus grand domaine de définition dans ℝ.',
    etapes:[{f:'<i>f</i>(<i>x</i>) = <i>x</i> − 2, <i>g</i>(<i>u</i>) = √<i>u</i>, <i>h</i>(<i>v</i>) = 1/<i>v</i>, et <i>k</i> = <i>h</i> ∘ <i>g</i> ∘ <i>f</i>.',w:'On liste les opérations dans l’ordre où on les effectue : soustraire 2, prendre la racine, inverser.'},
     {f:'Étage <i>g</i> : il faut <i>f</i>(<i>x</i>) ≥ 0, soit <i>x</i> ≥ 2.',w:'La racine carrée part de [0 ; +∞[.'},
     {f:'Étage <i>h</i> : il faut <i>g</i>(<i>f</i>(<i>x</i>)) ≠ 0, soit <i>x</i> ≠ 2.',w:'L’inverse part de ℝ*.'}],
    conclusion:'<i>k</i> est définie sur <b>]2 ; +∞[</b>. Le domaine d’une composée se lit en remontant les étages, de l’intérieur vers l’extérieur.'}},
  {h:'Le bon ordre',p:'On veut écrire <i>k</i>(<i>x</i>) = (3<i>x</i> + 1)² sous la forme <i>v</i> ∘ <i>u</i>. Quel choix est correct&nbsp;?',
   opts:['u(x) = x², v(x) = 3x + 1','u(x) = 3x + 1, v(x) = x²','u(x) = 3x, v(x) = x² + 1','u(x) = (3x)², v(x) = x + 1'],ans:1,
   why:'v(u(x)) = (3x + 1)² : on calcule d’abord 3x + 1, puis on élève au carré. Le premier choix donne v(u(x)) = 3x² + 1, et les deux derniers donnent 9x² + 1.'},
  {h:'La bijection réciproque',p:`Si <i>f</i> : <i>E</i> → <i>F</i> est bijective, tout <i>y</i> ∈ <i>F</i> a un unique antécédent ; on le note <i>f</i>⁻¹(<i>y</i>). On obtient la <b>réciproque</b> <i>f</i>⁻¹ : <i>F</i> → <i>E</i>, qui vérifie<br><b><i>f</i>⁻¹ ∘ <i>f</i> = id<sub><i>E</i></sub> et <i>f</i> ∘ <i>f</i>⁻¹ = id<sub><i>F</i></sub></b>.<br><b>Théorème.</b> Réciproquement, s’il existe <i>g</i> : <i>F</i> → <i>E</i> avec <i>g</i> ∘ <i>f</i> = id<sub><i>E</i></sub> et <i>f</i> ∘ <i>g</i> = id<sub><i>F</i></sub>, alors <i>f</i> est bijective et <i>g</i> = <i>f</i>⁻¹.`,
   note:'La réciproque d’une application est la relation réciproque de sa relation (flèches retournées). Elle n’est une application que si f est bijective.'},
  {kind:'Défi',h:'Preuve guidée : une demi-identité',p:'On sait seulement que <i>g</i> ∘ <i>f</i> = id<sub><i>E</i></sub>. On veut montrer que <i>f</i> est injective. Soit <i>x</i>, <i>x</i>′ ∈ <i>E</i> avec <i>f</i>(<i>x</i>) = <i>f</i>(<i>x</i>′). Quelle est la bonne suite&nbsp;?',
   opts:['On applique f⁻¹ des deux côtés','On applique g des deux côtés : g(f(x)) = g(f(x′)), c’est-à-dire x = x′','Comme g est injective, x = x′','On applique f des deux côtés : f(f(x)) = f(f(x′))'],ans:1,
   why:'g ∘ f = id<sub>E</sub> transforme g(f(x)) en x. On ne peut pas utiliser f⁻¹, dont on ignore l’existence, ni supposer g injective. De la même façon, f ∘ g = id<sub>F</sub> rend f surjective : y = f(g(y)).'},
  {h:'Le miroir y = x',p:`Le graphe de <i>f</i>⁻¹ est le <b>symétrique</b> de celui de <i>f</i> par rapport à la droite <i>y</i> = <i>x</i> : (<i>a</i> ; <i>b</i>) ∈ Γ<sub><i>f</i></sub> ⇔ <i>b</i> = <i>f</i>(<i>a</i>) ⇔ <i>a</i> = <i>f</i>⁻¹(<i>b</i>) ⇔ (<i>b</i> ; <i>a</i>) ∈ Γ<sub><i>f</i>⁻¹</sub>. Choisis une bijection et déplace le point <i>M</i>.`,
   params:[{id:'k',l:'Fonction',min:0,max:2,v:0},{id:'t',l:'t',min:-2,max:2,step:0.25,v:1.5}],
   draw:v=>{ const fs=[x=>2*x-1,x=>x*x*x/4,x=>Math.exp(x)], gs=[y=>(y+1)/2,y=>Math.cbrt(4*y),y=>Math.log(y)], f=fs[v.k], g=gs[v.k], P=plane({x:[-4,4],y:[-4,4],lab:1}), a=v.t, b=f(a);
     P.fn(x=>x,{c:'var(--muted)',w:1.5,dash:1}).fn(f,{c:'var(--accent)'});
     if(v.k===2) P.fn(g,{from:0.02,c:'var(--spark)'}); else P.fn(g,{c:'var(--spark)'});
     if(Math.abs(b)<=4){ P.seg(a,b,b,a,{c:'var(--muted)',w:1.5,dash:1}).dot(a,b,{l:'M'}).dot(b,a,{l:'M′',c:'var(--math)'}); }
     return P.svg(); },
   info:v=>{ const f=[x=>2*x-1,x=>x*x*x/4,x=>Math.exp(x)][v.k], b=f(v.t); return ['f(x) = 2x − 1, f⁻¹(y) = (y + 1)/2','f(x) = x³/4, f⁻¹(y) = ∛(4y)','f(x) = eˣ de ℝ vers ]0 ; +∞[, f⁻¹(y) = ln y'][v.k]+`<br>M(${fmt(v.t)} ; ${fmt(b)}) sur la courbe de f, M′(${fmt(b)} ; ${fmt(v.t)}) sur celle de f⁻¹${Math.abs(b)>4?' (hors cadre)':''}`; },
   note:'Le segment MM′ coupe la droite y = x à angle droit, en son milieu : M′ est bien le reflet de M.'},
  {kind:'Méthode',h:'Calculer une réciproque sur un intervalle bien choisi',
   p:'<b>Quand :</b> <i>f</i> n’est pas bijective sur ℝ, mais le devient si on restreint le départ et l’arrivée. <b>Comment :</b> 1) on met <i>f</i> sous une forme qui montre ses variations (forme canonique, factorisation) ; 2) on choisit un départ où <i>f</i> est injective, et l’arrivée égale à l’ensemble des valeurs prises ; 3) on résout <i>f</i>(<i>x</i>) = <i>y</i> en gardant la solution qui est dans le départ.',
   demo:{enonce:'<i>f</i>(<i>x</i>) = <i>x</i>² − 2<i>x</i> − 1. Montre que <i>f</i> : [1 ; +∞[ → [−2 ; +∞[ est bijective et calcule <i>f</i>⁻¹.',
    etapes:[{f:'<i>f</i>(<i>x</i>) = (<i>x</i> − 1)² − 2.',w:'Forme canonique : le sommet est (1 ; −2).'},
     {f:'Pour <i>y</i> ≥ −2 : (<i>x</i> − 1)² = <i>y</i> + 2 ⇔ <i>x</i> − 1 = ±√(<i>y</i> + 2).',w:'On résout f(x) = y ; y + 2 ≥ 0 garantit l’existence de la racine.'},
     {f:'Avec <i>x</i> ≥ 1, on garde <i>x</i> = 1 + √(<i>y</i> + 2).',w:'L’autre solution, 1 − √(y + 2), est ≤ 1 : elle n’est dans le départ que si y = −2, et alors c’est la même.'},
     {f:'Contrôle : <i>f</i>⁻¹(−1) = 1 + 1 = 2 et <i>f</i>(2) = 4 − 4 − 1 = −1.',w:'On vérifie sur une valeur.'}],
    conclusion:'Chaque <i>y</i> ≥ −2 a exactement un antécédent dans [1 ; +∞[ : <b>f est bijective</b> et <b>f⁻¹(y) = 1 + √(y + 2)</b>.'}},
  {h:'Une réciproque',p:'<i>f</i> : ℝ → ℝ, <i>f</i>(<i>x</i>) = (<i>x</i> − 3)³ + 1 est bijective. Calcule <i>f</i>⁻¹(9).',lab:'f⁻¹(9) =',ans:5,
   why:'(x − 3)³ + 1 = 9 ⇔ (x − 3)³ = 8 ⇔ x − 3 = 2 ⇔ x = 5. En général, f⁻¹(y) = 3 + ∛(y − 1).'},
  {h:'Défaire dans l’ordre inverse',p:`Si <i>f</i> : <i>E</i> → <i>F</i> et <i>g</i> : <i>F</i> → <i>G</i> sont bijectives, alors <i>g</i> ∘ <i>f</i> l’est aussi et<br><b>(<i>g</i> ∘ <i>f</i>)⁻¹ = <i>f</i>⁻¹ ∘ <i>g</i>⁻¹</b>.<br>Preuve : (<i>f</i>⁻¹ ∘ <i>g</i>⁻¹) ∘ (<i>g</i> ∘ <i>f</i>) = <i>f</i>⁻¹ ∘ (<i>g</i>⁻¹ ∘ <i>g</i>) ∘ <i>f</i> = <i>f</i>⁻¹ ∘ <i>f</i> = id<sub><i>E</i></sub>, et de même dans l’autre sens ; on conclut avec le théorème de la réciproque.`,
   note:'On enfile les chaussettes (f) puis les chaussures (g) ; pour se déchausser, on retire d’abord les chaussures (g⁻¹), puis les chaussettes (f⁻¹).'},
  {h:'Réciproque d’une composée',p:'Avec <i>f</i>(<i>x</i>) = 2<i>x</i> + 1 et <i>g</i>(<i>x</i>) = <i>x</i>³ sur ℝ, calcule (<i>g</i> ∘ <i>f</i>)⁻¹(27).',lab:'valeur :',ans:1,
   why:'(g ∘ f)⁻¹(27) = f⁻¹(g⁻¹(27)) = f⁻¹(3) = (3 − 1)/2 = 1. Contrôle : (g ∘ f)(1) = 3³ = 27.'},
  {kind:'Méthode',h:'Transmettre injectivité et surjectivité',
   p:'Quatre résultats à connaître, pour <i>f</i> : <i>E</i> → <i>F</i> et <i>g</i> : <i>F</i> → <i>G</i> :<br>• <i>f</i>, <i>g</i> injectives ⇒ <i>g</i> ∘ <i>f</i> injective ; <i>f</i>, <i>g</i> surjectives ⇒ <i>g</i> ∘ <i>f</i> surjective ;<br>• <b><i>g</i> ∘ <i>f</i> injective ⇒ <i>f</i> injective</b> ; <b><i>g</i> ∘ <i>f</i> surjective ⇒ <i>g</i> surjective</b>.<br><b>Comment les prouver :</b> on écrit la définition de la propriété à <b>obtenir</b>, puis on utilise l’hypothèse au bon endroit. Pour une injectivité, on part d’une égalité d’images ; pour une surjectivité, d’un élément quelconque de l’arrivée.',
   demo:{enonce:'Montre que si <i>g</i> ∘ <i>f</i> est surjective, alors <i>g</i> est surjective. Est-ce que <i>f</i> l’est forcément&nbsp;?',
    etapes:[{f:'Soit <i>z</i> ∈ <i>G</i>.',w:'But : trouver un antécédent de z par g, dans F.'},
     {f:'<i>g</i> ∘ <i>f</i> est surjective : il existe <i>x</i> ∈ <i>E</i> avec <i>g</i>(<i>f</i>(<i>x</i>)) = <i>z</i>.',w:'On utilise l’hypothèse sur z.'},
     {f:'Posons <i>y</i> = <i>f</i>(<i>x</i>) ∈ <i>F</i>. Alors <i>g</i>(<i>y</i>) = <i>z</i>.',w:'L’antécédent cherché est f(x).'},
     {f:'Contre-exemple pour <i>f</i> : <i>f</i> : {1} → {<i>a</i> ; <i>b</i>}, <i>f</i>(1) = <i>a</i> ; <i>g</i> : {<i>a</i> ; <i>b</i>} → {α}. Alors <i>g</i> ∘ <i>f</i> est surjective, mais <i>b</i> n’a pas d’antécédent par <i>f</i>.',w:'Pour réfuter une implication générale, un petit exemple fini suffit.'}],
    conclusion:'<b>g ∘ f surjective ⇒ g surjective</b>, mais f peut ne pas l’être. Retiens : la propriété « de sortie » (surjectivité) remonte vers g, la dernière appliquée ; la propriété « d’entrée » (injectivité) remonte vers f, la première appliquée.'}},
  {h:'Le premier pas',p:'On veut montrer : si <i>g</i> ∘ <i>f</i> est injective, alors <i>f</i> est injective. Comment commence la preuve&nbsp;?',
   opts:['Soit z ∈ G ; il existe x avec g(f(x)) = z','Soit x, x′ ∈ E avec f(x) = f(x′). Alors g(f(x)) = g(f(x′))','Soit y, y′ ∈ F avec g(y) = g(y′)','Comme g est injective, f l’est'],ans:1,
   why:'On veut l’injectivité de f : on part de f(x) = f(x′). On applique g, puis l’injectivité de g ∘ f donne x = x′. La troisième option chercherait l’injectivité de g, qui est fausse en général.'},
  {h:'g peut ne pas être injective',p:'Lequel de ces couples (<i>f</i>, <i>g</i>) d’applications de ℝ vers ℝ montre que « <i>g</i> ∘ <i>f</i> injective » n’entraîne <b>pas</b> « <i>g</i> injective »&nbsp;?',
   opts:['f(x) = x², g(x) = eˣ','f(x) = x + 1, g(x) = 2x','f(x) = eˣ, g(x) = x²','f(x) = x², g(x) = x²'],ans:2,
   why:'g ∘ f(x) = (eˣ)² = e²ˣ est injective, alors que g(x) = x² ne l’est pas (g(−1) = g(1)). Ça marche car f n’atteint que des réels &gt; 0, là où g est injective. Dans le premier et le dernier couple, g ∘ f n’est pas injective ; dans le deuxième, g est injective.'},
  {h:'Image directe, image réciproque',p:`Une application transporte aussi des <b>parties</b>. Pour <i>A</i> ⊂ <i>E</i> et <i>B</i> ⊂ <i>F</i> :<br><b><i>f</i>(<i>A</i>) = {<i>f</i>(<i>x</i>) : <i>x</i> ∈ <i>A</i>}</b> (image directe) ;<br><b><i>f</i>⁻¹(<i>B</i>) = {<i>x</i> ∈ <i>E</i> : <i>f</i>(<i>x</i>) ∈ <i>B</i>}</b> (image réciproque).<br>Ici <i>f</i>(<i>x</i>) = <i>x</i>². Choisis le mode, puis les bornes de l’intervalle.`,
   params:[{id:'m',l:'Mode (0 : f(A), 1 : f⁻¹(B))',min:0,max:1,v:0},{id:'a',l:'borne 1',min:-3,max:3,step:0.5,v:-1},{id:'b',l:'borne 2',min:-3,max:3,step:0.5,v:2}],
   draw:v=>{ const lo=Math.min(v.a,v.b), hi=Math.max(v.a,v.b), P=plane({x:[-3.4,3.4],y:[-3.4,9.6],w:320,h:300,lx:1,ly:2}); P.fn(x=>x*x,{c:'var(--math)'});
     if(v.m===0){ const ymin=lo<=0&&hi>=0?0:Math.min(lo*lo,hi*hi), ymax=Math.max(lo*lo,hi*hi); P.seg(lo,0,hi,0,{c:'var(--accent)',w:7}).seg(0,ymin,0,ymax,{c:'var(--spark)',w:7}).fn(x=>x*x,{from:lo,to:hi,c:'var(--accent)',w:6,op:.5}); }
     else { P.seg(0,lo,0,hi,{c:'var(--spark)',w:7}); if(hi>=0){ const l=Math.sqrt(Math.max(lo,0)), h=Math.sqrt(hi); P.seg(-h,0,-l,0,{c:'var(--accent)',w:7}).seg(l,0,h,0,{c:'var(--accent)',w:7}); } }
     return P.svg(); },
   info:v=>{ const lo=Math.min(v.a,v.b), hi=Math.max(v.a,v.b), I=(p,q)=>p===q?`{${fmt(p)}}`:`[${fmt(p)} ; ${fmt(q)}]`;
     if(v.m===0){ const ymin=lo<=0&&hi>=0?0:Math.min(lo*lo,hi*hi), ymax=Math.max(lo*lo,hi*hi); return `A = ${I(lo,hi)} (en vert) · f(A) = <b>${I(ymin,ymax)}</b> (en orange)`; }
     if(hi<0) return `B = ${I(lo,hi)} · f⁻¹(B) = <b>∅</b> : un carré n’est jamais négatif`;
     const l=Math.sqrt(Math.max(lo,0)), h=Math.sqrt(hi); return `B = ${I(lo,hi)} (en orange) · f⁻¹(B) = <b>${l===0?I(-h,h):I(-h,-l)+' ∪ '+I(l,h)}</b> (en vert)`; },
   note:'f⁻¹(B) existe pour toute application, même non bijective : c’est un ensemble, pas l’image par une réciproque. Quand f est bijective, les deux sens de la notation coïncident.'},
  {kind:'Méthode',h:'Images de réunions et d’intersections',
   p:'<b>Règles :</b> l’image réciproque respecte tout : <b><i>f</i>⁻¹(<i>B</i> ∪ <i>B</i>′) = <i>f</i>⁻¹(<i>B</i>) ∪ <i>f</i>⁻¹(<i>B</i>′)</b> et <b><i>f</i>⁻¹(<i>B</i> ∩ <i>B</i>′) = <i>f</i>⁻¹(<i>B</i>) ∩ <i>f</i>⁻¹(<i>B</i>′)</b>. L’image directe respecte la réunion, <b><i>f</i>(<i>A</i> ∪ <i>A</i>′) = <i>f</i>(<i>A</i>) ∪ <i>f</i>(<i>A</i>′)</b>, mais pour l’intersection on a seulement <b><i>f</i>(<i>A</i> ∩ <i>A</i>′) ⊂ <i>f</i>(<i>A</i>) ∩ <i>f</i>(<i>A</i>′)</b>. <b>Comment prouver :</b> par double inclusion, en traduisant « <i>y</i> ∈ <i>f</i>(<i>A</i>) » par « il existe <i>x</i> ∈ <i>A</i> avec <i>y</i> = <i>f</i>(<i>x</i>) ».',
   demo:{enonce:'Prouve <i>f</i>(<i>A</i> ∩ <i>A</i>′) ⊂ <i>f</i>(<i>A</i>) ∩ <i>f</i>(<i>A</i>′), puis montre que l’inclusion peut être stricte.',
    etapes:[{f:'Soit <i>y</i> ∈ <i>f</i>(<i>A</i> ∩ <i>A</i>′) : <i>y</i> = <i>f</i>(<i>x</i>) avec <i>x</i> ∈ <i>A</i> et <i>x</i> ∈ <i>A</i>′.',w:'On traduit l’appartenance à une image directe.'},
     {f:'Donc <i>y</i> ∈ <i>f</i>(<i>A</i>) et <i>y</i> ∈ <i>f</i>(<i>A</i>′).',w:'Le même x sert de témoin pour les deux.'},
     {f:'Pour <i>f</i>(<i>x</i>) = <i>x</i>², <i>A</i> = [−2 ; −1], <i>A</i>′ = [1 ; 2] : <i>A</i> ∩ <i>A</i>′ = ∅, donc <i>f</i>(<i>A</i> ∩ <i>A</i>′) = ∅.',w:'On cherche deux parties disjointes ayant des images communes.'},
     {f:'Mais <i>f</i>(<i>A</i>) = <i>f</i>(<i>A</i>′) = [1 ; 4], donc <i>f</i>(<i>A</i>) ∩ <i>f</i>(<i>A</i>′) = [1 ; 4] ≠ ∅.',w:'Pour l’autre inclusion, y ∈ f(A) ∩ f(A′) donne deux témoins x ∈ A, x′ ∈ A′, qui peuvent être différents.'}],
    conclusion:'<b>f(A ∩ A′) ⊂ f(A) ∩ f(A′)</b>, avec égalité dès que f est injective (alors x = x′). Le contre-exemple x ↦ x² montre que l’égalité peut échouer.'}},
  {h:'Un exemple fini',p:'Sur <i>E</i> = {1 ; 2 ; … ; 6}, <i>f</i>(<i>n</i>) est le reste de <i>n</i> dans la division par 3. Avec <i>A</i> = {1 ; 2 ; 3} et <i>A</i>′ = {4 ; 5 ; 6}, combien d’éléments a <i>f</i>(<i>A</i>) ∩ <i>f</i>(<i>A</i>′)&nbsp;?',lab:'card =',ans:3,
   why:'f(A) = {1 ; 2 ; 0} et f(A′) = {1 ; 2 ; 0} : l’intersection a 3 éléments, alors que A ∩ A′ = ∅ donne f(A ∩ A′) = ∅.'},
  {h:'Aller et retour',p:'Avec <i>f</i>(<i>x</i>) = <i>x</i>² sur ℝ et <i>A</i> = [0 ; 1], que vaut <i>f</i>⁻¹(<i>f</i>(<i>A</i>))&nbsp;?',
   opts:['[0 ; 1]','[−1 ; 1]','[0 ; 1] ∪ [1 ; 2]','∅'],ans:1,
   why:'f(A) = [0 ; 1], puis f⁻¹([0 ; 1]) = {x : x² ≤ 1} = [−1 ; 1]. En général A ⊂ f⁻¹(f(A)), avec égalité si f est injective : en revenant, on récupère aussi les « jumeaux » des éléments de A.'},
  {kind:'Problème',h:'Une parabole en morceaux',
   p:'Soit <i>f</i> : ℝ → ℝ, <i>f</i>(<i>x</i>) = <i>x</i>² − 4<i>x</i> + 3 = (<i>x</i> − 2)² − 1. On calcule des images directes et réciproques, on rend <i>f</i> bijective par restriction, puis on teste la règle sur les intersections.',
   fig:(()=>{ const P=plane({x:[-1,5],y:[-1.5,4.5],lab:1}); P.fn(x=>x*x-4*x+3).seg(-1,3,5,3,{c:'var(--muted)',w:1.2,dash:1}); P.dot(2,-1,{r:5,l:'S(2 ; −1)'}); return P.svg(); })(),
   parts:[
    {q:'a) <i>f</i>([0 ; 3]) est un intervalle [<i>m</i> ; <i>M</i>]. Que vaut <i>M</i>&nbsp;?',lab:'M =',ans:3,hint:'f n’est pas monotone sur [0 ; 3] : coupe en 2, le sommet.',why:'Sur [0 ; 2], f décroît de f(0) = 3 à −1 ; sur [2 ; 3], elle croît de −1 à f(3) = 0. Donc f([0 ; 3]) = [−1 ; 3] et M = 3, pas f(3) = 0.'},
    {q:'b) Que vaut <i>f</i>⁻¹([0 ; 3])&nbsp;?',opts:['[0 ; 4]','[1 ; 3]','[0 ; 1] ∪ [3 ; 4]','[3 ; 4]'],ans:2,hint:'0 ≤ (x − 2)² − 1 ≤ 3 ⇔ 1 ≤ (x − 2)² ≤ 4.',why:'1 ≤ |x − 2| ≤ 2 ⇔ x ∈ [0 ; 1] ∪ [3 ; 4].'},
    {q:'c) La restriction <i>g</i> : [2 ; +∞[ → [−1 ; +∞[ de <i>f</i> est bijective. Calcule <i>g</i>⁻¹(8).',lab:'g⁻¹(8) =',ans:5,hint:'(x − 2)² = 9 avec x ≥ 2.',why:'x − 2 = 3, donc x = 5. Contrôle : 25 − 20 + 3 = 8. En général g⁻¹(y) = 2 + √(y + 1).'},
    {q:'d) Avec <i>A</i> = [0 ; 1] et <i>A</i>′ = [3 ; 4], que peut-on dire&nbsp;?',opts:['f(A ∩ A′) = f(A) ∩ f(A′) = ∅','f(A ∩ A′) = ∅, alors que f(A) ∩ f(A′) = [0 ; 3]','f(A) ∩ f(A′) = ∅','f(A ∩ A′) = [0 ; 3]'],ans:1,hint:'Calcule f(A) et f(A′) : elles sont symétriques par rapport à x = 2.',why:'f(A) = [0 ; 3] (f décroît sur [0 ; 1]) et f(A′) = [0 ; 3]. Mais A ∩ A′ = ∅. Ce sont exactement les deux morceaux de f⁻¹([0 ; 3]).'},
   ],
   sol:'f(x) = (x − 2)² − 1 décroît sur ]−∞ ; 2] et croît sur [2 ; +∞[, avec un minimum −1 en 2.<br>a) f([0 ; 3]) = [−1 ; 3], car on passe par le sommet : <b>M = 3</b>.<br>b) f⁻¹([0 ; 3]) = {x : 1 ≤ |x − 2| ≤ 2} = <b>[0 ; 1] ∪ [3 ; 4]</b>.<br>c) Sur [2 ; +∞[, f est injective et prend toutes les valeurs ≥ −1 : g⁻¹(y) = 2 + √(y + 1), et g⁻¹(8) = <b>5</b>.<br>d) A = [0 ; 1] et A′ = [3 ; 4] sont disjointes, mais f(A) = f(A′) = [0 ; 3] : f(A ∩ A′) = ∅ ≠ f(A) ∩ f(A′). C’est possible car f n’est pas injective (f(x) = f(4 − x)).'},
  {kind:'Problème',h:'Trois tours pour revenir',
   p:'Sur <i>E</i> = ℝ \\ {0 ; 1}, on pose <i>f</i>(<i>x</i>) = 1/(1 − <i>x</i>). On admet que <i>f</i>(<i>x</i>) ∈ <i>E</i> pour tout <i>x</i> ∈ <i>E</i> (elle ne vaut jamais 0, et vaut 1 seulement en 0). On calcule les itérées de <i>f</i> pour découvrir que <i>f</i> ∘ <i>f</i> ∘ <i>f</i> = id<sub><i>E</i></sub>, et on en déduit sa réciproque sans résoudre d’équation.',
   parts:[
    {q:'a) Calcule <i>f</i>(2).',lab:'f(2) =',ans:-1,hint:'1/(1 − 2).',why:'f(2) = 1/(−1) = −1.'},
    {q:'b) Calcule <i>f</i>(<i>f</i>(2)).',lab:'f(f(2)) =',ans:0.5,tol:.001,hint:'Calcule f(−1).',why:'f(−1) = 1/2. Puis f(1/2) = 1/(1/2) = 2 : trois tours ramènent à 2.'},
    {q:'c) On vérifie que <i>f</i>(<i>f</i>(<i>x</i>)) = (<i>x</i> − 1)/<i>x</i> et <i>f</i>(<i>f</i>(<i>f</i>(<i>x</i>))) = <i>x</i>. Pourquoi <i>f</i> est-elle alors bijective, de réciproque <i>f</i> ∘ <i>f</i>&nbsp;?',opts:['Car f est injective sur ℝ','Car (f ∘ f) ∘ f = id<sub>E</sub> et f ∘ (f ∘ f) = id<sub>E</sub>, par associativité ; le théorème de la réciproque s’applique avec g = f ∘ f','Car f ∘ f = id<sub>E</sub>','Car f est sa propre réciproque'],ans:1,hint:'Le théorème : s’il existe g avec g ∘ f = id et f ∘ g = id, alors f est bijective et g = f⁻¹.',why:'f ∘ f ∘ f = id se lit des deux façons grâce à l’associativité. f ∘ f n’est pas l’identité : f(f(2)) = 1/2 ≠ 2.'},
    {q:'d) Calcule <i>f</i>⁻¹(3).',lab:'f⁻¹(3) =',ans:2/3,tol:.001,hint:'f⁻¹(3) = f(f(3)).',why:'f(3) = −1/2, puis f(−1/2) = 1/(3/2) = 2/3. Contrôle : f(2/3) = 1/(1/3) = 3.'},
   ],
   sol:'f(f(x)) = 1/(1 − 1/(1 − x)) = (1 − x)/(−x) = (x − 1)/x, puis f(f(f(x))) = 1/(1 − (x − 1)/x) = 1/(1/x) = x.<br>Donc f ∘ f ∘ f = id<sub>E</sub>. Par associativité, (f ∘ f) ∘ f = id<sub>E</sub> et f ∘ (f ∘ f) = id<sub>E</sub> : f est <b>bijective</b> et <b>f⁻¹ = f ∘ f</b>, soit f⁻¹(y) = (y − 1)/y.<br>Exemples : la suite 2 → −1 → 1/2 → 2 tourne en trois pas, et f⁻¹(3) = f(f(3)) = f(−1/2) = <b>2/3</b>.'},
]},

/* ===================== 6. LOIS DE COMPOSITION ET PUISSANCE D’UN ENSEMBLE ===================== */
{subj:'gred',sem:'ens',id:'gred-lois-cardinal',h:'Lois de composition et puissance d’un ensemble',p:'Les opérations vues comme des applications, les parties stables, puis la comparaison des ensembles infinis : dénombrables, et au-delà.',steps:[
  {h:'Une opération est une application',p:`Une <b>loi de composition interne</b> sur <i>E</i> est une application <b><i>E</i> × <i>E</i> → <i>E</i></b>, (<i>x</i> ; <i>y</i>) ↦ <i>x</i> ∗ <i>y</i>. Deux exigences : le résultat existe pour <b>tout</b> couple, et il reste <b>dans <i>E</i></b>. Exemples : + et × sur ℕ ; − sur ℤ ; ∪, ∩ et Δ sur 𝒫(<i>E</i>) ; la composition ∘ sur l’ensemble des applications de <i>E</i> dans <i>E</i>.`,
   note:'Contre-exemples : la soustraction sur ℕ (3 − 5 ∉ ℕ), la division sur ℝ (x/0 n’existe pas). Sur ℝ*, la division redevient une loi interne.'},
  {h:'Loi interne ou pas&nbsp;?',p:'Laquelle de ces formules définit une loi de composition interne sur ℕ&nbsp;?',
   opts:['<i>a</i> ∗ <i>b</i> = <i>a</i> − <i>b</i>','<i>a</i> ∗ <i>b</i> = <i>a</i>/<i>b</i>','<i>a</i> ∗ <i>b</i> = |<i>a</i> − <i>b</i>|','<i>a</i> ∗ <i>b</i> = √(<i>ab</i>)'],ans:2,
   why:'|a − b| est toujours un entier naturel. a − b peut être négatif, a/b n’est pas toujours entier (et 1/0 n’existe pas), √(1 · 2) = √2 ∉ ℕ.'},
  {h:'La table d’une loi',p:`Sur un ensemble fini, on présente une loi par sa <b>table</b> : à la ligne <i>x</i> et à la colonne <i>y</i>, on écrit <i>x</i> ∗ <i>y</i>. Voici l’addition et la multiplication de ℤ/<i>n</i>ℤ, calculées sur les représentants puis réduites modulo <i>n</i>. Les couleurs repèrent les résultats égaux.`,
   params:[{id:'n',l:'n',min:2,max:7,v:5},{id:'o',l:'Opération (0 : +, 1 : ×)',min:0,max:1,v:0}],
   draw:v=>tableL([...Array(v.n).keys()].map(String),(i,j)=>v.o?(i*j)%v.n:(i+j)%v.n,{op:v.o?'×':'+'}),
   info:v=>{ if(!v.o) return 'Pour +, chaque ligne contient chaque reste exactement une fois : on peut toujours « revenir en arrière ».';
     const z=[...Array(v.n).keys()].slice(1).filter(i=>[...Array(v.n).keys()].slice(1).some(j=>(i*j)%v.n===0));
     return z.length?`Pour ×, des produits de non-nuls valent 0 : ${z.map(i=>i).join(', ')} ${z.length>1?'sont des':'est un'} « diviseur${z.length>1?'s':''} de zéro ».`:`n = ${v.n} est premier : aucun produit de deux non-nuls ne vaut 0.`; },
   note:'Une table se lit comme une carte : ses symétries et ses répétitions révèlent les propriétés de la loi. Les chapitres sur les groupes en feront grand usage.'},
  {kind:'Méthode',h:'Dresser et lire une table',
   p:'<b>Comment :</b> 1) on fixe un ordre des éléments, le même en ligne et en colonne ; 2) on remplit ligne par ligne, en vérifiant que chaque résultat appartient bien à <i>E</i> (sinon ce n’est pas une loi interne) ; 3) on lit : une table <b>symétrique</b> par rapport à la diagonale signale une loi commutative ; une ligne et une colonne qui recopient l’en-tête signalent un élément <b>neutre</b>.',
   demo:{enonce:'Dresse la table de la différence symétrique Δ sur 𝒫({1 ; 2}) = {∅, {1}, {2}, {1 ; 2}}.',
    etapes:[{f:'Ligne ∅ : ∅ Δ <i>Y</i> = <i>Y</i>. On recopie l’en-tête.',w:'Rien à retirer ni à ajouter.'},
     {f:'Ligne {1} : {1} Δ {1} = ∅, {1} Δ {2} = {1 ; 2}, {1} Δ {1 ; 2} = {2}.',w:'X Δ Y garde les éléments qui sont dans exactement un des deux.'},
     {f:'Lignes {2} et {1 ; 2}, de la même façon.',w:'On complète, puis on contrôle que chaque case est bien une partie de {1 ; 2}.'},
     {f:tableL(['∅','{1}','{2}','{1;2}'],(i,j)=>i^j,{op:'Δ'}),w:'En codant ∅, {1}, {2}, {1 ; 2} par 0, 1, 2, 3, la table est celle du « ou exclusif » des bits.'}],
    conclusion:'La table est <b>symétrique</b> (Δ est commutative), ∅ est <b>neutre</b> (sa ligne recopie l’en-tête), et la diagonale ne contient que ∅ : <b>X Δ X = ∅</b> pour toute partie X.'}},
  {h:'Compter les zéros',p:'Dans la table de la multiplication de ℤ/6ℤ (36 cases), combien de cases contiennent 0&nbsp;?',lab:'cases :',ans:15,
   why:'Ligne 0 : 6 cases. Ligne 1 : 1 (colonne 0). Ligne 2 : colonnes 0 et 3. Ligne 3 : colonnes 0, 2, 4. Ligne 4 : colonnes 0, 3. Ligne 5 : colonne 0. Total 6 + 1 + 2 + 3 + 2 + 1 = 15.'},
  {h:'Parties stables',p:`Une partie <i>A</i> ⊂ <i>E</i> est <b>stable</b> pour ∗ si <b><i>x</i>, <i>y</i> ∈ <i>A</i> ⇒ <i>x</i> ∗ <i>y</i> ∈ <i>A</i></b>. La loi se restreint alors à <i>A</i> × <i>A</i> → <i>A</i> : c’est la <b>loi induite</b>. Les nombres pairs sont stables pour + et pour × ; les nombres impairs sont stables pour × (impair × impair = impair) mais pas pour + (1 + 1 = 2).`,
   note:'Pour prouver la stabilité, on prend x, y quelconques dans A et on montre que x ∗ y ∈ A. Pour la réfuter, un seul couple suffit.'},
  {h:'Laquelle est stable&nbsp;?',p:'Laquelle de ces parties de ℤ est stable pour l’addition&nbsp;?',
   opts:['Les nombres impairs','{−1 ; 0 ; 1}','{1 ; 2 ; 3}','Les multiples de 3'],ans:3,
   why:'3a + 3b = 3(a + b) : stable. 1 + 1 = 2 sort des impairs, de {−1 ; 0 ; 1}, et 3 + 3 = 6 sort de {1 ; 2 ; 3}.'},
  {kind:'Pratique',h:'Une partie stable sur l’horloge',p:'Dans ℤ/6ℤ muni de +, choisis une partie qui <b>contient 2</b>, qui est <b>stable</b>, et qui n’est pas ℤ/6ℤ tout entier.',
   params:[0,1,2,3,4,5].map(k=>({id:'e'+k,l:`${k} dans la partie`,min:0,max:1,v:k===2?1:0})),
   draw:v=>horloge(6,{hl:k=>v['e'+k]===1,c:'var(--accent)'}),
   info:v=>{ const S=[0,1,2,3,4,5].filter(k=>v['e'+k]); if(!S.length) return 'Partie vide.'; for(const a of S) for(const b of S) if(!S.includes((a+b)%6)) return `${a} + ${b} = ${(a+b)%6} sort de la partie : <b>pas stable</b>.`; return `{${S.join(' ; ')}} est <b>stable</b>.`; },
   ok:v=>{ const S=[0,1,2,3,4,5].filter(k=>v['e'+k]); return S.includes(2)&&S.length<6&&S.every(a=>S.every(b=>S.includes((a+b)%6))); },
   why:'2 + 2 = 4 doit être dedans, puis 4 + 2 = 0. {0 ; 2 ; 4} est stable : la somme de deux pairs reste paire modulo 6. Ajouter un impair forcerait à tout prendre.'},
  {h:'Les lois externes',p:`Une <b>loi externe</b> fait agir des éléments d’un autre ensemble <i>K</i> sur <i>E</i> : c’est une application <b><i>K</i> × <i>E</i> → <i>E</i></b>. L’exemple type est la multiplication d’un vecteur par un réel : ℝ × ℝ² → ℝ², (λ ; <i>u</i>) ↦ λ<i>u</i>. Déplace λ.`,
   params:[{id:'l',l:'λ',min:-2,max:2,step:0.25,v:1.5}],
   draw:v=>{ const P=plane({x:[-4.5,4.5],y:[-2.6,2.6],lab:1}); P.fn(x=>x/2,{c:'var(--line)',w:1.5,dash:1}).arrow(0,0,2*v.l,v.l,{c:'var(--spark)',w:4}).arrow(0,0,2,1,{c:'var(--math)',w:2.5}); P.text(2,1,'u',{dx:6,dy:-6,c:'var(--math)'}).text(2*v.l,v.l,'λu',{dx:6,dy:14,c:'var(--spark)'}); return P.svg(); },
   info:v=>`u = (2 ; 1), λ = ${fmt(v.l)} : λu = (${fmt(2*v.l)} ; ${fmt(v.l)}). Le réel λ n’est pas un élément de ℝ², il agit sur lui.`,
   note:'Autres exemples : n · x = x + x + ⋯ + x (n fois) fait agir ℕ sur tout ensemble muni d’une addition ; xⁿ fait agir ℕ par puissances. Ces lois externes reviendront dans les espaces vectoriels.'},
  {h:'Interne, externe, ou ni l’un ni l’autre',p:'Le produit scalaire associe à deux vecteurs <i>u</i>, <i>v</i> de ℝ² le réel <i>u</i> · <i>v</i>. Est-ce une loi de composition&nbsp;?',
   opts:['Une loi interne sur ℝ²','Une loi externe de ℝ sur ℝ²','Ni l’un ni l’autre : c’est une application ℝ² × ℝ² → ℝ, le résultat sort de ℝ²','Une loi interne sur ℝ'],ans:2,
   why:'Une loi interne sur ℝ² devrait arriver dans ℝ², une loi externe devrait partir de K × ℝ². Le produit scalaire part de ℝ² × ℝ² et arrive dans ℝ : c’est une application, pas une loi de composition.'},
  {h:'Même puissance',p:`Deux ensembles sont <b>équipotents</b> s’il existe une bijection de l’un sur l’autre : ils ont alors la même <b>puissance</b>, ou le même <b>cardinal</b>. Pour des ensembles finis, c’est avoir le même nombre d’éléments. Pour des ensembles infinis, des surprises arrivent : <i>n</i> ↦ 2<i>n</i> est une bijection de ℕ sur les nombres pairs, une partie « deux fois plus petite ».`,
   fig:(()=>{ const P=plane({x:[-0.6,8.2],y:[0,2.6],grid:false,axes:false}); for(let n=0;n<=7;n++){ const t=2*n; if(t<=7) P.arrow(n,1.9,t,0.75,{c:'var(--math)',w:1.8,hs:8}); P.text(n,2.1,String(n),{a:'middle',dy:-2,s:12}); }
     [0,2,4,6].forEach(t=>P.text(t,0.6,String(t),{a:'middle',dy:12,s:12,c:'var(--spark)'})); P.text(8.1,2.1,'ℕ',{a:'end',dy:-2,c:'var(--muted)'}).text(8.1,0.6,'2ℕ',{a:'end',dy:12,c:'var(--muted)'}); P.text(7.6,1.35,'…',{a:'middle'}); return P.svg(); })(),
   note:'L’équipotence se comporte comme une équivalence : id<sub>E</sub> donne E ≈ E, la réciproque d’une bijection donne la symétrie, la composée de deux bijections la transitivité. Un ensemble infini peut être équipotent à une partie stricte de lui-même ; un ensemble fini, jamais.'},
  {kind:'Méthode',h:'Prouver une équipotence en exhibant une bijection',
   p:'<b>Quand :</b> on veut montrer que deux ensembles ont la même puissance. <b>Comment :</b> 1) on imagine une façon de « ranger » l’un dans l’autre sans trou ni doublon ; 2) on l’écrit comme une formule, souvent par cas ; 3) on prouve qu’elle est bijective, idéalement en écrivant la réciproque. <b>Dénombrable :</b> un ensemble équipotent à ℕ s’appelle <b>dénombrable</b> : on peut numéroter ses éléments 0, 1, 2, … sans en oublier.',
   demo:{enonce:'Montre que ℤ est dénombrable.',
    etapes:[{f:'On range ℤ en zigzag : 0, −1, 1, −2, 2, −3, 3, …',w:'On alterne les signes pour ne jamais « partir à l’infini » d’un seul côté.'},
     {f:'φ(<i>n</i>) = <i>n</i>/2 si <i>n</i> est pair, φ(<i>n</i>) = −(<i>n</i> + 1)/2 si <i>n</i> est impair.',w:'Les rangs pairs donnent 0, 1, 2, … ; les rangs impairs donnent −1, −2, −3, …'},
     {f:'Réciproque : ψ(<i>k</i>) = 2<i>k</i> si <i>k</i> ≥ 0, ψ(<i>k</i>) = −2<i>k</i> − 1 si <i>k</i> &lt; 0.',w:'On résout φ(n) = k dans chaque cas.'},
     {f:'On vérifie φ ∘ ψ = id<sub>ℤ</sub> et ψ ∘ φ = id<sub>ℕ</sub>.',w:'Par exemple ψ(−3) = 5 et φ(5) = −3.'}],
    conclusion:'φ : ℕ → ℤ est bijective : <b>ℤ est dénombrable</b>, bien qu’il « contienne deux copies » de ℕ.'}},
  {h:'Le rang d’un négatif',p:'Avec la numérotation φ de la méthode (0, −1, 1, −2, 2, …), quel entier <i>n</i> vérifie φ(<i>n</i>) = −10&nbsp;?',lab:'n =',ans:19,
   why:'−10 &lt; 0, donc n est impair et −(n + 1)/2 = −10, soit n = 19. Avec la réciproque : ψ(−10) = 20 − 1 = 19.'},
  {h:'Un intervalle aussi grand qu’une demi-droite',p:'Laquelle de ces applications est une bijection de ]0 ; 1[ sur ]0 ; +∞[&nbsp;?',
   opts:['<i>x</i> ↦ 1/<i>x</i>','<i>x</i> ↦ <i>x</i>/(1 − <i>x</i>)','<i>x</i> ↦ <i>x</i>²','<i>x</i> ↦ 1 − <i>x</i>'],ans:1,
   why:'y = x/(1 − x) ⇔ x = y/(1 + y), qui est dans ]0 ; 1[ pour tout y &gt; 0 : bijection. 1/x arrive dans ]1 ; +∞[, x² et 1 − x restent dans ]0 ; 1[. Un intervalle borné a donc la même puissance qu’une demi-droite.'},
  {h:'ℕ × ℕ est dénombrable',p:`On parcourt ℕ × ℕ par <b>diagonales</b> : d’abord les couples de somme 0, puis de somme 1, puis 2… Dans chaque diagonale, on monte de (<i>s</i> ; 0) à (0 ; <i>s</i>). Chaque couple reçoit un numéro, aucun n’est oublié : c’est une bijection de ℕ × ℕ sur ℕ. Avance le compteur.`,
   params:[{id:'k',l:'numéro k',min:0,max:27,v:7}],
   draw:v=>diagNN(v.k),
   info:v=>{ const [a,b]=cantInv(v.k); return `Le numéro ${v.k} est le couple <b>(${a} ; ${b})</b>, sur la diagonale a + b = ${a+b}.`; },
   note:'Ligne par ligne, on n’arriverait jamais au bout de la première ligne : c’est le parcours en diagonale qui rend la numérotation possible. Conséquence : ℕ² a la même puissance que ℕ.'},
  {kind:'Méthode',h:'Numéroter ℕ × ℕ par les diagonales',
   p:'<b>Formule :</b> la diagonale <i>s</i> = <i>a</i> + <i>b</i> contient <i>s</i> + 1 couples. Avant elle, il y a 1 + 2 + ⋯ + <i>s</i> = <i>s</i>(<i>s</i> + 1)/2 couples. Dans la diagonale, (<i>a</i> ; <i>b</i>) est à la position <i>b</i>. D’où <b>c(<i>a</i> ; <i>b</i>) = (<i>a</i> + <i>b</i>)(<i>a</i> + <i>b</i> + 1)/2 + <i>b</i></b>. <b>Retrouver un couple :</b> on cherche la plus grande diagonale <i>s</i> avec <i>s</i>(<i>s</i> + 1)/2 ≤ <i>k</i>, puis <i>b</i> = <i>k</i> − <i>s</i>(<i>s</i> + 1)/2 et <i>a</i> = <i>s</i> − <i>b</i>.',
   demo:{enonce:'Quel est le numéro de (2 ; 3)&nbsp;? Quel couple porte le numéro 12&nbsp;?',
    etapes:[{f:'(2 ; 3) : <i>s</i> = 5. Avant : 5 · 6/2 = 15 couples. Position <i>b</i> = 3. Numéro 15 + 3 = 18.',w:'On compte les diagonales complètes, puis on avance dans la diagonale.'},
     {f:'Numéro 12 : 4 · 5/2 = 10 ≤ 12 &lt; 5 · 6/2 = 15, donc <i>s</i> = 4.',w:'Les nombres 0, 1, 3, 6, 10, 15, … marquent les débuts de diagonales.'},
     {f:'<i>b</i> = 12 − 10 = 2, <i>a</i> = 4 − 2 = 2. Couple (2 ; 2).',w:'Contrôle : c(2 ; 2) = 4 · 5/2 + 2 = 12.'}],
    conclusion:'c(2 ; 3) = <b>18</b> et le numéro 12 est <b>(2 ; 2)</b>. Les débuts de diagonales sont les nombres triangulaires 0, 1, 3, 6, 10, 15, 21, 28, …'}},
  {kind:'Pratique',h:'Trouve le couple numéro 23',p:'Place le point (<i>a</i> ; <i>b</i>) sur le couple qui porte le numéro 23 dans le parcours en diagonale.',
   params:[{id:'a',l:'a',min:0,max:6,v:0},{id:'b',l:'b',min:0,max:6,v:0}],
   draw:v=>diagNN(Math.min(cant(v.a,v.b),27),{q:[v.a,v.b]}),
   info:v=>`c(${v.a} ; ${v.b}) = ${cant(v.a,v.b)}`,
   ok:v=>cant(v.a,v.b)===23,
   why:'21 = 6 · 7/2 ≤ 23 &lt; 28, donc s = 6. Puis b = 23 − 21 = 2 et a = 6 − 2 = 4. Le couple est (4 ; 2).'},
  {h:'Un numéro',p:'Quel est le numéro du couple (3 ; 4) dans le parcours en diagonale (en partant de 0 pour (0 ; 0))&nbsp;?',lab:'numéro :',ans:32,
   why:'s = 7, avant la diagonale : 7 · 8/2 = 28 couples, position b = 4. Numéro 28 + 4 = 32.'},
  {h:'ℚ est dénombrable',p:`On range les rationnels positifs <i>p</i>/<i>q</i> dans un tableau, puis on les parcourt par diagonales <i>p</i> + <i>q</i> = 2, 3, 4, …, avec <i>p</i> croissant, en <b>sautant</b> les fractions non irréductibles (déjà rencontrées sous une autre écriture, comme 2/2 = 1/1). On obtient une liste sans doublon de tous les rationnels &gt; 0 : 1, 1/2, 2, 1/3, 3, 1/4, 2/3, … Pour avoir tout ℚ, on intercale 0 et les opposés : 0, 1, −1, 1/2, −1/2, 2, −2, …`,
   fig:(()=>{ const P=plane({x:[0.3,5.7],y:[0.3,5.7],grid:false,axes:false}), g=(a,b)=>b?g(b,a%b):a; let r=0; const seq=[];
     for(let s=2;s<=6;s++) for(let p=1;p<s;p++){ const q=s-p; if(g(p,q)===1){ r++; seq.push([p,6-q,r]); } }
     for(let j=1;j<seq.length;j++){ const [x0,y0]=seq[j-1],[x1,y1]=seq[j], same=x0-y0===x1-y1; P.seg(x0,y0,x1,y1,same?{c:'var(--accent)',w:2.5,op:.6}:{c:'var(--muted)',w:1,dash:1,op:.6}); }
     for(let p=1;p<=5;p++) for(let q=1;q<=5;q++) if(p+q<=6){ const ok=g(p,q)===1; P.text(p,6-q,`${p}/${q}`,{a:'middle',dy:5,s:13,c:ok?'var(--ink)':'var(--muted)'}); if(!ok) P.seg(p-0.3,6-q-0.25,p+0.3,6-q+0.25,{c:'var(--bad)',w:2}); }
     seq.forEach(([x,y,k])=>P.text(x,y,String(k),{dx:14,dy:-8,s:10,c:'var(--spark)'})); return P.svg(); })(),
   note:'Le nombre orange est le rang dans la liste. Les fractions barrées (2/2, 2/4, 3/3, 4/2) sont sautées. Il y a « autant » de rationnels que d’entiers, même si les rationnels sont partout denses sur la droite.'},
  {h:'Un rang plus loin',p:'Dans cette liste des rationnels positifs (1, 1/2, 2, 1/3, 3, …, en sautant les fractions non irréductibles), à quel rang apparaît 2/5&nbsp;? Le premier terme, 1, a le rang 1.',lab:'rang :',ans:13,
   why:'Diagonales p + q = 2 à 6 : 1 + 2 + 2 + 4 + 2 = 11 fractions irréductibles (rangs 1 à 11). Diagonale p + q = 7 : 1/6 (rang 12), puis 2/5 (rang 13).'},
  {h:'L’argument diagonal de Cantor',p:`<b>Théorème.</b> ]0 ; 1[, et donc ℝ, n’est <b>pas</b> dénombrable. Par l’absurde : on suppose une liste <i>x</i><sub>1</sub>, <i>x</i><sub>2</sub>, … de tous les réels de ]0 ; 1[, écrits en décimal. On fabrique un réel <i>y</i> chiffre par chiffre : son <i>n</i>-ième chiffre vaut 5 si le <i>n</i>-ième chiffre de <i>x</i><sub><i>n</i></sub> n’est pas 5, et 4 sinon. Avance <i>k</i> pour le construire.`,
   params:[{id:'k',l:'chiffres construits',min:0,max:6,v:2}],
   draw:v=>{ const D=['314159','500000','718281','141421','666666','250255'], W=320, cw=28, x0=92;
     let s=`<svg viewBox="0 0 ${W} 250" width="${W}" role="img">`;
     D.forEach((r,i)=>{ const y=28+i*30; s+=`<text x="${x0-10}" y="${y}" font-size="14" font-weight="700" text-anchor="end" fill="var(--muted)">x<tspan font-size="10" dy="3">${i+1}</tspan><tspan dy="-3"> = 0,</tspan></text>`;
       [...r].forEach((d,j)=>{ const on=i===j&&j<v.k; if(i===j) s+=`<rect x="${x0+j*cw-2}" y="${y-17}" width="${cw-4}" height="24" rx="5" fill="${on?'var(--spark)':'var(--line)'}" fill-opacity="${on?.45:.6}"/>`; s+=`<text x="${x0+j*cw+10}" y="${y}" font-size="15" font-weight="700" text-anchor="middle" fill="var(--ink)">${d}</text>`; });
       s+=`<text x="${x0+6*cw+8}" y="${y}" font-size="14" fill="var(--muted)">…</text>`; });
     const y=28+6*30+14; s+=`<line x1="10" x2="310" y1="${y-26}" y2="${y-26}" stroke="var(--line)" stroke-width="1.5"/><text x="${x0-10}" y="${y}" font-size="14" font-weight="700" text-anchor="end" fill="var(--math)">y = 0,</text>`;
     for(let j=0;j<v.k;j++){ const d=D[j][j]==='5'?'4':'5'; s+=`<text x="${x0+j*cw+10}" y="${y}" font-size="15" font-weight="700" text-anchor="middle" fill="var(--math)">${d}</text>`; }
     return s+'</svg>'; },
   info:v=>v.k===0?'Aucun chiffre de y n’est encore construit.':`y diffère de x<sub>${v.k}</sub> au ${v.k}<sup>e</sup> chiffre (${['314159','500000','718281','141421','666666','250255'][v.k-1][v.k-1]} remplacé par ${['314159','500000','718281','141421','666666','250255'][v.k-1][v.k-1]==='5'?4:5}). Donc y n’est égal à aucun des x<sub>n</sub> déjà examinés.`,
   note:'On n’utilise que les chiffres 4 et 5 pour éviter le piège 0,0999… = 0,1000… : un réel qui a deux écritures décimales. y, écrit sans 0 ni 9, a une seule écriture.'},
  {kind:'Défi',h:'Le cœur de l’argument',p:'Dans la preuve de Cantor, pourquoi le réel <i>y</i> construit n’est-il <b>aucun</b> des <i>x</i><sub><i>n</i></sub>&nbsp;?',
   opts:['Car y est plus grand que tous les x<sub>n</sub>','Car y est irrationnel','Car pour chaque n, y et x<sub>n</sub> ont des n-ièmes chiffres différents','Car la liste est infinie'],ans:2,
   why:'C’est exactement la construction : y est fabriqué pour différer de x<sub>n</sub> en position n, et un tel y n’a qu’une écriture décimale. Donc y ∈ ]0 ; 1[ manque à la liste : contradiction. Rien n’oblige y à être plus grand que les x<sub>n</sub>.'},
  {kind:'Méthode',h:'Le théorème de Cantor : 𝒫(E) est plus gros que E',
   p:'<b>Énoncé :</b> pour tout ensemble <i>E</i>, il n’existe aucune surjection <i>f</i> : <i>E</i> → 𝒫(<i>E</i>) ; donc <i>E</i> et 𝒫(<i>E</i>) ne sont jamais équipotents. <b>Idée :</b> la même diagonale que pour ℝ. Pour une <i>f</i> donnée, on forme <b><i>D</i> = {<i>x</i> ∈ <i>E</i> : <i>x</i> ∉ <i>f</i>(<i>x</i>)}</b>. Pour chaque <i>x</i>, <i>D</i> et <i>f</i>(<i>x</i>) diffèrent sur l’élément <i>x</i> lui-même : <i>D</i> n’est l’image de personne.',
   demo:{enonce:'<i>E</i> = {1 ; 2 ; 3}, <i>f</i>(1) = {1 ; 2}, <i>f</i>(2) = ∅, <i>f</i>(3) = {1 ; 3}. Calcule <i>D</i> et vérifie qu’il n’a pas d’antécédent. Puis prouve le cas général.',
    etapes:[{f:'1 ∈ <i>f</i>(1) : 1 ∉ <i>D</i>. 2 ∉ <i>f</i>(2) : 2 ∈ <i>D</i>. 3 ∈ <i>f</i>(3) : 3 ∉ <i>D</i>. Donc <i>D</i> = {2}.',w:'On teste chaque x sur sa propre image : c’est la « diagonale ».'},
     {f:'<i>D</i> ≠ <i>f</i>(1) (1 ∈ <i>f</i>(1), 1 ∉ <i>D</i>), <i>D</i> ≠ <i>f</i>(2) (2 ∈ <i>D</i>, 2 ∉ <i>f</i>(2)), <i>D</i> ≠ <i>f</i>(3) (à cause de 3).',w:'Chaque comparaison échoue sur l’élément diagonal.'},
     {f:'Cas général : si <i>D</i> = <i>f</i>(<i>d</i>), alors <i>d</i> ∈ <i>D</i> ⇔ <i>d</i> ∉ <i>f</i>(<i>d</i>) ⇔ <i>d</i> ∉ <i>D</i>.',w:'On applique la définition de D à l’élément d : on obtient une proposition équivalente à sa négation.'},
     {f:'Contradiction : aucun <i>d</i> ne convient, <i>f</i> n’est pas surjective.',w:'Le raisonnement ne dépend pas de f : aucune application E → 𝒫(E) n’est surjective.'}],
    conclusion:'<b>card 𝒫(E) est strictement plus grand que card E</b>, même pour E infini. On obtient une échelle sans fin d’infinis : ℕ, 𝒫(ℕ), 𝒫(𝒫(ℕ)), … On peut montrer que 𝒫(ℕ) a la même puissance que ℝ.'}},
  {kind:'Pratique',h:'Fabrique la diagonale',p:'Sur <i>E</i> = {1 ; 2 ; 3}, la ligne <i>x</i> de la grille décrit la partie <i>f</i>(<i>x</i>) (case pleine en colonne <i>y</i> si <i>y</i> ∈ <i>f</i>(<i>x</i>)). La diagonale est en pointillé. Règle <i>f</i> pour que <i>f</i>(1) = {2 ; 3} et que <i>D</i> = {<i>x</i> : <i>x</i> ∉ <i>f</i>(<i>x</i>)} soit égal à {1 ; 3}.',
   params:params9((i,j)=>`${j} ∈ f(${i})`),
   draw:v=>grilleB(['f(1)','f(2)','f(3)'],L3,[0,1,2].map(i=>[0,1,2].map(j=>cell(v,i,j))),{diag:1,corner:' ',hl:(i,j)=>i===j}),
   info:v=>{ const fx=[0,1,2].map(i=>[1,2,3].filter((y,j)=>cell(v,i,j))), D=[1,2,3].filter((x,i)=>!cell(v,i,i));
     return `D = ${lst(D)}. `+[0,1,2].map(i=>`f(${i+1}) = ${lst(fx[i])} ≠ D (différence en ${i+1})`).join(' · '); },
   ok:v=>cell(v,0,0)===0&&cell(v,0,1)===1&&cell(v,0,2)===1&&cell(v,1,1)===1&&cell(v,2,2)===0,
   why:'D se lit sur la diagonale, cases inversées : 1 ∉ f(1) et 3 ∉ f(3) mettent 1 et 3 dans D, et 2 ∈ f(2) exclut 2. Quelle que soit f, D diffère de la ligne x en colonne x : D n’est jamais une ligne de la grille.'},
  {kind:'Problème',h:'La loi x ∗ y = x + y + xy',
   p:'Sur ℝ, on définit <i>x</i> ∗ <i>y</i> = <i>x</i> + <i>y</i> + <i>xy</i>. C’est bien une loi interne (le résultat est toujours un réel). L’identité <i>x</i> ∗ <i>y</i> = (1 + <i>x</i>)(1 + <i>y</i>) − 1 permet de tout comprendre : on décale de 1, on multiplie, on redécale. On étudie quelques calculs et une partie stable.',
   parts:[
    {q:'a) Calcule 2 ∗ 3.',lab:'2 ∗ 3 =',ans:11,hint:'2 + 3 + 2 · 3.',why:'2 + 3 + 6 = 11. Avec l’identité : 3 · 4 − 1 = 11.'},
    {q:'b) Résous 2 ∗ <i>x</i> = 0. Tu peux répondre par une fraction.',lab:'x =',ans:-2/3,tol:.001,hint:'2 + x + 2x = 0.',why:'2 + 3x = 0 donne x = −2/3. Contrôle : (1 + 2)(1 − 2/3) − 1 = 3 · 1/3 − 1 = 0.'},
    {q:'c) Calcule (−1) ∗ 5.',lab:'(−1) ∗ 5 =',ans:-1,hint:'Utilise l’identité : 1 + (−1) = 0.',why:'(1 − 1)(1 + 5) − 1 = −1. En fait (−1) ∗ y = −1 pour tout y : −1 « absorbe » tout.'},
    {q:'d) Pourquoi ]−1 ; +∞[ est-elle une partie stable pour ∗&nbsp;?',opts:['Car x + y + xy &gt; x + y','Si x, y &gt; −1, alors 1 + x &gt; 0 et 1 + y &gt; 0, donc (1 + x)(1 + y) &gt; 0 et x ∗ y = (1 + x)(1 + y) − 1 &gt; −1','Car −1 est absorbant','Car ∗ est commutative'],ans:1,hint:'Traduis x &gt; −1 en 1 + x &gt; 0 et utilise l’identité.',why:'Un produit de deux réels strictement positifs est strictement positif. La première option est fausse dès que xy &lt; 0.'},
   ],
   sol:'On a x ∗ y = (1 + x)(1 + y) − 1 : la loi ∗ est la multiplication, « décalée de 1 ».<br>a) 2 ∗ 3 = 3 · 4 − 1 = <b>11</b>.<br>b) 2 ∗ x = 3(1 + x) − 1 = 0 donne 1 + x = 1/3, soit <b>x = −2/3</b>.<br>c) (−1) ∗ y = 0 · (1 + y) − 1 = <b>−1</b> pour tout y : −1 est absorbant, comme 0 pour ×.<br>d) Si x, y &gt; −1, les facteurs 1 + x et 1 + y sont &gt; 0, donc x ∗ y &gt; −1 : <b>]−1 ; +∞[ est stable</b>, et ∗ induit une loi interne sur cette partie.'},
  {kind:'Problème',h:'Cantor en action',
   p:'On applique l’ensemble « diagonal » <i>D</i> = {<i>x</i> ∈ <i>E</i> : <i>x</i> ∉ <i>f</i>(<i>x</i>)} à plusieurs applications <i>f</i> : <i>E</i> → 𝒫(<i>E</i>), pour voir concrètement pourquoi <i>D</i> échappe toujours à <i>f</i>. On termine par la preuve générale. Rappel : <i>D</i> est construit pour différer de chaque <i>f</i>(<i>x</i>) sur l’élément <i>x</i>.',
   parts:[
    {q:'a) <i>E</i> = {1 ; 2 ; 3 ; 4}, <i>f</i>(1) = {2 ; 3}, <i>f</i>(2) = {2}, <i>f</i>(3) = {1 ; 2 ; 4}, <i>f</i>(4) = {1}. Combien d’éléments a <i>D</i>&nbsp;?',lab:'card D =',ans:3,hint:'Teste « x ∈ f(x) ? » pour chaque x.',why:'1 ∉ f(1), 2 ∈ f(2), 3 ∉ f(3), 4 ∉ f(4) : D = {1 ; 3 ; 4}. On vérifie que D n’est aucune des quatre images.'},
    {q:'b) <i>E</i> = ℕ*, <i>f</i>(<i>n</i>) = ensemble des diviseurs de <i>n</i>. Que vaut <i>D</i>&nbsp;?',opts:['ℕ*','L’ensemble des nombres premiers','∅','{1}'],ans:2,hint:'n est-il un diviseur de n ?',why:'n divise n, donc n ∈ f(n) pour tout n : D = ∅. Et ∅ n’est bien l’image de personne, car f(n) contient au moins n.'},
    {q:'c) <i>E</i> = ℕ*, <i>f</i>(<i>n</i>) = {1 ; 2 ; … ; <i>n</i> − 1}. Que vaut <i>D</i>&nbsp;?',opts:['∅','ℕ*','{1}','Les nombres pairs'],ans:1,hint:'n est-il strictement inférieur à lui-même ?',why:'n ∉ f(n) pour tout n, donc D = ℕ*. D est infini alors que chaque f(n) est fini : D n’est l’image de personne.'},
    {q:'d) Dans la preuve générale, on suppose <i>D</i> = <i>f</i>(<i>d</i>). Quelle est la contradiction&nbsp;?',opts:['d ∈ D et d ∈ f(d)','D est vide','d ∈ D ⇔ d ∉ f(d) ⇔ d ∉ D : d serait à la fois dans D et hors de D','f n’est pas injective'],ans:2,hint:'Applique la définition de D à l’élément d, puis remplace f(d) par D.',why:'La définition donne d ∈ D ⇔ d ∉ f(d), et f(d) = D transforme cela en d ∈ D ⇔ d ∉ D, ce qui est impossible.'},
   ],
   sol:'Pour toute f : E → 𝒫(E), on pose D = {x ∈ E : x ∉ f(x)}.<br>a) D = {1 ; 3 ; 4}, de cardinal <b>3</b>, différent de chaque f(x) sur l’élément x.<br>b) Diviseurs : n ∈ f(n) toujours, donc <b>D = ∅</b>, et ∅ ≠ f(n) car n ∈ f(n).<br>c) Entiers inférieurs : n ∉ f(n) toujours, donc <b>D = ℕ*</b>, infini, différent de chaque f(n) fini.<br>d) En général, si D = f(d), alors d ∈ D ⇔ d ∉ f(d) = D : contradiction. Donc <b>aucune application E → 𝒫(E) n’est surjective</b>, et 𝒫(E) a une puissance strictement plus grande que E.'},
]},
);
})();
