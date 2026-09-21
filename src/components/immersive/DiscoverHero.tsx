import React, { useEffect, useState } from 'react';
import { useIMR } from '../../context/IMRContext';
import { useCursor } from '../../context/CursorContext';
import { MagneticButton } from '../cursor/MagneticButton';
import {
  ArrowDown,
  Sparkles,
  TrendingUp,
  Globe2,
  Package,
  ShieldCheck,
  ArrowRight,
  Layers,
} from 'lucide-react';
import type { BusinessIdea, TradeProduct } from '../../types';

interface DiscoverHeroProps {
  onExploreMarkets: () => void;
  onPostIdea: () => void;
  onSelectIdea: (idea: BusinessIdea) => void;
  onSelectProduct: (product: TradeProduct) => void;
}

export const DiscoverHero: React.FC<DiscoverHeroProps> = ({
  onExploreMarkets,
  onPostIdea,
  onSelectIdea,
  onSelectProduct,
}) => {
  const { ideas, products, mousePos } = useIMR() as any;
  const { setCursor, mousePos: globalMouse, isTouchDevice } = useCursor();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute scroll-driven transformations
  // Hero text scales down gently as user scrolls down (from 1 down to 0.82)
  const heroScale = Math.max(0.82, 1 - scrollY * 0.0006);
  const heroTranslateY = scrollY * 0.35;
  const heroOpacity = Math.max(0.2, 1 - scrollY * 0.0014);

  // Floating spatial cards translate in based on scroll and mouse parallax
  const card1TranslateY = -scrollY * 0.2 + (isTouchDevice ? 0 : globalMouse.normY * 12);
  const card1TranslateX = (isTouchDevice ? 0 : globalMouse.normX * 10);

  const card2TranslateY = -scrollY * 0.28 + (isTouchDevice ? 0 : globalMouse.normY * -14);
  const card2TranslateX = (isTouchDevice ? 0 : globalMouse.normX * -12);

  const featuredIdea = ideas[0];
  const featuredProduct = products[0];

  return (
    <section
      id="discover-hero"
      className="relative min-h-[100vh] flex flex-col justify-between pt-28 sm:pt-36 pb-12 px-4 sm:px-8 overflow-hidden bg-[#F3EFE7] bg-grid-pattern"
    >
      {/* Decorative Spatial Background Rings */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] sm:w-[980px] h-[700px] sm:h-[980px] rounded-full border border-[#D8D2C7]/60 transition-transform duration-700 ease-out"
        style={{
          transform: `translate(-50%, -50%) translate3d(${globalMouse.normX * -15}px, ${globalMouse.normY * -15}px, 0)`,
        }}
      />
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[480px] sm:w-[680px] h-[480px] sm:h-[680px] rounded-full border border-[#D8D2C7]/40 transition-transform duration-700 ease-out"
        style={{
          transform: `translate(-50%, -50%) translate3d(${globalMouse.normX * 18}px, ${globalMouse.normY * 18}px, 0)`,
        }}
      />

      {/* Hero Content Center */}
      <div
        className="max-w-6xl mx-auto w-full text-center relative z-20 flex flex-col items-center justify-center my-auto"
        style={{
          transform: `translate3d(0, ${heroTranslateY}px, 0) scale(${heroScale})`,
          opacity: heroOpacity,
          transformOrigin: 'top center',
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Subtle Category Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF8] border border-[#D8D2C7] shadow-sm mb-6 text-xs text-[#171717] font-mono tracking-wider uppercase">
          <span className="w-2 h-2 rounded-full bg-[#FF5A36] animate-pulse" />
          <span>Section 01 // Discover Global Exchange</span>
        </div>

        {/* Monumental Editorial Headline */}
        <h1 className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-[104px] font-bold text-[#171717] tracking-tight leading-[0.92] select-none max-w-5xl">
          THE WORLD <br />
          <span className="font-display font-extrabold italic bg-gradient-to-r from-[#171717] via-[#FF5A36] to-[#171717] bg-clip-text text-transparent">
            IS YOUR MARKET.
          </span>
        </h1>

        <p className="mt-6 text-sm sm:text-base md:text-lg text-[#6B6B63] max-w-2xl font-sans leading-relaxed">
          The international business opportunity & idea marketplace. Connecting bold creators, verified exporters, precision manufacturers, and global capital across 48 trade corridors.
        </p>

        {/* Magnetic CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            onClick={onExploreMarkets}
            cursorLabel="EXPLORE"
            className="px-7 py-4 rounded-full bg-[#171717] hover:bg-[#FF5A36] text-[#FFFDF8] font-bold text-xs sm:text-sm tracking-wider uppercase transition-colors shadow-xl shadow-[#171717]/10 flex items-center gap-2 group"
          >
            <span>Explore Global Markets</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>

          <MagneticButton
            onClick={onPostIdea}
            cursorLabel="PUBLISH"
            className="px-7 py-4 rounded-full bg-[#FFFDF8] hover:bg-[#EBE5DA] text-[#171717] border border-[#D8D2C7] font-bold text-xs sm:text-sm tracking-wider uppercase transition-colors shadow-sm"
          >
            <span>Post Business Idea</span>
          </MagneticButton>
        </div>
      </div>

      {/* Floating Spatial Depth Cards (Enter and Float on Scroll) */}
      <div className="relative max-w-7xl mx-auto w-full mt-8 hidden sm:block">
        {/* Floating Card Left: High-Margin Agri Export */}
        {featuredProduct && (
          <div
            onClick={() => onSelectProduct(featuredProduct)}
            onMouseEnter={() => setCursor('INSPECT', 'view')}
            onMouseLeave={() => setCursor(null)}
            style={{
              transform: `translate3d(${card1TranslateX}px, ${card1TranslateY}px, 0) rotate(-2deg)`,
              transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.4, 1)',
            }}
            className="absolute -top-12 left-0 lg:left-6 w-72 p-4 rounded-2xl bg-[#FFFDF8] border border-[#D8D2C7] shadow-xl hover:shadow-2xl hover:border-[#FF5A36] cursor-pointer transition-all duration-300 group z-30"
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-[#6B6B63] mb-2">
              <span className="px-2 py-0.5 rounded-full bg-[#A8C7B5]/40 text-[#171717] font-bold">
                EXPORT ACTIVE
              </span>
              <span>HS {featuredProduct.hsCode}</span>
            </div>
            <div className="h-28 rounded-xl overflow-hidden mb-2.5 bg-[#EBE5DA]">
              <img
                src={featuredProduct.image}
                alt={featuredProduct.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h4 className="font-bold text-xs text-[#171717] line-clamp-1 group-hover:text-[#FF5A36] transition-colors">
              {featuredProduct.name}
            </h4>
            <div className="mt-2 flex items-center justify-between text-[11px] pt-1.5 border-t border-[#D8D2C7]">
              <span className="text-[#6B6B63]">Origin: {featuredProduct.originCountry}</span>
              <span className="font-mono font-bold text-[#171717]">{featuredProduct.priceRange}</span>
            </div>
          </div>
        )}

        {/* Floating Card Right: Frontier Innovation Canvas */}
        {featuredIdea && (
          <div
            onClick={() => onSelectIdea(featuredIdea)}
            onMouseEnter={() => setCursor('CANVAS', 'view')}
            onMouseLeave={() => setCursor(null)}
            style={{
              transform: `translate3d(${card2TranslateX}px, ${card2TranslateY}px, 0) rotate(2.5deg)`,
              transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.4, 1)',
            }}
            className="absolute -top-16 right-0 lg:right-6 w-80 p-5 rounded-2xl bg-[#FFFDF8] border border-[#D8D2C7] shadow-xl hover:shadow-2xl hover:border-[#FF5A36] cursor-pointer transition-all duration-300 group z-30"
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-[#6B6B63] mb-2">
              <span className="px-2 py-0.5 rounded-full bg-[#FF5A36]/15 text-[#FF5A36] font-bold">
                {featuredIdea.category}
              </span>
              <span>STAGE: {featuredIdea.stage.toUpperCase()}</span>
            </div>
            <h4 className="font-editorial text-lg font-bold text-[#171717] leading-snug group-hover:text-[#FF5A36] transition-colors">
              {featuredIdea.title}
            </h4>
            <p className="text-[11px] text-[#6B6B63] line-clamp-2 mt-1.5 leading-relaxed">
              {featuredIdea.tagline}
            </p>
            <div className="mt-3 p-2.5 rounded-xl bg-[#F3EFE7] border border-[#D8D2C7]/80 text-[10px] flex items-center justify-between font-mono">
              <span className="text-[#6B6B63]">CAPITAL NEEDED</span>
              <span className="font-bold text-[#171717]">{featuredIdea.investmentFormatted}</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Live Trade Ticker & Scroll Invitation */}
      <div className="relative z-20 pt-8 border-t border-[#D8D2C7] mt-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#6B6B63]">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#A8C7B5]" />
            <span className="font-bold text-[#171717] uppercase tracking-wider">Live Trade Network:</span>
          </div>

          {/* Marquee Ticker */}
          <div className="overflow-hidden whitespace-nowrap w-full max-w-3xl text-[11px]">
            <div className="inline-block animate-marquee">
              <span className="mx-4 text-[#171717] font-semibold">🇮🇳 India ➔ 🇦🇪 UAE CEPA: 0% Tariff on 90% Goods</span>
              <span className="mx-4 text-[#6B6B63]">•</span>
              <span className="mx-4 text-[#171717] font-semibold">🇩🇪 Hamburg Bio-Foods RFP: 200MT Organic Cumin</span>
              <span className="mx-4 text-[#6B6B63]">•</span>
              <span className="mx-4 text-[#171717] font-semibold">⚡ Quantum Flux Maglev Conveyor: TSMC Fab Pilot</span>
              <span className="mx-4 text-[#6B6B63]">•</span>
              <span className="mx-4 text-[#171717] font-semibold">🇦🇪 Gulf Horizon Syndicate: $1.5M Seed Allocation</span>
            </div>
          </div>

          <div
            onClick={onExploreMarkets}
            className="flex items-center gap-1 text-[#171717] hover:text-[#FF5A36] cursor-pointer font-sans text-xs font-semibold shrink-0"
          >
            <span>Scroll to Explore</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};
