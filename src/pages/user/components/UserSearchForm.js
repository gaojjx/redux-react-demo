import React from 'react'
import { Input, Button, Row, Col, Checkbox, InputNumber, Form } from 'antd';
import './UserSearchForm.css'

export const UserSearchForm = ({handleSearch, bulkDelete, showBulk}) => {
    const [form] = Form.useForm();

    const onSearch = async e => {
        e.preventDefault();
        const values = await form.validateFields()
        handleSearch(values)
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
        <Form form={form} className="ant-advanced-search-form" initialValues={{type: 0, active: true}}>
            <Row gutter={24}>
                <Col span={6}>
                    <Form.Item label="number" name="number">
                        <InputNumber min={0} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label="name" name="name">
                        <Input placeholder="name" />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="type" name="type" validateStatus={checkType}>
                       <InputNumber value="0" type="number" min={0}/>
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label="active" name="active" valuePropName="checked">
                        <Checkbox/>
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