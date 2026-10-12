import React, { useState } from 'react';
import { User, Volume2, VolumeX, Moon, Sun, RotateCcw, Shield, Award, Check, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

interface ProfileViewProps {
  onResetData: () => void;
  onOpenBentoShowcase?: () => void;
  onOpenPassport?: () => void;
}

export default function ProfileView({ onResetData, onOpenBentoShowcase, onOpenPassport }: ProfileViewProps) {
  const [audioEnabled, setAudioEnabled] = useState(sounds.isSoundEnabled());
  const [darkMode, setDarkMode] = useState(true);
  const [resetSuccess, setResetSuccess] = useState(false);

  const toggleAudio = () => {
    const next = !audioEnabled;
    setAudioEnabled(next);
    sounds.setSoundEnabled(next);
    if (next) {
      sounds.playTap();
      sounds.speak('Sound effects enabled');
    }
  };

  const handleReset = () => {
    sounds.playTap();
    onResetData();
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto px-6 pt-4 pb-28 space-y-6 text-left">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Worker Profile</h1>
        <p className="text-xs sm:text-sm font-medium text-zinc-400 mt-1">
          Shift credentials & device preferences
        </p>
      </div>

      {/* User Card */}
      <div className="bg-[#121318] rounded-[24px] p-5 border border-white/10 shadow-xl flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center font-black text-xl shadow-md shrink-0">
          VS
        </div>
        <div>
          <h2 className="text-lg font-black text-white">Vikram Sharma</h2>
          <p className="text-xs font-bold text-emerald-400">Fulfillment Specialist · Bay A/B</p>
          <span className="text-[11px] font-mono font-medium text-zinc-400 block mt-0.5">
            Badge ID: WMS-88492 · Shift 1
          </span>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#121318] p-4 rounded-[20px] border border-white/10 text-center shadow-xl">
          <span className="text-[10px] uppercase font-mono font-bold text-zinc-400 block">Drills</span>
          <span className="text-xl font-black text-white mt-0.5 block">24</span>
        </div>
        <div className="bg-[#121318] p-4 rounded-[20px] border border-white/10 text-center shadow-xl">
          <span className="text-[10px] uppercase font-mono font-bold text-zinc-400 block">Accuracy</span>
          <span className="text-xl font-black text-emerald-400 mt-0.5 block">99.2%</span>
        </div>
        <div className="bg-[#121318] p-4 rounded-[20px] border border-white/10 text-center shadow-xl">
          <span className="text-[10px] uppercase font-mono font-bold text-zinc-400 block">Tier</span>
          <span className="text-xl font-black text-white mt-0.5 block">Level 2</span>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
          Audio & Display Settings
        </h3>

        {/* Audio Toggle */}
        <button
          onClick={toggleAudio}
          className="w-full p-4 bg-[#121318] hover:bg-[#1A1C24] rounded-[22px] border border-white/10 flex items-center justify-between active:scale-[0.985] transition-all shadow-xl cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-white/10 text-white flex items-center justify-center shrink-0">
              {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </div>
            <div className="text-left">
              <span className="text-sm font-extrabold text-white block">Audio Sound Effects & Voice</span>
              <span className="text-xs text-zinc-400 font-medium block">
                {audioEnabled ? 'Voice coach and sound chimes enabled' : 'Muted'}
              </span>
            </div>
          </div>
          <div
            className={`w-12 h-7 rounded-full transition-colors flex items-center px-1 ${
              audioEnabled ? 'bg-white justify-end' : 'bg-white/10 justify-start'
            }`}
          >
            <div className={`w-5 h-5 rounded-full shadow-sm ${audioEnabled ? 'bg-black' : 'bg-zinc-400'}`} />
          </div>
        </button>

        {/* Bento Architecture Showcase Launcher */}
        {onOpenBentoShowcase && (
          <button
            onClick={() => {
              sounds.playTap();
              onOpenBentoShowcase();
            }}
            className="w-full p-4 bg-[#121318] hover:bg-[#1A1C24] text-white rounded-[22px] border border-white/10 flex items-center justify-between active:scale-[0.985] transition-all shadow-xl cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-white/10 text-white flex items-center justify-center shrink-0 border border-white/15">
                <Sparkles size={18} />
              </div>
              <div className="text-left">
                <span className="text-sm font-extrabold text-white block">Bento Architecture Showcase</span>
                <span className="text-xs text-zinc-400 font-medium block">
                  Interactive component architecture preview
                </span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-white bg-white/10 px-3 py-1 rounded-full border border-white/15">
              Preview →
            </span>
          </button>
        )}
      </div>

      {/* Safety Compliance & Reset */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
          Data & Compliance
        </h3>

        <div className="p-4 bg-[#121318] border border-emerald-500/30 rounded-[22px] flex items-center gap-3.5 text-xs font-bold text-emerald-300">
          <Shield size={20} className="shrink-0 text-emerald-400" />
          <span>Workplace safety credentials active and verified.</span>
        </div>

        {/* Process Passport Builder Launcher */}
        {onOpenPassport && (
          <button
            onClick={() => {
              sounds.playTap();
              onOpenPassport();
            }}
            className="w-full p-4 bg-[#121318] hover:bg-[#1A1C24] border border-white/10 text-white rounded-[22px] flex items-center justify-between active:scale-[0.985] transition-all cursor-pointer shadow-xl"
          >
            <div className="text-left">
              <span className="text-sm font-extrabold text-white block">Process Passport Audit</span>
              <span className="text-xs text-zinc-400 font-medium block">
                Trainer review & sign-off basics sheet
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-white bg-white/10 px-3 py-1 rounded-full border border-white/15">
              Inspect →
            </span>
          </button>
        )}

        <button
          onClick={handleReset}
          className="w-full h-12 rounded-full border border-rose-500/30 bg-rose-950/30 text-rose-300 font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-rose-900/40 active:scale-98 transition-all cursor-pointer"
        >
          {resetSuccess ? (
            <>
              <Check size={16} className="text-emerald-400" />
              <span className="text-emerald-300">Practice History Reset!</span>
            </>
          ) : (
            <>
              <RotateCcw size={16} /> Reset Practice Scores to Default
            </>
          )}
        </button>
      </div>
    </div>
  );
}
