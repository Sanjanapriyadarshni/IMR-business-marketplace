import React, { useState } from 'react';
import { useIMR } from '../../context/IMRContext';
import {
  Share2,
  Heart,
  MessageSquare,
  PlusCircle,
  ShieldCheck,
  Send,
  Sparkles,
  ArrowRight,
  Filter,
  Tag,
  Bookmark,
} from 'lucide-react';
import type { FeedPost } from '../../types';

export const BusinessOpportunityFeed: React.FC = () => {
  const { feedPosts, addFeedPost, likeFeedPost, currentUser, startConversationWith, setActiveTab, setActiveThreadId, addToast } = useIMR();

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [postType, setPostType] = useState<FeedPost['postType']>('export_opportunity');
  const [tagsInput, setTagsInput] = useState('GlobalTrade, Export, BusinessPartner');
  const [activeCommentsPostId, setActiveCommentsPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  const filteredPosts = feedPosts.filter((post) => {
    if (activeFilter === 'all') return true;
    return post.postType === activeFilter;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    addFeedPost({
      content: postContent,
      postType,
      tags: tagsInput.split(',').map((t) => t.trim().replace(/^#/, '')).filter(Boolean),
    });

    setPostContent('');
    setCreatePostOpen(false);
  };

  const handleConnectWithAuthor = (post: FeedPost) => {
    const threadId = startConversationWith(
      post.authorId,
      `Regarding Your Post on IMR: ${post.tags[0] || 'Opportunity'}`,
      'general',
      `Hello ${post.authorName}, I saw your post regarding "${post.content.slice(0, 60)}..." and would like to connect.`
    );
    setActiveThreadId(threadId);
    setActiveTab('messages');
  };

  const getPostTypeBadge = (type: FeedPost['postType']) => {
    switch (type) {
      case 'export_opportunity':
        return { label: 'Export Offer', className: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
      case 'import_requirement':
        return { label: 'Import RFP / Buy Need', className: 'bg-blue-500/20 text-blue-300 border-blue-500/30' };
      case 'investment_ask':
        return { label: 'Investment Round', className: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
      case 'partnership_call':
        return { label: 'Partnership Call', className: 'bg-purple-500/20 text-purple-300 border-purple-500/30' };
      case 'supplier_request':
        return { label: 'Supplier Needed', className: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' };
      case 'buyer_request':
        return { label: 'Buyer Needed', className: 'bg-rose-500/20 text-rose-300 border-rose-500/30' };
      case 'new_idea':
        return { label: 'New Business Idea', className: 'bg-teal-500/20 text-teal-300 border-teal-500/30' };
      default:
        return { label: 'Opportunity', className: 'bg-slate-800 text-slate-300' };
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 sm:px-6 py-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Business Opportunity Feed
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Real-time feed of live trade requirements, co-founder calls, and investment asks.
          </p>
        </div>

        <button
          onClick={() => setCreatePostOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 flex items-center gap-1.5 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post Requirement</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
        {[
          { id: 'all', label: 'All Updates' },
          { id: 'export_opportunity', label: 'Export Offers' },
          { id: 'import_requirement', label: 'Import RFPs' },
          { id: 'investment_ask', label: 'Investments' },
          { id: 'partnership_call', label: 'Partnerships' },
          { id: 'new_idea', label: 'New Ideas' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition-all ${
              activeFilter === f.id
                ? 'bg-teal-500 text-slate-950 font-bold shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Feed Stream */}
      <div className="space-y-4">
        {filteredPosts.map((post) => {
          const badge = getPostTypeBadge(post.postType);
          return (
            <div
              key={post.id}
              className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4"
            >
              {/* Post Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorAvatar}
                    alt={post.authorName}
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-700 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-white text-sm">{post.authorName}</h3>
                      {post.authorVerified && (
                        <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-400">
                      {post.authorCompany} • {post.authorCountry}
                    </p>
                    <span className="text-[11px] text-teal-300 font-medium capitalize">
                      {post.authorRole}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`text-[10px] px-2.5 py-0.5 rounded-full border font-bold uppercase ${badge.className}`}
                  >
                    {badge.label}
                  </span>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                {post.content}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-0.5 rounded-lg bg-slate-950 text-slate-400 border border-slate-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Footer Engagement Bar */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs">
                  <button
                    onClick={() => likeFeedPost(post.id)}
                    className={`flex items-center gap-1.5 transition-colors ${
                      post.userLiked ? 'text-rose-400 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.userLiked ? 'fill-current' : ''}`} />
                    <span>{post.likesCount}</span>
                  </button>

                  <button
                    onClick={() =>
                      setActiveCommentsPostId(
                        activeCommentsPostId === post.id ? null : post.id
                      )
                    }
                    className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.commentsCount} comments</span>
                  </button>

                  <button
                    onClick={() => addToast('Link Copied', 'Opportunity link copied to clipboard.', 'info')}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>

                <button
                  onClick={() => handleConnectWithAuthor(post)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 font-semibold text-xs transition-colors flex items-center gap-1"
                >
                  <span>Connect Directly</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Inline Comments Section */}
              {activeCommentsPostId === post.id && (
                <div className="pt-3 border-t border-slate-800 space-y-3 text-xs animate-in fade-in">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="font-semibold text-teal-300">Hans Richter (Importer, Germany):</span>
                    <p className="text-slate-300">
                      We are interested if full SGS inspection reports can be provided at Mundra. Please message us.
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!commentText.trim()) return;
                      post.commentsCount += 1;
                      setCommentText('');
                      addToast('Comment Posted', 'Your reply was added to the feed thread.', 'success');
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      placeholder="Write a public comment or trade inquiry..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-teal-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs shrink-0"
                    >
                      Reply
                    </button>
                  </form>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Create Post Modal */}
      {createPostOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl">
            <h3 className="font-bold text-white text-base mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-400" />
              <span>Broadcast Business Requirement</span>
            </h3>

            <form onSubmit={handleCreatePost} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Requirement Category</label>
                <select
                  value={postType}
                  onChange={(e) => setPostType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold text-teal-300"
                >
                  <option value="export_opportunity">Ready Export Offering</option>
                  <option value="import_requirement">Import Demand / Buyer RFP</option>
                  <option value="investment_ask">Investment Round / Funding Ask</option>
                  <option value="partnership_call">Co-Founder / Operational Partnership Call</option>
                  <option value="supplier_request">Supplier / Contract Manufacturer Needed</option>
                  <option value="new_idea">New Business Concept Announcement</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Message Content *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail your trade volume, specifications, country destination, or investment terms..."
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white resize-none"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCreatePostOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold"
                >
                  Broadcast Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
