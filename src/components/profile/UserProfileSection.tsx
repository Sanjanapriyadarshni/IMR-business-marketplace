import React, { useState } from 'react';
import { useIMR } from '../../context/IMRContext';
import {
  ShieldCheck,
  Award,
  Globe,
  Star,
  CheckCircle2,
  Building2,
  Mail,
  Phone,
  Briefcase,
  Layers,
  Edit3,
  ExternalLink,
  PlusCircle,
  Package,
  Lightbulb,
} from 'lucide-react';
import { VerificationModal } from './VerificationModal';
import { IdeaDetailModal } from '../ideas/IdeaDetailModal';
import { ProductDetailModal } from '../trade/ProductDetailModal';
import type { BusinessIdea, TradeProduct } from '../../types';

export const UserProfileSection: React.FC = () => {
  const { currentUser, setCurrentUser, ideas, products, addToast } = useIMR();

  const [activeSubTab, setActiveSubTab] = useState<'ideas' | 'products' | 'reviews'>('ideas');
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<BusinessIdea | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<TradeProduct | null>(null);

  // Edit profile state
  const [editForm, setEditForm] = useState({
    name: currentUser.name,
    company: currentUser.company,
    bio: currentUser.bio,
    industry: currentUser.industry,
    experienceYears: currentUser.experienceYears,
    country: currentUser.country,
    phone: currentUser.phone || '',
    website: currentUser.website || '',
  });

  const myIdeas = ideas.filter((i) => i.founderId === currentUser.id);
  const myProducts = products.filter((p) => p.supplierId === currentUser.id);

  const sampleReviews = [
    {
      id: 'rev-1',
      author: 'Hans Richter (Importer, Bavaria Naturkost, Germany)',
      rating: 5,
      comment: 'Exceptional transparency and meticulous batch testing documentation. Shipment arrived at Hamburg exactly on schedule.',
      date: 'August 2026',
    },
    {
      id: 'rev-2',
      author: 'Tariq Al-Mansoor (Investor, Gulf Horizon Ventures, UAE)',
      rating: 5,
      comment: 'Very solid operational grasp of cross-border supply mechanics. We syndicated their seed expansion with confidence.',
      date: 'July 2026',
    },
  ];

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser({
      ...currentUser,
      ...editForm,
    });
    setEditModalOpen(false);
    addToast('Profile Updated', 'Your company credentials have been saved.', 'success');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 sm:px-6 py-4">
      {/* Profile Card Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-2 border-teal-500/40 shadow-xl"
              />
              {currentUser.verifiedTier !== 'unverified' && (
                <div className="absolute -bottom-1 -right-1 p-1.5 rounded-xl bg-teal-500 text-slate-950 shadow-md">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {currentUser.name}
                </h1>
                <span className="text-xl">
                  {currentUser.countryCode === 'IN' ? '🇮🇳' : currentUser.countryCode === 'AE' ? '🇦🇪' : currentUser.countryCode === 'GB' ? '🇬🇧' : currentUser.countryCode === 'SG' ? '🇸🇬' : '🌐'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {currentUser.company} • {currentUser.country}
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs px-3 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 font-bold capitalize">
                  {currentUser.role.replace(/_/g, ' ')}
                </span>
                <span className="text-xs text-slate-400">
                  {currentUser.experienceYears} Years Experience
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => setEditModalOpen(true)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>

            <button
              onClick={() => setVerificationModalOpen(true)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verification Badge</span>
            </button>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
          {currentUser.bio}
        </p>

        {/* Quick Reputation & Credentials Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Trust & Reputation</span>
            <span className="text-lg font-bold text-emerald-400 font-mono mt-0.5 block">
              {currentUser.reputationScore}% Verified
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Verification Tier</span>
            <span className="text-xs font-bold text-teal-300 mt-0.5 block uppercase">
              {currentUser.verifiedTier.replace('_', ' ')}
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Active Listings</span>
            <span className="text-base font-bold text-white font-mono mt-0.5 block">
              {myIdeas.length + myProducts.length} Items
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Industry Domain</span>
            <span className="text-xs font-semibold text-slate-200 mt-0.5 block truncate">
              {currentUser.industry}
            </span>
          </div>
        </div>

        {/* Badges & Trade Interests */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <div>
            <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[11px] mb-1.5">
              Verified Accreditation Badges
            </span>
            <div className="flex flex-wrap gap-1.5">
              {currentUser.verificationBadges.map((badge, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 rounded-xl bg-teal-500/10 text-teal-300 border border-teal-500/20 font-medium flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  <span>{badge}</span>
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[11px] mb-1.5">
              Cross-Border Trade & Investment Interests
            </span>
            <div className="flex flex-wrap gap-1.5">
              {currentUser.interests.map((interest, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700"
                >
                  #{interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio & Activity Sub-Tabs */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-semibold w-fit">
          <button
            onClick={() => setActiveSubTab('ideas')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeSubTab === 'ideas'
                ? 'bg-teal-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>My Business Ideas ({myIdeas.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('products')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeSubTab === 'products'
                ? 'bg-teal-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>My Trade Listings ({myProducts.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('reviews')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeSubTab === 'reviews'
                ? 'bg-teal-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Reputation & Reviews (4.9 / 5.0)</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeSubTab === 'ideas' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myIdeas.length > 0 ? (
              myIdeas.map((idea) => (
                <div
                  key={idea.id}
                  onClick={() => setSelectedIdea(idea)}
                  className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-teal-500/50 cursor-pointer transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-300 font-semibold">
                      {idea.category}
                    </span>
                    <h4 className="font-bold text-white text-base mt-2">{idea.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{idea.tagline}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-amber-400 font-bold font-mono">{idea.investmentFormatted}</span>
                    <span className="text-teal-400 font-semibold">Review ➔</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic py-6 col-span-2 text-center">
                You have not published any business ideas under this profile yet.
              </p>
            )}
          </div>
        )}

        {activeSubTab === 'products' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myProducts.length > 0 ? (
              myProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => setSelectedProduct(prod)}
                  className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all flex items-center gap-4"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-700 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-white text-sm truncate">{prod.name}</h4>
                    <span className="text-xs font-mono text-emerald-400 font-bold block">{prod.priceRange}</span>
                    <span className="text-[11px] text-slate-400">HS: {prod.hsCode} • MOQ: {prod.minOrderQty}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic py-6 col-span-2 text-center">
                You have not published any global trade products yet.
              </p>
            )}
          </div>
        )}

        {activeSubTab === 'reviews' && (
          <div className="space-y-3">
            {sampleReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{rev.author}</span>
                  <span className="text-slate-500">{rev.date}</span>
                </div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 leading-relaxed italic">{rev.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Verification Modal */}
      <VerificationModal
        isOpen={verificationModalOpen}
        onClose={() => setVerificationModalOpen(false)}
      />

      {/* Edit Profile Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl">
            <h3 className="font-bold text-white text-base mb-4">Edit Business Profile</h3>
            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Company / Enterprise</label>
                <input
                  type="text"
                  required
                  value={editForm.company}
                  onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Country</label>
                <input
                  type="text"
                  required
                  value={editForm.country}
                  onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Professional Bio</label>
                <textarea
                  rows={3}
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white resize-none"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Idea Modal */}
      <IdeaDetailModal
        idea={selectedIdea}
        onClose={() => setSelectedIdea(null)}
      />

      {/* Product Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
