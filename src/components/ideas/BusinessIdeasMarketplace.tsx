import React, { useState, useMemo } from 'react';
import { useIMR } from '../../context/IMRContext';
import {
  Search,
  PlusCircle,
  Filter,
  Bookmark,
  Heart,
  ArrowRight,
  ShieldCheck,
  DollarSign,
  TrendingUp,
  Tag,
  SlidersHorizontal,
} from 'lucide-react';
import { BUSINESS_CATEGORIES, type BusinessIdea, type BusinessCategory, type DealType, type DevelopmentStage } from '../../types';
import { IdeaDetailModal } from './IdeaDetailModal';
import { PostIdeaModal } from './PostIdeaModal';
import { IdeaBuyerSection } from './IdeaBuyerSection';
import { IdeaCreatorSection } from './IdeaCreatorSection';

export const BusinessIdeasMarketplace: React.FC = () => {
  const { ideas, savedIdeaIds, likedIdeaIds, saveIdea, likeIdea, currentUser } = useIMR();

  const [activeSubTab, setActiveSubTab] = useState<'browse' | 'buyer' | 'creator'>('browse');
  const [selectedIdea, setSelectedIdea] = useState<BusinessIdea | null>(null);
  const [postModalOpen, setPostModalOpen] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedDealType, setSelectedDealType] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [maxInvestment, setMaxInvestment] = useState<number>(300000);

  const filteredIdeas = useMemo(() => {
    return ideas.filter((idea) => {
      // Search
      const matchesSearch =
        idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.founderName.toLowerCase().includes(searchQuery.toLowerCase());

      // Category
      const matchesCategory = selectedCategory === 'all' || idea.category === selectedCategory;

      // Stage
      const matchesStage = selectedStage === 'all' || idea.stage === selectedStage;

      // Deal type
      const matchesDeal = selectedDealType === 'all' || idea.dealType === selectedDealType;

      // Country
      const matchesCountry =
        selectedCountry === 'all' || idea.targetCountry.toLowerCase().includes(selectedCountry.toLowerCase());

      // Investment
      const matchesInvestment = idea.requiredInvestment <= maxInvestment;

      return matchesSearch && matchesCategory && matchesStage && matchesDeal && matchesCountry && matchesInvestment;
    });
  }, [ideas, searchQuery, selectedCategory, selectedStage, selectedDealType, selectedCountry, maxInvestment]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-4">
      {/* Top Header & Sub-nav Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Business Ideas Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Discover verified commercial concepts, acquire licenses, or partner with founders worldwide.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setPostModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-teal-500/20 flex items-center gap-2 group"
          >
            <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            <span>Post an Idea</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Switcher (Browse vs Buyer vs Creator) */}
      <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-semibold w-fit">
        <button
          onClick={() => setActiveSubTab('browse')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeSubTab === 'browse'
              ? 'bg-teal-500 text-slate-950 shadow-md font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          All Business Ideas ({ideas.length})
        </button>
        <button
          onClick={() => setActiveSubTab('buyer')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeSubTab === 'buyer'
              ? 'bg-teal-500 text-slate-950 shadow-md font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Looking for Ideas? (Buyer Finder)
        </button>
        <button
          onClick={() => setActiveSubTab('creator')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeSubTab === 'creator'
              ? 'bg-teal-500 text-slate-950 shadow-md font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Sell / License Idea
        </button>
      </div>

      {/* Switch Body based on Sub-Tab */}
      {activeSubTab === 'buyer' && <IdeaBuyerSection onSelectIdea={setSelectedIdea} />}
      {activeSubTab === 'creator' && <IdeaCreatorSection onSelectIdea={setSelectedIdea} />}

      {activeSubTab === 'browse' && (
        <div className="space-y-6">
          {/* Search and Advanced Filter Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-teal-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by keywords, problem, solution, founder..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
                <select
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-slate-300 focus:outline-none focus:border-teal-500"
                >
                  <option value="all">All Stages</option>
                  <option value="concept">Concept</option>
                  <option value="research_prototype">Prototype</option>
                  <option value="mvp">MVP</option>
                  <option value="early_revenue">Early Revenue</option>
                  <option value="growth_scaling">Scaling</option>
                </select>

                <select
                  value={selectedDealType}
                  onChange={(e) => setSelectedDealType(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-slate-300 focus:outline-none focus:border-teal-500"
                >
                  <option value="all">All Deal Types</option>
                  <option value="partnership">Partnership / Equity</option>
                  <option value="licensing">Licensing</option>
                  <option value="sale">Outright Sale</option>
                  <option value="investment_required">Investment</option>
                  <option value="free_discussion">Free Discussion</option>
                </select>

                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-slate-300 focus:outline-none focus:border-teal-500"
                >
                  <option value="all">All Markets</option>
                  <option value="India">India</option>
                  <option value="United Arab Emirates">UAE</option>
                  <option value="Germany">Germany</option>
                  <option value="United States">USA</option>
                  <option value="United Kingdom">UK</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Japan">Japan</option>
                </select>
              </div>
            </div>

            {/* Horizontal Category Chips (All 22 Categories) */}
            <div>
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-teal-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  All Categories
                </button>
                {BUSINESS_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-teal-500 text-slate-950 font-bold shadow-sm'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Ideas Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Showing {filteredIdeas.length} business ideas</span>
              {selectedCategory !== 'all' && (
                <span className="font-semibold text-teal-400">Category: {selectedCategory}</span>
              )}
            </div>

            {filteredIdeas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredIdeas.map((idea) => {
                  const isSaved = savedIdeaIds.includes(idea.id);
                  const isLiked = likedIdeaIds.includes(idea.id);

                  return (
                    <div
                      key={idea.id}
                      className="p-5 rounded-3xl bg-slate-900 border border-slate-800/90 hover:border-teal-500/50 transition-all flex flex-col justify-between group shadow-lg hover:shadow-teal-500/5"
                    >
                      <div>
                        {/* Top Pills */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 font-semibold truncate max-w-[180px]">
                            {idea.category}
                          </span>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                saveIdea(idea.id);
                              }}
                              className={`p-1.5 rounded-lg border transition-colors ${
                                isSaved
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                  : 'text-slate-500 border-slate-800 hover:text-white'
                              }`}
                            >
                              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                likeIdea(idea.id);
                              }}
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

                        {/* Title & Tagline */}
                        <h3
                          onClick={() => setSelectedIdea(idea)}
                          className="font-bold text-base text-white group-hover:text-teal-300 transition-colors cursor-pointer line-clamp-2"
                        >
                          {idea.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                          {idea.tagline}
                        </p>

                        {/* Investment & Deal Badge */}
                        <div className="mt-4 p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-1.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Required Capital:</span>
                            <span className="font-bold text-amber-400 font-mono">
                              {idea.investmentFormatted}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Deal Structure:</span>
                            <span className="font-semibold text-teal-300 capitalize">
                              {idea.dealType.replace(/_/g, ' ')}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Market:</span>
                            <span className="font-medium text-slate-200">
                              {idea.targetCountry} ({idea.scalability})
                            </span>
                          </div>
                        </div>

                        {/* Founder */}
                        <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-slate-300 font-medium truncate max-w-[140px]">
                              {idea.founderName}
                            </span>
                            {idea.founderVerified && (
                              <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                            )}
                          </div>
                          <span className="capitalize text-[11px] text-slate-500">
                            {idea.stage.replace(/_/g, ' ')}
                          </span>
                        </div>
                      </div>

                      {/* Footer Action */}
                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                        <span className="text-[11px] text-slate-500">
                          {idea.likesCount} Likes • {idea.savesCount} Saves
                        </span>
                        <button
                          onClick={() => setSelectedIdea(idea)}
                          className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                        >
                          <span>Explore Canvas</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-12 text-center bg-slate-900/40 rounded-3xl border border-slate-800 text-slate-500">
                <Search className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="font-semibold text-slate-400 text-sm">No business ideas match the selected filters</p>
                <p className="text-xs mt-1">Try resetting the filters or switching categories.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Idea Detail Modal */}
      <IdeaDetailModal
        idea={selectedIdea}
        onClose={() => setSelectedIdea(null)}
      />

      {/* Post Idea Modal */}
      <PostIdeaModal
        isOpen={postModalOpen}
        onClose={() => setPostModalOpen(false)}
      />
    </div>
  );
};
