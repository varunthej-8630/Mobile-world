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
import { SUBSCRIPTION_PLANS } from '../data/subscriptions';
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
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const products = mockDb.getProducts();
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const seebach = BRANCHES[0];

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const hasSeenIntro = sessionStorage.getItem('mw_intro_played_session_v1');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const introWillPlay = !hasSeenIntro && !prefersReducedMotion;

    if (!introWillPlay) {
      // Intro already played or skipped: start hero video from beginning
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      // Intro is playing: ensure hero stays paused at frame 0 ready to roll
      video.currentTime = 0;
      video.pause();

      const startHeroVideo = () => {
        if (!video) return;
        video.currentTime = 0;
        video.play().catch(() => {});
      };

      window.addEventListener('mw-intro-start-fade', startHeroVideo, { once: true });
      window.addEventListener('mw-intro-complete', startHeroVideo, { once: true });

      return () => {
        window.removeEventListener('mw-intro-start-fade', startHeroVideo);
        window.removeEventListener('mw-intro-complete', startHeroVideo);
      };
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0', margin: 0, padding: 0 }}>
      {/* =========================================================================
          SECTION 2: REFINED CINEMATIC HERO (FULL 100SVH, NO BOTTOM GAP, CRISP VIDEO)
          ========================================================================= */}
      <section style={{
        position: 'relative',
        backgroundColor: '#101318',
        color: '#FFFFFF',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        textAlign: 'center',
        padding: '7.5rem 1.5rem 3.5rem',
        margin: 0
      }}>
        {/* Background Video: 100% Crisp, Sharp, Native 16:9 Aspect Ratio Preserved, NO blur, NO transforms */}
        {!videoError ? (
          <video
            ref={heroVideoRef}
            loop
            muted
            playsInline
            preload="auto"
            poster="/assets/hero-poster.jpg"
            onError={() => setVideoError(true)}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 38%',
              zIndex: 1,
              opacity: 1,
              filter: 'none'
            }}
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
            <source src="/assets/mobile-world.mp4" type="video/mp4" />
          </video>
        ) : (
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/assets/hero-poster.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 38%',
            opacity: 1,
            zIndex: 1
          }} />
        )}

        {/* Subtle, restrained radial ambient illumination: keeps the real store footage crisp & natural while ensuring optimal contrast for the logo */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 65% 50% at 50% 50%, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.14) 42%, rgba(16, 19, 24, 0.22) 75%, rgba(16, 19, 24, 0.42) 100%)',
          zIndex: 2,
          pointerEvents: 'none'
        }} />

        {/* Centered Hero Logo Anchor: Spatially defines the exact starting envelope for the compact circular morphing logo */}
        <div
          id="hero-logo-anchor"
          style={{
            position: 'relative',
            zIndex: 3,
            width: 'clamp(140px, 28vw, 240px)',
            height: 'clamp(140px, 28vw, 240px)',
            aspectRatio: '1 / 1',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none'
          }}
          aria-label="Mobile World Zürich"
        >
          {/* On mobile screens, render the crisp logo directly inside hero */}
          <img
            src="/assets/mobile-world-compact-logo.png"
            alt="Mobile World Zürich"
            className="block lg:hidden"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 18px rgba(255, 255, 255, 0.95)) drop-shadow(0 0 30px rgba(23, 76, 255, 0.4))'
            }}
          />
        </div>

        {/* Mobile Hero Content & Quick Actions */}
        <div 
          className="block lg:hidden" 
          style={{ 
            position: 'relative', 
            zIndex: 3, 
            marginTop: '1.25rem',
            marginBottom: '2.5rem',
            maxWidth: '480px',
            marginInline: 'auto',
            padding: '0 0.5rem'
          }}
        >
          <span 
            className="badge badge-blue" 
            style={{ 
              marginBottom: '0.75rem',
              backgroundColor: 'rgba(23, 76, 255, 0.3)',
              borderColor: 'rgba(78, 128, 255, 0.6)',
              color: '#FFFFFF'
            }}
          >
            Express-Werkstatt Zürich Seebach
          </span>
          <h1 style={{
            fontSize: 'clamp(1.5rem, 6vw, 2.25rem)',
            color: '#FFFFFF',
            fontFamily: 'var(--font-heading)',
            lineHeight: 1.2,
            marginBottom: '0.5rem',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.6)'
          }}>
            Smartphones, Reparaturen &amp; Abos.
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '0.9rem',
            lineHeight: 1.5,
            marginBottom: '1.25rem',
            textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)'
          }}>
            30–60 Min. Sofortreparatur vor Ort · Ohne Voranmeldung
          </p>

          <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('/repair-prices')}
              className="btn btn-primary"
              style={{
                fontSize: '0.85rem',
                padding: '0.6rem 1.25rem',
                borderRadius: '9999px',
                boxShadow: '0 4px 16px rgba(23, 76, 255, 0.4)'
              }}
            >
              <Wrench size={15} /> Reparaturpreise
            </button>
            <a
              href="https://wa.me/41783448888"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{
                fontSize: '0.85rem',
                padding: '0.6rem 1.15rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.18)',
                color: '#FFFFFF',
                borderColor: 'rgba(255, 255, 255, 0.35)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <MessageSquare size={15} color="#10B981" /> WhatsApp
            </a>
          </div>
        </div>

        {/* Subtle Location & Public Transport Information Line */}
        <div style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '1.5rem',
          right: '1.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 3
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.45rem 0.75rem',
            fontSize: 'clamp(0.825rem, 1.8vw, 0.925rem)',
            color: 'rgba(255, 255, 255, 0.92)',
            letterSpacing: '0.02em',
            textAlign: 'center',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.7), 0 1px 3px rgba(0, 0, 0, 0.9)'
          }}>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Mobile+World+Schaffhauserstrasse+455+8052+Zürich"
              target="_blank"
              rel="noopener noreferrer"
              title="Auf Google Maps öffnen"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'color 180ms ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#7096FF'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#FFFFFF'}
            >
              <MapPin size={15} color="#4E80FF" style={{ flexShrink: 0 }} />
              <span>Schaffhauserstrasse 455 · 8052 Zürich</span>
            </a>
            <span style={{ opacity: 0.5, color: '#CBD5E1' }} className="hidden sm:inline">|</span>
            <span style={{ color: 'rgba(241, 245, 249, 0.88)', fontWeight: 400 }}>
              Tram 14 &amp; Bus 768
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: BESPOKE ASYMMETRICAL SERVICE NAVIGATION (REPLACING 4 GENERIC CARDS)
          ========================================================================= */}
      <section style={{ backgroundColor: '#F5F6F8', padding: '5.5rem 0 6rem', margin: 0, position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            marginBottom: '3rem',
            maxWidth: '680px'
          }}>
            <span className="section-eyebrow">Persönlicher Service &amp; Fachhandel</span>
            <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
              Vier Wege zu Ihrer Lösung.
            </h2>
            <p style={{ color: '#64748B', fontSize: '1.05rem', lineHeight: 1.5 }}>
              Ob sofortiger Displaytausch, unabhängige Tarifberatung oder der Kauf eines neuen Geräts — wählen Sie Ihren direkten Einstieg.
            </p>
          </div>

          {/* Asymmetrical Layout: Large Featured Repair Showcase (Left) + 3 Curated Tiles (Right) */}
          <div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
          >
            {/* DESTINATION 1: Phone Repairs (Dominant Featured Panel ~ 7 Columns on Desktop) */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 20px rgba(16, 19, 24, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="col-span-12 lg:col-span-7 p-5 sm:p-8 md:p-10"
            >
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.25rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    backgroundColor: 'rgba(23, 76, 255, 0.08)',
                    color: '#174CFF',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em'
                  }}>
                    <Wrench size={14} /> EXPRESS-WERKSTATT · 30–60 MIN.
                  </span>
                  <span style={{ fontSize: '0.82rem', color: '#10B981', fontWeight: 600 }}>
                    ✓ 6 Monate Garantie
                  </span>
                </div>

                <h3 style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 1.85rem)',
                  fontFamily: 'var(--font-heading)',
                  color: '#101318',
                  marginBottom: '0.85rem',
                  lineHeight: 1.2
                }}>
                  Phone repairs with Swiss precision.
                </h3>

                <p style={{
                  color: '#64748B',
                  fontSize: '0.975rem',
                  lineHeight: 1.6,
                  marginBottom: '1.75rem'
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
                    marginBottom: '1.75rem',
                    maxHeight: '220px',
                    cursor: 'pointer'
                  }}
                  className="img-zoom-container"
                >
                  <img
                    src="/assets/precision-smartphone-repair-bench.png"
                    alt="Mobile World Werkstatt Zürich Seebach"
                    style={{
                      width: '100%',
                      height: '220px',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(16, 19, 24, 0.7) 0%, transparent 60%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '1rem 1.25rem'
                  }}>
                    <span style={{ color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 600 }}>
                      Original &amp; OEM-Ersatzteile vorrätig
                    </span>
                  </div>
                </div>

                {/* Quick Model Shortcuts */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, display: 'block', marginBottom: '0.6rem' }}>
                    Beliebte Modelle direkt prüfen:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {['iPhone 15 Pro', 'iPhone 14', 'Galaxy S24', 'Pixel 8'].map((mod) => (
                      <button
                        key={mod}
                        onClick={() => onNavigate('/repair-prices')}
                        style={{
                          backgroundColor: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          color: '#334155',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 150ms'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#174CFF';
                          e.currentTarget.style.color = '#174CFF';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#E2E8F0';
                          e.currentTarget.style.color = '#334155';
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
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'space-between', padding: '0.85rem 1.5rem' }}
                >
                  <span>Reparaturpreis online ermitteln</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* DESTINATIONS 2, 3, 4: Curated Asymmetric Column (~ 5 Columns on Desktop) */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }} className="col-span-12 lg:col-span-5">
              
              {/* DESTINATION 2: Mobile Subscriptions */}
              <div
                onClick={() => onNavigate('/subscriptions')}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  padding: '1.75rem',
                  cursor: 'pointer',
                  transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 2px 10px rgba(16, 19, 24, 0.03)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = '#174CFF';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(23, 76, 255, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(16, 19, 24, 0.03)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#174CFF', backgroundColor: 'rgba(23, 76, 255, 0.08)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                      Sunrise
                    </span>
                    <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#101318', backgroundColor: '#F1F5F9', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                      Salt.
                    </span>
                    <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#0284C7', backgroundColor: 'rgba(2, 132, 199, 0.08)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                      yallo
                    </span>
                  </div>
                  <ArrowRight size={16} color="#174CFF" />
                </div>
                <h4 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: '#101318', marginBottom: '0.35rem' }}>
                  Mobile subscriptions without the hassle.
                </h4>
                <p style={{ color: '#64748B', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  Unabhängiger Tarifvergleich mit Top-Aktionsrabatten und kostenloser Rufnummernmitnahme.
                </p>
              </div>

              {/* DESTINATION 3: Shop Smartphones & Accessories */}
              <div
                onClick={() => onNavigate('/shop')}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  padding: '1.75rem',
                  cursor: 'pointer',
                  transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 2px 10px rgba(16, 19, 24, 0.03)',
                  display: 'flex',
                  gap: '1.25rem',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = '#174CFF';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(23, 76, 255, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(16, 19, 24, 0.03)';
                }}
              >
                <div style={{ flex: '1' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.35rem' }}>
                    Neuware &amp; Refurbished
                  </div>
                  <h4 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: '#101318', marginBottom: '0.35rem' }}>
                    Shop smartphones &amp; gear.
                  </h4>
                  <p style={{ color: '#64748B', fontSize: '0.88rem', lineHeight: 1.5 }}>
                    Geprüfte Neugeräte (24M Garantie) und nachhaltige Second-Life Modelle ab Lager Zürich.
                  </p>
                </div>
                <div style={{ width: '74px', height: '74px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#F8FAFC', flexShrink: 0, border: '1px solid #E2E8F0' }}>
                  <img
                    src="/assets/products/iphone-16-pro.jpg"
                    alt="iPhone 16 Pro Shop"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
              </div>

              {/* DESTINATION 4: Visit or Contact Us */}
              <div
                onClick={() => onNavigate('/contact')}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  padding: '1.75rem',
                  cursor: 'pointer',
                  transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 2px 10px rgba(16, 19, 24, 0.03)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = '#174CFF';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(23, 76, 255, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(16, 19, 24, 0.03)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Zürich Seebach · Direkt vor Ort
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600 }}>
                    ● Geöffnet bis 19:00
                  </span>
                </div>
                <h4 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: '#101318', marginBottom: '0.35rem' }}>
                  Visit or contact us.
                </h4>
                <p style={{ color: '#64748B', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                  Schaffhauserstrasse 455. Schnelle Antworten direkt via Telefon oder WhatsApp.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.85rem', fontWeight: 600, color: '#174CFF' }}>
                  <span>Kontaktieren &amp; Anfahrt ansehen</span>
                  <ArrowRight size={15} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: REPAIR-PRICE FINDER PREVIEW (LIGHT, PRECISE, PURE WHITE)
          ========================================================================= */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '6rem 0', borderTop: '1px solid #EAECEF' }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow">Transparente Schweizer Werkstatt-Preise</span>
            <h2 className="section-title">Finden Sie den Preis für Ihre Reparatur.</h2>
            <p className="section-subtitle">
              Wählen Sie Hersteller, Modell und Defekt. Sie erhalten den verbindlichen Tarif inklusive Original-Ersatzteil und 6 Monaten Schweizer Garantie.
            </p>
          </div>

          <RepairPriceFinder onOpenEnquiry={onOpenRepairEnquiry} />

          <div style={{
            marginTop: '2.5rem',
            textAlign: 'center',
            fontSize: '0.925rem',
            color: '#64748B'
          }}>
            Gerät oder Schaden nicht aufgeführt?{' '}
            <button
              onClick={() => onNavigate('/contact')}
              style={{
                background: 'none',
                border: 'none',
                color: '#174CFF',
                fontWeight: 600,
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
      <section style={{ backgroundColor: '#F5F6F8', padding: '6rem 0', borderTop: '1px solid #EAECEF' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '1.25rem'
          }}>
            <div>
              <span className="section-eyebrow">Geprüfte Geräte ab Lager</span>
              <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>Ausgewählte Smartphones &amp; Zubehör</h2>
              <p style={{ color: '#64748B', maxWidth: '620px', fontSize: '1rem', lineHeight: 1.5 }}>
                Fabrikneue Flaggschiffe mit 24 Monaten Herstellergarantie sowie fachmännisch zertifizierte Refurbished-Modelle mit 12 Monaten Garantie.
              </p>
            </div>

            <button
              onClick={() => onNavigate('/shop')}
              className="btn btn-secondary"
              style={{ backgroundColor: '#FFFFFF' }}
            >
              Gesamtes Sortiment ({products.length} Artikel) <ArrowRight size={16} />
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
      <section style={{ backgroundColor: '#FFFFFF', padding: '6rem 0', borderTop: '1px solid #EAECEF' }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow">Schweizer Tarif-Vergleich</span>
            <h2 className="section-title">Die besten Handyabos im Überblick</h2>
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
            {SUBSCRIPTION_PLANS.slice(0, 3).map((plan) => (
              <div 
                key={plan.id}
                className="card"
                style={{
                  padding: '2.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: '#FFFFFF',
                  border: plan.highlightBadge ? '2px solid #174CFF' : '1px solid #E2E8F0',
                  position: 'relative',
                  boxShadow: plan.highlightBadge ? '0 12px 32px rgba(23, 76, 255, 0.08)' : '0 2px 8px rgba(0,0,0,0.03)'
                }}
              >
                {plan.highlightBadge && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#174CFF',
                    color: '#FFFFFF',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.25rem 0.85rem',
                    borderRadius: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em'
                  }}>
                    {plan.highlightBadge}
                  </div>
                )}

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span className="badge badge-blue" style={{ fontSize: '0.75rem' }}>
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
                    <span style={{ fontSize: '2.25rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: '#174CFF' }}>
                      CHF {(plan.discountPriceChf || plan.monthlyPriceChf).toFixed(2)}
                    </span>
                    <span style={{ color: '#64748B', fontSize: '0.9rem' }}>/ Monat</span>
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
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  Abo unverbindlich anfragen
                </button>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => onNavigate('/subscriptions')}
              className="btn btn-secondary"
            >
              Alle Tarife &amp; Vergleichstabelle ansehen <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: SELECTIVE DARK SECTION — CRAFTSMANSHIP & WORKSHOP INTEGRITY
          ========================================================================= */}
      <section style={{ backgroundColor: '#101318', color: '#FFFFFF', padding: '6.5rem 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}>
            <div>
              <span className="section-eyebrow" style={{ color: '#4E80FF' }}>Schweizer Werkstatt-Qualität</span>
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
                    backgroundColor: 'rgba(23, 76, 255, 0.2)',
                    color: '#4E80FF',
                    padding: '0.6rem',
                    borderRadius: '10px'
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
                    borderRadius: '10px'
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
                className="btn btn-primary"
              >
                Reparatur-Ablauf kennenlernen <ArrowRight size={16} />
              </button>
            </div>

            {/* Real Workshop Photo with Fine Architectural Frame */}
            <div style={{ position: 'relative' }}>
              <div style={{
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 24px 50px rgba(0, 0, 0, 0.5)',
                border: '1px solid #262E3B'
              }}>
                <img
                  src="/assets/precision-smartphone-repair-bench.png"
                  alt="Mobile World Präzisions-Werkbank in Zürich"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>

              {/* Inset Badge */}
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                right: '20px',
                backgroundColor: '#181D26',
                border: '1px solid #262E3B',
                borderRadius: '12px',
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                boxShadow: '0 12px 24px rgba(0,0,0,0.35)'
              }}>
                <div style={{
                  backgroundColor: '#10B981',
                  color: '#FFFFFF',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#FFFFFF' }}>Geprüfte OEM-Qualität</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Keine billigen Nachbauten</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: TRUST & PERSONAL CONSULTATION (PORCELAIN EDITORIAL)
          ========================================================================= */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '6.5rem 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}>
            {/* Real Consultation Photo */}
            <div style={{ order: 2 }}>
              <div style={{
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 16px 36px rgba(16, 19, 24, 0.06)',
                border: '1px solid #E2E8F0'
              }}>
                <img
                  src="/assets/phone-consultation-at-mobile-shop.png"
                  alt="Kundenberatung an der Theke von Mobile World Zürich Seebach"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>

            <div style={{ order: 1 }}>
              <span className="section-eyebrow">Persönlich vor Ort</span>
              <h2 className="section-title">Technik-Kompetenz mit menschlichem Gesicht</h2>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Im Gegensatz zu anonymen Online-Plattformen oder unpersönlichen Grossketten haben Sie bei Mobile World immer einen direkten Ansprechpartner vor Ort. Ob Datenübertragung auf ein neues Smartphone, App-Einrichtung oder Fehlerdiagnose – wir nehmen uns Zeit für Sie.
              </p>

              <div style={{
                backgroundColor: '#F8FAFC',
                borderLeft: '4px solid #174CFF',
                padding: '1.25rem 1.5rem',
                borderRadius: '0 12px 12px 0',
                marginBottom: '2rem'
              }}>
                <div style={{ fontWeight: 700, color: '#101318', marginBottom: '0.25rem' }}>
                  Handy-Ankauf zum fairen Tageskurs:
                </div>
                <div style={{ fontSize: '0.9rem', color: '#64748B' }}>
                  Bringen Sie Ihr altes iPhone oder Samsung vorbei und erhalten Sie direkt Bargeld oder eine Gutschrift auf Neugeräte und Zubehör.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => onNavigate('/buy-sell')}
                  className="btn btn-secondary"
                >
                  Handy verkaufen &rarr;
                </button>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="btn btn-primary"
                >
                  Beratungstermin anfragen
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: VISIT THE STORE (SEEBACH HQ)
          ========================================================================= */}
      <section style={{ backgroundColor: '#F5F6F8', padding: '6rem 0', borderTop: '1px solid #EAECEF' }}>
        <div className="container">
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #DFE3E9',
            overflow: 'hidden',
            boxShadow: '0 16px 40px rgba(16, 19, 24, 0.05)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))'
          }}>
            {/* Storefront Image */}
            <div style={{ position: 'relative', minHeight: '320px' }}>
              <img
                src="/assets/modern-mobile-world-storefront-at-dusk.png"
                alt="Mobile World ZH Seebach Ladengeschäft Schaffhauserstrasse 455"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                backgroundColor: 'rgba(16, 19, 24, 0.85)',
                color: '#FFFFFF',
                padding: '0.4rem 0.85rem',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600,
                backdropFilter: 'blur(8px)'
              }}>
                Hauptfiliale &amp; Werkstatt
              </div>
            </div>

            {/* Store Information */}
            <div className="p-6 sm:p-8 md:p-10" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="section-eyebrow">Filiale Seebach</span>
                <h3 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>
                  Mobile World ZH Seebach
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.95rem', marginBottom: '1.75rem', lineHeight: 1.5 }}>
                  Zentral gelegen an der Schaffhauserstrasse 455 in Zürich Seebach. Tramhaltestelle Seebacherplatz (Linie 14) und Bus 768 direkt vor dem Laden.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.925rem', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <MapPin size={18} color="#174CFF" />
                    <span><strong>Adresse:</strong> Schaffhauserstrasse 455, 8052 Zürich</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Clock size={18} color="#174CFF" />
                    <span><strong>Öffnungszeiten:</strong> Mo–Fr 09:00–19:00 | Sa 10:00–18:00</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Phone size={18} color="#174CFF" />
                    <span><strong>Telefon:</strong> <a href="tel:+41445436333" style={{ color: '#174CFF', fontWeight: 600 }}>+41 44 543 63 33</a></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <MessageSquare size={18} color="#10B981" />
                    <span><strong>WhatsApp:</strong> <a href="https://wa.me/41783448888" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', fontWeight: 600 }}>+41 78 344 88 88</a></span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a
                  href={seebach.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <MapPin size={16} /> Route in Google Maps <ExternalLink size={14} />
                </a>

                <button
                  onClick={() => onNavigate('/locations/seebach')}
                  className="btn btn-secondary"
                >
                  Filialdetails ansehen
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: FINAL CTA BANNER
          ========================================================================= */}
      <section style={{
        backgroundColor: '#101318',
        color: '#FFFFFF',
        padding: '5rem 0',
        borderTop: '1px solid #1E2530',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{
            color: '#FFFFFF',
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontFamily: 'var(--font-heading)',
            marginBottom: '1rem'
          }}>
            Let’s get your technology moving.
          </h2>
          <p style={{
            fontSize: '1.15rem',
            color: '#94A3B8',
            marginBottom: '2.5rem',
            lineHeight: 1.6
          }}>
            Ob gebrochenes Display, schwacher Akku, neues Handyabo oder das passende Schutzglas: Mobile World ist Ihr verlässlicher Partner in Zürich.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <button
              onClick={() => onNavigate('/repair-prices')}
              className="btn btn-primary btn-lg"
            >
              <Wrench size={18} /> Reparaturpreis ermitteln
            </button>
            <button
              onClick={() => onNavigate('/contact')}
              className="btn btn-outline-white btn-lg"
            >
              <Phone size={18} /> Kontakt aufnehmen
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
