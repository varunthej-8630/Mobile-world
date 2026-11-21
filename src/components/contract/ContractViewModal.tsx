import React from 'react';
import { Contract } from '../../types';
import { Printer, X, Download, ShieldCheck, CheckCircle2, FileText, Check, Award, Building2 } from 'lucide-react';

interface ContractViewModalProps {
  contract: Contract | null;
  onClose: () => void;
}

export const ContractViewModal: React.FC<ContractViewModalProps> = ({ contract, onClose }) => {
  if (!contract) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadHtml = () => {
    const printableElement = document.getElementById('printable-contract-area');
    if (!printableElement) return;

    const fullHtml = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <title>Mobilfunkvertrag_${contract.contractNumber}_MobileWorld.html</title>
  <style>
    @page { size: A4 portrait; margin: 10mm 14mm; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 20px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    table { border-collapse: collapse; width: 100%; }
  </style>
</head>
<body onload="window.print()">
  ${printableElement.outerHTML}
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Mobilfunkvertrag_${contract.contractNumber}_MobileWorld.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto contract-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contract-modal-title"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-6 overflow-hidden border border-slate-200 flex flex-col contract-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Action Bar (Hidden in Print) */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white print:hidden border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 id="contract-modal-title" className="font-bold text-base leading-tight">
                Offizieller Mobilfunk-Abonnementsvertrag
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Vertrags-ID: {contract.contractNumber} · Schweizer Rechtsstand
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadHtml}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
              title="Vertrag als Datei speichern"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Dokument herunterladen</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
              title="Vertrag drucken oder als PDF sichern"
            >
              <Printer className="w-4 h-4" />
              <span>Drucken / Als PDF speichern</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors ml-2"
              aria-label="Schliessen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* =====================================================================
            PROFESSIONAL SWISS CONTRACT PRINTABLE SHEET (A4)
           ===================================================================== */}
        <div
          className="p-8 sm:p-12 text-slate-800 font-sans space-y-6 bg-white contract-printable-sheet"
          id="printable-contract-area"
          style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
        >
          {/* Top Header: Official Letterhead & Document Metadata */}
          <div className="flex justify-between items-start border-b-2 border-slate-900 pb-5">
            <div>
              {/* Brand Logo & Tagline */}
              <div className="flex items-center gap-3 mb-2">
                <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="46" stroke="url(#paint0_linear_contract)" strokeWidth="8"/>
                  <path d="M28 65L42 34L50 52L58 34L72 65" stroke="url(#paint1_linear_contract)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="paint0_linear_contract" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#A82845" />
                      <stop offset="0.5" stopColor="#871752" />
                      <stop offset="1" stopColor="#350630" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_contract" x1="28" y1="34" x2="72" y2="65" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#D9384E" />
                      <stop offset="1" stopColor="#4A0B42" />
                    </linearGradient>
                  </defs>
                </svg>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-2xl tracking-tight text-slate-900 font-heading">MOBILE WORLD</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-blue-100 text-blue-900 rounded border border-blue-200">
                      Zürich Seebach
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium tracking-wide block">
                    Menschlich. Regional. Vernetzt. · Autorisierter Fachhandel
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                <strong>Mobile World Zürich GmbH</strong> · Schaffhauserstrasse 455 · CH-8052 Zürich<br />
                UID: <strong>CHE-284.912.741 MWST</strong> · Tel: +41 44 543 63 33 · E-Mail: info@mobileworldzh.ch
              </p>
            </div>

            {/* Document Stamp Box */}
            <div className="text-right flex flex-col items-end">
              <div className="bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-right w-52 mb-1.5">
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">
                  VERTRAGS-DOKUMENT (CH-FMG)
                </span>
                <span className="text-sm font-mono font-extrabold text-slate-900 block tracking-tight">
                  {contract.contractNumber}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  Ausstellungsdatum: <strong>{contract.createdAt.slice(0, 10)}</strong>
                </span>
                <span className="text-[9px] text-emerald-700 font-semibold block mt-1">
                  ✓ Gültig &amp; Im System ratifiziert
                </span>
              </div>
              {/* Vector Barcode */}
              <div className="flex flex-col items-center">
                <svg width="180" height="28" viewBox="0 0 180 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0" y="0" width="3" height="24" fill="#0f172a"/>
                  <rect x="5" y="0" width="1" height="24" fill="#0f172a"/>
                  <rect x="8" y="0" width="4" height="24" fill="#0f172a"/>
                  <rect x="15" y="0" width="2" height="24" fill="#0f172a"/>
                  <rect x="20" y="0" width="3" height="24" fill="#0f172a"/>
                  <rect x="26" y="0" width="1" height="24" fill="#0f172a"/>
                  <rect x="30" y="0" width="5" height="24" fill="#0f172a"/>
                  <rect x="38" y="0" width="2" height="24" fill="#0f172a"/>
                  <rect x="43" y="0" width="2" height="24" fill="#0f172a"/>
                  <rect x="48" y="0" width="4" height="24" fill="#0f172a"/>
                  <rect x="55" y="0" width="1" height="24" fill="#0f172a"/>
                  <rect x="59" y="0" width="3" height="24" fill="#0f172a"/>
                  <rect x="65" y="0" width="5" height="24" fill="#0f172a"/>
                  <rect x="73" y="0" width="2" height="24" fill="#0f172a"/>
                  <rect x="78" y="0" width="3" height="24" fill="#0f172a"/>
                  <rect x="84" y="0" width="1" height="24" fill="#0f172a"/>
                  <rect x="88" y="0" width="4" height="24" fill="#0f172a"/>
                  <rect x="95" y="0" width="2" height="24" fill="#0f172a"/>
                  <rect x="100" y="0" width="4" height="24" fill="#0f172a"/>
                  <rect x="107" y="0" width="1" height="24" fill="#0f172a"/>
                  <rect x="111" y="0" width="3" height="24" fill="#0f172a"/>
                  <rect x="117" y="0" width="5" height="24" fill="#0f172a"/>
                  <rect x="125" y="0" width="2" height="24" fill="#0f172a"/>
                  <rect x="130" y="0" width="3" height="24" fill="#0f172a"/>
                  <rect x="136" y="0" width="2" height="24" fill="#0f172a"/>
                  <rect x="141" y="0" width="4" height="24" fill="#0f172a"/>
                  <rect x="148" y="0" width="1" height="24" fill="#0f172a"/>
                  <rect x="152" y="0" width="4" height="24" fill="#0f172a"/>
                  <rect x="159" y="0" width="2" height="24" fill="#0f172a"/>
                  <rect x="164" y="0" width="3" height="24" fill="#0f172a"/>
                  <rect x="170" y="0" width="2" height="24" fill="#0f172a"/>
                  <rect x="175" y="0" width="4" height="24" fill="#0f172a"/>
                </svg>
                <span className="text-[8px] font-mono tracking-widest text-slate-500 uppercase">
                  *{contract.contractNumber}*
                </span>
              </div>
            </div>
          </div>

          {/* Title & Legal Preamble */}
          <div className="pt-1">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-heading uppercase">
              Mobilfunk-Abonnementsvertrag &amp; Dienstleistungsvereinbarung
            </h1>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Rechtsverbindliche Vereinbarung für Telekommunikationsdienstleistungen über den autorisierten Fachhandelspartner{' '}
              <strong>Mobile World Zürich GmbH</strong> in Kooperation mit <strong>{contract.provider} Network Schweiz</strong>.
            </p>
          </div>

          {/* SECTION 1: CONTRACT PARTNERS (2-COLUMN GRID) */}
          <div className="border border-slate-300 rounded-xl overflow-hidden text-xs">
            <div className="bg-slate-100 px-4 py-2 font-bold text-slate-800 uppercase tracking-wider text-[11px] border-b border-slate-300 flex items-center justify-between">
              <span>1. Vertragsparteien &amp; Kundenidentifikation</span>
              <span className="text-[10px] text-slate-500 font-normal">Art. 19 BÜPF (Identitätsnachweis)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-300">
              {/* Customer */}
              <div className="p-4 space-y-1.5 bg-white">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Vertragspartner / Kunde (Abonnent)
                </span>
                <p className="font-bold text-slate-900 text-sm">{contract.customerName}</p>
                <p className="text-slate-700">{contract.customerAddress || 'Schaffhauserstrasse 120'}</p>
                <p className="text-slate-700 font-medium">
                  {contract.customerPostalCode || '8052'} {contract.customerCity || 'Zürich'}, Schweiz
                </p>
                <div className="pt-1 border-t border-slate-100 text-[11px] text-slate-600 space-y-0.5">
                  <p>E-Mail: <span className="font-mono text-slate-800 font-semibold">{contract.customerEmail}</span></p>
                  <p>Telefon: <span className="font-mono text-slate-800 font-semibold">{contract.customerPhone}</span></p>
                  <p className="text-[10px] text-emerald-700 font-medium pt-1">
                    ✓ Identitätsprüfung erfolgt (Amtlicher Ausweis / Pass verifiziert)
                  </p>
                </div>
              </div>

              {/* Provider & Dealer */}
              <div className="p-4 space-y-1.5 bg-slate-50/70">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Netzbetreiber &amp; Vermittlungsstelle
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 text-sm">{contract.provider} Network</span>
                  <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[9px] rounded uppercase">
                    CH-Netz
                  </span>
                </div>
                <p className="text-slate-700">Vermittlung &amp; Support: <strong>Mobile World Zürich GmbH</strong></p>
                <p className="text-slate-700">Servicestelle: Schaffhauserstrasse 455, 8052 Zürich Seebach</p>
                <div className="pt-1 border-t border-slate-200 text-[11px] text-slate-600 space-y-0.5">
                  <p>Handelsregister: <strong>CHE-284.912.741 MWST</strong></p>
                  <p>Support-Direktwahl: <strong>+41 44 543 63 33</strong></p>
                  <p className="text-[10px] text-blue-700 font-medium pt-1">
                    ✓ Autorisierter Vertriebs- &amp; Servicepartner
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: TARIFF & SERVICE DETAILS TABLE */}
          <div className="border border-slate-300 rounded-xl overflow-hidden text-xs">
            <div className="bg-slate-100 px-4 py-2 font-bold text-slate-800 uppercase tracking-wider text-[11px] border-b border-slate-300 flex items-center justify-between">
              <span>2. Gewählter Mobilfunk-Tarif &amp; Leistungsübersicht</span>
              <span className="text-[10px] text-slate-500 font-normal">Schweizer Standardvertrag</span>
            </div>
            <table className="w-full text-left border-collapse">
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-slate-600 w-1/3 bg-slate-50/50">Tarifbezeichnung</td>
                  <td className="py-2.5 px-4 font-bold text-slate-900 text-sm">{contract.planName}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-slate-600 bg-slate-50/50">Datenvolumen Inland (CH)</td>
                  <td className="py-2.5 px-4 text-slate-800 font-medium">
                    <span className="inline-flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                      <strong>{contract.dataAllowance}</strong> (Highspeed 5G+, bis zu 2 Gbit/s ohne Drosselung)
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-slate-600 bg-slate-50/50">Roaming Ausland (EU / UK / USA)</td>
                  <td className="py-2.5 px-4 text-slate-800 font-medium">
                    <span className="inline-flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                      {contract.roamingAllowance}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-slate-600 bg-slate-50/50">Telefonie &amp; SMS</td>
                  <td className="py-2.5 px-4 text-slate-800">
                    Unlimitiert in alle Schweizer Netze (Mobil &amp; Festnetz) inklusive VoLTE &amp; WiFi Calling
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-slate-600 bg-slate-50/50">Vertragslaufzeit &amp; Kündigung</td>
                  <td className="py-2.5 px-4 text-slate-800">
                    <strong>{contract.durationMonths}</strong> · Ordentliche Kündigungsfrist: 60 Tage auf Monatsende
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold text-slate-600 bg-slate-50/50">Einmalige Aufschaltgebühr</td>
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-900">
                    CHF {contract.activationFeeChf.toFixed(2)} (inkl. 8.1% Schweizer MwSt.)
                  </td>
                </tr>
                <tr className="bg-blue-50/70 border-t-2 border-blue-200">
                  <td className="py-3 px-4 font-extrabold text-blue-950 text-sm">
                    Monatliche Grundgebühr
                  </td>
                  <td className="py-3 px-4 font-mono font-black text-blue-700 text-lg">
                    CHF {contract.monthlyPriceChf.toFixed(2)} <span className="text-xs font-sans font-normal text-slate-600">/ Monat inkl. 8.1% MwSt.</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* SECTION 3: SPECIAL AGREEMENTS & HARDWARE */}
          {contract.notes && (
            <div className="bg-amber-50/80 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-950">
              <span className="font-bold text-[11px] uppercase tracking-wider block text-amber-900 mb-1">
                3. Besondere Vereinbarungen / Vermerke / Zubehör
              </span>
              <p className="leading-relaxed">{contract.notes}</p>
            </div>
          )}

          {/* SECTION 4: LEGAL PROVISIONS (CH TELEKOM LAW / BÜPF / FMG / nDSG) */}
          <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50 text-[10px] text-slate-600 leading-relaxed space-y-1.5">
            <span className="font-bold uppercase tracking-wider text-slate-500 block text-[10px]">
              4. Rechtliche Grundlagen &amp; Schweizer Datenschutz (FMG, BÜPF, nDSG)
            </span>
            <p>
              <strong>1. Geltung:</strong> Dieser Vertrag untersteht ausschliesslich schweizerischem Recht. Ergänzend gelten die Allgemeinen Geschäftsbedingungen (AGB) des jeweiligen Netzbetreibers ({contract.provider}) sowie die Konditionen von Mobile World Zürich GmbH.
            </p>
            <p>
              <strong>2. Gesetzliche Registrierungspflicht (BÜPF):</strong> Der Kunde bestätigt die Richtigkeit seiner persönlichen Personalien gemäss Art. 19 des Bundesgesetzes betreffend die Überwachung des Post- und Fernmeldeverkehrs (BÜPF).
            </p>
            <p>
              <strong>3. Datenschutz (nDSG):</strong> Alle Kundendaten werden streng vertraulich gemäss dem revidierten Schweizer Datenschutzgesetz (nDSG) behandelt und ausschliesslich zur Vertragsabwicklung und Bereitstellung der Telekommunikationsdienste genutzt.
            </p>
          </div>

          {/* SECTION 5: SIGNATURES & OFFICIAL CORPORATE STAMP */}
          <div className="pt-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-3">
              5. Rechtsverbindliche Unterschriften &amp; Bestätigung
            </span>
            <div className="grid grid-cols-2 gap-8 p-5 bg-white border border-slate-300 rounded-xl">
              {/* Customer Signature Box */}
              <div>
                <p className="text-[11px] text-slate-500 mb-8">
                  Ort, Datum: <strong>Zürich, den {contract.createdAt.slice(0, 10)}</strong>
                </p>
                <div className="border-t-2 border-slate-800 pt-2">
                  <p className="text-xs font-bold text-slate-900">Unterschrift Kunde / Kundin</p>
                  <p className="text-[11px] text-slate-600 font-medium">{contract.customerName}</p>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Identität persönlich verifiziert</span>
                </div>
              </div>

              {/* Mobile World Stamp & Sign Box */}
              <div className="relative">
                <p className="text-[11px] text-slate-500 mb-8">
                  Für <strong>Mobile World Zürich GmbH</strong>
                </p>
                <div className="border-t-2 border-slate-800 pt-2 relative">
                  <p className="text-xs font-bold text-slate-900">Autorisierte Filialleitung</p>
                  <p className="text-[11px] text-slate-600 font-medium">Filiale Zürich Seebach · Schaffhauserstrasse 455</p>

                  {/* High Quality Official Stamp Graphic */}
                  <div className="absolute -top-12 right-2 border-2 border-blue-700/60 rounded-full w-24 h-24 p-1 flex items-center justify-center text-center rotate-[-8deg] pointer-events-none select-none bg-blue-50/30">
                    <div className="border border-dashed border-blue-600/70 rounded-full w-full h-full flex flex-col items-center justify-center p-1 text-[8px] text-blue-900 font-bold leading-tight uppercase">
                      <span>★ MOBILE WORLD ★</span>
                      <span className="text-[7px] text-blue-700">ZÜRICH SEEBACH</span>
                      <span className="text-[6.5px] font-mono text-blue-800 mt-0.5">CHE-284.912.741</span>
                      <span className="text-[7px] text-emerald-700 font-extrabold mt-0.5">BEGLAUBIGT</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Micro Footer */}
          <div className="flex justify-between items-center border-t border-slate-200 pt-3 text-[9px] text-slate-400 font-mono">
            <span>DOKUMENT-REF: MW-CH-{contract.contractNumber}-V24 · SEITE 1 VON 1</span>
            <span>MOBILE WORLD ZÜRICH GMBH · CHE-284.912.741 MWST · SCHWEIZER TELEKOMMUNIKATION</span>
          </div>
        </div>

        {/* Modal Footer Controls (Hidden in Print) */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3 print:hidden">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Dokument rechtlich zertifiziert gemäss Schweizer FMG, BÜPF und nDSG.</span>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleDownloadHtml}
              className="px-3.5 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4 text-blue-600" />
              <span>Vertrag herunterladen</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4 text-blue-400" />
              <span>Drucken / Als PDF speichern</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              Schliessen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
