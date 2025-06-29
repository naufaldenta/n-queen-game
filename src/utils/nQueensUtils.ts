import type { Position, AlgorithmStep} from '../types';

export class NQueensSolver {
  private size: number;
  private steps: AlgorithmStep[] = [];
  private solutionFound: boolean = false;

  constructor(size: number) {
    this.size = size;
  }

  // Cek apakah posisi aman untuk menempatkan queen
  private isSafe(board: number[][], row: number, col: number): boolean {
    // Cek kolom
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 1) return false;
    }

    // Cek diagonal kiri atas
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 1) return false;
    }

    // Cek diagonal kanan atas
    for (let i = row - 1, j = col + 1; i >= 0 && j < this.size; i--, j++) {
      if (board[i][j] === 1) return false;
    }

    return true;
  }

  // Dapatkan posisi queens dari board
  private getQueensFromBoard(board: number[][]): Position[] {
    const queens: Position[] = [];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (board[i][j] === 1) {
          queens.push({ row: i, col: j });
        }
      }
    }
    return queens;
  }

  // Deep copy board
  private copyBoard(board: number[][]): number[][] {
    return board.map(row => [...row]);
  }

  // DFS dengan Backtracking
  public solveDFS(): AlgorithmStep[] {
    this.steps = [];
    this.solutionFound = false;
    const board = Array(this.size).fill(null).map(() => Array(this.size).fill(0));
    
    this.steps.push({
      board: this.copyBoard(board),
      queens: [],
      currentPosition: { row: 0, col: 0 },
      action: 'check',
      isValid: true,
      message: `Memulai DFS untuk ${this.size}-Queens. DFS menggunakan pendekatan depth-first dengan backtracking.`
    });

    this.dfsBacktrack(board, 0);
    return this.steps;
  }

  private dfsBacktrack(board: number[][], row: number): boolean {
    // Base case: semua queens sudah ditempatkan
    if (row >= this.size) {
      this.solutionFound = true;
      this.steps.push({
        board: this.copyBoard(board),
        queens: this.getQueensFromBoard(board),
        currentPosition: { row: row - 1, col: -1 },
        action: 'check',
        isValid: true,
        message: `✓ SOLUSI DITEMUKAN! Semua ${this.size} queens berhasil ditempatkan tanpa saling menyerang.`
      });
      return true;
    }

    // Coba setiap kolom di baris ini
    for (let col = 0; col < this.size; col++) {
      this.steps.push({
        board: this.copyBoard(board),
        queens: this.getQueensFromBoard(board),
        currentPosition: { row, col },
        action: 'check',
        isValid: true,
        message: `DFS: Memeriksa posisi (${row}, ${col}) - Mengecek apakah aman untuk menempatkan queen.`
      });

      if (this.isSafe(board, row, col)) {
        // Tempatkan queen
        board[row][col] = 1;
        this.steps.push({
          board: this.copyBoard(board),
          queens: this.getQueensFromBoard(board),
          currentPosition: { row, col },
          action: 'place',
          isValid: true,
          message: `✓ Queen ditempatkan di (${row}, ${col}) - Posisi aman! Lanjut ke baris berikutnya.`
        });

        // Rekursi ke baris berikutnya
        if (this.dfsBacktrack(board, row + 1)) {
          return true;
        }

        // BACKTRACKING: Jika tidak ada solusi, hapus queen
        board[row][col] = 0;
        this.steps.push({
          board: this.copyBoard(board),
          queens: this.getQueensFromBoard(board),
          currentPosition: { row, col },
          action: 'backtrack',
          isValid: false,
          message: `✗ BACKTRACK dari (${row}, ${col}) - Tidak ada solusi di jalur ini, mencoba posisi lain.`
        });
      } else {
        this.steps.push({
          board: this.copyBoard(board),
          queens: this.getQueensFromBoard(board),
          currentPosition: { row, col },
          action: 'check',
          isValid: false,
          message: `✗ Posisi (${row}, ${col}) tidak aman - Queen akan diserang oleh queen lain.`
        });
      }
    }

    return false;
  }

  // BFS Implementation
  public solveBFS(): AlgorithmStep[] {
    this.steps = [];
    this.solutionFound = false;
    
    interface BFSState {
      board: number[][];
      row: number;
      queens: Position[];
    }

    const queue: BFSState[] = [];
    const initialBoard = Array(this.size).fill(null).map(() => Array(this.size).fill(0));
    
    queue.push({
      board: initialBoard,
      row: 0,
      queens: []
    });

    this.steps.push({
      board: this.copyBoard(initialBoard),
      queens: [],
      currentPosition: { row: 0, col: 0 },
      action: 'check',
      isValid: true,
      message: `Memulai BFS untuk ${this.size}-Queens. BFS mengeksplorasi semua kemungkinan level demi level.`
    });

    while (queue.length > 0 && !this.solutionFound) {
      const currentState = queue.shift()!;
      
      // Jika semua queens sudah ditempatkan
      if (currentState.row >= this.size) {
        this.solutionFound = true;
        this.steps.push({
          board: this.copyBoard(currentState.board),
          queens: currentState.queens,
          currentPosition: { row: currentState.row - 1, col: -1 },
          action: 'check',
          isValid: true,
          message: `✓ SOLUSI DITEMUKAN dengan BFS! Semua ${this.size} queens berhasil ditempatkan.`
        });
        break;
      }

      // Coba setiap kolom di baris saat ini
      for (let col = 0; col < this.size; col++) {
        this.steps.push({
          board: this.copyBoard(currentState.board),
          queens: currentState.queens,
          currentPosition: { row: currentState.row, col },
          action: 'check',
          isValid: true,
          message: `BFS Level ${currentState.row}: Memeriksa posisi (${currentState.row}, ${col})`
        });

        if (this.isSafe(currentState.board, currentState.row, col)) {
          const newBoard = this.copyBoard(currentState.board);
          newBoard[currentState.row][col] = 1;
          const newQueens = [...currentState.queens, { row: currentState.row, col }];

          this.steps.push({
            board: this.copyBoard(newBoard),
            queens: newQueens,
            currentPosition: { row: currentState.row, col },
            action: 'place',
            isValid: true,
            message: `✓ Queen ditempatkan di (${currentState.row}, ${col}) - Ditambahkan ke queue untuk eksplorasi level berikutnya.`
          });

          queue.push({
            board: newBoard,
            row: currentState.row + 1,
            queens: newQueens
          });
        } else {
          this.steps.push({
            board: this.copyBoard(currentState.board),
            queens: currentState.queens,
            currentPosition: { row: currentState.row, col },
            action: 'check',
            isValid: false,
            message: `✗ Posisi (${currentState.row}, ${col}) tidak valid - Diabaikan dalam BFS.`
          });
        }
      }
    }

    return this.steps;
  }

  public getSteps(): AlgorithmStep[] {
    return this.steps;
  }
}
