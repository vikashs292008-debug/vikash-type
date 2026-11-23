import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ModeSelector } from './components/ModeSelector';
import { LiveDashboard } from './components/LiveDashboard';
import { TypingArea } from './components/TypingArea';
import { ResultsModal } from './components/ResultsModal';
import { Leaderboard } from './components/Leaderboard';
import { StatisticsDashboard } from './components/StatisticsDashboard';
import { AchievementsModal } from './components/AchievementsModal';
import { CustomTextModal } from './components/CustomTextModal';
import { Footer } from './components/Footer';
import { useTypingEngine } from './hooks/useTypingEngine';
import { soundEngine } from './utils/soundEngine';

export function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(soundEngine.isEnabled());
  const [achievementsOpen, setAchievementsOpen] = useState<boolean>(false);
  const [customModalOpen, setCustomModalOpen] = useState<boolean>(false);
  const [resultsModalClosedManually, setResultsModalClosedManually] = useState<boolean>(false);

  const {
    mode,
    setMode,
    modeOption,
    setModeOption,
    customText,
    setCustomText,
    targetText,
    authorInfo,
    userInput,
    status,
    timeLeft,
    timeElapsed,
    liveWpm,
    liveRawWpm,
    liveAccuracy,
    totalKeystrokes,
    result,
    unlockedAchievements,
    handleInput,
    resetGame,
    finishGame,
  } = useTypingEngine({ initialMode: 'time', initialOption: 30 });

  // Handle Theme Switch
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (next === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  };

  // Toggle Sound
  const toggleSound = () => {
    const newVal = soundEngine.toggle();
    setSoundEnabled(newVal);
  };

  // Smooth scroll to sections
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartTypingFromHero = () => {
    scrollTo('arena');
  };

  const handlePlayAgain = () => {
    setResultsModalClosedManually(false);
    resetGame();
  };

  return (
    <div className={`min-h-screen bg-pureBlack text-pureWhite bg-grain relative selection:bg-pureWhite selection:text-pureBlack`}>
      {/* Sticky Header */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onOpenAchievements={() => setAchievementsOpen(true)}
        onScrollTo={scrollTo}
      />

      {/* Hero Section */}
      <Hero
        onStartTyping={handleStartTypingFromHero}
        onViewLeaderboard={() => scrollTo('leaderboard')}
      />

      {/* Main Arena Section */}
      <section id="arena" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-24">
        {/* Arena Header Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-subtleGray bg-charcoal text-[11px] font-mono tracking-widest text-mutedGray uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-pureWhite animate-pulse" />
            <span>INTERACTIVE TYPING ARENA</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-pureWhite">
            TEST YOUR VELOCITY
          </h2>
        </div>

        {/* Mode Selector */}
        <ModeSelector
          currentMode={mode}
          currentOption={modeOption}
          onSelectMode={(newMode, defOpt) => {
            setMode(newMode);
            if (defOpt) setModeOption(defOpt);
          }}
          onSelectOption={(opt) => setModeOption(opt)}
          onOpenCustomModal={() => setCustomModalOpen(true)}
        />

        {/* Live Dashboard with big telemetry numbers */}
        <LiveDashboard
          wpm={liveWpm}
          accuracy={liveAccuracy}
          timeLeft={timeLeft}
          timeElapsed={timeElapsed}
          mode={mode}
          modeOption={modeOption}
          totalKeystrokes={totalKeystrokes}
          status={status}
        />

        {/* Typing Input Canvas */}
        <TypingArea
          targetText={targetText}
          userInput={userInput}
          authorInfo={authorInfo}
          status={status}
          onInput={handleInput}
          onReset={resetGame}
          onFinishZen={finishGame}
          isZenMode={mode === 'zen'}
        />
      </section>

      {/* Leaderboard Section */}
      <Leaderboard />

      {/* Player Statistics Telemetry */}
      <StatisticsDashboard onStartTest={() => scrollTo('arena')} />

      {/* Footer */}
      <Footer />

      {/* Results Modal */}
      {status === 'finished' && result && !resultsModalClosedManually && (
        <ResultsModal
          result={result}
          unlockedAchievements={unlockedAchievements}
          onPlayAgain={handlePlayAgain}
          onClose={() => setResultsModalClosedManually(true)}
        />
      )}

      {/* Achievements Modal */}
      {achievementsOpen && (
        <AchievementsModal onClose={() => setAchievementsOpen(false)} />
      )}

      {/* Custom Text Modal */}
      {customModalOpen && (
        <CustomTextModal
          initialText={customText}
          onSave={(txt) => {
            setCustomText(txt);
            setMode('custom');
          }}
          onClose={() => setCustomModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
