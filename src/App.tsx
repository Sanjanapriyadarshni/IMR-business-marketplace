import React, { useState, useEffect } from 'react';
import { useIMR } from './context/IMRContext';
import { CursorProvider } from './context/CursorContext';
import { CustomCursor } from './components/cursor/CustomCursor';
import { ScrollProgressBar } from './components/navigation/ScrollProgressBar';
import { FloatingNav } from './components/navigation/FloatingNav';
import { EditorialFooter } from './components/common/EditorialFooter';
import { ToastContainer } from './components/common/ToastContainer';
import { SafetyModal } from './components/common/SafetyModal';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';

// Immersive 5-Stage Core Sections
import { DiscoverHero } from './components/immersive/DiscoverHero';
import { GlobalMarketsExplorer } from './components/immersive/GlobalMarketsExplorer';
import { StakeholderBento } from './components/immersive/StakeholderBento';
import { InnovationShowcase } from './components/immersive/InnovationShowcase';
import { UnifiedSpatialMarketplace } from './components/immersive/UnifiedSpatialMarketplace';

// Deep Functional Subviews
import { BusinessIdeasMarketplace } from './components/ideas/BusinessIdeasMarketplace';
import { GlobalTradeMarketplace } from './components/trade/GlobalTradeMarketplace';
import { CountryExplorer } from './components/countries/CountryExplorer';
import { OpportunityMatchingSystem } from './components/matching/OpportunityMatchingSystem';
import { BusinessOpportunityFeed } from './components/feed/BusinessOpportunityFeed';
import { AIBusinessIdeaGenerator } from './components/ai/AIBusinessIdeaGenerator';
import { FutureAndAdvancedTech } from './components/future-tech/FutureAndAdvancedTech';
import { InAppMessaging } from './components/messages/InAppMessaging';
import { UserProfileSection } from './components/profile/UserProfileSection';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { MonetizationSection } from './components/monetization/MonetizationSection';

// Shared Modals
import { IdeaDetailModal } from './components/ideas/IdeaDetailModal';
import { ProductDetailModal } from './components/trade/ProductDetailModal';
import { PostIdeaModal } from './components/ideas/PostIdeaModal';
import { PostProductModal } from './components/trade/PostProductModal';
import { RFQModal } from './components/trade/RFQModal';

import { ArrowLeft, Sparkles, Globe2, ShieldCheck, Compass } from 'lucide-react';
import type { BusinessIdea, TradeProduct } from './types';

