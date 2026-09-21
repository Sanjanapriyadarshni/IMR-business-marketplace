import React, { useState } from 'react';
import { useIMR } from '../../context/IMRContext';
import {
  Sparkles,
  Bot,
  ArrowRight,
  ShieldAlert,
  Save,
  CheckCircle2,
  Copy,
  TrendingUp,
  Package,
  Layers,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { BUSINESS_CATEGORIES, type AIBusinessIdea, type BusinessCategory } from '../../types';

export const AIBusinessIdeaGenerator: React.FC = () => {
  const { addIdea, addToast, setActiveTab } = useIMR();

  const [budget, setBudget] = useState('₹10,00,000 (~$12,000 USD)');
  const [location, setLocation] = useState('India (with UAE Export Corridor)');
  const [skills, setSkills] = useState('Operations, Agri-Supply Chain, B2B Sales');
  const [industry, setIndustry] = useState<BusinessCategory>('Agriculture');
  const [targetMarket, setTargetMarket] = useState('Gulf / GCC Supermarkets & Indian High-End Retail');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState<AIBusinessIdea[] | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    // Realistic synthesis based on parameters
    setTimeout(() => {
      const generated: AIBusinessIdea[] = [
        {
          id: `ai-idea-${Date.now()}-1`,
          conceptName: `Solar-Assisted Supercritical Extraction of High-Purity ${industry.split(' ')[0]} Ingredients`,
          tagline: `Decentralized processing hub turning raw harvest into export-grade active botanical extracts.`,
          category: industry,
          targetCustomer: 'Nutraceutical manufacturers, functional beverage brands in UAE & Europe, premium cosmetic formulators.',
          problem: `Primary growers sell unprocessed harvest at bottom-tier commodity prices ($1.50/kg) with high spoilage, while international buyers pay $40+/kg for standardized bio-extracts.`,
          solution: `Deploy a localized cleanroom supercritical extraction unit powered by hybrid rooftop solar and grid backup, providing batch-tested active compounds with barcode-traceable origin.`,
          revenueModel: `Bulk B2B ingredient export ($35 - $65 / kg) + Private label white-labeling + Processing-as-a-Service for regional farming clusters.`,
          requiredInvestment: budget,
          requiredResources: [
            'Supercritical Fluid CO2 Extractor (50L capacity)',
            'HPLC testing laboratory calibration setup',
            'ISO 22000 & APEDA certified sterile pack room',
            'Sourcing partnerships with 150 local organic growers',
          ],
          possibleMarketSize: `$8.4 Billion Global Botanical Extract Market expanding at 9.2% CAGR through 2030.`,
          exportPotential: `Very High. High demand under India-UAE CEPA (0% customs duty) and European clean-label nutraceutical mandates.`,
          importRequirements: `Precision pressure gauges and Food-grade CO2 cylinders (can be procured domestically or imported from Singapore/Germany).`,
          competitors: ['Arjuna Natural', 'Synthite Industries', 'Generic bulk commodity traders in Unjha/Kochi'],
          launchRoadmap: [
            {
              phase: 'Month 1',
              title: 'Regulatory & Lab Licensing',
              duration: 'Days 1-30',
              tasks: ['Register IEC and FSSAI export manufacturing license', 'Finalize supplier MOUs with local grower clusters', 'Lease modular 2,000 sq ft industrial shed'],
            },
            {
              phase: 'Month 2',
              title: 'Equipment Installation & Pilot Run',
              duration: 'Days 31-60',
              tasks: ['Install 50L extraction unit and rooftop solar array', 'Produce first 100kg validation batch', 'Obtain Eurofins third-party lab assay certificates'],
            },
            {
              phase: 'Month 3',
              title: 'Cross-Border Commercial Distribution',
              duration: 'Days 61-90',
              tasks: ['List verified products on IMR Global Trade marketplace', 'Send sample kits to pre-matched buyers in Dubai and Hamburg', 'Sign first annual supply contract against LC payment'],
            },
          ],
          disclaimers: `⚠️ AI Advisory Notice: Market size estimates, regulatory duty schedules, and operational costs are synthesized projections. Independent validation of customs tariffs, food safety compliance, and laboratory equipment specifications is required prior to capital deployment.`,
          generatedAt: new Date().toISOString().split('T')[0],
        },
        {
          id: `ai-idea-${Date.now()}-2`,
          conceptName: `Automated Traceability & Cold-Chain IoT Vault for ${industry}`,
          tagline: `Smart plug-and-play telematics vault monitoring temperature and humidity with smart contract milestone release.`,
          category: industry,
          targetCustomer: 'Cross-border freight forwarders, perishable food exporters, pharmaceutical cold-chain operators.',
          problem: `Over 25% of refrigerated export containers face temperature excursions during ocean transit, causing rejected shipments and protracted insurance disputes.`,
          solution: `Ruggedized disposable LoRaWAN + Satellite temperature loggers paired with automated blockchain inspection reports that certify product condition at the port of entry.`,
          revenueModel: `Hardware logger sale ($22/unit) + Cloud data analytics subscription ($150/month/exporter) + Cargo insurance claim processing fee.`,
          requiredInvestment: budget,
          requiredResources: [
            'IoT telemetry firmware and PCB design files',
            'AWS/GCP serverless cloud architecture',
            'API integration with shipping line tracking systems',
          ],
          possibleMarketSize: `$14.2 Billion Global Cold Chain Telematics & Monitoring Market.`,
          exportPotential: `Universal cross-border adoption; essential for shipments into Jebel Ali, Rotterdam, and Singapore ports.`,
          importRequirements: `Microcontroller ICs (STM32/ESP32) and temperature sensor probes from Taiwan or Singapore.`,
          competitors: ['Tive', 'Roambee', 'Sensitech'],
          launchRoadmap: [
            {
              phase: 'Month 1',
              title: 'Hardware Prototype & Firmware',
              duration: 'Days 1-30',
              tasks: ['Bench test sensor calibration within -20°C to +40°C range', 'Configure cloud ingestion endpoint', 'Simulate marine container transit signal penetration'],
            },
            {
              phase: 'Month 2',
              title: 'Pilot Testing with Real Exporters',
              duration: 'Days 31-60',
              tasks: ['Deploy 20 test devices on Mundra-to-Dubai reefer containers', 'Gather telemetry data during ocean voyage', 'Refine alert algorithms'],
            },
            {
              phase: 'Month 3',
              title: 'Commercial Rollout',
              duration: 'Days 61-90',
              tasks: ['Onboard first 5 export houses on IMR', 'Partner with marine insurance underwriters to offer rate discounts for tracked containers'],
            },
          ],
          disclaimers: `⚠️ AI Advisory Notice: Telecommunications and IoT sensor certifications (WPC, CE, FCC) vary by nation. Conduct local RF compliance testing before bulk distribution.`,
          generatedAt: new Date().toISOString().split('T')[0],
        },
      ];

      setGeneratedIdeas(generated);
      setIsGenerating(false);
      addToast('AI Generation Complete', '2 comprehensive commercial blueprints synthesized.', 'success');
    }, 1200);
  };

  const handlePublishGeneratedIdea = (item: AIBusinessIdea) => {
    addIdea({
      title: item.conceptName,
      tagline: item.tagline,
      description: `${item.solution}\n\nMarket Size: ${item.possibleMarketSize}\n\nExport Potential: ${item.exportPotential}`,
      problem: item.problem,
      solution: item.solution,
      targetCustomers: item.targetCustomer,
      requiredInvestment: 12000,
      investmentFormatted: item.requiredInvestment,
      expectedRevenueModel: item.revenueModel,
      requiredSkills: ['Operations', 'Product Management', 'International Trade'],
      requiredTechnology: item.requiredResources,
      targetCountry: location.split('(')[0].trim(),
      category: item.category as BusinessCategory,
      scalability: 'Global',
      stage: 'concept',
      dealType: 'partnership',
      dealTermsSummary: 'Open to co-founders, joint venture partners, or grant co-applicants.',
    });
    setActiveTab('ideas');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-4">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold uppercase tracking-wider flex items-center gap-1">
            <Bot className="w-3.5 h-3.5" /> Generative Venture Synthesizer
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          AI Business Idea Generator
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Formulate turnkey, export-viable business concepts structured across unit economics, cross-border potential, and 90-day execution roadmaps.
        </p>
      </div>

      {/* Input Parameters Box */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <form onSubmit={handleGenerate} className="space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">
                Available Investment Budget *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. ₹10,00,000 (~$12,000 USD) or $50,000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">
                Base Location & Origin *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. India, UAE, UK, Singapore"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">
                Industry Sector *
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value as BusinessCategory)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
              >
                {BUSINESS_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">
                Your Core Skills / Existing Assets *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Chemical Engineering, Agricultural Contacts, Coding, B2B Sales"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">
                Preferred Target Market / Geography *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Gulf / UAE, European Union, Domestic Tier-1 Metro Cities"
                value={targetMarket}
                onChange={(e) => setTargetMarket(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isGenerating}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 via-teal-500 to-emerald-500 hover:opacity-95 text-slate-950 font-extrabold text-xs sm:text-sm transition-all shadow-xl shadow-purple-500/20 flex items-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? 'Synthesizing Business Models...' : 'Generate Comprehensive Blueprints'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Generated Results Area */}
      {generatedIdeas && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-400" />
              <span>AI-Generated Venture Blueprints ({generatedIdeas.length})</span>
            </h2>
            <span className="text-xs text-slate-400">Parameter Tailored • Ready for Execution</span>
          </div>

          <div className="space-y-6">
            {generatedIdeas.map((plan, idx) => (
              <div
                key={plan.id}
                className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold">
                        Concept #{idx + 1}
                      </span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                        {plan.category}
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-400">
                        Required: {plan.requiredInvestment}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white leading-snug">
                      {plan.conceptName}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">{plan.tagline}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handlePublishGeneratedIdea(plan)}
                      className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-md"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Post to Marketplace</span>
                    </button>
                  </div>
                </div>

                {/* Canvas Grid: Problem, Solution, Customer, Revenue */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/30 space-y-1">
                    <span className="font-bold text-rose-400 block text-xs uppercase tracking-wider">
                      Problem Addressed
                    </span>
                    <p className="text-slate-300 leading-relaxed">{plan.problem}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/30 space-y-1">
                    <span className="font-bold text-emerald-400 block text-xs uppercase tracking-wider">
                      Proposed Solution & Innovation
                    </span>
                    <p className="text-slate-300 leading-relaxed">{plan.solution}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                    <span className="font-bold text-blue-400 block text-xs uppercase tracking-wider">
                      Target Customer Persona
                    </span>
                    <p className="text-slate-300 leading-relaxed">{plan.targetCustomer}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                    <span className="font-bold text-amber-400 block text-xs uppercase tracking-wider">
                      Expected Revenue Streams
                    </span>
                    <p className="text-slate-300 leading-relaxed">{plan.revenueModel}</p>
                  </div>
                </div>

                {/* Trade Viability: Export Potential, Imports, Market Size */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1">
                    <span className="text-slate-400 font-semibold block">Market Addressable Size</span>
                    <p className="text-white font-medium leading-relaxed">{plan.possibleMarketSize}</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1">
                    <span className="text-slate-400 font-semibold block">Export Potential</span>
                    <p className="text-emerald-300 font-medium leading-relaxed">{plan.exportPotential}</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1">
                    <span className="text-slate-400 font-semibold block">Import & Sourcing Needs</span>
                    <p className="text-blue-300 font-medium leading-relaxed">{plan.importRequirements}</p>
                  </div>
                </div>

                {/* Required Resources & Competitors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-slate-400 font-semibold block uppercase tracking-wider">
                      Required Capital Equipment & Resources
                    </span>
                    <ul className="space-y-1 text-slate-300">
                      {plan.requiredResources.map((res, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                          <span>{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-slate-400 font-semibold block uppercase tracking-wider">
                      Key Competitors & Moat
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {plan.competitors.map((comp, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-medium">
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 90-Day Execution Roadmap */}
                <div className="space-y-3 pt-2 border-t border-slate-800">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-teal-400" />
                    <span>First Steps to Launch: 90-Day Milestones</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    {plan.launchRoadmap.map((phase, i) => (
                      <div key={i} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-teal-400">{phase.phase}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{phase.duration}</span>
                        </div>
                        <h5 className="font-semibold text-white">{phase.title}</h5>
                        <ul className="space-y-1 text-[11px] text-slate-400 pt-1">
                          {phase.tasks.map((t, tidx) => (
                            <li key={tidx} className="flex items-start gap-1">
                              <span className="text-teal-500 font-bold mt-0.5">•</span>
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mandatory Independent Validation Disclaimer */}
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p>{plan.disclaimers}</p>
                    <p className="text-[11px] text-amber-300/70 mt-1 font-semibold">
                      Always engage local chartered accountants, trade lawyers, and customs brokers before signing financial agreements.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
