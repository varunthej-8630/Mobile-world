import React from 'react';
import { 
  Wrench, 
  RefreshCw, 
  ShieldCheck, 
  Laptop, 
  ArrowRight, 
  Building2, 
  PhoneCall, 
  CheckCircle2,
  Clock,
  Sparkles,
  Phone,
  MessageSquare,
  MapPin,
  ChevronRight,
  ShieldAlert,
  Zap
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
      badge: '30–60 Min. Express',
      benefit: '6 Monate Schweizer Garantie',
      desc: 'Display-, Akku-, Ladebuchsen- und Wasserschadenservice für Apple, Samsung, Google & Xiaomi mit zertifizierten OEM-Ersatzteilen.',
      actionText: 'Reparaturpreise ansehen'
    },
    {
      icon: RefreshCw,
      title: 'Handy An- & Verkauf (Trade-In)',
      path: '/buy-sell',
      badge: 'Faire Tageskurse',
      benefit: 'Sofortige Bar-Auszahlung',
      desc: 'Bringen Sie Ihr altes iPhone oder Samsung vorbei. Direkte Barauszahlung oder Gutschrift beim Kauf eines Neu- oder Refurbished-Geräts.',
      actionText: 'Ankaufspreis berechnen'
    },
    {
      icon: ShieldCheck,
      title: 'Geräteschutz (MobileWorld Care)',
      path: '/services/insurance',
      badge: 'Rundum-Schutz',
      benefit: 'Inkl. Sofort-Ersatzgerät',
      desc: 'Umfassende Absicherung gegen Sturz-, Display- und Wasserschäden. Mit garantierter Vor-Ort Reparatur ohne lange Wartezeiten.',
      actionText: 'Schutzbrief entdecken'
    },
    {
      icon: Laptop,
      title: 'Geräte-Support & Datenservice',
      path: '/services/device-support',
      badge: 'Vor-Ort Betreuung',
      benefit: 'Lückenlose Datenmigration',
      desc: 'Einrichtung von Neugeräten, sichere Datenübertragung (WhatsApp, Kontakte, Fotos von iOS zu Android und umgekehrt) sowie Backup-Hilfe.',
      actionText: 'Support anfragen'
    },
    {
      icon: Building2,
      title: 'Firmen- & B2B-Konditionen',
      path: '/business',
      badge: 'Für Schweizer KMU',
      benefit: 'Prioritäre Flottenwartung',
      desc: 'Attraktive Firmenverträge, Sammel-Abrechnung, Express-Reparaturen für Geschäftsgeräte und mobile Rahmenverträge für Mitarbeitende.',
      actionText: 'B2B-Lösungen prüfen'
    }
  ];

  const servicePromises = [
    {
      icon: Clock,
      title: '30–60 Min. Express-Service',
      desc: 'Die meisten Display- und Akkutausche führen wir ohne Voranmeldung direkt vor Ort in unserer Zürcher Werkstatt durch.'
    },
    {
      icon: ShieldCheck,
      title: 'Schweizer Qualitätsgarantie',
      desc: 'Auf alle verbauten Ersatzteile und Reparaturen gewähren wir verlässliche 6 bis 24 Monate Schweizer Garantie.'
    },
    {
      icon: Sparkles,
      title: 'Geprüfte OEM-Qualität',
      desc: 'Wir verbauen ausschliesslich geprüfte Original- und Premium Soft-OLED-Ersatzteile für maximale Farbtreue und Langlebigkeit.'
    },
    {
      icon: PhoneCall,
      title: 'Persönlich & Nah',
      desc: 'Direkter Ansprechpartner in unserer Filiale in Zürich Seebach – keine anonyme Telefon-Warteschleife.'
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
          <span className="badge bg-secondary-subtle mb-3">Schweizer Technik-Fachhandel &amp; Werkstatt</span>
          <h1 style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.25rem)',
            color: '#1B1D1E',
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            marginBottom: '1rem',
            lineHeight: 1.15,
            letterSpacing: '-0.02em'
          }}>
            Smarte Dienstleistungen für Ihr <em className="font-instrument text-[#4928FD]">Smartphone</em>
          </h1>
          <p style={{ color: '#4B5563', fontSize: '1.15rem', lineHeight: 1.6, maxWidth: '720px', margin: '0 auto' }}>
            Von Express-Reparaturen und verlässlichem Handy-Ankauf bis zu persönlicher Datenmigration und Geräteschutz: Mobile World ist Ihr Schweizer Kompetenzzentrum in Zürich Seebach.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '3.5rem', maxWidth: '1280px' }}>
        {/* Core Services Grid — Balanced pastel containers */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginBottom: '5rem'
        }}>
          {services.map((svc, i) => {
            const Icon = svc.icon;
            const pastels = [
              { bg: '#F7F0FE', border: '#E9D7FE', accent: '#7E22CE', shadow: 'rgba(186, 129, 238, 0.12)' },
              { bg: '#EFF6FF', border: '#BFDBFE', accent: '#1D4ED8', shadow: 'rgba(73, 40, 253, 0.1)' },
              { bg: '#F0FDF4', border: '#BBF7D0', accent: '#15803D', shadow: 'rgba(121, 212, 94, 0.12)' },
              { bg: '#FFF7ED', border: '#FED7AA', accent: '#C2410C', shadow: 'rgba(255, 175, 104, 0.12)' },
              { bg: '#FDF2F8', border: '#FBCFE8', accent: '#BE123C', shadow: 'rgba(244, 136, 154, 0.12)' }
            ];
            const p = pastels[i % pastels.length];
            return (
              <div
                key={i}
                onClick={() => onNavigate(svc.path)}
                style={{
                  backgroundColor: p.bg,
                  borderRadius: '24px',
                  border: `1px solid ${p.border}`,
                  padding: '1.5rem 1.35rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: `0 4px 18px ${p.shadow}`,
                  cursor: 'pointer',
                  transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="hover:-translate-y-1 hover:shadow-lg group"
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{
                      backgroundColor: '#FFFFFF',
                      color: p.accent,
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                    }}>
                      <Icon size={20} />
                    </div>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: '#1B1D1E',
                      backgroundColor: '#FFFFFF',
                      border: `1px solid ${p.border}`,
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                    }}>
                      {svc.badge}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: p.accent, marginBottom: '0.35rem' }}>
                    {svc.benefit}
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', fontFamily: 'var(--font-heading)', color: '#1B1D1E', lineHeight: 1.25 }}>
                    {svc.title}
                  </h3>
                  <p style={{ color: '#4B5563', fontSize: '0.85rem', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                    {svc.desc}
                  </p>
                </div>

                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    color: p.accent,
                    fontWeight: 700,
                    fontSize: '0.825rem',
                    borderTop: `1px solid ${p.border}`,
                    paddingTop: '0.85rem'
                  }}
                  className="group-hover:translate-x-1 transition-transform"
                >
                  <span>{svc.actionText}</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Quality Promises Section */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #E2E8F0',
          padding: '3rem 2rem',
          boxShadow: '0 4px 16px rgba(16, 19, 24, 0.03)',
          marginBottom: '5rem'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.5rem' }}>
            <span className="section-eyebrow">Das Mobile World Qualitätsversprechen</span>
            <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', color: '#0F172A', marginTop: '0.25rem' }}>
              Warum Kunden seit Jahren auf uns vertrauen
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2rem'
          }}>
            {servicePromises.map((p, idx) => {
              const PIcon = p.icon;
              return (
                <div key={idx} style={{ textAlign: 'left' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(23, 76, 255, 0.08)',
                    color: '#174CFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <PIcon size={20} />
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.45rem' }}>
                    {p.title}
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.55 }}>
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Process Steps */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.5rem' }}>
            <span className="section-eyebrow">Einfacher Ablauf</span>
            <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', color: '#0F172A', marginTop: '0.25rem' }}>
              In 4 einfachen Schritten zur Lösung
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              { num: '01', title: 'Anliegen wählen', desc: 'Preise online berechnen oder spontan in der Filiale Seebach vorbeikommen.' },
              { num: '02', title: 'Gerät abgeben', desc: 'Direkt vor Ort einchecken oder bequem per Schweizer Post einsenden.' },
              { num: '03', title: 'Express-Reparatur', desc: 'Fachmännische Ausführung in 30 bis 60 Minuten mit zertifizierten Teilen.' },
              { num: '04', title: 'Geprüft mitnehmen', desc: 'Funktionstest vor Ihren Augen & 6 bis 24 Monate Schweizer Garantie.' }
            ].map((step, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  padding: '1.75rem',
                  position: 'relative'
                }}
              >
                <span style={{
                  fontSize: '2rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  color: 'rgba(23, 76, 255, 0.15)',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>
                  {step.num}
                </span>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.35rem' }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.5 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final Store & Consultation CTA Banner */}
        <div style={{
          backgroundColor: '#0F172A',
          borderRadius: '24px',
          color: '#FFFFFF',
          padding: '3rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(15, 23, 42, 0.15)'
        }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: '#7096FF',
            marginBottom: '0.75rem'
          }}>
            Besuchen Sie uns in Zürich Seebach
          </span>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.35rem)',
            fontFamily: 'var(--font-heading)',
            color: '#FFFFFF',
            marginBottom: '1rem'
          }}>
            Haben Sie ein spezielles Anliegen?
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1.05rem', maxWidth: '600px', marginBottom: '2rem', lineHeight: 1.6 }}>
            Unser Team berät Sie gerne persönlich an der Schaffhauserstrasse 455. Ohne Voranmeldung, unkompliziert und kompetent.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => onNavigate('/repair-prices')}
              className="btn btn-primary"
              style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px', fontSize: '0.9rem' }}
            >
              <Wrench size={16} /> Reparaturpreis prüfen
            </button>
            <a
              href="https://wa.me/41783448888"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '9999px',
                fontSize: '0.9rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                borderColor: 'rgba(255, 255, 255, 0.2)'
              }}
            >
              <MessageSquare size={16} className="text-emerald-400" /> WhatsApp Beratung
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
