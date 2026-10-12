import React from 'react';
import { Camera, Upload, Sparkles, BookOpen, ArrowRight, ShieldCheck, FileText } from 'lucide-react';
import { Lesson } from '../types';
import { sounds } from '../utils/audio';
const gurujiImg = "/Coachguru.png";

interface HomeScreenProps {
  lessons: Lesson[];
  onScanClick: () => void;
  onUploadClick: () => void;
  onSelectSop: (lessonId: string, title?: string) => void;
  onExploreLibrary: () => void;
  onOpenPassport: () => void;
  onOpenPilotDashboard?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  lessons,
  onScanClick,
  onUploadClick,
  onSelectSop,
  onExploreLibrary,
  onOpenPassport,
  onOpenPilotDashboard,
}) => {
  return (
    <div className="flex-1 flex flex-col px-4 pt-4 pb-28 space-y-5 max-w-lg mx-auto w-full animate-in fade-in duration-200">
      {/* 1. Guruji Header Hero Banner */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-b from-[#181920] via-[#121318] to-[#0A0B0E] p-6 text-white shadow-2xl border border-white/10">
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="relative w-20 h-20 shrink-0">
            <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse opacity-40 blur-sm" />
            <img
              src="/Coachguru.png"
              alt="Guruji AI Coach"
              className="w-full h-full object-contain relative z-10 drop-shadow-md"
              onError={(e) => {
                (e.target as HTMLImageElement).src = gurujiImg || "/guruji 1.png";
              }}
            />
          </div>

          <div className="flex-1 min-w-0 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-bold text-emerald-300 mb-1.5 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Guruji Active & Ready
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
              Workplace SOP Intelligence
            </h1>
            <p className="text-xs text-zinc-400 font-medium mt-1 leading-relaxed">
              Transform any SOP document into interactive 4-stage drills.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Primary SOP Ingestion Actions (2 Prominent Cards) */}
      <div className="space-y-2.5 text-left">
        <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 px-1">
          Create Lesson from Document
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {/* Scan SOP Button */}
          <button
            onClick={() => {
              sounds.playTap();
              onScanClick();
            }}
            className="group relative flex flex-col items-start p-5 bg-[#121318] hover:bg-[#1A1C24] rounded-[22px] border border-white/10 hover:border-white/30 shadow-xl active:scale-98 transition-all duration-200 text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/15 text-white flex items-center justify-center mb-3.5 shadow-md group-hover:scale-105 transition-transform">
              <Camera size={20} />
            </div>
            <span className="text-sm font-extrabold text-white leading-tight">
              Scan SOP
            </span>
            <span className="text-[11px] text-zinc-400 font-medium mt-1">
              Camera / OCR Text
            </span>
          </button>

          {/* Upload SOP File Button */}
          <button
            onClick={() => {
              sounds.playTap();
              onUploadClick();
            }}
            className="group relative flex flex-col items-start p-5 bg-white text-black hover:bg-slate-100 rounded-[22px] border border-white/20 shadow-xl active:scale-98 transition-all duration-200 text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center mb-3.5 shadow-md group-hover:scale-105 transition-transform">
              <Upload size={20} />
            </div>
            <span className="text-sm font-black text-black leading-tight">
              Upload SOP
            </span>
            <span className="text-[11px] text-zinc-600 font-bold mt-1">
              PDF, Word, Text
            </span>
          </button>
        </div>
      </div>

      {/* 3. Verified Domain SOPs List */}
      <div className="space-y-3 pt-1 text-left">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
            Verified Domain SOPs
          </h2>
          <button
            onClick={() => {
              sounds.playTap();
              onExploreLibrary();
            }}
            className="text-xs font-extrabold text-zinc-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View All</span>
            <ArrowRight size={12} />
          </button>
        </div>

        <div className="space-y-2.5">
          {lessons.slice(0, 4).map((lesson) => (
            <div
              key={lesson.id}
              onClick={() => {
                sounds.playTap();
                onSelectSop(lesson.id, lesson.title);
              }}
              className="group flex items-center justify-between p-4 sm:p-5 bg-[#121318] hover:bg-[#1A1C24] rounded-[22px] border border-white/10 hover:border-white/30 shadow-xl active:scale-[0.99] transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 text-white flex items-center justify-center shrink-0 font-black text-sm group-hover:bg-white group-hover:text-black transition-all duration-200">
                  <FileText size={20} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                    <span className="font-bold text-white uppercase">{lesson.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{lesson.stepsCount || 6} verified steps</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-white truncate mt-0.5">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-zinc-400 truncate mt-0.5">
                    {lesson.subtitle || lesson.description}
                  </p>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-zinc-400 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-black transition-all ml-2">
                <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Pilot Evidence Dashboard Banner */}
      {onOpenPilotDashboard && (
        <div
          onClick={() => {
            sounds.playTap();
            onOpenPilotDashboard();
          }}
          className="p-5 bg-gradient-to-r from-[#0F1428] via-[#121832] to-[#0A0D1F] rounded-[22px] border border-indigo-500/30 flex items-center justify-between cursor-pointer hover:border-indigo-400 transition-all duration-200 shadow-xl text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-lg">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-white">Pilot Evidence Dashboard</h4>
              <p className="text-xs text-indigo-200 mt-0.5">Track frontline readiness & supervisor sign-offs</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider underline">
            View Dashboard
          </span>
        </div>
      )}

      {/* 5. Process Passport Review Banner */}
      <div
        onClick={() => {
          sounds.playTap();
          onOpenPassport();
        }}
        className="p-5 bg-gradient-to-r from-[#1C1713] via-[#141212] to-[#0E0D0D] rounded-[22px] border border-white/10 flex items-center justify-between cursor-pointer hover:border-white/30 transition-all duration-200 shadow-xl text-left"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/15 text-white flex items-center justify-center font-bold shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-white">Process Passport Audit</h4>
            <p className="text-xs text-zinc-400 mt-0.5">Review operational controls & safety rules</p>
          </div>
        </div>
        <span className="text-xs font-mono font-bold text-white uppercase tracking-wider underline">
          Audit
        </span>
      </div>
    </div>
  );
};
