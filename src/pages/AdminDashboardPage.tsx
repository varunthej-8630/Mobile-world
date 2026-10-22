import React, { useState } from 'react';
import { mockDb } from '../data/mockDb';
import { Product, RepairPriceRecord, CustomerEnquiry } from '../types';
import {
  Wrench,
  Package,
  Inbox,
  Search,
  Plus,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Edit2,
  DollarSign,
  TrendingDown,
  Layers,
  Save,
  Filter
} from 'lucide-react';

interface AdminDashboardPageProps {
  onNavigate: (path: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'repairs' | 'products' | 'enquiries'>('repairs');

  // Local state initialized from mockDb
  const [repairs, setRepairs] = useState<RepairPriceRecord[]>(mockDb.getRepairs());
  const [products, setProducts] = useState<Product[]>(mockDb.getProducts());
  const [enquiries, setEnquiries] = useState<CustomerEnquiry[]>(mockDb.getEnquiries());

  // Search & filter states
  const [repairSearch, setRepairSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [productStockFilter, setProductStockFilter] = useState<'all' | 'low' | 'out'>('all');

  // Inline edit state
  const [editingRepairId, setEditingRepairId] = useState<string | null>(null);
  const [editPriceChf, setEditPriceChf] = useState<number>(0);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  // --- REPAIR ACTIONS ---
  const handleStartEditRepair = (record: RepairPriceRecord) => {
    setEditingRepairId(record.id);
    setEditPriceChf(record.priceChf || 0);
  };

  const handleSaveRepair = (id: string) => {
    const ok = mockDb.updateRepair(id, { priceChf: editPriceChf });
    if (ok) {
      setRepairs([...mockDb.getRepairs()]);
      setEditingRepairId(null);
      showNotification(`Reparaturpreis für ID ${id} auf CHF ${editPriceChf}.- aktualisiert.`);
    }
  };

  const handleResetRepairs = () => {
    if (window.confirm('Möchten Sie alle Reparaturpreise auf die offiziellen Mobile World Standardwerte zurücksetzen?')) {
      mockDb.resetRepairs();
      setRepairs([...mockDb.getRepairs()]);
      showNotification('Offizielle Mobile World Reparaturpreise wiederhergestellt.');
    }
  };

  // --- PRODUCT ACTIONS ---
  const handleUpdateStock = (productId: string, delta: number) => {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;
    const newQty = Math.max(0, prod.quantityOnHand + delta);
    mockDb.updateProductStock(productId, newQty);
    setProducts([...mockDb.getProducts()]);
    showNotification(`Lagerbestand für "${prod.name}" auf ${newQty} Stk. geändert.`);
  };

  const handleResetProducts = () => {
    if (window.confirm('Möchten Sie alle Produkte & Bestände auf die Standardwerte zurücksetzen?')) {
      mockDb.resetProducts();
      setProducts([...mockDb.getProducts()]);
      showNotification('Produktbestand zurückgesetzt.');
    }
  };

  // Filtered lists
  const filteredRepairs = repairs.filter(r =>
    r.model.toLowerCase().includes(repairSearch.toLowerCase()) ||
    r.repairTask.toLowerCase().includes(repairSearch.toLowerCase()) ||
    r.manufacturer.toLowerCase().includes(repairSearch.toLowerCase())
  );

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                          p.brand.toLowerCase().includes(productSearch.toLowerCase()) ||
                          p.sku.toLowerCase().includes(productSearch.toLowerCase());
    if (!matchesSearch) return false;
    if (productStockFilter === 'low') return p.stockStatus === 'low_stock';
    if (productStockFilter === 'out') return p.stockStatus === 'out_of_stock';
    return true;
  });

