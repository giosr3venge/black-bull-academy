'use client';

import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Zap } from 'lucide-react';

export function WalletButton() {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (publicKey && connection) {
      connection.getBalance(publicKey).then((lamports) => setBalance(lamports / 1e9));
    }
  }, [publicKey, connection]);

  return (
    <div className="flex items-center gap-3">
      <AnimatePresence>
        {connected && balance !== null && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-bull-surface border border-bull-border rounded-lg">
            <Zap className="w-4 h-4 text-bull-neon" />
            <span className="text-sm font-medium text-bull-neon">{balance.toFixed(3)} SOL</span>
          </motion.div>
        )}
      </AnimatePresence>
      <WalletMultiButton style={{
        background: 'linear-gradient(135deg, #059669, #00d4aa)',
        borderRadius: '12px', padding: '10px 20px', fontSize: '14px', fontWeight: '700',
        color: '#030305', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease',
        boxShadow: '0 0 20px rgba(0, 255, 136, 0.15)',
      }}>
        {connected ? (
          <span className="flex items-center gap-2"><Wallet className="w-4 h-4" />{publicKey?.toString().slice(0, 4)}...{publicKey?.toString().slice(-4)}</span>
        ) : (
          <span className="flex items-center gap-2"><Wallet className="w-4 h-4" />Connect Wallet</span>
        )}
      </WalletMultiButton>
    </div>
  );
}
