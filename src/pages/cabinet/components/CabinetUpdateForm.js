import React, { useState } from 'react'
import { Modal, Form, Input, InputNumber, Checkbox, } from 'antd'

const CabinetUpdateForm = ({
        form,
        cabinet,
        handleCancel,
        handleUpdate,
        children,
    }) => {
    const { getFieldDecorator } = form
    const [visible, setVisible] = useState(false)
    const handleOk = () => {
        form.validateFields((err, values) => {
            if (!err) {
                handleUpdate({...cabinet, ...values})
            }
        })
        setVisible(false)
    }
    const onCancel = () => {
        form.resetFields()
        setVisible(false)
        handleCancel()
    }

    return (
        <div>
            <span onClick={() => setVisible(true)}>{children}</span>
        <Modal 
            title="Update Cabinet"
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
        >
            { cabinet ?
            <Form>
                <Form.Item label="name">
                    { getFieldDecorator('name', {
                        initialValue: cabinet.name,
                        rules: [
                            {
                                required: true,
                                message: 'Please input name'
                            }
                        ]
                    })(<Input placeholder="name" />)}
                </Form.Item>
                <Form.Item label="location">
                    {getFieldDecorator('location', {
                        initialValue: cabinet.location,
                        rules: [
                            {
                                required: true,
                                message: 'Please input location'
                            }
                        ]
                    })(<Input placeholder="location" />)}
                </Form.Item>
                <Form.Item label="type">
                    {getFieldDecorator('type', {
                        initialValue: cabinet.type,
                        rules: [
                            {
                                required: true,
                                message: 'Please input type'
                            }
                        ]
                    })(<InputNumber min={0}/>)}
                </Form.Item>
                <Form.Item label="cabinetnumber">
                    {getFieldDecorator('cabinetnumber', {
                        initialValue: cabinet.cabinetnumber,
                        rules: [
                            {
                                required: true,
                                message: 'Please input cabinetnumber'
                            }
                        ]
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="cabinetlocationnumber">
                    {getFieldDecorator('cabinetlocationnumber', {
                        initialValue: cabinet.cabinetlocationnumber,
                        rules: [
                            {
                                required: true,
                                message: 'Please input cabinetlocationnumber'
                            }
                        ]
                    })(<Input placeholder="cabinetlocationnumber"/>)}
                </Form.Item>
                <Form.Item label="doornumber">
                    {getFieldDecorator('doornumber', {
                        initialValue: cabinet.doornumber,
                        rules: [
                            {
                                required: true,
                                message: 'Please input doornumber'
                            }
                        ]
                    })(<InputNumber min={0}/>)}
                </Form.Item>
                <Form.Item label="screenboardno">
                    {getFieldDecorator('screenboardno', {
                        initialValue: cabinet.screenboardno,
                        rules: [
                            {
                                required: true,
                                message: 'Please input screenboardno'
                            }
                        ]
                    })(<InputNumber min={0}/>)}
                </Form.Item>
                <Form.Item label="active">
                    {getFieldDecorator('active', {
                        initialValue: cabinet.active,
                        valuePropName: 'checked',
                    })(<Checkbox />)}
                </Form.Item>
            </Form>
            : null }
        </Modal>
        </div>
    )
}

export const CabinetUpdateFormModal = Form.create({name: 'cabinet_update_form'})(CabinetUpdateForm)