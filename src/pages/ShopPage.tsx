import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Sparkles, 
  CheckCircle, 
  RotateCcw,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { ProductCard } from '../components/shop/ProductCard';
import { mockDb } from '../data/mockDb';
import { PRODUCT_CATEGORIES } from '../data/products';

interface ShopPageProps {
  onNavigate: (path: string) => void;
  initialCategory?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onNavigate, initialCategory = 'all' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'name'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const products = mockDb.getProducts();

  // Extract distinct brands
  const brands = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => set.add(p.brand));
    return Array.from(set);
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchBrand = p.brand.toLowerCase().includes(q);
        const matchSku = p.sku.toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchSku) return false;
      }
      // Brand
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) {
        return false;
      }
      // Condition
      if (selectedCondition !== 'all') {
        if (selectedCondition === 'new' && p.condition !== 'new') return false;
        if (selectedCondition === 'refurbished' && p.condition === 'new') return false;
      }
      // Stock
      if (onlyInStock && (p.stockStatus === 'out_of_stock' || p.quantityOnHand <= 0)) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.priceChf - b.priceChf;
      if (sortBy === 'price_desc') return b.priceChf - a.priceChf;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedCategory, searchQuery, selectedBrand, selectedCondition, onlyInStock, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedBrand('all');
    setSelectedCondition('all');
    setOnlyInStock(false);
    setSortBy('featured');
  };

  return (
    <div style={{ backgroundColor: '#F5F6F8', paddingBottom: '6rem' }}>
      {/* Shop Header */}
      <div style={{ backgroundColor: '#101318', color: '#FFFFFF', padding: '4.5rem 0 3.5rem' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', marginBottom: '2.5rem' }}>
            <span className="section-eyebrow" style={{ color: '#7096FF' }}>Schweizer Lagerbestand &amp; Fachhandel</span>
            <h1 style={{
              fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)',
              color: '#FFFFFF',
              fontFamily: 'var(--font-heading)',
              marginBottom: '1rem'
            }}>
              Online Shop &amp; Gerätekatalog
            </h1>
            <p style={{ color: '#94A3B8', fontSize: '1.15rem', lineHeight: 1.6 }}>
              Kaufen Sie neue Smartphones, geprüfte Refurbished-Geräte (Grad A+ mit 12 Monaten Garantie) und ausgewähltes Premium-Zubehör. Direkte Abholung in Zürich Seebach möglich.
            </p>
          </div>

          {/* Category Chips Bar */}
          <div style={{
            display: 'flex',
            gap: '0.65rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
            scrollbarWidth: 'none'
          }}>
            {PRODUCT_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: '24px',
                  backgroundColor: selectedCategory === cat.id ? '#174CFF' : 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid',
                  borderColor: selectedCategory === cat.id ? '#174CFF' : 'rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2.5rem' }}>
        {/* Controls Bar: Search, Filters, Sort, Count */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #DFE3E9',
          padding: '1.25rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '1.5rem',
          boxShadow: '0 4px 12px rgba(16, 19, 24, 0.04)'
        }}>
          {/* Live Search */}
          <div style={{ position: 'relative', flexGrow: 1, minWidth: '220px', maxWidth: '380px' }}>
            <Search size={16} color="#64748B" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Modell, Marke oder SKU suchen..."
              className="form-control"
              style={{ paddingLeft: '2.25rem', paddingRight: '1rem', fontSize: '0.875rem' }}
            />
          </div>

          {/* Mobile Filter Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="btn btn-secondary btn-sm"
              aria-expanded={mobileFilterOpen}
            >
              <SlidersHorizontal size={14} />
              <span>Filter ({filteredProducts.length})</span>
            </button>
            {(selectedBrand !== 'all' || selectedCondition !== 'all' || onlyInStock || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="btn btn-secondary btn-sm"
                title="Filter zurücksetzen"
              >
                <RotateCcw size={13} />
              </button>
            )}
          </div>

          {/* Desktop Filter Selects */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }} className="hide-mobile">
            {/* Brand Filter */}
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="form-control"
              style={{ width: 'auto', fontSize: '0.875rem', padding: '0.55rem 0.85rem' }}
            >
              <option value="all">Alle Marken</option>
              {brands.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>

            {/* Condition Filter */}
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="form-control"
              style={{ width: 'auto', fontSize: '0.875rem', padding: '0.55rem 0.85rem' }}
            >
              <option value="all">Alle Zustände</option>
              <option value="new">Nur Neuware</option>
              <option value="refurbished">Nur Refurbished (Grad A+)</option>
            </select>

            {/* Only In Stock Toggle */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', cursor: 'pointer', color: '#1E293B', fontWeight: 500 }}>
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
              />
              Nur an Lager
            </label>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="form-control"
              style={{ width: 'auto', fontSize: '0.875rem', padding: '0.55rem 0.85rem' }}
            >
              <option value="featured">Empfehlung / Highlight</option>
              <option value="price_asc">Preis: aufsteigend</option>
              <option value="price_desc">Preis: absteigend</option>
              <option value="name">Name (A–Z)</option>
            </select>

            {(selectedBrand !== 'all' || selectedCondition !== 'all' || onlyInStock || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="btn btn-secondary btn-sm"
                style={{ padding: '0.5rem 0.75rem' }}
                title="Filter zurücksetzen"
              >
                <RotateCcw size={13} /> Reset
              </button>
            )}
          </div>

          {/* Results Count (Desktop) */}
          <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 600 }} className="hide-mobile">
            <span style={{ color: '#174CFF' }}>{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'Artikel' : 'Artikel'} gefunden
          </div>
        </div>

        {/* Expandable Mobile Filters Panel */}
        {mobileFilterOpen && (
          <div
            className="md:hidden"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #DFE3E9',
              padding: '1.25rem',
              marginBottom: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              animation: 'fadeIn 200ms ease'
            }}
          >
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#101318' }}>
              Filter &amp; Sortierung
            </div>

            <div>
              <label className="form-label" style={{ fontSize: '0.8rem' }}>Marke</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="form-control"
              >
                <option value="all">Alle Marken</option>
                {brands.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label" style={{ fontSize: '0.8rem' }}>Zustand</label>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="form-control"
              >
                <option value="all">Alle Zustände</option>
                <option value="new">Nur Neuware</option>
                <option value="refurbished">Nur Refurbished (Grad A+)</option>
              </select>
            </div>

            <div>
              <label className="form-label" style={{ fontSize: '0.8rem' }}>Sortierung</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="form-control"
              >
                <option value="featured">Empfehlung / Highlight</option>
                <option value="price_asc">Preis: aufsteigend</option>
                <option value="price_desc">Preis: absteigend</option>
                <option value="name">Name (A–Z)</option>
              </select>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer', color: '#1E293B', fontWeight: 500, padding: '0.25rem 0' }}>
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
              />
              Nur sofort lieferbar / an Lager
            </label>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                Ergebnisse anzeigen ({filteredProducts.length})
              </button>
              <button
                onClick={handleResetFilters}
                className="btn btn-secondary"
                title="Filter zurücksetzen"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.75rem'
          }}>
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        ) : (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #DFE3E9',
            padding: '4rem 2rem',
            textAlign: 'center',
            color: '#64748B'
          }}>
            <ShoppingBag size={48} color="#CBD5E1" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ color: '#1E293B', marginBottom: '0.5rem' }}>Keine passenden Produkte gefunden</h3>
            <p style={{ fontSize: '0.95rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
              Leider entspricht kein Artikel Ihren aktuellen Filter- und Suchkriterien.
            </p>
            <button onClick={handleResetFilters} className="btn btn-primary">
              Filter zurücksetzen
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
