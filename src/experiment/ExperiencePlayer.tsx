import React, { useState, useEffect } from 'react';
import { SlidePlan } from './types';
import { Renderer } from './Renderer';
import { Text, AccentProvider, getAccentForSlideType } from './tokens';

export function ExperiencePlayer({
  plan,
  onClose,
  onComplete,
}: {
  plan: SlidePlan;
  onClose: () => void;
  onComplete?: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [decisionSolved, setDecisionSolved] = useState<boolean>(false);

  const slide = plan.slides[currentIndex];
  const isDecision = slide?.type === 'DECISION';
  const isLastSlide = currentIndex === plan.slides.length - 1;

  // Reset decision state when slide changes
  useEffect(() => {
    setFeedback(null);
    setDecisionSolved(false);
  }, [currentIndex]);

  if (!slide) return <div className="p-4 text-white">Error: slide not found</div>;

  const handleChoice = (isCorrect: boolean, feedbackText: string) => {
    setFeedback(feedbackText);
    if (isCorrect) {
      setDecisionSolved(true);
    }
  };

  const handleNext = () => {
    if (isLastSlide) {
      if (onComplete) {
        onComplete();
      } else {
        onClose();
      }
      return;
    }
    setCurrentIndex((prev) => Math.min(plan.slides.length - 1, prev + 1));
  };

  const handleBack = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const isNextDisabled = isDecision && !decisionSolved;
  const accent = getAccentForSlideType(slide.type);
  const isWelcome = slide?.type === 'WELCOME';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070A14] select-none p-0 sm:p-4">
      <div className="w-full max-w-[420px] h-full sm:h-[820px] sm:rounded-[32px] bg-[#0B0C0E] text-white flex flex-col overflow-hidden border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative">
        {/* 1. TOP BAR CHROME - Matches reference screenshot: Exit on left, counter on right */}
        {!isWelcome && (
          <div className="h-11 flex items-center justify-between px-5 bg-[#0B0C0E] border-b border-white/10 shrink-0 select-none">
            <button
              onClick={onClose}
              className="h-11 flex items-center justify-center cursor-pointer hover:text-white text-white/80 transition-colors active:scale-95 border-0 bg-transparent text-xs font-bold"
            >
              Exit
            </button>

            <div className="flex items-center">
              <span className="text-white/70 text-xs font-mono font-medium tracking-widest">
                {currentIndex + 1} / {plan.slides.length}
              </span>
            </div>
          </div>
        )}

        {/* 2. SLIDE BODY CONTAINER */}
        <div className={`flex-1 overflow-y-auto animate-in fade-in duration-200 ${isWelcome ? 'p-0' : 'px-4 py-4 space-y-4'}`}>
          <AccentProvider value={accent}>
            <Renderer
              slide={slide}
              onChoiceSelect={handleChoice}
              feedback={feedback}
              onNext={handleNext}
              slideIndex={currentIndex}
              totalSlides={plan.slides.length}
              onClose={onClose}
            />
          </AccentProvider>
        </div>

        {/* 3. FIXED CHROME FOOTER - Matching reference screenshot */}
        {!isWelcome && (
          <div className="p-4 bg-[#0B0C0E] border-t border-white/10 flex items-center justify-between gap-3 shrink-0 select-none">
            {currentIndex > 0 ? (
              <button
                onClick={handleBack}
                className="min-h-[44px] px-6 py-2.5 rounded-full border border-white/20 bg-black/80 text-white font-bold text-xs cursor-pointer hover:bg-white/10 active:scale-95 transition-all shrink-0"
              >
                Back
              </button>
            ) : (
              <div className="w-[72px] shrink-0" />
            )}

            {/* Progress dots - Active dot is white pill, inactive dots are subtle grey dots */}
            <div className="flex-1 min-w-0 overflow-x-auto flex items-center justify-center gap-1.5 py-1 px-1 no-scrollbar">
              {plan.slides.map((_, idx) => (
                <span
                  key={idx}
                  className={`shrink-0 transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-6 h-1.5 rounded-full bg-white'
                      : 'w-1.5 h-1.5 rounded-full bg-white/20'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={isNextDisabled}
              className="min-h-[44px] px-6 py-2.5 rounded-full bg-white text-black font-extrabold text-xs tracking-wide cursor-pointer transition-all duration-200 active:scale-95 hover:bg-slate-100 shadow-md disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              {isLastSlide ? 'Complete' : 'Next'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
