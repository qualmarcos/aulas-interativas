"""Troca, nas aulas geradas, as categorias automáticas da forca ('Pares da memória', 'Vocabulário')
pelas categorias escritas à mão em ferramentas/forca_categorias.json. Uso: python3 ferramentas/aplicar_forca.py"""
import json
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
GENERICAS = ("Pares da memória", "Vocabulário")
CATS = {k: v for k, v in json.loads((REPO / "ferramentas/forca_categorias.json").read_text()).items() if not k.startswith("_")}


def ajustar(pasta, bank):
    """Usado também por gerar_aulas.py."""
    bank = {c: w for c, w in bank.items() if c not in GENERICAS}
    bank.update(CATS.get(pasta, {}))
    return bank


if __name__ == "__main__":
    for f in sorted(REPO.glob("*/content.js")):
        linhas = f.read_text().split("\n")
        for i, l in enumerate(linhas):
            if l.startswith('  {"type": "hangman"'):
                s = json.loads(l.strip().rstrip(","))
                novo = ajustar(f.parent.name, s["bank"])
                if novo != s["bank"]:
                    s["bank"] = novo
                    linhas[i] = "  " + json.dumps(s, ensure_ascii=False) + ","
                    f.write_text("\n".join(linhas)); print(f.parent.name, "→", " · ".join(novo))
                elif any(c in GENERICAS for c in novo): print("SEM CATEGORIAS:", f.parent.name)
