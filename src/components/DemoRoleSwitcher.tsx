import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Role } from '../types';
import {
  Users,
  User,
  Sparkles,
  Briefcase,
  ShieldAlert,
  ChevronUp,
  RotateCcw,
  CheckCircle2,
  X
} from 'lucide-react';

interface DemoRoleSwitcherProps {
  navigate: (path: string) => void;
}

export const DemoRoleSwitcher: React.FC<DemoRoleSwitcherProps> = ({ navigate }) => {
  const { role, setRole, resetDemoData } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const roles: {
    id: Role;
    name: string;
    persona: string;
    location: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    defaultRedirect: string;
  }[] = [
    {
      id: 'guest',
      name: 'Public Guest',
      persona: 'Unregistered Visitor',
      location: 'Anywhere',
      description: 'Browse campaigns, test filters, pre-order perks with simulated OTP & UPI.',
      icon: <Users className="w-4 h-4 text-slate-700" />,
      color: 'border-slate-300 hover:border-slate-400',
      defaultRedirect: '/explore'
    },
    {
      id: 'backer',
      name: 'Citizen Backer',
      persona: 'Priya Reddy',
      location: 'Hyderabad',
      description: 'View "My Backed Projects", track reward shipping, rate founders, raise grievances.',
      icon: <User className="w-4 h-4 text-amber-700" />,
      color: 'border-amber-300 hover:border-amber-400 bg-amber-50/40',
      defaultRedirect: '/backer-dashboard'
    },
    {
      id: 'founder',
      name: 'Grassroots Founder',
      persona: 'Ravi Kumar',
      location: 'Warangal',
      description: 'Manage SuryaDry, post backer updates, upload shipping proof, view 60/40 staged payouts.',
      icon: <Sparkles className="w-4 h-4 text-indigo-700" />,
      color: 'border-indigo-300 hover:border-indigo-400 bg-indigo-50/40',
      defaultRedirect: '/founder-dashboard'
    },
    {
      id: 'investor',
      name: 'Accredited Angel',
      persona: 'Meera Angel Fund',
      location: 'Bengaluru',
      description: 'Access exclusive Deal Room, see Merit Score 70+ validated startups, request intros.',
      icon: <Briefcase className="w-4 h-4 text-emerald-700" />,
      color: 'border-emerald-300 hover:border-emerald-400 bg-emerald-50/40',
      defaultRedirect: '/investor-deal-room'
    },
    {
      id: 'admin',
      name: 'Platform Governance',
      persona: 'Compliance & Escrow Admin',
      location: 'HQ',
      description: 'Review campaigns, flag equity words, release 60%/40% escrow, simulate deadlines & refunds.',
      icon: <ShieldAlert className="w-4 h-4 text-rose-700" />,
      color: 'border-rose-300 hover:border-rose-400 bg-rose-50/40',
      defaultRedirect: '/admin-panel'
    }
  ];

  const handleSelectRole = (r: Role, redirectPath: string) => {
    setRole(r);
    setIsOpen(false);
    navigate(redirectPath);
  };

  const currentRoleObj = roles.find(r => r.id === role) || roles[0];

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-2.5 bg-indigo-950 text-white rounded-full shadow-xl border-2 border-amber-400 hover:bg-indigo-900 transition-all hover:scale-105 active:scale-95 group"
        title="Switch Demo Role"
        aria-label="Demo Role Switcher"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">Demo Role:</span>
        <span className="text-xs font-bold truncate max-w-[140px] text-white">
          {currentRoleObj.persona}
        </span>
        <ChevronUp className={`w-4 h-4 text-amber-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 w-88 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-150">
          
          {/* Header */}
          <div className="bg-indigo-950 text-white p-4 flex items-center justify-between border-b border-indigo-900">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Interactive Demo Switcher</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Switch user persona to test specific workflows instantly:
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List of Roles */}
          <div className="p-3 space-y-2 max-h-[420px] overflow-y-auto">
            {roles.map(r => {
              const isSelected = r.id === role;
              return (
                <button
                  key={r.id}
                  onClick={() => handleSelectRole(r.id, r.defaultRedirect)}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex items-start gap-3 ${r.color} ${
                    isSelected ? 'ring-2 ring-indigo-600 shadow-xs' : ''
                  }`}
                >
                  <div className="mt-0.5 p-1.5 rounded-lg bg-white shadow-xs border border-slate-200 shrink-0">
                    {r.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-slate-900 truncate">
                        {r.persona}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {r.location}
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-indigo-700">
                      {r.name}
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                      {r.description}
                    </p>
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer with Reset button */}
          <div className="bg-slate-50 p-3 border-t border-slate-200 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">Persists in localStorage</span>
            <button
              onClick={() => {
                resetDemoData();
                setIsOpen(false);
                navigate('/');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 py-1.5 px-3 rounded-lg border border-rose-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Seed</span>
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
