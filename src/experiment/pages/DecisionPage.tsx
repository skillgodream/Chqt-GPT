import React, { useState } from 'react';
import { Check, ShieldCheck } from 'lucide-react';
import { Slide } from '../types';
import { ImageSlot } from '../tokens';

export const DecisionPage: React.FC<{
  slide: Slide;
  onChoiceSelect: (isCorrect: boolean, feedback: string) => void;
  feedback?: string | null;
  onNext?: () => void;
}> = ({ slide, onChoiceSelect, feedback }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [feedbackText, setFeedbackText] = useState<string>('');

  const options = (slide.opts || []).length > 0
    ? (slide.opts || []).map((o) => ({
        text: o.t,
        why: o.why,
        isCorrect: Boolean(o.ok),
      }))
    : (slide.choices || []).map((c) => ({
        text: c.text,
        why: c.feedback || c.why || '',
        isCorrect: c.isCorrect,
      }));

  const handlePick = (index: number) => {
    setSelectedIndex(index);
    const opt = options[index];
    if (!opt) return;

    setFeedbackText(opt.why);

    if (opt.isCorrect) {
      setIsSolved(true);
      onChoiceSelect(true, opt.why);
    } else {
      setIsSolved(false);
      onChoiceSelect(false, opt.why);
    }
  };

  const correctOption = options.find((o) => o.isCorrect) || options[0];

  return (
    <div className="flex flex-col gap-4 text-left">
      {/* Header Pill */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-emerald-500/60 bg-emerald-950/30 text-emerald-300 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider select-none">
          <span>GUIDE ME</span>
        </div>
      </div>

      {/* If Solved (Screenshot 5 Result View) */}
      {isSolved ? (
        <div className="space-y-4 animate-in fade-in duration-300">
          {/* Success Banner */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center shrink-0 shadow-lg font-black">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white leading-tight">Correct</h2>
              <p className="text-xs sm:text-sm font-medium text-slate-300">You've selected the best action.</p>
            </div>
          </div>

          {/* Photo & Green Callout Overlay */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <ImageSlot src={slide.img} alt={slide.title} textContext={slide.title} />
            <div className="p-4 bg-emerald-950/90 border-t border-emerald-500/40 backdrop-blur-md flex items-center gap-3.5">
              <div className="w-6 h-6 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center shrink-0 font-bold">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-emerald-100 leading-snug">
                {correctOption?.text}
              </p>
            </div>
          </div>

          {/* Rationale Panel */}
          <div className="bg-[#121215] border border-white/10 rounded-2xl p-5 space-y-2 shadow-xl">
            <div className="flex items-center gap-2.5 text-white">
              <ShieldCheck className="w-5 h-5 text-white" />
              <h3 className="text-sm font-bold">Why it matters</h3>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-300 leading-relaxed">
              {feedbackText || correctOption?.why || 'Adhering to this protocol prevents operational hazards and guest inconvenience.'}
            </p>
          </div>
        </div>
      ) : (
        /* Question Mode (Screenshot 4) */
        <div className="space-y-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              {slide.title || 'The situation requires a decision.'}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-300 leading-relaxed">
              {slide.content || 'Select the compliant SOP response.'}
            </p>
          </div>

          {/* Image Slot */}
          <ImageSlot src={slide.img} alt={slide.title} textContext={slide.title} />

          {/* Question Label */}
          <h2 className="text-base font-extrabold text-white tracking-tight pt-1">
            What should you do next?
          </h2>

          {/* Radio Options List */}
          <div className="flex flex-col gap-3">
            {options.map((opt, j) => {
              const isSelected = selectedIndex === j;
              return (
                <button
                  key={j}
                  onClick={() => handlePick(j)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center gap-3.5 cursor-pointer active:scale-[0.99] ${
                    isSelected
                      ? 'bg-white/10 border-white/50 text-white shadow-lg'
                      : 'bg-[#121215] border-white/10 hover:border-white/25 text-slate-200'
                  }`}
                >
                  {/* Radio Circle Indicator */}
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isSelected
                        ? 'border-2 border-white bg-white/20'
                        : 'border border-white/40'
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>

                  <span className="text-xs sm:text-sm font-medium leading-snug flex-1">
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
