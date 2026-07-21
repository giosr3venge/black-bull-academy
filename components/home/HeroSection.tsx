'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Zap, TrendingUp, Users, BookOpen } from 'lucide-react';
import { useAcademyStore } from '@/store/useAcademyStore';

export function HeroSection() {
  const completedModules = useAcademyStore((s) => s.getCompletedModules());

  return (
    <section className="relative overflow-hidden min-h-[95vh] flex items-center">
      <div className="absolute inset-0 bg-bull-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,255,136,0.04)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(6,182,212,0.03)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="fog-layer top-1/4" />
        <div className="fog-layer-2 top-3/4" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,136,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,136,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-bull-neon/5 border border-bull-neon/20 rounded-full text-bull-neon text-sm font-medium mb-6 neon-glow">
                <Zap className="w-4 h-4 animate-pulse" />
                <span>Official $ANSEM Education Platform</span>
              </div>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[0.95] tracking-tight">
              Charge{' '}<span className="neon-gradient-text text-glow-neon">Forward</span><br />
              <span className="text-bull-text-dim font-light">University</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl text-bull-text-dim max-w-xl leading-relaxed">
              Enter the realm of the Black Bull. Master Solana, decode memecoins, and forge the mindset of a spirit beast. No corporate fluff — only raw, unstoppable conviction.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4">
              <Link href="/courses" className="btn-primary inline-flex items-center justify-center gap-2 text-lg shadow-lg shadow-bull-neon/10">
                Start Learning Free<ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/profile" className="btn-secondary inline-flex items-center justify-center gap-2 text-lg">My Academy</Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-bull-border/50">
              <div>
                <div className="flex items-center gap-2 text-bull-neon mb-1"><TrendingUp className="w-4 h-4" /><span className="text-2xl font-bold text-glow-neon">$0.042</span></div>
                <p className="text-xs text-bull-text-dim uppercase tracking-wider">$ANSEM Price</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-bull-cyan mb-1"><Users className="w-4 h-4" /><span className="text-2xl font-bold text-glow-cyan">12.4K</span></div>
                <p className="text-xs text-bull-text-dim uppercase tracking-wider">Holders</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-bull-gold mb-1"><BookOpen className="w-4 h-4" /><span className="text-2xl font-bold">{completedModules}/8</span></div>
                <p className="text-xs text-bull-text-dim uppercase tracking-wider">Modules Done</p>
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center relative">
            <div className="relative w-[500px] h-[500px]">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-bull-neon/10"
                style={{ background: 'conic-gradient(from 0deg, transparent 0%, rgba(0,255,136,0.03) 25%, transparent 50%, rgba(6,182,212,0.03) 75%, transparent 100%)' }} />
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-12 rounded-full border border-bull-cyan/10 border-dashed" />
              <div className="absolute inset-20 rounded-full bg-gradient-to-br from-bull-neon/5 to-bull-cyan/5 blur-3xl animate-pulse-slow" />
              {[0, 1, 2].map((i) => (
                <motion.div key={i} animate={{ scale: [1, 2], opacity: [0.3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 1.2, ease: 'easeOut' }}
                  className="absolute inset-24 rounded-full border border-bull-neon/20" />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <motion.div animate={{ y: [-8, 8, -8] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-9xl filter drop-shadow-[0_0_30px_rgba(0,255,136,0.3)]">🐂</motion.div>
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-12 bg-bull-neon/20 blur-2xl rounded-full animate-horn-flicker" />
                </div>
              </div>
              <motion.div animate={{ y: [-15, 15, -15], x: [-5, 5, -5] }} transition={{ duration: 7, repeat: Infinity }}
                className="absolute top-8 right-12 glass-panel px-4 py-2 border-bull-neon/20">
                <span className="text-bull-neon text-sm font-bold tracking-wider">⚡ CONVICTION</span>
              </motion.div>
              <motion.div animate={{ y: [15, -15, 15], x: [5, -5, 5] }} transition={{ duration: 8, repeat: Infinity }}
                className="absolute bottom-12 left-8 glass-panel px-4 py-2 border-bull-cyan/20">
                <span className="text-bull-cyan text-sm font-bold tracking-wider">🚀 CHARGE</span>
              </motion.div>
              <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-1/2 -right-4 glass-panel px-3 py-2 border-bull-gold/20">
                <span className="text-bull-gold text-xs font-bold">👑 LEGEND</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bull-black to-transparent" />
    </section>
  );
}
