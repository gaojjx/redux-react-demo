import React from 'react'
import { Layout } from 'antd'
import { routes } from '../../router/routes'
import { Route, Redirect, withRouter, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
const { Content } = Layout

const MainContent = ({userInfo, history, ...rest}) => {
    return (
        <Content style={{padding: '15px'}}>
            <Switch>
                {routes.map(route => <Route render={() => <route.component />} key={route.path} path={route.path}/>)}
                <Redirect from="/" exact to="/home" />
                {/* <Redirect to="404" /> */}
            </Switch>
        </Content>            
    )
}

const mapStateToProps = state => ({ userInfo: state.userInfo });
export default withRouter(connect(mapStateToProps)(MainContent));