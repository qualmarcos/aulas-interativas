/* ============ SONS (Web Audio, sem arquivos externos) ============ */
const Sound = (() => {
  let ctx, master, noiseBuf, muted = false;
  try { muted = localStorage.getItem("via1-u5-mute") === "1"; } catch (e) {}
  function ac() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain(); master.gain.value = 0.7; master.connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }
  function noise() {
    const c = ac();
    if (!noiseBuf) {
      noiseBuf = c.createBuffer(1, c.sampleRate * 1.5, c.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    return noiseBuf;
  }
  function env(g, t, v, dur) { g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur); }
  function noiseHit(t, { vol = .4, dur = .08, type = "bandpass", freq = 1800, q = .8 } = {}) {
    const c = ac(), n = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    n.buffer = noise(); f.type = type; f.frequency.value = freq; f.Q.value = q; env(g, t, vol, dur);
    n.connect(f).connect(g).connect(master); n.start(t, Math.random()); n.stop(t + dur + .05);
  }
  function tone(t, freq, { dur = .2, type = "sine", vol = .3, to = null } = {}) {
    const c = ac(), o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    if (to) o.frequency.exponentialRampToValueAtTime(to, t + dur);
    env(g, t, vol, dur); o.connect(g).connect(master); o.start(t); o.stop(t + dur + .05);
  }
  function snare(t, vol) { noiseHit(t, { vol, dur: .07, freq: 2000 + Math.random() * 400 }); tone(t, 190 + Math.random() * 20, { dur: .06, type: "triangle", vol: vol * .5, to: 120 }); }
  function kick(t, vol = .9) { tone(t, 140, { dur: .5, vol, to: 40 }); }
  function cymbal(t, vol = .35) { noiseHit(t, { vol, dur: 1.4, type: "highpass", freq: 6500, q: .3 }); noiseHit(t, { vol: vol * .6, dur: .5, type: "bandpass", freq: 9000, q: .5 }); }

  return {
    get muted() { return muted; },
    toggle() { muted = !muted; try { localStorage.setItem("via1-u5-mute", muted ? "1" : "0"); } catch (e) {} return muted; },
    unlock() { try { ac(); } catch (e) {} },
    /* rufar de tambores: acelera e termina com bumbo + prato */
    drumroll(sec = 1.6) {
      if (muted) return;
      const c = ac(); const t0 = c.currentTime + .02, end = t0 + sec; let t = t0;
      while (t < end) { const p = (t - t0) / sec; snare(t, .12 + .4 * p); t += Math.max(.032, .085 - .055 * p); }
      kick(end); snare(end, .7); cymbal(end);
    },
    tick(pitch = 1) { if (muted) return; const t = ac().currentTime; tone(t, 1300 * pitch, { dur: .03, type: "square", vol: .12 }); noiseHit(t, { vol: .15, dur: .02, freq: 4000 }); },
    success() { if (muted) return; const t = ac().currentTime; [523, 659, 784, 1047].forEach((f, i) => tone(t + i * .09, f, { dur: .35, type: "triangle", vol: .28 })); },
    fanfare() {
      if (muted) return; const t = ac().currentTime;
      [[523, 0], [523, .12], [523, .24], [659, .36], [784, .6], [659, .78], [784, .9], [1047, 1.05]].forEach(([f, d]) => {
        tone(t + d, f, { dur: d > 1 ? .9 : .22, type: "sawtooth", vol: .09 }); tone(t + d, f, { dur: d > 1 ? .9 : .22, type: "triangle", vol: .2 });
      });
      cymbal(t + 1.05, .3);
    },
    error() { if (muted) return; const t = ac().currentTime; tone(t, 220, { dur: .18, type: "sawtooth", vol: .15, to: 180 }); tone(t + .18, 160, { dur: .35, type: "sawtooth", vol: .15, to: 110 }); },
    pop() { if (muted) return; tone(ac().currentTime, 500, { dur: .12, vol: .25, to: 1100 }); },
    whoosh() { if (muted) return; const c = ac(), t = c.currentTime, n = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
      n.buffer = noise(); f.type = "bandpass"; f.Q.value = 1.2; f.frequency.setValueAtTime(400, t); f.frequency.exponentialRampToValueAtTime(3000, t + .25);
      g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.12, t + .1); g.gain.exponentialRampToValueAtTime(.001, t + .3);
      n.connect(f).connect(g).connect(master); n.start(t); n.stop(t + .35); },
    boom() { if (muted) return; const t = ac().currentTime; kick(t, 1); cymbal(t + .02, .25); },
    tock() { if (muted) return; const t = ac().currentTime; tone(t, 900, { dur: .05, type: "square", vol: .08 }); }
  };
})();

