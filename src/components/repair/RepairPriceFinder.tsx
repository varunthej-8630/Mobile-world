import React, { useState, useMemo } from 'react';
import { 
  Smartphone, 
  Tablet, 
  Watch, 
  Wrench, 
  Clock, 
  ShieldCheck, 
  CheckCircle, 
  ArrowLeft, 
  MessageSquare, 
  Phone, 
  AlertCircle,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { DeviceCategory, RepairPriceRecord } from '../../types';
import { mockDb } from '../../data/mockDb';

interface RepairPriceFinderProps {
  onOpenEnquiry?: (repair: RepairPriceRecord) => void;
  compact?: boolean;
}

export const RepairPriceFinder: React.FC<RepairPriceFinderProps> = ({ onOpenEnquiry, compact = false }) => {
  const [category, setCategory] = useState<DeviceCategory>('smartphone');
  const [manufacturer, setManufacturer] = useState<string>('Apple');
  const [selectedModel, setSelectedModel] = useState<string>('iPhone 15 Pro');
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');

  const allRepairs = mockDb.getRepairs();

  // Distinct manufacturers available for chosen category
  const availableManufacturers = useMemo(() => {
    const set = new Set<string>();
    allRepairs
      .filter(r => r.active && (r.deviceCategory === category || r.deviceCategory === 'smartphone'))
      .forEach(r => set.add(r.manufacturer));
    return Array.from(set);
  }, [allRepairs, category]);

  // Distinct models available for chosen category and manufacturer
  const availableModels = useMemo(() => {
    const set = new Set<string>();
    allRepairs
      .filter(r => r.active && (r.deviceCategory === category || category === 'smartphone') && r.manufacturer === manufacturer)
      .forEach(r => set.add(r.model));
    return Array.from(set);
  }, [allRepairs, category, manufacturer]);

  // Ensure selectedModel stays valid
  React.useEffect(() => {
    if (availableModels.length > 0 && !availableModels.includes(selectedModel)) {
      setSelectedModel(availableModels[0]);
    }
  }, [availableModels, selectedModel]);

  // Available repair tasks for selected model
  const availableRepairs = useMemo(() => {
    return allRepairs.filter(
      r => r.active && r.manufacturer === manufacturer && r.model === selectedModel
    );
  }, [allRepairs, manufacturer, selectedModel]);

  // Default select first task when model changes
  React.useEffect(() => {
    if (availableRepairs.length > 0) {
      setSelectedTaskId(availableRepairs[0].id);
    } else {
      setSelectedTaskId('');
    }
  }, [availableRepairs]);

  const activeRecord = useMemo(() => {
    return availableRepairs.find(r => r.id === selectedTaskId) || availableRepairs[0];
  }, [availableRepairs, selectedTaskId]);

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '20px',
      border: '1px solid #DFE3E9',
      boxShadow: '0 12px 36px rgba(16, 19, 24, 0.08)',
      padding: compact ? '1.5rem' : '2.5rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Step Indicators Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #F1F5F9',
        paddingBottom: '1.25rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            backgroundColor: '#174CFF',
            color: '#FFFFFF',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.85rem',
            fontWeight: 700
          }}>
            <Wrench size={14} />
          </div>
          <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#101318' }}>
            Reparaturpreis-Rechner
          </span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.8rem',
          color: '#64748B'
        }}>
          <span style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
            <CheckCircle size={14} /> Offizielle Mobile World Preise
          </span>
          <span>•</span>
          <span>Inkl. 8.1% MwSt. &amp; Einbau</span>
        </div>
      </div>

      {/* Grid: 2 Columns on desktop */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: compact ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2.5rem'
      }}>
        {/* Step Selectors Form */}
        <div>
          {/* Step 1: Gerätekategorie */}
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label" style={{ fontSize: '0.85rem', color: '#475569' }}>
              Schritt 1: Gerätekategorie
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              {[
                { id: 'smartphone' as DeviceCategory, label: 'Smartphone', icon: Smartphone },
                { id: 'tablet' as DeviceCategory, label: 'Tablet', icon: Tablet },
                { id: 'smartwatch' as DeviceCategory, label: 'Smartwatch', icon: Watch }
              ].map(cat => {
                const Icon = cat.icon;
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setCategory(cat.id);
                      if (cat.id === 'tablet') setManufacturer('Apple');
                      if (cat.id === 'smartwatch') setManufacturer('Apple');
                    }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      padding: '0.85rem 0.5rem',
                      backgroundColor: isSelected ? 'rgba(23, 76, 255, 0.08)' : '#F8FAFC',
                      border: isSelected ? '2px solid #174CFF' : '1px solid #E2E6EC',
                      borderRadius: '12px',
                      color: isSelected ? '#174CFF' : '#1E293B',
                      fontWeight: isSelected ? 700 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Icon size={20} color={isSelected ? '#174CFF' : '#64748B'} />
                    <span style={{ fontSize: '0.85rem' }}>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Hersteller */}
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label" style={{ fontSize: '0.85rem', color: '#475569' }}>
              Schritt 2: Hersteller
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {availableManufacturers.map(m => {
                const isSelected = manufacturer === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setManufacturer(m)}
                    style={{
                      padding: '0.55rem 1rem',
                      borderRadius: '8px',
                      backgroundColor: isSelected ? '#101318' : '#F1F5F9',
                      border: '1px solid',
                      borderColor: isSelected ? '#101318' : '#E2E6EC',
                      color: isSelected ? '#FFFFFF' : '#334155',
                      fontWeight: isSelected ? 700 : 500,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {m}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Modell */}
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label" style={{ fontSize: '0.85rem', color: '#475569' }}>
              Schritt 3: Modell auswählen
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="form-control"
              style={{ fontWeight: 600, padding: '0.85rem 1rem' }}
            >
              {availableModels.map(mod => (
                <option key={mod} value={mod}>{mod}</option>
              ))}
            </select>
          </div>

          {/* Step 4: Reparaturart */}
          <div className="form-group" style={{ marginBottom: '0.5rem' }}>
            <label className="form-label" style={{ fontSize: '0.85rem', color: '#475569' }}>
              Schritt 4: Schaden / Reparaturart
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '220px', overflowY: 'auto' }}>
              {availableRepairs.map(rep => {
                const isSelected = selectedTaskId === rep.id;
                return (
                  <button
                    key={rep.id}
                    type="button"
                    onClick={() => setSelectedTaskId(rep.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      backgroundColor: isSelected ? 'rgba(23, 76, 255, 0.06)' : '#FFFFFF',
                      border: isSelected ? '1.5px solid #174CFF' : '1px solid #E2E6EC',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: isSelected ? 700 : 600, fontSize: '0.9rem', color: '#101318' }}>
                        {rep.repairTask}
                      </div>
                      {rep.qualityGrade && (
                        <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                          Qualitätsstufe: <strong>{rep.qualityGrade}</strong>
                        </span>
                      )}
                    </div>
                    <span style={{
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      color: isSelected ? '#174CFF' : '#101318'
                    }}>
                      CHF {rep.priceChf}.-
                    </span>
                  </button>
                );
              })}

              {availableRepairs.length === 0 && (
                <div style={{
                  padding: '1.5rem',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '8px',
                  textAlign: 'center',
                  color: '#64748B'
                }}>
                  <AlertCircle size={20} color="#F59E0B" style={{ margin: '0 auto 0.5rem' }} />
                  <div>Keine vordefinierten Festpreise für dieses Modell in der Datenbank.</div>
                  <div style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
                    Bitte kontaktieren Sie uns für einen schnellen Kostenvoranschlag.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Price Result Showcase Card */}
        <div>
          {activeRecord ? (
            <div style={{
              backgroundColor: '#101318',
              color: '#FFFFFF',
              borderRadius: '16px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              boxShadow: '0 20px 40px rgba(16, 19, 24, 0.25)',
              position: 'relative'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <span className="badge badge-blue" style={{ backgroundColor: 'rgba(23, 76, 255, 0.25)', color: '#7096FF' }}>
                    Geprüfter Festpreis
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                    Stand: {activeRecord.lastUpdated}
                  </span>
                </div>

                <div style={{ fontSize: '0.875rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {activeRecord.manufacturer} • {activeRecord.model}
                </div>

                <h3 style={{
                  color: '#FFFFFF',
                  fontSize: '1.35rem',
                  margin: '0.35rem 0 1.25rem',
                  fontFamily: 'var(--font-heading)'
                }}>
                  {activeRecord.repairTask}
                </h3>

                {/* Big Price Tag */}
                <div style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.5rem',
                  marginBottom: '1.5rem',
                  borderBottom: '1px solid #262E3B',
                  paddingBottom: '1.5rem'
                }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 600, color: '#AAB2C0' }}>CHF</span>
                  <span style={{
                    fontSize: '3.25rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-heading)',
                    lineHeight: 1,
                    color: '#FFFFFF'
                  }}>
                    {activeRecord.priceChf}.-
                  </span>
                  <span style={{ fontSize: '0.85rem', color: '#94A3B8', marginLeft: '0.25rem' }}>
                    inkl. MwSt. &amp; Arbeit
                  </span>
                </div>

                {/* Benefits / Specs list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.9rem' }}>
                    <Clock size={16} color="#7096FF" />
                    <span>Express-Dauer: <strong>{activeRecord.durationEstimate}</strong></span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.9rem' }}>
                    <ShieldCheck size={16} color="#10B981" />
                    <span>Schweizer Garantie: <strong>{activeRecord.warrantyMonths} Monate</strong></span>
                  </div>

                  {activeRecord.qualityGrade && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.9rem' }}>
                      <Sparkles size={16} color="#D9FF70" />
                      <span>Ersatzteilqualität: <strong>{activeRecord.qualityGrade}</strong></span>
                    </div>
                  )}

                  {activeRecord.notes && (
                    <p style={{
                      fontSize: '0.825rem',
                      color: '#94A3B8',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      marginTop: '0.5rem',
                      lineHeight: 1.5
                    }}>
                      {activeRecord.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => onOpenEnquiry && onOpenEnquiry(activeRecord)}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.9rem' }}
                >
                  <Wrench size={16} /> Reparatur unverbindlich anfragen
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <a
                    href={`https://wa.me/41783448888?text=Hallo%20Mobile%20World,%20ich%20habe%20eine%20Frage%20zur%20Reparatur:%20${encodeURIComponent(activeRecord.model)}%20-%20${encodeURIComponent(activeRecord.repairTask)}%20(CHF%20${activeRecord.priceChf}.-)`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-white btn-sm"
                    style={{ fontSize: '0.8rem' }}
                  >
                    <MessageSquare size={13} color="#10B981" /> WhatsApp
                  </a>

                  <a
                    href="tel:+41445436333"
                    className="btn btn-outline-white btn-sm"
                    style={{ fontSize: '0.8rem' }}
                  >
                    <Phone size={13} color="#7096FF" /> Seebach Anrufen
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div style={{
              backgroundColor: '#F8FAFC',
              borderRadius: '16px',
              border: '2px dashed #E2E6EC',
              padding: '3rem 2rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%'
            }}>
              <Wrench size={36} color="#94A3B8" style={{ marginBottom: '1rem' }} />
              <h4 style={{ color: '#1E293B', marginBottom: '0.5rem' }}>Wählen Sie Modell &amp; Schaden</h4>
              <p style={{ color: '#64748B', fontSize: '0.9rem', maxWidth: '300px' }}>
                Wählen Sie in den Schritten links Ihr Gerät aus, um den verbindlichen Preis von Mobile World zu berechnen.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
