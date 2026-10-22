# Mobile World Zürich — Premium Website Redesign & Client Prototype

> **Prepared by:** Homies Studio (Varun Thej)  
> **Client:** Mobile World ZH Seebach, Zürich, Switzerland  
> **Type:** High-End Website Redesign & Functional Client Demonstration  
> **Status:** Fully Functional & Tested Prototype  

---

## 🚀 Quick Start (Running Locally)

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### 2. Development Server
```bash
npm install
npm run dev
```
Open **`http://localhost:5173/`** in your browser.

### 3. Production Build & Preview
```bash
npm run build
npm run preview
```

---

## 📱 Core Features & User Journeys

1. **Cinematic Hero & Swiss Editorial Layout**
   - Authentic Mobile World cinematic background video (`mobile-world.mp4`).
   - Space Grotesk editorial typography with Swiss contrast standards.
   - Dual high-conversion CTAs: *"Find Your Repair Price"* & *"Explore the Shop"*.

2. **Interactive Repair Price Finder (`/repair-prices`)**
   - Cascading 4-step selector: Device Category → Manufacturer → Model → Repair Task.
   - Transparent Swiss pricing in CHF, duration estimates (e.g. 30–45 min), and 6 months warranty.
   - Instant non-binding repair enquiry modal prefilled with exact device and repair data.

3. **Carrier Subscription Comparison (`/subscriptions`)**
   - Direct side-by-side comparison of Sunrise, Salt, yallo, and LEBARA plans.
   - Transparent monthly fees, 5G speeds, roaming inclusions, and plan enquiry modal.

4. **Product Catalog & Stock Management (`/shop`)**
   - Categories: Smartphones, Refurbished, Tablets, Smartwatches, Audio, Accessories.
   - Real-time stock status badge (*"Verfügbar"*, *"Nur noch wenige"*, *"Ausverkauft"*).
   - Dynamic slide-over Cart Drawer (`/cart`) with Swiss Post shipping and Seebach store pickup.

5. **Customer Account Experience (`/account` & `/account/profile`)**
   - Login, registration, and password recovery simulation with 1-click test accounts.
   - Customer profile with editable contact details, registered devices, and enquiry history.

6. **Staff Admin Cockpit (`/admin`)**
   - **Repair Price Manager:** Live inline price editing for all models and parts.
   - **Inventory & Stock Management:** Instant stock adjustments (+/-) and low-stock filtering.
   - **Customer Enquiries Inbox:** Centralized lead management for repair and subscription requests.

7. **Branch Directory & Swiss Legal Standards**
   - Detailed branch profile for **Seebach HQ** (Schaffhauserstrasse 455, 8052 Zürich) with Google Maps directions, phone, and direct WhatsApp links.
   - Legal pages compliant with Swiss revDSG (Datenschutz) and AGB.

---

## 🎨 Design System Tokens

| Token | Hex | Usage |
| :--- | :--- | :--- |
| **Midnight Graphite** | `#101318` | Cinematic hero, footer, headings |
| **Electric Cobalt** | `#174CFF` | Primary action buttons, links, active state |
| **Soft Porcelain** | `#F5F6F8` | Main page backgrounds & clean sections |
| **Pure White** | `#FFFFFF` | Product cards, forms, content modals |
| **Technical Silver** | `#AAB2C0` | Borders, subtle dividers, metadata |
| **Accent Lime** | `#D9FF70` | Rare high-impact accent badges |

---

## 📄 Client Deliverables & Verification
A detailed requirement-by-requirement verification report is available at:
`MOBILE_WORLD_DELIVERY_REPORT.md`
