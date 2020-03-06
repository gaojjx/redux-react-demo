import React from 'react'
import { Row, Col, Button, Input, InputNumber, DatePicker, Checkbox, Form } from 'antd';
import './CabinetSearchForm.css'

export const CabinetSearchForm = ({handleSearch, handleAdd, handleBulkActive, handleBulkUnActive, showBulkBtn}) => {
    const [form] = Form.useForm()
    const handleClickSearch = async () => {
        const values = await form.validateFields()
        handleSearch(values)
    }
    
    return (
        <div>
            <Form form={form} className="ant-advanced-search-form" initialValues={{type: 0, active: false}}>
                <Row gutter={24}>
                    <Col span={6}>
                        <Form.Item label="name" name="name" >
                            <Input placeholder="name" />
                        </Form.Item>
                    </Col>
                    <Col span={6} >
                        <Form.Item label="location" name="location" >
                            <Input placeholder="location" />
                        </Form.Item>
                    </Col>
                    <Col span={6} >
                        <Form.Item label="boardnumber" name="boardnumber" >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6} >
                        <Form.Item label="type" name="type"  labelCol={{span: 14}} wrapperCol={{span: 2}}>
                            <InputNumber min={0} />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item label="CreatedStartTime" name="createdstarttime" >
                            <DatePicker />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item label="CreatedEndTime" name="createdendtime" >
                            <DatePicker />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="active" name="active" valuePropName="checked">
                            <Checkbox />
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
