/* Déclic — moteur de leçons et interface */
/* ---------- état : localStorage, synchronisé avec le compte par compte.js ---------- */
const store = {
  get(){ try{ return JSON.parse(localStorage.getItem('declic')||'{}') }catch(e){ return {} } },
  set(v){ try{ localStorage.setItem('declic',JSON.stringify(v)) }catch(e){} }
};
const blankState=()=>({xp:0, streak:0, lastDay:null, done:{}, pos:{}, ardoise:{}, notes:{}, last:null, updated:0});
let S = Object.assign(blankState(), store.get());
const dayStr=d=>d.toLocaleDateString('sv');               // AAAA-MM-JJ, heure locale
const today=()=>dayStr(new Date()), yesterday=()=>dayStr(new Date(Date.now()-864e5));
function bumpStreak(){ const t=today(); if(S.lastDay===t) return; S.streak = S.lastDay===yesterday() ? S.streak+1 : 1; S.lastDay=t; }
function liveStreak(){ return (S.lastDay===today()||S.lastDay===yesterday()) ? S.streak : 0; }
function save(){ S.updated=Date.now(); store.set(S); renderStats(); window.Compte?.push(); }
function renderStats(){ document.getElementById('xp').textContent=S.xp; document.getElementById('streak').textContent=liveStreak(); }
/* Fusionne une progression distante (compte) avec la progression locale, sans rien perdre */
function mergeState(r){
  r=Object.assign(blankState(), r||{});
  const m=blankState();
  m.done=Object.assign({}, r.done, S.done);
  m.xp=Math.max(S.xp, r.xp);
  const newer=(r.lastDay||'')>(S.lastDay||'') ? r : S; m.lastDay=newer.lastDay; m.streak=(r.lastDay===S.lastDay)?Math.max(r.streak,S.streak):newer.streak;
  const latest=r.updated>S.updated ? r : S, other=latest===r ? S : r;
  m.pos=Object.assign({}, other.pos, latest.pos);
  m.ardoise=Object.assign({}, other.ardoise, latest.ardoise);
  m.notes=Object.assign({}, other.notes, latest.notes);
  m.last=latest.last||other.last; m.updated=Math.max(S.updated, r.updated);
  S=m; store.set(S); renderStats();
}

const $ = (h)=>{ const t=document.createElement('template'); t.innerHTML=h.trim(); return t.content.firstElementChild; };

/* ---------- audio (après interaction) ---------- */
let AC=null;
function tone(semi, when=0, dur=.6){
  try{
    AC = AC || new (window.AudioContext||window.webkitAudioContext)();
    const f = 261.63*Math.pow(2,semi/12), t=AC.currentTime+when;
    const o=AC.createOscillator(), g=AC.createGain(), o2=AC.createOscillator(), g2=AC.createGain();
    o.type='triangle'; o.frequency.value=f; o2.type='sine'; o2.frequency.value=f*2;
    g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(.35,t+.01); g.gain.exponentialRampToValueAtTime(.001,t+dur);
    g2.gain.setValueAtTime(.08,t); g2.gain.exponentialRampToValueAtTime(.001,t+dur*.6);
    o.connect(g).connect(AC.destination); o2.connect(g2).connect(AC.destination);
    o.start(t); o2.start(t); o.stop(t+dur); o2.stop(t+dur);
  }catch(e){}
}

/* ---------- widgets ---------- */
function choices(opts, ctx, row){
  const el=$(`<div class="choices ${row?'row':''}"></div>`);
  opts.forEach((o,i)=>{
    const b=$(`<button class="choice" id="c${i}"></button>`); b.innerHTML=o;
    b.onclick=()=>{ el.querySelectorAll('.choice').forEach(x=>x.classList.remove('sel','wrong','right')); b.classList.add('sel'); ctx.answer=i; ctx.ready(true); };
    el.appendChild(b);
  });
  ctx.mark=(ok)=>{ const s=el.querySelector('.sel'); if(s) s.classList.add(ok?'right':'wrong'); };
  return el;
}
function stepper(init,min,max,on){
  const el=$(`<div class="stepper"><button aria-label="Moins">−</button><output>${init}</output><button aria-label="Plus">+</button></div>`);
  let v=init; const out=el.querySelector('output');
  const set=n=>{ v=Math.max(min,Math.min(max,n)); out.textContent=v; on(v); };
  el.children[0].onclick=()=>set(v-1); el.children[2].onclick=()=>set(v+1);
  return el;
}

/* Graphique cartésien pour la pente */
function graph(a,b,opts={}){
  const U=24,O=156,W=312; const X=x=>O+x*U, Y=y=>O-y*U;
  let g='';
  for(let i=-6;i<=6;i++){ g+=`<line x1="${X(i)}" y1="12" x2="${X(i)}" y2="${W-12}" stroke="var(--line)" stroke-width="1"/><line x1="12" y1="${Y(i)}" x2="${W-12}" y2="${Y(i)}" stroke="var(--line)" stroke-width="1"/>`; }
  g+=`<line x1="12" y1="${O}" x2="${W-12}" y2="${O}" stroke="var(--muted)" stroke-width="1.5"/><line x1="${O}" y1="12" x2="${O}" y2="${W-12}" stroke="var(--muted)" stroke-width="1.5"/>`;
  for(const i of [-4,-2,2,4]){ g+=`<text x="${X(i)}" y="${O+16}" font-size="11" text-anchor="middle" fill="var(--muted)">${i}</text><text x="${O-8}" y="${Y(i)+4}" font-size="11" text-anchor="end" fill="var(--muted)">${i}</text>`; }
  // droite clipée
  const x1=-6.5,x2=6.5;
  g+=`<clipPath id="cp"><rect x="12" y="12" width="${W-24}" height="${W-24}"/></clipPath><line clip-path="url(#cp)" x1="${X(x1)}" y1="${Y(a*x1+b)}" x2="${X(x2)}" y2="${Y(a*x2+b)}" stroke="var(--accent)" stroke-width="4" stroke-linecap="round"/>`;
  if(opts.tri){ // triangle de pente à partir de x=1
    const x0=1,y0=a*x0+b;
    g+=`<path d="M${X(x0)} ${Y(y0)} H${X(x0+1)} V${Y(y0+a)}" fill="none" stroke="var(--spark)" stroke-width="3" stroke-dasharray="5 4"/>
        <text x="${X(x0+.5)}" y="${Y(y0)+(a>=0?18:-8)}" font-size="13" font-weight="700" text-anchor="middle" fill="var(--ink)">+1</text>
        <text x="${X(x0+1)+8}" y="${Y(y0+a/2)+4}" font-size="13" font-weight="700" fill="var(--ink)">${a>=0?'+':''}${a}</text>`;
  }
  (opts.pts||[]).forEach(p=>{ g+=`<circle cx="${X(p[0])}" cy="${Y(p[1])}" r="7" fill="${p[2]||'var(--spark)'}" stroke="var(--surface)" stroke-width="2"/>`; if(p[3]) g+=`<text x="${X(p[0])+10}" y="${Y(p[1])-10}" font-size="13" font-weight="700" fill="var(--ink)">${p[3]}</text>`; });
  g+=`<circle cx="${X(0)}" cy="${Y(b)}" r="5" fill="var(--accent)"/>`;
  return `<svg viewBox="0 0 ${W} ${W}" width="${W}" role="img" aria-label="Droite y = ${a}x + ${b}">${g}</svg>`;
}

