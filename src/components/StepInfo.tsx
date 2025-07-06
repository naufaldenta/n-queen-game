import React from 'react';
import { Crown, X, Search, CornerUpLeft, HelpCircle, Scissors, BarChart3 } from 'lucide-react';
import type { AlgorithmStep, AlgorithmType } from '../types';

interface StepInfoProps {
  step: AlgorithmStep | null;
  algorithmType: AlgorithmType;
}

const StepInfo: React.FC<StepInfoProps> = ({ step, algorithmType }) => {
  if (!step) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Informasi Langkah</h3>
        <p className="text-gray-600">Pilih algoritma dan tekan Start untuk memulai</p>
      </div>
    );
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'place': return <Crown className="w-6 h-6" />;
      case 'remove': return <X className="w-6 h-6" />;
      case 'check': return <Search className="w-6 h-6" />;
      case 'backtrack': return <CornerUpLeft className="w-6 h-6" />;
      case 'bound': return <BarChart3 className="w-6 h-6" />;
      case 'prune': return <Scissors className="w-6 h-6" />;
      default: return <HelpCircle className="w-6 h-6" />;
    }
  };

  const getActionColor = (action: string, isValid: boolean) => {
    if (action === 'backtrack' || action === 'prune') return 'text-red-600';
    if (action === 'bound') return 'text-purple-600';
    if (action === 'place' && isValid) return 'text-green-600';
    if (!isValid) return 'text-red-600';
    return 'text-blue-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Informasi Langkah - {algorithmType}
      </h3>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <span className={getActionColor(step.action, step.isValid)}>
            {getActionIcon(step.action)}
          </span>
          <span className={`font-medium ${getActionColor(step.action, step.isValid)}`}>
            {step.action.toUpperCase()}
          </span>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-sm text-gray-700">{step.message}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-600">Posisi:</span>
            <span className="ml-2">({step.currentPosition.row}, {step.currentPosition.col})</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Queens:</span>
            <span className="ml-2">{step.queens.length}</span>
          </div>
        </div>

        {/* Branch and Bound specific information */}
        {algorithmType === 'BNB' && (step.bound !== undefined || step.cost !== undefined || step.level !== undefined) && (
          <div className="mt-4 p-3 bg-purple-50 rounded-md border border-purple-200">
            <h4 className="font-semibold text-purple-800 mb-2">📊 Branch & Bound Info:</h4>
            <div className="grid grid-cols-3 gap-2 text-sm">
              {step.cost !== undefined && (
                <div>
                  <span className="font-medium text-purple-600">Cost:</span>
                  <span className="ml-1 font-bold">{step.cost}</span>
                </div>
              )}
              {step.bound !== undefined && (
                <div>
                  <span className="font-medium text-purple-600">Bound:</span>
                  <span className="ml-1 font-bold">{step.bound}</span>
                </div>
              )}
              {step.level !== undefined && (
                <div>
                  <span className="font-medium text-purple-600">Level:</span>
                  <span className="ml-1 font-bold">{step.level}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepInfo;
