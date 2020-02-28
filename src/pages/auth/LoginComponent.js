import React from 'react'
import { connect } from 'react-redux'
import { login } from '../../redux/login/loginAction'
import { Form, Input, Icon, Button, Alert, Spin } from 'antd'
import './Login.css'
import { withRouter } from 'react-router-dom'

const LoginComponent = ({
    form, 
    login,
    loggingIn,
    error,
}) => {
    const { getFieldDecorator } = form
    const handleSubmit = e => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                login({...values})
            }
        })
    }
    return (
        <div className="normal">
            <Form 
                onSubmit={handleSubmit} 
                className="login-form" 
            // style={{maxWidth: '300px',}}
            >
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {
                        loggingIn
                            ? (<Spin tip="LoggingIn...">
                                <Button type="primary" htmlType="submit">Log in</Button>
                                </Spin>)
                            : <Button type="primary" htmlType="submit">Log in</Button>
                    }
                </Form.Item>
            </Form>
            { error && <Alert type="warning" closable message={error} /> }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loggingIn: state.login.loggingIn,
        error: state.login.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (username, password) => dispatch(login(username, password)),
    }
}

export const Login = Form.create({name: 'login_form'})(withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginComponent)))
