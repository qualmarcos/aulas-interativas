"""Gera aulas interativas a partir do conteúdo estruturado dos flipcharts 2026.

Uso: python3 ferramentas/gerar_aulas.py [filtro]      (ex.: via1, nab3-unidade6; sem filtro: todas)

Fontes (só leitura):
  VIA Brasil:      ~/Documents/flipcharts-2026-autoria/outputs/colecao-flipcharts-2026/via-brasil/<deck>/conteudo.json
  NAB1/NAB2/NAB3:  ~/.codex/.chatgpt-projects/g-p-6ad61f35…/outputs/colecao-flipcharts-2026/nivel{1,2,3}/<deck>/conteudo.json
  Capas de tema:   ~/Documents/flipcharts-2026-autoria/tools/capas_niveis.py (CAPAS)
A numeração segue a dos flipcharts publicados (NAB3 renumerado: Primeira aula = Unidade 1 … Unidade 8 = Unidade 11).
O motor (app.js, sala.js…) é copiado de nab3-unidade5 com o prefixo do localStorage trocado.
Aulas feitas à mão e que NÃO são geradas aqui: nab2-unidade3, via-brasil1-unidade2, nab3-unidade4, nab3-unidade5.
"""
import json, re, shutil, subprocess, sys, html
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
HOME = Path.home()
VIA = HOME / "Documents/flipcharts-2026-autoria/outputs/colecao-flipcharts-2026/via-brasil"
COD = HOME / ".codex/.chatgpt-projects/g-p-6ad61f35fb2c819188b5416a55c0ee85/outputs/colecao-flipcharts-2026"
sys.path.insert(0, str(HOME / "Documents/flipcharts-2026-autoria/tools"))
from capas_niveis import CAPAS  # noqa: E402

MODELO = REPO / "nab3-unidade5"
MOTOR = ["app.js", "audio.js", "teams.js", "notes.js", "sala.js", "aluno.html", "style.css", "index.html"]
MODELO_PFX, MODELO_SHORT = "nab3u3-", "NAB3 · Unidade 5"
FIXAS = ["intercultura-capa", "protocolos-online", "protocolos-presenciais"]
ICONES = ["🎭", "💬", "📚", "🧭", "🌎", "✍️", "🎶", "🔎", "🧩", "🌟", "🗺️", "🎯"]
NIVEL_NOME = {"nab1": "NAB1", "nab2": "NAB2", "nab3": "NAB3", "via1": "VIA Brasil 1"}
e = lambda s: html.escape(str(s), quote=False)
js = lambda o: json.dumps(o, ensure_ascii=False)

# ---------- renumeração (igual à de tools/inserir_capas.py) ----------
FIM = r"(?![\d/\-_]|\.flipchart)"
def _u(velho, novo):
    return [(rf"(?<![/_])([Uu]nidade) {velho}{FIM}", rf"\1 {novo}")]
def _r(a, b, novo, *unis):
    return [(rf"Revisão {a} e {b}{FIM}", f"Revisão {novo}"), (rf"Revisão {a}[–-]{b}{FIM}", f"Revisão {novo}"),
            *[(rf"(?<![/_])([Uu]nidade) {v}{FIM}", rf"\1 {n}") for v, n in unis]]


def deck(level, src, n, rev=None, unit=None, capa=None, troca=(), nome=None):
    """n = número da unidade (ou rótulo da revisão, ex. '1 e 2')."""
    if rev:
        slug = "revisao" + re.sub(r"\D", "", n) + ("-complementar" if nome and "Complementar" in nome else "")
        short = f"{NIVEL_NOME[level]} · Revisão {nome or n}"
    else:
        slug = f"unidade{n}"; short = f"{NIVEL_NOME[level]} · Unidade {n}"
    dirn = f"{level}-{slug}"
    pfx = f"{level}-{'r' if rev else 'u'}{re.sub(r'[^0-9a-z]', '', slug.replace('revisao', '').replace('unidade', '').replace('-complementar', 'c'))}-"
    return dict(level=level, src=src, dir=dirn, pfx=pfx, short=short, unit=unit if unit is not None else int(n), rev=bool(rev),
                capa=capa, troca=list(troca))


N1, N2, N3 = "Nível 1 - NBA1", "Nível 2 - NAB2", "Nível 3 - NAB3"
DECKS = []
for k in (1, 3, 4, 5, 6, 7, 8, 9, 10):
    DECKS.append(deck("via1", VIA / f"unidade{k}", str(k)))
