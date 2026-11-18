/* =====================================================================
   JOGOS · FORCA — escrito à mão (o motor vem de ferramentas/gerar_jogos.py).
   Cada slide "hangman" tem um banco { "Categoria": [["PALAVRA", "dica"], ...] }.
   Para criar uma categoria nova, acrescente uma linha ao banco que quiser.
   Espaços e hífens aparecem prontos; acentos e Ç contam como a letra sem acento.
   ===================================================================== */
const LESSON = {
  short: "Jogos · Forca",
  foot: "Jogos · Jogo da forca · Vocabulário por categorias",
  source: "Jogo da forca com bancos de palavras escritos para as turmas da Intercultura · Classes de Português (Heredia, Costa Rica). Dicas em português simples; categorias organizadas por nível.",
};
const I = n => "img/" + n + ".jpg";
const SH = {};
const S = [];

/* ---------------- Abertura ---------------- */
S.push({ type: "cover", main: true, icon: "🎯", num: "Jogos · Forca", subj: "Jogo da forca",
  gram: "Primeiras palavras · Dia a dia · Brasil", goal: "Revisar vocabulário em equipes, no quadro ou pelo celular.", menu: "Capa", sec: true });

S.push({ type: "html", menu: "Como jogar", html: `
<div class="kicker"><span>Intercultura · Português do Brasil</span><span>Jogos</span></div>
<h1>Como jogar</h1>
<div class="cols" style="align-items:start">
  <div class="card" style="font-size:clamp(18px,2vw,23px);line-height:1.55">
    <p>1️⃣ Divida a turma em <b>duas equipes</b>.</p>
    <p>2️⃣ Escolha o <b>banco de palavras</b> do nível da turma e uma <b>categoria</b> (ou 🎲 Todas).</p>
    <p>3️⃣ Cada equipe joga uma palavra por vez: diga letras até descobrir a palavra.</p>
    <p>4️⃣ A <b>dica</b> ajuda, mas custa 2 ❤️.</p>
    <p>5️⃣ Ganha a equipe com mais pontos no fim das rodadas.</p>
  </div>
  <div class="card" style="font-size:clamp(17px,1.8vw,21px);line-height:1.5">
    <p><b>📚 Os bancos</b></p>
    <p>🌱 <b>Primeiras palavras</b>: NAB1 · NAB2</p>
    <p>🏙️ <b>Dia a dia</b>: NAB2 · NAB3</p>
    <p>🇧🇷 <b>Brasil</b>: todos os níveis</p>
    <p style="margin-top:14px">📱 Com a <b>Sala</b>, a equipe da vez escolhe as letras pelo celular.</p>
  </div>
</div>` });

S.push({ type: "wheel", menu: "Roleta da turma", title: "🎡 Roleta da turma",
  lead: "Escreva os nomes dos alunos (um por linha) e gire para sortear quem começa. Quem entra pela 📱 Sala já aparece aqui." });

const LEAD = "Escolha uma categoria e descubra a palavra antes de o boneco ficar completo. As equipes se alternam: cada uma joga uma palavra.";

/* ---------------- Banco 1 · Primeiras palavras (NAB1 · NAB2) ---------------- */
S.push({ type: "cover", num: "Banco 1", subj: "Primeiras palavras", gram: "Animais · Frutas · Comidas e bebidas · Cores · Família · Corpo · Roupas · Casa · Profissões · Sala de aula",
  goal: "Para NAB1 e NAB2.", icon: "🌱", menu: "Banco 1 · Primeiras palavras", sec: true });
