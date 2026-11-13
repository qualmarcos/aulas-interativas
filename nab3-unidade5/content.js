/* =====================================================================
   CONTEÚDO DA AULA — NAB3 · Unidade 5 · Português do Brasil
   Para editar: cada S.push({...}) é um slide. Tipos disponíveis:
   cover, img, html, gallery, photos, photoquiz, reveal, mc, fill, memory,
   sort, order, match, role, hangman, race, wheel, tally, credits
   ===================================================================== */
const LESSON = {
  short: "NAB3 · Unidade 5",
  foot: "NAB3 · Unidade 5 · Escolhas, contas e boas conversas",
  source: "NAB3 – Unidade 5 (antes Unidade 3; Unidade 3.flipchart, PDF “NAB3 - UNIDADE 3”); capa e protocolos Intercultura. Autoria/fonte: acervo fornecido pelo professor. Referência para adaptação pedagógica. Preços, orçamentos e condições são inventados para praticar a língua. Cédulas: Banco Central do Brasil (segunda família do real)."
};
const I = n => "img/" + n + ".jpg";
const SH = {};
const S = [];
const sec = (num, subj, gram, goal, icon) => S.push({ type: "cover", num, subj, gram, goal, icon, menu: subj, sec: true });

/* ---------------- Abertura institucional ---------------- */
S.push({ type: "img", src: "intercultura-capa", menu: "Intercultura · Classes de Português", sec: true });
S.push({ type: "img", src: "protocolos-online", menu: "Protocolos · aulas online" });
S.push({ type: "img", src: "protocolos-presenciais", menu: "Protocolos · aulas presenciais" });

/* ---------------- Capa geral ---------------- */
S.push({ type: "cover", main: true, icon: "🧺", num: "NAB3 · Unidade 5", subj: "Escolhas, contas e boas conversas",
  gram: "Dinheiro e consumo · Orçamento · Conectores com subjuntivo: caso, contanto que, para que, embora, antes que, até que, sem que · Procuro alguém que…",
  goal: "Resolva situações de compra, organize um orçamento inventado e apresente um pequeno projeto. Combine condições, objetivos e imprevistos com clareza. Recorte cultural: a Paraíba.", menu: "Capa da unidade", sec: true });
S.push({ type: "html", menu: "Nossa rota", html: `
  <div class="kicker"><span>Intercultura / Português para a vida real</span><span>NAB3 / Unidade 5</span></div>
  <h1>Nossa rota</h1><p class="lead">Escolhas, contas e boas conversas</p>
  <div class="cols">
    <div class="col"><h3>💰 1 · Dinheiro</h3><p>Ler valores em reais, os animais das cédulas e palavras para pagar e negociar.</p><p>Um orçamento coletivo.</p></div>
    <div class="col"><h3>🧺 2 · Paraíba</h3><p>João Pessoa: trabalho artesanal, materiais e valor.</p><p>Trançado, bordado e renda.</p></div>
    <div class="col"><h3>🔗 3 · Conectores</h3><p>Condição, finalidade, concessão e tempo + subjuntivo.</p><p><i>Procuro alguém que…</i></p></div>
  </div>
  <div class="card"><b>Como funciona:</b> cada assunto começa com uma <span class="hl">capa</span> com o tema e a estrutura.
  Use o <b>placar</b> no topo para jogar em equipes, a <b>🎡 roleta</b> para sortear quem responde e a <b>📱 Sala</b> para a turma entrar pelo celular.</div>` });
S.push({ type: "wheel", menu: "Roleta da turma", title: "🎡 Roleta da turma",
  lead: "Professor: abra a roleta, escreva os nomes dos alunos (um por linha) e gire para sortear quem responde. Os alunos que entram pela 📱 Sala já aparecem aqui." });
S.push({ type: "tally", menu: "Aquecimento: Quanto você tem?", title: "💰 Quanto você tem? Edição compras",
  lead: "Marque tudo o que <b>você já fez</b>. Cada experiência vale dinheiro (de mentira)! Depois conte para a turma: “Eu já… / Eu nunca…”.",
  tip: "💬 Use: Eu já pechinchei numa feira! · Nunca paguei nada em dez vezes… · Você já esqueceu de pegar o troco?",
  items: [
    ["Comprar algo por impulso e se arrepender", 250], ["Pechinchar numa feira ou mercado", 200], ["Parcelar uma compra em muitas vezes", 300],
    ["Esquecer de pegar o troco", 150], ["Perder o comprovante e precisar dele depois", 200], ["Pagar juros por atrasar uma conta", 300],
    ["Ganhar desconto por pagar à vista", 200], ["Devolver um produto com defeito", 250], ["Guardar moedas num cofrinho", 100],
    ["Comprar artesanato numa viagem", 200], ["Dividir a conta do restaurante centavo por centavo", 150], ["Fazer um orçamento do mês e cumprir até o fim", 400]] });

/* ================= 1. DINHEIRO E CONSUMO ================= */
sec("Parte 1", "Dinheiro, consumo e valores", "Ler valores em reais · À vista × parcelado · As cédulas do real", "Ler preços, calcular quanto sobra e conhecer os animais do dinheiro brasileiro.", "💰");
S.push({ type: "role", title: "Uma palavra puxa outra", lead: "Em dupla: um diz uma palavra, o outro acrescenta outra ligada à anterior. Não é preciso falar da sua renda!", img: I("cofrinho"), cards: [
  "🔗 Olhe a foto e diga a primeira palavra que ela lembra. Seu colega acrescenta uma palavra ligada à anterior.",
  "6️⃣ Depois de seis palavras, expliquem a ligação entre a primeira e a última.",
  "💭 Criem uma frase: “Dinheiro me lembra…, mas também penso em…”.",
  "🛒 Agora com outro ponto de partida: “feira”, “presente” ou “viagem”."],
  check: ["Fiz uma corrente de seis palavras", "Expliquei a ligação entre elas", "Criei a frase Dinheiro me lembra…, mas também…", "Não precisei falar de dinheiro pessoal"] });
S.push({ type: "html", menu: "R$: ler valores na vida real", html: `
  <div class="kicker"><span>Escolhas, contas e boas conversas</span><span>Estrutura</span></div>
  <h1>R$: ler valores na vida real</h1>
  <div class="cols" style="align-items:start">
  <div>
    <div class="col" style="margin-bottom:12px"><h3>🔢 Como se lê</h3><p><b>um</b> real · <b>dois</b> reais · Um real tem <b>cem centavos</b>.</p><p><b>R$ 12,50</b> → doze reais <b>e</b> cinquenta centavos.</p><p><b>R$ 1.250,00</b> → mil duzentos e cinquenta reais.</p><p style="font-size:17px;color:var(--muted)">No Brasil, a vírgula separa os centavos e o ponto separa os milhares.</p></div>
    <div class="col"><h3>💳 Formas de pagar</h3><p><b>À vista:</b> o valor combinado de uma vez. · <b>Parcelado:</b> dividido em partes (parcelas).</p><p style="font-size:17px;color:var(--muted)">“Em três vezes sem juros” · “Aceita Pix?” · “Tem desconto à vista?”</p></div>
  </div>
  <div class="kb"><img class="photo" src="${I("nota20")}" alt="Cédula de 20 reais com o mico-leão-dourado"></div></div>
  <div class="br"><b>💡 Nesta aula,</b> preços e condições são inventados para praticar a língua.</div>` });
