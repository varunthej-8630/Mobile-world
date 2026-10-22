import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockDb } from '../data/mockDb';
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
  FileText
} from 'lucide-react';

interface AccountProfilePageProps {
  onNavigate: (path: string) => void;
}

export const AccountProfilePage: React.FC<AccountProfilePageProps> = ({ onNavigate }) => {
  const { user, logout, isAuthenticated } = useAuth();

  const [activeTab, setActiveTab] = useState<'profile' | 'devices' | 'enquiries'>('profile');
  const [isSaved, setIsSaved] = useState(false);

  // Editable fields
  const [fullName, setFullName] = useState(user?.fullName || 'Sandra Meier');
  const [phone, setPhone] = useState(user?.phone || '+41 79 123 45 67');
  const [address, setAddress] = useState(user?.address || 'Schaffhauserstrasse 120');
  const [city, setCity] = useState(user?.city || 'Zürich');
  const [postalCode, setPostalCode] = useState(user?.postalCode || '8052');

  if (!isAuthenticated || !user) {
    return (
      <div className="section-padding bg-porcelain min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-silver/30 text-center">
          <User className="w-12 h-12 text-graphite/40 mx-auto mb-4" />
          <h2 className="text-2xl font-bold font-heading text-graphite mb-2">Nicht angemeldet</h2>
          <p className="text-sm text-graphite/70 mb-6">
            Bitte melden Sie sich an, um auf Ihr persönliches Mobile World Kundenkonto zuzugreifen.
          </p>
          <button
            onClick={() => onNavigate('/account')}
            className="btn btn-primary w-full justify-center"
          >
            Zur Anmeldung
          </button>
        </div>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const enquiries = mockDb.getEnquiries();

  return (
    <div className="bg-porcelain py-12 md:py-16">
      <div className="container-custom">
        {/* Prototype Transparency Notice */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-8 flex items-start gap-3 text-xs text-blue-900 leading-relaxed">
          <ShieldCheck className="w-5 h-5 text-cobalt shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block text-cobalt">Kundenkonto-Prototyp (Client Demo):</strong>
            Hier sehen Sie die geplante Kundenkonto-Architektur. Kundendaten, registrierte Geräte und Reparaturstatus werden in diesem Prototyp lokal simuliert.
          </div>
        </div>

        {/* Account Header */}
        <div className="bg-white rounded-2xl border border-silver/30 p-6 md:p-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-graphite text-white flex items-center justify-center font-heading font-bold text-2xl">
              {user.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold font-heading text-graphite">{user.fullName}</h1>
                <span className="badge badge-cobalt text-[10px]">Privatkunde</span>
              </div>
              <p className="text-xs text-graphite/60 mt-0.5">{user.email} · Kunde seit {user.registeredAt}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                logout();
                onNavigate('/account');
              }}
              className="btn btn-secondary text-xs px-4 py-2 border-red-200 text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" />
              <span>Abmelden</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-silver/30 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 px-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'profile'
                ? 'border-cobalt text-cobalt'
                : 'border-transparent text-graphite/60 hover:text-graphite'
            }`}
          >
            Persönliche Daten
          </button>
          <button
            onClick={() => setActiveTab('devices')}
            className={`pb-3 px-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'devices'
                ? 'border-cobalt text-cobalt'
                : 'border-transparent text-graphite/60 hover:text-graphite'
            }`}
          >
            Meine Geräte (2)
          </button>
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`pb-3 px-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'enquiries'
                ? 'border-cobalt text-cobalt'
                : 'border-transparent text-graphite/60 hover:text-graphite'
            }`}
          >
            Anfragen & Reparaturen ({enquiries.length})
          </button>
        </div>

        {/* TAB 1: Profile Details */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl border border-silver/30 p-6 md:p-8 max-w-2xl shadow-sm">
            <h2 className="text-lg font-bold font-heading text-graphite mb-1">Kontaktdaten & Adresse</h2>
            <p className="text-xs text-graphite/60 mb-6">
              Diese Daten werden automatisch bei Reparaturanfragen und Bestellungen vorausgefüllt.
            </p>

            {isSaved && (
              <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-xs text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Änderungen wurden erfolgreich im Browser-Speicher gesichert!</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-graphite mb-1">
                  Vollständiger Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite/40" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-porcelain border border-silver/30 rounded-lg text-sm text-graphite"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-graphite mb-1">
                  E-Mail-Adresse (nicht änderbar)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite/40" />
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full pl-9 pr-3 py-2 bg-silver/10 border border-silver/20 rounded-lg text-sm text-graphite/60 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-graphite mb-1">
                  Telefonnummer
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite/40" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-porcelain border border-silver/30 rounded-lg text-sm text-graphite"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase text-graphite mb-1">
                    Strasse & Nr.
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite/40" />
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-porcelain border border-silver/30 rounded-lg text-sm text-graphite"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-graphite mb-1">
                    PLZ / Ort
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-20 px-2 py-2 bg-porcelain border border-silver/30 rounded-lg text-sm text-graphite"
                    />
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-2 py-2 bg-porcelain border border-silver/30 rounded-lg text-sm text-graphite"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" className="btn btn-primary text-xs px-5 py-2.5">
                  <Save className="w-3.5 h-3.5 mr-1.5" />
                  <span>Änderungen speichern</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: Registered Devices */}
        {activeTab === 'devices' && (
          <div className="space-y-4 max-w-3xl">
            <div className="bg-white rounded-2xl border border-silver/30 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-porcelain rounded-xl flex items-center justify-center text-graphite">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-graphite">iPhone 15 Pro (256 GB)</h3>
                    <span className="badge badge-emerald text-[10px]">In Betrieb</span>
                  </div>
                  <p className="text-xs text-graphite/60 mt-0.5">Farbe: Titan Natur · Letzter Service: Display-Reparatur (OEM OLED)</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('/repair-prices')}
                className="btn btn-secondary text-xs px-3 py-1.5 whitespace-nowrap"
              >
                <Wrench className="w-3.5 h-3.5 mr-1" />
                <span>Reparatur prüfen</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-silver/30 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-porcelain rounded-xl flex items-center justify-center text-graphite">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-graphite">Apple Watch Ultra 2</h3>
                    <span className="badge badge-silver text-[10px]">MobileWorld Care</span>
                  </div>
                  <p className="text-xs text-graphite/60 mt-0.5">Titanium Case · Schutzpaket aktiv bis Nov 2026</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('/services/insurance')}
                className="btn btn-secondary text-xs px-3 py-1.5 whitespace-nowrap"
              >
                <span>Care Details</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: Enquiries */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-2xl border border-silver/30 p-6 md:p-8 shadow-sm">
            <h2 className="text-lg font-bold font-heading text-graphite mb-1">Aktuelle Reparatur- & Abo-Anfragen</h2>
            <p className="text-xs text-graphite/60 mb-6">
              Übersicht aller über diese Website eingereichten Support- und Preisanfragen.
            </p>

            <div className="space-y-4">
              {enquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="p-4 rounded-xl border border-silver/20 bg-porcelain/40 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-graphite">
                        {enq.type === 'repair' ? 'Reparaturanfrage' : 'Abonnementberatung'}
                      </span>
                      <span className={`badge ${
                        enq.status === 'new' ? 'badge-cobalt' :
                        enq.status === 'in_progress' ? 'badge-emerald' : 'badge-silver'
                      } text-[10px]`}>
                        {enq.status === 'new' ? 'Neu eingegangen' :
                         enq.status === 'in_progress' ? 'In Bearbeitung' : 'Abgeschlossen'}
                      </span>
                      <span className="text-xs text-graphite/50">#{enq.id}</span>
                    </div>

                    <div className="text-xs text-graphite/80 flex items-center gap-3">
                      <span>Filiale: <strong>{enq.branch}</strong></span>
                      {enq.details.model && <span>Gerät: <strong>{enq.details.model}</strong></span>}
                      {enq.details.repair && <span>Reparatur: <strong>{enq.details.repair}</strong></span>}
                      {enq.details.price && <span className="text-cobalt font-bold">{enq.details.price}</span>}
                    </div>

                    {enq.message && (
                      <p className="text-xs text-graphite/60 italic mt-1">«{enq.message}»</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-graphite/50 shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{enq.createdAt}</span>
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
