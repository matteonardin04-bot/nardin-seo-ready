import { initialMobile } from '../../viewport';
import React, { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Link } from 'react-router-dom';
import { Head } from '../../shared';
import CarouselDots from '../../CarouselDots';
import LangSwitch from '../../LangSwitch';

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

const fleetData = [
  // GRU
  { id: 'g1', name: 'EFFER 955 6S + JIB 6S', cat: 'Gru', cap: '734 kNm — Ausladung 30+ m', img: '/images/gru-1.webp', desc: 'Unser Spitzenkran. Max. Tragkraft 24 t, hydraulische Ausladung bis 16 m, mit Jib 6S über 30 m. PROGRESS-2.0-System. Für schwere Industriehübe, wo andere Fahrzeuge nicht hinkommen.' },
  { id: 'g2', name: 'EFFER 685', cat: 'Gru', cap: 'Max. Tragkraft 19 t — Ausladung 30 m', img: '/images/gru-2.webp', desc: 'Max. Tragkraft 19 t, Ausladung bis 30 m mit Jib. Die Referenz für komplexe Baustellen und Stahlbaumontagen. Perfektes Gleichgewicht zwischen Tragkraft und Ausladung.' },
  { id: 'g3', name: 'HIAB IQ 708', cat: 'Gru', cap: '60-70 mt — vertikale Reichweite 40 m', img: '/images/gru-3.webp', desc: 'Kran der neuesten Generation in der 60-70-mt-Klasse. Vertikale Reichweite bis 40 m, SPACEevo-Steuerung für millimetergenaue Bewegungen. Ideal für komplexe Industriemontagen.' },
  { id: 'g4', name: 'EFFER 525 6S + JIB 6S', cat: 'Gru', cap: '446 kNm — vielseitig und präzise', img: '/images/gru-4.webp', desc: 'Lastmoment 446 kNm. Mit dem Jib 6S erreicht er große Ausladungen und bleibt dabei wendig. Die Wahl für enge Baustellen und schwieriges alpines Gelände.' },
  { id: 'g5', name: 'EFFER 375', cat: 'Gru', cap: 'Kompakt und wendig — Innenstädte', img: '/images/gru-5.webp', desc: 'Der wendigste Kran der Flotte. Kompakt und schnell aufgestellt, ideal für schnelle Einsätze in Innenstädten, auf Baustellen mit eingeschränkter Zufahrt und überall dort, wo kurze Rüstzeiten entscheiden.' },
  // CAMION
  { id: 'c1', name: 'SCANIA R770 4 ACHSEN', cat: 'Camion', cap: '770 PS — V8', img: '/images/camion-1.webp', desc: 'Das Spitzenfahrzeug der Flotte. 770 PS V8, 4 Achsen für die anspruchsvollsten Lasten. Kombiniert mit dem Effer 955 für die schwersten Hübe.' },
  { id: 'c2', name: 'SCANIA R730 4 ACHSEN', cat: 'Camion', cap: '730 PS — V8', img: '/images/camion-2.webp', desc: '730 PS V8-Leistung auf 4 Achsen. Kombiniert mit dem Effer 685 für komplexe Baustellen und Stahlbaumontagen.' },
  { id: 'c3', name: 'SCANIA R660 4 ACHSEN', cat: 'Camion', cap: '660 PS — 4 Achsen', img: '/images/camion-3.webp', desc: 'Robustes 4-Achs-Fahrzeug, kombiniert mit dem Hiab iQ 708. Leistung und Stabilität für die anspruchsvollsten Einsätze in ganz Norditalien.' },
  { id: 'c4', name: 'VOLVO FH650 3 ACHSEN', cat: 'Camion', cap: '650 PS — 3 Achsen', img: '/images/camion-4.webp', desc: 'Volvo FH650 mit 3 Achsen, kombiniert mit dem Effer 525. Perfektes Gleichgewicht zwischen Leistung, Nutzlast und Wendigkeit.' },
  { id: 'c5', name: 'MERCEDES 2 ACHSEN', cat: 'Camion', cap: 'Wendig — Innenstädte', img: '/images/camion-5.webp', desc: 'Kompaktes 2-Achs-Fahrzeug, kombiniert mit dem Effer 375. Schnell aufgestellt, ideal für Einsätze in Innenstädten und auf Baustellen mit eingeschränkter Zufahrt.' },
  { id: 'c6', name: 'SCANIA S520 2 ACHSEN', cat: 'Camion', cap: '520 PS V8 — Sattelzugmaschine', img: '/images/camion-6.webp', desc: 'V8-Sattelzugmaschine mit 520 PS für Tiefladeauflieger bei Schwertransporten in ganz Italien.' },
  { id: 'c7', name: 'SCANIA R560 2 ACHSEN', cat: 'Camion', cap: '560 PS V8 — Sattelzugmaschine', img: '/images/camion-7.webp', desc: 'V8-Sattelzugmaschine mit 560 PS für Langstreckentransporte und Schwerlastlogistik. Leistung und Zuverlässigkeit für jeden Einsatz.' },
  // RIMORCHI
  { id: 'r1', name: "SATTELTIEFLADER 3 ACHSEN", cat: 'Rimorchi', cap: '3 Achsen — hydraulische Rampen', img: '/images/rimorchio-1.webp', desc: "Tieflader mit 3 Achsen und hydraulischen Rampen für Baumaschinen und Industrieanlagen. Ideal für Bagger, Radlader und Baustellengerät." },
  { id: 'r2', name: "SATTELTIEFLADER 4 ACHSEN", cat: 'Rimorchi', cap: '4 Achsen — Schwerlast', img: '', desc: 'Tieflader mit 4 Achsen und hydraulischen Rampen für schwere und übergroße Lasten. Maximale Nutzlast für große Industriemaschinen.' },
  { id: 'r3', name: 'PRITSCHENAUFLIEGER 3 ACHSEN', cat: 'Rimorchi', cap: '3 Achsen — klappbare Bordwände', img: '/images/rimorchio-3.webp', desc: 'Pritschenauflieger mit 3 Achsen und klappbaren Bordwänden. Vielseitig für Schüttgut, Fertigteile und Ladungen mit seitlicher Sicherung.' },
  { id: 'r4', name: 'TIEFBETTAUFLIEGER 3 ACHSEN', cat: 'Rimorchi', cap: 'Extra tiefe Ladefläche', img: '/images/rimorchio-4.webp', desc: 'Tiefbettauflieger mit 3 Achsen für hohe Ladungen. Die ideale Lösung für Landmaschinen, Arbeitsmaschinen und überhohe Anlagen.' },
  { id: 'r8', name: 'ANHÄNGER MIT BORDWÄNDEN 3 ACHSEN', cat: 'Rimorchi', cap: '3 Achsen — Alu-Bordwände', img: '/images/rimorchio-8.webp', desc: 'Schwarzmüller-Deichselanhänger mit 3 Achsen und klappbaren Alu-Bordwänden. Ideal für Baumaterial, Fertigteile und Ladungen mit seitlicher Sicherung: am Motorwagen erhöht er die Nutzlast jeder Fahrt.' },
  { id: 'r9', name: 'PLATEAUANHÄNGER MIT RAMPEN 3 ACHSEN', cat: 'Rimorchi', cap: '3 Achsen — Auffahrrampen', img: '/images/rimorchio-9.webp', desc: 'FGM-Deichselanhänger mit 3 Achsen, Plateau und Auffahrrampen. Für Minibagger, Arbeitsbühnen und Baumaschinen, die ohne Kran selbst auffahren.' },
  { id: 'r6', name: 'KURZER PRITSCHENAUFLIEGER 2 ACHSEN', cat: 'Rimorchi', cap: '2 Achsen — kompakt und wendig', img: '/images/rimorchio-6.webp', desc: 'Kurzer Pritschenauflieger mit 2 Achsen und klappbaren Bordwänden. Kompakt und wendig, ideal für Innenstädte und Baustellen mit eingeschränkter Zufahrt.' },
  { id: 'r7', name: 'AUSZIEHBARER PRITSCHENAUFLIEGER 3 ACHSEN', cat: 'Rimorchi', cap: '3 Achsen — variable Länge', img: '', desc: 'Ausziehbarer Auflieger mit 3 Achsen und Bordwänden für Träger, Stahlbau und überlange Ladungen. Die variable Länge passt sich jedem Bedarf an.' },
];

