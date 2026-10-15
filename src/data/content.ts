import aparecida from '../assets/img/aparecida.jpg';
import caixa from '../assets/img/caixa.jpg';
import canecaouro from '../assets/img/canecaouro.jpg';
import coracoes from '../assets/img/coracoes.jpg';
import exclusiva from '../assets/img/exclusiva.jpg';
import garrafa600 from '../assets/img/garrafa600.jpg';
import hero from '../assets/img/hero.jpg';
import igreja from '../assets/img/igreja.jpg';
import logo from '../assets/img/logo.jpg';
import maefilha from '../assets/img/maefilha.jpg';

export const brand = {
  name: 'Trassu Atelier',
  whatsapp: '5511966521589',
  whatsappLabel: '(11) 96652-1589',
  instagram: 'trassuatelier',
  city: 'Indaiatuba, SP',
};

export const images = {logo, hero, exclusiva, igreja};

export const highlights = ['Arte autoral, feita à mão', 'Entrega para todo o Brasil', 'PIX ou cartão'];

export const story = {
  intro: [
    'Acreditamos que um presente pode carregar muito mais do que aquilo que se vê.',
    'Foi desse olhar que nasceu a Trassu Atelier: um espaço onde porcelanas e biscoitos artesanais se transformam em presentes pensados especialmente para alguém.',
    'Criamos para celebrar encontros, fé, conquistas, pessoas queridas e tantos outros momentos que merecem um detalhe só deles.',
  ],
  origin: [
    'A Trassu Atelier foi pioneira no Brasil ao levar a estética afroreligiosa aos biscoitos decorados em glacê real. Um trabalho que nasceu do desejo de representar a fé com beleza, delicadeza e, acima de tudo, respeito.',
    'Com o tempo, os biscoitos abriram espaço para novas formas de criar. Vieram as porcelanas, com novos traços e novas possibilidades, mas o cuidado em transformar significado em arte continuou o mesmo.',
  ],
  teaser:
    'Pioneira no Brasil ao levar a estética afroreligiosa aos biscoitos decorados em glacê real, a Trassu transforma fé, encontros e pessoas queridas em arte feita à mão.',
  quote: 'Porque alguns momentos passam. Outros merecem permanecer.',
};

export const gallery = [
  {src: caixa, alt: 'Biscoito com pedido de madrinha em caixa de MDF com mini buquê'},
  {src: aparecida, alt: 'Prato com Nossa Senhora Aparecida'},
  {src: canecaouro, alt: 'Caneca com ilustração dourada de Obaluaê'},
  {src: maefilha, alt: 'Prato com retrato de mãe e filha em traço'},
  {src: coracoes, alt: 'Biscoitos carimbados em formato de coração'},
  {src: garrafa600, alt: 'Garrafa com Oxalá e Iemanjá'},
];

export const steps = [
  {title: 'Monte seu pedido', text: 'Escolha os produtos e conte a personalização: nomes, datas, frases, orixá ou tema.'},
  {title: 'Finalize no WhatsApp', text: 'Seu pedido chega pronto, com o resumo de tudo. Ali alinhamos detalhes, prazo e frete.'},
  {title: 'Confirme o pagamento', text: 'Pagamento integral antes da produção, por PIX ou cartão. A encomenda é confirmada com o comprovante.'},
  {title: 'Receba com cuidado', text: 'Retire em Indaiatuba, receba por motoboy na região ou pelos Correios e transportadora em todo o Brasil.'},
];

export const careItems = [
  {
    title: 'No dia a dia',
    items: [
      'Lave à mão, com detergente neutro e esponja macia.',
      'Não use palha de aço, produtos abrasivos ou esponjas ásperas.',
      'Evite esfregar diretamente sobre a personalização.',
      'Não deixe a peça de molho por longos períodos.',
      'Não leve à lava-louças nem ao micro-ondas.',
      'Evite impactos, riscos, atritos sobre a arte e mudanças bruscas de temperatura.',
    ],
  },
  {
    title: 'Impressão em relevo (DTF UV)',
    text: 'A arte é impressa em um filme especial e transferida para a peça, formando uma fina camada sobre ela. Por ser uma aplicação externa, pode ter desgaste natural com o uso e o atrito ao longo do tempo.',
  },
  {
    title: 'Pintura à mão',
    text: 'A arte é pintada diretamente na peça, pincelada por pincelada, e passa por um processo de fixação. Pequenas variações de traço, cor e acabamento são naturais e tornam cada peça única.',
  },
];

export const deliveryInfo = [
  {
    title: 'Pagamento',
    text: 'Integral após a definição do pedido e antes do início da produção. PIX ou cartão de crédito via Infinity Pay, com taxas de parcelamento a partir de 4%. A encomenda é confirmada após o envio do comprovante.',
  },
  {
    title: 'Retirada e entrega',
    text: 'Retirada em Indaiatuba (SP), motoboy ou Uber para Indaiatuba e região, Correios ou transportadora para todo o Brasil. Frete e eventual taxa de deslocamento para postagem são informados no orçamento.',
  },
  {
    title: 'Prazos',
    text: 'Trabalhamos com agenda de produção, por isso recomendamos encomendar com antecedência. Após a postagem, o prazo de entrega é de responsabilidade da transportadora.',
  },
];

export const faq = [
  {
    q: 'Qual a diferença entre arte do atelier e arte exclusiva?',
    a: 'A arte do atelier usa composições que já criamos, como os orixás e entidades do nosso acervo. A arte exclusiva é desenhada só para o seu pedido, a partir de uma foto, referência ou ideia.',
  },
  {
    q: 'Posso escolher qualquer orixá ou entidade?',
    a: 'Para modelos religiosos, a arte segue as opções disponíveis no atelier. Conte o que você procura no pedido e confirmamos pelo WhatsApp.',
  },
  {
    q: 'Qual o pedido mínimo dos carimbadinhos?',
    a: '50 unidades. Para arte exclusiva ou logotipo, há uma taxa única de R$ 40,00 para criar o carimbo, que pode ser reutilizado em novos pedidos.',
  },
  {
    q: 'O que vem nos modelos para presentear?',
    a: 'Todos acompanham caixa em MDF, palha interna, acabamento em chiffon off-white e lapela com flores e folhagens secas. Você pode incluir um nome ou frase.',
  },
  {
    q: 'Como envio a foto para a arte exclusiva?',
    a: 'Depois de finalizar o pedido, envie a foto ou referência na mesma conversa do WhatsApp.',
  },
  {
    q: 'O valor do site já é o final?',
    a: 'É uma estimativa. Itens com preço “a partir de” e o frete são confirmados no WhatsApp antes do pagamento.',
  },
];
