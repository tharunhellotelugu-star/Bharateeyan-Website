import React, { useState } from 'react';
import { MeritScoreBreakdown } from '../types';
import { ShieldCheck, Sparkles, HelpCircle, Award, CheckCircle } from 'lucide-react';
import { AIScoreExplainerModal } from './AIScoreExplainerModal';

interface MeritScoreGaugeProps {
  score: MeritScoreBreakdown;
  campaignTitle?: string;
  founderName?: string;
  city?: string;
  compact?: boolean;
}

export const MeritScoreGauge: React.FC<MeritScoreGaugeProps> = ({
  score,
  campaignTitle = 'Grassroots Innovation',
  founderName = 'Local Maker',
  city = 'Bharat',
  compact = false
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  // SVG Circular Gauge Math
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score.totalScore / 100) * circumference;

  const getScoreColor = (val: number) => {
    if (val >= 80) return 'text-emerald-600 stroke-emerald-600';
    if (val >= 70) return 'text-indigo-600 stroke-indigo-600';
    if (val >= 50) return 'text-amber-500 stroke-amber-500';
    return 'text-rose-500 stroke-rose-500';
  };

  const isValidated = score.totalScore >= 70;

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="relative w-9 h-9 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 88 88">
            <circle
              cx="44"
              cy="44"
              r={radius}
              className="stroke-slate-200"
              strokeWidth="7"
              fill="transparent"
            />
            <circle
              cx="44"
              cy="44"
              r={radius}
              className={`${getScoreColor(score.totalScore)} transition-all duration-700`}
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <span className="absolute text-[11px] font-bold text-slate-800">
            {score.totalScore}
          </span>
        </div>
        <div className="text-[11px] leading-tight">
          <span className="font-semibold text-slate-900 block">Merit Score</span>
          <span className="text-[10px] text-slate-500">
            {isValidated ? 'Validated Level' : 'In Evaluation'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
      
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-indigo-700" />
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Transparent Merit Score
            </h3>
            {isValidated && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                Validated (≥70)
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Objective algorithm based purely on community proof & execution
          </p>
        </div>

        {/* AI Explainer Trigger Button */}
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1.5 rounded-lg border border-indigo-200 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Why this score?</span>
        </button>
      </div>

      {/* Main Gauge + Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
        
        {/* Left: Gauge Circle */}
        <div className="sm:col-span-4 flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl border border-slate-100">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 88 88">
              <circle
                cx="44"
                cy="44"
                r={radius}
                className="stroke-slate-200"
                strokeWidth="7"
                fill="transparent"
              />
              <circle
                cx="44"
                cy="44"
                r={radius}
                className={`${getScoreColor(score.totalScore)} transition-all duration-700`}
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                {score.totalScore}
              </span>
              <span className="text-[10px] font-semibold text-slate-400 block -mt-1">
                /100
              </span>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-slate-700 mt-1">
            {score.totalScore >= 80 ? 'Exceptional Traction' : score.totalScore >= 70 ? 'High Community Proof' : 'Building Proof'}
          </span>
        </div>

        {/* Right: Factor Bars */}
        <div className="sm:col-span-8 space-y-2 text-xs">
          
          {/* Factor 1: Public Backing */}
          <div>
            <div className="flex justify-between text-[11px] mb-0.5">
              <span className="text-slate-700 font-medium">Public Backing (% goal & backer volume)</span>
              <span className="font-bold text-slate-900">{score.publicBacking} / 30</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${(score.publicBacking / 30) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Factor 2: Real Customers */}
          <div>
            <div className="flex justify-between text-[11px] mb-0.5">
              <span className="text-slate-700 font-medium">Real Customers (orders beyond friends & family)</span>
              <span className="font-bold text-slate-900">{score.realCustomers} / 20</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${(score.realCustomers / 20) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Factor 3: Delivery Record */}
          <div>
            <div className="flex justify-between text-[11px] mb-0.5">
              <span className="text-slate-700 font-medium">Delivery Record (past fulfillment & backer ratings)</span>
              <span className="font-bold text-slate-900">{score.deliveryRecord} / 20</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${(score.deliveryRecord / 20) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Factor 4: Working Product */}
          <div>
            <div className="flex justify-between text-[11px] mb-0.5">
              <span className="text-slate-700 font-medium">Working Product (demo video / tested hardware / app)</span>
              <span className="font-bold text-slate-900">{score.workingProduct} / 15</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${(score.workingProduct / 15) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Factor 5: Founder Commitment */}
          <div>
            <div className="flex justify-between text-[11px] mb-0.5">
              <span className="text-slate-700 font-medium">Founder Commitment (full-time / update frequency)</span>
              <span className="font-bold text-slate-900">{score.founderCommitment} / 10</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${(score.founderCommitment / 10) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Factor 6: Community Votes */}
          <div>
            <div className="flex justify-between text-[11px] mb-0.5">
              <span className="text-slate-700 font-medium">Community Votes (verified citizen endorsements)</span>
              <span className="font-bold text-slate-900">{score.communityVotes} / 5</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${(score.communityVotes / 5) * 100}%` }}
              ></div>
            </div>
          </div>

        </div>
      </div>

      {/* Explicit Anti-Pedigree Guarantee Banner */}
      <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
        <span className="font-semibold text-slate-700">Strictly Never Evaluated:</span>
        <span>College degree, elite pedigree, past employer, caste, gender, age, or English fluency.</span>
      </div>

      {/* AI Explainer Modal */}
      {modalOpen && (
        <AIScoreExplainerModal
          score={score}
          campaignTitle={campaignTitle}
          founderName={founderName}
          city={city}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};
