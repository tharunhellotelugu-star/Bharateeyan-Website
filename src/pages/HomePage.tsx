import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { formatINRLakh, formatINR } from '../utils/formatters';
import { CampaignCard } from '../components/CampaignCard';
import {
  ShieldCheck,
  Lock,
  CheckCircle,
  Truck,
  ArrowRight,
  TrendingUp,
  Award,
  Sparkles,
  Users,
  Compass,
  PlusCircle,
  Clock,
  Quote
} from 'lucide-react';

interface HomePageProps {
  navigate: (path: string) => void;
  onSelectCampaign: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate, onSelectCampaign }) => {
  const { campaigns, language } = useApp();
  const t = translations[language];

  // Dynamic live stats from seed data
  const totalRaised = campaigns.reduce((acc, c) => acc + c.raisedAmount, 0);
  const fundedCount = campaigns.filter(c => c.status === 'funded').length;
  const totalBackers = campaigns.reduce((acc, c) => acc + c.backersCount, 0);
  const citiesCount = new Set(campaigns.map(c => c.city)).size;

  const trendingCampaigns = campaigns
    .filter(c => c.status === 'live' || c.status === 'funded')
    .slice(0, 3);

  const communityValidatedCampaigns = campaigns
    .filter(c => c.communityValidated)
    .slice(0, 3);

  const endingSoonCampaigns = campaigns
    .filter(c => c.status === 'ending_soon' || (c.status === 'live' && c.daysLeft <= 10))
    .slice(0, 3);

  const categories = [
    { name: 'Agri', label: 'Agriculture & Solar', count: campaigns.filter(c => c.category === 'Agri').length },
    { name: 'Hardware', label: 'IoT & Hardware', count: campaigns.filter(c => c.category === 'Hardware').length },
    { name: 'Education', label: 'Regional EdTech', count: campaigns.filter(c => c.category === 'Education').length },
    { name: 'Fashion', label: 'Handloom & D2C', count: campaigns.filter(c => c.category === 'Fashion').length },
    { name: 'Food', label: 'Clean Food & Millets', count: campaigns.filter(c => c.category === 'Food').length },
    { name: 'Clean Energy', label: 'Eco & Bio Tableware', count: campaigns.filter(c => c.category === 'Clean Energy').length },
    { name: 'Health', label: 'Grassroots Health', count: campaigns.filter(c => c.category === 'Health').length },
    { name: 'Apps', label: 'Voice & Regional Apps', count: campaigns.filter(c => c.category === 'Apps').length },
  ];

  const testimonials = [
    {
      founder: 'Ravi Kumar',
      city: 'Warangal, Telangana',
      product: 'SuryaDry Solar Dehydrator',
      quote: 'When I pitched to traditional venture capitalists, they asked which IIT I graduated from. On Bharateeyan, 142 chilli farmers and community supporters pre-ordered ₹14.8 lakh worth of dryers in 18 days. Proof beat pedigree.'
    },
    {
      founder: 'Mallesham Chary',
      city: 'Pochampally, Telangana',
      product: 'WeaveCraft Modern Ikat',
      quote: 'Middlemen took 70% of our artisan value. Through rewards crowdfunding, 312 backers across India directly funded our looms upfront. 82% of revenue now stays with our weaver families.'
    },
    {
      founder: 'Basavaraj Hiremath',
      city: 'Hubballi, Karnataka',
      product: 'EcoPattra Areca Tableware',
      quote: 'The staged 60/40 escrow gave our backers complete peace of mind. Reaching a Merit Score of 82 also opened doors for two angel fund intros in Bengaluru.'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-indigo-950 via-indigo-900 to-slate-900 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          
          {/* Top Non-IIT Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-xs text-amber-300 font-semibold tracking-wide shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>Indian Rewards Crowdfunding · No Elite Degree Required</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-3xl mx-auto leading-tight">
            {t.heroTitle}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-indigo-100 max-w-2xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => navigate('/explore')}
              className="w-full sm:w-auto px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-indigo-950 font-bold rounded-xl shadow-lg transition-all hover:scale-102 flex items-center justify-center gap-2 text-sm"
            >
              <Compass className="w-4 h-4" />
              <span>{t.exploreCampaigns}</span>
            </button>

            <button
              onClick={() => navigate('/start-campaign')}
              className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 backdrop-blur-xs transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <PlusCircle className="w-4 h-4 text-amber-400" />
              <span>{t.startYourCampaign}</span>
            </button>
          </div>

          {/* Quick Escrow Guarantee Pill */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-indigo-200">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Pre-buy products only (No shares)
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              100% Escrow Refund if goal is missed
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-sky-400" />
              Staged 60/40 Escrow Payouts
            </span>
          </div>

        </div>
      </section>

      {/* 2. LIVE STATS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          
          <div className="border-r-0 sm:border-r border-slate-100 last:border-none p-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-mono">
              {formatINRLakh(totalRaised)}
            </span>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mt-1">
              {t.totalRaised}
            </span>
          </div>

          <div className="border-r-0 lg:border-r border-slate-100 last:border-none p-2">
            <span className="text-2xl sm:text-3xl font-black text-indigo-900 tracking-tight font-mono">
              {fundedCount}
            </span>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mt-1">
              {t.campaignsFunded}
            </span>
          </div>

          <div className="border-r-0 sm:border-r border-slate-100 last:border-none p-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-mono">
              {totalBackers}
            </span>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mt-1">
              {t.activeBackers}
            </span>
          </div>

          <div className="p-2">
            <span className="text-2xl sm:text-3xl font-black text-amber-600 tracking-tight font-mono">
              {citiesCount}
            </span>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mt-1">
              {t.citiesRepresented}
            </span>
          </div>

        </div>
      </section>

      {/* 3. TRENDING INNOVATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
              <TrendingUp className="w-4 h-4" />
              <span>Verified Execution</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 mt-1">
              {t.trendingProjects}
            </h2>
          </div>
          <button
            onClick={() => navigate('/explore')}
            className="text-xs font-bold text-indigo-700 hover:text-indigo-950 flex items-center gap-1 group"
          >
            <span>View all 14 projects</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingCampaigns.map(camp => (
            <CampaignCard
              key={camp.id}
              campaign={camp}
              onClick={() => onSelectCampaign(camp.id)}
            />
          ))}
        </div>
      </section>

      {/* 4. COMMUNITY VALIDATED STARTUPS (MERIT SCORE >= 70) */}
      <section className="bg-indigo-50/60 py-14 border-y border-indigo-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5 text-emerald-700" />
                <span>Merit Score ≥ 70 & Goal Reached</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 mt-2">
                {t.communityValidated} Startups
              </h2>
              <p className="text-xs text-slate-600 mt-1 max-w-xl">
                These grassroots startups have achieved proof of demand through real pre-orders and are showcased to accredited angel funds.
              </p>
            </div>
            <button
              onClick={() => navigate('/investor-deal-room')}
              className="px-4 py-2 bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors self-start sm:self-auto"
            >
              Enter Investor Deal Room
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityValidatedCampaigns.map(camp => (
              <CampaignCard
                key={camp.id}
                campaign={camp}
                onClick={() => onSelectCampaign(camp.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (4 STEPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
            Simple, Transparent, Compliant
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-950">
            {t.howItWorksTitle}
          </h2>
          <p className="text-xs text-slate-600 mt-2">
            Every rupee is protected in escrow. Backers receive physical perks and products — never shares or financial promises.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Step 1 */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3 relative">
            <span className="text-3xl font-black text-indigo-100 font-mono block">01</span>
            <h3 className="text-base font-bold text-slate-900">{t.howStep1Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t.howStep1Desc}</p>
          </div>

          {/* Step 2 */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3 relative">
            <span className="text-3xl font-black text-indigo-100 font-mono block">02</span>
            <h3 className="text-base font-bold text-slate-900">{t.howStep2Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t.howStep2Desc}</p>
          </div>

          {/* Step 3 */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3 relative">
            <span className="text-3xl font-black text-indigo-100 font-mono block">03</span>
            <h3 className="text-base font-bold text-slate-900">{t.howStep3Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t.howStep3Desc}</p>
          </div>

          {/* Step 4 */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3 relative">
            <span className="text-3xl font-black text-indigo-100 font-mono block">04</span>
            <h3 className="text-base font-bold text-slate-900">{t.howStep4Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{t.howStep4Desc}</p>
          </div>

        </div>
      </section>

      {/* 6. TRUST & ESCROW CONTRACT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Backer Protection Guarantees
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              {t.trustTitle}
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              We eliminate Kickstarter delivery failure fears with strict Indian contractual mechanisms:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
            
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-800/80 border border-indigo-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">{t.trustRefundTitle}</h4>
                <p className="text-slate-400 leading-relaxed">{t.trustRefundDesc}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-800/80 border border-indigo-700 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">{t.trustEscrowTitle}</h4>
                <p className="text-slate-400 leading-relaxed">{t.trustEscrowDesc}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-800/80 border border-indigo-700 flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">{t.trustKYCTitle}</h4>
                <p className="text-slate-400 leading-relaxed">{t.trustKYCDesc}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-800/80 border border-indigo-700 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">{t.trustStagedTitle}</h4>
                <p className="text-slate-400 leading-relaxed">{t.trustStagedDesc}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. FOUNDER TESTIMONIALS (TIER-2/3 CITIES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 block mb-1">
            Real Voices from Tier-2 & 3 Bharat
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-950">
            "We Didn't Need an IIT Degree. We Needed Real Customers."
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test, i) => (
            <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4">
              <div>
                <Quote className="w-6 h-6 text-amber-500 mb-2 opacity-50" />
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{test.quote}"
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100">
                <span className="font-bold text-slate-900 block text-xs">{test.founder}</span>
                <span className="text-[11px] text-slate-500">{test.city}</span>
                <span className="text-[10px] text-indigo-800 block font-semibold mt-0.5">{test.product}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. BROWSE BY CATEGORY CHIPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900">
            {t.categories}
          </h3>
          <button
            onClick={() => navigate('/explore')}
            className="text-xs font-bold text-indigo-700 hover:text-indigo-900"
          >
            Explore all categories →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => navigate('/explore')}
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-indigo-400 hover:shadow-xs transition-all text-left group"
            >
              <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-900 block truncate">
                {cat.label}
              </span>
              <span className="text-[10px] text-slate-500">
                {cat.count} campaigns
              </span>
            </button>
          ))}
        </div>
      </section>

    </div>
  );
};
