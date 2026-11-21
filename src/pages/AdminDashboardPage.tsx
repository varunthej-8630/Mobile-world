import React, { useState, useEffect } from 'react';
import { mockDb } from '../data/mockDb';
import { 
  Product, 
  RepairPriceRecord, 
  DeviceCategory,
  CustomerEnquiry, 
  PriceAuditLogEntry,
  SubscriptionPlan,
  Contract,
  Order,
  UserAccount,
  InventoryAdjustmentLog
} from '../types';
import { ContractViewModal } from '../components/contract/ContractViewModal';
import {
  Wrench,
  Package,
  Inbox,
  Search,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Edit2,
  DollarSign,
  TrendingDown,
  Layers,
  Save,
  Filter,
  Lock,
  LogOut,
  History,
  Clock,
  ArrowRight,
  ArrowLeft,
  Radio,
  ShoppingBag,
  Users,
  FileText,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Check,
  X,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Truck,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Printer
} from 'lucide-react';

interface AdminDashboardPageProps {
  onNavigate: (path: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  // Staff Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => mockDb.isAdminAuthenticated());
  const [pinInput, setPinInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Active Dashboard Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'products' | 'repairs' | 'subscriptions' | 'orders' | 'customers' | 'contracts'
  >('overview');

  // Local state initialized from mockDb
  const [repairs, setRepairs] = useState<RepairPriceRecord[]>(() => mockDb.getRepairs());
  const [products, setProducts] = useState<Product[]>(() => mockDb.getProducts());
  const [subscriptions, setSubscriptions] = useState<SubscriptionPlan[]>(() => mockDb.getSubscriptions());
  const [orders, setOrders] = useState<Order[]>(() => mockDb.getOrders());
  const [enquiries, setEnquiries] = useState<CustomerEnquiry[]>(() => mockDb.getEnquiries());
  const [customers, setCustomers] = useState<UserAccount[]>(() => mockDb.getCustomers());
  const [contracts, setContracts] = useState<Contract[]>(() => mockDb.getContracts());
  const [auditLogs, setAuditLogs] = useState<PriceAuditLogEntry[]>(() => mockDb.getPriceAuditLog());
  const [inventoryLogs, setInventoryLogs] = useState<InventoryAdjustmentLog[]>(() => mockDb.getInventoryLogs());

  // Search & filter states
  const [repairSearch, setRepairSearch] = useState('');
  const [repairManufacturerFilter, setRepairManufacturerFilter] = useState('all');
  const [productSearch, setProductSearch] = useState('');
  const [productStockFilter, setProductStockFilter] = useState<'all' | 'low' | 'out' | 'in'>('all');
  const [subSearch, setSubSearch] = useState('');
  const [subProviderFilter, setSubProviderFilter] = useState('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [customerSearch, setCustomerSearch] = useState('');
  const [contractSearch, setContractSearch] = useState('');

  // Notifications
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Modals & Drawers
  const [selectedContractForView, setSelectedContractForView] = useState<Contract | null>(null);
  const [isContractGenOpen, setIsContractGenOpen] = useState(false);
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState<Order | null>(null);
  const [selectedCustomerForDetail, setSelectedCustomerForDetail] = useState<UserAccount | null>(null);
  const [isStockAdjustModalOpen, setIsStockAdjustModalOpen] = useState(false);
  const [productForStockAdjust, setProductForStockAdjust] = useState<Product | null>(null);
  const [stockAdjustDelta, setStockAdjustDelta] = useState<number>(0);
  const [stockAdjustReason, setStockAdjustReason] = useState<string>('Wareneingang');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isInventoryLogsModalOpen, setIsInventoryLogsModalOpen] = useState(false);
  const [isAuditLogsModalOpen, setIsAuditLogsModalOpen] = useState(false);
  const [isNewRepairModalOpen, setIsNewRepairModalOpen] = useState(false);
  const [newRepairForm, setNewRepairForm] = useState({
    manufacturer: 'Apple',
    deviceCategory: 'smartphone' as DeviceCategory,
    model: '',
    repairTask: 'Display OEM Original',
    priceChf: 129,
    priceType: 'fixed' as const,
    qualityGrade: 'OEM Original' as const,
    durationEstimate: '30–60 Min (Express)',
    warrantyMonths: 6,
    notes: 'Inkl. 8.1% MwSt. und Express-Einbau vor Ort.',
    supportedBranches: ['Seebach', 'Bellevue', 'Rüti', 'Oberengstringen']
  });

  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [editingSub, setEditingSub] = useState<SubscriptionPlan | null>(null);

  const [isNewCustomerModalOpen, setIsNewCustomerModalOpen] = useState(false);
  const [newCustomerForm, setNewCustomerForm] = useState({
    fullName: '',
    email: '',
    phone: '+41 79 ',
    address: '',
    postalCode: '8052',
    city: 'Zürich'
  });

  // Inline repair price edit
  const [editingRepairId, setEditingRepairId] = useState<string | null>(null);
  const [editPriceChf, setEditPriceChf] = useState<number>(0);

  // Product form state
  const [productForm, setProductForm] = useState({
    name: '',
    brand: '',
    sku: '',
    category: 'accessories' as Product['category'],
    priceChf: 0,
    originalPriceChf: 0,
    quantityOnHand: 1,
    lowStockThreshold: 3,
    description: '',
    condition: 'new' as Product['condition'],
    warrantyMonths: 24,
    imageUrl: '/assets/products/iphone-16-pro.jpg'
  });

  // Subscription form state
  const [subForm, setSubForm] = useState({
    name: '',
    provider: 'Sunrise' as SubscriptionPlan['provider'],
    monthlyPriceChf: 39.00,
    discountPriceChf: 29.90,
    dataAllowance: 'Unlimitiert 5G in CH',
    callsAndSms: 'Unlimitiert in CH',
    roamingAllowance: '1 GB EU / USA',
    speed: 'Bis zu 1 Gbit/s',
    contractDuration: '24 Monate Mindestlaufzeit',
    activationFeeChf: 49.00,
    highlightBadge: '',
    published: true,
    featuresText: 'Highspeed 5G\nKostenlose SIM\nSchweizer Support'
  });

  // Contract generator form state
  const [contractForm, setContractForm] = useState({
    customerSelectId: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    customerCity: '',
    customerPostalCode: '',
    planId: '',
    durationMonths: '24 Monate Mindestlaufzeit',
    notes: 'Inkl. Rufnummernmitnahme und SIM-Ausgabe vor Ort.'
  });

  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setErrorMsg(null);
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  const showError = (msg: string) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(null), 4000);
  };

  const refreshAllData = () => {
    setRepairs([...mockDb.getRepairs()]);
    setProducts([...mockDb.getProducts()]);
    setSubscriptions([...mockDb.getSubscriptions()]);
    setOrders([...mockDb.getOrders()]);
    setEnquiries([...mockDb.getEnquiries()]);
    setCustomers([...mockDb.getCustomers()]);
    setContracts([...mockDb.getContracts()]);
    setAuditLogs([...mockDb.getPriceAuditLog()]);
    setInventoryLogs([...mockDb.getInventoryLogs()]);
  };

