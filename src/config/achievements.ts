export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: 'speed' | 'accuracy' | 'endurance' | 'streak';
  threshold: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_test',
    title: 'First Test',
    description: 'Enter the arena and complete your maiden typing test.',
    iconName: 'Play',
    category: 'endurance',
    threshold: 1,
  },
  {
    id: 'club_50',
    title: '50 WPM Club',
    description: 'Surpass 50 words per minute with at least 90% accuracy.',
    iconName: 'Zap',
    category: 'speed',
    threshold: 50,
  },
  {
    id: 'club_75',
    title: '75 WPM Club',
    description: 'Crack 75 words per minute. Approaching elite typist velocity.',
    iconName: 'Flame',
    category: 'speed',
    threshold: 75,
  },
  {
    id: 'club_100',
    title: '100 WPM Club',
    description: 'Triple-digit mastery: 100+ words per minute in verified testing.',
    iconName: 'Trophy',
    category: 'speed',
    threshold: 100,
  },
  {
    id: 'accuracy_master',
    title: 'Accuracy Master',
    description: 'Finish any test of 25+ words or 30s+ with 100% flawless accuracy.',
    iconName: 'Target',
    category: 'accuracy',
    threshold: 100,
  },
  {
    id: 'consistency_king',
    title: 'Consistency King',
    description: 'Complete 10 total typing tests with an average accuracy above 95%.',
    iconName: 'ShieldCheck',
    category: 'consistency' as any,
    threshold: 10,
  },
  {
    id: 'speed_demon',
    title: 'Speed Demon',
    description: 'Reach a blistering 120+ WPM velocity in the arena.',
    iconName: 'Gauge',
    category: 'speed',
    threshold: 120,
  },
  {
    id: 'zen_master',
    title: 'Zen Monk',
    description: 'Complete a calm session in Zen mode with over 150 characters typed.',
    iconName: 'Sparkles',
    category: 'endurance',
    threshold: 150,
  },
];
