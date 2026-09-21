import React, { useState } from 'react';
import { useIMR } from '../../context/IMRContext';
import {
  X,
  Bookmark,
  Heart,
  Share2,
  MessageSquare,
  Handshake,
  KeyRound,
  ShieldCheck,
  DollarSign,
  Briefcase,
  Layers,
  Wrench,
  Globe,
  AlertTriangle,
  HelpCircle,
  Send,
  Flag,
} from 'lucide-react';
import type { BusinessIdea } from '../../types';
import { ReportModal } from '../common/ReportModal';

interface IdeaDetailModalProps {
  idea: BusinessIdea | null;
  onClose: () => void;
}

export const IdeaDetailModal: React.FC<IdeaDetailModalProps> = ({ idea, onClose }) => {
  const {
    currentUser,
    likeIdea,
    saveIdea,
    savedIdeaIds,
    likedIdeaIds,
    askIdeaQuestion,
    startConversationWith,
    setActiveTab,
    setActiveThreadId,
    sendMessage,
    addToast,
  } = useIMR();

  const [questionText, setQuestionText] = useState('');
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [licensingDrawerOpen, setLicensingDrawerOpen] = useState(false);
  const [partnershipDrawerOpen, setPartnershipDrawerOpen] = useState(false);
  const [partnershipOffer, setPartnershipOffer] = useState({
    equity: '25%',
    capital: '$20,000',
    role: 'Operational & Distribution Lead',
  });
  const [licensingOffer, setLicensingOffer] = useState({
    royalty: '4.5%',
    upfront: '$10,000',
    territory: 'European Union & GCC',
  });

  if (!idea) return null;

  const isSaved = savedIdeaIds.includes(idea.id);
  const isLiked = likedIdeaIds.includes(idea.id);

  const handleContactCreator = () => {
    const threadId = startConversationWith(
      idea.founderId,
      `Inquiry: ${idea.title}`,
      'idea_inquiry',
      `Hello ${idea.founderName}, I discovered your business idea "${idea.title}" on IMR and would like to discuss next steps.`,
      idea.id,
      idea.title
    );
    setActiveThreadId(threadId);
    setActiveTab('messages');
    onClose();
  };

  const handleSendPartnership = (e: React.FormEvent) => {
    e.preventDefault();
    const threadId = startConversationWith(
      idea.founderId,
      `Partnership Proposal: ${idea.title}`,
      'investor_proposal',
      undefined,
      idea.id,
      idea.title
    );
    sendMessage(threadId, `Formal Partnership Proposal for ${idea.title}`, 'proposal', {
      proposal: {
        title: `Partnership Proposal for ${idea.title}`,
        amount: partnershipOffer.capital,
        equityOrRoyalty: `${partnershipOffer.equity} Equity Share`,
        terms: `Role: ${partnershipOffer.role}. Seeking formal joint venture discussion.`,
        status: 'pending',
      },
    });
    setPartnershipDrawerOpen(false);
    setActiveThreadId(threadId);
    setActiveTab('messages');
    addToast('Proposal Sent', 'Your partnership proposal has been submitted directly to the creator.', 'success');
    onClose();
  };

  const handleSendLicensing = (e: React.FormEvent) => {
    e.preventDefault();
    const threadId = startConversationWith(
      idea.founderId,
      `Licensing Offer: ${idea.title}`,
      'idea_inquiry',
      undefined,
      idea.id,
      idea.title
    );
    sendMessage(threadId, `Formal Technology Licensing Discussion`, 'proposal', {
      proposal: {
        title: `Technology Licensing Terms for ${idea.title}`,
        amount: licensingOffer.upfront + ' Upfront License Fee',
        equityOrRoyalty: `${licensingOffer.royalty} Ongoing Royalty`,
        terms: `Territory: ${licensingOffer.territory}. Mutual NDA required before technical transfer.`,
        status: 'pending',
      },
    });
    setLicensingDrawerOpen(false);
    setActiveThreadId(threadId);
    setActiveTab('messages');
    addToast('Licensing Discussion Initiated', 'Terms submitted to creator in Messages.', 'success');
    onClose();
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    askIdeaQuestion(idea.id, questionText);
    setQuestionText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800/80 bg-slate-900/90 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 font-semibold">
                {idea.category}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium capitalize">
                Stage: {idea.stage.replace(/_/g, ' ')}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium capitalize">
                {idea.dealType.replace(/_/g, ' ')}
              </span>
              {idea.scientificStatus && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-medium">
                  {idea.scientificStatus}
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight leading-snug">
              {idea.title}
            </h2>
            <p className="text-xs text-slate-400 mt-1">{idea.tagline}</p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => saveIdea(idea.id)}
              className={`p-2 rounded-xl border transition-colors ${
                isSaved
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
              title={isSaved ? 'Remove from Saved' : 'Save Idea'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => likeIdea(idea.id)}
              className={`p-2 rounded-xl border transition-colors ${
                isLiked
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
              title="Like Idea"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700 hover:bg-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 block font-medium">Required Investment</span>
              <span className="text-base font-bold text-amber-400 mt-0.5 block">{idea.investmentFormatted}</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 block font-medium">Scalability Scope</span>
              <span className="text-sm font-bold text-emerald-400 mt-0.5 block">{idea.scalability} Reach</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 block font-medium">Target Market</span>
              <span className="text-sm font-semibold text-white mt-0.5 block">{idea.targetCountry}</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 block font-medium">Monetization Intent</span>
              <span className="text-xs font-semibold text-teal-300 mt-0.5 block capitalize">{idea.dealType.replace(/_/g, ' ')}</span>
            </div>
          </div>

          {/* Founder Profile Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300 font-bold text-lg">
                {idea.founderName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-white text-sm">{idea.founderName}</h4>
                  {idea.founderVerified && (
                    <span title="Verified Creator">
                      <ShieldCheck className="w-4 h-4 text-teal-400" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400">{idea.founderCompany} • {idea.founderCountry}</p>
                <span className="text-[11px] text-teal-300 font-medium">Role: {idea.founderRole}</span>
              </div>
            </div>

            <button
              onClick={handleContactCreator}
              className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-teal-500/20"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Contact Creator</span>
            </button>
          </div>

          {/* Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/30">
              <div className="flex items-center gap-2 text-rose-400 font-semibold mb-2 text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" /> The Problem Being Solved
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{idea.problem}</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/30">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2 text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" /> The Proposed Solution
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{idea.solution}</p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Detailed Description</h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line bg-slate-950/40 p-4 rounded-2xl border border-slate-800/80">
              {idea.description}
            </p>
          </div>

          {/* Commercial Canvas: Revenue Model & Customers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                <DollarSign className="w-4 h-4" /> Expected Revenue Model
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{idea.expectedRevenueModel}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 text-blue-400 text-xs font-semibold uppercase tracking-wider">
                <Briefcase className="w-4 h-4" /> Target Customers & Segments
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{idea.targetCustomers}</p>
            </div>
          </div>

          {/* Required Skills & Tech Stack */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-1.5 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                <Wrench className="w-4 h-4" /> Required Skills / Co-Founder Expertise
              </div>
              <div className="flex flex-wrap gap-1.5">
                {idea.requiredSkills.map((skill, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-1.5 text-teal-400 text-xs font-semibold uppercase tracking-wider">
                <Layers className="w-4 h-4" /> Required Technology & Architecture
              </div>
              <div className="flex flex-wrap gap-1.5">
                {idea.requiredTechnology.map((tech, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-300 border border-teal-500/20 font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Deal Structure & Terms */}
          {idea.dealTermsSummary && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                Creator's Deal Expectation & Terms
              </span>
              <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">{idea.dealTermsSummary}</p>
            </div>
          )}

          {/* Public Q&A Section */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-teal-400" /> Community Questions & Creator Answers ({idea.questions?.length || 0})
              </h4>
            </div>

            {idea.questions && idea.questions.length > 0 ? (
              <div className="space-y-3">
                {idea.questions.map((q) => (
                  <div key={q.id} className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-semibold text-slate-300">Q: {q.askerName}</span>
                      <span>{q.timestamp}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 font-medium">{q.question}</p>
                    {q.answer ? (
                      <div className="mt-2 pl-3 border-l-2 border-teal-500 text-xs text-teal-200 bg-teal-500/5 p-2 rounded-r-xl">
                        <span className="font-bold block text-teal-400">Creator Answer:</span>
                        {q.answer}
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-500 italic block">Awaiting creator response</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No public questions asked yet. Be the first to ask!</p>
            )}

            {/* Ask Question Form */}
            <form onSubmit={handleAskQuestion} className="flex gap-2">
              <input
                type="text"
                placeholder="Ask the creator a question about this idea..."
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-teal-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Ask</span>
              </button>
            </form>
          </div>
        </div>

        {/* Action Bar Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setReportModalOpen(true)}
              className="text-xs text-slate-500 hover:text-rose-400 transition-colors flex items-center gap-1"
            >
              <Flag className="w-3 h-3" />
              <span>Report Idea</span>
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setLicensingDrawerOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 font-semibold text-xs transition-colors flex items-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>Discuss Licensing / Buy</span>
            </button>

            <button
              onClick={() => setPartnershipDrawerOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-teal-500/20 flex items-center gap-1.5"
            >
              <Handshake className="w-3.5 h-3.5" />
              <span>Propose Partnership</span>
            </button>
          </div>
        </div>

        {/* Partnership Proposal Modal Drawer */}
        {partnershipDrawerOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-teal-400">
                  <Handshake className="w-5 h-5" />
                  <h3 className="font-bold text-sm text-white">Propose Partnership</h3>
                </div>
                <button
                  onClick={() => setPartnershipDrawerOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSendPartnership} className="mt-4 space-y-3.5 text-xs">
                <div>
                  <label className="text-slate-400 font-medium block mb-1">Target Business Idea</label>
                  <p className="font-bold text-white bg-slate-950 p-2 rounded-xl border border-slate-800 truncate">
                    {idea.title}
                  </p>
                </div>

                <div>
                  <label className="text-slate-400 font-medium block mb-1">Proposed Capital Contribution</label>
                  <input
                    type="text"
                    required
                    value={partnershipOffer.capital}
                    onChange={(e) => setPartnershipOffer({ ...partnershipOffer, capital: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-medium block mb-1">Proposed Equity Split</label>
                  <input
                    type="text"
                    required
                    value={partnershipOffer.equity}
                    onChange={(e) => setPartnershipOffer({ ...partnershipOffer, equity: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-medium block mb-1">Your Operational Role</label>
                  <input
                    type="text"
                    required
                    value={partnershipOffer.role}
                    onChange={(e) => setPartnershipOffer({ ...partnershipOffer, role: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setPartnershipDrawerOpen(false)}
                    className="px-3 py-2 rounded-xl text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold"
                  >
                    Submit Proposal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Licensing Offer Modal Drawer */}
        {licensingDrawerOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-amber-400">
                  <KeyRound className="w-5 h-5" />
                  <h3 className="font-bold text-sm text-white">Negotiate Technology Licensing</h3>
                </div>
                <button
                  onClick={() => setLicensingDrawerOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSendLicensing} className="mt-4 space-y-3.5 text-xs">
                <div>
                  <label className="text-slate-400 font-medium block mb-1">Target Patent / Technology</label>
                  <p className="font-bold text-white bg-slate-950 p-2 rounded-xl border border-slate-800 truncate">
                    {idea.title}
                  </p>
                </div>

                <div>
                  <label className="text-slate-400 font-medium block mb-1">Upfront License Fee</label>
                  <input
                    type="text"
                    required
                    value={licensingOffer.upfront}
                    onChange={(e) => setLicensingOffer({ ...licensingOffer, upfront: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-medium block mb-1">Ongoing Royalty Rate (%)</label>
                  <input
                    type="text"
                    required
                    value={licensingOffer.royalty}
                    onChange={(e) => setLicensingOffer({ ...licensingOffer, royalty: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-medium block mb-1">Licensed Territory</label>
                  <input
                    type="text"
                    required
                    value={licensingOffer.territory}
                    onChange={(e) => setLicensingOffer({ ...licensingOffer, territory: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setLicensingDrawerOpen(false)}
                    className="px-3 py-2 rounded-xl text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                  >
                    Submit Licensing Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Report Modal */}
        <ReportModal
          isOpen={reportModalOpen}
          onClose={() => setReportModalOpen(false)}
          targetId={idea.id}
          targetTitle={idea.title}
          targetType="idea"
        />
      </div>
    </div>
  );
};
