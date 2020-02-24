import React, {useState} from 'react'
import { Form, Modal, } from 'antd'

const UserDetailForm = ({userDetail, children, userId, fetchUserDetail}) => {
    const [visible, setVisible] = useState(false)
    const items = Object.entries(userDetail)
        .map(([key, value]) => {
            return (
               <p key={key}><span>{key}: </span>{value}</p> 
            )
        })

        const show = () => {
            fetchUserDetail(userId)
            setVisible(true)
        }
    return (
        <div>
            <span onClick={() => show()}>{children}</span>
            <Modal title="User Detail" visible={visible} onCancel={() => setVisible(false)} onOk={() => setVisible(false)}>
                    {items}
            </Modal>
        </div>
    )
}

export const UserDetailFormModal = Form.create({name: 'user_detail_form'})(UserDetailForm)