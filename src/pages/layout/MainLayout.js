import React from 'react'

import { Layout } from 'antd'
import { connect } from 'react-redux'
import TopHeader from './TopHeader'
import MainContent from './MainContent'
import SiderMenu from './SiderMenu'
import { withRouter } from 'react-router-dom'
import './Layout.css'

const MainLayout = () => {
    return (
        <div className="layout">
            <Layout style={{ minHeight: '100vh' }}>
                <SiderMenu />
                <Layout>
                    <TopHeader />
                    {/* {breadCrumb.show ? <BreadCrumb /> : null} */}
                    <MainContent />
                </Layout>
            </Layout>
        </div>
    )
}

const mapStateToProps = state => state
export default withRouter(connect(mapStateToProps)(MainLayout))