import React, { useState } from 'react';
import { useIMR } from '../../context/IMRContext';
import {
  Sparkles,
  PlusCircle,
  Handshake,
  KeyRound,
  DollarSign,
  Briefcase,
  ShieldCheck,
  MessageSquare,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import { PostIdeaModal } from './PostIdeaModal';
import type { DealType, BusinessIdea } from '../../types';

interface IdeaCreatorSectionProps {
  onSelectIdea: (idea: BusinessIdea) => void;
}

export const IdeaCreatorSection: React.FC<IdeaCreatorSectionProps> = ({ onSelectIdea }) => {
  const { ideas, currentUser, setActiveTab, setActiveThreadId, threads } = useIMR();
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [selectedDealType, setSelectedDealType] = useState<DealType>('partnership');

  const myCreatedIdeas = ideas.filter((i) => i.founderId === currentUser.id);

  const creatorEnquiries = threads.filter(
    (t) => t.threadType === 'idea_inquiry' || t.threadType === 'investor_proposal'
  );

  const dealModels = [
    {
      type: 'licensing' as DealType,
      title: 'Technology & Patent Licensing',
      icon: KeyRound,
      color: 'from-amber-500/20 to-amber-900/10 border-amber-500/30 text-amber-300',
      description:
        'License your proprietary technology, design patent, or software architecture to established manufacturers in exchange for upfront fees and ongoing % royalties.',
      benefit: 'Passive royalty income with zero manufacturing or supply chain overhead.',
    },
    {
      type: 'partnership' as DealType,
      title: 'Co-Founder & Equity Partnership',
      icon: Handshake,
      color: 'from-teal-500/20 to-teal-900/10 border-teal-500/30 text-teal-300',
      description:
        'Partner with industrial leaders, marketing specialists, or financial co-founders who bring capital and operations to co-build the company.',
      benefit: 'Retain significant equity while leveraging a partner’s distribution muscle.',
    },
    {
      type: 'sale' as DealType,
      title: 'Outright Sale / Asset Buyout',
      icon: DollarSign,
      color: 'from-emerald-500/20 to-emerald-900/10 border-emerald-500/30 text-emerald-300',
      description:
        'Transfer complete ownership of your turnkey business blueprint, supplier contracts, brand domain, and IP for a lump-sum payment.',
      benefit: 'Immediate liquidity realization without operational execution burdens.',
    },
    {
      type: 'investment_required' as DealType,
      title: 'Angel & VC Capital Raise',
      icon: Briefcase,
      color: 'from-blue-500/20 to-blue-900/10 border-blue-500/30 text-blue-300',
      description:
        'Raise institutional or syndicate seed funding while retaining operational control and building your executive team.',
      benefit: 'Access global cross-border investors and international syndicates.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950/40 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
            Idea Monetization Portal
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Sell or License Your Business Idea
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Have a breakthrough concept or patent? Connect with verified manufacturers, investors, and entrepreneurs ready to commercialize your innovation globally.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedDealType('partnership');
            setPostModalOpen(true);
          }}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 via-teal-500 to-emerald-500 hover:opacity-95 text-slate-950 font-extrabold text-sm transition-all shadow-xl shadow-purple-500/20 flex items-center gap-2 shrink-0 group"
        >
          <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          <span>Publish & Monetize Idea</span>
        </button>
      </div>

      {/* 4 Monetization Pathways */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-base">Select Your Desired Deal Structure</h3>
          <span className="text-xs text-slate-400">Choose how you want to transact</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dealModels.map((model) => {
            const Icon = model.icon;
            return (
              <div
                key={model.type}
                className={`p-5 rounded-2xl bg-gradient-to-br ${model.color} border shadow-lg flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-950/80 border border-slate-700/60 text-slate-300 uppercase">
                      Option
                    </span>
                  </div>

                  <h4 className="font-bold text-white text-base mb-1.5">{model.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {model.description}
                  </p>
                  <p className="text-[11px] text-teal-300 font-medium bg-slate-950/60 p-2 rounded-xl border border-slate-800">
                    💡 <span className="font-semibold">Advantage:</span> {model.benefit}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex justify-end">
                  <button
                    onClick={() => {
                      setSelectedDealType(model.type);
                      setPostModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 border border-slate-700"
                  >
                    <span>Post With This Deal Type</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Enquiries on Ideas */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-teal-400" />
            <h3 className="font-bold text-white text-base">Incoming Buyer & Partner Enquiries</h3>
          </div>
          <span className="text-xs text-slate-400">
            {creatorEnquiries.length} Active Conversations
          </span>
        </div>

        {creatorEnquiries.length > 0 ? (
          <div className="space-y-2.5">
            {creatorEnquiries.map((thread) => (
              <div
                key={thread.id}
                onClick={() => {
                  setActiveThreadId(thread.id);
                  setActiveTab('messages');
                }}
                className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-teal-500/50 cursor-pointer transition-all flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={thread.participant.avatar}
                    alt={thread.participant.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-700"
                  />
                  <div>
                    <h4 className="font-semibold text-white text-xs sm:text-sm">
                      {thread.participant.name} • <span className="text-slate-400 font-normal">{thread.participant.company}</span>
                    </h4>
                    <p className="text-xs text-teal-300 font-medium truncate mt-0.5">
                      Subject: {thread.subject}
                    </p>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {thread.lastMessage}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-500 block">{thread.lastMessageTimestamp}</span>
                  <button className="mt-1 px-3 py-1 rounded-lg bg-teal-500/10 text-teal-300 border border-teal-500/30 text-xs font-semibold hover:bg-teal-500 hover:text-slate-950 transition-colors">
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic py-4 text-center">
            No incoming inquiries yet. Publish a new business idea to start receiving partnership requests.
          </p>
        )}
      </div>

      {/* Post Modal */}
      <PostIdeaModal
        isOpen={postModalOpen}
        onClose={() => setPostModalOpen(false)}
        defaultDealType={selectedDealType}
      />
    </div>
  );
};
