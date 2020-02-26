import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { fetchRecords, addRecord, openBox, deleteRecord, endUsingBox } from '../../redux/record/recordAction'
import { Table, Popconfirm, Button, Spin, message, Divider } from 'antd';
import { RecordCreateModal } from './components/RecordCreateComponent';
import { RecordSearchForm } from './components/RecordSearchForm';
import { RecordOpenForm } from './components/RecordOpenForm';

const initialParam = {
    type: 0
}

export const RecordContainer = ({
        loading,
        records,
        fetchRecord,
        adding,
        addResult,
        addRecord,
        openBoxResult,
        openBox,
        deleteRecord,
        deleteRecordResult,
        endUsingBox,
        endUsingBoxResult,
    }) => {
    useEffect(() => fetchRecord(initialParam), []);
    const [params, setParams] = useState(initialParam)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showOpenModal, setShowOpenModal] = useState(false)
    const [openRecord, setOpenRecord] = useState({})
    const [selectedIds, setSelectedIds] = useState([])
    const [showBulkDelete, setShowBulkDelete] = useState(false)
    if (adding) {
        if (addResult.Success) {
            message.success('add record success')
            setShowAddModal(false)
            fetchRecord(params)
        } else {
            message.warn(addResult.Errors[0])
        }
    }

    const handleClickOpen = record => {
        setOpenRecord(record)
        setShowOpenModal(true)
    }

    const handleOpen = values => {
        openBox(values)
    }
    
    const handleRecordAdd = record => {
        addRecord(record)
    }

    const handleSearch = values => {
        setParams(values)
        fetchRecord(values)
    }

    const handleDelete = id => {
        deleteRecord(id)
    }

    if (deleteRecordResult) {
        if (deleteRecordResult.Success) {
            fetchRecord(params)
            message.success('delete success') 
        } else {
            message.warn(deleteRecordResult.Data)
        }
    }

    const handleBulkDelete = () => {
        deleteRecord(selectedIds)
    }

    const rowSelection = {
        onChange: rowSelectedKeys => {
            setSelectedIds(rowSelectedKeys)
            if (!showBulkDelete && rowSelectedKeys.length > 0) {
                setShowBulkDelete(true)
            }
            if (rowSelectedKeys.length === 0) {
                setShowBulkDelete(false)
            }
        }
    }

    const handleEndUsingBox = recordid => {
        endUsingBox(recordid)
    }

    if (endUsingBoxResult) {
        if (endUsingBoxResult.Success) {
            message.success('endUsingBox success')
        } else {
            message.warn(`endUsingBox fail: ${endUsingBoxResult.Errors[0]}`)
        }
    }

    const columns = [
        {
            title: 'PersonNumber',
            dataIndex: 'personnumber',
            key: 'personnumber'
        },
        {
            title: 'PersonName',
            dataIndex: 'personname',
            key: 'personname'
        },
        {
            title: 'CabinetNumber',
            dataIndex: 'cabinetnumber',
            key: 'cabinetnumber',
        },
        {
            title: 'CabinetName',
            dataIndex: 'cabinetname',
            key: 'cabinetname',
        },
        {
            title: 'BoxNumber',
            dataIndex: 'boxnumber',
            key: 'boxnumber',
        },
        {
            title: 'StartedTime',
            dataIndex: 'startedtime',
            key: 'startedtime',
        },
        {
            title: 'EndTime',
            dataIndex: 'endtime',
            key: 'endtime',
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            fixed: 'right',
            render: (text, record) => {
                return (
                    <div>
                        <Popconfirm title="Are you sure to DELETE this record?" onConfirm={() => handleDelete(text)}>
                            <Button type="danger">DELETE</Button>
                        </Popconfirm>
                        <Divider type="vertical" />
                        <Button type="primary" onClick={() => handleClickOpen(record)}>OPEN</Button>
                        <Divider type="vertical" />
                        <Button onClick={() => handleEndUsingBox(text)}>EndUsingBox</Button>
                    </div>
                )
            }
        }
    ]
    return (
        <div>
            <RecordOpenForm 
                handleOpen={handleOpen} 
                visible={showOpenModal} 
                record={openRecord} 
                handleCancel={() => setShowOpenModal(false)}
                result={openBoxResult}
                />
            <RecordSearchForm 
                handleClickAdd={() => setShowAddModal(true)} 
                handleSearch={handleSearch}
                handleBulkDelete={handleBulkDelete}
                bulkDeleteVisible={showBulkDelete}
                />
            <RecordCreateModal visible={showAddModal} handleCancel={() => setShowAddModal(false)} handleRecordAdd={handleRecordAdd} />
            {loading ? <Spin type="large" /> : null}
            <Table dataSource={records} rowKey="id" scroll={{x: 1300}} columns={columns} rowSelection={rowSelection}/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.record.loading,
        records: state.record.records,
        adding: state.record.adding,
        addResult: state.record.addResult,
        openBoxResult: state.record.openBoxResult,
        deleteRecordResult: state.record.deleteRecordResult,
        endUsingBoxResult: state.record.endUsingBoxResult,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchRecord: query => dispatch(fetchRecords(query)),
        addRecord: (record) => dispatch(addRecord(record)),
        openBox: model => dispatch(openBox(model)),
        deleteRecord: ids => dispatch(deleteRecord(ids)),
        endUsingBox: recordid => dispatch(endUsingBox(recordid)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordContainer)
