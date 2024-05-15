import React, { useEffect } from "react";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { mesaageMethod } from '../Redux/MessageSlice'
import { bodyColorMethod } from '../Redux/BodyColorSlice'
import { conversationHistoryMethod } from '../Redux/conversationHistory'
import swal from 'sweetalert'
const ChatHeader = () => {

    let message = useSelector((state) => state.message.message);
    let bodyColor = useSelector((state) => state.bodyColor.bodyColor)
    const dispatch = useDispatch();
    useEffect(() => {
        if (bodyColor === '') {
            dispatch(bodyColorMethod.ChangebodyColor({ 'bodyColor': 'Light', 'color': '#DADEDF' }))
        }
        else if (bodyColor === "Dark") {
            dispatch(bodyColorMethod.ChangebodyColor({ 'bodyColor': 'Dark', 'color': '#8C8D8E' }))
        }
        else {
            dispatch(bodyColorMethod.ChangebodyColor({ 'bodyColor': 'Light', 'color': '#DADEDF' }))
        }
    }, [])

    function giveBodyColor() {
        if (bodyColor === '') {
            dispatch(bodyColorMethod.ChangebodyColor({ 'bodyColor': 'Light', 'color': '#8C8D8E' }))
        }
        else if (bodyColor === "Dark") {
            dispatch(bodyColorMethod.ChangebodyColor({ 'bodyColor': 'Light', 'color': '#DADEDF' }))
        }
        else {
            dispatch(bodyColorMethod.ChangebodyColor({ 'bodyColor': 'Dark', 'color': '#8C8D8E' }))
        }
    }

    function clear() {
        if (message.length <= 1) return
        else {
            swal({
                title: "Are you sure to delete?",
                // icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        dispatch(mesaageMethod.Remove_Message())
                        dispatch(conversationHistoryMethod.Remove_Message())
                    }
                });
        }
    }
    return (
        <>
            <h3 className="card-title">ChatBot</h3>
            <div className="card-tools">
                {bodyColor === "Dark" ? <MdOutlineLightMode style={{cursor:"pointer"}} className="mr-2" size={'20px'} onClick={() => giveBodyColor()} /> : <MdDarkMode style={{cursor:"pointer"}}  className="mr-2" size={'20px'} onClick={() => giveBodyColor()} />}
                <span data-toggle="tooltip" className="badge badge-light mx-2">{message?.length}</span>
                <span data-toggle="tooltip" title="clear message" className="badge badge-light" style={{ cursor: 'pointer' }} onClick={clear}>clear mess</span>
                <button type="button" className="btn btn-tool" data-card-widget="remove"><i className="fas fa-times"></i>
                </button>
            </div>
        </>
    )
}

export default ChatHeader