S.push({ type: "hangman", menu: "Forca · Primeiras palavras", title: "🌱 Forca: primeiras palavras", lead: LEAD, bank: {
  "Animais": [
    ["CACHORRO", "Late e é o melhor amigo do homem."], ["GATO", "Mia e gosta de dormir."], ["CAVALO", "Animal grande em que as pessoas montam."],
    ["VACA", "Dá leite na fazenda."], ["GALINHA", "Põe ovos."], ["PEIXE", "Vive na água e nada."], ["PÁSSARO", "Tem asas, penas e voa."],
    ["COELHO", "Tem orelhas grandes e come cenoura."], ["MACACO", "Sobe em árvores e come banana."], ["TARTARUGA", "Anda devagar e tem casco."],
    ["BORBOLETA", "Inseto de asas coloridas."], ["ELEFANTE", "Animal enorme com tromba."]],
  "Frutas": [
    ["BANANA", "Amarela e comprida; o macaco adora."], ["MAÇÃ", "Vermelha ou verde; a da Branca de Neve."], ["LARANJA", "Faz um suco muito comum no café da manhã."],
    ["ABACAXI", "Tem coroa e casca com espinhos."], ["MORANGO", "Pequeno, vermelho, com sementes por fora."], ["MELANCIA", "Grande, verde por fora e vermelha por dentro."],
    ["UVA", "Pequena, em cachos; vira vinho."], ["MANGA", "Amarela por dentro, com um caroço grande."], ["LIMÃO", "Verde e azedo; vai na caipirinha."],
    ["MAMÃO", "Laranja por dentro, com sementes pretas."], ["GOIABA", "Vira doce em barra no Brasil."], ["ABACATE", "Verde e cremoso; faz guacamole."]],
  "Comidas e bebidas": [
    ["ARROZ", "Grão branco que acompanha o feijão."], ["FEIJÃO", "Grão marrom ou preto do prato do dia."], ["PÃO", "Comida da padaria no café da manhã."],
    ["QUEIJO", "Feito de leite; amarelo ou branco."], ["OVO", "A galinha põe; pode ser frito ou cozido."], ["CAFÉ", "Bebida preta e quente da manhã."],
    ["SUCO", "Bebida feita de fruta."], ["LEITE", "Bebida branca que vem da vaca."], ["MANTEIGA", "Passamos no pão."],
    ["FRANGO", "Carne de galinha."], ["SALADA", "Prato de folhas e legumes."], ["SOBREMESA", "Doce que se come depois do almoço."]],
  "Cores": [
    ["VERMELHO", "A cor do morango."], ["AZUL", "A cor do céu sem nuvens."], ["AMARELO", "A cor da banana madura."],
    ["VERDE", "A cor das folhas."], ["PRETO", "A cor da noite."], ["BRANCO", "A cor da neve e do leite."],
    ["ROXO", "A cor da uva e do açaí."], ["ROSA", "Mistura de vermelho e branco."], ["CINZA", "Mistura de preto e branco."],
    ["MARROM", "A cor do chocolate."], ["DOURADO", "A cor do ouro."], ["LILÁS", "Um roxo bem claro."]],
  "Família": [
    ["MÃE", "Mulher que tem filhos."], ["PAI", "Homem que tem filhos."], ["IRMÃO", "Filho dos mesmos pais que você."],
    ["AVÓ", "A mãe da sua mãe ou do seu pai."], ["AVÔ", "O pai do seu pai ou da sua mãe."], ["TIO", "O irmão do seu pai ou da sua mãe."],
    ["PRIMO", "O filho do seu tio."], ["SOBRINHA", "A filha do seu irmão."], ["NETO", "O filho do seu filho."],
    ["MARIDO", "Homem casado, em relação à esposa."], ["ESPOSA", "Mulher casada, em relação ao marido."], ["SOGRA", "A mãe do marido ou da esposa."]],
  "Corpo humano": [
    ["CABEÇA", "Parte de cima do corpo."], ["OLHO", "Usamos para ver."], ["NARIZ", "Usamos para sentir cheiro."],
    ["BOCA", "Usamos para comer e falar."], ["ORELHA", "Usamos para ouvir."], ["BRAÇO", "Fica entre o ombro e a mão."],
    ["PERNA", "Usamos para andar."], ["JOELHO", "Fica no meio da perna."], ["OMBRO", "Fica entre o pescoço e o braço."],
    ["PESCOÇO", "Liga a cabeça ao corpo."], ["DEDO", "Temos cinco em cada mão."], ["CABELO", "Cresce na cabeça; pode ser liso ou cacheado."]],
  "Roupas e acessórios": [
    ["CAMISA", "Roupa com botões e gola."], ["CALÇA", "Roupa para as pernas, até os pés."], ["SAIA", "Roupa que cobre da cintura para baixo, sem pernas separadas."],
    ["VESTIDO", "Roupa inteira, de cima a baixo."], ["SAPATO", "Calçado fechado."], ["MEIA", "Usamos nos pés, dentro do sapato."],
    ["CASACO", "Roupa para o frio."], ["BONÉ", "Protege a cabeça do sol; tem aba."], ["CINTO", "Segura a calça na cintura."],
    ["BERMUDA", "Calça curta, até o joelho."], ["CHINELO", "Calçado aberto, de praia."], ["ÓCULOS", "Ajudam a ver melhor."]],
  "Casa": [
    ["COZINHA", "Onde se prepara a comida."], ["QUARTO", "Onde se dorme."], ["BANHEIRO", "Onde se toma banho."],
    ["SALA", "Onde a família vê televisão."], ["SOFÁ", "Assento grande e macio da sala."], ["CAMA", "Móvel para dormir."],
    ["GELADEIRA", "Mantém a comida fria."], ["FOGÃO", "Usamos para cozinhar."], ["MESA", "Móvel onde comemos."],
    ["CADEIRA", "Móvel para sentar."], ["JANELA", "Abertura na parede para entrar luz e ar."], ["ESPELHO", "Mostra o nosso reflexo."]],
  "Profissões": [
    ["MÉDICO", "Cuida da saúde das pessoas."], ["PROFESSOR", "Ensina na escola."], ["ENFERMEIRA", "Trabalha no hospital ajudando os pacientes."],
    ["COZINHEIRO", "Prepara comida num restaurante."], ["MOTORISTA", "Dirige ônibus, táxi ou caminhão."], ["ADVOGADO", "Defende pessoas na Justiça."],
    ["DENTISTA", "Cuida dos dentes."], ["BOMBEIRO", "Apaga incêndios."], ["GARÇOM", "Serve as mesas num restaurante."],
    ["PADEIRO", "Faz pão."], ["JORNALISTA", "Escreve notícias."], ["ENGENHEIRA", "Projeta pontes, prédios e máquinas."]],
  "Sala de aula": [
    ["CADERNO", "Onde escrevemos as lições."], ["LÁPIS", "Escreve e pode ser apagado."], ["CANETA", "Escreve com tinta."],
    ["BORRACHA", "Apaga o lápis."], ["MOCHILA", "Levamos o material nas costas."], ["QUADRO", "O professor escreve nele."],
    ["LIVRO", "Tem páginas para ler."], ["RÉGUA", "Mede e faz linhas retas."], ["TESOURA", "Corta papel."],
    ["DICIONÁRIO", "Livro com o significado das palavras."], ["APONTADOR", "Faz a ponta do lápis."], ["ESTOJO", "Guarda lápis e canetas."]],
} });

