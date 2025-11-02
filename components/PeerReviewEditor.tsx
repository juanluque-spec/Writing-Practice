
import React, { useState } from 'react';
import { Submission, Review } from '../types';
import { ASSESSMENT_CRITERIA } from '../constants';
import Icon from './Icon';

interface PeerReviewEditorProps {
  submission: Submission;
  onBack: () => void;
  onSubmitReview: (review: Omit<Review, 'id' | 'reviewer'>) => void;
}

const StarRating: React.FC<{ value: number; onChange: (value: number) => void }> = ({ value, onChange }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} onClick={() => onChange(star)} className="text-3xl focus:outline-none">
          <Icon name={star <= value ? 'fa-star' : 'fa-star-o'} className={`${star <= value ? 'text-accent-gold' : 'text-gray-300'}`} />
        </button>
      ))}
    </div>
  );
};

const PeerReviewEditor: React.FC<PeerReviewEditorProps> = ({ submission, onBack, onSubmitReview }) => {
  const [feedback, setFeedback] = useState({
    content: 0,
    communicativeAchievement: 0,
    organisation: 0,
    language: 0,
  });
  const [comments, setComments] = useState('');

  const handleRatingChange = (criterion: keyof typeof feedback, value: number) => {
    setFeedback(prev => ({ ...prev, [criterion]: value }));
  };
  
  const handleSubmit = () => {
    if (Object.values(feedback).some(v => v === 0) || !comments.trim()) {
        alert("Please provide a rating for all criteria and add some comments.");
        return;
    }
    onSubmitReview({ feedback, comments });
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
       <button onClick={onBack} className="mb-6 flex items-center gap-2 text-cambridge-blue font-semibold hover:underline">
          <Icon name="fa-arrow-left" />
          Back to Submissions
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-cambridge-dark mb-4">Submission to Review</h2>
          <div className="mb-6 p-4 bg-gray-50 border-l-4 border-cambridge-blue rounded-r-lg">
            <h3 className="font-bold text-dark-gray">Task Prompt:</h3>
            <p className="text-gray-700">{submission.prompt}</p>
          </div>
          <div className="prose max-w-none whitespace-pre-wrap">
            {submission.content}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-cambridge-dark mb-4">Your Assessment</h2>
          <div className="space-y-6">
            {ASSESSMENT_CRITERIA.map(criterion => (
              <div key={criterion.id}>
                <h3 className="text-lg font-semibold text-dark-gray">{criterion.name}</h3>
                <StarRating 
                    value={feedback[criterion.id as keyof typeof feedback]} 
                    onChange={(value) => handleRatingChange(criterion.id as keyof typeof feedback, value)} 
                />
              </div>
            ))}
             <div>
                <h3 className="text-lg font-semibold text-dark-gray mb-2">Comments</h3>
                <textarea 
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Provide constructive feedback. What did they do well? What could be improved?"
                    className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cambridge-blue"
                />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md text-lg"
            >
                Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerReviewEditor;
   