S.push({ type: "mc", title: "Quanto custa e quanto sobra?", lead: "Escolha a resposta adequada à situação. Confira o comentário e explique sua escolha.", items: [
  { q: "Preço fictício: R$ 18,50. Como você lê?", o: ["Dezoito reais e cinquenta centavos.", "Dezoito centavos e cinquenta reais.", "Cento e oitenta e cinco reais."], a: 0, c: "Reais antes da vírgula, centavos depois." },
  { q: "Você paga R$ 20,00 por um item de R$ 13,50. Quanto é o troco?", o: ["R$ 7,50.", "R$ 6,50.", "R$ 33,50."], a: 1, c: "20 − 13,50 = 6,50: seis reais e cinquenta centavos." },
  { q: "Uma peça custa R$ 90 em três parcelas iguais sem juros. Qual é o valor de cada parcela?", o: ["R$ 30.", "R$ 45.", "R$ 27."], a: 0, c: "90 ÷ 3 = 30." },
  { q: "À vista: R$ 80. Parcelado: 2 × R$ 45. Qual opção sai mais barata?", o: ["Parcelado.", "À vista.", "As duas custam o mesmo."], a: 1, c: "Parcelado = R$ 90 no total; à vista economiza R$ 10." },
  { q: "Como se lê R$ 1.200,00?", o: ["Um mil e duzentos reais.", "Mil e duzentos reais.", "Um real e duzentos centavos."], a: 1, c: "Em português dizemos “mil”, não “um mil”: mil e duzentos reais." }] });
S.push({ type: "race", title: "Desafio relâmpago: leia o valor", lead: "15 segundos por pergunta! Sorteie um aluno na roleta e valendo ponto para a equipe.", secs: 15, items: [
  { q: "R$ 2,00", o: ["dois reais", "dois real", "duas reais"], a: 0 },
  { q: "R$ 0,50", o: ["cinquenta centavos", "meio centavo", "cinquenta reais"], a: 0 },
  { q: "R$ 1,00", o: ["um real", "um reais", "uma real"], a: 0 },
  { q: "R$ 200,00", o: ["duzentos reais", "dois cem reais", "duzentas reais"], a: 0 },
  { q: "R$ 15,90", o: ["quinze reais e noventa centavos", "quinze e noventa reais", "cento e cinquenta e nove reais"], a: 0 },
  { q: "R$ 500,00", o: ["quinhentos reais", "cinco cem reais", "cinquenta reais"], a: 0 },
  { q: "R$ 1.000,00", o: ["mil reais", "um mil reais", "cem reais"], a: 0 },
  { q: "R$ 3,05", o: ["três reais e cinco centavos", "três reais e cinquenta centavos", "trinta e cinco reais"], a: 0 }] });
S.push({ type: "html", menu: "O dinheiro também mostra a fauna", html: `
  <div class="kicker"><span>Escolhas, contas e boas conversas</span><span>Cultura</span></div>
  <h1>O dinheiro também mostra a fauna</h1>
  <div class="cols" style="align-items:start">
  <div class="tablewrap" style="margin:0"><table class="conj"><tr><th>Cédula</th><th>Animal (2ª família do real)</th></tr>
    <tr><td>R$ 2</td><td>🐢 tartaruga-marinha</td></tr><tr><td>R$ 5</td><td>🪶 garça</td></tr><tr><td>R$ 10</td><td>🦜 arara-vermelha</td></tr>
    <tr><td>R$ 20</td><td>🐒 mico-leão-dourado</td></tr><tr><td>R$ 50</td><td>🐆 onça-pintada</td></tr><tr><td>R$ 100</td><td>🐟 garoupa</td></tr><tr><td>R$ 200</td><td>🐺 lobo-guará</td></tr></table></div>
  <div><div class="kb"><img class="photo" src="${I("nota200")}" alt="Cédula de 200 reais com o lobo-guará"></div>
  <p style="font-size:18px">O Banco Central apresenta os modelos e os animais de cada valor. Na antiga cédula de <b>um real</b> aparecia um <b>beija-flor</b>; ela pertence à primeira família.</p></div></div>
  <div class="br"><b>🇧🇷 Na conversa:</b> muita gente chama a nota de 50 de “uma onça” e a de 100 de “uma garoupa”!</div>` });
S.push({ type: "memory", title: "Animais e valores nas cédulas", lead: "Vire as cartas e encontre os pares (animal ↔ cédula). Depois use duas palavras em uma frase.", pairs: [
  ["img:tartaruga", "R$ 2"], ["img:garca", "R$ 5"], ["img:arara", "R$ 10"], ["img:mico", "R$ 20"], ["img:onca", "R$ 50"], ["img:garoupa", "R$ 100"], ["img:lobo", "R$ 200"]] });
S.push({ type: "photoquiz", title: "Que animal está na nota?", lead: "Observe a cédula e escolha o nome do animal.", items: [
  { img: I("nota2"), q: "Que animal aparece na nota de dois reais?", o: ["garça", "tartaruga-marinha", "garoupa"], a: 1, c: "A tartaruga-marinha, na nota de R$ 2." },
  { img: I("nota20"), q: "E na nota de vinte reais?", o: ["mico-leão-dourado", "onça-pintada", "lobo-guará"], a: 0, c: "O mico-leão-dourado, um primata da Mata Atlântica." },
  { img: I("nota200"), q: "Qual é o animal da nota de duzentos reais?", o: ["arara-vermelha", "lobo-guará", "onça-pintada"], a: 1, c: "O lobo-guará, animal do Cerrado, chegou em 2020 com a nota de R$ 200." }] });

/* ================= 2. PALAVRAS PARA NEGOCIAR ================= */
sec("Parte 2", "Palavras para pagar e negociar", "Renda, despesa, orçamento, parcela, juros, troco · Holerite, fatura, vencimento · Pedir informação antes de decidir", "Entender o vocabulário de compras e contas e organizar um orçamento coletivo.", "🧾");
S.push({ type: "html", menu: "Palavras que mudam a conversa", html: `
  <div class="kicker"><span>Escolhas, contas e boas conversas</span><span>Vocabulário</span></div>
  <h1>Palavras que mudam a conversa</h1>
  <div class="cols">
    <div class="col"><h3>📋 Planejar</h3><p><b>renda:</b> dinheiro recebido em um período</p><p><b>despesa:</b> gasto ou valor a pagar</p><p><b>orçamento:</b> previsão de entradas e gastos</p></div>
    <div class="col"><h3>💳 Pagar</h3><p><b>parcela:</b> uma parte do pagamento</p><p><b>juros:</b> acréscimo ligado ao dinheiro no tempo</p><p><b>troco:</b> diferença devolvida no pagamento</p></div>
    <div class="col"><h3>🤝 Negociar</h3><p><b>pechinchar:</b> tentar negociar um preço menor</p><p><b>prazo:</b> tempo combinado para fazer algo</p><p><b>comprovante:</b> registro de uma operação</p></div>
  </div>` });
