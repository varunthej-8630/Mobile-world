import React, { useState } from 'react';
import { Building2, Users, ShieldCheck, Clock, CheckCircle, ArrowRight, Phone, Mail } from 'lucide-react';
import { mockDb } from '../data/mockDb';

interface BusinessPageProps {
  onNavigate: (path: string) => void;
}

export const BusinessPage: React.FC<BusinessPageProps> = ({ onNavigate }) => {
  const [orgName, setOrgName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [orgType, setOrgType] = useState('KMU (bis 50 Mitarbeiter)');
  const [deviceCount, setDeviceCount] = useState('10–25 Geräte');
  const [servicesNeeded, setServicesNeeded] = useState<string[]>(['Flotten-Reparaturen']);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (svc: string) => {
    setServicesNeeded(prev =>
      prev.includes(svc) ? prev.filter(s => s !== svc) : [...prev, svc]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mockDb.addEnquiry({
      type: 'business',
      customerName: contactPerson,
      email,
      phone,
      branch: 'Seebach',
      details: {
        organizationName: orgName,
        orgType,
        deviceCount,
        servicesNeeded: servicesNeeded.join(', ')
      },
      message: message || `Firmenanfrage von ${orgName} (${orgType}) mit ca. ${deviceCount}.`
    });
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: '#F5F6F8', paddingBottom: '6rem' }}>
      <div style={{ backgroundColor: '#101318', color: '#FFFFFF', padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '850px', textAlign: 'center' }}>
          <span className="section-eyebrow" style={{ color: '#7096FF' }}>B2B &amp; Corporate Solutions</span>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            color: '#FFFFFF',
            fontFamily: 'var(--font-heading)',
            marginBottom: '1.25rem',
            lineHeight: 1.15
          }}>
            Kollektivangebote für Firmen &amp; Vereine
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '1.2rem', lineHeight: 1.6 }}>
            Arbeiten Sie in einer Branche, in der Smartphones und Tablets unverzichtbare Arbeitsmittel sind? Mobile World bietet massgeschneiderte Konditionen, Express-Flottenreparaturen und exklusive Mitarbeiter-Vorteile.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '4rem', maxWidth: '1050px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '2.5rem',
          alignItems: 'flex-start'
        }}>
          {/* Left: Benefits & Information */}
          <div>
            <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem', color: '#101318' }}>
              Ihre B2B Vorteile bei Mobile World
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {[
                {
                  title: 'Priorisierter Express-Reparaturservice',
                  desc: 'Defekte Diensthandys Ihrer Mitarbeiter reparieren wir bevorzugt innerhalb von 30 bis 60 Minuten, um Ausfallzeiten auf ein Minimum zu reduzieren.'
                },
                {
                  title: 'Flottenrabatte & Monatsrechnung',
                  desc: 'Attraktive Mengenrabatte auf Reparaturen und Zubehör sowie bequeme Abrechnung per 30-Tage-Monatsrechnung für Schweizer Unternehmen.'
                },
                {
                  title: 'Mitarbeiter-Vergünstigungen',
                  desc: 'Ihre Angestellten profitieren auch privat von Sonderkonditionen bei neuen Handyabos (Sunrise, Salt) und Reparaturen.'
                },
                {
                  title: 'Fester Ansprechpartner in Zürich',
                  desc: 'Keine anonymen Support-Tickets. Sie haben einen direkten Schweizer Ansprechpartner für alle Belange Ihrer Firmenflotte.'
                }
              ].map((b, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{
                    backgroundColor: 'rgba(23, 76, 255, 0.1)',
                    color: '#174CFF',
                    padding: '0.5rem',
                    borderRadius: '8px'
                  }}>
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: '#101318', marginBottom: '0.25rem' }}>{b.title}</h4>
                    <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.5 }}>{b.desc}</p>
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
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>Direkter B2B-Kontakt:</h4>
              <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '1rem' }}>
                Gerne erstellen wir Ihnen ein unverbindliches Rahmenabkommen für Ihre Organisation.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.9rem' }}>
                <a href="tel:+41445436333" style={{ color: '#174CFF', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Phone size={15} /> +41 44 543 63 33
                </a>
                <a href="mailto:info@mobileworldzh.ch" style={{ color: '#174CFF', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Mail size={15} /> info@mobileworldzh.ch
                </a>
              </div>
            </div>
          </div>

          {/* Right: Business Enquiry Form */}
          <div
            className="p-5 sm:p-7 md:p-10"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid #DFE3E9',
              boxShadow: '0 12px 36px rgba(16, 19, 24, 0.05)'
            }}
          >
            <h3 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem', color: '#101318' }}>
              Firmen- &amp; Vereinsanfrage stellen
            </h3>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <CheckCircle size={48} color="#10B981" style={{ margin: '0 auto 1rem' }} />
                <h4 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Vielen Dank für Ihre Anfrage!</h4>
                <p style={{ color: '#64748B', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                  Wir haben Ihre B2B-Anfrage für <strong>{orgName}</strong> erhalten. Unser Geschäftskunden-Betreuer wird sich innerhalb eines Werktags bei Ihnen melden.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn btn-secondary">
                  Neue Anfrage erfassen
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Name der Organisation / Firma *</label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="z.B. Zürcher Elektro AG oder Sportverein Seebach"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Ansprechperson *</label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="Vorname &amp; Nachname"
                    className="form-control"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Geschäftliche E-Mail *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="kontakt@firma.ch"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Telefonnummer *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+41 44 123 45 67"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Organisationstyp</label>
                    <select value={orgType} onChange={(e) => setOrgType(e.target.value)} className="form-control">
                      <option value="KMU (bis 50 Mitarbeiter)">KMU (bis 50 Mitarbeiter)</option>
                      <option value="Grossunternehmen (50+ MA)">Grossunternehmen (50+ MA)</option>
                      <option value="Verein / Non-Profit">Verein / Non-Profit</option>
                      <option value="Schule / Bildungseinrichtung">Schule / Bildungseinrichtung</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Ungefähre Geräteanzahl</label>
                    <select value={deviceCount} onChange={(e) => setDeviceCount(e.target.value)} className="form-control">
                      <option value="1–10 Geräte">1–10 Geräte</option>
                      <option value="10–25 Geräte">10–25 Geräte</option>
                      <option value="25–100 Geräte">25–100 Geräte</option>
                      <option value="Über 100 Geräte">Über 100 Geräte</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Benötigte Services (Mehrfachauswahl)</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
                    {['Flotten-Reparaturen', 'Mobilfunk-Abos für MA', 'Gerätebeschaffung', 'Zubehör-Rahmenvertrag', 'Datenmigration'].map(svc => {
                      const selected = servicesNeeded.includes(svc);
                      return (
                        <button
                          key={svc}
                          type="button"
                          onClick={() => toggleService(svc)}
                          style={{
                            padding: '0.4rem 0.75rem',
                            borderRadius: '6px',
                            border: selected ? '1.5px solid #174CFF' : '1px solid #E2E6EC',
                            backgroundColor: selected ? 'rgba(23, 76, 255, 0.08)' : '#FFFFFF',
                            color: selected ? '#174CFF' : '#334155',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          {selected ? '✓ ' : '+ '}{svc}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Ihre Nachricht / Besondere Wünsche</label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Beschreiben Sie kurz Ihren Bedarf..."
                    className="form-control"
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                  Kollektivangebot anfordern
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
