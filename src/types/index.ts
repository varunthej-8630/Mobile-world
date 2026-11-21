export type DeviceCategory = 'smartphone' | 'tablet' | 'smartwatch' | 'accessories';

export interface RepairPriceRecord {
  id: string;
  manufacturer: string; // Apple, Samsung, Google, Huawei, Xiaomi
  deviceCategory: DeviceCategory;
  model: string;
  repairTask: string; // Display OEM OLED, Display Soft OLED, Battery / Akku, Charging port, etc.
  priceChf: number;
  priceType: 'fixed' | 'from' | 'quote_required' | 'unavailable';
  qualityGrade?: 'OEM Original' | 'Premium Soft OLED' | 'Incell Standard' | 'High Capacity';
  durationEstimate: string; // e.g. "30–60 Min (Express)"
  warrantyMonths: number; // e.g. 6 or 12
  effectiveDate: string;
  active: boolean;
  notes?: string;
  supportedBranches: string[]; // ["Seebach", "Bellevue", "Rüti", "Oberengstringen"]
  lastUpdated: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  provider: 'Sunrise' | 'Salt' | 'yallo' | 'LEBARA' | 'Mobile World Care';
  monthlyPriceChf: number;
  discountPriceChf?: number;
  dataAllowance: string; // "Unlimitiert 5G (CH)"
  callsAndSms: string; // "Unlimitiert in alle CH-Netze"
  roamingAllowance: string; // "1 GB EU/USA" or "Kein Roaming inklusive"
  speed: string; // "Bis zu 1 Gbit/s"
  contractDuration: string; // "Ohne Mindestlaufzeit" or "12/24 Monate"
  activationFeeChf: number;
  highlightBadge?: string;
  features: string[];
  active?: boolean;
  published?: boolean;
  displayOrder?: number;
  lastVerified: string;
}

export type ProductCondition = 'new' | 'refurbished_a_plus' | 'refurbished_a' | 'refurbished_b';
export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock' | 'to_confirm';

export interface Product {
  id: string;
  sku: string;
  brand: string;
  name: string;
  category: 'smartphones' | 'refurbished' | 'tablets' | 'smartwatches' | 'accessories' | 'audio' | 'chargers' | 'cases';
  priceChf: number;
  originalPriceChf?: number;
  condition: ProductCondition;
  stockStatus: StockStatus;
  quantityOnHand: number;
  lowStockThreshold: number;
  imageUrl: string;
  secondaryImages?: string[];
  color?: string;
  storage?: string;
  shortDescription: string;
  description?: string;
  specs: Record<string, string>;
  features?: string[];
  featured?: boolean;
  active?: boolean;
  inStock?: boolean;
  warrantyPeriod: string;
  warrantyMonths?: number;
  lastStockUpdate: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Branch {
  id: string;
  name: string;
  slug: string;
  isHeadquarters: boolean;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  whatsapp: string;
  email: string;
  openingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  googleMapsUrl: string;
  transitInfo: string;
  features: string[];
  imageUrl: string;
}

export interface CustomerEnquiry {
  id: string;
  type: 'repair' | 'subscription' | 'buy_sell' | 'business' | 'general';
  customerName: string;
  email: string;
  phone: string;
  branch: string;
  details: Record<string, any>;
  message: string;
  createdAt: string;
  status: 'new' | 'in_progress' | 'completed' | 'cancelled';
  adminNotes?: string;
  contractId?: string;
}

export interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role?: 'customer' | 'admin' | 'staff';
  address?: string;
  city?: string;
  postalCode?: string;
  registeredAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryMethod: 'pickup' | 'post';
  shippingCostChf: number;
  subtotalChf: number;
  vatChf: number;
  grandTotalChf: number;
  items: CartItem[];
  status: 'received' | 'processing' | 'ready_for_pickup' | 'shipped' | 'completed' | 'cancelled';
  paymentStatus?: 'pending' | 'paid' | 'refunded';
  notes?: string;
  createdAt: string;
}

export interface Contract {
  id: string;
  contractNumber: string;
  customerId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress?: string;
  customerCity?: string;
  customerPostalCode?: string;
  planId: string;
  planName: string;
  provider: string;
  monthlyPriceChf: number;
  activationFeeChf: number;
  durationMonths: string;
  dataAllowance: string;
  roamingAllowance: string;
  status: 'draft' | 'pending_signature' | 'active' | 'archived';
  createdAt: string;
  notes?: string;
}

export interface InventoryAdjustmentLog {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  previousQuantity: number;
  adjustment: number;
  newQuantity: number;
  reason: string;
  performedBy: string;
  timestamp: string;
}

export interface PriceAuditLogEntry {
  id: string;
  repairId: string;
  model: string;
  task: string;
  oldPriceChf: number;
  newPriceChf: number;
  changedBy: string;
  timestamp: string;
}
