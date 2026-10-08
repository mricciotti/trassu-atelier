import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {CartDrawer} from './components/CartDrawer';
import {Footer} from './components/Footer';
import {Header} from './components/Header';
import {Toast} from './components/Toast';
import {WatermarkOverlay} from './components/WatermarkOverlay';
import {WhatsAppFab} from './components/WhatsAppFab';
import {catalog} from './data/catalog';
import {defaultThemes} from './data/fields';
import {useCart} from './hooks/useCart';
import {useHashRoute} from './hooks/useHashRoute';
import {AdminScreen} from './screens/AdminScreen';
import {HomeScreen} from './screens/HomeScreen';
import {ProductScreen} from './screens/ProductScreen';
import type {AdminState, CartItem, Product} from './types';
import {applyAdminState, emptyAdminState, loadAdminState, saveAdminState} from './utils/adminCatalog';

const SHOW_WATERMARK = true;

function diffFromBase(base: Product, next: Partial<Product>) {
  return Object.fromEntries(
    Object.entries(next).filter(([key, value]) => JSON.stringify(base[key as keyof Product]) !== JSON.stringify(value)),
  ) as Partial<Product>;
}

export default function App() {
  const {route, navigate} = useHashRoute();
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [admin, setAdmin] = useState<AdminState>(() => loadAdminState());
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number>();

  const products = useMemo(() => applyAdminState(catalog, admin), [admin]);
  const themes = admin.themes ?? defaultThemes;

  const notify = useCallback((message: string) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 3200);
  }, []);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  function commit(next: AdminState, message?: string) {
    setAdmin(next);
    if (!saveAdminState(next)) {
      notify('Não foi possível salvar no navegador. Tente uma foto menor.');
    } else if (message) {
      notify(message);
    }
  }

  function updateProduct(id: string, changes: Partial<Product>) {
    const custom = admin.custom.find(product => product.id === id);
    if (custom) {
      commit({...admin, custom: admin.custom.map(product => (product.id === id ? {...product, ...changes} : product))}, 'Alteração salva');
      return;
    }
    const base = catalog.find(product => product.id === id);
    if (!base) return;
    const merged = {...admin.overrides[id], ...changes};
    commit({...admin, overrides: {...admin.overrides, [id]: diffFromBase(base, merged)}}, 'Alteração salva');
  }

  function saveProduct(product: Product) {
    const base = catalog.find(item => item.id === product.id);
    if (base) {
      commit({...admin, overrides: {...admin.overrides, [product.id]: diffFromBase(base, product)}}, 'Produto atualizado');
      return;
    }
    const exists = admin.custom.some(item => item.id === product.id);
    const custom = exists
      ? admin.custom.map(item => (item.id === product.id ? product : item))
      : [...admin.custom, {...product, custom: true}];
    commit({...admin, custom}, exists ? 'Produto atualizado' : 'Produto cadastrado');
  }

  function deleteProduct(id: string) {
    commit({...admin, custom: admin.custom.filter(product => product.id !== id)}, 'Produto excluído');
  }

  function addToCart(item: CartItem) {
    cart.add(item);
    setCartOpen(true);
  }

  const product = route.page === 'product' ? products.find(item => item.id === route.id) : undefined;
  const closeCart = useCallback(() => setCartOpen(false), []);

  return (
    <div className="min-h-dvh">
      <Header cartCount={cart.items.length} onCartPress={() => setCartOpen(true)} onNavigate={navigate} />

      {route.page === 'home' && <HomeScreen products={products} onNavigate={navigate} />}

      {route.page === 'product' &&
        (product ? (
          <ProductScreen key={product.id} product={product} themes={themes} onAddToCart={addToCart} onNavigate={navigate} />
        ) : (
          <main className="mx-auto grid w-[min(1180px,100%-2.5rem)] justify-items-start gap-4 py-24">
            <h1 className="text-3xl">Produto não encontrado</h1>
            <p className="text-muted">Ele pode ter sido removido do catálogo.</p>
            <button onClick={() => navigate({page: 'home', section: 'catalogo'})} className="cursor-pointer rounded-full bg-ink px-6 py-3 font-medium text-paper">
              Ver catálogo
            </button>
          </main>
        ))}

      {route.page === 'admin' && (
        <AdminScreen
          products={products}
          themes={themes}
          onUpdateProduct={updateProduct}
          onSaveProduct={saveProduct}
          onDeleteProduct={deleteProduct}
          onThemesChange={next => commit({...admin, themes: next}, next ? 'Temas atualizados' : 'Lista original restaurada')}
          onResetAll={() => commit(emptyAdminState, 'Catálogo original restaurado')}
          onNavigate={navigate}
        />
      )}

      <Footer onNavigate={navigate} />

      {route.page !== 'admin' && <WhatsAppFab />}

      <CartDrawer
        open={cartOpen}
        items={cart.items}
        customer={cart.customer}
        onClose={closeCart}
        onRemove={cart.remove}
        onCustomerChange={cart.setCustomer}
        onBrowse={() => {
          setCartOpen(false);
          navigate({page: 'home', section: 'catalogo'});
        }}
      />

      <Toast message={toast} />
      {SHOW_WATERMARK && <WatermarkOverlay />}
    </div>
  );
}
