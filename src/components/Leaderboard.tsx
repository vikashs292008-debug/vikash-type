import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, Flame, Filter, User } from 'lucide-react';
import { LeaderboardEntry } from '../types/game';
import { getLeaderboard } from '../utils/storage';
import { siteContent } from '../config/siteContent';
import { soundEngine } from '../utils/soundEngine';

export const Leaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'allTime' | 'personal'>('allTime');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const list = getLeaderboard();
    setEntries(list);
  }, []);

  const handleTabChange = (tab: 'daily' | 'weekly' | 'allTime' | 'personal') => {
    soundEngine.playKeyClick(false);
    setActiveTab(tab);
  };

  // Filter entries based on tab
  const filteredEntries = entries.filter((item) => {
    if (activeTab === 'personal') return item.isCurrentUser;
    if (activeTab === 'daily') return item.date.toLowerCase().includes('today') || item.date.toLowerCase().includes('now');
    if (activeTab === 'weekly') return !item.date.toLowerCase().includes('6d');
    return true; // allTime
  });

  const top3 = filteredEntries.slice(0, 3);
  const remaining = filteredEntries.slice(3);

  return (
    <section id="leaderboard" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-subtleGray">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-subtleGray bg-charcoal text-xs font-mono text-mutedGray uppercase tracking-wider mb-2">
            <Trophy className="w-3.5 h-3.5 text-pureWhite" />
            <span>{siteContent.leaderboard.badge}</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-pureWhite">
            {siteContent.leaderboard.title}
          </h2>
          <p className="text-sm text-mutedGray max-w-lg mt-1 font-mono">
            {siteContent.leaderboard.subtitle}
          </p>
        </div>

        {/* Demo / Local Persistence notice */}
        <div className="p-2.5 rounded-xl bg-charcoal border border-subtleGray text-right sm:text-right">
          <div className="text-[10px] font-mono tracking-widest text-mutedGray uppercase">ENVIRONMENT</div>
          <div className="text-xs font-mono text-pureWhite font-bold">LOCAL PERSISTENCE / SUPABASE READY</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 rounded-2xl bg-charcoal border border-subtleGray w-fit">
        {(
          [
            { id: 'allTime', label: siteContent.leaderboard.tabs.allTime },
            { id: 'daily', label: siteContent.leaderboard.tabs.daily },
            { id: 'weekly', label: siteContent.leaderboard.tabs.weekly },
            { id: 'personal', label: siteContent.leaderboard.tabs.personal },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
              activeTab === tab.id
                ? 'bg-pureWhite text-pureBlack shadow-sm'
                : 'text-mutedGray hover:text-pureWhite hover:bg-darkGray/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Top 3 Podium Cards */}
      {top3.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {top3.map((player, idx) => {
            const rankNumber = idx + 1;
            const rankLabel = rankNumber === 1 ? 'I' : rankNumber === 2 ? 'II' : 'III';
            return (
              <div
                key={player.id}
                className={`p-6 rounded-2xl border flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                  rankNumber === 1
                    ? 'bg-charcoal border-pureWhite shadow-brutal-subtle'
                    : 'bg-charcoal/70 border-subtleGray hover:border-pureWhite/50'
                }`}
              >
                {/* Trophy Roman numeral badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-pureBlack border border-pureWhite/40 flex items-center justify-center font-heading font-black text-lg text-pureWhite">
                    {rankLabel}
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-mutedGray uppercase">
                    {rankNumber === 1 ? 'CHAMPION' : rankNumber === 2 ? 'RUNNER UP' : 'THIRD APEX'}
                  </span>
                </div>

                <div>
                  <div className="font-heading font-black text-xl text-pureWhite flex items-center gap-2 mb-1">
                    {player.playerName}
                    {player.isCurrentUser && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pureWhite text-pureBlack">
                        YOU
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-mono text-mutedGray">{player.mode}</div>
                </div>

                <div className="mt-6 pt-4 border-t border-subtleGray flex items-baseline justify-between">
                  <div>
                    <span className="font-heading font-black text-4xl text-pureWhite tabular-nums">
                      {player.wpm}
                    </span>
                    <span className="font-mono text-xs text-mutedGray ml-1">WPM</span>
                  </div>
                  <div className="text-right">
                    <span className="font-heading font-bold text-lg text-pureWhite">
                      {player.accuracy.toFixed(1)}%
                    </span>
                    <div className="text-[9px] font-mono text-mutedGray uppercase">ACCURACY</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="rounded-2xl border border-subtleGray bg-charcoal/60 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-subtleGray text-[11px] font-mono uppercase tracking-wider text-mutedGray bg-charcoal">
                <th className="py-4 px-6">{siteContent.leaderboard.columns.rank}</th>
                <th className="py-4 px-6">{siteContent.leaderboard.columns.player}</th>
                <th className="py-4 px-6">{siteContent.leaderboard.columns.wpm}</th>
                <th className="py-4 px-6">{siteContent.leaderboard.columns.accuracy}</th>
                <th className="py-4 px-6">{siteContent.leaderboard.columns.mode}</th>
                <th className="py-4 px-6 text-right">{siteContent.leaderboard.columns.date}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-subtleGray/40 font-mono text-xs sm:text-sm">
              {filteredEntries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-mutedGray">
                    {siteContent.leaderboard.emptyState}
                  </td>
                </tr>
              ) : (
                filteredEntries.map((row, index) => (
                  <tr
                    key={row.id + index}
                    className={`hover:bg-darkGray/40 transition-colors ${
                      row.isCurrentUser ? 'bg-darkGray/50 border-l-4 border-pureWhite' : ''
                    }`}
                  >
                    <td className="py-4 px-6 font-bold text-pureWhite">#{index + 1}</td>
                    <td className="py-4 px-6 flex items-center gap-2">
                      <span className="text-pureWhite font-medium">{row.playerName}</span>
                      {row.isCurrentUser && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-pureWhite text-pureBlack font-bold uppercase">
                          YOU
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 font-bold text-pureWhite">{row.wpm}</td>
                    <td className="py-4 px-6 text-mutedGray">{row.accuracy.toFixed(1)}%</td>
                    <td className="py-4 px-6 text-mutedGray text-xs">{row.mode}</td>
                    <td className="py-4 px-6 text-right text-mutedGray text-xs">{row.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
