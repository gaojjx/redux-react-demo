import { FETCH_CABINET_SUCCESS, ADD_CABINET_RESULT, ADD_CABINET_DONE, GET_CABINET_DETAIL, FETCH_CABINET_FAIL, DELETE_CABINET_RESULT, DELETE_CABINET_DONE, UPDATE_CABINET_RESULT, UPDATE_CABINET_DONE, ACTIVE_CABINET_STATUS_RESULT, ACTIVE_CABINET_STATUS_DONE, OPEN_ALL_BOXES_RESULT } from "./cabinetTypes"

const initialState = {
    cabinets: []
}
export const cabinetReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CABINET_SUCCESS:
            return {
                cabinets: action.payload
            }
        case FETCH_CABINET_FAIL:
            return {
                errorMessage: action.payload
            }
        case ADD_CABINET_RESULT:
            return {
                ...state,
                addCabinetResult: action.payload
            }
        case ADD_CABINET_DONE:
            return {
                ...state,
                addCabinetResult: undefined
            }
        case GET_CABINET_DETAIL:
            return {
                ...state,
                cabinetDetail: action.payload
            }
        case DELETE_CABINET_RESULT:
            return {
                ...state,
                deleteResult: action.payload
            }
        case DELETE_CABINET_DONE:
            return {
                ...state,
                deleteResult: undefined
            }
        case UPDATE_CABINET_RESULT:
            return {
                ...state,
                updateResult: action.payload
            }
        case UPDATE_CABINET_DONE:
            return {
                ...state,
                updateResult: undefined,
                cabinet: action.payload
            }
        case ACTIVE_CABINET_STATUS_RESULT:
            return {
                ...state,
                bulkResult: action.payload,
            }
        case ACTIVE_CABINET_STATUS_DONE:
            return {
                ...state,
                bulkResult: undefined,
            }
        case OPEN_ALL_BOXES_RESULT:
            return {
                ...state,
                openAllBoxesResult: action.payload,
            }
        default: return state
    }
}