S.push({ type: "html", menu: "Do banco ao trabalho: entender as palavras", html: `
  <div class="kicker"><span>Escolhas, contas e boas conversas</span><span>Vocabulário</span></div>
  <h1>Do banco ao trabalho: entender as palavras</h1>
  <div class="cols">
    <div class="col"><h3>📄 Documentos e contas</h3><p><b>holerite / contracheque:</b> registro do pagamento do trabalho</p><p><b>conta corrente:</b> conta para movimentações bancárias</p><p><b>fatura:</b> documento com valores a pagar</p></div>
    <div class="col"><h3>🗓️ Crédito e prazo</h3><p><b>crediário:</b> compra com pagamento a prazo</p><p><b>vencimento:</b> data indicada para pagar</p><p><b>empréstimo:</b> valor cedido com devolução combinada</p></div>
    <div class="col"><h3>❓ Perguntar faz diferença</h3><p><b>garantia</b> e <b>fiador</b>: palavras encontradas em contratos</p><p><b>taxa, tarifa e imposto</b> não são sinônimos automáticos</p><p>Pergunte: <i>O que significa? O que está incluído?</i></p></div>
  </div>` });
S.push({ type: "match", title: "Qual palavra resolve? (1)", lead: "Toque em uma palavra e depois no espaço da explicação correspondente.", pairs: [
  ["parcela", "Uma parte de um pagamento dividido."], ["comprovante", "Registro que confirma um pagamento."], ["troco", "Diferença devolvida quando você paga a mais."],
  ["juros", "Acréscimo cobrado pelo dinheiro no tempo."], ["orçamento", "Previsão de entradas e gastos."], ["pechinchar", "Tentar negociar um preço menor."]] });
S.push({ type: "match", title: "Qual palavra resolve? (2)", lead: "Toque em uma palavra e depois no espaço da explicação correspondente.", pairs: [
  ["vencimento", "Data indicada para pagar."], ["fatura", "Documento com os valores a pagar, como a do cartão."], ["holerite", "Registro do pagamento do trabalho."],
  ["empréstimo", "Valor cedido com devolução combinada."], ["crediário", "Compra na loja com pagamento a prazo."], ["prazo", "Tempo combinado para fazer algo."]] });
S.push({ type: "reveal", title: "O que você vê? Que palavra associa?", lead: "Converse antes de revelar a resposta. Compare ideias e acrescente um exemplo.", items: [
  { img: I("cofrinho"), q: "Que objeto da foto pode representar a ideia de guardar dinheiro?", a: "O <b>pote</b> funciona como um <b>cofrinho</b>: dá para <b>economizar</b> e <b>poupar</b> moedas e notas. Ex.: <i>Guardo as moedas do troco num cofrinho.</i>" },
  { img: I("nota20"), q: "Que palavras você associa a esta imagem?", a: "<b>cédula</b> (ou <b>nota</b>), <b>vinte reais</b>, <b>mico-leão-dourado</b>, <b>pagar</b>, <b>troco</b>…" },
  { img: I("mercado"), q: "O que você perguntaria antes de comprar esta peça?", a: "<i>De que material é feita? Quem fez? Quanto tempo leva para fazer? Quanto custa? Aceita cartão / Pix? Tem desconto à vista?</i>" },
  { img: I("rendeira"), q: "Que palavras de trabalho e valor a foto lembra?", a: "<b>rendeira</b>, <b>renda</b>, <b>trabalho manual</b>, <b>paciência</b>, <b>tempo</b>, <b>preço justo</b>. O valor de uma peça também inclui as horas de trabalho." }] });
S.push({ type: "sort", title: "Entradas, despesas e ações", lead: "Classifique os cartões de um projeto de artesanato fictício.",
  groups: ["⬆️ Entrada de dinheiro", "⬇️ Despesa", "📝 Ação de planejamento"],
  items: [["Valor recebido pela venda de uma peça", 0], ["Pagamento recebido pelo trabalho", 0], ["Doação de um apoiador", 0],
    ["Pagamento do transporte da entrega", 1], ["Compra de material para produzir", 1], ["Aluguel da barraca na feira", 1],
    ["Anotar os gastos do projeto", 2], ["Comparar dois preços", 2], ["Guardar os comprovantes", 2]] });
S.push({ type: "html", menu: "Uma conta coletiva, sem exposição pessoal", html: `
  <div class="kicker"><span>Escolhas, contas e boas conversas</span><span>Situação</span></div>
  <h1>Uma conta coletiva, sem exposição pessoal</h1>
  <div class="cols" style="align-items:start">
  <div class="tablewrap" style="margin:0"><table class="conj"><tr><th colspan="2">Orçamento fictício da oficina: R$ 300</th></tr>
    <tr><td>🧵 Material</td><td>R$ 120</td></tr><tr><td>🚌 Transporte</td><td>R$ 60</td></tr><tr><td>🥪 Lanche</td><td>R$ 50</td></tr>
    <tr><td><b>Total das despesas</b></td><td><b>R$ 230</b></td></tr><tr><td><b>Sobra</b></td><td><b>R$ 70</b></td></tr></table></div>
  <div>
    <p>Uma pessoa quer <b>ampliar o lanche</b>; outra prefere <b>reservar parte para um imprevisto</b>.</p>
    <p>💬 Que informações vocês pediriam antes de decidir?</p>
    <p>💬 Expliquem a prioridade de cada personagem, <b>sem julgar sua condição econômica</b>.</p>
  </div></div>` });
S.push({ type: "mc", title: "A decisão precisa de informação", lead: "Use o orçamento fictício da oficina: R$ 300; material R$ 120, transporte R$ 60, lanche R$ 50.", items: [
  { q: "As três despesas somam R$ 230. Quanto sobra?", o: ["R$ 530.", "R$ 70.", "R$ 230."], a: 1, c: "300 − 230 = 70." },
  { q: "Se o grupo reservar R$ 40 para imprevistos, quanto fica para ampliar o lanche?", o: ["R$ 30.", "R$ 110.", "R$ 40."], a: 0, c: "70 − 40 = 30." },
  { q: "Qual pergunta ajuda a decidir sem expor ninguém?", o: ["Quanto você ganha por mês?", "Quantas pessoas vão participar da oficina?", "Por que você não tem dinheiro?"], a: 1, c: "A pergunta é sobre o projeto, não sobre a vida financeira de alguém." },
  { q: "O transporte subiu para R$ 80. Quanto sobra agora?", o: ["R$ 50.", "R$ 90.", "R$ 70."], a: 0, c: "120 + 80 + 50 = 250; 300 − 250 = 50." }] });