for k, lab, u in (("1", "1", 1.5), ("2", "2", 2.5), ("3", "3", 3.5), ("4", "4", 4.5), ("5", "5", 5.5), ("6", "6", 6.5), ("7", "7", 7.5), ("89", "8 e 9", 9.5), ("10", "10", 10.5)):
    DECKS.append(deck("via1", VIA / f"revisao{k}", lab, rev=True, unit=u))
for k in (1, 2, 3, 5, 6):
    DECKS.append(deck("nab1", COD / f"nivel1/unidade{k}", str(k), capa=f"{N1}/UNIDADE {k}.flipchart"))
DECKS.append(deck("nab1", COD / "nivel1/unidade4parte2", "4", capa=f"{N1}/UNIDADE 4 parte 2.flipchart",
                  troca=[(r"Unidade 4 · [Pp]arte 2", "Unidade 4"), (r"Unidade 4 [–-] [Pp]arte 2", "Unidade 4")]))
for a, b in ((1, 2), (3, 4), (5, 6)):
    DECKS.append(deck("nab1", COD / f"nivel1/revisao{a}e{b}", f"{a} e {b}", rev=True, unit=b + .5, capa=f"{N1}/REVISÃO {a} e {b}.flipchart",
                      troca=[(r"Revisão5e6", "Revisão 5 e 6")]))
for k in (1, 4, 5, 6):
    DECKS.append(deck("nab2", COD / f"nivel2/unidade{k}", str(k), capa=f"{N2}/NAB2 - UNIDADE {k}.flipchart"))
DECKS.append(deck("nab2", COD / "piloto-nab2-unidade2", "2", capa=f"{N2}/NAB2 - UNIDADE 2.flipchart", troca=[(r"UNIDADE 2", "Unidade 2")]))
for a, b in ((1, 2), (3, 4), (5, 6)):
    DECKS.append(deck("nab2", COD / f"nivel2/revisao{a}e{b}", f"{a} e {b}", rev=True, unit=b + .5, capa=f"{N2}/REVISÃO {a} e {b}.flipchart"))
for src, novo, velho, cap in (("primeira-aula", 1, None, "NAB3 - PRIMEIRA AULA"), ("unidade1", 2, 1, "NAB3 - UNIDADE 1"),
                              ("unidade1-estudos-e-escolhas", 3, 1, "NAB3 - UNIDADE 1 - Estudos e escolhas"), ("unidade4", 6, 4, "NAB3 - UNIDADE 4"),
                              ("unidade5", 7, 5, "NAB3 - UNIDADE 5"), ("unidade6", 8, 6, "NAB3 - UNIDADE 6"), ("unidade7", 9, 7, "NAB3 - UNIDADE 7"),
                              ("unidade7-conexoes", 10, 7, "NAB3 - UNIDADE 7 - Conexões e convivência"), ("unidade8", 11, 8, "NAB3 - UNIDADE 8")):
    tr = [(r"Primeira aula", "Unidade 1")] if velho is None else _u(velho, novo)
    if src == "unidade1-estudos-e-escolhas": tr = [(r"Unidade 1 · Estudos e escolhas", "Unidade 3")] + tr
    if src == "unidade7-conexoes": tr = [(r"Unidade 7 · Conexões e convivência", "Unidade 10")] + tr
    DECKS.append(deck("nab3", COD / f"nivel3/{src}", str(novo), capa=f"{N3}/{cap}.flipchart", troca=tr))
for src, nome, unit, cap, tr in (
        ("revisao1e2", "2, 3 e 4", 4.5, "REVISÃO 1 e 2", _r(1, 2, "2, 3 e 4", (1, 2), (2, 4))),
        ("revisao3e4", "5 e 6", 6.5, "REVISÃO 3 e 4 - Consumo e escolhas", _r(3, 4, "5 e 6", (3, 5), (4, 6))),
        ("revisao3e4alternativa", "5 e 6 · Complementar", 6.6, "REVISÃO 3 e 4 - E se", _r(3, 4, "5 e 6", (3, 5), (4, 6))),
        ("revisao5e6", "7 e 8", 8.5, "REVISÃO 5 e 6", _r(5, 6, "7 e 8", (5, 7), (6, 8))),
        ("revisao7e8", "9, 10 e 11", 11.5, "REVISÃO 7 e 8", _r(7, 8, "9, 10 e 11", (7, 9), (8, 11)))):
    d = deck("nab3", COD / f"nivel3/{src}", nome, rev=True, unit=unit, capa=f"{N3}/{cap}.flipchart", troca=tr, nome=nome)
    d["dir"] = "nab3-revisao" + {"revisao1e2": "234", "revisao3e4": "56", "revisao3e4alternativa": "56-complementar", "revisao5e6": "78", "revisao7e8": "91011"}[src]
    d["pfx"] = "nab3-r" + {"revisao1e2": "234", "revisao3e4": "56", "revisao3e4alternativa": "56c", "revisao5e6": "78", "revisao7e8": "91011"}[src] + "-"
    DECKS.append(d)


