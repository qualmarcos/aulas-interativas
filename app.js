/* ============ MOTOR DA AULA ============ */
const stage = document.getElementById("stage");
let cur = 0, score = [0, 0];
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const h = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const restart = (el, cls) => { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); };
const TIP = "💬 Leve a ideia para uma situação da sua vida e converse com um colega.";

function whoBtn() { const b = h("button", "btn gold who", "🎡 Quem responde?"); b.onclick = () => Roleta.open(); return b; }
function header(s, el, kind) {
  el.appendChild(h("div", "kicker", `<span>Intercultura · Português do Brasil</span><span>NAB2 · Unidade 3 · ${kind || "Prática"}</span>`));
  const t = h("div", "row"); t.appendChild(h("h1", null, s.title)); t.appendChild(whoBtn()); el.appendChild(t);
  if (s.lead) el.appendChild(h("p", "lead", s.lead));
}
function controls(el, { check, reset, extra }) {
  const r = h("div", "row"); r.style.marginTop = "16px";
  if (check) { const b = h("button", "btn", "Conferir"); b.onclick = () => suspense().then(check); r.appendChild(b); }
  if (extra) extra.forEach(x => r.appendChild(x));
  const rb = h("button", "btn ghost", "Recomeçar"); rb.onclick = () => { Sound.whoosh(); reset(); }; r.appendChild(rb);
  el.appendChild(r); el.appendChild(h("p", "tip", TIP));
}
function judge(ok) { ok ? Sound.success() : Sound.error(); }
function win() { Sound.fanfare(); confetti(); }

