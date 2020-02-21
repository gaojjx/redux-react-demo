import React from 'react'
import { Form, Input, Button, Row, Col} from 'antd'

const UserSearchFormComponent = ({handleSearch, form}) => {
    const { getFieldDecorator } = form

    const onSearch = e => {
        e.preventDefault();
    }
    return (
        <Form>
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item label="number">
                        {getFieldDecorator('number', {
                            rules: [{required: true, message: 'Please Input number'}]
                        })(<Input type="number" />)}
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label="name">
                        <Input placeholder="name"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row style={{textAlign: 'right'}}>
                <Form.Item>
                    <Button type="primary" onClick={onSearch}>Search</Button>
                </Form.Item>
            </Row>
        </Form>
        
    )
}

export const UserSearchForm = Form.create({name: 'user_search_form'})(UserSearchFormComponent)