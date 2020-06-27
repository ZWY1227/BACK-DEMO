import React,{Component} from "react"
import "../../containers/admin/admin.css"
import menuList from "../../config/menuConfig"

import {Link,withRouter} from "react-router-dom"
//按需引入ui库
import {UploadOutlined,HomeOutlined} from '@ant-design/icons';
import { Layout,Menu} from 'antd';

const { SubMenu } = Menu;
const {  Sider} = Layout;

class Leftlist extends Component{
    render(){
        let path=this.props.location.pathname
        return(
            <Sider className="sid">
                <h1 className="h">后台管理</h1>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[path]}>
                {
                    menuList.map((item)=>{
                        if(!item.children){
                            return(
                                <Menu.Item key={item.key} icon={<HomeOutlined />}><Link to={item.key}>{item.title}</Link></Menu.Item>
                            )
                        }else{
                            return(
                                <SubMenu key={item.key} icon={<UploadOutlined />} title={item.title}>
                                    {
                                        item.children.map(items=>{
                                            return(
                                                <Menu.Item key={items.key}><Link to={items.key}>{items.title}</Link></Menu.Item>
                                            )
                                        })   
                                    }
                                </SubMenu>
                            )
                        }
                    })
                }
                    {/* <Menu.Item key="1" icon={<HomeOutlined />}><Link to="/admin/home">首页</Link></Menu.Item>
                    <SubMenu key="2" icon={<UploadOutlined />} title="商品">
                        <Menu.Item key="3"><Link to="/admin/shop/one">品牌管理</Link></Menu.Item>
                        <Menu.Item key="4"><Link to="/admin/shop/two">商品管理</Link></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="5" icon={<UserOutlined />}><Link to="/admin/user">用户管理</Link></Menu.Item>
                    <Menu.Item key="6" icon={<SafetyOutlined />}><Link to="/admin/role">角色管理</Link></Menu.Item>
                    <SubMenu key="7" icon={<AreaChartOutlined />} title="图标管理">
                        <Menu.Item key="8"><Link to="/admin/pic/bing">饼图</Link></Menu.Item>
                        <Menu.Item key="9"><Link to="/admin/pic/zhe">折线图</Link></Menu.Item>
                        <Menu.Item key="10"><Link to="/admin/pic/zhu">柱形图</Link></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="11" icon={<WindowsOutlined />}><Link to="/admin/order">订单管理</Link></Menu.Item> */}
                </Menu>
            </Sider>
        )
    }
}
export default withRouter(Leftlist)