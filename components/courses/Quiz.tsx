'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Award } from 'lucide-react';
import { QuizQuestion } from '@/types';
import { useAcademyStore } from '@/store/useAcademyStore';
import { useToast } from '@/components/ui/Toaster';

interface QuizProps {
  questions: QuizQuestion[];
  moduleId: string;
  onComplete: (score: number) => void;
}

export function Quiz({ questions, moduleId, onComplete }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const completeModule = useAcademyStore((s) => s.completeModule);
  const { showToast } = useToast();

  const currentQuestion = questions[currentIndex];
  const score = Math.round((answers.filter(Boolean).length / questions.length) * 100);

  const handleSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    const isCorrect = index === currentQuestion.correctAnswer;
    setAnswers((prev) => [...prev, isCorrect]);
    if (isCorrect) {
      showToast('Correct! The spirit grows stronger ⚡', 'success');
    } else {
      showToast('The bull demands more focus. Learn and charge again.', 'error');
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
      completeModule(moduleId, score);
      onComplete(score);
      showToast(`Trial complete! Score: ${score}%`, score >= 80 ? 'success' : 'info');
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0); setSelectedAnswer(null); setShowExplanation(false); setAnswers([]); setQuizComplete(false);
  };

  if (quizComplete) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="glass-panel-elevated p-8 text-center border-bull-neon/20">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-bull-neon/20 to-bull-cyan/20 flex items-center justify-center border border-bull-neon/20 neon-glow">
          <Award className="w-10 h-10 text-bull-neon" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Trial Complete!</h3>
        <p className="text-bull-text-dim mb-6">
          {score >= 80 ? 'The Black Bull recognizes your strength. Conviction forged.' :
           score >= 60 ? 'You show promise. Sharpen your instincts and return.' :
           'The path is harsh. Study the ancient texts and retry.'}
        </p>
        <div className="text-5xl font-bold neon-gradient-text mb-2">{score}%</div>
        <p className="text-sm text-bull-text-dim mb-6">{answers.filter(Boolean).length} / {questions.length} correct</p>
        <div className="flex justify-center gap-3">
          {score < 80 && (
            <button onClick={handleRetry} className="btn-secondary inline-flex items-center gap-2"><RotateCcw className="w-4 h-4" />Retry Trial</button>
          )}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="btn-primary inline-flex items-center gap-2">Continue Path<ArrowRight className="w-4 h-4" /></button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="glass-panel-elevated p-6 sm:p-8 border-bull-border/50">
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-bull-text-dim">Trial {currentIndex + 1} of {questions.length}</span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${
              i < currentIndex ? (answers[i] ? 'bg-bull-neon' : 'bg-bull-crimson') :
              i === currentIndex ? 'bg-bull-neon animate-pulse' : 'bg-bull-border'
            }`} />
          ))}
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mb-6">{currentQuestion.question}</h3>
      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => (
          <motion.button key={index} whileHover={!showExplanation ? { scale: 1.01 } : {}} whileTap={!showExplanation ? { scale: 0.99 } : {}}
            onClick={() => handleSelect(index)} disabled={showExplanation}
            className={`w-full text-left p-4 rounded-xl border transition-all ${
              showExplanation
                ? index === currentQuestion.correctAnswer ? 'bg-bull-neon/10 border-bull-neon/30 text-bull-neon' :
                  index === selectedAnswer && index !== currentQuestion.correctAnswer ? 'bg-red-950/20 border-red-800/50 text-red-400' :
                  'bg-bull-surface/50 border-bull-border text-bull-text-dim'
                : 'bg-bull-surface/50 border-bull-border text-bull-text hover:border-bull-neon/30 hover:bg-bull-surface-light transition-all'
            }`}>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-bull-black border border-bull-border flex items-center justify-center text-sm font-bold shrink-0">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-sm sm:text-base">{option}</span>
              {showExplanation && index === currentQuestion.correctAnswer && <CheckCircle className="w-5 h-5 text-bull-neon ml-auto shrink-0" />}
              {showExplanation && index === selectedAnswer && index !== currentQuestion.correctAnswer && <XCircle className="w-5 h-5 text-red-400 ml-auto shrink-0" />}
            </div>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {showExplanation && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 bg-bull-surface/30 rounded-xl border border-bull-border/50">
            <p className="text-sm text-bull-text-dim"><span className="text-bull-neon font-semibold">Spirit Knowledge: </span>{currentQuestion.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
      {showExplanation && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 flex justify-end">
          <button onClick={handleNext} className="btn-primary inline-flex items-center gap-2">
            {currentIndex < questions.length - 1 ? (<>Next Trial<ArrowRight className="w-4 h-4" /></>) : (<>Complete Trial<Award className="w-4 h-4" /></>)}
          </button>
        </motion.div>
      )}
    </div>
  );
}
