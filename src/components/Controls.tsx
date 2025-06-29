import React from 'react';
import { Play, Pause, RotateCcw, SkipBack, SkipForward } from 'lucide-react';
import type { AlgorithmType } from '../types';

interface ControlsProps {
  algorithmType: AlgorithmType;
  setAlgorithmType: (type: AlgorithmType) => void;
  isPlaying: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onNext: () => void;
  onPrevious: () => void;
  speed: number;
  setSpeed: (speed: number) => void;
  currentStep: number;
  totalSteps: number;
  boardSize: number;
  setBoardSize: (size: number) => void;
}

const Controls: React.FC<ControlsProps> = ({
  algorithmType,
  setAlgorithmType,
  isPlaying,
  onStart,
  onPause,
  onReset,
  onNext,
  onPrevious,
  speed,
  setSpeed,
  currentStep,
  totalSteps,
  boardSize,
  setBoardSize,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Kontrol Permainan</h2>
      
      {/* Algorithm Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Pilih Algoritma:
        </label>
        <div className="flex space-x-4">
          <button
            onClick={() => setAlgorithmType('DFS')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              algorithmType === 'DFS'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            DFS (Depth-First Search)
          </button>
          <button
            onClick={() => setAlgorithmType('BFS')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              algorithmType === 'BFS'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            BFS (Breadth-First Search)
          </button>
        </div>
      </div>

      {/* Board Size */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Ukuran Papan: {boardSize}x{boardSize}
        </label>
        <input
          type="range"
          min="4"
          max="8"
          value={boardSize}
          onChange={(e) => setBoardSize(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          disabled={isPlaying}
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>4x4</span>
          <span>8x8</span>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex space-x-2">
        <button
          onClick={isPlaying ? onPause : onStart}
          className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors flex items-center justify-center space-x-2 ${
            isPlaying
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{isPlaying ? 'Pause' : 'Start'}</span>
        </button>
        <button
          onClick={onReset}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>
      </div>

      {/* Step Controls */}
      <div className="flex space-x-2">
        <button
          onClick={onPrevious}
          disabled={currentStep <= 0}
          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <SkipBack className="w-4 h-4" />
          <span>Previous</span>
        </button>
        <button
          onClick={onNext}
          disabled={currentStep >= totalSteps - 1}
          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <SkipForward className="w-4 h-4" />
          <span>Next</span>
        </button>
      </div>

      {/* Speed Control */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Kecepatan Animasi: {speed}ms
        </label>
        <input
          type="range"
          min="100"
          max="2000"
          step="100"
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Cepat (100ms)</span>
          <span>Lambat (2000ms)</span>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Langkah: {currentStep + 1} / {totalSteps}</span>
          <span>{totalSteps > 0 ? Math.round(((currentStep + 1) / totalSteps) * 100) : 0}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
