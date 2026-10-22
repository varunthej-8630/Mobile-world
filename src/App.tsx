import React, { useState, useEffect } from 'react';
import { PrototypeBanner } from './components/layout/PrototypeBanner';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/common/SearchModal';
import { CartDrawer } from './components/shop/CartDrawer';
import { RepairEnquiryModal } from './components/repair/RepairEnquiryModal';
import { SubscriptionEnquiryModal } from './components/subscription/SubscriptionEnquiryModal';
import { CinematicIntro } from './components/common/CinematicIntro';

// Pages
import { HomePage } from './pages/HomePage';
import { RepairsPage } from './pages/RepairsPage';
import { RepairPricesPage } from './pages/RepairPricesPage';
import { SubscriptionsPage } from './pages/SubscriptionsPage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { ServicesPage } from './pages/ServicesPage';
import { InsurancePage } from './pages/InsurancePage';
import { DeviceSupportPage } from './pages/DeviceSupportPage';
import { BuySellPage } from './pages/BuySellPage';
import { BusinessPage } from './pages/BusinessPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { LocationsPage } from './pages/LocationsPage';
import { SeebachLocationPage } from './pages/SeebachLocationPage';
import { AccountLoginPage } from './pages/AccountLoginPage';
import { AccountProfilePage } from './pages/AccountProfilePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { ImprintPage } from './pages/ImprintPage';

import { RepairPriceRecord, SubscriptionPlan } from './types';

export const App: React.FC = () => {
  // Routing state based on hash or default to '/'
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const hash = window.location.hash.replace(/^#/, '');
    return hash || '/';
  });

  // Modal states
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedRepairForEnquiry, setSelectedRepairForEnquiry] = useState<RepairPriceRecord | null>(null);
  const [selectedPlanForEnquiry, setSelectedPlanForEnquiry] = useState<SubscriptionPlan | null>(null);

  // Synchronize hash with currentPath
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '');
      setCurrentPath(hash || '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper route matcher
  const renderCurrentPage = () => {
    // 1. Product Detail route: /product/:id
    if (currentPath.startsWith('/product/')) {
      const productId = currentPath.replace('/product/', '');
      return <ProductDetailPage productId={productId} onNavigate={handleNavigate} />;
    }

    // 2. Shop Category route: /shop/category/:slug
    if (currentPath.startsWith('/shop/category/')) {
      const catSlug = currentPath.replace('/shop/category/', '');
      return <ShopPage initialCategory={catSlug} onNavigate={handleNavigate} />;
    }

    // 3. Exact routes
    switch (currentPath) {
      case '/':
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenRepairEnquiry={(repair) => setSelectedRepairForEnquiry(repair)}
            onOpenSubEnquiry={(plan) => setSelectedPlanForEnquiry(plan)}
          />
        );

      case '/repairs':
        return <RepairsPage onNavigate={handleNavigate} />;

      case '/repair-prices':
        return (
          <RepairPricesPage
            onNavigate={handleNavigate}
            onOpenEnquiry={(repair) => setSelectedRepairForEnquiry(repair)}
          />
        );

      case '/subscriptions':
        return (
          <SubscriptionsPage
            onNavigate={handleNavigate}
            onOpenEnquiry={(plan) => setSelectedPlanForEnquiry(plan)}
          />
        );

      case '/shop':
        return <ShopPage onNavigate={handleNavigate} />;

      case '/cart':
        return <CartPage onNavigate={handleNavigate} />;

      case '/services':
        return <ServicesPage onNavigate={handleNavigate} />;

      case '/services/insurance':
        return <InsurancePage onNavigate={handleNavigate} />;

      case '/services/device-support':
        return <DeviceSupportPage onNavigate={handleNavigate} />;

      case '/buy-sell':
        return <BuySellPage onNavigate={handleNavigate} />;

      case '/business':
        return <BusinessPage onNavigate={handleNavigate} />;

      case '/faq':
        return <FaqPage onNavigate={handleNavigate} />;

      case '/contact':
        return <ContactPage onNavigate={handleNavigate} />;

      case '/locations':
        return <LocationsPage onNavigate={handleNavigate} />;

      case '/locations/seebach':
        return <SeebachLocationPage onNavigate={handleNavigate} />;

      case '/account':
      case '/account/register':
      case '/account/forgot-password':
        return <AccountLoginPage onNavigate={handleNavigate} />;

      case '/account/profile':
        return <AccountProfilePage onNavigate={handleNavigate} />;

      case '/admin':
        return <AdminDashboardPage onNavigate={handleNavigate} />;

      case '/privacy':
        return <PrivacyPage onNavigate={handleNavigate} />;

      case '/terms':
        return <TermsPage onNavigate={handleNavigate} />;

      case '/imprint':
        return <ImprintPage onNavigate={handleNavigate} />;

      default:
        // Fallback to Home if unknown route
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenRepairEnquiry={(repair) => setSelectedRepairForEnquiry(repair)}
            onOpenSubEnquiry={(plan) => setSelectedPlanForEnquiry(plan)}
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-porcelain text-graphite antialiased font-sans">
      {/* Cinematic Opening Intro Animation (plays once per session) */}
      <CinematicIntro />

      {/* Top Prototype Transparency Banner */}
      <PrototypeBanner onNavigate={handleNavigate} />

      {/* Main Header */}
      <Header
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Page Content View */}
      <main className="flex-1" style={{ paddingTop: currentPath === '/' ? '0' : '84px' }}>
        {renderCurrentPage()}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Modals & Drawers */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      <CartDrawer onNavigate={handleNavigate} />

      {selectedRepairForEnquiry && (
        <RepairEnquiryModal
          repair={selectedRepairForEnquiry}
          onClose={() => setSelectedRepairForEnquiry(null)}
        />
      )}

      {selectedPlanForEnquiry && (
        <SubscriptionEnquiryModal
          plan={selectedPlanForEnquiry}
          onClose={() => setSelectedPlanForEnquiry(null)}
        />
      )}
    </div>
  );
};
export default App;
