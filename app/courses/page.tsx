'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid3X3, List } from 'lucide-react';
import { modules } from '@/data/modules';
import { ModuleCard } from '@/components/courses/ModuleCard';

const categories = ['All', 'Trading', 'On-Chain', 'Mindset', 'Risk', 'Memes'];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredModules = modules.filter((module) => {
    const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) || module.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || module.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <section className="bg-bull-void border-b border-bull-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Course Modules</h1>
          <p className="text-bull-text-dim max-w-2xl">8 modules designed to take you from Lost Calf to Black Bull Legend. Each module includes video lessons, written guides, and a final quiz.</p>
        </div>
      </section>

      <section className="sticky top-16 z-40 bg-bull-black/95 backdrop-blur-2xl border-b border-bull-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-bull-neon/10 text-bull-neon border border-bull-neon/30' : 'bg-bull-surface text-bull-text-dim hover:text-white border border-bull-border'}`}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bull-text-dim" />
                <input type="text" placeholder="Search modules..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 bg-bull-surface border border-bull-border rounded-lg text-sm text-white placeholder:text-bull-text-dim focus:outline-none focus:border-bull-neon/50" />
              </div>
              <div className="flex items-center bg-bull-surface border border-bull-border rounded-lg p-1">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-bull-border text-white' : 'text-bull-text-dim'}`}><Grid3X3 className="w-4 h-4" /></button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-bull-border text-white' : 'text-bull-text-dim'}`}><List className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          {filteredModules.length > 0 ? (
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredModules.map((module, index) => (
                <motion.div key={module.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                  <ModuleCard module={module} index={index} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Filter className="w-12 h-12 text-bull-text-dim mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No modules found</h3>
              <p className="text-bull-text-dim">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
