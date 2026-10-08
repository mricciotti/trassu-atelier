import buque from '../assets/img/buque.jpg';
import caixa from '../assets/img/caixa.jpg';
import caneca from '../assets/img/caneca.jpg';
import carimbadinho from '../assets/img/carimbadinho.jpg';
import essencia from '../assets/img/essencia.jpg';
import exclusiva from '../assets/img/exclusiva.jpg';
import garrafa600 from '../assets/img/garrafa600.jpg';
import garrafa900 from '../assets/img/garrafa900.jpg';
import memoria from '../assets/img/memoria.jpg';
import singelos from '../assets/img/singelos.jpg';
import type {Category, Product} from '../types';
import {preset} from './fields';

export const categories: Category[] = ['Biscoitos', 'Porcelanas', 'Garrafas', 'Para presentear'];

export const catalog: Product[] = [
  {
    id: 'carimbadinhos',
    name: 'Carimbadinhos',
    category: 'Biscoitos',
    size: '6 cm',
    subtitle: 'Pequenos no tamanho, cheios de personalidade.',
    description:
      'Biscoitos amanteigados personalizados com nomes, iniciais, símbolos ou logotipos. Selados individualmente.',
    image: carimbadinho,
    variants: [{id: 'unidade', name: 'Unidade', price: 2.5}],
    minQty: 50,
    step: 10,
    extra: {
      label: 'Carimbo com arte exclusiva ou logotipo',
      price: 40,
      help: 'Taxa única por pedido. O carimbo pode ser reutilizado em novos pedidos.',
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
      'Cada biscoito recebe uma ilustração autoral desenhada sobre o glacê real, tornando cada peça única para quem recebe.',
    image: singelos,
    variants: [{id: 'unidade', name: 'Unidade', price: 38}],
    minQty: 1,
    step: 1,
    notice: 'Para modelos religiosos, a arte segue as opções do atelier.',
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
      'Personalizado com nomes, iniciais, datas, frases, símbolos ou pequenas ilustrações. Ideal para casamentos, batizados, padrinhos e celebrações religiosas.',
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
      'O formato de 19 cm permite composições mais elaboradas, com ilustrações desenvolvidas especialmente para cada peça.',
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
      'Nomes, frases, símbolos e ilustrações transformam a caneca em uma peça criada especialmente para quem vai receber.',
    image: caneca,
    variants: [{id: 'unidade', name: 'Unidade', price: 89, priceFrom: true}],
    minQty: 1,
    step: 1,
    includes: 'Acompanha pires em madeira e saco de organza.',
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
    size: 'Térmica, arte que envolve a peça',
    subtitle: 'Feita para acompanhar a rotina. Personalizada para não ser só mais uma.',
    description:
      'Garrafa térmica com impressão em relevo e uma composição autoral que traduz a fé em detalhes.',
    image: garrafa600,
    variants: [
      {id: '600', name: '600 ml · aprox. 10 × 20 cm', price: 99, image: garrafa600},
      {id: '900', name: '900 ml · aprox. 10 × 24 cm', price: 129, image: garrafa900},
    ],
    minQty: 1,
    step: 1,
    includes: 'Acompanha canudo e saco de organza. Para artes personalizadas, o valor é confirmado no WhatsApp.',
    fields: [preset('notes', {label: 'Personalização', placeholder: 'Se quiser nome ou arte diferente do modelo, conte aqui'})],
    featured: true,
    active: true,
  },
  {
    id: 'caixa-mdf',
    name: 'Caixa em MDF',
    category: 'Para presentear',
    size: 'Finalizada com tecido chiffon',
    subtitle: 'O presente começa antes mesmo de abrir.',
    description: 'Caixa em MDF finalizada com chiffon. Tamanho e valor variam conforme o produto que vai dentro.',
    image: caixa,
    variants: [{id: 'unidade', name: 'Unidade', price: 15, priceFrom: true}],
    minQty: 1,
    step: 1,
    fields: [preset('notes', {label: 'Para qual produto', placeholder: 'Ex.: 1 Singelo', required: true})],
    active: true,
  },
  {
    id: 'mini-buque',
    name: 'Mini buquê',
    category: 'Para presentear',
    size: 'Lapela de flores e folhagens secas',
    subtitle: 'Um detalhe que completa a entrega.',
    description: 'Lapela composta por flores e folhagens secas para finalizar a caixa.',
    image: buque,
    variants: [{id: 'unidade', name: 'Unidade', price: 10}],
    minQty: 1,
    step: 1,
    fields: [],
    active: true,
  },
  {
    id: 'adesivo',
    name: 'Adesivo personalizado',
    category: 'Para presentear',
    size: 'Em relevo, com nome ou frase',
    subtitle: 'Seu nome ou frase na embalagem.',
    description: 'Adesivo em relevo personalizado com nomes ou frases. O valor varia com o tamanho.',
    image: buque,
    variants: [{id: 'unidade', name: 'Unidade', price: 5, priceFrom: true}],
    minQty: 1,
    step: 1,
    fields: [preset('phrase', {label: 'Texto do adesivo', placeholder: 'Ex.: Com carinho, Ana', required: true})],
    active: true,
  },
];
