import React from 'react'
import { Form, Row, Col, Button, Input, InputNumber, DatePicker, Checkbox } from 'antd'
import './CabinetSearchForm.css'

const CabinetSearchForm = ({form, handleSearch, handleAdd, handleBulkActive, handleBulkUnActive, showBulkBtn}) => {
    const { getFieldDecorator } = form
    const handleClickSearch = () => {
        form.validateFields((err, values) => {
            if (!err) {
                handleSearch(values)
            }
        })
    }
    
    return (
        <div>
            <Form className="ant-advanced-search-form">
                <Row gutter={24}>
                    <Col span={6}>
                        <Form.Item label="name">
                            { getFieldDecorator('name')(<Input placeholder="name" />) }
                        </Form.Item>
                    </Col>
                    <Col span={6} >
                        <Form.Item label="location">
                            { getFieldDecorator('location')(<Input placeholder="location" />) }
                        </Form.Item>
                    </Col>
                    <Col span={6} >
                        <Form.Item label="boardnumber">
                            { getFieldDecorator('boardnumber')(<Input />) }
                        </Form.Item>
                    </Col>
                    <Col span={6} >
                        <Form.Item label="type" labelCol={{span: 14}} wrapperCol={{span: 2}}>
                            { getFieldDecorator('type', {
                                initialValue: 0,
                                message: "cannot less zero"
                            })(<InputNumber min={0} />)}
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item label="CreatedStartTime">
                            { getFieldDecorator('createdstarttime')(<DatePicker />) }
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item label="CreatedEndTime">
                            { getFieldDecorator('createdendtime')(<DatePicker />) }
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="active">
                            { getFieldDecorator('active', {
                                valuePropName: 'checked',
                                initialValue: false
                            })(<Checkbox />)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        {showBulkBtn? 
                            <span>
                                <Button onClick={handleBulkActive}>Active</Button>
                                &emsp;
                                <Button onClick={handleBulkUnActive}>UnActive</Button>            
                            </span>
                            : null}
                        &emsp;
                        <Button type="primary" onClick={handleAdd}>Add</Button>
                    </Col>
                    <Col style={{textAlign: "right"}} span={12}>
                        <Button onClick={handleClickSearch} type="primary">Search</Button>
                        &emsp;
                        <Button onClick={() => form.resetFields()}>Clear</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default Form.create({name: 'cabinet_search_form'})(CabinetSearchForm)
