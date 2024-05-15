import { configureStore } from "@reduxjs/toolkit";
import messageReducer from '../Redux/MessageSlice'
import bodyColorReducer from '../Redux/BodyColorSlice'
import conversationHistoryReducer from '../Redux/conversationHistory'
import UniversalLoaderReducer from '../Redux/UniversalLoader'
export default configureStore({

  reducer: {
    message: messageReducer,
    bodyColor: bodyColorReducer,
    conversationHistory: conversationHistoryReducer,
    UniversalLoader: UniversalLoaderReducer
  },


});