import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  CheckCircle, 
  AlertTriangle, 
  Sparkles,
  Phone,
  MessageSquare,
  Share2
} from 'lucide-react';
import { mockDb } from '../data/mockDb';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/shop/ProductCard';

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (path: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId, onNavigate }) => {
  const product = mockDb.getProductById(productId);
  const { addToCart } = useCart();
  const [selectedQty, setSelectedQty] = useState(1);

  if (!product) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h2>Produkt nicht gefunden</h2>
        <p style={{ color: '#64748B', margin: '1rem 0 2rem' }}>
          Der angeforderte Artikel existiert leider nicht oder wurde aus dem Sortiment entfernt.
        </p>
        <button onClick={() => onNavigate('/shop')} className="btn btn-primary">
          Zurück zum Shop
        </button>
      </div>
    );
  }

  const isOutOfStock = product.stockStatus === 'out_of_stock' || product.quantityOnHand <= 0;
  const isLowStock = product.stockStatus === 'low_stock' && product.quantityOnHand > 0;

  // Related products from same category or brand
  const relatedProducts = mockDb
    .getProducts()
    .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 3);

  return (
    <div style={{ backgroundColor: '#F5F6F8', paddingBottom: '6rem' }}>
      {/* Breadcrumbs */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E6EC', padding: '1rem 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748B' }}>
          <button
            onClick={() => onNavigate('/')}
            style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigate('/shop')}
            style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}
          >
            Shop
          </button>
          <span>/</span>
          <span style={{ color: '#101318', fontWeight: 600 }}>{product.name}</span>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2.5rem' }}>
        {/* Main Product Showcase Box */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          border: '1px solid #DFE3E9',
          padding: '2.5rem',
          boxShadow: '0 12px 36px rgba(16, 19, 24, 0.05)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '3.5rem',
          marginBottom: '3rem'
        }}>
          {/* Left: Product Image Gallery */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              backgroundColor: '#F8FAFC',
              borderRadius: '20px',
              padding: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #E2E6EC',
              position: 'relative'
            }}>
              {product.condition !== 'new' && (
                <span className="badge badge-lime" style={{ position: 'absolute', top: '16px', left: '16px' }}>
                  <Sparkles size={12} /> Refurbished A+
                </span>
              )}

              <img
                src={product.imageUrl}
                alt={product.name}
                style={{
                  maxWidth: '100%',
                  maxHeight: '420px',
                  objectFit: 'contain'
                }}
              />
            </div>
          </div>

          {/* Right: Product Info & Buy Action */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#174CFF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {product.brand}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                SKU: {product.sku}
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
              color: '#101318',
              fontFamily: 'var(--font-heading)',
              lineHeight: 1.2,
              marginBottom: '1rem'
            }}>
              {product.name}
            </h1>

            {/* Price Box */}
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.75rem',
              marginBottom: '1.5rem',
              borderBottom: '1px solid #F1F5F9',
              paddingBottom: '1.25rem'
            }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: '#101318' }}>
                CHF {product.priceChf.toFixed(2)}
              </span>
              {product.originalPriceChf && (
                <span style={{ fontSize: '1.1rem', color: '#94A3B8', textDecoration: 'line-through' }}>
                  CHF {product.originalPriceChf.toFixed(2)}
                </span>
              )}
              <span style={{ fontSize: '0.85rem', color: '#64748B' }}>
                inkl. 8.1% MwSt.
              </span>
            </div>

            {/* Stock & Availability Status */}
            <div style={{
              backgroundColor: isOutOfStock ? '#FEF2F2' : isLowStock ? '#FFFBEB' : '#F0FDF4',
              border: `1px solid ${isOutOfStock ? '#FCA5A5' : isLowStock ? '#FDE68A' : '#BBF7D0'}`,
              borderRadius: '12px',
              padding: '0.85rem 1rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem'
            }}>
              {isOutOfStock ? (
                <>
                  <AlertTriangle size={18} color="#EF4444" />
                  <div>
                    <strong style={{ color: '#991B1B', fontSize: '0.9rem' }}>Derzeit ausverkauft</strong>
                    <div style={{ fontSize: '0.8rem', color: '#B91C1C' }}>
                      Nachbestellung in Vorbereitung. Vorabbestellung per WhatsApp möglich.
                    </div>
                  </div>
                </>
              ) : isLowStock ? (
                <>
                  <AlertTriangle size={18} color="#D97706" />
                  <div>
                    <strong style={{ color: '#92400E', fontSize: '0.9rem' }}>Nur noch {product.quantityOnHand} Stück an Lager</strong>
                    <div style={{ fontSize: '0.8rem', color: '#B45309' }}>
                      Sofort abholbereit in der Hauptfiliale Zürich Seebach.
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <CheckCircle size={18} color="#16A34A" />
                  <div>
                    <strong style={{ color: '#166534', fontSize: '0.9rem' }}>Sofort verfügbar ({product.quantityOnHand} Stück an Lager)</strong>
                    <div style={{ fontSize: '0.8rem', color: '#15803D' }}>
                      Abholbereit in Zürich Seebach oder schneller Schweizer A-Post Versand.
                    </div>
                  </div>
                </>
              )}
            </div>

            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              {product.shortDescription}
            </p>

            {/* Quantity & Add to Cart Controls */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
              {!isOutOfStock && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #DFE3E9',
                  borderRadius: '10px',
                  padding: '0.4rem 0.75rem',
                  backgroundColor: '#FFFFFF'
                }}>
                  <button
                    onClick={() => setSelectedQty(Math.max(1, selectedQty - 1))}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem 0.5rem', fontWeight: 700 }}
                  >
                    -
                  </button>
                  <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 600 }}>
                    {selectedQty}
                  </span>
                  <button
                    onClick={() => setSelectedQty(Math.min(product.quantityOnHand, selectedQty + 1))}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem 0.5rem', fontWeight: 700 }}
                  >
                    +
                  </button>
                </div>
              )}

              <button
                onClick={() => addToCart(product, selectedQty)}
                disabled={isOutOfStock}
                className="btn btn-primary btn-lg"
                style={{ flexGrow: 1 }}
              >
                <ShoppingBag size={18} />
                {isOutOfStock ? 'Nicht verfügbar' : 'In den Warenkorb'}
              </button>
            </div>

            {/* Quick Guarantees Bullets */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid #F1F5F9',
              fontSize: '0.875rem',
              color: '#64748B'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={16} color="#10B981" />
                <span>{product.warrantyPeriod}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} color="#174CFF" />
                <span>Direkte Abholung &amp; Beratung an der Schaffhauserstrasse 455</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Truck size={16} color="#6366F1" />
                <span>Kostenloser A-Post Versand innerhalb der Schweiz ab CHF 50.-</span>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Table */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          border: '1px solid #DFE3E9',
          padding: '2.5rem',
          boxShadow: '0 12px 36px rgba(16, 19, 24, 0.05)',
          marginBottom: '4rem'
        }}>
          <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem' }}>
            Technische Daten &amp; Eigenschaften
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem'
          }}>
            {Object.entries(product.specs).map(([key, val]) => (
              <div
                key={key}
                style={{
                  padding: '1rem',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '10px',
                  border: '1px solid #E2E6EC'
                }}
              >
                <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
                  {key}
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#101318', marginTop: '0.2rem' }}>
                  {val}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="section-header">
              <span className="section-eyebrow">Passendes Zubehör &amp; Alternativen</span>
              <h3 className="section-title">Das könnte Sie auch interessieren</h3>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.75rem'
            }}>
              {relatedProducts.map(rel => (
                <ProductCard key={rel.id} product={rel} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
