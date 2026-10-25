import React from 'react';
import {
  ShieldCheck,
  Lock,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  FileText,
  PhoneCall,
  Scale
} from 'lucide-react';

export const TrustSafetyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
          <Scale className="w-4 h-4" />
          <span>Statutory Compliance & Legal Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Trust, Safety & Escrow Regulations
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          Plain-language explanation of how Bharateeyan protects citizen backers and enforces Indian legal standards for rewards-based pre-orders.
        </p>
      </div>

      {/* Main Grid of Legal Principles */}
      <div className="space-y-6 text-xs text-slate-700 leading-relaxed">
        
        {/* Section 1: What Backers Get vs Do NOT Get */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-sm font-bold text-slate-950 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>1. What Backers Receive vs. What They Do NOT Receive</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1.5">
              <span className="font-bold text-emerald-900 block text-xs">WHAT BACKERS RECEIVE:</span>
              <ul className="space-y-1 text-emerald-950 text-[11px]">
                <li>• Pre-purchased manufactured physical products (units, tools, apparel).</li>
                <li>• Software licenses, digital tokens, or educational access passes.</li>
                <li>• Experiential community perks (backer plaques, founder workshops).</li>
                <li>• 100% money back if the funding target is not achieved.</li>
              </ul>
            </div>

            <div className="p-4 bg-rose-50 rounded-xl border border-rose-200 space-y-1.5">
              <span className="font-bold text-rose-900 block text-xs">WHAT BACKERS NEVER RECEIVE:</span>
              <ul className="space-y-1 text-rose-950 text-[11px]">
                <li>• ❌ NO shares, equity, or ownership stock in the company.</li>
                <li>• ❌ NO profit sharing, dividends, or commercial royalties.</li>
                <li>• ❌ NO interest, guaranteed financial return, or debentures.</li>
                <li>• ❌ NO capital appreciation or secondary market trading.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2: All-or-Nothing Escrow Mechanism */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-sm font-bold text-slate-950 flex items-center gap-2">
            <Lock className="w-4 h-4 text-indigo-700" />
            <span>2. The All-or-Nothing Banking Escrow Contract</span>
          </h2>
          <p>
            When a backer pre-buys a reward, funds are deposited into a dedicated escrow trustee account operated by an RBI-authorized banking partner. The funds are held in trust and cannot be touched by either the founder or Bharateeyan during the active campaign.
          </p>
          <p>
            If the campaign reaches 100% of its goal by the deadline date, the campaign succeeds. If it raises even ₹1 less than the goal, the escrow software triggers an automatic 100% refund batch returning all money directly to the original UPI, debit card, or net banking account within 48 to 72 bank working hours.
          </p>
        </div>

        {/* Section 3: Staged 60/40 Payouts */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-sm font-bold text-slate-950 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>3. Staged 60/40 Disbursement Policy</span>
          </h2>
          <p>
            To prevent delivery abandonment, successful campaign proceeds are never handed over in a single lump sum:
          </p>
          <ul className="space-y-2 pl-4 list-disc text-slate-700">
            <li>
              <strong>Stage 1 (60%):</strong> Released upon campaign completion to fund raw materials, tooling, and labor.
            </li>
            <li>
              <strong>Stage 2 (40%):</strong> Held in escrow until the founder uploads proof of shipment (consignment note receipts, India Post speed post barcodes) for at least 80% of backed perks.
            </li>
          </ul>
        </div>

        {/* Section 4: Founder KYC & Verification */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-sm font-bold text-slate-950 flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-700" />
            <span>4. Founder KYC & Criminal Record Screening</span>
          </h2>
          <p>
            Every founder must authenticate their identity via DigiLocker using government-issued Aadhaar and PAN cards. In addition, their payout bank account undergoes penny-drop name matching with NPCI records to ensure funds cannot be routed to third parties.
          </p>
        </div>

        {/* Section 5: Grievance Redressal Mechanism */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-sm font-bold text-slate-950 flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-rose-600" />
            <span>5. Statutory Grievance Redressal</span>
          </h2>
          <p>
            In compliance with the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, Bharateeyan has appointed a dedicated Grievance Officer:
          </p>
          <div className="p-4 bg-slate-50 rounded-xl border space-y-1">
            <span className="font-bold text-slate-900 block">Rajesh Varma, Grievance Officer</span>
            <p className="text-slate-600">Email: grievance@bharateeyan.in</p>
            <p className="text-slate-600">Helpline: +91 40 4920 1888 (10 AM to 6 PM IST, Mon–Fri)</p>
            <p className="text-slate-500 text-[11px]">
              Bharateeyan Technologies Pvt Ltd, Road No 12, Banjara Hills, Hyderabad, Telangana 500034.
            </p>
          </div>
          <p className="text-[11px] text-slate-500">
            All grievances are acknowledged within 24 hours and resolved within 15 calendar days.
          </p>
        </div>

        {/* Section 6: Investor Section Compliance */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-sm font-bold text-slate-950 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>6. Accredited Investor Deal Room Compliance</span>
          </h2>
          <p>
            Access to the Deal Room is restricted strictly to accredited investors (net worth ₹2+ Crore) and SEBI-registered Category I Alternative Investment Funds (AIFs).
          </p>
          <p>
            Bharateeyan acts solely as a discovery showcase highlighting community-validated traction. Bharateeyan does not operate an equity crowdfunding platform, does not collect investment capital, does not issue securities, and does not charge transaction success fees on investments. Any equity deal is executed directly between the founder and investor pursuant to the Companies Act, 2013.
          </p>
        </div>

      </div>

    </div>
  );
};
