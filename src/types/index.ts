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
  action: 'place' | 'remove' | 'check' | 'backtrack' | 'bound' | 'prune';
  isValid: boolean;
  message: string;
  bound?: number;
  cost?: number;
  level?: number;
}

export type AlgorithmType = 'DFS' | 'BFS' | 'BNB';

export interface BranchAndBoundNode {
  board: number[][];
  queens: Position[];
  level: number;
  cost: number;
  bound: number;
}
