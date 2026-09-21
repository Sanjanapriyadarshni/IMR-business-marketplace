import React, { useState, useMemo } from 'react';
import { useIMR } from '../../context/IMRContext';
import { Search, Filter, SlidersHorizontal, ArrowRight, DollarSign, CheckCircle2 } from 'lucide-react';
import { BUSINESS_CATEGORIES, type BusinessIdea } from '../../types';

interface IdeaBuyerSectionProps {
  onSelectIdea: (idea: BusinessIdea) => void;
}

export const IdeaBuyerSection: React.FC<IdeaBuyerSectionProps> = ({ onSelectIdea }) => {
  const { ideas } = useIMR();

  const [budgetLimit, setBudgetLimit] = useState<number>(100000);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [businessModelPref, setBusinessModelPref] = useState<'all' | 'manufacturing' | 'service' | 'tech'>('all');
  const [experienceLevel, setExperienceLevel] = useState<'all' | 'beginner' | 'intermediate' | 'expert'>('all');
  const [onlineOffline, setOnlineOffline] = useState<'all' | 'online' | 'offline' | 'hybrid'>('all');

  const filteredOpportunities = useMemo(() => {
    return ideas.filter((idea) => {
      // Budget check
      const matchesBudget = idea.requiredInvestment <= budgetLimit;

      // Category check
      const matchesIndustry = selectedIndustry === 'all' || idea.category === selectedIndustry;

      // Country check
      const matchesCountry = selectedCountry === 'all' || idea.targetCountry.toLowerCase().includes(selectedCountry.toLowerCase());

      return matchesBudget && matchesIndustry && matchesCountry;
    });
  }, [ideas, budgetLimit, selectedIndustry, selectedCountry, businessModelPref]);

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/40 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
            For Entrepreneurs, Investors & Franchise Seekers
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Looking for High-Potential Business Ideas?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Specify your capital budget, preferred trade corridors, and operational skills. Discover pre-vetted business models ready for execution, partnership, or technology acquisition.
          </p>
        </div>
      </div>

      {/* Interactive Criteria Box */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-5">
        <div className="flex items-center gap-2 text-white font-bold text-sm border-b border-slate-800 pb-3">
          <SlidersHorizontal className="w-4 h-4 text-teal-400" />
          <span>Set Your Acquisition & Investment Criteria</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {/* Budget Range Slider */}
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex justify-between items-center text-slate-300">
              <span className="font-semibold">Maximum Investment Budget:</span>
              <span className="font-bold text-amber-400 font-mono">
                ${budgetLimit.toLocaleString()} USD (~₹{Math.round(budgetLimit * 0.83).toLocaleString()} Lakh)
              </span>
            </div>
            <input
              type="range"
              min={5000}
              max={300000}
              step={5000}
              value={budgetLimit}
              onChange={(e) => setBudgetLimit(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>$5,000 (~₹4L)</span>
              <span>$150,000</span>
              <span>$300,000+ (~₹2.5Cr)</span>
            </div>
          </div>

          {/* Preferred Industry */}
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <label className="font-semibold text-slate-300 block">Preferred Industry</label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-teal-500"
            >
              <option value="all">All 22 Categories</option>
              {BUSINESS_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Country / Market */}
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <label className="font-semibold text-slate-300 block">Target Geography</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-teal-500"
            >
              <option value="all">Any Geography</option>
              <option value="India">India 🇮🇳</option>
              <option value="United Arab Emirates">UAE 🇦🇪</option>
              <option value="Germany">Germany 🇩🇪</option>
              <option value="United States">USA 🇺🇸</option>
              <option value="United Kingdom">UK 🇬🇧</option>
              <option value="Singapore">Singapore 🇸🇬</option>
              <option value="Japan">Japan 🇯🇵</option>
            </select>
          </div>

          {/* Online vs Offline */}
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <label className="font-semibold text-slate-300 block">Deployment Model</label>
            <select
              value={onlineOffline}
              onChange={(e) => setOnlineOffline(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-teal-500"
            >
              <option value="all">Any Format</option>
              <option value="online">Online / Digital SaaS / E-commerce</option>
              <option value="offline">Physical Facility / Manufacturing / Cold-Chain</option>
              <option value="hybrid">Phygital / Hybrid</option>
            </select>
          </div>

          {/* Experience Level */}
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <label className="font-semibold text-slate-300 block">Your Experience Level</label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-teal-500"
            >
              <option value="all">Any Experience</option>
              <option value="beginner">First-time Entrepreneur</option>
              <option value="intermediate">Mid-level Operator / MSME Owner</option>
              <option value="expert">Seasoned Corporate Executive / Industrialist</option>
            </select>
          </div>

          {/* Reset Filters */}
          <div className="flex items-end">
            <button
              onClick={() => {
                setBudgetLimit(100000);
                setSelectedIndustry('all');
                setSelectedCountry('all');
                setOnlineOffline('all');
                setExperienceLevel('all');
              }}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition-colors text-xs"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Filtered Matches Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-base">
            Matched Business Opportunities ({filteredOpportunities.length})
          </h3>
          <span className="text-xs text-slate-400">
            Within ${budgetLimit.toLocaleString()} budget limit
          </span>
        </div>

        {filteredOpportunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredOpportunities.map((idea) => (
              <div
                key={idea.id}
                onClick={() => onSelectIdea(idea)}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-teal-500/50 cursor-pointer transition-all flex flex-col justify-between group shadow-md hover:shadow-teal-500/5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 font-semibold">
                      {idea.category}
                    </span>
                    <span className="text-xs font-bold text-amber-400 font-mono">
                      {idea.investmentFormatted}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                    {idea.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {idea.tagline}
                  </p>

                  <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Deal Structure:</span>
                      <span className="font-medium text-white capitalize">{idea.dealType.replace(/_/g, ' ')}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Target Market:</span>
                      <span className="font-medium text-white">{idea.targetCountry}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Founder:</span>
                      <span className="font-medium text-teal-300">{idea.founderName}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Stage: {idea.stage.replace(/_/g, ' ')}</span>
                  <span className="text-teal-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Review Canvas <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-slate-900/40 rounded-3xl border border-slate-800 text-slate-500">
            <Search className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="font-semibold text-slate-400 text-sm">No business ideas match these specific parameters</p>
            <p className="text-xs mt-1">Try expanding your budget slider or choosing "All Categories".</p>
          </div>
        )}
      </div>
    </div>
  );
};
