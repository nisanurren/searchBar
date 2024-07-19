import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice'; // Example slice, create your own slice file

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
});
