import React from 'react'
import { Form, Input, Button, Row, Col, Checkbox} from 'antd'
import './UserSearchForm.css'

const UserSearchFormComponent = ({handleSearch, form, bulkDelete, showBulk}) => {
    const { getFieldDecorator } = form
    const onSearch = e => {
        e.preventDefault();
        form.validateFields((err, value) => {
            if (!err) {
                handleSearch(value)
            }
        })
    }

    const clear = () => {
        form.resetFields()
    }

    const checkType = (rule, value, callback) => {
        if (value >= 0) {
            return callback()
        }
        callback('Price must greater than zero!');
    }

    return (
        <Form className="ant-advanced-search-form">
            <Row gutter={24}>
                <Col span={4}>
                    <Form.Item label="number">
                        {getFieldDecorator('number')(<Input type="number" />)}
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label="name">
                        {getFieldDecorator('name')(<Input placeholder="name" />)}
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="type">
                        {getFieldDecorator('type', {
                            initialValue: 0,
                            rules: [
                                {validator: checkType}
                            ]
                        })(<Input type="number"/>)}
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label="active">
                        {getFieldDecorator('active', {
                            valuePropName: 'checked',
                            initialValue: true
                        })(<Checkbox />)}
                    </Form.Item>
                </Col>
            </Row>
            <Row style={{textAlign: 'right'}}>
                {showBulk ? (<Button type="danger" onClick={bulkDelete}>Delete</Button>) : null}
                &emsp;
                <Button type="primary" onClick={onSearch}>Search</Button>
                &emsp;
                <Button onClick={clear}>Clear</Button>
            </Row>
        </Form>
        
    )
}

export const UserSearchForm = Form.create({name: 'user_search_form'})(UserSearchFormComponent)