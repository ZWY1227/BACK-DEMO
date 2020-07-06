import React, { Component } from "react"
import { Card, Modal, Button, Table, Form, Input, Select, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { reqCategorys, reqAddCategory, reqAddCategoryT, reqUpdateCategory } from "../../Api/index"
import LinkButton from "../../components/Button/ButtonLink"
export default class One extends Component {
    state = {
        loading: false,//添加数据确定时的loading
        visible: false,//弹出框是否可见，点击添加按钮的时候可见
        visibleUp: false,//弹出框是否可见，点击编辑时可见
        columns: [],//初始化的列
        dataSource: [],//一级分类或二级分类的列表
        twodataSource:[],//二级分类列表
        cateName: "",//所编辑的分类
        parentId: "0",//默认为0表示获取一级分类列表，来获取接口
    }
    //点击添加弹出添加的弹出框
    clickHandle = () => {
        this.setState({
            visible: true,
        });
    }
    //添加框里的确定，取消触发的事件
    handleOk = async () => {
        let value = this.abc.state.value//添加的input值
        let {parentId} =this.state
        this.setState({ loading: true });
        if (parentId!=="0") {
            // console.log(parentId, value, "二级传的参数")
            let result = await reqAddCategoryT(parentId, value)
            // console.log(result, "二级result")
            if (result.status === 0) {
                message.success("添加二级分类成功")
            } else {
                message.error("添加二级分类失败")
            }
        } else {
            // console.log("添加一级分类")
            let res = await reqAddCategory(value)
            if (res.status === 0) {
                // console.log(res)
                message.success("添加一级分类成功")
            } else {
                message.error("添加一级分类失败")
            }
        }
        this.abc.state.value=""
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 1000);
        this.setState({
            parentId:"0"
        },()=>{
            this.getCate()
        })  
    };
    handleCancel = () => {
        this.setState({ visible: false });
        this.abc.state.value=""
    };
    //点击编辑分类
    edit = (name, ke) => {
        // console.log("修改分类", name, ke)
        this.setState({
            visibleUp: true,
            cateName: name,//编辑框的值
            parentId: ke//该编辑的prId
        });
    }
    //点击查看子分类
    showTWOList=(key,name)=>{
        this.setState({
            parentId:key,
            cateName:name
        },()=>{
            this.getCate()
        })
    }
    //初始化colemus
    initialcolumon = () => {
        const columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                width: 300,
                render: items => {
                    let key = items.key
                    return (
                        <span>
                            <LinkButton onClick={() => this.edit(items.name, key)}>更新分类</LinkButton>
                            {this.state.parentId==="0"?<LinkButton onClick={()=>this.showTWOList(key,items.name)}>查看子分类</LinkButton>:null}
                        </span>
                    )
                }
            }
        ]
        this.setState({ columns })
    }
    //改变select的值
    setsel = (e) => {
        this.setState({
            parentId:e
        })
    }
    //点击更新的模态框的确定
    upOk = async () => {
        let { cateName, parentId } = this.state
        // console.log(cateName, parentId)
        //点击确定的时候发送请求，更新该一级分类
        let result = await reqUpdateCategory(parentId, cateName)
        if (result.status === 0) {
            // console.log(result)
            message.success("更新分类成功")
            this.setState({
                parentId:"0"
            },()=>{
                this.getCate()
            })
            
        } else {
            message.error("更新分类失败")
        }
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visibleUp: false });
        }, 1000);
    }
    //点击更新的模态框的取消
    upCancle = () => {
        this.setState({ loading: false, visibleUp: false });
    }
    //编辑模态框中的双向数据绑定
    editChange = (e) => {
        let name = e.target.value
        this.setState({ cateName: name })
    }
    goOne=()=>{
        console.log("11")
        this.setState({
            parentId:"0",
            cateName:""
        },()=>{
            this.getCate()
        })
    }
    render() {
        const extra = (
            <span>
                <Button type='primary' onClick={this.clickHandle}>
                    <PlusOutlined />
                添加</Button>
            </span>
        )
        let { loading, visible, columns,parentId, dataSource, visibleUp ,twodataSource} = this.state
        return (
            <div>
                {/* 这是点击添加后的弹出框哦 */}
                <div>
                    <Modal
                        visible={visible}
                        title="添加分类"
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}> Return</Button>,
                            <Button key="submit" onClick={this.handleOk} type="primary" loading={loading}> Submit </Button>,
                        ]}
                    >
                        {/* 这是select和input框 */}
                        <Form.Item>
                            <Select value={this.state.parentId==="0"?"0":this.state.parentId} onChange={this.setsel}>
                            <Select.Option key="0" value="0" >一级分类</Select.Option>
                                {
                                    this.state.dataSource.map(item => {
                                        return (
                                            <Select.Option key={item._id} value={item._id} >{item.name}</Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Input ref={(inp)=>{this.abc=inp}} placeholder="请输入分类名称" />
                        </Form.Item>
                    </Modal>
                </div>
                {/* 这是点击点击更新的时候的弹出框 */}
                <div>
                    <Modal
                        visible={visibleUp}
                        title="编辑分类"
                        onOk={this.upOk}
                        onCancel={this.upCancle}
                        footer={[
                            <Button key="back" onClick={this.upCancle}> Return</Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={this.upOk}> Submit </Button>,
                        ]}
                    >
                        {/*input框 */}
                        <Form.Item>
                            <Input value={this.state.cateName} onChange={this.editChange} />
                        </Form.Item>
                    </Modal>
                </div>
                <Card type="inner" 
                title={this.state.parentId==="0"?<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一级分类列表</span>:(<span><LinkButton  onClick={this.goOne}>一级分类列表---&gt;</LinkButton><span>{this.state.cateName}</span></span>)
                } extra={extra}>
                    <Table dataSource={parentId==="0"?dataSource:twodataSource} columns={columns} bordered pagination={{PageSize:2, showQuickJumper: true }} />
                </Card>
            </div>
        )
    }
    getCate = async () => {
        // console.log("列表发送变化")
            //表示要获取一级分类的数据
            let id=this.state.parentId
            let result = await reqCategorys(id)
            //改变数据结构为键值对
            // result.data.map((item,index) =>{
            //     return result.data[index]={
            //         key:index+1,
            //         parentId:item.parentId,
            //         _id:item._id,
            //         name:item.name,
            //         __v:item.__v
            //     }
            // })
            //循环数据添加属性key
            result.data.forEach((item,index)=>{
                item.key=item._id
            })
            if(id==="0"){
                this.setState({ dataSource:result.data })
            }else{
                this.setState({twodataSource: result.data})
            }
    }
    componentDidMount() {
        this.getCate()
    }
    componentWillMount() {
        this.initialcolumon()
    }
}