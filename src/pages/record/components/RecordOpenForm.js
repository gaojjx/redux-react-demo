import React from 'react'
import { Modal, Input, InputNumber, Form, Alert } from 'antd';
import { connect } from 'react-redux';

const RecordOpenForm = ({record, handleOpen, visible, handleCancel, openBoxSuccess, openBoxFail}) => {
    const [form] = Form.useForm()
    const handleSubmit = async () => {
        const values = await form.validateFields()
        handleOpen({...values, id: record.id})
    }

    const onCancel = () => {
        handleCancel()
        form.resetFields()
    }
    
    return (
        <Modal title="OPEN Box" visible={visible} onOk={handleSubmit} onCancel={onCancel}>
            <Form onSubmit={handleSubmit} form={form} initialValues={{...record}}>
                <Form.Item label="CabinetNumber" name="cabinetnumber" >
                    <Input readOnly/>
                </Form.Item>
                <Form.Item label="PersonNumber" name="personnumber">
                    <Input readOnly/>
                </Form.Item>
                <Form.Item label="Action" name="action" rules={[{required: true, message: "Action number is required!"}]}>
                    <InputNumber min={0} />
                </Form.Item>
            </Form>
            { openBoxSuccess && <Alert type="success" message='open success' /> }
            { openBoxFail && <Alert type="warning" message={openBoxFail}/>}
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        openBoxSuccess: state.record.openBoxSuccess,
        openBoxFail: state.record.openBoxFail,
    }
}

export default connect(mapStateToProps)(RecordOpenForm)