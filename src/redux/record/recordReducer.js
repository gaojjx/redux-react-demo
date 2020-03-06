import { FETCH_RECORD_REQUEST, FETCH_RECORD_SUCCESS, UPDATE_RECORD_REQUEST, UPDATE_RECORD_RESULT, ADD_RECORD_REQUEST, DELETE_RECORD_RESULT, DELETE_RECORD_DONE, ENDUSINGBOX_RESULT, ENDUSINGBOX_DONE, OPEN_BOX_SUCCESS, OPEN_BOX_FAIL, ADD_RECORD_SUCCESS, ADD_RECORD_FAIL, OPEN_BOX_REQUEST } from "./recordTypes"

const initialState = {
    records: [],
    loading: false,
    addSuccess: false,
    addFail: undefined,
    deleting: false,
    deleteRecordResult: undefined,
    endUsingBoxResult: undefined,
}

export const recordReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RECORD_REQUEST:
            return {
                ...state,
                loading: true,
                adding: false,
                deleteRecordResult: undefined,
            }
        case FETCH_RECORD_SUCCESS: 
            return {
                ...state,
                loading: false,
                records: action.payload
            }
        case ADD_RECORD_REQUEST:
            return {
                ...state,
                addSuccess: false,
                addFail: undefined,
            }
        case ADD_RECORD_SUCCESS:
            return {
                ...state,
                addSuccess: true,
                addFail: undefined,
            }
        case ADD_RECORD_FAIL:
            return {
                ...state,
                addSuccess: false,
                addFail: action.payload,
            }
        case UPDATE_RECORD_REQUEST:
            return {
                ...state,
            }
        case UPDATE_RECORD_RESULT:
            return {
                ...state,
                updating: true,
                updateResult: action.payload,
            }
        case OPEN_BOX_REQUEST:
            return {
                ...state,
                openBoxSuccess: false,
                openBoxFail: undefined,
            }
        case OPEN_BOX_SUCCESS:
            return {
                ...state,
                openBoxSuccess: true,
            }
        case OPEN_BOX_FAIL:
            return {
                ...state,
                openBoxFail: action.payload
            }
        case DELETE_RECORD_RESULT:
            return {
                ...state,
                deleteRecordResult: action.payload,
            }
        case DELETE_RECORD_DONE:
            return {
                ...state,
                deleteRecordResult: undefined
            }
        case ENDUSINGBOX_RESULT:
            return {
                ...state,
                endUsingBoxResult: action.payload
            }
        case ENDUSINGBOX_DONE:
            return {
                ...state,
                endUsingBoxResult: undefined
            }
        default:
            return state
    }
}
