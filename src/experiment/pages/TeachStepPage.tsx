import React from 'react';
import { User, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Slide } from '../types';
import { ImageSlot } from '../tokens';

export const TeachStepPage: React.FC<{
  slide: Slide;
  onNext?: () => void;
}> = ({ slide }) => {
  const stepLabel = (slide.step || 'LEARN - STEP 1 OF 5').toUpperCase();
  const whatToDo = slide.content || slide.items?.[0] || "Follow the property's approved identity and registration requirements.";
  const whyItMatters = slide.gurujiCoaching?.whyItMatters || slide.why || 'Ensures safety, compliance and prevents unauthorized access.';
  const criticalControl = slide.gurujiCoaching?.criticalControl || slide.criticalControl || 'Must be complete and verified before proceeding.';

  return (
    <div className="flex flex-col gap-4 text-left">
      {/* Header matching Screenshot 2 */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-white/30 bg-white/5 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-white select-none">
          <span>{stepLabel}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
          {slide.title}
        </h1>
      </div>

      {/* Visual Image */}
      <ImageSlot src={slide.img} alt={slide.title} textContext={slide.title} />

      {/* Content Block matching Screenshot 2 */}
      <div className="bg-[#121215] border border-white/10 rounded-2xl p-5 space-y-5 shadow-xl">
        {/* Section 1: What to do */}
        <div className="flex items-start gap-3.5">
          <User className="w-6 h-6 text-white shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white leading-tight">What to do</h3>
            <p className="text-xs sm:text-sm font-medium text-slate-300 leading-relaxed">
              {whatToDo}
            </p>
          </div>
        </div>

        <div className="border-t border-white/10" />

        {/* Section 2: Why it matters */}
        <div className="flex items-start gap-3.5">
          <ShieldCheck className="w-6 h-6 text-white shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white leading-tight">Why it matters</h3>
            <p className="text-xs sm:text-sm font-medium text-slate-300 leading-relaxed">
              {whyItMatters}
            </p>
          </div>
        </div>

        <div className="border-t border-white/10" />

        {/* Section 3: Critical control */}
        <div className="flex items-start gap-3.5">
          <AlertTriangle className="w-6 h-6 text-white shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white leading-tight">Critical control</h3>
            <p className="text-xs sm:text-sm font-medium text-slate-300 leading-relaxed">
              {criticalControl}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
