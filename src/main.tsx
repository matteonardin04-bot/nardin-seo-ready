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
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