/* ---------- questões em sequência ---------- */
function stepper(s, el, renderQ) {
  const nav = h("div", "qnav"), box = h("div", "card"), state = s.items.map(() => ({})); let qi = 0, celebrated = false;
  s.items.forEach((_, i) => { const b = h("button", null, i + 1); b.onclick = () => { qi = i; Sound.tock(); draw(); }; nav.appendChild(b); });
  const counter = h("span", "tag"), top = h("div", "row"); top.appendChild(nav); const sp = h("span"); sp.style.flex = "1"; top.appendChild(sp); top.appendChild(counter);
  el.appendChild(top); el.appendChild(box);
  const nr = h("div", "row"), pb = h("button", "btn ghost", "‹ Anterior"), nb = h("button", "btn", "Próxima questão ›"), rb = h("button", "btn ghost", "Recomeçar");
  pb.onclick = () => { if (qi > 0) { qi--; Sound.whoosh(); draw(); } }; nb.onclick = () => { if (qi < s.items.length - 1) { qi++; Sound.whoosh(); draw(); } };
  rb.onclick = () => { state.forEach(o => { for (const k in o) delete o[k]; }); qi = 0; celebrated = false; draw(); };
  [pb, nb, rb].forEach(b => nr.appendChild(b)); el.appendChild(nr); el.appendChild(h("p", "tip", TIP));
  function draw() {
    counter.textContent = `Questão ${qi + 1} de ${s.items.length}`;
    [...nav.children].forEach((b, i) => { b.className = (i === qi ? "cur " : "") + (state[i].done ? "done" : ""); });
    box.innerHTML = ""; restart(box, "fbx"); box.style.animation = "pop .4s";
    renderQ(s.items[qi], box, state[qi], () => { state[qi].done = true; [...nav.children][qi].classList.add("done"); if (!celebrated && state.every(x => x.done)) { celebrated = true; setTimeout(win, 500); } });
    nb.disabled = qi === s.items.length - 1; pb.disabled = qi === 0;
  }
  draw();
}
/* múltipla escolha (com ou sem foto) */
function mcQ(q, box, st, done) {
  box.innerHTML = "";
  box.classList.toggle("qwide", !!q.img);
  if (q.img) box.appendChild(h("div", "qimg", `<img src="${q.img}" alt="">`));
  box.appendChild(h("div", "big-q", q.q));
  const o = h("div", "opts"), fb = h("div", "fb");
  q.o.forEach((t, i) => {
    const b = h("button", "opt", t);
    if (st.done && i === q.a) b.classList.add("ok");
    b.onclick = () => {
      if (st.done || st.busy) return; st.busy = true; b.classList.add("wait");
      suspense(1.3).then(() => {
        st.busy = false; b.classList.remove("wait"); const ok = i === q.a; judge(ok);
        b.classList.add(ok ? "ok" : "bad");
        fb.className = "fb " + (ok ? "ok" : "bad"); fb.innerHTML = ok ? "✅ Muito bem! " + q.c : "❌ Ainda não. Tente outra opção.";
        if (ok) { done(); st.done = true; } else setTimeout(() => b.classList.remove("bad"), 900);
      });
    };
    o.appendChild(b);
  });
  box.appendChild(o); if (st.done) { fb.className = "fb ok"; fb.innerHTML = "✅ " + q.c; } box.appendChild(fb);
  box.appendChild(h("div", "tans", "Resposta: " + q.o[q.a]));
}
function R_mc(s, el) {
  header(s, el);
  if (s.video) el.appendChild(h("div", "card", `🎬 <b>Vídeo em português · 2min17s</b><br><span style="font-size:16px;color:var(--muted)">Use uma conexão à internet. Assista e depois responda às questões.</span><div class="row" style="margin-top:8px"><a class="btn" target="_blank" rel="noopener" href="${s.video}" style="text-decoration:none">▶ Abrir vídeo</a></div>`));
  stepper(s, el, mcQ);
}
const R_photoquiz = R_mc;
function R_fill(s, el) {
  header(s, el);
  stepper(s, el, function draw(q, box, st, done) {
    box.innerHTML = ""; const [a, b] = q.t.split("___"), line = h("div", "gapline");
    line.append(a); const g = h("span", "gap", st.done ? q.o[q.a] : (st.pick != null ? q.o[st.pick] : "?")); if (st.done) g.classList.add("ok"); line.appendChild(g); line.append(b); box.appendChild(line);
    const ch = h("div", "chips"), fb = h("div", "fb");
    q.o.forEach((t, i) => {
      const c = h("button", "chip", t);
      c.onclick = () => {
        if (st.done || st.busy) return; st.busy = true; st.pick = i; g.textContent = t; g.className = "gap"; c.classList.add("sel");
        suspense(1.3).then(() => {
          st.busy = false; const ok = i === q.a; judge(ok); g.className = "gap " + (ok ? "ok" : "bad");
          fb.className = "fb " + (ok ? "ok" : "bad"); fb.innerHTML = ok ? "✅ " + q.c : "❌ Ainda não. Observe o contexto e tente de novo.";
          c.classList.remove("sel"); if (ok) { st.done = true; done(); }
        });
      };
      ch.appendChild(c);
    });
    box.appendChild(ch); if (st.done) { fb.className = "fb ok"; fb.innerHTML = "✅ " + q.c; } box.appendChild(fb);
    box.appendChild(h("div", "tans", "Resposta: " + q.o[q.a]));
  });
}
function R_reveal(s, el) {
  header(s, el);
  stepper(s, el, (q, box, st, done) => {
    box.classList.toggle("qwide", !!q.img);
    box.appendChild(q.img ? h("div", "qimg", `<img src="${q.img}" alt="">`) : h("div", "emoji", q.e));
    box.appendChild(h("div", "big-q", q.q));
    const b = h("button", "btn green", st.done ? "✔ Resposta revelada" : "Descobrir resposta"), a = h("div", "reveal-ans" + (st.done ? " on" : ""), "💡 " + q.a);
    b.onclick = () => { if (st.done) return; suspense(1.8).then(() => { st.done = true; Sound.success(); a.classList.add("on"); b.textContent = "✔ Resposta revelada"; done(); }); };
    box.appendChild(b); box.appendChild(a);
  });
}
/* ---------- memória (cartas que viram em 3D) ---------- */
function face(x, svg) { if (svg) return SH[x]; if (x.startsWith("img:")) return `<img src="${I(x.slice(4))}" alt="">`; return x; }
function R_memory(s, el) {
  header(s, el, "Jogo"); const info = h("p", null), grid = h("div", "mem"); el.appendChild(info); el.appendChild(grid);
  function start() {
    grid.innerHTML = ""; let found = 0, open = [], lock = false, moves = 0;
    const cards = shuffle(s.pairs.flatMap((p, i) => [{ id: i, f: face(p[0], s.svg), k: "a" }, { id: i, f: p[1], k: "b" }]));
    const upd = () => info.innerHTML = `<b>${found}</b> de ${s.pairs.length} pares · ${moves} jogadas`; upd();
    cards.forEach(c => {
      const b = h("button", "mcard", `<div class="in"><div class="f">?</div><div class="b">${c.f}</div></div>`);
      b.onclick = () => {
        if (lock || b.classList.contains("up") || b.classList.contains("found")) return;
        Sound.tock(); b.classList.add("up"); open.push([b, c]);

        if (open.length === 2) {
          moves++; const [[b1, c1], [b2, c2]] = open; open = [];
          if (c1.id === c2.id && c1.k !== c2.k) { setTimeout(() => { b1.classList.add("found"); b2.classList.add("found"); Sound.success(); found++; upd(); if (found === s.pairs.length) { info.innerHTML = `🎉 Todos os pares em ${moves} jogadas! Agora use duas palavras em uma frase.`; win(); } }, 450); }
          else { lock = true; setTimeout(() => { Sound.error(); b1.classList.remove("up"); b2.classList.remove("up"); lock = false; }, 1100); }
          upd();
        }
      };
      grid.appendChild(b);
    });
  }
  start(); controls(el, { reset: start });
  el.appendChild(h("div", "tans", s.pairs.map(p => s.svg ? p[1] : (p[0].replace("img:", "foto de ") + " = " + p[1])).join(" · ")));
}
/* ---------- galeria de fotos que viram ---------- */
function R_gallery(s, el) {
  header(s, el, "Vocabulário"); const g = h("div", "gallery");
  s.items.forEach(([img, word, desc], i) => {
    const b = h("button", "flip", `<div class="in"><div class="f"><img src="${I(img)}" alt="" loading="lazy"><span>${i + 1}</span></div><div class="b">${word}<small>${desc}</small></div></div>`);
    b.onclick = () => { if (!b.classList.contains("up")) { b.classList.add("up"); Sound.pop(); } else b.classList.remove("up"); };
    g.appendChild(b);
  });
  el.appendChild(g);
  const r = h("div", "row"); r.style.marginTop = "14px";
  const all = h("button", "btn", "Revelar todas"); all.onclick = () => suspense().then(() => { g.querySelectorAll(".flip").forEach((f, i) => setTimeout(() => { f.classList.add("up"); Sound.tock(); }, i * 90)); });
  const hide = h("button", "btn ghost", "Esconder todas"); hide.onclick = () => g.querySelectorAll(".flip").forEach(f => f.classList.remove("up"));
  r.appendChild(all); r.appendChild(hide); el.appendChild(r);
  el.appendChild(h("p", "tip", "💬 Jogo rápido: a roleta sorteia um aluno, o professor diz um número e o aluno fala o nome da peça antes de virar."));
}
function R_photos(s, el) {
  header(s, el, "Cultura"); const g = h("div", "pgrid");
  s.items.forEach(([img, cap]) => g.appendChild(h("div", "pcard", `<div style="overflow:hidden;padding:0"><img src="${I(img)}" alt="${cap}" loading="lazy"></div><div>${cap}</div>`)));
  el.appendChild(g); el.appendChild(h("p", "tip", "💬 Use: Eu vejo… · Parece… · As cores são… · Eu imagino que…"));
}
/* ---------- classificar ---------- */
function R_sort(s, el) {
  header(s, el); const pool = h("div", "pool"), groups = h("div", "groups"), fb = h("div", "fb"); el.appendChild(pool); el.appendChild(groups); el.appendChild(fb);
  let sel = null, place = {}; const mix = shuffle(s.items.map((_, i) => i));
  function draw() {
    pool.innerHTML = ""; groups.innerHTML = "";
    mix.forEach(i => { if (place[i] == null) { const b = h("button", "item" + (sel === i ? " sel" : ""), s.items[i][0]); b.onclick = () => { sel = sel === i ? null : i; Sound.tock(); draw(); }; pool.appendChild(b); } });
    if (!pool.children.length) pool.appendChild(h("span", null, "✔ Todas as peças foram colocadas. Toque em “Conferir”."));
    s.groups.forEach((g, gi) => {
      const d = h("div", "group" + (sel != null ? " target" : "")); d.appendChild(h("h4", null, g)); const its = h("div", "items");
      s.items.forEach((it, i) => { if (place[i] === gi) { const b = h("button", "item", it[0]); b.dataset.i = i; b.onclick = e => { e.stopPropagation(); delete place[i]; Sound.tock(); draw(); }; its.appendChild(b); } });
      d.appendChild(its); d.onclick = () => { if (sel != null) { place[sel] = gi; sel = null; Sound.pop(); fb.className = "fb"; draw(); } }; groups.appendChild(d);
    });
  }
  draw();
  controls(el, {
    check() {
      let ok = 0; groups.querySelectorAll(".item").forEach(b => { const i = +b.dataset.i, g = s.items[i][1] === place[i]; b.classList.add(g ? "ok" : "bad"); if (g) ok++; });
      const all = ok === s.items.length; fb.className = "fb " + (all ? "ok" : "bad");
      fb.textContent = all ? "✅ Perfeito! Todas as peças estão no grupo certo." : `Você acertou ${ok} de ${s.items.length}. Toque nas peças vermelhas para devolvê-las e tente de novo.`;
      all ? win() : judge(false);
    },
    reset() { place = {}; sel = null; fb.className = "fb"; draw(); }
  });
  el.appendChild(h("div", "tans", s.groups.map((g, gi) => g + ": " + s.items.filter(x => x[1] === gi).map(x => x[0]).join(", ")).join(" | ")));
}
/* ---------- ordenar ---------- */
function R_order(s, el) {
  header(s, el);
  if (s.img) { const im = h("div", "kb", `<img class="photo" src="${s.img}" alt="" style="max-height:min(22vh,220px);object-fit:cover">`); im.style.marginBottom = "10px"; el.appendChild(im); }
  const pool = h("div", "pool"), seq = h("div", "seq"), fb = h("div", "fb"); el.appendChild(pool); el.appendChild(seq); el.appendChild(fb);
  let order = [], mix = shuffle(s.items.map((_, i) => i));
  function draw() {
    pool.innerHTML = ""; seq.innerHTML = "";
    mix.forEach(i => { if (!order.includes(i)) { const b = h("button", "item", s.items[i]); b.onclick = () => { order.push(i); Sound.pop(); draw(); }; pool.appendChild(b); } });
    if (!pool.children.length) pool.appendChild(h("span", null, "✔ Sequência completa. Toque em “Conferir”."));
    s.items.forEach((_, p) => {
      const d = h("div", "seqslot"); d.appendChild(h("span", "n", p + 1));
      if (order[p] != null) { d.appendChild(h("span", null, s.items[order[p]])); d.style.cursor = "pointer"; d.title = "Toque para devolver"; d.onclick = () => { order.splice(p, 1); fb.className = "fb"; Sound.tock(); draw(); }; }
      else d.appendChild(h("span", null, "<span style='color:var(--muted)'>…</span>"));
      seq.appendChild(d);
    });
  }
  draw();
  controls(el, {
    check() {
      let ok = 0; [...seq.children].forEach((d, p) => { if (order[p] == null) return; const g = order[p] === p; d.classList.add(g ? "ok" : "bad"); if (g) ok++; });
      const all = ok === s.items.length; fb.className = "fb " + (all ? "ok" : "bad");
      fb.textContent = all ? "✅ Sequência coerente! Leiam o texto em voz alta." : `${ok} de ${s.items.length} na posição certa. Toque numa linha para devolvê-la.`;
      if (all) win(); else judge(false);
    },
    reset() { order = []; mix = shuffle(mix); fb.className = "fb"; draw(); }
  });
  el.appendChild(h("div", "tans", s.items.map((t, i) => (i + 1) + ". " + t).join("<br>")));
}
/* ---------- associar ---------- */
function R_match(s, el) {
  header(s, el); const chips = h("div", "chips"), m = h("div", "match"), fb = h("div", "fb"); el.appendChild(chips); el.appendChild(m); el.appendChild(fb);
  let sel = null, put = {}; const terms = shuffle(s.pairs.map((_, i) => i));
  function draw() {
    chips.innerHTML = ""; m.innerHTML = ""; const used = Object.values(put);
    terms.forEach(i => { const c = h("button", "chip" + (sel === i ? " sel" : "") + (used.includes(i) ? " used" : ""), s.pairs[i][0]); c.onclick = () => { sel = sel === i ? null : i; Sound.tock(); draw(); }; chips.appendChild(c); });
    s.pairs.forEach((p, d) => {
      const r = h("div", "mrow"); r.appendChild(h("div", "mdef", p[1]));
      const sl = h("button", "mslot" + (put[d] != null ? " filled" : ""), put[d] != null ? s.pairs[put[d]][0] : "Coloque a resposta aqui"); sl.dataset.d = d;
      sl.onclick = () => { if (sel != null) { for (const k in put) if (put[k] === sel) delete put[k]; put[d] = sel; sel = null; Sound.pop(); } else delete put[d]; fb.className = "fb"; draw(); };
      r.appendChild(sl); m.appendChild(r);
    });
  }
  draw();
  controls(el, {
    check() {
      let ok = 0; m.querySelectorAll(".mslot").forEach(sl => { const d = +sl.dataset.d; if (put[d] == null) return; const g = put[d] === d; sl.classList.add(g ? "ok" : "bad"); if (g) ok++; });
      const all = ok === s.pairs.length; fb.className = "fb " + (all ? "ok" : "bad");
      fb.textContent = all ? "✅ Todas as associações estão corretas!" : `${ok} de ${s.pairs.length} corretas. Toque num espaço para esvaziá-lo e tente de novo.`;
      all ? win() : judge(false);
    },
    reset() { put = {}; sel = null; fb.className = "fb"; draw(); }
  });
  el.appendChild(h("div", "tans", s.pairs.map(p => p[0] + " → " + p[1]).join("<br>")));
}
/* ---------- produção / role-play ---------- */
function R_role(s, el) {
  header(s, el, "Produção");
  if (s.img) { const im = h("div", "kb", `<img class="photo" src="${s.img}" alt="" style="max-height:min(20vh,200px);object-fit:cover">`); im.style.marginBottom = "12px"; el.appendChild(im); }
  const g = h("div", "role"); s.cards.forEach(c => g.appendChild(h("div", "rcard", c))); el.appendChild(g);
  const ta = h("textarea"); ta.placeholder = "Rascunho opcional — você também pode fazer a atividade oralmente. Anote palavras-chave ou escreva sua produção…"; el.appendChild(ta);
  const cl = h("div", "checklist", "<b>Revise sua produção:</b>" + s.check.map(c => `<label style="display:block;margin:4px 0"><input type="checkbox"> ${c}</label>`).join("")); el.appendChild(cl);
  let rolling = false;
  const sb = h("button", "btn green", "🎲 Sortear uma situação");
  sb.onclick = () => {
    if (rolling) return; rolling = true; const cs = [...g.children]; cs.forEach(c => c.classList.remove("pick", "win"));
    const target = Math.floor(Math.random() * cs.length), steps = cs.length * 4 + target; let n = 0;
    (function stepFn() {
      cs.forEach(c => c.classList.remove("pick")); cs[n % cs.length].classList.add("pick"); Sound.tick(1 + n / steps * .4);
      if (n < steps) { n++; setTimeout(stepFn, 70 + Math.pow(n / steps, 3) * 380); }
      else { cs[target].classList.remove("pick"); cs[target].classList.add("win"); Sound.fanfare(); confetti(40); rolling = false; }
    })();
  };
  const rv = h("button", "btn", "Revisar minha produção"); rv.onclick = () => { cl.classList.toggle("on"); Sound.pop(); };
  controls(el, { extra: [sb, rv], reset() { ta.value = ""; [...g.children].forEach(c => c.classList.remove("pick", "win")); cl.querySelectorAll("input").forEach(i => i.checked = false); cl.classList.remove("on"); } });
}
/* ---------- forca ----------
   Desenho da forca e do boneco adaptado de "Hangman" (20 Web Projects with Vanilla JavaScript,
   Brad Traversy / Packt Publishing, licença MIT): github.com/PacktPublishing/20-Web-Projects-with-Vanilla-JavaScript */
