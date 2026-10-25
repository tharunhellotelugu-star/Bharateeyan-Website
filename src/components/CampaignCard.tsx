import React from 'react';
import { Campaign } from '../types';
import { formatINR, formatINRLakh } from '../utils/formatters';
import { CommunityValidatedBadge } from './CommunityValidatedBadge';
import {
  MapPin,
  Clock,
  Users,
  CheckCircle,
  Sun,
  Code,
  Scissors,
  Wheat,
  Shield,
  Leaf,
  Mic,
  Droplet,
  HeartHandshake,
  Zap,
  BookOpen,
  Briefcase,
  Snowflake,
  AlertCircle,
  Sparkles
} from 'lucide-react';

interface CampaignCardProps {
  campaign: Campaign;
  onClick: () => void;
  onToggleCompare?: () => void;
  isCompared?: boolean;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({
  campaign,
  onClick,
  onToggleCompare,
  isCompared = false
}) => {
  const percentFunded = Math.round((campaign.raisedAmount / campaign.goalAmount) * 100);

  // Icon mapping
  const renderIcon = (name: string) => {
    const props = { className: 'w-7 h-7 text-white/90' };
    switch (name) {
      case 'Sun': return <Sun {...props} />;
      case 'Code': return <Code {...props} />;
      case 'Scissors': return <Scissors {...props} />;
      case 'Wheat': return <Wheat {...props} />;
      case 'Shield': return <Shield {...props} />;
      case 'Leaf': return <Leaf {...props} />;
      case 'Mic': return <Mic {...props} />;
      case 'Droplet': return <Droplet {...props} />;
      case 'HeartHandshake': return <HeartHandshake {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'BookOpen': return <BookOpen {...props} />;
      case 'Briefcase': return <Briefcase {...props} />;
      case 'Snowflake': return <Snowflake {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col h-full overflow-hidden group focus-visible:ring-2 focus-visible:ring-indigo-600"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Visual Product/Banner Slot (Authentic Indian Gradient + Maker Initials) */}
      <div className={`relative h-44 bg-gradient-to-br ${campaign.cardGradient} p-4 flex flex-col justify-between text-white overflow-hidden`}>
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {/* Top Badges */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold bg-black/30 backdrop-blur-xs px-2.5 py-0.5 rounded-md border border-white/10 uppercase tracking-wider">
              {campaign.category}
            </span>
            {onToggleCompare && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleCompare();
                }}
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all flex items-center gap-1 ${
                  isCompared
                    ? 'bg-amber-400 text-indigo-950 shadow-xs ring-1 ring-amber-300'
                    : 'bg-black/40 hover:bg-black/60 text-white border border-white/20'
                }`}
                title={isCompared ? 'Remove from compare' : 'Add to compare (up to 3)'}
              >
                <span>{isCompared ? '✓ Comparing' : '+ Compare'}</span>
              </button>
            )}
          </div>
          {campaign.communityValidated && (
            <CommunityValidatedBadge size="sm" />
          )}
        </div>

        {/* Center Product Icon Illustration */}
        <div className="relative z-10 flex items-center justify-center my-auto">
          <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
            {renderIcon(campaign.iconName)}
          </div>
        </div>

        {/* Bottom City & Merit Score Float */}
        <div className="relative z-10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-white/90 font-medium">
            <MapPin className="w-3.5 h-3.5 text-amber-300" />
            <span>{campaign.city}, {campaign.state}</span>
          </div>
          <div className="bg-indigo-950/80 backdrop-blur-xs px-2 py-0.5 rounded-md border border-white/15 text-[11px] font-bold text-amber-300">
            Merit {campaign.meritScore.totalScore}/100
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Founder line (Strictly no college or employer field!) */}
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-5 h-5 rounded-full bg-gradient-to-tr ${campaign.founder.avatarBg} text-white font-bold text-[9px] flex items-center justify-center`}>
              {campaign.founder.initials}
            </div>
            <span className="text-xs font-semibold text-slate-800">
              {campaign.founder.name}
            </span>
            <span title="Verified Indian Maker">
              <CheckCircle className="w-3 h-3 text-indigo-600" />
            </span>
            <span className="text-[10px] text-slate-500 truncate">
              · {campaign.founder.pastCampaignsCount > 0 ? `${campaign.founder.pastCampaignsCount} past fulfilled batch` : 'Grassroots Maker'}
            </span>
          </div>

          {/* Title & Tagline */}
          <h3 className="font-bold text-slate-950 text-base leading-snug group-hover:text-indigo-900 transition-colors line-clamp-1 mb-1.5">
            {campaign.title}
          </h3>
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {campaign.tagline}
          </p>
        </div>

        {/* Progress & Metrics */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          
          {/* Progress Bar */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-bold text-slate-900">
                {percentFunded}% funded
              </span>
              <span className="text-slate-500 font-medium">
                Goal {formatINRLakh(campaign.goalAmount)}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  percentFunded >= 100 ? 'bg-emerald-600' : 'bg-indigo-600'
                }`}
                style={{ width: `${Math.min(percentFunded, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Bottom Financial Row */}
          <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
            <div>
              <span className="font-bold text-slate-950 block text-sm">
                {formatINR(campaign.raisedAmount)}
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                Pre-purchased
              </span>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1 font-semibold text-slate-800">
                <Users className="w-3.5 h-3.5 text-indigo-700" />
                <span>{campaign.backersCount}</span>
              </div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                Backers
              </span>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1 font-semibold text-slate-800">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>{campaign.status === 'failed' ? 'Ended' : `${campaign.daysLeft}d left`}</span>
              </div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                {campaign.status === 'funded' ? 'Target Met' : 'Deadline'}
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
