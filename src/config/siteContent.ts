export interface SiteContent {
  branding: {
    logoLetter: string;
    brandName: string;
    fullName: string;
    tagline: string;
    subTagline: string;
    creator: string;
    creatorRole: string;
    builtByText: string;
    copyrightYear: string;
    version: string;
  };
  navigation: {
    links: Array<{ id: string; label: string; href: string }>;
    quickPlayLabel: string;
    soundToggleAria: string;
    themeToggleAria: string;
  };
  hero: {
    badge: string;
    headlineLine1: string;
    headlineLine2: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    floatingStats: Array<{ label: string; value: string; suffix: string }>;
  };
  typingArena: {
    focusNotice: string;
    clickToFocus: string;
    pauseOverlayTitle: string;
    pauseOverlaySubtitle: string;
    restartHint: string;
    capsLockWarning: string;
    zenNotice: string;
  };
  dashboard: {
    wpmLabel: string;
    accuracyLabel: string;
    timeRemainingLabel: string;
    wordsRemainingLabel: string;
    rawWpmLabel: string;
    charactersLabel: string;
  };
  results: {
    title: string;
    subtitle: string;
    newPersonalBestBadge: string;
    stats: {
      wpm: string;
      rawWpm: string;
      accuracy: string;
      correctChars: string;
      incorrectChars: string;
      totalKeystrokes: string;
      timeElapsed: string;
      consistency: string;
    };
    chartTitle: string;
    playAgainCta: string;
    shareResultCta: string;
    downloadCardCta: string;
    whatsappCta: string;
    copySummaryCta: string;
    copiedNotice: string;
  };
  leaderboard: {
    title: string;
    subtitle: string;
    badge: string;
    tabs: {
      daily: string;
      weekly: string;
      allTime: string;
      personal: string;
    };
    emptyState: string;
    demoNotice: string;
    columns: {
      rank: string;
      player: string;
      wpm: string;
      accuracy: string;
      mode: string;
      date: string;
    };
  };
  statistics: {
    title: string;
    subtitle: string;
    badge: string;
    cards: {
      avgWpm: string;
      bestWpm: string;
      avgAccuracy: string;
      testsCompleted: string;
      totalTime: string;
      improvement: string;
    };
    emptyStateTitle: string;
    emptyStateDesc: string;
    recentHistoryTitle: string;
    clearDataButton: string;
  };
  achievements: {
    title: string;
    subtitle: string;
    unlockedBadge: string;
    lockedBadge: string;
    progressLabel: string;
  };
  footer: {
    builtBy: string;
    tagline: string;
    githubLabel: string;
    githubUrl: string;
    twitterLabel: string;
    twitterUrl: string;
    linkedinLabel: string;
    linkedinUrl: string;
    backToTop: string;
  };
}

