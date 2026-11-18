/* =====================================================================
   JOGOS · VERDADEIRO OU FALSO — escrito à mão (o motor vem de ferramentas/gerar_jogos.py).
   Cada categoria é um slide "mc" com afirmações. vf(frase, verdadeira?, explicação).
   Para criar uma categoria nova, copie um bloco cat(...) e troque as frases.
   ===================================================================== */
const LESSON = {
  short: "Jogos · Verdadeiro ou falso",
  foot: "Jogos · Verdadeiro ou falso · Brasil e língua portuguesa",
  source: "Afirmações escritas para as turmas da Intercultura · Classes de Português (Heredia, Costa Rica), organizadas por categoria e nível. Cada resposta traz uma explicação curta.",
};
const I = n => "img/" + n + ".jpg";
const SH = {};
const S = [];
const OPC = ["✅ Verdadeiro", "❌ Falso"];
const vf = (q, v, c) => ({ q, o: OPC, a: v ? 0 : 1, c, vf: true });
const LEAD = "Leia a frase em voz alta. A equipe da vez decide: verdadeiro ou falso? Depois, corrijam juntos as frases falsas.";
const cat = (title, menu, items) => S.push({ type: "mc", title, menu, lead: LEAD, items, rule: "Acertou = 3 pontos · errou = 0 (uma chance só)" });
const banco = (num, subj, gram, goal, icon) => S.push({ type: "cover", num, subj, gram, goal, icon, menu: num + " · " + subj, sec: true });

/* ---------------- Abertura ---------------- */
S.push({ type: "cover", main: true, icon: "✅", num: "Jogos · Verdadeiro ou falso", subj: "Verdadeiro ou falso?",
  gram: "Brasil · Língua portuguesa · Expressões", goal: "Discutir, justificar e corrigir frases em equipes, no quadro ou pelo celular.", menu: "Capa", sec: true });

S.push({ type: "html", menu: "Como jogar", html: `
<div class="kicker"><span>Intercultura · Português do Brasil</span><span>Jogos</span></div>
<h1>Como jogar</h1>
<div class="cols" style="align-items:start">
  <div class="card" style="font-size:clamp(18px,2vw,23px);line-height:1.55">
    <p>1️⃣ Divida a turma em <b>duas equipes</b>.</p>
    <p>2️⃣ Escolha a <b>categoria</b> pelo nível da turma.</p>
    <p>3️⃣ Uma pessoa lê a frase em voz alta. A equipe conversa e responde: <b>verdadeiro</b> ou <b>falso</b>?</p>
    <p>4️⃣ Uma chance só: acertou, <b>3 pontos</b>; errou, <b>0</b>. Depois de cada resposta aparece uma explicação.</p>
    <p>5️⃣ Desafio extra: se a frase for falsa, a equipe <b>corrige</b> a frase e ganha um ponto a mais.</p>
  </div>
  <div class="card" style="font-size:clamp(17px,1.8vw,21px);line-height:1.5">
    <p><b>📚 As categorias</b></p>
    <p>🇧🇷 <b>Brasil</b>: geografia · cultura e costumes (todos os níveis)</p>
    <p>📘 <b>Língua portuguesa</b>: gramática básica (NAB1–NAB2) · falsos amigos (todos) · gramática intermediária (NAB3)</p>
    <p>💬 <b>Expressões</b>: expressões idiomáticas (VIA Brasil)</p>
    <p style="margin-top:14px">📱 Com a <b>Sala</b>, a equipe da vez responde pelo celular.</p>
  </div>
</div>` });

S.push({ type: "wheel", menu: "Roleta da turma", title: "🎡 Roleta da turma",
  lead: "Escreva os nomes dos alunos (um por linha) e gire para sortear quem lê a frase. Quem entra pela 📱 Sala já aparece aqui." });

