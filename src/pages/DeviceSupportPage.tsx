import React from 'react';
import { Laptop, Database, KeyRound, Cloud, ArrowRight, Phone, MessageSquare, CheckCircle } from 'lucide-react';

interface DeviceSupportPageProps {
  onNavigate: (path: string) => void;
}

export const DeviceSupportPage: React.FC<DeviceSupportPageProps> = ({ onNavigate }) => {
  const supportItems = [
    {
      icon: Database,
      title: 'Vollständige Datenübertragung (1:1 Migration)',
      desc: 'Sie haben ein neues Smartphone gekauft? Wir übertragen Ihre Kontakte, WhatsApp-Chats, Fotos, Dokumente und Einstellungen sicher vom Alt- auf das Neugerät – auch plattformübergreifend von Android zu iPhone oder umgekehrt.'
    },
    {
      icon: Cloud,
      title: 'Cloud-Setup & Backup-Strategie',
      desc: 'Einrichtung von Apple iCloud, Google Fotos, Microsoft OneDrive oder Samsung Cloud. Wir sorgen dafür, dass Ihre Erinnerungen und wichtigen Daten automatisch und sicher gesichert sind.'
    },
    {
      icon: KeyRound,
      title: 'Geräte-Entsperrung & Wiederherstellung',
      desc: 'Gerät gesperrt oder PIN vergessen? Bei nachgewiesenem Eigentum unterstützen wir Sie bei der fachgerechten Software-Wiederherstellung und Entsperrung von Mobilgeräten.'
    },
    {
      icon: Laptop,
      title: 'E-Mail & App-Konfiguration',
      desc: 'Einrichtung geschäftlicher oder privater Mail-Konten (Exchange, Bluewin, Gmail), Banking-Apps (TWINT, UBS, PostFinance) und Sicherheitssoftware direkt im Laden vor Ort.'
    }
  ];

  return (
    <div style={{ backgroundColor: '#F5F6F8', paddingBottom: '6rem' }}>
      <div style={{ backgroundColor: '#101318', color: '#FFFFFF', padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '850px', textAlign: 'center' }}>
          <span className="section-eyebrow" style={{ color: '#7096FF' }}>Persönliche Benutzerdienstleistungen</span>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            color: '#FFFFFF',
            fontFamily: 'var(--font-heading)',
            marginBottom: '1.25rem',
            lineHeight: 1.15
          }}>
            Geräte-Setup, Datenmigration &amp; Support
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '1.2rem', lineHeight: 1.6 }}>
            Technik soll das Leben einfacher machen, nicht komplizierter. Unser Serviceteam in Zürich Seebach hilft Ihnen bei allen Fragen rund um Ihr Mobilgerät – persönlich, geduldig und diskret.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '4rem', maxWidth: '1000px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '1.75rem',
          marginBottom: '4rem'
        }}>
          {supportItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="card p-5 sm:p-7 md:p-8" style={{ backgroundColor: '#FFFFFF' }}>
                <div style={{
                  backgroundColor: 'rgba(23, 76, 255, 0.1)',
                  color: '#174CFF',
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}>
                  <Icon size={24} />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.65rem', fontFamily: 'var(--font-heading)' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.925rem', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Pricing notice */}
        <div
          className="p-5 sm:p-7 md:p-10"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #DFE3E9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem'
          }}
        >
          <div>
            <span className="badge badge-success" style={{ marginBottom: '0.5rem' }}>Faire Festpreise</span>
            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', margin: '0.25rem 0' }}>
              Datenübertragung ab CHF 39.–
            </h3>
            <p style={{ color: '#64748B', maxWidth: '550px', fontSize: '0.9rem' }}>
              Beim Kauf eines Neugeräts oder Abschluss eines Mobilfunkabos in unserer Filiale ist die grundlegende Ersteinrichtung für Sie kostenlos inbegriffen!
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/41783448888?text=Hallo%20Mobile%20World,%20ich%20benötige%20Unterstützung%20bei%20einer%20Datenübertragung."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <MessageSquare size={16} /> WhatsApp Termin
            </a>
            <button
              onClick={() => onNavigate('/contact')}
              className="btn btn-secondary"
            >
              Filiale Seebach anfragen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
