import {Settings2, ShoppingBag} from 'lucide-react';
import type {Route} from '../types';
import {BrandMark} from './BrandMark';

interface Props {
  cartCount: number;
  onCartPress: () => void;
  onNavigate: (route: Route) => void;
}

const links = [
  {label: 'Catálogo', section: 'catalogo'},
  {label: 'Como encomendar', section: 'como-funciona'},
  {label: 'Quem somos', section: 'sobre'},
  {label: 'Cuidados', section: 'cuidados'},
  {label: 'Dúvidas', section: 'duvidas'},
];

export function Header({cartCount, onCartPress, onNavigate}: Props) {
  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] w-[min(1180px,100%-2.5rem)] items-center justify-between gap-4">
        <BrandMark onClick={() => onNavigate({page: 'home'})} />
        <nav aria-label="Principal" className="hidden gap-7 text-[0.95rem] lg:flex">
          {links.map(link => (
            <button
              key={link.section}
              onClick={() => onNavigate({page: 'home', section: link.section})}
              className="cursor-pointer border-b border-transparent py-1 text-muted hover:border-blush hover:text-ink">
              {link.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate({page: 'admin'})}
            aria-label="Painel da loja"
            title="Painel da loja"
            className="grid size-10 cursor-pointer place-items-center rounded-full text-muted hover:bg-linen hover:text-ink">
            <Settings2 className="size-[18px]" strokeWidth={1.5} />
          </button>
          <button
            onClick={onCartPress}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line px-4 py-2 text-[0.95rem] hover:border-ink-soft">
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
