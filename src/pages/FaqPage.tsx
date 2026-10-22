import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, ChevronUp, MessageSquare, Phone } from 'lucide-react';
import { FAQS } from '../data/faqs';

interface FaqPageProps {
  onNavigate: (path: string) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-3', 'faq-4']);

  const toggleFaq = (id: string) => {
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredFaqs = FAQS.filter(faq => {
    if (activeCategory !== 'all' && faq.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div style={{ backgroundColor: '#F5F6F8', paddingBottom: '6rem' }}>
      <div style={{ backgroundColor: '#101318', color: '#FFFFFF', padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '850px', textAlign: 'center' }}>
          <span className="section-eyebrow" style={{ color: '#7096FF' }}>Hilfe &amp; Antworten</span>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            color: '#FFFFFF',
            fontFamily: 'var(--font-heading)',
            marginBottom: '1.25rem',
            lineHeight: 1.15
          }}>
            Häufig gestellte Fragen (FAQ)
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            Finden Sie schnelle Antworten zu unseren Reparaturpreisen, Garantieleistungen, Handyabos und dem Ablauf vor Ort in Zürich Seebach.
          </p>

          {/* Search Input */}
          <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto' }}>
            <Search size={18} color="#64748B" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Frage oder Suchbegriff eingeben..."
              className="form-control"
              style={{
                paddingLeft: '2.75rem',
                paddingRight: '1rem',
                borderRadius: '24px',
                backgroundColor: '#FFFFFF',
                color: '#101318',
                fontSize: '1rem',
                border: 'none',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
              }}
            />
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '3.5rem', maxWidth: '900px' }}>
        {/* Category Filter Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: '2.5rem'
        }}>
          {[
            { id: 'all', label: 'Alle Fragen' },
            { id: 'repairs', label: 'Reparaturen' },
            { id: 'warranty', label: 'Garantie & Qualität' },
            { id: 'subscriptions', label: 'Handyabos' },
            { id: 'shop', label: 'Shop & Lager' },
            { id: 'account', label: 'Kundenkonto' },
            { id: 'business', label: 'Firmenkunden' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                backgroundColor: activeCategory === tab.id ? '#174CFF' : '#FFFFFF',
                border: '1px solid',
                borderColor: activeCategory === tab.id ? '#174CFF' : '#E2E6EC',
                color: activeCategory === tab.id ? '#FFFFFF' : '#334155',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredFaqs.map(faq => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #DFE3E9',
                  overflow: 'hidden',
                  transition: 'box-shadow 0.15s ease'
                }}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    padding: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: '#101318'
                  }}
                >
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                    {faq.question}
                  </span>
                  <div style={{
                    backgroundColor: isOpen ? 'rgba(23, 76, 255, 0.1)' : '#F1F5F9',
                    color: isOpen ? '#174CFF' : '#64748B',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 1.5rem 1.5rem',
                    color: '#475569',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    borderTop: '1px solid #F1F5F9',
                    paddingTop: '1rem'
                  }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #DFE3E9',
              padding: '3rem',
              textAlign: 'center',
              color: '#64748B'
            }}>
              <HelpCircle size={40} color="#CBD5E1" style={{ margin: '0 auto 1rem' }} />
              <h4>Keine passenden Fragen gefunden</h4>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Haben Sie eine spezifische Frage? Kontaktieren Sie unser Team direkt.
              </p>
            </div>
          )}
        </div>

        {/* Fallback Contact Box */}
        <div style={{
          marginTop: '4rem',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #DFE3E9',
          padding: '2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>
              Ihre Frage ist hier nicht beantwortet?
            </h3>
            <p style={{ color: '#64748B', maxWidth: '550px', fontSize: '0.95rem' }}>
              Unser Team in Zürich Seebach steht Ihnen gerne persönlich per Telefon oder WhatsApp zur Verfügung.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/41783448888"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <MessageSquare size={16} /> WhatsApp Frage
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
