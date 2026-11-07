import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  // es2019 avoids optional chaining (?.) and nullish coalescing (??) in the
  // output — the old Chromium bundled with react-snap's puppeteer dependency
  // can't parse that newer syntax and fails to render pages during prerender.
  build: {
    target: 'es2019',
    // Lets scripts/inject-seo.mjs find each page's code chunk and preload it
    // in that page's HTML, so lazy-loaded pages don't wait for an extra round trip.
    manifest: true,
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});
