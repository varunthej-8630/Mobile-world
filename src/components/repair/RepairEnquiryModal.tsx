import React, { useState } from 'react';
import { X, CheckCircle, Wrench, Phone, MessageSquare, MapPin } from 'lucide-react';
import { RepairPriceRecord } from '../../types';
import { mockDb } from '../../data/mockDb';

interface RepairEnquiryModalProps {
  repair: RepairPriceRecord | null;
  onClose: () => void;
}

export const RepairEnquiryModal: React.FC<RepairEnquiryModalProps> = ({ repair, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [branch, setBranch] = useState('Seebach (Schaffhauserstrasse 455)');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!repair) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert('Bitte füllen Sie Name, E-Mail und Telefonnummer aus.');
      return;
    }

    mockDb.addEnquiry({
      type: 'repair',
      customerName: name,
      email,
      phone,
      branch,
      details: {
        manufacturer: repair.manufacturer,
        model: repair.model,
        repairTask: repair.repairTask,
        priceChf: `CHF ${repair.priceChf}.-`,
        duration: repair.durationEstimate
      },
      message: message || 'Reparatur-Terminanfrage via Website Rechner'
    });

    setIsSubmitted(true);
  };

  // Lock body scroll when repair modal is open
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
        {/* Close Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              backgroundColor: 'rgba(23, 76, 255, 0.1)',
              color: '#174CFF',
              padding: '0.45rem',
              borderRadius: '8px'
            }}>
              <Wrench size={18} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>
              Reparatur anfragen
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Schliessen"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#64748B',
              padding: '0.25rem'
            }}
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
            <h4 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
              Vielen Dank für Ihre Anfrage!
            </h4>
            <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Ihre Reparaturanfrage für <strong>{repair.model} ({repair.repairTask})</strong> wurde erfolgreich an das Team von Mobile World in <strong>{branch}</strong> übermittelt.
            </p>

            <div style={{
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E6EC',
              borderRadius: '12px',
              padding: '1rem',
              fontSize: '0.85rem',
              color: '#64748B',
              marginBottom: '2rem',
              textAlign: 'left'
            }}>
              <div style={{ fontWeight: 600, color: '#1E293B', marginBottom: '0.25rem' }}>
                Vor-Ort Express-Service:
              </div>
              Sie können Ihr Gerät während der Öffnungszeiten auch ohne Voranmeldung direkt in der Filiale Seebach (Schaffhauserstrasse 455) vorbeibringen. Die Reparatur dauert in der Regel 30 bis 60 Minuten.
            </div>

            <button
              onClick={onClose}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              Fertig
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Selected Repair Summary Box */}
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
                <div style={{ fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {repair.manufacturer}
                </div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#101318' }}>
                  {repair.model}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#174CFF', fontWeight: 600 }}>
                  {repair.repairTask}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: '#101318' }}>
                  CHF {repair.priceChf}.-
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                  Dauer: {repair.durationEstimate}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Vor- und Nachname *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="z.B. Lukas Meyer"
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
                  placeholder="name@beispiel.ch"
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
                  placeholder="+41 79 123 45 67"
                  className="form-control"
                />
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label className="form-label">Bevorzugte Filiale</label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="form-control"
              >
                <option value="Seebach (Schaffhauserstrasse 455)">Zürich Seebach (Hauptwerkstatt)</option>
                <option value="Bellevue-Stadelhofen">Zürich Bellevue-Stadelhofen</option>
                <option value="Rüti ZH">Rüti ZH</option>
                <option value="Oberengstringen">Oberengstringen</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Wunschzeit / Nachricht (Optional)</label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="z.B. Komme morgen gegen 11 Uhr vorbei..."
                className="form-control"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
                Anfrage jetzt absenden
              </button>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '0.8rem',
                color: '#64748B'
              }}>
                <span>Oder direkt via:</span>
                <a
                  href={`https://wa.me/41783448888?text=Hallo%20Mobile%20World,%20ich%20möchte%20eine%20Reparatur%20anfragen:%20${encodeURIComponent(repair.model)}%20-%20${encodeURIComponent(repair.repairTask)}%20(CHF%20${repair.priceChf}.-)`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#059669', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}
                >
                  <MessageSquare size={13} /> WhatsApp
                </a>
                <span>•</span>
                <a
                  href="tel:+41445436333"
                  style={{ color: '#174CFF', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}
                >
                  <Phone size={13} /> +41 44 543 63 33
                </a>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
