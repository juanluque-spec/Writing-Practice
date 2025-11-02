
import React, { useState } from 'react';
import { WritingTaskType } from '../types';
import { WRITING_TASK_CONFIG } from '../constants';
import Icon from './Icon';

interface WritingTaskSelectorProps {
  onTaskSelect: (taskType: WritingTaskType) => void;
}

const WritingTaskSelector: React.FC<WritingTaskSelectorProps> = ({ onTaskSelect }) => {
  const [loadingTask, setLoadingTask] = useState<WritingTaskType | null>(null);

  const handleSelect = (taskType: WritingTaskType) => {
    setLoadingTask(taskType);
    onTaskSelect(taskType);
  };

  return (
    <div className="text-center p-8">
      <h2 className="text-4xl font-extrabold text-cambridge-dark mb-4">Choose Your Writing Task</h2>
      <p className="text-lg text-dark-gray max-w-2xl mx-auto mb-10">Select a task type below to receive a unique exam-style prompt and start writing.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {Object.values(WritingTaskType).map((taskType) => {
          const config = WRITING_TASK_CONFIG[taskType];
          const isLoading = loadingTask === taskType;
          return (
            <button
              key={taskType}
              onClick={() => handleSelect(taskType)}
              disabled={!!loadingTask}
              className={`group p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-white font-bold text-xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${config.color} ${loadingTask && !isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <Icon name="fa-spinner" className="animate-spin text-4xl mb-3" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Icon name={config.icon} className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110" />
                  <span>{taskType}</span>
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WritingTaskSelector;
   