import React, { useState } from "react";
import "../App.scss";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";

const Chess = require("chess.js").Chess;

//da aggiungere eccezzioni varie

const App = () => {
  const [chess, setChess] = useState(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"),
  );
  const [fen, setFen] = useState(chess.fen());

  const handleMove = (move) => {
    if (chess.move(move)) {
      setTimeout(() => {
        const moves = chess.moves();
        if (moves.length > 0) {
          const computerMove = moves[Math.floor(Math.random() * moves.length)];
          chess.move(computerMove);
          setFen(chess.fen());
        }
      }, 300);
      setFen(chess.fen());
    }
  };

  return (
    <div className="flex-center">
      <h1>Mini Chess Game</h1>
      <Chessboard
        width={700}
        position={fen}
        onDrop={(move) =>
          handleMove({
            from: move.sourceSquare,
            to: move.targetSquare,
            promotion: "q",
          })
        }
      />
    </div>
  );
};

export default App;
