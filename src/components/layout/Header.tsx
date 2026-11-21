import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Search, 
  Phone, 
  MessageSquare, 
  MapPin, 
  ChevronRight,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Radio,
  Clock,
  Sparkles
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { isAuthenticated, user } = useAuth();

  // Scroll detection for subtle background density transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Suggested Information Architecture:
  // 1. Reparaturen (/repairs)
  // 2. Reparaturpreise (/repair-prices)
  // 3. Handys & Zubehör (/shop)
  // 4. Handy-Abos (/subscriptions)
  // 5. Services (/services)
  // 6. Filiale Seebach (/locations/seebach)
  const navLinks = [
    { label: 'Reparaturen', path: '/repairs' },
    { label: 'Reparaturpreise', path: '/repair-prices' },
    { label: 'Handys & Zubehör', path: '/shop' },
    { label: 'Handy-Abos', path: '/subscriptions' },
    { label: 'Services', path: '/services' },
    { label: 'Filiale Seebach', path: '/locations/seebach' }
  ];

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  const isHome = currentPath === '/' || currentPath === '';

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: '0.65rem 1rem',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div 
          style={{
            maxWidth: '1320px',
            margin: '0 auto',
            width: '100%',
            pointerEvents: 'auto'
          }}
        >
          <nav
            style={{
              backgroundColor: isScrolled 
                ? 'rgba(255, 255, 255, 0.92)' 
                : (isHome ? 'transparent' : 'rgba(255, 255, 255, 0.95)'),
              backdropFilter: isScrolled 
                ? 'blur(20px)' 
                : (isHome ? 'none' : 'blur(20px)'),
              WebkitBackdropFilter: isScrolled 
                ? 'blur(20px)' 
                : (isHome ? 'none' : 'blur(20px)'),
              border: isScrolled 
                ? '1px solid rgba(229, 231, 235, 0.85)' 
                : (isHome ? '1px solid transparent' : '1px solid rgba(229, 231, 235, 0.8)'),
              borderRadius: '9999px',
              padding: '0.45rem 1.15rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: isScrolled 
                ? '0 12px 36px rgba(0, 0, 0, 0.08)' 
                : (isHome ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.04)'),
              transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* LEFT: Mobile World Official Brand Logo */}
            <a 
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/');
              }}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
                textDecoration: 'none'
              }}
              className="hover:opacity-90 transition-opacity"
              aria-label="Mobile World Zürich — Zur Startseite"
            >
              <img
                src="/assets/mobile-world-brandmark.png"
                alt="Mobile World Zürich"
                style={{
                  height: '35px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block'
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('mobile-world-compact-logo.png')) {
                    target.src = '/assets/mobile-world-compact-logo.png';
                  }
                }}
              />
            </a>

            {/* CENTRE: Core Desktop Navigation (Raphus-style pill switcher) */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                backgroundColor: '#F4F4F4',
                padding: '0.25rem 0.5rem',
                borderRadius: '9999px',
                border: '1px solid rgba(0, 0, 0, 0.04)'
              }}
              className="hidden lg:flex"
            >
              {navLinks.map((link) => {
                const isActive = currentPath === link.path || 
                  (link.path !== '/' && currentPath.startsWith(link.path));
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path)}
                    style={{
                      background: isActive ? '#FFFFFF' : 'none',
                      border: 'none',
                      color: isActive ? '#1B1D1E' : '#4B5563',
                      fontSize: '0.865rem',
                      fontWeight: isActive ? 600 : 500,
                      cursor: 'pointer',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '9999px',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      boxShadow: isActive ? '0 2px 6px rgba(0, 0, 0, 0.06)' : 'none',
                      transition: 'all 180ms ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#1B1D1E';
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#4B5563';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </div>

            {/* RIGHT: Actions & Primary CTA */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem'
              }}
            >
              {/* Search Trigger */}
              <button
                onClick={onOpenSearch}
                aria-label="Suche öffnen"
                title="Suche (Modelle, Reparaturen, Shop)"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#4B5563',
                  cursor: 'pointer',
                  padding: '0.45rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  transition: 'all 180ms ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#1B1D1E';
                  e.currentTarget.style.backgroundColor = '#F4F4F4';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#4B5563';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Search size={18} />
              </button>

              {/* Cart Drawer Trigger with Badge */}
              <button
                onClick={() => setIsCartOpen(true)}
                aria-label={`Warenkorb (${totalItems} Artikel)`}
                title="Warenkorb öffnen"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#4B5563',
                  cursor: 'pointer',
                  padding: '0.45rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  position: 'relative',
                  transition: 'all 180ms ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#1B1D1E';
                  e.currentTarget.style.backgroundColor = '#F4F4F4';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#4B5563';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
                      backgroundColor: '#4928FD',
                      color: '#FFFFFF',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      width: '17px',
                      height: '17px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid #FFFFFF',
                      boxShadow: '0 2px 6px rgba(73, 40, 253, 0.4)'
                    }}
                  >
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Customer Account Trigger */}
              <button
                onClick={() => handleNavClick(isAuthenticated ? '/account' : '/account')}
                aria-label={isAuthenticated ? `Kundenkonto (${user?.fullName})` : 'Anmelden'}
                title={isAuthenticated ? `Kundenkonto (${user?.fullName})` : 'Kunden-Login'}
                style={{
                  background: 'none',
                  border: 'none',
                  color: currentPath.startsWith('/account') ? '#4928FD' : '#4B5563',
                  cursor: 'pointer',
                  padding: '0.45rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  transition: 'all 180ms ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#1B1D1E';
                  e.currentTarget.style.backgroundColor = '#F4F4F4';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = currentPath.startsWith('/account') ? '#4928FD' : '#4B5563';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <User size={18} />
              </button>

              {/* Primary Header CTA — Sliding Pill Badge */}
              <button
                onClick={() => handleNavClick('/repair-prices')}
                className="hidden sm:inline-flex btn-raphus-slide btn-raphus-slide-filled btn-raphus-slide-sm"
                style={{ minHeight: '38px', padding: '0.4rem 2.4rem' }}
              >
                <span className="btn-slide-badge" style={{ width: '26px', height: '26px', left: '6px' }}>
                  <ArrowRight size={13} className="btn-slide-icon" />
                </span>
                <span className="btn-slide-text" style={{ fontSize: '0.84rem' }}>Reparaturpreis</span>
              </button>

              {/* Mobile Hamburger Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex lg:hidden"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1B1D1E',
                  cursor: 'pointer',
                  padding: '0.45rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%'
                }}
                aria-label={mobileMenuOpen ? 'Menü schliessen' : 'Menü öffnen'}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 49,
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '6rem 1.5rem 2.5rem',
            overflowY: 'auto'
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px', width: '100%', margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.9rem 1.25rem',
                      backgroundColor: isActive ? 'rgba(23, 76, 255, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                      border: isActive ? '1px solid rgba(23, 76, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '14px',
                      color: isActive ? '#93C5FD' : '#FFFFFF',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 150ms ease'
                    }}
                  >
                    <span>{link.label}</span>
                    <ChevronRight size={16} className="text-slate-400" />
                  </button>
                );
              })}
            </div>

            {/* Mobile CTAs & Contacts */}
            <div style={{ marginTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={() => handleNavClick('/repair-prices')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  backgroundColor: '#174CFF',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '0.9rem',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  boxShadow: '0 4px 16px rgba(23, 76, 255, 0.4)'
                }}
              >
                <Wrench size={18} />
                <span>Reparaturpreis online berechnen</span>
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <a
                  href="tel:+41443022424"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '0.75rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  <Phone size={15} className="text-blue-400" />
                  <span>Anrufen</span>
                </a>
                <a
                  href="https://wa.me/41783448888"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '0.75rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  <MessageSquare size={15} className="text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Footer Meta */}
          <div style={{ textAlign: 'center', color: '#94A3B8', fontSize: '0.75rem', marginTop: '2rem' }}>
            <p>Mobile World Zürich Seebach · Schaffhauserstrasse 455</p>
            <p style={{ marginTop: '0.25rem' }}>Mo–Fr 09:00–19:00 · Sa 10:00–18:00</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
