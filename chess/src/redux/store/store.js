// store.js
import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../slice/boardSlice';

const store = configureStore({
    reducer: {
        board: boardReducer,
    },
});

export default store;
