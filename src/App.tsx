import {useCallback, useState} from 'react';
import {BottomNav} from './components/BottomNav';
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
import {AtelierScreen} from './screens/AtelierScreen';
import {CatalogScreen} from './screens/CatalogScreen';
import {HomeScreen} from './screens/HomeScreen';
import {InfoScreen} from './screens/InfoScreen';
import {ProductScreen} from './screens/ProductScreen';
import type {CartItem} from './types';

const SHOW_WATERMARK = true;

export default function App() {
  const {route, navigate} = useHashRoute();
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const products = catalog;
  const themes = defaultThemes;

  function addToCart(item: CartItem) {
    cart.add(item);
    setCartOpen(true);
  }

  const product = route.page === 'product' ? products.find(item => item.id === route.id) : undefined;
  const closeCart = useCallback(() => setCartOpen(false), []);

  const showBottomNav = !(route.page === 'product' && product?.active);

  return (
    <div className="min-h-dvh">
      <Header route={route} cartCount={cart.items.length} onCartPress={() => setCartOpen(true)} onNavigate={navigate} />

      {route.page === 'home' && <HomeScreen products={products} onNavigate={navigate} />}

      {route.page === 'catalog' && <CatalogScreen products={products} category={route.category} onNavigate={navigate} />}

      {route.page === 'atelier' && <AtelierScreen onNavigate={navigate} />}

      {route.page === 'info' && <InfoScreen section={route.section} onNavigate={navigate} />}

      {route.page === 'product' &&
        (product ? (
          <ProductScreen key={product.id} product={product} themes={themes} onAddToCart={addToCart} onNavigate={navigate} />
        ) : (
          <main className="mx-auto grid w-[min(1180px,100%-2.5rem)] justify-items-start gap-4 py-24">
            <h1 className="text-3xl">Produto não encontrado</h1>
            <p className="text-muted">Ele pode ter sido removido do catálogo.</p>
            <button onClick={() => navigate({page: 'catalog'})} className="cursor-pointer rounded-full bg-ink px-6 py-3 font-medium text-paper">
              Ver catálogo
            </button>
          </main>
        ))}

      <Footer onNavigate={navigate} />

      <WhatsAppFab />

      {showBottomNav && <BottomNav route={route} onNavigate={navigate} />}

      <CartDrawer
        open={cartOpen}
        items={cart.items}
        customer={cart.customer}
        onClose={closeCart}
        onRemove={cart.remove}
        onCustomerChange={cart.setCustomer}
        onBrowse={() => {
          setCartOpen(false);
          navigate({page: 'catalog'});
        }}
      />

      <Toast message={null} />
      {SHOW_WATERMARK && <WatermarkOverlay />}
    </div>
  );
}
