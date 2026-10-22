import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  ChevronRight
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
  const [progressState, setProgressState] = useState(0);
  const [isMobileView, setIsMobileView] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false
  );
  const { totalItems, setIsCartOpen } = useCart();
  const { isAuthenticated, user } = useAuth();

  const isHome = currentPath === '/';

  // Refs for direct GPU 120fps transforms
  const headerLogoSlotRef = useRef<HTMLDivElement | null>(null);
  const dockedLogoImgRef = useRef<HTMLImageElement | null>(null);
  const morphLogoRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const navLinksRef = useRef<HTMLDivElement | null>(null);
  const navActionsRef = useRef<HTMLDivElement | null>(null);
  const headerBrandTextRef = useRef<HTMLSpanElement | null>(null);
  const tickingRef = useRef(false);

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

  // Measured coordinates for compact circular logo morph
  const coordsRef = useRef({
    startX: typeof window !== 'undefined' ? window.innerWidth / 2 : 600,
    startY: typeof window !== 'undefined' ? window.innerHeight / 2 : 400,
    startW: 210,
    startH: 210,
    endX: 95,
    endY: 38,
    endW: 40,
    endH: 40,
    targetScale: 0.19
  });

  const measure = useCallback(() => {
    if (typeof window === 'undefined') return;

    const isMobile = window.innerWidth < 768;

    // 1. Destination: Header 40x40 circular logo slot inside nav capsule
    let endX = isMobile ? 65 : 95;
    let endY = isMobile ? 32 : 38;
    const endW = 40;
    const endH = 40;

    if (headerLogoSlotRef.current) {
      const slotRect = headerLogoSlotRef.current.getBoundingClientRect();
      if (slotRect.width > 0 && slotRect.height > 0) {
        endX = slotRect.left + slotRect.width / 2;
        endY = slotRect.top + slotRect.height / 2;
      }
    }

    // 2. Start: Exact center of Hero section anchor (1:1 circle)
    let startW = isMobile ? 160 : 210;
    let startH = startW;
    let startX = window.innerWidth / 2;
    let startY = window.innerHeight / 2;

    const anchor = document.getElementById('hero-logo-anchor');
    if (anchor) {
      const anchorRect = anchor.getBoundingClientRect();
      if (anchorRect.width > 0 && anchorRect.height > 0) {
        startX = anchorRect.left + anchorRect.width / 2;
        // Calculate document-level top so it remains accurate regardless of initial scroll position
        startY = (anchorRect.top + window.scrollY) + anchorRect.height / 2;
        startW = anchorRect.width;
        startH = anchorRect.height;
      }
    }

    const targetScale = startW > 0 ? endW / startW : 0.19;

    coordsRef.current = {
      startX,
      startY,
      startW,
      startH,
      endX,
      endY,
      endW,
      endH,
      targetScale
    };

    if (morphLogoRef.current) {
      morphLogoRef.current.style.width = `${startW}px`;
      morphLogoRef.current.style.height = `${startH}px`;
    }
  }, []);

  const updateMorph = useCallback(() => {
    tickingRef.current = false;
    if (typeof window === 'undefined') return;

    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 20);

    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      if (dockedLogoImgRef.current) dockedLogoImgRef.current.style.opacity = '1';
      if (headerBrandTextRef.current) headerBrandTextRef.current.style.opacity = '1';
      if (navActionsRef.current) {
        navActionsRef.current.style.opacity = '1';
        navActionsRef.current.style.pointerEvents = 'auto';
      }
      if (navRef.current) {
        navRef.current.style.backgroundColor = scrollY > 20 ? 'rgba(16, 19, 24, 0.95)' : 'rgba(16, 19, 24, 0.88)';
        navRef.current.style.borderColor = 'rgba(255, 255, 255, 0.16)';
        navRef.current.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
        navRef.current.style.backdropFilter = 'blur(20px)';
        (navRef.current.style as any).webkitBackdropFilter = 'blur(20px)';
      }
      return;
    }

    if (!isHome) {
      if (dockedLogoImgRef.current) dockedLogoImgRef.current.style.opacity = '1';
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const threshold = Math.min(window.innerHeight * 0.5, 360);
    const rawProgress = Math.min(1, Math.max(0, scrollY / threshold));

    let progress: number;
    if (prefersReducedMotion) {
      progress = scrollY > 80 ? 1 : 0;
    } else {
      // Smoothstep easing for physical fluidity
      progress = rawProgress * rawProgress * (3 - 2 * rawProgress);
    }

    setProgressState(rawProgress);

    // Dynamic destination slot center: gets exact real-time slot center
    let { startX, startY, startW, startH, targetScale } = coordsRef.current;
    let endX = coordsRef.current.endX;
    let endY = coordsRef.current.endY;

    if (headerLogoSlotRef.current) {
      const slotRect = headerLogoSlotRef.current.getBoundingClientRect();
      if (slotRect.width > 0 && slotRect.height > 0) {
        endX = slotRect.left + slotRect.width / 2;
        endY = slotRect.top + slotRect.height / 2;
        coordsRef.current.endX = endX;
        coordsRef.current.endY = endY;
      }
    }

    // Hero anchor in current viewport coordinates as page scrolls
    const heroCenterInViewport = startY - scrollY;
    // Interpolate smoothly from current hero viewport position to header slot center
    const currentX = startX + (endX - startX) * progress;
    const currentY = heroCenterInViewport + (endY - heroCenterInViewport) * progress;
    const currentScale = 1.0 + (targetScale - 1.0) * progress;

    const isDocked = rawProgress >= 0.92;

    if (morphLogoRef.current) {
      morphLogoRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(${currentScale})`;
      morphLogoRef.current.style.opacity = isDocked ? '0' : '1';
      morphLogoRef.current.style.pointerEvents = isDocked ? 'none' : (rawProgress > 0.75 ? 'auto' : 'none');

      const haloBlur = Math.round(18 - progress * 12);
      const ambientBlur = Math.round(30 - progress * 20);
      const haloOpacity = (0.95 - progress * 0.2).toFixed(2);
      const ambientOpacity = (0.5 - progress * 0.25).toFixed(2);
      morphLogoRef.current.style.filter = `drop-shadow(0 ${Math.round(4 - progress * 3)}px ${haloBlur}px rgba(255, 255, 255, ${haloOpacity})) drop-shadow(0 0 ${ambientBlur}px rgba(23, 76, 255, ${ambientOpacity}))`;
    }

    if (dockedLogoImgRef.current) {
      dockedLogoImgRef.current.style.opacity = isDocked ? '1' : '0';
    }

    if (navRef.current) {
      const bgAlpha = (0.88 * Math.min(1, Math.max(0, (rawProgress - 0.15) / 0.65))).toFixed(3);
      const borderAlpha = (0.14 * Math.min(1, Math.max(0, (rawProgress - 0.15) / 0.65))).toFixed(3);
      const shadowAlpha = (0.45 * Math.min(1, Math.max(0, (rawProgress - 0.15) / 0.65))).toFixed(3);

      navRef.current.style.backgroundColor = `rgba(16, 19, 24, ${bgAlpha})`;
      navRef.current.style.borderColor = `rgba(255, 255, 255, ${borderAlpha})`;
      navRef.current.style.boxShadow = `0 16px 40px rgba(0, 0, 0, ${shadowAlpha})`;
      navRef.current.style.backdropFilter = rawProgress > 0.2 ? 'blur(20px)' : 'none';
      (navRef.current.style as any).webkitBackdropFilter = rawProgress > 0.2 ? 'blur(20px)' : 'none';
    }

    if (headerBrandTextRef.current) {
      const brandOpacity = Math.min(1, Math.max(0, (rawProgress - 0.35) / 0.5));
      headerBrandTextRef.current.style.opacity = `${brandOpacity}`;
    }

    if (navLinksRef.current) {
      const linksOpacity = Math.min(1, Math.max(0, (rawProgress - 0.28) / 0.58));
      navLinksRef.current.style.opacity = `${linksOpacity}`;
      navLinksRef.current.style.pointerEvents = linksOpacity > 0.7 ? 'auto' : 'none';
    }

    if (navActionsRef.current) {
      const actionsOpacity = Math.min(1, Math.max(0, (rawProgress - 0.2) / 0.65));
      navActionsRef.current.style.opacity = `${actionsOpacity}`;
      navActionsRef.current.style.pointerEvents = actionsOpacity > 0.7 ? 'auto' : 'none';
    }
  }, [isHome]);

  useEffect(() => {
    measure();
    updateMorph();

    const handleScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(updateMorph);
      }
    };

    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
      measure();
      updateMorph();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    const timer = setTimeout(() => {
      setIsMobileView(window.innerWidth < 1024);
      measure();
      updateMorph();
    }, 200);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [measure, updateMorph, currentPath]);

  const navLinks = [
    { label: 'Reparaturen', path: '/repairs' },
    { label: 'Preise', path: '/repair-prices' },
    { label: 'Handyabos', path: '/subscriptions' },
    { label: 'Shop', path: '/shop' },
    { label: 'Services', path: '/services' },
    { label: 'Filiale Seebach', path: '/locations/seebach' }
  ];

  const handleNavClick = (path: string) => {
    if (path === '/' && isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigate(path);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* =========================================================================
          THE DEFINING SIGNATURE INTERACTION: SHARED MORPHING COMPACT LOGO LAYER
          Single continuous Mobile World circular emblem traveling smoothly from hero center to header slot (Desktop)
          ========================================================================= */}
      {isHome && !isMobileView && (
        <div
          ref={morphLogoRef}
          onClick={() => handleNavClick('/')}
          aria-label="Mobile World Zürich — Zur Startseite"
          title="Mobile World Zürich"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: `${coordsRef.current.startW}px`,
            height: `${coordsRef.current.startH}px`,
            transformOrigin: 'center center',
            zIndex: 60,
            cursor: progressState > 0.75 ? 'pointer' : 'default',
            pointerEvents: progressState > 0.75 ? 'auto' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            willChange: 'transform, filter, opacity',
            transition: 'opacity 150ms ease'
          }}
        >
          <img
            src="/assets/mobile-world-compact-logo.png"
            alt="Mobile World Zürich"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              aspectRatio: '1 / 1'
            }}
          />
        </div>
      )}

      {/* FLOATING CINEMATIC GLASS HEADER */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: isMobileView ? '0.5rem 0.75rem' : (isScrolled ? '0.75rem 1rem' : '1.25rem 1.5rem'),
          pointerEvents: 'none',
          transition: 'padding 300ms cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div 
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            width: '100%',
            pointerEvents: (!isHome || isMobileView) ? 'auto' : (progressState < 0.6 ? 'none' : 'auto')
          }}
        >
          <nav
            ref={navRef}
            style={{
              backgroundColor: (!isHome || isMobileView)
                ? (isScrolled ? 'rgba(16, 19, 24, 0.94)' : 'rgba(16, 19, 24, 0.88)')
                : 'rgba(16, 19, 24, 0)',
              backdropFilter: (!isHome || isMobileView) ? 'blur(20px)' : 'none',
              WebkitBackdropFilter: (!isHome || isMobileView) ? 'blur(20px)' : 'none',
              border: (!isHome || isMobileView)
                ? '1px solid rgba(255, 255, 255, 0.14)'
                : '1px solid rgba(255, 255, 255, 0)',
              borderRadius: '9999px',
              padding: isMobileView ? '0.4rem 0.75rem' : (isScrolled ? '0.5rem 1.25rem' : '0.65rem 1.5rem'),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: (!isHome || isMobileView)
                ? '0 16px 40px rgba(0, 0, 0, 0.45)'
                : 'none',
              transition: 'padding 300ms cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* LEFT: Official Compact Logo + Brand Name */}
            <div 
              onClick={() => handleNavClick('/')}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                flexShrink: 0
              }}
              aria-label="Mobile World Zürich"
            >
              {/* Circular slot where the emblem docks seamlessly */}
              <div 
                ref={headerLogoSlotRef}
                style={{
                  width: isMobileView ? '34px' : '40px',
                  height: isMobileView ? '34px' : '40px',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                <img
                  ref={dockedLogoImgRef}
                  src="/assets/mobile-world-compact-logo.png"
                  alt="Mobile World Zürich"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    filter: 'drop-shadow(0 1px 6px rgba(255, 255, 255, 0.7))',
                    opacity: (!isHome || isMobileView) ? 1 : 0,
                    transition: 'opacity 150ms ease'
                  }}
                />
              </div>

              {/* Minimal Brand Label in Header */}
              <span
                ref={headerBrandTextRef}
                style={{
                  fontWeight: 700,
                  fontSize: isMobileView ? '0.95rem' : '1.05rem',
                  letterSpacing: '-0.02em',
                  color: '#FFFFFF',
                  whiteSpace: 'nowrap',
                  lineHeight: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  opacity: (!isHome || isMobileView) ? 1 : 0,
                  transition: 'opacity 200ms ease'
                }}
              >
                Mobile World
              </span>
            </div>

            {/* CENTRE: Concise Navigation Links (Desktop) */}
            <div 
              ref={navLinksRef}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.75rem',
                opacity: !isHome ? 1 : 0,
                transition: 'color 180ms ease'
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
                      background: 'none',
                      border: 'none',
                      color: isActive ? '#FFFFFF' : 'rgba(241, 245, 249, 0.82)',
                      fontSize: '0.885rem',
                      fontWeight: isActive ? 600 : 500,
                      cursor: 'pointer',
                      padding: '0.4rem 0',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      transition: 'color 180ms ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = 'rgba(241, 245, 249, 0.82)';
                    }}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '-4px',
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          backgroundColor: '#174CFF'
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* RIGHT: Restrained Actions & Primary CTA */}
            <div 
              ref={navActionsRef}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: isMobileView ? '0.35rem' : '0.65rem',
                opacity: (!isHome || isMobileView) ? 1 : 0,
                pointerEvents: (!isHome || isMobileView) ? 'auto' : 'none'
              }}
            >
              {/* Restrained Search Trigger */}
              <button
                onClick={onOpenSearch}
                aria-label="Suche öffnen"
                title="Suche (Modelle, Reparaturen, Shop)"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.75)',
                  cursor: 'pointer',
                  padding: '0.45rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  transition: 'all 180ms ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Search size={18} />
              </button>

              {/* Cart Trigger with Subtle Counter */}
              <button
                onClick={() => setIsCartOpen(true)}
                aria-label="Warenkorb öffnen"
                title="Warenkorb"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.75)',
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
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)';
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
                      backgroundColor: '#174CFF',
                      color: '#FFFFFF',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Customer Account Trigger (Desktop & Tablet) */}
              <button
                onClick={() => handleNavClick(isAuthenticated ? '/account/profile' : '/account')}
                aria-label="Kundenkonto"
                title={isAuthenticated ? `Konto: ${user?.fullName}` : 'Anmelden'}
                className="hidden sm:flex"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.75)',
                  cursor: 'pointer',
                  padding: '0.45rem',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  transition: 'all 180ms ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <User size={18} />
              </button>

              {/* ONE Distinctive Primary Action Button (Desktop & Tablet) */}
              <button
                onClick={() => handleNavClick('/repair-prices')}
                className="hidden md:flex"
                style={{
                  backgroundColor: '#174CFF',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: isScrolled ? '0.45rem 1.15rem' : '0.55rem 1.35rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  alignItems: 'center',
                  gap: '0.45rem',
                  cursor: 'pointer',
                  transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 4px 14px rgba(23, 76, 255, 0.35)',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#0E3CD4';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(23, 76, 255, 0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#174CFF';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(23, 76, 255, 0.35)';
                }}
              >
                <Wrench size={14} />
                <span>Reparaturpreis</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Navigation schliessen' : 'Navigation öffnen'}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#FFFFFF',
                  padding: '0.45rem',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                className="flex lg:hidden"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* FULL-HEIGHT MOBILE CINEMATIC DRAWER */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 70,
            backgroundColor: 'rgba(16, 19, 24, 0.96)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '1.5rem',
            animation: 'fadeIn 200ms ease'
          }}
        >
          {/* Drawer Top */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <img
                  src="/assets/mobile-world-compact-logo.png"
                  alt="Mobile World Zürich"
                  style={{ 
                    height: '36px', 
                    width: '36px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 1px 6px rgba(255, 255, 255, 0.8))'
                  }}
                />
                <span style={{ fontWeight: 700, fontSize: '1.15rem', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                  Mobile World
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Schliessen"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  style={{
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    color: currentPath === link.path ? '#174CFF' : '#FFFFFF',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    padding: '0.75rem 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span>{link.label}</span>
                  <ChevronRight size={18} color="rgba(255, 255, 255, 0.4)" />
                </button>
              ))}

              {/* Mobile Account Access */}
              <button
                onClick={() => handleNavClick(isAuthenticated ? '/account/profile' : '/account')}
                style={{
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  color: currentPath.startsWith('/account') ? '#174CFF' : '#FFFFFF',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  padding: '0.75rem 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <User size={20} color="#174CFF" />
                  <span>{isAuthenticated ? `Konto (${user?.fullName || 'Angemeldet'})` : 'Kundenkonto / Anmelden'}</span>
                </div>
                <ChevronRight size={18} color="rgba(255, 255, 255, 0.4)" />
              </button>
            </div>

            {/* Prominent Mobile Repair CTA */}
            <div style={{ marginTop: '2rem' }}>
              <button
                onClick={() => handleNavClick('/repair-prices')}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '0.85rem',
                  fontSize: '1rem',
                  borderRadius: '12px'
                }}
              >
                <Wrench size={18} />
                <span>Reparaturpreis online ermitteln</span>
              </button>
            </div>
          </div>

          {/* Drawer Bottom Utility Contacts */}
          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.12)', paddingTop: '1.25rem', color: '#94A3B8', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#FFFFFF' }}>
              <MapPin size={15} color="#174CFF" />
              <span>Schaffhauserstrasse 455, 8052 Zürich</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
              <a href="tel:+41445436333" style={{ color: '#174CFF', display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600 }}>
                <Phone size={14} /> +41 44 543 63 33
              </a>
              <a href="https://wa.me/41783448888" target="_blank" rel="noopener noreferrer" style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600 }}>
                <MessageSquare size={14} /> WhatsApp Support
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Header;
