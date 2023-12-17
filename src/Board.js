import React, { useState } from "react";
import Cell from "./Cell";
import GameControls from "./GameControls";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = useState(createBoard());
  const [turns, setTurns] = useState(0);

  function createBoard() {
    let initialBoard = [];
    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        const isCorner =
          (y === 0 || y === nrows - 1) && (x === 0 || x === ncols - 1);
        row.push(isCorner ? !false : Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    return board.every((row) => row.every((isLit) => !isLit));
  }

  function flipCellsAround(coord) {
    setTurns((prevTurns) => prevTurns + 1);
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const newBoard = [...oldBoard];
      flipCell(y, x, newBoard);
      flipCell(y - 1, x, newBoard);
      flipCell(y + 1, x, newBoard);
      flipCell(y, x - 1, newBoard);
      flipCell(y, x + 1, newBoard);

      return newBoard;
    });
  }

  function handleNewGame() {
    setTurns(0);
    setBoard(createBoard());
  }

  function handleReset() {
    setTurns(0);
    setBoard(createBoard());
  }

  return (
    <div>
      {hasWon() && <div className="win-message">You won in {turns} turns!</div>}
      <table className="Board">
        <tbody>
          {board.map((row, y) => (
            <tr key={y}>
              {row.map((cell, x) => (
                <Cell
                  key={`${y}-${x}`}
                  isLit={cell}
                  flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <GameControls
        turns={turns}
        onNewGame={handleNewGame}
        onReset={handleReset}
      />
    </div>
  );
}

export default Board;
