import { SubscriptionPlan } from '../types';

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'sub-sunrise-up-m',
    name: 'Sunrise Up Mobile M',
    provider: 'Sunrise',
    monthlyPriceChf: 59.90,
    discountPriceChf: 29.90,
    dataAllowance: 'Unlimitiert Highspeed 5G in CH',
    callsAndSms: 'Unlimitiert Anrufe & SMS in alle Schweizer Netze',
    roamingAllowance: 'Kein Roaming inklusive (Zusatzoptionen verfügbar)',
    speed: 'Bis zu 1 Gbit/s',
    contractDuration: '24 Monate Mindestlaufzeit (Aktionspreis)',
    activationFeeChf: 59.90,
    highlightBadge: 'Bestseller Schweiz',
    features: [
      'Ausgezeichnetes Sunrise 5G-Netz (connect Testsieger)',
      'Aktionsrabatt bei Mobile World Seebach einlösbar',
      'Kostenlose eSIM oder physische Triple-SIM',
      'Rufnummernmitnahme kostenlos'
    ],
    lastVerified: '2026-10-15'
  },
  {
    id: 'sub-salt-europe-data',
    name: 'Salt Europe Data & Voice',
    provider: 'Salt',
    monthlyPriceChf: 69.95,
    discountPriceChf: 34.95,
    dataAllowance: 'Unlimitiert 5G in der Schweiz',
    callsAndSms: 'Unlimitiert in CH & nach Europa',
    roamingAllowance: 'Unlimitiert Daten & Anrufe in der EU / UK / USA',
    speed: 'Bis zu 750 Mbit/s',
    contractDuration: '24 Monate Mindestvertrag',
    activationFeeChf: 59.95,
    highlightBadge: 'Beste Roaming-Option',
    features: [
      'Grenzenloses Reisen in ganz Europa ohne Aufpreis',
      'Attraktives Rabatt-Paket bei Vertragsabschluss im Shop',
      'Prioritärer Support bei Mobile World ZH',
      'Kostenlose Multi-Device SIM für Apple Watch verfügbar'
    ],
    lastVerified: '2026-10-15'
  },
  {
    id: 'sub-yallo-swiss-flat',
    name: 'yallo Swiss Flat Plus',
    provider: 'yallo',
    monthlyPriceChf: 48.00,
    discountPriceChf: 23.90,
    dataAllowance: 'Unlimitiert 4G/5G in der Schweiz',
    callsAndSms: 'Unlimitiert in der Schweiz',
    roamingAllowance: '1 GB Roaming in der EU pro Monat',
    speed: 'Bis zu 300 Mbit/s',
    contractDuration: 'Ohne Mindestlaufzeit (jederzeit kündbar)',
    activationFeeChf: 49.00,
    highlightBadge: 'Maximale Flexibilität',
    features: [
      'Keine Vertragsbindung (monatlich kündbar)',
      'Sunrise-Netzqualität zum Sparpreis',
      'Ideal für Studierende & Preisbewusste',
      'Sofortige Freischaltung im Geschäft'
    ],
    lastVerified: '2026-10-15'
  },
  {
    id: 'sub-lebara-europe-light',
    name: 'LEBARA Europe Smart',
    provider: 'LEBARA',
    monthlyPriceChf: 39.00,
    discountPriceChf: 19.90,
    dataAllowance: '40 GB Highspeed 5G in CH',
    callsAndSms: 'Unlimitiert in CH & 500 Min nach Europa',
    roamingAllowance: '3 GB Roaming EU / UK',
    speed: 'Bis zu 300 Mbit/s',
    contractDuration: 'Ohne Mindestlaufzeit',
    activationFeeChf: 49.00,
    highlightBadge: 'Günstig ins Ausland',
    features: [
      'Günstige internationale Tarife',
      'Keine Bonitätsprüfung erforderlich bei Prepaid/Smart-Abo',
      'Direkte Beratung und Einrichtung vor Ort'
    ],
    lastVerified: '2026-10-15'
  },
  {
    id: 'sub-mw-care-total',
    name: 'MobileWorld Care Geräte-Schutz',
    provider: 'Mobile World Care',
    monthlyPriceChf: 12.90,
    dataAllowance: 'Geräteschutzbrief & Express-Reparatur-Garantie',
    callsAndSms: 'Vor-Ort Sofort-Austauschgerät während Reparatur',
    roamingAllowance: 'Weltweiter Geräteschutz bei Sturz & Wasserschaden',
    speed: 'Express-Reparatur innerhalb von 30 Minuten garantiert',
    contractDuration: 'Monatlich kündbar',
    activationFeeChf: 0,
    highlightBadge: 'Sorgenfrei-Paket',
    features: [
      'Deckung von Glasbruch, Display- und Wasserschäden',
      'Kostenloses Ersatz-Smartphone für die Dauer der Reparatur',
      'Kostenlose jährliche Akku- & Gerätediagnose',
      '15% Rabatt auf sämtliches Zubehör in allen 4 Filialen'
    ],
    lastVerified: '2026-10-15'
  }
];
