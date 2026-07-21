export interface Module {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'Trading' | 'On-Chain' | 'Mindset' | 'Risk' | 'Memes';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Black Bull';
  duration: string;
  videoUrl: string;
  lessons: Lesson[];
  quiz: QuizQuestion[];
  rewardAmount: number;
  order: number;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  duration: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface UserProgress {
  moduleId: string;
  completed: boolean;
  score: number;
  completedAt: string | null;
  badgeMinted: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  moduleId: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

export interface BullRank {
  name: string;
  minModules: number;
  color: string;
  icon: string;
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  category: string;
  description: string;
}

export interface ContentSubmission {
  title: string;
  description: string;
  youtubeUrl: string;
  category: string;
  submittedBy: string;
  submittedAt: string;
}
