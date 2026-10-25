import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CampaignCategory, RewardTier } from '../types';
import { formatINR } from '../utils/formatters';
import { AICampaignCoachModal } from '../components/AICampaignCoachModal';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Plus,
  Trash2,
  Eye,
  Send,
  Loader2,
  Lock,
  ArrowRight
} from 'lucide-react';
import { apiUrl } from '../lib/api';

interface CampaignBuilderPageProps {
  navigate: (path: string) => void;
  onSelectCampaign: (id: string) => void;
}

export const CampaignBuilderPage: React.FC<CampaignBuilderPageProps> = ({
  navigate,
  onSelectCampaign
}) => {
  const { addCampaign, showToast } = useApp();

  const [step, setStep] = useState<number>(1);
  const totalSteps = 4;

  // Onboarding & KYC Details
  const [founderInfo, setFounderInfo] = useState({
    name: 'Ramesh Goud',
    city: 'Karimnagar',
    state: 'Telangana',
    phone: '+91 94401 22334',
    email: 'ramesh.innovations@gmail.com',
    entityType: 'Private Limited' as const,
    aadhaarNumber: 'XXXX-XXXX-8912',
    panNumber: 'ABCDE1234F',
    digilockerVerified: false,
    pennyDropVerified: false,
    bankAccount: '918239012389',
    ifscCode: 'SBIN0001234',
    nonEquityAgreed: false,
  });

  // Campaign Info
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<CampaignCategory>('Hardware');
  const [goalAmount, setGoalAmount] = useState<number>(600000);
  const [durationDays, setDurationDays] = useState<number>(30);
  const [language, setLanguage] = useState('Telugu / English');

  // Story Sections
  const [story, setStory] = useState({
    problem: '',
    solution: '',
    whoWeAre: '',
    fundUsage: '',
    timeline: '',
    risks: '',
  });

  // Reward Tiers
  const [rewardTiers, setRewardTiers] = useState<RewardTier[]>([
    {
      id: 'r-new-1',
      campaignId: 'temp',
      title: 'Early Bird Community Supporter',
      price: 999,
      description: 'Receive our first-batch branded backer perk, thank-you certificate, and private updates.',
      items: ['Digital Backer Certificate', 'Name on Founder Wall', 'Priority Delivery Batch'],
      estimatedDeliveryMonth: 'Dec 2026',
      quantityLimit: 150,
      claimedCount: 0
    },
    {
      id: 'r-new-2',
      campaignId: 'temp',
      title: 'Standard Production Unit Pre-Order',
      price: 3499,
      description: '1 full retail-ready production unit with 1-year replacement warranty and user manual.',
      items: ['1x Working Hardware Unit', 'Regional User Manual', '1-Year Warranty'],
      estimatedDeliveryMonth: 'Jan 2027',
      quantityLimit: 100,
      claimedCount: 0
    }
  ]);

  // AI Modal & Word Checker State
  const [coachModalOpen, setCoachModalOpen] = useState(false);
  const [suggestingRewards, setSuggestingRewards] = useState(false);
  const [flaggedWords, setFlaggedWords] = useState<string[]>([]);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  // Prohibited investment wording check
  const checkForbiddenWords = (text: string) => {
    const forbidden = [
      'shares', 'equity', 'return', 'returns', 'profit', 'dividends', 
      'interest', 'roi', 'guaranteed income', 'investment', 'invest'
    ];
    const found = forbidden.filter(w => new RegExp(`\\b${w}\\b`, 'i').test(text));
    setFlaggedWords(found);
    return found;
  };

  const handleDigiLocker = () => {
    setFounderInfo(prev => ({ ...prev, digilockerVerified: true }));
    showToast('DigiLocker Aadhaar & PAN verified successfully via UIDAI gateway.', 'success');
  };

  const handlePennyDrop = () => {
    setFounderInfo(prev => ({ ...prev, pennyDropVerified: true }));
    showToast('Simulated ₹1 Penny-Drop success. SBI Bank Account registered.', 'success');
  };

  const handleSuggestRewards = async () => {
    if (!title) {
      showToast('Please enter a product title first.', 'error');
      return;
    }
    setSuggestingRewards(true);
    try {
      const res = await fetch(apiUrl('/api/ai/suggest-rewards'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description: tagline || story.solution,
          category,
          targetGoal: goalAmount
        })
      });
      const data = await res.json();
      if (data.rewards?.length) {
        const mapped = data.rewards.map((r: any, idx: number) => ({
          id: `r-ai-${idx}-${Date.now()}`,
          campaignId: 'temp',
          title: r.title,
          price: r.price || (idx + 1) * 999,
          description: r.description,
          items: r.items || ['Product item', 'Backer perk'],
          estimatedDeliveryMonth: r.estimatedDeliveryMonth || 'Dec 2026',
          quantityLimit: r.quantityLimit || 100,
          claimedCount: 0
        }));
        setRewardTiers(mapped);
        showToast('Suggested 4 tiered rewards based on your product!', 'success');
      }
    } catch (err) {
      showToast('Failed to fetch AI rewards. Using default tiers.', 'error');
    } finally {
      setSuggestingRewards(false);
    }
  };

  const handleStoryApply = (newStory: typeof story) => {
    setStory(newStory);
    const combined = Object.values(newStory).join(' ');
    checkForbiddenWords(combined);
    showToast('Story drafted by AI Campaign Coach applied!', 'success');
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!founderInfo.nonEquityAgreed) {
      showToast('You must agree not to offer shares or financial returns.', 'error');
      return;
    }

    const combinedText = `${title} ${tagline} ${Object.values(story).join(' ')}`;
    const found = checkForbiddenWords(combinedText);
    if (found.length > 0) {
      showToast(`Campaign contains prohibited financial words: ${found.join(', ')}. Please remove them.`, 'error');
      return;
    }

    const newCampaign = addCampaign({
      title,
      tagline,
      category,
      city: founderInfo.city,
      state: founderInfo.state,
      language,
      goalAmount,
      daysLeft: durationDays,
      story,
      rewardTiers
    });

    onSelectCampaign(newCampaign.id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
          Grassroots Founder Launchpad
        </span>
        <h1 className="text-3xl font-extrabold text-slate-950 mt-1">
          Start Your Rewards Campaign
        </h1>
        <p className="text-xs text-slate-600 mt-1">
          Pre-sell your physical product or perk to Indian citizens. No IIT degree, equity dilution, or venture capital required.
        </p>
      </div>

      {/* Multi-Step Stepper Progress Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          {[
            { num: 1, title: '1. KYC & Escrow Bank' },
            { num: 2, title: '2. Story & AI Coach' },
            { num: 3, title: '3. Rewards & Goals' },
            { num: 4, title: '4. Compliance & Review' }
          ].map(s => (
            <button
              key={s.num}
              onClick={() => setStep(s.num)}
              className={`py-2 px-3 rounded-xl font-bold transition-colors ${
                step === s.num
                  ? 'bg-indigo-900 text-white shadow-2xs'
                  : step > s.num
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              <span className="block truncate">{s.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Prohibited Words Warning Banner */}
      {flaggedWords.length > 0 && (
        <div className="p-4 bg-rose-50 border border-rose-300 rounded-2xl text-xs text-rose-950 space-y-1 animate-in fade-in">
          <div className="flex items-center gap-2 font-bold text-rose-800">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Prohibited Financial Words Detected: {flaggedWords.join(', ')}</span>
          </div>
          <p className="text-rose-900 leading-snug">
            Under Indian SEBI regulations, rewards crowdfunding can only offer <strong>physical products, software licenses, and community perks</strong>. Phrases promising equity, shares, profit shares, or financial returns are illegal for public crowdfunding.
          </p>
        </div>
      )}

      {/* STEP 1: FOUNDER ONBOARDING & KYC */}
      {step === 1 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Step 1: Founder Identity & KYC Verification
            </h3>
            <p className="text-xs text-slate-500">
              We verify all makers with DigiLocker to ensure backer escrow safety.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-600 mb-1 font-semibold">Founder Full Name</label>
              <input
                type="text"
                value={founderInfo.name}
                onChange={e => setFounderInfo({ ...founderInfo, name: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-indigo-600"
              />
            </div>

            <div>
              <label className="block text-slate-600 mb-1 font-semibold">Home City / District</label>
              <input
                type="text"
                value={founderInfo.city}
                onChange={e => setFounderInfo({ ...founderInfo, city: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-indigo-600"
              />
            </div>

            <div>
              <label className="block text-slate-600 mb-1 font-semibold">State</label>
              <input
                type="text"
                value={founderInfo.state}
                onChange={e => setFounderInfo({ ...founderInfo, state: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-indigo-600"
              />
            </div>

            <div>
              <label className="block text-slate-600 mb-1 font-semibold">Entity Type</label>
              <select
                value={founderInfo.entityType}
                onChange={e => setFounderInfo({ ...founderInfo, entityType: e.target.value as any })}
                className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-indigo-600"
              >
                <option value="Private Limited">Private Limited</option>
                <option value="LLP">LLP</option>
                <option value="Sole Proprietor">Sole Proprietor</option>
                <option value="Not registered yet">Not registered yet</option>
              </select>
            </div>
          </div>

          {/* DigiLocker KYC Simulation */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
            <span className="font-bold text-slate-900 block">
              Government Identity Verification
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-slate-500 block text-[11px]">Aadhaar (Masked):</span>
                <span className="font-mono font-bold text-slate-800">{founderInfo.aadhaarNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">PAN Card:</span>
                <span className="font-mono font-bold text-slate-800">{founderInfo.panNumber}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleDigiLocker}
                className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors ${
                  founderInfo.digilockerVerified
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-indigo-900 text-white hover:bg-indigo-800'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{founderInfo.digilockerVerified ? 'DigiLocker Verified ✓' : 'Verify with DigiLocker'}</span>
              </button>
            </div>
          </div>

          {/* Bank Account Verification (Penny Drop) */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
            <span className="font-bold text-slate-900 block">
              Escrow Payout Bank Account (60/40 Staged)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-500 block text-[11px]">Bank Account Number</label>
                <input
                  type="text"
                  value={founderInfo.bankAccount}
                  onChange={e => setFounderInfo({ ...founderInfo, bankAccount: e.target.value })}
                  className="w-full p-2 rounded border font-mono"
                />
              </div>
              <div>
                <label className="text-slate-500 block text-[11px]">IFSC Code</label>
                <input
                  type="text"
                  value={founderInfo.ifscCode}
                  onChange={e => setFounderInfo({ ...founderInfo, ifscCode: e.target.value })}
                  className="w-full p-2 rounded border font-mono uppercase"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handlePennyDrop}
              className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors ${
                founderInfo.pennyDropVerified
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : 'bg-indigo-900 text-white hover:bg-indigo-800'
              }`}
            >
              <span>{founderInfo.pennyDropVerified ? '₹1 Penny-Drop Confirmed ✓' : 'Verify Account (₹1 Penny-Drop)'}</span>
            </button>
          </div>

          {/* Mandatory Non-Equity Declaration Checkbox */}
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
            <label className="flex items-start gap-3 cursor-pointer text-xs text-amber-950 font-medium">
              <input
                type="checkbox"
                checked={founderInfo.nonEquityAgreed}
                onChange={e => setFounderInfo({ ...founderInfo, nonEquityAgreed: e.target.checked })}
                className="mt-1 w-4 h-4 rounded text-indigo-900 focus:ring-indigo-600"
              />
              <span>
                <strong>Mandatory Statutory Declaration:</strong> I strictly agree that I will NOT offer shares, equity, profit share, debentures, dividends, or financial yields to backers on Bharateeyan. Backers will exclusively receive manufactured products and pre-order perks.
              </span>
            </label>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-6 py-2.5 bg-indigo-900 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 hover:bg-indigo-800"
            >
              <span>Proceed to Campaign Story</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: STORY EDITOR & AI COACH */}
      {step === 2 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Step 2: Campaign Story & Specifications
              </h3>
              <p className="text-xs text-slate-500">
                Describe the problem, your working solution, and how the funds will be used.
              </p>
            </div>

            {/* AI Campaign Coach Trigger */}
            <button
              type="button"
              onClick={() => setCoachModalOpen(true)}
              className="px-4 py-2 bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>AI Campaign Coach</span>
            </button>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Product Title</label>
              <input
                type="text"
                value={title}
                onChange={e => {
                  setTitle(e.target.value);
                  checkForbiddenWords(e.target.value);
                }}
                placeholder="e.g. SuryaDry: Decentralized Solar Chilli Dehydrator"
                className="w-full p-2.5 rounded-lg border border-slate-200 text-slate-900 font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">One-Line Tagline Pitch</label>
              <input
                type="text"
                value={tagline}
                onChange={e => {
                  setTagline(e.target.value);
                  checkForbiddenWords(e.target.value);
                }}
                placeholder="Dries 200 kg of farm produce in 36 hours with zero electrical power."
                className="w-full p-2.5 rounded-lg border border-slate-200"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-lg border border-slate-200"
                >
                  <option value="Agri">Agri</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Food">Food</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Education">Education</option>
                  <option value="Clean Energy">Clean Energy</option>
                  <option value="Health">Health</option>
                  <option value="Apps">Apps</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Language</label>
                <input
                  type="text"
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200"
                />
              </div>
            </div>

            {/* Structured Story Inputs */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">1. The Problem</label>
                <textarea
                  rows={3}
                  value={story.problem}
                  onChange={e => {
                    setStory({ ...story, problem: e.target.value });
                    checkForbiddenWords(e.target.value);
                  }}
                  placeholder="What struggle do local people face? (e.g. Unseasonal rains destroying 40% of chilli crops)"
                  className="w-full p-2.5 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">2. My Solution</label>
                <textarea
                  rows={3}
                  value={story.solution}
                  onChange={e => {
                    setStory({ ...story, solution: e.target.value });
                    checkForbiddenWords(e.target.value);
                  }}
                  placeholder="How does your prototype solve it? (e.g. UV polycarbonate solar thermal tunnel)"
                  className="w-full p-2.5 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">3. How Funds Will Be Used</label>
                <textarea
                  rows={2}
                  value={story.fundUsage}
                  onChange={e => {
                    setStory({ ...story, fundUsage: e.target.value });
                    checkForbiddenWords(e.target.value);
                  }}
                  placeholder="50% raw materials, 30% tooling, 20% backer shipping boxes."
                  className="w-full p-2.5 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">4. Timeline & Risks</label>
                <textarea
                  rows={2}
                  value={story.timeline}
                  onChange={e => {
                    setStory({ ...story, timeline: e.target.value });
                    checkForbiddenWords(e.target.value);
                  }}
                  placeholder="Tooling in month 1, assembly month 2, delivery to backers in month 3."
                  className="w-full p-2.5 rounded-lg border border-slate-200"
                />
              </div>
            </div>

          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2 border rounded-xl text-xs font-semibold text-slate-700"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-6 py-2 bg-indigo-900 text-white font-bold text-xs rounded-xl"
            >
              Proceed to Rewards & Goal
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: REWARDS TIERS & FUNDING GOAL */}
      {step === 3 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Step 3: Funding Goal & Reward Tiers
              </h3>
              <p className="text-xs text-slate-500">
                Define the minimum capital needed and perks backers will receive.
              </p>
            </div>

            {/* AI Suggest Rewards Button */}
            <button
              type="button"
              onClick={handleSuggestRewards}
              disabled={suggestingRewards}
              className="px-4 py-2 bg-indigo-900 hover:bg-indigo-800 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
            >
              {suggestingRewards ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
              <span>Suggest Rewards with AI</span>
            </button>
          </div>

          {/* Goal & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Target Funding Goal (₹50,000 to ₹50,00,000)
              </label>
              <div className="flex items-center">
                <span className="p-2.5 bg-slate-100 border border-r-0 rounded-l-lg font-bold text-slate-700">₹</span>
                <input
                  type="number"
                  min={50000}
                  max={5000000}
                  value={goalAmount}
                  onChange={e => setGoalAmount(parseInt(e.target.value, 10) || 50000)}
                  className="w-full p-2 rounded-r-lg border font-mono font-bold text-slate-900"
                />
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Formatted: {formatINR(goalAmount)}
              </span>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Campaign Duration (15 to 60 Days)
              </label>
              <input
                type="number"
                min={15}
                max={60}
                value={durationDays}
                onChange={e => setDurationDays(parseInt(e.target.value, 10) || 30)}
                className="w-full p-2.5 rounded-lg border font-mono font-bold text-slate-900"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Standard: 30 days is optimal for social momentum.
              </span>
            </div>
          </div>

          {/* Reward Tiers List */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Reward Tiers ({rewardTiers.length})
              </h4>
              <button
                type="button"
                onClick={() => {
                  setRewardTiers([
                    ...rewardTiers,
                    {
                      id: `r-tier-${Date.now()}`,
                      campaignId: 'temp',
                      title: 'New Perk Tier',
                      price: 1999,
                      description: 'Item description and backer perk details.',
                      items: ['1x Item'],
                      estimatedDeliveryMonth: 'Jan 2027',
                      quantityLimit: 100,
                      claimedCount: 0
                    }
                  ]);
                }}
                className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Tier</span>
              </button>
            </div>

            <div className="space-y-3">
              {rewardTiers.map((tier, idx) => (
                <div key={tier.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                    <div className="sm:col-span-6">
                      <label className="block text-[11px] text-slate-500">Tier Title</label>
                      <input
                        type="text"
                        value={tier.title}
                        onChange={e => {
                          const updated = [...rewardTiers];
                          updated[idx].title = e.target.value;
                          setRewardTiers(updated);
                        }}
                        className="w-full p-2 rounded border font-semibold text-slate-900 bg-white"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-[11px] text-slate-500">Price (₹)</label>
                      <input
                        type="number"
                        value={tier.price}
                        onChange={e => {
                          const updated = [...rewardTiers];
                          updated[idx].price = parseInt(e.target.value, 10) || 500;
                          setRewardTiers(updated);
                        }}
                        className="w-full p-2 rounded border font-mono font-bold bg-white"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-[11px] text-slate-500">Est. Delivery</label>
                      <input
                        type="text"
                        value={tier.estimatedDeliveryMonth}
                        onChange={e => {
                          const updated = [...rewardTiers];
                          updated[idx].estimatedDeliveryMonth = e.target.value;
                          setRewardTiers(updated);
                        }}
                        className="w-full p-2 rounded border bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-500">Description</label>
                    <input
                      type="text"
                      value={tier.description}
                      onChange={e => {
                        const updated = [...rewardTiers];
                        updated[idx].description = e.target.value;
                        setRewardTiers(updated);
                      }}
                      className="w-full p-2 rounded border bg-white"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setRewardTiers(rewardTiers.filter((_, i) => i !== idx));
                      }}
                      className="text-rose-600 hover:text-rose-800 text-[11px] flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove Tier</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-4 py-2 border rounded-xl text-xs font-semibold text-slate-700"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep(4)}
              className="px-6 py-2 bg-indigo-900 text-white font-bold text-xs rounded-xl"
            >
              Review & Submit
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: REVIEW & SUBMIT */}
      {step === 4 && (
        <form onSubmit={handleFinalSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Step 4: Statutory Compliance & Final Review
            </h3>
            <p className="text-xs text-slate-500">
              Verify all checklist items before submitting for platform admin review.
            </p>
          </div>

          {/* Checklist */}
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <span className="font-semibold text-slate-800">DigiLocker KYC Check</span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${founderInfo.digilockerVerified ? 'text-emerald-800 bg-emerald-100' : 'text-amber-800 bg-amber-100'}`}>
                {founderInfo.digilockerVerified ? 'Verified ✓' : 'Self-declared'}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <span className="font-semibold text-slate-800">Penny-Drop Escrow Bank Account</span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${founderInfo.pennyDropVerified ? 'text-emerald-800 bg-emerald-100' : 'text-amber-800 bg-amber-100'}`}>
                {founderInfo.pennyDropVerified ? 'Verified ✓' : 'Self-declared'}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <span className="font-semibold text-slate-800">SEBI Non-Financial Rewards Filter</span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${flaggedWords.length === 0 ? 'text-emerald-800 bg-emerald-100' : 'text-rose-800 bg-rose-100'}`}>
                {flaggedWords.length === 0 ? 'Passed (No prohibited words) ✓' : 'Flags detected'}
              </span>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-4 py-2 border rounded-xl text-xs font-semibold text-slate-700"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Campaign for Review</span>
            </button>
          </div>
        </form>
      )}

      {/* AI Coach Modal */}
      {coachModalOpen && (
        <AICampaignCoachModal
          initialTitle={title}
          initialCategory={category}
          founderName={founderInfo.name}
          onApplyStory={handleStoryApply}
          onClose={() => setCoachModalOpen(false)}
        />
      )}

    </div>
  );
};
