import ServicePage from '../ServicePage';

export default function LogisticaIndustriale() {
  return (
    <ServicePage
      path="/logistica-industriale"
      h1="LOGISTICA"
      h1Highlight="INDUSTRIALE"
      metaTitle="Logistica Industriale Trento | Movimentazione Macchinari — Nardin"
      metaDescription="Movimentazione macchinari pesanti, macchine utensili, prefabbricati e carpenteria metallica a Trento e Nord Italia. Soluzioni su misura, preventivo gratuito."
      intro="Movimentazione macchinari pesanti, macchine utensili, prefabbricati e carpenteria metallica: soluzioni logistiche su misura per l'industria del Trentino e del Nord Italia."
      bullets={['Macchinari Pesanti', 'Prefabbricati', 'Su Misura', 'Flotta Propria']}
      caseStudy={{
        title: 'Trasporto Carpenteria Metallica — Capannone industriale Rovereto',
        desc: 'Movimentazione strutture metalliche prefabbricate da 8t per nuovo capannone industriale. Pianale ribassato con scorta tecnica inclusa.',
        img: '/images/progetto-2.webp',
      }}
      faqs={[
        { q: 'Che tipo di macchinari movimentate?', a: 'Macchine utensili, impianti industriali, prefabbricati e carpenteria metallica di ogni dimensione e peso.' },
        { q: 'Avete mezzi adatti a carichi molto pesanti?', a: 'Sì, la nostra flotta include pianali ribassati e rimorchi dedicati per carichi pesanti e fuori norma.' },
        { q: 'Fate anche il posizionamento finale in capannone?', a: 'Sì, gestiamo movimentazione e posizionamento con autogrù dove necessario.' },
        { q: 'Operate su commesse industriali continuative?', a: 'Sì, lavoriamo sia su interventi singoli che su collaborazioni continuative con aziende manifatturiere.' },
      ]}
      defaultService="Logistica Industriale"
    />
  );
}
