import React, { useState } from 'react';
import { Slide } from '../types';
import { findBestVisualMatch } from '../../utils/visualLibraryMatcher';

export const SectionIntroPage: React.FC<{
  slide: Slide;
  onNext?: () => void;
}> = ({ slide }) => {
  const sec = slide.sec || 'PREPARE • Prerequisites';

  // Process slide fl items dynamically from extracted SOP
  const rawItems: string[] = slide.fl || [
    'Gloves on: Ensure clean heavy-duty nitrile safety gloves are fully equipped',
    'Sanitizer diluted 1:10: Measure and dilute solution correctly without guessing',
    'Workspace cleared: Keep table surfaces tidy and free of personal belongings',
  ];

  const fallbackImages = [
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=300&q=80',
  ];

  const items = rawItems.map((raw, idx) => {
    const parts = raw.split(/(?<!\d)[:\-\–](?!\d)\s*/);
    let title = '';
    let subtitle = '';

    if (parts.length > 1 && parts[0].trim().length < 50) {
      title = parts[0]?.trim();
      subtitle = parts.slice(1).join(' ').trim();
    } else {
      const words = raw.trim().split(/\s+/);
      if (words.length > 6) {
        title = words.slice(0, 5).join(' ');
        subtitle = words.slice(5).join(' ');
      } else {
        title = raw.trim();
        subtitle = 'Mandatory SOP prerequisite verification before starting execution.';
      }
    }

    // Format title and subtitle cleanly
    title = title.charAt(0).toUpperCase() + title.slice(1);
    subtitle = subtitle.charAt(0).toUpperCase() + subtitle.slice(1);

    // Run custom dynamic visual match on this specific item text for high-fidelity thumbnails
    const itemMatch = findBestVisualMatch(raw, slide.title || '');
    const itemImg = itemMatch.url || fallbackImages[idx % fallbackImages.length];

    return {
      title,
      subtitle,
      img: itemImg,
    };
  });

  // Track checked states for tapping each card
  const [checkedStates, setCheckedStates] = useState<Record<number, boolean>>({});

  const toggleCheck = (idx: number) => {
    setCheckedStates((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const checkedCount = Object.values(checkedStates).filter(Boolean).length;

  // Custom high-fidelity outline illustrations matching Screenshot 3
  const renderOutlineIllustration = (index: number) => {
    // Card 1: Glove/Hand Outline Illustration
    if (index === 0) {
      return (
        <svg viewBox="0 0 120 120" className="absolute -right-2 -bottom-6 w-32 h-32 opacity-[0.16] text-white pointer-events-none select-none z-0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M50 110 C50 95 40 90 32 82 C24 74 24 64 32 58 C38 54 44 58 48 64 C48 55 48 35 52 26 C55 18 63 18 66 26 L68 55 C68 45 70 30 74 22 C77 15 84 15 87 22 L89 55 C89 45 92 32 96 26 C99 20 106 20 109 26 L111 60 C111 50 115 42 119 46 C123 50 121 65 119 75 C115 90 105 105 85 110" />
        </svg>
      );
    }
    // Card 2: Bottle Outline Illustration
    if (index === 1) {
      return (
        <svg viewBox="0 0 100 120" className="absolute right-2 -bottom-5 w-24 h-32 opacity-[0.16] text-white pointer-events-none select-none z-0" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M40 25 L40 15 H60 L60 25 L75 40 V110 H25 V40 Z" />
          <line x1="25" y1="75" x2="75" y2="75" />
          <line x1="45" y1="15" x2="45" y2="25" strokeWidth="2.5" />
          <line x1="55" y1="15" x2="55" y2="25" strokeWidth="2.5" />
        </svg>
      );
    }
    // Card 3+: Clean gear/cogs illustration
    return (
      <svg viewBox="0 0 100 100" className="absolute right-1 -bottom-1 w-24 h-24 opacity-[0.16] text-white pointer-events-none select-none z-0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="50" cy="50" r="16" />
        <path d="M50 15 V25 M50 75 V85 M15 50 H25 M75 50 H85 M25 25 L32 32 M68 68 L75 75 M75 25 L68 32 M32 68 L25 75" />
      </svg>
    );
  };

  return (
    <div className="space-y-4 text-left">
      {/* 1. Header Section matching Screenshot 1 */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-white/30 bg-white/5 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-white select-none">
          <span>LEARN ▾</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
          {slide.title || 'The operational journey'}
        </h1>

        <p className="text-xs sm:text-sm font-medium text-slate-300 leading-relaxed max-w-sm">
          {slide.content || 'Tap each step to learn what to do, why it matters and the key controls.'}
        </p>
      </div>

      {/* 2. Vertical Timeline Items Grid matching Screenshot 1 */}
      <div className="relative pt-2 space-y-4">
        {/* Vertical timeline connecting line */}
        <div className="absolute left-4 top-6 bottom-6 w-[2px] bg-white/15 pointer-events-none z-0" />

        {items.map((item, idx) => {
          const isFirst = idx === 0;
          const isChecked = checkedStates[idx] || isFirst;

          return (
            <div
              key={idx}
              onClick={() => toggleCheck(idx)}
              className="relative z-10 flex items-center gap-3.5 cursor-pointer select-none group"
            >
              {/* Number Circle Badge */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm shadow-md transition-all ${
                  isChecked || isFirst
                    ? 'bg-white text-black ring-4 ring-white/10'
                    : 'bg-[#2A2A2E] text-white/70'
                }`}
              >
                {idx + 1}
              </div>

              {/* Step Card */}
              <div
                className={`flex-1 flex items-center gap-3.5 p-3.5 rounded-2xl border transition-all duration-200 ${
                  isChecked || isFirst
                    ? 'bg-white/10 border-white/40 shadow-xl'
                    : 'bg-[#121215] border-white/10 hover:border-white/20'
                }`}
              >
                {/* Square Icon Container */}
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-white">
                    {idx === 0 && <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />}
                    {idx === 1 && <path d="M2 4v16h20V4H2zm4 4h12v2H6V8zm0 4h8v2H6v-2z" />}
                    {idx === 2 && <rect x="2" y="5" width="20" height="14" rx="2" />}
                    {idx === 3 && <path d="M21 2l-2 2m-2-2l2 2M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z" />}
                    {idx >= 4 && <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />}
                  </svg>
                </div>

                {/* Title */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white leading-snug truncate">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
