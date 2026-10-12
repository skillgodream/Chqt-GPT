import React, { createContext, useContext } from 'react';

// ============================================================================
// 1. DESIGN TOKENS
// ============================================================================

export type AccentType = 'indigo' | 'teal' | 'plum' | 'ember';
export type PanelType = 'default' | 'do' | 'dont' | 'takeaway';
export type TextStyleType =
  | 'welcome-title'
  | 'slide-title'
  | 'panel-heading'
  | 'body'
  | 'list-item'
  | 'caption'
  | 'pill'
  | 'button'
  | 'counter';

export const tokens = {
  colors: {
    navy: '#0F1B3D',
    slate: '#3C4660',
    muted: '#6B7691',
    page: '#F6F7FB',
    surface: '#FFFFFF',
    line: '#E3E8F4',
    accent: {
      indigo: '#3B4FE0',
      teal: '#0E8A9A',
      plum: '#6B2FB0',
      ember: '#D9541E',
    },
    semantic: {
      green: { text: '#2FA866', bg: '#E7F5EC' },
      red: { text: '#E5483A', bg: '#FDECEA' },
      amber: { text: '#F0A030', bg: '#FDF3D0' },
    }
  },
  spacing: {
    grid4: '4px',
    grid8: '8px',
    grid12: '12px',
    grid16: '16px',
    grid24: '24px',
    grid32: '32px',
    pagePadding: '16px',
    gapBlocks: '16px',
    cardPadding: '16px',
  },
  radius: {
    cards: '16px',
    hero: '24px',
    pills: '999px',
    buttons: '999px',
  },
  tapHeight: {
    minimum: '48px',
  }
};

// ============================================================================
// ACCENT CONTEXT
// ============================================================================

const AccentContext = createContext<AccentType>('indigo');

export const useAccent = () => useContext(AccentContext);

export const AccentProvider: React.FC<{ value: AccentType; children: React.ReactNode }> = ({ value, children }) => {
  return <AccentContext.Provider value={value}>{children}</AccentContext.Provider>;
};

export function getAccentForSlideType(type: string): AccentType {
  switch (type) {
    case 'WELCOME':
    case 'OBJECTIVES':
      return 'indigo';
    case 'SECTION_INTRO':
      return 'teal';
    case 'TEACH_STEP':
      return 'plum';
    case 'DO_DONT':
    case 'IMPORTANT_RULE':
      return 'ember';
    case 'REAL_WORLD_SCENARIO':
    case 'DECISION':
      return 'indigo';
    case 'KEY_TAKEAWAYS':
      return 'plum';
    case 'COMPLETION':
      return 'teal';
    default:
      return 'indigo';
  }
}

// ============================================================================
// HELPERS
// ============================================================================

export function toSentenceCase(text: string): string {
  if (!text || typeof text !== 'string') return text;

  const lower = text.trim().toLowerCase();
  if (!lower) return '';

  let sentence = lower.charAt(0).toUpperCase() + lower.slice(1);

  // Capitalize after periods, question marks, exclamation marks followed by spaces
  sentence = sentence.replace(/([.!?]\s+)([a-z])/g, (match, sep, char) => sep + char.toUpperCase());

  // Restore proper capitalization for acronyms/specific branding terms to prevent strange formatting
  const preservationMap: Record<string, string> = {
    guruji: 'Guruji',
    sop: 'SOP',
    nfbc: 'NFBC',
    dob: 'DOB',
    fifo: 'FIFO',
    'room sanitization': 'Room Sanitization',
    do: 'Do',
    dont: "Don't",
  };

  Object.entries(preservationMap).forEach(([lowerWord, displayWord]) => {
    const regex = new RegExp(`\\b${lowerWord}\\b`, 'gi');
    sentence = sentence.replace(regex, displayWord);
  });

  return sentence;
}

// ============================================================================
// 2. PRIMITIVE COMPONENTS (replaces all raw sizes/classes outside tokens)
// ============================================================================

