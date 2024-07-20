import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import userReducer from "./userSlice";
import questionReducer from "./questionSlice";
import chatHistoryReducer from "./chatHistorySlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer,
        question: questionReducer,
        chatHistory: chatHistoryReducer,
    },
});
