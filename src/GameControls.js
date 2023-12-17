import React from "react";

function GameControls({ turns, onNewGame, onReset }) {
  return (
    <div className="button-container">
      <div className="turns-counter">My Turns: {turns}</div>
      <button onClick={onNewGame}>New Game</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}

export default GameControls;
