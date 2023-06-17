import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSquare, movePiece } from "../redux/ChessboardSlice";

const Chessboard = () => {
  const chessboardState = useSelector((state) => state.chessboard);
  const dispatch = useDispatch();

  const handleSquareClick = (position) => {
    const { selectedSquare } = chessboardState;

    if (selectedSquare === null) {
      // Seleziona la pedina
      dispatch(selectSquare(position));
    } else {
      // Effettua la mossa
      dispatch(
        movePiece({ fromPosition: selectedSquare, toPosition: position }),
      );
    }
  };

  const renderChessboard = () => {
    const { pieces } = chessboardState;
    const squares = [];

    for (let row = 8; row >= 1; row--) {
      for (let col = 1; col <= 8; col++) {
        const position = `${String.fromCharCode(96 + col)}${row}`;
        const piece = pieces[position];

        squares.push(
          <div
            key={position}
            className={`square ${isSquareSelected(position) ? "selected" : ""}`}
            onClick={() => handleSquareClick(position)}
          >
            {piece && <img src={piece.image} alt={piece.type} />}
          </div>,
        );
      }
    }

    return squares;
  };

  const isSquareSelected = (position) => {
    return position === chessboardState.selectedSquare;
  };

  return <div className="chessboard">{renderChessboard()}</div>;
};

export default Chessboard;
