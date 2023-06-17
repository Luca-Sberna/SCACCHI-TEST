import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  movePiece,
  otherAction,
  selectPiece,
  selectAvailableMoves,
} from "../store/chessboardSlice";

const ChessGame = () => {
  const selectedPiece = useSelector((state) => state.chessboard.selectedPiece);
  const availableMoves = useSelector(
    (state) => state.chessboard.availableMoves,
  );

  const selectedSquare = useSelector(
    (state) => state.chessboard.selectedSquare,
  );
  const dispatch = useDispatch();

  const handleMove = (toPosition) => {
    dispatch(movePiece({ fromPosition: selectedSquare, toPosition }));
  };

  const handleSomeAction = () => {
    dispatch(otherAction());
  };

  // Esempio di logica di selezione di una pedina
  const handlePieceSelection = (position) => {
    dispatch(selectPiece(position));
  };

  // Esempio di logica per ottenere le mosse disponibili per la pedina selezionata
  const handleAvailableMoves = (position) => {
    dispatch(selectAvailableMoves(position));
  };

  // Altre logiche di gioco, come gestire le regole di movimento delle pedine, il rilevamento degli scacchi, ecc.

  return (
    <div className="chess-game">
      <h1>Mini gioco di scacchi</h1>
      {/* Altri elementi e componenti del gioco */}
    </div>
  );
};

export default ChessGame;
