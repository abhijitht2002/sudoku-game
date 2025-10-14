import React from "react";
import SudokuGrid from "./components/SudokuGrid";
import Timer from "./components/Timer";

const initialPuzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

function App() {
  console.log(initialPuzzle);

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="flex flex-col gap-6 items-center w-full max-w-[450px]">
        <Timer />

        <SudokuGrid puzzle={initialPuzzle} />

        <div className="flex gap-4 w-full flex-col md:flex-row">
          <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            New Puzzle
          </button>
          <button className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
            Hint
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
