import aparecida from '../assets/img/aparecida.jpg';
import caixa from '../assets/img/caixa.jpg';
import canecaouro from '../assets/img/canecaouro.jpg';
import coracoes from '../assets/img/coracoes.jpg';
import garrafa600 from '../assets/img/garrafa600.jpg';
import garrafa900 from '../assets/img/garrafa900.jpg';
import hero from '../assets/img/hero.jpg';
import logo from '../assets/img/logo.jpg';
import maefilha from '../assets/img/maefilha.jpg';
import memoria from '../assets/img/memoria.jpg';
import singelos from '../assets/img/singelos.jpg';

export const brand = {
  name: 'Trassu Atelier',
  whatsapp: '5511966521589',
  whatsappLabel: '(11) 96652-1589',
  instagram: 'trassuatelier',
  city: 'Indaiatuba, SP',
};

export const images = {logo, hero, memoria, garrafa900, singelos};

export const heroPhotos = [
  {src: memoria, alt: 'Prato pintado à mão com Oxóssi e Oxum'},
  {src: hero, alt: 'Biscoito em glacê real com Exu e Iansã, ao lado de um prato ilustrado'},
  {src: garrafa900, alt: 'Garrafa térmica ilustrada com símbolos dos orixás'},
];

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
  {title: 'Receba com cuidado', text: 'Retire em Indaiatuba, receba por motoboy na região ou pelos Correios em todo o Brasil.'},
];

export const careItems = [
  {
    title: 'No dia a dia',
    items: [
      'Lave à mão, com detergente neutro e esponja macia.',
      'Não use palha de aço, produtos abrasivos ou esponjas ásperas.',
      'Evite esfregar diretamente sobre a arte e deixar de molho por muito tempo.',
      'Não leve à lava-louças nem ao micro-ondas.',
      'Evite impactos, riscos e mudanças bruscas de temperatura.',
    ],
  },
  {
    title: 'Impressão em relevo (DTF UV)',
    text: 'A arte é impressa em um filme especial e transferida para a peça, formando uma fina camada sobre ela. Por ser uma aplicação externa, pode ter desgaste natural com o uso e o atrito.',
  },
  {
    title: 'Pintura à mão',
    text: 'A arte é pintada diretamente na peça, pincelada por pincelada, e passa por um processo de fixação. Pequenas variações de traço, cor e acabamento são naturais e tornam cada peça única.',
  },
];

export const deliveryInfo = [
  {
    title: 'Pagamento',
    text: 'Integral após a definição do pedido e antes do início da produção. PIX ou cartão de crédito via Infinity Pay, com taxas de parcelamento a partir de 6%.',
  },
  {
    title: 'Retirada e entrega',
    text: 'Retirada em Indaiatuba (SP), motoboy para Indaiatuba e região ou Correios para todo o Brasil. Frete e eventual taxa de deslocamento são informados no orçamento.',
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
    q: 'Como envio a foto para a arte exclusiva?',
    a: 'Depois de finalizar o pedido, envie a foto ou referência na mesma conversa do WhatsApp.',
  },
  {
    q: 'O valor do site já é o final?',
    a: 'É uma estimativa. Itens com preço “a partir de” e o frete são confirmados no WhatsApp antes do pagamento.',
  },
];
