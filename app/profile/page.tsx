'use client';

import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { Wallet, LogIn, TrendingUp } from 'lucide-react';
import { WalletButton } from '@/components/wallet/WalletButton';
import { ProgressStats } from '@/components/profile/ProgressStats';
import { BadgeGallery } from '@/components/profile/BadgeGallery';
import { modules } from '@/data/modules';
import { useAcademyStore } from '@/store/useAcademyStore';
import Link from 'next/link';

export default function ProfilePage() {
  const { connected, publicKey } = useWallet();
  const getModuleProgress = useAcademyStore((s) => s.getModuleProgress);

  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-bull-neon/20 to-bull-cyan/20 flex items-center justify-center border border-bull-neon/20 neon-glow">
            <Wallet className="w-10 h-10 text-bull-neon" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Connect Your Wallet</h1>
          <p className="text-bull-text-dim mb-8">Connect your Solana wallet to track your progress, earn badges, and mint completion NFTs.</p>
          <WalletButton />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="bg-bull-void border-b border-bull-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">My Academy</h1>
              <p className="text-bull-text-dim flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                {publicKey?.toString().slice(0, 8)}...{publicKey?.toString().slice(-8)}
              </p>
            </div>
            <div className="flex items-center gap-3"><WalletButton /></div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto space-y-12">
          <ProgressStats />
          <BadgeGallery />
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-bull-neon" />Module Progress
            </h3>
            <div className="space-y-3">
              {modules.map((module) => {
                const modProgress = getModuleProgress(module.id);
                const isCompleted = modProgress?.completed;
                const score = modProgress?.score || 0;
                return (
                  <Link key={module.id} href={`/courses/${module.slug}`}>
                    <div className="glass-panel p-4 flex items-center gap-4 hover:border-bull-neon/30 transition-all cursor-pointer">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 ${isCompleted ? 'bg-bull-neon/20 text-bull-neon' : 'bg-bull-surface text-bull-text-dim'}`}>{isCompleted ? '✓' : module.order}</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-white truncate">{module.title}</h4>
                        <p className="text-xs text-bull-text-dim">{module.category} • {module.difficulty}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className={`text-sm font-bold ${isCompleted ? 'text-bull-neon' : 'text-bull-text-dim'}`}>{score}%</p>
                        <p className="text-xs text-bull-text-dim">{isCompleted ? 'Done' : 'Not started'}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
