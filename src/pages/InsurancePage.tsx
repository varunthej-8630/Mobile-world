import React, { useState } from 'react';
import { ShieldCheck, CheckCircle, Smartphone, AlertCircle, Phone, MessageSquare, ArrowRight } from 'lucide-react';
import { mockDb } from '../data/mockDb';

interface InsurancePageProps {
  onNavigate: (path: string) => void;
}

export const InsurancePage: React.FC<InsurancePageProps> = ({ onNavigate }) => {
  const [deviceModel, setDeviceModel] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!deviceModel.trim()) {
      setFormError('Bitte geben Sie Ihr Gerätemodell an.');
      return;
    }
    if (!name.trim()) {
      setFormError('Bitte geben Sie Ihren vollständigen Namen ein.');
      return;
    }
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setFormError('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setFormError('Bitte geben Sie eine gültige Schweizer Telefonnummer an.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      mockDb.addEnquiry({
        type: 'general',
        customerName: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        branch: 'Seebach',
        details: {
          topic: 'MobileWorld Care Versicherung',
          deviceModel: deviceModel.trim()
        },
        message: `Versicherungsanfrage für Gerät: ${deviceModel.trim()}`
      });
      setIsSubmitting(false);
      setSubmitted(true);
    }, 450);
  };

  return (
    <div style={{ backgroundColor: '#F5F6F8', paddingBottom: '6rem' }}>
      <div style={{ backgroundColor: '#101318', color: '#FFFFFF', padding: '7.5rem 0 4.5rem' }}>
        <div className="container" style={{ maxWidth: '850px', textAlign: 'center' }}>
          <span className="section-eyebrow" style={{ color: '#7096FF' }}>MobileWorld Care Geräteschutz</span>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            color: '#FFFFFF',
            fontFamily: 'var(--font-heading)',
            marginBottom: '1.25rem',
            lineHeight: 1.15
          }}>
            Sorgenfrei geschützt bei Sturz &amp; Wasserschaden
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '1.2rem', lineHeight: 1.6 }}>
            Ein Smartphone ist ein wertvoller Begleiter. Mit MobileWorld Care sichern Sie Ihr neues oder bestehendes Gerät gegen teure Missgeschicke ab – mit Sofort-Reparatur in unserer Werkstatt Seebach.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '4rem', maxWidth: '1000px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '2.5rem',
          alignItems: 'flex-start'
        }}>
          {/* Benefits Info */}
          <div>
            <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem', color: '#101318' }}>
              Ihre Vorteile mit MobileWorld Care
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
              {[
                { title: 'Glas- & Displaybruch-Deckung', desc: 'Voller Kostenersatz für Displayreparaturen mit Original- oder Qualitäts-Ersatzteilen.' },
                { title: 'Wasserschaden-Schutz', desc: 'Professionelle Ultraschallbehandlung und Platinenrettung inklusive.' },
                { title: 'Kostenloses Ersatzgerät', desc: 'Während Ihr Gerät bei uns in Reparatur ist, stellen wir Ihnen gratis ein Leihgerät zur Verfügung.' },
                { title: 'Weltweiter Schutz', desc: 'Gilt sowohl in der Schweiz als auch im Ausland bei Reisen und Ferien.' }
              ].map((b, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.85rem' }}>
                  <CheckCircle size={20} color="#10B981" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <h4 style={{ fontSize: '1rem', color: '#101318', marginBottom: '0.2rem' }}>{b.title}</h4>
                    <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.5 }}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #DFE3E9',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: '0.9rem', color: '#64748B' }}>Ab</span>
              <span style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: '#174CFF' }}>
                CHF 9.90
              </span>
              <span style={{ color: '#64748B', fontSize: '0.9rem' }}>/ Monat (ohne Mindestlaufzeit)</span>
            </div>
          </div>

          {/* Enquiry Form */}
          <div
            className="p-5 sm:p-7 md:p-10"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #DFE3E9',
              boxShadow: '0 8px 24px rgba(16, 19, 24, 0.05)'
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div 
                  className="animate-spring-pop"
                  style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    color: '#10B981',
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem'
                  }}
                >
                  <CheckCircle size={36} />
                </div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>Anfrage eingegangen!</h3>
                <p style={{ color: '#64748B', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                  Wir melden uns in Kürze mit einem massgeschneiderten Versicherungsangebot für Ihr {deviceModel}.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn btn-secondary">
                  Weitere Anfrage
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', marginBottom: '1.25rem' }}>
                  Geräteschutz unverbindlich anfragen
                </h3>

                {formError && (
                  <div 
                    role="alert"
                    style={{
                      backgroundColor: 'rgba(239, 68, 68, 0.08)',
                      border: '1px solid #EF4444',
                      borderRadius: '10px',
                      padding: '0.75rem 1rem',
                      marginBottom: '1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      color: '#B91C1C',
                      fontSize: '0.875rem'
                    }}
                  >
                    <AlertCircle size={18} color="#EF4444" style={{ flexShrink: 0 }} />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Ihr Gerätemodell *</label>
                  <input
                    type="text"
                    required
                    value={deviceModel}
                    onChange={(e) => setDeviceModel(e.target.value)}
                    placeholder="z.B. iPhone 16 Pro 256GB oder Galaxy S24"
                    className="form-control"
                  />
                </div>

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

                <div className="form-group">
                  <label className="form-label">E-Mail Adresse *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@provider.ch"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Mobiltelefon *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+41 79 123 45 67"
                    className="form-control"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-raphus-slide btn-raphus-slide-filled w-full"
                  style={{ minHeight: '52px', marginTop: '1rem' }}
                >
                  <span className="btn-slide-badge"><ShieldCheck size={15} className="btn-slide-icon" /></span>
                  <span className="btn-slide-text">
                    {isSubmitting ? 'Wird übermittelt...' : 'Schutzplan anfragen'}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
