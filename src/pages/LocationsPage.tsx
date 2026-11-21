import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';
import { BRANCHES } from '../data/branches';

interface LocationsPageProps {
  onNavigate: (path: string) => void;
}

export const LocationsPage: React.FC<LocationsPageProps> = ({ onNavigate }) => {
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
          <span className="badge bg-secondary-subtle mb-3">Filialnetz im Kanton Zürich</span>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            color: '#1B1D1E',
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            marginBottom: '1.25rem',
            lineHeight: 1.15,
            letterSpacing: '-0.02em'
          }}>
            Unsere Standorte &amp; <em className="font-instrument text-[#4928FD]">Filialen</em>
          </h1>
          <p style={{ color: '#4B5563', fontSize: '1.2rem', lineHeight: 1.6 }}>
            Sie finden Mobile World an 4 Standorten in Zürich: Seebach (Hauptwerkstatt), Bellevue-Stadelhofen, Rüti ZH und Oberengstringen.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '4rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {BRANCHES.map((b) => (
            <div
              key={b.id}
              className="card"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                border: b.isHeadquarters ? '2px solid #4928FD' : '1px solid #E8E8E8',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                boxShadow: '0 12px 36px rgba(16, 19, 24, 0.05)'
              }}
            >
              {/* Branch Image */}
              <div style={{ minHeight: '260px', position: 'relative' }}>
                <img
                  src={b.imageUrl}
                  alt={b.name}
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {b.isHeadquarters && (
                  <span className="badge badge-purple" style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    backgroundColor: '#4928FD',
                    color: '#FFFFFF'
                  }}>
                    Hauptwerkstatt &amp; Store
                  </span>
                )}
              </div>

              {/* Branch Info */}
              <div
                className="p-5 sm:p-7 md:p-10"
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <h3 style={{ fontSize: '1.65rem', fontFamily: 'var(--font-heading)', marginBottom: '0.75rem', color: '#101318' }}>
                    {b.name}
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.925rem', marginBottom: '1.5rem', color: '#475569' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <MapPin size={18} color="#4928FD" />
                      <span>{b.address}, {b.postalCode} {b.city}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                      <Clock size={18} color="#4928FD" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <div>Mo–Fr: <strong>{b.openingHours.weekdays}</strong></div>
                        <div>Sa: <strong>{b.openingHours.saturday}</strong></div>
                        <div>So: {b.openingHours.sunday}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <Phone size={18} color="#4928FD" />
                      <a href={`tel:${b.phone.replace(/\s+/g, '')}`} style={{ color: '#4928FD', fontWeight: 600 }}>
                        {b.phone}
                      </a>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <MessageSquare size={18} color="#10B981" />
                      <a href={`https://wa.me/${b.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ color: '#059669', fontWeight: 600 }}>
                        {b.whatsapp} (WhatsApp)
                      </a>
                    </div>
                  </div>

                  <div style={{
                    backgroundColor: '#F8FAFC',
                    borderRadius: '12px',
                    padding: '1rem',
                    marginBottom: '1.75rem'
                  }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                      Filial-Leistungen:
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.85rem', color: '#334155' }}>
                      {b.features.map((f, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <ShieldCheck size={14} color="#10B981" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <a
                    href={b.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-raphus-slide btn-raphus-slide-filled"
                    style={{ minHeight: '46px', fontSize: '0.875rem' }}
                  >
                    <span className="btn-slide-badge"><MapPin size={14} className="btn-slide-icon" /></span>
                    <span className="btn-slide-text">Route in Google Maps</span>
                  </a>

                  {b.isHeadquarters ? (
                    <button
                      onClick={() => onNavigate('/locations/seebach')}
                      className="btn-raphus-slide btn-raphus-slide-dark"
                      style={{ minHeight: '46px', fontSize: '0.875rem' }}
                    >
                      <span className="btn-slide-badge"><ArrowRight size={14} className="btn-slide-icon" /></span>
                      <span className="btn-slide-text">Filial-Profil Seebach</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onNavigate('/repair-prices')}
                      className="btn-raphus-slide btn-raphus-slide-dark"
                      style={{ minHeight: '46px', fontSize: '0.875rem' }}
                    >
                      <span className="btn-slide-badge"><ArrowRight size={14} className="btn-slide-icon" /></span>
                      <span className="btn-slide-text">Reparatur anfragen</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
