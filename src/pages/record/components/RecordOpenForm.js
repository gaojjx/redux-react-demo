import React from 'react'
import { Form, Modal, Input, InputNumber, message } from 'antd'

const RecordOpenComponent = ({form, record, handleOpen, visible, handleCancel, result}) => {
    const handleSubmit = () => {
        form.validateFields((err, values) => {
            if (!err) {
                handleOpen(values)
            }
        })
    }

    const onCancel = () => {
        handleCancel()
        form.resetFields()
    }
    
    if (result !== undefined) {
        result.Success ? message.success('open success') : message.warn(result.Data)
    } 
    return (
        <Modal title="OPEN Box" visible={visible} onOk={handleSubmit} onCancel={onCancel}>
            <Form onSubmit={handleSubmit}>
                <Form.Item label="CabinetNumber">
                    {form.getFieldDecorator('caibnetnumber', {
                        initialValue: record.cabinetnumber
                    })(<Input readOnly/>)}
                </Form.Item>
                <Form.Item label="PersonNumber">
                    {form.getFieldDecorator('personnumber', {
                        initialValue: record.personnumber
                    })(<Input readOnly/>)}
                </Form.Item>
                <Form.Item label="Action">
                    {form.getFieldDecorator('action', {
                        initialValue: 0,
                        message: 'Action number is required'
                    })(<InputNumber min={0} />)}
                </Form.Item>
            </Form>
        </Modal>
    )
}

export const RecordOpenForm = Form.create({name: 'record_open_form'})(RecordOpenComponent)
