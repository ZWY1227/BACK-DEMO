import React, { Component } from "react"
import "../../containers/admin/admin.css"
import menuList from "../../config/menuConfig"
import { getStor } from "../../util/local"
import { Link, withRouter } from "react-router-dom"
//按需引入ui库
import { UploadOutlined, HomeOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';

const { SubMenu } = Menu;
const { Sider } = Layout;

class Leftlist extends Component {
    state = {
        newMunulist: []
    }
    render() {
        let { newMunulist } = this.state
        console.log(newMunulist)
        let path = this.props.location.pathname
        return (
            <Sider className="sid">
                <h1 className="h">后台管理</h1>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[path]}>
                    {newMunulist.length<1?this.munuList(menuList):this.munuList(newMunulist)}
                </Menu>
            </Sider>
        )
    }
    munuList = (menuList) => {
        return menuList.map((item) => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key} icon={<HomeOutlined />}><Link to={item.key}>{item.title}</Link></Menu.Item>
                )
            } else {
                return (
                    <SubMenu key={item.key} icon={<UploadOutlined />} title={item.title}>
                        {
                            item.children.map(items => {
                                return (
                                    <Menu.Item key={items.key}><Link to={items.key}>{items.title}</Link></Menu.Item>
                                )
                            })
                        }
                    </SubMenu>
                )
            }
        })
    }
    newMunulist = () => {
        let menus = getStor().role.menus
        let newArr = []
        menuList.forEach(item => {
            menus.forEach(items => {
                if (item.key === items) {
                    newArr.push(item)
                }
            })
        })
        this.setState({
            newMunulist: newArr
        })
    }
    componentWillMount() {
        this.newMunulist()
    }
}
export default withRouter(Leftlist)