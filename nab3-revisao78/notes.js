/* ============ NOTAS ADESIVAS (uma ou mais por slide) ============
   Texto e posição: localStorage. Imagens: IndexedDB (guarda muitas fotos sem estourar o limite).
   Cada slide tem sua própria lista de notas. Uma nota pode ter imagem + subtítulo (+ texto). */

/* ---- banco de imagens ---- */
const NoteImgs = (() => {
  let dbp; const urls = {};
  function db() {
    return dbp || (dbp = new Promise((res, rej) => {
      const r = indexedDB.open("nab3-r78-notas-img", 1);
      r.onupgradeneeded = () => r.result.createObjectStore("img");
      r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
    }));
  }
  function tx(mode, fn) {
    return db().then(d => new Promise((res, rej) => {
      const t = d.transaction("img", mode), q = fn(t.objectStore("img"));
      t.oncomplete = () => res(q && q.result); t.onerror = () => rej(t.error);
    }));
  }
  return {
    put: (k, blob) => tx("readwrite", s => s.put(blob, k)),
    del: k => { if (urls[k]) { URL.revokeObjectURL(urls[k]); delete urls[k]; } return tx("readwrite", s => s.delete(k)).catch(() => {}); },
    url: k => urls[k] ? Promise.resolve(urls[k]) : tx("readonly", s => s.get(k)).then(b => b ? (urls[k] = URL.createObjectURL(b)) : null)
  };
})();

/* reduz a foto para no máximo 1000 px (JPEG) para ocupar pouco espaço */
function shrinkImage(file, max = 1000) {
  return new Promise((res, rej) => {
    const u = URL.createObjectURL(file), im = new Image();
    im.onload = () => {
      const k = Math.min(1, max / Math.max(im.naturalWidth, im.naturalHeight)), w = Math.round(im.naturalWidth * k), h = Math.round(im.naturalHeight * k);
      const c = document.createElement("canvas"); c.width = w; c.height = h; const g = c.getContext("2d");
      g.fillStyle = "#fff"; g.fillRect(0, 0, w, h); g.drawImage(im, 0, 0, w, h); URL.revokeObjectURL(u);
      c.toBlob(b => b ? res({ blob: b, w, h }) : rej(new Error("toBlob")), "image/jpeg", .85);
    };
    im.onerror = () => { URL.revokeObjectURL(u); rej(new Error("imagem inválida")); };
    im.src = u;
  });
}

