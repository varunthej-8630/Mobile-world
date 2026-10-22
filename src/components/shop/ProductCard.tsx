import React from 'react';
import { ShoppingBag, Eye, ShieldCheck, Sparkles, AlertTriangle } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onNavigate: (path: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate }) => {
  const { addToCart } = useCart();

  const isOutOfStock = product.stockStatus === 'out_of_stock' || product.quantityOnHand <= 0;
  const isLowStock = product.stockStatus === 'low_stock' && product.quantityOnHand > 0;

  const getConditionLabel = () => {
    switch (product.condition) {
      case 'refurbished_a_plus':
        return 'Refurbished A+ (Wie neu)';
      case 'refurbished_a':
        return 'Refurbished A (Sehr gut)';
      case 'refurbished_b':
        return 'Refurbished B (Gut)';
      default:
        return 'Neu & Versiegelt';
    }
  };

  return (
    <div className="card" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative',
      backgroundColor: '#FFFFFF',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    }}>
      {/* Top Badges */}
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
          <span className="badge badge-lime" style={{ fontSize: '0.7rem' }}>
            <Sparkles size={11} /> Refurbished
          </span>
        ) : (
          <span className="badge badge-dark" style={{ backgroundColor: '#101318', fontSize: '0.7rem' }}>
            Neuware
          </span>
        )}

        {/* Stock Badge */}
        {isOutOfStock ? (
          <span className="badge badge-danger" style={{ fontSize: '0.7rem' }}>
            Ausverkauft
          </span>
        ) : isLowStock ? (
          <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>
            <AlertTriangle size={11} /> Nur {product.quantityOnHand} übrig
          </span>
        ) : (
          <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
            An Lager ({product.quantityOnHand})
          </span>
        )}
      </div>

      {/* Image Container with Consistent Aspect Ratio */}
      <div 
        onClick={() => onNavigate(`/product/${product.id}`)}
        style={{
          width: '100%',
          paddingTop: '85%', // 1:0.85 ratio
          position: 'relative',
          backgroundColor: '#F8FAFC',
          cursor: 'pointer',
          overflow: 'hidden'
        }}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            padding: '1.5rem',
            transition: 'transform 0.3s ease'
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
            marginBottom: '0.25rem'
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>
              {product.brand}
            </span>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
              SKU: {product.sku}
            </span>
          </div>

          <h4 
            onClick={() => onNavigate(`/product/${product.id}`)}
            style={{
              fontSize: '1.05rem',
              fontWeight: 700,
              color: '#101318',
              marginBottom: '0.4rem',
              cursor: 'pointer',
              lineHeight: 1.3
            }}
          >
            {product.name}
          </h4>

          <div style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '0.85rem' }}>
            {product.color && <span>{product.color}</span>}
            {product.color && product.storage && <span> • </span>}
            {product.storage && <span>{product.storage}</span>}
          </div>

          <div style={{
            fontSize: '0.75rem',
            color: '#059669',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            marginBottom: '1rem'
          }}>
            <ShieldCheck size={13} /> {product.warrantyPeriod}
          </div>
        </div>

        {/* Pricing & Cart Action */}
        <div style={{
          borderTop: '1px solid #F1F5F9',
          paddingTop: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#101318', fontFamily: 'var(--font-heading)' }}>
                CHF {product.priceChf.toFixed(2)}
              </span>
            </div>
            {product.originalPriceChf && (
              <span style={{ fontSize: '0.75rem', color: '#94A3B8', textDecoration: 'line-through' }}>
                CHF {product.originalPriceChf.toFixed(2)}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button
              onClick={() => onNavigate(`/product/${product.id}`)}
              aria-label={`Details zu ${product.name}`}
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.45rem 0.65rem' }}
              title="Details anzeigen"
            >
              <Eye size={15} />
            </button>

            <button
              onClick={() => addToCart(product)}
              disabled={isOutOfStock}
              className={`btn ${isOutOfStock ? 'btn-secondary' : 'btn-primary'} btn-sm`}
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
            >
              <ShoppingBag size={14} />
              {isOutOfStock ? 'Ausverkauft' : 'In den Korb'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
