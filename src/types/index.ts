export type UserRole =
  | 'business_idea_creator'
  | 'entrepreneur'
  | 'investor'
  | 'exporter'
  | 'importer'
  | 'manufacturer'
  | 'supplier'
  | 'buyer'
  | 'business_consultant'
  | 'admin';

export type VerificationTier =
  | 'unverified'
  | 'tier1_basic'
  | 'tier2_business'
  | 'tier3_global_trade';

export interface UserReview {
  id: string;
  reviewerId: string;
  reviewerName: string;
  reviewerRole: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}

export interface UserProfile {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  role: UserRole;
  country: string;
  countryCode: string;
  bio: string;
  industry: string;
  experienceYears: number;
  verifiedTier: VerificationTier;
  verificationBadges: string[];
  reputationScore: number; // 0-100
  reviewsCount: number;
  activeListingsCount: number;
  interests: string[];
  avatar: string;
  website?: string;
  reviews?: UserReview[];
}

export const BUSINESS_CATEGORIES = [
  'Artificial Intelligence',
  'Technology',
  'Agriculture',
  'Food & Beverages',
  'Healthcare',
  'Education',
  'Manufacturing',
  'Renewable Energy',
  'Electric Vehicles',
  'Logistics',
  'E-commerce',
  'FinTech',
  'Tourism',
  'Recycling',
  'Sustainable Products',
  'Smart Home',
  'Robotics',
  'Rural Business',
  'Import & Export',
  'Consumer Products',
  'Future Technology',
  'Anti-Gravity / Advanced Technology Concepts'
] as const;

export type BusinessCategory = typeof BUSINESS_CATEGORIES[number];

export type DealType =
  | 'free_discussion'
  | 'partnership'
  | 'licensing'
  | 'sale'
  | 'investment_required';

export type DevelopmentStage =
  | 'concept'
  | 'research_prototype'
  | 'mvp'
  | 'early_revenue'
  | 'growth_scaling';

export interface IdeaQuestion {
  id: string;
  askerId: string;
  askerName: string;
  question: string;
  answer?: string;
  timestamp: string;
}

export interface BusinessIdea {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  targetCustomers: string;
  requiredInvestment: number; // in USD or INR base
  investmentFormatted: string;
  expectedRevenueModel: string;
  requiredSkills: string[];
  requiredTechnology: string[];
  targetCountry: string;
  category: BusinessCategory;
  scalability: 'Local' | 'Regional' | 'National' | 'Global';
  stage: DevelopmentStage;
  founderId: string;
  founderName: string;
  founderCompany: string;
  founderRole: string;
  founderCountry: string;
  founderVerified: boolean;
  founderRating: number;
  dealType: DealType;
  dealTermsSummary?: string;
  likesCount: number;
  savesCount: number;
  viewsCount: number;
  createdAt: string;
  featured?: boolean;
  status: 'approved' | 'pending' | 'flagged';
  isAdvancedTech?: boolean;
  scientificStatus?: 'Speculative Concept' | 'Theoretical Research' | 'Lab Prototype' | 'Commercial Pilot';
  questions?: IdeaQuestion[];
}

export interface TradeProduct {
  id: string;
  name: string;
  image: string;
  description: string;
  hsCode: string;
  minOrderQty: string;
  priceRange: string;
  tradeType: 'export' | 'import';
  supplierId: string;
  supplierName: string;
  supplierCompany: string;
  supplierCountry: string;
  originCountry: string;
  destinationMarkets: string[];
  shippingIncoterms: string[]; // FOB, CIF, EXW, CFR
  certifications: string[]; // ISO 9001, CE, FDA, GMP, Halal, HACCP, USDA Organic
  verifiedSupplier: boolean;
  category: string;
  status: 'approved' | 'pending' | 'flagged';
  inquiriesCount: number;
  createdAt: string;
  specs?: Record<string, string>;
}

