import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Service from '../service';

export const getChatHistory = createAsyncThunk(
    'chatHistory/getChatHistory',
    async ({ source, startEpoch, endEpoch }, { rejectWithValue }) => {
        try {
            const response = await Service.chatHistory({ source, startEpoch, endEpoch });
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialStateHistory = {
    chatHistory: [],
    status: '',
    error: null,
};

const chatHistorySlice = createSlice({
    name: 'chatHistory',
    initialState: initialStateHistory,
    reducers: {

        setChatHistory: (state, action) => {

            let updatedConversations = action.payload.map((conversation) => {

                conversation.messageHistory.push({ role: 'user', content: conversation.question });
                conversation.messageHistory.push({ role: 'assistant', content: conversation.answer });


                return conversation;
            });
            state.chatHistory = updatedConversations


        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChatHistory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getChatHistory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                let updatedConversations = action.payload.map((conversation) => {

                    conversation.messageHistory.push({ role: 'user', content: conversation.question });
                    conversation.messageHistory.push({ role: 'assistant', content: conversation.answer });


                    return conversation;
                });
                state.chatHistory = updatedConversations
            })
            .addCase(getChatHistory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { setChatHistory } = chatHistorySlice.actions;
export default chatHistorySlice.reducer;
