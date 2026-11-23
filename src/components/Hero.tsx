import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Zap, Terminal, Sparkles, ChevronRight, Activity } from 'lucide-react';
import { siteContent } from '../config/siteContent';
import { soundEngine } from '../utils/soundEngine';

interface HeroProps {
  onStartTyping: () => void;
  onViewLeaderboard: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartTyping, onViewLeaderboard }) => {
  const [activeKey, setActiveKey] = useState<string>('V');

  // Random keys lighting up to give that energetic arcade cyber pulse
  useEffect(() => {
    const keys = ['V', 'I', 'K', 'A', 'S', 'H', 'T', 'Y', 'P', 'E', 'SPACE', 'ENTER'];
    const interval = setInterval(() => {
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      setActiveKey(randomKey);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  const headlineWords1 = siteContent.hero.headlineLine1.split(' ');
  const headlineWords2 = siteContent.hero.headlineLine2.split(' ');

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-center items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-grid-pattern">
      {/* Background radial gradient glow for depth */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)]" />

      {/* Floating telemetry pills */}
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center z-10">
        
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-subtleGray bg-charcoal/90 backdrop-blur-sm mb-6 sm:mb-8 text-xs font-mono tracking-widest text-mutedGray uppercase"
        >
          <span className="w-2 h-2 rounded-full bg-pureWhite animate-pulse" />
          <span>{siteContent.hero.badge}</span>
          <span className="text-pureWhite font-bold ml-1">#001</span>
        </motion.div>

        {/* Cinematic Headline - Word by Word Stagger */}
        <div className="font-heading font-black tracking-tighter text-4xl sm:text-6xl md:text-8xl lg:text-9xl uppercase leading-[0.9] text-pureWhite mb-6 select-none">
          <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-6">
            {headlineWords1.map((word, idx) => (
              <motion.span
                key={'h1-' + idx}
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="inline-block hover:text-lightGray transition-colors"
              >
                {word}
              </motion.span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-6 mt-1 sm:mt-2">
            {headlineWords2.map((word, idx) => (
              <motion.span
                key={'h2-' + idx}
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.12 }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-pureWhite via-pureWhite to-mutedGray"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-2xl text-base sm:text-lg md:text-xl text-mutedGray font-normal leading-relaxed mb-10 px-4"
        >
          {siteContent.hero.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-4 mb-14"
        >
          <button
            onClick={() => {
              soundEngine.playKeyClick(false);
              onStartTyping();
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-pureWhite text-pureBlack font-mono font-black text-sm uppercase tracking-wider hover:bg-lightGray active:scale-95 transition-all shadow-brutal-white hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex items-center justify-center gap-3 border border-pureWhite"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>{siteContent.hero.primaryCta}</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              soundEngine.playKeyClick(false);
              onViewLeaderboard();
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-charcoal text-pureWhite font-mono font-medium text-sm uppercase tracking-wider hover:bg-darkGray hover:border-pureWhite/50 active:scale-95 transition-all border border-subtleGray flex items-center justify-center gap-2"
          >
            <span>{siteContent.hero.secondaryCta}</span>
          </button>
        </motion.div>

        {/* Floating Telemetry Stats */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 w-full max-w-4xl px-4 mb-12"
        >
          {siteContent.hero.floatingStats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-xl border border-subtleGray bg-charcoal/60 backdrop-blur-sm text-left hover:border-pureWhite/40 transition-all group"
            >
              <div className="text-[11px] font-mono tracking-widest text-mutedGray uppercase mb-1">
                {stat.label}
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-heading font-black text-3xl sm:text-4xl text-pureWhite group-hover:tracking-wider transition-all">
                  {stat.value}
                </span>
                <span className="font-mono text-sm text-mutedGray font-bold">
                  {stat.suffix}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Animated Cyber Mechanical Keyboard Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="w-full max-w-3xl p-4 sm:p-6 rounded-2xl border-2 border-subtleGray bg-charcoal/80 shadow-2xl backdrop-blur-md mb-8"
        >
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-subtleGray text-xs font-mono text-mutedGray">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pureWhite" />
              VIKASH MECHANICAL MATRIX 60%
            </span>
            <span className="uppercase tracking-widest">TACTILE FEEDBACK</span>
          </div>

          <div className="grid grid-cols-12 gap-1 sm:gap-2">
            {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'].map((k) => (
              <div
                key={k}
                className={`h-8 sm:h-11 rounded-lg border flex items-center justify-center font-mono font-bold text-xs sm:text-sm transition-all duration-200 ${
                  activeKey === k
                    ? 'bg-pureWhite text-pureBlack border-pureWhite shadow-glow-white scale-105'
                    : 'bg-darkGray/60 text-mutedGray border-subtleGray'
                }`}
              >
                {k}
              </div>
            ))}
            {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'RET'].map((k) => (
              <div
                key={k}
                className={`h-8 sm:h-11 rounded-lg border flex items-center justify-center font-mono font-bold text-xs sm:text-sm transition-all duration-200 ${
                  activeKey === k
                    ? 'bg-pureWhite text-pureBlack border-pureWhite shadow-glow-white scale-105'
                    : 'bg-darkGray/60 text-mutedGray border-subtleGray'
                }`}
              >
                {k}
              </div>
            ))}
            {['SHFT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'UP'].map((k) => (
              <div
                key={k}
                className={`h-8 sm:h-11 rounded-lg border flex items-center justify-center font-mono font-bold text-xs sm:text-sm transition-all duration-200 ${
                  activeKey === k
                    ? 'bg-pureWhite text-pureBlack border-pureWhite shadow-glow-white scale-105'
                    : 'bg-darkGray/60 text-mutedGray border-subtleGray'
                }`}
              >
                {k}
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-2">
            <div className="w-1/6 h-8 sm:h-10 rounded-lg bg-darkGray/60 border border-subtleGray flex items-center justify-center text-[10px] font-mono text-mutedGray">
              CTRL
            </div>
            <div className="w-1/6 h-8 sm:h-10 rounded-lg bg-darkGray/60 border border-subtleGray flex items-center justify-center text-[10px] font-mono text-mutedGray">
              ALT
            </div>
            <div
              className={`flex-1 h-8 sm:h-10 rounded-lg border flex items-center justify-center text-xs font-mono tracking-widest uppercase transition-all duration-200 ${
                activeKey === 'SPACE'
                  ? 'bg-pureWhite text-pureBlack border-pureWhite shadow-glow-white'
                  : 'bg-darkGray/60 text-mutedGray border-subtleGray'
              }`}
            >
              SPACEBAR
            </div>
            <div className="w-1/6 h-8 sm:h-10 rounded-lg bg-darkGray/60 border border-subtleGray flex items-center justify-center text-[10px] font-mono text-mutedGray">
              FN
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <button
          onClick={onStartTyping}
          className="flex flex-col items-center gap-2 text-xs font-mono text-mutedGray hover:text-pureWhite transition-colors animate-bounce mt-4"
        >
          <span>SCROLL TO ENTER ARENA</span>
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
