/* =====================================================================
   CONTEÚDO DA AULA — NAB2 · Unidade 3 · Português do Brasil
   Para editar: cada S.push({...}) é um slide. Tipos disponíveis:
   cover, img, html, gallery, photos, photoquiz, reveal, mc, fill, memory,
   sort, order, match, role, hangman, race, where, wheel
   ===================================================================== */
const I = n => "img/" + n + ".jpg";
const SH = {
  "círculo": '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#2356a0"/></svg>',
  "quadrado": '<svg viewBox="0 0 100 100"><rect x="12" y="12" width="76" height="76" fill="#3f8a4b"/></svg>',
  "retângulo": '<svg viewBox="0 0 100 100"><rect x="5" y="28" width="90" height="44" fill="#f2b705"/></svg>',
  "triângulo": '<svg viewBox="0 0 100 100"><polygon points="50,8 94,90 6,90" fill="#c0392b"/></svg>',
  "losango": '<svg viewBox="0 0 100 100"><polygon points="50,4 92,50 50,96 8,50" fill="#8e44ad"/></svg>'
};
const S = [];
const sec = (num, subj, gram, goal, icon) => S.push({ type: "cover", num, subj, gram, goal, icon, menu: subj, sec: true });
const say = w => `<span class="say">${w}</span>`;

/* ---------------- Abertura institucional ---------------- */
S.push({ type: "img", src: "intercultura-capa", menu: "Intercultura · Classes de Português", sec: true });
S.push({ type: "img", src: "protocolos-online", menu: "Protocolos · aulas online" });
S.push({ type: "img", src: "protocolos-presenciais", menu: "Protocolos · aulas presenciais" });

/* ---------------- Capa geral ---------------- */
S.push({ type: "cover", main: true, icon: "🧳", num: "NAB2 · Unidade 3", subj: "Escolhas que vestem o futuro",
  gram: "Futuro do presente · Futuro do pretérito · Verbos vestir, pôr, ir e vir",
  goal: "Descreva roupas, faça compras e negocie escolhas para situações reais. Planeje uma viagem, faça previsões e imagine outras possibilidades.", menu: "Capa da unidade", sec: true });
S.push({ type: "html", menu: "Nossa rota", html: `
  <div class="kicker"><span>Intercultura / Português para a vida real</span><span>NAB2 / Unidade 3</span></div>
  <h1>Nossa rota</h1><p class="lead">Roupas, escolhas e futuros</p>
  <div class="cols">
    <div class="col"><h3>🛍️ 1 · Na loja</h3><p>Roupas, cores, materiais e atendimento em uma loja.</p></div>
    <div class="col"><h3>🎭 2 · Amazonas</h3><p>Roupas e criatividade no Festival de Parintins.</p></div>
    <div class="col"><h3>🔮 3 · Futuros</h3><p>Planos, hipóteses e verbos do cotidiano; formas e posições.</p></div>
  </div>
  <div class="card"><b>Como funciona:</b> cada assunto começa com uma <span class="hl">capa</span> com o tema e a estrutura gramatical.
  Use o <b>placar</b> no topo para jogar em equipes e a <b>🎡 roleta</b> para sortear quem responde.</div>` });
S.push({ type: "wheel", menu: "Roleta da turma", title: "🎡 Roleta da turma",
  lead: "Professor: abra a roleta, escreva os nomes dos alunos (um por linha) e gire para sortear quem responde. A roleta também fica no botão do topo, em qualquer slide." });
S.push({ type: "reveal", title: "Aquecimento: o que você levaria na mala?", lead: "Converse antes de revelar. Compare sua ideia com a resposta comentada.", top: I("mala"), items: [
  { img: I("camiseta"), q: "Que peça branca de manga curta é esta?", a: "Uma <b>camiseta</b> branca de manga curta. Você levaria uma na mala? Para qual viagem?" },
  { img: I("cachecol"), q: "O que ela usa no pescoço para se proteger do frio?", a: "Um <b>cachecol</b>. Na cabeça, ela usa uma <b>touca</b>. Combina com destinos frios, junto com luvas e casaco." },
  { img: I("tenis"), q: "Que calçado é este?", a: "<b>Tênis</b>. Eu calço tênis para fazer trilha ou passear pela cidade." },
  { img: I("sandalia"), q: "E este calçado, muito usado no Brasil para ir à praia?", a: "Um <b>chinelo</b> (ou <i>chinelo de dedo</i>). No Brasil, é o calçado do dia a dia no calor!" }
] });

/* ================= 1. ROUPAS ================= */
sec("Parte 1", "Roupas, calçados e acessórios", "Substantivos + adjetivos: concordância de cor, material (de + material) e padrão", "Nomear peças, descrevê-las e encontrar o que você procura.", "👗");
S.push({ type: "html", menu: "Um guarda-roupa, muitas possibilidades", html: `
  <div class="kicker"><span>Roupas, escolhas e futuros</span><span>Vocabulário</span></div>
  <h1>Um guarda-roupa, muitas possibilidades</h1>
  <div class="cols">
    <div class="col"><h3>👕 Roupas</h3><p>${["camisa", "camiseta", "regata"].map(say).join(", ")}</p><p>${["calça", "bermuda", "short", "saia"].map(say).join(", ")}</p><p>${["vestido", "terno", "paletó", "pijama"].map(say).join(", ")}</p></div>
    <div class="col"><h3>👟 Calçados e acessórios</h3><p>${["sapato", "tênis", "sandália", "chinelo"].map(say).join(", ")}</p><p>${["cinto", "bolsa", "relógio"].map(say).join(", ")}</p><p>${["colar", "brinco", "pulseira", "anel"].map(say).join(", ")}</p></div>
    <div class="col"><h3>🧥 Clima e conforto</h3><p>${["casaco", "jaqueta", "cachecol", "luvas"].map(say).join(", ")}</p><p>${["boné", "chapéu", "canga"].map(say).join(", ")}</p><p>${["maiô", "biquíni", "sunga"].map(say).join(", ")}</p></div>
  </div>
  <div class="br"><b>🇧🇷 No Brasil:</b> na praia, usamos <b>sunga</b>, <b>maiô</b> ou <b>biquíni</b>, sentamos na <b>canga</b> e calçamos <b>chinelo</b>. No frio, também se diz <b>blusa de frio</b> ou <b>moletom</b>.</div>` });
S.push({ type: "gallery", title: "Galeria do guarda-roupa", lead: "Olhe a foto, diga o nome em voz alta e toque para conferir.", items: [
  ["camiseta", "camiseta", "Uma camiseta branca"], ["vestido", "vestido", "Um vestido de verão"], ["casaco", "casaco", "Um casaco verde"], ["tenis", "tênis", "Tênis de corrida coloridos"],
  ["bone", "boné", "Um boné xadrez"], ["cachecol", "cachecol", "Um cachecol azul"], ["bolsa", "bolsa", "Uma bolsa de couro"], ["luvas", "luva", "Uma luva de lã"],
  ["cinto", "cinto", "Um cinto preto"], ["relogio", "relógio", "Um relógio de pulso"], ["chapeu", "chapéu", "Um chapéu de palha"], ["pijama", "pijama", "Um pijama xadrez"],
  ["sandalia", "chinelo", "Um par de chinelos"], ["brinco", "brinco", "Um brinco de pérola"]] });
S.push({ type: "memory", title: "Jogo da memória: a mala", lead: "Vire as cartas e encontre os pares (foto ↔ palavra). Depois use duas palavras em uma frase.", pairs: [
  ["img:camiseta", "camiseta"], ["img:tenis", "tênis"], ["img:bone", "boné"], ["img:bolsa", "bolsa"], ["img:casaco", "casaco"], ["img:relogio", "relógio"]] });
