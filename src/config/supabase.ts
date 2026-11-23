/**
 * Supabase Leaderboard Integration Configuration
 * 
 * If you configure SUPABASE_URL and SUPABASE_ANON_KEY below,
 * VIKASH TYPE will seamlessly push and sync global leaderboard scores.
 * 
 * If left blank or undefined, VIKASH TYPE automatically operates in high-performance
 * local persistence mode (via localStorage) with verified telemetry calculations.
 */

export const SUPABASE_CONFIG = {
  url: import.meta.env.VITE_SUPABASE_URL || '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  tableName: 'leaderboard_runs',
  isConfigured(): boolean {
    return Boolean(this.url && this.anonKey);
  },
};