S.push({ type: "order", title: "Uma compra com as informações claras", lead: "Toque nas falas na ordem certa para montar o diálogo.", items: [
  "— Boa tarde! Quanto custa esta peça?",
  "— Ela custa R$ 80 à vista, nesta simulação.",
  "— E parcelada? Qual é o valor total?",
  "— São duas parcelas de R$ 45: R$ 90 no total.",
  "— Obrigado. Vou comparar e decidir."] });
S.push({ type: "fill", title: "A palavra certa na hora de pagar", lead: "Toque na palavra que completa cada frase.", items: [
  { t: "Paguei com uma nota de 50 e recebi R$ 8 de ___.", o: ["troco", "juros", "prazo"], a: 0, c: "Troco: a diferença devolvida." },
  { t: "Se você pagar à vista, ganha 10% de ___.", o: ["desconto", "parcela", "fatura"], a: 0, c: "Pagar à vista costuma dar desconto." },
  { t: "O ___ da conta de luz é no dia 10.", o: ["vencimento", "comprovante", "orçamento"], a: 0, c: "Vencimento: data para pagar." },
  { t: "Paguei com atraso e tive que pagar ___.", o: ["troco", "juros", "desconto"], a: 1, c: "Atraso → juros (e às vezes multa)." },
  { t: "Guarde o ___: você pode precisar trocar a peça.", o: ["comprovante", "fiador", "holerite"], a: 0, c: "O comprovante (ou nota fiscal) prova a compra." },
  { t: "Na feira, ele sempre tenta ___ para pagar menos.", o: ["parcelar", "pechinchar", "vencer"], a: 1, c: "Pechinchar = negociar um preço menor." },
  { t: "Comprei a geladeira em dez ___ sem juros.", o: ["parcelas", "trocos", "faturas"], a: 0, c: "Em dez parcelas (dez vezes)." },
  { t: "Antes da viagem, fizemos um ___ com todos os gastos.", o: ["orçamento", "empréstimo", "vencimento"], a: 0, c: "Orçamento: previsão de gastos." }] });
S.push({ type: "role", title: "A feira fictícia da turma", lead: "Em dupla, escolha uma situação e invente personagens. Depois troquem os papéis.", img: I("mercado2"), cards: [
  "🧺 Você vende uma peça inventada: apresente material, processo e preço. Outro colega faz duas perguntas.",
  "💳 Combine uma forma de pagamento fictícia e confira o valor total.",
  "🙅 O cliente pode aceitar, recusar ou pedir outra opção. Encerrem a conversa com cortesia.",
  "🤝 O cliente quer pechinchar. O vendedor explica quanto trabalho a peça exige."],
  check: ["Apresentei material, processo e preço", "Perguntei o valor total e a forma de pagamento", "Usei à vista / parcelado / desconto / troco", "Encerrei com cortesia"] });

/* ================= 3. PARAÍBA ================= */
sec("Parte 3", "Paraíba: o trabalho por trás da peça", "Recorte cultural: João Pessoa e o artesanato paraibano · Materiais e técnicas", "Perguntar sobre a produção antes de comparar apenas o preço.", "🧺");
S.push({ type: "html", menu: "Paraíba: olhar o trabalho por trás da peça", html: `
  <div class="kicker"><span>Escolhas, contas e boas conversas</span><span>Cultura</span></div>
  <h1>Paraíba: olhar o trabalho por trás da peça</h1>
  <div class="cols" style="align-items:start">
  <div>
    <p>Em <b>João Pessoa</b>, o <span class="hl">Mercado de Artesanato Paraibano</span> reúne peças ligadas a diferentes materiais e saberes.</p>
    <p>Nas fotos, observe o <b>trançado de palha</b> e os detalhes do <b>tecido bordado</b>. Pergunte sobre a produção antes de comparar apenas o preço.</p>
    <p>Um mercado é também lugar de trabalho e conversa. As experiências de quem produz e de quem visita são diversas.</p>
  </div>
  <div class="kb"><img class="photo" src="${I("mercado")}" alt="Peça artesanal em trançado de palha no Mercado de Artesanato Paraibano"></div></div>
  <div class="br"><b>🌅 Curiosidade:</b> João Pessoa fica no ponto mais oriental das Américas, a Ponta do Seixas: é “onde o sol nasce primeiro”.</div>` });
S.push({ type: "photos", title: "João Pessoa em fotos", lead: "Escolha uma foto e descreva: o que você vê? Que material, que gesto, que lugar?", items: [
  ["mercado2", "Bordado em tecido no Mercado de Artesanato Paraibano."], ["rendeira", "Uma rendeira trabalhando na renda renascença, típica do Cariri paraibano."],
  ["labirinto", "Bordado labirinto: desenhos feitos sobre uma trama de fios desfiados."], ["saofrancisco", "O interior da Igreja de São Francisco, no Centro Cultural São Francisco."],
  ["farol2", "“O coco mais oriental das Américas”: placa perto do Farol do Cabo Branco."], ["mercado", "Trançado de palha: faixas entrelaçadas à mão."]] });
S.push({ type: "mc", title: "Vídeo: um espaço para o artesanato", lead: "Reportagem publicada pela TV Correio em 21/09/2023. Observe o tema geral; depois anote uma palavra de quem trabalha com artesanato.",
  video: "https://www.youtube.com/results?search_query=Centro+de+Refer%C3%AAncia+do+Artesanato+Paraibano+%C3%A9+inaugurado+em+Jo%C3%A3o+Pessoa+TV+Correio",
  videoTitle: "Centro de Referência do Artesanato Paraibano é inaugurado em João Pessoa", videoLen: "2min27s", items: [
  { q: "Em que cidade acontece a inauguração anunciada no título?", o: ["Campina Grande.", "João Pessoa.", "Recife."], a: 1, c: "João Pessoa, capital da Paraíba." },
  { q: "O que foi inaugurado?", o: ["Um shopping de roupas importadas.", "Um Centro de Referência do Artesanato Paraibano.", "Uma agência bancária."], a: 1, c: "Um centro de referência dedicado ao artesanato do estado." },
  { q: "Por que um espaço assim é importante para quem produz?", o: ["Para mostrar e vender as peças e valorizar o trabalho.", "Para proibir a venda de artesanato.", "Para importar peças de outros países."], a: 0, c: "Dá visibilidade, gera renda e valoriza os saberes locais. Que palavra dos artesãos você anotou?" }] });
S.push({ type: "match", title: "Material, gesto e valor", lead: "Toque em uma palavra e depois no espaço da explicação correspondente.", pairs: [
  ["trançado", "Peça com faixas entrelaçadas."], ["bordado", "Tecido com detalhes feitos com linha e agulha."], ["renda", "Tecido delicado e vazado, feito com fios."],
  ["labirinto", "Bordado feito sobre uma trama de fios desfiados."], ["palha", "Material vegetal seco usado em cestos e chapéus."], ["artesão", "Pessoa que produz peças à mão."]] });