export const siteContent: SiteContent = {
  branding: {
    logoLetter: "V.",
    brandName: "VIKASH TYPE",
    fullName: "VIKASH TYPE — The Ultimate Typing Speed Arena",
    tagline: "One keystroke closer to greatness.",
    subTagline: "The luxury monochrome typing arena engineered for speed demons.",
    creator: "VIKASH",
    creatorRole: "Full Stack Engineer & Experience Designer",
    builtByText: "BUILT BY VIKASH.",
    copyrightYear: "2026",
    version: "v2.5.0-PRO",
  },
  navigation: {
    links: [
      { id: "hero", label: "Home", href: "#hero" },
      { id: "arena", label: "Play", href: "#arena" },
      { id: "leaderboard", label: "Leaderboard", href: "#leaderboard" },
      { id: "statistics", label: "Statistics", href: "#statistics" },
      { id: "achievements", label: "Badges", href: "#achievements" },
    ],
    quickPlayLabel: "START ARENA",
    soundToggleAria: "Toggle Sound FX",
    themeToggleAria: "Toggle Monochrome Theme",
  },
  hero: {
    badge: "GLOBAL TYPING ARENA 2026",
    headlineLine1: "TYPE FAST.",
    headlineLine2: "THINK FASTER.",
    subtitle:
      "Every keystroke counts. Test your speed, sharpen your accuracy, and climb the leaderboard in an uncompromising luxury monochrome environment.",
    primaryCta: "START TYPING",
    secondaryCta: "VIEW LEADERBOARD",
    floatingStats: [
      { label: "PEAK VELOCITY", value: "184", suffix: "WPM" },
      { label: "ACCURACY RATE", value: "99.4", suffix: "%" },
      { label: "KEYSTROKES LOGGED", value: "1.2M", suffix: "+" },
    ],
  },
  typingArena: {
    focusNotice: "Click anywhere inside the arena or press any key to focus",
    clickToFocus: "CLICK TO ENGAGE ARENA",
    pauseOverlayTitle: "SESSION PAUSED",
    pauseOverlaySubtitle: "Arena focus lost. Click or press any key to resume typing.",
    restartHint: "Quick restart: press Tab or click Restart",
    capsLockWarning: "CAPS LOCK IS ACTIVE",
    zenNotice: "Zen mode active. Type freely without timer or pressure. Press ESC or Finish to review.",
  },
  dashboard: {
    wpmLabel: "WPM",
    accuracyLabel: "ACCURACY",
    timeRemainingLabel: "TIME LEFT",
    wordsRemainingLabel: "WORDS LEFT",
    rawWpmLabel: "RAW WPM",
    charactersLabel: "CHARS",
  },
  results: {
    title: "TEST COMPLETE",
    subtitle: "Precision telemetry & keystroke breakdown",
    newPersonalBestBadge: "NEW PERSONAL BEST!",
    stats: {
      wpm: "NET WPM",
      rawWpm: "RAW WPM",
      accuracy: "ACCURACY",
      correctChars: "CORRECT",
      incorrectChars: "INCORRECT",
      totalKeystrokes: "TOTAL KEYS",
      timeElapsed: "TIME",
      consistency: "CONSISTENCY",
    },
    chartTitle: "WPM VELOCITY OVER TIME",
    playAgainCta: "PLAY AGAIN",
    shareResultCta: "SHARE RESULT",
    downloadCardCta: "DOWNLOAD 1080p CARD",
    whatsappCta: "WHATSAPP",
    copySummaryCta: "COPY SUMMARY",
    copiedNotice: "Score summary copied to clipboard!",
  },
  leaderboard: {
    title: "GLOBAL LEADERBOARD",
    subtitle: "Real-time hall of fame of the world's most relentless typists.",
    badge: "PRECISION VERIFIED",
    tabs: {
      daily: "Daily Sprint",
      weekly: "Weekly Titans",
      allTime: "All-Time Elite",
      personal: "My Records",
    },
    emptyState: "No runs logged yet. Be the first to claim rank #1!",
    demoNotice: "Local persistence active. Top verified runs dynamically ranked.",
    columns: {
      rank: "RANK",
      player: "TYPIST",
      wpm: "WPM",
      accuracy: "ACC",
      mode: "MODE",
      date: "DATE",
    },
  },
  statistics: {
    title: "PLAYER TELEMETRY",
    subtitle: "Deep performance analytics, trendlines, and milestone tracking.",
    badge: "LOCAL PROFILE",
    cards: {
      avgWpm: "AVERAGE WPM",
      bestWpm: "PEAK RECORD",
      avgAccuracy: "AVERAGE ACCURACY",
      testsCompleted: "TOTAL RUNS",
      totalTime: "TOTAL TYPING TIME",
      improvement: "ACCELERATION",
    },
    emptyStateTitle: "NO TELEMETRY RECORDED",
    emptyStateDesc: "Complete your first typing session in the arena above to unlock real-time telemetry, progression trends, and historical analysis.",
    recentHistoryTitle: "RECENT ARENA RUNS",
    clearDataButton: "RESET LOCAL STATS",
  },
  achievements: {
    title: "ARENA ACHIEVEMENTS",
    subtitle: "Unlock prestigious mastery badges as your typing speed and precision ascend.",
    unlockedBadge: "UNLOCKED",
    lockedBadge: "LOCKED",
    progressLabel: "MASTERY PROGRESS",
  },
  footer: {
    builtBy: "BUILT BY VIKASH.",
    tagline: "One keystroke closer to greatness.",
    githubLabel: "GitHub",
    githubUrl: "https://github.com",
    twitterLabel: "X (Twitter)",
    twitterUrl: "https://x.com",
    linkedinLabel: "LinkedIn",
    linkedinUrl: "https://linkedin.com",
    backToTop: "BACK TO APEX",
  },
};