/* Leitura em voz alta desativada: a aula usa apenas os sons das atividades. */
const Speak = () => {};

/* Sem tambores: a resposta aparece na hora. */
function suspense() { return Promise.resolve(); }
try { window.speechSynthesis && speechSynthesis.cancel(); } catch (e) {}

/* ============ ROLETA DA TURMA ============ */
const Roleta = (() => {
  const KEY = "via1-u5-roleta";
  const DEFAULT = ["Ana", "Bruno", "Camila", "Diego", "Eduarda", "Felipe", "Gabriela", "Heitor"];
  const COLORS = ["#2356a0", "#a8c94a", "#f2b705", "#3f8a4b", "#c0392b", "#1d3557", "#8e44ad", "#f77f00", "#16a085", "#d35400"];
  let names = [], angle = 0, spinning = false, lastIdx = -1, pendingRemove = null;
  const $ = id => document.getElementById(id);
  function load() {
    let saved = null; try { saved = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
    names = Array.isArray(saved) && saved.length ? saved : DEFAULT.slice();
    $("wNames").value = names.join("\n");
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(names)); } catch (e) {} }
  function saveFull() { try { localStorage.setItem(KEY + "-full", JSON.stringify(names)); } catch (e) {} window.dispatchEvent(new Event("roleta-nomes")); }
  function allNames() { let full = null; try { full = JSON.parse(localStorage.getItem(KEY + "-full")); } catch (e) {} return (Array.isArray(full) && full.length ? full : names).slice(); }
  function readNames() { names = $("wNames").value.split("\n").map(s => s.trim()).filter(Boolean); save(); saveFull(); draw(); }
  function draw() {
    const cv = $("wCanvas"), c = cv.getContext("2d"), W = cv.width, R = W / 2 - 14;
    c.clearRect(0, 0, W, W);
    c.save(); c.translate(W / 2, W / 2);
    c.beginPath(); c.arc(0, 0, R + 10, 0, Math.PI * 2); c.fillStyle = "#1d3557"; c.fill();
    if (!names.length) { c.fillStyle = "#fff"; c.font = "bold 40px Nunito, sans-serif"; c.textAlign = "center"; c.fillText("Adicione nomes", 0, 0); c.restore(); return; }
    const seg = Math.PI * 2 / names.length;
    names.forEach((n, i) => {
      const a = angle + i * seg;
      c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, R, a, a + seg); c.closePath();
      c.fillStyle = COLORS[i % COLORS.length]; if (names.length % COLORS.length === 1 && i === names.length - 1) c.fillStyle = COLORS[3];
      c.fill(); c.strokeStyle = "#fff"; c.lineWidth = 4; c.stroke();
      c.save(); c.rotate(a + seg / 2); c.textAlign = "right"; c.textBaseline = "middle";
      const fs = Math.max(20, Math.min(46, 420 / Math.max(4, names.length) + 10));
      c.font = `900 ${fs}px Nunito, sans-serif`;
      c.fillStyle = ["#a8c94a", "#f2b705"].includes(COLORS[i % COLORS.length]) ? "#1d3557" : "#fff";
      const label = n.length > 16 ? n.slice(0, 15) + "…" : n;
      c.fillText(label, R - 26, 0); c.restore();
    });
    for (let i = 0; i < 36; i++) { const a = i / 36 * Math.PI * 2; c.beginPath(); c.arc(Math.cos(a) * (R + 5), Math.sin(a) * (R + 5), 4, 0, 7); c.fillStyle = i % 2 ? "#f2b705" : "#fff"; c.fill(); }
    c.restore();
  }
  function idxAtPointer() {
    const seg = Math.PI * 2 / names.length;
    let p = (-Math.PI / 2 - angle) % (Math.PI * 2); if (p < 0) p += Math.PI * 2;
    return Math.floor(p / seg) % names.length;
  }
  function spin() {
    if (spinning) return;
    if (pendingRemove != null) { names.splice(pendingRemove, 1); pendingRemove = null; $("wNames").value = names.join("\n"); save(); }
    if (!names.length) { $("wWinner").textContent = "Todos já foram sorteados! 🎉"; $("wDone").textContent = "Clique em “Restaurar lista” para começar de novo."; return; }
    Sound.unlock(); spinning = true; $("wWinner").textContent = ""; $("wWinner").classList.remove("on");
    const start = angle, total = Math.PI * 2 * (5 + Math.random() * 3) + Math.random() * Math.PI * 2, dur = 5200 + Math.random() * 1200, t0 = performance.now();
    lastIdx = idxAtPointer();
    const ease = x => 1 - Math.pow(1 - x, 4);
    function frame(now) {
      const x = Math.min(1, (now - t0) / dur); angle = start + total * ease(x); draw();
      const i = idxAtPointer();
      if (i !== lastIdx) { lastIdx = i; Sound.tick(1 + (1 - x) * .3); const p = $("wPointer"); p.classList.remove("tick"); void p.offsetWidth; p.classList.add("tick"); }
      if (x < 1) requestAnimationFrame(frame); else finish(i);
    }
    requestAnimationFrame(frame);
  }
  function finish(i) {
    spinning = false; Sound.fanfare(); confetti();
    const w = $("wWinner"); w.innerHTML = "🎉 " + names[i] + "!"; void w.offsetWidth; w.classList.add("on");

    if ($("wRemove").checked) { pendingRemove = i; $("wDone").textContent = `${names[i]} sai da roleta no próximo giro. Restam ${names.length - 1}.`; } else $("wDone").textContent = "";
  }
  function open() { $("wheel").classList.add("on"); draw(); }
  function close() { if (!spinning) $("wheel").classList.remove("on"); }
  function init() {
    load(); draw();
    $("wNames").addEventListener("input", () => { pendingRemove = null; readNames(); });
    $("wSpin").onclick = spin; $("wHub").onclick = spin;
    $("wShuffle").onclick = () => { for (let i = names.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [names[i], names[j]] = [names[j], names[i]]; } $("wNames").value = names.join("\n"); save(); draw(); Sound.whoosh(); };
    $("wReset").onclick = () => { let full = null; try { full = JSON.parse(localStorage.getItem(KEY + "-full")); } catch (e) {} names = (full && full.length ? full : DEFAULT).slice(); pendingRemove = null; $("wNames").value = names.join("\n"); save(); saveFull(); draw(); $("wDone").textContent = ""; $("wWinner").textContent = ""; };
    $("wClose").onclick = close; $("wheel").addEventListener("click", e => { if (e.target.id === "wheel") close(); });
  }
  /* aluno que entra pelo celular: entra na roleta (se ainda não estiver) e devolve o nome como está na lista */
  function addName(n) {
    n = String(n || "").trim().slice(0, 30); if (!n) return n;
    const full = allNames(), hit = full.find(x => x.toLowerCase() === n.toLowerCase()); if (hit) return hit;
    full.push(n); if (!names.some(x => x.toLowerCase() === n.toLowerCase())) names.push(n);
    try { localStorage.setItem(KEY + "-full", JSON.stringify(full)); } catch (e) {}
    $("wNames").value = names.join("\n"); save(); draw(); window.dispatchEvent(new Event("roleta-nomes"));
    return n;
  }
  return { init, open, close, allNames, addName, get spinning() { return spinning; } };
})();

function confetti(n = 70) {
  const cs = ["#a8c94a", "#2356a0", "#f2b705", "#c0392b", "#3f8a4b", "#8e44ad"];
  for (let i = 0; i < n; i++) {
    const c = document.createElement("div"); c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw"; c.style.background = cs[i % cs.length];
    c.style.animationDelay = Math.random() * .7 + "s"; c.style.animationDuration = 1.4 + Math.random() * 1.2 + "s";
    if (i % 3 === 0) c.style.borderRadius = "50%";
    document.body.appendChild(c); setTimeout(() => c.remove(), 3200);
  }
}
