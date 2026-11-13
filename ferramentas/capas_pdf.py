"""Coloca em cada aula a capa Intercultura e os dois protocolos tirados das 3 primeiras páginas do PDF da unidade
(rótulo e cor do nível iguais aos flipcharts). Precisa de PyMuPDF e Pillow:  python3 -m pip install pymupdf pillow
Na capa, o site e o e-mail vêm de ferramentas/capa-topo.jpg (no PDF eles saem largos demais e invadem a faixa verde);
só a barra de baixo, com nível e unidade, vem do PDF.
Uso: python ferramentas/capas_pdf.py [filtro]
Rode depois de gerar_aulas.py (que não sobrescreve essas imagens se já existirem)."""
import sys, json, re
from pathlib import Path
import pymupdf as fitz
from PIL import Image
TOPO = Image.open(Path(__file__).with_name("capa-topo.jpg"))

REPO = Path(__file__).resolve().parents[1]
PDF = Path.home() / "Downloads/FLIPCHARTS 2026/PDF"
NOMES = ["intercultura-capa", "protocolos-online", "protocolos-presenciais"]


def pdf_de(d):
    m = re.fullmatch(r"(nab[123]|via1)-(unidade|revisao)(.+)", d)
    if d == "via-brasil1-unidade2": return "VIA Brasil/Unidades/UNIDADE 2.pdf"
    lv, kind, n = m.groups()
    if lv == "via1":
        return f"VIA Brasil/Unidades/UNIDADE {n}.pdf" if kind == "unidade" else f"VIA Brasil/Revisões/REVISÃO {'8 _ 9' if n == '89' else n}.pdf"
    pasta = {"nab1": "Nível 1 - NBA1", "nab2": "Nível 2 - NAB2", "nab3": "Nível 3 - NAB3"}[lv]
    if kind == "unidade":
        return f"{pasta}/Unidades/{'' if lv == 'nab1' else lv.upper() + ' - '}UNIDADE {n}.pdf"
    rev = {"12": "1 e 2", "34": "3 e 4", "56": "5 e 6", "234": "2, 3 e 4", "78": "7 e 8", "91011": "9, 10 e 11",
           "56-complementar": "5 e 6 - Complementar"}[n]
    return f"{pasta}/Revisões/REVISÃO {rev}.pdf"


if __name__ == "__main__":
    filtro = sys.argv[1] if len(sys.argv) > 1 else ""
    pastas = sorted(p.name for p in REPO.iterdir() if (p / "content.js").exists() and filtro in p.name)
    for d in pastas:
        f = PDF / pdf_de(d)
        doc = fitz.open(f)
        for i, nome in enumerate(NOMES):
            pix = doc[i].get_pixmap(matrix=fitz.Matrix(1.5, 1.5))
            im = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
            if i == 0: im.paste(TOPO.resize((pix.width, round(TOPO.height * pix.width / TOPO.width))), (0, 0))
            im.save(REPO / d / "img" / f"{nome}.jpg", quality=80)
        print(d, "←", f.relative_to(PDF))
