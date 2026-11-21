import React, { useState } from 'react';
import { ShoppingBag, Eye, ShieldCheck, Sparkles, AlertTriangle, Check } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onNavigate: (path: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate }) => {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const isOutOfStock = product.stockStatus === 'out_of_stock' || product.quantityOnHand <= 0;
  const isLowStock = product.stockStatus === 'low_stock' && product.quantityOnHand > 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1400);
  };

  return (
    <div 
      className="card" 
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        backgroundColor: '#FFFFFF',
        borderRadius: '22px',
        border: '1px solid #E8E8E8',
        overflow: 'hidden',
        boxShadow: '0 4px 18px rgba(0, 0, 0, 0.03)',
        transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.08)';
        e.currentTarget.style.borderColor = '#BA81EE';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 18px rgba(0, 0, 0, 0.03)';
        e.currentTarget.style.borderColor = '#E8E8E8';
      }}
    >
      {/* Top Badges Inside Card */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        right: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 2,
        pointerEvents: 'none'
      }}>
        {product.condition !== 'new' ? (
          <span className="badge badge-lime" style={{ fontSize: '0.7rem', padding: '0.2rem 0.55rem' }}>
            <Sparkles size={11} /> Refurbished
          </span>
        ) : (
          <span className="badge badge-dark" style={{ backgroundColor: '#101318', color: '#FFFFFF', fontSize: '0.7rem', padding: '0.2rem 0.55rem' }}>
            Neuware
          </span>
        )}

        {/* Stock Badge */}
        {isOutOfStock ? (
          <span className="badge badge-danger" style={{ fontSize: '0.7rem', padding: '0.2rem 0.55rem' }}>
            Ausverkauft
          </span>
        ) : isLowStock ? (
          <span className="badge badge-warning" style={{ fontSize: '0.7rem', padding: '0.2rem 0.55rem' }}>
            <AlertTriangle size={11} /> Nur {product.quantityOnHand} übrig
          </span>
        ) : (
          <span className="badge badge-success" style={{ fontSize: '0.7rem', padding: '0.2rem 0.55rem' }}>
            An Lager ({product.quantityOnHand})
          </span>
        )}
      </div>

      {/* Image Container with Consistent Aspect Ratio */}
      <div 
        onClick={() => onNavigate(`/product/${product.id}`)}
        style={{
          width: '100%',
          paddingTop: '80%',
          position: 'relative',
          backgroundColor: '#F8FAFC',
          cursor: 'pointer',
          overflow: 'hidden',
          borderBottom: '1px solid #F1F5F9'
        }}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          decoding="async"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            padding: '1.25rem',
            transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.transform = 'scale(1)';
          }}
        />
      </div>

      {/* Product Content Details */}
      <div style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.35rem'
          }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {product.brand}
            </span>
            <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontFamily: 'monospace' }}>
              {product.sku}
            </span>
          </div>

          <h4 
            onClick={() => onNavigate(`/product/${product.id}`)}
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: '#0F172A',
              marginBottom: '0.45rem',
              cursor: 'pointer',
              lineHeight: 1.35,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
            title={product.name}
          >
            {product.name}
          </h4>

          <div style={{ fontSize: '0.785rem', color: '#64748B', marginBottom: '0.75rem' }}>
            {product.color && <span>{product.color}</span>}
            {product.color && product.storage && <span> • </span>}
            {product.storage && <span>{product.storage}</span>}
          </div>

          <div style={{
            fontSize: '0.75rem',
            color: '#059669',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            marginBottom: '0.85rem',
            fontWeight: 500
          }}>
            <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
            <span>{product.warrantyPeriod}</span>
          </div>
        </div>

        {/* Pricing & Cart Action — Resilient Stacked Layout */}
        <div style={{
          borderTop: '1px solid #F1F5F9',
          paddingTop: '0.85rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem',
          marginTop: 'auto'
        }}>
          {/* Price Row */}
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.45rem' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', fontFamily: 'var(--font-heading)' }}>
                CHF {product.priceChf.toFixed(2)}
              </span>
              {product.originalPriceChf && product.originalPriceChf > product.priceChf && (
                <span style={{ fontSize: '0.78rem', color: '#94A3B8', textDecoration: 'line-through' }}>
                  CHF {product.originalPriceChf.toFixed(2)}
                </span>
              )}
            </div>
            <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 500 }}>inkl. 8.1% MwSt.</span>
          </div>

          {/* Action Buttons Row — 100% Contained */}
          <div style={{ display: 'flex', gap: '0.5rem', width: '100%', alignItems: 'center' }}>
            <button
              onClick={() => onNavigate(`/product/${product.id}`)}
              aria-label={`Details zu ${product.name}`}
              style={{
                width: '38px',
                height: '38px',
                flexShrink: 0,
                borderRadius: '50%',
                border: '1px solid #E8E8E8',
                backgroundColor: '#F8FAFC',
                color: '#1B1D1E',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 180ms ease'
              }}
              title="Details anzeigen"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1B1D1E';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.borderColor = '#1B1D1E';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F8FAFC';
                e.currentTarget.style.color = '#1B1D1E';
                e.currentTarget.style.borderColor = '#E8E8E8';
              }}
            >
              <Eye size={15} />
            </button>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              style={{
                flex: 1,
                minHeight: '38px',
                padding: '0.45rem 1rem',
                fontSize: '0.825rem',
                fontWeight: 600,
                borderRadius: '9999px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.45rem',
                whiteSpace: 'nowrap',
                cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                backgroundColor: justAdded ? '#10B981' : (isOutOfStock ? '#F1F5F9' : '#4928FD'),
                border: '1px solid',
                borderColor: justAdded ? '#10B981' : (isOutOfStock ? '#E2E8F0' : '#4928FD'),
                color: isOutOfStock ? '#94A3B8' : '#FFFFFF',
                boxShadow: justAdded ? '0 4px 16px rgba(16, 185, 129, 0.35)' : '0 2px 10px rgba(73, 40, 253, 0.25)',
                transition: 'all 200ms ease'
              }}
              onMouseEnter={(e) => {
                if (!isOutOfStock && !justAdded) {
                  e.currentTarget.style.backgroundColor = '#3E22D7';
                  e.currentTarget.style.borderColor = '#3E22D7';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isOutOfStock && !justAdded) {
                  e.currentTarget.style.backgroundColor = '#4928FD';
                  e.currentTarget.style.borderColor = '#4928FD';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {justAdded ? (
                <>
                  <Check size={14} />
                  <span>Hinzugefügt</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={14} />
                  <span>{isOutOfStock ? 'Ausverkauft' : 'In den Warenkorb'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
