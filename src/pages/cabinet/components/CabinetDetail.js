import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'antd'
import { Link } from 'react-router-dom'


const CabinetDetail = ({cabinet}) => {
    
    return (
        <Card title={cabinet ? `${cabinet.name} Detail`: ''} extra={<Link to="/cabinet">back</Link>}>
            {
                cabinet &&
                Object.entries(cabinet)
                    .map(([key, value]) => <p key={key}><span>{key}: </span> {value}</p>)
            }
        </Card>
        
    )
}
const mapStateToProps = (state) => {
    return {
        cabinet: state.cabinet.cabinetDetail,
    }
}

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(CabinetDetail)
