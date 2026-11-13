/* ============ MOTOR DA AULA ============ */
const stage = document.getElementById("stage");
let cur = 0, score = [0, 0];
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const h = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const restart = (el, cls) => { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); };
const TIP = "💬 Leve a ideia para uma situação da sua vida e converse com um colega.";
const plural = (n, a, b) => n === 1 ? a : b;

function whoBtn() { const b = h("button", "btn gold who", "🎡 Quem responde?"); b.onclick = () => Roleta.open(); return b; }
function header(s, el, kind) {
  el.appendChild(h("div", "kicker", `<span>Intercultura · Português do Brasil</span><span>${LESSON.short} · ${kind || "Prática"}</span>`));
  const t = h("div", "row"); t.appendChild(h("h1", null, s.title)); t.appendChild(whoBtn()); el.appendChild(t);
  if (s.lead) el.appendChild(h("p", "lead", s.lead));
}
function controls(el, { check, reset, extra }) {
  const r = h("div", "row"); r.style.marginTop = "14px";
  if (check) { const b = h("button", "btn", "Conferir"); b.onclick = () => suspense().then(check); r.appendChild(b); }
  if (extra) extra.forEach(x => r.appendChild(x));
  const rb = h("button", "btn ghost", "Recomeçar"); rb.onclick = () => { Sound.whoosh(); reset(); }; r.appendChild(rb);
  el.appendChild(r); el.appendChild(h("p", "tip", TIP));
}
function judge(ok) { ok ? Sound.success() : Sound.error(); setTimeout(phoneSync, 0); }
function win() { Sound.fanfare(); confetti(); }

/* ============ MODO EQUIPES: vez + pontos em todas as atividades ============ */
let teamMode = true;
try { teamMode = localStorage.getItem("nab3-u11-modo-equipes") !== "0"; } catch (e) {}
const allBars = new Set();
function setTeamMode(v) { teamMode = v; try { localStorage.setItem("nab3-u11-modo-equipes", v ? "1" : "0"); } catch (e) {} allBars.forEach(f => f()); phoneSync(); }
/* ---------- celular: só o aluno da vez recebe as opções ---------- */
function phoneSync() { Sala.setActivity(S[cur] && S[cur]._phone ? S[cur]._phone() : null); }
const phoneTurn = () => teamMode ? Teams.player(Teams.turn) : null;
/* act = placar desta atividade */
function newAct(rule) { return { tally: [0, 0], rule, bar: null }; }
function toast(txt, t) {
  const d = h("div", "pt-toast t" + t, txt); document.body.appendChild(d); setTimeout(() => d.remove(), 1700);
}
/* dá pontos à equipe da vez (ou à equipe t) e devolve um texto para o feedback */
function award(act, n, t) {
  if (!teamMode || !n) return "";
  t = t == null ? Teams.turn : t; addPoints(t, n); act.tally[t] += n; toast(`+${n} ${plural(n, "ponto", "pontos")} · ${Teams.name(t)}`, t); act.bar && act.bar();
  return ` <b class="pts">+${n} ${plural(n, "ponto", "pontos")} para ${Teams.name(t)}</b>.`;
}
function passTurn(act) { if (!teamMode) return ""; Teams.nextTurn(); act.bar && act.bar(); return ` Agora é a vez de <b>${Teams.name(Teams.turn)}</b>.`; }
function turnBar(el, act) {
  const bar = h("div", "turnbar");
  function paint() {
    if (!teamMode) { bar.className = "turnbar off"; bar.innerHTML = `<span class="tb-off">👥 Modo equipes desligado</span><button class="btn ghost tb-on">👥 Jogar em equipes</button>`; bar.querySelector(".tb-on").onclick = () => { setTeamMode(true); Sound.pop(); }; return; }
    const t = Teams.turn, p = Teams.player(t);
    bar.className = "turnbar";
    bar.innerHTML = `<span class="turn-badge t${t}">🎯 Vez: <b>${Teams.name(t)}</b>${p ? ` · joga <b>${p}</b>` : ""}</span>
      <span class="tb-tally"><span class="t0">${Teams.name(0)} <b>${act.tally[0]}</b></span> × <span class="t1"><b>${act.tally[1]}</b> ${Teams.name(1)}</span> <small>nesta atividade</small></span>
      <span class="tb-rule">${act.rule}</span>
      <span class="tb-btns"><button class="btn ghost tb-pass" title="Passar a vez para a outra equipe">⇄ Passar a vez</button><button class="btn ghost tb-offb" title="Fazer sem equipes e sem pontos">Sem equipes</button></span>`;
    bar.querySelector(".tb-pass").onclick = () => { Teams.nextTurn(); Sound.whoosh(); };
    bar.querySelector(".tb-offb").onclick = () => { setTeamMode(false); Sound.tock(); };
  }
  act.bar = paint; allBars.add(paint); Teams.onChange(paint); paint(); el.appendChild(bar); return bar;
}
function resultHTML(act) {
  const [a, b] = act.tally, na = Teams.name(0), nb = Teams.name(1);
  const who = a === b ? "Empate! 🤝" : `Vitória de <b>${a > b ? na : nb}</b> nesta atividade! 🏆`;
  return `<div class="result"><div class="r-title">🏁 Atividade concluída</div><div class="r-score"><span class="t0">${na} <b>${a}</b></span> × <span class="t1"><b>${b}</b> ${nb}</span></div><div class="r-who">${who}</div></div>`;
}