const categories = ['Gru', 'Camion', 'Rimorchi'];

const testimonials = [
  { name: 'Andrea M.', comp: 'Mak Costruzioni', text: 'Für die heikelsten Hübe arbeiten wir mit Nardin. Unübertroffen.', spec: 'Spezialhübe' },
  { name: 'Giuseppe B.', comp: 'E-Mac / GB Manci', text: 'Absolute Experten für Turmdrehkran-Transporte. Einwandfreie Logistik.', spec: 'Krantransport' },
  { name: 'Luca T.', comp: 'Tecnoedil', text: 'Professionalität und Fahrzeuge immer top. Eine feste Größe in Trient.', spec: 'Krantransport' },
  { name: 'Hans G.', comp: 'Geobau', text: 'Die einzig mögliche Wahl für schwieriges alpines Gelände.', spec: 'Bohrgerät-Transport' },
];

const projects = [
  { id: 'p1', title: 'Hub von Betonstrukturen', cat: 'Bauwesen', img: '/images/progetto-1.webp' },
  { id: 'p2', title: 'Logistik für Steillagen-Weinberge', cat: 'Landwirtschaft', img: '/images/progetto-2.webp' },
  { id: 'p3', title: 'Umsetzen von Potain-Kranen', cat: 'Spezialtransporte', img: '/images/progetto-3.webp' },
];

const caseStudies = [
  {
    title: 'Montage Turmdrehkran Terex FC6.24H',
    sub: 'Altstadt — obendrehender Kran',
    desc: 'Montage eines obendrehenden Turmdrehkrans Terex FC6.24 für eine Baustelle in der Altstadt. Arbeitshöhe 18 m, Ausleger 24 m. Eine Lösung für enge Stadträume, in denen herkömmliche Krane nicht arbeiten können.',
    tags: ['Terex FC6.24', 'Höhe 18 m — Ausleger 24 m', 'Altstadt'],
    img: '/images/progetto-1.webp',
  },
  {
    title: 'Montage einer Holzverarbeitungsanlage',
    sub: 'Industriemontage im Tandemhub',
    desc: 'Installation einer 8 Tonnen schweren Holzverarbeitungsanlage mit zwei Autokranen im Tandemhub. Der Doppelkran war nötig, um Abmessungen und Höhe der Anlage sicher zu beherrschen.',
    tags: ['Tandemhub mit zwei Kranen', '8 Tonnen', 'Industriemontage'],
    img: '/images/progetto-2.webp',
  },
  {
    title: 'Schwertransport — Schleusentore La Spezia',
    sub: 'Rückhaltebecken — La Spezia',
    desc: 'Transport von 20 Meter langen Stahl-Schleusentoren für ein Rückhaltebecken in La Spezia. Komplette Abwicklung von Sondergenehmigungen, Begleitfahrzeugen und Logistik auf der Strecke durch Italien.',
    tags: ['Schwertransport', '20 m Länge', 'La Spezia'],
    img: '/images/progetto-3.webp',
  },
];

const faqs = [
  { q: 'In welchen Gebieten sind Sie tätig?', a: 'Wir sind im gesamten Trentino-Südtirol, in Venetien und in der Lombardei tätig. Für dringende Einsätze sind wir in ganz Norditalien verfügbar.' },
  { q: 'Kümmern Sie sich um die Genehmigungen für Schwertransporte?', a: 'Ja, wir erledigen alle nötigen Genehmigungen intern, einschließlich Begleitfahrzeugen und Sondergenehmigungen.' },
  { q: 'Sind Sie versichert?', a: 'Ja, alle Aufträge sind durch eine All-Risks-Frachtführerversicherung abgedeckt.' },
  { q: 'Wie lange dauert ein Angebot?', a: 'Wir antworten innerhalb von 24 Stunden während der Geschäftszeiten. In dringenden Fällen sind wir rund um die Uhr unter +39 348 4420285 erreichbar.' },
  { q: 'Arbeiten Sie auch am Wochenende oder im Notfall?', a: 'Ja, für dringende Einsätze sind wir rund um die Uhr per WhatsApp unter +39 348 4420285 erreichbar.' },
];

const S = {
  orange: '#EA580C',
  black: '#0A0A0A',
  dark: '#111111',
  border: '#1C1C1C',
  text: '#F5F5F0',
  muted: '#9CA3AF',
  gray: '#A3A3A3',
  bebas: "'Bebas Neue', sans-serif",
  inter: "'Inter', sans-serif",
};

const inp = (extra = {}) => ({
  width: '100%',
  background: S.black,
  border: `1px solid ${S.border}`,
  color: S.text,
  padding: '12px 14px',
  fontSize: 16,
  outline: 'none',
  fontFamily: S.inter,
  ...extra,
});

