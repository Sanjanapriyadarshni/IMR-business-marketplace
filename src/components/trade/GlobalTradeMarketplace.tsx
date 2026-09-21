import React, { useState, useMemo } from 'react';
import { useIMR } from '../../context/IMRContext';
import {
  Search,
  PlusCircle,
  Package,
  Globe2,
  FileText,
  ShieldCheck,
  Building2,
  Users,
  Anchor,
  TrendingUp,
  ArrowRight,
  Filter,
} from 'lucide-react';
import type { TradeProduct } from '../../types';
import { ProductDetailModal } from './ProductDetailModal';
import { PostProductModal } from './PostProductModal';
import { RFQModal } from './RFQModal';

type TradeTab =
  | 'export'
  | 'import'
  | 'suppliers'
  | 'manufacturers'
  | 'buyers'
  | 'emerging';

export const GlobalTradeMarketplace: React.FC = () => {
  const { products, users, countries, setSelectedCountryForExplorer, setActiveTab } = useIMR();

  const [activeTab, setActiveTabLocal] = useState<TradeTab>('export');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<TradeProduct | null>(null);
  const [rfqProduct, setRfqProduct] = useState<TradeProduct | null>(null);
  const [postModalOpen, setPostModalOpen] = useState(false);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.hsCode.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.originCountry.toLowerCase().includes(q);

      const matchesType =
        activeTab === 'export'
          ? item.tradeType === 'export'
          : activeTab === 'import'
          ? item.tradeType === 'import'
          : true;

      const matchesCountry =
        selectedCountry === 'all' ||
        item.originCountry.toLowerCase().includes(selectedCountry.toLowerCase()) ||
        item.destinationMarkets.some((m) => m.toLowerCase().includes(selectedCountry.toLowerCase()));

      return matchesSearch && matchesType && matchesCountry;
    });
  }, [products, searchQuery, activeTab, selectedCountry]);

  // Filtered Partners (Suppliers / Manufacturers / Buyers)
  const filteredPartners = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(q) ||
        user.company.toLowerCase().includes(q) ||
        user.industry.toLowerCase().includes(q) ||
        user.country.toLowerCase().includes(q);

      const matchesRole =
        activeTab === 'suppliers'
          ? user.role === 'supplier' || user.role === 'exporter'
          : activeTab === 'manufacturers'
          ? user.role === 'manufacturer'
          : activeTab === 'buyers'
          ? user.role === 'buyer' || user.role === 'importer'
          : true;

      const matchesCountry =
        selectedCountry === 'all' || user.country.toLowerCase().includes(selectedCountry.toLowerCase());

      return matchesSearch && matchesRole && matchesCountry;
    });
  }, [users, searchQuery, activeTab, selectedCountry]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-4">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-wider">
              Cross-Border Trade Portal
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Global Trade Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Verified suppliers, manufacturers, export-ready commodities, and international buy requests.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setPostModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 group"
          >
            <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            <span>List Trade Product / RFP</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-1 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-semibold">
        <button
          onClick={() => setActiveTabLocal('export')}
          className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'export'
              ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Products for Export</span>
        </button>

        <button
          onClick={() => setActiveTabLocal('import')}
          className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'import'
              ? 'bg-blue-500 text-slate-950 shadow-md font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Products for Import (RFPs)</span>
        </button>

        <button
          onClick={() => setActiveTabLocal('suppliers')}
          className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'suppliers'
              ? 'bg-teal-500 text-slate-950 shadow-md font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Verified Suppliers</span>
        </button>

        <button
          onClick={() => setActiveTabLocal('manufacturers')}
          className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'manufacturers'
              ? 'bg-indigo-500 text-slate-950 shadow-md font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Manufacturers</span>
        </button>

        <button
          onClick={() => setActiveTabLocal('buyers')}
          className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'buyers'
              ? 'bg-rose-500 text-slate-950 shadow-md font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Active Buyers</span>
        </button>

        <button
          onClick={() => setActiveTabLocal('emerging')}
          className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'emerging'
              ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Emerging Trade Corridors</span>
        </button>
      </div>

      {/* Search & Country Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by product, HS code, chemical purity, supplier name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Trading Countries</option>
            <option value="India">India 🇮🇳</option>
            <option value="United Arab Emirates">UAE 🇦🇪</option>
            <option value="Germany">Germany 🇩🇪</option>
            <option value="United States">USA 🇺🇸</option>
            <option value="United Kingdom">UK 🇬🇧</option>
            <option value="Singapore">Singapore 🇸🇬</option>
            <option value="Japan">Japan 🇯🇵</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Products or Partners or Emerging Corridors */}
      {activeTab === 'emerging' ? (
        /* Emerging Corridors */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base">Top High-Growth Trade Corridors</h3>
            <span className="text-xs text-slate-400">Grounded in 2026 customs & CEPA treaty data</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {countries.slice(0, 6).map((c) => (
              <div
                key={c.code}
                className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">{c.flag}</span>
                    <div>
                      <h4 className="font-bold text-white text-base">{c.name}</h4>
                      <p className="text-xs text-slate-400">{c.region} • GDP {c.gdp}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCountryForExplorer(c.code);
                      setActiveTab('countries');
                    }}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1">
                    <span className="text-slate-400 font-semibold block">Key Growth Sector</span>
                    <span className="text-emerald-300 font-medium">{c.keySectors.slice(0, 2).join(' • ')}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1">
                    <span className="text-slate-400 font-semibold block">Treaty / Free Trade Advantage</span>
                    <span className="text-amber-300 font-medium">{c.tradePacts[0] || 'MFN Customs Treaty'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  <span>{c.activeSuppliersCount.toLocaleString()} Verified Suppliers</span>
                  <span>{c.activeBuyersCount.toLocaleString()} Active Buyers</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : activeTab === 'suppliers' || activeTab === 'manufacturers' || activeTab === 'buyers' ? (
        /* Partners Grid */
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Showing {filteredPartners.length} registered business entities</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPartners.map((user) => (
              <div
                key={user.id}
                className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-teal-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-700"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-white text-sm truncate">{user.name}</h4>
                        {user.verifiedTier !== 'unverified' && (
                          <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-400 truncate">{user.company}</p>
                      <span className="text-[11px] text-teal-300 font-medium">
                        {user.country} • {user.experienceYears} yrs exp
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                    {user.bio}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {user.verificationBadges.map((b, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-300 border border-teal-500/20 font-medium"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-semibold">
                    Trust: <strong className="text-emerald-400">{user.reputationScore}%</strong> ({user.reviewsCount} reviews)
                  </span>
                  <button
                    onClick={() => setActiveTab('messages')}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 font-semibold text-xs transition-colors"
                  >
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Products Grid (Export & Import) */
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Showing {filteredProducts.length} trade items</span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between group shadow-lg hover:shadow-emerald-500/5"
                >
                  <div>
                    {/* Image & Badges */}
                    <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-950 mb-3.5 border border-slate-800">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 flex items-center gap-1.5">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase shadow ${
                            prod.tradeType === 'export'
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-blue-500 text-white'
                          }`}
                        >
                          {prod.tradeType}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-white font-mono border border-slate-700">
                          HS {prod.hsCode}
                        </span>
                      </div>
                      {prod.verifiedSupplier && (
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-slate-950/90 text-teal-300 text-[10px] font-semibold flex items-center gap-1 border border-teal-500/30">
                          <ShieldCheck className="w-3 h-3 text-teal-400" />
                          <span>Verified</span>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => setSelectedProduct(prod)}
                      className="font-bold text-sm sm:text-base text-white group-hover:text-emerald-300 transition-colors cursor-pointer line-clamp-2"
                    >
                      {prod.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>

                    {/* Price & MOQ Box */}
                    <div className="mt-3.5 p-3 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Approx Price:</span>
                        <span className="font-extrabold text-emerald-400 font-mono">
                          {prod.priceRange}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Min Order Qty:</span>
                        <span className="font-semibold text-white">{prod.minOrderQty}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Origin:</span>
                        <span className="text-slate-200">{prod.originCountry}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedProduct(prod)}
                      className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
                    >
                      Inspect Specs
                    </button>
                    <button
                      onClick={() => setRfqProduct(prod)}
                      className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-md shadow-emerald-500/20"
                    >
                      Request RFQ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-slate-900/40 rounded-3xl border border-slate-800 text-slate-500">
              <Package className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="font-semibold text-slate-400 text-sm">No trade listings found</p>
              <p className="text-xs mt-1">Try switching tabs or resetting the search query.</p>
            </div>
          )}
        </div>
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* RFQ Modal */}
      <RFQModal
        product={rfqProduct}
        isOpen={!!rfqProduct}
        onClose={() => setRfqProduct(null)}
      />

      {/* Post Product Modal */}
      <PostProductModal
        isOpen={postModalOpen}
        onClose={() => setPostModalOpen(false)}
      />
    </div>
  );
};
