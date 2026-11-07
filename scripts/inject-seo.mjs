import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '../dist');
const indexPath = resolve(distDir, 'index.html');
const sitemapPath = resolve(distDir, 'sitemap.xml');

const SITE_URL = 'https://nardinautotrasporti.it';

// Single source of truth for every route on the site.
// Add a new page? Add one line here and the sitemap regenerates automatically
// on the next `npm run build` — no need to hand-edit sitemap.xml ever again.
const ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/noleggio-autogru-trento', priority: '0.9', changefreq: 'monthly' },
  { path: '/trasporti-eccezionali-trentino', priority: '0.9', changefreq: 'monthly' },
  { path: '/trasporto-gru-edili', priority: '0.9', changefreq: 'monthly' },
  { path: '/logistica-industriale', priority: '0.9', changefreq: 'monthly' },
];

const staticContent = `
  <noscript>
    <div style="font-family:Arial,sans-serif;max-width:900px;margin:0 auto;padding:20px">
      <header>
        <h1>Nardin Autotrasporti | Sollevamenti Industriali e Trasporti Speciali Trento</h1>
        <p><strong>Dal 1980</strong> — Via Aeroporto 31, 38121 Trento | Tel: <a href="tel:+390461990268">+39 0461 990268</a> | WhatsApp: <a href="https://wa.me/393484420285">+39 348 4420285</a></p>
      </header>

      <section id="come-lavoriamo">
        <h2>Come Lavoriamo</h2>
        <ol>
          <li><strong>Ci Contatti</strong> — Telefonata, WhatsApp o form online. Risposta entro 2 ore in orario lavorativo.</li>
          <li><strong>Sopralluogo Gratuito</strong> — Valutiamo il cantiere e le condizioni operative per garantire la soluzione più sicura.</li>
          <li><strong>Preventivo in 24 ore</strong> — Ricevi un preventivo dettagliato entro 24 ore. Permessi e scorta tecnica già inclusi.</li>
          <li><strong>Intervento in Sicurezza</strong> — I nostri operatori esperti eseguono il lavoro rispettando tutti gli standard di sicurezza.</li>
        </ol>
      </section>

      <section id="chi-siamo">
        <h2>Chi Siamo — Eccellenza Trentina dal 1980</h2>
        <p>Tutto ha inizio nel <strong>1980</strong>, quando Nardin Mario fonda l'azienda. Oggi con <strong>Walter e Ivana Nardin</strong> siamo il punto di riferimento a Trento per <strong>noleggio autogrù</strong> e <strong>sollevamenti industriali in Trentino</strong> con autogrù Effer e Hiab fino a 95 t/m. Oltre 40 anni di esperienza, operativi in tutto il Nord Italia.</p>
        <ul>
          <li>Assicurazione Vettoriale All-Risks</li>
          <li>H24 Emergency — Pronto Intervento Gru</li>
          <li>Scorta Tecnica e Permessi Speciali Inclusi</li>
          <li>Albo Autotrasportatori TN/2053832Z</li>
          <li>P.IVA 01762870226</li>
        </ul>
      </section>

      <section id="servizi">
        <h2>Servizi — Noleggio Autogrù e Trasporti Speciali Trento</h2>
        <h3>Noleggio Autogrù Trento</h3>
        <p>Autogrù Effer e Hiab fino a 95 t/m con operatore. Per montaggi industriali, carpenterie metalliche e movimentazioni in spazi angusti nel Trentino e Nord Italia.</p>
        <h3>Trasporti Eccezionali Trentino</h3>
        <p>Gestione completa per carichi fuori sagoma, permessi speciali e scorte tecniche in tutto il Nord Italia.</p>
        <h3>Trasporto Gru Edili</h3>
        <p>Smontaggio, trasporto e rimontaggio di gru a torre Potain e similari. Pianificazione logistica completa per cantieri di ogni dimensione.</p>
        <h3>Logistica Industriale</h3>
        <p>Movimentazione macchinari pesanti, macchine utensili, prefabbricati e carpenteria metallica. Soluzioni su misura.</p>
      </section>

      <section id="casi-studio">
        <h2>Casi Studio — Lavori Recenti</h2>
        <article>
          <h3>Sollevamento Gru Potain 12t — Centro storico Trento</h3>
          <p>Montaggio gru a torre in spazio ristretto nel centro storico. Operazione completata in un solo giorno con autogrù Effer 95 t/m.</p>
        </article>
        <article>
          <h3>Trasporto Carpenteria Metallica — Capannone industriale Rovereto</h3>
          <p>Movimentazione strutture metalliche prefabbricate da 8t per nuovo capannone industriale. Pianale ribassato con scorta tecnica inclusa.</p>
        </article>
        <article>
          <h3>Logistica Vigneti Eroici — Valli del Trentino</h3>
          <p>Trasporto attrezzature agricole in zona alpina impervia. Soluzione su misura per terreni difficili con mezzi specializzati.</p>
        </article>
      </section>

      <section id="flotta">
        <h2>Parco Mezzi — Flotta Proprietaria</h2>
        <h3>Autogrù</h3>
        <ul>
          <li>Motrice Scania R770 4 assi + Effer 955 — 95 t/m, 770 CV</li>
          <li>Motrice Scania R730 4 assi + Gru Effer — V8 730 CV</li>
          <li>Trattore Volvo 3 assi + Effer 525 — 52.5 t/m</li>
          <li>Trattore Mercedes 2 assi + Effer 375 — 37.5 t/m</li>
        </ul>
        <h3>Camion</h3>
        <ul>
          <li>Trattore Scania S520 2 assi — 520 CV V8</li>
          <li>Trattore Scania R560 2 assi — 560 CV V8</li>
        </ul>
        <h3>Rimorchi</h3>
        <ul>
          <li>Pianale Collo d'Oca 3 e 4 assi con rampe</li>
          <li>Semirimorchio Culla Ribassato 3 assi</li>
          <li>Pianale Allungabile 3 assi</li>
          <li>Pianale Passo Corto 2 assi</li>
          <li>Semirimorchio Centinato 3 assi</li>
        </ul>
      </section>

      <section id="faq">
        <h2>Domande Frequenti</h2>
        <dl>
          <dt>In quali zone operate?</dt>
          <dd>Operiamo in tutto il Trentino-Alto Adige, Veneto e Lombardia. Per lavori urgenti siamo disponibili in tutta l'Italia del Nord.</dd>
          <dt>Gestite i permessi per i trasporti eccezionali?</dt>
          <dd>Sì, gestiamo internamente tutte le autorizzazioni necessarie, incluse scorta tecnica e permessi speciali.</dd>
          <dt>Avete copertura assicurativa?</dt>
          <dd>Sì, operiamo con assicurazione vettoriale All-Risks su tutti i lavori.</dd>
          <dt>Quanto tempo ci vuole per un preventivo?</dt>
          <dd>Rispondiamo entro 24 ore in orario lavorativo. Per urgenze siamo raggiungibili H24 al +39 348 4420285.</dd>
          <dt>Operate anche nel weekend o per emergenze?</dt>
          <dd>Sì, per interventi urgenti siamo disponibili H24 tramite WhatsApp al +39 348 4420285.</dd>
        </dl>
      </section>

      <section id="testimonianze">
        <h2>Recensioni Clienti</h2>
        <blockquote>"Collaboriamo con Nardin per i sollevamenti più delicati. Ineguagliabili." — <strong>Andrea M., Mak Costruzioni</strong></blockquote>
        <blockquote>"Esperti assoluti nel trasporto di gru a torre. Logistica impeccabile." — <strong>Giuseppe B., E-Mac (GB Manci)</strong></blockquote>
        <blockquote>"Professionalità e mezzi sempre al top. Un riferimento a Trento." — <strong>Luca T., Tecnoedil</strong></blockquote>
        <blockquote>"Unica scelta possibile per contesti alpini difficili." — <strong>Hans G., Geobau</strong></blockquote>
      </section>

      <section id="contatti">
        <h2>Contatti — Preventivo Gratuito Trasporti Speciali Trento</h2>
        <address>
          Nardin Autotrasporti s.n.c. di Nardin Walter e Ivana<br>
          Via Aeroporto, 31 — 38121 Trento (TN)<br>
          P.IVA 01762870226 | Albo Autotrasportatori TN/2053832Z<br>
          Tel: <a href="tel:+390461990268">+39 0461 990268</a> |
          WhatsApp: <a href="https://wa.me/393484420285">+39 348 4420285</a> |
          Email: <a href="mailto:info@nardinautotrasporti.it">info@nardinautotrasporti.it</a>
        </address>
      </section>
    </div>
  </noscript>
`;

