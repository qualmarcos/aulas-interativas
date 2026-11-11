/* Modo escuro de todas as aulas.
   Segue o tema do sistema até a pessoa tocar no botão 🌙/☀️; a escolha fica guardada
   (chave "aulas-tema") e vale para o launcher e para todas as aulas. */
(function () {
  var K = "aulas-tema", root = document.documentElement;
  var mq = window.matchMedia ? matchMedia("(prefers-color-scheme: dark)") : null;
  function saved() { try { return localStorage.getItem(K); } catch (e) { return null; } }
  function cur() { var s = saved(); return s === "dark" || s === "light" ? s : (mq && mq.matches ? "dark" : "light"); }
  function label() {
    var b = document.getElementById("bTema"); if (!b) return;
    var dark = cur() === "dark";
    b.textContent = dark ? "☀️" : "🌙";
    b.title = dark ? "Modo claro" : "Modo escuro";
    b.setAttribute("aria-label", b.title);
  }
  function apply() { root.setAttribute("data-theme", cur()); label(); }
  function toggle() {
    try { localStorage.setItem(K, cur() === "dark" ? "light" : "dark"); } catch (e) {}
    apply();
  }
  apply();
  if (mq) { var f = function () { if (!saved()) apply(); }; mq.addEventListener ? mq.addEventListener("change", f) : mq.addListener(f); }
  window.addEventListener("storage", function (e) { if (e.key === K) apply(); });
  function mount() {
    if (document.getElementById("bTema")) return;
    var bar = document.getElementById("topbar"), slot = document.querySelector("[data-tema]");
    if (!bar && !slot) return;
    var b = document.createElement("button");
    b.id = "bTema"; b.type = "button"; b.onclick = toggle;
    if (bar) { var m = document.getElementById("bMenu"); m ? bar.insertBefore(b, m) : bar.appendChild(b); }
    else slot.appendChild(b);
    label();
  }
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", mount) : mount();
  window.Tema = { toggle: toggle, get: cur };
})();
