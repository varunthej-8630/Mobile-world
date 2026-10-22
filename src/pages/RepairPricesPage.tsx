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
    <div style={{ backgroundColor: '#F5F6F8', paddingBottom: '6rem' }}>
      {/* Page Header */}
      <div style={{ backgroundColor: '#101318', color: '#FFFFFF', padding: '4.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="section-eyebrow" style={{ color: '#7096FF' }}>Mobile World Werkstatt Zürich</span>
          <h1 style={{
            fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
            color: '#FFFFFF',
            fontFamily: 'var(--font-heading)',
            marginBottom: '1rem'
          }}>
            Reparaturpreise &amp; Rechner
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '1.15rem', lineHeight: 1.6 }}>
            Ermitteln Sie mit wenigen Klicks die exakten Reparaturkosten für Ihr Smartphone, Tablet oder Ihre Smartwatch. Alle Preise sind verbindlich inkl. 8.1% Schweizer MwSt., Ersatzteil und Arbeitsaufwand.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '-2rem' }}>
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem'
          }}>
            <div className="card" style={{ padding: '2rem', backgroundColor: '#FFFFFF' }}>
              <div style={{
                backgroundColor: 'rgba(23, 76, 255, 0.1)',
                color: '#174CFF',
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Sparkles size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>OEM Original</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6 }}>
                Höchste Güteklasse. 1:1 identisch mit dem ab Werk verbauten Originalteil des Herstellers (Apple, Samsung, Google). Maximale Helligkeit, 120Hz Bildwiederholrate und perfekte TrueTone-Farbabstimmung.
              </p>
            </div>

            <div className="card" style={{ padding: '2rem', backgroundColor: '#FFFFFF' }}>
              <div style={{
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                color: '#10B981',
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <ShieldCheck size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Premium Soft OLED</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6 }}>
                Das beste Preis-Leistungs-Verhältnis. Flexibles OLED-Substrat mit satten Schwarzwerten und erstklassiger Stossresistenz. Kaum von einem Original zu unterscheiden, aber spürbar günstiger.
              </p>
            </div>

            <div className="card" style={{ padding: '2rem', backgroundColor: '#FFFFFF' }}>
              <div style={{
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                color: '#F59E0B',
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Clock size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Incell Standard</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6 }}>
                Die budgetfreundliche Alternative auf LCD-Basis. Perfekt für ältere Geräte oder Zweithandys, bei denen eine kostengünstige Wiederinbetriebnahme im Vordergrund steht.
              </p>
            </div>
          </div>
        </div>

        {/* Not Found / Contact Help Box */}
        <div style={{
          marginTop: '4rem',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '2.5rem',
          border: '1px solid #DFE3E9',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>
              Ihr Modell ist nicht im Rechner aufgeführt?
            </h3>
            <p style={{ color: '#64748B', maxWidth: '650px', fontSize: '0.95rem' }}>
              Wir reparieren auch Sony, Nokia, Xiaomi, Huawei, Motorola und viele weitere Hersteller. Senden Sie uns einfach ein Foto des Schadens oder rufen Sie uns kurz in der Werkstatt Seebach an.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/41783448888"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <MessageSquare size={16} /> WhatsApp Direktanfrage
            </a>

            <button
              onClick={() => onNavigate('/contact')}
              className="btn btn-secondary"
            >
              Kontaktformular
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
