'use client';

import Link from 'next/link';
import { Clock, BookOpen, Trophy } from 'lucide-react';
import { Module } from '@/types';
import { useAcademyStore } from '@/store/useAcademyStore';

interface ModuleCardProps {
  module: Module;
  index: number;
}

export function ModuleCard({ module, index }: ModuleCardProps) {
  const getModuleProgress = useAcademyStore((s) => s.getModuleProgress);
  const progress = getModuleProgress(module.id);
  const isCompleted = progress?.completed;

  const difficultyColors = {
    Beginner: 'bg-bull-neon/5 text-bull-neon border-bull-neon/20',
    Intermediate: 'bg-bull-cyan/5 text-bull-cyan border-bull-cyan/20',
    Advanced: 'bg-purple-950/30 text-purple-400 border-purple-800/50',
    'Black Bull': 'bg-bull-gold/10 text-bull-gold border-bull-gold/20',
  };

  const categoryColors = {
    Trading: 'text-bull-neon',
    'On-Chain': 'text-bull-cyan',
    Mindset: 'text-purple-400',
    Risk: 'text-yellow-400',
    Memes: 'text-pink-400',
  };

  return (
    <Link href={`/courses/${module.slug}`}>
      <div className="glass-panel p-6 h-full card-hover group cursor-pointer relative overflow-hidden energy-border">
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-bull-surface border border-bull-border flex items-center justify-center text-sm font-bold text-bull-text-dim group-hover:text-bull-neon group-hover:border-bull-neon/30 transition-all">
          {index + 1}
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs font-semibold px-2 py-1 rounded-lg border ${difficultyColors[module.difficulty]}`}>{module.difficulty}</span>
          <span className={`text-xs font-medium ${categoryColors[module.category]}`}>{module.category}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-bull-neon transition-colors pr-12">{module.title}</h3>
        <p className="text-sm text-bull-text-dim mb-4 line-clamp-2">{module.description}</p>
        <div className="flex items-center gap-4 text-xs text-bull-text-dim mb-4">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{module.duration}</span>
          <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{module.lessons.length} lessons</span>
          <span className="flex items-center gap-1"><Trophy className="w-3.5 h-3.5" />{module.rewardAmount} pts</span>
        </div>
        <div className="space-y-2">
          <div className="h-2 bg-bull-border/50 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all ${isCompleted ? 'bg-gradient-to-r from-bull-neon to-bull-cyan' : 'bg-gradient-to-r from-bull-neon-dark to-bull-neon-dim'}`}
              style={{ width: isCompleted ? '100%' : progress ? `${progress.score}%` : '0%' }} />
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-bull-text-dim">{isCompleted ? 'Completed' : progress ? 'In Progress' : 'Not Started'}</span>
            <span className={isCompleted ? 'text-bull-neon font-semibold' : 'text-bull-text-dim'}>{isCompleted ? '100%' : progress ? `${progress.score}%` : '0%'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
