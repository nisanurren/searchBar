// previousChatSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    conversations: []
};

const previousChatsSlice = createSlice({
    name: 'previousChats',
    initialState,
    reducers: {
        setChats(state, action) {
            state.conversations = action.payload;
        }
    }
});

export const { setChats } = previousChatsSlice.actions;
export default previousChatsSlice.reducer;
