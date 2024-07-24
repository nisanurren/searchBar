import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    apiKey: localStorage.getItem('apiKey') || '',
    token: localStorage.getItem('token') || ''
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setApiKey: (state, action) => {
            state.apiKey = action.payload;
            localStorage.setItem('apiKey', action.payload);
        },

        setToken: (state, action) => {
            state.token = action.payload
            localStorage.setItem('token', action.payload);
        },
        clearToken: (state) => {
            state.token = ''
            localStorage.removeItem('token');
        },
    },
});


export const { setApiKey, clearToken, setToken } = userSlice.actions;
export default userSlice.reducer;