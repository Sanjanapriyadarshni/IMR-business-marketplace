import React from 'react';
import { useIMR } from '../../context/IMRContext';
import {
  Crown,
  Check,
  Zap,
  ShieldCheck,
  Star,
  FileCheck,
  TrendingUp,
  Lock,
  ArrowRight,
} from 'lucide-react';

export const MonetizationSection: React.FC = () => {
  const { addToast } = useIMR();

  const plans = [
    {
      name: 'Starter Member',
      price: 'Free',
      period: 'Forever',
      description: 'Ideal for independent idea creators and exploratory traders.',
      badge: 'Free Tier',
      features: [
        'Post 1 Business Idea or Trade Listing',
        'Standard in-app messaging',
        'Basic search and opportunity matching',
        'Community Q&A participation',
      ],
      popular: false,
      cta: 'Current Plan',
      isCurrent: true,
    },
    {
      name: 'Business Pro',
      price: '$49',
      priceINR: '₹3,999',
      period: 'per month',
      description: 'Designed for active exporters, manufacturers, and startup founders.',
      badge: 'Most Popular',
      features: [
        'Unlimited Business Ideas & Trade Listings',
        'Priority Verified Merchant Badge (Tier 2)',
        'Direct RFQ lead notifications via SMS / Email',
        'Highlighted placement on Home & Category Feeds',
        'Export-Import customs code advisory & HS support',
        'Standard NDA & Term Sheet templates',
      ],
      popular: true,
      cta: 'Upgrade to Business Pro',
      isCurrent: false,
    },
    {
      name: 'Global Enterprise & Investor',
      price: '$199',
      priceINR: '₹16,500',
      period: 'per month',
      description: 'For venture syndicates, large trading houses, and institutional buyers.',
      badge: 'Institutional',
      features: [
        'All Business Pro features included',
        'Dedicated Bilateral Trade Account Officer',
        'Bespoke Country Trade Reports (Customs data & tariff matrices)',
        'IP Licensing Escrow & Legal Verification Assistance',
        'Direct matchmaking with verified foreign buyer syndicates',
        'Featured Spotlight on Global Homepage Carousel',
      ],
      popular: false,
      cta: 'Get Enterprise Suite',
      isCurrent: false,
    },
  ];

  const leadPacks = [
    {
      title: 'Verified Buyer Lead Pack',
      leads: '25 Verified Importers',
      price: '$99 USD',
      desc: 'Direct phone, email, and procurement manager contacts for European & GCC buyers with open RFPs.',
    },
    {
      title: 'Featured Listing Boost (30 Days)',
      leads: '5x Higher Impressions',
      price: '$49 USD',
      desc: 'Pinned banner placement at the top of the Global Trade marketplace and Home screen.',
    },
    {
      title: 'Custom Bilateral Trade & Tariff Dossier',
      leads: 'In-Depth Market Report',
      price: '$149 USD',
      desc: 'Comprehensive analysis of import tariffs, phytosanitary requirements, and competitors for your exact HS code.',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 py-4">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold uppercase tracking-wider mb-1">
          <Crown className="w-3.5 h-3.5" /> Premium Enterprise Growth & Subscriptions
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Accelerate Cross-Border Deals & Monetization
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Upgrade your commercial footprint with verified merchant badges, direct RFQ leads, featured idea placements, and dedicated trade advisory.
        </p>
      </div>

      {/* Subscription Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between transition-all relative ${
              plan.popular
                ? 'bg-gradient-to-b from-teal-950/40 via-slate-900 to-slate-900 border-teal-500 shadow-2xl shadow-teal-500/10 scale-105'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                {plan.badge}
              </span>
            )}

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-white text-lg">{plan.name}</h3>
                {!plan.popular && (
                  <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    {plan.badge}
                  </span>
                )}
              </div>

              <div className="mb-4">
                <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                  {plan.price}
                </span>
                {plan.priceINR && (
                  <span className="text-xs text-slate-400 ml-1.5 font-mono">
                    ({plan.priceINR})
                  </span>
                )}
                <span className="text-xs text-slate-400 ml-1.5">/ {plan.period}</span>
              </div>

              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                {plan.description}
              </p>

              <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
                {plan.features.map((feat, fidx) => (
                  <div key={fidx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300 leading-snug">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button
                onClick={() => {
                  if (plan.isCurrent) return;
                  addToast('Plan Selected', `Initiating upgrade to ${plan.name}`, 'success');
                }}
                disabled={plan.isCurrent}
                className={`w-full py-3 rounded-2xl font-bold text-xs transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 shadow-lg shadow-teal-500/20'
                    : plan.isCurrent
                    ? 'bg-slate-800 text-slate-500 cursor-default'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* A La Carte Lead Packages & Report Packs */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>A La Carte Lead Packs & Trade Dossiers</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Targeted solutions without recurring subscription commitments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {leadPacks.map((pack, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-white text-sm">{pack.title}</h4>
                  <span className="text-xs font-bold text-amber-400 font-mono">{pack.price}</span>
                </div>
                <span className="text-xs font-semibold text-teal-400 block mb-2">{pack.leads}</span>
                <p className="text-xs text-slate-400 leading-relaxed">{pack.desc}</p>
              </div>

              <button
                onClick={() => addToast('Order Initialized', `Added ${pack.title} to checkout.`, 'info')}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 font-semibold text-xs transition-colors flex items-center justify-center gap-1"
              >
                <span>Purchase Pack</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Intellectual Property Legal Notice */}
      <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 flex items-start gap-3.5 text-xs text-slate-400 leading-relaxed">
        <Lock className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-200 block font-semibold mb-1">
            Intellectual Property Escrow & Ownership Protection Notice
          </strong>
          IMR facilitates business idea discovery, technology licensing discussions, and commercial matchmaking. IMR does not automatically transfer legal ownership of intellectual property, trademarks, or registered patents without separate, formally executed written legal transfer agreements and verified escrow protocols.
        </div>
      </div>
    </div>
  );
};
