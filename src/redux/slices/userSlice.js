import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null, // User object
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            const { user, role, username ,token , _id } = action.payload;
            state.user = {
                _id,
                email,
                token,
                role,
                username,
                isAuthenticated: true,
            };
        },
        clearUser(state) {
            state.user = null;
        },
    }
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
