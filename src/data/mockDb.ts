import { RepairPriceRecord, Product, CustomerEnquiry, UserAccount } from '../types';
import { REPAIR_PRICE_CATALOG } from './repairPrices';
import { INITIAL_PRODUCTS } from './products';

const STORAGE_KEYS = {
  REPAIRS: 'mw_repairs_v1',
  PRODUCTS: 'mw_products_v1',
  ENQUIRIES: 'mw_enquiries_v1',
  CURRENT_USER: 'mw_user_v1'
};

class MockDatabase {
  private repairList: RepairPriceRecord[];
  private productList: Product[];
  private enquiries: CustomerEnquiry[];
  private currentUser: UserAccount | null;

  constructor() {
    // Load from localStorage or defaults
    const savedRepairs = localStorage.getItem(STORAGE_KEYS.REPAIRS);
    this.repairList = savedRepairs ? JSON.parse(savedRepairs) : [...REPAIR_PRICE_CATALOG];

    const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    this.productList = savedProducts ? JSON.parse(savedProducts) : [...INITIAL_PRODUCTS];

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
        status: 'in_progress'
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
        status: 'new'
      }
    ];

    const savedUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    this.currentUser = savedUser ? JSON.parse(savedUser) : null;
  }

  // --- REPAIRS ---
  getRepairs(): RepairPriceRecord[] {
    return this.repairList;
  }

  updateRepair(id: string, updates: Partial<RepairPriceRecord>): boolean {
    const idx = this.repairList.findIndex(r => r.id === id);
    if (idx !== -1) {
      this.repairList[idx] = {
        ...this.repairList[idx],
        ...updates,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      localStorage.setItem(STORAGE_KEYS.REPAIRS, JSON.stringify(this.repairList));
      return true;
    }
    return false;
  }

  addRepair(record: RepairPriceRecord): void {
    this.repairList.unshift(record);
    localStorage.setItem(STORAGE_KEYS.REPAIRS, JSON.stringify(this.repairList));
  }

  resetRepairs(): void {
    this.repairList = [...REPAIR_PRICE_CATALOG];
    localStorage.setItem(STORAGE_KEYS.REPAIRS, JSON.stringify(this.repairList));
  }

  // --- PRODUCTS & STOCK ---
  getProducts(): Product[] {
    return this.productList;
  }

  getProductById(id: string): Product | undefined {
    return this.productList.find(p => p.id === id || p.sku === id);
  }

  updateProductStock(id: string, newQuantity: number): boolean {
    const idx = this.productList.findIndex(p => p.id === id);
    if (idx !== -1) {
      const p = this.productList[idx];
      let status: Product['stockStatus'] = 'in_stock';
      if (newQuantity <= 0) {
        status = 'out_of_stock';
      } else if (newQuantity <= p.lowStockThreshold) {
        status = 'low_stock';
      }

      this.productList[idx] = {
        ...p,
        quantityOnHand: Math.max(0, newQuantity),
        stockStatus: status,
        lastStockUpdate: new Date().toISOString().split('T')[0]
      };
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(this.productList));
      return true;
    }
    return false;
  }

  updateProductPrice(id: string, newPrice: number): boolean {
    const idx = this.productList.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.productList[idx] = {
        ...this.productList[idx],
        priceChf: newPrice
      };
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(this.productList));
      return true;
    }
    return false;
  }

  resetProducts(): void {
    this.productList = [...INITIAL_PRODUCTS];
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(this.productList));
  }

  // --- ENQUIRIES ---
  getEnquiries(): CustomerEnquiry[] {
    return this.enquiries;
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

  // --- USER AUTH ---
  getCurrentUser(): UserAccount | null {
    return this.currentUser;
  }

  loginUser(email: string, fullName: string = 'Geschätzter Kunde'): UserAccount {
    const user: UserAccount = {
      id: `usr-${Date.now()}`,
      fullName,
      email,
      phone: '+41 79 123 45 67',
      address: 'Bahnhofstrasse 10',
      city: 'Zürich',
      postalCode: '8001',
      registeredAt: new Date().toISOString().split('T')[0]
    };
    this.currentUser = user;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    return user;
  }

  logoutUser(): void {
    this.currentUser = null;
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
}

export const mockDb = new MockDatabase();
