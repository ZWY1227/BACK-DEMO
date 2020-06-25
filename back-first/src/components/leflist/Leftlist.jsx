import React,{Component} from "react"
import "../../containers/admin/admin.css"


import {Link} from "react-router-dom"
//按需引入ui库
import {UploadOutlined,WindowsOutlined,AreaChartOutlined,SafetyOutlined,UserOutlined,HomeOutlined} from '@ant-design/icons';
import { Layout,Menu} from 'antd';
const { SubMenu } = Menu;
const {  Sider} = Layout;
export default class Leftlist extends Component{
    render(){
        return(
            <Sider className="sid">
                <h1 className="h">后台管理</h1>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<HomeOutlined />}><Link to="/home">首页</Link></Menu.Item>
                    <SubMenu key="2" icon={<UploadOutlined />} title="商品">
                        <Menu.Item key="3"><Link to="/shop/one">品牌管理</Link></Menu.Item>
                        <Menu.Item key="4"><Link to="/shop/two">商品管理</Link></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="5" icon={<UserOutlined />}><Link to="/user">用户管理</Link></Menu.Item>
                    <Menu.Item key="6" icon={<SafetyOutlined />}><Link to="/role">角色管理</Link></Menu.Item>
                    <SubMenu key="7" icon={<AreaChartOutlined />} title="图标管理">
                        <Menu.Item key="8"><Link to="/pic/bing">饼图</Link></Menu.Item>
                        <Menu.Item key="9"><Link to="/pic/zhe">折线图</Link></Menu.Item>
                        <Menu.Item key="10"><Link to="/pic/zhu">柱形图</Link></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="11" icon={<WindowsOutlined />}><Link to="/order">订单管理</Link></Menu.Item>
                </Menu>
            </Sider>
       
        )
    }
}