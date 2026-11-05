/* Déclic — racines lisibles.
   Le contenu écrit les racines en texte : √2, √x, √(x² + 1), √<i>x</i>, ∛8.
   Ce script trace la barre du haut au-dessus de ce qui est sous la racine, pour qu'on voie où elle s'arrête :
   √(…) perd ses parenthèses, désormais inutiles, et √<i>x</i> couvre l'élément qui suit.
   Il repasse sur tout ce qui s'affiche (MutationObserver). Les figures SVG et les champs de saisie ne sont pas touchés. */
(function(){
  const GLYPH=/[√∛∜]/, SKIP='svg,input,textarea,script,style,code,.katex';
  const NUM=/^−?\d+(?:[.,]\d+)?/, LETTER=/^[A-Za-zα-ωΑ-Ω][₀-₉]*/;

  // Cherche la parenthèse fermante qui correspond, à partir de (node, i), parmi les frères suivants
  function closing(node, i){
    let d=1;
    for(let n=node; n; n=n.nextSibling, i=0){
      if(n.nodeType===3){
        const t=n.data;
        for(let k=i; k<t.length; k++){ if(t[k]==='(') d++; else if(t[k]===')' && --d===0) return [n,k]; }
      } else if(n.nodeType===1){
        for(const c of n.textContent){ if(c==='(') d++; else if(c===')' && --d===0) return null; }   // fermée dans un élément : on renonce
      }
    }
    return null;
  }

  function wrap(tn, at){
    const doc=tn.ownerDocument, g=tn.data[at];
    let after=tn.splitText(at);                       // after commence par le glyphe
    const rest=after.splitText(1);                    // rest : ce qui suit le glyphe
    const rad=doc.createElement('span'); rad.className='rad';
    const sym=doc.createElement('span'); sym.className='rs'; sym.textContent=g;
    const body=doc.createElement('span'); body.className='rc';
    after.replaceWith(rad); rad.append(sym, body);
    const t=rest.data;
    if(t[0]==='('){
      const end=closing(rest, 1);
      if(end){
        const [en,ek]=end;
        const r=doc.createRange(); r.setStart(rest,1); r.setEnd(en,ek);
        body.append(r.extractContents());
        // retire « ( » et « ) »
        rest.data=rest.data.slice(1);
        if(en===rest){ rest.data=rest.data.replace(/^\)/,''); }
        else en.data=en.data.replace(/^\)/,'');
        return;
      }
    }
    let m=t.match(NUM)||t.match(LETTER);
    if(m){ body.textContent=m[0]; rest.data=t.slice(m[0].length); return; }
    if(t==='' && rest.nextSibling?.nodeType===1 && /^(I|VAR|B|EM|SUB)$/.test(rest.nextSibling.tagName)){
      body.append(rest.nextSibling); return;
    }
    // rien de reconnaissable : glyphe seul, sans barre
    rad.replaceWith(sym);
    sym.classList.add('bare');
  }

  function process(root){
    if(!root || root.nodeType!==1 && root.nodeType!==11) return;
    for(let guard=0; guard<2000; guard++){
      const w=document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {acceptNode(n){
        const p=n.parentElement;
        if(!p || !GLYPH.test(n.data) || p.closest(SKIP) || p.classList.contains('rs')) return NodeFilter.FILTER_SKIP;
        return NodeFilter.FILTER_ACCEPT;
      }});
      const n=w.nextNode(); if(!n) return;
      wrap(n, n.data.search(GLYPH));
    }
  }
  const processAll=process;   // une racine imbriquée √(1 − √x) est reprise au tour suivant, dans .rc

  let queued=new Set(), pending=false;
  const flush=()=>{ pending=false; const q=[...queued]; queued.clear(); obs.disconnect();
    for(const r of q) if(r.isConnected) processAll(r);
    obs.observe(document.body,{childList:true,subtree:true,characterData:true}); };
  const obs=new MutationObserver(ms=>{
    for(const m of ms){ const t=m.type==='characterData'?m.target.parentElement:m.target; if(t) queued.add(t); }
    if(!pending){ pending=true; queueMicrotask(flush); }
  });
  window.Racines={process:processAll};
  const start=()=>{ processAll(document.body); obs.observe(document.body,{childList:true,subtree:true,characterData:true}); };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start); else start();
})();
