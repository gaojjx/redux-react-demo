import {FETCH_USERS_FAIL, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS} from "./userTypes";

const initState = {
    users: [],
    error: '',
    loading: false
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
    console.log(action)
            return {
                error: '',
                users: action.payload
            }
        case FETCH_USERS_FAIL:
            return {
                error: action.payload,
                users: []
            }
        default:
            return state
    }
}

export default userReducer