/* ---------------- Banco 1 · Brasil ---------------- */
banco("Banco 1", "Brasil", "Geografia · Cultura e costumes", "Para todos os níveis.", "🇧🇷");
cat("🗺️ Geografia do Brasil", "V ou F · Geografia do Brasil", [
  vf("O Brasil é o maior país da América do Sul.", true, "O Brasil ocupa quase metade da América do Sul."),
  vf("A capital do Brasil é o Rio de Janeiro.", false, "A capital é Brasília, desde 1960. O Rio de Janeiro foi capital antes."),
  vf("O Brasil tem 26 estados e o Distrito Federal.", true, "São 26 estados e o Distrito Federal, onde fica Brasília."),
  vf("A língua oficial do Brasil é o espanhol.", false, "A língua oficial do Brasil é o português."),
  vf("A Floresta Amazônica fica só no Brasil.", false, "A maior parte fica no Brasil, mas a floresta também está em outros países, como Peru e Colômbia."),
  vf("O Rio Amazonas é um dos maiores rios do mundo.", true, "É o rio com mais água do mundo."),
  vf("O Brasil faz fronteira com o Chile.", false, "O Brasil faz fronteira com quase todos os países da América do Sul, menos o Chile e o Equador."),
  vf("As Cataratas do Iguaçu ficam na fronteira entre o Brasil e a Argentina.", true, "Ficam no estado do Paraná, na fronteira com a Argentina."),
  vf("São Paulo é a cidade com mais habitantes do Brasil.", true, "São Paulo é a maior cidade do Brasil."),
  vf("O Pantanal é uma região muito seca, como um deserto.", false, "O Pantanal é uma das maiores áreas alagadas do mundo."),
]);
cat("🎉 Cultura e costumes", "V ou F · Cultura e costumes", [
  vf("O Carnaval acontece em dezembro.", false, "O Carnaval acontece em fevereiro ou em março."),
  vf("A feijoada é feita com feijão preto.", true, "A feijoada leva feijão preto e carnes de porco."),
  vf("No Brasil, é comum cumprimentar os amigos com beijo no rosto.", true, "Em muitas regiões, as pessoas dão um ou dois beijinhos no rosto."),
  vf("A capoeira mistura luta, dança e música.", true, "A capoeira é jogada numa roda, com berimbau e pandeiro."),
  vf("O pão de queijo é típico de Minas Gerais.", true, "É feito com polvilho e queijo; é um símbolo da cozinha mineira."),
  vf("As festas juninas acontecem em dezembro.", false, "As festas juninas acontecem em junho, com fogueira, quadrilha e comidas de milho."),
  vf("O futebol é pouco popular no Brasil.", false, "O futebol é o esporte mais popular do Brasil."),
  vf("Oferecer um cafezinho é um gesto de hospitalidade.", true, "É comum oferecer café a quem chega em casa ou no trabalho."),
  vf("O Dia da Independência do Brasil é 7 de setembro.", true, "A Independência do Brasil foi em 7 de setembro de 1822."),
  vf("No Brasil, o almoço costuma ser a refeição mais leve do dia.", false, "Para muitas pessoas, o almoço é a refeição principal, com arroz, feijão, carne e salada."),
]);

