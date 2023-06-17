import { createSlice } from '@reduxjs/toolkit';
import { isKingInCheck, canMove, findKingPosition, isCheckmate } from './chessUtils';

const chessboardSlice = createSlice({
    name: 'chessboard',
    initialState: {
        selectedSquare: null,
        pieces: {
            // Stato iniziale delle pedine sulla scacchiera
        },

        currentPlayer: 'bianco', // Aggiungi la variabile currentPlayer
        isCheck: false,
        isGameOver: false,
        isGameStarted: false,
    },

    reducers: {
        selectSquare: (state, action) => {
            state.selectedSquare = action.payload;
        }, startGame: (state) => {
            state.isGameStarted = true;
        },
        movePiece: (state, action) => {
            const { fromPosition, toPosition } = action.payload;
            const pieceToMove = state.pieces[fromPosition];

            // Controlla la validità della mossa per la pedina selezionata
            if (canMove(pieceToMove, fromPosition, toPosition, state.pieces, state.currentPlayer)) {
                // Effettua la mossa
                const pieceAtDestination = state.pieces[toPosition];

                if (pieceAtDestination && pieceAtDestination.player !== state.currentPlayer) {
                    // La pedina alla posizione di destinazione è di un giocatore avversario, viene mangiata
                    delete state.pieces[toPosition];
                }

                // Effettua la mossa
                state.pieces[toPosition] = pieceToMove;
                delete state.pieces[fromPosition];

                // Verifica se il re è sotto scacco dopo la mossa
                state.isCheck = isKingInCheck(state, state.currentPlayer);

                // Verifica se il re è sotto scacco matto
                if (state.isCheck) {
                    const isMate = isCheckmate(state, state.currentPlayer);
                    if (isMate) {
                        // Il re è sotto scacco matto
                        state.isGameOver = true; // Imposta la variabile isGameOver a true per indicare la fine del gioco
                    }
                }
            }
        },


        changePlayer: (state) => {
            state.currentPlayer = state.currentPlayer === 'bianco' ? 'nero' : 'bianco';
            state.isCheck = false; // Reimposta la variabile isCheck
        },

        startGame: (state) => {
            state.isGameStarted = true;
        },
        setPromotionSquare: (state, action) => {
            state.promotionSquare = action.payload;
        },
        promotePawn: (state, action) => {
            const { square, piece } = action.payload;
            state.pieces[square] = piece;
        },
        endGame: (state) => {
            state.isGameOver = true;
        },
    },
});





export const { selectSquare, movePiece } = chessboardSlice.actions;
export default chessboardSlice.reducer;
