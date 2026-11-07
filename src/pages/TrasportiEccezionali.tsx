import ServicePage from '../ServicePage';

export default function TrasportiEccezionali() {
  return (
    <ServicePage
      path="/trasporti-eccezionali-trentino"
      h1="TRASPORTI ECCEZIONALI"
      h1Highlight="TRENTINO E NORD ITALIA"
      metaTitle="Trasporti Eccezionali Trentino | Permessi e Scorta Inclusi — Nardin"
      metaDescription="Trasporti eccezionali per carichi fuori sagoma in Trentino, Veneto e Lombardia. Permessi speciali e scorta tecnica gestiti internamente. Preventivo gratuito."
      intro="Gestione completa per carichi fuori sagoma: permessi speciali e scorta tecnica inclusi, dalla pianificazione del percorso alla consegna, in tutto il Trentino-Alto Adige, Veneto, Lombardia e Nord Italia."
      bullets={['Carichi Fuori Sagoma', 'Permessi Inclusi', 'Scorta Tecnica', 'Nord Italia']}
      caseStudy={{
        title: 'Trasporto Eccezionale — Paratoie La Spezia',
        desc: 'Trasporto di paratoie metalliche da 20 metri di lunghezza destinate a un bacino di contenimento a La Spezia. Gestione completa di permessi eccezionali, scorta tecnica e logistica su percorso nazionale.',
        img: '/images/progetto-3.webp',
      }}
      faqs={[
        { q: 'Chi si occupa dei permessi per il trasporto eccezionale?', a: 'Ce ne occupiamo internamente noi: autorizzazioni, scorta tecnica e pianificazione del percorso più sicuro.' },
        { q: 'Quali dimensioni/pesi gestite?', a: 'Carichi fuori sagoma di ogni tipo: strutture metalliche, macchinari, componenti industriali oltre le dimensioni standard.' },
        { q: 'Operate fuori dal Trentino?', a: 'Sì, siamo operativi in tutto il Nord Italia, con esperienza anche su percorsi nazionali.' },
        { q: 'Quanto tempo servono i permessi?', a: 'Dipende dal percorso e dalle dimensioni. Contattaci con i dettagli del carico per una stima precisa dei tempi.' },
      ]}
      defaultService="Trasporto Eccezionale"
    />
  );
}
