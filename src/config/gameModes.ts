export type GameModeType = 'time' | 'words' | 'quote' | 'numbers' | 'punctuation' | 'custom' | 'zen';

export interface GameModeConfig {
  id: GameModeType;
  label: string;
  description: string;
  iconName: string;
  options?: number[];
  defaultOption?: number;
}

export const GAME_MODES: GameModeConfig[] = [
  {
    id: 'time',
    label: 'Time',
    description: 'Race against the clock in a high-speed sprint',
    iconName: 'Timer',
    options: [15, 30, 60, 120],
    defaultOption: 30,
  },
  {
    id: 'words',
    label: 'Words',
    description: 'Type a fixed quantity of precision words',
    iconName: 'FileText',
    options: [10, 25, 50, 100],
    defaultOption: 25,
  },
  {
    id: 'quote',
    label: 'Quote',
    description: 'Master iconic literature, wisdom, and code philosophy',
    iconName: 'Quote',
  },
  {
    id: 'numbers',
    label: 'Numbers',
    description: 'Numeric keypad and row precision drills',
    iconName: 'Binary',
    options: [15, 30, 60],
    defaultOption: 30,
  },
  {
    id: 'punctuation',
    label: 'Punctuation',
    description: 'Intense syntax drills with quotes, semicolons, brackets',
    iconName: 'Code2',
    options: [15, 30, 60],
    defaultOption: 30,
  },
  {
    id: 'custom',
    label: 'Custom',
    description: 'Paste your own text, speech, or code excerpt',
    iconName: 'Sliders',
  },
  {
    id: 'zen',
    label: 'Zen',
    description: 'Unconstrained meditation flow with zero time limit',
    iconName: 'Compass',
  },
];
