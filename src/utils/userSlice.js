import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        loggedIn: false,
    },
    reducers: {
        addUser: (state, action) =>{
              state.user =  action.payload;
              state.loggedIn = true;
        },
        removeUser: (state) => {
              state.user = null;
              state.loggedIn = false;
        }
    }
})
export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;