import React, { useState } from 'react';
// FIX: Import WritingTaskType to resolve reference errors.
import { WritingTask, SuggestionType, WritingTaskType } from '../types';
import { getAiSuggestions } from '../services/geminiService';
import Icon from './Icon';
import Modal from './Modal';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

interface WritingEditorProps {
  task: WritingTask;
  onSubmit: (content: string) => void;
  onAiUsage: () => void;
}

const SuggestionButton: React.FC<{
    suggestionType: SuggestionType;
    icon: string;
    onClick: () => void;
    disabled: boolean;
}> = ({ suggestionType, icon, onClick, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="flex-1 flex flex-col items-center justify-center p-3 bg-cambridge-blue/10 text-cambridge-blue rounded-lg hover:bg-cambridge-blue/20 disabled:opacity-50 disabled:cursor-wait transition-all"
    >
        <Icon name={icon} className="text-2xl mb-1" />
        <span className="text-sm font-semibold">{suggestionType}</span>
    </button>
);


const WritingEditor: React.FC<WritingEditorProps> = ({ task, onSubmit, onAiUsage }) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [suggestionTitle, setSuggestionTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  const handleGetSuggestion = async (type: SuggestionType) => {
    let textToAnalyze = content;
    const selection = window.getSelection()?.toString().trim();
    if (type === SuggestionType.REPHRASE && selection) {
        textToAnalyze = selection;
    } else if (type === SuggestionType.REPHRASE && !selection) {
        alert("Please select a sentence to rephrase.");
        return;
    }

    if (!textToAnalyze) {
        alert("Please write something before asking for suggestions.");
        return;
    }
    
    setIsLoading(true);
    onAiUsage();
    const result = await getAiSuggestions(textToAnalyze, type);
    
    const dirtyHtml = marked.parse(result);
    const cleanHtml = DOMPurify.sanitize(dirtyHtml);

    setSuggestion(cleanHtml);
    setSuggestionTitle(`${type} Suggestion`);
    setIsLoading(false);
    setIsModalOpen(true);
  };
  
  const handleSubmit = () => {
    if (wordCount < 100) {
        alert('Your text seems too short. Please write a bit more before submitting.');
        return;
    }
    onSubmit(content);
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <span className={`text-sm font-bold text-white px-3 py-1 rounded-full ${task.type === WritingTaskType.ARTICLE ? 'bg-green-500' : task.type === WritingTaskType.REPORT ? 'bg-blue-500' : task.type === WritingTaskType.REVIEW ? 'bg-yellow-500' : task.type === WritingTaskType.ESSAY ? 'bg-purple-500' : 'bg-red-500'}`}>{task.type}</span>
        <h2 className="text-2xl font-bold text-cambridge-dark mt-2 mb-4">Your Task:</h2>
        <p className="text-dark-gray leading-relaxed">{task.prompt}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing here..."
            className="w-full h-96 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-cambridge-blue focus:border-transparent resize-none"
          />
          <div className="mt-4 flex justify-between items-center">
            <span className="text-dark-gray font-semibold">Word Count: {wordCount}</span>
            <button 
                onClick={handleSubmit}
                className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors shadow-md"
            >
                <Icon name="fa-paper-plane" className="mr-2" />
                Submit for Review
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-cambridge-dark mb-4">AI Writing Assistant</h3>
            <p className="text-sm text-dark-gray mb-4">Use these tools to improve your writing. For 'Rephrase', select a sentence first.</p>
            <div className="space-y-3">
              <div className="flex gap-3">
                <SuggestionButton suggestionType={SuggestionType.GRAMMAR} icon="fa-spell-check" onClick={() => handleGetSuggestion(SuggestionType.GRAMMAR)} disabled={isLoading} />
                <SuggestionButton suggestionType={SuggestionType.VOCABULARY} icon="fa-book-open" onClick={() => handleGetSuggestion(SuggestionType.VOCABULARY)} disabled={isLoading} />
              </div>
              <div className="flex gap-3">
                 <SuggestionButton suggestionType={SuggestionType.CONNECTORS} icon="fa-link" onClick={() => handleGetSuggestion(SuggestionType.CONNECTORS)} disabled={isLoading} />
                <SuggestionButton suggestionType={SuggestionType.REPHRASE} icon="fa-pen-ruler" onClick={() => handleGetSuggestion(SuggestionType.REPHRASE)} disabled={isLoading} />
              </div>
            </div>
          </div>
           {isLoading && (
              <div className="mt-4 text-center">
                  <Icon name="fa-spinner" className="animate-spin text-3xl text-cambridge-blue" />
                  <p className="text-cambridge-blue mt-2">Thinking...</p>
              </div>
            )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={suggestionTitle}>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: suggestion || '' }}></div>
      </Modal>
    </div>
  );
};

export default WritingEditor;