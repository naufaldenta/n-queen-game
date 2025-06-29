export interface Position {
  row: number;
  col: number;
}

export interface GameState {
  board: number[][];
  queens: Position[];
  size: number;
  isComplete: boolean;
}

export interface AlgorithmStep {
  board: number[][];
  queens: Position[];
  currentPosition: Position;
  action: 'place' | 'remove' | 'check' | 'backtrack';
  isValid: boolean;
  message: string;
}

export type AlgorithmType = 'DFS' | 'BFS';
