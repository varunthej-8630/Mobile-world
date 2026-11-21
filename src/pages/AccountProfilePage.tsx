import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockDb } from '../data/mockDb';
import { Order, CustomerEnquiry, Contract, SubscriptionPlan } from '../types';
import { ContractViewModal } from '../components/contract/ContractViewModal';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Smartphone,
  Wrench,
  Clock,
  LogOut,
  Save,
  CheckCircle2,
  ShieldCheck,
  FileText,
  ShoppingBag,
  Radio,
  Layers,
  ChevronRight,
  ExternalLink,
  Package,
  AlertCircle,
  Truck,
  Calendar,
  Printer,
  Sparkles
} from 'lucide-react';

interface AccountProfilePageProps {
  onNavigate: (path: string) => void;
}

export const AccountProfilePage: React.FC<AccountProfilePageProps> = ({ onNavigate }) => {
  const { user, logout, updateProfile, isAuthenticated } = useAuth();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'repairs' | 'subscriptions' | 'contracts' | 'profile'>('overview');
  const [isSaved, setIsSaved] = useState(false);
  const [selectedContractForView, setSelectedContractForView] = useState<Contract | null>(null);

  // Form state
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [city, setCity] = useState(user?.city || '');
  const [postalCode, setPostalCode] = useState(user?.postalCode || '');

  // Synchronize form when user loads/changes
  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
      setCity(user.city || '');
      setPostalCode(user.postalCode || '');
    }
  }, [user]);

  if (!isAuthenticated || !user) {
    return (
      <div className="section-padding bg-slate-50 min-h-[70vh] flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200 text-center shadow-sm">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-slate-900 mb-2">Nicht angemeldet</h2>
          <p className="text-sm text-slate-500 mb-6">
            Bitte melden Sie sich an, um auf Ihr persönliches Mobile World Kundenkonto, Ihre Verträge und Ihre Reparaturen zuzugreifen.
          </p>
          <button
            onClick={() => onNavigate('/account')}
            className="btn btn-primary w-full justify-center"
            style={{ minHeight: '46px' }}
          >
            Zur Kundenanmeldung
          </button>
        </div>
      </div>
    );
  }

  // Load customer-isolated data strictly for user.email
  const userOrders: Order[] = mockDb.getOrdersByUser(user.email);
  const userEnquiries: CustomerEnquiry[] = mockDb.getEnquiriesByUser(user.email);
  const userRepairs = userEnquiries.filter(e => e.type === 'repair');
  const userSubEnquiries = userEnquiries.filter(e => e.type === 'subscription');
  const userContracts: Contract[] = mockDb.getContractsByCustomer(user.email);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = updateProfile({
      fullName,
      phone,
      address,
      city,
      postalCode
    });
    if (ok) {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      {/* Account Hero Bar (Raphus Clean Architecture) */}
      <div 
        className="bg-white border-b border-[#E8E8E8]"
        style={{
          paddingTop: 'clamp(7.5rem, 12vh, 9.25rem)',
          paddingBottom: '2.25rem'
        }}
      >
        <div className="container mx-auto px-4" style={{ position: 'relative', zIndex: 10 }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#4928FD] text-white flex items-center justify-center font-bold text-xl font-heading shadow-md">
                {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'K'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold font-heading text-[#1B1D1E]">
                    Grüezi, {user.fullName}!
                  </h1>
                  <span className="badge bg-secondary-subtle">
                    Privatkunde
                  </span>
                </div>
                <p className="text-xs text-[#767778] mt-0.5">
                  {user.email} · Filiale Zürich Seebach
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end md:self-auto">
              <button
                onClick={() => onNavigate('/shop')}
                className="btn-raphus btn-raphus-dark"
                style={{ padding: '0.45rem 0.5rem 0.45rem 1.25rem', fontSize: '0.85rem' }}
              >
                <span>Zum Webshop</span>
                <span className="btn-icon-circle" style={{ width: '28px', height: '28px' }}>
                  <ShoppingBag size={13} />
                </span>
              </button>
              <button
                onClick={() => {
                  logout();
                  onNavigate('/account');
                }}
                className="btn btn-sm"
                style={{ 
                  borderRadius: '9999px', 
                  backgroundColor: '#FFFFFF', 
                  color: '#EF4444', 
                  border: '1px solid #FCA5A5' 
                }}
              >
                <LogOut className="w-4 h-4" />
                <span>Abmelden</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs (Raphus Capsule Switcher) */}
          <div className="nav-pill-track overflow-x-auto scrollbar-none w-full sm:w-auto p-1.5">
            {[
              { id: 'overview', label: 'Meine Übersicht', icon: Layers },
              { id: 'orders', label: `Bestellungen (${userOrders.length})`, icon: ShoppingBag },
              { id: 'repairs', label: `Reparaturen (${userRepairs.length})`, icon: Wrench },
              { id: 'subscriptions', label: `Abonnemente (${userContracts.length + userSubEnquiries.length})`, icon: Radio },
              { id: 'contracts', label: `Verträge & Dokumente (${userContracts.length})`, icon: FileText },
              { id: 'profile', label: 'Profil & Adresse', icon: User }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.5rem 1.15rem',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                    fontWeight: isActive ? 700 : 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    backgroundColor: isActive ? '#1B1D1E' : 'transparent',
                    color: isActive ? '#FFFFFF' : '#374151',
                    border: isActive ? '1px solid #1B1D1E' : '1px solid transparent',
                    boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
                    transition: 'all 180ms ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#111827';
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#374151';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Icon size={15} color={isActive ? '#BA81EE' : '#6B7280'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <main className="container mx-auto px-4 py-8">
        {/* ===================================================================
            TAB 1: MEINE ÜBERSICHT (OVERVIEW)
           =================================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards (Raphus Pastel Cards - Compact & High Information Density with 20px Gaps) */}
            <div 
              className="grid grid-cols-2 sm:grid-cols-4"
              style={{ display: 'grid', gap: '1.25rem' }}
            >
              <div 
                onClick={() => setActiveTab('orders')}
                style={{
                  backgroundColor: '#F7F0FE',
                  border: '1px solid #E9D7FE',
                  borderRadius: '18px',
                  padding: '1rem 1.15rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 10px rgba(186, 129, 238, 0.08)',
                  transition: 'all 200ms ease'
                }}
                className="hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#7E22CE]">Bestellungen</span>
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-xs">
                    <ShoppingBag className="w-3.5 h-3.5 text-[#7E22CE]" />
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-bold font-heading text-[#1B1D1E] tabular-nums">{userOrders.length}</span>
                  <span className="block text-[11px] text-[#6B7280] font-medium">Shop-Aufträge</span>
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('repairs')}
                style={{
                  backgroundColor: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  borderRadius: '18px',
                  padding: '1rem 1.15rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 10px rgba(73, 40, 253, 0.06)',
                  transition: 'all 200ms ease'
                }}
                className="hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1D4ED8]">Reparaturen</span>
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-xs">
                    <Wrench className="w-3.5 h-3.5 text-[#1D4ED8]" />
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-bold font-heading text-[#1B1D1E] tabular-nums">{userRepairs.length}</span>
                  <span className="block text-[11px] text-[#6B7280] font-medium">Werkstattaufträge</span>
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('subscriptions')}
                style={{
                  backgroundColor: '#FFF7ED',
                  border: '1px solid #FED7AA',
                  borderRadius: '18px',
                  padding: '1rem 1.15rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 10px rgba(255, 175, 104, 0.08)',
                  transition: 'all 200ms ease'
                }}
                className="hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C2410C]">Abonnemente</span>
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-xs">
                    <Radio className="w-3.5 h-3.5 text-[#C2410C]" />
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-bold font-heading text-[#1B1D1E] tabular-nums">{userContracts.length}</span>
                  <span className="block text-[11px] text-[#6B7280] font-medium">Aktive Verträge</span>
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('contracts')}
                style={{
                  backgroundColor: '#F0FDF4',
                  border: '1px solid #BBF7D0',
                  borderRadius: '18px',
                  padding: '1rem 1.15rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 10px rgba(121, 212, 94, 0.08)',
                  transition: 'all 200ms ease'
                }}
                className="hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#15803D]">Vertrags-PDFs</span>
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-xs">
                    <FileText className="w-3.5 h-3.5 text-[#15803D]" />
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-bold font-heading text-[#1B1D1E] tabular-nums">{userContracts.length}</span>
                  <span className="block text-[11px] text-[#6B7280] font-medium">Rechtsgültig archiviert</span>
                </div>
              </div>
            </div>

            {/* Latest Order Summary Card */}
            {userOrders.length > 0 && (
              <div 
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '22px',
                  border: '1px solid #E8E8E8',
                  padding: '1.5rem',
                  boxShadow: '0 4px 18px rgba(0, 0, 0, 0.03)'
                }}
              >
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#F1F5F9]">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#4928FD]" />
                    <span>Aktuellste Bestellung: {userOrders[0].orderNumber}</span>
                  </h3>
                  <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${
                    userOrders[0].status === 'ready_for_pickup' ? 'bg-amber-100 text-amber-800' :
                    userOrders[0].status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                    userOrders[0].status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                    userOrders[0].status === 'cancelled' ? 'bg-rose-100 text-rose-800' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {userOrders[0].status === 'ready_for_pickup' ? 'Bereit zur Abholung in Seebach' :
                     userOrders[0].status === 'shipped' ? 'Versendet per PostPac' :
                     userOrders[0].status === 'completed' ? 'Erfolgreich abgeschlossen' :
                     userOrders[0].status === 'cancelled' ? 'Storniert' : 'In Bearbeitung'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block mb-1">Enthaltene Artikel:</span>
                    <ul className="space-y-1">
                      {userOrders[0].items.map((item, i) => (
                        <li key={i} className="font-medium text-slate-800">
                          {item.quantity}x {item.product.name} (CHF {item.product.priceChf.toFixed(2)})
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:text-right">
                    <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block mb-1">Rechnungsbetrag:</span>
                    <span className="text-xl font-bold font-mono text-[#4928FD] block">
                      CHF {userOrders[0].grandTotalChf.toFixed(2)}
                    </span>
                    <span className="text-[11px] text-slate-500">Inkl. 8.1% Schweizer MwSt.</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex justify-end">
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="btn-raphus-slide btn-raphus-slide-sm btn-raphus-slide-primary"
                    style={{ minHeight: '38px', padding: '0.45rem 2.2rem', fontSize: '0.825rem' }}
                  >
                    <span className="btn-slide-badge"><ChevronRight size={13} className="btn-slide-icon" /></span>
                    <span className="btn-slide-text">Zur Bestellübersicht</span>
                  </button>
                </div>
              </div>
            )}

            {/* Quick Actions Grid (Pastel & Interactive with 20px Gaps) */}
            <div 
              className="grid grid-cols-1 sm:grid-cols-3"
              style={{ display: 'grid', gap: '1.25rem' }}
            >
              <div 
                onClick={() => onNavigate('/repair-prices')}
                style={{
                  backgroundColor: '#EFF6FF',
                  borderRadius: '18px',
                  border: '1px solid #BFDBFE',
                  padding: '1.15rem',
                  boxShadow: '0 2px 10px rgba(73, 40, 253, 0.05)',
                  cursor: 'pointer',
                  transition: 'all 200ms ease'
                }}
                className="hover:-translate-y-1 hover:shadow-md group flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-full bg-white text-[#1D4ED8] flex items-center justify-center mb-2.5 shadow-xs">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-[#1B1D1E] text-sm mb-1">Reparaturpreis ermitteln</h4>
                  <p className="text-xs text-[#4B5563] leading-relaxed">
                    Display-, Akku- und Kamera-Reparaturen für iPhone, Samsung und Google mit 12M Garantie.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-[#BFDBFE] flex items-center gap-1 text-xs font-bold text-[#1D4ED8] group-hover:translate-x-1 transition-transform">
                  <span>Preise ansehen</span>
                  <ChevronRight size={13} />
                </div>
              </div>

              <div 
                onClick={() => onNavigate('/subscriptions')}
                style={{
                  backgroundColor: '#FFF7ED',
                  borderRadius: '18px',
                  border: '1px solid #FED7AA',
                  padding: '1.15rem',
                  boxShadow: '0 2px 10px rgba(255, 175, 104, 0.05)',
                  cursor: 'pointer',
                  transition: 'all 200ms ease'
                }}
                className="hover:-translate-y-1 hover:shadow-md group flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-full bg-white text-[#C2410C] flex items-center justify-center mb-2.5 shadow-xs">
                    <Radio className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-[#1B1D1E] text-sm mb-1">Handyabos vergleichen</h4>
                  <p className="text-xs text-[#4B5563] leading-relaxed">
                    Top-Aktionen von Sunrise, Salt, yallo und LEBARA mit kostenloser Rufnummernmitnahme.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-[#FED7AA] flex items-center gap-1 text-xs font-bold text-[#C2410C] group-hover:translate-x-1 transition-transform">
                  <span>Abo finden</span>
                  <ChevronRight size={13} />
                </div>
              </div>

              <div 
                onClick={() => onNavigate('/shop')}
                style={{
                  backgroundColor: '#F0FDF4',
                  borderRadius: '18px',
                  border: '1px solid #BBF7D0',
                  padding: '1.15rem',
                  boxShadow: '0 2px 10px rgba(121, 212, 94, 0.05)',
                  cursor: 'pointer',
                  transition: 'all 200ms ease'
                }}
                className="hover:-translate-y-1 hover:shadow-md group flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-full bg-white text-[#15803D] flex items-center justify-center mb-2.5 shadow-xs">
                    <Package className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-[#1B1D1E] text-sm mb-1">Smartphones &amp; Zubehör</h4>
                  <p className="text-xs text-[#4B5563] leading-relaxed">
                    Geprüfte Neuware und Refurbished Occasionen ab Schweizer Lager in Zürich.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-[#BBF7D0] flex items-center gap-1 text-xs font-bold text-[#15803D] group-hover:translate-x-1 transition-transform">
                  <span>Zum Shop</span>
                  <ChevronRight size={13} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 2: MEINE BESTELLUNGEN (ORDERS)
           =================================================================== */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg text-slate-900">
                Ihre Bestellungen ({userOrders.length})
              </h3>
              <button
                onClick={() => onNavigate('/shop')}
                className="btn btn-secondary btn-sm"
              >
                <ShoppingBag className="w-4 h-4 text-blue-600" />
                <span>Neues Produkt bestellen</span>
              </button>
            </div>

            {userOrders.length === 0 ? (
              <div 
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '22px',
                  border: '1px solid #E8E8E8',
                  padding: '3rem',
                  textAlign: 'center',
                  boxShadow: '0 4px 18px rgba(0, 0, 0, 0.03)'
                }}
              >
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="font-bold text-slate-900 text-base mb-1">Keine Bestellungen vorhanden</h4>
                <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
                  Sie haben noch keine Online-Bestellungen getätigt. Entdecken Sie unser Sortiment an Geräten und Zubehör.
                </p>
                <button
                  onClick={() => onNavigate('/shop')}
                  className="btn-raphus-slide btn-raphus-slide-sm btn-raphus-slide-primary"
                  style={{ minHeight: '38px', padding: '0.45rem 2.2rem', fontSize: '0.825rem' }}
                >
                  <span className="btn-slide-badge"><ShoppingBag size={13} className="btn-slide-icon" /></span>
                  <span className="btn-slide-text">Zum Onlineshop</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {userOrders.map(order => (
                  <div 
                    key={order.id} 
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '22px',
                      border: '1px solid #E8E8E8',
                      padding: '1.5rem',
                      boxShadow: '0 4px 18px rgba(0, 0, 0, 0.03)'
                    }}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                      <div>
                        <span className="font-mono font-bold text-slate-900 text-base block">
                          Auftrag {order.orderNumber}
                        </span>
                        <span className="text-xs text-slate-400">Bestellt am {order.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                          {order.deliveryMethod === 'pickup' ? 'Abholung Seebach' : 'Postversand Priority'}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                          order.status === 'ready_for_pickup' ? 'bg-amber-100 text-amber-800' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                          order.status === 'cancelled' ? 'bg-rose-100 text-rose-800' :
                          'bg-slate-200 text-slate-700'
                        }`}>
                          {order.status === 'ready_for_pickup' ? 'Abholbereit' :
                           order.status === 'shipped' ? 'Versendet' :
                           order.status === 'completed' ? 'Abgeschlossen' :
                           order.status === 'cancelled' ? 'Storniert' : 'In Bearbeitung'}
                        </span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-2 mb-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs py-1.5 border-b border-slate-50 last:border-none">
                          <span className="text-slate-800 font-medium">
                            {item.quantity}x {item.product.name}
                          </span>
                          <span className="font-mono font-semibold text-slate-900">
                            CHF {(item.product.priceChf * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Summary Row */}
                    <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs gap-2">
                      <div className="text-slate-500">
                        {order.notes && <p className="italic">Hinweis: {order.notes}</p>}
                      </div>
                      <div className="text-right self-end sm:self-auto">
                        <span className="text-slate-500 mr-2">Gesamtbetrag (inkl. 8.1% MwSt):</span>
                        <span className="text-base font-bold font-mono text-blue-600">
                          CHF {order.grandTotalChf.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===================================================================
            TAB 3: MEINE REPARATUREN (REPAIRS)
           =================================================================== */}
        {activeTab === 'repairs' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg text-slate-900">
                Ihre Reparaturanfragen ({userRepairs.length})
              </h3>
              <button
                onClick={() => onNavigate('/repair-prices')}
                className="btn btn-secondary btn-sm"
              >
                <Wrench className="w-4 h-4 text-blue-600" />
                <span>Neue Reparatur erfassen</span>
              </button>
            </div>

            {userRepairs.length === 0 ? (
              <div 
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '22px',
                  border: '1px solid #E8E8E8',
                  padding: '3rem',
                  textAlign: 'center',
                  boxShadow: '0 4px 18px rgba(0, 0, 0, 0.03)'
                }}
              >
                <Wrench className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="font-bold text-slate-900 text-base mb-1">Keine aktiven Reparaturanfragen</h4>
                <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
                  Haben Sie ein defektes Display oder einen schwachen Akku? Berechnen Sie die Reparaturkosten online.
                </p>
                <button
                  onClick={() => onNavigate('/repair-prices')}
                  className="btn-raphus-slide btn-raphus-slide-sm btn-raphus-slide-primary"
                  style={{ minHeight: '38px', padding: '0.45rem 2.2rem', fontSize: '0.825rem' }}
                >
                  <span className="btn-slide-badge"><Wrench size={13} className="btn-slide-icon" /></span>
                  <span className="btn-slide-text">Reparaturpreis berechnen</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {userRepairs.map(rep => (
                  <div 
                    key={rep.id} 
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '22px',
                      border: '1px solid #E8E8E8',
                      padding: '1.5rem',
                      boxShadow: '0 4px 18px rgba(0, 0, 0, 0.03)'
                    }}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-3 border-b border-slate-100">
                      <div>
                        <span className="font-bold text-slate-900 text-base block">
                          {rep.details?.model || 'Smartphone-Reparatur'}
                        </span>
                        <span className="text-xs text-blue-600 font-semibold">{rep.details?.repair || 'Express-Reparatur'}</span>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                        rep.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                        rep.status === 'in_progress' ? 'bg-amber-100 text-amber-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {rep.status === 'completed' ? 'Abgeschlossen / Bereit' :
                         rep.status === 'in_progress' ? 'In Werkstattbearbeitung' : 'Neu eingegangen'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 italic mb-3">"{rep.message}"</p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs bg-slate-50 p-3 rounded-xl">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">Geschätzter Preis</span>
                        <span className="font-mono font-bold text-slate-900">{rep.details?.price || 'CHF Auf Anfrage'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">Werkstatt-Filiale</span>
                        <span className="font-semibold text-slate-800">Zürich {rep.branch || 'Seebach'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">Eingangsdatum</span>
                        <span className="text-slate-600">{rep.createdAt}</span>
                      </div>
                    </div>

                    {rep.adminNotes && (
                      <div className="mt-3 p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-blue-900">
                        <strong className="block mb-0.5">Mitteilung vom Werkstattleiter:</strong>
                        {rep.adminNotes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===================================================================
            TAB 4: MEINE ABONNEMENTE (SUBSCRIPTIONS)
           =================================================================== */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg text-slate-900">
                Ihre Mobilfunk-Tarife &amp; Anträge
              </h3>
              <button
                onClick={() => onNavigate('/subscriptions')}
                className="btn btn-secondary btn-sm"
              >
                <Radio className="w-4 h-4 text-blue-600" />
                <span>Weitere Tarife vergleichen</span>
              </button>
            </div>

            {/* Active Contracts Section */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Laufende Mobilfunk-Verträge ({userContracts.length})
              </h4>
              {userContracts.length === 0 ? (
                <div 
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '22px',
                    border: '1px solid #E8E8E8',
                    padding: '2rem',
                    textAlign: 'center',
                    fontSize: '0.85rem',
                    color: '#64748B',
                    boxShadow: '0 4px 18px rgba(0, 0, 0, 0.03)'
                  }}
                >
                  Keine aktiven Verträge hinterlegt.
                </div>
              ) : (
                <div className="space-y-4">
                  {userContracts.map(ctr => (
                    <div 
                      key={ctr.id} 
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '22px',
                        border: '1px solid #E8E8E8',
                        padding: '1.5rem',
                        boxShadow: '0 4px 18px rgba(0, 0, 0, 0.03)'
                      }}
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-3 border-b border-slate-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 font-bold text-xs rounded-full">
                              {ctr.provider}
                            </span>
                            <span className="font-bold text-slate-900 text-base">{ctr.planName}</span>
                          </div>
                          <span className="text-xs text-slate-400 mt-0.5 block">
                            Vertrags-Nr: <strong className="font-mono text-slate-700">{ctr.contractNumber}</strong>
                          </span>
                        </div>
                        <button
                          onClick={() => setSelectedContractForView(ctr)}
                          className="btn btn-primary btn-sm"
                        >
                          <FileText className="w-4 h-4" />
                          <span>Vertragsdokument (PDF)</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-xl">
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Monatspreis</span>
                          <span className="font-mono font-bold text-blue-600 text-sm">CHF {ctr.monthlyPriceChf.toFixed(2)}/Mt.</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Datenvolumen</span>
                          <span className="font-medium text-slate-800">{ctr.dataAllowance}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Roaming</span>
                          <span className="font-medium text-slate-800">{ctr.roamingAllowance}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Vertragslaufzeit</span>
                          <span className="font-medium text-slate-800">{ctr.durationMonths}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pending Enquiries Section */}
            {userSubEnquiries.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Pendente Abo-Beratungsanfragen ({userSubEnquiries.length})
                </h4>
                <div className="space-y-3">
                  {userSubEnquiries.map(sub => (
                    <div key={sub.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm text-xs">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-slate-900 text-sm">{sub.details?.plan || 'Abonnement'}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-800">
                          {sub.status === 'completed' ? 'Abgeschlossen' : 'Pendent / In Abklärung'}
                        </span>
                      </div>
                      <p className="text-slate-600 italic mb-2">"{sub.message}"</p>
                      <span className="text-slate-400 text-[11px]">Eingereicht am {sub.createdAt}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===================================================================
            TAB 5: MEINE VERTRÄGE & DOKUMENTE (CONTRACTS)
           =================================================================== */}
        {activeTab === 'contracts' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg text-slate-900">
                Ihre offiziellen Vertragsdokumente ({userContracts.length})
              </h3>
            </div>

            {userContracts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="font-bold text-slate-900 text-base mb-1">Keine Verträge archiviert</h4>
                <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
                  Sobald Sie in einer unserer Filialen oder online ein Abonnement abschliessen, finden Sie Ihren offiziellen Vertrag hier als druckbares PDF.
                </p>
                <button
                  onClick={() => onNavigate('/subscriptions')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold"
                >
                  Abos vergleichen
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {userContracts.map(ctr => (
                  <div
                    key={ctr.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-blue-300 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900 text-base">{ctr.contractNumber}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                          {ctr.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        <strong>{ctr.provider}:</strong> {ctr.planName} · CHF {ctr.monthlyPriceChf.toFixed(2)}/Mt.
                      </p>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        Ausstellungsdatum: {ctr.createdAt.slice(0, 10)} · Filiale Zürich Seebach
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedContractForView(ctr)}
                      className="btn btn-primary btn-sm self-end sm:self-auto"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Vertrag öffnen &amp; Drucken</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===================================================================
            TAB 6: MEIN PROFIL (PROFILE SETTINGS)
           =================================================================== */}
        {activeTab === 'profile' && (
          <div 
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid #E8E8E8',
              padding: '2rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
              maxWidth: '42rem'
            }}
          >
            <div className="mb-6 pb-4 border-b border-[#F1F5F9]">
              <h3 className="font-bold text-lg text-slate-900">Persönliche Angaben &amp; Lieferadresse</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Diese Daten werden automatisch für Ihre Reparatur- und Shop-Bestellungen verwendet.
              </p>
            </div>

            {isSaved && (
              <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Ihre Profilangaben wurden erfolgreich gespeichert.</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Vor- &amp; Nachname</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{
                    border: '1px solid #E2E8F0',
                    borderRadius: '12px',
                    padding: '0.65rem 1rem',
                    fontSize: '0.9rem'
                  }}
                  className="w-full focus:outline-none focus:ring-2 focus:ring-[#4928FD]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">E-Mail-Adresse (Geschützt)</label>
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    style={{
                      border: '1px solid #E2E8F0',
                      borderRadius: '12px',
                      padding: '0.65rem 1rem',
                      fontSize: '0.9rem',
                      backgroundColor: '#F8FAFC'
                    }}
                    className="w-full text-slate-500 cursor-not-allowed font-mono"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Dient als Kundenkennung</span>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Mobiltelefon für SMS-Benachrichtigung</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      border: '1px solid #E2E8F0',
                      borderRadius: '12px',
                      padding: '0.65rem 1rem',
                      fontSize: '0.9rem'
                    }}
                    className="w-full focus:outline-none focus:ring-2 focus:ring-[#4928FD] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Strasse &amp; Hausnummer</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="z.B. Schaffhauserstrasse 120"
                  style={{
                    border: '1px solid #E2E8F0',
                    borderRadius: '12px',
                    padding: '0.65rem 1rem',
                    fontSize: '0.9rem'
                  }}
                  className="w-full focus:outline-none focus:ring-2 focus:ring-[#4928FD]"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">PLZ</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="8052"
                    style={{
                      border: '1px solid #E2E8F0',
                      borderRadius: '12px',
                      padding: '0.65rem 1rem',
                      fontSize: '0.9rem'
                    }}
                    className="w-full focus:outline-none focus:ring-2 focus:ring-[#4928FD] font-mono"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-bold text-slate-700 mb-1.5">Wohnort</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Zürich"
                    style={{
                      border: '1px solid #E2E8F0',
                      borderRadius: '12px',
                      padding: '0.65rem 1rem',
                      fontSize: '0.9rem'
                    }}
                    className="w-full focus:outline-none focus:ring-2 focus:ring-[#4928FD]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#F1F5F9] flex justify-between items-center">
                <span className="text-[11px] text-slate-400">
                  Registriert am: {user.registeredAt || '2026-10-01'}
                </span>
                <button
                  type="submit"
                  className="btn-raphus-slide btn-raphus-slide-filled"
                  style={{ minHeight: '46px', padding: '0.65rem 2.85rem' }}
                >
                  <span className="btn-slide-badge"><CheckCircle2 size={14} className="btn-slide-icon" /></span>
                  <span className="btn-slide-text">Profil speichern</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Contract PDF Viewer Modal */}
      <ContractViewModal
        contract={selectedContractForView}
        onClose={() => setSelectedContractForView(null)}
      />
    </div>
  );
};
