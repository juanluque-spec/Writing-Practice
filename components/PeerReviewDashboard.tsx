
import React from 'react';
import { Submission, WritingTaskType } from '../types';
import { WRITING_TASK_CONFIG } from '../constants';
import Icon from './Icon';

interface PeerReviewDashboardProps {
  submissions: Submission[];
  onSelectSubmission: (submission: Submission) => void;
}

const PeerReviewDashboard: React.FC<PeerReviewDashboardProps> = ({ submissions, onSelectSubmission }) => {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-cambridge-dark mb-4">Peer Review Zone</h2>
        <p className="text-lg text-dark-gray max-w-2xl mx-auto">Help your peers improve! Select a submission below to read and provide constructive feedback based on the Cambridge assessment criteria.</p>
      </div>

      {submissions.length === 0 ? (
        <div className="text-center bg-white p-10 rounded-lg shadow-md">
            <Icon name="fa-inbox" className="text-5xl text-gray-400 mb-4" />
            <h3 className="text-2xl font-bold text-dark-gray">No submissions to review yet.</h3>
            <p className="text-gray-600">Check back later to help out your peers!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {submissions.map((sub) => {
            const config = WRITING_TASK_CONFIG[sub.taskType];
            return (
              <div key={sub.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-transform transform hover:-translate-y-1">
                <div className={`p-4 text-white font-bold flex items-center gap-3 ${config.color}`}>
                  <Icon name={config.icon} />
                  <span>{sub.taskType}</span>
                </div>
                <div className="p-6 flex-grow">
                  <p className="text-sm text-gray-500 mb-2">by {sub.author}</p>
                  <p className="text-dark-gray font-medium line-clamp-4">{sub.prompt}</p>
                </div>
                <div className="p-4 bg-gray-50">
                   <button 
                    onClick={() => onSelectSubmission(sub)}
                    className="w-full bg-cambridge-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-cambridge-dark transition-colors"
                  >
                    Review Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PeerReviewDashboard;
   