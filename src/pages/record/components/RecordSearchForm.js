import React from 'react'
import { Form, Row, Col, Input, Checkbox, Button, InputNumber, DatePicker } from 'antd';
import './RecordSearchForm.css'
import RecordCreateComponent from './RecordCreateComponent';
const {Item} = Form
export const RecordSearchForm = ({handleSearch, handleClickAdd, handleBulkDelete, bulkDeleteVisible}) => {
    const [form] = Form.useForm()
    const handleClickSearch = async () => {
        const values = await form.validateFields()
        handleSearch(values)
    }
    return (
        <div>
            <Form form={form} className="ant-advanced-search-form" initialValues={{history: true, type: 0}}>
                <Row gutter={24}>
                    <Col span={6}>
                        <Item label="StudentNumber" name="StudentNumber" >
                            <Input/>
                        </Item>
                    </Col>
                    <Col span={6} >
                        <Item label="CabinetNumber" name="CabinetNumber" >
                            <Input />
                        </Item>
                    </Col>
                    <Col span={4} offset={2}>
                        <Item label="history" name="history" valuePropName="checked" >
                           <Checkbox />
                        </Item>
                    </Col>
                    <Col span={6}>
                        <Item label="type" name="type">
                           <InputNumber min={0}/>
                        </Item>
                    </Col>
                </Row>
                <Row span={24}>
                    <Col span={8}>
                        <Item label="StartedTime" name="StartedTime" >
                            <DatePicker />
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item label="EndedTime" name="EndedTime" >
                            <DatePicker />
                        </Item>
                    </Col>
                </Row>
                <Row span={24}>
                    <Col span={8}>
                        {bulkDeleteVisible ? <Button type="danger" onClick={handleBulkDelete}>Delete</Button> : null}
                        &emsp;
                        <RecordCreateComponent>
                            <Button type="primary" onClick={handleClickAdd}>Add</Button>
                        </RecordCreateComponent>
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
