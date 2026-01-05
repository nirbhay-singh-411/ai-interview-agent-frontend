import { createSlice } from "@reduxjs/toolkit";

type AppState = {
    resumeData: Object | null;
};

const initialState: AppState = {
    resumeData: null,
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        updateResumeData: (state, action: any) => {
            console.log("Payload -> ", action.payload);

            state.value = action.payload;
        }
    },
});

export const { updateResumeData } = appSlice.actions;
export default appSlice.reducer;
