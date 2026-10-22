import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';
import { BRANCHES } from '../data/branches';

interface LocationsPageProps {
  onNavigate: (path: string) => void;
}

export const LocationsPage: React.FC<LocationsPageProps> = ({ onNavigate }) => {
  return (
    <div style={{ backgroundColor: '#F5F6F8', paddingBottom: '6rem' }}>
      <div style={{ backgroundColor: '#101318', color: '#FFFFFF', padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '850px', textAlign: 'center' }}>
          <span className="section-eyebrow" style={{ color: '#7096FF' }}>Filialnetz im Kanton Zürich</span>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            color: '#FFFFFF',
            fontFamily: 'var(--font-heading)',
            marginBottom: '1.25rem',
            lineHeight: 1.15
          }}>
            Unsere Standorte &amp; Filialen
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '1.2rem', lineHeight: 1.6 }}>
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
                border: b.isHeadquarters ? '2px solid #174CFF' : '1px solid #DFE3E9',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                boxShadow: '0 12px 36px rgba(16, 19, 24, 0.05)'
              }}
            >
              {/* Branch Image */}
              <div style={{ minHeight: '300px', position: 'relative' }}>
                <img
                  src={b.imageUrl}
                  alt={b.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {b.isHeadquarters && (
                  <span className="badge badge-blue" style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    backgroundColor: '#174CFF',
                    color: '#FFFFFF'
                  }}>
                    Hauptwerkstatt &amp; Store
                  </span>
                )}
              </div>

              {/* Branch Info */}
              <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.65rem', fontFamily: 'var(--font-heading)', marginBottom: '0.75rem', color: '#101318' }}>
                    {b.name}
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.925rem', marginBottom: '1.5rem', color: '#475569' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <MapPin size={18} color="#174CFF" />
                      <span>{b.address}, {b.postalCode} {b.city}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                      <Clock size={18} color="#174CFF" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <div>Mo–Fr: {b.openingHours.weekdays}</div>
                        <div>Sa: {b.openingHours.saturday}</div>
                        <div>So: {b.openingHours.sunday}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <Phone size={18} color="#174CFF" />
                      <a href={`tel:${b.phone.replace(/\s+/g, '')}`} style={{ color: '#174CFF', fontWeight: 600 }}>
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

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <a
                    href={b.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <MapPin size={16} /> Route in Google Maps <ExternalLink size={14} />
                  </a>

                  {b.isHeadquarters ? (
                    <button
                      onClick={() => onNavigate('/locations/seebach')}
                      className="btn btn-secondary"
                    >
                      Filial-Profil Seebach <ArrowRight size={15} />
                    </button>
                  ) : (
                    <button
                      onClick={() => onNavigate('/repair-prices')}
                      className="btn btn-secondary"
                    >
                      Reparatur anfragen
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