S.push({ type: "photoquiz", title: "Que peça é esta?", lead: "Observe a foto e escolha a palavra certa.", items: [
  { img: I("cinto"), q: "Que acessório é este?", o: ["cinto", "colar", "anel"], a: 0, c: "É um cinto. Usamos na cintura para ajustar a calça." },
  { img: I("luvas"), q: "O que protege as mãos no frio?", o: ["meias", "luvas", "botas"], a: 1, c: "Luvas (normalmente usamos um par de luvas)." },
  { img: I("chapeu"), q: "O que a pintora usa na cabeça?", o: ["um boné", "um chapéu de palha", "uma touca"], a: 1, c: "Um chapéu de palha. O boné tem aba só na frente." },
  { img: I("brinco"), q: "No famoso quadro, o que a moça usa na orelha?", o: ["um brinco de pérola", "uma pulseira", "um colar"], a: 0, c: "Um brinco de pérola — o quadro se chama “Moça com Brinco de Pérola”." },
  { img: I("pijama"), q: "Que roupa o menino está usando?", o: ["um terno", "um pijama", "uma sunga"], a: 1, c: "Um pijama xadrez, roupa para dormir." },
  { img: I("relogio"), q: "Que acessório mostra as horas?", o: ["relógio", "brinco", "bolsa"], a: 0, c: "Relógio de pulso." }] });
S.push({ type: "sort", title: "Uma missão para cada peça", lead: "Toque em uma peça e depois no grupo certo. Toque numa peça já colocada para devolvê-la.",
  groups: ["❄️ Destino frio", "🥾 Caminhada ao ar livre", "🏖️ Praia ou piscina"],
  items: [["Luvas de lã", 0], ["Casaco quente", 0], ["Cachecol", 0], ["Tênis para caminhar", 1], ["Boné", 1], ["Bermuda leve", 1], ["Maiô", 2], ["Sunga", 2], ["Canga", 2], ["Chinelo", 2]] });
S.push({ type: "hangman", title: "Jogo da forca: o guarda-roupa", lead: "Escolha uma categoria (ou todas) e descubra a palavra antes de o boneco ficar completo. Cada equipe joga uma palavra!", bank: {
  "Roupas": [
    ["CAMISETA", "Peça de manga curta, sem botões, muito usada no calor."], ["CAMISA", "Tem gola e botões na frente."], ["REGATA", "Camiseta sem mangas."],
    ["CALÇA", "Cobre as duas pernas, da cintura até o tornozelo."], ["BERMUDA", "Calça curta, até perto do joelho."], ["SAIA", "Cobre da cintura para baixo, sem separar as pernas."],
    ["VESTIDO", "Peça única que cobre o tronco e as pernas."], ["TERNO", "Roupa formal: paletó e calça do mesmo tecido."], ["PALETÓ", "A parte de cima de um terno."],
    ["PIJAMA", "Roupa para dormir."], ["MOLETOM", "Blusa de frio de tecido grosso e macio, às vezes com capuz."], ["JAQUETA", "Parecida com um casaco, porém mais curta."],
    ["CASACO", "Peça grossa que usamos por cima da roupa no frio."], ["BLUSA", "Peça que cobre a parte de cima do corpo; no Brasil também pode ser a “blusa de frio”."],
    ["MACACÃO", "Peça única com calça e parte de cima juntas."], ["UNIFORME", "Roupa igual para todos de uma escola ou empresa."]],
  "Calçados e acessórios": [
    ["TÊNIS", "Calçado confortável para caminhar e fazer esporte."], ["SAPATO", "Calçado fechado, mais formal."], ["SANDÁLIA", "Calçado aberto, preso por tiras."],
    ["CHINELO", "Calçado aberto e simples, muito usado no Brasil no calor."], ["BOTA", "Calçado que cobre o tornozelo ou parte da perna."], ["MEIA", "Usamos nos pés, dentro do sapato ou do tênis."],
    ["CINTO", "Usamos na cintura para ajustar a calça."], ["BOLSA", "Serve para carregar carteira, chaves e celular."], ["MOCHILA", "Bolsa que levamos nas costas."],
    ["RELÓGIO", "Mostra as horas; usamos no pulso."], ["COLAR", "Joia ou bijuteria usada no pescoço."], ["BRINCO", "Usamos na orelha."], ["PULSEIRA", "Usamos no pulso, como enfeite."],
    ["ANEL", "Usamos no dedo."], ["ÓCULOS", "Protegem os olhos do sol ou ajudam a enxergar."], ["BONÉ", "Protege a cabeça do sol; tem aba só na frente."],
    ["CHAPÉU", "Protege a cabeça; tem aba em volta toda."], ["GRAVATA", "Acessório usado no pescoço, com camisa e terno."], ["CARTEIRA", "Onde guardamos dinheiro e documentos."], ["GUARDA-CHUVA", "Protege da chuva."]],
  "Praia e clima": [
    ["SUNGA", "Roupa de banho masculina, comum nas praias do Brasil."], ["MAIÔ", "Roupa de banho feminina de uma peça só."], ["BIQUÍNI", "Roupa de banho de duas peças."],
    ["CANGA", "Tecido leve para sentar na areia ou amarrar na cintura."], ["GUARDA-SOL", "Grande sombrinha que levamos para a praia."], ["PROTETOR SOLAR", "Creme que protege a pele do sol."],
    ["CACHECOL", "Usamos no pescoço quando faz frio."], ["LUVAS", "Protegem as mãos do frio."], ["TOUCA", "Protege a cabeça e as orelhas do frio."],
    ["CAPA DE CHUVA", "Roupa impermeável para dias chuvosos."], ["CALOR", "O contrário de frio."], ["VERÃO", "Estação mais quente do ano."], ["INVERNO", "Estação mais fria do ano."]],
  "Cores, materiais e padrões": [
    ["VERMELHO", "A cor do Garantido, em Parintins."], ["AZUL", "A cor do Caprichoso, em Parintins."], ["AMARELO", "A cor do sol e da camisa da seleção brasileira."],
    ["LARANJA", "Cor e também uma fruta."], ["MARROM", "A cor do café e do chocolate."], ["CINZA", "Mistura de preto e branco."], ["ROXO", "Mistura de vermelho e azul."],
    ["DOURADO", "Da cor do ouro."], ["ALGODÃO", "Tecido natural, leve e fresco."], ["COURO", "Material de cintos, bolsas e sapatos."], ["SEDA", "Tecido fino e brilhante."],
    ["JEANS", "Tecido azul resistente, usado em calças."], ["LISTRADO", "Com listras."], ["XADREZ", "Com quadrados, como nas festas juninas."], ["ESTAMPADO", "Com desenhos coloridos no tecido."], ["LISO", "De uma cor só, sem desenhos."]],
  "Na loja": [
    ["PROVADOR", "Lugar da loja onde experimentamos a roupa."], ["TAMANHO", "P, M, G ou GG."], ["ETIQUETA", "Mostra o preço, o tamanho e o material."],
    ["DESCONTO", "Quando o preço fica mais baixo."], ["PARCELAR", "Pagar em várias vezes no cartão."], ["CARTÃO", "Forma de pagamento: de crédito ou de débito."],
    ["VITRINE", "Onde a loja mostra as roupas para quem passa na rua."], ["CAIXA", "Lugar onde pagamos."], ["VENDEDOR", "Pessoa que atende e ajuda o cliente."],
    ["EXPERIMENTAR", "Vestir a roupa antes de comprar."], ["APERTADA", "Quando a roupa fica pequena demais."], ["PROMOÇÃO", "Período com preços mais baixos."], ["TROCA", "Devolver uma peça para pegar outra."]],
  "Amazonas e Parintins": [
    ["AMAZONAS", "Estado onde fica Parintins."], ["PARINTINS", "Cidade do famoso festival dos bois-bumbás."], ["CAPRICHOSO", "O boi azul do festival."],
    ["GARANTIDO", "O boi vermelho do festival."], ["BUMBÓDROMO", "A arena onde os bois se apresentam."], ["FIGURINO", "Conjunto de roupas de uma apresentação."],
    ["ADEREÇO", "Objeto usado para compor a roupa ou a cena."], ["ALEGORIA", "Grande estrutura decorada que representa um tema."], ["CENÁRIO", "Ambiente montado onde a cena acontece."],
    ["MANAUS", "Capital do Amazonas."], ["TORCIDA", "Grupo de pessoas que apoia um dos bois."], ["FLORESTA", "A Amazônia é a maior do mundo."], ["RIO NEGRO", "Rio que passa por Manaus."]],
  "Verbos no futuro": [
    ["FAREI", "Fazer · eu · futuro do presente."], ["DIREI", "Dizer · eu · futuro do presente."], ["TRAREI", "Trazer · eu · futuro do presente."],
    ["VIRÃO", "Vir · eles · futuro do presente."], ["IREMOS", "Ir · nós · futuro do presente."], ["VIAJAREMOS", "Viajar · nós · futuro do presente."],
    ["POREI", "Pôr · eu · futuro do presente."], ["FARIA", "Fazer · eu · futuro do pretérito."], ["GOSTARIA", "Gostar · eu · futuro do pretérito (pedido educado)."],
    ["PODERIA", "Poder · você · futuro do pretérito (pedido educado)."], ["DIRIA", "Dizer · eu · futuro do pretérito."], ["COMPRARIA", "Comprar · eu · futuro do pretérito."], ["VESTIREMOS", "Vestir · nós · futuro do presente."]],
  "Formas e posições": [
    ["CÍRCULO", "Forma redonda."], ["QUADRADO", "Quatro lados iguais."], ["RETÂNGULO", "Quatro lados: dois longos e dois curtos."],
    ["TRIÂNGULO", "Forma de três lados."], ["LOSANGO", "Forma da bandeira do Brasil, no meio do verde."], ["ESQUERDA", "O contrário de direita."],
    ["DIREITA", "O contrário de esquerda."], ["EMBAIXO", "O contrário de em cima."], ["ENTRE", "No meio de duas coisas."], ["AO LADO", "Perto, na lateral."]]
} });
S.push({ type: "html", menu: "Descrever ajuda a encontrar", html: `
  <div class="kicker"><span>Roupas, escolhas e futuros</span><span>Estrutura</span></div>
  <h1>Descrever ajuda a encontrar</h1>
  <div class="cols">
    <div class="col"><h3>🎨 Cor</h3><p>uma camiseta <span class="hl">branca</span><br>duas camisas <span class="hl">azuis</span></p><p style="font-size:17px;color:var(--muted)">O adjetivo concorda com a peça em número (e em gênero, quando varia).</p></div>
    <div class="col"><h3>🧵 Material</h3><p>de algodão, <span class="hl">de lã</span>, de seda, de couro</p><p style="font-size:17px;color:var(--muted)">Veja a etiqueta para confirmar.</p></div>
    <div class="col"><h3>▦ Padrão</h3><p>liso, listrado, xadrez ou estampado</p><p style="font-size:17px;color:var(--muted)">A descrição não depende de uma divisão por gênero.</p></div>
  </div>
  <div class="pgrid" style="margin-top:16px">
    <div class="pcard"><img src="${I("camiseta")}" alt="camiseta lisa"><div><b>lisa</b> · uma camiseta branca lisa</div></div>
    <div class="pcard"><img src="${I("listrado")}" alt="camiseta listrada"><div><b>listrada</b> · Matisse com camiseta listrada</div></div>
    <div class="pcard"><img src="${I("xadrez")}" alt="camisa xadrez"><div><b>xadrez</b> · uma camisa xadrez</div></div>
    <div class="pcard"><img src="${I("tecido")}" alt="tecidos estampados"><div><b>estampado</b> · tecidos estampados e coloridos</div></div>
  </div>
  <div class="card"><b>Fórmula:</b> peça + cor + <i>de</i> + material + padrão → <span class="hl">uma camisa azul de algodão, listrada</span>. <i>Xadrez</i> não muda: camisas xadrez.</div>` });
