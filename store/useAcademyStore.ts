import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProgress, Badge } from '@/types';

interface AcademyState {
  progress: UserProgress[];
  badges: Badge[];
  totalRewards: number;
  currentStreak: number;
  lastActivity: string | null;
  completeModule: (moduleId: string, score: number) => void;
  mintBadge: (moduleId: string) => void;
  getModuleProgress: (moduleId: string) => UserProgress | undefined;
  getCompletedModules: () => number;
  getTotalScore: () => number;
  resetProgress: () => void;
}

const defaultBadges: Badge[] = [
  { id: 'badge-1', name: 'First Charge', description: 'Completed your first module', imageUrl: '/badges/first-charge.svg', moduleId: 'module-1', rarity: 'Common' },
  { id: 'badge-2', name: 'Alpha Reader', description: 'Mastered reading Ansem calls', imageUrl: '/badges/alpha-reader.svg', moduleId: 'module-2', rarity: 'Rare' },
  { id: 'badge-3', name: 'Chain Detective', description: 'Learned to decode transactions', imageUrl: '/badges/chain-detective.svg', moduleId: 'module-3', rarity: 'Rare' },
  { id: 'badge-4', name: 'Risk Manager', description: 'Mastered position sizing', imageUrl: '/badges/risk-manager.svg', moduleId: 'module-4', rarity: 'Rare' },
  { id: 'badge-5', name: 'Alpha Hunter', description: 'Found on-chain alpha', imageUrl: '/badges/alpha-hunter.svg', moduleId: 'module-5', rarity: 'Epic' },
  { id: 'badge-6', name: 'Mind of Steel', description: 'Mastered trading psychology', imageUrl: '/badges/mind-steel.svg', moduleId: 'module-6', rarity: 'Epic' },
  { id: 'badge-7', name: 'Liquidity Lord', description: 'Mastered LP strategies', imageUrl: '/badges/liquidity-lord.svg', moduleId: 'module-7', rarity: 'Epic' },
  { id: 'badge-8', name: 'Ecosystem Builder', description: 'Ready to build the movement', imageUrl: '/badges/eco-builder.svg', moduleId: 'module-8', rarity: 'Legendary' },
];

export const useAcademyStore = create<AcademyState>()(
  persist(
    (set, get) => ({
      progress: [],
      badges: defaultBadges,
      totalRewards: 0,
      currentStreak: 0,
      lastActivity: null,
      completeModule: (moduleId: string, score: number) => {
        const existing = get().progress.find((p) => p.moduleId === moduleId);
        if (existing?.completed) return;
        const newProgress: UserProgress = {
          moduleId, completed: true, score,
          completedAt: new Date().toISOString(),
          badgeMinted: false,
        };
        set((state) => ({
          progress: [...state.progress.filter((p) => p.moduleId !== moduleId), newProgress],
          totalRewards: state.totalRewards + (score >= 80 ? 100 : 50),
          lastActivity: new Date().toISOString(),
          currentStreak: state.lastActivity
            ? Math.floor((new Date().getTime() - new Date(state.lastActivity).getTime()) / (1000 * 60 * 60 * 24)) <= 1
              ? state.currentStreak + 1 : 1
            : 1,
        }));
      },
      mintBadge: (moduleId: string) => {
        set((state) => ({
          progress: state.progress.map((p) => p.moduleId === moduleId ? { ...p, badgeMinted: true } : p),
        }));
      },
      getModuleProgress: (moduleId: string) => get().progress.find((p) => p.moduleId === moduleId),
      getCompletedModules: () => get().progress.filter((p) => p.completed).length,
      getTotalScore: () => get().progress.reduce((sum, p) => sum + p.score, 0),
      resetProgress: () => set({ progress: [], totalRewards: 0, currentStreak: 0, lastActivity: null }),
    }),
    { name: 'black-bull-academy-storage' }
  )
);
