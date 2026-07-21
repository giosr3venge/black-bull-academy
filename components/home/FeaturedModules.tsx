'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';
import { modules } from '@/data/modules';
import { useAcademyStore } from '@/store/useAcademyStore';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export function FeaturedModules() {
  const getModuleProgress = useAcademyStore((s) => s.getModuleProgress);

  return (
    <section className="section-padding bg-bull-void relative">
      <div className="absolute inset-0 bg-neon-mist pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Featured Modules</h2>
            <p className="text-bull-text-dim">Begin your ascension through the Black Bull trials</p>
          </div>
          <Link href="/courses" className="hidden sm:flex items-center gap-2 text-bull-neon hover:text-bull-neon-dim transition-colors font-medium">
            View All<ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-100px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.slice(0, 4).map((module) => {
            const progress = getModuleProgress(module.id);
            const isCompleted = progress?.completed;
            return (
              <motion.div key={module.id} variants={item}>
                <Link href={`/courses/${module.slug}`}>
                  <div className="glass-panel p-6 h-full card-hover group cursor-pointer energy-border">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${
                        module.difficulty === 'Beginner' ? 'bg-bull-neon/5 text-bull-neon border-bull-neon/20' :
                        module.difficulty === 'Intermediate' ? 'bg-bull-cyan/5 text-bull-cyan border-bull-cyan/20' :
                        module.difficulty === 'Advanced' ? 'bg-purple-950/30 text-purple-400 border-purple-800/50' :
                        'bg-bull-gold/10 text-bull-gold border-bull-gold/20'
                      }`}>{module.difficulty}</span>
                      {isCompleted && (
                        <span className="text-xs font-bold text-bull-neon bg-bull-neon/10 px-2 py-1 rounded-lg border border-bull-neon/20">✓ Done</span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-bull-neon transition-colors line-clamp-2">{module.title}</h3>
                    <p className="text-sm text-bull-text-dim mb-4 line-clamp-2">{module.description}</p>
                    <div className="flex items-center gap-4 text-xs text-bull-text-dim">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{module.duration}</span>
                      <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{module.lessons.length} lessons</span>
                    </div>
                    {progress && (
                      <div className="mt-4">
                        <div className="h-1.5 bg-bull-border rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-bull-neon to-bull-cyan rounded-full transition-all" style={{ width: `${progress.score}%` }} />
                        </div>
                        <p className="text-xs text-bull-text-dim mt-1">Score: {progress.score}%</p>
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/courses" className="btn-secondary inline-flex items-center gap-2">
            View All Modules<ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
