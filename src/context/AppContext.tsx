import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Campaign,
  Role,
  Language,
  PledgeOrder,
  InvestorProfile,
  InvestorRequest,
  Complaint,
  NotificationItem,
} from '../types';
import {
  INITIAL_CAMPAIGNS,
  INITIAL_ORDERS,
  INITIAL_INVESTORS,
  INITIAL_INVESTOR_REQUESTS,
  INITIAL_COMPLAINTS,
} from '../data/seedData';
import { computeMeritScore } from '../utils/formatters';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  campaigns: Campaign[];
  orders: PledgeOrder[];
  investors: InvestorProfile[];
  investorRequests: InvestorRequest[];
  complaints: Complaint[];
  notifications: NotificationItem[];
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  dismissToast: (id: string) => void;
  
  // Actions
  backCampaign: (
    campaignId: string,
    rewardTierId: string,
    extraTip: number,
    shippingAddress: PledgeOrder['shippingAddress'],
    paymentMethod: 'UPI' | 'Card' | 'NetBanking'
  ) => { success: boolean; orderId: string };
  
  rateOrder: (orderId: string, rating: number, review: string) => void;
  addCampaign: (campaign: Partial<Campaign>) => Campaign;
  postCampaignUpdate: (campaignId: string, title: string, content: string) => void;
  updateOrderShipping: (
    orderId: string,
    status: PledgeOrder['status'],
    trackingNumber?: string,
    courierName?: string
  ) => void;
  
  // Investor actions
  toggleSaveCampaign: (campaignId: string) => void;
  requestPitchDeck: (campaignId: string) => void;
  requestIntro: (campaignId: string) => void;
  respondInvestorRequest: (requestId: string, status: 'accepted' | 'declined') => void;
  
  // Backer actions
  submitComplaint: (
    orderId: string,
    reason: Complaint['reason'],
    description: string
  ) => void;
  
  // Admin actions
  adminApproveCampaign: (campaignId: string) => void;
  adminRejectCampaign: (campaignId: string, reason: string) => void;
  adminApproveInvestor: (investorId: string) => void;
  adminReleasePayout: (campaignId: string, stage: 'first' | 'second') => void;
  adminProcessRefunds: (campaignId: string) => void;
  adminSimulateDeadline: (campaignId: string, outcome: 'success' | 'failed') => void;
  resolveComplaint: (complaintId: string, comment: string) => void;
  freezeCampaign: (campaignId: string) => void;
  
  // Utility
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_CAMPAIGNS = 'bharateeyan_campaigns_v1';
const STORAGE_KEY_ORDERS = 'bharateeyan_orders_v1';
const STORAGE_KEY_INVESTORS = 'bharateeyan_investors_v1';
const STORAGE_KEY_REQUESTS = 'bharateeyan_requests_v1';
const STORAGE_KEY_COMPLAINTS = 'bharateeyan_complaints_v1';
const STORAGE_KEY_NOTIFS = 'bharateeyan_notifs_v1';
const STORAGE_KEY_ROLE = 'bharateeyan_role_v1';
const STORAGE_KEY_LANG = 'bharateeyan_lang_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<Role>(() => {
    return (localStorage.getItem(STORAGE_KEY_ROLE) as Role) || 'guest';
  });

  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem(STORAGE_KEY_LANG) as Language) || 'en';
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CAMPAIGNS);
    return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
  });

  const [orders, setOrders] = useState<PledgeOrder[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [investors, setInvestors] = useState<InvestorProfile[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_INVESTORS);
    return saved ? JSON.parse(saved) : INITIAL_INVESTORS;
  });

  const [investorRequests, setInvestorRequests] = useState<InvestorRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_REQUESTS);
    return saved ? JSON.parse(saved) : INITIAL_INVESTOR_REQUESTS;
  });

  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_COMPLAINTS);
    return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_NOTIFS);
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'notif-1',
        date: '2026-10-23',
        title: 'Campaign Reached 100%!',
        message: 'SuryaDry: Decentralized Solar Crop Dryer reached 100% of its goal with 142 backers.',
        type: 'funded',
        read: false,
        campaignId: 'camp-1'
      },
      {
        id: 'notif-2',
        date: '2026-10-20',
        title: 'Loom setup update posted',
        content: 'Mallesham Chary posted a production update on WeaveCraft Pochampally Apparel.',
        message: 'Mallesham Chary posted a production update on WeaveCraft Pochampally Apparel.',
        type: 'update',
        read: true,
        campaignId: 'camp-3'
      },
      {
        id: 'notif-3',
        date: '2026-09-23',
        title: '100% Escrow Refund Issued',
        message: 'HerbTower missed its goal. ₹4,999 has been refunded to your original UPI account.',
        type: 'refund',
        read: true,
        campaignId: 'camp-14'
      }
    ];
  });

  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ROLE, role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LANG, language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CAMPAIGNS, JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_INVESTORS, JSON.stringify(investors));
  }, [investors]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(investorRequests));
  }, [investorRequests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_COMPLAINTS, JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_NOTIFS, JSON.stringify(notifications));
  }, [notifications]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    const roleLabels: Record<Role, string> = {
      guest: 'Guest Mode',
      backer: 'Backer (Priya Reddy, Hyderabad)',
      founder: 'Founder (Ravi Kumar, Warangal)',
      investor: 'Investor (Meera Angel Fund, Bengaluru)',
      admin: 'Platform Admin',
    };
    showToast(`Switched demo role to: ${roleLabels[newRole]}`, 'info');
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    const names = { en: 'English', te: 'తెలుగు', hi: 'हिन्दी' };
    showToast(`Language set to ${names[lang]}`, 'info');
  };

  // Backing Flow
  const backCampaign = (
    campaignId: string,
    rewardTierId: string,
    extraTip: number,
    shippingAddress: PledgeOrder['shippingAddress'],
    paymentMethod: 'UPI' | 'Card' | 'NetBanking'
  ) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) return { success: false, orderId: '' };

    const tier = campaign.rewardTiers.find(r => r.id === rewardTierId);
    const tierPrice = tier ? tier.price : 500;
    const tierTitle = tier ? tier.title : 'Custom Support Pledge';
    const totalPaid = tierPrice + extraTip;

    const orderId = `BHT-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: PledgeOrder = {
      id: orderId,
      campaignId,
      campaignTitle: campaign.title,
      founderName: campaign.founder.name,
      backerName: role === 'backer' ? 'Priya Reddy' : shippingAddress.fullName,
      backerPhone: shippingAddress.phone || '+91 98480 99112',
      backerEmail: 'priya.reddy@hyderabad.in',
      rewardTierId,
      rewardTitle: tierTitle,
      amount: tierPrice,
      extraTip,
      totalPaid,
      shippingAddress,
      paymentMethod,
      paymentTxnId: `TXN-${paymentMethod.toUpperCase()}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      status: campaign.status === 'funded' ? 'in_production' : 'campaign_live',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setOrders(prev => [newOrder, ...prev]);

    // Update campaign
    setCampaigns(prev =>
      prev.map(c => {
        if (c.id !== campaignId) return c;
        const newRaised = c.raisedAmount + totalPaid;
        const newBackers = c.backersCount + 1;
        const isNowFunded = newRaised >= c.goalAmount;
        
        // Recalculate merit score
        const newMerit = computeMeritScore({
          raisedAmount: newRaised,
          goalAmount: c.goalAmount,
          backersCount: newBackers,
          pastDeliveries: c.founder.pastCampaignsCount,
          hasWorkingDemo: c.pitchVideoPlaceholder.hasDemo,
          updatesCount: c.updates.length,
          communityVotesCount: c.meritScore.communityVotes + 1
        });

        const isValidated = newMerit.totalScore >= 70 && (isNowFunded || (newRaised / c.goalAmount) >= 0.95);

        // Update reward tier claimed count
        const updatedTiers = c.rewardTiers.map(t =>
          t.id === rewardTierId ? { ...t, claimedCount: t.claimedCount + 1 } : t
        );

        return {
          ...c,
          raisedAmount: newRaised,
          backersCount: newBackers,
          status: isNowFunded ? 'funded' : c.status,
          communityValidated: isValidated,
          meritScore: newMerit,
          rewardTiers: updatedTiers,
        };
      })
    );

    // Notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        title: 'Pre-order Confirmed!',
        message: `Your pre-purchase of "${tierTitle}" for ₹${totalPaid} is held safely in escrow.`,
        type: 'system',
        read: false,
        campaignId
      },
      ...prev
    ]);

    showToast(`Pledge successful! Order ${orderId} created under Escrow Guarantee.`, 'success');
    return { success: true, orderId };
  };

  const rateOrder = (orderId: string, rating: number, review: string) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, deliveryRating: rating, deliveryReview: review } : o))
    );
    showToast('Thank you! Your feedback helps other citizens back with confidence.', 'success');
  };

  const addCampaign = (data: Partial<Campaign>): Campaign => {
    const id = `camp-${Date.now()}`;
    const newCamp: Campaign = {
      id,
      title: data.title || 'Untitled Innovation',
      tagline: data.tagline || 'Grassroots hardware built for India.',
      category: data.category || 'Tech',
      city: data.city || 'Warangal',
      state: data.state || 'Telangana',
      language: data.language || 'English',
      founderId: 'f-1',
      founder: data.founder || {
        id: 'f-1',
        name: 'Ravi Kumar',
        city: 'Warangal',
        state: 'Telangana',
        avatarBg: 'from-amber-600 to-indigo-800',
        initials: 'RK',
        bio: 'Grassroots maker from Telangana building practical engineering for everyday problems.',
        entityType: 'Private Limited',
        kycVerified: true,
        bankVerified: true,
        phone: '+91 98480 12345',
        email: 'ravi.surya@gmail.com',
        pastCampaignsCount: 1,
        deliveryTrackRecord: '100% verified fulfillment'
      },
      goalAmount: data.goalAmount || 500000,
      raisedAmount: 0,
      backersCount: 0,
      daysLeft: data.daysLeft || 30,
      status: 'pending_review',
      communityValidated: false,
      meritScore: computeMeritScore({
        raisedAmount: 0,
        goalAmount: data.goalAmount || 500000,
        backersCount: 0,
        pastDeliveries: 1,
        hasWorkingDemo: true,
        updatesCount: 1,
      }),
      cardGradient: data.cardGradient || 'from-indigo-600 to-purple-800',
      iconName: data.iconName || 'Cpu',
      pitchVideoPlaceholder: {
        duration: '3:00',
        aspectRatio: '16:9',
        hasDemo: true,
      },
      story: data.story || {
        problem: 'Local problem description',
        solution: 'Affordable hardware solution',
        whoWeAre: 'Committed local maker',
        fundUsage: 'Tooling, parts, rewards shipping',
        timeline: 'Delivery within 60 days',
        risks: 'Supply chain lead times'
      },
      rewardTiers: data.rewardTiers || [],
      updates: [
        {
          id: `u-${Date.now()}`,
          campaignId: id,
          date: new Date().toISOString().split('T')[0],
          title: 'Campaign Submitted for Indian Rewards Compliance Check',
          content: 'Awaiting admin review for KYC & non-equity verification.',
          likesCount: 1
        }
      ],
      comments: [],
      faqs: data.faqs || [
        { question: 'What do backers receive?', answer: 'Physical reward items and pre-ordered products only.' }
      ],
      payoutStatus: {
        firstStageReleased: false,
        secondStageReleased: false,
        proofUploaded: false
      },
      createdAt: new Date().toISOString().split('T')[0]
    };

    setCampaigns(prev => [newCamp, ...prev]);
    showToast('Campaign submitted for platform review!', 'success');
    return newCamp;
  };

  const postCampaignUpdate = (campaignId: string, title: string, content: string) => {
    setCampaigns(prev =>
      prev.map(c => {
        if (c.id !== campaignId) return c;
        const newUpdate = {
          id: `u-${Date.now()}`,
          campaignId,
          date: new Date().toISOString().split('T')[0],
          title,
          content,
          likesCount: 0
        };
        return {
          ...c,
          updates: [newUpdate, ...c.updates]
        };
      })
    );

    // Notify all backers
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        title: `Founder Update: ${title}`,
        message: content.substring(0, 100) + '...',
        type: 'update',
        read: false,
        campaignId
      },
      ...prev
    ]);

    showToast('Update posted to all project backers!', 'success');
  };

  const updateOrderShipping = (
    orderId: string,
    status: PledgeOrder['status'],
    trackingNumber?: string,
    courierName?: string
  ) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id !== orderId) return o;
        return {
          ...o,
          status,
          trackingNumber: trackingNumber || o.trackingNumber,
          courierName: courierName || o.courierName
        };
      })
    );
    showToast(`Order ${orderId} status updated to ${status}.`, 'success');
  };

  const toggleSaveCampaign = (campaignId: string) => {
    setInvestors(prev =>
      prev.map(inv => {
        if (inv.id !== 'inv-1') return inv;
        const isSaved = inv.savedCampaignIds.includes(campaignId);
        return {
          ...inv,
          savedCampaignIds: isSaved
            ? inv.savedCampaignIds.filter(id => id !== campaignId)
            : [...inv.savedCampaignIds, campaignId]
        };
      })
    );
    showToast('Watchlist updated.', 'info');
  };

  const requestPitchDeck = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) return;

    const newReq: InvestorRequest = {
      id: `req-${Date.now()}`,
      investorId: 'inv-1',
      investorName: 'Meera Krishnan (Meera Angel Fund)',
      investorFirm: 'Meera Angel Fund',
      campaignId,
      campaignTitle: campaign.title,
      founderId: campaign.founderId,
      type: 'pitch_deck',
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setInvestorRequests(prev => [newReq, ...prev]);
    showToast(`Pitch deck request sent to ${campaign.founder.name}.`, 'success');
  };

  const requestIntro = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) return;

    const newReq: InvestorRequest = {
      id: `req-${Date.now()}`,
      investorId: 'inv-1',
      investorName: 'Meera Krishnan (Meera Angel Fund)',
      investorFirm: 'Meera Angel Fund',
      campaignId,
      campaignTitle: campaign.title,
      founderId: campaign.founderId,
      type: 'intro',
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setInvestorRequests(prev => [newReq, ...prev]);
    showToast(`Introduction request sent to ${campaign.founder.name}.`, 'success');
  };

  const respondInvestorRequest = (requestId: string, status: 'accepted' | 'declined') => {
    setInvestorRequests(prev =>
      prev.map(r => (r.id === requestId ? { ...r, status } : r))
    );
    showToast(`Investor connection request ${status}.`, 'info');
  };

  const submitComplaint = (orderId: string, reason: Complaint['reason'], description: string) => {
    const order = orders.find(o => o.id === orderId);
    const newComp: Complaint = {
      id: `comp-${Date.now()}`,
      orderId,
      campaignId: order?.campaignId || '',
      campaignTitle: order?.campaignTitle || 'Campaign',
      founderName: order?.founderName || 'Founder',
      backerName: order?.backerName || 'Priya Reddy',
      reason,
      description,
      status: 'Submitted',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setComplaints(prev => [newComp, ...prev]);
    showToast('Grievance filed with Grievance Officer. Review starts within 24 hours.', 'info');
  };

  const resolveComplaint = (complaintId: string, comment: string) => {
    setComplaints(prev =>
      prev.map(c =>
        c.id === complaintId
          ? { ...c, status: 'Resolved', resolutionComment: comment }
          : c
      )
    );
    showToast('Complaint resolved and logged.', 'success');
  };

  const freezeCampaign = (campaignId: string) => {
    setCampaigns(prev =>
      prev.map(c => (c.id === campaignId ? { ...c, status: 'rejected' } : c))
    );
    showToast('Campaign frozen by platform compliance team.', 'error');
  };

  // Admin Actions
  const adminApproveCampaign = (campaignId: string) => {
    setCampaigns(prev =>
      prev.map(c => (c.id === campaignId ? { ...c, status: 'live' } : c))
    );
    showToast('Campaign approved and published live!', 'success');
  };

  const adminRejectCampaign = (campaignId: string, reason: string) => {
    setCampaigns(prev =>
      prev.map(c => (c.id === campaignId ? { ...c, status: 'rejected' } : c))
    );
    showToast(`Campaign rejected: ${reason}`, 'error');
  };

  const adminApproveInvestor = (investorId: string) => {
    setInvestors(prev =>
      prev.map(inv => (inv.id === investorId ? { ...inv, verified: true } : inv))
    );
    showToast('Investor accreditation credentials verified.', 'success');
  };

  const adminReleasePayout = (campaignId: string, stage: 'first' | 'second') => {
    setCampaigns(prev =>
      prev.map(c => {
        if (c.id !== campaignId) return c;
        return {
          ...c,
          payoutStatus: {
            ...c.payoutStatus,
            firstStageReleased: stage === 'first' ? true : c.payoutStatus.firstStageReleased,
            secondStageReleased: stage === 'second' ? true : c.payoutStatus.secondStageReleased
          }
        };
      })
    );
    showToast(`Released ${stage === 'first' ? 'Stage 1 (60%)' : 'Stage 2 (40%)'} escrow payout.`, 'success');
  };

  const adminProcessRefunds = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) return;

    // Mark all orders for this campaign as refunded
    setOrders(prev =>
      prev.map(o => (o.campaignId === campaignId ? { ...o, status: 'refunded' } : o))
    );

    // Set campaign status to failed
    setCampaigns(prev =>
      prev.map(c => (c.id === campaignId ? { ...c, status: 'failed' } : c))
    );

    // Notify
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        title: 'Full Escrow Refund Processed',
        message: `All pledges for "${campaign.title}" have been refunded in full under our All-or-Nothing policy.`,
        type: 'refund',
        read: false,
        campaignId
      },
      ...prev
    ]);

    showToast(`All backer pledges for "${campaign.title}" refunded successfully!`, 'success');
  };

  const adminSimulateDeadline = (campaignId: string, outcome: 'success' | 'failed') => {
    if (outcome === 'success') {
      setCampaigns(prev =>
        prev.map(c => {
          if (c.id !== campaignId) return c;
          const newRaised = Math.max(c.raisedAmount, c.goalAmount);
          const merit = computeMeritScore({
            raisedAmount: newRaised,
            goalAmount: c.goalAmount,
            backersCount: c.backersCount,
            pastDeliveries: c.founder.pastCampaignsCount,
            hasWorkingDemo: c.pitchVideoPlaceholder.hasDemo,
            updatesCount: c.updates.length
          });
          return {
            ...c,
            daysLeft: 0,
            status: 'funded',
            raisedAmount: newRaised,
            communityValidated: merit.totalScore >= 70,
            meritScore: merit,
            payoutStatus: { ...c.payoutStatus, firstStageReleased: true }
          };
        })
      );
      showToast('Simulated SUCCESS deadline! 60% unlocked, eligible for Deal Room.', 'success');
    } else {
      setCampaigns(prev =>
        prev.map(c => {
          if (c.id !== campaignId) return c;
          return {
            ...c,
            daysLeft: 0,
            status: 'failed',
            communityValidated: false
          };
        })
      );
      showToast('Simulated FAILED deadline. Use "Process Refunds" to return funds to backers.', 'info');
    }
  };

  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEY_CAMPAIGNS);
    localStorage.removeItem(STORAGE_KEY_ORDERS);
    localStorage.removeItem(STORAGE_KEY_INVESTORS);
    localStorage.removeItem(STORAGE_KEY_REQUESTS);
    localStorage.removeItem(STORAGE_KEY_COMPLAINTS);
    localStorage.removeItem(STORAGE_KEY_NOTIFS);
    localStorage.removeItem(STORAGE_KEY_ROLE);
    localStorage.removeItem(STORAGE_KEY_LANG);

    setCampaigns(INITIAL_CAMPAIGNS);
    setOrders(INITIAL_ORDERS);
    setInvestors(INITIAL_INVESTORS);
    setInvestorRequests(INITIAL_INVESTOR_REQUESTS);
    setComplaints(INITIAL_COMPLAINTS);
    setRoleState('guest');
    setLanguageState('en');
    showToast('Demo data reset to clean initial seed!', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        campaigns,
        orders,
        investors,
        investorRequests,
        complaints,
        notifications,
        toasts,
        showToast,
        dismissToast,
        backCampaign,
        rateOrder,
        addCampaign,
        postCampaignUpdate,
        updateOrderShipping,
        toggleSaveCampaign,
        requestPitchDeck,
        requestIntro,
        respondInvestorRequest,
        submitComplaint,
        resolveComplaint,
        freezeCampaign,
        adminApproveCampaign,
        adminRejectCampaign,
        adminApproveInvestor,
        adminReleasePayout,
        adminProcessRefunds,
        adminSimulateDeadline,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
