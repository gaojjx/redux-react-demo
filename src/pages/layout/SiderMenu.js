import React from 'react'
import { Layout, Menu } from 'antd'
import { connect } from 'react-redux'
import { menus } from '../../router/menus'
import { Link, withRouter } from 'react-router-dom'
const { Sider} = Layout
const SiderMenu = () => {
    return (
        <div>
            <Sider>
               <div className="logo">
					Logo
				</div>
                <Menu>
                {menus.map(menu => {
                    return (
                        <Menu.Item key={menu.path}>
                            <Link to={menu.path}>
                                <span>{menu.title}</span>
                            </Link>
                        </Menu.Item>
                    )
                })}
                </Menu>
            </Sider>
        </div>
    )
}
const mapStateToProps = state => state
export default withRouter(connect(mapStateToProps)(SiderMenu))
