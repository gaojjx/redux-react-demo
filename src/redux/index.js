import userReducer from "./user/userReducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import { cabinetReducer } from "./cabinet/cabinetReducer";
import { loginReducer } from "./login/loginReducer";
import { recordReducer } from "./record/recordReducer";
import { connectRouter, routerMiddleware } from 'connected-react-router'
import history from "../utils/history";

const rootReducer = history => combineReducers({
    user: userReducer,
    record: recordReducer,
    cabinet: cabinetReducer,
    login: loginReducer,
    router: connectRouter(history)
});



const store = createStore(rootReducer(history), composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk)));

export default store
