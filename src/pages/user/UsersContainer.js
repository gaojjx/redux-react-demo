import React, {useEffect} from 'react';
import {Table} from "antd";
import {connect} from "react-redux";
import {fetchUsers} from "../../redux/user/userAction";
import { UserSearchForm } from "./components/UserSearchForm"

const UsersContainer = ({usersData, fetchUsers}) => {
    useEffect(() => {
        fetchUsers()
    }, []);
    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'username',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: 'e-mail',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'phone',
            dataIndex: 'phone',
            key: 'phone',
        }
    ];
    return (
        <>
        <UserSearchForm />
        <Table columns={columns} dataSource={usersData} rowKey="id" />
        </>
    );
};

const mapStateToProps = state => {
    console.log(state.user)
    return {
        usersData: state.user.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () => dispatch(fetchUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
