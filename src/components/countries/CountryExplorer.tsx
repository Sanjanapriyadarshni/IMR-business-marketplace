import React, { useState } from 'react';
import { useIMR } from '../../context/IMRContext';
import {
  Globe,
  ArrowUpRight,
  TrendingUp,
  Package,
  Building2,
  Users,
  ShieldCheck,
  FileCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export const CountryExplorer: React.FC = () => {
  const {
    countries,
    selectedCountryForExplorer,
    setSelectedCountryForExplorer,
    users,
    ideas,
    products,
    setActiveTab,
  } = useIMR();

  const [activeCountryCode, setActiveCountryCode] = useState<string>(
    selectedCountryForExplorer || 'IN'
  );

  const activeCountry = countries.find((c) => c.code === activeCountryCode) || countries[0];

  // Country verified suppliers and buyers
  const countrySuppliers = users.filter(
    (u) =>
      u.country.toLowerCase().includes(activeCountry.name.toLowerCase()) &&
      (u.role === 'supplier' || u.role === 'exporter' || u.role === 'manufacturer')
  );

  const countryBuyers = users.filter(
    (u) =>
      u.country.toLowerCase().includes(activeCountry.name.toLowerCase()) &&
      (u.role === 'buyer' || u.role === 'importer' || u.role === 'investor')
  );

  const countryProducts = products.filter(
    (p) =>
      p.originCountry.toLowerCase().includes(activeCountry.name.toLowerCase()) ||
      p.destinationMarkets.some((m) => m.toLowerCase().includes(activeCountry.name.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-4">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold uppercase tracking-wider">
            Trade Intelligence & Bilateral Pacts
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Country Business & Trade Explorer
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Inspect country-wise export demand, import tariffs, bilateral trade agreements, and direct business contacts.
        </p>
      </div>

      {/* Country Selector Horizontal Ribbon (India -> UAE -> Germany -> USA -> UK -> Singapore -> Malaysia -> Saudi Arabia -> Australia -> Japan) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {countries.map((c) => (
          <button
            key={c.code}
            onClick={() => {
              setActiveCountryCode(c.code);
              setSelectedCountryForExplorer(c.code);
            }}
            className={`px-4 py-2.5 rounded-2xl flex items-center gap-2.5 whitespace-nowrap transition-all border ${
              activeCountryCode === c.code
                ? 'bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border-teal-500 text-white font-bold shadow-lg shadow-teal-500/10 scale-105'
                : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <span className="text-xl">{c.flag}</span>
            <span className="text-xs">{c.name}</span>
          </button>
        ))}
      </div>

      {/* Country Deep Profile View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Key Stats & Bilateral Pacts */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{activeCountry.flag}</span>
                <div>
                  <h2 className="text-xl font-extrabold text-white">{activeCountry.name}</h2>
                  <p className="text-xs text-slate-400">{activeCountry.region}</p>
                </div>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20 font-bold font-mono">
                {activeCountry.code}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-slate-400 font-medium">Nominal GDP</span>
                <span className="font-bold text-white font-mono">{activeCountry.gdp}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-slate-400 font-medium">Trade Trajectory</span>
                <span className="font-semibold text-emerald-400 text-right max-w-[150px] truncate">{activeCountry.tradeBalance}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-medium block">Customs & Tariffs Overview</span>
                <p className="text-slate-300 leading-relaxed text-[11px]">{activeCountry.tariffOverview}</p>
              </div>
            </div>

            {/* Active Bilateral Trade Agreements */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">
                Bilateral Trade Treaties & Pacts
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeCountry.tradePacts.map((pact, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-300 border border-teal-500/20 font-medium"
                  >
                    {pact}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Key Growth Sectors & Major Industries */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Building2 className="w-4 h-4 text-teal-400" />
              <span>Key Growth Sectors & Industries</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <span className="text-slate-400 font-semibold block">Priority Business Sectors:</span>
                <div className="flex flex-wrap gap-1">
                  {activeCountry.keySectors.map((sec, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {sec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <span className="text-slate-400 font-semibold block">Major Industrial Clusters:</span>
                <div className="flex flex-wrap gap-1">
                  {activeCountry.majorIndustries.map((ind, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Exports, Imports, Opportunities & Partners */}
        <div className="lg:col-span-2 space-y-6">
          {/* Export & Import Demands Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Exports */}
            <div className="p-5 rounded-3xl bg-emerald-950/20 border border-emerald-900/40 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <ArrowUpRight className="w-4 h-4" />
                <span>Popular Export Products ({activeCountry.name})</span>
              </div>
              <ul className="space-y-2 text-xs">
                {activeCountry.popularExports.map((exp, i) => (
                  <li
                    key={i}
                    className="p-2.5 rounded-xl bg-slate-950/60 border border-emerald-950/60 text-slate-200 flex items-center justify-between"
                  >
                    <span>{exp}</span>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase">Export Leader</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Imports */}
            <div className="p-5 rounded-3xl bg-blue-950/20 border border-blue-900/40 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Package className="w-4 h-4" />
                <span>High-Demand Imports Required</span>
              </div>
              <ul className="space-y-2 text-xs">
                {activeCountry.popularImports.map((imp, i) => (
                  <li
                    key={i}
                    className="p-2.5 rounded-xl bg-slate-950/60 border border-blue-950/60 text-slate-200 flex items-center justify-between"
                  >
                    <span>{imp}</span>
                    <span className="text-[10px] text-blue-400 font-bold uppercase">In High Demand</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Trade & Market Opportunities */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>Current Market & Trade Opportunities</span>
            </h3>
            <div className="space-y-2.5">
              {activeCountry.marketOpportunities.map((opp, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold shrink-0 mt-0.5 text-[10px]">
                    {i + 1}
                  </span>
                  <p>{opp}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Suppliers & Buyers in this Country */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-400" />
                <span>Verified Business Partners in {activeCountry.name}</span>
              </h3>
              <button
                onClick={() => setActiveTab('trade')}
                className="text-xs text-teal-400 hover:underline flex items-center gap-1"
              >
                <span>Browse All Listings</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {countrySuppliers.map((s) => (
                <div
                  key={s.id}
                  className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={s.avatar}
                      alt={s.name}
                      className="w-9 h-9 rounded-full object-cover border border-slate-700"
                    />
                    <div className="min-w-0">
                      <h4 className="font-semibold text-white text-xs truncate">{s.name}</h4>
                      <p className="text-[11px] text-slate-400 truncate">{s.company}</p>
                      <span className="text-[10px] text-emerald-400 font-semibold">Verified Supplier</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('messages')}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 font-semibold text-xs shrink-0"
                  >
                    Contact
                  </button>
                </div>
              ))}

              {countryBuyers.map((b) => (
                <div
                  key={b.id}
                  className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={b.avatar}
                      alt={b.name}
                      className="w-9 h-9 rounded-full object-cover border border-slate-700"
                    />
                    <div className="min-w-0">
                      <h4 className="font-semibold text-white text-xs truncate">{b.name}</h4>
                      <p className="text-[11px] text-slate-400 truncate">{b.company}</p>
                      <span className="text-[10px] text-blue-400 font-semibold">Verified Buyer</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('messages')}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 font-semibold text-xs shrink-0"
                  >
                    Contact
                  </button>
                </div>
              ))}
            </div>

            {countrySuppliers.length === 0 && countryBuyers.length === 0 && (
              <p className="text-xs text-slate-500 italic py-2">
                More enterprise partners from {activeCountry.name} are onboarding this month.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
