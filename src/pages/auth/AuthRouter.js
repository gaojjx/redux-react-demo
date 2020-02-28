import React from 'react'
import { Route, Redirect } from 'react-router-dom'
const AuthRouter = ({component: Component, ...rest}) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    return (
        <Route
            {...rest}
            render={props => (
                isAuthenticated
                ? <Component {...props} />
                : <Redirect to="/login" />
            )}
        />
    )
}

export default AuthRouter