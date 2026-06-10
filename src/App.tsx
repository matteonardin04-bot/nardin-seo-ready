import React, { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';

// --- DATA ---
const fleetData = [
  { id: 'f1', name: 'MOTRICE SCANIA R770 4 ASSI + EFFER 955', cat: 'Gru', cap: '95 t/m - 770 CV', img: `${import.meta.env.BASE_URL}images/flotta-1.jpg`, desc: 'Top di gamma per sollevamenti industriali pesanti. Equipaggiato con Jib per sbracci estremi.' },
  { id: 'f2', name: 'MOTRICE SCANIA 4 ASSI R730 + GRU EFFER', cat: 'Gru', cap: 'V8 730 CV', img: `${import.meta.env.BASE_URL}images/flotta-2.jpg`, desc: 'Potenza pura unita alla versatilità delle gru Effer per carichi impegnativi.' },
  { id: 'f3', name: 'Trattore Scania S520 2 assi', cat: 'Camion', cap: '520 CV V8', img: `${import.meta.env.BASE_URL}images/flotta-3.jpg`, desc: 'Motrice dedicata al traino di semirimorchi ribassati per trasporti nazionali.' },
  { id: 'f5', name: 'Trattore Scania R560 2 assi', cat: 'Camion', cap: '560 CV V8', img: `${import.meta.env.BASE_URL}images/flotta-7.jpg`, desc: 'Potenza e versatilità per trasporti a lungo raggio e logistica pesante.' },
  { id: 'f4_c', name: 'TRATTORE VOLVO 3 ASSI + EFFER 525', cat: 'Camion', cap: '52.5 t/m', img: `${import.meta.env.BASE_URL}images/flotta-4.jpg`, desc: 'Equilibrio perfetto tra capacità di carico e agilità di manovra.' },
  { id: 'f6_c', name: 'TRATTORE MERCEDES 2 ASSI + EFFER 375', cat: 'Camion', cap: '37.5 t/m', img: `${import.meta.env.BASE_URL}images/flotta-8.jpg`, desc: 'Unità compatta e potente per lavori in centri urbani e spazi ristretti.' },
  { id: 'f4', name: 'TRATTORE VOLVO 3 ASSI + EFFER 525', cat: 'Gru', cap: '52.5 t/m', img: `${import.meta.env.BASE_URL}images/flotta-4.jpg`, desc: 'Equilibrio perfetto tra capacità di carico e agilità di manovra.' },
  { id: 'f6', name: 'TRATTORE MERCEDES 2 ASSI + EFFER 375', cat: 'Gru', cap: '37.5 t/m', img: `${import.meta.env.BASE_URL}images/flotta-8.jpg`, desc: 'Unità compatta e potente per lavori in centri urbani e spazi ristretti.' },
  { id: 'f_soon', name: 'COMING SOON', cat: 'Gru', cap: 'Nuovo Mezzo in Arrivo', img: `${import.meta.env.BASE_URL}images/coming-soon.jpg`, desc: 'Stiamo ampliando la nostra flotta con nuovi mezzi all\'avanguardia.' },
  { id: 'r1', name: "PIANALE COLLO D'OCA 3 ASSI CON RAMPE", cat: 'Rimorchi', cap: '3 Assi - Rampe', img: `${import.meta.env.BASE_URL}images/flotta-5.jpg`, desc: "Pianale tecnico FGM a 3 assi con rampe idrauliche per il carico di mezzi d'opera." },
  { id: 'r3', name: "PIANALE COLLO D'OCA 4 ASSI CON RAMPE", cat: 'Rimorchi', cap: '4 Assi - Carichi Pesanti', img: `${import.meta.env.BASE_URL}images/flotta-9.jpg`, desc: 'Soluzione robusta a 4 assi per il trasporto di macchinari industriali pesanti con sbalzi ridotti.' },
  { id: 'r4', name: 'SEMIRIMORCHIO CULLA RIBASSATO 3 ASSI', cat: 'Rimorchi', cap: 'Culla Ribassata', img: `${import.meta.env.BASE_URL}images/flotta-10.jpg`, desc: 'Ideale per il trasporto di macchine agricole o operatrici con altezza elevata.' },
  { id: 'r5', name: 'PIANALE ALLUNGABILE 3 ASSI', cat: 'Rimorchi', cap: 'Allungabile', img: `${import.meta.env.BASE_URL}images/flotta-11.jpg`, desc: 'Versatilità massima per il trasporto di travi, prefabbricati o carichi longitudinali eccezionali.' },
  { id: 'r6', name: 'PIANALE PASSO CORTO 2 ASSI', cat: 'Rimorchi', cap: 'Agile - 2 Assi', img: `${import.meta.env.BASE_URL}images/flotta-12.jpg`, desc: 'Compattezza e manovrabilità per carichi meno ingombranti in contesti difficili.' },
  { id: 'r2', name: 'Rimorchio 3 Assi CON SPONDE', cat: 'Rimorchi', cap: 'Carico Variabile', img: `${import.meta.env.BASE_URL}images/flotta-6.jpg`, desc: 'Versione con sponde in alluminio per materiali sfusi e attrezzature.' },
  { id: 'r7', name: 'SEMIRIMORCHIO CENTINATO 3 ASSI', cat: 'Rimorchi', cap: 'Centinato - 3 Assi', img: `${import.meta.env.BASE_URL}images/flotta-13.jpg`, desc: 'Semirimorchio classico con centina e teli scorrevoli per il trasporto di merci pallettizzate e carichi protetti.' }
];

const categories = [
  { id: 'Camion', title: 'Camion e Trattori', icon: '🚛', desc: 'Motrici Scania e Volvo per carichi pesanti.' },
  { id: 'Gru', title: 'Autogrù Effer/Hiab', icon: '🏗️', desc: 'Sollevamenti fino a 95 t/m con precisione millimetrica.' },
  { id: 'Rimorchi', title: 'Rimorchi e Semirimorchi', icon: '🛣️', desc: 'Unità a 3 assi con rampe e sponde per ogni esigenza.' }
];

const projects = [
  { id: 'p1', title: 'Sollevamento Strutture Cemento', cat: 'Cantieristica', img: `${import.meta.env.BASE_URL}images/progetto-1.jpg` },
  { id: 'p2', title: 'Logistica Vigneti Eroici', cat: 'Agricoltura', img: `${import.meta.env.BASE_URL}images/progetto-2.jpg` },
  { id: 'p3', title: 'Movimentazione Gru Potain', cat: 'Trasporti Speciali', img: `${import.meta.env.BASE_URL}images/progetto-3.jpg` }
];

const testimonials = [
  { name: 'Andrea M.', comp: 'Mak Costruzioni', text: 'Collaboriamo con Nardin per i sollevamenti più delicati. Ineguagliabili.', spec: 'Sollevamenti Speciali' },
  { name: 'Giuseppe B.', comp: 'E-Mac (GB Manci)', text: 'Esperti assoluti nel trasporto di gru a torre. Logistica impeccabile.', spec: 'Trasporto Gru' },
  { name: 'Luca T.', comp: 'Tecnoedil', text: 'Professionalità e mezzi sempre al top. Un riferimento a Trento.', spec: 'Trasporto Gru' },
  { name: 'Hans G.', comp: 'Geobau', text: 'Unica scelta possibile per contesti alpini difficili.', spec: 'Trasporto Sonde' }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubpage, setActiveSubpage] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const [state, handleSubmit] = useForm('xnjowlpd');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      if (isMenuOpen) {
        setIsMenuOpen(false);
        document.body.style.overflow = 'unset';
      }
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? 'hidden' : 'unset';
      return next;
    });
  };

  const openSubpage = (catId: string) => {
    setActiveSubpage(catId);
    document.body.style.overflow = 'hidden';
  };

  const closeSubpage = () => {
    setActiveSubpage(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden antialiased font-sans">
      {/* SUBPAGE OVERLAY */}
      {activeSubpage && (
        <div id="subpage-overlay" className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-in duration-500">
          <nav className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 z-10 px-4 py-6">
            <div className="container mx-auto flex justify-between items-center">
              <button
                onClick={closeSubpage}
                className="flex items-center space-x-2 text-gray-900 font-black uppercase italic text-xs bg-transparent border-none cursor-pointer hover:text-orange-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                </svg>
                <span>Chiudi</span>
              </button>
              <div className="text-center">
                <h2 id="subpage-title" className="text-xl font-black uppercase italic text-orange-600 leading-none tracking-tight">
                  {activeSubpage}
                </h2>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1 italic">Nardin Fleet Detail</p>
              </div>
              <div className="w-10" />
            </div>
          </nav>

          <div className="container mx-auto px-4 py-16">
            <div id="subpage-content" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {fleetData
                .filter((m) => m.cat === activeSubpage)
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-xl flex flex-col group hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="h-72 overflow-hidden relative">
                      <img
                        src={item.img}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        alt={item.name}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-6 left-6 bg-orange-600 text-white px-4 py-1 rounded-full text-[9px] font-black uppercase italic tracking-widest">
                        {item.cat}
                      </div>
                    </div>
                    <div className="p-10 flex-grow">
                      <h4 className="text-2xl font-black uppercase italic mb-4 group-hover:text-orange-600 transition-colors leading-tight tracking-tight">
                        {item.name}
                      </h4>
                      <div className="bg-gray-50 px-5 py-3 rounded-xl border border-gray-100 inline-block mb-8">
                        <span className="text-gray-900 font-black text-xs uppercase tracking-tight">{item.cap}</span>
                      </div>
                      <p className="text-gray-500 text-sm mb-8 italic leading-relaxed">{item.desc}</p>
                      <button
                        onClick={() => {
                          closeSubpage();
                          setTimeout(() => scrollToSection('contatti'), 500);
                        }}
                        className="w-full py-5 bg-gray-900 text-white font-black uppercase text-[10px] tracking-[0.2em] rounded-2xl hover:bg-orange-600 border-none cursor-pointer transition-all shadow-lg active:scale-95"
                      >
                        Richiedi Preventivo
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav
        id="main-navbar"
        className={`fixed w-full z-40 transition-all duration-500 ${
          isScrolled ? 'bg-white shadow-xl py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => scrollToSection('home')}>
            <div className="bg-orange-600 text-white p-2.5 rounded-xl font-oswald text-xl font-black italic tracking-tighter group-hover:scale-105 transition-transform">
              NARDIN
            </div>
            <span
              id="logo-text"
              className={`font-oswald text-lg font-bold tracking-[0.2em] hidden sm:block ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              AUTOTRASPORTI
            </span>
          </div>

          <div className="hidden md:flex space-x-8">
            {['home', 'chi-siamo', 'servizi', 'flotta', 'portfolio', 'contatti'].map((id) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`nav-link text-[10px] font-black uppercase tracking-[0.2em] hover:text-orange-600 transition-colors bg-transparent border-none cursor-pointer outline-none italic ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {id.replace('-', ' ')}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="tel:+390461990268"
              className="block bg-orange-600 text-white px-5 sm:px-8 py-3 sm:py-3.5 rounded-2xl font-black text-[10px] hover:bg-orange-700 transition-all no-underline tracking-[0.2em] shadow-xl italic active:scale-95"
            >
              CHIAMA ORA
            </a>

            <button
              id="hamburger-btn"
              onClick={toggleMenu}
              className={`block md:hidden text-2xl z-50 bg-transparent border-none cursor-pointer outline-none transition-colors ${
                isScrolled || isMenuOpen ? 'text-gray-900' : 'text-white'
              }`}
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        <div
          id="mobile-menu-overlay"
          className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 animate-in fade-in slide-in-from-top duration-300 ${
            isMenuOpen ? 'flex' : 'hidden'
          }`}
        >
          {['home', 'chi-siamo', 'servizi', 'flotta', 'portfolio', 'contatti'].map((id) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="text-2xl font-black uppercase tracking-[0.2em] text-gray-900 hover:text-orange-600 transition-colors bg-transparent border-none cursor-pointer italic"
            >
              {id.replace('-', ' ')}
            </button>
          ))}
          <a
            href="tel:+390461990268"
            className="bg-orange-600 text-white px-10 py-5 rounded-2xl font-black text-xs hover:bg-orange-700 transition-all no-underline tracking-[0.2em] shadow-xl italic"
          >
            CHIAMA ORA
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="relative h-screen lg:h-auto lg:min-h-[120vh] lg:py-48 flex items-center justify-center bg-gray-950 text-center">
        <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}images/hero.jpg`}
            className="w-full h-full object-cover opacity-20 grayscale"
            alt="Hero"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/50 to-gray-950" />
        </div>
        <div className="relative z-10 px-4">
          <div className="mb-8 inline-block px-4 py-1.5 rounded-full border border-orange-600/30 bg-orange-600/10 backdrop-blur-sm animate-pulse">
            <span className="text-orange-600 font-black uppercase italic tracking-[0.3em] text-[10px]">Eccellenza Trentina dal 1980</span>
          </div>
          <h1 className="text-4xl sm:text-7xl md:text-[9rem] font-black text-white uppercase italic mb-8 tracking-tighter leading-none">
            NARDIN <span className="text-orange-600">AUTOTRASPORTI</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-400 text-base md:text-2xl mb-14 italic font-medium uppercase tracking-[0.2em] leading-relaxed">
            Trasporti Speciali e Sollevamento <br className="hidden md:block" /> di Precisione a Trento.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <button
              onClick={() => scrollToSection('contatti')}
              className="bg-orange-600 text-white px-8 sm:px-14 py-5 sm:py-6 rounded-[2rem] font-black uppercase italic tracking-widest hover:bg-orange-700 border-none cursor-pointer transition-all shadow-2xl active:scale-95 text-xs sm:text-base"
            >
              Richiedi Preventivo
            </button>
            <button
              onClick={() => scrollToSection('flotta')}
              className="bg-white/5 text-white px-8 sm:px-14 py-5 sm:py-6 rounded-[2rem] font-black uppercase italic tracking-widest border border-white/10 backdrop-blur-md cursor-pointer hover:bg-white/10 transition-all active:scale-95 text-xs sm:text-base"
            >
              Sfoglia Parco Mezzi
            </button>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="bg-white border-y border-gray-100 py-8 md:py-12">
        <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[
            { icon: '🛡️', title: 'Assicurazione Vettoriale', sub: 'Copertura All-Risks' },
            { icon: '📍', title: 'Sede a Trento', sub: 'Operativi in tutto il Nord' },
            { icon: '🚨', title: 'Scorta Tecnica', sub: 'Permessi Speciali Inclusi' },
            { icon: '⚙️', title: 'H24 Emergency', sub: 'Pronto Intervento Gru' }
          ].map((item, i) => (
            <div key={i} className="flex items-center space-x-3 md:space-x-4 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-50 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl group-hover:bg-orange-600 group-hover:scale-110 transition-all duration-300 shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="text-gray-900 font-black text-[8px] md:text-[10px] uppercase tracking-widest">{item.title}</p>
                <p className="text-gray-500 text-[7px] md:text-[9px] font-bold uppercase tracking-tighter italic">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CHI SIAMO */}
      <section id="chi-siamo" className="py-16 md:py-32 bg-white">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-10 md:gap-20">
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -top-4 -left-4 w-16 md:w-24 h-16 md:h-24 bg-orange-600 rounded-lg -z-10" />
            <img
              src={`${import.meta.env.BASE_URL}images/about.jpg`}
              alt="Team"
              className="rounded-3xl md:rounded-[3rem] shadow-2xl w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:right-10 bg-white/95 backdrop-blur-md p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl border border-orange-500/10">
              <p className="text-gray-900 font-bold text-base md:text-xl italic uppercase leading-tight">"La nostra forza è l'uomo dietro la macchina."</p>
              <p className="text-orange-600 font-oswald text-[10px] md:text-xs font-black uppercase tracking-widest mt-3 md:mt-4">WALTER & IVANA NARDIN</p>
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-orange-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 italic">La Nostra Storia</h2>
            <h3 className="text-3xl md:text-5xl font-black text-gray-900 uppercase italic mb-6 md:mb-10 leading-none tracking-tight">
              DAL <span className="text-orange-600">1980</span> <br />
              ECCELLENZA TECNICA
            </h3>
            <div className="space-y-4 md:space-y-6 text-gray-600 text-base md:text-lg italic leading-relaxed">
              <p>
                Tutto ha inizio nel <strong>1980</strong>, quando Nardin Mario fonda l'azienda con una visione chiara: offrire servizi di trasporto caratterizzati da massima affidabilità.
              </p>
              <p>
                Oggi, quella passione continua con <strong>Walter e Ivana Nardin</strong>. Siamo il punto di riferimento a Trento per sollevamenti pesanti con autogrù Effer e Hiab.
              </p>
              <div className="grid grid-cols-2 gap-6 md:gap-10 pt-6 md:pt-10">
                <div>
                  <span className="block text-3xl md:text-5xl font-black text-orange-600 font-oswald italic leading-none">40+</span>
                  <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">Anni di Esperienza</span>
                </div>
                <div>
                  <span className="block text-3xl md:text-5xl font-black text-orange-600 font-oswald italic leading-none">38121</span>
                  <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">Radici a Trento</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVIZI */}
      <section id="servizi" className="py-16 md:py-32 bg-gray-50 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-orange-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 italic">Cosa Facciamo</h2>
          <h3 className="text-3xl md:text-6xl font-black text-gray-900 uppercase italic mb-12 md:mb-24 leading-none tracking-tight">
            I NOSTRI <span className="text-orange-600 underline decoration-gray-900 decoration-[10px] md:decoration-[14px]">SERVIZI</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto text-left">
            <div className="bg-white p-8 md:p-14 rounded-3xl md:rounded-[4rem] shadow-sm border border-gray-100 group hover:shadow-2xl transition-all duration-500">
              <div className="text-5xl md:text-7xl mb-6 md:text-10 group-hover:scale-110 transition-transform duration-500 inline-block drop-shadow-lg">🚛</div>
              <h4 className="text-2xl md:text-3xl font-black uppercase italic mb-4 md:mb-6 tracking-tight">Trasporti Eccezionali</h4>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed italic">
                Gestione completa per carichi fuori sagoma, permessi speciali e scorte tecniche. Operiamo in tutto il Nord Italia con la massima sicurezza stradale.
              </p>
            </div>
            <div className="bg-white p-8 md:p-14 rounded-3xl md:rounded-[4rem] shadow-sm border border-gray-100 group hover:shadow-2xl transition-all duration-500">
              <div className="text-5xl md:text-7xl mb-6 md:text-10 group-hover:scale-110 transition-transform duration-500 inline-block drop-shadow-lg">🏗️</div>
              <h4 className="text-2xl md:text-3xl font-black uppercase italic mb-4 md:mb-6 tracking-tight">Sollevamento Gru</h4>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed italic">
                Autogrù Effer e Hiab fino a 95 t/m. Ideali per montaggi industriali, carpenterie metalliche e movimentazioni in spazi angusti.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FLOTTA CATEGORIES */}
      <section id="flotta" className="py-16 md:py-32 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-orange-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 italic">Flotta Proprietaria</h2>
          <h3 className="text-3xl md:text-6xl font-black text-gray-900 uppercase italic mb-6 md:mb-8 leading-none tracking-tight">
            SCOPRI I <span className="text-orange-600">MEZZI</span>
          </h3>
          <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[9px] md:text-[11px] italic mb-12 md:mb-24">
            Seleziona una categoria per accedere ai dettagli tecnici
          </p>
          <div id="categories-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 max-w-6xl mx-auto">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => openSubpage(cat.id)}
                className="relative bg-gray-50 p-8 md:p-14 rounded-3xl md:rounded-[4rem] cursor-pointer hover:bg-orange-600 group transition-all duration-700 border border-gray-100 shadow-sm overflow-hidden transform hover:-translate-y-2"
              >
                <div className="relative z-10">
                  <div className="text-6xl md:text-8xl mb-6 md:mb-10 group-hover:scale-110 transition-transform duration-700 drop-shadow-2xl">{cat.icon}</div>
                  <h4 className="text-xl md:text-2xl font-black uppercase italic mb-4 md:mb-5 text-gray-900 group-hover:text-white transition-colors tracking-tight">
                    {cat.title}
                  </h4>
                  <p className="text-gray-500 text-[10px] md:text-[11px] font-bold uppercase tracking-widest group-hover:text-white/80 transition-colors mb-6 md:mb-10 italic">
                    {cat.desc}
                  </p>
                  <div className="inline-flex items-center space-x-3 text-orange-600 group-hover:text-white font-black uppercase italic text-[10px] md:text-[11px] tracking-[0.3em] bg-white group-hover:bg-white/10 px-5 md:px-6 py-2.5 md:py-3 rounded-2xl transition-all">
                    <span>Vedi Tutti</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                <div className="absolute -bottom-10 md:-bottom-16 -right-10 md:-right-16 text-[8rem] md:text-[15rem] font-black italic text-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-tighter">
                  {cat.id[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-16 md:py-32 bg-gray-50 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-orange-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 italic">Esperienza sul Campo</h2>
          <h3 className="text-3xl md:text-5xl font-black text-gray-900 uppercase italic mb-12 md:mb-20 tracking-tight">
            LAVORI <span className="text-orange-600">RECENTI</span>
          </h3>
          <div id="projects-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto text-left">
            {projects.map((p) => (
              <div key={p.id} className="group relative overflow-hidden rounded-2xl md:rounded-[3rem] aspect-video cursor-pointer shadow-xl">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-10 opacity-90 group-hover:opacity-100 transition-opacity">
                  <span className="text-orange-500 font-black text-[10px] uppercase tracking-[0.3em] mb-2 md:mb-3 italic">{p.cat}</span>
                  <h4 className="text-white font-black text-lg md:text-xl italic leading-tight group-hover:text-orange-500 transition-colors tracking-tight">
                    {p.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonial" className="py-16 md:py-32 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-orange-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 italic">Dicono Di Noi</h2>
          <h3 className="text-3xl md:text-6xl font-black text-gray-900 uppercase italic mb-12 md:mb-24 leading-none tracking-tight">
            PARTNER DI <span className="text-orange-600 underline decoration-gray-900 decoration-[10px] md:decoration-[14px]">FIDUCIA</span>
          </h3>
          <div id="testimonials-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-left max-w-7xl mx-auto">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-gray-50 p-8 md:p-12 rounded-3xl md:rounded-[4rem] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col h-full group hover:-translate-y-2"
              >
                <div className="text-orange-500 mb-6 md:mb-10 text-xl md:text-3xl">★★★★★</div>
                <p className="text-gray-600 text-[13px] md:text-sm italic mb-8 md:mb-12 leading-relaxed flex-grow">"{t.text}"</p>
                <div className="pt-6 md:pt-10 border-t border-gray-100">
                  <p className="text-gray-900 font-black text-[11px] md:text-[13px] uppercase italic mb-1 tracking-tight">{t.name}</p>
                  <p className="text-orange-600 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em]">{t.comp}</p>
                  <div className="mt-4 md:mt-5 inline-block px-3 md:px-4 py-1.5 bg-gray-900 text-white text-[8px] md:text-[9px] font-black uppercase rounded-xl tracking-widest">
                    {t.spec}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATTI */}
      <section id="contatti" className="py-16 md:py-32 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl md:rounded-[5rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
            <div className="lg:w-1/3 bg-gray-900 p-10 md:p-16 lg:p-20 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-orange-600 rounded-full opacity-10 animate-pulse" />
              <div className="relative z-10">
                <h3 className="text-3xl md:text-5xl font-black uppercase italic mb-10 md:mb-20 tracking-tighter leading-none">
                  PREVENTIVO <br />
                  <span className="text-orange-600 underline decoration-white/10">GRATUITO</span>
                </h3>
                <div className="space-y-10 md:space-y-14">
                  <div>
                    <p className="text-[9px] md:text-[10px] font-black uppercase text-gray-500 mb-2 md:mb-3 tracking-[0.3em] italic">Telefono Diretto</p>
                    <a href="tel:+390461990268" className="text-2xl md:text-3xl font-black text-white no-underline hover:text-orange-600 transition-colors tracking-tighter italic">
                      +39 0461 990268
                    </a>
                  </div>
                  <div>
                    <p className="text-[9px] md:text-[10px] font-black uppercase text-gray-500 mb-2 md:mb-3 tracking-[0.3em] italic">Sede Trento</p>
                    <p className="text-xl md:text-2xl font-black italic leading-tight">
                      Via Aeroporto 31, 38121
                      <br />
                      <span className="text-orange-600 text-xs md:text-sm font-bold uppercase tracking-widest italic opacity-50">Trento (Italy)</span>
                    </p>
                  </div>
                  <div className="pt-6 md:pt-8">
                    <a
                      href="https://wa.me/393484420285"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-4 md:space-x-5 bg-green-600 text-white px-8 md:px-12 py-4 md:py-6 rounded-2xl md:rounded-[2rem] font-black uppercase italic text-[10px] md:text-xs no-underline hover:bg-green-700 transition-all shadow-2xl transform hover:scale-105 active:scale-95"
                    >
                      <span>WhatsApp Diretto</span>
                    </a>
                  </div>
                </div>
              </div>
              <p className="text-[9px] md:text-[10px] text-gray-700 font-black uppercase tracking-[0.4em] md:tracking-[0.5em] mt-12 md:mt-20 italic border-t border-white/5 pt-8 md:pt-12">
                Precisione • Forza • Trento
              </p>
            </div>

            <div className="lg:w-2/3 p-8 md:p-16 lg:p-28 text-left">
              {state.succeeded ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-in">
                  <div className="text-6xl">✅</div>
                  <h3 className="text-3xl font-black uppercase italic text-gray-900">Messaggio Inviato!</h3>
                  <p className="text-gray-500 italic">Ti ricontatteremo al più presto.</p>
                  <button onClick={() => window.location.reload()} className="text-orange-600 font-black uppercase italic text-xs tracking-widest">
                    Invia un altro messaggio
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <div className="space-y-3 md:space-y-4">
                      <label className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] italic ml-2">Ragione Sociale</label>
                      <input
                        name="name"
                        type="text"
                        required
                        className="w-full px-6 md:px-10 py-4 md:py-6 bg-gray-50 border-none rounded-2xl md:rounded-[2rem] text-sm outline-none focus:ring-8 focus:ring-orange-600/5 transition-all italic font-medium"
                      />
                      <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-[10px] font-bold uppercase italic ml-2" />
                    </div>

                    <div className="space-y-3 md:space-y-4">
                      <label className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] italic ml-2">Email Aziendale</label>
                      <input
                        name="email"
                        type="email"
                        required
                        className="w-full px-6 md:px-10 py-4 md:py-6 bg-gray-50 border-none rounded-2xl md:rounded-[2rem] text-sm outline-none focus:ring-8 focus:ring-orange-600/5 transition-all italic font-medium"
                      />
                      <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-[10px] font-bold uppercase italic ml-2" />
                    </div>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    <label className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] italic ml-2">Telefono / Cellulare</label>
                    <input
                      name="phone"
                      type="tel"
                      className="w-full px-6 md:px-10 py-4 md:py-6 bg-gray-50 border-none rounded-2xl md:rounded-[2rem] text-sm outline-none focus:ring-8 focus:ring-orange-600/5 transition-all italic font-medium"
                      placeholder="+39 ..."
                    />
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    <label className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] italic ml-2">Servizio Desiderato</label>
                    <select
                      name="service"
                      className="w-full px-6 md:px-10 py-4 md:py-6 bg-gray-50 border-none rounded-2xl md:rounded-[2rem] text-sm outline-none appearance-none cursor-pointer italic font-medium"
                    >
                      <option>Trasporto Eccezionale</option>
                      <option>Autogrù / Sollevamento</option>
                      <option>Trasporto Gru Edili</option>
                    </select>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    <label className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] italic ml-2">Dettagli Lavoro</label>
                    <textarea
                      name="message"
                      rows={5}
                      className="w-full px-6 md:px-10 py-4 md:py-6 bg-gray-50 border-none rounded-2xl md:rounded-[2rem] text-sm outline-none focus:ring-8 focus:ring-orange-600/5 resize-none transition-all italic font-medium"
                      placeholder="Pesi, dimensioni, località..."
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-[10px] font-bold uppercase italic ml-2" />
                  </div>

                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full py-6 md:py-8 bg-orange-600 text-white font-black uppercase italic tracking-[0.4em] md:tracking-[0.5em] rounded-2xl md:rounded-[2.5rem] shadow-2xl hover:bg-orange-700 transition-all border-none cursor-pointer transform hover:scale-[1.01] active:scale-95 text-[10px] md:text-[11px] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {state.submitting ? 'Invio in corso...' : 'Invia Richiesta'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-950 text-white py-16 md:py-32 text-center border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="font-oswald text-4xl md:text-6xl font-black italic mb-10 md:mb-12 tracking-tighter">
            NARDIN <span className="text-orange-600">AUTOTRASPORTI</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12 md:mb-16 text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-gray-600 italic">
            <a
              href="https://www.instagram.com/nardinautotrasporti/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white no-underline transition-colors"
            >
              Instagram
            </a>
            <button
              onClick={() => scrollToSection('home')}
              className="hover:text-white transition-colors bg-transparent border-none cursor-pointer font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-[11px] italic"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('flotta')}
              className="hover:text-white transition-colors bg-transparent border-none cursor-pointer font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-[11px] italic"
            >
              Flotta
            </button>
            <button
              onClick={() => scrollToSection('servizi')}
              className="hover:text-white transition-colors bg-transparent border-none cursor-pointer font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-[11px] italic"
            >
              Servizi
            </button>
          </div>
          <div className="max-w-5xl mx-auto h-[1px] bg-white/5 mb-10 md:mb-12 opacity-50" />
          <div className="max-w-6xl mx-auto space-y-2 md:space-y-3 text-gray-500 text-[9px] md:text-[11px] font-bold uppercase tracking-wider italic leading-relaxed">
            <p className="text-gray-400">
              <span className="text-white font-black">NARDIN AUTOTRASPORTI s.n.c. di Nardin Walter e Ivana</span> | Via Aeroporto, 31 | 38121 TRENTO | Tel. 0461.990268 | Fax 0461.992462
            </p>
            <p>
              P. IVA 01762870226 | codice SDI 5RU082D ("O" lettera) | info@nardinautotrasporti.it | nardinautotrasporti@pec.trovarti.it
            </p>
            <p>
              Albo Autotrasportatori c/terzi TN/2053832Z | Albo Gestori Ambientali TN04948 | Albo Impr. Artigiane n. 47413 | Reg. Impr. CCIAA n. 177305
            </p>
          </div>
          <p className="mt-12 text-gray-800 text-[8px] font-black uppercase tracking-[0.5em] italic">
            © 2026 NARDIN AUTOTRASPORTI — PRECISIONE • FORZA • TRENTO
          </p>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/393484420285"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 md:bottom-12 right-6 md:right-12 z-[110] bg-green-600 text-white p-4 md:p-6 rounded-full shadow-2xl hover:bg-green-700 transition-all transform hover:scale-110 flex items-center justify-center border-4 border-white no-underline active:scale-90"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="md:w-8 md:h-8">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.539 2.016 2.126-.54c1.029.563 2.025.844 3.162.844 3.181 0 5.767-2.586 5.768-5.766.001-3.18-2.587-5.767-5.768-5.767zm3.39 8.251c-.146.415-.852.756-1.201.838-.34.08-.783.14-1.258-.02-.275-.092-.591-.219-1.025-.407-1.84-.794-3.037-2.673-3.129-2.797-.093-.125-.751-.998-.751-1.913 0-.915.481-1.363.652-1.547.171-.184.372-.231.496-.231s.248.001.356.006c.115.005.27-.042.423.328.158.382.541 1.32.588 1.414.047.094.078.204.016.331-.062.126-.093.204-.186.31l-.279.325c-.093.107-.191.224-.083.41.108.187.481.794 1.033 1.285.711.634 1.312.83 1.5.922.188.092.297.077.406-.05.109-.127.466-.541.59-.727.124-.186.248-.156.417-.094s1.071.505 1.257.599c.186.094.31.141.356.221s.047.533-.099.948zM12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11-11-4.925-11-11 4.925-11 11-11z" />
        </svg>
      </a>
    </div>
  );
}