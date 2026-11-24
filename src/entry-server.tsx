// Build-time renderer: turns each page into static HTML (mobile and desktop
// variants) so the browser can show content before the JavaScript has loaded.
// Used only by scripts/inject-seo.mjs, never shipped to visitors.
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Home from './pages/Home';
import NoleggioAutogru from './pages/NoleggioAutogru';
import TrasportiEccezionali from './pages/TrasportiEccezionali';
import TrasportoGruEdili from './pages/TrasportoGruEdili';
import LogisticaIndustriale from './pages/LogisticaIndustriale';
import HomeDe from './pages/de/HomeDe';
import AutokranvermietungDe from './pages/de/AutokranvermietungDe';
import SchwertransporteDe from './pages/de/SchwertransporteDe';
import BaukranDe from './pages/de/BaukranDe';
import IndustrielogistikDe from './pages/de/IndustrielogistikDe';
import type { ComponentType } from 'react';

const PAGES: Record<string, ComponentType> = {
  '/': Home,
  '/noleggio-autogru-trento': NoleggioAutogru,
  '/trasporti-eccezionali-trentino': TrasportiEccezionali,
  '/trasporto-gru-edili': TrasportoGruEdili,
  '/logistica-industriale': LogisticaIndustriale,
  '/de': HomeDe,
  '/de/autokranvermietung-trient': AutokranvermietungDe,
  '/de/schwertransporte-trentino': SchwertransporteDe,
  '/de/baukran-transport-montage': BaukranDe,
  '/de/industrielogistik': IndustrielogistikDe,
};

export const prerenderPaths = Object.keys(PAGES);

export function render(path: string, mobile: boolean): string {
  const Page = PAGES[path];
  if (!Page) throw new Error(`No page for ${path}`);
  (globalThis as { __PRERENDER_MOBILE__?: boolean }).__PRERENDER_MOBILE__ = mobile;
  return renderToString(
    <StaticRouter location={path}>
      <Page />
    </StaticRouter>
  );
}
