import Link from 'next/link';
import { ExternalLink, Twitter, MessageCircle, Globe, FileText } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-bull-darker border-t border-bull-border/50 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-bull-neon/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight">Black Bull Academy</h3>
            <p className="text-bull-text-dim text-sm leading-relaxed">Charge Forward University. Master Solana, memecoins, and the Black Bull mindset. Built for the $ANSEM community, by the community.</p>
            <div className="flex items-center gap-3">
              <a href="https://x.com/blknoiz06" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-bull-surface border border-bull-border text-bull-text-dim hover:text-bull-neon hover:border-bull-neon/30 transition-all"><Twitter className="w-4 h-4" /></a>
              <a href="https://t.me/ANSEM" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-bull-surface border border-bull-border text-bull-text-dim hover:text-bull-neon hover:border-bull-neon/30 transition-all"><MessageCircle className="w-4 h-4" /></a>
              <a href="https://ansemtracker.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-bull-surface border border-bull-border text-bull-text-dim hover:text-bull-neon hover:border-bull-neon/30 transition-all"><Globe className="w-4 h-4" /></a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/courses" className="text-sm text-bull-text-dim hover:text-bull-neon transition-colors">All Courses</Link></li>
              <li><Link href="/resources" className="text-sm text-bull-text-dim hover:text-bull-neon transition-colors">Resources Vault</Link></li>
              <li><Link href="/profile" className="text-sm text-bull-text-dim hover:text-bull-neon transition-colors">My Academy</Link></li>
              <li><Link href="/submit" className="text-sm text-bull-text-dim hover:text-bull-neon transition-colors">Submit Content</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">$ANSEM</h4>
            <ul className="space-y-2">
              <li><a href="https://solscan.io/token/ANSEM..." target="_blank" rel="noopener noreferrer" className="text-sm text-bull-text-dim hover:text-bull-neon transition-colors flex items-center gap-1"><FileText className="w-3 h-3" />Contract</a></li>
              <li><a href="https://dexscreener.com/solana/ANSEM..." target="_blank" rel="noopener noreferrer" className="text-sm text-bull-text-dim hover:text-bull-neon transition-colors flex items-center gap-1"><ExternalLink className="w-3 h-3" />DEX Screener</a></li>
              <li><a href="https://birdeye.so/token/ANSEM..." target="_blank" rel="noopener noreferrer" className="text-sm text-bull-text-dim hover:text-bull-neon transition-colors flex items-center gap-1"><ExternalLink className="w-3 h-3" />Birdeye</a></li>
              <li><a href="https://ansemtracker.com" target="_blank" rel="noopener noreferrer" className="text-sm text-bull-text-dim hover:text-bull-neon transition-colors flex items-center gap-1"><ExternalLink className="w-3 h-3" />Ansem Tracker</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-bull-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-bull-text-dim">© 2026 Black Bull Academy. Built for the $ANSEM community.</p>
          <p className="text-xs text-bull-text-dim">Not financial advice. DYOR. Charge Forward. 🐂</p>
        </div>
      </div>
    </footer>
  );
}