def trocador(pares):
    rx = [(re.compile(p), r) for p, r in pares]
    def t(s):
        for r_, rep in rx: s = r_.sub(rep, s)
        return s
    def fundo(o):
        if isinstance(o, str): return t(o)
        if isinstance(o, list): return [fundo(x) for x in o]
        if isinstance(o, dict): return {k: (v if k in ("url", "embedUrl", "photoKey", "photoKeys", "file", "id") else fundo(v)) for k, v in o.items()}
        return o
    return fundo


# ---------- conversão das páginas ----------
def static_html(p, inf, fotos):
    body = "".join(f"<p>{e(b)}</p>" for b in p.get("body", []))
    if p.get("instructions"): body += f"<p><i>{e(p['instructions'])}</i></p>"
    cols = ""
    if p.get("columns"):
        cols = '<div class="cols">' + "".join(
            f'<div class="col"><h3>{e(c.get("title", ""))}</h3><p>{e(c.get("text", ""))}</p></div>' for c in p["columns"]) + "</div>"
    imgs = [k for k in p.get("photoKeys", []) if k in fotos]
    head = f'<div class="kicker"><span>{e(inf["short"])}</span><span>{e(p.get("phase", ""))}</span></div><h1>{e(p["title"])}</h1>'
    if p.get("subtitle"): head += f'<p class="lead">{e(p["subtitle"])}</p>'
    if imgs:
        pics = "".join(f'<img class="photo" src="img/{k}.jpg" alt="{e(fotos[k].get("alt", ""))}" style="margin-bottom:10px">' for k in imgs[:2])
        txt = f'<div class="card" style="font-size:clamp(18px,2vw,23px);line-height:1.5">{body}</div>' if body else ""
        return head + f'<div class="cols" style="align-items:start"><div>{txt}{cols}</div><div class="kb">{pics}</div></div>'
    txt = f'<div class="card" style="font-size:clamp(19px,2.2vw,25px);line-height:1.5">{body}</div>' if body else ""
    return head + txt + cols


def lead(p, extra=""):
    l = p.get("instructions", "") or extra
    if p.get("context"): l = f'{e(p["context"])}<br>{l}'
    if p.get("transfer"): l += f'<br><span style="font-size:.9em">💬 {e(p["transfer"])}</span>'
    return l


def palavra_ok(w):
    return 3 <= len(w) <= 18 and re.fullmatch(r"[A-Za-zÀ-ÿ\- ]+", w) and len(w.split()) <= 3


def carregar_fotos(src):
    fotos = {}
    for nome in ("fotos.json", "fotos-cultura.json"):
        f = src / nome
        if not f.exists(): continue
        dados = json.loads(f.read_text())
        if isinstance(dados, dict): dados = dados.get("photos") or dados.get("fotos") or list(dados.values())
        for x in dados:
            if isinstance(x, dict) and x.get("key"): fotos.setdefault(x["key"], x)
    return fotos


