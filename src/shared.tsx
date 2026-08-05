import { useEffect } from 'react';

export const S = {
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

export const inp = (extra: object = {}) => ({
  width: '100%',
  background: S.black,
  border: `1px solid ${S.border}`,
  color: S.text,
  padding: '12px 14px',
  fontSize: 14,
  outline: 'none',
  fontFamily: S.inter,
  ...extra,
});

export const testimonials = [
  { name: 'Andrea M.', comp: 'Mak Costruzioni', text: 'Collaboriamo con Nardin per i sollevamenti più delicati. Ineguagliabili.', spec: 'Sollevamenti Speciali' },
  { name: 'Giuseppe B.', comp: 'E-Mac / GB Manci', text: 'Esperti assoluti nel trasporto di gru a torre. Logistica impeccabile.', spec: 'Trasporto Gru' },
  { name: 'Luca T.', comp: 'Tecnoedil', text: 'Professionalità e mezzi sempre al top. Un riferimento a Trento.', spec: 'Trasporto Gru' },
  { name: 'Hans G.', comp: 'Geobau', text: 'Unica scelta possibile per contesti alpini difficili.', spec: 'Trasporto Sonde' },
];

// Injects per-page <title>/<meta description>/canonical/JSON-LD Service schema client-side.
// react-snap (puppeteer) executes this before capturing the static HTML snapshot, so it
// gets baked into the prerendered page Google actually indexes.
export function Head({
  title,
  description,
  path,
  serviceName,
  serviceDescription,
}: {
  title: string;
  description: string;
  path: string;
  serviceName: string;
  serviceDescription: string;
}) {
  useEffect(() => {
    document.title = title;

    const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', `https://nardinautotrasporti.it${path}`);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://nardinautotrasporti.it${path}`);

    const ldId = 'service-jsonld';
    document.getElementById(ldId)?.remove();
    const script = document.createElement('script');
    script.id = ldId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: serviceName,
      description: serviceDescription,
      provider: {
        '@type': 'LocalBusiness',
        name: 'Nardin Autotrasporti s.n.c.',
        telephone: '+390461990268',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Via Aeroporto, 31',
          addressLocality: 'Trento',
          postalCode: '38121',
          addressRegion: 'TN',
          addressCountry: 'IT',
        },
      },
      areaServed: ['Trentino-Alto Adige', 'Veneto', 'Lombardia'],
    });
    document.head.appendChild(script);
  }, [title, description, path, serviceName, serviceDescription]);

  return null;
}
