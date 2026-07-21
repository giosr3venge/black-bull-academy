'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Clock, BarChart3, CheckCircle, Award } from 'lucide-react';
import { getModuleBySlug } from '@/data/modules';
import { Quiz } from '@/components/courses/Quiz';
import { useAcademyStore } from '@/store/useAcademyStore';
import { useWallet } from '@solana/wallet-adapter-react';
import { useToast } from '@/components/ui/Toaster';
import { mintBadgeNFT } from '@/lib/solana/badgeMint';
import { useConnection } from '@solana/wallet-adapter-react';

export default function ModulePage() {
  const params = useParams();
  const slug = params.slug as string;
  const module = getModuleBySlug(slug);
  const [activeLesson, setActiveLesson] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const { publicKey, signTransaction } = useWallet();
  const { connection } = useConnection();
  const { showToast } = useToast();
  const getModuleProgress = useAcademyStore((s) => s.getModuleProgress);
  const completeModule = useAcademyStore((s) => s.completeModule);
  const mintBadge = useAcademyStore((s) => s.mintBadge);
  
  const progress = getModuleProgress(module?.id || '');
  const isCompleted = progress?.completed;

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Module Not Found</h1>
          <Link href="/courses" className="btn-primary">Back to Courses</Link>
        </div>
      </div>
    );
  }

  const handleQuizComplete = (score: number) => {
    setQuizCompleted(true);
    completeModule(module.id, score);
  };

  const handleMintBadge = async () => {
    if (!publicKey || !signTransaction) {
      showToast('Connect your wallet first!', 'error');
      return;
    }
    try {
      showToast('Minting your badge...', 'info');
      const signature = await mintBadgeNFT({
        wallet: { publicKey, signTransaction, connected: true } as any,
        connection,
        badgeName: module.title,
        badgeDescription: `Completed ${module.title} at Black Bull Academy`,
        badgeImageUri: `https://blackbull.academy/badges/${module.slug}.png`,
        moduleId: module.id,
      });
      if (signature) {
        mintBadge(module.id);
        showToast('Badge minted on-chain! ⚡', 'success');
      }
    } catch (error) {
      showToast('Minting failed. Try again.', 'error');
    }
  };

  return (
    <div className="min-h-screen">
      <section className="bg-bull-void border-b border-bull-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/courses" className="inline-flex items-center gap-2 text-sm text-bull-text-dim hover:text-bull-neon transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />Back to Courses
          </Link>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${
                  module.difficulty === 'Beginner' ? 'bg-bull-neon/5 text-bull-neon border-bull-neon/20' :
                  module.difficulty === 'Intermediate' ? 'bg-bull-cyan/5 text-bull-cyan border-bull-cyan/20' :
                  module.difficulty === 'Advanced' ? 'bg-purple-950/30 text-purple-400 border-purple-800/50' :
                  'bg-bull-gold/10 text-bull-gold border-bull-gold/20'
                }`}>{module.difficulty}</span>
                <span className="text-xs text-bull-text-dim">{module.category}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">{module.title}</h1>
              <p className="text-bull-text-dim max-w-2xl">{module.description}</p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <div className="flex items-center gap-2 text-sm text-bull-text-dim"><Clock className="w-4 h-4" />{module.duration}</div>
              <div className="flex items-center gap-2 text-sm text-bull-text-dim"><BarChart3 className="w-4 h-4" />{module.rewardAmount} pts</div>
              {isCompleted && (
                <span className="flex items-center gap-1 text-sm text-bull-neon font-semibold"><CheckCircle className="w-4 h-4" />Completed</span>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-panel overflow-hidden rounded-2xl">
              <div className="aspect-video bg-bull-darker relative">
                <iframe src={module.videoUrl} title={module.title} className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
            </div>
            <div className="glass-panel p-6">
              <h2 className="text-xl font-bold text-white mb-4">{module.lessons[activeLesson].title}</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-bull-text-dim leading-relaxed">{module.lessons[activeLesson].content}</p>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-bull-text-dim"><Clock className="w-3.5 h-3.5" />{module.lessons[activeLesson].duration}</div>
            </div>
            {showQuiz ? (
              <Quiz questions={module.quiz} moduleId={module.id} onComplete={handleQuizComplete} />
            ) : (
              <div className="glass-panel p-8 text-center">
                <Award className="w-12 h-12 text-bull-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Ready to Test Your Knowledge?</h3>
                <p className="text-bull-text-dim mb-6">Complete the {module.quiz.length}-question quiz to earn {module.rewardAmount} points and unlock your badge.</p>
                <button onClick={() => setShowQuiz(true)} className="btn-primary">Start Quiz</button>
              </div>
            )}
            {isCompleted && !progress?.badgeMinted && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-6 border-bull-neon/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-bull-neon mb-1">Badge Unlocked!</h3>
                    <p className="text-sm text-bull-text-dim">Mint your completion badge as an NFT on Solana.</p>
                  </div>
                  <button onClick={handleMintBadge} className="btn-gold">Mint NFT Badge</button>
                </div>
              </motion.div>
            )}
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Lessons</h3>
            {module.lessons.map((lesson, index) => (
              <button key={lesson.id} onClick={() => setActiveLesson(index)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${activeLesson === index ? 'bg-bull-neon/5 border-bull-neon/30' : 'bg-bull-surface border-bull-border hover:border-bull-neon/20'}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold ${activeLesson === index ? 'bg-bull-neon text-bull-black' : 'bg-bull-black text-bull-text-dim'}`}>{index + 1}</div>
                  <div>
                    <p className={`text-sm font-medium ${activeLesson === index ? 'text-bull-neon' : 'text-white'}`}>{lesson.title}</p>
                    <p className="text-xs text-bull-text-dim mt-1">{lesson.duration}</p>
                  </div>
                </div>
              </button>
            ))}
            <div className="pt-4 border-t border-bull-border/50">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Progress</h3>
              <div className="h-2 bg-bull-border/50 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-bull-neon to-bull-cyan rounded-full transition-all"
                  style={{ width: isCompleted ? '100%' : progress ? `${progress.score}%` : '0%' }} />
              </div>
              <p className="text-xs text-bull-text-dim mt-2">{isCompleted ? 'Module completed!' : progress ? `${progress.score}% complete` : 'Not started'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
