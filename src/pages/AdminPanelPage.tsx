import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatINR, formatINRLakh } from '../utils/formatters';
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Clock,
  DollarSign,
  Users,
  FileText,
  Lock,
  PauseCircle,
  PlayCircle,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface AdminPanelPageProps {
  onSelectCampaign: (id: string) => void;
}

export const AdminPanelPage: React.FC<AdminPanelPageProps> = ({ onSelectCampaign }) => {
  const {
    campaigns,
    orders,
    investors,
    complaints,
    adminApproveCampaign,
    adminRejectCampaign,
    adminApproveInvestor,
    adminReleasePayout,
    adminProcessRefunds,
    adminSimulateDeadline,
    resolveComplaint,
    freezeCampaign,
    resetDemoData,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'queue' | 'payouts' | 'complaints' | 'simulator' | 'investors'>('queue');
  
  // Simulator State
  const [simulatorCampaignId, setSimulatorCampaignId] = useState<string>(campaigns[0]?.id || '');
  const [rejectReason, setRejectReason] = useState('Prohibited financial yield language detected.');
  const [resolutionComment, setResolutionComment] = useState('Reviewed by Grievance Officer. Replacement confirmed.');

  // Pending items counts
  const pendingCampaigns = campaigns.filter(c => c.status === 'pending_review');
  const pendingInvestors = investors.filter(i => !i.verified);
  const openComplaints = complaints.filter(c => c.status !== 'Resolved');
  const eligiblePayouts = campaigns.filter(c => c.status === 'funded');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-500" />
            <h1 className="text-xl font-bold tracking-tight">Platform Admin & Escrow Governance</h1>
            <span className="text-[10px] bg-rose-500/20 text-rose-300 font-bold px-2 py-0.5 rounded border border-rose-500/30">
              Root Authority
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Audit campaigns for SEBI non-equity compliance, release 60/40 staged escrow, and simulate deadlines.
          </p>
        </div>

        <button
          onClick={resetDemoData}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-rose-300 hover:text-white bg-rose-950/80 hover:bg-rose-900 rounded-xl border border-rose-700/60 transition-colors shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Demo Data</span>
        </button>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
          <span className="text-slate-500 uppercase font-semibold text-[10px] block">
            Campaigns in Review Queue
          </span>
          <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">
            {pendingCampaigns.length}
          </span>
          <span className="text-amber-700 font-medium text-[11px]">
            Requires compliance audit
          </span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
          <span className="text-slate-500 uppercase font-semibold text-[10px] block">
            Pending Escrow Payouts
          </span>
          <span className="text-2xl font-black text-indigo-950 font-mono mt-1 block">
            {eligiblePayouts.length}
          </span>
          <span className="text-indigo-700 font-medium text-[11px]">
            60% initial / 40% delivery
          </span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
          <span className="text-slate-500 uppercase font-semibold text-[10px] block">
            Open Grievances
          </span>
          <span className="text-2xl font-black text-rose-700 font-mono mt-1 block">
            {openComplaints.length}
          </span>
          <span className="text-slate-500 text-[11px]">
            Statutory 24-hr resolution
          </span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
          <span className="text-slate-500 uppercase font-semibold text-[10px] block">
            Investor Approvals
          </span>
          <span className="text-2xl font-black text-emerald-700 font-mono mt-1 block">
            {pendingInvestors.length}
          </span>
          <span className="text-slate-500 text-[11px]">
            SEBI Reg / Net-worth check
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        {[
          { id: 'queue', label: `Campaign Reviews (${pendingCampaigns.length})` },
          { id: 'payouts', label: 'Escrow 60/40 Payouts' },
          { id: 'complaints', label: `Grievances (${openComplaints.length})` },
          { id: 'investors', label: `Investor Verification (${pendingInvestors.length})` },
          { id: 'simulator', label: '⚡ Live Deadline & Refund Simulator' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-2.5 px-4 font-bold text-xs uppercase tracking-wider border-b-2 -mb-px transition-colors ${
              activeTab === tab.id
                ? 'border-indigo-900 text-indigo-950'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: CAMPAIGN REVIEWS QUEUE */}
      {activeTab === 'queue' && (
        <div className="space-y-4">
          {pendingCampaigns.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-sm text-slate-900">Campaign Review Queue is Empty</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                All submitted grassroots innovations have been reviewed. New campaigns created in the wizard appear here for audit.
              </p>
            </div>
          ) : (
            pendingCampaigns.map(camp => (
              <div
                key={camp.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded uppercase">
                      Pending Audit
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1">{camp.title}</h3>
                    <p className="text-xs text-slate-500">
                      Founder: {camp.founder.name} ({camp.city}, {camp.state}) · Target: {formatINR(camp.goalAmount)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => adminApproveCampaign(camp.id)}
                      className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg flex items-center gap-1 shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve & Publish Live</span>
                    </button>

                    <button
                      onClick={() => adminRejectCampaign(camp.id, rejectReason)}
                      className="px-3.5 py-1.5 bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs rounded-lg flex items-center gap-1 shadow-xs"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>

                {/* Audit Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-lg border">
                    <span className="text-slate-500 block text-[10px] font-bold uppercase">KYC Status</span>
                    <span className="font-bold text-emerald-800">
                      {camp.founder.kycVerified ? 'DigiLocker Verified ✓' : 'Self-declared'}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border">
                    <span className="text-slate-500 block text-[10px] font-bold uppercase">Bank Penny-Drop</span>
                    <span className="font-bold text-emerald-800">
                      {camp.founder.bankVerified ? 'Escrow Penny-Drop Verified ✓' : 'Pending'}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border">
                    <span className="text-slate-500 block text-[10px] font-bold uppercase">Reward Perks Count</span>
                    <span className="font-bold text-slate-900">{camp.rewardTiers.length} tiers defined</span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border leading-relaxed">
                  <strong>Story Synopsis:</strong> {camp.story.problem}
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: ESCROW 60/40 PAYOUTS */}
      {activeTab === 'payouts' && (
        <div className="space-y-4">
          {eligiblePayouts.map(camp => {
            const total = camp.raisedAmount;
            const net = total * 0.9092; // roughly after 6% + 18% GST + 2% gateway
            const stage1 = net * 0.60;
            const stage2 = net * 0.40;

            return (
              <div
                key={camp.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded uppercase">
                      Funded (100% Target Met)
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1">{camp.title}</h3>
                    <p className="text-xs text-slate-500">
                      Founder: {camp.founder.name} · Gross: {formatINR(total)} · Net Payable: {formatINR(net)}
                    </p>
                  </div>
                  <button
                    onClick={() => onSelectCampaign(camp.id)}
                    className="text-xs font-semibold text-indigo-700 hover:text-indigo-900"
                  >
                    View Campaign Page →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Stage 1 Action */}
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900">Stage 1 Disbursement (60%)</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        camp.payoutStatus.firstStageReleased ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {camp.payoutStatus.firstStageReleased ? 'Disbursed ✓' : 'Pending Approval'}
                      </span>
                    </div>
                    <span className="text-lg font-black font-mono text-slate-900 block">
                      {formatINR(stage1)}
                    </span>
                    <p className="text-[11px] text-slate-600">
                      Transferred to commence raw material fabrication and tooling.
                    </p>
                    {!camp.payoutStatus.firstStageReleased && (
                      <button
                        onClick={() => adminReleasePayout(camp.id, 'first')}
                        className="w-full mt-2 py-2 bg-indigo-900 text-white font-bold rounded-lg text-xs"
                      >
                        Release 60% Payout ({formatINR(stage1)})
                      </button>
                    )}
                  </div>

                  {/* Stage 2 Action */}
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900">Stage 2 Final Escrow (40%)</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        camp.payoutStatus.secondStageReleased ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {camp.payoutStatus.secondStageReleased ? 'Disbursed ✓' : 'Locked in Escrow'}
                      </span>
                    </div>
                    <span className="text-lg font-black font-mono text-slate-900 block">
                      {formatINR(stage2)}
                    </span>
                    <p className="text-[11px] text-slate-600">
                      Requires proof of reward courier consignments and zero blocking grievances.
                    </p>
                    {!camp.payoutStatus.secondStageReleased && (
                      <button
                        onClick={() => adminReleasePayout(camp.id, 'second')}
                        className="w-full mt-2 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-xs"
                      >
                        Approve Proofs & Release 40% ({formatINR(stage2)})
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: GRIEVANCES & COMPLAINTS */}
      {activeTab === 'complaints' && (
        <div className="space-y-4">
          {complaints.map(comp => (
            <div key={comp.id} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs text-xs space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono font-bold text-slate-400 block text-[10px]">REF: {comp.id}</span>
                  <h4 className="text-sm font-bold text-slate-900">{comp.campaignTitle}</h4>
                  <p className="text-slate-500">
                    Complainant: {comp.backerName} · Founder: {comp.founderName} · Issue: <strong>{comp.reason}</strong>
                  </p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  comp.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {comp.status}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border text-slate-800">
                "{comp.description}"
              </div>

              {comp.status !== 'Resolved' && (
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t">
                  <input
                    type="text"
                    value={resolutionComment}
                    onChange={e => setResolutionComment(e.target.value)}
                    placeholder="Enter official resolution notes..."
                    className="flex-1 p-2 border rounded-lg text-xs"
                  />
                  <button
                    onClick={() => resolveComplaint(comp.id, resolutionComment)}
                    className="px-3.5 py-2 bg-indigo-900 text-white font-bold rounded-lg"
                  >
                    Mark Resolved
                  </button>
                  <button
                    onClick={() => freezeCampaign(comp.campaignId)}
                    className="px-3 py-2 bg-rose-50 text-rose-700 font-bold rounded-lg border border-rose-200"
                  >
                    Freeze Campaign
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: INVESTOR VERIFICATION */}
      {activeTab === 'investors' && (
        <div className="space-y-4">
          {investors.map(inv => (
            <div key={inv.id} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs text-xs flex justify-between items-center">
              <div>
                <span className="font-bold text-sm text-slate-900 block">{inv.firmName}</span>
                <span className="text-slate-500">
                  Principal: {inv.name} ({inv.city}) · Type: {inv.type} · Ticket: {inv.ticketSize}
                </span>
              </div>

              <div>
                {inv.verified ? (
                  <span className="text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg font-bold">
                    Accreditation Approved ✓
                  </span>
                ) : (
                  <button
                    onClick={() => adminApproveInvestor(inv.id)}
                    className="px-4 py-2 bg-indigo-900 text-white font-bold rounded-lg"
                  >
                    Approve Accreditation
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: DEADLINE & REFUND SIMULATOR (CORE DEMO TOOL) */}
      {activeTab === 'simulator' && (
        <div className="max-w-2xl bg-white rounded-2xl border-2 border-indigo-200 p-6 shadow-md space-y-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Simulate Campaign Deadline (Live Demo Control)</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Select any campaign and end it now to demonstrate either the <strong>Success path (60% payout + Deal Room)</strong> or the <strong>Refund path (100% money returned to backers)</strong>.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Select Target Campaign</label>
              <select
                value={simulatorCampaignId}
                onChange={e => setSimulatorCampaignId(e.target.value)}
                className="w-full p-2.5 rounded-lg border font-semibold text-slate-900"
              >
                {campaigns.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({c.city}) - Currently: {c.status}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              {/* Option A: Simulate Success */}
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-3">
                <div className="flex items-center gap-1.5 font-bold text-emerald-950">
                  <PlayCircle className="w-4 h-4 text-emerald-700" />
                  <span>Demonstrate SUCCESS Path</span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-snug">
                  Instantly hits 100% goal, awards "Community Validated" badge, unlocks Stage 1 (60%) payout, and lists in the Investor Deal Room.
                </p>
                <button
                  onClick={() => adminSimulateDeadline(simulatorCampaignId, 'success')}
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg transition-colors shadow-2xs"
                >
                  Trigger Goal Success Now
                </button>
              </div>

              {/* Option B: Simulate Failure & Refunds */}
              <div className="p-4 bg-rose-50 rounded-xl border border-rose-200 space-y-3">
                <div className="flex items-center gap-1.5 font-bold text-rose-950">
                  <RotateCcw className="w-4 h-4 text-rose-700" />
                  <span>Demonstrate REFUND Path</span>
                </div>
                <p className="text-[11px] text-rose-800 leading-snug">
                  Ends campaign under goal. Allows clicking "Process Refunds" to return 100% of money to all backers automatically.
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => adminSimulateDeadline(simulatorCampaignId, 'failed')}
                    className="w-full py-2 bg-rose-100 hover:bg-rose-200 text-rose-900 font-bold rounded-lg border border-rose-300"
                  >
                    End Under Goal
                  </button>
                  <button
                    onClick={() => adminProcessRefunds(simulatorCampaignId)}
                    className="w-full py-2 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-lg shadow-2xs"
                  >
                    Process All Escrow Refunds
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
