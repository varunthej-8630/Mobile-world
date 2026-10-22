import { Branch } from '../types';

export const BRANCHES: Branch[] = [
  {
    id: 'seebach',
    name: 'Mobile World ZH Seebach',
    slug: 'seebach',
    isHeadquarters: true,
    address: 'Schaffhauserstrasse 455',
    city: 'Zürich',
    postalCode: '8052',
    phone: '+41 44 543 63 33',
    whatsapp: '+41 78 344 88 88',
    email: 'info@mobileworldzh.ch',
    openingHours: {
      weekdays: '09:00 – 12:00 Uhr | 13:00 – 19:00 Uhr (durchgehend Werkstattbetrieb)',
      saturday: '10:00 – 18:00 Uhr',
      sunday: 'Geschlossen (Feiertage geschlossen)'
    },
    googleMapsUrl: 'https://www.google.com/maps/place/Mobile+World+ZH+Seebach/@47.4182716,8.5439163,17z/data=!3m1!4b1!4m6!3m5!1s0x47900a9a5462358f:0xe580d65a5457298e!8m2!3d47.4182716!4d8.5464912!16s%2Fg%2F11dx90524s',
    transitInfo: 'Tram 14 bis Haltestelle Seebacherplatz oder Bus 768 bis Schaffhauserstrasse. Parkplätze direkt vor dem Geschäft oder in der blauen Zone vorhanden.',
    features: [
      'Hauptstandort & Zentrale Reparatur-Werkstatt',
      'Express Reparaturen in 30–60 Minuten vor Ort',
      'Offizieller Partner von Sunrise, Salt, yallo & LEBARA',
      'Grosses Zubehör- & Panzerglas-Sortiment mit Sofort-Montage',
      'Bity Krypto-Automat vor Ort'
    ],
    imageUrl: '/assets/modern-mobile-world-storefront-at-dusk.png'
  },
  {
    id: 'bellevue',
    name: 'Mobile World Bellevue-Stadelhofen',
    slug: 'bellevue',
    isHeadquarters: false,
    address: 'Gottfried-Keller-Strasse 5',
    city: 'Zürich',
    postalCode: '8001',
    phone: '+41 44 599 24 44',
    whatsapp: '+41 76 521 24 44',
    email: 'info@mobileworldzh.ch',
    openingHours: {
      weekdays: '09:00 – 19:00 Uhr',
      saturday: '10:00 – 18:00 Uhr',
      sunday: 'Geschlossen'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Gottfried-Keller-Strasse+5+8001+Zürich',
    transitInfo: 'Nur 2 Gehminuten vom Bahnhof Stadelhofen & Tramhaltestelle Bellevue.',
    features: [
      'Zentraler City-Standort am Bahnhof Stadelhofen',
      'Handy- & Tablet-Reparaturannahme',
      'Abo-Beratung und Vertragsverlängerungen'
    ],
    imageUrl: '/assets/modern-mobile-world-store-interior.png'
  },
  {
    id: 'rueti',
    name: 'Mobile World Rüti',
    slug: 'rueti',
    isHeadquarters: false,
    address: 'Dorfstrasse 4',
    city: 'Rüti',
    postalCode: '8630',
    phone: '+41 44 591 60 60',
    whatsapp: '+41 76 527 60 60',
    email: 'info@mobileworldzh.ch',
    openingHours: {
      weekdays: '09:00 – 19:00 Uhr',
      saturday: '09:00 – 17:00 Uhr',
      sunday: 'Geschlossen'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Dorfstrasse+4+8630+Rüti',
    transitInfo: 'Zentral an der Dorfstrasse gelegen, wenige Gehminuten vom Bahnhof Rüti ZH.',
    features: [
      'Express Reparatur-Annahme im Zürcher Oberland',
      'Smartphones & Zubehör',
      'Persönliche Beratung für Neuverträge'
    ],
    imageUrl: '/assets/phone-consultation-at-mobile-shop.png'
  },
  {
    id: 'oberengstringen',
    name: 'Mobile World Oberengstringen',
    slug: 'oberengstringen',
    isHeadquarters: false,
    address: 'Im Zentrum 1',
    city: 'Oberengstringen',
    postalCode: '8102',
    phone: '+41 43 511 44 00',
    whatsapp: '+41 76 310 81 02',
    email: 'info@mobileworldzh.ch',
    openingHours: {
      weekdays: '09:00 – 19:00 Uhr',
      saturday: '09:00 – 17:00 Uhr',
      sunday: 'Geschlossen'
    },
    googleMapsUrl: 'https://maps.google.com/?q=Im+Zentrum+1+8102+Oberengstringen',
    transitInfo: 'Im Einkaufszentrum Im Zentrum mit zahlreichen Parkplätzen und Busverbindungen nach Zürich.',
    features: [
      'Bequemer Zugang mit Gratis-Kundenparkplätzen',
      'Geräte-Setup und Cloud-Support',
      'Reparaturservice für alle gängigen Marken'
    ],
    imageUrl: '/assets/modern-mobile-world-store-collage.png'
  }
];

export const PRIMARY_BRANCH = BRANCHES[0];
