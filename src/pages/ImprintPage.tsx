import React from 'react';
import { Building2, Phone, Mail, MapPin } from 'lucide-react';

interface ImprintPageProps {
  onNavigate: (path: string) => void;
}

export const ImprintPage: React.FC<ImprintPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-porcelain py-12 md:py-16">
      <div className="container-custom max-w-4xl">
        <div className="text-xs text-graphite/50 mb-6 flex items-center gap-2">
          <button onClick={() => onNavigate('/')} className="hover:text-cobalt">Startseite</button>
          <span>/</span>
          <span className="text-graphite font-semibold">Impressum</span>
        </div>

        <div className="bg-white rounded-2xl border border-silver/30 p-8 md:p-12 shadow-sm space-y-8">
          <div>
            <span className="badge badge-cobalt mb-3">Gesetzliche Anbieterkennzeichnung</span>
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-graphite mb-3">
              Impressum
            </h1>
            <p className="text-sm text-graphite/70">
              Angaben gemäss Schweizer Bundesgesetz gegen den unlauteren Wettbewerb (UWG)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-porcelain rounded-xl border border-silver/20 space-y-3">
              <h2 className="font-bold font-heading text-graphite text-lg flex items-center gap-2">
                <Building2 className="w-5 h-5 text-cobalt" />
                <span>Unternehmen & Hauptsitz</span>
              </h2>
              <div className="text-sm text-graphite/80 space-y-1">
                <p className="font-semibold text-graphite">Mobile World GmbH</p>
                <p>Schaffhauserstrasse 455</p>
                <p>8052 Zürich</p>
                <p>Schweiz</p>
              </div>
              <div className="pt-2 text-xs text-graphite/60">
                <p>Handelsregister des Kantons Zürich</p>
                <p>Rechtsform: Gesellschaft mit beschränkter Haftung (GmbH)</p>
              </div>
            </div>

            <div className="p-6 bg-porcelain rounded-xl border border-silver/20 space-y-3">
              <h2 className="font-bold font-heading text-graphite text-lg flex items-center gap-2">
                <Phone className="w-5 h-5 text-cobalt" />
                <span>Kontakt</span>
              </h2>
              <div className="text-sm text-graphite/80 space-y-1.5">
                <p>
                  Telefon: <a href="tel:+41445436333" className="text-cobalt hover:underline">+41 44 543 63 33</a>
                </p>
                <p>
                  WhatsApp: <a href="https://wa.me/41783448888" target="_blank" rel="noopener noreferrer" className="text-cobalt hover:underline">+41 78 344 88 88</a>
                </p>
                <p>
                  E-Mail: <a href="mailto:info@mobileworldzh.ch" className="text-cobalt hover:underline">info@mobileworldzh.ch</a>
                </p>
                <p>
                  Web: <a href="https://www.mobileworldzh.ch" target="_blank" rel="noopener noreferrer" className="text-cobalt hover:underline">www.mobileworldzh.ch</a>
                </p>
              </div>
            </div>
          </div>

          <section className="space-y-3 text-sm text-graphite/80 leading-relaxed">
            <h2 className="text-xl font-bold font-heading text-graphite">Vertretungsberechtigte Personen</h2>
            <p>
              Geschäftsführung Mobile World ZH Seebach
            </p>
          </section>

          <section className="space-y-3 text-sm text-graphite/80 leading-relaxed">
            <h2 className="text-xl font-bold font-heading text-graphite">Konzept, Design & Realisation</h2>
            <p>
              <strong>Homies Studio</strong><br />
              Design, Digital Product Architecture & Full-Stack Development<br />
              Website-Redesign & Interaktive Client-Demonstration für Mobile World Zürich
            </p>
          </section>

          <section className="space-y-3 text-sm text-graphite/80 leading-relaxed">
            <h2 className="text-xl font-bold font-heading text-graphite">Haftungsausschluss</h2>
            <p>
              Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen. Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen entstanden sind, werden ausgeschlossen.
            </p>
          </section>

          <section className="space-y-3 text-sm text-graphite/80 leading-relaxed">
            <h2 className="text-xl font-bold font-heading text-graphite">Urheberrechte</h2>
            <p>
              Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf der Website gehören ausschliesslich der Firma Mobile World GmbH oder den speziell genannten Rechtsinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung der Urheberrechtsträger im Voraus einzuholen.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
