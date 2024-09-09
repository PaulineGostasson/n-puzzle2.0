import React, { useEffect, useState, useCallback } from "react";
import Tiles from "../tiles/tiles";
import "./gameBoard.css";
import { config } from "../config";

// Function som shufflar arrayen 
function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

// consts för rows, columns, och antalet brickor
const { rows: ROWS, cols: COLS } = config; 
const TOTAL = ROWS * COLS;

function GameBoard() {
  // State variables
  const [randomTile, setRandomTile] = useState([]);
  const [moveCount, setMoveCount] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  // useEffect som startar gameboard
  useEffect(() => {
    resetGame();
  }, []);

  // useEffect som uppdaterar tiden
  useEffect(() => {
    const timer = gameWon ? null : setInterval(() => setTimeElapsed((prevTime) => prevTime + 1), 1000);
    return () => clearInterval(timer);
  }, [gameWon]);

  // Visar ifall du har klarat av spelet
  const checkWin = useCallback(() => {
    if (!gameStarted) {
      return;
    }
    const isWin = randomTile.every((e, i) => i === TOTAL - 1 || e === i + 1);
    if (isWin) {
      setGameWon(true);
      alert(`Grattis! Du har klarat spelet på ${moveCount} drag och ${timeElapsed} sekunder.`);
    }
  }, [randomTile, gameStarted, moveCount, timeElapsed, TOTAL]);

  useEffect(() => {
    checkWin();
  }, [randomTile, checkWin]);


  // Function som startar om spelet
  function resetGame() {
    const squares = Array.from({ length: TOTAL }, (_, i) => i);
    setRandomTile(shuffle(squares));
    setMoveCount(0);
    setGameWon(false);
    setTimeElapsed(0);
    setGameStarted(false);
  }

  // Function för att hantera movements med tilesen
  function moveTile(clickedIndex) {
    setGameStarted(true);
    const zeroIndex = randomTile.indexOf(0);
    const clickedRow = Math.floor(clickedIndex / COLS);
    const zeroRow = Math.floor(zeroIndex / COLS);
    const clickedCol = clickedIndex % COLS;
    const zeroCol = zeroIndex % COLS;

    let tempArray = [...randomTile];

    // Flytta i samma kolumn
    if (clickedCol === zeroCol) {
      if (clickedRow < zeroRow) {
        // flytta ner
        for (let i = zeroIndex - COLS; i >= clickedIndex; i -= COLS) {
          tempArray[i + COLS] = tempArray[i];
        }
      } else {
        // Flytta upp
        for (let i = zeroIndex + COLS; i <= clickedIndex; i += COLS) {
          tempArray[i - COLS] = tempArray[i];
        }
      }
      tempArray[clickedIndex] = 0;
    }

    // Flytta i samma rad
    if (clickedRow === zeroRow) {
      if (clickedCol < zeroCol) {
        // Flytta höger
        for (let i = zeroIndex - 1; i >= clickedIndex; i--) {
          tempArray[i + 1] = tempArray[i];
        }
      } else {
        // Flytta vänster
        for (let i = zeroIndex + 1; i <= clickedIndex; i++) {
          tempArray[i - 1] = tempArray[i];
        }
      }
      tempArray[clickedIndex] = 0;
    }

    setRandomTile(tempArray);
    setMoveCount(prevCount => prevCount + 1);
    checkWin();
  }


  // Function som ändrar ordning på brickorna
  function shuffleSquares() {
    setRandomTile(shuffle(randomTile));
    setMoveCount(0);
    setGameWon(false);
    setTimeElapsed(0);
    setGameStarted(false);
  }

  // Function som löser pusslet automatiskt
  function solvePuzzle() {
    const solvedArray = Array.from({ length: TOTAL - 1 }, (_, i) => i + 1).concat(0);
    setRandomTile(solvedArray);
    setGameWon(true);
  }

  // Rendera GamerBoard
  return (
    <div>
      {gameWon && <div className="WinMessage">Congratulations! You won!</div>}
      <div className="MoveCounter">Moves: {moveCount}</div>
      <div className="Container" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
        {randomTile.map((e, index) => (
          <div key={index} className="Container-Sub">
            <Tiles
              value={e}
              clickHandler={() => moveTile(index)}
              style={e === index + 1 || (e === 0 && index === TOTAL - 1) ? { backgroundColor: '#4CAF50', color: 'white' } : {}}
            />
          </div>
        ))}
      </div>
      <button onClick={shuffleSquares} className="ShuffleButton">Shuffle</button>
      <button onClick={solvePuzzle} className="SolveButton">Solve Puzzle</button>
    </div>
  );
}

export default GameBoard;