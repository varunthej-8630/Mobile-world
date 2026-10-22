import React from 'react';

interface TermsPageProps {
  onNavigate: (path: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-porcelain py-12 md:py-16">
      <div className="container-custom max-w-4xl">
        <div className="text-xs text-graphite/50 mb-6 flex items-center gap-2">
          <button onClick={() => onNavigate('/')} className="hover:text-cobalt">Startseite</button>
          <span>/</span>
          <span className="text-graphite font-semibold">AGB</span>
        </div>

        <div className="bg-white rounded-2xl border border-silver/30 p-5 sm:p-8 md:p-12 shadow-sm space-y-8">
          <div>
            <span className="badge badge-cobalt mb-3">Rechtliche Grundlagen</span>
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-graphite mb-3">
              Allgemeine Geschäftsbedingungen (AGB)
            </h1>
            <p className="text-sm text-graphite/70">
              Mobile World GmbH, Zürich · Stand: Januar 2024
            </p>
          </div>

          <section className="space-y-3 text-sm text-graphite/80 leading-relaxed">
            <h2 className="text-xl font-bold font-heading text-graphite">1. Geltungsbereich</h2>
            <p>
              Diese Allgemeinen Geschäftsbedingungen gelten für alle Dienstleistungen, Reparaturen, Warenverkäufe und Vermittlungsgeschäfte der Mobile World GmbH (nachfolgend «Mobile World»), insbesondere an den Filialstandorten Zürich Seebach, Zürich Bellevue, Rüti ZH und Oberengstringen sowie über die Website www.mobileworldzh.ch.
            </p>
          </section>

          <section className="space-y-3 text-sm text-graphite/80 leading-relaxed">
            <h2 className="text-xl font-bold font-heading text-graphite">2. Reparaturen & Kostenvoranschläge</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Preise:</strong> Die auf der Website angegebenen Preise verstehen sich in Schweizer Franken (CHF) inklusive der gesetzlichen Schweizer Mehrwertsteuer. Bei verdeckten Schäden (z.B. Flüssigkeitsschäden, Platinschäden) behält sich Mobile World vor, vor Arbeitsbeginn einen angepassten Kostenvoranschlag einzuholen.</li>
              <li><strong>Diagnosegebühr:</strong> Sollte nach Erstellung eines Kostenvoranschlags keine Reparatur gewünscht werden, kann eine Aufwandspauschale gemäss Filialtarif verrechnet werden.</li>
              <li><strong>Datensicherung:</strong> Der Kunde ist vollumfänglich selbst für die Sicherung seiner Gerätedaten verantwortlich. Mobile World übernimmt keine Haftung für Datenverluste im Zuge von Hardware-Eingriffen.</li>
            </ul>
          </section>

          <section className="space-y-3 text-sm text-graphite/80 leading-relaxed">
            <h2 className="text-xl font-bold font-heading text-graphite">3. Garantie auf Reparaturen</h2>
            <p>
              Mobile World gewährt auf ersetzte Original- bzw. OEM-Ersatzteile (z.B. Displays, Akkus, Ladebuchsen) in der Regel eine Funktionsgarantie von 3 bis 6 Monaten (ausgenommen Feuchtigkeitsschäden, Sturz-, Stoss- oder Glasbruchschäden nach Rückgabe sowie eigenmächtige Eingriffe Dritter).
            </p>
          </section>

          <section className="space-y-3 text-sm text-graphite/80 leading-relaxed">
            <h2 className="text-xl font-bold font-heading text-graphite">4. Verkauf von Neuware & Refurbished-Geräten</h2>
            <p>
              Bei Neugeräten gilt die Herstellergarantie von in der Regel 24 Monaten ab Kaufdatum. Bei zertifizierten Refurbished-Geräten gewährt Mobile World eine Garantie von 12 Monaten ab Kaufdatum gemäss Kassenbeleg / Rechnung.
            </p>
          </section>

          <section className="space-y-3 text-sm text-graphite/80 leading-relaxed">
            <h2 className="text-xl font-bold font-heading text-graphite">5. Mobilfunkverträge & Abonnements</h2>
            <p>
              Mobile World tritt bei Mobilfunkabos (Sunrise, Salt, yallo, LEBARA) als autorisierter Fachhandels-Vermittler auf. Der eigentliche Mobilfunkvertrag kommt ausschliesslich zwischen dem Kunden und dem jeweiligen Netzanbieter zustande. Es gelten die AGB des entsprechenden Providers.
            </p>
          </section>

          <section className="space-y-3 text-sm text-graphite/80 leading-relaxed">
            <h2 className="text-xl font-bold font-heading text-graphite">6. Anwendbares Recht & Gerichtsstand</h2>
            <p>
              Es gilt ausschliesslich materielles Schweizer Recht. Ausschliesslicher Gerichtsstand für sämtliche Streitigkeiten ist der Sitz der Mobile World GmbH in Zürich, Schweiz.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
