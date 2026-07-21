import { Resource } from '@/types';

export const resources: Resource[] = [
  { id: 'r1', title: 'Ansem Tracker', url: 'https://ansemtracker.com', category: 'Tracking', description: 'The official Ansem portfolio and call tracker.' },
  { id: 'r2', title: 'Solscan', url: 'https://solscan.io', category: 'On-Chain', description: 'Solana blockchain explorer.' },
  { id: 'r3', title: 'DEX Screener', url: 'https://dexscreener.com', category: 'Trading', description: 'Real-time DEX trading data across chains.' },
  { id: 'r4', title: 'Birdeye', url: 'https://birdeye.so', category: 'Trading', description: 'Solana-focused trading terminal.' },
  { id: 'r5', title: 'Jupiter Aggregator', url: 'https://jup.ag', category: 'DeFi', description: 'Best swap rates on Solana.' },
  { id: 'r6', title: 'Raydium', url: 'https://raydium.io', category: 'DeFi', description: 'Solana AMM and liquidity provider.' },
  { id: 'r7', title: 'Phantom Wallet', url: 'https://phantom.app', category: 'Wallets', description: 'The most popular Solana wallet.' },
  { id: 'r8', title: 'Solana Compass', url: 'https://solanacompass.com', category: 'Analytics', description: 'Solana network analytics.' },
  { id: 'r9', title: 'CoinGecko', url: 'https://coingecko.com', category: 'Data', description: 'Comprehensive crypto data aggregator.' },
  { id: 'r10', title: 'GMGN.ai', url: 'https://gmgn.ai', category: 'Trading', description: 'AI-powered trading signals for Solana memecoins.' },
  { id: 'r11', title: 'Pump.fun', url: 'https://pump.fun', category: 'Launchpad', description: 'The memecoin launchpad that started it all.' },
  { id: 'r12', title: 'Meteora', url: 'https://meteora.ag', category: 'DeFi', description: 'Dynamic liquidity market maker on Solana.' },
];

export const resourceCategories = [...new Set(resources.map((r) => r.category))];
