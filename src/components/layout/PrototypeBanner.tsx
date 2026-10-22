import React, { useState } from 'react';
import { ShieldAlert, Settings, X, Play } from 'lucide-react';

interface PrototypeBannerProps {
  onNavigate?: (path: string) => void;
}

export const PrototypeBanner: React.FC<PrototypeBannerProps> = ({ onNavigate }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleReplayIntro = () => {
    sessionStorage.removeItem('mw_intro_played_session_v1');
    window.location.hash = '/';
    window.location.reload();
  };

  return (
    <div 
      aria-label="Prototyp-Hinweis"
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        zIndex: 45,
        backgroundColor: 'rgba(16, 19, 24, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        color: '#F5F6F8',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '12px',
        padding: '0.45rem 0.85rem',
        fontSize: '0.785rem',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        maxWidth: '440px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          backgroundColor: 'rgba(23, 76, 255, 0.25)',
          color: '#7096FF',
          padding: '0.15rem 0.45rem',
          borderRadius: '4px',
          fontWeight: 700,
          fontSize: '0.7rem',
          letterSpacing: '0.04em'
        }}>
          <ShieldAlert size={11} /> CLIENT DEMO
        </span>
        <span style={{ color: '#CBD5E1', fontSize: '0.75rem' }} className="hidden sm:inline">
          Mobile World ZH Seebach
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <button
          onClick={handleReplayIntro}
          title="Cinematic Intro erneut ansehen"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            backgroundColor: 'rgba(23, 76, 255, 0.2)',
            border: '1px solid rgba(23, 76, 255, 0.4)',
            color: '#7096FF',
            padding: '0.25rem 0.55rem',
            borderRadius: '6px',
            fontSize: '0.72rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <Play size={10} fill="#7096FF" /> Intro
        </button>

        <button
          onClick={() => onNavigate && onNavigate('/admin')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#FFFFFF',
            padding: '0.25rem 0.6rem',
            borderRadius: '6px',
            fontSize: '0.72rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <Settings size={11} /> Admin
        </button>

        <button
          onClick={() => setDismissed(true)}
          aria-label="Schliessen"
          style={{
            background: 'none',
            border: 'none',
            color: '#94A3B8',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: '2px'
          }}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
