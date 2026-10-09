import type {Route} from '../types';
import {isActive, navItems} from './navigation';

interface Props {
  route: Route;
  onNavigate: (route: Route) => void;
}

export function BottomNav({route, onNavigate}: Props) {
  return (
    <nav
      aria-label="Principal"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur-md lg:hidden">
      <ul className="mx-auto grid max-w-[520px] grid-cols-4">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <li key={item.label}>
              <button
                aria-current={isActive(item, route) ? 'page' : undefined}
                onClick={() => onNavigate(item.route)}
                className="flex h-16 w-full cursor-pointer flex-col items-center justify-center gap-1 text-[0.72rem] text-muted aria-[current=page]:font-medium aria-[current=page]:text-ink">
                <Icon className="size-[21px]" strokeWidth={1.5} />
                {item.short}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
