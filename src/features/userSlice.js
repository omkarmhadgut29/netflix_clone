import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
        getDocId: (state, action) => {
            state.user["docId"] = action.payload;
        },
    },
});

export const { login, logout, getDocId } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