S.push({ type: "role", title: "Um projeto que merece ser explicado", lead: "Em grupo, inventem um pequeno projeto e apresentem para a turma.", img: I("rendeira"), cards: [
  "💡 Inventem um pequeno projeto: uma oficina, uma feira de trocas ou uma mostra de peças. Digam para quem ele serve.",
  "📊 Apresentem um orçamento fictício com três despesas e uma entrada. Peçam apoio e expliquem o objetivo.",
  "❓ Outro grupo pergunta sobre valor total, prazo e uma alternativa se faltar dinheiro. Respondam com dados da simulação.",
  "🧵 O projeto deve valorizar quem produz: como vocês vão apresentar os artesãos?"],
  check: ["Disse para quem é o projeto", "Apresentei três despesas e uma entrada", "Respondi sobre valor total e prazo", "Propus uma alternativa se faltar dinheiro"] });

/* ================= 4. CONECTORES ================= */
sec("Parte 4", "Conectores organizam relações", "Caso, contanto que, desde que · Para que, a fim de que · Embora, ainda que, mesmo que · Antes que, até que, sem que + subjuntivo", "Combinar condições, objetivos, dificuldades e tempo com clareza.", "🔗");
S.push({ type: "html", menu: "Conectores organizam relações", html: `
  <div class="kicker"><span>Escolhas, contas e boas conversas</span><span>Estrutura</span></div>
  <h1>Conectores organizam relações</h1>
  <div class="tablewrap"><table class="conj"><tr><th>Relação</th><th>Conectores</th><th>Exemplo</th></tr>
    <tr><td><b>Condição</b></td><td>caso · contanto que · desde que</td><td>O encontro acontece <b>contanto que haja</b> espaço.</td></tr>
    <tr><td><b>Finalidade</b></td><td>para que · a fim de que</td><td>Organizamos uma oficina <b>para que</b> as pessoas <b>aprendam</b>.</td></tr>
    <tr><td><b>Concessão</b></td><td>embora · ainda que · mesmo que</td><td><b>Embora</b> a peça <b>seja</b> pequena, exige muito trabalho.</td></tr>
    <tr><td><b>Tempo</b></td><td>antes que · até que</td><td>Confirme o pedido <b>antes que</b> a loja <b>feche</b>.</td></tr>
    <tr><td><b>Ausência de uma ação</b></td><td>sem que</td><td>Ela saiu <b>sem que</b> eu <b>percebesse</b>.</td></tr></table></div>
  <div class="br"><b>🧩 Todos esses conectores pedem subjuntivo.</b> Presente quando a frase está no presente ou futuro (<i>haja, aprendam, feche</i>); imperfeito quando está no passado (<i>percebesse</i>).</div>` });
S.push({ type: "sort", title: "Qual relação a frase destaca?", lead: "Classifique os cartões pela relação que o conector expressa.",
  groups: ["❓ Condição", "🎯 Finalidade", "⚖️ Concessão", "⏱️ Tempo", "🚫 Ausência"],
  items: [["A oficina ocorrerá caso haja inscrições.", 0], ["Eu participo contanto que haja tempo.", 0],
    ["Vamos comparar para que a escolha seja informada.", 1], ["Explico o preço a fim de que todos entendam.", 1],
    ["Embora o prazo seja curto, o grupo aceita a proposta.", 2], ["Mesmo que chova, a feira continua.", 2],
    ["Espere até que a pessoa confirme o horário.", 3], ["Termine o cartaz antes que a visita comece.", 3],
    ["Ela saiu sem que o colega percebesse.", 4], ["O preço mudou sem que ninguém avisasse.", 4]] });
S.push({ type: "fill", title: "Qual é a intenção?", lead: "Complete cada contexto com o conector que expressa a relação indicada.", items: [
  { t: "Reservei um espaço ___ o grupo possa expor as peças. (finalidade)", o: ["para que", "embora", "caso"], a: 0, c: "Finalidade: para que." },
  { t: "___ o material seja caro, a peça vale a pena. (concessão)", o: ["Para que", "Embora", "Até que"], a: 1, c: "Concessão: embora." },
  { t: "Leve dinheiro trocado ___ a barraca não aceite cartão. (condição)", o: ["caso", "sem que", "para que"], a: 0, c: "Condição/hipótese: caso." },
  { t: "Fique aqui ___ o vendedor volte. (limite de tempo)", o: ["até que", "embora", "desde que"], a: 0, c: "Limite da espera: até que." },
  { t: "Pague a fatura ___ ela vença. (tempo)", o: ["antes que", "para que", "mesmo que"], a: 0, c: "Anterioridade: antes que." },
  { t: "Ele comprou o presente ___ ela soubesse. (ausência)", o: ["sem que", "para que", "caso"], a: 0, c: "Sem que: a ação de saber não aconteceu." },
  { t: "Faço desconto ___ você pague à vista. (condição)", o: ["contanto que", "embora", "antes que"], a: 0, c: "Condição: contanto que." },
  { t: "___ faça sol, vamos levar o guarda-chuva. (concessão)", o: ["Mesmo que", "Para que", "Caso"], a: 0, c: "Concessão: mesmo que (= ainda que)." }] });
S.push({ type: "html", menu: "Condições: caso, contanto que, desde que", html: `
  <div class="kicker"><span>Escolhas, contas e boas conversas</span><span>Estrutura</span></div>
  <h1>Condições: caso, contanto que, desde que</h1>
  <div class="cols">
    <div class="col"><h3>❓ Caso</h3><p><b>Aviso:</b> <i>Caso você <b>precise</b>, pode perguntar.</i></p><p style="font-size:17px;color:var(--muted)">A condição ainda está em aberto.</p></div>
    <div class="col"><h3>🤝 Contanto que / desde que</h3><p><b>Combinado:</b> <i>Eu participo contanto que <b>haja</b> tempo para terminar.</i></p><p style="font-size:17px;color:var(--muted)"><i>Desde que</i> também pode ter esse sentido de condição: <i>Pode usar, desde que <b>devolva</b>.</i></p></div>
    <div class="col"><h3>🔀 E o “se”?</h3><p>O <b>se</b> introduz condições com diferentes tempos:</p><p><i>se tenho tempo · se <b>chover</b> · se eu <b>tivesse</b> tempo</i></p><p style="font-size:17px;color:var(--muted)">⚠️ Não usamos <b>se</b> com o presente do subjuntivo: <s>se chova</s> → <b>se chover</b> / <b>caso chova</b>.</p></div>
  </div>
  <div class="tablewrap" style="margin-top:12px"><table class="conj"><tr><th>haver</th><th>ter</th><th>poder</th><th>ser</th><th>estar</th><th>saber</th><th>querer</th></tr>
    <tr><td>haja</td><td>tenha</td><td>possa</td><td>seja</td><td>esteja</td><td>saiba</td><td>queira</td></tr></table></div>` });
