import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink 
} from 'lucide-react';
import { BRANCHES } from '../../data/branches';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const seebach = BRANCHES[0];

  return (
    <footer style={{
      backgroundColor: '#101318',
      color: '#AAB2C0',
      paddingTop: '4.5rem',
      paddingBottom: '2.5rem',
      borderTop: '1px solid #1E2530',
      marginTop: 'auto'
    }}>
      <div className="container">
        {/* Top Feature Banner */}
        <div
          className="p-5 sm:p-7 md:p-8"
          style={{
            backgroundColor: '#181D26',
            borderRadius: '16px',
            border: '1px solid #262E3B',
            marginBottom: '4rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: '2rem'
          }}
        >
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{
              backgroundColor: 'rgba(23, 76, 255, 0.15)',
              color: '#7096FF',
              padding: '0.75rem',
              borderRadius: '10px'
            }}>
              <Clock size={24} />
            </div>
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', marginBottom: '0.25rem' }}>30–60 Min Express</h4>
              <p style={{ fontSize: '0.875rem', color: '#94A3B8' }}>Schnellreparatur vor Ort in Zürich Seebach für Displays &amp; Akkus.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              color: '#10B981',
              padding: '0.75rem',
              borderRadius: '10px'
            }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', marginBottom: '0.25rem' }}>6 Monate Garantie</h4>
              <p style={{ fontSize: '0.875rem', color: '#94A3B8' }}>Schweizer Garantie auf alle verbauten Qualitäts- &amp; OEM-Ersatzteile.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{
              backgroundColor: 'rgba(217, 255, 112, 0.15)',
              color: '#D9FF70',
              padding: '0.75rem',
              borderRadius: '10px'
            }}>
              <MessageSquare size={24} />
            </div>
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', marginBottom: '0.25rem' }}>Persönliche Beratung</h4>
              <p style={{ fontSize: '0.875rem', color: '#94A3B8' }}>Direkter Draht via WhatsApp oder im Laden ohne Callcenter-Warteschlange.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
          gap: '2.5rem',
          marginBottom: '4rem'
        }}>
          {/* Brand Info */}
          <div>
            <img 
              src="/assets/logo-white.png" 
              alt="Mobile World Zürich" 
              style={{ height: '44px', width: 'auto', marginBottom: '1.25rem' }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/mw-logo.png';
              }}
            />
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#94A3B8', marginBottom: '1.5rem' }}>
              Ihr Schweizer Fachgeschäft für Express-Handyreparaturen, vertragsfreie Neugeräte, geprüfte Refurbished-Modelle und unabhängige Mobilfunk-Abos in Zürich.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a 
                href="https://wa.me/41783448888" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline-white btn-sm"
              >
                <MessageSquare size={14} /> WhatsApp Chat
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: '1.25rem', fontFamily: 'var(--font-heading)' }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <li>
                <a href="#/repairs" onClick={(e) => { e.preventDefault(); onNavigate('/repairs'); }} style={{ color: '#AAB2C0', transition: 'color 0.15s' }}>
                  Reparatur-Services
                </a>
              </li>
              <li>
                <a href="#/repair-prices" onClick={(e) => { e.preventDefault(); onNavigate('/repair-prices'); }} style={{ color: '#AAB2C0', transition: 'color 0.15s' }}>
                  Reparaturpreise Rechner
                </a>
              </li>
              <li>
                <a href="#/subscriptions" onClick={(e) => { e.preventDefault(); onNavigate('/subscriptions'); }} style={{ color: '#AAB2C0', transition: 'color 0.15s' }}>
                  Handyabos (Sunrise, Salt, yallo)
                </a>
              </li>
              <li>
                <a href="#/shop" onClick={(e) => { e.preventDefault(); onNavigate('/shop'); }} style={{ color: '#AAB2C0', transition: 'color 0.15s' }}>
                  Online Shop &amp; Refurbished
                </a>
              </li>
              <li>
                <a href="#/buy-sell" onClick={(e) => { e.preventDefault(); onNavigate('/buy-sell'); }} style={{ color: '#AAB2C0', transition: 'color 0.15s' }}>
                  Handy An- &amp; Verkauf
                </a>
              </li>
              <li>
                <a href="#/business" onClick={(e) => { e.preventDefault(); onNavigate('/business'); }} style={{ color: '#AAB2C0', transition: 'color 0.15s' }}>
                  Firmen- &amp; Vereinsangebote
                </a>
              </li>
            </ul>
          </div>

          {/* Filialen / Standorte */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: '1.25rem', fontFamily: 'var(--font-heading)' }}>
              Filialen in Zürich
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.875rem' }}>
              <li>
                <strong style={{ color: '#FFFFFF', display: 'block' }}>Zürich Seebach (Hauptsitz)</strong>
                <span>Schaffhauserstrasse 455, 8052 Zürich</span>
                <br />
                <a href="#/locations/seebach" onClick={(e) => { e.preventDefault(); onNavigate('/locations/seebach'); }} style={{ color: '#174CFF', fontWeight: 600 }}>
                  Filiale ansehen &rarr;
                </a>
              </li>
              <li>
                <strong style={{ color: '#FFFFFF', display: 'block' }}>Bellevue-Stadelhofen</strong>
                <span>Gottfried-Keller-Strasse 5, 8001 Zürich</span>
              </li>
              <li>
                <strong style={{ color: '#FFFFFF', display: 'block' }}>Rüti ZH</strong>
                <span>Dorfstrasse 4, 8630 Rüti</span>
              </li>
              <li>
                <strong style={{ color: '#FFFFFF', display: 'block' }}>Oberengstringen</strong>
                <span>Im Zentrum 1, 8102 Oberengstringen</span>
              </li>
            </ul>
          </div>

          {/* Headquarters Direct Contact */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: '1.25rem', fontFamily: 'var(--font-heading)' }}>
              Kontakt Seebach
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <MapPin size={16} color="#174CFF" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  Schaffhauserstrasse 455<br />CH-8052 Zürich
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Phone size={16} color="#174CFF" style={{ flexShrink: 0 }} />
                <a href="tel:+41445436333" style={{ color: '#FFFFFF', fontWeight: 600 }}>
                  +41 44 543 63 33
                </a>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <MessageSquare size={16} color="#10B981" style={{ flexShrink: 0 }} />
                <a href="https://wa.me/41783448888" target="_blank" rel="noopener noreferrer" style={{ color: '#AAB2C0' }}>
                  +41 78 344 88 88 (WhatsApp)
                </a>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Mail size={16} color="#174CFF" style={{ flexShrink: 0 }} />
                <a href="mailto:info@mobileworldzh.ch" style={{ color: '#AAB2C0' }}>
                  info@mobileworldzh.ch
                </a>
              </div>
              <div style={{ marginTop: '0.5rem' }}>
                <a 
                  href={seebach.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-white btn-sm"
                  style={{ width: '100%' }}
                >
                  <MapPin size={13} /> Route in Google Maps <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div style={{
          borderTop: '1px solid #1E2530',
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.825rem'
        }}>
          <div>
            &copy; {new Date().getFullYear()} Mobile World GmbH, Zürich Seebach. Alle Rechte vorbehalten.
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="#/imprint" onClick={(e) => { e.preventDefault(); onNavigate('/imprint'); }} style={{ color: '#AAB2C0' }}>
              Impressum
            </a>
            <a href="#/privacy" onClick={(e) => { e.preventDefault(); onNavigate('/privacy'); }} style={{ color: '#AAB2C0' }}>
              Datenschutz
            </a>
            <a href="#/terms" onClick={(e) => { e.preventDefault(); onNavigate('/terms'); }} style={{ color: '#AAB2C0' }}>
              AGB
            </a>
            <a href="#/faq" onClick={(e) => { e.preventDefault(); onNavigate('/faq'); }} style={{ color: '#AAB2C0' }}>
              FAQ
            </a>
            <a href="#/admin" onClick={(e) => { e.preventDefault(); onNavigate('/admin'); }} style={{ color: '#174CFF', fontWeight: 600 }}>
              Staff Login
            </a>
          </div>

          <div style={{ color: '#64748B' }}>
            Konzept &amp; Prototyp von <a href="https://www.homiesstudio.com" target="_blank" rel="noopener noreferrer" style={{ color: '#D9FF70', fontWeight: 600 }}>Homies Studio</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
