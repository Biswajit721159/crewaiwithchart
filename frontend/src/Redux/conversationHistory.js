import { createSlice } from "@reduxjs/toolkit";

function getConversationHistory() {
    let conversationHistory = localStorage.getItem('conversationHistory')
    if (conversationHistory == null) {
        localStorage.setItem('conversationHistory', JSON.stringify([]))
        return []
    } else {
        return JSON.parse(conversationHistory)
    }
}

function clearConversationHistory() {
    localStorage.removeItem('conversationHistory');
    localStorage.setItem('conversationHistory', JSON.stringify([]))
    return []
}

const conversationHistorySlice = createSlice({
    name: "conversationHistoryStore",
    initialState: {
        conversationHistory: getConversationHistory() == null ? [] : getConversationHistory(),
    },
    reducers: {
        Add_conversationHistory: (state, action) => {
            if (action.payload == null) return state;
            else {
                state.conversationHistory.push(action.payload)
                localStorage.setItem('conversationHistory', JSON.stringify(state.conversationHistory))
                return state
            }
        },
        Remove_Message: (state, action) => {
            state.conversationHistory = clearConversationHistory()
            return state;
        }
    },
});



export const conversationHistoryMethod = conversationHistorySlice.actions;
const conversationHistoryReducer = conversationHistorySlice.reducer;
export default conversationHistoryReducer;