/* ---------------- Banco 2 · Dia a dia (NAB2 · NAB3) ---------------- */
S.push({ type: "cover", num: "Banco 2", subj: "Dia a dia", gram: "Cidade · Transportes · Tempo e clima · Esportes · Sentimentos · Rotina · Tecnologia · Saúde",
  goal: "Para NAB2 e NAB3.", icon: "🏙️", menu: "Banco 2 · Dia a dia", sec: true });
S.push({ type: "hangman", menu: "Forca · Dia a dia", title: "🏙️ Forca: dia a dia", lead: LEAD, bank: {
  "Lugares da cidade": [
    ["FARMÁCIA", "Onde se compra remédio."], ["PADARIA", "Onde se compra pão fresquinho."], ["SUPERMERCADO", "Onde se fazem as compras do mês."],
    ["HOSPITAL", "Onde os doentes são atendidos."], ["BANCO", "Onde se guarda e se tira dinheiro."], ["PRAÇA", "Lugar aberto com bancos e árvores."],
    ["CINEMA", "Onde se assiste a filmes."], ["MUSEU", "Onde se veem obras de arte e história."], ["BIBLIOTECA", "Onde se pegam livros emprestados."],
    ["RODOVIÁRIA", "De onde saem os ônibus para outras cidades."], ["AEROPORTO", "De onde saem os aviões."], ["PREFEITURA", "Sede do governo da cidade."]],
  "Transportes": [
    ["ÔNIBUS", "Leva muitos passageiros pela cidade."], ["METRÔ", "Trem que anda debaixo da terra."], ["BICICLETA", "Tem duas rodas e pedais."],
    ["AVIÃO", "Voa de um país para outro."], ["TREM", "Anda sobre trilhos."], ["NAVIO", "Barco muito grande que atravessa o mar."],
    ["MOTO", "Tem duas rodas e motor."], ["CAMINHÃO", "Leva cargas pesadas."], ["TÁXI", "Carro que leva passageiros e cobra pela corrida."],
    ["PATINETE", "Tem uma tábua, duas rodas e um guidão."], ["HELICÓPTERO", "Voa com hélices em cima."], ["BALSA", "Atravessa o rio levando carros e pessoas."]],
  "Tempo e clima": [
    ["CHUVA", "Água que cai das nuvens."], ["NUVEM", "Fica no céu e pode trazer chuva."], ["VENTO", "Ar em movimento."],
    ["TROVÃO", "Barulho forte durante a tempestade."], ["RELÂMPAGO", "Luz forte no céu durante a tempestade."], ["NEBLINA", "Nuvem baixa que não deixa ver longe."],
    ["GEADA", "Gelo fino na grama em manhãs muito frias."], ["CALOR", "Temperatura alta."], ["GAROA", "Chuva fininha."],
    ["TEMPESTADE", "Chuva forte com vento e trovões."], ["ARCO-ÍRIS", "Aparece no céu com sete cores."], ["UMIDADE", "Quantidade de água no ar."]],
  "Esportes": [
    ["FUTEBOL", "O esporte mais popular do Brasil."], ["VÔLEI", "Jogado com rede e as mãos."], ["NATAÇÃO", "Esporte na piscina."],
    ["CAPOEIRA", "Luta e dança brasileira com berimbau."], ["BASQUETE", "A bola entra numa cesta."], ["CICLISMO", "Esporte de bicicleta."],
    ["SURFE", "Esporte nas ondas do mar."], ["TÊNIS", "Jogado com raquete e bolinha amarela."], ["JUDÔ", "Luta japonesa com faixas coloridas."],
    ["CORRIDA", "Esporte de correr; a maratona é um tipo."], ["SKATE", "Tábua com quatro rodinhas."], ["XADREZ", "Jogo de tabuleiro com rei e rainha."]],
  "Sentimentos": [
    ["ALEGRIA", "Sentimento de quem está feliz."], ["TRISTEZA", "Sentimento de quem chora."], ["MEDO", "Sentimos diante do perigo."],
    ["RAIVA", "Sentimento de quem está bravo."], ["SAUDADE", "Falta de alguém ou de um lugar querido."], ["CIÚME", "Medo de perder a atenção de quem se ama."],
    ["VERGONHA", "Deixa o rosto vermelho."], ["ORGULHO", "Satisfação com o que se conseguiu."], ["CALMA", "Tranquilidade, sem pressa nem nervoso."],
    ["ANSIEDADE", "Nervoso antes de algo importante."], ["SURPRESA", "Sentimos com algo que não esperávamos."], ["PREGUIÇA", "Falta de vontade de fazer as coisas."]],
  "Rotina": [
    ["ACORDAR", "Primeira coisa que fazemos de manhã."], ["ESCOVAR OS DENTES", "Fazemos depois de comer."], ["TOMAR BANHO", "Fazemos com água e sabonete."],
    ["ALMOÇAR", "Comer ao meio-dia."], ["TRABALHAR", "Fazer o seu serviço."], ["ESTUDAR", "Ler e fazer exercícios para aprender."],
    ["COZINHAR", "Preparar a comida."], ["LIMPAR", "Deixar a casa sem sujeira."], ["PASSEAR", "Sair para se divertir."],
    ["DESCANSAR", "Parar um pouco depois de trabalhar."], ["JANTAR", "Comer à noite."], ["DORMIR", "Última coisa do dia."]],
  "Tecnologia": [
    ["CELULAR", "Telefone que levamos no bolso."], ["COMPUTADOR", "Máquina para trabalhar, estudar e navegar."], ["SENHA", "Código secreto para entrar numa conta."],
    ["APLICATIVO", "Programa que instalamos no celular."], ["TECLADO", "Tem as letras para digitar."], ["FONE DE OUVIDO", "Para ouvir música sem incomodar ninguém."],
    ["CARREGADOR", "Recarrega a bateria."], ["TELA", "Parte do celular que mostra as imagens."], ["BATERIA", "Dá energia ao celular."],
    ["IMPRESSORA", "Passa o documento para o papel."], ["MENSAGEM", "Texto que mandamos pelo celular."], ["INTERNET", "Rede que liga computadores do mundo todo."]],
  "Saúde": [
    ["FEBRE", "Temperatura do corpo alta."], ["GRIPE", "Doença com nariz escorrendo e cansaço."], ["TOSSE", "Faz barulho quando a garganta está irritada."],
    ["REMÉDIO", "Compramos na farmácia para melhorar."], ["RECEITA", "Papel do médico com o remédio certo."], ["CONSULTA", "Encontro marcado com o médico."],
    ["VACINA", "Protege contra doenças; às vezes é uma injeção."], ["DOR DE CABEÇA", "Problema que um analgésico costuma aliviar."], ["CURATIVO", "Protege um machucado."],
    ["TERMÔMETRO", "Mede a temperatura."], ["ALERGIA", "Reação do corpo a pólen, poeira ou comida."], ["PLANTÃO", "Turno do médico ou da farmácia à noite e no fim de semana."]],
} });