S.push({ type: "fill", title: "O pedido ficou claro?", lead: "Toque na opção que completa cada frase.", items: [
  { t: "Quero duas camisas ___. A cor é azul.", o: ["azul", "azuis", "azulas"], a: 1, c: "Duas camisas → plural: azuis." },
  { t: "Prefiro uma camiseta ___ de algodão.", o: ["branco", "branca", "brancas"], a: 1, c: "Camiseta é feminino singular: branca." },
  { t: "Este casaco é ___ lã. Esquenta muito!", o: ["com", "em", "de"], a: 2, c: "Material: de + material → de lã." },
  { t: "Gosto de saias ___, com listras.", o: ["listradas", "listrado", "listrada"], a: 0, c: "Saias (feminino plural) → listradas." },
  { t: "Comprei duas camisas ___ para a festa junina.", o: ["xadrezes", "xadrez", "xadreza"], a: 1, c: "Xadrez é invariável: camisas xadrez." }] });

/* ================= 2. VESTIR, CALÇAR, USAR ================= */
sec("Parte 2", "Vestir, calçar e usar", "Verbos vestir(-se), calçar e usar: presente, pretérito perfeito e imperfeito", "Contar sua rotina e o que você usava ou usou em outras ocasiões.", "👔");
S.push({ type: "html", menu: "Vestir, calçar e usar", html: `
  <div class="kicker"><span>Roupas, escolhas e futuros</span><span>Estrutura</span></div>
  <h1>Vestir, calçar e usar</h1>
  <p>Eu <span class="hl">visto</span> uma camiseta; eu <span class="hl">me visto</span> antes de sair. Ontem eu me vesti; antes eu me vestia assim.</p>
  <div class="tablewrap"><table class="conj"><tr><th>vestir</th><th>Presente</th><th>Pret. perfeito</th><th>Pret. imperfeito</th></tr>
  <tr><td>eu</td><td><b>visto</b></td><td>vesti</td><td>vestia</td></tr>
  <tr><td>ele / ela / você</td><td>veste</td><td>vestiu</td><td>vestia</td></tr>
  <tr><td>nós</td><td>vestimos</td><td>vestimos</td><td>vestíamos</td></tr>
  <tr><td>eles / elas / vocês</td><td>vestem</td><td>vestiram</td><td>vestiam</td></tr></table></div>
  <div class="card">👟 Eu <b>calço</b> tênis (calçados) · ⌚ Eu <b>uso</b> um relógio. <b>Usar</b> é muito comum com roupas: <i>uso jeans no trabalho.</i></div>
  <div class="br"><b>🇧🇷 Na fala do Brasil:</b> é muito comum <b>colocar</b> e <b>botar</b> no lugar de vestir: <i>Vou colocar um casaco. Bota o tênis!</i> E o pronome vem antes do verbo: <i>eu <b>me</b> visto</i>.</div>` });
S.push({ type: "fill", title: "Antes de sair de casa", lead: "Toque na forma adequada ao contexto.", items: [
  { t: "Hoje eu me ___ cedo para trabalhar.", o: ["veste", "visto", "vesti"], a: 1, c: "Presente, eu: (me) visto — repare no i da 1ª pessoa." },
  { t: "Ontem nós nos ___ rápido para a festa.", o: ["vestimos", "vestiram", "vestíamos"], a: 0, c: "Ação pontual no passado, nós: vestimos." },
  { t: "Quando eu era criança, eu me ___ sozinho.", o: ["vesti", "vestia", "visto"], a: 1, c: "Hábito no passado → imperfeito: vestia." },
  { t: "Para correr, eu ___ tênis.", o: ["calço", "visto", "veste"], a: 0, c: "Com calçados: calçar (usar também é possível)." },
  { t: "Ela sempre ___ um relógio dourado.", o: ["calça", "veste", "usa"], a: 2, c: "Com acessórios: usar." }] });
