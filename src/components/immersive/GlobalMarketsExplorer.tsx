import React, { useState, useRef } from 'react';
import { useIMR } from '../../context/IMRContext';
import { useCursor } from '../../context/CursorContext';
import { MagneticButton } from '../cursor/MagneticButton';
import {
  Globe2,
  TrendingUp,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Package,
  Layers,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Percent,
} from 'lucide-react';
import type { CountryTradeProfile } from '../../types';

interface GlobalMarketsExplorerProps {
  onOpenCountry: (countryCode: string) => void;
  onExploreProducts: () => void;
}

interface MapNode {
  code: string;
  name: string;
  flag: string;
  x: number;
  y: number;
  labelPosition: 'top' | 'bottom' | 'left' | 'right';
  tradeCorridor: string;
  tariffSummary: string;
}

const MAP_NODES: MapNode[] = [
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    x: 215,
    y: 165,
    labelPosition: 'bottom',
    tradeCorridor: 'USMCA & Transatlantic Corridor',
    tariffSummary: '0% under USMCA / IRA Subsidies',
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    x: 475,
    y: 125,
    labelPosition: 'top',
    tradeCorridor: 'UK Global Tariff & CPTPP Corridor',
    tariffSummary: '0% duty on 60%+ import lines',
  },
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    x: 515,
    y: 135,
    labelPosition: 'top',
    tradeCorridor: 'EU Single Market & Machinery Axis',
    tariffSummary: 'EU Bio-Certification & CTT',
  },
  {
    code: 'SA',
    name: 'Saudi Arabia',
    flag: '🇸🇦',
    x: 595,
    y: 220,
    labelPosition: 'bottom',
    tradeCorridor: 'Vision 2030 & GCC Free Zone',
    tariffSummary: '5% Unified GCC Common External Tariff',
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    x: 625,
    y: 205,
    labelPosition: 'top',
    tradeCorridor: 'India-UAE CEPA Strategic Corridor',
    tariffSummary: '0% Tariffs on 90% Indian Goods',
  },
  {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    x: 685,
    y: 225,
    labelPosition: 'bottom',
    tradeCorridor: 'South Asia Export Powerhouse & CEPA',
    tariffSummary: 'Preferential export concessions',
  },
  {
    code: 'SG',
    name: 'Singapore',
    flag: '🇸🇬',
    x: 755,
    y: 280,
    labelPosition: 'bottom',
    tradeCorridor: 'ASEAN Entrepôt & High-Tech Logistics',
    tariffSummary: 'Duty-free port on 99% goods',
  },
  {
    code: 'JP',
    name: 'Japan',
    flag: '🇯🇵',
    x: 845,
    y: 165,
    labelPosition: 'top',
    tradeCorridor: 'East Asia RCEP & Precision Engineering',
    tariffSummary: 'Comprehensive EPA preferential rates',
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    x: 855,
    y: 365,
    labelPosition: 'bottom',
    tradeCorridor: 'ECTA Free Trade & Agri-Critical Minerals',
    tariffSummary: '0% duty under India-Australia ECTA',
  },
];

const TRADE_ARCS = [
  { from: 'IN', to: 'AE', label: 'CEPA Corridor' },
  { from: 'DE', to: 'US', label: 'Transatlantic' },
  { from: 'SG', to: 'JP', label: 'RCEP High-Tech' },
  { from: 'IN', to: 'GB', label: 'FTA Corridor' },
  { from: 'SA', to: 'SG', label: 'Petrochem Corridor' },
  { from: 'IN', to: 'AU', label: 'ECTA Mining/Agri' },
];