export function AppContent() {
  const {
    activeTab,
    setActiveTab,
    isMobileFrame,
    setIsMobileFrame,
    setSelectedCountryForExplorer,
  } = useIMR();

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [safetyModalOpen, setSafetyModalOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<BusinessIdea | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<TradeProduct | null>(null);
  const [rfqProduct, setRfqProduct] = useState<TradeProduct | null>(null);
  const [postIdeaOpen, setPostIdeaOpen] = useState(false);
  const [postProductOpen, setPostProductOpen] = useState(false);

  // Keyboard shortcut listener for Command/Ctrl + K to open search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderActiveDeepView = () => {
    switch (activeTab) {
      case 'ideas':
        return <BusinessIdeasMarketplace />;
      case 'trade':
        return <GlobalTradeMarketplace />;
      case 'countries':
        return <CountryExplorer />;
      case 'matching':
        return <OpportunityMatchingSystem />;
      case 'feed':
        return <BusinessOpportunityFeed />;
      case 'ai_generator':
        return <AIBusinessIdeaGenerator />;
      case 'advanced_tech':
        return <FutureAndAdvancedTech />;
      case 'messages':
        return <InAppMessaging />;
      case 'profile':
        return <UserProfileSection />;
      case 'admin':
        return <AdminDashboard />;
      case 'monetization':
        return <MonetizationSection />;
      default:
        return null;
    }
  };

  const getSubViewTitle = () => {
    switch (activeTab) {
      case 'ideas':
        return 'Commercial Ideas & IP Licensing Canvas';
      case 'trade':
        return 'Global Trade Cargo, Customs & HS Tariffs';
      case 'countries':
        return 'Bilateral Country Intelligence & Trade Pacts';
      case 'matching':
        return 'Automated Opportunity Matching Matrix';
      case 'feed':
        return 'Live Trade Opportunities & Community Feed';
      case 'ai_generator':
        return 'AI Cross-Border Arbitrage Synthesizer';
      case 'advanced_tech':
        return 'Frontier DeepTech & Empirical Physics Registry';
      case 'messages':
        return 'In-App Secure Trade & Deal Negotiation';
      case 'profile':
        return 'Stakeholder Persona & Verification Center';
      case 'admin':
        return 'IMR Platform Trust & Moderation Portal';
      case 'monetization':
        return 'Enterprise Verification & Escrow Services';
      default:
        return 'Exchange Module';
    }
  };

  return (
    <div className="min-h-screen bg-[#F3EFE7] text-[#171717] flex flex-col font-sans selection:bg-[#FF5A36] selection:text-[#FFFDF8] relative">
      {/* Scroll Progress Stage Marker */}
      <ScrollProgressBar />

      {/* Floating Dynamic Navbar */}
      <FloatingNav
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenSafety={() => setSafetyModalOpen(true)}
      />

      {/* Main Content Area */}
      {activeTab === 'home' ? (
        /* The 5-Stage Immersive Scroll-Driven Journey */
        <main className="flex-1">
          {/* Stage 01 // DISCOVER */}
          <DiscoverHero
            onExploreMarkets={() => {
              const el = document.getElementById('global-markets');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onPostIdea={() => setPostIdeaOpen(true)}
            onSelectIdea={(idea) => setSelectedIdea(idea)}
            onSelectProduct={(product) => setSelectedProduct(product)}
          />

          {/* Stage 02 // EXPLORE */}
          <GlobalMarketsExplorer
            onOpenCountry={(code) => {
              setSelectedCountryForExplorer(code);
              setActiveTab('countries');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreProducts={() => {
              setActiveTab('trade');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Stage 03 // CONNECT */}
          <StakeholderBento
            onSelectUser={(user) => {
              setActiveTab('profile');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenMessages={(userId) => {
              setActiveTab('messages');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onViewAllProfiles={() => {
              setActiveTab('profile');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Stage 04 // CREATE */}
          <InnovationShowcase
            onSelectIdea={(idea) => setSelectedIdea(idea)}
            onOpenAIGenerator={() => {
              setActiveTab('ai_generator');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAdvancedTech={() => {
              setActiveTab('advanced_tech');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onPostIdea={() => setPostIdeaOpen(true)}
          />

          {/* Stage 05 // MARKETPLACE */}
          <UnifiedSpatialMarketplace
            onSelectProduct={(product) => setSelectedProduct(product)}
            onSelectIdea={(idea) => setSelectedIdea(idea)}
            onOpenRFQModal={(product) => setRfqProduct(product)}
            onOpenPostProduct={() => setPostProductOpen(true)}
            onNavigateToMatching={() => {
              setActiveTab('matching');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToAllTrade={() => {
              setActiveTab('trade');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Editorial Footer */}
          <EditorialFooter
            onOpenSafety={() => setSafetyModalOpen(true)}
            onSelectCountry={(code) => {
              setSelectedCountryForExplorer(code);
              setActiveTab('countries');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      ) : (
        /* Deep Subview Mode with Breadcrumb & Ivory Scoping */
        <main className="flex-1 pt-28 sm:pt-32 pb-16 px-4 sm:px-8 max-w-7xl mx-auto w-full">
          {/* Subview Return Bar */}
          <div className="mb-8 p-4 rounded-3xl bg-[#FFFDF8] border border-[#D8D2C7] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setActiveTab('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-xl bg-[#F3EFE7] hover:bg-[#EBE5DA] text-[#171717] border border-[#D8D2C7] text-xs font-mono font-bold tracking-wider uppercase transition-colors flex items-center gap-2 group"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>Return to Spatial Home</span>
              </button>

              <div className="h-4 w-px bg-[#D8D2C7] hidden sm:block" />

              <div>
                <span className="text-[10px] font-mono uppercase text-[#6B6B63] block">
                  Active Module:
                </span>
                <h1 className="font-editorial text-lg sm:text-xl font-bold text-[#171717] leading-none">
                  {getSubViewTitle()}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => setSearchModalOpen(true)}
                className="px-3.5 py-1.5 rounded-full bg-[#F3EFE7] border border-[#D8D2C7] text-xs font-mono text-[#6B6B63] hover:text-[#171717] transition-colors flex items-center gap-1.5"
              >
                <span>Search Module</span>
                <kbd className="px-1.5 py-0.5 rounded bg-[#FFFDF8] border border-[#D8D2C7] text-[10px]">⌘K</kbd>
              </button>
            </div>
          </div>

          {/* Deep Subview Container */}
          <div className="theme-ivory-scope">
            {renderActiveDeepView()}
          </div>

          {/* Editorial Footer for Subviews */}
          <div className="mt-20">
            <EditorialFooter
              onOpenSafety={() => setSafetyModalOpen(true)}
              onSelectCountry={(code) => {
                setSelectedCountryForExplorer(code);
                setActiveTab('countries');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        </main>
      )}

      {/* Global Modals */}
      <IdeaDetailModal
        idea={selectedIdea}
        onClose={() => setSelectedIdea(null)}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <PostIdeaModal
        isOpen={postIdeaOpen}
        onClose={() => setPostIdeaOpen(false)}
      />

      <PostProductModal
        isOpen={postProductOpen}
        onClose={() => setPostProductOpen(false)}
      />

      <RFQModal
        product={rfqProduct}
        isOpen={Boolean(rfqProduct)}
        onClose={() => setRfqProduct(null)}
      />

      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />

      <SafetyModal
        isOpen={safetyModalOpen}
        onClose={() => setSafetyModalOpen(false)}
      />

      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <CursorProvider>
      <CustomCursor />
      <AppContent />
    </CursorProvider>
  );
}
