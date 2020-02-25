import userReducer from "./user/userReducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk'
import recordReducer from "./record/recordReducer";

const rootReducer = combineReducers({
    user: userReducer,
    record: recordReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store
