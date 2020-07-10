import React, { Component } from "react"
import LinkButton from "../../components/Button/ButtonLink"
import { Card, Button, Table, Modal, Input, Form, Select, message,ConfigProvider, Tree } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { showUse, addUse, updateUse,deleteUse } from "../../Api/index"
import filter_Time from "../../util/filter_url"
const { Option } = Select;
export default class User extends Component {
    constructor(props){
        super(props)
        this.name=React.createRef()
    }
    state = {
        visible: false,
        confirmLoading: false,
        dataSource: [],
        rolelist: [],
        _id: "",
        username: "",
        phone: "",
        email: "",
        role_id: "",
        visibleedit: false,
        name:""
    }
    changename=(e)=>{
        this.setState({
            name:e.target.value
        })
    }
    //点击添加按钮，弹出框
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    //点击model的确定按钮
    handleOk = () => {
        this.state.input = ""
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 500);
    };
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }
    edit = async (items) => {
        let { key, username, phone, email } = items
        let role_id = this.state.rolelist.find(item => item.name === items.role_id).key
        let _id = key
        this.setState({
            _id, username, phone, email, role_id, visibleedit: true,
        })
    }
    editCancel = () => {
        this.setState({
            visibleedit: false
        })
    }
    editOKfinish=async(e)=>{
        let {_id}=this.state
        let{username, phone, email, role_id}=e
            let result=await updateUse(_id, username, phone, email, role_id)
            if(result.status===0){
                message.success('修改用户成功')
                this.setState({
                    visibleedit: false,
                },()=>{ this.showUseFun()})
               
            }else{
                message.error("修改用户失败")
            }
    }
    delete=async(_id)=>{
        let userId=_id
        let result=await deleteUse(userId)
        if(result.status===0){
                Modal.confirm({
                    title:"小提示",
                    content:"你确定要删除该用户吗？",
                    onOk:()=>{
                        message.success("删除用户成功")
                        this.showUseFun()
                    }
                })
           
        }else{
            message.error('删除用户失败')
        }
    }

    initcolumn = () => {
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'username',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
            },
            {
                title: '电话',
                dataIndex: 'phone',
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                render:(create_time)=>{
                    return filter_Time(create_time)
                }
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
            },
            {
                title: '操作',
                render: items => {
                    let _id=items.key
                    return (
                        <span>
                            <LinkButton onClick={() => { this.edit(items) }}>修改</LinkButton>
                            <LinkButton onClick={()=>{this.delete(_id)}}>删除</LinkButton>
                        </span>
                    )
                }
            },
        ];
    }
    onGenderChange = (e) => {
        this.setState({
            role_id: e
        })
    }
    // _id,menus,auth_time,auth_name
    addOK = async (e) => {
        let { role_id,username, password, phone, email } = e
        let result = await addUse(username, password, phone, email, role_id)
        if (result.status === 0) {
            message.success('添加用户成功')
            this.name=""
            this.setState({
                visible: false
            }, () => { this.showUseFun() })
        } else {
            message.error("添加用户失败")
        }
    }
    
    render() {
        const { visible, confirmLoading, visibleedit, dataSource, rolelist, _id, username, phone, email, role_id } = this.state;
        let title = (
            <span>
                <Button type='primary' onClick={this.showModal}>
                    <PlusOutlined />
            添加</Button>
            </span>
        )
        return (
            <Card type="inner" title={title}>
                <Table dataSource={dataSource} columns={this.columns} bordered pagination={{ showQuickJumper: true, pageSize: 3 }} />
                <Modal
                    title="添加用户"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                    footer={null}
                >

                    <Form labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        onFinish={this.addOK}
                        hideRequiredMark='true'
                    >
                        <Form.Item label="用户名称" name="username" initialValue={['']} rules={[{ required: true, message: 'Please input your name!' }]}>
                            <Input ref={this.name} value={this.state.name} placeholder="请输入用户名称" onChange={this.changename} />
                        </Form.Item>
                        <Form.Item label="密码" name="password" initialValue={['']} rules={[{ required: true, message: 'Please input your Password!' }]}>
                            <Input  placeholder="请输入密码"/>
                        </Form.Item>
                        <Form.Item label="手机号" name="phone" initialValue={['']} rules={[{ required: true, message: 'Please input your phone!' }]}>
                            <Input   placeholder="请输入手机号" />
                        </Form.Item>
                        <Form.Item label="邮箱" name='email' initialValue={['']} rules={[{ required: true, message: 'Please input your email!' }]}>
                            <Input  placeholder="请输入邮箱" />
                        </Form.Item>
                        <Form.Item label="角色" name="role_id" initialValue={['请选择角色']} rules={[{ required: true, message: 'Please select!' }]}>
                            <Select value={this.state.role_id} onChange={this.onGenderChange} allowClear>
                                {
                                    rolelist.map(item => {
                                        return (
                                            <Option value={item.key} key={item.key}>{item.name}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item style={{ textAlign: "right" }}>
                            <Button style={{ marginRight: 30 }}>cancle</Button>
                            <Button type="primary" htmlType='submit'>OK</Button>
                        </Form.Item>
                    </Form>

                </Modal>
                <Modal
                    title="更新用户"
                    visible={visibleedit}
                    onCancel={this.editCancel}
                    footer={null}
                >
                    <Form labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        onFinish={this.editOKfinish}
                    >
                        <Form.Item label="用户名称" name="username">
                            <Input ref={this.myref} value={username} placeholder={username} onChange={this.changeInput} />
                        </Form.Item>
                        <Form.Item label="手机号" name="phone">
                            <Input ref={this.myref} value={this.state.input} placeholder={phone} onChange={this.changeInput} />
                        </Form.Item>
                        <Form.Item label="邮箱" name='email' >
                            <Input ref={this.myref} value={this.state.input} placeholder={email} onChange={this.changeInput} />
                        </Form.Item>
                        <Form.Item label="角色" name="role_id" initialValue={[role_id]}>
                            <Select value={role_id} onChange={this.onGenderChange} allowClear>
                                {
                                    rolelist.map(item => {
                                        return (
                                            <Option value={item.key} key={item.key}>{item.name}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item style={{ textAlign: "right" }}>
                            <Button style={{ marginRight: 30 }} onClick={this.editCancel}>cancle</Button>
                            <Button type="primary" htmlType='submit'>OK</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        )
    }
    showUseFun = async () => {
        let result = await showUse()
        if (result.status === 0) {
          result.data.users.map(item=>{
            item.key=item._id
              result.data.roles.forEach(items=>{
                  items.key=items._id
                  if(item.role_id===items._id){
                      item.role_id=items.name
                      return item
                  }else{
                      return item
                  }
              })
          })
        console.log(result.data.users) 
        this.setState({
            dataSource:result.data.users,
            rolelist:result.data.roles
        }) 
     }
    }







    componentDidMount() {
        this.showUseFun()

    }
    componentWillMount() {
        this.initcolumn()
    }
}
