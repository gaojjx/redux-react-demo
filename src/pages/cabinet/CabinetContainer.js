import { connect } from 'react-redux'

import React, { useState, useEffect } from 'react'
import { CabinetSearchForm } from './components/CabinetSearchForm'
import { fetchCabinets, getCabinetDetail, deleteCabinet, updateCabinet, bulkActive, bulkUnActive } from '../../redux/cabinet/cabinetAction'
import { Button, Table, Popconfirm, Divider, Alert } from 'antd'
import { Link } from 'react-router-dom'
import { CabinetUpdateForm } from './components/CabinetUpdateForm'


const initialParams = {
    type: 0,
}

const CabinetContainer = ({
        fetchCabinets,
        errorMessage,
        cabinets,
        getCabinetDetail,
        deleteCabinet,
        deleteResult,
        updateCabinet,
        updateResult,
        bulkActive,
        bulkUnActive,
        bulkResult,
        cabinet,
    }) => {
    const [params, setParams] = useState(initialParams)
    useEffect(() => fetchCabinets(params), [fetchCabinets, params])
    const [selectedIds, setSelectedIds] = useState([])
    const [showBulkBtn, setShowBulkBtn] = useState(false)
    const handleSearch = values => {
        setParams(values)
    }

    const getDetail = id => {
        getCabinetDetail(id)
    }

    const rowSelection = {
        onChange: selectedKeys => {
            setSelectedIds(selectedKeys)
            if (selectedKeys.length > 0) {
                setShowBulkBtn(true)
            } else {
                setShowBulkBtn(false)
            }
        }
    }

    const handleBulkActive = () => {
        bulkActive(selectedIds)
    }

    const handleBulkUnActive = () => {
        bulkUnActive(selectedIds)
    }

    const handleUpdate = cabinet => {
        updateCabinet(cabinet)
    }

    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'location',
            dataIndex: 'location',
            key: 'location'
        },
        {
            title: 'type',
            dataIndex: 'type',
            key: 'type'
        },
        {
            title: 'deviceId',
            dataIndex: 'deviceid',
            key: 'deviceid'
        },
        {
            title: 'cabinetLocationNumber',
            dataIndex: 'cabinetlocationnumber',
            key: 'cabinetlocationnumber'
        },
        {
            title: 'boardNo',
            dataIndex: 'boardno',
            key: 'boardno'
        },
        {
            title: 'usedCount',
            dataIndex: 'usedcount',
            key: 'usedcount'
        },
        {
            title: 'unusedCount',
            dataIndex: 'unusedcount',
            key: 'unusedcount'
        },
        {
            title: 'doorNumber',
            dataIndex: 'doornumber',
            key: 'doornumber'
        },
        {
            title: 'screenboardno',
            dataIndex: 'screenboardno',
            key: 'screenboardno'
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            fixed: 'right',
            render: (text, record) => {
                return (
                    <>
                        <Button onClick={() => getDetail(text)}>
                            <Link to={`/cabinet/${text}`}>Detail</Link>
                        </Button>
                        <Divider type="vertical"/>
                        <Popconfirm title="Are you sure DELETE this cabinet?" onConfirm={() => deleteCabinet(text)}>
                            <Button type="danger">Delete</Button>
                        </Popconfirm>
                        <CabinetUpdateForm cabinet={cabinet} handleUpdate={handleUpdate}>
                            <Button onClick={() => getDetail(text)}>Update</Button>
                        </CabinetUpdateForm>
                    </>
                )
            }
        }
    ]

    return (
        <div>
            {
                bulkResult ?
                    bulkResult.Success ?
                        <Alert type="success" message="success" banner closable /> :
                        <Alert type="warning" message={`fail: ${bulkResult.Errors[0]}`} banner closable />
                    : null
            }
            {
                updateResult ?
                    updateResult.Success ?
                        <Alert type="success" message="update success" banner closable /> :
                        <Alert type="warning" message={`update fail: ${updateResult.Errors[0]}`} banner closable />
                    : null
            }
            {
                deleteResult ? 
                    deleteResult.Success ? 
                        <Alert type="success" message="delete success" banner closable /> : 
                        <Alert type="warning" message={`delete fail:  ${deleteResult.Errors[0]}`} banner closable /> 
                    : null
            }
            <CabinetSearchForm 
                handleSearch={handleSearch} 
                handleBulkActive={handleBulkActive}
                handleBulkUnActive={handleBulkUnActive}
                showBulkBtn={showBulkBtn}
            />
            {
                errorMessage ?
                errorMessage:
                <Table
                    dataSource={cabinets}
                    columns={columns}
                    rowKey="id"
                    scroll={{x: 1300}}
                    rowSelection={rowSelection}
                />
            }
        </div>
    )
}



const mapStateToProps = state => {
    return {
        cabinets: state.cabinet.cabinets,
        errorMessage: state.cabinet.errorMessage,
        deleteResult: state.cabinet.deleteResult,
        updateResult: state.cabinet.updateResult,
        bulkResult: state.cabinet.bulkResult,
        cabinet: state.cabinet.cabinetDetail,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCabinets: params => dispatch(fetchCabinets(params)),
        getCabinetDetail: id => dispatch(getCabinetDetail(id)),
        deleteCabinet: id => dispatch(deleteCabinet(id)),
        updateCabinet: cabinet => dispatch(updateCabinet(cabinet)),
        bulkActive: ids => dispatch(bulkActive(ids)),
        bulkUnActive: ids => dispatch(bulkUnActive(ids)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CabinetContainer)