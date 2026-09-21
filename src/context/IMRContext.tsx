import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  UserProfile,
  UserRole,
  BusinessIdea,
  TradeProduct,
  CountryTradeProfile,
  ConversationThread,
  InAppMessage,
  FeedPost,
  AdvancedTechItem,
  ReportItem,
  VerificationRequest,
} from '../types';
import {
  initialUsers,
  initialIdeas,
  initialProducts,
  countryProfiles,
  initialFeedPosts,
  initialThreads,
  initialMessages,
  advancedTechDatabase,
  initialReports,
  initialVerifications,
} from '../data/mockData';

export type NavigationTab =
  | 'home'
  | 'ideas'
  | 'trade'
  | 'countries'
  | 'matching'
  | 'feed'
  | 'ai_generator'
  | 'advanced_tech'
  | 'messages'
  | 'profile'
  | 'admin'
  | 'monetization';

interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface IMRContextType {
  currentUser: UserProfile;
  switchRole: (role: UserRole) => void;
  setCurrentUser: (user: UserProfile) => void;
  users: UserProfile[];
  ideas: BusinessIdea[];
  addIdea: (idea: Omit<BusinessIdea, 'id' | 'createdAt' | 'likesCount' | 'savesCount' | 'viewsCount' | 'status' | 'founderId' | 'founderName' | 'founderCompany' | 'founderRole' | 'founderCountry' | 'founderVerified' | 'founderRating'>) => BusinessIdea;
  likeIdea: (id: string) => void;
  saveIdea: (id: string) => void;
  askIdeaQuestion: (ideaId: string, question: string) => void;
  savedIdeaIds: string[];
  likedIdeaIds: string[];
  products: TradeProduct[];
  addProduct: (product: Omit<TradeProduct, 'id' | 'createdAt' | 'inquiriesCount' | 'status' | 'supplierId' | 'supplierName' | 'supplierCompany' | 'supplierCountry' | 'verifiedSupplier'>) => TradeProduct;
  sendRFQ: (productId: string, rfqData: { quantity: string; targetPort: string; notes: string }) => void;
  countries: CountryTradeProfile[];
  feedPosts: FeedPost[];
  addFeedPost: (data: { content: string; postType: FeedPost['postType']; tags: string[]; relatedEntityId?: string; relatedEntityTitle?: string }) => void;
  likeFeedPost: (id: string) => void;
  threads: ConversationThread[];
  messages: Record<string, InAppMessage[]>;
  activeThreadId: string | null;
  setActiveThreadId: (id: string | null) => void;
  sendMessage: (threadId: string, content: string, type?: InAppMessage['type'], payload?: any) => void;
  startConversationWith: (
    participantId: string,
    subject: string,
    threadType: ConversationThread['threadType'],
    initialMsg?: string,
    relatedEntityId?: string,
    relatedEntityTitle?: string
  ) => string;
  advancedTechItems: AdvancedTechItem[];
  reports: ReportItem[];
  submitReport: (report: { targetId: string; targetTitle: string; targetType: ReportItem['targetType']; reason: ReportItem['reason']; details: string }) => void;
  verifications: VerificationRequest[];
  submitVerification: (data: { documentType: VerificationRequest['documentType']; documentNumber: string }) => void;
  adminApproveIdea: (id: string) => void;
  adminRejectIdea: (id: string) => void;
  adminApproveProduct: (id: string) => void;
  adminRejectProduct: (id: string) => void;
  adminApproveVerification: (id: string) => void;
  adminResolveReport: (id: string) => void;
  blockedUserIds: string[];
  blockUser: (userId: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isMobileFrame: boolean;
  setIsMobileFrame: React.Dispatch<React.SetStateAction<boolean>>;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  toasts: Toast[];
  addToast: (title: string, message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
  selectedCountryForExplorer: string | null;
  setSelectedCountryForExplorer: (code: string | null) => void;
  matchingInitialPreset: 'export_organic' | 'budget_10lakh' | null;
  setMatchingInitialPreset: (preset: 'export_organic' | 'budget_10lakh' | null) => void;
}

const IMRContext = createContext<IMRContextType | undefined>(undefined);

export const IMRProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or defaults
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('imr_current_user');
    return saved ? JSON.parse(saved) : initialUsers[1]; // default to Sarah Jenkins (Entrepreneur)
  });

  const [users] = useState<UserProfile[]>(initialUsers);

  const [ideas, setIdeas] = useState<BusinessIdea[]>(() => {
    const saved = localStorage.getItem('imr_ideas');
    return saved ? JSON.parse(saved) : initialIdeas;
  });

  const [savedIdeaIds, setSavedIdeaIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('imr_saved_ideas');
    return saved ? JSON.parse(saved) : ['idea-1', 'idea-3'];
  });

  const [likedIdeaIds, setLikedIdeaIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('imr_liked_ideas');
    return saved ? JSON.parse(saved) : ['idea-1'];
  });

  const [products, setProducts] = useState<TradeProduct[]>(() => {
    const saved = localStorage.getItem('imr_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [countries] = useState<CountryTradeProfile[]>(countryProfiles);

  const [feedPosts, setFeedPosts] = useState<FeedPost[]>(() => {
    const saved = localStorage.getItem('imr_feed_posts');
    return saved ? JSON.parse(saved) : initialFeedPosts;
  });

  const [threads, setThreads] = useState<ConversationThread[]>(() => {
    const saved = localStorage.getItem('imr_threads');
    return saved ? JSON.parse(saved) : initialThreads;
  });

  const [messages, setMessages] = useState<Record<string, InAppMessage[]>>(() => {
    const saved = localStorage.getItem('imr_messages');
    return saved ? JSON.parse(saved) : initialMessages;
  });

  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);

  const [advancedTechItems] = useState<AdvancedTechItem[]>(advancedTechDatabase);

  const [reports, setReports] = useState<ReportItem[]>(() => {
    const saved = localStorage.getItem('imr_reports');
    return saved ? JSON.parse(saved) : initialReports;
  });

  const [verifications, setVerifications] = useState<VerificationRequest[]>(() => {
    const saved = localStorage.getItem('imr_verifications');
    return saved ? JSON.parse(saved) : initialVerifications;
  });

  const [blockedUserIds, setBlockedUserIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('imr_blocked_users');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileFrame, setIsMobileFrame] = useState(false);
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [selectedCountryForExplorer, setSelectedCountryForExplorer] = useState<string | null>(null);
  const [matchingInitialPreset, setMatchingInitialPreset] = useState<'export_organic' | 'budget_10lakh' | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('imr_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('imr_ideas', JSON.stringify(ideas));
  }, [ideas]);

  useEffect(() => {
    localStorage.setItem('imr_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('imr_feed_posts', JSON.stringify(feedPosts));
  }, [feedPosts]);

  useEffect(() => {
    localStorage.setItem('imr_threads', JSON.stringify(threads));
  }, [threads]);

  useEffect(() => {
    localStorage.setItem('imr_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('imr_saved_ideas', JSON.stringify(savedIdeaIds));
  }, [savedIdeaIds]);

  useEffect(() => {
    localStorage.setItem('imr_liked_ideas', JSON.stringify(likedIdeaIds));
  }, [likedIdeaIds]);

  useEffect(() => {
    localStorage.setItem('imr_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('imr_verifications', JSON.stringify(verifications));
  }, [verifications]);

  useEffect(() => {
    localStorage.setItem('imr_blocked_users', JSON.stringify(blockedUserIds));
  }, [blockedUserIds]);

  const addToast = (title: string, message: string, type: Toast['type'] = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const switchRole = (role: UserRole) => {
    const found = users.find((u) => u.role === role);
    if (found) {
      setCurrentUser(found);
      addToast('Role Switched', `You are now interacting as ${found.name} (${found.role.replace(/_/g, ' ').toUpperCase()})`, 'info');
    }
  };

  const addIdea = (newIdeaData: any): BusinessIdea => {
    const newIdea: BusinessIdea = {
      ...newIdeaData,
      id: `idea-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      likesCount: 0,
      savesCount: 0,
      viewsCount: 1,
      status: 'approved',
      founderId: currentUser.id,
      founderName: currentUser.name,
      founderCompany: currentUser.company,
      founderRole: currentUser.role.replace(/_/g, ' '),
      founderCountry: currentUser.country,
      founderVerified: currentUser.verifiedTier !== 'unverified',
      founderRating: 5.0,
      questions: [],
    };
    setIdeas((prev) => [newIdea, ...prev]);
    addToast('Idea Published!', 'Your business idea is now live in the marketplace.', 'success');
    return newIdea;
  };

  const likeIdea = (id: string) => {
    const isLiked = likedIdeaIds.includes(id);
    setLikedIdeaIds((prev) => (isLiked ? prev.filter((i) => i !== id) : [...prev, id]));
    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id === id) {
          return {
            ...idea,
            likesCount: isLiked ? Math.max(0, idea.likesCount - 1) : idea.likesCount + 1,
          };
        }
        return idea;
      })
    );
  };

  const saveIdea = (id: string) => {
    const isSaved = savedIdeaIds.includes(id);
    setSavedIdeaIds((prev) => (isSaved ? prev.filter((i) => i !== id) : [...prev, id]));
    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id === id) {
          return {
            ...idea,
            savesCount: isSaved ? Math.max(0, idea.savesCount - 1) : idea.savesCount + 1,
          };
        }
        return idea;
      })
    );
    addToast(isSaved ? 'Removed from Saved' : 'Saved to Bookmarks', isSaved ? 'Idea removed' : 'Saved for review in your profile', 'info');
  };

  const askIdeaQuestion = (ideaId: string, question: string) => {
    const newQ = {
      id: `q-${Date.now()}`,
      askerId: currentUser.id,
      askerName: currentUser.name,
      question,
      timestamp: new Date().toISOString().split('T')[0],
    };
    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id === ideaId) {
          return {
            ...idea,
            questions: [...(idea.questions || []), newQ],
          };
        }
        return idea;
      })
    );
    addToast('Question Submitted', 'The creator has been notified and can reply publicly.', 'info');
  };

  const addProduct = (prodData: any): TradeProduct => {
    const newProd: TradeProduct = {
      ...prodData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      inquiriesCount: 0,
      status: 'approved',
      supplierId: currentUser.id,
      supplierName: currentUser.name,
      supplierCompany: currentUser.company,
      supplierCountry: currentUser.country,
      verifiedSupplier: currentUser.verifiedTier !== 'unverified',
    };
    setProducts((prev) => [newProd, ...prev]);
    addToast('Product Listed!', 'Your trade listing is live for global buyers/suppliers.', 'success');
    return newProd;
  };

  const sendRFQ = (productId: string, rfqData: { quantity: string; targetPort: string; notes: string }) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    // Increment inquiries
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inquiriesCount: p.inquiriesCount + 1 } : p))
    );

    // Start or get conversation thread
    const threadId = startConversationWith(
      product.supplierId,
      `RFQ: ${product.name}`,
      'trade_rfq',
      `Request for Quotation for ${rfqData.quantity} of ${product.name} delivered to ${rfqData.targetPort}.`,
      product.id,
      product.name
    );

    // Send RFQ message
    sendMessage(threadId, `Formal RFQ submitted for ${rfqData.quantity}`, 'rfq', {
      rfq: {
        productName: product.name,
        quantity: rfqData.quantity,
        targetPort: rfqData.targetPort,
        notes: rfqData.notes,
      },
    });

    addToast('RFQ Sent Successfully', `Quotation request delivered to ${product.supplierName}. Check your Messages.`, 'success');
    setActiveTab('messages');
    setActiveThreadId(threadId);
  };

  const addFeedPost = (data: { content: string; postType: FeedPost['postType']; tags: string[]; relatedEntityId?: string; relatedEntityTitle?: string }) => {
    const newPost: FeedPost = {
      id: `post-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorCompany: currentUser.company,
      authorRole: currentUser.role.replace(/_/g, ' '),
      authorCountry: currentUser.country,
      authorVerified: currentUser.verifiedTier !== 'unverified',
      authorAvatar: currentUser.avatar,
      content: data.content,
      postType: data.postType,
      tags: data.tags,
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      createdAt: new Date().toISOString(),
      userLiked: false,
      relatedEntityId: data.relatedEntityId,
      relatedEntityTitle: data.relatedEntityTitle,
    };
    setFeedPosts((prev) => [newPost, ...prev]);
    addToast('Post Published', 'Your opportunity request has been broadcasted to the network.', 'success');
  };

  const likeFeedPost = (id: string) => {
    setFeedPosts((prev) =>
      prev.map((post) => {
        if (post.id === id) {
          const wasLiked = post.userLiked;
          return {
            ...post,
            userLiked: !wasLiked,
            likesCount: wasLiked ? post.likesCount - 1 : post.likesCount + 1,
          };
        }
        return post;
      })
    );
  };

  const startConversationWith = (
    participantId: string,
    subject: string,
    threadType: ConversationThread['threadType'],
    initialMsg?: string,
    relatedEntityId?: string,
    relatedEntityTitle?: string
  ): string => {
    // Check if existing thread with this participant
    const existing = threads.find((t) => t.participant.id === participantId && t.subject === subject);
    if (existing) {
      return existing.id;
    }

    const targetUser = users.find((u) => u.id === participantId) || {
      id: participantId,
      name: 'Business Contact',
      company: 'Enterprise Partner',
      role: 'Partner',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      country: 'Global',
      verified: true,
    };

    const threadId = `thread-${Date.now()}`;
    const newThread: ConversationThread = {
      id: threadId,
      subject,
      threadType,
      participant: {
        id: targetUser.id,
        name: targetUser.name,
        company: targetUser.company,
        role: targetUser.role,
        avatar: targetUser.avatar,
        country: targetUser.country,
        verified: (targetUser as any).verifiedTier !== 'unverified',
      },
      lastMessage: initialMsg || 'Conversation started',
      lastMessageTimestamp: 'Just now',
      unreadCount: 0,
      relatedEntityId,
      relatedEntityTitle,
    };

    setThreads((prev) => [newThread, ...prev]);

    if (initialMsg) {
      const firstMessage: InAppMessage = {
        id: `msg-${Date.now()}`,
        threadId,
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderRole: currentUser.role.replace(/_/g, ' '),
        recipientId: targetUser.id,
        content: initialMsg,
        timestamp: 'Just now',
        type: 'text',
      };
      setMessages((prev) => ({
        ...prev,
        [threadId]: [firstMessage],
      }));
    } else {
      setMessages((prev) => ({
        ...prev,
        [threadId]: [],
      }));
    }

    return threadId;
  };

  const sendMessage = (threadId: string, content: string, type: InAppMessage['type'] = 'text', payload?: any) => {
    const thread = threads.find((t) => t.id === threadId);
    if (!thread) return;

    const newMsg: InAppMessage = {
      id: `msg-${Date.now()}`,
      threadId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role.replace(/_/g, ' '),
      recipientId: thread.participant.id,
      content,
      timestamp: 'Just now',
      type,
      ...payload,
    };

    setMessages((prev) => ({
      ...prev,
      [threadId]: [...(prev[threadId] || []), newMsg],
    }));

    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? {
              ...t,
              lastMessage: type === 'rfq' ? '📋 New RFQ received' : type === 'proposal' ? '💼 Formal Business Proposal sent' : content,
              lastMessageTimestamp: 'Just now',
            }
          : t
      )
    );

    // Simulate instant realistic partner reply after 2 seconds if user sends something
    if (currentUser.role !== 'admin' && type === 'text') {
      setTimeout(() => {
        const replyMsg: InAppMessage = {
          id: `msg-reply-${Date.now()}`,
          threadId,
          senderId: thread.participant.id,
          senderName: thread.participant.name,
          senderRole: thread.participant.role,
          recipientId: currentUser.id,
          content: `Thank you for your message regarding "${thread.subject}". Our operations team has reviewed the details. Let us review the terms and send over our formal agreement.`,
          timestamp: 'Just now',
          type: 'text',
        };
        setMessages((prev) => ({
          ...prev,
          [threadId]: [...(prev[threadId] || []), replyMsg],
        }));
        setThreads((prev) =>
          prev.map((t) =>
            t.id === threadId
              ? {
                  ...t,
                  lastMessage: replyMsg.content,
                  lastMessageTimestamp: 'Just now',
                  unreadCount: t.unreadCount + 1,
                }
              : t
          )
        );
      }, 2000);
    }
  };

  const submitReport = (reportData: { targetId: string; targetTitle: string; targetType: ReportItem['targetType']; reason: ReportItem['reason']; details: string }) => {
    const newReport: ReportItem = {
      id: `rep-${Date.now()}`,
      reporterId: currentUser.id,
      reporterName: currentUser.name,
      ...reportData,
      status: 'pending',
      timestamp: new Date().toISOString(),
    };
    setReports((prev) => [newReport, ...prev]);
    addToast('Report Filed', 'Our compliance desk will investigate this matter within 12 hours.', 'info');
  };

  const submitVerification = (data: { documentType: VerificationRequest['documentType']; documentNumber: string }) => {
    const newVer: VerificationRequest = {
      id: `ver-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      companyName: currentUser.company,
      documentType: data.documentType,
      documentNumber: data.documentNumber,
      status: 'pending',
      submittedAt: new Date().toISOString().split('T')[0],
    };
    setVerifications((prev) => [newVer, ...prev]);
    addToast('Verification Submitted', 'Your documents have been queued for administrative audit.', 'info');
  };

  const adminApproveIdea = (id: string) => {
    setIdeas((prev) => prev.map((i) => (i.id === id ? { ...i, status: 'approved' } : i)));
    addToast('Idea Approved', 'The idea is now verified and fully visible.', 'success');
  };

  const adminRejectIdea = (id: string) => {
    setIdeas((prev) => prev.map((i) => (i.id === id ? { ...i, status: 'flagged' } : i)));
    addToast('Idea Flagged', 'The idea was hidden from public listings.', 'warning');
  };

  const adminApproveProduct = (id: string) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, status: 'approved' } : p)));
    addToast('Product Approved', 'Trade listing verified for global buyers.', 'success');
  };

  const adminRejectProduct = (id: string) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, status: 'flagged' } : p)));
    addToast('Product Flagged', 'Listing marked as requiring clarification.', 'warning');
  };

  const adminApproveVerification = (id: string) => {
    setVerifications((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: 'approved' } : v))
    );
    const ver = verifications.find((v) => v.id === id);
    if (ver && ver.userId === currentUser.id) {
      setCurrentUser((prev) => ({
        ...prev,
        verifiedTier: 'tier3_global_trade',
        verificationBadges: [...prev.verificationBadges, 'Verified Enterprise'],
      }));
    }
    addToast('Merchant Verified', 'Verification badge issued to merchant.', 'success');
  };

  const adminResolveReport = (id: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'resolved' } : r))
    );
    addToast('Report Resolved', 'Action logged in platform compliance audit.', 'success');
  };

  const blockUser = (userId: string) => {
    setBlockedUserIds((prev) => [...new Set([...prev, userId])]);
    addToast('User Blocked', 'You will no longer receive messages or proposals from this user.', 'warning');
  };

  return (
    <IMRContext.Provider
      value={{
        currentUser,
        switchRole,
        setCurrentUser,
        users,
        ideas,
        addIdea,
        likeIdea,
        saveIdea,
        askIdeaQuestion,
        savedIdeaIds,
        likedIdeaIds,
        products,
        addProduct,
        sendRFQ,
        countries,
        feedPosts,
        addFeedPost,
        likeFeedPost,
        threads,
        messages,
        activeThreadId,
        setActiveThreadId,
        sendMessage,
        startConversationWith,
        advancedTechItems,
        reports,
        submitReport,
        verifications,
        submitVerification,
        adminApproveIdea,
        adminRejectIdea,
        adminApproveProduct,
        adminRejectProduct,
        adminApproveVerification,
        adminResolveReport,
        blockedUserIds,
        blockUser,
        searchQuery,
        setSearchQuery,
        isMobileFrame,
        setIsMobileFrame,
        activeTab,
        setActiveTab,
        toasts,
        addToast,
        removeToast,
        selectedCountryForExplorer,
        setSelectedCountryForExplorer,
        matchingInitialPreset,
        setMatchingInitialPreset,
      }}
    >
      {children}
    </IMRContext.Provider>
  );
};

export const useIMR = () => {
  const context = useContext(IMRContext);
  if (!context) {
    throw new Error('useIMR must be used within an IMRProvider');
  }
  return context;
};
