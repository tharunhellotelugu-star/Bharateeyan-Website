import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';

interface CommunityValidatedBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const CommunityValidatedBadge: React.FC<CommunityValidatedBadgeProps> = ({
  size = 'md',
  showSubtitle = false,
}) => {
  if (size === 'sm') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 shadow-2xs whitespace-nowrap">
        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
        <span>Community Validated</span>
      </span>
    );
  }

  if (size === 'lg') {
    return (
      <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 text-emerald-950 shadow-xs">
        <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0">
          <Award className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-900 leading-tight">
            <span>Community Validated Startup</span>
            <span className="text-[10px] bg-emerald-200 text-emerald-800 px-1.5 py-0.2 rounded font-mono">
              Score ≥ 70
            </span>
          </div>
          {showSubtitle && (
            <p className="text-[11px] text-emerald-700 leading-tight mt-0.5">
              Target reached · Verified grassroots backers · Listed in Angel Deal Room
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-emerald-900 bg-emerald-50 border border-emerald-300 shadow-2xs whitespace-nowrap">
      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
      <span>Community Validated</span>
    </span>
  );
};
