import React, { useState } from "react";
import "../App.scss";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";

const Chess = require("chess.js").Chess;

//da aggiungere controllo eccezzioni per :
//tornare al proprio posto(nel punto dov'era la pedina selezionata) senza generare errori
//indicare le mosse sbagliate gestendo l errore con un alert e la ripetizione della mossa
//impossibilitare l utente a grabbare o interagire con le pedine avversarie (le nere del bot)
//da aggiungere features :
//tempo della partita e tempo massimo per muovere la pedina
//risultato = username & tempo partita & vittoria/sconfitta & in quante mosse
//classifica

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
