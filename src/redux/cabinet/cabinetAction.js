import { FETCH_CABINET_SUCCESS, GET_CABINET_DETAIL, FETCH_CABINET_FAIL, DELETE_CABINET_RESULT, DELETE_CABINET_DONE, UPDATE_CABINET_RESULT, UPDATE_CABINET_DONE, ACTIVE_CABINET_STATUS_RESULT, ACTIVE_CABINET_STATUS_DONE} from './cabinetTypes'
const URI = '/cabinet'
export const fetchCabinets = query => {
    const token = localStorage.getItem('token')
    const params = Object.entries(query)
        .filter(([key, value]) => value !== undefined && value !== '')
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
    return dispatch => {
        fetch(`${URI}/get?${params}`, {
            headers: {
                Authorization: token,
            }
        }).then(res => res.json())
        .then(data => {
            const result = JSON.parse(data)
            if (result.Success) {
                dispatch(fetchCabinetSuccess(result.Data))
            } else {
                dispatch(fetchCabinetFail(result.Data))
            }
        })
    }
}

const fetchCabinetSuccess = data => {
    return {
        type: FETCH_CABINET_SUCCESS,
        payload: data
    }
}

const fetchCabinetFail = err => {
    return {
        type: FETCH_CABINET_FAIL,
        payload: err
    }
}

export const getCabinetDetail = id => {
    const token = localStorage.getItem('token')
    return dispatch => {
        fetch(`${URI}/details?id=${id}`, {
            headers: {
                Authorization: token
            }
        }).then(res => res.json())
        .then(data => {
            dispatch(getCabinetDetailSuccess(JSON.parse(data).Data))
        })
    }
}

const getCabinetDetailSuccess = cabinet => {
    return {
        type: GET_CABINET_DETAIL,
        payload: cabinet
    }
}

export const deleteCabinet = id => {
    const token = localStorage.getItem('token')
    return dispatch => {
        fetch(`${URI}/delete?id=${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        }).then(res => res.json())
        .then(data => {
            dispatch(deleteCabinetResult(data))
            dispatch({type: DELETE_CABINET_DONE})
        })
    }
}

const deleteCabinetResult = result => {
    return {
        type: DELETE_CABINET_RESULT,
        payload: result
    }
}

export const toUpdateCabinet = cabinet => {
    return {
        type: UPDATE_CABINET_DONE,
        payload: cabinet
    }
}

export const updateCabinet = cabinet => {
    const token = localStorage.getItem('token')
    return dispatch => {
        fetch(`${URI}/put`, {
            method: 'PUT',
            body: JSON.stringify(cabinet),
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(res => res.json())
        .then(data => {
            dispatch({
                type: UPDATE_CABINET_RESULT,
                payload: JSON.parse(data)
            })
            dispatch({type: UPDATE_CABINET_DONE})
        })
    }
}

export const bulkActive = ids => {
    const token = localStorage.getItem('token')
    const body = {
        cabinetids: [...ids],
        active: true
    }
    return dispatch => {
        fetch(`${URI}/BulkActiveStatus`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(res => res.json())
        .then(data => {
            dispatch(bulkActiveResult(JSON.parse(data)))
        })
    }
}

export const bulkUnActive = ids => {
    const token = localStorage.getItem('token')
    const body = {
        cabinetids: [...ids],
        active: false,
    }
    return dispatch => {
        fetch(`${URI}/BulkActiveStatus`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(res => res.json())
        .then(data => {
            dispatch(bulkActiveResult(JSON.parse(data)))
            dispatch(bulkActiveDone())
        })
    }
}

const bulkActiveResult = result => {
    return {
        type: ACTIVE_CABINET_STATUS_RESULT,
        payload: result,
    }
}

const bulkActiveDone = () => {
    return {
        type: ACTIVE_CABINET_STATUS_DONE,
    }
}

