import buque from '../assets/img/buque.jpg';
import caixa from '../assets/img/caixa.jpg';
import caneca from '../assets/img/caneca.jpg';
import carimbadinho from '../assets/img/carimbadinho.jpg';
import coracoes from '../assets/img/coracoes.jpg';
import essencia from '../assets/img/essencia.jpg';
import exclusiva from '../assets/img/exclusiva.jpg';
import garrafa600 from '../assets/img/garrafa600.jpg';
import garrafa900 from '../assets/img/garrafa900.jpg';
import memoria from '../assets/img/memoria.jpg';
import singelos from '../assets/img/singelos.jpg';
import type {Category, Product} from '../types';
import {preset} from './fields';

export const categories: Category[] = ['Biscoitos', 'Porcelanas', 'Garrafas', 'Para presentear'];

export const categoryDetails: Record<Category, {slug: string; image: string; text: string}> = {
  Biscoitos: {slug: 'biscoitos', image: coracoes, text: 'Carimbadinhos e singelos com arte feita à mão.'},
  Porcelanas: {slug: 'porcelanas', image: essencia, text: 'Pratos e canecas para guardar uma história.'},
  Garrafas: {slug: 'garrafas', image: garrafa600, text: 'Térmicas com arte que envolve toda a peça.'},
  'Para presentear': {slug: 'presentes', image: caixa, text: 'Seu presente, pronto para entregar.'},
};

export function categoryFromSlug(slug?: string) {
  return categories.find(category => categoryDetails[category].slug === slug);
}

const giftIncludes =
  'Acompanha caixa em MDF, palha interna, acabamento em chiffon off-white e lapela com flores e folhagens secas.';

const giftFields = [
  preset('phrase', {label: 'Nome ou frase no presente', placeholder: 'Opcional. Ex.: Com carinho, Ana'}),
  preset('occasion'),
];

