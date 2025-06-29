import React, { useState, useEffect, useCallback } from 'react';
import { Castle, Sparkles } from 'lucide-react';
import GameBoard from './components/GameBoard';
import Controls from './components/Controls';
import StepInfo from './components/StepInfo';
import AlgorithmInfo from './components/AlgorithmInfo';
import { NQueensSolver } from './utils/nQueensUtils';
import type { AlgorithmStep, AlgorithmType } from './types';

const App: React.FC = () => {
  const [algorithmType, setAlgorithmType] = useState<AlgorithmType>('DFS');
  const [boardSize, setBoardSize] = useState<number>(4);
  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(800);

  // Get current step
  const currentStep = steps.length > 0 ? steps[currentStepIndex] : null;

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && currentStepIndex < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (isPlaying && currentStepIndex >= steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStepIndex, steps.length, speed]);

  // Generate steps when algorithm type or board size changes
  const generateSteps = useCallback(() => {
    const solver = new NQueensSolver(boardSize);
    const newSteps = algorithmType === 'DFS' ? solver.solveDFS() : solver.solveBFS();
    setSteps(newSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [algorithmType, boardSize]);

  // Control handlers
  const handleStart = () => {
    if (steps.length === 0) {
      generateSteps();
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    setSteps([]);
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleAlgorithmChange = (type: AlgorithmType) => {
    setAlgorithmType(type);
    handleReset();
  };

  const handleBoardSizeChange = (size: number) => {
    setBoardSize(size);
    handleReset();
  };

  // Create empty board if no steps
  const currentBoard = currentStep ? currentStep.board : 
    Array(boardSize).fill(null).map(() => Array(boardSize).fill(0));

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <Castle className="w-10 h-10 text-amber-600" />
            <h1 className="text-4xl font-bold text-gray-800">
              N-Queens Puzzle Solver
            </h1>
            <Castle className="w-10 h-10 text-amber-600" />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visualisasi algoritma DFS dan BFS untuk menyelesaikan puzzle N-Queens. 
            Lihat bagaimana algoritma mencari solusi dengan teknik backtracking!
          </p>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Game Board */}
          <div className="lg:col-span-2 flex flex-col items-center space-y-6">
            <GameBoard
              board={currentBoard}
              currentPosition={currentStep?.currentPosition}
              size={boardSize}
            />
            
            {/* Success Message */}
            {currentStep && currentStep.message.includes('SOLUSI DITEMUKAN') && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                <div className="flex items-center">
                  <Sparkles className="w-6 h-6 mr-2" />
                  <div>
                    <p className="font-bold">Selamat! Puzzle berhasil diselesaikan!</p>
                    <p className="text-sm">
                      Semua {boardSize} queens telah ditempatkan dengan aman menggunakan algoritma {algorithmType}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <StepInfo step={currentStep} algorithmType={algorithmType} />
          </div>

          {/* Right Column - Controls and Info */}
          <div className="space-y-6">
            <Controls
              algorithmType={algorithmType}
              setAlgorithmType={handleAlgorithmChange}
              isPlaying={isPlaying}
              onStart={handleStart}
              onPause={handlePause}
              onReset={handleReset}
              onNext={handleNext}
              onPrevious={handlePrevious}
              speed={speed}
              setSpeed={setSpeed}
              currentStep={currentStepIndex}
              totalSteps={steps.length}
              boardSize={boardSize}
              setBoardSize={handleBoardSizeChange}
            />

            <AlgorithmInfo algorithmType={algorithmType} />

            {/* Statistics */}
            {steps.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Statistik</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Langkah:</span>
                    <span className="font-medium">{steps.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Langkah Backtrack:</span>
                    <span className="font-medium text-red-600">
                      {steps.filter(s => s.action === 'backtrack').length}
                    </span>
                  </div>
                                   <div className="flex justify-between">
                    <span className="text-gray-600">Queens Ditempatkan:</span>
                    <span className="font-medium text-green-600">
                      {steps.filter(s => s.action === 'place').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ukuran Papan:</span>
                    <span className="font-medium">{boardSize}x{boardSize}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>
            N-Queens Puzzle Solver - Dibuat dengan React, TypeScript, dan Tailwind CSS
          </p>
          <p className="mt-1">
            Visualisasi algoritma DFS, BFS, dan Backtracking untuk pembelajaran
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
