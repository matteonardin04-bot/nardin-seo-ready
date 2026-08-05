import { useForm, ValidationError } from '@formspree/react';
import { S, inp } from './shared';

export default function ContactForm({ mobile, defaultService }: { mobile: boolean; defaultService?: string }) {
  const [state, handleSubmit] = useForm('xnjowlpd');

  return (
    <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1.6fr', gap: 2, background: S.border }}>
      <div style={{ background: S.black, padding: 'clamp(28px,4vw,52px)', display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: S.gray, textTransform: 'uppercase', marginBottom: 6 }}>Telefono Diretto</p>
          <a href="tel:+390461990268" style={{ fontFamily: S.bebas, fontSize: 'clamp(24px,3vw,36px)', color: S.text, textDecoration: 'none' }}>+39 0461 990268</a>
        </div>
        <div>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: S.gray, textTransform: 'uppercase', marginBottom: 6 }}>WhatsApp H24</p>
          <a href="https://wa.me/393484420285" target="_blank" rel="noopener noreferrer" style={{ fontFamily: S.bebas, fontSize: 'clamp(20px,2.5vw,30px)', color: S.text, textDecoration: 'none' }}>+39 348 4420285</a>
        </div>
        <div>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: S.gray, textTransform: 'uppercase', marginBottom: 6 }}>Sede Operativa</p>
          <p style={{ color: S.text, fontSize: 15, lineHeight: 1.5 }}>Via Aeroporto, 31<br />38121 Trento (TN)</p>
        </div>
        <div>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: S.gray, textTransform: 'uppercase', marginBottom: 6 }}>Email</p>
          <a href="mailto:info@nardinautotrasporti.it" style={{ color: S.orange, fontSize: 14, textDecoration: 'none' }}>info@nardinautotrasporti.it</a>
        </div>
        <div style={{ marginTop: 'auto', paddingTop: 24, borderTop: `1px solid ${S.border}` }}>
          <p style={{ fontSize: 10, color: '#4B5563', lineHeight: 1.7 }}>
            Nardin Autotrasporti s.n.c.<br />P.IVA 01762870226<br />Albo Autotrasportatori TN/2053832Z
          </p>
        </div>
      </div>

      <div style={{ background: S.dark, padding: 'clamp(28px,4vw,52px)' }}>
        {state.succeeded ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', gap: 14 }}>
            <div style={{ fontFamily: S.bebas, fontSize: 72, color: S.orange }}>✓</div>
            <h3 style={{ fontFamily: S.bebas, fontSize: 32, color: S.text }}>RICHIESTA INVIATA</h3>
            <p style={{ color: S.muted, fontSize: 15, lineHeight: 1.6 }}>Ti richiamiamo entro 2 ore in orario lavorativo.<br />Per urgenze: <a href="tel:+390461990268" style={{ color: S.orange, textDecoration: 'none' }}>0461 990268</a></p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', color: S.gray, textTransform: 'uppercase', marginBottom: 6 }}>Ragione Sociale *</label>
                <input name="company" type="text" required placeholder="Azienda S.r.l." style={inp()} />
                <ValidationError prefix="Company" field="company" errors={state.errors} style={{ color: '#EF4444', fontSize: 11, marginTop: 3 }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', color: S.gray, textTransform: 'uppercase', marginBottom: 6 }}>Telefono *</label>
                <input name="phone" type="tel" required placeholder="+39 ..." style={inp()} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', color: S.gray, textTransform: 'uppercase', marginBottom: 6 }}>Email *</label>
              <input name="email" type="email" required placeholder="info@azienda.it" style={inp()} />
              <ValidationError prefix="Email" field="email" errors={state.errors} style={{ color: '#EF4444', fontSize: 11, marginTop: 3 }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', color: S.gray, textTransform: 'uppercase', marginBottom: 6 }}>Tipo Intervento</label>
              <select name="service" defaultValue={defaultService} style={inp({ cursor: 'pointer' })}>
                <option>Noleggio Autogrù</option>
                <option>Sollevamento Industriale</option>
                <option>Trasporto Eccezionale</option>
                <option>Montaggio Gru Edili</option>
                <option>Logistica Industriale</option>
                <option>Altro</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', color: S.gray, textTransform: 'uppercase', marginBottom: 6 }}>Luogo / Cantiere</label>
              <input name="location" type="text" placeholder="Città, indirizzo cantiere..." style={inp()} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', color: S.gray, textTransform: 'uppercase', marginBottom: 6 }}>Descrizione Lavoro</label>
              <textarea name="message" rows={3} placeholder="Pesi, dimensioni, altezze, tempistiche, note..." style={inp({ resize: 'vertical', fontFamily: S.inter })} />
              <ValidationError prefix="Message" field="message" errors={state.errors} style={{ color: '#EF4444', fontSize: 11, marginTop: 3 }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', color: S.gray, textTransform: 'uppercase', marginBottom: 6 }}>Foto Carico / Cantiere (opzionale)</label>
              <input name="attachment" type="file" accept="image/*,.pdf" style={{ ...inp(), padding: '10px 14px', cursor: 'pointer' }} />
            </div>
            <button type="submit" disabled={state.submitting} style={{ background: S.orange, color: '#fff', border: 'none', padding: 18, cursor: state.submitting ? 'not-allowed' : 'pointer', opacity: state.submitting ? 0.6 : 1, fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase' }}>
              {state.submitting ? 'INVIO IN CORSO...' : 'RICHIEDI PREVENTIVO GRATUITO'}
            </button>
            <p style={{ fontSize: 11, color: '#4B5563', textAlign: 'center' }}>Ti richiamiamo entro 2 ore in orario lavorativo. Per urgenze: <a href="tel:+390461990268" style={{ color: S.orange, textDecoration: 'none' }}>0461 990268</a></p>
          </form>
        )}
      </div>
    </div>
  );
}
