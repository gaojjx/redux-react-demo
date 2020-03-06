import React from 'react'
import { connect } from 'react-redux'
import { login } from '../../redux/login/loginAction'
import { LockOutlined, UserOutlined } from '@ant-design/icons/lib/index';
import { Input, Button, Alert, Spin, Form } from 'antd';
import './Login.css'
import { withRouter } from 'react-router-dom'

const LoginComponent = ({
    login,
    loggingIn,
    error,
}) => {
    const onFinish = values => {
        login({...values})
    }
    return (
        <div className="normal">
            <Form onFinish={onFinish} className="login-form">
                <Form.Item name="username" rules={[{required: true, message: "Please input your username!"}]}>
                    <Input prefix={<UserOutlined />} placeholder="Username"/>
                </Form.Item>
                <Form.Item name="password" rules={[{required: true, message: "Please input your password!"}]}>
                    <Input prefix={<LockOutlined />} placeholder="Password" type="password" />
                </Form.Item>
                <Form.Item>
                    <Spin spinning={loggingIn !== undefined && loggingIn}>
                        <Button type="primary" className="login-form-button" htmlType="submit">
                            Log in
                        </Button>
                    </Spin>
                </Form.Item>
            </Form>
            { error && <Alert type="warning" closable message={error} /> }
        </div>
    );
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

// export const Login = Form.create({name: 'login_form'})(withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginComponent)))
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginComponent))
