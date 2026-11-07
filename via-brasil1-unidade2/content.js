/* =====================================================================
   CONTEÚDO DA AULA — VIA Brasil 1 · Unidade 2 · Português do Brasil
   Para editar: cada S.push({...}) é um slide. Tipos disponíveis:
   cover, img, html, gallery, photos, photoquiz, reveal, mc, fill, memory,
   sort, order, match, role, hangman, race, wheel, tally, credits
   ===================================================================== */
const LESSON = {
  short: "VIA Brasil 1 · Unidade 2",
  foot: "VIA Brasil 1 · Unidade 2 · Mensagens, desejos e jeitos de dizer",
  source: "VIA Brasil 1 – Unidade 2 (slides da aula, PDF “UNIDADE 2”); capa e protocolos Intercultura. Trecho de Luis Fernando Veríssimo (Jornal do Brasil, 30/12/2004) e texto de Sherry Turkle citados para fins didáticos. Autoria/fonte: acervo fornecido pelo professor. Referência para adaptação pedagógica."
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
S.push({ type: "cover", main: true, icon: "💬", num: "VIA Brasil 1 · Unidade 2", subj: "Mensagens, desejos e jeitos de dizer",
  gram: "Subjuntivo (presente e imperfeito) · Colocação pronominal · Superlativo · Regência verbal",
  goal: "Expresse desejos e condições, coloque os pronomes no lugar certo, intensifique ideias e use as preposições que os verbos pedem.", menu: "Capa da unidade", sec: true });
S.push({ type: "html", menu: "Nossa rota", html: `
  <div class="kicker"><span>Intercultura / Português para a vida real</span><span>VIA Brasil 1 / Unidade 2</span></div>
  <h1>Nossa rota</h1><p class="lead">Mensagens, desejos e jeitos de dizer</p>
  <div class="cols">
    <div class="col"><h3>📱 1 · Conversar</h3><p>Mensagens de texto, interjeições, <i>tomara</i> × <i>quem dera</i>.</p><p>Subjuntivo e conjunções.</p></div>
    <div class="col"><h3>🧩 2 · Estruturar</h3><p>Colocação pronominal: próclise, mesóclise e ênclise.</p><p>Gênero dos substantivos e formação de verbos.</p></div>
    <div class="col"><h3>🚀 3 · Intensificar</h3><p>Superlativo, regência verbal, expressões com duplo sentido e o teste da pronúncia do X.</p></div>
  </div>
  <div class="card"><b>Como funciona:</b> cada assunto começa com uma <span class="hl">capa</span> com o tema e a estrutura gramatical.
  Use o <b>placar</b> no topo para jogar em equipes e a <b>🎡 roleta</b> para sortear quem responde.</div>` });
S.push({ type: "wheel", menu: "Roleta da turma", title: "🎡 Roleta da turma",
  lead: "Professor: abra a roleta, escreva os nomes dos alunos (um por linha) e gire para sortear quem responde. A roleta também fica no botão do topo, em qualquer slide." });
S.push({ type: "tally", menu: "Aquecimento: Quanto você tem?", title: "💰 Quanto você tem?",
  lead: "Marque tudo o que você <b>já fez</b> na vida. Cada coisa vale dinheiro! Depois conte para a turma: “Eu já… / Eu nunca…”.",
  tip: "💬 Use: Eu já fugi de casa uma vez! · Nunca menti para o professor… · Você já foi a uma festa escondido dos pais?",
  items: [
    ["Ter se cortado", 200], ["Pegar dinheiro da bolsa da mãe", 300], ["Pegar dinheiro da carteira do pai", 350],
    ["Ter feito careta para os pais", 200], ["Fugir de casa uma vez", 200], ["Ter faltado à aula de propósito", 200],
    ["Dizer à mãe que ia dormir, mas continuar vendo TV", 150], ["Ter ido a uma festa escondido dos pais", 400],
    ["Dizer ao amigo “já estou saindo de casa” quando ainda estava no banho", 300], ["Ter dormido na casa de um amigo", 150],
    ["Mentir para os pais", 300], ["Mentir para o professor", 250]] });

/* ================= 1. MENSAGENS E INTERJEIÇÕES ================= */
sec("Parte 1", "Mensagens de texto e interjeições", "Leitura e opinião · Aff! · Tomara (que) × Quem dera", "Discutir o uso do celular e expressar desaprovação, esperança e desejo.", "📱");
S.push({ type: "html", menu: "Leitura: Mensagens de texto deixam você solitário", html: `
  <div class="kicker"><span>Mensagens, desejos e jeitos de dizer</span><span>Leitura</span></div>
  <h1>Mensagens de texto deixam você solitário</h1>
  <p class="lead">Nem muito perto, nem muito longe. É por isso que gostamos tanto de trocar SMS pelo celular. Só tem um problema: estamos nos escondendo atrás deles. E ficando sozinhos.</p>
  <div class="pgrid" style="grid-template-columns:1.3fr 1fr;align-items:start">
    <div class="card" style="margin:0;font-size:19px;line-height:1.55"><b>As mensagens</b> são uma de nossas principais formas de comunicação. Elas são tão sedutoras porque nos dão uma sensação de controle sobre o jeito que nos mostramos aos outros. Com os SMS, apresentamos uma imagem “editada” do que somos — que podemos apagar ou retocar o tempo todo. Parecemos sempre equilibrados e divertidos, nunca temos um dia ruim ou banal. E as pessoas preferem enviar mensagens em vez de falar justamente porque assim elas se escondem das outras, mesmo estando conectadas o tempo todo.<p style="font-size:14px;color:var(--muted);margin:8px 0 0">Texto: Sherry Turkle</p></div>
    <div class="pcard"><img src="${I("garrafa")}" alt="Mensagem em uma garrafa"><div>Uma mensagem na garrafa: comunicação ou solidão?</div></div>
  </div>` });
S.push({ type: "mc", title: "Você entendeu o texto?", lead: "Escolha a resposta de acordo com o texto.", items: [
  { q: "Segundo o texto, por que as mensagens são tão sedutoras?", o: ["Porque são baratas.", "Porque nos dão controle sobre como nos mostramos.", "Porque são mais rápidas que a voz."], a: 1, c: "Elas nos dão “uma sensação de controle sobre o jeito que nos mostramos aos outros”." },
  { q: "O que significa uma imagem “editada” de nós mesmos?", o: ["Uma foto com filtro.", "Uma versão de nós que podemos apagar ou retocar.", "Um perfil falso."], a: 1, c: "Podemos apagar ou retocar o que escrevemos o tempo todo." },
  { q: "Por que, segundo a autora, as pessoas preferem escrever a falar?", o: ["Para se esconder das outras.", "Para economizar tempo.", "Para praticar a escrita."], a: 0, c: "“…assim elas se escondem das outras, mesmo estando conectadas o tempo todo.”" },
  { q: "“Nem muito perto, nem muito longe” descreve…", o: ["a distância ideal de uma mensagem: conectados, mas protegidos.", "o alcance do sinal do celular.", "o tamanho de um SMS."], a: 0, c: "Ficamos em contato, mas sem a exposição de uma conversa cara a cara." }] });
S.push({ type: "role", title: "E você, o que acha?", lead: "Sorteie uma pergunta e converse em duplas. Depois, conte para a turma a opinião do colega.", img: I("celular"), cards: [
  "1️⃣ Você concorda com o título do texto? Por quê?",
  "2️⃣ Por que as pessoas gostam tanto de enviar mensagens pelo celular?",
  "3️⃣ Em que situação não é apropriado usar o celular para enviar mensagens? Por quê?",
  "4️⃣ Você costuma enviar mensagens pelo celular? Comente.",
  "5️⃣ O que você pensa de pessoas que, mesmo estando próximas, conversam sempre por mensagens?",
  "6️⃣ O celular pode ser uma boa companhia? Em que momentos?",
  "7️⃣ Quais são as vantagens e desvantagens das mensagens em relação aos contatos pessoais?"],
  check: ["Dei minha opinião (Eu acho que… / Na minha opinião…)", "Justifiquei com um exemplo", "Concordei ou discordei do colega", "Usei uma expressão do texto"] });
S.push({ type: "html", menu: "Aff! Tomara! Quem dera!", html: `
  <div class="kicker"><span>Mensagens, desejos e jeitos de dizer</span><span>Interjeições</span></div>
  <h1>Aff! · Tomara! · Quem dera!</h1>
  <div class="cols">
    <div class="col"><h3>😒 Aff!</h3><p>Demonstra <span class="hl">desaprovação, decepção</span> ou impaciência.</p><p style="font-size:17px;color:var(--muted)">— O ônibus atrasou de novo.<br>— <b>Aff!</b> Todo dia isso!</p></div>
    <div class="col"><h3>🤞 Tomara (que)</h3><p>Desejo <span class="hl">possível</span>: algo que pode acontecer.</p><p><b>Tomara que</b> + presente do subjuntivo</p><p style="font-size:17px;color:var(--muted)"><b>Tomara que</b> faça sol amanhã!<br>Tomara que ela <b>venha</b>.</p></div>
    <div class="col"><h3>💭 Quem dera</h3><p>Desejo <span class="hl">difícil ou impossível</span>: um sonho.</p><p><b>Quem dera</b> + imperfeito do subjuntivo</p><p style="font-size:17px;color:var(--muted)"><b>Quem dera</b> eu <b>fosse</b> milionário!<br>Quem dera eu <b>tivesse</b> mais tempo…</p></div>
  </div>
  <div class="br"><b>🇧🇷 Curiosidade:</b> <b>Oxalá</b> também expressa desejo (vem do árabe, como o espanhol <i>ojalá</i>), mas no Brasil é mais literário. No dia a dia, dizemos <b>tomara</b>.</div>` });
S.push({ type: "fill", title: "Tomara ou quem dera?", lead: "O desejo é possível ou é um sonho? Toque na opção certa.", items: [
  { t: "___ que amanhã faça sol! A previsão diz que talvez.", o: ["Tomara", "Quem dera"], a: 0, c: "É possível → tomara que + presente do subjuntivo (faça)." },
  { t: "___ eu tivesse um milhão de reais!", o: ["Tomara", "Quem dera"], a: 1, c: "É um sonho → quem dera + imperfeito do subjuntivo (tivesse)." },
  { t: "Tomara que o ônibus não ___ hoje.", o: ["atrase", "atrasasse", "atrasa"], a: 0, c: "Tomara que + presente do subjuntivo: atrase." },
  { t: "Quem dera eu ___ voltar no tempo!", o: ["possa", "pudesse", "posso"], a: 1, c: "Quem dera + imperfeito do subjuntivo: pudesse." },
  { t: "Tomara que ela ___ à festa.", o: ["vem", "viesse", "venha"], a: 2, c: "Vir → que ela venha (presente do subjuntivo)." },
  { t: "Quem dera eu ___ mais alto!", o: ["fosse", "seja", "sou"], a: 0, c: "Ser → se eu fosse (imperfeito do subjuntivo)." },
  { t: "— Esqueci a chave de novo. — ___! Você sempre esquece!", o: ["Aff", "Tomara", "Quem dera"], a: 0, c: "Aff! mostra impaciência e desaprovação." }] });

/* ================= 2. SUBJUNTIVO EM REVISÃO ================= */
sec("Parte 2", "Gramática em revisão: o subjuntivo", "Presente e imperfeito do subjuntivo · Indicativo ou subjuntivo? · Conjunções", "Expressar dúvida, desejo, condição, finalidade e concessão.", "🧠");
S.push({ type: "html", menu: "Presente e imperfeito do subjuntivo", html: `
  <div class="kicker"><span>Mensagens, desejos e jeitos de dizer</span><span>Estrutura</span></div>
  <h1>Presente e imperfeito do subjuntivo</h1>
  <div class="tablewrap"><table class="conj"><tr><th></th><th>falar</th><th>comer</th><th>ter</th><th>ser</th><th>ir</th><th>estar</th></tr>
    <tr><td><b>Presente</b><br><small>que eu…</small></td><td>fale</td><td>coma</td><td>tenha</td><td>seja</td><td>vá</td><td>esteja</td></tr>
    <tr><td><b>Imperfeito</b><br><small>se eu…</small></td><td>falasse</td><td>comesse</td><td>tivesse</td><td>fosse</td><td>fosse</td><td>estivesse</td></tr></table></div>
  <div class="cols" style="margin-top:14px">
    <div class="col"><h3>🧭 Como formar</h3><p><b>Presente:</b> 1ª pessoa do presente sem o <i>-o</i> + <span class="hl">-e</span> (-ar) / <span class="hl">-a</span> (-er/-ir): <i>faço → faça</i>.</p><p><b>Imperfeito:</b> 3ª pessoa plural do perfeito sem <i>-ram</i> + <span class="hl">-sse</span>: <i>fizeram → fizesse</i>.</p></div>
    <div class="col"><h3>🎯 Quando usar</h3><p>Depois de expressões de <b>desejo, dúvida, emoção, ordem</b> e de certas <b>conjunções</b>.</p><p style="font-size:17px;color:var(--muted)">Espero que você <b>goste</b>. · Duvidei que ele <b>viesse</b>.</p></div>
    <div class="col"><h3>⏱️ Concordância</h3><p>Principal no <b>presente/futuro</b> → presente do subjuntivo.</p><p>Principal no <b>passado/condicional</b> → imperfeito do subjuntivo.</p></div>
  </div>` });
S.push({ type: "race", title: "Desafio relâmpago: formas do subjuntivo", lead: "15 segundos por pergunta! Sorteie um aluno na roleta e valendo ponto para a equipe.", secs: 15, items: [
  { q: "que eu · presente · fazer", o: ["faça", "faço", "fizesse"], a: 0 },
  { q: "se nós · imperfeito · ter", o: ["tínhamos", "tivéssemos", "tenhamos"], a: 1 },
  { q: "que ela · presente · ir", o: ["vai", "fosse", "vá"], a: 2 },
  { q: "se você · imperfeito · querer", o: ["quisesse", "queresse", "queira"], a: 0 },
  { q: "que nós · presente · saber", o: ["sabemos", "saibamos", "soubéssemos"], a: 1 },
  { q: "se eles · imperfeito · trazer", o: ["trazessem", "trouxessem", "tragam"], a: 1 },
  { q: "que eu · presente · estar", o: ["esteja", "estou", "estivesse"], a: 0 },
  { q: "se eu · imperfeito · pôr", o: ["ponhasse", "pusesse", "ponha"], a: 1 },
  { q: "que vocês · presente · dar", o: ["dão", "dessem", "deem"], a: 2 },
  { q: "se ela · imperfeito · vir", o: ["viesse", "visse", "venha"], a: 0 }] });
S.push({ type: "fill", title: "Indicativo ou subjuntivo?", lead: "Fato (indicativo) ou desejo, dúvida, emoção (subjuntivo)? Toque na opção certa.", items: [
  { t: "Eu não permito que você ___ sem minha permissão.", o: ["sai", "saia", "saísse"], a: 1, c: "Não permito que → presente do subjuntivo: saia." },
  { t: "Antigamente, ele não nos deixava viajar porque ___ perigoso.", o: ["achava", "achasse", "ache"], a: 0, c: "Porque introduz um fato → indicativo: achava." },
  { t: "Ninguém sabia que eu ___ no Brasil.", o: ["estivesse", "esteja", "estava"], a: 2, c: "Saber que → certeza, fato → indicativo: estava." },
  { t: "Pode ser que nossos planos ___.", o: ["mudam", "mudem", "mudaram"], a: 1, c: "Pode ser que → possibilidade → subjuntivo: mudem." },
  { t: "É pena que tudo ___ tão caro.", o: ["esteja", "está", "estivesse"], a: 0, c: "É pena que → emoção → subjuntivo: esteja." },
  { t: "Foi necessário que a polícia ___.", o: ["interviesse", "intervenha", "interveio"], a: 0, c: "Foi necessário (passado) → imperfeito do subjuntivo: interviesse (como vir → viesse)." },
  { t: "Meu chefe não admite que seus funcionários ___ atrasados.", o: ["chegam", "cheguem", "chegassem"], a: 1, c: "Não admite que (presente) → presente do subjuntivo: cheguem." },
  { t: "Duvidaram que nós ___, por isso não nos esperaram.", o: ["conseguíssemos", "conseguimos", "consigamos"], a: 0, c: "Duvidaram (passado) → imperfeito do subjuntivo: conseguíssemos." }] });
S.push({ type: "html", menu: "Conjunções que pedem subjuntivo", html: `
  <div class="kicker"><span>Mensagens, desejos e jeitos de dizer</span><span>Estrutura</span></div>
  <h1>Conjunções que pedem subjuntivo</h1>
  <div class="cols">
    <div class="col"><h3>🎯 Finalidade</h3><p><span class="hl">para que</span> = a fim de que</p><p style="font-size:17px;color:var(--muted)">Falo devagar <b>para que</b> todos <b>entendam</b>.</p></div>
    <div class="col"><h3>🤝 Concessão</h3><p><span class="hl">embora</span> = se bem que<br><span class="hl">mesmo que</span> = ainda que<br>por mais (menos, muito, pouco) que<br>nem que</p><p style="font-size:17px;color:var(--muted)"><b>Embora</b> <b>estivesse</b> cansado, saiu.</p></div>
    <div class="col"><h3>🔑 Condição</h3><p><span class="hl">contanto que</span> = desde que<br><span class="hl">caso</span> · a não ser que</p><p style="font-size:17px;color:var(--muted)">Vou, <b>contanto que</b> você <b>vá</b> comigo.</p></div>
    <div class="col"><h3>⏳ Tempo e modo</h3><p><span class="hl">até que</span> · <span class="hl">antes que</span><br><span class="hl">sem que</span></p><p style="font-size:17px;color:var(--muted)">Saiu <b>sem que</b> ninguém <b>visse</b>.</p></div>
  </div>
  <div class="card"><b>Atenção:</b> <i>caso</i> + subjuntivo (<b>caso</b> chova) × <i>se</i> + futuro do subjuntivo (<b>se</b> chover). <i>Desde que</i> pode ser condição (+ subjuntivo) ou tempo (+ indicativo: <i>desde que cheguei</i>).</div>` });
S.push({ type: "match", title: "Mesmo sentido", lead: "Toque em uma conjunção e depois na conjunção equivalente.", pairs: [
  ["para que", "a fim de que"], ["embora", "se bem que"], ["contanto que", "desde que (condição)"], ["mesmo que", "ainda que"], ["caso", "se por acaso"], ["a não ser que", "exceto se"]] });
S.push({ type: "reveal", title: "Complete livremente", lead: "A equipe da vez completa oralmente. Depois revele uma resposta possível.", items: [
  { e: "🗣️", q: "Não quero falar com você <b>antes que</b>…", a: "…você <b>se acalme</b>." },
  { e: "🗣️", q: "Não quero falar com você <b>sem que</b>…", a: "…você <b>conheça</b> minha história." },
  { e: "📝", q: "Não assinaremos este contrato <b>até que</b>…", a: "…tudo <b>seja</b> esclarecido." },
  { e: "📝", q: "Não assinaremos este contrato <b>a não ser que</b>… / <b>mesmo que</b>…", a: "…as condições <b>melhorem</b>. / …eles <b>insistam</b>." },
  { e: "🏚️", q: "Demoliram aquela casa antiga <b>para que</b>… / <b>se bem que</b>…", a: "…<b>construíssem</b> um prédio novo. / …ela <b>tivesse</b> valor histórico." },
  { e: "🏚️", q: "Demoliram aquela casa antiga <b>sem que</b>…", a: "…os moradores <b>fossem</b> avisados." },
  { e: "✈️", q: "Eles viajariam conosco <b>desde que</b>… / <b>caso</b>…", a: "…<b>trouxessem</b> os passaportes. / …seus pais <b>autorizassem</b>. <small>(trazer → trouxessem)</small>" },
  { e: "🚓", q: "Não chamaremos a polícia <b>contanto que</b>… / <b>a fim de que</b>… / <b>ainda que</b>…", a: "…a situação <b>seja</b> resolvida. / …ninguém <b>se machuque</b>. / …<b>tenhamos</b> medo." }] });
S.push({ type: "reveal", title: "Diga de outro modo", lead: "Reescreva sem mudar o sentido. Modelo: Ele queria ir lá, mas não foi. → <b>Embora quisesse ir lá, não foi.</b>", items: [
  { e: "😐", q: "Ele estava rindo, mas não se sentia feliz.", a: "<b>Embora estivesse</b> rindo, ele não se sentia feliz." },
  { e: "⏰", q: "Não sei se chegaremos a tempo. Mesmo assim, devemos ir até lá.", a: "<b>Mesmo que não cheguemos</b> a tempo, devemos ir até lá." },
  { e: "🤫", q: "Só lhe direi o que aconteceu se você prometer que guardará segredo.", a: "Eu lhe direi o que aconteceu, <b>contanto que</b> você <b>prometa</b> guardar segredo." },
  { e: "🎫", q: "Ele comprou a passagem para poder viajar no fim de semana.", a: "Ele comprou a passagem <b>para que pudesse</b> viajar no fim de semana." },
  { e: "🚪", q: "Ele saiu sem dizer aonde ia.", a: "Ele saiu <b>sem que dissesse</b> aonde ia." },
  { e: "👑", q: "Você pode ganhar muito. Mesmo assim, não ganhará o suficiente para levar vida de rei.", a: "<b>Por mais que</b> você <b>ganhe</b>, não ganhará o suficiente para levar vida de rei." }] });
S.push({ type: "fill", title: "Complete com o verbo", lead: "Escolha a forma correta do subjuntivo.", items: [
  { t: "Para que as máquinas nos ___ no trabalho, é necessário que funcionem bem.", o: ["ajudam", "ajudem", "ajudassem"], a: 1, c: "Para que + presente do subjuntivo: ajudem." },
  { t: "Ele não admitia que nós o tratássemos de senhor, embora ___ muito mais velho.", o: ["fosse", "seja", "era"], a: 0, c: "Embora + subjuntivo; passado → fosse." },
  { t: "Mesmo que eles lhe ___ alguma coisa, não diga nada.", o: ["perguntam", "perguntassem", "perguntem"], a: 2, c: "Mesmo que + presente do subjuntivo: perguntem." },
  { t: "Eu duvido que meu chefe permita que eu ___ de férias em janeiro.", o: ["saia", "saio", "saísse"], a: 0, c: "Duvido que… permita que → presente do subjuntivo: saia." },
  { t: "…embora, nessa época, ___ pouco trabalho no escritório.", o: ["há", "haja", "houvesse"], a: 1, c: "Haver → haja (presente do subjuntivo)." },
  { t: "Joguei fora todos os documentos, embora alguns ___ importantes.", o: ["parecem", "pareçam", "parecessem"], a: 2, c: "Passado (joguei) → imperfeito do subjuntivo: parecessem." },
  { t: "A mãe permitiu que o filho ___ para brincar, contanto que tomasse o leite antes.", o: ["saísse", "saia", "saiu"], a: 0, c: "Permitiu (passado) → imperfeito do subjuntivo: saísse." }] });

/* ================= 3. COLOCAÇÃO PRONOMINAL ================= */
sec("Parte 3", "Colocação pronominal", "Pronomes átonos: me, te, se, o(s), a(s), lhe(s), nos, vos · Próclise, mesóclise e ênclise", "Colocar o pronome antes, no meio ou depois do verbo.", "🧩");
S.push({ type: "html", menu: "Leitura: Ah, não sabe? (Veríssimo)", html: `
  <div class="kicker"><span>Mensagens, desejos e jeitos de dizer</span><span>Leitura com humor</span></div>
  <h1>“Ah, não sabe? Não o sabes?”</h1>
  <div class="pgrid" style="grid-template-columns:1.6fr 1fr;align-items:start">
    <div class="card" style="margin:0;font-size:20px;line-height:1.6">
      — Ah, não sabe? Não o sabes? Sabes-lo não?<br>— Esquece.<br>
      — Não. Como “esquece”? Você prefere falar errado? E o certo é “esquece” ou “esqueça”? Ilumine-me. Mo diga. Ensines-lo-me, vamos.<br>— Depende.<br>
      — Depende. Perfeito. Não o sabes. Ensinar-me-lo-ias, se o soubesses, mas não sabes-o.<br>— Está bem. Está bem. Desculpe. Fale como quiser.
      <p style="font-size:14px;color:var(--muted);margin:8px 0 0">VERÍSSIMO, Luis Fernando. <i>Jornal do Brasil</i>, 30 dez. 2004.</p></div>
    <div class="pcard"><img src="${I("verissimo")}" alt="Luis Fernando Veríssimo"><div>Luis Fernando Veríssimo, cronista gaúcho famoso pelo humor.</div></div>
  </div>` });
S.push({ type: "reveal", title: "Onde está a graça?", lead: "Discuta com a turma e depois revele.", items: [
  { e: "😂", q: "Qual é o humor do texto?", a: "Um personagem quer parecer “correto” e coloca os pronomes em lugares exagerados ou <b>errados</b>. Quanto mais tenta acertar, mais erra!" },
  { e: "✏️", q: "Corrija: “Sabes-lo não?”", a: "<b>Não o sabes?</b> — a palavra <i>não</i> atrai o pronome para antes do verbo (próclise)." },
  { e: "✏️", q: "Corrija: “não sabes-o”.", a: "<b>Não o sabes.</b> Com negação, nunca ênclise." },
  { e: "✏️", q: "“Ensines-lo-me” existe?", a: "Não! O correto seria <b>Ensine-me</b> (ou, no Brasil falado, <b>Me ensina!</b>)." },
  { e: "🤔", q: "“Esquece” ou “esqueça”?", a: "Com <i>você</i>, a norma pede <b>esqueça</b> (imperativo). Na fala do Brasil, <b>esquece</b> é muito comum. Por isso a resposta é… “Depende”! 😄" }] });
S.push({ type: "html", menu: "Próclise, mesóclise e ênclise", html: `
  <div class="kicker"><span>Mensagens, desejos e jeitos de dizer</span><span>Estrutura</span></div>
  <h1>Próclise, mesóclise e ênclise</h1>
  <p class="lead">Pronomes átonos: <b>me, te, se, o(s), a(s), lhe(s), nos, vos</b></p>
  <div class="cols">
    <div class="col"><h3>⬅️ Próclise</h3><p>Pronome <span class="hl">antes</span> do verbo.</p><p style="font-size:22px"><b>Não me abandone.</b></p></div>
    <div class="col"><h3>⏺️ Mesóclise</h3><p>Pronome <span class="hl">no meio</span> do verbo (só no futuro do presente e do pretérito).</p><p style="font-size:22px"><b>Louvar-te-ei eternamente.</b></p></div>
    <div class="col"><h3>➡️ Ênclise</h3><p>Pronome <span class="hl">depois</span> do verbo, com hífen.</p><p style="font-size:22px"><b>Amo-te.</b></p></div>
  </div>
  <div class="br"><b>🇧🇷 No Brasil:</b> na fala, a próclise domina: <i>Me ajuda!</i>, <i>Te amo.</i> Na escrita formal, <b>não se começa frase com pronome átono</b>: <i>Ajude-me.</i> A mesóclise é bem formal (textos jurídicos, discursos).</div>` });
S.push({ type: "html", menu: "Quando usar cada uma", html: `
  <div class="kicker"><span>Mensagens, desejos e jeitos de dizer</span><span>Regras</span></div>
  <h1>Quando usar cada uma?</h1>
  <div class="cols">
    <div class="col"><h3>⬅️ Próclise: palavras que atraem</h3><p style="font-size:17px">
      <b>Negação/advérbio:</b> <i>Não <u>lhe</u> falei a verdade.</i><br>
      <b>Pronome relativo/indefinido:</b> <i>Ela é a pessoa que <u>nos</u> convidou. · Alguém <u>se</u> enganou.</i><br>
      <b>Conjunção subordinativa:</b> <i>…embora <u>me</u> convidem.</i><br>
      <b>Frase exclamativa/optativa:</b> <i>Deus <u>te</u> abençoe!</i><br>
      <b>Interrogativa:</b> <i>Como <u>se</u> faz isso?</i><br>
      <b>Em + gerúndio:</b> <i>Em <u>se</u> tratando de português…</i></p></div>
    <div class="col"><h3>⏺️ Mesóclise</h3><p style="font-size:17px">Futuro do presente ou do pretérito <b>sem palavra atrativa</b>:<br><i>Falar-<u>me</u>-ão novas histórias. · Dar-<u>se</u>-ia a explicação.</i></p>
      <p style="font-size:17px">Com palavra atrativa, volta a próclise:<br>✅ <i>Não <u>me</u> chamarão.</i><br>❌ <i>Não chamar-me-ão.</i></p></div>
    <div class="col"><h3>➡️ Ênclise</h3><p style="font-size:17px">Início de frase e verbo sem palavra atrativa:<br><i>Vendem-<u>se</u> casas.</i></p><p style="font-size:17px">Com infinitivo:<br><i>Tenho de esperar-<u>te</u> no teatro.</i></p><p style="font-size:17px">Com imperativo afirmativo:<br><i>Diga-<u>me</u> a verdade.</i></p></div>
  </div>` });
S.push({ type: "sort", title: "Antes, no meio ou depois?", lead: "Toque em cada frase e coloque-a no grupo da colocação usada.",
  groups: ["⬅️ Próclise", "⏺️ Mesóclise", "➡️ Ênclise"],
  items: [["Não me abandone.", 0], ["Deus te abençoe!", 0], ["Quem me contaria a verdade?", 0], ["Nunca lhe direi isso!", 0],
    ["Dir-lhe-ei isso!", 1], ["Contar-te-ia a verdade.", 1], ["Falar-me-ão novas histórias.", 1],
    ["Amo-te.", 2], ["Vendem-se casas.", 2], ["Tenho de esperar-te no teatro.", 2], ["Diga-me a verdade.", 2]] });
S.push({ type: "fill", title: "Coloque o pronome no lugar certo", lead: "Escolha a colocação de acordo com a norma e pense no motivo.", items: [
  { t: "Nada pedi. (lhe) → ___", o: ["Nada lhe pedi.", "Nada pedi-lhe."], a: 0, c: "Nada (pronome indefinido) atrai o pronome: próclise." },
  { t: "Diremos novamente. (o) → ___", o: ["O diremos novamente.", "Di-lo-emos novamente."], a: 1, c: "Futuro do presente no início da frase → mesóclise (di-lo-emos). No Brasil falado: Vamos dizer de novo." },
  { t: "Não vi quando aproximou de mim. (o, se) → ___", o: ["Não o vi quando se aproximou de mim.", "Não vi-o quando aproximou-se de mim."], a: 0, c: "Não (negação) e quando (conjunção) atraem: próclise nas duas." },
  { t: "Que belo presente vocês deram! (me) → ___", o: ["Que belo presente vocês deram-me!", "Que belo presente vocês me deram!"], a: 1, c: "Frase exclamativa iniciada por que → próclise." },
  { t: "Talvez deem outra oportunidade. (lhes) → ___", o: ["Talvez lhes deem outra oportunidade.", "Talvez deem-lhes outra oportunidade."], a: 0, c: "O advérbio talvez atrai: próclise." },
  { t: "Como faz isso? (se) → ___", o: ["Como faz-se isso?", "Como se faz isso?"], a: 1, c: "Pronome interrogativo atrai: próclise." },
  { t: "Com tempo tudo arranjará. (se) → ___", o: ["Com tempo tudo se arranjará.", "Com tempo tudo arranjar-se-á."], a: 0, c: "Tudo (indefinido) atrai → próclise, mesmo no futuro." },
  { t: "Lá fala português. (se) → ___", o: ["Lá fala-se português.", "Lá se fala português."], a: 1, c: "O advérbio lá atrai o pronome: próclise." },
  { t: "Poria em outro lugar se permitissem. (o, lhe) → ___", o: ["Pô-lo-ia em outro lugar se lhe permitissem.", "Lhe poria em outro lugar se o permitissem."], a: 0, c: "Futuro do pretérito no início → mesóclise (pô-lo-ia); a conjunção se atrai lhe. Nunca se começa a frase com lhe." }] });
S.push({ type: "html", menu: "O, a → lo, la · no, na", html: `
  <div class="kicker"><span>Mensagens, desejos e jeitos de dizer</span><span>Estrutura</span></div>
  <h1>Quando o pronome muda de forma</h1>
  <div class="tablewrap"><table class="conj"><tr><th>Terminação do verbo</th><th>Pronome</th><th>Exemplos</th></tr>
    <tr><td><b>Normalmente</b></td><td><b>o, os, a, as</b></td><td>Quero-<b>a</b>. · Dou-<b>o</b>. · Escrevi-<b>as</b>.</td></tr>
    <tr><td><b>-R, -S, -Z</b><br><small>tire a letra e acrescente</small></td><td><b>lo, los, la, las</b></td><td>comprar + o → compr<b>á-lo</b> · fiz + o → f<b>i-lo</b> · fizemos + o → fizem<b>o-lo</b></td></tr>
    <tr><td><b>-M, -ÃO, -ÕE</b></td><td><b>no, nos, na, nas</b></td><td>deram + a → deram-<b>na</b> · dão + as → dão-<b>nas</b> · põe + o → põe-<b>no</b></td></tr></table></div>
  <div class="card"><b>Cuidado com o acento:</b> ao tirar o <i>-r</i>, a vogal final pode ganhar acento: <i>amar → amá-lo</i>, <i>vender → vendê-lo</i>, <i>pôr → pô-lo</i>, mas <i>partir → parti-lo</i>.<br>❌ <i>encurtar-la</i>, <i>alisar-lo</i> &nbsp;→&nbsp; ✅ <b>encurtá-la</b>, <b>alisá-lo</b></div>` });
S.push({ type: "race", title: "Desafio relâmpago: lo, la, no, na", lead: "Junte o verbo e o pronome. 15 segundos por pergunta!", secs: 15, items: [
  { q: "Vou comprar + o", o: ["comprar-o", "comprá-lo", "compra-no"], a: 1 },
  { q: "Fiz + o", o: ["fi-lo", "fiz-o", "fiz-lo"], a: 0 },
  { q: "Eles fazem + a", o: ["fazem-a", "fazem-la", "fazem-na"], a: 2 },
  { q: "Ele põe + o", o: ["põe-no", "põe-lo", "põe-o"], a: 0 },
  { q: "Quero + a", o: ["quero-la", "quero-na", "quero-a"], a: 2 },
  { q: "Vamos encontrar + os", o: ["encontrar-os", "encontrá-los", "encontra-nos"], a: 1 },
  { q: "Pegaram + o", o: ["pegaram-o", "pegaram-lo", "pegaram-no"], a: 2 },
  { q: "Vou vender + a", o: ["vendê-la", "vender-a", "vende-la"], a: 0 },
  { q: "Fizemos + o", o: ["fizemos-o", "fizemo-lo", "fizemos-lo"], a: 1 },
  { q: "Ele diz + a", o: ["di-la", "diz-a", "diz-na"], a: 0 }] });
S.push({ type: "reveal", title: "Transforme as frases", lead: "Modelo: <b>Dou o dinheiro → Dou-o → Não o dou → Dá-lo-ia se pudesse → Dá-lo-ei se puder</b>", items: [
  { e: "✉️", q: "Escrevi estas cartas.", a: "Escrevi-<b>as</b> → Não <b>as</b> escrevi → Escrevê-<b>las</b>-ia se pudesse → Escrevê-<b>las</b>-ei se puder." },
  { e: "🦷", q: "Paguei ao dentista.", a: "Paguei-<b>lhe</b> → Não <b>lhe</b> paguei → Pagar-<b>lhe</b>-ia se pudesse → Pagar-<b>lhe</b>-ei se puder." },
  { e: "📄", q: "Destruímos as provas.", a: "Destruímo-<b>las</b> → Não <b>as</b> destruímos → Destruí-<b>las</b>-íamos se pudéssemos → Destruí-<b>las</b>-emos se pudermos." },
  { e: "🚔", q: "Pegaram o bandido.", a: "Pegaram-<b>no</b> → Não <b>o</b> pegaram → Pegá-<b>lo</b>-iam se pudessem → Pegá-<b>lo</b>-ão se puderem." },
  { e: "📢", q: "Vou anunciar o resultado.", a: "Vou anunciá-<b>lo</b> → Não vou anunciá-<b>lo</b> → Anunciá-<b>lo</b>-ia se pudesse → Anunciá-<b>lo</b>-ei se puder." },
  { e: "💼", q: "Fiz o trabalho.", a: "Fi-<b>lo</b> → Não <b>o</b> fiz → Fá-<b>lo</b>-ia se pudesse → Fá-<b>lo</b>-ei se puder." }] });

/* ================= 4. SUBSTANTIVOS ================= */
sec("Parte 4", "Masculino ou feminino?", "Substantivos masculinos em -a · Significados diferentes no masculino e no feminino · Plural com ó aberto", "Usar o artigo certo e pronunciar bem o plural.", "🔤");
S.push({ type: "html", menu: "Substantivos masculinos terminados em -a", html: `
  <div class="kicker"><span>Mensagens, desejos e jeitos de dizer</span><span>Vocabulário</span></div>
  <h1>Substantivos masculinos terminados em -a</h1>
  <p class="lead">Quase todos os substantivos em <b>-a</b> são femininos: <i>a sala, a casa</i>. Mas há exceções:</p>
  <div class="cols">
    <div class="col"><h3>🅰️ Em -á</h3><p>o sofá, o crachá, o guaraná</p></div>
    <div class="col"><h3>📐 Em -ema, -oma, -grama</h3><p>o problema, o esquema, o sistema, o telefonema</p><p>o diploma, o idioma, o sintoma, o aroma</p><p>o grama <small>(peso)</small>, o telegrama, o quilograma</p></div>
    <div class="col"><h3>🌍 Outros</h3><p>o dia, o mapa, o clima, o profeta, o pijama, o tapa, o planeta, o drama</p></div>
  </div>
  <div class="card"><b>Dica:</b> muitos vêm do grego (<i>problema, sistema, idioma, drama…</i>). E o adjetivo concorda no masculino: <span class="hl">um problema complicado</span>, <span class="hl">o idioma japonês</span>.</div>` });
S.push({ type: "memory", title: "Jogo da memória: o ou a?", lead: "Vire as cartas e encontre os pares (símbolo ↔ palavra). Diga o artigo em voz alta!", pairs: [
  ["🗺️", "o mapa"], ["🛋️", "o sofá"], ["🪐", "o planeta"], ["🌤️", "o clima"], ["🎓", "o diploma"], ["📞", "o telefonema"], ["🥤", "o guaraná"], ["🪪", "o crachá"]] });
S.push({ type: "fill", title: "Complete as frases", lead: "Modelo: Ele precisa dar uma solução para <b>este</b> problema <b>complicado</b>.", items: [
  { t: "Não posso sair agora. Estou esperando ___ telefonema importante.", o: ["uma", "um"], a: 1, c: "O telefonema → um telefonema importante." },
  { t: "Ele pendurou na parede da sala ___ diploma de inglês.", o: ["o", "a"], a: 0, c: "O diploma (masculino em -oma)." },
  { t: "O atual sistema de comunicação é ___ e não funciona.", o: ["velha", "velho"], a: 1, c: "O sistema → velho." },
  { t: "Para receber o presidente, a polícia montou um esquema ___.", o: ["complexo", "complexa"], a: 0, c: "O esquema → complexo." },
  { t: "Sinta ___ aroma delicioso desta flor!", o: ["o", "a"], a: 0, c: "O aroma → o aroma delicioso." },
  { t: "O japonês é ___ idioma interessante.", o: ["uma", "um"], a: 1, c: "O idioma → um idioma interessante." }] });
S.push({ type: "html", menu: "Um sentido no masculino, outro no feminino", html: `
  <div class="kicker"><span>Mensagens, desejos e jeitos de dizer</span><span>Vocabulário</span></div>
  <h1>Um sentido no masculino, outro no feminino</h1>
  <div class="tablewrap"><table class="conj"><tr><th>Masculino</th><th>Feminino</th></tr>
    <tr><td><b>o caixa</b> = funcionário que recebe o dinheiro<br><i>O caixa errou no troco.</i></td><td><b>a caixa</b> = recipiente; também o lugar de pagar<br><i>Ponha os livros nesta caixa.</i></td></tr>
    <tr><td><b>o guia</b> = livro / pessoa que guia (homem)<br><i>Preciso de um guia da cidade.</i></td><td><b>a guia</b> = mulher que guia; documento<br><i>A guia do museu explicou tudo.</i></td></tr>
    <tr><td><b>o capital</b> = dinheiro<br><i>O capital de giro é pequeno.</i></td><td><b>a capital</b> = cidade principal<br><i>Moro na capital.</i></td></tr>
    <tr><td><b>o moral</b> = ânimo, disposição<br><i>O moral do time está baixo.</i></td><td><b>a moral</b> = ética; lição de uma história<br><i>Qual é a moral da história?</i></td></tr>
    <tr><td><b>o cabeça</b> = líder, chefe<br><i>Prenderam o cabeça do grupo.</i></td><td><b>a cabeça</b> = parte do corpo<br><i>Estou com dor de cabeça.</i></td></tr></table></div>` });
S.push({ type: "fill", title: "O sentido muda tudo", lead: "Escolha o artigo de acordo com o sentido.", items: [
  { t: "___ moral do time está baixo. Estamos precisando de uma vitória.", o: ["O", "A"], a: 0, c: "Aqui moral = ânimo → o moral (masculino). Repare: está baixO." },
  { t: "O pequeno comerciante não consegue comprar material porque ___ capital de giro é pequeno.", o: ["o", "a"], a: 0, c: "Capital = dinheiro → o capital." },
  { t: "Ele sempre gostou de morar ___ capital, mas agora precisa voltar para o interior.", o: ["no", "na"], a: 1, c: "Capital = cidade → a capital → na capital." },
  { t: "A polícia prendeu todos os conspiradores, menos ___ cabeça do movimento.", o: ["o", "a"], a: 0, c: "Cabeça = líder → o cabeça." },
  { t: "Os geógrafos caminharam com dificuldade até ___ nascente do rio.", o: ["o", "a"], a: 1, c: "A nascente = onde o rio nasce. (O nascente = o leste.)" },
  { t: "A região era perigosa, por isso contrataram ___ guia para orientá-los.", o: ["um", "uma"], a: 0, c: "Um guia (pessoa). Também é possível uma guia, se for uma mulher." }] });
S.push({ type: "html", menu: "Plural com ó aberto", html: `
  <div class="kicker"><span>Mensagens, desejos e jeitos de dizer</span><span>Pronúncia</span></div>
  <h1>O olho, os olhos: o som muda no plural</h1>
  <p class="lead">Em muitas palavras, o <b>ô fechado</b> do singular vira <b>ó aberto</b> no plural.</p>
  <div class="tablewrap"><table class="conj"><tr><th>Singular (ô)</th><th>Plural (ó)</th><th>Singular (ô)</th><th>Plural (ó)</th><th>Singular (ô)</th><th>Plural (ó)</th></tr>
    <tr><td>o ovo</td><td>os <b>ó</b>vos</td><td>o corpo</td><td>os c<b>ó</b>rpos</td><td>o jogo</td><td>os j<b>ó</b>gos</td></tr>
    <tr><td>o posto</td><td>os p<b>ó</b>stos</td><td>o esforço</td><td>os esf<b>ó</b>rços</td><td>o porco</td><td>os p<b>ó</b>rcos</td></tr>
    <tr><td>o povo</td><td>os p<b>ó</b>vos</td><td>o osso</td><td>os <b>ó</b>ssos</td><td>o tijolo</td><td>os tij<b>ó</b>los</td></tr></table></div>
  <div class="card"><b>Mas atenção:</b> nem todas mudam! <i>o bolo → os b<b>ô</b>los</i>, <i>o gosto → os g<b>ô</b>stos</i>, <i>o almoço → os alm<b>ô</b>ços</i>, <i>o bolso → os b<b>ô</b>lsos</i>.</div>` });
S.push({ type: "sort", title: "Abre ou não abre?", lead: "Leia o plural em voz alta. O <i>o</i> fica aberto (ó) ou continua fechado (ô)?",
  groups: ["😮 Plural com ó aberto", "🙂 Plural continua com ô fechado"],
  items: [["os ovos", 0], ["os olhos", 0], ["os povos", 0], ["os ossos", 0], ["os jogos", 0], ["os tijolos", 0], ["os porcos", 0],
    ["os bolos", 1], ["os gostos", 1], ["os almoços", 1], ["os bolsos", 1], ["os globos", 1]] });

/* ================= 5. FORMAÇÃO DE PALAVRAS ================= */
sec("Parte 5", "Formação de palavras (2): formando verbos", "en/em + adjetivo + ecer · en/em + adjetivo + ar · a + adjetivo + ar", "Criar verbos a partir de adjetivos e usá-los no dia a dia.", "🛠️");
S.push({ type: "html", menu: "Formando verbos a partir de adjetivos", html: `
  <div class="kicker"><span>Mensagens, desejos e jeitos de dizer</span><span>Estrutura</span></div>
  <h1>Formando verbos a partir de adjetivos</h1>
  <div class="tablewrap"><table class="conj"><tr><th>Formação</th><th>Exemplos</th></tr>
    <tr><td><b>en/em + adjetivo + ecer</b></td><td><i>velho</i> → en<b>velh</b>ecer · <i>magro</i> → em<b>agr</b>ecer · <i>louco</i> → en<b>louqu</b>ecer · <i>rico</i> → en<b>riqu</b>ecer</td></tr>
    <tr><td><b>en/em + adjetivo + ar</b></td><td><i>direito</i> → en<b>direit</b>ar · <i>grosso</i> → en<b>gross</b>ar · <i>curto</i> → en<b>curt</b>ar</td></tr>
    <tr><td><b>a + adjetivo + ar</b></td><td><i>fino</i> → a<b>fin</b>ar · <i>certo</i> → a<b>cert</b>ar · <i>doce</i> → a<b>doç</b>ar · <i>largo</i> → a<b>larg</b>ar</td></tr></table></div>
  <div class="cols" style="margin-top:14px">
    <div class="col"><h3>✍️ Ortografia</h3><p><b>em</b> antes de <i>p</i> e <i>b</i>: em<b>p</b>obrecer, em<b>b</b>elezar.<br>Antes de <i>m</i>, só <b>e</b>: e<b>m</b>agrecer, e<b>m</b>udecer.</p></div>
    <div class="col"><h3>📣 No dia a dia</h3><p><i>Gordura envelhece! · Andar emagrece! · Pensar enlouquece!</i></p><p><i>Abaixo as calorias! A ordem agora é afinar a cintura e ajustar o cinto.</i></p></div>
  </div>` });
S.push({ type: "sort", title: "Qual é a fórmula?", lead: "Classifique cada verbo de acordo com a sua formação.",
  groups: ["en/em + adj. + ecer", "en/em + adj. + ar", "a + adj. + ar"],
  items: [["envelhecer", 0], ["enriquecer", 0], ["empobrecer", 0], ["emagrecer", 0], ["entristecer", 0], ["enlouquecer", 0],
    ["endireitar", 1], ["engrossar", 1], ["encurtar", 1],
    ["alargar", 2], ["afinar", 2], ["adoçar", 2], ["alisar", 2], ["afrouxar", 2]] });
S.push({ type: "race", title: "Desafio relâmpago: forme o verbo", lead: "Do adjetivo ao verbo em 15 segundos!", secs: 15, items: [
  { q: "fraco", o: ["afracar", "enfraquecer", "enfracar"], a: 1 },
  { q: "pobre", o: ["empobrecer", "enpobrecer", "apobrar"], a: 0 },
  { q: "surdo", o: ["asurdar", "ensurdar", "ensurdecer"], a: 2 },
  { q: "mudo", o: ["emudecer", "enmudecer", "amudar"], a: 0 },
  { q: "duro", o: ["adurar", "endurecer", "endurar"], a: 1 },
  { q: "próximo", o: ["aproximar", "enproximar", "aproximecer"], a: 0 },
  { q: "macio", o: ["enmaciar", "amaciecer", "amaciar"], a: 2 },
  { q: "longo", o: ["alongar", "enlongar", "alonguecer"], a: 0 },
  { q: "belo", o: ["abelar", "embelezar", "enbelezar"], a: 1 },
  { q: "triste", o: ["atristar", "entristar", "entristecer"], a: 2 }] });
S.push({ type: "fill", title: "Complete o texto", lead: "Use os verbos formados a partir de (pobre), (fraco), (rico) e (louco).", items: [
  { t: "Os maus negócios o tinham ___ (pobre).", o: ["empobrecido", "enpobrecido", "apobrado"], a: 0, c: "em + pobr + ecer → empobrecer → empobrecido." },
  { t: "Seu crédito junto aos bancos tinha ___ (fraco).", o: ["afracado", "enfraquecido", "enfracado"], a: 1, c: "en + fraqu + ecer → enfraquecer → enfraquecido." },
  { t: "Mas nada o abatia. Ele tinha certeza de que, mais dia menos dia, ___ novamente (rico).", o: ["enriqueceria", "enricaria", "arricaria"], a: 0, c: "Enriquecer no futuro do pretérito: enriqueceria." },
  { t: "Não valia a pena pensar nas dificuldades. Não queria ___ (louco).", o: ["aloucar", "enlouquecer", "enloucar"], a: 1, c: "en + louqu + ecer → enlouquecer." }] });
S.push({ type: "match", title: "Relacione", lead: "Toque em um verbo e depois no complemento que combina com ele.", pairs: [
  ["acertar", "no alvo, na loteria"], ["alisar", "o cabelo"], ["afundar", "na piscina"], ["aproximar", "-se do objeto"], ["ajustar", "contas com alguém"],
  ["afrouxar", "a gravata"], ["adoçar", "o café"], ["amaciar", "o pelo do gato"], ["alongar", "a conversa"], ["alargar", "a saia"]] });
S.push({ type: "reveal", title: "Responda usando os verbos", lead: "Responda com um verbo novo e, se possível, com o pronome (-lo, -la). Depois revele.", items: [
  { e: "👗", q: "Esta saia está muito comprida. O que devo fazer?", a: "<b>Encurte-a.</b> / Você deve <b>encurtá-la</b>. <small>(não “encurtar-la”)</small>" },
  { e: "💇", q: "Meu cabelo está muito crespo. Você acha que posso dar um jeito nele?", a: "Sim, você pode <b>alisá-lo</b>." },
  { e: "⌚", q: "A pulseira do seu relógio não está muito apertada?", a: "Está, sim. Vou <b>afrouxá-la</b>." },
  { e: "🛣️", q: "Esta rua é muito estreita. O que você sugere que a prefeitura faça?", a: "Sugiro que a prefeitura a <b>alargue</b>. / Deve <b>alargá-la</b>." },
  { e: "🗿", q: "Você acha que este monumento de concreto embeleza nossa cidade?", a: "Sim, ele <b>embeleza</b> a cidade. / Não, ele a <b>enfeia</b>." },
  { e: "🤑", q: "Ué! Ele sempre foi pobre e agora vive como um rei! O que aconteceu?", a: "Ele <b>enriqueceu</b>!" },
  { e: "☕", q: "Você vai tomar café sem açúcar?", a: "Não, vou <b>adoçá-lo</b>." },
  { e: "📰", q: "A notícia a alegrou?", a: "Não, ela me <b>entristeceu</b>." },
  { e: "🥗", q: "O regime que ela fez deu resultado?", a: "Sim, ela <b>emagreceu</b>." },
  { e: "💸", q: "Por que ela jogou todo aquele dinheiro pela janela?", a: "Ela <b>enlouqueceu</b>!" },
  { e: "🥣", q: "Este creme está muito fino. O que vamos fazer?", a: "Vamos <b>engrossá-lo</b>." },
  { e: "🧍", q: "Meu filho, você anda muito curvado! O que eu vivo lhe dizendo?", a: "<b>Endireite-se!</b>" }] });

/* ================= 6. SUPERLATIVO ================= */
sec("Parte 6", "Adjetivos: superlativo", "Superlativo relativo (o mais…) e absoluto (-íssimo, super-, muito…) · Comparações populares", "Intensificar qualidades e comparar pessoas, lugares e coisas.", "🎩");
S.push({ type: "role", title: "Sobre Heredia, responda!", lead: "Em grupos, decidam e depois apresentem para a turma. Usem: o/a melhor… · o/a pior… · o mais… de Heredia.", img: I("fortin"), cards: [
  "🍕 Onde servem a melhor pizza de Heredia?", "🍔 E o melhor hambúrguer?", "🤢 Onde servem a pior comida?",
  "☕ Onde servem o pior café? E o melhor?", "🍰 Onde estão as melhores sobremesas?", "🏰 Qual é o lugar mais bonito de Heredia? E o mais antigo?"],
  check: ["Usei o/a melhor… e o/a pior…", "Usei o mais / o menos + adjetivo", "Justifiquei a resposta", "Concordei ou discordei de outro grupo"] });
S.push({ type: "role", title: "Como são os colegas?", lead: "Em pequenos grupos, decidam quem tem cada característica. Modelo: — Quem é o mais simpático da turma? — … é o/a mais simpático/a (da turma).", cards: [
  "😄 popular", "🧐 sério/a", "💪 trabalhador/a", "👔 elegante", "🌧️ pessimista", "🗣️ falador/a"],
  check: ["Fiz a pergunta: Quem é o mais…?", "Respondi: … é o/a mais… da turma", "Concordei o adjetivo (o/a)", "Fui gentil com os colegas 😉"] });
S.push({ type: "html", menu: "Gramática nova: superlativo", html: `
  <div class="kicker"><span>Mensagens, desejos e jeitos de dizer</span><span>Estrutura</span></div>
  <h1>Superlativo</h1>
  <p class="lead">“Tudo foi tão rápido! Ele estava triste à beça, mas aí ela entrou, superanimada, e, num instante, lá estava ele sorrindo alegre, alegre. Dez minutos depois, já estavam agarradinhos, felizes, como dois pombinhos!”</p>
  <div class="cols">
    <div class="col"><h3>📊 Relativo</h3><p>Compara com um grupo:</p><p><i>Ele é <b>o mais</b> simpático <b>da</b> turma.</i><br><i>É <b>o menos</b> caro <b>de</b> todos.</i></p><p style="font-size:17px;color:var(--muted)">Irregulares: o melhor, o pior, o maior, o menor.</p></div>
    <div class="col"><h3>🚀 Absoluto sintético</h3><p><i>O ônibus está chei<b>íssimo</b>.</i></p><p style="font-size:17px;color:var(--muted)">car<b>íssimo</b>, facil<b>imo</b>, paup<b>érrimo</b>, frag<b>ílimo</b>, ót<b>imo</b>, péss<b>imo</b></p></div>
    <div class="col"><h3>💬 Outras formas (O ônibus está…)</h3><p style="font-size:17px">
      <b>reforço:</b> tremendamente / pra lá de / cheio à beça<br>
      <b>prefixo:</b> <b>super</b>cheio, <b>ultra</b>cheio, <b>hiper</b>cheio<br>
      <b>repetição:</b> cheio, cheio<br>
      <b>diminutivo:</b> chei<b>nho</b><br>
      <b>comparação:</b> as pessoas viajam como sardinhas em lata</p></div>
  </div>` });
S.push({ type: "reveal", title: "Superlative a ideia", lead: "Use a forma pedida (ou escolha uma). Depois revele uma resposta possível.", items: [
  { e: "💰", q: "Você está maluco? Uma viagem dessas é <b>cara</b>! (palavra de reforço)", a: "É <b>muito / extremamente</b> cara! · É cara <b>à beça</b>! · É <b>caríssima</b>!" },
  { e: "💡", q: "Esta sua ideia é <b>interessante</b>. (prefixo)", a: "É <b>superinteressante</b>!" },
  { e: "😍", q: "Ele saiu com uma garota <b>linda</b>. (repetição)", a: "…uma garota <b>linda, linda</b>." },
  { e: "✅", q: "Parabéns! Seu exercício está <b>certo</b>. (diminutivo)", a: "Está <b>certinho</b>!" },
  { e: "🍯", q: "Coma uma fatia de abacaxi! Está <b>doce</b>. (comparação — mel)", a: "Está <b>doce como mel</b>! / <b>que nem mel</b>!" },
  { e: "🤩", q: "Ele está <b>entusiasmado</b> com nosso plano.", a: "Está <b>superentusiasmado</b> / <b>entusiasmadíssimo</b>." },
  { e: "🦷", q: "Com Zás-Trás seus dentes vão ficar <b>brancos</b>.", a: "…vão ficar <b>branquíssimos</b> / <b>brancos como a neve</b>." },
  { e: "☀️", q: "No verão, com o sol tão forte, a terra fica <b>dura</b>.", a: "…fica <b>duríssima</b> / <b>dura como pedra</b>." },
  { e: "🔊", q: "Abaixe o volume! Esta música me deixa <b>nervosa</b>.", a: "…me deixa <b>nervosíssima</b> / <b>supernervosa</b>." }] });
S.push({ type: "fill", title: "Substitua o superlativo", lead: "Modelo: sala claríssima → sala <b>superclara</b> · casa limpíssima → casa <b>limpa, limpa</b>.", items: [
  { t: "sucesso probabilíssimo → sucesso ___", o: ["superprovável", "mais provável"], a: 0, c: "Probabilíssimo = superprovável / muito provável." },
  { t: "carta amicíssima → carta ___", o: ["amiga demais", "muito amigável"], a: 1, c: "Amicíssima (de amigo) = muito amigável." },
  { t: "costume antiquíssimo → costume ___", o: ["muito antigo", "menos antigo"], a: 0, c: "Antiquíssimo = muito antigo." },
  { t: "homem paupérrimo → homem ___", o: ["muito rico", "muito pobre"], a: 1, c: "Paupérrimo (forma erudita) = muito pobre. Também existe pobríssimo." },
  { t: "casal felicíssimo → casal ___", o: ["extremamente feliz", "pouco feliz"], a: 0, c: "Felicíssimo = extremamente feliz / feliz da vida." },
  { t: "amigos simpaticíssimos → amigos ___", o: ["super simpáticos", "supersimpáticos"], a: 1, c: "Com o prefixo super-, escreve-se junto: supersimpáticos. (Hífen só antes de h ou r: super-homem, super-rápido.)" },
  { t: "cristal fragílimo → cristal ___", o: ["superfrágil", "fragilzinho"], a: 0, c: "Fragílimo = superfrágil / muito frágil." },
  { t: "samba brasileiríssimo → samba ___", o: ["brasileiro à beça", "pouco brasileiro"], a: 0, c: "Brasileiríssimo = brasileiro à beça / superbrasileiro." }] });
S.push({ type: "match", title: "Brasileiro como o quê?! (1)", lead: "Forme comparações populares: toque no adjetivo e depois na comparação.", pairs: [
  ["amargo", "como fel"], ["magro", "que nem um palito"], ["preto", "que nem carvão"], ["surdo", "como uma porta"], ["molhado", "como um pinto"], ["trabalhar", "feito burro"]] });
S.push({ type: "match", title: "Brasileiro como o quê?! (2)", lead: "Mais comparações! Toque no adjetivo e depois na comparação.", pairs: [
  ["branco", "feito neve"], ["vermelho", "como um pimentão"], ["forte", "como um touro"], ["bêbado", "feito gambá"], ["falar", "como papagaio"], ["manso", "feito um cordeiro"]] });

/* ================= 7. REGÊNCIA VERBAL ================= */
sec("Parte 7", "Regência verbal (2)", "Verbos e suas preposições: a, de, em, por, com · Contrações (do, no, pelo…)", "Usar a preposição certa depois de cada verbo.", "🔗");
S.push({ type: "html", menu: "Verbos e suas preposições", html: `
  <div class="kicker"><span>Mensagens, desejos e jeitos de dizer</span><span>Estrutura</span></div>
  <h1>Verbos e suas preposições</h1>
  <div class="tablewrap"><table class="conj"><tr><th>Verbo</th><th>Sem preposição + substantivo</th><th>Com preposição + substantivo</th><th>Com preposição + infinitivo</th></tr>
    <tr><td><b>agradecer</b></td><td>agradecer o presente</td><td>agradecer <b>a</b> alguém</td><td>—</td></tr>
    <tr><td><b>ajudar</b></td><td>ajudar a amiga</td><td>—</td><td>ajudar <b>a</b> fazer</td></tr>
    <tr><td><b>apaixonar-se</b></td><td>—</td><td>apaixonar-se <b>por</b> alguém</td><td>—</td></tr>
    <tr><td><b>aprender</b></td><td>aprender português</td><td>—</td><td>aprender <b>a</b> nadar</td></tr>
    <tr><td><b>aproximar-se</b></td><td>—</td><td>aproximar-se <b>de</b> alguém</td><td>—</td></tr>
    <tr><td><b>arrepender-se</b></td><td>—</td><td>arrepender-se <b>de</b> algo</td><td>arrepender-se <b>de</b> ter dito</td></tr>
    <tr><td><b>bater</b></td><td>bater o bolo</td><td>bater <b>em</b> algo / alguém</td><td>—</td></tr>
    <tr><td><b>cansar(-se)</b></td><td>cansar os olhos</td><td>cansar-se <b>de</b> algo</td><td>cansar-se <b>de</b> esperar</td></tr></table></div>
  <div class="card"><b>Contrações:</b> de + o = <b>do</b> · de + a = <b>da</b> · de + ele = <b>dele</b> · em + o = <b>no</b> · em + a = <b>na</b> · por + o = <b>pelo</b> · por + a = <b>pela</b></div>` });
S.push({ type: "fill", title: "Complete com a preposição adequada", lead: "Lembre-se das contrações!", items: [
  { t: "De todo coração, agradeço ___ todos.", o: ["a", "de", "por"], a: 0, c: "Agradecer a alguém." },
  { t: "Elisa apaixonou-se ___ vizinho.", o: ["do", "pelo", "no"], a: 1, c: "Apaixonar-se por + o = pelo." },
  { t: "Ela quer aproximar-se ___ a todo custo e não faz segredo disso.", o: ["dele", "nele", "a ele"], a: 0, c: "Aproximar-se de + ele = dele." },
  { t: "Cansei-me ___ vocês. Cansei-me de ouvir bobagens.", o: ["com", "de", "a"], a: 1, c: "Cansar-se de alguém / de fazer algo." },
  { t: "Aconselho vocês ___ pensar antes de falar.", o: ["de", "em", "a"], a: 2, c: "Aconselhar alguém a fazer algo." },
  { t: "O carro bateu ___ poste e depois no muro.", o: ["no", "ao", "do"], a: 0, c: "Bater em + o = no." },
  { t: "O acidente acabou ___ o carro.", o: ["de", "com", "em"], a: 1, c: "Acabar com = destruir." },
  { t: "Nunca me arrependi ___ ter dito aquilo. Nunca me arrependi disso.", o: ["de", "por", "em"], a: 0, c: "Arrepender-se de (de + isso = disso)." },
  { t: "Preciso ajudar Joana ___ preparar a festa.", o: ["de", "a", "para"], a: 1, c: "Ajudar alguém a fazer algo." }] });
S.push({ type: "match", title: "Relacione", lead: "Toque no verbo e depois no complemento certo.", pairs: [
  ["apaixonar-se", "pela ideia"], ["arrepender-se", "de gastar dinheiro"], ["acabar", "com a alegria"], ["aprender", "a esperar"], ["bater", "no moleque"]] });

/* ================= 8. PAUSA: COMO É QUE É?! ================= */
sec("Parte 8", "Pausa: Como é que é?!", "Expressões idiomáticas e duplo sentido", "Entender o humor das expressões populares do Brasil.", "😂");
S.push({ type: "reveal", title: "Explique o sentido destas frases", lead: "Onde está o duplo sentido? A equipe explica e depois revela.", items: [
  { e: "🏍️", q: "Ele pegou a moto e saiu voando para o aeroporto.", a: "<b>Saiu voando</b> = saiu muito rápido. A graça: ele vai voar… mas de moto!" },
  { e: "💊", q: "Esse médico é de morte. Ó a quantidade de remédios que ele me receitou.", a: "<b>Ser de morte</b> = ser terrível, insuportável. E tanto remédio pode até matar!" },
  { e: "🥚", q: "O forno estava muito quente e a clara ficou escura.", a: "<b>Clara</b> = a parte branca do ovo. Jogo com o adjetivo <i>clara</i> × <i>escura</i>." },
  { e: "🪙", q: "Está na cara que ela é coroa.", a: "<b>Está na cara</b> = é óbvio; <b>coroa</b> = pessoa mais velha. E <i>cara ou coroa</i> são os lados da moeda!" },
  { e: "🫏", q: "Cuidado com ele! Ele é esperto pra burro.", a: "<b>Pra burro</b> = muito. Contraste engraçado: “esperto” e “burro” na mesma frase." },
  { e: "🦟", q: "Esse inseticida mata pernilongos. Mata mesmo. Não tem mosquito.", a: "<b>Não tem mosquito</b> = não tem erro (expressão), e também não sobra nenhum mosquito!" },
  { e: "🛏️", q: "Chegando em casa, ele se deitou correndo.", a: "<b>Correndo</b> = com pressa, rapidamente. Impossível deitar e correr ao mesmo tempo!" },
  { e: "🔥", q: "Ficar sem água é fogo.", a: "<b>É fogo</b> = é muito difícil. Água × fogo." },
  { e: "🦴", q: "Este açougueiro conhece os ossos do ofício.", a: "<b>Ossos do ofício</b> = as partes difíceis de uma profissão. E o açougueiro trabalha mesmo com ossos!" },
  { e: "🍎", q: "Ele comprou maçãs a preço de banana.", a: "<b>A preço de banana</b> = muito barato." },
  { e: "🦓", q: "A venda de leões para o zoológico deu zebra. A das cobras deu bode.", a: "<b>Dar zebra</b> = ter um resultado inesperado; <b>dar bode</b> = dar problema. Tudo com animais!" },
  { e: "🔋", q: "O celular descarregado deixou-o uma pilha.", a: "<b>Estar uma pilha</b> = estar muito nervoso. E pilha também é bateria!" },
  { e: "🧶", q: "Na discussão, perder o fio da meada é o nó do problema.", a: "<b>Perder o fio da meada</b> = perder a linha do raciocínio; <b>o nó do problema</b> = o ponto principal. Fio, meada e nó!" },
  { e: "👁️", q: "Eu estou de olho no preço à vista.", a: "<b>Estar de olho</b> = prestar atenção; <b>à vista</b> = pagamento de uma vez. Olho e vista!" },
  { e: "👓", q: "Estes óculos me custaram os olhos da cara.", a: "<b>Custar os olhos da cara</b> = ser caríssimo. E os óculos são para os olhos!" },
  { e: "🍲", q: "Todo mundo adorou o vatapá. A receita anda de boca em boca.", a: "<b>De boca em boca</b> = todo mundo comenta. E a comida vai mesmo de boca em boca! 😋", img: I("vatapa") },
  { e: "🔧", q: "Esse mecânico tem um parafuso a menos.", a: "<b>Ter um parafuso a menos</b> = ser meio maluco. E ele é mecânico!" },
  { e: "🏊", q: "Depois desta competição, o nadador vai pendurar as chuteiras.", a: "<b>Pendurar as chuteiras</b> = aposentar-se (vem do futebol). Mas nadador não usa chuteiras!" },
  { e: "🏠", q: "Terraço sem telhado? Não sei o que deu na telha do arquiteto.", a: "<b>Dar na telha</b> = ter uma ideia repentina, uma vontade. E justamente faltou o telhado!" },
  { e: "🚗", q: "O motorista ligou o carro e pôs o pé na estrada.", a: "<b>Pôr o pé na estrada</b> = partir, começar a viagem." }] });

/* ================= 9. TESTE DA PRONÚNCIA ================= */
sec("Parte 9", "Teste da pronúncia: o X", "X com som de ch, z, s/ss e ks", "Ler em voz alta palavras com X sem medo.", "🗣️");
S.push({ type: "html", menu: "Os quatro sons do X", html: `
  <div class="kicker"><span>Mensagens, desejos e jeitos de dizer</span><span>Pronúncia</span></div>
  <h1>Os quatro sons do X</h1>
  <div class="cols">
    <div class="col"><h3>🤫 CH (queixa)</h3><p>Em geral <b>depois de ditongo</b> e <b>depois de en-</b>:</p><p>queixa, caixa, peixe, baixo, deixar · enxame, enxoval, enxaguar · xadrez, roxo, bruxa, faxina</p></div>
    <div class="col"><h3>🐝 Z (êxito)</h3><p>Em geral em <b>ex-</b> + vogal:</p><p>êxito, exame, exemplo, exagero, exercício, exato, existir</p></div>
    <div class="col"><h3>🐍 S / SS (exceção)</h3><p><b>ex-</b> + consoante e alguns outros:</p><p>exceção, excelente, experiência, explicar, extra, texto · próximo, máximo, auxílio, trouxe</p></div>
    <div class="col"><h3>⚡ KS (sintaxe)</h3><p>Muitas palavras eruditas:</p><p>táxi, tóxico, tórax, sexo, fixo, sufixo, prefixo, léxico, oxigênio, reflexo, fluxo, anexo</p></div>
  </div>` });
S.push({ type: "sort", title: "Que som tem o X?", lead: "Leia em voz alta e coloque cada palavra no grupo do som do X.",
  groups: ["🤫 ch", "🐝 z", "🐍 s / ss", "⚡ ks"],
  items: [["peixe", 0], ["caixa", 0], ["enxaguar", 0], ["xadrez", 0], ["bruxa", 0],
    ["exame", 1], ["êxito", 1], ["exemplo", 1], ["exercício", 1],
    ["texto", 2], ["próximo", 2], ["experiência", 2], ["máximo", 2],
    ["táxi", 3], ["tóxico", 3], ["oxigênio", 3], ["fixo", 3]] });
S.push({ type: "reveal", title: "Leia as frases em voz alta", lead: "Sorteie um aluno na roleta para ler. Depois revele a pronúncia das palavras com X.", items: [
  { e: "🏢", q: "Os edifícios têm excelente extensão.", a: "e<b>x</b>celente [s] · e<b>x</b>tensão [s]" },
  { e: "🏆", q: "Na expectativa dos prêmios, as crianças ficam extremamente excitadas.", a: "e<b>x</b>pectativa [s] · e<b>x</b>tremamente [s] · e<b>x</b>citadas [s]" },
  { e: "😩", q: "Ele está cansado de fazer exceções.", a: "e<b>x</b>ceções [s]" },
  { e: "💌", q: "Envio cumprimentos extensivos a toda a família.", a: "e<b>x</b>tensivos [s]" },
  { e: "📝", q: "Todos se queixaram das questões do exame.", a: "quei<b>x</b>aram [ch] · e<b>x</b>ame [z]" },
  { e: "🔍", q: "A explicação sobre o caso foi extraordinária.", a: "e<b>x</b>plicação [s] · e<b>x</b>traordinária [s]" },
  { e: "💪", q: "Não adianta exigir mais dele. Ele já está fazendo o máximo.", a: "e<b>x</b>igir [z] · má<b>x</b>imo [ss]" },
  { e: "🖼️", q: "A exposição foi um êxito.", a: "e<b>x</b>posição [s] · ê<b>x</b>ito [z]" },
  { e: "🏖️", q: "Ele precisa de férias para relaxar, pois está exausto.", a: "rela<b>x</b>ar [ch] · e<b>x</b>austo [z]" },
  { e: "🇧🇪", q: "Em Bruxelas, Xavier nos auxiliou o tempo todo sem se queixar.", a: "Bru<b>x</b>elas [ss ou ch — as duas se ouvem] · <b>X</b>avier [ch] · au<b>x</b>iliou [ss] · quei<b>x</b>ar [ch]" },
  { e: "😮", q: "O resultado do exame deixou-o perplexo.", a: "e<b>x</b>ame [z] · dei<b>x</b>ou [ch] · perple<b>x</b>o [ks]" },
  { e: "💍", q: "Ele está perdidamente apaixonado e com ideia fixa de se casar ainda este ano.", a: "apai<b>x</b>onado [ch] · fi<b>x</b>a [ks]" }] });

/* ================= JOGO FINAL: FORCA ================= */
S.push({ type: "hangman", menu: "Jogo da forca da unidade", title: "Jogo da forca: Unidade 2", lead: "Escolha uma categoria e descubra a palavra antes de o boneco ficar completo. As equipes se alternam: cada uma joga uma palavra.", bank: {
  "Conjunções do subjuntivo": [
    ["EMBORA", "Concessão: ___ estivesse cansado, saiu."], ["CASO", "Condição: ___ chova, fico em casa."], ["CONTANTO QUE", "Condição: Vou, ___ você vá comigo."],
    ["MESMO QUE", "Concessão = ainda que."], ["PARA QUE", "Finalidade = a fim de que."], ["SEM QUE", "Saiu ___ ninguém visse."], ["ATÉ QUE", "Espero ___ você chegue."],
    ["ANTES QUE", "Vamos sair ___ chova."], ["A NÃO SER QUE", "= exceto se."], ["NEM QUE", "Vou, ___ seja a pé!"], ["DESDE QUE", "Condição = contanto que."], ["AINDA QUE", "Concessão = mesmo que."]],
  "Tomara, quem dera…": [
    ["TOMARA", "Desejo possível: ___ que faça sol!"], ["QUEM DERA", "Desejo difícil: ___ eu fosse rico!"], ["OXALÁ", "Desejo, palavra de origem árabe."], ["AFF", "Interjeição de desaprovação ou decepção."],
    ["SUBJUNTIVO", "Modo verbal do desejo, da dúvida e da hipótese."], ["TIVESSE", "Ter · eu · imperfeito do subjuntivo."], ["FOSSE", "Ser ou ir · eu · imperfeito do subjuntivo."],
    ["SAIBA", "Saber · eu · presente do subjuntivo."], ["HAJA", "Haver · presente do subjuntivo."], ["TROUXESSE", "Trazer · eu · imperfeito do subjuntivo."]],
  "Colocação pronominal": [
    ["PRÓCLISE", "Pronome antes do verbo."], ["MESÓCLISE", "Pronome no meio do verbo."], ["ÊNCLISE", "Pronome depois do verbo."], ["PRONOME", "Me, te, se, o, a, lhe…"],
    ["HÍFEN", "Sinal que liga o pronome ao verbo na ênclise."], ["NEGAÇÃO", "Palavras como não e nunca atraem o pronome."], ["INFINITIVO", "Forma do verbo terminada em -r."],
    ["FI-LO", "Fiz + o."], ["COMPRÁ-LO", "Comprar + o."], ["DERAM-NA", "Deram + a."]],
  "Masculinos em -a": [
    ["PROBLEMA", "O ___ complicado."], ["SISTEMA", "O ___ de comunicação."], ["DIPLOMA", "O ___ de inglês na parede."], ["IDIOMA", "O japonês é um ___ interessante."],
    ["TELEFONEMA", "Estou esperando um ___ importante."], ["MAPA", "Mostra países e cidades."], ["PLANETA", "A Terra é um ___."], ["CLIMA", "Tempo de uma região."],
    ["PIJAMA", "Roupa para dormir."], ["SOFÁ", "Móvel da sala para sentar."], ["GUARANÁ", "Refrigerante brasileiro."], ["CRACHÁ", "Cartão com nome e foto no trabalho."], ["AROMA", "Cheiro agradável."]],
  "Formando verbos": [
    ["ENVELHECER", "Ficar velho."], ["ENRIQUECER", "Ficar rico."], ["EMAGRECER", "Ficar magro."], ["ENLOUQUECER", "Ficar louco."], ["ENTRISTECER", "Ficar triste."],
    ["ENDIREITAR", "Deixar direito."], ["ENGROSSAR", "Deixar grosso."], ["ALARGAR", "Deixar largo."], ["AFINAR", "Deixar fino."], ["ADOÇAR", "Deixar doce."],
    ["AMACIAR", "Deixar macio."], ["ALISAR", "Deixar liso."], ["AFROUXAR", "Deixar frouxo."], ["EMBELEZAR", "Deixar belo."]],
  "Superlativo": [
    ["CARÍSSIMO", "Muito caro."], ["LINDÍSSIMA", "Muito linda."], ["PAUPÉRRIMO", "Muito pobre (forma erudita)."], ["FRAGÍLIMO", "Muito frágil."],
    ["FELICÍSSIMO", "Muito feliz."], ["SUPERCHEIO", "Muito cheio, com prefixo."], ["CHEINHO", "Muito cheio, com diminutivo."], ["À BEÇA", "Muito: triste ___."],
    ["ÓTIMO", "O superlativo de bom."], ["PÉSSIMO", "O superlativo de mau."], ["MELHOR", "O ___ café de Heredia."], ["PIOR", "O contrário de melhor."]],
  "Expressões": [
    ["ZEBRA", "Dar ___ = resultado inesperado."], ["BODE", "Dar ___ = dar problema."], ["PILHA", "Estar uma ___ = estar nervoso."], ["TELHA", "Dar na ___ = ter vontade de repente."],
    ["CHUTEIRAS", "Pendurar as ___ = aposentar-se."], ["PARAFUSO", "Ter um ___ a menos = ser meio maluco."], ["BANANA", "A preço de ___ = muito barato."],
    ["FOGO", "Ser ___ = ser difícil."], ["OSSOS DO OFÍCIO", "As dificuldades de uma profissão."], ["FIO DA MEADA", "Perder o ___ = perder o raciocínio."]],
  "Palavras com X": [
    ["EXAME", "X com som de z: prova."], ["ÊXITO", "X com som de z: sucesso."], ["TÁXI", "X com som de ks: carro com motorista."], ["PEIXE", "X com som de ch: vive na água."],
    ["CAIXA", "X com som de ch: recipiente."], ["XADREZ", "Jogo de tabuleiro com rei e rainha."], ["TEXTO", "X com som de s: o que você lê."], ["PRÓXIMO", "X com som de ss: o que vem depois."],
    ["OXIGÊNIO", "X com som de ks: o ar que respiramos."], ["ENXAGUAR", "X com som de ch: lavar com água limpa."], ["BRUXA", "Personagem com vassoura voadora."], ["EXCELENTE", "Muito bom."]],
  "Regência": [
    ["AGRADECER", "___ a alguém."], ["APAIXONAR", "___-se por alguém."], ["ARREPENDER", "___-se de algo."], ["APROXIMAR", "___-se de alguém."],
    ["CANSAR", "___-se de esperar."], ["AJUDAR", "___ alguém a fazer algo."], ["APRENDER", "___ a nadar."], ["PELO", "Por + o."], ["DELE", "De + ele."], ["NO", "Em + o."]]
} });

/* ================= SAÍDA ================= */
sec("Encerramento", "Saída: o que já consigo fazer?", "Revisão: subjuntivo, colocação pronominal, gênero, formação de verbos, superlativo e regência", "Verificar o que você aprendeu nesta unidade.", "🏁");
S.push({ type: "reveal", title: "Saída: o que já consigo fazer?", lead: "Sorteie um aluno na roleta, responda oralmente e depois compare com a resposta comentada.", items: [
  { e: "🤞", q: "Diga um desejo possível e um desejo impossível.", a: "<b>Tomara que</b> eu <b>passe</b> na prova! · <b>Quem dera</b> eu <b>falasse</b> dez idiomas!" },
  { e: "🧠", q: "Complete: Vou à praia amanhã, a não ser que…", a: "…<b>chova</b>. (a não ser que + presente do subjuntivo)" },
  { e: "🧩", q: "Corrija: “Me empresta o livro?” (na escrita formal) e “Não chamar-me-ão”.", a: "<b>Empreste-me</b> o livro? · <b>Não me chamarão.</b>" },
  { e: "🔤", q: "O ou a? ___ problema, ___ capital (cidade), ___ moral (ânimo).", a: "<b>o</b> problema · <b>a</b> capital · <b>o</b> moral" },
  { e: "🛠️", q: "O café está amargo. O que você faz com ele?", a: "Vou <b>adoçá-lo</b>!" },
  { e: "🎩", q: "Descreva o melhor restaurante de Heredia com um superlativo.", a: "Ex.: É <b>o melhor</b> de Heredia! A comida é <b>deliciosíssima</b> e o lugar é <b>superaconchegante</b>." },
  { e: "🔗", q: "Complete: Ela se apaixonou ___ ideia e se arrependeu ___ ter dito não.", a: "…apaixonou-se <b>pela</b> ideia e se arrependeu <b>de</b> ter dito não." }] });
S.push({ type: "html", menu: "Parabéns!", final: true, html: `
  <div style="text-align:center;padding-top:5vh"><div style="font-size:100px;animation:bob 2s ease-in-out infinite">🏆</div><h1>Parabéns, turma!</h1>
  <p class="lead">Vocês expressaram desejos, usaram o subjuntivo, colocaram os pronomes no lugar e intensificaram as ideias.</p>
  <div class="card" style="display:inline-block;text-align:center;min-width:320px"><p style="margin:0;font-size:26px">Placar final</p><p class="fs" style="margin:6px 0 0;font-size:34px;font-weight:900"></p><p class="fw" style="margin:4px 0 0;color:var(--green);font-weight:800"></p></div></div>`,
  init(el) {
    el.querySelector(".fs").textContent = `Equipe A ${score[0]} × ${score[1]} Equipe B`;
    el.querySelector(".fw").textContent = score[0] === score[1] ? "Empate! 🤝" : (score[0] > score[1] ? "Vitória da Equipe A! 🎉" : "Vitória da Equipe B! 🎉");
    Sound.fanfare(); confetti(140);
  } });
S.push({ type: "credits", noFit: true, menu: "Referências e créditos", title: "Referências e créditos" });
