import {ClipboardList, Flower2, House, LayoutGrid, type LucideIcon} from 'lucide-react';
import type {Route} from '../types';

export interface NavItem {
  label: string;
  short: string;
  route: Route;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  {label: 'Início', short: 'Início', route: {page: 'home'}, icon: House},
  {label: 'Catálogo', short: 'Catálogo', route: {page: 'catalog'}, icon: LayoutGrid},
  {label: 'O atelier', short: 'Atelier', route: {page: 'atelier'}, icon: Flower2},
  {label: 'Como encomendar', short: 'Encomendar', route: {page: 'info'}, icon: ClipboardList},
];

export function isActive(item: NavItem, route: Route) {
  if (route.page === 'product') return item.route.page === 'catalog';
  return item.route.page === route.page;
}
