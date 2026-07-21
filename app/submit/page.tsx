'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Youtube, FileText, Tag, User, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/Toaster';

export default function SubmitPage() {
  const { showToast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', youtubeUrl: '', category: 'Trading', author: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submission:', formData);
    showToast('Content submitted for review! 🐂', 'success');
    setSubmitted(true);
    setFormData({ title: '', description: '', youtubeUrl: '', category: 'Trading', author: '' });
  };

  return (
    <div className="min-h-screen">
      <section className="bg-bull-void border-b border-bull-border/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Submit Content</h1>
          <p className="text-bull-text-dim">Got alpha to share? Submit a lesson idea and help the Black Bull community level up. All submissions are reviewed before publishing.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-3xl mx-auto">
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-bull-neon/20 flex items-center justify-center border border-bull-neon/20">
                <CheckCircle className="w-8 h-8 text-bull-neon" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Submission Received!</h3>
              <p className="text-bull-text-dim mb-6">Thanks for contributing to the Black Bull Academy. Our team will review your content.</p>
              <button onClick={() => setSubmitted(false)} className="btn-secondary">Submit Another</button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="glass-panel p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2"><FileText className="w-4 h-4 text-bull-neon" />Lesson Title</label>
                  <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., How to Spot Insider Trading on Solana"
                    className="w-full px-4 py-3 bg-bull-black border border-bull-border rounded-xl text-white placeholder:text-bull-text-dim focus:outline-none focus:border-bull-neon/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2"><FileText className="w-4 h-4 text-bull-neon" />Description</label>
                  <textarea required rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe what the lesson covers and why it matters..."
                    className="w-full px-4 py-3 bg-bull-black border border-bull-border rounded-xl text-white placeholder:text-bull-text-dim focus:outline-none focus:border-bull-neon/50 resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2"><Youtube className="w-4 h-4 text-bull-crimson" />YouTube URL (optional)</label>
                  <input type="url" value={formData.youtubeUrl} onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full px-4 py-3 bg-bull-black border border-bull-border rounded-xl text-white placeholder:text-bull-text-dim focus:outline-none focus:border-bull-neon/50" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2"><Tag className="w-4 h-4 text-bull-neon" />Category</label>
                    <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 bg-bull-black border border-bull-border rounded-xl text-white focus:outline-none focus:border-bull-neon/50">
                      <option>Trading</option><option>On-Chain</option><option>Mindset</option><option>Risk</option><option>Memes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2"><User className="w-4 h-4 text-bull-neon" />Your Name / Handle</label>
                    <input type="text" required value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      placeholder="@yourhandle"
                      className="w-full px-4 py-3 bg-bull-black border border-bull-border rounded-xl text-white placeholder:text-bull-text-dim focus:outline-none focus:border-bull-neon/50" />
                  </div>
                </div>
              </div>
              <button type="submit" className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2"><Send className="w-5 h-5" />Submit Lesson Idea</button>
              <p className="text-xs text-bull-text-dim text-center">By submitting, you agree that your content may be reviewed and published on Black Bull Academy. All submissions are manually reviewed for quality.</p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
