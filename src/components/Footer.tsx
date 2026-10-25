import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { ShieldCheck, Lock, HeartHandshake, FileText, PhoneCall, RefreshCw } from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const { language, resetDemoData } = useApp();
  const t = translations[language];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-indigo-950 font-bold text-lg">
                భ
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Bharateeyan</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Backing Indian grassroots founders without elite pedigree. Ordinary citizens pre-buy working products and perks. No equity, no shares, no IIT tag required.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-amber-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% All-or-Nothing Escrow Guaranteed</span>
            </div>
          </div>

          {/* Col 2: Navigation & Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => navigate('/explore')} className="hover:text-white transition-colors">
                  Explore Grassroots Innovations
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/how-it-works')} className="hover:text-white transition-colors">
                  How Rewards Crowdfunding Works
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/start-campaign')} className="hover:text-white transition-colors">
                  Start a Founder Campaign
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/investor-deal-room')} className="hover:text-white transition-colors">
                  Accredited Investor Deal Room
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/trust-safety')} className="hover:text-white transition-colors">
                  Merit Score Algorithm
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Trust & Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Trust & Compliance</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => navigate('/trust-safety')} className="hover:text-white transition-colors">
                  All-or-Nothing Refund Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/trust-safety')} className="hover:text-white transition-colors">
                  Escrow Partner Guidelines
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/trust-safety')} className="hover:text-white transition-colors">
                  Founder KYC & Non-Equity Agreement
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/trust-safety')} className="hover:text-white transition-colors">
                  Terms of Service & Privacy
                </button>
              </li>
              <li>
                <button
                  onClick={resetDemoData}
                  className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors pt-2 font-medium"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{t.resetDemoData}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Grievance Officer statutory notice */}
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 text-xs space-y-2">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Statutory Grievance Officer</span>
            </div>
            <p className="text-slate-300 font-medium">Rajesh Varma</p>
            <p className="text-slate-400">Email: grievance@bharateeyan.in</p>
            <p className="text-slate-400">Helpline: +91 40 4920 1888</p>
            <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-700">
              Banjara Hills, Hyderabad, Telangana 500034. Response within 24 working hours.
            </p>
          </div>
        </div>

        {/* Big Statutory Non-Equity Notice Box */}
        <div className="border-t border-slate-800 pt-8 pb-6">
          <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-4 text-[11px] text-slate-400 leading-relaxed">
            <span className="font-semibold text-slate-300 block mb-1">
              Statutory Platform Notice — Rewards Only (No Shares or Financial Returns):
            </span>
            {t.footerLegal}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 pt-4 border-t border-slate-800 gap-4">
          <p>© 2026 Bharateeyan Technologies Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Built for Bharat</span>
            <span>·</span>
            <span>Made with Dignity in India</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
