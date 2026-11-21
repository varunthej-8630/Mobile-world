import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Smartphone, 
  Tablet, 
  Watch, 
  Wrench, 
  Clock, 
  ShieldCheck, 
  Check, 
  MapPin, 
  MessageSquare, 
  Phone, 
  Search, 
  ArrowRight, 
  ChevronDown,
  ChevronUp,
  Battery,
  Zap,
  Layers,
  Camera,
  Mic,
  Volume2,
  Droplets,
  Plus,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { DeviceCategory, RepairPriceRecord } from '../../types';
import { mockDb } from '../../data/mockDb';

interface RepairPriceFinderProps {
  onOpenEnquiry?: (repair: RepairPriceRecord) => void;
  compact?: boolean;
}

export const RepairPriceFinder: React.FC<RepairPriceFinderProps> = ({ onOpenEnquiry, compact = false }) => {
  const [category, setCategory] = useState<DeviceCategory>('smartphone');
  const [manufacturer, setManufacturer] = useState<string>('Samsung');
  const [selectedModel, setSelectedModel] = useState<string>('Samsung Galaxy A7');
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');
  const [modelSearchOpen, setModelSearchOpen] = useState(false);
  const [modelSearchQuery, setModelSearchQuery] = useState('');
  const [showAllRepairs, setShowAllRepairs] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const allRepairs = mockDb.getRepairs();

  // All 11 Supported Brands
  const brandList = [
    'Samsung',
    'Apple',
    'Huawei',
    'Google',
    'Nokia',
    'HTC',
    'Honor',
    'Sony',
    'LG',
    'Xiaomi',
    'OnePlus'
  ];

  // Distinct models available for chosen category & manufacturer
  const availableModels = useMemo(() => {
    const set = new Set<string>();
    allRepairs
      .filter(r => r.active && r.manufacturer.toLowerCase() === manufacturer.toLowerCase() && (category === 'smartphone' || r.deviceCategory === category))
      .forEach(r => set.add(r.model));
    
    const list = Array.from(set);
    list.sort((a, b) => b.localeCompare(a, undefined, { numeric: true, sensitivity: 'base' }));
    return list;
  }, [allRepairs, category, manufacturer]);

  // Filtered models for dropdown search
  const filteredModels = useMemo(() => {
    if (!modelSearchQuery.trim()) return availableModels;
    const q = modelSearchQuery.toLowerCase().trim();
    return availableModels.filter(m => m.toLowerCase().includes(q));
  }, [availableModels, modelSearchQuery]);

  // Ensure selectedModel stays valid when brand or category changes
  useEffect(() => {
    if (availableModels.length > 0) {
      if (!selectedModel || !availableModels.includes(selectedModel)) {
        // Prefer Samsung Galaxy A7 if present, else first model
        const preferred = availableModels.find(m => m.toLowerCase() === 'samsung galaxy a7') || availableModels[0];
        setSelectedModel(preferred);
      }
    } else {
      setSelectedModel('');
    }
  }, [availableModels, selectedModel]);

  // Available repairs for selected model
  const availableRepairs = useMemo(() => {
    if (!selectedModel) return [];
    const list = allRepairs.filter(
      r => r.active && r.manufacturer.toLowerCase() === manufacturer.toLowerCase() && r.model === selectedModel
    );
    // Deduplicate tasks by task name
    const map = new Map<string, RepairPriceRecord>();
    list.forEach(r => {
      const key = r.repairTask.toLowerCase();
      if (!map.has(key) || (r.priceChf > 0 && map.get(key)!.priceChf === 0)) {
        map.set(key, r);
      }
    });

    // Sort to prioritize core repairs: Display, Rückseite, Akku, Mikrofon, Ladebuchse...
    const orderPriority = ['display', 'rückseite', 'akku', 'mikrofon', 'ladebuchse', 'frontkamera', 'hauptkamera', 'kameraglas', 'hörmuschel', 'lautsprecher', 'taste'];
    const sorted = Array.from(map.values()).sort((a, b) => {
      const aIdx = orderPriority.findIndex(k => a.repairTask.toLowerCase().includes(k));
      const bIdx = orderPriority.findIndex(k => b.repairTask.toLowerCase().includes(k));
      const aVal = aIdx === -1 ? 99 : aIdx;
      const bVal = bIdx === -1 ? 99 : bIdx;
      return aVal - bVal;
    });

    return sorted;
  }, [allRepairs, manufacturer, selectedModel]);

  // Always keep an active task selected!
  useEffect(() => {
    if (availableRepairs.length > 0) {
      const isCurrentValid = availableRepairs.some(r => r.id === selectedTaskId);
      if (!isCurrentValid) {
        // Prefer Mikrofon or Display or first available
        const found = availableRepairs.find(r => r.repairTask.toLowerCase().includes('mikrofon')) ||
                      availableRepairs.find(r => r.repairTask.toLowerCase().includes('display')) ||
                      availableRepairs[0];
        setSelectedTaskId(found.id);
      }
    } else {
      setSelectedTaskId('');
    }
  }, [availableRepairs, selectedTaskId]);

  const activeRecord = useMemo(() => {
    if (availableRepairs.length === 0) return null;
    return availableRepairs.find(r => r.id === selectedTaskId) || availableRepairs[0];
  }, [availableRepairs, selectedTaskId]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setModelSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Visual Category Color Theming (Raphus Signature Pastel System)
  const getTaskTheming = (task: string, isSelected: boolean) => {
    const t = task.toLowerCase();

    // 1. Display / Glas -> Lavender / Violet
    if (t.includes('display') || t.includes('glas') || t.includes('touch') || t.includes('bildschirm')) {
      return {
        icon: Zap,
        bg: isSelected ? '#FAF5FF' : '#FDFBFE',
        border: isSelected ? '#7C3AED' : '#E9D7FE',
        accent: '#7E22CE',
        iconBg: isSelected ? '#EDE9FE' : '#F5F3FF',
        glow: 'rgba(126, 34, 206, 0.16)'
      };
    }

    // 2. Akku / Batterie -> Sky Blue
    if (t.includes('akku') || t.includes('batterie')) {
      return {
        icon: Battery,
        bg: isSelected ? '#EFF6FF' : '#F8FAFF',
        border: isSelected ? '#2563EB' : '#BFDBFE',
        accent: '#1D4ED8',
        iconBg: isSelected ? '#DBEAFE' : '#EFF6FF',
        glow: 'rgba(29, 78, 216, 0.16)'
      };
    }

    // 3. Ladebuchse / Port -> Warm Amber / Orange
    if (t.includes('lade') || t.includes('buchse') || t.includes('anschluss') || t.includes('usb')) {
      return {
        icon: Zap,
        bg: isSelected ? '#FFF7ED' : '#FFFAF5',
        border: isSelected ? '#EA580C' : '#FED7AA',
        accent: '#C2410C',
        iconBg: isSelected ? '#FFEDD5' : '#FFF7ED',
        glow: 'rgba(194, 65, 12, 0.16)'
      };
    }

    // 4. Rückseite / Backcover -> Ice Blue / Cyan
    if (t.includes('rückseite') || t.includes('backcover') || t.includes('deckel') || t.includes('gehäuse')) {
      return {
        icon: Layers,
        bg: isSelected ? '#F0F9FF' : '#F7FCFF',
        border: isSelected ? '#0284C7' : '#BAE6FD',
        accent: '#0369A1',
        iconBg: isSelected ? '#E0F2FE' : '#F0F9FF',
        glow: 'rgba(2, 132, 199, 0.16)'
      };
    }

    // 5. Mikrofon / Audio -> Rose / Magenta
    if (t.includes('mikro') || t.includes('mic')) {
      return {
        icon: Mic,
        bg: isSelected ? '#FDF2F8' : '#FFF7FA',
        border: isSelected ? '#E11D48' : '#FBCFE8',
        accent: '#BE123C',
        iconBg: isSelected ? '#FCE7F3' : '#FDF2F8',
        glow: 'rgba(190, 18, 60, 0.16)'
      };
    }

    // 6. Kamera & Glas -> Mint Emerald
    if (t.includes('kamera') || t.includes('optik')) {
      return {
        icon: Camera,
        bg: isSelected ? '#F0FDF4' : '#F7FDF9',
        border: isSelected ? '#16A34A' : '#BBF7D0',
        accent: '#15803D',
        iconBg: isSelected ? '#DCFCE7' : '#F0FDF4',
        glow: 'rgba(21, 128, 61, 0.16)'
      };
    }

    // 7. Lautsprecher / Hörmuschel -> Indigo
    if (t.includes('lautsprecher') || t.includes('hörmuschel') || t.includes('speaker') || t.includes('ton')) {
      return {
        icon: Volume2,
        bg: isSelected ? '#EEF2FF' : '#F8F9FF',
        border: isSelected ? '#4F46E5' : '#C7D2FE',
        accent: '#4338CA',
        iconBg: isSelected ? '#E0E7FF' : '#EEF2FF',
        glow: 'rgba(67, 56, 202, 0.16)'
      };
    }

    // 8. Wasserschaden -> Cyan Teal
    if (t.includes('wasser')) {
      return {
        icon: Droplets,
        bg: isSelected ? '#F0FDFA' : '#F6FDFB',
        border: isSelected ? '#0D9488' : '#99F6E4',
        accent: '#0F766E',
        iconBg: isSelected ? '#CCFBF1' : '#F0FDFA',
        glow: 'rgba(15, 118, 110, 0.16)'
      };
    }

    // Default / Tasten / All others -> Soft Purple
    return {
      icon: Wrench,
      bg: isSelected ? '#F5F3FF' : '#FAFAFC',
      border: isSelected ? '#7C3AED' : '#E2E8F0',
      accent: '#6D28D9',
      iconBg: isSelected ? '#EDE9FE' : '#F1F5F9',
      glow: 'rgba(109, 40, 217, 0.16)'
    };
  };

  // Render authentic brand logo & wordmark
  const renderBrandContent = (brand: string, isSelected: boolean) => {
    const textColor = isSelected ? '#FFFFFF' : '#1E293B';

    switch (brand) {
      case 'Samsung':
        return (
          <span style={{ 
            fontWeight: 900, 
            letterSpacing: '0.06em', 
            fontSize: '0.8rem',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            SAMSUNG
          </span>
        );
      case 'Apple':
        return (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <svg width="13" height="13" viewBox="0 0 170 170" fill="currentColor">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.34-6.42-9.79-11.41-20.73-14.97-32.83-3.56-12.09-5.34-23.47-5.34-34.14 0-16.3 4.29-29.47 12.87-39.51 8.58-10.05 19.38-15.17 32.4-15.39 4.8 0 10.42 1.34 16.86 4.02 6.44 2.68 10.48 4.07 12.11 4.18 1.45 0 5.75-1.5 12.89-4.5 7.14-3 13.06-4.33 17.76-3.99 13.84 1.09 24.88 6.44 33.12 16.07-12.11 7.37-18.06 17.43-17.85 30.19.22 9.94 4.07 18.27 11.55 25 7.48 6.73 16.41 10.51 26.79 11.35-2.61 7.82-5.71 15.69-9.31 23.6zM119.22 31.84c0-7.8 2.82-15.08 8.46-21.84 5.64-6.76 12.63-10.74 20.97-11.94.33 1.09.49 2.18.49 3.27 0 7.8-2.95 15.19-8.86 22.17-5.91 6.98-13 10.98-21.27 12-.11-.54-.17-1.09-.17-1.66z"/>
            </svg>
            <span style={{ fontWeight: 700, fontSize: '0.8rem' }}>Apple</span>
          </div>
        );
      case 'Huawei':
        return (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill={isSelected ? '#FFFFFF' : '#ED1C24'}>
              <path d="M12 2c.4 1.5 1.5 3.5 2.5 4.5-.8.3-1.8.4-2.5.4s-1.7-.1-2.5-.4c1-1 2.1-3 2.5-4.5zm4.8 2.2c1.2 1.3 2.7 3.1 3.1 4.5-.8.2-1.7.1-2.5-.1-.7-.8-1.3-2.1-1.6-3.4.3-.4.7-.7 1-.1zm-9.6 0c.3-.6.7-.3 1 .1-.3 1.3-.9 2.6-1.6 3.4-.8.2-1.7.3-2.5.1.4-1.4 1.9-3.2 3.1-4.5zm12.8 5.4c.5 1.4.6 3.3.4 4.5-.7-.2-1.5-.6-2.1-1.1 0-1.1.2-2.6.7-3.8.3.1.7.2 1 .4zm-16 0c.3-.2.7-.3 1-.4.5 1.2.7 2.7.7 3.8-.6.5-1.4.9-2.1 1.1-.2-1.2-.1-3.1.4-4.5zm16 6c-.2 1.5-.9 3.2-1.7 4.1-.5-.6-1-1.3-1.3-2.1.8-.7 1.7-1.6 2.2-2.5.3.1.6.3.8.5zm-16 0c.2-.2.5-.4.8-.5.5.9 1.4 1.8 2.2 2.5-.3.8-.8 1.5-1.3 2.1-.8-.9-1.5-2.6-1.7-4.1zm13.1 4.7c-.8 1.2-2.2 2.4-3.4 2.9-.3-.8-.4-1.7-.4-2.5 1-.4 2.2-1 3-1.7.3.5.6.9.8 1.3zm-10.2 0c.2-.4.5-.8.8-1.3.8.7 2 1.3 3 1.7 0 .8-.1 1.7-.4 2.5-1.2-.5-2.6-1.7-3.4-2.9z"/>
            </svg>
            <span style={{ fontWeight: 700, fontSize: '0.8rem' }}>Huawei</span>
          </div>
        );
      case 'Google':
        return (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <svg width="13" height="13" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span style={{ fontWeight: 700, fontSize: '0.8rem' }}>Google</span>
          </div>
        );
      case 'Nokia':
        return (
          <span style={{ 
            fontWeight: 900, 
            letterSpacing: '0.08em', 
            fontSize: '0.78rem',
            fontFamily: 'system-ui, sans-serif'
          }}>
            NOKIA
          </span>
        );
      case 'HTC':
        return (
          <span style={{ 
            fontWeight: 800, 
            letterSpacing: '-0.02em', 
            fontSize: '0.85rem',
            fontFamily: 'sans-serif'
          }}>
            htc
          </span>
        );
      case 'Honor':
        return (
          <span style={{ 
            fontWeight: 800, 
            letterSpacing: '0.05em', 
            fontSize: '0.78rem',
            fontFamily: 'sans-serif'
          }}>
            HONOR
          </span>
        );
      case 'Sony':
        return (
          <span style={{ 
            fontWeight: 800, 
            letterSpacing: '0.08em', 
            fontSize: '0.8rem',
            fontFamily: 'Georgia, serif'
          }}>
            SONY
          </span>
        );
      case 'LG':
        return (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <svg width="13" height="13" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill={isSelected ? '#FFFFFF' : '#A50034'}/>
              <circle cx="8.5" cy="9.5" r="1.3" fill={isSelected ? '#1B1D1E' : '#FFFFFF'}/>
              <path fill="none" stroke={isSelected ? '#1B1D1E' : '#FFFFFF'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M12 7.5v6.2h3.5M16.5 12a4.5 4.5 0 1 1-1.3-3.2"/>
            </svg>
            <span style={{ fontWeight: 800, fontSize: '0.8rem' }}>LG</span>
          </div>
        );
      case 'Xiaomi':
        return (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <svg width="13" height="13" viewBox="0 0 24 24">
              <rect width="24" height="24" rx="6" fill="#FF6900"/>
              <path fill="#FFFFFF" d="M7 7.5h2.4v5h2.2v-5H14v9h-2.4v-2.2H9.4V16.5H7v-9zm8.5 0h2.4v9h-2.4v-9z"/>
            </svg>
            <span style={{ fontWeight: 700, fontSize: '0.8rem' }}>Xiaomi</span>
          </div>
        );
      case 'OnePlus':
        return (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <svg width="13" height="13" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke={isSelected ? '#FFFFFF' : '#EB0028'} strokeWidth="2"/>
              <path fill={isSelected ? '#FFFFFF' : '#EB0028'} d="M9.5 7.5h1.8v9H9.5V10.2l-1.3.8-.7-1.3 2-1.2zm6.2 3.2h1.8v2.1h2.1v1.8h-2.1v2.1h-1.8v-2.1h-2.1v-1.8h2.1v-2.1z"/>
            </svg>
            <span style={{ fontWeight: 700, fontSize: '0.8rem' }}>OnePlus</span>
          </div>
        );
      default:
        return <span style={{ fontWeight: 700, fontSize: '0.8rem' }}>{brand}</span>;
    }
  };

  // Determine which repairs to display (Top 4 default or All when expanded)
  const displayedRepairs = useMemo(() => {
    if (showAllRepairs || availableRepairs.length <= 4) {
      return availableRepairs;
    }
    // Top 4 default
    const top4 = availableRepairs.slice(0, 4);
    // If selected repair is beyond top 4, ensure it's included!
    if (selectedTaskId && !top4.some(r => r.id === selectedTaskId)) {
      const activeObj = availableRepairs.find(r => r.id === selectedTaskId);
      if (activeObj) {
        return [...top4.slice(0, 3), activeObj];
      }
    }
    return top4;
  }, [availableRepairs, showAllRepairs, selectedTaskId]);

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '28px',
      border: '1.5px solid #E9D7FE',
      padding: 'clamp(1.5rem, 3vw, 2.5rem)',
      boxShadow: '0 20px 50px rgba(73, 40, 253, 0.07), 0 2px 8px rgba(0, 0, 0, 0.02)',
      color: '#1B1D1E'
    }}>
      {/* Top Header Badge & Guarantee Pill */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        marginBottom: '1rem'
      }}>
        {/* Left Badge: [+] Offizieller Reparaturpreis-Rechner */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: '#F7F0FE',
          padding: '0.4rem 0.85rem',
          borderRadius: '12px',
          border: '1px solid #E9D7FE'
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            borderRadius: '6px',
            backgroundColor: '#EDE9FE',
            color: '#4928FD',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.85rem'
          }}>
            <Plus size={13} strokeWidth={3} />
          </div>
          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1B1D1E' }}>
            Offizieller Reparaturpreis-Rechner
          </span>
        </div>

        {/* Right Badge: 6 Monate Schweizer Garantie */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          backgroundColor: '#ECFDF5',
          color: '#059669',
          padding: '0.35rem 0.85rem',
          borderRadius: '9999px',
          border: '1px solid #A7F3D0',
          fontSize: '0.8rem',
          fontWeight: 700
        }}>
          <Check size={14} strokeWidth={2.5} />
          <span>6 Monate Schweizer Garantie</span>
        </div>
      </div>

      {/* Main Title & Subtitle */}
      <div style={{ marginBottom: '1.75rem' }}>
        <h2 style={{
          fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
          fontWeight: 800,
          fontFamily: 'var(--font-heading)',
          color: '#1B1D1E',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          marginBottom: '0.35rem'
        }}>
          Gerät kaputt? Preis sofort klar.
        </h2>
        <p style={{ color: '#64748B', fontSize: '0.95rem', lineHeight: 1.5 }}>
          Gerät auswählen, Reparatur finden – und direkt in Zürich reparieren lassen.
        </p>
      </div>

      {/* 2-Column Responsive Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
        gap: '2rem',
        alignItems: 'start'
      }}>
        {/* LEFT COLUMN: 4 STEPS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* STEP 1: Gerätekategorie wählen */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.55rem' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '8px',
                backgroundColor: '#F7F0FE',
                color: '#4928FD',
                fontSize: '0.8rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #E9D7FE'
              }}>
                1
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1B1D1E' }}>
                Gerätekategorie wählen
              </span>
            </div>

            {/* Segmented Track Control */}
            <div style={{
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              padding: '0.25rem',
              borderRadius: '16px',
              display: 'flex',
              gap: '0.35rem'
            }}>
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
                      if (cat.id === 'tablet' && !['Samsung', 'Apple'].includes(manufacturer)) {
                        setManufacturer('Samsung');
                      }
                      if (cat.id === 'smartwatch') {
                        setManufacturer('Apple');
                      }
                    }}
                    style={{
                      flex: 1,
                      padding: '0.6rem 0.75rem',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45rem',
                      fontSize: '0.85rem',
                      fontWeight: isSelected ? 700 : 500,
                      cursor: 'pointer',
                      border: isSelected ? '1.5px solid #4928FD' : '1px solid transparent',
                      backgroundColor: isSelected ? '#FFFFFF' : 'transparent',
                      color: isSelected ? '#4928FD' : '#64748B',
                      boxShadow: isSelected ? '0 2px 8px rgba(73, 40, 253, 0.12)' : 'none',
                      transition: 'all 160ms ease'
                    }}
                  >
                    <Icon size={16} color={isSelected ? '#4928FD' : '#94A3B8'} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Marke auswählen (Official Logos + Wordmarks) */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.55rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '8px',
                  backgroundColor: '#F7F0FE',
                  color: '#4928FD',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #E9D7FE'
                }}>
                  2
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1B1D1E' }}>
                  Marke auswählen
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600 }}>
                ✓ {manufacturer} aktiv
              </span>
            </div>

            {/* Brand Pills Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(88px, 1fr))',
              gap: '0.45rem'
            }}>
              {brandList.map(b => {
                const isSelected = manufacturer.toLowerCase() === b.toLowerCase();
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => {
                      setManufacturer(b);
                      setModelSearchQuery('');
                      setShowAllRepairs(false);
                    }}
                    style={{
                      height: '40px',
                      padding: '0 0.45rem',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: isSelected ? 800 : 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      backgroundColor: isSelected ? '#1B1D1E' : '#FFFFFF',
                      color: isSelected ? '#FFFFFF' : '#334155',
                      border: isSelected ? '1.5px solid #1B1D1E' : '1px solid #E2E8F0',
                      boxShadow: isSelected ? '0 4px 12px rgba(27, 29, 30, 0.2)' : '0 1px 2px rgba(0, 0, 0, 0.02)',
                      transform: isSelected ? 'scale(1.02)' : 'none',
                      transition: 'all 160ms cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {renderBrandContent(b, isSelected)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: Modell auswählen */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.55rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '8px',
                  backgroundColor: '#F7F0FE',
                  color: '#4928FD',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #E9D7FE'
                }}>
                  3
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1B1D1E' }}>
                  Modell auswählen
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#4928FD', fontWeight: 600 }}>
                {availableModels.length} {manufacturer}-Modelle
              </span>
            </div>

            {/* Custom Dropdown Trigger */}
            <div style={{ position: 'relative' }} ref={dropdownRef}>
              <div 
                onClick={() => setModelSearchOpen(!modelSearchOpen)}
                style={{
                  width: '100%',
                  height: '46px',
                  padding: '0 1rem',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Search size={16} color="#64748B" />
                  <span style={{ fontSize: '0.925rem', fontWeight: 700, color: '#1B1D1E' }}>
                    {selectedModel || 'Modell auswählen...'}
                  </span>
                </div>
                <ChevronDown size={16} color="#64748B" style={{ transform: modelSearchOpen ? 'rotate(180deg)' : 'none', transition: 'transform 180ms ease' }} />
              </div>

              {/* Popover Dropdown */}
              {modelSearchOpen && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  left: 0,
                  right: 0,
                  zIndex: 50,
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '16px',
                  boxShadow: '0 16px 36px rgba(0,0,0,0.12)',
                  overflow: 'hidden',
                  padding: '0.5rem'
                }}>
                  <div style={{ padding: '0.25rem', borderBottom: '1px solid #F1F5F9', marginBottom: '0.25rem' }}>
                    <input
                      type="text"
                      placeholder={`${manufacturer}-Modell suchen (z.B. A7, S24, Pro)...`}
                      value={modelSearchQuery}
                      onChange={(e) => setModelSearchQuery(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.75rem',
                        fontSize: '0.85rem',
                        borderRadius: '10px',
                        border: '1px solid #CBD5E1',
                        backgroundColor: '#F8FAFC',
                        outline: 'none'
                      }}
                      autoFocus
                    />
                  </div>
                  <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {filteredModels.map(m => (
                      <div
                        key={m}
                        onClick={() => {
                          setSelectedModel(m);
                          setModelSearchOpen(false);
                          setModelSearchQuery('');
                          setShowAllRepairs(false);
                        }}
                        style={{
                          padding: '0.65rem 0.85rem',
                          borderRadius: '10px',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: selectedModel === m ? '#F7F0FE' : 'transparent',
                          color: selectedModel === m ? '#4928FD' : '#1B1D1E',
                          fontWeight: selectedModel === m ? 700 : 500
                        }}
                      >
                        <span>{m}</span>
                        {selectedModel === m && <Check size={14} color="#4928FD" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <p style={{ fontSize: '0.725rem', color: '#94A3B8', marginTop: '0.35rem', paddingLeft: '0.25rem' }}>
              Modell suchen oder aus der Liste auswählen.
            </p>
          </div>

          {/* STEP 4: Was soll repariert werden? (COMPACT, VIBRANT & SPACE-EFFICIENT) */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.55rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '8px',
                  backgroundColor: '#F7F0FE',
                  color: '#4928FD',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #E9D7FE'
                }}>
                  4
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1B1D1E' }}>
                  Was soll repariert werden?
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                Eine Reparatur wählen
              </span>
            </div>

            {/* Compact 2-Column Grid with Category Colors */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '0.55rem',
                maxHeight: showAllRepairs ? '260px' : 'none',
                overflowY: showAllRepairs ? 'auto' : 'visible',
                paddingRight: showAllRepairs ? '4px' : '0'
              }}
            >
              {displayedRepairs.map(rep => {
                const isSelected = selectedTaskId === rep.id;
                const theme = getTaskTheming(rep.repairTask, isSelected);
                const Icon = theme.icon;
                const isQuote = rep.priceType === 'quote_required' || rep.priceChf === 0;

                return (
                  <div
                    key={rep.id}
                    onClick={() => setSelectedTaskId(rep.id)}
                    style={{
                      backgroundColor: theme.bg,
                      border: isSelected ? `2px solid ${theme.border}` : `1.5px solid ${theme.border}`,
                      borderRadius: '16px',
                      padding: '0.7rem 0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      minHeight: '74px',
                      boxShadow: isSelected ? `0 4px 16px ${theme.glow}` : '0 1px 3px rgba(0,0,0,0.02)',
                      transform: isSelected ? 'translateY(-1px)' : 'none',
                      transition: 'all 160ms cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {/* Top Row: Icon + Title/Badge + Radio Circle */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                        <div style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '8px',
                          backgroundColor: theme.iconBg,
                          color: theme.accent,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                        }}>
                          <Icon size={14} />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1B1D1E', lineHeight: 1.2 }}>
                            {rep.repairTask}
                          </div>
                          <div style={{ fontSize: '0.68rem', color: isSelected ? theme.accent : '#64748B', fontWeight: 600 }}>
                            {rep.qualityGrade || 'Geprüftes Ersatzteil'}
                          </div>
                        </div>
                      </div>

                      {/* Radio Circle */}
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: isSelected ? theme.accent : '#FFFFFF',
                        border: isSelected ? `2px solid ${theme.accent}` : '1.5px solid #CBD5E1',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}>
                        {isSelected && <Check size={11} strokeWidth={3} />}
                      </div>
                    </div>

                    {/* Bottom Row: Price */}
                    <div style={{ marginTop: '0.45rem' }}>
                      <span style={{
                        fontSize: '0.925rem',
                        fontWeight: 800,
                        color: isSelected ? theme.accent : '#1B1D1E',
                        fontFamily: 'var(--font-heading)'
                      }}>
                        {isQuote ? 'Auf Anfrage' : `CHF ${rep.priceChf}.–`}
                      </span>
                    </div>
                  </div>
                );
              })}

              {availableRepairs.length === 0 && (
                <div style={{
                  gridColumn: '1 / -1',
                  padding: '1.25rem',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '16px',
                  textAlign: 'center',
                  color: '#64748B',
                  fontSize: '0.85rem'
                }}>
                  <AlertCircle size={20} color="#F59E0B" style={{ margin: '0 auto 0.5rem' }} />
                  <div>Für dieses Modell ist aktuell eine persönliche Werkstatt-Anfrage erforderlich.</div>
                </div>
              )}
            </div>

            {/* Space-Saving Expander for remaining repairs */}
            {availableRepairs.length > 4 && (
              <button
                type="button"
                onClick={() => setShowAllRepairs(!showAllRepairs)}
                style={{
                  width: '100%',
                  marginTop: '0.65rem',
                  padding: '0.55rem 0.75rem',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#4928FD',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  cursor: 'pointer',
                  transition: 'all 160ms ease'
                }}
              >
                <span>
                  {showAllRepairs 
                    ? 'Kompaktansicht anzeigen' 
                    : `+ Weitere ${availableRepairs.length - 4} Reparaturen anzeigen (Kamera, Tasten, etc.)`}
                </span>
                {showAllRepairs ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: 2 RICH CARDS (DARK SHOWCASE + LIGHT SUPPORT) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', position: 'sticky', top: '90px' }}>
          
          {/* Card 1: Guaranteed Rich Dark Showcase Card (#1B1D1E) */}
          {activeRecord ? (
            <div style={{
              backgroundColor: '#1B1D1E',
              color: '#FFFFFF',
              borderRadius: '24px',
              padding: '1.65rem',
              boxShadow: '0 20px 48px rgba(16, 19, 24, 0.28)',
              border: '1px solid #2D3133',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '430px'
            }}>
              <div>
                {/* Verified Badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  color: '#A5B4FC',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  marginBottom: '1.15rem'
                }}>
                  <Check size={12} strokeWidth={2.5} />
                  <span>GEPRÜFTER WERKSTATT-TARIF</span>
                </div>

                {/* Device Model Uppercase */}
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#94A3B8',
                  marginBottom: '0.25rem'
                }}>
                  {selectedModel.toUpperCase()}
                </div>

                {/* Repair Task Headline */}
                <h3 style={{
                  fontSize: '1.45rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-heading)',
                  color: '#FFFFFF',
                  lineHeight: 1.25,
                  marginBottom: '1.15rem'
                }}>
                  {activeRecord.repairTask.toLowerCase().includes('reparier') 
                    ? activeRecord.repairTask 
                    : `${activeRecord.repairTask} reparieren`}
                </h3>

                {/* Big Price Display */}
                <div style={{ marginBottom: '1.35rem' }}>
                  {activeRecord.priceType === 'quote_required' || activeRecord.priceChf === 0 ? (
                    <div>
                      <div style={{
                        fontSize: '2.2rem',
                        fontWeight: 800,
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-heading)',
                        lineHeight: 1
                      }}>
                        Auf Anfrage
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '0.35rem', display: 'block' }}>
                        Unverbindlicher Kostenvoranschlag innert 30 Min.
                      </span>
                    </div>
                  ) : (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'baseline' }}>
                        <span style={{ fontSize: '1.15rem', color: '#CBD5E1', fontWeight: 600, marginRight: '0.35rem' }}>
                          CHF
                        </span>
                        <span style={{
                          fontSize: 'clamp(2.5rem, 4.5vw, 3.25rem)',
                          fontWeight: 800,
                          fontFamily: 'var(--font-heading)',
                          color: '#FFFFFF',
                          lineHeight: 1,
                          letterSpacing: '-0.02em'
                        }}>
                          {activeRecord.priceChf}.–
                        </span>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '0.35rem', display: 'block' }}>
                        Inkl. 8.1% MwSt. &amp; Express-Einbau
                      </span>
                    </div>
                  )}
                </div>

                {/* 3 Value Bullets */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid #2D3133'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Clock size={16} color="#818CF8" style={{ flexShrink: 0 }} />
                    <div>
                      <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#FFFFFF' }}>In 30–60 Minuten</span>
                      <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block' }}>Express-Reparatur vor Ort</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <ShieldCheck size={16} color="#34D399" style={{ flexShrink: 0 }} />
                    <div>
                      <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#FFFFFF' }}>6 Monate Garantie</span>
                      <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block' }}>Schweizer Garantie auf die Reparatur</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <MapPin size={16} color="#38BDF8" style={{ flexShrink: 0 }} />
                    <div>
                      <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#FFFFFF' }}>4 Filialen in Zürich</span>
                      <span style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block' }}>Reparatur in deiner Nähe</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  type="button"
                  onClick={() => onOpenEnquiry && onOpenEnquiry(activeRecord)}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1.25rem',
                    backgroundColor: '#4928FD',
                    color: '#FFFFFF',
                    borderRadius: '14px',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(73, 40, 253, 0.35)',
                    transition: 'all 160ms ease'
                  }}
                >
                  <span>Reparatur online anfragen</span>
                  <ArrowRight size={16} />
                </button>
                <span style={{ textAlign: 'center', fontSize: '0.75rem', color: '#64748B', marginTop: '0.45rem', display: 'block' }}>
                  Unverbindlich anfragen - direkt bei der Werkstatt
                </span>
              </div>
            </div>
          ) : null}

          {/* Card 2: Light Support Card */}
          <div style={{
            backgroundColor: '#F8FAFC',
            borderRadius: '20px',
            border: '1px solid #E2E8F0',
            padding: '1.15rem 1.35rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
          }}>
            <h4 style={{ color: '#1B1D1E', fontWeight: 700, fontSize: '0.925rem', marginBottom: '0.2rem' }}>
              Lieber persönlich beraten lassen?
            </h4>
            <p style={{ color: '#64748B', fontSize: '0.78rem', marginBottom: '0.75rem' }}>
              Wir helfen dir, die passende Reparatur zu finden.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.55rem' }}>
              <a
                href={`https://wa.me/41783448888?text=Hallo%20Mobile%20World%2C%20ich%20habe%20eine%20Frage%20zu%20einer%20Reparatur%20f%C3%BCr%20${encodeURIComponent(selectedModel)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '12px',
                  padding: '0.55rem 0.75rem',
                  color: '#1B1D1E',
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  textDecoration: 'none',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                }}
              >
                <MessageSquare size={14} color="#10B981" />
                <span>WhatsApp</span>
              </a>

              <a
                href="tel:+41445436333"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '12px',
                  padding: '0.55rem 0.75rem',
                  color: '#1B1D1E',
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  textDecoration: 'none',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                }}
              >
                <Phone size={14} color="#475569" />
                <span>044 543 63 33</span>
              </a>
            </div>

            <span style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: '0.65rem', display: 'block' }}>
              Preisstand: November 2026
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
