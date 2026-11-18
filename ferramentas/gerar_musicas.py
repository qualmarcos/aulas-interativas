"""Monta papo-musica/musicas.js: músicas brasileiras famosas no exterior + prévia de 30 s do iTunes.
Busca cada música na API pública do iTunes (loja BR) e guarda trackId, prévia, capa e link.
Uso: python3 ferramentas/gerar_musicas.py   (a API aceita ~20 buscas/min; o script espera entre elas)
Para acrescentar uma música: coloque uma linha em MUSICAS e rode de novo (as já encontradas ficam em cache)."""
import json, re, time, unicodedata, urllib.request, urllib.parse
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
OUT = REPO / "papo-musica" / "musicas.js"
CACHE = REPO / "ferramentas" / "musicas_itunes_cache.json"

# [título, artista (como no iTunes), ano original, categoria, curiosidade]
MUSICAS = [
  # ---- Bossa nova ----
  ["Garota de Ipanema", "Tom Jobim", 1962, "bossa", "Uma das músicas mais gravadas do mundo. A versão “The Girl from Ipanema”, com Astrud Gilberto e Stan Getz, ganhou o Grammy de gravação do ano em 1965."],
  ["Chega de Saudade", "João Gilberto", 1958, "bossa", "A gravação de João Gilberto, de 1958, é considerada o marco inicial da bossa nova."],
  ["Desafinado", "João Gilberto", 1959, "bossa", "A versão instrumental de Stan Getz e Charlie Byrd, de 1962, levou a bossa nova às paradas dos Estados Unidos."],
  ["Águas de Março", "Elis Regina", 1974, "bossa", "O dueto de Elis Regina e Tom Jobim é famoso no mundo todo; a música já foi eleita a maior canção brasileira de todos os tempos."],
  ["Corcovado", "João Gilberto", 1960, "bossa", "Em inglês ficou conhecida como “Quiet Nights of Quiet Stars” e foi gravada por Frank Sinatra."],
  ["Samba de Verão", "Marcos Valle", 1964, "bossa", "Em inglês virou “Summer Samba” e foi gravada por dezenas de artistas americanos."],
  ["Manhã de Carnaval", "Luiz Bonfá", 1959, "bossa", "Tema do filme “Orfeu Negro”, que ganhou o Oscar; é um dos standards de jazz mais tocados."],
  ["Samba de Uma Nota Só", "Tom Jobim", 1960, "bossa", "“One Note Samba”: a melodia brinca com a ideia de ficar quase toda numa nota só."],
  ["A Felicidade", "João Gilberto", 1959, "bossa", "Composta por Tom Jobim e Vinicius de Moraes para o filme “Orfeu Negro”."],
  ["Samba da Bênção", "Bebel Gilberto", 2000, "bossa", "Bebel, filha de João Gilberto, levou essa música de Baden Powell e Vinicius às pistas do mundo com o disco “Tanto Tempo”."],
  ["Berimbau", "Baden Powell", 1963, "bossa", "Baden Powell misturou o violão da bossa nova com ritmos afro-baianos, como o da capoeira."],
  ["Mas Que Nada", "Sérgio Mendes & Brasil '66", 1966, "bossa", "Composta por Jorge Ben, virou sucesso mundial com Sérgio Mendes; em 2006 ganhou nova versão com o Black Eyed Peas."],
  ["Wave", "Tom Jobim", 1967, "bossa", "Um dos maiores clássicos de Tom Jobim, gravado por Frank Sinatra, Ella Fitzgerald e muitos outros."],

  # ---- Samba e choro ----
  ["Aquarela do Brasil", "Gal Costa", 1939, "samba", "Composta por Ary Barroso, ficou famosa no mundo com o desenho “Alô, Amigos” (1942), da Disney, e deu nome ao filme “Brazil” (1985)."],
  ["Mas Que Nada", "Jorge Ben", 1963, "samba", "A gravação original de Jorge Ben, no primeiro disco dele; depois a música rodou o mundo."],
  ["País Tropical", "Jorge Ben", 1969, "samba", "Virou um hino de orgulho brasileiro e foi gravada também por Wilson Simonal e Gal Costa."],
  ["Taj Mahal", "Jorge Ben", 1972, "samba", "A melodia apareceu em “Da Ya Think I'm Sexy?”, de Rod Stewart (1978). Jorge Ben foi à justiça e o caso terminou num acordo."],
  ["Trem das Onze", "Demônios da Garoa", 1964, "samba", "Composta por Adoniran Barbosa, é o clássico do samba paulista, cantado em bares até hoje."],
  ["Carinhoso", "Marisa Monte", 1937, "samba", "Composta por Pixinguinha e com letra de João de Barro; é um dos chorinhos mais amados do Brasil."],
  ["As Rosas Não Falam", "Cartola", 1976, "samba", "Cartola, um dos maiores sambistas da Mangueira, só gravou o primeiro disco aos 66 anos."],
  ["O Mundo É um Moinho", "Cartola", 1976, "samba", "Uma das letras mais bonitas do samba, regravada por muitos artistas no Brasil e fora dele."],
  ["Deixa a Vida Me Levar", "Zeca Pagodinho", 2002, "samba", "Virou o hino da seleção brasileira campeã da Copa do Mundo de 2002."],
  ["A Banda", "Chico Buarque", 1966, "samba", "Venceu o Festival da Música Popular Brasileira de 1966 e foi gravada em vários idiomas."],
  ["Canto de Ossanha", "Baden Powell", 1966, "samba", "Faz parte dos “Afro-sambas”, de Baden Powell e Vinicius, que misturam samba e religiões afro-brasileiras."],
  ["Brasil Pandeiro", "Novos Baianos", 1972, "samba", "O disco “Acabou Chorare”, dos Novos Baianos, já foi eleito o melhor álbum brasileiro de todos os tempos."],
  ["Tico-Tico no Fubá", "Carmen Miranda", 1917, "samba", "Choro de Zequinha de Abreu que Carmen Miranda cantou em Hollywood; é tocado no mundo todo."],
  ["O Que É Que a Baiana Tem?", "Carmen Miranda", 1939, "samba", "Composta por Dorival Caymmi. Foi com essa música e a roupa de baiana que Carmen Miranda virou estrela internacional."],
  ["Mamãe Eu Quero", "Carmen Miranda", 1937, "samba", "Marchinha de Carnaval que Carmen Miranda levou ao cinema americano; até hoje toca nos bailes."],

  # ---- MPB e Tropicália ----
  ["Construção", "Chico Buarque", 1971, "mpb", "Todos os versos terminam em palavras proparoxítonas; é considerada uma das letras mais geniais da língua portuguesa."],
  ["Cotidiano", "Chico Buarque", 1971, "mpb", "Descreve a rotina de um casal; é perfeita para praticar o presente do indicativo."],
  ["O Leãozinho", "Caetano Veloso", 1977, "mpb", "Uma das canções mais doces de Caetano, regravada em vários países."],
  ["Sozinho", "Caetano Veloso", 1998, "mpb", "Composta por Peninha, foi o maior sucesso de vendas da carreira de Caetano."],
  ["Tropicália", "Caetano Veloso", 1968, "mpb", "Deu nome ao movimento tropicalista, que misturou rock, MPB e cultura popular."],
  ["Baby", "Gal Costa", 1969, "mpb", "Composta por Caetano para a Tropicália; a voz de Gal ficou conhecida no mundo todo."],
  ["Panis et Circenses", "Os Mutantes", 1968, "mpb", "Os Mutantes foram redescobertos nos anos 90 por músicos como Kurt Cobain e Beck."],
  ["A Minha Menina", "Os Mutantes", 1968, "mpb", "Composta por Jorge Ben; tocou em séries e comerciais fora do Brasil."],
  ["Aquele Abraço", "Gilberto Gil", 1969, "mpb", "Gil gravou essa despedida do Rio pouco antes de ser exilado pela ditadura."],
  ["Expresso 2222", "Gilberto Gil", 1972, "mpb", "Gravada na volta do exílio em Londres, mistura forró, rock e baião."],
  ["Andar com Fé", "Gilberto Gil", 1982, "mpb", "Uma das músicas mais otimistas de Gil, cantada em shows no mundo todo."],
  ["Maria Maria", "Milton Nascimento", 1978, "mpb", "Hino sobre a força das mulheres; Milton gravou com o saxofonista americano Wayne Shorter no disco “Native Dancer” (1975)."],
  ["Travessia", "Milton Nascimento", 1967, "mpb", "Lançou Milton no Festival Internacional da Canção de 1967 e abriu as portas para a carreira internacional."],
  ["O Bêbado e a Equilibrista", "Elis Regina", 1979, "mpb", "Virou o hino da anistia aos exilados políticos no fim da ditadura."],
  ["Como Nossos Pais", "Elis Regina", 1976, "mpb", "Composta por Belchior, fala do conflito entre gerações."],
  ["Lança Perfume", "Rita Lee", 1980, "mpb", "Fez sucesso em vários países; Rita Lee é chamada de “rainha do rock brasileiro”."],
  ["Mania de Você", "Rita Lee", 1979, "mpb", "Uma das canções de amor mais tocadas no Brasil."],
  ["Oceano", "Djavan", 1989, "mpb", "Djavan foi gravado por Carmen McRae e Manhattan Transfer, e Stevie Wonder tocou gaita em “Samurai”."],
  ["Flor de Lis", "Djavan", 1976, "mpb", "O primeiro grande sucesso de Djavan, com o jeito único dele de dividir as palavras."],
  ["Velha Infância", "Tribalistas", 2002, "mpb", "O disco dos Tribalistas (Marisa Monte, Arnaldo Antunes e Carlinhos Brown) fez sucesso na Europa e na América Latina."],
  ["Já Sei Namorar", "Tribalistas", 2002, "mpb", "Tocou muito fora do Brasil, principalmente em Portugal e na América Latina."],
  ["Amor I Love You", "Marisa Monte", 2000, "mpb", "Tem um trecho declamado por Arnaldo Antunes de um texto de Eça de Queiroz."],
  ["Explode Coração", "Maria Bethânia", 1979, "mpb", "Composta por Gonzaguinha, é um dos grandes sucessos de Bethânia, irmã de Caetano Veloso."],
  ["Sangue Latino", "Secos & Molhados", 1973, "mpb", "O grupo de Ney Matogrosso chocou o Brasil com maquiagem e figurinos ousados."],
  ["Pra Não Dizer Que Não Falei das Flores", "Geraldo Vandré", 1968, "mpb", "Virou hino contra a ditadura e foi proibida pela censura."],
  ["Carolina", "Seu Jorge", 2001, "mpb", "Seu Jorge ficou famoso no exterior também como ator em “Cidade de Deus”."],
  ["Life On Mars?", "Seu Jorge", 2004, "mpb", "Seu Jorge gravou músicas de David Bowie em português para o filme “A Vida Marinha com Steve Zissou”, e Bowie elogiou as versões."],
  ["Meu Bem, Meu Mal", "Gal Costa", 1981, "mpb", "Composta por Caetano Veloso, mostra a delicadeza da voz de Gal."],

  # ---- Rock brasileiro ----
  ["Meu Erro", "Os Paralamas do Sucesso", 1984, "rock", "Os Paralamas são ídolos na Argentina e em vários países latinos, onde gravaram também em espanhol."],
  ["Lanterna dos Afogados", "Os Paralamas do Sucesso", 1989, "rock", "Uma das baladas mais conhecidas do rock brasileiro."],
  ["Óculos", "Os Paralamas do Sucesso", 1984, "rock", "Sucesso dos anos 80 que mostra o humor de Herbert Vianna."],
  ["Exagerado", "Cazuza", 1985, "rock", "O título virou apelido de Cazuza, que viveu tudo intensamente."],
  ["Pro Dia Nascer Feliz", "Barão Vermelho", 1983, "rock", "Hino da juventude dos anos 80; deu nome a um documentário sobre escolas."],
  ["Eduardo e Mônica", "Legião Urbana", 1986, "rock", "Conta a história de um casal muito diferente; depois virou filme."],
  ["Tempo Perdido", "Legião Urbana", 1986, "rock", "Uma das músicas mais cantadas do rock nacional, com o famoso refrão sobre ser jovem."],
  ["Pais e Filhos", "Legião Urbana", 1989, "rock", "Fala da relação entre pais e filhos; muito usada em aulas e debates."],
  ["Que País É Este", "Legião Urbana", 1987, "rock", "Crítica política escrita nos anos 70 e lançada só em 1987."],
  ["Garota Nacional", "Skank", 1996, "rock", "Fez sucesso na Espanha e em vários países da América Latina."],
  ["É uma Partida de Futebol", "Skank", 1996, "rock", "Uma das músicas mais tocadas em estádios; descreve um jogo de futebol."],
  ["Como uma Onda", "Lulu Santos", 1983, "rock", "A letra compara a vida a uma onda no mar; virou clássico do pop brasileiro."],
  ["Pelados em Santos", "Mamonas Assassinas", 1995, "rock", "Os Mamonas venderam milhões de discos em menos de um ano, antes do acidente que matou a banda em 1996."],

  # ---- Nordeste e Bahia ----
  ["Asa Branca", "Luiz Gonzaga", 1947, "nordeste", "O hino do sertão nordestino, sobre a seca e a saudade; já foi gravada por centenas de artistas."],
  ["Xote das Meninas", "Luiz Gonzaga", 1953, "nordeste", "Um clássico do xote, ritmo que se dança agarradinho nas festas juninas."],
  ["Eu Só Quero um Xodó", "Dominguinhos", 1973, "nordeste", "Composta por Dominguinhos e Anastácia; Gilberto Gil fez dela um sucesso nacional."],
  ["Chiclete com Banana", "Jackson do Pandeiro", 1959, "nordeste", "Brinca com a mistura entre o samba e o jazz americano."],
  ["Anunciação", "Alceu Valença", 1983, "nordeste", "Uma das músicas mais cantadas do Nordeste, especialmente no Carnaval de Olinda."],
  ["Morena Tropicana", "Alceu Valença", 1982, "nordeste", "Mistura frevo, forró e rock, a marca de Alceu."],
  ["O Canto da Cidade", "Daniela Mercury", 1992, "nordeste", "Levou o axé baiano ao mundo; Daniela fez shows lotados na Europa e na América Latina."],
  ["Sorte Grande", "Ivete Sangalo", 2003, "nordeste", "Conhecida como “Poeira”, é um dos maiores hits do axé."],
  ["Faraó Divindade do Egito", "Olodum", 1987, "nordeste", "O Olodum tocou com Paul Simon e aparece no clipe de “They Don't Care About Us”, de Michael Jackson (1996)."],
  ["Tieta", "Luiz Caldas", 1989, "nordeste", "Tema da novela “Tieta”; Luiz Caldas é considerado o pai do axé music."],
  ["Tic Tic Tac", "Carrapicho", 1996, "nordeste", "Banda do Amazonas que estourou na França e na Europa com o ritmo do boi-bumbá."],

  # ---- Pop, soul e funk ----
  ["Ai Se Eu Te Pego", "Michel Teló", 2011, "hits", "Chegou ao 1.º lugar das paradas em vários países da Europa e da América Latina, com dancinha de jogadores famosos."],
  ["Balada", "Gusttavo Lima", 2011, "hits", "O “tchê tcherere tchê tchê” fez sucesso em vários países depois do Teló."],
  ["Lambada", "Kaoma", 1989, "pop", "Um dos maiores sucessos mundiais de 1989; a melodia vem de uma canção boliviana, “Llorando se fue”."],
  ["Show das Poderosas", "Anitta", 2013, "hits", "O hit que transformou Anitta em estrela nacional antes da carreira internacional."],
  ["Vai Malandra", "Anitta", 2017, "hits", "Gravado no Morro do Vidigal, no Rio; o clipe teve milhões de visualizações em poucos dias."],
  ["Bum Bum Tam Tam", "MC Fioti", 2017, "hits", "O funk usa um trecho de flauta de Bach e virou sucesso mundial no YouTube."],
  ["Tá OK", "DENNIS", 2023, "hits", "Viralizou nas redes do mundo todo e ganhou remix com a cantora colombiana Karol G."],
  ["K.O.", "Pabllo Vittar", 2017, "hits", "Pabllo Vittar é uma das drag queens mais seguidas do mundo nas redes sociais."],
  ["Sossego", "Tim Maia", 1978, "pop", "O soul de Tim Maia é cultuado por DJs e colecionadores de discos no mundo todo."],
  ["Gostava Tanto de Você", "Tim Maia", 1973, "pop", "Uma das baladas românticas mais conhecidas do Brasil."],
  ["Primavera", "Tim Maia", 1970, "pop", "Também conhecida como “Vai Chuva”, foi um dos primeiros sucessos de Tim Maia."],
  ["Descobridor dos Sete Mares", "Tim Maia", 1983, "pop", "Um dos hits mais dançantes de Tim Maia, sempre presente em festas."],
  ["Olhos Coloridos", "Sandra de Sá", 1982, "pop", "Música contra o racismo que virou um clássico do soul brasileiro."],
  ["Ilariê", "Xuxa", 1988, "pop", "Xuxa teve programas na Argentina e nos Estados Unidos; “Ilariê” foi sucesso em espanhol em toda a América Latina."],
  ["Lua de Cristal", "Xuxa", 1990, "pop", "Tema do filme de mesmo nome, foi um dos discos mais vendidos da Xuxa."],
  ["Burguesinha", "Seu Jorge", 2007, "pop", "Brinca com o estilo de vida de uma moça rica do Rio."],
  ["Mina do Condomínio", "Seu Jorge", 2007, "pop", "Um dos maiores sucessos de Seu Jorge no Brasil."],
  ["Você Abusou", "Antonio Carlos & Jocafi", 1971, "pop", "Foi usada em samples de rap e regravada por artistas estrangeiros."],

  # ---- Pop e funk de hoje ----
  ["Envolver", "Anitta", 2021, "hits", "Em 2022 virou a primeira música de uma artista brasileira a chegar ao 1.º lugar do ranking global do Spotify. É cantada em espanhol."],
  ["Downtown", "Anitta & J Balvin", 2017, "hits", "Parceria em espanhol com o colombiano J Balvin; é uma das músicas de artistas brasileiros mais ouvidas no Spotify.", "Anitta"],
  ["Sua Cara", "Major Lazer, Anitta & Pabllo Vittar", 2017, "hits", "Gravada com o grupo americano Major Lazer; o clipe, filmado num deserto do Marrocos, bateu recordes de visualizações em 24 horas.", "Major Lazer"],
  ["Sim ou Não", "Anitta & Maluma", 2016, "hits", "Primeira grande parceria de Anitta com um astro latino, o colombiano Maluma, misturando português e espanhol.", "Anitta"],
  ["Paradinha", "Anitta", 2017, "hits", "Primeira música de Anitta toda em espanhol; o clipe foi gravado em Nova York."],
  ["Medicina", "Anitta", 2018, "hits", "Em espanhol, fez parte da estratégia de Anitta para conquistar a América Latina."],
  ["Me Gusta", "Anitta, Cardi B & Myke Towers", 2020, "hits", "Com a americana Cardi B e o porto-riquenho Myke Towers; o clipe foi gravado no Pelourinho, em Salvador.", "Anitta"],
  ["Girl From Rio", "Anitta", 2021, "hits", "Usa a melodia de “Garota de Ipanema” para mostrar um Rio de Janeiro diferente do cartão-postal."],
  ["Some Que Ele Vem Atrás", "Anitta & Marília Mendonça", 2019, "hits", "Encontro da rainha do pop com a rainha da sofrência: mistura de pop e sertanejo.", "Anitta"],
  ["Funk Rave", "Anitta", 2023, "hits", "Abriu a fase “Funk Generation”, em que Anitta quis mostrar o funk carioca ao mundo."],
  ["Mil Veces", "Anitta", 2023, "hits", "Balada romântica em espanhol que mostra um lado mais calmo de Anitta."],
  ["Dançarina", "Pedro Sampaio & MC Pedrinho", 2023, "hits", "Entrou no ranking global do Spotify e ganhou um remix com Anitta e o porto-riquenho Nicky Jam.", "Pedro Sampaio"],
  ["Olha a Explosão", "Kevinho", 2016, "hits", "Um dos funks brasileiros mais vistos no YouTube; tocou muito em festas da América Latina."],
  ["Ela É do Tipo", "Kevin O Chris", 2019, "hits", "Funk de 150 BPM que chamou a atenção até do rapper canadense Drake, que fez uma versão com a voz de Kevin.", "MC Kevin O Chris"],
  ["Corpo Sensual", "Pabllo Vittar", 2017, "hits", "Com Mateus Carrilho; um dos clipes mais vistos da drag queen mais famosa do Brasil."],
  ["Rainha da Favela", "Ludmilla", 2020, "hits", "Ludmilla canta o orgulho de ter vindo da periferia, em Duque de Caxias (RJ)."],
  ["Pesadão", "IZA", 2017, "hits", "Com Marcelo Falcão (O Rappa); mistura pop, reggae e funk e lançou IZA para o Brasil todo."],
  ["A Queda", "Gloria Groove", 2021, "hits", "Gloria Groove fala de fama e críticas; virou uma das músicas mais cantadas de 2022."],
  ["Chico", "Luísa Sonza", 2023, "hits", "Declaração de amor que foi uma das músicas mais comentadas do ano no Brasil."],
  ["Várias Queixas", "Gilsons", 2019, "hits", "Os Gilsons são filho e netos de Gilberto Gil; a música viralizou nas redes e ganhou remix de Vintage Culture."],

  # ---- Eletrônica ----
  ["Hear Me Now", "Alok, Bruno Martini & Zeeba", 2016, "eletronica", "Entrou nas paradas de muitos países e foi a primeira música de um brasileiro no Top 100 global do Spotify.", "Alok"],
  ["Big Jet Plane", "Alok & Mathieu Koss", 2017, "eletronica", "Versão eletrônica de uma música do cantor australiano Angus Stone; tocou em rádios da Europa.", "Alok"],
  ["Ocean", "Alok, Zeeba & IRO", 2018, "eletronica", "Mais uma parceria de Alok com a cantora Zeeba, a voz de “Hear Me Now”.", "Alok"],
  ["Party On My Own", "Alok & Vintage Culture", 2020, "eletronica", "Encontro dos dois DJs brasileiros mais conhecidos no exterior, com o alemão FAULHABER.", "Alok"],
  ["Car Keys (Ayla)", "Alok & Ava Max", 2022, "eletronica", "Com a cantora americana Ava Max; relê “Ayla”, um clássico do trance dos anos 90.", "Alok"],
  ["Headlights", "Alan Walker & Alok", 2022, "eletronica", "Com o norueguês Alan Walker, um dos DJs mais ouvidos do mundo.", "Alan Walker"],
  ["Deep Down", "Alok, Ella Eyre & Kenny Dope", 2022, "eletronica", "Com a cantora inglesa Ella Eyre; fez sucesso nas rádios do Reino Unido.", "Alok"],
  ["Don't Say Goodbye", "Alok & Ilkay Sencan", 2023, "eletronica", "Com o turco Ilkay Sencan e a cantora sueca Tove Lo: um hit feito em três países.", "Alok"],
  ["My Girl", "Vintage Culture & Fancy Inc", 2019, "eletronica", "Vintage Culture, de Mato Grosso do Sul, é um dos DJs brasileiros mais tocados em festivais da Europa.", "Vintage Culture"],

  # ---- Reggae e praia ----
  ["Andei Só", "Natiruts", 2001, "reggae", "A banda de Brasília é uma das mais queridas do reggae na América Latina e lota shows no Chile, na Argentina e no Uruguai."],
  ["Sorri, Sou Rei", "Natiruts", 2009, "reggae", "Um dos hinos do Natiruts, cantado em coro nos shows dentro e fora do Brasil."],
  ["Quero Ser Feliz Também", "Natiruts", 2005, "reggae", "Está no disco acústico gravado no Rio, que foi indicado ao Grammy Latino."],
  ["Presente de um Beija-Flor", "Natiruts", 1998, "reggae", "Canção de amor que fez o Natiruts ser conhecido no Brasil inteiro."],
  ["Liberdade pra Dentro da Cabeça", "Natiruts", 1998, "reggae", "Fala de paz e liberdade, temas que o Natiruts canta desde o começo."],
  ["Exército da Paz (Peace Army)", "Natiruts & Jacob Hemphill", 2020, "reggae", "Com Jacob Hemphill, vocalista da banda americana SOJA, em português e inglês.", "Natiruts"],
  ["Mergulhei nos Seus Olhos", "Natiruts & Katchafire", 2018, "reggae", "Parceria com a banda de reggae Katchafire, da Nova Zelândia.", "Natiruts"],
  ["Tudo Vai Dar Certo", "Natiruts & Amani Kush", 2020, "reggae", "Lançada no começo da pandemia como mensagem de esperança.", "Natiruts"],
  ["Lágrimas de Alegria", "Maneva & Natiruts", 2021, "reggae", "Encontro de duas das maiores bandas do reggae brasileiro.", "Maneva"],
  ["Outra Vida", "Armandinho", 2006, "reggae", "Armandinho, de Porto Alegre, faz reggae de surfista; é música de praia e luau."],
  ["Versos Simples", "Chimarruts", 2005, "reggae", "Banda gaúcha que levou o reggae para o Sul do Brasil e para o Uruguai."],
  ["O Sol", "Vitor Kley", 2017, "reggae", "Pop de praia que foi uma das músicas mais tocadas nas rádios brasileiras em 2018."],
  ["Meu Abrigo", "Melim", 2017, "reggae", "Os três irmãos do Melim ficaram famosos tocando em reality show e viralizaram com essa música."],
  ["Trevo (Tu)", "ANAVITÓRIA", 2016, "reggae", "Com Tiago Iorc; ganhou o Grammy Latino de melhor canção em língua portuguesa."],

  # ---- Sertanejo ----
  ["Infiel", "Marília Mendonça", 2016, "sertanejo", "Marília, a “Rainha da Sofrência”, foi uma das cantoras mais ouvidas do Brasil; morreu em 2021 num acidente de avião."],
  ["Supera", "Marília Mendonça", 2019, "sertanejo", "Conselho para quem não esquece um amor; é um clássico da sofrência."],
  ["Arranhão", "Henrique & Juliano", 2021, "sertanejo", "Henrique & Juliano estão entre os artistas mais ouvidos do Brasil; esta gravação é de um show deles em Nova York, em 2022."],
  ["Propaganda", "Jorge & Mateus", 2016, "sertanejo", "Uma das duplas mais populares do sertanejo universitário."],
  ["Largado às Traças", "Zé Neto & Cristiano", 2017, "sertanejo", "Virou uma das músicas mais tocadas nas rádios do Brasil."],
  ["Termina Comigo Antes", "Gusttavo Lima", 2018, "sertanejo", "Gusttavo Lima, o “Embaixador”, é um dos cantores que mais fazem shows no Brasil."],
  ["Batom de Cereja", "Israel & Rodolffo", 2021, "sertanejo", "Estourou depois que Rodolffo participou do reality show Big Brother Brasil."],
  ["Pipoco", "Ana Castela", 2022, "sertanejo", "Com Melody e DJ Chris no Beat; a “Boiadeira” misturou sertanejo e funk e virou febre entre os jovens."],
  ["Erro Gostoso", "Simone Mendes", 2023, "sertanejo", "Primeiro grande sucesso de Simone na carreira solo, depois da dupla com a irmã Simaria."],
  ["Te Esperando", "Luan Santana", 2013, "sertanejo", "Luan Santana começou a fazer sucesso ainda adolescente e é um dos ídolos do sertanejo pop."],

  # ---- Românticas e Jovem Guarda ----
  ["Detalhes", "Roberto Carlos", 1971, "romantica", "Roberto Carlos, o “Rei”, é um dos cantores latinos que mais venderam discos na história e gravou muito em espanhol."],
  ["Como É Grande o Meu Amor por Você", "Roberto Carlos", 1967, "romantica", "Uma das declarações de amor mais famosas da música brasileira."],
  ["Emoções", "Roberto Carlos", 1981, "romantica", "Virou o nome dos famosos cruzeiros e shows do cantor."],
  ["Amigo", "Roberto Carlos", 1977, "romantica", "Feita para o parceiro Erasmo Carlos; em espanhol, “Amigo” foi enorme sucesso na América Latina."],
  ["Cama e Mesa", "Roberto Carlos", 1981, "romantica", "Uma das músicas mais românticas e também mais pedidas nos shows."],
  ["O Calhambeque", "Roberto Carlos", 1964, "romantica", "Versão de “Road Hog”; marcou o começo da Jovem Guarda, o rock dos anos 60 no Brasil."],
  ["Quero Que Vá Tudo pro Inferno", "Roberto Carlos", 1965, "romantica", "O primeiro grande sucesso nacional de Roberto Carlos."],
]

