import ServicePage from '../ServicePage';

export default function NoleggioAutogru() {
  return (
    <ServicePage
      path="/noleggio-autogru-trento"
      h1="NOLEGGIO AUTOGRÙ"
      h1Highlight="A TRENTO"
      metaTitle="Noleggio Autogrù Trento | Effer e Hiab fino a 95 t/m — Nardin"
      metaDescription="Noleggio autogrù a Trento con operatore. Effer e Hiab fino a 95 t/m, per montaggi industriali, carpenterie metalliche e spazi angusti. Preventivo in 24h."
      intro="Autogrù Effer e Hiab fino a 95 t/m con operatore esperto, per montaggi industriali, carpenterie metalliche e movimentazioni in spazi angusti nel centro storico e nei cantieri del Trentino."
      bullets={['Effer fino a 95 t/m', 'Con Operatore', 'Spazi Angusti', 'Preventivo 24h']}
      caseStudy={{
        title: 'Sollevamento Gru Potain 12t — Centro storico Trento',
        desc: 'Montaggio gru a torre in spazio ristretto nel centro storico di Trento. Operazione completata in un solo giorno con autogrù Effer 95 t/m — dove i mezzi tradizionali non possono operare.',
        img: '/images/progetto-1.webp',
      }}
      faqs={[
        { q: 'Quanto costa il noleggio autogrù a Trento?', a: 'Il costo dipende da portata richiesta, durata e complessità del sollevamento. Sopralluogo gratuito e preventivo dettagliato entro 24 ore.' },
        { q: 'Operate anche in centri storici o spazi ristretti?', a: 'Sì, è una delle nostre specialità: mezzi dedicati per manovre in spazi angusti dove le autogrù tradizionali non entrano.' },
        { q: 'L\'operatore è incluso?', a: 'Sì, tutte le nostre autogrù vengono fornite con operatore qualificato.' },
        { q: 'Quanto tempo prima devo prenotare?', a: 'Per lavori programmati consigliamo 3-5 giorni. Per urgenze siamo raggiungibili H24 al 348 4420285.' },
      ]}
      fleet={{
        title: 'LA NOSTRA FLOTTA DI AUTOGRÙ',
        intro: 'Cinque autogrù di proprietà, sempre fornite con operatore qualificato: dalla più compatta per i centri storici alla più potente per i sollevamenti industriali pesanti, a Trento e in tutto il Trentino.',
        items: [
          { name: 'Effer 955 6S + Jib 6S', spec: '734 kNm — portata max 24 t — sbraccio oltre 30 m', use: 'La gru di punta: sbraccio idraulico fino a 16 m, oltre 30 m con il Jib 6S. Per sollevamenti industriali pesanti.' },
          { name: 'Hiab iQ 708', spec: '60-70 t/m — sbraccio verticale 40 m', use: 'Sistema di controllo SPACEevo per movimenti di precisione. Ideale per montaggi industriali complessi.' },
          { name: 'Effer 685', spec: 'Portata max 19 t — sbraccio 30 m con Jib', use: 'Equilibrio tra portata e sbraccio: cantieri edili complessi e montaggi di carpenteria metallica.' },
          { name: 'Effer 525 6S + Jib 6S', spec: '446 kNm — versatile e precisa', use: 'Sbracci importanti con grande agilità di manovra: spazi angusti e zone alpine difficili.' },
          { name: 'Effer 375', spec: 'Compatta e agile — centri urbani', use: 'Veloce da posizionare: interventi rapidi in centro storico e cantieri con accesso limitato.' },
        ],
      }}
      defaultService="Noleggio Autogrù"
    />
  );
}
