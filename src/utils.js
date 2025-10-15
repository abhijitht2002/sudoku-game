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
