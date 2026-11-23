export interface PerformanceRank {
  name: string;
  minWpm: number;
  maxWpm: number;
  badge: string;
  description: string;
  colorClass: string;
}

export const PERFORMANCE_RANKS: PerformanceRank[] = [
  {
    name: 'Typing Legend',
    minWpm: 120,
    maxWpm: Infinity,
    badge: 'LEGEND',
    description: 'Transcendent velocity and machine-like precision. You are in the top 0.1% worldwide.',
    colorClass: 'border-pureWhite text-pureWhite',
  },
  {
    name: 'Lightning Fast',
    minWpm: 90,
    maxWpm: 119.99,
    badge: 'LIGHTNING',
    description: 'Blistering keyboard speed capable of outpacing thought. Masterclass performance.',
    colorClass: 'border-lightGray text-softWhite',
  },
  {
    name: 'Speedster',
    minWpm: 65,
    maxWpm: 89.99,
    badge: 'SPEEDSTER',
    description: 'Significantly faster than professional software engineers and writers. Superb rhythm.',
    colorClass: 'border-mutedGray text-softWhite',
  },
  {
    name: 'Rising Star',
    minWpm: 40,
    maxWpm: 64.99,
    badge: 'RISING STAR',
    description: 'Solid typing baseline with room to unlock explosive mechanical velocity.',
    colorClass: 'border-subtleGray text-lightGray',
  },
  {
    name: 'Beginner',
    minWpm: 0,
    maxWpm: 39.99,
    badge: 'NOVICE',
    description: 'Laying the foundation. Maintain accuracy first; speed naturally follows rhythm.',
    colorClass: 'border-darkGray text-mutedGray',
  },
];

export function getPerformanceRank(wpm: number): PerformanceRank {
  const rank = PERFORMANCE_RANKS.find((r) => wpm >= r.minWpm && wpm <= r.maxWpm);
  return rank || PERFORMANCE_RANKS[PERFORMANCE_RANKS.length - 1];
}
