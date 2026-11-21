import { mockDb } from '../data/mockDb';

interface PageMeta {
  title: string;
  description: string;
}

export function getPageMetadata(path: string): PageMeta {
  // 1. Dynamic Product Detail
  if (path.startsWith('/product/')) {
    const productId = path.replace('/product/', '');
    const product = mockDb.getProductById(productId);
    if (product) {
      return {
        title: `${product.name} kaufen — CHF ${product.priceChf.toFixed(2)} | Mobile World Zürich`,
        description: `${product.name} (${product.brand}) bei Mobile World Zürich Seebach kaufen. 24 Monate Schweizer Garantie, Sofortabholung vor Ort oder Express-Versand.`
      };
    }
    return {
      title: 'Produkt | Mobile World Zürich',
      description: 'Detailansicht zu Smartphone-Geräten und Premium-Zubehör im Mobile World Online Shop Zürich.'
    };
  }

  // 2. Dynamic Shop Categories
  if (path.startsWith('/shop/category/')) {
    const catSlug = path.replace('/shop/category/', '');
    const catTitles: Record<string, string> = {
      smartphones: 'Smartphones ohne Vertrag',
      tablets: 'Tablets & iPads',
      accessories: 'Zubehör & Schutzhüllen',
      refurbished: 'Geprüfte Refurbished Geräte',
      audio: 'Kopfhörer & Audio'
    };
    const titleName = catTitles[catSlug] || 'Shop-Kategorie';
    return {
      title: `${titleName} kaufen | Mobile World Zürich`,
      description: `Entdecken Sie ${titleName.toLowerCase()} bei Mobile World in Zürich Seebach. Geprüfte Originalware, Schweizer Garantie und Express-Lieferung.`
    };
  }

  // 3. Static Public Routes
  switch (path) {
    case '/':
      return {
        title: 'Mobile World Zürich Seebach — Express Reparaturen, Handyabos & Shop',
        description: 'Offizielle Express-Werkstatt in Zürich Seebach: Sofortreparaturen in 30–60 Min., unabhängige Handyabos von Sunrise, Salt & yallo sowie geprüfte Smartphones.'
      };

    case '/repairs':
      return {
        title: 'Smartphone & Tablet Reparaturen Zürich | Mobile World Seebach',
        description: 'Express-Reparaturen für iPhone, Samsung, Xiaomi & Google Pixel in Zürich Seebach. 30–60 Minuten vor Ort ohne Voranmeldung mit 6 Monaten Schweizer Garantie.'
      };

    case '/repair-prices':
      return {
        title: 'Reparaturpreise Rechner — Feste Schweizer Werkstattpreise | Mobile World',
        description: 'Transparenter Reparaturpreis-Rechner für Displaytausch, Akkuwechsel und Anschlüsse. Sofort verbindliche Preise inkl. 8.1% MwSt. und Original-Ersatzteilen.'
      };

    case '/subscriptions':
      return {
        title: 'Handyabos Vergleich Zürich — Sunrise, Salt, yallo & LEBARA | Mobile World',
        description: 'Unabhängige Tarifberatung und die besten Schweizer Mobilfunk-Abos. Kostenlose Rufnummernmitnahme, Aktionsrabatte und persönliche Beratung in Seebach.'
      };

    case '/shop':
      return {
        title: 'Smartphone Shop & Zubehör — Neuware & Refurbished | Mobile World Zürich',
        description: 'Smartphones ohne Vertrag, 24 Monate Schweizer Garantie und geprüfte Refurbished-Geräte. Hüllen, Panzerglas und Schnellladegeräte ab Lager Zürich.'
      };

    case '/cart':
      return {
        title: 'Warenkorb | Mobile World Zürich',
        description: 'Prüfen Sie Ihren Warenkorb bei Mobile World Zürich Seebach. Schneller Express-Versand oder bequeme Selbstabholung vor Ort.'
      };

    case '/services':
      return {
        title: 'Alle Dienstleistungen & Express-Services | Mobile World Zürich',
        description: 'Smartphone-Reparaturen, Handyabos, Datenübertragung, Handyankauf und professionelle Geräteversicherungen bei Mobile World in Zürich Seebach.'
      };

    case '/services/insurance':
      return {
        title: 'Handyversicherung — Schutz vor Bruch, Sturz & Diebstahl | Mobile World',
        description: 'Umfassender Geräteschutz für Ihr Smartphone und Tablet. Keine Selbstbeteiligung bei Reparaturen direkt in unserer Werkstatt Zürich Seebach.'
      };

    case '/services/device-support':
      return {
        title: 'Geräte-Support & Datenübertragung | Mobile World Zürich',
        description: 'Professionelle Ersteinrichtung, Datensicherung und WhatsApp-Übertragung von Android auf iPhone. Schnelle Hilfe ohne Termin im Shop Zürich Seebach.'
      };

    case '/buy-sell':
      return {
        title: 'Handy Ankauf & Verkauf Zürich — Faire Sofortauszahlung | Mobile World',
        description: 'Verkaufen Sie Ihr gebrauchtes Smartphone schnell und unkompliziert. Faire Schätzung und sofortige Barauszahlung in Zürich Seebach.'
      };

    case '/business':
      return {
        title: 'Firmenkunden & B2B Flottenservice | Mobile World Zürich',
        description: 'Flottenreparaturen, Mitarbeiter-Tarife und Express-Geräteaustausch für Schweizer KMU, Vereine und Schulen auf Monatsrechnung.'
      };

    case '/locations':
      return {
        title: 'Standorte & Filialen in Zürich | Mobile World',
        description: 'Übersicht unserer Standorte in Zürich: Hauptsitz & Werkstatt in Seebach, Partnerfilialen in Bellevue-Stadelhofen, Rüti ZH und Oberengstringen.'
      };

    case '/locations/seebach':
      return {
        title: 'Filiale Zürich Seebach (Hauptwerkstatt) | Mobile World',
        description: 'Besuchen Sie uns an der Schaffhauserstrasse 455 in 8052 Zürich Seebach. Direkt an Tram 14 / Bus 768. Express-Reparaturen ohne Termin geöffnet bis 19:00.'
      };

    case '/contact':
      return {
        title: 'Kontakt & Anfahrt Zürich Seebach | Mobile World',
        description: 'Kontaktieren Sie Mobile World Zürich Seebach direkt per Telefon +41 44 543 63 33, WhatsApp +41 78 344 88 88 oder besuchen Sie unseren Shop.'
      };

    case '/faq':
      return {
        title: 'Häufige Fragen (FAQ) — Reparaturen & Abos | Mobile World Zürich',
        description: 'Antworten auf häufig gestellte Fragen zu Reparaturzeiten, Garantie, Rufnummernmitnahme, Zahlungsarten und Datenschutz bei Mobile World.'
      };

    case '/account':
    case '/account/register':
    case '/account/forgot-password':
    case '/account/profile':
      return {
        title: 'Kundenkonto & Reparaturstatus | Mobile World Zürich',
        description: 'Melden Sie sich an, um Ihren aktuellen Reparaturstatus einzusehen, Aufträge zu verwalten und gespeicherte Rechnungen herunterzuladen.'
      };

    case '/admin':
      return {
        title: 'Staff Dashboard | Mobile World Zürich',
        description: 'Internes Verwaltungsportal für Werkstatt-Preise, Inventar und Kundenanfragen.'
      };

    case '/privacy':
      return {
        title: 'Datenschutzerklärung nach Schweizer DSG | Mobile World Zürich',
        description: 'Informationen zur Erhebung und Verarbeitung personenbezogener Daten gemäss dem revidierten Schweizer Datenschutzgesetz (DSG).'
      };

    case '/terms':
      return {
        title: 'Allgemeine Geschäftsbedingungen (AGB) | Mobile World Zürich',
        description: 'Geschäftsbedingungen für Werkstattleistungen, Reparaturen, Kaufverträge und Garantieleistungen der Mobile World GmbH.'
      };

    case '/imprint':
      return {
        title: 'Impressum & Rechtliche Angaben | Mobile World Zürich',
        description: 'Rechtliche Angaben und Kontakt der Mobile World GmbH, Schaffhauserstrasse 455, 8052 Zürich.'
      };

    default:
      return {
        title: 'Seite nicht gefunden (404) | Mobile World Zürich',
        description: 'Die angeforderte Seite existiert leider nicht. Entdecken Sie unsere Express-Reparaturen, Handyabos und Neugeräte auf der Startseite.'
      };
  }
}

export function updatePageMetadata(path: string): void {
  if (typeof document === 'undefined') return;

  const { title, description } = getPageMetadata(path);

  // 1. Update Title
  document.title = title;

  // 2. Update or create Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);

  // 3. Update Open Graph Meta
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', title);
  }
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) {
    ogDesc.setAttribute('content', description);
  }
}
