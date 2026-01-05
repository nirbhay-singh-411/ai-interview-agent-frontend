import { JobDescription } from "@/app/(protected)/job-description/page";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AppState = {
    resumeData: Object | null;
    jobDescriptions: JobDescription[]
};

const initialState: AppState = {
    resumeData: null,
    jobDescriptions: []
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        updateResumeData: (state, action: any) => {
            state.resumeData = action.payload;
        },
        updateJobDescriptions: (state, action: PayloadAction<JobDescription[]>) => {
            state.jobDescriptions = [...action.payload];
        }
    },
});

export const { updateResumeData, updateJobDescriptions } = appSlice.actions;
export default appSlice.reducer;
