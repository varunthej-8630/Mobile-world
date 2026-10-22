export interface FAQItem {
  id: string;
  category: 'repairs' | 'subscriptions' | 'shop' | 'warranty' | 'account' | 'business';
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'repairs',
    question: 'Wie finde ich den genauen Reparaturpreis für mein Smartphone oder Tablet?',
    answer: 'Über unseren interaktiven Reparaturpreis-Finder wählen Sie einfach Ihre Gerätekategorie (Smartphone, Tablet, Smartwatch), den Hersteller (Apple, Samsung, Google etc.), das konkrete Modell und die gewünschte Reparaturart aus. Sie sehen sofort den verbindlich von Mobile World ZH genehmigten Preis in CHF sowie Angaben zur Reparaturdauer und Ersatzteilqualität.'
  },
  {
    id: 'faq-2',
    category: 'repairs',
    question: 'Was kann ich tun, wenn mein Modell oder ein spezieller Schaden nicht gelistet ist?',
    answer: 'Kein Problem! Wir reparieren praktisch alle Mobilgeräte am Markt, auch ältere oder seltene Modelle. Kontaktieren Sie unsere Werkstatt in Zürich Seebach direkt per WhatsApp (+41 78 344 88 88) oder Telefon (+41 44 543 63 33). Wir erstellen Ihnen innerhalb von 30 Minuten einen kostenlosen, unverbindlichen Kostenvoranschlag.'
  },
  {
    id: 'faq-3',
    category: 'repairs',
    question: 'Wie lange dauert eine Standard-Reparatur bei Mobile World?',
    answer: 'Die meisten Standardreparaturen – wie der Austausch von Displays, Akkus oder Ladebuchsen für gängige iPhone- und Samsung-Modelle – führen wir mit unserem Express-Service vor Ort in unserer Werkstatt in Zürich Seebach innerhalb von 30 bis 60 Minuten durch. Sie können währenddessen kurz warten oder Besorgungen erledigen.'
  },
  {
    id: 'faq-4',
    category: 'warranty',
    question: 'Welche Garantie erhalte ich auf durchgeführte Reparaturen und Ersatzteile?',
    answer: 'Mobile World gewährt auf alle verbauten Ersatzteile und Reparaturarbeiten eine Schweizer Funktionsgarantie von 6 Monaten. Sollte innerhalb dieses Zeitraums ein produktionsbedingter Mangel am getauschten Bauteil auftreten, beheben wir diesen kostenlos.'
  },
  {
    id: 'faq-5',
    category: 'subscriptions',
    question: 'Wie funktioniert der Abschluss oder die Verlängerung eines Handyabos?',
    answer: 'Als autorisierter Partner von Sunrise, Salt, yallo und LEBARA beraten wir Sie unabhängig. Sie können Ihren Wunschtarif online anfragen oder direkt in unserem Geschäft in Zürich Seebach vorbeikommen. Wir übernehmen die Rufnummernportierung, Kündigung beim Altanbieter und die sofortige SIM/eSIM-Freischaltung für Sie.'
  },
  {
    id: 'faq-6',
    category: 'shop',
    question: 'Was bedeutet der Zustand „Refurbished Grad A+“ bei gebrauchten Geräten?',
    answer: 'Alle unsere Refurbished-Geräte durchlaufen eine strenge 32-Punkte-Funktionsprüfung durch unsere Techniker. „Grad A+“ bedeutet makelloser optischer Zustand ohne sichtbare Kratzer und garantierter Akku-Zustand von mindestens 90–100%. Sie erhalten 12 Monate Garantie wie auf Neugeräte.'
  },
  {
    id: 'faq-7',
    category: 'shop',
    question: 'Stimmen die angegebenen Lagerbestände im Online-Katalog in Echtzeit?',
    answer: 'In diesem Konzept- und Demonstrations-Prototyp handelt es sich um beispielhafte Seed-Lagerbestände zur Demonstration unseres Bestandsverwaltungssystems. Für die Live-Produktionsversion wird dieser Katalog direkt an das Kassensystem der Filiale Seebach angebunden.'
  },
  {
    id: 'faq-8',
    category: 'account',
    question: 'Wozu dient das Kundenkonto?',
    answer: 'In Ihrem persönlichen Kundenkonto können Sie Ihre Kontaktdaten verwalten, Ihre hinterlegten Geräte einsehen sowie den Status Ihrer aktuellen Reparaturanfragen und Bestellungen nachverfolgen. (Im vorliegenden Kunden-Demo als sicherer Frontend-Prototyp umgesetzt).'
  },
  {
    id: 'faq-9',
    category: 'business',
    question: 'Gibt es spezielle Angebote für Schweizer Firmen, KMU und Vereine?',
    answer: 'Ja! Mobile World bietet massgeschneiderte Kollektivverträge für Firmen und Vereine mit Flottenrabatten auf Reparaturen, Vor-Ort-Abholservice in der Region Zürich sowie exklusiven Mitarbeiterkonditionen für Mobilfunkabos.'
  }
];