export const GlobalMarketsExplorer: React.FC<GlobalMarketsExplorerProps> = ({
  onOpenCountry,
  onExploreProducts,
}) => {
  const { countries } = useIMR();
  const { setCursor } = useCursor();
  const [selectedCode, setSelectedCode] = useState<string>('IN');
  const horizontalScrollRef = useRef<HTMLDivElement>(null);

  const selectedCountry =
    countries.find((c) => c.code === selectedCode) || countries[0];
  const selectedNode =
    MAP_NODES.find((n) => n.code === selectedCode) || MAP_NODES[5];

  const scrollStrip = (direction: 'left' | 'right') => {
    if (horizontalScrollRef.current) {
      const scrollAmount = 380;
      horizontalScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="global-markets"
      className="py-24 px-4 sm:px-8 bg-[#F3EFE7] border-t border-[#D8D2C7] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFDF8] border border-[#D8D2C7] text-[11px] font-mono tracking-wider text-[#171717] uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A36]" />
              <span>Section 02 // Bilateral Trade Corridors</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#171717] tracking-tight leading-[1.02]">
              GLOBAL MARKETS <br />
              <span className="font-display font-semibold italic text-[#FF5A36]">
                & TARIFF ADVANTAGES
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-[#6B6B63] font-sans leading-relaxed">
            Real-time trade intelligence on 48 international trade lanes. Discover preferential tariff rates, bilateral pacts (CEPA, USMCA, RCEP), and active buyer procurement.
          </p>
        </div>

        {/* Spatial 2D World Map Visualizer */}
        <div className="bg-[#FFFDF8] rounded-3xl border border-[#D8D2C7] shadow-lg p-6 sm:p-8 mb-12 relative overflow-hidden">
          {/* Top Map Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#D8D2C7] mb-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#171717] text-[#FFFDF8] flex items-center justify-center font-bold text-xs font-mono">
                2D
              </span>
              <div>
                <h3 className="font-bold text-sm text-[#171717]">Interactive Trade Map Projection</h3>
                <p className="text-xs text-[#6B6B63]">Click any node to spotlight bilateral corridor intelligence</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#6B6B63]">Active Node:</span>
              <span className="px-3 py-1 rounded-full bg-[#F3EFE7] border border-[#D8D2C7] text-xs font-bold text-[#171717] flex items-center gap-1.5">
                <span>{selectedNode.flag}</span>
                <span>{selectedNode.name}</span>
                <span className="text-[#FF5A36] font-mono text-[10px]">({selectedNode.code})</span>
              </span>
            </div>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full aspect-[2/1] min-h-[340px] max-h-[520px] bg-[#F3EFE7]/50 rounded-2xl border border-[#D8D2C7]/60 overflow-hidden flex items-center justify-center">
            {/* Background Grid Lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D8D2C7" strokeWidth="0.75" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#mapGrid)" />
            </svg>

            {/* Stylized Vector World Map Projection */}
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full object-contain select-none"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Continents Silhouettes (Abstract Stylized Geometry) */}
              {/* North America */}
              <path
                d="M 120 90 Q 200 60 270 90 T 320 150 Q 300 230 250 250 T 210 220 Q 140 180 120 90 Z"
                fill="#EBE5DA"
                stroke="#D8D2C7"
                strokeWidth="1"
                className="opacity-70"
              />
              {/* South America */}
              <path
                d="M 270 270 Q 330 290 340 360 T 300 450 Q 260 440 250 360 T 270 270 Z"
                fill="#EBE5DA"
                stroke="#D8D2C7"
                strokeWidth="1"
                className="opacity-60"
              />
              {/* Europe & North Africa */}
              <path
                d="M 450 90 Q 550 80 580 140 T 520 200 Q 440 190 430 140 T 450 90 Z"
                fill="#EBE5DA"
                stroke="#D8D2C7"
                strokeWidth="1"
                className="opacity-70"
              />
              {/* Africa */}
              <path
                d="M 460 210 Q 570 210 580 290 T 540 420 Q 480 430 460 330 T 460 210 Z"
                fill="#EBE5DA"
                stroke="#D8D2C7"
                strokeWidth="1"
                className="opacity-60"
              />
              {/* Asia */}
              <path
                d="M 590 110 Q 750 90 860 140 T 890 240 Q 800 300 700 280 T 600 210 Z"
                fill="#EBE5DA"
                stroke="#D8D2C7"
                strokeWidth="1"
                className="opacity-70"
              />
              {/* Australia */}
              <path
                d="M 780 340 Q 880 320 900 380 T 860 440 Q 800 450 780 390 T 780 340 Z"
                fill="#EBE5DA"
                stroke="#D8D2C7"
                strokeWidth="1"
                className="opacity-60"
              />

              {/* Dynamic Curved Trade Arcs */}
              {TRADE_ARCS.map((arc, i) => {
                const node1 = MAP_NODES.find((n) => n.code === arc.from);
                const node2 = MAP_NODES.find((n) => n.code === arc.to);
                if (!node1 || !node2) return null;

                const isHighlighted =
                  arc.from === selectedCode || arc.to === selectedCode;
                const midX = (node1.x + node2.x) / 2;
                const midY = Math.min(node1.y, node2.y) - 30;

                return (
                  <g key={i} className="transition-opacity duration-300">
                    {/* Glowing background arc */}
                    <path
                      d={`M ${node1.x} ${node1.y} Q ${midX} ${midY} ${node2.x} ${node2.y}`}
                      fill="none"
                      stroke={isHighlighted ? '#FF5A36' : '#A8C7B5'}
                      strokeWidth={isHighlighted ? 2.5 : 1.2}
                      strokeDasharray={isHighlighted ? 'none' : '4,4'}
                      className={isHighlighted ? 'opacity-90' : 'opacity-40'}
                    />
                    {/* Animated moving pulse on highlighted arc */}
                    {isHighlighted && (
                      <circle r="4" fill="#FF5A36">
                        <animateMotion
                          path={`M ${node1.x} ${node1.y} Q ${midX} ${midY} ${node2.x} ${node2.y}`}
                          dur="3s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* Country Nodes */}
              {MAP_NODES.map((node) => {
                const isSelected = node.code === selectedCode;

                return (
                  <g
                    key={node.code}
                    className="cursor-pointer group"
                    onClick={() => setSelectedCode(node.code)}
                    onMouseEnter={() => setCursor(`NODE // ${node.code}`, 'view')}
                    onMouseLeave={() => setCursor(null)}
                  >
                    {/* Pulse Radar Ping */}
                    {isSelected && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="18"
                        fill="#FF5A36"
                        className="animate-ping opacity-25"
                      />
                    )}

                    {/* Outer Node Halo */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isSelected ? 10 : 7}
                      fill={isSelected ? '#FF5A36' : '#FFFDF8'}
                      stroke={isSelected ? '#FFFDF8' : '#171717'}
                      strokeWidth="2.5"
                      className="transition-all duration-300 drop-shadow-md group-hover:scale-125"
                    />

                    {/* Inner Core */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isSelected ? 4 : 2.5}
                      fill={isSelected ? '#FFFDF8' : '#FF5A36'}
                    />

                    {/* Node Text Flag / Label */}
                    <text
                      x={node.x}
                      y={node.labelPosition === 'top' ? node.y - 14 : node.y + 20}
                      textAnchor="middle"
                      className={`text-[10px] font-mono tracking-wider font-bold transition-all duration-200 select-none ${
                        isSelected
                          ? 'fill-[#FF5A36] text-[11px] font-extrabold'
                          : 'fill-[#171717] opacity-80 group-hover:opacity-100 group-hover:fill-[#FF5A36]'
                      }`}
                    >
                      {node.flag} {node.code}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Active Spotlight Card Overlay */}
          {selectedCountry && (
            <div className="mt-6 p-6 rounded-2xl bg-[#F3EFE7] border border-[#D8D2C7] grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Col 1: Overview */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedCountry.flag}</span>
                  <div>
                    <h4 className="font-editorial text-2xl font-bold text-[#171717]">
                      {selectedCountry.name}
                    </h4>
                    <p className="text-xs font-mono text-[#6B6B63]">
                      Region: {selectedCountry.region} • GDP: {selectedCountry.gdp}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-[#6B6B63] leading-relaxed">
                  {selectedNode.tradeCorridor}. {selectedCountry.tradeBalance}
                </p>
                <div className="p-2.5 rounded-xl bg-[#FFFDF8] border border-[#D8D2C7] text-xs">
                  <span className="text-[10px] font-mono uppercase text-[#6B6B63] block mb-0.5">
                    Tariff Advantage
                  </span>
                  <span className="font-semibold text-[#171717]">
                    {selectedNode.tariffSummary}
                  </span>
                </div>
              </div>

              {/* Col 2: Top Import Demand & Exports */}
              <div className="space-y-3">
                <h5 className="font-bold text-xs uppercase tracking-wider text-[#171717] flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-[#FF5A36]" />
                  <span>High-Procurement Sectors</span>
                </h5>
                <div className="space-y-1.5">
                  <div className="text-xs">
                    <span className="text-[#6B6B63] block text-[10px] font-mono">TOP IMPORTS (HIGH DEMAND):</span>
                    <span className="font-medium text-[#171717]">
                      {selectedCountry.popularImports.slice(0, 3).join(' • ')}
                    </span>
                  </div>
                  <div className="text-xs pt-1 border-t border-[#D8D2C7]/60">
                    <span className="text-[#6B6B63] block text-[10px] font-mono">COMPETITIVE EXPORTS:</span>
                    <span className="font-medium text-[#171717]">
                      {selectedCountry.popularExports.slice(0, 3).join(' • ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Col 3: Actions & Trade Pacts */}
              <div className="flex flex-col justify-between space-y-4">
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-wider text-[#171717] mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#A8C7B5]" />
                    <span>Pacts & Treaties</span>
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCountry.tradePacts.slice(0, 3).map((pact, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-[#FFFDF8] border border-[#D8D2C7] text-[10px] font-mono text-[#171717]"
                      >
                        {pact}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => onOpenCountry(selectedCountry.code)}
                    onMouseEnter={() => setCursor('DOSSIER', 'view')}
                    onMouseLeave={() => setCursor(null)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#171717] hover:bg-[#FF5A36] text-[#FFFDF8] text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Country Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={onExploreProducts}
                    onMouseEnter={() => setCursor('GOODS', 'view')}
                    onMouseLeave={() => setCursor(null)}
                    className="py-2.5 px-4 rounded-xl bg-[#FFFDF8] hover:bg-[#EBE5DA] text-[#171717] border border-[#D8D2C7] text-xs font-bold tracking-wider uppercase transition-colors"
                  >
                    Trade Goods
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Vertical-to-Horizontal Trending Markets Strip */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#171717]">
                TRENDING CORRIDORS & MARKETS
              </h3>
              <p className="text-xs text-[#6B6B63] font-mono">
                Germany ➔ Japan ➔ Singapore ➔ USA ➔ India ➔ UK ➔ Saudi Arabia
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollStrip('left')}
                className="w-10 h-10 rounded-full bg-[#FFFDF8] hover:bg-[#EBE5DA] border border-[#D8D2C7] flex items-center justify-center text-[#171717] transition-colors shadow-sm"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollStrip('right')}
                className="w-10 h-10 rounded-full bg-[#FFFDF8] hover:bg-[#EBE5DA] border border-[#D8D2C7] flex items-center justify-center text-[#171717] transition-colors shadow-sm"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontal Scrolling Card Track */}
          <div
            ref={horizontalScrollRef}
            className="flex gap-5 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory"
          >
            {countries.map((c) => (
              <div
                key={c.code}
                onClick={() => {
                  setSelectedCode(c.code);
                  onOpenCountry(c.code);
                }}
                onMouseEnter={() => setCursor('EXPAND', 'view')}
                onMouseLeave={() => setCursor(null)}
                className="min-w-[320px] sm:min-w-[360px] max-w-[360px] p-6 rounded-2xl bg-[#FFFDF8] border border-[#D8D2C7] hover:border-[#FF5A36] hover:shadow-xl transition-all duration-300 cursor-pointer snap-start flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl p-1 bg-[#F3EFE7] rounded-xl border border-[#D8D2C7]/60">
                        {c.flag}
                      </span>
                      <div>
                        <h4 className="font-bold text-base text-[#171717] group-hover:text-[#FF5A36] transition-colors">
                          {c.name}
                        </h4>
                        <span className="text-[11px] font-mono text-[#6B6B63]">
                          {c.region}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-[#F3EFE7] text-[#171717]">
                      {c.gdp}
                    </span>
                  </div>

                  <p className="text-xs text-[#6B6B63] line-clamp-2 mb-4 leading-relaxed">
                    {c.tradeBalance}
                  </p>

                  <div className="space-y-2 py-3 border-y border-[#D8D2C7]/70 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-[#6B6B63] font-mono">Verified Exporters:</span>
                      <span className="font-bold text-[#171717]">{c.activeSuppliersCount}+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-[#6B6B63] font-mono">Active Importers:</span>
                      <span className="font-bold text-[#171717]">{c.activeBuyersCount}+</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#FF5A36] group-hover:underline flex items-center gap-1">
                    <span>Inspect Corridor</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[10px] font-mono text-[#6B6B63] px-2 py-0.5 rounded bg-[#F3EFE7]">
                    HS TARIFF READY
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