/* Grille du robot */
function robotWorld(cfg){
  const C=56, N=cfg.n||5;
  const el=$(`<div class="fig"><svg viewBox="0 0 ${N*C} ${N*C}" width="${N*C}"></svg><div class="cap">${cfg.cap||''}</div></div>`);
  const svg=el.querySelector('svg');
  let st={x:cfg.start[0],y:cfg.start[1],d:cfg.dir}, trail=[[st.x,st.y]];
  const DX=[1,0,-1,0], DY=[0,1,0,-1]; // 0 est, 1 sud, 2 ouest, 3 nord
  function draw(){
    let g='';
    for(let i=0;i<N;i++)for(let j=0;j<N;j++) g+=`<rect x="${i*C+2}" y="${j*C+2}" width="${C-4}" height="${C-4}" rx="8" fill="color-mix(in srgb,var(--code) 7%,var(--surface))" stroke="var(--line)"/>`;
    if(trail.length>1) g+=`<polyline points="${trail.map(p=>`${p[0]*C+C/2},${p[1]*C+C/2}`).join(' ')}" fill="none" stroke="var(--code)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity=".45"/>`;
    if(cfg.flag){ const [fx,fy]=cfg.flag; g+=`<g transform="translate(${fx*C+C/2-8},${fy*C+10})"><rect x="0" y="0" width="3" height="36" fill="var(--ink)"/><path d="M3 0h20l-6 7 6 7H3z" fill="var(--spark)"/></g>`; }
    const cx=st.x*C+C/2, cy=st.y*C+C/2, rot=st.d*90;
    g+=`<g transform="translate(${cx},${cy}) rotate(${rot})"><rect x="-17" y="-17" width="34" height="34" rx="10" fill="var(--code)"/><circle cx="6" cy="-6" r="3.5" fill="#fff"/><circle cx="6" cy="6" r="3.5" fill="#fff"/><path d="M17 -6 L25 0 L17 6Z" fill="var(--code)"/></g>`;
    svg.innerHTML=g;
  }
  draw();
  const api={el,
    reset(){ st={x:cfg.start[0],y:cfg.start[1],d:cfg.dir}; trail=[[st.x,st.y]]; draw(); },
    run(prog, done){ // prog = tableau de 'A' (avancer) / 'R' (tourner à droite)
      api.reset(); let i=0, crashed=false;
      const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
      const tick=()=>{
        if(i>=prog.length||crashed){ done({x:st.x,y:st.y,d:st.d,crashed}); return; }
        const c=prog[i++];
        if(c==='A'){ const nx=st.x+DX[st.d], ny=st.y+DY[st.d]; if(nx<0||ny<0||nx>=N||ny>=N){crashed=true;} else {st.x=nx;st.y=ny;trail.push([nx,ny]);} }
        else st.d=(st.d+1)%4;
        draw(); setTimeout(tick, reduce?40:330);
      };
      setTimeout(tick,200);
    }};
  return api;
}

/* Piano Do3 → Mi4 */
const NOTE=['Do','Do♯','Ré','Ré♯','Mi','Fa','Fa♯','Sol','Sol♯','La','La♯','Si'];
function piano(onKey, hi=[]){
  const el=$(`<div class="piano" role="group" aria-label="Clavier de piano"></div>`);
  const whites=[0,2,4,5,7,9,11,12,14,16], blacks=[[1,0],[3,1],[6,3],[8,4],[10,5],[13,7],[15,8]];
  const ww=100/whites.length, keys={};
  whites.forEach((s,i)=>{ const k=$(`<button class="key w" aria-label="${NOTE[s%12]}" style="left:${i*ww}%;width:${ww}%">${NOTE[s%12]}</button>`); keys[s]=k; el.appendChild(k); });
  blacks.forEach(([s,i])=>{ const k=$(`<button class="key b" aria-label="${NOTE[s%12]}" style="left:${(i+1)*ww-ww*.3}%;width:${ww*.6}%"></button>`); keys[s]=k; el.appendChild(k); });
  Object.entries(keys).forEach(([s,k])=>{ s=+s; if(hi.includes(s)) k.classList.add('hi');
    k.onclick=()=>{ tone(s); k.classList.add('on'); setTimeout(()=>k.classList.remove('on'),220); onKey&&onKey(s,keys); }; });
  el.keys=keys; return el;
}

