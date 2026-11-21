import React, { useState, useEffect } from 'react';
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
  ChevronLeft,
  Truck,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { mockDb } from '../data/mockDb';

interface CartPageProps {
  onNavigate: (path: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const { cart, removeFromCart, updateQuantity, totalPriceChf, totalItems, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'post'>('pickup');
  const [customerName, setCustomerName] = useState(user?.fullName || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [completedOrderNumber, setCompletedOrderNumber] = useState('');

  // Sync user info if user logs in while on page
  useEffect(() => {
    if (user) {
      if (!customerName) setCustomerName(user.fullName);
      if (!customerEmail) setCustomerEmail(user.email);
      if (!customerPhone && user.phone) setCustomerPhone(user.phone);
    }
  }, [user]);

  // Shipping rules: Store pickup is free. Swiss Post Priority is CHF 9.90; free for orders >= CHF 150.
  const shippingCost = deliveryMethod === 'post' ? (totalPriceChf >= 150 ? 0 : 9.90) : 0;
  const grandTotal = Math.round((totalPriceChf + shippingCost) * 100) / 100;
  // Swiss statutory VAT (MWST) 8.1% included in total
  const vatAmount = Math.round(((grandTotal * 8.1) / 108.1) * 100) / 100;

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (cart.length === 0) {
      setFormError('Ihr Warenkorb ist derzeit leer. Bitte legen Sie zuerst Artikel hinein.');
      return;
    }

    if (!customerName.trim()) {
      setFormError('Bitte geben Sie Ihren vollständigen Namen ein.');
      return;
    }

    if (!customerEmail.trim() || !customerEmail.includes('@') || !customerEmail.includes('.')) {
      setFormError('Bitte geben Sie eine gültige E-Mail-Adresse für die Auftragsbestätigung ein.');
      return;
    }

    if (!customerPhone.trim() || customerPhone.trim().length < 8) {
      setFormError('Bitte geben Sie eine gültige Schweizer Telefonnummer an.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Persist order to authoritative store
      const newOrder = mockDb.createOrder({
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        customerPhone: customerPhone.trim(),
        deliveryMethod,
        shippingCostChf: shippingCost,
        subtotalChf: totalPriceChf,
        vatChf: vatAmount,
        grandTotalChf: grandTotal,
        items: [...cart]
      });

      clearCart();
      setIsSubmitting(false);
      setCompletedOrderNumber(newOrder.orderNumber);
      setOrderSubmitted(true);
    }, 500);
  };

  return (
    <div style={{ backgroundColor: '#F5F6F8', padding: '7.75rem 0 6rem' }}>
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

            <div className="badge badge-emerald text-xs mb-3">
              Bestellnummer: #{completedOrderNumber}
            </div>

            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>
              Vielen Dank für Ihre Bestellung!
            </h2>
            <p style={{ color: '#475569', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
              Ihre Bestellung <strong>#{completedOrderNumber}</strong> wurde für <strong>{customerName}</strong> im System hinterlegt. Sie erhalten eine Bestätigung an <strong>{customerEmail}</strong>.
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
              <div style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6 }}>
                {deliveryMethod === 'pickup' ? (
                  <>
                    Schaffhauserstrasse 455, 8052 Zürich<br />
                    Bereitstellung: In der Regel <strong>innerhalb von 60 Minuten</strong> während der Öffnungszeiten (Mo–Fr 09:00–12:00 | 13:00–19:00, Sa 10:00–18:00).
                  </>
                ) : (
                  <>
                    Zustellung per <strong>Swiss Post Priority Express</strong> (A-Post). Versand erfolgt an Werktagen bei Bestelleingang vor 15:00 Uhr noch am selben Tag.
                  </>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => onNavigate(isAuthenticated ? '/account/profile' : '/shop')}
                className="btn btn-primary"
              >
                {isAuthenticated ? 'Zu meinen Bestellungen' : 'Zurück zum Shop'}
              </button>
              <button
                onClick={() => onNavigate('/')}
                className="btn btn-secondary"
              >
                Zur Startseite
              </button>
            </div>
          </div>
        ) : cart.length === 0 ? (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #DFE3E9',
            padding: '5rem 2rem',
            textAlign: 'center',
            boxShadow: '0 8px 30px rgba(16, 19, 24, 0.04)'
          }}>
            <ShoppingBag size={56} color="#CBD5E1" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '1.5rem', color: '#101318', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
              Ihr Warenkorb ist derzeit leer
            </h2>
            <p style={{ color: '#64748B', marginBottom: '2rem', maxWidth: '450px', marginInline: 'auto' }}>
              Entdecken Sie geprüfte Smartphones, Schweizer Neugeräte und Premium-Zubehör in unserem Online Shop.
            </p>
            <button onClick={() => onNavigate('/shop')} className="btn btn-primary">
              Jetzt Artikel entdecken
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '2.5rem',
            alignItems: 'flex-start'
          }}>
            {/* Cart Items List */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #DFE3E9',
              padding: '1.5rem',
              boxShadow: '0 8px 24px rgba(16, 19, 24, 0.04)'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', marginBottom: '1.25rem' }}>
                Ausgewählte Produkte ({totalItems})
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      padding: '1rem',
                      borderRadius: '12px',
                      border: '1px solid #F1F5F9',
                      backgroundColor: '#F8FAFC',
                      alignItems: 'center'
                    }}
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      style={{
                        width: '72px',
                        height: '72px',
                        objectFit: 'contain',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '8px',
                        padding: '0.4rem',
                        border: '1px solid #E2E8F0'
                      }}
                    />

                    <div style={{ flexGrow: 1 }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#101318', marginBottom: '0.2rem' }}>
                        {item.product.name}
                      </h4>
                      <div style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '0.4rem' }}>
                        {item.product.storage && <span>{item.product.storage}</span>}
                        {item.product.storage && item.product.color && <span> · </span>}
                        {item.product.color && <span>{item.product.color}</span>}
                      </div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#174CFF', fontFamily: 'var(--font-heading)' }}>
                        CHF {(item.product.priceChf * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #CBD5E1',
                        borderRadius: '6px',
                        padding: '0.2rem 0.4rem'
                      }}>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem' }}
                          title="Anzahl verringern"
                        >
                          <Minus size={14} />
                        </button>
                        <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: 600, fontSize: '0.85rem' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem' }}
                          title="Anzahl erhöhen"
                        >
                          <Plus size={14} />
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
                ))}
              </div>
            </div>

            {/* Checkout Form & Summary */}
            <div
              className="p-4 sm:p-6 md:p-8"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid #DFE3E9',
                boxShadow: '0 8px 24px rgba(16, 19, 24, 0.04)'
              }}
            >
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', marginBottom: '1.25rem' }}>
                Bestell- &amp; Abholübersicht
              </h3>

              {/* Delivery method choice */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block' }}>
                  Übergabeart
                </label>
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
                      <strong>Filialabholung Zürich Seebach</strong> (Kostenlos)
                      <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                        Schaffhauserstrasse 455, 8052 Zürich (bereit in ca. 60 Min.)
                      </div>
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
                      <strong>Schweizer Postversand (Priority A-Post)</strong>
                      <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                        {totalPriceChf >= 150 ? 'Kostenlos (ab CHF 150.- Warenwert)' : 'CHF 9.90 Express-Versand'}
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Customer Contact Fields */}
              <form onSubmit={handleCompleteOrder}>
                {formError && (
                  <div 
                    role="alert"
                    style={{
                      backgroundColor: 'rgba(239, 68, 68, 0.08)',
                      border: '1px solid #EF4444',
                      borderRadius: '10px',
                      padding: '0.75rem 1rem',
                      marginBottom: '1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      color: '#B91C1C',
                      fontSize: '0.875rem'
                    }}
                  >
                    <AlertCircle size={18} color="#EF4444" style={{ flexShrink: 0 }} />
                    <span>{formError}</span>
                  </div>
                )}
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label" style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                    Vor- und Nachname *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="z.B. Adrian Meier"
                    className="form-control"
                    style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label" style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                    E-Mail Adresse *
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="adrian.meier@bluewin.ch"
                    className="form-control"
                    style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label" style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                    Telefonnummer *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+41 79 345 67 89"
                    className="form-control"
                    style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>

                {/* Price Breakdown */}
                <div style={{
                  borderTop: '1px solid #F1F5F9',
                  paddingTop: '1rem',
                  marginTop: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.45rem',
                  fontSize: '0.875rem',
                  color: '#64748B'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Warenwert (netto):</span>
                    <span>CHF {(grandTotal - vatAmount).toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Versandkosten:</span>
                    <span>{shippingCost === 0 ? 'Kostenlos' : `CHF ${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                    <span>Inkl. 8.1% Schweizer MwSt.:</span>
                    <span>CHF {vatAmount.toFixed(2)}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#101318',
                    paddingTop: '0.65rem',
                    borderTop: '1px solid #E2E6EC',
                    marginTop: '0.25rem'
                  }}>
                    <span>Gesamtbetrag:</span>
                    <span style={{ color: '#4928FD', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                      CHF {grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-raphus-slide btn-raphus-slide-filled w-full"
                  style={{ minHeight: '52px', marginTop: '1.5rem' }}
                >
                  <span className="btn-slide-badge"><ArrowRight size={15} className="btn-slide-icon" /></span>
                  <span className="btn-slide-text">
                    {isSubmitting ? 'Wird übermittelt...' : (
                      <>
                        <ShieldCheck size={18} />
                        <span>Verbindlich bestellen &amp; reservieren</span>
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default CartPage;
