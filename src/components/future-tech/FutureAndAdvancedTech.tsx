import React, { useState } from 'react';
import { useIMR } from '../../context/IMRContext';
import {
  Atom,
  ShieldAlert,
  BookOpen,
  Layers,
  ArrowRight,
  Handshake,
  CheckCircle2,
  AlertTriangle,
  FileText,
} from 'lucide-react';
import type { AdvancedTechItem } from '../../types';

export const FutureAndAdvancedTech: React.FC = () => {
  const { advancedTechItems, startConversationWith, setActiveTab, setActiveThreadId } = useIMR();

  const [selectedItem, setSelectedItem] = useState<AdvancedTechItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    'all',
    'Anti-gravity',
    'Advanced Transportation',
    'Magnetic Tech',
    'Robotics',
    'Space Tech',
    'Energy Tech',
    'Advanced Materials',
    'Autonomous Systems',
  ];

  const filteredItems = advancedTechItems.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  );

  const getStatusBadge = (status: AdvancedTechItem['scientificStatus']) => {
    switch (status) {
      case 'Early Commercial Pilot':
        return {
          label: 'Early Commercial Pilot',
          className: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        };
      case 'Lab Prototype':
        return {
          label: 'Lab Prototype / Experimental',
          className: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
        };
      case 'Theoretical Research':
        return {
          label: 'Theoretical Research / Peer-Reviewed',
          className: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
        };
      case 'Speculative Concept':
        return {
          label: 'Speculative Concept (Unverified)',
          className: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        };
    }
  };

  const handleDiscussResearch = (item: AdvancedTechItem) => {
    const threadId = startConversationWith(
      'user-creator',
      `Frontier Tech Inquiry: ${item.title}`,
      'idea_inquiry',
      `Hello Dr. Verma, I am reviewing the "${item.title}" scientific dossier on IMR. We represent an aerospace/deeptech venture group interested in joint research discussions.`
    );
    setActiveThreadId(threadId);
    setActiveTab('messages');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-4">
      {/* Hero Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-900/40 shadow-2xl space-y-3 relative overflow-hidden">
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
            <Atom className="w-3.5 h-3.5" /> Frontier Physics & Advanced Technology
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Breakthrough Deep-Tech & Frontier Concepts
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          Explore breakthrough physics, electro-aerodynamics, magnetic levitation, space logistics, and advanced propulsion. Each technology is vetted against scientific literature and clearly classified by experimental readiness level.
        </p>

        {/* Scientific Integrity Disclaimer Banner */}
        <div className="mt-4 p-4 rounded-2xl bg-slate-950/80 border border-purple-800/40 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-purple-300 block font-semibold mb-0.5">
              Scientific Integrity Standard:
            </strong>
            Concepts on IMR are categorized by empirical maturity. We strictly distinguish between laboratory prototypes (e.g. quantum flux pinning), theoretical research papers (e.g. asymmetrical capacitor ion thrust), and speculative future concepts. Speculative hypotheses are never presented as established commercial hardware.
          </div>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-purple-500 text-white font-bold shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat === 'all' ? 'All Frontier Tech' : cat}
          </button>
        ))}
      </div>

      {/* Technology Dossier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item) => {
          const badge = getStatusBadge(item.scientificStatus);
          return (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 transition-all flex flex-col justify-between shadow-xl space-y-5"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-semibold">
                    {item.category}
                  </span>
                  <span
                    className={`text-[11px] px-2.5 py-0.5 rounded-full border font-bold ${badge.className}`}
                  >
                    {badge.label}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.summary}
                </p>

                {/* Physics Basis */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold text-purple-400 block uppercase tracking-wider">
                    Scientific & Physics Basis
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.physicsBasis}</p>
                </div>

                {/* Real-World Experimental Status */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold text-teal-400 block uppercase tracking-wider">
                    Empirical Lab Validation Status
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.realWorldStatus}</p>
                </div>

                {/* Commercial Applications */}
                <div className="space-y-1.5 text-xs">
                  <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[11px]">
                    Commercial Target Sectors:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.commercialApplications.map((app, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Published Papers */}
                <div className="space-y-1 text-xs">
                  <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[11px] flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-blue-400" /> Academic & Experimental Citations:
                  </span>
                  <ul className="space-y-1 text-[11px] text-slate-400">
                    {item.researchPapers.map((paper, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-blue-400">•</span>
                        <span>{paper}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Risk & Safety Notice */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 leading-relaxed">
                  {item.riskDisclaimer}
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Model: <strong className="text-white">{item.potentialPartnershipModel}</strong>
                </span>
                <button
                  onClick={() => handleDiscussResearch(item)}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors shadow-lg shadow-purple-900/30 flex items-center gap-1.5 shrink-0"
                >
                  <Handshake className="w-3.5 h-3.5" />
                  <span>Discuss Co-Development</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