/* ---------- contenu des cours ---------- */
const LESSONS = {
  pente:{ title:'La pente d’une droite', domain:'Maths', steps:[
    {kind:'Théorie', render(c,ctx){
      c.append($(`<h2>Une droite, deux nombres</h2>`),
        $(`<p>Toute droite non verticale s’écrit <code>y = a·x + b</code>. Le nombre <b>b</b> dit où elle coupe l’axe vertical. Le nombre <b>a</b>, la <b>pente</b>, dit de combien elle monte quand on avance d’une case vers la droite.</p>`));
      const fig=$(`<div class="fig"></div>`); const box=$(`<div></div>`);
      const f=$(`<div class="formula">y = <b>1</b>·x + 0</div>`);
      const sl=$(`<div class="slider"><label for="sa">Pente a <output>1</output></label><input id="sa" type="range" min="-3" max="3" step="0.5" value="1"></div>`);
      const upd=()=>{ const a=+sl.querySelector('input').value; box.innerHTML=graph(a,0,{tri:true}); f.innerHTML=`y = <b>${a}</b>·x + 0`; sl.querySelector('output').textContent=a; };
      sl.querySelector('input').oninput=upd; upd();
      fig.append(f,box,sl,$(`<div class="cap">Bouge le curseur. Le triangle jaune montre : +1 vers la droite, +a vers le haut.</div>`)); c.append(fig);
    }},
    {kind:'Question', render(c,ctx){
      c.append($(`<h2>Lis la pente</h2>`),$(`<p>Cette droite passe par les deux points jaunes. Quelle est sa pente&nbsp;?</p>`));
      c.append($(`<div class="fig">${graph(2,1,{pts:[[0,1,null,'(0, 1)'],[2,5,null,'(2, 5)']]})}</div>`));
      c.append(choices(['a = 1','a = 2','a = 4','a = 5'],ctx,true));
      ctx.check=()=>({ok:ctx.answer===1, why: ctx.answer===2 ? 'Elle monte de 4, mais sur 2 cases. Divise : 4 ÷ 2.' : 'On monte de 5 − 1 = 4 en avançant de 2 cases : a = 4 ÷ 2 = 2.'});
    }},
    {kind:'Pratique', render(c,ctx){
      c.append($(`<h2>Vise le point</h2>`),$(`<p>La droite part de <code>(0, 1)</code>. Règle la pente pour qu’elle passe par le drapeau <code>(4, −1)</code>.</p>`));
      const fig=$(`<div class="fig"></div>`), box=$(`<div></div>`);
      const sl=$(`<div class="slider"><label for="sb">Pente a <output>1</output></label><input id="sb" type="range" min="-2" max="2" step="0.25" value="1"></div>`);
      const upd=()=>{ const a=+sl.querySelector('input').value; ctx.answer=a; box.innerHTML=graph(a,1,{pts:[[4,-1,'var(--bad)','drapeau']]}); sl.querySelector('output').textContent=a; ctx.ready(true); };
      sl.querySelector('input').oninput=upd; upd(); ctx.ready(false);
      fig.append(box,sl); c.append(fig);
      ctx.check=()=>({ok:ctx.answer===-0.5, why:'Pour aller de y = 1 à y = −1, on descend de 2 en 4 cases : a = −2 ÷ 4 = −0,5.'});
    }},
    {kind:'Théorie', render(c){
      c.append($(`<h2>Le signe raconte une histoire</h2>`),
        $(`<p>Pente positive : ça monte. Pente négative : ça descend. Pente nulle : c’est plat. Plus |a| est grand, plus c’est raide.</p>`),
        $(`<div class="fig" style="grid-template-columns:repeat(3,1fr);gap:8px">${[2,0,-1].map(a=>`<div style="display:grid;gap:4px;justify-items:center">${graph(a,0).replace('width="312"','width="100%"')}<code>a = ${a}</code></div>`).join('')}</div>`),
        $(`<div class="note"><b>Dans la vraie vie :</b> une route à 10 % a une pente de 0,1. Tu montes de 10 m tous les 100 m.</div>`));
    }},
    {kind:'Défi', render(c,ctx){
      c.append($(`<h2>Le col du Grand-Saint-Bernard</h2>`),
        $(`<p>Une route monte de 240 m sur une distance horizontale de 3 km. Quelle est sa pente, en pourcentage&nbsp;?</p>`),
        choices(['0,8 %','8 %','12,5 %','80 %'],ctx,true));
      ctx.check=()=>({ok:ctx.answer===1, why:'3 km = 3000 m. 240 ÷ 3000 = 0,08, soit 8 %.'});
    }},
  ]},

  boucles:{ title:'Les boucles', domain:'Code', steps:[
    {kind:'Théorie', render(c){
      c.append($(`<h2>Arrête de te répéter</h2>`),
        $(`<p>Ce robot comprend deux ordres : <code class="fn">avancer()</code> et <code class="fn">tourner()</code> (un quart de tour à droite). Pour aller loin, on pourrait écrire <code>avancer()</code> dix fois… ou utiliser une <b>boucle</b>.</p>`),
        $(`<pre class="code"><span class="kw">répéter</span> <span class="num">3</span> <span class="kw">fois</span> :\n    <span class="fn">avancer</span>()</pre>`),
        $(`<p>La boucle exécute son bloc indenté le nombre de fois demandé.</p>`));
      const w=robotWorld({start:[0,2],dir:0,cap:'Le robot exécute le programme ci-dessus.'});
      const b=$(`<button class="btn ghost" style="justify-self:center">▶ Lancer</button>`); b.onclick=()=>w.run(['A','A','A'],()=>{});
      w.el.append(b); c.append(w.el);
    }},
    {kind:'Pratique', render(c,ctx){
      c.append($(`<h2>Atteins le drapeau</h2>`),$(`<p>Combien de répétitions pour que le robot s’arrête pile sur le drapeau&nbsp;?</p>`));
      let n=1; const code=$(`<pre class="code"></pre>`);
      const show=()=>code.innerHTML=`<span class="kw">répéter</span> <span class="num">${n}</span> <span class="kw">fois</span> :\n    <span class="fn">avancer</span>()`;
      const w=robotWorld({start:[0,4],dir:3,flag:[0,0],cap:'Le robot regarde vers le haut.'});
      c.append(code, stepper(1,1,9,v=>{n=v;show();w.reset();}), w.el); show(); ctx.ready(true);
      ctx.check=()=>new Promise(res=>w.run(Array(n).fill('A'),r=>res({ok:!r.crashed&&r.x===0&&r.y===0, why: r.crashed?'Boum ! Le robot est sorti de la grille. Compte les cases jusqu’au drapeau.':'Pas encore sur le drapeau. Compte les cases entre le robot et lui.'})));
    }},
    {kind:'Pratique', render(c,ctx){
      c.append($(`<h2>Fais le tour</h2>`),$(`<p>On peut mettre plusieurs ordres dans une boucle. Combien de répétitions pour que le robot dessine un carré complet et revienne à son point de départ, dans la même direction&nbsp;?</p>`));
      let n=1; const code=$(`<pre class="code"></pre>`);
      const show=()=>code.innerHTML=`<span class="kw">répéter</span> <span class="num">${n}</span> <span class="kw">fois</span> :\n    <span class="fn">avancer</span>()\n    <span class="fn">avancer</span>()\n    <span class="fn">avancer</span>()\n    <span class="fn">tourner</span>()`;
      const w=robotWorld({start:[1,1],dir:0,cap:'Départ en haut à gauche, regard vers la droite.'});
      c.append(code, stepper(1,1,8,v=>{n=v;show();w.reset();}), w.el); show(); ctx.ready(true);
      ctx.check=()=>new Promise(res=>{ const p=[]; for(let i=0;i<n;i++) p.push('A','A','A','R'); w.run(p,r=>res({ok:r.x===1&&r.y===1&&r.d===0, why:'Un carré a 4 côtés, et il faut 4 quarts de tour pour retrouver la direction de départ.'})); });
    }},
    {kind:'Théorie', render(c){
      c.append($(`<h2>La même idée en Python</h2>`),
        $(`<p>En Python, la boucle s’écrit <code class="kw">for</code>. La variable <code>i</code> prend une valeur différente à chaque tour.</p>`),
        $(`<pre class="code"><span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">4</span>):\n    <span class="fn">avancer</span>()</pre>`),
        $(`<div class="note"><b>Piège classique :</b> <code>range(4)</code> donne 0, 1, 2, 3. Ça fait bien 4 valeurs, mais on commence à 0.</div>`));
    }},
    {kind:'Défi', render(c,ctx){
      c.append($(`<h2>Que va afficher ce programme&nbsp;?</h2>`),
        $(`<pre class="code">total = <span class="num">0</span>\n<span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">4</span>):\n    total = total + i\n<span class="fn">print</span>(total)</pre>`),
        choices(['4','6','10','0 1 2 3'],ctx,true));
      ctx.check=()=>({ok:ctx.answer===1, why:'i vaut 0, 1, 2 puis 3. 0 + 1 + 2 + 3 = 6. Le 4 n’est jamais atteint.'});
    }},
  ]},

  intervalles:{ title:'Les intervalles', domain:'Musique', steps:[
    {kind:'Théorie', render(c){
      c.append($(`<h2>Le demi-ton, l’unité de mesure</h2>`),
        $(`<p>Sur un piano, passer d’une touche à sa <b>voisine immédiate</b> (blanche ou noire) fait un <b>demi-ton</b>. Un <b>intervalle</b>, c’est la distance entre deux notes, comptée en demi-tons.</p>`));
      const fig=$(`<div class="fig"></div>`), lab=$(`<div class="cap">Touche les notes pour les entendre.</div>`);
      let last=null;
      fig.append(piano((s)=>{ lab.textContent = last===null ? `${NOTE[s%12]}` : `${NOTE[last%12]} → ${NOTE[s%12]} : ${Math.abs(s-last)} demi-ton${Math.abs(s-last)>1?'s':''}`; last=s; }), lab);
      c.append(fig, $(`<div class="note">Entre Mi et Fa, ou entre Si et Do, il n’y a pas de touche noire. Ce sont déjà des demi-tons.</div>`));
    }},
    {kind:'Question', render(c,ctx){
      c.append($(`<h2>Compte les marches</h2>`),$(`<p>Combien de demi-tons séparent <b>Do</b> de <b>Mi</b>&nbsp;? Compte toutes les touches, noires comprises.</p>`));
      const fig=$(`<div class="fig"></div>`); fig.append(piano(null,[0,4])); c.append(fig);
      c.append(choices(['2','3','4','5'],ctx,true));
      ctx.check=()=>({ok:ctx.answer===2, why:'Do → Do♯ → Ré → Ré♯ → Mi : 4 pas. C’est une tierce majeure.'});
    }},
    {kind:'Théorie', render(c){
      c.append($(`<h2>Trois intervalles à connaître</h2>`));
      const rows=[['Tierce majeure',4,'joyeux, lumineux'],['Quinte juste',7,'stable, ouvert'],['Octave',12,'la même note, plus aiguë']];
      rows.forEach(([n,s,d])=>{
        const r=$(`<div class="fig" style="grid-template-columns:1fr auto;justify-items:start;align-items:center"><div><b>${n}</b> · ${s} demi-tons<br><span class="cap" style="text-align:left">${d}</span></div><button class="btn ghost">▶ Écouter</button></div>`);
        r.querySelector('button').onclick=()=>{ tone(0,0,.9); tone(s,.45,.9); tone(0,1.1,1.2); tone(s,1.1,1.2); };
        c.append(r);
      });
    }},
    {kind:'Pratique', render(c,ctx){
      c.append($(`<h2>Construis une tierce majeure</h2>`),$(`<p>Joue la note qui se trouve une <b>tierce majeure</b> (4 demi-tons) au-dessus de <b>Ré</b>.</p>`));
      const lab=$(`<div class="cap">Choisis une touche.</div>`);
      const p=piano((s,keys)=>{ ctx.answer=s; Object.values(keys).forEach(k=>k.classList.remove('hi')); keys[2].classList.add('hi'); keys[s].classList.add('hi'); lab.textContent=`Ré → ${NOTE[s%12]}`; ctx.ready(true); },[2]);
      const fig=$(`<div class="fig"></div>`); fig.append(p,lab); c.append(fig);
      ctx.check=()=>{ const ok=ctx.answer===6; if(ok){ tone(2,0,.8); tone(6,.35,.8);} return {ok, why:'Ré → Ré♯ → Mi → Fa → Fa♯. La réponse est une touche noire : Fa♯.'}; };
    }},
    {kind:'Oreille', render(c,ctx){
      c.append($(`<h2>Entraîne ton oreille</h2>`),$(`<p>Écoute les deux notes. Quel intervalle entends-tu&nbsp;?</p>`));
      const b=$(`<button class="btn" style="justify-self:center">▶ Écouter</button>`); b.onclick=()=>{ tone(0,0,.9); tone(7,.6,1.1); };
      c.append(b, choices(['Tierce majeure','Quinte juste','Octave'],ctx));
      ctx.check=()=>({ok:ctx.answer===1, why:'Do puis Sol : 7 demi-tons, une quinte juste. C’est l’intervalle du début de « Star Wars ».'});
    }},
  ]},
};


