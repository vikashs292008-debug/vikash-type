import React from 'react';
import { Timer, FileText, Quote, Binary, Code2, Sliders, Compass } from 'lucide-react';
import { GAME_MODES, GameModeType } from '../config/gameModes';
import { soundEngine } from '../utils/soundEngine';

interface ModeSelectorProps {
  currentMode: GameModeType;
  currentOption: number;
  onSelectMode: (mode: GameModeType, defaultOption?: number) => void;
  onSelectOption: (option: number) => void;
  onOpenCustomModal: () => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  currentMode,
  currentOption,
  onSelectMode,
  onSelectOption,
  onOpenCustomModal,
}) => {
  const activeModeConfig = GAME_MODES.find((m) => m.id === currentMode);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Timer':
        return <Timer className="w-4 h-4" />;
      case 'FileText':
        return <FileText className="w-4 h-4" />;
      case 'Quote':
        return <Quote className="w-4 h-4" />;
      case 'Binary':
        return <Binary className="w-4 h-4" />;
      case 'Code2':
        return <Code2 className="w-4 h-4" />;
      case 'Sliders':
        return <Sliders className="w-4 h-4" />;
      case 'Compass':
        return <Compass className="w-4 h-4" />;
      default:
        return <Timer className="w-4 h-4" />;
    }
  };

  const handleModeChange = (mode: GameModeType) => {
    soundEngine.playKeyClick(false);
    if (mode === 'custom') {
      onOpenCustomModal();
    }
    const conf = GAME_MODES.find((m) => m.id === mode);
    onSelectMode(mode, conf?.defaultOption);
  };

  const handleOptionChange = (opt: number) => {
    soundEngine.playKeyClick(false);
    onSelectOption(opt);
  };

  return (
    <div className="flex flex-col items-center gap-3 mb-6 sm:mb-8 w-full max-w-4xl mx-auto px-2">
      {/* Primary Mode Tabs Bar */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-charcoal border border-subtleGray shadow-lg">
        {GAME_MODES.map((mode) => {
          const isActive = currentMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => handleModeChange(mode.id)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all duration-200 ${
                isActive
                  ? 'bg-pureWhite text-pureBlack shadow-sm'
                  : 'text-mutedGray hover:text-pureWhite hover:bg-darkGray/60'
              }`}
            >
              {getIcon(mode.iconName)}
              <span>{mode.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sub-options for Time / Words / Numbers */}
      {activeModeConfig?.options && activeModeConfig.options.length > 0 && (
        <div className="flex items-center gap-2 p-1 rounded-xl bg-charcoal/70 border border-subtleGray/60">
          <span className="text-[10px] font-mono text-mutedGray uppercase px-2">
            {currentMode === 'time' ? 'SECONDS' : 'WORDS'}:
          </span>
          {activeModeConfig.options.map((opt) => {
            const isOptActive = currentOption === opt;
            return (
              <button
                key={opt}
                onClick={() => handleOptionChange(opt)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  isOptActive
                    ? 'bg-pureWhite text-pureBlack'
                    : 'text-mutedGray hover:text-pureWhite hover:bg-darkGray'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
