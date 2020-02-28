import React, {useEffect, useState} from 'react';
import {Table, Button, Popconfirm, message, Divider} from "antd";
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom'
import {fetchUsers, fetchUserDetail, bulkRecovery} from "../../redux/user/userAction";
import { UserSearchForm } from "./components/UserSearchForm"
import { UserDetailFormModal } from './components/UserDetailForm';
const initialParams = {
    name: '',
    number: undefined,
    type: 0,
    active: true
}
const UsersContainer = ({usersData, fetchUsers, fetchUserDetail, userDetail, bulkRecovery, recovery, bulkRecoveryResult}) => {
    const [selectedIds, setSelectedIds] = useState([])
    const [showBulk, setShowBulk] = useState(false)
    useEffect(() => {
        fetchUsers(initialParams)
    }, []);

    const handleSearch = value => {
        fetchUsers(value)
    }

    const rowSelection = {
        onChange: rowSelectedKeys => {
            setSelectedIds(rowSelectedKeys)
            if (rowSelectedKeys.length === 0) setShowBulk(false)
            if (!showBulk) setShowBulk(true)
        }
    }

    const handleBulkRecovery = () => {
        bulkRecovery(selectedIds)
    }
    if (recovery) {
        bulkRecoveryResult? message.success('Recovery Success') : message.warn('Recovery fail')
    }

    const handleRecovery = id => {
        bulkRecovery(id)
        // bulkRecoveryResult? message.success('Rcovery Success') : message.warn('Recovery fail')
    }

    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'number',
            dataIndex: 'number',
            key: 'number'
        },
        {
            title: 'createdTime',
            dataIndex: 'createdtime',
            key: 'createdtime'
        },
        {
            title: 'action',
            dataIndex: 'id',
            key: 'id',
            render: text => {
                return (
                    <>
                        <UserDetailFormModal userDetail={userDetail} userId={text} fetchUserDetail={fetchUserDetail}>
                            <Button type="primary">Detail</Button>
                        </UserDetailFormModal>
                        <Divider type="vertical"/>
                        <Popconfirm onConfirm={() => handleRecovery(text)} title="Are you sure RECOVERY this user?">
                            <Button type="danger">Recovery</Button>
                        </Popconfirm>
                    </>
                )
            }
        }
    ];
    return (
        <>
            <UserSearchForm handleSearch={handleSearch} showBulk={showBulk} bulkDelete={handleBulkRecovery} />
            <Table columns={columns} dataSource={usersData} rowSelection={rowSelection} rowKey="id" />
        </>
    );
};

const mapStateToProps = state => {
    return {
        usersData: state.user.users,
        userDetail: state.user.userDetail ? state.user.userDetail : {},
        bulkRecoveryResult: state.user.bulkRecoveryResult,
        recovery: state.user.recovery,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: (params = initialParams) => dispatch(fetchUsers(params)),
        fetchUserDetail: id => dispatch(fetchUserDetail(id)),
        bulkRecovery: ids => dispatch(bulkRecovery(ids))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersContainer));