/* Deux problèmes pour la leçon de démonstration sur la pente */
LESSONS.pente.steps.push(
  {kind:'Méthode', h:'Trouver l’équation d’une droite',
   p:'Deux situations reviennent sans cesse. <b>On connaît deux points</b> : la pente vaut la variation de y divisée par la variation de x, puis on trouve b en remplaçant un point. <b>On connaît un départ et un taux</b> (prise en charge + prix par km) : b est la valeur de départ, a le taux. Pour comparer deux droites, on cherche où elles se coupent en posant a₁x + b₁ = a₂x + b₂.',
   demo:{enonce:'Trouver la droite qui passe par A(2 ; 7) et B(6 ; 15).',
    etapes:[
     {f:'a = (15 − 7) ÷ (6 − 2) = 8 ÷ 4 = 2', w:'La pente est le quotient des écarts : de combien y monte quand x avance.'},
     {f:'y = 2x + b, et A est sur la droite : 7 = 2·2 + b', w:'Un point de la droite vérifie son équation. On remplace x et y par ses coordonnées.'},
     {f:'b = 7 − 4 = 3', w:'On isole b.'},
     {f:'Contrôle avec B : 2·6 + 3 = 15 ✓', w:'Le second point doit aussi vérifier l’équation : c’est la vérification gratuite.'}],
    conclusion:'La droite est y = 2x + 3.'},
   note:'Pour savoir quand une offre devient meilleure qu’une autre, résous l’égalité des deux prix : c’est le point d’intersection des droites.'},
  {kind:'Problème', h:'Deux taxis',
   p:'Le taxi A facture 6 CHF de prise en charge, puis 3,50 CHF par kilomètre. Le taxi B facture 2 CHF de prise en charge, puis 4 CHF par kilomètre. Chaque prix est une fonction affine de la distance <i>x</i> en km.',
   fig:(()=>{ const P=plane({x:[-1,16],y:[-6,70],h:240,grid:false,lx:5,ly:20}); P.fn(x=>6+3.5*x,{from:0,c:'var(--math)'}).fn(x=>2+4*x,{from:0,c:'var(--other)'}).text(15,6+3.5*15,'A',{dx:6,c:'var(--math)'}).text(15,62,'B',{dx:6,dy:-4,c:'var(--other)'}); return P.svg(); })(),
   parts:[
    {q:'a) Combien coûte une course de 10 km avec le taxi A ?', unit:'CHF', ans:41, hint:'Prise en charge + prix par km × distance.', why:'6 + 3,50 × 10 = 41 CHF.'},
    {q:'b) À partir de quelle distance le taxi A devient-il moins cher que le taxi B ?', unit:'km', ans:8, hint:'Cherche la distance où les deux prix sont égaux : 6 + 3,5x = 2 + 4x.', why:'6 + 3,5x = 2 + 4x donne 0,5x = 4, donc x = 8 km. Au-delà, la pente plus faible de A gagne.'},
    {q:'c) Pour un trajet de 20 km, combien économise-t-on en prenant A ?', unit:'CHF', ans:6, hint:'Calcule les deux prix, ou multiplie l’écart de pente par les km au-delà de 8.', why:'A : 6 + 70 = 76 CHF. B : 2 + 80 = 82 CHF. On économise 6 CHF.'},
   ],
   sol:'Les prix sont p<sub>A</sub>(x) = 3,5x + 6 et p<sub>B</sub>(x) = 4x + 2. Les droites se coupent quand 3,5x + 6 = 4x + 2, soit x = 8 km (prix 34 CHF). Avant 8 km, B est moins cher grâce à sa petite prise en charge. Après, A gagne car sa pente est plus faible : chaque km supplémentaire coûte 0,50 CHF de moins. À 20 km, l’écart vaut 0,5 × (20 − 8) = 6 CHF.'},
  {kind:'Problème', h:'Celsius et Fahrenheit',
   p:'L’eau gèle à 0 °C, soit 32 °F, et bout à 100 °C, soit 212 °F. La conversion est une fonction affine F = a·C + b. On cherche a, b, puis la température qui s’écrit pareil dans les deux échelles.',
   parts:[
    {q:'a) Quelle est la pente a ?', lab:'a =', ans:1.8, tol:.001, hint:'La pente vaut la variation de F divisée par la variation de C entre les deux points connus.', why:'a = (212 − 32) ÷ (100 − 0) = 180 ÷ 100 = 1,8.'},
    {q:'b) Quelle est l’ordonnée à l’origine b ?', lab:'b =', ans:32, hint:'Que vaut F quand C = 0 ?', why:'Pour C = 0, F = 32 : b = 32.'},
    {q:'c) À quelle température C a-t-on F = C ?', lab:'C =', unit:'°C', ans:-40, hint:'Résous C = 1,8C + 32.', why:'C = 1,8C + 32 donne −0,8C = 32, donc C = −40. −40 °C = −40 °F.'},
   ],
   sol:'Avec deux points (0 ; 32) et (100 ; 212), la pente vaut 180/100 = 1,8 et l’ordonnée à l’origine 32 : F = 1,8C + 32. Les deux échelles coïncident à l’intersection avec la droite F = C : 1,8C + 32 = C donne C = −40. Graphiquement, c’est là où la droite de conversion croise la diagonale.'},
);