const HANG_SVG = `<svg viewBox="0 0 200 250" class="hang-svg" aria-hidden="true">
  <g class="gallows"><line x1="20" y1="230" x2="110" y2="230"/><line x1="60" y1="230" x2="60" y2="20"/><line x1="60" y1="20" x2="140" y2="20"/><line x1="60" y1="55" x2="95" y2="20"/><line x1="140" y1="20" x2="140" y2="50" class="rope"/></g>
  <g class="man">
    <circle cx="140" cy="70" r="20" class="part" pathLength="1"/>
    <line x1="140" y1="90" x2="140" y2="150" class="part" pathLength="1"/>
    <line x1="140" y1="110" x2="118" y2="132" class="part" pathLength="1"/>
    <line x1="140" y1="110" x2="162" y2="132" class="part" pathLength="1"/>
    <line x1="140" y1="150" x2="120" y2="185" class="part" pathLength="1"/>
    <line x1="140" y1="150" x2="160" y2="185" class="part" pathLength="1"/>
    <g class="face-dead"><line x1="130" y1="62" x2="136" y2="68"/><line x1="136" y1="62" x2="130" y2="68"/><line x1="144" y1="62" x2="150" y2="68"/><line x1="150" y1="62" x2="144" y2="68"/><path d="M131 80 q9 -6 18 0"/></g>
    <g class="face-happy"><circle cx="133" cy="65" r="2"/><circle cx="147" cy="65" r="2"/><path d="M130 75 q10 9 20 0"/></g>
  </g></svg>`;
