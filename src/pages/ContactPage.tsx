import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Send,
  ExternalLink,
  AlertCircle 
} from 'lucide-react';
import { mockDb } from '../data/mockDb';
import { BRANCHES } from '../data/branches';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [selectedBranchId, setSelectedBranchId] = useState<string>('seebach');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [branch, setBranch] = useState('Seebach (Schaffhauserstrasse 455)');
  const [subject, setSubject] = useState('Reparatur-Anfrage');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentBranch = BRANCHES.find(b => b.id === selectedBranchId) || BRANCHES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim()) {
      setFormError('Bitte geben Sie Ihren vollständigen Namen ein.');
      return;
    }
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setFormError('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return;
    }
    if (!message.trim() || message.trim().length < 5) {
      setFormError('Bitte verfassen Sie eine kurze Nachricht mit Ihrem Anliegen.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      mockDb.addEnquiry({
        type: 'general',
        customerName: name,
        email,
        phone: phone || 'Nicht angegeben',
        branch,
        details: { subject },
        message
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 450);
  };

  return (
    <div style={{ backgroundColor: '#F4F4F4', paddingBottom: '6rem' }}>
      {/* Hero (Raphus Style) */}
      <div 
        className="bg-gradient-shaph bg-white border-b border-[#E8E8E8]"
        style={{
          paddingTop: 'clamp(7.5rem, 12vh, 9.25rem)',
          paddingBottom: '3.5rem'
        }}
      >
        <div className="container" style={{ maxWidth: '850px', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <span className="badge bg-secondary-subtle mb-3">Wir sind für Sie da</span>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            color: '#1B1D1E',
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            marginBottom: '1.25rem',
            lineHeight: 1.15,
            letterSpacing: '-0.02em'
          }}>
            Kontakt &amp; <em className="font-instrument text-[#4928FD]">Kundenservice</em>
          </h1>
          <p style={{ color: '#4B5563', fontSize: '1.2rem', lineHeight: 1.6 }}>
            Haben Sie eine Frage zu Reparaturpreisen, einem Handyabo oder möchten Sie ein Gerät reservieren? Schreiben Sie uns oder kommen Sie direkt in Zürich Seebach vorbei.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '4rem', maxWidth: '1100px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '2.5rem',
          alignItems: 'flex-start'
        }}>
          {/* Contact Details & Channels */}
          <div>
            <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', marginBottom: '0.75rem', color: '#101318' }}>
              Direkter Draht zu unseren Filialen
            </h2>
            <p style={{ color: '#64748B', fontSize: '0.925rem', marginBottom: '1.25rem' }}>
              Wählen Sie Ihren Wunschstandort im Kanton Zürich für die direkten Kontaktdaten:
            </p>

            {/* Branch Selector Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {BRANCHES.map(b => {
                const isSelected = selectedBranchId === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => {
                      setSelectedBranchId(b.id);
                      setBranch(`${b.name} (${b.address})`);
                    }}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '9999px',
                      fontSize: '0.8rem',
                      fontWeight: isSelected ? 700 : 500,
                      border: isSelected ? '1.5px solid #1B1D1E' : '1px solid #CBD5E1',
                      backgroundColor: isSelected ? '#1B1D1E' : '#FFFFFF',
                      color: isSelected ? '#FFFFFF' : '#1B1D1E',
                      cursor: 'pointer',
                      transition: 'all 140ms ease'
                    }}
                  >
                    {b.name.replace('Mobile World ', '')}
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #DFE3E9',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center'
              }}>
                <div style={{ backgroundColor: 'rgba(23, 76, 255, 0.1)', color: '#174CFF', padding: '0.75rem', borderRadius: '10px' }}>
                  <Phone size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>Telefon {currentBranch.name.replace('Mobile World ', '')}</div>
                  <a href={`tel:${currentBranch.phone.replace(/\s+/g, '')}`} style={{ fontSize: '1.15rem', fontWeight: 700, color: '#101318' }}>
                    {currentBranch.phone}
                  </a>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Mo–Fr: {currentBranch.openingHours.weekdays} | Sa: {currentBranch.openingHours.saturday}</div>
                </div>
              </div>

              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #DFE3E9',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center'
              }}>
                <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '0.75rem', borderRadius: '10px' }}>
                  <MessageSquare size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>WhatsApp Direktanfrage</div>
                  <a href={`https://wa.me/${currentBranch.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.15rem', fontWeight: 700, color: '#059669' }}>
                    {currentBranch.whatsapp}
                  </a>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Sofortige Antwort für Reparaturen &amp; Preisanfragen</div>
                </div>
              </div>

              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #DFE3E9',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center'
              }}>
                <div style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', color: '#6366F1', padding: '0.75rem', borderRadius: '10px' }}>
                  <Mail size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>E-Mail</div>
                  <a href={`mailto:${currentBranch.email}`} style={{ fontSize: '1.15rem', fontWeight: 700, color: '#101318' }}>
                    {currentBranch.email}
                  </a>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Rückmeldung in der Regel innerhalb von 24 Std.</div>
                </div>
              </div>
            </div>

            {/* Address Current Branch */}
            <div style={{
              backgroundColor: '#101318',
              color: '#FFFFFF',
              borderRadius: '20px',
              padding: '1.75rem'
            }}>
              <h4 style={{ color: '#FFFFFF', fontSize: '1.15rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={18} color="#7096FF" /> {currentBranch.name}
              </h4>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                {currentBranch.address}<br />
                {currentBranch.postalCode} {currentBranch.city}
              </p>
              <p style={{ color: '#64748B', fontSize: '0.8rem', lineHeight: 1.4, marginBottom: '1.25rem' }}>
                {currentBranch.transitInfo}
              </p>
              <a
                href={currentBranch.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-white btn-sm"
              >
                In Google Maps öffnen <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Contact Message Form */}
          <div 
            className="p-5 sm:p-7 md:p-10"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid #DFE3E9',
              boxShadow: '0 12px 36px rgba(16, 19, 24, 0.05)'
            }}
          >
            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem', color: '#101318' }}>
              Nachricht senden
            </h3>

            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
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
                <h4 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>Nachricht erfolgreich versendet!</h4>
                <p style={{ color: '#64748B', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Vielen Dank für Ihre Kontaktaufnahme. Unser Team in Zürich Seebach wird Ihre Nachricht schnellstmöglich prüfen und sich bei Ihnen melden.
                </p>
                <button
                  onClick={() => { setIsSubmitted(false); setMessage(''); }}
                  className="btn btn-primary"
                >
                  Weitere Nachricht verfassen
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
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
                  <label className="form-label">Vor- und Nachname *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ihr Name"
                    className="form-control"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                    <label className="form-label">Telefonnummer</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+41 79 123 45 67"
                      className="form-control"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Filiale</label>
                    <select value={branch} onChange={(e) => setBranch(e.target.value)} className="form-control">
                      <option value="Seebach (Schaffhauserstrasse 455)">Zürich Seebach</option>
                      <option value="Bellevue-Stadelhofen">Bellevue-Stadelhofen</option>
                      <option value="Rüti ZH">Rüti ZH</option>
                      <option value="Oberengstringen">Oberengstringen</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Thema</label>
                    <select value={subject} onChange={(e) => setSubject(e.target.value)} className="form-control">
                      <option value="Reparatur-Anfrage">Reparatur-Anfrage</option>
                      <option value="Handyabo-Beratung">Handyabo-Beratung</option>
                      <option value="Handy-Verkauf (Trade-In)">Handy-Verkauf (Trade-In)</option>
                      <option value="Geräte-Support">Geräte-Support / Setup</option>
                      <option value="Allgemeine Frage">Allgemeine Frage</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Ihre Nachricht *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Wie können wir Ihnen weiterhelfen?"
                    className="form-control"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-raphus-slide btn-raphus-slide-filled w-full"
                  style={{ minHeight: '52px', marginTop: '0.5rem' }}
                >
                  <span className="btn-slide-badge"><Send size={15} className="btn-slide-icon" /></span>
                  <span className="btn-slide-text">
                    {isSubmitting ? 'Wird übermittelt...' : 'Nachricht jetzt absenden'}
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
