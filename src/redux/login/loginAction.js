import { LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST } from "./loginTypes"
import { Auth } from "../../pages/auth/Auth"
import { push } from "connected-react-router"


export const login = ({username, password}) => async (dispatch) => {
    dispatch({
        type: LOGIN_REQUEST,
        payload: {username}
    })
    fetch('/authUserLogin/AdminLogin', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify({username, password})
    }).then(res => res.json())
    .then(data => {
        const result = JSON.parse(data)
        if (result.Success) {
            Auth.authenticate(result.Data)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: true
            })
            dispatch(push('/user'))
        } else {
            dispatch({
                type: LOGIN_FAIL,
                payload: result.Errors[0]
            })
        }
    })
    
}