export interface ThemeOption {
  id: 'dark' | 'light' | 'charcoal';
  name: string;
  description: string;
  bgHex: string;
  textHex: string;
  cardHex: string;
}

export const MONOCHROME_THEMES: ThemeOption[] = [
  {
    id: 'dark',
    name: 'Obsidian Night',
    description: 'Pitch black #000000 background with glowing pure white text and charcoal cards.',
    bgHex: '#000000',
    textHex: '#FFFFFF',
    cardHex: '#111111',
  },
  {
    id: 'light',
    name: 'Paper Studio',
    description: 'Pristine #FFFFFF canvas with stark #000000 brutalist typography and fine borders.',
    bgHex: '#FFFFFF',
    textHex: '#000000',
    cardHex: '#F7F7F7',
  },
  {
    id: 'charcoal',
    name: 'Stealth Carbon',
    description: 'Deep #111111 carbon weave with #242424 panels and stark monochrome contrasts.',
    bgHex: '#111111',
    textHex: '#FFFFFF',
    cardHex: '#1c1c1c',
  },
];
