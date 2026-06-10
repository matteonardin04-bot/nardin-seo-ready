# Deploy su Netlify — Nardin Autotrasporti

## Metodo 1: Drag & Drop (più veloce, nessun account GitHub necessario)

1. Vai su **https://app.netlify.com** e accedi (o crea account gratuito)
2. Sulla dashboard, scorri in basso fino alla sezione **"Deploy manually"**
3. Trascina l'intera cartella **`dist/`** nel riquadro
4. Netlify pubblica il sito in 30 secondi con un URL temporaneo tipo `xyz.netlify.app`

## Metodo 2: Deploy da GitHub (consigliato per aggiornamenti futuri)

1. Carica questo progetto su un repository GitHub (pubblico o privato)
2. Su Netlify → **"Add new site"** → **"Import an existing project"**
3. Connetti GitHub e seleziona il repository
4. Netlify legge automaticamente `netlify.toml` e usa queste impostazioni:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Clicca **Deploy** — ogni push su GitHub rideploya automaticamente

## Collegare il dominio nardinautotrasporti.it

1. Su Netlify → **Site settings** → **Domain management** → **Add custom domain**
2. Digita `nardinautotrasporti.it` e conferma
3. Netlify ti mostra i **nameserver** (tipo `dns1.p01.nsone.net`)
4. Vai nel pannello del tuo registrar (dove hai comprato il dominio) e sostituisci i nameserver attuali con quelli di Netlify
5. Attendi 15-60 minuti per la propagazione DNS
6. Netlify attiva **HTTPS gratuito** (Let's Encrypt) in automatico

## Dopo il deploy — cose da fare su Google

1. **Google Search Console** → https://search.google.com/search-console
   - Aggiungi la proprietà `nardinautotrasporti.it`
   - Invia la sitemap: `https://nardinautotrasporti.it/sitemap.xml`

2. **Google Business Profile** → https://business.google.com
   - Rivendica o crea il profilo (fondamentale per apparire su Google Maps)
   - Aggiungi foto dei mezzi, orari, descrizione servizi

## Aggiornare il sito in futuro

Ogni volta che modifichi il codice:
```bash
npm run build
```
Poi ridrag la cartella `dist/` su Netlify, oppure fai push su GitHub se hai usato il Metodo 2.