  // Staff Login Handler
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (mockDb.verifyAdminAccess(pinInput)) {
      setIsAdminLoggedIn(true);
      setAuthError(null);
      setPinInput('');
      refreshAllData();
      showNotification('Willkommen im Mobile World Administrationsbereich');
    } else {
      setAuthError('Ungültiger Zugangscode oder PIN. (Tipp: 2026 oder admin)');
    }
  };

  const handleAdminLogout = () => {
    mockDb.setAdminSession(false);
    setIsAdminLoggedIn(false);
  };

  // =========================================================================
  // REPAIR ACTIONS
  // =========================================================================
  const handleStartEditRepair = (record: RepairPriceRecord) => {
    setEditingRepairId(record.id);
    setEditPriceChf(record.priceChf);
  };

  const handleSaveRepairPrice = (id: string) => {
    if (isNaN(editPriceChf) || editPriceChf < 0) {
      showError('Bitte einen gültigen positiven CHF-Betrag eingeben.');
      return;
    }
    const success = mockDb.updateRepair(id, { priceChf: editPriceChf }, 'Admin (Filiale Seebach)');
    if (success) {
      setEditingRepairId(null);
      refreshAllData();
      showNotification('Reparaturpreis aktualisiert und im Audit-Log archiviert.');
    } else {
      showError('Fehler beim Speichern des Reparaturpreises.');
    }
  };

  const handleToggleRepairActive = (id: string) => {
    const success = mockDb.toggleRepairActive(id);
    if (success) {
      refreshAllData();
      showNotification('Sichtbarkeitsstatus im Webshop geändert.');
    }
  };

  const handleDeleteRepair = (id: string) => {
    if (window.confirm('Möchten Sie diesen Reparatureintrag wirklich unwiderruflich löschen?')) {
      mockDb.deleteRepair(id);
      refreshAllData();
      showNotification('Reparatureintrag gelöscht.');
    }
  };

  // =========================================================================
  // PRODUCT & INVENTORY ACTIONS
  // =========================================================================
  const handleOpenStockAdjust = (product: Product) => {
    setProductForStockAdjust(product);
    setStockAdjustDelta(0);
    setStockAdjustReason('Wareneingang');
    setIsStockAdjustModalOpen(true);
  };

  const handleExecuteStockAdjust = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForStockAdjust) return;
    if (stockAdjustDelta === 0) {
      showError('Bitte eine positive oder negative Bestandesänderung angeben.');
      return;
    }
    const success = mockDb.adjustStock(
      productForStockAdjust.id,
      stockAdjustDelta,
      stockAdjustReason || 'Manuelle Bestandeskorrektur',
      'Admin (Filiale Seebach)'
    );
    if (success) {
      setIsStockAdjustModalOpen(false);
      setProductForStockAdjust(null);
      refreshAllData();
      showNotification(`Lagerbestand für ${productForStockAdjust.name} angepasst.`);
    } else {
      showError('Fehler bei der Bestandesanpassung.');
    }
  };

  const handleToggleProductActive = (product: Product) => {
    mockDb.updateProduct(product.id, { active: product.active === false ? true : false });
    refreshAllData();
    showNotification(`Produkt ${product.name} ${product.active === false ? 'aktiviert' : 'deaktiviert'}.`);
  };

  const handleOpenCreateProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      brand: 'Apple',
      sku: `PROD-${Date.now().toString().slice(-4)}`,
      category: 'accessories',
      priceChf: 49.00,
      originalPriceChf: 59.00,
      quantityOnHand: 5,
      lowStockThreshold: 3,
      description: '',
      condition: 'new',
      warrantyMonths: 24,
      imageUrl: '/assets/products/iphone-16-pro.jpg'
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      brand: prod.brand,
      sku: prod.sku,
      category: prod.category,
      priceChf: prod.priceChf,
      originalPriceChf: prod.originalPriceChf || prod.priceChf,
      quantityOnHand: prod.quantityOnHand,
      lowStockThreshold: prod.lowStockThreshold,
      description: prod.description || '',
      condition: prod.condition,
      warrantyMonths: prod.warrantyMonths || 24,
      imageUrl: prod.imageUrl || '/assets/products/iphone-16-pro.jpg'
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.sku || productForm.priceChf <= 0) {
      showError('Bitte Name, SKU und einen gültigen Preis angeben.');
      return;
    }

    if (editingProduct) {
      mockDb.updateProduct(editingProduct.id, {
        name: productForm.name,
        brand: productForm.brand,
        sku: productForm.sku,
        category: productForm.category,
        priceChf: Number(productForm.priceChf),
        originalPriceChf: Number(productForm.originalPriceChf),
        lowStockThreshold: Number(productForm.lowStockThreshold),
        description: productForm.description,
        condition: productForm.condition,
        warrantyMonths: Number(productForm.warrantyMonths),
        imageUrl: productForm.imageUrl
      });
      // If quantity was altered in edit form
      if (productForm.quantityOnHand !== editingProduct.quantityOnHand) {
        mockDb.updateProductStock(
          editingProduct.id,
          Number(productForm.quantityOnHand),
          'Korrektur im Produktdialog',
          'Admin'
        );
      }
      showNotification('Produkt erfolgreich aktualisiert.');
    } else {
      mockDb.createProduct({
        name: productForm.name,
        brand: productForm.brand,
        sku: productForm.sku,
        category: productForm.category,
        priceChf: Number(productForm.priceChf),
        originalPriceChf: Number(productForm.originalPriceChf),
        quantityOnHand: Number(productForm.quantityOnHand),
        stockStatus: Number(productForm.quantityOnHand) <= 0 ? 'out_of_stock' : 'in_stock',
        lowStockThreshold: Number(productForm.lowStockThreshold),
        description: productForm.description,
        shortDescription: productForm.description || productForm.name,
        specs: { Garantie: `${productForm.warrantyMonths} Monate`, Zustand: productForm.condition },
        warrantyPeriod: `${productForm.warrantyMonths} Monate Garantie`,
        features: ['24 Monate Garantie', 'Express-Versand / Abholung Seebach'],
        condition: productForm.condition,
        warrantyMonths: Number(productForm.warrantyMonths),
        imageUrl: productForm.imageUrl,
        inStock: Number(productForm.quantityOnHand) > 0,
        active: true
      });
      showNotification('Neues Produkt erfolgreich angelegt und im Katalog publiziert.');
    }

    setIsProductModalOpen(false);
    refreshAllData();
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Möchten Sie dieses Produkt wirklich aus dem Shop löschen?')) {
      mockDb.deleteProduct(id);
      refreshAllData();
      showNotification('Produkt gelöscht.');
    }
  };

  // =========================================================================
  // SUBSCRIPTION ACTIONS
  // =========================================================================
  const handleToggleSubPublished = (id: string) => {
    mockDb.toggleSubscriptionPublished(id);
    refreshAllData();
    showNotification('Abo-Veröffentlichungsstatus im öffentlichen Shop aktualisiert.');
  };

  const handleOpenCreateSub = () => {
    setEditingSub(null);
    setSubForm({
      name: '',
      provider: 'Sunrise',
      monthlyPriceChf: 49.00,
      discountPriceChf: 29.90,
      dataAllowance: 'Unlimitiert 5G in CH',
      callsAndSms: 'Unlimitiert in alle Netze',
      roamingAllowance: '1 GB EU/USA',
      speed: 'Bis zu 1 Gbit/s',
      contractDuration: '24 Monate Mindestlaufzeit',
      activationFeeChf: 49.00,
      highlightBadge: 'Neuheit',
      published: true,
      featuresText: 'Highspeed 5G Netz\nKostenlose eSIM\nVor-Ort Beratung Seebach'
    });
    setIsSubModalOpen(true);
  };

  const handleOpenEditSub = (sub: SubscriptionPlan) => {
    setEditingSub(sub);
    setSubForm({
      name: sub.name,
      provider: sub.provider,
      monthlyPriceChf: sub.monthlyPriceChf,
      discountPriceChf: sub.discountPriceChf || sub.monthlyPriceChf,
      dataAllowance: sub.dataAllowance,
      callsAndSms: sub.callsAndSms,
      roamingAllowance: sub.roamingAllowance,
      speed: sub.speed,
      contractDuration: sub.contractDuration,
      activationFeeChf: sub.activationFeeChf,
      highlightBadge: sub.highlightBadge || '',
      published: sub.published !== false,
      featuresText: sub.features.join('\n')
    });
    setIsSubModalOpen(true);
  };

  const handleSaveSub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subForm.name || subForm.monthlyPriceChf <= 0) {
      showError('Bitte Name und gültigen Monatspreis eingeben.');
      return;
    }
    const features = subForm.featuresText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    if (editingSub) {
      mockDb.updateSubscription(editingSub.id, {
        name: subForm.name,
        provider: subForm.provider,
        monthlyPriceChf: Number(subForm.monthlyPriceChf),
        discountPriceChf: Number(subForm.discountPriceChf),
        dataAllowance: subForm.dataAllowance,
        callsAndSms: subForm.callsAndSms,
        roamingAllowance: subForm.roamingAllowance,
        speed: subForm.speed,
        contractDuration: subForm.contractDuration,
        activationFeeChf: Number(subForm.activationFeeChf),
        highlightBadge: subForm.highlightBadge || undefined,
        published: subForm.published,
        features
      });
      showNotification('Abo-Plan aktualisiert.');
    } else {
      mockDb.createSubscription({
        name: subForm.name,
        provider: subForm.provider,
        monthlyPriceChf: Number(subForm.monthlyPriceChf),
        discountPriceChf: Number(subForm.discountPriceChf),
        dataAllowance: subForm.dataAllowance,
        callsAndSms: subForm.callsAndSms,
        roamingAllowance: subForm.roamingAllowance,
        speed: subForm.speed,
        contractDuration: subForm.contractDuration,
        activationFeeChf: Number(subForm.activationFeeChf),
        highlightBadge: subForm.highlightBadge || undefined,
        published: subForm.published,
        active: true,
        features
      });
      showNotification('Neuer Abo-Plan publiziert.');
    }
    setIsSubModalOpen(false);
    refreshAllData();
  };

  // =========================================================================
  // ORDER ACTIONS & STOCK RESTORATION
  // =========================================================================
  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    mockDb.updateOrderStatus(orderId, status);
    refreshAllData();
    showNotification(`Bestellstatus für Auftrag auf "${status}" aktualisiert.`);
  };

  const handleCancelOrder = (order: Order) => {
    if (window.confirm(`Möchten Sie Bestellung ${order.orderNumber} wirklich stornieren? Der Lagerbestand aller enthaltenen Artikel wird dabei automatisch wiederhergestellt.`)) {
      const success = mockDb.cancelOrder(order.id, 'Stornierung durch Filialleiter');
      if (success) {
        refreshAllData();
        showNotification(`Bestellung ${order.orderNumber} storniert und Lagerbestand wiederhergestellt.`);
        if (selectedOrderForDetail?.id === order.id) {
          setSelectedOrderForDetail(mockDb.getOrderById(order.id) || null);
        }
      }
    }
  };

  // =========================================================================
  // REPAIR CREATION & CUSTOMER CREATION ACTIONS
  // =========================================================================
  const handleCreateRepair = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRepairForm.model.trim() || newRepairForm.priceChf <= 0) {
      showError('Bitte Gerätemodell und einen gültigen Preis eingeben.');
      return;
    }
    mockDb.createRepair({
      manufacturer: newRepairForm.manufacturer,
      deviceCategory: newRepairForm.deviceCategory,
      model: newRepairForm.model.trim(),
      repairTask: newRepairForm.repairTask.trim(),
      priceChf: Number(newRepairForm.priceChf),
      priceType: newRepairForm.priceType,
      qualityGrade: newRepairForm.qualityGrade,
      durationEstimate: newRepairForm.durationEstimate,
      warrantyMonths: Number(newRepairForm.warrantyMonths),
      effectiveDate: new Date().toISOString().split('T')[0],
      active: true,
      notes: newRepairForm.notes,
      supportedBranches: newRepairForm.supportedBranches
    });
    setIsNewRepairModalOpen(false);
    setNewRepairForm({
      manufacturer: 'Apple',
      deviceCategory: 'smartphone',
      model: '',
      repairTask: 'Display OEM Original',
      priceChf: 129,
      priceType: 'fixed',
      qualityGrade: 'OEM Original',
      durationEstimate: '30–60 Min (Express)',
      warrantyMonths: 6,
      notes: 'Inkl. 8.1% MwSt. und Express-Einbau vor Ort.',
      supportedBranches: ['Seebach', 'Bellevue', 'Rüti', 'Oberengstringen']
    });
    refreshAllData();
    showNotification(`Neuer Reparaturpreis für "${newRepairForm.model} - ${newRepairForm.repairTask}" gespeichert.`);
  };

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomerForm.fullName.trim() || !newCustomerForm.email.trim()) {
      showError('Bitte vollständigen Namen und E-Mail-Adresse angeben.');
      return;
    }
    mockDb.createCustomer(newCustomerForm);
    setIsNewCustomerModalOpen(false);
    setNewCustomerForm({
      fullName: '',
      email: '',
      phone: '+41 79 ',
      address: '',
      postalCode: '8052',
      city: 'Zürich'
    });
    refreshAllData();
    showNotification(`Kunde "${newCustomerForm.fullName}" erfolgreich erfasst.`);
  };

  // =========================================================================
  // CONTRACT GENERATOR
  // =========================================================================
  const handleOpenContractGen = (prefillCustomer?: UserAccount) => {
    const defaultCust = prefillCustomer || customers[0];
    const defaultPlan = subscriptions[0];
    setContractForm({
      customerSelectId: defaultCust?.id || '',
      customerName: defaultCust?.fullName || 'Sandra Meier',
      customerEmail: defaultCust?.email || 'sandra.meier@gmail.com',
      customerPhone: defaultCust?.phone || '+41 78 889 01 23',
      customerAddress: defaultCust?.address || 'Schaffhauserstrasse 120',
      customerCity: defaultCust?.city || 'Zürich',
      customerPostalCode: defaultCust?.postalCode || '8052',
      planId: defaultPlan?.id || '',
      durationMonths: '24 Monate Mindestlaufzeit (Aktionspreis)',
      notes: 'Inkl. Rufnummernportierung und SIM-Kartenausgabe im Shop Zürich Seebach.'
    });
    setIsContractGenOpen(true);
  };

  const handleCustomerSelectChange = (custId: string) => {
    const cust = customers.find(c => c.id === custId);
    if (cust) {
      setContractForm(prev => ({
        ...prev,
        customerSelectId: cust.id,
        customerName: cust.fullName,
        customerEmail: cust.email,
        customerPhone: cust.phone || '+41 79 123 45 67',
        customerAddress: cust.address || 'Bahnhofstrasse 10',
        customerCity: cust.city || 'Zürich',
        customerPostalCode: cust.postalCode || '8001'
      }));
    }
  };

  const handleGenerateContractSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contractForm.customerName || !contractForm.customerEmail || !contractForm.planId) {
      showError('Bitte Kunde und Abo-Tarif auswählen.');
      return;
    }
    const contract = mockDb.generateContract({
      customerName: contractForm.customerName,
      customerEmail: contractForm.customerEmail,
      customerPhone: contractForm.customerPhone,
      customerAddress: contractForm.customerAddress,
      customerCity: contractForm.customerCity,
      customerPostalCode: contractForm.customerPostalCode,
      planId: contractForm.planId,
      durationMonths: contractForm.durationMonths,
      notes: contractForm.notes
    });

    setIsContractGenOpen(false);
    refreshAllData();
    showNotification(`Vertrag ${contract.contractNumber} erfolgreich generiert.`);
    setSelectedContractForView(contract);
  };

  // =========================================================================
  // VIEW: STAFF LOGIN WALL
  // =========================================================================
  if (!isAdminLoggedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        background: 'radial-gradient(ellipse 90% 65% at 50% -10%, #EDE9FE 0%, #F8FAFC 55%, #F1F5F9 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Ambient background glow ring */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '560px',
          height: '380px',
          background: 'radial-gradient(circle, rgba(73, 40, 253, 0.08) 0%, rgba(237, 233, 254, 0.4) 60%, transparent 80%)',
          pointerEvents: 'none',
          filter: 'blur(50px)'
        }} />

        <div style={{
          maxWidth: '440px',
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: '28px',
          border: '1.5px solid #E2E8F0',
          padding: 'clamp(2rem, 5vw, 2.75rem)',
          boxShadow: '0 24px 60px rgba(16, 19, 24, 0.08), 0 4px 16px rgba(0, 0, 0, 0.02)',
          position: 'relative',
          zIndex: 10
        }}>
          {/* Header & Official Brand Logo */}
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <a 
              href="#/"
              onClick={(e) => { e.preventDefault(); onNavigate('/'); }}
              style={{ display: 'inline-block', marginBottom: '1.15rem', cursor: 'pointer', textDecoration: 'none' }}
            >
              <img
                src="/assets/mobile-world-official-logo.png"
                alt="Mobile World"
                style={{ height: '38px', margin: '0 auto', display: 'block', objectFit: 'contain' }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/mw-logo.png';
                }}
              />
            </a>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              backgroundColor: '#F3E8FF',
              color: '#7E22CE',
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              fontSize: '0.78rem',
              fontWeight: 700,
              marginBottom: '0.85rem',
              border: '1px solid #E9D7FE'
            }}>
              <Lock size={13} color="#7E22CE" />
              <span>GESCHÜTZTER MITARBEITER-ZUGANG</span>
            </div>

            <h2 style={{
              fontSize: '1.65rem',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              color: '#1B1D1E',
              letterSpacing: '-0.02em',
              marginBottom: '0.35rem'
            }}>
              Mobile World Backoffice
            </h2>
            <p style={{ color: '#64748B', fontSize: '0.875rem', lineHeight: 1.5 }}>
              Administration &amp; Werkstattbereich Filiale Zürich Seebach
            </p>
          </div>

          {authError && (
            <div style={{
              marginBottom: '1.25rem',
              padding: '0.75rem 0.95rem',
              backgroundColor: '#FEF2F2',
              border: '1px solid #FECACA',
              color: '#B91C1C',
              fontSize: '0.825rem',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <AlertCircle size={16} color="#DC2626" style={{ flexShrink: 0 }} />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin}>
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#334155',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Mitarbeiter-PIN / Passwort
                </label>
                <button
                  type="button"
                  onClick={() => setPinInput('2026')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#4928FD',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  PIN: 2026 einfügen
                </button>
              </div>

              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94A3B8',
                  display: 'flex',
                  alignItems: 'center',
                  pointerEvents: 'none'
                }}>
                  <Lock size={16} />
                </div>

                <input
                  type={showPassword ? 'text' : 'password'}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Passwort oder Staff-PIN eingeben"
                  style={{
                    width: '100%',
                    height: '48px',
                    padding: '0 44px 0 40px',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid #CBD5E1',
                    borderRadius: '14px',
                    fontSize: '0.95rem',
                    color: '#1B1D1E',
                    outline: 'none',
                    transition: 'border-color 160ms ease, box-shadow 160ms ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#4928FD';
                    e.target.style.boxShadow = '0 0 0 3px rgba(73, 40, 253, 0.12)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#CBD5E1';
                    e.target.style.boxShadow = 'none';
                  }}
                  autoFocus
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#94A3B8',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  aria-label={showPassword ? 'Passwort verbergen' : 'Passwort anzeigen'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                height: '50px',
                backgroundColor: '#4928FD',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '14px',
                fontSize: '0.95rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.65rem',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(73, 40, 253, 0.35)',
                transition: 'transform 160ms ease, background-color 160ms ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3E22D7'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4928FD'}
            >
              <ShieldCheck size={18} />
              <span>Anmelden &amp; Dashboard öffnen</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Footer Navigation & Security Note */}
          <div style={{
            marginTop: '1.75rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid #F1F5F9',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.45rem',
              fontSize: '0.78rem',
              color: '#64748B',
              marginBottom: '1rem'
            }}>
              <ShieldCheck size={14} color="#10B981" />
              <span>Geschützter 256-Bit SSL-Zugang für autorisierte Mitarbeitende</span>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('/')}
              style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                padding: '0.6rem 1.15rem',
                color: '#4928FD',
                fontSize: '0.825rem',
                fontWeight: 700,
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                transition: 'all 160ms ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F5F3FF';
                e.currentTarget.style.borderColor = '#C4B5FD';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F8FAFC';
                e.currentTarget.style.borderColor = '#E2E8F0';
              }}
            >
              <ArrowLeft size={14} />
              <span>Zurück zur Startseite</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: AUTHENTICATED ADMIN PORTAL
  // =========================================================================

  // Computed KPI metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus !== 'refunded' ? o.grandTotalChf : 0), 0);
  const pendingRepairs = enquiries.filter(e => e.type === 'repair' && e.status !== 'completed' && e.status !== 'cancelled').length;
  const pendingSubs = enquiries.filter(e => e.type === 'subscription' && e.status !== 'completed' && e.status !== 'cancelled').length;
  const lowStockCount = products.filter(p => p.stockStatus === 'low_stock').length;
  const outOfStockCount = products.filter(p => p.stockStatus === 'out_of_stock' || p.quantityOnHand <= 0).length;

  // Filtered lists
  const filteredRepairs = repairs.filter(r => {
    const matchesSearch = repairSearch === '' || 
      r.model.toLowerCase().includes(repairSearch.toLowerCase()) ||
      r.repairTask.toLowerCase().includes(repairSearch.toLowerCase()) ||
      r.manufacturer.toLowerCase().includes(repairSearch.toLowerCase());
    const matchesMfr = repairManufacturerFilter === 'all' || r.manufacturer.toLowerCase() === repairManufacturerFilter.toLowerCase();
    return matchesSearch && matchesMfr;
  });

  const filteredProducts = products.filter(p => {
    const matchesSearch = productSearch === '' ||
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(productSearch.toLowerCase());
    const matchesStock = productStockFilter === 'all' ||
      (productStockFilter === 'low' && p.stockStatus === 'low_stock') ||
      (productStockFilter === 'out' && (p.stockStatus === 'out_of_stock' || p.quantityOnHand <= 0)) ||
      (productStockFilter === 'in' && p.stockStatus === 'in_stock');
    return matchesSearch && matchesStock;
  });

  const filteredSubs = subscriptions.filter(s => {
    const matchesSearch = subSearch === '' ||
      s.name.toLowerCase().includes(subSearch.toLowerCase()) ||
      s.provider.toLowerCase().includes(subSearch.toLowerCase());
    const matchesProv = subProviderFilter === 'all' || s.provider.toLowerCase() === subProviderFilter.toLowerCase();
    return matchesSearch && matchesProv;
  });

  const filteredOrders = orders.filter(o => {
    const matchesSearch = orderSearch === '' ||
      o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(orderSearch.toLowerCase());
    const matchesStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredCustomers = customers.filter(c => {
    return customerSearch === '' ||
      c.fullName.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.email.toLowerCase().includes(customerSearch.toLowerCase()) ||
      (c.city && c.city.toLowerCase().includes(customerSearch.toLowerCase()));
  });

  const filteredContracts = contracts.filter(c => {
    return contractSearch === '' ||
      c.contractNumber.toLowerCase().includes(contractSearch.toLowerCase()) ||
      c.customerName.toLowerCase().includes(contractSearch.toLowerCase()) ||
      c.planName.toLowerCase().includes(contractSearch.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1B1D1E] antialiased pb-20 font-sans" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* Top Admin Bar */}
      <div style={{ backgroundColor: '#121417', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }} className="text-white sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-xl tracking-tight text-white font-heading">MOBILE WORLD</span>
            <span className="px-3 py-1 bg-[#4928FD]/20 text-[#A5B4FC] border border-[#4928FD]/40 rounded-full text-xs font-bold uppercase tracking-wider">
              Admin Portal · Filiale Seebach
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-400 hidden md:inline">
              Eingeloggt als: <strong className="text-slate-200">Geschäftsleitung / Staff</strong>
            </span>
            <button
              onClick={() => onNavigate('/')}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.28)',
                borderRadius: '9999px',
                padding: '0.4rem 0.9rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
                transition: 'all 180ms ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'}
            >
              <ExternalLink className="w-3.5 h-3.5" style={{ color: '#FFFFFF' }} />
              <span style={{ color: '#FFFFFF' }}>Zum Webshop</span>
            </button>
            <button
              onClick={handleAdminLogout}
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.22)',
                color: '#FCA5A5',
                border: '1px solid rgba(239, 68, 68, 0.45)',
                borderRadius: '9999px',
                padding: '0.4rem 0.9rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
                transition: 'all 180ms ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.35)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.22)'}
            >
              <LogOut className="w-3.5 h-3.5" style={{ color: '#FCA5A5' }} />
              <span style={{ color: '#FCA5A5' }}>Abmelden</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation (Capsule Pill Track) */}
        <div className="container mx-auto px-4 pb-2.5 pt-0.5 flex gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: 'Dashboard Übersicht', icon: Layers },
            { id: 'products', label: `Produkte & Lager (${products.length})`, icon: Package },
            { id: 'repairs', label: `Reparaturpreise (${repairs.length})`, icon: Wrench },
            { id: 'subscriptions', label: `Abo-Tarife (${subscriptions.length})`, icon: Radio },
            { id: 'orders', label: `Bestellungen (${orders.length})`, icon: ShoppingBag },
            { id: 'customers', label: `Kundenkartei (${customers.length})`, icon: Users },
            { id: 'contracts', label: `Verträge & PDF (${contracts.length})`, icon: FileText }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.45rem 1.15rem',
                  borderRadius: '9999px',
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  backgroundColor: isActive ? '#4928FD' : 'rgba(255, 255, 255, 0.05)',
                  color: isActive ? '#FFFFFF' : '#94A3B8',
                  border: isActive ? '1px solid #4928FD' : '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: isActive ? '0 4px 14px rgba(73, 40, 253, 0.35)' : 'none',
                  transition: 'all 180ms ease'
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Global Notifications */}
      {successMsg && (
        <div className="container mx-auto px-4 mt-4">
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-xl flex items-center justify-between text-sm shadow-sm animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
            <button onClick={() => setSuccessMsg(null)} className="text-emerald-700 hover:text-emerald-900">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="container mx-auto px-4 mt-4">
          <div className="bg-rose-50 border border-rose-300 text-rose-800 px-4 py-3 rounded-xl flex items-center justify-between text-sm shadow-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <button onClick={() => setErrorMsg(null)} className="text-rose-700 hover:text-rose-900">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Tab Views */}
      <main className="container mx-auto px-4 py-6">
        {/* ===================================================================
            TAB 1: OVERVIEW & KPIS
           =================================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Summary Cards with Guaranteed High Contrast & 20px Gaps */}
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
              style={{ display: 'grid', gap: '1.25rem' }}
            >
              <div 
                style={{
                  backgroundColor: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  borderRadius: '20px',
                  padding: '1.25rem',
                  boxShadow: '0 4px 16px rgba(73, 40, 253, 0.05)'
                }}
                className="flex flex-col justify-between"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">Shop-Umsatz CHF</span>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-[#1B1D1E] tabular-nums">
                    CHF {totalRevenue.toFixed(2)}
                  </span>
                  <span className="text-xs text-emerald-600 font-semibold">{orders.length} Aufträge</span>
                </div>
              </div>

              <div 
                style={{
                  backgroundColor: '#FFF7ED',
                  border: '1px solid #FED7AA',
                  borderRadius: '20px',
                  padding: '1.25rem',
                  boxShadow: '0 4px 16px rgba(255, 175, 104, 0.06)'
                }}
                className="flex flex-col justify-between"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-[#C2410C]">Pendente Reparaturen</span>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-[#1B1D1E] tabular-nums">
                    {pendingRepairs}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">In Werkstatt</span>
                </div>
              </div>

              <div 
                style={{
                  backgroundColor: '#F7F0FE',
                  border: '1px solid #E9D7FE',
                  borderRadius: '20px',
                  padding: '1.25rem',
                  boxShadow: '0 4px 16px rgba(186, 129, 238, 0.06)'
                }}
                className="flex flex-col justify-between"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-[#7E22CE]">Abo-Anfragen</span>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-[#1B1D1E] tabular-nums">
                    {pendingSubs}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Offen</span>
                </div>
              </div>

              <div 
                style={{
                  backgroundColor: '#F0FDF4',
                  border: '1px solid #BBF7D0',
                  borderRadius: '20px',
                  padding: '1.25rem',
                  boxShadow: '0 4px 16px rgba(121, 212, 94, 0.06)'
                }}
                className="flex flex-col justify-between"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-[#15803D]">Kundenkartei</span>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-[#1B1D1E] tabular-nums">
                    {customers.length}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Registriert</span>
                </div>
              </div>

              <div 
                style={{
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FECACA',
                  borderRadius: '20px',
                  padding: '1.25rem',
                  boxShadow: '0 4px 16px rgba(239, 68, 68, 0.06)'
                }}
                className="flex flex-col justify-between"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-[#B91C1C]">Lager-Status</span>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-[#1B1D1E] tabular-nums">
                    {outOfStockCount + lowStockCount}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {outOfStockCount} Ausv. · {lowStockCount} Tief
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions Row */}
            <div 
              style={{
                backgroundColor: '#121417',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '24px',
                padding: '1.75rem',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.15)'
              }}
              className="text-white flex flex-wrap items-center justify-between gap-4"
            >
              <div>
                <h3 className="text-lg font-bold font-heading">Schnellaktionen für Filiale Seebach</h3>
                <p className="text-xs text-[#94A3B8]">
                  Preise, Artikel und Verträge sofort live mit dem öffentlichen Webshop synchronisieren.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={handleOpenCreateProduct}
                  style={{ borderRadius: '9999px', padding: '0.5rem 1.25rem', backgroundColor: '#4928FD', color: '#FFFFFF', border: '1px solid #4928FD' }}
                  className="btn btn-sm hover:opacity-90 transition-opacity"
                >
                  <Plus className="w-4 h-4" />
                  <span>Neues Produkt anlegen</span>
                </button>
                <button
                  onClick={() => { setActiveTab('repairs'); setIsNewRepairModalOpen(true); }}
                  style={{ borderRadius: '9999px', padding: '0.5rem 1.25rem', backgroundColor: 'rgba(255, 255, 255, 0.08)', color: '#FFFFFF', border: '1px solid rgba(255, 255, 255, 0.15)' }}
                  className="btn btn-sm hover:bg-white/20 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Reparaturpreis erfassen</span>
                </button>
                <button
                  onClick={handleOpenCreateSub}
                  style={{ borderRadius: '9999px', padding: '0.5rem 1.25rem', backgroundColor: 'rgba(255, 255, 255, 0.08)', color: '#FFFFFF', border: '1px solid rgba(255, 255, 255, 0.15)' }}
                  className="btn btn-sm hover:bg-white/20 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Abo-Plan hinzufügen</span>
                </button>
                <button
                  onClick={() => handleOpenContractGen()}
                  style={{ borderRadius: '9999px', padding: '0.5rem 1.25rem', backgroundColor: '#059669', color: '#FFFFFF', border: '1px solid #059669' }}
                  className="btn btn-sm hover:opacity-90 transition-opacity"
                >
                  <FileText className="w-4 h-4" />
                  <span>Neuen Vertrag erstellen</span>
                </button>
              </div>
            </div>

            {/* 2-Column: Recent Orders & Recent Customer Enquiries */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-blue-600" />
                    <span>Letzte Shop-Bestellungen</span>
                  </h4>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                  >
                    <span>Alle anzeigen</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {orders.slice(0, 4).map(o => (
                    <div
                      key={o.id}
                      onClick={() => setSelectedOrderForDetail(o)}
                      className="p-3.5 rounded-xl border border-slate-100 hover:border-blue-200 bg-slate-50/50 hover:bg-blue-50/20 transition-all cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[#1B1D1E] tracking-tight">{o.orderNumber}</span>
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            o.status === 'ready_for_pickup' ? 'bg-amber-100 text-amber-800' :
                            o.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            o.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                            o.status === 'cancelled' ? 'bg-rose-100 text-rose-800' :
                            'bg-slate-200 text-slate-700'
                          }`}>
                            {o.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          {o.customerName} · {o.items.length} Position(en) · {o.deliveryMethod === 'pickup' ? 'Abholung Seebach' : 'Postversand'}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-sm text-[#1B1D1E] tabular-nums">
                          CHF {o.grandTotalChf.toFixed(2)}
                        </span>
                        <span className="block text-[10px] text-slate-400">{o.createdAt.slice(0, 10)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Enquiries */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <Inbox className="w-4 h-4 text-blue-600" />
                    <span>Aktuelle Kundenanfragen</span>
                  </h4>
                  <span className="text-xs text-slate-400">{enquiries.length} eingegangen</span>
                </div>

                <div className="space-y-3">
                  {enquiries.slice(0, 4).map(e => (
                    <div
                      key={e.id}
                      className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col gap-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            e.type === 'repair' ? 'bg-indigo-100 text-indigo-800' : 'bg-cyan-100 text-cyan-800'
                          }`}>
                            {e.type === 'repair' ? 'Reparatur' : 'Abonnement'}
                          </span>
                          <span className="font-semibold text-xs text-slate-900">{e.customerName}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{e.createdAt}</span>
                      </div>
                      <p className="text-xs text-slate-600 italic">"{e.message}"</p>
                      <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px] text-slate-500">
                        <span>Kontakt: {e.phone}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium">Status:</span>
                          <select
                            value={e.status}
                            onChange={(evt) => {
                              mockDb.updateEnquiryStatus(e.id, evt.target.value as any);
                              refreshAllData();
                              showNotification('Anfragestatus aktualisiert.');
                            }}
                            className="bg-white border border-slate-200 rounded px-1.5 py-0.5 text-xs text-slate-800"
                          >
                            <option value="new">Neu</option>
                            <option value="in_progress">In Bearbeitung</option>
                            <option value="completed">Erledigt</option>
                            <option value="cancelled">Storniert</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 2: PRODUCTS & INVENTORY CONTROL
           =================================================================== */}
        {activeTab === 'products' && (
          <div className="space-y-5">
            {/* Header Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Suche nach Name, SKU, Marke..."
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <select
                  value={productStockFilter}
                  onChange={(e) => setProductStockFilter(e.target.value as any)}
                  className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="all">Alle Bestände</option>
                  <option value="in">Verfügbar (An Lager)</option>
                  <option value="low">Tiefer Bestand</option>
                  <option value="out">Ausverkauft (0 Stk)</option>
                </select>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <button
                  onClick={() => setIsInventoryLogsModalOpen(true)}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <History className="w-4 h-4" />
                  <span>Bestandeshistorie ({inventoryLogs.length})</span>
                </button>
                <button
                  onClick={handleOpenCreateProduct}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Neues Produkt</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="py-3 px-4">SKU / ID</th>
                      <th className="py-3 px-4">Artikel / Marke</th>
                      <th className="py-3 px-4">Kategorie</th>
                      <th className="py-3 px-4 text-right">Verkaufspreis</th>
                      <th className="py-3 px-4 text-center">Lagerbestand</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-center">Shop-Status</th>
                      <th className="py-3 px-4 text-right">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.map(p => {
                      const isOut = p.quantityOnHand <= 0;
                      const isLow = p.quantityOnHand > 0 && p.quantityOnHand <= p.lowStockThreshold;
                      return (
                        <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 px-4 font-semibold text-xs text-slate-700 tracking-tight">{p.sku}</td>
                          <td className="py-3 px-4">
                            <span className="font-bold text-slate-900 block">{p.name}</span>
                            <span className="text-[11px] text-slate-400">{p.brand} · {p.condition}</span>
                          </td>
                          <td className="py-3 px-4 text-slate-600 capitalize">{p.category}</td>
                          <td className="py-3 px-4 text-right font-bold text-sm text-[#1B1D1E] tabular-nums">
                            CHF {p.priceChf.toFixed(2)}
                          </td>
                          <td className="py-3 px-4 text-center font-bold text-xs tabular-nums">
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              isOut ? 'bg-rose-100 text-rose-800' :
                              isLow ? 'bg-amber-100 text-amber-800' :
                              'bg-emerald-100 text-emerald-800'
                            }`}>
                              {p.quantityOnHand} Stk.
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                              isOut ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                              isLow ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                              'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}>
                              {isOut ? 'Ausverkauft' : isLow ? 'Knapp' : 'An Lager'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => handleToggleProductActive(p)}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors ${
                                p.active !== false
                                  ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                              }`}
                            >
                              {p.active !== false ? 'Aktiv / Live' : 'Inaktiv (Ausgeblendet)'}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleOpenStockAdjust(p)}
                                className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded text-[11px] font-semibold transition-colors"
                                title="Bestand anpassen"
                              >
                                Bestand +/-
                              </button>
                              <button
                                onClick={() => handleOpenEditProduct(p)}
                                className="p-1 text-slate-600 hover:text-blue-600 transition-colors"
                                title="Bearbeiten"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                                title="Löschen"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 3: REPAIR PRICES & AUDIT LOG
           =================================================================== */}
        {activeTab === 'repairs' && (
          <div className="space-y-5">
            {/* Header Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={repairSearch}
                    onChange={(e) => setRepairSearch(e.target.value)}
                    placeholder="Suche Modell, Reparaturtask..."
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <select
                  value={repairManufacturerFilter}
                  onChange={(e) => setRepairManufacturerFilter(e.target.value)}
                  className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 capitalize"
                >
                  <option value="all">Alle 11 Hersteller</option>
                  <option value="apple">Apple</option>
                  <option value="samsung">Samsung</option>
                  <option value="google">Google</option>
                  <option value="huawei">Huawei</option>
                  <option value="xiaomi">Xiaomi</option>
                  <option value="nokia">Nokia</option>
                  <option value="htc">HTC</option>
                  <option value="honor">Honor</option>
                  <option value="sony">Sony</option>
                  <option value="lg">LG</option>
                  <option value="oneplus">OnePlus</option>
                </select>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <button
                  onClick={() => setIsAuditLogsModalOpen(true)}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <History className="w-4 h-4" />
                  <span>Preis-Auditlog ({auditLogs.length})</span>
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Katalog auf die Standard-Preise zurücksetzen?')) {
                      mockDb.resetRepairs();
                      refreshAllData();
                      showNotification('Reparaturkatalog zurückgesetzt.');
                    }
                  }}
                  className="px-3 py-2 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold transition-colors"
                  title="Auf Werkseinstellung zurücksetzen"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsNewRepairModalOpen(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Neuer Reparaturpreis</span>
                </button>
              </div>
            </div>

            {/* Repair Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="py-3 px-4">Hersteller / Modell</th>
                      <th className="py-3 px-4">Kategorie / Qualität</th>
                      <th className="py-3 px-4">Reparatur-Einsatz</th>
                      <th className="py-3 px-4 text-right">Fixpreis (CHF)</th>
                      <th className="py-3 px-4 text-center">Dauer</th>
                      <th className="py-3 px-4 text-center">Garantie</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-right">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredRepairs.map(r => {
                      const isEditing = editingRepairId === r.id;
                      return (
                        <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 px-4">
                            <span className="font-bold text-slate-900 block">{r.model}</span>
                            <span className="text-[11px] text-slate-400">{r.manufacturer}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-slate-700 block capitalize">{r.deviceCategory}</span>
                            <span className="text-[10px] text-blue-600 font-semibold">{r.qualityGrade || 'Standard'}</span>
                          </td>
                          <td className="py-3 px-4 font-semibold text-slate-800">{r.repairTask}</td>
                          <td className="py-3 px-4 text-right font-bold text-sm text-[#1B1D1E] tabular-nums">
                            {isEditing ? (
                              <div className="flex items-center justify-end gap-1">
                                <span className="text-slate-400">CHF</span>
                                <input
                                  type="number"
                                  value={editPriceChf}
                                  onChange={(e) => setEditPriceChf(parseFloat(e.target.value) || 0)}
                                  className="w-20 px-2 py-1 border border-blue-500 rounded font-bold text-right text-xs focus:outline-none"
                                  autoFocus
                                />
                              </div>
                            ) : (
                              <span className="font-bold text-slate-900">CHF {r.priceChf}.-</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center text-slate-600">{r.durationEstimate}</td>
                          <td className="py-3 px-4 text-center">
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full font-bold text-[10px]">
                              {r.warrantyMonths} Monate
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => handleToggleRepairActive(r.id)}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors ${
                                r.active !== false
                                  ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                              }`}
                            >
                              {r.active !== false ? 'Aktiv (Im Shop)' : 'Deaktiviert'}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {isEditing ? (
                                <>
                                  <button
                                    onClick={() => handleSaveRepairPrice(r.id)}
                                    className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded transition-colors"
                                    title="Speichern"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => setEditingRepairId(null)}
                                    className="p-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded transition-colors"
                                    title="Abbrechen"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => handleStartEditRepair(r)}
                                    className="p-1.5 text-slate-600 hover:text-blue-600 transition-colors"
                                    title="Preis ändern"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteRepair(r.id)}
                                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                                    title="Löschen"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 4: SUBSCRIPTIONS MANAGEMENT
           =================================================================== */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-5">
            {/* Header Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={subSearch}
                    onChange={(e) => setSubSearch(e.target.value)}
                    placeholder="Suche Tarif oder Provider..."
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <select
                  value={subProviderFilter}
                  onChange={(e) => setSubProviderFilter(e.target.value)}
                  className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="all">Alle Provider</option>
                  <option value="sunrise">Sunrise</option>
                  <option value="salt">Salt</option>
                  <option value="yallo">yallo</option>
                  <option value="lebara">LEBARA</option>
                  <option value="mobile world care">Mobile World Care</option>
                </select>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <button
                  onClick={() => {
                    if (window.confirm('Abo-Tarife auf Standard zurücksetzen?')) {
                      mockDb.resetSubscriptions();
                      refreshAllData();
                      showNotification('Abo-Tarife zurückgesetzt.');
                    }
                  }}
                  className="px-3 py-2 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleOpenCreateSub}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Neuer Abo-Tarif</span>
                </button>
              </div>
            </div>

            {/* Subscriptions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredSubs.map(s => (
                <div
                  key={s.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between hover:border-blue-300 transition-all"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {s.provider}
                      </span>
                      <button
                        onClick={() => handleToggleSubPublished(s.id)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors ${
                          s.published !== false
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                        title="Im öffentlichen Vergleich ein-/ausblenden"
                      >
                        {s.published !== false ? 'Live im Webshop' : 'Entwurf (Ausgeblendet)'}
                      </button>
                    </div>

                    <h4 className="font-bold text-slate-900 text-base mb-1">{s.name}</h4>
                    {s.highlightBadge && (
                      <span className="text-[10px] text-blue-600 font-semibold block mb-2">
                        ★ {s.highlightBadge}
                      </span>
                    )}

                    <div className="my-3 py-2 border-y border-slate-100 flex items-baseline gap-2">
                      <span className="text-2xl font-bold font-heading text-slate-900 tabular-nums">
                        CHF {(s.discountPriceChf ?? s.monthlyPriceChf).toFixed(2)}
                      </span>
                      <span className="text-xs text-slate-400">/ Monat</span>
                      {s.discountPriceChf && (
                        <span className="text-xs text-slate-400 line-through">
                          CHF {s.monthlyPriceChf.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <ul className="text-xs text-slate-600 space-y-1 mb-4">
                      <li>• {s.dataAllowance}</li>
                      <li>• {s.callsAndSms}</li>
                      <li>• {s.roamingAllowance}</li>
                      <li>• Laufzeit: {s.contractDuration}</li>
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      onClick={() => handleOpenContractGen()}
                      className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Vertrag generieren</span>
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditSub(s)}
                        className="px-2.5 py-1 text-slate-600 hover:text-blue-600 font-semibold"
                      >
                        Bearbeiten
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 5: ORDERS & FULFILLMENT
           =================================================================== */}
        {activeTab === 'orders' && (
          <div className="space-y-5">
            {/* Header Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="Bestell-Nr, Kunde, E-Mail..."
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="all">Alle Bestellstatus</option>
                  <option value="received">Eingegangen</option>
                  <option value="processing">In Bearbeitung</option>
                  <option value="ready_for_pickup">Bereit zur Abholung (Seebach)</option>
                  <option value="shipped">Versendet</option>
                  <option value="completed">Abgeschlossen</option>
                  <option value="cancelled">Storniert</option>
                </select>
              </div>

              <span className="text-xs text-slate-500">
                Zeigt <strong>{filteredOrders.length}</strong> Bestellungen
              </span>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="py-3 px-4">Bestell-Nr. / Datum</th>
                      <th className="py-3 px-4">Kunde &amp; Kontakt</th>
                      <th className="py-3 px-4">Lieferart</th>
                      <th className="py-3 px-4 text-right">Gesamtbetrag</th>
                      <th className="py-3 px-4 text-center">Zahlung</th>
                      <th className="py-3 px-4 text-center">Auftragsstatus</th>
                      <th className="py-3 px-4 text-right">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredOrders.map(o => (
                      <tr key={o.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4">
                          <span className="font-bold text-xs text-[#1B1D1E] tracking-tight block">{o.orderNumber}</span>
                          <span className="text-[11px] text-slate-400">{o.createdAt}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-slate-900 block">{o.customerName}</span>
                          <span className="text-[11px] text-slate-500">{o.customerEmail} · {o.customerPhone}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                            {o.deliveryMethod === 'pickup' ? 'Abholung Seebach' : 'PostPac Priority'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-sm text-[#1B1D1E] tabular-nums">
                          CHF {o.grandTotalChf.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            o.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' :
                            o.paymentStatus === 'refunded' ? 'bg-rose-100 text-rose-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {o.paymentStatus || 'offen'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <select
                            value={o.status}
                            disabled={o.status === 'cancelled'}
                            onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value as any)}
                            className="bg-white border border-slate-200 rounded px-2 py-1 text-xs font-semibold text-slate-800 focus:outline-none"
                          >
                            <option value="received">Eingegangen</option>
                            <option value="processing">In Bearbeitung</option>
                            <option value="ready_for_pickup">Bereit zur Abholung</option>
                            <option value="shipped">Versendet</option>
                            <option value="completed">Abgeschlossen</option>
                            <option value="cancelled">Storniert</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedOrderForDetail(o)}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-semibold transition-colors"
                            >
                              Details
                            </button>
                            {o.status !== 'cancelled' && (
                              <button
                                onClick={() => handleCancelOrder(o)}
                                className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded text-[11px] font-semibold transition-colors"
                                title="Bestellung stornieren & Lagerbestand wiederherstellen"
                              >
                                Stornieren
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 6: CUSTOMER DIRECTORY
           =================================================================== */}
        {activeTab === 'customers' && (
          <div className="space-y-5">
            {/* Header Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="relative flex-1 md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  placeholder="Suche nach Name, E-Mail, Ortschaft..."
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">
                  <strong>{filteredCustomers.length}</strong> Kunden in der Kartei geführt
                </span>
                <button
                  onClick={() => setIsNewCustomerModalOpen(true)}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Neuer Kunde erfassen</span>
                </button>
              </div>
            </div>

            {/* Customers Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="py-3 px-4">Kundenname</th>
                      <th className="py-3 px-4">E-Mail / Telefon</th>
                      <th className="py-3 px-4">Adresse / Wohnort</th>
                      <th className="py-3 px-4 text-center">Registriert seit</th>
                      <th className="py-3 px-4 text-center">Aktivität</th>
                      <th className="py-3 px-4 text-right">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCustomers.map(c => {
                      const custOrders = orders.filter(o => o.customerEmail.toLowerCase() === c.email.toLowerCase());
                      const custContracts = contracts.filter(ctr => ctr.customerEmail.toLowerCase() === c.email.toLowerCase());
                      return (
                        <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 px-4">
                            <span className="font-bold text-slate-900 block">{c.fullName}</span>
                            <span className="text-[10px] text-slate-400 font-semibold">{c.id}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-slate-800 block">{c.email}</span>
                            <span className="text-[11px] text-slate-500">{c.phone}</span>
                          </td>
                          <td className="py-3 px-4 text-slate-600">
                            {c.address ? `${c.address}, ${c.postalCode} ${c.city}` : 'Keine Adresse hinterlegt'}
                          </td>
                          <td className="py-3 px-4 text-center text-slate-500">
                            {c.registeredAt || '2026-10-01'}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[10px] font-semibold">
                              {custOrders.length} Bestellung(en) · {custContracts.length} Vertrag
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedCustomerForDetail(c)}
                                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-semibold transition-colors"
                              >
                                Kundenakte
                              </button>
                              <button
                                onClick={() => handleOpenContractGen(c)}
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-semibold transition-colors flex items-center gap-1"
                              >
                                <FileText className="w-3 h-3" />
                                <span>Vertrag</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 7: CONTRACT MANAGEMENT & PDF GENERATOR
           =================================================================== */}
        {activeTab === 'contracts' && (
          <div className="space-y-5">
            {/* Header Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="relative flex-1 md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={contractSearch}
                  onChange={(e) => setContractSearch(e.target.value)}
                  placeholder="Vertragsnummer, Kunde, Tarif..."
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenContractGen()}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Neuen Vertrag erstellen</span>
                </button>
              </div>
            </div>

            {/* Contracts Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="py-3 px-4">Vertrags-Nr. / Datum</th>
                      <th className="py-3 px-4">Kunde</th>
                      <th className="py-3 px-4">Provider &amp; Tarif</th>
                      <th className="py-3 px-4 text-right">Monatspreis (CHF)</th>
                      <th className="py-3 px-4 text-center">Laufzeit</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-right">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredContracts.map(ctr => (
                      <tr key={ctr.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4 font-bold text-xs text-[#1B1D1E] tracking-tight">
                          {ctr.contractNumber}
                          <span className="block text-[11px] font-normal text-slate-400">{ctr.createdAt}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-slate-900 block">{ctr.customerName}</span>
                          <span className="text-[11px] text-slate-500">{ctr.customerEmail}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-slate-900 block">{ctr.planName}</span>
                          <span className="text-[11px] text-blue-600 font-semibold">{ctr.provider}</span>
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-sm text-[#1B1D1E] tabular-nums">
                          CHF {ctr.monthlyPriceChf.toFixed(2)} / Mt.
                        </td>
                        <td className="py-3 px-4 text-center text-slate-600 text-[11px]">
                          {ctr.durationMonths}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                            {ctr.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedContractForView(ctr)}
                              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold flex items-center gap-1 transition-colors"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>Vertrag (PDF)</span>
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Vertrag ${ctr.contractNumber} wirklich archivieren/löschen?`)) {
                                  mockDb.deleteContract(ctr.id);
                                  refreshAllData();
                                  showNotification('Vertrag gelöscht.');
                                }
                              }}
                              className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                              title="Löschen"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* =====================================================================
          MODAL: CONTRACT PDF VIEWER
         ===================================================================== */}
      <ContractViewModal
        contract={selectedContractForView}
        onClose={() => setSelectedContractForView(null)}
      />

      {/* =====================================================================
          MODAL: GENERATE NEW CONTRACT
         ===================================================================== */}
      {isContractGenOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 border border-slate-200">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                <span>Neuen Mobilfunkvertrag generieren</span>
              </h3>
              <button onClick={() => setIsContractGenOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGenerateContractSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Bestehenden Kunden auswählen (optional)</label>
                <select
                  value={contractForm.customerSelectId}
                  onChange={(e) => handleCustomerSelectChange(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                >
                  <option value="">-- Kundenkartei durchsuchen --</option>
                  {customers.map(c => (
                    <option key={c.id} value={c.id}>{c.fullName} ({c.email})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Vor- &amp; Nachname *</label>
                  <input
                    type="text"
                    required
                    value={contractForm.customerName}
                    onChange={(e) => setContractForm(p => ({ ...p, customerName: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">E-Mail *</label>
                  <input
                    type="email"
                    required
                    value={contractForm.customerEmail}
                    onChange={(e) => setContractForm(p => ({ ...p, customerEmail: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Telefon</label>
                  <input
                    type="text"
                    value={contractForm.customerPhone}
                    onChange={(e) => setContractForm(p => ({ ...p, customerPhone: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Strasse &amp; Nr.</label>
                  <input
                    type="text"
                    value={contractForm.customerAddress}
                    onChange={(e) => setContractForm(p => ({ ...p, customerAddress: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">PLZ</label>
                  <input
                    type="text"
                    value={contractForm.customerPostalCode}
                    onChange={(e) => setContractForm(p => ({ ...p, customerPostalCode: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Ortschaft</label>
                  <input
                    type="text"
                    value={contractForm.customerCity}
                    onChange={(e) => setContractForm(p => ({ ...p, customerCity: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobilfunk-Tarif auswählen *</label>
                <select
                  required
                  value={contractForm.planId}
                  onChange={(e) => setContractForm(p => ({ ...p, planId: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold"
                >
                  <option value="">-- Tarif auswählen --</option>
                  {subscriptions.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.provider}: {s.name} (CHF {(s.discountPriceChf ?? s.monthlyPriceChf).toFixed(2)}/Mt.)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Vertragslaufzeit</label>
                <input
                  type="text"
                  value={contractForm.durationMonths}
                  onChange={(e) => setContractForm(p => ({ ...p, durationMonths: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Bemerkungen / Portierung / SIM-Nummer</label>
                <textarea
                  rows={2}
                  value={contractForm.notes}
                  onChange={(e) => setContractForm(p => ({ ...p, notes: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsContractGenOpen(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="btn btn-sm"
                  style={{ backgroundColor: '#059669', color: '#FFFFFF', borderColor: '#059669' }}
                >
                  Vertrag verbindlich generieren &amp; öffnen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: STOCK ADJUSTMENT (+ / -)
         ===================================================================== */}
      {isStockAdjustModalOpen && productForStockAdjust && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">
                Lagerbestand anpassen
              </h3>
              <button onClick={() => setIsStockAdjustModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4 p-3 bg-slate-50 rounded-xl text-xs space-y-1">
              <span className="font-bold text-slate-900 block">{productForStockAdjust.name}</span>
              <p className="text-slate-500">SKU: {productForStockAdjust.sku}</p>
              <p className="text-slate-700 font-semibold">
                Aktueller Bestand: <strong>{productForStockAdjust.quantityOnHand} Stk.</strong>
              </p>
            </div>

            <form onSubmit={handleExecuteStockAdjust} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Veränderung (+ für Zugang, - für Abgang)
                </label>
                <input
                  type="number"
                  step="1"
                  required
                  value={stockAdjustDelta}
                  onChange={(e) => setStockAdjustDelta(parseInt(e.target.value) || 0)}
                  placeholder="z.B. +10 oder -2"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold tabular-nums"
                  autoFocus
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Neuer resultierender Bestand: <strong>{Math.max(0, productForStockAdjust.quantityOnHand + stockAdjustDelta)} Stk.</strong>
                </span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Buchungsgrund</label>
                <select
                  value={stockAdjustReason}
                  onChange={(e) => setStockAdjustReason(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                >
                  <option value="Wareneingang">Wareneingang / Nachbestellung Grosshändler</option>
                  <option value="Verkauf im Ladenlokal Seebach">Manueller Verkauf im Ladenlokal</option>
                  <option value="Inventurkorrektur">Inventurkorrektur / Zähldifferenz</option>
                  <option value="Defekt / Beschädigung">Ausschuss / Defekt / Transportschaden</option>
                  <option value="Muster / Ausstellung">Ausstellungsstück Filiale</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsStockAdjustModalOpen(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                >
                  Bestand buchen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: PRODUCT EDIT / CREATE
         ===================================================================== */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">
                {editingProduct ? 'Produkt bearbeiten' : 'Neues Produkt im Shop anlegen'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Produktname *</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Marke / Hersteller</label>
                  <input
                    type="text"
                    required
                    value={productForm.brand}
                    onChange={(e) => setProductForm(p => ({ ...p, brand: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Artikelnummer / SKU *</label>
                  <input
                    type="text"
                    required
                    value={productForm.sku}
                    onChange={(e) => setProductForm(p => ({ ...p, sku: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategorie</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm(p => ({ ...p, category: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg capitalize"
                  >
                    <option value="smartphones">Smartphones</option>
                    <option value="refurbished">Refurbished / Occasion</option>
                    <option value="tablets">Tablets</option>
                    <option value="smartwatches">Smartwatches</option>
                    <option value="accessories">Zubehör</option>
                    <option value="audio">Audio / Kopfhörer</option>
                    <option value="chargers">Ladegeräte &amp; Kabel</option>
                    <option value="cases">Hüllen &amp; Schutzglas</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Verkaufspreis CHF *</label>
                  <input
                    type="number"
                    step="0.05"
                    required
                    value={productForm.priceChf}
                    onChange={(e) => setProductForm(p => ({ ...p, priceChf: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold tabular-nums"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Streichpreis CHF</label>
                  <input
                    type="number"
                    step="0.05"
                    value={productForm.originalPriceChf}
                    onChange={(e) => setProductForm(p => ({ ...p, originalPriceChf: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm tabular-nums"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Lagerbestand</label>
                  <input
                    type="number"
                    value={productForm.quantityOnHand}
                    onChange={(e) => setProductForm(p => ({ ...p, quantityOnHand: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold tabular-nums"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mindestbestand Warnung</label>
                  <input
                    type="number"
                    value={productForm.lowStockThreshold}
                    onChange={(e) => setProductForm(p => ({ ...p, lowStockThreshold: parseInt(e.target.value) || 3 }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Garantie (Monate)</label>
                  <input
                    type="number"
                    value={productForm.warrantyMonths}
                    onChange={(e) => setProductForm(p => ({ ...p, warrantyMonths: parseInt(e.target.value) || 24 }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Artikelbeschreibung</label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm(p => ({ ...p, description: e.target.value }))}
                  placeholder="Geprüfte Neuware mit Schweizer Stecker..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                >
                  {editingProduct ? 'Änderungen speichern' : 'Produkt erstellen'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: INVENTORY ADJUSTMENT LOGS
         ===================================================================== */}
      {isInventoryLogsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 border border-slate-200 max-h-[85vh] flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <History className="w-5 h-5 text-blue-600" />
                <span>Vollständige Lagerbestands-Historie ({inventoryLogs.length} Buchungen)</span>
              </h3>
              <button onClick={() => setIsInventoryLogsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold sticky top-0">
                  <tr>
                    <th className="py-2.5 px-3">Zeitpunkt</th>
                    <th className="py-2.5 px-3">Artikel &amp; SKU</th>
                    <th className="py-2.5 px-3 text-center">Vorher</th>
                    <th className="py-2.5 px-3 text-center">Delta</th>
                    <th className="py-2.5 px-3 text-center">Neu</th>
                    <th className="py-2.5 px-3">Buchungsgrund</th>
                    <th className="py-2.5 px-3">Mitarbeiter</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inventoryLogs.map(l => (
                    <tr key={l.id} className="hover:bg-slate-50">
                      <td className="py-2 px-3 text-slate-500 whitespace-nowrap">{l.timestamp}</td>
                      <td className="py-2 px-3">
                        <span className="font-semibold text-slate-900 block">{l.productName}</span>
                        <span className="text-[10px] text-slate-400 font-semibold">{l.sku}</span>
                      </td>
                      <td className="py-2 px-3 text-center tabular-nums">{l.previousQuantity}</td>
                      <td className="py-2 px-3 text-center font-bold tabular-nums">
                        <span className={l.adjustment > 0 ? 'text-emerald-600' : 'text-rose-600'}>
                          {l.adjustment > 0 ? `+${l.adjustment}` : l.adjustment}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-center font-bold text-slate-900 tabular-nums">{l.newQuantity}</td>
                      <td className="py-2 px-3 text-slate-700">{l.reason}</td>
                      <td className="py-2 px-3 text-slate-500 text-[11px]">{l.performedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setIsInventoryLogsModalOpen(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
              >
                Schliessen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: PRICE AUDIT LOG
         ===================================================================== */}
      {isAuditLogsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 border border-slate-200 max-h-[85vh] flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <History className="w-5 h-5 text-blue-600" />
                <span>Reparaturpreis-Auditlog ({auditLogs.length} Protokolle)</span>
              </h3>
              <button onClick={() => setIsAuditLogsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold sticky top-0">
                  <tr>
                    <th className="py-2.5 px-3">Datum / Zeit</th>
                    <th className="py-2.5 px-3">Modell &amp; Reparatur</th>
                    <th className="py-2.5 px-3 text-right">Alter Preis</th>
                    <th className="py-2.5 px-3 text-right">Neuer Preis</th>
                    <th className="py-2.5 px-3">Geändert von</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {auditLogs.map(a => (
                    <tr key={a.id} className="hover:bg-slate-50">
                      <td className="py-2 px-3 text-slate-500">{a.timestamp}</td>
                      <td className="py-2 px-3">
                        <span className="font-bold text-slate-900 block">{a.model}</span>
                        <span className="text-[11px] text-slate-500">{a.task}</span>
                      </td>
                      <td className="py-2 px-3 text-right text-slate-400 line-through tabular-nums">
                        CHF {a.oldPriceChf}.-
                      </td>
                      <td className="py-2 px-3 text-right font-bold text-blue-600 tabular-nums">
                        CHF {a.newPriceChf}.-
                      </td>
                      <td className="py-2 px-3 text-slate-600 text-[11px]">{a.changedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setIsAuditLogsModalOpen(false)}
                className="btn btn-dark btn-sm"
              >
                Schliessen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: ORDER DETAILS
         ===================================================================== */}
      {selectedOrderForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
              <div>
                <span className="font-bold text-lg text-slate-900 block font-heading">
                  Bestellung {selectedOrderForDetail.orderNumber}
                </span>
                <span className="text-xs text-slate-400">Aufgegeben am {selectedOrderForDetail.createdAt}</span>
              </div>
              <button onClick={() => setSelectedOrderForDetail(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Info */}
            <div className="bg-slate-50 p-4 rounded-xl mb-4 text-xs space-y-1">
              <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px] block">Kundenangaben</span>
              <p className="font-semibold text-slate-900 text-sm">{selectedOrderForDetail.customerName}</p>
              <p className="text-slate-600">E-Mail: {selectedOrderForDetail.customerEmail}</p>
              <p className="text-slate-600">Telefon: {selectedOrderForDetail.customerPhone}</p>
              <p className="text-slate-600">
                Lieferart: <strong>{selectedOrderForDetail.deliveryMethod === 'pickup' ? 'Abholung in Filiale Zürich Seebach' : 'Schweizerische Post (PostPac Priority)'}</strong>
              </p>
            </div>

            {/* Line Items */}
            <div className="space-y-3 mb-4">
              <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px] block">Bestellte Positionen</span>
              {selectedOrderForDetail.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl bg-white text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{item.product.name}</span>
                    <span className="text-slate-500">Menge: {item.quantity} Stk. · Einzelpreis: CHF {item.product.priceChf.toFixed(2)}</span>
                  </div>
                  <span className="font-bold text-slate-900 text-sm tabular-nums">
                    CHF {(item.product.priceChf * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs tabular-nums mb-4">
              <div className="flex justify-between text-slate-600">
                <span>Zwischensumme:</span>
                <span>CHF {selectedOrderForDetail.subtotalChf.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Versandkosten:</span>
                <span>CHF {selectedOrderForDetail.shippingCostChf.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Inkl. 8.1% Schweizer MwSt.:</span>
                <span>CHF {selectedOrderForDetail.vatChf.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 text-sm pt-2 border-t border-slate-200">
                <span>Gesamtbetrag:</span>
                <span className="text-blue-600">CHF {selectedOrderForDetail.grandTotalChf.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              {selectedOrderForDetail.status !== 'cancelled' ? (
                <button
                  onClick={() => handleCancelOrder(selectedOrderForDetail)}
                  className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-bold transition-colors"
                >
                  Bestellung stornieren &amp; Lagerbestand wiederherstellen
                </button>
              ) : (
                <span className="text-xs text-rose-600 font-semibold">Bestellung ist storniert</span>
              )}
              <button
                onClick={() => setSelectedOrderForDetail(null)}
                className="btn btn-dark btn-sm"
              >
                Schliessen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: CUSTOMER RECORD DETAILS DRAWER
         ===================================================================== */}
      {selectedCustomerForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 border border-slate-200 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
              <div>
                <span className="font-bold text-lg text-slate-900 block">{selectedCustomerForDetail.fullName}</span>
                <span className="text-xs text-slate-400">Kundenkonto #{selectedCustomerForDetail.id}</span>
              </div>
              <button onClick={() => setSelectedCustomerForDetail(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl text-xs space-y-1.5 mb-4">
              <p><strong>E-Mail:</strong> {selectedCustomerForDetail.email}</p>
              <p><strong>Telefon:</strong> {selectedCustomerForDetail.phone || 'Keine Angabe'}</p>
              <p><strong>Adresse:</strong> {selectedCustomerForDetail.address}, {selectedCustomerForDetail.postalCode} {selectedCustomerForDetail.city}</p>
              <p><strong>Kundenstatus:</strong> {selectedCustomerForDetail.role === 'admin' ? 'Administrator' : 'Standardkunde'}</p>
            </div>

            <div className="space-y-3 mb-4">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-500 block">Verknüpfte Verträge</span>
              {contracts.filter(c => c.customerEmail.toLowerCase() === selectedCustomerForDetail.email.toLowerCase()).map(c => (
                <div key={c.id} className="p-3 border border-slate-200 rounded-xl flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{c.contractNumber}</span>
                    <span className="text-slate-500">{c.planName} · CHF {c.monthlyPriceChf.toFixed(2)}/Mt.</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCustomerForDetail(null);
                      setSelectedContractForView(c);
                    }}
                    className="btn btn-primary btn-sm"
                    style={{ padding: '0.25rem 0.65rem', minHeight: '30px', fontSize: '0.75rem' }}
                  >
                    PDF
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <button
                onClick={() => {
                  const cust = selectedCustomerForDetail;
                  setSelectedCustomerForDetail(null);
                  handleOpenContractGen(cust);
                }}
                className="btn btn-sm"
                style={{ backgroundColor: '#059669', color: '#FFFFFF', borderColor: '#059669' }}
              >
                <FileText className="w-4 h-4" />
                <span>Neuen Vertrag erstellen</span>
              </button>
              <button
                onClick={() => setSelectedCustomerForDetail(null)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700"
              >
                Schliessen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: NEW REPAIR PRICE
         ===================================================================== */}
      {isNewRepairModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-base text-slate-900 font-heading">
                  Neuen Reparaturpreis erfassen
                </h3>
                <p className="text-xs text-slate-500">
                  Verbindlichen Werkstatttarif für die Website und alle 4 Filialen festlegen
                </p>
              </div>
              <button onClick={() => setIsNewRepairModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRepair} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hersteller / Marke *</label>
                  <select
                    value={newRepairForm.manufacturer}
                    onChange={(e) => setNewRepairForm(p => ({ ...p, manufacturer: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Google">Google</option>
                    <option value="Huawei">Huawei</option>
                    <option value="Xiaomi">Xiaomi</option>
                    <option value="Nokia">Nokia</option>
                    <option value="HTC">HTC</option>
                    <option value="Honor">Honor</option>
                    <option value="Sony">Sony</option>
                    <option value="LG">LG</option>
                    <option value="OnePlus">OnePlus</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Gerätekategorie</label>
                  <select
                    value={newRepairForm.deviceCategory}
                    onChange={(e) => setNewRepairForm(p => ({ ...p, deviceCategory: e.target.value as DeviceCategory }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white capitalize"
                  >
                    <option value="smartphone">Smartphone</option>
                    <option value="tablet">Tablet</option>
                    <option value="smartwatch">Smartwatch</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Gerätemodell *</label>
                <input
                  type="text"
                  required
                  placeholder="z.B. iPhone 15 Pro, Galaxy S24 Ultra, Pixel 8 Pro..."
                  value={newRepairForm.model}
                  onChange={(e) => setNewRepairForm(p => ({ ...p, model: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Reparatur-Einsatz *</label>
                  <input
                    type="text"
                    required
                    placeholder="z.B. Display OEM Original, Akku / Batterie..."
                    value={newRepairForm.repairTask}
                    onChange={(e) => setNewRepairForm(p => ({ ...p, repairTask: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Fixpreis in CHF *</label>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    required
                    value={newRepairForm.priceChf}
                    onChange={(e) => setNewRepairForm(p => ({ ...p, priceChf: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-bold text-blue-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ersatzteilqualität</label>
                  <select
                    value={newRepairForm.qualityGrade}
                    onChange={(e) => setNewRepairForm(p => ({ ...p, qualityGrade: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="OEM Original">OEM Original</option>
                    <option value="Premium Soft OLED">Premium Soft OLED</option>
                    <option value="Incell Standard">Incell Standard</option>
                    <option value="High Capacity">High Capacity</option>
                    <option value="Geprüftes Ersatzteil">Geprüftes Ersatzteil</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Reparaturdauer</label>
                  <input
                    type="text"
                    value={newRepairForm.durationEstimate}
                    onChange={(e) => setNewRepairForm(p => ({ ...p, durationEstimate: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Garantie (Monate)</label>
                  <select
                    value={newRepairForm.warrantyMonths}
                    onChange={(e) => setNewRepairForm(p => ({ ...p, warrantyMonths: parseInt(e.target.value) || 6 }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value={6}>6 Monate Garantie</option>
                    <option value={12}>12 Monate Garantie</option>
                    <option value={24}>24 Monate Garantie</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Notiz / Einbauhinweis</label>
                <input
                  type="text"
                  value={newRepairForm.notes}
                  onChange={(e) => setNewRepairForm(p => ({ ...p, notes: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewRepairModalOpen(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                >
                  Tarif speichern &amp; publizieren
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: SUBSCRIPTION PLAN CREATE / EDIT
         ===================================================================== */}
      {isSubModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-base text-slate-900 font-heading">
                  {editingSub ? `Abo-Tarif "${editingSub.name}" bearbeiten` : 'Neuen Abo-Tarif publizieren'}
                </h3>
                <p className="text-xs text-slate-500">
                  Offizielle Mobilfunk-Tarife für Shop, Filialen und Vertragsgenerator verwalten
                </p>
              </div>
              <button onClick={() => setIsSubModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSub} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Netzbetreiber / Provider *</label>
                  <select
                    value={subForm.provider}
                    onChange={(e) => setSubForm(p => ({ ...p, provider: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Sunrise">Sunrise</option>
                    <option value="Salt">Salt</option>
                    <option value="yallo">yallo</option>
                    <option value="LEBARA">LEBARA</option>
                    <option value="Mobile World Care">Mobile World Care</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tarifname *</label>
                  <input
                    type="text"
                    required
                    placeholder="z.B. Up Mobile L, Swiss Flat 5G..."
                    value={subForm.name}
                    onChange={(e) => setSubForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Regulärer Preis CHF *</label>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    required
                    value={subForm.monthlyPriceChf}
                    onChange={(e) => setSubForm(p => ({ ...p, monthlyPriceChf: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Aktionspreis CHF *</label>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    required
                    value={subForm.discountPriceChf}
                    onChange={(e) => setSubForm(p => ({ ...p, discountPriceChf: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-bold text-blue-700"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Aktivierungsgebühr CHF</label>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    value={subForm.activationFeeChf}
                    onChange={(e) => setSubForm(p => ({ ...p, activationFeeChf: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Datenvolumen Schweiz *</label>
                  <input
                    type="text"
                    required
                    value={subForm.dataAllowance}
                    onChange={(e) => setSubForm(p => ({ ...p, dataAllowance: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Roaming Ausland (EU/USA)</label>
                  <input
                    type="text"
                    value={subForm.roamingAllowance}
                    onChange={(e) => setSubForm(p => ({ ...p, roamingAllowance: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Anrufe &amp; SMS</label>
                  <input
                    type="text"
                    value={subForm.callsAndSms}
                    onChange={(e) => setSubForm(p => ({ ...p, callsAndSms: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">5G Geschwindigkeit</label>
                  <input
                    type="text"
                    value={subForm.speed}
                    onChange={(e) => setSubForm(p => ({ ...p, speed: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mindestlaufzeit</label>
                  <input
                    type="text"
                    value={subForm.contractDuration}
                    onChange={(e) => setSubForm(p => ({ ...p, contractDuration: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Highlight-Badge (optional)</label>
                  <input
                    type="text"
                    placeholder="z.B. Tipp der Redaktion, Top-Aktion..."
                    value={subForm.highlightBadge}
                    onChange={(e) => setSubForm(p => ({ ...p, highlightBadge: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subForm.published}
                      onChange={(e) => setSubForm(p => ({ ...p, published: e.target.checked }))}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span className="font-bold text-slate-700">Im öffentlichen Webshop anzeigen</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Enthaltene Vorteile (Zeile für Zeile)</label>
                <textarea
                  rows={3}
                  value={subForm.featuresText}
                  onChange={(e) => setSubForm(p => ({ ...p, featuresText: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  placeholder="Highspeed 5G&#10;Kostenlose SIM&#10;Vor-Ort Betreuung"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSubModalOpen(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                >
                  {editingSub ? 'Änderungen speichern' : 'Abo-Tarif publizieren'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: NEW CUSTOMER REGISTRATION
         ===================================================================== */}
      {isNewCustomerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-base text-slate-900 font-heading">
                  Neuen Kunden erfassen
                </h3>
                <p className="text-xs text-slate-500">
                  Kundenstamm für Verträge, Reparaturen und Bestellungen anlegen
                </p>
              </div>
              <button onClick={() => setIsNewCustomerModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Vollständiger Name *</label>
                <input
                  type="text"
                  required
                  placeholder="z.B. Thomas Huber"
                  value={newCustomerForm.fullName}
                  onChange={(e) => setNewCustomerForm(p => ({ ...p, fullName: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">E-Mail-Adresse *</label>
                  <input
                    type="email"
                    required
                    placeholder="thomas.huber@bluewin.ch"
                    value={newCustomerForm.email}
                    onChange={(e) => setNewCustomerForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Telefon / Mobile</label>
                  <input
                    type="tel"
                    placeholder="+41 79 123 45 67"
                    value={newCustomerForm.phone}
                    onChange={(e) => setNewCustomerForm(p => ({ ...p, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Strasse &amp; Hausnummer</label>
                <input
                  type="text"
                  placeholder="z.B. Schaffhauserstrasse 120"
                  value={newCustomerForm.address}
                  onChange={(e) => setNewCustomerForm(p => ({ ...p, address: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Postleitzahl</label>
                  <input
                    type="text"
                    placeholder="8052"
                    value={newCustomerForm.postalCode}
                    onChange={(e) => setNewCustomerForm(p => ({ ...p, postalCode: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ortschaft</label>
                  <input
                    type="text"
                    placeholder="Zürich"
                    value={newCustomerForm.city}
                    onChange={(e) => setNewCustomerForm(p => ({ ...p, city: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewCustomerModalOpen(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                >
                  Kunde in Kartei anlegen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
