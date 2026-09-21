import React, { useState, useEffect } from 'react';
import { useIMR } from '../../context/IMRContext';
import { useCursor } from '../../context/CursorContext';
import {
  Search,
  ShieldCheck,
  ChevronDown,
  UserCheck,
  Globe2,
  Sparkles,
  Command,
} from 'lucide-react';
import type { UserRole } from '../../types';

interface FloatingNavProps {
  onOpenSearch: () => void;
  onOpenSafety: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

const ROLE_LABELS: Record<UserRole, { label: string; tag: string }> = {
  business_idea_creator: { label: 'Idea Creator', tag: 'Creator' },
  entrepreneur: { label: 'Entrepreneur', tag: 'Builder' },
  investor: { label: 'Investor', tag: 'Capital' },
  exporter: { label: 'Exporter', tag: 'Export' },
  importer: { label: 'Importer', tag: 'Import' },
  manufacturer: { label: 'Manufacturer', tag: 'OEM' },
  supplier: { label: 'Supplier', tag: 'Supply' },
  buyer: { label: 'Buyer', tag: 'Procure' },
  business_consultant: { label: 'Consultant', tag: 'Advisory' },
  admin: { label: 'Admin Desk', tag: 'Control' },
};

export const FloatingNav: React.FC<FloatingNavProps> = ({
  onOpenSearch,
  onOpenSafety,
  onNavigateSection,
}) => {
  const { currentUser, switchRole, activeTab, setActiveTab } = useIMR();
  const { setCursor } = useCursor();
  const [isScrolled, setIsScrolled] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Discover', target: 'discover-hero', tab: 'home' },
    { label: 'Markets', target: 'global-markets', tab: 'countries' },
    { label: 'Ecosystem', target: 'stakeholders', tab: 'matching' },
    { label: 'Ideas', target: 'innovation-showcase', tab: 'ideas' },
    { label: 'Marketplace', target: 'unified-marketplace', tab: 'trade' },
  ];

