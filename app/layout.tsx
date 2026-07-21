import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SolanaProvider } from '@/components/providers/SolanaProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/Toaster';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Black Bull Academy | The Spirit of $ANSEM',
  description: 'Charge Forward University — Master Solana, Memecoins & The Black Bull Mindset. Enter the realm of the Black Bull.',
  keywords: ['$ANSEM', 'Black Bull', 'Solana', 'Memecoin', 'Crypto Education', 'Trading', 'Black Bull Academy'],
  authors: [{ name: 'Black Bull Academy' }],
  openGraph: {
    title: 'Black Bull Academy | The Spirit of $ANSEM',
    description: 'Charge Forward University — Enter the realm of the Black Bull.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Black Bull Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Black Bull Academy | The Spirit of $ANSEM',
    description: 'Charge Forward University — Enter the realm of the Black Bull.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#030305',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="min-h-screen bg-bull-black text-bull-text relative overflow-x-hidden">
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-bull-neon/3 rounded-full blur-[150px] animate-pulse-slow" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-bull-cyan/3 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>
        
        <SolanaProvider>
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </SolanaProvider>
      </body>
    </html>
  );
}
