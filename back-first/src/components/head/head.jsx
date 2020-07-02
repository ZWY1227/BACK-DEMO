import React, { Component } from "react"
import { Layout } from 'antd';
import { Modal, Button } from 'antd';
import filter_Time from "../../util/filter_url"
import "./hea.css"
import { reqweather } from "../../Api/index"
import memory from "../../util/memory"
import {removeStore} from "../../util/local"
import menuList from "../../config/menuConfig"
import { withRouter } from "react-router-dom"
const { Header } = Layout;

class Hea extends Component {
    state = {
        time: "",
        weather: "",
        url: ""
    }
    render() {
      let name=this.getTitle()
        let { time, weather, url } = this.state
        // console.log(weather,url)
        return (
            <Header className="he" >
                <div className="top">
                    <ul>
                        <li>
                            欢迎: {memory.user.username}
                        </li>
                        <li>
                            <button onClick={this.outlogin}>退出</button>
                        </li>
                    </ul>
                </div>
                <div className="bottom">
                    <div className="left">
                        {name}
                    </div>
                    <div className="right">
                        <ul>
                            <li>
                                {time}
                            </li>
                            <li>
                                <img src={url} alt={url}></img>
                                {/* <div>图片</div> */}
                            </li>
                            <li>
                                {weather}
                            晴天
                            </li>
                        </ul>
                    </div>
                </div>
            </Header>
        )
    }
    //初始化时间，当时间变化，就调用格式化时间赋值给当前time
    initTime = () => {
        setInterval(() => {
            let time = filter_Time(Date.now())
            this.setState({ time })
        }, 1000)
    }
    //调用接口来拿到天气和图片
    getweather = async () => {
        let result = await reqweather("郑州")
        if (result) {
            let weather = result.weather
            let url = result.url
            this.setState({ weather, url })
        }
    }
    //获取title
    getTitle=()=>{
        let path = this.props.location.pathname
        let name
        menuList.forEach(item => {
            if (!item.children) {
                if (item.key === path) {
                    name = item.title
                }
            }else{
                item.children.forEach(items=>{
                    if (items.key === path) {
                        name = items.title
                    }
                })
            }
        })
        return name 
    }

    //退出登录
    outlogin = () => {
        Modal.confirm({
            title:"提示",
            content:"你确定要退出登录吗？",
            onOk:()=>{
                memory.user={}
                removeStore()
                this.props.history.replace("/login")
            },
            onCancel:()=>{
                alert("我觉得不退出了")
            }
            
        })
       
    }
    componentDidMount() {
        this.initTime()
        this.getweather()
        
    }
}
export default withRouter(Hea)
