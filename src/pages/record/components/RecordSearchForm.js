import React from 'react'
import { Form, Row, Col, Input, Checkbox, Button, InputNumber, DatePicker } from 'antd'
import './RecordSearchForm.css'
const {Item} = Form
const RecordSearchComponent = ({form, handleSearch, handleClickAdd}) => {
    const { getFieldDecorator } = form
    const checkNumber = (rule, value, callback) => {
        if (value >= 0) {
            return callback()
        }
        callback('cannot less zero')
    }
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
                        <Item label="StudentNumber">
                            { getFieldDecorator('studentnumber')(<Input/>)}
                        </Item>
                    </Col>
                    <Col span={6} >
                        <Item label="CabinetNumber">
                            { getFieldDecorator('cabinetnumber')(<Input />)}
                        </Item>
                    </Col>
                    <Col span={4} offset={2}>
                        <Item label="history">
                            { getFieldDecorator('history', {
                                valuePropName: 'checked',
                                initialValue: false
                            })(<Checkbox />) }
                        </Item>
                    </Col>
                    <Col span={6}>
                        <Item label="type">
                            { getFieldDecorator('type', {
                                initialValue: 0,
                                rules: [{validator: checkNumber}]
                            })(<InputNumber min={0}/>) }
                        </Item>
                    </Col>
                </Row>
                <Row span={24}>
                    <Col span={8}>
                        <Item label="StartedTime">
                            {getFieldDecorator('startedtime')(<DatePicker />)}
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item label="EndedTime">
                            {getFieldDecorator('endedtime')(<DatePicker />)}
                        </Item>
                    </Col>
                </Row>
                <Row span={24}>
                    <Col span={8}>
                        <Button type="primary" onClick={handleClickAdd}>Add</Button>
                    </Col>
                    <Col span={16} style={{textAlign: 'right'}}>
                        <Button type="primary" onClick={handleClickSearch}>Search</Button>
                        &emsp;
                        <Button onClick={() => form.resetFields()}>Clear</Button>
                    </Col>
                </Row>
            </Form>            
        </div>
    )
}

export const RecordSearchForm = Form.create({name: 'record_search_form'})(RecordSearchComponent)
