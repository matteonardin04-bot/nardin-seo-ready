import { PageChrome, useIsMobile } from './Layout';
import ContactForm from './ContactForm';
import { S, Head } from './shared';

export type ServicePageProps = {
  path: string;
  h1: string;
  h1Highlight: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  bullets: string[];
  caseStudy: { title: string; desc: string; img: string };
  faqs: { q: string; a: string }[];
  defaultService: string;
};

export default function ServicePage(p: ServicePageProps) {
  const mobile = useIsMobile();

  return (
    <PageChrome>
      <Head
        title={p.metaTitle}
        description={p.metaDescription}
        path={p.path}
        serviceName={p.h1 + ' ' + p.h1Highlight}
        serviceDescription={p.intro}
      />

      {/* HERO */}
      <section style={{ position: 'relative', paddingTop: mobile ? 130 : 220, paddingBottom: mobile ? 40 : 60, overflow: 'hidden' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 22, height: 2, background: S.orange }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', color: S.orange, textTransform: 'uppercase' }}>Trento — Dal 1980</span>
          </div>
          <h1 style={{ fontFamily: S.bebas, fontSize: 'clamp(36px,6vw,72px)', lineHeight: 0.95, color: S.text, marginBottom: 20 }}>
            {p.h1}<br /><span style={{ color: S.orange }}>{p.h1Highlight}</span>
          </h1>
          <p style={{ color: S.muted, fontSize: 16, lineHeight: 1.7, maxWidth: 640, marginBottom: 24 }}>{p.intro}</p>

          <a
            href="https://www.google.com/maps/place/Nardin+Autotrasporti"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: S.orange, fontSize: 13, fontWeight: 700, marginBottom: 32 }}
          >
            ★★★★★ <span style={{ color: S.text }}>34 recensioni 5 stelle su Google</span>
          </a>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {p.bullets.map(b => (
              <span key={b} style={{ border: `1px solid ${S.border}`, padding: '6px 14px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: S.gray, textTransform: 'uppercase' }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CASO STUDIO CORRELATO */}
      <section style={{ padding: mobile ? '50px 0' : '90px 0', background: S.dark, borderTop: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1.4fr', gap: 32, alignItems: 'center' }}>
          <div style={{ height: mobile ? 200 : 320, overflow: 'hidden', background: S.black }}>
            <img src={p.caseStudy.img} alt={p.caseStudy.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', color: S.orange, textTransform: 'uppercase', marginBottom: 10 }}>Caso Reale</p>
            <div style={{ width: 36, height: 3, background: S.orange, marginBottom: 20 }} />
            <h2 style={{ fontFamily: S.bebas, fontSize: 28, color: S.text, marginBottom: 14 }}>{p.caseStudy.title}</h2>
            <p style={{ color: S.gray, fontSize: 14, lineHeight: 1.7 }}>{p.caseStudy.desc}</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: mobile ? '60px 0 50px' : '170px 0 90px', background: S.black, borderTop: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 40px' }}>
          <h2 style={{ fontFamily: S.bebas, fontSize: 'clamp(28px,4vw,44px)', color: S.text, marginBottom: 32 }}>DOMANDE FREQUENTI</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: S.border }}>
            {p.faqs.map(f => (
              <div key={f.q} style={{ background: S.dark, padding: '20px 24px' }}>
                <p style={{ fontWeight: 700, fontSize: 14, color: S.text, marginBottom: 8 }}>{f.q}</p>
                <p style={{ color: S.gray, fontSize: 13, lineHeight: 1.6 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="contatti-servizio" style={{ padding: 'clamp(50px,7vw,90px) 0', background: S.dark, borderTop: `1px solid ${S.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
          <h2 style={{ fontFamily: S.bebas, fontSize: 'clamp(32px,5vw,56px)', color: S.text, marginBottom: 24 }}>
            PREVENTIVO<br /><span style={{ color: S.orange }}>GRATUITO</span>
          </h2>
          <ContactForm mobile={mobile} defaultService={p.defaultService} />
        </div>
      </section>
    </PageChrome>
  );
}
