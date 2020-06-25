import React, { Component } from "react"
import "./login.css"
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reqlogin } from "../../Api/index"
import {setStor} from "../../util/local"
import memory from "../../util/memory"
import {Redirect} from "react-router-dom"

let rules = [{ required: true, message: 'Please input your Username!' },
{ max: 14, message: '最大为14位' },
{ min: 4, message: '最小长度为4位' },
{ pattern: /[a-z0-9A-Z]{4,14}$/, message: '必须为数字和字母' }
]
export default class Login extends Component {
    onFinish = async value => {
        // console.log(value)
        //拿到输入框的值就发送ajax请求，拿到接口返回的数据，如果登录成功就跳转，
        //如果登录失败就提示重新输入密码
        let result = await reqlogin(value.username, value.password)
        if (result.status === 0) {
           //往内存中存一份，往硬盘中存一份
           memory.user=result.data
           setStor(result.data)
           this.props.history.replace("/")
        }
    }
    render() {
        if(memory.user&&memory.user._id){
            return (<Redirect to="/"></Redirect>)
        }else{  
        return (
            <div className="index">
                <header className="hea">
                    <h1>后台管理系统</h1>
                </header>
                <section className="sec">
                    <div className="small">
                        <h1>用户登录</h1>
                        <Form
                            name="normal_login"
                            className="login-form"
                            onFinish={this.onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={rules}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登录
                                </Button>

                            </Form.Item>
                        </Form>
                    </div>
                </section>
            </div>
        )
    }
    }
}