import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import { isGridSolved, isSafe } from "../utils";
import Popup from "./Popup";

function SudokuGrid({ puzzle, onGameOver, timeInSec }) {
  const [grid, setGrid] = useState(
    puzzle.map((row) =>
      row.map((value) => ({
        value: value === 0 ? "" : value.toString(),
        isFixed: value !== 0,
      }))
    )
  );

  useEffect(() => {
    if (timeInSec > 0) {
      showPopup(
        `Good work, You've finished the puzzle in ${Math.floor(
          timeInSec / 3600
        )} hours, ${Math.floor((timeInSec % 3600) / 60)} minutes, ${
          timeInSec % 60
        } seconds.`
      );
    }
  }, [timeInSec]);

  const [popupMessage, setPopupMessage] = useState("");

  const showPopup = (msg) => setPopupMessage(msg);
  const hidePopup = () => setPopupMessage("");

  const isGridFull = (grid) => {
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

  const handleCellChange = (r, c, newVal) => {
    const newGrid = grid.map((row) => row.map((value) => ({ ...value })));
    newGrid[r][c].value = newVal;
    setGrid(newGrid);

    if (isGridFull(newGrid) && isGridSolved(newGrid)) {
      onGameOver(true);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {grid.map((row, rIndex) => (
        <div key={rIndex} className="flex gap-1">
          {row.map((value, cIndex) => {
            const checkSafety = isSafe(grid, rIndex, cIndex, value.value);

            return (
              <Cell
                key={cIndex}
                r={rIndex}
                c={cIndex}
                value={value.value}
                isFixed={value.isFixed}
                isSafe={checkSafety}
                onValueChange={(newVal) => {
                  handleCellChange(rIndex, cIndex, newVal);
                }}
              />
            );
          })}
        </div>
      ))}

      {popupMessage && <Popup message={popupMessage} onClose={hidePopup} />}
    </div>
  );
}

export default SudokuGrid;
