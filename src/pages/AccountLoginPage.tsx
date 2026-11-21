import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, User, Phone, ArrowRight, ShieldCheck, AlertCircle, KeyRound, CheckCircle2 } from 'lucide-react';

interface AccountLoginPageProps {
  onNavigate: (path: string) => void;
}

export const AccountLoginPage: React.FC<AccountLoginPageProps> = ({ onNavigate }) => {
  const { login, register, isAuthenticated, user } = useAuth();
  const [tab, setTab] = useState<'login' | 'register' | 'forgot'>('login');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (isAuthenticated && user) {
    return (
      <div className="section-padding bg-porcelain min-h-[70vh] flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-8 bg-white border border-silver/30 rounded-2xl shadow-sm text-center">
          <div className="w-16 h-16 bg-cobalt/10 text-cobalt rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold font-heading text-graphite mb-2">Bereits angemeldet</h1>
          <p className="text-sm text-graphite/70 mb-6">
            Sie sind derzeit als <strong>{user.fullName}</strong> ({user.email}) eingeloggt.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => onNavigate('/account/profile')}
              className="btn btn-primary w-full justify-center"
            >
              Zum Kundenprofil
            </button>
            <button
              onClick={() => onNavigate('/')}
              className="btn btn-secondary w-full justify-center"
            >
              Zur Startseite
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return;
    }
    if (!password || password.length < 4) {
      setError('Bitte geben Sie Ihr Passwort ein (mindestens 4 Zeichen).');
      return;
    }

    login(email);
    onNavigate('/account/profile');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Bitte geben Sie Ihren vollständigen Namen ein.');
      return;
    }
    if (!email || !email.includes('@')) {
      setError('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return;
    }
    if (password.length < 6) {
      setError('Das Passwort muss mindestens 6 Zeichen lang sein.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Die Passwörter stimmen nicht überein.');
      return;
    }

    register(name, email, phone);
    onNavigate('/account/profile');
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Bitte geben Sie die E-Mail-Adresse Ihres Kontos ein.');
      return;
    }

    setSuccessMessage(`Ein sicherer Wiederherstellungslink wurde (simuliert) an ${email} gesendet.`);
  };

  const fillDemoAccount = (demoEmail: string, demoName: string) => {
    setEmail(demoEmail);
    setPassword('demoPass2026!');
    setName(demoName);
    setError(null);
  };

  return (
    <div 
      className="bg-gradient-shaph bg-white flex items-center justify-center"
      style={{
        paddingTop: 'clamp(7.5rem, 12vh, 9.25rem)',
        paddingBottom: '4.5rem',
        minHeight: '80vh'
      }}
    >
      <div className="container mx-auto px-4 max-w-5xl" style={{ position: 'relative', zIndex: 10 }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Mobile World Trust & Benefits */}
          <div className="lg:col-span-5 text-left">
            <span className="badge bg-secondary-subtle mb-3">Persönlicher Kundenbereich</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#1B1D1E] tracking-tight leading-tight mb-4">
              Ihr digitaler Begleiter für <em className="font-instrument text-[#4928FD]">Reparatur &amp; Abos</em>
            </h1>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed mb-6">
              Mit Ihrem kostenlosen Mobile World Kundenkonto haben Sie jederzeit volle Übersicht über Ihre Werkstattaufträge, Rechnungen und Provider-Verträge.
            </p>

            {/* 4 Feature Points */}
            <div className="space-y-3.5 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F7F0FE] text-[#4928FD] flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1B1D1E]">Echtzeit Werkstatt-Status</h4>
                  <p className="text-xs text-[#767778]">Live-Verfolgung Ihrer Gerätereparatur in der Filiale Zürich Seebach.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1B1D1E]">Garantie-Nachweis</h4>
                  <p className="text-xs text-[#767778]">6 bis 24 Monate Schweizer Qualitätsgarantie mit einem Klick nachweisen.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FFF7ED] text-[#C2410C] flex items-center justify-center shrink-0 mt-0.5">
                  <KeyRound size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1B1D1E]">Archivierte Verträge &amp; PDFs</h4>
                  <p className="text-xs text-[#767778]">Rechtsgültige Dokumente von Sunrise, Salt, yallo &amp; LEBARA jederzeit downloadbar.</p>
                </div>
              </div>
            </div>

            {/* Local Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#F4F4F4] border border-[#E8E8E8] text-xs text-[#1B1D1E]">
              <span className="w-2 h-2 rounded-full bg-[#79D45E] animate-pulse"></span>
              <span>Werkstatt Seebach geöffnet: Mo–Fr 09:00–19:00 Uhr</span>
            </div>
          </div>

          {/* Right Column: Auth Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[28px] border border-[#E8E8E8] shadow-xl p-6 sm:p-10">
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#1B1D1E] mb-2">
                  {tab === 'login' && 'Willkommen zurück'}
                  {tab === 'register' && 'Neues Konto erstellen'}
                  {tab === 'forgot' && 'Passwort zurücksetzen'}
                </h2>
                <p className="text-sm text-[#767778]">
                  {tab === 'login' && 'Melden Sie sich mit Ihrer E-Mail-Adresse an.'}
                  {tab === 'register' && 'Erstellen Sie Ihr persönliches Kundenkonto in weniger als 1 Minute.'}
                  {tab === 'forgot' && 'Geben Sie Ihre E-Mail ein, um Anweisungen zur Wiederherstellung zu erhalten.'}
                </p>
              </div>

              {/* Tab selector (Raphus Capsule Switcher) */}
              <div className="nav-pill-track w-full p-1 mb-6">
                <button
                  onClick={() => { setTab('login'); setError(null); setSuccessMessage(null); }}
                  className={`nav-pill-item flex-1 justify-center ${tab === 'login' ? 'active' : ''}`}
                >
                  Anmelden
                </button>
                <button
                  onClick={() => { setTab('register'); setError(null); setSuccessMessage(null); }}
                  className={`nav-pill-item flex-1 justify-center ${tab === 'register' ? 'active' : ''}`}
                >
                  Registrieren
                </button>
                <button
                  onClick={() => { setTab('forgot'); setError(null); setSuccessMessage(null); }}
                  className={`nav-pill-item flex-1 justify-center ${tab === 'forgot' ? 'active' : ''}`}
                >
                  Passwort vergessen
                </button>
              </div>

              {/* Feedback messages */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-sm text-red-700">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {successMessage && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-sm text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* TAB 1: LOGIN */}
              {tab === 'login' && (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1B1D1E] mb-1.5">
                      E-Mail-Adresse
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767778]" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ihre.adresse@beispiel.ch"
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-sm text-[#1B1D1E] focus:outline-none focus:ring-2 focus:ring-[#4928FD]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#1B1D1E]">
                        Passwort
                      </label>
                      <button
                        type="button"
                        onClick={() => setTab('forgot')}
                        className="text-xs text-[#4928FD] hover:underline"
                      >
                        Vergessen?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767778]" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-sm text-[#1B1D1E] focus:outline-none focus:ring-2 focus:ring-[#4928FD]"
                        required
                      />
                    </div>
                  </div>

                  {/* Quick Demo Fill Buttons */}
                  <div className="pt-3 pb-1 border-t border-[#E8E8E8] mt-4">
                    <span className="text-[11px] font-semibold text-[#767778] block mb-2">
                      Schnellzugriff Demo-Kunden:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => fillDemoAccount('sandra.meier@gmail.com', 'Sandra Meier')}
                        className="px-2.5 py-1 text-[11px] font-medium bg-[#F4F4F4] hover:bg-[#E8E8E8] text-[#1B1D1E] rounded-full border border-[#E8E8E8] transition-all"
                      >
                        Sandra Meier (Zürich)
                      </button>
                      <button
                        type="button"
                        onClick={() => fillDemoAccount('luca.bernasconi@bluewin.ch', 'Luca Bernasconi')}
                        className="px-2.5 py-1 text-[11px] font-medium bg-[#F4F4F4] hover:bg-[#E8E8E8] text-[#1B1D1E] rounded-full border border-[#E8E8E8] transition-all"
                      >
                        Luca Bernasconi (Kunde)
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-raphus-slide btn-raphus-slide-filled w-full justify-center mt-4 py-3 font-semibold text-sm"
                  >
                    <span className="btn-slide-badge"><ArrowRight size={14} className="btn-slide-icon" /></span>
                    <span className="btn-slide-text">Sicher anmelden</span>
                  </button>
                </form>
              )}

          {/* TAB 2: REGISTER */}
          {tab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1B1D1E] mb-1.5">
                  Vor- und Nachname *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767778]" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Max Muster"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-sm text-[#1B1D1E] focus:outline-none focus:ring-2 focus:ring-[#4928FD]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1B1D1E] mb-1.5">
                  E-Mail-Adresse *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767778]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ihre.adresse@beispiel.ch"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-sm text-[#1B1D1E] focus:outline-none focus:ring-2 focus:ring-[#4928FD]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1B1D1E] mb-1.5">
                  Telefonnummer (optional für Reparatur-SMS)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767778]" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+41 79 123 45 67"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-sm text-[#1B1D1E] focus:outline-none focus:ring-2 focus:ring-[#4928FD]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1B1D1E] mb-1.5">
                    Passwort *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767778]" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mind. 6 Zeichen"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-sm text-[#1B1D1E] focus:outline-none focus:ring-2 focus:ring-[#4928FD]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1B1D1E] mb-1.5">
                    Passwort wiederholen *
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767778]" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Wiederholen"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-sm text-[#1B1D1E] focus:outline-none focus:ring-2 focus:ring-[#4928FD]"
                      required
                    />
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#767778] pt-2">
                Mit Ihrer Registrierung stimmen Sie der Speicherung Ihrer Kontaktdaten gemäss Schweizer Datenschutzgesetz (DSG) zu.
              </p>

              <button
                type="submit"
                className="btn-raphus-slide btn-raphus-slide-filled w-full justify-center mt-4 py-3 font-semibold text-sm"
              >
                <span className="btn-slide-badge"><ArrowRight size={14} className="btn-slide-icon" /></span>
                <span className="btn-slide-text">Konto jetzt erstellen</span>
              </button>
            </form>
          )}

          {/* TAB 3: FORGOT PASSWORD */}
          {tab === 'forgot' && (
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1B1D1E] mb-1.5">
                  Registrierte E-Mail-Adresse
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767778]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ihre.adresse@beispiel.ch"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-sm text-[#1B1D1E] focus:outline-none focus:ring-2 focus:ring-[#4928FD]"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-raphus-slide btn-raphus-slide-filled w-full justify-center py-3 font-semibold text-sm"
              >
                <span className="btn-slide-badge"><ArrowRight size={14} className="btn-slide-icon" /></span>
                <span className="btn-slide-text">Rücksetz-Link anfordern</span>
              </button>

              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => setTab('login')}
                  className="text-xs font-semibold text-[#4928FD] hover:underline"
                >
                  Zurück zur Anmeldung
                </button>
              </div>
            </form>
          )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
