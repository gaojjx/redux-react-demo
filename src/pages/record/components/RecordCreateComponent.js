import React, { useState } from 'react'
import { Modal, Form, Input } from 'antd'

const RecordCreateComponent = ({form, visible, children, handleCancel, handleRecordAdd}) => {

    const { getFieldDecorator } = form
    const handleSubmit = () => {
        form.validateFields((err, values) => {
            if (!err) {
                handleRecordAdd(values)
                form.resetFields()
            }
        })
    }

    const onCancel = () => {
        handleCancel()
        form.resetFields()
    }
    
    return (
        <div>
            <Modal title="Add Record" visible={visible} onCancel={onCancel} onOk={handleSubmit}>
                <Form onSubmit={() => handleSubmit}>
                    <Form.Item label="PersonNumber">
                        {getFieldDecorator('personnumber', {
                            rules: [
                                {
                                    required: true
                                }
                            ]
                        })(<Input placeholder="PersonNumber" />)}
                    </Form.Item>
                    <Form.Item label="boxId">
                        {getFieldDecorator('boxid',{
                            rules: [{required: true}]
                        })(<Input placeholder="BoxId" />)}
                    </Form.Item>
                </Form>
                
            </Modal>
            
        </div>
    )
}

export const RecordCreateModal = Form.create({name: 'record_creat_form'})(RecordCreateComponent)