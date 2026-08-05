import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import NoleggioAutogru from './pages/NoleggioAutogru';
import TrasportiEccezionali from './pages/TrasportiEccezionali';
import TrasportoGruEdili from './pages/TrasportoGruEdili';
import LogisticaIndustriale from './pages/LogisticaIndustriale';
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/noleggio-autogru-trento" element={<NoleggioAutogru />} />
        <Route path="/trasporti-eccezionali-trentino" element={<TrasportiEccezionali />} />
        <Route path="/trasporto-gru-edili" element={<TrasportoGruEdili />} />
        <Route path="/logistica-industriale" element={<LogisticaIndustriale />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
