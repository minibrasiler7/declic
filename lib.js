/* Déclic — bibliothèque partagée (chargée avant tous les fichiers de contenu).
   API pour écrire des leçons :
   - fmt(v, d=2)        nombre → texte français (virgule, vrai signe moins)
   - F(a, b)            fraction HTML empilée ; mat([[a,b],[c,d]]) matrice HTML
   - rad(deg)           degrés → radians
   - py(src)            bloc de code Python coloré (<pre class="code">)
   - plane(o)           repère 2D → SVG (voir plus bas) ; space(o) repère 3D en perspective cavalière
   - COURS              tableau où chaque fichier cours/*.js pousse ses chapitres */

const F=(a,b)=>`<span class="fr"><span>${a}</span><span>${b}</span></span>`;
const mat=m=>`<span class="mat" style="grid-template-columns:repeat(${m[0].length},auto)">${m.flat().map(v=>`<span>${v}</span>`).join('')}</span>`;
const rad=d=>d*Math.PI/180;
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function py(src){
  const re=/(#[^\n]*)|('(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*")|\b(def|return|if|elif|else|for|while|in|not|and|or|import|from|as|True|False|None|lambda|break|continue|pass|class|is|with|yield|global|nonlocal|try|except|raise)\b|\b(\d+(?:\.\d+)?)\b|\b(print|range|len|int|str|float|list|dict|tuple|set|sorted|sum|min|max|abs|enumerate|zip|append|input|type|isinstance|round|pop|keys|values|items|split|join|insert)\b/g;
  let out='',last=0,m; src=src.replace(/^\n/,'');
  while((m=re.exec(src))){ out+=esc(src.slice(last,m.index));
    const cls=m[1]?'com':m[2]?'str':m[3]?'kw':m[4]?'num':'fn'; out+=`<span class="${cls}">${esc(m[0])}</span>`; last=re.lastIndex; }
  return `<pre class="code">${out+esc(src.slice(last))}</pre>`;
}

/* Les cours complets. Les fichiers cours/*.js ajoutent des chapitres :
   COURS.push({subj, sem, id, h, p, steps}). subj et sem (la partie du cours) doivent exister ici. */
const MATIERES=[
  {id:'an1',h:'Analyse I',c:'var(--math)',sems:{aut:{h:'Calcul différentiel',s:'Nombres, suites, limites, continuité et dérivées'},pri:{h:'Applications et intégrales',s:'Étude de fonctions, arcs paramétrés, intégrale et ses applications'}}},
  {id:'an2',h:'Analyse II',c:'var(--math)',sems:{aut:{h:'Fonctions spéciales',s:'Angles, trigonométrie, logarithmes et exponentielles'},pri:{h:'Complexes et équations différentielles',s:'Fonctions hyperboliques, nombres complexes, polynômes, développements limités, équations différentielles'}}},
  {id:'al',h:'Algèbre linéaire',c:'var(--code)',sems:{all:{h:'Dans le plan',s:'Ensembles, logique, applications, matrices 2 × 2, réduction'},esp:{h:'En dimension 3',s:'Matrices 3 × 3, déterminants, systèmes et réduction'}}},
  {id:'ga',h:'Géométrie analytique',c:'var(--sci)',sems:{all:{h:'Vecteurs, droites et plans',s:'Calcul vectoriel, produit scalaire et vectoriel, transformations, géométrie 3D'},con:{h:'Coniques',s:'Ellipse, hyperbole, parabole, géométrie projective et équations matricielles'}}},
  {id:'ics',h:'Informatique',c:'var(--code)',sems:{py:{h:'Programmation Python',s:'Syntaxe, fonctions, contrôle, structures de données'},algo:{h:'Algorithmique',s:'Correction, complexité, récursivité, recherche, tris, graphes'}}},
  {id:'phy',h:'Physique',c:'var(--other)',sems:{all:{h:'Mécanique et thermodynamique',s:'Mouvement, forces, énergie, fluides, gaz et chaleur'}}},
  {id:'chi',h:'Chimie',c:'var(--ok)',sems:{pri:{h:'Chimie générale',s:'De l’atome à la cinétique'}}},
];
const COURS=[];

/* Repère 3D : z vers le haut, x vers l'avant-gauche, y vers la droite.
   space({r:5, az:30, el:20, axes:true}) → méthodes seg/arrow/poly/dot/text prenant des points [x,y,z], puis .svg() */
function space(o={}){
  const az=rad(o.az??30), el=rad(o.el??20), r=o.r||5;
  const pr=(x,y,z)=>{ const d=x*Math.cos(az)+y*Math.sin(az); return [y*Math.cos(az)-x*Math.sin(az), z*Math.cos(el)-d*Math.sin(el)]; };
  const P=plane({x:[-r,r],y:[-r,r],grid:false,axes:false,w:o.w||320});
  const S={P,pr,
    seg(a,b,q){ const p=pr(...a),t=pr(...b); P.seg(p[0],p[1],t[0],t[1],q); return S; },
    arrow(a,b,q){ const p=pr(...a),t=pr(...b); P.arrow(p[0],p[1],t[0],t[1],q); return S; },
    poly(pts,q){ P.poly(pts.map(p=>pr(...p)),q); return S; },
    dot(a,q){ const p=pr(...a); P.dot(p[0],p[1],q); return S; },
    text(a,s,q){ const p=pr(...a); P.text(p[0],p[1],s,q); return S; },
    svg(){ return P.svg(); }};
  if(o.axes!==false){ const L=o.L||r*.85; [['x',[L,0,0]],['y',[0,L,0]],['z',[0,0,L]]].forEach(([n,e])=>{ S.arrow([0,0,0],e,{c:'var(--muted)',w:1.5,hs:8}); S.text(e,n,{c:'var(--muted)',dx:4,dy:-4}); }); }
  return S;
}

/* Repère 2D. plane({x:[xmin,xmax], y:[ymin,ymax], w:320, h (sinon même échelle), grid:true, step:1, axes:true, lab|lx|ly: pas des graduations})
   Méthodes chaînables : fn(f,{from,to,c,w,dash,op,n}), curve(fx,fy,t0,t1,q), seg(x1,y1,x2,y2,q), arrow(x1,y1,x2,y2,q),
   poly(pts,{fill,fo,c,w,dash,open}), rect(x,y,w,h,q), area(f,a,b,q), circ(cx,cy,r,q), dot(x,y,{c,r,l}), text(x,y,s,{a,dx,dy,s,c}), svg().
   q.c = couleur du trait (null = pas de trait). Couleurs : var(--accent) var(--math) var(--spark) var(--bad) var(--ok) var(--code) var(--sci) var(--other) var(--muted) var(--ink) */
/* ---------- outils de dessin partagés (utilisés par maths.js) ---------- */
function fmt(v,d=2){ if(typeof v!=='number') return v; let s=String(Math.round(v*10**d)/10**d); if(s==='-0') s='0'; return s.replace('.',',').replace('-','−'); }
let PID=0;
function plane(o={}){
  const xr=o.x||[-5,5], yr=o.y||[-5,5], W=o.w||320, sx=W/(xr[1]-xr[0]);
  const H=o.h||Math.round((yr[1]-yr[0])*sx), sy=H/(yr[1]-yr[0]);
  const X=x=>+((x-xr[0])*sx).toFixed(1), Y=y=>+(H-(y-yr[0])*sy).toFixed(1);
  const id='pc'+(++PID), low=[], mid=[], top=[];
  const S=q=>q.c===null?'stroke="none"':`stroke="${q.c||'var(--accent)'}" stroke-width="${q.w??3}" ${q.dash?'stroke-dasharray="7 5"':''} opacity="${q.op??1}" stroke-linecap="round" stroke-linejoin="round"`;
  const T=(px,py,s,a)=>top.push(`<text x="${px}" y="${py}" font-size="11" text-anchor="${a}" fill="var(--muted)">${s}</text>`);
  if(o.grid!==false){ const s=o.step||1;
    for(let x=Math.ceil(xr[0]/s)*s;x<=xr[1]+1e-9;x+=s) low.push(`<line x1="${X(x)}" x2="${X(x)}" y1="0" y2="${H}" stroke="var(--line)"/>`);
    for(let y=Math.ceil(yr[0]/s)*s;y<=yr[1]+1e-9;y+=s) low.push(`<line y1="${Y(y)}" y2="${Y(y)}" x1="0" x2="${W}" stroke="var(--line)"/>`); }
  if(o.axes!==false){
    const ay=Math.min(Math.max(Y(0),0),H), ax=Math.min(Math.max(X(0),0),W);
    if(yr[0]<=0&&yr[1]>=0) low.push(`<line x1="0" x2="${W}" y1="${ay}" y2="${ay}" stroke="var(--muted)" stroke-width="1.5"/>`);
    if(xr[0]<=0&&xr[1]>=0) low.push(`<line y1="0" y2="${H}" x1="${ax}" x2="${ax}" stroke="var(--muted)" stroke-width="1.5"/>`);
    const lx=o.lx||o.lab, ly=o.ly||o.lab;
    if(lx) for(let x=Math.ceil(xr[0]/lx)*lx;x<xr[1]-1e-9;x+=lx) if(Math.abs(x)>1e-9&&x>xr[0]+1e-9) T(X(x),Math.min(ay+15,H-3),fmt(x),'middle');
    if(ly) for(let y=Math.ceil(yr[0]/ly)*ly;y<yr[1]-1e-9;y+=ly) if(Math.abs(y)>1e-9&&y>yr[0]+1e-9) T(Math.max(ax-6,22),Y(y)+4,fmt(y),'end');
  }
  const P={X,Y,W,H,
    fn(f,q={}){ const a=q.from??xr[0], b=q.to??xr[1], n=q.n||240, lim=(yr[1]-yr[0])*3, mid0=(yr[0]+yr[1])/2; let d='',pen=false;
      for(let i=0;i<=n;i++){ const x=a+(b-a)*i/n, y=f(x); if(!isFinite(y)||Math.abs(y-mid0)>lim){pen=false;continue;} d+=(pen?'L':'M')+X(x)+' '+Y(y); pen=true; }
      mid.push(`<path d="${d}" fill="none" ${S(Object.assign({w:3.5},q))}/>`); return P; },
    curve(fx,fy,t0,t1,q={}){ const n=q.n||300; let d=''; for(let i=0;i<=n;i++){ const t=t0+(t1-t0)*i/n; d+=(i?'L':'M')+X(fx(t))+' '+Y(fy(t)); }
      mid.push(`<path d="${d}" fill="none" ${S(Object.assign({w:3},q))}/>`); return P; },
    seg(x1,y1,x2,y2,q={}){ mid.push(`<line x1="${X(x1)}" y1="${Y(y1)}" x2="${X(x2)}" y2="${Y(y2)}" ${S(q)}/>`); return P; },
    arrow(x1,y1,x2,y2,q={}){ const a=X(x1),b=Y(y1),c=X(x2),d=Y(y2),L=Math.hypot(c-a,d-b); if(L<2) return P;
      const ux=(c-a)/L, uy=(d-b)/L, hs=q.hs||12, bx=c-ux*hs, by=d-uy*hs, col=q.c||'var(--accent)';
      mid.push(`<line x1="${a}" y1="${b}" x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}" ${S(q)}/><path d="M${c} ${d}L${(bx-uy*hs*.5).toFixed(1)} ${(by+ux*hs*.5).toFixed(1)}L${(bx+uy*hs*.5).toFixed(1)} ${(by-ux*hs*.5).toFixed(1)}Z" fill="${col}" opacity="${q.op??1}"/>`); return P; },
    poly(pts,q={}){ mid.push(`<path d="${pts.map((p,i)=>(i?'L':'M')+X(p[0])+' '+Y(p[1])).join('')}${q.open?'':'Z'}" fill="${q.fill||'none'}" fill-opacity="${q.fo??.3}" ${S(q)}/>`); return P; },
    rect(x,y,w,h,q={}){ return P.poly([[x,y],[x+w,y],[x+w,y+h],[x,y+h]],q); },
    area(f,a,b,q={}){ const pts=[[a,0]]; for(let i=0;i<=80;i++){ const x=a+(b-a)*i/80; pts.push([x,f(x)]); } pts.push([b,0]); return P.poly(pts,Object.assign({fill:'var(--accent)',fo:.25,c:null},q)); },
    circ(cx,cy,r,q={}){ mid.push(`<ellipse cx="${X(cx)}" cy="${Y(cy)}" rx="${(r*sx).toFixed(1)}" ry="${(r*sy).toFixed(1)}" fill="${q.fill||'none'}" fill-opacity="${q.fo??.3}" ${S(q)}/>`); return P; },
    dot(x,y,q={}){ top.push(`<circle cx="${X(x)}" cy="${Y(y)}" r="${q.r||6}" fill="${q.c||'var(--spark)'}" stroke="var(--surface)" stroke-width="2"/>`); if(q.l) P.text(x,y,q.l,{dx:q.dx??9,dy:q.dy??-9}); return P; },
    text(x,y,s,q={}){ top.push(`<text x="${X(x)+(q.dx||0)}" y="${Y(y)+(q.dy||0)}" font-size="${q.s||13}" font-weight="700" text-anchor="${q.a||'start'}" fill="${q.c||'var(--ink)'}" paint-order="stroke" stroke="var(--surface)" stroke-width="3">${s}</text>`); return P; },
    svg(){ return `<svg viewBox="0 0 ${W} ${H}" width="${W}" role="img"><defs><clipPath id="${id}"><rect width="${W}" height="${H}"/></clipPath></defs>${low.join('')}<g clip-path="url(#${id})">${mid.join('')}</g>${top.join('')}</svg>`; }
  };
  return P;
}