export const Text: React.FC<{
  styleName: TextStyleType;
  children: React.ReactNode;
  emphasis?: string;
  className?: string;
}> = ({ styleName, children, emphasis, className = '' }) => {
  const stylesMap: Record<TextStyleType, string> = {
    'welcome-title': "font-['Plus_Jakarta_Sans'] text-[30px] leading-[36px] font-extrabold text-white tracking-tight normal-case",
    'slide-title': "font-['Plus_Jakarta_Sans'] text-[24px] leading-[30px] font-extrabold text-white tracking-tight normal-case",
    'panel-heading': "font-['Plus_Jakarta_Sans'] text-[18px] leading-[24px] font-bold text-white tracking-tight normal-case",
    'body': "font-['Plus_Jakarta_Sans'] text-[13px] leading-[19px] font-medium text-slate-300 tracking-normal normal-case",
    'list-item': "font-['Plus_Jakarta_Sans'] text-[13px] leading-[19px] font-medium text-white tracking-normal normal-case",
    'caption': "font-['Plus_Jakarta_Sans'] text-[11px] leading-[15px] font-semibold text-slate-400 tracking-wider uppercase normal-case",
    'pill': "font-['Plus_Jakarta_Sans'] text-[10px] sm:text-[11px] leading-[14px] font-bold font-mono tracking-wider uppercase normal-case",
    'button': "font-['Plus_Jakarta_Sans'] text-[13px] leading-[16px] font-extrabold tracking-wide normal-case",
    'counter': "font-['Plus_Jakarta_Sans'] text-[13px] leading-[16px] font-bold font-mono tabular-nums tracking-normal normal-case whitespace-nowrap shrink-0",
  };

  const baseClass = stylesMap[styleName] || stylesMap['body'];

  if (typeof children !== 'string') {
    return <span className={`${baseClass} ${className}`}>{children}</span>;
  }

  const sentenceText = toSentenceCase(children);

  if (!emphasis || !sentenceText.toLowerCase().includes(emphasis.toLowerCase())) {
    return <span className={`${baseClass} ${className}`}>{sentenceText}</span>;
  }

  const empLower = emphasis.toLowerCase();
  const index = sentenceText.toLowerCase().indexOf(empLower);
  if (index === -1) {
    return <span className={`${baseClass} ${className}`}>{sentenceText}</span>;
  }

  const before = sentenceText.slice(0, index);
  const matched = sentenceText.slice(index, index + emphasis.length);
  const after = sentenceText.slice(index + emphasis.length);

  return (
    <span className={`${baseClass} ${className}`}>
      {before}
      <span className="bg-[#FDF3D0] rounded-sm px-1 py-0.5">{matched}</span>
      {after}
    </span>
  );
};

export const Pill: React.FC<{
  children: string;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <span
      className={`inline-block px-3.5 py-1 rounded-full border border-white/30 bg-white/5 text-white font-mono text-xs uppercase tracking-wider shrink-0 whitespace-nowrap select-none max-w-[28ch] overflow-hidden text-ellipsis shadow-xs ${className}`}
    >
      <Text styleName="pill">{children}</Text>
    </span>
  );
};

export const SopHeader: React.FC<{
  tag: string;
  title: string;
  className?: string;
}> = ({ tag, title, className = '' }) => {
  return (
    <div className={`bg-[#0B0C0E] border border-white/10 rounded-[24px] p-5 relative overflow-hidden shadow-2xl flex flex-col gap-2.5 text-left select-none ${className}`}>
      <div className="absolute inset-x-0 top-0 h-[1px] bg-white/10 pointer-events-none" />
      
      {/* Black & White styled Tag Badge Pill matching screenshots */}
      <div className="inline-flex items-center self-start px-3.5 py-1 rounded-full border border-white/30 bg-white/5 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-white select-none">
        {tag}
      </div>

      {/* Slide Title - High-contrast white text */}
      <h2 className="text-2xl sm:text-[26px] font-extrabold tracking-tight leading-tight text-white pr-2 relative z-10">
        {toSentenceCase(title)}
      </h2>
    </div>
  );
};

