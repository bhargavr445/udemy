import { createSlice } from "@reduxjs/toolkit";

const appInitialState = { userName: '' }

const appStoreSlice = createSlice({
    name: 'appSLice',
    initialState: appInitialState,
    reducers: {
        updateUserName(state, action) {
            state.userName = action.payload;
        },
    }
})

export const appStoreActions = appStoreSlice.actions;
export default appStoreSlice.reducer;