import ServicePageDe from '../../ServicePageDe';

export default function IndustrielogistikDe() {
  return (
    <ServicePageDe
      path="/de/industrielogistik"
      h1="INDUSTRIE-"
      h1Highlight="LOGISTIK"
      metaTitle="Industrielogistik Trient | Maschinentransport — Nardin"
      metaDescription="Transport und Umsetzen von Schwermaschinen, Werkzeugmaschinen, Fertigteilen und Stahlbau in Trient und Norditalien. Maßgeschneiderte Lösungen, kostenloses Angebot."
      intro="Transport und Umsetzen von Schwermaschinen, Werkzeugmaschinen, Fertigteilen und Stahlbau: maßgeschneiderte Logistiklösungen für die Industrie im Trentino und in Norditalien."
      bullets={['Schwermaschinen', 'Fertigteile', 'Maßgeschneidert', 'Eigene Flotte']}
      caseStudy={{
        title: 'Schwertransport — Schleusentore La Spezia',
        desc: 'Transport von 20 Meter langen Stahl-Schleusentoren für ein Rückhaltebecken in La Spezia. Komplette Abwicklung von Sondergenehmigungen, Begleitfahrzeugen und Logistik auf der Strecke durch Italien.',
        img: '/images/progetto-3.webp',
      }}
      faqs={[
        { q: 'Welche Maschinen transportieren Sie?', a: 'Werkzeugmaschinen, Industrieanlagen, Fertigteile und Stahlbau jeder Größe und jedes Gewichts.' },
        { q: 'Haben Sie Fahrzeuge für sehr schwere Lasten?', a: 'Ja, unsere Flotte umfasst Tieflader und spezielle Auflieger für schwere und übergroße Lasten.' },
        { q: 'Übernehmen Sie auch die Endpositionierung in der Halle?', a: 'Ja, wir übernehmen Transport und Positionierung, bei Bedarf mit Autokran.' },
        { q: 'Arbeiten Sie auch für laufende Industrieaufträge?', a: 'Ja, wir übernehmen sowohl Einzeleinsätze als auch langfristige Zusammenarbeit mit Fertigungsbetrieben.' },
      ]}
      defaultService="Industrielogistik"
    />
  );
}
