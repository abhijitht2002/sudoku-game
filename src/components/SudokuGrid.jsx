import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import { isSafe } from "../utils";


function SudokuGrid({ grid, onCellChange }) {
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
                  onCellChange(rIndex, cIndex, newVal);
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
