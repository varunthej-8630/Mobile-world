import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';

interface CinematicIntroProps {
  onIntroComplete?: () => void;
}

const STORAGE_KEY = 'mw_intro_played_session_v1';

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onIntroComplete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasTriggeredFadeRef = useRef(false);

  useEffect(() => {
    // 1. Check if user already saw the intro during this browser session
    const hasSeenIntro = sessionStorage.getItem(STORAGE_KEY);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeenIntro || prefersReducedMotion) {
      window.dispatchEvent(new CustomEvent('mw-intro-complete'));
      if (onIntroComplete) onIntroComplete();
      return;
    }

    // 2. Lock body scroll during intro
    document.body.style.overflow = 'hidden';
    setIsVisible(true);

    return () => {
      document.body.style.overflow = '';
    };
  }, [onIntroComplete]);

  const handleFinish = (instant: boolean = false) => {
    if (hasTriggeredFadeRef.current && !instant) return;
    hasTriggeredFadeRef.current = true;

    // Remember in session
    sessionStorage.setItem(STORAGE_KEY, 'true');

    if (instant) {
      setIsVisible(false);
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('mw-intro-complete'));
      if (onIntroComplete) onIntroComplete();
      return;
    }

    // Trigger smooth 800ms crossfade dissolve: start hero video rolling underneath immediately
    setIsFadingOut(true);
    window.dispatchEvent(new CustomEvent('mw-intro-start-fade'));
    setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('mw-intro-complete'));
      if (onIntroComplete) onIntroComplete();
    }, 850);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    
    // Begin dissolving 900ms before natural video end
    if (duration > 0 && currentTime >= duration - 0.95) {
      handleFinish(false);
    }
  };

  const handleVideoError = () => {
    // Graceful fallback if video file fails or codec unsupported
    handleFinish(true);
  };

  if (!isVisible) return null;

  return (
    <div
      aria-label="Mobile World Intro Animation"
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#0a0c10', // Exact match for intro video letterbox/corner tones
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        opacity: isFadingOut ? 0 : 1,
        transform: isFadingOut ? 'scale(1.02)' : 'scale(1)',
        transition: 'opacity 850ms cubic-bezier(0.16, 1, 0.3, 1), transform 850ms cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isFadingOut ? 'none' : 'auto'
      }}
    >
      {/* Intact 16:9 Cinematic Video Display with Zero Distortion */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => handleFinish(false)}
          onError={handleVideoError}
          style={{
            maxWidth: '100vw',
            maxHeight: '100vh',
            width: '100%',
            height: '100%',
            objectFit: 'contain', // Preserves exact 16:9 composition with zero distortion
            display: 'block',
            backgroundColor: '#0a0c10'
          }}
        >
          <source src="/videos/intro-mobileworld.mp4" type="video/mp4" />
          <source src="/assets/intro-mobileworld.mp4" type="video/mp4" />
        </video>

        {/* Discreet & Accessible Skip Option */}
        <button
          onClick={() => handleFinish(false)}
          aria-label="Intro überspringen"
          style={{
            position: 'absolute',
            bottom: '28px',
            right: '28px',
            backgroundColor: 'rgba(16, 19, 24, 0.65)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            color: 'rgba(255, 255, 255, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '9999px',
            padding: '0.45rem 1rem',
            fontSize: '0.785rem',
            fontWeight: 500,
            letterSpacing: '0.04em',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            cursor: 'pointer',
            transition: 'all 200ms ease',
            zIndex: 10
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.backgroundColor = 'rgba(23, 76, 255, 0.75)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)';
            e.currentTarget.style.backgroundColor = 'rgba(16, 19, 24, 0.65)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
          }}
        >
          <span>Überspringen</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
};
