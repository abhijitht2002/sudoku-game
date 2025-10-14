import React, { useState } from "react";
import Cell from "./Cell";

function SudokuGrid({ puzzle }) {
  const [grid, setGrid] = useState(
    puzzle.map((row) =>
      row.map((value) => ({
        value: value === 0 ? "" : value.toString(),
        isFixed: value !== 0,
      }))
    )
  );

  const handleCellChange = (r,c,e) => {
    setGrid((prev) => {
      const newGrid = prev.map(row => row.map(value => ({...value})))
      console.log("Grid:", grid);
      console.log("newGrid:", newGrid);
      newGrid[r][c].value = e.target.value
      return newGrid
    });
  };

  console.log(grid.map((row) => row.map((val) => val.value)));

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
            <Cell
              value={value.value}
              isFixed={value.isFixed}
              colorClass={getCellColor(rIndex, cIndex)}
              onChange={(e) => {
                handleCellChange(rIndex, cIndex, e);
                
                console.log(e.target.value);
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default SudokuGrid;
