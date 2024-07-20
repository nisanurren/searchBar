import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Service from '../service'


export const askQuestionToChatBot = createAsyncThunk(
    'question/askQuestionToChatBot',
    async (question, { rejectWithValue }) => {
        try {
            const response = await Service.askQuestion(question);
            return response.data.answer;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


const initialStateQuestion = {
    question: '',
    response: '',
    status: '',
    error: null,
}

const questionSlice = createSlice({
    name: 'question',
    initialState: initialStateQuestion,
    reducers: {
        setQuestion: (state, action) => {
            state.question = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(askQuestionToChatBot.pending, (state) => {
                //Waiting for response
                state.status = 'loading';
            })
            .addCase(askQuestionToChatBot.fulfilled, (state, action) => {
                //When request is successfully set reponse to state
                state.status = 'succeeded';
                state.response = action.payload;
            })
            .addCase(askQuestionToChatBot.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});


export const { setQuestion } = questionSlice.actions;
export default questionSlice.reducer;