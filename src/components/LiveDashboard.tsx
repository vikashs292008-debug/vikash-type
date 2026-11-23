import React from 'react';
import { siteContent } from '../config/siteContent';
import { GameModeType } from '../config/gameModes';

interface LiveDashboardProps {
  wpm: number;
  accuracy: number;
  timeLeft: number;
  timeElapsed: number;
  mode: GameModeType;
  modeOption: number;
  totalKeystrokes: number;
  status: 'idle' | 'running' | 'paused' | 'finished';
}

export const LiveDashboard: React.FC<LiveDashboardProps> = ({
  wpm,
  accuracy,
  timeLeft,
  timeElapsed,
  mode,
  modeOption,
  totalKeystrokes,
  status,
}) => {
  // Calculate progress % for thin animated progress bar
  let progressPercent = 0;
  if (mode === 'time' || mode === 'numbers' || mode === 'punctuation') {
    progressPercent = modeOption > 0 ? Math.min(100, Math.max(0, ((modeOption - timeLeft) / modeOption) * 100)) : 0;
  }

  const isTimed = mode === 'time' || mode === 'numbers' || mode === 'punctuation';
  const displayTimer = isTimed ? timeLeft : timeElapsed;

  return (
    <div className="w-full max-w-4xl mx-auto mb-4 sm:mb-6">
      {/* 3 Large Animated Statistics Cards */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-3 sm:mb-4">
        {/* WPM Counter */}
        <div className="p-3 sm:p-5 rounded-2xl bg-charcoal border border-subtleGray text-center relative overflow-hidden group hover:border-pureWhite/30 transition-all">
          <div className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-mutedGray uppercase mb-1">
            {siteContent.dashboard.wpmLabel}
          </div>
          <div className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-pureWhite tabular-nums tracking-tight">
            {wpm}
          </div>
          <div className="text-[9px] sm:text-[10px] font-mono text-mutedGray uppercase mt-0.5 sm:mt-1">
            NET SPEED
          </div>
        </div>

        {/* ACCURACY Counter */}
        <div className="p-3 sm:p-5 rounded-2xl bg-charcoal border border-subtleGray text-center relative overflow-hidden group hover:border-pureWhite/30 transition-all">
          <div className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-mutedGray uppercase mb-1">
            {siteContent.dashboard.accuracyLabel}
          </div>
          <div className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-pureWhite tabular-nums tracking-tight">
            {accuracy.toFixed(0)}
            <span className="text-xl sm:text-3xl text-mutedGray font-mono font-normal">%</span>
          </div>
          <div className="text-[9px] sm:text-[10px] font-mono text-mutedGray uppercase mt-0.5 sm:mt-1">
            PRECISION
          </div>
        </div>

        {/* TIME LEFT / ELAPSED Counter */}
        <div className="p-3 sm:p-5 rounded-2xl bg-charcoal border border-subtleGray text-center relative overflow-hidden group hover:border-pureWhite/30 transition-all">
          <div className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-mutedGray uppercase mb-1">
            {isTimed ? siteContent.dashboard.timeRemainingLabel : 'TIME ELAPSED'}
          </div>
          <div className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-pureWhite tabular-nums tracking-tight">
            {displayTimer}
            <span className="text-xl sm:text-3xl text-mutedGray font-mono font-normal">s</span>
          </div>
          <div className="text-[9px] sm:text-[10px] font-mono text-mutedGray uppercase mt-0.5 sm:mt-1">
            {isTimed ? `${modeOption}S SPRINT` : `${totalKeystrokes} STROKES`}
          </div>
        </div>
      </div>

      {/* Thin Animated Progress Bar */}
      {isTimed && (
        <div className="w-full h-1 bg-darkGray rounded-full overflow-hidden">
          <div
            className="h-full bg-pureWhite transition-all duration-300 ease-linear shadow-glow-white"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}
    </div>
  );
};