// --- 1. Inject the noscript SEO fallback into the SPA shell ---
let html = readFileSync(indexPath, 'utf-8');
html = html.replace('<div id="root"></div>', `<div id="root"></div>\n${staticContent}`);
writeFileSync(indexPath, html);
console.log('SEO static snapshot injected into dist/index.html');

// --- 1b. Per-page HTML shells ---
// The site is a single-page app, so before this step every URL was served the
// homepage's <title>, description and canonical until JavaScript ran. Here we
// write dist/<page>/index.html for each service page with its own head tags
// (Netlify serves an existing file before applying the SPA /* redirect), and
// preload that page's lazy-loaded code chunk so it downloads in parallel.
const PAGES = {
  '/noleggio-autogru-trento': {
    src: 'src/pages/NoleggioAutogru.tsx',
    title: 'Noleggio Autogrù Trento | Effer e Hiab fino a 95 t/m — Nardin',
    description: 'Noleggio autogrù a Trento con operatore. Effer e Hiab fino a 95 t/m, per montaggi industriali, carpenterie metalliche e spazi angusti. Preventivo in 24h.',
  },
  '/trasporti-eccezionali-trentino': {
    src: 'src/pages/TrasportiEccezionali.tsx',
    title: 'Trasporti Eccezionali Trentino | Permessi e Scorta Inclusi — Nardin',
    description: 'Trasporti eccezionali per carichi fuori sagoma in Trentino, Veneto e Lombardia. Permessi speciali e scorta tecnica gestiti internamente. Preventivo gratuito.',
  },
  '/trasporto-gru-edili': {
    src: 'src/pages/TrasportoGruEdili.tsx',
    title: 'Trasporto Gru Edili Trento | Smontaggio e Montaggio Potain — Nardin',
    description: 'Smontaggio, trasporto e rimontaggio di gru a torre Potain e similari a Trento e Nord Italia. Pianificazione logistica completa per cantieri di ogni dimensione.',
  },
  '/logistica-industriale': {
    src: 'src/pages/LogisticaIndustriale.tsx',
    title: 'Logistica Industriale Trento | Movimentazione Macchinari — Nardin',
    description: 'Movimentazione macchinari pesanti, macchine utensili, prefabbricati e carpenteria metallica a Trento e Nord Italia. Soluzioni su misura, preventivo gratuito.',
  },
};

