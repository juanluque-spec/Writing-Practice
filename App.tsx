
import React, { useState, useCallback } from 'react';
import { WritingTaskType, WritingTask, GamificationData, Submission, Review } from './types';
import Header from './components/Header';
import WritingTaskSelector from './components/WritingTaskSelector';
import WritingEditor from './components/WritingEditor';
import { generateWritingPrompt } from './services/geminiService';
import GamificationDashboard from './components/GamificationDashboard';
import PeerReviewDashboard from './components/PeerReviewDashboard';
import PeerReviewEditor from './components/PeerReviewEditor';
import { MOCK_PEER_SUBMISSIONS } from './constants';

enum View {
  HOME,
  WRITING,
  PEER_REVIEW_DASHBOARD,
  PEER_REVIEW_EDITOR,
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [activeTask, setActiveTask] = useState<WritingTask | null>(null);
  const [activeSubmission, setActiveSubmission] = useState<Submission | null>(null);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  
  const [gamificationData, setGamificationData] = useState<GamificationData>({
    points: 0,
    level: 1,
    achievements: [],
  });
  
  const [peerSubmissions, setPeerSubmissions] = useState<Submission[]>(MOCK_PEER_SUBMISSIONS);

  const addPoints = useCallback((amount: number) => {
    setGamificationData(prev => {
      const newPoints = prev.points + amount;
      const newLevel = Math.floor(newPoints / 100) + 1;
      return { ...prev, points: newPoints, level: newLevel };
    });
  }, []);

  const addAchievement = useCallback((achievementId: string) => {
    setGamificationData(prev => {
      if (!prev.achievements.includes(achievementId)) {
        return { ...prev, achievements: [...prev.achievements, achievementId] };
      }
      return prev;
    });
  }, []);

  const handleTaskSelect = async (taskType: WritingTaskType) => {
    const prompt = await generateWritingPrompt(taskType);
    setActiveTask({
      id: new Date().toISOString(),
      type: taskType,
      prompt,
    });
    setCurrentView(View.WRITING);
  };
  
  const handleSubmission = (content: string) => {
      console.log("Submitted content:", content);
      alert("Submission successful! You've earned 50 points.");
      addPoints(50);
      addAchievement('first_task');
      setCurrentView(View.HOME);
      setActiveTask(null);
  }

  const handleAiUsage = useCallback(() => {
    // This could be tracked to award an achievement
    console.log("AI feature used");
    addPoints(5); 
    // Example logic for achievement
    // Imagine tracking usage count in state
    // if (aiUsageCount === 5) { addAchievement('ai_assist'); }
  }, [addPoints]);

  const handleReviewSubmission = (review: Omit<Review, 'id' | 'reviewer'>) => {
    if (!activeSubmission) return;

    const newReview: Review = {
        ...review,
        id: `rev_${new Date().toISOString()}`,
        reviewer: 'You',
    };

    setPeerSubmissions(prev => 
        prev.filter(sub => sub.id !== activeSubmission.id)
    );

    alert("Review submitted! Thank you for your feedback. You've earned 25 points.");
    addPoints(25);
    addAchievement('first_review');
    setActiveSubmission(null);
    setCurrentView(View.PEER_REVIEW_DASHBOARD);
  }
  
  const renderHome = () => (
    <div>
        <WritingTaskSelector onTaskSelect={handleTaskSelect} />
        <div className="text-center my-8">
            <button 
                onClick={() => setCurrentView(View.PEER_REVIEW_DASHBOARD)} 
                className="bg-cambridge-dark text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-all text-lg shadow-lg"
            >
                Go to Peer Review
            </button>
        </div>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case View.WRITING:
        return activeTask && <WritingEditor task={activeTask} onSubmit={handleSubmission} onAiUsage={handleAiUsage} />;
      case View.PEER_REVIEW_DASHBOARD:
        return <PeerReviewDashboard submissions={peerSubmissions} onSelectSubmission={(sub) => { setActiveSubmission(sub); setCurrentView(View.PEER_REVIEW_EDITOR); }} />;
      case View.PEER_REVIEW_EDITOR:
        return activeSubmission && <PeerReviewEditor submission={activeSubmission} onBack={() => setCurrentView(View.PEER_REVIEW_DASHBOARD)} onSubmitReview={handleReviewSubmission} />;
      case View.HOME:
      default:
        return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-light-gray">
      <Header
        gamificationData={gamificationData}
        onAchievementsClick={() => setIsAchievementsOpen(true)}
        onHomeClick={() => { setCurrentView(View.HOME); setActiveTask(null); setActiveSubmission(null); }}
      />
      <main>
        {renderContent()}
      </main>
      <GamificationDashboard 
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
        gamificationData={gamificationData}
      />
    </div>
  );
};

export default App;
   