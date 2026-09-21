import React, { useState } from 'react';
import { useIMR } from '../../context/IMRContext';
import { useCursor } from '../../context/CursorContext';
import { MagneticButton } from '../cursor/MagneticButton';
import {
  Sparkles,
  Lightbulb,
  Cpu,
  Atom,
  ArrowUpRight,
  ShieldCheck,
  Heart,
  Bookmark,
  Zap,
  TrendingUp,
  FileText,
  AlertTriangle,
  ArrowRight,
  Compass,
} from 'lucide-react';
import type { BusinessIdea, AdvancedTechItem } from '../../types';

interface InnovationShowcaseProps {
  onSelectIdea: (idea: BusinessIdea) => void;
  onOpenAIGenerator: () => void;
  onOpenAdvancedTech: () => void;
  onPostIdea: () => void;
}

export const InnovationShowcase: React.FC<InnovationShowcaseProps> = ({
  onSelectIdea,
  onOpenAIGenerator,
  onOpenAdvancedTech,
  onPostIdea,
}) => {
  const { ideas, advancedTechItems, likeIdea, saveIdea, likedIdeaIds, savedIdeaIds } = useIMR();
  const { setCursor } = useCursor();

  const [activeTab, setActiveTab] = useState<'commercial' | 'ai_synthesis' | 'frontier'>('commercial');

  // Quick AI Generator interactive state
  const [selectedSector, setSelectedSector] = useState('CleanTech & Circular Packaging');
  const [selectedLane, setSelectedLane] = useState('India ➔ UAE CEPA');
  const [synthesizedResult, setSynthesizedResult] = useState<any | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSynthesize = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setSynthesizedResult({
        title: `Decarbonized Cold-Chain Agri-Sensors for ${selectedLane}`,
        tagline: `IoT-monitored biodegradable packaging compliant with regional zero-waste directives.`,
        capital: '$350,000 USD Seed Allocation',
        margin: '42% Gross Margin on Cross-Border Shipments',
        roi: '18 Months Payback Period',
        targetPact: selectedLane,
      });
      setIsGenerating(false);
    }, 700);
  };

  return (
    <section
      id="innovation-showcase"
      className="py-24 px-4 sm:px-8 bg-[#F3EFE7] border-t border-[#D8D2C7] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFDF8] border border-[#D8D2C7] text-[11px] font-mono tracking-wider text-[#171717] uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A36]" />
              <span>Section 04 // Commercial Ideas & Frontier Science</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#171717] tracking-tight leading-[1.02]">
              INVENTION CANVAS <br />
              <span className="font-display font-semibold italic text-[#FF5A36]">
                & FRONTIER LABS
              </span>
            </h2>
          </div>

          {/* Subtabs Switcher */}
          <div className="flex items-center p-1.5 rounded-full bg-[#FFFDF8] border border-[#D8D2C7] shadow-sm">
            <button
              onClick={() => setActiveTab('commercial')}
              className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all ${
                activeTab === 'commercial'
                  ? 'bg-[#171717] text-[#FFFDF8] shadow-sm'
                  : 'text-[#6B6B63] hover:text-[#171717]'
              }`}
            >
              Commercial Ideas
            </button>
            <button
              onClick={() => setActiveTab('ai_synthesis')}
              className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'ai_synthesis'
                  ? 'bg-[#171717] text-[#FFFDF8] shadow-sm'
                  : 'text-[#6B6B63] hover:text-[#171717]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF5A36]" />
              <span>AI Opportunity Engine</span>
            </button>
            <button
              onClick={() => setActiveTab('frontier')}
              className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'frontier'
                  ? 'bg-[#171717] text-[#FFFDF8] shadow-sm'
                  : 'text-[#6B6B63] hover:text-[#171717]'
              }`}
            >
              <Atom className="w-3.5 h-3.5 text-[#A8C7B5]" />
              <span>Frontier DeepTech</span>
            </button>
          </div>
        </div>

        {/* TAB 1: Commercial Ideas Canvas */}
        {activeTab === 'commercial' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ideas.slice(0, 6).map((idea) => {
                const isLiked = likedIdeaIds.includes(idea.id);
                const isSaved = savedIdeaIds.includes(idea.id);

                return (
                  <div
                    key={idea.id}
                    onClick={() => onSelectIdea(idea)}
                    onMouseEnter={() => setCursor('CANVAS', 'view')}
                    onMouseLeave={() => setCursor(null)}
                    className="group rounded-3xl bg-[#FFFDF8] border border-[#D8D2C7] hover:border-[#FF5A36] p-6 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#6B6B63] mb-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#F3EFE7] text-[#171717] font-bold border border-[#D8D2C7]/60">
                          {idea.category}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#A8C7B5]/30 text-[#171717] font-semibold">
                          STAGE: {idea.stage.toUpperCase()}
                        </span>
                      </div>

                      <h3 className="font-editorial text-xl font-bold text-[#171717] group-hover:text-[#FF5A36] transition-colors leading-snug">
                        {idea.title}
                      </h3>

                      <p className="text-xs text-[#6B6B63] line-clamp-2 mt-2 leading-relaxed">
                        {idea.tagline}
                      </p>

                      {/* Founder Info */}
                      <div className="mt-4 pt-3 border-t border-[#D8D2C7]/60 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#171717] text-[#FFFDF8] flex items-center justify-center text-[10px] font-mono font-bold">
                            {idea.founderName.charAt(0)}
                          </div>
                          <span className="text-[#171717] font-medium text-xs">{idea.founderName}</span>
                        </div>
                        <span className="text-[10px] font-mono text-[#6B6B63]">{idea.founderCountry}</span>
                      </div>
                    </div>

                    {/* Bottom Deal & Capital Bar */}
                    <div className="mt-6 pt-4 border-t border-[#D8D2C7]/80">
                      <div className="flex items-center justify-between mb-3 text-xs">
                        <div>
                          <span className="text-[10px] font-mono text-[#6B6B63] block">CAPITAL TARGET:</span>
                          <span className="font-mono font-bold text-[#171717]">{idea.investmentFormatted}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-mono text-[#6B6B63] block">STRUCTURE:</span>
                          <span className="text-[11px] font-semibold text-[#FF5A36]">{idea.dealType.replace(/_/g, ' ')}</span>
                        </div>
                      </div>

                      {/* Action icons */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[11px] font-mono font-bold text-[#171717] group-hover:text-[#FF5A36] flex items-center gap-1">
                          <span>Review Canvas</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </span>

                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => likeIdea(idea.id)}
                            className={`p-2 rounded-full border border-[#D8D2C7] transition-colors ${
                              isLiked ? 'bg-[#FF5A36]/15 text-[#FF5A36] border-[#FF5A36]' : 'bg-[#FFFDF8] text-[#6B6B63] hover:text-[#171717]'
                            }`}
                            title="Like idea"
                          >
                            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                          </button>
                          <button
                            onClick={() => saveIdea(idea.id)}
                            className={`p-2 rounded-full border border-[#D8D2C7] transition-colors ${
                              isSaved ? 'bg-[#171717] text-[#FFFDF8] border-[#171717]' : 'bg-[#FFFDF8] text-[#6B6B63] hover:text-[#171717]'
                            }`}
                            title="Save idea"
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Post idea CTA banner */}
            <div className="mt-10 p-6 rounded-3xl bg-[#FFFDF8] border border-[#D8D2C7] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F3EFE7] border border-[#D8D2C7] flex items-center justify-center text-[#FF5A36]">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#171717]">Have an inventive business model or patent?</h4>
                  <p className="text-xs text-[#6B6B63]">List on IMR with IP ownership timestamping and connect with global manufacturers.</p>
                </div>
              </div>

              <MagneticButton
                onClick={onPostIdea}
                cursorLabel="PUBLISH"
                className="px-6 py-3 rounded-full bg-[#171717] hover:bg-[#FF5A36] text-[#FFFDF8] text-xs font-bold font-mono tracking-wider transition-colors shadow-md shrink-0"
              >
                + PUBLISH IDEA CANVAS
              </MagneticButton>
            </div>
          </div>
        )}

        {/* TAB 2: AI Opportunity Engine */}
        {activeTab === 'ai_synthesis' && (
          <div className="bg-[#FFFDF8] rounded-3xl border border-[#D8D2C7] p-8 shadow-lg">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5A36]/10 text-[#FF5A36] text-xs font-mono font-bold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI CROSS-BORDER ARBITRAGE SYNTHESIZER</span>
              </div>
              <h3 className="font-editorial text-3xl font-bold text-[#171717] mb-2">
                Generate Instant Market Opportunities
              </h3>
              <p className="text-sm text-[#6B6B63] mb-8">
                Select an innovation sector and bilateral corridor to synthesize high-margin business ideas with verified trade routes and duty exemptions.
              </p>

              {/* Synthesizer Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-xs font-mono uppercase text-[#6B6B63] block mb-2 font-semibold">
                    Target Sector
                  </label>
                  <select
                    value={selectedSector}
                    onChange={(e) => setSelectedSector(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-[#F3EFE7] border border-[#D8D2C7] text-xs font-bold text-[#171717] focus:outline-none focus:border-[#FF5A36]"
                  >
                    <option value="CleanTech & Circular Packaging">CleanTech & Circular Packaging</option>
                    <option value="Precision Agri-IoT & Cold Chains">Precision Agri-IoT & Cold Chains</option>
                    <option value="Electric Mobility & Solid State Batteries">Electric Mobility & Solid State Batteries</option>
                    <option value="Pharma Ingredients & API Formulations">Pharma Ingredients & API Formulations</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-[#6B6B63] block mb-2 font-semibold">
                    Trade Corridor
                  </label>
                  <select
                    value={selectedLane}
                    onChange={(e) => setSelectedLane(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-[#F3EFE7] border border-[#D8D2C7] text-xs font-bold text-[#171717] focus:outline-none focus:border-[#FF5A36]"
                  >
                    <option value="India ➔ UAE CEPA">India ➔ UAE (CEPA 0% Duty)</option>
                    <option value="Germany ➔ USA">Germany ➔ USA (Industrial Tech)</option>
                    <option value="Singapore ➔ Japan">Singapore ➔ Japan (Precision RCEP)</option>
                    <option value="India ➔ Australia">India ➔ Australia (ECTA Pacts)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleSynthesize}
                  disabled={isGenerating}
                  className="px-6 py-3.5 rounded-full bg-[#171717] hover:bg-[#FF5A36] text-[#FFFDF8] font-mono text-xs font-bold tracking-wider uppercase transition-colors shadow-md flex items-center gap-2"
                >
                  <Zap className="w-3.5 h-3.5 text-[#FF5A36]" />
                  <span>{isGenerating ? 'Synthesizing Trade Data...' : 'Synthesize Opportunity'}</span>
                </button>

                <button
                  onClick={onOpenAIGenerator}
                  className="px-6 py-3.5 rounded-full bg-[#FFFDF8] hover:bg-[#EBE5DA] text-[#171717] border border-[#D8D2C7] font-mono text-xs font-bold tracking-wider uppercase transition-colors"
                >
                  Full AI Studio ➔
                </button>
              </div>

              {/* Synthesized Output Preview */}
              {synthesizedResult && (
                <div className="mt-8 p-6 rounded-2xl bg-[#F3EFE7] border border-[#D8D2C7] animate-fadeIn">
                  <div className="flex items-center justify-between text-xs font-mono text-[#FF5A36] mb-2 font-bold">
                    <span>AI SYNTHESIZED BLUEPRINT</span>
                    <span>CORRIDOR: {synthesizedResult.targetPact}</span>
                  </div>
                  <h4 className="font-editorial text-2xl font-bold text-[#171717]">
                    {synthesizedResult.title}
                  </h4>
                  <p className="text-xs text-[#6B6B63] mt-1.5 leading-relaxed">
                    {synthesizedResult.tagline}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-[#D8D2C7]/80 text-xs">
                    <div className="p-3 rounded-xl bg-[#FFFDF8] border border-[#D8D2C7]">
                      <span className="text-[10px] font-mono text-[#6B6B63] block">ESTIMATED CAPITAL</span>
                      <span className="font-bold text-[#171717]">{synthesizedResult.capital}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#FFFDF8] border border-[#D8D2C7]">
                      <span className="text-[10px] font-mono text-[#6B6B63] block">UNIT ECONOMICS</span>
                      <span className="font-bold text-[#171717]">{synthesizedResult.margin}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#FFFDF8] border border-[#D8D2C7]">
                      <span className="text-[10px] font-mono text-[#6B6B63] block">COMMERCIALIZATION</span>
                      <span className="font-bold text-[#171717]">{synthesizedResult.roi}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: Frontier DeepTech with Empirical Scientific Validation */}
        {activeTab === 'frontier' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advancedTechItems.map((tech) => (
                <div
                  key={tech.id}
                  className="rounded-3xl bg-[#FFFDF8] border border-[#D8D2C7] p-6 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    {/* Empirical Scientific Status Badge */}
                    <div className="flex items-center justify-between text-[10px] font-mono mb-3">
                      <span className="px-2.5 py-1 rounded-full bg-[#171717] text-[#FFFDF8] font-bold">
                        {tech.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-[#FF5A36]/15 text-[#FF5A36] border border-[#FF5A36]/30 font-bold">
                        {tech.scientificStatus}
                      </span>
                    </div>

                    <h3 className="font-editorial text-xl font-bold text-[#171717] leading-snug">
                      {tech.title}
                    </h3>

                    <p className="text-xs text-[#6B6B63] line-clamp-3 mt-2 leading-relaxed">
                      {tech.summary}
                    </p>

                    {/* Physics Basis Breakdown */}
                    <div className="mt-4 p-3 rounded-xl bg-[#F3EFE7] border border-[#D8D2C7]/70 text-xs">
                      <span className="text-[10px] font-mono uppercase text-[#6B6B63] font-bold block mb-1">
                        Empirical Physics Basis:
                      </span>
                      <p className="text-[#171717] text-[11px] leading-relaxed">
                        {tech.physicsBasis}
                      </p>
                    </div>

                    {/* Real World Status */}
                    <div className="mt-3 text-xs">
                      <span className="text-[10px] font-mono text-[#6B6B63] uppercase block font-semibold">
                        Current Lab / Testing Status:
                      </span>
                      <p className="text-[#171717] text-[11px] mt-0.5">
                        {tech.realWorldStatus}
                      </p>
                    </div>

                    {/* Scientific Citations */}
                    <div className="mt-3 pt-3 border-t border-[#D8D2C7]/60">
                      <span className="text-[10px] font-mono text-[#6B6B63] block mb-1">
                        Peer References & Citations:
                      </span>
                      <div className="space-y-1">
                        {tech.researchPapers.slice(0, 2).map((paper, pIdx) => (
                          <div key={pIdx} className="text-[10px] font-mono text-[#171717] flex items-center gap-1 truncate">
                            <FileText className="w-2.5 h-2.5 text-[#FF5A36] shrink-0" />
                            <span className="truncate">{paper}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Partnership Model & Caution */}
                  <div className="mt-6 pt-4 border-t border-[#D8D2C7]/80">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-900 flex items-start gap-1.5 mb-3">
                      <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />
                      <span>{tech.riskDisclaimer}</span>
                    </div>

                    <button
                      onClick={onOpenAdvancedTech}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#171717] hover:bg-[#FF5A36] text-[#FFFDF8] text-xs font-mono font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Full Physics Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
