import { createSlice } from "@reduxjs/toolkit";

function todayDate() {
    const currentDate = new Date();
    const day = ('0' + currentDate.getDate()).slice(-2);
    const hours = ('0' + currentDate.getHours()).slice(-2);
    const minutes = ('0' + currentDate.getMinutes()).slice(-2);
    const seconds = ('0' + currentDate.getSeconds()).slice(-2);
    const monthNames = ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const currentDateTime = `${day} ${monthNames[currentDate.getMonth()]} ${hours}:${minutes}:${seconds}`;
    return currentDateTime
}

function getMessage() {
    let message = localStorage.getItem('message')
    if (message == null) {
        let createNewMessage = [
            {
                "role": 'assistant',
                "content": { "Normal": "How can I help you today?" },
                'time': todayDate()
            }
        ]
        localStorage.setItem('message', JSON.stringify(createNewMessage))
        return createNewMessage
    } else {
        return JSON.parse(message)
    }
}

function clearMessage() {
    localStorage.removeItem('message');
    let createNewMessage = [
        {
            "role": 'assistant',
            "content": { "Normal": "How can I help you today?" },
            'time': todayDate()
        }
    ]
    localStorage.setItem('message', JSON.stringify(createNewMessage))
    return createNewMessage
}

const messageSlice = createSlice({
    name: "messageStore",
    initialState: {
        message: getMessage(),
    },
    reducers: {
        Add_Message: (state, action) => {
            if (action.payload == null) return state;
            else {
                action.payload.time = todayDate()
                state.message.push(action.payload)
                localStorage.setItem('message', JSON.stringify(state.message))
                return state
            }
        },
        Remove_Message: (state, action) => {
            state.message = clearMessage()
            return state;
        }
    },
});



export const mesaageMethod = messageSlice.actions;
const messageReducer = messageSlice.reducer;
export default messageReducer;