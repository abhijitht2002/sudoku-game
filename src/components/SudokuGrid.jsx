import React, { useState } from "react";
import Cell from "./Cell";

function SudokuGrid({ puzzle }) {
  const [grid, setGrid] = useState(puzzle);

  const getCellColor = (r, c) => {
    const blockRow = Math.floor(r / 3);
    const blockCol = Math.floor(c / 3);

    // return (blockRow + blockCol) % 2 === 0 ? "bg-blue-50" : "bg-blue-100";
    return (blockRow + blockCol) % 2 === 0 ? "bg-[#e3e3e3]" : "bg-[#d0c4e8]";
  };

  return (
    <div className="flex flex-col gap-1">
      {grid.map((row, rIndex) => (
        <div key={rIndex} className="flex gap-1">
          {row.map((value, cIndex) => (
            <input
              type="text"
              className={`w-full aspect-square text-center text-lg font-semibold hover:cursor-pointer caret-transparent select-none touch-none ${getCellColor(
                rIndex,
                cIndex
              )} rounded-[6px]`}
              value={value === 0 ? "" : value}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default SudokuGrid;
