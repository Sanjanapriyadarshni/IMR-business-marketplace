import React, { useState } from 'react';
import { useIMR } from './context/IMRContext';
import { Navbar } from './components/common/Navbar';
import { BottomNav } from './components/common/BottomNav';
import { ToastContainer } from './components/common/ToastContainer';
import { SafetyModal } from './components/common/SafetyModal';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';

// Views
import { HomeDashboard } from './components/home/HomeDashboard';
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

export function AppContent() {
  const { activeTab, isMobileFrame, setIsMobileFrame } = useIMR();
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [safetyModalOpen, setSafetyModalOpen] = useState(false);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeDashboard onOpenSearch={() => setSearchModalOpen(true)} />;
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
        return <HomeDashboard onOpenSearch={() => setSearchModalOpen(true)} />;
    }
  };

  // If Mobile Frame Mode is active
  if (isMobileFrame) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-2 sm:p-6 select-none font-sans">
        {/* Device Wrapper */}
        <div className="w-full max-w-[420px] h-[92vh] max-h-[890px] bg-slate-950 rounded-[48px] border-[10px] border-slate-800 shadow-2xl relative flex flex-col overflow-hidden ring-1 ring-slate-700/50">
          {/* Mobile Notch / Dynamic Island */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-5 bg-slate-800 rounded-b-2xl z-50 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-slate-950 mr-2" />
            <div className="w-2 h-2 rounded-full bg-blue-900" />
          </div>

          {/* Internal Mobile Screen */}
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-950 text-slate-100 relative">
            <Navbar
              onOpenSearch={() => setSearchModalOpen(true)}
              onOpenSafety={() => setSafetyModalOpen(true)}
            />

            <main className="flex-1 overflow-y-auto pb-24 no-scrollbar">
              {renderActiveTab()}
            </main>

            <BottomNav />
          </div>
        </div>

        {/* Floating Toggle Controls outside frame */}
        <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
          <span>Viewing in Mobile Phone Simulation Mode</span>
          <button
            onClick={() => setIsMobileFrame(false)}
            className="text-teal-400 hover:text-teal-300 font-semibold underline"
          >
            Switch to Full Responsive Desktop View
          </button>
        </div>

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

  // Full Screen Responsive View
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-slate-950">
      <Navbar
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenSafety={() => setSafetyModalOpen(true)}
      />

      <main className="flex-1 pb-24 md:pb-12">
        {renderActiveTab()}
      </main>

      <BottomNav />

      {/* Global Modals */}
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
  return <AppContent />;
}