  const handleLinkClick = (item: typeof navLinks[0]) => {
    if (activeTab !== 'home') {
      setActiveTab('home');
      setTimeout(() => {
        const el = document.getElementById(item.target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(item.target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-40 px-4 sm:px-8 flex justify-center pointer-events-none transition-all duration-300">
      <nav
        className={`pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-2.5 transition-all duration-500 ease-out ${
          isScrolled
            ? 'w-full max-w-5xl rounded-full bg-[#FFFDF8]/92 backdrop-blur-md border border-[#D8D2C7] shadow-xl shadow-[#171717]/5'
            : 'w-full max-w-7xl rounded-2xl bg-transparent border border-transparent'
        }`}
      >
        {/* Brand Monogram */}
        <div
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onMouseEnter={() => setCursor('IMR', 'open')}
          onMouseLeave={() => setCursor(null)}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-[#171717] text-[#FFFDF8] flex items-center justify-center font-display font-black text-xs tracking-wider group-hover:bg-[#FF5A36] transition-colors">
            IMR
          </div>
          <span className="font-editorial text-xl font-bold tracking-tight text-[#171717] hidden sm:inline-block">
            IMR <span className="font-sans text-[11px] font-mono tracking-widest text-[#6B6B63] uppercase">Global</span>
          </span>
        </div>

        {/* Center Links (Editorial Navigation) */}
        <div className="hidden md:flex items-center gap-1 sm:gap-2 text-xs font-medium text-[#6B6B63]">
          {navLinks.map((item) => (
            <button
              key={item.label}
              onClick={() => handleLinkClick(item)}
              onMouseEnter={() => setCursor(item.label.toUpperCase(), 'open')}
              onMouseLeave={() => setCursor(null)}
              className="px-3 py-1.5 rounded-full hover:text-[#171717] hover:bg-[#F3EFE7] transition-all tracking-wide"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right Actions: Search + Role Switcher + Safety */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Expandable Search Trigger */}
          <button
            onClick={onOpenSearch}
            onMouseEnter={() => setCursor('SEARCH', 'open')}
            onMouseLeave={() => setCursor(null)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFDF8] hover:bg-[#EBE5DA] border border-[#D8D2C7] text-xs text-[#171717] transition-all shadow-sm group"
          >
            <Search className="w-3.5 h-3.5 text-[#FF5A36] group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline text-[#6B6B63]">Search</span>
            <kbd className="hidden lg:inline text-[9px] font-mono px-1 py-0.2 rounded bg-[#EBE5DA] text-[#6B6B63] border border-[#D8D2C7]">
              ⌘K
            </kbd>
          </button>

          {/* Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen((prev) => !prev)}
              onMouseEnter={() => setCursor('ROLE', 'open')}
              onMouseLeave={() => setCursor(null)}
              className="flex items-center gap-2 p-1 sm:px-3 sm:py-1 rounded-full bg-[#FFFDF8] border border-[#D8D2C7] hover:border-[#171717] text-xs text-[#171717] transition-all shadow-sm"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-5 h-5 rounded-full object-cover border border-[#D8D2C7]"
              />
              <span className="hidden lg:inline font-semibold text-[11px] truncate max-w-[100px]">
                {currentUser.name.split(' ')[0]}
              </span>
              <span className="hidden sm:inline text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[#A8C7B5]/30 text-[#171717] font-bold">
                {ROLE_LABELS[currentUser.role]?.tag}
              </span>
              <ChevronDown className="w-3 h-3 text-[#6B6B63]" />
            </button>

            {/* Role Dropdown */}
            {roleDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setRoleDropdownOpen(false)} />
                <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#FFFDF8] border border-[#D8D2C7] shadow-2xl z-50 p-2 text-xs animate-in fade-in zoom-in-95">
                  <div className="p-2.5 border-b border-[#D8D2C7] mb-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#6B6B63] block">
                      Perspective Switcher
                    </span>
                    <p className="text-[11px] text-[#171717] mt-0.5">
                      Interact as any of the 9 global business roles:
                    </p>
                  </div>

                  <div className="space-y-0.5 max-h-64 overflow-y-auto no-scrollbar">
                    {(Object.keys(ROLE_LABELS) as UserRole[]).map((r) => (
                      <button
                        key={r}
                        onClick={() => {
                          switchRole(r);
                          setRoleDropdownOpen(false);
                          if (r === 'admin') setActiveTab('admin');
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors ${
                          currentUser.role === r
                            ? 'bg-[#171717] text-[#FFFDF8] font-bold'
                            : 'text-[#171717] hover:bg-[#F3EFE7]'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <UserCheck className="w-3.5 h-3.5 opacity-60 shrink-0" />
                          <span className="truncate">{ROLE_LABELS[r].label}</span>
                        </div>
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full ${
                            currentUser.role === r
                              ? 'bg-[#FF5A36] text-white'
                              : 'bg-[#EBE5DA] text-[#6B6B63]'
                          }`}
                        >
                          {ROLE_LABELS[r].tag}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="pt-2 mt-1 border-t border-[#D8D2C7]">
                    <button
                      onClick={() => {
                        setActiveTab('profile');
                        setRoleDropdownOpen(false);
                      }}
                      className="w-full text-center py-1.5 rounded-xl bg-[#F3EFE7] hover:bg-[#EBE5DA] text-[#171717] font-semibold text-xs transition-colors"
                    >
                      View Profile Credentials
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Trust & Safety guidelines */}
          <button
            onClick={onOpenSafety}
            onMouseEnter={() => setCursor('TRUST', 'open')}
            onMouseLeave={() => setCursor(null)}
            title="Trust, Safety & Verification"
            className="p-1.5 rounded-full text-[#6B6B63] hover:text-[#171717] hover:bg-[#EBE5DA] transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-[#A8C7B5]" />
          </button>
        </div>
      </nav>
    </header>
  );
};
