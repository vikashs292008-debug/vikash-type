import { useState, useEffect, useRef, useCallback } from 'react';
import { GameModeType } from '../config/gameModes';
import { getRandomWords, getRandomQuote, getRandomDrill } from '../config/passages';
import { getPerformanceRank } from '../config/difficulty';
import { GameResult, WpmPoint } from '../types/game';
import { soundEngine } from '../utils/soundEngine';
import { saveGameResult, getPlayerStats } from '../utils/storage';
import confetti from 'canvas-confetti';

export type GameStatus = 'idle' | 'running' | 'paused' | 'finished';

export interface UseTypingEngineProps {
  initialMode?: GameModeType;
  initialOption?: number;
}

export function useTypingEngine({
  initialMode = 'time',
  initialOption = 30,
}: UseTypingEngineProps = {}) {
  const [mode, setMode] = useState<GameModeType>(initialMode);
  const [modeOption, setModeOption] = useState<number>(initialOption);
  const [customText, setCustomText] = useState<string>('');
  
  const [targetText, setTargetText] = useState<string>('');
  const [authorInfo, setAuthorInfo] = useState<string | undefined>(undefined);
  const [userInput, setUserInput] = useState<string>('');
  const [status, setStatus] = useState<GameStatus>('idle');
  
  const [timeLeft, setTimeLeft] = useState<number>(initialOption);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  
  const [liveWpm, setLiveWpm] = useState<number>(0);
  const [liveRawWpm, setLiveRawWpm] = useState<number>(0);
  const [liveAccuracy, setLiveAccuracy] = useState<number>(100);
  
  const [totalKeystrokes, setTotalKeystrokes] = useState<number>(0);
  const [correctKeystrokes, setCorrectKeystrokes] = useState<number>(0);
  const [incorrectKeystrokes, setIncorrectKeystrokes] = useState<number>(0);
  
  const [result, setResult] = useState<GameResult | null>(null);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  
  // High precision timestamp refs
  const startTimeRef = useRef<number | null>(null);
  const pausedAtRef = useRef<number | null>(null);
  const totalPausedTimeRef = useRef<number>(0);
  const timerIntervalRef = useRef<any>(null);
  const wpmTimelineRef = useRef<WpmPoint[]>([]);
  const hasFinishedRef = useRef<boolean>(false);

  // Generate text based on current mode
  const generateText = useCallback(
    (targetMode: GameModeType, option: number, customInput?: string) => {
      let text = '';
      let author: string | undefined = undefined;

      switch (targetMode) {
        case 'time':
          // Generate plenty of words so the user never runs out within the duration
          text = getRandomWords(option > 60 ? 160 : 90);
          break;
        case 'words':
          text = getRandomWords(option);
          break;
        case 'quote': {
          const q = getRandomQuote();
          text = q.text;
          author = q.author + (q.source ? ` (${q.source})` : '');
          break;
        }
        case 'numbers':
          text = getRandomDrill('numbers');
          break;
        case 'punctuation':
          text = getRandomDrill('punctuation');
          break;
        case 'custom':
          text = customInput?.trim() || 'Custom text placeholder. Configure your own words or excerpt in the menu.';
          break;
        case 'zen':
          text = getRandomWords(200);
          break;
        default:
          text = getRandomWords(30);
      }

      setTargetText(text);
      setAuthorInfo(author);
      setUserInput('');
      setStatus('idle');
      setTimeElapsed(0);
      setLiveWpm(0);
      setLiveRawWpm(0);
      setLiveAccuracy(100);
      setTotalKeystrokes(0);
      setCorrectKeystrokes(0);
      setIncorrectKeystrokes(0);
      setResult(null);
      setUnlockedAchievements([]);
      wpmTimelineRef.current = [];
      startTimeRef.current = null;
      pausedAtRef.current = null;
      totalPausedTimeRef.current = 0;
      hasFinishedRef.current = false;

      if (targetMode === 'time' || targetMode === 'numbers' || targetMode === 'punctuation') {
        setTimeLeft(option);
      } else {
        setTimeLeft(0);
      }
    },
    []
  );

  // Reset/Restart test
  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    generateText(mode, modeOption, customText);
  }, [mode, modeOption, customText, generateText]);

  // Trigger test finish
  const finishGame = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setStatus('finished');

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    soundEngine.playComplete();

    const elapsed = Math.max(1, timeElapsed);
    const elapsedMinutes = elapsed / 60;
    
    // Standard 5-character word calculation
    const netWpm = Math.max(0, Math.round((correctKeystrokes / 5) / elapsedMinutes));
    const rawWpm = Math.max(0, Math.round((totalKeystrokes / 5) / elapsedMinutes));
    const accuracy = totalKeystrokes > 0 ? Number(((correctKeystrokes / totalKeystrokes) * 100).toFixed(1)) : 100;
    const rank = getPerformanceRank(netWpm);

    const playerStats = getPlayerStats();
    const isNewPersonalBest = netWpm > playerStats.bestWpm;

    const finalResult: GameResult = {
      id: 'res-' + Date.now(),
      wpm: netWpm,
      rawWpm,
      accuracy,
      correctChars: correctKeystrokes,
      incorrectChars: incorrectKeystrokes,
      totalKeystrokes,
      timeElapsed: elapsed,
      mode,
      modeOption,
      rank,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      timestamp: Date.now(),
      wpmTimeline: wpmTimelineRef.current.length > 0 ? [...wpmTimelineRef.current] : [{ time: elapsed, wpm: netWpm, rawWpm, errors: incorrectKeystrokes }],
      isPersonalBest: isNewPersonalBest,
    };

    const { newAchievements } = saveGameResult(finalResult);
    setResult(finalResult);
    setUnlockedAchievements(newAchievements);

    // Particle confetti burst on personal best (pure monochrome white/silver)
    if (isNewPersonalBest) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ffffff', '#eaeaea', '#aaaaaa', '#333333'],
        });
      } catch {
        // Safe fallback
      }
    }
  }, [correctKeystrokes, incorrectKeystrokes, totalKeystrokes, timeElapsed, mode, modeOption]);

  // Main timer tick
  useEffect(() => {
    if (status === 'running') {
      timerIntervalRef.current = setInterval(() => {
        if (!startTimeRef.current) return;

        const now = performance.now();
        const activeTimeMs = now - startTimeRef.current - totalPausedTimeRef.current;
        const currentSeconds = Math.max(1, Math.floor(activeTimeMs / 1000));
        setTimeElapsed(currentSeconds);

        const currentMinutes = activeTimeMs / 60000;
        if (currentMinutes > 0) {
          const curWpm = Math.max(0, Math.round((correctKeystrokes / 5) / currentMinutes));
          const curRawWpm = Math.max(0, Math.round((totalKeystrokes / 5) / currentMinutes));
          setLiveWpm(curWpm);
          setLiveRawWpm(curRawWpm);

          // Sample timeline every full second
          if (wpmTimelineRef.current.length < currentSeconds) {
            wpmTimelineRef.current.push({
              time: currentSeconds,
              wpm: curWpm,
              rawWpm: curRawWpm,
              errors: incorrectKeystrokes,
            });
          }
        }

        // Check countdown for timed modes
        if (mode === 'time' || mode === 'numbers' || mode === 'punctuation') {
          const remaining = modeOption - currentSeconds;
          setTimeLeft(Math.max(0, remaining));
          if (remaining <= 0) {
            finishGame();
          }
        }
      }, 250);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [status, mode, modeOption, correctKeystrokes, incorrectKeystrokes, totalKeystrokes, finishGame]);

  // Pause / Resume on window blur / focus
  useEffect(() => {
    const handleBlur = () => {
      if (status === 'running') {
        pausedAtRef.current = performance.now();
        setStatus('paused');
      }
    };

    const handleFocus = () => {
      if (status === 'paused' && pausedAtRef.current) {
        totalPausedTimeRef.current += performance.now() - pausedAtRef.current;
        pausedAtRef.current = null;
        setStatus('running');
      }
    };

    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [status]);

  // Handle character input
  const handleInput = useCallback(
    (newVal: string) => {
      if (status === 'finished') return;

      // Start on first character
      if (status === 'idle') {
        setStatus('running');
        startTimeRef.current = performance.now();
        totalPausedTimeRef.current = 0;
      }

      // Check if user is typing forward vs backspacing
      const prevLength = userInput.length;
      const newLength = newVal.length;

      if (newLength > prevLength) {
        // Key typed
        const addedChar = newVal[newLength - 1];
        const targetChar = targetText[newLength - 1];
        const isMatch = addedChar === targetChar;

        setTotalKeystrokes((k) => k + 1);
        if (isMatch) {
          setCorrectKeystrokes((c) => c + 1);
          soundEngine.playKeyClick(addedChar === ' ');
        } else {
          setIncorrectKeystrokes((e) => e + 1);
          soundEngine.playError();
        }

        const newTotal = totalKeystrokes + 1;
        const newCorrect = correctKeystrokes + (isMatch ? 1 : 0);
        setLiveAccuracy(Number(((newCorrect / newTotal) * 100).toFixed(1)));
      } else {
        // Backspace
        soundEngine.playKeyClick(false);
      }

      setUserInput(newVal);

      // Check words / quote completion
      if (newVal.length >= targetText.length) {
        finishGame();
      }
    },
    [status, userInput, targetText, totalKeystrokes, correctKeystrokes, finishGame]
  );

  // Initialize on mount or mode switch
  useEffect(() => {
    generateText(mode, modeOption, customText);
  }, [mode, modeOption, generateText]);

  return {
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
    setStatus,
    timeLeft,
    timeElapsed,
    liveWpm,
    liveRawWpm,
    liveAccuracy,
    totalKeystrokes,
    correctKeystrokes,
    incorrectKeystrokes,
    result,
    unlockedAchievements,
    handleInput,
    resetGame,
    finishGame,
  };
}
