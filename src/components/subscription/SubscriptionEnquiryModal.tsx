import React, { useState } from 'react';
import { X, CheckCircle, Radio, Phone, MessageSquare, ShieldCheck } from 'lucide-react';
import { SubscriptionPlan } from '../../types';
import { mockDb } from '../../data/mockDb';

interface SubscriptionEnquiryModalProps {
  plan: SubscriptionPlan | null;
  onClose: () => void;
}

export const SubscriptionEnquiryModal: React.FC<SubscriptionEnquiryModalProps> = ({ plan, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [keepNumber, setKeepNumber] = useState(true);
  const [currentProvider, setCurrentProvider] = useState('Swisscom');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!plan) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert('Bitte füllen Sie Name, E-Mail und Telefonnummer aus.');
      return;
    }

    mockDb.addEnquiry({
      type: 'subscription',
      customerName: name,
      email,
      phone,
      branch: 'Seebach',
      details: {
        planName: plan.name,
        provider: plan.provider,
        monthlyPrice: `CHF ${plan.discountPriceChf || plan.monthlyPriceChf}/Mt.`,
        keepNumber: keepNumber ? 'Ja' : 'Nein',
        currentProvider
      },
      message: `Abo-Anfrage für ${plan.name} (${plan.provider}) mit Rufnummernmitnahme von ${currentProvider}.`
    });

    setIsSubmitted(true);
  };

  // Lock body scroll when subscription modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Handle escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content p-4 sm:p-6 md:p-8" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              backgroundColor: 'rgba(23, 76, 255, 0.1)',
              color: '#174CFF',
              padding: '0.45rem',
              borderRadius: '8px'
            }}>
              <Radio size={18} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>
              Abo anfragen
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Schliessen"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}
          >
            <X size={20} />
          </button>
        </div>

        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              color: '#10B981',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}>
              <CheckCircle size={36} />
            </div>
            <h4 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
              Abo-Anfrage erfolgreich eingegangen!
            </h4>
            <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Vielen Dank! Unser Abo-Berater in Zürich Seebach prüft Ihre Angaben für den Tarif <strong>{plan.name}</strong> und kontaktiert Sie schnellstmöglich per WhatsApp oder Telefon.
            </p>

            <div style={{
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E6EC',
              borderRadius: '12px',
              padding: '1rem',
              fontSize: '0.85rem',
              color: '#64748B',
              marginBottom: '1.75rem',
              textAlign: 'left'
            }}>
              <strong>Keine Online-Vertragsbindung:</strong> Sie haben hiermit noch keinen bindenden Vertrag abgeschlossen. Der offizielle Abschluss und die SIM-Übergabe erfolgen nach Ihrer Prüfung persönlich im Shop oder per sicherem Identitätsnachweis.
            </div>

            <button onClick={onClose} className="btn btn-primary" style={{ width: '100%' }}>
              Schliessen
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Selected Plan Details Box */}
            <div style={{
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E6EC',
              borderRadius: '12px',
              padding: '1rem 1.25rem',
              marginBottom: '1.5rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <span className="badge badge-blue" style={{ fontSize: '0.7rem', marginBottom: '0.25rem' }}>
                  {plan.provider}
                </span>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#101318' }}>
                  {plan.name}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                  {plan.dataAllowance}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.35rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: '#174CFF' }}>
                  CHF {(plan.discountPriceChf || plan.monthlyPriceChf).toFixed(2)}
                  <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 400 }}> /Mt.</span>
                </div>
                {plan.discountPriceChf && (
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8', textDecoration: 'line-through' }}>
                    CHF {plan.monthlyPriceChf.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Vor- und Nachname *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="z.B. Martina Sutter"
                className="form-control"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="form-group mb-0">
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

              <div className="form-group mb-0">
                <label className="form-label">Mobiltelefon *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+41 78 123 45 67"
                  className="form-control"
                />
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label className="form-label">Bestehende Rufnummer behalten?</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.35rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="keepNumber"
                    checked={keepNumber}
                    onChange={() => setKeepNumber(true)}
                  />
                  Ja, Nummer mitnehmen (Portierung)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="keepNumber"
                    checked={!keepNumber}
                    onChange={() => setKeepNumber(false)}
                  />
                  Nein, neue Rufnummer
                </label>
              </div>
            </div>

            {keepNumber && (
              <div className="form-group">
                <label className="form-label">Aktueller Mobilfunk-Anbieter</label>
                <select
                  value={currentProvider}
                  onChange={(e) => setCurrentProvider(e.target.value)}
                  className="form-control"
                >
                  <option value="Swisscom">Swisscom</option>
                  <option value="Sunrise">Sunrise</option>
                  <option value="Salt">Salt</option>
                  <option value="yallo">yallo</option>
                  <option value="Wingo">Wingo</option>
                  <option value="Andere">Anderer Anbieter</option>
                </select>
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem', marginTop: '1rem' }}>
              Unverbindliche Abo-Offerte anfordern
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
