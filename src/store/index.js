import { configureStore } from "@reduxjs/toolkit";
import previousChatsReducer from "./previousChatSlice";
import userReducer from "./userSlice";
import questionReducer from "./questionSlice";

export const store = configureStore({
    reducer: {
        previousChats: previousChatsReducer,
        user: userReducer,
        question: questionReducer,
    },
});
