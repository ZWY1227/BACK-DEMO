import React, { Component } from "react"
import {  Card, Modal, Button, Table, Form, Input, Select, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {reqCategorys,reqAddCategory} from "../../Api/index"
import LinkButton from "../../components/Button/ButtonLink"
export default class One extends Component {
    state={
        loading: false,//添加数据确定时的loading
        visible: false,//弹出框是否可见，点击添加按钮的时候可见
        sel:"一级分类",
        columns:[],
        dataSource:[],
        visibleUp:false
    }
    //点击添加弹出添加的弹出框
    clickHandle = () => {
        this.setState({
            visible: true,
        });
    }
    //添加框里的确定，取消触发的事件
    handleOk = async() => {
        let value=this.refs.abc.state.value
        this.setState({ loading: true });
        let result=await reqAddCategory(value)
        if(result.status===0){
            message.success("添加一级分类成功")
        }else{
            message.error("添加一级分类失败")
        }
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 1000);
        this.getCate()
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };
    edit=()=>{
        console.log("修改分类")
        console.log(this)
        this.setState({
            visibleUp: true,
        });
    }
    //初始化colemus
    initialcolumon=()=>{
        const columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                dataIndex: 'name',
                key: 'name',
                width:300,
                render:()=>{
                    return(
                        <span>
                            <LinkButton onClick={this.edit}>更新分类</LinkButton>
                            <LinkButton>查看子分类</LinkButton>
                        </span>
                    )
                }
            }
        ]
        this.setState({columns})
    }
     //改变select的值
     setsel=(e)=>{
        console.log(e)
        this.setState({
            sel:e
        })
    }
    upOk=()=>{
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visibleUp: false });
        }, 1000);
    }
    upCancle=()=>{
        this.setState({ loading: false, visibleUp: false });
    }
    render() {
        const extra = (
            <span>
                <Button type='primary' onClick={this.clickHandle}>
                    <PlusOutlined />
                添加</Button>
            </span>
        )
       
        let {loading,visible,sel,columns,dataSource,visibleUp}=this.state
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
                            <Select value={sel} onChange={this.setsel}>
                            {
                                    this.state.dataSource.map(item => {
                                        return (
                                            <Select.Option key={item.name} value={item.name} >{item.name}</Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Input ref="abc" />
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
                            <Input ref="abc" />
                        </Form.Item>
                    </Modal>
                </div>
                <Card type="inner" title="一级分类列表" extra={extra}>
                    <Table dataSource={dataSource} columns={columns} bordered pagination={{ defaultPageSize: 5, showQuickJumper: true }} />
                </Card>
            </div>
        )
    }
    getCate=async()=>{
        let result=await reqCategorys("0")
        console.log(result)
      let value=[]
      value=result.data.map(item=>item)
      let dataSource=value.map(item=>{return {parentId:item.parentId,_id:item._id,name:item.name,key:item._id}})
      this.setState({dataSource})
    }
    componentDidMount(){ 
        this.getCate()
    }
    componentWillMount(){
        this.initialcolumon()
    }
}