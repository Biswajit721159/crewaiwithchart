import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { mesaageMethod } from '../Redux/MessageSlice'
import { conversationHistoryMethod } from '../Redux/conversationHistory'
import { get_answer } from '../BackendConnection/CallChatGpt'
import { UniversalLoaderMethod } from '../Redux/UniversalLoader'
const Footer = () => {
    const dispatch = useDispatch();
    let color = useSelector((state) => state.bodyColor.color)
    let conversationHistory = useSelector((state) => state.conversationHistory.conversationHistory)

    const loader = useSelector((state) => state.UniversalLoader.UniversalLoader)
    const [input, setinput] = useState('')

    async function submit() {

        if (input.length === 0) return
        dispatch(UniversalLoaderMethod.ChangeUniversalLoaderColor())
        dispatch(mesaageMethod.Add_Message({ "role": "user", "content": input, 'time': '' }))
        dispatch(conversationHistoryMethod.Add_conversationHistory({ "role": "user", "content": input }))
        setinput('')

        const updatedConversationHistory = [...conversationHistory, { "role": "user", "content": input }];
        let data = await get_answer(dispatch, updatedConversationHistory)

        dispatch(mesaageMethod.Add_Message({ "role": "assistant", "content": data, 'time': '' }))
        dispatch(UniversalLoaderMethod.ChangeUniversalLoaderColor())
    }

    const handelEnter = async (e) => {
        if (loader === true) {
            return
        }
        if (e.key === 'Enter') {
            submit()
        }
    }


    return (
        <div className="input-group" style={{ backgroundColor: color, border: `1.5px solid white` }}>
            <input type="text" style={{ backgroundColor: color }} name="message" onChange={(e) => setinput(e.target.value)} value={input} autoComplete='off' onKeyDown={handelEnter} placeholder="Type Message ..." className="form-control" />
            <span className="input-group-append">
                <button type="button" onClick={submit} disabled={loader} className="btn btn-primary">Send</button>
            </span>
        </div>
    )
}
export default Footer