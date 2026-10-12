import React from 'react';
import { Award, CheckCircle2, TrendingUp, Zap, RotateCcw } from 'lucide-react';
import { Lesson } from '../types';
import ClayArt from './ClayArt';
import { sounds } from '../utils/audio';

interface ProgressViewProps {
  lessons: Lesson[];
  onStartSimulation: (lessonId: string) => void;
}

export default function ProgressView({ lessons, onStartSimulation }: ProgressViewProps) {
  const avgMastery = Math.round(
    lessons.reduce((acc, curr) => acc + curr.masteryPercentage, 0) / lessons.length
  );

  return (
    <div className="flex-1 flex flex-col overflow-y-auto px-6 pt-4 pb-28 space-y-5 text-left">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Your Progress</h1>
        <p className="text-xs sm:text-sm font-medium text-zinc-400 mt-1">
          Mastery metrics & floor readiness evaluation
        </p>
      </div>

      {/* Hero Readiness Card */}
      <div className="bg-gradient-to-b from-[#181920] via-[#121318] to-[#0A0B0E] rounded-[24px] p-6 text-white shadow-2xl relative overflow-hidden border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/20 uppercase tracking-wider">
            FLOOR READY
          </span>
          <span className="text-xs font-mono font-bold text-zinc-400">Level 2 Certified</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="transparent" />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="#10B981"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={2 * Math.PI * 40 - (avgMastery / 100) * 2 * Math.PI * 40}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-white">{avgMastery}%</span>
              <span className="text-[9px] uppercase font-mono font-bold text-zinc-400">Mastery</span>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-black text-white leading-tight">Floor Qualification</h2>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              3 of 4 core modules mastered with high accuracy. Ready for active shift operations.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sounds.playTap();
            onStartSimulation('diag-lab-104');
          }}
          className="w-full h-12 rounded-full bg-white text-black font-extrabold text-xs mt-5 flex items-center justify-center gap-2 hover:bg-slate-100 active:scale-98 transition-all shadow-xl cursor-pointer"
        >
          <RotateCcw size={16} /> Run Shift Readiness Drill
        </button>
      </div>

      {/* Module Breakdown List */}
      <div>
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 mb-3">
          Module Competency Breakdown
        </h3>
        <div className="space-y-3">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="p-4 bg-[#121318] rounded-[22px] border border-white/10 shadow-xl flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-white/10 text-white flex items-center justify-center shrink-0 font-bold text-sm">
                  <CheckCircle2 size={20} className="text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">{lesson.title}</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">{lesson.category} · {lesson.masteryPercentage || 85}% Mastery</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges Earned */}
      <div className="bg-[#121318] border border-white/10 rounded-[22px] p-5">
        <div className="flex items-center gap-2 mb-3">
          <Award size={18} className="text-amber-400" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-300">
            Earned Qualifications
          </h4>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs font-extrabold text-white">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>Zero Control Error</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2">
            <Zap size={16} className="text-amber-400" />
            <span>SOP Audit Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
