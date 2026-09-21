import React, { useState } from 'react';
import { useIMR } from '../../context/IMRContext';
import { useCursor } from '../../context/CursorContext';
import { MagneticButton } from '../cursor/MagneticButton';
import {
  Users,
  ShieldCheck,
  Star,
  Building2,
  Globe2,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Award,
  ChevronRight,
} from 'lucide-react';
import type { UserProfile, UserRole } from '../../types';

interface StakeholderBentoProps {
  onSelectUser: (user: UserProfile) => void;
  onOpenMessages: (userId: string) => void;
  onViewAllProfiles: () => void;
}

const ROLE_CATEGORIES = [
  { id: 'all', label: 'All 9 Personas' },
  { id: 'creators', label: 'Idea Creators & Inventors' },
  { id: 'investors', label: 'Investors & Syndicates' },
  { id: 'exporters', label: 'Exporters & Suppliers' },
  { id: 'manufacturers', label: 'Manufacturers & OEMs' },
  { id: 'buyers', label: 'Importers & Enterprise Buyers' },
  { id: 'consultants', label: 'Trade Consultants' },
];

export const StakeholderBento: React.FC<StakeholderBentoProps> = ({
  onSelectUser,
  onOpenMessages,
  onViewAllProfiles,
}) => {
  const { users, currentUser, switchRole, startConversationWith, setActiveTab } = useIMR();
  const { setCursor } = useCursor();
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredUsers = users.filter((u) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'creators')
      return u.role === 'business_idea_creator' || u.role === 'entrepreneur';
    if (activeFilter === 'investors') return u.role === 'investor';
    if (activeFilter === 'exporters')
      return u.role === 'exporter' || u.role === 'supplier';
    if (activeFilter === 'manufacturers') return u.role === 'manufacturer';
    if (activeFilter === 'buyers')
      return u.role === 'buyer' || u.role === 'importer';
    if (activeFilter === 'consultants') return u.role === 'business_consultant';
    return true;
  });

  const handleDirectConnect = (e: React.MouseEvent, user: UserProfile) => {
    e.stopPropagation();
    startConversationWith(
      user.id,
      `Partnership Inquiry with ${user.company || user.name}`,
      'general',
      `Hello ${user.name}, I am interested in collaborating on international opportunities.`
    );
    setActiveTab('messages');
  };

  return (
    <section
      id="stakeholders"
      className="py-24 px-4 sm:px-8 bg-[#F3EFE7] border-t border-[#D8D2C7] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFDF8] border border-[#D8D2C7] text-[11px] font-mono tracking-wider text-[#171717] uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A8C7B5]" />
              <span>Section 03 // 9 Stakeholder Ecosystem</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#171717] tracking-tight leading-[1.02]">
              GLOBAL ARCHITECTS <br />
              <span className="font-display font-semibold italic text-[#FF5A36]">
                & INDUSTRY CAPITAL
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-[#6B6B63] font-sans leading-relaxed">
            Directly connect across verified creators, institutional venture syndicates, ISO-certified precision factories, and licensed customs brokers.
          </p>
        </div>

        {/* Filter Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {ROLE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all whitespace-nowrap ${
                activeFilter === cat.id
                  ? 'bg-[#171717] text-[#FFFDF8] shadow-md'
                  : 'bg-[#FFFDF8] text-[#6B6B63] hover:text-[#171717] border border-[#D8D2C7]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredUsers.slice(0, 7).map((user, idx) => {
            const isLarge = idx === 0;

            return (
              <div
                key={user.id}
                onClick={() => onSelectUser(user)}
                onMouseEnter={() => setCursor('CONNECT', 'connect')}
                onMouseLeave={() => setCursor(null)}
                className={`group rounded-3xl bg-[#FFFDF8] border border-[#D8D2C7] hover:border-[#FF5A36] p-6 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                  isLarge
                    ? 'md:col-span-2 md:row-span-2 p-8 bg-gradient-to-br from-[#FFFDF8] to-[#F3EFE7]'
                    : ''
                }`}
              >
                {/* Top User Metadata */}
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className={`${
                            isLarge ? 'w-16 h-16' : 'w-12 h-12'
                          } rounded-2xl object-cover border border-[#D8D2C7] shadow-sm`}
                        />
                        {user.verifiedTier === 'tier3_global_trade' && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#171717] text-[#FFFDF8] flex items-center justify-center text-[10px] border border-[#FFFDF8]">
                            ✓
                          </div>
                        )}
                      </div>

                      <div>
                        <h4
                          className={`font-bold text-[#171717] group-hover:text-[#FF5A36] transition-colors leading-snug ${
                            isLarge ? 'text-xl' : 'text-sm'
                          }`}
                        >
                          {user.name}
                        </h4>
                        <p className="text-xs text-[#6B6B63] font-mono line-clamp-1">
                          {user.company}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#F3EFE7] border border-[#D8D2C7] text-[#171717] font-bold">
                        {user.role.replace(/_/g, ' ')}
                      </span>
                      <span className="text-[10px] text-[#6B6B63] font-mono mt-1">
                        {user.country}
                      </span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p
                    className={`text-[#6B6B63] leading-relaxed mb-4 ${
                      isLarge ? 'text-sm line-clamp-4' : 'text-xs line-clamp-2'
                    }`}
                  >
                    {user.bio}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {user.verificationBadges.slice(0, isLarge ? 4 : 2).map((badge, bIdx) => (
                      <span
                        key={bIdx}
                        className="px-2 py-0.5 rounded-md bg-[#F3EFE7] border border-[#D8D2C7]/70 text-[10px] font-mono text-[#171717] flex items-center gap-1"
                      >
                        <ShieldCheck className="w-2.5 h-2.5 text-[#A8C7B5]" />
                        <span>{badge}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Footer & Direct Connect CTA */}
                <div className="pt-4 border-t border-[#D8D2C7]/70 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5 text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span className="text-xs font-mono font-bold text-[#171717]">
                        {user.reputationScore}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#6B6B63] font-mono">
                      ({user.reviewsCount} deals)
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleDirectConnect(e, user)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#171717] hover:bg-[#FF5A36] text-[#FFFDF8] text-xs font-bold font-mono tracking-wider transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>CONNECT</span>
                  </button>
                </div>
              </div>
            );
          })}

          {/* Bento Card: Role Switcher / Join Ecosystem CTA */}
          <div className="rounded-3xl bg-[#171717] text-[#FFFDF8] p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden md:col-span-1 lg:col-span-1">
            <div className="relative z-10">
              <span className="w-8 h-8 rounded-full bg-[#FF5A36] flex items-center justify-center text-xs font-bold mb-4">
                ★
              </span>
              <h4 className="font-editorial text-2xl font-bold mb-2">
                JOIN THE IMR ALLIANCE
              </h4>
              <p className="text-xs text-[#EBE5DA]/80 leading-relaxed">
                Whether you have an IP patent or a certified manufacturing factory, list your capability to receive direct cross-border trade mandates.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/15 relative z-10 space-y-3">
              <button
                onClick={onViewAllProfiles}
                className="w-full py-2.5 px-4 rounded-xl bg-[#FFFDF8] hover:bg-[#EBE5DA] text-[#171717] text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
              >
                <span>Explore All Profiles</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
