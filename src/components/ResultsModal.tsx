import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import {
  RotateCcw,
  Share2,
  Download,
  Copy,
  Check,
  Trophy,
  Zap,
  Target,
  Clock,
  Sparkles,
  MessageCircle,
  X,
} from 'lucide-react';
import { GameResult } from '../types/game';
import { siteContent } from '../config/siteContent';
import { soundEngine } from '../utils/soundEngine';
import { downloadResultCard, shareResultNative, getWhatsAppShareUrl, generateShareText } from '../utils/cardGenerator';
import { ACHIEVEMENTS } from '../config/achievements';

interface ResultsModalProps {
  result: GameResult;
  unlockedAchievements: string[];
  onPlayAgain: () => void;
  onClose: () => void;
}

export const ResultsModal: React.FC<ResultsModalProps> = ({
  result,
  unlockedAchievements,
  onPlayAgain,
  onClose,
}) => {
  const [displayWpm, setDisplayWpm] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  // Animated WPM count-up effect
  useEffect(() => {
    let start = 0;
    const end = result.wpm;
    if (end === 0) return;
    const duration = 1200; // ms
    const stepTime = Math.max(10, Math.floor(duration / end));

    const timer = setInterval(() => {
      start += Math.ceil(end / 40);
      if (start >= end) {
        setDisplayWpm(end);
        clearInterval(timer);
      } else {
        setDisplayWpm(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [result.wpm]);

  // Handle Copy summary
  const handleCopySummary = async () => {
    soundEngine.playKeyClick(false);
    const summary = generateShareText(result);
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  // Handle Native Share
  const handleNativeShare = async () => {
    soundEngine.playKeyClick(false);
    const success = await shareResultNative(result);
    if (!success) {
      handleCopySummary();
    }
  };

  // Handle Download 1080p Result Card
  const handleDownload = async () => {
    soundEngine.playKeyClick(false);
    setIsDownloading(true);
    try {
      await downloadResultCard(result);
    } finally {
      setIsDownloading(false);
    }
  };

  // Accuracy Ring SVG Calculation
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (result.accuracy / 100) * circumference;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-pureBlack/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-4xl bg-pureBlack border-2 border-pureWhite/30 rounded-3xl p-6 sm:p-10 shadow-2xl my-8 overflow-hidden text-pureWhite"
      >
        {/* Subtle grid in modal background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-charcoal border border-subtleGray text-mutedGray hover:text-pureWhite hover:border-pureWhite transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-subtleGray">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-pureWhite text-pureBlack font-mono font-bold text-[10px] tracking-wider uppercase">
                {result.rank.name}
              </span>
              {result.isPersonalBest && (
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-pureWhite bg-charcoal text-pureWhite font-mono font-bold text-[10px] tracking-wider uppercase animate-pulse">
                  <Sparkles className="w-3 h-3 fill-current" />
                  {siteContent.results.newPersonalBestBadge}
                </span>
              )}
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase tracking-tight text-pureWhite">
              {siteContent.results.title}
            </h2>
            <p className="text-xs sm:text-sm text-mutedGray font-mono">
              {siteContent.results.subtitle} // {result.mode} ({result.timeElapsed}s)
            </p>
          </div>

          <div className="text-right sm:text-right font-mono text-xs text-mutedGray">
            <div>DATE: {result.date}</div>
            <div className="text-pureWhite font-bold">STATUS: VERIFIED</div>
          </div>
        </div>

        {/* Newly Unlocked Achievement Alert */}
        {unlockedAchievements.length > 0 && (
          <div className="mb-6 p-4 rounded-2xl bg-charcoal border border-pureWhite flex items-center gap-3">
            <Trophy className="w-6 h-6 text-pureWhite animate-bounce" />
            <div>
              <div className="text-xs font-mono font-bold text-pureWhite uppercase tracking-wider">
                ACHIEVEMENT UNLOCKED!
              </div>
              <div className="text-sm text-mutedGray">
                {unlockedAchievements
                  .map((id) => ACHIEVEMENTS.find((a) => a.id === id)?.title)
                  .join(', ')}
              </div>
            </div>
          </div>
        )}

        {/* Main Telemetry Grid: Giant WPM Count-up + Accuracy Ring */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Main WPM block */}
          <div className="md:col-span-2 p-6 rounded-2xl bg-charcoal border border-subtleGray flex flex-col justify-between relative overflow-hidden">
            <div className="text-xs font-mono tracking-widest text-mutedGray uppercase">
              {siteContent.results.stats.wpm}
            </div>
            <div className="flex items-baseline gap-3 my-2">
              <span className="font-heading font-black text-6xl sm:text-8xl text-pureWhite tracking-tighter tabular-nums">
                {displayWpm}
              </span>
              <span className="font-mono text-2xl text-mutedGray font-bold">WPM</span>
            </div>
            <div className="flex items-center gap-6 pt-3 border-t border-subtleGray text-xs font-mono text-mutedGray">
              <div>
                RAW: <span className="text-pureWhite font-bold">{result.rawWpm} WPM</span>
              </div>
              <div>
                KEYSTROKES: <span className="text-pureWhite font-bold">{result.totalKeystrokes}</span>
              </div>
              <div>
                TIME: <span className="text-pureWhite font-bold">{result.timeElapsed}s</span>
              </div>
            </div>
          </div>

          {/* Accuracy Ring block */}
          <div className="p-6 rounded-2xl bg-charcoal border border-subtleGray flex flex-col items-center justify-center text-center">
            <div className="text-xs font-mono tracking-widest text-mutedGray uppercase mb-3">
              {siteContent.results.stats.accuracy}
            </div>
            <div className="relative w-28 h-28 flex items-center justify-center mb-2">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 110 110">
                <circle
                  cx="55"
                  cy="55"
                  r={radius}
                  className="stroke-subtleGray"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="55"
                  cy="55"
                  r={radius}
                  className="stroke-pureWhite transition-all duration-1000 ease-out"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-heading font-black text-2xl text-pureWhite">
                  {result.accuracy.toFixed(0)}%
                </span>
              </div>
            </div>
            <div className="text-[11px] font-mono text-mutedGray">
              <span className="text-pureWhite font-bold">{result.correctChars}</span> correct /{' '}
              <span className="text-pureWhite font-bold">{result.incorrectChars}</span> mistakes
            </div>
          </div>
        </div>

        {/* WPM Velocity Chart over Time */}
        <div className="p-5 rounded-2xl bg-charcoal border border-subtleGray mb-6">
          <div className="flex items-center justify-between mb-3 text-xs font-mono">
            <span className="text-mutedGray uppercase tracking-wider">
              {siteContent.results.chartTitle}
            </span>
            <span className="text-mutedGray">TIME (SEC) VS VELOCITY</span>
          </div>
          <div className="h-44 sm:h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={result.wpmTimeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis
                  dataKey="time"
                  stroke="#555555"
                  tick={{ fill: '#888888', fontSize: 11, fontFamily: 'monospace' }}
                  tickLine={false}
                />
                <YAxis
                  stroke="#555555"
                  tick={{ fill: '#888888', fontSize: 11, fontFamily: 'monospace' }}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#000000',
                    borderColor: '#FFFFFF',
                    borderRadius: '8px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    color: '#FFFFFF',
                  }}
                  itemStyle={{ color: '#FFFFFF' }}
                  formatter={(val: any) => [`${val} WPM`, 'Velocity']}
                  labelFormatter={(lbl) => `Second ${lbl}`}
                />
                <Line
                  type="monotone"
                  dataKey="wpm"
                  stroke="#FFFFFF"
                  strokeWidth={3}
                  dot={{ r: 3, fill: '#FFFFFF' }}
                  activeDot={{ r: 6, fill: '#FFFFFF' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {/* Play Again */}
          <button
            onClick={() => {
              soundEngine.playKeyClick(false);
              onPlayAgain();
            }}
            className="col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-pureWhite text-pureBlack font-mono font-black text-xs uppercase tracking-wider hover:bg-lightGray active:scale-95 transition-all flex items-center justify-center gap-2 border border-pureWhite shadow-brutal-white hover:shadow-none"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{siteContent.results.playAgainCta}</span>
          </button>

          {/* Download 1080p Card */}
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="p-3.5 rounded-xl bg-charcoal text-pureWhite font-mono font-bold text-xs uppercase tracking-wider hover:bg-darkGray hover:border-pureWhite active:scale-95 transition-all border border-subtleGray flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>{isDownloading ? 'GENERATING...' : '1080P CARD'}</span>
          </button>

          {/* Share Native */}
          <button
            onClick={handleNativeShare}
            className="p-3.5 rounded-xl bg-charcoal text-pureWhite font-mono font-bold text-xs uppercase tracking-wider hover:bg-darkGray hover:border-pureWhite active:scale-95 transition-all border border-subtleGray flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>{siteContent.results.shareResultCta}</span>
          </button>

          {/* WhatsApp Direct Share */}
          <a
            href={getWhatsAppShareUrl(result)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEngine.playKeyClick(false)}
            className="p-3.5 rounded-xl bg-charcoal text-pureWhite font-mono font-bold text-xs uppercase tracking-wider hover:bg-darkGray hover:border-pureWhite active:scale-95 transition-all border border-subtleGray flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{siteContent.results.whatsappCta}</span>
          </a>
        </div>

        {/* Copy text summary footer */}
        <div className="mt-4 flex items-center justify-between pt-4 border-t border-subtleGray/40 text-xs font-mono text-mutedGray">
          <button
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 hover:text-pureWhite transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-pureWhite" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? siteContent.results.copiedNotice : siteContent.results.copySummaryCta}</span>
          </button>

          <span className="italic">{siteContent.branding.tagline}</span>
        </div>
      </motion.div>
    </div>
  );
};
