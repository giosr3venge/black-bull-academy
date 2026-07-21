'use client';

import { motion } from 'framer-motion';
import { Lock, Award } from 'lucide-react';
import { useAcademyStore } from '@/store/useAcademyStore';
import { useWallet } from '@solana/wallet-adapter-react';

export function BadgeGallery() {
  const { badges, progress, mintBadge } = useAcademyStore();
  const { connected } = useWallet();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white flex items-center gap-2">
        <Award className="w-5 h-5 text-bull-neon" />Spirit Badges
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {badges.map((badge) => {
          const moduleProgress = progress.find((p) => p.moduleId === badge.moduleId);
          const isEarned = moduleProgress?.completed;
          const isMinted = moduleProgress?.badgeMinted;

          return (
            <motion.div key={badge.id} whileHover={isEarned ? { scale: 1.05 } : {}}
              className={`glass-panel p-4 text-center relative overflow-hidden ${isEarned ? 'border-bull-neon/20' : 'opacity-50 border-bull-border'}`}>
              {isEarned && <div className="absolute inset-0 bg-gradient-to-b from-bull-neon/5 to-transparent pointer-events-none" />}
              <div className={`w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center text-2xl relative ${
                isEarned ? 'bg-gradient-to-br from-bull-neon/20 to-bull-cyan/10 border border-bull-neon/30 neon-glow' : 'bg-bull-surface border border-bull-border'
              }`}>
                {isEarned ? '🏆' : <Lock className="w-6 h-6 text-bull-text-dim" />}
                {isEarned && <div className="absolute inset-0 bg-bull-neon/10 blur-xl rounded-2xl" />}
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{badge.name}</h4>
              <p className="text-xs text-bull-text-dim mb-2">{badge.description}</p>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                badge.rarity === 'Legendary' ? 'bg-bull-gold/10 text-bull-gold border border-bull-gold/20' :
                badge.rarity === 'Epic' ? 'bg-purple-950/30 text-purple-400 border border-purple-800/50' :
                badge.rarity === 'Rare' ? 'bg-bull-cyan/10 text-bull-cyan border border-bull-cyan/20' :
                'bg-bull-surface text-bull-text-dim border border-bull-border'
              }`}>{badge.rarity}</span>
              {isEarned && connected && !isMinted && (
                <button onClick={() => mintBadge(badge.moduleId)} className="mt-3 w-full text-xs btn-primary py-1.5 text-bull-black">Mint Spirit NFT</button>
              )}
              {isMinted && <p className="mt-3 text-xs text-bull-neon font-medium">✓ Bound On-Chain</p>}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
