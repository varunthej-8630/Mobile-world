import React, { useState, useEffect, useRef } from 'react';
import {
  Wrench,
  ShoppingBag,
  Radio,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Clock,
  MapPin,
  CheckCircle,
  Phone,
  MessageSquare,
  ChevronRight,
  ExternalLink,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { RepairPriceFinder } from '../components/repair/RepairPriceFinder';
import { ProductCard } from '../components/shop/ProductCard';
import { mockDb } from '../data/mockDb';
import { BRANCHES } from '../data/branches';
import { RepairPriceRecord, SubscriptionPlan } from '../types';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenRepairEnquiry: (repair: RepairPriceRecord) => void;
  onOpenSubEnquiry: (plan: SubscriptionPlan) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenRepairEnquiry,
  onOpenSubEnquiry
}) => {
  const [videoError, setVideoError] = useState(false);
  const [activeBranchId, setActiveBranchId] = useState<string>('seebach');
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const products = mockDb.getProducts();
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const subscriptions = mockDb.getSubscriptions(true).slice(0, 3);
  const seebach = BRANCHES[0];
  const activeBranch = BRANCHES.find(b => b.id === activeBranchId) || BRANCHES[0];

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => { });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: 0, padding: 0 }}>
      {/* =========================================================================
          SECTION 1: RAPHUS-INSPIRED AMBIENT HERO (EXPANSIVE & LUXURIOUS)
          ========================================================================= */}
      <section
        className="bg-gradient-shaph relative overflow-hidden bg-white text-center"
        style={{
          minHeight: 'auto',
          padding: 'clamp(6.5rem, 11vh, 8.5rem) 1.5rem clamp(3.5rem, 6vh, 5rem)'
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 10 }}>
          {/* Top Pill Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.45rem 1.15rem',
              borderRadius: '9999px',
              backgroundColor: '#F7F0FE',
              border: '1px solid #E9D7FE',
              marginBottom: '1.75rem',
              boxShadow: '0 2px 8px rgba(186, 129, 238, 0.12)'
            }}
          >
          </div>

          {/* Signature Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.75rem, 5.5vw, 4.5rem)',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              color: '#1B1D1E',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              maxWidth: '1040px',
              margin: '0 auto 1.5rem'
            }}
          >
            Schweizer Präzision für{' '}
            <em className="font-instrument" style={{ color: '#4928FD', fontStyle: 'italic', fontWeight: 400 }}>
              Smartphones &amp; Mobilfunk
            </em>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
              color: '#4B5563',
              maxWidth: '780px',
              margin: '0 auto 2.25rem',
              lineHeight: 1.6
            }}
          >
            Express-Reparaturen in 30–60 Min. mit 6 Monaten Garantie, faire Handyabos von Sunrise, Salt, yallo &amp; LEBARA sowie qualitätsgeprüfte Neugeräte und Refurbished-Modelle ab Zürcher Lager.
          </p>

          {/* Call to Actions (Raphus Signature Primary Pill + Dedicated WhatsApp Pill as in Image 5) */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
            <button
              onClick={() => onNavigate('/repair-prices')}
              className="btn-raphus-slide btn-raphus-slide-primary"
            >
              <span className="btn-slide-badge">
                <ArrowRight size={16} className="btn-slide-icon" />
              </span>
              <span className="btn-slide-text">Reparaturpreis ermitteln</span>
            </button>
            <a
              href="https://wa.me/41783448888"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                backgroundColor: '#2E2C29',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                borderRadius: '9999px',
                padding: '0.65rem 1.45rem',
                fontSize: '0.925rem',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                transition: 'all 200ms ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1F1E1B';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 211, 102, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#2E2C29';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
              }}
            >
              <MessageSquare size={18} style={{ color: '#25D366', strokeWidth: 2.2 }} />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Social Proof Avatar Stack */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            <div style={{ display: 'flex', marginLeft: '0.5rem' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: '#BA81EE', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, border: '2px solid #FFFFFF', marginLeft: '-8px', boxShadow: '0 2px 4px rgba(0,0,0,0.06)' }}>SM</div>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: '#4928FD', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, border: '2px solid #FFFFFF', marginLeft: '-8px', boxShadow: '0 2px 4px rgba(0,0,0,0.06)' }}>LB</div>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: '#79D45E', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, border: '2px solid #FFFFFF', marginLeft: '-8px', boxShadow: '0 2px 4px rgba(0,0,0,0.06)' }}>MK</div>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: '#FFAF68', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, border: '2px solid #FFFFFF', marginLeft: '-8px', boxShadow: '0 2px 4px rgba(0,0,0,0.06)' }}>+</div>
            </div>
            <div style={{ textAlign: 'left', fontSize: '0.825rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', color: '#F59E0B', fontWeight: 700 }}>
                ★★★★★ <span style={{ marginLeft: '0.35rem', color: '#1B1D1E' }}>5.0</span>
              </div>
              <span style={{ color: '#767778' }}>Über 15'000 zufriedene Kunden in Zürich</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: 5 RAPHUS PASTEL CATEGORY CARDS (WITH GENEROUS SPACING AS IN REFERENCE)
          ========================================================================= */}
      <section style={{ backgroundColor: '#F8FAFC', padding: '2.5rem 0 3rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', width: '100%' }}>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
            style={{
              gap: '1.25rem',
              display: 'grid'
            }}
          >
            {/* 1. Display & Glas (Lavender) */}
            <div
              onClick={() => onNavigate('/repairs')}
              style={{
                backgroundColor: '#F7F0FE',
                border: '1px solid #E9D7FE',
                borderRadius: '24px',
                padding: '1.35rem 1.15rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxShadow: '0 2px 12px rgba(186, 129, 238, 0.08)',
                transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="hover:-translate-y-1 hover:shadow-lg group"
            >
              <div>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', boxShadow: '0 2px 6px rgba(0,0,0,0.05)', color: '#7E22CE' }}>
                  <Wrench size={18} />
                </div>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#7E22CE', marginBottom: '0.25rem' }}>
                  Express-Service
                </div>
                <h3 style={{ fontWeight: 700, fontFamily: 'var(--font-heading)', fontSize: '1.05rem', color: '#1B1D1E', marginBottom: '0.25rem', lineHeight: 1.25 }}>
                  Display &amp; Glas
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#4B5563', lineHeight: 1.45 }}>
                  Soforttausch in 30–60 Min. für Apple, Samsung &amp; Google.
                </p>
              </div>
              <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', fontWeight: 700, color: '#7E22CE' }} className="group-hover:translate-x-1 transition-transform">
                <span>Details ansehen</span>
                <ArrowRight size={13} />
              </div>
            </div>

            {/* 2. Akku & Buchse (Light Blue) */}
            <div
              onClick={() => onNavigate('/repairs')}
              style={{
                backgroundColor: '#EFF6FF',
                border: '1px solid #BFDBFE',
                borderRadius: '24px',
                padding: '1.35rem 1.15rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxShadow: '0 2px 12px rgba(73, 40, 253, 0.06)',
                transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="hover:-translate-y-1 hover:shadow-lg group"
            >
              <div>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', boxShadow: '0 2px 6px rgba(0,0,0,0.05)', color: '#1D4ED8' }}>
                  <Clock size={18} />
                </div>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#1D4ED8', marginBottom: '0.25rem' }}>
                  100% Kapazität
                </div>
                <h3 style={{ fontWeight: 700, fontFamily: 'var(--font-heading)', fontSize: '1.05rem', color: '#1B1D1E', marginBottom: '0.25rem', lineHeight: 1.25 }}>
                  Akku &amp; Buchse
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#4B5563', lineHeight: 1.45 }}>
                  Neue Premium-Zellen inklusive 6 Monaten Schweizer Garantie.
                </p>
              </div>
              <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', fontWeight: 700, color: '#1D4ED8' }} className="group-hover:translate-x-1 transition-transform">
                <span>Details ansehen</span>
                <ArrowRight size={13} />
              </div>
            </div>

            {/* 3. Handyabos (Warm Apricot) */}
            <div
              onClick={() => onNavigate('/subscriptions')}
              style={{
                backgroundColor: '#FFF7ED',
                border: '1px solid #FED7AA',
                borderRadius: '24px',
                padding: '1.35rem 1.15rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxShadow: '0 2px 12px rgba(255, 175, 104, 0.08)',
                transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="hover:-translate-y-1 hover:shadow-lg group"
            >
              <div>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', boxShadow: '0 2px 6px rgba(0,0,0,0.05)', color: '#C2410C' }}>
                  <Radio size={18} />
                </div>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#C2410C', marginBottom: '0.25rem' }}>
                  Unabhängig
                </div>
                <h3 style={{ fontWeight: 700, fontFamily: 'var(--font-heading)', fontSize: '1.05rem', color: '#1B1D1E', marginBottom: '0.25rem', lineHeight: 1.25 }}>
                  Handyabos
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#4B5563', lineHeight: 1.45 }}>
                  Top-Aktionen von Sunrise, Salt, yallo &amp; LEBARA im Vergleich.
                </p>
              </div>
              <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', fontWeight: 700, color: '#C2410C' }} className="group-hover:translate-x-1 transition-transform">
                <span>Vergleichen</span>
                <ArrowRight size={13} />
              </div>
            </div>

            {/* 4. Neugeräte & Refurbished (Mint Green) */}
            <div
              onClick={() => onNavigate('/shop')}
              style={{
                backgroundColor: '#F0FDF4',
                border: '1px solid #BBF7D0',
                borderRadius: '24px',
                padding: '1.35rem 1.15rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxShadow: '0 2px 12px rgba(121, 212, 94, 0.08)',
                transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="hover:-translate-y-1 hover:shadow-lg group"
            >
              <div>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', boxShadow: '0 2px 6px rgba(0,0,0,0.05)', color: '#15803D' }}>
                  <ShoppingBag size={18} />
                </div>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#15803D', marginBottom: '0.25rem' }}>
                  Ab Schweizer Lager
                </div>
                <h3 style={{ fontWeight: 700, fontFamily: 'var(--font-heading)', fontSize: '1.05rem', color: '#1B1D1E', marginBottom: '0.25rem', lineHeight: 1.25 }}>
                  Smartphones
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#4B5563', lineHeight: 1.45 }}>
                  Geprüfte Neugeräte (24M) &amp; Occasionen (12M Garantie).
                </p>
              </div>
              <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', fontWeight: 700, color: '#15803D' }} className="group-hover:translate-x-1 transition-transform">
                <span>Zum Shop</span>
                <ArrowRight size={13} />
              </div>
            </div>

            {/* 5. Filiale Seebach (Soft Rose) */}
            <div
              onClick={() => onNavigate('/locations/seebach')}
              style={{
                backgroundColor: '#FFF1F2',
                border: '1px solid #FECDD3',
                borderRadius: '24px',
                padding: '1.35rem 1.15rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxShadow: '0 2px 12px rgba(244, 136, 154, 0.08)',
                transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="hover:-translate-y-1 hover:shadow-lg group"
            >
              <div>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', boxShadow: '0 2px 6px rgba(0,0,0,0.05)', color: '#BE123C' }}>
                  <MapPin size={18} />
                </div>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#BE123C', marginBottom: '0.25rem' }}>
                  Zürich Seebach
                </div>
                <h3 style={{ fontWeight: 700, fontFamily: 'var(--font-heading)', fontSize: '1.05rem', color: '#1B1D1E', marginBottom: '0.25rem', lineHeight: 1.25 }}>
                  Filiale Seebach
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#4B5563', lineHeight: 1.45 }}>
                  Schaffhauserstrasse 455. Mo–Fr bis 19:00 Uhr geöffnet.
                </p>
              </div>
              <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', fontWeight: 700, color: '#BE123C' }} className="group-hover:translate-x-1 transition-transform">
                <span>Anfahrt &amp; Kontakt</span>
                <ArrowRight size={13} />
              </div>
            </div>
          </div>

          {/* 3-Column Metric Stats with Raphus Precision Layout */}
          <div className="metrics-bar-container">
            <div className="metric-stat-item">
              <div style={{ fontSize: 'clamp(2.75rem, 4.5vw, 3.75rem)', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#1B1D1E', letterSpacing: '-0.03em', lineHeight: 1 }}>
                +15'000
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 500, color: '#767778', marginTop: '0.65rem' }}>
                Reparierte Geräte in Zürich
              </div>
            </div>
            <div className="metric-stat-item">
              <div style={{ fontSize: 'clamp(2.75rem, 3.5vw, 3.70rem)', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#4928FD', letterSpacing: '-0.03em', lineHeight: 1 }}>
                30–60 Min.
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 500, color: '#767778', marginTop: '0.65rem' }}>
                Express-Dauer vor Ort
              </div>
            </div>
            <div className="metric-stat-item">
              <div style={{ fontSize: 'clamp(2.75rem, 4.5vw, 3.75rem)', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#1B1D1E', letterSpacing: '-0.03em', lineHeight: 1 }}>
                99.4%
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 500, color: '#767778', marginTop: '0.65rem' }}>
                Verifizierte Kundenzufriedenheit
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: BESPOKE ASYMMETRICAL SERVICE NAVIGATION (COMPACT & BALANCED)
          ========================================================================= */}
      <section style={{ backgroundColor: '#F8FAFC', padding: '2.75rem 0 3.5rem', margin: 0, position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
            marginBottom: '2rem',
            maxWidth: '680px'
          }}>
            <span className="section-eyebrow">Persönlicher Service &amp; Fachhandel</span>
            <h2 className="section-title" style={{ marginBottom: '0.35rem', fontSize: 'clamp(1.75rem, 3.2vw, 2.4rem)' }}>
              Vier Wege zu Ihrer Lösung.
            </h2>
            <p style={{ color: '#64748B', fontSize: '0.95rem', lineHeight: 1.5 }}>
              Ob sofortiger Displaytausch, unabhängige Tarifberatung oder der Kauf eines neuen Geräts — wählen Sie Ihren direkten Einstieg.
            </p>
          </div>

          {/* Asymmetrical Layout: Large Featured Repair Showcase (Left) + 3 Curated Tiles (Right) */}
          <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch"
          >
            {/* DESTINATION 1: Phone Repairs (Dominant Featured Panel ~ 7 Columns on Desktop) */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid #E8E8E8',
                boxShadow: '0 4px 18px rgba(0, 0, 0, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="col-span-12 lg:col-span-7 p-5 sm:p-6 md:p-7 stagger-item stagger-1"
            >
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.85rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    backgroundColor: 'rgba(73, 40, 253, 0.08)',
                    color: '#4928FD',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em'
                  }}>
                    <Wrench size={13} /> EXPRESS-WERKSTATT · 30–60 MIN.
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 600 }}>
                    ✓ 6 Monate Schweizer Garantie
                  </span>
                </div>

                <h3 style={{
                  fontSize: 'clamp(1.35rem, 2.2vw, 1.75rem)',
                  fontFamily: 'var(--font-heading)',
                  color: '#1B1D1E',
                  fontWeight: 800,
                  marginBottom: '0.65rem',
                  lineHeight: 1.2
                }}>
                  Express-Reparaturen mit Schweizer Präzision.
                </h3>

                <p style={{
                  color: '#4B5563',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  marginBottom: '1.15rem'
                }}>
                  Displaywechsel, Akkutausch oder Ladebuchsen-Service für Apple, Samsung, Google &amp; Xiaomi. Ohne Voranmeldung direkt vor Ort in unserer Zürcher Werkstatt.
                </p>

                {/* Real Workshop Photo Crop */}
                <div
                  onClick={() => onNavigate('/repair-prices')}
                  style={{
                    position: 'relative',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    marginBottom: '1.25rem',
                    maxHeight: '175px',
                    cursor: 'pointer'
                  }}
                  className="img-zoom-container"
                >
                  <img
                    src="/assets/precision-smartphone-repair-bench.png"
                    alt="Mobile World Werkstatt Zürich Seebach"
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '100%',
                      height: '175px',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(27, 29, 30, 0.75) 0%, transparent 60%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '0.75rem 1rem'
                  }}>
                    <span style={{ color: '#FFFFFF', fontSize: '0.8rem', fontWeight: 600 }}>
                      Original- &amp; OEM-Ersatzteile direkt an Lager in Zürich
                    </span>
                  </div>
                </div>

                {/* Quick Model Shortcuts */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.74rem', color: '#767778', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, display: 'block', marginBottom: '0.45rem' }}>
                    Beliebte Modelle direkt prüfen:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {['iPhone 16 Pro', 'iPhone 15', 'Galaxy S24', 'Pixel 9'].map((mod) => (
                      <button
                        key={mod}
                        onClick={() => onNavigate('/repair-prices')}
                        style={{
                          backgroundColor: '#F4F4F4',
                          border: '1px solid #E8E8E8',
                          color: '#1B1D1E',
                          padding: '0.3rem 0.75rem',
                          borderRadius: '9999px',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 180ms ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#4928FD';
                          e.currentTarget.style.color = '#4928FD';
                          e.currentTarget.style.backgroundColor = '#FFFFFF';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#E8E8E8';
                          e.currentTarget.style.color = '#1B1D1E';
                          e.currentTarget.style.backgroundColor = '#F4F4F4';
                        }}
                      >
                        {mod}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={() => onNavigate('/repair-prices')}
                  className="btn-raphus-slide btn-raphus-slide-filled"
                  style={{ width: '100%', minHeight: '46px' }}
                >
                  <span className="btn-slide-badge">
                    <ArrowRight size={15} className="btn-slide-icon" />
                  </span>
                  <span className="btn-slide-text">Reparaturpreis online ermitteln</span>
                </button>
              </div>
            </div>

            {/* DESTINATIONS 2, 3, 4: Curated Asymmetric Column (~ 5 Columns on Desktop) */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }} className="col-span-12 lg:col-span-5">

              {/* DESTINATION 2: Mobile Subscriptions */}
              <div
                onClick={() => onNavigate('/subscriptions')}
                className="stagger-item stagger-2"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid #E8E8E8',
                  padding: '1.25rem 1.35rem',
                  cursor: 'pointer',
                  transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = '#4928FD';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(73, 40, 253, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#E8E8E8';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.03)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.65rem' }}>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#4928FD', backgroundColor: 'rgba(73, 40, 253, 0.08)', padding: '0.2rem 0.55rem', borderRadius: '9999px' }}>
                      Sunrise
                    </span>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#1B1D1E', backgroundColor: '#F4F4F4', padding: '0.2rem 0.55rem', borderRadius: '9999px' }}>
                      Salt.
                    </span>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0284C7', backgroundColor: 'rgba(2, 132, 199, 0.08)', padding: '0.2rem 0.55rem', borderRadius: '9999px' }}>
                      yallo
                    </span>
                  </div>
                  <div style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#F4F4F4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4928FD' }}>
                    <ArrowRight size={13} />
                  </div>
                </div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: '#1B1D1E', marginBottom: '0.25rem' }}>
                  Handyabos unabhängig &amp; transparent verglichen.
                </h4>
                <p style={{ color: '#4B5563', fontSize: '0.825rem', lineHeight: 1.45 }}>
                  Unabhängiger Tarifvergleich mit Top-Aktionsrabatten und kostenloser Rufnummernmitnahme.
                </p>
              </div>

              {/* DESTINATION 3: Shop Smartphones & Accessories */}
              <div
                onClick={() => onNavigate('/shop')}
                className="stagger-item stagger-3"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid #E8E8E8',
                  padding: '1.25rem 1.35rem',
                  cursor: 'pointer',
                  transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)',
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = '#15803D';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(21, 128, 61, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#E8E8E8';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.03)';
                }}
              >
                <div style={{ flex: '1' }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#15803D', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.25rem' }}>
                    Neuware &amp; Refurbished
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: '#1B1D1E', marginBottom: '0.25rem' }}>
                    Smartphones &amp; Zubehör ab Lager Zürich.
                  </h4>
                  <p style={{ color: '#4B5563', fontSize: '0.825rem', lineHeight: 1.45 }}>
                    Geprüfte Neugeräte (24M Garantie) und zertifizierte Second-Life Modelle direkt lieferbar.
                  </p>
                </div>
                <div style={{ width: '64px', height: '64px', borderRadius: '14px', overflow: 'hidden', backgroundColor: '#F8FAFC', flexShrink: 0, border: '1px solid #E8E8E8', padding: '4px' }}>
                  <img
                    src="/assets/products/iphone-16-pro.jpg"
                    alt="iPhone 16 Pro Shop"
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
              </div>

              {/* DESTINATION 4: Visit or Contact Us */}
              <div
                onClick={() => onNavigate('/locations/seebach')}
                className="stagger-item stagger-4"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid #E8E8E8',
                  padding: '1.25rem 1.35rem',
                  cursor: 'pointer',
                  transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = '#BE123C';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(190, 18, 60, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#E8E8E8';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.03)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#BE123C', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Zürich Seebach · Direkt vor Ort
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 600 }}>
                    ● Mo–Fr bis 19:00 geöffnet
                  </span>
                </div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: '#1B1D1E', marginBottom: '0.25rem' }}>
                  Persönliche Beratung in unserer Filiale.
                </h4>
                <p style={{ color: '#4B5563', fontSize: '0.825rem', lineHeight: 1.45, marginBottom: '0.65rem' }}>
                  Schaffhauserstrasse 455, 8052 Zürich. Parkplätze vor der Tür, Tram 14 direkt vor der Filiale.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#BE123C', fontSize: '0.78rem', fontWeight: 700 }}>
                  <span>Filiale &amp; Anfahrt ansehen</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: REPAIR-PRICE FINDER (CLEAN, ACCURATE, RAPHUS STYLE)
          ========================================================================= */}
      <section style={{
        background: 'linear-gradient(180deg, #F8FAFC 0%, #F5F3FF 50%, #F8FAFC 100%)',
        padding: '3.75rem 0 4.25rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Ambient background glow */}
        <div style={{
          position: 'absolute',
          top: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '420px',
          background: 'radial-gradient(ellipse, rgba(73, 40, 253, 0.07) 0%, rgba(244, 63, 94, 0.03) 50%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(50px)'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Section Eyebrow & Title */}
          <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              backgroundColor: '#F3E8FF',
              color: '#7E22CE',
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              fontSize: '0.78rem',
              fontWeight: 700,
              marginBottom: '0.65rem',
              border: '1px solid #E9D7FE'
            }}>
              <Sparkles size={13} color="#7E22CE" />
              <span>TRANSPARENTE SCHWEIZER WERKSTATT-PREISE</span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              color: '#1B1D1E',
              letterSpacing: '-0.02em',
              marginBottom: '0.4rem'
            }}>
              Finden Sie den Preis für Ihre <em className="font-instrument text-[#4928FD]" style={{ fontStyle: 'italic', fontWeight: 400 }}>Reparatur</em>.
            </h2>
            <p style={{ color: '#64748B', maxWidth: '640px', margin: '0 auto', fontSize: '0.975rem', lineHeight: 1.5 }}>
              Wählen Sie Hersteller, Modell und Defekt. Sie erhalten den verbindlichen Tarif inklusive Original-Ersatzteil und 6 Monaten Schweizer Garantie.
            </p>
          </div>

          <RepairPriceFinder onOpenEnquiry={onOpenRepairEnquiry} />

          <div style={{
            marginTop: '2rem',
            textAlign: 'center',
            fontSize: '0.9rem',
            color: '#64748B'
          }}>
            Gerät oder Schaden nicht aufgeführt?{' '}
            <button
              onClick={() => onNavigate('/contact')}
              style={{
                background: 'none',
                border: 'none',
                color: '#4928FD',
                fontWeight: 700,
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              Unverbindliche Spezialofferte anfordern &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: SHOP HIGHLIGHTS & INVENTORY (PORCELAIN BACKGROUND)
          ========================================================================= */}
      <section style={{ backgroundColor: '#F8FAFC', padding: '2.75rem 0 3.25rem' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1.25rem'
          }}>
            <div>
              <span className="section-eyebrow">Geprüfte Geräte ab Lager</span>
              <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>Ausgewählte <em className="font-instrument text-[#4928FD]">Smartphones</em> &amp; Zubehör</h2>
              <p style={{ color: '#64748B', maxWidth: '620px', fontSize: '1rem', lineHeight: 1.5 }}>
                Fabrikneue Flaggschiffe mit 24 Monaten Herstellergarantie sowie fachmännisch zertifizierte Refurbished-Modelle mit 12 Monaten Garantie.
              </p>
            </div>

            <button
              onClick={() => onNavigate('/shop')}
              className="btn-raphus btn-raphus-dark"
              style={{ padding: '0.45rem 0.5rem 0.45rem 1.35rem', fontSize: '0.88rem' }}
            >
              <span>Gesamtes Sortiment ({products.length})</span>
              <span className="btn-icon-circle" style={{ width: '30px', height: '30px' }}><ArrowRight size={14} /></span>
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.75rem'
          }}>
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: SUBSCRIPTION PLANS (WHITE EDITORIAL BACKGROUND)
          ========================================================================= */}
      <section style={{ backgroundColor: '#F8FAFC', padding: '2.75rem 0 3.25rem' }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow">Schweizer Tarif-Vergleich</span>
            <h2 className="section-title">Die besten <em className="font-instrument text-[#4928FD]">Handyabos</em> im Überblick</h2>
            <p className="section-subtitle">
              Als unabhängiger Fachhändler beraten wir Sie objektiv zu den Netzen von Sunrise, Salt, yallo und LEBARA. Keine versteckten Kosten – wir übernehmen Kündigung und Portierung.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
            marginBottom: '3rem'
          }}>
            {subscriptions.map((plan, idx) => (
              <div
                key={plan.id}
                className={`card stagger-item stagger-${(idx % 3) + 1}`}
                style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: plan.highlightBadge ? '2px solid #4928FD' : '1px solid #E8E8E8',
                  boxShadow: plan.highlightBadge ? '0 12px 32px rgba(73, 40, 253, 0.12)' : '0 2px 8px rgba(0,0,0,0.03)'
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
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '0.3rem 0.75rem',
                      borderRadius: '9999px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginBottom: '0.85rem',
                      border: '1px solid #E9D7FE'
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
                      5G Highspeed
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
                    {plan.name}
                  </h3>

                  <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '0.4rem',
                    marginBottom: '1.5rem',
                    borderBottom: '1px solid #F1F5F9',
                    paddingBottom: '1.25rem'
                  }}>
                    <span
                      style={{
                        fontSize: '2.25rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-heading)',
                        color: '#4928FD',
                        whiteSpace: 'nowrap',
                        lineHeight: 1.1,
                        display: 'inline-block'
                      }}
                    >
                      CHF {(plan.discountPriceChf || plan.monthlyPriceChf).toFixed(2)}
                    </span>
                    <span style={{ color: '#64748B', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>/ Monat</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle size={16} color="#10B981" />
                      <span>{plan.dataAllowance}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle size={16} color="#10B981" />
                      <span>{plan.callsAndSms}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle size={16} color="#10B981" />
                      <span>{plan.roamingAllowance}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onOpenSubEnquiry(plan)}
                  className="btn-raphus-slide btn-raphus-slide-primary w-full"
                  style={{ minHeight: '46px', fontSize: '0.9rem' }}
                >
                  <span className="btn-slide-badge"><ArrowRight size={14} className="btn-slide-icon" /></span>
                  <span className="btn-slide-text">Abo unverbindlich anfragen</span>
                </button>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => onNavigate('/subscriptions')}
              className="btn-raphus btn-raphus-dark"
              style={{ padding: '0.55rem 0.65rem 0.55rem 1.45rem' }}
            >
              <span>Alle Tarife &amp; Vergleichstabelle ansehen</span>
              <span className="btn-icon-circle"><ChevronRight size={15} /></span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: SELECTIVE DARK FEATURE CONTAINER — CRAFTSMANSHIP & WORKSHOP INTEGRITY
          ========================================================================= */}
      <section style={{ backgroundColor: '#F8FAFC', padding: '2.5rem 1rem 4.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
          <div style={{
            backgroundColor: '#121417',
            color: '#FFFFFF',
            borderRadius: '32px',
            padding: 'clamp(2rem, 5vw, 4rem)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 24px 64px -12px rgba(18, 20, 24, 0.22)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))',
              gap: '2.5rem',
              alignItems: 'center'
            }}>
              <div>
                <span className="section-eyebrow" style={{ color: '#BA81EE' }}>Schweizer Werkstatt-Qualität</span>
                <h2 style={{
                  color: '#FFFFFF',
                  fontSize: 'clamp(2.2rem, 3.8vw, 3rem)',
                  fontFamily: 'var(--font-heading)',
                  marginBottom: '1.5rem',
                  lineHeight: 1.15
                }}>
                  Sorgfältige Arbeit.<br />Klare Kommunikation.
                </h2>
                <p style={{ color: '#94A3B8', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2.25rem' }}>
                  In unserer Werkstatt in Zürich Seebach reparieren zertifizierte Techniker Ihr Smartphone oder Tablet mit Präzisionswerkzeugen und Original-Ersatzteilen. Bei uns wissen Sie vorab auf den Franken genau, was die Reparatur kostet.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{
                      backgroundColor: 'rgba(73, 40, 253, 0.2)',
                      color: '#A5B4FC',
                      padding: '0.6rem',
                      borderRadius: '12px'
                    }}>
                      <Clock size={20} />
                    </div>
                    <div>
                      <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', marginBottom: '0.25rem' }}>Express-Service in 30–60 Minuten</h4>
                      <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.5 }}>
                        Die meisten Display- und Akkutausche führen wir sofort vor Ort durch, damit Sie Ihr Mobiltelefon am gleichen Tag wieder nutzen können.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{
                      backgroundColor: 'rgba(16, 185, 129, 0.2)',
                      color: '#10B981',
                      padding: '0.6rem',
                      borderRadius: '12px'
                    }}>
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', marginBottom: '0.25rem' }}>6 Monate Funktionsgarantie</h4>
                      <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.5 }}>
                        Auf alle ersetzten Teile und unsere Handwerksarbeit gewähren wir eine verlässliche Schweizer Garantie.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('/repairs')}
                  className="btn-raphus-slide btn-raphus-slide-primary"
                >
                  <span className="btn-slide-badge">
                    <ArrowRight size={16} className="btn-slide-icon" />
                  </span>
                  <span className="btn-slide-text">Reparatur-Ablauf kennenlernen</span>
                </button>
              </div>

              {/* Real Workshop Photo with Fine Architectural Frame */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 24px 50px rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.12)'
                }}>
                  <img
                    src="/assets/precision-smartphone-repair-bench.png"
                    alt="Mobile World Präzisions-Werkbank in Zürich"
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>

                {/* Inset Badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '-16px',
                  right: '16px',
                  backgroundColor: '#181D26',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '14px',
                  padding: '0.85rem 1.15rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.45)'
                }}>
                  <div style={{
                    backgroundColor: '#10B981',
                    color: '#FFFFFF',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#FFFFFF' }}>Geprüfte OEM-Qualität</div>
                    <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Keine billigen Nachbauten</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: TRUST & PERSONAL CONSULTATION (SPACE-EFFICIENT COMPACT)
          ========================================================================= */}
      <section style={{ backgroundColor: '#F8FAFC', padding: '2.5rem 0 3rem' }}>
        <div className="container">
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #E2E8F0',
            padding: 'clamp(1.5rem, 3.5vw, 2.5rem)',
            boxShadow: '0 12px 32px rgba(16, 19, 24, 0.04)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '2rem',
            alignItems: 'center'
          }}>
            {/* Left Column: Text & Trust Chips */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F4F6] text-[#475569] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles size={12} className="text-[#4928FD]" />
                <span>Persönlich vor Ort &amp; Team</span>
              </div>
              <h2 style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                color: '#1B1D1E',
                lineHeight: 1.2,
                marginBottom: '0.75rem'
              }}>
                Technik-Kompetenz mit <em className="font-instrument text-[#4928FD]">menschlichem Gesicht</em>
              </h2>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                Im Gegensatz zu anonymen Online-Portalen haben Sie bei Mobile World immer einen erfahrenen Techniker direkt an der Theke. Ob Datenübertragung, Einrichtung oder knifflige Hardware-Defekte – wir beraten ehrlich und transparent.
              </p>

              {/* 3 Compact Trust Badges */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.65rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: '#1B1D1E', fontWeight: 600 }}>
                  <ShieldCheck size={16} color="#10B981" />
                  <span>Zertifizierte Techniker seit 2017</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: '#1B1D1E', fontWeight: 600 }}>
                  <Clock size={16} color="#4928FD" />
                  <span>30–60 Min Express vor Ort</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: '#1B1D1E', fontWeight: 600 }}>
                  <MessageSquare size={16} color="#06B6D4" />
                  <span>Faire Beratung ohne Fachchinesisch</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => onNavigate('/buy-sell')}
                  className="btn-raphus-slide btn-raphus-slide-dark"
                  style={{ minHeight: '44px', fontSize: '0.875rem' }}
                >
                  <span className="btn-slide-badge"><ArrowRight size={14} className="btn-slide-icon" /></span>
                  <span className="btn-slide-text">Handy verkaufen</span>
                </button>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="btn-raphus-slide btn-raphus-slide-primary"
                  style={{ minHeight: '44px', fontSize: '0.875rem' }}
                >
                  <span className="btn-slide-badge"><ArrowRight size={14} className="btn-slide-icon" /></span>
                  <span className="btn-slide-text">Beratungstermin vereinbaren</span>
                </button>
              </div>
            </div>

            {/* Right Column: Compact Photo Visual with Inset Pill */}
            <div style={{ position: 'relative' }}>
              <div style={{
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(16, 19, 24, 0.08)',
                border: '1px solid #E2E8F0',
                maxHeight: '260px'
              }}>
                <img
                  src="/assets/phone-consultation-at-mobile-shop.png"
                  alt="Mobile World Techniker & Beratung in Zürich"
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                backgroundColor: 'rgba(27, 29, 30, 0.9)',
                color: '#FFFFFF',
                padding: '0.4rem 0.85rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: 600,
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}>
                Werkstatt &amp; Beratung Zürich
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: 4 BRANCHES VISUALIZER (COMPREHENSIVE & SPACE-EFFICIENT)
          ========================================================================= */}
      <section style={{ backgroundColor: '#F8FAFC', padding: '2.5rem 0 3.5rem' }}>
        <div className="container">
          <div className="section-header text-center" style={{ marginBottom: '2rem' }}>
            <span className="section-eyebrow">Filialnetz im Kanton Zürich</span>
            <h2 className="section-title">Unsere 4 Standorte für <em className="font-instrument text-[#4928FD]">Express-Service</em></h2>
            <p className="section-subtitle">
              Zürich Seebach (Hauptwerkstatt), Bellevue-Stadelhofen, Rüti ZH und Oberengstringen – wir sind überall in Ihrer Region schnell erreichbar.
            </p>
          </div>

          {/* Interactive Branch Switcher Tabs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.65rem',
            marginBottom: '1.75rem'
          }}>
            {BRANCHES.map(b => {
              const isSelected = activeBranchId === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setActiveBranchId(b.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.6rem 1.15rem',
                    borderRadius: '9999px',
                    border: isSelected ? '1.5px solid #1B1D1E' : '1px solid #CBD5E1',
                    backgroundColor: isSelected ? '#1B1D1E' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#1B1D1E',
                    fontSize: '0.85rem',
                    fontWeight: isSelected ? 700 : 600,
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 4px 12px rgba(27, 29, 30, 0.18)' : '0 1px 3px rgba(0, 0, 0, 0.03)',
                    transition: 'all 160ms ease-out'
                  }}
                >
                  <MapPin size={14} color={isSelected ? '#4928FD' : '#64748B'} />
                  <span>{b.name.replace('Mobile World ', '')}</span>
                  {b.isHeadquarters && (
                    <span style={{
                      fontSize: '0.68rem',
                      backgroundColor: isSelected ? '#4928FD' : '#E0E7FF',
                      color: isSelected ? '#FFFFFF' : '#4928FD',
                      padding: '0.1rem 0.4rem',
                      borderRadius: '9999px',
                      fontWeight: 700
                    }}>
                      HQ
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Branch Showcase Card */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: activeBranch.isHeadquarters ? '2px solid #4928FD' : '1px solid #E2E8F0',
            overflow: 'hidden',
            boxShadow: '0 14px 36px rgba(16, 19, 24, 0.05)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            marginBottom: '2rem'
          }}>
            {/* Storefront Image */}
            <div style={{ position: 'relative', minHeight: '260px' }}>
              <img
                src={activeBranch.imageUrl}
                alt={activeBranch.name}
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              <div style={{
                position: 'absolute',
                top: '14px',
                left: '14px',
                backgroundColor: activeBranch.isHeadquarters ? '#4928FD' : 'rgba(16, 19, 24, 0.85)',
                color: '#FFFFFF',
                padding: '0.35rem 0.75rem',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 700,
                backdropFilter: 'blur(8px)'
              }}>
                {activeBranch.isHeadquarters ? 'Hauptwerkstatt & Zentrale' : 'Offizieller Standort'}
              </div>
            </div>

            {/* Store Information */}
            <div className="p-5 sm:p-7 md:p-8" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="section-eyebrow" style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                  {activeBranch.city} • {activeBranch.postalCode}
                </span>
                <h3 style={{ fontSize: '1.45rem', fontFamily: 'var(--font-heading)', marginBottom: '0.75rem', color: '#1B1D1E' }}>
                  {activeBranch.name}
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.45 }}>
                  {activeBranch.transitInfo}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <MapPin size={16} color="#4928FD" />
                    <span><strong>Adresse:</strong> {activeBranch.address}, {activeBranch.postalCode} {activeBranch.city}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                    <Clock size={16} color="#4928FD" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <div>Mo–Fr: <strong>{activeBranch.openingHours.weekdays}</strong></div>
                      <div>Samstag: <strong>{activeBranch.openingHours.saturday}</strong></div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <Phone size={16} color="#4928FD" />
                    <span><strong>Telefon:</strong> <a href={`tel:${activeBranch.phone.replace(/\s+/g, '')}`} style={{ color: '#4928FD', fontWeight: 600 }}>{activeBranch.phone}</a></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <MessageSquare size={16} color="#10B981" />
                    <span><strong>WhatsApp:</strong> <a href={`https://wa.me/${activeBranch.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ color: '#059669', fontWeight: 600 }}>{activeBranch.whatsapp}</a></span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a
                  href={activeBranch.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-raphus-slide btn-raphus-slide-primary"
                  style={{ minHeight: '44px', fontSize: '0.85rem' }}
                >
                  <span className="btn-slide-badge"><MapPin size={14} className="btn-slide-icon" /></span>
                  <span className="btn-slide-text">Route in Google Maps</span>
                </a>

                {activeBranch.isHeadquarters ? (
                  <button
                    onClick={() => onNavigate('/locations/seebach')}
                    className="btn-raphus-slide btn-raphus-slide-dark"
                    style={{ minHeight: '44px', fontSize: '0.85rem' }}
                  >
                    <span className="btn-slide-badge"><ArrowRight size={14} className="btn-slide-icon" /></span>
                    <span className="btn-slide-text">Filialdetails Seebach</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate('/repair-prices')}
                    className="btn-raphus-slide btn-raphus-slide-dark"
                    style={{ minHeight: '44px', fontSize: '0.85rem' }}
                  >
                    <span className="btn-slide-badge"><ArrowRight size={14} className="btn-slide-icon" /></span>
                    <span className="btn-slide-text">Reparaturpreis prüfen</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick 4-Branch Overview Pill Grid for Instant Scanning */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem'
          }}>
            {BRANCHES.map(b => (
              <div
                key={b.id}
                onClick={() => setActiveBranchId(b.id)}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: activeBranchId === b.id ? '1.5px solid #4928FD' : '1px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '1rem',
                  cursor: 'pointer',
                  transition: 'all 160ms ease-out',
                  boxShadow: activeBranchId === b.id ? '0 4px 14px rgba(73, 40, 253, 0.1)' : '0 1px 3px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.925rem', color: '#1B1D1E' }}>
                    {b.city} {b.name.includes('Rüti') ? 'Rüti' : b.name.includes('Oberengstringen') ? 'Oberengstringen' : b.name.includes('Bellevue') ? 'Bellevue' : 'Seebach'}
                  </div>
                  {b.isHeadquarters && (
                    <span style={{ fontSize: '0.65rem', backgroundColor: '#EDE9FE', color: '#4928FD', padding: '0.1rem 0.4rem', borderRadius: '9999px', fontWeight: 700 }}>
                      Hauptsitz
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '0.5rem' }}>
                  {b.address}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#4928FD', fontWeight: 600 }}>
                  {b.phone}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: RAPHUS SIGNATURE DUAL-GRADIENT BOTTOM CTA
          ========================================================================= */}
      <section style={{ backgroundColor: '#F8FAFC', padding: '2.5rem 0 5.5rem' }}>
        <div className="container max-w-5xl mx-auto px-4">
          <div className="get-in-touch p-8 sm:p-14 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1E6FC] text-[#BA81EE] text-xs font-bold tracking-wide uppercase mb-4 shadow-xs border border-[#E9D7FE]">
              <Sparkles size={14} className="text-[#4928FD]" />
              <span className="text-[#4928FD]">Persönlicher Schweizer Service</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#1B1D1E] tracking-tight mb-4">
              Bereit für eine schnelle Reparatur oder ein <em className="font-instrument text-[#4928FD]">neues Handyabo</em>?
            </h2>
            <p className="text-base sm:text-lg text-[#4B5563] max-w-xl mx-auto mb-8 leading-relaxed">
              Kommen Sie direkt in unserer Werkstatt an der Schaffhauserstrasse 455 vorbei oder kontaktieren Sie uns für eine unverbindliche Offerte.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => onNavigate('/repair-prices')}
                className="btn-raphus btn-raphus-primary"
              >
                <span>Reparaturpreis ermitteln</span>
                <span className="btn-icon-circle"><ArrowRight size={15} /></span>
              </button>
              <a
                href="https://wa.me/41783448888"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-raphus btn-raphus-dark"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare size={16} className="text-[#25D366]" />
                  <span>Direkt via WhatsApp</span>
                </div>
                <span className="btn-icon-circle"><ArrowRight size={15} /></span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