CATS = {
  "hits": ["Pop e funk de hoje", "🔥", "#e91e63", ["Você já ouviu essa música numa festa ou no TikTok?", "Anitta canta em português, espanhol e inglês. Por que isso ajuda a fazer sucesso?", "Que artista do seu país faz sucesso fora dele?", "Você dançaria essa música? Onde?"]],
  "eletronica": ["Eletrônica", "🎧", "#3949ab", ["Você gosta de música eletrônica?", "Você já foi a um festival? Como foi?", "Por que a eletrônica quase não precisa de letra para fazer sucesso?", "Onde você ouviria essa música: academia, carro ou festa?"]],
  "reggae": ["Reggae e praia", "🌊", "#2e7d32", ["Que lugar essa música faz você imaginar?", "O reggae é popular no seu país?", "Qual é a sua praia favorita?", "Que mensagem a música passa: paz, amor, liberdade…?"]],
  "sertanejo": ["Sertanejo", "🤠", "#8d6e63", ["Existe música parecida com essa no seu país?", "Por que as músicas de “sofrência” fazem tanto sucesso?", "Você prefere música alegre ou música triste?", "Você já foi a um show grande? De quem?"]],
  "bossa": ["Bossa nova", "🎷", "#00796b", ["Você já tinha ouvido essa música? Onde?", "Que sensação essa música passa?", "Por que a bossa nova fez tanto sucesso fora do Brasil?", "Em que lugar ou momento do dia você ouviria essa música?"]],
  "samba": ["Samba e choro", "🥁", "#c62828", ["Você sabe sambar?", "Que instrumentos você reconhece?", "O samba parece alegre ou triste? Por quê?", "Que ritmo do seu país se parece com esse?"]],
  "mpb": ["MPB e Tropicália", "🌴", "#6a1b9a", ["Que palavras você entendeu?", "Sobre o que você acha que é a letra?", "Que imagem essa música cria na sua cabeça?", "Você colocaria essa música na sua playlist?"]],
  "rock": ["Rock brasileiro", "🎸", "#37474f", ["Você gosta de rock?", "Essa música lembra alguma banda que você conhece?", "Como era ser jovem nos anos 80?", "Que banda de rock do seu país você recomendaria?"]],
  "nordeste": ["Nordeste e Bahia", "🪗", "#ef6c00", ["Que instrumentos você ouve?", "Dá vontade de dançar?", "O que você sabe sobre as festas do Nordeste?", "Que música típica do seu país tem essa energia?"]],
  "pop": ["Soul e pop clássico", "💃", "#d81b60", ["Você já tinha ouvido essa música em alguma festa?", "Por que algumas músicas viralizam no mundo todo?", "Você dançaria essa música?", "Que música do seu país virou sucesso lá fora?"]],
  "romantica": ["Românticas e Jovem Guarda", "💘", "#ad1457", ["Você conhecia essa música em espanhol?", "Para quem você dedicaria essa música?", "As músicas românticas de antes eram melhores?", "Qual é a música mais romântica que você conhece?"]],
}

