import { FETCH_RECORD_REQUEST, FETCH_RECORD_SUCCESS, ADD_RECORD_RESULT, OPEN_BOX_RESULT, DELETE_RECORD_RESULT } from "./recordTypes"

const URI = '/record'

export const fetchRecords = query => {
    const token = localStorage.getItem('token')
    const params = Object.entries(query)
        .filter(([key, value]) => value !== undefined && value !== '')
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
            dispatch(addRecordResult(data))
        })
    }
}

export const addRecordResult = result => {
    console.log(result)
    return {
        type: ADD_RECORD_RESULT,
        payload: result
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
            dispatch(openBoxResult(JSON.parse(data)))
        })
    }
}

export const openBoxResult = result => {
    return {
        type: OPEN_BOX_RESULT,
        payload: result
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
        })
    }
}

export const deleteRecordResult = result => {
    return {
        type: DELETE_RECORD_RESULT,
        payload: result
    }
}