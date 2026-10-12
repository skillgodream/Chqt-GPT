import React from 'react';
import ClayArt from './ClayArt';

interface LessonCardProps {
  title: string;
  subtitle: string;
  color: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  artType?: 'scanner' | 'box' | 'tote' | 'safety' | 'clipboard' | 'trolley';
  progress?: number;
  onClick?: () => void;
}

export default function LessonCard({
  title,
  subtitle,
  color,
  icon: Icon,
  artType,
  progress = 50,
  onClick,
}: LessonCardProps) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <button
      onClick={onClick}
      className="text-left w-full p-4 sm:p-5 rounded-[22px] bg-[#121318] hover:bg-[#1A1C24] border border-white/10 hover:border-white/30 flex flex-col justify-between transition-all duration-200 active:scale-[0.98] cursor-pointer shadow-xl group"
    >
      <div className="flex items-start justify-between w-full mb-3">
        {/* Progress Ring with Clay/Icon Artwork inside */}
        <div className="relative w-11 h-11 shrink-0">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="22"
              cy="22"
              r="18"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="3"
              fill="transparent"
            />
            <circle
              cx="22"
              cy="22"
              r="18"
              stroke="#FFFFFF"
              strokeWidth="3"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 18}
              strokeDashoffset={2 * Math.PI * 18 - (progress / 100) * 2 * Math.PI * 18}
              strokeLinecap="round"
            />
          </svg>

          {/* Centered Artwork or Icon */}
          <div className="absolute inset-0 flex items-center justify-center p-1">
            {artType ? (
              <ClayArt type={artType} size={24} />
            ) : Icon ? (
              <Icon size={18} className="text-white" />
            ) : null}
          </div>
        </div>

        {/* Mini Percentage Badge */}
        <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono font-bold text-white shadow-2xs">
          {progress}%
        </span>
      </div>

      <div>
        <h3 className="text-sm sm:text-base font-extrabold text-white leading-snug tracking-tight group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="text-xs font-medium text-zinc-400 mt-1 line-clamp-2">{subtitle}</p>
      </div>
    </button>
  );
}