/* ---------- questões em sequência ---------- */
function stepper(s, el, renderQ, rule) {
  const act = newAct(rule || "1ª tentativa = 3 pts · 2ª = 2 · 3ª = 1");
  turnBar(el, act);
  const nav = h("div", "qnav"), box = h("div", "card"), res = h("div"), state = s.items.map(() => ({})); let qi = 0, celebrated = false;
  s.items.forEach((_, i) => { const b = h("button", null, i + 1); b.onclick = () => { qi = i; Sound.tock(); draw(); }; nav.appendChild(b); });
  const counter = h("span", "tag"), top = h("div", "row"); top.appendChild(nav); const sp = h("span"); sp.style.flex = "1"; top.appendChild(sp); top.appendChild(counter);
  el.appendChild(top); el.appendChild(box); el.appendChild(res);
  const nr = h("div", "row"), pb = h("button", "btn ghost", "‹ Anterior"), nb = h("button", "btn", "Próxima questão ›"), rb = h("button", "btn ghost", "Recomeçar");
  pb.onclick = () => { if (qi > 0) { qi--; Sound.whoosh(); draw(); } }; nb.onclick = () => { if (qi < s.items.length - 1) { qi++; Sound.whoosh(); draw(); } };
  rb.onclick = () => { state.forEach(o => { for (const k in o) delete o[k]; }); qi = 0; celebrated = false; act.tally = [0, 0]; act.bar(); res.innerHTML = ""; draw(); };
  [pb, nb, rb].forEach(b => nr.appendChild(b)); el.appendChild(nr); el.appendChild(h("p", "tip", TIP));
  function draw() {
    counter.textContent = `Questão ${qi + 1} de ${s.items.length}`;
    [...nav.children].forEach((b, i) => { b.className = (i === qi ? "cur " : "") + (state[i].done ? "done" : ""); });
    box.innerHTML = ""; box.style.animation = "none"; void box.offsetWidth; box.style.animation = "pop .4s";
    const myQ = qi;
    renderQ(s.items[qi], box, state[qi], pts => {
      state[myQ].done = true; [...nav.children][myQ].classList.add("done");
      let msg = award(act, pts); msg += passTurn(act);
      if (!celebrated && state.every(x => x.done)) { celebrated = true; setTimeout(() => { res.innerHTML = teamMode ? resultHTML(act) : ""; win(); }, 600); }
      return msg;
    });
    nb.disabled = qi === s.items.length - 1; pb.disabled = qi === 0;
    phoneSync();
  }
  s._phone = () => {
    const q = s.items[qi], st = state[qi]; if (!q || !q.o) return null;
    const p = phoneTurn(); if (!p) return null;
    const id = `q-${S.indexOf(s)}-${qi}`;
    if (st.done) return { kind: "wait", id, title: s.title, turn: p, note: "Resposta certa: " + q.o[q.a] };
    return { kind: "choice", id, only: p, title: s.title, n: `Questão ${qi + 1} de ${s.items.length}`, q: String(q.q || q.t).replace(/<[^>]+>/g, ""), img: q.img || null, o: q.o.map((t, i) => ({ t, off: !!(st.tried && st.tried.has(i)) })), busy: !!st.busy };
  };
  s._pick = i => { const b = box.querySelectorAll(".opts .opt, .chips .chip")[i]; b && b.click(); };
  draw();
}
const triesPts = tries => Math.max(1, 3 - tries);
/* múltipla escolha (com ou sem foto) */
function mcQ(q, box, st, done) {
  box.innerHTML = "";
  box.classList.toggle("qwide", !!q.img);
  if (q.img) box.appendChild(h("div", "qimg", `<img src="${q.img}" alt="">`));
  box.appendChild(h("div", "big-q", q.q));
  const o = h("div", "opts"), fb = h("div", "fb");
  if (!st.tried) st.tried = new Set();
  q.o.forEach((t, i) => {
    const b = h("button", "opt", t);
    if (st.done && i === q.a) b.classList.add("ok");
    if (!st.done && st.tried.has(i)) { b.classList.add("bad"); b.disabled = true; }
    b.onclick = () => {
      if (st.done || st.busy || st.tried.has(i)) return; st.busy = true; b.classList.add("wait");
      suspense(1.3).then(() => {
        st.busy = false; b.classList.remove("wait"); const ok = i === q.a; judge(ok);
        b.classList.add(ok ? "ok" : "bad");
        if (ok) { st.done = true; st.msg = done(triesPts(st.tried.size)); fb.className = "fb ok"; fb.innerHTML = "✅ Muito bem! " + q.c + st.msg; }
        else { st.tried.add(i); b.disabled = true; fb.className = "fb bad"; fb.innerHTML = `❌ Ainda não. Tente outra opção.${teamMode ? ` Agora vale <b>${triesPts(st.tried.size)} ${plural(triesPts(st.tried.size), "ponto", "pontos")}</b>.` : ""}`; }
      });
    };
    o.appendChild(b);
  });
  box.appendChild(o); if (st.done) { fb.className = "fb ok"; fb.innerHTML = "✅ " + q.c + (st.msg || ""); } box.appendChild(fb);
  box.appendChild(h("div", "tans", "Resposta: " + q.o[q.a]));
}
function R_mc(s, el) {
  header(s, el);
  if (s.video) el.appendChild(h("div", "card", `🎬 <b>${s.videoTitle || "Vídeo em português"}${s.videoLen ? " · " + s.videoLen : ""}</b><br><span style="font-size:16px;color:var(--muted)">Use uma conexão à internet. Assista e depois responda às questões.</span><div class="row" style="margin-top:8px"><a class="btn" target="_blank" rel="noopener" href="${s.video}" style="text-decoration:none">▶ Abrir vídeo</a></div>`));
  stepper(s, el, mcQ);
}
const R_photoquiz = R_mc;
function R_fill(s, el) {
  header(s, el);
  stepper(s, el, function draw(q, box, st, done) {
    box.innerHTML = ""; if (!st.tried) st.tried = new Set();
    const [a, b] = q.t.split("___"), line = h("div", "gapline");
    line.append(a); const g = h("span", "gap", st.done ? q.o[q.a] : "?"); if (st.done) g.classList.add("ok"); line.appendChild(g); line.append(b); box.appendChild(line);
    const ch = h("div", "chips"), fb = h("div", "fb");
    q.o.forEach((t, i) => {
      const c = h("button", "chip" + (!st.done && st.tried.has(i) ? " used" : ""), t);
      c.onclick = () => {
        if (st.done || st.busy || st.tried.has(i)) return; st.busy = true; g.textContent = t; g.className = "gap"; c.classList.add("sel");
        suspense(1.3).then(() => {
          st.busy = false; const ok = i === q.a; judge(ok); g.className = "gap " + (ok ? "ok" : "bad"); c.classList.remove("sel");
          if (ok) { st.done = true; st.msg = done(triesPts(st.tried.size)); fb.className = "fb ok"; fb.innerHTML = "✅ " + q.c + st.msg; }
          else { st.tried.add(i); c.classList.add("used"); fb.className = "fb bad"; fb.innerHTML = `❌ Ainda não. Observe o contexto e tente de novo.${teamMode ? ` Agora vale <b>${triesPts(st.tried.size)} ${plural(triesPts(st.tried.size), "ponto", "pontos")}</b>.` : ""}`; }
        });
      };
      ch.appendChild(c);
    });
    box.appendChild(ch); if (st.done) { fb.className = "fb ok"; fb.innerHTML = "✅ " + q.c + (st.msg || ""); } box.appendChild(fb);
    box.appendChild(h("div", "tans", "Resposta: " + q.o[q.a]));
  });
}
function R_reveal(s, el) {
  header(s, el);
  stepper(s, el, (q, box, st, done) => {
    box.classList.toggle("qwide", !!q.img);
    box.appendChild(q.img ? h("div", "qimg", `<img src="${q.img}" alt="">`) : h("div", "emoji", q.e));
    box.appendChild(h("div", "big-q", q.q));
    const b = h("button", "btn green", st.shown ? "✔ Resposta revelada" : "Descobrir resposta"), a = h("div", "reveal-ans" + (st.shown ? " on" : ""), "💡 " + q.a);
    const jd = h("div", "judge"), fb = h("div", "fb");
    function judgeRow() {
      jd.innerHTML = "";
      if (st.done) { if (st.msg) { fb.className = "fb ok"; fb.innerHTML = "📝" + st.msg; } return; }
      if (!teamMode) { st.done = true; done(0); return; }
      jd.innerHTML = `<span>A equipe acertou?</span>`;
      [["✔ Acertou", 2, "green"], ["◐ Em parte", 1, "gold"], ["✖ Não acertou", 0, "ghost"]].forEach(([lbl, n, cls]) => {
        const x = h("button", "btn " + cls, `${lbl}${n ? ` (+${n})` : ""}`);
        x.onclick = () => { if (st.done) return; st.done = true; n ? Sound.success() : Sound.error(); st.msg = done(n) || " Sem pontos desta vez."; jd.innerHTML = ""; fb.className = n ? "fb ok" : "fb bad"; fb.innerHTML = (n ? "📝" : "📝 Sem pontos.") + st.msg; };
        jd.appendChild(x);
      });
    }
    b.onclick = () => { if (st.shown) return; suspense(1.8).then(() => { st.shown = true; Sound.success(); a.classList.add("on"); b.textContent = "✔ Resposta revelada"; judgeRow(); }); };
    box.appendChild(b); box.appendChild(a); box.appendChild(jd); box.appendChild(fb);
    if (st.shown) judgeRow();
  }, "O professor avalia: acertou = 2 pts · em parte = 1");
}
/* ---------- memória (cartas que viram em 3D) — em equipes: achou o par, joga de novo ---------- */
function face(x, svg) { if (svg) return SH[x]; if (x.startsWith("img:")) return `<img src="${I(x.slice(4))}" alt="">`; return x; }
function R_memory(s, el) {
  header(s, el, "Jogo");
  const act = newAct("Achou o par = +1 e joga de novo · errou = passa a vez"); turnBar(el, act);
  const info = h("p", "mem-info"), grid = h("div", "mem"), res = h("div"); el.appendChild(info); el.appendChild(grid); el.appendChild(res);
  function start() {
    grid.innerHTML = ""; res.innerHTML = ""; act.tally = [0, 0]; act.bar(); let found = 0, open = [], lock = false, moves = 0;
    const cards = shuffle(s.pairs.flatMap((p, i) => [{ id: i, f: face(p[0], s.svg), k: "a" }, { id: i, f: p[1], k: "b" }]));
    const upd = (extra = "") => info.innerHTML = `<b>${found}</b> de ${s.pairs.length} pares · ${moves} jogadas${extra}`; upd();
    cards.forEach(c => {
      const b = h("button", "mcard", `<div class="in"><div class="f">?</div><div class="b">${c.f}</div></div>`);
      b.onclick = () => {
        if (lock || b.classList.contains("up") || b.classList.contains("found")) return;
        Sound.tock(); b.classList.add("up"); open.push([b, c]);
        if (open.length === 2) {
          moves++; const [[b1, c1], [b2, c2]] = open; open = []; lock = true;
          if (c1.id === c2.id && c1.k !== c2.k) {
            setTimeout(() => {
              b1.classList.add("found"); b2.classList.add("found"); Sound.success(); found++; lock = false;
              const msg = award(act, 1); upd(teamMode ? ` · ${Teams.name(Teams.turn)} achou um par e joga de novo!` : "");
              if (found === s.pairs.length) { info.innerHTML = `🎉 Todos os pares em ${moves} jogadas! Agora use duas palavras em uma frase.`; if (teamMode) res.innerHTML = resultHTML(act); win(); }
            }, 450);
          } else { setTimeout(() => { Sound.error(); b1.classList.remove("up"); b2.classList.remove("up"); lock = false; passTurn(act); upd(teamMode ? ` · Não formou par: vez de ${Teams.name(Teams.turn)}.` : ""); }, 1100); }
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
  const pick = h("button", "btn gold", "🎲 Sortear uma foto");
  pick.onclick = () => { const cs = [...g.querySelectorAll(".flip:not(.up)")]; if (!cs.length) return; const c = cs[Math.floor(Math.random() * cs.length)]; g.querySelectorAll(".flip").forEach(f => f.classList.remove("pickme")); c.classList.add("pickme"); c.scrollIntoView({ block: "nearest", behavior: "smooth" }); Sound.pop(); };
  r.append(pick, all, hide); el.appendChild(r);
  el.appendChild(h("p", "tip", "💬 Jogo rápido: sorteie uma foto, a equipe da vez diz o nome da peça e depois toque para conferir."));
}
function R_photos(s, el) {
  header(s, el, "Cultura"); const g = h("div", "pgrid");
  s.items.forEach(([img, cap]) => g.appendChild(h("div", "pcard", `<div style="overflow:hidden;padding:0"><img src="${I(img)}" alt="${cap}" loading="lazy"></div><div>${cap}</div>`)));
  el.appendChild(g); el.appendChild(h("p", "tip", "💬 Use: Eu vejo… · Parece… · As cores são… · Eu imagino que…"));
}
/* ---------- regra comum de "Conferir" para classificar/ordenar/associar ---------- */
const boardPts = checks => [5, 3, 1][Math.min(checks, 2)];
const BOARD_RULE = "Tudo certo no 1º “Conferir” = 5 pts · 2º = 3 · depois = 1 · errou = a outra equipe continua";
function boardCheck(act, st, ok, total, fb, res) {
  const all = ok === total;
  if (all) { const msg = award(act, boardPts(st.checks)); fb.className = "fb ok"; fb.innerHTML = `✅ Perfeito! Tudo certo.${msg}`; if (teamMode) res.innerHTML = resultHTML(act); win(); st.solved = true; }
  else { st.checks++; const pass = passTurn(act); fb.className = "fb bad"; fb.innerHTML = `Acertos: ${ok} de ${total}. Toque nas peças vermelhas para devolvê-las.${teamMode ? `${pass} Se acertarem tudo, valem <b>${boardPts(st.checks)} ${plural(boardPts(st.checks), "ponto", "pontos")}</b>.` : " Tente de novo."}`; judge(false); }
}
/* ---------- classificar ---------- */
function R_sort(s, el) {
  header(s, el); const act = newAct(BOARD_RULE); turnBar(el, act);
  const pool = h("div", "pool"), groups = h("div", "groups"), fb = h("div", "fb"), res = h("div"); el.appendChild(pool); el.appendChild(groups); el.appendChild(fb); el.appendChild(res);
  let sel = null, place = {}; const mix = shuffle(s.items.map((_, i) => i)), st = { checks: 0 };
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
    check() { if (st.solved) return; let ok = 0; groups.querySelectorAll(".item").forEach(b => { const i = +b.dataset.i, g = s.items[i][1] === place[i]; b.classList.add(g ? "ok" : "bad"); if (g) ok++; }); boardCheck(act, st, ok, s.items.length, fb, res); },
    reset() { place = {}; sel = null; st.checks = 0; st.solved = false; act.tally = [0, 0]; act.bar(); fb.className = "fb"; res.innerHTML = ""; draw(); }
  });
  el.appendChild(h("div", "tans", s.groups.map((g, gi) => g + ": " + s.items.filter(x => x[1] === gi).map(x => x[0]).join(", ")).join(" | ")));
}
/* ---------- ordenar ---------- */
function R_order(s, el) {
  header(s, el); const act = newAct(BOARD_RULE); turnBar(el, act);
  if (s.img) { const im = h("div", "kb", `<img class="photo" src="${s.img}" alt="" style="max-height:min(22vh,220px);object-fit:cover">`); im.style.marginBottom = "10px"; el.appendChild(im); }
  const pool = h("div", "pool"), seq = h("div", "seq"), fb = h("div", "fb"), res = h("div"); el.appendChild(pool); el.appendChild(seq); el.appendChild(fb); el.appendChild(res);
  let order = [], mix = shuffle(s.items.map((_, i) => i)); const st = { checks: 0 };
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
    check() { if (st.solved) return; let ok = 0; [...seq.children].forEach((d, p) => { if (order[p] == null) return; const g = order[p] === p; d.classList.add(g ? "ok" : "bad"); if (g) ok++; }); boardCheck(act, st, ok, s.items.length, fb, res); },
    reset() { order = []; mix = shuffle(mix); st.checks = 0; st.solved = false; act.tally = [0, 0]; act.bar(); fb.className = "fb"; res.innerHTML = ""; draw(); }
  });
  el.appendChild(h("div", "tans", s.items.map((t, i) => (i + 1) + ". " + t).join("<br>")));
}
/* ---------- associar ---------- */
function R_match(s, el) {
  header(s, el); const act = newAct(BOARD_RULE); turnBar(el, act);
  const chips = h("div", "chips"), m = h("div", "match"), fb = h("div", "fb"), res = h("div"); el.appendChild(chips); el.appendChild(m); el.appendChild(fb); el.appendChild(res);
  let sel = null, put = {}; const terms = shuffle(s.pairs.map((_, i) => i)), st = { checks: 0 };
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
    check() { if (st.solved) return; let ok = 0; m.querySelectorAll(".mslot").forEach(sl => { const d = +sl.dataset.d; if (put[d] == null) return; const g = put[d] === d; sl.classList.add(g ? "ok" : "bad"); if (g) ok++; }); boardCheck(act, st, ok, s.pairs.length, fb, res); },
    reset() { put = {}; sel = null; st.checks = 0; st.solved = false; act.tally = [0, 0]; act.bar(); fb.className = "fb"; res.innerHTML = ""; draw(); }
  });
  el.appendChild(h("div", "tans", s.pairs.map(p => p[0] + " → " + p[1]).join("<br>")));
}
/* ---------- produção / role-play: o professor dá a nota de cada equipe ---------- */
function R_role(s, el) {
  header(s, el, "Produção");
  const act = newAct("O professor dá de 1 a 3 pontos para cada apresentação"); turnBar(el, act);
  if (s.img) { const im = h("div", "kb", `<img class="photo" src="${s.img}" alt="" style="max-height:min(20vh,200px);object-fit:cover">`); im.style.marginBottom = "12px"; el.appendChild(im); }
  const g = h("div", "role"); s.cards.forEach(c => g.appendChild(h("div", "rcard", c))); el.appendChild(g);
  const ta = h("textarea"); ta.placeholder = "Rascunho opcional — você também pode fazer a atividade oralmente. Anote palavras-chave ou escreva sua produção…"; el.appendChild(ta);
  const cl = h("div", "checklist", "<b>Revise sua produção:</b>" + s.check.map(c => `<label style="display:block;margin:4px 0"><input type="checkbox"> ${c}</label>`).join("")); el.appendChild(cl);
  const grade = h("div", "grade");
  function paintGrade() {
    if (!teamMode) { grade.innerHTML = ""; return; }
    grade.innerHTML = `<b>Avaliação do professor:</b>` + [0, 1].map(t => `<span class="g-team t${t}">${Teams.name(t)} ${[1, 2, 3].map(n => `<button class="btn ghost" data-t="${t}" data-n="${n}">+${n}</button>`).join("")}</span>`).join("");
    grade.querySelectorAll("button").forEach(b => b.onclick = () => { award(act, +b.dataset.n, +b.dataset.t); Sound.success(); });
  }
  allBars.add(paintGrade); Teams.onChange(paintGrade); paintGrade(); el.appendChild(grade);
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
  controls(el, { extra: [sb, rv], reset() { ta.value = ""; [...g.children].forEach(c => c.classList.remove("pick", "win")); cl.querySelectorAll("input").forEach(i => i.checked = false); cl.classList.remove("on"); act.tally = [0, 0]; act.bar(); } });
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
  /* partida em rodadas: em cada rodada, cada equipe joga uma palavra */
  let ROUNDS = 5; try { ROUNDS = +localStorage.getItem("nab3-u11-forca-rodadas") || 5; } catch (e) {}
  const match = { played: 0, pts: [0, 0], done: false };
  const top = h("div", "chips hang-cats");
  ["Todas", ...cats].forEach(c => { const b = h("button", "chip", c === "Todas" ? `🎲 Todas (${cats.reduce((n, k) => n + s.bank[k].length, 0)})` : `${c} (${s.bank[c].length})`); b.dataset.c = c; b.onclick = () => { cat = c; Sound.tock(); paintCats(); if (!match.done) next(); }; top.appendChild(b); });
  el.appendChild(top);
  const tools = Teams.tools(), rsel = h("span", "rounds-sel");
  function paintRounds() {
    rsel.innerHTML = `<b>Rodadas:</b> ` + [3, 5, 7, 10].map(n => `<button class="chip${n === ROUNDS ? " sel" : ""}" data-n="${n}">${n}</button>`).join("");
    rsel.querySelectorAll("button").forEach(b => b.onclick = () => { ROUNDS = +b.dataset.n; try { localStorage.setItem("nab3-u11-forca-rodadas", ROUNDS); } catch (e) {} Sound.tock(); paintRounds(); newMatch(); });
  }
  const bNew = h("button", "btn ghost", "🔄 Nova partida"); bNew.onclick = () => { Sound.whoosh(); newMatch(); };
  paintRounds(); tools.append(rsel, bNew); el.appendChild(tools);
  const arena = h("div", "hang-arena"), box = h("div", "card hang");
  arena.append(Teams.panel(0, { turn: true, score: t => match.pts[t], label: "pontos na partida" }), box, Teams.panel(1, { turn: true, score: t => match.pts[t], label: "pontos na partida" })); el.appendChild(arena);
  box.innerHTML = `<div class="hang-grid"><div class="hang-art">${HANG_SVG}<div class="lives"></div><div class="hang-worth"></div></div>
    <div class="hang-main"><div class="hang-round"></div><div class="hang-turn"></div><div class="row"><span class="tag hang-cat"></span><span class="tag hang-count"></span></div>
    <div class="word hang-word"></div><div class="hang-hint"></div><div class="hang-wrong"></div><div class="keys"></div><div class="fb"></div>
    <div class="hang-clock"></div><div class="row hang-actions"></div><div class="tans"></div></div></div><div class="match-end"></div>`;
  const $ = q => box.querySelector(q), parts = [...box.querySelectorAll(".part")], svg = $(".hang-svg");
  const keys = $(".keys");
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(L => { const b = h("button", null, L); b.dataset.l = L; b.onclick = () => guess(L); keys.appendChild(b); });
  const actions = $(".hang-actions");
  const bHint = h("button", "btn ghost", "💡 Mostrar dica (−2 ❤️)"), bNext = h("button", "btn", "Próxima palavra ›");
  let timeouts = 0;
  const errors = () => wrong.length + (hintOn ? HINT_COST : 0) + timeouts;
  /* ---- tempo: 1 minuto sem resposta -> contagem de 15 s -> perde 1 coração ---- */
  const IDLE = 60, COUNT = 15; let clockOn = true, tick = null, idleT0 = 0;
  try { clockOn = localStorage.getItem("nab3-u11-forca-tempo") !== "0"; } catch (e) {}
  const bClock = h("button", "btn ghost");
  const paintClockBtn = () => { bClock.textContent = clockOn ? "⏱ Tempo: ligado" : "⏱ Tempo: desligado"; };
  bClock.onclick = () => { clockOn = !clockOn; try { localStorage.setItem("nab3-u11-forca-tempo", clockOn ? "1" : "0"); } catch (e) {} paintClockBtn(); resetClock(); Sound.tock(); };
  function stopClock() { clearInterval(tick); tick = null; }
  function resetClock() {
    stopClock(); const c = $(".hang-clock"); c.className = "hang-clock"; c.innerHTML = "";
    const sl = el.closest(".slide"); if (!clockOn || over || !sl || !sl.classList.contains("on")) return;
    idleT0 = Date.now(); lostHere = 0; tick = setInterval(clockStep, 250); clockStep();
  }
  let lastSec = -1;
  function clockStep() {
    const c = $(".hang-clock"), el2 = Math.floor((Date.now() - idleT0) / 1000);
    if (el2 < IDLE) { c.className = "hang-clock"; c.innerHTML = `⏱ ${Math.floor(el2 / 60)}:${String(el2 % 60).padStart(2, "0")} sem resposta <small>(depois de 1:00 começa a contagem de ${COUNT} s)</small>`; return; }
    const left = COUNT - ((el2 - IDLE) % COUNT);
    if (left !== lastSec) { lastSec = left; if (left > 0) left <= 5 ? Sound.tick(1.4) : Sound.tock(); }
    // a cada 15 s depois do primeiro minuto, perde 1 coração (sem voltar para o minuto inteiro)
    const due = timeoutsDue(el2);
    if (due > lostHere) {
      lostHere++; timeouts++; byTime = true; parts[Math.min(MAX, errors()) - 1].classList.add("show"); Sound.error();
      const fb = $(".fb"); fb.className = "fb bad"; fb.innerHTML = `⏰ Mais 15 segundos sem resposta: a equipe perdeu 1 ❤️.`;
      lastSec = -1; paint(); if (over) return;
    }
    c.className = "hang-clock alert";
    c.innerHTML = `<span class="hc-num">${left}</span><span class="hc-txt">⏰ Respondam! A cada 15 segundos sem resposta, a equipe perde 1 ❤️</span><span class="hc-bar"><span style="width:${left / COUNT * 100}%"></span></span>`;
  }
  const timeoutsDue = sec => sec < IDLE ? 0 : Math.floor((sec - IDLE) / COUNT);
  let lostHere = 0, byTime = false;
  s._stop = stopClock;
  s.init = () => { if (cur && !over) resetClock(); };
  bHint.onclick = () => {
    if (over || hintOn || MAX - errors() <= HINT_COST) return;
    hintOn = true; for (let k = errors() - HINT_COST; k < errors(); k++) parts[k].classList.add("show");
    Sound.error(); paint(); resetClock();
  };
  bNext.onclick = () => { Sound.whoosh(); next(); };
  bNext.title = "Antes de terminar a palavra: troca por outra (não conta). Depois: passa para a próxima palavra.";
  const point = (t, n) => addPoints(t, n);
  let started = false;
  const paintTurn = () => { const t = Teams.turn, p = Teams.player(t); $(".hang-turn").innerHTML = `<span class="turn-badge t${t}">🎯 Vez: <b>${Teams.name(t)}</b>${p ? ` · joga <b>${p}</b>` : ""}</span>`; };
  paintClockBtn();
  [bHint, bNext, bClock].forEach(b => actions.appendChild(b));
  Teams.onChange(() => { if (cur) paintTurn(); });
  function paintCats() { top.querySelectorAll(".chip").forEach(b => b.classList.toggle("sel", b.dataset.c === cat)); }
  function pool() { return (cat === "Todas" ? cats : [cat]).flatMap(c => s.bank[c].map(([w, hint]) => ({ w, hint, c }))); }
  function paintRound() {
    const r = Math.min(ROUNDS, Math.floor(match.played / 2) + 1), w = match.played % 2 + 1, fin = match.played >= ROUNDS * 2;
    if (fin) { $(".hang-round").innerHTML = `<span class="round-badge">🏁 Partida concluída · ${ROUNDS} rodadas</span>`; return; }
    $(".hang-round").innerHTML = `<span class="round-badge">Rodada <b>${r}</b> de ${ROUNDS}</span><span class="round-dots">${Array.from({ length: ROUNDS * 2 }, (_, k) => `<i class="${k < match.played ? "d" : k === match.played ? "c" : ""}"></i>`).join("")}</span><small>palavra ${w} de 2 nesta rodada</small>`;
  }
  function finishMatch() {
    match.done = true; stopClock();
    const [a, b] = match.pts, na = Teams.name(0), nb = Teams.name(1), tie = a === b, wt = a > b ? 0 : 1;
    const end = box.querySelector(".match-end"); end.className = "match-end on" + (tie ? "" : " w" + wt);
    end.innerHTML = `<div class="me-card"><div class="me-trophy">${tie ? "🤝" : "🏆"}</div><div class="me-title">${tie ? "Empate!" : `${wt ? nb : na} venceu!`}</div>
      <div class="me-score"><span class="t0">${na} <b>${a}</b></span> × <span class="t1"><b>${b}</b> ${nb}</span></div><div class="me-sub">Fim das ${ROUNDS} rodadas · ${ROUNDS * 2} palavras</div>
      <button class="btn green me-new">🔄 Nova partida</button></div>`;
    end.querySelector(".me-new").onclick = () => { Sound.whoosh(); newMatch(); };
    setTimeout(() => { Sound.fanfare(); confetti(160); }, 700);
  }
  function newMatch() {
    match.played = 0; match.pts = [0, 0]; match.done = false; const end = box.querySelector(".match-end"); end.className = "match-end"; end.innerHTML = "";
    if (over) Teams.nextTurn(); over = false; Teams.refresh(); next();
  }
  function next() {
    if (match.done) return;
    let p = pool().filter(x => !used.has(x.w)); if (!p.length) { pool().forEach(x => used.delete(x.w)); p = pool(); }
    cur = p[Math.floor(Math.random() * p.length)]; used.add(cur.w);
    if (started && over) Teams.nextTurn(); started = true; paintTurn(); paintRound();
    guessed = new Set(); wrong = []; timeouts = 0; byTime = false; over = false; hintOn = false;
    svg.classList.remove("lost", "won"); parts.forEach(pt => pt.classList.remove("show"));
    keys.querySelectorAll("button").forEach(b => { b.disabled = false; b.className = ""; });
    const fb = $(".fb"); fb.className = "fb"; fb.textContent = ""; bNext.textContent = "⤼ Trocar palavra"; paint(); resetClock();
  }
  function letters() { return [...cur.w].filter(c => /[A-ZÀ-Ü]/i.test(c)); }
  function guess(L) {
    if (over || guessed.has(L)) return; guessed.add(L);
    const k = keys.querySelector(`[data-l="${L}"]`); k.disabled = true;
    if (letters().some(c => norm(c) === L)) { k.className = "hit"; Sound.pop(); }
    else { k.className = "miss"; wrong.push(L); parts[errors() - 1].classList.add("show"); Sound.error(); $(".hang-word").classList.remove("shake"); void box.offsetWidth; $(".hang-word").classList.add("shake"); }
    const fb = $(".fb"); if (fb.textContent.startsWith("⏰")) { fb.className = "fb"; fb.textContent = ""; }
    paint(true); resetClock();
  }
  function paint(fromGuess) {
    setTimeout(phoneSync, 0);
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
    const left = Math.max(0, MAX - errors()); $(".hang-worth").innerHTML = over ? "" : `Esta palavra vale <b>${left} ${left === 1 ? "ponto" : "pontos"}</b>`;
    $(".tans").textContent = "Resposta: " + cur.w;
    if (!over && (won || lost)) {
      $(".hang-worth").innerHTML = "";
      over = true; stopClock(); $(".hang-clock").innerHTML = ""; $(".hang-clock").className = "hang-clock"; keys.querySelectorAll("button").forEach(b => b.disabled = true);
      const fb = $(".fb");
      const t = Teams.turn, other = Teams.name(t ? 0 : 1);
      const pts = MAX - errors(); match.played++; if (won) match.pts[t] += pts; const last = match.played >= ROUNDS * 2;
      if (won) { svg.classList.add("won"); point(t, pts); fb.className = "fb ok"; fb.innerHTML = `🎉 Acertou: <b>${cur.w}</b>! <b>+${pts} ${pts === 1 ? "ponto" : "pontos"} para ${Teams.name(t)}</b> (${pts} ❤️ ${pts === 1 ? "restante" : "restantes"}). Agora diga uma frase com essa palavra. ${last ? "" : `Próxima palavra: vez de <b>${other}</b>.`}`; win(); }
      else { svg.classList.add("lost"); fb.className = "fb bad"; fb.innerHTML = `${byTime && fb.textContent.startsWith("⏰") ? "⏰ O tempo acabou com os corações! " : "😵 Não foi desta vez. "}A palavra era <b>${cur.w}</b>. ${Teams.name(t)} não pontuou nesta palavra. ${last ? "" : `Próxima palavra: vez de <b>${other}</b>.`}`; Sound.error(); }
      Teams.refresh(); paintRound(); bNext.textContent = last ? "🏁 Ver resultado" : "Próxima palavra ›"; if (last) { bNext.textContent = "🏁 Resultado"; setTimeout(finishMatch, 1600); }
    }
  }
  // teclado do computador
  const onKey = e => {
    if (!el.closest(".slide").classList.contains("on") || /TEXTAREA|INPUT/.test(e.target.tagName) || e.metaKey || e.ctrlKey || e.altKey) return;
    const L = norm(e.key); if (/^[A-Z]$/.test(L)) { e.preventDefault(); guess(L); } else if (e.key === "Enter" && over && !match.done) next();
  };
  document.addEventListener("keydown", onKey);
  /* celular: só a palavra mascarada, nunca a palavra inteira */
  s._phone = () => {
    if (!cur) return null; const p = phoneTurn(); if (!p) return null;
    const id = `forca-${S.indexOf(s)}-${match.played}-${used.size}`;
    if (over || match.done) return { kind: "wait", id, title: s.title, turn: p, note: over ? "A palavra era: " + cur.w : "" };
    return { kind: "letters", id, only: p, title: s.title, cat: cur.c, mask: [...cur.w].map(c => !/[A-ZÀ-Ü]/i.test(c) ? c : guessed.has(norm(c)) ? c : "_"), used: [...guessed], wrong, lives: Math.max(0, MAX - errors()) };
  };
  s._pick = L => { if (/^[A-Z]$/.test(String(L))) guess(String(L)); };
  paintCats(); next();
  el.appendChild(h("p", "tip", "Toque nas letras ou use o teclado do computador. Os acentos e o Ç aparecem sozinhos (A revela Á, Ã, Â; C revela Ç). Enter = próxima palavra. A partida tem rodadas (em cada rodada, cada equipe joga uma palavra) e no final aparece a equipe vencedora. “⤼ Trocar palavra” troca a palavra sem contar. Depois de 1 minuto sem resposta, a equipe perde 1 coração a cada 15 s; se os corações acabarem, a palavra aparece e a equipe perde. A dica custa 2 corações. Os pontos valem os corações que sobrarem (sem erros = 6 pontos). A vez alterna entre as equipes a cada palavra; arraste um nome (ou toque nele) para mudar a pessoa de equipe."));
}
/* ---------- corrida contra o relógio: em equipes, cada pergunta é de uma equipe; mais rápido = mais pontos ---------- */
function R_race(s, el) {
  header(s, el, "Jogo");
  const act = newAct(`Acertou com ${Math.ceil(s.secs * 2 / 3)}+ s sobrando = 3 pts · ${Math.ceil(s.secs / 3)}+ s = 2 · depois = 1`); turnBar(el, act);
  const box = h("div", "card"); el.appendChild(box); let qi, hits, timer, left, live = null;
  const speedPts = l => l >= Math.ceil(s.secs * 2 / 3) ? 3 : l >= Math.ceil(s.secs / 3) ? 2 : 1;
  function start() {
    clearInterval(timer); qi = 0; hits = 0; live = null; phoneSync(); act.tally = [0, 0]; act.bar(); box.innerHTML = "";
    const b = h("button", "btn green", "▶ Começar o desafio"); b.onclick = () => { Sound.boom(); ask(); };
    box.appendChild(h("p", null, `${s.items.length} perguntas · ${s.secs} segundos cada.${teamMode ? " As equipes se alternam a cada pergunta." : ""}`)); box.appendChild(b);
  }
  function ask() {
    clearInterval(timer);
    if (qi >= s.items.length) {
      live = null; phoneSync();
      box.innerHTML = ""; const r = h("button", "btn", "Jogar de novo"); r.onclick = start;
      suspense(1.5).then(() => { box.innerHTML = `<div class="big-q" style="animation:stamp .6s">🏁 Fim! ${hits} de ${s.items.length} acertos.</div>${teamMode ? resultHTML(act) : ""}`; box.appendChild(r); win(); });
      return;
    }
    const q = s.items[qi]; left = s.secs; box.innerHTML = "";
    box.appendChild(h("div", "row", `<span class="tag">Pergunta ${qi + 1} de ${s.items.length}</span>${teamMode ? `<span class="turn-badge t${Teams.turn}" style="margin:0">${Teams.name(Teams.turn)}${Teams.player(Teams.turn) ? " · " + Teams.player(Teams.turn) : ""}</span>` : ""}<span style="flex:1"></span><span class="timer">${left}</span>`));
    const bar = h("div", "timerbar", "<div style='width:100%'></div>"); box.appendChild(bar); box.appendChild(h("div", "big-q", q.q));
    const o = h("div", "opts"), fb = h("div", "fb"), order = shuffle(q.o.map((_, i) => i)); let answered = false;
    order.forEach(i => {
      const b = h("button", "opt", q.o[i]);
      b.onclick = () => {
        if (answered) return; answered = true; clearInterval(timer); const ok = i === q.a; judge(ok); b.classList.add(ok ? "ok" : "bad");
        let msg = "";
        if (ok) { hits++; msg = award(act, speedPts(left)); } else o.children[order.indexOf(q.a)].classList.add("ok");
        msg += passTurn(act);
        fb.className = "fb " + (ok ? "ok" : "bad"); fb.innerHTML = (ok ? "✅ Correto!" : "❌ A resposta é: " + q.o[q.a] + ".") + msg; next();
      };
      o.appendChild(b);
    });
    box.appendChild(o); box.appendChild(fb);
    function next() { const n = h("button", "btn", qi === s.items.length - 1 ? "Ver resultado ›" : "Próxima ›"); n.style.marginTop = "10px"; n.onclick = () => { qi++; Sound.whoosh(); ask(); }; box.appendChild(n); }
    live = { q, order, o, isDone: () => answered }; phoneSync();
    timer = setInterval(() => {
      left--; const t = box.querySelector(".timer"); t.textContent = left; bar.firstChild.style.width = (left / s.secs * 100) + "%";
      if (left <= 3) { t.classList.add("low"); Sound.tick(1.4); } else Sound.tock();
      if (left <= 0) { clearInterval(timer); answered = true; Sound.error(); fb.className = "fb bad"; fb.innerHTML = "⏰ Tempo esgotado! Resposta: " + q.o[q.a] + "." + passTurn(act); o.children[order.indexOf(q.a)].classList.add("ok"); next(); }
    }, 1000);
  }
  s._phone = () => {
    if (!live) return null; const p = phoneTurn(); if (!p) return null;
    const id = `race-${S.indexOf(s)}-${qi}`;
    if (live.isDone()) return { kind: "wait", id, title: s.title, turn: p, note: "Resposta certa: " + live.q.o[live.q.a] };
    return { kind: "choice", id, only: p, title: s.title, n: `Pergunta ${qi + 1} de ${s.items.length}`, q: live.q.q, o: live.order.map(i => ({ t: live.q.o[i] })), secs: s.secs };
  };
  s._pick = i => { const b = live && live.o.children[i]; b && b.click(); };
  start(); s._stop = () => clearInterval(timer);
}
/* ---------- onde está? ---------- */
function R_where(s, el) {
  header(s, el, "Jogo");
  const act = newAct("Acertou = 2 pts · a vez alterna a cada rodada"); turnBar(el, act);
  const pos = ["em cima do", "embaixo do", "à esquerda do", "à direita do"], shapes = ["círculo", "triângulo", "losango", "retângulo"];
  const box = h("div", "card"); el.appendChild(box); let n = 0, hits = 0, live = null;
  const art = s => s === "retângulo" ? "o" : "o";
  function round() {
    box.innerHTML = ""; const sh = shapes[Math.floor(Math.random() * shapes.length)], p = Math.floor(Math.random() * 4);
    const off = [[0, -95], [0, 95], [-115, 0], [115, 0]][p], cx = 210 + off[0], cy = 150 + off[1];
    const shapeSvg = SH[sh].replace('<svg viewBox="0 0 100 100">', `<svg x="${cx - 35}" y="${cy - 35}" width="70" height="70" viewBox="0 0 100 100">`);
    box.classList.add("qwide");
    box.appendChild(h("div", "qimg board", `<svg viewBox="0 0 420 300"><rect x="170" y="110" width="80" height="80" fill="#3f8a4b"/>${shapeSvg}</svg>`));
    box.appendChild(h("div", "row", `<span class="tag">Rodada ${n + 1}</span><span class="tag">Acertos: ${hits}</span>`));
    box.appendChild(h("div", "big-q", `Onde está ${art(sh)} ${sh}?`));
    const o = h("div", "opts"), fb = h("div", "fb"); let done = false;
    pos.forEach((t, i) => {
      const b = h("button", "opt", `${art(sh) === "o" ? "O" : "A"} ${sh} está ${t} quadrado.`);
      b.onclick = () => {
        if (done) return; done = true; b.classList.add("wait");
        suspense(1.2).then(() => {
          b.classList.remove("wait"); const ok = i === p; judge(ok); b.classList.add(ok ? "ok" : "bad"); if (ok) hits++; else o.children[p].classList.add("ok");
          const msg = (ok ? award(act, 2) : "") + passTurn(act);
          fb.className = "fb " + (ok ? "ok" : "bad"); fb.innerHTML = (ok ? "✅ Isso! Agora diga a frase em voz alta." : "❌ Observe de novo: " + o.children[p].textContent) + msg;
          const nx = h("button", "btn", "Nova rodada ›"); nx.style.marginTop = "10px"; nx.onclick = () => { n++; Sound.whoosh(); round(); }; box.appendChild(nx);
        });
      };
      o.appendChild(b);
    });
    box.appendChild(o); box.appendChild(fb);
    live = { q: `Onde está ${art(sh)} ${sh}? (olhe a figura na tela)`, o, opts: [...o.children].map(b => b.textContent), right: o.children[p].textContent, isDone: () => done, isOver: () => !!box.querySelector(".fb.ok, .fb.bad") }; phoneSync();
  }
  s._phone = () => {
    if (!live) return null; const p = phoneTurn(); if (!p) return null;
    const id = `where-${S.indexOf(s)}-${n}`;
    if (live.isOver()) return { kind: "wait", id, title: s.title, turn: p, note: "Resposta certa: " + live.right };
    return { kind: "choice", id, only: p, title: s.title, n: `Rodada ${n + 1}`, q: live.q, o: live.opts.map(t => ({ t })), busy: live.isDone() };
  };
  s._pick = i => { const b = live && live.o.children[i]; b && b.click(); };
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
  el.appendChild(h("div", "card", `<b>Material de origem</b><p style="font-size:17px">${LESSON.source}</p>`));
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
  <div class="goal">🎯 ${s.goal}</div></div><div class="foot">${LESSON.foot}</div>`;
}
function R_img(s, el) { el.classList.add("imgslide"); el.innerHTML = `<img src="${I(s.src)}" alt="${s.menu}">`; }
function R_html(s, el) { el.innerHTML = s.html; }
/* ---------- "Quanto você tem?": um aluno por vez (no quadro ou no celular), preços escondidos, faturas no final ---------- */
function R_tally(s, el) {
  header(s, el, "Aquecimento");
  const id = "tally-" + S.indexOf(s), KEY = "nab3-u11-" + id;
  const money = n => "R$ " + n.toLocaleString("pt-BR");
  let st = { res: {}, revealed: false }; try { st = Object.assign(st, JSON.parse(localStorage.getItem(KEY)) || {}); } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  let showPrices = false, turn = null, order = null, editing = false;
  const totalOf = picks => picks.reduce((a, i) => a + s.items[i][1], 0);
  const roster = () => { const base = order || Roleta.allNames(); return [...base, ...Object.keys(st.res).filter(n => !base.includes(n))]; };
  const nextName = () => roster().find(n => !st.res[n]) || null;

  const bar = h("div", "tally-bar"), list = h("div", "tally"), act = h("div", "row tally-act"), chips = h("div", "tally-chips"), board = h("div", "tally-board");
  el.append(bar, list, act, chips, board);
  const boxes = s.items.map(([txt, v]) => {
    const l = h("label", "tally-item", `<input type="checkbox"><span class="tt">${txt}</span><span class="tv">${money(v)}</span>`); list.appendChild(l);
    const c = l.querySelector("input"); c.onchange = () => { l.classList.toggle("on", c.checked); c.checked ? Sound.pop() : Sound.tock(); }; return c;
  });
  const setPicks = picks => boxes.forEach((c, i) => { c.checked = picks.includes(i); c.parentNode.classList.toggle("on", c.checked); });
  const picked = () => boxes.map((c, i) => c.checked ? i : -1).filter(i => i >= 0);

  const bOk = h("button", "btn green", "✔ Confirmar e passar a vez"), bSkip = h("button", "btn ghost", "⏭ Pular"), bMix = h("button", "btn ghost", "🔀 Sortear a ordem");
  const bPrice = h("button", "btn ghost"), bQR = h("button", "btn gold", "📱 Responder pelo celular"), bShow = h("button", "btn", "🧾 Revelar faturas"), bZero = h("button", "btn ghost", "🗑 Zerar");
  act.append(bOk, bSkip, bMix, bPrice, bQR, bShow, bZero);

  function paint() {
    list.classList.toggle("hide-prices", !showPrices);
    bPrice.textContent = showPrices ? "🙈 Esconder preços" : "👁 Mostrar preços";
    if (turn && st.res[turn] && !editing) turn = null;
    if (!turn) turn = nextName();
    const done = roster().filter(n => st.res[n]).length, all = roster().length;
    bar.innerHTML = st.revealed ? `<span class="turn-badge t0">🧾 Faturas reveladas</span>`
      : turn ? `<span class="turn-badge t0">🎯 Vez de: <b>${turn}</b></span><span class="tally-prog">${done} de ${all} já responderam</span>`
      : `<span class="turn-badge t1">✅ Todos responderam!</span><span class="tally-prog">Toque em “🧾 Revelar faturas”.</span>`;
    [list, bOk, bSkip, bMix].forEach(x => x.style.display = st.revealed ? "none" : "");
    bOk.disabled = !turn; bSkip.disabled = !turn;
    bShow.textContent = st.revealed ? "↩ Voltar ao jogo" : "🧾 Revelar faturas";
    chips.innerHTML = st.revealed ? "" : roster().map(n => { const r = st.res[n]; return `<button class="tchip ${r ? "done" : ""} ${n === turn ? "cur" : ""}" data-n="${n.replace(/"/g, "&quot;")}" title="${r ? "Toque para refazer" : "Toque para jogar agora"}">${r ? (r.via === "phone" ? "📱" : "✔") : "…"} ${n}</button>`; }).join("");
    chips.querySelectorAll(".tchip").forEach(b => b.onclick = () => { turn = b.dataset.n; editing = !!st.res[turn]; setPicks(st.res[turn] ? st.res[turn].picks : []); Sound.tock(); paint(); });
    board.innerHTML = st.revealed ? boardHTML() : "";
    fitSoon();
    if (S[cur] === s) Sala.setActivity(phone());
  }
  function fitSoon() { if (S[cur] === s) setTimeout(fit, 30); }
  function record(name, picks, via) { st.res[name] = { picks, via, at: Date.now() }; save(); }
  bOk.onclick = () => { if (!turn) return; record(turn, picked(), "board"); Sound.success(); turn = null; editing = false; setPicks([]); paint(); };
  bSkip.onclick = () => { const r = roster().filter(n => !st.res[n]); if (r.length < 2) return; const i = r.indexOf(turn); turn = r[(i + 1) % r.length]; setPicks([]); Sound.whoosh(); paint(); };
  bMix.onclick = () => { order = shuffle(Roleta.allNames()); turn = null; Sound.whoosh(); paint(); };
  bPrice.onclick = () => { showPrices = !showPrices; Sound.tock(); paint(); };
  bQR.onclick = () => Sala.open();
  bZero.onclick = () => { if (bZero.dataset.sure !== "1") { bZero.dataset.sure = "1"; bZero.textContent = "🗑 Toque de novo para zerar"; setTimeout(() => { bZero.dataset.sure = ""; bZero.textContent = "🗑 Zerar"; }, 2500); return; }
    st = { res: {}, revealed: false }; save(); turn = null; order = null; setPicks([]); bZero.dataset.sure = ""; bZero.textContent = "🗑 Zerar"; Sound.whoosh(); paint(); Sala.setActivity(phone()); };
  bShow.onclick = () => { if (st.revealed) { st.revealed = false; save(); paint(); Sala.setActivity(phone()); return; } reveal(); };

  function ranking() { const rk = Object.entries(st.res).map(([n, r]) => [n, totalOf(r.picks), r]).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])); rk.forEach(x => x.push(1 + rk.filter(y => y[1] > x[1]).length)); return rk; }
  function boardHTML() {
    const rk = ranking(); if (!rk.length) return `<div class="card">Ninguém respondeu ainda.</div>`;
    const top = rk.map(([n, t, , pos]) => `<div class="tb-row ${pos === 1 ? "first" : ""}"><span class="tb-pos">${pos === 1 ? "👑" : pos + "º"}</span><span class="tb-name">${n}</span><b>${money(t)}</b></div>`).join("");
    const bills = rk.map(([n, t, r], i) => `<div class="bill" style="animation-delay:${(rk.length - 1 - i) * 0.35}s"><div class="bill-h">🧾 Fatura de <b>${n}</b>${r.via === "phone" ? " · 📱" : ""}</div>
      ${r.picks.length ? r.picks.map(k => `<div class="bill-l"><span>${s.items[k][0]}</span><span>${money(s.items[k][1])}</span></div>`).join("") : `<div class="bill-l"><span>Nada marcado. Um anjo! 😇</span><span>${money(0)}</span></div>`}
      <div class="bill-t"><span>TOTAL</span><span>${money(t)}</span></div></div>`).join("");
    return `<div class="tb"><h3>🏆 Placar: quem tem mais?</h3>${top}</div><div class="bills">${bills}</div>`;
  }
  function reveal() {
    st.revealed = true; save(); paint();
    const rk = ranking(); Sound.whoosh();
    setTimeout(() => { Sound.fanfare(); confetti(120); }, Math.max(1, rk.length) * 350);
    rk.forEach(([n, t, r, pos]) => Sala.sendToName(n, { t: "reveal", id, rank: pos, of: rk.length, total: t, lines: r.picks.map(k => s.items[k]) }));
    Sala.setActivity(phone());
  }
  /* celular: recebe a lista SEM preços */
  function phone() { if (!st.revealed && !turn) return { kind: "wait", id, title: s.title.replace(/^\W+/, ""), note: "Todos já responderam. Aguarde as faturas! 🧾" }; return { only: st.revealed ? undefined : turn, kind: "tally", id, title: s.title.replace(/^\W+/, ""), lead: "Marque tudo o que você já fez. Os preços só aparecem no final! 🤫", items: s.items.map(x => x[0]), open: !st.revealed }; }
  s._phone = phone;
  Sala.on("tally", (d, name, reply) => {
    if (d.id !== id) return;
    if (st.revealed) { reply({ t: "closed", id }); return; }
    if (name !== turn) { reply({ t: "act", act: Sala.view(phone(), name) }); return; }   // só responde quem está na vez
    const picks = (Array.isArray(d.picks) ? d.picks : []).map(Number).filter(i => i >= 0 && i < s.items.length);
    record(name, [...new Set(picks)], "phone"); if (name === turn) { editing = false; setPicks([]); } reply({ t: "ok", id }); Sound.pop(); paint();
  });
  window.addEventListener("roleta-nomes", paint);
  if (s.tip) el.appendChild(h("p", "tip", s.tip));
  paint();
}
/* ---------- embaralha as opções (a resposta certa não fica sempre em primeiro) ----------
   Ordem aleatória, sorteada de novo cada vez que a aula é aberta. */
