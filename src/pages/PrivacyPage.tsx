import React from 'react';
import { Shield, Lock, FileText, CheckCircle2 } from 'lucide-react';

interface PrivacyPageProps {
  onNavigate: (path: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-porcelain py-12 md:py-16">
      <div className="container-custom max-w-4xl">
        {/* Breadcrumb */}
        <div className="text-xs text-graphite/50 mb-6 flex items-center gap-2">
          <button onClick={() => onNavigate('/')} className="hover:text-cobalt">Startseite</button>
          <span>/</span>
          <span className="text-graphite font-semibold">Datenschutzerklärung</span>
        </div>

        <div className="bg-white rounded-2xl border border-silver/30 p-5 sm:p-8 md:p-12 shadow-sm space-y-8">
          <div>
            <span className="badge badge-cobalt mb-3">Rechtliches & Compliance</span>
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-graphite mb-3">
              Datenschutzerklärung
            </h1>
            <p className="text-sm text-graphite/70">
              Gültig ab: 1. September 2023 (angepasst an das revidierte Schweizer Datenschutzgesetz DSG)
            </p>
          </div>

          <div className="p-4 bg-porcelain rounded-xl border border-silver/20 text-xs text-graphite/70 space-y-2">
            <div className="font-semibold text-graphite flex items-center gap-2">
              <Shield className="w-4 h-4 text-cobalt" />
              <span>Verantwortliche Stelle:</span>
            </div>
            <p>
              Mobile World GmbH<br />
              Schaffhauserstrasse 455<br />
              8052 Zürich, Schweiz<br />
              E-Mail: <a href="mailto:info@mobileworldzh.ch" className="text-cobalt hover:underline">info@mobileworldzh.ch</a><br />
              Telefon: +41 44 543 63 33
            </p>
          </div>

          <section className="space-y-4 text-sm text-graphite/80 leading-relaxed">
            <h2 className="text-xl font-bold font-heading text-graphite">1. Grundsatz und Geltungsbereich</h2>
            <p>
              Der Schutz Ihrer persönlichen Daten ist der Mobile World GmbH ein zentrales Anliegen. Wir bearbeiten Personendaten unter strikter Einhaltung des Bundesgesetzes über den Datenschutz (revDSG) sowie – soweit anwendbar – der Datenschutz-Grundverordnung (DSGVO) der Europäischen Union.
            </p>
          </section>

          <section className="space-y-4 text-sm text-graphite/80 leading-relaxed">
            <h2 className="text-xl font-bold font-heading text-graphite">2. Erfassung und Bearbeitung von Daten</h2>
            <p>
              Wir erheben personenbezogene Daten ausschliesslich zu den folgenden Zwecken:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Reparaturanfragen und Kostenvoranschläge:</strong> Gerätemodell, Fehlerbeschreibung, Name, Telefonnummer und E-Mail für Status-Updates.</li>
              <li><strong>Abonnement-Vermittlung:</strong> Weiterleitung an die gewählten Schweizer Netzbetreiber (Sunrise, Salt, yallo, LEBARA) ausschliesslich mit Ihrer ausdrücklichen Einwilligung.</li>
              <li><strong>Shop-Bestellungen und Reservationen:</strong> Rechnungs- und Lieferadresse, Zahlungsabwicklung und Benachrichtigung bei Abholbereitschaft in der Filiale.</li>
              <li><strong>Kundenkonto:</strong> Freiwillige Verwaltung Ihrer Geräte und Kontaktpräferenzen.</li>
            </ul>
          </section>

          <section className="space-y-4 text-sm text-graphite/80 leading-relaxed">
            <h2 className="text-xl font-bold font-heading text-graphite">3. Datensicherheit bei Reparaturen</h2>
            <p>
              Bei Reparaturen haben unsere Techniker keinen Zugriff auf Ihre persönlichen Gerätedaten (Fotos, Nachrichten, Kontakte), es sei denn, ein Funktionstest erfordert eine explizite Freigabe. Wir empfehlen Kunden dennoch ausdrücklich, vor jeder Reparatur ein lokales Backup (iCloud, Google Drive oder PC) durchzuführen.
            </p>
          </section>

          <section className="space-y-4 text-sm text-graphite/80 leading-relaxed">
            <h2 className="text-xl font-bold font-heading text-graphite">4. Weitergabe an Dritte</h2>
            <p>
              Eine Weitergabe Ihrer Daten erfolgt nur, wenn dies zur Vertragserfüllung notwendig ist (z.B. Mobilfunkverträge mit Sunrise / Salt / yallo) oder wenn eine gesetzliche Verpflichtung besteht. Wir verkaufen zu keinem Zeitpunkt Kundendaten an Dritte.
            </p>
          </section>

          <section className="space-y-4 text-sm text-graphite/80 leading-relaxed">
            <h2 className="text-xl font-bold font-heading text-graphite">5. Ihre Rechte</h2>
            <p>
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Berichtigung, Sperrung oder Löschung. Wenden Sie sich hierzu bitte an <a href="mailto:info@mobileworldzh.ch" className="text-cobalt hover:underline">info@mobileworldzh.ch</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
