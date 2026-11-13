/* =====================================================================
   CONTEÚDO DA AULA — NAB3 · Unidade 4 · Português do Brasil
   Para editar: cada S.push({...}) é um slide. Tipos disponíveis:
   cover, img, html, gallery, photos, photoquiz, reveal, mc, fill, memory,
   sort, order, match, role, hangman, race, wheel, tally, credits
   ===================================================================== */
const LESSON = {
  short: "NAB3 · Unidade 4",
  foot: "NAB3 · Unidade 4 · O tempo muda, a conversa continua",
  source: "NAB3 – Unidade 4 (antes Unidade 2; NB3U2.flipchart, PDF “NAB3 - UNIDADE 2”); capa e protocolos Intercultura. Autoria/fonte: acervo fornecido pelo professor. Referência para adaptação pedagógica. Boletins, recados e situações são fictícios, criados para os exercícios."
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
S.push({ type: "cover", main: true, icon: "🌦️", num: "NAB3 · Unidade 4", subj: "O tempo muda, a conversa continua",
  gram: "Tempo e clima · Faz calor, está nublado, chove · Preferências e desejos · É possível que… / É importante que… + presente do subjuntivo",
  goal: "Combine passeios, entenda informações sobre o tempo e recomende mudanças de plano. Recorte cultural: o Amapá, Macapá e o marabaixo.", menu: "Capa da unidade", sec: true });
S.push({ type: "html", menu: "Nossa rota", html: `
  <div class="kicker"><span>Intercultura / Português para a vida real</span><span>NAB3 / Unidade 4</span></div>
  <h1>Nossa rota</h1><p class="lead">O tempo muda, a conversa continua</p>
  <div class="cols">
    <div class="col"><h3>☁️ 1 · Observar</h3><p>Tempo × clima. Descrever o tempo: <i>faz calor, está nublado, chove</i>.</p><p>Ler um boletim e mudar de plano.</p></div>
    <div class="col"><h3>🗺️ 2 · Entender</h3><p>Regiões do Brasil, estações e fenômenos do tempo nas notícias.</p><p>Preferência, desejo ou informação?</p></div>
    <div class="col"><h3>📣 3 · Recomendar</h3><p><i>É possível que chova · É importante que vocês confirmem</i>.</p><p>Amapá, marabaixo e avisos bem escritos.</p></div>
  </div>
  <div class="card"><b>Como funciona:</b> cada assunto começa com uma <span class="hl">capa</span> com o tema e a estrutura.
  Use o <b>placar</b> no topo para jogar em equipes, a <b>🎡 roleta</b> para sortear quem responde e a <b>📱 Sala</b> para a turma entrar pelo celular.</div>` });
S.push({ type: "wheel", menu: "Roleta da turma", title: "🎡 Roleta da turma",
  lead: "Professor: abra a roleta, escreva os nomes dos alunos (um por linha) e gire para sortear quem responde. Os alunos que entram pela 📱 Sala já aparecem aqui." });
S.push({ type: "tally", menu: "Aquecimento: Quanto você tem?", title: "💰 Quanto você tem? Edição tempo",
  lead: "Marque tudo o que <b>já aconteceu com você</b>. Cada experiência vale dinheiro! Depois conte para a turma: “Eu já… / Eu nunca…”.",
  tip: "💬 Use: Eu já peguei uma chuva enorme sem guarda-chuva! · Nunca vi neve… · Você já cancelou uma viagem por causa do tempo?",
  items: [
    ["Pegar uma chuva forte sem guarda-chuva", 200], ["Ver neve de verdade", 400], ["Cancelar um passeio por causa do tempo", 250],
    ["Ficar sem luz durante uma tempestade", 300], ["Ver um arco-íris duplo", 350], ["Levar casaco e passar calor o dia inteiro", 150],
    ["Dormir com medo de trovão", 200], ["Ver granizo cair", 300], ["Dirigir ou caminhar com muita neblina", 250],
    ["Ficar com o tênis encharcado na rua", 150], ["Confiar na previsão e se dar mal", 200], ["Tomar sol demais e ficar vermelho como um camarão", 250]] });

/* ================= 1. TEMPO E CLIMA ================= */
sec("Parte 1", "Tempo e clima: a escala muda", "Tempo meteorológico × clima · Descrever só o que a imagem mostra", "Separar uma observação de agora de um padrão de muitos anos.", "☁️");
S.push({ type: "reveal", title: "Uma imagem, muitas perguntas", lead: "Observe e descreva <b>apenas</b> o que a fotografia permite perceber. Depois formule uma pergunta.", items: [
  { img: I("chuva"), q: "Como você descreveria o tempo nesta cena?", a: "Está <b>chovendo</b>; o céu está <b>nublado</b> e o chão está <b>molhado</b>. As pessoas usam <b>guarda-chuva</b>. Pergunta possível: <i>Será que vai chover a tarde toda?</i>" },
  { img: I("neblina"), q: "E nesta? O que a foto mostra e o que ela não mostra?", a: "Há <b>neblina</b> e a estrada está entre campos com <b>neve</b>; deve estar <b>frio</b>. A foto <b>não</b> diz se o tempo vai melhorar mais tarde: isso seria uma previsão." },
  { e: "💬", q: "Qual palavra para falar do tempo você usa com frequência?", a: "Ex.: <b>calor</b>, <b>chuva</b>, <b>abafado</b>, <b>fresquinho</b>, <b>nublado</b>… Em Heredia: <i>De manhã faz sol e à tarde chove!</i>" }] });
S.push({ type: "html", menu: "Tempo e clima: a escala muda", html: `
  <div class="kicker"><span>O tempo muda, a conversa continua</span><span>Conceito</span></div>
  <h1>Tempo e clima: a escala muda</h1>
  <div class="cols" style="align-items:start">
  <div>
    <div class="col" style="margin-bottom:12px"><h3>🌦️ Tempo (meteorológico)</h3><p>As condições em um lugar, <b>agora</b> ou em um período curto.</p><p style="font-size:17px;color:var(--muted)">Está chovendo agora. · Amanhã pode fazer sol.</p></div>
    <div class="col" style="margin-bottom:12px"><h3>📊 Clima</h3><p><b>Padrões e variações</b> observados ao longo de muitos anos em uma região.</p><p style="font-size:17px;color:var(--muted)">Uma tarde fria não define sozinha o clima de um lugar.</p></div>
    <div class="col"><h3>🔮 Previsão</h3><p>É uma <b>estimativa</b>. Para um compromisso real, confirme a informação e acompanhe a atualização.</p></div>
  </div>
  <div class="kb"><img class="photo" src="${I("chuva")}" alt="Pessoas com guarda-chuva em um dia de chuva"></div></div>
  <div class="br"><b>🇧🇷 No Brasil:</b> “Hoje o <b>tempo</b> está feio” (agora) × “O <b>clima</b> de Macapá é quente e úmido” (padrão). Na conversa do dia a dia, muita gente diz “clima” para as duas coisas!</div>` });
S.push({ type: "sort", title: "Agora ou ao longo dos anos?", lead: "Classifique a informação pelo tipo de observação. Toque em uma frase e depois no grupo certo.",
  groups: ["🌦️ Tempo meteorológico", "📊 Clima"],
  items: [["Hoje o céu está nublado.", 0], ["A previsão indica vento para amanhã.", 0], ["Às quinze horas, começou uma chuva forte.", 0], ["Esta noite vai fazer 18 graus.", 0],
    ["As médias de um período longo ajudam a caracterizar a região.", 1], ["O estudo analisa a variação de temperatura em muitos anos.", 1],
    ["A pesquisa compara o padrão de chuva da região ao longo de décadas.", 1], ["Na Amazônia, chove muito durante boa parte do ano.", 1]] });
S.push({ type: "memory", title: "Palavras que chegam com o tempo", lead: "Vire as cartas e encontre a palavra e sua explicação. Depois use duas palavras em uma frase.", pairs: [
  ["previsão", "estimativa do tempo que vai fazer"], ["boletim", "informe curto com as condições do tempo"], ["temperatura", "quanto está quente ou frio, em graus"],
  ["umidade", "quantidade de água no ar"], ["nublado", "céu coberto de nuvens"], ["garoa", "chuva fininha e fraca"]] });
S.push({ type: "photoquiz", title: "A imagem sustenta a frase?", lead: "Escolha a descrição apoiada no detalhe visível, <b>sem transformar a foto em previsão</b>.", items: [
  { img: I("chuva"), q: "Qual descrição combina com esta imagem?", o: ["Há neve cobrindo a rua.", "A foto mostra chuva e guarda-chuvas.", "A imagem garante sol amanhã."], a: 1, c: "Vemos chuva e guarda-chuvas. A foto não informa o tempo de amanhã." },
  { img: I("neve"), q: "E esta?", o: ["Está fazendo muito calor.", "A cidade vai ter neve o ano inteiro.", "Há neve no chão e nos telhados."], a: 2, c: "A neve é visível. Uma foto não mostra o clima do ano inteiro." },
  { img: I("neblina"), q: "O que a foto permite dizer?", o: ["Há neblina na estrada.", "Está chovendo forte.", "A neblina vai durar o dia todo."], a: 0, c: "Há neblina e pouca visibilidade. Quanto tempo ela dura, a foto não diz." },
  { img: I("sol"), q: "Qual frase descreve a imagem?", o: ["O céu está azul e faz sol.", "Está caindo granizo.", "Amanhã vai chover."], a: 0, c: "Céu azul e sombras fortes: faz sol. “Amanhã vai chover” seria previsão." }] });

/* ================= 2. DESCREVER O TEMPO ================= */
sec("Parte 2", "Faz calor, está nublado, chove", "Fazer (impessoal) · Estar + adjetivo · Chover / está chovendo · Haver neblina · Gostar de / preferir", "Descrever o tempo, ler um boletim e propor um plano B.", "🌡️");
S.push({ type: "html", menu: "Faz calor, está nublado, chove", html: `
  <div class="kicker"><span>O tempo muda, a conversa continua</span><span>Estrutura</span></div>
  <h1>Faz calor, está nublado, chove</h1>
  <div class="tablewrap"><table class="conj"><tr><th>Estrutura</th><th>Exemplos</th><th>Atenção</th></tr>
    <tr><td><b>fazer</b> + substantivo</td><td>Faz calor. · Faz frio. · Faz sol. · Faz vinte graus.</td><td>Impessoal: sempre no singular. <i>Faz</i> dias frios.</td></tr>
    <tr><td><b>estar</b> + adjetivo</td><td>Está quente / frio / nublado / abafado / fresco.</td><td>Descreve o momento.</td></tr>
    <tr><td><b>chover, ventar, nevar</b></td><td>Chove muito aqui. · Está chovendo. · Ventou a noite toda.</td><td>Também impessoais: singular.</td></tr>
    <tr><td><b>haver</b> / <b>ter</b></td><td>Há neblina na estrada. · Tem muita nuvem hoje.</td><td><i>Há</i> é mais formal; <i>tem</i>, coloquial.</td></tr></table></div>
  <div class="cols" style="margin-top:14px">
    <div class="col"><h3>❤️ Preferências</h3><p>Gosto <b>de</b> dias frescos. · Prefiro caminhar quando não está muito quente.</p><p style="font-size:17px;color:var(--muted)">Prefiro o frio <b>ao</b> calor. (preferir A a B)</p></div>
    <div class="col"><h3>🗣️ Para conversar</h3><p>Que calor! · Que frio! · Parece que vai chover. · Abriu o sol! · Está um gelo!</p></div>
  </div>` });
S.push({ type: "fill", title: "Como está o tempo?", lead: "Complete a descrição de cada cenário fictício. Depois leve a ideia para a sua vida e converse com um colega.", items: [
  { t: "Hoje ___ muito calor na cidade.", o: ["faz", "está", "fazem"], a: 0, c: "Calor é substantivo: faz calor." },
  { t: "Leve o guarda-chuva: ___ chovendo.", o: ["faz", "está", "há"], a: 1, c: "Ação em andamento: está chovendo." },
  { t: "No inverno de Curitiba, ___ dias muito frios.", o: ["fazem", "faz", "estão"], a: 1, c: "Fazer impessoal fica no singular: faz dias frios." },
  { t: "De manhã cedo, ___ neblina na serra.", o: ["há", "faz", "está"], a: 0, c: "Haver + substantivo: há neblina." },
  { t: "O céu ___ nublado, mas ainda não choveu.", o: ["faz", "há", "está"], a: 2, c: "Estar + adjetivo: está nublado." },
  { t: "Em Macapá ___ muito durante o primeiro semestre.", o: ["chovem", "chove", "faz chuva"], a: 1, c: "Chover é impessoal: chove muito." },
  { t: "Eu gosto ___ dias frescos para caminhar.", o: ["de", "por", "em"], a: 0, c: "Gostar de: gosto de dias frescos." },
  { t: "Prefiro o frio ___ calor.", o: ["que o", "do que o", "ao"], a: 2, c: "Na norma padrão: preferir A a B → prefiro o frio ao calor." }] });
S.push({ type: "race", title: "Desafio relâmpago: o tempo", lead: "15 segundos por pergunta! Sorteie um aluno na roleta e valendo ponto para a equipe.", secs: 15, items: [
  { q: "Céu cheio de nuvens: está…", o: ["nublado", "ensolarado", "abafado"], a: 0 },
  { q: "Calor úmido, sem vento: está…", o: ["fresco", "abafado", "gelado"], a: 1 },
  { q: "Chuva fininha e fraca:", o: ["temporal", "garoa", "granizo"], a: 1 },
  { q: "Chuva forte, com vento e trovões:", o: ["garoa", "chuvisco", "temporal"], a: 0 },
  { q: "Faz ___ graus. (25)", o: ["vinte e cinco", "vinte cinco", "vinte e cinco os"], a: 0 },
  { q: "O contrário de “esfriar”:", o: ["esquentar", "nevar", "ventar"], a: 0 },
  { q: "Quando o sol aparece depois da chuva: “___ o sol!”", o: ["Abriu", "Fechou", "Caiu"], a: 0 },
  { q: "Instrumento que protege da chuva:", o: ["guarda-sol", "guarda-chuva", "capa de sol"], a: 1 }] });
S.push({ type: "mc", title: "Um boletim para planejar", lead: "<b>Boletim fictício</b> (não é uma previsão real para Macapá): <i>manhã com sol entre nuvens, temperatura de 26 a 29 graus. À tarde, possibilidade de chuva; à noite, céu nublado.</i> O grupo quer fazer uma atividade ao ar livre e tem a opção de usar uma sala coberta.", items: [
  { q: "Em qual período o boletim informa possibilidade de chuva?", o: ["De manhã.", "À tarde.", "Em todos os períodos sem diferença."], a: 1, c: "À tarde há possibilidade de chuva." },
  { q: "Qual é a temperatura prevista para a manhã?", o: ["De 26 a 29 graus.", "Abaixo de 20 graus.", "O boletim não informa."], a: 0, c: "Entre 26 e 29 graus: quente." },
  { q: "Qual é o melhor horário para a atividade ao ar livre?", o: ["À tarde.", "De manhã.", "À noite, com céu nublado."], a: 1, c: "De manhã há sol entre nuvens e o boletim não fala em chuva." },
  { q: "Se a atividade precisar ser à tarde, o que é razoável fazer?", o: ["Cancelar tudo agora.", "Reservar a sala coberta como plano B e confirmar mais perto do horário.", "Ignorar o boletim."], a: 1, c: "“Possibilidade” não é certeza: plano B + confirmação." }] });
S.push({ type: "order", title: "O passeio pode esperar", lead: "Toque nas falas na ordem certa para montar o diálogo. Depois troquem a atividade e a preferência.", items: [
  "— Vamos caminhar à tarde?",
  "— Podemos, mas a previsão do exercício indica possibilidade de chuva.",
  "— Então prefiro confirmar mais perto do horário.",
  "— Boa ideia. Se a atividade precisar mudar, temos uma sala coberta.",
  "— Combinado. Vamos avisar o grupo depois de confirmar."] });
S.push({ type: "role", title: "Plano A, plano B", lead: "Em dupla, planejem um encontro fictício. Cada pessoa tem uma preferência e o tempo pode mudar. Sorteie uma dupla na roleta 🎡.", img: I("chuva"), cards: [
  "📍 Escolham lugar, atividade e horário; digam do que gostam e o que preferem evitar.",
  "📰 Leiam um boletim inventado por outra dupla (ex.: “sol de manhã, chuva forte à tarde”).",
  "🔄 Negociem uma alternativa e confirmem como vão comunicar a decisão ao grupo.",
  "🥶 Uma pessoa não gosta de frio; a outra adora. Encontrem um plano bom para as duas."],
  check: ["Descrevi o tempo (faz / está / chove / há)", "Usei gosto de… / prefiro…", "Propus um plano B", "Combinei como avisar o grupo"] });

/* ================= 3. BRASIL, ESTAÇÕES E FENÔMENOS ================= */
sec("Parte 3", "Regiões, estações e fenômenos", "Regiões do Brasil · Estações do ano · Vocabulário de fenômenos nas notícias", "Localizar estados, falar das estações e entender palavras de uma notícia.", "🗺️");
S.push({ type: "match", title: "Onde fica no mapa do Brasil?", lead: "Toque em uma região e depois no espaço dos estados correspondentes.", pairs: [
  ["Norte", "Amapá e Tocantins"], ["Nordeste", "Pernambuco e Bahia"], ["Centro-Oeste", "Goiás e Mato Grosso"], ["Sudeste", "Minas Gerais e Espírito Santo"], ["Sul", "Paraná e Rio Grande do Sul"]] });
S.push({ type: "html", menu: "As estações não são vividas do mesmo jeito", html: `
  <div class="kicker"><span>O tempo muda, a conversa continua</span><span>Cultura</span></div>
  <h1>As estações não são vividas do mesmo jeito</h1>
  <div class="cols" style="align-items:start">
  <div>
    <p>🌸 ☀️ 🍂 ❄️ <b>Primavera, verão, outono e inverno</b> são os nomes das estações. Mas a experiência de chuva, calor e frio varia muito entre lugares.</p>
    <p>Em algumas conversas regionais, sobretudo no Norte e no Nordeste, <span class="hl">inverno</span> e <span class="hl">verão</span> aparecem ligados a períodos <b>mais chuvosos</b> ou <b>menos chuvosos</b>, e não ao frio. Pergunte o sentido no contexto!</p>
    <p>Para uma viagem, o nome da estação não basta: consulte o lugar, o período e a informação atualizada.</p>
  </div>
  <div class="kb"><img class="photo" src="${I("fortaleza")}" alt="Fortaleza de São José de Macapá"></div></div>
  <div class="br"><b>🇨🇷 E na Costa Rica?</b> Também falamos de <i>invierno</i> (época de chuvas) e <i>verano</i> (época seca). Parecido com o Amapá, não é?</div>` });
S.push({ type: "gallery", title: "Fenômenos do tempo", lead: "Olhe a foto, diga o nome em voz alta e toque para conferir.", items: [
  ["raio", "raio / relâmpago", "Descarga elétrica; o clarão é o relâmpago e o som é o trovão."], ["enchente", "enchente", "A água sobe e invade ruas e casas."], ["seca", "seca", "Muito tempo sem chuva; a terra racha."],
  ["deslizamento", "deslizamento", "A terra desce pela encosta."], ["granizo", "granizo", "Pedrinhas de gelo que caem do céu."], ["neblina", "neblina", "Nuvem baixa que diminui a visibilidade."],
  ["ventania", "ventania", "Vento muito forte; pode derrubar árvores."], ["neve", "neve", "Flocos de gelo; não acontece no Amapá!"], ["chuva", "chuva", "Água que cai das nuvens."]] });
S.push({ type: "match", title: "O fenômeno tem nome", lead: "Associe as palavras às explicações. Aqui trabalhamos vocabulário, não procedimentos de emergência.", pairs: [
  ["trovão", "som associado à descarga elétrica na atmosfera"], ["relâmpago", "clarão associado à descarga elétrica na atmosfera"],
  ["enchente", "elevação do nível de água de um curso d’água"], ["seca", "período de falta de chuva em relação ao que se espera na região"],
  ["deslizamento", "movimento de terra ou material em uma encosta"], ["granizo", "chuva de pedras de gelo"]] });
S.push({ type: "memory", title: "Memória: foto e fenômeno", lead: "Vire as cartas e encontre os pares (foto ↔ palavra).", pairs: [
  ["img:raio", "raio"], ["img:enchente", "enchente"], ["img:seca", "seca"], ["img:granizo", "granizo"], ["img:neblina", "neblina"], ["img:ventania", "ventania"]] });
S.push({ type: "html", menu: "Uma notícia pede contexto", html: `
  <div class="kicker"><span>O tempo muda, a conversa continua</span><span>Leitura de notícias</span></div>
  <h1>Uma notícia pede contexto</h1>
  <div class="cols">
    <div class="col"><h3>📰 Outras palavras nas notícias</h3><p><b>tornado · ciclone · furacão · terremoto · maremoto</b></p><p style="font-size:17px;color:var(--muted)">Terremoto e maremoto não são fenômenos do tempo: vêm do movimento da Terra.</p></div>
    <div class="col"><h3>❓ Quando um termo for novo</h3><p>O que significa? · Onde aconteceu? · Quando?</p><p>A notícia fala de uma <b>observação</b>, de um <b>risco previsto</b> ou de um <b>fato passado</b>?</p></div>
    <div class="col"><h3>✅ Confira antes de repetir</h3><p>Uma palavra isolada não informa o que acontece onde estamos.</p><p>É importante que a gente <b>confirme a fonte, a região e o período</b> do aviso.</p></div>
  </div>` });

/* ================= 4. PREFERÊNCIA, DESEJO E POSSIBILIDADE ================= */
sec("Parte 4", "É possível que… / É importante que…", "Preferência × desejo × informação · Expressões impessoais + presente do subjuntivo", "Recomendar, expressar possibilidade e necessidade sem confundir com certeza.", "💭");
S.push({ type: "html", menu: "Uma preferência não é uma previsão", html: `
  <div class="kicker"><span>O tempo muda, a conversa continua</span><span>Intenção</span></div>
  <h1>Uma preferência não é uma previsão</h1>
  <div class="cols">
    <div class="col"><h3>❤️ Preferência</h3><p>Eu adoro dias frescos. · Não gosto de chuva durante o passeio. · Prefiro uma atividade em local coberto.</p></div>
    <div class="col"><h3>🤞 Desejo</h3><p><b>Tomara que</b> faça sol. · <b>Espero que</b> o dia <b>esteja</b> agradável.</p><p style="font-size:17px;color:var(--muted)">+ presente do subjuntivo</p></div>
    <div class="col"><h3>📰 Informação / possibilidade</h3><p>O boletim informa possibilidade de chuva. · <b>É possível que chova.</b></p></div>
  </div>
  <div class="card">Podemos concordar com o gosto de alguém sem afirmar que o tempo vai obedecer ao nosso desejo. 😉</div>` });
S.push({ type: "sort", title: "Preferência, desejo ou informação?", lead: "Leia a construção inteira e classifique sua intenção principal.",
  groups: ["❤️ Preferência pessoal", "🤞 Desejo", "📰 Informação"],
  items: [["Gosto de conversar em local coberto.", 0], ["Prefiro dias frescos para caminhar.", 0], ["Detesto sair quando está abafado.", 0],
    ["Espero que o dia esteja agradável.", 1], ["Tomara que faça sol no encontro.", 1], ["Que a chuva passe logo!", 1],
    ["Agora está chovendo na cena do exercício.", 2], ["O boletim informa possibilidade de chuva.", 2], ["Ontem fez 31 graus em Macapá.", 2]] });
S.push({ type: "html", menu: "É possível que… / É importante que…", html: `
  <div class="kicker"><span>O tempo muda, a conversa continua</span><span>Estrutura</span></div>
  <h1>É possível que… / É importante que…</h1>
  <div class="cols" style="align-items:start">
    <div class="col"><h3>🧩 Expressões impessoais + que + presente do subjuntivo</h3>
      <p><b>Possibilidade:</b> é possível que · pode ser que · talvez</p>
      <p><b>Necessidade:</b> é importante que · é necessário que · é preciso que · convém que</p>
      <p><b>Avaliação:</b> é melhor que · é bom que · é ótimo que</p>
      <p style="font-size:17px;color:var(--muted)">É possível que <b>chova</b>. · É importante que vocês <b>confirmem</b> o horário.</p></div>
    <div class="tablewrap" style="margin:0"><table class="conj"><tr><th>Infinitivo</th><th>que ele/ela</th><th>que eles</th></tr>
      <tr><td>chover</td><td>chova</td><td>—</td></tr><tr><td>fazer</td><td>faça</td><td>façam</td></tr>
      <tr><td>confirmar</td><td>confirme</td><td>confirmem</td></tr><tr><td>ter</td><td>tenha</td><td>tenham</td></tr>
      <tr><td>estar</td><td>esteja</td><td>estejam</td></tr><tr><td>ser</td><td>seja</td><td>sejam</td></tr>
      <tr><td>ir</td><td>vá</td><td>vão</td></tr><tr><td>trazer</td><td>traga</td><td>tragam</td></tr></table></div>
  </div>
  <div class="br"><b>⚖️ Compare:</b> <b>É certo que</b> o grupo <b>chega</b> hoje. (certeza → indicativo) × <b>É possível que</b> o grupo <b>chegue</b> hoje. (possibilidade → subjuntivo)</div>` });
S.push({ type: "fill", title: "Uma recomendação para o grupo", lead: "Complete as frases no presente do subjuntivo.", items: [
  { t: "É possível que ___ à tarde.", o: ["chove", "chova", "chover"], a: 1, c: "É possível que + subjuntivo: chova." },
  { t: "É importante que vocês ___ o horário.", o: ["confirmem", "confirmam", "confirmar"], a: 0, c: "Confirmar → confirmem." },
  { t: "É melhor que a gente ___ um guarda-chuva.", o: ["leva", "levar", "leve"], a: 2, c: "Levar → leve." },
  { t: "É necessário que todos ___ água.", o: ["tragam", "trazem", "trouxeram"], a: 0, c: "Trazer → tragam (irregular)." },
  { t: "Pode ser que ___ frio à noite.", o: ["faz", "faça", "fazer"], a: 1, c: "Fazer → faça." },
  { t: "É bom que a sala ___ disponível.", o: ["está", "esteja", "estar"], a: 1, c: "Estar → esteja." },
  { t: "É preciso que nós ___ cedo.", o: ["saímos", "saiamos", "sair"], a: 1, c: "Sair → saiamos." },
  { t: "Talvez o passeio ___ no domingo.", o: ["seja", "é", "ser"], a: 0, c: "Talvez (antes do verbo) + subjuntivo: seja." }] });
S.push({ type: "fill", title: "Certeza ou possibilidade?", lead: "Indicativo (certeza) ou subjuntivo (possibilidade, necessidade, avaliação)? Toque na forma certa.", items: [
  { t: "É certo que o grupo ___ hoje.", o: ["chega", "chegue"], a: 0, c: "Certeza → indicativo: chega." },
  { t: "É possível que o grupo ___ hoje.", o: ["chega", "chegue"], a: 1, c: "Possibilidade → subjuntivo: chegue." },
  { t: "É verdade que ___ muito em Macapá.", o: ["chove", "chova"], a: 0, c: "É verdade que → indicativo: chove." },
  { t: "É importante que você ___ o recado.", o: ["lê", "leia"], a: 1, c: "Necessidade → subjuntivo: leia." },
  { t: "Tenho certeza de que a sala ___ aberta.", o: ["está", "esteja"], a: 0, c: "Certeza → indicativo: está." },
  { t: "Não é certo que a atividade ___ à tarde.", o: ["é", "seja"], a: 1, c: "Negar a certeza traz dúvida → subjuntivo: seja." }] });
S.push({ type: "mc", title: "Revise o recado da organização", lead: "Escolha a forma adequada à construção.", items: [
  { q: "É importante que vocês ___ o contato da equipe.", o: ["É importante que vocês tem o contato da equipe.", "É importante que vocês têm o contato da equipe.", "É importante que vocês tenham o contato da equipe.", "É importante que vocês ter o contato da equipe."], a: 2, c: "Ter → tenham (presente do subjuntivo)." },
  { q: "É melhor que todos ___ às nove.", o: ["É melhor que todos chegam às nove.", "É melhor que todos cheguem às nove.", "É melhor que todos chegar às nove."], a: 1, c: "Chegar → cheguem (gu antes de e)." },
  { q: "Convém que a coordenação ___ a mudança.", o: ["Convém que a coordenação explique a mudança.", "Convém que a coordenação explica a mudança.", "Convém que a coordenação explicou a mudança."], a: 0, c: "Explicar → explique (qu antes de e)." },
  { q: "É necessário que ninguém ___ sozinho.", o: ["É necessário que ninguém vai sozinho.", "É necessário que ninguém ir sozinho.", "É necessário que ninguém vá sozinho."], a: 2, c: "Ir → vá." }] });
S.push({ type: "mc", title: "O recado diz certeza ou possibilidade?", lead: "Escolha a interpretação que conserva a mensagem.", items: [
  { q: "“É possível que a atividade mude de horário.” Isso quer dizer que…", o: ["a mudança é uma possibilidade.", "a mudança já foi confirmada.", "não existe nenhuma chance de mudança."], a: 0, c: "“É possível que” = pode acontecer, ainda não é certo." },
  { q: "“É importante que todos tragam documento.” Isso quer dizer que…", o: ["levar documento é opcional.", "a organização recomenda com força levar documento.", "ninguém precisa de documento."], a: 1, c: "“É importante que” expressa necessidade." },
  { q: "“A atividade foi transferida para a sala 3.” Isso é…", o: ["uma possibilidade.", "um desejo.", "uma informação confirmada."], a: 2, c: "Sem expressão de dúvida e no indicativo: é informação." },
  { q: "“Tomara que o tempo melhore.” Quem escreve…", o: ["tem certeza de que vai melhorar.", "deseja que melhore.", "informa a previsão oficial."], a: 1, c: "Tomara que = desejo." }] });
S.push({ type: "race", title: "Desafio relâmpago: presente do subjuntivo", lead: "15 segundos por pergunta! Sorteie um aluno na roleta e valendo ponto para a equipe.", secs: 15, items: [
  { q: "que eu · fazer", o: ["faça", "faço", "faz"], a: 0 },
  { q: "que eles · ter", o: ["têm", "tenham", "tinham"], a: 1 },
  { q: "que nós · ir", o: ["vamos", "iremos", "fomos"], a: 0 },
  { q: "que ela · saber", o: ["sabe", "saiba", "sabia"], a: 1 },
  { q: "que vocês · trazer", o: ["tragam", "trazem", "trazam"], a: 0 },
  { q: "que eu · estar", o: ["estou", "esteja", "estava"], a: 1 },
  { q: "que ele · chegar", o: ["chega", "chegue", "chege"], a: 1 },
  { q: "que elas · ser", o: ["são", "sejam", "fossem"], a: 1 }] });
S.push({ type: "role", title: "Conselho na medida do problema", lead: "Uma pessoa escolhe um imprevisto cotidiano e pede uma sugestão. O colega faz <b>uma pergunta</b> antes de aconselhar.", cards: [
  "🕑 O grupo recebeu dois horários diferentes para a mesma visita.",
  "🏠 Uma colega esqueceu de dizer que prefere um espaço coberto.",
  "❓ Ninguém sabe se a mudança foi confirmada ou é apenas uma possibilidade.",
  "🌧️ A previsão diz “possibilidade de chuva” e metade do grupo quer cancelar."],
  check: ["Fiz uma pergunta antes de aconselhar", "Usei é importante que / é melhor que + subjuntivo", "Separei possibilidade de certeza", "Propus uma solução concreta"] });

/* ================= 5. AMAPÁ E MARABAIXO ================= */
sec("Parte 5", "Amapá: chuva, encontros e marabaixo", "Recorte cultural: Macapá, a linha do Equador e o marabaixo · Perguntar com respeito", "Conhecer uma tradição afro-amapaense e planejar uma visita bem combinada.", "🥁");
S.push({ type: "html", menu: "Amapá · chuva, encontros e marabaixo", html: `
  <div class="kicker"><span>O tempo muda, a conversa continua</span><span>Cultura</span></div>
  <h1>Amapá · chuva, encontros e marabaixo</h1>
  <div class="cols" style="align-items:start">
  <div>
    <p>O <b>marabaixo</b> é uma tradição <b>afro-amapaense</b> que aproxima canto, percussão, dança, fé e comunidade. Foi registrado como <span class="hl">patrimônio cultural do Brasil</span> em 2018.</p>
    <p>As práticas e celebrações têm vínculos com famílias e comunidades negras do Amapá. Conhecê-las também é <b>escutar quem mantém esses saberes</b>.</p>
    <p style="font-size:17px;color:var(--muted)">A foto mostra uma apresentação de marabaixo em Brasília; o recorte cultural estudado é a tradição no Amapá.</p>
  </div>
  <div class="kb"><img class="photo" src="${I("marabaixo")}" alt="Dançarina de marabaixo com saia rodada estampada"></div></div>` });
S.push({ type: "photos", title: "Macapá em fotos", lead: "Escolha uma foto e descreva: o que você vê? O que a imagem <b>não</b> permite concluir sobre o tempo?", items: [
  ["fortaleza", "A Fortaleza de São José de Macapá, construída no século XVIII às margens do rio Amazonas."], ["marcozero", "O Marco Zero do Equador: a linha do Equador passa por Macapá."],
  ["orla", "A orla de Macapá, de frente para o rio Amazonas."], ["curiau", "O Curiaú, área de proteção ambiental e comunidade quilombola perto de Macapá."]] });
S.push({ type: "mc", title: "Vídeo · uma celebração em comunidade", lead: "Assista à reportagem da TV Equinócio “Resistência e fé no tradicional Corte do Mastro do Ciclo do Marabaixo”. Observe as pessoas e os espaços.",
  video: "https://www.youtube.com/results?search_query=Resist%C3%AAncia+e+f%C3%A9+no+tradicional+Corte+do+Mastro+do+Ciclo+do+Marabaixo",
  videoTitle: "Resistência e fé no tradicional Corte do Mastro do Ciclo do Marabaixo", videoLen: "3 min 14 s", items: [
  { q: "A descrição oficial localiza a celebração nas matas de qual comunidade?", o: ["No Pontal da Barra, em Alagoas.", "No Quilombo do Curiaú, em Macapá.", "Na Feira da Torre, em Brasília."], a: 1, c: "O Corte do Mastro acontece nas matas do Quilombo do Curiaú, em Macapá." },
  { q: "O Corte do Mastro faz parte de qual celebração?", o: ["Do Ciclo do Marabaixo.", "Do Festival de Parintins.", "Do Carnaval de Salvador."], a: 0, c: "É um dos momentos do Ciclo do Marabaixo." },
  { q: "Que palavras do título mostram o sentido da festa para a comunidade?", o: ["Pressa e consumo.", "Resistência e fé.", "Chuva e frio."], a: 1, c: "“Resistência e fé”: a tradição afirma a história e a religiosidade da comunidade negra." }] });
S.push({ type: "reveal", title: "Um lugar e uma expressão cultural", lead: "Observe, formule uma pergunta e só depois revele exemplos.", items: [
  { img: I("fortaleza"), q: "O que você percebe neste espaço de Macapá? O que a imagem não permite concluir sobre o tempo?", a: "Vejo uma <b>fortaleza</b> antiga, muralhas e céu com nuvens. Não dá para concluir se vai chover mais tarde nem como é o clima da região: é só um momento. Pergunta: <i>Quando a fortaleza foi construída?</i>" },
  { img: I("marabaixo2"), q: "Que perguntas respeitosas você faria a quem dança o marabaixo?", a: "<i>Há quanto tempo você dança? · O que essa tradição significa para a sua família? · Posso tirar uma foto? · Quando acontece o Ciclo do Marabaixo?</i>" }] });
S.push({ type: "memory", title: "Palavras de uma celebração", lead: "Encontre os pares e use duas palavras para formular uma pergunta.", pairs: [
  ["marabaixo", "tradição afro-amapaense de canto, dança e percussão"], ["caixa", "tambor tocado no marabaixo"],
  ["ladrão", "verso cantado no marabaixo"], ["mastro", "tronco cortado e enfeitado durante o ciclo"], ["quilombo", "comunidade formada por descendentes de pessoas escravizadas"]] });
S.push({ type: "role", title: "Uma visita respeitosa e bem combinada", lead: "Criem uma conversa imaginária para conhecer uma atividade cultural no Amapá.", img: I("curiau"), cards: [
  "🎓 Digam o que querem aprender e o que precisam perguntar aos responsáveis.",
  "🌧️ Considerem uma previsão fictícia com possibilidade de chuva e negociem um plano.",
  "🤝 Façam um desejo e duas recomendações sobre comunicação e convivência.",
  "📸 Uma pessoa quer filmar tudo; a outra acha melhor pedir permissão antes. Combinem."],
  check: ["Fiz perguntas com respeito (Posso…? Vocês poderiam…?)", "Usei tomara que / espero que + subjuntivo", "Fiz duas recomendações com é importante que / é melhor que", "Pensei num plano para a chuva"] });

/* ================= 6. AVISOS E RECADOS ================= */
sec("Parte 6", "Avisos com informação suficiente", "Convém que · É melhor que · É necessário que + subjuntivo · Organizar e interpretar um aviso", "Escrever e ler um recado sem acrescentar nem perder informação.", "📣");
S.push({ type: "fill", title: "Mais formas para recomendar", lead: "Complete conforme o sujeito e o sentido.", items: [
  { t: "Convém que vocês ___ com a organização.", o: ["falem", "falam", "falar"], a: 0, c: "Falar → falem." },
  { t: "É melhor que eu ___ um casaco leve.", o: ["levo", "leve", "levar"], a: 1, c: "Levar → (que eu) leve." },
  { t: "É necessário que a equipe ___ o local antes.", o: ["veja", "vê", "ver"], a: 0, c: "Ver → veja." },
  { t: "Recomendo que vocês ___ protetor solar.", o: ["usam", "usem", "usar"], a: 1, c: "Recomendar que + subjuntivo: usem." },
  { t: "É preciso que alguém ___ as chaves da sala.", o: ["tenha", "tem", "ter"], a: 0, c: "Ter → tenha." },
  { t: "Sugiro que nós ___ o passeio para sábado.", o: ["mudamos", "mudemos", "mudar"], a: 1, c: "Sugerir que + subjuntivo: mudemos." },
  { t: "É bom que todos ___ o celular carregado.", o: ["estejam com", "estão com", "estar com"], a: 0, c: "Estar → estejam." },
  { t: "Peço que ninguém ___ antes do horário.", o: ["sai", "saia", "sair"], a: 1, c: "Pedir que + subjuntivo: saia." }] });
S.push({ type: "order", title: "Um aviso com informação suficiente", lead: "Organize a mensagem fictícia. Depois criem um aviso para outra situação.", items: [
  "Olá, grupo! A organização confirmou uma mudança.",
  "A conversa vai acontecer na sala coberta às dez horas.",
  "É importante que todos leiam esta mensagem.",
  "Se alguma pessoa não puder chegar no novo horário, pedimos que avise.",
  "Vamos confirmar o recebimento antes de sair."] });
S.push({ type: "mc", title: "O que foi confirmado?", lead: "<b>Mensagem da equipe (fictícia):</b> <i>Há possibilidade de chuva no período da atividade. Ainda não mudamos o horário. É importante que todos acompanhem as mensagens até as oito. Às oito, vamos confirmar a decisão.</i> Não acrescente informações!", items: [
  { q: "O horário já foi alterado?", o: ["Sim, definitivamente.", "Não; a mudança ainda não foi confirmada.", "A atividade foi cancelada para sempre."], a: 1, c: "“Ainda não mudamos o horário.”" },
  { q: "O que os participantes precisam fazer?", o: ["Acompanhar as mensagens até as oito.", "Chegar mais cedo.", "Levar guarda-chuva obrigatoriamente."], a: 0, c: "“É importante que todos acompanhem as mensagens até as oito.”" },
  { q: "A chuva é…", o: ["uma certeza.", "uma possibilidade.", "um fato passado."], a: 1, c: "“Há possibilidade de chuva.”" },
  { q: "Quando a decisão será confirmada?", o: ["Agora.", "Amanhã.", "Às oito."], a: 2, c: "“Às oito, vamos confirmar a decisão.”" }] });
S.push({ type: "role", title: "Rádio do encontro", lead: "Em trio, criem um boletim de 40 segundos para uma atividade fictícia. Uma pessoa anuncia; outra pergunta; a terceira confirma o que entendeu.", cards: [
  "🌤️ Descrevam uma condição do tempo e uma possibilidade.",
  "🗓️ Informem um plano e uma alternativa.",
  "🧩 Usem duas expressões impessoais com subjuntivo e uma referência clara: este aviso, essa informação…",
  "🎙️ Comecem como uma rádio: “Bom dia, ouvintes! Aqui é a Rádio do Encontro…”"],
  check: ["Descrevi o tempo e uma possibilidade", "Informei plano A e plano B", "Usei duas expressões impessoais + subjuntivo", "A terceira pessoa confirmou sem acrescentar informação"] });
S.push({ type: "role", title: "Nosso roteiro tem mais de uma possibilidade", lead: "Planejem uma visita imaginária em Macapá para pessoas com preferências diferentes.", img: I("orla"), cards: [
  "🏰 Uma pessoa quer observar espaços históricos; outra quer conhecer uma expressão cultural.",
  "📰 Criem um boletim de tempo fictício e combinem como confirmar informações reais quando necessário.",
  "🤞 Apresentem um desejo, duas recomendações e uma pergunta para os responsáveis pela visita.",
  "🌍 Incluam uma parada no Marco Zero do Equador e expliquem por quê."],
  check: ["Conciliei preferências diferentes", "Separei previsão fictícia de informação real", "Usei tomara que + duas recomendações com subjuntivo", "Fiz uma pergunta aos responsáveis"] });

/* ================= JOGO E SAÍDA ================= */
sec("Jogo", "Jogo da forca da unidade", "Tempo, fenômenos, subjuntivo e Amapá", "Revisar o vocabulário jogando em equipes.", "🎯");
S.push({ type: "hangman", menu: "Jogo da forca da unidade", title: "Jogo da forca: Unidade 4", lead: "Escolha uma categoria e descubra a palavra antes de o boneco ficar completo. As equipes se alternam: cada uma joga uma palavra.", bank: {
  "O tempo": [
    ["NUBLADO", "Céu coberto de nuvens."], ["ABAFADO", "Calor úmido, sem vento."], ["GAROA", "Chuva fininha."], ["TEMPORAL", "Chuva forte com vento."],
    ["PREVISÃO", "Estimativa do tempo que vai fazer."], ["UMIDADE", "Água no ar."], ["TEMPERATURA", "Medida em graus."], ["GUARDA-CHUVA", "Protege da chuva."],
    ["ENSOLARADO", "Dia com muito sol."], ["FRESCO", "Nem quente nem frio."], ["BOLETIM", "Informe curto sobre o tempo."], ["CLIMA", "Padrão de muitos anos."]],
  "Fenômenos": [
    ["TROVÃO", "O som da tempestade."], ["RELÂMPAGO", "O clarão da tempestade."], ["ENCHENTE", "A água sobe e invade a rua."], ["SECA", "Falta de chuva."],
    ["GRANIZO", "Pedras de gelo."], ["NEBLINA", "Nuvem baixa."], ["DESLIZAMENTO", "A terra desce a encosta."], ["VENTANIA", "Vento muito forte."],
    ["FURACÃO", "Tempestade gigante que gira."], ["ARCO-ÍRIS", "Sete cores depois da chuva."]],
  "Subjuntivo": [
    ["CHOVA", "É possível que ___."], ["FAÇA", "Tomara que ___ sol."], ["TENHAM", "É importante que vocês ___ o contato."], ["ESTEJA", "Espero que o dia ___ bonito."],
    ["CONFIRMEM", "É preciso que vocês ___ o horário."], ["TRAGAM", "É bom que todos ___ água."], ["SAIBA", "Convém que ele ___ a notícia."], ["VÁ", "É melhor que ninguém ___ sozinho."]],
  "Amapá": [
    ["MACAPÁ", "Capital do Amapá."], ["MARABAIXO", "Tradição afro-amapaense."], ["EQUADOR", "Linha que passa por Macapá."], ["FORTALEZA", "De São José, às margens do rio."],
    ["AMAZONAS", "O grande rio em frente a Macapá."], ["CURIAÚ", "Quilombo perto de Macapá."], ["CAIXA", "Tambor do marabaixo."], ["MASTRO", "Tronco do ciclo do marabaixo."], ["QUILOMBO", "Comunidade de descendentes de pessoas escravizadas."]]
} });
sec("Encerramento", "O que vou levar desta conversa?", "Revisão: tempo × clima, descrever o tempo, preferências, expressões impessoais + subjuntivo, Amapá", "Verificar o que você aprendeu nesta unidade.", "🏁");
S.push({ type: "reveal", title: "O que vou levar desta conversa?", lead: "Sorteie um aluno na roleta, responda oralmente e depois revele pistas para revisar a própria fala.", items: [
  { e: "☁️", q: "Explique a diferença entre tempo e clima com um exemplo.", a: "<b>Tempo</b> = agora / período curto: <i>Hoje está chovendo.</i> · <b>Clima</b> = padrão de muitos anos: <i>Macapá tem clima quente e úmido.</i>" },
  { e: "🌡️", q: "Descreva o tempo de hoje em Heredia com três estruturas diferentes.", a: "Ex.: <b>Faz</b> calor de manhã, o céu <b>está</b> nublado e à tarde <b>chove</b>. / <b>Há</b> neblina na serra." },
  { e: "❤️", q: "Diga uma preferência e um desejo sobre o fim de semana.", a: "<b>Prefiro</b> dias frescos. · <b>Tomara que</b> não <b>chova</b> no sábado!" },
  { e: "📣", q: "Faça duas recomendações para um passeio com possibilidade de chuva.", a: "<b>É importante que</b> vocês <b>levem</b> guarda-chuva. · <b>É melhor que</b> a gente <b>confirme</b> o horário de manhã." },
  { e: "⚖️", q: "Complete: É certo que o ônibus ___ às 8. / É possível que o ônibus ___ às 8. (sair)", a: "É certo que o ônibus <b>sai</b>. · É possível que o ônibus <b>saia</b>." },
  { e: "🥁", q: "O que é o marabaixo? Faça uma pergunta respeitosa sobre ele.", a: "Uma tradição <b>afro-amapaense</b> de canto, dança, percussão e fé. Pergunta: <i>O que essa tradição significa para a sua comunidade?</i>" }] });
S.push({ type: "html", menu: "Parabéns!", final: true, html: `
  <div style="text-align:center;padding-top:5vh"><div style="font-size:100px;animation:bob 2s ease-in-out infinite">🏆</div><h1>Parabéns, turma!</h1>
  <p class="lead">Vocês descreveram o tempo, leram boletins, mudaram de plano e recomendaram com o subjuntivo. Faça chuva ou faça sol! ☀️🌧️</p>
  <div class="card" style="display:inline-block;text-align:center;min-width:320px"><p style="margin:0;font-size:26px">Placar final</p><p class="fs" style="margin:6px 0 0;font-size:34px;font-weight:900"></p><p class="fw" style="margin:4px 0 0;font-size:22px"></p></div></div>`,
  init(el) {
    el.querySelector(".fs").textContent = `Equipe A ${score[0]} × ${score[1]} Equipe B`;
    el.querySelector(".fw").textContent = score[0] === score[1] ? "Empate! 🤝" : (score[0] > score[1] ? "Vitória da Equipe A! 🎉" : "Vitória da Equipe B! 🎉");
    Sound.fanfare(); confetti(140);
  } });
S.push({ type: "credits", noFit: true, menu: "Referências e créditos", title: "Referências e créditos" });
