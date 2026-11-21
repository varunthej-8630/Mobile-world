import type { RepairPriceRecord } from '../types';
import rawCatalog from './repairCatalogData.json';

export const MANUFACTURERS = [
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
  'OnePlus',
  'Alle Hersteller'
] as const;

export type Manufacturer = typeof MANUFACTURERS[number];

export const REPAIR_PRICE_CATALOG: RepairPriceRecord[] = rawCatalog as RepairPriceRecord[];
