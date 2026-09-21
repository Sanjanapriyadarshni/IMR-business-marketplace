import React, { useState, useEffect } from 'react';
import { useIMR } from '../../context/IMRContext';
import {
  Compass,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Package,
  Globe2,
  Users,
  Lightbulb,
  DollarSign,
  Briefcase,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { IdeaDetailModal } from '../ideas/IdeaDetailModal';
import { ProductDetailModal } from '../trade/ProductDetailModal';
import type { BusinessIdea, TradeProduct } from '../../types';

export const OpportunityMatchingSystem: React.FC = () => {
  const {
    ideas,
    products,
    users,
    countries,
    matchingInitialPreset,
    setMatchingInitialPreset,
    setActiveTab,
    setSelectedCountryForExplorer,
  } = useIMR();

  const [activeMode, setActiveMode] = useState<'preset_export' | 'preset_budget' | 'custom'>(
    matchingInitialPreset === 'budget_10lakh'
      ? 'preset_budget'
      : matchingInitialPreset === 'export_organic'
      ? 'preset_export'
      : 'preset_export'
  );

  useEffect(() => {
    if (matchingInitialPreset) {
      if (matchingInitialPreset === 'export_organic') setActiveMode('preset_export');
      if (matchingInitialPreset === 'budget_10lakh') setActiveMode('preset_budget');
    }
  }, [matchingInitialPreset]);

  // Selected entities for modals
  const [selectedIdea, setSelectedIdea] = useState<BusinessIdea | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<TradeProduct | null>(null);

  // Custom Matchmaker inputs
  const [customGoal, setCustomGoal] = useState<'start_business' | 'export_goods' | 'import_goods' | 'invest'>('start_business');
  const [customBudget, setCustomBudget] = useState<number>(20000);
  const [customIndustry, setCustomIndustry] = useState<string>('Food & Beverages');
  const [customCountry, setCustomCountry] = useState<string>('India');
  const [customRisk, setCustomRisk] = useState<'low' | 'moderate' | 'high'>('moderate');

  // Compute matched data for Preset 1: "I want to export organic food products from India"
  const organicExportMatches = {
    destinationCountries: [
      { name: 'United Arab Emirates', flag: '🇦🇪', code: 'AE', advantage: '0% CEPA Duty, 3-day ocean transit from Mundra Port to Jebel Ali, huge supermarket demand in Dubai.' },
      { name: 'Germany', flag: '🇩🇪', code: 'DE', advantage: 'Europe’s largest organic market (€15B), high premium paid for EU Bio-Siegel compliant spices & turmeric oleoresin.' },
      { name: 'United States', flag: '🇺🇸', code: 'US', advantage: 'High D2C supplement demand, zero-tariff under select NOP organic equivalence schedules.' },
    ],
    verifiedBuyers: users.filter((u) => u.role === 'importer' || u.role === 'buyer'),
    activeProducts: products.filter((p) => p.category === 'Food & Beverages'),
    relevantIdeas: ideas.filter((i) => i.category === 'Food & Beverages' || i.category === 'Agriculture'),
    strategicOpportunities: [
      'Turmeric & Moringa Curcuminoid Extraction: 6x gross margins over raw bulk root export.',
      'Single-origin certified cumin & pepper with Eurofins batch analysis pre-cleared for Hamburg delivery.',
      'FSSAI + APEDA Star Export House subsidies available for cold-chain pack-houses.',
    ],
  };

  // Compute matched data for Preset 2: "I want to start a business with ₹10 lakh investment"
  const budget10LakhMatches = {
    budgetUSD: '$12,000 (~₹10,00,000)',
    matchedIdeas: ideas.filter((i) => i.requiredInvestment <= 15000),
    topSectors: ['Sustainable Packaging (Bagasse)', 'Solar Micro Cold Storage', 'AI Customs Code Automation', 'Organic Oleoresin Blending'],
    recommendedLaunchPlan: [
      { step: '1. Model Selection', desc: 'Solar Micro Cold Storage or Agri Bio-composites offer 40% gross margins and fast breakeven within 14 months.' },
      { step: '2. Low Capex Structure', desc: 'Lease prefabricated modular machinery instead of outright factory purchase to keep initial outlay under ₹8 Lakhs.' },
      { step: '3. Government Subsidies', desc: 'Eligible for 35% capital subsidy under PMFME & MSME Credit Guarantee (CGTMSE) schemes.' },
    ],
  };

  // Compute custom matches
  const customMatchedIdeas = ideas.filter((i) => {
    const budgetMatch = i.requiredInvestment <= customBudget * 1.5;
    const catMatch = i.category.toLowerCase().includes(customIndustry.toLowerCase()) || customIndustry === 'All';
    return budgetMatch || catMatch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-4">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 font-bold uppercase tracking-wider">
            Intelligent Cross-Border Engine
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Opportunity Matching System
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Algorithmic matchmaking connecting trade goals, budgets, and market demand with verified buyers and ideas.
        </p>
      </div>

      {/* Preset Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => {
            setActiveMode('preset_export');
            setMatchingInitialPreset('export_organic');
          }}
          className={`p-4 rounded-2xl text-left border transition-all ${
            activeMode === 'preset_export'
              ? 'bg-gradient-to-br from-emerald-950/60 to-slate-900 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-white'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Trade Preset 1
            </span>
            <span className="text-lg">🇮🇳 ➔ 🌍</span>
          </div>
          <h3 className="font-bold text-sm text-white leading-snug">
            “I want to export organic food products from India.”
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">
            Matches verified buyers, high-demand countries (UAE, Germany), HS codes & ideas.
          </p>
        </button>

        <button
          onClick={() => {
            setActiveMode('preset_budget');
            setMatchingInitialPreset('budget_10lakh');
          }}
          className={`p-4 rounded-2xl text-left border transition-all ${
            activeMode === 'preset_budget'
              ? 'bg-gradient-to-br from-teal-950/60 to-slate-900 border-teal-500 text-white shadow-lg shadow-teal-500/10'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-white'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
              Investment Preset 2
            </span>
            <span className="text-lg">💰 ₹10 Lakh</span>
          </div>
          <h3 className="font-bold text-sm text-white leading-snug">
            “I want to start a business with ₹10 lakh investment.”
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">
            Curated ideas with payback schedules, required skills, and risk profiles.
          </p>
        </button>

        <button
          onClick={() => setActiveMode('custom')}
          className={`p-4 rounded-2xl text-left border transition-all ${
            activeMode === 'custom'
              ? 'bg-gradient-to-br from-amber-950/60 to-slate-900 border-amber-500 text-white shadow-lg shadow-amber-500/10'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-white'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Custom Matchmaker
            </span>
            <Compass className="w-5 h-5 text-amber-400" />
          </div>
          <h3 className="font-bold text-sm text-white leading-snug">
            Interactive Goal & Capital Builder
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">
            Input custom parameters to calculate % affinity scores across platform entities.
          </p>
        </button>
      </div>

      {/* Preset 1 Results: "I want to export organic food products from India" */}
      {activeMode === 'preset_export' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Summary Box */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-900/40 shadow-xl space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" /> Algorithmic Match Analysis Ready
            </div>
            <h2 className="text-xl font-extrabold text-white">
              Export Recommendation Package: Organic Foods & Spices from India
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              Based on global trade statistics and active trade treaties (India-UAE CEPA, EU bio regulations), we have identified high-yield destination countries, verified institutional buyers with open RFPs, and high-margin processing business models.
            </p>
          </div>

          {/* 1. Recommended Countries */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-emerald-400" />
              <span>1. Recommended High-Demand Destination Markets</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {organicExportMatches.destinationCountries.map((c) => (
                <div
                  key={c.code}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all space-y-2"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">{c.flag}</span>
                    <div>
                      <h4 className="font-bold text-white text-sm">{c.name}</h4>
                      <span className="text-[11px] text-emerald-400 font-semibold font-mono">Priority Hub</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-slate-800">
                    {c.advantage}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Verified Active Buyers Looking for Indian Products */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span>2. Verified Direct Buyers & Importers with Active RFPs</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {organicExportMatches.verifiedBuyers.map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={b.avatar}
                      alt={b.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-white text-sm truncate">{b.name}</h4>
                        <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                      </div>
                      <p className="text-xs text-slate-400 truncate">{b.company} ({b.country})</p>
                      <span className="text-[11px] text-emerald-400 font-medium">
                        Looking for: Organic Spices, Curcumin, Bio-Pellets
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('messages')}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 font-semibold text-xs shrink-0"
                  >
                    Send Offer
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 3. High-Margin Business Ideas in this Domain */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>3. High-Margin Business Models & Turnkey Ideas</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {organicExportMatches.relevantIdeas.map((idea) => (
                <div
                  key={idea.id}
                  onClick={() => setSelectedIdea(idea)}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-500/50 cursor-pointer transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-300 font-semibold">
                        {idea.category}
                      </span>
                      <span className="text-xs font-bold text-amber-400 font-mono">
                        {idea.investmentFormatted}
                      </span>
                    </div>
                    <h4 className="font-bold text-white text-sm hover:text-teal-300 transition-colors">
                      {idea.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{idea.tagline}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Deal: {idea.dealType.replace(/_/g, ' ')}</span>
                    <span className="text-teal-400 font-semibold flex items-center gap-1">
                      View Model <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Preset 2 Results: "I want to start a business with ₹10 lakh investment" */}
      {activeMode === 'preset_budget' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Summary Box */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-950/40 via-slate-900 to-slate-900 border border-teal-900/40 shadow-xl space-y-2">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" /> Capital-Optimized Ventures
            </div>
            <h2 className="text-xl font-extrabold text-white">
              Curated Business Opportunities: ₹10,00,000 Budget (~$12,000 USD)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              Projects engineered for low capital expenditure, fast payback within 12-18 months, and scalable operational models requiring limited initial team size.
            </p>
          </div>

          {/* Recommended Launch Pathway */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Capital Allocation & Risk Mitigation Strategy</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {budget10LakhMatches.recommendedLaunchPlan.map((plan, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1 text-xs">
                  <h4 className="font-bold text-teal-300">{plan.step}</h4>
                  <p className="text-slate-400 leading-relaxed">{plan.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Matched Ideas under 10L */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-base">
              Matched High-Yield Ideas Under ₹10 Lakhs ({budget10LakhMatches.matchedIdeas.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {budget10LakhMatches.matchedIdeas.map((idea) => (
                <div
                  key={idea.id}
                  onClick={() => setSelectedIdea(idea)}
                  className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-teal-500/50 cursor-pointer transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-300 font-semibold">
                        {idea.category}
                      </span>
                      <span className="text-xs font-bold text-amber-400 font-mono">
                        {idea.investmentFormatted}
                      </span>
                    </div>

                    <h4 className="font-bold text-white text-sm hover:text-teal-300 transition-colors">
                      {idea.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{idea.tagline}</p>

                    <div className="mt-4 p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Target Market:</span>
                        <span className="text-white font-medium">{idea.targetCountry}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Deal Structure:</span>
                        <span className="text-teal-300 font-medium capitalize">{idea.dealType.replace(/_/g, ' ')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Founder: {idea.founderName}</span>
                    <span className="text-teal-400 font-semibold flex items-center gap-1">
                      Open Canvas <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Custom Matchmaker Mode */}
      {activeMode === 'custom' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Form */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-400" />
              <span>Build Custom Opportunity Match</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Your Objective</label>
                <select
                  value={customGoal}
                  onChange={(e) => setCustomGoal(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                >
                  <option value="start_business">Start a New Business</option>
                  <option value="export_goods">Export Goods / Find Overseas Buyers</option>
                  <option value="import_goods">Import Goods / Sourcing</option>
                  <option value="invest">Invest Capital into Scaling Venture</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  Budget: ${customBudget.toLocaleString()}
                </label>
                <input
                  type="range"
                  min={5000}
                  max={250000}
                  step={5000}
                  value={customBudget}
                  onChange={(e) => setCustomBudget(Number(e.target.value))}
                  className="w-full accent-amber-500 mt-2 cursor-pointer"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Target Sector</label>
                <select
                  value={customIndustry}
                  onChange={(e) => setCustomIndustry(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Food & Beverages">Food & Beverages</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Renewable Energy">Renewable Energy</option>
                  <option value="Electric Vehicles">Electric Vehicles</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Manufacturing">Manufacturing</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Risk Appetite</label>
                <select
                  value={customRisk}
                  onChange={(e) => setCustomRisk(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                >
                  <option value="low">Conservative / Proven Models</option>
                  <option value="moderate">Moderate / Growth Oriented</option>
                  <option value="high">High / Breakthrough Tech</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="space-y-4">
            <h3 className="font-bold text-white text-base">
              Custom Algorithmic Matches ({customMatchedIdeas.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {customMatchedIdeas.map((idea, i) => (
                <div
                  key={idea.id}
                  onClick={() => setSelectedIdea(idea)}
                  className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-semibold">
                        {95 - i * 4}% Match Score
                      </span>
                      <span className="text-xs font-bold text-amber-400 font-mono">
                        {idea.investmentFormatted}
                      </span>
                    </div>
                    <h4 className="font-bold text-white text-sm hover:text-amber-300 transition-colors">
                      {idea.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{idea.tagline}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Target: {idea.targetCountry}</span>
                    <span className="text-amber-400 font-semibold flex items-center gap-1">
                      Inspect Canvas <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Idea Modal */}
      <IdeaDetailModal
        idea={selectedIdea}
        onClose={() => setSelectedIdea(null)}
      />

      {/* Product Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