S.push({ type: "fill", title: "Condições para uma oficina", lead: "Complete cada contexto com a forma adequada.", items: [
  { t: "A oficina ocorre caso ___ participantes.", o: ["há", "haja", "houver"], a: 1, c: "Caso + presente do subjuntivo: haja." },
  { t: "Caso você ___ ajuda, chame a coordenação.", o: ["precisa", "precise", "precisar"], a: 1, c: "Caso + presente do subjuntivo: precise." },
  { t: "Eu participo contanto que a oficina ___ no sábado.", o: ["seja", "é", "for"], a: 0, c: "Contanto que + subjuntivo: seja." },
  { t: "Pode levar o material, desde que o ___ amanhã.", o: ["devolve", "devolva", "devolver"], a: 1, c: "Desde que (condição) + subjuntivo: devolva." },
  { t: "Se ___, a feira vai para o salão.", o: ["chova", "chover", "chovesse"], a: 1, c: "Se + futuro do subjuntivo: chover." },
  { t: "Caso ___, a feira vai para o salão.", o: ["chova", "chover", "chove"], a: 0, c: "Caso + presente do subjuntivo: chova." },
  { t: "Se eu ___ mais tempo, faria uma peça maior.", o: ["tenha", "tivesse", "tiver"], a: 1, c: "Hipótese no presente: se + imperfeito do subjuntivo → tivesse." },
  { t: "Aceitamos encomendas contanto que o cliente ___ esperar duas semanas.", o: ["pode", "possa", "puder"], a: 1, c: "Contanto que + subjuntivo: possa." }] });
S.push({ type: "html", menu: "Objetivo e contraste não são a mesma coisa", html: `
  <div class="kicker"><span>Escolhas, contas e boas conversas</span><span>Estrutura</span></div>
  <h1>Objetivo e contraste não são a mesma coisa</h1>
  <div class="cols" style="align-items:start">
  <div>
    <div class="col" style="margin-bottom:12px"><h3>🎯 Para que / a fim de que</h3><p><i>Faça uma descrição <b>para que</b> o visitante <b>entenda</b> o trabalho.</i></p><p style="font-size:17px;color:var(--muted)">Mesmo sujeito? Use o infinitivo: <i>Faço a descrição <b>para</b> explicar o trabalho.</i></p></div>
    <div class="col"><h3>⚖️ Embora / ainda que / mesmo que</h3><p><i><b>Embora</b> o tecido <b>seja</b> delicado, pode ser usado com cuidado.</i></p><p style="font-size:17px;color:var(--muted)">Com <b>mas</b> o verbo fica no indicativo: <i>O tecido é delicado, <b>mas</b> pode ser usado.</i></p></div>
  </div>
  <div class="kb"><img class="photo" src="${I("labirinto")}" alt="Bordado labirinto"></div></div>
  <div class="br">Mais de uma frase pode ser gramatical. Nos exercícios, escolha a que <b>conserva a relação de sentido</b> pedida.</div>` });
S.push({ type: "mc", title: "A relação muda a mensagem", lead: "Escolha a resposta adequada à situação. Confira o comentário e explique sua escolha.", items: [
  { q: "Você quer apresentar o objetivo de explicar o preço. Qual frase faz isso?", o: ["Explico o preço embora todos entendam.", "Explico o preço para que todos entendam.", "Explico o preço até que ontem."], a: 1, c: "Objetivo = para que." },
  { q: "Você quer mostrar uma dificuldade que não impede o plano.", o: ["Embora o orçamento seja pequeno, vamos fazer a feira.", "Para que o orçamento seja pequeno, vamos fazer a feira.", "Caso o orçamento seja pequeno, fizemos a feira."], a: 0, c: "Dificuldade que não impede = concessão: embora." },
  { q: "Você quer dizer que só vende se houver pagamento à vista.", o: ["Vendo embora você pague à vista.", "Vendo contanto que você pague à vista.", "Vendo sem que você pague à vista."], a: 1, c: "Condição = contanto que." },
  { q: "Qual frase reescreve “O prazo é curto, mas aceitamos” sem mudar o sentido?", o: ["Embora o prazo seja curto, aceitamos.", "Para que o prazo seja curto, aceitamos.", "Até que o prazo seja curto, aceitamos."], a: 0, c: "Mas (contraste) → embora + subjuntivo." }] });
S.push({ type: "order", title: "Um convite com motivo e condição", lead: "Organize o convite em uma sequência coerente.", items: [
  "Vamos organizar uma pequena mostra de trabalhos.",
  "Convidamos pessoas do bairro para que conheçam o processo.",
  "Embora o orçamento seja pequeno, queremos ouvir muitas ideias.",
  "O encontro acontecerá contanto que haja espaço disponível.",
  "Caso você queira participar, responda até sexta."] });
S.push({ type: "role", title: "Conselho da oficina", lead: "Em grupo, decidam uma proposta e registrem o combinado.", cards: [
  "📌 Escolham uma proposta e definam uma condição com caso ou contanto que.",
  "🎯 Expliquem um objetivo com para que e uma dificuldade com embora.",
  "🔄 Outro grupo propõe uma mudança. Ajustem o combinado e registrem uma frase que todos compreendam.",
  "🗳️ Votem: a oficina será no sábado ou no domingo? Justifiquem com dois conectores."],
  check: ["Usei caso / contanto que + subjuntivo", "Usei para que + subjuntivo", "Usei embora + subjuntivo", "Registrei uma frase final clara"] });
S.push({ type: "html", menu: "Antes que, até que e sem que", html: `
  <div class="kicker"><span>Escolhas, contas e boas conversas</span><span>Estrutura</span></div>
  <h1>Antes que, até que e sem que</h1>
  <div class="cols">
    <div class="col"><h3>⏮️ Antes que</h3><p><i>Termine o cartaz <b>antes que</b> a visita <b>comece</b>.</i></p></div>
    <div class="col"><h3>⏳ Até que</h3><p><i>Aguarde <b>até que</b> o grupo <b>confirme</b>.</i></p><p style="font-size:17px;color:var(--muted)">Indica o limite da espera.</p></div>
    <div class="col"><h3>🚫 Sem que</h3><p><i>O preço mudou <b>sem que</b> eu <b>percebesse</b>.</i></p><p style="font-size:17px;color:var(--muted)">A outra ação não aconteceu.</p></div>
  </div>
  <div class="tablewrap" style="margin-top:12px"><table class="conj"><tr><th>Frase principal</th><th>Subjuntivo</th><th>Exemplo</th></tr>
    <tr><td>presente / futuro / imperativo</td><td><b>presente</b></td><td>Saia antes que <b>chova</b>.</td></tr>
    <tr><td>passado</td><td><b>imperfeito</b></td><td>Saí antes que <b>chovesse</b>. · Mudou sem que eu <b>percebesse</b>.</td></tr></table></div>` });
