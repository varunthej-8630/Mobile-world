import React, { useState, useMemo } from 'react';
import { Search, X, Wrench, ShoppingBag, ArrowRight } from 'lucide-react';
import { mockDb } from '../../data/mockDb';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  const products = mockDb.getProducts();
  const repairs = mockDb.getRepairs();

  const matchingProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      p => p.name.toLowerCase().includes(q) ||
           p.brand.toLowerCase().includes(q) ||
           p.sku.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [products, query]);

  const matchingRepairs = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return repairs.filter(
      r => r.model.toLowerCase().includes(q) ||
           r.manufacturer.toLowerCase().includes(q) ||
           r.repairTask.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [repairs, query]);

  // Lock body scroll when search modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key to close search
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content p-4 sm:p-6" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <Search size={22} color="#174CFF" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Suchen nach Geräten, Modellen, Reparaturen oder Zubehör..."
            className="form-control"
            style={{ fontSize: '1.05rem', padding: '0.85rem 1rem', flexGrow: 1 }}
          />
          <button
            onClick={onClose}
            aria-label="Suche schliessen"
            style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}
          >
            <X size={22} />
          </button>
        </div>

        {query.trim().length === 0 ? (
          <div style={{ padding: '1rem', color: '#64748B', fontSize: '0.9rem' }}>
            <div style={{ fontWeight: 600, color: '#101318', marginBottom: '0.5rem' }}>Häufige Suchbegriffe:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['iPhone 15 Pro Display', 'Samsung S24 Ultra', 'Akku tauschen', 'AirPods Pro', 'Sunrise Abo', 'Refurbished'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  style={{
                    backgroundColor: '#F1F5F9',
                    border: '1px solid #E2E6EC',
                    borderRadius: '20px',
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.825rem',
                    cursor: 'pointer',
                    color: '#334155'
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            {/* Products Results */}
            {matchingProducts.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#64748B',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem'
                }}>
                  <ShoppingBag size={14} /> Shop-Produkte ({matchingProducts.length})
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {matchingProducts.map(prod => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        onNavigate(`/product/${prod.id}`);
                        onClose();
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        backgroundColor: '#F8FAFC',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img
                          src={prod.imageUrl}
                          alt={prod.name}
                          style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                        />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#101318' }}>
                            {prod.name}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                            {prod.brand} • {prod.stockStatus === 'in_stock' ? 'An Lager' : 'Geringer Bestand'}
                          </div>
                        </div>
                      </div>
                      <div style={{ fontWeight: 700, color: '#174CFF' }}>
                        CHF {prod.priceChf.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Repair Results */}
            {matchingRepairs.length > 0 && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#64748B',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem'
                }}>
                  <Wrench size={14} /> Reparaturpreise ({matchingRepairs.length})
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {matchingRepairs.map(rep => (
                    <div
                      key={rep.id}
                      onClick={() => {
                        onNavigate('/repair-prices');
                        onClose();
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        backgroundColor: '#F8FAFC',
                        cursor: 'pointer'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#101318' }}>
                          {rep.model} — {rep.repairTask}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                          Hersteller: {rep.manufacturer} • Dauer: {rep.durationEstimate}
                        </div>
                      </div>
                      <div style={{ fontWeight: 700, color: '#101318' }}>
                        CHF {rep.priceChf}.-
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {matchingProducts.length === 0 && matchingRepairs.length === 0 && (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: '#64748B' }}>
                <div>Keine direkten Treffer für &laquo;{query}&raquo; gefunden.</div>
                <div style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
                  Versuchen Sie einen anderen Begriff oder rufen Sie uns direkt in Seebach an.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
