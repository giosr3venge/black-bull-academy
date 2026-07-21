import { BullRank } from '@/types';

export const bullRanks: BullRank[] = [
  { name: 'Lost Calf', minModules: 0, color: '#475569', icon: '🌑' },
  { name: 'Awakened Bull', minModules: 2, color: '#00d4aa', icon: '👁️' },
  { name: 'Charging Spirit', minModules: 4, color: '#00ff88', icon: '⚡' },
  { name: 'Elder Beast', minModules: 6, color: '#22d3ee', icon: '🔥' },
  { name: 'Black Bull Legend', minModules: 8, color: '#fbbf24', icon: '👑' },
];

export const getRankForModules = (completedModules: number): BullRank => {
  for (let i = bullRanks.length - 1; i >= 0; i--) {
    if (completedModules >= bullRanks[i].minModules) {
      return bullRanks[i];
    }
  }
  return bullRanks[0];
};
