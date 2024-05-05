import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

const initialState = {
    token: null as string | null,
};

const tokenSlice = createSlice({
    name: "accessToken",
    initialState,
    reducers: {
        setAccessToken(state, action: PayloadAction<string> ) {
            state.token = action.payload;
        },
        clearAccessToken(state, action: PayloadAction<string> ) {
            state.token = null;
        },
    },
});

export const { setAccessToken } = tokenSlice.actions;
export default tokenSlice.reducer;

// customize selector for easy component access
export const selectToken = (state: RootState) => state.accessToken.token;
// export const selectClearToken = (state: RootState) => state.clearAccess.token;

