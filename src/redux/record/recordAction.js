import { FETCH_RECORD_REQUEST, FETCH_RECORD_SUCCESS, DELETE_RECORD_RESULT, DELETE_RECORD_DONE, ENDUSINGBOX_RESULT, ENDUSINGBOX_DONE, OPEN_BOX_SUCCESS, OPEN_BOX_FAIL, ADD_RECORD_SUCCESS, ADD_RECORD_FAIL, ADD_RECORD_REQUEST } from "./recordTypes"

const URI = '/record'

export const fetchRecords = query => {
    const token = localStorage.getItem('token')
    const params = Object.entries(query)
        .filter(([key, value]) => value !== undefined && value !== false && value !== '')
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
    return dispatch => {
        dispatch(fetchRecordsRequest())
        fetch(`${URI}/get?${params}`, {
            headers: {
                Authorization: token
            }
        }).then(res => res.json())
        .then(data => {
            const result = JSON.parse(data)
            dispatch(fetchRecordsSuccess(result.Data))
        })
    }
}

export const fetchRecordsRequest = () => {
    return {
        type: FETCH_RECORD_REQUEST
    }
}

export const fetchRecordsSuccess = records => {
    return {
        type: FETCH_RECORD_SUCCESS,
        payload: records,
    }
}

export const addRecordRequest = () => {
    return dispatch => {
        dispatch({type: ADD_RECORD_REQUEST})
    }
}

export const addRecord = record => {
    const token = localStorage.getItem('token')
    return dispatch => {
        fetch(`${URI}/post`, {
            method: 'POST',
            body: JSON.stringify(record),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': token,
            }
        }).then(res => res.json())
        .then(data => {
            // dispatch(addRecordResult(data))
            if (data.Success) {
                dispatch({type: ADD_RECORD_SUCCESS})
            } else {
                dispatch({
                    type: ADD_RECORD_FAIL,
                    payload: data.Errors[0]
                })
            }
        })
    }
}

export const openBox = model => {
    const token = localStorage.getItem('token')
    return dispatch => {
        fetch(
            `${URI}/open`,
            {
                method: 'POST',
                body: JSON.stringify(model),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': token
                }
            }
        ).then(res => res.json())
        .then(data => {
            const result = JSON.parse(data)
            if (result.Success) {
                dispatch({
                    type: OPEN_BOX_SUCCESS,
                })
            } else {
                dispatch({
                    type: OPEN_BOX_FAIL,
                    payload: result.Data
                })
            }
        })
    }
}

export const deleteRecord = recordidlist => {
    const token = localStorage.getItem('token')
    return dispatch => {
        fetch(`${URI}/bulkDetele`,
            {
                method: 'PUT',
                body: JSON.stringify({recordidlist: [...recordidlist]}),
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
        ).then(res => res.json())
        .then(data => {
            dispatch(deleteRecordResult(JSON.parse(data)))
            dispatch(deleteRecordDone())
        })
    }
}

export const deleteRecordResult = result => {
    return {
        type: DELETE_RECORD_RESULT,
        payload: result
    }
}

export const deleteRecordDone = () => {
    return {
        type: DELETE_RECORD_DONE,
    }
}

export const endUsingBox = recordid => {
    const token = localStorage.getItem('token')
    return dispatch => {
        fetch(`${URI}/endusingbox`, {
            body: JSON.stringify({recordid}),
            method: 'PUT',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(res => res.json())
        .then(data => {
            dispatch(endUsingBoxResult(JSON.parse(data)))
            dispatch(endUsingBoxDone())
        })
    }
}

export const endUsingBoxResult = result => {
    return {
        type: ENDUSINGBOX_RESULT,
        payload: result,
    }
}

export const endUsingBoxDone = () => {
    return {
        type: ENDUSINGBOX_DONE
    }
}