S.push({ type: "race", title: "Desafio relâmpago: vestir", lead: "15 segundos por pergunta! Sorteie um aluno na roleta e valendo ponto para a equipe.", secs: 15, items: [
  { q: "eles · presente · vestir", o: ["vestem", "vestiram", "vistem"], a: 0 },
  { q: "eu · pretérito perfeito · vestir", o: ["vesti", "visti", "vestei"], a: 0 },
  { q: "nós · imperfeito · vestir", o: ["vestíamos", "vestimos", "vestiamos"], a: 0 },
  { q: "ela · pretérito perfeito · vestir", o: ["vestiu", "vestia", "vesteu"], a: 0 },
  { q: "eu · presente · calçar", o: ["calço", "calce", "calçou"], a: 0 },
  { q: "vocês · pretérito perfeito · usar", o: ["usaram", "usam", "usavam"], a: 0 }] });

/* ================= 3. NA LOJA ================= */
sec("Parte 3", "Na loja: perguntar antes de decidir", "Pedidos e perguntas de cortesia: Gostaria de… · Posso…? · Tem…? · Quanto custa?", "Pedir um tamanho, experimentar, negociar e pagar sem mal-entendidos.", "🛍️");
S.push({ type: "html", menu: "Na loja: diálogo modelo", html: `
  <div class="kicker"><span>Roupas, escolhas e futuros</span><span>Diálogo</span></div>
  <h1>Na loja: pergunte antes de decidir</h1>
  <div class="cols" style="align-items:start">
  <div class="card" style="margin:0"><p>🛍️ <b>Cliente:</b> <span class="say">Gostaria de ver uma camiseta azul. Tem tamanho M? Posso experimentar?</span></p>
  <p>🧑‍💼 <b>Atendente:</b> <span class="say">Claro. O provador fica ali. Ficou boa ou prefere outro tamanho?</span></p>
  <p>🛍️ <b>Cliente:</b> <span class="say">Ficou um pouco apertada. Tem uma maior? Quanto custa? Posso pagar com cartão?</span></p></div>
  <div class="kb"><img class="photo" src="${I("loja")}" alt="Interior de uma loja de roupas"></div></div>
  <div class="cols" style="margin-top:14px"><div class="col"><h3>Para pedir</h3><p>Gostaria de… · Queria… · Você teria…?</p></div><div class="col"><h3>Para avaliar</h3><p>Ficou boa / apertada / larga / curta / comprida.</p></div><div class="col"><h3>Para pagar</h3><p>Quanto custa? · Aceita cartão? Pix? · Dá para parcelar? · Tem desconto?</p></div></div>
  <div class="br"><b>🇧🇷 No Brasil:</b> é comum perguntar <b>“Aceita Pix?”</b> e <b>“Dá para parcelar no cartão?”</b> (pagar em várias vezes).</div>` });
S.push({ type: "order", title: "Do pedido ao provador", lead: "Toque nas falas na ordem certa para montar o diálogo.", items: [
  "Boa tarde! Gostaria de ver uma camiseta azul.", "Claro! Qual tamanho você procura?", "Tamanho M. Posso experimentar?", "Pode sim. O provador fica à direita.", "Ficou um pouco apertada. Tem uma maior?", "Tenho, sim. Aqui está a G."] });
S.push({ type: "mc", title: "Uma compra sem mal-entendido", lead: "Escolha a resposta adequada ao contexto e explique sua escolha.", items: [
  { q: "A peça ficou apertada. Você quer uma maior. O que diz?", o: ["Pode diminuir o preço?", "Tem um tamanho maior?", "O caixa fica ali?"], a: 1, c: "Você precisa de outro tamanho, não de desconto." },
  { q: "Você quer provar a calça antes de comprar.", o: ["Posso experimentar?", "Posso pagar com cartão?", "Quanto custa?"], a: 0, c: "Experimentar = provar a roupa no provador." },
  { q: "Você quer saber o preço da jaqueta.", o: ["Tem outra cor?", "Onde fica o provador?", "Quanto custa?"], a: 2, c: "Quanto custa? é a pergunta mais direta sobre preço." },
  { q: "Você não tem dinheiro vivo, mas tem o aplicativo do banco.", o: ["Aceita Pix?", "Ficou boa?", "Tem tamanho P?"], a: 0, c: "No Brasil, o Pix é uma forma de pagamento muito comum." },
  { q: "O tênis é caro e você quer pagar em três vezes.", o: ["Dá para parcelar em três vezes?", "Tem um número maior?", "Posso trocar?"], a: 0, c: "Parcelar = dividir o pagamento em parcelas." }] });
S.push({ type: "role", title: "Loja pop-up da turma", lead: "Sorteie uma dupla na roleta 🎡 e depois uma situação. Inventem personagens e troquem os papéis.", cards: [
  "🧳 Você precisa de duas peças para uma viagem. Diga cor, tamanho e limite de preço.",
  "🧑‍💼 Você atende na loja: ofereça duas opções e explique preço, tamanho e forma de pagamento.",
  "🔄 Troquem de papel. Negociem uma alternativa se a primeira peça não servir.",
  "💳 O cliente quer parcelar ou pagar com Pix. Negociem um desconto à vista."],
  check: ["Usei Gostaria de… / Posso…? / Tem…?", "Descrevi cor, material ou tamanho", "Perguntei o preço ou a forma de pagamento", "Negociei uma alternativa"] });
S.push({ type: "html", menu: "Cores e sentidos variam", html: `
  <div class="kicker"><span>Roupas, escolhas e futuros</span><span>Cultura</span></div>
  <h1>Cores e sentidos variam</h1>
  <p class="lead">Toque em uma cor e receba uma pergunta para conversar.</p>
  <div class="colors">
    <button class="sw" style="background:#d62828" data-c="vermelho">vermelho</button><button class="sw" style="background:#1d4ed8" data-c="azul">azul</button>
    <button class="sw" style="background:#2e8b57" data-c="verde">verde</button><button class="sw" style="background:#f2b705" data-c="amarelo">amarelo</button>
    <button class="sw" style="background:#111" data-c="preto">preto</button><button class="sw" style="background:#f2f2f2;color:#333;text-shadow:none" data-c="branco">branco</button>
    <button class="sw" style="background:#7b2cbf" data-c="roxo">roxo</button><button class="sw" style="background:#f77f00" data-c="laranja">laranja</button>
    <button class="sw" style="background:#ff70a6" data-c="rosa">rosa</button><button class="sw" style="background:#8d6e63" data-c="marrom">marrom</button>
    <button class="sw" style="background:#9e9e9e" data-c="cinza">cinza</button><button class="sw" style="background:#4b2e83;" data-c="anil">anil</button>
  </div>
  <div class="fb info cq" style="display:none"></div>
  <div class="cols"><div class="card">Uma mesma cor pode ter sentidos diferentes em festas, marcas, comunidades e experiências pessoais. Em vez de dizer que uma cor <i>sempre</i> causa uma emoção, pergunte <b>o que ela representa naquele contexto</b>.</div>
  <div class="kb"><img class="photo" src="${I("chuva")}" alt="Guarda-chuvas coloridos pendurados sobre uma rua"></div></div>
  <div class="br"><b>🇧🇷 No Brasil:</b> no Réveillon, muita gente veste <b>branco</b>; em Parintins, o <b>azul</b> é do Caprichoso e o <b>vermelho</b> é do Garantido.</div>`,
  init(el) {
    const qs = [c => `Em que ocasião você usaria uma roupa de cor ${c}?`, c => `Que lembrança a cor ${c} desperta em você?`, c => `Na sua cultura, a cor ${c} tem algum sentido especial?`, c => `Você tem alguma peça ${c} no seu guarda-roupa? Descreva.`];
    el.querySelectorAll(".sw").forEach(b => b.onclick = () => { const c = b.dataset.c, box = el.querySelector(".cq"); Sound.pop();
      box.style.display = "block"; box.textContent = "💬 " + qs[Math.floor(Math.random() * qs.length)](c); box.style.animation = "none"; void box.offsetWidth; box.style.animation = ""; });
  } });
