import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface CartDrawerProps {
  onNavigate: (path: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const { cart, removeFromCart, updateQuantity, totalPriceChf, totalItems, isCartOpen, setIsCartOpen, clearCart } = useCart();
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Lock body scroll when cart drawer is open
  React.useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  // Handle escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const handleCheckoutDemo = () => {
    setCheckoutComplete(true);
    setTimeout(() => {
      clearCart();
    }, 4000);
  };

  return (
    <div 
      className="modal-backdrop" 
      onClick={() => setIsCartOpen(false)}
      style={{ justifyContent: 'flex-end', padding: 0 }}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#FFFFFF',
          width: '100%',
          maxWidth: '440px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 30px rgba(16, 19, 24, 0.2)',
          animation: 'slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Drawer Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid #E2E6EC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingBag size={20} color="#174CFF" />
            <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>
              Ihr Warenkorb ({totalItems})
            </h3>
          </div>
          <button
            onClick={() => { setIsCartOpen(false); setCheckoutComplete(false); }}
            aria-label="Warenkorb schliessen"
            style={{
              background: 'none',
              border: 'none',
              color: '#64748B',
              cursor: 'pointer',
              padding: '0.25rem'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {checkoutComplete ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                color: '#10B981',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem'
              }}>
                <CheckCircle size={32} />
              </div>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
                Reservierungs-Bestätigung
              </h4>
              <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Ihre Artikel wurden im Prototyp für Sie reserviert! Sie können die Ware in der Filiale Zürich Seebach (Schaffhauserstrasse 455) abholen und vor Ort per TWINT, Karte oder Bar bezahlen.
              </p>
              <div style={{
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E6EC',
                borderRadius: '10px',
                padding: '0.85rem',
                fontSize: '0.8rem',
                color: '#64748B',
                textAlign: 'left'
              }}>
                <strong>Transparenzhinweis:</strong> Dies ist eine Prototyp-Demonstration für den Kunden. Für die spätere Live-Produktion wird hier ein verifizierter Schweizer Checkout (z.B. TWINT / PostFinance / Stripe) integriert.
              </div>
            </div>
          ) : cart.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 1rem',
              color: '#64748B',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <ShoppingBag size={48} color="#CBD5E1" style={{ marginBottom: '1rem' }} />
              <h4 style={{ color: '#1E293B', marginBottom: '0.5rem' }}>Ihr Warenkorb ist leer</h4>
              <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Entdecken Sie unsere geprüften Smartphones, Zubehör und Refurbished-Angebote.
              </p>
              <button
                onClick={() => { setIsCartOpen(false); onNavigate('/shop'); }}
                className="btn btn-primary"
              >
                Zum Shop
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '0.85rem',
                    borderRadius: '10px',
                    border: '1px solid #E2E6EC',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    style={{
                      width: '64px',
                      height: '64px',
                      objectFit: 'contain',
                      borderRadius: '6px',
                      backgroundColor: '#F8FAFC',
                      padding: '0.25rem'
                    }}
                  />

                  <div style={{ flexGrow: 1 }}>
                    <h5 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#101318', marginBottom: '0.25rem' }}>
                      {item.product.name}
                    </h5>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#174CFF' }}>
                      CHF {item.product.priceChf.toFixed(2)}
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '0.5rem'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        border: '1px solid #E2E6EC',
                        borderRadius: '6px',
                        padding: '0.15rem 0.35rem'
                      }}>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.15rem' }}
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, minWidth: '18px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.quantityOnHand}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: item.quantity >= item.product.quantityOnHand ? 'not-allowed' : 'pointer',
                            opacity: item.quantity >= item.product.quantityOnHand ? 0.4 : 1,
                            padding: '0.15rem'
                          }}
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        aria-label="Artikel entfernen"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#EF4444',
                          cursor: 'pointer',
                          padding: '0.25rem'
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer with Subtotal & Actions */}
        {cart.length > 0 && !checkoutComplete && (
          <div style={{
            padding: '1.5rem',
            borderTop: '1px solid #E2E6EC',
            backgroundColor: '#F8FAFC'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem',
              fontSize: '0.9rem',
              color: '#64748B'
            }}>
              <span>Zwischensumme:</span>
              <span style={{ fontWeight: 600, color: '#101318' }}>
                CHF {totalPriceChf.toFixed(2)}
              </span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '1.25rem'
            }}>
              <span style={{ fontWeight: 700, fontSize: '1.05rem', color: '#101318' }}>Gesamtbetrag (inkl. MwSt.):</span>
              <span style={{ fontSize: '1.45rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: '#174CFF' }}>
                CHF {totalPriceChf.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleCheckoutDemo}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.9rem', marginBottom: '0.75rem' }}
            >
              Abholung / Reservierung anfragen (Demo) <ArrowRight size={16} />
            </button>

            <button
              onClick={() => { setIsCartOpen(false); onNavigate('/cart'); }}
              className="btn btn-secondary"
              style={{ width: '100%', padding: '0.75rem', fontSize: '0.85rem' }}
            >
              Warenkorb-Seite ansehen
            </button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              fontSize: '0.75rem',
              color: '#64748B',
              marginTop: '0.85rem'
            }}>
              <ShieldCheck size={14} color="#10B981" />
              <span>Abholung &amp; Bezahlung vor Ort in Zürich Seebach möglich</span>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};
