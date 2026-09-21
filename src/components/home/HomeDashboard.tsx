import React, { useState } from 'react';
import { useIMR } from '../../context/IMRContext';
import {
  Search,
  PlusCircle,
  TrendingUp,
  Package,
  Globe2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Bookmark,
  Heart,
  Bot,
  Compass,
  Atom,
  Users,
  Building2,
  Briefcase,
  ChevronRight,
} from 'lucide-react';
import { BUSINESS_CATEGORIES, type BusinessIdea, type TradeProduct } from '../../types';
import { IdeaDetailModal } from '../ideas/IdeaDetailModal';
import { ProductDetailModal } from '../trade/ProductDetailModal';
import { PostIdeaModal } from '../ideas/PostIdeaModal';
import { RFQModal } from '../trade/RFQModal';

interface HomeDashboardProps {
  onOpenSearch: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({ onOpenSearch }) => {
  const {
    ideas,
    products,
    countries,
    currentUser,
    savedIdeaIds,
    likedIdeaIds,
    saveIdea,
    likeIdea,
    setActiveTab,
    setSelectedCountryForExplorer,
    setMatchingInitialPreset,
  } = useIMR();

  const [selectedIdea, setSelectedIdea] = useState<BusinessIdea | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<TradeProduct | null>(null);
  const [rfqProduct, setRfqProduct] = useState<TradeProduct | null>(null);
  const [postIdeaOpen, setPostIdeaOpen] = useState(false);

  const trendingIdeas = ideas.slice(0, 3);
  const newIdeas = ideas.slice(3, 6);
  const exportProducts = products.filter((p) => p.tradeType === 'export').slice(0, 3);
  const importDemands = products.filter((p) => p.tradeType === 'import').slice(0, 2);

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 py-4 pb-12">
      {/* Hero Section */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/40 border border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-10">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome, {currentUser.name.split(' ')[0]} ({currentUser.role.replace(/_/g, ' ')})</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Have a Business Idea?{' '}
            <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-blue-500 bg-clip-text text-transparent">
              Find Partners to Build It.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Looking for a business opportunity? Discover verified business ideas, cross-border export-import products, target countries, and investment partners worldwide.
          </p>

          {/* Quick Opportunity Search Bar */}
          <div className="pt-2">
            <div
              onClick={onOpenSearch}
              className="flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-slate-950/80 border border-slate-700/80 hover:border-teal-500/60 transition-all cursor-pointer shadow-xl max-w-xl group"
            >
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-teal-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm text-slate-400">
                  Search 22 categories, HS codes, organic exports, suppliers...
                </span>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-xl bg-teal-500 text-slate-950 shadow-sm hidden sm:inline-block">
                Search
              </span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="pt-2 flex flex-wrap gap-2.5 text-xs font-semibold">
            <button
              onClick={() => setPostIdeaOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post an Idea</span>
            </button>

            <button
              onClick={() => {
                setMatchingInitialPreset('export_organic');
                setActiveTab('matching');
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Match Opportunities</span>
            </button>

            <button
              onClick={() => setActiveTab('ai_generator')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Bot className="w-4 h-4 text-purple-400" />
              <span>AI Idea Generator</span>
            </button>

            <button
              onClick={() => setActiveTab('advanced_tech')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Atom className="w-4 h-4 text-purple-400" />
              <span>Frontier Tech</span>
            </button>
          </div>
        </div>
      </div>

      {/* Platform Live Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-extrabold text-white font-mono block">1,840+</span>
            <span className="text-slate-400 text-[11px]">Business Ideas</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-extrabold text-white font-mono block">4,290+</span>
            <span className="text-slate-400 text-[11px]">Live Trade Products</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-extrabold text-white font-mono block">12,600+</span>
            <span className="text-slate-400 text-[11px]">Verified Merchants</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
            <Globe2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-extrabold text-white font-mono block">48 Nations</span>
            <span className="text-slate-400 text-[11px]">Active Corridors</span>
          </div>
        </div>
      </div>

      {/* Category Chips Scroll */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-400 uppercase tracking-wider">
            Explore 22 Strategic Industries
          </span>
          <button
            onClick={() => setActiveTab('ideas')}
            className="text-teal-400 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
          {BUSINESS_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab('ideas')}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-teal-500/40 text-slate-300 hover:text-white whitespace-nowrap transition-all flex items-center gap-1.5"
            >
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Trending Business Ideas */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-teal-400" />
              <span>Trending Business Ideas</span>
            </h2>
            <p className="text-xs text-slate-400">High-conviction concepts with proven early traction and verified founders</p>
          </div>
          <button
            onClick={() => setActiveTab('ideas')}
            className="text-xs text-teal-400 hover:underline font-semibold flex items-center gap-1"
          >
            <span>Explore Marketplace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trendingIdeas.map((idea) => {
            const isSaved = savedIdeaIds.includes(idea.id);
            const isLiked = likedIdeaIds.includes(idea.id);
            return (
              <div
                key={idea.id}
                className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-teal-500/50 transition-all flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 font-semibold truncate max-w-[170px]">
                      {idea.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => saveIdea(idea.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isSaved
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'text-slate-500 border-slate-800 hover:text-white'
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => likeIdea(idea.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isLiked
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                            : 'text-slate-500 border-slate-800 hover:text-white'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <h3
                    onClick={() => setSelectedIdea(idea)}
                    className="font-bold text-sm sm:text-base text-white group-hover:text-teal-300 transition-colors cursor-pointer line-clamp-2"
                  >
                    {idea.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {idea.tagline}
                  </p>

                  <div className="mt-3.5 p-3 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Required Investment:</span>
                      <span className="font-bold text-amber-400 font-mono">{idea.investmentFormatted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Deal Model:</span>
                      <span className="font-medium text-teal-300 capitalize">{idea.dealType.replace(/_/g, ' ')}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-500 truncate max-w-[130px]">{idea.founderName}</span>
                  <button
                    onClick={() => setSelectedIdea(idea)}
                    className="font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>View Canvas</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Export & Import Opportunities Spotlight */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Package className="w-5 h-5 text-emerald-400" />
              <span>Export & Import Spotlights</span>
            </h2>
            <p className="text-xs text-slate-400">Verified trade offerings ready for cross-border fulfillment</p>
          </div>
          <button
            onClick={() => setActiveTab('trade')}
            className="text-xs text-emerald-400 hover:underline font-semibold flex items-center gap-1"
          >
            <span>Global Trade Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {exportProducts.map((prod) => (
            <div
              key={prod.id}
              className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-950 mb-3 border border-slate-800">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold uppercase shadow">
                    Export Ready
                  </span>
                  <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-white font-mono border border-slate-700">
                    HS {prod.hsCode}
                  </span>
                </div>

                <h3
                  onClick={() => setSelectedProduct(prod)}
                  className="font-bold text-sm sm:text-base text-white group-hover:text-emerald-300 transition-colors cursor-pointer line-clamp-2"
                >
                  {prod.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{prod.description}</p>

                <div className="mt-3.5 p-3 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Approx Price:</span>
                    <span className="font-extrabold text-emerald-400 font-mono">{prod.priceRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">MOQ:</span>
                    <span className="font-semibold text-white">{prod.minOrderQty}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => setSelectedProduct(prod)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
                >
                  Specs
                </button>
                <button
                  onClick={() => setRfqProduct(prod)}
                  className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
                >
                  Request RFQ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Country Explorer Ribbon */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-amber-400" />
              <span>Explore Trade Corridors & Free Trade Pacts</span>
            </h2>
            <p className="text-xs text-slate-400">Country-wise popular exports, imports, tariffs, and buyers</p>
          </div>
          <button
            onClick={() => setActiveTab('countries')}
            className="text-xs text-amber-400 hover:underline font-semibold flex items-center gap-1"
          >
            <span>All Countries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {countries.slice(0, 6).map((c) => (
            <div
              key={c.code}
              onClick={() => {
                setSelectedCountryForExplorer(c.code);
                setActiveTab('countries');
              }}
              className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all flex flex-col items-center text-center group"
            >
              <span className="text-3xl mb-1.5 group-hover:scale-110 transition-transform">{c.flag}</span>
              <h4 className="font-bold text-white text-xs truncate w-full">{c.name}</h4>
              <span className="text-[10px] text-slate-400 mt-0.5">{c.activeSuppliersCount} Suppliers</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Generator Hero Callout */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-teal-950/40 border border-purple-900/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
            Powered by Generative Intelligence
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Have a Budget & Skill Set? Generate Tailored Business Models.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Our AI engine factors in your available capital, location, and trade corridors to generate ready-to-execute commercial blueprints with 90-day launch milestones.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('ai_generator')}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 via-teal-500 to-emerald-500 hover:opacity-95 text-slate-950 font-extrabold text-xs sm:text-sm transition-all shadow-xl shadow-purple-500/20 flex items-center gap-2 shrink-0"
        >
          <Bot className="w-4 h-4" />
          <span>Launch AI Idea Generator</span>
        </button>
      </div>

      {/* Modals */}
      <IdeaDetailModal
        idea={selectedIdea}
        onClose={() => setSelectedIdea(null)}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <RFQModal
        product={rfqProduct}
        isOpen={!!rfqProduct}
        onClose={() => setRfqProduct(null)}
      />

      <PostIdeaModal
        isOpen={postIdeaOpen}
        onClose={() => setPostIdeaOpen(false)}
      />
    </div>
  );
};
