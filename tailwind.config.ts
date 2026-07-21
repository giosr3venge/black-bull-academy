import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bull: {
          black: '#030305',
          darker: '#010102',
          void: '#080810',
          neon: '#00ff88',
          'neon-dim': '#00d4aa',
          'neon-dark': '#059669',
          'neon-glow': '#10b981',
          cyan: '#06b6d4',
          'cyan-glow': '#22d3ee',
          'cyan-dark': '#0891b2',
          gold: '#fbbf24',
          'gold-light': '#fcd34d',
          'gold-dark': '#b45309',
          crimson: '#dc2626',
          'crimson-dark': '#991b1b',
          surface: '#0a0a12',
          'surface-light': '#12121f',
          'surface-elevated': '#1a1a2e',
          border: '#1e1e2f',
          'border-glow': '#00ff8830',
          text: '#e2e8f0',
          'text-muted': '#64748b',
          'text-dim': '#475569',
          mist: 'rgba(6, 182, 212, 0.03)',
          'mist-green': 'rgba(0, 255, 136, 0.04)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'charge': 'charge 2.5s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'fog-drift': 'fog-drift 20s linear infinite',
        'energy-ripple': 'energy-ripple 3s ease-out infinite',
        'horn-flicker': 'horn-flicker 4s ease-in-out infinite',
        'eye-glow': 'eye-glow 5s ease-in-out infinite',
      },
      keyframes: {
        charge: {
          '0%, 100%': { transform: 'translateX(0) scale(1)' },
          '50%': { transform: 'translateX(8px) scale(1.02)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 255, 136, 0.15), 0 0 60px rgba(0, 255, 136, 0.05)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 255, 136, 0.3), 0 0 100px rgba(0, 255, 136, 0.1)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'fog-drift': {
          '0%': { transform: 'translateX(-10%)' },
          '100%': { transform: 'translateX(10%)' },
        },
        'energy-ripple': {
          '0%': { transform: 'scale(0.8)', opacity: '0.6' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        'horn-flicker': {
          '0%, 100%': { opacity: '1' },
          '10%': { opacity: '0.8' },
          '20%': { opacity: '1' },
          '30%': { opacity: '0.9' },
          '40%': { opacity: '1' },
          '50%': { opacity: '0.7' },
          '60%': { opacity: '1' },
          '70%': { opacity: '0.95' },
          '80%': { opacity: '1' },
          '90%': { opacity: '0.85' },
        },
        'eye-glow': {
          '0%, 100%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(1.3)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'bull-gradient': 'linear-gradient(180deg, #030305 0%, #080810 40%, #0a1f1a 100%)',
        'spirit-gradient': 'linear-gradient(135deg, #030305 0%, #0a0a1a 50%, #0d1f2d 100%)',
        'neon-mist': 'radial-gradient(ellipse at 50% 0%, rgba(0,255,136,0.08) 0%, transparent 60%)',
        'cyan-mist': 'radial-gradient(ellipse at 80% 20%, rgba(6,182,212,0.06) 0%, transparent 50%)',
      },
    },
  },
  plugins: [],
};

export default config;
