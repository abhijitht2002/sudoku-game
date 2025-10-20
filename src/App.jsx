import React, { useEffect, useState } from "react";
import SudokuGrid from "./components/SudokuGrid";
import Timer from "./components/Timer";
import axios from "axios";
import puzzles from "./puzzles.json";

const initialPuzzle = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function App() {
  const [gameOver, setGameOver] = useState(true);
  const [timeInSec, setTimeInSec] = useState(0);
  const [puzzle, setPuzzle] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPuzzle = async () => {
    setLoading(true);
    try {
      // let res = await axios.get(
      //   "https://68e0dc4d93207c4b47959959.mockapi.io/sudoku"
      // );
      // const puzzles = res.data;
      const randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
      console.log(randomPuzzle.puzzle);

      setPuzzle(randomPuzzle.puzzle);
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

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="flex flex-col gap-6 items-center w-full max-w-[450px]">
        <Timer status={gameOver} fetchTime={setTimeInSec} />

        {loading ? (
          // <SudokuGrid puzzle={initialPuzzle} />
          <div><h1>Loading...</h1></div>
        ) : (
          // puzzle.length > 0 && (
          <SudokuGrid
            key={Math.random()}
            puzzle={puzzle}
            // puzzle={initialPuzzle}
            onGameOver={setGameOver}
            timeInSec={timeInSec}
          />
          // )
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
            onClick={() => {
              console.log("hint clicked");
              console.log("Loading state:", loading);
            }}
            disabled={loading}
          >
            Hint
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
