import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { Language, Role } from '../types';
import {
  Compass,
  HelpCircle,
  PlusCircle,
  Briefcase,
  Globe,
  User,
  Shield,
  Layers,
  Sparkles,
  Menu,
  X
} from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, navigate }) => {
  const { role, setRole, language, setLanguage, notifications } = useApp();
  const t = translations[language];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.read).length;

  const roleNameDisplay: Record<Role, string> = {
    guest: 'Guest',
    backer: 'Priya Reddy (Backer)',
    founder: 'Ravi Kumar (Founder)',
    investor: 'Meera Angel Fund (Investor)',
    admin: 'Admin Governance',
  };

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      {/* 1. Mandatory Top Demo Disclaimer Banner */}
      <div className="bg-indigo-950 text-indigo-100 text-xs py-1.5 px-4 text-center font-medium border-b border-indigo-900">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-400"></span>
          <span>{t.demoBanner}</span>
        </div>
      </div>

      {/* 2. Main Top Bar Contract: 3 zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNav('/')}
              className="flex items-center gap-2.5 text-left focus:outline-none group"
            >
              <div className="w-9 h-9 rounded-lg bg-indigo-900 flex items-center justify-center text-white font-black text-xl shadow-sm border border-indigo-700 group-hover:bg-indigo-800 transition-colors">
                <span className="text-amber-400">భ</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-indigo-950 whitespace-nowrap">
                  Bharateeyan
                </span>
                <span className="text-[10px] text-amber-700 font-semibold tracking-wider uppercase -mt-1">
                  Rewards · No IIT Needed
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
            <button
              onClick={() => handleNav('/explore')}
              className={`hover:text-indigo-900 transition-colors whitespace-nowrap ${
                currentPath === '/explore' ? 'text-indigo-900 font-semibold underline underline-offset-4 decoration-amber-500 decoration-2' : ''
              }`}
            >
              {t.explore}
            </button>

            <button
              onClick={() => handleNav('/how-it-works')}
              className={`hover:text-indigo-900 transition-colors whitespace-nowrap ${
                currentPath === '/how-it-works' ? 'text-indigo-900 font-semibold underline underline-offset-4 decoration-amber-500 decoration-2' : ''
              }`}
            >
              {t.howItWorks}
            </button>

            <button
              onClick={() => handleNav('/trust-safety')}
              className={`hover:text-indigo-900 transition-colors whitespace-nowrap ${
                currentPath === '/trust-safety' ? 'text-indigo-900 font-semibold underline underline-offset-4 decoration-amber-500 decoration-2' : ''
              }`}
            >
              Trust & Escrow
            </button>

            <button
              onClick={() => handleNav('/investor-deal-room')}
              className={`flex items-center gap-1.5 hover:text-indigo-900 transition-colors whitespace-nowrap ${
                currentPath === '/investor-deal-room' ? 'text-indigo-900 font-semibold underline underline-offset-4 decoration-amber-500 decoration-2' : ''
              }`}
            >
              <Briefcase className="w-4 h-4 text-amber-600" />
              <span>{t.forInvestors}</span>
            </button>
          </nav>

          {/* Zone 3: Language & Action / Role CTA */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-indigo-900 bg-slate-100 hover:bg-slate-200 py-1.5 px-2.5 rounded-md transition-colors"
                title="Change Language"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-700" />
                <span className="uppercase font-semibold">{language}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
                  <button
                    onClick={() => { setLanguage('en'); setLangDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-indigo-50 flex items-center justify-between ${language === 'en' ? 'font-bold text-indigo-900' : 'text-slate-700'}`}
                  >
                    <span>English</span>
                    {language === 'en' && <span className="text-amber-600">✓</span>}
                  </button>
                  <button
                    onClick={() => { setLanguage('te'); setLangDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-indigo-50 flex items-center justify-between ${language === 'te' ? 'font-bold text-indigo-900' : 'text-slate-700'}`}
                  >
                    <span>తెలుగు</span>
                    {language === 'te' && <span className="text-amber-600">✓</span>}
                  </button>
                  <button
                    onClick={() => { setLanguage('hi'); setLangDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-indigo-50 flex items-center justify-between ${language === 'hi' ? 'font-bold text-indigo-900' : 'text-slate-700'}`}
                  >
                    <span>हिन्दी</span>
                    {language === 'hi' && <span className="text-amber-600">✓</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Contextual Action based on current Role */}
            {role === 'guest' && (
              <button
                onClick={() => handleNav('/start-campaign')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-900 hover:bg-indigo-800 rounded-lg shadow-xs transition-colors whitespace-nowrap"
              >
                <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.startCampaign}</span>
              </button>
            )}

            {role === 'backer' && (
              <button
                onClick={() => handleNav('/backer-dashboard')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg transition-colors whitespace-nowrap"
              >
                <Layers className="w-3.5 h-3.5 text-amber-700" />
                <span>My Pledges</span>
              </button>
            )}

            {role === 'founder' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNav('/founder-dashboard')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-900 hover:bg-indigo-800 rounded-lg shadow-xs transition-colors whitespace-nowrap"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Founder Hub</span>
                </button>
                <button
                  onClick={() => handleNav('/start-campaign')}
                  className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-indigo-900 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors whitespace-nowrap"
                >
                  + New
                </button>
              </div>
            )}

            {role === 'investor' && (
              <button
                onClick={() => handleNav('/investor-deal-room')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-lg transition-colors whitespace-nowrap"
              >
                <Briefcase className="w-3.5 h-3.5 text-emerald-700" />
                <span>Deal Room</span>
              </button>
            )}

            {role === 'admin' && (
              <button
                onClick={() => handleNav('/admin-panel')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-950 bg-rose-100 hover:bg-rose-200 border border-rose-300 rounded-lg transition-colors whitespace-nowrap"
              >
                <Shield className="w-3.5 h-3.5 text-rose-700" />
                <span>Admin Governance</span>
              </button>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-slate-700 hover:text-indigo-900 hover:bg-slate-100 rounded-md"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-4 space-y-2">
          <button
            onClick={() => handleNav('/explore')}
            className="w-full text-left py-2 text-sm font-medium text-slate-800 hover:text-indigo-900"
          >
            {t.explore}
          </button>
          <button
            onClick={() => handleNav('/how-it-works')}
            className="w-full text-left py-2 text-sm font-medium text-slate-800 hover:text-indigo-900"
          >
            {t.howItWorks}
          </button>
          <button
            onClick={() => handleNav('/trust-safety')}
            className="w-full text-left py-2 text-sm font-medium text-slate-800 hover:text-indigo-900"
          >
            Trust & Escrow
          </button>
          <button
            onClick={() => handleNav('/investor-deal-room')}
            className="w-full text-left py-2 text-sm font-medium text-slate-800 hover:text-indigo-900"
          >
            {t.forInvestors}
          </button>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => handleNav('/start-campaign')}
              className="w-full py-2 px-3 text-center text-xs font-semibold text-white bg-indigo-900 rounded-lg"
            >
              {t.startCampaign}
            </button>
            {role === 'backer' && (
              <button
                onClick={() => handleNav('/backer-dashboard')}
                className="w-full py-2 px-3 text-center text-xs font-semibold text-indigo-900 bg-amber-100 rounded-lg"
              >
                My Backed Projects
              </button>
            )}
            {role === 'founder' && (
              <button
                onClick={() => handleNav('/founder-dashboard')}
                className="w-full py-2 px-3 text-center text-xs font-semibold text-white bg-indigo-800 rounded-lg"
              >
                Founder Dashboard
              </button>
            )}
            {role === 'admin' && (
              <button
                onClick={() => handleNav('/admin-panel')}
                className="w-full py-2 px-3 text-center text-xs font-semibold text-rose-900 bg-rose-100 rounded-lg"
              >
                Admin Panel
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
