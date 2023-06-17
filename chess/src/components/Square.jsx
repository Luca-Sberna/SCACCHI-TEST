import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSquare } from "../store/chessboardSlice";

const Square = ({ position }) => {
  const selectedSquare = useSelector(
    (state) => state.chessboard.selectedSquare,
  );
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(selectSquare(position));
  };

  const isSelected = selectedSquare === position;
  const backgroundColor = isSelected
    ? "yellow"
    : position % 2 === 0
    ? "white"
    : "black";

  return (
    <div className="square" style={{ backgroundColor }} onClick={handleClick} />
  );
};
export default Square;
