import React, {Component} from 'react';
import {Layout, Menu} from "antd";
import {BrowserRouter, Link, Route} from "react-router-dom";
import 'antd/dist/antd.css';
import UsersContainer from "../user/UsersContainer";
import "./BasicLayout.css"
import RecordContainer from '../record/RecordContainer';
import CabinetContainer from '../cabinet/CabinetContainer';
import CabinetDetail from '../cabinet/components/CabinetDetail';

const {
    Sider,
    Content,
} = Layout;
const {Item} = Menu

class BasicLayout extends Component {
    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Sider>
                    <div className="sidebar-logo">

                    <img src="https://ng.ant.design/assets/img/logo.svg" alt="logo"/>
                    <h1>Ant Design Of Angular</h1>
                    </div>
                        <Menu defaultSelectedKeys="['1']">
                            <Item key="1">
                                <Link to="/user">User</Link>
                            </Item>
                            <Item key="2">
                                <Link to="/record">Record</Link>
                            </Item>
                            <Item key="3">
                                <Link to="/cabinet">Cabinet</Link>
                            </Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        {/*<Header>Header</Header>*/}
                        <Content className="content">
                            <Route path="/user" component={UsersContainer}/>
                            <Route path="/record" component={RecordContainer} />
                            <Route path="/cabinet/:id" children={<CabinetDetail />} />
                            <Route exact path="/cabinet" component={CabinetContainer} />
                        </Content>
                        {/*<Footer>Footer</Footer>*/}
                    </Layout>
                </Layout>
            </BrowserRouter>
        );
    }
}

export default BasicLayout;
