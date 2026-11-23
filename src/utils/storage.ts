import { GameResult, PlayerStats, LeaderboardEntry } from '../types/game';
import { ACHIEVEMENTS } from '../config/achievements';

const STATS_KEY = 'vikash_type_player_stats_v2';
const LEADERBOARD_KEY = 'vikash_type_leaderboard_v2';

const INITIAL_STATS: PlayerStats = {
  totalTests: 0,
  bestWpm: 0,
  averageWpm: 0,
  averageAccuracy: 0,
  totalTimeSeconds: 0,
  recentResults: [],
  unlockedAchievements: [],
  streakDays: 0,
};

const SEED_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'seed-1',
    playerName: 'HyperStriker',
    wpm: 154,
    accuracy: 99.2,
    mode: 'Time (60s)',
    date: 'Today',
    timestamp: Date.now() - 3600000 * 2,
  },
  {
    id: 'seed-2',
    playerName: 'GhostKeys',
    wpm: 142,
    accuracy: 98.7,
    mode: 'Words (50)',
    date: 'Today',
    timestamp: Date.now() - 3600000 * 5,
  },
  {
    id: 'seed-3',
    playerName: 'NovaPulse',
    wpm: 136,
    accuracy: 100,
    mode: 'Time (30s)',
    date: 'Yesterday',
    timestamp: Date.now() - 86400000,
  },
  {
    id: 'seed-4',
    playerName: 'Zenith',
    wpm: 128,
    accuracy: 97.9,
    mode: 'Quote',
    date: 'Yesterday',
    timestamp: Date.now() - 86400000 * 1.5,
  },
  {
    id: 'seed-5',
    playerName: 'AeroType',
    wpm: 121,
    accuracy: 99.0,
    mode: 'Time (15s)',
    date: '3d ago',
    timestamp: Date.now() - 86400000 * 3,
  },
  {
    id: 'seed-6',
    playerName: 'CircuitMind',
    wpm: 114,
    accuracy: 96.5,
    mode: 'Words (25)',
    date: '4d ago',
    timestamp: Date.now() - 86400000 * 4,
  },
  {
    id: 'seed-7',
    playerName: 'Vortex7',
    wpm: 108,
    accuracy: 98.4,
    mode: 'Time (30s)',
    date: '5d ago',
    timestamp: Date.now() - 86400000 * 5,
  },
  {
    id: 'seed-8',
    playerName: 'CyberFingers',
    wpm: 102,
    accuracy: 97.1,
    mode: 'Numbers',
    date: '6d ago',
    timestamp: Date.now() - 86400000 * 6,
  },
];

export function getPlayerStats(): PlayerStats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return { ...INITIAL_STATS };
    return { ...INITIAL_STATS, ...JSON.parse(raw) };
  } catch {
    return { ...INITIAL_STATS };
  }
}

export function saveGameResult(result: GameResult): { stats: PlayerStats; newAchievements: string[] } {
  const current = getPlayerStats();
  const isPersonalBest = result.wpm > current.bestWpm;
  result.isPersonalBest = isPersonalBest;

  const newTotalTests = current.totalTests + 1;
  const newBestWpm = Math.max(current.bestWpm, result.wpm);
  const newTotalTime = current.totalTimeSeconds + result.timeElapsed;

  // Running averages
  const newAvgWpm = Math.round(((current.averageWpm * current.totalTests) + result.wpm) / newTotalTests);
  const newAvgAcc = Number((((current.averageAccuracy * current.totalTests) + result.accuracy) / newTotalTests).toFixed(1));

  // Check achievements
  const newlyUnlocked: string[] = [];
  const existingSet = new Set(current.unlockedAchievements);

  ACHIEVEMENTS.forEach((ach) => {
    if (existingSet.has(ach.id)) return;
    let unlocked = false;
    if (ach.id === 'first_test' && newTotalTests >= 1) unlocked = true;
    if (ach.id === 'club_50' && result.wpm >= 50 && result.accuracy >= 90) unlocked = true;
    if (ach.id === 'club_75' && result.wpm >= 75 && result.accuracy >= 92) unlocked = true;
    if (ach.id === 'club_100' && result.wpm >= 100 && result.accuracy >= 94) unlocked = true;
    if (ach.id === 'accuracy_master' && result.accuracy === 100 && (result.correctChars >= 25 || result.timeElapsed >= 15)) unlocked = true;
    if (ach.id === 'consistency_king' && newTotalTests >= 10 && newAvgAcc >= 95) unlocked = true;
    if (ach.id === 'speed_demon' && result.wpm >= 120) unlocked = true;
    if (ach.id === 'zen_master' && result.mode === 'zen' && result.correctChars >= 150) unlocked = true;

    if (unlocked) {
      newlyUnlocked.push(ach.id);
      existingSet.add(ach.id);
    }
  });

  const updatedStats: PlayerStats = {
    totalTests: newTotalTests,
    bestWpm: newBestWpm,
    averageWpm: newAvgWpm,
    averageAccuracy: newAvgAcc,
    totalTimeSeconds: newTotalTime,
    recentResults: [result, ...current.recentResults].slice(0, 50),
    unlockedAchievements: Array.from(existingSet),
    streakDays: Math.max(1, current.streakDays),
    lastTestDate: new Date().toISOString(),
  };

  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(updatedStats));
    addLeaderboardEntry({
      id: result.id,
      playerName: 'You (Local Typist)',
      wpm: result.wpm,
      accuracy: result.accuracy,
      mode: `${result.mode}${result.modeOption ? ` (${result.modeOption})` : ''}`,
      date: 'Just now',
      timestamp: Date.now(),
      isCurrentUser: true,
    });
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }

  return { stats: updatedStats, newAchievements: newlyUnlocked };
}

export function resetPlayerStats(): void {
  try {
    localStorage.removeItem(STATS_KEY);
  } catch (e) {
    console.error(e);
  }
}

export function getLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    let list: LeaderboardEntry[] = raw ? JSON.parse(raw) : [...SEED_LEADERBOARD];
    list.sort((a, b) => b.wpm - a.wpm || b.accuracy - a.accuracy);
    return list.map((item, idx) => ({ ...item, rank: idx + 1 }));
  } catch {
    return SEED_LEADERBOARD.map((item, idx) => ({ ...item, rank: idx + 1 }));
  }
}

export function addLeaderboardEntry(entry: LeaderboardEntry): void {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    let list: LeaderboardEntry[] = raw ? JSON.parse(raw) : [...SEED_LEADERBOARD];
    list.push(entry);
    list.sort((a, b) => b.wpm - a.wpm || b.accuracy - a.accuracy);
    // Keep top 100
    list = list.slice(0, 100);
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save leaderboard', e);
  }
}
