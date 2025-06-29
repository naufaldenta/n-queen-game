import React from 'react';
import type { Position } from '../types';

interface GameBoardProps {
  board: number[][];
  currentPosition?: Position;
  highlightPosition?: Position;
  size: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ 
  board, 
  currentPosition, 
  highlightPosition,
  size 
}) => {
  const getCellClass = (row: number, col: number): string => {
    const isBlack = (row + col) % 2 === 1;
    const isQueen = board[row][col] === 1;
    const isCurrent = currentPosition?.row === row && currentPosition?.col === col;
    const isHighlight = highlightPosition?.row === row && highlightPosition?.col === col;
    
    let classes = `
      aspect-square flex items-center justify-center text-2xl font-bold
      transition-all duration-300 relative
    `;
    
    if (isBlack) {
      classes += ' bg-amber-800';
    } else {
      classes += ' bg-amber-100';
    }
    
    if (isCurrent) {
      classes += ' ring-4 ring-blue-500 ring-opacity-70 animate-pulse';
    }
    
    if (isHighlight) {
      classes += ' ring-4 ring-red-500 ring-opacity-70';
    }
    
    if (isQueen) {
      classes += ' bg-yellow-500';
    }
    
    return classes;
  };

  return (
    <div className="inline-block p-4 bg-amber-900 rounded-lg shadow-2xl">
      <div 
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={getCellClass(rowIndex, colIndex)}
              style={{ width: `${Math.max(40, 320/size)}px`, height: `${Math.max(40, 320/size)}px` }}
            >
              {cell === 1 && <span className="text-white drop-shadow-lg">♛</span>}
              {currentPosition?.row === rowIndex && currentPosition?.col === colIndex && (
                <div className="absolute inset-0 bg-blue-500 bg-opacity-30 animate-pulse" />
              )}
            </div>
          ))
        )}
      </div>
      
      {/* Koordinat */}
      <div className="mt-2 flex justify-between text-xs text-amber-200">
        <div>Kolom: {Array.from({length: size}, (_, i) => i).join(' ')}</div>
        <div>Baris: 0-{size-1}</div>
      </div>
    </div>
  );
};

export default GameBoard;
