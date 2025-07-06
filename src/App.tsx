import React, { useState, useEffect, useCallback } from 'react';
import { Castle, Sparkles, Github, ExternalLink } from 'lucide-react';
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
    let newSteps: AlgorithmStep[] = [];
    
    switch (algorithmType) {
      case 'DFS':
        newSteps = solver.solveDFS();
        break;
      case 'BFS':
        newSteps = solver.solveBFS();
        break;
      case 'BNB':
        newSteps = solver.solveBranchAndBound();
        break;
      default:
        newSteps = solver.solveDFS();
    }
    
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
        <header className="text-center mb-8 relative">
          {/* GitHub Button - Positioned at top right */}
          <div className="absolute top-0 right-0">
            <a
              href="https://github.com/naufaldenta/n-queen-game"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Main Header Content */}
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Castle className="w-12 h-12 text-amber-600" />
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-1">
                N-Queens Puzzle Solver
              </h1>
              <div className="text-sm text-gray-500 font-medium">
                Interactive Algorithm Visualizer
              </div>
            </div>
            <Castle className="w-12 h-12 text-amber-600" />
          </div>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Visualisasi algoritma <span className="font-semibold text-blue-600">DFS</span>, <span className="font-semibold text-green-600">BFS</span>, dan <span className="font-semibold text-purple-600">Branch & Bound</span> untuk menyelesaikan puzzle N-Queens. 
              Lihat bagaimana algoritma mencari solusi dengan berbagai teknik optimasi secara real-time!
            </p>
          </div>
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
            {currentStep && (currentStep.message.includes('SOLUSI DITEMUKAN') || currentStep.message.includes('SOLUSI OPTIMAL')) && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <Sparkles className="w-6 h-6 mr-3 text-green-600" />
                  <div>
                    <p className="font-bold text-lg">🎉 Selamat! Puzzle berhasil diselesaikan!</p>
                    <p className="text-sm mt-1">
                      Semua {boardSize} queens telah ditempatkan dengan aman menggunakan algoritma <span className="font-semibold">{algorithmType}</span>
                      {algorithmType === 'BNB' && currentStep.cost !== undefined && (
                        <span> dengan cost optimal: {currentStep.cost}</span>
                      )}
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
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  📊 Statistik Algoritma
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-gray-600 font-medium">Total Langkah:</span>
                    <span className="font-bold text-lg">{steps.length}</span>
                  </div>
                  
                  {algorithmType === 'DFS' && (
                    <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                      <span className="text-gray-600 font-medium">Langkah Backtrack:</span>
                      <span className="font-bold text-lg text-red-600">
                        {steps.filter(s => s.action === 'backtrack').length}
                      </span>
                    </div>
                  )}
                  
                  {algorithmType === 'BNB' && (
                    <>
                      <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                        <span className="text-gray-600 font-medium">Cabang Dipangkas:</span>
                        <span className="font-bold text-lg text-red-600">
                          {steps.filter(s => s.action === 'prune').length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                        <span className="text-gray-600 font-medium">Evaluasi Bound:</span>
                        <span className="font-bold text-lg text-purple-600">
                          {steps.filter(s => s.action === 'bound').length}
                        </span>
                      </div>
                    </>
                  )}
                  
                  <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                    <span className="text-gray-600 font-medium">Queens Ditempatkan:</span>
                    <span className="font-bold text-lg text-green-600">
                      {steps.filter(s => s.action === 'place').length}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                    <span className="text-gray-600 font-medium">Ukuran Papan:</span>
                    <span className="font-bold text-lg text-blue-600">{boardSize}x{boardSize}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                    <span className="text-gray-600 font-medium">Efisiensi:</span>
                    <span className="font-bold text-lg text-yellow-600">
                      {steps.length > 0 ? Math.round((steps.filter(s => s.action === 'place').length / steps.length) * 100) : 0}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm border-t border-gray-200 pt-8">
          <div className="max-w-2xl mx-auto">
            <p className="mb-2">
              <span className="font-semibold">N-Queens Puzzle Solver</span> - Dibuat dengan ❤️ menggunakan React, TypeScript, dan Tailwind CSS
            </p>
            <p className="text-xs">
              Visualisasi algoritma DFS, BFS, dan Branch & Bound untuk pembelajaran Kompleksitas Algoritma.
            </p>
            <div className="mt-4 flex justify-center space-x-4 text-xs">
              <span>Interactive Learning</span>
              <span>•</span>
              <span>Algorithm Visualization</span>
              <span>•</span>
              <span>Educational Tool</span>
              <span>•</span>
              <span>Optimization Techniques</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
