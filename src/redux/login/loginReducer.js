import { LOGIN_FAIL, LOGIN_SUCCESS, LOGIN_REQUEST } from "./loginTypes"


export const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loggingIn: true,
            }
        case LOGIN_SUCCESS:
            return {
                loggingIn: false,
                success: action.payload
            }
        case LOGIN_FAIL:
            return {
                loggingIn: false,
                error: action.payload
            }
        default: return state
    }
}