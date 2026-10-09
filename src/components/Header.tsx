import {Settings2, ShoppingBag} from 'lucide-react';
import type {Route} from '../types';
import {BrandMark} from './BrandMark';
import {isActive, navItems} from './navigation';

interface Props {
  route: Route;
  cartCount: number;
  onCartPress: () => void;
  onNavigate: (route: Route) => void;
}

export function Header({route, cartCount, onCartPress, onNavigate}: Props) {
  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-[60px] w-[min(1180px,100%-2.5rem)] items-center justify-between gap-4 md:h-[68px]">
        <BrandMark onClick={() => onNavigate({page: 'home'})} />
        <nav aria-label="Principal" className="hidden gap-8 text-[0.95rem] lg:flex">
          {navItems.slice(1).map(item => (
            <button
              key={item.label}
              aria-current={isActive(item, route) ? 'page' : undefined}
              onClick={() => onNavigate(item.route)}
              className="cursor-pointer border-b border-transparent py-1 text-muted hover:border-blush hover:text-ink aria-[current=page]:border-ink aria-[current=page]:text-ink">
              {item.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-1.5 md:gap-2">
          <button
            onClick={() => onNavigate({page: 'admin'})}
            aria-label="Painel da loja"
            title="Painel da loja"
            className="hidden size-10 cursor-pointer place-items-center rounded-full text-muted hover:bg-linen hover:text-ink min-[400px]:grid">
            <Settings2 className="size-[18px]" strokeWidth={1.5} />
          </button>
          <button
            onClick={onCartPress}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border border-line px-3.5 text-[0.95rem] hover:border-ink-soft md:px-4">
            <ShoppingBag className="size-[18px]" strokeWidth={1.5} />
            Pedido
            <span
              className={`inline-grid h-[1.4rem] min-w-[1.4rem] place-items-center rounded-full px-1.5 text-xs font-semibold ${
                cartCount ? 'bg-ink text-paper' : 'bg-line text-muted'
              }`}>
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
