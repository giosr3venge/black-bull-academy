'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Search, Globe, BookOpen, BarChart3, Wallet, Layers, Rocket, Database } from 'lucide-react';
import { resources, resourceCategories } from '@/data/resources';

const categoryIcons: Record<string, React.ReactNode> = {
  Tracking: <BarChart3 className="w-4 h-4" />,
  'On-Chain': <Database className="w-4 h-4" />,
  Trading: <TrendingUp className="w-4 h-4" />,
  DeFi: <Layers className="w-4 h-4" />,
  Wallets: <Wallet className="w-4 h-4" />,
  Analytics: <BarChart3 className="w-4 h-4" />,
  Data: <BookOpen className="w-4 h-4" />,
  Launchpad: <Rocket className="w-4 h-4" />,
};

function TrendingUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = resources.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <section className="bg-bull-void border-b border-bull-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Resources Vault</h1>
          <p className="text-bull-text-dim max-w-2xl">Curated tools, trackers, and platforms every Black Bull needs in their arsenal. Bookmark these — your edge depends on them.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bull-text-dim" />
              <input type="text" placeholder="Search resources..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-bull-surface border border-bull-border rounded-xl text-sm text-white placeholder:text-bull-text-dim focus:outline-none focus:border-bull-neon/50" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              <button onClick={() => setSelectedCategory('All')}
                className={`px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === 'All' ? 'bg-bull-neon/10 text-bull-neon border border-bull-neon/30' : 'bg-bull-surface text-bull-text-dim border border-bull-border'}`}>All</button>
              {resourceCategories.map((cat) => (
                <button key={cat} onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${selectedCategory === cat ? 'bg-bull-neon/10 text-bull-neon border border-bull-neon/30' : 'bg-bull-surface text-bull-text-dim border border-bull-border'}`}>
                  {categoryIcons[cat]}{cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((resource, i) => (
              <motion.a key={resource.id} href={resource.url} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="glass-panel p-6 card-hover group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-bull-surface border border-bull-border flex items-center justify-center text-bull-neon group-hover:bg-bull-neon/10 transition-colors">
                    <Globe className="w-5 h-5" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-bull-text-dim group-hover:text-bull-neon transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-bull-neon transition-colors">{resource.title}</h3>
                <p className="text-sm text-bull-text-dim mb-3">{resource.description}</p>
                <span className="text-xs font-medium text-bull-neon bg-bull-neon/10 px-2 py-1 rounded-lg border border-bull-neon/20">{resource.category}</span>
              </motion.a>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Search className="w-12 h-12 text-bull-text-dim mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No resources found</h3>
              <p className="text-bull-text-dim">Try adjusting your search</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