/* ---------------- Banco 3 · Brasil (todos os níveis) ---------------- */
S.push({ type: "cover", num: "Banco 3", subj: "Brasil", gram: "Estados · Capitais · Comidas típicas · Animais · Música e festas · Natureza",
  goal: "Para todos os níveis; os mais avançados explicam cada palavra.", icon: "🇧🇷", menu: "Banco 3 · Brasil", sec: true });
S.push({ type: "hangman", menu: "Forca · Brasil", title: "🇧🇷 Forca: Brasil", lead: LEAD, bank: {
  "Estados": [
    ["BAHIA", "Capital: Salvador."], ["PERNAMBUCO", "Capital: Recife."], ["AMAZONAS", "Capital: Manaus."],
    ["PARANÁ", "Capital: Curitiba."], ["GOIÁS", "Capital: Goiânia."], ["CEARÁ", "Capital: Fortaleza."],
    ["MARANHÃO", "Capital: São Luís."], ["TOCANTINS", "Capital: Palmas."], ["RONDÔNIA", "Capital: Porto Velho."],
    ["SERGIPE", "Capital: Aracaju; o menor estado."], ["ALAGOAS", "Capital: Maceió."], ["PIAUÍ", "Capital: Teresina."]],
  "Capitais": [
    ["SALVADOR", "Capital da Bahia."], ["RECIFE", "Capital de Pernambuco."], ["MANAUS", "Capital do Amazonas."],
    ["CURITIBA", "Capital do Paraná."], ["FORTALEZA", "Capital do Ceará."], ["BELÉM", "Capital do Pará."],
    ["BRASÍLIA", "Capital do Brasil."], ["FLORIANÓPOLIS", "Capital de Santa Catarina, numa ilha."], ["PORTO ALEGRE", "Capital do Rio Grande do Sul."],
    ["GOIÂNIA", "Capital de Goiás."], ["NATAL", "Capital do Rio Grande do Norte."], ["CUIABÁ", "Capital de Mato Grosso."]],
  "Comidas típicas": [
    ["FEIJOADA", "Feijão preto com carnes de porco."], ["BRIGADEIRO", "Docinho de chocolate de festa de aniversário."], ["COXINHA", "Salgado frito recheado de frango."],
    ["PÃO DE QUEIJO", "Bolinha de polvilho e queijo de Minas Gerais."], ["AÇAÍ", "Fruta roxa da Amazônia, servida gelada."], ["TAPIOCA", "Disco de goma de mandioca com recheio."],
    ["MOQUECA", "Peixe cozido com leite de coco e dendê."], ["ACARAJÉ", "Bolinho de feijão frito no dendê, da Bahia."], ["PAÇOCA", "Doce de amendoim das festas juninas."],
    ["FAROFA", "Farinha de mandioca torrada com manteiga."], ["PASTEL", "Massa frita recheada, vendida na feira."], ["QUINDIM", "Doce amarelo de gema e coco."]],
  "Animais do Brasil": [
    ["ONÇA-PINTADA", "O maior felino das Américas."], ["ARARA", "Ave colorida que fala alto."], ["TUCANO", "Ave de bico grande e colorido."],
    ["CAPIVARA", "O maior roedor do mundo."], ["BOTO", "Golfinho rosa dos rios da Amazônia."], ["JACARÉ", "Réptil do Pantanal com muitos dentes."],
    ["TAMANDUÁ", "Come formigas com a língua comprida."], ["BICHO-PREGUIÇA", "Vive nas árvores e se move bem devagar."], ["MICO-LEÃO-DOURADO", "Macaquinho laranja da Mata Atlântica."],
    ["LOBO-GUARÁ", "Lobo de pernas compridas do Cerrado."], ["TATU", "Tem casca dura e cava buracos."], ["PIRARUCU", "Um dos maiores peixes de rio do mundo."]],
  "Música e festas": [
    ["SAMBA", "Ritmo do Carnaval do Rio."], ["FORRÓ", "Dança a dois do Nordeste, com sanfona."], ["FREVO", "Dança de Pernambuco com sombrinha colorida."],
    ["BOSSA NOVA", "Estilo de Tom Jobim e João Gilberto."], ["CARNAVAL", "A maior festa popular do Brasil."], ["PANDEIRO", "Instrumento redondo com platinelas."],
    ["CAVAQUINHO", "Violão pequeno de quatro cordas."], ["BERIMBAU", "Instrumento de um arco só, da capoeira."], ["FESTA JUNINA", "Festa de junho com fogueira e quadrilha."],
    ["QUADRILHA", "Dança da festa junina."], ["MARACATU", "Cortejo com tambores de Pernambuco."], ["CHORINHO", "Música instrumental do Rio, com flauta e cavaquinho."]],
  "Natureza": [
    ["AMAZÔNIA", "A maior floresta tropical do mundo."], ["PANTANAL", "Grande área alagada de Mato Grosso e Mato Grosso do Sul."], ["CERRADO", "Savana do centro do Brasil."],
    ["CAATINGA", "Vegetação seca do sertão nordestino."], ["MATA ATLÂNTICA", "Floresta da costa brasileira."], ["PAMPA", "Campos do sul do Brasil."],
    ["CACHOEIRA", "Água do rio caindo de uma altura."], ["PRAIA", "Areia à beira do mar."], ["MANGUE", "Vegetação onde o rio encontra o mar."],
    ["CHAPADA", "Planalto com paredões; a Diamantina fica na Bahia."], ["CATARATAS", "As do Iguaçu ficam no Paraná."], ["LENÇÓIS MARANHENSES", "Dunas brancas com lagoas no Maranhão."]],
} });

S.push({ type: "credits", noFit: true, menu: "Referências e créditos", title: "Referências e créditos" });
