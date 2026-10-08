import {useCallback, useEffect, useState} from 'react';
import type {Route} from '../types';

function parse(hash: string): Route {
  const path = hash.replace(/^#\/?/, '');
  if (path.startsWith('produto/')) {
    return {page: 'product', id: decodeURIComponent(path.slice('produto/'.length))};
  }
  if (path === 'admin') {
    return {page: 'admin'};
  }
  return {page: 'home', section: path || undefined};
}

function toHash(route: Route) {
  if (route.page === 'product') return `#/produto/${encodeURIComponent(route.id)}`;
  if (route.page === 'admin') return '#/admin';
  return route.section ? `#/${route.section}` : '#/';
}

export function useHashRoute() {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash));

  useEffect(() => {
    const onChange = () => setRoute(parse(window.location.hash));
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  useEffect(() => {
    if (route.page === 'home' && route.section) {
      const id = route.section;
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({behavior: 'smooth'}));
    } else {
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
