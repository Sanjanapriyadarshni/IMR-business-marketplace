import React, { useState, useMemo } from 'react';
import { useIMR } from '../../context/IMRContext';
import { Search, X, Lightbulb, Package, Globe, Users, Atom, ArrowRight } from 'lucide-react';
import { BUSINESS_CATEGORIES } from '../../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEntity?: (type: string, id: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const {
    ideas,
    products,
    countries,
    users,
    advancedTechItems,
    setActiveTab,
    setSelectedCountryForExplorer,
  } = useIMR();

  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'ideas' | 'products' | 'countries' | 'partners' | 'tech'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredResults = useMemo(() => {
    if (!query.trim() && selectedCategory === 'all' && activeFilter === 'all') {
      return {
        ideas: ideas.slice(0, 3),
        products: products.slice(0, 3),
        countries: countries.slice(0, 3),
        partners: users.slice(0, 3),
        tech: advancedTechItems.slice(0, 2),
      };
    }

    const q = query.toLowerCase();

    const matchedIdeas = ideas.filter((item) => {
      const matchesText =
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.targetCountry.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesText && matchesCat;
    });

    const matchedProducts = products.filter((item) => {
      const matchesText =
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.hsCode.toLowerCase().includes(q) ||
        item.originCountry.toLowerCase().includes(q);
      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesText && matchesCat;
    });

    const matchedCountries = countries.filter((c) => {
      return (
        c.name.toLowerCase().includes(q) ||
        c.popularExports.some((e) => e.toLowerCase().includes(q)) ||
        c.popularImports.some((i) => i.toLowerCase().includes(q)) ||
        c.majorIndustries.some((m) => m.toLowerCase().includes(q))
      );
    });

    const matchedPartners = users.filter((u) => {
      return (
        u.name.toLowerCase().includes(q) ||
        u.company.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q) ||
        u.country.toLowerCase().includes(q) ||
        u.industry.toLowerCase().includes(q)
      );
    });

    const matchedTech = advancedTechItems.filter((t) => {
      return (
        t.title.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q)
      );
    });

    return {
      ideas: matchedIdeas,
      products: matchedProducts,
      countries: matchedCountries,
      partners: matchedPartners,
      tech: matchedTech,
    };
  }, [query, selectedCategory, activeFilter, ideas, products, countries, users, advancedTechItems]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-16 p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Search Input Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/90">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-teal-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              autoFocus
              placeholder="Search ideas, HS codes, export products, verified suppliers, countries..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-12 pr-10 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500 transition-colors shadow-inner"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick entity pills */}
          <div className="flex items-center gap-2 mt-3 overflow-x-auto no-scrollbar text-xs">
            {(['all', 'ideas', 'products', 'countries', 'partners', 'tech'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded-lg font-medium capitalize whitespace-nowrap transition-all ${
                  activeFilter === filter
                    ? 'bg-teal-500 text-slate-950 shadow-md font-semibold'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {filter === 'tech' ? 'Frontier Tech' : filter}
              </button>
            ))}

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-800 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 border border-slate-700 focus:outline-none focus:border-teal-500 ml-auto shrink-0"
            >
              <option value="all">All 22 Categories</option>
              {BUSINESS_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Results Area */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Ideas Section */}
          {(activeFilter === 'all' || activeFilter === 'ideas') && filteredResults.ideas.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-teal-400">
                <span className="flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" /> Business Ideas ({filteredResults.ideas.length})
                </span>
                <button
                  onClick={() => {
                    setActiveTab('ideas');
                    onClose();
                  }}
                  className="hover:underline flex items-center gap-1 normal-case text-slate-400"
                >
                  View all in marketplace <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {filteredResults.ideas.map((idea) => (
                  <div
                    key={idea.id}
                    onClick={() => {
                      setActiveTab('ideas');
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-teal-500/50 cursor-pointer transition-all flex items-start justify-between gap-3 group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 font-medium">
                          {idea.category}
                        </span>
                        <span className="text-xs text-slate-400">Target: {idea.targetCountry}</span>
                      </div>
                      <h4 className="font-semibold text-slate-100 group-hover:text-teal-300 transition-colors mt-1">
                        {idea.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{idea.tagline}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-amber-400 block">{idea.investmentFormatted}</span>
                      <span className="text-[10px] text-slate-500 uppercase">{idea.dealType.replace('_', ' ')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trade Products Section */}
          {(activeFilter === 'all' || activeFilter === 'products') && filteredResults.products.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-emerald-400">
                <span className="flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5" /> Export & Import Listings ({filteredResults.products.length})
                </span>
                <button
                  onClick={() => {
                    setActiveTab('trade');
                    onClose();
                  }}
                  className="hover:underline flex items-center gap-1 normal-case text-slate-400"
                >
                  View in Global Trade <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {filteredResults.products.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      setActiveTab('trade');
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-12 h-12 rounded-lg object-cover border border-slate-700"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-bold ${
                              prod.tradeType === 'export'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-blue-500/20 text-blue-300'
                            }`}
                          >
                            {prod.tradeType}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">HS {prod.hsCode}</span>
                        </div>
                        <h4 className="font-semibold text-slate-100 group-hover:text-emerald-300 transition-colors mt-0.5">
                          {prod.name}
                        </h4>
                        <span className="text-xs text-slate-400">Origin: {prod.originCountry} • MOQ: {prod.minOrderQty}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-semibold text-white">{prod.priceRange}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Countries Section */}
          {(activeFilter === 'all' || activeFilter === 'countries') && filteredResults.countries.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-amber-400">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" /> Global Trade Markets ({filteredResults.countries.length})
                </span>
                <button
                  onClick={() => {
                    setActiveTab('countries');
                    onClose();
                  }}
                  className="hover:underline flex items-center gap-1 normal-case text-slate-400"
                >
                  Country Explorer <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredResults.countries.map((country) => (
                  <div
                    key={country.code}
                    onClick={() => {
                      setSelectedCountryForExplorer(country.code);
                      setActiveTab('countries');
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all flex items-center gap-3"
                  >
                    <span className="text-3xl">{country.flag}</span>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-slate-100">{country.name}</h4>
                      <p className="text-xs text-slate-400 truncate">
                        Top: {country.popularExports.slice(0, 2).join(', ')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Partners Section */}
          {(activeFilter === 'all' || activeFilter === 'partners') && filteredResults.partners.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-blue-400">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Verified Business Partners ({filteredResults.partners.length})
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredResults.partners.map((partner) => (
                  <div
                    key={partner.id}
                    onClick={() => {
                      setActiveTab('profile');
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-blue-500/50 cursor-pointer transition-all flex items-center gap-3"
                  >
                    <img
                      src={partner.avatar}
                      alt={partner.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-700"
                    />
                    <div className="min-w-0">
                      <h4 className="font-semibold text-slate-100 truncate">{partner.name}</h4>
                      <p className="text-xs text-slate-400 capitalize truncate">
                        {partner.role.replace(/_/g, ' ')} • {partner.country}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Frontier Tech Section */}
          {(activeFilter === 'all' || activeFilter === 'tech') && filteredResults.tech.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-purple-400">
                <span className="flex items-center gap-1.5">
                  <Atom className="w-3.5 h-3.5" /> Frontier & Advanced Tech ({filteredResults.tech.length})
                </span>
                <button
                  onClick={() => {
                    setActiveTab('advanced_tech');
                    onClose();
                  }}
                  className="hover:underline flex items-center gap-1 normal-case text-slate-400"
                >
                  Explore Section <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {filteredResults.tech.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setActiveTab('advanced_tech');
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-purple-500/50 cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-medium">
                          {item.category}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                          {item.scientificStatus}
                        </span>
                      </div>
                      <h4 className="font-semibold text-slate-100 mt-1">{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredResults.ideas.length === 0 &&
            filteredResults.products.length === 0 &&
            filteredResults.countries.length === 0 &&
            filteredResults.partners.length === 0 &&
            filteredResults.tech.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                <Search className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm font-medium">No matches found for "{query}"</p>
                <p className="text-xs text-slate-600 mt-1">Try searching for "spices", "India", "cold storage", "solar", or "HS 0910"</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
