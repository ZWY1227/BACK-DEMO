import React, { Component } from "react"
import { Table, Card, Button,Input, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import LinkButton from "../../../components/Button/ButtonLink"
import { Link } from "react-router-dom";
import {reqshoplist,reqshoplistbysearch,updateStatus} from "../../../Api/index"
import {PAGE_SIZE} from "../../../util/constants"
export default class Bshop extends Component {
    state={
        loading:false,
        dataSource:[],//商品数据
        totle:"0",//商品总数量
        type:"productName",
        input:""
    }
    //点详情
    detail=(detail)=>{
        this.props.history.push({pathname:"/admin/shop/two/Bdetail",query:{detail}})
    }
    //点编辑
    edit=(detail)=>{
        this.props.history.push({pathname:"/admin/shop/two/Badd",query:{detail}})
    }
    //获取商品数据列表数据
    reqProducts=async(pagenum)=>{
        this.pagenum=pagenum
        let {input,type}=this.state
        let result
        if(!input){
            //表示要获取搜索列表
            result=await reqshoplist(pagenum,PAGE_SIZE)
        }else{
            //表示还是获取默认
            console.log(pagenum,PAGE_SIZE,input,type)
            result=await reqshoplistbysearch(pagenum,PAGE_SIZE,input,type)
        }
        if(result.status===0){
            result.data.list.forEach(item=>item.key=item._id)
            let totle=result.data.total
            this.setState({
                dataSource:result.data.list,
                totle:totle
            },()=>{
                // console.log(this.state.dataSource,this.state.totle)
            })
        }
    }
    //select双向数据绑定
    setSelect=(e)=>{
        console.log(e)
        this.setState({
            type:e
        })
    }
    //input框双向数据绑定
    setInput=(e)=>{
        console.log(e.target.value)
        this.setState({
            input:e.target.value
        },()=>{
            this.reqProducts()
        })
    }
    //点击搜索
    search=()=>{
        this.reqProducts(1)
        this.setState({
            input:""
        })
    }
    //上架和下架
    changeStatus=async(id,status)=>{
        console.log(status)
        let result=await updateStatus(id,status)
        if(result.status===0){
            this.reqProducts(this.pagenum)
        }
    }
    initColomns=()=>{
        this.columns = [
            {
                title: '商品名称',
                dataIndex:'name'
            },
            {
                title: '商品描述',
                dataIndex:'desc'
            },
            {
                title: '价格',
                dataIndex:'price',
                render:(item)=>{
                    return (
                        "￥"+item
                    )
                }
            },
            {
                title: '状态',
                render: (item) => {
                    // console.log(item)
                    return (
                        <span>
                            <Button type="primary" htmlType="submit" onClick={()=>{this.changeStatus(item._id,item.status===1 ? 2 : 1)}} style={{ marginLeft: '10' }}>
                              {item.status===1?'下架':'上架'}
                            </Button><br />
                           <div>{item.status===1?'在售':'已下架'}</div>
                        </span>
                    )
                }
            },
            {
                title: "操作",
                render:(item)=>{
                    // console.log(item)
                    return(
                        <div>
                         <LinkButton onClick={()=>{this.detail(item)}}>详情</LinkButton>
                        <LinkButton onClick={()=>{this.edit(item)}}>修改</LinkButton>
                        </div>
                       
                    )
                }
            }

        ];
    }

    render() {
        const { Option } = Select;
        let {totle,dataSource}=this.state
        const extra = (
            <span>
            <Link to="/admin/shop/two/Badd">
                <Button type='primary' ><PlusOutlined />添加</Button>
            </Link>
            </span>
        )
        const title = (
            <span>
                <Select value={this.state.type} style={{ margin: '0 18px' }} onChange={this.setSelect}>
                    <Option value="productName">按名称搜索</Option>
                    <Option value="productDesc">按描述搜索</Option>
                </Select>
                <Input type="text" value={this.state.input} placeholder="关键字" style={{ width: 100 }} onChange={this.setInput} />
                <Button type="primary" onClick={this.search} style={{ marginLeft: 10 }}>
                    搜索
                </Button>
            </span>
        )
      
        return (
            <Card type="inner" title={title} extra={extra}>
            {/* 暂时总共有3条数据，每页显示2条，应该分成两页 */}
                <Table dataSource={dataSource}  pagination={{onChange:this.reqProducts, defaultPageSize:PAGE_SIZE,total:totle,showQuickJumper:true}}  columns={this.columns} bordered />;
            </Card>
        )
    }
    componentWillMount(){
        this.initColomns()
    }
    componentDidMount(){
        this.reqProducts(1)
    }
}