/* Leçons jouables : parcours de maths et cours complets */
MATHS.forEach(c=>{
  if(c.use){ LESSONS[c.use].domain=BRANCHES[c.br]; c.lid=c.use; return; }
  c.lid=c.id; LESSONS[c.id]={title:c.lessons[0], domain:BRANCHES[c.br], steps:c.steps};
});
const COURSE_OF={}; MATHS.forEach(c=>COURSE_OF[c.lid]=c);
const COURS_OF={};
COURS.forEach(ch=>{ const sj=MATIERES.find(s=>s.id===ch.subj); LESSONS[ch.id]={title:ch.h, domain:sj.h, steps:ch.steps}; COURS_OF[ch.id]={sj, sem:sj.sems[ch.sem], ch}; });
const chapitres=sj=>Object.keys(sj.sems).flatMap(k=>COURS.filter(c=>c.subj===sj.id&&c.sem===k));
const nbProblems=steps=>steps.filter(s=>s.parts).length;

const CATALOG = [
  {name:'Découvertes', c:'var(--other)', sub:'Des leçons courtes sur des sujets qu’on apprend rarement ailleurs', items:[
    {id:'boucles', h:'Premiers pas en code', p:'Instructions, boucles, puis Python pour de vrai.', ill:'robot'},
    {id:'intervalles', h:'Solfège interactif', p:'Lire, entendre et construire les intervalles.', ill:'keys', new:true},
    {h:'Finances perso', p:'Intérêts composés, 3e pilier, inflation.', ill:'curve', new:true},
    {h:'Navigation', p:'Vent apparent, caps et marées.', ill:'sail', new:true},
    {h:'Logique', p:'Énigmes, syllogismes et biais cognitifs.', ill:'logic', new:true},
    {h:'Astronomie', p:'Phases de la Lune, saisons et orbites.', ill:'moon'},
  ]},
];

const ILL={
  robot:c=>`<svg viewBox="0 0 200 92"><g fill="none" stroke="${c}" opacity=".3">${[0,1,2,3,4].map(i=>`<rect x="${40+i*24}" y="34" width="22" height="22" rx="4"/>`).join('')}</g><path d="M51 45 H135" stroke="${c}" stroke-width="5" opacity=".5" stroke-linecap="round"/><rect x="128" y="34" width="22" height="22" rx="6" fill="${c}"/></svg>`,
  keys:c=>`<svg viewBox="0 0 200 92">${[0,1,2,3,4,5,6].map(i=>`<rect x="${44+i*16}" y="14" width="15" height="66" rx="3" fill="${i===2?'var(--spark)':'var(--surface)'}" stroke="${c}"/>`).join('')}${[0,1,3,4,5].map(i=>`<rect x="${54+i*16}" y="14" width="10" height="40" rx="2" fill="${c}"/>`).join('')}</svg>`,
  curve:c=>`<svg viewBox="0 0 200 92"><path d="M30 80 C90 78 130 60 170 12" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round"/><path d="M30 80 L170 52" stroke="${c}" stroke-width="2" stroke-dasharray="4 4" opacity=".5"/></svg>`,
  sail:c=>`<svg viewBox="0 0 200 92"><path d="M100 10 V68 H66Z" fill="${c}"/><path d="M104 18 V68 H128Z" fill="${c}" opacity=".5"/><path d="M60 72 H140 L128 84 H72Z" fill="${c}"/></svg>`,
  logic:c=>`<svg viewBox="0 0 200 92"><circle cx="86" cy="46" r="28" fill="${c}" opacity=".35"/><circle cx="114" cy="46" r="28" fill="${c}" opacity=".35"/></svg>`,
  moon:c=>`<svg viewBox="0 0 200 92">${[0,1,2,3,4].map(i=>`<circle cx="${40+i*30}" cy="46" r="11" fill="none" stroke="${c}" stroke-width="2"/><path d="M${40+i*30} 35 a11 11 0 0 ${i<2?1:0} 0 22 a${Math.abs(11-i*5.5)} 11 0 0 ${i<2?0:1} 0 -22" fill="${c}"/>`).join('')}</svg>`,
};

/* ---------- accueil et pages de cours ---------- */
let VIEW='home', LV=(()=>{ try{ return localStorage.getItem('declic-lv')||'ecole' }catch(e){ return 'ecole' } })();
function stepsThumb(steps){ const st=(steps||[]).find(s=>s.draw); if(!st) return ''; const v={}; st.params.forEach(p=>v[p.id]=p.v); try{ return st.draw(v); }catch(e){ return ''; } }
function thumb(c){ return c.use ? graph(1,0,{tri:true}) : stepsThumb(c.steps); }
function render(){ if(VIEW==='home') renderHome(); else if(VIEW.startsWith('m:')) renderSubject(VIEW.slice(2)); else renderCourse(VIEW); window.scrollTo(0,0); }
function go(v){ VIEW=v; render(); }
/* Libellé de l'état d'une leçon : à faire, en cours (étape k), terminée */
function lessonState(id){ const n=LESSONS[id].steps.length, p=S.pos[id];
  if(p>0) return {cls:'play', label:'Reprendre', s:`En cours · étape ${p+1} sur ${n}`};
  if(S.done[id]) return {cls:'fin', label:'Revoir', s:'Terminé'};
  return {cls:'play', label:'Commencer', s:null}; }

function renderCours(h){
  const live=MATIERES.filter(sj=>COURS.some(c=>c.subj===sj.id)); if(!live.length) return;
  const nprob=COURS.reduce((n,c)=>n+nbProblems(c.steps),0);
  const sec=$(`<section class="wrap domain" id="cours">
    <div class="math-head"><div><h2>Cours complets</h2><p>${COURS.length} chapitres en ${live.length} matières, de la première définition aux problèmes difficiles${nprob?` (${nprob} problèmes rédigés)`:''}. Tu avances à ton rythme, chapitre après chapitre.</p></div></div>
    <div class="subjects"></div></section>`);
  live.forEach(sj=>{
    const chs=chapitres(sj), fin=chs.filter(c=>S.done[c.id]).length;
    const card=$(`<button class="course" style="--c:${sj.c}"><div class="ill plot">${stepsThumb(chs[0].steps)}</div><h3>${sj.h}</h3>
      <p>${Object.values(sj.sems).filter((_,i)=>COURS.some(c=>c.subj===sj.id&&c.sem===Object.keys(sj.sems)[i])).map(s=>s.h).join(' · ')}</p>
      <div class="bar"><span style="width:${fin/chs.length*100}%"></span></div>
      <div class="meta"><span>${fin} / ${chs.length} chapitres</span></div></button>`);
    card.onclick=()=>go('m:'+sj.id); sec.querySelector('.subjects').append(card);
  });
  h.append(sec);
}

