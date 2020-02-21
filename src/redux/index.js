import userReducer from "./user/userReducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store
