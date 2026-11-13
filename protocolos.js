/* =====================================================================
   PROTOCOLOS ANIMADOS — compartilhado por todas as aulas.
   Troca os slides-imagem "protocolos-online" e "protocolos-presenciais"
   por slides em que cada item aparece a cada clique em "Próxima →"
   (ou seta →, PageDown, passador de slides). "← Anterior" esconde o último.
   Texto: protocolos Intercultura (iguais em todos os PDFs dos flipcharts).
   ===================================================================== */
(() => {
  if (typeof S === "undefined") return;

  /* ---------- ilustrações (SVG 64×64; .f = preenchimento suave, .a = destaque) ---------- */
  const P = 'fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"';
  const svg = body => `<svg viewBox="0 0 64 64" ${P} aria-hidden="true">${body}</svg>`;
  const proib = '<circle cx="32" cy="32" r="27" class="no"/><path d="M13 13 51 51" class="no"/>';
  const ICON = {
    notebook: svg('<rect x="10" y="14" width="44" height="28" rx="3" class="f"/><path d="M4 48h56l-4 5H8z"/><circle cx="32" cy="27" r="5" class="a"/><path d="M24 38c2-4 14-4 16 0"/>'),
    escola: svg('<path d="M8 28 32 12l24 16" /><rect x="12" y="28" width="40" height="26" class="f"/><rect x="27" y="38" width="10" height="16" class="a"/><path d="M18 34h5M41 34h5M32 4v8M32 4h8v5h-8"/>'),
    wifi: svg('<path d="M8 26a34 34 0 0 1 48 0"/><path d="M16 34a22 22 0 0 1 32 0"/><path d="M24 42a10 10 0 0 1 16 0"/><circle cx="32" cy="50" r="4" class="a"/>'),
    falar: svg('<path d="M6 14a6 6 0 0 1 6-6h24a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6H20l-8 7v-7a6 6 0 0 1-6-6z" class="f"/><path d="M58 30a5 5 0 0 0-5-5H46v4a9 9 0 0 1-9 9H28v4a5 5 0 0 0 5 5h12l7 6v-6a5 5 0 0 0 6-5z" class="a"/><path d="M14 20h20"/><path d="M14 26h12"/>'),
    camera: svg('<rect x="6" y="18" width="36" height="28" rx="5" class="f"/><path d="M42 27l16-8v26l-16-8z" class="a"/><circle cx="18" cy="30" r="3"/>'),
    relogio: svg('<circle cx="32" cy="34" r="22" class="f"/><path d="M32 20v14l9 6"/><path d="M24 6h16M32 6v6"/><circle cx="32" cy="34" r="3" class="a"/>'),
    meia: svg('<circle cx="32" cy="32" r="24" class="f"/><path d="M32 32V8a24 24 0 0 1 24 24z" class="a"/><path d="M32 18v14h10"/>'),
    apps: svg('<rect x="12" y="10" width="40" height="44" rx="6" class="f"/><rect x="18" y="17" width="10" height="10" rx="2"/><rect x="36" y="17" width="10" height="10" rx="2"/><rect x="18" y="35" width="10" height="10" rx="2"/><path d="M38 36l9 5-9 5z" class="a"/>' + proib),
    microfone: svg('<rect x="23" y="6" width="18" height="30" rx="9" class="a"/><path d="M14 30a18 18 0 0 0 36 0"/><path d="M32 48v9M22 57h20"/><path d="M27 16h10M27 23h10" />'),
    email: svg('<rect x="6" y="14" width="52" height="36" rx="5" class="f"/><path d="M8 17l24 18 24-18"/><circle cx="50" cy="48" r="10" class="a"/><path d="M45 48l4 4 6-7"/>'),
    camisa: svg('<path d="M22 8 8 16l5 12 7-3v31h24V25l7 3 5-12-14-8c-2 5-6 7-10 7s-8-2-10-7z" class="f"/><path d="M32 22v6M32 34v2M32 42v2"/>'),
    alcool: svg('<path d="M20 10h18l-2 18a7 7 0 0 1-14 0z" class="f"/><path d="M29 35v14M22 50h14"/><path d="M40 44h16v6H40z" class="a"/>' + proib),
    alerta: svg('<path d="M32 6 60 54H4z" class="f"/><path d="M32 24v14"/><circle cx="32" cy="46" r="2.5" class="a"/>'),
    calendario: svg('<rect x="8" y="12" width="48" height="42" rx="5" class="f"/><path d="M8 24h48M20 6v10M44 6v10"/><path d="M15 32l6 6m0-6-6 6M29 32l6 6m0-6-6 6M43 32l6 6m0-6-6 6" class="x"/><path d="M15 46h34"/>'),
    mao: svg('<path d="M22 34V14a4 4 0 0 1 8 0v16-20a4 4 0 0 1 8 0v20-16a4 4 0 0 1 8 0v22c0 12-6 20-16 20-7 0-11-4-14-9l-6-11a4 4 0 0 1 7-4l5 6" class="f"/><path d="M8 10l4 4M56 10l-4 4M32 2v5" class="a"/>'),
  };

  const ONLINE = [
    ["wifi", "Internet estável", "Ter uma conexão de internet estável e com banda suficiente."],
    ["falar", "Só em português", "Comunicar-se somente em português durante a aula principal e nas salas de descanso (breakout rooms)."],
    ["camera", "Câmera ligada", "O uso da câmera durante toda a aula é essencial. Se o aluno não tiver câmera, poderá optar pelos cursos presenciais. Se não ligar a câmera ou desligá-la durante a aula, será considerado ausente, afetando a porcentagem de frequência. Após 3 faltas consecutivas, o aluno será desativado."],
    ["relogio", "Frequência e pontualidade", "A frequência representa 10% da nota. A pontualidade é fundamental: conectar-se após os primeiros 10 minutos é considerado atraso, e 3 atrasos equivalem a 1 falta. Conectar-se após os primeiros 30 minutos é considerado uma falta."],
    ["apps", "Sem outros aplicativos", "Não se conecte a outros aplicativos, como Netflix, jogos on-line, redes sociais etc."],
    ["microfone", "Participação ativa", "Participe ativamente. O microfone não deve ficar mudo durante a maior parte da aula."],
    ["email", "Faltas justificadas", "Justifique as faltas por e-mail ao professor em até 2 dias corridos. São justificativas válidas: falecimento de parente de 1º ou 2º grau, doença, incapacidade, casamento, nascimento de filho(a) ou trabalho/estudo."],
    ["camisa", "Roupa adequada", "Vestir-se adequadamente durante a aula."],
    ["alcool", "Sem álcool, drogas ou cigarro", "Não consumir álcool, drogas ou entorpecentes, nem fumar durante o horário de aula."],
    ["alerta", "Ambiente adequado", "Se a câmera mostrar alguma situação ou som fora do comum, o professor removerá o aluno da aula; nesse caso, o dia será registrado como falta injustificada, sem direito a justificativa."],
  ];
  const PRESENCIAIS = [
    ["falar", "Só em português", "Comunicar-se somente em português durante toda a aula."],
    ["relogio", "Frequência e pontualidade", "Lembre-se de que a frequência representa 10% da nota. A pontualidade é fundamental: chegar à aula após os primeiros 10 minutos é considerado atraso, e 3 atrasos equivalem a 1 falta."],
    ["meia", "Mais de 30 minutos = falta", "Chegar à aula após os primeiros 30 minutos é considerado uma falta."],
    ["calendario", "3 faltas seguidas", "Ao acumular 3 faltas consecutivas, o aluno é desativado da aula. Nesse caso, deverá entrar em contato com a Recepção para realizar o processo de reingresso."],
    ["mao", "Participação ativa", "Participar ativamente durante toda a aula."],
    ["email", "Faltas justificadas", "Justifique as faltas por e-mail ao professor em até 2 dias corridos. Lembre-se de que, caso não justifique dentro desse prazo, o professor registrará como falta injustificada. São justificativas válidas: falecimento de parente de 1º ou 2º grau, doença, incapacidade, casamento, nascimento de filho(a) ou trabalho/estudo."],
    ["camisa", "Roupa com decoro", "Vestir-se com decoro durante as aulas."],
    ["alcool", "Sem álcool ou drogas", "Não comparecer à aula sob efeito de álcool, drogas ou entorpecentes; o consumo dessas substâncias também é proibido dentro da instituição."],
  ];
  const DECKS = {
    "protocolos-online": { titulo: "Aulas online", icon: "notebook", itens: ONLINE },
    "protocolos-presenciais": { titulo: "Aulas presenciais", icon: "escola", itens: PRESENCIAIS },
  };

  const pasta = (location.pathname.match(/\/(nab[123]|via)[^/]*\/[^/]*$/) || [])[1] || "nab3";
  const COR = { nab1: "#006b4f", nab2: "#145da1", nab3: "#6b4598", via: "#a6462d" }[pasta];
  const esc = t => t.replace(/&/g, "&amp;").replace(/</g, "&lt;");

  function html(d) {
    const lista = d.itens.map(([ic, t], i) => `<li class="pt-i" data-i="${i + 1}"><b>${i + 1}</b><span class="pt-ic">${ICON[ic]}</span><span class="pt-t">${esc(t)}</span></li>`).join("");
    return `<div class="proto" style="--pc:${COR}">
      <div class="pt-top"><span class="pt-k">Intercultura · Combinados da turma</span><h1>${d.titulo} · <span>Protocolos</span></h1></div>
      <div class="pt-body">
        <ol class="pt-lista">${lista}</ol>
        <div class="pt-palco" aria-live="polite"></div>
      </div>
      <div class="pt-dots">${d.itens.map((_, i) => `<i data-i="${i + 1}"></i>`).join("")}</div>
    </div>`;
  }

  function palco(el, d, k) {
    const p = el.querySelector(".pt-palco");
    if (!k) {
      p.innerHTML = `<div class="pt-card pt-intro"><div class="pt-ilu">${ICON[d.icon]}</div>
        <h2>${d.itens.length} combinados para ${d.titulo.toLowerCase().replace("aulas", "as aulas")}</h2>
        <p>Clique em <b>Próxima →</b> para ver cada um.</p></div>`;
    } else {
      const [ic, t, txt] = d.itens[k - 1];
      p.innerHTML = `<div class="pt-card"><div class="pt-n">${k}<small>/ ${d.itens.length}</small></div>
        <div class="pt-ilu">${ICON[ic]}</div><h2>${esc(t)}</h2><p>${esc(txt)}</p></div>`;
    }
  }

  function pinta(el, st) {
    el.querySelectorAll(".pt-i").forEach(li => {
      const i = +li.dataset.i;
      li.classList.toggle("on", i <= st.shown); li.classList.toggle("cur", i === st.view);
    });
    el.querySelectorAll(".pt-dots i").forEach(x => x.classList.toggle("on", +x.dataset.i <= st.shown));
    palco(el, st.d, st.view);
  }

  const estado = new WeakMap();
  S.forEach((s, idx) => {
    const d = s.type === "img" && DECKS[s.src]; if (!d) return;
    S[idx] = {
      type: "html", menu: s.menu, html: html(d),
      init(sl) {
        const el = sl.querySelector(".proto"), volta = sl.classList.contains("in-left");
        const st = { d, shown: volta ? d.itens.length : 0, view: volta ? d.itens.length : 0 };
        estado.set(el, st); pinta(el, st);
        el.onclick = e => {
          const li = e.target.closest(".pt-i, .pt-dots i"); if (!li) return;
          const i = +li.dataset.i; st.view = i; if (i > st.shown) st.shown = i; som(); pinta(el, st);
        };
      },
    };
  });

  function som(back) { try { back ? Sound.whoosh() : Sound.pop(); } catch (e) {} }
  function ativo() { const el = document.querySelector(".slide.on .proto"); return el && estado.get(el) ? [el, estado.get(el)] : null; }
  function passo(dir) {
    const a = ativo(); if (!a) return false; const [el, st] = a, n = st.d.itens.length;
    if (dir > 0) { if (st.shown >= n && st.view >= n) return false; st.shown = Math.max(st.shown, st.view + 1); st.view = st.shown; som(); }
    else { if (st.shown <= 0) return false; st.shown--; st.view = st.shown; som(1); }
    pinta(el, st); return true;
  }
  document.addEventListener("click", e => {
    const b = e.target.closest && e.target.closest("#bNext, #bPrev"); if (!b) return;
    if (passo(b.id === "bNext" ? 1 : -1)) { e.stopPropagation(); e.preventDefault(); }
  }, true);
  window.addEventListener("keydown", e => {
    if (/TEXTAREA|INPUT/.test(e.target.tagName) || document.querySelector("#wheel.on")) return;
    const dir = e.key === "ArrowRight" || e.key === "PageDown" ? 1 : e.key === "ArrowLeft" || e.key === "PageUp" ? -1 : 0;
    if (dir && passo(dir)) { e.stopImmediatePropagation(); e.preventDefault(); }
  }, true);
})();
