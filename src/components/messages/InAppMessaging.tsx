import React, { useState } from 'react';
import { useIMR } from '../../context/IMRContext';
import {
  MessageSquare,
  Send,
  Paperclip,
  Calendar,
  Briefcase,
  Handshake,
  ShieldCheck,
  FileText,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Flag,
  UserX,
  Clock,
  Video,
} from 'lucide-react';
import type { InAppMessage, ConversationThread } from '../../types';
import { ReportModal } from '../common/ReportModal';

export const InAppMessaging: React.FC = () => {
  const {
    threads,
    messages,
    activeThreadId,
    setActiveThreadId,
    sendMessage,
    currentUser,
    blockUser,
    addToast,
  } = useIMR();

  const [filterType, setFilterType] = useState<string>('all');
  const [inputText, setInputText] = useState('');
  const [proposalModalOpen, setProposalModalOpen] = useState(false);
  const [meetingModalOpen, setMeetingModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Proposal State
  const [proposalData, setProposalData] = useState({
    title: 'Investment Term Sheet',
    amount: '$100,000 USD',
    equityOrRoyalty: '15% Equity Share',
    terms: 'Milestone-based disbursement with standard board observer rights.',
  });

  // Meeting State
  const [meetingData, setMeetingData] = useState({
    date: '2026-09-25',
    time: '03:30 PM (GST)',
    mode: 'Video Call' as 'Video Call' | 'In-Person',
    agenda: 'Technical feasibility and trade contract discussion',
  });

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];
  const activeMessages = activeThread ? messages[activeThread.id] || [] : [];

  const filteredThreads = threads.filter((t) => {
    if (filterType === 'all') return true;
    return t.threadType === filterType;
  });

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeThread) return;
    sendMessage(activeThread.id, inputText, 'text');
    setInputText('');
  };

  const handleSimulateAttachment = () => {
    if (!activeThread) return;
    sendMessage(activeThread.id, 'Attached official document for your commercial review.', 'attachment', {
      attachment: {
        name: 'Commercial_Invoice_&_Lab_Assay_Eurofins.pdf',
        size: '2.8 MB',
        fileType: 'PDF Document',
      },
    });
    addToast('Document Attached', 'Simulated file uploaded to conversation.', 'info');
  };

  const handleSendProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeThread) return;
    sendMessage(activeThread.id, `Formal Business Proposal: ${proposalData.title}`, 'proposal', {
      proposal: {
        ...proposalData,
        status: 'pending',
      },
    });
    setProposalModalOpen(false);
    addToast('Proposal Delivered', 'Formal business terms delivered to partner.', 'success');
  };

  const handleScheduleMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeThread) return;
    sendMessage(activeThread.id, `Meeting Invitation: ${meetingData.agenda}`, 'meeting_request', {
      meeting: {
        ...meetingData,
        status: 'scheduled',
      },
    });
    setMeetingModalOpen(false);
    addToast('Meeting Scheduled', 'Calendar invite generated and sent.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[80vh] min-h-[600px]">
        {/* Left Side: Thread List */}
        <div className="w-full md:w-80 lg:w-96 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col bg-slate-950/40">
          <div className="p-4 border-b border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-white text-base flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-teal-400" />
                <span>Messages & Deals</span>
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                {threads.length} threads
              </span>
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
              {(['all', 'idea_inquiry', 'trade_rfq', 'investor_proposal'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setFilterType(filter)}
                  className={`px-2.5 py-1 rounded-lg capitalize whitespace-nowrap font-medium transition-all ${
                    filterType === filter
                      ? 'bg-teal-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {filter === 'all'
                    ? 'All'
                    : filter === 'idea_inquiry'
                    ? 'Ideas'
                    : filter === 'trade_rfq'
                    ? 'RFQs'
                    : 'Proposals'}
                </button>
              ))}
            </div>
          </div>

          {/* Threads Scrollable Area */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 no-scrollbar">
            {filteredThreads.map((thread) => {
              const isCurrent = activeThread && activeThread.id === thread.id;
              return (
                <div
                  key={thread.id}
                  onClick={() => {
                    setActiveThreadId(thread.id);
                    thread.unreadCount = 0;
                  }}
                  className={`p-4 cursor-pointer transition-all flex items-start gap-3 hover:bg-slate-900/80 ${
                    isCurrent ? 'bg-slate-900 border-l-4 border-teal-500' : ''
                  }`}
                >
                  <img
                    src={thread.participant.avatar}
                    alt={thread.participant.name}
                    className="w-11 h-11 rounded-2xl object-cover border border-slate-700 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className="font-semibold text-white text-xs truncate">
                        {thread.participant.name}
                      </h4>
                      <span className="text-[10px] text-slate-500 shrink-0">
                        {thread.lastMessageTimestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-teal-300/90 font-medium truncate">
                      {thread.subject}
                    </p>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{thread.lastMessage}</p>
                  </div>
                  {thread.unreadCount > 0 && (
                    <span className="w-2 h-2 rounded-full bg-teal-400 shrink-0 mt-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active Chat Window */}
        {activeThread ? (
          <div className="flex-1 flex flex-col bg-slate-900/60">
            {/* Chat Top Bar */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={activeThread.participant.avatar}
                  alt={activeThread.participant.name}
                  className="w-10 h-10 rounded-xl object-cover border border-slate-700 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-white text-sm truncate">
                      {activeThread.participant.name}
                    </h3>
                    <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                  </div>
                  <p className="text-xs text-slate-400 truncate">
                    {activeThread.participant.company} • {activeThread.participant.country}
                  </p>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMeetingModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 font-semibold text-xs transition-colors flex items-center gap-1.5 border border-slate-700"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Schedule Meeting</span>
                </button>

                <button
                  onClick={() => setProposalModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md flex items-center gap-1.5"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Send Proposal</span>
                </button>

                {/* More dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {dropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                      <div className="absolute right-0 mt-1 w-44 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl z-50 p-1 text-xs">
                        <button
                          onClick={() => {
                            setReportModalOpen(true);
                            setDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:text-rose-400 hover:bg-slate-800"
                        >
                          <Flag className="w-3.5 h-3.5" />
                          <span>Report Partner</span>
                        </button>
                        <button
                          onClick={() => {
                            blockUser(activeThread.participant.id);
                            setDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:text-amber-400 hover:bg-slate-800"
                        >
                          <UserX className="w-3.5 h-3.5" />
                          <span>Block User</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Messages Stream */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {activeMessages.map((msg) => {
                const isMe = msg.senderId === currentUser.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div className="text-[10px] text-slate-500 mb-1 px-1">
                      {msg.senderName} • {msg.timestamp}
                    </div>

                    {/* Text Message */}
                    {msg.type === 'text' && (
                      <div
                        className={`max-w-md sm:max-w-lg p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          isMe
                            ? 'bg-teal-600 text-white rounded-br-none shadow-md'
                            : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                        }`}
                      >
                        {msg.content}
                      </div>
                    )}

                    {/* Proposal Card */}
                    {msg.type === 'proposal' && msg.proposal && (
                      <div className="max-w-md w-full p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-teal-500/40 shadow-xl space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                          <div className="flex items-center gap-2 text-teal-400 font-bold text-xs">
                            <Handshake className="w-4 h-4" />
                            <span>Business Proposal</span>
                          </div>
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30">
                            {msg.proposal.status}
                          </span>
                        </div>
                        <h4 className="font-bold text-white text-sm">{msg.proposal.title}</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                            <span className="text-slate-400 block text-[10px]">Capital Consideration:</span>
                            <span className="font-bold text-amber-400 font-mono">{msg.proposal.amount}</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                            <span className="text-slate-400 block text-[10px]">Equity / Royalty Terms:</span>
                            <span className="font-bold text-teal-300">{msg.proposal.equityOrRoyalty}</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                          {msg.proposal.terms}
                        </p>
                        {!isMe && msg.proposal.status === 'pending' && (
                          <div className="pt-2 flex gap-2 justify-end">
                            <button
                              onClick={() => {
                                msg.proposal!.status = 'declined';
                                addToast('Proposal Declined', 'Status updated.', 'info');
                              }}
                              className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                            >
                              Decline
                            </button>
                            <button
                              onClick={() => {
                                msg.proposal!.status = 'accepted';
                                addToast('Proposal Accepted!', 'Next step: execute formal legal escrow.', 'success');
                              }}
                              className="px-4 py-1.5 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs hover:bg-teal-400"
                            >
                              Accept Terms
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* RFQ Card */}
                    {msg.type === 'rfq' && msg.rfq && (
                      <div className="max-w-md w-full p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 shadow-xl space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                            <FileText className="w-4 h-4" />
                            <span>Request For Quotation (RFQ)</span>
                          </div>
                          <span className="text-[10px] text-emerald-300 font-bold font-mono">Formal Inquiry</span>
                        </div>
                        <h4 className="font-bold text-white text-sm">{msg.rfq.productName}</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                            <span className="text-slate-400 block text-[10px]">Order Volume:</span>
                            <span className="font-bold text-white">{msg.rfq.quantity}</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                            <span className="text-slate-400 block text-[10px]">Target Port:</span>
                            <span className="font-bold text-teal-300">{msg.rfq.targetPort}</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-300 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                          {msg.rfq.notes}
                        </p>
                      </div>
                    )}

                    {/* Meeting Request Card */}
                    {msg.type === 'meeting_request' && msg.meeting && (
                      <div className="max-w-md w-full p-4 rounded-2xl bg-slate-950 border border-blue-500/40 shadow-xl space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                          <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
                            <Video className="w-4 h-4" />
                            <span>Scheduled Video Conference</span>
                          </div>
                          <span className="text-[10px] text-blue-300 font-mono">Confirmed</span>
                        </div>
                        <div className="text-xs text-white space-y-1">
                          <p><strong className="text-slate-400">Date & Time:</strong> {msg.meeting.date} at {msg.meeting.time}</p>
                          <p><strong className="text-slate-400">Mode:</strong> {msg.meeting.mode} (Encrypted IMR Room)</p>
                          <p className="text-slate-300 pt-1 border-t border-slate-800 text-[11px]"><strong className="text-slate-400">Agenda:</strong> {msg.meeting.agenda}</p>
                        </div>
                      </div>
                    )}

                    {/* Attachment Card */}
                    {msg.type === 'attachment' && msg.attachment && (
                      <div className="max-w-md w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="p-2 rounded-xl bg-slate-800 text-teal-400">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <h5 className="font-bold text-white text-xs truncate">{msg.attachment.name}</h5>
                            <span className="text-[10px] text-slate-400">{msg.attachment.size} • {msg.attachment.fileType}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => addToast('Download Started', `Downloading ${msg.attachment?.name}`, 'info')}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-semibold shrink-0"
                        >
                          View
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendText} className="p-3 sm:p-4 border-t border-slate-800 bg-slate-900 flex items-center gap-2">
              <button
                type="button"
                onClick={handleSimulateAttachment}
                title="Attach Document / Spec Sheet"
                className="p-2.5 rounded-xl text-slate-400 hover:text-teal-300 hover:bg-slate-800 transition-colors"
              >
                <Paperclip className="w-5 h-5" />
              </button>

              <input
                type="text"
                placeholder="Write a message, request quotation update, or discuss deal..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-teal-500 transition-colors"
              />

              <button
                type="submit"
                className="p-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold transition-all shadow-md shadow-teal-500/20 shrink-0"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-500">
            <p className="text-sm">Select a conversation thread to review details.</p>
          </div>
        )}
      </div>

      {/* Send Proposal Modal */}
      {proposalModalOpen && activeThread && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-5 shadow-2xl">
            <h3 className="font-bold text-white text-base mb-3 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-teal-400" />
              <span>Draft Formal Commercial Proposal</span>
            </h3>

            <form onSubmit={handleSendProposal} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Proposal Title</label>
                <input
                  type="text"
                  required
                  value={proposalData.title}
                  onChange={(e) => setProposalData({ ...proposalData, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Investment / Value</label>
                  <input
                    type="text"
                    required
                    value={proposalData.amount}
                    onChange={(e) => setProposalData({ ...proposalData, amount: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Equity or Royalty %</label>
                  <input
                    type="text"
                    required
                    value={proposalData.equityOrRoyalty}
                    onChange={(e) => setProposalData({ ...proposalData, equityOrRoyalty: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Terms & Conditions</label>
                <textarea
                  rows={3}
                  required
                  value={proposalData.terms}
                  onChange={(e) => setProposalData({ ...proposalData, terms: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setProposalModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold"
                >
                  Send Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Meeting Modal */}
      {meetingModalOpen && activeThread && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-5 shadow-2xl">
            <h3 className="font-bold text-white text-base mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              <span>Schedule Commercial Video Call</span>
            </h3>

            <form onSubmit={handleScheduleMeeting} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={meetingData.date}
                    onChange={(e) => setMeetingData({ ...meetingData, date: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Time & Timezone</label>
                  <input
                    type="text"
                    required
                    value={meetingData.time}
                    onChange={(e) => setMeetingData({ ...meetingData, time: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Discussion Agenda</label>
                <textarea
                  rows={3}
                  required
                  value={meetingData.agenda}
                  onChange={(e) => setMeetingData({ ...meetingData, agenda: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setMeetingModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold"
                >
                  Confirm Meeting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Report Partner Modal */}
      {activeThread && (
        <ReportModal
          isOpen={reportModalOpen}
          onClose={() => setReportModalOpen(false)}
          targetId={activeThread.participant.id}
          targetTitle={activeThread.participant.name}
          targetType="user"
        />
      )}
    </div>
  );
};
