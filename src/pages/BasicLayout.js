import React, {Component} from 'react';
import {Layout, Menu} from "antd";
import {BrowserRouter, Link, Route} from "react-router-dom";
import 'antd/dist/antd.css';
import UsersContainer from "./user/UsersContainer";
import "./BasicLayout.css"

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
                        <Menu>
                            <Item key="1">
                                <Link to="/user">Users</Link>
                            </Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        {/*<Header>Header</Header>*/}
                        <Content>
                            <Route path="/user" component={UsersContainer}/>
                        </Content>
                        {/*<Footer>Footer</Footer>*/}
                    </Layout>
                </Layout>
            </BrowserRouter>
        );
    }
}

export default BasicLayout;
