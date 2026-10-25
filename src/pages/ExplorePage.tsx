import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { CampaignCard } from '../components/CampaignCard';
import { CompareModal } from '../components/CompareModal';
import { CampaignCategory } from '../types';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Compass,
  RotateCcw,
  Sparkles,
  Award,
  Layers,
  X
} from 'lucide-react';

interface ExplorePageProps {
  onSelectCampaign: (id: string) => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({ onSelectCampaign }) => {
  const { campaigns, language, showToast } = useApp();
  const t = translations[language];

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('trending');

  // Compare Tool state
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState<boolean>(false);

  const categories: string[] = [
    'All',
    'Agri',
    'Hardware',
    'Food',
    'Fashion',
    'Education',
    'Health',
    'Clean Energy',
    'Handicrafts',
    'Apps',
  ];

  const cities = useMemo(() => {
    const list = Array.from(new Set(campaigns.map(c => c.city))).sort();
    return ['All', ...list];
  }, [campaigns]);

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(c => {
      // Exclude draft/rejected from public explore
      if (c.status === 'pending_review' || c.status === 'rejected') return false;

      // Search term
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = c.title.toLowerCase().includes(query);
        const matchesTagline = c.tagline.toLowerCase().includes(query);
        const matchesFounder = c.founder.name.toLowerCase().includes(query);
        const matchesCity = c.city.toLowerCase().includes(query);
        if (!matchesTitle && !matchesTagline && !matchesFounder && !matchesCity) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'All' && c.category !== selectedCategory) {
        return false;
      }

      // City
      if (selectedCity !== 'All' && c.city !== selectedCity) {
        return false;
      }

      // Status
      if (selectedStatus === 'funded' && c.status !== 'funded') return false;
      if (selectedStatus === 'live' && c.status !== 'live' && c.status !== 'ending_soon') return false;
      if (selectedStatus === 'ending_soon' && c.status !== 'ending_soon' && c.daysLeft > 10) return false;
      if (selectedStatus === 'validated' && !c.communityValidated) return false;

      // Language
      if (selectedLanguage !== 'All' && !c.language.includes(selectedLanguage)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'trending') {
        return b.backersCount - a.backersCount;
      }
      if (sortBy === 'most_backed') {
        return b.raisedAmount - a.raisedAmount;
      }
      if (sortBy === 'merit_score') {
        return b.meritScore.totalScore - a.meritScore.totalScore;
      }
      if (sortBy === 'ending_soon') {
        return a.daysLeft - b.daysLeft;
      }
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0;
    });
  }, [campaigns, searchTerm, selectedCategory, selectedCity, selectedStatus, selectedLanguage, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedCity('All');
    setSelectedStatus('All');
    setSelectedLanguage('All');
    setSortBy('trending');
  };

  const toggleCompare = (id: string) => {
    if (compareIds.includes(id)) {
      setCompareIds(prev => prev.filter(item => item !== id));
    } else {
      if (compareIds.length >= 3) {
        showToast('You can compare up to 3 campaigns at once.', 'info');
        return;
      }
      setCompareIds(prev => [...prev, id]);
      const addedCamp = campaigns.find(c => c.id === id);
      showToast(`Added "${addedCamp?.title || 'Innovation'}" to compare (${compareIds.length + 1}/3)`, 'success');
    }
  };

  const compareCampaigns = useMemo(() => {
    return campaigns.filter(c => compareIds.includes(c.id));
  }, [campaigns, compareIds]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title & Kicker */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
            <Compass className="w-4 h-4" />
            <span>Non-IIT / Non-IIM Founders Directory</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-950 mt-1">
            Explore Grassroots Innovations
          </h1>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Pre-buy working products created by everyday Indian engineers, weavers, technicians, and botanists. 100% all-or-nothing escrow backed.
          </p>
        </div>

        {compareIds.length > 0 && (
          <button
            onClick={() => setCompareModalOpen(true)}
            className="px-4 py-2 bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 self-start sm:self-auto shrink-0"
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Compare Selected ({compareIds.length}/3)</span>
          </button>
        )}
      </div>

      {/* Search Bar + Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
        
        {/* Main Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search innovations, founders, or tier-2/3 cities (e.g. Warangal, Vijayawada, solar, millets)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-indigo-600 bg-slate-50/50"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 text-xs">
          
          {/* Status Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Funding Status
            </label>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-200 text-slate-800 bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="live">Live Now</option>
              <option value="funded">100% Funded</option>
              <option value="ending_soon">Ending Soon (&lt;10d)</option>
              <option value="validated">Community Validated (≥70)</option>
            </select>
          </div>

          {/* City / State Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              City / Town
            </label>
            <select
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-200 text-slate-800 bg-white"
            >
              {cities.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Language Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Language
            </label>
            <select
              value={selectedLanguage}
              onChange={e => setSelectedLanguage(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-200 text-slate-800 bg-white"
            >
              <option value="All">All Languages</option>
              <option value="Telugu">Telugu</option>
              <option value="Hindi">Hindi</option>
              <option value="English">English</option>
              <option value="Tamil">Tamil</option>
              <option value="Kannada">Kannada</option>
              <option value="Marathi">Marathi</option>
            </select>
          </div>

          {/* Sort Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-200 text-slate-800 bg-white font-semibold text-indigo-900"
            >
              <option value="trending">Trending (Backers count)</option>
              <option value="merit_score">Highest Merit Score</option>
              <option value="most_backed">Highest Raised (₹)</option>
              <option value="ending_soon">Ending Soon</option>
              <option value="newest">Recently Listed</option>
            </select>
          </div>

          {/* Reset Action */}
          <div className="flex items-end col-span-2 sm:col-span-1">
            <button
              onClick={resetFilters}
              className="w-full p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-colors font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 pb-1 scrollbar-none">
          {categories.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-indigo-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

      </div>

      {/* Results Count & Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 gap-2">
        <span>
          Showing <strong>{filteredCampaigns.length}</strong> grassroots innovations
        </span>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-slate-500">
            Tip: Click <strong>+ Compare</strong> on cards to evaluate up to 3 projects side-by-side
          </span>
          {compareIds.length > 0 && (
            <button
              onClick={() => setCompareModalOpen(true)}
              className="text-indigo-800 hover:text-indigo-950 font-bold underline"
            >
              View Comparison ({compareIds.length})
            </button>
          )}
        </div>
      </div>

      {/* Campaigns Grid */}
      {filteredCampaigns.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
          <Compass className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No campaigns matched your filters</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your category, city, or status filters to view other grassroots innovations.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-indigo-900 text-white rounded-lg text-xs font-semibold mt-2"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map(camp => (
            <CampaignCard
              key={camp.id}
              campaign={camp}
              onClick={() => onSelectCampaign(camp.id)}
              onToggleCompare={() => toggleCompare(camp.id)}
              isCompared={compareIds.includes(camp.id)}
            />
          ))}
        </div>
      )}

      {/* Floating Compare Action Dock */}
      {compareIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-lg w-[94%] bg-indigo-950 text-white rounded-2xl p-3 shadow-2xl border-2 border-amber-400 flex items-center justify-between gap-3 animate-in slide-in-from-bottom-3 fade-in duration-200">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-7 h-7 rounded-lg bg-amber-400 text-indigo-950 font-black flex items-center justify-center shrink-0 text-xs">
              {compareIds.length}
            </div>
            <div className="min-w-0">
              <span className="font-bold text-xs block text-white truncate">
                {compareIds.length} innovation{compareIds.length > 1 ? 's' : ''} ready to compare
              </span>
              <span className="text-[10px] text-indigo-200 truncate block">
                {compareCampaigns.map(c => c.title).join(' · ')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setCompareModalOpen(true)}
              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-indigo-950 font-bold text-xs rounded-xl shadow-xs transition-colors whitespace-nowrap"
            >
              Compare Now
            </button>
            <button
              onClick={() => setCompareIds([])}
              className="text-slate-300 hover:text-white p-1 text-xs"
              title="Clear all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Side-by-Side Comparison Modal */}
      {compareModalOpen && (
        <CompareModal
          campaigns={compareCampaigns}
          onClose={() => setCompareModalOpen(false)}
          onRemoveCampaign={(id) => {
            const next = compareIds.filter(cId => cId !== id);
            setCompareIds(next);
            if (next.length === 0) setCompareModalOpen(false);
          }}
          onSelectCampaign={onSelectCampaign}
        />
      )}

    </div>
  );
};
