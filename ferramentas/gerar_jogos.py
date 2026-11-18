"""Monta as pastas de jogos (aba "Jogos" da página inicial) com o mesmo motor das aulas.
Copia o motor de nab3-unidade5 trocando o prefixo do localStorage e o rótulo; NÃO toca em content.js
(o conteúdo de cada jogo é escrito à mão: ex. jogos-forca/content.js).
Uso: python3 ferramentas/gerar_jogos.py"""
import re
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
MODELO = REPO / "nab3-unidade5"
MOTOR = ["app.js", "audio.js", "teams.js", "notes.js", "sala.js", "aluno.html", "style.css", "index.html"]
JOGOS = [
    dict(dir="jogos-forca", pfx="jogos-forca-", short="Jogos · Forca",
         desc="Jogo da forca com categorias de vocabulário para todos os níveis."),
]

for j in JOGOS:
    out = REPO / j["dir"]
    out.mkdir(exist_ok=True); (out / "img").mkdir(exist_ok=True)
    for f in MOTOR:
        t = (MODELO / f).read_text()
        t = t.replace("nab3u3-", j["pfx"]).replace("NAB3 · Unidade 5", j["short"]).replace("Aula no celular · NAB3", "Jogo no celular · " + j["short"])
        if f == "index.html":
            t = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{j["desc"]}">', t)
            t = re.sub(r"<title>[^<]*</title>", f"<title>{j['short']} · Intercultura</title>", t)
        (out / f).write_text(t)
    if not (out / "credits.js").exists():
        (out / "credits.js").write_text("window.CREDITS = {};\n")
    print(j["dir"], "ok")