def gerar(inf):
    src = inf["src"]
    d = json.loads((src / "conteudo.json").read_text())
    if inf["troca"]: d = trocador(inf["troca"])(d)
    fotos = carregar_fotos(src)
    capas_def = []
    if inf["capa"]:
        capas_def = CAPAS[inf["capa"]][1]
        if inf["troca"]: capas_def = trocador(inf["troca"])([list(c) for c in capas_def])
    out = REPO / inf["dir"]
    out.mkdir(exist_ok=True); (out / "img").mkdir(exist_ok=True)

    for f in MOTOR:
        t = (MODELO / f).read_text()
        t = t.replace(MODELO_PFX, inf["pfx"]).replace(MODELO_SHORT, inf["short"]).replace("Aula no celular · NAB3", "Aula no celular · " + inf["short"])
        if f == "index.html":
            t = re.sub(r'<meta name="description" content="[^"]*">',
                       f'<meta name="description" content="Aula interativa de português do Brasil — {e(inf["short"])}: {e(d.get("subtitle", ""))}.">', t)
        (out / f).write_text(t)
    for k in FIXAS:
        if not (out / "img" / f"{k}.jpg").exists():  # capas do PDF: ferramentas/capas_pdf.py
            shutil.copy(MODELO / "img" / f"{k}.jpg", out / "img" / f"{k}.jpg")

    usadas = set()
    for p in d["pages"]:
        usadas.update(p.get("photoKeys", []))
        for it in p.get("items", []) if isinstance(p.get("items"), list) else []:
            if isinstance(it, dict) and it.get("photoKey"): usadas.add(it["photoKey"])
    cred = {}
    for k in sorted(usadas):
        f = fotos.get(k)
        if not f: continue
        arq = src / f.get("file", f"imagens/{k}.jpg")
        if not arq.exists(): continue
        subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "74", "-Z", "1280", str(arq), "--out", str(out / "img" / f"{k}.jpg")], capture_output=True)
        cred[k] = {"title": f.get("title") or f.get("alt") or k, "author": f.get("author", ""), "license": f.get("license", ""),
                   "page": f.get("source_url") or f.get("page", "")}
    img = lambda k: f"img/{k}.jpg" if k in cred else None

    S = []; icon = 0; hang = {}
    titulo = d.get("subtitle") or d["title"]
    S.append(dict(type="img", src="intercultura-capa", menu="Intercultura · Classes de Português", sec=True))
    S.append(dict(type="img", src="protocolos-online", menu="Protocolos · aulas online"))
    S.append(dict(type="img", src="protocolos-presenciais", menu="Protocolos · aulas presenciais"))
    capas_via = [p for p in d["pages"] if p.get("cover")]
    temas = [c["gram"] for c in capas_via[:3]] if capas_via else [c[1] for c in capas_def[:6]]
    S.append(dict(type="cover", main=True, icon="🇧🇷", num=inf["short"], subj=titulo, gram=" · ".join(temas) or d.get("culturalFocus", ""),
                  goal=f'Recorte cultural: {d.get("state", "")}' + (f' — {d["culturalFocus"]}' if d.get("culturalFocus") else "") + ".", menu="Capa", sec=True))
    ancoras = {c[0]: c for c in capas_def}
    parte = 0; roleta = False
    paginas = [p for p in d["pages"] if p["type"] != "references"]
    # páginas de abertura repetem o título da unidade: a capa geral já cumpre esse papel
    if paginas and paginas[0]["type"] == "static" and not paginas[0].get("columns") and not capas_via and re.search(r"(?i)unidade|revis", paginas[0]["title"]):
        paginas[0] = dict(paginas[0], title=titulo)
    for p in paginas:
        t = p["type"]
        if p["title"] in ancoras:
            a, subj, gram, goal = ancoras.pop(p["title"]); parte += 1
            S.append(dict(type="cover", num=f"Parte {parte}", subj=subj, gram=gram, goal=goal, icon=ICONES[icon % len(ICONES)], menu=subj, sec=True)); icon += 1
        if p.get("cover"):
            S.append(dict(type="cover", num=p.get("num", ""), subj=p["title"], gram=p.get("gram", ""), goal=p.get("goal", ""),
                          icon=ICONES[icon % len(ICONES)], menu=p["title"], sec=True)); icon += 1
            continue
        items = p.get("items", [])
        if t == "static":
            S.append(dict(type="html", menu=p["title"], html=static_html(p, inf, cred)))
            if not roleta and sum(1 for x in S if x["type"] == "html") >= 2:
                S.append(dict(type="wheel", menu="Roleta da turma", title="🎡 Roleta da turma",
                              lead="Professor: escreva os nomes dos alunos (um por linha) e gire para sortear quem responde. Quem entra pela 📱 Sala já aparece aqui."))
                roleta = True
        elif t == "story":
            k = next((k for k in p.get("photoKeys", []) if k in cred), None)
            prompts = p.get("prompts") or [it.get("question", "") for it in items if isinstance(it, dict)] or [p.get("instructions", "")]
            S.append(dict(type="role", title=p["title"], lead=lead(p), cards=prompts, check=p.get("checklist", []) or ["Falei com clareza", "Usei a estrutura da aula", "Escutei e respondi ao colega"],
                          **({"img": img(k)} if k else {})))
        elif t == "cloze" and any("blanks" in it for it in items):
            conv = []
            for it in items:
                bl = it.get("blanks") or [dict(options=it["options"], answer=it["answer"])]
                certo = " … ".join(b["answer"] for b in bl)
                erradas = [[o for o in b["options"] if o != b["answer"]] for b in bl]
                ops = [certo] + [" … ".join(w[i % len(w)] if w else b["answer"] for w, b in zip(erradas, bl)) for i in range(2)]
                ops = list(dict.fromkeys(ops))
                conv.append(dict(q=re.sub(r"_{2,}", "___", it["question"]), o=ops, a=0, c=it.get("explanation", "")))
            S.append(dict(type="mc", title=p["title"], lead=lead(p, "Escolha a opção que completa as lacunas."), items=conv))
        elif t == "cloze":
            its = []
            for it in items:
                q = it.get("question") or it.get("text") or ""
                q = re.sub(r"_{2,}", "___", q)
                if "___" not in q: q += " ___"
                o = it["options"]; a = it["answer"]
                ai = o.index(a) if a in o else (a if isinstance(a, int) else 0)
                its.append(dict(t=q.replace("___", "___", 1), o=o, a=ai, c=it.get("explanation", "")))
            S.append(dict(type="fill", title=p["title"], lead=lead(p, "Toque na palavra que completa cada frase."), items=its))
        elif t in ("choice", "correction"):
            fot = [img(it.get("photoKey")) for it in items]
            conv = [dict(q=it["question"], o=it["options"], a=it["answer"] if isinstance(it["answer"], int) else it["options"].index(it["answer"]), c=it.get("explanation", "")) for it in items]
            if all(fot) and not p.get("video"):
                S.append(dict(type="photoquiz", title=p["title"], lead=lead(p), items=[dict(x, img=f) for x, f in zip(conv, fot)]))
            else:
                s = dict(type="mc", title=p["title"], lead=lead(p), items=conv)
                if p.get("video"):
                    v = p["video"]; s.update(video=v.get("url"), videoTitle=v.get("title", "") + (" — " + v["channel"] if v.get("channel") else ""), videoLen=v.get("duration", ""))
                S.append(s)
        elif t == "match":
            pairs = [[it.get("label") or it.get("prompt"), it.get("target") or it.get("answer")] for it in items]
            if all(img(it.get("photoKey")) for it in items):  # foto + pista → a palavra vira a peça
                pairs = [[b, f'<img src="{img(it["photoKey"])}" alt="" style="height:64px;width:86px;object-fit:cover;border-radius:8px;vertical-align:middle;margin-right:10px">{a}']
                         for (a, b), it in zip(pairs, items)]
            S.append(dict(type="match", title=p["title"], lead=lead(p), pairs=pairs))
            for a, b in pairs:
                if palavra_ok(a): hang.setdefault("Vocabulário", []).append([a.upper(), b])
        elif t == "memory":
            pairs = [[it["label"], it["match"]] for it in items]
            S.append(dict(type="memory", title=p["title"], lead=lead(p), pairs=pairs))
            for a, b in pairs:
                if palavra_ok(b): hang.setdefault("Pares da memória", []).append([b.upper(), a])
                elif palavra_ok(a): hang.setdefault("Pares da memória", []).append([a.upper(), b])
        elif t == "reveal":
            S.append(dict(type="reveal", title=p["title"], lead=lead(p),
                          items=[dict(q=it["question"], a=it["answer"] + (f'<br><small>{e(it["explanation"])}</small>' if it.get("explanation") else ""),
                                      **({"img": img(it.get("photoKey"))} if img(it.get("photoKey")) else {})) for it in items]))
        elif t == "sort":
            S.append(dict(type="sort", title=p["title"], lead=lead(p), groups=p.get("groups") or p.get("categories"), items=[[it["label"], it["answer"]] for it in items]))
        elif t == "order":
            seqs = [it["parts"] for it in items if len(it.get("parts", [])) >= 3]
            for i, parts in enumerate(seqs):
                S.append(dict(type="order", title=p["title"] + (f" ({i + 1})" if len(seqs) > 1 else ""), lead=lead(p), items=parts))
        else:
            print("  tipo ignorado:", t)
    if ancoras: print("  capas sem âncora:", list(ancoras))
    bank = {}
    for cat, ws in hang.items():
        seen = {}; [seen.setdefault(w, h) for w, h in ws]
        if len(seen) >= 4: bank[cat] = [[w, h] for w, h in seen.items()]
    if sum(len(v) for v in bank.values()) >= 6:
        S.append(dict(type="hangman", menu="Jogo da forca", title=f"Jogo da forca: {inf['short'].split(' · ', 1)[1]}",
                      lead="Escolha uma categoria e descubra a palavra antes de o boneco ficar completo. As equipes se alternam: cada uma joga uma palavra.", bank=bank))
    S.append(dict(type="credits", noFit=True, menu="Referências e créditos", title="Referências e créditos"))

    fontes = "; ".join(f'<a href="{s["url"]}" target="_blank" rel="noopener">{e(s["title"])}</a>' + (f' ({e(s["author"])})' if s.get("author") else "")
                       for s in d.get("sources", []) if isinstance(s, dict) and s.get("url"))
    source = (f'{e(inf["short"])} — flipchart Intercultura 2026. Recorte cultural: {e(d.get("state", ""))}'
              + (f' — {e(d["culturalFocus"])}' if d.get("culturalFocus") else "") + ". " + (f"Vídeos e fontes: {fontes}." if fontes else ""))
    lesson = dict(short=inf["short"], foot=f'{inf["short"]} · {titulo}', source=source)
    lines = ["/* CONTEÚDO DA AULA — gerado por ferramentas/gerar_aulas.py a partir do flipchart 2026 (não edite à mão: rode o gerador de novo).",
             "   Cada objeto de S é um slide (tipos: cover, img, html, mc, photoquiz, fill, memory, sort, order, match, role, reveal, hangman, wheel, credits). */",
             f"const LESSON = {js(lesson)};", 'const I = n => "img/" + n + ".jpg";', "const SH = {};", "const S = ["]
    lines += ["  " + js(s) + "," for s in S] + ["];"]
    (out / "content.js").write_text("\n".join(lines) + "\n")
    (out / "credits.js").write_text("window.CREDITS=" + json.dumps(cred, ensure_ascii=False, indent=1) + ";\n")

    tipos = {s["type"] for s in S}
    chips = ["📱 Sala com QR"] + [c for t_, c in (("memory", "Memória"), ("photoquiz", "Fotos"), ("sort", "Classificar"), ("hangman", "Forca")) if t_ in tipos][:3] + ["Equipes"]
    capa = next((k for p in d["pages"] for k in p.get("photoKeys", []) if k in cred), None) or next(iter(cred), "intercultura-capa")
    gram = " · ".join(c["gram"] for c in capas_via) if capas_via else " · ".join(c[1] for c in capas_def)
    if len(gram) > 190: gram = gram[:190].rsplit(" · ", 1)[0] + " · …"
    card = dict(dir=inf["dir"] + "/", level=inf["level"], unit=inf["unit"], tag=inf["short"], title=titulo,
                sub=f'📍 {d.get("state", "")}' + (f' · {d["culturalFocus"]}' if d.get("culturalFocus") else ""), img=f'{inf["dir"]}/img/{capa}.jpg',
                gram=gram, chips=chips, gerada=True)
    print(f"{inf['dir']}: {len(S)} slides, {len(cred)} fotos, forca {sum(len(v) for v in bank.values())}")
    return card


if __name__ == "__main__":
    filtro = sys.argv[1] if len(sys.argv) > 1 else ""
    cards = [gerar(x) for x in DECKS if filtro in x["dir"]]
    arq = REPO / "ferramentas" / "aulas_geradas.json"
    todos = {c["dir"]: c for c in (json.loads(arq.read_text()) if arq.exists() else [])}
    todos.update({c["dir"]: c for c in cards})
    lista = sorted(todos.values(), key=lambda c: (c["level"], c["unit"]))
    arq.write_text(json.dumps(lista, ensure_ascii=False, indent=1))
    (REPO / "aulas-geradas.js").write_text("/* Gerado por ferramentas/gerar_aulas.py — cartões do launcher para as aulas geradas dos flipcharts 2026. */\nwindow.AULAS_GERADAS = "
                                            + json.dumps(lista, ensure_ascii=False, indent=1) + ";\n")