function R_hangman(s, el) {
  header(s, el, "Jogo");
  const cats = Object.keys(s.bank), MAX = 6, HINT_COST = 2;
  const norm = c => c.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase();
  let cat = "Todas", used = new Set(), cur = null, guessed, wrong, over, hintOn;
  const top = h("div", "chips hang-cats");
  ["Todas", ...cats].forEach(c => { const b = h("button", "chip", c === "Todas" ? `🎲 Todas (${cats.reduce((n, k) => n + s.bank[k].length, 0)})` : `${c} (${s.bank[c].length})`); b.dataset.c = c; b.onclick = () => { cat = c; Sound.tock(); paintCats(); next(); }; top.appendChild(b); });
  el.appendChild(top);
  el.appendChild(Teams.tools());
  const arena = h("div", "hang-arena"), box = h("div", "card hang");
  arena.append(Teams.panel(0, { turn: true }), box, Teams.panel(1, { turn: true })); el.appendChild(arena);
  box.innerHTML = `<div class="hang-grid"><div class="hang-art">${HANG_SVG}<div class="lives"></div></div>
    <div class="hang-main"><div class="hang-turn"></div><div class="row"><span class="tag hang-cat"></span><span class="tag hang-count"></span></div>
    <div class="word hang-word"></div><div class="hang-hint"></div><div class="hang-wrong"></div><div class="keys"></div><div class="fb"></div>
    <div class="row hang-actions"></div><div class="tans"></div></div></div>`;
  const $ = q => box.querySelector(q), parts = [...box.querySelectorAll(".part")], svg = $(".hang-svg");
  const keys = $(".keys");
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(L => { const b = h("button", null, L); b.dataset.l = L; b.onclick = () => guess(L); keys.appendChild(b); });
  const actions = $(".hang-actions");
  const bHint = h("button", "btn ghost", "💡 Mostrar dica (−2 ❤️)"), bNext = h("button", "btn", "Próxima palavra ›");
  const errors = () => wrong.length + (hintOn ? HINT_COST : 0);
  bHint.onclick = () => {
    if (over || hintOn || MAX - errors() <= HINT_COST) return;
    hintOn = true; for (let k = errors() - HINT_COST; k < errors(); k++) parts[k].classList.add("show");
    Sound.error(); paint();
  };
  bNext.onclick = () => { Sound.whoosh(); next(); };
  const point = t => document.querySelectorAll(".score button")[t ? 3 : 1].click();
  let started = false;
  const paintTurn = () => { const t = Teams.turn, p = Teams.player(t); $(".hang-turn").innerHTML = `<span class="turn-badge t${t}">🎯 Vez: <b>${Teams.name(t)}</b>${p ? ` · joga <b>${p}</b>` : ""}</span>`; };
  [bHint, bNext].forEach(b => actions.appendChild(b));
  Teams.onChange(() => { if (cur) paintTurn(); });
  function paintCats() { top.querySelectorAll(".chip").forEach(b => b.classList.toggle("sel", b.dataset.c === cat)); }
  function pool() { return (cat === "Todas" ? cats : [cat]).flatMap(c => s.bank[c].map(([w, hint]) => ({ w, hint, c }))); }
  function next() {
    let p = pool().filter(x => !used.has(x.w)); if (!p.length) { pool().forEach(x => used.delete(x.w)); p = pool(); }
    cur = p[Math.floor(Math.random() * p.length)]; used.add(cur.w);
    if (started) Teams.nextTurn(); started = true; paintTurn();
    guessed = new Set(); wrong = []; over = false; hintOn = false;
    svg.classList.remove("lost", "won"); parts.forEach(pt => pt.classList.remove("show"));
    keys.querySelectorAll("button").forEach(b => { b.disabled = false; b.className = ""; });
    const fb = $(".fb"); fb.className = "fb"; fb.textContent = ""; paint();
  }
  function letters() { return [...cur.w].filter(c => /[A-ZÀ-Ü]/i.test(c)); }
  function guess(L) {
    if (over || guessed.has(L)) return; guessed.add(L);
    const k = keys.querySelector(`[data-l="${L}"]`); k.disabled = true;
    if (letters().some(c => norm(c) === L)) { k.className = "hit"; Sound.pop(); }
    else { k.className = "miss"; wrong.push(L); parts[errors() - 1].classList.add("show"); Sound.error(); $(".hang-word").classList.remove("shake"); void box.offsetWidth; $(".hang-word").classList.add("shake"); }
    paint(true);
  }
  function paint(fromGuess) {
    const won = letters().every(c => guessed.has(norm(c))), lost = errors() >= MAX;
    $(".hang-cat").textContent = "Categoria: " + cur.c;
    $(".hang-count").textContent = `${letters().length} letras`;
    $(".hang-word").innerHTML = [...cur.w].map(c => c === " " ? '<span class="sp"></span>' : !/[A-ZÀ-Ü]/i.test(c) ? `<span class="sym">${c}</span>`
      : (guessed.has(norm(c)) || lost) ? `<span class="l${lost && !guessed.has(norm(c)) ? " miss" : ""}${fromGuess && guessed.has(norm(c)) ? " new" : ""}">${c}</span>` : '<span class="l"></span>').join("");
    $(".hang-hint").innerHTML = hintOn ? `💡 <b>Dica:</b> ${cur.hint} <span class="hint-cost">(−${HINT_COST} ❤️)</span>` : "";
    bHint.style.display = (hintOn || won || lost) ? "none" : "";
    const canHint = MAX - errors() > HINT_COST; bHint.disabled = !canHint;
    bHint.textContent = canHint ? `💡 Mostrar dica (−${HINT_COST} ❤️)` : `💡 Dica bloqueada (precisa de mais de ${HINT_COST} ❤️)`;
    $(".hang-wrong").innerHTML = wrong.length ? "Letras erradas: " + wrong.map(l => `<b>${l}</b>`).join(" ") : "&nbsp;";
    $(".lives").textContent = "❤️".repeat(Math.max(0, MAX - errors())) + "🤍".repeat(Math.min(MAX, errors()));
    $(".tans").textContent = "Resposta: " + cur.w;
    if (!over && (won || lost)) {
      over = true; keys.querySelectorAll("button").forEach(b => b.disabled = true);
      const fb = $(".fb");
      const t = Teams.turn, other = Teams.name(t ? 0 : 1);
      if (won) { svg.classList.add("won"); point(t); fb.className = "fb ok"; fb.innerHTML = `🎉 Acertou: <b>${cur.w}</b>! <b>+1 ponto para ${Teams.name(t)}</b>. Agora diga uma frase com essa palavra. Próxima palavra: vez de <b>${other}</b>.`; win(); }
      else { svg.classList.add("lost"); fb.className = "fb bad"; fb.innerHTML = `😵 Não foi desta vez. A palavra era <b>${cur.w}</b>. Próxima palavra: vez de <b>${other}</b>.`; Sound.error(); }
    }
  }
  // teclado do computador
  const onKey = e => {
    if (!el.closest(".slide").classList.contains("on") || /TEXTAREA|INPUT/.test(e.target.tagName) || e.metaKey || e.ctrlKey || e.altKey) return;
    const L = norm(e.key); if (/^[A-Z]$/.test(L)) { e.preventDefault(); guess(L); } else if (e.key === "Enter" && over) next();
  };
  document.addEventListener("keydown", onKey);
  paintCats(); next();
  el.appendChild(h("p", "tip", "Toque nas letras ou use o teclado do computador. Os acentos e o Ç aparecem sozinhos (A revela Á, Ã, Â; C revela Ç). Enter = próxima palavra. A dica custa 2 corações. A vez alterna entre as equipes a cada palavra; arraste um nome (ou toque nele) para mudar a pessoa de equipe."));
}
/* ---------- corrida contra o relógio ---------- */
function R_race(s, el) {
  header(s, el, "Jogo"); const box = h("div", "card"); el.appendChild(box); let qi, hits, timer, left;
  function start() { clearInterval(timer); qi = 0; hits = 0; box.innerHTML = ""; const b = h("button", "btn green", "▶ Começar o desafio"); b.onclick = () => { Sound.boom(); ask(); }; box.appendChild(h("p", null, `${s.items.length} perguntas · ${s.secs} segundos cada.`)); box.appendChild(b); }
  function ask() {
    clearInterval(timer);
    if (qi >= s.items.length) {
      box.innerHTML = ""; const r = h("button", "btn", "Jogar de novo"); r.onclick = start;
      suspense(1.5).then(() => { box.innerHTML = `<div class="big-q" style="animation:stamp .6s">🏁 Fim! ${hits} de ${s.items.length} acertos.</div><p>Usem o placar no topo para registrar os pontos da equipe.</p>`; box.appendChild(r); hits >= s.items.length - 1 ? win() : Sound.success(); });
      return;
    }
    const q = s.items[qi]; left = s.secs; box.innerHTML = "";
    box.appendChild(h("div", "row", `<span class="tag">Pergunta ${qi + 1} de ${s.items.length}</span><span style="flex:1"></span><span class="timer">${left}</span>`));
    const bar = h("div", "timerbar", "<div style='width:100%'></div>"); box.appendChild(bar); box.appendChild(h("div", "big-q", q.q));
    const o = h("div", "opts"), fb = h("div", "fb"), order = shuffle(q.o.map((_, i) => i)); let answered = false;
    order.forEach(i => {
      const b = h("button", "opt", q.o[i]);
      b.onclick = () => { if (answered) return; answered = true; clearInterval(timer); const ok = i === q.a; judge(ok); b.classList.add(ok ? "ok" : "bad"); if (ok) hits++; else o.children[order.indexOf(q.a)].classList.add("ok"); fb.className = "fb " + (ok ? "ok" : "bad"); fb.textContent = ok ? "✅ Correto!" : "❌ A resposta é: " + q.o[q.a]; next(); };
      o.appendChild(b);
    });
    box.appendChild(o); box.appendChild(fb);
    function next() { const n = h("button", "btn", "Próxima ›"); n.style.marginTop = "10px"; n.onclick = () => { qi++; Sound.whoosh(); ask(); }; box.appendChild(n); }
    timer = setInterval(() => {
      left--; const t = box.querySelector(".timer"); t.textContent = left; bar.firstChild.style.width = (left / s.secs * 100) + "%";
      if (left <= 3) { t.classList.add("low"); Sound.tick(1.4); } else Sound.tock();
      if (left <= 0) { clearInterval(timer); answered = true; Sound.error(); fb.className = "fb bad"; fb.textContent = "⏰ Tempo esgotado! Resposta: " + q.o[q.a]; o.children[order.indexOf(q.a)].classList.add("ok"); next(); }
    }, 1000);
  }
  start(); s._stop = () => clearInterval(timer);
}
/* ---------- onde está? ---------- */
function R_where(s, el) {
  header(s, el, "Jogo");
  const pos = ["em cima do", "embaixo do", "à esquerda do", "à direita do"], shapes = ["círculo", "triângulo", "losango"];
  const box = h("div", "card"); el.appendChild(box); let n = 0, hits = 0;
  function round() {
    box.innerHTML = ""; const sh = shapes[Math.floor(Math.random() * shapes.length)], p = Math.floor(Math.random() * 4);
    const off = [[0, -95], [0, 95], [-115, 0], [115, 0]][p], cx = 210 + off[0], cy = 150 + off[1];
    const shapeSvg = SH[sh].replace('<svg viewBox="0 0 100 100">', `<svg x="${cx - 35}" y="${cy - 35}" width="70" height="70" viewBox="0 0 100 100">`);
    box.appendChild(h("div", "row", `<span class="tag">Rodada ${n + 1}</span><span class="tag">Acertos: ${hits}</span>`));
    box.appendChild(h("div", "board", `<svg viewBox="0 0 420 300"><rect x="170" y="110" width="80" height="80" fill="#3f8a4b"/>${shapeSvg}</svg>`));
    box.appendChild(h("div", "big-q", `Onde está o ${sh}?`));
    const o = h("div", "opts"), fb = h("div", "fb"); let done = false;
    pos.forEach((t, i) => {
      const b = h("button", "opt", `O ${sh} está ${t} quadrado.`);
      b.onclick = () => {
        if (done) return; done = true; b.classList.add("wait");
        suspense(1.2).then(() => {
          b.classList.remove("wait"); const ok = i === p; judge(ok); b.classList.add(ok ? "ok" : "bad"); if (ok) hits++; else o.children[p].classList.add("ok");
          fb.className = "fb " + (ok ? "ok" : "bad"); fb.textContent = ok ? "✅ Isso! Agora diga a frase em voz alta." : "❌ Observe de novo: " + o.children[p].textContent;

          const nx = h("button", "btn", "Nova rodada ›"); nx.style.marginTop = "10px"; nx.onclick = () => { n++; Sound.whoosh(); round(); }; box.appendChild(nx);
        });
      };
      o.appendChild(b);
    });
    box.appendChild(o); box.appendChild(fb);
  }
  round(); el.appendChild(h("p", "tip", "💬 Desafio extra: descreva a figura para um colega sem mostrar a tela."));
}
/* ---------- roleta (slide) ---------- */
function R_wheel(s, el) {
  el.appendChild(h("div", "kicker", "<span>Intercultura · Português do Brasil</span><span>Ferramenta do professor</span>"));
  el.appendChild(h("h1", null, s.title)); el.appendChild(h("p", "lead", s.lead));
  const c = h("div", "card", `<div style="text-align:center"><div style="font-size:120px;display:inline-block;animation:bob 3s ease-in-out infinite">🎡</div></div>`);
  const b = h("button", "btn gold", "🎡 Abrir a roleta e escrever os nomes"); b.style.fontSize = "22px"; b.onclick = () => Roleta.open();
  const r = h("div", "row"); r.style.justifyContent = "center"; r.appendChild(b); c.appendChild(r); el.appendChild(c);
  el.appendChild(h("div", "br", "<b>Dica:</b> marque “Tirar da roleta quem já foi sorteado” para que todos participem antes de alguém repetir."));
}
/* ---------- créditos ---------- */
function R_credits(s, el) {
  el.appendChild(h("div", "kicker", "<span>Intercultura · Português do Brasil</span><span>Referências</span>"));
  el.appendChild(h("h1", null, s.title));
  el.appendChild(h("div", "card", `<b>Material de origem</b><p style="font-size:17px">NAB2 – Unidade 3 (flipchart); capa e protocolos Intercultura. Autoria/fonte: acervo fornecido pelo professor. Referência para adaptação pedagógica.</p>`));
  const rows = Object.entries(window.CREDITS || {}).sort().map(([k, c]) => `<tr><td><img src="${I(k)}" alt="" style="width:64px;height:48px;object-fit:cover;border-radius:6px"></td><td><a href="${c.page}" target="_blank" rel="noopener">${c.title.replace(/^File:/, "")}</a></td><td>${c.author}</td><td>${c.license}</td></tr>`).join("");
  el.appendChild(h("div", "card", `<b>Fotografias (Wikimedia Commons)</b><p style="font-size:15px;color:var(--muted)">Imagens usadas sob as licenças indicadas, com redimensionamento e recorte para os quadros.</p><div class="tablewrap"><table class="conj" style="font-size:14px"><tr><th></th><th>Arquivo</th><th>Autoria</th><th>Licença</th></tr>${rows}</table></div>`));
  el.appendChild(h("div", "card", `<b>Sons:</b> gerados no próprio navegador (Web Audio API).<br><b>Desenho do jogo da forca:</b> adaptado de “Hangman”, em <a href="https://github.com/PacktPublishing/20-Web-Projects-with-Vanilla-JavaScript" target="_blank" rel="noopener">20 Web Projects with Vanilla JavaScript</a> (Brad Traversy / Packt Publishing), licença MIT.`));
}
/* ---------- slides simples ---------- */
function R_cover(s, el) {
  el.classList.add("cover"); if (s.main) el.classList.add("main-cover");
  el.innerHTML = `<div class="blob b1"></div><div class="blob b2"></div><div class="blob b3"></div>${s.icon ? `<div class="icon">${s.icon}</div>` : ""}
  <div class="wrap"><div class="num">${s.num}</div>
  <div class="lbl a">Assunto</div><div class="subj">${s.subj}</div>
  <div class="lbl b">Estrutura gramatical</div><div class="gramw"><span class="gram">${s.gram}</span></div>
  <div class="goal">🎯 ${s.goal}</div></div><div class="foot">Nível 2 · NAB2 · Unidade 3 · Roupas, escolhas e futuros</div>`;
}
function R_img(s, el) { el.classList.add("imgslide"); el.innerHTML = `<img src="${I(s.src)}" alt="${s.menu}">`; }
function R_html(s, el) { el.innerHTML = s.html; }
const R = { cover: R_cover, img: R_img, html: R_html, mc: R_mc, photoquiz: R_photoquiz, fill: R_fill, reveal: R_reveal, memory: R_memory, gallery: R_gallery, photos: R_photos, sort: R_sort, order: R_order, match: R_match, role: R_role, hangman: R_hangman, race: R_race, where: R_where, wheel: R_wheel, credits: R_credits };

