import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import { isSafe } from "../utils";

function SudokuGrid({ puzzle }) {
  const [grid, setGrid] = useState(
    puzzle.map((row) =>
      row.map((value) => ({
        value: value === 0 ? "" : value.toString(),
        isFixed: value !== 0,
      }))
    )
  );

  const handleCellChange = (r, c, newVal) => {
    setGrid((prev) => {
      const newGrid = prev.map((row) => row.map((value) => ({ ...value })));
      newGrid[r][c].value = newVal;
      return newGrid;
    });
  };

  // console.log(grid.map((row) => row.map((val) => val.value)));

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

                  // console.log(e.target.value);
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default SudokuGrid;
