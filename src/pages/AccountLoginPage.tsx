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
    <div className="bg-porcelain py-16 md:py-24">
      <div className="container-custom max-w-xl">
        {/* Prototype Transparency Notice */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-8 flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
          <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block text-amber-800">Prototyp-Hinweis & Kundendatenschutz:</strong>
            Dies ist ein interaktiver Design- & Funktionsprototyp für Mobile World Zürich. Zu Demonstrationszwecken wird kein echtes Passwort auf Servern gespeichert. In der Produktionsversion wird ein zertifizierter OAuth2/JWT-Dienst mit Schweizer Serverstandort integriert.
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-silver/30 shadow-md p-6 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="badge badge-cobalt mb-3">Mobile World Kundenbereich</span>
            <h1 className="text-3xl font-bold font-heading text-graphite mb-2">
              {tab === 'login' && 'Willkommen zurück'}
              {tab === 'register' && 'Neues Konto erstellen'}
              {tab === 'forgot' && 'Passwort zurücksetzen'}
            </h1>
            <p className="text-sm text-graphite/70">
              {tab === 'login' && 'Verwalten Sie Reparaturanfragen, Abos und persönliche Gerätedaten.'}
              {tab === 'register' && 'Erstellen Sie Ihr persönliches Kundenkonto in weniger als 1 Minute.'}
              {tab === 'forgot' && 'Geben Sie Ihre E-Mail ein, um Anweisungen zur Wiederherstellung zu erhalten.'}
            </p>
          </div>

          {/* Tab selector */}
          <div className="flex border-b border-silver/20 mb-8">
            <button
              onClick={() => { setTab('login'); setError(null); setSuccessMessage(null); }}
              className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-all ${
                tab === 'login'
                  ? 'border-cobalt text-cobalt'
                  : 'border-transparent text-graphite/60 hover:text-graphite'
              }`}
            >
              Anmelden
            </button>
            <button
              onClick={() => { setTab('register'); setError(null); setSuccessMessage(null); }}
              className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-all ${
                tab === 'register'
                  ? 'border-cobalt text-cobalt'
                  : 'border-transparent text-graphite/60 hover:text-graphite'
              }`}
            >
              Registrieren
            </button>
            <button
              onClick={() => { setTab('forgot'); setError(null); setSuccessMessage(null); }}
              className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-all ${
                tab === 'forgot'
                  ? 'border-cobalt text-cobalt'
                  : 'border-transparent text-graphite/60 hover:text-graphite'
              }`}
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

          {/* Quick Demo Fill Buttons */}
          {tab !== 'forgot' && (
            <div className="mb-6 p-4 bg-porcelain rounded-xl border border-silver/20">
              <span className="text-xs font-semibold text-graphite/70 uppercase tracking-wider block mb-2">
                1-Klick Demo-Zugang (Präsentation):
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => fillDemoAccount('sandra.meier@gmail.com', 'Sandra Meier')}
                  className="px-3 py-1.5 bg-white border border-silver/40 text-graphite text-xs rounded-lg hover:border-cobalt hover:text-cobalt font-medium transition-colors"
                >
                  Als Privatkundin (Sandra Meier)
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoAccount('m.keller@sunrise.ch', 'Marc Keller')}
                  className="px-3 py-1.5 bg-white border border-silver/40 text-graphite text-xs rounded-lg hover:border-cobalt hover:text-cobalt font-medium transition-colors"
                >
                  Als Geschäftskunde (Marc Keller)
                </button>
              </div>
            </div>
          )}

          {/* TAB 1: LOGIN */}
          {tab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-graphite mb-1.5">
                  E-Mail-Adresse
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ihre.adresse@beispiel.ch"
                    className="w-full pl-10 pr-4 py-2.5 bg-porcelain border border-silver/30 rounded-lg text-sm text-graphite focus:outline-none focus:border-cobalt"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-graphite">
                    Passwort
                  </label>
                  <button
                    type="button"
                    onClick={() => setTab('forgot')}
                    className="text-xs text-cobalt hover:underline"
                  >
                    Vergessen?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite/40" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-porcelain border border-silver/30 rounded-lg text-sm text-graphite focus:outline-none focus:border-cobalt"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full justify-center mt-6 py-3 font-semibold text-sm"
              >
                <span>Sicher anmelden</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </button>
            </form>
          )}

          {/* TAB 2: REGISTER */}
          {tab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-graphite mb-1.5">
                  Vor- und Nachname *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite/40" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Max Muster"
                    className="w-full pl-10 pr-4 py-2.5 bg-porcelain border border-silver/30 rounded-lg text-sm text-graphite focus:outline-none focus:border-cobalt"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-graphite mb-1.5">
                  E-Mail-Adresse *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ihre.adresse@beispiel.ch"
                    className="w-full pl-10 pr-4 py-2.5 bg-porcelain border border-silver/30 rounded-lg text-sm text-graphite focus:outline-none focus:border-cobalt"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-graphite mb-1.5">
                  Telefonnummer (optional für Reparatur-SMS)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite/40" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+41 79 123 45 67"
                    className="w-full pl-10 pr-4 py-2.5 bg-porcelain border border-silver/30 rounded-lg text-sm text-graphite focus:outline-none focus:border-cobalt"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-graphite mb-1.5">
                    Passwort *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite/40" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mind. 6 Zeichen"
                      className="w-full pl-10 pr-4 py-2.5 bg-porcelain border border-silver/30 rounded-lg text-sm text-graphite focus:outline-none focus:border-cobalt"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-graphite mb-1.5">
                    Passwort wiederholen *
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite/40" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Wiederholen"
                      className="w-full pl-10 pr-4 py-2.5 bg-porcelain border border-silver/30 rounded-lg text-sm text-graphite focus:outline-none focus:border-cobalt"
                      required
                    />
                  </div>
                </div>
              </div>

              <p className="text-xs text-graphite/60 pt-2">
                Mit Ihrer Registrierung stimmen Sie der Speicherung Ihrer Kontaktdaten gemäss Schweizer Datenschutzgesetz (DSG) zu.
              </p>

              <button
                type="submit"
                className="btn btn-primary w-full justify-center mt-4 py-3 font-semibold text-sm"
              >
                <span>Konto jetzt erstellen</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </button>
            </form>
          )}

          {/* TAB 3: FORGOT PASSWORD */}
          {tab === 'forgot' && (
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-graphite mb-1.5">
                  Registrierte E-Mail-Adresse
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ihre.adresse@beispiel.ch"
                    className="w-full pl-10 pr-4 py-2.5 bg-porcelain border border-silver/30 rounded-lg text-sm text-graphite focus:outline-none focus:border-cobalt"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full justify-center py-3 font-semibold text-sm"
              >
                <span>Rücksetz-Link anfordern</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </button>

              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => setTab('login')}
                  className="text-xs font-semibold text-cobalt hover:underline"
                >
                  Zurück zur Anmeldung
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
