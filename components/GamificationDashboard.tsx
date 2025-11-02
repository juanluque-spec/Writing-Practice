
import React from 'react';
import { GamificationData } from '../types';
import { ACHIEVEMENTS } from '../constants';
import Modal from './Modal';
import Icon from './Icon';

interface GamificationDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  gamificationData: GamificationData;
}

const GamificationDashboard: React.FC<GamificationDashboardProps> = ({ isOpen, onClose, gamificationData }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="My Achievements">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {ACHIEVEMENTS.map(achievement => {
          const isUnlocked = gamificationData.achievements.includes(achievement.id);
          return (
            <div
              key={achievement.id}
              className={`p-4 border-2 rounded-lg text-center transition-all duration-300 ${isUnlocked ? 'border-accent-gold bg-yellow-50' : 'border-gray-200 bg-gray-50'}`}
            >
              <Icon 
                name={achievement.icon} 
                className={`text-5xl mb-3 ${isUnlocked ? 'text-accent-gold' : 'text-gray-400'}`} 
              />
              <h3 className="font-bold text-lg text-cambridge-dark">{achievement.name}</h3>
              <p className={`text-sm ${isUnlocked ? 'text-dark-gray' : 'text-gray-500'}`}>{achievement.description}</p>
              {!isUnlocked && <div className="mt-2 text-gray-400"><Icon name="fa-lock" /> Locked</div>}
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default GamificationDashboard;
   