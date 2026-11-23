import ServicePageDe from '../../ServicePageDe';

export default function BaukranDe() {
  return (
    <ServicePageDe
      path="/de/baukran-transport-montage"
      h1="TRANSPORT UND MONTAGE"
      h1Highlight="VON BAUKRANEN"
      metaTitle="Baukran-Transport Trient | Demontage und Montage Potain — Nardin"
      metaDescription="Demontage, Transport und Wiedermontage von Potain-Turmdrehkranen und ähnlichen Modellen in Trient und Norditalien. Komplette Logistikplanung für Baustellen jeder Größe."
      intro="Demontage, Transport und Wiedermontage von Potain-Turmdrehkranen und ähnlichen Modellen, mit kompletter Logistikplanung für Baustellen jeder Größe, von der Altstadt bis zur großen Industriebaustelle."
      bullets={['Potain-Krane', 'Baustellenlogistik', 'Norditalien', 'Eigenes Team']}
      caseStudy={{
        title: 'Montage Turmdrehkran Terex FC6.24H — Altstadt',
        desc: 'Montage eines obendrehenden Turmdrehkrans Terex FC6.24 für eine Baustelle in der Altstadt. Arbeitshöhe 18 m, Ausleger 24 m. Eine Lösung für enge Stadträume, in denen herkömmliche Krane nicht arbeiten können.',
        img: '/images/progetto-1.webp',
      }}
      faqs={[
        { q: 'Übernehmen Sie auch die Montage, nicht nur den Transport?', a: 'Ja, wir bieten den Komplettservice: Demontage, Transport und Wiedermontage des Krans auf der neuen Baustelle.' },
        { q: 'Welche Baukran-Marken transportieren Sie?', a: 'Potain und ähnliche Modelle, sowohl untendrehende als auch obendrehende Krane.' },
        { q: 'Können Sie in Altstädten mit wenig Platz arbeiten?', a: 'Ja, wie bei der Montage in der Altstadt von Trient — das ist eine unserer Spezialitäten.' },
        { q: 'Wie lange dauert ein typischer Einsatz?', a: 'Das hängt vom Kran und von der Baustelle ab. Komplexe Einsätze auf engem Raum sind in der Regel an einem Tag abgeschlossen.' },
      ]}
      defaultService="Baukranmontage"
    />
  );
}
