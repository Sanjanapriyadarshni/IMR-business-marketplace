import React, { useState } from 'react';
import { useIMR } from '../../context/IMRContext';
import { useCursor } from '../../context/CursorContext';
import { MagneticButton } from '../cursor/MagneticButton';
import {
  Package,
  Lightbulb,
  FileCheck,
  Zap,
  Search,
  ArrowRight,
  ShieldCheck,
  Ship,
  DollarSign,
  Tag,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Filter,
} from 'lucide-react';
import type { TradeProduct, BusinessIdea } from '../../types';

interface UnifiedSpatialMarketplaceProps {
  onSelectProduct: (product: TradeProduct) => void;
  onSelectIdea: (idea: BusinessIdea) => void;
  onOpenRFQModal: (product: TradeProduct) => void;
  onOpenPostProduct: () => void;
  onNavigateToMatching: () => void;
  onNavigateToAllTrade: () => void;
}

const CATEGORY_FILTERS = [
  'All Sectors',
  'Food & Beverages',
  'Electronics & Hardware',
  'CleanTech',
  'Industrial & Machinery',
  'Health & Pharma',
];

export const UnifiedSpatialMarketplace: React.FC<UnifiedSpatialMarketplaceProps> = ({
  onSelectProduct,
  onSelectIdea,
  onOpenRFQModal,
  onOpenPostProduct,
  onNavigateToMatching,
  onNavigateToAllTrade,
}) => {
  const { products, ideas } = useIMR();
  const { setCursor } = useCursor();

  const [activeTab, setActiveTab] = useState<'goods' | 'ideas' | 'rfqs' | 'matching'>('goods');
  const [selectedCategory, setSelectedCategory] = useState('All Sectors');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample RFQs data for live order flow
  const LIVE_RFQS = [
    {
      id: 'rfq-1',
      buyer: 'Hamburg Bio-Foods GmbH',
      country: 'Germany 🇩🇪',
      demand: '200 Metric Tons Organic Turmeric (Curcumin > 5%)',
      targetPort: 'Hamburg Port (CIF)',
      budget: '$2.20 - $2.80 / kg',
      deadline: '7 Days Remaining',
      verified: true,
      hsCode: '0910.30',
    },
    {
      id: 'rfq-2',
      buyer: 'Apex Robotics Japan',
      country: 'Japan 🇯🇵',
      demand: '50,000 Units Ultra-Low Power Precision IoT Sensors',
      targetPort: 'Yokohama Port (FOB/CIF)',
      budget: '$18.50 / unit',
      deadline: '12 Days Remaining',
      verified: true,
      hsCode: '8542.31',
    },
    {
      id: 'rfq-3',
      buyer: 'Gulf Horizon Holdings',
      country: 'UAE 🇦🇪',
      demand: '5,000 sqm Microalgae Bio-Reactor Facades',
      targetPort: 'Jebel Ali, Dubai',
      budget: '$450,000 Contract',
      deadline: '15 Days Remaining',
      verified: true,
      hsCode: '8419.89',
    },
    {
      id: 'rfq-4',
      buyer: 'Verde Organics California',
      country: 'United States 🇺🇸',
      demand: '150 Metric Tons Single-Origin Black Pepper & Cumin',
      targetPort: 'Long Beach, CA',
      budget: '$3.40 / kg',
      deadline: '3 Days Remaining',
      verified: true,
      hsCode: '0904.11',
    },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === 'All Sectors' ||
      p.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.hsCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.originCountry.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredIdeas = ideas.filter((idea) => {
    const matchesSearch =
      searchQuery === '' ||
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <section
      id="unified-marketplace"
      className="py-24 px-4 sm:px-8 bg-[#F3EFE7] border-t border-[#D8D2C7] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFDF8] border border-[#D8D2C7] text-[11px] font-mono tracking-wider text-[#171717] uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#171717]" />
              <span>Section 05 // Global Liquidity & Live RFQs</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#171717] tracking-tight leading-[1.02]">
              SPATIAL EXCHANGE <br />
              <span className="font-display font-semibold italic text-[#FF5A36]">
                & ORDER LIQUIDITY
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-[#6B6B63] font-sans leading-relaxed">
            Directly browse export-grade cargo with verified HS Codes, submit live Requests for Quotation (RFQs), or run automated bilateral opportunity matching.
          </p>
        </div>

        {/* Master Exchange Navigation Bar */}
        <div className="bg-[#FFFDF8] rounded-3xl border border-[#D8D2C7] p-4 sm:p-6 mb-10 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#D8D2C7]">
            {/* View Mode Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTab('goods')}
                className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'goods'
                    ? 'bg-[#171717] text-[#FFFDF8]'
                    : 'bg-[#F3EFE7] text-[#6B6B63] hover:text-[#171717]'
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                <span>Trade Goods & Cargo ({products.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('ideas')}
                className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'ideas'
                    ? 'bg-[#171717] text-[#FFFDF8]'
                    : 'bg-[#F3EFE7] text-[#6B6B63] hover:text-[#171717]'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Commercial Ideas ({ideas.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('rfqs')}
                className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'rfqs'
                    ? 'bg-[#171717] text-[#FFFDF8]'
                    : 'bg-[#F3EFE7] text-[#6B6B63] hover:text-[#171717]'
                }`}
              >
                <FileCheck className="w-3.5 h-3.5 text-[#FF5A36]" />
                <span>Live Buyer RFQs (4)</span>
              </button>

              <button
                onClick={() => setActiveTab('matching')}
                className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'matching'
                    ? 'bg-[#FF5A36] text-[#FFFDF8]'
                    : 'bg-[#F3EFE7] text-[#6B6B63] hover:text-[#171717]'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Smart Matchmaker</span>
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenPostProduct}
                className="px-4 py-2 rounded-full bg-[#171717] hover:bg-[#FF5A36] text-[#FFFDF8] text-xs font-mono font-bold tracking-wider uppercase transition-colors shadow-sm"
              >
                + List Export Cargo
              </button>
            </div>
          </div>

          {/* Search & Sector Filters */}
          {activeTab === 'goods' && (
            <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {CATEGORY_FILTERS.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-mono whitespace-nowrap transition-colors ${
                      selectedCategory === cat
                        ? 'bg-[#FF5A36] text-[#FFFDF8] font-bold'
                        : 'bg-[#F3EFE7] text-[#6B6B63] hover:text-[#171717]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6B63]" />
                <input
                  type="text"
                  placeholder="Search goods, HS codes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-full bg-[#F3EFE7] border border-[#D8D2C7] text-xs text-[#171717] placeholder:text-[#6B6B63] focus:outline-none focus:border-[#FF5A36]"
                />
              </div>
            </div>
          )}
        </div>

        {/* TAB 1: Trade Goods Grid */}
        {activeTab === 'goods' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  onMouseEnter={() => setCursor('INSPECT', 'view')}
                  onMouseLeave={() => setCursor(null)}
                  className="group rounded-3xl bg-[#FFFDF8] border border-[#D8D2C7] hover:border-[#FF5A36] p-5 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Image & HS Code Tag */}
                    <div className="relative h-48 rounded-2xl overflow-hidden mb-4 bg-[#EBE5DA]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#171717]/80 backdrop-blur-md text-[#FFFDF8] text-[10px] font-mono font-bold">
                        HS {product.hsCode}
                      </div>

                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#FFFDF8]/90 text-[#171717] text-[10px] font-mono font-semibold">
                        {product.originCountry}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="px-2 py-0.5 rounded bg-[#A8C7B5]/30 text-[#171717] text-[10px] font-mono font-bold">
                        {product.tradeType.toUpperCase()}
                      </span>
                      <span className="text-[11px] text-[#6B6B63] font-mono">
                        {product.supplierCompany}
                      </span>
                    </div>

                    <h3 className="font-editorial text-xl font-bold text-[#171717] group-hover:text-[#FF5A36] transition-colors line-clamp-1">
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#6B6B63] line-clamp-2 mt-1.5 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Incoterms & Certifications */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {product.shippingIncoterms.map((incoterm, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-[#F3EFE7] border border-[#D8D2C7]/60 text-[10px] font-mono text-[#171717]"
                        >
                          {incoterm}
                        </span>
                      ))}
                      {product.certifications.slice(0, 2).map((cert, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-2 py-0.5 rounded bg-[#FFFDF8] border border-[#D8D2C7] text-[10px] font-mono text-[#6B6B63]"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & RFQ CTA Bar */}
                  <div className="mt-6 pt-4 border-t border-[#D8D2C7]/80">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-[10px] font-mono text-[#6B6B63] block">INDICATIVE PRICE:</span>
                        <span className="font-mono font-bold text-sm text-[#171717]">
                          {product.priceRange}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-[#6B6B63] block">MOQ:</span>
                        <span className="font-mono text-xs font-semibold text-[#171717]">
                          {product.minOrderQty}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenRFQModal(product);
                        }}
                        onMouseEnter={() => setCursor('RFQ', 'open')}
                        onMouseLeave={() => setCursor(null)}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#171717] hover:bg-[#FF5A36] text-[#FFFDF8] text-xs font-mono font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Ship className="w-3 h-3" />
                        <span>Request RFQ</span>
                      </button>

                      <button
                        onClick={() => onSelectProduct(product)}
                        className="p-2 rounded-xl bg-[#F3EFE7] hover:bg-[#EBE5DA] border border-[#D8D2C7] text-[#171717] transition-colors"
                        title="View Full Spec"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={onNavigateToAllTrade}
                className="px-8 py-3.5 rounded-full bg-[#FFFDF8] hover:bg-[#EBE5DA] text-[#171717] border border-[#D8D2C7] font-mono text-xs font-bold tracking-wider uppercase transition-colors shadow-sm inline-flex items-center gap-2"
              >
                <span>Browse All 500+ Verified Global Cargo Listings</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: Commercial Ideas Tab */}
        {activeTab === 'ideas' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIdeas.slice(0, 6).map((idea) => (
              <div
                key={idea.id}
                onClick={() => onSelectIdea(idea)}
                className="rounded-3xl bg-[#FFFDF8] border border-[#D8D2C7] hover:border-[#FF5A36] p-6 shadow-sm cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#6B6B63] mb-2">
                    <span className="px-2 py-0.5 rounded bg-[#F3EFE7] font-bold text-[#171717]">
                      {idea.category}
                    </span>
                    <span>{idea.stage.toUpperCase()}</span>
                  </div>
                  <h4 className="font-editorial text-xl font-bold text-[#171717] mb-2">
                    {idea.title}
                  </h4>
                  <p className="text-xs text-[#6B6B63] line-clamp-3">
                    {idea.tagline}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#D8D2C7] flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#171717]">
                    {idea.investmentFormatted}
                  </span>
                  <span className="text-xs font-bold text-[#FF5A36] flex items-center gap-1">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Live Buyer RFQs */}
        {activeTab === 'rfqs' && (
          <div className="space-y-4">
            {LIVE_RFQS.map((rfq) => (
              <div
                key={rfq.id}
                className="rounded-3xl bg-[#FFFDF8] border border-[#D8D2C7] p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FF5A36]/15 text-[#FF5A36]">
                      LIVE BUYER DEMAND
                    </span>
                    <span className="text-xs font-mono text-[#6B6B63]">
                      HS {rfq.hsCode}
                    </span>
                    <span className="text-xs text-[#171717] font-bold">
                      {rfq.country}
                    </span>
                  </div>

                  <h4 className="font-editorial text-2xl font-bold text-[#171717]">
                    {rfq.demand}
                  </h4>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#6B6B63] font-mono">
                    <span>Buyer: <strong className="text-[#171717]">{rfq.buyer}</strong></span>
                    <span>•</span>
                    <span>Port: <strong className="text-[#171717]">{rfq.targetPort}</strong></span>
                    <span>•</span>
                    <span>Target: <strong className="text-[#171717]">{rfq.budget}</strong></span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col items-end gap-2 shrink-0">
                  <span className="text-[11px] font-mono text-amber-600 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{rfq.deadline}</span>
                  </span>

                  <button
                    onClick={() => onNavigateToAllTrade()}
                    className="px-5 py-2.5 rounded-xl bg-[#171717] hover:bg-[#FF5A36] text-[#FFFDF8] text-xs font-mono font-bold tracking-wider uppercase transition-colors shadow-sm"
                  >
                    Submit Quotation
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: Smart Matchmaker Shortcut */}
        {activeTab === 'matching' && (
          <div className="rounded-3xl bg-gradient-to-br from-[#FFFDF8] to-[#F3EFE7] border border-[#D8D2C7] p-8 text-center shadow-lg">
            <div className="max-w-2xl mx-auto">
              <div className="w-16 h-16 rounded-3xl bg-[#171717] text-[#FFFDF8] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#171717]/10">
                <Zap className="w-8 h-8 text-[#FF5A36]" />
              </div>
              <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-[#171717] mb-3">
                Algorithmic Opportunity Matching
              </h3>
              <p className="text-sm text-[#6B6B63] mb-8 leading-relaxed">
                Our correlation engine pairs your business profile against 48 international trade agreements, active customs tariffs, and vetted buyers looking for your exact capabilities.
              </p>

              <MagneticButton
                onClick={onNavigateToMatching}
                cursorLabel="LAUNCH"
                className="px-8 py-4 rounded-full bg-[#171717] hover:bg-[#FF5A36] text-[#FFFDF8] text-xs font-mono font-bold tracking-wider uppercase transition-colors shadow-xl shadow-[#171717]/15 inline-flex items-center gap-2"
              >
                <span>Launch Matching Engine</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
