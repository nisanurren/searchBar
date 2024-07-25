import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Service from '../service'


export const askQuestionToChatBot = createAsyncThunk(
    'question/askQuestionToChatBot',
    async (question, { dispatch, getState, rejectWithValue }) => {
        const stream = getState().question.stream;
        const chatHistory = getState().question.chatHistory;
        dispatch(setQuestion(question));

        if (!stream) {
            try {
                const response = await Service.askQuestion(question, chatHistory);
                return { question, answer: response.data.answer };
            } catch (error) {
                return rejectWithValue(error.response.data);
            }
        } else {
            try {
                const contents = await Service.askQuestionStream(question, chatHistory, (content) => {
                    const chatHistoryBakalim = getState().question.chatHistory;
                    dispatch(appendToLatestAssistantResponse(content))

                });
                return { question, answer: contents };
            } catch (error) {
                return rejectWithValue(error);
            }
        }
    }
);


const initialStateQuestion = {
    chatHistory: [],
    latestResponse: '',
    status: '',
    error: null,
    stream: false
}

const questionSlice = createSlice({
    name: 'question',
    initialState: initialStateQuestion,
    reducers: {
        setQuestion: (state, action) => {
            state.chatHistory.push({ role: 'user', content: action.payload })
        },

        setCurrentConversation: (state, action) => {
            state.chatHistory = action.payload
        },

        appendToLatestAssistantResponse: (state, action) => {
            const lastResponse = state.chatHistory[state.chatHistory.length - 1];
            if (lastResponse && lastResponse.role === 'assistant') {
                lastResponse.content += action.payload;
            }
        },

        setStream: (state, action) => {
            state.stream = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(askQuestionToChatBot.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(askQuestionToChatBot.fulfilled, (state, action) => {
                //When request is successfully set reponse to state
                state.status = 'succeeded';
                state.chatHistory.push({ role: 'assistant', content: action.payload.answer })
                state.latestResponse = action.payload.answer
            })
            .addCase(askQuestionToChatBot.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});


export const { setQuestion, setCurrentConversation, appendToLatestAssistantResponse, setStream } = questionSlice.actions;
export default questionSlice.reducer;