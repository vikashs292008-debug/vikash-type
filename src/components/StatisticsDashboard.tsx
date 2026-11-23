import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Clock, Zap, Target, Award, Trash2 } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { PlayerStats } from '../types/game';
import { getPlayerStats, resetPlayerStats } from '../utils/storage';
import { siteContent } from '../config/siteContent';
import { soundEngine } from '../utils/soundEngine';

interface StatisticsDashboardProps {
  onStartTest: () => void;
}

export const StatisticsDashboard: React.FC<StatisticsDashboardProps> = ({ onStartTest }) => {
  const [stats, setStats] = useState<PlayerStats>(getPlayerStats());

  useEffect(() => {
    setStats(getPlayerStats());
  }, []);

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your local telemetry records?')) {
      soundEngine.playKeyClick(false);
      resetPlayerStats();
      setStats(getPlayerStats());
    }
  };

  const hasRuns = stats.totalTests > 0;

  // Format total seconds into human readable format
  const formatTime = (secs: number) => {
    if (secs < 60) return `${secs}s`;
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}m ${remainingSecs}s`;
  };

  // Prepare chart data from recent results in chronological order
  const chartData = [...stats.recentResults]
    .reverse()
    .map((res, idx) => ({
      testIndex: idx + 1,
      wpm: res.wpm,
      accuracy: res.accuracy,
      mode: res.mode,
    }));

  return (
    <section id="statistics" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-subtleGray">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-subtleGray bg-charcoal text-xs font-mono text-mutedGray uppercase tracking-wider mb-2">
            <BarChart3 className="w-3.5 h-3.5 text-pureWhite" />
            <span>{siteContent.statistics.badge}</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-pureWhite">
            {siteContent.statistics.title}
          </h2>
          <p className="text-sm text-mutedGray max-w-lg mt-1 font-mono">
            {siteContent.statistics.subtitle}
          </p>
        </div>

        {hasRuns && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-charcoal hover:bg-darkGray border border-subtleGray text-xs font-mono text-mutedGray hover:text-pureWhite transition-all self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{siteContent.statistics.clearDataButton}</span>
          </button>
        )}
      </div>

      {!hasRuns ? (
        /* Clean Empty State */
        <div className="p-12 sm:p-16 rounded-3xl bg-charcoal border-2 border-dashed border-subtleGray text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-darkGray border border-subtleGray flex items-center justify-center mb-4 text-pureWhite">
            <Zap className="w-8 h-8" />
          </div>
          <h3 className="font-heading font-black text-2xl uppercase tracking-wider text-pureWhite mb-2">
            {siteContent.statistics.emptyStateTitle}
          </h3>
          <p className="text-sm text-mutedGray max-w-md mb-6 leading-relaxed">
            {siteContent.statistics.emptyStateDesc}
          </p>
          <button
            onClick={() => {
              soundEngine.playKeyClick(false);
              onStartTest();
            }}
            className="px-6 py-3 rounded-xl bg-pureWhite text-pureBlack font-mono font-bold text-xs uppercase tracking-wider hover:bg-lightGray active:scale-95 transition-all shadow-sm"
          >
            LAUNCH FIRST SPRINT
          </button>
        </div>
      ) : (
        /* Filled Telemetry State */
        <div>
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-charcoal border border-subtleGray">
              <div className="text-[10px] font-mono tracking-wider text-mutedGray uppercase mb-1">
                {siteContent.statistics.cards.avgWpm}
              </div>
              <div className="font-heading font-black text-2xl sm:text-3xl text-pureWhite">
                {stats.averageWpm} <span className="text-xs font-mono text-mutedGray">WPM</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-charcoal border border-pureWhite/50">
              <div className="text-[10px] font-mono tracking-wider text-mutedGray uppercase mb-1">
                {siteContent.statistics.cards.bestWpm}
              </div>
              <div className="font-heading font-black text-2xl sm:text-3xl text-pureWhite">
                {stats.bestWpm} <span className="text-xs font-mono text-mutedGray">WPM</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-charcoal border border-subtleGray">
              <div className="text-[10px] font-mono tracking-wider text-mutedGray uppercase mb-1">
                {siteContent.statistics.cards.avgAccuracy}
              </div>
              <div className="font-heading font-black text-2xl sm:text-3xl text-pureWhite">
                {stats.averageAccuracy}%
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-charcoal border border-subtleGray">
              <div className="text-[10px] font-mono tracking-wider text-mutedGray uppercase mb-1">
                {siteContent.statistics.cards.testsCompleted}
              </div>
              <div className="font-heading font-black text-2xl sm:text-3xl text-pureWhite">
                {stats.totalTests}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-charcoal border border-subtleGray">
              <div className="text-[10px] font-mono tracking-wider text-mutedGray uppercase mb-1">
                {siteContent.statistics.cards.totalTime}
              </div>
              <div className="font-heading font-black text-xl sm:text-2xl text-pureWhite truncate">
                {formatTime(stats.totalTimeSeconds)}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-charcoal border border-subtleGray">
              <div className="text-[10px] font-mono tracking-wider text-mutedGray uppercase mb-1">
                {siteContent.statistics.cards.improvement}
              </div>
              <div className="font-heading font-black text-2xl sm:text-3xl text-pureWhite flex items-center gap-1">
                <span>+{(stats.bestWpm - stats.averageWpm > 0 ? stats.bestWpm - stats.averageWpm : 0)}</span>
                <span className="text-xs font-mono text-mutedGray">WPM</span>
              </div>
            </div>
          </div>

          {/* Historical Trendline Chart */}
          <div className="p-6 rounded-3xl bg-charcoal border border-subtleGray mb-8">
            <div className="flex items-center justify-between mb-4 text-xs font-mono">
              <span className="text-pureWhite font-bold uppercase tracking-wider">
                HISTORICAL PERFORMANCE EVOLUTION
              </span>
              <span className="text-mutedGray">RUN INDEX VS NET WPM</span>
            </div>
            <div className="h-60 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="wpmGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="testIndex"
                    stroke="#555555"
                    tick={{ fill: '#888888', fontSize: 11, fontFamily: 'monospace' }}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#555555"
                    tick={{ fill: '#888888', fontSize: 11, fontFamily: 'monospace' }}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#000000',
                      borderColor: '#FFFFFF',
                      borderRadius: '8px',
                      fontFamily: 'monospace',
                      fontSize: '12px',
                      color: '#FFFFFF',
                    }}
                    formatter={(val: any) => [`${val} WPM`, 'Velocity']}
                    labelFormatter={(lbl) => `Sprint #${lbl}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="wpm"
                    stroke="#FFFFFF"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#wpmGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Runs Table */}
          <div className="rounded-2xl border border-subtleGray bg-charcoal overflow-hidden">
            <div className="p-4 border-b border-subtleGray font-mono text-xs uppercase tracking-wider text-mutedGray flex justify-between items-center">
              <span>{siteContent.statistics.recentHistoryTitle}</span>
              <span>SHOWING LAST {stats.recentResults.length} RUNS</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-subtleGray/40 text-mutedGray">
                    <th className="py-3 px-4">DATE</th>
                    <th className="py-3 px-4">MODE</th>
                    <th className="py-3 px-4">NET WPM</th>
                    <th className="py-3 px-4">RAW WPM</th>
                    <th className="py-3 px-4">ACCURACY</th>
                    <th className="py-3 px-4">RANK</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-subtleGray/30">
                  {stats.recentResults.slice(0, 10).map((r) => (
                    <tr key={r.id} className="hover:bg-darkGray/40 transition-colors">
                      <td className="py-3 px-4 text-mutedGray">{r.date}</td>
                      <td className="py-3 px-4 text-pureWhite">{r.mode} ({r.timeElapsed}s)</td>
                      <td className="py-3 px-4 font-bold text-pureWhite">{r.wpm}</td>
                      <td className="py-3 px-4 text-mutedGray">{r.rawWpm}</td>
                      <td className="py-3 px-4 text-pureWhite">{r.accuracy}%</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-darkGray text-softWhite text-[10px]">
                          {r.rank.name}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
