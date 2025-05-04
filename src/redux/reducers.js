import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
    users: []
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchUsersStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchUsersSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.users = action.payload;
        },
        fetchUsersError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersError } = userSlice.actions;
export const userReducer = userSlice.reducer;
export default userSlice.reducer;