S.push({ type: "reveal", title: "Dica visual: qual é a palavra?", lead: "Leia a dica, converse e depois revele.", items: [
  { e: "❓", q: "É um acessório usado na cintura para ajustar uma calça. Qual é?", a: "O <b>cinto</b>. Ex.: Este cinto de couro combina com o sapato." },
  { e: "❓", q: "Usamos nas orelhas; pode ser de prata ou de ouro.", a: "O <b>brinco</b> (ou os brincos)." },
  { e: "❓", q: "Protege a cabeça do sol e tem uma aba só na frente.", a: "O <b>boné</b>. (O chapéu tem aba em volta.)" },
  { e: "❓", q: "Roupa formal com paletó e calça do mesmo tecido.", a: "O <b>terno</b>." },
  { e: "❓", q: "Tecido leve que usamos para sentar na areia ou amarrar na cintura na praia.", a: "A <b>canga</b>." }] });

/* ================= 4. AMAZONAS ================= */
sec("Parte 4", "Amazonas: criar para a arena", "Vocabulário do espetáculo (figurino, adereço, alegoria, cenário) + futuro em notícias", "Descrever cores, formas e materiais e entender previsões em uma reportagem.", "🎭");
S.push({ type: "html", menu: "Festival de Parintins", html: `
  <div class="kicker"><span>Roupas, escolhas e futuros</span><span>Cultura</span></div>
  <h1>Amazonas: criar para a arena</h1>
  <div class="cols" style="align-items:center">
    <div><p>Em Parintins, no Amazonas, <b>Caprichoso</b> (azul) e <b>Garantido</b> (vermelho) levam música, dança e grandes alegorias à arena do <b>Bumbódromo</b>.</p>
    <p>O espetáculo envolve pessoas que criam <span class="hl">figurinos</span>, <span class="hl">adereços</span> e <span class="hl">cenários</span>. Olhe a foto: que cores, formas e materiais você imagina?</p>
    <p style="font-size:17px;color:var(--muted)">Este é um recorte cultural do estado. A vida no Amazonas inclui muitas outras expressões e modos de viver.</p></div>
    <div><div class="kb"><img class="photo" src="${I("parintins-arena")}" alt="Apresentação no Festival de Parintins"></div><div class="credit">Foto: Ministério da Cultura / Wikimedia Commons · CC BY 2.0</div></div>
  </div>` });
S.push({ type: "photos", title: "Galeria: o Amazonas em cena", lead: "Escolha uma foto e descreva: o que você vê? Que cores, formas e materiais aparecem?", items: [
  ["parintins1", "A torcida do Caprichoso no Bumbódromo, com fogos e luzes."], ["parintins2", "Uma noite do Garantido no festival: o vermelho domina a arena."],
  ["bumbodromo", "O Bumbódromo de Parintins, a arena do festival."], ["manaus", "O Teatro Amazonas, em Manaus, à noite."]] });
S.push({ type: "mc", title: "Vídeo: uma festa que será apresentada", lead: "Reportagem de 26/06/2026: “Caprichoso e Garantido abrem três noites de festa em Parintins” (2min17s). Primeiro identifique o assunto; depois anote uma previsão feita na notícia.",
  video: "https://www.youtube.com/results?search_query=Caprichoso+e+Garantido+abrem+tr%C3%AAs+noites+de+festa+em+Parintins", items: [
  { q: "Em que estado acontece o festival da reportagem?", o: ["Maranhão.", "Amazonas.", "Pará."], a: 1, c: "Parintins fica no Amazonas." },
  { q: "Quantas noites de festa a reportagem anuncia?", o: ["Duas.", "Três.", "Cinco."], a: 1, c: "São três noites de apresentações." },
  { q: "Quais são os dois grupos que se apresentam?", o: ["Caprichoso e Garantido.", "Mangueira e Portela.", "Galo e Cruzeiro."], a: 0, c: "Os bois-bumbás Caprichoso (azul) e Garantido (vermelho)." }] });
S.push({ type: "match", title: "Palavras dos bastidores", lead: "Toque em uma palavra e depois no espaço da definição correspondente.", pairs: [
  ["Figurino", "Conjunto de roupas de uma apresentação."], ["Adereço", "Objeto usado para compor a roupa ou a cena."], ["Alegoria", "Grande estrutura decorada que representa um tema."], ["Cenário", "Ambiente montado onde a cena acontece."], ["Torcida", "Grupo de pessoas que apoia um dos bois."]] });
S.push({ type: "role", title: "Uma equipe prepara a apresentação", lead: "Em grupo, cada pessoa assume uma função. Sorteiem uma situação para começar.", cards: [
  "🎨 Você cuida do figurino: proponha duas cores e um material. Justifique sem copiar símbolos de uma comunidade.",
  "🌡️ Você cuida do conforto: faça perguntas sobre calor, mobilidade e tempo de uso da roupa.",
  "💰 A equipe precisa reduzir gastos. Escolham o que manter, reaproveitar ou mudar."],
  check: ["Usei vocabulário de cores e materiais", "Fiz perguntas sobre conforto", "Justifiquei minhas escolhas", "Chegamos a um acordo"] });

/* ================= 5. FUTURO DO PRESENTE ================= */
sec("Parte 5", "Planos, anúncios e previsões", "Futuro do presente (falarei) e futuro com ir + infinitivo (vou falar)", "Planejar uma viagem, anunciar um evento e fazer previsões.", "🔮");
S.push({ type: "html", menu: "Futuro: planos, anúncios e previsões", html: `
  <div class="kicker"><span>Roupas, escolhas e futuros</span><span>Estrutura</span></div>
  <h1>Futuro: planos, anúncios e previsões</h1>
  <p>Na conversa, <span class="hl">vou viajar</span> é muito frequente. O futuro simples aparece em anúncios, compromissos e previsões: <span class="hl">viajarei</span>.</p>
  <div class="tablewrap"><table class="conj"><tr><th></th><th>falar</th><th>beber</th><th>partir</th><th>fazer</th><th>dizer</th><th>trazer</th></tr>
  <tr><td>eu</td><td>falar<b>ei</b></td><td>beber<b>ei</b></td><td>partir<b>ei</b></td><td>far<b>ei</b></td><td>dir<b>ei</b></td><td>trar<b>ei</b></td></tr>
  <tr><td>ele/ela/você</td><td>falar<b>á</b></td><td>beber<b>á</b></td><td>partir<b>á</b></td><td>far<b>á</b></td><td>dir<b>á</b></td><td>trar<b>á</b></td></tr>
  <tr><td>nós</td><td>falar<b>emos</b></td><td>beber<b>emos</b></td><td>partir<b>emos</b></td><td>far<b>emos</b></td><td>dir<b>emos</b></td><td>trar<b>emos</b></td></tr>
  <tr><td>eles/elas/vocês</td><td>falar<b>ão</b></td><td>beber<b>ão</b></td><td>partir<b>ão</b></td><td>far<b>ão</b></td><td>dir<b>ão</b></td><td>trar<b>ão</b></td></tr></table></div>
  <div class="card">Regra: <b>infinitivo + ei, á, emos, ão</b>. Também: eu <b>irei</b>; eles <b>virão</b>; eu <b>porei</b>. O contexto mostra o grau de certeza.</div>
  <div class="br"><b>🇧🇷 No Brasil:</b> na fala, quase sempre usamos <b>ir + infinitivo</b> (<i>vou comprar, a gente vai viajar</i>). O futuro simples (<i>comprarei</i>) é mais comum em textos, notícias e anúncios.</div>` });