S.push({ type: "fill", title: "Uma sequência sem confusão", lead: "Complete cada contexto. Observe o tempo da frase principal.", items: [
  { t: "Espere ___ a atendente confirme o pedido. (limite da espera)", o: ["até que", "embora", "para que"], a: 0, c: "Limite da espera: até que." },
  { t: "Compre o presente antes que a loja ___.", o: ["fecha", "feche", "fechasse"], a: 1, c: "Frase no imperativo → presente do subjuntivo: feche." },
  { t: "Saímos antes que ___.", o: ["chova", "chovesse", "chove"], a: 1, c: "Frase no passado → imperfeito do subjuntivo: chovesse." },
  { t: "Ele pagou a conta sem que nós ___.", o: ["víssemos", "vejamos", "vimos"], a: 0, c: "Passado → imperfeito: víssemos." },
  { t: "Vou ficar na fila até que ___ a minha vez.", o: ["chegue", "chega", "chegasse"], a: 0, c: "Futuro → presente do subjuntivo: chegue." },
  { t: "Não saia sem que a vendedora ___ o comprovante.", o: ["entregue", "entrega", "entregasse"], a: 0, c: "Imperativo → presente do subjuntivo: entregue." },
  { t: "Ela trabalhou na renda até que a peça ___ pronta.", o: ["esteja", "estivesse", "está"], a: 1, c: "Passado → imperfeito: estivesse." },
  { t: "Avise o grupo antes que o preço ___.", o: ["mude", "muda", "mudasse"], a: 0, c: "Imperativo → presente do subjuntivo: mude." }] });
S.push({ type: "mc", title: "Preserve a intenção do recado", lead: "Escolha a reformulação que atende ao contexto e ao sentido indicado.", items: [
  { q: "A pessoa quer que o grupo compreenda a proposta. Qual recado expressa finalidade?", o: ["Fale devagar para que todos entendam.", "Fale devagar embora todos entendam.", "Fale devagar sem que todos entendam."], a: 0, c: "Finalidade: para que." },
  { q: "O preço subiu e ninguém foi avisado. Qual frase diz isso?", o: ["O preço subiu para que ninguém avisasse.", "O preço subiu sem que ninguém avisasse.", "O preço subiu até que ninguém avisasse."], a: 1, c: "Ausência do aviso: sem que." },
  { q: "Você precisa enviar o pedido e a loja fecha às 18h.", o: ["Envie o pedido antes que a loja feche.", "Envie o pedido embora a loja feche.", "Envie o pedido sem que a loja feche."], a: 0, c: "Anterioridade: antes que." },
  { q: "O cliente vai esperar e só sai quando o pacote chegar.", o: ["Ele espera para que o pacote chegue.", "Ele espera até que o pacote chegue.", "Ele espera embora o pacote chegue."], a: 1, c: "Limite da espera: até que." }] });
S.push({ type: "race", title: "Desafio relâmpago: conector + subjuntivo", lead: "15 segundos por pergunta! Sorteie um aluno na roleta e valendo ponto para a equipe.", secs: 15, items: [
  { q: "caso · haver (presente)", o: ["haja", "há", "houvesse"], a: 0 },
  { q: "para que · eles · entender", o: ["entendam", "entendem", "entenderam"], a: 0 },
  { q: "embora · ser (presente)", o: ["seja", "é", "fosse"], a: 0 },
  { q: "sem que · eu · perceber (passado)", o: ["percebesse", "perceba", "percebi"], a: 0 },
  { q: "antes que · a loja · fechar", o: ["feche", "fecha", "fechou"], a: 0 },
  { q: "contanto que · você · poder", o: ["possa", "pode", "puder"], a: 0 },
  { q: "até que · ela · saber", o: ["saiba", "sabe", "sabia"], a: 0 },
  { q: "mesmo que · nós · ter", o: ["tenhamos", "temos", "teremos"], a: 0 }] });

/* ================= 5. PROCURAR ALGUÉM QUE ================= */
sec("Parte 5", "Procurar alguém que…", "Oração adjetiva: pessoa ou coisa ainda não identificada → subjuntivo · identificada → indicativo", "Pedir uma pessoa, um espaço ou um objeto que você ainda não encontrou.", "🔎");
S.push({ type: "html", menu: "Procurar alguém que...", html: `
  <div class="kicker"><span>Escolhas, contas e boas conversas</span><span>Estrutura</span></div>
  <h1>Procurar alguém que…</h1>
  <div class="cols">
    <div class="col"><h3>🔎 Ainda não identificado → subjuntivo</h3><p><i>Preciso de alguém que <b>conheça</b> a região.</i></p><p><i>Procuro uma peça que <b>caiba</b> nesta caixa.</i></p><p style="font-size:17px;color:var(--muted)">Ainda não sei quem/qual é. Pode até não existir.</p></div>
    <div class="col"><h3>✅ Identificado → indicativo</h3><p><i>Conheço uma pessoa que <b>conhece</b> a região.</i></p><p><i>Tenho uma peça que <b>cabe</b> nesta caixa.</i></p><p style="font-size:17px;color:var(--muted)">Falo de algo concreto e apresento como fato.</p></div>
  </div>
  <div class="br"><b>💬 Também com negação:</b> <i>Não há ninguém que <b>saiba</b> fazer renda aqui.</i> · <i>Não conheço nenhuma loja que <b>aceite</b> Pix.</i></div>` });
S.push({ type: "fill", title: "Você já identificou a pessoa?", lead: "Complete cada contexto. Já sabemos quem é (indicativo) ou ainda não (subjuntivo)?", items: [
  { t: "Ainda não tenho indicação: procuro alguém que ___ me ajudar.", o: ["pode", "possa"], a: 1, c: "Não identificado → subjuntivo: possa." },
  { t: "Conheço uma rendeira que ___ dar aulas.", o: ["pode", "possa"], a: 0, c: "Identificada → indicativo: pode." },
  { t: "Precisamos de um espaço que ___ trinta pessoas.", o: ["comporta", "comporte"], a: 1, c: "Ainda não encontrado → comporte." },
  { t: "Encontrei uma sala que ___ trinta pessoas.", o: ["comporta", "comporte"], a: 0, c: "Já encontrada → comporta." },
  { t: "Quero uma caixa que ___ todas as peças.", o: ["cabe", "caiba"], a: 1, c: "Desejada, não identificada → caiba." },
  { t: "Não há ninguém aqui que ___ fazer labirinto.", o: ["sabe", "saiba"], a: 1, c: "Negação da existência → subjuntivo: saiba." },
  { t: "Tenho um amigo que ___ português e espanhol.", o: ["fala", "fale"], a: 0, c: "Identificado → indicativo: fala." },
  { t: "Vocês conhecem alguma loja que ___ parcelado sem juros?", o: ["vende", "venda"], a: 1, c: "Pergunta sobre algo não identificado → venda." }] });
