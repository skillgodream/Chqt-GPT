import React from 'react';
import { Check } from 'lucide-react';
import { Slide } from '../types';
import { ImageSlot } from '../tokens';

export const ScenarioPage: React.FC<{
  slide: Slide;
  onNext?: () => void;
}> = ({ slide }) => {
  const tag = (slide.tag || 'SEE ▾').toUpperCase();
  const guidance = slide.content || slide.gurujiCoaching?.whyItMatters || 'Confirm and execute only compliant parameters according to SOP.';

  return (
    <div className="flex flex-col gap-4 text-left">
      {/* Header Pill & Title matching Screenshot 3 */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-white/30 bg-white/5 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-white select-none">
          <span>{tag}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
          {slide.title}
        </h1>

        <p className="text-xs sm:text-sm font-medium text-slate-300 leading-relaxed max-w-sm">
          {slide.lead || 'Observe the system parameters before taking action.'}
        </p>
      </div>

      {/* Visual Image / UI Card */}
      <ImageSlot src={slide.img} alt={slide.title} textContext={slide.title} />

      {/* Green Guidance Callout Box matching Screenshot 3 */}
      <div className="bg-emerald-950/70 border border-emerald-500/40 text-emerald-100 rounded-2xl p-4 flex items-center gap-3.5 shadow-xl">
        <div className="w-7 h-7 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center shrink-0 font-extrabold">
          <Check className="w-4 h-4 stroke-[3]" />
        </div>
        <p className="text-xs sm:text-sm font-semibold leading-snug">
          {guidance}
        </p>
      </div>
    </div>
  );
};