export default function HomeDe() {
  const [tab, setTab] = useState('Gru');
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(initialMobile);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalId, setModalId] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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
      <Head title="Nardin Autotrasporti | Autokranvermietung und Schwertransporte Trient" description="Autokranvermietung, Schwertransporte und Industriehübe in Trient und Norditalien seit 1980. Effer-Autokrane bis 95 mt, eigene Flotte, Genehmigungen inklusive, 24/7-Notdienst." path="/de" serviceName="Autokranvermietung und Schwertransporte" serviceDescription="Autokranvermietung mit Kranführer, Schwertransporte, Baukran-Transport und Industrielogistik in Trient und Norditalien." />

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
        #ticker { animation: ticker 35s linear infinite; display: flex; white-space: nowrap; }
        input:focus, textarea:focus, select:focus { border-color: #EA580C !important; }
        @media (max-width: 899px) { .mobile-cta-bar { display: flex !important; } body { padding-bottom: 64px; } }
      `}</style>

      {/* FLEET MODAL */}
      {modal && (
        <div onClick={() => setModalId(null)} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: S.dark, border: `1px solid ${S.border}`, maxWidth: 680, width: '100%', overflow: 'hidden' }}>
            <div style={{ height: 280, overflow: 'hidden', position: 'relative' }}>
              {modal.img ? <img src={modal.img} alt={modal.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#161616', color: S.gray, fontSize: 14, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Foto folgt</div>}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #111 0%, transparent 60%)' }} />
              <button onClick={() => setModalId(null)} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(0,0,0,0.7)', border: `1px solid ${S.border}`, color: S.text, width: 36, height: 36, cursor: 'pointer', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
              <span style={{ position: 'absolute', bottom: 16, left: 20, background: S.orange, color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', padding: '3px 10px', textTransform: 'uppercase' }}>{({ Gru: 'Krane', Camion: 'Lkw', Rimorchi: 'Auflieger' } as Record<string, string>)[modal.cat]}</span>
            </div>
            <div style={{ padding: '24px 28px 28px' }}>
              <div style={{ fontFamily: S.bebas, fontSize: 30, letterSpacing: '0.05em', color: S.text, marginBottom: 8 }}>{modal.name}</div>
              <div style={{ display: 'inline-block', background: S.border, padding: '4px 12px', marginBottom: 14 }}>
                <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', color: S.orange, textTransform: 'uppercase' }}>{modal.cap}</span>
              </div>
              <p style={{ color: S.muted, fontSize: 16, lineHeight: 1.65, marginBottom: 20 }}>{modal.desc}</p>
              <button onClick={() => { setModalId(null); go('contatti'); }} style={{ width: '100%', background: S.orange, color: '#fff', border: 'none', padding: 14, cursor: 'pointer', fontWeight: 700, fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                ANGEBOT ANFORDERN
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 150, background: S.black, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
          <button onClick={closeMenu} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: S.text, fontSize: 28, cursor: 'pointer' }}>×</button>
          {[
            { to: '/de', label: 'Home' },
            { to: '/de/autokranvermietung-trient', label: 'Autokranvermietung' },
            { to: '/de/schwertransporte-trentino', label: 'Schwertransporte' },
            { to: '/de/baukran-transport-montage', label: 'Baukrane' },
            { to: '/de/industrielogistik', label: 'Logistik' },
          ].map(item => (
            <Link key={item.to} to={item.to} onClick={closeMenu} style={{ color: S.text, textDecoration: 'none', cursor: 'pointer', fontFamily: S.bebas, fontSize: 34, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {item.label}
            </Link>
          ))}
          <LangSwitch big />
          <a href="tel:+390461990268" onClick={trackPhoneClick} style={{ background: S.orange, color: '#fff', padding: '12px 32px', textDecoration: 'none', fontSize: 13, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 8 }}>JETZT ANRUFEN</a>
        </div>
      )}

      {/* NAVBAR */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? 'rgba(10,10,10,0.97)' : 'transparent', borderBottom: scrolled ? `1px solid ${S.border}` : '1px solid transparent', padding: scrolled ? '10px 0' : '18px 0', transition: 'all 0.3s' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '0 20px' : '0 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/de" style={{ cursor: 'pointer' }}>
            <img src="/images/logo-nardin.webp" alt="Nardin Autotrasporti" width={72} height={72} style={{ height: 72, width: 'auto', objectFit: 'contain' }} onError={e => { e.currentTarget.style.display = 'none'; }} />
          </Link>
          {!mobile && (
            <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
              {[
                { to: '/de', label: 'Home' },
                { to: '/de/autokranvermietung-trient', label: 'Autokranvermietung' },
                { to: '/de/schwertransporte-trentino', label: 'Schwertransporte' },
                { to: '/de/baukran-transport-montage', label: 'Baukrane' },
                { to: '/de/industrielogistik', label: 'Logistik' },
              ].map(item => (
                <Link key={item.to} to={item.to} style={{ color: S.gray, textDecoration: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}
                  onMouseEnter={e => (e.currentTarget.style.color = S.text)}
                  onMouseLeave={e => (e.currentTarget.style.color = S.gray)}
                >{item.label}</Link>
              ))}
              <LangSwitch />
              <a href="tel:+390461990268" onClick={trackPhoneClick} style={{ background: S.orange, color: '#fff', padding: '9px 18px', textDecoration: 'none', fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>JETZT ANRUFEN</a>
            </div>
          )}
          {mobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <LangSwitch />
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
      <section id="home" style={{ position: 'relative', minHeight: mobile ? '92svh' : '100vh', display: 'flex', alignItems: 'flex-end', paddingBottom: mobile ? 48 : 80, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/images/hero.webp" fetchPriority="high" alt="Nardin Autotrasporti — Industriehübe und Spezialtransporte Trient" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0A0A0A 40%, transparent 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0A0A0A 20%, transparent 70%)' }} />
        </div>
        <div style={{ position: 'absolute', right: '-2%', bottom: '5%', fontFamily: S.bebas, fontSize: 'clamp(140px, 22vw, 380px)', color: 'rgba(255,255,255,0.025)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>1980</div>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto', padding: mobile ? '0 20px' : '0 40px', width: '100%' }}>
          <div style={{ maxWidth: 720 }}>
            <h1 style={{ fontFamily: S.bebas, fontSize: 'clamp(48px, 6.5vw, 100px)', lineHeight: 0.93, letterSpacing: '0.02em', marginBottom: 24, color: S.text }}>
              INDUSTRIEHÜBE<br />
              <span style={{ color: S.orange }}>UND SPEZIAL-</span><br />
              TRANSPORTE
            </h1>
            <p style={{ fontSize: 'clamp(17px, 1.6vw, 20px)', color: S.muted, maxWidth: 540, lineHeight: 1.65, marginBottom: 40 }}>
              Effer-Autokrane bis 95 mt, eigene Flotte, Genehmigungen inklusive. Seit 1980 in Trient und ganz Norditalien im Einsatz.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button onClick={() => go('contatti')} style={{ background: S.orange, color: '#fff', border: 'none', padding: '16px 36px', cursor: 'pointer', fontSize: 13, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#C2410C')}
                onMouseLeave={e => (e.currentTarget.style.background = S.orange)}
              >KOSTENLOSES ANGEBOT ANFORDERN</button>
              <a href="tel:+390461990268" onClick={trackPhoneClick} style={{ background: 'transparent', color: S.text, border: `1px solid ${S.border}`, padding: '16px 36px', textDecoration: 'none', fontSize: 13, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = S.orange)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = S.border)}
              >JETZT ANRUFEN: +39 0461 990268</a>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ background: S.orange, overflow: 'hidden', padding: '11px 0', borderTop: '1px solid #C2410C' }}>
        <div id="ticker" aria-hidden="true">
          {['AUTOKRANVERMIETUNG TRIENT', 'INDUSTRIEHÜBE', 'SEIT 1980', 'NORDITALIEN', '24/7 NOTDIENST', 'EIGENE FLOTTE', 'GENEHMIGUNGEN INKLUSIVE', 'SCHWERTRANSPORTE', 'TRIENT', 'EFFER-AUTOKRANE 95 MT',
            'AUTOKRANVERMIETUNG TRIENT', 'INDUSTRIEHÜBE', 'SEIT 1980', 'NORDITALIEN', '24/7 NOTDIENST', 'EIGENE FLOTTE', 'GENEHMIGUNGEN INKLUSIVE', 'SCHWERTRANSPORTE', 'TRIENT', 'EFFER-AUTOKRANE 95 MT',
            'AUTOKRANVERMIETUNG TRIENT', 'INDUSTRIEHÜBE', 'SEIT 1980', 'NORDITALIEN', '24/7 NOTDIENST', 'EIGENE FLOTTE', 'GENEHMIGUNGEN INKLUSIVE', 'SCHWERTRANSPORTE', 'TRIENT', 'EFFER-AUTOKRANE 95 MT'].map((item, i) => (
            <span key={i} style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', color: '#fff', textTransform: 'uppercase', padding: '0 24px' }}>
              {item} <span style={{ opacity: 0.4 }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div style={{ background: S.dark, borderBottom: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '0 20px' : '0 40px', display: 'grid', gridTemplateColumns: mobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', minWidth: 0 }}>
          {[{ n: '40+', l: 'Jahre Erfahrung' }, { n: '95', l: 'mt max. Lastmoment' }, { n: 'H24', l: 'Notdienst' }, { n: '16+', l: 'Fahrzeuge in der Flotte' }].map((s, i) => (
            <div key={i} style={{ padding: '28px 16px', textAlign: 'center', borderRight: (mobile ? i % 2 === 0 : i < 3) ? `1px solid ${S.border}` : 'none', borderBottom: mobile && i < 2 ? `1px solid ${S.border}` : 'none', minWidth: 0 }}>
              <div style={{ fontFamily: S.bebas, fontSize: 'clamp(32px, 4vw, 48px)', color: S.orange, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', color: S.gray, textTransform: 'uppercase', marginTop: 5 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* COME LAVORIAMO */}
      <section style={{ padding: 'clamp(60px,8vw,100px) 0', background: S.dark, borderBottom: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '0 20px' : '0 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 22, height: 2, background: S.orange }} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.3em', color: S.orange, textTransform: 'uppercase' }}>Unser Ablauf</span>
          </div>
          <h2 style={{ fontFamily: S.bebas, fontSize: 'clamp(36px,6vw,72px)', lineHeight: 0.95, color: S.text, marginBottom: 48 }}>
            SO<br /><span style={{ color: S.orange }}>ARBEITEN WIR</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'minmax(0,1fr)' : 'repeat(4,1fr)', gap: 2, background: S.border }}>
            {[
              { n: '01', title: 'Kontakt', desc: 'Telefon, WhatsApp oder Online-Formular. Antwort innerhalb von 2 Stunden während der Geschäftszeiten.', icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.09 2.1 2 2 0 012.06 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>
              ) },
              { n: '02', title: 'Kostenlose Besichtigung', desc: 'Wir prüfen Baustelle und Einsatzbedingungen, um die sicherste Lösung zu garantieren.', icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              ) },
              { n: '03', title: 'Angebot in 24 Std.', desc: 'Sie erhalten innerhalb von 24 Stunden ein detailliertes Angebot. Genehmigungen und Begleitfahrzeuge bereits inklusive.', icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M9 16l2 2 4-4"/></svg>
              ) },
              { n: '04', title: 'Sicherer Einsatz', desc: 'Unsere erfahrenen Kranführer arbeiten unter Einhaltung aller Sicherheitsstandards.', icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              ) },
            ].map((step, i) => (
              <div key={i} style={{ background: S.black, padding: mobile ? '18px 20px' : 'clamp(24px,3vw,40px)', display: 'flex', flexDirection: 'column', gap: mobile ? 8 : 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {step.icon}
                  <span style={{ fontFamily: S.bebas, fontSize: mobile ? 32 : 48, color: 'rgba(234,88,12,0.45)', lineHeight: 1 }}>{step.n}</span>
                </div>
                <h3 style={{ fontFamily: S.bebas, fontSize: 22, color: S.text, letterSpacing: '0.03em' }}>{step.title}</h3>
                <p style={{ color: S.gray, fontSize: 15, lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHI SIAMO */}
      <section id="chi-siamo" style={{ padding: 'clamp(60px,8vw,120px) 0', background: S.black }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '0 20px' : '0 40px', display: 'grid', gridTemplateColumns: mobile ? 'minmax(0,1fr)' : 'minmax(0,1fr) minmax(0,1fr)', gap: mobile ? 32 : 80, alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <img src="/images/about.webp" loading="lazy" decoding="async" alt="Walter und Ivana Nardin — Nardin Autotrasporti Trient" onError={e => (e.currentTarget.style.display = 'none')} style={{ width: '100%', aspectRatio: mobile ? '4/3' : '4/5', objectFit: 'cover', filter: 'grayscale(30%)' }} />
            <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, background: 'rgba(10,10,10,0.92)', border: `1px solid ${S.border}`, padding: '18px 22px' }}>
              <p style={{ fontFamily: S.bebas, fontSize: 18, letterSpacing: '0.05em', color: S.text, marginBottom: 5 }}>„Unsere Stärke ist der Mensch hinter der Maschine.“</p>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', color: S.orange, textTransform: 'uppercase' }}>Walter & Ivana Nardin</p>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 22, height: 2, background: S.orange }} />
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.3em', color: S.orange, textTransform: 'uppercase' }}>Unsere Geschichte</span>
            </div>
            <h2 style={{ fontFamily: S.bebas, fontSize: 'clamp(36px,5vw,64px)', lineHeight: 0.95, letterSpacing: '0.03em', color: S.text, marginBottom: 24 }}>
              SEIT 1980<br />TECHNISCHE<br /><span style={{ color: S.orange }}>EXZELLENZ</span>
            </h2>
            <div style={{ width: 36, height: 3, background: S.orange, marginBottom: 24 }} />
            <p style={{ color: S.muted, fontSize: 17, lineHeight: 1.75, marginBottom: 16 }}>
              Alles beginnt <strong style={{ color: S.text }}>1980</strong>, als Mario Nardin das Unternehmen mit einer klaren Vision gründet: Transportdienstleistungen mit höchster Zuverlässigkeit.
            </p>
            <p style={{ color: S.muted, fontSize: 17, lineHeight: 1.75, marginBottom: 32 }}>
              Heute führen <strong style={{ color: S.text }}>Walter und Ivana Nardin</strong> diese Leidenschaft fort. Wir sind die erste Adresse für <strong style={{ color: S.text }}>Autokranvermietung in Trient</strong> und <strong style={{ color: S.text }}>Industriehübe im Trentino</strong> mit Effer-Autokranen bis 95 mt.
            </p>
            <div style={{ display: mobile ? 'none' : 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 1, background: S.border, border: `1px solid ${S.border}`, marginBottom: 24, overflowWrap: 'anywhere' }}>
              {[
                { t: 'Frachtführerversicherung', s: 'All-Risks-Deckung' },
                { t: '24/7 Notdienst', s: 'Kran-Notdienst' },
                { t: 'Begleitfahrzeuge', s: 'Sondergenehmigungen inklusive' },
                { t: 'Transportunternehmerregister', s: 'TN/2053832Z' },
              ].map((item, i) => (
                <div key={i} style={{ background: S.dark, padding: 18 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', color: S.text, textTransform: 'uppercase', marginBottom: 2 }}>{item.t}</p>
                  <p style={{ fontSize: 13, color: S.gray }}>{item.s}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 13, color: '#9CA3AF', letterSpacing: '0.05em' }}>USt-IdNr. IT01762870226 · Nardin Autotrasporti s.n.c. di Nardin Walter e Ivana</p>
          </div>
        </div>
      </section>

      {/* SERVIZI */}
      <section id="servizi" style={{ padding: 'clamp(60px,8vw,120px) 0', background: S.dark, borderTop: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '0 20px' : '0 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 22, height: 2, background: S.orange }} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.3em', color: S.orange, textTransform: 'uppercase' }}>Was wir tun</span>
          </div>
          <h2 style={{ fontFamily: S.bebas, fontSize: 'clamp(36px,6vw,72px)', lineHeight: 0.95, color: S.text, marginBottom: 48 }}>
            UNSERE<br /><span style={{ color: S.orange }}>LEISTUNGEN</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 2, background: S.border }}>
            {[
              { n: '01', t: 'Autokranvermietung Trient', d: 'Effer- und Hiab-Autokrane bis 95 mt mit Kranführer. Für Industriemontagen, Stahlbau und Hübe auf engstem Raum.', tags: ['Effer bis 95 mt', 'Mit Kranführer', 'Enge Platzverhältnisse'], to: '/de/autokranvermietung-trient' },
              { n: '02', t: 'Schwertransporte', d: 'Komplette Abwicklung für übergroße Ladungen im Trentino und in ganz Norditalien. Sondergenehmigungen und Begleitfahrzeuge inklusive.', tags: ['Übergroße Ladungen', 'Genehmigungen inklusive', 'Begleitfahrzeuge'], to: '/de/schwertransporte-trentino' },
              { n: '03', t: 'Transport von Baukranen', d: 'Demontage, Transport und Wiedermontage von Potain-Turmdrehkranen und ähnlichen Modellen. Komplette Logistikplanung für Baustellen jeder Größe.', tags: ['Potain-Krane', 'Baustellenlogistik', 'Norditalien'], to: '/de/baukran-transport-montage' },
              { n: '04', t: 'Industrielogistik', d: 'Transport und Umsetzen von Schwermaschinen, Werkzeugmaschinen, Fertigteilen und Stahlbau. Maßgeschneiderte Lösungen für jeden Bedarf.', tags: ['Schwermaschinen', 'Fertigteile', 'Maßgeschneidert'], to: '/de/industrielogistik' },
            ].map((s, i) => (
              <div key={i} style={{ background: S.black, padding: mobile ? '22px 20px' : 'clamp(24px,4vw,48px)' }}>
                <div style={{ display: mobile ? 'none' : 'block', fontFamily: S.bebas, fontSize: 56, color: 'rgba(234,88,12,0.35)', lineHeight: 1, marginBottom: 12 }}>{s.n}</div>
                <h3 style={{ fontFamily: S.bebas, fontSize: 'clamp(22px,2.5vw,30px)', color: S.text, marginBottom: 12 }}>{s.t}</h3>
                <p style={{ color: S.gray, fontSize: 16, lineHeight: 1.7, marginBottom: mobile ? 16 : 20 }}>{s.d}</p>
                <div style={{ display: mobile ? 'none' : 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                  {s.tags.map(tag => <span key={tag} style={{ border: `1px solid ${S.border}`, padding: '3px 10px', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: S.gray, textTransform: 'uppercase' }}>{tag}</span>)}
                </div>
                <Link to={s.to} style={{ display: 'inline-block', background: 'none', border: `1px solid ${S.orange}`, color: S.orange, padding: '8px 20px', cursor: 'pointer', fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.background = S.orange; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = S.orange; }}
                >ZUM LEISTUNGSANGEBOT →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASI STUDIO */}
      <section style={{ padding: 'clamp(60px,8vw,120px) 0', background: S.black, borderTop: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '0 20px' : '0 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 22, height: 2, background: S.orange }} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.3em', color: S.orange, textTransform: 'uppercase' }}>Echte Projekte</span>
          </div>
          <h2 style={{ fontFamily: S.bebas, fontSize: 'clamp(36px,6vw,72px)', lineHeight: 0.95, color: S.text, marginBottom: 48 }}>
            REFERENZ<br /><span style={{ color: S.orange }}>PROJEKTE</span>
          </h2>
          <div style={mobile ? { display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory', gap: 12, background: 'none', margin: '0 -20px', padding: '0 20px 8px', scrollPaddingLeft: 20, scrollbarWidth: 'none' as const } : { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, background: S.border }}>
            {caseStudies.map((c, i) => (
              <div key={i} style={{ ...(mobile ? { flex: '0 0 84%', scrollSnapAlign: 'start', } : {}), background: S.dark, overflow: 'hidden' }}>
                <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
                  <img src={c.img} alt={c.title} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(30%)', transition: 'transform 0.6s' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.filter = 'grayscale(0%)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'grayscale(30%)'; }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
                </div>
                <div style={{ padding: 24 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', color: S.orange, textTransform: 'uppercase', marginBottom: 6 }}>{c.sub}</p>
                  <h3 style={{ fontFamily: S.bebas, fontSize: 22, color: S.text, marginBottom: 12, letterSpacing: '0.03em' }}>{c.title}</h3>
                  <p style={{ color: S.gray, fontSize: 15, lineHeight: 1.6, marginBottom: 16 }}>{c.desc}</p>
                  <div style={{ display: mobile ? 'none' : 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {c.tags.map(tag => (
                      <span key={tag} style={{ border: `1px solid ${S.border}`, padding: '2px 8px', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: S.gray, textTransform: 'uppercase' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {mobile && <CarouselDots count={caseStudies.length} label="Wischen, um alles zu sehen" />}
        </div>
      </section>



      {/* TESTIMONIALS */}
      <section style={{ padding: 'clamp(60px,8vw,120px) 0', background: S.black, borderTop: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '0 20px' : '0 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 22, height: 2, background: S.orange }} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.3em', color: S.orange, textTransform: 'uppercase' }}>Kundenstimmen</span>
          </div>
          <h2 style={{ fontFamily: S.bebas, fontSize: 'clamp(36px,6vw,72px)', lineHeight: 0.95, color: S.text, marginBottom: 40 }}>
            PARTNER<br /><span style={{ color: S.orange }}>DES VERTRAUENS</span>
          </h2>
          <div style={mobile ? { display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory', gap: 12, background: 'none', margin: '0 -20px', padding: '0 20px 8px', scrollPaddingLeft: 20, scrollbarWidth: 'none' as const } : { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2, background: S.border }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ ...(mobile ? { flex: '0 0 84%', scrollSnapAlign: 'start', } : {}), background: S.dark, padding: 'clamp(20px,3vw,32px)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ color: S.orange, fontSize: 17, letterSpacing: 2, marginBottom: 16 }}>★★★★★</div>
                <p style={{ color: S.muted, fontSize: 15, lineHeight: 1.7, fontStyle: 'italic', flexGrow: 1, marginBottom: 20 }}>"{t.text}"</p>
                <div style={{ borderTop: `1px solid ${S.border}`, paddingTop: 16 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', color: S.text, textTransform: 'uppercase', marginBottom: 2 }}>{t.name}</p>
                  <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: S.orange, textTransform: 'uppercase', marginBottom: 8 }}>{t.comp}</p>
                  <span style={{ border: `1px solid ${S.border}`, padding: '3px 9px', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: S.gray, textTransform: 'uppercase' }}>{t.spec}</span>
                </div>
              </div>
            ))}
          </div>
          {mobile && <CarouselDots count={testimonials.length} label="Wischen, um alles zu sehen" />}
        </div>
      </section>

      {/* FLOTTA */}
      <section id="flotta" style={{ padding: 'clamp(60px,8vw,120px) 0', background: S.dark, borderTop: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '0 20px' : '0 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 22, height: 2, background: S.orange }} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.3em', color: S.orange, textTransform: 'uppercase' }}>Eigene Flotte</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 20 }}>
            <h2 style={{ fontFamily: S.bebas, fontSize: 'clamp(36px,6vw,72px)', lineHeight: 0.95, color: S.text }}>
              UNSER<br /><span style={{ color: S.orange }}>FUHRPARK</span>
            </h2>
            <div style={{ display: 'flex', gap: 2, background: S.border }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setTab(cat)} style={{ background: tab === cat ? S.orange : S.black, color: tab === cat ? '#fff' : S.gray, border: 'none', padding: '10px 22px', cursor: 'pointer', fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', transition: 'all 0.2s' }}>
                  {({ Gru: 'Krane', Camion: 'Lkw', Rimorchi: 'Auflieger' } as Record<string, string>)[cat]}
                </button>
              ))}
            </div>
          </div>
          <div key={tab} style={mobile ? { display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory', gap: 12, background: 'none', margin: '0 -20px', padding: '0 20px 8px', scrollPaddingLeft: 20, scrollbarWidth: 'none' as const } : { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, background: S.border }}>
            {fleet.map(item => (
              <div key={item.id} onClick={() => setModalId(item.id)} style={{ ...(mobile ? { flex: '0 0 84%', scrollSnapAlign: 'start', } : {}), background: S.black, cursor: 'pointer', overflow: 'hidden' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#161616')}
                onMouseLeave={e => (e.currentTarget.style.background = S.black)}
              >
                <div style={{ height: 190, overflow: 'hidden', position: 'relative' }}>
                  {item.img ? (
                    <img src={item.img} alt={item.name} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                  ) : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#161616', color: S.gray, fontSize: 14, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Foto folgt</div>}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
                </div>
                <div style={{ padding: 18 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', color: S.orange, textTransform: 'uppercase', marginBottom: 6 }}>{item.cap}</div>
                  <h4 style={{ fontFamily: S.bebas, fontSize: 18, color: S.text, marginBottom: 6, lineHeight: 1.1 }}>{item.name}</h4>
                  <p style={{ fontSize: 14, color: S.gray, lineHeight: 1.5, marginBottom: 12, ...(mobile ? { display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' } : {}) }}>{item.desc}</p>
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', color: S.orange, textTransform: 'uppercase' }}>DETAILS →</span>
                </div>
              </div>
            ))}
          </div>
          {mobile && <CarouselDots count={fleet.length} label="Wischen, um alles zu sehen" />}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: 'clamp(60px,8vw,100px) 0', background: S.black, borderTop: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: mobile ? '0 20px' : '0 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 22, height: 2, background: S.orange }} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.3em', color: S.orange, textTransform: 'uppercase' }}>Häufige Fragen</span>
          </div>
          <h2 style={{ fontFamily: S.bebas, fontSize: 'clamp(36px,6vw,72px)', lineHeight: 0.95, color: S.text, marginBottom: 48 }}>
            ALLES<br /><span style={{ color: S.orange }}>WAS SIE WISSEN MÜSSEN</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: S.border }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ background: S.dark }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', background: 'none', border: 'none', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ fontFamily: S.bebas, fontSize: 18, color: S.text, letterSpacing: '0.03em' }}>{f.q}</span>
                  <span style={{ color: S.orange, fontSize: 22, fontWeight: 300, flexShrink: 0, marginLeft: 16 }}>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 24px 20px', borderTop: `1px solid ${S.border}` }}>
                    <p style={{ color: S.muted, fontSize: 16, lineHeight: 1.7, paddingTop: 16 }}>{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATTI */}
      <section id="contatti" style={{ padding: 'clamp(60px,8vw,120px) 0', background: S.dark, borderTop: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '0 20px' : '0 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 22, height: 2, background: S.orange }} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.3em', color: S.orange, textTransform: 'uppercase' }}>Kontakt</span>
          </div>
          <h2 style={{ fontFamily: S.bebas, fontSize: 'clamp(36px,6vw,72px)', lineHeight: 0.95, color: S.text, marginBottom: 24 }}>
            KOSTENLOSES<br /><span style={{ color: S.orange }}>ANGEBOT</span>
          </h2>

          {/* TRUST BADGE */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 40, padding: '16px 20px', background: S.black, border: `1px solid ${S.border}` }}>
            {[
              { label: '★ 5.0 Google', link: 'https://www.google.com/maps/place/Nardin+Autotrasporti' },
              { label: 'Seit 1980', link: null },
              { label: '24/7 erreichbar', link: null },
              { label: 'Genehmigungen inklusive', link: null },
              { label: 'All-Risks-Versicherung', link: null },
            ].map((b, i) => b.link ? (
              <a key={i} href={b.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', color: S.orange, textTransform: 'uppercase', textDecoration: 'none', borderRight: i < 4 ? `1px solid ${S.border}` : 'none', paddingRight: 12 }}>{b.label}</a>
            ) : (
              <span key={i} style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', color: S.gray, textTransform: 'uppercase', borderRight: i < 4 ? `1px solid ${S.border}` : 'none', paddingRight: 12 }}>{b.label}</span>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1.6fr', gap: 2, background: S.border }}>
            {/* INFO PANEL */}
            <div style={{ background: S.black, padding: 'clamp(28px,4vw,52px)', display: 'flex', flexDirection: 'column', gap: 28 }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', color: S.gray, textTransform: 'uppercase', marginBottom: 6 }}>Direkte Telefonnummer</p>
                <a href="tel:+390461990268" onClick={trackPhoneClick} style={{ fontFamily: S.bebas, fontSize: 'clamp(24px,3vw,36px)', color: S.text, textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = S.orange)}
                  onMouseLeave={e => (e.currentTarget.style.color = S.text)}
                >+39 0461 990268</a>
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', color: S.gray, textTransform: 'uppercase', marginBottom: 6 }}>WhatsApp 24/7</p>
                <a href="https://wa.me/393484420285" onClick={trackWhatsAppClick} target="_blank" rel="noopener noreferrer" style={{ fontFamily: S.bebas, fontSize: 'clamp(20px,2.5vw,30px)', color: S.text, textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#22C55E')}
                  onMouseLeave={e => (e.currentTarget.style.color = S.text)}
                >+39 348 4420285</a>
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', color: S.gray, textTransform: 'uppercase', marginBottom: 6 }}>Firmensitz</p>
                <p style={{ color: S.text, fontSize: 17, lineHeight: 1.5 }}>Via Aeroporto, 31<br />38121 Trient (TN), Italien</p>
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', color: S.gray, textTransform: 'uppercase', marginBottom: 6 }}>Email</p>
                <a href="mailto:info@nardinautotrasporti.it" style={{ color: S.orange, fontSize: 16, textDecoration: 'none' }}>info@nardinautotrasporti.it</a>
              </div>
              <div style={{ marginTop: 'auto', paddingTop: 24, borderTop: `1px solid ${S.border}` }}>
                <p style={{ fontSize: 12, color: '#9CA3AF', lineHeight: 1.7 }}>
                  Nardin Autotrasporti s.n.c.<br />
                  P.IVA 01762870226<br />
                  Albo Autotrasportatori TN/2053832Z
                </p>
              </div>
            </div>

            {/* FORM */}
            <div style={{ background: S.dark, padding: mobile ? '24px 20px' : 'clamp(28px,4vw,52px)', order: mobile ? -1 : 0 }}>
              {state.succeeded ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', gap: 14 }}>
                  <div style={{ fontFamily: S.bebas, fontSize: 72, color: S.orange }}>✓</div>
                  <h3 style={{ fontFamily: S.bebas, fontSize: 32, color: S.text }}>ANFRAGE GESENDET</h3>
                  <p style={{ color: S.muted, fontSize: 17, lineHeight: 1.6 }}>Wir rufen Sie innerhalb von 2 Stunden während der Geschäftszeiten zurück.<br />Dringend: <a href="tel:+390461990268" onClick={trackPhoneClick} style={{ color: S.orange, textDecoration: 'none' }}>0461 990268</a></p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 12 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', color: S.gray, textTransform: 'uppercase', marginBottom: 6 }}>Firmenname *</label>
                      <input name="company" type="text" required placeholder="Firma GmbH" style={inp()} />
                      <ValidationError prefix="Company" field="company" errors={state.errors} style={{ color: '#EF4444', fontSize: 13, marginTop: 3 }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', color: S.gray, textTransform: 'uppercase', marginBottom: 6 }}>Telefon *</label>
                      <input name="phone" type="tel" required placeholder="+39 ..." style={inp()} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', color: S.gray, textTransform: 'uppercase', marginBottom: 6 }}>E-Mail *</label>
                    <input name="email" type="email" required placeholder="info@azienda.it" style={inp()} />
                    <ValidationError prefix="Email" field="email" errors={state.errors} style={{ color: '#EF4444', fontSize: 13, marginTop: 3 }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', color: S.gray, textTransform: 'uppercase', marginBottom: 6 }}>Art des Einsatzes</label>
                    <select name="service" style={inp({ cursor: 'pointer' })}>
                      <option>Autokranvermietung</option>
                      <option>Industriehub</option>
                      <option>Schwertransport</option>
                      <option>Baukranmontage</option>
                      <option>Sonstiges</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', color: S.gray, textTransform: 'uppercase', marginBottom: 6 }}>Ort / Baustelle</label>
                    <input name="location" type="text" placeholder="Ort, Adresse der Baustelle..." style={inp()} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', color: S.gray, textTransform: 'uppercase', marginBottom: 6 }}>Beschreibung des Auftrags</label>
                    <textarea name="message" rows={3} placeholder="Gewichte, Maße, Höhen, Termine, Hinweise..." style={inp({ resize: 'vertical', fontFamily: S.inter })} />
                    <ValidationError prefix="Message" field="message" errors={state.errors} style={{ color: '#EF4444', fontSize: 13, marginTop: 3 }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', color: S.gray, textTransform: 'uppercase', marginBottom: 6 }}>Foto der Ladung / Baustelle (optional)</label>
                    <input name="attachment" type="file" accept="image/*,.pdf" style={{ ...inp(), padding: '10px 14px', cursor: 'pointer' }} />
                  </div>
                  <button type="submit" disabled={state.submitting} style={{ background: S.orange, color: '#fff', border: 'none', padding: 18, cursor: state.submitting ? 'not-allowed' : 'pointer', opacity: state.submitting ? 0.6 : 1, fontSize: 13, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase' }}
                    onMouseEnter={e => { if (!state.submitting) e.currentTarget.style.background = '#C2410C'; }}
                    onMouseLeave={e => { if (!state.submitting) e.currentTarget.style.background = S.orange; }}
                  >
                    {state.submitting ? 'WIRD GESENDET...' : 'KOSTENLOSES ANGEBOT ANFORDERN'}
                  </button>
                  <p style={{ fontSize: 13, color: '#9CA3AF', textAlign: 'center' }}>Wir rufen Sie innerhalb von 2 Stunden während der Geschäftszeiten zurück. Dringend: <a href="tel:+390461990268" onClick={trackPhoneClick} style={{ color: S.orange, textDecoration: 'none' }}>0461 990268</a></p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: S.black, borderTop: `1px solid ${S.border}`, padding: 'clamp(36px,6vw,72px) 0 100px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '0 20px' : '0 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40, flexWrap: 'wrap', gap: 28 }}>
            <div>
              <img src="/images/logo-nardin.webp" alt="Nardin Autotrasporti" width={56} height={56} loading="lazy" decoding="async" style={{ height: 56, width: 'auto', objectFit: 'contain', marginBottom: 12 }} onError={e => { e.currentTarget.style.display = 'none'; }} />
              <p style={{ color: S.gray, fontSize: 14, maxWidth: 280, lineHeight: 1.6 }}>Autokranvermietung, Schwertransporte und Industriehübe in Trient seit 1980.</p>
              <p style={{ color: '#9CA3AF', fontSize: 13, marginTop: 12, lineHeight: 1.7 }}>
                Nardin Autotrasporti s.n.c. di Nardin Walter e Ivana<br />
                USt-IdNr. IT01762870226 · Register TN/2053832Z<br />
                All-Risks-Frachtführerversicherung
              </p>
            </div>
            <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', color: S.orange, textTransform: 'uppercase', marginBottom: 12 }}>Navigation</p>
                {['chi-siamo', 'servizi', 'flotta', 'contatti'].map(id => (
                  <button key={id} onClick={() => go(id)} style={{ display: 'block', background: 'none', border: 'none', color: S.gray, cursor: 'pointer', fontSize: 14, textTransform: 'capitalize', padding: '3px 0', textAlign: 'left' }}
                    onMouseEnter={e => (e.currentTarget.style.color = S.text)}
                    onMouseLeave={e => (e.currentTarget.style.color = S.gray)}
                  >{({ 'chi-siamo': 'Über uns', servizi: 'Leistungen', flotta: 'Flotte', contatti: 'Kontakt' } as Record<string, string>)[id]}</button>
                ))}
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', color: S.orange, textTransform: 'uppercase', marginBottom: 12 }}>Kontakt</p>
                <p style={{ color: S.gray, fontSize: 14, lineHeight: 1.9 }}>
                  Via Aeroporto, 31<br />38121 Trient (TN), Italien<br />
                  <a href="tel:+390461990268" onClick={trackPhoneClick} style={{ color: S.gray, textDecoration: 'none' }}>+39 0461 990268</a><br />
                  <a href="https://wa.me/393484420285" onClick={trackWhatsAppClick} style={{ color: '#22C55E', textDecoration: 'none', fontSize: 13 }}>WhatsApp 24/7</a><br />
                  <a href="mailto:info@nardinautotrasporti.it" style={{ color: S.orange, textDecoration: 'none', fontSize: 13 }}>info@nardinautotrasporti.it</a>
                </p>
              </div>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${S.border}`, paddingTop: 20, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <p style={{ fontSize: 12, color: '#9CA3AF' }}>© 2026 Nardin Autotrasporti s.n.c. — Alle Rechte vorbehalten</p>
            <a href="https://www.instagram.com/nardinautotrasporti/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, fontWeight: 700, color: '#9CA3AF', textDecoration: 'none', textTransform: 'uppercase' }}
              onMouseEnter={e => (e.currentTarget.style.color = S.text)}
              onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}
            >Instagram</a>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY CTA BAR */}
      <div className="mobile-cta-bar" style={{ display: 'none', position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 120, background: '#0A0A0A', borderTop: `1px solid ${S.border}`, padding: '10px 16px', gap: 8 }}>
        <a href="tel:+390461990268" onClick={trackPhoneClick} style={{ flex: 1, background: S.orange, color: '#fff', padding: '12px 8px', textDecoration: 'none', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 48, whiteSpace: 'nowrap' }}>ANRUFEN</a>
        <a href="https://wa.me/393484420285" onClick={trackWhatsAppClick} target="_blank" rel="noopener noreferrer" style={{ flex: 1, background: '#16A34A', color: '#fff', padding: '12px 8px', textDecoration: 'none', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 48, whiteSpace: 'nowrap' }}>WHATSAPP</a>
        <button onClick={() => go('contatti')} style={{ flex: 1, background: S.dark, color: S.text, border: `1px solid ${S.border}`, padding: '12px 8px', cursor: 'pointer', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>ANGEBOT</button>
      </div>

      {/* WHATSAPP FAB (desktop only) */}
      {!mobile && (
        <a href="https://wa.me/393484420285" onClick={trackWhatsAppClick} target="_blank" rel="noopener noreferrer" style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 110, background: '#16A34A', color: '#fff', width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', border: '2px solid rgba(255,255,255,0.15)' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#15803D'; e.currentTarget.style.transform = 'scale(1.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#16A34A'; e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.539 2.016 2.126-.54c1.029.563 2.025.844 3.162.844 3.181 0 5.767-2.586 5.768-5.766.001-3.18-2.587-5.767-5.768-5.767zm3.39 8.251c-.146.415-.852.756-1.201.838-.34.08-.783.14-1.258-.02-.275-.092-.591-.219-1.025-.407-1.84-.794-3.037-2.673-3.129-2.797-.093-.125-.751-.998-.751-1.913 0-.915.481-1.363.652-1.547.171-.184.372-.231.496-.231s.248.001.356.006c.115.005.27-.042.423.328.158.382.541 1.32.588 1.414.047.094.078.204.016.331-.062.126-.093.204-.186.31l-.279.325c-.093.107-.191.224-.083.41.108.187.481.794 1.033 1.285.711.634 1.312.83 1.5.922.188.092.297.077.406-.05.109-.127.466-.541.59-.727.124-.186.248-.156.417-.094s1.071.505 1.257.599c.186.094.31.141.356.221s.047.533-.099.948zM12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11-11-4.925-11-11 4.925-11 11-11z" />
          </svg>
        </a>
      )}

    </div>
  );
}
