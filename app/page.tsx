import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedModules } from '@/components/home/FeaturedModules';
import Link from 'next/link';
import { ArrowRight, Shield, Brain, Zap, Globe } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Rug Protection',
    description: 'Learn to read contracts, spot honeypots, and verify safety before you ape.',
  },
  {
    icon: Brain,
    title: 'Mindset Mastery',
    description: 'Trading psychology that separates the degens who survive from those who get rekt.',
  },
  {
    icon: Zap,
    title: 'Alpha Hunting',
    description: 'On-chain tools and techniques to find opportunities before the crowd.',
  },
  {
    icon: Globe,
    title: 'Community Built',
    description: 'Created by the $ANSEM community, for the community. No corporate fluff.',
  },
];

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturedModules />

      <section className="section-padding bg-bull-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Black Bull Academy?</h2>
            <p className="text-bull-text-dim max-w-2xl mx-auto">
              We don&apos;t do boring lectures. We build convicted traders who understand the game from the inside out.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="glass-panel p-6 card-hover">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-bull-neon/20 to-bull-gold/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-bull-gold" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-bull-text-dim">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-b from-bull-black to-bull-void/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to <span className="neon-gradient-text">Charge Forward?</span>
          </h2>
          <p className="text-lg text-bull-text-dim mb-8">
            Join thousands of $ANSEM holders leveling up their trading game. The Black Bull doesn&apos;t wait — neither should you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses" className="btn-primary text-lg inline-flex items-center justify-center gap-2">
              Start Learning Now<ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/resources" className="btn-secondary text-lg inline-flex items-center justify-center gap-2">Explore Resources</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
