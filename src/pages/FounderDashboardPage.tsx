import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatINR, formatINRLakh } from '../utils/formatters';
import { MeritScoreGauge } from '../components/MeritScoreGauge';
import {
  TrendingUp,
  Users,
  DollarSign,
  Package,
  Truck,
  CheckCircle2,
  FileText,
  Send,
  Upload,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Printer
} from 'lucide-react';

export const FounderDashboardPage: React.FC = () => {
  const {
    campaigns,
    orders,
    postCampaignUpdate,
    updateOrderShipping,
    showToast
  } = useApp();

  // Founder persona: Ravi Kumar (Warangal) managing camp-1 (SuryaDry)
  const campaign = campaigns.find(c => c.id === 'camp-1') || campaigns[0];
  const campaignOrders = orders.filter(o => o.campaignId === campaign.id);

  const [activeTab, setActiveTab] = useState<'overview' | 'updates' | 'fulfillment' | 'payouts'>('overview');

  // Post Update Form
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateContent, setUpdateContent] = useState('');

  // Shipping Tracking Form
  const [trackingNumber, setTrackingNumber] = useState('SPEEDPOST-TS-89410');
  const [courierName, setCourierName] = useState('India Speed Post');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  // Financial Payout Calculations
  const totalRaised = campaign.raisedAmount;
  const platformFee = totalRaised * 0.06; // 6%
  const gstOnFee = platformFee * 0.18;   // 18% GST
  const gatewayFee = totalRaised * 0.02;  // 2% gateway
  const totalDeductions = platformFee + gstOnFee + gatewayFee;
  const netPayable = totalRaised - totalDeductions;
  
  const stageOneAmount = netPayable * 0.60; // 60%
  const stageTwoAmount = netPayable * 0.40; // 40%

  const handlePostUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateTitle.trim() || !updateContent.trim()) return;
    postCampaignUpdate(campaign.id, updateTitle, updateContent);
    setUpdateTitle('');
    setUpdateContent('');
  };

  const handleMarkShipped = (orderId: string) => {
    updateOrderShipping(orderId, 'shipped', trackingNumber, courierName);
  };

  const handleBulkMarkShipped = () => {
    campaignOrders.forEach(o => {
      if (o.status !== 'shipped' && o.status !== 'delivered' && o.status !== 'refunded') {
        updateOrderShipping(o.id, 'shipped', trackingNumber, courierName);
      }
    });
    showToast('All pending rewards marked as Shipped!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
            Founder Control Hub · Warangal, Telangana
          </span>
          <h1 className="text-2xl font-black text-slate-950 mt-1">
            {campaign.title}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Founder: Ravi Kumar · Private Limited · DigiLocker KYC Verified
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('updates')}
            className="px-3.5 py-2 text-xs font-bold text-white bg-indigo-900 hover:bg-indigo-800 rounded-xl transition-colors shadow-xs"
          >
            + Post Backer Update
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        {[
          { id: 'overview', label: 'Traction & Analytics' },
          { id: 'updates', label: 'Broadcast Updates' },
          { id: 'fulfillment', label: `Reward Fulfillment (${campaignOrders.length})` },
          { id: 'payouts', label: 'Staged 60/40 Escrow Payouts' }
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

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Total Pre-Purchased
              </span>
              <span className="text-2xl font-black text-slate-950 font-mono mt-1 block">
                {formatINR(campaign.raisedAmount)}
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold">
                {Math.round((campaign.raisedAmount / campaign.goalAmount) * 100)}% of {formatINR(campaign.goalAmount)}
              </span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Citizen Backers
              </span>
              <span className="text-2xl font-black text-indigo-950 font-mono mt-1 block">
                {campaign.backersCount}
              </span>
              <span className="text-[11px] text-slate-500">
                142 verified shipping addresses
              </span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Merit Score
              </span>
              <span className="text-2xl font-black text-amber-600 font-mono mt-1 block">
                {campaign.meritScore.totalScore}/100
              </span>
              <span className="text-[11px] text-emerald-800 font-semibold">
                Community Validated Badge Active
              </span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Campaign Status
              </span>
              <span className="text-xl font-black text-emerald-700 uppercase mt-1 block">
                {campaign.status}
              </span>
              <span className="text-[11px] text-slate-500">
                Stage 1 Escrow (60%) Unlocked
              </span>
            </div>
          </div>

          {/* SVG Funds Raised Growth Chart */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Pre-Order Funding Velocity (Over 18 Days)
                </h3>
                <p className="text-xs text-slate-500">
                  Daily cumulative escrow commitments in Indian Rupees (INR)
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Goal Exceeded on Day 18
              </span>
            </div>

            {/* Simulated Line Chart using clean responsive SVG */}
            <div className="h-56 w-full pt-4">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 600 160">
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3730A3" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#3730A3" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Horizontal reference lines */}
                <line x1="0" y1="20" x2="600" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="60" x2="600" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="100" x2="600" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="140" x2="600" y2="140" stroke="#f1f5f9" strokeWidth="1" />
                
                {/* Target line (₹12 Lakh) at y=40 */}
                <line x1="0" y1="45" x2="600" y2="45" stroke="#F59E0B" strokeDasharray="4 4" strokeWidth="1.5" />
                <text x="5" y="40" fill="#D97706" fontSize="9" fontWeight="bold">Target Goal: ₹12,00,000</text>

                {/* Growth Curve */}
                <path
                  d="M 0 145 Q 60 140 120 125 T 240 100 T 360 65 T 480 35 T 600 20 L 600 155 L 0 155 Z"
                  fill="url(#areaGrad)"
                />
                <path
                  d="M 0 145 Q 60 140 120 125 T 240 100 T 360 65 T 480 35 T 600 20"
                  fill="none"
                  stroke="#3730A3"
                  strokeWidth="3"
                />

                {/* Milestones points */}
                <circle cx="120" cy="125" r="4" fill="#3730A3" />
                <circle cx="360" cy="65" r="4" fill="#3730A3" />
                <circle cx="480" cy="35" r="5" fill="#10B981" />
                <circle cx="600" cy="20" r="5" fill="#F59E0B" />
              </svg>
            </div>

            <div className="flex justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2 font-mono">
              <span>Day 1: ₹50K</span>
              <span>Day 5: ₹2.8L</span>
              <span>Day 10: ₹6.4L</span>
              <span>Day 15: ₹10.2L</span>
              <span className="font-bold text-slate-900">Today: ₹14.85L (123%)</span>
            </div>
          </div>

          {/* Traffic Sources & Merit Breakdown Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Traffic Sources */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">
                Backer Acquisition Channels (Simulated)
              </h3>
              <p className="text-xs text-slate-500">
                Demonstrating deep grassroots sharing over Indian messaging apps
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-800">WhatsApp Groups & Direct Chat</span>
                    <span className="font-bold text-slate-900">62% (88 backers)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: '62%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-800">Regional Instagram & YouTube Demos</span>
                    <span className="font-bold text-slate-900">24% (34 backers)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: '24%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-800">Direct / Bharateeyan Platform Explore</span>
                    <span className="font-bold text-slate-900">14% (20 backers)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '14%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Merit Score Card */}
            <div className="lg:col-span-6">
              <MeritScoreGauge
                score={campaign.meritScore}
                campaignTitle={campaign.title}
                founderName={campaign.founder.name}
                city={campaign.city}
              />
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: BROADCAST UPDATES */}
      {activeTab === 'updates' && (
        <div className="max-w-2xl space-y-6">
          <form onSubmit={handlePostUpdate} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Broadcast Production Progress to 142 Backers
            </h3>
            <p className="text-xs text-slate-500">
              Backers receive an automatic SMS & email notification. Regular updates improve your Merit Score by +2 points.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Update Headline</label>
                <input
                  type="text"
                  value={updateTitle}
                  onChange={e => setUpdateTitle(e.target.value)}
                  placeholder="e.g. Sourcing laser-cut aluminum panels from Hyderabad"
                  className="w-full p-2.5 rounded-lg border border-slate-200"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Update Story & Milestone</label>
                <textarea
                  rows={4}
                  value={updateContent}
                  onChange={e => setUpdateContent(e.target.value)}
                  placeholder="Explain what was accomplished this week, attach photo links, and confirm next dispatch milestone..."
                  className="w-full p-2.5 rounded-lg border border-slate-200"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish to Backers</span>
                </button>
              </div>
            </div>
          </form>

          {/* Past Updates */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Published Updates</h4>
            {campaign.updates.map(u => (
              <div key={u.id} className="p-4 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{u.title}</span>
                  <span className="text-[11px] text-slate-400">{u.date}</span>
                </div>
                <p className="text-slate-600">{u.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: REWARD FULFILLMENT */}
      {activeTab === 'fulfillment' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Reward Delivery Tracker & Proofs
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Upload shipping consignments to unlock the final 40% escrow balance.
              </p>
            </div>

            <button
              onClick={handleBulkMarkShipped}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
            >
              Bulk Mark All as Dispatched
            </button>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Backer & City</th>
                    <th className="py-3 px-4">Pre-Order Perk</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {campaignOrders.map(order => (
                    <tr key={order.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono font-bold text-indigo-950">
                        {order.id}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-900 block">{order.backerName}</span>
                        <span className="text-[11px] text-slate-500">{order.shippingAddress.city}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        {order.rewardTitle}
                      </td>
                      <td className="py-3 px-4 font-bold font-mono">
                        {formatINR(order.totalPaid)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          order.status === 'shipped' || order.status === 'delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        {order.status !== 'shipped' && order.status !== 'delivered' && (
                          <button
                            onClick={() => handleMarkShipped(order.id)}
                            className="px-2.5 py-1 text-[11px] font-bold text-indigo-900 bg-indigo-50 hover:bg-indigo-100 rounded border border-indigo-200"
                          >
                            Mark Shipped
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: STAGED 60/40 ESCROW PAYOUTS */}
      {activeTab === 'payouts' && (
        <div className="max-w-4xl space-y-8">
          
          {/* Financial Breakdown Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Escrow Settlement & Statutory Deductions
                </h3>
                <p className="text-xs text-slate-500">
                  Operated via ICICI Escrow Trustee partner under Indian contractual pre-order norms
                </p>
              </div>
              <button
                onClick={() => setShowInvoiceModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 rounded-lg border border-slate-200"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Download Invoice</span>
              </button>
            </div>

            {/* Calculations Table */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">Gross Pre-Orders Raised</span>
                <span className="font-bold text-slate-900 font-mono">{formatINR(totalRaised)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 text-rose-700">
                <span>Platform Facilitation Fee (6%)</span>
                <span className="font-mono">- {formatINR(platformFee)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 text-rose-700">
                <span>GST on Platform Fee (18% of fee)</span>
                <span className="font-mono">- {formatINR(gstOnFee)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 text-rose-700">
                <span>Payment Gateway & Escrow Charges (2%)</span>
                <span className="font-mono">- {formatINR(gatewayFee)}</span>
              </div>
              <div className="flex justify-between py-2 border-t-2 border-slate-900 font-bold text-sm text-indigo-950">
                <span>Net Founder Payable</span>
                <span className="font-mono text-base">{formatINR(netPayable)}</span>
              </div>
            </div>

            {/* Staged 60/40 Split Status */}
            <div className="pt-4 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Staged Escrow Disbursement Schedule
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Stage 1: 60% */}
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-emerald-900">
                      Stage 1 (60% on Goal Met)
                    </span>
                    <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded">
                      Disbursed
                    </span>
                  </div>
                  <span className="text-xl font-black text-slate-900 font-mono block">
                    {formatINR(stageOneAmount)}
                  </span>
                  <p className="text-[11px] text-emerald-800 leading-snug">
                    Released to verified bank account (SBI Narsampet) to commence raw material bulk purchases.
                  </p>
                </div>

                {/* Stage 2: 40% */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-slate-800">
                      Stage 2 (40% on Shipping Proof)
                    </span>
                    <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">
                      Locked in Escrow
                    </span>
                  </div>
                  <span className="text-xl font-black text-slate-900 font-mono block">
                    {formatINR(stageTwoAmount)}
                  </span>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Will be released once consignment proofs for 80% of backer orders are verified by platform admin.
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      )}

      {/* Printable Invoice Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl border border-slate-300 space-y-6 print:m-0">
            <div className="flex justify-between items-start border-b pb-4">
              <div>
                <h3 className="font-black text-lg text-indigo-950">BHARATEEYAN TECHNOLOGIES</h3>
                <p className="text-[11px] text-slate-500">GSTIN: 36AABCU9812K1Z9 · Escrow Statement</p>
              </div>
              <button onClick={() => setShowInvoiceModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <div className="text-xs space-y-1">
              <div className="flex justify-between font-mono">
                <span>Invoice Ref: INV-BHT-2026-081</span>
                <span>Date: 25 Oct 2026</span>
              </div>
              <div className="font-medium text-slate-800">
                Billed To: Ravi Kumar (SuryaDry Pvt Ltd), Warangal, Telangana
              </div>
            </div>

            <div className="border-t border-b py-3 text-xs space-y-2">
              <div className="flex justify-between">
                <span>Gross Backer Pledges</span>
                <span className="font-mono">{formatINR(totalRaised)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Platform Commission (6%)</span>
                <span className="font-mono">{formatINR(platformFee)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Integrated GST (18%)</span>
                <span className="font-mono">{formatINR(gstOnFee)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Escrow Gateway Charge (2%)</span>
                <span className="font-mono">{formatINR(gatewayFee)}</span>
              </div>
              <div className="flex justify-between font-bold text-sm pt-2 border-t">
                <span>Net Transferable</span>
                <span className="font-mono">{formatINR(netPayable)}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-indigo-900 text-white font-bold text-xs rounded-lg"
              >
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
