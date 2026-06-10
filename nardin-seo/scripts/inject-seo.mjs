import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '../dist');
const indexPath = resolve(distDir, 'index.html');

const staticContent = `
  <noscript>
    <div style="font-family:Arial,sans-serif;max-width:900px;margin:0 auto;padding:20px">
      <header>
        <h1>Nardin Autotrasporti | Trasporti Speciali e Autogrù Trento</h1>
        <p><strong>Dal 1980</strong> — Via Aeroporto 31, 38121 Trento | Tel: <a href="tel:+390461990268">+39 0461 990268</a></p>
      </header>
      <section id="chi-siamo">
        <h2>Chi Siamo — Eccellenza Trentina dal 1980</h2>
        <p>Tutto ha inizio nel <strong>1980</strong>, quando Nardin Mario fonda l'azienda. Oggi con <strong>Walter e Ivana Nardin</strong> siamo il punto di riferimento a Trento per sollevamenti pesanti con autogrù Effer e Hiab. Oltre 40 anni di esperienza, operativi in tutto il Nord Italia.</p>
      </section>
      <section id="servizi">
        <h2>Servizi Trasporti Speciali Trento</h2>
        <h3>Trasporti Eccezionali Trento</h3>
        <p>Gestione completa per carichi fuori sagoma, permessi speciali e scorte tecniche in tutto il Nord Italia.</p>
        <h3>Sollevamento Autogrù Trento</h3>
        <p>Autogrù Effer e Hiab fino a 95 t/m per montaggi industriali, carpenterie metalliche e movimentazioni in spazi angusti.</p>
      </section>
      <section id="flotta">
        <h2>Parco Mezzi — Flotta Proprietaria</h2>
        <ul>
          <li>Motrice Scania R770 4 assi + Effer 955 — 95 t/m, 770 CV</li>
          <li>Motrice Scania R730 4 assi + Gru Effer — V8 730 CV</li>
          <li>Trattore Scania S520 2 assi — 520 CV V8</li>
          <li>Trattore Scania R560 2 assi — 560 CV V8</li>
          <li>Trattore Volvo 3 assi + Effer 525 — 52.5 t/m</li>
          <li>Trattore Mercedes 2 assi + Effer 375 — 37.5 t/m</li>
          <li>Pianale Collo d'Oca 3 e 4 assi con rampe</li>
          <li>Semirimorchio Culla Ribassato 3 assi</li>
          <li>Pianale Allungabile 3 assi</li>
          <li>Semirimorchio Centinato 3 assi</li>
        </ul>
      </section>
      <section id="testimonianze">
        <h2>Recensioni Clienti</h2>
        <blockquote>"Collaboriamo con Nardin per i sollevamenti più delicati. Ineguagliabili." — <strong>Andrea M., Mak Costruzioni</strong></blockquote>
        <blockquote>"Esperti assoluti nel trasporto di gru a torre. Logistica impeccabile." — <strong>Giuseppe B., E-Mac (GB Manci)</strong></blockquote>
        <blockquote>"Professionalità e mezzi sempre al top. Un riferimento a Trento." — <strong>Luca T., Tecnoedil</strong></blockquote>
        <blockquote>"Unica scelta possibile per contesti alpini difficili." — <strong>Hans G., Geobau</strong></blockquote>
      </section>
      <section id="contatti">
        <h2>Contatti — Preventivo Gratuito</h2>
        <address>
          Nardin Autotrasporti s.n.c. — Via Aeroporto, 31 — 38121 Trento (TN)<br>
          Tel: <a href="tel:+390461990268">+39 0461 990268</a> |
          WhatsApp: <a href="https://wa.me/393484420285">+39 348 4420285</a> |
          Email: <a href="mailto:info@nardinautotrasporti.it">info@nardinautotrasporti.it</a>
        </address>
      </section>
    </div>
  </noscript>
`;

let html = readFileSync(indexPath, 'utf-8');
html = html.replace('<div id="root"></div>', `<div id="root"></div>\n${staticContent}`);
writeFileSync(indexPath, html);
console.log('SEO static snapshot injected into dist/index.html');
