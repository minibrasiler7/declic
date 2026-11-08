/* Déclic — outils pour apprendre une langue (format : docs/ANGLAIS.md).
   Audio par la synthèse vocale du navigateur, réponses écrites (txt), dictée, ordre des mots, oral (reconnaissance vocale),
   écriture guidée comparée à un modèle, et révision espacée du vocabulaire (mots des étapes « mots »).
   Les fonctions s'appuient sur $, act, S, save, today… d'app.js : elles ne sont appelées qu'une fois tout chargé. */
const Langue=(()=>{
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  let LANG='en-GB';

  /* ---------- voix ---------- */
  const SY=window.speechSynthesis;
  let voices=[];
  const loadV=()=>{ try{ voices=SY.getVoices(); }catch(e){ voices=[]; } };
  if(SY){ loadV(); SY.addEventListener?.('voiceschanged',loadV); }
  // Les voix « améliorées » ou « naturelles » d'abord, puis les voix humaines connues, la variante demandée (en-GB) avant les autres.
  // macOS et iOS livrent aussi des voix fantaisie (Bubbles, Zarvox, Grandpa…) au nom traduit : on ne garde que des noms connus.
  const GOOD=/premium|enhanced|natural|neural|online|google|siri|microsoft/i,
    KNOWN=/^(daniel|kate|serena|oliver|arthur|martha|stephanie|jamie|samantha|alex|allison|ava|tom|susan|zoe|evan|nathan|joelle|noelle|aaron|nicky|moira|karen|tessa|fiona|rishi|veena|lee|catherine|gordon|matilda)\b/i;
  function pickVoices(){
    const base=LANG.slice(0,2), tier=v=>GOOD.test(v.name)?0:KNOWN.test(v.name)?2:9;
    return voices.filter(v=>v.lang.replace('_','-').startsWith(base)&&tier(v)<9)
      .sort((a,b)=>tier(a)+(a.lang.replace('_','-')===LANG?0:1)-tier(b)-(b.lang.replace('_','-')===LANG?0:1));
  }
  const canSpeak=()=>!!SY;
  // lines : texte, ou [[qui, texte], …] pour un dialogue (deux voix si possible)
  function say(lines, rate=1){
    if(!SY) return Promise.resolve();
    SY.cancel(); if(!voices.length) loadV();
    const L=typeof lines==='string'?[[null,lines]]:lines, V=pickVoices(), who=[...new Set(L.map(l=>l[0]))];
    return new Promise(done=>{
      L.forEach(([w,t],i)=>{
        const u=new SpeechSynthesisUtterance(t.replace(/<[^>]+>/g,'')), k=Math.max(0,who.indexOf(w));
        u.lang=LANG; const v=V[k%Math.max(1,V.length)]; if(v) u.voice=v;
        u.rate=.95*rate; u.pitch=V.length>1?1:[1,.82,1.18][k%3];
        if(i===L.length-1){ u.onend=()=>done(); u.onerror=()=>done(); }
        SY.speak(u);
      });
    });
  }
  const scriptHtml=src=>typeof src==='string'?`<p lang="en">${src}</p>`:src.map(([w,t])=>`<p lang="en">${w?`<b>${w}:</b> `:''}${t}</p>`).join('');

  /* Lecteur : Écouter, Plus lentement, et le texte (caché jusqu'à la réponse si hide) */
  function audioBox(src,{hide=false}={}){
    const box=$(`<div class="audio"><div class="au-btns"><button class="btn au-play" type="button"><span aria-hidden="true">▶</span> Écouter</button><button class="btn ghost au-slow" type="button">Plus lentement</button></div><details class="au-tr"><summary>${hide?'Voir le texte':'Texte'}</summary><div>${scriptHtml(src)}</div></details></div>`);
    const tr=box.querySelector('details');
    if(!canSpeak()){ box.querySelector('.au-btns').replaceWith($(`<p class="au-off">L’audio n’est pas disponible dans ce navigateur : lis le texte.</p>`)); tr.open=true; hide=false; }
    if(hide) tr.hidden=true; else if(typeof src!=='string'||src.length<160) tr.open=true;
    box.querySelector('.au-play').onclick=()=>say(src,1);
    box.querySelector('.au-slow').onclick=()=>say(src,.7);
    box.reveal=()=>{ tr.hidden=false; };
    return box;
  }

  /* Liste de vocabulaire : chaque ligne se lit à voix haute */
  function motsBox(mots){
    const box=$(`<div class="mots"></div>`);
    mots.forEach(([en,fr,ex])=>{
      const r=$(`<button type="button" class="mot"><span class="m-en" lang="en">${en}</span><span class="m-fr">${fr}</span>${ex?`<span class="m-ex" lang="en">${ex}</span>`:''}</button>`);
      r.onclick=()=>say(ex?[[null,en.split(' / ')[0]],[null,ex]]:en.split(' / ')[0]);
      box.append(r);
    });
    return box;
  }

  /* ---------- réponses écrites ---------- */
  const CONTR=[[/\bcan't\b/g,'can not'],[/\bcannot\b/g,'can not'],[/\bwon't\b/g,'will not'],[/\bshan't\b/g,'shall not'],[/n't\b/g,' not'],[/'m\b/g,' am'],[/'re\b/g,' are'],[/'ve\b/g,' have'],[/'ll\b/g,' will']];
  function norm(s){
    s=String(s).replace(/<[^>]+>/g,'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[’‘`´]/g,"'");
    CONTR.forEach(([r,t])=>s=s.replace(r,t));
    return s.replace(/[^a-z0-9' ]+/g,' ').replace(/(^|\s)'|'(\s|$)/g,' ').replace(/\s+/g,' ').trim();
  }
  const isText=q=>!!(q&&(q.txt!==undefined||q.dictee!==undefined||q.ordre!==undefined));
  const answers=q=>q.dictee!==undefined?[q.dictee]:q.ordre!==undefined?[Array.isArray(q.ordre)?q.ordre.join(' '):q.ordre,...(q.alt||[])]:[].concat(q.txt);
  const shown=q=>q.show??answers(q)[0];
  const txtRight=(q,a)=>a!=null&&answers(q).some(x=>norm(x)===norm(a));
  function lev(a,b){ const d=Array.from({length:a.length+1},(_,i)=>[i]); for(let j=1;j<=b.length;j++) d[0][j]=j;
    for(let i=1;i<=a.length;i++) for(let j=1;j<=b.length;j++) d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1)); return d[a.length][b.length]; }
  const near=(q,a)=>a!=null&&!txtRight(q,a)&&answers(q).some(x=>{ const n=norm(x),m=norm(a); return n.length>=4&&lev(n,m)<=(n.length>14?2:1); });

  // Mots communs (plus longue sous-suite commune) : sert à la dictée et à l'oral
  function lcs(a,b){ const d=Array.from({length:a.length+1},()=>Array(b.length+1).fill(0));
    for(let i=a.length-1;i>=0;i--) for(let j=b.length-1;j>=0;j--) d[i][j]=a[i]===b[j]?d[i+1][j+1]+1:Math.max(d[i+1][j],d[i][j+1]);
    const ka=new Set(), kb=new Set(); let i=0,j=0; while(i<a.length&&j<b.length){ if(a[i]===b[j]){ ka.add(i); kb.add(j); i++; j++; } else if(d[i+1][j]>=d[i][j+1]) i++; else j++; }
    return {n:d[0][0],ka,kb}; }
  // Correction mot à mot : les mots du texte attendu, en vert s'ils sont dans la réponse, en rouge sinon
  function diff(target,ans){
    const t=norm(target).split(' '), a=norm(ans||'').split(' ').filter(Boolean), {ka,kb}=lcs(t,a);
    return {score:t.length?ka.size/t.length:0,
      html:`<span class="df">${t.map((w,i)=>`<span class="${ka.has(i)?'ok':'ko'}">${esc(w)}</span>`).join(' ')}</span>`,
      extra:a.filter((_,j)=>!kb.has(j))};
  }

  function why(q,a,ok){
    let s='';
    if(q.dictee!==undefined){ const d=diff(q.dictee,a); s=`<span class="lg-l">Texte :</span> <span lang="en">${esc(q.dictee)}</span>${ok?'':`<br><span class="lg-l">Ta dictée, mot à mot :</span> ${d.html}${d.extra.length?` · en trop : <s>${esc(d.extra.join(' '))}</s>`:''}`}`; }
    else if(!ok) s=`Réponse : <b lang="en">${shown(q)}</b>.`;
    return [s,q.why||''].filter(Boolean).join(' ');
  }

  function textInput(q,ctx,uid){
    const big=q.dictee!==undefined||q.long, id='t-'+uid;
    const w=$(`<div class="txtin"><label for="${id}">${q.lab||(q.dictee!==undefined?'Écris ce que tu entends':'Ta réponse')}</label>${big?`<textarea id="${id}" rows="3"`:`<input id="${id}" type="text"`} lang="${LANG}" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="…">${big?'</textarea>':''}</div>`);
    const inp=w.querySelector('input,textarea');
    inp.oninput=()=>{ inp.classList.remove('right','wrong'); const v=inp.value.trim(); ctx.answer=v||null; ctx.ready(!!v); };
    inp.onkeydown=e=>{ if(e.key==='Enter'&&!e.shiftKey&&!act.disabled){ e.preventDefault(); act.click(); } };
    ctx.mark=ok=>inp.classList.add(ok?'right':'wrong');
    setTimeout(()=>inp.focus({preventScroll:true}),50);
    return w;
  }

  /* Ordre des mots : on touche les étiquettes dans l'ordre ; on retouche une étiquette placée pour la retirer */
  function tiles(q,ctx){
    const words=Array.isArray(q.ordre)?q.ordre.slice():q.ordre.split(' '), target=words.join(' ');
    let mix; do{ mix=shuffle(words.map((t,i)=>({t,i}))); }while(words.length>2&&mix.map(m=>m.t).join(' ')===target);
    const w=$(`<div class="tiles"><div class="tl-ans" aria-label="Ta phrase"></div><div class="tl-bank"></div></div>`), A=w.querySelector('.tl-ans'), B=w.querySelector('.tl-bank');
    const upd=()=>{ const placed=[...A.children]; ctx.answer=placed.length===words.length?placed.map(b=>b.textContent).join(' '):null; ctx.ready(!!ctx.answer); };
    mix.forEach(m=>{ const b=$(`<button type="button" class="tile" lang="en">${esc(m.t)}</button>`);
      b.onclick=()=>{ if(b.disabled) return; (b.parentElement===B?A:B).append(b); w.classList.remove('right','wrong'); upd(); }; B.append(b); });
    ctx.mark=ok=>{ w.classList.add(ok?'right':'wrong'); };
    return w;
  }

  /* ---------- oral ---------- */
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  function listen({long=false}={}){
    return new Promise((ok,ko)=>{
      let r, done=false, got=[];
      try{ r=new SR(); }catch(e){ ko('indisponible'); return; }
      r.lang=LANG; r.interimResults=false; r.maxAlternatives=5; r.continuous=long;
      r.onresult=e=>{ for(let i=e.resultIndex;i<e.results.length;i++) if(e.results[i].isFinal) got.push([...e.results[i]].map(a=>a.transcript)); if(!long){ done=true; ok(got); } };
      r.onerror=e=>{ if(!done){ done=true; e.error==='no-speech'?ok([]):ko(e.error); } };
      r.onend=()=>{ if(!done){ done=true; ok(got); } };
      r.start(); listen.stop=()=>r.stop();
    });
  }
  const micErr=e=>e==='not-allowed'||e==='service-not-allowed'?'Le micro est refusé. Autorise-le pour ce site dans les réglages du navigateur.':'Le micro n’a pas fonctionné. Réessaie.';

  // Répéter une phrase : on écoute le modèle, on la dit, on voit les mots reconnus
  function direBox(d){
    const o=typeof d==='string'?{t:d}:d;
    const box=$(`<div class="dire"><div class="dire-t" lang="en"${o.cache?' hidden':''}>${o.t}</div></div>`);
    box.append(audioBox(o.t));
    box.querySelector('.au-tr')?.remove();
    if(!SR){ box.append($(`<p class="au-off">La reconnaissance vocale n’est pas disponible dans ce navigateur (elle marche dans Safari et Chrome). Écoute le modèle, répète-le à voix haute deux ou trois fois, puis continue.</p>`)); return box; }
    const mic=$(`<button class="btn mic" type="button"><span aria-hidden="true">●</span> Dire la phrase</button>`), res=$(`<div class="dire-r" aria-live="polite"></div>`);
    box.append(mic,res);
    mic.onclick=async()=>{
      mic.disabled=true; mic.innerHTML='J’écoute…'; res.innerHTML='';
      try{
        const alts=(await listen()).flat();
        if(!alts.length){ res.innerHTML='<p>Je n’ai rien entendu. Parle un peu plus fort, près du micro.</p>'; }
        else { const best=alts.map(a=>({a,...diff(o.t,a)})).sort((x,y)=>y.score-x.score)[0], p=Math.round(best.score*100);
          box.querySelector('.dire-t').hidden=false;
          res.innerHTML=`<p><b>${p>=90?'Très bien.':p>=70?'Presque.':'Pas encore.'}</b> ${p} % des mots reconnus.${p<90?' Les mots en rouge n’ont pas été compris : réécoute-les et recommence.':''}</p>${best.html}<p class="lg-l">J’ai entendu : <span lang="en">« ${esc(best.a)} »</span></p>`; }
      }catch(e){ res.innerHTML=`<p>${micErr(e)}</p>`; }
      mic.disabled=false; mic.innerHTML='<span aria-hidden="true">●</span> Recommencer';
    };
    return box;
  }

  // Liste de critères : chaîne = à cocher soi-même ; {t, re} = vérifié dans le texte (re, sans tenir compte de la casse)
  function criteres(list,text){
    const ul=$(`<ul class="crit"></ul>`);
    (list||[]).forEach(c=>{ const auto=typeof c==='object'&&c.re, okc=auto&&new RegExp(c.re,'i').test(text||'');
      ul.append(auto?$(`<li class="${okc?'ok':'ko'}"><span aria-hidden="true">${okc?'✓':'✗'}</span> ${c.t}</li>`)
                    :$(`<li><label><input type="checkbox"> ${typeof c==='string'?c:c.t}</label></li>`)); });
    return ul;
  }

  // Parler librement : réponse à une consigne, puis modèle et critères
  function oralBox(o){
    const box=$(`<div class="oral"></div>`), res=$(`<div class="dire-r" aria-live="polite"></div>`), fin=$(`<div class="modele" hidden><div class="lg-l">Un exemple de réponse</div><div lang="en">${o.modele}</div></div>`);
    fin.querySelector('div[lang]').after(audioBox(o.modele)); fin.querySelector('.au-tr')?.remove();
    let said='';
    const showModel=()=>{ if(!fin.hidden) return; fin.append(criteres(o.criteres,said)); fin.hidden=false; seeB.remove(); };
    const seeB=$(`<button class="linkish" type="button">Voir un exemple de réponse</button>`); seeB.onclick=showModel;
    if(SR){
      const mic=$(`<button class="btn mic" type="button"><span aria-hidden="true">●</span> Parler</button>`); let on=false;
      mic.onclick=async()=>{
        if(on){ listen.stop?.(); return; }
        on=true; mic.innerHTML='<span aria-hidden="true">■</span> J’ai fini'; res.innerHTML='<p>J’écoute… Parle tranquillement, puis touche « J’ai fini ».</p>';
        try{ said=(await listen({long:true})).map(a=>a[0]).join(' ').trim();
          res.innerHTML=said?`<p class="lg-l">J’ai entendu :</p><p lang="en">« ${esc(said)} »</p><p>Relis : les mots mal reconnus sont souvent ceux à mieux prononcer.</p>`:'<p>Je n’ai rien entendu. Réessaie, près du micro.</p>';
          if(said) showModel(); }
        catch(e){ res.innerHTML=`<p>${micErr(e)}</p>`; }
        on=false; mic.innerHTML='<span aria-hidden="true">●</span> Recommencer';
      };
      box.append(mic);
    } else box.append($(`<p class="au-off">Réponds à voix haute (la reconnaissance vocale n’est pas disponible dans ce navigateur), puis compare avec l’exemple.</p>`));
    box.append(res,seeB,fin);
    return box;
  }

  /* Écriture guidée : le texte est gardé (S.textes), puis comparé à un modèle et à des critères */
  function writeBox(e,key){
    const min=e.min||20, prev=S.textes?.[key]||'';
    const box=$(`<div class="ecrire"><textarea rows="7" lang="${LANG}" autocapitalize="sentences" spellcheck="false" placeholder="Écris ici en anglais…"></textarea><div class="ec-bar"><span class="ec-n"></span><button class="btn ghost" type="button">Comparer avec le modèle</button></div></div>`);
    const ta=box.querySelector('textarea'), n=box.querySelector('.ec-n'), b=box.querySelector('button');
    const fin=$(`<div class="modele" hidden><div class="lg-l">Un modèle possible</div><div lang="en">${e.modele}</div></div>`);
    let t0=0;
    const count=()=>{ const k=ta.value.trim().split(/\s+/).filter(Boolean).length; n.textContent=`${k} mot${k>1?'s':''} · au moins ${min}`; b.disabled=k<min&&fin.hidden; return k; };
    ta.value=prev; count();
    ta.oninput=()=>{ count(); clearTimeout(t0); t0=setTimeout(()=>{ S.textes=S.textes||{}; S.textes[key]=ta.value; save(); },600); };
    b.onclick=()=>{ fin.querySelector('.crit')?.remove(); fin.append(criteres(e.criteres,ta.value)); fin.hidden=false; b.textContent='Mettre à jour la vérification'; fin.scrollIntoView({block:'nearest',behavior:'smooth'}); };
    box.append(fin);
    return box;
  }

  /* ---------- vocabulaire à réviser (répétition espacée) ---------- */
  const GAP=[0,1,3,7,14,30,60];
  const addDays=(d,k)=>{ const x=new Date(d+'T12:00'); x.setDate(x.getDate()+k); return dayStr(x); };
  const vKey=en=>'v:'+norm(en.split(' / ')[0]);
  // Les mots des chapitres commencés ou terminés de la matière
  function deck(subj){
    const out=[], seen=new Set();
    COURS.filter(c=>c.subj===subj&&(S.done[c.id]||S.pos[c.id]>0)).forEach(c=>c.steps.forEach(st=>(st.mots||[]).forEach(m=>{ const k=vKey(m[0]); if(!seen.has(k)){ seen.add(k); out.push({k,en:m[0],fr:m[1],ex:m[2]}); } })));
    return out;
  }
  function dueCards(subj){ const t=today(), V=S.vocab||{}, all=deck(subj);
    const due=all.filter(c=>V[c.k]&&V[c.k].d<=t).sort((a,b)=>V[a.k].d<V[b.k].d?-1:1), fresh=all.filter(c=>!V[c.k]);
    return {due, fresh, n:due.length+Math.min(fresh.length,10)}; }
  const vNorm=s=>norm(s.replace(/\([^)]*\)/g,' ')).replace(/^(to|a|an|the) /,'');
  const vRight=(c,a)=>c.en.split(' / ').some(x=>vNorm(x)===vNorm(a||''));

  function review(subj,onClose){
    const {due,fresh}=dueCards(subj), q=[...due,...fresh.slice(0,10)].slice(0,20), n0=q.length;
    document.getElementById('compte-modal')?.remove();
    const m=$(`<div class="modal" id="compte-modal" role="dialog" aria-modal="true" aria-labelledby="vr-t"><div class="modal-box vrev"><div class="row" style="justify-content:space-between"><h2 id="vr-t">Révision du vocabulaire</h2><button class="ard-ib" id="vr-x" aria-label="Fermer">×</button></div><div class="vr-body"></div></div></div>`);
    const body=m.querySelector('.vr-body'), V=(S.vocab=S.vocab||{}); let i=0, good=0, again=new Set();
    const close=()=>{ m.remove(); onClose?.(); };
    m.querySelector('#vr-x').onclick=close; m.addEventListener('keydown',e=>{ if(e.key==='Escape') close(); });
    const end=()=>{ const nxt=Object.values(V).map(v=>v.d).filter(d=>d>today()).sort()[0];
      body.innerHTML=`<p class="vr-p">${n0?`Tu as retrouvé <b>${good}</b> mot${good>1?'s':''} sur ${n0} du premier coup.`:'Rien à réviser pour l’instant. Avance dans un chapitre pour ajouter ses mots.'}</p>${nxt?`<p class="vr-p">Prochaine révision : ${nxt===addDays(today(),1)?'demain':'le '+new Date(nxt+'T12:00').toLocaleDateString('fr-CH',{day:'numeric',month:'long'})}.</p>`:''}<button class="btn" type="button">Terminer</button>`;
      body.querySelector('button').onclick=close; };
    const card=()=>{
      if(i>=q.length) return end();
      const c=q[i], first=!again.has(c.k);
      body.innerHTML=`<div class="vr-n">${i+1} / ${q.length}${V[c.k]?'':' · nouveau'}</div><div class="vr-fr">${c.fr}</div><input class="vr-in" type="text" lang="${LANG}" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="En anglais…"><div class="vr-a" hidden></div><div class="row vr-btns"><button class="btn" type="button">Vérifier</button><button class="btn ghost" type="button">Je ne sais pas</button></div>`;
      const inp=body.querySelector('input'), [bOk,bNo]=body.querySelectorAll('.vr-btns button'), A=body.querySelector('.vr-a');
      const answer=give=>{
        const ok=!give&&vRight(c,inp.value);
        inp.disabled=true; inp.classList.add(ok?'right':'wrong');
        A.hidden=false; A.innerHTML=`<b lang="en">${c.en}</b>${c.ex?`<div class="m-ex" lang="en">${c.ex}</div>`:''}`;
        say(c.ex?[[null,c.en.split(' / ')[0]],[null,c.ex]]:c.en.split(' / ')[0]);
        if(first){ const v=V[c.k]||{b:0}; if(ok){ v.b=Math.min(v.b+1,GAP.length-1); good++; } else { v.b=0; again.add(c.k); q.push(c); } v.d=addDays(today(),ok?GAP[v.b]:1); V[c.k]=v; save(); }
        else if(!ok) { again.add(c.k); }
        bNo.remove(); bOk.textContent=i+1<q.length?'Suivant':'Voir le bilan'; bOk.onclick=()=>{ i++; card(); }; bOk.focus();
      };
      bOk.onclick=()=>answer(false); bNo.onclick=()=>answer(true);
      inp.onkeydown=e=>{ if(e.key==='Enter'&&!inp.disabled) answer(false); };
      inp.focus();
    };
    document.body.append(m); card();
  }

  return {setLang:l=>{ LANG=l||'en-GB'; }, say, audioBox, motsBox, isText, answers, shown, txtRight, near, why, textInput, tiles, direBox, oralBox, writeBox, dueCards, review, norm};
})();
