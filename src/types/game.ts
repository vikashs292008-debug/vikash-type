import { GameModeType } from '../config/gameModes';
import { PerformanceRank } from '../config/difficulty';

export interface KeystrokeLog {
  timestamp: number; // millisecond offset from test start
  char: string;
  isCorrect: boolean;
  currentWpm: number;
}

export interface WpmPoint {
  time: number; // seconds
  wpm: number;
  rawWpm: number;
  errors: number;
}

export interface GameResult {
  id: string;
  wpm: number;
  rawWpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalKeystrokes: number;
  timeElapsed: number; // in seconds
  mode: GameModeType;
  modeOption?: number;
  rank: PerformanceRank;
  date: string;
  timestamp: number;
  wpmTimeline: WpmPoint[];
  isPersonalBest: boolean;
}

export interface PlayerStats {
  totalTests: number;
  bestWpm: number;
  averageWpm: number;
  averageAccuracy: number;
  totalTimeSeconds: number;
  recentResults: GameResult[];
  unlockedAchievements: string[];
  streakDays: number;
  lastTestDate?: string;
}

export interface LeaderboardEntry {
  id: string;
  rank?: number;
  playerName: string;
  wpm: number;
  accuracy: number;
  mode: string;
  date: string;
  timestamp: number;
  isCurrentUser?: boolean;
}