export const catalog: Product[] = [
  {
    id: 'carimbadinhos',
    name: 'Carimbadinhos',
    category: 'Biscoitos',
    size: '6 cm',
    subtitle: 'Pequenos no tamanho, cheios de personalidade.',
    description:
      'Biscoitos amanteigados personalizados com nomes, iniciais, símbolos ou logotipos. Uma forma delicada de levar identidade a lembranças, celebrações e ações de marcas. Selados individualmente.',
    image: carimbadinho,
    variants: [{id: 'unidade', name: 'Unidade', price: 2.5}],
    minQty: 50,
    step: 1,
    extra: {
      label: 'Carimbo com arte exclusiva ou logotipo',
      price: 40,
      help: 'Taxa única para criação do carimbo, que pode ser reutilizado em novos pedidos.',
    },
    fields: [preset('stamp', {required: true}), preset('occasion'), preset('notes')],
    active: true,
  },
  {
    id: 'singelos',
    name: 'Singelos',
    category: 'Biscoitos',
    size: '11 cm',
    subtitle: 'Arte feita à mão, em uma forma doce de presentear.',
    description:
      'Cada biscoito recebe uma ilustração autoral desenhada sobre o glacê real, tornando cada peça única para quem recebe. Pensados para convites, presentes e momentos em que um detalhe feito especialmente para alguém faz toda a diferença.',
    image: singelos,
    variants: [{id: 'unidade', name: 'Unidade', price: 38}],
    minQty: 1,
    step: 1,
    notice: 'Para modelos religiosos, a arte segue as opções disponíveis no atelier.',
    fields: [preset('theme', {required: true}), preset('phrase'), preset('occasion'), preset('notes')],
    featured: true,
    active: true,
  },
  {
    id: 'prato-essencia',
    name: 'Prato Essência',
    category: 'Porcelanas',
    size: '10 cm',
    subtitle: 'Uma lembrança feita para continuar presente.',
    description:
      'Personalizado com nomes, iniciais, datas, frases, símbolos ou pequenas ilustrações. Ideal para casamentos, batizados, padrinhos, celebrações religiosas e outras ocasiões que pedem algo feito especialmente para aquele momento.',
    image: essencia,
    variants: [{id: 'unidade', name: 'Unidade', price: 39}],
    minQty: 1,
    step: 1,
    includes: 'Acompanha suporte de acrílico.',
    fields: [preset('names', {required: true}), preset('date'), preset('phrase', {placeholder: 'Frase, símbolo ou ilustração'}), preset('occasion')],
    active: true,
  },
  {
    id: 'prato-memoria',
    name: 'Prato Memória',
    category: 'Porcelanas',
    size: '19 cm',
    subtitle: 'Uma peça criada para dar lugar àquilo que não quer esquecer.',
    description:
      'O formato de 19 cm permite composições mais elaboradas, ilustrações e artes desenvolvidas especialmente para cada peça. Escolha uma arte do atelier ou peça uma arte exclusiva, criada a partir de uma fotografia, referência ou ideia.',
    image: memoria,
    variants: [
      {id: 'atelier-relevo', name: 'Arte do atelier · impressão em relevo', price: 129},
      {id: 'atelier-mao', name: 'Arte do atelier · pintura à mão', price: 179},
      {id: 'exclusiva-relevo', name: 'Arte exclusiva · impressão em relevo', price: 199, image: exclusiva},
      {id: 'exclusiva-mao', name: 'Arte exclusiva · pintura à mão', price: 259, image: exclusiva},
    ],
    minQty: 1,
    step: 1,
    includes: 'Acompanha suporte de acrílico. Na arte exclusiva, envie a foto ou referência pelo WhatsApp.',
    fields: [
      preset('theme', {placeholder: 'Para arte do atelier'}),
      preset('story', {placeholder: 'Para arte exclusiva: quem aparece, o que a peça deve lembrar'}),
      preset('phrase', {placeholder: 'Ex.: Okê Arô'}),
      preset('occasion'),
    ],
    featured: true,
    active: true,
  },
  {
    id: 'caneca-bojuda',
    name: 'Caneca Bojuda',
    category: 'Porcelanas',
    size: 'Arte na frente, frase atrás',
    subtitle: 'Um presente para fazer parte dos pequenos momentos do dia.',
    description:
      'Nomes, frases, símbolos e ilustrações transformam a caneca em uma peça criada especialmente para quem vai receber. Disponível em diferentes temas e estilos para celebrar pessoas, histórias e momentos especiais.',
    image: caneca,
    variants: [{id: 'unidade', name: 'Unidade', price: 89, priceFrom: true}],
    minQty: 1,
    step: 1,
    includes: 'Acompanha pires em madeira, em saco de organza.',
    fields: [
      preset('theme', {label: 'Arte da frente', placeholder: 'Orixá, monograma, símbolo…', required: true}),
      preset('phrase', {label: 'Frase de trás', placeholder: 'Ex.: Camilla e Alex · 11.01.2026'}),
      preset('occasion'),
    ],
    active: true,
  },
  {
    id: 'garrafa-entre-guias',
    name: 'Garrafa Entre-Guias',
    category: 'Garrafas',
    size: 'Térmica, com canudo ou infusor',
    subtitle: 'Feita para acompanhar a rotina. Personalizada para não ser só mais uma.',
    description:
      'Garrafa térmica personalizada com impressão em relevo e arte desenvolvida para envolver toda a peça. Uma composição autoral que traduz a fé em detalhes e acompanha a rotina com personalidade e significado.',
    image: garrafa900,
    variants: [
      {id: 'canudo-600', name: 'Com canudo · 600 ml · 20 cm', price: 99, image: garrafa600},
      {id: 'canudo-900', name: 'Com canudo · 900 ml · 24 cm', price: 129, image: garrafa900},
      {id: 'infusor-600', name: 'Com infusor · 600 ml · 24 cm', price: 99},
      {id: 'infusor-1000', name: 'Com infusor · 1000 ml · 31 cm', price: 139},
    ],
    minQty: 1,
    step: 1,
    includes:
      'O modelo com canudo acompanha canudo. O modelo com infusor acompanha infusor para chás e base de silicone. Medidas aproximadas.',
    notice: 'Para personalização da arte ou outras informações, fale com a gente no WhatsApp.',
    fields: [preset('notes', {label: 'Personalização', placeholder: 'Se quiser nome ou arte diferente do modelo, conte aqui'})],
    featured: true,
    active: true,
  },
  {
    id: 'presente-biscoito-ou-prato',
    name: 'Presente Modelo 1',
    category: 'Para presentear',
    size: '1 biscoito decorado ou 1 prato de porcelana',
    subtitle: 'Seu presente, pronto para entregar.',
    description: 'Um biscoito decorado ou um prato de porcelana, embalado para presentear.',
    image: caixa,
    variants: [
      {id: 'biscoito', name: 'Com 1 biscoito decorado', price: 69},
      {id: 'prato', name: 'Com 1 prato de porcelana', price: 69},
    ],
    minQty: 1,
    step: 1,
    includes: giftIncludes,
    fields: [preset('theme', {label: 'Arte da peça', required: true}), ...giftFields],
    active: true,
  },
  {
    id: 'presente-biscoito-e-prato',
    name: 'Presente Modelo 2',
    category: 'Para presentear',
    size: '1 biscoito decorado e 1 prato de porcelana',
    subtitle: 'Seu presente, pronto para entregar.',
    description: 'Um biscoito decorado e um prato de porcelana juntos, embalados para presentear.',
    image: caixa,
    variants: [{id: 'unidade', name: 'Unidade', price: 119}],
    minQty: 1,
    step: 1,
    includes: giftIncludes,
    fields: [preset('theme', {label: 'Arte das peças', required: true}), ...giftFields],
    active: true,
  },
  {
    id: 'presente-caneca',
    name: 'Presente Modelo 3',
    category: 'Para presentear',
    size: '1 caneca',
    subtitle: 'Seu presente, pronto para entregar.',
    description: 'Uma caneca personalizada, embalada para presentear.',
    image: buque,
    variants: [{id: 'unidade', name: 'Unidade', price: 129}],
    minQty: 1,
    step: 1,
    includes: giftIncludes,
    fields: [preset('theme', {label: 'Arte da caneca', required: true}), ...giftFields],
    active: true,
  },
  {
    id: 'presente-garrafa',
    name: 'Presente Modelo 4',
    category: 'Para presentear',
    size: '1 garrafa térmica',
    subtitle: 'Seu presente, pronto para entregar.',
    description: 'Uma garrafa térmica Entre-Guias, embalada para presentear. O valor final depende do modelo escolhido.',
    image: buque,
    variants: [{id: 'unidade', name: 'Unidade', price: 149, priceFrom: true}],
    minQty: 1,
    step: 1,
    includes: giftIncludes,
    fields: [
      {id: 'bottle', label: 'Modelo e tamanho da garrafa', type: 'select', required: true, options: [
        'Com canudo · 600 ml',
        'Com canudo · 900 ml',
        'Com infusor · 600 ml',
        'Com infusor · 1000 ml',
      ]},
      ...giftFields,
    ],
    active: true,
  },
];
