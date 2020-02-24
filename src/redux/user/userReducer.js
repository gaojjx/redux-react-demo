import {FETCH_USERS_FAIL, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USER_DETAIL, FETCH_USER_DETAIL_SUCCESS, FETCH_USER_BULK_RECOVERY, FETCH_USER_BULK_RECOVERY_RESULT} from "./userTypes";

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
            return {
                error: '',
                users: action.payload
            }
        case FETCH_USERS_FAIL:
            return {
                error: action.payload,
                users: []
            }
        case FETCH_USER_DETAIL:
            return {
                ...state,
            }
        case FETCH_USER_DETAIL_SUCCESS:
            return {
                ...state,
                userDetail: action.payload
            }
        case FETCH_USER_BULK_RECOVERY:
            return {
                ...state,
            }
        case FETCH_USER_BULK_RECOVERY_RESULT:
            console.log(action)
            return {
                ...state,
                bulkRecoveryResult: action.payload
            }
        default:
            return state
    }
}

export default userReducer
