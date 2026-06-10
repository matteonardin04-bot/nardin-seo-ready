import React, { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';

const fleetData = [
  { id: 'f1', name: 'SCANIA R770 + EFFER 955', cat: 'Gru', cap: '95 t/m — 770 CV', img: 'images/flotta-1.jpg', desc: 'Top di gamma per sollevamenti industriali pesanti. Equipaggiato con Jib per sbracci estremi.' },
  { id: 'f2', name: 'SCANIA R730 + GRU EFFER', cat: 'Gru', cap: 'V8 — 730 CV', img: 'images/flotta-2.jpg', desc: 'Potenza pura unita alla versatilità delle gru Effer per carichi impegnativi.' },
  { id: 'f4', name: 'VOLVO 3 ASSI + EFFER 525', cat: 'Gru', cap: '52.5 t/m', img: 'images/flotta-4.jpg', desc: 'Equilibrio perfetto tra capacità di carico e agilità di manovra.' },
  { id: 'f6', name: 'MERCEDES 2 ASSI + EFFER 375', cat: 'Gru', cap: '37.5 t/m', img: 'images/flotta-8.jpg', desc: 'Unità compatta per lavori in centri urbani e spazi ristretti.' },
  { id: 'f3', name: 'SCANIA S520 2 ASSI', cat: 'Camion', cap: '520 CV V8', img: 'images/flotta-3.jpg', desc: 'Motrice dedicata al traino di semirimorchi ribassati per trasporti nazionali.' },
  { id: 'f5', name: 'SCANIA R560 2 ASSI', cat: 'Camion', cap: '560 CV V8', img: 'images/flotta-7.jpg', desc: 'Potenza e versatilità per trasporti a lungo raggio e logistica pesante.' },
  { id: 'f4c', name: 'VOLVO 3 ASSI + EFFER 525', cat: 'Camion', cap: '52.5 t/m', img: 'images/flotta-4.jpg', desc: 'Equilibrio perfetto tra capacità di carico e agilità di manovra.' },
  { id: 'f6c', name: 'MERCEDES 2 ASSI + EFFER 375', cat: 'Camion', cap: '37.5 t/m', img: 'images/flotta-8.jpg', desc: 'Unità compatta e potente per lavori in centri urbani e spazi ristretti.' },
  { id: 'r1', name: "PIANALE COLLO D'OCA 3 ASSI", cat: 'Rimorchi', cap: '3 Assi — Rampe', img: 'images/flotta-5.jpg', desc: "Pianale tecnico FGM a 3 assi con rampe idrauliche per il carico di mezzi d'opera." },
  { id: 'r3', name: "PIANALE COLLO D'OCA 4 ASSI", cat: 'Rimorchi', cap: '4 Assi — Carichi Pesanti', img: 'images/flotta-9.jpg', desc: 'Soluzione robusta a 4 assi per il trasporto di macchinari industriali pesanti.' },
  { id: 'r4', name: 'CULLA RIBASSATO 3 ASSI', cat: 'Rimorchi', cap: 'Altezza ridotta', img: 'images/flotta-10.jpg', desc: 'Ideale per macchine agricole o operatrici con altezza elevata.' },
  { id: 'r5', name: 'PIANALE ALLUNGABILE 3 ASSI', cat: 'Rimorchi', cap: 'Lunghezza variabile', img: 'images/flotta-11.jpg', desc: 'Per travi, prefabbricati e carichi longitudinali eccezionali.' },
  { id: 'r6', name: 'PIANALE PASSO CORTO 2 ASSI', cat: 'Rimorchi', cap: 'Agile — 2 Assi', img: 'images/flotta-12.jpg', desc: 'Compattezza e manovrabilità per carichi meno ingombranti.' },
  { id: 'r7', name: 'CENTINATO 3 ASSI', cat: 'Rimorchi', cap: 'Merci pallettizzate', img: 'images/flotta-13.jpg', desc: 'Teli scorrevoli per il trasporto di merci pallettizzate e carichi protetti.' },
];

const categories = ['Gru', 'Camion', 'Rimorchi'];

const testimonials = [
  { name: 'Andrea M.', comp: 'Mak Costruzioni', text: 'Collaboriamo con Nardin per i sollevamenti più delicati. Ineguagliabili.', spec: 'Sollevamenti Speciali' },
  { name: 'Giuseppe B.', comp: 'E-Mac / GB Manci', text: 'Esperti assoluti nel trasporto di gru a torre. Logistica impeccabile.', spec: 'Trasporto Gru' },
  { name: 'Luca T.', comp: 'Tecnoedil', text: 'Professionalità e mezzi sempre al top. Un riferimento a Trento.', spec: 'Trasporto Gru' },
  { name: 'Hans G.', comp: 'Geobau', text: 'Unica scelta possibile per contesti alpini difficili.', spec: 'Trasporto Sonde' },
];

const projects = [
  { id: 'p1', title: 'Sollevamento Strutture Cemento', cat: 'Cantieristica', img: 'images/progetto-1.jpg' },
  { id: 'p2', title: 'Logistica Vigneti Eroici', cat: 'Agricoltura', img: 'images/progetto-2.jpg' },
  { id: 'p3', title: 'Movimentazione Gru Potain', cat: 'Trasporti Speciali', img: 'images/progetto-3.jpg' },
];

const S = {
  orange: '#EA580C',
  black: '#0A0A0A',
  dark: '#111111',
  border: '#1C1C1C',
  text: '#F5F5F0',
  muted: '#9CA3AF',
  gray: '#6B7280',
  bebas: "'Bebas Neue', sans-serif",
  inter: "'Inter', sans-serif",
};

export default function App() {
  const [tab, setTab] = useState('Gru');
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalId, setModalId] = useState<string | null>(null);
  const [state, handleSubmit] = useForm('xnjowlpd');

  useEffect(() => {
    const checkMobile = () => setMobile(window.innerWidth < 900);
    const checkScroll = () => setScrolled(window.scrollY > 50);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', checkScroll);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  const openMenu = () => { setMenuOpen(true); document.body.style.overflow = 'hidden'; };
  const closeMenu = () => { setMenuOpen(false); document.body.style.overflow = 'unset'; };

  const fleet = fleetData.filter(m => m.cat === tab);
  const modal = fleetData.find(m => m.id === modalId);

  return (
    <div style={{ fontFamily: S.inter, background: S.black, color: S.text, overflowX: 'hidden' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
        #ticker { animation: ticker 35s linear infinite; display: flex; white-space: nowrap; }
      `}</style>

      {/* MODAL */}
      {modal && (
        <div onClick={() => setModalId(null)} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: S.dark, border: `1px solid ${S.border}`, maxWidth: 680, width: '100%', overflow: 'hidden' }}>
            <div style={{ height: 280, overflow: 'hidden', position: 'relative' }}>
              <img src={modal.img} alt={modal.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #111 0%, transparent 60%)' }} />
              <button onClick={() => setModalId(null)} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(0,0,0,0.7)', border: `1px solid ${S.border}`, color: S.text, width: 36, height: 36, cursor: 'pointer', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
              <span style={{ position: 'absolute', bottom: 16, left: 20, background: S.orange, color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', padding: '3px 10px', textTransform: 'uppercase' }}>{modal.cat}</span>
            </div>
            <div style={{ padding: '24px 28px 28px' }}>
              <div style={{ fontFamily: S.bebas, fontSize: 30, letterSpacing: '0.05em', color: S.text, marginBottom: 8 }}>{modal.name}</div>
              <div style={{ display: 'inline-block', background: S.border, padding: '4px 12px', marginBottom: 14 }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: S.orange, textTransform: 'uppercase' }}>{modal.cap}</span>
              </div>
              <p style={{ color: S.muted, fontSize: 14, lineHeight: 1.65, marginBottom: 20 }}>{modal.desc}</p>
              <button onClick={() => { setModalId(null); go('contatti'); }} style={{ width: '100%', background: S.orange, color: '#fff', border: 'none', padding: 14, cursor: 'pointer', fontWeight: 700, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                RICHIEDI PREVENTIVO
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 150, background: S.black, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
          <button onClick={closeMenu} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: S.text, fontSize: 28, cursor: 'pointer' }}>×</button>
          {['home', 'chi-siamo', 'servizi', 'flotta', 'portfolio', 'contatti'].map(id => (
            <button key={id} onClick={() => go(id)} style={{ background: 'none', border: 'none', color: S.text, cursor: 'pointer', fontFamily: S.bebas, fontSize: 36, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {id.replace('-', ' ')}
            </button>
          ))}
          <a href="tel:+390461990268" style={{ background: S.orange, color: '#fff', padding: '12px 32px', textDecoration: 'none', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>CHIAMA ORA</a>
        </div>
      )}

      {/* NAVBAR */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? 'rgba(10,10,10,0.97)' : 'transparent', borderBottom: scrolled ? `1px solid ${S.border}` : '1px solid transparent', padding: scrolled ? '12px 0' : '20px 0', transition: 'all 0.3s' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          {/* LOGO */}
          <div onClick={() => go('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ background: S.orange, padding: '5px 10px', fontFamily: S.bebas, fontSize: 20, letterSpacing: '0.05em', color: '#fff' }}>NARDIN</div>
            <span style={{ fontFamily: S.bebas, fontSize: 15, letterSpacing: '0.2em', color: S.text }}>AUTOTRASPORTI</span>
          </div>

          {/* DESKTOP LINKS */}
          {!mobile && (
            <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
              {['chi-siamo', 'servizi', 'flotta', 'portfolio', 'contatti'].map(id => (
                <button key={id} onClick={() => go(id)} style={{ background: 'none', border: 'none', color: S.gray, cursor: 'pointer', fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', padding: 0 }}
                  onMouseEnter={e => (e.currentTarget.style.color = S.text)}
                  onMouseLeave={e => (e.currentTarget.style.color = S.gray)}
                >{id.replace('-', ' ')}</button>
              ))}
              <a href="tel:+390461990268" style={{ background: S.orange, color: '#fff', padding: '9px 18px', textDecoration: 'none', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>CHIAMA ORA</a>
            </div>
          )}

          {/* MOBILE BUTTONS */}
          {mobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <a href="tel:+390461990268" style={{ background: S.orange, color: '#fff', padding: '8px 14px', textDecoration: 'none', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>CHIAMA</a>
              <button onClick={openMenu} style={{ background: 'none', border: `1px solid ${S.border}`, color: S.text, width: 36, height: 36, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                <span style={{ width: 16, height: 2, background: S.text, display: 'block' }} />
                <span style={{ width: 16, height: 2, background: S.text, display: 'block' }} />
                <span style={{ width: 16, height: 2, background: S.text, display: 'block' }} />
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section id="home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'flex-end', paddingBottom: 80, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="images/hero.jpg" alt="Nardin Autotrasporti" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0A0A0A 40%, transparent 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0A0A0A 20%, transparent 70%)' }} />
        </div>
        <div style={{ position: 'absolute', right: '-2%', bottom: '5%', fontFamily: S.bebas, fontSize: 'clamp(140px, 22vw, 380px)', color: 'rgba(255,255,255,0.03)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>1980</div>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto', padding: '0 40px', width: '100%' }}>
          <div style={{ maxWidth: 700 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 28, height: 2, background: S.orange }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', color: S.orange, textTransform: 'uppercase' }}>Trento — Dal 1980</span>
            </div>
            <h1 style={{ fontFamily: S.bebas, fontSize: 'clamp(48px, 6.5vw, 100px)', lineHeight: 0.93, letterSpacing: '0.02em', marginBottom: 24, color: S.text }}>
              TRASPORTI<br />
              <span style={{ color: S.orange }}>SPECIALI</span><br />
              E AUTOGRÙ
            </h1>
            <p style={{ fontSize: 'clamp(14px, 1.6vw, 18px)', color: S.muted, maxWidth: 500, lineHeight: 1.65, marginBottom: 40 }}>
              Sollevamento di precisione e trasporti eccezionali in tutto il Nord Italia. Flotta proprietaria, permessi inclusi, assistenza H24.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button onClick={() => go('contatti')} style={{ background: S.orange, color: '#fff', border: 'none', padding: '14px 32px', cursor: 'pointer', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#C2410C')}
                onMouseLeave={e => (e.currentTarget.style.background = S.orange)}
              >PREVENTIVO GRATUITO</button>
              <button onClick={() => go('flotta')} style={{ background: 'transparent', color: S.text, border: `1px solid ${S.border}`, padding: '14px 32px', cursor: 'pointer', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = S.orange)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = S.border)}
              >SCOPRI LA FLOTTA</button>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ background: S.orange, overflow: 'hidden', padding: '11px 0', borderTop: '1px solid #C2410C' }}>
        <div id="ticker">
          {['TRASPORTI ECCEZIONALI', 'AUTOGRÙ FINO A 95 T/M', 'DAL 1980', 'NORD ITALIA', 'H24 EMERGENCY', 'FLOTTA PROPRIETARIA', 'PERMESSI INCLUSI', 'SCORTA TECNICA', 'TRENTO', 'AFFIDABILITÀ TOTALE',
            'TRASPORTI ECCEZIONALI', 'AUTOGRÙ FINO A 95 T/M', 'DAL 1980', 'NORD ITALIA', 'H24 EMERGENCY', 'FLOTTA PROPRIETARIA', 'PERMESSI INCLUSI', 'SCORTA TECNICA', 'TRENTO', 'AFFIDABILITÀ TOTALE',
            'TRASPORTI ECCEZIONALI', 'AUTOGRÙ FINO A 95 T/M', 'DAL 1980', 'NORD ITALIA', 'H24 EMERGENCY', 'FLOTTA PROPRIETARIA', 'PERMESSI INCLUSI', 'SCORTA TECNICA', 'TRENTO', 'AFFIDABILITÀ TOTALE'].map((item, i) => (
            <span key={i} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', color: '#fff', textTransform: 'uppercase', padding: '0 24px' }}>
              {item} <span style={{ opacity: 0.4 }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div style={{ background: S.dark, borderBottom: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: mobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)' }}>
          {[{ n: '40+', l: 'Anni di Esperienza' }, { n: '95', l: 't/m Portata Massima' }, { n: 'H24', l: 'Pronto Intervento' }, { n: '16+', l: 'Mezzi in Flotta' }].map((s, i) => (
            <div key={i} style={{ padding: '28px 16px', textAlign: 'center', borderRight: i < 3 ? `1px solid ${S.border}` : 'none' }}>
              <div style={{ fontFamily: S.bebas, fontSize: 'clamp(32px, 4vw, 48px)', color: S.orange, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', color: S.gray, textTransform: 'uppercase', marginTop: 5 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CHI SIAMO */}
      <section id="chi-siamo" style={{ padding: 'clamp(60px,8vw,120px) 0', background: S.black }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: mobile ? 40 : 80, alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <img src="images/about.jpg" alt="Nardin Autotrasporti" style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', filter: 'grayscale(30%)' }} />
            <div style={{ position: 'absolute', top: -8, left: -8, width: 36, height: 36, background: S.orange }} />
            <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, background: 'rgba(10,10,10,0.92)', border: `1px solid ${S.border}`, padding: '18px 22px' }}>
              <p style={{ fontFamily: S.bebas, fontSize: 18, letterSpacing: '0.05em', color: S.text, marginBottom: 5 }}>"La nostra forza è l'uomo dietro la macchina."</p>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', color: S.orange, textTransform: 'uppercase' }}>Walter & Ivana Nardin</p>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 22, height: 2, background: S.orange }} />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', color: S.orange, textTransform: 'uppercase' }}>La Nostra Storia</span>
            </div>
            <h2 style={{ fontFamily: S.bebas, fontSize: 'clamp(36px,5vw,64px)', lineHeight: 0.95, letterSpacing: '0.03em', color: S.text, marginBottom: 24 }}>
              DAL 1980<br />ECCELLENZA<br /><span style={{ color: S.orange }}>TECNICA</span>
            </h2>
            <div style={{ width: 36, height: 3, background: S.orange, marginBottom: 24 }} />
            <p style={{ color: S.muted, fontSize: 15, lineHeight: 1.75, marginBottom: 16 }}>
              Tutto ha inizio nel <strong style={{ color: S.text }}>1980</strong>, quando Nardin Mario fonda l'azienda con una visione chiara: offrire servizi di trasporto caratterizzati da massima affidabilità.
            </p>
            <p style={{ color: S.muted, fontSize: 15, lineHeight: 1.75, marginBottom: 36 }}>
              Oggi, quella passione continua con <strong style={{ color: S.text }}>Walter e Ivana Nardin</strong>. Siamo il punto di riferimento a Trento per sollevamenti pesanti con autogrù Effer e Hiab fino a 95 t/m.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: S.border, border: `1px solid ${S.border}` }}>
              {[{ t: 'Assicurazione Vettoriale', s: 'Copertura All-Risks' }, { t: 'H24 Emergency', s: 'Pronto Intervento Gru' }, { t: 'Sede a Trento', s: 'Nord Italia' }, { t: 'Scorta Tecnica', s: 'Permessi Speciali' }].map((item, i) => (
                <div key={i} style={{ background: S.dark, padding: 18 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: S.text, textTransform: 'uppercase', marginBottom: 2 }}>{item.t}</p>
                  <p style={{ fontSize: 11, color: S.gray }}>{item.s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVIZI */}
      <section id="servizi" style={{ padding: 'clamp(60px,8vw,120px) 0', background: S.dark, borderTop: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 22, height: 2, background: S.orange }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', color: S.orange, textTransform: 'uppercase' }}>Cosa Facciamo</span>
          </div>
          <h2 style={{ fontFamily: S.bebas, fontSize: 'clamp(36px,6vw,72px)', lineHeight: 0.95, color: S.text, marginBottom: 48 }}>
            I NOSTRI<br /><span style={{ color: S.orange }}>SERVIZI</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 2, background: S.border }}>
            {[
              { n: '01', t: 'Trasporti Eccezionali', d: 'Gestione completa per carichi fuori sagoma, permessi speciali e scorte tecniche in tutto il Nord Italia.', tags: ['Carichi Fuori Sagoma', 'Permessi Speciali', 'Scorta Tecnica'] },
              { n: '02', t: 'Sollevamento Autogrù', d: 'Autogrù Effer e Hiab fino a 95 t/m per montaggi industriali e movimentazioni in spazi angusti.', tags: ['Effer fino a 95 t/m', 'Montaggi Industriali'] },
              { n: '03', t: 'Trasporto Gru Edili', d: 'Smontaggio, trasporto e rimontaggio di gru a torre Potain. Pianificazione logistica completa.', tags: ['Gru Potain', 'Logistica Cantiere'] },
              { n: '04', t: 'Logistica Industriale', d: 'Movimentazione di macchinari pesanti, prefabbricati e attrezzature speciali. Soluzioni su misura.', tags: ['Macchinari Pesanti', 'Su Misura'] },
            ].map((s, i) => (
              <div key={i} style={{ background: S.black, padding: 'clamp(24px,4vw,48px)' }}>
                <div style={{ fontFamily: S.bebas, fontSize: 56, color: 'rgba(234,88,12,0.1)', lineHeight: 1, marginBottom: 12 }}>{s.n}</div>
                <h3 style={{ fontFamily: S.bebas, fontSize: 'clamp(22px,2.5vw,32px)', color: S.text, marginBottom: 12 }}>{s.t}</h3>
                <p style={{ color: S.gray, fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{s.d}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {s.tags.map(tag => <span key={tag} style={{ border: `1px solid ${S.border}`, padding: '3px 10px', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: S.gray, textTransform: 'uppercase' }}>{tag}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" style={{ padding: 'clamp(60px,8vw,120px) 0', background: S.black, borderTop: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 22, height: 2, background: S.orange }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', color: S.orange, textTransform: 'uppercase' }}>Esperienza sul Campo</span>
          </div>
          <h2 style={{ fontFamily: S.bebas, fontSize: 'clamp(36px,6vw,72px)', lineHeight: 0.95, color: S.text, marginBottom: 40 }}>
            LAVORI<br /><span style={{ color: S.orange }}>RECENTI</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 2, background: S.border }}>
            {projects.map(p => (
              <div key={p.id} style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/10', cursor: 'pointer' }}>
                <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(20%)', transition: 'transform 0.6s, filter 0.6s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.filter = 'grayscale(0%)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'grayscale(20%)'; }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)' }} />
                <div style={{ position: 'absolute', bottom: 18, left: 18, right: 18 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: S.orange, textTransform: 'uppercase', display: 'block', marginBottom: 5 }}>{p.cat}</span>
                  <h4 style={{ fontFamily: S.bebas, fontSize: 20, color: S.text, lineHeight: 1.1 }}>{p.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: 'clamp(60px,8vw,120px) 0', background: S.dark, borderTop: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 22, height: 2, background: S.orange }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', color: S.orange, textTransform: 'uppercase' }}>Dicono di Noi</span>
          </div>
          <h2 style={{ fontFamily: S.bebas, fontSize: 'clamp(36px,6vw,72px)', lineHeight: 0.95, color: S.text, marginBottom: 40 }}>
            PARTNER DI<br /><span style={{ color: S.orange }}>FIDUCIA</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(4,1fr)', gap: 2, background: S.border }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: S.black, padding: 'clamp(20px,3vw,32px)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ color: S.orange, fontSize: 16, letterSpacing: 2, marginBottom: 16 }}>★★★★★</div>
                <p style={{ color: S.muted, fontSize: 13, lineHeight: 1.7, fontStyle: 'italic', flexGrow: 1, marginBottom: 20 }}>"{t.text}"</p>
                <div style={{ borderTop: `1px solid ${S.border}`, paddingTop: 16 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: S.text, textTransform: 'uppercase', marginBottom: 2 }}>{t.name}</p>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: S.orange, textTransform: 'uppercase', marginBottom: 8 }}>{t.comp}</p>
                  <span style={{ border: `1px solid ${S.border}`, padding: '3px 9px', fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', color: S.gray, textTransform: 'uppercase' }}>{t.spec}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOTTA */}
      <section id="flotta" style={{ padding: 'clamp(60px,8vw,120px) 0', background: S.black, borderTop: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 22, height: 2, background: S.orange }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', color: S.orange, textTransform: 'uppercase' }}>Flotta Proprietaria</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 20 }}>
            <h2 style={{ fontFamily: S.bebas, fontSize: 'clamp(36px,6vw,72px)', lineHeight: 0.95, color: S.text }}>
              PARCO<br /><span style={{ color: S.orange }}>MEZZI</span>
            </h2>
            <div style={{ display: 'flex', gap: 2, background: S.border }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setTab(cat)} style={{ background: tab === cat ? S.orange : S.dark, color: tab === cat ? '#fff' : S.gray, border: 'none', padding: '10px 22px', cursor: 'pointer', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', transition: 'all 0.2s' }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 2, background: S.border }}>
            {fleet.map(item => (
              <div key={item.id} onClick={() => setModalId(item.id)} style={{ background: S.dark, cursor: 'pointer', overflow: 'hidden' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#161616')}
                onMouseLeave={e => (e.currentTarget.style.background = S.dark)}
              >
                <div style={{ height: 190, overflow: 'hidden', position: 'relative' }}>
                  <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
                </div>
                <div style={{ padding: 18 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', color: S.orange, textTransform: 'uppercase', marginBottom: 6 }}>{item.cap}</div>
                  <h4 style={{ fontFamily: S.bebas, fontSize: 18, color: S.text, marginBottom: 6, lineHeight: 1.1 }}>{item.name}</h4>
                  <p style={{ fontSize: 12, color: S.gray, lineHeight: 1.5, marginBottom: 12 }}>{item.desc}</p>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', color: S.orange, textTransform: 'uppercase' }}>DETTAGLI →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATTI */}
      <section id="contatti" style={{ padding: 'clamp(60px,8vw,120px) 0', background: S.dark, borderTop: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 22, height: 2, background: S.orange }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', color: S.orange, textTransform: 'uppercase' }}>Contattaci</span>
          </div>
          <h2 style={{ fontFamily: S.bebas, fontSize: 'clamp(36px,6vw,72px)', lineHeight: 0.95, color: S.text, marginBottom: 48 }}>
            PREVENTIVO<br /><span style={{ color: S.orange }}>GRATUITO</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1.6fr', gap: 2, background: S.border }}>
            <div style={{ background: S.black, padding: 'clamp(28px,4vw,52px)', display: 'flex', flexDirection: 'column', gap: 28 }}>
              <div>
                <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: S.gray, textTransform: 'uppercase', marginBottom: 6 }}>Telefono Diretto</p>
                <a href="tel:+390461990268" style={{ fontFamily: S.bebas, fontSize: 'clamp(24px,3vw,36px)', color: S.text, textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = S.orange)}
                  onMouseLeave={e => (e.currentTarget.style.color = S.text)}
                >+39 0461 990268</a>
              </div>
              <div>
                <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: S.gray, textTransform: 'uppercase', marginBottom: 6 }}>WhatsApp</p>
                <a href="https://wa.me/393484420285" target="_blank" rel="noopener noreferrer" style={{ fontFamily: S.bebas, fontSize: 'clamp(20px,2.5vw,30px)', color: S.text, textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#22C55E')}
                  onMouseLeave={e => (e.currentTarget.style.color = S.text)}
                >+39 348 4420285</a>
              </div>
              <div>
                <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: S.gray, textTransform: 'uppercase', marginBottom: 6 }}>Sede</p>
                <p style={{ color: S.text, fontSize: 15, lineHeight: 1.5 }}>Via Aeroporto, 31<br />38121 Trento (TN)</p>
              </div>
              <div>
                <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: S.gray, textTransform: 'uppercase', marginBottom: 6 }}>Email</p>
                <a href="mailto:info@nardinautotrasporti.it" style={{ color: S.orange, fontSize: 14, textDecoration: 'none' }}>info@nardinautotrasporti.it</a>
              </div>
              <div style={{ marginTop: 'auto', paddingTop: 24, borderTop: `1px solid ${S.border}` }}>
                <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.25em', color: S.border, textTransform: 'uppercase' }}>PRECISIONE • FORZA • TRENTO</p>
              </div>
            </div>
            <div style={{ background: S.dark, padding: 'clamp(28px,4vw,52px)' }}>
              {state.succeeded ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', gap: 14 }}>
                  <div style={{ fontFamily: S.bebas, fontSize: 72, color: S.orange }}>✓</div>
                  <h3 style={{ fontFamily: S.bebas, fontSize: 32, color: S.text }}>MESSAGGIO INVIATO</h3>
                  <p style={{ color: S.gray, fontSize: 14 }}>Ti ricontatteremo al più presto.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 12 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', color: S.gray, textTransform: 'uppercase', marginBottom: 6 }}>Ragione Sociale *</label>
                      <input name="name" type="text" required style={{ width: '100%', background: S.black, border: `1px solid ${S.border}`, color: S.text, padding: '12px 14px', fontSize: 14, outline: 'none', fontFamily: S.inter }}
                        onFocus={e => (e.currentTarget.style.borderColor = S.orange)}
                        onBlur={e => (e.currentTarget.style.borderColor = S.border)}
                      />
                      <ValidationError prefix="Name" field="name" errors={state.errors} style={{ color: '#EF4444', fontSize: 11, marginTop: 3 }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', color: S.gray, textTransform: 'uppercase', marginBottom: 6 }}>Telefono *</label>
                      <input name="phone" type="tel" required placeholder="+39 ..." style={{ width: '100%', background: S.black, border: `1px solid ${S.border}`, color: S.text, padding: '12px 14px', fontSize: 14, outline: 'none', fontFamily: S.inter }}
                        onFocus={e => (e.currentTarget.style.borderColor = S.orange)}
                        onBlur={e => (e.currentTarget.style.borderColor = S.border)}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', color: S.gray, textTransform: 'uppercase', marginBottom: 6 }}>Email *</label>
                    <input name="email" type="email" required style={{ width: '100%', background: S.black, border: `1px solid ${S.border}`, color: S.text, padding: '12px 14px', fontSize: 14, outline: 'none', fontFamily: S.inter }}
                      onFocus={e => (e.currentTarget.style.borderColor = S.orange)}
                      onBlur={e => (e.currentTarget.style.borderColor = S.border)}
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} style={{ color: '#EF4444', fontSize: 11, marginTop: 3 }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', color: S.gray, textTransform: 'uppercase', marginBottom: 6 }}>Servizio Richiesto</label>
                    <select name="service" style={{ width: '100%', background: S.black, border: `1px solid ${S.border}`, color: S.text, padding: '12px 14px', fontSize: 14, outline: 'none', cursor: 'pointer', fontFamily: S.inter }}
                      onFocus={e => (e.currentTarget.style.borderColor = S.orange)}
                      onBlur={e => (e.currentTarget.style.borderColor = S.border)}
                    >
                      <option>Trasporto Eccezionale</option>
                      <option>Autogrù / Sollevamento</option>
                      <option>Trasporto Gru Edili</option>
                      <option>Logistica Industriale</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', color: S.gray, textTransform: 'uppercase', marginBottom: 6 }}>Dettagli Lavoro</label>
                    <textarea name="message" rows={4} placeholder="Pesi, dimensioni, località, tempistiche..." style={{ width: '100%', background: S.black, border: `1px solid ${S.border}`, color: S.text, padding: '12px 14px', fontSize: 14, outline: 'none', resize: 'vertical', fontFamily: S.inter }}
                      onFocus={e => (e.currentTarget.style.borderColor = S.orange)}
                      onBlur={e => (e.currentTarget.style.borderColor = S.border)}
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} style={{ color: '#EF4444', fontSize: 11, marginTop: 3 }} />
                  </div>
                  <button type="submit" disabled={state.submitting} style={{ background: S.orange, color: '#fff', border: 'none', padding: 16, cursor: state.submitting ? 'not-allowed' : 'pointer', opacity: state.submitting ? 0.6 : 1, fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase' }}
                    onMouseEnter={e => { if (!state.submitting) e.currentTarget.style.background = '#C2410C'; }}
                    onMouseLeave={e => { if (!state.submitting) e.currentTarget.style.background = S.orange; }}
                  >
                    {state.submitting ? 'INVIO IN CORSO...' : 'INVIA RICHIESTA'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: S.black, borderTop: `1px solid ${S.border}`, padding: 'clamp(36px,6vw,72px) 0 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40, flexWrap: 'wrap', gap: 28 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ background: S.orange, padding: '5px 9px', fontFamily: S.bebas, fontSize: 18, color: '#fff' }}>NARDIN</div>
                <span style={{ fontFamily: S.bebas, fontSize: 14, letterSpacing: '0.2em', color: S.text }}>AUTOTRASPORTI</span>
              </div>
              <p style={{ color: S.gray, fontSize: 12, maxWidth: 280, lineHeight: 1.6 }}>Trasporti speciali e sollevamento di precisione a Trento dal 1980.</p>
            </div>
            <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: S.orange, textTransform: 'uppercase', marginBottom: 12 }}>Navigazione</p>
                {['chi-siamo', 'servizi', 'flotta', 'portfolio', 'contatti'].map(id => (
                  <button key={id} onClick={() => go(id)} style={{ display: 'block', background: 'none', border: 'none', color: S.gray, cursor: 'pointer', fontSize: 12, textTransform: 'capitalize', padding: '3px 0', textAlign: 'left' }}
                    onMouseEnter={e => (e.currentTarget.style.color = S.text)}
                    onMouseLeave={e => (e.currentTarget.style.color = S.gray)}
                  >{id.replace('-', ' ')}</button>
                ))}
              </div>
              <div>
                <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: S.orange, textTransform: 'uppercase', marginBottom: 12 }}>Contatti</p>
                <p style={{ color: S.gray, fontSize: 12, lineHeight: 1.8 }}>
                  Via Aeroporto, 31<br />38121 Trento (TN)<br />
                  <a href="tel:+390461990268" style={{ color: S.gray, textDecoration: 'none' }}>+39 0461 990268</a><br />
                  <a href="mailto:info@nardinautotrasporti.it" style={{ color: S.orange, textDecoration: 'none', fontSize: 11 }}>info@nardinautotrasporti.it</a>
                </p>
              </div>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${S.border}`, paddingTop: 20, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <p style={{ fontSize: 10, color: '#374151', lineHeight: 1.6 }}>NARDIN AUTOTRASPORTI s.n.c. | P. IVA 01762870226 | Albo TN/2053832Z</p>
            <div style={{ display: 'flex', gap: 16 }}>
              <a href="https://www.instagram.com/nardinautotrasporti/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, fontWeight: 700, color: '#374151', textDecoration: 'none', textTransform: 'uppercase' }}
                onMouseEnter={e => (e.currentTarget.style.color = S.text)}
                onMouseLeave={e => (e.currentTarget.style.color = '#374151')}
              >Instagram</a>
              <span style={{ fontSize: 10, color: S.border }}>© 2026</span>
            </div>
          </div>
        </div>
      </footer>

      {/* WHATSAPP FAB */}
      <a href="https://wa.me/393484420285" target="_blank" rel="noopener noreferrer" style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 110, background: '#16A34A', color: '#fff', width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', border: '2px solid rgba(255,255,255,0.15)' }}
        onMouseEnter={e => { e.currentTarget.style.background = '#15803D'; e.currentTarget.style.transform = 'scale(1.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = '#16A34A'; e.currentTarget.style.transform = 'scale(1)'; }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.539 2.016 2.126-.54c1.029.563 2.025.844 3.162.844 3.181 0 5.767-2.586 5.768-5.766.001-3.18-2.587-5.767-5.768-5.767zm3.39 8.251c-.146.415-.852.756-1.201.838-.34.08-.783.14-1.258-.02-.275-.092-.591-.219-1.025-.407-1.84-.794-3.037-2.673-3.129-2.797-.093-.125-.751-.998-.751-1.913 0-.915.481-1.363.652-1.547.171-.184.372-.231.496-.231s.248.001.356.006c.115.005.27-.042.423.328.158.382.541 1.32.588 1.414.047.094.078.204.016.331-.062.126-.093.204-.186.31l-.279.325c-.093.107-.191.224-.083.41.108.187.481.794 1.033 1.285.711.634 1.312.83 1.5.922.188.092.297.077.406-.05.109-.127.466-.541.59-.727.124-.186.248-.156.417-.094s1.071.505 1.257.599c.186.094.31.141.356.221s.047.533-.099.948zM12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11-11-4.925-11-11 4.925-11 11-11z" />
        </svg>
      </a>

    </div>
  );
}
