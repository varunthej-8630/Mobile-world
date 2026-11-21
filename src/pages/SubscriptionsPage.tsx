import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Globe, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { mockDb } from '../data/mockDb';
import { SubscriptionPlan } from '../types';

interface SubscriptionsPageProps {
  onOpenEnquiry: (plan: SubscriptionPlan) => void;
  onNavigate: (path: string) => void;
}

export const SubscriptionsPage: React.FC<SubscriptionsPageProps> = ({ onOpenEnquiry, onNavigate }) => {
  const [filterProvider, setFilterProvider] = useState<string>('all');
  const [plans, setPlans] = useState<SubscriptionPlan[]>(() => mockDb.getSubscriptions(true));

  // Sync if mockDb updates
  useEffect(() => {
    setPlans(mockDb.getSubscriptions(true));
  }, []);

  const filteredPlans = filterProvider === 'all' 
    ? plans 
    : plans.filter(p => p.provider === filterProvider);

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
          <span className="badge bg-secondary-subtle mb-3">Unabhängige Schweizer Abo-Beratung</span>
          <h1 style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
            color: '#1B1D1E',
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            marginBottom: '1rem',
            lineHeight: 1.15,
            letterSpacing: '-0.02em'
          }}>
            Handyabos &amp; Tarife im <em className="font-instrument text-[#4928FD]">direkten Vergleich</em>
          </h1>
          <p style={{ color: '#4B5563', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            Finden Sie das perfekte Mobilfunkabo für Ihr Nutzungsverhalten. Wir sind offizieller Partner von Sunrise, Salt, yallo und LEBARA und sichern Ihnen die besten Aktionskonditionen mit kostenloser Rufnummernmitnahme.
          </p>

          {/* Provider Filter Chips (Raphus Pill Track) */}
          <div className="nav-pill-track p-1.5 justify-center flex-wrap">
            {[
              { id: 'all', label: 'Alle Anbieter' },
              { id: 'Sunrise', label: 'Sunrise' },
              { id: 'Salt', label: 'Salt' },
              { id: 'yallo', label: 'yallo' },
              { id: 'LEBARA', label: 'LEBARA' },
              { id: 'Mobile World Care', label: 'MobileWorld Care' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterProvider(tab.id)}
                className={`nav-pill-item ${filterProvider === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '3.5rem', maxWidth: '1280px' }}>
        {/* Plan Cards Grid — Balanced 3-column desktop layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.75rem',
          marginBottom: '5rem'
        }}>
          {filteredPlans.map(plan => (
            <div
              key={plan.id}
              className="card p-6 sm:p-7"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: plan.highlightBadge ? '2px solid #BA81EE' : '1px solid #E8E8E8',
                boxShadow: plan.highlightBadge ? '0 12px 32px rgba(73, 40, 253, 0.12)' : '0 4px 18px rgba(0, 0, 0, 0.03)',
                transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div>
                {plan.highlightBadge && (
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    backgroundColor: '#F1E6FC',
                    color: '#4928FD',
                    border: '1px solid #E9D7FE',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.3rem 0.75rem',
                    borderRadius: '9999px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '0.85rem'
                  }}>
                    <Sparkles size={12} />
                    <span>{plan.highlightBadge}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="badge bg-secondary-subtle" style={{ fontSize: '0.75rem' }}>
                    {plan.provider}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                    {plan.speed}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-heading)', marginBottom: '0.75rem', color: '#1B1D1E' }}>
                  {plan.name}
                </h3>

                {/* Price block */}
                <div style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.5rem',
                  marginBottom: '1.5rem',
                  borderBottom: '1px solid #F1F5F9',
                  paddingBottom: '1.25rem'
                }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#4928FD', whiteSpace: 'nowrap' }}>
                    CHF {(plan.discountPriceChf || plan.monthlyPriceChf).toFixed(2)}
                  </span>
                  <span style={{ color: '#64748B', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>/ Monat</span>
                  {plan.discountPriceChf && (
                    <span style={{ fontSize: '0.9rem', color: '#94A3B8', textDecoration: 'line-through', marginLeft: 'auto', whiteSpace: 'nowrap' }}>
                      CHF {plan.monthlyPriceChf.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Details List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem', fontSize: '0.925rem' }}>
                  <div style={{ display: 'flex', gap: '0.65rem' }}>
                    <Zap size={18} color="#4928FD" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Daten:</strong> {plan.dataAllowance}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.65rem' }}>
                    <Radio size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Anrufe:</strong> {plan.callsAndSms}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.65rem' }}>
                    <Globe size={18} color="#6366F1" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Roaming:</strong> {plan.roamingAllowance}</span>
                  </div>
                </div>

                {/* Features checklist */}
                <div style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: '14px',
                  padding: '1.1rem',
                  marginBottom: '2rem',
                  border: '1px solid #F1F5F9'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Vorteile &amp; Konditionen:
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.825rem', color: '#475569' }}>
                    {plan.features.map((feat, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <CheckCircle size={14} color="#10B981" /> {feat}
                      </li>
                    ))}
                    <li style={{ color: '#64748B' }}>Vertragslaufzeit: {plan.contractDuration}</li>
                    <li style={{ color: '#64748B' }}>Aktivierungsgebühr: CHF {plan.activationFeeChf.toFixed(2)}</li>
                  </ul>
                </div>
              </div>

              <button
                onClick={() => onOpenEnquiry(plan)}
                className="btn-raphus-slide btn-raphus-slide-primary w-full"
                style={{ minHeight: '48px', fontSize: '0.925rem' }}
              >
                <span className="btn-slide-badge"><ArrowRight size={14} className="btn-slide-icon" /></span>
                <span className="btn-slide-text">Abo unverbindlich anfragen</span>
              </button>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div 
          className="p-4 sm:p-6 md:p-10"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #DFE3E9',
            boxShadow: '0 16px 40px rgba(16, 19, 24, 0.06)',
            marginBottom: '5rem'
          }}
        >
          <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem' }}>
            Abo-Vergleichstabelle (Schweizer Markt)
          </h3>

          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E2E6EC', color: '#101318' }}>
                <th style={{ padding: '1rem' }}>Tarif</th>
                <th style={{ padding: '1rem' }}>Anbieter</th>
                <th style={{ padding: '1rem' }}>Preis / Mt.</th>
                <th style={{ padding: '1rem' }}>Highspeed Daten</th>
                <th style={{ padding: '1rem' }}>EU-Roaming</th>
                <th style={{ padding: '1rem' }}>Mindestlaufzeit</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Aktion</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{plan.name}</td>
                  <td style={{ padding: '1rem' }}>
                    <span className="badge badge-blue">{plan.provider}</span>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 700, color: '#174CFF' }}>
                    CHF {(plan.discountPriceChf || plan.monthlyPriceChf).toFixed(2)}
                  </td>
                  <td style={{ padding: '1rem' }}>{plan.dataAllowance}</td>
                  <td style={{ padding: '1rem' }}>{plan.roamingAllowance}</td>
                  <td style={{ padding: '1rem', color: '#64748B' }}>{plan.contractDuration}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button
                      onClick={() => onOpenEnquiry(plan)}
                      className="btn btn-secondary btn-sm"
                    >
                      Anfragen
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        {/* In-Store Consultation Banner */}
        <div style={{
          backgroundColor: '#101318',
          color: '#FFFFFF',
          borderRadius: '20px',
          padding: '3rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <div>
            <span className="section-eyebrow" style={{ color: '#D9FF70' }}>Vor-Ort Service in Zürich Seebach</span>
            <h3 style={{ color: '#FFFFFF', fontSize: '1.75rem', fontFamily: 'var(--font-heading)', margin: '0.5rem 0' }}>
              Wir übernehmen die Kündigung bei Ihrem alten Anbieter
            </h3>
            <p style={{ color: '#94A3B8', maxWidth: '600px', fontSize: '0.95rem' }}>
              Kein lästiger Papierkram: Kommen Sie mit Ihrer ID in die Filiale Schaffhauserstrasse 455. Wir kündigen Ihren Altvertrag termingerecht und schalten Ihre neue SIM-Karte oder eSIM direkt frei.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/contact')}
            className="btn btn-primary btn-lg"
          >
            Termin vereinbaren <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
