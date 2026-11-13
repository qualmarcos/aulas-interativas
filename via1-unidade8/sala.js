/* ============ SALA: os alunos entram pelo celular (QR) ============
   Conexão direta celular ↔ computador do professor (WebRTC, biblioteca PeerJS).
   Nada fica num servidor: os nomes e as respostas chegam só a este navegador.
   Uso nas atividades:
     Sala.setActivity({...})  → o que aparece no celular agora (null = "aguarde")
     Sala.on("tipo", fn)      → recebe mensagens dos celulares
     Sala.sendToName(nome, msg)                                                    */
const Sala = (() => {
  const PFX = "via1-u8-", KEY = PFX + "sala-codigo";
  const ICE = { config: { iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "turn:openrelay.metered.ca:80", username: "openrelayproject", credential: "openrelayproject" },
    { urls: "turn:openrelay.metered.ca:443", username: "openrelayproject", credential: "openrelayproject" },
    { urls: "turn:openrelay.metered.ca:443?transport=tcp", username: "openrelayproject", credential: "openrelayproject" }] } };
  let peer = null, code = null, status = "off", act = null, retryT = null;
  const conns = new Map();      // conn.peer → { c, sid, name }
  const students = new Map();   // sid → { name, online }
  const handlers = {};
  const $ = id => document.getElementById(id);
  const newCode = () => { const a = "abcdefghjkmnpqrstuvwxyz23456789"; let r = ""; for (let i = 0; i < 5; i++) r += a[Math.floor(Math.random() * a.length)]; return r; };
  const joinURL = () => new URL("aluno.html?s=" + code, location.href).href;
  const online = () => [...students.values()].filter(s => s.online);

  function start() {
    if (peer || status === "connecting") return;
    if (typeof Peer === "undefined") { status = "nolib"; paint(); return; }
    try { code = localStorage.getItem(KEY); } catch (e) {}
    if (!code) { code = newCode(); try { localStorage.setItem(KEY, code); } catch (e) {} }
    connect(0);
  }
  function connect(tries) {
    status = "connecting"; paint();
    const p = peer = new Peer(PFX + code, ICE);
    p.on("open", () => { status = "on"; paint(); });
    p.on("connection", c => {
      c.on("data", d => onData(c, d));
      c.on("close", () => drop(c)); c.on("error", () => drop(c));
    });
    p.on("disconnected", () => { if (p !== peer) return; status = "connecting"; paint(); clearTimeout(retryT); retryT = setTimeout(() => { try { p.reconnect(); } catch (e) {} }, 2000); });
    p.on("error", e => {
      if (p !== peer) return;
      if (e.type === "unavailable-id") {   // a sala anterior ainda não fechou: espera um pouco, ou cria outro código
        p.destroy(); peer = null;
        if (tries < 5) setTimeout(() => connect(tries + 1), 4000);
        else { code = newCode(); try { localStorage.setItem(KEY, code); } catch (x) {} connect(0); }
      } else if (["network", "server-error", "socket-error", "socket-closed"].includes(e.type)) {
        status = "error"; paint(); clearTimeout(retryT); retryT = setTimeout(() => { try { p.reconnect(); } catch (x) {} }, 5000);
      }
    });
  }
  function newRoom() {
    if (peer) { try { peer.destroy(); } catch (e) {} peer = null; }
    conns.clear(); students.clear(); code = newCode(); try { localStorage.setItem(KEY, code); } catch (e) {}
    connect(0);
  }

  function onData(c, d) {
    if (!d || typeof d !== "object") return;
    if (d.t === "join") {
      const sid = String(d.sid || c.peer).slice(0, 40);
      let name = String(d.name || "").trim().slice(0, 30); if (!name) return;
      // o mesmo nome já está em outro celular conectado? acrescenta um número
      const clash = n => [...students.entries()].some(([k, v]) => k !== sid && v.online && v.name.toLowerCase() === n.toLowerCase());
      if (clash(name)) { let k = 2; while (clash(name + " " + k)) k++; name = name + " " + k; }
      name = Roleta.addName(name);
      const was = students.get(sid);
      students.set(sid, { name, online: true }); const seen = view(act, name);
      conns.set(c.peer, { c, sid, name, last: JSON.stringify(seen) });
      c.send({ t: "hello", name, act: seen });
      if (!was || !was.online) { toastSala(`📱 ${name} entrou na sala`); Sound.pop(); }
      paint(); return;
    }
    const info = conns.get(c.peer); if (!info) return;
    (handlers[d.t] || []).forEach(fn => { try { fn(d, info.name, msg => c.send(msg)); } catch (e) { console.error(e); } });
  }
  function drop(c) {
    const info = conns.get(c.peer); if (!info) return; conns.delete(c.peer);
    const still = [...conns.values()].some(x => x.sid === info.sid);
    if (!still && students.has(info.sid)) students.get(info.sid).online = false;
    paint();
  }
  /* quem não está na vez recebe só um aviso: as opções nem chegam ao celular dele */
  const view = (a, name) => a && a.only && a.only !== name ? { kind: "wait", id: a.id, title: a.title, turn: a.only } : a;
  function broadcast(msg) { conns.forEach(({ c }) => { try { c.open && c.send(msg); } catch (e) {} }); }
  function sendToName(name, msg) { conns.forEach(x => { if (x.name === name) try { x.c.open && x.c.send(msg); } catch (e) {} }); }
  function setActivity(a) {
    act = a || null;
    conns.forEach(x => { const v = view(act, x.name), k = JSON.stringify(v); if (x.last === k) return; x.last = k; try { x.c.open && x.c.send({ t: "act", act: v }); } catch (e) {} });
  }
  function on(type, fn) { (handlers[type] = handlers[type] || []).push(fn); }

  function toastSala(txt) { const d = document.createElement("div"); d.className = "pt-toast t0"; d.textContent = txt; document.body.appendChild(d); setTimeout(() => d.remove(), 1800); }

  /* ---------- janela com o QR ---------- */
  function paint() {
    const n = online().length, b = $("bSala");
    if (b) b.textContent = n ? `📱 Sala · ${n}` : "📱 Sala";
    if (!$("sala") || !$("sala").classList.contains("on")) { window.dispatchEvent(new Event("sala-mudou")); return; }
    const st = $("salaStatus"), qr = $("salaQR"), url = $("salaURL");
    const file = location.protocol === "file:";
    const labels = { off: "Desligada", connecting: "⏳ Abrindo a sala…", on: "🟢 Sala aberta", error: "🔴 Sem conexão com a internet. Tentando de novo…", nolib: "🔴 Não foi possível carregar a biblioteca da sala (sem internet?)" };
    st.textContent = labels[status] || status; st.className = "sala-status " + status;
    if (code && status === "on") {
      $("salaCode").textContent = code.toUpperCase();
      url.textContent = joinURL(); url.href = joinURL();
      if (typeof qrcode !== "undefined") { const q = qrcode(0, "M"); q.addData(joinURL()); q.make(); qr.innerHTML = q.createSvgTag({ cellSize: 8, margin: 2, scalable: true }); }
      else qr.textContent = "QR indisponível — use o link abaixo.";
    } else { qr.innerHTML = '<div class="sala-wait">⏳</div>'; $("salaCode").textContent = "…"; url.textContent = ""; }
    $("salaFile").style.display = file ? "block" : "none";
    const list = [...students.values()].sort((a, b) => a.name.localeCompare(b.name));
    $("salaList").innerHTML = list.length ? list.map(s => `<span class="sala-st ${s.online ? "on" : ""}">${s.online ? "🟢" : "⚪"} ${s.name}</span>`).join("") : '<span class="sala-empty">Ninguém entrou ainda. Peça para a turma apontar a câmera do celular para o QR.</span>';
    $("salaCount").textContent = `${n} ${n === 1 ? "aluno conectado" : "alunos conectados"}`;
    window.dispatchEvent(new Event("sala-mudou"));
  }
  function open() { start(); $("sala").classList.add("on"); paint(); }
  function close() { $("sala").classList.remove("on"); }
  function init() {
    $("bSala").onclick = open; $("salaClose").onclick = close;
    $("sala").addEventListener("click", e => { if (e.target.id === "sala") close(); });
    $("salaNew").onclick = () => { newRoom(); Sound.whoosh(); };
    let had = null; try { had = localStorage.getItem(KEY); } catch (e) {}
    if (had) start();   // a sala já foi usada: reabre sozinha para os celulares voltarem a conectar
    paint();
  }
  return { init, open, close, on, setActivity, view, sendToName, broadcast, get students() { return [...students.values()]; } };
})();
