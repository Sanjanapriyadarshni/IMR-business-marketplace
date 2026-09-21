import React, { useState } from 'react';
import { useIMR } from '../../context/IMRContext';
import { X, Sparkles, AlertCircle, CheckCircle2, Shield } from 'lucide-react';
import { BUSINESS_CATEGORIES, type BusinessCategory, type DealType, type DevelopmentStage } from '../../types';

interface PostIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDealType?: DealType;
}

export const PostIdeaModal: React.FC<PostIdeaModalProps> = ({
  isOpen,
  onClose,
  defaultDealType = 'partnership',
}) => {
  const { addIdea, currentUser } = useIMR();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    description: '',
    problem: '',
    solution: '',
    targetCustomers: '',
    requiredInvestment: 12000,
    investmentFormatted: '₹10,00,000 (~$12,000 USD)',
    expectedRevenueModel: '',
    requiredSkills: 'Operations, B2B Sales, Product Design',
    requiredTechnology: 'Cloud SaaS, IoT telemetry',
    targetCountry: currentUser.country || 'India',
    category: 'Technology' as BusinessCategory,
    scalability: 'Global' as 'Local' | 'Regional' | 'National' | 'Global',
    stage: 'concept' as DevelopmentStage,
    dealType: defaultDealType,
    dealTermsSummary: '',
    acceptedDisclaimer: false,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptedDisclaimer) {
      alert('Please accept the Intellectual Property and verification terms to proceed.');
      return;
    }

    addIdea({
      title: formData.title,
      tagline: formData.tagline || formData.title,
      description: formData.description,
      problem: formData.problem,
      solution: formData.solution,
      targetCustomers: formData.targetCustomers,
      requiredInvestment: Number(formData.requiredInvestment),
      investmentFormatted: formData.investmentFormatted,
      expectedRevenueModel: formData.expectedRevenueModel,
      requiredSkills: formData.requiredSkills.split(',').map((s) => s.trim()).filter(Boolean),
      requiredTechnology: formData.requiredTechnology.split(',').map((s) => s.trim()).filter(Boolean),
      targetCountry: formData.targetCountry,
      category: formData.category,
      scalability: formData.scalability,
      stage: formData.stage,
      dealType: formData.dealType,
      dealTermsSummary: formData.dealTermsSummary,
      isAdvancedTech: formData.category === 'Anti-Gravity / Advanced Technology Concepts' || formData.category === 'Future Technology',
      scientificStatus: formData.category === 'Anti-Gravity / Advanced Technology Concepts' ? 'Speculative Concept' : undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Publish Business Idea</h3>
              <p className="text-xs text-slate-400">Find co-founders, license your concept, or raise capital</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step progress */}
        <div className="px-6 py-2.5 bg-slate-950/50 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center font-bold ${
                step >= 1 ? 'bg-teal-500 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}
            >
              1
            </span>
            <span className={step === 1 ? 'text-white font-medium' : 'text-slate-400'}>
              Core Concept
            </span>
          </div>
          <div className="h-0.5 flex-1 mx-3 bg-slate-800">
            <div className={`h-full bg-teal-500 transition-all ${step === 1 ? 'w-0' : step === 2 ? 'w-1/2' : 'w-full'}`} />
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center font-bold ${
                step >= 2 ? 'bg-teal-500 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}
            >
              2
            </span>
            <span className={step === 2 ? 'text-white font-medium' : 'text-slate-400'}>
              Market & Skills
            </span>
          </div>
          <div className="h-0.5 flex-1 mx-3 bg-slate-800">
            <div className={`h-full bg-teal-500 transition-all ${step < 3 ? 'w-0' : 'w-full'}`} />
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center font-bold ${
                step >= 3 ? 'bg-teal-500 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}
            >
              3
            </span>
            <span className={step === 3 ? 'text-white font-medium' : 'text-slate-400'}>
              Deal & Terms
            </span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm flex-1">
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Business Idea Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modular Solar Cold Rooms for Smallholder Farmers"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  One-Line Hook / Tagline *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zero-electricity cold preservation preventing produce spoilage"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    Industry Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as BusinessCategory })}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-500"
                  >
                    {BUSINESS_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    Current Stage *
                  </label>
                  <select
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value as DevelopmentStage })}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="concept">Idea / Concept Stage</option>
                    <option value="research_prototype">Research & Prototype</option>
                    <option value="mvp">Working MVP</option>
                    <option value="early_revenue">Early Revenue Generating</option>
                    <option value="growth_scaling">Growth & Scaling</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  The Specific Problem Being Solved *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="What friction, loss, or inefficiency does this solve?"
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-white focus:outline-none focus:border-teal-500 resize-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  The Proposed Solution & Innovation *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="How does your product, tech, or business model fix the problem?"
                  value={formData.solution}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-white focus:outline-none focus:border-teal-500 resize-none"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Full Business Description *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Provide an overview of the operational model, supply chain, and execution roadmap..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-white focus:outline-none focus:border-teal-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    Target Country / Market *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. India, UAE, Global"
                    value={formData.targetCountry}
                    onChange={(e) => setFormData({ ...formData, targetCountry: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    Scalability Scope *
                  </label>
                  <select
                    value={formData.scalability}
                    onChange={(e) => setFormData({ ...formData, scalability: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="Local">Local (City / Cluster)</option>
                    <option value="Regional">Regional (State / Province)</option>
                    <option value="National">National</option>
                    <option value="Global">Global / Cross-Border</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Target Customers & Buyer Persona *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Farmer producer organizations, export distributors, tier-2 retailers"
                  value={formData.targetCustomers}
                  onChange={(e) => setFormData({ ...formData, targetCustomers: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Required Skills & Co-Founder Roles (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chemical Engineering, Cold Chain Logistics, B2B Sales"
                  value={formData.requiredSkills}
                  onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Required Technology & Infrastructure
                </label>
                <input
                  type="text"
                  placeholder="e.g. Phase Change Materials, LoRaWAN IoT telemetry, Python backend"
                  value={formData.requiredTechnology}
                  onChange={(e) => setFormData({ ...formData, requiredTechnology: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    Required Investment ($ USD or base) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="12000"
                    value={formData.requiredInvestment}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        requiredInvestment: Number(e.target.value),
                        investmentFormatted: `$${Number(e.target.value).toLocaleString()} USD (~₹${Math.round(
                          Number(e.target.value) * 83
                        ).toLocaleString()})`,
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    Deal Type Intent *
                  </label>
                  <select
                    value={formData.dealType}
                    onChange={(e) => setFormData({ ...formData, dealType: e.target.value as DealType })}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-500 font-semibold text-teal-300"
                  >
                    <option value="partnership">Co-Founder / Equity Partnership</option>
                    <option value="licensing">Technology / Patent Licensing</option>
                    <option value="sale">Outright Sale / Acquisition</option>
                    <option value="investment_required">Angel / VC Investment Required</option>
                    <option value="free_discussion">Free Exploratory Discussion</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Expected Revenue Model *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hardware unit sale + 15% SaaS maintenance subscription"
                  value={formData.expectedRevenueModel}
                  onChange={(e) => setFormData({ ...formData, expectedRevenueModel: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Commercial Terms Summary (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Seeking 30% equity partner with manufacturing facility or $15k upfront license fee."
                  value={formData.dealTermsSummary}
                  onChange={(e) => setFormData({ ...formData, dealTermsSummary: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-white focus:outline-none focus:border-teal-500 resize-none"
                />
              </div>

              {/* IP & Disclaimer Checkbox */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.acceptedDisclaimer}
                    onChange={(e) => setFormData({ ...formData, acceptedDisclaimer: e.target.checked })}
                    className="mt-1 rounded border-slate-700 text-teal-500 focus:ring-0"
                  />
                  <span className="text-xs text-slate-300 leading-relaxed">
                    I confirm that this business idea is my original creation or intellectual property. I understand that IMR does not automatically guarantee commercial outcomes and recommends executing mutual NDAs before disclosing proprietary blueprints.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 font-semibold text-xs"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-teal-500/20"
              >
                Publish Idea to Marketplace
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
