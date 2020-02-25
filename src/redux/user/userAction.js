import {FETCH_USERS_FAIL, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USER_DETAIL_SUCCESS, FETCH_USER_BULK_RECOVERY_RESULT, FETCH_USER_BULK_RECOVERY} from './userTypes'

const uri = '/user'
const token = localStorage.getItem('token')
export const fetchUsers = (params) => {
    const query = Object.entries(params)
        .filter(([key, value]) => value !== undefined && value !== '')
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
    return (dispatch) => {
        dispatch(fetchUserRequest())
        fetch(`${uri}/get?${query}`, {
            headers: {
                'Authorization': token
            }
        })
            .then(res => res.json())
            .then(data => JSON.parse(data))
            .then(data => data.Data)
            .then(users => {
                dispatch(fetchUserSuccess(users))
            }).catch(err => {
                dispatch(fetchUserFail(err.message))
        })
    }
}

export const fetchUserSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
};

export const fetchUserFail = (error) => {
    return {
        type: FETCH_USERS_FAIL,
        payload: error
    }
}

export const fetchUserRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

export const fetchUserDetail = id => {
    return(dispatch) => {
        fetch(`${uri}/details?id=${id}`, {
            headers: {
                'Authorization': token
            }
            })
            .then(res => res.json())
            .then(data => {
                dispatch(fetchUserDetailSucess(data))
        })
    }
}

export const fetchUserDetailSucess = user => {
    return {
        type: FETCH_USER_DETAIL_SUCCESS,
        payload: user
    }
}

export const bulkRecovery = ids => {
    return (dispatch) => {
        dispatch(deleting())
        fetch(`${uri}/recovery`, {
            method: 'PUT',
            body: JSON.stringify({userids: [...ids]}),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': token
            }
        }).then(res => res.json())
        .then(data => JSON.parse(data))
        .then(result => {
            dispatch(bulkRecoveryResult(result.Success))
        })
    }
}

export const deleting = () => {
    return {
        type: FETCH_USER_BULK_RECOVERY
    }
}

export const bulkRecoveryResult = result => {
    return {
        type: FETCH_USER_BULK_RECOVERY_RESULT,
        payload: result
    }
}