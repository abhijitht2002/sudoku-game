export function isSafe(grid, r, c, val) {
  val = val.toString();

  //   row-wise checking
  for (let i = 0; i < 9; i++) {
    if (i !== c && grid[r][i].value === val) return false;
  }

  //   col-wise checking
  for (let i = 0; i < 9; i++) {
    if (i !== r && grid[i][c].value === val) return false;
  }

  //   3x3 subgrid check
  const startRow = Math.floor(r / 3) * 3;
  const startCol = Math.floor(c / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = grid[startRow + i][startCol + j];
      if ((startRow + i !== r || startCol + j !== c) && cell.value === val) {
        return false;
      }
    }
  }

  return true;
}

// grid checker
export function isGridSolved(grid) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const val = grid[i][j].value;
      /* if (val === "" || val === 0) continue; */ /* skip empty cells (for reusability and for future updation if needed) */
      if (!isSafe(grid, i, j, val)) {
        return false;
      }
    }
  }
  return true;
}

// grid filled checker
export const isGridFull = (grid) => {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      const cell = grid[r][c];
      if (cell.value === "" || cell.value === 0) {
        return false;
      }
    }
  }
  return true;
};

// empty cell finder
export function emptyCellFindAll(grid) {
  let emptyCells = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = grid[i][j].value;
      if(cell === "" || cell === 0){
        emptyCells.push([i, j])
      }
    }
  }
  return emptyCells;
}
