import {after, before, test} from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'vite';

let server;
let order;
let whatsapp;
let catalog;

before(async () => {
  server = await createServer({server: {middlewareMode: true}, appType: 'custom', logLevel: 'error'});
  order = await server.ssrLoadModule('/src/utils/order.ts');
  whatsapp = await server.ssrLoadModule('/src/utils/whatsapp.ts');
  ({catalog} = await server.ssrLoadModule('/src/data/catalog.ts'));
});

after(async () => {
  await server?.close();
});

const find = id => catalog.find(p => p.id === id);
const make = (id, variantId, qty, extraPrice = 0, details = []) => {
  const product = find(id);
  const variant = product.variants.find(v => v.id === variantId);
  return {key: `${id}-${variantId}`, productId: id, name: product.name, image: '', variantId, variantName: variant.name,
    unitPrice: variant.price, quantity: qty, extraPrice, total: 0, priceFrom: Boolean(variant.priceFrom), details};
};

const customer = {name: 'João D’Ávila', delivery: '', zip: '', date: ''};

test('catálogo real: preços e variantes de garrafas', () => {
  assert.deepEqual(find('garrafa-entre-guias').variants.map(v => [v.id, v.price]), [
    ['canudo-600', 99], ['canudo-900', 129], ['infusor-600', 99], ['infusor-1000', 139],
  ]);
  assert.equal(find('garrafa-entre-guias').variants.some(v => v.id === 'infusor-900'), false);
});

test('carimbadinhos: pedido mínimo 50 e incremento de uma unidade', () => {
  const p = find('carimbadinhos');
  assert.equal(p.minQty, 50);
  assert.equal(p.step, 1);
  assert.equal(order.quantityFor(p, 1), 50);
  assert.equal(order.quantityFor(p, 51), 51);
  assert.equal(order.quantityFor(p, 60), 60);
});

test('taxa única de carimbo é somada uma vez, independentemente da quantidade', () => {
  assert.equal(order.lineTotal(2.5, 50, 40), 165);
  assert.equal(order.lineTotal(2.5, 100, 40), 290);
  assert.equal(order.lineTotal(2.5, 50, 0), 125);
});

test('arredondamento monetário em centavos', () => {
  assert.equal(order.lineTotal(2.5, 51, 40), 167.5);
  assert.equal(order.orderTotal([{total: 0.1}, {total: 0.2}]), 0.3);
});

test('migração de carrinho antigo preserva variante e personalização', () => {
  const old = make('garrafa-entre-guias', 'canudo-900', 1, 0, [{label:'Personalização',value:'Oxóssi'}]);
  delete old.variantId;
  old.total = 0;
  const normalized = order.normalizeCartItems([old]);
  assert.equal(normalized.length, 1);
  assert.equal(normalized[0].variantId, 'canudo-900');
  assert.equal(normalized[0].unitPrice, 129);
  assert.equal(normalized[0].total, 129);
  assert.equal(normalized[0].details[0].value, 'Oxóssi');
});

test('carrinho trata dados inválidos sem travar', () => {
  assert.deepEqual(order.normalizeCartItems(null), []);
  assert.deepEqual(order.normalizeCartItems([null, {}, {productId:'desconhecido'}]), []);
});

test('atualização de quantidade respeita mínimo e recalcula subtotal', () => {
  const item = order.normalizeItem(make('carimbadinhos', 'unidade', 50, 40));
  assert.equal(order.updateLineQuantity([item], item.key, 12)[0].quantity, 50);
  assert.equal(order.updateLineQuantity([item], item.key, 61)[0].total, 192.5);
});

test('variantes distintas permanecem separadas', () => {
  const a = order.normalizeItem(make('prato-memoria', 'atelier-relevo', 1));
  const b = order.normalizeItem(make('prato-memoria', 'exclusiva-mao', 1));
  assert.equal(order.normalizeCartItems([a,b]).length, 2);
  assert.notEqual(a.variantId, b.variantId);
  assert.equal(order.orderTotal([a,b]), 388);
});

test('arte do atelier e exclusiva têm preços corretos', () => {
  assert.deepEqual(find('prato-memoria').variants.map(v => v.price), [129, 179, 199, 259]);
});

test('presente com garrafa exige modelo do catálogo sem supor preços por tamanho', () => {
  const p = find('presente-garrafa');
  const field = p.fields.find(f => f.id === 'bottle');
  assert.equal(field.required, true);
  assert.deepEqual(field.options, ['Com canudo · 600 ml', 'Com canudo · 900 ml', 'Com infusor · 600 ml', 'Com infusor · 1000 ml']);
  assert.equal(p.variants[0].priceFrom, true);
});

test('pedido com extras informa taxa discriminada e valor estimado', () => {
  const item = order.normalizeItem(make('carimbadinhos', 'unidade', 50, 40, [{label:'O que vai no carimbo',value:'São João'}]));
  const msg = whatsapp.buildOrderMessage([item], customer);
  assert.match(msg, /taxa única\): R\$\s*40,00/);
  assert.match(msg, /Subtotal: R\$\s*165,00/);
  assert.match(msg, /João D’Ávila/);
  assert.match(msg, /não foi confirmado nem pago/);
});

test('mensagem preserva variante e texto com acentos', () => {
  const item = order.normalizeItem(make('garrafa-entre-guias','canudo-900',1,0,[{label:'Personalização',value:'Coração & fé'}]));
  const msg = whatsapp.buildOrderMessage([item], customer);
  const url = whatsapp.whatsappUrl(msg);
  assert.match(msg, /Com canudo · 900 ml/);
  assert.equal(new URL(url).hostname, 'wa.me');
  assert.equal(new URL(url).pathname, '/5511966521589');
  assert.equal(new URL(url).searchParams.get('text'), msg);
});

test('mensagem de carrinho vazio não gera pedido', () => {
  assert.equal(whatsapp.buildOrderMessage([], customer), '');
});

test('itens sujeitos a orçamento exibem ressalva', () => {
  const item = order.normalizeItem(make('presente-garrafa','unidade',1,0,[{label:'Modelo e tamanho da garrafa',value:'Com infusor · 1000 ml'}]));
  const msg = whatsapp.buildOrderMessage([item], customer);
  assert.match(msg, /valores a partir de/);
  assert.match(msg, /a confirmar|confirmados pelo atelier/);
  assert.match(msg, /Com infusor · 1000 ml/);
});

test('adicionar e remover itens mantém demais configurações', () => {
  const a = order.normalizeItem(make('singelos', 'unidade', 1, 0, [{label:'Frase',value:'Fé'}]));
  const b = order.normalizeItem(make('prato-essencia', 'unidade', 1));
  const items = order.appendCartItem([], a);
  const withMore = order.appendCartItem(items, b);
  assert.equal(withMore.length, 2);
  const afterRemove = order.removeCartItem(withMore, a.key);
  assert.equal(afterRemove.length, 1);
  assert.equal(afterRemove[0].productId, 'prato-essencia');
});

test('persistência local recupera o carrinho', async () => {
  const storage = (await server.ssrLoadModule('/src/utils/storage.ts'));
  const values = new Map();
  globalThis.window = {localStorage: {getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value)}};
  const data = {items:[order.normalizeItem(make('singelos','unidade',1))],customer};
  assert.equal(storage.writeStorage('trassu-pedido', data), true);
  assert.deepEqual(storage.readStorage('trassu-pedido', {}), data);
  delete globalThis.window;
});
