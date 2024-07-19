import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    apiKey: localStorage.getItem('apiKey') || ''
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setApiKey: (state, action) => {
            state.apiKey = action.payload;
            localStorage.setItem('apiKey', action.payload);
        },
        clearApiKey: (state) => {
            state.apiKey = '';
            localStorage.removeItem('apiKey');
        },
    },
});


export const { setApiKey, clearApiKey } = userSlice.actions;
export default userSlice.reducer;