S.push({ type: "fill", title: "O roteiro de amanhã", lead: "Complete com o futuro do presente do verbo indicado.", items: [
  { t: "Amanhã nós ___ o roteiro no grupo. (enviar)", o: ["enviamos", "enviaremos", "enviaríamos"], a: 1, c: "Nós + futuro: enviar + emos." },
  { t: "Eu ___ as malas hoje à noite. (fazer)", o: ["fazerei", "farei", "faria"], a: 1, c: "Fazer é irregular: farei." },
  { t: "Os nossos amigos ___ de Manaus na sexta. (vir)", o: ["virão", "viram", "viriam"], a: 0, c: "Vir → virão (cuidado: viram é passado de ver)." },
  { t: "A guia ___ os ingressos amanhã. (trazer)", o: ["trazerá", "trará", "traria"], a: 1, c: "Trazer é irregular: trará." },
  { t: "Na conversa: “A gente ___ viajar no feriado.” (ir + infinitivo)", o: ["vai", "vamos", "ia"], a: 0, c: "A gente + verbo na 3ª pessoa do singular: a gente vai." }] });
S.push({ type: "sort", title: "O tempo muda a mensagem", lead: "Classifique as frases pelo tempo verbal.", groups: ["Presente", "Futuro do presente", "Futuro do pretérito"],
  items: [["Hoje eu compro o tecido.", 0], ["Ela veste uma camisa agora.", 0], ["Nós faremos a apresentação amanhã.", 1], ["Amanhã eu comprarei o tecido.", 1], ["Eu gostaria de uma opção mais simples.", 2], ["Com mais tempo, eu compraria outra peça.", 2]] });
S.push({ type: "order", title: "Um anúncio com começo, meio e fim", lead: "Organize as frases do anúncio da feira de trocas.", img: I("feira"), items: [
  "Nossa feira de trocas acontecerá no sábado.", "Primeiro, receberemos peças limpas e em bom estado.", "Depois, cada pessoa escolherá algo para trocar.", "Ao final, conversaremos sobre o que foi reaproveitado."] });
S.push({ type: "race", title: "Desafio relâmpago: futuro", lead: "12 segundos por pergunta. Valendo ponto para a equipe!", secs: 12, items: [
  { q: "eu · fazer", o: ["farei", "fazerei", "faço"], a: 0 }, { q: "nós · partir", o: ["partiremos", "partimos", "partiríamos"], a: 0 },
  { q: "eles · vir", o: ["virão", "viram", "vierão"], a: 0 }, { q: "você · dizer", o: ["dirá", "dizerá", "diria"], a: 0 },
  { q: "eu · pôr", o: ["porei", "ponharei", "poderei"], a: 0 }, { q: "elas · beber", o: ["beberão", "beberam", "bebem"], a: 0 },
  { q: "nós · trazer", o: ["traremos", "trazeremos", "trouxemos"], a: 0 }] });
S.push({ type: "role", title: "Como será sua cidade daqui a dez anos?", lead: "Em dupla, sorteiem uma situação e usem o futuro do presente.", cards: [
  "🔮 Escolha um aspecto: roupas, transportes ou encontros culturais. Faça duas previsões.",
  "🤝 Apresente uma proposta que depende da colaboração das pessoas.",
  "❓ Seu colega faz uma pergunta. Diga o que você fará para ajudar."],
  check: ["Fiz duas previsões no futuro (-ei, -á, -emos, -ão)", "Usei ao menos um irregular (farei, direi, trarei…)", "Respondi à pergunta do colega"] });

/* ================= 6. FUTURO DO PRETÉRITO ================= */
sec("Parte 6", "Eu faria, eu gostaria, eu diria", "Futuro do pretérito: hipóteses, cortesia e futuro visto do passado", "Imaginar possibilidades e fazer pedidos com cortesia.", "💭");
S.push({ type: "html", menu: "Eu faria, eu gostaria, eu diria", html: `
  <div class="kicker"><span>Roupas, escolhas e futuros</span><span>Estrutura</span></div>
  <h1>Eu faria, eu gostaria, eu diria</h1>
  <div class="cols">
    <div class="col"><h3>💭 Hipóteses</h3><p>Com mais espaço, eu <span class="hl">levaria</span> outro tênis.</p></div>
    <div class="col"><h3>🙏 Cortesia</h3><p><span class="hl">Gostaria</span> de experimentar. Você <span class="hl">poderia</span> me ajudar?</p></div>
    <div class="col"><h3>⏪ Futuro visto do passado</h3><p>Ela disse ontem que <span class="hl">voltaria</span> hoje.</p></div>
  </div>
  <div class="tablewrap" style="margin-top:14px"><table class="conj"><tr><th></th><th>falar</th><th>beber</th><th>partir</th><th>fazer</th><th>dizer</th><th>trazer</th><th>pôr</th></tr>
  <tr><td>eu / ele</td><td>falar<b>ia</b></td><td>beber<b>ia</b></td><td>partir<b>ia</b></td><td>far<b>ia</b></td><td>dir<b>ia</b></td><td>trar<b>ia</b></td><td>por<b>ia</b></td></tr>
  <tr><td>nós</td><td>falar<b>íamos</b></td><td>beber<b>íamos</b></td><td>partir<b>íamos</b></td><td>far<b>íamos</b></td><td>dir<b>íamos</b></td><td>trar<b>íamos</b></td><td>por<b>íamos</b></td></tr>
  <tr><td>eles</td><td>falar<b>iam</b></td><td>beber<b>iam</b></td><td>partir<b>iam</b></td><td>far<b>iam</b></td><td>dir<b>iam</b></td><td>trar<b>iam</b></td><td>por<b>iam</b></td></tr></table></div>
  <div class="br"><b>🇧🇷 Na fala do Brasil:</b> muitas vezes o imperfeito substitui o futuro do pretérito: <i>Eu <b>queria</b> experimentar esta.</i> · <i>Se eu tivesse tempo, eu <b>ia</b> à praia.</i></div>` });
S.push({ type: "fill", title: "Pequenas hipóteses do cotidiano", lead: "Complete com o futuro do pretérito.", items: [
  { t: "Com mais espaço na mala, eu ___ outro par de tênis. (levar)", o: ["levarei", "levaria", "levo"], a: 1, c: "Hipótese → levaria." },
  { t: "Nós ___ de experimentar a camisa azul. (gostar)", o: ["gostaríamos", "gostaremos", "gostamos"], a: 0, c: "Pedido cortês: gostaríamos." },
  { t: "Ela disse ontem que ___ hoje. (voltar)", o: ["voltará", "voltaria", "voltou"], a: 1, c: "Futuro visto de um momento passado: voltaria." },
  { t: "No seu lugar, eu ___ a verdade. (dizer)", o: ["dizeria", "diria", "direi"], a: 1, c: "Dizer é irregular: diria." }] });
S.push({ type: "mc", title: "Que escolha combina com a intenção?", lead: "Escolha a frase que realiza a intenção indicada.", items: [
  { q: "Você quer pedir ajuda com cortesia em uma loja.", o: ["Você poderia me ajudar?", "Você ajudou ontem.", "Você ajuda nunca."], a: 0, c: "Poderia (futuro do pretérito) suaviza o pedido." },
  { q: "Você imagina uma possibilidade.", o: ["Comprei um casaco.", "Com mais dinheiro, eu compraria um casaco.", "Compro um casaco toda semana."], a: 1, c: "Hipótese → compraria." },
  { q: "Você anuncia um compromisso certo.", o: ["A loja abriria às 9h.", "A loja abrirá às 9h amanhã.", "A loja abria às 9h."], a: 1, c: "Anúncio → futuro do presente: abrirá." },
  { q: "Você conta o que alguém prometeu no passado.", o: ["Ele disse que viria.", "Ele disse que virá ontem.", "Ele vem que disse."], a: 0, c: "Futuro do passado → viria." }] });
