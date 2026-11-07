import ServicePage from '../ServicePage';

export default function TrasportoGruEdili() {
  return (
    <ServicePage
      path="/trasporto-gru-edili"
      h1="TRASPORTO E MONTAGGIO"
      h1Highlight="GRU EDILI"
      metaTitle="Trasporto Gru Edili Trento | Smontaggio e Montaggio Potain — Nardin"
      metaDescription="Smontaggio, trasporto e rimontaggio di gru a torre Potain e similari a Trento e Nord Italia. Pianificazione logistica completa per cantieri di ogni dimensione."
      intro="Smontaggio, trasporto e rimontaggio di gru a torre Potain e similari, con pianificazione logistica completa per cantieri di ogni dimensione, dal centro storico ai grandi cantieri industriali."
      bullets={['Gru Potain', 'Logistica Cantiere', 'Nord Italia', 'Team Dedicato']}
      caseStudy={{
        title: 'Montaggio Gru Edile Terex FC6.24H — Centro storico',
        desc: 'Montaggio di gru a torre Terex FC6.24 a rotazione in alto per cantiere in centro storico. Altezza di lavoro 18 m, braccio da 24 m. Soluzione studiata per spazi urbani ristretti dove le gru tradizionali non possono operare.',
        img: '/images/progetto-1.webp',
      }}
      faqs={[
        { q: 'Gestite anche il montaggio, non solo il trasporto?', a: 'Sì, offriamo il servizio completo: smontaggio, trasporto e rimontaggio della gru sul nuovo cantiere.' },
        { q: 'Quali marche di gru edili trasportate?', a: 'Potain e similari, sia gru a rotazione in basso che in alto.' },
        { q: 'Potete operare in centri storici con spazi ristretti?', a: 'Sì, come nel caso del montaggio in centro storico a Trento — è una delle nostre specialità.' },
        { q: 'Quanto tempo richiede un\'operazione tipo?', a: 'Dipende dalla gru e dal cantiere. Operazioni complesse in spazi ristretti si completano tipicamente in una giornata.' },
      ]}
      defaultService="Montaggio Gru Edili"
    />
  );
}
