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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#171717]/65 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#FFFDF8] border border-[#D8D2C7] rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-[#171717]">
        {/* Header */}
        <div className="p-6 border-b border-[#D8D2C7] bg-[#FFFDF8] flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F3EFE7] text-[#171717] border border-[#D8D2C7] font-mono font-semibold">
                {idea.category}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#A8C7B5]/30 text-[#171717] font-mono font-medium capitalize">
                Stage: {idea.stage.replace(/_/g, ' ')}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FF5A36]/15 text-[#FF5A36] border border-[#FF5A36]/30 font-mono font-medium capitalize">
                {idea.dealType.replace(/_/g, ' ')}
              </span>
              {idea.scientificStatus && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#171717] text-[#FFFDF8] font-mono font-medium">
                  {idea.scientificStatus}
                </span>
              )}
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#171717] tracking-tight leading-snug">
              {idea.title}
            </h2>
            <p className="text-xs text-[#6B6B63] mt-1">{idea.tagline}</p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => saveIdea(idea.id)}
              className={`p-2 rounded-xl border transition-colors ${
                isSaved
                  ? 'bg-[#171717] text-[#FFFDF8] border-[#171717]'
                  : 'bg-[#F3EFE7] text-[#6B6B63] border-[#D8D2C7] hover:text-[#171717]'
              }`}
              title={isSaved ? 'Remove from Saved' : 'Save Idea'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => likeIdea(idea.id)}
              className={`p-2 rounded-xl border transition-colors ${
                isLiked
                  ? 'bg-[#FF5A36]/15 text-[#FF5A36] border-[#FF5A36]'
                  : 'bg-[#F3EFE7] text-[#6B6B63] border-[#D8D2C7] hover:text-[#171717]'
              }`}
              title="Like Idea"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#F3EFE7] text-[#6B6B63] hover:text-[#171717] hover:bg-[#EBE5DA] border border-[#D8D2C7] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#171717]">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#F3EFE7] border border-[#D8D2C7]">
              <span className="text-[10px] font-mono uppercase text-[#6B6B63] block font-medium">Required Capital</span>
              <span className="text-base font-bold font-mono text-[#171717] mt-0.5 block">{idea.investmentFormatted}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F3EFE7] border border-[#D8D2C7]">
              <span className="text-[10px] font-mono uppercase text-[#6B6B63] block font-medium">Scalability Scope</span>
              <span className="text-sm font-bold text-[#171717] mt-0.5 block">{idea.scalability} Reach</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F3EFE7] border border-[#D8D2C7]">
              <span className="text-[10px] font-mono uppercase text-[#6B6B63] block font-medium">Target Market</span>
              <span className="text-sm font-semibold text-[#171717] mt-0.5 block">{idea.targetCountry}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F3EFE7] border border-[#D8D2C7]">
              <span className="text-[10px] font-mono uppercase text-[#6B6B63] block font-medium">Monetization Intent</span>
              <span className="text-xs font-semibold text-[#FF5A36] mt-0.5 block capitalize font-mono">{idea.dealType.replace(/_/g, ' ')}</span>
            </div>
          </div>

          {/* Founder Profile Card */}
          <div className="p-4 rounded-2xl bg-[#F3EFE7] border border-[#D8D2C7] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#171717] text-[#FFFDF8] flex items-center justify-center font-bold text-lg font-mono">
                {idea.founderName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-[#171717] text-sm">{idea.founderName}</h4>
                  {idea.founderVerified && (
                    <span title="Verified Creator">
                      <ShieldCheck className="w-4 h-4 text-[#A8C7B5]" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#6B6B63] font-mono">{idea.founderCompany} • {idea.founderCountry}</p>
                <span className="text-[11px] text-[#171717] font-mono font-medium">Role: {idea.founderRole}</span>
              </div>
            </div>

            <button
              onClick={handleContactCreator}
              className="px-4 py-2 rounded-xl bg-[#171717] hover:bg-[#FF5A36] text-[#FFFDF8] font-mono font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Contact Creator</span>
            </button>
          </div>

          {/* Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#D8D2C7]">
              <div className="flex items-center gap-2 text-[#FF5A36] font-semibold mb-2 text-xs uppercase tracking-wider font-mono">
                <AlertTriangle className="w-4 h-4" /> The Problem Being Solved
              </div>
              <p className="text-xs sm:text-sm text-[#6B6B63] leading-relaxed">{idea.problem}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#D8D2C7]">
              <div className="flex items-center gap-2 text-[#171717] font-semibold mb-2 text-xs uppercase tracking-wider font-mono">
                <ShieldCheck className="w-4 h-4 text-[#A8C7B5]" /> The Proposed Solution
              </div>
              <p className="text-xs sm:text-sm text-[#6B6B63] leading-relaxed">{idea.solution}</p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#6B6B63]">Detailed Description</h4>
            <p className="text-[#171717] text-xs sm:text-sm leading-relaxed whitespace-pre-line bg-[#F3EFE7] p-4 rounded-2xl border border-[#D8D2C7]">
              {idea.description}
            </p>
          </div>

          {/* Commercial Canvas: Revenue Model & Customers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#F3EFE7] border border-[#D8D2C7] space-y-1.5">
              <div className="flex items-center gap-1.5 text-[#171717] text-xs font-mono font-bold uppercase tracking-wider">
                <DollarSign className="w-4 h-4 text-[#FF5A36]" /> Expected Revenue Model
              </div>
              <p className="text-xs sm:text-sm text-[#6B6B63] leading-relaxed">{idea.expectedRevenueModel}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F3EFE7] border border-[#D8D2C7] space-y-1.5">
              <div className="flex items-center gap-1.5 text-[#171717] text-xs font-mono font-bold uppercase tracking-wider">
                <Briefcase className="w-4 h-4 text-[#171717]" /> Target Customers & Segments
              </div>
              <p className="text-xs sm:text-sm text-[#6B6B63] leading-relaxed">{idea.targetCustomers}</p>
            </div>
          </div>

          {/* Required Skills & Tech Stack */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#F3EFE7] border border-[#D8D2C7] space-y-2">
              <div className="flex items-center gap-1.5 text-[#171717] text-xs font-mono font-bold uppercase tracking-wider">
                <Wrench className="w-4 h-4 text-[#FF5A36]" /> Required Skills / Co-Founder Expertise
              </div>
              <div className="flex flex-wrap gap-1.5">
                {idea.requiredSkills.map((skill, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-[#FFFDF8] text-[#171717] border border-[#D8D2C7] font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F3EFE7] border border-[#D8D2C7] space-y-2">
              <div className="flex items-center gap-1.5 text-[#171717] text-xs font-mono font-bold uppercase tracking-wider">
                <Layers className="w-4 h-4 text-[#A8C7B5]" /> Required Technology & Architecture
              </div>
              <div className="flex flex-wrap gap-1.5">
                {idea.requiredTechnology.map((tech, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-[#FFFDF8] text-[#171717] border border-[#D8D2C7] font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Deal Structure & Terms */}
          {idea.dealTermsSummary && (
            <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#FF5A36]/40 space-y-1">
              <span className="text-xs font-mono font-bold text-[#FF5A36] uppercase tracking-wider block">
                Creator's Deal Expectation & Terms
              </span>
              <p className="text-xs sm:text-sm text-[#171717] leading-relaxed">{idea.dealTermsSummary}</p>
            </div>
          )}

          {/* Public Q&A Section */}
          <div className="space-y-4 pt-4 border-t border-[#D8D2C7]">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#6B6B63] flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-[#FF5A36]" /> Community Questions & Answers ({idea.questions?.length || 0})
              </h4>
            </div>

            {idea.questions && idea.questions.length > 0 ? (
              <div className="space-y-3">
                {idea.questions.map((q) => (
                  <div key={q.id} className="p-3.5 rounded-2xl bg-[#F3EFE7] border border-[#D8D2C7] space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#6B6B63] font-mono">
                      <span className="font-semibold text-[#171717]">Q: {q.askerName}</span>
                      <span>{q.timestamp}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#171717] font-medium">{q.question}</p>
                    {q.answer ? (
                      <div className="mt-2 pl-3 border-l-2 border-[#FF5A36] text-xs text-[#171717] bg-[#FFFDF8] p-2.5 rounded-r-xl border border-[#D8D2C7]">
                        <span className="font-mono font-bold block text-[#FF5A36]">Creator Answer:</span>
                        {q.answer}
                      </div>
                    ) : (
                      <span className="text-[11px] text-[#6B6B63] italic block">Awaiting creator response</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#6B6B63] italic">No public questions asked yet. Be the first to ask!</p>
            )}

            {/* Ask Question Form */}
            <form onSubmit={handleAskQuestion} className="flex gap-2">
              <input
                type="text"
                placeholder="Ask the creator a question about this idea..."
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className="flex-1 bg-[#F3EFE7] border border-[#D8D2C7] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#171717] placeholder:text-[#6B6B63] focus:outline-none focus:border-[#FF5A36]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#171717] hover:bg-[#FF5A36] text-[#FFFDF8] font-mono font-bold text-xs transition-colors shrink-0 flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Ask</span>
              </button>
            </form>
          </div>
        </div>

        {/* Action Bar Footer */}
        <div className="p-4 border-t border-[#D8D2C7] bg-[#FFFDF8] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setReportModalOpen(true)}
              className="text-xs text-[#6B6B63] hover:text-rose-600 transition-colors flex items-center gap-1 font-mono"
            >
              <Flag className="w-3 h-3" />
              <span>Report Idea</span>
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setLicensingDrawerOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#F3EFE7] hover:bg-[#EBE5DA] border border-[#D8D2C7] text-[#171717] font-mono font-semibold text-xs transition-colors flex items-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#FF5A36]" />
              <span>Discuss Licensing / Buy</span>
            </button>

            <button
              onClick={() => setPartnershipDrawerOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-[#171717] hover:bg-[#FF5A36] text-[#FFFDF8] font-mono font-bold text-xs transition-colors flex items-center gap-1.5 shadow-md"
            >
              <Handshake className="w-3.5 h-3.5" />
              <span>Propose Partnership</span>
            </button>
          </div>
        </div>

        {/* Partnership Proposal Modal Drawer */}
        {partnershipDrawerOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-[#171717]/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-[#FFFDF8] border border-[#D8D2C7] rounded-3xl max-w-md w-full p-6 shadow-2xl text-[#171717]">
              <div className="flex items-center justify-between pb-3 border-b border-[#D8D2C7]">
                <div className="flex items-center gap-2 text-[#171717]">
                  <Handshake className="w-5 h-5 text-[#FF5A36]" />
                  <h3 className="font-bold text-sm">Propose Partnership</h3>
                </div>
                <button
                  onClick={() => setPartnershipDrawerOpen(false)}
                  className="text-[#6B6B63] hover:text-[#171717]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSendPartnership} className="mt-4 space-y-3.5 text-xs">
                <div>
                  <label className="text-[#6B6B63] font-mono uppercase block mb-1">Target Business Idea</label>
                  <p className="font-bold text-[#171717] bg-[#F3EFE7] p-2 rounded-xl border border-[#D8D2C7] truncate">
                    {idea.title}
                  </p>
                </div>

                <div>
                  <label className="text-[#6B6B63] font-mono uppercase block mb-1">Proposed Capital Contribution</label>
                  <input
                    type="text"
                    required
                    value={partnershipOffer.capital}
                    onChange={(e) => setPartnershipOffer({ ...partnershipOffer, capital: e.target.value })}
                    className="w-full bg-[#F3EFE7] border border-[#D8D2C7] rounded-xl px-3 py-2 text-[#171717]"
                  />
                </div>

                <div>
                  <label className="text-[#6B6B63] font-mono uppercase block mb-1">Proposed Equity Split</label>
                  <input
                    type="text"
                    required
                    value={partnershipOffer.equity}
                    onChange={(e) => setPartnershipOffer({ ...partnershipOffer, equity: e.target.value })}
                    className="w-full bg-[#F3EFE7] border border-[#D8D2C7] rounded-xl px-3 py-2 text-[#171717]"
                  />
                </div>

                <div>
                  <label className="text-[#6B6B63] font-mono uppercase block mb-1">Your Operational Role</label>
                  <input
                    type="text"
                    required
                    value={partnershipOffer.role}
                    onChange={(e) => setPartnershipOffer({ ...partnershipOffer, role: e.target.value })}
                    className="w-full bg-[#F3EFE7] border border-[#D8D2C7] rounded-xl px-3 py-2 text-[#171717]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setPartnershipDrawerOpen(false)}
                    className="px-3 py-2 rounded-xl text-[#6B6B63] hover:text-[#171717]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#171717] hover:bg-[#FF5A36] text-[#FFFDF8] font-bold font-mono"
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
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-[#171717]/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-[#FFFDF8] border border-[#D8D2C7] rounded-3xl max-w-md w-full p-6 shadow-2xl text-[#171717]">
              <div className="flex items-center justify-between pb-3 border-b border-[#D8D2C7]">
                <div className="flex items-center gap-2 text-[#171717]">
                  <KeyRound className="w-5 h-5 text-[#FF5A36]" />
                  <h3 className="font-bold text-sm">Negotiate Technology Licensing</h3>
                </div>
                <button
                  onClick={() => setLicensingDrawerOpen(false)}
                  className="text-[#6B6B63] hover:text-[#171717]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSendLicensing} className="mt-4 space-y-3.5 text-xs">
                <div>
                  <label className="text-[#6B6B63] font-mono uppercase block mb-1">Target Patent / Technology</label>
                  <p className="font-bold text-[#171717] bg-[#F3EFE7] p-2 rounded-xl border border-[#D8D2C7] truncate">
                    {idea.title}
                  </p>
                </div>

                <div>
                  <label className="text-[#6B6B63] font-mono uppercase block mb-1">Upfront License Fee</label>
                  <input
                    type="text"
                    required
                    value={licensingOffer.upfront}
                    onChange={(e) => setLicensingOffer({ ...licensingOffer, upfront: e.target.value })}
                    className="w-full bg-[#F3EFE7] border border-[#D8D2C7] rounded-xl px-3 py-2 text-[#171717]"
                  />
                </div>

                <div>
                  <label className="text-[#6B6B63] font-mono uppercase block mb-1">Ongoing Royalty Rate (%)</label>
                  <input
                    type="text"
                    required
                    value={licensingOffer.royalty}
                    onChange={(e) => setLicensingOffer({ ...licensingOffer, royalty: e.target.value })}
                    className="w-full bg-[#F3EFE7] border border-[#D8D2C7] rounded-xl px-3 py-2 text-[#171717]"
                  />
                </div>

                <div>
                  <label className="text-[#6B6B63] font-mono uppercase block mb-1">Licensed Territory</label>
                  <input
                    type="text"
                    required
                    value={licensingOffer.territory}
                    onChange={(e) => setLicensingOffer({ ...licensingOffer, territory: e.target.value })}
                    className="w-full bg-[#F3EFE7] border border-[#D8D2C7] rounded-xl px-3 py-2 text-[#171717]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setLicensingDrawerOpen(false)}
                    className="px-3 py-2 rounded-xl text-[#6B6B63] hover:text-[#171717]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#171717] hover:bg-[#FF5A36] text-[#FFFDF8] font-bold font-mono"
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
