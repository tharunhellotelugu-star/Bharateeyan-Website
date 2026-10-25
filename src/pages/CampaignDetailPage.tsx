import React, { useState } from 'react';
import { Campaign, RewardTier } from '../types';
import { formatINR, formatINRLakh } from '../utils/formatters';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { MeritScoreGauge } from '../components/MeritScoreGauge';
import { CommunityValidatedBadge } from '../components/CommunityValidatedBadge';
import { PaymentGatewayModal } from '../components/PaymentGatewayModal';
import {
  MapPin,
  Clock,
  Users,
  CheckCircle,
  Share2,
  Sparkles,
  Play,
  ShieldCheck,
  AlertTriangle,
  Lock,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  FileText,
  Send,
  Loader2,
  Copy,
  Check,
  X
} from 'lucide-react';

interface CampaignDetailPageProps {
  campaignId: string;
  navigate: (path: string) => void;
}

export const CampaignDetailPage: React.FC<CampaignDetailPageProps> = ({
  campaignId,
  navigate
}) => {
  const { campaigns, language, showToast } = useApp();
  const t = translations[language];

  const campaign = campaigns.find(c => c.id === campaignId) || campaigns[0];

  const [activeTab, setActiveTab] = useState<'story' | 'rewards' | 'updates' | 'comments' | 'faq' | 'risks'>('story');
  const [selectedReward, setSelectedReward] = useState<RewardTier | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // AI Translation State
  const [translating, setTranslating] = useState(false);
  const [translatedStory, setTranslatedStory] = useState<{
    problem?: string;
    solution?: string;
    whoWeAre?: string;
    fundUsage?: string;
    timeline?: string;
    risks?: string;
  } | null>(null);

  // Report Modal State
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('Misleading product claims');
  const [reportText, setReportText] = useState('');

  // New Comment State
  const [commentText, setCommentText] = useState('');

  const percentFunded = Math.round((campaign.raisedAmount / campaign.goalAmount) * 100);

  // AI Story Translation Handler
  const handleTranslateStory = async () => {
    setTranslating(true);
    try {
      const fullText = `Problem: ${campaign.story.problem}\n\nSolution: ${campaign.story.solution}\n\nWho We Are: ${campaign.story.whoWeAre}\n\nFund Usage: ${campaign.story.fundUsage}\n\nTimeline: ${campaign.story.timeline}`;
      const res = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: fullText,
          targetLanguage: language
        })
      });

      const data = await res.json();
      setTranslatedStory({
        problem: `[Translated via Gemini to ${language === 'te' ? 'తెలుగు' : language === 'hi' ? 'हिन्दी' : 'English'}]\n${data.translatedText}`
      });
      showToast('Campaign story translated by Gemini AI', 'success');
    } catch (err) {
      showToast('Translation error occurred. Showing original text.', 'error');
    } finally {
      setTranslating(false);
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Check out "${campaign.title}" by grassroots founder ${campaign.founder.name} (${campaign.city}) on Bharateeyan!\nPre-buy products and back Indian innovators: ${window.location.href}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    showToast('Link copied to clipboard!', 'info');
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    campaign.comments.unshift({
      id: `c-${Date.now()}`,
      campaignId: campaign.id,
      authorName: 'Priya Reddy',
      authorCity: 'Hyderabad',
      isBacker: true,
      date: new Date().toISOString().split('T')[0],
      text: commentText
    });

    setCommentText('');
    showToast('Comment posted on backer board!', 'success');
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportModalOpen(false);
    showToast('Report submitted to Compliance & Grievance team. Ref: GRV-2026-991', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. Header & Badges */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200 uppercase tracking-wider">
            {campaign.category}
          </span>
          <span className="text-slate-400">·</span>
          <span className="flex items-center gap-1 text-slate-600 font-medium">
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            {campaign.city}, {campaign.state}
          </span>
          {campaign.communityValidated && (
            <>
              <span className="text-slate-400">·</span>
              <CommunityValidatedBadge size="sm" />
            </>
          )}
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
          {campaign.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-700 max-w-3xl leading-relaxed">
          {campaign.tagline}
        </p>
      </div>

      {/* 2. Main Hero Split: Pitch Video Slot (Left) + Funding Box (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Pitch Video Area (Placeholder Player) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-video rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 overflow-hidden shadow-md border border-slate-200 flex items-center justify-center group">
            
            {!isVideoPlaying ? (
              <>
                {/* Background decorative artwork */}
                <div className={`absolute inset-0 bg-gradient-to-br ${campaign.cardGradient} opacity-35`}></div>
                
                {/* Play Button Overlay */}
                <div className="relative z-10 text-center space-y-3">
                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="w-16 h-16 rounded-full bg-amber-500 hover:bg-amber-400 text-indigo-950 flex items-center justify-center shadow-xl transition-all hover:scale-105 active:scale-95 group-hover:ring-4 group-hover:ring-amber-300/40"
                    aria-label="Play Pitch Video"
                  >
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </button>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Watch Grassroots Prototype Pitch & Demonstration
                    </span>
                    <span className="text-[11px] text-amber-300 font-medium">
                      Duration: {campaign.pitchVideoPlaceholder.duration} · High Def Working Prototype
                    </span>
                  </div>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/80 bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/10">
                  <span>Filmed at {campaign.city} Workshop</span>
                  <span>100% Real Hardware Demo</span>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-white p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-indigo-900/80 border border-amber-400 flex items-center justify-center">
                  <Play className="w-6 h-6 text-amber-400 animate-pulse" />
                </div>
                <h4 className="font-bold text-sm">Simulated Video Player: {campaign.title}</h4>
                <p className="text-xs text-slate-300 max-w-md">
                  Demonstrating field performance, local assembly process, and backer reward packaging specs.
                </p>
                <button
                  onClick={() => setIsVideoPlaying(false)}
                  className="px-3 py-1 bg-white/20 hover:bg-white/30 text-xs rounded-md text-slate-200 mt-2"
                >
                  Close Video Simulation
                </button>
              </div>
            )}
          </div>

          {/* Founder Verification Card (Strictly NO college or employer fields!) */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${campaign.founder.avatarBg} text-white font-bold text-base flex items-center justify-center shrink-0 shadow-inner`}>
                {campaign.founder.initials}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-slate-950">
                    {campaign.founder.name}
                  </span>
                  <span title="DigiLocker KYC Verified Founder">
                    <CheckCircle className="w-4 h-4 text-indigo-700" />
                  </span>
                  <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-medium">
                    Verified Maker
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  {campaign.founder.city}, {campaign.founder.state} · {campaign.founder.entityType}
                </p>
                <p className="text-[11px] text-emerald-800 font-semibold mt-0.5">
                  Track record: {campaign.founder.deliveryTrackRecord}
                </p>
              </div>
            </div>

            {/* Anti-pedigree callout note */}
            <div className="hidden sm:block text-right">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 block">
                Pure Merit
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5 block">
                Judged solely on execution
              </span>
            </div>
          </div>

        </div>

        {/* Right: Big Funding Box */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-2xl border-2 border-indigo-100 p-6 shadow-md space-y-6">
            
            {/* Raised & Progress */}
            <div>
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-3xl font-black text-slate-950 font-mono tracking-tight">
                  {formatINR(campaign.raisedAmount)}
                </span>
                <span className="text-sm font-bold text-indigo-700">
                  {percentFunded}% funded
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium block mb-3">
                pre-purchased of {formatINR(campaign.goalAmount)} target goal
              </span>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    percentFunded >= 100 ? 'bg-emerald-600' : 'bg-indigo-600'
                  }`}
                  style={{ width: `${Math.min(percentFunded, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Backers & Days Left */}
            <div className="grid grid-cols-2 gap-4 py-2 border-y border-slate-100 text-xs">
              <div>
                <span className="text-2xl font-bold text-slate-900 block font-mono">
                  {campaign.backersCount}
                </span>
                <span className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold">
                  Citizen Backers
                </span>
              </div>
              <div>
                <span className="text-2xl font-bold text-slate-900 block font-mono">
                  {campaign.status === 'failed' ? 'Ended' : `${campaign.daysLeft}`}
                </span>
                <span className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold">
                  Days Left to Back
                </span>
              </div>
            </div>

            {/* Mandatory All-Or-Nothing Note */}
            <div className="p-3.5 bg-indigo-50/70 rounded-xl border border-indigo-200/80 text-xs text-indigo-950 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-indigo-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>All-Or-Nothing Escrow Promise:</span>
              </div>
              <p className="text-[11px] text-indigo-900 leading-snug">
                {t.allOrNothingNote}
              </p>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => {
                if (campaign.rewardTiers.length > 0) {
                  setSelectedReward(campaign.rewardTiers[0]);
                }
              }}
              disabled={campaign.status === 'failed'}
              className="w-full py-4 px-6 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-300 text-indigo-950 font-bold text-sm rounded-xl shadow-lg transition-all hover:scale-102 flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>{campaign.status === 'failed' ? 'Campaign Ended' : t.backThisProject}</span>
            </button>

            {/* Social Share & Report Links */}
            <div className="pt-2 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShareWhatsApp}
                  className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-semibold bg-emerald-50 hover:bg-emerald-100 py-1.5 px-3 rounded-lg border border-emerald-200 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share on WhatsApp</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="p-1.5 text-slate-500 hover:text-slate-800 bg-slate-100 rounded-lg"
                  title="Copy Link"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <button
                onClick={() => setReportModalOpen(true)}
                className="text-slate-400 hover:text-rose-600 text-[11px] underline"
              >
                {t.reportCampaign}
              </button>
            </div>

          </div>

          {/* Merit Score Breakdown Widget */}
          <MeritScoreGauge
            score={campaign.meritScore}
            campaignTitle={campaign.title}
            founderName={campaign.founder.name}
            city={campaign.city}
          />
        </div>

      </div>

      {/* 3. TABS SECTION: Story | Rewards | Updates | Comments | FAQ | Risks */}
      <div className="pt-6">
        
        {/* Tab Headers */}
        <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto scrollbar-none mb-8">
          {[
            { id: 'story', label: t.story },
            { id: 'rewards', label: `${t.rewards} (${campaign.rewardTiers.length})` },
            { id: 'updates', label: `${t.updates} (${campaign.updates.length})` },
            { id: 'comments', label: `${t.comments} (${campaign.comments.length})` },
            { id: 'faq', label: t.faq },
            { id: 'risks', label: t.risks }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-4 font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-colors border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'border-indigo-900 text-indigo-950 font-black'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: STORY */}
        {activeTab === 'story' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-8">
              
              {/* Translate with AI Button */}
              <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-indigo-950">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Read campaign story in your preferred regional language (Telugu, Hindi, or English)</span>
                </div>
                <button
                  onClick={handleTranslateStory}
                  disabled={translating}
                  className="px-3 py-1.5 bg-indigo-900 hover:bg-indigo-800 disabled:opacity-50 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                >
                  {translating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Translating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>{t.translateWithAI}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Story Sections */}
              <div className="space-y-6 text-slate-800 text-sm leading-relaxed">
                
                {translatedStory?.problem ? (
                  <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200 whitespace-pre-line">
                    {translatedStory.problem}
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-950 border-b border-slate-100 pb-1">
                        The Problem
                      </h3>
                      <p>{campaign.story.problem}</p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-950 border-b border-slate-100 pb-1">
                        My Solution & Prototype
                      </h3>
                      <p>{campaign.story.solution}</p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-950 border-b border-slate-100 pb-1">
                        Who I Am
                      </h3>
                      <p>{campaign.story.whoWeAre}</p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-950 border-b border-slate-100 pb-1">
                        How the Money Will Be Used
                      </h3>
                      <p>{campaign.story.fundUsage}</p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-950 border-b border-slate-100 pb-1">
                        Manufacturing Timeline
                      </h3>
                      <p>{campaign.story.timeline}</p>
                    </div>
                  </>
                )}

              </div>
            </div>

            {/* Sidebar Sticky Reward Quick-Picks */}
            <div className="lg:col-span-4 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Available Reward Tiers
              </h3>
              {campaign.rewardTiers.map(tier => (
                <div
                  key={tier.id}
                  className="p-4 bg-white rounded-xl border border-slate-200 hover:border-indigo-400 transition-all space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-xs text-slate-900">{tier.title}</h4>
                    <span className="font-black text-sm text-indigo-950">{formatINR(tier.price)}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-snug">{tier.description}</p>
                  <div className="text-[11px] text-slate-500 flex justify-between">
                    <span>Est: {tier.estimatedDeliveryMonth}</span>
                    <span>{tier.quantityLimit - tier.claimedCount} left</span>
                  </div>
                  <button
                    onClick={() => setSelectedReward(tier)}
                    className="w-full py-2 bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs rounded-lg transition-colors"
                  >
                    Select this Perk ({formatINR(tier.price)})
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: REWARDS TIERS (Full View) */}
        {activeTab === 'rewards' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {campaign.rewardTiers.map(tier => (
              <div
                key={tier.id}
                className="bg-white rounded-2xl border-2 border-slate-200 hover:border-indigo-500 p-6 shadow-xs flex flex-col justify-between space-y-4 transition-all"
              >
                <div className="space-y-3">
                  <span className="text-2xl font-black text-slate-950 font-mono block">
                    {formatINR(tier.price)}
                  </span>
                  <h4 className="text-base font-bold text-slate-900">{tier.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{tier.description}</p>
                  
                  {/* Included items */}
                  <div className="pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      Includes:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {tier.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Est. Delivery: <strong>{tier.estimatedDeliveryMonth}</strong></span>
                    <span>{tier.quantityLimit - tier.claimedCount} of {tier.quantityLimit} left</span>
                  </div>
                  <button
                    onClick={() => setSelectedReward(tier)}
                    className="w-full py-2.5 bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                  >
                    Select Perk
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: UPDATES */}
        {activeTab === 'updates' && (
          <div className="max-w-3xl space-y-6">
            {campaign.updates.map(update => (
              <div key={update.id} className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-indigo-700">Founder Update</span>
                  <span>{update.date}</span>
                </div>
                <h3 className="text-base font-bold text-slate-950">{update.title}</h3>
                <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">{update.content}</p>
                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  ❤️ {update.likesCount} backers supported this update
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: COMMENTS */}
        {activeTab === 'comments' && (
          <div className="max-w-3xl space-y-6">
            
            {/* New Comment Box */}
            <form onSubmit={handleAddComment} className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3">
              <label className="block text-xs font-bold text-slate-900">
                Post a question or message to founder {campaign.founder.name}:
              </label>
              <textarea
                rows={3}
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder="Ask about delivery dates, technical specs, or share feedback in Telugu/Hindi/English..."
                className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-indigo-600"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="px-4 py-2 bg-indigo-900 hover:bg-indigo-800 disabled:opacity-50 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Question</span>
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {campaign.comments.map(c => (
                <div key={c.id} className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{c.authorName}</span>
                      <span className="text-[10px] text-slate-500 font-medium">({c.authorCity})</span>
                      {c.isBacker && (
                        <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.2 rounded">
                          Verified Backer
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">{c.date}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 5: FAQ */}
        {activeTab === 'faq' && (
          <div className="max-w-3xl space-y-4">
            {campaign.faqs.map((faq, idx) => (
              <div key={idx} className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-700 shrink-0" />
                  <span>{faq.question}</span>
                </h4>
                <p className="text-xs text-slate-600 pl-6 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 6: RISKS & CHALLENGES */}
        {activeTab === 'risks' && (
          <div className="max-w-3xl space-y-4">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Transparent Risks & Contingency Plan</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {campaign.story.risks}
              </p>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 mt-2">
                <strong>Platform Safeguard:</strong> The founder only receives 60% of funds upon campaign success for production. The final 40% remains locked in escrow until proof of shipped rewards is verified by platform administrators.
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Payment Gateway Modal */}
      {selectedReward && (
        <PaymentGatewayModal
          campaign={campaign}
          selectedReward={selectedReward}
          onClose={() => setSelectedReward(null)}
          onSuccess={(orderId) => {
            setSelectedReward(null);
            navigate('/backer-dashboard');
          }}
        />
      )}

      {/* Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-sm font-bold text-slate-900">
                Report Campaign to Compliance Officer
              </h3>
              <button onClick={() => setReportModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleReportSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Reason</label>
                <select
                  value={reportReason}
                  onChange={e => setReportReason(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option>Misleading product claims</option>
                  <option>Suspected illegal promise of financial return / shares</option>
                  <option>Unresponsive founder</option>
                  <option>Copyright or patent infringement</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Details</label>
                <textarea
                  rows={3}
                  value={reportText}
                  onChange={e => setReportText(e.target.value)}
                  placeholder="Describe your concern for the Grievance Officer..."
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReportModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-100 rounded-lg text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-rose-700 text-white rounded-lg font-bold"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
