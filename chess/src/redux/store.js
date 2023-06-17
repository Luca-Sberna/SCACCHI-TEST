import { configureStore } from '@reduxjs/toolkit';
import chessboardReducer from '../redux/ChessboardSlice';

const store = configureStore({
    reducer: {
        chessboard: chessboardReducer,
        // Aggiungi altri riduttori se necessario
    },
});

export default store;
