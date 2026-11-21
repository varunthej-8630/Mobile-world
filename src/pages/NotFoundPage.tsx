import React from 'react';
import { Compass, Home, Wrench, ShoppingBag, ArrowRight } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="section-padding bg-porcelain min-h-[70vh] flex items-center justify-center">
      <div className="container max-w-lg mx-auto text-center p-8 bg-white rounded-3xl border border-silver/40 shadow-sm stagger-item stagger-1">
        <div className="w-16 h-16 bg-cobalt/10 text-cobalt rounded-2xl flex items-center justify-center mx-auto mb-4 animate-spring-pop">
          <Compass className="w-8 h-8" />
        </div>

        <span className="badge badge-dark text-xs mb-2">Fehler 404</span>

        <h1 className="text-2xl md:text-3xl font-bold font-heading text-graphite mb-2">
          Seite nicht gefunden
        </h1>

        <p className="text-sm text-graphite/70 mb-6 leading-relaxed">
          Die angeforderte Adresse existiert leider nicht oder wurde verschoben. Nutzen Sie unsere Schnellnavigation, um direkt zu Ihrem Ziel zu gelangen:
        </p>

        <div className="flex flex-col gap-2.5 mb-6">
          <button
            onClick={() => onNavigate('/')}
            className="btn btn-primary w-full justify-center"
          >
            <Home size={16} /> Zur Startseite
          </button>
          <button
            onClick={() => onNavigate('/repair-prices')}
            className="btn btn-secondary w-full justify-center"
          >
            <Wrench size={16} /> Reparaturpreis-Rechner
          </button>
          <button
            onClick={() => onNavigate('/shop')}
            className="btn btn-secondary w-full justify-center"
          >
            <ShoppingBag size={16} /> Zum Online Shop
          </button>
        </div>

        <p className="text-xs text-graphite/50">
          Mobile World Zürich Seebach · Schaffhauserstrasse 455
        </p>
      </div>
    </div>
  );
};
export default NotFoundPage;

