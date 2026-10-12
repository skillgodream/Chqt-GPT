import React, { useState } from 'react';
import { ChevronLeft, Bookmark, BookOpen, GitFork, ScanEye, GitBranch, CheckCheck } from 'lucide-react';
import { Lesson } from '../types';
import { sounds } from '../utils/audio';

interface LessonOverviewProps {
  lesson: Lesson;
  onBack: () => void;
  onOpenIntroDeck: () => void;
  onStartSimulation: (phase: number) => void;
  onOpenVideoDemo?: () => void;
  onAskTrainer?: () => void;
}

export default function LessonOverview({
  lesson,
  onBack,
  onOpenIntroDeck,
  onStartSimulation,
  onOpenVideoDemo,
  onAskTrainer,
}: LessonOverviewProps) {
  const [bookmarked, setBookmarked] = useState(false);

  const learningPath = [
    {
      id: 'training-deck',
      title: 'Learn the flow',
      subtitle: 'Interactive workflow',
      icon: GitFork,
      action: () => onOpenIntroDeck(),
    },
    {
      id: 'show-me',
      title: 'See the action',
      subtitle: 'Visual walkthrough',
      icon: ScanEye,
      action: () => (onOpenVideoDemo ? onOpenVideoDemo() : onStartSimulation(0)),
    },
    {
      id: 'guide-me',
      title: 'Make the decision',
      subtitle: 'Interactive scenario',
      icon: GitBranch,
      action: () => onStartSimulation(1),
    },
    {
      id: 'test-me',
      title: 'Prove capability',
      subtitle: 'Independent assessment',
      icon: CheckCheck,
      action: () => onStartSimulation(2),
    },
  ];

  return (
    <div className="fixed inset-0 z-40 bg-black text-white flex flex-col overflow-y-auto animate-in fade-in duration-200 p-6 sm:p-8 font-sans select-none">
      
      {/* Ambient Backdrop */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-white/[0.02] blur-[120px]" />
      </div>

      <div className="relative w-full flex flex-col z-10 max-w-md mx-auto">
        
        {/* Header Navigation Bar */}
        <div className="flex justify-between items-center w-full relative z-10">
          <button
            onClick={() => {
              sounds.playTap();
              onBack();
            }}
            className="w-10 h-10 rounded-full border border-white/15 bg-white/10 flex items-center justify-center text-white shadow-xs hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
            aria-label="Back"
          >
            <ChevronLeft size={20} className="stroke-[2.5]" />
          </button>

          <div className="flex items-center gap-2">
            {onAskTrainer && (
              <button
                onClick={() => {
                  sounds.playTap();
                  onAskTrainer();
                }}
                className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-white hover:bg-white/20 transition-all shadow-xs cursor-pointer"
              >
                Ask Trainer
              </button>
            )}
            <button
              onClick={() => {
                sounds.playTap();
                setBookmarked(!bookmarked);
              }}
              className="w-10 h-10 rounded-full border border-white/15 bg-white/10 flex items-center justify-center shadow-xs active:scale-95 transition-all cursor-pointer hover:bg-white/20 text-white"
              aria-label="Bookmark"
            >
              <Bookmark size={18} className={bookmarked ? 'fill-current text-indigo-400' : ''} />
            </button>
          </div>
        </div>

        {/* Hero Header Section */}
        <div className="flex items-center justify-between gap-4 pt-8 pb-6 border-b border-white/10 relative z-10">
          <div className="flex-1 space-y-2">
            {/* Steps Count Badge */}
            <div className="flex items-center gap-1.5 text-indigo-400 font-extrabold text-xs uppercase tracking-wider">
              <BookOpen size={14} className="stroke-[2.5]" />
              <span>{lesson.stepsCount} verified steps</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              {lesson.title}
            </h1>

            <p className="text-slate-300/80 font-normal text-xs sm:text-sm leading-relaxed max-w-xs">
              {lesson.description || 'Ensure a safe, welcoming environment for every guest through our verified protocol steps.'}
            </p>
          </div>

          {/* Right-side Koala Coach profile */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#161C2C] border border-white/15 flex items-center justify-center shrink-0 overflow-hidden shadow-2xl">
            <img
              src="/Coachguru.png"
              alt="Guruji Koala Coach"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain transform translate-y-2 scale-110 drop-shadow-md"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/guruji 1.png";
              }}
            />
          </div>
        </div>

        {/* Interactive 2x2 Cards Grid matching attached screenshot exactly */}
        <div className="grid grid-cols-2 gap-3.5 pt-6 mt-2 relative z-10">
          {learningPath.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sounds.playTap();
                  item.action();
                }}
                className="relative overflow-hidden min-h-[145px] sm:min-h-[155px] rounded-[22px] bg-[#0A0B0E] hover:bg-[#121318] border border-white/10 p-5 flex flex-col justify-between items-start text-left active:scale-[0.98] hover:border-white/25 transition-all duration-200 cursor-pointer group shadow-xl"
              >
                {/* Top: Icon directly placed */}
                <div className="mb-4">
                  <IconComponent className="w-6 h-6 text-white stroke-[2.2] group-hover:scale-110 transition-transform duration-200" />
                </div>

                {/* Bottom: Title & Subtitle */}
                <div className="mt-auto">
                  <h3 className="text-base sm:text-[17px] font-extrabold text-white tracking-tight leading-tight block">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-slate-400 mt-1 leading-snug">
                    {item.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
