'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Flame, Target, Zap } from 'lucide-react';
import { useAcademyStore } from '@/store/useAcademyStore';
import { getRankForModules } from '@/data/ranks';

export function ProgressStats() {
  const completedModules = useAcademyStore((s) => s.getCompletedModules());
  const totalScore = useAcademyStore((s) => s.getTotalScore());
  const currentStreak = useAcademyStore((s) => s.currentStreak);
  const totalRewards = useAcademyStore((s) => s.totalRewards);
  const rank = getRankForModules(completedModules);

  const stats = [
    { label: 'Trials Completed', value: `${completedModules}/8`, icon: Target, color: 'text-bull-neon', bg: 'bg-bull-neon/5', border: 'border-bull-neon/20' },
    { label: 'Total Score', value: totalScore, icon: TrendingUp, color: 'text-bull-cyan', bg: 'bg-bull-cyan/5', border: 'border-bull-cyan/20' },
    { label: 'Day Streak', value: currentStreak, icon: Flame, color: 'text-orange-400', bg: 'bg-orange-400/5', border: 'border-orange-400/20' },
    { label: 'Spirit Energy', value: totalRewards, icon: Zap, color: 'text-bull-gold', bg: 'bg-bull-gold/5', border: 'border-bull-gold/20' },
  ];

  return (
    <div className="space-y-6">
      <div className="glass-panel-elevated p-8 text-center relative overflow-hidden border-bull-neon/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-bull-neon/30 to-transparent" />
        <p className="text-sm text-bull-text-dim mb-4 uppercase tracking-widest">Current Spirit Rank</p>
        <motion.div key={rank.name} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-4">
          <div className="relative">
            <span className="text-5xl filter drop-shadow-[0_0_20px_rgba(0,255,136,0.3)]">{rank.icon}</span>
            <div className="absolute -inset-4 bg-bull-neon/5 blur-2xl rounded-full" />
          </div>
          <div className="text-left">
            <h2 className="text-3xl font-black tracking-tight" style={{ color: rank.color }}>{rank.name}</h2>
            <p className="text-xs text-bull-text-dim mt-1">
              {completedModules < 8 ? `${8 - completedModules} more trials to ascend` : 'Maximum spirit level achieved.'}
            </p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`glass-panel p-4 border ${stat.border}`}>
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs text-bull-text-dim uppercase tracking-wider">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
