import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, ExternalLink, ShieldCheck, Wrench, Radio, Bus, Car } from 'lucide-react';
import { BRANCHES } from '../data/branches';

interface SeebachLocationPageProps {
  onNavigate: (path: string) => void;
}

export const SeebachLocationPage: React.FC<SeebachLocationPageProps> = ({ onNavigate }) => {
  const seebach = BRANCHES[0];

  return (
    <div style={{ backgroundColor: '#F5F6F8', paddingBottom: '6rem' }}>
      {/* Hero */}
      <div style={{ backgroundColor: '#101318', color: '#FFFFFF', padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '850px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: 'rgba(23, 76, 255, 0.2)',
            color: '#7096FF',
            padding: '0.35rem 0.85rem',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 700,
            marginBottom: '1rem'
          }}>
            <MapPin size={14} /> HAUPTSITZ &amp; ZENTRALE WERKSTATT
          </div>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            color: '#FFFFFF',
            fontFamily: 'var(--font-heading)',
            marginBottom: '1.25rem',
            lineHeight: 1.15
          }}>
            Mobile World ZH Seebach
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '1.2rem', lineHeight: 1.6 }}>
            Schaffhauserstrasse 455, 8052 Zürich • Telefon: +41 44 543 63 33 • WhatsApp: +41 78 344 88 88
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '4rem', maxWidth: '1100px' }}>
        {/* Photos Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #DFE3E9', height: '240px' }}>
            <img
              src="/assets/modern-mobile-world-storefront-at-dusk.png"
              alt="Aussenansicht Mobile World Seebach Schaffhauserstrasse 455"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #DFE3E9', height: '240px' }}>
            <img
              src="/assets/modern-mobile-world-store-interior.png"
              alt="Innenansicht Store Mobile World Zürich"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #DFE3E9', height: '240px' }}>
            <img
              src="/assets/phone-consultation-at-mobile-shop.png"
              alt="Kundenberatung am Schalter"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Location & Opening Hours Card */}
        <div
          className="p-5 sm:p-7 md:p-10"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #DFE3E9',
            boxShadow: '0 12px 36px rgba(16, 19, 24, 0.05)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem'
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', marginBottom: '1.25rem' }}>
              Kontakt &amp; Öffnungszeiten
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem', color: '#475569', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <MapPin size={20} color="#174CFF" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Adresse:</strong><br />
                  Mobile World GmbH<br />
                  Schaffhauserstrasse 455<br />
                  CH-8052 Zürich (Seebach)
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Clock size={20} color="#174CFF" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Öffnungszeiten:</strong><br />
                  Montag – Freitag: 09:00 – 12:00 Uhr | 13:00 – 19:00 Uhr<br />
                  Samstag: 10:00 – 18:00 Uhr<br />
                  Sonntag &amp; allg. Feiertage: Geschlossen
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Phone size={20} color="#174CFF" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Telefon Werkstatt:</strong><br />
                  <a href="tel:+41445436333" style={{ color: '#174CFF', fontWeight: 600 }}>+41 44 543 63 33</a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <MessageSquare size={20} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>WhatsApp Direkt-Support:</strong><br />
                  <a href="https://wa.me/41783448888" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', fontWeight: 600 }}>+41 78 344 88 88</a>
                </div>
              </div>
            </div>

            <a
              href={seebach.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <MapPin size={16} /> Route via Google Maps planen <ExternalLink size={14} />
            </a>
          </div>

          <div>
            <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', marginBottom: '1.25rem' }}>
              Anreise &amp; Parkmöglichkeiten
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: 'rgba(23, 76, 255, 0.1)', color: '#174CFF', padding: '0.65rem', borderRadius: '10px' }}>
                  <Bus size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', color: '#101318', marginBottom: '0.25rem' }}>Mit dem Öffentlichen Verkehr</h4>
                  <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.5 }}>
                    <strong>Tram 14:</strong> Haltestelle <em>Seebacherplatz</em> (nur 1 Gehminute entfernt).<br />
                    <strong>Bus 768:</strong> Haltestelle direkt an der Schaffhauserstrasse.<br />
                    <strong>S-Bahn:</strong> Bahnhof Zürich Seebach (S6) ca. 5 Gehminuten entfernt.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '0.65rem', borderRadius: '10px' }}>
                  <Car size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', color: '#101318', marginBottom: '0.25rem' }}>Mit dem Auto</h4>
                  <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.5 }}>
                    Kurzzeit-Kundenparkplätze direkt vor dem Geschäft vorhanden. Zusätzliche Parkmöglichkeiten in der Blauen Zone an den umliegenden Seitenstrassen.
                  </p>
                </div>
              </div>

              <div style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '12px',
                padding: '1.25rem',
                border: '1px solid #E2E6EC',
                fontSize: '0.85rem',
                color: '#475569'
              }}>
                <strong>Besonderheiten am Standort Seebach:</strong><br />
                • Voll ausgestattete Express-Reparaturwerkstatt mit Laser-Demontage für iPhone Backcover<br />
                • Bity Krypto-Geldautomat für Bitcoin &amp; Ethereum direkt im Store<br />
                • DHL Service Point
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
