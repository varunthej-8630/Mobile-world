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
      emoji: '📱',
      tag: 'EXPRESS-SERVICE · 30–45 MIN.',
      title: 'Display & Touchscreen',
      desc: 'Glasbruch, Streifen im Bild, Ausfall des Touchscreens oder schwarzer Bildschirm. Schneller Tausch mit passgenauen OEM- oder Soft-OLED-Displays.',
      time: '30–45 Min.',
      bg: '#F7F0FE',
      border: '#E9D7FE',
      accent: '#7E22CE',
      hoverShadow: 'rgba(186, 129, 238, 0.15)'
    },
    {
      icon: BatteryCharging,
      emoji: '🔋',
      tag: '100% KAPAZITÄT · 20–30 MIN.',
      title: 'Akku & Batterie-Service',
      desc: 'Akku entlädt sich schnell, Gerät schaltet sich bei Kälte ab oder bläht sich auf. Neue Qualitätszellen inklusive sicherer Fach-Entsorgung.',
      time: '20–30 Min.',
      bg: '#EFF6FF',
      border: '#BFDBFE',
      accent: '#1D4ED8',
      hoverShadow: 'rgba(73, 40, 253, 0.15)'
    },
    {
      icon: Zap,
      emoji: '⚡',
      tag: 'ORIGINAL-BUCHSE · 45–60 MIN.',
      title: 'Ladeanschluss & Mikrofon',
      desc: 'Wackelkontakt beim Ladekabel, Gerät lädt gar nicht mehr oder der Gesprächspartner versteht Sie nicht. Tausch der USB-C oder Lightning Buchse.',
      time: '45–60 Min.',
      bg: '#FFF7ED',
      border: '#FED7AA',
      accent: '#C2410C',
      hoverShadow: 'rgba(255, 175, 104, 0.18)'
    },
    {
      icon: Droplets,
      emoji: '💧',
      tag: 'ULTRASCHALL · 2–4 STD.',
      title: 'Wasserschaden & Platine',
      desc: 'Gerät ins Wasser gefallen? Nicht einschalten! In unserer Zürcher Werkstatt reinigen wir die Platine im professionellen Ultraschallbad von Korrosion.',
      time: '2–4 Std.',
      bg: '#F0FDF4',
      border: '#BBF7D0',
      accent: '#15803D',
      hoverShadow: 'rgba(121, 212, 94, 0.18)'
    },
    {
      icon: Camera,
      emoji: '📷',
      tag: 'PRÄZISIONS-OPTIK · 30–45 MIN.',
      title: 'Kamera & Kameraglas',
      desc: 'Verschwommene Fotos, zerkratztes Schutzglas oder defekter Autofokus. Schneller Austausch von Hauptkamera, Frontkamera oder Saphir-Deckglas.',
      time: '30–45 Min.',
      bg: '#FDF2F8',
      border: '#FBCFE8',
      accent: '#BE123C',
      hoverShadow: 'rgba(244, 136, 154, 0.18)'
    },
    {
      icon: Wrench,
      emoji: '🛠️',
      tag: 'LASER-DEMONTAGE · 60–90 MIN.',
      title: 'Rückseite & Back Cover',
      desc: 'Gebrochene Glasrückseite bei iPhone oder Samsung. Präzise Laser-Demontage und Ersatz mit lückenloser Passform wie am ersten Tag.',
      time: '60–90 Min.',
      bg: '#F0F9FF',
      border: '#BAE6FD',
      accent: '#0369A1',
      hoverShadow: 'rgba(125, 211, 252, 0.18)'
    }
  ];

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
          <span className="badge bg-secondary-subtle mb-3">Express Werkstatt Zürich Seebach</span>
          <h1 style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.25rem)',
            color: '#1B1D1E',
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            marginBottom: '1rem',
            lineHeight: 1.15,
            letterSpacing: '-0.02em'
          }}>
            Professionelle Smartphone- &amp; <em className="font-instrument text-[#4928FD]">Tablet-Reparaturen</em>
          </h1>
          <p style={{ color: '#4B5563', fontSize: '1.15rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            Schnell, zuverlässig und mit 6 Monaten Schweizer Garantie. Die meisten Reparaturen erledigen wir innerhalb von 30 bis 60 Minuten direkt vor Ort in unserer Werkstatt an der Schaffhauserstrasse 455.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('/repair-prices')}
              className="btn-raphus-slide btn-raphus-slide-primary"
            >
              <span className="btn-slide-badge">
                <ArrowRight size={16} className="btn-slide-icon" />
              </span>
              <span className="btn-slide-text">Zum Reparaturpreis-Rechner</span>
            </button>
            <button
              onClick={() => onNavigate('/contact')}
              className="btn-raphus-slide btn-raphus-slide-dark"
            >
              <span className="btn-slide-badge">
                <ArrowRight size={16} className="btn-slide-icon" />
              </span>
              <span className="btn-slide-text">Werkstatt Seebach kontaktieren</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '3.5rem', maxWidth: '1280px' }}>
        {/* Service Pillars Grid */}
        <div className="section-header text-center" style={{ marginBottom: '2.5rem' }}>
          <span className="section-eyebrow">Unsere Leistungen</span>
          <h2 className="section-title">Häufige Reparaturen im Detail</h2>
          <p className="section-subtitle" style={{ maxWidth: '640px', margin: '0.5rem auto 0' }}>
            Egal ob Apple iPhone, Samsung Galaxy, Google Pixel oder Xiaomi: Wir reparieren alle gängigen Defekte nach höchsten Schweizer Standards.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginBottom: '5rem'
        }}>
          {repairCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div 
                key={idx} 
                onClick={() => onNavigate('/repair-prices')}
                style={{ 
                  backgroundColor: cat.bg,
                  borderRadius: '24px',
                  border: `1px solid ${cat.border}`,
                  padding: '1.35rem 1.25rem',
                  boxShadow: `0 4px 18px ${cat.hoverShadow}`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="hover:-translate-y-1 hover:shadow-lg group"
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      color: cat.accent
                    }}>
                      <Icon size={20} />
                    </div>
                    <span 
                      style={{
                        backgroundColor: '#FFFFFF',
                        color: '#1B1D1E',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        border: `1px solid ${cat.border}`,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                      }}
                    >
                      <Clock size={12} style={{ color: cat.accent }} /> {cat.time}
                    </span>
                  </div>

                  <div style={{ 
                    fontSize: '0.72rem', 
                    fontWeight: 700, 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.05em', 
                    color: cat.accent, 
                    marginBottom: '0.35rem' 
                  }}>
                    {cat.tag}
                  </div>

                  <h3 style={{ 
                    fontSize: '1.15rem', 
                    fontWeight: 700, 
                    fontFamily: 'var(--font-heading)', 
                    color: '#1B1D1E', 
                    marginBottom: '0.45rem', 
                    lineHeight: 1.25 
                  }}>
                    {cat.title}
                  </h3>
                  <p style={{ color: '#4B5563', fontSize: '0.85rem', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                    {cat.desc}
                  </p>
                </div>

                <div 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.35rem', 
                    fontSize: '0.825rem', 
                    fontWeight: 700, 
                    color: cat.accent, 
                    borderTop: `1px solid ${cat.border}`, 
                    paddingTop: '0.85rem' 
                  }} 
                  className="group-hover:translate-x-1 transition-transform"
                >
                  <span>Preis für Ihr Modell nachschlagen</span>
                  <ArrowRight size={14} />
                </div>
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