S.push({ type: "memory", title: "Jogo das ações: encontre a intenção", lead: "Vire as cartas e encontre os pares (conector ↔ relação). Depois use dois conectores em uma frase.", pairs: [
  ["para que", "finalidade"], ["embora", "concessão"], ["caso", "condição"], ["antes que", "anterioridade"], ["até que", "limite de tempo"], ["sem que", "ausência de uma ação"]] });
S.push({ type: "role", title: "Missão final: uma ideia que cabe no orçamento", lead: "Em grupo, criem e apresentem uma proposta em um minuto.", img: I("saofrancisco"), cards: [
  "🌎 Criem uma proposta de atividade sobre artesanato e cultura para visitantes estrangeiros em João Pessoa.",
  "📊 Escolham três despesas fictícias, uma condição, um objetivo e uma dificuldade que não impeça o plano.",
  "🔎 Peçam uma pessoa ou um espaço ainda não identificado: “Precisamos de alguém que…”.",
  "⏱️ Apresentem a proposta em um minuto. A turma vota na mais clara."],
  check: ["Três despesas e o valor total", "Uma condição (caso / contanto que)", "Um objetivo (para que) e uma dificuldade (embora)", "Precisamos de alguém que + subjuntivo"] });

/* ================= JOGO E SAÍDA ================= */
sec("Jogo", "Jogo da forca da unidade", "Dinheiro, animais das cédulas, conectores e Paraíba", "Revisar o vocabulário jogando em equipes.", "🎯");
S.push({ type: "hangman", menu: "Jogo da forca da unidade", title: "Jogo da forca: Unidade 5", lead: "Escolha uma categoria e descubra a palavra antes de o boneco ficar completo. As equipes se alternam: cada uma joga uma palavra.", bank: {
  "Dinheiro e compras": [
    ["TROCO", "Diferença devolvida no pagamento."], ["PARCELA", "Uma parte do pagamento."], ["JUROS", "Acréscimo pelo dinheiro no tempo."], ["ORÇAMENTO", "Previsão de entradas e gastos."],
    ["DESCONTO", "Redução no preço."], ["COMPROVANTE", "Registro de um pagamento."], ["PECHINCHAR", "Negociar um preço menor."], ["VENCIMENTO", "Data para pagar."],
    ["FATURA", "Documento com valores a pagar."], ["CENTAVOS", "Cem deles fazem um real."], ["COFRINHO", "Onde se guardam moedas."], ["HOLERITE", "Registro do pagamento do trabalho."]],
  "Animais das cédulas": [
    ["TARTARUGA", "Nota de 2 reais."], ["GARÇA", "Nota de 5 reais."], ["ARARA", "Nota de 10 reais."], ["MICO-LEÃO-DOURADO", "Nota de 20 reais."],
    ["ONÇA-PINTADA", "Nota de 50 reais."], ["GAROUPA", "Nota de 100 reais."], ["LOBO-GUARÁ", "Nota de 200 reais."], ["BEIJA-FLOR", "Antiga nota de 1 real."]],
  "Conectores": [
    ["EMBORA", "Concessão."], ["CONTANTO QUE", "Condição."], ["PARA QUE", "Finalidade."], ["ANTES QUE", "Anterioridade."],
    ["ATÉ QUE", "Limite de tempo."], ["SEM QUE", "Ausência de uma ação."], ["CASO", "Condição em aberto."], ["MESMO QUE", "Concessão = ainda que."]],
  "Paraíba": [
    ["JOÃO PESSOA", "Capital da Paraíba."], ["RENDEIRA", "Quem faz renda."], ["BORDADO", "Detalhes feitos com linha."], ["TRANÇADO", "Faixas entrelaçadas."],
    ["PALHA", "Material de cestos e chapéus."], ["ARTESANATO", "Trabalho feito à mão."], ["LABIRINTO", "Bordado sobre fios desfiados."], ["CABO BRANCO", "Farol de João Pessoa."]]
} });
sec("Encerramento", "Uma decisão, uma frase melhor", "Revisão: valores, vocabulário de compras, orçamento, conectores e procurar alguém que…", "Verificar o que você aprendeu nesta unidade.", "🏁");
S.push({ type: "reveal", title: "Uma decisão, uma frase melhor", lead: "Sorteie um aluno na roleta, converse antes de revelar a resposta e acrescente um exemplo.", items: [
  { e: "💳", q: "Como você pergunta sobre o custo completo de uma compra?", a: "<i>Qual é o <b>valor total</b>? Tem <b>juros</b>? O que está <b>incluído</b>? Tem <b>desconto à vista</b>?</i>" },
  { e: "🔢", q: "Leia: R$ 49,90 e R$ 1.500,00.", a: "<b>Quarenta e nove reais e noventa centavos</b> · <b>mil e quinhentos reais</b>." },
  { e: "🐆", q: "Que animais aparecem nas notas de 20, 50 e 200 reais?", a: "R$ 20: <b>mico-leão-dourado</b> · R$ 50: <b>onça-pintada</b> · R$ 200: <b>lobo-guará</b>." },
  { e: "🔗", q: "Una as ideias com um conector: “O prazo é curto. Vamos aceitar.”", a: "<b>Embora</b> o prazo <b>seja</b> curto, vamos aceitar. / <b>Mesmo que</b> o prazo <b>seja</b> curto…" },
  { e: "⏱️", q: "Complete: Saí da loja antes que ___ (fechar). / Saia da loja antes que ___ (fechar).", a: "Saí antes que <b>fechasse</b> (passado → imperfeito) · Saia antes que <b>feche</b> (presente)." },
  { e: "🔎", q: "Peça uma pessoa que você ainda não conhece para o seu projeto.", a: "<i>Precisamos de alguém que <b>saiba</b> fazer renda e que <b>possa</b> dar uma oficina no sábado.</i>" }] });
S.push({ type: "html", menu: "Parabéns!", final: true, html: `
  <div style="text-align:center;padding-top:5vh"><div style="font-size:100px;animation:bob 2s ease-in-out infinite">🏆</div><h1>Parabéns, turma!</h1>
  <p class="lead">Vocês leram valores, fizeram contas, valorizaram o trabalho artesanal e organizaram ideias com conectores. Negócio fechado! 🤝</p>
  <div class="card" style="display:inline-block;text-align:center;min-width:320px"><p style="margin:0;font-size:26px">Placar final</p><p class="fs" style="margin:6px 0 0;font-size:34px;font-weight:900"></p><p class="fw" style="margin:4px 0 0;font-size:22px"></p></div></div>`,
  init(el) {
    el.querySelector(".fs").textContent = `Equipe A ${score[0]} × ${score[1]} Equipe B`;
    el.querySelector(".fw").textContent = score[0] === score[1] ? "Empate! 🤝" : (score[0] > score[1] ? "Vitória da Equipe A! 🎉" : "Vitória da Equipe B! 🎉");
    Sound.fanfare(); confetti(140);
  } });
S.push({ type: "credits", noFit: true, menu: "Referências e créditos", title: "Referências e créditos" });
