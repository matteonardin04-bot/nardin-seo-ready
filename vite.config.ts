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
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});
