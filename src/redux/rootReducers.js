import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./reducers";

export default combineReducers({
    users: userReducer
})