S.push({ type: "role", title: "O que você faria?", lead: "Sorteiem uma situação e respondam com o futuro do pretérito.", img: I("manaus"), cards: [
  "🧳 Você recebe um convite de última hora e tem uma mala pequena. O que escolheria e o que deixaria?",
  "👕 A camiseta que você queria acabou. Que outra opção você pediria?",
  "🌳 Seu grupo terá um dia livre em Manaus. Como você organizaria o tempo (sem inventar horários de atrações reais)?"],
  check: ["Usei -ia / -íamos / -iam", "Usei um irregular (faria, diria, traria)", "Fiz um pedido com cortesia"] });

/* ================= 7. PÔR ================= */
sec("Parte 7", "Pôr: um verbo pequeno, muitos usos", "Verbo irregular pôr em vários tempos — e a diferença entre pôr, por e poder", "Dizer onde você coloca as coisas sem confundir pôr e poder.", "📦");
S.push({ type: "html", menu: "Pôr: um verbo pequeno, muitos usos", html: `
  <div class="kicker"><span>Roupas, escolhas e futuros</span><span>Estrutura</span></div>
  <h1>Pôr: um verbo pequeno, muitos usos</h1>
  <p><b>Pôr</b> = colocar: <i>ponho a camisa na mala; ela põe o livro na mesa.</i></p>
  <div class="tablewrap"><table class="conj"><tr><th></th><th>Presente</th><th>Perfeito</th><th>Imperfeito</th><th>Futuro</th><th>Fut. pretérito</th></tr>
  <tr><td>eu</td><td><b>ponho</b></td><td><b>pus</b></td><td>punha</td><td>porei</td><td>poria</td></tr>
  <tr><td>ele/ela/você</td><td><b>põe</b></td><td><b>pôs</b></td><td>punha</td><td>porá</td><td>poria</td></tr>
  <tr><td>nós</td><td>pomos</td><td>pusemos</td><td>púnhamos</td><td>poremos</td><td>poríamos</td></tr>
  <tr><td>eles/elas/vocês</td><td><b>põem</b></td><td>puseram</td><td>punham</td><td>porão</td><td>poriam</td></tr></table></div>
  <div class="card">⚠️ O infinitivo <b>pôr</b> leva acento para se distinguir da preposição <b>por</b>. <b>Poder</b> é outro verbo: posso, pude, poderei.</div>
  <div class="br"><b>🇧🇷 Na fala do Brasil:</b> no dia a dia, muita gente prefere <b>colocar</b> ou <b>botar</b>: <i>Coloca a camisa na mala. Bota o casaco aí.</i></div>` });
S.push({ type: "mc", title: "Pôr ou poder? Resolva pelo sentido", lead: "Leia o contexto e escolha a frase correta.", items: [
  { q: "Você quer falar de colocar a roupa na mala (ontem).", o: ["Eu pude a roupa na mala.", "Eu pus a roupa na mala.", "Eu posso a roupa na mala."], a: 1, c: "Pus = pretérito de pôr. Pude é de poder." },
  { q: "Você quer pedir permissão na loja.", o: ["Ponho experimentar?", "Posso experimentar?", "Pus experimentar?"], a: 1, c: "Permissão → poder: posso." },
  { q: "Rotina da sua irmã: todo dia ela ___ o livro na mesa.", o: ["põe", "pode", "pôs"], a: 0, c: "Presente de pôr, ela: põe." },
  { q: "Complete: Vou ___ o casaco no armário.", o: ["por", "pôr", "pór"], a: 1, c: "O infinitivo do verbo leva acento circunflexo: pôr." },
  { q: "Amanhã eu ___ as camisetas na mala.", o: ["poderei", "porei", "punha"], a: 1, c: "Futuro de pôr: porei." }] });
S.push({ type: "memory", title: "Memória dos tempos de pôr", lead: "Encontre o par: pessoa + tempo ↔ forma do verbo pôr.", pairs: [
  ["eu · presente", "ponho"], ["ela · presente", "põe"], ["eu · perfeito", "pus"], ["eu · imperfeito", "punha"], ["eu · futuro", "porei"], ["eu · fut. pretérito", "poria"]] });

/* ================= 8. IR E VIR ================= */
sec("Parte 8", "Ir e vir: de onde você está falando?", "Verbos de movimento ir / vir + advérbios de lugar aqui, aí, ali, lá", "Combinar encontros indicando direção e ponto de referência.", "🧭");
S.push({ type: "html", menu: "Ir e vir: ponto de referência", html: `
  <div class="kicker"><span>Roupas, escolhas e futuros</span><span>Estrutura</span></div>
  <h1>Ir e vir: de onde você está falando?</h1>
  <div class="cols">
    <div class="col"><h3>➡️ Ir</h3><p>Movimento para <b>outro lugar</b>: estou na escola e <span class="hl">vou</span> ao café.</p></div>
    <div class="col"><h3>⬅️ Vir</h3><p>Movimento para o <b>lugar de referência</b>: estou no café e digo <span class="hl">Vem aqui!</span></p></div>
    <div class="col"><h3>📍 Onde?</h3><p><b>aqui/cá</b>: perto de quem fala<br><b>aí</b>: perto de quem ouve<br><b>ali/lá</b>: outro lugar</p></div>
  </div>
  <div class="tablewrap" style="margin-top:14px"><table class="conj"><tr><th></th><th>ir · pres.</th><th>ir · perf.</th><th>ir · fut.</th><th>vir · pres.</th><th>vir · perf.</th><th>vir · fut.</th></tr>
  <tr><td>eu</td><td>vou</td><td>fui</td><td>irei</td><td>venho</td><td>vim</td><td>virei</td></tr>
  <tr><td>ele/você/a gente</td><td>vai</td><td>foi</td><td>irá</td><td>vem</td><td>veio</td><td>virá</td></tr>
  <tr><td>nós</td><td>vamos</td><td>fomos</td><td>iremos</td><td>vimos</td><td>viemos</td><td>viremos</td></tr>
  <tr><td>eles/vocês</td><td>vão</td><td>foram</td><td>irão</td><td>vêm</td><td>vieram</td><td>virão</td></tr></table></div>
  <div class="br"><b>🇧🇷 Na fala do Brasil:</b> <i>“<b>Vem cá!</b>”</i>, <i>“<b>Vou aí</b> mais tarde”</i> e <i>“<b>Já vou!</b>”</i> são muito comuns. Em situações formais: <i>“Venha, por favor.”</i></div>` });
S.push({ type: "fill", title: "Encontros com um ponto de referência", lead: "Imagine onde cada pessoa está e complete.", items: [
  { t: "Estou em casa e sairei para a escola. Eu ___ à escola.", o: ["virei", "irei"], a: 1, c: "Movimento para outro lugar → ir." },
  { t: "Estou no café e chamo meu amigo: “___ aqui, a mesa é ótima!”", o: ["Vai", "Vem"], a: 1, c: "Para onde eu estou → vir: vem." },
  { t: "Falo ao telefone com você, que está em casa: “Amanhã eu vou ___ te visitar.”", o: ["aí", "aqui", "cá"], a: 0, c: "Aí = perto de quem ouve." },
  { t: "Meu irmão está aqui comigo. Ele ___ morar aqui no ano passado.", o: ["foi", "veio"], a: 1, c: "Movimento para o lugar onde estou → veio." }] });
