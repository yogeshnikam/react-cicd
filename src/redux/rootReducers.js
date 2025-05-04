import { combineReducers } from "redux";
import { userReducer } from "./reducers";

export default combineReducers({
    users: userReducer
})