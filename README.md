# VIKASH TYPE — The Ultimate Typing Speed Arena

> **"TYPE FAST. THINK FASTER."**  
> *One keystroke closer to greatness.*

A visually stunning, mobile-first luxury monochrome typing arena engineered with the polish of Linear, the minimalism of Monkeytype, and the motion quality of modern Awwwards experiences.

Built by **VIKASH**.

---

## ⚡ Live Features

- **Strict Monochrome Neo-Brutalist Design:** Pure `#000000`, `#FFFFFF`, `#111111`, `#242424`, and `#EAEAEA` palette with custom grain texture, dynamic background grid, and high-contrast typography.
- **Multiple Game Modes:**
  - **Timed Modes:** 15s, 30s, 60s, 120s
  - **Words Modes:** 10, 25, 50, 100 words
  - **Quote Mode:** Curated computer science philosophy and literature
  - **Drill Modes:** Numbers drills and Code/Punctuation syntax drills
  - **Custom Mode:** Paste your own code snippets, speeches, or custom vocabulary
  - **Zen Mode:** Unconstrained typing flow with zero time limits
- **Web Audio API Mechanical Sound Engine:** Pure synthesised mechanical switches, tactile spacebar thuds, error clicks, and completion chimes with zero external audio assets.
- **Precision Telemetry:**
  - Net WPM calculation using standard 5-character word metrics: `(correctChars / 5) / (elapsedMinutes)`
  - Raw WPM: `(totalKeystrokes / 5) / (elapsedMinutes)`
  - Real-time character-level feedback, animated caret, backspace corrections, and anti-paste protection
- **Cinematic Results Dashboard:**
  - Animated count-up WPM reveal
  - Interactive WPM velocity chart over time (Recharts)
  - Circular SVG accuracy ring
  - Monochrome particle confetti bursts for new personal records
- **1080 × 1080 High-Res Shareable Card Generator:**
  - Offscreen HTML5 canvas generator exporting 1080x1080 PNG result cards
  - Native Web Share API integration, WhatsApp direct link, and clipboard summary copy
- **Leaderboard & Player Telemetry:**
  - Filterable by Daily Sprint, Weekly Titans, All-Time Elite, and Personal Records
  - Top 3 highlighted with brutalist Roman numeral badges (**I**, **II**, **III**)
  - Persistent analytics in `localStorage` with optional Supabase configuration ready
- **Gamification & Badges:**
  - Achievement badges: *First Test*, *50 WPM Club*, *75 WPM Club*, *100 WPM Club*, *Accuracy Master*, *Consistency King*, *Speed Demon*, *Zen Monk*
- **Centralized Content Configuration:**
  - Easily customize all branding, copy, modes, and thresholds in `src/config/siteContent.ts`, `src/config/gameModes.ts`, and `src/config/passages.ts`.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS + PostCSS
- **Animations:** Framer Motion
- **Icons:** Lucide React + Custom Inline SVGs
- **Data Visualization:** Recharts
- **Audio:** Web Audio API (Synthesizer)
- **Effects:** Canvas Confetti

---

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/vikashs292008-debug/vikash-type.git
cd vikash-type
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 4. Build for production

```bash
npm run build
```

---

## 📁 Architecture

```text
vikash-type/
├── public/                 # Favicon and static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Header.tsx           # Sticky nav, theme toggle, sound toggle
│   │   ├── Hero.tsx             # Cinematic typography, animated keyboard
│   │   ├── ModeSelector.tsx     # Game mode tabs and sub-options
│   │   ├── LiveDashboard.tsx    # Big animated telemetry numbers
│   │   ├── TypingArea.tsx       # Core typing canvas, caret, character feedback
│   │   ├── ResultsModal.tsx     # Cinematic results reveal & charts
│   │   ├── Leaderboard.tsx      # Ranked leaderboards & podium
│   │   ├── StatisticsDashboard.tsx # Historical trendlines & metrics
│   │   ├── AchievementsModal.tsx # Mastery badges
│   │   ├── CustomTextModal.tsx  # Custom passage editor
│   │   └── Footer.tsx           # Minimalist brutalist footer
│   ├── config/             # Centralized configuration
│   │   ├── siteContent.ts       # All site copy & branding
│   │   ├── gameModes.ts         # Mode options & definitions
│   │   ├── passages.ts          # Word dictionary, quotes, drills
│   │   ├── difficulty.ts        # Ranks & speed brackets
│   │   ├── achievements.ts      # Badge criteria & icons
│   │   ├── themes.ts            # Monochrome theme palettes
│   │   └── supabase.ts          # Optional Supabase integration
│   ├── hooks/
│   │   └── useTypingEngine.ts   # Core typing game state machine
│   ├── utils/
│   │   ├── cardGenerator.ts     # 1080x1080 canvas export & sharing
│   │   ├── soundEngine.ts       # Web Audio API mechanical switch synth
│   │   └── storage.ts           # LocalStorage persistence & rankings
│   ├── types/
│   │   └── game.ts              # Core TypeScript models
│   ├── App.tsx             # Root layout & modal controllers
│   ├── main.tsx            # React application entry
│   └── index.css           # Tailwind directives, grain, custom caret
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 📜 License

Created by **VIKASH** (2026). All rights reserved.
