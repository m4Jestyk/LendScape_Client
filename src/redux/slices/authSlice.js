import { createSlice } from "@reduxjs/toolkit";

const getUserFromLocal = () => {
    const user = localStorage.getItem('auth');
    return user ? JSON.parse(user) : null;
};

const initialState = getUserFromLocal() || {
    id: null,
    email: "",
    username: ""
};

console.log("Initial State:", initialState);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action) {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.username = action.payload.username;
        },
        clearUser(state) {
            state.id = null;
            state.email = "";
            state.username = "";
        }
    }
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
