import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  CheckCircle, 
  ShieldCheck, 
  MapPin, 
  Info,
  ChevronLeft
} from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartPageProps {
  onNavigate: (path: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const { cart, removeFromCart, updateQuantity, totalPriceChf, totalItems, clearCart } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'post'>('pickup');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const shippingCost = deliveryMethod === 'post' ? (totalPriceChf >= 50 ? 0 : 7.90) : 0;
  const grandTotal = totalPriceChf + shippingCost;

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone) {
      alert('Bitte füllen Sie Ihre Kontaktdaten vollständig aus.');
      return;
    }
    setOrderSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: '#F5F6F8', padding: '4rem 0 6rem' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <button
          onClick={() => onNavigate('/shop')}
          style={{
            background: 'none',
            border: 'none',
            color: '#174CFF',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            marginBottom: '1.5rem',
            cursor: 'pointer'
          }}
        >
          <ChevronLeft size={16} /> Weiter einkaufen
        </button>

        <h1 style={{
          fontSize: '2.25rem',
          fontFamily: 'var(--font-heading)',
          color: '#101318',
          marginBottom: '2rem'
        }}>
          Ihr Warenkorb ({totalItems} Artikel)
        </h1>

        {orderSubmitted ? (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #DFE3E9',
            padding: '4rem 2rem',
            textAlign: 'center',
            boxShadow: '0 12px 36px rgba(16, 19, 24, 0.05)'
          }}>
            <div style={{
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              color: '#10B981',
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <CheckCircle size={40} />
            </div>

            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>
              Vielen Dank für Ihre Reservierung!
            </h2>
            <p style={{ color: '#475569', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
              Ihre Bestellung wurde für <strong>{customerName}</strong> im System hinterlegt. Sie erhalten eine Benachrichtigung an <strong>{customerEmail}</strong>.
            </p>

            <div style={{
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E6EC',
              borderRadius: '16px',
              padding: '1.5rem',
              maxWidth: '550px',
              margin: '0 auto 2rem',
              textAlign: 'left'
            }}>
              <div style={{ fontWeight: 700, color: '#101318', marginBottom: '0.5rem' }}>
                {deliveryMethod === 'pickup' ? 'Abholung in Zürich Seebach:' : 'Postversand per Schweizerische Post:'}
              </div>
              <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.5 }}>
                {deliveryMethod === 'pickup' 
                  ? 'Ihre Ware wird in der Filiale Schaffhauserstrasse 455 bereitgelegt. Bezahlung vor Ort per TWINT, Maestro, Visa oder Bar möglich.'
                  : 'Paket wird nach Vorauszahlung via Schweizer A-Post versendet.'
                }
              </p>
              <div style={{
                marginTop: '1rem',
                paddingTop: '0.75rem',
                borderTop: '1px dashed #CBD5E1',
                fontSize: '0.8rem',
                color: '#64748B'
              }}>
                <strong>Prototyp-Hinweis:</strong> Dies ist ein funktionsfähiger Demonstrations-Checkout für die Client-Präsentation. Ein vollständiges Online-Zahlungsgateway (TWINT API / PostFinance) wird im Produktions-Rollout angebunden.
              </div>
            </div>

            <button
              onClick={() => { clearCart(); onNavigate('/shop'); }}
              className="btn btn-primary"
            >
              Neuen Einkauf starten
            </button>
          </div>
        ) : cart.length === 0 ? (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #DFE3E9',
            padding: '5rem 2rem',
            textAlign: 'center'
          }}>
            <ShoppingBag size={56} color="#CBD5E1" style={{ margin: '0 auto 1.25rem' }} />
            <h3 style={{ color: '#1E293B', marginBottom: '0.5rem' }}>Ihr Warenkorb ist derzeit leer</h3>
            <p style={{ color: '#64748B', marginBottom: '2rem' }}>
              Entdecken Sie unsere Smartphones, Tablets, Smartwatches und Zubehör.
            </p>
            <button onClick={() => onNavigate('/shop')} className="btn btn-primary btn-lg">
              Zum Shop
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'flex-start'
          }}>
            {/* Items List */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #DFE3E9',
              padding: '1.75rem',
              boxShadow: '0 8px 24px rgba(16, 19, 24, 0.04)'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    style={{
                      display: 'flex',
                      gap: '1.25rem',
                      paddingBottom: '1.25rem',
                      borderBottom: '1px solid #F1F5F9',
                      alignItems: 'center'
                    }}
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'contain',
                        backgroundColor: '#F8FAFC',
                        borderRadius: '10px',
                        padding: '0.5rem',
                        border: '1px solid #E2E6EC'
                      }}
                    />

                    <div style={{ flexGrow: 1 }}>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase' }}>
                        {item.product.brand}
                      </div>
                      <h4 style={{ fontSize: '1rem', color: '#101318', margin: '0.2rem 0' }}>
                        {item.product.name}
                      </h4>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#174CFF' }}>
                        CHF {item.product.priceChf.toFixed(2)}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          border: '1px solid #DFE3E9',
                          borderRadius: '6px',
                          padding: '0.2rem 0.5rem'
                        }}>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem' }}
                          >
                            <Minus size={13} />
                          </button>
                          <span style={{ minWidth: '24px', textAlign: 'center', fontSize: '0.85rem', fontWeight: 600 }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.quantityOnHand}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem' }}
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#EF4444',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            fontSize: '0.8rem'
                          }}
                        >
                          <Trash2 size={14} /> Entfernen
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkout Form & Summary */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #DFE3E9',
              padding: '2rem',
              boxShadow: '0 8px 24px rgba(16, 19, 24, 0.04)'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', marginBottom: '1.25rem' }}>
                Bestell- &amp; Abholübersicht
              </h3>

              {/* Delivery method choice */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Übergabeart</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: deliveryMethod === 'pickup' ? '1.5px solid #174CFF' : '1px solid #E2E6EC',
                    backgroundColor: deliveryMethod === 'pickup' ? 'rgba(23, 76, 255, 0.05)' : '#FFFFFF',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}>
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'pickup'}
                      onChange={() => setDeliveryMethod('pickup')}
                    />
                    <div>
                      <strong>Abholung in Filiale Zürich Seebach</strong> (Kostenlos)
                      <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Schaffhauserstrasse 455, 8052 Zürich</div>
                    </div>
                  </label>

                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: deliveryMethod === 'post' ? '1.5px solid #174CFF' : '1px solid #E2E6EC',
                    backgroundColor: deliveryMethod === 'post' ? 'rgba(23, 76, 255, 0.05)' : '#FFFFFF',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}>
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'post'}
                      onChange={() => setDeliveryMethod('post')}
                    />
                    <div>
                      <strong>Schweizer A-Post Versand</strong>
                      <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                        {totalPriceChf >= 50 ? 'Kostenlos (ab CHF 50.-)' : 'CHF 7.90 Porto'}
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Customer Contact Fields */}
              <form onSubmit={handleCompleteOrder}>
                <div className="form-group">
                  <label className="form-label">Vor- und Nachname *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="z.B. Adrian Meier"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">E-Mail Adresse *</label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="adrian.meier@bluewin.ch"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Telefonnummer *</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+41 79 345 67 89"
                    className="form-control"
                  />
                </div>

                {/* Price Breakdown */}
                <div style={{
                  borderTop: '1px solid #F1F5F9',
                  paddingTop: '1rem',
                  marginTop: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  color: '#64748B'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Warenwert:</span>
                    <span>CHF {totalPriceChf.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Versandkosten:</span>
                    <span>{shippingCost === 0 ? 'Kostenlos' : `CHF ${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#101318',
                    paddingTop: '0.5rem',
                    borderTop: '1px solid #E2E6EC',
                    marginTop: '0.25rem'
                  }}>
                    <span>Gesamtbetrag:</span>
                    <span style={{ color: '#174CFF', fontFamily: 'var(--font-heading)' }}>
                      CHF {grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', marginTop: '1.5rem' }}
                >
                  Bestellung reservieren (Demo) <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
