import React from 'react';
import { 
  Wrench, 
  RefreshCw, 
  ShieldCheck, 
  Laptop, 
  ArrowRight, 
  Building2, 
  PhoneCall, 
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const services = [
    {
      icon: Wrench,
      title: 'Reparaturen (Smartphones & Tablets)',
      path: '/repairs',
      badge: '30–60 Min Express',
      desc: 'Display-, Akku-, Ladebuchsen- und Wasserschadenservice für Apple, Samsung, Google, Xiaomi und Huawei. 6 Monate Schweizer Garantie auf alle verbauten Qualitäts- und OEM-Ersatzteile.'
    },
    {
      icon: RefreshCw,
      title: 'Handy An- & Verkauf (Trade-In)',
      path: '/buy-sell',
      badge: 'Sofort Bargeld',
      desc: 'Verkaufen Sie Ihr altes Smartphone oder Tablet zu tagesaktuellen Spitzenpreisen. Direkte Auszahlung vor Ort in bar oder als Gutschrift für Neugeräte und Refurbished-Modelle.'
    },
    {
      icon: ShieldCheck,
      title: 'Versicherung (MobileWorld Care)',
      path: '/services/insurance',
      badge: 'Rundum-Schutz',
      desc: 'Umfassender Geräteschutz gegen Sturz-, Display- und Flüssigkeitsschäden mit Vor-Ort Sofort-Austauschgerät während der Reparatur in Zürich Seebach.'
    },
    {
      icon: Laptop,
      title: 'Geräte-Support & Datenservice',
      path: '/services/device-support',
      badge: 'Persönliche Betreuung',
      desc: 'Unterstützung beim Einrichten neuer Smartphones, lückenlose Datenübertragung (WhatsApp, Kontakte, Fotos von iOS zu Android und umgekehrt) sowie Cloud-Backups.'
    },
    {
      icon: Building2,
      title: 'Firmen- & Vereinsangebote',
      path: '/business',
      badge: 'B2B Konditionen',
      desc: 'Spezielle Kollektivtarife für Schweizer KMU, Vereine und Schulen. Flottenwartung, priorisierter Express-Service und Sonderkonditionen auf Handyabos für Mitarbeiter.'
    }
  ];

  return (
    <div style={{ backgroundColor: '#F5F6F8', paddingBottom: '6rem' }}>
      {/* Hero */}
      <div style={{ backgroundColor: '#101318', color: '#FFFFFF', padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '850px', textAlign: 'center' }}>
          <span className="section-eyebrow" style={{ color: '#7096FF' }}>Full-Service für Mobilgeräte</span>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            color: '#FFFFFF',
            fontFamily: 'var(--font-heading)',
            marginBottom: '1.25rem',
            lineHeight: 1.15
          }}>
            Smarte Dienstleistungen für Ihr Smartphone
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '1.2rem', lineHeight: 1.6 }}>
            Von Express-Reparaturen und verlässlichem Handy-Ankauf bis zu persönlicher Datenmigration und Geräteschutz: Mobile World ist Ihr Schweizer Kompetenzzentrum in Zürich.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '4rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))',
          gap: '1.5rem'
        }}>
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <div
                key={i}
                className="card p-5 sm:p-7 md:p-8"
                style={{
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div style={{
                      backgroundColor: 'rgba(23, 76, 255, 0.1)',
                      color: '#174CFF',
                      padding: '0.75rem',
                      borderRadius: '12px'
                    }}>
                      <Icon size={24} />
                    </div>
                    <span className="badge badge-blue">
                      {svc.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-heading)', marginBottom: '0.75rem' }}>
                    {svc.title}
                  </h3>
                  <p style={{ color: '#64748B', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                    {svc.desc}
                  </p>
                </div>

                <button
                  onClick={() => onNavigate(svc.path)}
                  className="btn btn-secondary"
                  style={{ width: '100%' }}
                >
                  Mehr erfahren <ArrowRight size={15} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
