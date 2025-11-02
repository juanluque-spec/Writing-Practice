
export enum WritingTaskType {
  ARTICLE = "Article",
  REPORT = "Report",
  REVIEW = "Review",
  ESSAY = "Essay",
  LETTER_EMAIL = "Letter/Email",
}

export interface WritingTask {
  id: string;
  type: WritingTaskType;
  prompt: string;
}

export interface Submission {
  id: string;
  taskId: string;
  taskType: WritingTaskType;
  prompt: string;
  content: string;
  author: string;
  submittedAt: Date;
  reviews: Review[];
}

export interface Review {
  id: string;
  reviewer: string;
  feedback: {
    content: number;
    communicativeAchievement: number;
    organisation: number;
    language: number;
  };
  comments: string;
}

export interface GamificationData {
  points: number;
  level: number;
  achievements: string[];
}

export enum SuggestionType {
  GRAMMAR = "Grammar",
  CONNECTORS = "Connectors",
  REPHRASE = "Rephrase",
  VOCABULARY = "Vocabulary",
}
   