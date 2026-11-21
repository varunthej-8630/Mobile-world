import type { 
  RepairPriceRecord, 
  Product, 
  CustomerEnquiry, 
  UserAccount, 
  Order, 
  PriceAuditLogEntry, 
  SubscriptionPlan, 
  Contract, 
  InventoryAdjustmentLog 
} from '../types';
import { REPAIR_PRICE_CATALOG } from './repairPrices';
import { INITIAL_PRODUCTS } from './products';
import { SUBSCRIPTION_PLANS } from './subscriptions';

const STORAGE_KEYS = {
  REPAIRS: 'mw_repairs_v3',
  PRODUCTS: 'mw_products_v2',
  SUBSCRIPTIONS: 'mw_subscriptions_v2',
  CONTRACTS: 'mw_contracts_v2',
  INVENTORY_LOGS: 'mw_inv_logs_v2',
  ENQUIRIES: 'mw_enquiries_v2',
  CURRENT_USER: 'mw_user_v2',
  CUSTOMERS: 'mw_customers_v2',
  ORDERS: 'mw_orders_v2',
  AUDIT_LOG: 'mw_price_audit_v2',
  ADMIN_SESSION: 'mw_admin_session_v2'
};

class MockDatabase {
  private repairList: RepairPriceRecord[];
  private productList: Product[];
  private subscriptionList: SubscriptionPlan[];
  private contractList: Contract[];
  private inventoryLogs: InventoryAdjustmentLog[];
  private enquiries: CustomerEnquiry[];
  private currentUser: UserAccount | null;
  private customerList: UserAccount[];
  private orders: Order[];
  private auditLogs: PriceAuditLogEntry[];

