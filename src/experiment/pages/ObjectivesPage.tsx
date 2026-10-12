import React from 'react';
import { Slide } from '../types';

export const ObjectivesPage: React.FC<{
  slide: Slide;
  onNext?: () => void;
}> = ({ slide }) => {
  const lead = slide.lead || 'By the end of this section, you will be able to:';

  let items = slide.items;
  if (!items || items.length === 0) {
    items = (slide.content || '')
      .split('\n')
      .map((line) => line.replace(/^\d+[\.\)]\s*/, '').trim())
      .filter(Boolean);
  }

  // Ensure content limit of dynamic goals
  const finalItems = items.slice(0, 4);

  // High-fidelity line icons matching screenshot 2 contextually
  const getGoalIcon = (text: string, index: number) => {
    const lower = text.toLowerCase();
    
    // 1. Sanitizer / chemical / ratio / bottle
    if (lower.includes('sanitizer') || lower.includes('dilut') || lower.includes('ratio') || lower.includes('mix') || lower.includes('solution')) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-5.5 h-5.5">
          <path d="M10 2h4M9 6h6v3l3 4v7c0 1.1-.9 2-2 2H8a2 2 0 0 1-2-2v-7l3-4V6Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 14h12" strokeLinecap="round" />
        </svg>
      );
    }
    // 2. High-touch / wipe / disinfect / sanitize / surfaces
    if (lower.includes('surface') || lower.includes('wipe') || lower.includes('sanitize') || lower.includes('clean') || lower.includes('disinfect')) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-5.5 h-5.5">
          <path d="M3 7a4 4 0 1 1 8 0v13H3V7Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 4h9M12 9h7M12 14h5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    // 3. Debris / dirt / dust / broom / trash
    if (lower.includes('debris') || lower.includes('dirt') || lower.includes('dust') || lower.includes('brush') || lower.includes('trash') || lower.includes('squeegee')) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-5.5 h-5.5">
          <path d="M12 2v14M5 16h14a2 2 0 0 1 2 2v2H3v-2a2 2 0 0 1 2-2Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }

    // Default checklist/goal fallback based on index
    if (index === 0) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-5.5 h-5.5">
          <path d="M10 2h4M9 6h6v3l3 4v7c0 1.1-.9 2-2 2H8a2 2 0 0 1-2-2v-7l3-4V6Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    if (index === 1) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-5.5 h-5.5">
          <path d="M3 7a4 4 0 1 1 8 0v13H3V7Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-5.5 h-5.5">
        <path d="M12 2v14M5 16h14a2 2 0 0 1 2 2v2H3v-2a2 2 0 0 1 2-2Z" strokeLinecap="round" />
      </svg>
    );
  };

  return (
    <div className="space-y-4 text-left">
      {/* 1. Header Hero Card in dark luxury golden theme */}
      <div className="bg-gradient-to-b from-[#1C1713] via-[#141212] to-[#0E0D0D] border border-white/10 rounded-[24px] p-5 text-white relative overflow-hidden shadow-2xl flex items-center justify-between min-h-[140px]">
        <div className="absolute -top-6 -right-6 w-36 h-36 bg-[#D4A373]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-2 z-10 max-w-[70%]">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[#D4A373]/60 bg-[#D4A373]/10 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase text-[#E5B888]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3.5 h-3.5 text-[#E5B888] inline shrink-0">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
            <span>Lesson goals</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-none text-white">
            {slide.title || 'What you will learn'}
          </h2>

          <p className="text-xs font-medium text-slate-300 leading-snug">
            {lead}
          </p>
        </div>

        <div className="relative w-16 h-16 shrink-0 z-10 mr-1 select-none">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#E5B888]" stroke="currentColor" strokeWidth="2.5" fill="none">
            <circle cx="50" cy="50" r="38" stroke="rgba(212,163,115,0.2)" strokeWidth="6" />
            <circle cx="50" cy="50" r="28" stroke="rgba(212,163,115,0.4)" strokeWidth="6" />
            <circle cx="50" cy="50" r="18" stroke="rgba(212,163,115,0.6)" strokeWidth="6" />
            <circle cx="50" cy="50" r="8" stroke="rgba(212,163,115,0.9)" strokeWidth="4" />
            <circle cx="50" cy="50" r="3" fill="#E5B888" stroke="#E5B888" />
            <line x1="18" y1="82" x2="78" y2="22" stroke="#E5B888" strokeWidth="5" strokeLinecap="round" />
            <polyline points="58 22 78 22 78 42" stroke="#E5B888" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* 2. Goals counter label */}
      <div className="text-[11px] font-mono font-bold text-[#E5B888] uppercase tracking-wider pl-1 mt-3">
        {finalItems.length} OBJECTIVES
      </div>

      {/* 3. List of Beautiful Goals cards in dark luxury theme */}
      <div className="space-y-3">
        {finalItems.map((item, index) => {
          const paddedNum = String(index + 1).padStart(2, '0');
          return (
            <div
              key={index}
              className="relative bg-[#131316] hover:bg-[#1A1A1E] rounded-[20px] p-4 pl-6 border border-white/10 shadow-lg flex items-center gap-4 min-h-[72px] overflow-hidden transition-all"
            >
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#E5B888] rounded-l-[20px]" />

              <div className="w-10 h-10 rounded-xl bg-[#D4A373]/10 border border-[#D4A373]/30 text-[#E5B888] flex items-center justify-center shrink-0">
                {getGoalIcon(item, index)}
              </div>

              <div className="flex-1 space-y-0.5 text-left pr-2">
                <div className="text-[10px] font-mono font-bold text-[#E5B888] tracking-widest">
                  GOAL {paddedNum}
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-white leading-snug">
                  {item}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