function renderSubject(id){
  const sj=MATIERES.find(s=>s.id===id), h=document.getElementById('home'); h.innerHTML='';
  const chs=chapitres(sj), fin=chs.filter(c=>S.done[c.id]).length;
  const page=$(`<section class="wrap cpage"><div>
      <button class="crumb" id="back">← Cours complets</button>
      <h1>${sj.h}</h1><p class="lead">${chs.length} chapitres · ${fin} terminé${fin>1?'s':''}</p>
      <div class="bar" style="margin-top:12px"><span style="width:${fin/chs.length*100}%"></span></div>
      <div id="sems"></div>
    </div><div class="ill">${stepsThumb(chs[0].steps)}</div></section>`);
  let n=0;
  Object.entries(sj.sems).forEach(([k,sem])=>{
    const list=COURS.filter(c=>c.subj===id&&c.sem===k); if(!list.length) return;
    const box=$(`<div class="sem"><h2>${sem.h}</h2><p class="sub">${sem.s}</p><ol class="lessons"></ol></div>`);
    list.forEach(c=>{ n++; const st=lessonState(c.id), np=nbProblems(c.steps);
      const li=$(`<li class="${st.cls}"><span class="n">${st.cls==='fin'?'✓':n}</span><div><b>${c.h}</b><div class="s">${st.s?st.s+' · ':''}${c.steps.length-np} étapes${np?` + ${np} problèmes`:''} · ${c.p}</div></div><button class="btn">${st.label}</button></li>`);
      li.querySelector('button').onclick=()=>openLesson(c.id);
      const nm=methodSteps(c.steps).length; if(nm){ const f=$(`<button class="linkish fm-link" type="button">Fiche méthodes (${nm})</button>`); f.onclick=()=>openMethods(c.id); li.querySelector('div').append(f); }
      box.querySelector('ol').append(li); });
    page.querySelector('#sems').append(box);
  });
  page.querySelector('#back').onclick=()=>{ go('home'); requestAnimationFrame(()=>document.getElementById('cours')?.scrollIntoView()); };
  h.append(page);
}

function renderMath(h){
  const sec=$(`<section class="wrap domain" id="maths">
    <div class="math-head"><div><h2>Mathématiques par niveau</h2><p>${MATHS.length} cours, de l’école obligatoire à l’université. Algèbre, analyse et géométrie.</p></div>
    <div class="levels" role="tablist" aria-label="Niveau">${Object.entries(LEVELS).map(([k,l])=>`<button role="tab" id="lv-${k}" aria-selected="${k===LV}" data-lv="${k}">${l.h}<small>${l.s}</small></button>`).join('')}</div></div>
    <div class="branches"></div></section>`);
  sec.querySelectorAll('.levels button').forEach(b=>b.onclick=()=>{ LV=b.dataset.lv; try{ localStorage.setItem('declic-lv',LV) }catch(e){} renderHome(); document.getElementById('lv-'+LV).focus(); });
  const br=sec.querySelector('.branches');
  Object.entries(BRANCHES).forEach(([k,name])=>{
    const col=$(`<div class="branch"><h3>${name}</h3></div>`);
    MATHS.filter(c=>c.br===k&&c.lv===LV).forEach(c=>{
      const st=lessonState(c.lid);
      const card=$(`<button class="course" style="--c:var(--math)"><div class="ill plot">${thumb(c)}</div><h3>${c.h}</h3><p>${c.p}</p>
        <div class="meta">${st.cls==='fin'?'<span style="color:var(--ok)">✓ 1re leçon terminée</span>':st.s?`<span>${st.s}</span>`:`<span>${c.lessons.length} leçons</span>`}<span class="tag">${LEVELS[c.lv].h}</span></div></button>`);
      card.onclick=()=>go(c.id); col.append(card);
    });
    br.append(col);
  });
  h.append(sec);
}

function renderCourse(id){
  const c=MATHS.find(m=>m.id===id), h=document.getElementById('home'); h.innerHTML='';
  const st=lessonState(c.lid), steps=LESSONS[c.lid].steps, np=nbProblems(steps);
  const page=$(`<section class="wrap cpage"><div>
      <button class="crumb" id="back">← Mathématiques</button>
      <div class="kicker" style="margin-top:18px">${BRANCHES[c.br]} · ${LEVELS[c.lv].h}</div>
      <h1>${c.h}</h1><p class="lead">${c.p}</p>
      <ol class="lessons">${c.lessons.map((t,i)=>i===0
        ? `<li class="${st.cls}"><span class="n">${st.cls==='fin'?'✓':1}</span><div><b>${t}</b><div class="s">${st.s?st.s+' · ':''}${steps.length-np} étapes${np?` + ${np} problèmes`:''}</div></div><button class="btn" id="start">${st.label}</button></li>`
        : `<li><span class="n">${i+1}</span><div><b>${t}</b><div class="s">Bientôt</div></div></li>`).join('')}</ol>
    </div><div class="ill">${thumb(c)}</div></section>`);
  page.querySelector('#back').onclick=()=>{ go('home'); requestAnimationFrame(()=>document.getElementById('maths')?.scrollIntoView()); };
  page.querySelector('#start').onclick=()=>openLesson(c.lid);
  const nm=methodSteps(steps).length; if(nm){ const f=$(`<button class="linkish fm-link" type="button">Fiche méthodes (${nm})</button>`); f.onclick=()=>openMethods(c.lid); page.querySelector('.lessons li div').append(f); }
  h.append(page);
}

/* Sur iPad et iPhone : proposer d'installer Déclic comme une app (plein écran, icône, hors connexion) */
function installTip(h){
  const ios=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  const installed=navigator.standalone||matchMedia('(display-mode: standalone)').matches;
  let seen=false; try{ seen=!!localStorage.getItem('declic-tip-install'); }catch(e){}
  if(!ios||installed||seen) return;
  const share='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px"><path d="M12 3v12M8 7l4-4 4 4"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></svg>';
  const t=$(`<div class="wrap"><div class="install-tip"><p><b>Installe Déclic comme une app.</b> Dans Safari, touche ${share} Partager puis « Sur l’écran d’accueil ». Tu l’ouvres ensuite en plein écran, avec ton Apple Pencil pour l’ardoise et les annotations, même sans connexion.</p><button aria-label="Masquer ce conseil">×</button></div></div>`);
  t.querySelector('button').onclick=()=>{ try{ localStorage.setItem('declic-tip-install','1'); }catch(e){} t.remove(); };
  h.append(t);
}
function renderHome(){
  const order=[...COURS.map(c=>c.id),...[...MATHS.filter(c=>c.lv===LV),...MATHS.filter(c=>c.lv!==LV)].map(c=>c.lid),'boucles','intervalles'];
  const total=Object.keys(LESSONS).length, done=Object.keys(S.done).filter(k=>LESSONS[k]).length;
  const inProgress=Object.keys(S.pos).filter(k=>LESSONS[k]&&S.pos[k]>0);
  const next=(S.last&&S.pos[S.last]>0&&LESSONS[S.last])?S.last:(inProgress[0]||order.find(k=>!S.done[k])||order[0]);
  const nst=lessonState(next);
  const h=document.getElementById('home'); h.innerHTML='';
  const hero=$(`<section class="wrap hero">
    <div><h1>Comprendre<br>en <em>faisant</em>.</h1>
    <p>Un peu de théorie, une figure que tu manipules, un exercice qui te répond tout de suite. Puis de vrais problèmes, et une ardoise pour les résoudre sans papier.</p></div>
    <div class="resume"><small>${nst.s&&nst.cls==='play'?'Reprendre':'Continuer'}</small><h3>${LESSONS[next].title}</h3>
      ${nst.s&&nst.cls==='play'?`<span style="color:var(--muted);font-size:14px">${LESSONS[next].domain} · ${nst.s}</span>`:''}
      <div class="bar"><span style="width:${done/total*100}%"></span></div>
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap"><span style="color:var(--muted);font-size:15px">${done} / ${total} leçons terminées</span><button class="btn" id="go">${nst.label}</button></div></div>
  </section>`);
  hero.querySelector('#go').onclick=()=>openLesson(next);
  h.append(hero);
  installTip(h);
  renderCours(h);
  renderMath(h);
  CATALOG.forEach(d=>{
    const sec=$(`<section class="wrap domain"><div class="domain-head"><h2>${d.name}</h2><span>${d.sub}</span></div><div class="grid"></div></section>`);
    d.items.forEach(it=>{
      const playable=!!it.id, fin=playable&&S.done[it.id];
      const card=$(`<button class="course ${playable?'':'soon'}" style="--c:${d.c}" ${playable?'':'aria-disabled="true"'}>
        <div class="ill">${ILL[it.ill](d.c)}</div><h3>${it.h}</h3><p>${it.p}</p>
        <div class="meta">${playable?(fin?'<span style="color:var(--ok)">✓ Terminé</span>':'<span>5 étapes · 5 min</span>'):'<span>Bientôt</span>'}${it.new?'<span class="tag new">Inédit</span>':''}</div></button>`);
      if(playable) card.onclick=()=>openLesson(it.id);
      sec.querySelector('.grid').append(card);
    });
    h.append(sec);
  });
  h.append($(`<footer class="wrap">Déclic · ${total} leçons. <span id="save-where">${window.Compte?.user?'Ta progression est enregistrée sur ton compte.':'Ta progression est enregistrée dans ce navigateur. Crée un compte pour la retrouver partout.'}</span></footer>`));
}

