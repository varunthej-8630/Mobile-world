import React, { useState } from 'react';
import { ShieldAlert, Settings, X, ChevronRight } from 'lucide-react';

interface PrototypeBannerProps {
  onNavigate?: (path: string) => void;
}

export const PrototypeBanner: React.FC<PrototypeBannerProps> = ({ onNavigate }) => {
  const [minimized, setMinimized] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  if (minimized) {
    return (
      <div 
        style={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
          zIndex: 40,
          pointerEvents: 'auto'
        }}
      >
        <button
          onClick={() => setMinimized(false)}
          className="group"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            backdropFilter: 'blur(12px)',
            color: '#F8FAFC',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            borderRadius: '9999px',
            padding: '0.35rem 0.65rem',
            fontSize: '0.72rem',
            fontWeight: 600,
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
            cursor: 'pointer',
            transition: 'all 200ms ease'
          }}
          title="Demo-Navigation öffnen"
        >
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#10B981',
            display: 'inline-block'
          }} />
          <span style={{ color: '#94A3B8' }}>Demo</span>
          <Settings size={12} className="text-slate-300 group-hover:rotate-45 transition-transform" />
        </button>
      </div>
    );
  }

  return (
    <div 
      aria-label="Prototyp-Hinweis"
      style={{
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        zIndex: 40,
        backgroundColor: 'rgba(15, 23, 42, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        color: '#F8FAFC',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        borderRadius: '14px',
        padding: '0.5rem 0.85rem',
        fontSize: '0.78rem',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.35)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        maxWidth: '380px',
        animation: 'fadeIn 200ms ease'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          backgroundColor: 'rgba(23, 76, 255, 0.3)',
          color: '#93C5FD',
          padding: '0.15rem 0.45rem',
          borderRadius: '6px',
          fontWeight: 700,
          fontSize: '0.68rem',
          letterSpacing: '0.04em'
        }}>
          <ShieldAlert size={11} /> CLIENT DEMO
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <button
          onClick={() => onNavigate && onNavigate('/admin')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            backgroundColor: '#174CFF',
            border: 'none',
            color: '#FFFFFF',
            padding: '0.25rem 0.65rem',
            borderRadius: '6px',
            fontSize: '0.72rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          <Settings size={11} /> Admin
        </button>

        <button
          onClick={() => setMinimized(true)}
          aria-label="Minimieren"
          title="Minimieren"
          style={{
            background: 'none',
            border: 'none',
            color: '#94A3B8',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