  constructor() {
    // 1. Load Repairs
    const savedRepairs = localStorage.getItem(STORAGE_KEYS.REPAIRS);
    this.repairList = savedRepairs ? JSON.parse(savedRepairs) : [...REPAIR_PRICE_CATALOG];

    // 2. Load Products
    const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    this.productList = savedProducts ? JSON.parse(savedProducts) : [...INITIAL_PRODUCTS];

    // 3. Load Subscriptions
    const savedSubs = localStorage.getItem(STORAGE_KEYS.SUBSCRIPTIONS);
    this.subscriptionList = savedSubs ? JSON.parse(savedSubs) : SUBSCRIPTION_PLANS.map(p => ({
      ...p,
      active: p.active !== undefined ? p.active : true,
      published: p.published !== undefined ? p.published : true,
      displayOrder: p.displayOrder || 1
    }));

    // 4. Load Customers
    const savedCustomers = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    this.customerList = savedCustomers ? JSON.parse(savedCustomers) : [
      {
        id: 'usr-sandra-001',
        fullName: 'Sandra Meier',
        email: 'sandra.meier@gmail.com',
        phone: '+41 78 889 01 23',
        role: 'customer',
        address: 'Schaffhauserstrasse 120',
        city: 'Zürich',
        postalCode: '8052',
        registeredAt: '2026-08-14'
      },
      {
        id: 'usr-marc-002',
        fullName: 'Marc Keller',
        email: 'm.keller@sunrise.ch',
        phone: '+41 79 450 12 34',
        role: 'customer',
        address: 'Glattalstrasse 45',
        city: 'Zürich',
        postalCode: '8052',
        registeredAt: '2026-09-02'
      },
      {
        id: 'usr-beat-003',
        fullName: 'Beat Odermatt',
        email: 'beat.odermatt@bluewin.ch',
        phone: '+41 79 312 90 88',
        role: 'customer',
        address: 'Bahnhofstrasse 18',
        city: 'Rüti ZH',
        postalCode: '8630',
        registeredAt: '2026-09-18'
      },
      {
        id: 'usr-elena-004',
        fullName: 'Elena Rossi',
        email: 'elena.rossi@ticino.ch',
        phone: '+41 76 554 22 11',
        role: 'customer',
        address: 'Limmatquai 8',
        city: 'Zürich',
        postalCode: '8001',
        registeredAt: '2026-10-01'
      }
    ];

    // 5. Load Contracts
    const savedContracts = localStorage.getItem(STORAGE_KEYS.CONTRACTS);
    this.contractList = savedContracts ? JSON.parse(savedContracts) : [
      {
        id: 'ctr-001',
        contractNumber: 'MW-CTR-2026-1042',
        customerId: 'usr-sandra-001',
        customerName: 'Sandra Meier',
        customerEmail: 'sandra.meier@gmail.com',
        customerPhone: '+41 78 889 01 23',
        customerAddress: 'Schaffhauserstrasse 120',
        customerCity: 'Zürich',
        customerPostalCode: '8052',
        planId: 'sub-sunrise-up-m',
        planName: 'Sunrise Up Mobile M',
        provider: 'Sunrise',
        monthlyPriceChf: 29.90,
        activationFeeChf: 59.90,
        durationMonths: '24 Monate Mindestlaufzeit (Aktionspreis)',
        dataAllowance: 'Unlimitiert Highspeed 5G in CH',
        roamingAllowance: 'Kein Roaming inklusive (Zusatzoptionen verfügbar)',
        status: 'active',
        createdAt: '2026-10-18 14:30',
        notes: 'Inkl. Rufnummernportierung von Swisscom per 01.11.2026. Vor-Ort SIM ausgehändigt.'
      }
    ];

    // 6. Load Inventory Adjustment Logs
    const savedInvLogs = localStorage.getItem(STORAGE_KEYS.INVENTORY_LOGS);
    this.inventoryLogs = savedInvLogs ? JSON.parse(savedInvLogs) : [
      {
        id: 'inv-log-001',
        productId: 'prod-iphone16-pro',
        productName: 'Apple iPhone 16 Pro 128GB',
        sku: 'SM-APL-IP16P-128',
        previousQuantity: 5,
        adjustment: -1,
        newQuantity: 4,
        reason: 'Verkauf im Ladenlokal Seebach',
        performedBy: 'Admin (Filiale Seebach)',
        timestamp: '2026-10-21 16:30'
      },
      {
        id: 'inv-log-002',
        productId: 'prod-charger-20w',
        productName: 'Apple 20W USB-C Power Adapter',
        sku: 'CHG-APL-20W',
        previousQuantity: 12,
        adjustment: 10,
        newQuantity: 22,
        reason: 'Wareneingang Grosshändler Alltron',
        performedBy: 'Lagerleitung Seebach',
        timestamp: '2026-10-20 09:15'
      }
    ];

    // 7. Load Current User
    const savedUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    this.currentUser = savedUser ? JSON.parse(savedUser) : null;

    // 8. Load Orders with Authoritative Data Validation & Self-Healing
    const savedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
    const defaultOrders: Order[] = [
      {
        id: 'ord-001',
        orderNumber: 'MW-2026-8912',
        customerName: 'Sandra Meier',
        customerEmail: 'sandra.meier@gmail.com',
        customerPhone: '+41 78 889 01 23',
        deliveryMethod: 'pickup',
        shippingCostChf: 0,
        subtotalChf: 1149.00,
        vatChf: 86.08,
        grandTotalChf: 1149.00,
        items: [
          {
            product: INITIAL_PRODUCTS[0], // Apple iPhone 16 Pro 256GB - CHF 1149.00
            quantity: 1
          }
        ],
        status: 'ready_for_pickup',
        paymentStatus: 'paid',
        notes: 'Abholung Filiale Seebach avisiert für Samstag.',
        createdAt: '2026-10-20 15:45'
      },
      {
        id: 'ord-002',
        orderNumber: 'MW-2026-8740',
        customerName: 'Sandra Meier',
        customerEmail: 'sandra.meier@gmail.com',
        customerPhone: '+41 78 889 01 23',
        deliveryMethod: 'pickup',
        shippingCostChf: 0,
        subtotalChf: 39.00,
        vatChf: 2.92,
        grandTotalChf: 39.00,
        items: [
          {
            product: INITIAL_PRODUCTS.find(p => p.sku === 'MW-ACC-CLEAR-IP16P') || INITIAL_PRODUCTS[6],
            quantity: 1
          }
        ],
        status: 'completed',
        paymentStatus: 'paid',
        notes: 'Im Ladenlokal Schaffhauserstrasse abgeholt und bezahlt.',
        createdAt: '2026-10-10 14:15'
      },
      {
        id: 'ord-003',
        orderNumber: 'MW-2026-8920',
        customerName: 'Marc Keller',
        customerEmail: 'm.keller@sunrise.ch',
        customerPhone: '+41 79 450 12 34',
        deliveryMethod: 'post',
        shippingCostChf: 0,
        subtotalChf: 229.00,
        vatChf: 17.15,
        grandTotalChf: 229.00,
        items: [
          {
            product: INITIAL_PRODUCTS.find(p => p.sku === 'MW-AP-APP2-USBC') || INITIAL_PRODUCTS[5], // AirPods Pro 2 - CHF 229.00
            quantity: 1
          }
        ],
        status: 'shipped',
        paymentStatus: 'paid',
        notes: 'PostPac Priority Tracking: 99.00.123456.12345678',
        createdAt: '2026-10-19 11:20'
      }
    ];

    if (savedOrders) {
      try {
        const parsed = JSON.parse(savedOrders);
        // Self-heal and recalculate totals so corrupted cache from earlier sessions cannot mismatch
        this.orders = parsed.map((ord: Order) => {
          const items = (ord.items || []).map(it => {
            const matchedProd = INITIAL_PRODUCTS.find(p => p.id === it.product?.id || p.sku === it.product?.sku) || it.product;
            return {
              ...it,
              product: matchedProd
            };
          });
          const calculatedSubtotal = Math.round(items.reduce((sum, it) => sum + ((it.product?.priceChf || 0) * it.quantity), 0) * 100) / 100;
          const shipping = ord.shippingCostChf || 0;
          const calculatedGrandTotal = Math.round((calculatedSubtotal + shipping) * 100) / 100;
          const calculatedVat = Math.round(((calculatedGrandTotal * 8.1) / 108.1) * 100) / 100;

          return {
            ...ord,
            items,
            subtotalChf: calculatedSubtotal,
            shippingCostChf: shipping,
            vatChf: calculatedVat,
            grandTotalChf: calculatedGrandTotal
          };
        });
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(this.orders));
      } catch {
        this.orders = defaultOrders;
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(this.orders));
      }
    } else {
      this.orders = defaultOrders;
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(this.orders));
    }

    // 9. Load Enquiries
    const savedEnquiries = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
    this.enquiries = savedEnquiries ? JSON.parse(savedEnquiries) : [
      {
        id: 'enq-001',
        type: 'repair',
        customerName: 'Marc Keller',
        email: 'm.keller@sunrise.ch',
        phone: '+41 79 450 12 34',
        branch: 'Seebach',
        details: { model: 'iPhone 15 Pro', repair: 'Display OEM OLED', price: 'CHF 429.-' },
        message: 'Kommen heute Nachmittag gegen 14 Uhr vorbei. Ist das Display an Lager?',
        createdAt: '2026-10-21 11:30',
        status: 'in_progress',
        adminNotes: 'Ersatzdisplay im Lager Seebach reserviert.'
      },
      {
        id: 'enq-002',
        type: 'subscription',
        customerName: 'Sandra Meier',
        email: 'sandra.meier@gmail.com',
        phone: '+41 78 889 01 23',
        branch: 'Seebach',
        details: { plan: 'Sunrise Up Mobile M', price: 'CHF 29.90/Mt' },
        message: 'Möchte gerne meine bestehende Rufnummer von Swisscom zu Sunrise mitnehmen.',
        createdAt: '2026-10-21 14:15',
        status: 'completed',
        adminNotes: 'Vertrag MW-CTR-2026-1042 erfolgreich generiert und SIM ausgehändigt.'
      }
    ];

    // 10. Load Audit Logs
    const savedAudit = localStorage.getItem(STORAGE_KEYS.AUDIT_LOG);
    this.auditLogs = savedAudit ? JSON.parse(savedAudit) : [
      {
        id: 'aud-001',
        repairId: 'rep-app-15p-disp-oem',
        model: 'iPhone 15 Pro',
        task: 'Display OEM OLED',
        oldPriceChf: 449,
        newPriceChf: 429,
        changedBy: 'Admin (Werkstattleitung)',
        timestamp: '2026-10-15 09:30'
      }
    ];
  }

  // =========================================================================
  // --- REPAIR SERVICES & AUDIT LOG ---
  // =========================================================================

  getRepairs(onlyActive: boolean = false): RepairPriceRecord[] {
    if (onlyActive) {
      return this.repairList.filter(r => r.active !== false);
    }
    return this.repairList;
  }

  getRepairById(id: string): RepairPriceRecord | undefined {
    return this.repairList.find(r => r.id === id);
  }

  updateRepair(id: string, updates: Partial<RepairPriceRecord>, changedBy: string = 'Admin (Filiale Seebach)'): boolean {
    const idx = this.repairList.findIndex(r => r.id === id);
    if (idx !== -1) {
      const oldRecord = this.repairList[idx];

      // Validation: prices must be positive numbers
      if (updates.priceChf !== undefined && (isNaN(updates.priceChf) || updates.priceChf < 0)) {
        return false;
      }

      // Record Audit Log if price changed
      if (updates.priceChf !== undefined && updates.priceChf !== oldRecord.priceChf) {
        const auditEntry: PriceAuditLogEntry = {
          id: `aud-${Date.now()}`,
          repairId: id,
          model: oldRecord.model,
          task: oldRecord.repairTask,
          oldPriceChf: oldRecord.priceChf,
          newPriceChf: updates.priceChf,
          changedBy,
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16)
        };
        this.auditLogs.unshift(auditEntry);
        localStorage.setItem(STORAGE_KEYS.AUDIT_LOG, JSON.stringify(this.auditLogs));
      }

      this.repairList[idx] = {
        ...oldRecord,
        ...updates,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      localStorage.setItem(STORAGE_KEYS.REPAIRS, JSON.stringify(this.repairList));
      return true;
    }
    return false;
  }

  createRepair(repair: Omit<RepairPriceRecord, 'id' | 'lastUpdated'>): RepairPriceRecord {
    const id = `rep-${repair.manufacturer.toLowerCase().slice(0, 3)}-${Date.now().toString().slice(-6)}`;
    const newRecord: RepairPriceRecord = {
      ...repair,
      id,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    this.repairList.unshift(newRecord);
    localStorage.setItem(STORAGE_KEYS.REPAIRS, JSON.stringify(this.repairList));
    return newRecord;
  }

  toggleRepairActive(id: string): boolean {
    const r = this.getRepairById(id);
    if (!r) return false;
    return this.updateRepair(id, { active: !r.active });
  }

  deleteRepair(id: string): boolean {
    const initialLen = this.repairList.length;
    this.repairList = this.repairList.filter(r => r.id !== id);
    if (this.repairList.length !== initialLen) {
      localStorage.setItem(STORAGE_KEYS.REPAIRS, JSON.stringify(this.repairList));
      return true;
    }
    return false;
  }

  resetRepairs(): void {
    this.repairList = [...REPAIR_PRICE_CATALOG];
    localStorage.setItem(STORAGE_KEYS.REPAIRS, JSON.stringify(this.repairList));
  }

  getPriceAuditLog(): PriceAuditLogEntry[] {
    return this.auditLogs;
  }

  // =========================================================================
  // --- PRODUCTS & INVENTORY CONTROL ---
  // =========================================================================

  getProducts(onlyActive: boolean = false): Product[] {
    if (onlyActive) {
      return this.productList.filter(p => p.active !== false);
    }
    return this.productList;
  }

  getProductById(id: string): Product | undefined {
    return this.productList.find(p => p.id === id || p.sku === id);
  }

  createProduct(product: Omit<Product, 'id' | 'lastStockUpdate'>): Product {
    const id = `prod-${Date.now().toString().slice(-6)}`;
    const newProduct: Product = {
      ...product,
      id,
      active: product.active !== undefined ? product.active : true,
      lastStockUpdate: new Date().toISOString().split('T')[0]
    };
    this.productList.unshift(newProduct);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(this.productList));

    // Log initial stock entry if quantity > 0
    if (newProduct.quantityOnHand > 0) {
      this.logInventoryAdjustment(
        newProduct.id,
        newProduct.name,
        newProduct.sku,
        0,
        newProduct.quantityOnHand,
        newProduct.quantityOnHand,
        'Initialer Lagerbestand bei Produkterstellung',
        'Admin'
      );
    }

    return newProduct;
  }

  updateProduct(id: string, updates: Partial<Product>): boolean {
    const idx = this.productList.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.productList[idx] = {
        ...this.productList[idx],
        ...updates
      };
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(this.productList));
      return true;
    }
    return false;
  }

  updateProductStock(id: string, newQuantity: number, reason: string = 'Manuelle Bestandeskorrektur', performedBy: string = 'Admin'): boolean {
    const idx = this.productList.findIndex(p => p.id === id);
    if (idx !== -1) {
      const p = this.productList[idx];
      const validQuantity = Math.max(0, Math.floor(newQuantity));
      const previousQuantity = p.quantityOnHand;
      const delta = validQuantity - previousQuantity;

      let status: Product['stockStatus'] = 'in_stock';
      if (validQuantity <= 0) {
        status = 'out_of_stock';
      } else if (validQuantity <= p.lowStockThreshold) {
        status = 'low_stock';
      }

      this.productList[idx] = {
        ...p,
        quantityOnHand: validQuantity,
        stockStatus: status,
        lastStockUpdate: new Date().toISOString().split('T')[0]
      };
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(this.productList));

      if (delta !== 0) {
        this.logInventoryAdjustment(
          p.id,
          p.name,
          p.sku,
          previousQuantity,
          delta,
          validQuantity,
          reason,
          performedBy
        );
      }

      return true;
    }
    return false;
  }

  adjustStock(id: string, delta: number, reason: string, performedBy: string = 'Admin'): boolean {
    const prod = this.getProductById(id);
    if (!prod) return false;
    const targetQty = Math.max(0, prod.quantityOnHand + delta);
    return this.updateProductStock(id, targetQty, reason, performedBy);
  }

  updateProductPrice(id: string, newPrice: number): boolean {
    if (isNaN(newPrice) || newPrice < 0) return false;
    const idx = this.productList.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.productList[idx] = {
        ...this.productList[idx],
        priceChf: Math.round(newPrice * 100) / 100
      };
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(this.productList));
      return true;
    }
    return false;
  }

  deleteProduct(id: string): boolean {
    const initialLen = this.productList.length;
    this.productList = this.productList.filter(p => p.id !== id);
    if (this.productList.length !== initialLen) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(this.productList));
      return true;
    }
    return false;
  }

  private logInventoryAdjustment(
    productId: string,
    productName: string,
    sku: string,
    previousQuantity: number,
    adjustment: number,
    newQuantity: number,
    reason: string,
    performedBy: string
  ): void {
    const log: InventoryAdjustmentLog = {
      id: `inv-log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      productId,
      productName,
      sku,
      previousQuantity,
      adjustment,
      newQuantity,
      reason,
      performedBy,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    this.inventoryLogs.unshift(log);
    localStorage.setItem(STORAGE_KEYS.INVENTORY_LOGS, JSON.stringify(this.inventoryLogs));
  }

  getInventoryLogs(productId?: string): InventoryAdjustmentLog[] {
    if (productId) {
      return this.inventoryLogs.filter(l => l.productId === productId);
    }
    return this.inventoryLogs;
  }

  resetProducts(): void {
    this.productList = [...INITIAL_PRODUCTS];
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(this.productList));
  }

  // =========================================================================
  // --- SUBSCRIPTION PLANS MANAGEMENT ---
  // =========================================================================

  getSubscriptions(onlyPublished: boolean = false): SubscriptionPlan[] {
    if (onlyPublished) {
      return this.subscriptionList.filter(s => s.published !== false && s.active !== false);
    }
    return this.subscriptionList;
  }

  getSubscriptionById(id: string): SubscriptionPlan | undefined {
    return this.subscriptionList.find(s => s.id === id);
  }

  createSubscription(sub: Omit<SubscriptionPlan, 'id' | 'lastVerified'>): SubscriptionPlan {
    const id = `sub-${sub.provider.toLowerCase().replace(/[^a-z0-9]/g, '')}-${Date.now().toString().slice(-4)}`;
    const newPlan: SubscriptionPlan = {
      ...sub,
      id,
      active: sub.active !== undefined ? sub.active : true,
      published: sub.published !== undefined ? sub.published : true,
      displayOrder: sub.displayOrder || this.subscriptionList.length + 1,
      lastVerified: new Date().toISOString().split('T')[0]
    };
    this.subscriptionList.unshift(newPlan);
    localStorage.setItem(STORAGE_KEYS.SUBSCRIPTIONS, JSON.stringify(this.subscriptionList));
    return newPlan;
  }

  updateSubscription(id: string, updates: Partial<SubscriptionPlan>): boolean {
    const idx = this.subscriptionList.findIndex(s => s.id === id);
    if (idx !== -1) {
      this.subscriptionList[idx] = {
        ...this.subscriptionList[idx],
        ...updates,
        lastVerified: new Date().toISOString().split('T')[0]
      };
      localStorage.setItem(STORAGE_KEYS.SUBSCRIPTIONS, JSON.stringify(this.subscriptionList));
      return true;
    }
    return false;
  }

  toggleSubscriptionPublished(id: string): boolean {
    const plan = this.getSubscriptionById(id);
    if (!plan) return false;
    return this.updateSubscription(id, { published: !plan.published });
  }

  deleteSubscription(id: string): boolean {
    const initialLen = this.subscriptionList.length;
    this.subscriptionList = this.subscriptionList.filter(s => s.id !== id);
    if (this.subscriptionList.length !== initialLen) {
      localStorage.setItem(STORAGE_KEYS.SUBSCRIPTIONS, JSON.stringify(this.subscriptionList));
      return true;
    }
    return false;
  }

  resetSubscriptions(): void {
    this.subscriptionList = SUBSCRIPTION_PLANS.map(p => ({
      ...p,
      active: true,
      published: true
    }));
    localStorage.setItem(STORAGE_KEYS.SUBSCRIPTIONS, JSON.stringify(this.subscriptionList));
  }

  // =========================================================================
  // --- ORDERS & CHECKOUT LIFECYCLE ---
  // =========================================================================

  getOrders(): Order[] {
    return this.orders;
  }

  getOrderById(id: string): Order | undefined {
    return this.orders.find(o => o.id === id || o.orderNumber === id);
  }

  getOrdersByUser(email: string): Order[] {
    if (!email) return [];
    const normalized = email.trim().toLowerCase();
    return this.orders.filter(o => o.customerEmail.toLowerCase() === normalized);
  }

  createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>): Order {
    const orderNumber = `MW-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Authoritative recalculation of all financial lines
    const calculatedSubtotal = Math.round(
      orderData.items.reduce((sum, it) => sum + (it.product.priceChf * it.quantity), 0) * 100
    ) / 100;
    const shippingCost = orderData.shippingCostChf || 0;
    const grandTotal = Math.round((calculatedSubtotal + shippingCost) * 100) / 100;
    const vatAmount = Math.round(((grandTotal * 8.1) / 108.1) * 100) / 100;

    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      subtotalChf: calculatedSubtotal,
      shippingCostChf: shippingCost,
      vatChf: vatAmount,
      grandTotalChf: grandTotal,
      status: orderData.deliveryMethod === 'pickup' ? 'ready_for_pickup' : 'received',
      paymentStatus: orderData.paymentStatus || 'paid',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };

    // Decrement physical stock for each item & log adjustment
    for (const item of orderData.items) {
      const prod = this.getProductById(item.product.id);
      if (prod) {
        this.adjustStock(
          prod.id,
          -item.quantity,
          `Verkauf via Webshop / Bestellung ${orderNumber}`,
          'Webshop Automatisch'
        );
      }
    }

    this.orders.unshift(newOrder);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(this.orders));
    return newOrder;
  }

  updateOrderStatus(
    orderId: string, 
    status: Order['status'], 
    paymentStatus?: Order['paymentStatus'], 
    notes?: string
  ): boolean {
    const idx = this.orders.findIndex(o => o.id === orderId);
    if (idx !== -1) {
      const currentOrder = this.orders[idx];
      this.orders[idx] = {
        ...currentOrder,
        status,
        ...(paymentStatus ? { paymentStatus } : {}),
        ...(notes !== undefined ? { notes } : {})
      };
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(this.orders));
      return true;
    }
    return false;
  }

  cancelOrder(orderId: string, reason: string = 'Stornierung durch Kundendienst'): boolean {
    const idx = this.orders.findIndex(o => o.id === orderId);
    if (idx === -1) return false;

    const order = this.orders[idx];
    if (order.status === 'cancelled') return false; // Already cancelled

    // Restore stock for all line items
    for (const item of order.items) {
      const prod = this.getProductById(item.product.id);
      if (prod) {
        this.adjustStock(
          prod.id,
          item.quantity,
          `Stornierung Bestellung ${order.orderNumber}: ${reason}`,
          'Admin'
        );
      }
    }

    this.orders[idx] = {
      ...order,
      status: 'cancelled',
      paymentStatus: order.paymentStatus === 'paid' ? 'refunded' : order.paymentStatus,
      notes: `${order.notes ? order.notes + ' | ' : ''}Storniert: ${reason}`
    };
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(this.orders));
    return true;
  }

  // =========================================================================
  // --- ENQUIRIES (REPAIRS & SUBSCRIPTIONS) ---
  // =========================================================================

  getEnquiries(): CustomerEnquiry[] {
    return this.enquiries;
  }

  getEnquiriesByUser(email: string): CustomerEnquiry[] {
    if (!email) return [];
    const normalized = email.trim().toLowerCase();
    return this.enquiries.filter(e => e.email.toLowerCase() === normalized);
  }

  addEnquiry(enquiry: Omit<CustomerEnquiry, 'id' | 'createdAt' | 'status'>): CustomerEnquiry {
    const newEnquiry: CustomerEnquiry = {
      ...enquiry,
      id: `enq-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'new'
    };
    this.enquiries.unshift(newEnquiry);
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(this.enquiries));
    return newEnquiry;
  }

  updateEnquiryStatus(id: string, status: CustomerEnquiry['status'], adminNotes?: string): boolean {
    const idx = this.enquiries.findIndex(e => e.id === id);
    if (idx !== -1) {
      this.enquiries[idx] = {
        ...this.enquiries[idx],
        status,
        ...(adminNotes !== undefined ? { adminNotes } : {})
      };
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(this.enquiries));
      return true;
    }
    return false;
  }

  // =========================================================================
  // --- TELECOM CONTRACT GENERATOR & PDF SNAPSHOTS ---
  // =========================================================================

  getContracts(): Contract[] {
    return this.contractList;
  }

  getContractById(id: string): Contract | undefined {
    return this.contractList.find(c => c.id === id || c.contractNumber === id);
  }

  getContractsByCustomer(email: string): Contract[] {
    if (!email) return [];
    const normalized = email.trim().toLowerCase();
    return this.contractList.filter(c => c.customerEmail.toLowerCase() === normalized);
  }

  generateContract(data: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress?: string;
    customerCity?: string;
    customerPostalCode?: string;
    planId: string;
    durationMonths?: string;
    notes?: string;
  }): Contract {
    const plan = this.getSubscriptionById(data.planId) || this.subscriptionList[0];
    const contractNumber = `MW-CTR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Create immutable contract snapshot from plan data
    const newContract: Contract = {
      id: `ctr-${Date.now()}`,
      contractNumber,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      customerAddress: data.customerAddress || 'Schaffhauserstrasse 120',
      customerCity: data.customerCity || 'Zürich',
      customerPostalCode: data.customerPostalCode || '8052',
      planId: plan.id,
      planName: plan.name,
      provider: plan.provider,
      monthlyPriceChf: plan.discountPriceChf ?? plan.monthlyPriceChf,
      activationFeeChf: plan.activationFeeChf,
      durationMonths: data.durationMonths || plan.contractDuration,
      dataAllowance: plan.dataAllowance,
      roamingAllowance: plan.roamingAllowance,
      status: 'active',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      notes: data.notes || 'Vertragsabschluss autorisiert durch Mobile World Seebach.'
    };

    this.contractList.unshift(newContract);
    localStorage.setItem(STORAGE_KEYS.CONTRACTS, JSON.stringify(this.contractList));

    // Also update any matching enquiry for this customer
    const matchingEnquiry = this.enquiries.find(
      e => e.type === 'subscription' && e.email.toLowerCase() === data.customerEmail.toLowerCase()
    );
    if (matchingEnquiry) {
      this.updateEnquiryStatus(matchingEnquiry.id, 'completed', `Vertrag ${contractNumber} generiert.`);
    }

    return newContract;
  }

  updateContractStatus(id: string, status: Contract['status']): boolean {
    const idx = this.contractList.findIndex(c => c.id === id);
    if (idx !== -1) {
      this.contractList[idx] = {
        ...this.contractList[idx],
        status
      };
      localStorage.setItem(STORAGE_KEYS.CONTRACTS, JSON.stringify(this.contractList));
      return true;
    }
    return false;
  }

  deleteContract(id: string): boolean {
    const initialLen = this.contractList.length;
    this.contractList = this.contractList.filter(c => c.id !== id);
    if (this.contractList.length !== initialLen) {
      localStorage.setItem(STORAGE_KEYS.CONTRACTS, JSON.stringify(this.contractList));
      return true;
    }
    return false;
  }

  // =========================================================================
  // --- CUSTOMER DIRECTORY & USER ACCOUNTS ---
  // =========================================================================

  createCustomer(data: { fullName: string; email: string; phone?: string; address?: string; city?: string; postalCode?: string; role?: UserAccount['role'] }): UserAccount {
    const normalized = data.email.trim().toLowerCase();
    const existing = this.customerList.find(c => c.email.toLowerCase() === normalized);
    if (existing) {
      return existing;
    }
    const newCust: UserAccount = {
      id: `usr-${Date.now()}`,
      fullName: data.fullName.trim(),
      email: normalized,
      phone: data.phone?.trim() || '+41 79 123 45 67',
      address: data.address?.trim() || 'Schaffhauserstrasse 120',
      city: data.city?.trim() || 'Zürich',
      postalCode: data.postalCode?.trim() || '8052',
      role: data.role || 'customer',
      registeredAt: new Date().toISOString().split('T')[0]
    };
    this.customerList.unshift(newCust);
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(this.customerList));
    return newCust;
  }

  getCustomers(): UserAccount[] {
    return this.customerList;
  }

  getCustomerByEmail(email: string): UserAccount | undefined {
    if (!email) return undefined;
    const normalized = email.trim().toLowerCase();
    return this.customerList.find(c => c.email.toLowerCase() === normalized);
  }

  getCurrentUser(): UserAccount | null {
    return this.currentUser;
  }

  loginUser(email: string, fullName: string = 'Geschätzter Kunde', role: UserAccount['role'] = 'customer'): UserAccount {
    const normalized = email.trim().toLowerCase();
    let existing = this.customerList.find(c => c.email.toLowerCase() === normalized);

    if (!existing) {
      existing = {
        id: `usr-${Date.now()}`,
        fullName: fullName || 'Geschätzter Kunde',
        email: normalized,
        phone: '+41 79 123 45 67',
        role,
        address: 'Bahnhofstrasse 10',
        city: 'Zürich',
        postalCode: '8001',
        registeredAt: new Date().toISOString().split('T')[0]
      };
      this.customerList.push(existing);
      localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(this.customerList));
    }

    this.currentUser = existing;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(existing));
    return existing;
  }

  updateUser(updates: Partial<UserAccount>): UserAccount | null {
    if (!this.currentUser) return null;
    const updated = {
      ...this.currentUser,
      ...updates
    };
    this.currentUser = updated;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updated));

    // Also update in customerList
    const idx = this.customerList.findIndex(c => c.email.toLowerCase() === updated.email.toLowerCase());
    if (idx !== -1) {
      this.customerList[idx] = updated;
      localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(this.customerList));
    }

    return this.currentUser;
  }

  logoutUser(): void {
    this.currentUser = null;
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }

  // =========================================================================
  // --- STAFF & ADMIN AUTHORIZATION ---
  // =========================================================================

  verifyAdminAccess(secret: string): boolean {
    const trimmed = secret.trim();
    // Authorized credentials: Staff PIN '2026', passphrase 'mw-admin-2026', or 'admin'
    if (trimmed === '2026' || trimmed === 'mw-admin-2026' || trimmed === 'admin') {
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify({
        authenticated: true,
        authenticatedAt: new Date().toISOString()
      }));
      return true;
    }
    return false;
  }

  isAdminAuthenticated(): boolean {
    try {
      const session = sessionStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
      if (!session) return false;
      const parsed = JSON.parse(session);
      return !!parsed.authenticated;
    } catch {
      return false;
    }
  }

  setAdminSession(active: boolean): void {
    if (active) {
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify({
        authenticated: true,
        authenticatedAt: new Date().toISOString()
      }));
    } else {
      sessionStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    }
  }
}

export const mockDb = new MockDatabase();
