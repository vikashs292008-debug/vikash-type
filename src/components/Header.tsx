import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Moon, Sun, Menu, X, Terminal, Trophy, BarChart3, Award, Play } from 'lucide-react';
import { siteContent } from '../config/siteContent';
import { soundEngine } from '../utils/soundEngine';

interface HeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenAchievements: () => void;
  onScrollTo: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
  onOpenAchievements,
  onScrollTo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    soundEngine.playKeyClick(false);
    onScrollTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-pureBlack/85 dark:bg-pureBlack/90 backdrop-blur-md border-b border-subtleGray/40 py-3'
          : 'bg-transparent py-4 sm:py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Animated Logo + Brand */}
        <button
          onClick={() => handleNavClick('hero')}
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-lg bg-pureWhite text-pureBlack flex items-center justify-center font-heading font-black text-xl tracking-tighter shadow-sm transition-transform group-hover:scale-105 active:scale-95">
            {siteContent.branding.logoLetter}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-extrabold tracking-wider text-base sm:text-lg text-pureWhite uppercase">
                {siteContent.branding.brandName}
              </span>
              <span className="w-2 h-4 bg-pureWhite inline-block caret-blink" />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-mutedGray uppercase hidden sm:block">
              {siteContent.branding.version}
            </span>
          </div>
        </button>

        {/* Center/Right Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {siteContent.navigation.links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider text-mutedGray hover:text-pureWhite hover:bg-white/5 rounded-md transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Action Icons & Badges */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Badges / Achievements Button */}
          <button
            onClick={() => {
              soundEngine.playKeyClick(false);
              onOpenAchievements();
            }}
            title="View Achievements"
            className="p-2 sm:px-3 sm:py-1.5 rounded-lg border border-subtleGray hover:border-pureWhite/60 bg-charcoal text-mutedGray hover:text-pureWhite transition-all flex items-center gap-1.5 text-xs font-mono"
          >
            <Award className="w-4 h-4 text-pureWhite" />
            <span className="hidden sm:inline">BADGES</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
            }}
            title={soundEnabled ? 'Mute Mechanical Switch SFX' : 'Enable Mechanical Switch SFX'}
            className="p-2 rounded-lg border border-subtleGray hover:border-pureWhite/60 bg-charcoal text-mutedGray hover:text-pureWhite transition-all"
            aria-label={siteContent.navigation.soundToggleAria}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-pureWhite" />
            ) : (
              <VolumeX className="w-4 h-4 text-mutedGray" />
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => {
              soundEngine.playKeyClick(false);
              onToggleTheme();
            }}
            title="Toggle Theme"
            className="p-2 rounded-lg border border-subtleGray hover:border-pureWhite/60 bg-charcoal text-mutedGray hover:text-pureWhite transition-all"
            aria-label={siteContent.navigation.themeToggleAria}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-pureWhite" />
            ) : (
              <Moon className="w-4 h-4 text-pureBlack" />
            )}
          </button>

          {/* Quick Play CTA */}
          <button
            onClick={() => handleNavClick('arena')}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-pureWhite text-pureBlack font-mono font-bold text-xs uppercase tracking-wider hover:bg-lightGray active:scale-95 transition-all shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>PLAY</span>
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => {
              soundEngine.playKeyClick(false);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-lg border border-subtleGray md:hidden bg-charcoal text-pureWhite"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-pureBlack border-b border-subtleGray px-6 py-6 space-y-3 animate-fadeIn">
          {siteContent.navigation.links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="block w-full text-left py-2.5 font-mono text-sm tracking-wider uppercase text-mutedGray hover:text-pureWhite border-b border-subtleGray/30"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenAchievements();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded border border-subtleGray text-center font-mono text-xs text-pureWhite flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>VIEW ACHIEVEMENTS</span>
            </button>
            <button
              onClick={() => handleNavClick('arena')}
              className="w-full py-2.5 px-4 rounded bg-pureWhite text-pureBlack font-mono text-xs font-bold text-center tracking-wider"
            >
              START TYPING NOW
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
