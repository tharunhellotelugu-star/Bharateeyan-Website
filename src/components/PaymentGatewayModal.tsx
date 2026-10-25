import React, { useState } from 'react';
import { Campaign, RewardTier } from '../types';
import { formatINR } from '../utils/formatters';
import { useApp } from '../context/AppContext';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Smartphone,
  CreditCard,
  Building,
  ArrowRight,
  Loader2,
  PackageCheck
} from 'lucide-react';

interface PaymentGatewayModalProps {
  campaign: Campaign;
  selectedReward: RewardTier;
  onClose: () => void;
  onSuccess: (orderId: string) => void;
}

export const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
  campaign,
  selectedReward,
  onClose,
  onSuccess
}) => {
  const { backCampaign, role } = useApp();

  const [step, setStep] = useState<'checkout' | 'processing' | 'confirmed'>('checkout');
  const [confirmedOrderId, setConfirmedOrderId] = useState<string>('');

  // Form State
  const [quantity, setQuantity] = useState(1);
  const [extraTip, setExtraTip] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking'>('UPI');
  const [upiId, setUpiId] = useState('priya@oksbi');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'bhim'>('gpay');

  const [address, setAddress] = useState({
    fullName: role === 'backer' ? 'Priya Reddy' : 'Priya Reddy',
    phone: '+91 98480 99112',
    street: 'Plot 42, Road No 12, Banjara Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500034'
  });

  const basePrice = selectedReward.price * quantity;
  const grandTotal = basePrice + extraTip;

  const handlePay = () => {
    setStep('processing');
    
    // Simulate real gateway processing latency
    setTimeout(() => {
      const res = backCampaign(
        campaign.id,
        selectedReward.id,
        extraTip,
        address,
        paymentMethod
      );

      if (res.success) {
        setConfirmedOrderId(res.orderId);
        setStep('confirmed');
      } else {
        setStep('checkout');
      }
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-6">
        
        {/* Top Header */}
        <div className="bg-indigo-950 text-white p-4 flex items-center justify-between border-b border-indigo-900">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-900 border border-indigo-700 flex items-center justify-center font-bold text-amber-400">
              ₹
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">
                Bharateeyan Escrow Checkout
              </h3>
              <p className="text-[11px] text-indigo-200">
                All-or-Nothing Pre-Order Protection · 100% Refundable
              </p>
            </div>
          </div>
          {step !== 'processing' && (
            <button
              onClick={onClose}
              className="text-slate-300 hover:text-white p-1 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* STEP 1: CHECKOUT FORM */}
        {step === 'checkout' && (
          <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            
            {/* Selected Perk Summary */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 block">
                  Chosen Reward Tier
                </span>
                <h4 className="text-sm font-bold text-slate-900">{selectedReward.title}</h4>
                <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">
                  {selectedReward.description}
                </p>
                <div className="text-[11px] text-slate-500 mt-1">
                  Est. Delivery: <strong>{selectedReward.estimatedDeliveryMonth}</strong>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-base font-bold text-slate-900 block">
                  {formatINR(selectedReward.price)}
                </span>
                <span className="text-[11px] text-slate-500">per unit</span>
              </div>
            </div>

            {/* Quantity & Extra Tip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Quantity
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-slate-900 text-sm">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Support the Grassroots Maker (Tip)
                </label>
                <div className="flex items-center gap-1.5">
                  {[0, 100, 250, 500].map(amt => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setExtraTip(amt)}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-colors ${
                        extraTip === amt
                          ? 'bg-amber-100 border-amber-400 text-amber-900 font-bold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {amt === 0 ? 'None' : `+₹${amt}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Shipping Details (India Post / Courier Delivery)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={address.fullName}
                    onChange={e => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-900 focus:outline-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">Phone (for courier SMS)</label>
                  <input
                    type="text"
                    value={address.phone}
                    onChange={e => setAddress({ ...address, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-900 focus:outline-indigo-600"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-slate-600 mb-1">Street Address</label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={e => setAddress({ ...address, street: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-900 focus:outline-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">City</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={e => setAddress({ ...address, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-900 focus:outline-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">PIN Code</label>
                  <input
                    type="text"
                    value={address.pincode}
                    onChange={e => setAddress({ ...address, pincode: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-900 focus:outline-indigo-600"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Select Indian Payment Gateway Method
              </h4>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all ${
                    paymentMethod === 'UPI'
                      ? 'border-indigo-600 bg-indigo-50/60 text-indigo-950 ring-1 ring-indigo-600'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-indigo-600" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Card')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all ${
                    paymentMethod === 'Card'
                      ? 'border-indigo-600 bg-indigo-50/60 text-indigo-950 ring-1 ring-indigo-600'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-indigo-600" />
                  <span>Debit / Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('NetBanking')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all ${
                    paymentMethod === 'NetBanking'
                      ? 'border-indigo-600 bg-indigo-50/60 text-indigo-950 ring-1 ring-indigo-600'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Building className="w-4 h-4 text-indigo-600" />
                  <span>Net Banking</span>
                </button>
              </div>

              {/* UPI Sub-selector */}
              {paymentMethod === 'UPI' && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <span className="text-[11px] font-semibold text-slate-600 block">
                    Choose UPI App or enter VPA ID:
                  </span>
                  <div className="flex gap-2">
                    {['gpay', 'phonepe', 'paytm', 'bhim'].map(app => (
                      <button
                        key={app}
                        type="button"
                        onClick={() => setUpiApp(app as any)}
                        className={`px-3 py-1.5 rounded-md border text-[11px] font-bold uppercase ${
                          upiApp === app
                            ? 'bg-white border-indigo-600 text-indigo-900 shadow-2xs'
                            : 'bg-slate-100 border-slate-200 text-slate-600'
                        }`}
                      >
                        {app}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    placeholder="name@upi"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-900 bg-white"
                  />
                </div>
              )}
            </div>

            {/* Mandatory Escrow Guarantee Callout */}
            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-950">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">100% Escrow Guarantee</span>
                <p className="mt-0.5 text-emerald-900 leading-snug">
                  <strong>{formatINR(grandTotal)}</strong> will be held securely in platform escrow. You will be refunded in full automatically if the campaign does not reach its goal by the deadline.
                </p>
              </div>
            </div>

            {/* Total & Pay Button */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <div>
                <span className="text-[11px] text-slate-500 block">Total Pre-Order Amount:</span>
                <span className="text-xl font-black text-slate-900">{formatINR(grandTotal)}</span>
              </div>
              <button
                type="button"
                onClick={handlePay}
                className="px-6 py-3 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all hover:scale-102 active:scale-98"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Authorize {formatINR(grandTotal)} with Escrow</span>
              </button>
            </div>

          </div>
        )}

        {/* STEP 2: SIMULATED PAYMENT PROCESSING */}
        {step === 'processing' && (
          <div className="p-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-indigo-100 border-t-indigo-700 animate-spin"></div>
              <Lock className="w-6 h-6 text-indigo-900 absolute inset-0 m-auto" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">
                Processing Secure Escrow Authorization...
              </h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                Communicating with NPCI UPI switch & creating bank escrow pledge for {formatINR(grandTotal)}.
              </p>
            </div>
          </div>
        )}

        {/* STEP 3: ORDER CONFIRMED */}
        {step === 'confirmed' && (
          <div className="p-8 flex flex-col items-center text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-10 h-10 animate-in zoom-in duration-300" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                Pledge Successful · Escrow Locked
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-2">
                Order #{confirmedOrderId} Confirmed!
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-md">
                Thank you, {address.fullName}! You have backed <strong>{campaign.founder.name}</strong> for <strong>{selectedReward.title}</strong>.
              </p>
            </div>

            {/* Summary Box */}
            <div className="w-full bg-slate-50 rounded-xl border border-slate-200 p-4 text-xs text-left space-y-2">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Order ID:</span>
                <span className="font-mono font-bold text-slate-900">{confirmedOrderId}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Total Paid (Escrow):</span>
                <span className="font-bold text-indigo-950">{formatINR(grandTotal)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Delivery Address:</span>
                <span className="text-slate-800 font-medium truncate max-w-[240px]">
                  {address.street}, {address.city}
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500">Target Delivery:</span>
                <span className="font-semibold text-emerald-800">
                  {selectedReward.estimatedDeliveryMonth}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="w-full flex gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onSuccess(confirmedOrderId);
                }}
                className="flex-1 py-3 px-4 bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                View in "My Backed Projects"
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