/* ---------- lecteur de leçon ---------- */
let L=null, idx=0, ctx=null, phase='idle';
const foot=document.getElementById('foot'), fb=document.getElementById('fb'), act=document.getElementById('action');
function openLesson(id){
  L=LESSONS[id]; L.id=id; const p=S.pos[id];
  idx=(p>0&&p<L.steps.length)?p:0;
  document.getElementById('player').hidden=false; document.body.style.overflow='hidden'; document.body.classList.add('in-lesson');
  showStep(); window.Ardoise?.onLesson(id);
}
function closeLesson(){ window.Ink?.onLessonClosed(); document.getElementById('player').hidden=true; document.body.style.overflow=''; document.body.classList.remove('in-lesson'); window.Ardoise?.onLesson(null); render(); }

/* Étape décrite par des données (format : docs/BRIEF.md) */
function parseNum(s){ s=s.replace(/[\s']/g,'').replace(/,/g,'.').replace(/−/g,'-'); if(!s) return NaN; if(s.includes('/')){ const [a,b]=s.split('/').map(Number); return a/b; } return Number(s); }
/* Champ de réponse numérique ; marqué « cible » pour que l'ardoise puisse y envoyer un résultat */
function numInput(q,ctx,uid){
  const id='n-'+uid, w=$(`<div class="numin"><label for="${id}">${q.lab||'Ta réponse'}</label><div><input id="${id}" class="cible" type="text" inputmode="decimal" autocomplete="off" placeholder="?"><span>${q.unit||''}</span></div></div>`);
  const inp=w.querySelector('input');
  inp.oninput=()=>{ inp.classList.remove('right','wrong'); const v=parseNum(inp.value); ctx.answer=isNaN(v)?null:v; ctx.ready(!isNaN(v)); };
  inp.onkeydown=e=>{ if(e.key==='Enter'&&!act.disabled) act.click(); };
  ctx.mark=ok=>inp.classList.add(ok?'right':'wrong');
  return w;
}
function isRight(q,a){ return q.opts ? a===q.ans : (a!==null && Math.abs(a-q.ans)<=(q.tol??1e-9)); }

function buildStep(st,c,ctx){
  if(st.h) c.append($(`<h2>${st.h}</h2>`));
  if(st.p) c.append($(`<div class="ptext">${st.p}</div>`));
  if(st.fig) c.append($(`<div class="fig">${st.fig}</div>`));
  if(st.params){
    const vals={}; st.params.forEach(p=>vals[p.id]=p.v);
    const fig=$(`<div class="fig"><div class="draw"></div><div class="cap info"></div><div class="sliders"></div></div>`);
    const upd=()=>{ fig.querySelector('.draw').innerHTML=st.draw(vals); const inf=fig.querySelector('.info'); inf.hidden=!st.info; if(st.info) inf.innerHTML=st.info(vals); };
    st.params.forEach(p=>{
      const sid=`s-${ctx.uid}-${p.id}`, s=$(`<div class="slider"><label for="${sid}">${p.l} <output>${fmt(p.v)}${p.u||''}</output></label><input id="${sid}" type="range" min="${p.min}" max="${p.max}" step="${p.step||1}" value="${p.v}"></div>`);
      const inp=s.querySelector('input');
      inp.oninput=()=>{ const st0=p.step||1; vals[p.id]=+(p.min+Math.round((+inp.value-p.min)/st0)*st0).toFixed(6); s.querySelector('output').textContent=fmt(vals[p.id])+(p.u||''); upd(); if(phase==='ask'&&!st.parts) setFoot('','','','Vérifier'); };
      fig.querySelector('.sliders').append(s);
    });
    upd(); c.append(fig);
    if(st.ok){ ctx.answer=vals; ctx.check=()=>({ok:st.ok(vals),why:st.why}); }
  }
  if(st.parts) buildProblem(st,c,ctx);
  else if(st.opts){ c.append(choices(st.opts,ctx,st.opts.every(o=>o.replace(/<[^>]+>/g,'').length<14))); ctx.check=()=>({ok:ctx.answer===st.ans,why:st.why}); }
  else if('ans' in st){ const w=numInput(st,ctx,ctx.uid); c.append(w); ctx.check=()=>({ok:isRight(st,ctx.answer),why:st.why}); setTimeout(()=>w.querySelector('input').focus({preventScroll:true}),50); }
  if(st.demo) c.append(demoBox(st.demo,false));
  if(st.note) c.append($(`<div class="note">${st.note}</div>`));
}
/* Exemple résolu : l'énoncé, puis les étapes une à une (« Étape suivante »), puis la conclusion */
function demoBox(d,all){
  const box=$(`<div class="demo"><div class="demo-h">Exemple résolu</div><div class="demo-q">${d.enonce}</div><ol class="demo-steps"></ol><div class="demo-c" hidden>${d.conclusion||''}</div><div class="demo-btns"></div></div>`);
  const ol=box.querySelector('ol'), btns=box.querySelector('.demo-btns'); let k=0;
  const step=e=>{ const li=document.createElement('li'); if(typeof e==='string') li.innerHTML=e; else li.innerHTML=`${e.f}${e.w?`<div class="demo-w">${e.w}</div>`:''}`; ol.append(li); };
  const next=()=>{ if(k<d.etapes.length) step(d.etapes[k++]); if(k>=d.etapes.length){ box.querySelector('.demo-c').hidden=!d.conclusion; btns.remove(); } };
  if(all){ while(k<d.etapes.length) next(); next(); return box; }
  const b1=$(`<button class="btn ghost" type="button">Étape suivante</button>`), b2=$(`<button class="linkish" type="button">Tout afficher</button>`);
  b1.onclick=()=>next(); b2.onclick=()=>{ while(k<d.etapes.length) next(); };
  btns.append(b1,b2); return box;
}
/* Fiche méthodes d'un chapitre : toutes ses étapes « Méthode » et leurs exemples, d'un coup d'œil */
function methodSteps(steps){ return steps.filter(s=>s.demo||s.kind==='Méthode'); }
function openMethods(id){
  const L0=LESSONS[id], ms=methodSteps(L0.steps);
  document.getElementById('compte-modal')?.remove();
  const m=$(`<div class="modal" id="compte-modal" role="dialog" aria-modal="true" aria-labelledby="fm-t"><div class="modal-box fiche"><div class="row" style="justify-content:space-between"><h2 id="fm-t">Fiche méthodes</h2><button class="ard-ib" id="fm-x" aria-label="Fermer">×</button></div><p style="margin:0;color:var(--muted)">${L0.title}</p></div></div>`);
  const box=m.querySelector('.modal-box');
  ms.forEach(st=>{ const sec=$(`<section class="fm-sec"><h3>${st.h||''}</h3>${st.p?`<div class="ptext">${st.p}</div>`:''}</section>`); if(st.demo) sec.append(demoBox(st.demo,true)); if(st.note) sec.append($(`<div class="note">${st.note}</div>`)); box.append(sec); });
  const close=()=>m.remove(); m.querySelector('#fm-x').onclick=close; m.addEventListener('click',e=>{ if(e.target===m) close(); }); m.addEventListener('keydown',e=>{ if(e.key==='Escape') close(); });
  document.body.append(m); m.querySelector('#fm-x').focus();
}

/* Problème en plusieurs questions : une question active à la fois, indice, correction, puis solution rédigée */
function buildProblem(st,c,ctx){
  const box=$(`<ol class="parts"></ol>`); c.append(box);
  const items=st.parts.map((q,k)=>{
    const li=$(`<li class="part locked"><div class="q">${q.q}</div><div class="zone"></div><div class="hint" hidden><b>Indice.</b> ${q.hint}</div><div class="pwhy" hidden></div></li>`);
    box.append(li); return li; });
  const solBox=$(`<details class="sol" hidden><summary>Solution rédigée</summary><div>${st.sol}</div></details>`); c.append(solBox);
  ctx.part=-1;
  const activate=k=>{
    ctx.part=k; ctx.answer=null; ctx.tries=0; ctx.mark=null;
    const q=st.parts[k], li=items[k]; li.classList.remove('locked'); li.classList.add('active');
    const zone=li.querySelector('.zone');
    if(q.opts) zone.append(choices(q.opts,ctx,q.opts.every(o=>o.replace(/<[^>]+>/g,'').length<14)));
    else { const w=numInput(q,ctx,ctx.uid+'-'+k); zone.append(w); setTimeout(()=>w.querySelector('input').focus({preventScroll:true}),50); }
    const hb=$(`<button class="hint-btn" type="button">Indice</button>`); hb.onclick=()=>{ li.querySelector('.hint').hidden=false; hb.remove(); ctx.hinted=true; };
    zone.append(hb);
    if(k>0) li.scrollIntoView({block:'nearest',behavior:'smooth'});
  };
  ctx.check=()=>{ const q=st.parts[ctx.part], ok=isRight(q,ctx.answer); return {ok, why:q.why, more: ok&&ctx.part<st.parts.length-1}; };
  ctx.partDone=()=>{ const li=items[ctx.part], q=st.parts[ctx.part];
    li.classList.remove('active'); li.classList.add('done');
    li.querySelectorAll('button,input').forEach(e=>{ e.disabled=true; e.classList.remove('cible'); });
    li.querySelector('.hint-btn')?.remove(); const pw=li.querySelector('.pwhy'); pw.innerHTML=q.why; pw.hidden=false; };
  ctx.advance=()=>{ ctx.partDone(); activate(ctx.part+1); };
  ctx.finishProblem=()=>{ ctx.partDone(); solBox.hidden=false; solBox.open=true; };
  activate(0);
}

const kindOf=st=>st.kind||(st.demo?'Méthode':st.parts?'Problème':st.ok?'Pratique':(st.opts||'ans' in st)?'Question':'Théorie');
function segs(){ document.getElementById('segs').innerHTML=L.steps.map((s,i)=>`<span class="${i<idx?'done':i===idx?'cur':''}${s.parts?' prob':''}"></span>`).join(''); }
function setFoot(state,title,txt,label,enabled=true){
  foot.className='p-foot'+(state?' '+state:''); fb.innerHTML=title?`<strong>${title}</strong><span>${txt||''}</span>`:''; act.textContent=label; act.disabled=!enabled;
}
function showStep(){
  segs(); const card=document.getElementById('card'); card.innerHTML=''; card.style.animation='none'; card.offsetHeight; card.style.animation='';
  const st=L.steps[idx];
  const course=COURSE_OF[L.id], co=COURS_OF[L.id];
  card.append($(`<div class="kicker">${L.domain}${course?' · '+LEVELS[course.lv].h:''}${co?' · '+co.sem.h:''} · ${kindOf(st)}${st.parts?` ${L.steps.slice(0,idx+1).filter(s=>s.parts).length}`:''}</div>`));
  ctx={answer:null, tries:0, uid:L.id+idx, ready:(r)=>{ if(phase==='ask') act.disabled=!r; }};
  phase='build';
  if(st.render) st.render(card,ctx); else buildStep(st,card,ctx);
  window.Ink?.attachCard(card, L.id+':'+idx);
  document.querySelector('.p-body').scrollTop=0;
  S.last=L.id; if(idx>0) S.pos[L.id]=idx; save();
  if(ctx.check){ phase='ask'; setFoot('', '', '', 'Vérifier', ctx.answer!==null); }
  else { phase='next'; setFoot('', '', '', 'Continuer'); }
}
async function onAction(){
  if(phase==='ask'){
    act.disabled=true; phase='checking';
    const r=await ctx.check(); ctx.tries++;
    ctx.mark&&ctx.mark(r.ok);
    const prob=!!L.steps[idx].parts;
    if(r.ok){
      S.xp+=prob?(ctx.tries===1&&!ctx.hinted?15:8):(ctx.tries===1?10:5); bumpStreak(); save();
      const title=ctx.tries===1?'Bravo !':'C’est ça !';
      if(r.more){ phase='nextpart'; setFoot('ok', title, r.why, 'Question suivante'); }
      else { if(prob) ctx.finishProblem(); phase='next'; setFoot('ok', title, prob?'Problème résolu. La solution rédigée est ouverte ci-dessus.':r.why, 'Continuer'); }
    }
    else { phase='ask'; setFoot('bad','Pas tout à fait', ctx.tries>=2?r.why:(prob?'Essaie encore. L’indice peut t’aider, et l’ardoise sert à poser tes calculs.':'Essaie encore. Indice disponible au prochain essai.'), 'Vérifier', ctx.answer!==null); }
    return;
  }
  if(phase==='nextpart'){ ctx.advance(); phase='ask'; setFoot('','','','Vérifier',false); return; }
  if(phase==='next'){
    if(idx<L.steps.length-1){ idx++; showStep(); }
    else finish();
  } else if(phase==='end') closeLesson();
}
function finish(){
  idx=L.steps.length; segs();
  const first=!S.done[L.id]; S.done[L.id]=true; delete S.pos[L.id]; if(first) S.xp+=20; bumpStreak(); save();
  const card=document.getElementById('card');
  card.innerHTML=`<div class="done-wrap"><svg width="120" height="120" viewBox="0 0 120 120"><circle cx="60" cy="60" r="54" fill="var(--spark-soft)"/><path d="m60 22 10.6 23.4 25.4 2.4-19.2 16.8 5.6 25L60 76.8 37.6 89.6l5.6-25L24 47.8l25.4-2.4Z" fill="var(--spark)"/></svg>
    <h2>Leçon terminée</h2><div class="big-xp">${S.xp} XP</div><p style="color:var(--muted)">${first?'+20 XP de bonus pour ta première fois.':'Révision faite.'} Série en cours : ${liveStreak()} jour${liveStreak()>1?'s':''}.</p></div>`;
  phase='end'; setFoot('', '', '', (COURSE_OF[L.id]||COURS_OF[L.id])?'Retour au cours':'Retour au catalogue');
}
act.onclick=onAction;
document.getElementById('quit').onclick=closeLesson;
document.getElementById('home-btn').onclick=()=>{ document.getElementById('player').hidden=true; document.body.style.overflow=''; document.body.classList.remove('in-lesson'); window.Ardoise?.onLesson(null); go('home'); };
renderStats(); render();
