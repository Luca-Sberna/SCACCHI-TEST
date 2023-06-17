import React from "react";
import Square from "./Square";

const Chessboard = () => {
  const renderSquare = (position) => {
    return <Square key={position} position={position} />;
  };

  const renderRow = (start) => {
    const row = [];
    for (let i = start; i < start + 8; i++) {
      row.push(renderSquare(i));
    }
    return row;
  };

  const renderBoard = () => {
    const board = [];
    for (let i = 0; i < 8; i++) {
      board.push(
        <div className="board-row" key={i}>
          {renderRow(i * 8)}
        </div>,
      );
    }
    return board;
  };

  return <div className="chessboard">{renderBoard()}</div>;
};

export default Chessboard;
