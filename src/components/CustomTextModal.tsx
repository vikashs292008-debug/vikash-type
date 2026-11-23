import React, { useState } from 'react';
import { Sliders, X, Check } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface CustomTextModalProps {
  initialText: string;
  onSave: (text: string) => void;
  onClose: () => void;
}

export const CustomTextModal: React.FC<CustomTextModalProps> = ({
  initialText,
  onSave,
  onClose,
}) => {
  const [text, setText] = useState(initialText);

  const handleSave = () => {
    soundEngine.playKeyClick(false);
    if (!text.trim()) {
      alert('Please enter at least one word.');
      return;
    }
    onSave(text.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-pureBlack/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-xl bg-pureBlack border-2 border-subtleGray rounded-3xl p-6 sm:p-8 shadow-2xl text-pureWhite">
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playKeyClick(false);
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-xl bg-charcoal border border-subtleGray text-mutedGray hover:text-pureWhite hover:border-pureWhite transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Sliders className="w-5 h-5 text-pureWhite" />
          <h3 className="font-heading font-black text-2xl uppercase tracking-wider">
            CUSTOM PASSAGE ARENA
          </h3>
        </div>
        <p className="text-xs font-mono text-mutedGray mb-4">
          Paste your custom text, code snippets, speech, or vocabulary practice drills below.
        </p>

        <textarea
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your custom passage here..."
          className="w-full p-4 rounded-xl bg-charcoal border border-subtleGray text-pureWhite font-mono text-sm focus:border-pureWhite focus:outline-none transition-colors mb-4 resize-none"
        />

        <div className="flex items-center justify-between text-xs font-mono text-mutedGray mb-6">
          <span>{text.trim().split(/\s+/).filter(Boolean).length} WORDS</span>
          <span>{text.length} CHARACTERS</span>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-subtleGray font-mono text-xs uppercase hover:bg-charcoal"
          >
            CANCEL
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-pureWhite text-pureBlack font-mono font-bold text-xs uppercase tracking-wider hover:bg-lightGray flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>SAVE & ENGAGE ARENA</span>
          </button>
        </div>
      </div>
    </div>
  );
};
