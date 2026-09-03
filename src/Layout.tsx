import { useState, useEffect, ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { S } from './shared';

const ROUTE_NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/noleggio-autogru-trento', label: 'Noleggio Autogrù' },
  { to: '/trasporti-eccezionali-trentino', label: 'Trasporti Eccezionali' },
  { to: '/trasporto-gru-edili', label: 'Gru Edili' },
  { to: '/logistica-industriale', label: 'Logistica' },
];

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

function trackPhoneClick() {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'phone_click');
  }
}

function trackWhatsAppClick() {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'whatsapp_click');
  }
}

export function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 900);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return mobile;
}

// Navigates to a section. If it's not on the homepage, goes home first then scrolls.
export function useSectionNav() {
  const navigate = useNavigate();
  const location = useLocation();
  return (id: string) => {
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 60);
    }
  };
}

export function Navbar({ mobile }: { mobile: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openMenu = () => { setMenuOpen(true); document.body.style.overflow = 'hidden'; };
  const closeMenu = () => { setMenuOpen(false); document.body.style.overflow = 'unset'; };

  return (
    <>
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 150, background: S.black, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
          <button onClick={closeMenu} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: S.text, fontSize: 28, cursor: 'pointer' }}>×</button>
          {ROUTE_NAV_ITEMS.map(item => (
            <Link key={item.to} to={item.to} onClick={closeMenu} style={{ color: S.text, textDecoration: 'none', cursor: 'pointer', fontFamily: S.bebas, fontSize: 34, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {item.label}
            </Link>
          ))}
          <a href="tel:+390461990268" onClick={trackPhoneClick} style={{ background: S.orange, color: '#fff', padding: '12px 32px', textDecoration: 'none', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 8 }}>CHIAMA ORA</a>
        </div>
      )}

      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? 'rgba(10,10,10,0.97)' : 'transparent', borderBottom: scrolled ? `1px solid ${S.border}` : '1px solid transparent', padding: scrolled ? '10px 0' : '18px 0', transition: 'all 0.3s' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ cursor: 'pointer' }}>
            <img src="/images/logo-nardin.png" alt="Nardin Autotrasporti" style={{ height: 72, width: 'auto', objectFit: 'contain' }} onError={e => { e.currentTarget.style.display = 'none'; }} />
          </Link>
          {!mobile && (
            <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
              {ROUTE_NAV_ITEMS.map(item => (
                <Link key={item.to} to={item.to} style={{ color: S.gray, textDecoration: 'none', cursor: 'pointer', fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}
                  onMouseEnter={e => (e.currentTarget.style.color = S.text)}
                  onMouseLeave={e => (e.currentTarget.style.color = S.gray)}
                >{item.label}</Link>
              ))}
              <a href="tel:+390461990268" onClick={trackPhoneClick} style={{ background: S.orange, color: '#fff', padding: '9px 18px', textDecoration: 'none', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>CHIAMA ORA</a>
            </div>
          )}
          {mobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <a href="tel:+390461990268" onClick={trackPhoneClick} style={{ background: S.orange, color: '#fff', padding: '8px 14px', textDecoration: 'none', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>CHIAMA</a>
              <button onClick={openMenu} style={{ background: 'none', border: `1px solid ${S.border}`, color: S.text, width: 36, height: 36, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                <span style={{ width: 16, height: 2, background: S.text, display: 'block' }} />
                <span style={{ width: 16, height: 2, background: S.text, display: 'block' }} />
                <span style={{ width: 16, height: 2, background: S.text, display: 'block' }} />
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export function Footer() {
  const go = useSectionNav();
  return (
    <footer style={{ background: S.black, borderTop: `1px solid ${S.border}`, padding: 'clamp(36px,6vw,72px) 0 100px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40, flexWrap: 'wrap', gap: 28 }}>
          <div>
            <img src="/images/logo-nardin.png" alt="Nardin Autotrasporti" style={{ height: 56, width: 'auto', objectFit: 'contain', marginBottom: 12 }} onError={e => { e.currentTarget.style.display = 'none'; }} />
            <p style={{ color: S.gray, fontSize: 12, maxWidth: 280, lineHeight: 1.6 }}>Noleggio autogrù, trasporti eccezionali e sollevamenti industriali a Trento dal 1980.</p>
            <p style={{ color: '#374151', fontSize: 11, marginTop: 12, lineHeight: 1.7 }}>
              Nardin Autotrasporti s.n.c. di Nardin Walter e Ivana<br />P.IVA 01762870226 · Albo TN/2053832Z<br />Assicurazione Vettoriale All-Risks
            </p>
          </div>
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: S.orange, textTransform: 'uppercase', marginBottom: 12 }}>Servizi</p>
              {[
                { to: '/noleggio-autogru-trento', label: 'Noleggio Autogrù' },
                { to: '/trasporti-eccezionali-trentino', label: 'Trasporti Eccezionali' },
                { to: '/trasporto-gru-edili', label: 'Trasporto Gru Edili' },
                { to: '/logistica-industriale', label: 'Logistica Industriale' },
              ].map(s => (
                <Link key={s.to} to={s.to} style={{ display: 'block', color: S.gray, fontSize: 12, padding: '3px 0', textDecoration: 'none' }}>{s.label}</Link>
              ))}
            </div>
            <div>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: S.orange, textTransform: 'uppercase', marginBottom: 12 }}>Navigazione</p>
              {[
                { id: 'chi-siamo', label: 'chi siamo' },
                { id: 'servizi', label: 'servizi' },
                { id: 'flotta', label: 'flotta' },
                { id: 'contatti', label: 'contatti' },
              ].map(item => (
                <button key={item.id} onClick={() => go(item.id)} style={{ display: 'block', background: 'none', border: 'none', color: S.gray, cursor: 'pointer', fontSize: 12, textTransform: 'capitalize', padding: '3px 0', textAlign: 'left' }}
                  onMouseEnter={e => (e.currentTarget.style.color = S.text)}
                  onMouseLeave={e => (e.currentTarget.style.color = S.gray)}
                >{item.label}</button>
              ))}
            </div>
            <div>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: S.orange, textTransform: 'uppercase', marginBottom: 12 }}>Contatti</p>
              <p style={{ color: S.gray, fontSize: 12, lineHeight: 1.9 }}>
                Via Aeroporto, 31<br />38121 Trento (TN)<br />
                <a href="tel:+390461990268" onClick={trackPhoneClick} style={{ color: S.gray, textDecoration: 'none' }}>+39 0461 990268</a><br />
                <a href="https://wa.me/393484420285" onClick={trackWhatsAppClick} style={{ color: '#22C55E', textDecoration: 'none', fontSize: 11 }}>WhatsApp H24</a><br />
                <a href="mailto:info@nardinautotrasporti.it" style={{ color: S.orange, textDecoration: 'none', fontSize: 11 }}>info@nardinautotrasporti.it</a>
              </p>
            </div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${S.border}`, paddingTop: 20, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <p style={{ fontSize: 10, color: '#374151' }}>© 2026 Nardin Autotrasporti s.n.c. — Tutti i diritti riservati</p>
          <a href="https://www.instagram.com/nardinautotrasporti/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, fontWeight: 700, color: '#374151', textDecoration: 'none', textTransform: 'uppercase' }}>Instagram</a>
        </div>
      </div>
    </footer>
  );
}

export function StickyMobileBar({ onPreventivo }: { onPreventivo: () => void }) {
  return (
    <div className="mobile-cta-bar" style={{ display: 'none', position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 120, background: '#0A0A0A', borderTop: `1px solid ${S.border}`, padding: '10px 16px', gap: 8 }}>
      <a href="tel:+390461990268" onClick={trackPhoneClick} style={{ flex: 1, background: S.orange, color: '#fff', padding: '12px 8px', textDecoration: 'none', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center', display: 'block' }}>📞 CHIAMA</a>
      <a href="https://wa.me/393484420285" onClick={trackWhatsAppClick} target="_blank" rel="noopener noreferrer" style={{ flex: 1, background: '#16A34A', color: '#fff', padding: '12px 8px', textDecoration: 'none', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center', display: 'block' }}>💬 WHATSAPP</a>
      <button onClick={onPreventivo} style={{ flex: 1, background: S.dark, color: S.text, border: `1px solid ${S.border}`, padding: '12px 8px', cursor: 'pointer', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>PREVENTIVO</button>
    </div>
  );
}

export function WhatsAppFab({ mobile }: { mobile: boolean }) {
  if (mobile) return null;
  return (
    <a href="https://wa.me/393484420285" onClick={trackWhatsAppClick} target="_blank" rel="noopener noreferrer" style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 110, background: '#16A34A', color: '#fff', width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', border: '2px solid rgba(255,255,255,0.15)' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.539 2.016 2.126-.54c1.029.563 2.025.844 3.162.844 3.181 0 5.767-2.586 5.768-5.766.001-3.18-2.587-5.767-5.768-5.767zm3.39 8.251c-.146.415-.852.756-1.201.838-.34.08-.783.14-1.258-.02-.275-.092-.591-.219-1.025-.407-1.84-.794-3.037-2.673-3.129-2.797-.093-.125-.751-.998-.751-1.913 0-.915.481-1.363.652-1.547.171-.184.372-.231.496-.231s.248.001.356.006c.115.005.27-.042.423.328.158.382.541 1.32.588 1.414.047.094.078.204.016.331-.062.126-.093.204-.186.31l-.279.325c-.093.107-.191.224-.083.41.108.187.481.794 1.033 1.285.711.634 1.312.83 1.5.922.188.092.297.077.406-.05.109-.127.466-.541.59-.727.124-.186.248-.156.417-.094s1.071.505 1.257.599c.186.094.31.141.356.221s.047.533-.099.948zM12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11-11-4.925-11-11 4.925-11 11-11z" />
      </svg>
    </a>
  );
}

export function PageChrome({ children }: { children: ReactNode }) {
  const mobile = useIsMobile();
  const go = useSectionNav();
  return (
    <div style={{ fontFamily: S.inter, background: S.black, color: S.text, overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input:focus, textarea:focus, select:focus { border-color: #EA580C !important; }
        @media (max-width: 899px) { .mobile-cta-bar { display: flex !important; } body { padding-bottom: 64px; } }
      `}</style>
      <Navbar mobile={mobile} />
      {children}
      <Footer />
      <StickyMobileBar onPreventivo={() => {
        if (document.getElementById('contatti-servizio')) go('contatti-servizio');
        else go('contatti');
      }} />
      <WhatsAppFab mobile={mobile} />
    </div>
  );
}
