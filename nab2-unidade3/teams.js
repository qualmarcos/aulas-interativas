/* ============ EQUIPES ============
   Usa os mesmos nomes da roleta e divide em duas equipes (salvas no navegador).
   Os nomes podem ser arrastados de uma equipe para a outra (ou tocados para trocar de lado). */
const Teams = (() => {
  const KEY = "nab2-equipes";
  let st, subs = [];
  try { st = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
  if (!st || !Array.isArray(st.a)) st = { a: [], b: [], na: "Equipe A", nb: "Equipe B", turn: 0, idx: [0, 0] };
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const emit = () => { save(); paintTopbar(); subs.forEach(f => f()); };
  const team = t => t ? st.b : st.a;
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  /* acompanha a lista da roleta: tira quem saiu da lista e coloca quem entrou na equipe menor */
  function sync() {
    const all = Roleta.allNames(), set = new Set(all);
    st.a = st.a.filter(n => set.has(n)); st.b = st.b.filter(n => set.has(n));
    const have = new Set([...st.a, ...st.b]);
    all.filter(n => !have.has(n)).forEach(n => (st.a.length <= st.b.length ? st.a : st.b).push(n));
  }
  function draw() { // nova divisão aleatória e equilibrada
    const all = shuffle(Roleta.allNames()); st.a = []; st.b = [];
    all.forEach((n, i) => (i % 2 ? st.b : st.a).push(n)); st.idx = [0, 0]; emit();
  }
  function move(name, to) {
    st.a = st.a.filter(n => n !== name); st.b = st.b.filter(n => n !== name); team(to).push(name); emit();
  }
  function rename(t, v) { v = v.trim() || (t ? "Equipe B" : "Equipe A"); t ? st.nb = v : st.na = v; emit(); }
  const name = t => t ? st.nb : st.na;
  /* vez: alterna a equipe a cada palavra e gira quem joga dentro da equipe */
  function player(t) { const m = team(t); return m.length ? m[st.idx[t] % m.length] : null; }
  function nextTurn() { st.idx[st.turn] = (st.idx[st.turn] + 1) % Math.max(1, team(st.turn).length); st.turn = st.turn ? 0 : 1; emit(); }
  function paintTopbar() {
    document.querySelectorAll(".score .tname").forEach(s => s.textContent = name(+s.dataset.t));
  }

  /* painel de uma equipe (usado nos jogos) */
  function panel(t, opts = {}) {
    const el = document.createElement("div"); el.className = "team-panel t" + t; el.dataset.t = t;
    function paint() {
      const on = opts.turn && st.turn === t, p = player(t);
      el.classList.toggle("turn", !!on);
      el.innerHTML = `<div class="tp-head"><span class="tp-name" contenteditable="true" spellcheck="false" title="Toque para mudar o nome">${esc(name(t))}</span>
        <span class="tp-score" title="${opts.label || "Pontos"}">${opts.score ? opts.score(t) : score[t]}</span></div>
        ${opts.turn ? `<div class="tp-turn">${on ? `🎯 Vez desta equipe${p ? `<br><b>Joga: ${esc(p)}</b>` : ""}` : "Aguardando a vez…"}</div>` : ""}
        <div class="tp-list">${team(t).map(n => `<button class="tp-member${on && n === p ? " now" : ""}" data-n="${esc(n)}" title="Arraste para a outra equipe (ou toque para trocar de lado)">${esc(n)}</button>`).join("") || '<span class="tp-empty">Arraste nomes para cá</span>'}</div>
        <div class="tp-count">${team(t).length} ${team(t).length === 1 ? "pessoa" : "pessoas"}</div>`;
      const nm = el.querySelector(".tp-name");
      nm.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); nm.blur(); } e.stopPropagation(); });
      nm.addEventListener("blur", () => rename(t, nm.textContent));
      el.querySelectorAll(".tp-member").forEach(b => b.addEventListener("pointerdown", e => dragName(e, b)));
    }
    paint(); subs.push(paint); el._paint = paint;
    return el;
  }
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

  /* arrastar um nome (funciona com mouse e toque) */
  function dragName(e, btn) {
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault(); const nm = btn.dataset.n, from = +btn.closest(".team-panel").dataset.t, x0 = e.clientX, y0 = e.clientY;
    let ghost = null, over = null;
    const target = ev => { const hit = document.elementFromPoint(ev.clientX, ev.clientY); return hit && hit.closest(".team-panel"); };
    const mv = ev => {
      if (!ghost && Math.abs(ev.clientX - x0) + Math.abs(ev.clientY - y0) < 6) return;
      if (!ghost) { ghost = btn.cloneNode(true); ghost.className = "tp-member tp-ghost"; document.body.appendChild(ghost); btn.classList.add("tp-dragging"); }
      ghost.style.left = ev.clientX + "px"; ghost.style.top = ev.clientY + "px";
      const p = target(ev); if (p !== over) { over && over.classList.remove("drop"); over = p; over && over.classList.add("drop"); }
    };
    const up = ev => {
      window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", up); window.removeEventListener("pointercancel", up);
      over && over.classList.remove("drop");
      if (!ghost) { move(nm, from ? 0 : 1); try { Sound.pop(); } catch (_) {} return; } // toque: troca de lado
      ghost.remove(); btn.classList.remove("tp-dragging");
      const p = target(ev); if (p && +p.dataset.t !== from) { move(nm, +p.dataset.t); try { Sound.pop(); } catch (_) {} } else subs.forEach(f => f());
    };
    window.addEventListener("pointermove", mv); window.addEventListener("pointerup", up); window.addEventListener("pointercancel", up);
  }
  /* barra de ferramentas das equipes */
  function tools() {
    const r = document.createElement("div"); r.className = "row team-tools";
    const b1 = document.createElement("button"); b1.className = "btn ghost"; b1.textContent = "🔀 Sortear equipes"; b1.onclick = () => { draw(); try { Sound.whoosh(); } catch (_) {} };
    const b2 = document.createElement("button"); b2.className = "btn ghost"; b2.textContent = "🎡 Editar nomes na roleta"; b2.onclick = () => Roleta.open();
    r.append(b1, b2); return r;
  }
  function init() {
    const fresh = !st.a.length && !st.b.length;
    if (fresh) draw(); else { sync(); emit(); }
    window.addEventListener("roleta-nomes", () => { sync(); emit(); });
  }
  return { init, panel, tools, nextTurn, player, name, onChange: f => subs.push(f), get turn() { return st.turn; }, refresh: emit };
})();
