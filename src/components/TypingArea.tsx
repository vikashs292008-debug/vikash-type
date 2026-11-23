import React, { useRef, useEffect, useState } from 'react';
import { RotateCcw, AlertCircle, Play, CheckCircle2, Lock } from 'lucide-react';
import { siteContent } from '../config/siteContent';
import { soundEngine } from '../utils/soundEngine';

interface TypingAreaProps {
  targetText: string;
  userInput: string;
  authorInfo?: string;
  status: 'idle' | 'running' | 'paused' | 'finished';
  onInput: (val: string) => void;
  onReset: () => void;
  onFinishZen?: () => void;
  isZenMode?: boolean;
}

export const TypingArea: React.FC<TypingAreaProps> = ({
  targetText,
  userInput,
  authorInfo,
  status,
  onInput,
  onReset,
  onFinishZen,
  isZenMode = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [isFocused, setIsFocused] = useState(true);

  // Keep input focused
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      setIsFocused(true);
    }
  };

  useEffect(() => {
    focusInput();
  }, [targetText, status]);

  // Global keydown listeners for shortcuts (Tab to restart, Esc to restart/finish, CapsLock check)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check Caps Lock state
      if (e.getModifierState && e.getModifierState('CapsLock')) {
        setCapsLockActive(true);
      } else {
        setCapsLockActive(false);
      }

      // Quick restart with Tab or Escape
      if (e.key === 'Tab') {
        e.preventDefault();
        soundEngine.playKeyClick(false);
        onReset();
        focusInput();
      } else if (e.key === 'Escape' && isZenMode && onFinishZen) {
        e.preventDefault();
        onFinishZen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onReset, isZenMode, onFinishZen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInput(e.target.value);
  };

  // Block pasting
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    soundEngine.playError();
  };

  return (
    <div
      ref={containerRef}
      onClick={focusInput}
      className="relative w-full max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-charcoal/90 border-2 border-subtleGray shadow-2xl backdrop-blur-md cursor-text transition-all duration-300 hover:border-mutedGray/50"
    >
      {/* Hidden real input element capturing all keyboard, virtual keyboard, and IME input */}
      <input
        ref={inputRef}
        type="text"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        value={userInput}
        onChange={handleChange}
        onPaste={handlePaste}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="absolute inset-0 opacity-0 pointer-events-auto cursor-text w-full h-full -z-10"
        aria-label="Typing input stream"
      />

      {/* Top Header inside card: Mode hints / Caps Lock Alert */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-subtleGray/40 text-xs font-mono text-mutedGray">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-pureWhite">
            <span className="w-2 h-2 rounded-full bg-pureWhite animate-pulse" />
            LIVE ARENA FEED
          </span>
          {capsLockActive && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-pureWhite text-pureBlack font-bold text-[10px]">
              <Lock className="w-3 h-3" />
              {siteContent.typingArena.capsLockWarning}
            </span>
          )}
        </div>

        {/* Quick Restart Hint */}
        <div className="hidden sm:flex items-center gap-2">
          <span>{siteContent.typingArena.restartHint}</span>
        </div>
      </div>

      {/* Interactive Text Display */}
      <div className="font-mono text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed tracking-normal select-none break-words min-h-[160px] sm:min-h-[200px] flex flex-wrap content-start">
        {targetText.split('').map((char, index) => {
          const isTyped = index < userInput.length;
          const isCurrent = index === userInput.length;
          const isCorrect = isTyped && userInput[index] === char;
          const isIncorrect = isTyped && userInput[index] !== char;

          let colorClass = 'text-mutedGray/40';
          if (isCorrect) {
            colorClass = 'text-pureWhite';
          } else if (isIncorrect) {
            colorClass = 'text-pureWhite bg-darkGray border-b-2 border-pureWhite font-bold';
          }

          return (
            <span key={index} className="relative inline-flex items-center">
              {/* Animated Caret */}
              {isCurrent && (
                <span className="absolute -left-[2px] top-1 bottom-1 w-[3px] bg-pureWhite rounded-full shadow-glow-white caret-blink z-20" />
              )}
              <span className={`transition-colors duration-100 ${colorClass}`}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            </span>
          );
        })}
      </div>

      {/* Author information if quote */}
      {authorInfo && (
        <div className="mt-6 pt-3 border-t border-subtleGray/40 text-right text-xs font-mono text-mutedGray italic">
          — {authorInfo}
        </div>
      )}

      {/* Bottom Action Bar */}
      <div className="mt-8 pt-4 border-t border-subtleGray/50 flex flex-wrap items-center justify-between gap-4">
        {/* Restart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            soundEngine.playKeyClick(false);
            onReset();
            focusInput();
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-darkGray hover:bg-subtleGray text-pureWhite font-mono text-xs uppercase tracking-wider transition-all border border-subtleGray active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>RESTART RUN</span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-charcoal text-[10px] text-mutedGray border border-subtleGray ml-1">
            TAB
          </span>
        </button>

        {/* Zen Mode Finish CTA */}
        {isZenMode && onFinishZen && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFinishZen();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-pureWhite text-pureBlack font-mono text-xs font-bold uppercase tracking-wider transition-all hover:bg-lightGray active:scale-95 shadow-sm"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>FINISH ZEN SESSION</span>
          </button>
        )}

        <div className="text-[11px] font-mono text-mutedGray">
          {status === 'idle'
            ? 'Type first key to ignite sprint'
            : status === 'running'
            ? 'Arena active'
            : 'Session completed'}
        </div>
      </div>

      {/* Unfocused / Paused Overlay */}
      {status === 'paused' && (
        <div className="absolute inset-0 bg-pureBlack/85 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center p-6 text-center z-30 animate-fadeIn">
          <div className="w-12 h-12 rounded-full border border-pureWhite flex items-center justify-center mb-3 text-pureWhite">
            <Play className="w-5 h-5 ml-0.5" />
          </div>
          <h3 className="font-heading font-black text-2xl text-pureWhite uppercase tracking-wider mb-1">
            {siteContent.typingArena.pauseOverlayTitle}
          </h3>
          <p className="text-sm text-mutedGray max-w-sm mb-4">
            {siteContent.typingArena.pauseOverlaySubtitle}
          </p>
          <button
            onClick={focusInput}
            className="px-6 py-2.5 rounded-xl bg-pureWhite text-pureBlack font-mono font-bold text-xs uppercase tracking-wider hover:bg-lightGray"
          >
            {siteContent.typingArena.clickToFocus}
          </button>
        </div>
      )}
    </div>
  );
};
