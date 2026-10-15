import {useCallback, useEffect, useRef, useState} from 'react';
import type {Route} from '../types';

const legacy: Record<string, Route> = {
  sobre: {page: 'atelier'},
  'como-funciona': {page: 'info'},
  cuidados: {page: 'info', section: 'cuidados'},
  duvidas: {page: 'info', section: 'duvidas'},
};

function parse(hash: string): Route {
  const [head, ...rest] = hash.replace(/^#\/?/, '').split('/');
  const tail = rest.length ? decodeURIComponent(rest.join('/')) : undefined;
  if (head === 'produto' && tail) return {page: 'product', id: tail};
  if (head === 'catalogo') return {page: 'catalog', category: tail};
  if (head === 'atelier') return {page: 'atelier'};
  if (head === 'encomendas') return {page: 'info', section: tail};
  return legacy[head] ?? {page: 'home'};
}

function toHash(route: Route) {
  switch (route.page) {
    case 'product':
      return `#/produto/${encodeURIComponent(route.id)}`;
    case 'catalog':
      return route.category ? `#/catalogo/${route.category}` : '#/catalogo';
    case 'atelier':
      return '#/atelier';
    case 'info':
      return route.section ? `#/encomendas/${route.section}` : '#/encomendas';
    default:
      return '#/';
  }
}

export function useHashRoute() {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash));
  const previousPage = useRef<Route['page']>();

  useEffect(() => {
    const onChange = () => {
      const next = parse(window.location.hash);
      if (next.page === 'home' && window.location.hash !== '#/') window.history.replaceState(null, '', '#/');
      setRoute(next);
    };
    onChange();
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  useEffect(() => {
    const samePage = previousPage.current === route.page;
    previousPage.current = route.page;
    if (route.page === 'info' && route.section) {
      const id = route.section;
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({behavior: 'smooth'}));
    } else if (!(samePage && route.page === 'catalog')) {
      window.scrollTo({top: 0});
    }
  }, [route]);

  const navigate = useCallback((next: Route) => {
    const hash = toHash(next);
    if (window.location.hash === hash) {
      setRoute(parse(hash));
    } else {
      window.location.hash = hash;
    }
  }, []);

  return {route, navigate};
}