/* ---------------- Banco 2 · Língua portuguesa ---------------- */
banco("Banco 2", "Língua portuguesa", "Gramática básica · Falsos amigos · Gramática intermediária", "Gramática básica: NAB1–NAB2 · Falsos amigos: todos · Intermediária: NAB3.", "📘");
cat("🌱 Gramática básica", "V ou F · Gramática básica (NAB1–NAB2)", [
  vf("Em “Eu sou da Costa Rica” e “Eu estou cansado”, usamos dois verbos diferentes.", true, "Usamos ser para a origem e estar para um estado passageiro."),
  vf("O plural de “pão” é “pãos”.", false, "O plural de pão é pães."),
  vf("“Problema” é uma palavra masculina: o problema.", true, "Termina em -a, mas é masculina: o problema, o mapa, o dia."),
  vf("“Mão” é uma palavra masculina: o mão.", false, "Mão é feminina: a mão."),
  vf("No Brasil, muitas pessoas usam “você” no lugar de “tu”.", true, "Em grande parte do Brasil, você é a forma mais comum."),
  vf("O passado de “eu faço” é “eu fazi”.", false, "O passado de eu faço é eu fiz."),
  vf("Para falar da idade, dizemos “Eu tenho 25 anos”.", true, "Em português usamos o verbo ter para a idade."),
  vf("“Bom dia” é um cumprimento para a noite.", false, "À noite dizemos boa noite. Bom dia é para a manhã."),
  vf("“Sorvete” é o mesmo que “helado”.", true, "Sorvete é a palavra brasileira para helado."),
  vf("“Obrigado” muda para “obrigada” quando quem fala é uma mulher.", true, "Quem agradece concorda com o próprio gênero: ele diz obrigado, ela diz obrigada."),
]);
cat("🪤 Falsos amigos", "V ou F · Falsos amigos (português × espanhol)", [
  vf("Em português, “esquisito” quer dizer “delicioso”.", false, "Esquisito quer dizer estranho. Para comida boa, dizemos gostoso ou delicioso."),
  vf("Em português, “polvo” é um animal do mar.", true, "Polvo é o animal de oito braços. O polvo do espanhol, em português, é pó."),
  vf("Em português, “escritório” é um móvel para escrever.", false, "Escritório é o lugar onde se trabalha (oficina, em espanhol)."),
  vf("Em português, “oficina” é o lugar onde se consertam carros.", true, "Oficina é o lugar de conserto. O lugar de trabalho é o escritório."),
  vf("Em português, “cena” é a refeição da noite.", false, "A refeição da noite é o jantar. Cena é uma parte de um filme ou de uma peça."),
  vf("Em português, “borracha” é uma pessoa que bebeu demais.", false, "Borracha é o objeto que apaga o lápis. Quem bebeu demais está bêbado."),
  vf("Em português, “apelido” é o sobrenome.", false, "Apelido é o nome carinhoso (apodo). O apellido do espanhol é o sobrenome."),
  vf("Em português, “largo” pode significar “ancho”.", true, "Uma rua larga é uma rua ancha. O largo do espanhol, em português, é comprido."),
  vf("Em português, “pelado” quer dizer “sem cabelo”.", false, "Pelado quer dizer sem roupa. Quem não tem cabelo é careca."),
  vf("Em português, “embaraçado” pode significar “com vergonha”.", true, "Embaraçado é envergonhado ou constrangido. Embarazada, em português, é grávida."),
]);
cat("🌿 Gramática intermediária", "V ou F · Gramática intermediária (NAB3)", [
  vf("Depois de “espero que”, usamos o subjuntivo: Espero que você venha.", true, "Desejos e esperanças pedem o subjuntivo."),
  vf("A frase “Embora ele está cansado, vai trabalhar” está correta.", false, "Embora pede o subjuntivo: Embora ele esteja cansado, vai trabalhar."),
  vf("Em “Se eu tivesse tempo, viajaria”, “tivesse” está no imperfeito do subjuntivo.", true, "Hipóteses com se usam o imperfeito do subjuntivo e o futuro do pretérito."),
  vf("O particípio de “abrir” é “abrido”.", false, "O particípio de abrir é aberto: A loja está aberta."),
  vf("Em “Quando eu puder, vou te visitar”, “puder” está no futuro do subjuntivo.", true, "Quando, se e assim que, falando do futuro, pedem o futuro do subjuntivo."),
  vf("Depois de “tomara que”, usamos o indicativo: Tomara que chove.", false, "Tomara que pede o subjuntivo: Tomara que chova."),
  vf("Para comparar, dizemos “mais bom”.", false, "Dizemos melhor: Este café é melhor que aquele."),
  vf("“Cujo” indica posse: o aluno cujo livro sumiu.", true, "Cujo liga o dono à coisa e concorda com a coisa: cuja casa, cujos livros."),
  vf("“Vou fazer” e “farei” falam do futuro.", true, "Ir + infinitivo é mais comum na fala; o futuro simples é mais formal."),
  vf("A frase “Fazem dois anos que moro aqui” segue a norma padrão.", false, "Para tempo decorrido, fazer fica no singular: Faz dois anos que moro aqui."),
]);

/* ---------------- Banco 3 · Expressões (VIA Brasil) ---------------- */
banco("Banco 3", "Expressões", "Expressões idiomáticas do português do Brasil", "Para VIA Brasil.", "💬");
cat("💬 Expressões idiomáticas", "V ou F · Expressões idiomáticas (VIA)", [
  vf("“Mão de vaca” é uma pessoa generosa.", false, "Mão de vaca é uma pessoa avarenta, que não gosta de gastar. A generosa é mão aberta."),
  vf("“Pisar em ovos” é agir com muito cuidado.", true, "Usamos quando o assunto é delicado."),
  vf("“Engolir sapo” é comer uma comida estranha.", false, "Engolir sapo é aceitar algo desagradável sem reclamar."),
  vf("“Pé-frio” é uma pessoa que dá azar.", true, "O contrário é pé-quente, quem dá sorte."),
  vf("“Ficar de queixo caído” é ficar muito surpreso.", true, "Usamos quando algo nos impressiona muito."),
  vf("“Chutar o balde” é jogar futebol.", false, "Chutar o balde é perder a paciência ou desistir de tudo."),
  vf("“Pagar o pato” é sofrer as consequências do que outra pessoa fez.", true, "Ex.: Ele quebrou o vaso, mas quem pagou o pato fui eu."),
  vf("“Estar com a pulga atrás da orelha” é estar desconfiado.", true, "Usamos quando suspeitamos de alguma coisa."),
  vf("“Pra inglês ver” é algo feito para turistas da Inglaterra.", false, "Pra inglês ver é algo feito só para manter as aparências."),
  vf("“Encher linguiça” é falar ou escrever muito sem dizer nada importante.", true, "Ex.: A redação era curta, então ele encheu linguiça."),
]);

S.push({ type: "credits", noFit: true, menu: "Referências e créditos", title: "Referências e créditos" });