export const Row: React.FC<{
  index?: number;
  isTick?: boolean;
  isCross?: boolean;
  children: string;
  className?: string;
}> = ({ index, isTick, isCross, children, className = '' }) => {
  let badge: React.ReactNode = null;
  if (index !== undefined) {
    badge = (
      <div className="w-8 h-8 rounded-full bg-white text-black font-bold text-sm flex items-center justify-center shrink-0 shadow-md">
        <Text styleName="counter" className="text-inherit">{String(index)}</Text>
      </div>
    );
  } else if (isTick) {
    badge = (
      <div className="w-6 h-6 rounded-full flex items-center justify-center bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3.5 h-3.5">
          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  } else if (isCross) {
    badge = (
      <div className="w-6 h-6 rounded-full flex items-center justify-center bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3.5 h-3.5">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-3.5 p-4 bg-[#121215] hover:bg-[#1A1A1E] rounded-[20px] border border-white/10 transition-all ${className}`}>
      {badge}
      <div className="flex-1 min-w-0">
        <Text styleName="list-item" className="text-white">
          {children}
        </Text>
      </div>
    </div>
  );
};

export const Panel: React.FC<{
  type?: PanelType;
  children: React.ReactNode;
  className?: string;
}> = ({ type = 'default', children, className = '' }) => {
  const bgStyles: Record<PanelType, string> = {
    default: 'bg-[#121215] border border-white/10 text-white',
    do: 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-200',
    dont: 'bg-rose-950/40 border border-rose-500/30 text-rose-200',
    takeaway: 'bg-[#121215] border border-white/10 text-white',
  };

  const resolvedBg = bgStyles[type] || bgStyles.default;

  return (
    <div className={`p-5 rounded-[20px] shadow-lg ${resolvedBg} ${className}`}>
      {children}
    </div>
  );
};

export const ImageSlot: React.FC<{
  src?: string;
  alt?: string;
  className?: string;
  textContext?: string;
}> = ({ src, alt = 'Visual illustration', className = '', textContext }) => {
  let resolvedSrc = src;
  const isUnsplash = src?.includes('unsplash.com') || src?.includes('picsum.photos');
  
  if (!resolvedSrc || isUnsplash) {
    if (textContext) {
      resolvedSrc = undefined;
    }
  }

  if (!resolvedSrc || resolvedSrc.includes('unsplash.com')) {
    return (
      <div className={`relative aspect-[16/10] w-full max-h-[240px] rounded-[24px] bg-[#121215] flex flex-col items-center justify-center p-4 select-none shrink-0 border border-white/10 overflow-hidden shadow-2xl ${className}`}>
        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 mb-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
            <rect x="3" y="3" width="18" height="18" rx="4" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
        <span className="mt-1 text-xs font-semibold text-slate-300 select-none text-center px-4">
          {toSentenceCase(alt || 'Visual representation')}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative aspect-[16/10] w-full max-h-[240px] rounded-[24px] overflow-hidden bg-[#121215] border border-white/10 shrink-0 shadow-2xl ${className}`}>
      <img
        src={resolvedSrc}
        alt={alt}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover rounded-[24px] transition-opacity duration-300"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          const parent = e.currentTarget.parentElement;
          if (parent) {
            const fallbackDiv = document.createElement('div');
            fallbackDiv.className = "absolute inset-0 flex flex-col items-center justify-center bg-[#121215] text-white/70 p-4";
            fallbackDiv.innerHTML = `
              <div class="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6"><rect x="3" y="3" width="18" height="18" rx="4"></rect><polyline points="21 15 16 10 5 21"></polyline></svg>
              </div>
            `;
            parent.appendChild(fallbackDiv);
          }
        }}
      />
    </div>
  );
};

export const Button: React.FC<{
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  type?: 'primary' | 'secondary';
}> = ({ onClick, disabled, children, className = '', type = 'primary' }) => {
  const resolvedColors = type === 'primary' 
    ? 'bg-white text-black font-extrabold hover:bg-slate-100 shadow-md disabled:opacity-40'
    : 'bg-black text-white border border-white/20 hover:bg-white/10 disabled:opacity-40';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`min-h-[44px] px-6 py-2.5 rounded-full flex items-center justify-center gap-2 select-none font-bold transition-all duration-200 cursor-pointer disabled:cursor-not-allowed active:scale-95 ${resolvedColors} ${className}`}
    >
      {typeof children === 'string' ? (
        <Text styleName="button">{children}</Text>
      ) : (
        children
      )}
    </button>
  );
};

export function getChoiceContainerClass(state: 'default' | 'correct' | 'wrong'): string {
  switch (state) {
    case 'default':
      return 'bg-[#121215] hover:bg-[#1A1A1E] border-white/10 text-white shadow-md';
    case 'correct':
      return 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200 shadow-lg';
    case 'wrong':
      return 'bg-rose-950/60 border-rose-500/60 text-rose-200 shadow-lg';
    default:
      return 'bg-[#121215] border-white/10 text-white';
  }
}

export function getChoiceBadgeClass(state: 'default' | 'correct' | 'wrong'): string {
  switch (state) {
    case 'default':
      return 'bg-[#2A2A2E] border border-white/10 text-white font-bold';
    case 'correct':
      return 'bg-emerald-400 text-slate-950 font-black';
    case 'wrong':
      return 'bg-rose-500 text-white font-black';
    default:
      return 'bg-[#2A2A2E] text-white';
  }
}

export function getCorrectnessBadgeClass(isCorrect: boolean): string {
  return isCorrect ? 'bg-emerald-400 text-slate-950 font-black' : 'bg-rose-500 text-white font-black';
}


