import { FETCH_RECORD_REQUEST, FETCH_RECORD_SUCCESS, UPDATE_RECORD_REQUEST, UPDATE_RECORD_RESULT, ADD_RECORD_REQUEST, ADD_RECORD_RESULT, OPEN_BOX_RESULT, DELETE_RECORD_RESULT, DELETE_RECORD_DONE, ENDUSINGBOX_RESULT, ENDUSINGBOX_DONE } from "./recordTypes"

const initialState = {
    records: [],
    loading: false,
    adding: false,
    deleting: false,
    deleteRecordResult: undefined,
    endUsingBoxResult: undefined,
}

export const recordReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RECORD_REQUEST:
            return {
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
            }
        case ADD_RECORD_RESULT:
            return {
                ...state,
                adding: true,
                addResult: action.payload
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
        case OPEN_BOX_RESULT:
            return {
                ...state,
                openBoxResult: action.payload,
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
