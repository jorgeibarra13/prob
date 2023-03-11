
// 10:31

// I got somewhat medium but bit harder to come up solutions for my telephone round for square.

// There were three parts

// Create 2 d array of the connect four grid. Example 3x6 grid.
// - - - - - - 
// - - - - - - 
// - - - - - - 

// - 1x1
// 2 x 4

// - - - - 
// - - - - 

// Array ['R' | '-' | 'B']

// Display the grid after playing . play(column, color). Always start placing the color at the bottom row up

// After play(0,'R'), looks like below
//
// 1 based
// 1 2 3 4 5 6
// R - R B - - 
// R R B B - - 
// R B B B - - 

// play(4, R)
// 1 2 3 4
// - - - - - -
// - - - - - - 
// - - - - - - 
// - R R R - - 

// [1,0,0,0,0,0] last

// let dirs = []

// R's array
// 0 0 0 0 0 0
// 0 0 0 0 0 0 
// 0 0 0 0 0 0 
// 0 3 3 3 0 0 

// B's array
// 0 0 0 0 0 0
// 0 0 0 0 0 0 
// 0 0 0 0 0 0 
// 0 0 0 0 0 0 



// - - - - - - 
// - - - - - - 
// - - - - - - 
// 3, 6

// [
//   ['-','-','-','-','-','-'],
//   ['-','-','-','-','-','-'],
//   ['-','-','-','-','-','-']
// ]


class ConnectFour {
  private rows: number = 0; // 3
  private cols: number = 0; // 6
  private grid: string[][] = [[]];
  private lastAvailableRow: number[] = []; // [0,0,0,0,0,0]
  private static connectsToWin: number = 4;

  constructor(rows:number, cols: number) {
    if (rows < 4 && cols < 4 || (rows < 2 || cols < 2)) {
      throw new Error('Either rows or cols for the game should be 4 or higher.');
    }
    this.rows = rows;
    this.cols = cols;
    this.lastAvailableRow = new Array(cols).fill(rows - 1);

    this.grid = new Array(this.rows); // [null,null,null]
    for (let i = 0; i < this.rows; i++) { // i = 3  ['-','-','-','-','-','-']
      this.grid[i] = new Array(this.cols).fill("-") 
    }
  }

  public getGrid(): string[][] {
    return this.grid;
  }

  public play(col: number, val: string): string[][] | string {
    const row = this.lastAvailableRow[col];

    let updateReturnedError = this.setGridValue(row, col, val);
    if (updateReturnedError) {
      return updateReturnedError; 
    } else {
      let isWinner = this.isWinner(row,col);
      if (isWinner) {
        console.log(`${val} is a winner!`)
      }
    }

    return this.grid;
  }

  private isWinner(row: number, col: number): boolean {
    let val = this.grid[row][col];
    let count: number = 0;
    let visited = new Set<string>();

    let consecutives = this.getConsecutives(row, col, val,visited,count);
    return consecutives >= ConnectFour.connectsToWin;
  }

  private getConsecutives(
    row: number,
    col: number,
    val: string,
    visited: Set<string>,
    count: number
  ) {
    if (row < 0 || col < 0 || row >= this.rows || col >= this.cols) return 0;
      if (this.grid[row][col] !== val) return 0;
      if (visited.has(`${row},${col}`)) return 0;

      visited.add(`${row},${col}`);
      let dirs = [[0,1], [0,-1], [1,0], [-1,0]];
      
      for (let dir of dirs) {
        const newRow = row + dir[0];
        const newCol = col + dir[1];
        count += this.getConsecutives(newRow, newCol, this.grid[row][col], visited, count);
      }

      return count + 1;
  }

  private setGridValue(row: number, col: number, val: string): void | string {
    if (row >= this.rows || row < 0) {
      return 'Row is not valid.';
    }  if (col >= this.cols || col < 0) {
      return 'Column is not valid.';
    }

    this.grid[row][col] = val;
    this.lastAvailableRow[col] -= 1;
  }
}

const connectFourGame = new ConnectFour(4,6);
console.log(connectFourGame.getGrid());
console.log(connectFourGame.play(0,'R'));
console.log(connectFourGame.play(0,'R'));
console.log(connectFourGame.play(1,'R'));
console.log(connectFourGame.play(1,'B'));
console.log(connectFourGame.play(2,'R'));
console.log(connectFourGame.play(3,'R'));
console.log(connectFourGame.play(3,'R'));
console.log(connectFourGame.play(3,'R'));
console.log(connectFourGame.play(3,'R'));
// console.log(connectFourGame.play(3,'B'));
// console.log(connectFourGame.play(3,'R'));
// console.log(connectFourGame.play(4,'R'));
