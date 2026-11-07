import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageChrome } from '../Layout';
import { S } from '../shared';

// Shown for any URL that doesn't match a real page (before: blank white page).
// Keeps the visitor one tap away from a call/WhatsApp and tells Google not to index it.
export default function NotFound() {
  useEffect(() => {
    document.title = 'Pagina non trovata — Nardin Autotrasporti';
    const robots = document.querySelector('meta[name="robots"]');
    const previous = robots?.getAttribute('content') ?? null;
    robots?.setAttribute('content', 'noindex, follow');
    return () => {
      if (robots && previous !== null) robots.setAttribute('content', previous);
    };
  }, []);

  const btn = { padding: '14px 28px', textDecoration: 'none', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const };

  return (
    <PageChrome>
      <section style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', paddingTop: 140, paddingBottom: 80 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
          <h1 style={{ fontFamily: S.bebas, fontSize: 'clamp(36px,6vw,64px)', lineHeight: 1, color: S.text, marginBottom: 16 }}>
            Pagina <span style={{ color: S.orange }}>non trovata</span>
          </h1>
          <p style={{ color: S.muted, fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>
            L'indirizzo che hai aperto non esiste. Cerchi un'autogrù o un trasporto speciale a Trento? Chiamaci o scrivici: rispondiamo subito.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <a href="tel:+390461990268" onClick={() => window.gtag?.('event', 'phone_click')} style={{ ...btn, background: S.orange, color: '#fff' }}>Chiama 0461 990268</a>
            <a href="https://wa.me/393484420285" target="_blank" rel="noopener noreferrer" onClick={() => window.gtag?.('event', 'whatsapp_click')} style={{ ...btn, background: '#16A34A', color: '#fff' }}>WhatsApp</a>
            <Link to="/noleggio-autogru-trento" style={{ ...btn, border: `1px solid ${S.border}`, color: S.text }}>Noleggio autogrù</Link>
            <Link to="/" style={{ ...btn, border: `1px solid ${S.border}`, color: S.text }}>Home</Link>
          </div>
        </div>
      </section>
    </PageChrome>
  );
}
