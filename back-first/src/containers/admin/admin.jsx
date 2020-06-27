import React, { Component } from "react"
import "./admin.css"
import 'antd/dist/antd.less'
import { Redirect,Switch, Route } from "react-router-dom";
import memory from "../../util/memory"
import Leftlist from "../../components/leflist/Leftlist"
import Hea from "../../components/head/head"

import Home from "../home/Home"
import Shop from "../shop/Shop"
import User from "../user/User"
import Role from "../role/Role"
import Pic from "../pic/Pic"
import Order from "../order/order"


//按需引入ui库
import { Layout,message } from 'antd';
// import {
//     UploadOutlined,
//     WindowsOutlined,
//     AreaChartOutlined,
//     SafetyOutlined,
//     UserOutlined,
//     HomeOutlined
// } from '@ant-design/icons';
// const { SubMenu } = Menu;
const {  Footer,  Content } = Layout;
export default class Admin extends Component {
    handleClick = () => {
        message.success('成功啦')
    }
    render() {
        if (memory.user && memory.user._id) {
            return (
                <Layout style={{ height: '100%' }} className="big">
                        <Leftlist></Leftlist>
                    <Layout className="small">
                        {/* <Header className="hea">Header</Header> */}
                        <Hea></Hea>
                        <Content className="con">
                            <Switch>
                                <Route path="/admin/home" component={Home}></Route>
                                <Route path="/admin/shop" component={Shop}></Route>
                                <Route path="/admin/user" component={User}></Route>
                                <Route path="/admin/role" component={Role}></Route>
                                <Route path="/admin/pic" component={Pic}></Route>
                                <Route path="/admin/order" component={Order}></Route>
                                <Redirect from="/admin" to="/admin/home"></Redirect>
                            </Switch>
                        </Content>
                        <Footer className="foo">react~解忧杂货铺</Footer>
                    </Layout>
                </Layout>
            )
        } else {
            return (<Redirect to="/login"></Redirect>)
        }
    }

}