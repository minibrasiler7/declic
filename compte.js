/* Déclic — comptes et synchronisation de la progression (Supabase).
   Sans configuration, le site fonctionne en local (localStorage) et le bouton de compte l'explique.
   Mise en place : voir docs/COMPTES.md. La clé « anon » est publique par conception :
   la sécurité vient des règles RLS de la table progression. */
const DECLIC_CONFIG = {
  supabaseUrl: 'https://rvomqlelambizurddqyt.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2b21xbGVsYW1iaXp1cmRkcXl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI5Mzc3NzIsImV4cCI6MjEwODUxMzc3Mn0.hNVsmDUGfwJH_jLvTPUZ4PEDy5htmGDgDceLrelpV5E',
};

window.Compte = (()=>{
  const cfg=DECLIC_CONFIG, on=!!(cfg.supabaseUrl&&cfg.supabaseAnonKey);
  const btn=document.getElementById('account-btn');
  let sb=null, user=null, timer=null, status='';

  const loadLib=()=>new Promise((res,rej)=>{ if(window.supabase) return res();
    const s=document.createElement('script'); s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js';
    s.onload=res; s.onerror=()=>rej(new Error('Impossible de charger le service de comptes.')); document.head.append(s); });

  function paintButton(){
    if(user){ const n=(user.email||'?')[0].toUpperCase(); btn.innerHTML=`<span class="av">${n}</span><span class="t">Mon compte</span>`; btn.title=user.email; }
    else { btn.innerHTML='<span class="t">Se connecter</span>'; btn.title='Créer un compte ou se connecter'; }
    const w=document.getElementById('save-where'); if(w) w.textContent=user?'Ta progression est enregistrée sur ton compte.':'Ta progression est enregistrée dans ce navigateur. Crée un compte pour la retrouver partout.';
  }

  async function pull(){
    const {data,error}=await sb.from('progression').select('data').eq('user_id',user.id).maybeSingle();
    if(error) throw error;
    mergeState(data?.data); await pushNow(); if(typeof render==='function'&&document.getElementById('player').hidden) render();
  }
  async function pushNow(){
    if(!sb||!user) return; clearTimeout(timer);
    const {error}=await sb.from('progression').upsert({user_id:user.id, data:S, updated_at:new Date().toISOString()});
    status=error?'Erreur de synchronisation : '+error.message:'Synchronisé à '+new Date().toLocaleTimeString('fr-CH',{hour:'2-digit',minute:'2-digit'});
  }
  function push(){ if(!sb||!user) return; clearTimeout(timer); timer=setTimeout(pushNow,1500); }

  async function init(){
    if(!on){ paintButton(); return; }
    try{ await loadLib(); }catch(e){ paintButton(); return; }
    sb=window.supabase.createClient(cfg.supabaseUrl,cfg.supabaseAnonKey);
    const {data}=await sb.auth.getSession(); user=data.session?.user||null; paintButton();
    if(user) pull().catch(()=>{});
    sb.auth.onAuthStateChange((ev,session)=>{
      const was=user?.id; user=session?.user||null; paintButton();
      if(user&&user.id!==was) pull().catch(()=>{});
      if(ev==='PASSWORD_RECOVERY') openModal('reset');
    });
    addEventListener('beforeunload',()=>{ if(timer) pushNow(); });
  }

  /* Fenêtre de compte : connexion, inscription, mot de passe oublié, profil */
  function openModal(mode){
    document.getElementById('compte-modal')?.remove();
    const m=$(`<div class="modal" id="compte-modal" role="dialog" aria-modal="true" aria-labelledby="cm-t"><div class="modal-box"></div></div>`);
    const box=m.querySelector('.modal-box');
    const close=()=>m.remove();
    m.addEventListener('click',e=>{ if(e.target===m) close(); });
    m.addEventListener('keydown',e=>{ if(e.key==='Escape') close(); });
    const msg=(t,ok)=>{ const el=box.querySelector('.msg'); el.hidden=!t; el.className='msg '+(ok?'ok':'err'); el.textContent=t||''; };

    if(!on){
      box.innerHTML=`<h2 id="cm-t">Comptes bientôt disponibles</h2><p>Pour l’instant, ta progression est enregistrée dans ce navigateur : tu la retrouves en revenant ici sur le même appareil.</p><div class="row"><button class="btn" id="cm-ok">Compris</button></div>`;
      box.querySelector('#cm-ok').onclick=close;
    } else if(user && mode!=='reset'){
      const done=Object.keys(S.done).length;
      box.innerHTML=`<h2 id="cm-t">Mon compte</h2><p><b>${esc(user.email)}</b></p>
        <p>${done} leçon${done>1?'s':''} terminée${done>1?'s':''} · ${S.xp} XP · série de ${liveStreak()} jour${liveStreak()>1?'s':''}</p>
        <p style="color:var(--muted);font-size:14px">${status||'Ta progression se synchronise automatiquement sur tous tes appareils.'}</p>
        <div class="msg" hidden></div>
        <div class="row"><button class="btn" id="cm-close">Fermer</button><button class="btn ghost" id="cm-out">Se déconnecter</button></div>`;
      box.querySelector('#cm-close').onclick=close;
      box.querySelector('#cm-out').onclick=async()=>{ await pushNow(); await sb.auth.signOut(); user=null; paintButton(); close(); };
    } else if(mode==='reset'){
      box.innerHTML=`<h2 id="cm-t">Nouveau mot de passe</h2><form class="modal-box" style="padding:0;box-shadow:none" novalidate>
        <label>Nouveau mot de passe<input type="password" id="cm-np" autocomplete="new-password" minlength="8" required></label>
        <div class="msg" hidden></div><div class="row"><button class="btn" type="submit">Enregistrer</button></div></form>`;
      box.querySelector('form').onsubmit=async e=>{ e.preventDefault(); const p=box.querySelector('#cm-np').value;
        if(p.length<8) return msg('Le mot de passe doit faire au moins 8 caractères.');
        const {error}=await sb.auth.updateUser({password:p}); if(error) return msg(error.message); msg('Mot de passe changé.',true); setTimeout(close,1200); };
    } else {
      const signup=mode==='signup';
      box.innerHTML=`<h2 id="cm-t">${signup?'Créer un compte':'Se connecter'}</h2>
        <p style="margin:0;color:var(--muted);font-size:15px">${signup?'Gratuit. Ton compte garde ta progression, tes séries et tes ardoises, sur tous tes appareils.':'Retrouve ta progression où que tu sois.'}</p>
        <form style="display:grid;gap:12px" novalidate>
          <label>Adresse e-mail<input type="email" id="cm-mail" autocomplete="email" required></label>
          <label>Mot de passe<input type="password" id="cm-pass" autocomplete="${signup?'new-password':'current-password'}" minlength="8" required></label>
          <div class="msg" hidden></div>
          <div class="row"><button class="btn" type="submit">${signup?'Créer mon compte':'Se connecter'}</button>
          ${signup?'':'<button class="linkish" type="button" id="cm-forgot">Mot de passe oublié ?</button>'}</div>
        </form>
        <p style="margin:0;font-size:14px">${signup?'Déjà un compte ?':'Pas encore de compte ?'} <button class="linkish" id="cm-switch">${signup?'Se connecter':'Créer un compte'}</button></p>
        <p style="margin:0;font-size:13px;color:var(--muted)">La progression déjà faite sur cet appareil est ajoutée à ton compte.</p>`;
      box.querySelector('#cm-switch').onclick=()=>openModal(signup?'login':'signup');
      box.querySelector('#cm-forgot')?.addEventListener('click',async()=>{
        const email=box.querySelector('#cm-mail').value.trim(); if(!email) return msg('Écris d’abord ton adresse e-mail.');
        const {error}=await sb.auth.resetPasswordForEmail(email,{redirectTo:location.origin+location.pathname});
        msg(error?error.message:'Si un compte existe pour cette adresse, un e-mail de réinitialisation vient de partir.',!error); });
      box.querySelector('form').onsubmit=async e=>{ e.preventDefault();
        const email=box.querySelector('#cm-mail').value.trim(), password=box.querySelector('#cm-pass').value;
        if(!/^\S+@\S+\.\S+$/.test(email)) return msg('Cette adresse e-mail ne semble pas valide.');
        if(password.length<8) return msg('Le mot de passe doit faire au moins 8 caractères.');
        const b=box.querySelector('button[type=submit]'); b.disabled=true;
        const r=signup ? await sb.auth.signUp({email,password,options:{emailRedirectTo:location.origin+location.pathname}})
                       : await sb.auth.signInWithPassword({email,password});
        b.disabled=false;
        if(r.error) return msg(r.error.message==='Invalid login credentials'?'Adresse ou mot de passe incorrect.':r.error.message);
        if(signup&&!r.data.session) return msg('Compte créé. Ouvre l’e-mail de confirmation pour l’activer, puis connecte-toi.',true);
        close(); };
    }
    document.body.append(m); (box.querySelector('input')||box.querySelector('button'))?.focus();
  }

  btn.onclick=()=>openModal(user?'profile':'login');
  init();
  return { push, get user(){ return user; }, open:openModal };
})();
