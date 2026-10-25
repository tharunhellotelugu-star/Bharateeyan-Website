export type Role = 'guest' | 'backer' | 'founder' | 'investor' | 'admin';

export type Language = 'en' | 'te' | 'hi';

export type CampaignCategory =
  | 'Tech'
  | 'Food'
  | 'Fashion'
  | 'Agri'
  | 'Health'
  | 'Education'
  | 'Hardware'
  | 'Handicrafts'
  | 'Clean Energy'
  | 'Apps';

export type CampaignStatus = 'live' | 'funded' | 'ending_soon' | 'failed' | 'pending_review' | 'rejected';

export interface RewardTier {
  id: string;
  campaignId: string;
  title: string;
  price: number; // in INR
  description: string;
  items: string[];
  estimatedDeliveryMonth: string; // e.g. "Dec 2026"
  quantityLimit: number;
  claimedCount: number;
}

export interface CampaignUpdate {
  id: string;
  campaignId: string;
  date: string;
  title: string;
  content: string;
  imageUrl?: string;
  likesCount: number;
}

export interface CampaignComment {
  id: string;
  campaignId: string;
  authorName: string;
  authorCity: string;
  isBacker: boolean;
  date: string;
  text: string;
}

export interface MeritScoreBreakdown {
  publicBacking: number;      // max 30
  realCustomers: number;      // max 20
  deliveryRecord: number;     // max 20
  workingProduct: number;     // max 15
  founderCommitment: number;  // max 10
  communityVotes: number;     // max 5
  totalScore: number;         // sum (out of 100)
}

export interface Founder {
  id: string;
  name: string;
  city: string;
  state: string;
  avatarBg: string;
  initials: string;
  bio: string;
  entityType: 'Private Limited' | 'LLP' | 'Sole Proprietor' | 'Not registered yet';
  kycVerified: boolean;
  bankVerified: boolean;
  phone: string;
  email: string;
  pastCampaignsCount: number;
  deliveryTrackRecord: string; // e.g. "100% on-time delivery across 1 previous batch"
}

export interface Campaign {
  id: string;
  title: string;
  tagline: string;
  category: CampaignCategory;
  city: string;
  state: string;
  language: string;
  founderId: string;
  founder: Founder;
  goalAmount: number; // in INR
  raisedAmount: number; // in INR
  backersCount: number;
  daysLeft: number;
  status: CampaignStatus;
  communityValidated: boolean; // Merit >= 70 AND goal reached (or >= 95% backed)
  meritScore: MeritScoreBreakdown;
  cardGradient: string; // CSS gradient class
  iconName: string;
  pitchVideoPlaceholder: {
    duration: string;
    aspectRatio: string;
    hasDemo: boolean;
  };
  story: {
    problem: string;
    solution: string;
    whoWeAre: string;
    fundUsage: string;
    timeline: string;
    risks: string;
  };
  rewardTiers: RewardTier[];
  updates: CampaignUpdate[];
  comments: CampaignComment[];
  faqs: { question: string; answer: string }[];
  payoutStatus: {
    firstStageReleased: boolean; // 60%
    secondStageReleased: boolean; // 40%
    proofUploaded: boolean;
    proofUrl?: string;
  };
  createdAt: string;
}

export interface PledgeOrder {
  id: string; // e.g. "BHT-2026-89412"
  campaignId: string;
  campaignTitle: string;
  founderName: string;
  backerName: string;
  backerPhone: string;
  backerEmail: string;
  rewardTierId: string;
  rewardTitle: string;
  amount: number;
  extraTip: number;
  totalPaid: number;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  paymentMethod: 'UPI' | 'Card' | 'NetBanking';
  paymentTxnId: string;
  status: 'campaign_live' | 'in_production' | 'shipped' | 'delivered' | 'refunded';
  trackingNumber?: string;
  courierName?: string;
  createdAt: string;
  deliveryRating?: number;
  deliveryReview?: string;
}

export interface NotificationItem {
  id: string;
  date: string;
  title: string;
  message: string;
  type: 'update' | 'funded' | 'shipped' | 'refund' | 'investor' | 'system';
  read: boolean;
  campaignId?: string;
}

export interface Complaint {
  id: string;
  orderId: string;
  campaignId: string;
  campaignTitle: string;
  founderName: string;
  backerName: string;
  reason: 'Late Delivery' | 'Product Defect' | 'Wrong Item' | 'Unresponsive Founder' | 'Other';
  description: string;
  status: 'Submitted' | 'Under Review' | 'Founder Responded' | 'Resolved';
  resolutionComment?: string;
  createdAt: string;
}

export interface InvestorProfile {
  id: string;
  name: string;
  firmName: string;
  city: string;
  type: 'Accredited Investor' | 'SEBI-registered Angel Fund';
  sebiRegNo?: string;
  verified: boolean;
  portfolioCount: number;
  ticketSize: string; // e.g. "₹10L - ₹50L"
  savedCampaignIds: string[];
}

export interface InvestorRequest {
  id: string;
  investorId: string;
  investorName: string;
  investorFirm: string;
  campaignId: string;
  campaignTitle: string;
  founderId: string;
  type: 'pitch_deck' | 'intro';
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}
