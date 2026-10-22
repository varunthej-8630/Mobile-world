import React, { useState } from 'react';
import { RefreshCw, Banknote, ShieldCheck, CheckCircle, ArrowRight, Smartphone, MessageSquare } from 'lucide-react';
import { mockDb } from '../data/mockDb';

interface BuySellPageProps {
  onNavigate: (path: string) => void;
}

export const BuySellPage: React.FC<BuySellPageProps> = ({ onNavigate }) => {
  const [brand, setBrand] = useState('Apple');
  const [model, setModel] = useState('iPhone 14 Pro');
  const [storage, setStorage] = useState('128 GB');
  const [condition, setCondition] = useState<'like_new' | 'good' | 'fair' | 'damaged'>('good');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Illustrative non-binding valuation calculator
  const estimatePrice = () => {
    let base = 350;
    if (model.includes('15 Pro') || model.includes('S24')) base = 650;
    if (model.includes('14 Pro') || model.includes('S23')) base = 450;
    if (model.includes('13')) base = 300;
    if (model.includes('12')) base = 200;

    if (condition === 'like_new') base *= 1.15;
    if (condition === 'good') base *= 1.0;
    if (condition === 'fair') base *= 0.75;
    if (condition === 'damaged') base *= 0.45;

    return Math.round(base);
  };

  const estimatedValue = estimatePrice();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mockDb.addEnquiry({
      type: 'buy_sell',
      customerName: name,
      email,
      phone,
      branch: 'Seebach',
      details: {
        brand,
        model,
        storage,
        condition,
        indicativeEstimate: `CHF ${estimatedValue}.-`
      },
      message: `Ankaufs-Anfrage für ${brand} ${model} (${storage}, Zustand: ${condition}) zum Richtwert von ca. CHF ${estimatedValue}.-`
    });
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: '#F5F6F8', paddingBottom: '6rem' }}>
      <div style={{ backgroundColor: '#101318', color: '#FFFFFF', padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '850px', textAlign: 'center' }}>
          <span className="section-eyebrow" style={{ color: '#7096FF' }}>Nachhaltig &amp; Lukrativ</span>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            color: '#FFFFFF',
            fontFamily: 'var(--font-heading)',
            marginBottom: '1.25rem',
            lineHeight: 1.15
          }}>
            Handy An- &amp; Verkauf Zürich
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '1.2rem', lineHeight: 1.6 }}>
            Verwandeln Sie ungenutzte Smartphones und Tablets in Bargeld. Wir prüfen Ihr Gerät vor Ort in Zürich Seebach und zahlen den Betrag sofort bar aus oder verrechnen ihn mit einem Neukauf.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '4rem', maxWidth: '1050px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'flex-start'
        }}>
          {/* Trade-in Configurator */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #DFE3E9',
            padding: '2.5rem',
            boxShadow: '0 12px 36px rgba(16, 19, 24, 0.05)'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem', color: '#101318' }}>
              Gerät bewerten &amp; Richtwert berechnen
            </h3>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <CheckCircle size={48} color="#10B981" style={{ margin: '0 auto 1rem' }} />
                <h4 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Anfrage erfolgreich versendet!</h4>
                <p style={{ color: '#64748B', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                  Vielen Dank, {name}! Wir haben Ihre Angaben zum {brand} {model} erhalten. Unser Ankauf-Team kontaktiert Sie zur Terminbestätigung.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn btn-secondary">
                  Weiteres Gerät bewerten
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Hersteller</label>
                    <select value={brand} onChange={(e) => setBrand(e.target.value)} className="form-control">
                      <option value="Apple">Apple iPhone</option>
                      <option value="Samsung">Samsung Galaxy</option>
                      <option value="Google">Google Pixel</option>
                      <option value="Xiaomi">Xiaomi</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Modell</label>
                    <input
                      type="text"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      placeholder="z.B. iPhone 14 Pro"
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Speicherkapazität</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['64 GB', '128 GB', '256 GB', '512 GB / 1 TB'].map(st => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setStorage(st)}
                        style={{
                          padding: '0.45rem 0.75rem',
                          borderRadius: '8px',
                          border: storage === st ? '2px solid #174CFF' : '1px solid #E2E6EC',
                          backgroundColor: storage === st ? 'rgba(23, 76, 255, 0.08)' : '#FFFFFF',
                          color: storage === st ? '#174CFF' : '#334155',
                          fontWeight: 600,
                          fontSize: '0.8rem',
                          cursor: 'pointer'
                        }}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Zustand des Geräts</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {[
                      { id: 'like_new' as const, label: 'Wie Neu (Makellos, keine Kratzer)' },
                      { id: 'good' as const, label: 'Gut (Minime Mikrokratzer, voll funktionsfähig)' },
                      { id: 'fair' as const, label: 'Deutliche Gebrauchsspuren (Kratzer am Gehäuse)' },
                      { id: 'damaged' as const, label: 'Defekt (Display- oder Glasbruch)' }
                    ].map(c => (
                      <label
                        key={c.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.65rem',
                          padding: '0.65rem 0.85rem',
                          borderRadius: '8px',
                          border: condition === c.id ? '1.5px solid #174CFF' : '1px solid #E2E6EC',
                          backgroundColor: condition === c.id ? 'rgba(23, 76, 255, 0.05)' : '#FFFFFF',
                          fontSize: '0.85rem',
                          cursor: 'pointer'
                        }}
                      >
                        <input
                          type="radio"
                          name="cond"
                          checked={condition === c.id}
                          onChange={() => setCondition(c.id)}
                        />
                        {c.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Live Estimated Valuation Banner */}
                <div style={{
                  backgroundColor: '#101318',
                  color: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  marginTop: '1.5rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ fontSize: '0.8rem', color: '#94A3B8', textTransform: 'uppercase' }}>
                    Geschätzter Richtwert (unverbindlich):
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginTop: '0.25rem' }}>
                    <span style={{ fontSize: '1.25rem', color: '#AAB2C0' }}>CHF</span>
                    <span style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: '#D9FF70' }}>
                      ca. {estimatedValue}.-
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.35rem' }}>
                    * Der finale Auszahlungsbetrag wird nach kurzer Sichtprüfung vor Ort im Laden Seebach fixiert.
                  </div>
                </div>

                {/* Contact fields */}
                <div className="form-group">
                  <label className="form-label">Ihr Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Vor- und Nachname"
                    className="form-control"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Telefonnummer *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+41 78 123 45 67"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">E-Mail *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@provider.ch"
                      className="form-control"
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '0.5rem' }}>
                  Ankauf jetzt anfragen
                </button>
              </form>
            )}
          </div>

          {/* Trade-in Benefits & Process */}
          <div>
            <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', marginBottom: '1.25rem' }}>
              So einfach funktioniert der Ankauf:
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {[
                { step: '1', title: 'Schätzung einholen', desc: 'Geben Sie Modell und Zustand in den Rechner ein für eine erste Orientierung.' },
                { step: '2', title: 'Gerät vorbeibringen', desc: 'Kommen Sie zu Mobile World nach Zürich Seebach (Schaffhauserstrasse 455).' },
                { step: '3', title: '5-Minuten Funktionsprüfung', desc: 'Unser Techniker überprüft Display, Akku, Kameras und Gehäuse kurz vor Ihren Augen.' },
                { step: '4', title: 'Sofortige Barauszahlung', desc: 'Sie erhalten Ihr Geld direkt bar auf die Hand oder als Gutschrift für Neugeräte.' }
              ].map(st => (
                <div key={st.step} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{
                    backgroundColor: '#101318',
                    color: '#D9FF70',
                    fontWeight: 700,
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {st.step}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', color: '#101318', marginBottom: '0.2rem' }}>{st.title}</h4>
                    <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.5 }}>{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #DFE3E9',
              padding: '1.75rem'
            }}>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Banknote size={18} color="#059669" /> Sicherer Daten-Löschservice:
              </h4>
              <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.6 }}>
                Wir setzen Ihr Gerät vor dem Weiterverkauf gemäss Schweizer Datenschutzstandards vollständig auf Werkseinstellungen zurück. Ihre persönlichen Fotos, Passwörter und Konten werden rückstandslos gelöscht.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
