import ServicePageDe from '../../ServicePageDe';

export default function AutokranvermietungDe() {
  return (
    <ServicePageDe
      path="/de/autokranvermietung-trient"
      h1="AUTOKRANVERMIETUNG"
      h1Highlight="IN TRIENT"
      metaTitle="Autokranvermietung Trient | Effer und Hiab bis 95 mt — Nardin"
      metaDescription="Autokranvermietung in Trient mit Kranführer. Effer und Hiab bis 95 mt für Industriemontagen, Stahlbau und enge Platzverhältnisse. Angebot in 24 Std."
      intro="Effer- und Hiab-Autokrane bis 95 mt mit erfahrenem Kranführer, für Industriemontagen, Stahlbau und Hübe auf engstem Raum in der Altstadt und auf Baustellen im Trentino."
      bullets={['Effer bis 95 mt', 'Mit Kranführer', 'Enge Platzverhältnisse', 'Angebot in 24 Std.']}
      caseStudy={{
        title: 'Montage einer Holzverarbeitungsanlage — Tandemhub mit zwei Autokranen',
        desc: 'Installation einer 8 Tonnen schweren Holzverarbeitungsanlage mit zwei Autokranen im Tandemhub. Der Doppelkran war nötig, um Abmessungen und Höhe der Anlage sicher zu beherrschen.',
        img: '/images/progetto-2.webp',
      }}
      faqs={[
        { q: 'Was kostet die Autokranvermietung in Trient?', a: 'Der Preis hängt von der benötigten Tragkraft, der Dauer und der Komplexität des Hubs ab. Kostenlose Besichtigung und detailliertes Angebot innerhalb von 24 Stunden.' },
        { q: 'Arbeiten Sie auch in Altstädten oder auf engem Raum?', a: 'Ja, das ist eine unserer Spezialitäten: eigene Fahrzeuge für Manöver auf engstem Raum, wo herkömmliche Autokrane nicht hinkommen.' },
        { q: 'Ist der Kranführer inklusive?', a: 'Ja, alle unsere Autokrane werden mit qualifiziertem Kranführer geliefert.' },
        { q: 'Wie früh muss ich buchen?', a: 'Für geplante Einsätze empfehlen wir 3–5 Tage Vorlauf. In dringenden Fällen sind wir rund um die Uhr unter +39 348 4420285 erreichbar.' },
      ]}
      fleet={{
        title: 'UNSERE AUTOKRAN-FLOTTE',
        intro: 'Fünf eigene Autokrane, immer mit qualifiziertem Kranführer: vom kompaktesten für Altstädte bis zum stärksten für schwere Industriehübe, in Trient und im gesamten Trentino.',
        items: [
          { name: 'Effer 955 6S + Jib 6S', spec: '734 kNm — max. Tragkraft 24 t — Ausladung über 30 m', use: 'Unser Spitzenkran: hydraulische Ausladung bis 16 m, über 30 m mit Jib 6S. Für schwere Industriehübe.' },
          { name: 'Hiab iQ 708', spec: '60-70 mt — vertikale Reichweite 40 m', use: 'SPACEevo-Steuerung für präzise Bewegungen. Ideal für komplexe Industriemontagen.' },
          { name: 'Effer 685', spec: 'Max. Tragkraft 19 t — Ausladung 30 m mit Jib', use: 'Gleichgewicht zwischen Tragkraft und Ausladung: komplexe Baustellen und Stahlbaumontagen.' },
          { name: 'Effer 525 6S + Jib 6S', spec: '446 kNm — vielseitig und präzise', use: 'Große Ausladungen bei hoher Wendigkeit: enge Platzverhältnisse und schwieriges alpines Gelände.' },
          { name: 'Effer 375', spec: 'Kompakt und wendig — Innenstädte', use: 'Schnell aufgestellt: rasche Einsätze in der Altstadt und auf Baustellen mit eingeschränkter Zufahrt.' },
        ],
      }}
      defaultService="Autokranvermietung"
    />
  );
}
