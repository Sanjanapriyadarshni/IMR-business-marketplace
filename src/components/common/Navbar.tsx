import React, { useState } from 'react';
import { useIMR } from '../../context/IMRContext';
import {
  Search,
  ShieldCheck,
  Smartphone,
  Monitor,
  UserCheck,
  ChevronDown,
  Sparkles,
  ShieldAlert,
  Crown,
} from 'lucide-react';
import type { UserRole } from '../../types';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenSafety: () => void;
}

const ROLE_LABELS: Record<UserRole, { label: string; badgeColor: string }> = {
  business_idea_creator: { label: 'Idea Creator', badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
  entrepreneur: { label: 'Entrepreneur', badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30' },
  investor: { label: 'Investor', badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  exporter: { label: 'Exporter', badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  importer: { label: 'Importer', badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  manufacturer: { label: 'Manufacturer', badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
  supplier: { label: 'Supplier', badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
  buyer: { label: 'Buyer', badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
  business_consultant: { label: 'Consultant', badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
  admin: { label: 'Platform Admin', badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30' },
};

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onOpenSafety }) => {
  const {
    currentUser,
    switchRole,
    isMobileFrame,
    setIsMobileFrame,
    activeTab,
    setActiveTab,
    threads,
  } = useIMR();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const unreadMessagesCount = threads.reduce((acc, t) => acc + (t.unreadCount || 0), 0);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 via-emerald-500 to-blue-600 p-0.5 shadow-lg shadow-teal-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-lg tracking-wider bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent">
                  IMR
                </span>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base text-white tracking-tight">IMR Market</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  Global
                </span>
              </div>
              <p className="text-[11px] text-slate-400 -mt-0.5">International Business & Idea Exchange</p>
            </div>
          </div>
        </div>

        {/* Global Search Bar (Trigger) */}
        <button
          onClick={onOpenSearch}
          className="flex-1 max-w-md hidden md:flex items-center justify-between px-3.5 py-2 bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-slate-400 text-xs transition-all shadow-inner group"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
            <span className="truncate">Search ideas, products, HS codes, partners...</span>
          </div>
          <kbd className="hidden lg:inline-block text-[10px] font-mono bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">
            Ctrl + K
          </kbd>
        </button>

        {/* Right Action Icons & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile search icon */}
          <button
            onClick={onOpenSearch}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-teal-400" />
          </button>

          {/* Device Frame Viewport Switcher */}
          <button
            onClick={() => setIsMobileFrame((prev) => !prev)}
            title={isMobileFrame ? 'Switch to Full Screen View' : 'Switch to Mobile App Preview Frame'}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-medium transition-all ${
              isMobileFrame
                ? 'bg-teal-500/15 border-teal-500/40 text-teal-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {isMobileFrame ? (
              <>
                <Smartphone className="w-3.5 h-3.5 text-teal-400" />
                <span>Mobile Frame ON</span>
              </>
            ) : (
              <>
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop View</span>
              </>
            )}
          </button>

          {/* Trust & Safety Trigger */}
          <button
            onClick={onOpenSafety}
            title="Trust, Safety & Legal Disclaimers"
            className="p-2 rounded-xl text-slate-400 hover:text-teal-300 hover:bg-slate-900 border border-slate-800/80 transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-teal-400" />
          </button>

          {/* Monetization / Pro Button */}
          <button
            onClick={() => setActiveTab('monetization')}
            className={`hidden md:flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              activeTab === 'monetization'
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-amber-500/10'
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Pricing</span>
          </button>

          {/* Role Switcher Menu */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all text-xs"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-lg object-cover border border-slate-700"
              />
              <div className="text-left hidden lg:block">
                <div className="font-semibold text-white leading-tight flex items-center gap-1">
                  <span className="truncate max-w-[110px]">{currentUser.name.split(' ')[0]}</span>
                  <span className="text-[10px]">{currentUser.countryCode === 'IN' ? '🇮🇳' : currentUser.countryCode === 'AE' ? '🇦🇪' : currentUser.countryCode === 'GB' ? '🇬🇧' : currentUser.countryCode === 'SG' ? '🇸🇬' : '🌐'}</span>
                </div>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded border font-semibold inline-block mt-0.5 ${
                    ROLE_LABELS[currentUser.role]?.badgeColor
                  }`}
                >
                  {ROLE_LABELS[currentUser.role]?.label}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Dropdown Menu */}
            {roleDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setRoleDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl z-50 p-2 animate-in fade-in slide-in-from-top-2">
                  <div className="p-2.5 border-b border-slate-800/80 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Switch Active Business Role
                    </span>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Experience IMR through different stakeholder perspectives:
                    </p>
                  </div>

                  <div className="space-y-1 max-h-72 overflow-y-auto no-scrollbar">
                    {(Object.keys(ROLE_LABELS) as UserRole[]).map((role) => (
                      <button
                        key={role}
                        onClick={() => {
                          switchRole(role);
                          setRoleDropdownOpen(false);
                          if (role === 'admin') {
                            setActiveTab('admin');
                          }
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-colors ${
                          currentUser.role === role
                            ? 'bg-teal-500/15 text-teal-300 font-semibold'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-3.5 h-3.5 opacity-60" />
                          <span>{ROLE_LABELS[role].label}</span>
                        </div>
                        {currentUser.role === role && (
                          <span className="text-[10px] font-bold text-teal-400">ACTIVE</span>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="pt-2 mt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                    <button
                      onClick={() => {
                        setActiveTab('profile');
                        setRoleDropdownOpen(false);
                      }}
                      className="w-full text-center py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium"
                    >
                      View Full Profile
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
