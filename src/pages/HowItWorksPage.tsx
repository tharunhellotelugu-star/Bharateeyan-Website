import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  Sparkles,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  Lock,
  RotateCcw,
  Truck,
  ArrowRight
} from 'lucide-react';

interface HowItWorksPageProps {
  navigate: (path: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState<'flow' | 'backers' | 'founders' | 'investors'>('flow');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
          The Grassroots Operating Blueprint
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
          How Bharateeyan Works
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          A rewards-based pre-order crowdfunding platform for Indian startup founders without elite college pedigree. Simple, verified, and 100% escrow-backed.
        </p>
      </div>

      {/* Role Navigation Buttons */}
      <div className="flex items-center justify-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'flow', label: 'Illustrated Lifecycle Flow' },
          { id: 'backers', label: 'For Citizen Backers' },
          { id: 'founders', label: 'For Grassroots Founders' },
          { id: 'investors', label: 'For Accredited Angels' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: ILLUSTRATED LIFECYCLE FLOW */}
      {activeTab === 'flow' && (
        <div className="space-y-8">
          
          {/* Main Visual Flow Banner */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 space-y-8">
            <h3 className="text-lg font-bold text-center text-amber-400">
              The 6-Stage Trust Cycle
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 text-xs">
              
              <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 space-y-2">
                <span className="text-indigo-400 font-mono font-bold block text-sm">01</span>
                <span className="font-bold text-white block">Founder Lists</span>
                <p className="text-slate-400 text-[11px] leading-snug">
                  Grassroots maker posts working prototype, specs, and reward tiers.
                </p>
              </div>

              <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 space-y-2">
                <span className="text-indigo-400 font-mono font-bold block text-sm">02</span>
                <span className="font-bold text-white block">Audit & KYC</span>
                <p className="text-slate-400 text-[11px] leading-snug">
                  DigiLocker Aadhaar, PAN, and SEBI non-equity filter validation.
                </p>
              </div>

              <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 space-y-2">
                <span className="text-indigo-400 font-mono font-bold block text-sm">03</span>
                <span className="font-bold text-white block">Pre-Orders Live</span>
                <p className="text-slate-400 text-[11px] leading-snug">
                  Citizens pre-buy perks over 30-45 days. Money held in bank escrow.
                </p>
              </div>

              <div className="p-4 bg-indigo-950/80 rounded-xl border border-indigo-600 space-y-2">
                <span className="text-amber-400 font-mono font-bold block text-sm">04 (Fork)</span>
                <span className="font-bold text-white block">Goal Decision</span>
                <p className="text-slate-300 text-[11px] leading-snug">
                  <strong>NO:</strong> 100% backer refund.<br />
                  <strong>YES:</strong> 60% released to build.
                </p>
              </div>

              <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 space-y-2">
                <span className="text-indigo-400 font-mono font-bold block text-sm">05</span>
                <span className="font-bold text-white block">Build & Ship</span>
                <p className="text-slate-400 text-[11px] leading-snug">
                  Founder ships rewards, uploads courier proofs, 40% released.
                </p>
              </div>

              <div className="p-4 bg-emerald-950/70 rounded-xl border border-emerald-600 space-y-2">
                <span className="text-emerald-400 font-mono font-bold block text-sm">06</span>
                <span className="font-bold text-emerald-200 block">Deal Room</span>
                <p className="text-slate-300 text-[11px] leading-snug">
                  Merit Score ≥70 startups shown to verified SEBI angel funds.
                </p>
              </div>

            </div>
          </div>

          {/* Staged Escrow Deep Dive */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                <Lock className="w-4 h-4 text-indigo-700" />
                <span>Why Staged 60/40 Escrow?</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Traditional crowdfunding platforms release 100% of funds immediately, which frequently leads to delivery delays or abandonment. On Bharateeyan, 60% covers raw materials and tooling, while 40% is held in escrow until courier proof of shipment is verified.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                <RotateCcw className="w-4 h-4 text-emerald-700" />
                <span>All-or-Nothing Refund Assurance</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                If a campaign targets ₹10,00,000 and reaches only ₹9,50,000 by the deadline, it does not receive a single rupee. Every backer is automatically refunded in full to their original UPI or card account.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: FOR BACKERS */}
      {activeTab === 'backers' && (
        <div className="max-w-3xl mx-auto space-y-6 text-xs">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">How to Back with Complete Peace of Mind</h3>
            <div className="space-y-3 text-slate-700 leading-relaxed">
              <p>
                <strong>1. Pre-buy Real Products:</strong> You are not making a speculative financial bet. You are pre-ordering physical units (solar dryers, millet cookies, smart helmets) or backing local makers.
              </p>
              <p>
                <strong>2. Zero Equity or Profit Promises:</strong> You will never receive shares or dividends. This ensures complete legal compliance under Indian law.
              </p>
              <p>
                <strong>3. Escrow Protected:</strong> Your pledge is held in a dedicated banking escrow partner account. If the founder misses their target, you receive an automated 100% refund.
              </p>
              <p>
                <strong>4. Track Delivery & Review:</strong> Get live courier tracking numbers and rate the founder upon receiving your reward.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FOR FOUNDERS */}
      {activeTab === 'founders' && (
        <div className="max-w-3xl mx-auto space-y-6 text-xs">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Raise Capital Without Selling Your Soul</h3>
            <div className="space-y-3 text-slate-700 leading-relaxed">
              <p>
                <strong>1. Proof Beats Pedigree:</strong> You do not need an IIT or IIM degree, Silicon Valley connections, or English presentation polish. You just need a working prototype that solves a real Indian problem.
              </p>
              <p>
                <strong>2. Keep 100% of Your Equity:</strong> Crowdfund production capital without giving away shares or voting control of your company.
              </p>
              <p>
                <strong>3. Merit Score:</strong> Build an objective 100-point score based on backer velocity, fulfillment speed, and customer ratings.
              </p>
              <p>
                <strong>4. Angel Deal Room:</strong> Once your Merit Score crosses 70 and your goal is reached, SEBI-registered angel funds see your traction data.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: FOR INVESTORS */}
      {activeTab === 'investors' && (
        <div className="max-w-3xl mx-auto space-y-6 text-xs">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">The Ultimate Filter for Real Grassroots Traction</h3>
            <div className="space-y-3 text-slate-700 leading-relaxed">
              <p>
                <strong>1. Pre-Validated Demand:</strong> Every startup in the Deal Room has already proven that hundreds of paying customers want their product enough to pay upfront.
              </p>
              <p>
                <strong>2. No Pedigree Bias:</strong> Discover extraordinary mechanical, agricultural, and hardware innovators in tier-2/3 cities outside the Bengaluru-Gurugram bubble.
              </p>
              <p>
                <strong>3. Direct Off-Platform Deals:</strong> Bharateeyan does not syndicate equity or take carry. We connect you directly with founders for compliant private investments under applicable SEBI guidelines.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