UA = {"User-Agent": "aulas-interativas-musica/1.0 (educational)"}
norm = lambda s: re.sub(r"[^a-z0-9 ]", "", unicodedata.normalize("NFD", s).encode("ascii", "ignore").decode().lower())

ALIAS = {"Tom Jobim": "Antonio Carlos Jobim", "Jorge Ben": "Jorge Ben Jor", "DENNIS": "DENNIS"}
PREFERE = {"Pabllo Vittar | Corpo Sensual": "vai passar mal", "Natiruts | Sorri, Sou Rei": "racaman", "Natiruts | Quero Ser Feliz Também": "nossa missao", "Jorge Ben | Mas Que Nada": "samba esquema novo", "Tim Maia | Primavera": "1970", "Gusttavo Lima | Balada": "inventor dos amores"}

def busca(titulo, artista, q_art=None):
    q_art = q_art or ALIAS.get(artista, artista)
    for pais in ("BR", "US"):
        u = "https://itunes.apple.com/search?" + urllib.parse.urlencode(dict(term=f"{q_art} {titulo}", entity="song", country=pais, limit=50))
        for i in range(6):
            try:
                r = json.load(urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=30)); break
            except Exception:
                time.sleep(20 * (i + 1))
        else:
            r = {"results": []}
        time.sleep(3.2)
        nt, na = norm(titulo), norm(q_art)
        alvo = {norm(artista), na}
        palavras = [w for w in nt.split() if len(w) > 2] or nt.split()
        ruim = re.compile(r"karaoke|instrumental|remix|cover|tribute|version|versao", re.I)
        ok = [x for x in r["results"] if x.get("previewUrl") and all(w in norm(x.get("trackName", "")) for w in palavras)
              and any(norm(x.get("artistName", "")).startswith(a) for a in alvo) and not ruim.search(x.get("trackName", ""))]
        pref = PREFERE.get(f"{artista} | {titulo}", "")
        ok.sort(key=lambda x: (pref not in norm(x.get("collectionName", "")), norm(x["artistName"]) not in alvo,
                               norm(re.sub(r"\(.*?\)", "", x["trackName"])).strip() != nt,
                               "ao vivo" in norm(x["trackName"] + x.get("collectionName", "")), len(x["trackName"])))
        if ok:
            x = ok[0]
            return dict(id=x["trackId"], prev=x["previewUrl"], capa=x.get("artworkUrl100", "").replace("100x100bb", "600x600bb"),
                        link=x.get("trackViewUrl", "").split("?")[0], album=x.get("collectionName", ""), nome=x["trackName"], art=x["artistName"], pais=pais)
    return None