const manifestPath = resolve(distDir, '.vite/manifest.json');
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf-8')) : {};

// All JS files a manifest entry needs (itself + its static imports), as /assets/... URLs.
function chunkFiles(key, seen = new Set()) {
  const entry = manifest[key];
  if (!entry || seen.has(key)) return [];
  seen.add(key);
  return [`/${entry.file}`, ...(entry.imports || []).flatMap(k => chunkFiles(k, seen))];
}
const mainFiles = new Set(chunkFiles('index.html'));
const escapeAttr = v => v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function withHead(baseHtml, { title, description, url, preload }) {
  let out = baseHtml
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${escapeAttr(description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escapeAttr(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${escapeAttr(description)}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${escapeAttr(title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${escapeAttr(description)}$2`);
  const links = preload.map(f => `    <link rel="modulepreload" crossorigin href="${f}">`).join('\n');
  if (links) out = out.replace('</head>', `${links}\n  </head>`);
  return out;
}

// Shell before any page-specific preload is added (used as base for service pages).
const shellHtml = html;

// Homepage: preload its own chunk too.
const homePreload = chunkFiles('src/pages/Home.tsx').filter(f => !mainFiles.has(f));
html = withHead(html, {
  title: html.match(/<title>([^<]*)<\/title>/)[1],
  description: html.match(/<meta name="description" content="([^"]*)"/)[1],
  url: `${SITE_URL}/`,
  preload: homePreload,
});
writeFileSync(indexPath, html);

for (const [path, page] of Object.entries(PAGES)) {
  const dir = resolve(distDir, path.slice(1));
  mkdirSync(dir, { recursive: true });
  const preload = chunkFiles(page.src).filter(f => !mainFiles.has(f));
  writeFileSync(resolve(dir, 'index.html'), withHead(shellHtml, {
    title: page.title,
    description: page.description,
    url: `${SITE_URL}${path}`,
    preload,
  }));
}
console.log(`Per-page HTML written for ${Object.keys(PAGES).length} service pages`);

// --- 2. Generate sitemap.xml dynamically from ROUTES, every build ---
const today = new Date().toISOString().split('T')[0];
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(r => `<url>
<loc>${SITE_URL}${r.path}</loc>
<lastmod>${today}</lastmod>
<changefreq>${r.changefreq}</changefreq>
<priority>${r.priority}</priority>
</url>`).join('\n')}
</urlset>
`;
writeFileSync(sitemapPath, sitemapXml);
console.log(`Sitemap generated with ${ROUTES.length} URLs at dist/sitemap.xml`);
