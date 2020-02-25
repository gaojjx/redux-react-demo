import { FETCH_RECORD_REQUEST, FETCH_RECORD_SUCCESS, UPDATE_RECORD_REQUEST, UPDATE_RECORD_RESULT, ADD_RECORD_REQUEST, ADD_RECORD_RESULT, OPEN_BOX_REQUEST, OPEN_BOX_RESULT, DELETE_RECORD_RESULT } from "./recordTypes"

const initialState = {
    records: [],
    loading: false,
    adding: false,
    deleting: false,
}

const recordReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RECORD_REQUEST:
            return {
                loading: true,
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
        default:
            return state
    }
}

export default recordReducer