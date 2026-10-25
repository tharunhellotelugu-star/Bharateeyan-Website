import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { formatINR, formatINRLakh } from '../utils/formatters';
import { CommunityValidatedBadge } from '../components/CommunityValidatedBadge';
import {
  Briefcase,
  ShieldCheck,
  Lock,
  Bookmark,
  BookmarkCheck,
  Send,
  Building,
  CheckCircle2,
  TrendingUp,
  MapPin,
  ExternalLink,
  ChevronRight,
  Sparkles,
  FileText
} from 'lucide-react';

interface InvestorDealRoomPageProps {
  onSelectCampaign: (id: string) => void;
}

export const InvestorDealRoomPage: React.FC<InvestorDealRoomPageProps> = ({ onSelectCampaign }) => {
  const {
    campaigns,
    investors,
    investorRequests,
    requestPitchDeck,
    requestIntro,
    toggleSaveCampaign,
    role,
    setRole,
    showToast
  } = useApp();

  // Active investor profile: Meera Angel Fund (inv-1)
  const currentInvestor = investors.find(i => i.id === 'inv-1') || investors[0];

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [minMeritScore, setMinMeritScore] = useState<number>(70);
  const [onlySaved, setOnlySaved] = useState<boolean>(false);

  // Selected startup detail modal for investor
  const [inspectCampaignId, setInspectCampaignId] = useState<string | null>(null);

  // Filter only community validated or high-merit startups
  const dealRoomCampaigns = useMemo(() => {
    return campaigns.filter(c => {
      if (c.status === 'failed' || c.status === 'pending_review' || c.status === 'rejected') return false;
      if (c.meritScore.totalScore < minMeritScore) return false;
      if (selectedCategory !== 'All' && c.category !== selectedCategory) return false;
      if (onlySaved && !currentInvestor.savedCampaignIds.includes(c.id)) return false;
      return true;
    }).sort((a, b) => b.meritScore.totalScore - a.meritScore.totalScore);
  }, [campaigns, minMeritScore, selectedCategory, onlySaved, currentInvestor.savedCampaignIds]);

  const inspectCampaign = campaigns.find(c => c.id === inspectCampaignId);

  // If user is guest, show investor verification requirement
  if (role !== 'investor' && !currentInvestor.verified) {
    return (
      <div className="max-w-xl mx-auto my-16 px-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xl text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 flex items-center justify-center mx-auto">
            <Briefcase className="w-7 h-7 text-indigo-700" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Restricted Accredited Access
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-2">
              Investor Deal Room Access
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Reserved strictly for accredited angel investors and SEBI-registered Category I AIFs.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-left space-y-2">
            <span className="font-bold text-slate-800">Switch to Investor Demo Persona:</span>
            <p className="text-slate-600">
              Click below to instantly activate the verified investor persona for <strong>Meera Angel Fund (Bengaluru)</strong>.
            </p>
          </div>

          <button
            onClick={() => {
              setRole('investor');
              showToast('Switched to Meera Angel Fund (Bengaluru)', 'success');
            }}
            className="w-full py-3 bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4 text-amber-400" />
            <span>Enter Deal Room as Meera Angel Fund</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Statutory Header Notice */}
      <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block">
            Statutory Regulatory Disclaimer for Accredited Angels & Funds:
          </span>
          <p className="text-amber-900 leading-snug mt-0.5">
            The Deal Room is strictly for accredited investors and SEBI-registered angel funds. Any potential equity investment happens directly between the investor and the startup entity under applicable Indian company and securities law, outside this rewards platform.
          </p>
        </div>
      </div>

      {/* Investor Profile Summary Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-indigo-900 text-white font-black text-lg flex items-center justify-center shadow-inner">
            MA
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-950">{currentInvestor.firmName}</h1>
              <span className="text-[10px] bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded border border-emerald-300">
                Verified SEBI Angel Fund
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Principal: {currentInvestor.name} · {currentInvestor.city} · SEBI Reg: {currentInvestor.sebiRegNo}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="text-right">
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Typical Ticket</span>
            <span className="font-bold text-slate-900 font-mono">{currentInvestor.ticketSize}</span>
          </div>
          <button
            onClick={() => setOnlySaved(!onlySaved)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              onlySaved
                ? 'bg-amber-100 border-amber-300 text-amber-950'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-600" />
            <span>Saved Watchlist ({currentInvestor.savedCampaignIds.length})</span>
          </button>
        </div>
      </div>

      {/* Filter Strip */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-700">Filter By Category:</span>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="p-1.5 border rounded-lg bg-white"
          >
            <option value="All">All Categories</option>
            <option value="Agri">Agri</option>
            <option value="Hardware">Hardware</option>
            <option value="Food">Food</option>
            <option value="Fashion">Fashion</option>
            <option value="Education">Education</option>
            <option value="Clean Energy">Clean Energy</option>
            <option value="Health">Health</option>
            <option value="Apps">Apps</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-700">Minimum Merit Score:</span>
          <div className="flex items-center gap-2">
            {[70, 75, 80, 85].map(score => (
              <button
                key={score}
                onClick={() => setMinMeritScore(score)}
                className={`px-2.5 py-1 rounded text-xs font-semibold border ${
                  minMeritScore === score
                    ? 'bg-indigo-900 text-white border-indigo-900'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                {score}+
              </button>
            ))}
          </div>
        </div>

        <span className="text-slate-500 font-medium">
          Showing <strong>{dealRoomCampaigns.length}</strong> validated startups
        </span>
      </div>

      {/* Startup Table / Cards for Investors */}
      <div className="space-y-4">
        {dealRoomCampaigns.map(camp => {
          const isSaved = currentInvestor.savedCampaignIds.includes(camp.id);
          const hasRequestedDeck = investorRequests.some(
            r => r.campaignId === camp.id && r.investorId === currentInvestor.id && r.type === 'pitch_deck'
          );
          const hasRequestedIntro = investorRequests.some(
            r => r.campaignId === camp.id && r.investorId === currentInvestor.id && r.type === 'intro'
          );

          return (
            <div
              key={camp.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 p-6 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 transition-all"
            >
              {/* Left Column: Startup & Founder (NO college or employer field!) */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-indigo-950 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
                    {camp.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    {camp.city}, {camp.state}
                  </span>
                  <CommunityValidatedBadge size="sm" />
                </div>

                <h3 className="text-lg font-bold text-slate-950">
                  {camp.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 max-w-2xl leading-relaxed">
                  {camp.tagline}
                </p>

                <div className="flex items-center gap-3 text-xs text-slate-700 pt-1">
                  <span className="font-semibold text-slate-900">Founder: {camp.founder.name}</span>
                  <span>·</span>
                  <span className="text-emerald-700 font-medium">{camp.founder.deliveryTrackRecord}</span>
                  <span>·</span>
                  <span className="text-slate-500">{camp.founder.entityType}</span>
                </div>
              </div>

              {/* Middle Column: Traction Numbers */}
              <div className="grid grid-cols-3 gap-4 text-center text-xs shrink-0 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 min-w-[280px]">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Pre-Orders</span>
                  <span className="font-bold text-slate-900 font-mono text-sm block mt-0.5">
                    {formatINRLakh(camp.raisedAmount)}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-medium">
                    {Math.round((camp.raisedAmount / camp.goalAmount) * 100)}% of goal
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Backers</span>
                  <span className="font-bold text-indigo-950 font-mono text-sm block mt-0.5">
                    {camp.backersCount}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Organic customers
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Merit Score</span>
                  <span className="font-black text-amber-600 font-mono text-sm block mt-0.5">
                    {camp.meritScore.totalScore}
                  </span>
                  <span className="text-[10px] text-slate-500">out of 100</span>
                </div>
              </div>

              {/* Right Column: Investor CTAs */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 w-full lg:w-auto">
                <button
                  onClick={() => setInspectCampaignId(camp.id)}
                  className="px-4 py-2 bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View Traction Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => requestPitchDeck(camp.id)}
                    disabled={hasRequestedDeck}
                    className="flex-1 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-950 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 rounded-lg transition-colors"
                  >
                    {hasRequestedDeck ? 'Deck Requested ✓' : 'Request Deck'}
                  </button>

                  <button
                    onClick={() => toggleSaveCampaign(camp.id)}
                    className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:text-amber-600"
                    title="Save to Watchlist"
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4 text-amber-600 fill-current" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Inspect Startup Modal for Investor */}
      {inspectCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-6 my-6">
            
            <div className="flex justify-between items-start border-b pb-4">
              <div>
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 uppercase">
                  {inspectCampaign.category} · {inspectCampaign.city}
                </span>
                <h3 className="text-xl font-bold text-slate-950 mt-1">
                  {inspectCampaign.title}
                </h3>
                <p className="text-xs text-slate-500">Founder: {inspectCampaign.founder.name} · {inspectCampaign.founder.entityType}</p>
              </div>
              <button onClick={() => setInspectCampaignId(null)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            {/* Traction Summary */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs p-3.5 bg-slate-50 rounded-xl border">
              <div>
                <span className="text-slate-500 block">Pre-Purchase Volume</span>
                <span className="font-bold text-slate-900 font-mono text-base">{formatINR(inspectCampaign.raisedAmount)}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Organic Customers</span>
                <span className="font-bold text-indigo-950 font-mono text-base">{inspectCampaign.backersCount}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Merit Score</span>
                <span className="font-bold text-amber-600 font-mono text-base">{inspectCampaign.meritScore.totalScore}/100</span>
              </div>
            </div>

            {/* Business & Unit Economics Overview */}
            <div className="space-y-3 text-xs leading-relaxed text-slate-700">
              <div>
                <span className="font-bold text-slate-900 block mb-0.5">Problem Validated:</span>
                <p>{inspectCampaign.story.problem}</p>
              </div>
              <div>
                <span className="font-bold text-slate-900 block mb-0.5">Grassroots Solution:</span>
                <p>{inspectCampaign.story.solution}</p>
              </div>
              <div>
                <span className="font-bold text-slate-900 block mb-0.5">Use of Capital & Scaling Plan:</span>
                <p>{inspectCampaign.story.fundUsage}</p>
              </div>
            </div>

            {/* Investor Actions */}
            <div className="flex gap-3 pt-3 border-t">
              <button
                onClick={() => {
                  requestIntro(inspectCampaign.id);
                  setInspectCampaignId(null);
                }}
                className="flex-1 py-2.5 bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Request 1-on-1 Founder Intro</span>
              </button>

              <button
                onClick={() => {
                  onSelectCampaign(inspectCampaign.id);
                  setInspectCampaignId(null);
                }}
                className="px-4 py-2.5 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50"
              >
                View Full Campaign Page
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
