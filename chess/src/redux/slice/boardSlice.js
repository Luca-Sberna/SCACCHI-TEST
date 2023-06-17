// boardSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Funzione per creare una scacchiera vuota
function createInitialBoard() {
    const board = Array(8)
        .fill(null)
        .map(() => Array(8).fill(null));
    // Posizionamento delle pedine bianche
    board[0][0] = "♜"; // Torre
    board[0][1] = "♞"; // Cavallo
    board[0][2] = "♝"; // Alfiere
    board[0][3] = "♛"; // Regina
    board[0][4] = "♚"; // Re
    board[0][5] = "♝"; // Alfiere
    board[0][6] = "♞"; // Cavallo
    board[0][7] = "♜"; // Torre
    for (let col = 0; col < 8; col++) {
        board[1][col] = "♟"; // Pedone
    }
    // Posizionamento delle pedine nere
    board[7][0] = "♖"; // Torre
    board[7][1] = "♘"; // Cavallo
    board[7][2] = "♗"; // Alfiere
    board[7][3] = "♕"; // Regina
    board[7][4] = "♔"; // Re
    board[7][5] = "♗"; // Alfiere
    board[7][6] = "♘"; // Cavallo
    board[7][7] = "♖"; // Torre
    for (let col = 0; col < 8; col++) {
        board[6][col] = "♙"; // Pedone
    }
    return board;
}

const initialState = {
    board: createInitialBoard(),
};

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        movePiece: (state, action) => {
            // Implementa qui la logica per il movimento delle pedine
            // Aggiorna lo stato della scacchiera nel modo appropriato
            return {
                ...state,
                board: action.payload.updatedBoard,
            };
        },
    },
});

export const { movePiece } = boardSlice.actions;
export default boardSlice.reducer;
