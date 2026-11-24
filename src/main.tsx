import React, { Suspense, lazy, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
// Each page is loaded on demand: a visitor landing on a service page (e.g. from
// Google Ads) no longer downloads the much larger Home page code first.
const Home = lazy(() => import('./pages/Home'));
const NoleggioAutogru = lazy(() => import('./pages/NoleggioAutogru'));
const TrasportiEccezionali = lazy(() => import('./pages/TrasportiEccezionali'));
const TrasportoGruEdili = lazy(() => import('./pages/TrasportoGruEdili'));
const LogisticaIndustriale = lazy(() => import('./pages/LogisticaIndustriale'));
const NotFound = lazy(() => import('./pages/NotFound'));
const HomeDe = lazy(() => import('./pages/de/HomeDe'));
const AutokranvermietungDe = lazy(() => import('./pages/de/AutokranvermietungDe'));
const SchwertransporteDe = lazy(() => import('./pages/de/SchwertransporteDe'));
const BaukranDe = lazy(() => import('./pages/de/BaukranDe'));
const IndustrielogistikDe = lazy(() => import('./pages/de/IndustrielogistikDe'));
// Fonts served from our own domain instead of Google Fonts: one less external,
// render-blocking request on every page (latin subset covers Italian and German).
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';
import '@fontsource/bebas-neue/latin-400.css';
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

ReactDOM.createRoot(document.getElementById('root')!).render(
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
);
