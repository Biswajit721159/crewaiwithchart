import { createSlice } from "@reduxjs/toolkit";

function TakeColor() {
    let color = localStorage.getItem('bodyColor');
    if (color === null) {
        localStorage.setItem('bodyColor', JSON.stringify(''))
        return ''
    }
    else {
        return JSON.parse(localStorage.getItem('bodyColor'))
    }
}

const bodyColorSlice = createSlice({
    name: "bodyColorStore",
    initialState: {
        bodyColor: TakeColor(),
        color: ''
    },
    reducers: {
        ChangebodyColor: (state, action) => {
            if (action.payload == null) return state;
            else {
                state.bodyColor = action.payload.bodyColor
                state.color = action.payload.color
                localStorage.setItem('bodyColor', JSON.stringify(state.bodyColor))
                return state
            }
        },
    },
});



export const bodyColorMethod = bodyColorSlice.actions;
const bodyColorReducer = bodyColorSlice.reducer;
export default bodyColorReducer;