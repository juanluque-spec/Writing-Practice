
import React from 'react';
import { GamificationData } from '../types';
import Icon from './Icon';

interface HeaderProps {
  gamificationData: GamificationData;
  onAchievementsClick: () => void;
  onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ gamificationData, onAchievementsClick, onHomeClick }) => {
  const { points, level } = gamificationData;

  const pointsToNextLevel = (level + 1) * 100;
  const progressPercentage = (points % 100) / 100 * 100;

  return (
    <header className="bg-white shadow-md w-full p-4 flex justify-between items-center sticky top-0 z-50">
      <div onClick={onHomeClick} className="cursor-pointer">
        <h1 className="text-2xl md:text-3xl font-bold text-cambridge-dark flex items-center gap-2">
          <Icon name="fa-pen-to-square" />
          Cambridge Writing Coach
        </h1>
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        <div className="flex flex-col items-end">
          <span className="font-bold text-cambridge-dark text-lg">Level {level}</span>
          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="bg-accent-gold h-full" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <span className="text-sm text-dark-gray">{points} / {pointsToNextLevel} Points</span>
        </div>
        <button
          onClick={onAchievementsClick}
          className="bg-accent-gold text-cambridge-dark p-2 rounded-full hover:bg-yellow-400 transition-colors"
          aria-label="View Achievements"
        >
          <Icon name="fa-trophy" className="text-xl" />
        </button>
      </div>
    </header>
  );
};

export default Header;
   