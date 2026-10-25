import React from 'react';
import { Campaign } from '../types';
import { formatINR, formatINRLakh } from '../utils/formatters';
import { CommunityValidatedBadge } from './CommunityValidatedBadge';
import {
  X,
  Check,
  CheckCircle2,
  Clock,
  Users,
  MapPin,
  Award,
  ArrowRight,
  ShieldCheck,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface CompareModalProps {
  campaigns: Campaign[];
  onClose: () => void;
  onRemoveCampaign: (id: string) => void;
  onSelectCampaign: (id: string) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  campaigns,
  onClose,
  onRemoveCampaign,
  onSelectCampaign
}) => {
  if (campaigns.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-6 flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="bg-indigo-950 text-white p-5 sm:px-8 sm:py-5 flex items-center justify-between border-b border-indigo-900 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-900 border border-indigo-700 flex items-center justify-center text-amber-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold tracking-tight">
                  Compare Innovations ({campaigns.length}/3)
                </h2>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-400/30">
                  Side-by-Side Analysis
                </span>
              </div>
              <p className="text-xs text-indigo-200 mt-0.5">
                Evaluate Merit Scores, funding velocity, reward tiers, and grassroots validation.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1.5 rounded-lg bg-indigo-900/60 hover:bg-indigo-900 transition-colors"
            aria-label="Close Comparison"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-6 flex-1">
          
          {/* Grid Layout depending on count (2 or 3 columns) */}
          <div className={`grid grid-cols-1 md:grid-cols-${campaigns.length} gap-4 sm:gap-6`}>
            {campaigns.map(camp => {
              const percentFunded = Math.round((camp.raisedAmount / camp.goalAmount) * 100);
              const lowestPriceTier = camp.rewardTiers.length > 0
                ? Math.min(...camp.rewardTiers.map(t => t.price))
                : 0;
              const highestPriceTier = camp.rewardTiers.length > 0
                ? Math.max(...camp.rewardTiers.map(t => t.price))
                : 0;

              return (
                <div
                  key={camp.id}
                  className="bg-slate-50/70 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between space-y-5"
                >
                  {/* Top Campaign Header Card */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-900 bg-indigo-100/70 px-2 py-0.5 rounded">
                        {camp.category}
                      </span>
                      <button
                        onClick={() => onRemoveCampaign(camp.id)}
                        className="text-slate-400 hover:text-rose-600 text-xs font-semibold flex items-center gap-1"
                        title="Remove from comparison"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>

                    <h3 className="font-bold text-slate-950 text-base leading-snug line-clamp-2">
                      {camp.title}
                    </h3>
                    
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {camp.tagline}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{camp.city}, {camp.state}</span>
                    </div>

                    <div className="pt-1">
                      {camp.communityValidated ? (
                        <CommunityValidatedBadge size="sm" />
                      ) : (
                        <span className="text-[11px] text-slate-500 font-medium">
                          In Community Validation
                        </span>
                      )}
                    </div>
                  </div>

                  {/* SECTION 1: MERIT SCORE BREAKDOWN */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-indigo-700" />
                        <span>Merit Score</span>
                      </span>
                      <div className="flex items-baseline gap-1 font-mono">
                        <span className="text-xl font-black text-amber-600">
                          {camp.meritScore.totalScore}
                        </span>
                        <span className="text-[10px] text-slate-400">/100</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Public Backing (30):</span>
                        <span className="font-bold text-slate-900">{camp.meritScore.publicBacking}/30</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Real Customers (20):</span>
                        <span className="font-bold text-slate-900">{camp.meritScore.realCustomers}/20</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Delivery Record (20):</span>
                        <span className="font-bold text-slate-900">{camp.meritScore.deliveryRecord}/20</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Working Product (15):</span>
                        <span className="font-bold text-slate-900">{camp.meritScore.workingProduct}/15</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Founder Commitment (10):</span>
                        <span className="font-bold text-slate-900">{camp.meritScore.founderCommitment}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Community Votes (5):</span>
                        <span className="font-bold text-slate-900">{camp.meritScore.communityVotes}/5</span>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: FUNDING PROGRESS & VELOCITY */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5 text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Funding Metrics
                    </span>

                    <div className="flex justify-between items-baseline">
                      <span className="text-slate-600">Pre-Purchased:</span>
                      <span className="font-bold text-slate-950 font-mono text-sm">
                        {formatINR(camp.raisedAmount)}
                      </span>
                    </div>

                    <div className="flex justify-between items-baseline">
                      <span className="text-slate-600">Target Goal:</span>
                      <span className="font-medium text-slate-700 font-mono">
                        {formatINR(camp.goalAmount)}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold mb-1">
                        <span className="text-indigo-950">{percentFunded}% funded</span>
                        <span className="text-slate-500">{camp.daysLeft} days left</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            percentFunded >= 100 ? 'bg-emerald-600' : 'bg-indigo-600'
                          }`}
                          style={{ width: `${Math.min(percentFunded, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between text-[11px] pt-1">
                      <span className="text-slate-500">Citizen Backers:</span>
                      <span className="font-bold text-slate-900">{camp.backersCount}</span>
                    </div>
                  </div>

                  {/* SECTION 3: REWARD TIERS & DELIVERY */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Perks & Timeline
                    </span>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Price Range:</span>
                      <span className="font-bold text-slate-900 font-mono">
                        {formatINR(lowestPriceTier)} – {formatINR(highestPriceTier)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Available Tiers:</span>
                      <span className="font-semibold text-slate-800">{camp.rewardTiers.length} tiers</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Est. First Delivery:</span>
                      <span className="font-semibold text-emerald-800">
                        {camp.rewardTiers[0]?.estimatedDeliveryMonth || 'Upcoming'}
                      </span>
                    </div>
                  </div>

                  {/* SECTION 4: FOUNDER & EXECUTION */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Founder Track Record
                    </span>
                    <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                      <span>{camp.founder.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-700" />
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      {camp.founder.deliveryTrackRecord}
                    </p>
                    <div className="text-[10px] text-slate-500 pt-1">
                      Entity: {camp.founder.entityType} · DigiLocker KYC Verified
                    </div>
                  </div>

                  {/* Bottom Action Button */}
                  <button
                    onClick={() => {
                      onClose();
                      onSelectCampaign(camp.id);
                    }}
                    className="w-full py-2.5 bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View Campaign & Back</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                </div>
              );
            })}
          </div>

          {/* Statutory Escrow Protection Reminder */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">100% All-or-Nothing Escrow Protection on All Campaigns:</span>
              <p className="mt-0.5 text-emerald-900 leading-relaxed text-[11px]">
                Whichever project you choose to back, your funds remain securely in bank escrow until the campaign reaches 100% of its goal. If any campaign ends under goal, 100% of your pledge is automatically refunded.
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            Comparing {campaigns.length} of 3 maximum innovations
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl transition-colors"
          >
            Close Comparison
          </button>
        </div>

      </div>
    </div>
  );
};
