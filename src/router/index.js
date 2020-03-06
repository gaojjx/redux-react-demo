import React from 'react'
import { Router, Switch, Route } from "react-router-dom"
import LoginComponent from '../pages/auth/LoginComponent'
import AuthRouter from '../pages/auth/AuthRouter'
import MainLayout from '../pages/layout/MainLayout'
import history from '../utils/history'

const Routers = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route component={LoginComponent} exact path="/login" />
                <AuthRouter component={MainLayout} path="/" />
            </Switch>
        </Router>
    )
}

export default Routers