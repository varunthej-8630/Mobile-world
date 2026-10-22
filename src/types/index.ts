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
  specs: Record<string, string>;
  featured?: boolean;
  warrantyPeriod: string;
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
  status: 'new' | 'in_progress' | 'completed';
}

export interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  postalCode?: string;
  registeredAt: string;
}
