import type {PersonalizationField} from '../types';

export const fieldPresets: PersonalizationField[] = [
  {id: 'theme', label: 'Orixá, entidade ou tema', type: 'theme', placeholder: 'Digite ou escolha uma sugestão'},
  {id: 'phrase', label: 'Frase', type: 'text', placeholder: 'Ex.: Aceita ser minha madrinha?'},
  {id: 'names', label: 'Nomes ou iniciais', type: 'text', placeholder: 'Ex.: A | L'},
  {id: 'date', label: 'Data', type: 'text', placeholder: 'Ex.: 06 • 09 • 2026'},
  {id: 'stamp', label: 'O que vai no carimbo', type: 'text', placeholder: 'Nome, iniciais ou símbolo'},
  {id: 'story', label: 'Conte a sua história', type: 'textarea', placeholder: 'Quem aparece, o que a peça deve lembrar'},
  {id: 'occasion', label: 'Ocasião', type: 'occasion'},
  {id: 'notes', label: 'Observações', type: 'textarea', placeholder: 'Cores, nomes ou outros detalhes'},
];

export function preset(id: string, changes: Partial<PersonalizationField> = {}): PersonalizationField {
  const base = fieldPresets.find(field => field.id === id);
  if (!base) {
    throw new Error(`Campo desconhecido: ${id}`);
  }
  return {...base, ...changes};
}

export const occasions = [
  'Pedido de madrinha ou padrinho',
  'Presente de fé',
  'Aniversário de santo',
  'Casamento',
  'Batizado',
  'Lembrança de evento',
  'Para mim',
  'Outra',
];

export const defaultThemes = [
  'Exu',
  'Pomba Gira',
  'Ogum',
  'Oxóssi',
  'Xangô',
  'Iansã',
  'Oxum',
  'Iemanjá',
  'Nanã',
  'Obaluaê / Omolu',
  'Oxalá',
  'Caboclos',
  'Pretos-velhos',
  'Baianos',
  'Marinheiros',
  'Erês',
  'Nossa Senhora Aparecida',
];

export const deliveryOptions = ['Retirada em Indaiatuba', 'Motoboy ou Uber (Indaiatuba e região)', 'Correios ou transportadora'];

export const shippingOption = 'Correios ou transportadora';
