import React, { Suspense, lazy, useEffect, type ComponentType } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
// Each page is loaded on demand: a visitor landing on a service page (e.g. from
// Google Ads) no longer downloads the much larger Home page code first.
// lazyPage() also exposes preload(): before the first render we load the current
// page's code, so React can replace the prerendered HTML without an empty flash.
type PageModule = { default: ComponentType };
function lazyPage(load: () => Promise<PageModule>) {
  let Loaded: ComponentType | null = null;
  const Lazy = lazy(load);
  const Page = (props: Record<string, never>) => (Loaded ? <Loaded {...props} /> : <Lazy {...props} />);
  Page.preload = () => load().then(m => { Loaded = m.default; });
  return Page;
}
const Home = lazyPage(() => import('./pages/Home'));
const NoleggioAutogru = lazyPage(() => import('./pages/NoleggioAutogru'));
const TrasportiEccezionali = lazyPage(() => import('./pages/TrasportiEccezionali'));
const TrasportoGruEdili = lazyPage(() => import('./pages/TrasportoGruEdili'));
const LogisticaIndustriale = lazyPage(() => import('./pages/LogisticaIndustriale'));
const NotFound = lazyPage(() => import('./pages/NotFound'));
const HomeDe = lazyPage(() => import('./pages/de/HomeDe'));
const AutokranvermietungDe = lazyPage(() => import('./pages/de/AutokranvermietungDe'));
const SchwertransporteDe = lazyPage(() => import('./pages/de/SchwertransporteDe'));
const BaukranDe = lazyPage(() => import('./pages/de/BaukranDe'));
const IndustrielogistikDe = lazyPage(() => import('./pages/de/IndustrielogistikDe'));

const PRELOAD: Record<string, { preload: () => Promise<void> }> = {
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
import './index.css';

// Scrolls to the top of the page every time the route changes.
// React Router doesn't do this automatically — without it, navigating to a
// new page keeps whatever scroll position the previous page was left at.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
const pagePreload = (PRELOAD[currentPath] ?? NotFound).preload();

pagePreload.catch(() => undefined).finally(() => ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/noleggio-autogru-trento" element={<NoleggioAutogru />} />
        <Route path="/trasporti-eccezionali-trentino" element={<TrasportiEccezionali />} />
        <Route path="/trasporto-gru-edili" element={<TrasportoGruEdili />} />
        <Route path="/logistica-industriale" element={<LogisticaIndustriale />} />
        <Route path="/de" element={<HomeDe />} />
        <Route path="/de/autokranvermietung-trient" element={<AutokranvermietungDe />} />
        <Route path="/de/schwertransporte-trentino" element={<SchwertransporteDe />} />
        <Route path="/de/baukran-transport-montage" element={<BaukranDe />} />
        <Route path="/de/industrielogistik" element={<IndustrielogistikDe />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
));