const Notes = (() => {
  const KEY = "nab3-r78-notas";
  const COLORS = [["#fff59d", "Amarelo"], ["#f8bbd0", "Rosa"], ["#c5e1a5", "Verde"], ["#b3e5fc", "Azul"], ["#ffcc80", "Laranja"], ["#d1c4e9", "Lilás"]];
  const SIZES = [13, 15, 17, 20, 24, 28, 34];
  let data = {}, slide = 0, visible = true, layer, saveT, hint;
  try { data = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { data = {}; }
  try { visible = localStorage.getItem(KEY + "-vis") !== "0"; } catch (e) {}
  const save = () => { clearTimeout(saveT); saveT = setTimeout(() => { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {} }, 200); };
  const list = () => (data[slide] = data[slide] || []);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const snd = f => { try { Sound[f](); } catch (e) {} };
  let topZ = 10;
  /* arrastar robusto: acompanha o ponteiro pela janela inteira (não trava com movimento rápido) */
  function dragFrom(handle, el, e, onMove, onEnd) {
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault(); el.style.zIndex = ++topZ;
    const id = e.pointerId; try { handle.setPointerCapture(id); } catch (_) {}
    let raf = 0, last = e;
    const mv = ev => { if (ev.pointerId !== id) return; last = ev; if (!raf) raf = requestAnimationFrame(() => { raf = 0; onMove(last); }); };
    const end = ev => { if (ev.pointerId !== id) return; cancelAnimationFrame(raf); onMove(last);
      window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", end); window.removeEventListener("pointercancel", end);
      try { handle.releasePointerCapture(id); } catch (_) {} onEnd(); };
    window.addEventListener("pointermove", mv); window.addEventListener("pointerup", end); window.addEventListener("pointercancel", end);
  }

  function newNote(opts) {
    const n = list();
    return Object.assign({ id: uid(), x: window.innerWidth - 350 - n.length * 24, y: 90 + n.length * 24, w: 320, h: 220,
      color: COLORS[n.length % COLORS.length][0], fs: 2, text: "", cap: "" }, opts);
  }
  function add(from) {
    const note = newNote(from ? { x: from.x - 60, y: from.y + from.h - 30, color: from.color, fs: from.fs } : {});
    list().push(note); save(); visible ? render() : toggle(true);
    const ta = layer.querySelector(`[data-id="${note.id}"] textarea`); ta && ta.focus(); snd("pop");
  }
  function remove(id) {
    const n = list(), i = n.findIndex(x => x.id === id); if (i < 0) return;
    const note = n[i], el = layer.querySelector(`[data-id="${id}"]`);
    if ((note.text.trim() || note.img) && !el.classList.contains("confirm")) {
      el.classList.add("confirm"); el.querySelector(".nt-del").textContent = "Apagar?";
      setTimeout(() => { if (el.isConnected) { el.classList.remove("confirm"); el.querySelector(".nt-del").textContent = "🗑"; } }, 2500);
      return;
    }
    if (note.img && note.img.id) NoteImgs.del(note.img.id);
    n.splice(i, 1); save(); render(); snd("tock");
  }

  /* ---- receber imagens (arquivo, imagem arrastada de outro site, ou colada) ---- */
  function imageFrom(dt) {
    const f = [...(dt.files || [])].find(f => f.type.startsWith("image/"));
    if (f) return { file: f };
    const items = [...(dt.items || [])].find(i => i.kind === "file" && i.type.startsWith("image/"));
    if (items) return { file: items.getAsFile() };
    const html = dt.getData && dt.getData("text/html"), m = html && html.match(/<img[^>]+src="([^"]+)"/i);
    const url = (m && m[1]) || (dt.getData && (dt.getData("text/uri-list") || "").split("\n").find(l => /^https?:/.test(l)));
    if (url && (m || /\.(jpe?g|png|gif|webp|avif|svg)(\?|$)/i.test(url))) return { url: url.replace(/&amp;/g, "&") };
    return null;
  }
  async function storeImage(src) {
    if (src.file) { const { blob, w, h } = await shrinkImage(src.file); const id = uid(); await NoteImgs.put(id, blob); return { id, w, h }; }
    try { // tenta copiar a imagem do outro site; se o site não deixar, guarda só o endereço
      const r = await fetch(src.url, { mode: "cors" }); if (!r.ok) throw 0; const b = await r.blob(); if (!b.type.startsWith("image/")) throw 0;
      const { blob, w, h } = await shrinkImage(b); const id = uid(); await NoteImgs.put(id, blob); return { id, w, h };
    } catch (e) {
      const dims = await new Promise(res => { const im = new Image(); im.onload = () => res([im.naturalWidth, im.naturalHeight]); im.onerror = () => res([4, 3]); im.src = src.url; });
      return { url: src.url, w: dims[0], h: dims[1] };
    }
  }
  function sizeFor(img) { const W = 320, ih = Math.round(W * img.h / img.w); return { w: W, h: clamp(ih, 120, 420) + 96 }; }
  async function attach(note, src) {
    try {
      const img = await storeImage(src);
      if (note && !note.img) { // nota sem imagem: a imagem entra nela
        note.img = img; const s = sizeFor(img); note.w = Math.max(note.w, s.w); note.h = Math.max(note.h, s.h + (note.text.trim() ? 90 : 0));
      } else { // nota já tem imagem (ou nenhuma nota): cria uma nota-imagem nova
        const base = note ? { x: note.x + 30, y: note.y + 30 } : src.at;
        const nn = newNote(Object.assign({ img }, sizeFor(img), base ? { x: base.x - 150, y: base.y - 40 } : {}));
        list().push(nn); note = nn;
      }
      save(); visible ? render() : toggle(true); snd("success");
      const cap = layer.querySelector(`[data-id="${note.id}"] .nt-cap`); cap && cap.focus();
    } catch (e) { flash("Não foi possível usar essa imagem."); snd("error"); }
  }
  function pickFile(note) {
    const inp = document.createElement("input"); inp.type = "file"; inp.accept = "image/*";
    inp.onchange = () => inp.files[0] && attach(note, { file: inp.files[0] }); inp.click();
  }
  function removeImage(note) { if (note.img && note.img.id) NoteImgs.del(note.img.id); delete note.img; note.cap = ""; note.h = Math.min(note.h, 220); save(); render(); snd("tock"); }
  function flash(msg) { if (!hint) return; hint.textContent = msg; hint.classList.add("on"); clearTimeout(hint._t); hint._t = setTimeout(() => hint.classList.remove("on"), 2200); }

  function render() {
    layer.innerHTML = ""; layer.style.display = visible ? "" : "none";
    const W = window.innerWidth, H = window.innerHeight;
    list().forEach(note => {
      if (note.cap == null) note.cap = "";
      note.w = clamp(note.w, 270, W - 10); note.h = clamp(note.h, 120, H - 60);
      note.x = clamp(note.x, 0, W - Math.min(note.w, W)); note.y = clamp(note.y, 48, H - 60);
      if (note.min) { layer.appendChild(bubble(note)); return; }
      const el = document.createElement("div"); el.className = "note" + (note.img ? " has-img" : ""); el.dataset.id = note.id;
      Object.assign(el.style, { left: note.x + "px", top: note.y + "px", width: note.w + "px", height: note.h + "px", background: note.color });
      const showText = !note.img || note.text.trim();
      el.innerHTML = `<div class="nt-grip" title="Arraste por aqui para mover a nota"><span></span></div><div class="nt-bar" title="Arraste para mover">
          <div class="nt-colors">${COLORS.map(([c, n]) => `<button class="nt-c${c === note.color ? " on" : ""}" style="background:${c}" data-c="${c}" title="${n}" aria-label="Cor ${n}"></button>`).join("")}</div>
          <button class="nt-b" data-a="minus" title="Diminuir letra">A−</button><button class="nt-b" data-a="plus" title="Aumentar letra">A+</button>
          <button class="nt-b" data-a="pic" title="${note.img ? "Tirar a imagem" : "Colocar imagem (ou arraste uma imagem para cá)"}">${note.img ? "✕🖼" : "🖼"}</button>
          <button class="nt-b" data-a="new" title="Nova nota">＋</button><button class="nt-b" data-a="min" title="Minimizar (vira bolinha)">–</button><button class="nt-b nt-del" data-a="del" title="Apagar nota">🗑</button>
        </div>
        ${note.img ? `<figure class="nt-fig"><img alt="${esc(note.cap)}" draggable="false"><input class="nt-cap" placeholder="Escreva um subtítulo…" value="${esc(note.cap)}" style="font-size:${SIZES[note.fs]}px"></figure>` : ""}
        <textarea placeholder="${note.img ? "Texto (opcional)…" : "Escreva sua nota… ou arraste uma imagem para cá"}" style="font-size:${SIZES[note.fs]}px${showText ? "" : ";display:none"}"></textarea>
        ${note.img && !showText ? `<button class="nt-addtxt" title="Adicionar texto embaixo">✎ texto</button>` : ""}
        <div class="nt-drop">Solte a imagem aqui</div>`;
      const ta = el.querySelector("textarea"), cap = el.querySelector(".nt-cap"), im = el.querySelector(".nt-fig img");
      ta.value = note.text;
      ta.addEventListener("input", () => { note.text = ta.value; save(); });
      if (cap) cap.addEventListener("input", () => { note.cap = cap.value; im.alt = cap.value; save(); });
      if (im) { if (note.img.url) im.src = note.img.url; else NoteImgs.url(note.img.id).then(u => { if (u) im.src = u; else im.alt = "(imagem não encontrada neste navegador)"; }); }
      const at = el.querySelector(".nt-addtxt"); if (at) at.onclick = () => { ta.style.display = ""; at.remove(); note.h = Math.max(note.h, el.offsetHeight + 80); el.style.height = note.h + "px"; ta.focus(); };
      el.querySelectorAll(".nt-c").forEach(b => b.onclick = () => { note.color = b.dataset.c; el.style.background = note.color; el.querySelectorAll(".nt-c").forEach(x => x.classList.toggle("on", x === b)); save(); });
      const setFs = d => { note.fs = clamp(note.fs + d, 0, SIZES.length - 1); ta.style.fontSize = SIZES[note.fs] + "px"; if (cap) cap.style.fontSize = SIZES[note.fs] + "px"; save(); };
      el.querySelector('[data-a="minus"]').onclick = () => setFs(-1);
      el.querySelector('[data-a="plus"]').onclick = () => setFs(1);
      el.querySelector('[data-a="pic"]').onclick = () => note.img ? removeImage(note) : pickFile(note);
      el.querySelector('[data-a="new"]').onclick = () => add(note);
      el.querySelector('[data-a="del"]').onclick = () => remove(note.id);
      el.querySelector('[data-a="min"]').onclick = () => { note.min = true; save(); el.classList.add("shrink"); snd("tock"); setTimeout(render, 220); };
      // soltar imagem dentro da nota
      el.addEventListener("dragover", e => { e.preventDefault(); e.stopPropagation(); el.classList.add("dropping"); });
      el.addEventListener("dragleave", e => { if (!el.contains(e.relatedTarget)) el.classList.remove("dropping"); });
      el.addEventListener("drop", e => { e.preventDefault(); e.stopPropagation(); el.classList.remove("dropping"); document.body.classList.remove("nt-dragging"); const src = imageFrom(e.dataTransfer); src ? attach(note, src) : flash("Arraste uma imagem (foto ou arquivo de imagem)."); });
      // colar imagem (Ctrl/Cmd + V) com a nota selecionada
      el.addEventListener("paste", e => { const src = imageFrom(e.clipboardData); if (src) { e.preventDefault(); attach(note, src); } });
      // arrastar pela faixa do topo ou pelos espaços vazios da barra
      el.querySelectorAll(".nt-grip, .nt-bar").forEach(handle => handle.addEventListener("pointerdown", e => {
        if (e.target.closest("button")) return;
        const sx = e.clientX - note.x, sy = e.clientY - note.y; el.classList.add("drag");
        dragFrom(handle, el, e, ev => { note.x = clamp(ev.clientX - sx, -note.w + 80, window.innerWidth - 80); note.y = clamp(ev.clientY - sy, 48, window.innerHeight - 40); el.style.left = note.x + "px"; el.style.top = note.y + "px"; },
          () => { el.classList.remove("drag"); const n = list(), i = n.indexOf(note); if (i > -1) { n.splice(i, 1); n.push(note); } save(); });
      }));
      // redimensionar (canto inferior direito)
      new ResizeObserver(() => { if (!el.isConnected) return; const w = el.offsetWidth, h = el.offsetHeight; if (w && h && (w !== note.w || h !== note.h)) { note.w = w; note.h = h; save(); } }).observe(el);
      layer.appendChild(el);
    });
    paint();
  }
  /* nota minimizada: bolinha colorida (com miniatura, se tiver imagem); um toque abre a nota */
  function bubble(note) {
    const B = 54, W = window.innerWidth, H = window.innerHeight;
    note.bx = clamp(note.bx != null ? note.bx : note.x, 0, W - B); note.by = clamp(note.by != null ? note.by : note.y, 48, H - B - 50);
    const b = document.createElement("button"); b.className = "note-min"; b.dataset.id = note.id;
    Object.assign(b.style, { left: note.bx + "px", top: note.by + "px", background: note.color });
    b.textContent = note.img ? "" : "📝";
    if (note.img) { const set = u => { if (u) { b.style.backgroundImage = `url("${u}")`; b.classList.add("thumb"); } else b.textContent = "🖼"; }; note.img.url ? set(note.img.url) : NoteImgs.url(note.img.id).then(set); }
    const txt = (note.cap || "").trim() || note.text.trim();
    b.title = txt ? txt.slice(0, 120) + (txt.length > 120 ? "…" : "") + "\n(toque para abrir)" : "Nota (toque para abrir)";
    b.setAttribute("aria-label", "Abrir nota minimizada");
    b.addEventListener("pointerdown", e => {
      const sx = e.clientX - note.bx, sy = e.clientY - note.by, x0 = e.clientX, y0 = e.clientY; let moved = false;
      dragFrom(b, b, e, ev => { if (Math.abs(ev.clientX - x0) + Math.abs(ev.clientY - y0) > 5) moved = true; if (!moved) return; b.classList.add("drag");
          note.bx = clamp(ev.clientX - sx, 0, window.innerWidth - B); note.by = clamp(ev.clientY - sy, 48, window.innerHeight - B - 10); b.style.left = note.bx + "px"; b.style.top = note.by + "px"; },
        () => { b.classList.remove("drag"); if (moved) { save(); return; }
          note.min = false; note.x = clamp(note.bx, 0, window.innerWidth - note.w); note.y = note.by; save(); snd("pop"); render(); });
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
    hint = document.createElement("div"); hint.id = "ntHint"; document.body.appendChild(hint);
    document.getElementById("bNoteAdd").onclick = () => add();
    document.getElementById("bNotes").onclick = () => { if (!list().length) add(); else toggle(); };
    window.addEventListener("resize", () => render());
    // soltar uma imagem em qualquer lugar da página cria uma nota-imagem ali
    let depth = 0;
    const isFileDrag = e => [...(e.dataTransfer && e.dataTransfer.types || [])].some(t => t === "Files" || t === "text/uri-list" || t === "text/html");
    window.addEventListener("dragenter", e => { if (!isFileDrag(e)) return; depth++; document.body.classList.add("nt-dragging"); });
    window.addEventListener("dragleave", () => { depth = Math.max(0, depth - 1); if (!depth) document.body.classList.remove("nt-dragging"); });
    window.addEventListener("dragover", e => { if (isFileDrag(e)) e.preventDefault(); });
    window.addEventListener("drop", e => {
      depth = 0; document.body.classList.remove("nt-dragging"); if (!isFileDrag(e)) return; e.preventDefault();
      const src = imageFrom(e.dataTransfer); if (!src) return flash("Arraste uma imagem (foto ou arquivo de imagem).");
      src.at = { x: e.clientX, y: e.clientY }; attach(null, src);
    });
    render();
  }
  return { init, show, add, toggle };
})();
