import React, { Component } from "react"
import { Card, Button, Table, Modal, Input, Form, Select, message, Tree } from 'antd';
import { reqRole, reqRoleList,updataRole } from "../../Api/index"
import filter_Time from "../../util/filter_url"
import menuList from "../../config/menuConfig"
const { TreeNode } = Tree;
export default class Role extends Component {
    constructor(props) {
        super(props)
        this.myref = React.createRef()
    }
    state = {
        dataSource: [],
        ischecked: true,
        visible: false,
        Rolevisible: false,
        confirmLoading: false,
        input: "",
        roleName: "",
        treeData:[],
        id:"",//角色id
        keyList:[],//选中的key数组
        auth_name:"admin"
    }
    //双向绑定input
    changeInput = (e) => {
        this.setState({
            input: e.target.value
        })
    }
    //点击添加按钮，弹出框
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    //点击model的确定按钮
    handleOk = async () => {
        this.state.input = ""
        let roleName = this.myref.current.props.value
        let result = await reqRole(roleName)
        if (result.status === 0) {
            message.success("添加角色成功")
        } else {
            message.error("添加角色失败")
        }
        this.setState({
            confirmLoading: true,
        }, () => {
            this.reqdataSource()
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
    };

    // ------------------
    initColumn = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time'
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time'
            },
            {
                title: '授权人',
                dataIndex: 'auth_name'
            },
        ];
    }
    componentWillMount() {
        this.initColumn()
    }
    //点击点选按钮的时候，让按钮变亮
    change = (e, item) => {
        if (e.length === 1) {
            this.setState({
                ischecked: false
            })
        }
        console.log(item)
        this.setState({
            roleName: item[0].name,
            id:item[0].key
        })
    }
    showModalR = () => {
        this.setState({
            Rolevisible: true
        })
    }
    showRole = async() => {
        let {id,keyList,auth_name}=this.state//参数id,key列表,admin,Date.now()
        console.log(id,keyList,auth_name,Date.now())
        let result=await updataRole(id,keyList,Date.now(),auth_name)
        console.log(result)
        if(result.status===0){
            message.success("设置角色成功了")
            this.reqdataSource()
        }else{
            message.error("设置角色失败了")
        }
        this.setState({
            Rolevisible: false
        })

    }
    showRolecancel = () => {
        this.setState({
            Rolevisible: false
        })

    }
    render() {
        const { visible, confirmLoading, dataSource,treeData} = this.state;
        let title = (
            <div>
                <Button type="primary" style={{ marginRight: 15 }} onClick={this.showModal}>添加角色</Button>
                <Button type="primary" disabled={this.state.ischecked} onClick={this.showModalR}>设置角色</Button>
            </div>
        )

        const onCheck = (checkedKeys) => {
            this.setState({
                keyList:checkedKeys
            })
            console.log(checkedKeys);//张三的权限
        };
        return (
            <Card type="inner" title={title}>
                <Table dataSource={dataSource} columns={this.columns} bordered
                    rowSelection={{ checkStrictly: true, type: 'radio', onChange: this.change }}
                    pagination={{ showQuickJumper: true, pageSize: 3 }}
                />
                <Modal
                    title="添加角色"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <Form labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal">
                        <Form.Item label="角色名称" required>
                            <Input ref={this.myref} value={this.state.input} placeholder="请输入角色名称" onChange={this.changeInput} />
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal title="设置角色权限" visible={this.state.Rolevisible} onOk={this.showRole} onCancel={this.showRolecancel}>
                    <div style={{ display: 'flex', alignItem:'center',marginBottom:20}}><span>角色名称：</span><Input style={{ width: 300 }} placeholder={this.state.roleName} disabled></Input></div>
                <Tree
                    checkable
                    onCheck={onCheck}
                    treeData={treeData}
                    defaultExpandAll='true'
                />
                </Modal>
            </Card>
        )
    }
    reqdataSource = async () => {
        let result = await reqRoleList()
        if (result.status === 0) {
            let dataSource = result.data.map(item => {
                return {name:item.name,auth_name:item.auth_name||"",create_time:filter_Time(item.create_time),auth_time:item.auth_time?filter_Time(item.auth_time):"", key: item._id }
            })
            this.setState({
                dataSource
            })
        }
    }
    reqtreeData=()=>{
        let newtree=[{ title: '平台权限',key: '平台权限',children:menuList}]
        this.setState({
            treeData:newtree
        })
    }
    componentDidMount() {
        this.reqdataSource()
        this.reqtreeData()
    }
}