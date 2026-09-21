import React from 'react';
import { useIMR } from '../../context/IMRContext';
import { useCursor } from '../../context/CursorContext';
import {
  Globe2,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
  Heart,
  Scale,
  Compass,
  FileCheck,
} from 'lucide-react';

interface EditorialFooterProps {
  onOpenSafety: () => void;
  onSelectCountry: (code: string) => void;
}

export const EditorialFooter: React.FC<EditorialFooterProps> = ({
  onOpenSafety,
  onSelectCountry,
}) => {
  const { setActiveTab } = useIMR();
  const { setCursor } = useCursor();

  return (
    <footer className="bg-[#171717] text-[#FFFDF8] pt-20 pb-12 px-4 sm:px-8 border-t border-[#D8D2C7]/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-editorial text-4xl font-bold text-[#FFFDF8] tracking-tight">
                IMR
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FF5A36] text-[#FFFDF8] text-[10px] font-mono font-bold tracking-widest uppercase">
                EXCHANGE
              </span>
            </div>

            <p className="text-sm text-[#FFFDF8]/70 max-w-sm font-sans leading-relaxed">
              The international business opportunity & idea marketplace. Engineered for innovators, manufacturers, certified exporters, and venture syndicates across 48 trade lanes.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A8C7B5]" />
              <span className="text-xs font-mono text-[#FFFDF8]/60">
                Network Status: 48 Corridors Active • Zero Outages
              </span>
            </div>
          </div>

          {/* Navigation Col 1: Ecosystem Personas */}
          <div>
            <h4 className="font-mono text-xs font-bold text-[#FF5A36] uppercase tracking-wider mb-4">
              9 Stakeholders
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FFFDF8]/70">
              <li>
                <button
                  onClick={() => setActiveTab('ideas')}
                  className="hover:text-[#FFFDF8] transition-colors"
                >
                  Idea Creators & Inventors
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('trade')}
                  className="hover:text-[#FFFDF8] transition-colors"
                >
                  Exporters & Suppliers
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('trade')}
                  className="hover:text-[#FFFDF8] transition-colors"
                >
                  Manufacturers & OEMs
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('matching')}
                  className="hover:text-[#FFFDF8] transition-colors"
                >
                  Venture Capital & Angels
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('trade')}
                  className="hover:text-[#FFFDF8] transition-colors"
                >
                  Importers & Wholesale Buyers
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('profile')}
                  className="hover:text-[#FFFDF8] transition-colors"
                >
                  Trade Consultants
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation Col 2: Corridors & Intelligence */}
          <div>
            <h4 className="font-mono text-xs font-bold text-[#FF5A36] uppercase tracking-wider mb-4">
              Trade Corridors
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FFFDF8]/70">
              <li>
                <button
                  onClick={() => {
                    onSelectCountry('IN');
                    setActiveTab('countries');
                  }}
                  className="hover:text-[#FFFDF8] transition-colors flex items-center gap-1.5"
                >
                  <span>🇮🇳 India ➔ 🇦🇪 UAE (CEPA)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCountry('DE');
                    setActiveTab('countries');
                  }}
                  className="hover:text-[#FFFDF8] transition-colors flex items-center gap-1.5"
                >
                  <span>🇩🇪 Germany ➔ 🇺🇸 USA</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCountry('SG');
                    setActiveTab('countries');
                  }}
                  className="hover:text-[#FFFDF8] transition-colors flex items-center gap-1.5"
                >
                  <span>🇸🇬 Singapore (RCEP Hub)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCountry('AU');
                    setActiveTab('countries');
                  }}
                  className="hover:text-[#FFFDF8] transition-colors flex items-center gap-1.5"
                >
                  <span>🇦🇺 Australia (ECTA Pacts)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('countries')}
                  className="hover:text-[#FF5A36] text-[#A8C7B5] transition-colors flex items-center gap-1"
                >
                  <span>View All 48 Corridors</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation Col 3: Trust & Verification */}
          <div>
            <h4 className="font-mono text-xs font-bold text-[#FF5A36] uppercase tracking-wider mb-4">
              Governance & Trust
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FFFDF8]/70">
              <li>
                <button
                  onClick={onOpenSafety}
                  className="hover:text-[#FFFDF8] transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#A8C7B5]" />
                  <span>Trust & Safety Framework</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('monetization')}
                  className="hover:text-[#FFFDF8] transition-colors"
                >
                  Verified Enterprise Badges
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('advanced_tech')}
                  className="hover:text-[#FFFDF8] transition-colors"
                >
                  Empirical Science Standards
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('admin')}
                  className="hover:text-[#FFFDF8] transition-colors"
                >
                  Moderation Portal
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#FFFDF8]/50">
          <div>
            © {new Date().getFullYear()} IMR International Market & Resource Platform. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-[#FFFDF8] cursor-pointer">Terms of Cross-Border Exchange</span>
            <span className="hover:text-[#FFFDF8] cursor-pointer">Privacy & Data Residency</span>
            <span className="hover:text-[#FFFDF8] cursor-pointer">WCO HS Harmonized System</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
