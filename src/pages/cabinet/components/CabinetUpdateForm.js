import React, { useState } from 'react'
import { Modal, Input, InputNumber, Checkbox, Form } from 'antd';

export const CabinetUpdateForm = ({
        cabinet,
        handleCancel,
        handleUpdate,
        children,
    }) => {
    const [form] = Form.useForm()
    const [visible, setVisible] = useState(false)
    
    const handleOk = async () => {
        const values = await form.validateFields()
        handleUpdate({...cabinet, ...values})
        setVisible(false)
    }

    const onCancel = () => {
        form.resetFields()
        setVisible(false)
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
            { cabinet &&
                <Form form={form}
                    initialValues={{...cabinet}}
                >
                    <Form.Item label="name" name="name" rules={[{required: true, message: "Please input name"}]} >
                        <Input placeholder="name" />
                    </Form.Item>
                    <Form.Item label="location" name="location" rules={[{required: true, message: "Please input location"}]} >
                        <Input placeholder="location" />
                    </Form.Item>
                    <Form.Item label="type" name="type" rules={[{required: true, message: "Please input type"}]} >
                        <InputNumber min={0}/>
                    </Form.Item>
                    <Form.Item label="cabinetnumber" name="cabinetnumber" rules={[{required: true, message: "Please input cabinetnumber"}]} >
                        <Input />
                    </Form.Item>
                    <Form.Item label="cabinetlocationNumber" name="cabinetlocationNumber" rules={[{required: true, message: "Please input cabinetlocationnumber"}]} >
                        <Input placeholder="cabinetlocationNumber"/>
                    </Form.Item>
                    <Form.Item label="doornumber" name="doornumber" rules={[{required: true, message: "Please input doornumber"}]} >
                        <InputNumber min={0}/>
                    </Form.Item>
                    <Form.Item label="screenboardno" name="screenboardno" rules={[{required: true, message: "Please input screenboardno"}]} >
                        <InputNumber min={0}/>
                    </Form.Item>
                    <Form.Item label="active" name="active" rules={[{required: true, message: "Please input active"}]} valuePropName="checked">
                        <Checkbox />
                    </Form.Item>
                </Form>
            }
            </Modal>
        </div>
    )
}