import { createSlice } from "@reduxjs/toolkit";

const UniversalLoaderSlice = createSlice({
    name: "UniversalLoaderStore",
    initialState: {
        UniversalLoader: false
    },
    reducers: {
        ChangeUniversalLoaderColor: (state, action) => {
            state.UniversalLoader = !state.UniversalLoader
            return state
        },
    },
});



export const UniversalLoaderMethod = UniversalLoaderSlice.actions;
const UniversalLoaderReducer = UniversalLoaderSlice.reducer;
export default UniversalLoaderReducer;