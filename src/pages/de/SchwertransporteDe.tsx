import ServicePageDe from '../../ServicePageDe';

export default function SchwertransporteDe() {
  return (
    <ServicePageDe
      path="/de/schwertransporte-trentino"
      h1="SCHWERTRANSPORTE"
      h1Highlight="TRENTINO UND NORDITALIEN"
      metaTitle="Schwertransporte Trentino | Genehmigungen und Begleitung inklusive — Nardin"
      metaDescription="Schwertransporte für übergroße Ladungen im Trentino, in Venetien und der Lombardei. Sondergenehmigungen und Begleitfahrzeuge intern abgewickelt. Kostenloses Angebot."
      intro="Komplette Abwicklung für übergroße Ladungen: Sondergenehmigungen und Begleitfahrzeuge inklusive, von der Routenplanung bis zur Lieferung, im gesamten Trentino-Südtirol, in Venetien, der Lombardei und ganz Norditalien."
      bullets={['Übergroße Ladungen', 'Genehmigungen inklusive', 'Begleitfahrzeuge', 'Norditalien']}
      caseStudy={{
        title: 'Schwertransport — Schleusentore La Spezia',
        desc: 'Transport von 20 Meter langen Stahl-Schleusentoren für ein Rückhaltebecken in La Spezia. Komplette Abwicklung von Sondergenehmigungen, Begleitfahrzeugen und Logistik auf der Strecke durch Italien.',
        img: '/images/progetto-3.webp',
      }}
      faqs={[
        { q: 'Wer kümmert sich um die Genehmigungen für den Schwertransport?', a: 'Das übernehmen wir intern: Genehmigungen, Begleitfahrzeuge und die Planung der sichersten Route.' },
        { q: 'Welche Abmessungen und Gewichte transportieren Sie?', a: 'Übergroße Ladungen aller Art: Stahlkonstruktionen, Maschinen und Industriekomponenten über den Standardmaßen.' },
        { q: 'Fahren Sie auch außerhalb des Trentino?', a: 'Ja, wir sind in ganz Norditalien tätig und haben auch Erfahrung mit Strecken durch ganz Italien.' },
        { q: 'Wie lange dauern die Genehmigungen?', a: 'Das hängt von Route und Abmessungen ab. Senden Sie uns die Details der Ladung für eine genaue Zeitschätzung.' },
      ]}
      defaultService="Schwertransport"
    />
  );
}
