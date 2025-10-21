import React, { useEffect, useState } from "react";
import SudokuGrid from "./components/SudokuGrid";
import Timer from "./components/Timer";
import axios from "axios";
import { isGridSolved, isGridFull, emptyCellFindAll } from "./utils";
import Popup from "./components/Popup";
// import puzzles from "./puzzles.json";  // use this in case of any api side issues

function App() {
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(true);
  const [timeInSec, setTimeInSec] = useState(0);
  const [solution, setSolution] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const showPopup = (msg) => setPopupMessage(msg);
  const hidePopup = () => setPopupMessage("");

  const fetchPuzzle = async () => {
    hidePopup();
    setLoading(true);
    try {
      // API calling from created mockapi
      let res = await axios.get(
        "https://68e0dc4d93207c4b47959959.mockapi.io/sudoku"
      );
      const puzzles = res.data;
      const randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
      console.log(`puzzle ${randomPuzzle.id}`, randomPuzzle.puzzle);

      setGrid(
        randomPuzzle.puzzle.map((row) =>
          row.map((value) => ({
            value: value === 0 ? "" : value.toString(),
            isFixed: value !== 0,
          }))
        )
      );

      setSolution(randomPuzzle.solution);
      setGameOver(false);
      setTimeInSec(0);
    } catch (error) {
      console.error("failed to fetch puzzle: ", error);
      alert("could not fetch puzzle. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPuzzle();
  }, []);

  const handleCellChange = (r, c, newVal) => {
    const newGrid = grid.map((row) => row.map((value) => ({ ...value })));
    newGrid[r][c].value = newVal;
    setGrid(newGrid);

    // if (isGridFull(newGrid) && isGridSolved(newGrid)) {
    //   setGameOver(true);
    // }
  };

  const handleHint = () => {
    const newGrid = grid.map((row) => row.map((value) => ({ ...value })));
    // const emptyCells = emptyCellFinder(newGrid.value);
    console.log("New Grid: ", newGrid);
    const emptyCells = emptyCellFindAll(newGrid);

    if (emptyCells.length === 0) {
      console.log("no empty cells");
      return;
    }

    const randomEmptyCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];

    console.log("ans: ", solution[randomEmptyCell[0]][randomEmptyCell[1]]);

    newGrid[randomEmptyCell[0]][randomEmptyCell[1]].value =
    solution[randomEmptyCell[0]][randomEmptyCell[1]].toString();
    setGrid(newGrid);
    
    console.log(randomEmptyCell);
    
    // console.log(emptyCells)
  };
  
  useEffect(() => {
    if (grid.length === 0 || gameOver) return;

    if (isGridFull(grid) && isGridSolved(grid)) {
      setGameOver(true);
    }
  }, [grid, gameOver]);
  
  useEffect(() => {
    if (gameOver && timeInSec > 0) {
      showPopup(
        `Good work, You've finished the puzzle in ${Math.floor(
          timeInSec / 3600
        )} hours, ${Math.floor((timeInSec % 3600) / 60)} minutes, ${
          timeInSec % 60
        } seconds.`
      );
    }
  }, [gameOver, timeInSec]);


  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="flex flex-col gap-6 items-center w-full max-w-[450px]">
        <Timer status={gameOver} fetchTime={setTimeInSec} resetKey={loading} />

        {loading ? (
          <div>
            <h1>Loading...</h1>
          </div>
        ) : (
          grid.length > 0 && (
            <SudokuGrid
              key={Math.random()}
              // puzzle={puzzle}
              grid={grid}
              onCellChange={handleCellChange}
              timeInSec={timeInSec}
            />
          )
        )}

        <div className="flex gap-4 w-full flex-col md:flex-row">
          <button
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={fetchPuzzle}
            disabled={loading}
          >
            New Puzzle
          </button>
          <button
            className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleHint}
            disabled={loading || gameOver}
          >
            Hint
          </button>
        </div>
      </div>

      {popupMessage && <Popup message={popupMessage} onClose={hidePopup} />}
    </div>
  );
}

export default App;
