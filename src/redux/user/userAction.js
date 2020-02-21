import {FETCH_USERS_FAIL, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS} from './userTypes'
export const fetchUsers = () => {
    return (dispatch) => {
        dispatch(fetchUserRequest())
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(users => {
                // console.log(users)
                dispatch(fetchUserSuccess(users))
            }).catch(err => {
                console.log(err)
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
