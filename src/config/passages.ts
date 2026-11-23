export interface QuoteItem {
  id: string;
  text: string;
  author: string;
  source?: string;
  length: 'short' | 'medium' | 'long';
}

export const COMMON_WORDS: string[] = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "i", "it", "for", "not", "on", "with",
  "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her",
  "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up",
  "out", "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time",
  "no", "just", "him", "know", "take", "people", "into", "year", "your", "good", "some", "could",
  "them", "see", "other", "than", "then", "now", "look", "only", "come", "its", "over", "think",
  "also", "back", "after", "use", "two", "how", "our", "work", "first", "well", "way", "even",
  "new", "want", "because", "any", "these", "give", "day", "most", "us", "great", "between", "need",
  "large", "under", "never", "system", "program", "code", "light", "space", "speed", "focus",
  "matrix", "vector", "state", "quantum", "energy", "force", "future", "signal", "memory", "stream",
  "device", "design", "logic", "flow", "pixel", "sound", "arena", "vision", "master", "pulse",
  "engine", "rapid", "smooth", "rhythm", "keystroke", "action", "create", "build", "craft", "sharp",
  "clean", "silent", "power", "drive", "mind", "swift", "hyper", "digital", "dynamic", "strike"
];

export const QUOTES: QuoteItem[] = [
  {
    id: "quote-1",
    text: "Simplicity is prerequisite for reliability. Complex systems invariably contain unseen flaws that emerge under pressure.",
    author: "Edsger W. Dijkstra",
    length: "medium",
  },
  {
    id: "quote-2",
    text: "We become what we behold. We shape our tools and then our tools shape us.",
    author: "Marshall McLuhan",
    length: "short",
  },
  {
    id: "quote-3",
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
    length: "medium",
  },
  {
    id: "quote-4",
    text: "The art of programming is the art of organizing complexity, of mastering multitude and avoiding its bastard chaos.",
    author: "Edsger W. Dijkstra",
    length: "medium",
  },
  {
    id: "quote-5",
    text: "Premature optimization is the root of all evil in programming. Measure first, isolate the true bottlenecks, then execute with poise.",
    author: "Donald Knuth",
    length: "long",
  },
  {
    id: "quote-6",
    text: "Design is not just what it looks like and feels like. Design is how it works.",
    author: "Steve Jobs",
    length: "short",
  },
  {
    id: "quote-7",
    text: "Velocity without direction is merely friction. Precision transforms mechanical repetition into effortless art.",
    author: "Vikash",
    source: "Vikash Type Philosophy",
    length: "short",
  },
  {
    id: "quote-8",
    text: "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.",
    author: "Antoine de Saint-Exupéry",
    length: "medium",
  },
];

export const NUMBER_STRINGS: string[] = [
  "2026 849 1928 471 9082 104 772 3910 5519 281 90 412 890 6152 770 1290 384 551 901 278",
  "1984 2001 2024 2026 3141 5926 2718 2818 1618 3390 4200 9999 1010 0101 404 500 200 304",
  "8821 9912 3014 4710 5923 8810 2309 4410 7820 9011 3190 2841 6720 1198 4721 3099 5102",
];

export const PUNCTUATION_STRINGS: string[] = [
  "const speed = (chars / 5) / timeInMinutes; if (speed > 100) { record.ascend(); }",
  "\"Precision beats speed!\" - whispered the engineer: { accuracy: '100%', latency: '0ms' };",
  "while (true) { focus(); type(); improve(); if (mastery >= 1.0) break; } // keep pushing!",
  "Array.from({ length: 42 }, (_, i) => i * 2).filter((x) => x % 4 === 0);",
  "VikashType.init({ theme: 'monochrome', fps: 120, latency: 0.5, sound: true });",
];

export function getRandomWords(count: number): string {
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * COMMON_WORDS.length);
    words.push(COMMON_WORDS[randomIndex]);
  }
  return words.join(" ");
}

export function getRandomQuote(): QuoteItem {
  const index = Math.floor(Math.random() * QUOTES.length);
  return QUOTES[index];
}

export function getRandomDrill(type: 'numbers' | 'punctuation'): string {
  const pool = type === 'numbers' ? NUMBER_STRINGS : PUNCTUATION_STRINGS;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}
