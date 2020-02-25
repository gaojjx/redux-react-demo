import {FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USER_DETAIL, FETCH_USER_DETAIL_SUCCESS, FETCH_USER_BULK_RECOVERY, FETCH_USER_BULK_RECOVERY_RESULT} from "./userTypes";

const initState = {
    users: [],
    userDetail: {},
    recovery: false,
    bulkRecoveryResult: false
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
                users: action.payload
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
            console.log(action)
            return {
                ...state,
            }
        case FETCH_USER_BULK_RECOVERY_RESULT:
            console.log(state)
            return {
                ...state,
                recovery: true,
                bulkRecoveryResult: action.payload
            }
        default:
            return state
    }
}

export default userReducer
