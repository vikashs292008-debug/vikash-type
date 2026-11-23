import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, Flame, Target, ShieldCheck, Gauge, Sparkles, Play, X, CheckCircle2, Lock } from 'lucide-react';
import { ACHIEVEMENTS, Achievement } from '../config/achievements';
import { siteContent } from '../config/siteContent';
import { getPlayerStats } from '../utils/storage';
import { soundEngine } from '../utils/soundEngine';

interface AchievementsModalProps {
  onClose: () => void;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({ onClose }) => {
  const stats = getPlayerStats();
  const unlockedSet = new Set(stats.unlockedAchievements);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Play':
        return <Play className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'Flame':
        return <Flame className="w-5 h-5" />;
      case 'Trophy':
        return <Trophy className="w-5 h-5" />;
      case 'Target':
        return <Target className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'Gauge':
        return <Gauge className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      default:
        return <Trophy className="w-5 h-5" />;
    }
  };

  const unlockedCount = unlockedSet.size;
  const totalCount = ACHIEVEMENTS.length;
  const progressPercent = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-pureBlack/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-3xl bg-pureBlack border-2 border-subtleGray rounded-3xl p-6 sm:p-10 shadow-2xl my-8 overflow-hidden text-pureWhite"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playKeyClick(false);
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-xl bg-charcoal border border-subtleGray text-mutedGray hover:text-pureWhite hover:border-pureWhite transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pb-6 mb-6 border-b border-subtleGray">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-4 h-4 text-pureWhite" />
            <span className="text-xs font-mono text-mutedGray uppercase tracking-wider">
              {siteContent.achievements.subtitle}
            </span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase tracking-tight text-pureWhite">
            {siteContent.achievements.title}
          </h2>

          {/* Mastery Progress Bar */}
          <div className="mt-4 p-4 rounded-2xl bg-charcoal border border-subtleGray">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-mutedGray uppercase">
                {siteContent.achievements.progressLabel}
              </span>
              <span className="text-pureWhite font-bold">
                {unlockedCount} / {totalCount} BADGES ({progressPercent}%)
              </span>
            </div>
            <div className="w-full h-2 bg-darkGray rounded-full overflow-hidden">
              <div
                className="h-full bg-pureWhite transition-all duration-500 shadow-glow-white"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-1">
          {ACHIEVEMENTS.map((ach) => {
            const isUnlocked = unlockedSet.has(ach.id);
            return (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'bg-charcoal border-pureWhite/60 shadow-sm'
                    : 'bg-charcoal/40 border-subtleGray opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isUnlocked
                        ? 'bg-pureWhite text-pureBlack'
                        : 'bg-darkGray text-mutedGray'
                    }`}
                  >
                    {isUnlocked ? getIcon(ach.iconName) : <Lock className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-heading font-black text-sm uppercase text-pureWhite">
                        {ach.title}
                      </h4>
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                          isUnlocked
                            ? 'bg-pureWhite text-pureBlack'
                            : 'bg-darkGray text-mutedGray'
                        }`}
                      >
                        {isUnlocked ? 'UNLOCKED' : 'LOCKED'}
                      </span>
                    </div>
                    <p className="text-xs text-mutedGray mt-1 leading-relaxed">
                      {ach.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-subtleGray/40 text-center text-xs font-mono text-mutedGray">
          Achievements unlock automatically upon meeting speed & precision thresholds in the arena.
        </div>
      </motion.div>
    </div>
  );
};
