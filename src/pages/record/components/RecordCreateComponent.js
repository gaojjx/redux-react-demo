import React, { useState } from 'react'
import { Modal, Input, Form, message, Alert } from 'antd';
import { connect } from 'react-redux';
import { addRecord, addRecordRequest } from '../../../redux/record/recordAction';

const RecordCreateComponent = ({children, addRecordRequest, addRecord, addSuccess, addFail}) => {
    const [form] = Form.useForm()
    const [visible, setVisible] = useState(false)
    const handleSubmit = async () => {
        const values = await form.validateFields()
        addRecord(values)
    }

    const onCancel = () => {
        addRecordRequest()
        setVisible(false)
        form.resetFields()
    }
    
    return (
        <div>
            <span onClick={() => setVisible(true)}>{children}</span>
            <Modal title="Add Record" visible={visible} onCancel={onCancel} onOk={handleSubmit}>
                <Form form={form} onFinish={() => handleSubmit}>
                    <Form.Item label="PersonNumber" name="personnumber" rules={[{required: true}]}>
                        <Input placeholder="PersonNumber" />
                    </Form.Item>
                    <Form.Item label="boxId" name="boxid" rules={[{required: true}]}>
                        <Input placeholder="BoxId" />
                    </Form.Item>
                </Form>
                {addSuccess && <div>{message.success('Add record success') }</div> }
                {addFail && <Alert type="warning" message={addFail} /> }
            </Modal>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        addSuccess: state.record.addSuccess,
        addFail: state.record.addFail,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addRecordRequest: () => dispatch(addRecordRequest()),
        addRecord: record => dispatch(addRecord(record))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordCreateComponent)