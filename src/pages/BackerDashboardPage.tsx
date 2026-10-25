import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/formatters';
import { PledgeOrder, Complaint } from '../types';
import {
  Package,
  Clock,
  CheckCircle2,
  Truck,
  RotateCcw,
  Star,
  AlertCircle,
  Bell,
  HelpCircle,
  FileText,
  ShieldCheck,
  Send,
  X
} from 'lucide-react';

export const BackerDashboardPage: React.FC = () => {
  const {
    orders,
    notifications,
    complaints,
    submitComplaint,
    rateOrder,
    role,
    setRole,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'notifications' | 'complaints'>('orders');
  
  // Rating Modal State
  const [ratingOrder, setRatingOrder] = useState<PledgeOrder | null>(null);
  const [stars, setStars] = useState(5);
  const [reviewText, setReviewText] = useState('');

  // Complaint Form State
  const [complaintModalOpen, setComplaintModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || '');
  const [complaintReason, setComplaintReason] = useState<Complaint['reason']>('Late Delivery');
  const [complaintDesc, setComplaintDesc] = useState('');

  // Simulated OTP Login for Guest view
  const [loginPhone, setLoginPhone] = useState('9848099112');
  const [loginOtp, setLoginOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSimulateLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      setOtpSent(true);
      showToast('Demo OTP sent: 123456', 'info');
    } else {
      setRole('backer');
      showToast('Logged in as Priya Reddy (Hyderabad)', 'success');
    }
  };

  const handleRateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ratingOrder) return;
    rateOrder(ratingOrder.id, stars, reviewText);
    setRatingOrder(null);
    setReviewText('');
  };

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintDesc.trim()) return;
    submitComplaint(selectedOrderId, complaintReason, complaintDesc);
    setComplaintModalOpen(false);
    setComplaintDesc('');
  };

  // If user is guest, show simulated OTP login screen
  if (role !== 'backer') {
    return (
      <div className="max-w-md mx-auto my-16 px-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xl text-center space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-900 border border-indigo-200 flex items-center justify-center mx-auto">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Access Backer Dashboard</h2>
            <p className="text-xs text-slate-500 mt-1">
              Sign in with mobile number to track pre-orders, escrow status, and delivery.
            </p>
          </div>

          <form onSubmit={handleSimulateLogin} className="space-y-4 text-xs text-left">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Indian Mobile Number
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-200 bg-slate-50 text-slate-500 font-mono">
                  +91
                </span>
                <input
                  type="tel"
                  value={loginPhone}
                  onChange={e => setLoginPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-r-lg border border-slate-200 text-slate-900 focus:outline-indigo-600 font-mono"
                  placeholder="98480 99112"
                  required
                />
              </div>
            </div>

            {otpSent && (
              <div className="space-y-1">
                <div className="flex justify-between">
                  <label className="block font-semibold text-slate-700">Enter OTP</label>
                  <span className="text-emerald-700 font-bold">Demo OTP: 123456</span>
                </div>
                <input
                  type="text"
                  maxLength={6}
                  value={loginOtp}
                  onChange={e => setLoginOtp(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-900 focus:outline-indigo-600 text-center tracking-widest font-mono text-base font-bold"
                  placeholder="123456"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-900 hover:bg-indigo-800 text-white font-bold rounded-xl shadow-xs transition-colors"
            >
              {otpSent ? 'Verify OTP & Continue' : 'Send OTP (Demo: 123456)'}
            </button>

            <div className="relative py-2 text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider bg-white px-2">or</span>
            </div>

            <button
              type="button"
              onClick={() => {
                setRole('backer');
                showToast('Signed in with Google as Priya Reddy', 'success');
              }}
              className="w-full py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <span className="font-bold text-indigo-700">G</span>
              <span>Continue with Google (Simulated)</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Profile Info */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-800 text-white font-black text-lg flex items-center justify-center shadow-inner">
            PR
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-950">Priya Reddy</h1>
              <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-md border border-amber-300">
                Verified Citizen Backer
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Banjara Hills, Hyderabad · Member since Sep 2026
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setComplaintModalOpen(true)}
            className="px-3 py-1.5 text-xs font-semibold text-rose-800 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors"
          >
            File a Grievance
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('orders')}
          className={`py-2.5 px-4 font-bold text-xs uppercase tracking-wider border-b-2 -mb-px transition-colors ${
            activeTab === 'orders'
              ? 'border-indigo-900 text-indigo-950'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          My Backed Projects ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`py-2.5 px-4 font-bold text-xs uppercase tracking-wider border-b-2 -mb-px transition-colors ${
            activeTab === 'notifications'
              ? 'border-indigo-900 text-indigo-950'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Notifications ({notifications.length})
        </button>
        <button
          onClick={() => setActiveTab('complaints')}
          className={`py-2.5 px-4 font-bold text-xs uppercase tracking-wider border-b-2 -mb-px transition-colors ${
            activeTab === 'complaints'
              ? 'border-indigo-900 text-indigo-950'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Help & Grievances ({complaints.length})
        </button>
      </div>

      {/* TAB 1: MY BACKED PROJECTS */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.map(order => {
            const isDelivered = order.status === 'delivered';
            const isShipped = order.status === 'shipped';
            const isRefunded = order.status === 'refunded';

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      {order.id}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1">
                      {order.campaignTitle}
                    </h3>
                    <p className="text-xs text-slate-500">
                      by {order.founderName} · Placed on {order.createdAt}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-black text-slate-900 block font-mono">
                      {formatINR(order.totalPaid)}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      via {order.paymentMethod} ({order.paymentTxnId})
                    </span>
                  </div>
                </div>

                {/* Perk & Address Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Reward Tier Pre-Ordered
                    </span>
                    <span className="font-bold text-slate-900 block">{order.rewardTitle}</span>
                    <span className="text-slate-600 block">Item Amount: {formatINR(order.amount)}</span>
                    {order.extraTip > 0 && (
                      <span className="text-emerald-700 block">Founder Tip: +{formatINR(order.extraTip)}</span>
                    )}
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Shipping Destination
                    </span>
                    <span className="font-bold text-slate-900 block">{order.shippingAddress.fullName}</span>
                    <span className="text-slate-600 block">
                      {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.pincode}
                    </span>
                    <span className="text-slate-500 block">Phone: {order.shippingAddress.phone}</span>
                  </div>
                </div>

                {/* Delivery Tracker Stepper */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                    Escrow & Fulfillment Tracker
                  </h4>

                  {isRefunded ? (
                    <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2.5 text-xs text-rose-900">
                      <RotateCcw className="w-5 h-5 text-rose-600 shrink-0" />
                      <div>
                        <span className="font-bold block">100% Escrow Refund Completed</span>
                        <p className="mt-0.5 text-rose-800">
                          Campaign did not reach its required target. All {formatINR(order.totalPaid)} was reversed to your original UPI account with zero penalty.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
                      {/* Step 1 */}
                      <div className="space-y-1">
                        <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto text-xs">
                          ✓
                        </div>
                        <span className="font-semibold text-slate-900 block">Pledge Escrowed</span>
                        <span className="text-[10px] text-slate-400">All-or-nothing safe</span>
                      </div>

                      {/* Step 2 */}
                      <div className="space-y-1">
                        <div className={`w-7 h-7 rounded-full font-bold flex items-center justify-center mx-auto text-xs ${
                          order.status !== 'campaign_live' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {order.status !== 'campaign_live' ? '✓' : '2'}
                        </div>
                        <span className="font-semibold text-slate-900 block">In Production</span>
                        <span className="text-[10px] text-slate-400">60% stage released</span>
                      </div>

                      {/* Step 3 */}
                      <div className="space-y-1">
                        <div className={`w-7 h-7 rounded-full font-bold flex items-center justify-center mx-auto text-xs ${
                          isShipped || isDelivered ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {isShipped || isDelivered ? '✓' : '3'}
                        </div>
                        <span className="font-semibold text-slate-900 block">Shipped</span>
                        <span className="text-[10px] text-slate-400">
                          {order.trackingNumber ? order.trackingNumber : 'Courier dispatch'}
                        </span>
                      </div>

                      {/* Step 4 */}
                      <div className="space-y-1">
                        <div className={`w-7 h-7 rounded-full font-bold flex items-center justify-center mx-auto text-xs ${
                          isDelivered ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {isDelivered ? '✓' : '4'}
                        </div>
                        <span className="font-semibold text-slate-900 block">Delivered</span>
                        <span className="text-[10px] text-slate-400">40% escrow unlocked</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Rating / Review Prompt after delivery or Shipped */}
                {(isDelivered || isShipped) && (
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      {order.deliveryRating ? (
                        <div className="flex items-center gap-1.5 text-amber-600 font-bold">
                          <Star className="w-4 h-4 fill-current" />
                          <span>Rated {order.deliveryRating}/5 Stars</span>
                          <span className="text-slate-500 font-normal italic">
                            "{order.deliveryReview}"
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-500">
                          Received your parcel? Share feedback to boost the founder's Merit Score.
                        </span>
                      )}
                    </div>

                    {!order.deliveryRating && (
                      <button
                        onClick={() => setRatingOrder(order)}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-indigo-950 font-bold rounded-lg shadow-2xs"
                      >
                        Rate Founder Delivery
                      </button>
                    )}
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <div className="max-w-3xl space-y-3">
          {notifications.map(notif => (
            <div
              key={notif.id}
              className={`p-4 rounded-xl border text-xs space-y-1 transition-all ${
                notif.read ? 'bg-white border-slate-200' : 'bg-indigo-50/70 border-indigo-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 flex items-center gap-2">
                  <Bell className="w-3.5 h-3.5 text-indigo-700" />
                  {notif.title}
                </span>
                <span className="text-[10px] text-slate-400">{notif.date}</span>
              </div>
              <p className="text-slate-600 leading-relaxed">{notif.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: HELP & GRIEVANCES */}
      {activeTab === 'complaints' && (
        <div className="max-w-3xl space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-slate-900">
              Statutory Grievance Records
            </h3>
            <button
              onClick={() => setComplaintModalOpen(true)}
              className="px-3 py-1.5 bg-indigo-900 text-white rounded-lg text-xs font-semibold"
            >
              + Raise New Grievance
            </button>
          </div>

          {complaints.map(comp => (
            <div key={comp.id} className="p-4 bg-white rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900">
                  {comp.campaignTitle} · {comp.reason}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  comp.status === 'Resolved'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {comp.status}
                </span>
              </div>
              <p className="text-slate-700">{comp.description}</p>
              {comp.resolutionComment && (
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 text-[11px]">
                  <strong>Grievance Officer Response:</strong> {comp.resolutionComment}
                </div>
              )}
              <div className="text-[10px] text-slate-400 flex justify-between pt-1">
                <span>Ref: {comp.id} · Order: {comp.orderId}</span>
                <span>Filed on {comp.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rating Modal */}
      {ratingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-sm font-bold text-slate-900">
                Rate Founder Delivery
              </h3>
              <button onClick={() => setRatingOrder(null)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleRateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 mb-1">
                  How satisfied are you with {ratingOrder.founderName}'s delivery?
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setStars(val)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-6 h-6 ${val <= stars ? 'fill-current' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-slate-600 mb-1">Your Backer Review</label>
                <textarea
                  rows={3}
                  value={reviewText}
                  onChange={e => setReviewText(e.target.value)}
                  placeholder="Describe product quality, packing, and finish..."
                  className="w-full p-2.5 border rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRatingOrder(null)}
                  className="px-3 py-1.5 bg-slate-100 rounded-lg text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-900 text-white rounded-lg font-bold"
                >
                  Submit Verified Rating
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Complaint Modal */}
      {complaintModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-sm font-bold text-slate-900">
                Raise Grievance with Statutory Officer
              </h3>
              <button onClick={() => setComplaintModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleComplaintSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 mb-1">Select Backed Project</label>
                <select
                  value={selectedOrderId}
                  onChange={e => setSelectedOrderId(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  {orders.map(o => (
                    <option key={o.id} value={o.id}>
                      {o.campaignTitle} ({o.id})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-600 mb-1">Issue Category</label>
                <select
                  value={complaintReason}
                  onChange={e => setComplaintReason(e.target.value as any)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option>Late Delivery</option>
                  <option>Product Defect</option>
                  <option>Wrong Item</option>
                  <option>Unresponsive Founder</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-600 mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  value={complaintDesc}
                  onChange={e => setComplaintDesc(e.target.value)}
                  placeholder="Explain the problem clearly for our grievance audit team..."
                  className="w-full p-2.5 border rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setComplaintModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-100 rounded-lg text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-rose-700 text-white rounded-lg font-bold"
                >
                  Submit to Grievance Officer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