cache = json.loads(CACHE.read_text()) if CACHE.exists() else {}
saida = []
for t, a, ano, cat, cur, *busca_art in MUSICAS:
    k = f"{a} | {t}"
    if k not in cache:
        cache[k] = busca(t, a, busca_art[0] if busca_art else None)
        CACHE.write_text(json.dumps(cache, ensure_ascii=False, indent=1))
        print(("OK " if cache[k] else "-- ") + k, "->", cache[k] and (cache[k]["nome"], cache[k]["art"], cache[k]["album"]), flush=True)
    it = cache[k]
    saida.append(dict(t=t, a=a, ano=ano, cat=cat, cur=cur, **({k2: it[k2] for k2 in ("id", "prev", "capa", "link", "album")} if it else {})))

# estilos atuais: mais novas primeiro
saida.sort(key=lambda m: -m["ano"] if m["cat"] in ("hits", "eletronica", "reggae", "sertanejo") else 0)
OUT.parent.mkdir(exist_ok=True)
OUT.write_text("/* Gerado por ferramentas/gerar_musicas.py — não editar à mão. */\nwindow.CATS_MUSICA = "
               + json.dumps({k: dict(nome=v[0], ic=v[1], cor=v[2], perg=v[3]) for k, v in CATS.items()}, ensure_ascii=False)
               + ";\nwindow.MUSICAS = " + json.dumps(saida, ensure_ascii=False, indent=0) + ";\n")
print(len(saida), "músicas;", sum(1 for s in saida if "prev" in s), "com prévia")