S.push({ type: "role", title: "Encontro marcado, destino combinado", lead: "Em dupla, sorteiem uma situação e prestem atenção em ir/vir e aqui/aí/lá.", cards: [
  "☕ Um colega está no café; você está no hotel. Combinem onde vão se encontrar.",
  "🛍️ Diga onde está, para onde irá e onde porá o que comprou.",
  "🔁 Troquem os lugares. Refaçam a conversa e observem como aqui, aí, ir e vir mudam."],
  check: ["Usei ir e vir conforme o ponto de referência", "Usei aqui, aí ou lá", "Usei o verbo pôr (porei, ponho…)"] });

/* ================= 9. COSTUMES ================= */
sec("Parte 9", "Conversar sobre costumes com curiosidade", "Pedidos com Pode me + infinitivo (mostrar, ensinar) e reações: Que legal! · Nossa!", "Perguntar sobre costumes e reagir com respeito.", "🤝");
S.push({ type: "html", menu: "Costumes com curiosidade", html: `
  <div class="kicker"><span>Roupas, escolhas e futuros</span><span>Cultura</span></div>
  <h1>Conversar sobre costumes com curiosidade</h1>
  <div class="cols">
    <div class="col"><h3>🌎 Variação</h3><p>Cumprimentos, festas, horários de almoço e modos de receber variam entre pessoas, famílias, cidades e regiões.</p></div>
    <div class="col"><h3>❓ Pergunte</h3><p>Como costuma ser no seu grupo? Há ocasiões diferentes? Posso cumprimentar assim?</p></div>
    <div class="col"><h3>🤝 Respeito</h3><p>Não é preciso comentar o corpo ou julgar a roupa de desconhecidos. Descreva personagens ou roupas escolhidas com consentimento.</p></div>
  </div>
  <div class="pgrid" style="margin-top:14px"><div class="pcard"><img src="${I("praia")}" alt="Praia lotada com guarda-sóis no Brasil"><div>Uma praia no Brasil: que roupas e costumes você imagina?</div></div>
  <div class="card" style="margin:0"><p><b>Reações comuns no Brasil:</b></p><p>${["Que legal!", "Nossa!", "Sério?", "Que massa!", "Caramba!"].map(say).join(" · ")}</p></div></div>` });
S.push({ type: "match", title: "Mostrar, ensinar e reagir", lead: "Relacione cada frase à sua intenção.", pairs: [
  ["Pode me mostrar a camisa?", "Quero ver a peça."], ["Pode me ensinar a fazer esse nó?", "Quero aprender uma maneira de fazer."], ["Que legal!", "Uma reação informal positiva."], ["Nossa!", "Pode expressar surpresa, admiração ou descontentamento, conforme o tom."]] });

/* ================= 10. FORMAS ================= */
sec("Parte 10", "Formas e posições entram na conversa", "Locuções de lugar (em cima de, embaixo de, entre, ao lado de…) + imperativo: Ponha… / Coloca…", "Descrever uma estampa ou composição e dar instruções.", "🔷");
S.push({ type: "html", menu: "Formas e posições", html: `
  <div class="kicker"><span>Roupas, escolhas e futuros</span><span>Estrutura</span></div>
  <h1>Formas e posições entram na conversa</h1>
  <div class="row" style="gap:18px;margin:10px 0">${Object.entries(SH).map(([n, s]) => `<div style="text-align:center;width:110px"><div style="width:80px;height:80px;margin:auto">${s}</div><b class="say">${n}</b></div>`).join("")}</div>
  <div class="cols">
    <div class="col"><h3>📍 Localize</h3><p>${["em cima de", "embaixo de", "entre", "ao lado de", "à esquerda de", "à direita de"].map(say).join(" · ")}</p></div>
    <div class="col"><h3>🗣️ Instrua</h3><p><span class="hl">Ponha</span> o círculo em cima do quadrado. O triângulo <span class="hl">fica</span> à direita…</p><p style="font-size:16px;color:var(--muted)">de + o = do · de + a = da</p></div>
  </div>
  <div class="br"><b>🇧🇷 Na fala do Brasil:</b> o imperativo informal é muito usado: <i>“<b>Coloca</b> o círculo aqui em cima.”</i> · <i>“<b>Põe</b> o triângulo do lado.”</i></div>` });
S.push({ type: "memory", title: "Memória das formas", lead: "Encontre o par: desenho ↔ nome.", svg: true, pairs: Object.keys(SH).map(k => [k, k]) });
S.push({ type: "where", title: "Onde está?", lead: "Observe a composição e escolha a descrição correta." });
S.push({ type: "role", title: "Ateliê sem olhar o modelo", lead: "Uma pessoa descreve; a outra desenha sem ver o modelo. Depois comparem.", cards: [
  "✏️ Crie um modelo simples: um quadrado, um círculo e dois triângulos em uma folha. Não mostre ao colega.",
  "🗣️ Dê instruções: Ponha o círculo em cima do quadrado. O triângulo fica à direita…",
  "🔍 Comparem os desenhos. Diga uma coisa que você mudaria e uma que fará diferente na próxima tentativa."],
  check: ["Usei nomes de formas", "Usei em cima de / ao lado de / entre…", "Usei Ponha… / Coloca… (imperativo)", "Usei mudaria (fut. pretérito) e farei (futuro)"] });

/* ================= SAÍDA ================= */
sec("Encerramento", "Saída: o que já consigo fazer?", "Revisão: compras, futuro do presente, futuro do pretérito, pôr, ir/vir e posições", "Verificar o que você aprendeu nesta unidade.", "🏁");
S.push({ type: "reveal", title: "Saída: o que já consigo fazer?", lead: "Sorteie um aluno na roleta, responda oralmente e depois compare com a resposta comentada.", items: [
  { e: "🛍️", q: "Como você pediria uma peça de outro tamanho com cortesia?", a: "<b>Você teria esta camiseta em um tamanho maior?</b> / Eu queria experimentar o tamanho G." },
  { e: "🗓️", q: "Diga um plano para o próximo fim de semana com o futuro do presente.", a: "Ex.: <b>No sábado, visitarei</b> minha família e <b>farei</b> um almoço. (Na conversa: vou visitar.)" },
  { e: "🧭", q: "Você está em casa e convida um amigo. Diga com vir.", a: "<b>Vem aqui em casa amanhã!</b> — vir indica movimento para onde eu estou." },
  { e: "💭", q: "O que você faria com um dia livre em Manaus?", a: "Ex.: <b>Eu visitaria</b> o Teatro Amazonas e <b>faria</b> um passeio de barco." },
  { e: "🔷", q: "Descreva: um círculo sobre um quadrado, com um triângulo do lado direito.", a: "<b>O círculo está em cima do quadrado e o triângulo fica à direita dele.</b>" }] });
S.push({ type: "html", menu: "Parabéns!", final: true, html: `
  <div style="text-align:center;padding-top:5vh"><div style="font-size:100px;animation:bob 2s ease-in-out infinite">🏆</div><h1>Parabéns, turma!</h1>
  <p class="lead">Vocês descreveram roupas, fizeram compras, planejaram o futuro e imaginaram possibilidades.</p>
  <div class="card" style="display:inline-block;text-align:center;min-width:320px"><p style="margin:0;font-size:26px">Placar final</p><p class="fs" style="margin:6px 0 0;font-size:34px;font-weight:900"></p><p class="fw" style="margin:4px 0 0;color:var(--green);font-weight:800"></p></div></div>`,
  init(el) {
    el.querySelector(".fs").textContent = `Equipe A ${score[0]} × ${score[1]} Equipe B`;
    el.querySelector(".fw").textContent = score[0] === score[1] ? "Empate! 🤝" : (score[0] > score[1] ? "Vitória da Equipe A! 🎉" : "Vitória da Equipe B! 🎉");
    Sound.fanfare(); confetti(140);
  } });
S.push({ type: "credits", menu: "Referências e créditos", title: "Referências e créditos" });