export interface CountryTradeProfile {
  code: string;
  name: string;
  flag: string;
  region: string;
  gdp: string;
  tradeBalance: string;
  popularExports: string[];
  popularImports: string[];
  keySectors: string[];
  majorIndustries: string[];
  marketOpportunities: string[];
  tradePacts: string[];
  activeSuppliersCount: number;
  activeBuyersCount: number;
  tariffOverview: string;
}

export interface InAppMessage {
  id: string;
  threadId: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  recipientId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'proposal' | 'meeting_request' | 'rfq' | 'attachment';
  attachment?: {
    name: string;
    size: string;
    fileType: string;
    url?: string;
  };
  proposal?: {
    title: string;
    amount: string;
    equityOrRoyalty: string;
    terms: string;
    status: 'pending' | 'accepted' | 'declined';
  };
  meeting?: {
    date: string;
    time: string;
    mode: 'Video Call' | 'In-Person';
    agenda: string;
    status: 'scheduled' | 'cancelled';
  };
  rfq?: {
    productName: string;
    quantity: string;
    targetPort: string;
    notes: string;
  };
}

export interface ConversationThread {
  id: string;
  subject: string;
  threadType: 'idea_inquiry' | 'trade_rfq' | 'investor_proposal' | 'meeting' | 'general';
  participant: {
    id: string;
    name: string;
    company: string;
    role: string;
    avatar: string;
    country: string;
    verified: boolean;
  };
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
  relatedEntityId?: string;
  relatedEntityTitle?: string;
}

export interface FeedPost {
  id: string;
  authorId: string;
  authorName: string;
  authorCompany: string;
  authorRole: string;
  authorCountry: string;
  authorVerified: boolean;
  authorAvatar: string;
  content: string;
  postType:
    | 'new_idea'
    | 'product_offer'
    | 'export_opportunity'
    | 'import_requirement'
    | 'investment_ask'
    | 'partnership_call'
    | 'supplier_request'
    | 'buyer_request';
  tags: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  createdAt: string;
  userLiked?: boolean;
  userSaved?: boolean;
  relatedEntityId?: string;
  relatedEntityTitle?: string;
}

export interface AIBusinessIdea {
  id: string;
  conceptName: string;
  tagline: string;
  category: string;
  targetCustomer: string;
  problem: string;
  solution: string;
  revenueModel: string;
  requiredInvestment: string;
  requiredResources: string[];
  possibleMarketSize: string;
  exportPotential: string;
  importRequirements: string;
  competitors: string[];
  launchRoadmap: {
    phase: string;
    title: string;
    duration: string;
    tasks: string[];
  }[];
  disclaimers: string;
  generatedAt: string;
}

export interface AdvancedTechItem {
  id: string;
  title: string;
  category:
    | 'Anti-gravity'
    | 'Advanced Transportation'
    | 'Magnetic Tech'
    | 'Robotics'
    | 'Space Tech'
    | 'Energy Tech'
    | 'Advanced Materials'
    | 'Autonomous Systems';
  scientificStatus:
    | 'Speculative Concept'
    | 'Theoretical Research'
    | 'Lab Prototype'
    | 'Early Commercial Pilot';
  summary: string;
  physicsBasis: string;
  realWorldStatus: string;
  commercialApplications: string[];
  potentialPartnershipModel: string;
  researchPapers: string[];
  riskDisclaimer: string;
}

export interface ReportItem {
  id: string;
  reporterId: string;
  reporterName: string;
  targetId: string;
  targetTitle: string;
  targetType: 'user' | 'idea' | 'product' | 'post';
  reason: 'Scam / Fraud' | 'IP Infringement' | 'Misleading Claims' | 'Spam' | 'Unverified Safety Issue';
  details: string;
  status: 'pending' | 'resolved' | 'dismissed';
  timestamp: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  userName: string;
  companyName: string;
  documentType: 'Business Registration' | 'Import Export Code (IEC)' | 'Tax / GST Certificate' | 'Factory License';
  documentNumber: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface AdminMetrics {
  totalUsers: number;
  totalIdeas: number;
  totalTradeListings: number;
  pendingIdeaApprovals: number;
  pendingProductApprovals: number;
  pendingVerifications: number;
  openReports: number;
  monthlyVolumeEstimate: string;
}
