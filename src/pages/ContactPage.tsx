import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Send,
  ExternalLink 
} from 'lucide-react';
import { mockDb } from '../data/mockDb';
import { BRANCHES } from '../data/branches';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [branch, setBranch] = useState('Seebach (Schaffhauserstrasse 455)');
  const [subject, setSubject] = useState('Reparatur-Anfrage');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const seebach = BRANCHES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Bitte füllen Sie Name, E-Mail und Nachricht aus.');
      return;
    }

    mockDb.addEnquiry({
      type: 'general',
      customerName: name,
      email,
      phone: phone || 'Nicht angegeben',
      branch,
      details: { subject },
      message
    });

    setIsSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: '#F5F6F8', paddingBottom: '6rem' }}>
      {/* Hero */}
      <div style={{ backgroundColor: '#101318', color: '#FFFFFF', padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '850px', textAlign: 'center' }}>
          <span className="section-eyebrow" style={{ color: '#7096FF' }}>Wir sind für Sie da</span>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            color: '#FFFFFF',
            fontFamily: 'var(--font-heading)',
            marginBottom: '1.25rem',
            lineHeight: 1.15
          }}>
            Kontakt &amp; Kundenservice
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '1.2rem', lineHeight: 1.6 }}>
            Haben Sie eine Frage zu Reparaturpreisen, einem Handyabo oder möchten Sie ein Gerät reservieren? Schreiben Sie uns oder kommen Sie direkt in Zürich Seebach vorbei.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '4rem', maxWidth: '1100px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'flex-start'
        }}>
          {/* Contact Details & Channels */}
          <div>
            <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem', color: '#101318' }}>
              Direkter Draht zur Werkstatt
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #DFE3E9',
                padding: '1.5rem',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center'
              }}>
                <div style={{ backgroundColor: 'rgba(23, 76, 255, 0.1)', color: '#174CFF', padding: '0.75rem', borderRadius: '10px' }}>
                  <Phone size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase' }}>Telefon Seebach</div>
                  <a href="tel:+41445436333" style={{ fontSize: '1.15rem', fontWeight: 700, color: '#101318' }}>
                    +41 44 543 63 33
                  </a>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Mo–Fr 09:00–19:00 | Sa 10:00–18:00</div>
                </div>
              </div>

              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #DFE3E9',
                padding: '1.5rem',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center'
              }}>
                <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '0.75rem', borderRadius: '10px' }}>
                  <MessageSquare size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase' }}>WhatsApp Chat</div>
                  <a href="https://wa.me/41783448888" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.15rem', fontWeight: 700, color: '#059669' }}>
                    +41 78 344 88 88
                  </a>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Schnelle Antwort auch ausserhalb der Stosszeiten</div>
                </div>
              </div>

              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #DFE3E9',
                padding: '1.5rem',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center'
              }}>
                <div style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', color: '#6366F1', padding: '0.75rem', borderRadius: '10px' }}>
                  <Mail size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase' }}>E-Mail</div>
                  <a href="mailto:info@mobileworldzh.ch" style={{ fontSize: '1.15rem', fontWeight: 700, color: '#101318' }}>
                    info@mobileworldzh.ch
                  </a>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Antwort in der Regel innerhalb von 24 Std.</div>
                </div>
              </div>
            </div>

            {/* Address Seebach */}
            <div style={{
              backgroundColor: '#101318',
              color: '#FFFFFF',
              borderRadius: '20px',
              padding: '2rem'
            }}>
              <h4 style={{ color: '#FFFFFF', fontSize: '1.15rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={18} color="#7096FF" /> Hauptfiliale Seebach
              </h4>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Schaffhauserstrasse 455<br />
                CH-8052 Zürich<br />
                (Direkt an der Tramhaltestelle Seebacherplatz, Tram 14 &amp; Bus 768)
              </p>
              <a
                href={seebach.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-white btn-sm"
              >
                In Google Maps öffnen <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Contact Message Form */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #DFE3E9',
            padding: '2.5rem',
            boxShadow: '0 12px 36px rgba(16, 19, 24, 0.05)'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem', color: '#101318' }}>
              Nachricht senden
            </h3>

            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <CheckCircle size={48} color="#10B981" style={{ margin: '0 auto 1rem' }} />
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

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '0.5rem' }}>
                  <Send size={16} /> Nachricht jetzt absenden
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
