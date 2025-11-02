
import { WritingTaskType, Submission, Review } from './types';

export const WRITING_TASK_CONFIG = {
  [WritingTaskType.ARTICLE]: { icon: 'fa-newspaper', color: 'bg-green-500' },
  [WritingTaskType.REPORT]: { icon: 'fa-chart-bar', color: 'bg-blue-500' },
  [WritingTaskType.REVIEW]: { icon: 'fa-star', color: 'bg-yellow-500' },
  [WritingTaskType.ESSAY]: { icon: 'fa-pen-nib', color: 'bg-purple-500' },
  [WritingTaskType.LETTER_EMAIL]: { icon: 'fa-envelope', color: 'bg-red-500' },
};

export const ASSESSMENT_CRITERIA = [
  { id: 'content', name: 'Content' },
  { id: 'communicativeAchievement', name: 'Communicative Achievement' },
  { id: 'organisation', name: 'Organisation' },
  { id: 'language', name: 'Language' },
];

export const MOCK_PEER_SUBMISSIONS: Submission[] = [
  {
    id: 'sub1',
    taskId: 'task1',
    taskType: WritingTaskType.REVIEW,
    prompt: "You recently saw a film that you either loved or hated. Write a review of the film for a popular film blog. Explain what you liked or disliked about it and say whether you would recommend it to others.",
    content: "The new sci-fi movie 'Cosmic Echo' was a spectacular journey. From the very beginning, I was captivated by the stunning visuals. The plot, on the other hand, was a bit predictable. The acting was superb, especially from the lead actress. I would recommend this film to any sci-fi fan, despite its few flaws. It's a good movie for a weekend night.",
    author: 'Alex Doe',
    submittedAt: new Date(),
    reviews: [],
  },
  {
    id: 'sub2',
    taskId: 'task2',
    taskType: WritingTaskType.ESSAY,
    prompt: "Your class has had a discussion about the importance of technology in education. Your teacher has asked you to write an essay giving your opinion on the statement: 'Technology is always beneficial for students.'",
    content: "In today's world, technology is everywhere, especially in schools. Some people think it's always good for learning. I think there are good things and bad things. For example, computers help with research. But, they can also be a distraction. In my opinion, teachers should guide students on how to use technology correctly. In conclusion, technology can be very helpful but it is not always beneficial if not used wisely.",
    author: 'Jane Smith',
    submittedAt: new Date(),
    reviews: [],
  }
];

export const RESOURCE_BANK = {
  connectors: [
    { category: 'Adding Information', items: ['Furthermore', 'Moreover', 'In addition', 'Also', 'As well as'] },
    { category: 'Contrast', items: ['However', 'Nevertheless', 'On the other hand', 'In contrast', 'Although', 'Despite'] },
    { category: 'Cause & Effect', items: ['Therefore', 'Consequently', 'As a result', 'Thus', 'For this reason'] },
    { category: 'Conclusion', items: ['In conclusion', 'To sum up', 'Overall', 'In short', 'To conclude'] },
  ],
  grammar: [
    { topic: 'Conditionals', tip: 'Remember to use the correct structure for zero, first, second, and third conditionals.' },
    { topic: 'Passive Voice', tip: 'Use the passive voice when the action is more important than the person who did it (e.g., The report was written).'},
    { topic: 'Reported Speech', tip: 'When reporting speech, remember to change tenses, pronouns, and time expressions.'}
  ]
};

export const ACHIEVEMENTS = [
    { id: 'first_task', name: 'First Steps', description: 'Complete your first writing task.', icon: 'fa-shoe-prints' },
    { id: 'first_review', name: 'Critical Eye', description: 'Submit your first peer review.', icon: 'fa-magnifying-glass' },
    { id: 'high_score', name: 'Top Scorer', description: 'Get an average score of 4+ on a submission.', icon: 'fa-trophy' },
    { id: 'ai_assist', name: 'AI Collaborator', description: 'Use the AI suggestions feature 5 times.', icon: 'fa-robot' },
];
   