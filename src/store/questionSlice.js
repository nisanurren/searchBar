import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Service from '../service'


export const askQuestionToChatBot = createAsyncThunk(
    'question/askQuestionToChatBot',
    async (question, { getState, rejectWithValue }) => {
        const chatHistory = getState().question.chatHistory;
        try {
            const response = await Service.askQuestion(question, chatHistory);
            return { question, answer: response.data.answer };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


const initialStateQuestion = {
    chatHistory: [],
    latestResponse: '',
    status: '',
    error: null,
}

const questionSlice = createSlice({
    name: 'question',
    initialState: initialStateQuestion,
    reducers: {
        setQuestion: (state, action) => {
            state.chatHistory.push({ role: 'user', content: action.payload })
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(askQuestionToChatBot.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(askQuestionToChatBot.fulfilled, (state, action) => {
                //When request is successfully set reponse to state
                state.status = 'succeeded';
                state.chatHistory.push({ role: 'user', content: action.payload.question })
                state.chatHistory.push({ role: 'assistant', content: action.payload.answer })
                state.latestResponse = action.payload.answer
            })
            .addCase(askQuestionToChatBot.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});


export const { setQuestion } = questionSlice.actions;
export default questionSlice.reducer;