/* ---------- construção (preguiçosa) e navegação ---------- */
const els = S.map(() => { const sl = h("section", "slide"); stage.appendChild(sl); return sl; });
const built = [];
function build(i) {
  if (built[i]) return; built[i] = true; const s = S[i], sl = els[i];
  if (s.type === "cover" || s.type === "img") R[s.type](s, sl);
  else { const w = h("div", "wrap"); R[s.type](s, w); sl.appendChild(w); }
}
function go(i, quiet) {
  i = Math.max(0, Math.min(S.length - 1, i)); if (i === cur && els[cur].classList.contains("on")) return;
  const dir = i >= cur ? "in-right" : "in-left";
  S[cur]._stop && S[cur]._stop();
  els[cur].classList.remove("on", "in-right", "in-left"); cur = i; build(cur);
  const sl = els[cur]; sl.classList.add("on", dir); stage.scrollTop = 0;
  sl.querySelectorAll(".wrap>*").forEach((c, k) => c.style.animationDelay = Math.min(k * 80, 700) + "ms");
  if (!quiet) { S[cur].type === "cover" ? Sound.boom() : Sound.whoosh(); }
  if (S[cur].init) S[cur].init(sl);
  document.getElementById("count").textContent = `${cur + 1} / ${S.length}`;
  document.querySelector("#progress div").style.width = ((cur + 1) / S.length * 100) + "%";
  document.getElementById("bPrev").disabled = cur === 0; document.getElementById("bNext").disabled = cur === S.length - 1;
  try { history.replaceState(null, "", "#" + (cur + 1)); } catch (e) {}
  Notes.show(cur); fit();
}
/* ---------- ajuste à tela: usa a largura toda e, se faltar altura, reduz a escala até caber ---------- */
const MAXW = 1800, MINZ = 0.62;
function fit() {
  stage.style.setProperty("--sh", stage.clientHeight + "px");
  const s = S[cur], sl = els[cur], w = sl && sl.querySelector(":scope > .wrap"); if (!w) return;
  w.style.zoom = ""; w.style.maxWidth = ""; if (s.noFit) return;
  const cs = getComputedStyle(sl), avail = stage.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) - 2;
  const fullW = sl.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
  let z = 1;
  for (let k = 0; k < 4; k++) {
    const hgt = w.getBoundingClientRect().height; if (hgt <= avail + 1) break;
    z = Math.max(MINZ, z * avail / hgt);
    w.style.zoom = z; w.style.maxWidth = Math.min(MAXW, fullW) / z + "px";
    if (z === MINZ) break;
  }
}
let fitT; const refit = () => { clearTimeout(fitT); fitT = setTimeout(fit, 60); };
window.addEventListener("resize", refit);
document.addEventListener("fullscreenchange", refit);
new MutationObserver(refit).observe(stage, { subtree: true, childList: true, attributes: true, attributeFilter: ["class"] });
document.getElementById("bPrev").onclick = () => go(cur - 1);
document.getElementById("bNext").onclick = () => go(cur + 1);
document.addEventListener("keydown", e => {
  if (/TEXTAREA|INPUT/.test(e.target.tagName)) return;
  if (document.getElementById("wheel").classList.contains("on")) { if (e.key === "Escape") Roleta.close(); if (e.key === " ") { e.preventDefault(); document.getElementById("wSpin").click(); } return; }
  if (e.key === "ArrowRight" || e.key === "PageDown") go(cur + 1);
  if (e.key === "ArrowLeft" || e.key === "PageUp") go(cur - 1);
  if (e.key === "Escape") menu.classList.remove("on");
  if (S[cur].type === "hangman" && /^[a-zç]$/i.test(e.key)) return; // na forca, as letras são do jogo
  if (e.key.toLowerCase() === "r") Roleta.open();
  if (e.key.toLowerCase() === "n") Notes.add();
});
document.addEventListener("click", () => Sound.unlock(), true);
const menu = document.getElementById("menu"), ml = document.getElementById("menuList");
S.forEach((s, i) => { const a = h("a", s.sec ? "sec" : "", (s.sec ? "" : "&nbsp;&nbsp;") + (i + 1) + ". " + (s.menu || s.title)); a.href = "#"; a.onclick = e => { e.preventDefault(); menu.classList.remove("on"); go(i); }; ml.appendChild(a); });
document.getElementById("bMenu").onclick = () => menu.classList.add("on");
menu.onclick = e => { if (e.target === menu) menu.classList.remove("on"); };
document.getElementById("bTeacher").onclick = function () {
  const on = !document.body.classList.contains("teacher"), b = this;
  if (on) suspense(1.2).then(() => { document.body.classList.add("teacher"); b.classList.add("on"); Sound.success(); });
  else { document.body.classList.remove("teacher"); b.classList.remove("on"); }
};
document.getElementById("bWheel").onclick = () => Roleta.open();
const bSound = document.getElementById("bSound");
const paintSound = () => { bSound.textContent = Sound.muted ? "🔇 Sem som" : "🔊 Som"; };
bSound.onclick = () => { Sound.toggle(); paintSound(); Sound.pop(); }; paintSound();
document.getElementById("bFull").onclick = () => { if (!document.fullscreenElement) document.documentElement.requestFullscreen?.(); else document.exitFullscreen?.(); };
document.querySelectorAll(".score button").forEach(b => b.onclick = () => {
  const t = +b.dataset.t, d = +b.dataset.d; score[t] = Math.max(0, score[t] + d);
  const el = document.getElementById(t ? "sb" : "sa"); el.textContent = score[t]; restart(el, "bump");
  d > 0 ? Sound.success() : Sound.tock(); Teams.refresh();
});
Roleta.init();
Notes.init();
Teams.init();
const start = Math.max(0, (parseInt(location.hash.slice(1)) || 1) - 1);
cur = start; go(start, true); if (!els[start].classList.contains("on")) { build(start); els[start].classList.add("on"); }