(function shuffleOptions() {
  S.forEach(s => (s.items || []).forEach(q => {
    if (!q || !Array.isArray(q.o) || typeof q.a !== "number" || q.o.length < 2) return;
    const right = q.o[q.a], o = q.o.slice();
    for (let i = o.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [o[i], o[j]] = [o[j], o[i]]; }
    q.o = o; q.a = o.indexOf(right);
  }));
})();
const R = { cover: R_cover, img: R_img, html: R_html, mc: R_mc, photoquiz: R_photoquiz, fill: R_fill, reveal: R_reveal, memory: R_memory, gallery: R_gallery, photos: R_photos, sort: R_sort, order: R_order, match: R_match, role: R_role, hangman: R_hangman, race: R_race, where: R_where, wheel: R_wheel, credits: R_credits, tally: R_tally };

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
  Sala.setActivity(S[cur]._phone ? S[cur]._phone() : null);
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
function addPoints(t, n) {
  if (!n) return; score[t] += n; const el = document.getElementById(t ? "sb" : "sa"); el.textContent = score[t]; restart(el, "bump"); Teams.refresh();
}
document.querySelectorAll(".score button").forEach(b => b.onclick = () => {
  const t = +b.dataset.t, d = +b.dataset.d; score[t] = Math.max(0, score[t] + d);
  const el = document.getElementById(t ? "sb" : "sa"); el.textContent = score[t]; restart(el, "bump");
  d > 0 ? Sound.success() : Sound.tock(); Teams.refresh();
});
Roleta.init();
Notes.init();
Teams.init();
Sala.init();
Teams.onChange(phoneSync);
Sala.on("choice", (d, name, reply) => {
  const s = S[cur], a = s && s._phone ? s._phone() : null;
  if (!a || a.only !== name || a.id !== d.id || a.busy) { reply({ t: "act", act: Sala.view(a, name) }); return; }
  s._pick(d.i);
});
const start = Math.max(0, (parseInt(location.hash.slice(1)) || 1) - 1);
cur = start; go(start, true); if (!els[start].classList.contains("on")) { build(start); els[start].classList.add("on"); }
