import React from 'react';
import { 
  Wrench, 
  Clock, 
  ShieldCheck, 
  BatteryCharging, 
  Droplets, 
  Smartphone, 
  Camera, 
  Zap, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface RepairsPageProps {
  onNavigate: (path: string) => void;
}

export const RepairsPage: React.FC<RepairsPageProps> = ({ onNavigate }) => {
  const repairCategories = [
    {
      icon: Smartphone,
      title: 'Display & Touchscreen Reparatur',
      desc: 'Glasbruch, Streifen im Bild, Ausfall des Touchscreens oder schwarzer Bildschirm. Wir tauschen die Displayeinheit schnell und passgenau mit OEM- oder Soft-OLED-Displays aus.',
      time: '30–45 Min.'
    },
    {
      icon: BatteryCharging,
      title: 'Akku / Batterie Austausch',
      desc: 'Akku entlädt sich schnell, Gerät schaltet sich bei Kälte ab oder bläht sich auf. Neuer Akku mit 100% Kapazität inklusive fachgerechter Entsorgung des Altakkus.',
      time: '20–30 Min.'
    },
    {
      icon: Zap,
      title: 'Ladeanschluss & Mikrofon',
      desc: 'Wackelkontakt beim Ladekabel, Gerät lädt gar nicht mehr oder der Gesprächspartner versteht Sie nicht. Tausch der USB-C oder Lightning Ladebuchse.',
      time: '45–60 Min.'
    },
    {
      icon: Droplets,
      title: 'Wasserschaden & Ultraschall',
      desc: 'Gerät ins Wasser gefallen? Nicht einschalten! In unserer Werkstatt Seebach reinigen wir die Platine im professionellen Ultraschallbad von Korrosion.',
      time: '2–4 Std.'
    },
    {
      icon: Camera,
      title: 'Kamera & Kameraglas',
      desc: 'Verschwommene Fotos, zerkratztes Kameraglas oder defekter Autofokus. Wir tauschen Hauptkamera, Frontkamera oder das Schutzglas der Rückseite.',
      time: '30–45 Min.'
    },
    {
      icon: Wrench,
      title: 'Rückseite / Back Cover Glas',
      desc: 'Gebrochene Glasrückseite bei neueren iPhones und Samsung-Geräten. Professionelle Laser-Demontage und Ersatz mit präziser Original-Passform.',
      time: '60–90 Min.'
    }
  ];

  return (
    <div style={{ backgroundColor: '#F5F6F8', paddingBottom: '6rem' }}>
      {/* Hero */}
      <div style={{ backgroundColor: '#101318', color: '#FFFFFF', padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '850px', textAlign: 'center' }}>
          <span className="section-eyebrow" style={{ color: '#7096FF' }}>Express Werkstatt Zürich Seebach</span>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            color: '#FFFFFF',
            fontFamily: 'var(--font-heading)',
            marginBottom: '1.25rem',
            lineHeight: 1.15
          }}>
            Professionelle Smartphone- &amp; Tablet-Reparaturen
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            Schnell, zuverlässig und mit 6 Monaten Schweizer Garantie. Die meisten Reparaturen erledigen wir innerhalb von 30 bis 60 Minuten direkt vor Ort in unserer Werkstatt an der Schaffhauserstrasse 455.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('/repair-prices')}
              className="btn btn-primary btn-lg"
            >
              <Wrench size={18} /> Zum Reparaturpreis-Rechner
            </button>
            <button
              onClick={() => onNavigate('/contact')}
              className="btn btn-outline-white btn-lg"
            >
              Werkstatt Seebach kontaktieren
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '4rem' }}>
        {/* Service Pillars Grid */}
        <div className="section-header text-center">
          <span className="section-eyebrow">Unsere Leistungen</span>
          <h2 className="section-title">Häufige Reparaturen im Detail</h2>
          <p className="section-subtitle">
            Egal ob Apple iPhone, Samsung Galaxy, Google Pixel oder Xiaomi: Wir reparieren alle gängigen Defekte nach höchsten Schweizer Standards.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '1.5rem',
          marginBottom: '5rem'
        }}>
          {repairCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div key={idx} className="card p-5 sm:p-7 md:p-8" style={{ backgroundColor: '#FFFFFF' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <div style={{
                    backgroundColor: 'rgba(23, 76, 255, 0.1)',
                    color: '#174CFF',
                    padding: '0.75rem',
                    borderRadius: '12px'
                  }}>
                    <Icon size={24} />
                  </div>
                  <span className="badge badge-blue" style={{ fontSize: '0.75rem' }}>
                    <Clock size={12} /> {cat.time}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.65rem', fontFamily: 'var(--font-heading)' }}>
                  {cat.title}
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {cat.desc}
                </p>

                <button
                  onClick={() => onNavigate('/repair-prices')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#174CFF',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  Preis für Ihr Modell nachschlagen <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>

        {/* 4-Step Process Section */}
        <div 
          className="p-6 sm:p-8 md:p-12"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #DFE3E9',
            boxShadow: '0 16px 40px rgba(16, 19, 24, 0.06)'
          }}
        >
          <div className="section-header text-center">
            <span className="section-eyebrow">Einfach &amp; Transparent</span>
            <h2 className="section-title">In 4 Schritten zum reparierten Gerät</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: '2rem',
            position: 'relative'
          }}>
            {[
              {
                num: '01',
                title: 'Preis online prüfen',
                desc: 'Nutzen Sie unseren Reparatur-Rechner für einen verbindlichen Preis in CHF.'
              },
              {
                num: '02',
                title: 'Gerät vorbeibringen',
                desc: 'Kommen Sie ohne Termin in Zürich Seebach (Schaffhauserstrasse 455) vorbei.'
              },
              {
                num: '03',
                title: 'Express Reparatur',
                desc: 'Unsere Techniker reparieren Ihr Gerät in 30–60 Min. Sie können kurz warten.'
              },
              {
                num: '04',
                title: 'Geprüft & mit Garantie',
                desc: 'Nach Funktions-Endkontrolle erhalten Sie Ihr Gerät mit 6 Monaten Garantie zurück.'
              }
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-heading)',
                  color: '#174CFF',
                  marginBottom: '0.75rem',
                  lineHeight: 1
                }}>
                  {step.num}
                </div>
                <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: '#101318' }}>
                  {step.title}
                </h4>
                <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