  return (
    <div className="bg-porcelain py-10 md:py-16 min-h-screen">
      <div className="container-custom">
        {/* Prototype Transparency Notice */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 md:p-5 mb-8 flex items-start gap-3 text-xs md:text-sm text-amber-950 leading-relaxed shadow-sm">
          <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block text-amber-900 mb-1">
              Internes Mitarbeiter-Portal (Demo Prototype):
            </strong>
            Dieses Administrations-Cockpit demonstriert die vom Kunden geforderte eigenständige Preis- und Bestandsverwaltung. Änderungen werden im lokalen Browser-Speicher (LocalStorage) persistiert und wirken sich direkt auf den Reparatur-Finder und Shop aus. In der finalen Produktion werden Berechtigungsrollen (Content Editor, Price Manager, Store Manager) über ein gesichertes Schweizer Backend angebunden.
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="badge badge-graphite">Mobile World ZH Seebach</span>
              <span className="badge badge-emerald">Filial-Administration</span>
            </div>
            <h1 className="text-3xl font-bold font-heading text-graphite">
              Verwaltungs-Cockpit
            </h1>
            <p className="text-xs text-graphite/60 mt-1">
              Zentrale Verwaltung von Reparaturtarifen, Filial-Lagerbeständen und Kundenanfragen.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/repair-prices')}
              className="btn btn-secondary text-xs px-3.5 py-2"
            >
              <Wrench className="w-3.5 h-3.5 mr-1.5" />
              <span>Zum Preis-Finder</span>
            </button>
            <button
              onClick={() => onNavigate('/shop')}
              className="btn btn-secondary text-xs px-3.5 py-2"
            >
              <Package className="w-3.5 h-3.5 mr-1.5" />
              <span>Zum Shop</span>
            </button>
          </div>
        </div>

        {/* Global Notification */}
        {successMsg && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-2 text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-silver/30 mb-8 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('repairs')}
            className={`py-3 px-5 text-sm font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'repairs'
                ? 'border-cobalt text-cobalt bg-white rounded-t-xl'
                : 'border-transparent text-graphite/60 hover:text-graphite'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Reparaturpreise ({repairs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 px-5 text-sm font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'products'
                ? 'border-cobalt text-cobalt bg-white rounded-t-xl'
                : 'border-transparent text-graphite/60 hover:text-graphite'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Lagerbestand & Shop ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`py-3 px-5 text-sm font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'enquiries'
                ? 'border-cobalt text-cobalt bg-white rounded-t-xl'
                : 'border-transparent text-graphite/60 hover:text-graphite'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Kundenanfragen ({enquiries.length})</span>
          </button>
        </div>

        {/* TAB 1: REPAIR PRICING MANAGEMENT */}
        {activeTab === 'repairs' && (
          <div className="bg-white rounded-2xl border border-silver/30 shadow-sm p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite/40" />
                <input
                  type="text"
                  placeholder="Modell oder Reparatur filtern (z.B. iPhone 15, Akku)..."
                  value={repairSearch}
                  onChange={(e) => setRepairSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-porcelain border border-silver/30 rounded-lg text-xs md:text-sm text-graphite focus:outline-none focus:border-cobalt"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetRepairs}
                  className="btn btn-secondary text-xs px-3 py-2 text-graphite/70 hover:text-graphite"
                  title="Auf Werkspreise zurücksetzen"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                  <span>Preise zurücksetzen</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-silver/30 text-graphite/60 uppercase font-semibold text-[11px] tracking-wider">
                    <th className="py-3 px-4">Hersteller / Modell</th>
                    <th className="py-3 px-4">Reparaturart / Teil</th>
                    <th className="py-3 px-4">Qualität / Garantie</th>
                    <th className="py-3 px-4 text-right">Preis (CHF)</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Aktion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-silver/20">
                  {filteredRepairs.map((r) => {
                    const isEditing = editingRepairId === r.id;
                    return (
                      <tr key={r.id} className="hover:bg-porcelain/50 transition-colors">
                        <td className="py-3 px-4 font-medium text-graphite">
                          <span className="text-xs text-graphite/50 block font-normal">{r.manufacturer}</span>
                          {r.model}
                        </td>
                        <td className="py-3 px-4 text-graphite">
                          {r.repairTask}
                          {r.durationEstimate && (
                            <span className="block text-[11px] text-graphite/50">Dauer: {r.durationEstimate}</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-graphite/70 text-xs">
                          <span className="badge badge-silver text-[10px]">{r.qualityGrade || 'Standard'}</span>
                          <span className="block text-[10px] text-graphite/50 mt-0.5">{r.warrantyMonths} Monate Garantie</span>
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-graphite">
                          {isEditing ? (
                            <div className="flex items-center justify-end gap-1">
                              <span className="text-xs">CHF</span>
                              <input
                                type="number"
                                value={editPriceChf}
                                onChange={(e) => setEditPriceChf(Number(e.target.value))}
                                className="w-20 px-2 py-1 bg-porcelain border border-cobalt rounded text-right text-xs"
                                autoFocus
                              />
                            </div>
                          ) : (
                            <span>CHF {r.priceChf ? `${r.priceChf}.-` : 'Auf Anfrage'}</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`badge ${r.priceType === 'fixed' ? 'badge-emerald' : 'badge-cobalt'} text-[10px]`}>
                            {r.priceType === 'fixed' ? 'Fixpreis' : 'Ab-Preis'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          {isEditing ? (
                            <button
                              onClick={() => handleSaveRepair(r.id)}
                              className="btn btn-primary text-xs px-2.5 py-1"
                            >
                              <Save className="w-3 h-3 mr-1" />
                              <span>Speichern</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStartEditRepair(r)}
                              className="p-1.5 hover:bg-silver/20 rounded text-graphite/70 hover:text-cobalt transition-colors"
                              title="Preis bearbeiten"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: INVENTORY & STOCK MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl border border-silver/30 shadow-sm p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite/40" />
                <input
                  type="text"
                  placeholder="Produktname, Marke oder SKU filtern..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-porcelain border border-silver/30 rounded-lg text-xs md:text-sm text-graphite focus:outline-none focus:border-cobalt"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex bg-porcelain p-1 rounded-lg border border-silver/30 text-xs">
                  <button
                    onClick={() => setProductStockFilter('all')}
                    className={`px-3 py-1 rounded-md font-medium transition-colors ${
                      productStockFilter === 'all' ? 'bg-white shadow-sm text-graphite' : 'text-graphite/60'
                    }`}
                  >
                    Alle ({products.length})
                  </button>
                  <button
                    onClick={() => setProductStockFilter('low')}
                    className={`px-3 py-1 rounded-md font-medium transition-colors ${
                      productStockFilter === 'low' ? 'bg-white shadow-sm text-amber-700' : 'text-graphite/60'
                    }`}
                  >
                    Knapp
                  </button>
                  <button
                    onClick={() => setProductStockFilter('out')}
                    className={`px-3 py-1 rounded-md font-medium transition-colors ${
                      productStockFilter === 'out' ? 'bg-white shadow-sm text-red-700' : 'text-graphite/60'
                    }`}
                  >
                    Ausverkauft
                  </button>
                </div>

                <button
                  onClick={handleResetProducts}
                  className="btn btn-secondary text-xs px-3 py-2 text-graphite/70"
                  title="Bestände zurücksetzen"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-silver/30 text-graphite/60 uppercase font-semibold text-[11px] tracking-wider">
                    <th className="py-3 px-4">Produkt & SKU</th>
                    <th className="py-3 px-4">Kategorie</th>
                    <th className="py-3 px-4 text-right">Verkaufspreis</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-center">Bestand Seebach</th>
                    <th className="py-3 px-4 text-right">Bestand anpassen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-silver/20">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-porcelain/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            className="w-10 h-10 object-cover rounded-lg border border-silver/20 bg-porcelain"
                          />
                          <div>
                            <span className="font-semibold text-graphite block">{p.name}</span>
                            <span className="text-[11px] text-graphite/50 font-mono">SKU: {p.sku}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-graphite/70">
                        <span className="capitalize">{p.category}</span>
                        {p.condition && (
                          <span className="block text-[10px] text-graphite/50 capitalize">
                            Zustand: {p.condition === 'new' ? 'Neuware' : 'Refurbished'}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-graphite">
                        CHF {p.priceChf}.-
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`badge ${
                          p.stockStatus === 'in_stock' ? 'badge-emerald' :
                          p.stockStatus === 'low_stock' ? 'badge-amber text-amber-800' : 'badge-silver text-red-600'
                        } text-[10px]`}>
                          {p.stockStatus === 'in_stock' ? 'Verfügbar' :
                           p.stockStatus === 'low_stock' ? 'Nur noch wenige' : 'Ausverkauft'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-bold">
                        <span className={`text-sm ${p.quantityOnHand === 0 ? 'text-red-600' : 'text-graphite'}`}>
                          {p.quantityOnHand} Stk.
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleUpdateStock(p.id, -1)}
                            disabled={p.quantityOnHand <= 0}
                            className="w-7 h-7 bg-porcelain border border-silver/30 rounded flex items-center justify-center font-bold text-graphite hover:bg-silver/20 disabled:opacity-30 disabled:cursor-not-allowed"
                            title="1 Stück abbuchen"
                          >
                            -
                          </button>
                          <button
                            onClick={() => handleUpdateStock(p.id, 1)}
                            className="w-7 h-7 bg-porcelain border border-silver/30 rounded flex items-center justify-center font-bold text-graphite hover:bg-silver/20"
                            title="1 Stück zubuchen"
                          >
                            +
                          </button>
                          <button
                            onClick={() => handleUpdateStock(p.id, 5)}
                            className="px-2 py-1 bg-porcelain border border-silver/30 rounded text-[10px] font-semibold text-graphite hover:bg-silver/20"
                            title="+5 Stück Wareneingang"
                          >
                            +5
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOMER ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-2xl border border-silver/30 shadow-sm p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold font-heading text-graphite">Kundenanfragen-Eingang</h2>
                <p className="text-xs text-graphite/60">
                  Alle Reparatur-, Abonnement- und Geschäftskunden-Anfragen in Echtzeit.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {enquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="p-5 rounded-xl border border-silver/20 bg-porcelain/30 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-graphite">{enq.customerName}</span>
                      <span className="text-xs text-graphite/50">({enq.email})</span>
                      <span className="badge badge-cobalt text-[10px]">{enq.type}</span>
                      <span className={`badge ${enq.status === 'new' ? 'badge-emerald' : 'badge-silver'} text-[10px]`}>
                        {enq.status}
                      </span>
                    </div>

                    <div className="text-xs text-graphite/70 flex flex-wrap gap-x-4 gap-y-1">
                      <span>Tel: <strong>{enq.phone}</strong></span>
                      <span>Filiale: <strong>{enq.branch}</strong></span>
                      {enq.details.model && <span>Gerät: <strong>{enq.details.model}</strong></span>}
                      {enq.details.repair && <span>Reparatur: <strong>{enq.details.repair}</strong></span>}
                      {enq.details.price && <span className="text-cobalt font-semibold">{enq.details.price}</span>}
                    </div>

                    {enq.message && (
                      <p className="text-xs text-graphite/80 bg-white p-2.5 rounded-lg border border-silver/20 mt-1">
                        «{enq.message}»
                      </p>
                    )}
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs text-graphite/50 block mb-2">{enq.createdAt}</span>
                    <a
                      href={`https://wa.me/41783448888?text=${encodeURIComponent(`Hallo ${enq.customerName}, danke für Ihre Anfrage bezüglich ${enq.details.model || 'Ihrem Anliegen'} bei Mobile World Zürich.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary text-xs px-3 py-1.5 text-emerald-700 border-emerald-300 hover:bg-emerald-50"
                    >
                      Per WhatsApp antworten
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
