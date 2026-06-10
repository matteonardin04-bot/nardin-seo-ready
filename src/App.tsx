import React, { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';

// --- DATA ---
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

const tickerItems = [
  'TRASPORTI ECCEZIONALI', 'AUTOGRÙ FINO A 95 T/M', 'DAL 1980', 'NORD ITALIA', 'H24 EMERGENCY',
  'FLOTTA PROPRIETARIA', 'PERMESSI INCLUSI', 'SCORTA TECNICA', 'TRENTO', 'AFFIDABILITÀ TOTALE',
];

export default function App() {
  const [activeTab, setActiveTab] = useState('Gru');
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFleetItem, setActiveFleetItem] = useState<string | null>(null);
  
  const [state, handleSubmit] = useForm('xnjowlpd');

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  const toggleMenu = () => {
    setMenuOpen(p => {
      document.body.style.overflow = !p ? 'hidden' : 'unset';
      return !p;
    });
  };

  const filteredFleet = fleetData.filter(m => m.cat === activeTab);
  const activeItem = fleetData.find(m => m.id === activeFleetItem);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#0A0A0A', color: '#F5F5F0', overflowX: 'hidden' }}>

      {/* FLEET MODAL */}
      {activeItem && (
        <div
          onClick={() => setActiveFleetItem(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#111', border: '1px solid #2a2a2a', borderRadius: '4px',
              maxWidth: '680px', width: '100%', overflow: 'hidden',
            }}
          >
            <div style={{ height: '300px', overflow: 'hidden', position: 'relative' }}>
              <img src={activeItem.img} alt={activeItem.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #111 0%, transparent 60%)' }} />
              <button
                onClick={() => setActiveFleetItem(null)}
                style={{
                  position: 'absolute', top: '16px', right: '16px',
                  background: 'rgba(0,0,0,0.6)', border: '1px solid #333',
                  color: '#fff', width: '36px', height: '36px', borderRadius: '2px',
                  cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >×</button>
              <div style={{ position: 'absolute', bottom: '16px', left: '20px' }}>
                <span style={{ background: '#EA580C', color: '#fff', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', padding: '3px 10px', textTransform: 'uppercase' }}>
                  {activeItem.cat}
                </span>
              </div>
            </div>
            <div style={{ padding: '28px 32px 32px' }}>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '32px', letterSpacing: '0.05em', color: '#F5F5F0', marginBottom: '8px' }}>
                {activeItem.name}
              </h3>
              <div style={{ display: 'inline-block', background: '#1C1C1C', border: '1px solid #2a2a2a', padding: '4px 14px', marginBottom: '16px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#EA580C', textTransform: 'uppercase' }}>{activeItem.cap}</span>
              </div>
              <p style={{ color: '#9CA3AF', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>{activeItem.desc}</p>
              <button
                onClick={() => { setActiveFleetItem(null); scrollTo('contatti'); }}
                style={{
                  width: '100%', background: '#EA580C', color: '#fff', border: 'none',
                  padding: '14px', cursor: 'pointer', fontWeight: 700, fontSize: '11px',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                }}
              >
                RICHIEDI PREVENTIVO
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'all 0.3s',
        background: isScrolled ? 'rgba(10,10,10,0.97)' : 'transparent',
        borderBottom: isScrolled ? '1px solid #1C1C1C' : '1px solid transparent',
        padding: isScrolled ? '14px 0' : '22px 0',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: "0 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div onClick={() => scrollTo('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              background: '#EA580C', padding: '6px 10px',
              fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', letterSpacing: '0.05em', color: '#fff',
            }}>NARDIN</div>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', letterSpacing: '0.2em', color: '#F5F5F0', display: 'none' }} className="nav-brand-text">AUTOTRASPORTI</span>
          </div>

          <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }} className="nav-links">
            {['chi-siamo', 'servizi', 'flotta', 'portfolio', 'contatti'].map(id => (
              <button key={id} onClick={() => scrollTo(id)} style={{
                background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer',
                fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
                transition: 'color 0.2s', padding: 0,
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F5F5F0')}
                onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}
              >{id.replace('-', ' ')}</button>
            ))}
            <a href="tel:+390461990268" style={{
              background: '#EA580C', color: '#fff', padding: '10px 20px',
              textDecoration: 'none', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em',
              textTransform: 'uppercase', transition: 'background 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = '#C2410C')}
              onMouseLeave={e => (e.currentTarget.style.background = '#EA580C')}
            >CHIAMA ORA</a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="nav-mobile">
            <a href="tel:+390461990268" style={{
              background: '#EA580C', color: '#fff', padding: '9px 14px',
              textDecoration: 'none', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>CHIAMA</a>
            <button onClick={toggleMenu} style={{
              background: 'none', border: '1px solid #2a2a2a', color: '#F5F5F0',
              width: '38px', height: '38px', cursor: 'pointer', display: 'flex',
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: '8px',
            }}>
              <span style={{ display: 'block', width: '18px', height: '2px', background: menuOpen ? 'transparent' : '#F5F5F0', transition: 'all 0.2s' }} />
              <span style={{ display: 'block', width: '18px', height: '2px', background: '#F5F5F0' }} />
              <span style={{ display: 'block', width: '18px', height: '2px', background: menuOpen ? 'transparent' : '#F5F5F0', transition: 'all 0.2s' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 90, background: '#0A0A0A',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '32px',
        }}>
          {['home', 'chi-siamo', 'servizi', 'flotta', 'portfolio', 'contatti'].map(id => (
            <button key={id} onClick={() => scrollTo(id)} style={{
              background: 'none', border: 'none', color: '#F5F5F0', cursor: 'pointer',
              fontFamily: "'Bebas Neue', sans-serif", fontSize: '36px', letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>{id.replace('-', ' ')}</button>
          ))}
          <a href="tel:+390461990268" style={{
            background: '#EA580C', color: '#fff', padding: '14px 36px',
            textDecoration: 'none', fontSize: '12px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
          }}>CHIAMA ORA</a>
        </div>
      )}

      {/* HERO */}
      <section id="home" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'flex-end', paddingBottom: '80px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="images/hero.jpg" alt="Nardin Autotrasporti" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0A0A0A 40%, transparent 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0A0A0A 20%, transparent 70%)' }} />
        </div>

        {/* Big year in background */}
        <div style={{
          position: 'absolute', right: '-2%', bottom: '5%',
          fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(180px, 28vw, 420px)',
          color: 'rgba(255,255,255,0.03)', lineHeight: 1, userSelect: 'none', letterSpacing: '-0.02em',
          pointerEvents: 'none',
        }}>1980</div>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px', width: '100%' }}>
          <div style={{ maxWidth: '760px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <div style={{ width: '32px', height: '2px', background: '#EA580C' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', color: '#EA580C', textTransform: 'uppercase' }}>Trento — Dal 1980</span>
            </div>
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(44px, 7vw, 110px)',
              lineHeight: 0.92, letterSpacing: '0.02em', marginBottom: '28px',
              color: '#F5F5F0',
            }}>
              TRASPORTI<br />
              <span style={{ color: '#EA580C' }}>SPECIALI</span><br />
              E AUTOGRÙ
            </h1>
            <p style={{ fontSize: 'clamp(15px, 1.8vw, 19px)', color: '#9CA3AF', maxWidth: '520px', lineHeight: 1.65, marginBottom: '44px' }}>
              Sollevamento di precisione e trasporti eccezionali in tutto il Nord Italia. Flotta proprietaria, permessi inclusi, assistenza H24.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button onClick={() => scrollTo('contatti')} style={{
                background: '#EA580C', color: '#fff', border: 'none',
                padding: '16px 36px', cursor: 'pointer', fontSize: '11px',
                fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = '#C2410C')}
                onMouseLeave={e => (e.currentTarget.style.background = '#EA580C')}
              >PREVENTIVO GRATUITO</button>
              <button onClick={() => scrollTo('flotta')} style={{
                background: 'transparent', color: '#F5F5F0',
                border: '1px solid #2a2a2a', padding: '16px 36px', cursor: 'pointer',
                fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
                transition: 'border-color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#EA580C')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#2a2a2a')}
              >SCOPRI LA FLOTTA</button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '32px', right: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, transparent, #EA580C)' }} />
          <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.25em', color: '#6B7280', textTransform: 'uppercase', writingMode: 'vertical-rl' }}>SCROLL</span>
        </div>
      </section>

      {/* TICKER BAR */}
      <div style={{ background: '#EA580C', overflow: 'hidden', padding: '12px 0', borderTop: '1px solid #C2410C' }}>
        <div id="ticker-inner" style={{ display: 'flex', gap: '0', whiteSpace: 'nowrap' }}>
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', color: '#fff', textTransform: 'uppercase', padding: '0 28px' }}>
              {item} <span style={{ opacity: 0.5, marginLeft: '28px' }}>◆</span>
            </span>
          ))}
        </div>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
          [ref] { animation: ticker 25s linear infinite; }
          .nav-links { display: flex !important; }
          .nav-mobile { display: none !important; }
          .nav-brand-text { display: block !important; }
          @media (max-width: 768px) {
            .nav-links { display: none !important; }
            .nav-mobile { display: flex !important; }
          }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
          .fade-in { animation: fadeInUp 0.5s ease forwards; }
        `}</style>
      </div>

      {/* Ticker animation via inline style */}
      <style>{`
        div[data-ticker] { animation: ticker 30s linear infinite; }
      `}</style>

      {/* STATS BAR */}
      <div style={{ background: '#111', borderBottom: '1px solid #1C1C1C' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {[
            { num: '40+', label: 'Anni di Esperienza' },
            { num: '95', label: 't/m Portata Massima' },
            { num: 'H24', label: 'Pronto Intervento' },
            { num: '16+', label: 'Mezzi in Flotta' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '32px 24px', borderRight: i < 3 ? '1px solid #1C1C1C' : 'none',
              textAlign: 'center',
            }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(36px, 4vw, 52px)', color: '#EA580C', letterSpacing: '0.05em', lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: '#6B7280', textTransform: 'uppercase', marginTop: '6px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CHI SIAMO */}
      <section id="chi-siamo" style={{ padding: 'clamp(60px, 8vw, 120px) 0', background: '#0A0A0A' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="chi-siamo-grid">
          <div style={{ position: 'relative' }}>
            <img src="images/about.jpg" alt="Nardin Autotrasporti" style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', filter: 'grayscale(30%)' }} />
            <div style={{
              position: 'absolute', bottom: '-1px', left: '-1px', right: '-1px',
              background: 'linear-gradient(to top, #0A0A0A 0%, transparent 40%)',
              height: '200px',
            }} />
            <div style={{
              position: 'absolute', bottom: '24px', left: '24px', right: '24px',
              background: 'rgba(10,10,10,0.9)', border: '1px solid #1C1C1C',
              padding: '20px 24px',
            }}>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', letterSpacing: '0.05em', color: '#F5F5F0', marginBottom: '6px' }}>
                "La nostra forza è l'uomo dietro la macchina."
              </p>
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', color: '#EA580C', textTransform: 'uppercase' }}>
                Walter & Ivana Nardin
              </p>
            </div>
            {/* Orange corner accent */}
            <div style={{ position: 'absolute', top: '-8px', left: '-8px', width: '40px', height: '40px', background: '#EA580C' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '24px', height: '2px', background: '#EA580C' }} />
              <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.3em', color: '#EA580C', textTransform: 'uppercase' }}>La Nostra Storia</span>
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 5vw, 68px)', lineHeight: 0.95, letterSpacing: '0.03em', color: '#F5F5F0', marginBottom: '28px' }}>
              DAL 1980<br />ECCELLENZA<br /><span style={{ color: '#EA580C' }}>TECNICA</span>
            </h2>
            <div style={{ width: '40px', height: '3px', background: '#EA580C', marginBottom: '28px' }} />
            <p style={{ color: '#9CA3AF', fontSize: '16px', lineHeight: 1.75, marginBottom: '20px' }}>
              Tutto ha inizio nel <strong style={{ color: '#F5F5F0' }}>1980</strong>, quando Nardin Mario fonda l'azienda con una visione chiara: offrire servizi di trasporto caratterizzati da massima affidabilità.
            </p>
            <p style={{ color: '#9CA3AF', fontSize: '16px', lineHeight: 1.75, marginBottom: '40px' }}>
              Oggi, quella passione continua con <strong style={{ color: '#F5F5F0' }}>Walter e Ivana Nardin</strong>. Siamo il punto di riferimento a Trento per sollevamenti pesanti con autogrù Effer e Hiab fino a 95 t/m.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#1C1C1C', border: '1px solid #1C1C1C' }}>
              {[
                { icon: '🛡️', title: 'Assicurazione Vettoriale', sub: 'Copertura All-Risks' },
                { icon: '🚨', title: 'H24 Emergency', sub: 'Pronto Intervento Gru' },
                { icon: '📍', title: 'Sede a Trento', sub: 'Nord Italia' },
                { icon: '⚙️', title: 'Scorta Tecnica', sub: 'Permessi Speciali' },
              ].map((item, i) => (
                <div key={i} style={{ background: '#111', padding: '20px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#F5F5F0', textTransform: 'uppercase', marginBottom: '2px' }}>{item.title}</p>
                    <p style={{ fontSize: '11px', color: '#6B7280' }}>{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`.chi-siamo-grid { @media (max-width: 768px) { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* SERVIZI */}
      <section id="servizi" style={{ padding: 'clamp(60px, 8vw, 120px) 0', background: '#111', borderTop: '1px solid #1C1C1C', borderBottom: '1px solid #1C1C1C' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '24px', height: '2px', background: '#EA580C' }} />
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.3em', color: '#EA580C', textTransform: 'uppercase' }}>Cosa Facciamo</span>
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 0.95, letterSpacing: '0.03em', color: '#F5F5F0', marginBottom: '60px' }}>
            I NOSTRI<br /><span style={{ color: '#EA580C' }}>SERVIZI</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px', background: '#1C1C1C' }}>
            {[
              {
                num: '01', title: 'Trasporti Eccezionali',
                desc: 'Gestione completa per carichi fuori sagoma, permessi speciali e scorte tecniche. Operiamo in tutto il Nord Italia con la massima sicurezza stradale.',
                tags: ['Carichi Fuori Sagoma', 'Permessi Speciali', 'Scorta Tecnica'],
              },
              {
                num: '02', title: 'Sollevamento Autogrù',
                desc: 'Autogrù Effer e Hiab fino a 95 t/m. Ideali per montaggi industriali, carpenterie metalliche e movimentazioni in spazi angusti.',
                tags: ['Effer fino a 95 t/m', 'Montaggi Industriali', 'Spazi Ristretti'],
              },
              {
                num: '03', title: 'Trasporto Gru Edili',
                desc: 'Smontaggio, trasporto e rimontaggio di gru a torre Potain e similari. Pianificazione logistica completa per cantieri di ogni dimensione.',
                tags: ['Gru Potain', 'Logistica Cantiere', 'Tutto il Nord Italia'],
              },
              {
                num: '04', title: 'Logistica Industriale',
                desc: 'Movimentazione di macchinari pesanti, componenti prefabbricati e attrezzature speciali. Soluzioni su misura per ogni esigenza industriale.',
                tags: ['Macchinari Pesanti', 'Prefabbricati', 'Su Misura'],
              },
            ].map((s, i) => (
              <div key={i} style={{
                background: '#0A0A0A', padding: 'clamp(28px, 4vw, 52px)',
                transition: 'background 0.2s',
                cursor: 'default',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = '#0f0f0f')}
                onMouseLeave={e => (e.currentTarget.style.background = '#0A0A0A')}
              >
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '64px', color: 'rgba(234,88,12,0.12)', lineHeight: 1, marginBottom: '16px', letterSpacing: '0.05em' }}>{s.num}</div>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(24px, 2.5vw, 34px)', letterSpacing: '0.04em', color: '#F5F5F0', marginBottom: '16px' }}>{s.title}</h3>
                <p style={{ color: '#6B7280', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>{s.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {s.tags.map(tag => (
                    <span key={tag} style={{ border: '1px solid #2a2a2a', padding: '4px 12px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: '#6B7280', textTransform: 'uppercase' }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" style={{ padding: 'clamp(60px, 8vw, 120px) 0', background: '#111', borderTop: '1px solid #1C1C1C' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '24px', height: '2px', background: '#EA580C' }} />
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.3em', color: '#EA580C', textTransform: 'uppercase' }}>Esperienza sul Campo</span>
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 0.95, letterSpacing: '0.03em', color: '#F5F5F0', marginBottom: '48px' }}>
            LAVORI<br /><span style={{ color: '#EA580C' }}>RECENTI</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', background: '#1C1C1C' }}>
            {projects.map(p => (
              <div key={p.id} style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/10', cursor: 'pointer' }}>
                <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s', filter: 'grayscale(20%)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)'; e.currentTarget.style.filter = 'grayscale(0%)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'grayscale(20%)'; }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)' }} />
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
                  <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', color: '#EA580C', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>{p.cat}</span>
                  <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', letterSpacing: '0.04em', color: '#F5F5F0', lineHeight: 1.1 }}>{p.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: 'clamp(60px, 8vw, 120px) 0', background: '#0A0A0A', borderTop: '1px solid #1C1C1C' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '24px', height: '2px', background: '#EA580C' }} />
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.3em', color: '#EA580C', textTransform: 'uppercase' }}>Dicono di Noi</span>
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 0.95, letterSpacing: '0.03em', color: '#F5F5F0', marginBottom: '48px' }}>
            PARTNER DI<br /><span style={{ color: '#EA580C' }}>FIDUCIA</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px', background: '#1C1C1C' }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: '#111', padding: 'clamp(24px, 3vw, 36px)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ color: '#EA580C', fontSize: '18px', letterSpacing: '2px', marginBottom: '20px' }}>★★★★★</div>
                <p style={{ color: '#9CA3AF', fontSize: '14px', lineHeight: 1.7, fontStyle: 'italic', flexGrow: 1, marginBottom: '24px' }}>"{t.text}"</p>
                <div style={{ borderTop: '1px solid #1C1C1C', paddingTop: '20px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', color: '#F5F5F0', textTransform: 'uppercase', marginBottom: '2px' }}>{t.name}</p>
                  <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#EA580C', textTransform: 'uppercase', marginBottom: '10px' }}>{t.comp}</p>
                  <span style={{ border: '1px solid #2a2a2a', padding: '3px 10px', fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', color: '#6B7280', textTransform: 'uppercase' }}>{t.spec}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOTTA */}
      <section id="flotta" style={{ padding: 'clamp(60px, 8vw, 120px) 0', background: '#111', borderTop: '1px solid #1C1C1C' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '24px', height: '2px', background: '#EA580C' }} />
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.3em', color: '#EA580C', textTransform: 'uppercase' }}>Flotta Proprietaria</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '24px' }}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 0.95, letterSpacing: '0.03em', color: '#F5F5F0' }}>
              PARCO<br /><span style={{ color: '#EA580C' }}>MEZZI</span>
            </h2>
            <div style={{ display: 'flex', gap: '2px', background: '#1C1C1C' }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveTab(cat)} style={{
                  background: activeTab === cat ? '#EA580C' : '#0A0A0A',
                  color: activeTab === cat ? '#fff' : '#6B7280',
                  border: 'none', padding: '12px 24px', cursor: 'pointer',
                  fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
                  transition: 'all 0.2s',
                }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', background: '#1C1C1C' }}>
            {filteredFleet.map(item => (
              <div key={item.id} onClick={() => setActiveFleetItem(item.id)} style={{
                background: '#0A0A0A', cursor: 'pointer', overflow: 'hidden',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = '#0f0f0f')}
                onMouseLeave={e => (e.currentTarget.style.background = '#0A0A0A')}
              >
                <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                  <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: '#EA580C', textTransform: 'uppercase', marginBottom: '8px' }}>{item.cap}</div>
                  <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', letterSpacing: '0.04em', color: '#F5F5F0', marginBottom: '8px', lineHeight: 1.1 }}>{item.name}</h4>
                  <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.5, marginBottom: '16px' }}>{item.desc}</p>
                  <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: '#EA580C', textTransform: 'uppercase' }}>DETTAGLI →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATTI */}
      <section id="contatti" style={{ padding: 'clamp(60px, 8vw, 120px) 0', background: '#111', borderTop: '1px solid #1C1C1C' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '24px', height: '2px', background: '#EA580C' }} />
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.3em', color: '#EA580C', textTransform: 'uppercase' }}>Contattaci</span>
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 0.95, letterSpacing: '0.03em', color: '#F5F5F0', marginBottom: '60px' }}>
            PREVENTIVO<br /><span style={{ color: '#EA580C' }}>GRATUITO</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '2px', background: '#1C1C1C', alignItems: 'stretch' }}>
            {/* Info panel */}
            <div style={{ background: '#0A0A0A', padding: 'clamp(32px, 4vw, 60px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ marginBottom: '40px' }}>
                  <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px' }}>Telefono Diretto</p>
                  <a href="tel:+390461990268" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '0.03em', color: '#F5F5F0', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#EA580C')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#F5F5F0')}
                  >+39 0461 990268</a>
                </div>
                <div style={{ marginBottom: '40px' }}>
                  <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px' }}>WhatsApp</p>
                  <a href="https://wa.me/393484420285" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(22px, 2.5vw, 32px)', letterSpacing: '0.03em', color: '#F5F5F0', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#22C55E')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#F5F5F0')}
                  >+39 348 4420285</a>
                </div>
                <div style={{ marginBottom: '40px' }}>
                  <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px' }}>Sede</p>
                  <p style={{ color: '#F5F5F0', fontSize: '16px', lineHeight: 1.5 }}>Via Aeroporto, 31<br />38121 Trento (TN)</p>
                </div>
                <div>
                  <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px' }}>Email</p>
                  <a href="mailto:info@nardinautotrasporti.it" style={{ color: '#EA580C', fontSize: '15px', textDecoration: 'none' }}>info@nardinautotrasporti.it</a>
                </div>
              </div>
              <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid #1C1C1C' }}>
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.25em', color: '#2a2a2a', textTransform: 'uppercase' }}>PRECISIONE • FORZA • TRENTO</p>
              </div>
            </div>
            {/* Form */}
            <div style={{ background: '#111', padding: 'clamp(32px, 4vw, 60px)' }}>
              {state.succeeded ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', gap: '16px' }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '80px', color: '#EA580C' }}>✓</div>
                  <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '36px', letterSpacing: '0.05em', color: '#F5F5F0' }}>MESSAGGIO INVIATO</h3>
                  <p style={{ color: '#6B7280', fontSize: '15px' }}>Ti ricontatteremo al più presto.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px' }}>Ragione Sociale *</label>
                      <input name="name" type="text" required style={{ width: '100%', background: '#0A0A0A', border: '1px solid #1C1C1C', color: '#F5F5F0', padding: '14px 16px', fontSize: '14px', outline: 'none' }}
                        onFocus={e => (e.currentTarget.style.borderColor = '#EA580C')}
                        onBlur={e => (e.currentTarget.style.borderColor = '#1C1C1C')}
                      />
                      <ValidationError prefix="Name" field="name" errors={state.errors} style={{ color: '#EF4444', fontSize: '11px', marginTop: '4px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px' }}>Telefono *</label>
                      <input name="phone" type="tel" required style={{ width: '100%', background: '#0A0A0A', border: '1px solid #1C1C1C', color: '#F5F5F0', padding: '14px 16px', fontSize: '14px', outline: 'none' }}
                        onFocus={e => (e.currentTarget.style.borderColor = '#EA580C')}
                        onBlur={e => (e.currentTarget.style.borderColor = '#1C1C1C')}
                        placeholder="+39 ..."
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px' }}>Email *</label>
                    <input name="email" type="email" required style={{ width: '100%', background: '#0A0A0A', border: '1px solid #1C1C1C', color: '#F5F5F0', padding: '14px 16px', fontSize: '14px', outline: 'none' }}
                      onFocus={e => (e.currentTarget.style.borderColor = '#EA580C')}
                      onBlur={e => (e.currentTarget.style.borderColor = '#1C1C1C')}
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} style={{ color: '#EF4444', fontSize: '11px', marginTop: '4px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px' }}>Servizio Richiesto</label>
                    <select name="service" style={{ width: '100%', background: '#0A0A0A', border: '1px solid #1C1C1C', color: '#F5F5F0', padding: '14px 16px', fontSize: '14px', outline: 'none', cursor: 'pointer' }}
                      onFocus={e => (e.currentTarget.style.borderColor = '#EA580C')}
                      onBlur={e => (e.currentTarget.style.borderColor = '#1C1C1C')}
                    >
                      <option>Trasporto Eccezionale</option>
                      <option>Autogrù / Sollevamento</option>
                      <option>Trasporto Gru Edili</option>
                      <option>Logistica Industriale</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px' }}>Dettagli Lavoro</label>
                    <textarea name="message" rows={4} placeholder="Pesi, dimensioni, località, tempistiche..." style={{ width: '100%', background: '#0A0A0A', border: '1px solid #1C1C1C', color: '#F5F5F0', padding: '14px 16px', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                      onFocus={e => (e.currentTarget.style.borderColor = '#EA580C')}
                      onBlur={e => (e.currentTarget.style.borderColor = '#1C1C1C')}
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} style={{ color: '#EF4444', fontSize: '11px', marginTop: '4px' }} />
                  </div>
                  <button type="submit" disabled={state.submitting} style={{
                    background: '#EA580C', color: '#fff', border: 'none', padding: '18px',
                    cursor: state.submitting ? 'not-allowed' : 'pointer', opacity: state.submitting ? 0.6 : 1,
                    fontSize: '11px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase',
                    transition: 'background 0.2s',
                  }}
                    onMouseEnter={e => { if (!state.submitting) e.currentTarget.style.background = '#C2410C'; }}
                    onMouseLeave={e => { if (!state.submitting) e.currentTarget.style.background = '#EA580C'; }}
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
      <footer style={{ background: '#0A0A0A', borderTop: '1px solid #1C1C1C', padding: 'clamp(40px, 6vw, 80px) 0 40px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '48px', flexWrap: 'wrap', gap: '32px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ background: '#EA580C', padding: '6px 10px', fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', letterSpacing: '0.05em', color: '#fff' }}>NARDIN</div>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', letterSpacing: '0.2em', color: '#F5F5F0' }}>AUTOTRASPORTI</span>
              </div>
              <p style={{ color: '#6B7280', fontSize: '13px', maxWidth: '300px', lineHeight: 1.6 }}>Trasporti speciali e sollevamento di precisione a Trento dal 1980.</p>
            </div>
            <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', color: '#EA580C', textTransform: 'uppercase', marginBottom: '16px' }}>Navigazione</p>
                {['chi-siamo', 'servizi', 'flotta', 'portfolio', 'contatti'].map(id => (
                  <button key={id} onClick={() => scrollTo(id)} style={{
                    display: 'block', background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer',
                    fontSize: '13px', textTransform: 'capitalize', padding: '4px 0', letterSpacing: '0.05em', textAlign: 'left',
                    transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#F5F5F0')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#6B7280')}
                  >{id.replace('-', ' ')}</button>
                ))}
              </div>
              <div>
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', color: '#EA580C', textTransform: 'uppercase', marginBottom: '16px' }}>Contatti</p>
                <p style={{ color: '#6B7280', fontSize: '13px', lineHeight: 1.8 }}>
                  Via Aeroporto, 31<br />38121 Trento (TN)<br />
                  <a href="tel:+390461990268" style={{ color: '#6B7280', textDecoration: 'none' }}>+39 0461 990268</a><br />
                  <a href="mailto:info@nardinautotrasporti.it" style={{ color: '#EA580C', textDecoration: 'none', fontSize: '12px' }}>info@nardinautotrasporti.it</a>
                </p>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #1C1C1C', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ fontSize: '11px', color: '#374151', lineHeight: 1.7 }}>
              NARDIN AUTOTRASPORTI s.n.c. di Nardin Walter e Ivana | P. IVA 01762870226 | Albo TN/2053832Z
            </p>
            <div style={{ display: 'flex', gap: '20px' }}>
              <a href="https://www.instagram.com/nardinautotrasporti/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#374151', textDecoration: 'none', textTransform: 'uppercase', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F5F5F0')}
                onMouseLeave={e => (e.currentTarget.style.color = '#374151')}
              >Instagram</a>
              <span style={{ fontSize: '11px', color: '#1C1C1C' }}>© 2026</span>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a href="https://wa.me/393484420285" target="_blank" rel="noopener noreferrer" style={{
        position: 'fixed', bottom: '24px', right: '24px', zIndex: 110,
        background: '#16A34A', color: '#fff', width: '52px', height: '52px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        textDecoration: 'none', transition: 'background 0.2s, transform 0.2s',
        border: '2px solid rgba(255,255,255,0.15)',
      }}
        onMouseEnter={e => { e.currentTarget.style.background = '#15803D'; e.currentTarget.style.transform = 'scale(1.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = '#16A34A'; e.currentTarget.style.transform = 'scale(1)'; }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.539 2.016 2.126-.54c1.029.563 2.025.844 3.162.844 3.181 0 5.767-2.586 5.768-5.766.001-3.18-2.587-5.767-5.768-5.767zm3.39 8.251c-.146.415-.852.756-1.201.838-.34.08-.783.14-1.258-.02-.275-.092-.591-.219-1.025-.407-1.84-.794-3.037-2.673-3.129-2.797-.093-.125-.751-.998-.751-1.913 0-.915.481-1.363.652-1.547.171-.184.372-.231.496-.231s.248.001.356.006c.115.005.27-.042.423.328.158.382.541 1.32.588 1.414.047.094.078.204.016.331-.062.126-.093.204-.186.31l-.279.325c-.093.107-.191.224-.083.41.108.187.481.794 1.033 1.285.711.634 1.312.83 1.5.922.188.092.297.077.406-.05.109-.127.466-.541.59-.727.124-.186.248-.156.417-.094s1.071.505 1.257.599c.186.094.31.141.356.221s.047.533-.099.948zM12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11-11-4.925-11-11 4.925-11 11-11z" />
        </svg>
      </a>

      {/* Ticker animation */}
      <style>{`
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
        #ticker-inner { animation: ticker 35s linear infinite; display: flex; }
        #ticker-inner:hover { animation-play-state: paused; }
        @media (max-width: 900px) {
          .chi-siamo-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
