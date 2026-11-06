/* ============ NOTAS ADESIVAS (uma ou mais por slide) ============
   Salvas no navegador (localStorage). Cada slide tem sua própria lista de notas. */
const Notes = (() => {
  const KEY = "nab2-notas";
  const COLORS = [["#fff59d", "Amarelo"], ["#f8bbd0", "Rosa"], ["#c5e1a5", "Verde"], ["#b3e5fc", "Azul"], ["#ffcc80", "Laranja"], ["#d1c4e9", "Lilás"]];
  const SIZES = [13, 15, 17, 20, 24, 28, 34];
  let data = {}, slide = 0, visible = true, layer, saveT;
  try { data = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { data = {}; }
  try { visible = localStorage.getItem(KEY + "-vis") !== "0"; } catch (e) {}
  const save = () => { clearTimeout(saveT); saveT = setTimeout(() => { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {} }, 200); };
  const list = () => (data[slide] = data[slide] || []);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  function add(from) {
    const n = list(), base = from || { x: window.innerWidth - 310, y: 90 };
    const note = { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), x: from ? base.x - 60 : base.x - n.length * 24, y: from ? base.y + from.h - 30 : base.y + n.length * 24,
      w: 280, h: 200, color: from ? from.color : COLORS[n.length % COLORS.length][0], fs: from ? from.fs : 2, text: "" };
    n.push(note); save(); render(); visible || toggle(true);
    const ta = layer.querySelector(`[data-id="${note.id}"] textarea`); ta && ta.focus();
    try { Sound.pop(); } catch (e) {}
  }
  function remove(id) {
    const n = list(), i = n.findIndex(x => x.id === id); if (i < 0) return;
    if (n[i].text.trim() && !layer.querySelector(`[data-id="${id}"]`).classList.contains("confirm")) {
      const el = layer.querySelector(`[data-id="${id}"]`); el.classList.add("confirm");
      el.querySelector(".nt-del").textContent = "Apagar?"; setTimeout(() => { if (el.isConnected) { el.classList.remove("confirm"); el.querySelector(".nt-del").textContent = "🗑"; } }, 2500);
      return;
    }
    n.splice(i, 1); save(); render(); try { Sound.tock(); } catch (e) {}
  }
  function render() {
    layer.innerHTML = ""; layer.style.display = visible ? "" : "none";
    const W = window.innerWidth, H = window.innerHeight;
    list().forEach(note => {
      note.w = clamp(note.w, 250, W - 10); note.h = clamp(note.h, 120, H - 60);
      note.x = clamp(note.x, 0, W - Math.min(note.w, W)); note.y = clamp(note.y, 48, H - 60);
      if (note.min) { layer.appendChild(bubble(note)); return; }
      const el = document.createElement("div"); el.className = "note"; el.dataset.id = note.id;
      Object.assign(el.style, { left: note.x + "px", top: note.y + "px", width: note.w + "px", height: note.h + "px", background: note.color });
      el.innerHTML = `<div class="nt-bar" title="Arraste para mover">
          <div class="nt-colors">${COLORS.map(([c, n]) => `<button class="nt-c${c === note.color ? " on" : ""}" style="background:${c}" data-c="${c}" title="${n}" aria-label="Cor ${n}"></button>`).join("")}</div>
          <button class="nt-b" data-a="minus" title="Diminuir letra">A−</button><button class="nt-b" data-a="plus" title="Aumentar letra">A+</button>
          <button class="nt-b" data-a="new" title="Nova nota">＋</button><button class="nt-b" data-a="min" title="Minimizar (vira bolinha)">–</button><button class="nt-b nt-del" data-a="del" title="Apagar nota">🗑</button>
        </div><textarea placeholder="Escreva sua nota…" style="font-size:${SIZES[note.fs]}px"></textarea>`;
      const ta = el.querySelector("textarea"); ta.value = note.text;
      ta.addEventListener("input", () => { note.text = ta.value; save(); });
      el.querySelectorAll(".nt-c").forEach(b => b.onclick = () => { note.color = b.dataset.c; el.style.background = note.color; el.querySelectorAll(".nt-c").forEach(x => x.classList.toggle("on", x === b)); save(); });
      el.querySelector('[data-a="minus"]').onclick = () => { note.fs = Math.max(0, note.fs - 1); ta.style.fontSize = SIZES[note.fs] + "px"; save(); };
      el.querySelector('[data-a="plus"]').onclick = () => { note.fs = Math.min(SIZES.length - 1, note.fs + 1); ta.style.fontSize = SIZES[note.fs] + "px"; save(); };
      el.querySelector('[data-a="new"]').onclick = () => add(note);
      el.querySelector('[data-a="del"]').onclick = () => remove(note.id);
      el.querySelector('[data-a="min"]').onclick = () => { note.min = true; save(); el.classList.add("shrink"); try { Sound.tock(); } catch (e) {} setTimeout(render, 220); };
      // arrastar pela barra
      const bar = el.querySelector(".nt-bar");
      bar.addEventListener("pointerdown", e => {
        if (e.target.closest("button")) return;
        e.preventDefault(); bar.setPointerCapture(e.pointerId); el.classList.add("drag"); layer.appendChild(el);
        const sx = e.clientX - note.x, sy = e.clientY - note.y;
        const mv = ev => { note.x = clamp(ev.clientX - sx, 0, window.innerWidth - 60); note.y = clamp(ev.clientY - sy, 48, window.innerHeight - 40); el.style.left = note.x + "px"; el.style.top = note.y + "px"; };
        const up = () => { bar.removeEventListener("pointermove", mv); bar.removeEventListener("pointerup", up); el.classList.remove("drag"); const n = list(), i = n.indexOf(note); if (i > -1) { n.splice(i, 1); n.push(note); } save(); };
        bar.addEventListener("pointermove", mv); bar.addEventListener("pointerup", up);
      });
      // redimensionar (canto inferior direito)
      new ResizeObserver(() => { if (!el.isConnected) return; const w = el.offsetWidth, h = el.offsetHeight; if (w && h && (w !== note.w || h !== note.h)) { note.w = w; note.h = h; save(); } }).observe(el);
      layer.appendChild(el);
    });
    paint();
  }
  /* nota minimizada: bolinha colorida que pode ser arrastada; um toque abre a nota */
  function bubble(note) {
    const B = 54, W = window.innerWidth, H = window.innerHeight;
    note.bx = clamp(note.bx != null ? note.bx : note.x, 0, W - B); note.by = clamp(note.by != null ? note.by : note.y, 48, H - B - 50);
    const b = document.createElement("button"); b.className = "note-min"; b.dataset.id = note.id;
    Object.assign(b.style, { left: note.bx + "px", top: note.by + "px", background: note.color });
    b.textContent = "📝";
    b.title = note.text.trim() ? note.text.trim().slice(0, 120) + (note.text.length > 120 ? "…" : "") + "\n(toque para abrir)" : "Nota vazia (toque para abrir)";
    b.setAttribute("aria-label", "Abrir nota minimizada");
    b.addEventListener("pointerdown", e => {
      e.preventDefault(); b.setPointerCapture(e.pointerId);
      const sx = e.clientX - note.bx, sy = e.clientY - note.by, x0 = e.clientX, y0 = e.clientY; let moved = false;
      const mv = ev => { if (Math.abs(ev.clientX - x0) + Math.abs(ev.clientY - y0) > 5) moved = true; if (!moved) return; b.classList.add("drag");
        note.bx = clamp(ev.clientX - sx, 0, window.innerWidth - B); note.by = clamp(ev.clientY - sy, 48, window.innerHeight - B - 10); b.style.left = note.bx + "px"; b.style.top = note.by + "px"; };
      const up = () => { b.removeEventListener("pointermove", mv); b.removeEventListener("pointerup", up); b.classList.remove("drag");
        if (moved) { save(); return; }
        note.min = false; note.x = clamp(note.bx, 0, window.innerWidth - note.w); note.y = note.by; save(); try { Sound.pop(); } catch (e) {} render(); };
      b.addEventListener("pointermove", mv); b.addEventListener("pointerup", up);
    });
    return b;
  }
  function paint() {
    const b = document.getElementById("bNotes"), n = list().length;
    if (b) { b.innerHTML = `📝 Notas${n ? ` <span class="nt-count">${n}</span>` : ""}`; b.classList.toggle("on", visible && n > 0); b.title = visible ? "Esconder as notas" : "Mostrar as notas"; }
  }
  function toggle(force) { visible = typeof force === "boolean" ? force : !visible; try { localStorage.setItem(KEY + "-vis", visible ? "1" : "0"); } catch (e) {} render(); }
  function show(i) { slide = i; if (layer) render(); }
  function init() {
    layer = document.createElement("div"); layer.id = "notesLayer"; document.body.appendChild(layer);
    document.getElementById("bNoteAdd").onclick = () => add();
    document.getElementById("bNotes").onclick = () => { if (!list().length) add(); else toggle(); };
    window.addEventListener("resize", () => render());
    render();
  }
  return { init, show, add, toggle };
})();
