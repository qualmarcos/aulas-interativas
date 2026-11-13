/* =====================================================================
   SENHA DOS PROFESSORES — carregado no <head> da página inicial e de cada aula
   (NÃO no aluno.html: os alunos entram pelo QR sem senha).
   Guarda só o hash SHA-256 da senha. Depois de digitada, o navegador lembra.
   Para trocar a senha:  printf 'NovaSenha' | shasum -a 256  → cole em HASH.
   Atenção: é uma trava simples de página estática (GitHub Pages); quem souber
   o endereço direto de um arquivo ainda consegue abri-lo.
   ===================================================================== */
(() => {
  const HASH = "64670f8910bef062c5af56cc7b01709a8be5a4ca72721b3acabe6c1d11c4da2e";
  const KEY = "aulas-acesso";
  try { if (localStorage.getItem(KEY) === HASH) return; } catch (e) {}

  const base = document.currentScript.src;
  const st = document.createElement("style");
  st.id = "senha-css";
  st.textContent = `
    body>*:not(#senha){display:none!important}
    #senha{position:fixed;inset:0;z-index:99999;display:grid;place-items:center;padding:16px;font-family:"Nunito","Segoe UI",Roboto,Helvetica,Arial,sans-serif;
      background:radial-gradient(900px 500px at 85% -10%,rgba(165,194,27,.35),transparent 60%),linear-gradient(135deg,#0a4a30,#0d5a3a 45%,#16784a)}
    #senha form{width:min(400px,100%);background:#fff;color:#16261d;border-radius:26px;padding:30px 28px 26px;text-align:center;box-shadow:0 30px 70px rgba(0,0,0,.35);animation:sEntra .5s cubic-bezier(.2,.9,.25,1.15) both}
    #senha img{width:132px;height:132px;margin:-4px auto 8px;display:block}
    #senha h1{margin:0;font-size:26px;font-weight:900;color:#0d5a3a!important;background:none!important}
    #senha p{margin:6px 0 18px;color:#5b6b62;font-size:15px}
    #senha .campo{position:relative}
    #senha input{width:100%;box-sizing:border-box;font:inherit;font-size:18px;font-weight:700;padding:13px 48px 13px 16px;border-radius:14px;border:2px solid #dbe4dc;outline:none;color:#16261d;background:#fff}
    #senha input:focus{border-color:#1f8f4e}
    #senha .olho{position:absolute;right:8px;top:50%;transform:translateY(-50%);border:0;background:none;font-size:20px;cursor:pointer;padding:6px}
    #senha .ok{margin-top:14px;width:100%;font:inherit;font-size:17px;font-weight:900;color:#fff;background:#1f8f4e;border:0;border-radius:14px;padding:13px;cursor:pointer}
    #senha .ok:hover{background:#0d5a3a}
    #senha .erro{min-height:20px;margin:10px 0 0;color:#c0392b;font-weight:800;font-size:14px}
    #senha form.treme{animation:sTreme .4s}
    @keyframes sEntra{from{opacity:0;transform:translateY(20px) scale(.97)}}
    @keyframes sTreme{20%,60%{transform:translateX(-10px)}40%,80%{transform:translateX(10px)}}`;
  document.head.appendChild(st);

  async function sha(t) {
    if (window.crypto && crypto.subtle) {
      const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t));
      return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join("");
    }
    return sha256(t);
  }
  /* SHA-256 em JS puro, para quando crypto.subtle não existe (arquivo aberto localmente) */
  function sha256(s) {
    const K = [], H = [], r = (x, n) => (x >>> n) | (x << (32 - n));
    let n = 2, c = 0;
    while (c < 64) { let p = 1; for (let d = 2; d * d <= n; d++) if (n % d === 0) { p = 0; break; }
      if (p) { if (c < 8) H[c] = (Math.pow(n, 1 / 2) * 2 ** 32) | 0; K[c++] = (Math.pow(n, 1 / 3) * 2 ** 32) | 0; } n++; }
    const b = [...new TextEncoder().encode(s)], l = b.length * 8;
    b.push(0x80); while (b.length % 64 !== 56) b.push(0);
    for (let i = 7; i >= 0; i--) b.push(i > 3 ? 0 : (l >>> (i * 8)) & 255);
    for (let o = 0; o < b.length; o += 64) {
      const w = []; for (let i = 0; i < 16; i++) w[i] = (b[o + 4 * i] << 24) | (b[o + 4 * i + 1] << 16) | (b[o + 4 * i + 2] << 8) | b[o + 4 * i + 3];
      for (let i = 16; i < 64; i++) { const a = w[i - 15], e = w[i - 2]; w[i] = (w[i - 16] + (r(a, 7) ^ r(a, 18) ^ (a >>> 3)) + w[i - 7] + (r(e, 17) ^ r(e, 19) ^ (e >>> 10))) | 0; }
      let [A, B, C, D, E, F, G, I] = H;
      for (let i = 0; i < 64; i++) {
        const t1 = (I + (r(E, 6) ^ r(E, 11) ^ r(E, 25)) + ((E & F) ^ (~E & G)) + K[i] + w[i]) | 0;
        const t2 = ((r(A, 2) ^ r(A, 13) ^ r(A, 22)) + ((A & B) ^ (A & C) ^ (B & C))) | 0;
        I = G; G = F; F = E; E = (D + t1) | 0; D = C; C = B; B = A; A = (t1 + t2) | 0;
      }
      [A, B, C, D, E, F, G, I].forEach((v, i) => H[i] = (H[i] + v) | 0);
    }
    return H.map(v => (v >>> 0).toString(16).padStart(8, "0")).join("");
  }

  function monta() {
    const d = document.createElement("div");
    d.id = "senha";
    d.innerHTML = `<form autocomplete="on">
      <img src="${new URL("marca/emblema.png", base)}" alt="Classes de Português">
      <h1>Área dos professores</h1>
      <p>Digite a senha para abrir as aulas interativas.</p>
      <input type="text" name="username" value="professores" autocomplete="username" hidden>
      <div class="campo"><input id="senhaIn" type="password" autocomplete="current-password" placeholder="Senha" aria-label="Senha" required>
      <button type="button" class="olho" aria-label="Mostrar senha">👁️</button></div>
      <button class="ok">Entrar</button>
      <div class="erro" role="alert"></div></form>`;
    document.body.appendChild(d);
    const f = d.querySelector("form"), inp = d.querySelector("#senhaIn"), erro = d.querySelector(".erro");
    d.querySelector(".olho").onclick = () => { inp.type = inp.type === "password" ? "text" : "password"; inp.focus(); };
    f.onsubmit = async e => {
      e.preventDefault();
      if (await sha(inp.value) === HASH) {
        try { localStorage.setItem(KEY, HASH); } catch (x) {}
        d.remove(); st.remove();
        window.dispatchEvent(new Event("resize"));
      } else {
        erro.textContent = "Senha incorreta. Tente de novo.";
        f.classList.remove("treme"); void f.offsetWidth; f.classList.add("treme");
        inp.select();
      }
    };
    inp.focus();
  }
  if (document.body) monta(); else document.addEventListener("DOMContentLoaded", monta);
})();
