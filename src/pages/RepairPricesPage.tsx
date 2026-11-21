import React, { useState } from 'react';
import { Wrench, ShieldCheck, Clock, Sparkles, CheckCircle, Search, HelpCircle, Phone, MessageSquare } from 'lucide-react';
import { RepairPriceFinder } from '../components/repair/RepairPriceFinder';
import { RepairPriceRecord } from '../types';
import { mockDb } from '../data/mockDb';

interface RepairPricesPageProps {
  onOpenEnquiry: (repair: RepairPriceRecord) => void;
  onNavigate: (path: string) => void;
}

export const RepairPricesPage: React.FC<RepairPricesPageProps> = ({ onOpenEnquiry, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const allRepairs = mockDb.getRepairs();

  const filteredQuickList = allRepairs.filter(r => 
    searchTerm.trim() && (
      r.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.repairTask.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div style={{ backgroundColor: '#F4F4F4', paddingBottom: '6rem' }}>
      {/* Page Header (Raphus Style) */}
      <div 
        className="bg-gradient-shaph bg-white border-b border-[#E8E8E8]"
        style={{
          paddingTop: 'clamp(7.5rem, 12vh, 9.25rem)',
          paddingBottom: '3.5rem'
        }}
      >
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px', position: 'relative', zIndex: 10 }}>
          <span className="badge bg-secondary-subtle mb-3">Mobile World Werkstatt Zürich</span>
          <h1 style={{
            fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
            color: '#1B1D1E',
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            Reparaturpreise &amp; <em className="font-instrument text-[#4928FD]">Kostenrechner</em>
          </h1>
          <p style={{ color: '#4B5563', fontSize: '1.15rem', lineHeight: 1.6 }}>
            Ermitteln Sie mit wenigen Klicks die exakten Reparaturkosten für Ihr Smartphone, Tablet oder Ihre Smartwatch. Alle Preise sind verbindlich inkl. 8.1% Schweizer MwSt., Ersatzteil und Arbeitsaufwand.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2.5rem' }}>
        {/* Main Price Finder Component */}
        <RepairPriceFinder onOpenEnquiry={onOpenEnquiry} />

        {/* Quality Tiers Explanation */}
        <div style={{ marginTop: '4rem' }}>
          <div className="section-header text-center">
            <span className="section-eyebrow">Transparenz bei Ersatzteilen</span>
            <h2 className="section-title">Unsere Qualitätsstufen im Überblick</h2>
            <p className="section-subtitle">
              Bei Mobile World entscheiden Sie selbst: Wählen Sie zwischen 100% Original-Ersatzteilen oder geprüften Premium-Alternativen.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.5rem'
          }}>
            <div 
              style={{ 
                backgroundColor: '#F7F0FE', 
                borderRadius: '24px', 
                border: '1px solid #E9D7FE',
                padding: '1.5rem 1.35rem',
                boxShadow: '0 4px 18px rgba(186, 129, 238, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              className="hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              <div>
                <div style={{
                  backgroundColor: '#FFFFFF',
                  color: '#7E22CE',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                }}>
                  <Sparkles size={20} />
                </div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#7E22CE', marginBottom: '0.35rem' }}>
                  Güteklasse 1 · Original
                </div>
                <h3 style={{ fontSize: '1.18rem', fontWeight: 700, marginBottom: '0.45rem', fontFamily: 'var(--font-heading)', color: '#1B1D1E' }}>
                  OEM Original
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#4B5563', lineHeight: 1.55 }}>
                  Höchste Güteklasse. 1:1 identisch mit dem ab Werk verbauten Originalteil des Herstellers (Apple, Samsung, Google). Maximale Helligkeit, 120Hz Bildwiederholrate und perfekte TrueTone-Farbabstimmung.
                </p>
              </div>
            </div>

            <div 
              style={{ 
                backgroundColor: '#EFF6FF', 
                borderRadius: '24px', 
                border: '1px solid #BFDBFE',
                padding: '1.5rem 1.35rem',
                boxShadow: '0 4px 18px rgba(73, 40, 253, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              className="hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              <div>
                <div style={{
                  backgroundColor: '#FFFFFF',
                  color: '#1D4ED8',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                }}>
                  <ShieldCheck size={20} />
                </div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#1D4ED8', marginBottom: '0.35rem' }}>
                  Preis-Leistungssieger
                </div>
                <h3 style={{ fontSize: '1.18rem', fontWeight: 700, marginBottom: '0.45rem', fontFamily: 'var(--font-heading)', color: '#1B1D1E' }}>
                  Premium Soft OLED
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#4B5563', lineHeight: 1.55 }}>
                  Das beste Preis-Leistungs-Verhältnis. Flexibles OLED-Substrat mit satten Schwarzwerten und erstklassiger Stossresistenz. Kaum von einem Original zu unterscheiden, aber spürbar günstiger.
                </p>
              </div>
            </div>

            <div 
              style={{ 
                backgroundColor: '#FFF7ED', 
                borderRadius: '24px', 
                border: '1px solid #FED7AA',
                padding: '1.5rem 1.35rem',
                boxShadow: '0 4px 18px rgba(255, 175, 104, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              className="hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              <div>
                <div style={{
                  backgroundColor: '#FFFFFF',
                  color: '#C2410C',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                }}>
                  <Clock size={20} />
                </div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#C2410C', marginBottom: '0.35rem' }}>
                  Budget-Option
                </div>
                <h3 style={{ fontSize: '1.18rem', fontWeight: 700, marginBottom: '0.45rem', fontFamily: 'var(--font-heading)', color: '#1B1D1E' }}>
                  Incell Standard
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#4B5563', lineHeight: 1.55 }}>
                  Die budgetfreundliche Alternative auf LCD-Basis. Perfekt für ältere Geräte oder Zweithandys, bei denen eine kostengünstige Wiederinbetriebnahme im Vordergrund steht.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Not Found / Contact Help Box */}
        <div
          className="p-5 sm:p-7 md:p-10"
          style={{
            marginTop: '4rem',
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #E8E8E8',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem'
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
              Ihr Modell ist nicht im Rechner aufgeführt?
            </h3>
            <p style={{ color: '#64748B', maxWidth: '650px', fontSize: '0.95rem' }}>
              Wir reparieren auch Sony, Nokia, Xiaomi, Huawei, Motorola und viele weitere Hersteller. Senden Sie uns einfach ein Foto des Schadens oder rufen Sie uns kurz in der Werkstatt Seebach an.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href="https://wa.me/41783448888"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              style={{ borderRadius: '9999px', padding: '0.55rem 1.25rem' }}
            >
              <MessageSquare size={16} /> <span>WhatsApp Direktanfrage</span>
            </a>

            <a
              href="tel:+41445436333"
              className="btn btn-secondary"
              style={{ borderRadius: '9999px', padding: '0.55rem 1.25rem', border: '1px solid #E8E8E8' }}
            >
              <Phone size={16} /> +41 44 543 63 33
            </a>

            <button
              onClick={() => onNavigate('/contact')}
              className="btn btn-secondary"
              style={{ borderRadius: '9999px', padding: '0.55rem 1.25rem', border: '1px solid #E8E8E8' }}
            >
              Kontaktformular
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
